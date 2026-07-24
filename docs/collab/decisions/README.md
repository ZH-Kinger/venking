# ADR 决策记录索引

> 一个真实决策 = 一条 ADR。**新决策**:复制 `_TEMPLATE.md`、编号顺延(ADR-XXXX)、按模板结构填全(尤其"为什么不选替代"与"证据链接")。
> 模板结构见 `_TEMPLATE.md`。回填历史决策重组自 `research/RX`、`项目总结-方向与技术选型.md`、`notes.md`。

| 编号 | 标题 | 状态 |
|---|---|---|
| [ADR-0001](ADR-0001-embedding-选型.md) | Embedding 选型 —— 百炼 text-embedding-v4(云) | 已采纳 |
| [ADR-0002](ADR-0002-向量库-chroma.md) | 向量库 —— Chroma | 已采纳 |
| [ADR-0003](ADR-0003-pdf-解析器-docling.md) | PDF 解析器 —— docling(主干)+ fitz(后勤) | 已采纳(本语料见 ADR-0012) |
| [ADR-0004](ADR-0004-多模态图片入-rag.md) | 多模态图片进 RAG —— captioning(B)+ 图文分离(D) | 已采纳 |
| [ADR-0005](ADR-0005-混合检索-rrf-自实现.md) | 混合检索 + RRF 融合 —— 自实现纯函数 | 已采纳 |
| [ADR-0006](ADR-0006-重排-listwise-llm.md) | 重排 —— GLM-5.2 listwise LLM 重排 | 已采纳 |
| [ADR-0007](ADR-0007-评测栈-自实现.md) | 评测栈 —— 自实现 metrics(弃 RAGAS) | 已采纳 |
| [ADR-0008](ADR-0008-联网-provider.md) | 联网搜索 provider —— 三选一工厂 | 已采纳 |
| [ADR-0009](ADR-0009-网关-右尺寸.md) | 网关右尺寸 —— 不上独立网关/Redis | 已采纳 |
| [ADR-0010](ADR-0010-记忆三层-checkpointer.md) | 记忆三层 —— checkpointer(InMemorySaver→Sqlite)+ Store + State | 已采纳 |
| [ADR-0011](ADR-0011-glm-关思考-判断类调用.md) | 判断类调用关闭 GLM 思考 | 已采纳 |
| [ADR-0012](ADR-0012-语料-pdf-转-lakebook.md) | AI Infra 语料从 PDF 转 lakebook | 已采纳 |
| [ADR-0013](ADR-0013-路由形态与加固.md) | 路由形态(混合式 Adaptive-RAG)+ 确定性预筛加固 | 已采纳 |
| [ADR-0014](ADR-0014-弃答机制-CRAG证据打分.md) | 弃答机制 —— CRAG 证据打分(生成前)vs 关键词(生成后) | 已采纳 |
| [ADR-0015](ADR-0015-checkpointer持久化时机.md) | 短时记忆 checkpointer 选型与持久化时机 | 已采纳 |
| [ADR-0016](ADR-0016-流式方案.md) | UI 流式 —— LangGraph custom writer(vs messages/重构/不流式) | 已采纳 |
| [ADR-0017](ADR-0017-agent部署形态.md) | agent 部署形态 —— 自建服务器 · Docker · IP 起步(vs HF/PaaS/share) | 已采纳 |
</content>
