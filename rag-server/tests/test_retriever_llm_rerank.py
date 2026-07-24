r"""retriever.llm_rerank —— 变更2:listwise 一次调用重排。

契约:
  - 一次 LLM 调用,解析模型输出的多行 `编号=分数`(正则 `\[?(\d+)\]?\s*[=:：]\s*(\d+)`);
  - 命中的候选写 rerank_score,按分降序取 top_n;越界编号忽略,分数 clamp 到 10;
  - **整体失败(scores 空 / 抛异常)→ 退化 RRF 序 + 每篇 rerank_score=grounding_min_rerank**;
  - 空候选 → [];绝不就地改传入 Document(用 _with_meta 拷贝)。

全部离线:monkeypatch stub blog_rag.retriever.get_client 返回可控假 client。
"""
from __future__ import annotations

from types import SimpleNamespace

from langchain_core.documents import Document

from blog_rag import retriever
from blog_rag.retriever import llm_rerank


def _d(content: str, **meta) -> Document:
    return Document(page_content=content, metadata=meta)


def _fake_client(content: str | None = None, *, raise_exc: bool = False):
    """假 client:chat.completions.create → message.content=content;raise_exc=True 时抛错。"""
    def _create(**kw):
        if raise_exc:
            raise RuntimeError("endpoint down")
        msg = SimpleNamespace(content=content)
        return SimpleNamespace(choices=[SimpleNamespace(message=msg)])
    return SimpleNamespace(chat=SimpleNamespace(completions=SimpleNamespace(create=_create)))


def _stub_client(monkeypatch, content=None, *, raise_exc=False):
    monkeypatch.setattr(retriever, "get_client",
                        lambda: _fake_client(content, raise_exc=raise_exc))


# 大多数用例用小候选集;把 candidates/top_n 放大避免被裁掉影响断言
def _wide(monkeypatch, top_n=10, candidates=10):
    monkeypatch.setattr(retriever.settings, "rerank_top_n", top_n)
    monkeypatch.setattr(retriever.settings, "rerank_candidates", candidates)


# ---------- 正常解析:按分降序 + 写 rerank_score ----------
def test_rerank_parses_and_sorts_desc(monkeypatch):
    _wide(monkeypatch)
    _stub_client(monkeypatch, "0=5\n1=9\n2=7")
    docs = [_d("a", doc_id="A"), _d("b", doc_id="B"), _d("c", doc_id="C")]
    out = llm_rerank("q", docs)
    # 9(B) > 7(C) > 5(A)
    assert [d.metadata["doc_id"] for d in out] == ["B", "C", "A"]
    assert [d.metadata["rerank_score"] for d in out] == [9, 7, 5]


def test_rerank_handles_bracketed_and_fullwidth_colon(monkeypatch):
    _wide(monkeypatch)
    # 正则须吃 [0]=、1：(全角冒号)、2: (半角冒号+空格)
    _stub_client(monkeypatch, "[0]=3\n1：8\n2: 6")
    docs = [_d("a", doc_id="A"), _d("b", doc_id="B"), _d("c", doc_id="C")]
    out = llm_rerank("q", docs)
    assert [d.metadata["doc_id"] for d in out] == ["B", "C", "A"]
    assert [d.metadata["rerank_score"] for d in out] == [8, 6, 3]


def test_rerank_score_clamped_to_10(monkeypatch):
    _wide(monkeypatch)
    _stub_client(monkeypatch, "0=99")
    out = llm_rerank("q", [_d("a", doc_id="A")])
    assert out[0].metadata["rerank_score"] == 10          # min(s, 10)


def test_rerank_ignores_out_of_range_index_but_keeps_valid(monkeypatch):
    _wide(monkeypatch)
    # 编号 5 越界(只有 2 个候选)→ 忽略;编号 0 有效
    _stub_client(monkeypatch, "5=10\n0=4")
    docs = [_d("a", doc_id="A"), _d("b", doc_id="B")]
    out = llm_rerank("q", docs)
    # 只有 0 被打分=4,1 未打分默认 0 → A 排前
    assert out[0].metadata["doc_id"] == "A"
    assert out[0].metadata["rerank_score"] == 4
    assert out[1].metadata["doc_id"] == "B"
    assert out[1].metadata["rerank_score"] == 0


def test_rerank_truncates_to_top_n(monkeypatch):
    _wide(monkeypatch, top_n=2)
    _stub_client(monkeypatch, "0=1\n1=2\n2=3\n3=4")
    docs = [_d(x, doc_id=x) for x in ["A", "B", "C", "D"]]
    out = llm_rerank("q", docs)
    assert len(out) == 2
    assert [d.metadata["doc_id"] for d in out] == ["D", "C"]   # 分最高两篇


