"""M8 记忆:短时 checkpointer(持久化)+ 多轮历史与追问改写。

三层记忆里的"短时"层落地(照 Claude 记忆做法):
- **持久 checkpointer**:`SqliteSaver` 落 `data/checkpoints.sqlite`(挂载卷)→ 容器重建/重启后,
  按 `thread_id` 续接的多轮对话**不丢**。装不了 sqlite saver 时优雅退回 `InMemorySaver`(不持久但不阻断)。
- **多轮接通**:生成节点读**最近几轮**历史拼进 prompt;末尾 `record_turn` 统一把 (问, 答) 追加进
  State 的 `messages`(add_messages 累加)。
- **M8.2 追问改写**:RAG 路径在检索前把「它呢 / 这个怎么排查」结合最近历史改成独立查询;
  无历史零调用,调用失败则保留原问题,不会因为记忆模块故障阻断问答。

为什么 record 放末尾单点:生成时 `state["messages"]` 只含**此前**轮次(当前轮尚未记录),
读历史天然不含当前问题;一处 append,四条生成路径不重复。
"""
from __future__ import annotations

import sqlite3

from langchain_core.messages import AIMessage, HumanMessage

from blog_rag.config import settings
from blog_rag.reliability import create_completion

_CONTEXTUALIZE_SYS = (
    "你是技术知识库的检索查询改写器。根据最近对话，把当前问题改写成一条脱离上下文也能理解的"
    "独立检索查询。\n"
    "- 只补全代词、省略的主题和必要限定，不回答问题，不添加对话中没有的信息。\n"
    "- 当前问题已经独立时原样返回。\n"
    "- 只输出改写后的查询，不要解释、引号、前缀或 Markdown。"
)


def make_checkpointer():
    """持久 SqliteSaver(重启不丢);不可用则退回 InMemorySaver。"""
    try:
        from langgraph.checkpoint.sqlite import SqliteSaver
        settings.data_dir.mkdir(parents=True, exist_ok=True)
        conn = sqlite3.connect(str(settings.checkpoint_db), check_same_thread=False)
        saver = SqliteSaver(conn)
        saver.setup()                     # 建表(幂等)
        return saver
    except Exception:  # noqa: BLE001 - 记忆降级不能阻断整个 Agent
        from langgraph.checkpoint.memory import InMemorySaver
        return InMemorySaver()


def recent_history(state: dict, k: int = 6) -> str:
    """把最近 k 条消息渲染成「用户:… / 助手:…」文本;无历史→空串(生成 prompt 不加历史段)。"""
    msgs = state.get("messages") or []
    if not msgs:
        return ""
    lines = []
    for m in msgs[-k:]:
        role = "用户" if getattr(m, "type", "") == "human" else "助手"
        lines.append(f"{role}: {getattr(m, 'content', '')}")
    return "\n".join(lines)


def contextualize_question(question: str, history: str) -> str:
    """结合历史把追问改成独立检索查询;无历史零调用,任何异常回退原问题。"""
    question = (question or "").strip()
    history = (history or "").strip()
    if not question or not history:
        return question
    try:
        completion = create_completion(
            model=settings.llm_model,
            temperature=0.0,
            stream=False,
            extra_body={"enable_thinking": False},
            messages=[
                {"role": "system", "content": _CONTEXTUALIZE_SYS},
                {"role": "user", "content": f"【最近对话】\n{history}\n\n【当前问题】\n{question}"},
            ],
        )
        rewritten = (completion.choices[0].message.content or "").strip()
        # 防模型偶发套 Markdown 围栏/引号;查询过长通常意味着它开始回答了,安全回退原问题。
        rewritten = rewritten.removeprefix("```").removesuffix("```").strip().strip("`\"'“”")
        return rewritten if 0 < len(rewritten) <= 500 else question
    except Exception:  # noqa: BLE001 - 追问改写失败必须退回原问题
        return question


def turn_messages(state: dict, answer: str) -> list:
    """本轮 (问, 答) → 追加进 messages(add_messages 累加,供下轮当历史)。"""
    return [HumanMessage(content=state.get("question", "")), AIMessage(content=answer or "")]
