# R-astro-linear：Astro 5+ 内容集合 / Tailwind+MDX+数学 / Linear 设计语言

> 调研人：researcher｜日期：2026-07-23
> 说明：官方文档单页 `docs.astro.build` 在本环境被域名安全策略拦截，无法直接 WebFetch；以下 Astro 结论主要来自 WebSearch 抓取的官方文档摘要 + 多篇技术博客交叉验证，可信度已逐条标注。KaTeX / Shiki / Tailwind 的关键 API 结论在多来源间一致。
> 可信度图例：`【文档】` 官方文档明说（附 URL）｜`【实测/交叉】` 多来源一致或社区实践验证｜`【推测】` 未证实。

---

## 1. Astro 5+ Content Collections（当前最新 7.1.3，Node 22）

### 1.1 配置文件位置变了
- 【文档】配置文件从 `src/content/config.ts` 改为 **`src/content.config.ts`**（注意：不再是 `content/` 子目录下，而是 `src/` 根下的 `content.config.ts`）。这是 Astro 5 的迁移要点之一。
- 【文档】Astro 5 引入 **Content Layer API**：用 `loader` 取代旧的 `type: "content"` / `type: "data"`。内容可以放文件系统任意位置，不再被限制在 `src/content/`。

### 1.2 defineCollection + glob() loader 写法
```ts
// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';   // 注意：loader 从 'astro/loaders' 导入

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),                  // date coerce：字符串自动转 Date
    updatedDate: z.coerce.date().optional(),   // 可选字段
    category: z.array(z.string()).default([]), // 数组字段（category 数组）
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```
- 【文档】两个内置 loader：
  - `glob()`：从一个目录里的 Markdown/MDX/Markdoc/JSON/YAML/TOML 每文件生成一条 entry，适合"每篇渲染成单页"的博客场景。参数 `pattern`（glob 匹配）+ `base`（基准目录）。
  - `file()`：从单个结构化数据文件（如一个 JSON 数组）生成多条 entry。
- 【文档】`defineCollection` 和 `z` 都从 `astro:content` 导入；`z` 是 Astro 对 Zod 的 re-export，支持 Zod 全部特性。
- 【文档】`glob()` loader 生成的所有 `id` 会被 **slugify**（旧版的 `slug` 概念被 `id` 取代）。

### 1.3 zod schema 常用写法（frontmatter）
- 【文档/交叉】
  - `title`: `z.string()`
  - date coerce: `z.coerce.date()`（把 frontmatter 里的 `2026-07-23` 字符串强制转成 Date 对象）
  - category 数组: `z.array(z.string())`，可加 `.default([])`
  - 可选字段: `.optional()`；带默认值: `.default(...)`
  - 跨集合引用: `reference('otherCollection')`（`reference()` 从 `astro:content` 导入）

### 1.4 getCollection / render(entry) —— render 从哪 import
- 【文档】**Astro 5 起 `render` 是从 `astro:content` 导入的独立函数**，取代旧的 `entry.render()` 方法：
```astro
---
import { getCollection, render } from 'astro:content';

const post = /* 某个 entry */;
const { Content, headings } = await render(post);
---
<Content />
```
- 【文档】查询用 `getCollection('blog')` / `getEntry('blog', id)`。
- 【文档】entry 上的字段：`id`（slugified）、`data`（schema 校验后的 frontmatter）、`body`（原始未编译正文，若 `retainBody: false` 则为 undefined）。

### 1.5 动态路由 `[...slug].astro` + getStaticPaths 标准写法
```astro
---
// src/pages/blog/[...slug].astro
import { getCollection, render } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.id },   // 注意用 post.id（已 slugify），不再是 post.slug
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await render(post);
---
<h1>{post.data.title}</h1>
<Content />
```
- 【文档/交叉】关键差异 vs Astro 4：`params: { slug: post.id }`（旧版是 `post.slug`），渲染用 `await render(post)`（旧版是 `await post.render()`）。

