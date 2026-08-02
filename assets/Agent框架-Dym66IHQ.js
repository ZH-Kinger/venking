import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%80%E9%98%B6%E6%AE%B5_%E6%8E%8C%E6%8F%A1%E2%80%9C%E5%A4%A7%E8%84%91%E2%80%9D%E7%9A%84%E5%86%B3%E7%AD%96%E6%9C%BA%E5%88%B6_(%E5%9F%BA%E7%A1%80)/ReAct_(Reasoning_and_Acting)/Agent%E6%A1%86%E6%9E%B6.html","title":"Agent框架","lang":"zh-CN","frontmatter":{"title":"Agent框架","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"ReAct (Reasoning + Acting) 是当前构建 AI 智能体 (AI Agent) 的核心范式。以下是基于 ReAct 框架（或其变种）开发的主流应用、开源项目与产品： 一、主流开源 Agent 框架（基于 ReAct） 这些是开发者最常用的底层框架，直接实现或深度集成了 ReAct 逻辑。 LangChain (最流行) 核心：Ag...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Agent框架\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%80%E9%98%B6%E6%AE%B5_%E6%8E%8C%E6%8F%A1%E2%80%9C%E5%A4%A7%E8%84%91%E2%80%9D%E7%9A%84%E5%86%B3%E7%AD%96%E6%9C%BA%E5%88%B6_(%E5%9F%BA%E7%A1%80)/ReAct_(Reasoning_and_Acting)/Agent%E6%A1%86%E6%9E%B6.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"Agent框架"}],["meta",{"property":"og:description","content":"ReAct (Reasoning + Acting) 是当前构建 AI 智能体 (AI Agent) 的核心范式。以下是基于 ReAct 框架（或其变种）开发的主流应用、开源项目与产品： 一、主流开源 Agent 框架（基于 ReAct） 这些是开发者最常用的底层框架，直接实现或深度集成了 ReAct 逻辑。 LangChain (最流行) 核心：Ag..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.03,"words":910},"filePathRelative":"posts/AI大模型/Agent应用开发/第一阶段_掌握“大脑”的决策机制_(基础)/ReAct_(Reasoning_and_Acting)/Agent框架.md","excerpt":"<p><strong>ReAct (Reasoning + Acting)</strong> 是当前构建 <strong>AI 智能体 (AI Agent)</strong> 的核心范式。以下是基于 ReAct 框架（或其变种）开发的主流应用、开源项目与产品：</p>\\n<h3>一、主流开源 Agent 框架（基于 ReAct）</h3>\\n<p>这些是开发者最常用的底层框架，直接实现或深度集成了 ReAct 逻辑。</p>\\n<ol>\\n<li><strong>LangChain (最流行)</strong></li>\\n</ol>\\n<ul>\\n<li>核心：<code>Agent</code> 模块原生支持 <strong>ReAct</strong> 模式（<code>create_react_agent</code>）。</li>\\n<li>功能：支持 LLM 思考、调用工具（搜索/计算器/API）、观察结果、循环直至完成任务。</li>\\n<li>应用：几乎所有基于 LangChain 构建的问答、自动化助手、数据分析应用。</li>\\n</ul>","autoDesc":true}`),i={name:`Agent框架.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p><strong>ReAct (Reasoning + Acting)</strong> 是当前构建 <strong>AI 智能体 (AI Agent)</strong> 的核心范式。以下是基于 ReAct 框架（或其变种）开发的主流应用、开源项目与产品：</p>
<h3 id="一、主流开源-agent-框架-基于-react" tabindex="-1"><a class="header-anchor" href="#一、主流开源-agent-框架-基于-react"><span>一、主流开源 Agent 框架（基于 ReAct）</span></a></h3>
<p>这些是开发者最常用的底层框架，直接实现或深度集成了 ReAct 逻辑。</p>
<ol>
<li><strong>LangChain (最流行)</strong></li>
</ol>
<ul>
<li>核心：<code v-pre>Agent</code> 模块原生支持 <strong>ReAct</strong> 模式（<code v-pre>create_react_agent</code>）。</li>
<li>功能：支持 LLM 思考、调用工具（搜索/计算器/API）、观察结果、循环直至完成任务。</li>
<li>应用：几乎所有基于 LangChain 构建的问答、自动化助手、数据分析应用。</li>
</ul>
<ol start="2">
<li><strong>AutoGPT (第一个现象级 ReAct 应用)</strong></li>
</ol>
<ul>
<li>核心：完全基于 ReAct 闭环，<strong>自主设定目标、规划步骤、调用工具</strong>。</li>
<li>特点：无需人类干预，自动拆解复杂任务（如市场调研、写代码、运营社交媒体）。</li>
<li>影响：引爆了“自主 AI 智能体”概念，是 ReAct 最知名的开源 Demo。</li>
</ul>
<ol start="3">
<li><strong>BabyAGI</strong></li>
</ol>
<ul>
<li>核心：简化版 ReAct 框架，专注 <strong>任务生成、优先级排序、执行、复盘</strong>。</li>
<li>特点：轻量、专注任务流管理，常被用于构建个人助理、研究助手。</li>
</ul>
<ol start="4">
<li><strong>LangGraph (LangChain 下一代)</strong></li>
</ol>
<ul>
<li>核心：将 ReAct 升级为 <strong>状态图 (StateGraph)</strong>，支持多智能体协作、循环、条件分支。</li>
<li>应用：构建更复杂的工作流（如代码开发、客户支持、多步骤数据分析）。</li>
</ul>
<ol start="5">
<li><strong>CrewAI</strong></li>
</ol>
<ul>
<li>核心：基于 ReAct，主打 <strong>多智能体协作 (Multi-Agent)</strong>。</li>
<li>特点：为不同 Agent 分配角色（产品经理/程序员/设计师），协同完成项目。</li>
<li>应用：自动软件开发、市场研究报告、内容创作团队。</li>
</ul>
<h3 id="二、知名商业产品-底层采用-react" tabindex="-1"><a class="header-anchor" href="#二、知名商业产品-底层采用-react"><span>二、知名商业产品（底层采用 ReAct）</span></a></h3>
<p>这些面向用户的产品，其 AI 能力内核是 ReAct。</p>
<ol>
<li><strong>ChatGPT with Browse / Code Interpreter (GPT-4o)</strong></li>
</ol>
<ul>
<li>
<p>机制：当你开启 <strong>联网搜索</strong> 或 <strong>代码解释器</strong> 时，GPT-4 内部运行 ReAct 流程：</p>
</li>
<li>
<p>Thought: &quot;需要最新数据，我得搜索。&quot;</p>
</li>
<li>
<p>Action: 调用 Bing Search</p>
</li>
<li>
<p>Observation: 读取搜索结果</p>
</li>
<li>
<p>Thought: &quot;信息足够，可以总结答案。&quot;</p>
</li>
</ul>
<ol start="2">
<li><strong>GitHub Copilot Chat / Cursor (AI 编辑器)</strong></li>
</ol>
<ul>
<li>
<p>机制：理解复杂编程问题（&quot;修复这个Bug并解释原因&quot;），ReAct 循环：</p>
</li>
<li>
<p>思考：分析代码 → 行动：运行测试/查询文档 → 观察：报错信息 → 再思考：定位问题。</p>
</li>
</ul>
<ol start="3">
<li><strong>Perplexity Pro / Claude 3 (联网助手)</strong></li>
</ol>
<ul>
<li>核心：<strong>学术/深度问答</strong> 必用 ReAct。</li>
<li>流程：拆解问题 → 多轮学术搜索 → 精读论文 → 综合推理 → 输出结论。</li>
</ul>
<ol start="4">
<li><strong>Microsoft Copilot (Windows/365)</strong></li>
</ol>
<ul>
<li>
<p>机制：操作电脑/Office 时，执行 ReAct：</p>
</li>
<li>
<p>Thought: &quot;用户要做PPT，需分析文档并生成大纲。&quot;</p>
</li>
<li>
<p>Action: 读取Word → 生成幻灯片 → 检查格式。</p>
</li>
</ul>
<h3 id="三、垂直领域应用-react-典型场景" tabindex="-1"><a class="header-anchor" href="#三、垂直领域应用-react-典型场景"><span>三、垂直领域应用（ReAct 典型场景）</span></a></h3>
<ol>
<li><strong>AI 数据分析</strong></li>
</ol>
<ul>
<li><strong>Tableau GPT, Power BI Copilot</strong>：自然语言提问 → ReAct 生成 SQL/DAX → 查询数据库 → 可视化。</li>
</ul>
<ol start="2">
<li><strong>客户服务/客服机器人</strong></li>
</ol>
<ul>
<li><strong>IBM Watsonx Assistant, 阿里云小蜜</strong>：理解用户问题 → 查询订单/物流系统 → 多轮对话解决。</li>
</ul>
<ol start="3">
<li><strong>研究与情报分析</strong></li>
</ol>
<ul>
<li><strong>Consensus, Elicit</strong>：ReAct 驱动，自动检索、阅读、总结海量学术论文。</li>
</ul>
<ol start="4">
<li><strong>具身智能 (机器人/游戏)</strong></li>
</ol>
<ul>
<li><strong>Google DeepMind RoboCat</strong>：机器人通过 ReAct 思考（&quot;如何抓起杯子&quot;）→ 执行动作 → 视觉反馈 → 调整策略。</li>
</ul>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h3>
<p><strong>ReAct 已成为现代 AI 应用的“操作系统”</strong>。</p>
<ul>
<li><strong>底层框架</strong>：LangChain, LangGraph, AutoGPT, CrewAI</li>
<li><strong>大众产品</strong>：ChatGPT (高级功能), Copilot, Perplexity</li>
<li><strong>企业场景</strong>：数据分析、智能客服、自动化办公、研发助手</li>
</ul>
<p>需要我帮你对比 <strong>LangChain、CrewAI 和 AutoGPT</strong> 的区别，帮你选择适合的 ReAct 框架吗？</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};