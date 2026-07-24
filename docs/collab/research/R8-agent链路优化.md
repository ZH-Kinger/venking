# R8 · Agent 架构 / 链路优化分析（只读现状盘点 + 可落地方案）

> 研究员产出，纯只读分析，不改任何源码。证据标 `file:line`。
> 结论可信度：【实测】=跑过/ADR 有实测数据 · 【代码】=源码逻辑推定 · 【推测】=未证实的估计。
> 分析对象：`rag-server/src/blog_rag/` graph/graders/retriever/rag_chain/llm/web/memory/state/guardrails/general/api/config。

---

## 0. 关键事实基线（config 默认值，决定放大系数）

来源 `config.py`：

| 参数 | 值 | 位置 | 影响 |
|---|---|---|---|
| `max_retries` | **1** | config.py:84 | transform_query 回环**最多 1 次** |
| `recursion_limit` | 15 | config.py:85 | 图级熔断（远大于业务上限） |
| `rag_fusion_enabled` | **False** | config.py:80 | 默认单查询检索；deep 才开 |
| `rag_fusion_n_queries` | 3 | config.py:81 | 开 fusion 时衍生查询数 |
| `fetch_k` / `rerank_candidates` / `top_k` | 20 / 10 / 4 | config.py:71-73 | 宽召回 20，重排只看 top 10 |
| `grounding_min_rerank` | 5 | config.py:75 | 接地阈值（0~10） |
| `web_search_enabled` | True | config.py:99 | 不接地自动联网兜底 |
| `web_provider` | duckduckgo | config.py:100 | 免 key，`_ddg` timeout=5s（web.py:19） |

判断类调用**已全部关思考**（ADR-0011 已落地）：route classify_route (graders.py:70)、llm_rerank (retriever.py:136)、generate_query_variants (retriever.py:170)、contextualize_question (memory.py:69)、grade_web (graders.py:156) 均带 `extra_body={"enable_thinking": False}` + temp=0。**只有生成节点保留思考**（run_chat → create_completion 不传 enable_thinking，llm.py:142）。→ 这块无低垂果实，别再提"关思考提速"。

---

## 1. 调用测绘（每节点逐一列出）

网络往返分三类：**LLM**（GLM MaaS）、**Embedding**（百炼 text-embedding-v4，远程 HTTP，ingest.py:16/28）、**Web**（联网 provider）。Chroma 是本地磁盘（ingest.py:34），BM25 是内存索引（retriever.py:96），**不计网络**。

### 1A. RAG 路径 · 顺利接地（首轮、无历史、fusion 关）—— 最常见

| # | 节点 | LLM | Embed | Web | 说明 / 证据 |
|---|---|---|---|---|---|
| 1 | route_question | **1** | - | - | prefilter 未命中技术问题→classify_route (graders.py:87-90, 66) |
| 2 | contextualize_query | 0 | - | - | 首轮无历史→直接返回原问题，**零调用** (memory.py:62, graph.py:66) |
| 3 | retrieve | **1** | **1** | - | dense_search 1 次 embed (retriever.py:69) + BM25(免) + rrf(纯) + llm_rerank **1 次** listwise (retriever.py:132) |
| 4 | grade_documents | 0 | - | - | **不调 LLM**，复用 rerank_score 过滤 (graders.py:99-108) |
| 5 | grounding_gate | 0 | - | - | 纯函数读 state (graders.py:112) |
| 6 | grounded_generate | **1** | - | - | 生成，**开思考**、流式 (graph.py:114) |
| 7 | guardrails | 0 | - | - | 正则/结构查 (guardrails.py) |
| 8 | record_turn | 0 | - | - | 纯追加 messages (graph.py:152) |

**合计：LLM ×3（route + rerank + 生成），Embed ×1，Web ×0。** 网络往返共 4 次。
串行必经：route → retrieve(embed→rerank) → generate 强依赖，无法并行（后者输入依赖前者）。

### 1B. RAG 路径 · 回环 + 联网兜底（最坏现实路径）

