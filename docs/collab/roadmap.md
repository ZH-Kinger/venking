# 路线图(活文档)

> 本文件随进度更新,与任务板 / `notes.md` 对齐。状态图例:✅ 完成 · 🔄 进行 · ⏳ 待办 · 🚧 阻塞。
> 状态据 notes(M0–M4 过闸门记录)+ plan 判定。

| 模块 | 状态 | 一句话交付 | DoD |
|---|---|---|---|
| **M0 环境/配置** | ✅ | src-layout 包 + pyproject + `pip install -e .`;config 重构为 pydantic-settings(30+ 旋钮全 env 驱动) | smoke 通(GLM-5.2 流式,分离 reasoning/content);导入验证通过;`.env` 被 gitignore |
| **M1 异构入库** | ✅ | 投放管道(inbox→converters→发布区)+ md loader + ingest;205 篇 → 2790 chunk 入 Chroma,幂等验证 | 入库块数正确;重跑幂等(num_skipped=全量);多格式 loader 按 type 分发 |
| **M2 检索质量** | ✅ | retriever(hybrid + RRF + 重排 + RAG-Fusion + 查询变体)+ rag_chain(双模式接地闸门 + 引用 + 预算) | 混合前后对比通过;单跳带 `[S#]` 引用不臆造;库外正确弃答;tester 90/0 + auditor 过闸 |
| **M3 评测** | ✅ | 自实现 metrics(GLM 判官 + 纯算 hit@k/mrr)+ golden.jsonl(10 题四档)+ run_eval | 基线出报告(hit@k 1.0 / faithfulness 0.9 / mode 8/10);缺口被量化;CSV 归档 |
| **M4 联网 + 提速** | ✅ | web.py(三 provider 联网 + CRAG 兜底)+ rag_chain web 分支(`[W#]`+URL);重排 pointwise→listwise(~4x) | eval faithfulness→1.0;检索 ~30s→~8s;tester 109/0 + auditor 过闸 |
| **M5 Agentic 核心 + 护栏** | ✅ | 单跳链照 Claude 架构翻译成 LangGraph 图(节点/条件边/迭代循环/双模式路由 + refuse mode)+ CRAG 证据打分 + 路由确定性预筛 | 已达:tester 188/0 + auditor 可提交;A/B eval mode 9/10(残留 GB200 属免费 DDG 限流,配 key 可稳),faithfulness 0.967/hit@k 1.0/context_recall 1.0 未掉 |
| **M6 对话 UI + 反馈** | ✅ | FastAPI + SSE + 自定义深色前端:流式、多会话、Mermaid 自动修复、代码块复制、回答长度、联网/深度开关、👍👎纠正回流 | 生产前端已上线 `/ai/`;加载/错误/引用状态齐全。真正语法着色与“重新生成”留产品 backlog |
| **M7 生产化** | ✅ | Docker/compose + Nginx 统一入口;容器仅绑定 `127.0.0.1:7860`;healthcheck/自动重启;SDK 超时重试 + 可选备用 provider | 线上 `/ai/health` 200、容器 healthy/0 restart;M7/M8 生产路径 228 测试全绿。备用 provider 代码已就绪,待用户提供配置 |
| **M8 记忆三层** | 🔄 | **短时层 ✅**:SqliteSaver 持久 thread + 最近历史生成 + 追问独立查询改写;**黑板层 ✅**:State reducer;**长期层 ⏳**:用户画像 Store | SQLite 关闭重开仍保留并追加同 thread 消息的集成测试已通过;长期 Store 需先确定用户身份/namespace |
| **M9 微调(可选)** | ⏳ | 纯学习性,不在关键路径:embedding/reranker 微调 或 LoRA+DPO 走通 RLHF-lite | 触发条件:prompt/检索/评测榨干 + 数千高质量样本 + 明确行为缺口(三者不齐→不做) |
| **M10 登录与管理后台** | ⏳ | `/login/` + `/admin/`;管理员认证、文章草稿/发布、用户/会话/反馈/审计管理 | 计划见 [`planning/admin-auth-cms-plan.md`](planning/admin-auth-cms-plan.md);HTTPS 是生产开放硬闸门 |

## 当前焦点

**M5 已收口**(2026-07-14)。用户反馈驱动的结构化重构 + 原则性冗余全部落地:
- 用**多道防线**替掉关键词 hack:rerank 粗筛 → `grade_documents`/`grade_web`(CRAG 证据打分,生成前把关)→ guardrails(输出后兜底、只看开头防误伤)。路由加**确定性预筛 + LLM**。
- 结构化文档:architecture.md + roadmap.md + `decisions/` 15 条 ADR。
- 闸门:tester 188/0、auditor 可提交;eval mode 9/10(残留 GB200 = 免费 DDG 限流,非逻辑 bug)。
- 收尾抓到并修复两个真问题:A/B 开关 `RAG_USE_GRAPH` 未映射(评测静默跑基线)、grade_documents 砍生成上下文致假弃答。

**M6-M7 已上线**(2026-07-24):生产路径改为 FastAPI + SSE + 自定义前端,Nginx 统一暴露 `/ai/`、`/api/`、`/vendor/`;Docker 端口只绑回环。Mermaid、回答长度、纠正反馈、来源、加载/错误状态均已完成。

**当前焦点:M8**。短时 SQLite checkpointer、最近历史注入、末尾统一记录和追问查询改写已完成;生产路径 **228 passed** + Ruff 全绿。下一步是长期 Store,但必须先确定匿名浏览器 ID / 登录用户 ID 的身份边界,否则跨会话画像会串用户。
</content>
