# ADR-0003: PDF 解析器 —— docling(主干)+ fitz(后勤)
- 状态: 已采纳(注:AI Infra 语料后改用 lakebook,见 ADR-0012;docling 作为通用 PDF loader 保留)
- 日期: 2026-07-12
- 相关模块: M1

## 背景(为什么要做这个决策)
生产级 RAG 需一个版面感知(layout-aware)的 PDF→Markdown 解析器,处理 333 页技术白皮书(有文字层、62 图、真表格、代码块、无书签)。约束:本机 **Python 3.14/3.13 + Windows**,很多重量级解析器装不动。

## 选项(≥2,每个一句话)
- **A docling(IBM,本地)**:唯一在 Py3.14 全链路可装的重量级 layout-aware 解析器,表格 TEDS≈91%,自带抽图。
- **B MinerU / Marker / Unstructured / PaddleOCR**:质量各有所长但当前环境装不动。
- **C LlamaParse(托管 API)**:纯客户端秒装、质量高,但 PDF 上传第三方云。
- **D 纯 fitz(PyMuPDF)**:零依赖、快、能抽图,但无真正版面模型。

## 优劣对比
| 方案 | 优 | 劣 |
|---|---|---|
| **A docling** | Py3.14 唯一可装的重量级、表格/阅读顺序/代码块/图 bbox+页码全覆盖、Apache-2.0、CPU 可跑、离线 | ~2-3GB torch 依赖 + 首次下模型 ~1GB;整段转有内存累积(须分窗口批处理) |
| B MinerU/Marker/... | 质量强 | **3.14 直接装不动**(requires-python<3.14 或 Pillow<11 无 cp314 wheel 或依赖 paddle 无 cp314) |
| C LlamaParse | 零本地依赖、质量稳 | **PDF 出域 = 隐私红线须拍板**、依赖外网、计费 |
| D 纯 fitz | 零依赖、秒级、可清脏字符 | 无版面模型,表格/多栏阅读顺序弱 |

## 结论(选了哪个)
**双轨**:主干 A = docling(出干净 Markdown → 复用 md loader 切块/面包屑)+ 自带抽图(PIL+page_no+bbox);后勤 B = fitz(缩水为页数门禁 + docling 抽风兜底)。docling 放独立 `[pdf]` extra。整段转会 `std::bad_alloc`(内存累积)→ 修法 = ~5 页小窗口批处理。

## 为什么不选替代
- **不选 MinerU/Marker/Unstructured/Paddle**:R3 用 PyPI JSON 逐包实测——MinerU/Unstructured `requires-python<3.14` 被 pip 直接拒装;Marker pin `Pillow<11`(cp314 wheel 最早 11.3.0,10.x 无)源码编译必失败;Paddle 系无 cp314 win wheel。不是质量问题,是依赖层被硬拒。
- **不选 LlamaParse**:内部白皮书上传第三方云是隐私红线,须用户拍板;仅留作 docling 装配/质量出问题、且用户同意出域时的兜底。
- **不选纯 fitz 当主干**:无版面模型,表格/阅读顺序/标题层级远不如 docling,达不到"极致精准"入库上限;fitz 降级为零依赖后勤。

## 回溯条件(什么情况下该重估)
Python 降到 3.13/3.12(MinerU/Marker 解锁);docling 质量/内存问题不可接受;用户同意数据出域(可切 LlamaParse 对照)。

## 证据链接
- `docs/collab/research/R3-PDF解析器选型.md`(cp314 可装性矩阵 + 逐候选评估)
- `docs/collab/research/R1-多模态RAG方案.md`(fitz 抽图/脏字符清洗)
- notes 2026-07-12(docling 内存累积诊断 + 分窗口修法、67/67 批全本转换成功)
</content>
