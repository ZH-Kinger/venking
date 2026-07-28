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
  │  extra_hosts: github.com → gh-proxy 容器 IP
  ▼
gh-proxy 容器 :443            (tcp2socks.py --plain,纯 TCP 转发)
  │
  ▼
宿主 gh-tunnel.service :18443 (tcp2socks.py,说 SOCKS5)
  │
  ▼
WARP SOCKS5 127.0.0.1:40000
  │
  ▼
github.com:443
```

**全程是盲隧道,不终止 TLS。** GitHub 的真实证书由 Logto 自己校验,
中间任何一跳都看不到明文,不构成中间人。

## 代价(知情选择)

- 多两个自维护组件(一个容器 + 一个 systemd 服务)
- `warp-svc` 常驻约 95MB(这台机总共 1.8G)
- **境内已备案服务器跑跨境隧道属于合规灰区**,自行权衡
- 收益仅限一个可选的第三方登录方式;邮箱登录与国内社交登录(QQ 等)都不需要它

## 拆除

```bash
systemctl disable --now gh-tunnel warp-svc
docker compose -f /root/logto/docker-compose.yml up -d --remove-orphans   # 去掉 gh-proxy 后
dnf remove -y cloudflare-warp && rm -f /etc/yum.repos.d/cloudflare-warp.repo
```
再把 Logto 里 GitHub 从登录页撤下即可。
