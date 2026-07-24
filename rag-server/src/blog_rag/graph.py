"""M5 Agentic 核心:把 M2 单跳链翻译成 LangGraph 图(混合式 Adaptive-RAG)。

ReAct 四要素落地:
  节点(Action)= 干活(检索/联网/生成)—— 全是薄封装,复用 M2 已验证的算子;
  条件边(Thought)= 决定分叉 —— 在 graders.py;
  State(Observation)= 黑板账本 —— state.py;
  loop_step vs max_retries + 图 recursion_limit = 收敛熔断(两层防死循环)。

图形(见 plan「M5 图骨架」):
  START → route_question ─general→ general_generate → record_turn → END
                         └─rag→ contextualize → retrieve ─grounded→ grounded_generate → guardrails
                                          ├─rewrite→ transform_query → retrieve(回环)
                                          ├─web→ web_search ─有→ web_generate → guardrails
                                          │                  └─无→ refuse
                                          └─refuse→ refuse
  grounded/web/general/refuse 最终统一汇入 record_turn → END

设计取舍:
- 节点薄封装、逻辑复用:不重写已验证的检索/生成,只接线。
- refuse 是**纯确定性节点**(不调 LLM):诚实弃答不需要"生成",省一次调用也更可控。
- checkpointer=SqliteSaver:按 thread_id 持久多轮状态;依赖不可用时降级 InMemorySaver。
- instrumentation 在装配层横切注入:节点只做业务,进度/耗时不写入 checkpoint。
- answer_graph 返回与 rag_chain.answer **同契约**(mode/retrieved_doc_ids/contexts/answer),
  run_eval 零改动即可跑 M5 vs M2。
"""
from __future__ import annotations

from time import perf_counter
from uuid import uuid4

from langgraph.graph import END, START, StateGraph

from blog_rag.config import settings
from blog_rag.general import general_generate
from blog_rag.graders import (
    after_web,
    grade_documents,
    grade_web,
    grounding_gate,
    pick_route,
    route_question,
)
from blog_rag.guardrails import guardrails
from blog_rag.llm import run_chat
from blog_rag.memory import (
    contextualize_question,
    make_checkpointer,
    recent_history,
    turn_messages,
)
from blog_rag.observability import instrument_node
from blog_rag.rag_chain import _SYS, _WEB_SYS, _build_context, _dedupe_by_doc
from blog_rag.retriever import generate_query_variants, retrieve
from blog_rag.state import AgentState
from blog_rag.web import build_web_context, web_search

# M5 web 提示:在 M2 _WEB_SYS 基础上加"答不出用固定开头",让后置护栏能可靠识别弃答
# (联网限流常返回无关首页,模型会说无相关信息——须归一为诚实 refuse,不能记成 web)。
_WEB_SYS_M5 = _WEB_SYS + "\n**若【联网资料】与问题无关或不足以回答,必须直接以「无法回答」开头**,说明缺什么,绝不编造。"


# ---------- 节点(Action):薄封装,复用 M2 算子 ----------
def contextualize_query_node(state: dict) -> dict:
    """M8.2:结合最近对话把追问补成独立检索查询;首轮无历史时零 LLM 调用。"""
    question = state["question"]
    rewritten = contextualize_question(question, recent_history(state))
    if state.get("stream", True) and rewritten != question:
        print(f"\n[结合历史检索] {rewritten}")
    return {"search_query": rewritten}


def retrieve_node(state: dict) -> dict:
    """混合检索(可选 RAG-Fusion)+ 按 doc 去重;写文档/最佳分/评测契约字段/suggestions。"""
    q = state.get("search_query") or state["question"]
    docs = _dedupe_by_doc(retrieve(q, fusion=state.get("deep_thinking")))
    best = max((d.metadata.get("rerank_score", 0) for d in docs), default=0)
    ids = [d.metadata.get("doc_id", d.metadata.get("source", "")) for d in docs]
    return {
        "documents": docs,                 # 覆盖=替换不追加(回环时旧文档被换掉)
        "best_score": best,
        "retrieved_doc_ids": ids,
        "contexts": [d.page_content for d in docs],
        "suggestions": ids[:3],            # 阶梯降级到 general 时可推荐;前置直达 general 无此字段
    }


def transform_query_node(state: dict) -> dict:
    """Reflexion 回环:改写查询再检索一次(loop_step 累加,配合 max_retries 熔断)。"""
    base_query = state.get("search_query") or state["question"]
    variants = generate_query_variants(base_query, n=2)   # [原问题, 变体...]
    rewritten = variants[1] if len(variants) > 1 else base_query
    if state.get("stream", True):
        print(f"\n[改写检索] {rewritten}")
    return {"search_query": rewritten, "loop_step": 1}


