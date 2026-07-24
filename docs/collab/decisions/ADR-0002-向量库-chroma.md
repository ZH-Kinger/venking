# ADR-0002: 向量库 —— Chroma
- 状态: 已采纳
- 日期: 2026-07-12
- 相关模块: M1

## 背景(为什么要做这个决策)
需一个本地、支持 metadata 过滤(self-query/双语料路由需要)、LangChain 一等支持的向量库,承载 205 篇 md + infra 语料的向量与元数据。单用户学习场景,不需要分布式。

## 选项(≥2,每个一句话)
- **A Chroma**:轻量、本地持久化、支持 metadata 过滤、LangChain 一等支持。
- **B FAISS**:纯向量索引,快但无 metadata 便利。
- **C Milvus / Qdrant**:生产级强大但重,需独立服务。

## 优劣对比
| 方案 | 优 | 劣 |
|---|---|---|
| **A Chroma** | 轻量、零服务、metadata 过滤开箱、LangChain 支持好 | 单机、非高并发生产级 |
| B FAISS | 检索快、成熟 | 无 metadata 便利(引用定位/过滤要另建),API 偏底层 |
| C Milvus/Qdrant | 生产强、可扩展、混合检索原生 | 需起独立服务、运维重,单机学习过度 |

## 结论(选了哪个)
选 **A:Chroma**。派系2 多模态图 caption 也走同一文本 embedding,所有层同空间 → **单 collection + `layer`/`source_type` 元数据**,不开多物理库。

## 为什么不选替代
- **不选 B FAISS**:本项目引用定位刚需 metadata(doc_id/section/page/source_type),FAISS 要自建一套旁路 KV 存元数据,徒增复杂度;metadata 过滤是双语料(博客↔infra)路由与 self-query 的前提。
- **不选 C Milvus/Qdrant**:单用户无并发、无分布式需求,起独立服务 = 多一个进程 + 运维负担,是过度工程。将来真要上生产/高并发再迁。

## 回溯条件(什么情况下该重估)
语料规模到千万级向量;需多用户高并发;需 Chroma 不支持的高级索引/过滤。

## 证据链接
- `docs/collab/项目总结-方向与技术选型.md` §3(向量库对比)
- notes 2026-07-12(单库 + layer 标签、KB 存储规范)
</content>
