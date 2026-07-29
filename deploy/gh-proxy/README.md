# GitHub OAuth 出站代理

## 为什么存在

Logto 的 GitHub 登录有两段 OAuth:

1. **浏览器 → github.com 授权** —— 走用户自己的网络,没问题
2. **Logto 服务器 → `github.com/login/oauth/access_token` 换令牌** —— 走服务器出口

服务器在国内、无代理,第 2 段间歇性完全不通(实测:5 秒超时下 8/8 全断,
换个时段又 15/15 全通)。Logto 用的 ky 超时约 5s,一旦落在阻断窗口,
用户在 GitHub 上明明授权成功了,回来却是「网络错误」。

`api.github.com` 不受影响(解析到另一个 IP 段),所以只有换令牌这一步需要绕。

## 为什么这么绕

- **不能用环境变量**:Logto 跑在 Node 22 上,Node 直到 24 才有 `NODE_USE_ENV_PROXY`,
  22 不认 `HTTP_PROXY`。所以只能在网络层做,对应用透明。
- **WARP 的 SOCKS5 只监听 127.0.0.1**,容器访问不到宿主回环。
- **宿主的 443 被 nginx 占着**(`listen 443` 绑 0.0.0.0,覆盖了 docker 网桥地址),
  所以宿主上没法直接接 `github.com:443` 的流量。
  改 nginx 只绑公网 IP 可以腾出端口,但那会把服务器 IP 写进要提交到**公开仓库**的
  配置文件里,违反项目硬约束。
- 容器有**自己的网络命名空间**,里面的 443 是空的 —— 于是多一跳容器解决端口冲突。

## 链路

```
Logto 容器
  │  docker 内置 DNS 把 github.com 解析到 gh-proxy(网络别名,无需改 Logto 任何配置)
  ▼
gh-proxy 容器 :443            桥接网内,tcp2socks.py --plain(纯 TCP 转发)
  │
  ▼
gh-tunnel 容器 172.20.0.1:18443   network_mode: host,tcp2socks.py(说 SOCKS5)
  │
  ▼
WARP SOCKS5 127.0.0.1:40000
  │
  ▼
github.com:443
```

两个都是 compose 服务,**不需要 systemd 单元** —— 起停、重启策略、拆除都交给 docker。

用**网络别名**而不是 `extra_hosts`:后者要写死 IP,就得给容器分配静态 IP,
而静态 IP 要求网络显式声明 subnet —— 改 networks 会让 docker 重建网络,
连带重建 logto 与 postgres。别名由内置 DNS 解析,零静态 IP、零网络改动。

**全程是盲隧道,不终止 TLS。** GitHub 的真实证书由 Logto 自己校验,
中间任何一跳都看不到明文,不构成中间人。
(验证方式:在 Logto 容器内 `wget https://github.com/...` 能成功 = 证书链完好。)

## 代价(知情选择)

- 多两个自维护容器(gh-proxy / gh-tunnel)
- `warp-svc` 常驻约 95MB(这台机总共 1.8G)
- **境内已备案服务器跑跨境隧道属于合规灰区**,自行权衡
- 收益仅限一个可选的第三方登录方式;邮箱登录与国内社交登录(QQ 等)都不需要它

## 拆除

```bash
cd /root/logto
docker compose stop gh-proxy gh-tunnel && docker compose rm -f gh-proxy gh-tunnel
# 再从 docker-compose.yml 里删掉这两段服务定义
systemctl disable --now warp-svc
dnf remove -y cloudflare-warp && rm -f /etc/yum.repos.d/cloudflare-warp.repo
bash /root/logto/social.sh --disable github     # 从登录页撤下入口
```

## 排障

链路有四跳,坏在哪一跳分别这么查:

```bash
# ① Logto 容器里 github.com 是否解析到 gh-proxy
docker compose exec -T logto sh -c 'getent hosts github.com'      # 应为 gh-proxy 的容器 IP

# ② 端到端(这条通了就没问题;404 是正常的,POST 无参数)
docker compose exec -T logto sh -c 'wget -q -O /dev/null -T 5 --post-data="" \
  --server-response https://github.com/login/oauth/access_token 2>&1 | head -1'

# ③ 两跳转发器自己的日志
docker logs gh-proxy --tail 20 ; docker logs gh-tunnel --tail 20

# ④ WARP 还连着吗(最常见的失效点:重启后没自动连)
warp-cli --accept-tos status
```
