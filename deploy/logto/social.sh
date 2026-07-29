#!/usr/bin/env bash
# 控制登录页上显示哪些社交登录入口。
#
#   bash social.sh --list                 查看当前启用的
#   bash social.sh --enable qq            加到登录页
#   bash social.sh --disable github       从登录页撤下(connector 配置保留,随时可再开)
#
# 为什么单独成脚本而不并进 setup.sh:setup.sh 管的是**结构**(资源/角色/应用/登录方式),
# 这里管的是**运营开关** —— 某个社交登录当下能不能用(审核中、上游连不通)会变,
# 不该每次都动结构脚本。
#
# ⚠️ 撤下 ≠ 删除:仅从登录 UI 隐藏,connector 与凭据都在。
#    "点了走到一半失败"比"根本没这个按钮"体验差得多,上游不通时应当撤下而不是留着。
set -euo pipefail
cd "$(dirname "$0")"

secret=$(docker compose exec -T logto-db psql -U postgres -d logto -tAc \
  "select secret from applications where id='m-default'")
token=$(curl -sS --data-urlencode "grant_type=client_credentials" \
  --data-urlencode "resource=https://default.logto.app/api" --data-urlencode "scope=all" \
  -u "m-default:$secret" http://localhost:3002/oidc/token | jq -r .access_token)
unset secret
g() { curl -sS -H "Authorization: Bearer $token" "http://localhost:3001$1"; }

cur=$(g /api/sign-in-exp | jq -c '.socialSignInConnectorTargets')

show() {
  echo -n "登录页当前启用: "
  [ "$(jq 'length' <<<"$1")" = "0" ] && echo "(无,只有邮箱)" || jq -c <<<"$1"
  echo "可用的 connector(target = 括号里的名字):"
  g /api/connectors | jq -r '.[] | select(.type=="Social") |
    "  \(.target)\t凭据" + (if ([.config|to_entries[]|select((.value|tostring)=="PLACEHOLDER")]|length)>0
      then "⚠️ 未填全" else "已就绪" end)'
}

case "${1:---list}" in
  --list) show "$cur" ;;
  --enable|--disable)
    t="${2:?用法: bash social.sh --enable|--disable <target>,如 qq / github}"
    # 只允许启用**凭据已填全**的 —— 挂个必定失败的按钮上去毫无意义
    if [ "$1" = "--enable" ]; then
      bad=$(g /api/connectors | jq -r --arg t "$t" '.[]|select(.target==$t)|
        [.config|to_entries[]|select((.value|tostring)=="PLACEHOLDER")]|length')
      [ -z "$bad" ] && { echo "✗ 没有 target=$t 的 connector"; exit 1; }
      [ "$bad" = "0" ] || { echo "✗ $t 的凭据还有占位未填,拒绝上架"; exit 1; }
      new=$(jq -c --arg t "$t" '. + [$t] | unique' <<<"$cur")
    else
      new=$(jq -c --arg t "$t" 'map(select(. != $t))' <<<"$cur")
    fi
    curl -sS -X PATCH -H "Authorization: Bearer $token" -H "Content-Type: application/json" \
      -d "$(jq -nc --argjson s "$new" '{socialSignInConnectorTargets:$s}')" \
      http://localhost:3001/api/sign-in-exp >/dev/null
    echo "旧: $cur"
    echo "新: $new"
    ;;
  *) echo "用法: bash social.sh [--list | --enable <target> | --disable <target>]"; exit 1 ;;
esac
