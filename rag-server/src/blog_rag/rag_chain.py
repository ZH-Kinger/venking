"""M2 单跳 RAG:混合检索 → 带 Source-ID 引用生成 → 无据弃答。

精准契约(生产级):
  1) 答案只能用检索到的上下文,不得用资料外知识、不得编造;
  2) 每个关键论断标 [S#] 来源;
  3) 上下文不足 → 明确弃答(说缺什么),绝不硬答;
  4) temp=0 确定性。
检索走 retriever.retrieve()(hybrid+rerank,不单用稠密)。
"""
from __future__ import annotations

from langchain_core.documents import Document

from blog_rag.config import settings
from blog_rag.llm import get_client
from blog_rag.retriever import retrieve
from blog_rag.web import build_web_context, web_search

_SYS = (
    "你是严谨的技术问答助手,服务于一个要求极致精准的知识库问答系统。必须遵守:\n"
    "1. 只依据下面【资料】回答,严禁使用资料之外的知识,严禁编造;\n"
    "2. 每个关键论断后用 [S编号] 标注来源(可多个,如 [S1][S3]);\n"
    "3. 若【资料】不足以回答,直接回答「根据现有资料无法回答」并说明还缺什么,不要硬答;\n"
    "4. 用中文,简洁、准确、有条理。"
)


def _dedupe_by_doc(docs: list[Document]) -> list[Document]:
    """同一 doc_id 只保留排名最靠前的一个 chunk(避免重复来源)。"""
    seen, out = set(), []
    for d in docs:
        key = d.metadata.get("doc_id", d.metadata.get("source"))
        if key in seen:
            continue
        seen.add(key)
        out.append(d)
    return out


def _build_context(docs: list[Document]) -> tuple[str, list[dict]]:
    budget = settings.max_context_tokens * 2   # 粗估:1 token ≈ 2 中英混合字符
    blocks, sources, used = [], [], 0
    for i, d in enumerate(docs, 1):
        if used and used + len(d.page_content) > budget:   # 超预算:砍靠后的低分块(至少留1)
            break
        sid = f"S{i}"
        doc_id = d.metadata.get("doc_id", d.metadata.get("source", "?"))
        sec = d.metadata.get("section") or d.metadata.get("title", "")
        head = f"[{sid}] 来源:{doc_id}" + (f" · {sec}" if sec else "")
        blocks.append(f"{head}\n{d.page_content}")
        sources.append({"sid": sid, "doc_id": doc_id, "section": sec})
        used += len(d.page_content)
    return "\n\n".join(blocks), sources


_GENERAL_SYS = (
    "你是通用技术助手。用你自己的知识回答用户问题,简洁准确。"
    "注意:这**不是**知识库检索结果,回答里不要编造或标注任何 [S#] 引用。"
)

_WEB_SYS = (
    "你是联网检索问答助手。**仅依据下面【联网资料】回答**,严禁编造。每个关键论断后标 [W编号] 来源;"
    "这是联网搜索结果(非本地知识库)。若资料不足以回答,直接说明缺什么。用中文,简洁准确。"
)


def _consume(completion, *, stream: bool, show_reasoning: bool) -> str:
    """兼容 stream / 非 stream 两种返回,边打印边收集正式回复。"""
    if not stream:                       # 非流式:一次性拿完整回复(修 stream=False 迭代 TypeError)
        msg = completion.choices[0].message
        if show_reasoning and getattr(msg, "reasoning_content", None):
            print(msg.reasoning_content)
        text = msg.content or ""
        print(text)
        return text
    parts, answering = [], False
    for chunk in completion:
        if not chunk.choices:
            continue
        delta = chunk.choices[0].delta
        if show_reasoning and getattr(delta, "reasoning_content", None) and not answering:
            print(delta.reasoning_content, end="", flush=True)
        if getattr(delta, "content", None):
            answering = True
            print(delta.content, end="", flush=True)
            parts.append(delta.content)
    print()
    return "".join(parts)


