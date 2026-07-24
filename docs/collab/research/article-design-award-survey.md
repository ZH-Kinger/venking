# 文章阅读页设计调研：获奖/口碑级编辑体验对标 + theme-hope 落地清单

> 调研人：researcher｜日期：2026-07-24
> 范围：**只针对单篇文章阅读页**（不含博客首页/分类/标签列表）。目标：把 `blog/`（VuePress 2 + theme-hope rc.106）的文章页升级到"编辑级/获奖级"长文阅读体验。
> 可信度：`【源码】`直接读本仓文件/node_modules｜`【文档】`官方文档/权威指南明说(附URL)｜`【交叉】`多来源一致/社区共识｜`【推测】`未证实需验证。
> 边界：本报告**只读盘点 + 建议 + 可落地 CSS spec，未改任何代码**。落地由 dev 决策执行。
> 姊妹报告：`frontend-polish-survey.md`（全站打磨/功能开关，含博客首页）。本报告只补"文章正文阅读页"的深度部分，不重复其功能清单。

---

## PART 0 —— theme-hope 文章页现状与硬约束（先读，否则白做）【源码】

### 0.1 关键 DOM / 选择器（node_modules 实测 + styles/index.scss 现状）

| 部件 | 选择器 | 现状 |
|---|---|---|
| 正文外壳 | `[vp-content]` | 已被 index.scss:186 定制字体 |
| 正文内容体 | `[vp-content] #markdown-content` | **max-width `46rem`、line-height `1.8`**（已定制）；h2 加了 `border-bottom` 细线；blockquote 左边框 3px accent；inline code 用 `--vp-c-accent-soft` 底；`img` 圆角+阴影 |
| 文章标题 | `.vp-page-title` | 未定制（theme-hope 默认字号，偏小） |
| 文档型 meta（编辑链接/贡献者/更新时间） | `.vp-page-meta`（`.vp-meta-item / .vp-meta-label / .vp-meta-info / .git-info / .update-time / .contributors`） | 未定制 |
| 博客型 meta（作者/日期/分类/标签/阅读时间/字数） | `.page-info`（blog 插件启用时） | 未定制 |
| 侧栏 TOC | theme-hope `toc`（`plugin-active-header-links` 提供 scroll-spy） | 默认开，未美化 |
| 顶部进度条 | `plugin-nprogress`（路由切换进度，**不是**阅读进度条） | 默认开 |
| 回到顶部 | `plugin-back-to-top` | 默认开 |
| 阅读时间 | `plugin-reading-time` | 默认开，喂给 `.page-info` |
| 图片放大 | `plugin-photo-swipe` | 默认开（点击 lightbox） |

设计 token 现状（index.scss `:root`）：`--rn-radius-card:16px / --rn-radius-media:12px`，accent `#5e6ad2`（Linear 靛紫，与 homepage 统一），字体走 `--vp-font / --vp-font-heading / --vp-font-mono`。

### 0.2 ⚠️ 最大约束：迁移文章走 `v-html`，markdown 增强管线对它无效【源码】

`config.ts` 里 `safe-migrated-markdown-sfc` 插件把迁移文章的正文整体塞进 `<div class="vp-migrated-content" v-html="...">`，且 `markdown-safe-html` 插件把 `options.html=false` 并转义 `{{ }}`。后果：

- **theme-hope 的 markdown 增强（`figure`/`attrs`/callout/`code-tabs`/`Badge`/`VPCard` 等）对 529 篇迁移文章基本不生效**——它们只是被高亮过的裸 HTML。callout/图注/首字下沉等"富元素"若靠 markdown 语法，只对**新写的原生 md 文章**有效。
- 因此本报告的"富元素"建议要分两类：① **纯 CSS 选择器层**（对 `.vp-migrated-content` 里的 `blockquote/pre/table/h2/img` 一样生效，收益覆盖全部 529 篇）；② **markdown 组件层**（只惠及未来新文章）。**优先级排序时 CSS 层永远排前面**。
- 结论：文章页升级的主力是 **`styles/index.scss` 的选择器定制 + frontmatter + 少量 slot 组件**，而非 markdown 插件开关。

