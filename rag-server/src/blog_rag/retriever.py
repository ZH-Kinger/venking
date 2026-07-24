"""M2 混合检索 + 重排。

目标:治"问 NCCL 却检出 Netcat"——纯稠密向量对低频专有名词/缩写会语义混淆。
方案:稠密(语义) + BM25(字面) --RRF 融合--> GLM-5.2 重排 --> top_k。

三个可独立对比/调优的接缝(参数全走 config):
  dense_search  ·  sparse_search(BM25+jieba)  ·  rrf_fuse(纯函数,RAG-Fusion 复用)  ·  llm_rerank
"""
from __future__ import annotations

import re

import jieba
from langchain_community.retrievers import BM25Retriever
from langchain_core.documents import Document

from blog_rag.config import settings
from blog_rag.ingest import collect_documents, get_vectorstore
from blog_rag.llm import get_client


# ---------- 分词:BM25 的中文命门(不分词 = 整句一个 token,BM25 失效)----------
def tokenize(text: str) -> list[str]:
    """jieba 切词,滤掉纯空白 token。专有名词/缩写(NCCL/BF16)被保留为整词。"""
    return [t for t in jieba.lcut(text) if t.strip()]


def _with_meta(d: Document, **extra) -> Document:
    """返回 d 的副本并写入额外 metadata——绝不就地改传入对象(BM25 单例共享,防污染/竞态)。"""
    nd = d.model_copy()
    nd.metadata = {**d.metadata, **extra}
    return nd


# ---------- RRF 融合(★核心纯函数,混检 + RAG-Fusion 共用一个算子)----------
def rrf_fuse(
    doc_lists: list[list[Document]],
    *,
    k: int | None = None,
    weights: list[float] | None = None,
    id_key: str = "chunk_id",
) -> list[Document]:
    """Reciprocal Rank Fusion:融合分 = Σ weight / (k + rank)。

    只用"排名"不用"原始分数"→ 规避不同检索器分数量纲不可比。
    按 id_key(默认 chunk_id)去重累加;把融合分写回 metadata["rrf_score"]。
    """
    k = settings.rrf_k if k is None else k
    weights = weights or [1.0] * len(doc_lists)
    if len(weights) != len(doc_lists):   # 防 zip 静默截断(RAG-Fusion 多查询会吞子结果)
        raise ValueError(f"weights 数({len(weights)}) 与 doc_lists 数({len(doc_lists)}) 不一致")
    scores: dict[str, float] = {}
    by_id: dict[str, Document] = {}
    for docs, w in zip(doc_lists, weights):
        for rank, d in enumerate(docs):
            did = d.metadata.get(id_key) or d.page_content[:80]
            scores[did] = scores.get(did, 0.0) + w / (k + rank + 1)  # rank 从 0 起 → +1
            by_id.setdefault(did, d)
    return [
        _with_meta(by_id[did], rrf_score=round(scores[did], 6))   # 拷贝,不改共享对象
        for did in sorted(scores, key=scores.get, reverse=True)
    ]


# ---------- 稠密检索(Chroma,带相关性分 0~1,供弃答阈值)----------
def dense_search(query: str, k: int) -> list[Document]:
    vs = get_vectorstore()
    docs = []
    for d, score in vs.similarity_search_with_relevance_scores(query, k=k):
        d.metadata["dense_score"] = round(float(score), 6)
        docs.append(d)
    return docs


# ---------- 稀疏检索(BM25 内存索引,jieba 分词;懒建一次)----------
_bm25: BM25Retriever | None = None


def _docs_from_store() -> list[Document]:
    """从 Chroma 读回已入库的 chunk 建 BM25——部署只依赖向量库(派生物),不需原始语料。

    为什么不再用 collect_documents()(读 ../src/posts 原文):部署环境只带 chroma 库、
    没有原始博客 md。chroma 存的正是切块后的 chunk(与原来 BM25 的输入等价),从它读回
    即可,检索质量不变,且部署自包含(源文档是事实源、向量库是派生物,部署带派生物即可)。
    """
    vs = get_vectorstore()
    got = vs.get(include=["documents", "metadatas"])
    docs = got.get("documents") or []
    metas = got.get("metadatas") or []
    return [Document(page_content=c, metadata=(m or {})) for c, m in zip(docs, metas)]


def get_bm25() -> BM25Retriever:
    global _bm25
    if _bm25 is None:
        _bm25 = BM25Retriever.from_documents(_docs_from_store(), preprocess_func=tokenize)
    return _bm25


def sparse_search(query: str, k: int) -> list[Document]:
    r = get_bm25()
    r.k = k
    return r.invoke(query)


# ---------- 混合:dense + BM25 → RRF ----------
def hybrid_search(query: str, k: int | None = None) -> list[Document]:
    fetch = settings.fetch_k
    fused = rrf_fuse([dense_search(query, fetch), sparse_search(query, fetch)])
    return fused[: (k or fetch)]


# ---------- LLM 重排(pointwise,GLM-5.2 关思考=快且确定)----------
_RERANK_SYS = (
    "你是检索重排器。给定用户问题和若干带编号的候选文档片段,为**每个候选**按其对回答问题的相关性"
    "打 0-10 分(10=高度相关,0=无关)。只输出每行一个 `编号=分数`(共 N 行),不要解释或多余字符。"
)