def answer(query: str, *, stream: bool = True, show_reasoning: bool = False, fusion: bool | None = None) -> dict:
    # A/B 开关:RAG_USE_GRAPH=1 → 走 M5 LangGraph 图(懒导入避免循环);否则走下面 M2 单跳基线。
    if settings.use_graph:
        from blog_rag.graph import answer_graph
        return answer_graph(query, stream=stream, show_reasoning=show_reasoning, fusion=fusion)

    docs = _dedupe_by_doc(retrieve(query, fusion=fusion))
    best = max((d.metadata.get("rerank_score", 0) for d in docs), default=0)
    # 供评测复用(纯追加):检索到的 doc_id 与上下文,免得评测再跑一次检索
    retrieved_ids = [d.metadata.get("doc_id", d.metadata.get("source", "")) for d in docs]
    contexts = [d.page_content for d in docs]
    client = get_client()

    # 接地闸门:最佳重排分达阈值 → 接地回答(带引用);否则 → 通用回答(明确不接地)
    if docs and best >= settings.grounding_min_rerank:
        context, sources = _build_context(docs)
        user = f"【资料】\n{context}\n\n【问题】{query}"
        completion = client.chat.completions.create(
            model=settings.llm_model,
            temperature=settings.temperature,   # 0.0 确定性
            stream=stream,
            messages=[{"role": "system", "content": _SYS}, {"role": "user", "content": user}],
        )
        ans = _consume(completion, stream=stream, show_reasoning=show_reasoning)
        print("\n— 来源 —")
        for s in sources:
            print(f"  [{s['sid']}] {s['doc_id']}" + (f" · {s['section']}" if s["section"] else ""))
        return {"answer": ans, "sources": sources, "mode": "grounded",
                "retrieved_doc_ids": retrieved_ids, "contexts": contexts}

    # 未达接地阈值 → CRAG 兜底阶梯:先联网(有出处),搜到就 web-接地作答;没搜到再退通用
    if settings.web_search_enabled:
        web_items = web_search(query)
        if web_items:
            wctx, wsources = build_web_context(web_items)
            print(f"🌐 知识库无强相关(最佳 {best}/10),联网检索作答(带 URL 出处):\n")
            completion = client.chat.completions.create(
                model=settings.llm_model,
                temperature=settings.temperature,
                stream=stream,
                messages=[{"role": "system", "content": _WEB_SYS},
                          {"role": "user", "content": f"【联网资料】\n{wctx}\n\n【问题】{query}"}],
            )
            ans = _consume(completion, stream=stream, show_reasoning=show_reasoning)
            print("\n— 联网来源 —")
            for s in wsources:
                print(f"  [{s['wid']}] {s['title']} - {s['url']}")
            return {"answer": ans, "sources": wsources, "mode": "web",
                    "retrieved_doc_ids": retrieved_ids,
                    "contexts": [it["snippet"] for it in web_items]}

    # 联网关闭或没搜到:用通用知识作答,明确标注"非知识库/无出处",并推荐 KB 相关主题
    print(f"⚠️ 知识库中未找到强相关内容(最佳相关度 {best}/10),以下为**通用知识**回答(无出处,仅供参考):\n")
    completion = client.chat.completions.create(
        model=settings.llm_model,
        temperature=settings.temperature,
        stream=stream,
        messages=[{"role": "system", "content": _GENERAL_SYS}, {"role": "user", "content": query}],
    )
    ans = _consume(completion, stream=stream, show_reasoning=show_reasoning)
    suggestions = [d.metadata.get("doc_id", d.metadata.get("source", "")) for d in docs[:3]]
    if suggestions:
        print("\n你可能想问(知识库里的相关主题):")
        for s in suggestions:
            print(f"  · {s}")
    return {"answer": ans, "sources": [], "mode": "general", "suggestions": suggestions,
            "retrieved_doc_ids": retrieved_ids, "contexts": contexts}


if __name__ == "__main__":
    import sys
    answer(sys.argv[1] if len(sys.argv) > 1 else "NCCL 是什么?它解决什么问题?")