### 0.3 theme-hope 可用的落地手段【交叉/文档】

- **frontmatter**：`cover`（封面图，主要用于列表卡；文章页顶部 hero 需自定义）、`article`/`isOriginal`/`author`/`date`/`category`/`tag`/`readingTime` 影响 `.page-info`。
- **`pageInfo` 配置**：控制 `.page-info` 显示哪些项及顺序（`["Author","Original","Date","Category","Tag","ReadingTime","Word","PageView"]`）。**config-only**。
- **`toc` / `headerDepth`**：控制侧栏目录深度。
- **slots / 客户端布局覆盖**：theme-hope 允许 `defineClientConfig` + `layouts` 覆盖，或用布局插槽（`top`/`bottom`/`contentBefore`/`contentAfter` 一类）注入自定义 hero/尾注组件——**需在实现前对当前 rc.106 版本核验插槽名**【推测，待 dev 验证】。

---

## PART 1 —— 文章头部 / masthead（kicker · 标题 · dek · byline · hero）

**标杆共识（编辑设计固定语序，自上而下）**【文档/交叉】：
`kicker/eyebrow（栏目标签）→ H1 标题 → deck/dek（导语副标）→ byline（作者+日期+阅读时长 meta 行）→ hero 封面`。首屏元素顺序必须固定统一，正文段落顺序才可变。

具体可落地数值：

| 元素 | 可采纳规格 | 来源/可信度 |
|---|---|---|
| **kicker/eyebrow** | 栏目/系列名，`0.72–0.82rem`、大写 + `letter-spacing:.08–.16em`、mono 或 muted 色、**不与标题争视觉**（tertiary） | 【交叉】eyebrow 定义；本仓 homepage `.kinger-hero__eyebrow` 已是此风 |
| **H1 标题** | 编辑级用大字号：`clamp(2rem, 1.2rem+3vw, 3.5rem)` 级别；`line-height 1.1–1.15`、`letter-spacing -.02em`（现 index.scss 已给 h1 `-0.02em`） | 【交叉】modular scale；h1 应比 h2/h3 压缩更狠以防移动端层级塌陷 |
| **deck/dek 导语** | 比正文大一档 `1.15–1.35rem`、muted 色、`line-height 1.5`、`max-width` 与正文同宽；一句话概括让读者不读全文也懂主旨 | 【文档】deck=standfirst/subhead |
| **byline meta 行** | 单行：作者 · 日期 · `N min read`（阅读时长常写成 "5 MIN READ"）；小字 `0.85–0.9rem`、muted、用 `·`/竖线分隔 | 【文档】byline + reading time |
| **hero/封面图** | 默认 **16:9**（1920×1080，WebP q80，200–400KB）；焦点居中留"安全区"；**full-bleed vs contained** 二选一——full-bleed 更影院感但需 `object-fit:cover`+移动端换图；contained（贴合正文列宽、圆角）更克制、与本仓 `--rn-radius-media` 一致 | 【交叉】hero 尺寸/安全区 |
| hero 叠加 | 若标题压在图上：底部 `linear-gradient(transparent→rgba(0,0,0,.6))` 渐变遮罩保证文字对比度 | 【交叉】full-bleed 文字可读性 |

> theme-hope 现状缺口：文章页**没有真正的 hero 区**（`cover` 只进列表卡）。`.vp-page-title` 字号偏小、无 kicker/deck 概念。→ **头部是本次最大提升点之一**，需 CSS 放大 `.vp-page-title` + 自定义 hero 组件（见 PART 9）。

---

## PART 2 —— 阅读列（measure · 字号 · 行高 · 段距）

**核心数值共识**【文档/交叉】：

