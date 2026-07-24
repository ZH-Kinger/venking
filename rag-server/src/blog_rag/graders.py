"""M5 图的"思考(Thought)"层:路由 + 接地判定 —— 全部条件边决策函数。

为什么单独成文件:
- ReAct 循环里 **节点(Action)= 干活**,**条件边(Thought)= 决定下一步干啥**。
  本文件是所有 Thought 决策,和干活的节点(graph.py)分开,读图时一眼看清"分叉在哪"。
- 决策全 **temp=0 + 关思考**:判断题要的是**确定、快**(同一问题每次同样分流),
  不因模型"想太多"漂移(见 notes 2026-07-13:关思考 5.5s→1s、结果不变)。

两个决策:
1. route_question —— 前置认知路由:general(快路径,跳检索)/ rag(走检索阶梯)。
   **偏向 rag**:拿不准就检索(精准第一,宁可多花检索时间也别把 KB 问题误判成通用而丢引用)。
2. grounding_gate —— 接地闸门:接地 / 回环改写 / 联网 / 弃答。
   web/refuse 不由路由预测,而是这里按**运行时结果**涌现(更稳)。
"""
from __future__ import annotations

from blog_rag.config import settings
from blog_rag.llm import get_client

# ---------- 1. 认知路由:general vs rag ----------
_ROUTE_SYS = (
    "你是问题分流器,服务于一个**技术知识库问答系统**。知识库主题覆盖:AI 基础设施与 SRE、"
    "大模型训练与推理、深度学习、计算机网络、Agentic/RAG 等技术工程内容。\n"
    "判断用户问题该走哪条路,只回一个词:\n"
    "- rag:向**知识库要事实/解释**的问题(概念、原理、排障、对比、名词解释,或\"博客里讲的 X 是什么\")。\n"
    "- general:①明显与知识库无关的闲聊/常识/做菜/写作;②**要你动手产出的生成任务**——"
    "写代码/实现算法/生成脚本/改代码/写正则/写 SQL/画 Mermaid 图(用你自身能力做,不查库)。\n"
    "**关键区分**:\"帮我写/实现一段代码\"=general(生成);\"博客里那段代码/这个概念讲了什么\"=rag(要事实)。\n"
    "**其余拿不准一律选 rag**(宁可多检索,不把要事实的技术问题误判为通用)。\n"
    "示例:\n"
    "红烧肉怎么做 → general\n"
    "帮我写一首关于春天的诗 → general\n"
    "用 Python 写一个快速排序函数 → general\n"
    "帮我实现一个函数计时装饰器 → general\n"
    "写个正则匹配邮箱 → general\n"
    "给我画一个登录流程的 Mermaid 图 → general\n"
    "NCCL 是什么 → rag\n"
    "CUDA out of memory 怎么排查 → rag\n"
    "TCP 如何保证可靠传输 → rag\n"
    "博客里 PagedAttention 是怎么讲的 → rag\n"
    "只输出一个词 `rag` 或 `general`。"
)


# 确定性快路径预筛(路由第一道防线,防御纵深):只拦**无歧义的非技术**问题。
# 必须高精度——绝不能把技术问题误当通用(那会丢引用)。拿不准 → 返回 None 交 LLM。
_GENERAL_PREFILTER = (
    # 寒暄/情感/闲聊
    "你好", "您好", "在吗", "在么", "谢谢", "哈喽", "早上好", "晚安", "拜拜",
    # 做菜/生活常识
    "红烧", "菜谱", "食谱", "怎么做菜", "做法大全", "减肥", "星座", "运势",
    # 写作/创作
    "写一首", "写一篇", "写个笑话", "讲个笑话", "作文", "藏头诗", "对联",
)


def _prefilter_route(question: str) -> str | None:
    """确定性预筛:命中无歧义非技术词 → general;否则 None(交 LLM 判)。"""
    q = question.lower()
    return "general" if any(p in q for p in _GENERAL_PREFILTER) else None


def classify_route(question: str) -> str:
    """LLM 分类 general/rag;失败或输出异常 → 退化为 rag(安全侧:走完整检索有接地兜底)。"""
    try:
        resp = get_client().chat.completions.create(
            model=settings.llm_model,
            temperature=0.0,
            stream=False,
            extra_body={"enable_thinking": False},   # 判断题关思考:快且确定
            messages=[
                {"role": "system", "content": _ROUTE_SYS},
                {"role": "user", "content": question},
            ],
        )
        out = (resp.choices[0].message.content or "").strip().lower()
        return "general" if "general" in out else "rag"
    except Exception:
        return "rag"                                  # 失败退化:走检索(有接地闸门兜底,不丢精准)


