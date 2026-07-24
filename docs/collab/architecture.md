# 架构总览(活文档)

> 本文件随架构演进更新。事实源:`../../.claude/plans/starry-tumbling-globe.md`(路线/对照表)+ `src/blog_rag/*.py`。
> 定位一句话、对照表、图骨架来自 plan 提炼;模块映射核对自实际源码。

## 一、定位

给个人博客(ZH-Kinger,VuePress)做一个**生产级、极致精准、双模式全能**的 Agentic RAG 对话 agent:博客问题走接地 RAG(带引用、无据弃答),代码/画图/闲聊走通用模式(不接地、不带引用)。语料 = 博客文章 + AI Infra 技术资料。核心哲学:**精准 > 速度;宁可有据或说"不知道",绝不臆造**。

## 二、Claude Code 架构 ↔ 本项目 LangGraph 落地

用户定调 **Claude Code = 标杆**:记忆/网关/工具调用/上下文压缩/Agentic 迭代循环照学,翻译成 LangGraph。四板块 = ①规划推理 ②记忆状态 ③工具动作 ④护栏,加**网关**与**迭代循环**。

| 板块/机制 | Claude Code 做法 | 本项目 LangGraph 落地(API 核 1.x) | 模块 |
|---|---|---|---|
| **迭代循环** | gather→act→verify→反思纠错,有界 | `retrieve→grade→(transform/web)→generate→guardrails`,低分/失败回环重试(Reflexion),`loop_step` 有界 + `recursion_limit` 兜底 | graph.py |
| **子 agent 隔离** | 按 description 派独立上下文 worker | 每条路由 = 独立子图(自带 prompt + 工具 + 模型档),router 只派遣 | graph.py / general.py |
| **网关·认知路由** | 派遣到子 agent | `route_question` 条件边:`rag`/`general`;优先级 **用户 flag > 自动 router > config** | graders.py / graph.py |
| **网关·基础设施** | — | 薄封装无独立服务:`.with_retry()`/tenacity + 备用 provider;语义缓存默认关 | llm.py |
| **记忆·短时** | 上下文窗口 + 会话历史 | checkpointer:`InMemorySaver`(非旧 `MemorySaver`)→ 生产 `SqliteSaver`;`thread_id` 续接 | graph.py |
| **记忆·长时** | CLAUDE.md/MEMORY.md 分层 | Store API:`put/search`,节点内 `runtime.store` 注入;用户记忆与 KB 分 namespace | (M8) memory.py |
| **记忆·黑板** | — | State = TypedDict + reducer(`Annotated[list, add]`)多节点产物自动汇聚 | state.py |
| **工具调用** | built-in + Skills 按需加载 + MCP | 4 工具最小集 + Pydantic 强类型入参(≈约束解码) | (M4) tools.py |
| **护栏·前置 Hook** | PreToolUse 拦截(权限) | 节点前中间件:入参校验 + 轻权限判定(只读检索/代码不执行→权限面天然小) | guardrails.py |
| **护栏·后置 Hook** | PostToolUse 熔断 | 生成后:引用存在性 + 解析真实 doc + 逐条 faithfulness(temp=0)+ 低分弃答 | guardrails.py |
| **上下文压缩** | 清旧工具输出 + 摘要 | `max_context_tokens` 预算砍低分块 + 文档**替换不追加** | state.py / rag_chain.py |

**右尺寸原则**:学 Claude 的模式,按单用户表面积收敛——权限/沙箱因"只读检索 + 代码只生成不执行"天然轻(学 Hook 拦截,不建 Firecracker/Docker);基础设施网关不起独立服务、不上 Redis/LiteLLM;语义缓存默认关;长时 Store 复用 Chroma 后端但分 namespace。

## 三、M5 图骨架

节点 = Action,条件边 = Thought,State = Observation 账本,有界计数 = 收敛熔断。

```
                       START
                         │
                  route_question       ← Thought:廉价分类 general/rag(temp=0,关思考,~1s)
                    /          \           用户 flag 优先:web_mode→强制 web;deep_thinking→开 RAG-Fusion
               general          rag
                  │              │
                  │          retrieve     ← 混合检索+RRF(+Fusion);documents reducer=替换不追加
                  │              │
                  │        grade_documents ← 证据语义相关性(细筛)
                  │              │
                  │        grounding_gate  ← best rerank_score ≥ grounding_min_rerank(5)?
                  │          /        \
                  │     grounded    not_grounded
                  │        │             │
                  │        │        (loop_step<max_retries?) ─是→ transform_query → retrieve  (Reflexion,max_retries=1)
                  │        │             │否
                  │        │         web_search → grade_web  ← web_mode 或兜底;结果不相关→refuse
                  │        │          /       \
                  │        │       有据       空/不相关
                  │        │        │           │
                  │        │        │        refuse        ← 本该有据却查不到→诚实弃答(mode=refuse)
                  │        │        │           │
              generate ◄───┴────────┴───────────┘   ← 统一节点,prompt 按 state.mode 选
                  │
             guardrails            ← 后置 Hook:引用三查 + 逐条 faithfulness(temp=0)
                  │
                 END
```

