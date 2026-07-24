# R2 — 本机环境探针 + 百炼 Embedding 规格调研

> 作者：researcher ｜ 日期：2026-07-12
> 任务：判断 Python 3.14 能否装 torch/sentence-transformers；查百炼(DashScope) Embedding 规格 + API Key 获取；给"本地 text2vec vs 百炼 API"建议。
> 探测方式：全部只读 / `pip --dry-run`，**未真正安装任何大型包，未修改环境**。

---

## 结论速览（TL;DR）

1. **【实测】原担忧不成立**：Python **3.14.0 上 torch 有官方 cp314 wheel**（torch 2.13.0），`sentence-transformers` / `transformers` / `scikit-learn` 均可解析安装。本地 text2vec 方案**技术上可行**。
2. 但 torch wheel 单包 **122 MB**（不含 CUDA 的 CPU 版；模型权重另算），首次 embedding 会较慢；百炼 API 免费额度足够学习期使用。
3. **【建议】M1 阶段用百炼 `text-embedding-v4`（OpenAI 兼容）起步**，零本地依赖、几分钟跑通；本地 text2vec 作为"离线/省钱"备选，二期再引入。理由见文末。

---

## 1. 本机环境实测（探针）

| 项 | 值 |
|---|---|
| OS | Windows（MINGW64 / Git Bash），`LAPTOP-M6GJSE8A` |
| Python | **3.14.0**（`C:\Users\asus\AppData\Local\Programs\Python\Python314`） |
| pip | 25.3 |
| pip 默认索引 | **阿里云镜像** `https://mirrors.aliyun.com/pypi/simple/`（已配好，国内下载快） |
| 已装 | pillow（另探测期临时装过 pypdf） |

### 1.1 torch 是否支持 Python 3.14 —— **支持**

`pip index versions torch`（走 aliyun 镜像）：
```
torch (2.13.0)
Available versions: 2.13.0, 2.12.1, 2.12.0, 2.11.0, 2.10.0, 2.9.1, 2.9.0
```

`pip install --dry-run torch`（**dry-run，未安装**）解析到的 wheel 文件名，直接坐实 3.14：
```
torch-2.13.0-cp314-cp314-win_amd64.whl (122.1 MB)
Would install networkx-3.6.1 setuptools-83.0.0 torch-2.13.0
```
> `cp314` = CPython 3.14 专用 ABI tag，`win_amd64` = 64 位 Windows。有此 wheel 即证明官方发了 3.14 二进制包，无需源码编译。

**官方 PyPI 交叉验证**（`https://pypi.org/pypi/torch/2.13.0/json`）：
```
requires_python: >=3.10
python tags present: ['cp312', 'cp313', 'cp314']
cp314 win wheels: torch-2.13.0-cp314-cp314t-win_amd64.whl, torch-2.13.0-cp314-cp314-win_amd64.whl
```
- 【实测】官方 PyPI 同样提供 cp314 wheel（标准版 `cp314-cp314` + 自由线程版 `cp314-cp314t`），装普通 `pip install torch` 会取标准版。
- 结论可信度：**【实测】**（本机 dry-run + 官方 PyPI JSON 双证）。

> 注：这是 CPU 版 torch。本机若无 NVIDIA GPU，CPU 版即够跑 text2vec 推理（慢但可用）。

### 1.2 sentence-transformers / transformers / scikit-learn —— **均可用**

```
sentence-transformers → 5.6.0（最新可解析，纯 py3 wheel）
transformers          → 5.13.1
scikit-learn          → 1.9.0（可解析，3.14 有 wheel）
```
`pip install --dry-run --no-deps sentence-transformers` → `Would install sentence-transformers-5.6.0`。
其运行期依赖 torch/transformers/scikit-learn 在 3.14 上均已备齐 → **本地 text2vec 技术栈整体可装**。

