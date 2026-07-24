// 站点级共享配置。集中管理会散落多处的常量,改一处即可。
export const SITE = {
  title: "Kinger · AIOps & AI Infra",
  author: "Kinger",
  // AI 助手由同站 Nginx 反代，避免额外暴露应用端口。
  aiUrl: "/ai/",
  yuque: "https://www.yuque.com/kinger-wwnro",
} as const;
