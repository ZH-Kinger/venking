"""M6.1 反馈落盘 feedback.py —— 零网络/LLM/Chroma。

覆盖(memory 重点 1):
- record_feedback 写一条 → load 读回,字段全对(verdict/question/answer/mode/
  retrieved_doc_ids/correction),且字段名对齐 golden 回流(retrieved_doc_ids→relevant_doc_ids、
  correction→reference、question/mode→question/expected_mode)。
- ts 传入固定值 → 落盘一致(确定性);默认 ts 为 ISO 秒串。
- 多次 append 累加、顺序保持。
- load_feedback 文件不存在 → []。
- 懒建目录:feedback_dir 不存在时 record_feedback 自动创建。

**隔离**:monkeypatch feedback.settings 到一个假 settings(feedback_dir=tmp_path 子目录),
绝不写真实 data/feedback/。
"""
from __future__ import annotations

import json
from types import SimpleNamespace

import pytest

from blog_rag import feedback


@pytest.fixture
def fb_dir(tmp_path, monkeypatch):
    """把 feedback 模块用的 settings.feedback_dir 指到 tmp 下的未创建子目录。

    feedback.py 里 `from blog_rag.config import settings`,故 feedback.settings 是模块级引用;
    换成假对象即可完全隔离(且验证懒建目录:此子目录初始不存在)。
    """
    d = tmp_path / "feedback"          # 刻意不预建 → 顺带验证 record_feedback 懒建
    monkeypatch.setattr(feedback, "settings", SimpleNamespace(feedback_dir=d))
    return d


def _read_lines(path):
    return [json.loads(ln) for ln in path.read_text(encoding="utf-8").splitlines() if ln.strip()]


# ---------------- record_feedback 基本落盘 + 字段对齐 golden ----------------
def test_record_feedback_writes_one_and_load_reads_back_all_fields(fb_dir):
    rec = feedback.record_feedback(
        verdict="down",
        question="NCCL 是什么?",
        answer="NCCL 是 NVIDIA 的集合通信库。",
        mode="grounded",
        retrieved_doc_ids=["doc-a", "doc-b"],
        sources=[{"sid": "S1", "doc_id": "doc-a"}],
        correction="应强调多 GPU 通信原语",
        ts="2026-07-14T10:00:00",
    )
    # 返回值即落盘记录
    assert rec["verdict"] == "down"
    assert rec["ts"] == "2026-07-14T10:00:00"

    loaded = feedback.load_feedback()
    assert len(loaded) == 1
    got = loaded[0]
    # 字段全对(golden 回流关键字段:question/mode/retrieved_doc_ids/correction)
    assert got["verdict"] == "down"
    assert got["question"] == "NCCL 是什么?"          # → golden.question
    assert got["answer"] == "NCCL 是 NVIDIA 的集合通信库。"
    assert got["mode"] == "grounded"                    # → golden.expected_mode
    assert got["retrieved_doc_ids"] == ["doc-a", "doc-b"]  # → golden.relevant_doc_ids
    assert got["correction"] == "应强调多 GPU 通信原语"    # → golden.reference
    assert got["sources"] == [{"sid": "S1", "doc_id": "doc-a"}]
    assert got["ts"] == "2026-07-14T10:00:00"


def test_record_feedback_fixed_ts_is_persisted_verbatim(fb_dir):
    feedback.record_feedback("up", "q", "a", "web", ts="2000-01-01T00:00:00")
    assert _read_lines(fb_dir / "feedback.jsonl")[0]["ts"] == "2000-01-01T00:00:00"


def test_record_feedback_default_ts_is_iso_seconds(fb_dir):
    rec = feedback.record_feedback("up", "q", "a", "general")
    # 默认 ts 为 ISO(timespec=seconds):形如 2026-07-14T10:00:00,无微秒
    assert "T" in rec["ts"]
    assert "." not in rec["ts"]
    # 可被 fromisoformat 解析
    from datetime import datetime
    datetime.fromisoformat(rec["ts"])


def test_record_feedback_defaults_for_optional_fields(fb_dir):
    # 不传 retrieved_doc_ids/sources/correction → 落 []/[]/""(不落 None,回流零转换)
    rec = feedback.record_feedback("up", "q", "a", "refuse")
    assert rec["retrieved_doc_ids"] == []
    assert rec["sources"] == []
    assert rec["correction"] == ""


def test_record_feedback_lazily_creates_dir(fb_dir):
    # 目录初始不存在(fixture 未预建)
    assert not fb_dir.exists()
    feedback.record_feedback("up", "q", "a", "grounded")
    assert (fb_dir / "feedback.jsonl").exists()


# ---------------- append 累加 ----------------
def test_record_feedback_appends_and_preserves_order(fb_dir):
    feedback.record_feedback("up", "q1", "a1", "grounded", ts="t1")
    feedback.record_feedback("down", "q2", "a2", "web", ts="t2")
    feedback.record_feedback("up", "q3", "a3", "general", ts="t3")
    loaded = feedback.load_feedback()
    assert [r["question"] for r in loaded] == ["q1", "q2", "q3"]
    assert [r["ts"] for r in loaded] == ["t1", "t2", "t3"]
    assert len(loaded) == 3


# ---------------- load_feedback 边界 ----------------
def test_load_feedback_missing_file_returns_empty(fb_dir):
    # 文件从未写过 → []
    assert feedback.load_feedback() == []


def test_load_feedback_skips_blank_lines(fb_dir):
    # 手工造带空行的文件(真实 append 不会产生,但读取须鲁棒)
    fb_dir.mkdir(parents=True, exist_ok=True)
    (fb_dir / "feedback.jsonl").write_text(
        json.dumps({"verdict": "up", "question": "q"}, ensure_ascii=False)
        + "\n\n"                                    # 中间空行
        + json.dumps({"verdict": "down", "question": "q2"}, ensure_ascii=False)
        + "\n",
        encoding="utf-8",
    )
    loaded = feedback.load_feedback()
    assert len(loaded) == 2
    assert loaded[1]["verdict"] == "down"


def test_record_then_load_roundtrip_unicode(fb_dir):
    # 中文非 ASCII 落盘(ensure_ascii=False)读回不乱码
    feedback.record_feedback("up", "深度学习?", "答:是。", "grounded")
    assert feedback.load_feedback()[0]["question"] == "深度学习?"
