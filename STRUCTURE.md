# 项目结构规范

单仓库多子项目(monorepo,非 npm workspace —— 各子项目独立 `package.json`/依赖)。命名统一以 **venking** 为准(仓库 / 域名 venking.tech)。

## 顶层目录

| 目录 | 职责 | 技术栈 | 线上路径 | 独立起法 |
|---|---|---|---|---|
| `blog/` | 技术博客主线 + 文章源(`blog/src/posts/`,529 篇 / 10 分类) | VuePress 2 + theme-hope | `/blog/`(GitHub Pages `blog` 分支) | `cd blog && npm install && npm run docs:dev` |
| `homepage/` | 生产主页 | Astro | `/` | `cd homepage && npm install && npm run dev` |
| `rag-server/` | Agentic RAG 助手 + 登录/管理后台 API | Python / FastAPI / LangGraph | `/ai/`、`/api/` | `cd rag-server && pip install -e ".[api,admin]" && uvicorn blog_rag.api:app --reload --port 7860` |
| `admin-web/` | 管理后台前端(M10,本地开发中) | React + TS + Vite + Radix | `/admin/` | `cd admin-web && npm install && npm run dev` |
| `docs/` | 架构 / ADR / 研究 / 规划 / 协作记账 | Markdown | — | — |
| `scripts/` | Obsidian→博客同步、文档转换脚本 | Node/Python | — | 在**仓库根**执行 |
| `deploy/` | Nginx 等部署配置 | — | — | — |
| `.github/` | CI(VuePress→Pages 部署) | — | — | — |

## 品牌视觉 token(全站统一)

深色靛紫。accent `#5e6ad2`(hover `#7782e7`)、void `#08090a`、面 `#0f1116`/`#16181d`、字 `#f7f8f8`、muted `#8a8f98`、线 `rgba(255,255,255,.08)`、圆角 6/12/16、Inter + JetBrains Mono。规范源见 `homepage/src/styles/global.css`;各前端复用同一套值。

## 跨项目耦合(改动前必读)

- **rag-server ↔ 博客文章**:rag-server 把 `blog/src/posts` 当语料。锚点 `rag-server/src/blog_rag/config.py`(`REPO_ROOT/"blog"/"src"/"posts"`)+ `rag-server/sources.toml`(`../blog/src/posts`)。**仅入库(`run_ingest`/kb rebuild)时读**;线上运行时只用 chroma 库,不读原文。移动 `blog/` 需同步这两处。
- **admin-web → rag-server**:生产由 FastAPI 在 `/admin/` 托管 `admin-web` 构建产物 —— 需把 `admin-web/dist/` 拷到 `rag-server/src/blog_rag/static/admin/`(`api.py` 懒挂载,存在才挂)。本地开发走 Vite dev server(`:5173` 代理 `/api`→`:7860`),无需拷贝。
- **scripts → blog**:`scripts/sync-obsidian-to-vuepress.mjs`(`OUT=blog/src/posts`)、`scripts/convert-docs.cjs`(`POSTS_DIR=../blog/src/posts`)写博客文章,须在仓库根跑。
- **CI → blog**:`.github/workflows/deploy-docs.yml` 在 `blog/` 内构建,产物 `blog/src/.vuepress/dist/` 部署到 `blog` 分支。

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
