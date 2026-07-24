"""M5 CRAG 细筛 + 闸门:grade_documents / grounding_gate / grade_web / after_web。

零网络/LLM/Chroma。覆盖(memory 重点 3/4/5/6/9):
- grade_documents:按 rerank_score 阈值过滤(monkeypatch 阈值),保留达标、剔除不达标、
  恰好=阈值边界保留、空输入→[];不调 LLM。
- grounding_gate 新语义:graded 非空→grounded;空+有额度→rewrite;空+额度尽+web开→web;
  空+额度尽+web关→refuse;web_mode 短路→web。含"假弃答回归守卫"。
- grade_web:空→False;stub get_client 返 yes→True/返 no→False;异常→True(保守放行)。
- after_web:无结果→refuse;有但不相关→refuse;相关→web_generate。
"""
from __future__ import annotations

from types import SimpleNamespace

from langchain_core.documents import Document

from blog_rag import graders
from blog_rag.graders import after_web, grade_documents, grade_web, grounding_gate


def _d(content: str = "body", **meta) -> Document:
    return Document(page_content=content, metadata=meta)


def _fake_completion(text):
    msg = SimpleNamespace(content=text, reasoning_content=None)
    return SimpleNamespace(choices=[SimpleNamespace(message=msg)])


def _fake_client(text: str = "yes"):
    completions = SimpleNamespace(create=lambda **kw: _fake_completion(text))
    return SimpleNamespace(chat=SimpleNamespace(completions=completions))


# ==================== grade_documents(CRAG 细筛,不调 LLM) ====================
def test_grade_keeps_only_at_or_above_threshold(monkeypatch):
    monkeypatch.setattr(graders.settings, "grounding_min_rerank", 5)
    docs = [
        _d("keep-8", doc_id="A", rerank_score=8),
        _d("drop-2", doc_id="B", rerank_score=2),
        _d("keep-5", doc_id="C", rerank_score=5),   # 恰好=阈值 → 保留(>=)
    ]
    out = grade_documents({"documents": docs})
    kept = [d.metadata["doc_id"] for d in out["graded_documents"]]
    assert kept == ["A", "C"]


def test_grade_boundary_exactly_at_threshold_kept(monkeypatch):
    # 边界:rerank 恰好=阈值必须保留(细筛不能把恰好达标的证据误剔)
    monkeypatch.setattr(graders.settings, "grounding_min_rerank", 5)
    out = grade_documents({"documents": [_d(doc_id="A", rerank_score=5)]})
    assert len(out["graded_documents"]) == 1


def test_grade_just_below_threshold_dropped(monkeypatch):
    monkeypatch.setattr(graders.settings, "grounding_min_rerank", 5)
    out = grade_documents({"documents": [_d(doc_id="A", rerank_score=4)]})
    assert out["graded_documents"] == []


def test_grade_missing_rerank_score_treated_as_zero(monkeypatch):
    # 无 rerank_score 元数据 → 默认 0 → 阈值>0 时被剔除
    monkeypatch.setattr(graders.settings, "grounding_min_rerank", 5)
    out = grade_documents({"documents": [_d(doc_id="A")]})
    assert out["graded_documents"] == []


def test_grade_empty_documents(monkeypatch):
    monkeypatch.setattr(graders.settings, "grounding_min_rerank", 5)
    assert grade_documents({"documents": []}) == {"graded_documents": []}


def test_grade_missing_documents_key(monkeypatch):
    # state 无 documents 字段 → 视作空,不抛
    monkeypatch.setattr(graders.settings, "grounding_min_rerank", 5)
    assert grade_documents({}) == {"graded_documents": []}


def test_grade_all_pass_when_threshold_zero(monkeypatch):
    monkeypatch.setattr(graders.settings, "grounding_min_rerank", 0)
    docs = [_d(doc_id="A", rerank_score=0), _d(doc_id="B", rerank_score=3)]
    out = grade_documents({"documents": docs})
    assert len(out["graded_documents"]) == 2


def test_grade_does_not_call_llm(monkeypatch):
    # 守卫:细筛纯用已有 rerank_score,绝不触碰 get_client
    def _boom():
        raise AssertionError("grade_documents 不应调用 LLM")
    monkeypatch.setattr(graders, "get_client", _boom)
    monkeypatch.setattr(graders.settings, "grounding_min_rerank", 5)
    grade_documents({"documents": [_d(doc_id="A", rerank_score=8)]})


# ==================== grounding_gate(新语义:看 graded_documents) ====================
def test_gate_grounded_when_graded_nonempty():
    # 假弃答回归守卫:有细筛达标证据 → grounded(细筛没把该接地误判)
    state = {"graded_documents": [_d(doc_id="A", rerank_score=8)],
             "loop_step": 0, "max_retries": 1}
    assert grounding_gate(state) == "grounded"


def test_gate_grounded_ignores_best_score():
    # 新语义只看 graded_documents,不再看 best_score:即便 best_score 低,有 graded 仍 grounded
    state = {"graded_documents": [_d(doc_id="A", rerank_score=6)],
             "best_score": 0, "loop_step": 0, "max_retries": 1}
    assert grounding_gate(state) == "grounded"


def test_gate_rewrite_when_empty_and_retries_left():
    state = {"graded_documents": [], "loop_step": 0, "max_retries": 1}
    assert grounding_gate(state) == "rewrite"


def test_gate_web_when_empty_retries_exhausted_web_enabled(monkeypatch):
    monkeypatch.setattr(graders.settings, "web_search_enabled", True)
    state = {"graded_documents": [], "loop_step": 1, "max_retries": 1}
    assert grounding_gate(state) == "web"


