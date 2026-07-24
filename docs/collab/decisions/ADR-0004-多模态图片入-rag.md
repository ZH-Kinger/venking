# ADR-0004: 多模态图片进 RAG —— captioning(B)+ 图文分离(D)
- 状态: 已采纳
- 日期: 2026-07-12
- 相关模块: M1

## 背景(为什么要做这个决策)
infra 语料含 62 张大架构图,信息量大不可丢。技术栈是 OpenAI 兼容 + Chroma 纯文本向量,本机装 torch/CLIP 有成本。需决定图片怎么进 RAG。

## 选项(≥2,每个一句话)
- **A 丢弃**:只索引文字,图全扔。
- **B captioning**:VL 模型把图转中文描述,入文本向量库。
- **C 多模态 embedding(CLIP 类)**:图文映射到同一向量空间。
- **D 图文分离**:检索靠 caption,命中后把原图带出/喂 VLM 生成。

## 优劣对比
| 路线 | 优 | 劣 |
|---|---|---|
| A 丢弃 | 零成本 | 62 张架构图信息全丢,不可取 |
| **B captioning** | 简单、与文本 Chroma 同栈、无本地 GPU、62 图一次 <1 元 | 图→文有损(检索 MAP 约落后原生多模态 ~32%) |
| C 多模态 embedding | 检索最优(研究 +32% MAP) | 需 CLIP + torch、Chroma 要另开多模态 collection、走 DashScope 原生 API |
| **D 图文分离** | 保留原图、兼顾文本检索简单性 | 需 merge/rerank,有跨库漂移风险 |

## 结论(选了哪个)
**B 为主 + D 兜底**,并升级为**派系2(Multi-Vector)**:检索靠 caption 文本(复用文本 embedding + BM25,不引 CLIP);命中图片块时**生成侧把原图喂 VLM 看**(而非只喂 caption),`MultiVectorRetriever` 绑 caption↔原图。需生成模型多模态(`multimodal_generation` 开关,实测 GLM-5.2 端点,不支持回退 qwen-vl-max/纯 caption)。

## 为什么不选替代
- **不选 A**:架构图是 infra 语料核心信息,丢弃直接损失精准上限。
- **不选 C(CLIP,派系3)**:本地 CLIP 依赖 torch,当前 Windows + Py3.14 环境落地成本最高;且需 Chroma 另开多模态 collection(维度不同不能混库)+ 写 DashScope 原生 API。专有术语检索上 BM25 仍更稳,多模态 reranker 未成熟。收益(+32% MAP)不抵工程成本,排为进阶备选。

## 回溯条件(什么情况下该重估)
需以图搜图/以图搜文;caption 有损明显拖低图相关问题的召回;环境允许稳定装 CLIP。届时用百炼 `multimodal-embedding-v1` 另开多模态 collection。

## 证据链接
- `docs/collab/research/R1-多模态RAG方案.md`(四路线对比 + Qwen-VL 调用 + 成本估算)
- notes 2026-07-12(派系1→派系2 升级、跨页布局锚定、max_context_tokens)
</content>
