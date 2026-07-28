#!/usr/bin/env bash
# 预建一个社交 connector,只为拿到回调地址(config 填占位,不放上登录页)。
# 用法:bash mk-connector.sh <factoryId>    例:bash mk-connector.sh qq-universal
# 拿到地址 → 去对应开放平台建应用 → 回 Logto 管理台把真实凭据填进去。
set -euo pipefail
cd "$(dirname "$0")"
factory="${1:?用法: bash mk-connector.sh <factoryId>(qq-universal / github-universal / feishu-web …)}"

secret=$(docker compose exec -T logto-db psql -U postgres -d logto -tAc \
  "select secret from applications where id='m-default'")
token=$(curl -sS --data-urlencode "grant_type=client_credentials" \
  --data-urlencode "resource=https://default.logto.app/api" --data-urlencode "scope=all" \
  -u "m-default:$secret" http://localhost:3002/oidc/token | jq -r .access_token)
unset secret

id=$(curl -sS -H "Authorization: Bearer $token" http://localhost:3001/api/connectors \
  | jq -r --arg f "$factory" '.[] | select(.connectorId==$f) | .id')

if [ -n "$id" ]; then
  echo "= connector 已存在"
else
  # 各家字段名不同:QQ/GitHub/Google 用 clientId/clientSecret,飞书用 appId/appSecret。
  # 这里两套都塞占位,Logto 只校验自己需要的那几个。
  id=$(curl -sS -X POST -H "Authorization: Bearer $token" -H "Content-Type: application/json" \
    -d "{\"connectorId\":\"$factory\",\"config\":{\"clientId\":\"PLACEHOLDER\",\"clientSecret\":\"PLACEHOLDER\",\"appId\":\"PLACEHOLDER\",\"appSecret\":\"PLACEHOLDER\"},\"syncProfile\":false}" \
    http://localhost:3001/api/connectors | jq -r '.id // .message')
  echo "＋ 已建 connector"
fi

echo
echo "factory      : $factory"
echo "connector ID : $id"
echo "回调地址     : https://auth.venking.tech/callback/$id"
echo
echo "把上面的「回调地址」原样填进开放平台的回调/授权地址栏。"
echo "凭据请在 Logto 管理台填(SSH 隧道 → http://localhost:3002 → Connectors),别发聊天里。"
