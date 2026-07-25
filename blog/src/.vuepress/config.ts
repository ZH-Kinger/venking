import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";
import { fileURLToPath } from "node:url";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/blog/",
  bundler: viteBundler({
    viteOptions: {
      resolve: {
        // 迁移文章使用 /blog/assets/posts/...，生产编译时把它解析到公共图片目录。
        alias: {
          "/blog/assets/posts": fileURLToPath(
            new URL("./public/assets/posts", import.meta.url),
          ),
        },
      },
      plugins: [
        {
          name: "safe-migrated-markdown-sfc",
          enforce: "pre",
          transform(code, id) {
            if (!id.endsWith(".md")) return;

            // VuePress 已先把 Markdown 转成 SFC。把文章主体交给 v-html，
            // 避免旧笔记中的比较符、占位标签和命令参数被 Vue 当模板编译。
            // 页面外壳、导航、侧栏、TOC 和主题交互仍由 VuePress 正常渲染。
            const open = "<template>";
            const close = "</template>";
            const start = code.indexOf(open);
            const end = code.indexOf(close, start + open.length);
            if (start === -1 || end === -1) return;

            const html = code.slice(start + open.length, end);
            const encoded = encodeURIComponent(html).replaceAll("'", "%27");
            const safeTemplate = `${open}<div class="vp-migrated-content" v-html="decodeURIComponent('${encoded}')"></div>${close}`;

            return `${code.slice(0, start)}${safeTemplate}${code.slice(end + close.length)}`;
          },
        },
      ],
    },
  }),

  lang: "zh-CN",
  title: "Kinger 的技术博客",
  description: "AIOps 与 AI Infrastructure 实战笔记:训练基础设施、故障排查、Agent 与 RAG 工程实践。",

  theme,

  plugins: [
    {
      name: "markdown-safe-html",
      extendsMarkdownOptions: (options) => {
        // 迁移笔记的公共图片已经是带 base 的 URL，不应再次转成 Vite import。
        options.assets = false;
        // 原始 HTML 默认关闭；下面的 core rule 再做一次最终兜底，避免后续
        // 主题插件重新开启 html 后把 <username> 一类说明文字交给 Vue 编译。
        options.html = false;
      },
      extendsMarkdown: (markdown) => {
        markdown.set({ html: false });
        markdown.core.ruler.push("escape-migrated-raw-html", (state) => {
          const sanitize = (tokens: typeof state.tokens): void => {
            tokens.forEach((token) => {
              if (token.type === "html_inline" || token.type === "html_block") {
                token.type = "text";
                token.tag = "";
                token.nesting = 0;
              }
              if (token.type === "text") {
                token.content = token.content
                  .replaceAll("{{", "&#123;&#123;")
                  .replaceAll("}}", "&#125;&#125;");
              }
              if (token.children) sanitize(token.children);
            });
          };
          sanitize(state.tokens);
        });
      },
    },
  ],

  head: [
    // favicon:品牌羽毛(靛紫版,明暗标签页都可见)
    ["link", { rel: "icon", type: "image/png", href: "/feather-indigo.png" }],
    // 语雀图片防盗链
    ["meta", { name: "referrer", content: "no-referrer" }],
    // 首次访问默认深色,并迁移旧版错误存储值:
    // VueUse 的字符串 storage 要求存 dark/light 原文;旧脚本 JSON.stringify 后存成了
    // 带引号的 `"dark"`,会让按钮状态与实际主题不同步。
    // 现使用明暗二态 toggle,旧 auto 值按当前系统偏好折算成明确的 dark/light。
    [
      "script",
      {},
      `(function(){try{var k='vuepress-theme-hope-scheme',v=localStorage.getItem(k);if(v===null){v='dark';}if(v.charAt(0)==='"'){try{v=JSON.parse(v);}catch(e){}}if(v==='auto'){v=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}v=v==='light'?'light':'dark';localStorage.setItem(k,v);document.documentElement.setAttribute('data-theme',v);}catch(e){}})();`,
    ],
    // 关键无闪屏 CSS(阻塞式,先于主样式表):data-theme 一确定即刷底色 + color-scheme,
    // 不等主 CSS 加载(dev 下主 CSS 由 JS 注入,故首屏/硬刷会白闪——这段消除它)。
    // 默认深色兜底;仅显式 light 时切浅。color-scheme 让原生滚动条/表单控件同步不白闪。
    [
      "style",
      {},
      `html{background-color:#08090a;color-scheme:dark}html[data-theme="light"]{background-color:#f7f8fa;color-scheme:light}`,
    ],
  ],

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
