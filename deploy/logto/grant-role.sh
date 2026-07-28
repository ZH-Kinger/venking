#!/usr/bin/env bash
# 给 default 租户的终端用户授/撤角色。
#
#   bash grant-role.sh <邮箱或用户ID> admin      # 授予
#   bash grant-role.sh <邮箱或用户ID> admin --revoke
#   bash grant-role.sh --list                     # 列出所有用户及其角色
#
# 为什么要有这个:Logto 管理台只走 SSH 隧道,授个角色要开隧道、点四五层菜单;
# 而这是每加一个管理员就要做一次的事。脚本化后可复现、可写进交接文档。
#
# 注意租户:venking 的**终端用户**在 default 租户;admin 租户里那个是 Logto
# 控制台自己的管理员,两者不是一回事,别搞混。
set -euo pipefail
cd "$(dirname "$0")"

secret=$(docker compose exec -T logto-db psql -U postgres -d logto -tAc \
  "select secret from applications where id='m-default'")
token=$(curl -sS --data-urlencode "grant_type=client_credentials" \
  --data-urlencode "resource=https://default.logto.app/api" --data-urlencode "scope=all" \
  -u "m-default:$secret" http://localhost:3002/oidc/token | jq -r .access_token)
unset secret
api() { local m=$1 p=$2 b=${3:-}
  if [ -n "$b" ]; then curl -sS -X "$m" -H "Authorization: Bearer $token" \
      -H "Content-Type: application/json" -d "$b" "http://localhost:3001$p"
  else curl -sS -X "$m" -H "Authorization: Bearer $token" "http://localhost:3001$p"; fi; }

if [ "${1:-}" = "--list" ]; then
  echo "用户及其角色(default 租户):"
  for uid in $(api GET "/api/users?page_size=100" | jq -r '.[].id'); do
    printf '  %-14s %-28s ' "$uid" \
      "$(api GET "/api/users/$uid" | jq -r '.primaryEmail // .username // "(无标识)"')"
    api GET "/api/users/$uid/roles" | jq -r 'if length==0 then "(无角色)" else [.[].name]|join(", ") end'
  done
  exit 0
fi

ident="${1:?用法: bash grant-role.sh <邮箱或用户ID> <角色名> [--revoke] | --list}"
role="${2:?缺角色名,如 admin}"
revoke=false; [ "${3:-}" = "--revoke" ] && revoke=true

# 认邮箱也认用户 ID —— 邮箱好记,ID 稳定
uid=$(api GET "/api/users?page_size=100" \
  | jq -r --arg i "$ident" '.[] | select(.id==$i or .primaryEmail==$i or .username==$i) | .id' | head -1)
[ -n "$uid" ] || { echo "✗ 找不到用户:$ident(注意终端用户在 default 租户)"; exit 1; }

rid=$(api GET /api/roles | jq -r --arg n "$role" '.[]|select(.name==$n and .type=="User")|.id')
[ -n "$rid" ] || { echo "✗ 找不到角色:$role(先跑 setup.sh 建角色)"; exit 1; }

have=$(api GET "/api/users/$uid/roles" | jq -r --arg n "$role" '[.[]|select(.name==$n)]|length')

if $revoke; then
  if [ "$have" = "0" ]; then echo "= 用户本就没有 $role"; else
    api DELETE "/api/users/$uid/roles/$rid" >/dev/null; echo "－ 已撤销 $role"; fi
else
  if [ "$have" != "0" ]; then echo "= 用户已有 $role"; else
    api POST "/api/users/$uid/roles" "$(jq -nc --arg r "$rid" '{roleIds:[$r]}')" >/dev/null
    echo "＋ 已授予 $role"; fi
fi

echo -n "当前角色:"
api GET "/api/users/$uid/roles" | jq -r 'if length==0 then " (无)" else " " + ([.[].name]|join(", ")) end'
echo "⚠️ 角色变更后需**重新登录**才生效 —— 权限位写在 access token 里,旧 token 直到过期都还是旧权限。"
