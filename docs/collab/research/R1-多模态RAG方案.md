# R1 · 多模态 RAG 方案取证报告

> 语料：`AI INFRA SRE.pdf`（333 页 / 文字层约 24 万字 / 62 张大架构图 + 7 张小图标）
> 技术栈：Python + LangChain，Provider = 阿里云百炼（Qwen，OpenAI 兼容），向量库 Chroma
> 作者：RESEARCHER　日期：2026-07-12
> 可信度标注：`【文档】` 官方/权威文档明说；`【实测】` 只读求证所得；`【推测】` 未证实推断

---

## 0. 结论速览（TL;DR）

- **PDF 文本解析**：推荐 **PyMuPDF（`fitz` / LangChain `PyMuPDFLoader`）**。它是四者中唯一同时"快 + 能抽图 + 保留页码/坐标/结构"的，且直接用 `fitz` 裸 API 比 LangChain 封装更可控（能顺手做脏字符清洗、按页导出图片）。
- **图片进 RAG 主流路线**：工业界 2025–2026 主流是 **原生多模态 embedding（路线 C）> captioning（路线 B）**；但对**本项目**，综合"OpenAI 兼容栈 + Chroma 纯文本向量 + 本机 Python 3.14 装 torch 有风险"，**推荐 B 为主 + D 兜底**（VL captioning 入文本库 + metadata 挂原图页码/路径，检索命中后把原图带出）。路线 C 作为进阶备选。
- **Qwen-VL captioning**：百炼视觉模型（`qwen-vl-max` / `qwen-vl-plus` 及其快照）**完全兼容 OpenAI `messages` 的 `image_url`（公网 URL 与 base64 Data URL 均可）**，可直接用 `langchain-openai` 的 `ChatOpenAI` 指向百炼 base_url 传图。图片按 28×28 像素→1 token 折算计费，62 张图一次性 captioning 成本极低（量级 < 1 元）。
- **多模态 embedding**：百炼有 `multimodal-embedding-v1`（1536 维，文/图/视频同一语义空间）及更新的 `tongyi-embedding-vision-*` / `qwen3-vl-embedding`；但这些走 **DashScope 原生 API（非 OpenAI 兼容 Embedding 接口）**，且 Chroma 需单开多模态 collection。开源中文侧首选 **Chinese-CLIP（OFA-Sys/达摩院）**。

---

## 1. PDF 解析进 RAG：Loader 对比与推荐

四个 LangChain PDF loader 的能力矩阵（`langchain_community.document_loaders`）：

| Loader | 底层库 | 同时抽文字+图片 | 页码/结构 metadata | 中文/脏字符 | 速度 | 表格 |
|---|---|---|---|---|---|---|
| **PyPDFLoader** | `pypdf` | 文字✔；图片需 `extract_images=True` + OCR parser（如 `RapidOCRBlobParser`） | 每页一个 Document，含 `page`/`source` | 一般；对内嵌字体损坏的脏字符无清洗能力 | 快 | 弱 |
| **PyMuPDFLoader** | PyMuPDF(`fitz`) | **文字✔ + 图片✔（最强）**；`extract_images=True`、`extract_tables="markdown"` | 每页 Document + 丰富 metadata（页码、坐标/layout） | 好；`fitz` 裸 API 可精细拿 `page.get_text()` 各种模式再自行清洗 | **最快** | 支持（markdown） |
| **PDFPlumberLoader** | `pdfplumber` | 文字✔，**图片�’不抽**（仅数字版文字/表格/字符坐标） | 详细页级 metadata、去重 | 好；擅长多栏/表格结构 | 中 | **最强** |
| **UnstructuredPDFLoader** | `unstructured` | 文字✔ + 图片（把页转图后 OCR）；`mode="elements"` 拆 Title/段落/表格 | 结构化元素（Title/NarrativeText/Table…） | 好；结构切分最细，适合 RAG 分块 | 慢（依赖重，OCR 更慢） | 支持 |

