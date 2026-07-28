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
  // resources:声明要给哪个 API resource 换令牌。拿到的 access token 的 aud 即它,
  // 后端按此校验(见 rag-server 的 logto_auth.verify_bearer)。
  resources: [API_RESOURCE],
  // profile/email 用于展示;admin:all 是本 resource 上的管理员权限位,后端据此判 is_admin。
  //
  // ⚠️ 权限位名字必须与三处**逐字一致**,任何一处对不上都表现为"登录成功但一直 403":
  //     ① Logto 里 API resource 的 scope 名(deploy/logto/setup.sh 建的是 admin:all)
  //     ② 后端 LOGTO_ADMIN_SCOPE(config.py 默认 admin,生产 .env 必须覆盖成 admin:all)
  //     ③ 这里请求的 scope
  // ⚠️ 前提:该应用必须是「第一方应用」(is_third_party=false)。第三方应用不会自动授予
  //    资源权限、且会拒 profile/email → is_admin 恒 false。建应用时选普通 SPA,勿选第三方。
  scopes: ["profile", "email", "admin:all"],
};

export const isConfigured = Boolean(appId);
