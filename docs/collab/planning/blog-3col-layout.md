# 博客三栏布局重构 — 规划

> 目标：把当前单栏博客改造成 theme-hope 风格的"导航栏 + 左分类栏 + 中正文 + 右 TOC"三栏布局，保留现有珊瑚红浅色配色。
> 状态：策划稿，待 dev 评审并落任务板。planner 只读探查 + 写规划，不改源码。
> 探查日期：2026-07-23。基于 astro-site 现有代码（Astro 5 API / Tailwind v4 / content collections）。

---

## 0. 探查结论（现状事实，实现前先认这些）

### 页面/布局现状
- `src/pages/blog/index.astro` — 列表页：顶部渐变头图 + 分类 chip 前端筛选 + 单列卡片。`getCollection("posts")` 过滤 draft、按 `title` 的 `localeCompare(…, "zh")` 排序（**代码注释明确：date 不可靠，故按标题排**）。分类 chip 取自 `posts.flatMap(p => p.data.category)` 去重。
- `src/pages/blog/[...slug].astro` — 文章页：rest 路由，`getStaticPaths` 用 `params:{ slug: post.id }`、`props:{ post }`；`render(post)` 取 `{ Content }`（**目前没取 headings**）。单栏 720px，顶部阅读进度条 + 渐变头图 + `.prose` 全局排版。
- `src/layouts/BaseLayout.astro` — 基座：head/字体(Inter)/KaTeX CSS/referrer meta；`theme` prop 切 `data-theme`（dark=void 底，light=白底）。`<body>` 只有一个默认 `<slot/>`，无 head slot 之外的结构。博客页传 `theme="light"`。
- `src/components/Nav.astro` — 落地页导航，**深色专用**（透明→`rgba(8,9,10,.6)` 毛玻璃，用 `--color-fg/--color-muted` 深底浅字 token）。链接：博客 / #features / AI 助手(`SITE.aiUrl`)。博客页目前**没用**它，博客靠"← 返回"链接导航。

### 数据层现状（关键）
- **Content schema**（`src/content.config.ts`）：glob loader，`id` 自动 slugify（含目录路径，如 `agent-development/ai大模型/transformer架构`）。`category` 经 `strArray` 归一成 `string[]`（标量也接受）。有 `draft`(默认 false)、`description?`、`date`(coerce Date)、theme-hope 专有字段(icon/tag/order/sticky/star/cover 全可选保留)。
- **分类是 frontmatter 值，不是目录**：抽样 `transformer架构.md` → `category: "Agent 开发"`（中文显示名）。而磁盘目录是英文顶层 slug + 中文子目录（`agent-development/ai大模型/…`）。→ **分类树按 `data.category` 分组，不要用目录路径。**
- **URL**：`/blog/${post.id}/`，id 含斜杠与中文（rest 路由天然支持）。
- **规模**：529 篇 md（含 78 draft）→ 451 篇 published 上线。分 12 个中文分类。

### 锚点/TOC 的技术事实（已确认，省去一个坑）
- **Astro 默认就给 h2–h6 生成 `id`**（内置 `rehypeHeadingIds`，github-slugger），且 `render()` 返回的 `headings: { depth, slug, text }[]` 里的 `slug` **与 DOM 里的 `id` 完全一致**。→ TOC 链接用 `#${heading.slug}` 必然对得上，**不需要额外装 rehype-slug**。中文标题 slugger 会保留 CJK 字符、去空格标点（例：`## 1. 核心设计思想` → `id="1-核心设计思想"`）。
- `astro.config.mjs` 当前 markdown 配置：remark-math + rehype-katex + Shiki `github-light`。**没有** heading 插件改动 → 上面的默认行为成立。
- `global.css`：`html { scroll-behavior: smooth }`，已在 `prefers-reduced-motion` 下改回 auto。**注意**：加了固定顶栏后，锚点跳转要给标题加 `scroll-margin-top`，否则标题被顶栏遮住。

### 配色 token 现状
- `@theme` 里只有**深色** token（void/accent/brand 等）。博客浅色的颜色是**硬编码散在两个页面**里：链接 `#eb3b54`、品牌渐变 `#5e6ad2→#f5455c`、底灰 `#fafbfc`、发丝线 `#eef0f2`、正文 `#24292f/#1f1f1f`、次要 `#5f6368/#8a8f98`、cat 徽标 `rgb(245 69 92 / 10%)`。
- → 三栏新组件要用**同一套浅色值**。建议（见 S1）抽一份浅色 CSS 变量集中管理，避免 5 个组件各写一遍 `#eb3b54`。

