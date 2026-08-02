import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%80%E9%98%B6%E6%AE%B5_%E6%8E%8C%E6%8F%A1%E2%80%9C%E5%A4%A7%E8%84%91%E2%80%9D%E7%9A%84%E5%86%B3%E7%AD%96%E6%9C%BA%E5%88%B6_(%E5%9F%BA%E7%A1%80)/Function_Calling_(%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8)/JSON_Schema/JSON_Schema%E4%BD%9C%E7%94%A8%E9%98%B6%E6%AE%B5.html","title":"JSON_Schema作用阶段","lang":"zh-CN","frontmatter":{"title":"JSON_Schema作用阶段","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"在 Agent 开发的完整生命周期中，JSON Schema 并不是只在某一个地方闪现，它更像是一条贯穿始终的“合同”。 它主要作用在 大模型（LLM） 与 你的 Python 逻辑（Executor） 之间的 三次关键交收 阶段。 1. 第一阶段：注册与宣誓 (Registration Phase) 作用点：client.chat.completio...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JSON_Schema作用阶段\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%80%E9%98%B6%E6%AE%B5_%E6%8E%8C%E6%8F%A1%E2%80%9C%E5%A4%A7%E8%84%91%E2%80%9D%E7%9A%84%E5%86%B3%E7%AD%96%E6%9C%BA%E5%88%B6_(%E5%9F%BA%E7%A1%80)/Function_Calling_(%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8)/JSON_Schema/JSON_Schema%E4%BD%9C%E7%94%A8%E9%98%B6%E6%AE%B5.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"JSON_Schema作用阶段"}],["meta",{"property":"og:description","content":"在 Agent 开发的完整生命周期中，JSON Schema 并不是只在某一个地方闪现，它更像是一条贯穿始终的“合同”。 它主要作用在 大模型（LLM） 与 你的 Python 逻辑（Executor） 之间的 三次关键交收 阶段。 1. 第一阶段：注册与宣誓 (Registration Phase) 作用点：client.chat.completio..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.77,"words":830},"filePathRelative":"posts/AI大模型/Agent应用开发/第一阶段_掌握“大脑”的决策机制_(基础)/Function_Calling_(函数调用)/JSON_Schema/JSON_Schema作用阶段.md","excerpt":"<p>在 Agent 开发的完整生命周期中，<strong>JSON Schema</strong> 并不是只在某一个地方闪现，它更像是一条<strong>贯穿始终的“合同”</strong>。</p>\\n<p>它主要作用在 <strong>大模型（LLM）</strong> 与 <strong>你的 Python 逻辑（Executor）</strong> 之间的 <strong>三次关键交收</strong> 阶段。</p>\\n<hr>\\n<h2>1. 第一阶段：注册与宣誓 (Registration Phase)</h2>\\n<p><strong>作用点：</strong><code>client.chat.completions.create(..., tools=tools)</code></p>","autoDesc":true}`),i={name:`JSON_Schema作用阶段.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在 Agent 开发的完整生命周期中，<strong>JSON Schema</strong> 并不是只在某一个地方闪现，它更像是一条<strong>贯穿始终的“合同”</strong>。</p>
<p>它主要作用在 <strong>大模型（LLM）</strong> 与 <strong>你的 Python 逻辑（Executor）</strong> 之间的 <strong>三次关键交收</strong> 阶段。</p>
<hr>
<h2 id="_1-第一阶段-注册与宣誓-registration-phase" tabindex="-1"><a class="header-anchor" href="#_1-第一阶段-注册与宣誓-registration-phase"><span>1. 第一阶段：注册与宣誓 (Registration Phase)</span></a></h2>
<p><strong>作用点：</strong><code v-pre>client.chat.completions.create(..., tools=tools)</code></p>
<p>当你初始化对话，把 <code v-pre>tools</code> 列表发给阿里云百炼时，JSON Schema 第一次起作用。</p>
<ul>
<li><strong>它的任务：</strong> 告诉 AI “大脑”，你现在拥有哪些超能力。</li>
<li><strong>发生了什么：</strong> 大模型接收到这些 Schema 后，会将它们压缩并“理解”存入临时记忆。它现在知道：如果用户提到“内存”，它应该寻找名为 <code v-pre>get_mem_usage</code> 的 Schema。</li>
</ul>
<hr>
<h2 id="_2-第二阶段-决策与生成-reasoning-phase" tabindex="-1"><a class="header-anchor" href="#_2-第二阶段-决策与生成-reasoning-phase"><span>2. 第二阶段：决策与生成 (Reasoning Phase)</span></a></h2>
<p><strong>作用点：</strong> 模型内部推理，并返回 <code v-pre>tool_calls</code>。</p>
<p>这是最神奇的阶段。当 AI 决定要干活时，它会严格按照你给的 Schema <strong>“填表”</strong>。</p>
<ul>
<li><strong>它的任务：</strong> 约束 AI 的输出格式。</li>
<li><strong>发生了什么：</strong> 如果你的 Schema 定义了参数 <code v-pre>lines</code> 必须是 <code v-pre>integer</code>（整数），AI 就绝不会返回 <code v-pre>&quot;100&quot;</code>（字符串），而会返回 <code v-pre>100</code>。</li>
<li><strong>如果不符合：</strong> 如果 AI 生成的 JSON 不符合你的 Schema 规范，百炼的后端（网关层）通常会拦截并报错，或者要求 AI 重新生成。</li>
</ul>
<hr>
<h2 id="_3-第三阶段-解析与分发-dispatching-phase" tabindex="-1"><a class="header-anchor" href="#_3-第三阶段-解析与分发-dispatching-phase"><span>3. 第三阶段：解析与分发 (Dispatching Phase)</span></a></h2>
<p><strong>作用点：</strong> 你的 Python 代码接收到 <code v-pre>response</code> 后。</p>
<p>当你拿到 <code v-pre>response.choices[0].message.tool_calls</code> 时，Schema 成了你代码的**“翻译指南”**。</p>
<ul>
<li><strong>它的任务：</strong> 确保代码能直接运行。</li>
<li><strong>发生了什么：</strong> 因为你定义了 Schema，你就可以放心地写：</li>
</ul>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 因为有 Schema 约束，你确信 args 里一定有 'topic' 这个键</span></span>
<span class="line"><span>args = json.loads(tool_call.function.arguments)</span></span>
<span class="line"><span>execute_query(topic=args['topic'])</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果没有 Schema，你可能需要写几十行 <code v-pre>if...else</code> 来检查 AI 有没有写错参数名。</p>
<hr>
<h2 id="总结-它到底作用在哪里" tabindex="-1"><a class="header-anchor" href="#总结-它到底作用在哪里"><span>总结：它到底作用在哪里？</span></a></h2>
<table>
<thead>
<tr>
<th><strong>阶段</strong></th>
<th><strong>物理位置</strong></th>
<th><strong>核心作用</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>1. 握手阶段</strong></td>
<td>发往云端的 HTTP 请求体中</td>
<td><strong>同步认知</strong>：让 AI 知道工具有什么用。</td>
</tr>
<tr>
<td><strong>2. 推理阶段</strong></td>
<td>大模型的预测计算过程中</td>
<td><strong>格式约束</strong>：强迫 AI 输出符合规范的参数。</td>
</tr>
<tr>
<td><strong>3. 执行阶段</strong></td>
<td>你的本地 Python 业务逻辑中</td>
<td><strong>安全契约</strong>：保证代码能解析 AI 发来的数据。</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="​深度理解-它就像一张-投递单" tabindex="-1"><a class="header-anchor" href="#​深度理解-它就像一张-投递单"><span>​深度理解：它就像一张“投递单”</span></a></h2>
<p>你可以把 <strong>JSON Schema</strong> 想象成快递公司的<strong>电子投递单格式</strong>：</p>
<ol>
<li><strong>寄件前（第一阶段）</strong>：你告诉快递公司，你只接受填了“收件人、地址、电话”的包裹。</li>
<li><strong>填单时（第二阶段）</strong>：寄件人（AI）必须按照格子填，漏填了系统（网关）不让过。</li>
<li><strong>收件时（第三阶段）</strong>：你拿到单子，一眼就能看到地址在哪，不用再去猜这一坨文字里哪里是地址。</li>
</ol>
<hr>
<h2 id="下一步建议" tabindex="-1"><a class="header-anchor" href="#下一步建议"><span>下一步建议</span></a></h2>
<p>既然你已经理解了 JSON Schema 是“合同”，<strong>我们要不要在你现有的代码中，真正写一个 Schema 并发给百炼？</strong></p>
<p>即使你还没写函数体，你也可以先看看：<strong>如果你问 AI 一个相关的问题，它返回的那个</strong> <code v-pre>**tool_calls**</code> <strong>结构到底长什么样。</strong> 这就是进入第二阶段最直观的体验。你要试试吗？</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};