- **measure（每行字符数）**：拉丁文 **50–75 CPL、66 为甜点**（Bringhurst 45–75）；WCAG 上限拉丁 ≤80、**CJK ≤40 全角字符**。
- **正文字号**：Web 底线 16px；**长文编辑级普遍 18–21px**（Medium 默认 18–21，其案例称 21px 正文使阅读时长 +40%）。
- **行高**：拉丁 1.4–1.6（unitless）；iA 建议屏幕比印刷多给一点，**140% 为基准**。中文长文可到 **1.7–1.8**（现 index.scss 用 1.8，合理）。
- **对齐**：一律 **flush-left（左对齐）**，禁两端对齐（Web 断词差）。
- **测量单位坑（CJK 关键）**【交叉】：`ch` = 字符 "0" 宽 ≈ 半个全角字，**用 `ch` 控中文列宽会翻倍失真**。中文应用 `em`/`rem`/`px` 或 `40–45em`。

**本仓换算**：现 `#markdown-content max-width:46rem`（=736px），默认 16px 下中文 ≈ 46 全角/行（略超 40 理想），拉丁 ≈ 90+/行（贴 WCAG 上限）。

**建议落点**：
1. 正文字号 **16→17–18px**（`font-size:1.0625–1.125rem`）——单点最高性价比之一，覆盖全部 529 篇。
2. 列宽 **46rem → ~40–44rem**（中文约 38–44 全角/行更舒适）；或用 `min(92vw, 42rem)`。
3. 保留 `line-height:1.8`（中文）；给英文/代码混排可 1.7。
4. 段距 `p { margin-block: 0 1em~1.2em }`（现已有 p 定制，确认段距≥1em）。

**偏移列（给边注留白）**【交叉/Tufte】：编辑级页面常把正文列**不居中、左偏**，右侧留 ~250–300px 放 sidenote/图注（见 PART 4.6）。这是"编辑感"与普通博客的分水岭之一，但成本高、且对 v-html 迁移文难施加。

---

## PART 3 —— 纵向节奏与标题层级

**共识**【文档/交叉】：

- **modular scale**：基准 1rem + 比率（1.2 Minor Third / 1.25 / 1.333 Perfect Fourth）逐级放大；比率越大越"大胆"。
- **fluid + clamp()**：`clamp(min, 计算式, max)` 平滑缩放，免断点；浏览器支持 >90%。
- **防层级塌陷**：H1 移动端应比 H2/H3 **压缩更狠**（非对称 clamp），或在字号趋同时用 **font-weight/letter-spacing** 补层级差。
- **space-before > space-after**：标题上间距大于下间距（标题与下文成组）。常用 `margin-block: 2×rhythm  1×rhythm`（h1）、`1.5× 0.5×`（h2）、`1× 0.5×`（h3）。基准 rhythm 单位 ~1.5rem。
- **fluid 间距**：字号 fluid 了，标题上间距也要 fluid（tie 到 rhythm 变量），否则大标题配固定 48px 会失衡。
- **section 分隔**：h2 细线分隔（现 index.scss 已给 h2 `border-bottom`，✅ 保留）；`<hr>` 可做成居中三点/短横或加大留白而非默认整宽实线。

**本仓落点**：把 h2/h3/h4 的 `font-size` 换成 clamp 值 + 统一非对称 `margin-block`（见 PART 10 spec）。现 index.scss 有 `h2 margin-top / h3 margin-top:1.6em` 但零散，建议收进 token 化 rhythm。

---

## PART 4 —— 富元素（引用 · 图注 · 首字 · 列表 · 表格 · 代码 · callout · 边注）

### 4.1 Pull-quote（拉引 / 抽言）【交叉】
- 字号 **正文 1.5–2×**，display serif 或 accent 色；放在栏断/网格交点，可 `float`/grid 定位跨列。
- **每 800–1000 字最多一个**，多则失效。
- theme-hope 无原生 pull-quote → markdown 组件（新文）或约定 class（`.pullquote`）+ CSS。

### 4.2 Blockquote（普通引用）【源码/交叉】
- 现状：左边框 3px accent + `--vp-c-bg-alt` 底 + muted 字（index.scss:250）。合格。
- 增强：加大内边距、引号装饰（`::before` 大号 `"`）、italic 可选。

