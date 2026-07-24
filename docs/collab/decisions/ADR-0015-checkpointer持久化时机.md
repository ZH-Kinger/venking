# ADR-0015: 短时记忆 checkpointer 选型与持久化时机
- 状态: 已采纳
- 日期: 2026-07-14
- 相关模块: M5 / M8

## 背景(为什么要做这个决策)
LangGraph 用 checkpointer 存图的短时状态(黑板 State),按 thread_id 续接实现多轮追问/指代重组。要选后端:开发期够用 + 生产期能持久化。且实测 `langgraph-checkpoint-sqlite` 当前未安装。

## 选项(≥2,每个一句话)
- A InMemorySaver(选中,当前):进程内内存存 checkpoint,零依赖。
- B SqliteSaver:单文件 SQLite 持久化,跨进程/重启保留会话。
- C PostgresSaver / Redis:多实例共享、生产级并发。

## 优劣对比
| 方案 | 优 | 劣 |
|---|---|---|
| A InMemorySaver(选中) | 零依赖、零配置、够单进程多轮;M5 先跑通图 | 进程退出会话即失;不跨进程 |
| B SqliteSaver | 单文件持久化、仍零服务;适合单机生产 | 需装 `langgraph-checkpoint-sqlite`(当前未装) |
| C Postgres/Redis | 多实例共享、高并发 | 要起服务/运维;单用户过度工程 |

## 结论(选了哪个)
M5 先用 **A InMemorySaver**(先把图跑通,单进程多轮足够);持久化(**B SqliteSaver**)推到 **M7/M8**——届时 `pip install langgraph-checkpoint-sqlite` 后一行切换 `SqliteSaver(conn)`。注意用新名 `InMemorySaver`(非旧 `MemorySaver`,已核 LangGraph 1.2.9 API)。

## 为什么不选替代
- 不现在上 B:当前包未装,且 M5 阶段目标是"图跑通 + 双模式精准",跨进程记忆不是关键路径;过早引入持久化文件会增加状态迁移/schema 版本负担。
- 不选 C:单用户、无多实例需求,Postgres/Redis 是明显过度工程(违背"右尺寸"原则,见 [[R4-网关与记忆]])。

## 回溯条件(什么情况下该重估)
- 需要跨重启保留会话、或 UI(M6)上线后要历史续接 → 切 B SqliteSaver。
- 出现多实例部署/高并发 → 才评估 C。

## 证据链接
- Explore 2026-07-14(实测:StateGraph/InMemorySaver/InMemoryStore 可用;SqliteSaver 未装,ModuleNotFoundError)
- [[R4-网关与记忆]](LangGraph 1.x 记忆 API 漂移:InMemorySaver 非旧 MemorySaver;单用户右尺寸)
- 相关:ADR-0010(记忆三层)、plan「参考 Claude Code」记忆章节