来源【文档/权威整理】：
- LangChain PDF loaders 官方参考：https://reference.langchain.com/python/langchain-community/document_loaders/pdf
- PyPDFLoader（`extract_images` / OCR parser 配置）：https://reference.langchain.com/python/langchain-community/document_loaders/pdf/PyPDFLoader
- 多 loader 能力对比（含 PyMuPDF 抽图/表、Unstructured 结构化、PDFPlumber 表格）：https://medium.com/@sangitapokhrel911/different-methods-to-read-pdf-files-in-langchain-5d547206bcef

### 针对本项目的推荐

**主用 PyMuPDF（`fitz`）裸 API，而非 LangChain `PyMuPDFLoader` 封装**，理由：

1. **文字+图片一把梭**：`page.get_text("text")` 拿正文（也可 `"dict"`/`"blocks"` 拿带坐标结构），`page.get_images()` + `page.get_image_bbox()` / `doc.extract_image()` 按页导出 62 张大图与 7 张图标为 PNG。同一次遍历即可产出「每页文本块 + 每页图片清单」。【文档】PyMuPDF 抽图能力见上引对比。
2. **脏字符清洗可控**：notes.md 记录文字层有 `BF16 → BF\x00\x00` 这类字体映射损坏的脏数据。裸 `fitz` 下你能拿到原始字符串，自行做 `text.replace("\x00","")` / 正则清洗 / Unicode 归一化，再切块；LangChain 封装会把这一步藏起来，不利于清洗。**建议清洗放在切块之前**。
3. **页码/结构 metadata**：手动构造 Document 时把 `page`（页码）、`source`、`bbox`、`type`（text/image）写进 metadata，检索时可精确回溯"第几页 / 哪张图"。这对路线 D（图文分离检索带出原图）是刚需。
4. **速度**：333 页用 PyMuPDF 秒级完成。

> 表格若多可局部叠加 PDFPlumber；若正文分块想要"标题层级"结构，可评估 UnstructuredPDFLoader 的 `elements` 模式，但其依赖重、OCR 慢，本 PDF 已有文字层，非必要不上 OCR。

---

## 2. 图片进 RAG 的四条路线：主流验证与优劣

| 路线 | 做法 | 适用场景 | 优 | 劣 |
|---|---|---|---|---|
| **A 丢弃** | 只留文字，图全扔 | 图仅装饰、信息全在正文 | 零成本 | 架构图信息全丢失（本项目 62 张大图信息量大，**不可取**） |
| **B Captioning 转文字** | 用 VLM（GPT-4o / Qwen-VL）给图生成文字描述，描述入文本向量库 | 文本生成器为主、语料不大、想复用现成纯文本 RAG 管线 | 简单、与现有文本 Chroma 完全同栈、无需本地 GPU | 有损（图→文丢信息）；据研究，检索 MAP 约落后原生多模态 embedding ~32% |
| **C 多模态 embedding** | CLIP 类模型把图与文映射到同一向量空间 | 图信息密集、需以文搜图/以图搜图、企业文档检索 | 保真、检索效果最好（2025 研究：相对文本路线 +32% MAP、胜率 0.612 vs 0.388） | 需多模态 embedding 模型；本地 CLIP 依赖 torch；向量库要支持多模态 collection |
| **D 图文分离检索带出** | 图与文各自索引/或用摘要检索+ID 回原图；检索命中后把原图作为上下文喂给多模态 LLM | 生产常用；"摘要检索 + 原件生成"混合 | 兼顾文本检索简单性 + 生成时用原图 | 需 merge/rerank，存在跨库"检索漂移"风险 |

**主流落地判断【文档/研究】**：
- NVIDIA 官方博客把多模态 RAG 归为三种主架构：①全模态入同一向量空间（CLIP 类）②所有模态归一到单一主模态（≈captioning）③各模态分库 + 多模态 reranker。https://developer.nvidia.com/blog/an-easy-introduction-to-multimodal-retrieval-augmented-generation/
- Microsoft ISE 工程博客实战：用 GPT-4V/4o 把图转文字描述与文本同库检索（路线 B），并指出查询期把图字节+文本发给多模态 LLM（inference-time enrichment）可作过渡方案。https://devblogs.microsoft.com/ise/multimodal-rag-with-vision/
- 2025 对比研究：原生多模态 embedding 检索显著优���文本化（captioning）检索，MAP 相对 +32%。https://arxiv.org/pdf/2511.16654
- 生产最佳实践（含"摘要检索 + 原图回取"混合、joint encoder 防漂移）：https://www.augmentcode.com/guides/multimodal-rag-development-12-best-practices-for-production-systems ；https://bigdataboutique.com/blog/multimodal-rag-retrieval-over-images-pdfs-and-text
- 结论：**工业界大势是原生多模态 embedding（C）与"分库+多模态 reranker"（D）**，captioning（B）被定位为"小语料/快速起步"的实用方案；另有 page-as-image（ColPali/ColQwen2）作为像素关键场景的第四路线。