### 4.3 figure + caption（图 + 图注）【交叉】
- caption `0.85–0.9× 正文`、`line-height 1.4`、muted 但 **WCAG 合规对比度**、居中、与图有 `.4–.6em` 间距。
- 现 `img` 已圆角+阴影。补 `figure > figcaption` 样式即可（CSS 层，对 v-html 也生效，只要迁移 HTML 里有 `<figure>`）。

### 4.4 首段 lead / drop-cap（首字下沉）【文档/交叉】
- drop-cap = "从这里开始读"的强入口信号。用 `::first-letter`，2–3 行高。
- **坑**：`::first-letter` 跨浏览器 line-height 不稳、窄屏挤占横向空间 → **仅在 ≥某宽度启用，移动端退化为放大首字或取消**。
- lead 首段：可放大 `1.1–1.2×` 或加重，做"导语感"。
- CJK 首字下沉观感一般，**建议慎用/仅英文文章**【推测】。

### 4.5 列表 / 表格【交叉】
- 列表：`li` 行高同正文 1.8（现已给）；marker 用 accent 色；嵌套缩进克制。
- 表格：斑马纹或仅底线（编辑风偏"少边框"）；表头加重 + 底部 2px 线；`overflow-x:auto` 包裹防溢出；caption 小字。

### 4.6 inline code & 代码块【源码/交叉】
- inline：现用 `--vp-c-accent-soft` 底 + 边框 + `0.88em`（index.scss:241）。合格。
- 代码块增强标配（Josh Comeau / Vercel / MkDocs 共识）：**① filename 标签（左上）② 复制按钮（右上，服务端渲染避免 CLS）③ 行号 ④ 行高亮 ⑤ 语言标 ⑥ 键盘可聚焦 `tabindex=0`**。
  - theme-hope 已有 `plugin-copy-code`（复制）；filename/行号/高亮靠 markdown code fence 语法——**对 v-html 迁移文无效**，只惠及新文。
  - CSS 层可做：代码块圆角（现有 `--code-border-radius`）、macOS 三点、滚动条美化。
- 关键工程点：**编译期高亮（Shiki）优于运行时（Prism）**——无 bundle 膨胀、无布局抖动。theme-hope 默认 Shiki，✅。

### 4.7 callout / admonition（提示框）【交叉】
- 三要素：**① 语义色 ② 前置图标 ③ 左色边（`border-left:4px`，GitHub alert 风）**。类型：note/tip/info/warning/danger/success。
- 用 `--admonition-color` 变量驱动边框+图标（`currentColor`）+ 淡背景，一套模板多色。
- **克制使用**、内容 1–3 句、放在所指内容之后（前置仅当读者需先知才能安全操作）。
- 可折叠用 `<details>`（无 JS）。
- theme-hope 有内置 hint/container（`::: tip` 等），但**对 v-html 迁移文无效**；CSS 层可统一美化其容器 class。

### 4.8 footnotes / sidenotes（脚注/边注）—— "编辑感"天花板【文档/交叉】
- **Tufte 边注**：把脚注移到右侧页边，不打断阅读视线。大屏用 margin 放 sidenote(编号)/margin-note(无编号)；小屏隐藏，点 label 展开（**checkbox trick 无 JS**）。
- 实现：`float:right; clear:right; width:250px; margin-right:-280px`（负边距拉进页边）——**需正文列左偏留出右边距**（呼应 PART 2 偏移列）。
- **坑**：float hack 无法跨 block 元素逃逸、长边注不换页；多且长的边注建议 JS 方案（sidenotes.js）。
- 成本高 + 对 v-html 难施加 → **列为"雄心项"，非首批**。折中：先做像样的底部脚注区 + 锚点回跳。

---

## PART 5 —— 导航辅助（TOC scroll-spy · 阅读进度 · 回顶 · 锚点）

**共识**【交叉】：