**证据链接（第 1 节）：**
- 官方：https://docs.astro.build/en/guides/content-collections/ （本环境无法直连，但为权威源）
- 官方 API 参考：https://docs.astro.build/en/reference/modules/astro-content/
- Astro 5.0 发布博客：https://astro.build/blog/astro-5/
- 迁移实战（Astro 4→5 content collections）：https://chenhuijing.com/blog/migrating-content-collections-from-astro-4-to-5/
- 官方文档源码：https://github.com/withastro/docs/blob/main/src/content/docs/en/guides/content-collections.mdx

---

## 2. Astro + Tailwind + MDX + 数学公式

### 2.1 Tailwind 集成方式（Astro 5+ / Tailwind v4）—— 重要变更
- 【文档/交叉】**从 Astro 5.2 起，`@astrojs/tailwind` 集成已弃用（deprecated）**，官方推荐改用 Tailwind 自己的 Vite 插件 **`@tailwindcss/vite`**（Tailwind v4）。`@astrojs/tailwind` 是 Tailwind v3 的 wrapper，配 v4 会失败或产出异常。
- 【文档】安装：`npm install tailwindcss @tailwindcss/vite`（或跑 `astro add tailwind`，Astro 5.2+ 会自动装 Vite 插件版本）。
- 【文档/交叉】**关键坑：插件放在 `vite.plugins`，不是 `integrations`**：
```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],   // 必须在 vite.plugins 里；放 integrations 无效、页面无样式
  },
});
```
- 【文档】CSS 侧：Tailwind v4 用 CSS-first 配置，不再需要 `tailwind.config.js`。建一个 `src/styles/global.css`：
```css
/* src/styles/global.css */
@import "tailwindcss";

/* 设计 token 用 @theme 块定义（取代旧的 tailwind.config.js） */
@theme {
  --color-void: #08090a;
  /* ... */
}
```
  然后在 layout/页面里 `import '../styles/global.css'` 引一次即可。
- 【实测/交叉】**Astro 组件里的 scoped `<style>` 用 `@apply` 时，要在 style 块顶部加 `@reference "tailwindcss";`**，否则构建时解析不到 token。这是 v4 常见报错点。
- 【推测/注意】有一个已知 issue：`astro add tailwind` 在 Astro 6 默认的 rolldown-vite 上可能装到不兼容版本导致构建失败（withastro/astro#16542）。当前是 Astro 7，若遇构建问题可留意此类兼容性。

### 2.2 remark-math + rehype-katex + KaTeX CSS
- 【文档/交叉】安装：`npm install remark-math rehype-katex`（KaTeX 作为 rehype-katex 依赖自动带入，JS 侧无需单独装）。
- 【文档】挂载到 `markdown` 配置：
```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  markdown: {
    remarkPlugins: [remarkMath],       // 解析 $...$ / $$...$$（mdast）
    rehypePlugins: [rehypeKatex],      // 编译期渲染成 KaTeX（hast）
    // 要传 KaTeX 选项时用数组形式：rehypePlugins: [[rehypeKatex, { /* opts */ }]]
  },
});
```
- 【文档】**KaTeX CSS 必须手动引入**（否则公式错乱）。在 layout 的 `<head>` 加：
```html
<link rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
```
  （也可 `npm i katex` 后本地 `import 'katex/dist/katex.min.css'`，避免依赖 CDN。）
- 【实测】坑：改了 `astro.config.mjs` 的 remark/rehype 数组后，即使重启 dev server，也常需**改动一下 md 文件内容**才会重新处理（有持久缓存不随配置失效）。
- 【推测/注意】若用 Tailwind Typography（`prose`），可能要给 `.prose .katex-display` 指定文字颜色，让公式颜色匹配主题。

### 2.3 Shiki 代码高亮（Astro 内置默认）
- 【文档】**Shiki 是 Astro 内置默认**，Markdown 代码块开箱即用，预配置主题为 **`github-dark`**。输出为内联 style，无额外 CSS class / 无客户端 JS。
- 【文档】单主题配置：
```js
export default defineConfig({
  markdown: {
    shikiConfig: { theme: 'dracula' },   // 直接写内置主题名字符串，无需 import
  },
});
```
- 【文档】明暗双主题（配深色博客推荐）：
```js
markdown: {
  shikiConfig: {
    themes: { light: 'github-light', dark: 'github-dark' },
    wrap: false,
  },
}
```
  双主题下 Astro 用 CSS 变量输出两套主题，需自行加暗色模式 CSS 变量的媒体查询/class，并把 Shiki 文档示例里的 `.shiki` 类替换为 **`.astro-code`**。
