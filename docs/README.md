# 项目文档库

这里是 ZH-Kinger 的长期项目文档库，与源码一起版本化。

## 内容索引

- [`collab/architecture.md`](collab/architecture.md)：整体架构与组件关系
- [`collab/部署.md`](collab/部署.md)：部署结构、服务器路径与运维步骤
- [`collab/roadmap.md`](collab/roadmap.md)：项目路线图
- [`collab/notes.md`](collab/notes.md)：协作记录与待处理事项
- [`collab/知识库存储规范.md`](collab/知识库存储规范.md)：知识内容的存储约定
- [`collab/decisions/`](collab/decisions/)：架构决策记录 ADR
- [`collab/research/`](collab/research/)：技术调研
- [`collab/planning/`](collab/planning/)：功能与页面规划

## 存放规则

- 技术文章的事实源是私有 Obsidian vault 仓库 `github.com/ZH-Kinger/obisidian`;`blog/src/posts/` 由 `scripts/publish.mjs` 构建时生成,不入本仓库(gitignore)。发布流程见根 [`STRUCTURE.md`](../STRUCTURE.md#一键发布-scriptspublishmjs)。
- 项目内部的设计、决策、调研与部署记录放在本目录。
- API Key、密码和服务器私钥只放 `.env` 或密钥管理服务，不写入 Markdown。
- SQLite、Chroma、日志和反馈运行数据不进入 Git。
- 新的关键技术决策从 `collab/decisions/_TEMPLATE.md` 创建 ADR。
