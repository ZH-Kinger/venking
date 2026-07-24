"""M6.1 Gradio UI app.py —— 零网络/LLM/Chroma/不 launch。

覆盖(memory 重点 3 + 5):
- _render_sources 四模式各自首行/关键内容(纯函数,直接喂 done dict):
  grounded 出 [S#]+doc_id、web 出 [W#]+markdown 链接(url)、refuse 出弃答字样、
  general 出「非知识库」+ suggestions 列表。
- chat_fn 空输入 → 产出提示且不调 stream_answer(stub 守卫证不被调)。
- chat_fn 正常流:stub stream_answer 回放 token+done → 末帧 history 末条=累积答案、
  last 快照字段齐全、来源面板含 badge。
- like_fn:有 last → 调 record_feedback(verdict 由 data.liked 决定);last 为 None → 不落盘。
- build_demo() 能构建(不 launch)。
"""
from __future__ import annotations

from types import SimpleNamespace

import pytest

from blog_rag import app


# ==================== _render_sources 四模式 ====================
def test_render_sources_grounded_has_sid_and_doc_id():
    done = {"mode": "grounded", "sources": [
        {"sid": "S1", "doc_id": "doc-a", "section": "简介"},
        {"sid": "S2", "doc_id": "doc-b"},
    ]}
    md = app._render_sources(done)
    assert "知识库" in md and "有据" in md          # grounded 首行
    assert "[S1]" in md and "doc-a" in md
    assert "简介" in md                              # 有 section 时拼上
    assert "[S2]" in md and "doc-b" in md
    # 不互污:grounded 不该出现 web 的 [W#]
    assert "[W" not in md


def test_render_sources_web_has_wid_and_markdown_link():
    done = {"mode": "web", "sources": [
        {"wid": "W1", "title": "NCCL Docs", "url": "https://example.com/nccl"},
    ]}
    md = app._render_sources(done)
    assert "联网" in md
    assert "[W1]" in md
    # markdown 链接形式 [title](url)
    assert "[NCCL Docs](https://example.com/nccl)" in md
    assert "[S" not in md                            # 不互污


def test_render_sources_refuse_shows_abstain():
    md = app._render_sources({"mode": "refuse"})
    assert "弃答" in md
    assert "不臆造" in md or "不知道" in md


def test_render_sources_general_shows_non_kb_and_suggestions():
    done = {"mode": "general", "suggestions": ["NCCL 是什么", "RAG 架构"]}
    md = app._render_sources(done)
    assert "非知识库" in md
    assert "NCCL 是什么" in md and "RAG 架构" in md


def test_render_sources_general_without_suggestions():
    md = app._render_sources({"mode": "general"})
    assert "非知识库" in md                          # suggestions 缺失也不崩


def test_render_sources_defaults_to_general_when_mode_missing():
    # done 无 mode → 回落 general(不崩)
    md = app._render_sources({})
    assert "非知识库" in md


# ==================== chat_fn 空输入守卫 ====================
def test_chat_fn_empty_input_prompts_and_skips_stream(monkeypatch):
    called = {"n": 0}
    monkeypatch.setattr(app, "stream_answer",
                        lambda *a, **k: called.__setitem__("n", called["n"] + 1) or iter(()))
    out = list(app.chat_fn("   ", [], deep_thinking=False, web_mode=False, thread_id="tid-1"))
    assert len(out) == 1
    history, msg_or_sources, tid, last = out[0]
    assert "请输入问题" in msg_or_sources
    assert tid == "tid-1"
    assert last is None
    assert called["n"] == 0                          # stream_answer 未被调用


# ==================== chat_fn 正常流 ====================
def _fake_stream(events):
    def _gen(*args, **kwargs):
        yield from events
    return _gen


