# 换机交接文档(2026-07-24)

> 用云盘/U盘把整个 `ZH-Kinger` 目录拷到新电脑即可(所有改动都在文件夹里,不依赖 git 提交)。
> 新电脑打开这个项目后,让 AI 先读这份 HANDOFF.md + `docs/collab/notes.md` 末尾的交接快照。

---

## 这个项目是什么

三个并存的子项目(在同一个 ZH-Kinger 目录下):

| 子项目 | 是什么 | 位置 | 状态 |
|---|---|---|---|
| **VuePress 博客**(当前主线) | 你的技术博客,theme-hope 主题,功能齐全 | `src/` + `src/.vuepress/` | 构建通过并部署在 `/blog/` |
| RAG AI 助手 | Agentic RAG + FastAPI/SSE 自定义前端 | `rag-server/` | 部署在 `/ai/`,容器 healthy |
| Astro 主页 | 整站大首页 | `astro-site/` | 仅 `/` 使用;其中 Astro 博客实现已弃用 |

---

## ⚠️ 最重要:别重蹈覆辙

**之前走的大弯路**:把"改样式"误解成"用 Astro 重写整个博客",做了半天最后放弃,回到原版 VuePress。
**教训**:博客就用原版 **VuePress theme-hope**,只在 `src/` 和 `src/.vuepress/` 上改。**astro-site/ 是废弃品,不要在它上面做任何事。**

---

## 当前进度:三入口均已上线

### 已完成(都在 VuePress 原版上)
1. **文章全量同步**:从 Obsidian vault(`D:/obsidian workspace`)同步了 529 篇进 `src/posts/`,10 个中文分类。脚本 `scripts/sync-obsidian-to-vuepress.mjs`(改了 Obsidian 内容后重跑它即可再同步)。
   - ⚠️ **新电脑上 Obsidian vault 路径可能变**:脚本顶部 `const VAULT = "D:/obsidian workspace"` 要改成新机的实际路径。
2. **深色科技风**:靛紫 #5e6ad2 主色,保留亮/暗切换按钮但首次默认深色。
3. **重整分类**:navbar 用分类聚合页(零死链),sidebar 自动跟随目录。
4. **交互修复 + 审美收敛**:切换流畅/顶栏配色/AI 悬浮球等。

### 待办 / 未收尾清单(新电脑接着干,按优先级)

**已完成的生产验证:**
- [x] VuePress `docs:build` 成功,705 页面渲染完成
- [x] `/`、`/blog/`、文章页、CSS/JS、`/ai/`、`/ai/health` 公网均返回 200
- [x] Agent 深色自定义前端上线;容器仅绑定 `127.0.0.1:7860`
- [x] M7/M8 生产路径 228 项测试全绿,Ruff 全绿
- [x] SQLite checkpoint 关闭重开后同 thread 消息仍可继续追加

**跨项目遗留:**
- [ ] **备案后**:域名 venking.tech + HTTPS + nginx/caddy 反代 + AI 助手从跳转改 iframe 内嵌(等 ICP 审核,现在做不了)
- [ ] RAG **M8 长期 Store**:短时 SQLite、黑板 State、追问改写已完成;用户画像长期记忆需先确定匿名浏览器 ID / 登录用户 ID
- [ ] 配置备用 provider:`FALLBACK_BASE_URL` + `FALLBACK_MODEL`(+ 可选独立 key);代码与测试已完成,当前生产未配置
- [ ] Git 已 init 但仍为 0 commits;提交前需再次做密钥扫描

**诚实说明**:M8 尚未“全部完成”。短时多轮已完成并测试,长期跨会话用户画像仍未实现;备用 provider 也因缺少用户提供的配置而未启用。

---

## 怎么在新电脑跑起来

```bash
cd ZH-Kinger
npm install              # 若 node_modules 没拷过来
npm run docs:dev         # 起本地,访问 http://localhost:8080/blog/
npm run docs:build       # 构建,产物在 src/.vuepress/dist/
```

Node 版本:22。VuePress 2 rc.28 + theme-hope rc.106。

---

## 拷贝前可选清理(减体积,新机会自动重建)

这些不拷也行,新机 `npm install` / 重跑脚本能重建:
- `node_modules/`(几百 MB,新机 npm install 重建)
- `src/.vuepress/.cache/`、`.temp/`、`dist/`(构建缓存/产物)
- `_backup_posts_orig/`(原 posts 备份,若已确认新文章无误可不拷)

**必须拷的**:`src/`(含新文章+图片)、`src/.vuepress/`(配置+样式)、`scripts/`、`docs/`、`HANDOFF.md`、`package.json`、`.github/`。

---

## 关键文件地图

| 要改什么 | 改哪个文件 |
|---|---|
| 再同步 Obsidian 文章 | `scripts/sync-obsidian-to-vuepress.mjs`(改 VAULT 路径后重跑) |
| 配色/深色 | `src/.vuepress/styles/{palette,config,index}.scss` |
| 导航/分类 | `src/.vuepress/{navbar,sidebar}.ts` |
| 主题开关/深色默认 | `src/.vuepress/theme.ts` + `config.ts`(head 脚本) |
| AI 悬浮球 | `src/.vuepress/client.ts` |
| 完整历史/决策 | `docs/collab/notes.md`(末尾是这次的交接快照) |