| 部件 | 做法 | theme-hope 现状 |
|---|---|---|
| **粘性 TOC + scroll-spy** | grid 侧栏 `position:sticky; top:...; align-self:start`；`IntersectionObserver` + 负 `rootMargin`（如 `0px 0px -50% 0px`）切 `.active`；`aria-current`；点击平滑滚动 | ✅ 已有（`plugin-active-header-links`），**只需美化**：active 项 accent 竖条/加重、层级缩进 |
| **阅读进度条**（≠路由进度） | sticky 顶条，宽=滚动百分比；可按 h2 分段。纯 CSS（scroll-driven `animation-timeline:scroll()`）或 IntersectionObserver | ❌ **缺**（`plugin-nprogress` 只是路由加载条）→ 小组件/纯 CSS 补 |
| **回到顶部** | 滚动出现的浮钮 | ✅ `plugin-back-to-top` |
| **标题锚点** | hover 显示 `#` 链接、可复制 | theme-hope 有 header anchor，**美化 hover 态即可** |

**建议**：TOC active 态美化（CSS，低成本高感知）+ 阅读进度条（纯 CSS scroll-timeline，无依赖）是本区最优两笔。

---

## PART 6 —— 尾部（标签 · 作者卡 · 上/下篇 · 相关 · 评论）

**共识**【交叉】（"article footer"模式）：

- **上/下篇导航**：必须**带相邻文章标题**（非"上一篇/下一篇"裸标签），可 scope 到同分类/同标签更相关。theme-hope 博客默认有 prev/next。
- **相关文章**：卡片式（图+标题+一行 meta+一个动作），Casper 取最近 3 篇 / Headline 取同标签——**同标签更topical**。**避免卡片信息过载**（>需缩到 14px 以下就是塞太多）。
- **作者卡**：头像 + 名 + 简介，置正文末尾，建信任。
- **标签**：keyword chip 链接，跳同标签聚合。
- **评论**：theme-hope 支持 Waline/Giscus 等（config 里现被注释）→ 见 frontend-polish-survey。
- 无障碍：所有卡片键盘可达。

**theme-hope 落点**：多数尾部件博客布局已内建，主要是**样式统一 + prev/next 带标题 + 相关文章按 tag**（config `pageInfo` + 少量 CSS）。

---

## PART 7 —— 动效（何时用，何时别用）

**共识**【文档/交叉】：

- **默认克制**：动效只为"增进理解"，非装饰。scroll reveal 用 `IntersectionObserver`（非 scroll 监听）+ GPU 属性（`transform/opacity`）。
- **必须 `prefers-reduced-motion`**：reduce 时移除位移/时长（设 `0.01ms` 而非 0，保 `transitionend`）；若动效承载信息（如渐显才可见的提示）则保留静态可见兜底。本仓 homepage 已尊重 reduced-motion（frontend-polish 报告），文章页需同标准。
- **别用**：缩放/平移大对象是**前庭触发**（眩晕）——**图片 zoom 尤其要尊重 reduced-motion**；闪烁/多次弹跳（>3）可致癫痫。
- **图片 zoom/lightbox**：theme-hope `plugin-photo-swipe` 已提供。确保：焦点陷阱、Esc 关闭、可见关闭键、屏幕阅读器可达；zoom 不超过原图实际尺寸。
- **WCAG**：交互触发动效可关（除非必要）；自动动效 >5s 且与内容并行须可暂停。
- **文章页建议**：正文**几乎不要 reveal 动画**（打断阅读）；仅 hero 首屏一次淡入、TOC active 平滑、代码复制反馈这类"点缀"，全部 reduced-motion 兜底。

---

## PART 8 —— 标杆速查（signature moves）

| 站点 | 招牌动作（可借鉴点） | 可信度 |
|---|---|---|
| **iA / iA Writer** | 屏幕行高 140% 基准；responsive typography；朴素高可读 | 【文档】ia.net/topics/responsive-typography-the-basics |
| **Josh Comeau** | 自定 Sidenote 组件；Shiki 编译期高亮 + 友好可复制代码块；CSS 变量驱动；克制 | 【文档】joshwcomeau.com/blog/how-i-built-my-blog-v2 |
| **Stripe blog** | 窄阅读列 + Söhne 字 + 招牌渐变 + craft 阴影；CSS Grid；字体≤3 种 | 【交叉】stripe.design |
| **Ghost Casper** | post-card + read-next 3 篇（可改同作者/同标签）；作者卡（头像+名+bio）置文末 | 【文档】ghost.org/tutorials/read-next |
| **Tufte CSS** | 页边 sidenote/margin-note；checkbox trick 无 JS 移动端折叠 | 【文档】edwardtufte.github.io/tufte-css |
| **Medium** | 18–21px 正文；卡片相关；极简 chrome | 【交叉】 |
| **Awwwards Editorial** | 网格纪律=权威感；drop-cap 入口；pull-quote 奖励扫读者；Editorial New 字体流行 | 【交叉】awwwards.com editorial 合集 |

