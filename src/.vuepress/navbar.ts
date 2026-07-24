import { navbar } from "vuepress-theme-hope";

// 导航栏。"博文"下拉指向 theme-hope 的分类聚合页 /category/<中文分类>/
// (由 blog 插件按 frontmatter category 自动聚合,零死链、随文章增减自动更新,
//  不再像旧版硬编码具体文章文件名而失配)。分类名对齐同步脚本的 CATEGORY_MAP。
export default navbar([
  "/",
  {
    text: "博文",
    icon: "edit",
    children: [
      { text: "AI 基础设施", icon: "cpu", link: "/category/AI基础设施/" },
      { text: "AI 大模型", icon: "robot", link: "/category/AI大模型/" },
      { text: "计算机网络", icon: "network", link: "/category/计算机网络/" },
      { text: "面试", icon: "clipboard-text", link: "/category/面试/" },
      { text: "运维", icon: "server", link: "/category/运维/" },
      { text: "云原生", icon: "cloud", link: "/category/云原生/" },
      { text: "开发", icon: "code", link: "/category/开发/" },
      { text: "AIOps 平台", icon: "settings", link: "/category/AIOps平台/" },
      { text: "数据库", icon: "database", link: "/category/数据库/" },
      { text: "杂项笔记", icon: "note", link: "/category/杂项笔记/" },
    ],
  },
  {
    text: "全部分类",
    icon: "tags",
    link: "/category/",
  },
  {
    // AI 助手:同源 /ai/,由 Nginx 反代到仅绑回环的 agent 容器(新标签打开)。
    text: "AI 助手",
    icon: "robot",
    link: "/ai/",
  },
  {
    text: "CSDN",
    icon: "book",
    link: "https://blog.csdn.net/2301_79801717?spm=1011.2415.3001.5343",
  },
]);
