# ZH-Kinger

Kinger 的个人技术站与博客知识库，包含统一深色主页、技术文章、Blog RAG Agent 和项目协作文档。

## 项目结构

> 目录规范与跨项目耦合见 [`STRUCTURE.md`](STRUCTURE.md)。

| 路径 | 用途 | 是否部署 |
| --- | --- | --- |
| `blog/` | VuePress theme-hope 博客主线（文章源在私有仓库，构建时生成，见下文发布流程） | `/blog/`（已上线） |
| `homepage/` | Astro 生产主页 | `/`（已上线） |
| `rag-server/` | Blog RAG Agent、登录/管理后台 API、测试与容器配置 | `/ai/`、`/api/`（已上线） |
| `admin-web/` | 管理后台前端（React + TypeScript + Vite + Radix Themes） | `/admin/`（搁置，待备案后启用） |
| `docs/` | 架构、ADR、研究、规划和部署记录 | 不直接公开 |
| `deploy/` | Nginx / Logto 等部署配置 | 服务器配置 |

线上入口（2026-07-25 首次生产部署，公网 HTTP + 服务器 IP，域名与 HTTPS 待 ICP 备案）：

- 主页：`http://<SERVER>/`
- 博客：`http://<SERVER>/blog/`
- AI 助手：`http://<SERVER>/ai/`

> 备案 + 域名 + HTTPS 落地后，入口切到 `https://venking.tech/`。

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

管理后台（M10 登录 + 管理后台，本地开发阶段，暂搁置未上线）：

> 状态（2026-07-25）：认证已在后端迁向自托管 Logto 统一 IAM（容器编排见 [`deploy/logto/`](deploy/logto/)，数据卷保留）。Logto 强制 HTTPS，纯 HTTP/IP 访问会报 "Insecure context"，因此在域名 + ICP 备案 + HTTPS 落地前，`/admin/` 不上线。备案后再建 Logto SPA 应用拿 App ID，并部署 `/admin/`。下面的本地开发步骤（PostgreSQL/Alembic/`create-admin`）仅用于早期本地登录方案，供参考。


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

步骤：clone/pull 私有 `obisidian` 到 `.cache/obsidian-vault/`（gitignore）→ 跑 `scripts/sync-obsidian-to-vuepress.mjs` 生成 `blog/src/posts/`（含脱敏）→ `scripts/optimize-images.mjs` 图片双层压缩 → `python -m blog_rag.ingest` 重建 RAG 向量库（幂等增量）→ `npm run docs:build` 构建博客 → 打印变更摘要。审阅后自行 commit / push。

- `--dry` 只跑到同步的 dry-run（看 diff，不写文件、不压缩、不索引、不构建）。
- `--no-pull` 用现有 vault 缓存；`--no-ingest` / `--no-build` 分别跳过索引 / 构建。
- 私有仓库鉴权复用本机 git 凭据助手；发布前有三层密钥脱敏闸门，防私有笔记里的明文密钥进入公开博客。
- 细节见 [`STRUCTURE.md`](STRUCTURE.md#一键发布-scriptspublishmjs)。

图片双层管线（`scripts/optimize-images.mjs`，工具优先级 sharp > ImageMagick > macOS `sips`）：

- 原图存到 `blog/src/.vuepress/public/assets/posts/orig/`（全分辨率）；同名显示版留在 `assets/posts/`（最大边 1600px、质量 80，仅对 >1600px 的图生成）。语雀/Obsidian 原图约 6MB → 显示版约 0.6MB。
- 内联用显示版：原生 `loading=lazy` 懒加载 + 模糊→清晰淡入（JS 门控 `html.img-fx`，无 JS 时图片正常显示不隐身）；点击图片在新标签打开 `orig/` 原图。
- theme-hope 的 `photoSwipe` 已关闭（它只认 `img.src`、无法分离「内联显示版 / 点击原图」双层），改由 `blog/src/.vuepress/client.ts` 实现。

## 文档库

项目文档统一放在 [`docs/`](docs/README.md)。重要架构决策使用 ADR，调研记录放入 `docs/collab/research/`，部署与运维变更写入 `docs/collab/部署.md`。

## 部署结构

2026-07-25 完成首次生产部署，`homepage`（`/`）、`blog`（`/blog/`）、RAG（`/ai/`）均已上线，公网 HTTP 可访问（服务器 IP，域名 + HTTPS 待 ICP 备案）。

- **静态站**：`homepage` 构建产物放 Nginx 根、`blog` 构建产物放 `/blog/`，由 Nginx 直接提供。
- **RAG 服务**：经 `rag-server/deploy.sh`（tar-over-ssh + 远程 `docker compose`，构建脱离 SSH 会话防断连）部署；容器仅绑 `127.0.0.1:7860`，Nginx 反代 `/ai/`、`/api/`、`/vendor/` 到本机容器。
- **Nginx 性能**：已启用 gzip 压缩，静态资源（`/_astro`、`/blog/assets`）长缓存（`immutable`，1 年）。
- 公网当前只开放 80；备案配置 HTTPS 后再开放 443。
- **Logto/`admin/` 搁置**：容器编排已就绪（`deploy/logto/`，数据卷保留），Logto 强制 HTTPS，待备案 + 域名 + HTTPS 后再启用并部署 `/admin/`。
- 敏感信息（服务器 IP、账号、口令）不入文档，`deploy.sh` 用 `SERVER=user@host` 环境变量传入。

**博客 CI**（`.github/workflows/deploy-docs.yml`）：push `main` 或手动 `workflow_dispatch` → 从私有 `obisidian` 拉取 → 同步生成 posts（含脱敏）→ 密钥泄露闸门（检出 `sk-` 形态即阻断）→ 构建 VuePress → 部署到 `blog` 分支。需在仓库配置 secret `OBSIDIAN_TOKEN`（读私有仓的 PAT），可选 `SECRETS_DENYLIST`。**当前 `OBSIDIAN_TOKEN` 尚未配置**，现阶段用本地 `node scripts/publish.mjs` 完成构建部署。
