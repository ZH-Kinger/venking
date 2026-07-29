import { navbar } from "vuepress-theme-hope";

// 导航栏。"博文"下拉指向 theme-hope 的分类聚合页 /category/<分类>/
// (由 blog 插件按 frontmatter category 自动聚合,随文章增减自动更新,
//  不再像旧版硬编码具体文章文件名而失配)。分类名对齐同步脚本的 CATEGORY_MAP。
//
// ⚠️ 分类路径必须全小写 —— theme-hope 生成聚合页时会把 ASCII 字母 slugify 成小写
//    (产物目录实际叫 `category/ai基础设施/`、`category/aiops平台/`)。
//    2026-07 这里写成 `AI基础设施`/`AI大模型`/`AIOps平台`,三条全 404,
//    而这三个分类合计 312 篇 —— 占全站 529 篇的 59% 从顶栏点进去全是死链。
//    纯中文分类没有大小写之分,所以只有含 ASCII 字母的这三个中招,不容易被发现。
//    改动分类名后请跑 `node scripts/check-navbar-links.mjs`(构建后校验,CI 也会跑)。
const CATEGORIES: [text: string, icon: string, slug: string][] = [
  ["AI 基础设施", "cpu", "ai基础设施"],
  ["AI 大模型", "robot", "ai大模型"],
  ["计算机网络", "network", "计算机网络"],
  ["面试", "clipboard-text", "面试"],
  ["运维", "server", "运维"],
  ["云原生", "cloud", "云原生"],
  ["开发", "code", "开发"],
  ["AIOps 平台", "settings", "aiops平台"],
  ["数据库", "database", "数据库"],
  ["杂项笔记", "note", "杂项笔记"],
];

// AI 助手不属于 VuePress 站点:它是同源的另一个应用(Nginx 反代到仅绑回环的 agent 容器)。
// 必须写成**绝对 URL** —— 站内相对链接会被 base(`/blog/`)加前缀,`/ai/` 变成
// `/blog/ai/` 而 404(2026-07 就是这么坏的)。theme-hope 只对 http(s) 开头的
// 链接跳过 base 处理。开发时指向本机 uvicorn,生产指向线上域名。
const AI_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:7860/"
    : "https://venking.tech/ai/";

export default navbar([
  "/",
  {
    text: "博文",
    icon: "edit",
    children: CATEGORIES.map(([text, icon, slug]) => ({
      text,
      icon,
      link: `/category/${slug}/`,
    })),
  },
  {
    text: "全部分类",
    icon: "tags",
    link: "/category/",
  },
  {
    text: "AI 助手",
    icon: "robot",
    link: AI_URL,
  },
  {
    text: "CSDN",
    icon: "book",
    link: "https://blog.csdn.net/2301_79801717?spm=1011.2415.3001.5343",
  },
]);
