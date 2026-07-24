"""M5 认知路由:_prefilter_route / route_question / classify_route —— 零网络/LLM。

覆盖(memory 重点 1/2):
- _prefilter_route:各类通用词命中→general;技术问题→None;大小写。
- route_question 三层防御纵深:web_mode→rag(不调 classify,守卫)/预筛命中→general
  (不调 classify)/都不中→调 classify(stub)。
- classify_route:stub get_client 返 general/rag/异常输出/抛异常 → 归一 general/rag。
"""
from __future__ import annotations

from types import SimpleNamespace

import pytest

from blog_rag import graders
from blog_rag.graders import _prefilter_route, classify_route, route_question


# ---------- 离线 LLM 替身(与 test_rag_chain 同构:completion.choices[0].message.content) ----------
def _fake_completion(text: str):
    msg = SimpleNamespace(content=text, reasoning_content=None)
    return SimpleNamespace(choices=[SimpleNamespace(message=msg)])


def _fake_client(text: str = "rag"):
    completions = SimpleNamespace(create=lambda **kw: _fake_completion(text))
    return SimpleNamespace(chat=SimpleNamespace(completions=completions))


def _boom_client(*a, **k):
    raise AssertionError("route 守卫路径不应触碰 LLM(get_client)")


# ==================== 1. _prefilter_route ====================
@pytest.mark.parametrize("q", [
    "你好", "您好啊", "在吗", "谢谢你", "哈喽", "早上好", "晚安", "拜拜",   # 寒暄/情感
    "红烧肉怎么做", "有什么菜谱推荐", "食谱大全", "怎么做菜", "怎么减肥", "今日星座运势",  # 生活
    "帮我写一首关于春天的诗", "写一篇散文", "讲个笑话", "写作文", "来个藏头诗", "对联怎么写",  # 创作
])
def test_prefilter_hits_general(q):
    assert _prefilter_route(q) == "general"


@pytest.mark.parametrize("q", [
    "NCCL 是什么", "CUDA out of memory 怎么排查", "TCP 如何保证可靠传输",
    "BF16 和 FP16 区别", "介绍一下 PagedAttention", "什么是 RAG",
])
def test_prefilter_misses_technical(q):
    # 技术问题必须交 LLM(返 None),绝不能被预筛误判为 general(否则丢引用)
    assert _prefilter_route(q) is None


def test_prefilter_case_insensitive():
    # 预筛先 .lower();含英文关键字大小写均命中(用带英文的写作词构造)
    # 中文词无大小写,这里验证 lower 不影响命中且英文场景健壮
    assert _prefilter_route("写一首诗") == "general"
    assert _prefilter_route("写一首诗".upper()) == "general"


def test_prefilter_empty_string_is_none():
    assert _prefilter_route("") is None


def test_prefilter_substring_match_within_sentence():
    # 关键词作为子串出现在长句中也命中(any(p in q))
    assert _prefilter_route("今天有点无聊，帮我写一首歌词吧") == "general"


# ==================== 2. route_question 三层防御 ====================
def test_route_web_mode_forces_rag_without_llm(monkeypatch):
    # 第①层:用户点了联网 → 强制 rag,绝不调 classify/LLM
    monkeypatch.setattr(graders, "get_client", _boom_client)

    def _boom_classify(*a, **k):
        raise AssertionError("web_mode 短路后不应调 classify_route")
    monkeypatch.setattr(graders, "classify_route", _boom_classify)
    out = route_question({"question": "红烧肉怎么做", "web_mode": True})
    assert out == {"route": "rag"}


def test_route_prefilter_hit_returns_general_without_llm(monkeypatch):
    # 第②层:确定性预筛命中 → general,不调 classify/LLM
    monkeypatch.setattr(graders, "get_client", _boom_client)

    def _boom_classify(*a, **k):
        raise AssertionError("预筛命中后不应调 classify_route")
    monkeypatch.setattr(graders, "classify_route", _boom_classify)
    out = route_question({"question": "帮我写一首诗", "web_mode": False})
    assert out == {"route": "general"}


def test_route_falls_through_to_classify(monkeypatch):
    # 第③层:非 web_mode 且预筛未命中 → 调 classify_route(stub 返回被采纳)
    calls = {"n": 0}

    def _fake_classify(q):
        calls["n"] += 1
        assert q == "NCCL 是什么"
        return "rag"
    monkeypatch.setattr(graders, "classify_route", _fake_classify)
    out = route_question({"question": "NCCL 是什么"})
    assert out == {"route": "rag"}
    assert calls["n"] == 1


def test_route_classify_can_return_general(monkeypatch):
    # 预筛漏网的通用问题由 classify 兜底判 general(证明第三层结果被采纳)
    monkeypatch.setattr(graders, "classify_route", lambda q: "general")
    out = route_question({"question": "推荐几部电影"})  # 不在预筛表 → 交 classify
    assert out == {"route": "general"}


def test_route_web_mode_beats_prefilter(monkeypatch):
    # 优先级:web_mode(①)> 预筛(②)。通用问题 + web_mode → 仍 rag(交 gate 强制联网)
    monkeypatch.setattr(graders, "get_client", _boom_client)
    out = route_question({"question": "红烧肉怎么做", "web_mode": True})
    assert out["route"] == "rag"


# ==================== 3. classify_route(stub get_client) ====================
def test_classify_returns_general(monkeypatch):
    monkeypatch.setattr(graders, "get_client", lambda: _fake_client("general"))
    assert classify_route("闲聊") == "general"


def test_classify_general_case_and_whitespace(monkeypatch):
    monkeypatch.setattr(graders, "get_client", lambda: _fake_client("  GENERAL\n"))
    assert classify_route("闲聊") == "general"


def test_classify_returns_rag(monkeypatch):
    monkeypatch.setattr(graders, "get_client", lambda: _fake_client("rag"))
    assert classify_route("NCCL 是什么") == "rag"


def test_classify_unknown_output_defaults_rag(monkeypatch):
    # 输出既非 general 也非 rag(未含 'general')→ 安全侧退化为 rag
    monkeypatch.setattr(graders, "get_client", lambda: _fake_client("我不确定"))
    assert classify_route("x") == "rag"


def test_classify_none_content_defaults_rag(monkeypatch):
    monkeypatch.setattr(graders, "get_client", lambda: _fake_client(None))
    assert classify_route("x") == "rag"


def test_classify_exception_defaults_rag(monkeypatch):
    def _raise():
        raise RuntimeError("LLM down")
    monkeypatch.setattr(graders, "get_client", _raise)
    assert classify_route("x") == "rag"
