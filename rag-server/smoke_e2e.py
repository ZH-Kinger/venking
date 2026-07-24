"""部署冒烟:容器内真跑四模式,验证"能不能答"(不是 curl 200 空壳)。
用法(服务器):docker exec blog-rag-agent python /app/smoke_e2e.py
"""
from blog_rag.graph import answer_graph

CASES = [
    ("NCCL 是什么", "grounded"),
    ("用 Python 写快速排序", "general"),
    ("红烧肉怎么做", "general"),
    ("这份手册的作者是谁", "refuse"),
]


def main() -> int:
    ok = 0
    for q, exp in CASES:
        try:
            r = answer_graph(q, stream=False, show_reasoning=False,
                             fusion=False, web_mode=False, thread_id="verify")
            m, n, L = r.get("mode"), len(r.get("sources", [])), len(r.get("answer", ""))
            hit = (m == exp)
            ok += hit
            print(("OK  " if hit else "DIFF") + f" [{q}] mode={m}(exp {exp}) src={n} len={L}")
        except Exception as e:
            print(f"CRASH [{q}] {type(e).__name__}: {e}")
    print(f"--- mode hit {ok}/{len(CASES)} ---")
    return 0 if ok >= 3 else 1


if __name__ == "__main__":
    raise SystemExit(main())
