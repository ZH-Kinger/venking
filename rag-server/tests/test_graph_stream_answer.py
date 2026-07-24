"""M6.1 stream_answer 事件序列 —— 零网络/LLM/Chroma。

覆盖(memory 重点 4):
- stub graph.get_graph() 返回假图,其 .stream(...) yield 预设 [("custom",token)...,("values",final)];
  断言 stream_answer 产出对应 token 事件 + 末尾 done 事件,且 done 字段齐全、取自最后一份 values。
- custom 里非 token 的 chunk 被忽略(只透传 type==token)。
- 多份 values → done 用最后一份(state 覆盖语义)。
- 无 token / 无 values(空图输出)→ 仍产出一个 done(空契约兜底),不崩。
- stream 传参:stream_mode 恒为 ["custom","values"]。
"""
from __future__ import annotations

from blog_rag import graph


class _FakeGraph:
    """假 CompiledStateGraph:.stream() 回放预设事件,并记录被传的 stream_mode。"""

    def __init__(self, events):
        self._events = events
        self.seen_stream_mode = None

    def stream(self, init, cfg, stream_mode=None):
        self.seen_stream_mode = stream_mode
        yield from self._events


def _install(monkeypatch, events):
    fake = _FakeGraph(events)
    monkeypatch.setattr(graph, "get_graph", lambda: fake)
    return fake


_FINAL = {
    "generation": "NCCL 是 NVIDIA 集合通信库。",
    "mode": "grounded",
    "sources": [{"sid": "S1", "doc_id": "doc-a"}],
    "retrieved_doc_ids": ["doc-a"],
    "contexts": ["ctx-1"],
    "suggestions": ["sug-1"],
}


def test_stream_answer_emits_tokens_then_done(monkeypatch):
    events = [
        ("custom", {"type": "token", "text": "N"}),
        ("custom", {"type": "token", "text": "CCL"}),
        ("values", _FINAL),
    ]
    _install(monkeypatch, events)

    out = list(graph.stream_answer("NCCL 是什么?"))
    tokens = [e for e in out if e["type"] == "token"]
    dones = [e for e in out if e["type"] == "done"]

    assert [t["text"] for t in tokens] == ["N", "CCL"]
    assert len(dones) == 1
    done = dones[0]
    assert done["answer"] == _FINAL["generation"]        # generation → answer
    assert done["mode"] == "grounded"
    assert done["sources"] == _FINAL["sources"]
    assert done["retrieved_doc_ids"] == ["doc-a"]
    assert done["contexts"] == ["ctx-1"]
    assert done["suggestions"] == ["sug-1"]
    assert done["request_id"]
    assert done["thread_id"]
    assert done["trace"] == []
    assert done["latency_ms"] >= 0


def test_done_is_last_event(monkeypatch):
    _install(monkeypatch, [
        ("custom", {"type": "token", "text": "a"}),
        ("values", _FINAL),
    ])
    out = list(graph.stream_answer("q"))
    assert out[-1]["type"] == "done"


def test_stream_answer_passes_custom_and_values_stream_mode(monkeypatch):
    fake = _install(monkeypatch, [("values", _FINAL)])
    list(graph.stream_answer("q"))
    assert fake.seen_stream_mode == ["custom", "values"]


def test_progress_custom_chunk_is_forwarded_and_collected(monkeypatch):
    # progress 向前端透传;done.trace 只收终态,不收 start,避免轨迹重复。
    _install(monkeypatch, [
        ("custom", {"type": "progress", "stage": "retrieve", "status": "start"}),
        ("custom", {"type": "progress", "stage": "retrieve", "status": "done",
                    "duration_ms": 12.5}),
        ("custom", {"type": "token", "text": "ok"}),
        ("custom", "not-a-dict"),
        ("values", _FINAL),
    ])
    out = list(graph.stream_answer("q"))
    tokens = [e for e in out if e["type"] == "token"]
    assert [t["text"] for t in tokens] == ["ok"]
    progress = [e for e in out if e["type"] == "progress"]
    assert [e["status"] for e in progress] == ["start", "done"]
    assert progress[0]["request_id"]
    assert out[-1]["trace"] == [
        {"stage": "retrieve", "status": "done", "duration_ms": 12.5}
    ]


def test_last_values_wins(monkeypatch):
    # 多步 values → done 取最后一份(state 覆盖语义,如回环后 mode 变化)
    first = {"generation": "旧", "mode": "grounded", "sources": [], "retrieved_doc_ids": [],
             "contexts": [], "suggestions": []}
    last = {"generation": "新", "mode": "web", "sources": [{"wid": "W1"}],
            "retrieved_doc_ids": ["x"], "contexts": ["c"], "suggestions": []}
    _install(monkeypatch, [
        ("values", first),
        ("custom", {"type": "token", "text": "t"}),
        ("values", last),
    ])
    done = list(graph.stream_answer("q"))[-1]
    assert done["answer"] == "新"
    assert done["mode"] == "web"
    assert done["sources"] == [{"wid": "W1"}]


def test_empty_stream_still_yields_done_with_defaults(monkeypatch):
    # 无 token / 无 values(异常空图)→ 仍产出 done,字段回落默认(mode=general),不崩
    _install(monkeypatch, [])
    out = list(graph.stream_answer("q"))
    assert len(out) == 1
    done = out[0]
    assert done["type"] == "done"
    assert done["answer"] == ""
    assert done["mode"] == "general"
    assert done["sources"] == []
    assert done["retrieved_doc_ids"] == []
    assert done["contexts"] == []
    assert done["suggestions"] == []
    assert done["request_id"]
    assert done["thread_id"]
    assert done["trace"] == []


def test_refuse_mode_no_tokens_uses_done_generation(monkeypatch):
    # refuse 是确定性节点、无 token 流:只有 values,done.answer 取 generation
    refuse_final = {"generation": "均未找到权威依据,无法回答。", "mode": "refuse",
                    "sources": [], "retrieved_doc_ids": [], "contexts": [], "suggestions": []}
    _install(monkeypatch, [("values", refuse_final)])
    out = list(graph.stream_answer("q"))
    assert [e for e in out if e["type"] == "token"] == []
    done = out[-1]
    assert done["mode"] == "refuse"
    assert done["answer"] == "均未找到权威依据,无法回答。"