def web_search_node(state: dict) -> dict:
    """CRAG 兜底:本地不接地 → 联网(web.web_search 自带降级返 [])。"""
    if state.get("stream", True):
        print(f"\n🌐 本地不接地(最佳 {state.get('best_score', 0)}/10),联网检索…")
    return {"web_results": web_search(state.get("search_query") or state["question"])}


def grounded_generate_node(state: dict) -> dict:
    """接地生成:预算内拼上下文 → _SYS 带 [S#] 作答。

    **喂全量 documents**(非细筛后的 graded_documents):grade_documents 只当"有没有相关证据"
    的接地闸门信号,不拿 rerank 阈值去砍生成上下文——否则答案要点若落在 rerank 1–4 分的块上会被丢,
    导致模型"看不到→自述未提及→护栏归一成 refuse"的假弃答(auditor 2026-07-14 抓到的 recall 回归)。
    """
    context, sources = _build_context(state["documents"])
    hist = recent_history(state)                       # M8:仅含此前轮次(当前轮末尾才记录)
    user = (f"【最近对话】\n{hist}\n\n" if hist else "") + f"【资料】\n{context}\n\n【问题】{state['question']}"
    ans = run_chat(_SYS, user, stream=state.get("stream", True),
                   show_reasoning=state.get("show_reasoning", False), length=state.get("length"))
    if state.get("stream", True):
        print("\n— 来源 —")
        for s in sources:
            print(f"  [{s['sid']}] {s['doc_id']}" + (f" · {s['section']}" if s["section"] else ""))
    return {"generation": ans, "sources": sources, "mode": "grounded"}


def web_generate_node(state: dict) -> dict:
    """联网生成:_WEB_SYS 带 [W#]+URL;contexts 换成 web snippet(评测契约)。"""
    items = state["web_results"]
    wctx, wsources = build_web_context(items)
    hist = recent_history(state)                       # M8:多轮上下文
    user = (f"【最近对话】\n{hist}\n\n" if hist else "") + f"【联网资料】\n{wctx}\n\n【问题】{state['question']}"
    ans = run_chat(_WEB_SYS_M5, user, stream=state.get("stream", True),
                   show_reasoning=state.get("show_reasoning", False), length=state.get("length"))
    if state.get("stream", True):
        print("\n— 联网来源 —")
        for s in wsources:
            print(f"  [{s['wid']}] {s['title']} - {s['url']}")
    return {"generation": ans, "sources": wsources, "mode": "web",
            "contexts": [it["snippet"] for it in items]}


def refuse_node(state: dict) -> dict:
    """纯确定性弃答:本地+联网都无据 → 诚实说不知道(不调 LLM,绝不臆造)。"""
    q = state["question"]
    msg = (f"根据本地知识库检索与联网搜索,均未找到关于「{q}」的权威依据,无法给出可靠答案。"
           "若这是知识库应覆盖的主题,可能是入库缺失或表述差异,建议换个说法再问。")
    if state.get("stream", True):
        print(msg)
    return {"generation": msg, "mode": "refuse", "sources": []}


def record_turn_node(state: dict) -> dict:
    """M8:把本轮 (问, 答) 追加进 messages(add_messages 累加)→ 下轮当历史。
    单点记录:四条生成路径(grounded/web/general/refuse)都汇到这里,不重复。"""
    return {"messages": turn_messages(state, state.get("generation", ""))}


# ---------- 组装图(接线)----------
def build_graph():
    g = StateGraph(AgentState)
    # 横切 instrumentation 统一在装配层注入:业务节点不感知日志/SSE,也不把 trace 写进 checkpoint。
    nodes = {
        "route_question": route_question,
        "contextualize_query": contextualize_query_node,
        "retrieve": retrieve_node,
        "grade_documents": grade_documents,
        "transform_query": transform_query_node,
        "web_search": web_search_node,
        "grade_web": grade_web,
        "grounded_generate": grounded_generate_node,
        "web_generate": web_generate_node,
        "general_generate": general_generate,
        "refuse": refuse_node,
        "guardrails": guardrails,
        "record_turn": record_turn_node,
    }
    for name, node in nodes.items():
        g.add_node(name, instrument_node(name, node))

    g.add_edge(START, "route_question")
    g.add_conditional_edges("route_question", pick_route,
                            {"general": "general_generate", "rag": "contextualize_query"})
    g.add_edge("contextualize_query", "retrieve")
    g.add_edge("retrieve", "grade_documents")          # 检索后先细筛,再判接地
    g.add_conditional_edges("grade_documents", grounding_gate,
                            {"grounded": "grounded_generate", "rewrite": "transform_query",
                             "web": "web_search", "refuse": "refuse"})
    g.add_edge("transform_query", "retrieve")
    g.add_edge("web_search", "grade_web")              # 联网后先打分,不相关直接弃答
    g.add_conditional_edges("grade_web", after_web,
                            {"web_generate": "web_generate", "refuse": "refuse"})
    g.add_edge("grounded_generate", "guardrails")
    g.add_edge("web_generate", "guardrails")     # web 也过护栏:联网若答非所问/弃答→归一 refuse
    g.add_edge("guardrails", "record_turn")            # 三条终端路径都先记录本轮再结束
    g.add_edge("general_generate", "record_turn")
    g.add_edge("refuse", "record_turn")
    g.add_edge("record_turn", END)
    return g.compile(checkpointer=make_checkpointer())  # M8:持久 SqliteSaver(重启不丢)


