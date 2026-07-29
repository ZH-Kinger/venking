#!/usr/bin/env bash
# 把某个角色设为「默认角色」:此后**每个新注册用户**自动获得它。
#
# 为什么需要:Logto 建出来的角色默认 isDefault=false,新注册用户**一个角色都没有** ——
# 连 chat:write / history:read 都拿不到,登录了却读不了自己的对话历史。
# 所以 user 应设为默认(基础权限自动给),admin 必须保持手动授予。
#
# ⚠️ 反过来也要小心:**绝不能把 admin 设为默认** —— 那等于任何人注册即管理员。
#    跑完请用输出确认 admin 那行是 false。
#   bash set-default-role.sh user            设为默认
#   bash set-default-role.sh user --unset    取消默认
# 已存在的老用户不受影响(默认角色只在注册那一刻生效),需要的话用 grant-role.sh 补。
set -euo pipefail
cd /root/logto
role="${1:?用法: bash set-default-role.sh <角色名> [--unset]}"
val=true; [ "${2:-}" = "--unset" ] && val=false

secret=$(docker compose exec -T logto-db psql -U postgres -d logto -tAc \
  "select secret from applications where id='m-default'")
token=$(curl -sS --data-urlencode "grant_type=client_credentials" \
  --data-urlencode "resource=https://default.logto.app/api" --data-urlencode "scope=all" \
  -u "m-default:$secret" http://localhost:3002/oidc/token | jq -r .access_token)
unset secret
g() { curl -sS -H "Authorization: Bearer $token" "http://localhost:3001$1"; }

rid=$(g /api/roles | jq -r --arg n "$role" '.[]|select(.name==$n and .type=="User")|.id')
[ -n "$rid" ] || { echo "✗ 找不到角色 $role"; exit 1; }

curl -sS -X PATCH -H "Authorization: Bearer $token" -H "Content-Type: application/json" \
  -d "$(jq -nc --argjson v "$val" '{isDefault:$v}')" "http://localhost:3001/api/roles/$rid" >/dev/null

echo "角色现状:"
g /api/roles | jq -r '.[]|select(.type=="User")|"  \(.name)\t默认角色=\(.isDefault)"'
