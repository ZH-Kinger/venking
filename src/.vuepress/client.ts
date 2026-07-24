import { defineClientConfig } from "vuepress/client";
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
        #ai-fab{position:fixed;right:24px;bottom:88px;z-index:2147483000;
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
        @media (max-width:480px){#ai-fab{right:16px;bottom:80px;width:46px;height:46px}#ai-fab svg{width:23px;height:23px}}
        @media (prefers-reduced-motion:reduce){#ai-fab,#ai-fab::after{transition:none}}
      `;
      document.head.appendChild(style);

      const a = document.createElement("a");
      a.id = "ai-fab";
      a.href = AGENT_URL;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.title = "打开 AI 助手 · 基于本站内容的智能问答";
      // 机器人线性图标(比原来的绿点+文字更精致,配深色科技风)
      a.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="8" width="16" height="11" rx="3"/><path d="M12 8V4M9 4h6"/><circle cx="9" cy="13" r="1.2" fill="currentColor" stroke="none"/><circle cx="15" cy="13" r="1.2" fill="currentColor" stroke="none"/><path d="M2 13v3M22 13v3"/></svg>`;
      document.body.appendChild(a);
    };

    Promise.resolve().then(() => { inject(); observeThemeSwitch(); });
  },
});