---

## 1. 目标架构

```
┌───────────────────────────────────────────────────────────┐
│  BlogNav（浅色顶栏，fixed）  logo · 主页 · 博客 · AI助手      │
├──────────────┬──────────────────────────────┬─────────────┤
│ CategorySide │  Breadcrumb 首页>分类>文章       │  TableOf    │
│  bar         │  ─────────────────────────────  │  Contents   │
│  (12 分类     │  <h1> 标题 + 分类徽标            │  (h2/h3     │
│   可展开      │  .prose 正文 <Content/>          │   scroll-   │
│   当前高亮)   │  ─────────────────────────────  │   spy 高亮) │
│  sticky      │  PostNav  ← 上一篇 | 下一篇 →     │  sticky     │
├──────────────┴──────────────────────────────┴─────────────┤
```
- **文章页**：三栏（左 sidebar + 中正文 + 右 TOC）。
- **列表页**：两栏（左同款 sidebar + 右卡片列表），保留现有 chip 筛选或改为 sidebar 驱动（见开放问题 Q3）。
- **响应式**：宽屏三栏 → 中屏收 TOC → 窄屏折叠左栏为抽屉。

---

## 2. 组件拆分

新增组件放 `src/components/blog/`（与落地页组件区分）。每个职责单一、数据从上游 props 传入（页面负责取数，组件只渲染）。

| 组件 | 职责 | props | 数据来源 |
|---|---|---|---|
| `BlogNav.astro` | 浅色顶栏（复刻 Nav 的结构与滚动玻璃化，但浅色配色：白/浅灰底、深字、珊瑚红 hover）。链接：主页`/` · 博客`/blog/` · AI助手`SITE.aiUrl` | `active?: "blog"`（可选高亮） | `SITE`（config.ts） |
| `CategorySidebar.astro` | 左栏。渲染 12 分类，每个分类可展开看该类文章列表；当前文章/当前分类高亮 | `tree: CategoryNode[]`, `currentId?: string`, `currentCat?: string` | 页面调 `getCategoryTree()`（见 §3） |
| `TableOfContents.astro` | 右栏。从 headings 渲染 h2/h3 目录，点击跳转，scroll-spy 高亮。headings 为空时不渲染（或渲染占位，见 Q4） | `headings: MarkdownHeading[]` | 文章页 `render()` 返回的 `headings` |
| `Breadcrumb.astro` | 面包屑：首页 > 分类 > 文章标题 | `category?: string`, `title: string` | 文章页 `post.data` |
| `PostNav.astro` | 正文底部上一篇/下一篇（同分类内相邻） | `prev?: {title,id} \| null`, `next?: {title,id} \| null` | 页面调 `getAdjacentPosts()`（见 §3） |
| `BlogShell.astro`（可选） | 三栏 grid 骨架容器，吃具名 slot（`sidebar`/`default`/`toc`），封装 grid + 响应式 + sticky | slot only | — |

**复用判断**：`Nav.astro` 深色耦合太深（token + 玻璃底色），**不改造复用，另写 `BlogNav`**（结构/滚动脚本可照抄，配色换浅色）。这样落地页/博客各自独立演进，互不打架。`Reveal.astro`（列表页入场动画）可继续用。

---

## 3. 数据准备（抽一个共享模块 `src/lib/blog.ts`）

页面里散着取数逻辑会重复（列表页、文章页都要分类树）。抽成一个纯函数模块，页面调用即可。**都在 build 期跑（SSG），零运行时开销。**

```ts
// 伪代码，供 dev 实现参考
import { getCollection, type CollectionEntry } from "astro:content";

// 统一：published + 排序（复用现有约定：draft 过滤 + title zh 排序）
export async function getPublishedPosts(): Promise<CollectionEntry<"posts">[]>;

// 分类树：按 data.category[0] 分组（多分类取首个为主归属，见 Q2）
// 返回 [{ name: "Agent 开发", count, posts: [{id,title}] }, ...]
// 分类顺序：建议给一个固定顺序数组（见 Q1），未列到的排末尾
export function getCategoryTree(posts): CategoryNode[];

// 同分类相邻：在该分类的已排序列表里找 current 的前后
export function getAdjacentPosts(posts, current): { prev, next };
```