route(1 LLM) → retrieve(1 emb + 1 rerank) → grade_documents(0) → gate=rewrite → **transform_query(1 LLM)** (graph.py:90 generate_query_variants) → retrieve **再来一遍**(1 emb + 1 rerank) → grade_documents(0) → gate=web（loop_step=1 已达上限，graders.py:125）→ web_search(**1 Web**) → **grade_web(1 LLM)** (graders.py:152) → web_generate(**1 LLM**生成) → guardrails → record_turn。

**合计：LLM ×6（route, rerank, transform, rerank, grade_web, web_generate），Embed ×2，Web ×1。**

### 1C. Web 路径 · 用户强制联网（`web=true`）

关键发现 —— **仍白跑一次完整检索 + 重排**：route_question 见 web_mode 直接返回 `route=rag` **不调 LLM**(graders.py:85-86)，于是走 contextualize→retrieve→grade_documents→gate；gate 第一句 `if web_mode: return "web"`(graders.py:121) 才拐去联网。**但此时 retrieve_node 的 embedding + llm_rerank 已经执行完并被丢弃。**

| # | 节点 | LLM | Embed | Web | 说明 |
|---|---|---|---|---|---|
| 1 | route_question | 0 | - | - | web_mode 短路，不调 LLM (graders.py:85) |
| 2 | contextualize_query | 0 | - | - | 首轮无历史 |
| 3 | retrieve | **1** | **1** | - | ⚠️ **纯浪费**：结果被 gate 丢弃 |
| 4 | grade_documents | 0 | - | - | ⚠️ 一并浪费 |
| 5 | grounding_gate | 0 | - | - | web_mode→web |
| 6 | web_search | - | - | **1** | web.py:53 |
| 7 | grade_web | **1** | - | - | graders.py:152 |
| 8 | web_generate | **1** | - | - | 生成 |

**合计：LLM ×3，Embed ×1（全浪费），Web ×1。** 其中 rerank LLM + embedding 是无效开销。

### 1D. general 路径（闲聊 / 写代码）

route_question(命中 prefilter→0 LLM，或 classify_route→1 LLM) → general_generate(**1 LLM**生成，含 recent_history) → record_turn。**合计 LLM ×1~2，无 Embed，无 Web。** 这是最省的快路径（跳检索，ADR-0013）。

### 1E. 修饰项（叠加在上表之上）

- **多轮对话**：contextualize_query 有历史时 +1 LLM（memory.py:64 追问改写）。
- **deep_thinking / fusion 开**：retrieve 变成 rag_fusion_search（retriever.py:189）→ generate_query_variants(**1 LLM**) + **N=3 路 hybrid_search 串行**（retriever.py:191，**3 次 embedding**）+ rrf + rerank(1 LLM)。即单次 retrieve = 2 LLM + 3 embed。若又碰上回环，transform_query 再调 1 次 variants，检索再翻倍。

---

## 2. 延迟来源排序

【实测/ADR】各环节量级：
- **生成节点（grounded/web/general_generate）= 最慢**：唯一**开思考**的调用（llm.py:142），流式，数秒~十几秒级。这是首 token 前 + 全文的主时延。
- **llm_rerank**：单次 listwise，但输入大（10 候选 ×800 字，retriever.py:129）。ADR-0006【实测】检索整体 pointwise 30s → listwise **~8s**，rerank 仍是检索内最重的一步（几秒级）。
- **route / grade_web / variants / contextualize**：关思考后【实测 ADR-0011】各 **~1s**。
- **web_search**：`_ddg` timeout=5s（web.py:19），失败退避 `1.5×(attempt+1)` 睡眠 + retries=2（web.py:61-67）。**最坏 ≈ 5+1.5+5+3+5 ≈ 19.5s** 卡在联网上。
- **embedding**：单查询 1 次远程，亚秒级；fusion 时 3 次**串行**叠加。
- **guardrails / grade_documents / gate / record_turn / instrument_node**：本地纯计算，可忽略（observability.py 仅计时包装）。

**transform_query 回环放大**：`max_retries=1`(config.py:84) → 回环**最多 1 次**（graders.py:125 `loop_step < max_retries`，回环后 loop_step 累加为 1 即不再 < 1）。一次回环放大 = +transform_query(1 LLM ~1s) + 再检索(1 emb + 1 rerank ~几秒)。图级 recursion_limit=15 只是兜底，业务上限由 max_retries 卡死，**不会真跑 15 圈**。