def test_gate_refuse_when_empty_retries_exhausted_web_disabled(monkeypatch):
    monkeypatch.setattr(graders.settings, "web_search_enabled", False)
    state = {"graded_documents": [], "loop_step": 1, "max_retries": 1}
    assert grounding_gate(state) == "refuse"


def test_gate_web_mode_short_circuits_to_web():
    # web_mode 最高优先:即便有 graded_documents 也走 web(用户强制联网)
    state = {"web_mode": True, "graded_documents": [_d(doc_id="A", rerank_score=9)],
             "loop_step": 0, "max_retries": 1}
    assert grounding_gate(state) == "web"


def test_gate_web_mode_beats_empty_and_no_retries():
    state = {"web_mode": True, "graded_documents": [], "loop_step": 9, "max_retries": 1}
    assert grounding_gate(state) == "web"


def test_gate_missing_graded_key_defaults_empty(monkeypatch):
    # 无 graded_documents 字段 → 视作空 → 按额度分流
    monkeypatch.setattr(graders.settings, "web_search_enabled", True)
    assert grounding_gate({"loop_step": 5, "max_retries": 1}) == "web"


def test_gate_loop_step_boundary_equals_max_no_rewrite(monkeypatch):
    # loop_step == max_retries → 额度用尽,不再 rewrite(闸门用 <,非 <=)
    monkeypatch.setattr(graders.settings, "web_search_enabled", True)
    state = {"graded_documents": [], "loop_step": 1, "max_retries": 1}
    assert grounding_gate(state) == "web"


def test_gate_uses_settings_max_retries_when_absent(monkeypatch):
    # state 无 max_retries → 回落 settings.max_retries
    monkeypatch.setattr(graders.settings, "max_retries", 2)
    # loop_step=1 < 2 → 仍有额度 → rewrite
    assert grounding_gate({"graded_documents": [], "loop_step": 1}) == "rewrite"
    # loop_step=2 == 2 → 额度尽
    monkeypatch.setattr(graders.settings, "web_search_enabled", False)
    assert grounding_gate({"graded_documents": [], "loop_step": 2}) == "refuse"


def test_gate_does_not_call_llm(monkeypatch):
    def _boom():
        raise AssertionError("grounding_gate 不应调用 LLM")
    monkeypatch.setattr(graders, "get_client", _boom)
    grounding_gate({"graded_documents": [_d(doc_id="A", rerank_score=8)]})


# ==================== grade_web(联网证据打分) ====================
def test_grade_web_empty_results_is_false():
    # 无联网结果 → web_relevant False(不调 LLM)
    assert grade_web({"question": "q", "web_results": []}) == {"web_relevant": False}


def test_grade_web_missing_key_is_false():
    assert grade_web({"question": "q"}) == {"web_relevant": False}


def test_grade_web_yes_is_relevant(monkeypatch):
    monkeypatch.setattr(graders, "get_client", lambda: _fake_client("yes"))
    state = {"question": "GB200 功耗", "web_results": [{"title": "白皮书", "snippet": "GB200..."}]}
    assert grade_web(state) == {"web_relevant": True}


def test_grade_web_no_is_irrelevant(monkeypatch):
    monkeypatch.setattr(graders, "get_client", lambda: _fake_client("no"))
    state = {"question": "GB200 功耗", "web_results": [{"title": "广告", "snippet": "无关首页"}]}
    assert grade_web(state) == {"web_relevant": False}


def test_grade_web_exception_conservatively_passes(monkeypatch):
    # 打分失败 → 保守放行 True(交后置护栏兜底)
    def _raise():
        raise RuntimeError("LLM down")
    monkeypatch.setattr(graders, "get_client", _raise)
    state = {"question": "q", "web_results": [{"title": "t", "snippet": "s"}]}
    assert grade_web(state) == {"web_relevant": True}


def test_grade_web_handles_missing_item_fields(monkeypatch):
    # 结果项缺 title/snippet 字段 → 拼接不抛(用 .get 兜底)
    monkeypatch.setattr(graders, "get_client", lambda: _fake_client("yes"))
    state = {"question": "q", "web_results": [{}]}
    assert grade_web(state) == {"web_relevant": True}


def test_grade_web_none_content_passes(monkeypatch):
    # content None → "" → 非以 "no" 开头 → 放行(True)。
    # 设计:空/不确定信号保守放行(与异常分支一致),仅明确 no 才判不相关;假弃答比假答更糟,且有护栏兜底。
    monkeypatch.setattr(graders, "get_client", lambda: _fake_client(None))
    state = {"question": "q", "web_results": [{"title": "t", "snippet": "s"}]}
    assert grade_web(state) == {"web_relevant": True}


# ==================== after_web(联网后分叉) ====================
def test_after_web_no_results_refuses():
    assert after_web({"web_results": []}) == "refuse"


def test_after_web_missing_key_refuses():
    assert after_web({}) == "refuse"


def test_after_web_irrelevant_refuses():
    state = {"web_results": [{"title": "t"}], "web_relevant": False}
    assert after_web(state) == "refuse"


def test_after_web_relevant_generates():
    state = {"web_results": [{"title": "t"}], "web_relevant": True}
    assert after_web(state) == "web_generate"


def test_after_web_relevant_defaults_true_when_absent():
    # 有结果但无 web_relevant 字段 → 默认 True → web_generate
    assert after_web({"web_results": [{"title": "t"}]}) == "web_generate"
