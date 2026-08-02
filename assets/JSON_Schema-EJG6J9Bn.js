import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%80%E9%98%B6%E6%AE%B5_%E6%8E%8C%E6%8F%A1%E2%80%9C%E5%A4%A7%E8%84%91%E2%80%9D%E7%9A%84%E5%86%B3%E7%AD%96%E6%9C%BA%E5%88%B6_(%E5%9F%BA%E7%A1%80)/Function_Calling_(%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8)/JSON_Schema.html","title":"JSON_Schema","lang":"zh-CN","frontmatter":{"title":"JSON_Schema","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"JSON Schema是什么? 学习 Agent 开发（尤其是 Function Calling）的过程中，JSON Schema 就是你给 AI 写的“函数操作说明书”。 简单来说，JSON Schema 是一种元数据，它是用来“描述数据的数据”。它的作用是告诉 AI：这个函数叫什么、需要什么参数、参数必须是什么类型。 1. 为什么 Agent 开发...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JSON_Schema\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%80%E9%98%B6%E6%AE%B5_%E6%8E%8C%E6%8F%A1%E2%80%9C%E5%A4%A7%E8%84%91%E2%80%9D%E7%9A%84%E5%86%B3%E7%AD%96%E6%9C%BA%E5%88%B6_(%E5%9F%BA%E7%A1%80)/Function_Calling_(%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8)/JSON_Schema.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"JSON_Schema"}],["meta",{"property":"og:description","content":"JSON Schema是什么? 学习 Agent 开发（尤其是 Function Calling）的过程中，JSON Schema 就是你给 AI 写的“函数操作说明书”。 简单来说，JSON Schema 是一种元数据，它是用来“描述数据的数据”。它的作用是告诉 AI：这个函数叫什么、需要什么参数、参数必须是什么类型。 1. 为什么 Agent 开发..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.66,"words":797},"filePathRelative":"posts/AI大模型/Agent应用开发/第一阶段_掌握“大脑”的决策机制_(基础)/Function_Calling_(函数调用)/JSON_Schema.md","excerpt":"<h2>JSON Schema是什么?</h2>\\n<p>学习 <strong>Agent 开发</strong>（尤其是 <strong>Function Calling</strong>）的过程中，<strong>JSON Schema</strong> 就是你给 AI 写的“函数操作说明书”。</p>\\n<p>简单来说，JSON Schema 是一种<strong>元数据</strong>，它是用来“描述数据的数据”。它的作用是告诉 AI：这个函数叫什么、需要什么参数、参数必须是什么类型。</p>\\n<hr>\\n<h2>1. 为什么 Agent 开发必须用它？</h2>\\n<p>大模型（如 Qwen 或 GPT-4）虽然聪明，但它不知道你本地 Python 函数的具体要求。</p>","autoDesc":true}`),i={name:`JSON_Schema.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><h2 id="json-schema是什么" tabindex="-1"><a class="header-anchor" href="#json-schema是什么"><span>JSON Schema是什么?</span></a></h2>
<p>学习 <strong>Agent 开发</strong>（尤其是 <strong>Function Calling</strong>）的过程中，<strong>JSON Schema</strong> 就是你给 AI 写的“函数操作说明书”。</p>
<p>简单来说，JSON Schema 是一种<strong>元数据</strong>，它是用来“描述数据的数据”。它的作用是告诉 AI：这个函数叫什么、需要什么参数、参数必须是什么类型。</p>
<hr>
<h2 id="_1-为什么-agent-开发必须用它" tabindex="-1"><a class="header-anchor" href="#_1-为什么-agent-开发必须用它"><span>1. 为什么 Agent 开发必须用它？</span></a></h2>
<p>大模型（如 Qwen 或 GPT-4）虽然聪明，但它不知道你本地 Python 函数的具体要求。</p>
<ul>
<li><strong>没有 Schema</strong>：AI 可能会乱猜参数名（比如把 <code v-pre>user_id</code> 猜成 <code v-pre>uid</code>）。</li>
<li><strong>有了 Schema</strong>：AI 会严格按照你定义的“模版”生成 JSON，你的代码才能直接解析并运行。</li>
</ul>
<hr>
<h2 id="_2-json-schema-的标准格式" tabindex="-1"><a class="header-anchor" href="#_2-json-schema-的标准格式"><span>2. JSON Schema 的标准格式</span></a></h2>
<p>一个标准的 Function Calling Schema 通常包含四个核心部分：<code v-pre>name</code> (函数名), <code v-pre>description</code> (功能描述), <code v-pre>parameters</code> (参数详情)。</p>
<h2 id="基础模版结构" tabindex="-1"><a class="header-anchor" href="#基础模版结构"><span>基础模版结构：</span></a></h2>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>{</span></span>
<span class="line"><span>  "name": "get_weather",                // 函数名（必须与 Python 函数名一致）</span></span>
<span class="line"><span>  "description": "获取指定城市的实时天气", // 告诉 AI 什么时候该调用这个工具</span></span>
<span class="line"><span>  "parameters": {                       // 参数定义开始</span></span>
<span class="line"><span>    "type": "object",                   // 参数总是一个对象（字典）</span></span>
<span class="line"><span>    "properties": {                     // 具体有哪些参数</span></span>
<span class="line"><span>      "city": {</span></span>
<span class="line"><span>        "type": "string",               // 类型：字符串</span></span>
<span class="line"><span>        "description": "城市名称，如：北京"</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      "unit": {</span></span>
<span class="line"><span>        "type": "string",</span></span>
<span class="line"><span>        "enum": ["celsius", "fahrenheit"], // 枚举：只能选这两个</span></span>
<span class="line"><span>        "default": "celsius"            // 默认值</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    "required": ["city"]                // 哪些参数是必填的</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="_3-核心字段详解" tabindex="-1"><a class="header-anchor" href="#_3-核心字段详解"><span>3. 核心字段详解</span></a></h2>
<table>
<thead>
<tr>
<th><strong>字段</strong></th>
<th><strong>作用</strong></th>
<th><strong>Agent 调优建议</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>type</code></td>
<td>定义数据类型</td>
<td>常用：<code v-pre>string</code>&lt;br&gt;, <code v-pre>number</code>&lt;br&gt;, <code v-pre>integer</code>&lt;br&gt;, <code v-pre>boolean</code>&lt;br&gt;, <code v-pre>array</code>&lt;br&gt;, <code v-pre>object</code>&lt;br&gt;。</td>
</tr>
<tr>
<td><code v-pre>description</code></td>
<td><strong>最重要的地方</strong></td>
<td>这是写给 AI 看的。描述得越详细，AI 触发工具的准确率就越高。</td>
</tr>
<tr>
<td><code v-pre>enum</code></td>
<td>限制取值范围</td>
<td>如果参数只能是 <code v-pre>high/medium/low</code>&lt;br&gt;，一定要写死，防止 AI 乱填。</td>
</tr>
<tr>
<td><code v-pre>required</code></td>
<td>强制约束</td>
<td>如果某些参数缺失会导致 Python 报错，务必放在这个列表里。</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="_4-实战例子-你的-aiops-日志分析工具" tabindex="-1"><a class="header-anchor" href="#_4-实战例子-你的-aiops-日志分析工具"><span>4. 实战例子：你的 AIOps 日志分析工具</span></a></h2>
<p>假设你要写一个查询 Kafka 日志的工具，它的 Schema 应该长这样：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 在 OpenAI SDK 调用中，它是放在 tools 列表里的</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    "type": "function",</span></span>
<span class="line"><span>    "function": {</span></span>
<span class="line"><span>        "name": "query_kafka_logs",</span></span>
<span class="line"><span>        "description": "从 Kafka 集群中检索特定 Topic 的错误日志。",</span></span>
<span class="line"><span>        "parameters": {</span></span>
<span class="line"><span>            "type": "object",</span></span>
<span class="line"><span>            "properties": {</span></span>
<span class="line"><span>                "topic_name": {</span></span>
<span class="line"><span>                    "type": "string",</span></span>
<span class="line"><span>                    "description": "需要查询的 Kafka Topic 名称，如 'order-service'"</span></span>
<span class="line"><span>                },</span></span>
<span class="line"><span>                "lines": {</span></span>
<span class="line"><span>                    "type": "integer",</span></span>
<span class="line"><span>                    "description": "需要读取的日志行数，默认 100",</span></span>
<span class="line"><span>                    "default": 100</span></span>
<span class="line"><span>                },</span></span>
<span class="line"><span>                "log_level": {</span></span>
<span class="line"><span>                    "type": "string",</span></span>
<span class="line"><span>                    "enum": ["ERROR", "WARN", "INFO"],</span></span>
<span class="line"><span>                    "description": "日志级别过滤"</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>            "required": ["topic_name", "log_level"]</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="_5-如何在第一阶段练习" tabindex="-1"><a class="header-anchor" href="#_5-如何在第一阶段练习"><span>5. 如何在第一阶段练习？</span></a></h2>
<p>你不需要手动写这些复杂的 JSON。在 Python 中，你可以先定义好函数，然后用一些小技巧生成：</p>
<ol>
<li><strong>手动练习</strong>：先试着把你之前想写的 <code v-pre>get_cpu_usage</code> 函数写成这种 JSON 格式。</li>
<li><strong>Pydantic 生成</strong>（进阶）：以后你可以用 Pydantic 库直接把 Python 类转成 JSON Schema。</li>
</ol>
<p><strong>总结：</strong></p>
<p>JSON Schema 是 <strong>Agent 的合同</strong>。你写得越严谨，AI 办事就越靠谱。</p>
<p><strong>既然你理解了格式，我们要不要试着为你那个“分布式日志分析平台”里的一个核心功能（比如重启某个 Service）写一个 JSON Schema？</strong> 这样你就能看到 AI 是如何生成“重启指令”的了。你要试试吗？</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};