- 【文档】自定义 VS Code 主题：`import customTheme from './my-theme.json'` 后传给 `shikiConfig.theme`。
- 【文档】`markdown.syntaxHighlight` 可选 `'shiki'`（默认）/ `'prism'` / `false`。

**证据链接（第 2 节）：**
- 官方 styling 指南：https://docs.astro.build/en/guides/styling/ （本环境无法直连）
- 官方语法高亮指南：https://docs.astro.build/en/guides/syntax-highlighting/
- Astro 5.2 发布博客（宣布 @astrojs/tailwind 弃用）：https://astro.build/blog/astro-520/
- Tailwind 官方 Astro 指南：https://tailwindcss.com/docs/installation/framework-guides/astro
- @astrojs/tailwind 弃用说明：https://docs.astro.build/en/guides/integrations-guide/tailwind/
- 数学公式教程：https://www.byteli.com/blog/2024/math_in_astro/ ｜ https://johndalesandro.com/blog/how-to-add-math-equations-to-astro-with-katex/
- Shiki 双主题：https://christianpenrod.com/blog/astro-shiki-syntax-highlighting-with-css-variables

---

## 3. Linear 设计语言（可复用的具体 CSS 值）

> 重要澄清：自动化提取器有时会把 Linear **营销活动的临时色**（如 acid-lime/绿色）误判为"主色"。**Linear 稳定的、规范的品牌 token 是紫色 #5e6ad2 + 近黑背景 #08090a + 浅灰前景 #f7f8f8 + Inter Variable**。以下以后者为准。

### 3.1 颜色
- 【交叉/多源】**背景（Marketing Black / void）：`#08090a`** —— 近乎纯黑，确认。CSS 变量社区提取为 `--color-void: #08090a`。
- 【交叉/多源】**主强调色（Indigo / Lavender 紫）：`#5e6ad2`** —— Linear 招牌色，desaturated blue/indigo。用得极克制：仅用于链接、CTA、focus ring、进度、品牌标记；一个区块通常只有一个主 CTA。**不是紫色不对，确认是 #5e6ad2 这个偏蓝的靛紫。**
- 【交叉/多源】**前景文字：`#f7f8f8`**（浅灰白，配近黑底）。
- 【交叉】中性/次要文字灰：`#8a8f98`（logo 条、次要文字）、`#62666d`、`#d0d6e0`、`#e2e4e7`。
- 【交叉】**表面阶梯（surface ladder，靠亮度堆叠表达层级，不用阴影）**：
  - 页面底：`#08090a`
  - 卡片/面板逐级提亮：`#0f1011` → `#141516`/`#161718` → `#18191a` → `#191a1b`/`#23252a`
  - （据称直接映射 Linear 自己的 `--color-bg-level-3` 等 token）
- 【交叉】**发丝线/边框**：`#23252a` → `#34343a` → `#3e3e44`；或用半透明白叠加 **`rgba(255,255,255,0.02)` ~ `rgba(255,255,255,0.08)`**（确认你预期的 0.08 白边是对的）。
- 【交叉】辅助/活动色（谨慎使用，多为营销临时色）：Acid Lime `#e4f222`、Pulse Green `#27a644`、Coral Red `#eb5757` —— **不建议作为核心 token**。

### 3.2 毛玻璃 / backdrop-filter（导航栏）
- 【推测/通用】Linear 官方精确参数未在来源中取到具体数值。基于其"深色 + 克制"风格与通用玻璃拟态实践，深色玻璃导航栏合理默认（**未取证，需按视觉微调**）：
```css
.nav-glass {
  background: rgba(8, 9, 10, 0.6);        /* 近黑底 + 半透明 */
  backdrop-filter: blur(12px) saturate(140%);
  -webkit-backdrop-filter: blur(12px) saturate(140%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
```
- 【交叉】玻璃拟态通用规则：半透明背景 opacity 约 0.1~0.3、`backdrop-filter: blur(...)`、细白边界定。深色场景注意 WCAG 对比度（正文 4.5:1）。

