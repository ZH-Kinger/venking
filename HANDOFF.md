# 项目交接文档(2026-07-29)

> 新电脑/新会话接手时,让 AI 先读这份 HANDOFF.md + [`STRUCTURE.md`](STRUCTURE.md) + `docs/collab/notes.md` 末尾快照。
> 敏感信息(服务器 IP、密钥)**不写进本文/公开仓库**,用 `<SERVER>` 等占位;真实值在本机 gitignored 的 `.env`、`~/.ssh/`、以及各仓库的 GitHub Secrets 里。

---

## 一、这个项目是什么

个人技术站 monorepo,域名 `venking.tech`(**venking 仓库是 public**),品牌「Kinger」。

| 子项目 | 是什么 | 位置 | 状态 |
|---|---|---|---|
| **blog** | 技术博客(VuePress2 + theme-hope) | `blog/` | ✅ 已上线 `/blog/` |
| **homepage** | 落地页(Astro) | `homepage/` | ✅ 已上线 `/` |
| **rag-server** | Agentic RAG AI 问答(FastAPI/LangGraph,前端在 static/) | `rag-server/` | ✅ 已上线 `/ai/` |
| **admin-web** | 管理后台(React+Vite) | `admin-web/` | ✅ 已上线 `/admin/`(产物由 rag-server 同源提供) |
| **deploy/logto** | 自托管 Logto IAM(docker compose) | `deploy/logto/` | ✅ 已上线 `https://auth.venking.tech` |

品牌色:accent 靛紫 `#5e6ad2`、void `#08090a`。

---

## 二、内容发布管线(2025-07 重构,**最重要的变化**)

**文章源在私有仓库 `github.com/ZH-Kinger/obisidian`(Obsidian vault),不在公开的 venking 仓库里。**
- `blog/src/posts/` 与 `blog/src/.vuepress/public/assets/posts/` 已 **gitignore**,构建时才生成(本地磁盘有,不入公开仓)。
- 曾发生密钥泄露(私有笔记代码块含明文 key/app_id 被同步进公开仓),已用 filter-repo 从全历史抹除 + 加脱敏闸门 + 轮换凭据。**详见 [[content-pipeline-desensitization]] 与 `scripts/sync-obsidian-to-vuepress.mjs` 的 `redactSecrets`。**

### 本地一键发布 `scripts/publish.mjs`(在仓库根跑)
```
node scripts/publish.mjs [--no-pull] [--dry] [--no-ingest] [--no-build]
```
步骤:clone/pull 私有 obisidian → 同步生成 posts(**三层密钥脱敏**)→ **图片双层压缩** → RAG `ingest`(重建 Chroma)→ `docs:build`。
- vault 路径走 `OBSIDIAN_VAULT` env(不再硬编码 `D:/`);缓存在 `.cache/obsidian-vault`(gitignored)。
- 日期靠入库的 `blog/.posts-dates.json`(哈希键,不暴露标题)结转。
- **⚠️ 不要本地推服务器**(已移除 `--deploy`):服务器只由 CI 部署,基线统一,否则会拖慢 CI。publish 只管本地同步/构建/RAG。

### 图片双层(清晰又快)
`scripts/optimize-images.mjs`(接入 publish):`posts/orig/` 存全分辨率原图,`posts/` 存 1600px 显示版。内联用显示版(懒加载 + 模糊淡入,`html.img-fx` JS 门控无 JS 不隐身),**点击图片打开原图**。

---

## 三、部署 & CI 自动发布(2026-07 跑通)

**全部已上线,`https://venking.tech`。** 服务器 `<SERVER>`(CentOS Stream 9,2vCPU/1.8G;SSH key `~/.ssh/id_ed25519_zh_kinger`,非默认名要 `-i` 指定)。

### 域名 / HTTPS(2026-07 ICP 备案通过后收口)

备案号 **湘ICP备2026030935号**,已在 homepage 与 blog 页脚展示并超链 beian.miit.gov.cn。

- 证书:Let's Encrypt,SAN = `venking.tech` / `www` / `auth`;`certbot-renew.timer` 已 enable,
  deploy hook 续期后自动 `nginx -t && reload`。**HSTS 已开(1y + includeSubDomains)**,
  所以证书过期 = 全站硬故障(浏览器不给"继续访问")。新增子域必须先进 certbot `-d` 列表。
