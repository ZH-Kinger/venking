# R5 — M2 混合检索 API 取证（当前已装版本实跑）

> 方法：全部用 venv `rag-server/.venv/Scripts/python.exe`（**Python 3.13.7**）实跑 import + `inspect` 反查签名/源码。
> 标注：【实测】= 本机 import/inspect 成功；【源码】= 直接读已装包源码；【推测】= 未在本语料/运行时验证。
> 取证日期：2026-07-13。

## 0. 已装版本（`importlib.metadata`）【实测】

| 包 | 版本 | 备注 |
|---|---|---|
| langchain | 1.3.13 | 1.x，import 已漂移 |
| langchain-core | 1.4.9 | |
| langchain-community | 0.4.2 | **import 即报 sunset DeprecationWarning** |
| langchain-classic | 1.0.8 | EnsembleRetriever / 压缩器 / 旧 retrievers 都搬来这里 |
| langchain-chroma | 1.1.0 | 无 `__version__` 属性（用 metadata 取版本） |
| chromadb | 1.5.9 | |
| rank-bm25 | 0.2.2 | 已装 ✅ |
| dashscope | 1.26.3 | |
| **jieba** | **未安装 ❌** | 需加进 `[rag]` 依赖 |
| **langchain-openai** | **未安装 ❌** | LLM 重排若用 LangChain 压缩器则需要它 |

---

## 1. BM25Retriever 【实测 + 源码】

**确切 import**（三条都能 import 成功，用第一条；classic 那条会打 deprecation 警告叫你换回 community）：
```python
from langchain_community.retrievers import BM25Retriever   # 推荐
```

**构建签名**（inspect 实测）：
```python
BM25Retriever.from_documents(
    documents,
    *,
    bm25_params: dict | None = None,          # 传给 rank_bm25，如 {"k1":1.5,"b":0.75}
    preprocess_func: Callable[[str], list[str]] = default_preprocessing_func,
) -> BM25Retriever
```
model 字段：`['name','tags','metadata','vectorizer','docs','k','preprocess_func']` → **`k`= 返回 top-k**（默认 4，构建后可 `retriever.k = 8`）。

**中文分词（关键）**：`preprocess_func` 类型就是 `Callable[[str], list[str]]`，**可直接传自定义分词器**。
默认实现【源码】：
```python
def default_preprocessing_func(text): return text.split()
```
实测 `default_preprocessing_func("向量检索与混合检索")` → `['向量检索与混合检索']`（整串未切）→ **中文必须换 jieba**，否则 BM25 退化成"整句精确匹配"。

用法：
```python
import jieba
bm25 = BM25Retriever.from_documents(docs, preprocess_func=jieba.lcut)  # jieba.lcut 返回 list[str]，签名天然吻合
bm25.k = 8
```
> 注意：BM25 是**内存索引**，`from_documents` 需要拿到全部 chunk 的 `Document`。它不读 Chroma，须自己持有 docs（入库时旁存一份，或从 Chroma `.get()` 拉全量重建）。这是 M2 要设计的点。

**依赖缺口**：
- `rank-bm25` 0.2.2 已装 ✅
- **`jieba` 未装 ❌ → 必须加进 `pyproject.toml` `[rag]`**（建议 `jieba>=0.42.1`）。

---

## 2. EnsembleRetriever 【实测 + 源码】

**确切 import**（`langchain.retrievers` 在 1.x **已不存在**，实测 `ModuleNotFoundError: No module named 'langchain.retrievers'`）：
```python
from langchain_classic.retrievers import EnsembleRetriever
```

**字段/默认值**（inspect 实测）：
```
retrievers = <必填>
weights    = <必填>        # 每个 retriever 一个权重
c          = 60           # ← RRF 常数，内置
id_key     = None         # None=按 page_content 去重；给 metadata 键名=按该键去重
```

**内置 RRF**（`weighted_reciprocal_rank` 源码实测）：
- 公式 `score += weight / (rank + c)`，rank 从 1 起；就是标准 RRF，`c` 可调。
- 去重：默认按 `doc.page_content`；若设 `id_key`，按 `doc.metadata[id_key]` 去重并**累加**跨检索器分数。
- **返回值 = 融合排序后的 `list[Document]`，不带分数**（RRF score 只在内部 dict，用完即弃，不写回 doc）。

