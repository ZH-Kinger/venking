# blog-rag

> **活文档:随开发进度维护。** 每模块完成后更新对应章节与状态。当前反映 **M0–M7**(M6 对话前端已完成、M7 韧性 + 部署已上线;M7 的置信阈值路由 / CoVe 验证为选做,尚未实现)。

生产级、极致精准的 **Agentic RAG 对话 agent**,语料是技术博客 **ZH-Kinger**:`src/posts/` 下的博客 md,含由 `AI INFRA SRE.lakebook`(语雀导出)转出的 `AI_Infra` 分区。

核心哲学:**宁可有据、宁可弃答,绝不臆造**。答案必须由检索到的来源支撑并引用;兜底阶梯为 **本地检索 → 联网(带出处)→ 通用回答 → 弃答**。

线上地址:<https://venking.tech/ai/>。容器端口 `7860` 仅绑定服务器回环地址,不直接暴露公网。

---

## 快速开始

需 Python ≥ 3.11(开发用 3.13)。以下命令在 **仓库根目录**(`ZH-Kinger/`)执行。

```bash
# 1. 建虚拟环境
python -m venv rag-server/.venv

# 2. 可编辑安装 + 运行时 extras(检索 + 图 + 联网 + 入库 + API)
rag-server/.venv/Scripts/python.exe -m pip install -e "rag-server[rag,agent,web,ingest,api]"

# 3. 配置:复制 .env.example 为 .env,填 DASHSCOPE_API_KEY
cp rag-server/.env.example rag-server/.env
```

extra 按需装:`[rag]`(检索)、`[agent]`(LangGraph 图)、`[web]`(联网)、`[api]`(FastAPI + SSE)、`[ingest]`(入库)、`[pdf]`(docling,仅 PDF 入库,重 ~2-3GB)、`[eval]`(评测)、`[dev]`(测试/lint)。旧 `[ui]`(Gradio)已被 API + 自定义前端取代,保留备用。

### 启动服务(Web 前端)

```bash
rag-server/.venv/Scripts/python.exe -m uvicorn blog_rag.api:app --host 127.0.0.1 --port 7860
```

浏览器打开 `http://127.0.0.1:7860`,即得自定义 Gemini 风格对话界面。

### 提问(CLI)

```bash
# 装了 console script 后
blog-rag "NCCL 的 all-reduce 是怎么工作的?"

# 或模块入口;--reasoning 打印模型思考过程
rag-server/.venv/Scripts/python.exe -m blog_rag.cli --reasoning "什么是 PagedAttention?"
```

默认走 M2 单跳链。设 `RAG_USE_GRAPH=1` 走 M5 LangGraph 图(路由 + 打分 + 护栏)。Web 前端始终走图。

### 连通性 smoke

```bash
rag-server/.venv/Scripts/python.exe -m blog_rag.llm
```

看到 `[smoke] ✅ 打通` 即环境就绪。

---

## 能力清单

- **异构入库**(M1):投放 `data/inbox/<分类>/` → `converters.py` 按扩展名分派 handler(lakebook / pdf / md / 图)转发布区 MD → md loader 标题感知分块 → embedding 入 Chroma。`sources.toml` 登记、Indexing API + `SQLRecordManager` 幂等增删改同步。
- **混合检索**(M2):dense + BM25(jieba)+ 自实现 RRF 融合 → GLM-5.2 listwise 重排 → top_k;可选 RAG-Fusion 多查询融合。双模式接地闸门 + `[S#]` 引用 + token 预算。
- **评测 + 可观测**(M3):自实现 metrics(GLM 判官 faithfulness/answer_relevancy/context_recall + 纯算 hit@k/mrr)+ `golden.jsonl` + `run_eval`;👍👎 反馈落盘 `feedback.jsonl`(字段对齐 golden,可回流评测集)。
- **联网兜底**(M4):`web.py` 三 provider(duckduckgo / tavily / bocha)+ CRAG 兜底(`[W#]` + URL);重排 pointwise→listwise(~4x)。
- **Agentic 图**(M5,LangGraph):`route_question` 双模式路由(rag / general);CRAG 证据打分(`grade_documents` 细筛检索、`grade_web` 生成前拦垃圾联网);`grounding_gate` 接地闸门 + `guardrails` 后置护栏;ReAct 迭代循环(`transform_query` 回环,`loop_step` 有界 + `recursion_limit` 熔断);`SqliteSaver` 按 `thread_id` 持久短时记忆。四种结局:**grounded / web / general / refuse**。
- **Web 后端 + 前端**(M6):`blog_rag.api:app`(FastAPI + SSE 流式)+ 自定义 Gemini 风格前端(`src/blog_rag/static/index.html`)。前端零 CDN 依赖:多会话侧边栏、代码高亮 + 复制、👍👎 反馈闭环、Mermaid 自托管渲染 + 自动修复、回答长度(简短 / 标准 / 详细)、深度思考 / 联网开关、全套细线 SVG 图标。取代旧 Gradio `app.py`(保留备用)。
- **韧性**(M7):`get_client()` 带 `timeout`(60s)+ `max_retries`(2,SDK 内置指数退避,仅对连接 / 超时 / 429 / 5xx);`reliability.py` 的 `create_completion` 提供备用 provider 降级(主端点重试耗尽 → 切 fallback 兜一次)。
- **多轮记忆**(M8):SQLite checkpoint 跨重启保留 thread;生成读取最近历史;RAG 检索前把「它呢 / 这个怎么排查」补成独立查询,失败安全回退原问题。长期用户画像 Store 尚未启用。