- nginx 配置全部版本化在 `deploy/nginx/`,**映射关系与两个反复踩的坑见 `deploy/nginx/README.md`**。
- ⚠️ **nginx 配置不在 `rag-server/deploy.sh` 里** —— 它只发前后端,完全不碰 `/etc/nginx/`。
  改了 `deploy/nginx/*.conf` 必须手动发,而且要**先于**前后端发布:
  ```
  scp deploy/nginx/zh-kinger.conf <SERVER>:/etc/nginx/default.d/
  ssh <SERVER> 'nginx -t && systemctl reload nginx'
  ```
  顺序反了的具体后果(附件上传这次就是):nginx 默认 `client_max_body_size` 是 1m,
  应用写着 5MB 上限,于是所有超过 1MB 的图(= 手机拍照的绝大多数)被 nginx 挡在应用之外,
  返回的还是它自己的英文 413 页,前端解析不出 `detail`,用户只看到一句无信息的"上传失败"。
  本机没装 nginx,`nginx -t` **只能在服务器上跑**,这一步不能跳。
- 裸 IP / 未知 Host → 444(顺带隔离"别人把未备案域名解析到本机"的备案风险)。
  调试用 `curl --resolve venking.tech:443:<IP> https://venking.tech/`。

### Logto 统一身份

- 端点 `https://auth.venking.tech`(nginx 反代 127.0.0.1:3001);**管理台不对公网暴露**,
  只走 SSH 隧道:`ssh -N -o ExitOnForwardFailure=yes -L 3002:127.0.0.1:3002 <SERVER>` → `http://localhost:3002`。
  端口必须映射成 3002(`ADMIN_ENDPOINT` 就是它,换端口 console 内部跳转会飞)。
- 租户配置由 `deploy/logto/setup.sh` **幂等**驱动(走 Management API,可反复重跑)。
  已建:API resource `https://api.venking.tech` + scopes `chat:write`/`history:read`/`admin:all`;
  roles `user`(**默认角色**,注册即得 chat/history)/`admin`(**手动授予**,含 `admin:all`);
  两个 SPA 应用。登录方式=邮箱+密码+验证码 + GitHub + QQ,开放注册,靛紫深色。
- 运维脚本(都在 `deploy/logto/`,服务器 `/root/logto/` 同步一份):`inspect.sh` 速查全貌、
  `grant-role.sh` 授/撤角色(认邮箱)、`social.sh` 控制登录页入口开关、`set-default-role.sh`、
  `mk-connector.sh` 预建 connector 拿回调地址(开放平台建应用要填它,鸡生蛋)。
- ⚠️ **admin 权限位名字必须三处逐字一致**:setup.sh 建的 scope、后端 `LOGTO_ADMIN_SCOPE`、
  admin-web 请求的 scope。对不上时 `is_admin` 恒 false,表现为「登录成功但后台一直 403」且无报错指向真因。
- ⚠️ **角色变更后必须重新登录**才生效 —— 权限位签在 access token 里,旧 token 到期前仍是旧权限。
- ⚠️ **绝不能把 admin 设为默认角色** —— 那等于任何人注册即管理员。改完看 `set-default-role.sh` 输出确认。
- GitHub 登录依赖 `deploy/gh-proxy/`(WARP 两跳盲隧道):Logto 服务端换 token 要连 github.com,
  国内间歇性完全不通。**该目录 README 有四跳排障步骤与完整拆除方法。**
- **App ID(非机密,SPA 公开客户端)**:`admin-web` = `3xdc9pu40h0rok1jb5msn`,
  `ai-frontend` = `rzk7khvmf1rwtn2i8rmyq`。
- 邮件验证码走已配好的 163 SMTP connector(2026-07-28 实测认证通过)。
- ⚠️ 端点分工容易搞混:换 Management API token 走 **admin 租户**(`localhost:3002/oidc/token`,
  M2M 应用 `m-default`),调 API 走 **default 租户**(`localhost:3001/api/*`)。

### 自动发布链路(改完笔记→自动上线,零闪断)
```
改 Obsidian → push 私有 obisidian
   → obisidian 仓库 Action 发 repository_dispatch(obsidian-updated)  ← 需 secret VENKING_DISPATCH_TOKEN
   → 触发 venking CI(.github/workflows/deploy-docs.yml):
       用 deploy key 浅克隆 obisidian → sync 脱敏 → 图片双层 → 密钥闸门 → build
       ├─ 部署 GitHub Pages(blog 分支,冗余镜像)
       └─ rsync --link-dest 增量推服务器 → /root/blog-publish.sh 校验 → ln -sfn 原子软链切换
```
- **不主动拉 · CI 推 · 零闪断(原子软链)· 冗余(Pages + 3 次重试 + 校验才切 + 留 3 版回滚)**
- 服务器结构:nginx `/blog` → 软链 `/var/www/blog-current` → `/var/www/blog-releases/<sha>`
- 基线统一 imagemagick → 文字改动增量秒级;新增图片才传那一张
- RAG `/ai/`、`/api/`、`/vendor/` 由 nginx 反代到本机容器(`rag-server/deploy.sh` 部署);nginx 已配 gzip + 静态长缓存

