# R3 · 版面感知 PDF 解析器选型（替代裸 fitz）

> researcher / 2026-07-12。目标：为生产级、极致精准 RAG 选一个 layout-aware 的 PDF→Markdown/结构化解析器。
> 目标文档画像（已实测）：`AI INFRA SRE.pdf`，333 页技术白皮书；**有文字层（非扫描，不强依赖 OCR）**；62 张架构大图 + 速查手册类真表格 + 代码/命令块 + 13 条超链接；无书签（靠标题字号重建章节）。
> 运行环境（本机实测）：**Windows + CPython 3.14.0**，pip 26.x；venv `rag-server/.venv` 已装 pydantic / openai / langchain-text-splitters / pymupdf 1.28。torch 2.13 有 cp314 wheel（R2 已证）。
> 方法：**只读**取证——用 PyPI JSON API 逐包核对 cp314 / win_amd64 wheel 与依赖版本 pin，未真装任何重包。

---

## 0. TL;DR（最重要结论先说）

- **推荐 Top 1：docling（IBM）本地部署。** 它是本清单里**唯一**在 **Python 3.14 + Windows** 上「requires-python 允许 + 全部原生依赖都有 cp314 win wheel + 不依赖 paddle」的**重量级 layout-aware** 解析器。作者已把 ONNX 加速路径用 `python_version < "3.14"` 主动 gate 掉、保留 torch 默认路径——**明确适配了 3.14**。表格质量业界最强档（TableFormer TEDS≈91% ACCURATE），阅读顺序、代码块、图片 bbox+页码、超链接、干净 Markdown 全覆盖。Apache-2.0。
- **推荐 Top 2（省事/兜底）：LlamaParse（托管 API）。** 客户端 `llama-cloud-services` 是纯 Python，3.14 秒装；质量高、零本地依赖。**但 PDF 要上传第三方云**（对"内部 AI-Infra 白皮书"是隐私红线，需用户拍板），且计费/额度受限。**作为 docling 装不动或质量不满意时的对照/兜底**。
- **MinerU、Marker、Unstructured(hi_res)、PP-StructureV3/PaddleOCR、Nougat 在当前 Python 3.14 上均装不动**（各有硬 blocker，见 §2 表）——不是质量问题，是**依赖/版本 pin 层面直接被 pip 拒绝或源码编译必失败**。
- **图片怎么出**：选 docling 则**它自己抽**（`generate_picture_images=True` → 每张图给 PIL + `page_no` + `bbox`，Markdown 用 `ImageRefMode.REFERENCED` 落 PNG 并引用），**无需再用 fitz 补抽**。fitz 仅作零依赖兜底保留。

---

## 1. 可装性实测矩阵（Python 3.14 / win_amd64）——本报告最硬的证据

所有数据来自 `https://pypi.org/pypi/<pkg>/json` 的 `urls`/`releases` 文件名解析（附录 §6 有脚本）。判定规则：cp314-win_amd64 wheel、或 `abi3`（stable ABI，cp3x-abi3 向前兼容 3.14）、或 `py3-none-any`（纯 Python）= 可装；只有 sdist / 最高只到 cp313 = 3.14 装不动（需源码编译，Windows 上基本失败）。

### 1a. 关键**原生依赖**（决定一切编排器能否装）

