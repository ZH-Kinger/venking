"""M5 后置 Hook 护栏:生成后的最后一道精准闸(照 Claude PostToolUse 熔断)。

只做**便宜且高价值**的检查,贵的(逐条 faithfulness LLM 判官)留给离线评测,
避免每次回答延迟翻倍。运行时护栏做两件事:

1. 引用结构三查(仅对 grounded 答):
   - 接地答必须至少有一个 [S#];
   - 每个 [S#] 必须真实存在于来源列表(防悬空/假引用)。
2. 弃答归一:grounded 路径若模型自己说"无法回答/未提及",把 mode 翻正成 refuse
   —— 这是补评测「手册作者」缺口的关键:哪怕检索到了手册内容、但答不出作者/年份,
   也诚实标弃答,而不是假装接地。
"""
from __future__ import annotations

import re

# 模型"自我弃答"的开头短语。**只看答案开头**、不做全文 substring——
# 因为 _SYS/_WEB_SYS 指示模型弃答时以固定短语**开头**;而正文里出现"没有明确/未提及"
# 这类否定词是正常表述(如"传统 RAG 没有明确的自主决策"),全文 substring 会把好好的接地答误翻成 refuse
# (2026-07-14 实测:agentic-rag rerank 满分却被护栏误弃答的真凶)。
_REFUSAL_OPENERS = (
    "无法回答", "根据现有资料无法", "根据资料无法", "抱歉", "无法根据",
    "没有找到相关", "未找到相关", "查不到", "暂时无法回答", "没有相关信息",
)


def _looks_like_refusal(text: str) -> bool:
    head = text.strip()[:40]                      # 只看开头 40 字:弃答以固定短语开头,不误伤正文否定词
    return any(m in head for m in _REFUSAL_OPENERS)


def guardrails(state: dict) -> dict:
    """后置护栏节点。返回对黑板的修正(可能改 mode、加告警);不重写答案(留后续)。"""
    mode = state.get("mode")
    ans = state.get("generation", "") or ""
    stream = state.get("stream", True)

    # 弃答归一(对 grounded 和 web 都做):模型自己说"无据/无法回答"→ 翻正成 refuse。
    # 这补了「手册作者」这类题:检索/联网都够不着权威出处时,联网限流拿到垃圾结果、
    # 模型如实说"没有相关信息",不能记成 web,要记成诚实弃答。
    if mode in ("grounded", "web") and _looks_like_refusal(ans):
        if stream:
            print(f"\n[护栏] 模型在 {mode} 路径上自述无据 → 归一为『弃答(refuse)』。")
        return {"mode": "refuse", "sources": []}

    # 引用结构三查只对接地答;web 走自己的 [W#]、general/refuse 无引用契约。
    if mode != "grounded":
        return {}

    # 引用结构三查
    valid = {s.get("sid") for s in state.get("sources", [])}
    cited = set(re.findall(r"\[(S\d+)\]", ans))
    problems = []
    if not cited:
        problems.append("接地回答未标注任何 [S#] 引用")
    dangling = cited - valid
    if dangling:
        problems.append(f"引用了不存在的来源 {sorted(dangling)}")

    if problems and stream:
        for p in problems:
            print(f"\n[护栏告警] {p}")
    return {"guardrail_problems": problems} if problems else {}
