import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%80%E9%98%B6%E6%AE%B5_%E6%8E%8C%E6%8F%A1%E2%80%9C%E5%A4%A7%E8%84%91%E2%80%9D%E7%9A%84%E5%86%B3%E7%AD%96%E6%9C%BA%E5%88%B6_(%E5%9F%BA%E7%A1%80)/Function_Calling_(%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8)/OpenAI%E5%BA%93/OpenAi%E5%BA%93%E7%9A%84%E5%9F%BA%E7%A1%80%E4%BD%BF%E7%94%A8/%E8%B0%83%E7%94%A8%E6%96%B9%E5%BC%8F.html","title":"调用方式","lang":"zh-CN","frontmatter":{"title":"调用方式","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"学习 Function Calling 和 Agent 调用，本质上是学习如何让大模型输出“结构化数据”并与你的 Python 代码逻辑进行“握手”。 以下是目前行业内最常见的三种调用方式，按从底层到高层的顺序排列： 1. 方式一：原生 API 调用 (OpenAI / DashScope 风格) 这是目前最标准、最通用的方式。几乎所有国产模型（Dee...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"调用方式\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%80%E9%98%B6%E6%AE%B5_%E6%8E%8C%E6%8F%A1%E2%80%9C%E5%A4%A7%E8%84%91%E2%80%9D%E7%9A%84%E5%86%B3%E7%AD%96%E6%9C%BA%E5%88%B6_(%E5%9F%BA%E7%A1%80)/Function_Calling_(%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8)/OpenAI%E5%BA%93/OpenAi%E5%BA%93%E7%9A%84%E5%9F%BA%E7%A1%80%E4%BD%BF%E7%94%A8/%E8%B0%83%E7%94%A8%E6%96%B9%E5%BC%8F.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"调用方式"}],["meta",{"property":"og:description","content":"学习 Function Calling 和 Agent 调用，本质上是学习如何让大模型输出“结构化数据”并与你的 Python 代码逻辑进行“握手”。 以下是目前行业内最常见的三种调用方式，按从底层到高层的顺序排列： 1. 方式一：原生 API 调用 (OpenAI / DashScope 风格) 这是目前最标准、最通用的方式。几乎所有国产模型（Dee..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.08,"words":923},"filePathRelative":"posts/AI大模型/Agent应用开发/第一阶段_掌握“大脑”的决策机制_(基础)/Function_Calling_(函数调用)/OpenAI库/OpenAi库的基础使用/调用方式.md","excerpt":"<p>学习 <strong>Function Calling</strong> 和 <strong>Agent 调用</strong>，本质上是学习如何让大模型输出“结构化数据”并与你的 Python 代码逻辑进行“握手”。</p>\\n<p>以下是目前行业内最常见的三种调用方式，按<strong>从底层到高层</strong>的顺序排列：</p>\\n<hr>\\n<h2>1. 方式一：原生 API 调用 (OpenAI / DashScope 风格)</h2>\\n<p>这是目前最标准、最通用的方式。几乎所有国产模型（DeepSeek, Qwen, GLM）都兼容这一套接口。</p>\\n<ul>\\n<li><strong>核心逻辑：</strong> 在请求时传入一个 <code>tools</code> 列表，模型如果认为需要调用工具，会返回一个 <code>tool_calls</code> 字段，其中包含函数名和 JSON 格式的参数。</li>\\n<li><strong>优点：</strong> 性能最高，没有任何中间商赚差价，最适合理解底层原理。</li>\\n<li><strong>适用场景：</strong> 你正在做的分布式日志分析平台的后端核心引擎。</li>\\n</ul>","autoDesc":true}`),i={name:`调用方式.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>学习 <strong>Function Calling</strong> 和 <strong>Agent 调用</strong>，本质上是学习如何让大模型输出“结构化数据”并与你的 Python 代码逻辑进行“握手”。</p>
<p>以下是目前行业内最常见的三种调用方式，按<strong>从底层到高层</strong>的顺序排列：</p>
<hr>
<h2 id="_1-方式一-原生-api-调用-openai-dashscope-风格" tabindex="-1"><a class="header-anchor" href="#_1-方式一-原生-api-调用-openai-dashscope-风格"><span>1. 方式一：原生 API 调用 (OpenAI / DashScope 风格)</span></a></h2>
<p>这是目前最标准、最通用的方式。几乎所有国产模型（DeepSeek, Qwen, GLM）都兼容这一套接口。</p>
<ul>
<li><strong>核心逻辑：</strong> 在请求时传入一个 <code v-pre>tools</code> 列表，模型如果认为需要调用工具，会返回一个 <code v-pre>tool_calls</code> 字段，其中包含函数名和 JSON 格式的参数。</li>
<li><strong>优点：</strong> 性能最高，没有任何中间商赚差价，最适合理解底层原理。</li>
<li><strong>适用场景：</strong> 你正在做的分布式日志分析平台的后端核心引擎。</li>
</ul>
<hr>
<h2 id="_2-方式二-react-prompting-手动解析模式" tabindex="-1"><a class="header-anchor" href="#_2-方式二-react-prompting-手动解析模式"><span>2. 方式二：ReAct Prompting (手动解析模式)</span></a></h2>
<p>如果某些开源模型不支持官方的 Function Calling 接口，开发者会使用这种“纯文本引导”的方式。</p>
<ul>
<li><strong>核心逻辑：</strong> 在 Prompt 中强制规定格式。</li>
</ul>
<p><strong>Prompt:</strong> &quot;如果你需要查日志，请输出：Action: query_log(service='xxx')。我会把结果告诉你。&quot;</p>
<ul>
<li><strong>优点：</strong> 兼容性极强，任何能聊天的模型都能用。</li>
<li><strong>缺点：</strong> 极其不稳定。AI 可能会写错括号、少个引号，导致你的 Python <code v-pre>json.loads()</code> 报错。</li>
<li><strong>适用场景：</strong> 使用一些小型、未经过函数调用微调的本地模型（如 Llama-3-8B 的基础版）。</li>
</ul>
<hr>
<h2 id="_3-方式三-框架集成调用-langchain-smolagents" tabindex="-1"><a class="header-anchor" href="#_3-方式三-框架集成调用-langchain-smolagents"><span>3. 方式三：框架集成调用 (LangChain / Smolagents)</span></a></h2>
<p>这是工程化开发最常用的方式，也是你后续进阶的方向。</p>
<ul>
<li><strong>核心逻辑：</strong> 框架通过 <strong>Python 装饰器 (</strong><code v-pre>**@tool**</code><strong>)</strong> 自动帮你完成 JSON Schema 的转换。</li>
<li><strong>代码示例 (以 HuggingFace 的 smolagents 为例)：</strong></li>
</ul>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>from smolagents import CodeAgent, DuckDuckGoSearchTool, HfApiModel</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 只要给函数加个描述，框架自动处理所有的 Function Calling 细节</span></span>
<span class="line"><span>@tool</span></span>
<span class="line"><span>def fetch_kafka_status(topic: str) -> str:</span></span>
<span class="line"><span>    """查询指定 Kafka Topic 的积压情况"""</span></span>
<span class="line"><span>    return f"Topic {topic} 运行正常，积压 0"</span></span>
<span class="line"><span></span></span>
<span class="line"><span>agent = CodeAgent(tools=[fetch_kafka_status], model=HfApiModel())</span></span>
<span class="line"><span>agent.run("帮我看看订单 Topic 的情况")</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>优点：</strong> 开发效率极高，代码非常整洁。</li>
<li><strong>适用场景：</strong> 快速搭建原型，或者构建复杂的多智能体系统。</li>
</ul>
<hr>
<h2 id="具体怎么学-实战建议" tabindex="-1"><a class="header-anchor" href="#具体怎么学-实战建议"><span>具体怎么学？（实战建议）</span></a></h2>
<p>既然你已经到了这个阶段，我建议你按照以下路径<strong>刻意练习</strong>：</p>
<h2 id="第一步-玩转-json-schema" tabindex="-1"><a class="header-anchor" href="#第一步-玩转-json-schema"><span>第一步：玩转 JSON Schema</span></a></h2>
<p>Function Calling 的前提是你得会定义工具。去搜一下 <strong>JSON Schema</strong> 的基本语法。你需要知道如何定义：</p>
<ul>
<li>必填参数 (<code v-pre>required</code>)</li>
<li>参数类型 (<code v-pre>type: string/number/array</code>)</li>
<li>参数描述 (<code v-pre>description</code>)：<strong>这是给 AI 看的说明书，写得越好，AI 调用越准。</strong></li>
</ul>
<h2 id="第二步-处理-多轮对话-逻辑" tabindex="-1"><a class="header-anchor" href="#第二步-处理-多轮对话-逻辑"><span>第二步：处理“多轮对话”逻辑</span></a></h2>
<p>Agent 调用不是一锤子买卖。你需要练习如何把工具的结果（Observation）拼回 <code v-pre>messages</code> 列表里再次发给 AI。</p>
<ul>
<li>练习：让 AI 先查 A 服务的日志，根据 A 的结果再去查 B 服务的监控。</li>
</ul>
<h2 id="第三步-异常处理-exception-handling" tabindex="-1"><a class="header-anchor" href="#第三步-异常处理-exception-handling"><span>第三步：异常处理 (Exception Handling)</span></a></h2>
<p>这是运维 Agent 的核心。</p>
<ul>
<li>如果 AI 调用的函数报错了怎么办？</li>
<li>你需要把错误信息也作为 <code v-pre>Observation</code> 丢给 AI，厉害的 AI（如 GPT-4 或 Qwen-Max）会根据报错信息<strong>自动修正参数并重试</strong>。</li>
</ul>
<hr>
<h2 id="下一个行动点" tabindex="-1"><a class="header-anchor" href="#下一个行动点"><span>下一个行动点：</span></a></h2>
<p>为了让你更有成就感，<strong>你想让我给你写一个可以直接复制运行的、基于原生 API 调用的“模拟运维 Agent”脚本吗？</strong></p>
<p>它会包含：</p>
<ol>
<li>一个模拟的 <code v-pre>get_server_info</code> 工具。</li>
<li>完整的 <code v-pre>while</code> 循环处理逻辑。</li>
<li>如何处理 AI 的 <code v-pre>tool_calls</code>。</li>
</ol>
<p><strong>只要你有 API Key，填进去就能跑。要试试吗？</strong></p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};