---

## 模块进度

状态图例:✅ 完成 · 🔄 进行 · ⏳ 计划中。以 [`docs/collab/roadmap.md`](../docs/collab/roadmap.md) 为权威。

| 模块 | 内容 | 状态 |
|---|---|---|
| **M0** | 环境 / 配置 / LLM 连通:src-layout 包 + pydantic-settings 单一事实源 + GLM-5.2 流式 smoke | ✅ |
| **M1** | 异构入库:投放管道 + md/pdf/lakebook loader → Chroma;`sources.toml` 登记 + Indexing API 幂等 | ✅ |
| **M2** | 检索质量:dense + BM25 + RRF 混合 → GLM-5.2 listwise 重排 + RAG-Fusion;单跳双模式接地闸门 + `[S#]` 引用 + CLI | ✅ |
| **M3** | 评测:自实现 metrics(GLM 判官 + hit@k/mrr)+ `golden.jsonl` + `run_eval`;👍👎 反馈落盘 | ✅ |
| **M4** | 联网 + 提速:`web.py` 三 provider + CRAG 兜底(`[W#]`+URL);重排 listwise(~4x) | ✅ |
| **M5** | Agentic 图(LangGraph):双模式路由 + CRAG 证据打分 + 接地/护栏 + ReAct 循环 + 短时记忆;四结局 grounded/web/general/refuse | ✅ |
| **M6** | Web 对话前端:FastAPI + SSE 后端 + 自定义 Gemini 风格前端(流式 / 多会话 / 代码高亮 / Mermaid / 反馈闭环 / 回答长度) | ✅ |
| **M7** | 韧性:超时 + SDK 退避重试 + 备用 provider 降级;Docker + compose 公网部署 | ✅ |
| M7+ | 置信阈值路由 / CoVe 验证(选做) | ⏳ 计划中,未实现 |
| M8 | 多轮记忆:SqliteSaver + 最近历史 + 追问查询改写 + 黑板 State;长期 Store 待身份方案 | 🔄 进行中 |
| M9 | 微调(可选,不在关键路径) | ⏳ 计划中 |

---

## 架构总览

```
              源文档(唯一事实源)
     博客 md(含 AI_Infra,由 lakebook 转出)
                     │
        投放 data/inbox/<分类>/ → converters 按扩展名分派 handler
                     │            (lakebook / pdf / md / 图)
        发布区 src/posts/<分类>/ → loaders 标题感知分块 + 确定性 chunk_id
                     │
        ingest:text-embedding-v4 向量化 → Chroma
                     │            Indexing API + RecordManager 幂等
                     ▼
     ┌──────── route_question(预筛 + LLM 路由)────────┐
     │                                                  │
   rag 分支(博客问题)                        general 分支(代码/画图/闲聊)
     │                                                  │
  混合检索 dense+BM25+RRF → listwise 重排          不接地、不带引用
     │                                           产 suggestions
  grade_documents(CRAG 证据打分)                       │
     │                                                  │
  grounding_gate:有据→grounded / 回环改写 /            │
     │            联网 / 弃答                           │
  grounded_generate(带 [S#])                           │
     │  ── 或 ── web_search → grade_web → web_generate │
     │            ([W#]+URL) / refuse                  │
     └──────────────┬───────────────────────────────────┘
                    ▼
          guardrails:引用三查 + 逐条 faithfulness(temp=0)→ 归一 refuse
                    ▼
   HTTP:FastAPI /api/chat(SSE 逐 token)+ 静态前端 index.html
```

