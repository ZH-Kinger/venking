# ZH-Kinger

Kinger 的个人技术站与博客知识库，包含统一深色主页、技术文章、Blog RAG Agent 和项目协作文档。

## 项目结构

| 路径 | 用途 | 是否部署 |
| --- | --- | --- |
| `astro-site/` | 生产主页；其中旧 Astro 博客实现已弃用 | `/` |
| `rag-server/` | Blog RAG Agent、测试与容器配置 | `/ai/` |
| `docs/` | 架构、ADR、研究、规划和部署记录 | 不直接公开 |
| `src/` | 当前 VuePress 博客主线与文章源 | `/blog/` |
| `deploy/` | Nginx 等部署配置 | 服务器配置 |

线上入口：

- 主页：<https://venking.tech/>
- 博客：<https://venking.tech/blog/>
- AI 助手：<https://venking.tech/ai/>

## 本地开发

主页：

```bash
cd astro-site
npm install
 npm run dev
```

博客：

```bash
npm run docs:dev
npm run docs:build
```

Agent：

```bash
cd rag-server
cp .env.example .env
docker compose up -d --build
```

真实密钥只放在本机或服务器的 `.env` 中。不要把 API Key、邮箱应用密码、数据库文件和向量库提交到 Git。

## 文档库

项目文档统一放在 [`docs/`](docs/README.md)。重要架构决策使用 ADR，调研记录放入 `docs/collab/research/`，部署与运维变更写入 `docs/collab/部署.md`。

## 部署结构

Nginx 提供静态主页和博客，并将 `/ai/`、`/api/`、`/vendor/` 转发到仅绑定 `127.0.0.1:7860` 的 Agent 容器。公网只需要开放 80；配置 HTTPS 后再开放 443。
