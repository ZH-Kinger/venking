#!/usr/bin/env bash
# Logto 现状速查 —— 只读,随时可跑。
#   在服务器上:bash /root/logto/inspect.sh
#
# 端点分工(OSS 单机版最容易踩的坑):
#   换 Management API token 走 **admin 租户** http://localhost:3002/oidc/token
#   调 Management API   走 **default 租户** http://localhost:3001/api/*
# 对着公网的 auth.venking.tech 换 token 会报 invalid_client —— 那是 default 租户的端点。
set -euo pipefail
cd "$(dirname "$0")"

secret=$(docker compose exec -T logto-db psql -U postgres -d logto -tAc \
  "select secret from applications where id='m-default'")
token=$(curl -sS --data-urlencode "grant_type=client_credentials" \
  --data-urlencode "resource=https://default.logto.app/api" --data-urlencode "scope=all" \
  -u "m-default:$secret" http://localhost:3002/oidc/token | jq -r .access_token)
unset secret
g() { curl -sS -H "Authorization: Bearer $token" "http://localhost:3001$1"; }

echo "── 应用(App ID 非机密,SPA 是公开客户端)──"
g /api/applications | jq -r '.[] | "\(.name)\t\(.type)\tApp ID: \(.id)\n\t回调: \(.oidcClientMetadata.redirectUris|join(", "))"'

echo
echo "── API resource 与 scopes ──"
for rid in $(g /api/resources | jq -r '.[]|select(.indicator|startswith("https://api."))|.id'); do
  g "/api/resources/$rid" | jq -r '"\(.name)  \(.indicator)"'
  g "/api/resources/$rid/scopes" | jq -r '.[]|"    \(.name)\t\(.description)"'
done

echo
echo "── 角色 ──"
for r in $(g /api/roles | jq -r '.[]|select(.type=="User")|.id'); do
  printf '%s: ' "$(g /api/roles | jq -r --arg i "$r" '.[]|select(.id==$i)|.name')"
  g "/api/roles/$r/scopes" | jq -r '[.[].name]|join(", ")'
done

echo
echo "── Connector ──"
g /api/connectors | jq -r '.[] | "\(.type)\t\(.connectorId)\tid=\(.id)" +
  (if .type=="Social" then "\n\t回调: https://auth.venking.tech/callback/\(.id)" +
     (if (.config.clientId // "") == "PLACEHOLDER" then "\n\t⚠️ 凭据仍是 PLACEHOLDER,登录会失败" else "" end)
   else "" end)'

echo
echo "── 登录体验 ──"
g /api/sign-in-exp | jq -r '"注册标识: \(.signUp.identifiers|join(","))  需验证: \(.signUp.verify)
登录方式: \(.signIn.methods|map("\(.identifier)"+(if .password then "+密码" else "" end)+(if .verificationCode then "+验证码" else "" end))|join(" / "))
社交登录: \(if (.socialSignInConnectorTargets|length)==0 then "(未开启)" else (.socialSignInConnectorTargets|join(", ")) end)
主色: \(.color.primaryColor) / 深色 \(.color.darkPrimaryColor)"'

echo
echo "── 用户数(default 租户 = venking 终端用户;admin 租户 = Logto 控制台管理员)──"
docker compose exec -T logto-db psql -U postgres -d logto -tAc \
  "select tenant_id || ': ' || count(*) from users group by tenant_id;"
