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
  login: () => state.client && state.client.signIn(`${location.origin}/`),
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
    scopes: ["email", "profile"],
  });

  // 从 Logto 登录回跳(redirect uri = 站点根,带 ?code&state)→ 处理并清理地址栏。
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
