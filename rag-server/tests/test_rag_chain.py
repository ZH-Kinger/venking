"""rag_chain._dedupe_by_doc / _build_context —— 纯逻辑,零网络。

覆盖:同 doc_id 只留最靠前一个、Source-ID(S1/S2…)按序、来源 doc_id/section 正确、
     section 回退 title、doc_id 回退 source/"?"。
"""
from __future__ import annotations

from types import SimpleNamespace

from langchain_core.documents import Document

from blog_rag import rag_chain
from blog_rag.rag_chain import _build_context, _dedupe_by_doc


def _d(content: str, **meta) -> Document:
    return Document(page_content=content, metadata=meta)


# ---------- _dedupe_by_doc ----------
def test_dedupe_keeps_first_per_doc_id():
    docs = [
        _d("first-A", doc_id="A"),
        _d("second-A", doc_id="A"),
        _d("only-B", doc_id="B"),
    ]
    out = _dedupe_by_doc(docs)
    assert [d.metadata["doc_id"] for d in out] == ["A", "B"]
    # 保留排名最靠前的 chunk
    assert out[0].page_content == "first-A"


def test_dedupe_preserves_order():
    docs = [_d("x", doc_id="B"), _d("y", doc_id="A"), _d("z", doc_id="B")]
    out = _dedupe_by_doc(docs)
    assert [d.metadata["doc_id"] for d in out] == ["B", "A"]


def test_dedupe_falls_back_to_source_key():
    # 无 doc_id → 用 source 作 key
    docs = [_d("1", source="s1"), _d("2", source="s1"), _d("3", source="s2")]
    out = _dedupe_by_doc(docs)
    assert len(out) == 2
    assert [d.metadata["source"] for d in out] == ["s1", "s2"]


def test_dedupe_empty():
    assert _dedupe_by_doc([]) == []


def test_dedupe_no_key_collapses_to_one():
    # 既无 doc_id 也无 source → key=None;当前实现会把它们全并成 1 个(潜在行为,记录)
    docs = [_d("a"), _d("b")]
    out = _dedupe_by_doc(docs)
    assert len(out) == 1


# ---------- _build_context ----------
def test_build_context_source_ids_in_order():
    docs = [_d("body1", doc_id="docA"), _d("body2", doc_id="docB")]
    context, sources = _build_context(docs)
    assert [s["sid"] for s in sources] == ["S1", "S2"]
    assert sources[0]["doc_id"] == "docA"
    assert sources[1]["doc_id"] == "docB"


def test_build_context_head_and_body_format():
    docs = [_d("正文内容", doc_id="docA", section="第一节")]
    context, sources = _build_context(docs)
    assert "[S1] 来源:docA · 第一节" in context
    assert "正文内容" in context
    assert sources[0] == {"sid": "S1", "doc_id": "docA", "section": "第一节"}


def test_build_context_section_falls_back_to_title():
    docs = [_d("b", doc_id="docA", title="标题T")]
    context, sources = _build_context(docs)
    assert sources[0]["section"] == "标题T"
    assert "· 标题T" in context


def test_build_context_no_section_no_title():
    docs = [_d("b", doc_id="docA")]
    context, sources = _build_context(docs)
    assert sources[0]["section"] == ""
    # 无 section → head 不含分隔符 " · "
    assert " · " not in context
    assert "[S1] 来源:docA" in context


def test_build_context_doc_id_fallback_source():
    docs = [_d("b", source="src1")]
    context, sources = _build_context(docs)
    assert sources[0]["doc_id"] == "src1"


def test_build_context_doc_id_fallback_question_mark():
    docs = [_d("b")]
    context, sources = _build_context(docs)
    assert sources[0]["doc_id"] == "?"


def test_build_context_blocks_separated_by_blank_line():
    docs = [_d("b1", doc_id="A"), _d("b2", doc_id="B")]
    context, _ = _build_context(docs)
    assert "\n\n" in context
    assert context.count("来源:") == 2


# ---------- 审计修复:_build_context 字符预算(max_context_tokens*2),超了砍靠后块 ----------
def test_build_context_truncates_trailing_blocks(monkeypatch):
    # budget = 5*2 = 10 字符;S1(8)保留,+S2(5)=13>10 → break,只留 S1
    monkeypatch.setattr(rag_chain.settings, "max_context_tokens", 5)
    docs = [_d("A" * 8, doc_id="a"), _d("B" * 5, doc_id="b"), _d("C" * 5, doc_id="c")]
    context, sources = _build_context(docs)
    assert [s["sid"] for s in sources] == ["S1"]
    assert sources[0]["doc_id"] == "a"
    assert "CCCCC" not in context and "BBBBB" not in context


def test_build_context_always_keeps_at_least_one(monkeypatch):
    # 第一块本身就超预算(used=0 时不砍)→ 仍保留,保证至少 1 块
    monkeypatch.setattr(rag_chain.settings, "max_context_tokens", 1)  # budget=2
    docs = [_d("X" * 100, doc_id="a"), _d("Y" * 100, doc_id="b")]
    context, sources = _build_context(docs)
    assert len(sources) == 1
    assert sources[0]["doc_id"] == "a"


