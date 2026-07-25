# ZH-Kinger

Kinger 的个人技术站与博客知识库，包含统一深色主页、技术文章、Blog RAG Agent 和项目协作文档。

## 项目结构

> 目录规范与跨项目耦合见 [`STRUCTURE.md`](STRUCTURE.md)。

| 路径 | 用途 | 是否部署 |
| --- | --- | --- |
| `blog/` | VuePress theme-hope 博客主线（文章源在私有仓库，构建时生成，见下文发布流程） | `/blog/` |
| `homepage/` | Astro 生产主页 | `/` |
| `rag-server/` | Blog RAG Agent、登录/管理后台 API、测试与容器配置 | `/ai/`、`/api/` |
| `admin-web/` | 管理后台前端（React + TypeScript + Vite + Radix Themes） | `/admin/`（本地开发，未上线） |
| `docs/` | 架构、ADR、研究、规划和部署记录 | 不直接公开 |
| `deploy/` | Nginx 等部署配置 | 服务器配置 |

线上入口：

- 主页：<https://venking.tech/>
- 博客：<https://venking.tech/blog/>
- AI 助手：<https://venking.tech/ai/>

## 本地开发

主页：

```bash
cd homepage
npm install
npm run dev
```

博客：

```bash
cd blog
npm install
npm run docs:dev      # 本地预览 http://localhost:8080/blog/
npm run docs:build    # 产物 blog/src/.vuepress/dist/
```

> 文章原文与图片不在本仓库，`blog/src/posts/` 和 `blog/src/.vuepress/public/assets/posts/` 已 gitignore。本地预览/构建前需先跑发布流程生成文章（见下文）。

Agent：

```bash
cd rag-server
cp .env.example .env
docker compose up -d --build
```

管理后台（M10 登录 + 管理后台，当前处于本地开发阶段，尚未上生产）：

```bash
# 1. 起 PostgreSQL 并建库
createdb blog_rag_dev

# 2. 装后端依赖（含 admin 分组）
cd rag-server
pip install -e ".[api,admin]"

# 3. 在 rag-server/.env 追加：
#   DATABASE_URL=postgresql+psycopg://localhost/blog_rag_dev
#   SESSION_SECRET=<强随机串，如 python -c "import secrets;print(secrets.token_urlsafe(48))">
#   DEV_MODE=1        # 本地允许 http + 非 Secure cookie；生产不要设

# 4. 建表（Alembic 迁移）
alembic upgrade head

# 5. 创建管理员（交互输入 email/用户名/密码，无默认密码）
blog-rag-admin create-admin

# 6. 起后端（端口须为 7860，与前端 dev 代理一致）
uvicorn blog_rag.api:app --reload --port 7860

# 7. 另开终端起前端
cd admin-web
npm install
npm run dev
# 访问 http://localhost:5173/admin/login
```

后端提供 `/api/auth/*`（登录/会话）与 `/api/admin/*`（后台）接口；`DATABASE_URL` 留空时回退到 `data/admin.sqlite`（零安装），模型两引擎通用。本轮完成登录、会话、RBAC、审计，以及仪表盘/系统状态/审计/反馈只读页；文章编辑与发布（P3/P4）、HTTPS 上线尚未实现。完整设计见 [`docs/collab/planning/admin-auth-cms-plan.md`](docs/collab/planning/admin-auth-cms-plan.md)。

真实密钥只放在本机或服务器的 `.env` 中。不要把 API Key、邮箱应用密码、数据库文件和向量库提交到 Git。

## 发布流程

博客文章原文（Markdown）与图片存放在私有 Obsidian vault 仓库 `github.com/ZH-Kinger/obisidian`，不在本公开仓库。发布 = 在仓库根跑一键脚本：

```bash
node scripts/publish.mjs [--no-pull] [--dry] [--no-ingest] [--no-build]
```

步骤：clone/pull 私有 `obisidian` 到 `.cache/obsidian-vault/`（gitignore）→ 跑 `scripts/sync-obsidian-to-vuepress.mjs` 生成 `blog/src/posts/` → `python -m blog_rag.ingest` 重建 RAG 向量库（幂等增量）→ `npm run docs:build` 构建博客 → 打印变更摘要。审阅后自行 commit / push。

- `--dry` 只跑到同步的 dry-run（看 diff，不写文件、不索引、不构建）。
- `--no-pull` 用现有 vault 缓存；`--no-ingest` / `--no-build` 分别跳过索引 / 构建。
- 私有仓库鉴权复用本机 git 凭据助手；发布前有三层密钥脱敏闸门，防私有笔记里的明文密钥进入公开博客。
- 细节见 [`STRUCTURE.md`](STRUCTURE.md#一键发布-scriptspublishmjs)。

## 文档库

项目文档统一放在 [`docs/`](docs/README.md)。重要架构决策使用 ADR，调研记录放入 `docs/collab/research/`，部署与运维变更写入 `docs/collab/部署.md`。

## 部署结构

Nginx 提供静态主页和博客，并将 `/ai/`、`/api/`、`/vendor/` 转发到仅绑定 `127.0.0.1:7860` 的 Agent 容器。公网只需要开放 80；配置 HTTPS 后再开放 443。

博客经 `.github/workflows/deploy-docs.yml`（push `main` → 构建 VuePress → 部署到 `blog` 分支 / GitHub Pages）自动上线。**待办**：文章源移出公开仓后，该 workflow 现构建不到文章，需改为「CI 从私有 `obisidian` 拉取 → 同步 → 构建」并在仓库 secrets 配置访问私有库的凭据；尚未实现。当前可用本地 `node scripts/publish.mjs` 完成构建部署。