**最坏路径端到端**（1B 回环+联网+联网慢）【推测】：route ~1s + 检索 ~8s + transform ~1s + 检索 ~8s + web ~5-19s + grade_web ~1s + web_generate（开思考）~8s ≈ **32~50s**。

---

## 3. 冗余 / 可优化点（逐条带证据）

1. **【代码，确定】web_mode 白跑检索+重排**（graph.py 布线 + graders.py:85/121）：1C 已测，强制联网时 embedding + llm_rerank 纯浪费（约 1 emb + 1 LLM + 几秒延迟）。gate 明知要走 web，检索却已发生。**修复点**：web_mode 时应在路由层直接进 web_search，不经 contextualize/retrieve/grade_documents。

2. **【代码】查询改写有三处独立 LLM 往返，语义重叠**：
   - contextualize_question（追问补全，memory.py:58）
   - generate_query_variants（RAG-Fusion 多变体，retriever.py:162）
   - transform_query 回环里又调 generate_query_variants（graph.py:90）
   多轮 + fusion + 回环叠满时可达 3~4 次"改写类"LLM。三者都是 temp=0 判断类，**contextualize + variants 可合并成一次**（一次调用同时产出"独立化 + 变体"）。

3. **【代码，已优化】grade_documents 不是 LLM 判官**（graders.py:99-108，复用 rerank_score）。用户需求里担心的"多次判官打分"其实只有 **grade_web 一处**真调 LLM（graders.py:152）。grade_documents 甚至与 retrieve_node 已算好的 `best_score`(graph.py:76) 冗余——gate 判 `graded_documents` 非空 ≡ `best_score >= 阈值`，可省一个节点跳（价值低，本就免费）。

4. **【代码，已优化】关思考**：ADR-0011 已全量落地（见 §0），**无剩余空间**。

5. **【代码，缺失】零缓存**：全链路无任何缓存。以下都是 **temp=0 确定性**、可安全加缓存：
   - **query embedding**（同查询→同向量，dense_search retriever.py:69）
   - **route 分类**（同问题→同 route，classify_route graders.py:66）
   - **检索/重排结果**（同 query→同 doc_ids/分数）
   - **contextualize / variants 改写**（temp=0）
   重复问、相似问、评测重跑现在都全额付费。LRU/磁盘 KV 即可，命中即省整条 route+检索链。

6. **【代码】fusion 的 N 路检索串行**（retriever.py:191 列表推导）：3 个变体的 dense embedding 串行等待，可并行（`asyncio`/线程池），fusion 场景省 ~2×embedding 延迟。hybrid_search 内 dense+sparse 也串行（retriever.py:109），但 sparse 是本地 BM25、收益小。

7. **【代码】web_search 慢且串行**（web.py:61-67）：ddg 失败退避睡眠最坏 ~19s 阻塞主链路。可缩短 timeout/减少 retries，或在 grade_documents 判"大概率不接地"时**预取**联网（投机）。

---

## 4. 架构层面

- **路由（确定性预筛 + LLM）合理**【ADR-0013】：prefilter 只拦无歧义非技术（graders.py:47-60），拿不准交 LLM，误判有接地闸门第二道兜底。设计稳。可加的只是**正向缓存**（问题→route）省重复 LLM，机制上无需改动骨架。

- **记忆层对链路的影响**【ADR-0010】：短时 SqliteSaver 已落（memory.py:32，checkpoint_db config.py:172）。代价 = **每个多轮请求多 1 次 contextualize LLM**（memory.py:64）。长期 Store **未做** → 无跨会话偏好/纠正记忆，用户重复问同类问题无个性化、也无"记住上次纠错"。对**延迟**影响中性（不做就不加调用）；对**质量/复用**是缺口。注意 recent_history 固定取 k=6 条（memory.py:46），长对话不会无限膨胀 prompt——这点已受控。

- **api.py 无鉴权 = 真实安全+成本敞口**【代码，确定】：`/api/chat`（api.py:42）完全公开，无 token、无 per-IP 限流、无并发上限。每次请求最多烧 route+rerank+生成(+回环+联网+grade_web) 共 3~6 次 GLM 调用。config 里的 `ui_auth_user/pass`(config.py:111) 是 **Gradio 遗留**，**根本没接进 FastAPI**——形同虚设。`q` 仅限长 4000（api.py:44），无防刷。公网部署下这是**白嫖 GLM key / 拖垮配额**的直接入口。ADR-0009/0017（网关/部署形态）应覆盖，但代码层当前裸奔。

