# ADR-0010: 记忆三层 —— checkpointer(InMemorySaver→Sqlite)+ Store + State
- 状态: 已采纳(M5 用 InMemorySaver;SqliteSaver 留 M7/M8)
- 日期: 2026-07-12
- 相关模块: M5 / M8

## 背景(为什么要做这个决策)
照 Claude Code 记忆做法(短时上下文 + 长时分层 + 黑板),翻译成 LangGraph 三层。需定各层用什么 API、什么后端,且避开 LangGraph 1.x 的 API 漂移。

## 选项(≥2,每个一句话)
- **短时**:A `InMemorySaver`(开发,进程内) vs B `SqliteSaver`(本地持久化) vs C `PostgresSaver`(高并发)。
- **长时**:Store API(InMemoryStore→SqliteStore/Chroma 后端) vs 无长时。
- **黑板**:State TypedDict + reducer vs 节点间直接互调。

## 优劣对比
| 层 | 选择 | 优 | 劣 |
|---|---|---|---|
| 短时 checkpointer | **InMemorySaver → SqliteSaver** | InMemory 零配置开发够用;Sqlite 跨进程续接、零服务 | InMemory 进程退出即丢;Sqlite 不适高并发(单用户无妨) |
| 长时 Store | **按需,先 InMemoryStore** | 跨会话记住偏好/纠正;可复用 Chroma 后端 | 实体抽取/召回/矛盾消解须自写;初期不急 |
| 黑板 State | **TypedDict + reducer** | 多节点产物自动汇聚,节点不互调 | 需认真设计字段/reducer |

## 结论(选了哪个)
三层:①**短时 = checkpointer**,M5 先 `InMemorySaver`(单进程多轮追问够用),生产换 `SqliteSaver`(独立包 `langgraph-checkpoint-sqlite`,当前未装),一会话一 `thread_id`;②**长时 = Store API**(用户记忆/few-shot 纠正,与知识库 Chroma **分 namespace**),M8 落地;③**黑板 = State reducer**(`Annotated[list, add]`/`add_messages`),M5 已落。生产设 `LANGGRAPH_STRICT_MSGPACK=true`。

## 为什么不选替代
- **短时不直接上 Sqlite/Postgres**:`SqliteSaver` 需先装独立包(当前未装),M5 目标是先跑通图,持久化不是本轮关键,`InMemorySaver` 单进程内多轮追问已够;Postgres 是高并发才需,单用户过度。分阶段避免一次背太多。
- **长时不一开始就上**:Store 只是带向量索引的 KV 原语,实体抽取/矛盾消解要自写,初期无跨会话记忆需求时是过度工程;且**须与文档知识库分开**(知识走 Chroma RAG,用户记忆才走 Store),混淆会污染检索。
- **不用节点互调**:LangGraph 的价值就是 State 黑板解耦,reducer 让并行节点产物自动合并。
- **API 漂移规避**:用 `InMemorySaver`(非旧 `MemorySaver`)、节点内 `runtime.store` 注入(非旧 `get_store()`)。

## 回溯条件(什么情况下该重估)
需跨进程重启续接对话(装 `langgraph-checkpoint-sqlite` 切 Sqlite);出现跨会话记忆需求(上 Store);转高并发(Postgres)。

## 证据链接
- `docs/collab/research/R4-网关与记忆.md` 主题二(checkpointer/Store/State + 1.x API 漂移 + 右尺寸)
- notes 2026-07-12(记忆提级一等公民)、2026-07-13(M5 LangGraph 1.2.9 导入实测、SqliteSaver 未装)
</content>
