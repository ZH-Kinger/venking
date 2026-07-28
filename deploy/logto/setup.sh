#!/usr/bin/env bash
# Logto 租户初始化 —— 幂等,可反复重跑。
#
# 在**服务器上**跑(需要能连 logto-db 容器与 127.0.0.1:3001/3002):
#   cd /root/logto && bash setup.sh
#
# 为什么走 Management API 而不是管理台点鼠标:配置可复现、可 diff、可重建。
# 凭据来源:seed 出来的 M2M 应用 m-default(属 admin 租户),其 secret 从库里取,
# 全程只存在于本脚本的局部变量,不落盘、不进日志。
#
# 端点分工(OSS 单机版容易搞混):
#   - 换 token 走 **admin 租户** 的 OIDC:http://localhost:3002/oidc/token
#   - 调 Management API 走 **default 租户**:http://localhost:3001/api/*
set -euo pipefail

API_INDICATOR="https://api.venking.tech"   # 我方资源服务器(rag-server)校验 JWT 的 audience
SITE="https://venking.tech"
CORE=http://localhost:3001
ADMIN=http://localhost:3002

command -v jq >/dev/null || { echo "需要 jq:dnf install -y jq"; exit 1; }

secret=$(docker compose exec -T logto-db psql -U postgres -d logto -tAc \
  "select secret from applications where id='m-default'")
[ -n "$secret" ] || { echo "✗ 取不到 m-default secret"; exit 1; }

token=$(curl -sS \
  --data-urlencode "grant_type=client_credentials" \
  --data-urlencode "resource=https://default.logto.app/api" \
  --data-urlencode "scope=all" \
  -u "m-default:$secret" "$ADMIN/oidc/token" | jq -r .access_token)
[ "$token" != "null" ] && [ -n "$token" ] || { echo "✗ 取 token 失败"; exit 1; }
unset secret

api() {  # api <METHOD> <PATH> [JSON]
  local m=$1 p=$2 body=${3:-}
  if [ -n "$body" ]; then
    curl -sS -X "$m" -H "Authorization: Bearer $token" -H "Content-Type: application/json" \
      -d "$body" "$CORE$p"
  else
    curl -sS -X "$m" -H "Authorization: Bearer $token" "$CORE$p"
  fi
}

# ── ① API resource ─────────────────────────────────────────────────
res_id=$(api GET /api/resources | jq -r --arg i "$API_INDICATOR" '.[]|select(.indicator==$i)|.id')
if [ -z "$res_id" ]; then
  res_id=$(api POST /api/resources "$(jq -nc --arg n "venking API" --arg i "$API_INDICATOR" \
    '{name:$n, indicator:$i, accessTokenTtl:3600}')" | jq -r .id)
  echo "＋ 建 API resource: $API_INDICATOR ($res_id)"
else
  echo "= API resource 已存在 ($res_id)"
fi

# ── ② scopes(权限颗粒)───────────────────────────────────────────
declare -A SCOPES=(
  [chat:write]="发起 AI 对话"
  [history:read]="读取自己的对话历史"
  [admin:all]="后台管理全部权限"
)
existing_scopes=$(api GET "/api/resources/$res_id/scopes" | jq -r '.[].name')
for s in "${!SCOPES[@]}"; do
  if ! grep -qx "$s" <<<"$existing_scopes"; then
    api POST "/api/resources/$res_id/scopes" \
      "$(jq -nc --arg n "$s" --arg d "${SCOPES[$s]}" '{name:$n, description:$d}')" >/dev/null
    echo "＋ 建 scope: $s"
  else
    echo "= scope 已存在: $s"
  fi
done
scope_ids=$(api GET "/api/resources/$res_id/scopes" | jq -c '[.[]|{id,name}]')

