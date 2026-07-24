"""Cross-cutting Agent node instrumentation tests."""
from __future__ import annotations

import pytest

from blog_rag import observability


def test_instrument_node_preserves_result_and_emits_lifecycle(monkeypatch):
    events = []
    monkeypatch.setattr(observability, "_emit", events.append)

    wrapped = observability.instrument_node(
        "retrieve",
        lambda state: {"documents": [state["question"]]},
    )
    out = wrapped({"question": "NCCL", "request_id": "req-1"})

    assert out == {"documents": ["NCCL"]}
    assert [event["status"] for event in events] == ["start", "done"]
    assert all(event["stage"] == "retrieve" for event in events)
    assert all(event["request_id"] == "req-1" for event in events)
    assert events[-1]["duration_ms"] >= 0


def test_instrument_node_logs_and_reraises_failures(monkeypatch):
    events = []
    monkeypatch.setattr(observability, "_emit", events.append)

    def fail(_state):
        raise RuntimeError("boom")

    wrapped = observability.instrument_node("grade_web", fail)
    with pytest.raises(RuntimeError, match="boom"):
        wrapped({"request_id": "req-2"})

    assert [event["status"] for event in events] == ["start", "error"]
    assert events[-1]["stage"] == "grade_web"
    assert events[-1]["request_id"] == "req-2"