---

## PART 9 —— 优先级清单（impact ÷ effort，映射 theme-hope）

图例：**类型** = `config`(仅配置) / `CSS`(styles/index.scss 选择器) / `组件`(slot/自定义组件) / `frontmatter`。**覆盖** = 全量(含 v-html 迁移文) / 仅新文。

### 🥇 第一批（高性价比，CSS/config 为主，覆盖全量）
| # | 动作 | 类型 | 覆盖 | 影响 | 成本 |
|---|---|---|---|---|---|
| 1 | **正文字号 16→17–18px + 列宽收到 ~40–44rem**（token 化 measure/字号，含 CJK 上限校准） | CSS | 全量 | ★★★★★ | XS |
| 2 | **放大 `.vp-page-title` + h1/h2/h3 换 clamp 模块化字阶 + 统一非对称 space-before**（token 化 rhythm） | CSS | 全量 | ★★★★★ | S |
| 3 | **`.page-info` meta 行重排**（作者·日期·`N min read` 单行、muted、分隔符）+ `pageInfo` 配置精简顺序 | config+CSS | 全量 | ★★★★ | XS |
| 4 | **TOC scroll-spy active 态美化**（accent 竖条/加重/层级缩进） | CSS | 全量 | ★★★★ | S |
| 5 | **figure/figcaption + 表格 + hr + 列表 marker** 编辑级样式 | CSS | 全量 | ★★★ | S |
| 6 | **代码块外观**（圆角/滚动条/可选 macOS 三点）+ 确认复制按钮态 | CSS | 全量 | ★★★ | S |
| 7 | **阅读进度条**（纯 CSS `animation-timeline:scroll()`，无依赖，reduced-motion 兜底） | CSS/组件 | 全量 | ★★★ | S |

### 🥈 第二批（组件/frontmatter，中成本，感知强）
| # | 动作 | 类型 | 覆盖 | 影响 | 成本 |
|---|---|---|---|---|---|
| 8 | **文章 hero 头部组件**（kicker + 大标题 + deck + byline + `cover` 封面 16:9/圆角），经布局 slot 注入 | 组件+frontmatter | 全量(需回填 frontmatter) | ★★★★ | M |
| 9 | **尾部区**：prev/next 带标题 + 相关文章按 tag（3 篇卡）+ 作者卡 + 标签 chip 统一样式 | config+CSS | 全量 | ★★★ | M |
| 10 | **callout/admonition 统一美化**（三要素：色+图标+左边框；`--admonition-color` 变量） | CSS(+md 新文) | 容器类全量 | ★★★ | M |
| 11 | pull-quote / blockquote 增强（引号装饰、accent） | CSS+md | blockquote 全量 | ★★ | S |

### 🥉 第三批（雄心项，高成本，仅新文/需大改）
| # | 动作 | 类型 | 覆盖 | 影响 | 成本 |
|---|---|---|---|---|---|
| 12 | **Tufte 页边 sidenote/margin-note**（正文左偏 + 右边距 + checkbox 折叠） | 组件+CSS | 仅新文 | ★★★ | L |
| 13 | **drop-cap 首字下沉**（仅英文、仅宽屏、`::first-letter`） | CSS | 仅英文文 | ★ | S |
| 14 | 代码块 filename tab / 行号 / 行高亮（md fence 语法） | md | 仅新文 | ★★ | M |
| 15 | 评论系统接入（Waline/Giscus） | config | 全量 | ★★ | M（见 frontend-polish） |

