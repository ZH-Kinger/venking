# 登录与内容管理后台实施计划

> 状态：方案草案  
> 创建：2026-07-24  
> 目标：在不破坏现有主页、VuePress 博客和 Agent 的前提下，增加安全登录、文章发布、用户与 AI 数据管理能力。

## 1. 推荐结论

第一版采用：

- 单一管理员账号，不开放访客注册。
- 新增 `/login/` 与 `/admin/`，现有 `/`、`/blog/`、`/ai/` 保持不变。
- 后端继续使用 FastAPI，避免新增第二套服务框架。
- 管理前端使用 React + TypeScript + Vite + Radix Themes。
- PostgreSQL 保存账号、Session、审计、发布任务和用户数据。
- VuePress Markdown/Git 继续作为已发布文章的唯一事实源。
- 后台编辑发生在独立内容工作区，不直接修改 Nginx 的生产目录。
- 发布必须经过校验、构建、预览、原子切换和 RAG 增量同步。
- HTTPS 是登录功能对公网开放的硬闸门。

普通用户注册、个人 AI 历史和长期画像放到第二阶段。这样先把管理员后台做稳，避免一开始同时处理注册、邮箱验证、密码找回、隐私协议和用户隔离。

## 2. 不改变的现有能力

- `/`：现有 Astro 主页。
- `/blog/`：现有 VuePress 博客、分类、搜索、主题切换和文章 URL。
- `/ai/`：现有 Agentic RAG、SSE 流式、引用、反馈和短时记忆。
- `src/posts/`：已发布文章事实源。
- `/root/blog-rag/data/`：Chroma、checkpoint、feedback 等持久数据。
- Nginx 仍是公网唯一入口，PostgreSQL 和 Agent 内部端口不暴露公网。

## 3. 总体架构

