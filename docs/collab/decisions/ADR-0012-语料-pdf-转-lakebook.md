# ADR-0012: AI Infra 语料从 PDF 转 lakebook
- 状态: 已采纳(取代 ADR-0003 在本语料上的应用;docling PDF 能力保留为通用 loader)
- 日期: 2026-07-13
- 相关模块: M1

## 背景(为什么要做这个决策)
AI Infra 语料原是 333 页 PDF,经 docling 转 MD(见 ADR-0003)。但 PDF 路线有硬伤:文字层脏数据(`BF16`→OCR 乱码)、docling 标题塌平(须人工定章节边界)、图片要抠图。用户随后提供了同内容的 `AI INFRA SRE.lakebook`(语雀原始导出)。

## 选项(≥2,每个一句话)
- **A 继续 PDF + docling**:已跑通,但需大量策展清洗。
- **B 改用 lakebook(语雀导出)**:tar 包含 tocYml 目录树 + 151 篇 doc JSON,body 为干净 Lake HTML。

## 优劣对比
| 方案 | 优 | 劣 |
|---|---|---|
| A PDF + docling | 通用(任意 PDF 都能吃) | OCR 损坏(全角乱码)、标题塌平须人工定边界、过切、图片要抠 |
| **B lakebook** | **零 OCR 损坏、天然 151 篇边界、完整层级、图片是 cdn.nlark.com 真实 URL(与现有博客一致无需抠图)、开箱发布级** | 仅适用于有语雀原始导出的语料 |

## 结论(选了哪个)
选 **B**:写 `lakebook` handler(tarfile 读 + tocYml 定篇 + markdownify 转 MD + frontmatter),质量开箱发布级,生成 108 篇入 `src/posts/AI_Infra/`(过滤 43 篇空占位)。**AI INFRA SRE 认 lakebook 为规范源,PDF 源禁用**。AI_Infra 文章落在 `posts_dir` 下 → 被 blog_md loader 自动纳入 RAG,一份来源不重复。

## 为什么不选替代(且为什么 PDF/docling 不作废)
- **不用 PDF 作本语料规范源**:同内容下 lakebook 在源质量上全面碾压——无 OCR 损坏、天然文章边界、完整层级、图片真实 URL,省掉 PDF 路线的策展/抠图/定边界全部人工成本。**同内容只登记一个规范源**(去冗余源治理),故 PDF 源禁用。
- **但 docling/PDF 能力保留**:这是吃海量异构类型的知识库,每个解析器 = 按 type 注册的可复用 loader(md/pdf/lakebook/未来 docx/html/csv)。docling 仍是"无 lakebook 的任意 PDF"的主干(ADR-0003),此处只是本语料换了更优源。

## 回溯条件(什么情况下该重估)
遇到无语雀导出、只有 PDF 的语料(回退 docling);lakebook 格式/导出质量变化。

## 证据链接
- notes 2026-07-13(重大转向 PDF→lakebook、108 篇入库、去冗余三层、AI_Infra 结构重写)
- ADR-0003(docling PDF 解析器,通用主干保留)
</content>