- **分类树**：`getCategoryTree` 一次算好（12 组）。文章页/列表页各自 import 调用，**不要每页重复 getCollection 全表**（虽然 Astro 有缓存，但集中一处更清晰）。
- **TOC 数据**：文章页把 `const { Content, headings } = await render(post)` 里的 `headings` 传给 `TableOfContents`。**过滤 depth**：只留 `depth === 2 || depth === 3`（h2/h3），h1 是标题不进 TOC。
- **上下篇**：`getAdjacentPosts` 用与列表**同一套排序**（title zh），在当前文章所属分类的子列表里取相邻。跨分类不连（theme-hope 语义：同栏目内翻页）。

---

## 4. 布局实现（CSS Grid + 响应式）

### 结构嵌入方式
两条路线，**推荐 A**：
- **A（推荐）**：文章页/列表页各自在 `BaseLayout` 的默认 slot 里放一个三栏/两栏 grid 容器（或用 `BlogShell` 封装）。BaseLayout 不动（它只管 head + body 底色），布局责任留在页面/Shell 层。改动面小、风险低。
- B：把三栏塞进 BaseLayout —— 不推荐，会污染落地页基座、增加耦合。

### Grid 骨架（文章页）
```css
.blog-grid {
  display: grid;
  grid-template-columns: 260px minmax(0, 760px) 220px;
  gap: 32px;
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 24px;
  align-items: start;      /* sticky 子项需要 */
}
.blog-sidebar, .blog-toc { position: sticky; top: 72px; max-height: calc(100vh - 88px); overflow-y: auto; }
```
- 顶栏 fixed 高 ~56–64px → 正文/sticky 列的 `top` 与 `scroll-margin-top` 都要留出这个量（用一个 `--nav-h` 变量统一）。
- 中栏 `minmax(0, 760px)` 保留现有 720–760px 舒适阅读宽度；`min-width:0` 防止代码块/表格撑破 grid。

### 响应式断点
| 断点 | 布局 |
|---|---|
| ≥ 1200px | 三栏（左 260 + 中 + 右 220） |
| 1000–1199px | 两栏（左 sidebar + 中正文），**收起右 TOC**（或降级为正文顶部可折叠 `<details>`） |
| < 1000px | 单栏正文；左 sidebar 折叠为**抽屉**（顶栏加汉堡按钮，点开滑入；TOC 隐藏或转顶部折叠块） |

- 列表页同理：≥1000px 两栏（sidebar + 列表），<1000px 单栏 + 抽屉。

### 左栏展开交互（优先零 JS）
- **推荐用原生 `<details>/<summary>`** 做分类展开/收起：无障碍、无 JS、reduced-motion 天然安全（不加高度动画就没有动效需守卫）。当前文章所属分类渲染成 `<details open>`。
- 若要加展开高度过渡动画 → 必须带 `@media (prefers-reduced-motion: reduce)` 守卫（项目硬规）。
- 窄屏抽屉的滑入/遮罩淡入 → 同样必须带 reduced-motion 守卫。

---

## 5. TOC 滚动高亮（scroll-spy）

**实现要点（IntersectionObserver 方案）：**
1. 文章渲染后，脚本 `querySelectorAll(".prose h2, .prose h3")` 拿到所有标题节点。
2. 建 `IntersectionObserver`，`rootMargin` 设成类似 `"-72px 0px -70% 0px"`（顶部扣掉 nav 高度，底部收窄，让"当前阅读区"聚焦到视口上部）。
3. 回调里维护"当前可见的最靠上标题"，给对应 TOC 链接加 `.active` 类，移除其它。
4. TOC 链接 `href="#slug"`，**点击默认锚点跳转即可**（不必自己写 scrollIntoView）；若自定义平滑滚动，必须在 reduced-motion 下退回瞬跳。
5. **标题被顶栏遮挡**：给 `.prose :is(h2,h3){ scroll-margin-top: var(--nav-h); }`，锚点跳转/scroll-spy 定位都对齐。

**reduced-motion 守卫（项目硬规，必须有）：**
- 高亮态若用 `transition`（颜色/左侧指示条位移）→ `@media (prefers-reduced-motion: reduce){ .toc a{ transition:none } }`。
- 全局 `scroll-behavior` 已在 reduced-motion 下改 auto（global.css 已有），自定义滚动别绕过它。

**边界**：无 h2/h3 的文章 → `headings` 过滤后为空 → **不渲染 TOC 列**（右栏 grid 位留白或收窄为两栏），脚本对空列表要早返回、不报错。

---

## 6. 步骤顺序（依赖 + 验收）

> 图例：`[并行]` 可与同批其它步并行；`←依赖` 前置。粒度=一条一个可认领产出。