def llm_rerank(query: str, docs: list[Document], top_n: int | None = None) -> list[Document]:
    """Listwise 重排:**一次调用**给 RRF top-N 候选各打 0-10 分(比 pointwise 逐个调用快 ~20x)。

    保留每篇 rerank_score(接地闸门要用);整体失败则退化为 RRF 序 + 及格分(信任 RRF,不误判"不接地")。
    """
    top_n = top_n or settings.rerank_top_n
    cand = docs[: settings.rerank_candidates]      # 只排 RRF top-N,省一半
    if not cand:
        return []
    numbered = "\n\n".join(f"[{i}] {d.page_content[:800]}" for i, d in enumerate(cand))
    scores: dict[int, int] = {}
    try:
        resp = get_client().chat.completions.create(
            model=settings.rerank_model,
            temperature=0.0,
            stream=False,
            extra_body={"enable_thinking": False},  # 判断题关思考:快且确定
            messages=[
                {"role": "system", "content": _RERANK_SYS},
                {"role": "user", "content": f"问题:{query}\n\n候选片段:\n{numbered}\n\n为每个候选输出 `编号=分数`:"},
            ],
        )
        for m in re.finditer(r"\[?(\d+)\]?\s*[=:：]\s*(\d+)", resp.choices[0].message.content or ""):
            i, s = int(m.group(1)), int(m.group(2))
            if 0 <= i < len(cand):
                scores[i] = min(s, 10)
    except Exception:
        scores = {}
    if not scores:                                 # 重排整体失败:退化 RRF 序 + 及格分(不误判不接地)
        print("⚠ 重排失败,退化为 RRF 序", flush=True)
        return [_with_meta(d, rerank_score=settings.grounding_min_rerank) for d in cand[:top_n]]
    order = sorted(range(len(cand)), key=lambda i: scores.get(i, 0), reverse=True)
    return [_with_meta(cand[i], rerank_score=scores.get(i, 0)) for i in order][:top_n]


# ---------- 查询改写:多查询变体(RAG-Fusion 用;也是 query rewrite 的一种)----------
_VARIANT_SYS = (
    "你是检索查询改写器。把用户的问题改写成若干个语义等价、但**措辞/角度不同**的检索查询,"
    "覆盖同义词、术语全称/缩写、不同问法。每行输出一个查询,不要编号、不要解释、不要空行。"
)


def generate_query_variants(query: str, n: int | None = None) -> list[str]:
    """生成 n 个改写变体(含原问题去重后返回)。关思考、temp=0。"""
    n = n or settings.rag_fusion_n_queries
    try:
        resp = get_client().chat.completions.create(
            model=settings.llm_model,
            temperature=0.0,
            stream=False,
            extra_body={"enable_thinking": False},
            messages=[
                {"role": "system", "content": _VARIANT_SYS},
                {"role": "user", "content": f"改写成 {n} 个不同查询:\n{query}"},
            ],
        )
        lines = [ln.strip(" -·\t") for ln in (resp.choices[0].message.content or "").splitlines()]
        variants = [ln for ln in lines if ln]
    except Exception:
        variants = []                      # 改写失败 → 退化为只用原问题
    seen, out = set(), []
    for q in [query, *variants]:           # 原问题始终在内
        if q not in seen:
            seen.add(q)
            out.append(q)
    return out


# ---------- RAG-Fusion:多变体各自 hybrid → 跨查询 RRF 融合 ----------
def rag_fusion_search(query: str, k: int | None = None) -> list[Document]:
    variants = generate_query_variants(query)
    lists = [hybrid_search(v, settings.fetch_k) for v in variants]   # 每变体一路
    return rrf_fuse(lists)[: (k or settings.fetch_k)]                # 权重默认等权,长度自动匹配


# ---------- 编排:混合(或 RAG-Fusion)→ 重排 → top_k ----------
def retrieve(query: str, *, rerank: bool = True, fusion: bool | None = None) -> list[Document]:
    use_fusion = settings.rag_fusion_enabled if fusion is None else fusion  # 用户flag > config默认
    fused = rag_fusion_search(query) if use_fusion else hybrid_search(query)
    if rerank:
        return llm_rerank(query, fused[: settings.fetch_k])
    return fused[: settings.top_k]


# ---------- 验收演示:三档对比(纯稠密 / 混合 / 混合+重排)----------
def _fmt(docs: list[Document], score_key: str) -> str:
    lines = []
    for i, d in enumerate(docs[:6], 1):
        src = d.metadata.get("doc_id", d.metadata.get("source", "?"))
        sc = d.metadata.get(score_key, "")
        lines.append(f"    {i}. [{sc}] {src}")
    return "\n".join(lines)


def compare(query: str) -> None:
    print(f"\n{'='*60}\n查询:{query}\n{'='*60}")
    print("① 纯稠密向量:")
    print(_fmt(dense_search(query, settings.fetch_k), "dense_score"))
    print("② 混合(dense+BM25+RRF):")
    print(_fmt(hybrid_search(query), "rrf_score"))
    print("③ 混合 + GLM-5.2 重排:")
    print(_fmt(llm_rerank(query, hybrid_search(query)[: settings.fetch_k]), "rerank_score"))


if __name__ == "__main__":
    import sys
    compare(sys.argv[1] if len(sys.argv) > 1 else "NCCL 是什么")