> 建议 dev 先做 **1→7 全部（一轮 CSS token 化重写 index.scss 正文段）**，收益覆盖全部 529 篇且零风险；再挑 8/9 组件项。第三批按需。

---

## PART 10 —— 可落地"编辑级文章页" CSS spec（token 草案）

> 供 dev 直接改写 `blog/src/.vuepress/styles/index.scss` 的正文段（现 line 185+）。数值经 CJK 校准；accent 复用现有 `#5e6ad2` 体系。**这是建议 spec，非最终代码**。

```scss
:root {
  /* —— 阅读列 measure（CJK 校准：目标 36–44 全角/行）—— */
  --read-measure: 42rem;          /* ≈ 672px；比现 46rem 收窄 */
  --read-font-size: 1.0625rem;    /* 17px：16→17，长文更舒展 */
  --read-line-height: 1.8;        /* 中文长文，保留现值 */

  /* —— 模块化字阶（Perfect Fourth ~1.25，fluid clamp）—— */
  --step-title: clamp(2rem, 1.2rem + 3vw, 3.25rem);   /* H1/页标题，压缩最狠 */
  --step-h2:    clamp(1.5rem, 1.2rem + 1.4vw, 2rem);
  --step-h3:    clamp(1.25rem, 1.1rem + 0.8vw, 1.5rem);
  --step-dek:   clamp(1.1rem, 1rem + 0.5vw, 1.3rem);  /* 导语 */

  /* —— 纵向节奏单位 —— */
  --rhythm: 1.5rem;
}

/* 页标题放大 + 收紧 */
.vp-page-title {
  font-size: var(--step-title);
  line-height: 1.12;
  letter-spacing: -0.02em;
  font-family: var(--vp-font-heading);
}

[vp-content] #markdown-content {
  max-width: var(--read-measure);
  font-size: var(--read-font-size);
  line-height: var(--read-line-height);

  p, li { line-height: var(--read-line-height); }
  p { margin-block: 0 1.1em; }

  h2 {
    font-size: var(--step-h2);
    line-height: 1.25;
    letter-spacing: -0.01em;
    margin-block: calc(var(--rhythm) * 1.6) calc(var(--rhythm) * 0.55);
    border-bottom: 1px solid var(--vp-c-divider);   /* 保留现有分隔 */
    padding-bottom: 0.3em;
  }
  h3 {
    font-size: var(--step-h3);
    line-height: 1.35;
    margin-block: var(--rhythm) calc(var(--rhythm) * 0.5);
  }

  /* 图注 */
  figure > figcaption {
    font-size: 0.875em;
    line-height: 1.5;
    color: var(--vp-c-text-mute);
    text-align: center;
    margin-top: 0.5em;
  }

  /* 分隔线：留白 + 短居中，去整宽实线 */
  hr {
    border: 0;
    margin-block: calc(var(--rhythm) * 2);
    text-align: center;
  }

  /* 表格：少边框编辑风 */
  table { width: 100%; }
  th { border-bottom: 2px solid var(--vp-c-divider); }
  td { border: 0; border-bottom: 1px solid var(--vp-c-divider); }
}

/* 阅读进度条（纯 CSS 滚动时间轴；不支持则自然降级为无） */
@supports (animation-timeline: scroll()) {
  .reading-progress {           /* 需在布局顶层加一个空条元素/伪元素 */
    position: fixed; inset: 0 auto auto 0; height: 3px; width: 100%;
    transform-origin: 0 50%;
    background: var(--vp-c-accent, #5e6ad2);
    animation: read-progress linear both;
    animation-timeline: scroll(root block);
    z-index: 30;
  }
  @keyframes read-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
}

@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

**CJK 校验**：`--read-measure:42rem` @ 17px ≈ 每行 ~39 全角字（≤40 WCAG 理想）/ ~78 拉丁字（≤80 上限）。✅
**移动端**：`#markdown-content` 本已 `max-width` 收敛；小屏 `--read-measure` 自动被 `92vw` 类约束，clamp 已处理字阶下限。

---

## Sources（附可信度）