### AI 知识库(RAG)更新是单独的
CI 只同步博客网页。要让 AI 认识新文章:本地 `publish.mjs` 会 ingest 重建本地 Chroma → `cd rag-server && SERVER=<user@host> bash deploy.sh` 推新 chroma(先本地 VACUUM 去死页)。

---

## 四、本地怎么跑

```bash
# 首次/换机:先发布一次,生成 posts(它们 gitignore、不随仓库)
node scripts/publish.mjs --no-ingest --no-build    # 只 clone obisidian + 同步生成 posts

cd blog && npm install && npm run docs:dev          # 博客本地预览 http://localhost:8080/blog/
cd homepage && npm install && npm run dev           # 主页 http://localhost:4321
# rag-server:配好 rag-server/.env(DASHSCOPE_API_KEY 等)后 uvicorn 起 :7860
```
Node 22;VuePress 2 rc + theme-hope rc。博客首屏无闪只在生产构建体现(dev 由 JS 注入)。
> git 中文文件名默认八进制转义,`grep`/`ls-files` 统计要加 `-c core.quotepath=false`。

---

## 五、密钥/Secret 清单(名字,值不入本文)

| 位置 | 名字 | 用途 |
|---|---|---|
| 本机 `rag-server/.env` | `DASHSCOPE_API_KEY` 等 | RAG LLM/embedding |
| 本机 `~/.ssh/id_ed25519_zh_kinger` | — | 你登服务器的 key |
| venking 仓库 Secrets | `OBSIDIAN_DEPLOY_KEY` | CI 克隆私有 obisidian(SSH 私钥 base64) |
| venking 仓库 Secrets | `SERVER_SSH_KEY` / `SERVER_SSH` | CI 推服务器(私钥 base64 / user@host) |
| obisidian 仓库 Deploy keys | (公钥) | 对应 OBSIDIAN_DEPLOY_KEY |
| obisidian 仓库 Secrets | `VENKING_DISPATCH_TOKEN` | push 时触发 venking CI(fine-grained PAT,venking Contents 写) |
| 服务器 `/root/logto/.env` | `PG_PASSWORD` 等 | Logto Postgres |
| Logto 管理台(SSH 隧道) | GitHub / QQ connector 的 clientSecret | 社交登录;**只在管理台填,不进对话/仓库** |

---

## 六、待办(按前置)

**已完成(2026-07-28/29 一轮做完,均经真人端到端验证,不只是 curl)**:
ICP 备案 → 域名 + HTTPS 收口;Logto 上线 + 邮箱/GitHub 登录;rag-server 接 Logto 鉴权
(退役自建 authn/User/Session);per-user AI 历史(按 `sub` 落 `conversations`/`messages`);
admin-web 部署 `/admin/`;404 页 + soft-404 修复;GitHub 出站代理。测试 283 → 395。

**待办**

- [ ] **QQ 登录**:connector 已建、APP ID/Key 已填、已上登录页;等 QQ 互联审核通过。
      回调 `https://auth.venking.tech/callback/6vd5zxf2z962`。审核中一般只放行开发者本人的 QQ。
- [ ] **公安联网备案**:ICP 于 **2026-07-28 通过**,须在 **2026-08-27 前**到 `beian.gov.cn` 提交;
      拿到「湘公网安备…号」后同样要上页脚并链 `beian.gov.cn`(通常带警徽图标)。
      与工信部 ICP 是两套独立系统,ICP 通过不代表公安那边自动登记。
- [ ] **证书到期告警**:HSTS 让续期失败变成全站硬故障,目前只有 certbot timer,没有失败通知。
- [ ] **主页个性化**:homepage 目前是骨架,待用户给自我介绍/头像/项目素材做真实内容。
- [ ] (可选)把 RAG 重建也接进 CI(需在 CI 配 DashScope key)。
- [ ] **M8 长期记忆**:地基已就位(稳定的 `sub` + 落库的对话),可以做跨会话用户画像了。
- [ ] 小账:`static/index.html` 的 `readonly:true` 无人读取,「· 只读」云端会话其实能继续追问(文案不实);
      `graph.strip_ns()` 目前只在 done 事件用一处,**别当死代码清掉** —— 它是防前缀外泄的显式保证。

**知道但有意不做**:账号按邮箱自动关联。同一人用邮箱与 GitHub 登录会是**两个账号**
(两边邮箱不同),AI 历史也分两份。个人站可接受;要合并得在 Logto 配账号关联策略。

---

## 七、约束(硬)

机密只在本地/服务器 `.env`(gitignore)+ GitHub Secrets;**公开仓不得暴露服务器 IP/root/端口/MaaS 实例 ID/密钥**。提交前源码改动派 tester、commit 前派 auditor;commit 尾加 `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`;push 直连 github、代理默认关(`-c http.proxy= -c https.proxy=`),网络抽风就重试。

完整历史/决策见 `docs/collab/notes.md` 末尾。
