import { hopeTheme } from "vuepress-theme-hope";

import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  // 正式域名(2026-07 备案通过并上 HTTPS);影响 sitemap/canonical/SEO
  hostname: "https://venking.tech",

  author: {
    name: "Kinger",
    url: "https://www.yuque.com/kinger-wwnro",
  },

  logo: "/feather-indigo.png",

  repo: "ZH-Kinger/venking",

  docsDir: "src",

  // 一键明暗切换。原 switch 是「深色→自动→浅色」三态:
  // 当系统偏好也是深色时,第一次点到 auto 视觉不变,会被误以为需要点两次。
  // toggle 只在 light/dark 间切换,首次访问仍由 config.ts 默认深色。
  darkmode: "toggle",

  // 导航栏
  navbar,

  // 侧边栏
  sidebar,

  // 页脚
  // theme-hope 的 footer 走 innerHTML,支持 HTML;ICP 备案号必须超链到工信部备案系统。
  // 年份取构建时的年,和 homepage 的 Footer.astro 保持一致(别硬编码,跨年就不一致了)。
  footer:
    `© ${new Date().getFullYear()} Kinger · AIOps & AI Infra · Built with VuePress · ` +
    '<a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">湘ICP备2026030935号</a>',
  displayFooter: true,

  // 博客相关
  blog: {
    description: "AIOps 与 AI Infra 实战笔记",
    intro: "/intro.html",
    // 社交/联系:填真实链接才展示;Gitee/Email 待用户提供后再加(不留占位空链接)。
    medias: {
      GitHub: "https://github.com/ZH-Kinger",
    },
  },

  // 多语言配置
  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },

  // 如果想要实时查看任何改变，启用它。注: 这对更新性能有很大负面影响
  // hotReload: true,

  // 此处开启了很多功能用于演示，你应仅保留用到的功能。
  markdown: {
    align: true,
    attrs: true,
    codeTabs: true,
    component: true,
    demo: true,
    figure: true,
    gfm: true,
    imgLazyload: true,
    imgSize: true,
    include: true,
    mark: true,
    plantuml: true,
    spoiler: true,
    stylize: [
      {
        matcher: "Recommended",
        replacer: ({ tag }) => {
          if (tag === "em")
            return {
              tag: "Badge",
              attrs: { type: "tip" },
              content: "Recommended",
            };
        },
      },
    ],
    sub: true,
    sup: true,
    tabs: true,
    tasklist: true,
    vPre: true,

    // 取消注释它们如果你需要 TeX 支持
    // math: {
    //   // 启用前安装 katex
    //   type: "katex",
    //   // 或者安装 @mathjax/src
    //   type: "mathjax",
    // },

    // 如果你需要幻灯片，安装 @vuepress/plugin-revealjs 并取消下方注释
    // revealjs: {
    //   plugins: ["highlight", "math", "search", "notes", "zoom"],
    // },

    // 在启用之前安装 chart.js
    // chartjs: true,

    // insert component easily

    // 在启用之前安装 echarts
    // echarts: true,

    // 在启用之前安装 flowchart.ts
    // flowchart: true,

    // 在启用之前安装 mermaid
    // mermaid: true,

    // playground: {
    //   presets: ["ts", "vue"],
    // },

    // 在启用之前安装 @vue/repl
    // vuePlayground: true,

    // 在启用之前安装 sandpack-vue3
    // sandpack: true,
  },

  // 在这里配置主题提供的插件
  plugins: {
    blog: true,

    // photoSwipe 只认 img.src、不支持"另给高清源",无法内联小图/点击原图分离。
    // 改由 client.ts 实现双层:内联 1600px 显示版,点击打开 orig/ 原图(新标签,原生缩放)。
    photoSwipe: false,

    // 启用之前需安装 @waline/client
    // 警告: 这是一个仅供演示的测试服务，在生产环境中请自行部署并使用自己的服务！
    // comment: {
    //   provider: "Waline",
    //   serverURL: "https://waline-comment.vuejs.press",
    // },

    components: {
      components: ["Badge", "VPCard"],
    },

    icon: {
      // 博客与 Agent 统一使用 Tabler 线性图标语言。
      // 继续复用 icon 插件的 Iconify 加载能力，不增加运行时依赖。
      prefix: "tabler:",
    },

    // 如果你需要 PWA。安装 @vuepress/plugin-pwa 并取消下方注释
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cacheImage: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
  },
});
