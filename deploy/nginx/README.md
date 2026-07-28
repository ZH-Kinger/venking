# nginx 配置(服务器映射)

本目录是**服务器 nginx 配置的版本化副本**。目录里混着两类文件,靠加载位置区分,
改之前先看清楚是哪一类 —— `conf.d/` 是 http 上下文(可放 server 块),
`default.d/` 是 server 上下文(只能放 location 等 server 级指令)。

| 本仓库文件 | 服务器路径 | 上下文 | 作用 |
|---|---|---|---|
| `00-http-shared.conf` | `/etc/nginx/conf.d/` | http | `$connection_upgrade` map + 登录限流 zone。**必须最先加载**(zone/map 先定义后引用) |
| `00-default-catchall.conf` | `/etc/nginx/conf.d/` | http | 裸 IP / 未知 Host → 444;显式抢占 `default_server` |
| `venking-ssl.conf` | `/etc/nginx/conf.d/` | http | 443:主站 / www 301 / `auth.venking.tech` 反代 Logto |
| `venking-80-redirect.conf` | `/etc/nginx/conf.d/` | http | 80 → 443 301,ACME 通道单独放行。**单独成文件以便独立回滚** |
| `perf.conf` | `/etc/nginx/conf.d/` | http | gzip |
| `tls-params.conf` | `/etc/nginx/tls-params.conf` | server(被 include) | TLS 协议/套件/会话 + 三条安全头 |
| `zh-kinger.conf` | `/etc/nginx/default.d/` | server | `/`、`/ai/`、`/api/`、`/vendor/` 路由 |
| `cache.conf` | `/etc/nginx/default.d/` | server | 静态资源 immutable 长缓存 + **重复一遍安全头** |

另有服务器上手工改过的一处:`/etc/nginx/nginx.conf` 里 stock server 的
`server_name _` → `__stock_unused__`(避免与 catchall 的 `_` 冲突刷警告)。

## 部署

```bash
scp deploy/nginx/{00-http-shared,00-default-catchall,venking-ssl,venking-80-redirect,perf}.conf <SERVER>:/etc/nginx/conf.d/
scp deploy/nginx/tls-params.conf                <SERVER>:/etc/nginx/tls-params.conf
scp deploy/nginx/{zh-kinger,cache}.conf         <SERVER>:/etc/nginx/default.d/
ssh <SERVER> 'nginx -t && systemctl reload nginx'
```

`nginx -t` 不过就不要 reload —— 旧配置还在跑,活站不受影响。

## 两个反复踩的坑

1. **`add_header` 不继承**:某一层只要出现任意一条 `add_header`,上层的全部失效。
   所以 `cache.conf` 里必须把 `tls-params.conf` 的三条安全头原样重复。
   往任何 location 加头之前,先想清楚会不会踢掉上层的头。
   验证:`curl -sI https://venking.tech/_astro/<hash>.css | grep -iE 'strict-transport|nosniff|referrer'` 应有 3 条。

2. **`include conf.d/*.conf` 排在 stock server 之前**(CentOS 的 nginx.conf 就这样),
   所以 conf.d 里第一个 `listen 80` 的 server 会成为隐式 `default_server`。
   必须有 `00-default-catchall.conf` 显式占位,否则裸 IP 会落到 venking 的 301 上。

## 证书

Let's Encrypt,`certbot certonly --webroot -w /var/www/acme`,覆盖
`venking.tech` / `www.venking.tech` / `auth.venking.tech`。

- 续期:`certbot-renew.timer`(已 enable),deploy hook
  `/etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh` 自动 reload nginx
- 验证:`certbot renew --dry-run`
- ⚠️ **HSTS 已开(1 年 + includeSubDomains)**:证书过期不再是"用户点继续"而是全站打不开。
  新增子域必须先加进 certbot 的 `-d` 列表 + `venking-80-redirect.conf` 的 `server_name`,
  否则该子域会因 HSTS 强制 https 而完全不可访问。
