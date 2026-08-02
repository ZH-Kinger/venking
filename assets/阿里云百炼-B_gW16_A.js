import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E9%98%BF%E9%87%8C%E4%BA%91%E7%99%BE%E7%82%BC.html","title":"阿里云百炼","lang":"zh-CN","frontmatter":{"title":"阿里云百炼","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"是的，阿里云的 Agent 应用（智能体）完全支持 Function Calling（函数调用/工具调用），并且提供了可视化低代码、Assistant API、AgentRun/Flow Agent 等多种实现方式，是构建企业级 ReAct 智能体的核心能力。 一、阿里云支持 Function Calling 的核心产品 百炼 Model Studio...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"阿里云百炼\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E9%98%BF%E9%87%8C%E4%BA%91%E7%99%BE%E7%82%BC.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"阿里云百炼"}],["meta",{"property":"og:description","content":"是的，阿里云的 Agent 应用（智能体）完全支持 Function Calling（函数调用/工具调用），并且提供了可视化低代码、Assistant API、AgentRun/Flow Agent 等多种实现方式，是构建企业级 ReAct 智能体的核心能力。 一、阿里云支持 Function Calling 的核心产品 百炼 Model Studio..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.91,"words":874},"filePathRelative":"posts/AI大模型/Agent应用开发/阿里云百炼.md","excerpt":"<p><strong>是的，阿里云的 Agent 应用（智能体）完全支持 Function Calling（函数调用/工具调用）</strong>，并且提供了<strong>可视化低代码</strong>、<strong>Assistant API</strong>、<strong>AgentRun/Flow Agent</strong> 等多种实现方式，是构建企业级 ReAct 智能体的核心能力。</p>\\n<h3>一、阿里云支持 Function Calling 的核心产品</h3>\\n<ol>\\n<li><strong>百炼 Model Studio（Assistant API）</strong></li>\\n</ol>","autoDesc":true}`),i={name:`阿里云百炼.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p><strong>是的，阿里云的 Agent 应用（智能体）完全支持 Function Calling（函数调用/工具调用）</strong>，并且提供了<strong>可视化低代码</strong>、<strong>Assistant API</strong>、<strong>AgentRun/Flow Agent</strong> 等多种实现方式，是构建企业级 ReAct 智能体的核心能力。</p>
<h3 id="一、阿里云支持-function-calling-的核心产品" tabindex="-1"><a class="header-anchor" href="#一、阿里云支持-function-calling-的核心产品"><span>一、阿里云支持 Function Calling 的核心产品</span></a></h3>
<ol>
<li><strong>百炼 Model Studio（Assistant API）</strong></li>
</ol>
<ul>
<li>官方原生支持 <strong>Function Calling</strong>，直接对接通义千问（Qwen）系列模型。</li>
<li>可创建<strong>智能体应用（Agent App）</strong>，可视化绑定自定义函数/工具。</li>
</ul>
<ol start="2">
<li><strong>AgentRun / Flow Agent（函数计算 FC）</strong></li>
</ol>
<ul>
<li>低代码流程画布，支持<strong>拖拽式工具编排</strong>、MCP 服务、自定义函数、API 工具。</li>
<li>内置 <strong>Function Calling Agent</strong>，可自动触发工具调用。</li>
</ul>
<ol start="3">
<li><strong>DashScope SDK（通义千问 API）</strong></li>
</ol>
<ul>
<li>代码级 Function Calling，Python/Java 支持，与 OpenAI 格式兼容。</li>
</ul>
<h3 id="二、三种使用方式-从低代码到代码" tabindex="-1"><a class="header-anchor" href="#二、三种使用方式-从低代码到代码"><span>二、三种使用方式（从低代码到代码）</span></a></h3>
<h4 id="方式1-百炼可视化-agent-无代码-低代码" tabindex="-1"><a class="header-anchor" href="#方式1-百炼可视化-agent-无代码-低代码"><span>方式1：百炼可视化 Agent（无代码/低代码）</span></a></h4>
<ol>
<li>进入 <strong>阿里云百炼 → 应用管理 → 新增应用 → 智能体</strong>。</li>
<li>选择模型（如 qwen-max、qwen-3）。</li>
<li><strong>添加工具 → 自定义函数</strong>：</li>
</ol>
<ul>
<li>填写名称、描述</li>
<li>定义 <strong>JSON Schema 参数</strong>（同 OpenAI）</li>
<li>绑定执行端点（HTTP API / 云函数）</li>
</ul>
<ol start="4">
<li>编写系统提示词（ReAct 逻辑）：</li>
</ol>
<blockquote>
<p>&quot;你是智能助手，需要时自动调用工具：查订单、查天气、计算。&quot;</p>
</blockquote>
<ol start="5">
<li><strong>测试 → 发布 → 获取 API/Widget</strong>。</li>
</ol>
<h4 id="方式2-百炼-assistant-api-代码示例" tabindex="-1"><a class="header-anchor" href="#方式2-百炼-assistant-api-代码示例"><span>方式2：百炼 Assistant API（代码示例）</span></a></h4>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> dashscope </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> Assistant</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> json</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 1. 定义函数（工具）</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">def</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> get_weather</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic">city</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> str</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) -> </span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">str</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    return</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> f</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">{</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">city</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">：晴，22°C"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 2. 工具描述（JSON Schema）</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">tools </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    {</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">        "type"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"function"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">        "function"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: {</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">            "name"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"get_weather"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">            "description"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"获取城市天气"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">            "parameters"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: {</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">                "type"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"object"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">                "properties"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: {</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">                    "city"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: {</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"type"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"string"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">                    "description"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"城市名"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">                },</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">                "required"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: [</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"city"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">            }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 3. 创建智能体</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">assistant </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> Assistant.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">create</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">    name</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"天气助手"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">    model</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"qwen-max"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">    tools</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">tools,</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">    instructions</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"你是天气助手，自动调用天气工具"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 4. 对话（自动 Function Calling）</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">response </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> Assistant.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">chat</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">    assistant_id</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">assistant.id,</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">    query</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"长沙天气怎么样？"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(response.output.text)</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 输出：长沙：晴，22°C</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="方式3-agentrun-flow-流程画布" tabindex="-1"><a class="header-anchor" href="#方式3-agentrun-flow-流程画布"><span>方式3：AgentRun Flow（流程画布）</span></a></h4>
<ol>
<li><strong>函数计算 FC → AgentRun → 创建 Flow Agent</strong>。</li>
<li>画布中添加：</li>
</ol>
<ul>
<li><strong>LLM 节点</strong>（通义千问）</li>
<li><strong>MCP/函数节点</strong>（绑定自定义工具/API）</li>
</ul>
<ol start="3">
<li>连线：用户输入 → LLM 判断 → 自动调用工具 → 结果返回。</li>
<li>支持<strong>分支、循环、多工具嵌套调用</strong>。</li>
</ol>
<h3 id="三、核心能力与特点" tabindex="-1"><a class="header-anchor" href="#三、核心能力与特点"><span>三、核心能力与特点</span></a></h3>
<ul>
<li>
<p><strong>兼容 OpenAI 格式</strong>：tools/function 定义完全一致，易迁移。</p>
</li>
<li>
<p><strong>工具类型丰富</strong>：</p>
</li>
<li>
<p>自定义函数 / Python 代码</p>
</li>
<li>
<p>HTTP API（OpenAPI 规范）</p>
</li>
<li>
<p>MCP 服务（阿里云工具市场：高德、飞书、数据库等）</p>
</li>
<li>
<p>云函数（FC）、数据库查询、文件操作</p>
</li>
<li>
<p><strong>ReAct 原生支持</strong>：模型自动做 <strong>Thought → Action → Observation</strong>。</p>
</li>
<li>
<p><strong>企业级</strong>：权限、日志、监控、灰度、多轮记忆。</p>
</li>
</ul>
<h3 id="四、与-vertex-ai-openai-对比" tabindex="-1"><a class="header-anchor" href="#四、与-vertex-ai-openai-对比"><span>四、与 Vertex AI / OpenAI 对比</span></a></h3>
<ul>
<li><strong>阿里云</strong>：<strong>国内合规、低代码强、MCP 生态完善、通义模型</strong>。</li>
<li><strong>Vertex AI</strong>：Google 生态、Gemini、多智能体、全球部署。</li>
<li><strong>OpenAI</strong>：标准定义、生态最广、适合跨云。</li>
</ul>
<h3 id="五、典型场景" tabindex="-1"><a class="header-anchor" href="#五、典型场景"><span>五、典型场景</span></a></h3>
<ul>
<li>客服：RAG 知识库 + <strong>查订单/物流/退款</strong> Function Calling。</li>
<li>数据分析：<strong>BigQuery/MySQL 查询 + 可视化 + 报表生成</strong>。</li>
<li>自动化：<strong>审批、发邮件、发短信、API 触发</strong>。</li>
</ul>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h3>
<p><strong>阿里云 Agent 应用对 Function Calling 的支持非常成熟</strong>：</p>
<ul>
<li><strong>非开发者</strong>：用 <strong>百炼可视化 / AgentRun Flow</strong> 低代码实现。</li>
<li><strong>开发者</strong>：用 <strong>Assistant API / DashScope SDK</strong> 代码级控制。</li>
<li>完全满足 <strong>ReAct 智能体</strong> 的“思考+行动”闭环需求。</li>
</ul>
<p>要不要我给你一份可直接运行的 <strong>阿里云 Function Calling 完整代码模板</strong>（含天气+订单查询双工具）？</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};