### 3.3 圆角 / 边框 / hover
- 【交叉】**圆角**：精密感小圆角。提取到的 radii：`xs:1, sm:4, md:7, lg:16, xl:20`（px）；另一来源说常用 **6px / 12px**。卡片一般 md~lg（7~16px）。
- 【交叉】**边框**：发丝级，1px（甚至 0.5px）半透明白 `rgba(255,255,255,0.08)`（或 `#23252a` 实色）。
- 【交叉】**"阴影"**：Linear 基本不用投影，用亮度堆叠表达高度；有一个 inset 描边 shadow：`rgb(35,37,42) 0px 0px 0px 1px inset`。
- 【推测】hover 光晕：来源未给精确值。合理默认（**未取证**）：hover 时提亮表面一级 + 边框透明度从 0.08 升到 ~0.12，或加轻微 `box-shadow: 0 0 0 1px rgba(94,106,210,0.4)`（紫色 focus 感）。

### 3.4 字体
- 【交叉/多源】**Inter（Inter Variable）**为主字体，确认。等宽用 **Berkeley Mono**（可用免费替代如 JetBrains Mono / IBM Plex Mono）。
- 【交叉】排版细节：正文 14px / 行高 21px；负字距（tight tracking，约 `-0.022em`，大字号更紧）；UI 强调用 weight **510**（介于 regular 400 和 semibold 600，仅 Inter Variable 有）。
- 【交叉】标题尺度示例：h1 64px/weight510/lh64、h2 40px/weight510/lh44、h3 20px/weight590/lh26.6。
- 【交叉/推测】Linear 在每个文本元素启用 OpenType 特性 `cv01` + `ss03`（"non-negotiable"）。若追求还原可加：`font-feature-settings: "cv01", "ss03";`

### 3.5 可直接粘贴的 `:root` 起手（综合上述，供 dev 参考）
```css
:root {
  --color-void: #08090a;        /* 页面底 */
  --color-bg-1: #0f1011;        /* 卡片 */
  --color-bg-2: #141516;
  --color-bg-3: #18191a;
  --color-fg: #f7f8f8;          /* 前景文字 */
  --color-muted: #8a8f98;       /* 次要文字 */
  --color-accent: #5e6ad2;      /* 主强调靛紫 */
  --color-line: rgba(255,255,255,0.08);
  --radius-sm: 6px;
  --radius-md: 12px;
  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: "Berkeley Mono", "JetBrains Mono", monospace;
}
```

**证据链接（第 3 节）：**
- Linear 官方品牌页：https://linear.app/brand
- Linear 品牌色（Mobbin）：https://mobbin.com/colors/brand/linear
- 设计 token 提取：https://fontofweb.com/tokens/linear.app ｜ https://www.designmd.co/d/linear.app ｜ https://copycats.design/linear-app
- DESIGN.md（含 surface ladder / token 分析）：https://github.com/voltagent/awesome-design-md/blob/main/design-md/linear.app/DESIGN.md
- Inter 在 linear.app 的使用：https://typ.io/s/2jmp
- Linear design 风格拆解：https://blog.logrocket.com/ux-design/linear-design/
- 玻璃拟态通用：https://blog.logrocket.com/ux-design/what-is-glassmorphism/

---

## 待 dev 确认 / 风险点
1. **版本核对**：本环境无法直连 docs.astro.build，未逐字核对 Astro 7.1.3 的 API 是否与 5.x 完全一致。Content Layer / render 导入方式从 5.0 起稳定，7.x 大概率不变，但正式编码前建议 dev 本地跑 `npx astro info` 并对照本机 `node_modules/astro` 类型定义再确认一次。
2. **Tailwind v4 + Astro 7 兼容**：注意 rolldown-vite 相关的 `@tailwindcss/vite` 版本兼容 issue（#16542），装完先 `astro build` 验一遍。
3. **毛玻璃 / hover 光晕的精确数值未取证**：Linear 官方没公开这两项 CSS，报告里给的是合理默认，需 dev 按实际视觉微调。
4. **acid-lime 等绿色不要用作主色**：那是营销临时色，核心色系认准 `#5e6ad2 / #08090a / #f7f8f8 + Inter`。