| 依赖 | 最新版 | cp314/win 结论 | 证据（wheel 文件名） |
|---|---|---|---|
| torch | 2.13.0 | ✅ 有 | `...-cp314-...-win_amd64.whl`（R2 已证） |
| torchvision | 0.28.0 | ✅ 有 | `torchvision-0.28.0-cp314-cp314-win_amd64.whl` |
| numpy | 2.5.1 | ✅ 有 | `...cp314...win_amd64` |
| Pillow | 12.x（cp314 起于 **11.3.0**）| ✅ ≥11.3.0 才有 | 11.3.0/12.0.0/12.1.x/12.2.0/12.3.0 有 cp314-win；**10.x 无** |
| tokenizers | 0.23.1 | ✅ abi3 | `tokenizers-0.23.1-cp310-abi3-win_amd64.whl` |
| safetensors | 0.8.0 | ✅ abi3 | `safetensors-0.8.0-cp310-abi3-win_amd64.whl` |
| transformers | 5.13.1 | ✅ 纯 Python | `py3-none-any` |
| onnxruntime | 1.27.0 | ✅ 有 | `onnxruntime-1.27.0-cp314-cp314-win_amd64.whl` |
| opencv-python(-headless) | 5.0.0.93 / 4.11.0.86 | ✅ abi3（两版都） | `...cp37-abi3-win_amd64.whl`（cp37-abi3 兼容 3.14） |
| pypdfium2 | 5.11.0 / 5.9.0 | ✅ 纯 | `pypdfium2-...-py3-none-win_amd64.whl` |
| scikit-image | 0.26.0 | ✅ 有 | cp314-win |
| docling-parse | 7.8.0 | ✅ 有 | cp314-win |
| **paddlepaddle** | **3.3.1** | ❌ **最高只到 cp313** | win wheels 仅 cp39/310/311/312/**313**，**无 cp314** → **Paddle 全家 3.14 装不动** |

### 1b. **编排器**本身

| 解析器 | 版本 | requires-python | 纯 Python? | 3.14/win 可装? |
|---|---|---|---|---|
| **docling** | 2.112.0 | `<4.0,>=3.10` ✅ | 是（重依赖分离到 docling-slim） | ✅ **可装** |
| llama-cloud-services / llama-parse | 0.6.94 | `<4.0,>=3.9` ✅ | 是 | ✅ **可装**（纯 API 客户端） |
| **mineru** | 3.4.4 | `<3.14,>=3.10` ❌ | — | ❌ **requires-python 直接排除 3.14** |
| **unstructured** | 0.24.1 | `<3.14,>=3.11` ❌ | — | ❌ **requires-python 直接排除 3.14** |
| **marker-pdf** | 1.10.2 | `<4.0,>=3.10` ✅ | 是 | ❌ 依赖 pin 冲突（见 §2） |
| **paddleocr / PP-StructureV3** | 3.7.0 | `>=3.8` ✅ | 是 | ❌ 传递依赖 paddlepaddle（无 cp314） |
| **nougat-ocr** | 0.1.17 | `>=3.7` | 是 | 理论可装但**不推荐**（见 §2） |

---

## 2. 逐候选评估

### ✅ docling（IBM）— **Top 1**
- **可装性【实测】**：requires-python `<4.0,>=3.10` 放行 3.14。重依赖走 `docling-slim[standard]`：torch<3(→2.13 cp314✅)、torchvision<1(→0.28 cp314✅)、pillow<13,>=10(→12.x cp314✅)、safetensors abi3✅、transformers<6 纯✅、numpy✅、scikit-image✅、pypdfium2✅、docling-parse cp314✅。**不依赖 paddle**。ONNX 加速 extra 被 `python_version < "3.14"` 主动 gate（3.14 上自动跳过、不报错，走 torch 路径）。→ **全链路 cp314 win wheel 齐备，可装。**
- **表格质量【文档+基准】**：TableFormer，FinTabNet TEDS≈91%（ACCURATE 模式）；多份 2025-26 基准里表格/结构化 RAG 抽取近满分（有基准报 docling 表格 F1=1.0，而 MinerU 的 HTML 式表格标签在 text-based 抽取里失败）。速查手册类真表格是它强项。
- **阅读顺序**：模型版面检测（RT-DETR，DocLayNet >85% mAP），多栏/代码块/公式阅读顺序 >90%。代码块能识别为 code。
- **Markdown**：`DoclingDocument.export_to_markdown()` 输出 `#` 标题 + `|` 表格（复杂表可 HTML），干净。
- **图片（关键）【文档/知识，中信度】**：`PdfPipelineOptions(generate_picture_images=True, images_scale=2.0)` → 每个 `PictureItem` 带 `.image`(PIL) + `prov[0].page_no` + `prov[0].bbox`；`export_to_markdown(image_mode=ImageRefMode.REFERENCED)` 会把图落成 PNG 并在 md 里引用。**自带抽图 + 页码 + bbox，正合派系2多模态 RAG（caption 检索 / 原图喂 VLM）。**
- **超链接**：DoclingDocument 保留 hyperlink，md 导出渲染链接。
- **重量/GPU**：装完约 2–3GB（torch 占大头）；**CPU 即可跑**（无需 GPU），333 页一次性入库可接受；**首次运行会从 HuggingFace 下载版面/TableFormer 模型（约 0.5–1GB，一次性，需联网）**。
- **无书签**：靠版面模型的 section-header 类重建标题层级——比字号启发式稳，但多级标题仍可能需人工微调（所有工具通病）。
- 许可：Apache-2.0（商用友好）。

### ✅ LlamaParse（托管 API）— **Top 2 / 兜底**
- **可装性【实测】**：`llama-cloud-services` 0.6.94 纯 Python、requires-python `<4.0,>=3.9`，3.14 秒装、零本地重依赖。
- **质量**：托管端 SOTA，agentic 模式表格/版面很强，直出 Markdown、能抽图。
- **隐私【文档】**：**PDF 上传 LlamaCloud**。文档默认缓存 48h 后永久删除，可 `do_not_cache=True` 关缓存；声明不用于训练；SOC2/HIPAA/GDPR。**但对内部白皮书仍是"数据出域"**，需用户明确同意。
- **费用/额度【文档】**：免费 10,000 credits/**月**（≈Fast 1cr/页→1万页，或 Cost-effective 3cr/页→3300 页；Agentic 10cr/页→1000 页）；20 req/min。**本文 333 页免费额度足够**。付费 1000cr=$1.25。
- 取舍：省事、质量稳、无 3.14 装配风险；代价=隐私出域 + 依赖外网/计费。

### ❌ MinerU（opendatalab）
- **硬 blocker【实测】**：mineru 3.4.4 `requires-python <3.14` → **pip 在 3.14 直接拒装**。其 pipeline/vlm extra 的 torch/onnxruntime/transformers 本身在 3.14 有 wheel，但顶层 requires-python 卡死。→ 除非把 Python 降到 3.13，否则不可用。
- 质量本身很强（MinerU2.5 OmniDocBench 90.67、阅读顺序 edit-dist 0.044、表格 TEDS 88），但**图片裁剪有时不完整**、AGPL-3.0、CPU 慢约 2×。**当前环境不可选。**

### ❌ Marker（VikParuchuri）
- **硬 blocker【实测】**：marker-pdf 1.10.2 虽放行 3.14，但 pin `Pillow<11.0.0,>=10.1.0`——**Pillow cp314-win wheel 最早出现在 11.3.0，10.x 无 cp314** → pip 需源码编译 Pillow 10（Windows 上需 C 工具链+libjpeg/zlib，基本失败）。其引擎 `surya-ocr<0.18` 同样 pin `pillow<11` → 双重卡死。→ **3.14 装不动**（除非 marker 放宽 Pillow pin）。
- 质量中上（TEDS≈75–80%），全能均衡，但对本环境不可选。

### ❌ Unstructured（hi_res）
- **硬 blocker【实测】**：unstructured 0.24.1 `requires-python <3.14`；且其 huggingface/paddleocr extra 对 Windows 用 `python_version < "3.13"` 标记 torch/paddle → 作者未面向 3.13+/Win 设计。hi_res 还依赖 detectron/paddle 系。→ **不可选。**

### ❌ PP-StructureV3 / PaddleOCR
- **硬 blocker【实测】**：paddleocr 3.7 → paddlex ≥3.7 → **paddlepaddle ≥3.3，而 paddlepaddle win wheel 最高只到 cp313，无 cp314** → 3.14 装不动。且本文有文字层，不需要 Paddle 的 OCR 强项。→ **不可选。**

### ❌ Nougat（Meta）
- 理论上纯 Python 可装（torch cp314✅），但 **Nougat 是"无 OCR 的 transformer 重新生成全文"**：对**已有干净文字层**的文档属杀鸡用牛刀，且已知**易重复/幻觉**、主打学术论文、项目基本停更（0.1.17，2023）。→ **不推荐。**

### （加分项）pymupdf4llm — 零依赖兜底
- 不在你给的清单，但值得知道：`pymupdf4llm` 是 fitz 之上的 Markdown 薄封装，**复用已装的 pymupdf、零新依赖、3.14 直接可用**，能出 `#`/`|` 和基础阅读顺序。**表格/版面质量远不如 docling**（无真正版面模型）。可作为 docling 装配失败或极简路线的最低保底。

---

## 3. 关键结论（逐条回答委托的 4 问）

**Q1 推荐 Top 1-2？**
- **Top 1 = docling（本地）**：本环境唯一可装的重量级 layout-aware 解析器，表格/阅读顺序/代码块/图 bbox+页码/超链接/干净 Markdown 全覆盖，Apache-2.0，CPU 可跑，正好命中"文字层+表格+图+代码"画像。
- **Top 2 = LlamaParse（托管，兜底/对照）**：省事、质量稳、3.14 无装配风险；仅在隐私可接受时用，或作为 docling 输出的质量对照。

**Q2 本地重依赖 vs 托管 API 取舍？**
- **本地（docling）**：离线、免费、数据不出域（契合内部白皮书 + 已有本地栈）；代价=约 2–3GB torch 依赖 + 首次下模型约 1GB + CPU 较慢（333 页一次性入库可接受）。**且已实测 3.14 可装**——原先"本地怕 3.14 装不动/要 GPU"的担忧对 docling **不成立**（无需 GPU）。
- **托管（LlamaParse）**：零依赖、质量高、免费额度够本文；代价=**PDF 上传第三方云（隐私出域，需用户同意）** + 依赖外网 + 超额计费。
- **结论**：优先 docling（本地、离线、免费、隐私安全）；LlamaParse 仅当 docling 装配/质量出问题、且用户同意数据出域时启用。

**Q3 图片怎么出——自抽还是 fitz 补抽？**
- **docling 自己抽**：`generate_picture_images=True` 直接给每张图 PIL 图 + `page_no` + `bbox`，md 用 `ImageRefMode.REFERENCED` 落 PNG。**不需要再用 fitz 补抽图**，且图的坐标/页码与 md 结构同源一致，跨页锚定更稳。
- fitz 仅保留为零依赖兜底（若想拿原始嵌入图字节而非 docling 的区域渲染 PNG）。

**Q4 哪些 3.14 大概率装不动（实测依据）？**
- **MinerU**（requires-python `<3.14` 直接拒装）、**Unstructured**（requires-python `<3.14`）、**Marker**（pin `Pillow<11`，无 cp314 wheel→源码编译失败）、**PP-StructureV3/PaddleOCR**（传递依赖 paddlepaddle 无 cp314 win wheel）。**Nougat** 能装但不推荐。
- 反证：docling 全链路 cp314 win wheel 齐备；根因是 DL 栈（torch2.13/torchvision0.28/tokenizers·safetensors abi3/opencv5 abi3/onnxruntime1.27/numpy2.5/Pillow≥11.3）在本环境**已普遍提供 cp314**，唯 **paddlepaddle 掉队（止步 cp313）**。

---

## 4. 落地建议（给 dev）

1. **新增可选依赖组**（不污染主环境）：`pip install docling`（拉 torch 系，约 2–3GB）。建议放独立 extra 或单独入库脚本环境，避免与轻量运行时耦合。
2. **文字层文档关 OCR**：`PdfPipelineOptions(do_ocr=False, generate_picture_images=True, images_scale=2.0)` + `do_table_structure=True`（TableFormer ACCURATE）。关 OCR 省时、且完全绕开 opencv/rapidocr 路径。
3. **首次联网**下载版面+TableFormer 模型（一次性，可预热缓存到 HF_HOME）。
4. **图片对接派系2**：用 docling 导出的 PNG + `page_no`+`bbox` 建 caption↔原图 的 MultiVector 映射（复用 R1/notes 的方案）。
5. **兜底策略**：docling 装配若在某台机失败 → 降级 `pymupdf4llm`（零依赖）或临时切 LlamaParse（需用户同意数据出域）。
6. **验收实测（建议 tester/dev 做）**：拿本文抽 3–5 页样张，人工核对速查表还原、62 图是否都拿到 bbox+页码、13 条超链接是否保留、代码块是否成 ``` fence。

---

## 5. 可信度标注小结
- 【实测·wheel 索引】：所有 cp314/win 可装性判定、requires-python、依赖 pin——直接解析 PyPI JSON，最高可信。
- 【基准/文档】：表格 TEDS、阅读顺序、许可、LlamaParse 额度/隐私——来自公开基准与官方文档（见 §7 URL），可信度中高。
- 【文档/知识·中信度】：docling 图片 export API 具体调用（`generate_picture_images`/`ImageRefMode.REFERENCED`/`PictureItem.prov.bbox`）——docling 官方 docs 域名被本机网络策略拦截，未能实时抓取核对；结论基于已确立的 docling 2.x API 知识，**建议 dev 装后用一页样张跑通确认**。

---

## 6. 附录：只读取证命令要点（未真装重包）
```python
# 用 venv 的 python 跑，纯读 PyPI JSON，判定 cp314/win_amd64/abi3/py3-none-any
import json, urllib.request
d = json.load(urllib.request.urlopen("https://pypi.org/pypi/<pkg>/json"))
# 看 d["info"]["requires_python"] / requires_dist；看 d["urls"] 里 .whl 文件名的 cp/abi/plat 段
```
- 关键判定：`cp314-...-win_amd64` 或 `cpXX-abi3-win_amd64`（abi3 向前兼容）或 `py3-none-any` = 可装；仅 sdist / 最高 cp313 = 装不动。
- 全程无 `pip install` 重包，无副作用。

## 7. 主要出处（URL）
- Docling 论文（表格/结构/reading order）: https://arxiv.org/pdf/2501.17887
- 开源 PDF→MD 对比（Marker/MinerU/Docling/pdf-craft/PyMuPDF4LLM）: https://themenonlab.blog/blog/best-open-source-pdf-to-markdown-tools-2026
- Docling vs MinerU 实测: https://www.codesota.com/ocr/docling-vs-mineru
- 自托管 Docling/Marker/MinerU RAG 指南: https://www.spheron.network/blog/self-host-document-intelligence-docling-marker-mineru-rag-guide/
- MinerU2.5 论文（基准数值）: https://arxiv.org/pdf/2509.22186
- LlamaParse 定价/额度: https://developers.llamaindex.ai/llamaparse/general/pricing/
- LlamaParse FAQ（缓存48h/不训练/do_not_cache）: https://developers.llamaindex.ai/llamaparse/general/faq/
- 可装性数据源: `https://pypi.org/pypi/<pkg>/json`（docling / mineru / marker-pdf / unstructured / paddlepaddle / torch / torchvision / Pillow / tokenizers / safetensors / opencv-python 等）
