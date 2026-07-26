# 项目交接文档(2026-07-26)

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
| **admin-web** | 管理后台(React+Vite) | `admin-web/` | ⏸️ 待备案(依赖 Logto) |
| **deploy/logto** | 自托管 Logto IAM(docker compose) | `deploy/logto/` | ⏸️ 待备案(强制 HTTPS) |

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

**全部已上线,IP/HTTP(域名 + HTTPS 待 ICP 备案)。** 服务器 `<SERVER>`(CentOS Stream 9,2vCPU/1.8G;SSH key `~/.ssh/id_ed25519_zh_kinger`,非默认名要 `-i` 指定)。

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
| 服务器 `/root/logto/.env` | `PG_PASSWORD` 等 | Logto(搁置中) |

---

## 六、待办(按前置)

- [ ] **ICP 备案**(硬阻塞)→ 备案后:域名 `venking.tech` + HTTPS/443 + nginx 补 `/admin/` 与 auth 子域名反代 → **Logto `docker compose up -d`(数据卷保留)+ 建 SPA 拿 App ID → 部署 admin-web `/admin/` → 打通登录 + per-user AI 历史**。业务库(conversations/messages)`alembic upgrade head` 随此一起。
- [ ] **主页个性化**:homepage 目前是骨架,待用户给自我介绍/头像/项目素材做真实内容。
- [ ] (可选)把 RAG 重建也接进 CI(需在 CI 配 DashScope key)。

---

## 七、约束(硬)

机密只在本地/服务器 `.env`(gitignore)+ GitHub Secrets;**公开仓不得暴露服务器 IP/root/端口/MaaS 实例 ID/密钥**。提交前源码改动派 tester、commit 前派 auditor;commit 尾加 `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`;push 直连 github、代理默认关(`-c http.proxy= -c https.proxy=`),网络抽风就重试。

完整历史/决策见 `docs/collab/notes.md` 末尾。
