// Logto 接入配置(全部从 .env 读,绝不硬编码 App ID)。
// 见 .env.example;本地开发把真实值写进 admin-web/.env(已 gitignore)。
import { UserScope } from "@logto/react";

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
  // 声明要用的 API resource;换来的 access token 会带上用户在该 resource 下被授予的全部 scope
  // (含 admin 权限位,由后端判定,前端不解释)。
  resources: [API_RESOURCE],
  // 要到邮箱/资料用于展示;is_admin 一律以后端 /api/me 为准。
  scopes: [UserScope.Email, UserScope.Profile],
};

export const isConfigured = Boolean(appId);