---

## 5. 优化方案（按 ROI 排序）

### 低风险快赢（改动小、收益确定、无质量回归）

| # | 改什么 | 收益 | 风险 | 改动量 |
|---|---|---|---|---|
| **快赢1** | **web_mode 短路检索**：route_question 或新增一个 gate 前置，`web_mode` 时直接进 web_search，跳过 contextualize/retrieve/grade_documents（graph.py 布线 + graders.py:85/121） | 强制联网时 **省 1 embed + 1 rerank LLM + 数秒**（1C 全部浪费消除） | 极低（web_mode 本就丢弃检索结果） | 小（改 1 条边/1 个分支） |
| **快赢2** | **API 加最小鉴权 + 限流**：`/api/chat` 加 header token（config 已有 key 概念）+ 每 IP 令牌桶/并发上限 | 堵住白嫖，**成本/配额直接可控** | 低（前端同步带 token） | 小（FastAPI 依赖注入 + 中间件） |
| **快赢3** | **加确定性缓存**：query-embedding + route 分类 + 检索/重排结果，LRU（进程内）或 sqlite（跨重启） | 重复/相似问、评测重跑 **省整条 route+检索链**（命中时延近 0） | 低（temp=0 天然确定，需带 index_version 失效键 config.py:177） | 小~中（在 dense_search/classify_route/retrieve 包一层 cache） |

### 需要设计的中改

| # | 改什么 | 收益 | 风险 | 改动量 |
|---|---|---|---|---|
| 中1 | **合并 contextualize + 变体生成**：多轮场景一次 LLM 同时"独立化 + 出 N 变体"，去掉一次往返（memory.py + retriever.py） | 多轮+fusion 场景 **省 1 LLM ~1s** | 中（prompt 设计 + 契约变化，需 eval 护住检索质量） | 中 |
| 中2 | **fusion N 路检索并行**（retriever.py:191）+ hybrid 内 dense/sparse 并行 | deep 模式 **embedding 延迟 3×→~1×** | 中（并发/线程安全，BM25 单例只读 retriever.py:96 已注释防污染） | 中 |
| 中3 | **web_search 提速**：缩短 ddg timeout/减 retries，或不接地时**投机预取**联网（与 rerank 并行） | 联网兜底最坏 19s → 个位数；投机命中省串行等待 | 中（投机会多打无用请求，需按 best_score 门控） | 中 |

### 需要设计的大改

| # | 改什么 | 收益 | 风险 | 改动量 |
|---|---|---|---|---|
| 大1 | **长期记忆 Store 层**（ADR-0010 未做部分）：跨会话偏好 + 反馈纠正回流 few-shot | 质量/个性化提升，非延迟 | 高（实体抽取/矛盾消解自写，须与 Chroma 分 namespace 防污染检索） | 大 |
| 大2 | **生成节点按需关思考**：short/简单问答走关思考快路径 | 生成时延显著↓（当前唯一开思考项） | **高**（可能掉答案质量，须 eval 严格背书，与 ADR-0011"生成保留思考"相悖，需回溯该 ADR） | 中 |
| 大3 | **rerank 提速/降配**：rerank_candidates 10→动态、或按 dense 分数提前接地跳过 rerank | 顺利接地路径省 rerank LLM 数秒 | 高（rerank 是精准主力，ADR-0006，掉 hit@k/MRR 风险） | 中 |

---

## 附：一次典型提问调用数速查

| 场景 | LLM | Embedding | Web |
|---|---|---|---|
| RAG 顺利接地（首轮） | 3 | 1 | 0 |
| RAG 顺利接地（多轮） | 4 | 1 | 0 |
| RAG 回环+联网兜底（最坏） | 6 | 2 | 1 |
| Web 强制（现状，含浪费） | 3 | 1(浪费) | 1 |
| Web 强制（快赢1 修复后） | 2 | 0 | 1 |
| general 快路径 | 1~2 | 0 | 0 |
| deep/fusion 叠加单次 retrieve | +1 LLM | +2 embed | 0 |
