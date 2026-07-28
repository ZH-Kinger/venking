// 终端用户登录(Logto)——AI 前端用。零 CDN:@logto/browser 已 vendored 到 ./logto-browser.js。
// 只负责身份 + 取 access token + 拉个人云端历史;UI 由 index.html 的经典脚本监听 'kinger-auth' 事件渲染。
// 与匿名流程解耦:未配置/未登录时本模块静默,页面照常匿名可用。
import LogtoClient from "./logto-browser.js";

const state = { client: null, apiResource: null, authed: false, token: null, user: null };

function emit() {
  window.__accessToken = state.token || undefined; // runQuery 读它,给 SSE 用 ?access_token= 兜底
  window.dispatchEvent(new CustomEvent("kinger-auth", {
    detail: { configured: Boolean(state.client), authed: state.authed, user: state.user },
  }));
}

async function refreshToken() {
  try { state.token = await state.client.getAccessToken(state.apiResource); }
  catch { state.token = null; }
}

async function apiGet(path) {
  const headers = {};
  if (state.token) headers["Authorization"] = `Bearer ${state.token}`;
  const r = await fetch(path, { headers });
  if (!r.ok) throw new Error(String(r.status));
  return r.json();
}

window.KingerAuth = {
  isAuthed: () => state.authed,
  user: () => state.user,
  // 回调必须回到**本模块所在的页面** —— 下面 init() 是靠读当前页的 location.search
  // 拿 code/state 的,而 auth.js 只在 /ai/ 加载。回到站点根(首页是 Astro,没加载本模块)
  // 或回到 /ai/callback(该路径没有页面)都会让 code 无人接收,登录静默失败。
  // 这两个 URI 必须与 Logto 应用里注册的 redirect/postLogout 列表逐字一致(含结尾斜杠)。
  login: () => state.client && state.client.signIn(`${location.origin}/ai/`),
  logout: () => state.client && state.client.signOut(`${location.origin}/`),
  listConversations: () => apiGet("/api/me/conversations"),
  getConversation: (id) => apiGet(`/api/me/conversations/${encodeURIComponent(id)}`),
};

async function init() {
  let cfg = null;
  try { cfg = await fetch("/api/public-config").then((r) => r.json()); } catch { /* 后端未起 */ }
  if (!cfg || !cfg.app_id) { emit(); return; } // 未配置 App ID → 不显示登录入口,匿名照常

  state.apiResource = cfg.api_resource;
  state.client = new LogtoClient({
    endpoint: cfg.endpoint,
    appId: cfg.app_id,
    resources: [cfg.api_resource],
    // 终端用户:要 profile/email 展示;不需要 admin(那是后台的)。token 带 sub 即可绑历史。
    // 前提同 admin-web:该应用须为「第一方」,否则会拒 profile/email。
    scopes: ["profile", "email"],
  });

  // 从 Logto 登录回跳(redirect uri = 本页 /ai/,带 ?code&state)→ 处理并清理地址栏。
  const qs = new URLSearchParams(location.search);
  if (qs.has("code") && qs.has("state")) {
    try { await state.client.handleSignInCallback(location.href); }
    catch { /* 忽略:非本次登录的残留参数 */ }
    history.replaceState({}, "", location.pathname);
  }

  try { state.authed = await state.client.isAuthenticated(); } catch { state.authed = false; }
  if (state.authed) {
    await refreshToken();
    try { state.user = await state.client.getIdTokenClaims(); } catch { /* 展示信息缺省无妨 */ }
  }
  emit();

  // access token 会过期(默认 1h),定期续期,保证 SSE 兜底令牌有效。
  setInterval(() => { if (state.authed) void refreshToken().then(() => { window.__accessToken = state.token || undefined; }); }, 4 * 60 * 1000);
}

void init();
