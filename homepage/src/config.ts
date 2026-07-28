// 站点级共享配置。集中管理会散落多处的常量,改一处即可。
export const SITE = {
  title: "Kinger · AIOps & AI Infra",
  author: "Kinger",
  // AI 助手由同站 Nginx 反代，避免额外暴露应用端口。
  aiUrl: "/ai/",
  yuque: "https://www.yuque.com/kinger-wwnro",
  // ICP 备案号(2026-07 通过)。工信部要求首页底部展示,并超链到 beian.miit.gov.cn。
  icp: "湘ICP备2026030935号",
} as const;
