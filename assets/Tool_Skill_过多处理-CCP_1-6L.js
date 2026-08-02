import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/Agent%E5%A4%9A%E6%84%8F%E5%9B%BE%E8%AF%86%E5%88%AB(%E4%BC%81%E4%B8%9A%E7%BA%A7%E7%BD%91%E5%85%B3)/Tool_Skill_%E8%BF%87%E5%A4%9A%E5%A4%84%E7%90%86.html","title":"Tool_Skill_过多处理","lang":"zh-CN","frontmatter":{"title":"Tool_Skill_过多处理","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"在大模型（LLM）与 Agent 系统中，当“工具（Tools）”的数量和复杂度上升到一定量级，演变成涵盖特定业务场景、包含完整复杂逻辑的“技能（Skills）”时，传统的单层路由或单次 Function Calling 会彻底崩溃。因为你无法一次性把 100 个技能的 Schema 塞进大模型的 Prompt 里（这会导致上下文撑爆、首字延迟暴涨、模...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Tool_Skill_过多处理\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/Agent%E5%A4%9A%E6%84%8F%E5%9B%BE%E8%AF%86%E5%88%AB(%E4%BC%81%E4%B8%9A%E7%BA%A7%E7%BD%91%E5%85%B3)/Tool_Skill_%E8%BF%87%E5%A4%9A%E5%A4%84%E7%90%86.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"Tool_Skill_过多处理"}],["meta",{"property":"og:description","content":"在大模型（LLM）与 Agent 系统中，当“工具（Tools）”的数量和复杂度上升到一定量级，演变成涵盖特定业务场景、包含完整复杂逻辑的“技能（Skills）”时，传统的单层路由或单次 Function Calling 会彻底崩溃。因为你无法一次性把 100 个技能的 Schema 塞进大模型的 Prompt 里（这会导致上下文撑爆、首字延迟暴涨、模..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":5.2,"words":1561},"filePathRelative":"posts/AI大模型/Agent应用开发/第三阶段_拥抱生态与框架_(工程化)/Agent多意图识别(企业级网关)/Tool_Skill_过多处理.md","excerpt":"<p>在大模型（LLM）与 Agent 系统中，当“工具（Tools）”的数量和复杂度上升到一定量级，演变成涵盖特定业务场景、包含完整复杂逻辑的“技能（Skills）”时，传统的单层路由或单次 Function Calling 会彻底崩溃。因为你无法一次性把 100 个技能的 Schema 塞进大模型的 Prompt 里（这会导致上下文撑爆、首字延迟暴涨、模型注意力涣散乱调用）。</p>\\n<p>在<strong>认知路由网关架构</strong>中，应对“多技能（Multi-Skill）”的工业级标准解法是：<strong>两层多叉树路由架构（Two-tier Hierarchical Routing Architecture）</strong>。</p>","autoDesc":true}`),i={name:`Tool_Skill_过多处理.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在大模型（LLM）与 Agent 系统中，当“工具（Tools）”的数量和复杂度上升到一定量级，演变成涵盖特定业务场景、包含完整复杂逻辑的“技能（Skills）”时，传统的单层路由或单次 Function Calling 会彻底崩溃。因为你无法一次性把 100 个技能的 Schema 塞进大模型的 Prompt 里（这会导致上下文撑爆、首字延迟暴涨、模型注意力涣散乱调用）。</p>
<p>在<strong>认知路由网关架构</strong>中，应对“多技能（Multi-Skill）”的工业级标准解法是：<strong>两层多叉树路由架构（Two-tier Hierarchical Routing Architecture）</strong>。</p>
<p>其核心思想是：<strong>先分类，再抠参数；先锁定技能群组（Router Layer），再定点激活具体技能并填补卡槽（Execution Layer）。</strong></p>
<hr>
<h3 id="一、-多技能-multi-skill-物理架构拓扑" tabindex="-1"><a class="header-anchor" href="#一、-多技能-multi-skill-物理架构拓扑"><span>一、 多技能（Multi-Skill）物理架构拓扑</span></a></h3>
<p>当系统承载几十甚至上百个技能时，数据流采用<strong>纵向分层、横向并发</strong>的架构进行收拢：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>                ┌──────────────────────────────────────────────────┐</span></span>
<span class="line"><span>                │          用户复合提问 (User Multi-Skill Query)  │</span></span>
<span class="line"><span>                └────────────────────────┬─────────────────────────┘</span></span>
<span class="line"><span>                                         │</span></span>
<span class="line"><span>                                         ▼</span></span>
<span class="line"><span> ┌────────────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span> │ 层级 1：高空群组路由器 (Domain/Skill-Group Router)                                     │</span></span>
<span class="line"><span> │                                                                                        │</span></span>
<span class="line"><span> │ * 任务：完全不看具体参数，只用极快、极便宜的方式，把问题分流到 1~N 个特定的“技能群组”    │</span></span>
<span class="line"><span> │ * 实现：向量空间语义匹配 (Semantic Router) 或轻量级二分类小模型 (SLM)                  │</span></span>
<span class="line"><span> └───────────────────────┬─────────────────────────┬──────────────────────────────┘</span></span>
<span class="line"><span>                         │ (命中：AI Infra 群组)    │ (命中：日常办公群组)</span></span>
<span class="line"><span>                         ▼                         ▼</span></span>
<span class="line"><span> ┌────────────────────────────────────────┐ ┌────────────────────────────────────────┐</span></span>
<span class="line"><span> │ 层级 2：叶子节点技能激活器              │ │ 层级 2：叶子节点技能激活器              │</span></span>
<span class="line"><span> │ (Infra Skill Domain)                   │ │ (Office Skill Domain)                  │</span></span>
<span class="line"><span> │                                        │ │                                        │</span></span>
<span class="line"><span> │ * 此时大模型只面对该领域特定的 5 个技能  │ │ * 此时大模型只面对该领域特定的 4 个技能  │</span></span>
<span class="line"><span> │   - 技能 A: 重启 K8s Pod (Schema)      │ │   - 技能 X: 发送企业邮件 (Schema)      │</span></span>
<span class="line"><span> │   - 技能 B: 拉取 Triton 监控 (Schema)   │ │   - 技能 Y: 预定会议室 (Schema)        │</span></span>
<span class="line"><span> └───────────────────────┬────────────────┘ └───────────────────────┬────────────────┘</span></span>
<span class="line"><span>                         │ (并行抠出具体参数 JSON)                           │ (并行抠出具体参数 JSON)</span></span>
<span class="line"><span>                         ▼                                           ▼</span></span>
<span class="line"><span> ┌────────────────────────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span> │ 层级 3：多技能有向无环图调度总线 (DAG Async Skill Bus)                                 │</span></span>
<span class="line"><span> │                                                                                        │</span></span>
<span class="line"><span> │ * 任务：并发拉起底层技能代码（如 asyncio.gather）                                       │</span></span>
<span class="line"><span> │ * 特性：[K8s重启技能] ⚡并发运行⚡ [邮件外发技能]                                         │</span></span>
<span class="line"><span> └────────────────────────────────────────────────────────────────────────────────────────┘</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h3 id="二、-核心架构层的关键机制" tabindex="-1"><a class="header-anchor" href="#二、-核心架构层的关键机制"><span>二、 核心架构层的关键机制</span></a></h3>
<h4 id="_1-高空群组路由器-top-level-domain-router" tabindex="-1"><a class="header-anchor" href="#_1-高空群组路由器-top-level-domain-router"><span>1. 高空群组路由器（Top-Level Domain Router）</span></a></h4>
<ul>
<li><strong>物理止损线</strong>：如果你把 50 个技能的规格书全喂给 LLM，大模型每回答一句话都需要走几万 Token 的算力，高并发下直接卡死。</li>
<li><strong>工业做法</strong>：顶层设计为一个极速分流器。我们把技能按照业务归类为一个个域（Domain），例如 <code v-pre>Infra技能域</code>、<code v-pre>财务技能域</code>、<code v-pre>HR人事技能域</code>。</li>
<li><strong>路由加速</strong>：用户输入“帮我把死掉的 Pod 删了，然后发个邮件给王总”。顶层路由器（可以使用本地几毫秒就能跑完的 Embedding 向量匹配）瞬间给出判断：<strong>激活</strong> <code v-pre>Infra域</code> <strong>与</strong> <code v-pre>Office域**</code><strong>。其余无关的几十个财务、人事技能对应的 Schema 描述在这一步被</strong>物理剪枝（Pruning）**，根本不进入下一层。</li>
</ul>
<h4 id="_2-领域内动态-schema-注入-domain-specific-context-injection" tabindex="-1"><a class="header-anchor" href="#_2-领域内动态-schema-注入-domain-specific-context-injection"><span>2. 领域内动态 Schema 注入（Domain-Specific Context Injection）</span></a></h4>
<ul>
<li><strong>按需加载</strong>：当请求被下发到指定的“域”之后，网关系统才会从 Redis 或本地内存中，把该域所专属的<strong>轻量级技能 Schema 集合</strong>动态捞出来。</li>
<li><strong>专业化提取</strong>：此时，调用一个中等体量的大模型（如 Qwen-7B 或 GPT-4o-mini），只把当前域的 3~5 个精细的 <code v-pre>Pydantic</code> 结构体扔给它。因为干扰选项极少，大模型能够以接近 100% 的准确率，完美抠出具体技能需要的参数卡槽（Slot Filling）。</li>
</ul>
<h4 id="_3-动态命名空间隔离-namespace-isolation" tabindex="-1"><a class="header-anchor" href="#_3-动态命名空间隔离-namespace-isolation"><span>3. 动态命名空间隔离（Namespace Isolation）</span></a></h4>
<ul>
<li><strong>技能防撞名</strong>：在企业级开发中，不同的研发团队开发的技能可能重名（例如系统运维部写了一个 <code v-pre>delete_node</code> 技能用来删服务器，全栈开发部也写了一个 <code v-pre>delete_node</code> 用来删前端 DOM 节点）。</li>
<li><strong>物理隔离</strong>：所有的技能在注册时，必须挂载在各自的命名空间（Namespace）下：<code v-pre>infra:delete_node</code> 或 <code v-pre>frontend:delete_node</code>。顶层路由层在下发时自动带上命名空间前缀，从物理上消灭重名调用带来的系统灾难。</li>
</ul>
<hr>
<h3 id="三、-两个技能之间有-因果依赖-怎么办-技能链条传递" tabindex="-1"><a class="header-anchor" href="#三、-两个技能之间有-因果依赖-怎么办-技能链条传递"><span>三、 两个技能之间有“因果依赖”怎么办？（技能链条传递）</span></a></h3>
<p>多技能架构中，最经典的一个难题是：<strong>技能 B 的执行，必须依赖技能 A 返回的数据作为参数</strong>（例如：用户说“帮我查一下今天报错最多的 Pod ID，然后把它的日志拉出来”）。</p>
<ul>
<li><strong>技能 A</strong>：<code v-pre>find_top_error_pod()</code> $\\to$ 返回 <code v-pre>pod_id_99</code></li>
<li><strong>技能 B</strong>：<code v-pre>fetch_pod_log(pod_id)</code> $\\to$ 需要注入 <code v-pre>pod_id</code></li>
</ul>
<p>在两层路由架构下，我们不让大模型在最开始就去盲猜这个 ID。而是利用拓扑依赖总线（Dependency Bus）分步激活：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span> 【 用户原始输入 】 ──> 层级 1 判定 ──> 锁死需要激活 [技能 A] 和 [技能 B]</span></span>
<span class="line"><span>                                             │</span></span>
<span class="line"><span>                                             ▼</span></span>
<span class="line"><span>                                     执行 【 技能 A 】 ──> 拿到底层返回值: "pod_id_99"</span></span>
<span class="line"><span>                                                                  │</span></span>
<span class="line"><span>                                                                  ▼ (自动卡槽补全算子)</span></span>
<span class="line"><span>                                     激活 【 技能 B 】 &#x3C;── 动态注入: {"pod_id": "pod_id_99"}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li><strong>静态图依赖分析</strong>：层级 2 的大模型在拆解意图时，发现这两个技能都被激活了，但大模型发现自己<strong>只有技能 A 的必填参数，缺乏技能 B 的必填参数</strong>（此时大模型并不知道 Pod ID 是什么）。</li>
<li><strong>依赖打桩（Stubbing）</strong>：大模型会在输出的编排图（DAG）中写入一条逻辑：“执行技能 B，但其参数 <code v-pre>pod_id</code> 依赖于技能 A 的输出结果”。</li>
<li><strong>运行时注入（Runtime Slot Injection）</strong>：代码协程并发流启动，先跑技能 A。当技能 A 运行完毕吐出 <code v-pre>pod_id_99</code> 后，控制面的<strong>状态机</strong>当场捕获这个返回值，将其作为入参物理塞进技能 B 的 Pydantic 实体中，随后顺畅激活技能 B。</li>
</ol>
<h3 id="💡-极简架构总结" tabindex="-1"><a class="header-anchor" href="#💡-极简架构总结"><span>💡 极简架构总结：</span></a></h3>
<p>面对海量 Skill，核心思维就是“分而治之，层级剪枝”<strong>。顶层靠</strong>轻量向量/分类模型<strong>大刀阔斧斩断无关领域，中层靠</strong>细粒度 Schema 强约束<strong>精准提取槽位，底层靠</strong>依赖总线（DAG）打通 Skill 之间的数据血统。这种架构既能支撑上百个业务技能，又能将端到端延迟控制在极佳的工业水平线内。</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};