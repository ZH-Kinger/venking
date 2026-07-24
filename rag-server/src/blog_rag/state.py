"""M5 图状态:LangGraph 的"黑板总线"(State = Observation 账本)。

为什么这样设计:
- LangGraph 节点之间**不传参**,而是读写同一个 State(TypedDict)。一个节点返回
  partial dict,LangGraph 按字段的 **reducer** 合并回黑板。
- reducer 决定字段是"覆盖"还是"累加",这是本文件唯一的核心决策:
  * `documents` **不加 reducer = 默认覆盖**:Reflexion 回环重检索时,新文档
    **替换**旧的(照 Claude 上下文压缩:文档替换不追加,防跨轮膨胀 + lost-in-middle)。
  * `loop_step` 用 `Annotated[int, operator.add]` = **累加**:每次回环 +1,配合
    `max_retries` 做有界熔断(两层防死循环之一,另一层是 graph 的 recursion_limit)。
- `messages` 用 `add_messages` 累加,给 M8 多轮追问预留(本轮 M5 不驱动,占位)。
- 用户 flag(deep_thinking/web_mode)进 State:优先级 **用户 flag > 自动 router > config**。
"""
from __future__ import annotations

import operator
from typing import Annotated, TypedDict

from langchain_core.documents import Document
from langgraph.graph.message import add_messages


class AgentState(TypedDict, total=False):
    """图黑板。total=False:节点只需返回它写的字段,不必填全。"""

    # ---- 输入 ----
    question: str
    request_id: str               # 单次请求追踪 ID(不进入 messages,只供日志/进度事件关联)
    stream: bool                 # 是否流式打印(CLI/UI 用;eval 传 False)
    show_reasoning: bool         # 是否打印 GLM 思考流
    # 用户模式 flag(优先级最高;None/未设 → 回落 router/config)
    deep_thinking: bool          # 开 RAG-Fusion 多查询检索
    web_mode: bool               # 强制联网(跳过本地接地闸门)
    length: str                  # 生成长度:"short"/"detailed"/""(标准);只在 generate 层生效,不污染检索

    # ---- 路由(route_question 写)----
    route: str                   # "general" | "rag"
    search_query: str            # 独立检索查询(M8 历史补全/回环改写写;原始 question 不被污染)

    # ---- 检索产物(retrieve 写;覆盖=替换不追加)----
    documents: list[Document]
    best_score: float            # 最佳 rerank 分,接地闸门读它
    graded_documents: list[Document]  # grade_documents 细筛后(rerank 达标)的证据,喂生成用;documents 保留全量供评测
    web_results: list[dict]      # [{title,url,snippet}],web_search 写
    web_relevant: bool           # grade_web 判定:联网结果是否真能回答问题(否→refuse,不进生成)

    # ---- 生成产物(generate/refuse 写)----
    mode: str                    # "grounded" | "web" | "general" | "refuse"(评测契约)
    generation: str              # 最终答案文本
    sources: list[dict]          # schema 随 mode 变:grounded={sid,doc_id,section}/web={wid,title,url}/其余=[]
    suggestions: list[str]       # general 时推荐的 KB 相关 doc_id
    guardrail_problems: list[str]  # 后置护栏发现的引用问题(空=通过)

    # ---- 评测复用契约(与 rag_chain.answer 对齐,run_eval 零改动)----
    retrieved_doc_ids: list[str]
    contexts: list[str]

    # ---- 循环熔断 ----
    loop_step: Annotated[int, operator.add]   # 累加:每次回环 +1
    max_retries: int                          # 上限(默认取 settings.max_retries)

    # ---- 多轮记忆(M8:checkpointer 持久化,生成与检索查询改写均读取)----
    messages: Annotated[list, add_messages]