### S0 · 浅色配色 token 收拢（地基，先做）
- 产出：把博客浅色值收进一处（`global.css` 里加 `[data-theme="light"]` 作用域变量，或新建 `src/styles/blog.css`）：`--blog-link/--blog-brand-grad/--blog-bg-soft/--blog-line/--blog-fg/--blog-muted/--blog-cat-bg/--nav-h` 等。
- 验收：现有两个页面改用变量后视觉零变化（可后置替换，但变量先定义好）。
- 说明：非强制先做，但先定 token 能让 S2–S5 五个组件不再各写 `#eb3b54`。**低风险、高杠杆，建议第一步。**

### S1 · 数据层 `src/lib/blog.ts` `[关键路径]`
- 产出：`getPublishedPosts` / `getCategoryTree` / `getAdjacentPosts` + 类型 `CategoryNode`。
- 验收：一个临时脚本或页面能打印出 12 分类 + 各自 count + 总数 451；相邻计算在边界（分类首/末篇）返回 null 不报错。
- 依赖：无（是 S3/S4/S5 的数据供给）。

### S2 · `BlogNav.astro` `[并行]`
- 产出：浅色顶栏 + 滚动玻璃化脚本（照抄 Nav 逻辑，配色换浅色，reduced-motion 守卫保留）。
- 验收：桌面/窄屏都正常；链接指向对；与正文不重叠（正文留 padding-top = nav 高）。
- 依赖：S0（用 token）。

### S3 · `CategorySidebar.astro` `[并行]` ←S1
- 产出：12 分类 `<details>` 列表，当前分类 open、当前文章高亮；count 徽标。
- 验收：给定 currentId/currentCat 能正确高亮；无 JS 也能展开（原生 details）。

### S4 · `TableOfContents.astro` + scroll-spy `[并行]`
- 产出：TOC 组件 + IntersectionObserver 脚本 + `scroll-margin-top`。
- 验收：多标题文章滚动时高亮跟随；点击跳转不被顶栏遮；空 headings 不渲染、不报错；reduced-motion 下无过渡。
- 依赖：S0（token/`--nav-h`）。

### S5 · `Breadcrumb.astro` + `PostNav.astro` `[并行]` ←S1(PostNav)
- 产出：面包屑（首页>分类>标题）+ 上下篇导航。
- 验收：无分类文章面包屑降级为"首页>文章"；分类首/末篇的上/下篇按钮不出现或置灰。

### S6 · 文章页 `[...slug].astro` 组装 `[串行]` ←S1,S2,S3,S4,S5
- 产出：改 `render` 取 `headings`；套三栏 grid（或 BlogShell）；接入 BlogNav/Sidebar/Breadcrumb/Content/PostNav/TOC；保留阅读进度条 + `.prose` 全局样式。
- 验收：抽样 5 篇（长文有 h2/h3、短文无 h2、深层目录、多分类、含 KaTeX/代码块）三栏渲染正常；锚点、上下篇、面包屑、返回都对。

### S7 · 列表页 `index.astro` 接入 sidebar `[串行]` ←S1,S2,S3
- 产出：左 sidebar + 右卡片列表两栏；顶栏换 BlogNav；chip 筛选去留见 Q3。
- 验收：分类切换/筛选正常；窄屏抽屉可用。

### S8 · 响应式 + 抽屉 + 全量 build 验证 `[串行]` ←S6,S7
- 产出：三档断点 + 窄屏抽屉（含 reduced-motion 守卫）；跑全量 `astro build`。
- 验收：451 页构建成功、无锚点/slug 报错；三档断点手测；Lighthouse/肉眼查无横向滚动溢出；抽查移动端抽屉开合。

**并行批次建议**：先 S0→S1；然后 S2/S3/S4/S5 四路并行（组件级，互不依赖）；再 S6、S7 串行组装；最后 S8 收口。

---

## 7. 风险与边界