def test_rerank_only_scores_candidates_slice(monkeypatch):
    # rerank_candidates 限制只喂 RRF top-N;越界编号(指向被裁掉的候选)不会出现
    _wide(monkeypatch, top_n=10, candidates=2)
    _stub_client(monkeypatch, "0=5\n1=6")
    docs = [_d(x, doc_id=x) for x in ["A", "B", "C", "D"]]
    out = llm_rerank("q", docs)
    assert [d.metadata["doc_id"] for d in out] == ["B", "A"]   # 只排前 2 个候选


# ---------- 退化:整体失败(scores 空)→ RRF 序 + 及格分 ----------
def test_rerank_fallback_on_garbage_output(monkeypatch):
    _wide(monkeypatch)
    monkeypatch.setattr(retriever.settings, "grounding_min_rerank", 5)
    _stub_client(monkeypatch, "抱歉我无法完成这个任务,没有分数")   # 无 `编号=分数`
    docs = [_d("a", doc_id="A"), _d("b", doc_id="B"), _d("c", doc_id="C")]
    out = llm_rerank("q", docs)
    # RRF 序保持(原顺序),每篇及格分
    assert [d.metadata["doc_id"] for d in out] == ["A", "B", "C"]
    assert all(d.metadata["rerank_score"] == 5 for d in out)


def test_rerank_fallback_on_empty_content(monkeypatch):
    _wide(monkeypatch)
    monkeypatch.setattr(retriever.settings, "grounding_min_rerank", 5)
    _stub_client(monkeypatch, "")
    docs = [_d("a", doc_id="A"), _d("b", doc_id="B")]
    out = llm_rerank("q", docs)
    assert [d.metadata["doc_id"] for d in out] == ["A", "B"]
    assert all(d.metadata["rerank_score"] == 5 for d in out)


def test_rerank_fallback_on_none_content(monkeypatch):
    _wide(monkeypatch)
    monkeypatch.setattr(retriever.settings, "grounding_min_rerank", 5)
    _stub_client(monkeypatch, None)          # message.content=None → `or ""`
    docs = [_d("a", doc_id="A"), _d("b", doc_id="B")]
    out = llm_rerank("q", docs)
    assert [d.metadata["doc_id"] for d in out] == ["A", "B"]
    assert all(d.metadata["rerank_score"] == 5 for d in out)


def test_rerank_fallback_on_exception(monkeypatch):
    _wide(monkeypatch)
    monkeypatch.setattr(retriever.settings, "grounding_min_rerank", 5)
    _stub_client(monkeypatch, raise_exc=True)    # 端点挂 → 退化,不抛
    docs = [_d("a", doc_id="A"), _d("b", doc_id="B")]
    out = llm_rerank("q", docs)
    assert [d.metadata["doc_id"] for d in out] == ["A", "B"]
    assert all(d.metadata["rerank_score"] == 5 for d in out)


def test_rerank_fallback_respects_top_n(monkeypatch):
    # 退化路径也只返回 top_n 篇(cand[:top_n])
    _wide(monkeypatch, top_n=2)
    monkeypatch.setattr(retriever.settings, "grounding_min_rerank", 5)
    _stub_client(monkeypatch, "no scores here")
    docs = [_d(x, doc_id=x) for x in ["A", "B", "C", "D"]]
    out = llm_rerank("q", docs)
    assert [d.metadata["doc_id"] for d in out] == ["A", "B"]


# ---------- 边界:空候选 / 不改原对象 ----------
def test_rerank_empty_candidates_returns_empty(monkeypatch):
    _wide(monkeypatch)
    _stub_client(monkeypatch, "0=5")
    assert llm_rerank("q", []) == []


def test_rerank_does_not_mutate_input_docs(monkeypatch):
    _wide(monkeypatch)
    _stub_client(monkeypatch, "0=8\n1=3")
    docs = [_d("a", doc_id="A"), _d("b", doc_id="B")]
    llm_rerank("q", docs)
    # 原对象不应被写入 rerank_score(_with_meta 拷贝)
    assert all("rerank_score" not in d.metadata for d in docs)


def test_rerank_fallback_does_not_mutate_input_docs(monkeypatch):
    _wide(monkeypatch)
    monkeypatch.setattr(retriever.settings, "grounding_min_rerank", 5)
    _stub_client(monkeypatch, "garbage")
    docs = [_d("a", doc_id="A"), _d("b", doc_id="B")]
    llm_rerank("q", docs)
    assert all("rerank_score" not in d.metadata for d in docs)


def test_rerank_explicit_top_n_arg_overrides_setting(monkeypatch):
    # top_n 显式传参优先于 settings.rerank_top_n
    _wide(monkeypatch, top_n=10)
    _stub_client(monkeypatch, "0=1\n1=2\n2=3")
    docs = [_d(x, doc_id=x) for x in ["A", "B", "C"]]
    out = llm_rerank("q", docs, top_n=1)
    assert [d.metadata["doc_id"] for d in out] == ["C"]
