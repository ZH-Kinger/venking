"""M8 短时记忆、历史渲染与追问查询改写。全部离线。"""
from __future__ import annotations

import sys
from types import SimpleNamespace
from typing import Annotated, TypedDict

from langchain_core.messages import AIMessage, HumanMessage
from langgraph.graph import END, START, StateGraph
from langgraph.graph.message import add_messages

from blog_rag import graph, memory


def test_recent_history_empty():
    assert memory.recent_history({}) == ""


def test_recent_history_renders_roles_and_keeps_last_k():
    state = {"messages": [
        HumanMessage(content="旧问题"),
        AIMessage(content="旧答案"),
        HumanMessage(content="NCCL 是什么"),
        AIMessage(content="集合通信库"),
    ]}
    assert memory.recent_history(state, k=2) == "用户: NCCL 是什么\n助手: 集合通信库"


def test_turn_messages_records_question_and_answer():
    out = memory.turn_messages({"question": "什么是 RAG"}, "检索增强生成")
    assert len(out) == 2
    assert out[0].type == "human" and out[0].content == "什么是 RAG"
    assert out[1].type == "ai" and out[1].content == "检索增强生成"


def test_contextualize_without_history_skips_llm(monkeypatch):
    monkeypatch.setattr(memory, "create_completion",
                        lambda **kwargs: (_ for _ in ()).throw(AssertionError("不应调用")))
    assert memory.contextualize_question("它有什么作用", "") == "它有什么作用"


def test_contextualize_success_uses_non_streaming_judge_call(monkeypatch):
    captured = {}

    def fake_completion(**kwargs):
        captured.update(kwargs)
        msg = SimpleNamespace(content="NCCL 有什么作用")
        return SimpleNamespace(choices=[SimpleNamespace(message=msg)])

    monkeypatch.setattr(memory, "create_completion", fake_completion)
    out = memory.contextualize_question(
        "它有什么作用",
        "用户:NCCL 是什么\n助手:NCCL 是集合通信库",
    )
    assert out == "NCCL 有什么作用"
    assert captured["stream"] is False
    assert captured["temperature"] == 0.0
    assert captured["extra_body"] == {"enable_thinking": False}
    assert "最近对话" in captured["messages"][1]["content"]


def test_contextualize_strips_fence_and_quotes(monkeypatch):
    msg = SimpleNamespace(content='```"NCCL 如何工作"```')
    monkeypatch.setattr(
        memory,
        "create_completion",
        lambda **kwargs: SimpleNamespace(choices=[SimpleNamespace(message=msg)]),
    )
    assert memory.contextualize_question("它如何工作", "用户:NCCL 是什么") == "NCCL 如何工作"


def test_contextualize_failure_or_bad_output_falls_back(monkeypatch):
    monkeypatch.setattr(memory, "create_completion",
                        lambda **kwargs: (_ for _ in ()).throw(RuntimeError("down")))
    assert memory.contextualize_question("它呢", "用户:NCCL") == "它呢"

    msg = SimpleNamespace(content="x" * 501)
    monkeypatch.setattr(
        memory,
        "create_completion",
        lambda **kwargs: SimpleNamespace(choices=[SimpleNamespace(message=msg)]),
    )
    assert memory.contextualize_question("它呢", "用户:NCCL") == "它呢"


def test_make_checkpointer_uses_sqlite_and_calls_setup(monkeypatch, tmp_path):
    seen = {}

    class FakeSaver:
        def __init__(self, conn):
            seen["conn"] = conn
            seen["instance"] = self

        def setup(self):
            seen["setup"] = True

    monkeypatch.setitem(
        sys.modules,
        "langgraph.checkpoint.sqlite",
        SimpleNamespace(SqliteSaver=FakeSaver),
    )
    monkeypatch.setattr(
        memory,
        "settings",
        SimpleNamespace(data_dir=tmp_path, checkpoint_db=tmp_path / "checkpoints.sqlite"),
    )
    saver = memory.make_checkpointer()
    assert saver is seen["instance"]
    assert seen["setup"] is True
    assert (tmp_path / "checkpoints.sqlite").exists()
    seen["conn"].close()


def test_sqlite_checkpointer_persists_thread_across_reopen(monkeypatch, tmp_path):
    """真实 SqliteSaver 集成:关闭再打开后,同 thread 的消息仍在并可继续追加。"""
    # 前一个测试向 sys.modules 放了 fake,pytest monkeypatch 会在用例结束恢复真实模块。
    monkeypatch.setattr(
        memory,
        "settings",
        SimpleNamespace(data_dir=tmp_path, checkpoint_db=tmp_path / "checkpoints.sqlite"),
    )

    class MiniState(TypedDict, total=False):
        messages: Annotated[list, add_messages]

    def compile_with(saver):
        builder = StateGraph(MiniState)
        builder.add_node("pass", lambda state: {})
        builder.add_edge(START, "pass")
        builder.add_edge("pass", END)
        return builder.compile(checkpointer=saver)

    cfg = {"configurable": {"thread_id": "persist-me"}}
    saver1 = memory.make_checkpointer()
    app1 = compile_with(saver1)
    first = app1.invoke({"messages": [HumanMessage(content="第一轮")]}, cfg)
    assert [m.content for m in first["messages"]] == ["第一轮"]
    saver1.conn.close()

    saver2 = memory.make_checkpointer()
    app2 = compile_with(saver2)
    second = app2.invoke({"messages": [HumanMessage(content="第二轮")]}, cfg)
    assert [m.content for m in second["messages"]] == ["第一轮", "第二轮"]
    saver2.conn.close()


def test_contextualize_query_node_writes_search_query(monkeypatch):
    captured = {}

    def fake_rewrite(question, history):
        captured.update(question=question, history=history)
        return "NCCL 有什么作用"

    monkeypatch.setattr(graph, "contextualize_question", fake_rewrite)
    state = {
        "question": "它有什么作用",
        "messages": [HumanMessage(content="NCCL 是什么"), AIMessage(content="集合通信库")],
        "stream": False,
    }
    assert graph.contextualize_query_node(state) == {"search_query": "NCCL 有什么作用"}
    assert captured["question"] == "它有什么作用"
    assert "NCCL 是什么" in captured["history"]


def test_transform_and_web_search_use_contextualized_query(monkeypatch):
    monkeypatch.setattr(graph, "generate_query_variants", lambda q, n: [q, q + " 原理"])
    assert graph.transform_query_node(
        {"question": "它呢", "search_query": "NCCL 有什么作用", "stream": False}
    ) == {"search_query": "NCCL 有什么作用 原理", "loop_step": 1}

    captured = {}
    monkeypatch.setattr(graph, "web_search",
                        lambda q: captured.setdefault("query", q) or [])
    graph.web_search_node(
        {"question": "它呢", "search_query": "NCCL 有什么作用", "stream": False}
    )
    assert captured["query"] == "NCCL 有什么作用"
