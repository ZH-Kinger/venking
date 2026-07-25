// Logto 接入配置(全部从 .env 读,绝不硬编码 App ID)。
// 见 .env.example;本地开发把真实值写进 admin-web/.env(已 gitignore)。

const endpoint = import.meta.env.VITE_LOGTO_ENDPOINT ?? "http://localhost:3001";
const appId = import.meta.env.VITE_LOGTO_APP_ID ?? "";
// 后端 API resource 指示符(Logto 里建的 API resource 的 indicator),
// getAccessToken(API_RESOURCE) 拿到的令牌 aud=它,后端按此校验。
export const API_RESOURCE = import.meta.env.VITE_LOGTO_API_RESOURCE ?? "https://api.venking.tech";

// base=/admin/ → Logto 回调固定 /admin/callback(需在 Logto 应用的 Redirect URI 里登记)。
export const CALLBACK_PATH = "/admin/callback";
export const callbackUri = () => `${window.location.origin}${CALLBACK_PATH}`;
export const postLogoutUri = () => `${window.location.origin}/admin/`;

export const logtoConfig = {
  endpoint,
  appId,
  // 只声明 API resource:换来的 access token 会自动带上用户在该 resource 下(经角色)获授的
  // 全部 scope(含 admin 权限位),后端据此判 is_admin,前端不解释。
  // 注意:不要在这里请求 profile/email 等用户 scope——一旦带上 resource,Logto(RFC 8707)
  // 会按"该 resource 的 scope"校验,profile 不属于它 → invalid_scope 报错。展示信息以 /api/me
  // 从 token 的 sub/claims 取;需要昵称/邮箱时另走 userinfo,不在登录请求里混。
  resources: [API_RESOURCE],
  // 用户资料(profile/email 供展示)+ 本 resource 的 admin 权限位(后端据此判 is_admin)。
  // 前提:Logto 里这个应用必须是「第一方应用」(is_third_party=false);第三方应用不会自动
  // 授予资源权限且会拒 profile/email → 登录后 is_admin 恒 false。建应用时选普通 SPA,勿选第三方。
  scopes: ["profile", "email", "admin"],
};

export const isConfigured = Boolean(appId);
