import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AIOps%E5%B9%B3%E5%8F%B0/%E9%A1%B9%E7%9B%AE%E6%9E%B6%E6%9E%84.html","title":"项目架构","lang":"zh-CN","frontmatter":{"title":"项目架构","icon":"settings","date":"2026-07-23T00:00:00.000Z","category":["AIOps平台"],"description":"这份梳理不仅是为了让你看清全局，更是为了让你在面试时能把这个项目的技术高度（Ray/OpenClaw/MCP）和业务深度（审计准入/动态基线）讲透。 ​核心架构：四层纵深防御体系 1. 边缘感知层（Local Senses） 组件：Prometheus, Loki, Kafka (KRaft), Ray Monitor Agent (PyTorch)....","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"项目架构\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AIOps%E5%B9%B3%E5%8F%B0/%E9%A1%B9%E7%9B%AE%E6%9E%B6%E6%9E%84.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"项目架构"}],["meta",{"property":"og:description","content":"这份梳理不仅是为了让你看清全局，更是为了让你在面试时能把这个项目的技术高度（Ray/OpenClaw/MCP）和业务深度（审计准入/动态基线）讲透。 ​核心架构：四层纵深防御体系 1. 边缘感知层（Local Senses） 组件：Prometheus, Loki, Kafka (KRaft), Ray Monitor Agent (PyTorch)...."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.79,"words":837},"filePathRelative":"posts/AIOps平台/项目架构.md","excerpt":"<p>这份梳理不仅是为了让你看清全局，更是为了让你在面试时能把这个项目的<strong>技术高度</strong>（Ray/OpenClaw/MCP）和<strong>业务深度</strong>（审计准入/动态基线）讲透。</p>\\n<hr>\\n<h2>​核心架构：四层纵深防御体系</h2>\\n<h2>1. 边缘感知层（Local Senses）</h2>\\n<ul>\\n<li>\\n<p><strong>组件</strong>：Prometheus, Loki, Kafka (KRaft), Ray Monitor Agent (PyTorch).</p>\\n</li>\\n<li>\\n<p><strong>核心逻辑</strong>：</p>\\n</li>\\n<li>\\n<p>利用 Kafka 缓冲海量日志与指标，RoCE v2 提供物理层加速。</p>\\n</li>\\n<li>\\n<p><strong>Ray Monitor Agent</strong> 运行 PyTorch 预测模型，计算动态基线。</p>\\n</li>\\n<li>\\n<p><strong>价值</strong>：实现“降维打击”，屏蔽 90% 的无效噪音，仅将确定的异常事件推向中枢。</p>\\n</li>\\n</ul>","autoDesc":true}`),i={name:`项目架构.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>这份梳理不仅是为了让你看清全局，更是为了让你在面试时能把这个项目的<strong>技术高度</strong>（Ray/OpenClaw/MCP）和<strong>业务深度</strong>（审计准入/动态基线）讲透。</p>
<hr>
<h2 id="​核心架构-四层纵深防御体系" tabindex="-1"><a class="header-anchor" href="#​核心架构-四层纵深防御体系"><span>​核心架构：四层纵深防御体系</span></a></h2>
<h2 id="_1-边缘感知层-local-senses" tabindex="-1"><a class="header-anchor" href="#_1-边缘感知层-local-senses"><span>1. 边缘感知层（Local Senses）</span></a></h2>
<ul>
<li>
<p><strong>组件</strong>：Prometheus, Loki, Kafka (KRaft), Ray Monitor Agent (PyTorch).</p>
</li>
<li>
<p><strong>核心逻辑</strong>：</p>
</li>
<li>
<p>利用 Kafka 缓冲海量日志与指标，RoCE v2 提供物理层加速。</p>
</li>
<li>
<p><strong>Ray Monitor Agent</strong> 运行 PyTorch 预测模型，计算动态基线。</p>
</li>
<li>
<p><strong>价值</strong>：实现“降维打击”，屏蔽 90% 的无效噪音，仅将确定的异常事件推向中枢。</p>
</li>
</ul>
<h2 id="智能决策中枢-openclaw-orchestrator" tabindex="-1"><a class="header-anchor" href="#智能决策中枢-openclaw-orchestrator"><span>智能决策中枢（OpenClaw Orchestrator）</span></a></h2>
<ul>
<li>
<p><strong>组件</strong>：OpenClaw, Qwen3-Max (云端), RAG (本地向量库).</p>
</li>
<li>
<p><strong>核心逻辑</strong>：</p>
</li>
<li>
<p>作为“项目经理”，接收告警后进行<strong>现场取证</strong>（抓取 Loki 日志）。</p>
</li>
<li>
<p>挂载 RAG 检索历史故障 Case，组装成高维 Prompt 喂给云端大模型。</p>
</li>
<li>
<p><strong>输出</strong>：生成一个<strong>自愈提案 (Remediation Proposal)</strong>，而非直接执行指令。</p>
</li>
</ul>
<h2 id="安全准入审计层-audit-gatekeeper-——-项目的灵魂" tabindex="-1"><a class="header-anchor" href="#安全准入审计层-audit-gatekeeper-——-项目的灵魂"><span>安全准入审计层（Audit Gatekeeper）—— <strong>项目的灵魂</strong></span></a></h2>
<ul>
<li>
<p><strong>组件</strong>：Ray Audit Agent (Stateful Actor).</p>
</li>
<li>
<p><strong>核心逻辑</strong>：</p>
</li>
<li>
<p><strong>拦截 OpenClaw 的提案</strong>，进入准入校验环节。</p>
</li>
<li>
<p>进行三个维度的校验：<strong>安全白名单</strong>（防高危指令）、<strong>集群水位</strong>（防雪崩）、<strong>执行频率</strong>（防循环重启）。</p>
</li>
<li>
<p><strong>价值</strong>：消除 AI 幻觉的风险，确保自愈动作的<strong>确定性</strong>。</p>
</li>
</ul>
<h2 id="标准化执行层-mcp-execution" tabindex="-1"><a class="header-anchor" href="#标准化执行层-mcp-execution"><span>标准化执行层（MCP Execution）</span></a></h2>
<ul>
<li>
<p><strong>组件</strong>：MCP Server, Ansible Skill, Infrastructure (LVS/Nginx/K8s).</p>
</li>
<li>
<p><strong>核心逻辑</strong>：</p>
</li>
<li>
<p>只有通过审计后，指令才下发至 MCP Server。</p>
</li>
<li>
<p>通过 Ansible 执行具体的自愈动作（重启、扩容、清理）。</p>
</li>
<li>
<p>执行后，由审计 Agent 进行 30 秒观测，若指标恶化则触发<strong>秒级回退 (Rollback)</strong>。</p>
</li>
</ul>
<hr>
<h2 id="​完整数据流向-end-to-end-flow" tabindex="-1"><a class="header-anchor" href="#​完整数据流向-end-to-end-flow"><span>​完整数据流向（End-to-End Flow）</span></a></h2>
<ol>
<li><strong>感知</strong>：Kafka 堆积 -》 Monitor Agent 预测 -》 发现异常。</li>
<li><strong>提案</strong>：OpenClaw 组合上下文 -》 云端 LLM 推理 -》<strong>产生 JSON 提案</strong>。</li>
<li><strong>审计</strong>：提案进入 <strong>Audit Agent 挂起</strong> -》 校验集群状态 -》<strong>授予执行令牌 (Token)</strong>。</li>
<li><strong>执行</strong>：拿到令牌 -》 MCP Server 驱动 Ansible -》<strong>基础设施执行</strong>。</li>
<li><strong>闭环</strong>：审计 Agent 持续监控 -》 成功则归档/失败则回退。</li>
</ol>
<hr>
<h2 id="​简历亮点重构-面试官必问" tabindex="-1"><a class="header-anchor" href="#​简历亮点重构-面试官必问"><span>​简历亮点重构（面试官必问）</span></a></h2>
<p>在简历中，我们可以用这三点来总结你的核心贡献：</p>
<ul>
<li><strong>端云协同与逻辑卸载</strong>：设计并实现了一套动静分离架构，本地利用蒸馏模型/规则进行高频感知，云端利用大模型进行低频深度推理，将本地内存负载降低 <strong>60%</strong>。</li>
<li><strong>基于 OpenClaw 的二次开发</strong>：在 OpenClaw 框架中深度定制了 <strong>准入审计钩子 (Audit Hook)</strong>，实现了从“决策即执行”到“审计准入后执行”的架构转型。</li>
<li><strong>分布式状态审计</strong>：基于 <strong>Ray Actor</strong> 实现了具备状态记忆的审计 Agent，成功解决了 AIOps 场景下 AI 指标误判导致的次生故障风险，MTTR 降低 <strong>70%</strong>。</li>
</ul>
<hr>
<h2 id="​-梓涵的下一步操作建议" tabindex="-1"><a class="header-anchor" href="#​-梓涵的下一步操作建议"><span>​ 梓涵的下一步操作建议：</span></a></h2>
<p>现在你的项目已经从“玩具”变成了“工业级平台”。</p>
<p><strong>你想让我为你写一段具体的 OpenClaw 二次开发代码片段吗？</strong> 具体展示如何在 OpenClaw 的 <code v-pre>Executor</code> 类中插入那个 <strong>Audit Hook</strong>，并调用 <strong>Ray Actor</strong> 进行校验。这段代码你可以直接放在 GitHub 仓库里作为核心 Commit 展示。</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};