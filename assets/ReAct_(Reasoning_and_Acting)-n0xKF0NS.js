import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%80%E9%98%B6%E6%AE%B5_%E6%8E%8C%E6%8F%A1%E2%80%9C%E5%A4%A7%E8%84%91%E2%80%9D%E7%9A%84%E5%86%B3%E7%AD%96%E6%9C%BA%E5%88%B6_(%E5%9F%BA%E7%A1%80)/ReAct_(Reasoning_and_Acting).html","title":"ReAct_(Reasoning_and_Acting)","lang":"zh-CN","frontmatter":{"title":"ReAct_(Reasoning_and_Acting)","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"ReAct (Reasoning and Acting) 是一种让大语言模型 (LLM) 同时具备推理思考和执行行动能力的AI智能体框架，由谷歌与普林斯顿大学于 2022 年提出。它的核心是让模型像人一样**“边想边做”，通过思考 → 行动 → 观察 → 再思考**的循环，自主解决复杂问题。 一、核心原理：思考与行动的闭环 ReAct 打破了传统 LL...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"ReAct_(Reasoning_and_Acting)\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%80%E9%98%B6%E6%AE%B5_%E6%8E%8C%E6%8F%A1%E2%80%9C%E5%A4%A7%E8%84%91%E2%80%9D%E7%9A%84%E5%86%B3%E7%AD%96%E6%9C%BA%E5%88%B6_(%E5%9F%BA%E7%A1%80)/ReAct_(Reasoning_and_Acting).html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"ReAct_(Reasoning_and_Acting)"}],["meta",{"property":"og:description","content":"ReAct (Reasoning and Acting) 是一种让大语言模型 (LLM) 同时具备推理思考和执行行动能力的AI智能体框架，由谷歌与普林斯顿大学于 2022 年提出。它的核心是让模型像人一样**“边想边做”，通过思考 → 行动 → 观察 → 再思考**的循环，自主解决复杂问题。 一、核心原理：思考与行动的闭环 ReAct 打破了传统 LL..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.7,"words":809},"filePathRelative":"posts/AI大模型/Agent应用开发/第一阶段_掌握“大脑”的决策机制_(基础)/ReAct_(Reasoning_and_Acting).md","excerpt":"<p><strong>ReAct (Reasoning and Acting)</strong> 是一种让大语言模型 (LLM) 同时具备<strong>推理思考</strong>和<strong>执行行动</strong>能力的<strong>AI智能体框架</strong>，由谷歌与普林斯顿大学于 2022 年提出。它的核心是让模型像人一样**“边想边做”<strong>，通过</strong>思考 → 行动 → 观察 → 再思考**的循环，自主解决复杂问题。</p>\\n<h3>一、核心原理：思考与行动的闭环</h3>\\n<p>ReAct 打破了传统 LLM “一次性输出答案”的模式，将解决问题的过程显式化为四个步骤的循环：</p>","autoDesc":true}`),i={name:`ReAct_(Reasoning_and_Acting).md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p><strong>ReAct (Reasoning and Acting)</strong> 是一种让大语言模型 (LLM) 同时具备<strong>推理思考</strong>和<strong>执行行动</strong>能力的<strong>AI智能体框架</strong>，由谷歌与普林斯顿大学于 2022 年提出。它的核心是让模型像人一样**“边想边做”<strong>，通过</strong>思考 → 行动 → 观察 → 再思考**的循环，自主解决复杂问题。</p>
<h3 id="一、核心原理-思考与行动的闭环" tabindex="-1"><a class="header-anchor" href="#一、核心原理-思考与行动的闭环"><span>一、核心原理：思考与行动的闭环</span></a></h3>
<p>ReAct 打破了传统 LLM “一次性输出答案”的模式，将解决问题的过程显式化为四个步骤的循环：</p>
<ol>
<li><strong>Thought (思考)</strong>：LLM 进行内在推理，明确当前目标、分析现状、规划下一步。</li>
</ol>
<ul>
<li><em>例：“我需要知道2026年长沙的天气，但我的知识只更新到2025年，所以我得查一下。”</em></li>
</ul>
<ol start="2">
<li><strong>Action (行动)</strong>：根据思考结果，调用外部工具或执行操作。</li>
</ol>
<ul>
<li><em>例：调用“搜索引擎”工具，查询“2026年3月22日长沙天气”。</em></li>
</ul>
<ol start="3">
<li><strong>Observation (观察)</strong>：获取外部工具返回的结果或环境反馈。</li>
</ol>
<ul>
<li><em>例：搜索返回：“长沙今日晴，15-25°C。”</em></li>
</ul>
<ol start="4">
<li><strong>Repeat (循环)</strong>：基于新的观察结果，再次进入思考，决定下一步行动或直接给出最终答案。</li>
</ol>
<h3 id="二、与传统方法的区别" tabindex="-1"><a class="header-anchor" href="#二、与传统方法的区别"><span>二、与传统方法的区别</span></a></h3>
<p><strong>传统 Chain-of-Thought (思维链)</strong>：</p>
<ul>
<li>只有<strong>思考</strong>（Thought），没有<strong>行动</strong>（Action）。</li>
<li>完全依赖模型内部知识，无法获取实时/外部信息，容易产生<strong>幻觉</strong>（Hallucination）。</li>
</ul>
<p><strong>传统工具调用 (Acting only)</strong>：</p>
<ul>
<li>只有<strong>行动</strong>，没有深度<strong>思考</strong>。</li>
<li>机械执行指令，缺乏对复杂任务的规划和异常处理能力。</li>
</ul>
<p><strong>ReAct</strong>：</p>
<ul>
<li><strong>推理 + 行动</strong>强强联合。</li>
<li><strong>推理</strong>指导行动更有目的性；<strong>行动</strong>为推理提供事实依据，互相纠正。</li>
</ul>
<h3 id="三、核心优势" tabindex="-1"><a class="header-anchor" href="#三、核心优势"><span>三、核心优势</span></a></h3>
<ol>
<li><strong>减少幻觉，更可信</strong>：通过实时调用外部工具（搜索引擎、数据库、计算器）获取事实，答案基于真实数据。</li>
<li><strong>处理复杂多步任务</strong>：像人类一样拆解任务、分步执行，能完成需要多轮交互的难题（如订机票、写代码）。</li>
<li><strong>过程可解释、可信赖</strong>：思考过程（Thought）被显式记录，人类可以清晰理解AI的决策路径，方便调试和纠错。</li>
<li><strong>自适应能力强</strong>：能根据环境反馈（Observation）动态调整计划，处理意外情况。</li>
</ol>
<h3 id="四、典型应用场景" tabindex="-1"><a class="header-anchor" href="#四、典型应用场景"><span>四、典型应用场景</span></a></h3>
<ul>
<li><strong>复杂问答与事实核查</strong>：需要跨文档、跨知识库检索信息的问题（如 HotpotQA 数据集）。</li>
<li><strong>交互式任务</strong>：预订行程、数据分析、代码调试、操控机器人。</li>
<li><strong>企业级AI助手</strong>：连接内部系统，查询报表、处理工单、自动办公。</li>
<li><strong>具身智能 (Embodied AI)</strong>：让AI在虚拟/现实环境中（如游戏、机械臂）进行规划和操作。</li>
</ul>
<h3 id="五、一句话总结" tabindex="-1"><a class="header-anchor" href="#五、一句话总结"><span>五、一句话总结</span></a></h3>
<p><strong>ReAct 是让大模型从“纸上谈兵”的思考者，变成“知行合一”的实干家的关键技术</strong>，是当前构建 Autonomous AI Agent（自主智能体）的基础范式。</p>
<p>需要我用一个具体的例子（比如“帮我订一张去北京的火车票”）来演示 ReAct 的完整思考和行动流程吗？</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};