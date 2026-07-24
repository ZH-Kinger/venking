"""M6 反馈落盘:UI 的 👍👎(+可选纠正文本)→ 追加 JSONL。

为什么这样设计:
- **字段刻意对齐 golden.jsonl**,回流零转换——一条被认可的负反馈,人工补个 `id` 就能
  直接进评测金标集:`retrieved_doc_ids`→golden 的 `relevant_doc_ids`、`correction`→`reference`、
  `question`/`mode`→`question`/`expected_mode`。这就是"👍👎 → 评测集"闭环最省事的接法。
- 一行一条 JSON,append 落 `settings.feedback_dir/feedback.jsonl`(gitignore 的 data/ 下),
  懒建目录;不引 Langfuse(单用户右尺寸,可观测留 M7)。
- `ts` 由调用方可传(便于测试确定性);默认取当前时间。
"""
from __future__ import annotations

import json
from datetime import datetime

from blog_rag.config import settings

FEEDBACK_FILE = "feedback.jsonl"


def record_feedback(
    verdict: str,                      # "up"(👍)| "down"(👎)
    question: str,
    answer: str,
    mode: str,                         # grounded/web/general/refuse
    retrieved_doc_ids: list[str] | None = None,
    sources: list[dict] | None = None,
    correction: str | None = None,     # 用户纠正文本(可选)→ 回流当 golden 的 reference
    ts: str | None = None,
) -> dict:
    """把一条反馈追加到 feedback.jsonl,返回落盘的记录 dict。"""
    d = settings.feedback_dir
    d.mkdir(parents=True, exist_ok=True)
    rec = {
        "ts": ts or datetime.now().isoformat(timespec="seconds"),
        "verdict": verdict,
        "question": question,
        "answer": answer,
        "mode": mode,
        "retrieved_doc_ids": list(retrieved_doc_ids or []),
        "sources": list(sources or []),
        "correction": correction or "",
    }
    with open(d / FEEDBACK_FILE, "a", encoding="utf-8") as f:
        f.write(json.dumps(rec, ensure_ascii=False) + "\n")
    return rec


def load_feedback() -> list[dict]:
    """读回全部反馈(供回流筛选脚本/未来分析用);文件不存在→[]。"""
    path = settings.feedback_dir / FEEDBACK_FILE
    if not path.exists():
        return []
    with open(path, encoding="utf-8") as f:
        return [json.loads(ln) for ln in f if ln.strip()]
