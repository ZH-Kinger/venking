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

# --- 选环境文件:生产优先用 .env.production ---
# 为什么要分开:本脚本把选中的文件当作容器的 .env 推上去。以前只认 .env,
# 于是本地开发值(LOGTO_ENDPOINT=http://localhost:3001、DATABASE_URL=…localhost/blog_rag_dev)
# 被原样推进生产,线上 JWKS 取不到、业务库连不上——而且不报错,只是静默失效。
# 现在:有 .env.production 就用它,没有才回退 .env(纯本地实验时的行为不变)。
ENV_FILE="${ENV_FILE:-}"
if [ -z "$ENV_FILE" ]; then
  if [ -f .env.production ]; then ENV_FILE=".env.production"; else ENV_FILE=".env"; fi
fi
[ -f "$ENV_FILE" ] || { echo "❌ 缺 rag-server/$ENV_FILE(需含 DASHSCOPE_API_KEY + UI_AUTH_USER/PASS)"; exit 1; }
echo "==> 环境文件:$ENV_FILE"
grep -qE '^UI_AUTH_PASS=.+' "$ENV_FILE" || echo "⚠️  $ENV_FILE 未设 UI_AUTH_PASS —— 公网将无登录鉴权,建议先设强密码再部署!"
if grep -qE '^(LOGTO_ENDPOINT|DATABASE_URL)=.*(localhost|127\.0\.0\.1|::1|host\.docker\.internal)' "$ENV_FILE"; then
  echo "❌ $ENV_FILE 里 LOGTO_ENDPOINT / DATABASE_URL 指向本机地址 —— 推上去线上会静默失效。"
  exit 1
fi
# 正向断言比"排除 localhost"更可靠:config.py 里 logto_endpoint 的**默认值**就是
# http://localhost:3001,所以 .env.production 里**根本不写这个键**时,反向检查全绿、
# 线上照样退回 localhost —— 正是这条预检要拦的事故。
if ! grep -qE '^LOGTO_ENDPOINT=https://' "$ENV_FILE"; then
  echo "❌ $ENV_FILE 缺少 LOGTO_ENDPOINT=https://…(不写会落到 config.py 的 localhost 默认值)。"
  echo "   生产应为 LOGTO_ENDPOINT=https://auth.venking.tech"
  exit 1
fi

# --- 预检:服务器有没有 docker ---
if ! ssh $SSH_OPTS "$SERVER" "command -v docker >/dev/null 2>&1"; then
  echo "❌ 服务器没装 docker。请先在服务器上安装(国内推荐):"
  echo "     curl -fsSL https://get.docker.com | sh -s -- --mirror Aliyun"
  echo "   装好后重跑本脚本。"
  exit 1
fi

# --- 1. 打包推送(tar 走 ssh 管道,加密传输) ---
echo "==> 推送代码 + chroma 库(约 33M)…"
# COPYFILE_DISABLE=1:macOS 的 bsdtar 默认把扩展属性另存为 ._xxx 伴生文件,
# 解包后服务器上会多出一堆 ._* 垃圾(2026-07 清过 97 个)。这个变量让它别干这事。
#
# ⚠️ data/ 下的**运行时状态库绝不能从本地推上去覆盖生产** —— 那是用户数据,不是代码:
#     admin.sqlite       业务库(conversations/messages/audit_logs),由 alembic 在服务器上建
#     checkpoints.sqlite LangGraph 对话检查点(短期记忆)
#     *-wal / *-shm      SQLite 的 WAL 与共享内存,漏排会让库不一致
#   2026-07 就因为漏排,连着三次部署用本地 checkpoints 覆盖了生产的。
#   该推的只有 chroma 向量库与 record_manager —— 它们是"内容",由本地 ingest 产出。
export COPYFILE_DISABLE=1
tar czf - \
  --exclude='._*' \
  --exclude='.DS_Store' \
  --exclude='.venv' \
  --exclude='__pycache__' \
  --exclude='*.pyc' \
  --exclude='.pytest_cache' \
  --exclude='.ruff_cache' \
  --exclude='tests' \
  --exclude='data/_archive' \
  --exclude='data/inbox' \
  --exclude='data/admin.sqlite*' \
  --exclude='data/checkpoints.sqlite*' \
  --exclude='.git' \
  src pyproject.toml Dockerfile docker-compose.yml .dockerignore "$ENV_FILE" alembic alembic.ini data \
  | ssh $SSH_OPTS "$SERVER" "set -e
      mkdir -p '$REMOTE_DIR'
      tar xzf - -C '$REMOTE_DIR'
      cd '$REMOTE_DIR'
      # 按实际选中的文件名改名(不能只认 .env.production,否则 ENV_FILE=xxx 覆盖时
      # 文件推上去了却没生效,容器继续用服务器上遗留的旧 .env —— 静默用错配置)。
      if [ -f '$(basename "$ENV_FILE")' ] && [ '$(basename "$ENV_FILE")' != '.env' ]; then
        mv -f '$(basename "$ENV_FILE")' .env
      fi"
# 注:上面**不能**写成 `tar xzf ... && [ -f x ] && mv ... || true` ——
# `||` 绑定的是整条 AND 列表,磁盘满/流损坏导致 tar 非 0 时会被整条兜成 0,
# 脚本继续用旧代码构建并打印"✅ 成功"。改用 set -e + 独立语句。

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
  # ⚠️ 必须写成 `if ! out=$(...)` —— 脚本开了 set -e,写成 `out=$(...); rc=$?` 的话
  #    ssh 非 0 会让 shell **当场退出**,后面的错误分支是死代码,一个字都打不出来。
  #    也不能写 `if ssh ... | tail; then` —— 管道退出码来自 tail,恒为 0,失败会报成成功
  #    (2026-07 踩过:迁移抛 SyntaxError 却打印"✅ 迁移完成")。
  echo "==> 应用数据库迁移(alembic upgrade head)…"
  if mig_out=$(ssh $SSH_OPTS "$SERVER" "cd '$REMOTE_DIR' && docker compose exec -T agent alembic upgrade head" 2>&1); then
    echo "$mig_out" | tail -6
    echo "✅ 迁移完成"
  else
    echo "$mig_out" | tail -20
    echo "❌ 迁移失败 —— 服务已起,但 /api/me/* 与 /api/admin/* 会 500。"
    echo "   手查:ssh $SERVER \"cd $REMOTE_DIR && docker compose exec -T agent alembic upgrade head\""
    exit 1
  fi
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