def test_chat_fn_streams_tokens_and_finalizes_snapshot(monkeypatch):
    events = [
        {"type": "token", "text": "NC"},
        {"type": "token", "text": "CL"},
        {"type": "done", "answer": "NCCL 是通信库。", "mode": "grounded",
         "sources": [{"sid": "S1", "doc_id": "doc-a"}], "retrieved_doc_ids": ["doc-a"],
         "suggestions": []},
    ]
    monkeypatch.setattr(app, "stream_answer", _fake_stream(events))

    out = list(app.chat_fn("NCCL?", [], deep_thinking=True, web_mode=False, thread_id=None))
    # 至少:2 次 token 增量 + 1 次最终帧
    assert len(out) >= 3
    final_history, final_sources, tid, last = out[-1]

    # 末条 assistant 消息 = done.answer(非流式累积的 "NCCL",而是 done 里的完整文本)
    assert final_history[-1]["role"] == "assistant"
    assert final_history[-1]["content"] == "NCCL 是通信库。"
    # 用户消息也在
    assert final_history[0] == {"role": "user", "content": "NCCL?"}
    # thread_id 为 None 时自动生成一个非空 hex
    assert isinstance(tid, str) and len(tid) > 0
    # last 快照供 👍👎 落盘
    assert last["question"] == "NCCL?"
    assert last["answer"] == "NCCL 是通信库。"
    assert last["mode"] == "grounded"
    assert last["retrieved_doc_ids"] == ["doc-a"]
    assert last["sources"] == [{"sid": "S1", "doc_id": "doc-a"}]
    # 来源面板含 grounded badge + 引用
    assert "[S1]" in final_sources


def test_chat_fn_reuses_given_thread_id(monkeypatch):
    events = [{"type": "done", "answer": "a", "mode": "general", "sources": [],
               "retrieved_doc_ids": [], "suggestions": []}]
    monkeypatch.setattr(app, "stream_answer", _fake_stream(events))
    out = list(app.chat_fn("q", [], deep_thinking=False, web_mode=False, thread_id="fixed-tid"))
    assert out[-1][2] == "fixed-tid"                 # 会话固定 thread_id 透传


def test_chat_fn_refuse_no_tokens_uses_done_answer(monkeypatch):
    # refuse 无 token,answer 从 done 兜底
    events = [{"type": "done", "answer": "无法回答。", "mode": "refuse", "sources": [],
               "retrieved_doc_ids": [], "suggestions": []}]
    monkeypatch.setattr(app, "stream_answer", _fake_stream(events))
    out = list(app.chat_fn("q", [], deep_thinking=False, web_mode=False, thread_id="t"))
    final_history, final_sources, _, last = out[-1]
    assert final_history[-1]["content"] == "无法回答。"
    assert last["mode"] == "refuse"
    assert "弃答" in final_sources


def test_chat_fn_does_not_mutate_input_history(monkeypatch):
    events = [{"type": "done", "answer": "a", "mode": "general", "sources": [],
               "retrieved_doc_ids": [], "suggestions": []}]
    monkeypatch.setattr(app, "stream_answer", _fake_stream(events))
    original = [{"role": "user", "content": "prev"}, {"role": "assistant", "content": "old"}]
    list(app.chat_fn("q", original, deep_thinking=False, web_mode=False, thread_id="t"))
    assert original == [{"role": "user", "content": "prev"},
                        {"role": "assistant", "content": "old"}]   # 原 list 未被改


# ==================== like_fn 落盘 ====================
def test_like_fn_records_up_when_liked(monkeypatch):
    captured = {}
    monkeypatch.setattr(app.feedback, "record_feedback",
                        lambda *a, **k: captured.update({"args": a, "kwargs": k}))
    monkeypatch.setattr(app.gr, "Info", lambda *a, **k: None)
    last = {"question": "q", "answer": "a", "mode": "grounded",
            "retrieved_doc_ids": ["d1"], "sources": [{"sid": "S1"}]}
    app.like_fn(SimpleNamespace(liked=True), last)
    verdict, question, answer, mode = captured["args"][:4]
    assert verdict == "up"
    assert question == "q" and answer == "a" and mode == "grounded"


def test_like_fn_records_down_when_disliked(monkeypatch):
    captured = {}
    monkeypatch.setattr(app.feedback, "record_feedback",
                        lambda *a, **k: captured.update({"args": a}))
    monkeypatch.setattr(app.gr, "Info", lambda *a, **k: None)
    last = {"question": "q", "answer": "a", "mode": "web",
            "retrieved_doc_ids": [], "sources": []}
    app.like_fn(SimpleNamespace(liked=False), last)
    assert captured["args"][0] == "down"


def test_like_fn_noop_when_no_last(monkeypatch):
    called = {"n": 0}
    monkeypatch.setattr(app.feedback, "record_feedback",
                        lambda *a, **k: called.__setitem__("n", called["n"] + 1))
    assert app.like_fn(SimpleNamespace(liked=True), None) is None
    assert called["n"] == 0                          # 无快照 → 不落盘


# ==================== build_demo 构建(不 launch) ====================
def test_build_demo_constructs_without_launch():
    demo = app.build_demo()
    assert demo is not None
    # gr.Blocks 实例应带 launch 方法(但本测试绝不调用它)
    assert hasattr(demo, "launch")