**针对本项目的推荐：B 为主 + D 兜底（务实之选）**
- 本项目 Provider 是百炼 OpenAI 兼容、向量库是 **Chroma 的纯文本向量**、Embedding 原计划本地 text2vec 且**本机 Python 3.14 装 torch/sentence-transformers 有 wheel 风险**（见 notes.md）。→ 路线 C（本地 CLIP）在此环境落地成本最高。
- 62 张架构图恰是 Qwen-VL 强项（它擅长图表/流程图理解），**B 路线一次性把每张图 caption 成中文技术描述**，与正文文本同进 Chroma，同栈零新依赖。
- 叠加 **D**：把每张图的 `page`/图片文件路径写进 caption chunk 的 metadata，检索命中图 caption 时把**原图**一并带出（前端展示 / 或再喂给 Qwen-VL 做二次精读），弥补 B 的有损。
- 进阶再考虑 C：若后续要"以图搜图/以文搜图"，改用百炼 `multimodal-embedding-v1`（走 DashScope API）另开一个多模态 collection。

---

## 3. 用 Qwen-VL 做图片 captioning：确切做法

### 模型名【文档】
百炼视觉模型（OpenAI 兼容接口支持）：`qwen-vl-max`、`qwen-vl-max-latest`、`qwen-vl-max-2025-08-13` 等快照；`qwen-vl-plus`、`qwen-vl-plus-latest`、`qwen-vl-plus-2025-07-10` 等。
- `qwen-vl-plus`：性价比，一般图理解够用；`qwen-vl-max`：精细识别（复杂架构图建议用 max）。
- 来源：通过 OpenAI 接口调用通义千问 VL 模型 https://help.aliyun.com/zh/model-studio/qwen-vl-compatible-with-openai
> 注意：网络检索里出现的 `qwen3.5-397b`、`Qwen3.6` 等是 NVIDIA NIM 文档/检索器噪声，**并非百炼上的真实模型名**，勿用。

### 接口兼容性【文档】
- base_url（国内主区）：`https://dashscope.aliyuncs.com/compatible-mode/v1`；新加坡：`.../dashscope-intl.aliyuncs.com/compatible-mode/v1`；美西：`dashscope-us...`。
- **完全兼容 OpenAI `messages` 图片格式**：`content` 为 list，含 `{"type":"text",...}` 与 `{"type":"image_url","image_url":{"url": ...}}`；`url` 可为**公网 URL** 或 **base64 Data URL**（`data:image/png;base64,....`）。base64 时 `image/{format}` 必须与真实图片格式一致（png/jpeg/webp）。
- 来源：同上 qwen-vl-compatible-with-openai；OpenAI 兼容 Chat 总览 https://help.aliyun.com/zh/model-studio/compatibility-of-openai-with-dashscope

### 计费方式【文档】
- 按输入/输出 Token 分别计费；**图片被换算成 token**：Qwen-VL 系列以 **28×28 像素 ≈ 1 token**（ViT 14×14 patch，2×2 合并→28），可用 `min_pixels`/`max_pixels`（如 256~1280 token）控制单图 token 数与成本；默认区间较大。
  - 来源：Qwen2-VL 官方博客 https://qwenlm.github.io/blog/qwen2-vl/ ；HF 模型卡 https://huggingface.co/Qwen/Qwen2.5-VL-7B-Instruct （`max_pixels = 1280*28*28` 等）
