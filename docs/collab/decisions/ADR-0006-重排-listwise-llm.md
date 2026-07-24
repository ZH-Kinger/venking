# ADR-0006: 重排 —— GLM-5.2 listwise LLM 重排
- 状态: 已采纳(pointwise→listwise 演进)
- 日期: 2026-07-13
- 相关模块: M2 / M4

## 背景(为什么要做这个决策)
RRF 粗排后需精排提精确率。用户定调"全用 GLM",不引专用 rerank 模型/torch。M2 先用 pointwise(逐候选打分),但一次检索 ~20 次串行 LLM 调用、~30s,是评测/问答的主瓶颈。

## 选项(≥2,每个一句话)
- **A pointwise 自实现**:对每个 (query, doc) 单独打 0~10 分,按分排序。
- **B listwise 自实现**:一次调用给 top-N 候选整体打分。
- **C cross-encoder(bge/jina)**:最准,但需 torch。
- **D gte-rerank API**:免 torch,但引第三方模型。
- **E LangChain `LLMListwiseRerank`**:现成件。

## 优劣对比
| 方案 | 优 | 劣 |
|---|---|---|
| A pointwise | 校准最细、逻辑透明 | **~20 次/题串行,~30s**,主瓶颈 |
| **B listwise** | **20 次→1 次(~20x)**、同 GLM、可控可测 | 校准可能略糙、需解析健壮性 + 退化兜底 |
| C cross-encoder | 最准 | 需 torch,违背"全 GLM/免 torch" |
| D gte-rerank | 免 torch | 引第三方模型,非"全 GLM" |
| E LLMListwiseRerank | 少代码 | 强依赖 `with_structured_output` → 须装 langchain-openai + 端点稳定支持 function-calling(未证实) |

## 结论(选了哪个)
先 **A(M2 做"对")→ 有评测后切 B(M4 提速)**:自实现 listwise,一次调用给 RRF top-N 打分(`rerank_candidates=10`),关思考 + temp=0。失败降级 = 退化 RRF 序 + 及格分(不静默全判不接地)。eval 验证:faithfulness 不掉(→1.0)、检索 ~30s→~8s。

## 为什么不选替代
- **不选 C/D**:用户明确"全用 GLM";cross-encoder 需 torch(环境成本 + 违背意愿),gte-rerank 引第三方模型。同模型重排延迟略高但架构统一。
- **不选 E LangChain 件**:R5 源码实测它强依赖 `llm.with_structured_output`,必须装 langchain-openai 把 GLM 包成 ChatOpenAI,且端点须稳定支持 function-calling/JSON-schema(GLM MaaS 未证实)。自实现复用现有裸 openai 封装(已有关思考/重试),透明可测可缓存,不吃这层不确定性。
- **不用 pointwise 长期**:提速须先有评测背书(先做对再提速),M2 用 pointwise 保校准,M4 用评测证明"分不掉"后切 listwise。

## 回溯条件(什么情况下该重估)
listwise 校准明显拖低精确率(eval hit@k/MRR 下降)→ 调 `rerank_candidates` 或回退 pointwise;或环境允许且愿引专用 reranker。

## 证据链接
- `docs/collab/性能与调用优化.md`(瓶颈定位 + listwise/top-N 取舍 + 验证闭环)
- `docs/collab/research/R5-检索API.md` §4(LLMListwiseRerank 约束 + 自实现建议)
- notes 2026-07-13(listwise 落地、eval 三版对比、降级兜底)
</content>
