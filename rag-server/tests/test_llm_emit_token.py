"""M6.1 流式 _emit_token guard —— 零网络/LLM。

覆盖(memory 重点 2):
- 非图流式上下文调用(get_stream_writer() 抛错)→ 不崩、静默返回(退化为纯 print,基线零风险)。
- 空 text → 直接 return(不触发任何 writer 逻辑)。
- writer 存在但发送抛错 → 内层 try 吞掉,不外泄。

_emit_token 里 `from langgraph.config import get_stream_writer` 是函数内 import,
可通过在 sys.modules 注入假 langgraph.config 来控制 get_stream_writer 行为。
"""
from __future__ import annotations

import sys
import types

from blog_rag import llm


def test_emit_token_outside_graph_context_does_not_raise():
    # 真实场景:CLI/eval 无图流式上下文,get_stream_writer() 抛 → 必须静默不崩
    # (不注入假模块,走真实 langgraph.config,当前非图上下文)
    llm._emit_token("hello")   # 只要不抛异常即通过


def test_emit_token_empty_string_returns_early(monkeypatch):
    # 空串:即便 writer 可用也不应被调用(前置 `if not text: return`)
    called = {"n": 0}

    def fake_get_stream_writer():
        called["n"] += 1
        return lambda payload: None

    fake_mod = types.ModuleType("langgraph.config")
    fake_mod.get_stream_writer = fake_get_stream_writer
    monkeypatch.setitem(sys.modules, "langgraph.config", fake_mod)

    llm._emit_token("")
    assert called["n"] == 0     # 空串直接 return,未取 writer


def test_emit_token_sends_payload_when_writer_available(monkeypatch):
    # writer 可用 → 发出 {"type":"token","text":...} custom 事件
    captured = []
    fake_mod = types.ModuleType("langgraph.config")
    fake_mod.get_stream_writer = lambda: (lambda payload: captured.append(payload))
    monkeypatch.setitem(sys.modules, "langgraph.config", fake_mod)

    llm._emit_token("abc")
    assert captured == [{"type": "token", "text": "abc"}]


def test_emit_token_swallows_get_stream_writer_error(monkeypatch):
    # get_stream_writer 本身抛(非图上下文的真实行为)→ 外层 except 吞掉
    def boom():
        raise RuntimeError("not in a stream context")

    fake_mod = types.ModuleType("langgraph.config")
    fake_mod.get_stream_writer = boom
    monkeypatch.setitem(sys.modules, "langgraph.config", fake_mod)

    llm._emit_token("x")        # 不抛即通过


def test_emit_token_swallows_writer_call_error(monkeypatch):
    # writer 存在但调用抛(如上层 UI 断连)→ 内层 try 吞掉,不外泄
    def bad_writer(payload):
        raise ValueError("writer boom")

    fake_mod = types.ModuleType("langgraph.config")
    fake_mod.get_stream_writer = lambda: bad_writer
    monkeypatch.setitem(sys.modules, "langgraph.config", fake_mod)

    llm._emit_token("x")        # 不抛即通过


def test_emit_token_noop_when_writer_is_none(monkeypatch):
    # get_stream_writer 返回 None(图内但没开 custom 流)→ no-op,不崩
    fake_mod = types.ModuleType("langgraph.config")
    fake_mod.get_stream_writer = lambda: None
    monkeypatch.setitem(sys.modules, "langgraph.config", fake_mod)

    llm._emit_token("x")        # 不抛即通过