**精准哲学**:精准 > 速度。路由决定"适用哪套契约"——rag 路径带引用并过护栏,general 路径明确不接地、不带引用。CRAG 三道防线替掉脆弱的关键词 hack:rerank 分(粗筛)→ `grade_documents` / `grade_web` 语义打分(细筛)→ guardrails(输出后兜底);关键词归一降为最后兜底且只看开头,防误伤正文。

---

## 技术栈

| 组件 | 选型 | 作用 |
|---|---|---|
| LLM / 重排 / 视觉 | **GLM-5.2**(MaaS OpenAI 兼容端点) | 对话生成(流式,含推理)、路由 / 打分、listwise 重排 |
| Embedding | **text-embedding-v4**(百炼,1024 维锁定) | 文本向量化(batch ≤ 10) |
| 向量库 | **Chroma** | 持久化向量存储与检索 |
| Agent 编排 | **LangGraph**(1.x) | 双模式路由、检索/打分/生成状态图、有界重试、`InMemorySaver` |
| 混合检索 | `rank-bm25` + `jieba` + 自实现 RRF | dense + 稀疏融合,共享给 RAG-Fusion |
| 联网 | ddgs(免 key)/ Tavily / 博查 | CRAG 兜底,带出处 |
| 评测 | 自实现 metrics(GLM 判官) | faithfulness / answer_relevancy / context_recall + hit@k / mrr |
| Web 后端 | **FastAPI + uvicorn**,SSE 流式 | `blog_rag.api:app`,复用 `graph.stream_answer` |
| 前端 | 单页 HTML/CSS/JS,零 CDN | 自托管 mermaid;多会话 / 高亮 / 反馈 |
| 部署 | **Docker + docker-compose** | 轻量镜像(不含 torch),挂载卷持久化 |

> 评测未用 RAGAS:0.4 硬 import 了 community 已删的 vertexai 路径,与本栈 langchain 1.x 不兼容,改自实现。

---

## 配置

所有参数通过 `rag-server/.env` 覆盖,**`src/blog_rag/config.py` 是唯一读 env 的地方并做类型校验**(单一事实源)。字段名大小写不敏感,`.env` 里用大写(如 `TOP_K`)。`.env` 不进 git;key 只写本地 `.env`,仓库与文档不出现真实 key。

| 旋钮 (`.env`) | 默认值 | 含义 |
|---|---|---|
| `DASHSCOPE_API_KEY` | (必填) | GLM MaaS / 百炼鉴权 key(一个 key 同通两端点) |
| `TEMPERATURE` | `0.0` | 打分器 / 路由 / 校验确定性 |
| `EMBEDDING_DIM` | `1024` | 向量维度,锁定;改动须重建库 |
| `EMBEDDING_BATCH` | `10` | 百炼 embedding 批量上限 |
| `CHUNK_SIZE` / `CHUNK_OVERLAP` | `500` / `80` | 分块大小 / 重叠 |
| `TOP_K` | `4` | 最终喂 LLM 的条数 |
| `FETCH_K` | `20` | 重排前的宽召回条数 |
| `RERANK_TOP_N` | `4` | 重排后保留条数 |
| `RERANK_CANDIDATES` | `10` | listwise 重排只喂 RRF top-N 候选(1 次调用打全部分) |
| `SCORE_THRESHOLD` | `0.3` | 稠密相关性阈值(Chroma 分数待归一化,软兜底) |
| `GROUNDING_MIN_RERANK` | `5` | 接地闸门:最佳重排分(0~10)低于此→不接地 |
| `MAX_CONTEXT_TOKENS` | `8000` | 上下文 token 预算,超了砍低分块 |
| `RRF_K` | `60` | RRF 融合平滑常量(混合检索 & RAG-Fusion 共用) |
| `RAG_FUSION_ENABLED` | `False` | 多查询融合;默认关,由路由 / 用户 flag 触发 |
| `RAG_FUSION_N_QUERIES` | `3` | RAG-Fusion 衍生子问题数 |
| `MAX_RETRIES` | `1` | agent 回环重试上限(防死循环) |
| `RECURSION_LIMIT` | `15` | LangGraph 递归兜底 |
| `RAG_USE_GRAPH` | `False` | A/B 开关:True→走 M5 图;False→M2 单跳链 |
| `LLM_TIMEOUT` | `60.0` | 单次请求超时(秒);超时算可重试错误(M7) |
| `LLM_MAX_RETRIES` | `2` | SDK 内置指数退避重试次数(仅连接/超时/429/5xx;M7) |
| `FALLBACK_BASE_URL` / `FALLBACK_MODEL` / `FALLBACK_API_KEY` | (可选) | 备用 provider:两项都填才启用降级;key 留空复用主 key(M7) |
| `WEB_SEARCH_ENABLED` | `True` | 本地不接地时是否自动联网兜底 |
| `WEB_PROVIDER` | `duckduckgo` | 联网 provider(`duckduckgo`/`tavily`/`bocha`) |
| `WEB_MAX_RESULTS` | `5` | 联网返回条数 |
| `TAVILY_API_KEY` / `BOCHA_API_KEY` | (可选) | 对应 provider 的 key |
| `UI_HOST` / `UI_PORT` | `127.0.0.1` / `7860` | 绑定地址 / 端口。安全默认只绑本机;部署时容器内硬覆盖为 `0.0.0.0` |

