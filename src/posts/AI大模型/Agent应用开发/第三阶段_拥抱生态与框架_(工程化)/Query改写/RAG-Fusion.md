---
title: "RAG-Fusion"
icon: robot
date: 2026-07-23
category:
  - AI大模型
---
**RAG-Fusion（检索增强生成融合）** 是对传统 RAG 技术的一次硬核进化架构。

传统 RAG 往往非常死板：用户输入一句话，系统直接把这句话转成向量去数据库里捞文档。如果用户**提问方式不专业、有错别字，或者问题很复杂**，第一步的检索就会彻底发生偏离，导致大模型最终胡言乱语。

RAG-Fusion 的核心目的，就是**引入“多路并发重写”与“RRF 排名融合算子”，在检索的第一步就物理消灭用户的提问偏差，全方位提升大模型对复杂任务的回答精度。**

---

### 一、 RAG-Fusion 的底层核心架构

如果把它的数据管道（Pipeline）扒开，它主要由以下四步闭环构成：

```plain
                    【 1. 用户输入原始问题 】 (例: "怎么压榨 GPU 推理算力")
                                │
                                ▼ (LLM 介入多角度扩写)
         ┌──────────────────────┼──────────────────────┐
         ▼                      ▼                      ▼
  [ 衍生子问题 1 ]       [ 衍生子问题 2 ]       [ 衍生子问题 3 ]
  ("vLLM 调度优化")     ("Triton 算子加速")    ("GPU 显存 Prefill 优化")
         │                      │                      │
         ▼                      ▼                      ▼
  【 2. 多路并发检索 】   【 2. 多路并发检索 】   【 2. 多路并发检索 】
   (关键词+向量混合)      (关键词+向量混合)      (关键词+向量混合)
         │                      │                      │
         ▼                      ▼                      ▼
    [ 结果列表 1 ]         [ 结果列表 2 ]         [ 结果列表 3 ]
         │                      │                      │
         └──────────────────────┼──────────────────────┘
                                │
                                ▼
              ⚙️【 3. RRF (倒数排名融合) 算子轰炸 】
                                │
                                ▼ (将多路结果强行融合成唯一的黄金列表)
                     [ 最终重排后的 Top-N 文档 ]
                                │
                                ▼ (送入上下文)
                    【 4. 大模型最终生成 Answer 】

```
---

### 二、 RAG-Fusion 具体是怎么做的？（四步工程落地）

#### 第一步：Query 扩写与多角度重写（Query Generation）

系统收到原始提问后，不急于去查数据库，而是先调用一个速度极快、消耗 Token 极低的微型大模型（如 GPT-4o-mini 或小参数量开源模型），让它站在不同的专业视角，把这个问题扩写成 3~4 个意思相近但侧重点不同的衍生子问题。

-   *Prompt 模板通常长这样*：

> `"你是一个智能搜索专家。请针对用户的原始问题，生成 3 个不同技术角度的、适合在向量数据库和倒排索引中检索的衍生子问题。每个问题一行，不要有任何多余的解释。原始问题：{query}"`

  

#### 第二步：多路并发检索（Multi-Vector Search）

系统后台拉起并发线程，将原始问题加上生成的 3 个子问题，**同时**扔进知识库。每一路检索通常还会采用**混合检索（Hybrid Search）**，即同时跑传统关键词（BM25）和向量语义检索。

-   这一步结束后，系统会拿到 4 组完全不同的文档检索结果列表，每个列表里的文档都有各自的物理排位。

#### 第三步：RRF 算子排名融合（Reciprocal Rank Fusion）

这是 RAG-Fusion 的灵魂。4 组列表里一定会有重复的文档（例如“文档 X”在问题 1 里排第 2，在问题 3 里排第 1）。  
系统直接应用 **RRF 算法**，彻底抛弃它们原始的各异分数，仅仅根据它们在各个列表里的绝对排位，通过倒数公式进行加权求和：

  

$$
\text{RRF\_Score} = \sum \frac{1}{60 + \text{Rank}}
$$

经过这轮数学轰炸，**那些能够同时回答多个子问题、在多路检索中达成“高度共识”的黄金文档，总分会瞬间飙升，强行提权到最终大表的最前排。**

#### 第四步：大模型最终生成（Generation）

截取经过 RRF 重排后总分最高的前 $N$ 个文档切片（Chunks），作为 Context（上下文）与用户的**原始问题**一起打包，喂给最终的目标大模型，吐出最终严谨、全能且不易跑题的完美答案。

---

### 三、 工业界手写实现代码片段（基于 Python 伪代码）

在实际工程中，你可以非常轻松地手写出这套 Fusion 流水线：

```python
import concurrent.futures

def rag_fusion_pipeline(user_query, vector_db, llm_client):
    # 1. Query 重写
    rewrite_prompt = f"针对以下问题生成3个互补的搜索子问题:\n{user_query}"
    rewritten_queries = llm_client.generate_queries(rewrite_prompt) # 得到一个包含4个问题的列表
    all_queries = [user_query] + rewritten_queries
    
    # 2. 多路并发检索
    all_results = []
    with concurrent.futures.ThreadPoolExecutor() as executor:
        # 并发去查数据库，每路返回前 10 个文档
        futures = {executor.submit(vector_db.search, q, top_n=10): q for q in all_queries}
        for future in concurrent.futures.as_completed(futures):
            all_results.append(future.result()) # 得到 4 个文档列表
            
    # 3. RRF 排名融合算子
    rrf_scores = {}
    k = 60 # 黄金平滑常量
    for doc_list in all_results:
        for rank, doc in enumerate(doc_list):
            doc_id = doc.id
            if doc_id not in rrf_scores:
                rrf_scores[doc_id] = {"doc": doc, "score": 0.0}
            # 核心倒数累加逻辑 (rank 从 0 开始，所以 + 1)
            rrf_scores[doc_id]["score"] += 1.0 / (k + (rank + 1))
            
    # 按照 RRF 得分从大到小对所有去重后的文档进行物理重排
    reranked_docs = sorted(rrf_scores.values(), key=lambda x: x["score"], reverse=True)
    top_n_context = [item["doc"] for item in reranked_docs[:5]] # 捞出最稳的 5 个文档
    
    # 4. 喂给 LLM 最终生成
    final_answer = llm_client.answer_with_context(user_query, top_n_context)
    return final_answer

```

### 💡 为什么说 RAG-Fusion 很强？

1.  **容错率极高**：它就像漏斗，用户提问水平再差，只要大模型重写的 3 个方向里有一个撞大运撞对了核心关键词，RRF 算子就能顺藤摸瓜，把最对的文档从深水区当场打捞上岸。
2.  **自带语义互补**：对于极其复杂的信息检索任务（如对比两个技术架构的优缺点），单次提问很难面面俱到。RAG-Fusion 的多角度扩写能自动帮你把“优点”、“缺点”、“底层架构”多个维度的知识点一次性全量找齐，彻底解决了大模型回答由于上下文信息不全而引发的局部幻觉（Hallucination）。