```text
浏览器
  |
  v
Nginx :443
  |-- /                 Astro 主页
  |-- /blog/            VuePress 静态博客
  |-- /ai/              Agent 前端
  |-- /login/           管理员登录前端
  |-- /admin/           管理后台前端
  `-- /api/
       |-- auth/*       登录、退出、当前用户、改密
       |-- admin/*      文章、用户、反馈、发布、审计
       `-- chat/*       现有 Agent API
               |
               v
          FastAPI service
          |-- PostgreSQL
          |-- 内容工作区
          |-- VuePress 构建任务
          `-- RAG 增量同步
```

生产 Compose 增加：

- `postgres`：仅 Docker 内网可见，不发布宿主端口。
- `agent`：现有 FastAPI，增加 auth/admin 路由。
- 可选 `worker`：第二阶段拆分耗时构建任务；第一版可由受控子进程执行。

## 4. 前端方案

新增目录：

```text
admin-web/
  src/
    app/
    pages/
      LoginPage.tsx
      DashboardPage.tsx
      ArticlesPage.tsx
      ArticleEditorPage.tsx
      UsersPage.tsx
      ConversationsPage.tsx
      FeedbackPage.tsx
      PublishJobsPage.tsx
      AuditLogsPage.tsx
      SystemPage.tsx
    components/
    api/
    styles/
```

选型：

- React + TypeScript。
- Vite 负责开发与生产构建。
- Radix Themes 作为唯一组件系统。
- TanStack Query 管理服务端状态。
- CodeMirror 6 编辑 Markdown。
- 不混用另一套完整设计系统。

视觉方向：

- 默认深色，与主页、博客和 Agent 共用靛紫品牌色。
- 管理后台密度高于公开页面，但不做拥挤的数据驾驶舱。
- 卡片圆角、按钮、输入框、图标和状态色使用统一 token。
- 桌面左侧导航，移动端变抽屉。
- 加载、空数据、失败、无权限和发布中状态必须完整。

## 5. 身份与权限

### 第一阶段角色

| 角色 | 能力 |
| --- | --- |
| `admin` | 全部后台能力、用户管理、发布、系统状态 |
| `editor` | 第二阶段启用；编辑文章、提交发布，不能管理管理员 |
| `user` | 第二阶段启用；登录 Agent、查看自己的会话和反馈 |

第一版只创建 `admin`，但数据库字段预留三个角色。

### Session 方案

- 密码使用 Argon2id。
- 登录成功生成高熵随机 Session Token。
- 数据库只保存 Token 哈希，不保存明文 Token。
- 浏览器只通过 `HttpOnly + Secure + SameSite=Lax` Cookie 携带 Session。
- 后台写操作校验 CSRF Token。
- Session 支持过期、主动退出、管理员强制失效和改密后全部失效。
- 不在 localStorage 保存 JWT 或 Session Token。

### 登录安全

- HTTPS 未启用时，生产环境禁止登录接口启动。
- 登录限速：按 IP 与账号双维度。
- 不返回“账号不存在”与“密码错误”的差异信息。
- 失败达到阈值后短期锁定。
- 记录登录成功、失败、退出、改密和 Session 撤销事件。
- 初始管理员通过 CLI 一次性创建，不提供默认密码。

## 6. 数据模型

### 身份与审计

`users`

- `id` UUID
- `email`
- `username`
- `password_hash`
- `role`
- `status`
- `last_login_at`
- `created_at`
- `updated_at`

`sessions`

- `id` UUID
- `user_id`
- `token_hash`
- `csrf_hash`
- `expires_at`
- `last_seen_at`
- `ip_hash`
- `user_agent`
- `revoked_at`

`login_events`

- `id`
- `user_id` 可空
- `identifier_hash`
- `event_type`
- `ip_hash`
- `created_at`

`audit_logs`

- `id`
- `actor_user_id`
- `action`
- `resource_type`
- `resource_id`
- `before_json`
- `after_json`
- `request_id`
- `created_at`

### 文章与发布

文章正文不直接搬进数据库。数据库只保存管理索引与发布状态：

`articles`

- `id` UUID
- `source_path`
- `slug`
- `title`
- `category`
- `status`
- `published_commit`
- `published_at`
- `updated_by`
- `updated_at`

`article_drafts`

- `article_id`
- `content`
- `base_commit`
- `version`
- `updated_by`
- `updated_at`

`publish_jobs`

- `id`
- `article_id` 可空
- `status`
- `requested_by`
- `source_commit`
- `build_log_path`
- `started_at`
- `finished_at`
- `error_summary`

已发布版本以 Git commit 为准。草稿保存在数据库，发布时写入受控内容工作区并生成 commit。

### AI 用户数据

第二阶段启用：

`conversations`

- `id`
- `user_id`
- `thread_id`
- `title`
- `created_at`
- `updated_at`

`messages`

- `id`
- `conversation_id`
- `role`
- `content`
- `mode`
- `sources_json`
- `created_at`

现有 `feedback.jsonl` 第一版继续保留，后台只读展示；确认模型稳定后再迁移到 PostgreSQL。

## 7. API 设计

### Auth

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `POST /api/auth/change-password`
- `GET /api/auth/csrf`

### Articles

- `GET /api/admin/articles`
- `GET /api/admin/articles/{id}`
- `POST /api/admin/articles`
- `PUT /api/admin/articles/{id}/draft`
- `POST /api/admin/articles/{id}/validate`
- `POST /api/admin/articles/{id}/preview`
- `POST /api/admin/articles/{id}/publish`
- `GET /api/admin/publish-jobs/{id}`
- `POST /api/admin/publish-jobs/{id}/rollback`

### Users and data

- `GET /api/admin/users`
- `PATCH /api/admin/users/{id}`
- `POST /api/admin/users/{id}/revoke-sessions`
- `GET /api/admin/conversations`
- `GET /api/admin/feedback`
- `GET /api/admin/audit-logs`
- `GET /api/admin/system/health`

所有 `/api/admin/*` 默认要求 `admin`。将来增加 `editor` 时再逐接口放权。

## 8. 文章发布流水线

```text
保存草稿
  |
  v
Frontmatter / Markdown / 路径 / 图片检查
  |
  v
写入独立内容工作区
  |
  v
创建 Git commit
  |
  v
npm run docs:build
  |
  +-- 失败 -> 保留现网 + 返回构建日志
  |
  v
抽查首页、文章、CSS/JS 产物
  |
  v
原子切换 /usr/share/nginx/html/blog
  |
  v
增量更新 RAG / Chroma
  |
  v
记录 publish_job + audit_log
```

安全约束：

- `source_path` 必须在允许的内容目录内，禁止 `..` 和符号链接逃逸。
- 构建命令固定，不接受用户提供 shell 参数。
- 图片限制 MIME、扩展名和体积。
- 构建目录使用临时目录。
- 发布失败绝不覆盖现有 `/blog/`。
- 每次发布保留上一版本，可一键回滚。
- 同一时间只允许一个发布任务。

## 9. 分阶段实施

### P0：安全与基础决策

- 确定后台第一版仅管理员使用。
- 确定正式域名和 HTTPS 方案。
- 确定 PostgreSQL 备份目录与保留周期。
- 确定内容工作区、生产目录和回滚目录。

DoD：

- HTTPS 可用。
- PostgreSQL 不对公网开放。
- 备份和恢复命令完成演练。

### P1：数据库与认证后端

- 增加 SQLAlchemy 2、Alembic、PostgreSQL 驱动、pwdlib Argon2。
- 建立 users、sessions、login_events、audit_logs。
- 实现管理员创建 CLI。
- 实现登录、退出、当前用户、改密和 Session 撤销。
- 加 CSRF、限速、安全 Cookie 和权限依赖。

DoD：

- 未登录访问后台 API 返回 401。
- 非管理员访问管理接口返回 403。
- 改密后旧 Session 全部失效。
- 无明文密码和明文 Session Token 落库。

### P2：登录页与后台框架

- 创建 `admin-web/`。
- 完成登录页、后台布局、导航和路由守卫。
- 完成 Dashboard、System Health、Audit Log 基础页面。
- 接入加载、空、失败、无权限状态。

DoD：

- 桌面与移动端布局通过。
- Cookie Session 刷新后仍有效。
- Session 过期自动回登录页。

### P3：文章管理

- 扫描 `src/posts/` 建文章索引。
- 实现文章搜索、分类、状态筛选。
- 实现 Markdown 编辑、自动保存、版本冲突检测。
- 实现图片上传与预览。
- 实现 Frontmatter 表单和原始 Markdown 双视图。

DoD：

- 后台保存不会直接影响现网。
- 两个浏览器同时编辑时能发现版本冲突。
- 非法路径和危险文件被拒绝。

### P4：发布与 RAG 同步

- 实现校验、构建、日志、原子发布与回滚。
- 发布成功后触发 RAG 增量同步。
- 构建任务加互斥锁与超时。
- 后台实时显示发布阶段。

DoD：

- 构建失败时现网保持原版本。
- 发布成功后文章页 200，资源 200。
- RAG 能检索到新文章。
- 回滚后博客和 RAG 状态一致。

### P5：用户与 AI 数据

- 启用 `editor` 与 `user` 角色。
- 决定邀请制或公开注册。
- 迁移浏览器 localStorage 会话到服务端。
- 用户只能访问自己的会话。
- 后台查看会话、反馈和用量。

DoD：

- 跨用户数据隔离测试通过。
- 删除/封禁用户能撤销所有 Session。
- 隐私数据支持导出与删除。

### P6：生产加固

- 数据库自动备份与恢复演练。
- 登录与管理 API 限速。
- CSP、安全响应头和上传扫描。
- E2E、权限矩阵、CSRF、路径穿越、并发发布测试。
- 监控登录失败、发布失败和数据库容量。

DoD：

- 安全测试和回滚演练通过。
- 生产发布清单签字确认。
- 不开放 PostgreSQL、7860 或内部 worker 端口。

## 10. 测试矩阵

### 单元测试

- 密码哈希与校验。
- Session 生成、哈希、过期、撤销。
- RBAC 权限矩阵。
- CSRF 校验。
- Markdown 路径安全。
- Frontmatter 校验。
- 发布状态机。

### 集成测试

- PostgreSQL migration up/down。
- 登录 Cookie 完整流程。
- 草稿保存与乐观锁。
- VuePress 构建成功/失败。
- 原子切换与回滚。
- RAG 增量更新。

### E2E

- 登录、退出、改密。
- 新建文章、预览、发布、回滚。
- 封禁用户与 Session 撤销。
- 手机端后台导航。

### 安全测试

- 暴力登录与账号枚举。
- CSRF。
- XSS 与恶意 Markdown。
- 路径穿越和符号链接逃逸。
- 越权读取其他用户数据。
- 上传伪造 MIME 和超大文件。

## 11. 部署与回滚

上线顺序：

1. 先部署 PostgreSQL 和 migration，不暴露后台路由。
2. 创建首个管理员。
3. 部署 auth/admin API。
4. 部署 `/login/` 与 `/admin/` 静态前端。
5. 在 HTTPS 下开放路由。
6. 先开放只读文章列表和系统状态。
7. 最后开放编辑与发布。

回滚：

- 前端回滚到上一静态版本。
- API 镜像回滚到上一 tag。
- Alembic 仅在确认兼容后 downgrade。
- 博客恢复上一构建目录。
- PostgreSQL 从加密备份恢复。

## 12. 当前决策闸门

开始 P1 前只需要确认：

1. 第一版是否接受“仅管理员账号”。推荐：接受。
2. 正式域名/HTTPS 何时可用。
3. 文章发布是“保存后自动发布”还是“手动点击发布”。推荐：手动发布。
4. 普通用户注册采用邀请制还是公开注册。推荐：第二阶段先邀请制。

## 13. 参考依据

- FastAPI Security：<https://fastapi.tiangolo.com/tutorial/security/>
- FastAPI Response Cookies：<https://fastapi.tiangolo.com/advanced/response-cookies/>
- FastAPI Password Hashing：<https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/>
- SQLAlchemy 2 ORM：<https://docs.sqlalchemy.org/en/20/orm/>
- Vite：<https://vite.dev/guide/>
- Radix Themes：<https://www.radix-ui.com/themes/docs/components>
- PostgreSQL Backup：<https://www.postgresql.org/docs/current/app-pgbasebackup.html>