# ── ③ roles + 授权 ─────────────────────────────────────────────────
# user 只能聊天和看自己的历史;admin 额外拿 admin:all。
grant_role() {  # grant_role <roleName> <scopeName...>
  local rname=$1; shift
  local rid
  rid=$(api GET /api/roles | jq -r --arg n "$rname" '.[]|select(.name==$n)|.id')
  if [ -z "$rid" ]; then
    rid=$(api POST /api/roles "$(jq -nc --arg n "$rname" --arg d "venking $rname" \
      '{name:$n, description:$d, type:"User"}')" | jq -r .id)
    echo "＋ 建 role: $rname ($rid)"
  else
    echo "= role 已存在: $rname ($rid)"
  fi
  local have want=()
  have=$(api GET "/api/roles/$rid/scopes" | jq -r '.[].name')
  for s in "$@"; do
    grep -qx "$s" <<<"$have" && continue
    want+=("$(jq -r --arg n "$s" '.[]|select(.name==$n)|.id' <<<"$scope_ids")")
  done
  if [ ${#want[@]} -gt 0 ]; then
    api POST "/api/roles/$rid/scopes" \
      "$(printf '%s\n' "${want[@]}" | jq -Rsc 'split("\n")|map(select(length>0))|{scopeIds:.}')" >/dev/null
    echo "  ＋ 授权 $rname: $*"
  fi
}
grant_role user  chat:write history:read
grant_role admin chat:write history:read admin:all

# ── ④ SPA 应用 ─────────────────────────────────────────────────────
# 回调同时留生产与本地开发两套,方便本地起 dev server 调登录。
mk_spa() {  # mk_spa <name> <redirectUri...> ;最后一个参数当 postLogout
  local name=$1; shift
  local id
  id=$(api GET /api/applications | jq -r --arg n "$name" '.[]|select(.name==$n)|.id')
  if [ -n "$id" ]; then echo "= 应用已存在: $name ($id)"; return; fi
  local uris; uris=$(printf '%s\n' "$@" | jq -Rsc 'split("\n")|map(select(length>0))')
  id=$(api POST /api/applications "$(jq -nc --arg n "$name" --argjson u "$uris" --arg s "$SITE" \
    '{name:$n, type:"SPA", oidcClientMetadata:{redirectUris:$u, postLogoutRedirectUris:[$s]}}')" | jq -r .id)
  echo "＋ 建 SPA 应用: $name → App ID $id"
}
mk_spa "admin-web"   "$SITE/admin/callback" "http://localhost:5173/callback"
mk_spa "ai-frontend" "$SITE/ai/callback"    "http://localhost:7860/callback"

# ── ⑤ 登录体验:邮箱+密码 + 开放注册 + 靛紫深色品牌 ──────────────────
# 邮箱验证码依赖已配好的 163 SMTP connector(实测认证通过)。
# 用邮箱而不是用户名作主标识:换设备/忘密码都能自助找回,用户名做不到。
# 社交登录(GitHub 等)在这里不动 —— 接了 connector 后 Logto 自动加进登录页,
# 只需把 target 加进 socialSignInConnectorTargets,不改本脚本其余部分。
api PATCH /api/sign-in-exp "$(cat <<'JSON'
{
  "color": {
    "primaryColor": "#5e6ad2",
    "isDarkModeEnabled": true,
    "darkPrimaryColor": "#8b6cf8"
  },
  "signUp": {
    "identifiers": ["email"],
    "password": true,
    "verify": true
  },
  "signIn": {
    "methods": [
      { "identifier": "email", "password": true, "verificationCode": true, "isPasswordPrimary": true }
    ]
  },
  "passwordPolicy": {
    "length": { "min": 10, "max": 256 },
    "characterTypes": { "min": 2 },
    "rejects": { "pwned": true, "repetitionAndSequence": true, "userInfo": true, "words": ["venking", "kinger"] }
  }
}
JSON
)" >/dev/null
echo "＋ 登录体验:邮箱+密码+验证码,开放注册,靛紫深色,密码策略 10 位起"

echo
echo "── 结果 ──"
api GET /api/applications | jq -r '.[]|"应用  \(.name)\tApp ID: \(.id)"'
api GET /api/roles        | jq -r '.[]|select(.type=="User")|"角色  \(.name)\t\(.id)"'
echo "资源  $API_INDICATOR ($res_id)"
echo
echo "注意:App ID 不是机密(SPA 是公开客户端,ID 会出现在前端代码里),可以入库。"