| # | 风险 | 影响 | 缓解 |
|---|---|---|---|
| R1 | **每页都渲染整棵分类树** | 451 篇 × 侧边栏（若展开全部 451 条链接）→ 每页 HTML 膨胀（~20KB+ 原始）、build 更慢 | 侧边栏默认**只展开当前分类**（`<details open>` 仅当前，其余收起但链接仍在 DOM）；或**只渲染 12 个分类名**，文章列表点开按需（纯 details 仍在 DOM）。**建议**：先按"仅当前分类展开、全链接在 DOM"实现，实测单页 HTML 与 build 耗时，超标再改成分类页 `/blog/category/[cat]` 承载长列表。dev 落地时量一下 build 时间基线。 |
| R2 | **中文 slug 锚点** | TOC 跳转失效 / hash 编码问题 | 已确认 Astro headings.slug === DOM id，直接用即可；不手写 slugify。注意重复标题 github-slugger 会加 `-1` 后缀，headings 数组已含正确后缀，别自己重算。 |
| R3 | **TOC 为空**（无 h2/h3 的短笔记） | 右栏空白 / 脚本报错 | headings 过滤后为空 → 不渲染 TOC 列（grid 降两栏）；scroll-spy 脚本对空集早返回。抽样确认短笔记占比（很多单概念笔记无标题）。 |
| R4 | **顶栏遮挡锚点** | 点目录跳过去标题被 fixed nav 盖住 | `scroll-margin-top: var(--nav-h)` 加在 `.prose h2,h3`。 |
| R5 | **date 不可靠** | 若改用 date 排上下篇会乱序 | 沿用现有 title zh 排序（代码注释已说明 date 不可信），列表/上下篇/侧栏统一同一排序函数。 |
| R6 | **多分类文章归属** | 一篇挂多个 category 时侧栏出现在哪 | 决策见 Q2（建议主归属取 `category[0]`，或多处都出现）。 |
| R7 | **sticky 列超长** | 分类多/TOC 长时侧栏超出视口 | sticky 列设 `max-height: calc(100vh - nav)` + `overflow-y:auto`。 |
| R8 | **落地页/博客双 Nav 分叉** | 两个导航组件要各自维护 | 可接受（配色体系不同）；把共享的滚动脚本/链接数据抽 config，降低重复。 |
| R9 | **reduced-motion 遗漏** | 违反项目硬规 | 每个带 transition/animation 的新组件（BlogNav 玻璃化、抽屉滑入、TOC 高亮过渡、details 展开若加动画）逐一加守卫；S8 统一 checklist 复查。 |
| R10 | **图片防盗链 / KaTeX / 代码块** 在新 `.prose` 容器里 | 三栏后正文容器变了，全局 `.prose` 样式与 KaTeX/Shiki 需仍生效 | `.prose` 全局样式与 referrer meta 都在，保持中栏内层 class 仍是 `.prose`；grid 中栏 `min-width:0` 防代码块撑破。 |

---

## 8. 开放问题（交 dev 去问用户，别替产品拍板）

- **Q1 分类顺序**：12 分类侧栏按什么排？（背景给的顺序 / 文章数降序 / 自定义置顶如 AI 基础设施、Agent 开发在前）
- **Q2 多分类归属**：一篇文章挂多个 category 时，侧栏里放在首个分类下，还是每个分类下都出现？（影响 count 是否重复计）
- **Q3 列表页 chip 去留**：左侧 sidebar 已能按分类导航，顶部 chip 筛选是保留（双入口）、还是移除让 sidebar 唯一负责分类筛选？若保留，二者状态是否要联动？
- **Q4 空 TOC 文章**：右栏该"整列隐藏（降两栏）"还是"显示'本文无目录'占位"？（前者更干净，后者布局更稳定）
- **Q5 侧栏文章列表粒度**：分类下直接平铺该类全部文章（可能几十篇），还是要反映目录层级（theme-hope 原生是嵌套文件树）？平铺实现简单、体积可控；嵌套更还原 theme-hope 但复杂。建议先平铺。
- **Q6 侧栏是否显示文章数/图标**：theme-hope 分类带 FontAwesome 图标（schema 里 `icon` 字段还留着）。是否要映射图标，还是纯文字 + count 徽标？

---

## 9. 给 dev 的落地提示（省坑）
- 取 headings：`const { Content, headings } = await render(post);` —— **现文章页只取了 Content，要补 headings**。
- 别装 rehype-slug（Astro 内置已够）；别自己 slugify 中文标题（会和 DOM id 对不上）。
- 新组件放 `src/components/blog/`，数据逻辑放 `src/lib/blog.ts`，浅色 token 收一处 —— 三者分层，别把取数写进 .astro frontmatter 里重复。
- 所有动效（BlogNav 玻璃化 / 抽屉 / TOC 高亮 / details 动画）逐个配 `@media (prefers-reduced-motion: reduce)`。
- 组装完跑一次全量 `astro build`（451 页），确认无 slug/锚点/构建报错，并记录 build 耗时基线（判断 R1 是否需要优化）。
```