用法（快速基线）：
```python
ens = EnsembleRetriever(
    retrievers=[bm25, chroma_retriever],
    weights=[0.4, 0.6],
    c=60,
    id_key="chunk_id",   # 用我们的确定性 chunk_id 去重，避免 page_content 长文比对
)
docs = ens.invoke("问题")   # list[Document]，无分数
```

### 判断：用现成 EnsembleRetriever vs 自实现 RRF → **建议自实现共享 RRF 算子**
理由：
1. **RAG-Fusion 复用**：EnsembleRetriever 的模型是"**N 个 retriever × 1 个 query**"；RAG-Fusion 是"**1 个 retriever × N 个 query 变体**"，形状不同，无法直接复用它这条路径。而 RRF 本体只有 ~10 行（`weight/(rank+c)` + 去重排序），自己抽一个 `reciprocal_rank_fusion(doc_lists, weights, c, id_key)` 纯函数，**混合检索和 RAG-Fusion 都能调同一个**，符合 notes 里"复用同一 RRF 算子"的既定决策。
2. **要分数**：EnsembleRetriever 丢掉了 RRF 分数；后续 LLM 重排、弃答阈值、可观测都想看到融合分。自实现可把 score 写回 `doc.metadata["rrf_score"]`。
3. **去重键可控**：自实现直接按 `chunk_id` 去重，语义明确。
4. **依赖收敛**：EnsembleRetriever 在 `langchain_classic`（1.x 的"遗留兼容"包），自实现不吃这层易漂移的依赖。

→ **结论**：自实现一个 `rrf_fuse()` 纯函数作为唯一 RRF 算子（混检+Fusion 共用）；EnsembleRetriever 可留作对照基线，不作为主路径。

---

## 3. Chroma 向量检索 【实测】

**import**：`from langchain_chroma import Chroma`（`langchain_chroma` 1.1.0，无 `__version__`）。

**方法齐全**（hasattr 实测全 YES）：`as_retriever` / `similarity_search` / `similarity_search_with_score` / `similarity_search_with_relevance_scores` / `max_marginal_relevance_search`。

**as_retriever**：`as_retriever(**kwargs)`，`search_type` 允许值（`VectorStoreRetriever.allowed_search_types` 实测）：
```
('similarity', 'similarity_score_threshold', 'mmr')
```
用法：
```python
# 相似度 top-k
r = vs.as_retriever(search_type="similarity", search_kwargs={"k": 8})
# 带阈值弃答（低于阈值不返回）
r = vs.as_retriever(search_type="similarity_score_threshold",
                    search_kwargs={"k": 8, "score_threshold": 0.3})
# MMR 去冗余
r = vs.as_retriever(search_type="mmr",
                    search_kwargs={"k": 8, "fetch_k": 20, "lambda_mult": 0.5})
```

**拿带分数结果**（两个都在）：
```python
vs.similarity_search_with_score(query, k=4)              # 返回 [(Document, 距离)] —— 距离越小越近
vs.similarity_search_with_relevance_scores(query, k=4)   # 返回 [(Document, 相关度 0~1)] —— 越大越相关，用于阈值
```
签名实测：`similarity_search_with_relevance_scores(query, k=4, **kwargs)`。

**MMR 可用** ✅：`max_marginal_relevance_search(query, k=4, fetch_k=20, lambda_mult=0.5, filter=None, where_document=None)`。

> 混合检索里 BM25 侧和 Chroma 侧要各出一个 ranked list 再 RRF。Chroma 侧用 `similarity_search_with_score`（或 with_relevance_scores）取分数版更好；但 RRF 只用**排名**不用绝对分，故用不带分的 `as_retriever` 也够，取分数是为了可观测/阈值弃答。

---

## 4. LLM 重排（GLM-5.2 当打分器）【实测 + 源码】

我们无专用 rerank 模型 → 用 GLM-5.2 打分。LangChain 现成件：

