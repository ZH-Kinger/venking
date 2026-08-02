import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%80%E9%98%B6%E6%AE%B5_%E6%8E%8C%E6%8F%A1%E2%80%9C%E5%A4%A7%E8%84%91%E2%80%9D%E7%9A%84%E5%86%B3%E7%AD%96%E6%9C%BA%E5%88%B6_(%E5%9F%BA%E7%A1%80)/Function_Calling_(%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8).html","title":"Function_Calling_(函数调用)","lang":"zh-CN","frontmatter":{"title":"Function_Calling_(函数调用)","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"Function Calling（函数调用）是什么？ image.pngimage.png Function Calling（函数调用）是大语言模型（LLM）的核心能力，指让模型根据用户需求，主动选择并调用预设的外部函数 / 工具（如 API、数据库查询、计算器、搜索引擎），再将函数返回的结果整合为自然语言答案的技术。 简单来说：它解决了 LLM “只...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Function_Calling_(函数调用)\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/Function_Calling_(%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%80%E9%98%B6%E6%AE%B5_%E6%8E%8C%E6%8F%A1%E2%80%9C%E5%A4%A7%E8%84%91%E2%80%9D%E7%9A%84%E5%86%B3%E7%AD%96%E6%9C%BA%E5%88%B6_(%E5%9F%BA%E7%A1%80)/Function_Calling_(%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8).html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"Function_Calling_(函数调用)"}],["meta",{"property":"og:description","content":"Function Calling（函数调用）是什么？ image.pngimage.png Function Calling（函数调用）是大语言模型（LLM）的核心能力，指让模型根据用户需求，主动选择并调用预设的外部函数 / 工具（如 API、数据库查询、计算器、搜索引擎），再将函数返回的结果整合为自然语言答案的技术。 简单来说：它解决了 LLM “只..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/Function_Calling_(%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":1.58,"words":475},"filePathRelative":"posts/AI大模型/Agent应用开发/第一阶段_掌握“大脑”的决策机制_(基础)/Function_Calling_(函数调用).md","excerpt":"<h3>Function Calling（函数调用）是什么？</h3>\\n<figure><img src=\\"/blog/assets/posts/Function_Calling_(%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8)-1.png\\" alt=\\"image.png\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>image.png</figcaption></figure>\\n<p>Function Calling（函数调用）是大语言模型（LLM）的核心能力，指<strong>让模型根据用户需求，主动选择并调用预设的外部函数 / 工具（如 API、数据库查询、计算器、搜索引擎）</strong>，再将函数返回的结果整合为自然语言答案的技术。</p>","autoDesc":true}`),i={name:`Function_Calling_(函数调用).md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><h3 id="function-calling-函数调用-是什么" tabindex="-1"><a class="header-anchor" href="#function-calling-函数调用-是什么"><span>Function Calling（函数调用）是什么？</span></a></h3>
<figure><img src="/blog/assets/posts/Function_Calling_(%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8)-1.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<p>Function Calling（函数调用）是大语言模型（LLM）的核心能力，指<strong>让模型根据用户需求，主动选择并调用预设的外部函数 / 工具（如 API、数据库查询、计算器、搜索引擎）</strong>，再将函数返回的结果整合为自然语言答案的技术。</p>
<p>简单来说：它解决了 LLM “只懂思考，不会做事” 的问题 —— 模型不再只输出文本，还能像程序员一样 “调用工具函数” 获取精准数据，是 ReAct 框架中 <strong>Action（行动）环节的核心实现方式</strong>。</p>
<h4 id="核心价值" tabindex="-1"><a class="header-anchor" href="#核心价值"><span>核心价值</span></a></h4>
<ol>
<li>突破 LLM 自身局限：解决知识过期（如查 2026 年数据）、计算能力弱（如复杂数学题）、无法交互外部系统（如查订单、控硬件）的问题；</li>
<li>输出更精准：基于真实工具返回的结果回答，大幅减少 “幻觉”；</li>
<li>可落地：让 LLM 从 “聊天机器人” 变成 “能执行任务的智能体”（如自动订机票、查报表）。</li>
</ol>
<p>​</p>
<h2 id="调用流程" tabindex="-1"><a class="header-anchor" href="#调用流程"><span>调用流程</span></a></h2>
<table>
<thead>
<tr>
<th><strong>步骤</strong></th>
<th><strong>动作主体</strong></th>
<th><strong>发生的事情</strong></th>
<th><strong>数据内容示例</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Step 1</strong></td>
<td><strong>你 (代码)</strong></td>
<td>发送用户问题 + <strong>工具定义 (Tools)</strong> 给 AI。</td>
<td>&quot;帮我查订单服务日志&quot; + <code v-pre>get_log</code>&lt;br&gt;函数定义</td>
</tr>
<tr>
<td><strong>Step 2</strong></td>
<td><strong>AI (大脑)</strong></td>
<td>判断是否需要工具。如果是，返回 <strong>调用请求</strong>。</td>
<td><code v-pre>tool_calls: { name: &quot;get_log&quot;, args: { &quot;service&quot;: &quot;order&quot; } }</code></td>
</tr>
<tr>
<td><strong>Step 3</strong></td>
<td><strong>你 (代码)</strong></td>
<td>解析 AI 的请求，在本地 <strong>运行真实函数</strong>。</td>
<td>运行 <code v-pre>os.popen</code>&lt;br&gt;或数据库查询，得到 &quot;Error 500&quot;</td>
</tr>
<tr>
<td><strong>Step 4</strong></td>
<td><strong>你 (代码)</strong></td>
<td>将 <strong>函数执行结果</strong> 再次发送给 AI。</td>
<td><code v-pre>role: &quot;tool&quot;</code>&lt;br&gt;, <code v-pre>content: &quot;Error 500&quot;</code></td>
</tr>
<tr>
<td><strong>Step 5</strong></td>
<td><strong>AI (大脑)</strong></td>
<td>结合结果，给出 <strong>最终自然语言回答</strong>。</td>
<td>&quot;订单服务报了 500 错误，可能是数据库连接断了。&quot;</td>
</tr>
</tbody>
</table>
<p>​</p>
<p>​</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};