def test_build_context_keeps_all_within_budget(monkeypatch):
    monkeypatch.setattr(rag_chain.settings, "max_context_tokens", 100)  # budget=200
    docs = [_d("a" * 10, doc_id="a"), _d("b" * 10, doc_id="b"), _d("c" * 10, doc_id="c")]
    context, sources = _build_context(docs)
    assert [s["sid"] for s in sources] == ["S1", "S2", "S3"]


def test_build_context_boundary_exactly_at_budget_kept(monkeypatch):
    # 累计恰好等于预算(不 > budget)→ 保留;超一字才砍
    monkeypatch.setattr(rag_chain.settings, "max_context_tokens", 5)  # budget=10
    docs = [_d("A" * 5, doc_id="a"), _d("B" * 5, doc_id="b"), _d("C" * 1, doc_id="c")]
    context, sources = _build_context(docs)
    # S1(5)+S2(5)=10 ==budget 不砍;+S3=11>10 → break
    assert [s["sid"] for s in sources] == ["S1", "S2"]


# ---------- answer 双模式闸门(离线 mock:retrieve + get_client 全替身,不触网/LLM)----------
def _fake_completion(text: str):
    """构造 stream=False 分支需要的对象:completion.choices[0].message.content。"""
    msg = SimpleNamespace(content=text, reasoning_content=None)
    return SimpleNamespace(choices=[SimpleNamespace(message=msg)])


def _fake_client(text: str = "ANSWER"):
    completions = SimpleNamespace(create=lambda **kw: _fake_completion(text))
    return SimpleNamespace(chat=SimpleNamespace(completions=completions))


def test_answer_grounded_when_best_ge_threshold(monkeypatch):
    monkeypatch.setattr(rag_chain.settings, "grounding_min_rerank", 5)
    docs = [_d("body", doc_id="A", rerank_score=8)]
    monkeypatch.setattr(rag_chain, "retrieve", lambda q, fusion=None: docs)
    monkeypatch.setattr(rag_chain, "get_client", lambda: _fake_client("grounded ans"))
    out = rag_chain.answer("q", stream=False)
    assert out["mode"] == "grounded"
    assert out["answer"] == "grounded ans"
    assert out["sources"][0]["doc_id"] == "A"


def test_answer_general_when_best_below_threshold(monkeypatch):
    # 变更1:未达接地阈值先走 web 兜底;web 返回 [] → 才落 general
    monkeypatch.setattr(rag_chain.settings, "grounding_min_rerank", 5)
    docs = [_d("body", doc_id="A", rerank_score=2)]
    monkeypatch.setattr(rag_chain, "retrieve", lambda q, fusion=None: docs)
    monkeypatch.setattr(rag_chain, "get_client", lambda: _fake_client("general ans"))
    monkeypatch.setattr(rag_chain, "web_search", lambda q, *a, **k: [])   # 联网无结果
    out = rag_chain.answer("q", stream=False)
    assert out["mode"] == "general"
    assert out["sources"] == []                       # 通用模式不给假引用
    assert out["suggestions"] == ["A"]                # 推荐 KB 相关主题


def test_answer_general_when_no_docs(monkeypatch):
    monkeypatch.setattr(rag_chain, "retrieve", lambda q, fusion=None: [])
    monkeypatch.setattr(rag_chain, "get_client", lambda: _fake_client())
    monkeypatch.setattr(rag_chain, "web_search", lambda q, *a, **k: [])   # 联网无结果
    out = rag_chain.answer("q", stream=False)
    assert out["mode"] == "general"
    assert out["suggestions"] == []


def test_answer_boundary_exactly_at_threshold_is_grounded(monkeypatch):
    # best == 阈值 → 走接地(闸门是 >=)
    monkeypatch.setattr(rag_chain.settings, "grounding_min_rerank", 5)
    docs = [_d("body", doc_id="A", rerank_score=5)]
    monkeypatch.setattr(rag_chain, "retrieve", lambda q, fusion=None: docs)
    monkeypatch.setattr(rag_chain, "get_client", lambda: _fake_client())
    out = rag_chain.answer("q", stream=False)
    assert out["mode"] == "grounded"


def test_answer_just_below_threshold_is_general(monkeypatch):
    monkeypatch.setattr(rag_chain.settings, "grounding_min_rerank", 5)
    docs = [_d("body", doc_id="A", rerank_score=4)]
    monkeypatch.setattr(rag_chain, "retrieve", lambda q, fusion=None: docs)
    monkeypatch.setattr(rag_chain, "get_client", lambda: _fake_client())
    monkeypatch.setattr(rag_chain, "web_search", lambda q, *a, **k: [])   # 联网无结果 → general
    out = rag_chain.answer("q", stream=False)
    assert out["mode"] == "general"


