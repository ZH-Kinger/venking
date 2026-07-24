#!/usr/bin/env bash
# ============================================================
# 一键部署 Blog RAG agent 到服务器
#
# 用法(在 rag-server/ 目录下,git bash 里跑):
#     SERVER=root@YOUR_SERVER_IP bash deploy.sh
# 或改下面默认值直接 `bash deploy.sh`。
#
# 做三件事:
#   1. tar-over-ssh 把代码 + .env + 33M chroma 库推到服务器(不装 rsync 也能用)
#   2. 预检服务器有没有 docker
#   3. **脱离 SSH 会话**在服务器后台构建 + 起服务,再轮询终态
#
# 为什么构建要脱离会话(踩过坑):前台 `ssh "docker compose up --build"` 在小内存机上
# 构建耗时长,SSH 长连接易被 reset → 构建进程被杀、部署半途而废、旧镜像继续 crash-loop。
# 用 setsid 让构建脱离 SSH 会话,断连也不影响;脚本改为轮询 build.log 的哨兵判定结果。
# 所有 ssh 另加 keepalive(ServerAliveInterval)进一步防抖。
# ============================================================
set -euo pipefail

SERVER="${SERVER:?请设置 SERVER=user@host,例如 SERVER=root@YOUR_SERVER_IP}"
REMOTE_DIR="${REMOTE_DIR:-/root/blog-rag}"
SSH_OPTS="-o ServerAliveInterval=15 -o ServerAliveCountMax=4 -o ConnectTimeout=15 -o StrictHostKeyChecking=accept-new"

echo "==> 目标:$SERVER:$REMOTE_DIR"

# --- 预检:.env 必须存在且填了鉴权(否则公网裸奔) ---
[ -f .env ] || { echo "❌ 缺 rag-server/.env(需含 DASHSCOPE_API_KEY + UI_AUTH_USER/PASS)"; exit 1; }
grep -qE '^UI_AUTH_PASS=.+' .env || echo "⚠️  .env 未设 UI_AUTH_PASS —— 公网将无登录鉴权,建议先设强密码再部署!"

# --- 预检:服务器有没有 docker ---
if ! ssh $SSH_OPTS "$SERVER" "command -v docker >/dev/null 2>&1"; then
  echo "❌ 服务器没装 docker。请先在服务器上安装(国内推荐):"
  echo "     curl -fsSL https://get.docker.com | sh -s -- --mirror Aliyun"
  echo "   装好后重跑本脚本。"
  exit 1
fi

# --- 1. 打包推送(tar 走 ssh 管道,加密传输) ---
echo "==> 推送代码 + chroma 库(约 33M)…"
tar czf - \
  --exclude='.venv' \
  --exclude='__pycache__' \
  --exclude='*.pyc' \
  --exclude='.pytest_cache' \
  --exclude='.ruff_cache' \
  --exclude='tests' \
  --exclude='data/_archive' \
  --exclude='data/inbox' \
  --exclude='.git' \
  src pyproject.toml Dockerfile docker-compose.yml .dockerignore .env data \
  | ssh $SSH_OPTS "$SERVER" "mkdir -p '$REMOTE_DIR' && tar xzf - -C '$REMOTE_DIR'"

# --- 2. 脱离会话构建 + 起服务(断连不影响) ---
echo "==> 远程后台构建并启动(setsid 脱离会话,防断连中断)…"
ssh $SSH_OPTS "$SERVER" "cd '$REMOTE_DIR' && rm -f build.log && \
  setsid bash -c 'docker compose build >> build.log 2>&1 && docker compose up -d >> build.log 2>&1 && echo ===DEPLOY_DONE=== >> build.log || echo ===DEPLOY_FAILED=== >> build.log' \
  >/dev/null 2>&1 </dev/null & echo '   构建已在后台启动'"

# --- 3. 轮询终态(最长约 16 分钟) ---
echo "==> 轮询构建进度…"
STATE=""
for i in $(seq 1 40); do
  hit=$(ssh $SSH_OPTS "$SERVER" "grep -aE '===DEPLOY_DONE===|===DEPLOY_FAILED===' '$REMOTE_DIR/build.log' 2>/dev/null | tail -1" 2>/dev/null || true)
  if [ -n "$hit" ]; then STATE="$hit"; break; fi
  printf '.'; sleep 25
done
echo

if echo "$STATE" | grep -q DEPLOY_DONE; then
  echo "✅ 构建+启动成功"
elif echo "$STATE" | grep -q DEPLOY_FAILED; then
  echo "❌ 构建失败,末尾日志:"
  ssh $SSH_OPTS "$SERVER" "tail -20 '$REMOTE_DIR/build.log'"
  exit 1
else
  echo "⚠️  轮询超时,请手动查:ssh $SERVER 'tail -f $REMOTE_DIR/build.log'"
  exit 1
fi

# --- 4. 现状 ---
ssh $SSH_OPTS "$SERVER" "cd '$REMOTE_DIR' && docker compose ps; echo '--- 日志尾部 ---'; docker logs blog-rag-agent 2>&1 | tail -5"

echo ""
echo "✅ 部署完成 → 经 Nginx 访问 https://venking.tech/ai/(容器 7860 仅绑回环,不直连公网)"
echo "   看日志:   ssh $SERVER 'cd $REMOTE_DIR && docker compose logs -f'"
echo "   重启:     ssh $SERVER 'cd $REMOTE_DIR && docker compose restart'"
echo "   停止:     ssh $SERVER 'cd $REMOTE_DIR && docker compose down'"