> 数值均为**有依据的默认值**,评测(M3)已上线,依指标逐项调优;不在 n=10 上过拟合。模型端点(`LLM_BASE_URL` / `EMBEDDING_BASE_URL` / `VL_MODEL` / `RERANK_MODEL` 等)同样可在 `.env` 覆盖,默认见 `.env.example`。

### 评测最新值(2026-07-14,走图 n=10)

| 指标 | 值 |
|---|---|
| hit@k | 1.0 |
| faithfulness | 0.967 |
| context_recall | 1.0 |
| mode 正确率 | 9 / 10 |

跑评测:`RAG_USE_GRAPH=1 rag-server/.venv/Scripts/python.exe -m blog_rag.eval.run_eval`(必须显式设 `RAG_USE_GRAPH=1`,否则跑成 M2 基线)。产物 `rag-server/data/eval_results.csv`。残留 1 题(GB200)为免费 DDG 限流→`grade_web` 正确判无关→诚实 refuse,属 provider 质量而非逻辑 bug,配 Tavily / 博查 key 可稳。

---

## 部署

Docker + docker-compose,公网统一入口 `https://venking.tech/ai/`。容器 `7860` 仅绑定 `127.0.0.1`,由 Nginx 反向代理。

- **轻量镜像**:`Dockerfile` 基于 `python:3.13-slim`,只装 `[rag,agent,web,ingest,api]`,**故意不含 torch/docling**(运行时全是 API 调用)。构建时 `pip show torch` 验证未被隐式拉入,镜像从 ~2.5G 砍到几百 M。
- **挂载卷持久化**:`./data`(chroma 库 + feedback)与 `.env`(含 key)挂载卷,不打进镜像层——库可独立更新、key 不落镜像。
- **前端热更新**:`./src/blog_rag/static` 卷挂载,`api.py` 用 `FileResponse` 现读磁盘;改前端只需 `scp` 覆盖宿主 static、刷新即生效,**无需 rebuild / 重启**。首页 `no-cache` 保证拿到新版。
- **自托管 vendor**:`/vendor` 静态路由提供 `mermaid.min.js`,前端零 CDN 依赖(国内易被墙)。
- **守护**:`restart: unless-stopped` + healthcheck(python 探 7860 端口)。

```bash
# 一键推送 + 远程 compose up(需 SSH)
rag-server/deploy.sh
```

> 国内注意:DuckDuckGo 联网被墙,要联网兜底须配 `bocha` / `tavily` key。HTTPS + 域名(备案通过后配 DNS + nginx/Caddy 反代)为后续闸门。

---

## 项目结构

src-layout 包,`pip install -e` 可编辑安装。