**四结局(兜底阶梯:本地→联网→通用→弃答)**:①接地(KB 有据,带 `[S#]`)②通用(超 KB 范围,标"非知识库/无出处"+"你可能想问")③联网(不接地但联网命中,带 `[W#]`+URL)④弃答(本该有据却查不到)。

## 四、端到端数据流

```
投放 data/inbox/<分类>/       ← 原始源(lakebook/pdf/md/图)
   │  converters.py 按扩展名分派 handler
   ▼
发布区 src/posts/<分类>/       ← 干净 MD(frontmatter),VuePress 直接渲染
   │  loaders.py 标题感知分块 + 确定性 chunk_id + 面包屑
   ▼
入库 ingest.py                ← text-embedding-v4 向量化 → Chroma
   │  Indexing API + SQLRecordManager 幂等(增改删同步)
   ▼
Chroma 向量库(带 metadata:doc_id/section/page/source_type)
   ▲
问题 → route_question → [rag] retrieve(dense + BM25 → RRF 融合)
   │                        → listwise 重排(GLM-5.2)→ grade_documents
   │                        → grounding_gate → generate(带 [S#] 引用)→ guardrails
   └──────────────── [general] 代码/画图/闲聊(不接地)
   兜底:不接地 → web_search([W#]+URL)→ 仍无 → refuse
```

评测(`eval/`)贯穿每次改动:golden.jsonl → run_eval → hit@k/mrr(纯算)+ faithfulness/answer_relevancy/context_recall(GLM 判官)。

## 五、模块 ↔ 文件映射(`src/blog_rag/`)

| 文件 | 职责 | 阶段 |
|---|---|---|
| `config.py` | 统一配置(pydantic-settings,30+ 旋钮全 env 驱动 + 类型校验);唯一读 env 处 | M0 |
| `llm.py` | GLM-5.2 客户端封装(裸 openai SDK;关思考开关) | M0 |
| `sources.py` | `sources.toml` 来源登记表 → `load_sources()`,按 type 分发 loader | M1 |
| `loaders.py` | md loader(frontmatter→metadata + 标题感知分块 `split_markdown_to_docs`);PDF 复用 | M1 |
| `converters.py` | 投放管道:按扩展名分派 handler(lakebook/pdf/md/图)转成发布区 MD | M1 |
| `ingest.py` | 入库:embedding + Chroma + Indexing API/RecordManager 幂等 | M1 |
| `retriever.py` | dense / BM25+jieba / `rrf_fuse` 纯函数 / listwise 重排 / RAG-Fusion | M2 |
| `rag_chain.py` | 单跳 RAG 链(双模式接地闸门 + 引用 + token 预算 + web 兜底)= M2 基线 | M2 |
| `web.py` | 三 provider 联网工厂(ddgs/tavily/bocha)+ 重试降级 | M4 |
| `eval/metrics.py` | 自实现指标:faithfulness/answer_relevancy/context_recall(GLM 判官)+ hit@k/mrr(纯算) | M3 |
| `eval/run_eval.py` | 评测编排 + golden.jsonl | M3 |
| `state.py` | `AgentState`(TypedDict + reducer,黑板总线) | M5 |
| `graders.py` | `route_question` / `grounding_gate` / `grade_documents` / `grade_web`(Thought 决策) | M5 |
| `general.py` | 通用分支(不接地/不带引用,产 suggestions) | M5 |
| `guardrails.py` | 后置 Hook(引用三查 + faithfulness + 弃答确认) | M5 |
| `graph.py` | `StateGraph` 组装 + `InMemorySaver` checkpointer;`answer_graph` 四字段契约 | M5 |
| `cli.py` | 命令行入口(`blog-rag "问题"`) | M2 |

> 待建(计划):`tools.py`(M4)、`memory.py`(M8)、`app.py`/`mermaid.py`(M6)、`reliability.py`(M7)、`observability.py`/`feedback.py`(M3/反馈)。
</content>
</invoke>
