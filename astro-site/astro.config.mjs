// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// 站点配置。
// 为什么 base 用 "/"(而非现有 VuePress 的 /blog/):
//   单个 Astro 项目只有一个 base。落地页要在根、博客要在子路径,
//   用文件路由前缀(src/pages/index=根,src/pages/blog/=/blog/)天然实现,
//   比设 base:/blog/ 更干净。SEO 侧的老 URL 兼容留阶段3 用 nginx 重定向。
// site: 备案通过后的真实域名,影响 sitemap 绝对 URL。
export default defineConfig({
  site: "https://venking.tech",

  integrations: [mdx(), sitemap()],

  // 关键坑(researcher 取证):Tailwind v4 用 @tailwindcss/vite,
  // 必须放 vite.plugins —— 放 integrations 无效、页面无样式。
  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    // 数学:remark-math 解析 $..$ → rehype-katex 编译期渲染(KaTeX CSS 在 BaseLayout 手动引)。
    // 宽容模式:真实笔记里 $ 不都是公式(中文夹 $、shell 变量等),strict 会让 build 失败;
    // throwOnError:false + strict:false → 不合法的原样渲染、不中断,保证 530 篇能全量构建。
    remarkPlugins: [remarkMath],
    rehypePlugins: [[rehypeKatex, { throwOnError: false, strict: false, errorColor: "#eb3b54" }]],
    // Shiki 是 Astro 内置默认。博客正文白底,代码块用浅色主题更协调。
    shikiConfig: {
      theme: "github-light",
      wrap: false,
    },
  },
});
