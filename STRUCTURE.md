# 项目结构规范

单仓库多子项目(monorepo,非 npm workspace —— 各子项目独立 `package.json`/依赖)。命名统一以 **venking** 为准(仓库 / 域名 venking.tech)。

## 顶层目录

| 目录 | 职责 | 技术栈 | 线上路径 | 独立起法 |
|---|---|---|---|---|
| `blog/` | 技术博客主线(VuePress 工程) | VuePress 2 + theme-hope | `/blog/`(GitHub Pages `blog` 分支) | `cd blog && npm install && npm run docs:dev` |
| `homepage/` | 生产主页 | Astro | `/` | `cd homepage && npm install && npm run dev` |
| `rag-server/` | Agentic RAG 助手 + 登录/管理后台 API | Python / FastAPI / LangGraph | `/ai/`、`/api/` | `cd rag-server && pip install -e ".[api,admin]" && uvicorn blog_rag.api:app --reload --port 7860` |
| `admin-web/` | 管理后台前端(M10,本地开发中) | React + TS + Vite + Radix | `/admin/` | `cd admin-web && npm install && npm run dev` |
| `docs/` | 架构 / ADR / 研究 / 规划 / 协作记账 | Markdown | — | — |
| `scripts/` | 一键发布(`publish.mjs`)、Obsidian→博客同步、文档转换脚本 | Node/Python | — | 在**仓库根**执行 |
| `deploy/` | Nginx 等部署配置 | — | — | — |
| `.github/` | CI(VuePress→Pages 部署) | — | — | — |

## 文章源与发布(2026-07-25 起)

博客文章原文(Markdown)与图片**不在本公开仓库**,事实源是私有 Obsidian vault 仓库 `github.com/ZH-Kinger/obisidian`。

- `blog/src/posts/` 与 `blog/src/.vuepress/public/assets/posts/` 已 gitignore,由 `scripts/publish.mjs` 构建时从私有源生成(不入公开仓)。
- 私有 vault 克隆缓存在 `.cache/obsidian-vault/`(gitignore)。
- 一键发布 = 在仓库根跑 `node scripts/publish.mjs`,详见 [下节](#一键发布-scriptspublishmjs)。

## 一键发布 `scripts/publish.mjs`

在**仓库根**运行,把私有 vault 走完「拉取 → 同步 → 索引 → 构建」一条链:

```bash
node scripts/publish.mjs [--no-pull] [--dry] [--no-ingest] [--no-build]
```

步骤:

1. clone/pull 私有 `obisidian` 仓库到 `.cache/obsidian-vault/`(首次浅克隆 `--depth 1` 抗断连;`--no-pull` 用现有缓存)。
2. 跑 `scripts/sync-obsidian-to-vuepress.mjs` 全量重写 `blog/src/posts/` + 拷图片。
3. `python -m blog_rag.ingest` 重建 RAG 向量库(LangChain Indexing API 幂等增量,只处理变化的 chunk;`--no-ingest` 跳过)。
4. `npm run docs:build` 构建博客(`--no-build` 跳过)。
5. 打印 posts 变更摘要(`git status`),审阅后自行 commit / push。

要点:

- 私有仓库鉴权复用本机 git 凭据助手;全程 `GIT_TERMINAL_PROMPT=0`,token 失效直接报错不挂起。
- `--dry` 只跑到同步的 dry-run(看 diff,不写、不 ingest、不 build)。
- **同步脚本 `sync-obsidian-to-vuepress.mjs`**:vault 路径可配(`OBSIDIAN_VAULT` 环境变量 / `--vault=<path>`,不再写死路径);清空 posts 前记录旧 `date` 并在重写时沿用(**日期结转**,防浅历史把文章日期打成同一天)。
- **密钥脱敏安全闸门**(写入 posts 前,防私有笔记里的明文密钥被发布到公开博客),三层:① 精确 denylist(`scripts/.secrets-denylist`,gitignore,登记已知真密钥)② 赋值式(`api_key/password/app_id/... = "真值"`,放过明显占位)③ `sk-` 形态密钥。命中项在报告里列出,并提示回源头改占位 + 轮换。

## 品牌视觉 token(全站统一)

深色靛紫。accent `#5e6ad2`(hover `#7782e7`)、void `#08090a`、面 `#0f1116`/`#16181d`、字 `#f7f8f8`、muted `#8a8f98`、线 `rgba(255,255,255,.08)`、圆角 6/12/16、Inter + JetBrains Mono。规范源见 `homepage/src/styles/global.css`;各前端复用同一套值。

## 跨项目耦合(改动前必读)

- **rag-server ↔ 博客文章**:rag-server 把 `blog/src/posts` 当语料。锚点 `rag-server/src/blog_rag/config.py`(`REPO_ROOT/"blog"/"src"/"posts"`)+ `rag-server/sources.toml`(`../blog/src/posts`)。**仅入库(`run_ingest`/kb rebuild)时读**;线上运行时只用 chroma 库,不读原文。注意 `posts/` 现由 `publish.mjs` 构建时生成(不入公开仓),入库需先跑同步生成 posts —— `publish.mjs` 已把这两步串起来。移动 `blog/` 需同步这两处路径。
- **admin-web → rag-server**:生产由 FastAPI 在 `/admin/` 托管 `admin-web` 构建产物 —— 需把 `admin-web/dist/` 拷到 `rag-server/src/blog_rag/static/admin/`(`api.py` 懒挂载,存在才挂)。本地开发走 Vite dev server(`:5173` 代理 `/api`→`:7860`),无需拷贝。
- **scripts → blog**:`scripts/publish.mjs`(编排)、`scripts/sync-obsidian-to-vuepress.mjs`(`OUT=blog/src/posts`)、`scripts/convert-docs.cjs`(`POSTS_DIR=../blog/src/posts`)写博客文章,须在仓库根跑。
- **CI → blog**:`.github/workflows/deploy-docs.yml` 在 `blog/` 内构建,产物 `blog/src/.vuepress/dist/` 部署到 `blog` 分支。**待办**:该 workflow 目前依赖仓库内的 `posts/`,但文章源已移出公开仓 → CI 现在构建不到文章。需改为「CI 先从私有 `obisidian` 拉取 → 同步 → 构建」,并在仓库 secrets 配置访问私有库的凭据。**尚未实现**;当前用本地 `node scripts/publish.mjs` 完成构建与部署。

## 构建 / 部署路径索引

- 博客产物:`blog/src/.vuepress/dist/`(gitignore)→ CI 推 `blog` 分支。
- 主页产物:`homepage/dist/`(gitignore)。
- 管理后台产物:`admin-web/dist/`(gitignore)。
- rag-server 部署:`rag-server/deploy.sh`(tar-over-ssh)+ `docker-compose.yml`,容器仅绑 `127.0.0.1:7860`,Nginx 统一对外。
- Nginx:`deploy/nginx/zh-kinger.conf`(`/ /ai/ /api/ /vendor/`)。

## 约定

- 真实密钥只放各子项目本机 `.env`(gitignore);仓库只留 `.env.example`。
- 可重建产物(`node_modules/`、各 `dist/`、`.vuepress/.cache`、`rag-server/.venv`、`rag-server/data/`)一律 gitignore。
- 提交前:改源码派 tester(测试)+ auditor(安全)过闸;功能变更同步 README/本文件。
