"""M2 命令行入口:`blog-rag "你的问题"`(装了 console script 后)或
   `python -m blog_rag.cli "你的问题"`。

薄封装,把问题交给 rag_chain.answer(hybrid 检索 → 带引用生成 → 弃答/通用兜底)。
标志:
  --reasoning    打印模型思考过程
"""
from __future__ import annotations

import argparse


def main() -> None:
    parser = argparse.ArgumentParser(prog="blog-rag", description="博客知识库问答(M2 单跳 RAG)")
    parser.add_argument("query", nargs="+", help="你的问题")
    parser.add_argument("--reasoning", action="store_true", help="显示模型思考过程")
    args = parser.parse_args()

    # 延迟导入:避免未装 [rag] 依赖时 import 就炸
    from blog_rag.rag_chain import answer

    query = " ".join(args.query)
    answer(query, show_reasoning=args.reasoning)


if __name__ == "__main__":
    main()
