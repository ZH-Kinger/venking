import { defineClientConfig } from "vuepress/client";
// 自托管 Inter/JetBrains Mono(与落地页同款,全站字体统一;零 CDN)。只取 weight 轴变量字体。
import "@fontsource-variable/inter/wght.css";
import "@fontsource-variable/jetbrains-mono/wght.css";
import KingerBlog from "./layouts/KingerBlog.vue";

/**
 * 全站右下角「AI 助手」悬浮球。
 *
 * 为什么写在 client.ts:VuePress 2 会自动把 .vuepress/client.ts 作为客户端增强入口
 * (无需在 config.ts 注册)。这里用 setup + onMounted 在浏览器端注入一个悬浮按钮,
 * 点击新标签打开部署在服务器上的 Agentic RAG 对话前端。
 *
 * 为什么用相对路径 /ai/:agent 容器仅绑服务器回环,由 Nginx 统一反代到同源 /ai/,
 * 既避免暴露内部端口,又消除 https 页面直连 http 端口的「混合内容」拦截。
 * 等域名 + HTTPS 备案下来后,可进一步改成 iframe 内嵌对话框。
 *
 * SSR 安全:onMounted 只在客户端跑;且守卫 document 存在与防重复注入。
 */
const AGENT_URL = "/ai/";

export default defineClientConfig({
  layouts: {
    KingerBlog,
  },

  setup() {
    // 动态 import 保证不在 SSR 阶段执行 DOM 操作
    if (typeof window === "undefined") return;

    // ---- (0) 关掉主题切换的 View Transition 圆形揭示,根治"切换闪一下" ----
    // theme-hope 2.x 的 ColorModeSwitch 在点击时若检测到 document.startViewTransition 就走
    // startViewTransition + clip-path 圆形揭示;该揭示在合成期会露出 color-scheme 画布底(浅色=白)
    // 造成闪屏。把 startViewTransition 置空 → 它走 else 分支 updateDarkmodeStatus() 瞬时切换,
    // 配合 index.scss 的 .color-switching 消抖,干净无闪。(仅本页此一处用到 VT,置空无副作用。)
    try {
      Object.defineProperty(document, "startViewTransition", {
        value: undefined,
        configurable: true,
        writable: true,
      });
    } catch {
      /* 某些浏览器该属性不可重定义:忽略,退回原行为 */
    }
    // 注:"首次默认深色"已移到 config.ts 的 head 内联脚本(在 theme-hope 读取偏好前同步执行,
    //     避免切换按钮要点两次的时序 bug)。此处只保留 AI 助手悬浮球注入。

    // ---- (1) 深浅切换时瞬间禁用全站过渡,消除卡顿(配合 index.scss 的 .color-switching)----
    const observeThemeSwitch = () => {
      const html = document.documentElement;
      let t: number | undefined;
      const mo = new MutationObserver(() => {
        html.classList.add("color-switching");
        if (t) clearTimeout(t);
        t = window.setTimeout(() => html.classList.remove("color-switching"), 160);
      });
      mo.observe(html, { attributes: true, attributeFilter: ["data-theme"] });
    };

    // ---- (2) 右下角 AI 助手悬浮球(圆形机器人图标,避开"回到顶部"按钮:上移一层)----
    const inject = () => {
      if (typeof document === "undefined") return;
      if (document.getElementById("ai-fab")) return;

      const style = document.createElement("style");
      style.textContent = `
        /* 位置:回到顶部按钮在 right:1rem/bottom:4rem(48px 高,含进度环约到 114px);
           本球上移到它正上方并与之居中对齐(right 14px 使两者中线对齐),留 ~10px 间隙,不再重叠。 */
        #ai-fab{position:fixed;right:14px;bottom:124px;z-index:2147483000;
          width:52px;height:52px;display:grid;place-items:center;
          background:#5e6ad2;color:#fff;
          border-radius:16px;box-shadow:0 6px 22px rgba(94,106,210,.4);
          cursor:pointer;text-decoration:none;
          transition:transform .16s ease,box-shadow .16s ease,background .16s ease}
        #ai-fab:hover{transform:translateY(-3px);background:#6d78dd;box-shadow:0 12px 30px rgba(94,106,210,.55)}
        #ai-fab:active{transform:scale(.94)}
        #ai-fab svg{width:26px;height:26px;display:block}
        /* hover 时右侧滑出文字提示 */
        #ai-fab::after{content:"AI 助手";position:absolute;right:60px;white-space:nowrap;
          background:rgba(8,9,10,.85);color:#fff;font-size:13px;padding:6px 12px;border-radius:8px;
          opacity:0;transform:translateX(6px);pointer-events:none;
          transition:opacity .16s ease,transform .16s ease}
        #ai-fab:hover::after{opacity:1;transform:translateX(0)}
        @media (max-width:480px){#ai-fab{right:12px;bottom:112px;width:46px;height:46px}#ai-fab svg{width:23px;height:23px}}
        @media (prefers-reduced-motion:reduce){#ai-fab,#ai-fab::after{transition:none}}
      `;
      document.head.appendChild(style);

      const a = document.createElement("a");
      a.id = "ai-fab";
      a.href = AGENT_URL;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.title = "打开 AI 助手 · 基于本站内容的智能问答";
      // 品牌 quill AI 图标(线性 + 统一羽毛标记,继承 currentColor)。
      a.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/><path d="M19 3 L17 5 M19 3 L21 5 M19 3 L19 6" stroke-width="1.5"/></svg>`;
      document.body.appendChild(a);
    };

    // ---- (3) 渐进图片:图片下载完成后加 .img-loaded → 触发"模糊→清晰"淡入 ----
    // 原生 loading=lazy 已让图滚到才下;这里只负责下完后的揭示动画。缓存命中的图(complete)
    // 立即标记;error 也标记以免卡在模糊态。用 MutationObserver 兜住路由切换后的新内容。
    const enhanceImages = () => {
      document
        .querySelectorAll<HTMLImageElement>("[vp-content] img:not([data-enh])")
        .forEach((img) => {
          img.dataset.enh = "1";
          if (img.complete && img.naturalWidth > 0) {
            img.classList.add("img-loaded");
          } else {
            img.addEventListener("load", () => img.classList.add("img-loaded"), { once: true });
            img.addEventListener("error", () => img.classList.add("img-loaded"), { once: true });
          }
        });
    };

    Promise.resolve().then(() => {
      inject();
      observeThemeSwitch();
      enhanceImages();
      const imgObserver = new MutationObserver(() => enhanceImages());
      imgObserver.observe(document.body, { childList: true, subtree: true });
    });
  },
});