# 单例:编译一次,复用(BM25/图结构建一次)
_COMPILED = None


def get_graph():
    global _COMPILED
    if _COMPILED is None:
        _COMPILED = build_graph()
    return _COMPILED


# ---------- 对外入口:契约同 rag_chain.answer ----------
def answer_graph(query: str, *, stream: bool = True, show_reasoning: bool = False,
                 fusion: bool | None = None, web_mode: bool = False,
                 thread_id: str | None = None) -> dict:
    """跑图,返回与 answer() 同结构的 dict(run_eval/cli 零改动)。

    fusion → 映射为用户 flag deep_thinking(None=回落 config)。web_mode=强制联网。
    """
    init = {
        "question": query, "request_id": uuid4().hex, "stream": stream,
        "show_reasoning": show_reasoning,
        "deep_thinking": fusion, "web_mode": bool(web_mode),
        "loop_step": 0, "max_retries": settings.max_retries,
    }
    cfg = {"configurable": {"thread_id": thread_id or uuid4().hex},
           "recursion_limit": settings.recursion_limit}
    final = get_graph().invoke(init, cfg)
    return {
        "answer": final.get("generation", ""),
        "sources": final.get("sources", []),
        "mode": final.get("mode", "general"),
        "retrieved_doc_ids": final.get("retrieved_doc_ids", []),
        "contexts": final.get("contexts", []),
        "suggestions": final.get("suggestions", []),
    }


def stream_answer(query: str, *, deep_thinking: bool | None = None, web_mode: bool = False,
                  length: str = "", thread_id: str | None = None, show_reasoning: bool = False,
                  request_id: str | None = None):
    """流式入口(UI 用):逐 token yield `{"type":"token","text":..}`,末尾 yield 一个
    `{"type":"done", ...}` 汇总(契约同 answer_graph:answer/mode/sources/retrieved_doc_ids/
    contexts/suggestions)。

    机制:`get_graph().stream(stream_mode=["custom","values"])` —— custom 收 `_emit_token`
    发的增量、values 收每步全量 state(留最后一份取 mode/sources)。UI 累积 token 显示、
    收到 done 再渲染来源。
    """
    request_id = request_id or uuid4().hex
    thread_id = thread_id or uuid4().hex
    started = perf_counter()
    init = {
        "question": query, "request_id": request_id, "stream": True,
        "show_reasoning": show_reasoning,
        "deep_thinking": deep_thinking, "web_mode": bool(web_mode), "length": length or "",
        "loop_step": 0, "max_retries": settings.max_retries,
    }
    cfg = {"configurable": {"thread_id": thread_id},
           "recursion_limit": settings.recursion_limit}
    final: dict = {}
    trace: list[dict] = []
    for mode, chunk in get_graph().stream(init, cfg, stream_mode=["custom", "values"]):
        if mode == "custom":
            if isinstance(chunk, dict) and chunk.get("type") == "token":
                yield {"type": "token", "text": chunk.get("text", ""),
                       "request_id": request_id}
            elif isinstance(chunk, dict) and chunk.get("type") == "progress":
                event = {**chunk, "request_id": request_id}
                if event.get("status") in {"done", "error"}:
                    trace.append({
                        "stage": event.get("stage", ""),
                        "status": event.get("status", ""),
                        "duration_ms": event.get("duration_ms", 0),
                    })
                yield event
        elif mode == "values":
            final = chunk                       # 每步全量 state,保留最后一份
    yield {
        "type": "done",
        "answer": final.get("generation", ""),
        "mode": final.get("mode", "general"),
        "sources": final.get("sources", []),
        "retrieved_doc_ids": final.get("retrieved_doc_ids", []),
        "contexts": final.get("contexts", []),
        "suggestions": final.get("suggestions", []),
        "request_id": request_id,
        "thread_id": thread_id,
        "trace": trace,
        "latency_ms": round((perf_counter() - started) * 1000, 1),
    }


if __name__ == "__main__":
    import sys
    q = sys.argv[1] if len(sys.argv) > 1 else "NCCL 是什么?它解决什么问题?"
    print(f"\n{'='*60}\n[graph stream] {q}\n{'='*60}")
    ntok, done = 0, None
    for ev in stream_answer(q):
        if ev["type"] == "token":
            ntok += 1
        else:
            done = ev
    print(f"\n[流式 token 数={ntok}] mode={done['mode']} sources={len(done['sources'])}")