**全部搬到 `langchain_classic`**（`langchain.retrievers.*` 已不存在）：
```python
from langchain_classic.retrievers import ContextualCompressionRetriever
from langchain_classic.retrievers.document_compressors import (
    LLMListwiseRerank,   # listwise：LLM 一次性给整批 doc 排序
    LLMChainFilter,      # 二元：LLM 判每个 doc 相关/不相关（过滤，非排序）
    LLMChainExtractor,   # 抽取相关片段（压缩，非重排）
)
```
（另有 `langchain_community.document_compressors.rankllm_rerank.RankLLMRerank`，但依赖 RankLLM/外部模型，不适合 GLM。）

**LLMListwiseRerank**（最贴合"LLM listwise 重排"）：
```python
LLMListwiseRerank.from_llm(llm, *, prompt=None, top_n=3)
# 字段: reranker(Runnable), top_n
# compress_documents(docs, query) -> 取 top_n
```

### ⚠️ 关键约束（源码实测，会卡住实现）
`LLMListwiseRerank.from_llm` 内部：
```python
if type(llm).with_structured_output == BaseLanguageModel.with_structured_output:
    raise ValueError("llm ... does not implement with_structured_output")
reranker = ... | llm.with_structured_output(RankDocuments)   # 用结构化输出让 LLM 吐排序
```
即 **它强依赖 `llm.with_structured_output`**，也就是必须传一个 **LangChain ChatModel**（如 `ChatOpenAI`），不能传裸 `openai` SDK client。

**对本项目的影响（两处缺口）**：
1. 项目目前用**裸 `openai` SDK 2.45.0** 调 GLM-5.2，且 **`langchain-openai` 未装**。要用 `LLMListwiseRerank`/`ContextualCompressionRetriever`，须：
   - `pip install langchain-openai`（加进 `[rag]`），把 GLM-5.2 包成 `ChatOpenAI(model=..., base_url=MaaS端点, api_key=...)`；
   - 该端点必须支持 **function-calling / JSON schema**（`with_structured_output` 靠工具调用或 json 模式实现）。GLM-5.2 MaaS 兼容端点是否支持 tool_call → **【推测】需 M2 运行时实测**（notes 已记 MaaS 偶发 10054 断连，重试韧性也要带上）。
2. 若不想引 `langchain-openai` / 不确定端点结构化输出能力 → **自实现 pointwise/listwise 打分**更可控：
   - **pointwise**：对每个 (query, doc) 让 GLM-5.2 输出 0~1 相关分（复用现有裸 openai client + `enable_thinking:False` 快而稳，见 notes M5 决策），按分数排序取 top_n。简单、易加缓存、与现有 LLM 封装一致。
   - **listwise**：一次把 N 个候选喂进去让 GLM 返回 id 顺序（省 token，但要解析健壮性 + 处理漏 id）。

### 建议
- **主路径：自实现 pointwise LLM 重排**——复用项目现有裸 `openai` GLM-5.2 封装（已有关思考/重试/韧性），不引 `langchain-openai`，打分逻辑透明可测、可缓存、与 M5 grade_documents 风格一致。
- LangChain 的 `LLMListwiseRerank`+`ContextualCompressionRetriever` 作为**已知备选**：想少写代码时可用，但代价=引 `langchain-openai` + 依赖端点结构化输出能力（未证实）。
- 重排放在混合检索 RRF 融合**之后**（对 top-N 融合结果重排，N 不宜大以控 LLM 调用量/延迟）。

---

## 依赖缺口汇总（建议改 `pyproject.toml [rag]`）
| 缺口 | 现状 | 处置 |
|---|---|---|
| `jieba` | 未装 | **必加** `[rag]`（BM25 中文分词，否则不切词） |
| `langchain-openai` | 未装 | **仅当**选用 LangChain 的 LLMListwiseRerank/ContextualCompression 才需；自实现 pointwise 则不需 |
| `rank-bm25` | 已装 0.2.2 | ✅ |

## import 速查（本机确认可用）
```python
from langchain_community.retrievers import BM25Retriever                       # community(sunset警告)
from langchain_classic.retrievers import EnsembleRetriever                     # 已从 langchain.retrievers 迁走
from langchain_chroma import Chroma
from langchain_classic.retrievers import ContextualCompressionRetriever
from langchain_classic.retrievers.document_compressors import LLMListwiseRerank
import jieba  # 需先装
```
