# ADR-0005: 混合检索 + RRF 融合 —— 自实现纯函数
- 状态: 已采纳
- 日期: 2026-07-13
- 相关模块: M2

## 背景(为什么要做这个决策)
稠密向量对 `BF16`/`NCCL` 这类专有术语会静默失灵(专有 token 稀疏),须 BM25 兜底。要把 dense + BM25 两路结果融合(RRF),且同一 RRF 算子还要给 RAG-Fusion(多查询融合)复用。LangChain 有现成 `EnsembleRetriever`。

## 选项(≥2,每个一句话)
- **A 用 LangChain `EnsembleRetriever`**:内置 RRF,少写代码。
- **B 自实现 `rrf_fuse()` 纯函数**:混合检索与 RAG-Fusion 共用一个算子。

## 优劣对比
| 方案 | 优 | 劣 |
|---|---|---|
| A EnsembleRetriever | 开箱、少代码 | 形状是"N retriever × 1 query",**RAG-Fusion(1 retriever × N query)复用不了**;**丢弃 RRF 分数**(重排/弃答/可观测拿不到);在易漂移的 `langchain_classic` |
| **B 自实现 rrf_fuse** | 混检 + Fusion 共用同一算子、分数写回 `doc.metadata`、按 chunk_id 去重语义明确、不吃 classic 依赖 | 自己写 ~10 行 + 测试 |

## 结论(选了哪个)
选 **B:自实现 `rrf_fuse(doc_lists, weights, c, id_key)` 纯函数**作为唯一 RRF 算子,混合检索与 RAG-Fusion 共用;分数写回 `rrf_score`。EnsembleRetriever 留作对照基线。RRF 平滑常量 `rrf_k=60`。默认路径 = hybrid(BM25 是兜底保证,不能只用稠密向量)。

## 为什么不选替代
- **不选 EnsembleRetriever**:三点硬伤——①RAG-Fusion 的"1 retriever × N query 变体"形状与它不兼容,无法复用同一路径,而 notes 早定"复用同一 RRF 算子";②它用完即弃 RRF 分数,而后续 LLM 重排、弃答阈值、可观测都要看融合分;③它在 `langchain_classic`(1.x 遗留兼容包,易漂移)。RRF 本体仅 ~10 行,自实现收敛依赖 + 全可控可测。

## 回溯条件(什么情况下该重估)
需要 EnsembleRetriever 独有能力;或 LangChain 提供了保留分数 + 支持多查询形状的官方算子。

## 证据链接
- `docs/collab/research/R5-检索API.md` §2(EnsembleRetriever 源码实测 + 自实现判断)
- notes 2026-07-13(retriever 落地、hybrid 为默认、不能只用稠密向量)
</content>
