# Logto 统一 IAM

自托管开源 IAM,承载 ZH-Kinger 的**管理员 + 终端用户**身份:多方式登录(邮箱密码 / GitHub / 邮箱 magic link / 后续微信·QQ·飞书)、注册、OIDC。后端(FastAPI)用 JWKS 校验其签发的 access token,取 `sub` 作稳定 user_id 绑定 AI 历史。

## 本地起

```bash
cd deploy/logto
cp .env.example .env
docker compose up -d          # 首次会拉镜像 + seed 数据库
docker compose logs -f logto  # 看到 "Core app is running" 即就绪
```

- 登录/OIDC 端点:http://localhost:3001
- 管理台:http://localhost:3002 —— **首次访问创建 Logto 管理员账号**

## 首次在管理台配置(一次性)

1. **API resource**:Applications 旁 API resources → 新建,indicator 填 `https://api.venking.tech`(仅标识符,不必真实可达)。后端校验 `aud` 用它。
2. **Roles**:Roles → 建 `admin`、`user`,按需给 API 权限。
3. **应用(SPA)**:各建一个 Single Page App:
   - `admin-web`:redirect URI `http://localhost:5173/callback`,post sign-out `http://localhost:5173`。
   - `ai-frontend`:redirect URI `http://localhost:7860/callback`。
   记下各自 **App ID**(前端用)。
4. **Sign-in experience**:开「邮箱+密码」并允许注册;社交区接 **GitHub connector**(填你的 GitHub OAuth App 的 Client ID/Secret,回调地址用 Logto 给的);品牌色改靛紫深色。
5. (可选)**Email connector**(SMTP/Resend)→ 开邮箱验证码 / magic link。

> GitHub OAuth App:github.com → Settings → Developer settings → OAuth Apps → New;Authorization callback URL 填 Logto GitHub connector 页给出的地址。

## 生产(备案 + HTTPS 后)

改 `.env` 的 `LOGTO_ENDPOINT`/`LOGTO_ADMIN_ENDPOINT` 为子域名(如 `auth.venking.tech`),nginx 反代 3001/3002,证书就绪后开放。social/redirect URI 同步改成线上地址。

## 数据

身份数据落 `logto-db`(独立 Postgres 容器 + 命名卷 `logto-db-data`),与业务库 `blog_rag_dev` 隔离。`.env`(真实凭据)不入库。
