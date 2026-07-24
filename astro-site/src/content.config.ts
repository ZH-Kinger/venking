// Astro 5+ Content Collections(注意:配置文件在 src 根下,不再是 src/content/config.ts)。
// schema 刻意兼容现有 VuePress theme-hope 的 frontmatter,阶段2 迁 325 篇时零改字段:
//   title/date/category 是核心;icon/tag/order/sticky/star/cover 是 theme-hope 专有,
//   这里全设可选并保留,迁移脚本就不必删字段(丢字段 = 丢信息)。
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// 容忍标量或数组:Obsidian/theme-hope 的 frontmatter 常把 category/tag 写成
// 标量(category: AI基础设施)而非列表。归一成 string[],避免迁移时 Zod 校验直接 build 失败。
const strArray = z
  .union([z.string(), z.array(z.string())])
  .transform((v) => (Array.isArray(v) ? v : [v]))
  .optional()
  .default([]);

const posts = defineCollection({
  // glob loader:src/content/posts 下每个 md/mdx = 一篇文章,id 自动 slugify。
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),                    // "2026-03-22" 字符串 → Date
    category: strArray,                        // 标量或数组都接受(见上 strArray)
    // —— 以下 theme-hope 专有,可选保留 ——
    icon: z.string().optional(),              // FontAwesome 名(robot/docker…),阶段2 决定是否映射
    tag: strArray,
    order: z.number().optional(),
    sticky: z.boolean().optional(),
    star: z.boolean().optional(),
    cover: z.string().optional(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