```
rag-server/
├─ pyproject.toml  .env(本地)  .env.example  README.md  sources.toml
├─ Dockerfile  docker-compose.yml  deploy.sh  .dockerignore
├─ src/blog_rag/
│  ├─ config.py        M0  单一事实源:pydantic-settings,全部旋钮 + 派生路径 + 版本闸
│  ├─ llm.py           M0  GLM-5.2 客户端 + 流式对话(分离推理)+ 关思考开关 + custom token 事件
│  ├─ sources.py       M1  sources.toml 来源登记表 → load_sources(),按 type 分发 loader
│  ├─ loaders.py       M1  md loader(frontmatter→metadata + 标题感知分块)
│  ├─ converters.py    M1  投放管道:按扩展名分派 handler(lakebook/pdf/md/图)转发布区 MD
│  ├─ ingest.py        M1  embedding + Chroma + Indexing API/RecordManager 幂等
│  ├─ retriever.py     M2  dense / BM25+jieba / RRF 纯函数 / listwise 重排 / RAG-Fusion
│  ├─ rag_chain.py     M2  单跳 RAG 链(双模式接地闸门 + 引用 + 预算 + web 兜底)= 基线
│  ├─ cli.py           M2  命令行入口:blog-rag "问题"
│  ├─ web.py           M4  三 provider 联网工厂(ddgs/tavily/bocha)+ 重试降级
│  ├─ state.py         M5  AgentState(TypedDict + reducer,黑板总线)
│  ├─ graders.py       M5  route_question / grounding_gate / grade_documents / grade_web
│  ├─ general.py       M5  通用分支(不接地/不带引用,产 suggestions;代码感知)
│  ├─ guardrails.py    M5  后置 Hook(引用三查 + faithfulness + 弃答确认)
│  ├─ graph.py         M5  StateGraph 组装 + InMemorySaver;answer_graph / stream_answer
│  ├─ api.py           M6  FastAPI + SSE:/api/chat(流式)/api/feedback /health /
│  ├─ static/          M6  自定义前端 index.html + vendor/(自托管 mermaid)
│  ├─ app.py           M6  旧 Gradio 界面(已被 api+前端取代,保留备用)
│  ├─ feedback.py      M3  👍👎(可带纠正)→ feedback.jsonl(对齐 golden)
│  ├─ reliability.py   M7  create_completion:主 provider 超时+退避 → 备用 provider 降级
│  └─ eval/            M3  metrics.py(GLM 判官 + hit@k/mrr)+ run_eval.py + golden.jsonl
├─ tests/                  离线单测(由 tester 维护)
├─ scripts/                投放/转换编排(convert.py 等)
└─ data/                   派生数据(gitignore):inbox/ chroma_db/ manifest / record_manager / feedback 等
```

> 计划中(未落地):`memory.py`(M8 长时 Store);M7 的置信阈值路由 / CoVe 验证。

---

## 知识库管理

**源文档是唯一事实源,向量库是派生物**——任何时候都能从源重建,并能精确定位某文档的全部 chunk。投放约定:把原始源丢进 `data/inbox/<分类>/`,`converters.py` 按扩展名分派 handler 转成发布区 MD,`ingest.py` 向量化入 Chroma。通过确定性 `chunk_id` 做幂等 upsert(LangChain Indexing API + `SQLRecordManager` 管增改删同步);`index_version` 指纹(embedding | 维度 | 分块)变则须全量重建。

去冗余三层:①同源幂等(Indexing API)②跨格式同内容→源治理(一份逻辑内容只登记一个规范源,AI INFRA SRE 认 lakebook、PDF 源禁用)③语义近重复→content_hash。完整规则见 [`docs/collab/知识库存储规范.md`](../docs/collab/知识库存储规范.md)。

---

## 文档地图

协作与设计文档在仓库根的 `docs/collab/`(不随 blog-rag 包发布):

| 文档 | 内容 |
|---|---|
| [`architecture.md`](../docs/collab/architecture.md) | 架构总览 + Claude Code ↔ LangGraph 对照 + 模块↔文件映射 |
| [`roadmap.md`](../docs/collab/roadmap.md) | M0–M9 状态表与 DoD(最权威) |
| [`decisions/`](../docs/collab/decisions/) | 17 条 ADR:选型依据(embedding/向量库/检索/重排/评测/联网/路由/弃答/流式/部署 等) |
| [`部署.md`](../docs/collab/部署.md) | 部署形态、镜像与推送流程 |
| [`知识库存储规范.md`](../docs/collab/知识库存储规范.md) | 存储布局、幂等与去冗余规则 |
| [`性能与调用优化.md`](../docs/collab/性能与调用优化.md) | 重排提速、关思考等调用优化记录 |
