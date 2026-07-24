"""M3 跑评测:golden.jsonl → 每题跑 answer() → 算检索/生成指标 → CSV + 汇总表。

每题只调一次 answer()(它已返回 retrieved_doc_ids/contexts,评测不再重复检索)。
用法:  rag-server/.venv/Scripts/python.exe -m blog_rag.eval.run_eval
产物:  rag-server/data/eval_results.csv
"""
from __future__ import annotations

import csv
import json
import math
from pathlib import Path

from blog_rag.config import settings
from blog_rag.eval import metrics as M
from blog_rag.rag_chain import answer

GOLDEN = Path(__file__).parent / "golden.jsonl"
OUT_CSV = settings.data_dir / "eval_results.csv"
_METRICS = ("hit@k", "mrr", "faithfulness", "answer_relevancy", "context_recall")


def _nanmean(xs) -> float:
    v = [x for x in xs if not (isinstance(x, float) and math.isnan(x))]
    return round(sum(v) / len(v), 3) if v else float("nan")


def run() -> None:
    entries = [json.loads(ln) for ln in GOLDEN.read_text(encoding="utf-8").splitlines() if ln.strip()]
    k = settings.top_k
    rows = []
    for g in entries:
        q = g["question"]
        print(f"\n{'='*54}\n[{g['id']}] {q}", flush=True)
        res = answer(q, stream=False)
        rel = g.get("relevant_doc_ids", [])
        row = {
            "id": g["id"],
            "expected_mode": g.get("expected_mode", ""),
            "mode": res["mode"],
            "mode_ok": int(res["mode"] == g.get("expected_mode")),
            "hit@k": M.hit_at_k(res["retrieved_doc_ids"], rel, k),
            "mrr": round(M.mrr(res["retrieved_doc_ids"], rel), 3),
            "faithfulness": M.faithfulness(res["answer"], res["contexts"]),
            "answer_relevancy": M.answer_relevancy(q, res["answer"]),
            "context_recall": M.context_recall(g.get("reference", ""), res["contexts"]),
        }
        rows.append(row)
        print("  →", {m: row[m] for m in ("mode", "mode_ok", *_METRICS)}, flush=True)

    OUT_CSV.parent.mkdir(parents=True, exist_ok=True)
    with OUT_CSV.open("w", newline="", encoding="utf-8-sig") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)

    print(f"\n{'='*54}\n== 汇总(n={len(rows)},nan=该题不适用已跳过)==", flush=True)
    for m in _METRICS:
        print(f"  {m:18s}: {_nanmean([r[m] for r in rows])}", flush=True)
    print(f"  {'mode 正确率':16s}: {sum(r['mode_ok'] for r in rows)}/{len(rows)}", flush=True)
    print(f"CSV → {OUT_CSV}", flush=True)


if __name__ == "__main__":
    run()