- 精确单价随地域/快照/阶梯变动，**以官方价格页为准**：https://help.aliyun.com/zh/model-studio/model-pricing ；计量单位官方在"元/千token"与"元/百万token"间混用，注意换算（1 元/千 = 1000 元/百万）。
- **本项目成本量级【推测】**：69 张图一次性 captioning，单图若限 `max_pixels≈1280 token` 输入 + prompt ~50 + 输出中文描述 ~300 token ≈ 单图 ~1.6k token，总计 ~11 万 token（一次性）。即便按几元/百万 token，也 **< 1 元**，且新用户有百万级免费额度。

### 最小可用调用示例（OpenAI SDK，已核对接口格式）
```python
import base64
from openai import OpenAI

client = OpenAI(
    api_key="<百炼 DASHSCOPE_API_KEY，从环境变量读，勿硬编码>",
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1",
)

# 本地图片转 base64 Data URL（PyMuPDF 导出的 PNG）
with open("page_042_img_1.png", "rb") as f:
    b64 = base64.b64encode(f.read()).decode("utf-8")
data_url = f"data:image/png;base64,{b64}"

resp = client.chat.completions.create(
    model="qwen-vl-max",   # 复杂架构图用 max；普通图 qwen-vl-plus
    messages=[
        {"role": "system", "content": "你是资深 SRE，用中文精确描述架构图的组件、连线与数据流，供检索用。"},
        {"role": "user", "content": [
            {"type": "text", "text": "请描述这张架构图：列出关键组件、它们的关系与整体作用。"},
            {"type": "image_url", "image_url": {"url": data_url}},
        ]},
    ],
)
print(resp.choices[0].message.content)
```

### LangChain 版（`ChatOpenAI` 指向百炼，与本项目同栈）
```python
import base64
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage

llm = ChatOpenAI(
    model="qwen-vl-max",
    api_key="<DASHSCOPE_API_KEY>",
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1",
)

with open("page_042_img_1.png", "rb") as f:
    b64 = base64.b64encode(f.read()).decode("utf-8")

msg = HumanMessage(content=[
    {"type": "text", "text": "请用中文描述这张 SRE 架构图的组件与数据流。"},
    {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{b64}"}},
])
caption = llm.invoke([SystemMessage(content="你是资深 SRE。"), msg]).content
# caption 连同 {page, image_path} 一起做成 Document 入 Chroma（路线 B+D）
```
来源【文档/权威】：LangChain messages 多模态格式 https://docs.langchain.com/oss/python/langchain/messages ；`image_url` 必须是 `{"url": ...}` dict（非裸字符串）。

> 关键点：`image_url` 传 `{"url": ...}` 字典；base64 前缀 `data:image/<格式>;base64,` 的 `<格式>` 要与真实图片一致。

---

## 4. 多模态 embedding（路线 C）：百炼原生 + 开源中文方案

### 百炼原生【文档】
- **`multimodal-embedding-v1`**：基于 ONE-PEACE，文本/图像/视频入**同一语义空间**，**固定 1536 维**，为每个输入分别产出独立向量；支持跨模态检索（以文搜图/以图搜图等）。**走 DashScope 原生 API**（`POST .../api/v1/services/embeddings/multimodal-embedding/...`），**不在 OpenAI 兼容 Embedding 接口内**。
  - 来源：Multimodal-Embedding API 详情 https://help.aliyun.com/zh/model-studio/multimodal-embedding-api-reference ；向量化总览 https://help.aliyun.com/zh/model-studio/embedding ；1536 维佐证 https://www.aidoczh.com/llamaindex/python/examples/embeddings/dashscope_embeddings/dashscope_embeddings.html
- 更新款：`tongyi-embedding-vision-plus`（1152 维，可选 1024/512…）、`tongyi-embedding-vision-flash`、`qwen3-vl-embedding`（默认 2560 维，可选 2560/2048/1536/1024/768/512/256，支持 `enable_fusion` 融合向量）。图片大小限制：tongyi 系列旧版 3MB、新版(2026-03-06)放宽至 5MB，qwen2.5-vl 5MB / qwen3-vl 10MB。
- 落地注意：若走 C，需在 Chroma **另建多模态 collection**（维度与文本 embedding 不同，不能混库），且要写 DashScope SDK 调用（非 OpenAI 兼容）。