def route_question(state: dict) -> dict:
    """节点:决定 route 并写回黑板。三层防御纵深:
    ① 用户 flag(web_mode 强制 rag)> ② 确定性预筛(无歧义非技术→general)> ③ LLM few-shot。"""
    if state.get("web_mode"):
        return {"route": "rag"}                       # 用户点了联网:进阶梯,gate 会强制联网分支
    pre = _prefilter_route(state["question"])
    if pre:
        return {"route": pre}                         # 确定性拦下明显通用问题,省一次 LLM 且更稳
    return {"route": classify_route(state["question"])}


def pick_route(state: dict) -> str:
    """条件边选择器:读黑板上的 route(纯函数,不再调用 LLM)。"""
    return state.get("route", "rag")


# ---------- 2. 检索证据细筛(CRAG:rerank 粗筛后再按阈值留相关证据)----------
def grade_documents(state: dict) -> dict:
    """CRAG 细筛节点(不额外调 LLM,复用已有 rerank_score):

    保留 rerank 达标(≥grounding_min_rerank)的证据 → graded_documents,喂生成的上下文更干净
    (少喂无关块 = 防 lost-in-middle、提精准)。documents/retrieved_doc_ids/contexts 保留全量供评测。
    """
    thr = settings.grounding_min_rerank
    relevant = [d for d in (state.get("documents") or [])
                if d.metadata.get("rerank_score", 0) >= thr]
    return {"graded_documents": relevant}


# ---------- 3. 接地闸门:grounded / rewrite / web / refuse ----------
def grounding_gate(state: dict) -> str:
    """rag 阶梯的核心分叉(按运行时结果决定,不靠路由预判):

    - web_mode(用户强制联网)          → web
    - 有细筛达标证据                    → grounded(带 [S#] 引用作答)
    - 无 且 还有重试额度               → rewrite(改写查询回环重检索,Reflexion)
    - 无 且 重试用尽 且 允许联网        → web(CRAG 兜底,带 [W#]+URL)
    - 无 且 无路可走(联网关)          → refuse(本该有据却查不到 → 诚实弃答)
    """
    if state.get("web_mode"):
        return "web"
    if state.get("graded_documents"):                 # 细筛后仍有相关证据 = 可接地
        return "grounded"
    if state.get("loop_step", 0) < state.get("max_retries", settings.max_retries):
        return "rewrite"
    if settings.web_search_enabled:
        return "web"
    return "refuse"


# ---------- 4. 联网证据打分(CRAG:生成前判联网结果能不能答,不相关直接弃答)----------
_WEB_GRADE_SYS = (
    "你是联网结果相关性判官。判断下面的搜索结果是否**包含足以回答用户问题的相关信息**。\n"
    "- 若结果直接相关、含可用于回答的具体信息 → 回 yes;\n"
    "- 若结果与问题无关、只是无关首页/广告、或只泛泛提到主题但不含具体答案 → 回 no。\n"
    "只输出 yes 或 no。"
)


def grade_web(state: dict) -> dict:
    """联网结果证据打分(生成前把关):不相关 → web_relevant=False → 上层走 refuse,绝不半答臆造。

    这是修「联网限流返垃圾→模型半答」的**主力**(把关口从输出后提到生成前);
    护栏的关键词弃答归一降级为最后兜底。打分失败 → 保守放行(交护栏兜底)。
    """
    items = state.get("web_results") or []
    if not items:
        return {"web_relevant": False}
    joined = "\n".join(f"- {it.get('title', '')}: {(it.get('snippet') or '')[:200]}" for it in items)
    try:
        resp = get_client().chat.completions.create(
            model=settings.llm_model,
            temperature=0.0,
            stream=False,
            extra_body={"enable_thinking": False},
            messages=[
                {"role": "system", "content": _WEB_GRADE_SYS},
                {"role": "user", "content": f"问题:{state['question']}\n\n搜索结果:\n{joined}"},
            ],
        )
        out = (resp.choices[0].message.content or "").strip().lower()
        # 默认放行,仅明确 no 才判不相关:假弃答(该答却弃)比假答更糟,且放行后还有护栏兜底。
        # 与异常分支(放行)语义一致,避免"中文'是'/空串→误判不相关"。
        return {"web_relevant": not out.startswith("no")}
    except Exception:
        return {"web_relevant": True}                 # 打分失败:保守放行,交护栏兜底


def after_web(state: dict) -> str:
    """联网+打分之后的分叉:有结果且相关 → web 作答;无结果或不相关 → 弃答(绝不臆造)。"""
    if not (state.get("web_results") or []):
        return "refuse"
    return "web_generate" if state.get("web_relevant", True) else "refuse"
