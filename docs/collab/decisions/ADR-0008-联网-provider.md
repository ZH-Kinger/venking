# ADR-0008: 联网搜索 provider —— 三选一工厂
- 状态: 已采纳
- 日期: 2026-07-13
- 相关模块: M4

## 背景(为什么要做这个决策)
CRAG 兜底阶梯需联网:本地不接地时联网带出处作答(`[W#]`+URL)。需选联网后端,兼顾"免 key 起步"与"精准/合规"。

## 选项(≥2,每个一句话)
- **A DuckDuckGo(`ddgs`)**:免 key、聚合元搜索。
- **B Tavily**:为 RAG 优化,天然带 url+content 摘要。
- **C 博查 Bocha**:国内/中文/合规,纯 HTTP。

## 优劣对比
| 方案 | 优 | 劣 |
|---|---|---|
| **A ddgs** | 免 key、零成本起步 | 限流严重(429),Windows 吃不到其"无限流"DHT 加速;结果非 RAG 优化 |
| **B Tavily** | 天然 url+content(LLM 友好摘要)、免费 1000 credits/月无需信用卡 | 需 key、境外服务 |
| **C Bocha** | 国内、中文、合规、纯 requests | 需 key、按次计费需充值 |

## 结论(选了哪个)
**三 provider 工厂**(`web_provider` 三选一):ddgs 免 key 起步/回退,Tavily 作默认精准后端,Bocha 作中文/合规备选。统一归一化到 `{title, url, snippet}` → 复用 `[W#]` 引用模式。provider 层:`timeout=5` + tenacity 退避 + 异常降级返 `[]`(联网失败不拖垮问答)。默认 `web_provider=duckduckgo`。

## 为什么不选替代(即为什么不锁死单一 provider)
- 不锁死是因三者各有不可替代的位:ddgs 免 key 适合零配置起步但限流不稳、Windows 无加速,不能作精准主力;Tavily RAG 友好但境外 + 需 key;Bocha 合规中文但需充值。做成工厂 = 用户按 key/合规/精准需求切换,而非二选一互斥。早先 Bocha 无 key 白等 4.5s 已加 early-return。

## 回溯条件(什么情况下该重估)
默认 provider 精准/稳定性不达标(eval web 题 faithfulness 掉);出现更优的 RAG 联网 API;数据出域合规要求变化。

## 证据链接
- `docs/collab/research/R7-联网搜索.md`(三 provider 规格 + 统一 schema + 健壮性)
- notes 2026-07-13(web.py 落地、GB200 联网后 faithfulness 0.0→0.992、auditor 复闸)
</content>
