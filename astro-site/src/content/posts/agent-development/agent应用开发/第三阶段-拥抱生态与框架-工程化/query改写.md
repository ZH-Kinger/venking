---
title: "Query改写"
date: 2026-07-23
category: "Agent 开发"
---
在大模型（LLM）驱动的现代化 AI 应用中，特别是**检索增强生成（RAG - 知识库检索）**和 **高级 Agent 架构**中，**Query 改写（Query Rewriting / Query Refinement）** 是一道至关重要的**前置文本流控算子**。

简单来说：**Query 改写就是将人类含糊不清、口语化、带有代词、或者过于复杂的原始提问，在进入大模型核心推理或知识库检索之前，通过一套技术手段物理“翻译”并重写为全量、自包含（Self-contained）、对机器更加友好的标准提问。**

它是斩断 RAG 系统“检索不精准”和大模型“多轮对话失忆”的硬核利器。

---

### 一、 为什么必须做 Query 改写？（痛点场景）

人类说话是非常不严密的，通常有以下三大死穴，会导致未经处理的提问直接被系统玩坏：

1.  **多轮对话中的代词指代不明（Coreference Resolution）**：

-   *第一轮*：用户：“帮我查一下生产环境 `k8s-prod` 集群的 CPU 占用率。” （系统检索成功）
-   *第二轮*：用户：“**那显存呢？**”
-   *致命后果*：如果你直接拿“那显存呢？”去向量数据库（Vector DB）里算 Embedding 召回，系统会彻底懵掉，因为这句话里没有任何特定实体。Query 改写必须将其重写为：“生产环境 `k8s-prod` 集群的 GPU 显存占用率是多少？”

  

2.  **复合复杂意图的文本稀疏（Query Decomposition）**：

-   *用户提问*： \* *致命后果*：一句话里塞了两个毫不相干的任务，任何知识库都无法同时完美命中这两段非连续内存的数据。Query 改写必须将其切分为两个独立的原子 Query，以多路并发（Parallel）的方式分别去检索。

  

3.  **关键词不匹配与口语化（Synonym Expansion）**：

-   *用户提问*：*“这卡怎么老是爆显存啊？”*
-   *致命后果*：企业白皮书里写的一定是“GPU OOM（Out of Memory）或显存溢出错误”。通过改写，可以将口语词自动扩展为专业术语，大幅提升词法和句法检索的命中率。

  

---

### 二、 工业界是怎么做的？（三大落地策略）

在工程实现上，Query 改写主要通过三种不同的软件架构架构在网关层流转：

#### 策略 1：基于大模型上下文重写（最主流、开箱即用）

在多轮对话中，我们把历史对话的指纹（Chat History）与当前的新提问一起喂给一个超快、超便宜的小大模型（如 Qwen-7B 或 GPT-4o-mini），命令它只做一件事：结合历史，输出重写后的自包含句子。

```yaml
System Prompt 规格说明:
你是一个高性能的 Query 重写网关。你的唯一任务是结合给定的多轮对话历史，将用户的最新一轮提问，重写为一个完全独立的、自包含的、没有代词歧义的完整句子。
不要输出任何多余的解释，直接输出改写后的文本。

对话历史:
User: 帮我看看生产集群 k8s-prod 里的 Pod 是不是又爆显存了。
Assistant: 经过检查，发现核心的 nginx-backend Pod 发生了 OOM 报错。
最新提问: “把它的最新错误日志拉出来发我”

改写输出: 
帮我拉取生产集群 k8s-prod 中发生 OOM 的 nginx-backend Pod 的最新错误日志并发送给我。

```

#### 策略 2：假设性文档嵌入（HyDE - Hypothetical Document Embeddings）

这是一种非常硬核且精妙的改写技术，专门用于提升 **RAG 向量检索**的质量。

-   **做法**：用户提问后，先不急着去查数据库，而是先调一下 LLM，让它**胡编乱造/盲猜一段“完美的答案”**（这就是假设性文档）。
-   **改写本质**：大模型盲猜的这段答案，虽然细节可能有幻觉，但它的**学术语调、高频专业词汇分布**和知识库里的真文档极度相似。接下来，我们**拿着大模型盲猜的这段答案的向量，去数据库里捞真答案**。实验证明，用“答案向量”去捞“答案”，比用“问题向量”去捞“答案”，命中率有跨代级别的提升。

#### 3\. 语义多路查询扩展（Query Generation / Multi-Query）

让大模型从同一个用户的提问中，派生出 3 个句式完全不同但语义等价的候选 Query（例如把“Triton 算子开发”扩展出“Triton 核心语法讲解”和“如何编写高效率 Triton kernel”）。把这 3 个 Query 并发轰炸向量库，最后将捞出来的海量文档片段通过 **RRF（倒数排名融合算法）** 做去重合并。用空间和算力换取检索的绝对高召回率。

---

### 三、 极简工程代码：如何用 Python 快速落地

在实际 Agent 开发中，我们可以使用类似下面的**极简异步流**把 Query 改写前置挂载到你的系统网关上：

```python
import asyncio
from pydantic import BaseModel, Field

# 约束改写引擎必须输出标准的结构化数据
class RewrittenQuerySchema(BaseModel):
    is_multitask: bool = Field(description="用户这句话是否包含了两个以上相互独立的需求")
    sub_queries: list[str] = Field(description="改写并打散后的自包含标准查询字符串列表")

async def query_rewrite_middleware(raw_user_query: str, session_history: list) -> list[str]:
    """前置中间件：将用户的垃圾原始输入变成规范的工业 Query"""
    
    # 真实开发中，这里调用大模型 JSON Mode，传入历史对话
    # 模拟大模型根据“那显存呢？顺便帮我写个 python 连接池”和历史记录扣出的标准数据
    await asyncio.sleep(0.05) # 模拟毫秒级开销
    
    mock_llm_output = {
        "is_multitask": True,
        "sub_queries": [
            "查询生产集群 k8s-prod 的 GPU 显存占用率曲线",
            "编写一段 Python 语言的异步数据库连接池实现代码"
        ]
    }
    
    validated_data = RewrittenQuerySchema.model_validate(mock_llm_output)
    return validated_data.sub_queries

# ---- 运行时消费 ----
async def main():
    history = [{"role": "user", "content": "帮我看看生产集群 k8s-prod 的 CPU 怎么样了"}]
    raw_query = "那显存呢？顺便帮我写个 python 连接池"
    
    # 进系统第一步：当场改写并打散
    processed_queries = await query_rewrite_middleware(raw_query, history)
    
    # 接下来，下游的 Agent 可以并发拉起两个协程去同时处理这两条清爽无污染的 Query
    for q in processed_queries:
        print(f"🚀 网关下发执行干净的子 Query: '{q}'")

asyncio.run(main())

```

### 💡 极简落地总结

不要把用户的原始发言直接往你的向量数据库或核心工具链（Tools）里塞。在生产环境的最前线部署一个 **Query 改写组件**，利用轻量模型把代词补全、把复合任务切分。**输入端的数据越干净、契约越清晰，你下游 Agent 或 RAG 系统的最终交付准确率就越接近 100%。**
