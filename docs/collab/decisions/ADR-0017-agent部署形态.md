# ADR-0017: agent 部署形态(自建服务器 · Docker · IP 起步)
- 状态: 已采纳
- 日期: 2026-07-19
- 相关模块: M7(生产化)

## 背景(为什么要做这个决策)
博客(VuePress 静态站)早已由 GitHub Actions 自动部署到 GitHub Pages。但 agent 是**活的 Python 服务**(每次提问要实时跑检索→GLM→LangGraph 流式),GitHub Pages 这类静态托管**跑不了后端**。用户有一台服务器(SERVER_IP,SSH 通、80/443/7860 空闲、大概率国内)、无域名。需要定:①托管在哪 ②怎么打包 ③代码怎么上去 ④公网怎么防白嫖 ⑤要不要 HTTPS。

## 选项(≥2,每个一句话)
- **托管**:HuggingFace Spaces(免费托管)/ 云 PaaS(Railway/Render)/ **自建服务器** / Gradio share 临时隧道。
- **打包**:**Docker + compose** / 裸 venv + systemd。
- **上传**:**tar-over-ssh** / rsync / 建私有 git repo。
- **鉴权**:**Gradio auth 密码** / 设 private / 公开+限流。
- **访问**:**先 IP:7860,再 nip.io+Caddy 上 HTTPS** / 直接买域名 / 一直裸 IP。

## 优劣对比
| 方案 | 优 | 劣 |
|---|---|---|
| **自建服务器**(选) | 零额外成本(已有)、完全掌控、数据私有、可绑域名、学到全套生产部署 | 要自己运维 |
| HF Spaces | 免费真上线、git 驱动省心 | 免费 CPU 性能有限、公开托管、学到的是"托管黑盒" |
| 云 PaaS | git push 部署、比自建轻 | 免费额度有限、冷启动 |
| Gradio share | 一行零成本 | 72h 过期、机器必须常开、非真上线 |
| **Docker+compose**(选) | 依赖隔离不污染系统、`restart:unless-stopped` 自带守护、加反代只需 compose 加段、可复现 | 首次要装 docker、国内拉基础镜像需配镜像源 |
| 裸 venv+systemd | 更轻 | 依赖服务器 Python 版本、手动守护、可复现性差 |
| **tar-over-ssh**(选) | git bash 无 rsync 也能用、加密传输、一步到位 | 非增量(全量推;但库仅 33M 无所谓) |
| 建私有 repo | 规范、可回滚 | 起步多好几步(建库/鉴权/.env 排除) |
| **IP 起步 → 后上 HTTPS**(选) | 先证明能通、无域名不阻塞、绕开国内 ICP 备案 | IP 阶段明文(密码明文传,HTTPS 前的已知弱点) |

## 结论(选了哪个)
**自建服务器 + Docker/compose + tar-over-ssh + Gradio auth + 先 IP 后 HTTPS**。
- 镜像**只装 `rag,agent,web,ui` 四组,砍掉 torch/docling**(运行时全是 API 调用,不需要):镜像 ~2.5G→几百 M;Dockerfile 内 `pip show torch` 验证未被污染。
- `.env`(含 key)与 `data/`(33M chroma 库)**挂载卷**注入,不进镜像层:key 不落层、库可独立更新。
- host 默认 `127.0.0.1`(安全默认,本地不暴露);compose 内硬覆盖 `UI_HOST=0.0.0.0` 才对外。

## 为什么不选替代
- 不选 HF/PaaS:已有服务器,自建零成本且掌控更强、学得更多(契合"生产级+边学边做")。
- 不选 Gradio share:URL 会过期、依赖本地机常开,不是"上线"。
- 不选裸 systemd:干净机器上 Docker 隔离+自愈+可复现更省心,也是标准生产技能。
- 不选先买域名:无域名不阻塞;国内 IP 直连还省掉 ICP 备案(域名指向国内服务器的 web 服务需备案)。

## 回溯条件(什么情况下该重估)
- 需要给博客读者公开使用 → 上域名+HTTPS+限流(第二闸已规划 nip.io+Caddy)。
- 单机扛不住并发 → 上 PaaS/多副本或队列。
- 服务器在国外致 GLM/百炼 API 慢 → 迁国内节点或加缓存。

## 证据链接(→ docs/collab/research/RX 或 notes 日期)
- notes 2026-07-19(端口探测 22 开/80·443·7860 空闲;torch 527M 属入库期 docling,运行时不需要)。
- 依赖分组:pyproject.toml `[project.optional-dependencies]`(rag/agent/web/ui vs pdf/ingest)。
- 部署操作手册:docs/collab/部署.md。
