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

## ⚠️ 关键坑:应用必须建成「第一方」(2026-07-25 血泪)

在 Logto 建 SPA 应用时**务必选普通应用,不要选「第三方应用(Third-party app)」**。
- 第三方应用不会自动把用户经角色获得的 API resource 权限位放进 access token(授权记录 resources=null),
  且会拒绝 profile/email(invalid_scope)→ 登录后 is_admin 恒为 false、进不了后台。
- 症状:登录能过,但 `/api/me` 的 is_admin 一直 false;OIDC 授权页出现"授权给 <app>"同意页。
- 排查:`select is_third_party from applications where id='<appId>'`;为 `t` 即误建成第三方。
- 修复:改回第一方 `update applications set is_third_party=false where id='<appId>'` → 重启 Logto →
  清掉旧 Grant(`delete from oidc_model_instances where model_name='Grant' and payload::text like '%<appId>%'`)→
  用户重新登录(无痕,避开缓存令牌)。

## 权限位怎么通到后端(RBAC)
1. API resource(indicator `https://api.venking.tech`)下建 scope `admin`。
2. 建 User 类型角色 `admin`(**不是 M2M**;M2M 角色绑不到人类用户),勾上该 `admin` scope。
3. 给用户分配 `admin` 角色。前端登录请求 `scopes:['admin']` + 该 resource → token.scope 含 `admin` → 后端 is_admin=true。
