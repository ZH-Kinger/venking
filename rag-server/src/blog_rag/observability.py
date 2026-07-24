"""Agent execution observability without coupling business nodes to transport code.

Every LangGraph node is wrapped at graph assembly time. The wrapper emits small
custom-stream progress events and structured log lines, while returning the
node's original state update unchanged. This keeps tracing out of checkpoints
and prevents per-request telemetry from growing conversation memory.
"""
from __future__ import annotations

import logging
from collections.abc import Callable
from functools import wraps
from time import perf_counter
from typing import Any

logger = logging.getLogger("blog_rag.agent")


def _emit(event: dict[str, Any]) -> None:
    """Best-effort custom stream emission; invocation/eval paths stay no-op."""
    try:
        from langgraph.config import get_stream_writer

        writer = get_stream_writer()
    except Exception:
        return
    if not writer:
        return
    try:
        writer(event)
    except Exception:
        return


def instrument_node(name: str, node: Callable[[dict], dict]) -> Callable[[dict], dict]:
    """Wrap a graph node with timing, progress events and failure logging."""

    @wraps(node)
    def wrapped(state: dict) -> dict:
        request_id = state.get("request_id", "")
        _emit({
            "type": "progress",
            "stage": name,
            "status": "start",
            "request_id": request_id,
        })
        started = perf_counter()
        try:
            result = node(state)
        except Exception:
            duration_ms = round((perf_counter() - started) * 1000, 1)
            _emit({
                "type": "progress",
                "stage": name,
                "status": "error",
                "duration_ms": duration_ms,
                "request_id": request_id,
            })
            logger.exception(
                "agent_node_failed request_id=%s stage=%s duration_ms=%s",
                request_id,
                name,
                duration_ms,
            )
            raise

        duration_ms = round((perf_counter() - started) * 1000, 1)
        _emit({
            "type": "progress",
            "stage": name,
            "status": "done",
            "duration_ms": duration_ms,
            "request_id": request_id,
        })
        logger.info(
            "agent_node_done request_id=%s stage=%s duration_ms=%s",
            request_id,
            name,
            duration_ms,
        )
        return result

    return wrapped