正文数值/共识：
- Baymard《Readability: The Optimal Line Length》 https://baymard.com/blog/line-length-readability 【文档】
- USWDS Typography（45–90 CPL，66 目标，flush-left）https://designsystem.digital.gov/components/typography/ 【文档】
- Pimp my Type《ideal line length & line height》 https://pimpmytype.com/line-length-line-height/ 【文档】
- UXPin《50–75 char rule》 https://www.uxpin.com/studio/blog/optimal-line-length-for-readability/ 【交叉】
- iA《Responsive Typography: The Basics》(140% 行高) https://ia.net/topics/responsive-typography-the-basics 【文档】
- Smashing《Size Matters: Line Length & Font Size》 https://www.smashingmagazine.com/2014/09/balancing-line-length-font-size-responsive-web-design/ 【文档】
- CSS-Tricks《Designing for Long-Form Articles》 https://css-tricks.com/designing-for-long-form-articles/ 【文档】

字阶/节奏：
- Utopia《CSS-only fluid modular type scales》 https://utopia.fyi/blog/css-modular-scales/ 【文档】
- CSS-Tricks《Fluid Typography》 https://css-tricks.com/snippets/css/fluid-typography/ 【文档】
- 24ways《Compose to a Vertical Rhythm》 https://24ways.org/2006/compose-to-a-vertical-rhythm/ 【文档】
- Webtypography.net 2.2.1（leading 选择）http://webtypography.net/2.2.1 【文档】

头部/hero：
- MetLife DS Article Hero (eyebrow+title+readtime+byline) https://design.metlife.com/resources/responsive-web/components/article-page-header/article-hero-default-with-byline/ 【文档】
- CrazyEgg/HubSpot hero 尺寸(16:9,1920×1080) https://www.crazyegg.com/blog/hero-image-size/ 【交叉】
- Helen Yentus《Drop Caps in Editorial》 https://hyentus.com/blog/how-to-use-drop-caps-effectively-in-editorial-design 【文档】
- CreativePro《Pull Quotes》 https://creativepro.com/how-to-attract-attention-pull-quotes/ 【文档】

富元素/代码/callout/边注：
- Josh Comeau《How I Built My Blog v2》(Shiki/Sidenote/代码块) https://www.joshwcomeau.com/blog/how-i-built-my-blog-v2/ 【文档】
- Tufte CSS https://edwardtufte.github.io/tufte-css/ ｜Gwern《Sidenotes》 https://gwern.net/sidenote 【文档】
- MarkdownTools《Admonitions & Callouts》 https://blog.markdowntools.com/posts/markdown-admonitions-callouts-complete-guide 【文档】
- MkDocs Material Code blocks（filename/copy/行号）https://squidfunk.github.io/mkdocs-material/reference/code-blocks/ 【文档】
- roboleary《copy-to-clipboard 按钮》(SSR 避免 CLS/可聚焦) https://www.roboleary.net/2022/01/13/copy-code-to-clipboard-blog 【文档】

导航/尾部/动效：
- CSS-Tricks《Sticky TOC with Scrolling Active States》 https://css-tricks.com/sticky-table-of-contents-with-scrolling-active-states/ 【文档】
- Sara Soueidan《CSS-only scrollspy》 https://www.sarasoueidan.com/blog/css-scrollspy/ 【文档】
- Ghost《read-next section》 https://ghost.org/tutorials/read-next/ 【文档】
- MDN《prefers-reduced-motion》 https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion 【文档】
- web.dev《Animation and motion》 https://web.dev/learn/accessibility/motion 【文档】
- NN/g《Overuse of Overlays/Lightboxes》 https://www.nngroup.com/articles/overuse-of-overlays/ 【文档】

标杆：
- Stripe Design study https://stripe.design/ 【交叉】
- Awwwards Editorial 合集 https://www.awwwards.com/inspiration/editorial-layout 【交叉】

内部（本仓）：`blog/src/.vuepress/{theme.ts,config.ts,styles/index.scss}`、`blog/node_modules/vuepress-theme-hope/dist/client/styles/**`【源码】
```