### 开源中文 CLIP【文档】
- **Chinese-CLIP（OFA-Sys / 阿里达摩院）**：`pip install cn_clip`，5 种规模，中文图文检索基线成熟（MUGE/Flickr30K-CN/COCO-CN），文档/Notebook 齐全。首选。https://github.com/OFA-Sys/Chinese-CLIP
- **Taiyi-CLIP（太乙 / IDEA-CCNL 封神榜）**：chinese-roberta-wwm 文本编码 + ViT 视觉编码，HF 上有 102M/326M 变体。https://huggingface.co/IDEA-CCNL/Taiyi-CLIP-RoBERTa-326M-ViT-H-Chinese
- **环境风险【实测/推测】**：二者均依赖 PyTorch。notes.md 已记本机 Python 3.14 + torch/sentence-transformers 可能无 wheel → 本地 CLIP 路线在当前环境**大概率装不动**，是把 C 排后、B 排前的关键现实因素。

---

## 5. 落地建议清单（供 planner / dev）

1. **解析**：PyMuPDF 裸 `fitz` 遍历 333 页 → 每页产出「清洗后文本块（先去 `\x00` 等脏字符）」+「图片 PNG（按页命名 `page_XXX_img_N.png`）」。
2. **图片处理**：对 62 张大架构图 + 7 图标跑 Qwen-VL（大图 `qwen-vl-max`，图标 `qwen-vl-plus` 或直接跳过图标）→ 中文 caption。
3. **入库（B+D）**：文本 chunk 与图片 caption 都进同一 Chroma 文本 collection；caption 的 metadata 挂 `{page, image_path, type:"image"}`，检索命中后带出原图。
4. **进阶（可选 C）**：需以图搜图时，用百炼 `multimodal-embedding-v1` 另开多模态 collection（走 DashScope SDK）。
5. **待确认**：百炼 `qwen-vl-max` 最新单价（官方价格页）、本机能否装 torch（决定 C 是否可行）——建议交 dev/tester 在目标环境实测。

---

## 附：全部出处
- LangChain PDF loaders 参考：https://reference.langchain.com/python/langchain-community/document_loaders/pdf
- PyPDFLoader：https://reference.langchain.com/python/langchain-community/document_loaders/pdf/PyPDFLoader
- Loader 对比：https://medium.com/@sangitapokhrel911/different-methods-to-read-pdf-files-in-langchain-5d547206bcef
- NVIDIA 多模态 RAG：https://developer.nvidia.com/blog/an-easy-introduction-to-multimodal-retrieval-augmented-generation/
- Microsoft ISE 多模态 RAG 实战：https://devblogs.microsoft.com/ise/multimodal-rag-with-vision/
- 文本 vs 图像检索对比研究：https://arxiv.org/pdf/2511.16654
- 生产最佳实践：https://www.augmentcode.com/guides/multimodal-rag-development-12-best-practices-for-production-systems
- 2026 多模态 RAG 综述：https://bigdataboutique.com/blog/multimodal-rag-retrieval-over-images-pdfs-and-text
- Qwen-VL OpenAI 兼容调用：https://help.aliyun.com/zh/model-studio/qwen-vl-compatible-with-openai
- OpenAI 兼容总览：https://help.aliyun.com/zh/model-studio/compatibility-of-openai-with-dashscope
- 模型价格页：https://help.aliyun.com/zh/model-studio/model-pricing
- Qwen2-VL 博客（28×28 token 规则）：https://qwenlm.github.io/blog/qwen2-vl/
- Qwen2.5-VL 模型卡：https://huggingface.co/Qwen/Qwen2.5-VL-7B-Instruct
- LangChain messages 多模态：https://docs.langchain.com/oss/python/langchain/messages
- Multimodal-Embedding API：https://help.aliyun.com/zh/model-studio/multimodal-embedding-api-reference
- 向量化总览：https://help.aliyun.com/zh/model-studio/embedding
- Chinese-CLIP：https://github.com/OFA-Sys/Chinese-CLIP
- Taiyi-CLIP：https://huggingface.co/IDEA-CCNL/Taiyi-CLIP-RoBERTa-326M-ViT-H-Chinese
