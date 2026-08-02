import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/Claude%E7%BB%93%E6%9E%84%E8%A7%A3%E6%9E%90/Iterative_Loop/Iterative_Loop%E5%92%8Creact.html","title":"Iterative_Loop和react","lang":"zh-CN","frontmatter":{"title":"Iterative_Loop和react","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"一句话道破本质：Iterative Loop 是“骨架”，而 ReAct 是在这套骨架上运行的“灵魂（算法思维模式）”。 在 Agent 架构中，Iterative Loop 是工程上的底层实现手段（物理代码层），负责提供循环、状态维护和熔断机制；而 ReAct（Reasoning + Acting） 则是大模型在循环中所遵循的认知行为范式（逻辑算法层...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Iterative_Loop和react\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/Claude%E7%BB%93%E6%9E%84%E8%A7%A3%E6%9E%90/Iterative_Loop/Iterative_Loop%E5%92%8Creact.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"Iterative_Loop和react"}],["meta",{"property":"og:description","content":"一句话道破本质：Iterative Loop 是“骨架”，而 ReAct 是在这套骨架上运行的“灵魂（算法思维模式）”。 在 Agent 架构中，Iterative Loop 是工程上的底层实现手段（物理代码层），负责提供循环、状态维护和熔断机制；而 ReAct（Reasoning + Acting） 则是大模型在循环中所遵循的认知行为范式（逻辑算法层..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":4.16,"words":1247},"filePathRelative":"posts/AI大模型/Agent应用开发/第三阶段_拥抱生态与框架_(工程化)/Claude结构解析/Iterative_Loop/Iterative_Loop和react.md","excerpt":"<p>一句话道破本质：<strong>Iterative Loop 是“骨架”，而 ReAct 是在这套骨架上运行的“灵魂（算法思维模式）”。</strong></p>\\n<p>在 Agent 架构中，<strong>Iterative Loop 是工程上的底层实现手段（物理代码层）</strong>，负责提供循环、状态维护和熔断机制；而 <strong>ReAct（Reasoning + Acting） 则是大模型在循环中所遵循的认知行为范式（逻辑算法层）</strong>。</p>\\n<p>两者的结合，构成了现代智能体最经典、最稳固的自主控制回路。</p>\\n<hr>\\n<h3>一、 论文溯源：ReAct 是如何定义这一范式的？</h3>","autoDesc":true}`),i={name:`Iterative_Loop和react.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>一句话道破本质：<strong>Iterative Loop 是“骨架”，而 ReAct 是在这套骨架上运行的“灵魂（算法思维模式）”。</strong></p>
<p>在 Agent 架构中，<strong>Iterative Loop 是工程上的底层实现手段（物理代码层）</strong>，负责提供循环、状态维护和熔断机制；而 <strong>ReAct（Reasoning + Acting） 则是大模型在循环中所遵循的认知行为范式（逻辑算法层）</strong>。</p>
<p>两者的结合，构成了现代智能体最经典、最稳固的自主控制回路。</p>
<hr>
<h3 id="一、-论文溯源-react-是如何定义这一范式的" tabindex="-1"><a class="header-anchor" href="#一、-论文溯源-react-是如何定义这一范式的"><span>一、 论文溯源：ReAct 是如何定义这一范式的？</span></a></h3>
<p>在传统的 LLM 应用中，大模型有两个独立演进的思维方向：</p>
<ol>
<li><strong>Reason-only（纯思考）</strong>：以 <strong>CoT（思维链）</strong> 为代表。让大模型一步步思考，但它是闭门造车，无法感知外部物理世界的真实数据和变量。</li>
<li><strong>Act-only（纯行动）</strong>：以传统的 <strong>Function Calling（函数调用）</strong> 为代表。不让模型思考，只让它疯狂输出 API 参数，缺乏应对复杂因果推现和大局观的能力。</li>
</ol>
<p>由普林斯顿大学和谷歌等机构提出的 <strong>ReAct 论文（2022年）</strong> 将这两者进行了史诗级的融合：它要求大模型在每一次决策时，必须严格交替按照 <strong>“Thought（推理）</strong>$\\rightarrow$ <strong>Action（行动）</strong>$\\rightarrow$ <strong>Observation（观察）”</strong> 的固定格式走完一圈。</p>
<p>而这个“交替走完一圈、反复转圈”的物理过程，正是由 <strong>Iterative Loop</strong> 在代码底层支撑起来的。</p>
<hr>
<h3 id="二、-深度物理映射-react-如何在-iterative-loop-节点中流转" tabindex="-1"><a class="header-anchor" href="#二、-深度物理映射-react-如何在-iterative-loop-节点中流转"><span>二、 深度物理映射：ReAct 如何在 Iterative Loop 节点中流转</span></a></h3>
<p>我们可以把 ReAct 的算法逻辑，严丝合缝地物理投影到 Iterative Loop 的控制状态机中：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>       【 Iterative Loop 控制底盘 (由 Python 异步循环提供驱动) 】</span></span>
<span class="line"><span>                                │</span></span>
<span class="line"><span>                                ▼</span></span>
<span class="line"><span>  ▶ 节点 1 (代码层启动新一圈) ──> 📥 【 ReAct 状态 A: Thought (推理) 】</span></span>
<span class="line"><span>                                     │ 模型内心独白：“我当前的目标是X，根据上一圈</span></span>
<span class="line"><span>                                     │ 的反馈，我发现差了数据Y，所以我现在需要...”</span></span>
<span class="line"><span>                                     ▼</span></span>
<span class="line"><span>  ▶ 节点 2 (代码层捕获输出) ────> ⚙️ 【 ReAct 状态 B: Action (行动) 】</span></span>
<span class="line"><span>                                     │ 模型向外部执行层下发严密的结构化参数:</span></span>
<span class="line"><span>                                     │ \`tool: fetch_data_y(param)\`</span></span>
<span class="line"><span>                                     ▼</span></span>
<span class="line"><span>  ▶ 节点 3 (代码层物理干活) ────> 🔌 【 ReAct 状态 C: Observation (观察) 】</span></span>
<span class="line"><span>                                     │ 代码并发拉起 API / 脚本，拿到物理现实的</span></span>
<span class="line"><span>                                     │ 真实数据或报错，强行拼回上下文账本</span></span>
<span class="line"><span>                                     │</span></span>
<span class="line"><span>                                     ▼ (检查终止条件)</span></span>
<span class="line"><span>  ▶ 节点 4 (代码层判定) ───────> 🔄 未收敛？──> 回到起点，启动下一轮 ReAct 循环</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>没有 Iterative Loop 的 ReAct</strong>：只是纸上谈兵。大模型即便在 Prompt 里写了一万遍“Thought、Action”，如果没有底层代码不断把它产生的数据收集起来、并发调 API、再重新拼成 messages 喂回去，整个流在第一步吐出文本后就卡死结束了。</li>
<li><strong>没有 ReAct 的 Iterative Loop</strong>：只是一具没有灵魂的僵尸代码。循环虽然在不停地转，但大模型不知道自己为什么要转圈，它看不懂 API 的报错反馈，也无法根据前一圈的失败经验去自主修正下一圈的工具参数，整个循环会迅速失控或原地复读。</li>
</ul>
<hr>
<h3 id="三、-工业界目前的-反思-react-的缺陷与进化" tabindex="-1"><a class="header-anchor" href="#三、-工业界目前的-反思-react-的缺陷与进化"><span>三、 工业界目前的“反思”：ReAct 的缺陷与进化</span></a></h3>
<p>虽然 ReAct 完美地跑在 Iterative Loop 上，但在最新的 AI Infra 实践中，纯粹、手写的 ReAct 结构正受到极大的挑战：</p>
<ol>
<li><strong>Token 费用爆炸与高延迟（Latency）</strong>：<br>
ReAct 每一圈都要让大模型“先写一堆废话 Thought（内心独白）”，再输出 Action。长文本下，这会导致首字延迟（TTFT）极高。</li>
</ol>
<ul>
<li><em>现代化进化</em>：<strong>结构化 JSON Mode 替代原生 ReAct</strong>。如我们前文代码所示，不再让模型输出人类看的那种文本 Thought，而是利用 Pydantic 约束，让模型将 <code v-pre>reasoning_thought</code> 和 <code v-pre>action_arguments</code> 封装在同一个 JSON 结构体中一次性吐出，完美继承 ReAct 的思维，同时让解析效率提升数倍。</li>
</ul>
<ol start="2">
<li><strong>容易陷入“逻辑鬼打墙（Infinite Loops）”</strong>：<br>
在纯 ReAct 循环中，大模型一旦智商不够或者工具返回的报错超出其认知，它会陷入死循环（如：Thought: “报错了，我再试一次。” $\\rightarrow$ Action: “尝试。” $\\rightarrow$ Observation: “又报错。” $\\rightarrow$ Thought: “那我再试一次。”）。</li>
</ol>
<ul>
<li><em>现代化进化</em>：从<strong>单线 ReAct</strong> 向 <strong>LangGraph 状态图或 DAG（有向无环图）工作流</strong>演进。通过代码把转移条件限制死，如果连续两圈 Observation 完全一致，直接在工程层物理切断循环，不给大模型继续鬼打墙的机会。</li>
</ul>
<h3 id="💡-极简终总结" tabindex="-1"><a class="header-anchor" href="#💡-极简终总结"><span>💡 极简终总结</span></a></h3>
<ul>
<li><strong>Iterative Loop</strong> 是写在 Python/Go 文件里的 <code v-pre>for turn in range(max_turns):</code> 代码，它是<strong>容器、是物理底盘</strong>。</li>
<li><strong>ReAct</strong> 是写在 Prompt 规格说明书里的 <code v-pre>Thought -&gt; Action -&gt; Observation</code> 认知行为准则，它是<strong>内功、是算法模式</strong>。</li>
<li>你用底层代码（Iterative Loop）搭建好输送数据和拦截风险的铁轨，大模型才能沿着这条铁轨完美演练它的自主推理与行动（ReAct）。</li>
</ul>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};