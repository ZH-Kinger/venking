# ADR-0001: Embedding 选型 —— 百炼 text-embedding-v4(云)
- 状态: 已采纳
- 日期: 2026-07-12
- 相关模块: M1

## 背景(为什么要做这个决策)
RAG 检索质量的地基是 embedding。原计划用本地 `text2vec`,但本机 Python 3.14(后定 3.13)对 torch 的 wheel 支持存疑;且对话模型 GLM-5.2 无法做向量化(是另一类模型)。需选一个中文质量好、能快速跑通 205 篇 md + infra 语料的向量化方案。

## 选项(≥2,每个一句话)
- **A 百炼 text-embedding-v4(云,OpenAI 兼容)**:1024 维默认、免费 100 万 token/90 天、Qwen3-Embedding 底座中文强。
- **B 本地 text2vec(shibing624)**:离线免费,但依赖 torch + 权重下载。
- **C GLM-5.2 做 embedding**:架构上不可能(对话模型非向量模型)。

## 优劣对比
| 方案 | 优 | 劣 |
|---|---|---|
| **A v4(云)** | 免 torch、分钟级跑通、中文质量最好、免费额度够学习期 | 需联网、数据出本机、按量计费(0.5 元/百万 token) |
| B 本地 text2vec | 离线、免费、隐私 | torch ~122MB + 权重、首次慢、早期模型(768 维)质量明显弱于 v4 |
| C GLM 做 embedding | — | 架构上不可能 |

## 结论(选了哪个)
选 **A:text-embedding-v4,1024 维锁定**(相对 2048 维 MTEB 仅约 -3.2 分、存储减半)。LangChain 接入须带两个补丁:`chunk_size=10`(百炼 batch 上限 10)、`check_embedding_ctx_length=False`(关 tiktoken 切分)。

## 为什么不选替代
- **不选 B**:R2 实测 torch 2.13 确有 cp314 wheel,本地方案技术可行,但"快看到端到端效果 + 中文质量"两点上 v4 明显占优,torch 依赖重、首次加载慢是纯学习期成本。本地 text2vec 保留为二期"离线/省钱/隐私"对比章节,非现在。
- **不选 C**:对话模型与向量模型是两类,GLM-5.2 无 embedding 能力,不存在选项。

## 回溯条件(什么情况下该重估)
需完全离线/数据不出域;或免费额度耗尽且成本敏感;或要做以图搜图(改多模态 embedding,见 ADR-0004)。注意:**维度一旦入库锁定,改维度须重建库**。

## 证据链接
- `docs/collab/research/R2-环境与embedding.md`(规格表 + batch=10 坑 + 本地 vs 云对比)
- notes 2026-07-12(v4 选定、chunk_size 坑、维度锁定)
</content>
