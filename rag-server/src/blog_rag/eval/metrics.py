"""M3 评测指标(自实现,GLM-5.2 当判官;不依赖 RAGAS——它与本栈 langchain 1.x 不兼容)。

两类,对应"检索失败 vs 生成失败"的分离:
  检索(纯计算,无 LLM):hit_at_k / mrr —— 该命中的 doc_id 在 top-k 吗、排第几。
  生成(GLM 判官,temp=0 关思考):
    faithfulness   忠实度  = 答案里"有上下文支撑的断言" / "总断言"  → 反幻觉核心
    answer_relevancy 答案相关性 = 答案是否切题(0~1)
    context_recall  上下文召回 = 标准答案的要点里,被检索上下文覆盖的比例(需 reference)
每个指标都是"一个聚焦的判官 prompt",透明可查、可单独调。
"""
from __future__ import annotations

import re

from blog_rag.config import settings
from blog_rag.llm import get_client


# ---------- 检索指标(纯计算)----------
def hit_at_k(retrieved: list[str], relevant: list[str], k: int) -> float:
    """top-k 里是否命中任一 relevant doc → 1.0/0.0。relevant 为空则不适用返回 None 由上层过滤。"""
    if not relevant:
        return float("nan")
    return 1.0 if set(retrieved[:k]) & set(relevant) else 0.0


def mrr(retrieved: list[str], relevant: list[str]) -> float:
    """第一个命中的 relevant doc 的排名倒数(1/rank);没命中=0。衡量"排得多靠前"。"""
    if not relevant:
        return float("nan")
    rel = set(relevant)
    for i, d in enumerate(retrieved, 1):
        if d in rel:
            return 1.0 / i
    return 0.0


# ---------- 生成指标(GLM 判官)----------
def _judge(system: str, user: str) -> str:
    resp = get_client().chat.completions.create(
        model=settings.llm_model,
        temperature=0.0,
        stream=False,
        extra_body={"enable_thinking": False},   # 判断题关思考:快且确定
        messages=[{"role": "system", "content": system}, {"role": "user", "content": user}],
    )
    return (resp.choices[0].message.content or "").strip()


def _ratio_from(text: str) -> float:
    """从 '有据: M / 总: N' 这类回复里抽两个整数算比例;抽不到→0。"""
    nums = [int(x) for x in re.findall(r"\d+", text)]
    if len(nums) >= 2 and nums[1] > 0:
        return round(min(nums[0], nums[1]) / nums[1], 3)
    return 0.0


_FAITH_SYS = (
    "你是严格的忠实度评审。判断【答案】中的每个事实性断言是否**能被【上下文】支撑**"
    "(只看上下文,不用你自己的知识)。先在心里拆分断言,然后只输出两个整数,格式严格为:"
    "`总断言数=N 有据断言数=M`(M≤N)。不要任何解释。若答案是'无法回答'类弃答,输出 `总断言数=0 有据断言数=0`。"
)


def faithfulness(answer: str, contexts: list[str]) -> float:
    """忠实度 = 有上下文支撑的断言 / 总断言。反幻觉核心:高=答案没编。弃答(N=0)记 1.0(未臆造)。"""
    ctx = "\n\n".join(contexts)[: settings.max_context_tokens * 2]
    text = _judge(_FAITH_SYS, f"【上下文】\n{ctx}\n\n【答案】\n{answer}")
    nums = [int(x) for x in re.findall(r"\d+", text)]
    if len(nums) >= 2:
        n, m = nums[0], nums[1]
        if n == 0:                    # 弃答/无断言:视为未臆造
            return 1.0
        return round(min(m, n) / n, 3)
    return 0.0


_RELEVANCY_SYS = (
    "你评估【答案】对【问题】的相关性/切题程度。只输出一个 0-10 的整数(10=完全切题回答了问题,"
    "0=答非所问)。不要解释。"
)


def answer_relevancy(question: str, answer: str) -> float:
    text = _judge(_RELEVANCY_SYS, f"【问题】{question}\n\n【答案】\n{answer}")
    m = re.search(r"\d+", text)
    return round(min(int(m.group()), 10) / 10, 3) if m else 0.0


_RECALL_SYS = (
    "你评估检索到的【上下文】是否覆盖了【标准答案】中的关键要点。先数标准答案有几个关键要点(N),"
    "再数其中被上下文覆盖的有几个(M)。只输出:`要点数=N 覆盖数=M`(M≤N),不要解释。"
)


def context_recall(reference: str, contexts: list[str]) -> float:
    """上下文召回 = 标准答案要点被检索上下文覆盖的比例。低=检索没捞全(检索问题,非生成)。"""
    if not reference.strip():
        return float("nan")          # 无标准答案(通用/弃答题)不适用
    ctx = "\n\n".join(contexts)[: settings.max_context_tokens * 2]
    return _ratio_from(_judge(_RECALL_SYS, f"【标准答案】\n{reference}\n\n【上下文】\n{ctx}"))