def test_answer_best_uses_max_rerank_across_docs(monkeypatch):
    # best 取所有 docs 里最大的 rerank_score;有一个达标即接地
    monkeypatch.setattr(rag_chain.settings, "grounding_min_rerank", 5)
    docs = [_d("b1", doc_id="A", rerank_score=1), _d("b2", doc_id="B", rerank_score=9)]
    monkeypatch.setattr(rag_chain, "retrieve", lambda q, fusion=None: docs)
    monkeypatch.setattr(rag_chain, "get_client", lambda: _fake_client())
    out = rag_chain.answer("q", stream=False)
    assert out["mode"] == "grounded"


# ---------- 变更1:CRAG 兜底阶梯——未达接地阈值先联网(web),搜到就 web 接地作答 ----------
_WEB_ITEMS = [
    {"title": "NVLink 官方文档", "url": "https://nvidia.com/nvlink", "snippet": "NVLink 是 GPU 互联总线..."},
    {"title": "GB200 白皮书", "url": "https://example.com/gb200", "snippet": "GB200 功耗约 ..."},
]


def test_answer_web_when_below_threshold_and_web_has_results(monkeypatch):
    # best<阈值 且 web_search 返回样例 → mode='web',sources 为 URL 出处([W#]),不给 [S#] 假引用
    monkeypatch.setattr(rag_chain.settings, "grounding_min_rerank", 5)
    monkeypatch.setattr(rag_chain.settings, "web_search_enabled", True)
    docs = [_d("body", doc_id="A", rerank_score=2)]
    monkeypatch.setattr(rag_chain, "retrieve", lambda q, fusion=None: docs)
    monkeypatch.setattr(rag_chain, "get_client", lambda: _fake_client("web ans"))
    monkeypatch.setattr(rag_chain, "web_search", lambda q, *a, **k: _WEB_ITEMS)
    out = rag_chain.answer("q", stream=False)
    assert out["mode"] == "web"
    assert out["answer"] == "web ans"
    # sources 是 URL schema {wid,title,url}(非本地 {sid,doc_id,section})
    assert [s["wid"] for s in out["sources"]] == ["W1", "W2"]
    assert out["sources"][0]["url"] == "https://nvidia.com/nvlink"
    assert out["sources"][0]["title"] == "NVLink 官方文档"
    assert all("doc_id" not in s for s in out["sources"])   # 不掺本地引用
    # contexts 取 web snippet(供评测复用);web 模式 faithfulness 不适用于本地上下文
    assert out["contexts"] == [it["snippet"] for it in _WEB_ITEMS]


def test_answer_web_when_no_docs_but_web_has_results(monkeypatch):
    # 完全无本地命中(best=0)也先联网;搜到 → web
    monkeypatch.setattr(rag_chain.settings, "web_search_enabled", True)
    monkeypatch.setattr(rag_chain, "retrieve", lambda q, fusion=None: [])
    monkeypatch.setattr(rag_chain, "get_client", lambda: _fake_client("web ans"))
    monkeypatch.setattr(rag_chain, "web_search", lambda q, *a, **k: _WEB_ITEMS)
    out = rag_chain.answer("q", stream=False)
    assert out["mode"] == "web"
    assert len(out["sources"]) == 2


def test_answer_general_when_web_disabled(monkeypatch):
    # web_search_enabled=False → 跳过联网,直接 general(即便 web_search 有结果也不该被调用)
    monkeypatch.setattr(rag_chain.settings, "grounding_min_rerank", 5)
    monkeypatch.setattr(rag_chain.settings, "web_search_enabled", False)
    docs = [_d("body", doc_id="A", rerank_score=2)]
    monkeypatch.setattr(rag_chain, "retrieve", lambda q, fusion=None: docs)
    monkeypatch.setattr(rag_chain, "get_client", lambda: _fake_client("general ans"))

    def _boom(*a, **k):
        raise AssertionError("web_search 不应在 web_search_enabled=False 时被调用")
    monkeypatch.setattr(rag_chain, "web_search", _boom)
    out = rag_chain.answer("q", stream=False)
    assert out["mode"] == "general"
    assert out["sources"] == []
    assert out["suggestions"] == ["A"]


def test_answer_grounded_skips_web_even_if_available(monkeypatch):
    # best>=阈值 → 直接接地,联网分支根本不进(web_search 不被调用)
    monkeypatch.setattr(rag_chain.settings, "grounding_min_rerank", 5)
    monkeypatch.setattr(rag_chain.settings, "web_search_enabled", True)
    docs = [_d("body", doc_id="A", rerank_score=8)]
    monkeypatch.setattr(rag_chain, "retrieve", lambda q, fusion=None: docs)
    monkeypatch.setattr(rag_chain, "get_client", lambda: _fake_client("grounded ans"))

    def _boom(*a, **k):
        raise AssertionError("接地路径不应联网")
    monkeypatch.setattr(rag_chain, "web_search", _boom)
    out = rag_chain.answer("q", stream=False)
    assert out["mode"] == "grounded"
