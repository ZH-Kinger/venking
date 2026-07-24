import { sidebar } from "vuepress-theme-hope";

// 侧边栏:children:"structure" 按目录结构自动生成文章列表。
// prefix 对齐同步脚本产出的中文分类目录名(src/posts/<中文分类>/)。
export default sidebar({
  "/": [
    "",
    {
      text: "AI 基础设施",
      icon: "cpu",
      prefix: "posts/AI基础设施/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "AI 大模型",
      icon: "robot",
      prefix: "posts/AI大模型/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "计算机网络",
      icon: "network",
      prefix: "posts/计算机网络/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "面试",
      icon: "clipboard-text",
      prefix: "posts/面试/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "运维",
      icon: "server",
      prefix: "posts/运维/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "云原生",
      icon: "cloud",
      prefix: "posts/云原生/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "开发",
      icon: "code",
      prefix: "posts/开发/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "AIOps 平台",
      icon: "settings",
      prefix: "posts/AIOps平台/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "杂项笔记",
      icon: "note",
      prefix: "posts/杂项笔记/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "数据库",
      icon: "database",
      prefix: "posts/数据库/",
      collapsible: true,
      children: "structure",
    },
    "intro",
  ],
});