> PyTorch 官方对 Python 版本的支持：torch 2.13.0 元数据声明 `Requires-Python >=3.10`，且已随发布提供 cp314 wheel，说明 **3.14 在支持范围内**。出处：[PyPI torch 2.13.0](https://pypi.org/pypi/torch/2.13.0/)。

### 1.3 探测副作用说明
- 仅 `--dry-run` / 查询，**未执行任何真实安装**，全局环境未被污染。
- dry-run 为解析依赖，向 pip 缓存下载了 torch wheel（~122MB，位于 pip cache，**非安装**）。如需回收：`pip cache remove torch`（交由 dev 决定，我未动）。

---

## 2. 百炼 (DashScope) Embedding API 规格【文档】

主源：阿里云帮助中心《通用文本向量同步接口 API 详情》
`https://help.aliyun.com/zh/model-studio/text-embedding-synchronous-api`（本机 curl 抓取正文核实）

### 2.1 模型对照表（官方原文数据）

| 模型 | 向量维度 | 最大行数(batch) | 单行最大 Token | 单价(每千输入Token) | 免费额度 |
|---|---|---|---|---|---|
| **text-embedding-v4** | 2048 / 1536 / **1024(默认)** / 768 / 512 / 256 / 128 / 64 | **10** | **8,192** | 0.0005 元（Batch 0.00025 元） | 100 万 Token / 90 天 |
| **text-embedding-v3** | 1024(默认) / 768 / 512 / 256 / 128 / 64 | 10 | 8,192 | 0.0005 元（Batch 0.00025 元） | 100 万 Token / 90 天 |
| text-embedding-v2 | 1536（固定） | 25 | 2,048 | 0.0007 元（Batch 0.00035 元） | 50 万 Token / 90 天 |
| text-embedding-v1 | 1536（固定） | 25 | 2,048 | 0.0007 元（Batch 0.00035 元） | 50 万 Token / 90 天 |

要点：
- **v4** 基于 Qwen3-Embedding，支持 100+ 语种，**自定义维度**（Matryoshka）；`dimensions` 参数**仅 v3/v4 支持**。官方推荐 **1024 维**为性价比最佳（相对 2048 维，MTEB 仅约 -3.2 分，存储减半）。
- **批量上限 = 10 条/请求**（v4/v3）。超出报 `400 InternalError.Algo.InvalidParameter: batch size ... should not be larger than 10`。
- `encoding_format` **目前仅支持 `float`**。
- 计费：**按输入 Token**，v4/v3 = **0.0005 元/千 Token**（即 0.5 元/百万 Token）。Batch 异步调用半价。
- 免费额度：v4/v3 各 **100 万 Token**，有效期 **百炼开通后 90 天**（仅中国内地部署范围有；国际站另算）。出处：[模型价格](https://help.aliyun.com/zh/model-studio/model-pricing)。

### 2.2 是否 OpenAI 兼容 —— **是**

- OpenAI 兼容 base_url（华北2 北京公共云）：`https://dashscope.aliyuncs.com/compatible-mode/v1`
- 兼容 endpoint：`POST https://dashscope.aliyuncs.com/compatible-mode/v1/embeddings`
- 迁移只需改三处：`base_url`、`model`、`api_key`。出处：[使用 OpenAI 兼容接口调用 Embedding](https://help.aliyun.com/zh/model-studio/embedding-interfaces-compatible-with-openai)。
- ⚠️ **多模态** Embedding（qwen3-vl-embedding、tongyi-embedding-vision 系列）**不支持** OpenAI 兼容接口，须走 DashScope 原生 API（与 R1 多模态方案相关，请 dev 留意）。

### 2.3 最小调用示例（官方原文，已核实）

原生 openai SDK：
```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv("DASHSCOPE_API_KEY"),
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1",
)
resp = client.embeddings.create(
    model="text-embedding-v4",
    input="衣服的质量杠杠的，很漂亮",
    dimensions=1024,          # 仅 v3/v4 支持
    encoding_format="float",
)
print(resp.data[0].embedding[:5], "dim=", len(resp.data[0].embedding))
```

### 2.4 ⚠️ LangChain 接入的关键坑（batch=10）—— 必读

用 `from langchain_openai import OpenAIEmbeddings` 指向百炼时，**默认会报 batch>10 的 400 错误**。因为 LangChain 默认 `chunk_size=1000`（每请求 1000 条），远超百炼 10 条上限。修法（可信度 **【社区实测/GitHub Issue】**）：

```python
from langchain_openai import OpenAIEmbeddings

emb = OpenAIEmbeddings(
    model="text-embedding-v4",
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1",
    api_key="<DASHSCOPE_API_KEY>",   # 或留空读环境变量 OPENAI_API_KEY，建议显式传
    dimensions=1024,
    chunk_size=10,                    # 必须！匹配百炼 batch<=10
    check_embedding_ctx_length=False, # 必须！关掉 OpenAI 专用 tiktoken 切分逻辑
)
```
- 出处：[langchain-ai/langchain #29759](https://github.com/langchain-ai/langchain/issues/29759)、[#31227](https://github.com/langchain-ai/langchain/issues/31227)、[RooCode #9142](https://github.com/RooCodeInc/Roo-Code/issues/9142)。

**替代方案（更省心）**：LangChain 官方有原生 `DashScopeEmbeddings`（`langchain_community`），内部按百炼规则分批，无需上面两个补丁参数：
```python
from langchain_community.embeddings import DashScopeEmbeddings
emb = DashScopeEmbeddings(model="text-embedding-v4")  # 读环境变量 DASHSCOPE_API_KEY
```
需先 `pip install dashscope`。出处：[DashScopeEmbeddings 参考文档](https://reference.langchain.com/python/langchain-community/embeddings/dashscope/DashScopeEmbeddings)。
> 教学建议：既然目标是"边学边做"，可先用 `OpenAIEmbeddings`（讲清 OpenAI 兼容的通用性 + 两个坑），再对比 `DashScopeEmbeddings`（讲原生封装的好处）。

---

## 3. DashScope API Key 获取步骤【文档】

1. 登录**百炼控制台**：`https://bailian.console.aliyun.com/`（用阿里云账号；无账号先注册并完成实名）。
2. 首次进入会提示**开通百炼大模型服务**（免费开通，开通即触发 90 天免费额度计时）。
3. 右上角头像/或左侧菜单进入 **API-KEY** 页面 → **创建我的 API-KEY** → 复制保存（`sk-...`，**只显示一次**）。
4. 配置环境变量（业界惯例变量名 **`DASHSCOPE_API_KEY`**，DashScope SDK / LangChain `DashScopeEmbeddings` 默认读它）：
   - Windows PowerShell（当前会话）：`$env:DASHSCOPE_API_KEY="sk-xxxx"`
   - 永久（用户级）：`setx DASHSCOPE_API_KEY "sk-xxxx"`（重开终端生效）
   - Git Bash：`export DASHSCOPE_API_KEY="sk-xxxx"`
   - 用 `OpenAIEmbeddings` 时注意它默认读 `OPENAI_API_KEY`，所以要么显式 `api_key=os.getenv("DASHSCOPE_API_KEY")`，要么把值也放进 `OPENAI_API_KEY`。
- **免费额度**：开通百炼后，v4/v3 各 **100 万 Token**、v2/v1 各 50 万 Token，有效期 **90 天**（仅中国内地部署范围）。出处：[模型价格](https://help.aliyun.com/zh/model-studio/model-pricing)。
- 安全：Key 不要写进源码/提交 git；用环境变量或 `.env`（并加 `.gitignore`）。

---

## 4. 结论建议：本地 text2vec vs 百炼 API

### 两者都可行，但建议 **M1 先上百炼 `text-embedding-v4`**

| 维度 | 百炼 text-embedding-v4（API） | 本地 shibing624/text2vec-base-chinese |
|---|---|---|
| 3.14 可用性 | ✅ 仅需 `openai`/`dashscope`，秒装 | ✅ 可装（torch 2.13 有 cp314 wheel），但 torch ~122MB + 权重下载 |
| 上手速度 | 分钟级跑通 | 需下模型、首次加载慢 |
| 质量 | Qwen3-Embedding，中文强，1024 维 | 早期模型(768维)，明显弱于 v4 |
| 成本 | 90 天内 100 万 Token 免费；之后 0.5 元/百万 Token | 免费，纯本地算力 |
| 离线/隐私 | 需联网、数据出本机 | ✅ 完全本地 |
| 学习价值 | 学"OpenAI 兼容 + 云 embedding + 计费" | 学"本地模型 + torch/HF 生态" |

**推荐路线（供 planner/dev 定夺）**：
1. **M1 主线用 `text-embedding-v4`（OpenAI 兼容，1024 维）**：免费额度覆盖 205 篇 md + PDF 24 万字的建库（粗估远小于 100 万 Token 首轮，即便多轮也够学习期），零 torch 依赖，最快看到 RAG 端到端效果，且质量最好。
2. **本地 text2vec 作为二期备选章节**：讲"离线/省钱/隐私"场景时再引入 torch + sentence-transformers（本机已验证可装），作为"边学边做"的对比实验。
3. 落地务必带 **§2.4 的 batch=10 两个补丁参数**，否则建库第一步就 400。
4. 维度统一 **1024**（v4 默认、性价比最优）；一旦选定维度并入库，**中途不可改维度**（向量库需重建），请在 plan 里锁定。

---

## 附：来源清单
- [PyPI torch 2.13.0（cp314 wheel、requires-python）](https://pypi.org/pypi/torch/2.13.0/)
- [阿里云 · 通用文本向量同步接口 API 详情](https://help.aliyun.com/zh/model-studio/text-embedding-synchronous-api)
- [阿里云 · 使用 OpenAI 兼容接口调用 Embedding](https://help.aliyun.com/zh/model-studio/embedding-interfaces-compatible-with-openai)
- [阿里云 · 向量化(Embedding)总览](https://help.aliyun.com/zh/model-studio/embedding)
- [阿里云 · 百炼模型价格](https://help.aliyun.com/zh/model-studio/model-pricing)
- [百炼控制台](https://bailian.console.aliyun.com/)
- [LangChain DashScopeEmbeddings 参考](https://reference.langchain.com/python/langchain-community/embeddings/dashscope/DashScopeEmbeddings)
- [LangChain OpenAIEmbeddings batch/ctx 坑：#29759](https://github.com/langchain-ai/langchain/issues/29759) · [#31227](https://github.com/langchain-ai/langchain/issues/31227) · [RooCode #9142](https://github.com/RooCodeInc/Roo-Code/issues/9142)
