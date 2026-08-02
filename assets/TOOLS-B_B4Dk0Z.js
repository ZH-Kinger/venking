import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%80%E9%98%B6%E6%AE%B5_%E6%8E%8C%E6%8F%A1%E2%80%9C%E5%A4%A7%E8%84%91%E2%80%9D%E7%9A%84%E5%86%B3%E7%AD%96%E6%9C%BA%E5%88%B6_(%E5%9F%BA%E7%A1%80)/Function_Calling_(%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8)/JSON_Schema/TOOLS.html","title":"TOOLS","lang":"zh-CN","frontmatter":{"title":"TOOLS","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"​在代码里定义的那个 **tools** 列表，确实不是真正的工具，它只是一份“菜单”或“协议”。 为了让你彻底转过这个弯来，我们可以把 Agent 的工作流程拆解为 “大脑决策” 和 “身体执行” 两个阶段。 1. tools 参数：大脑的“虚构记忆” 当你把 tools 传给大模型（LLM）时，你只是在告诉它： “嘿，如果你发现你需要查 CPU 占...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"TOOLS\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%80%E9%98%B6%E6%AE%B5_%E6%8E%8C%E6%8F%A1%E2%80%9C%E5%A4%A7%E8%84%91%E2%80%9D%E7%9A%84%E5%86%B3%E7%AD%96%E6%9C%BA%E5%88%B6_(%E5%9F%BA%E7%A1%80)/Function_Calling_(%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8)/JSON_Schema/TOOLS.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"TOOLS"}],["meta",{"property":"og:description","content":"​在代码里定义的那个 **tools** 列表，确实不是真正的工具，它只是一份“菜单”或“协议”。 为了让你彻底转过这个弯来，我们可以把 Agent 的工作流程拆解为 “大脑决策” 和 “身体执行” 两个阶段。 1. tools 参数：大脑的“虚构记忆” 当你把 tools 传给大模型（LLM）时，你只是在告诉它： “嘿，如果你发现你需要查 CPU 占..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.48,"words":744},"filePathRelative":"posts/AI大模型/Agent应用开发/第一阶段_掌握“大脑”的决策机制_(基础)/Function_Calling_(函数调用)/JSON_Schema/TOOLS.md","excerpt":"<p>​<strong>在代码里定义的那个</strong> <code>**tools**</code> <strong>列表，确实不是真正的工具，它只是一份“菜单”或“协议”。</strong></p>\\n<p>为了让你彻底转过这个弯来，我们可以把 Agent 的工作流程拆解为 <strong>“大脑决策”</strong> 和 <strong>“身体执行”</strong> 两个阶段。</p>\\n<hr>\\n<h2>1. <code>tools</code> 参数：大脑的“虚构记忆”</h2>\\n<p>当你把 <code>tools</code> 传给大模型（LLM）时，你只是在告诉它：</p>","autoDesc":true}`),i={name:`TOOLS.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>​<strong>在代码里定义的那个</strong> <code v-pre>**tools**</code> <strong>列表，确实不是真正的工具，它只是一份“菜单”或“协议”。</strong></p>
<p>为了让你彻底转过这个弯来，我们可以把 Agent 的工作流程拆解为 <strong>“大脑决策”</strong> 和 <strong>“身体执行”</strong> 两个阶段。</p>
<hr>
<h2 id="_1-tools-参数-大脑的-虚构记忆" tabindex="-1"><a class="header-anchor" href="#_1-tools-参数-大脑的-虚构记忆"><span>1. <code v-pre>tools</code> 参数：大脑的“虚构记忆”</span></a></h2>
<p>当你把 <code v-pre>tools</code> 传给大模型（LLM）时，你只是在告诉它：</p>
<p>“嘿，如果你发现你需要查 CPU 占用率，你可以假装写下一行指令，名字叫 <code v-pre>get_cpu_usage</code>。我会看着办的。”</p>
<p>这时候，<strong>大模型并没有真的去碰你的电脑</strong>。它只是在它的回复里，按照你给的 <strong>JSON Schema</strong> 格式，写下了一串文本。</p>
<hr>
<h2 id="_2-真正的工具-你本地的-python-函数" tabindex="-1"><a class="header-anchor" href="#_2-真正的工具-你本地的-python-函数"><span>2. 真正的工具：你本地的 Python 函数</span></a></h2>
<p>真正的“工具”是你自己在本地写的那个 <code v-pre>def get_cpu_usage(): ...</code> 函数。</p>
<ul>
<li><strong>模型的作用</strong>：决定“要不要用”以及“怎么填参数”。</li>
<li><strong>你的代码的作用</strong>：看到模型想用工具，就<strong>拦截</strong>这个请求，手动运行本地函数，再把结果塞回给模型。</li>
</ul>
<hr>
<h2 id="_3-为什么不直接让-llm-运行代码" tabindex="-1"><a class="header-anchor" href="#_3-为什么不直接让-llm-运行代码"><span>3. 为什么不直接让 LLM 运行代码？</span></a></h2>
<p>这是一个非常关键的安全和架构设计：</p>
<ol>
<li><strong>安全隔离</strong>：如果模型能直接运行代码，它可能会不小心执行 <code v-pre>rm -rf /</code>。通过这种“协议”方式，<strong>执行权永远在你手里</strong>。</li>
<li><strong>跨平台</strong>：模型在云端（阿里云服务器），你的工具在本地（你的电脑）。云端的大脑无法直接伸出手来摸你的硬盘，只能通过 JSON 这种“电报”来指挥你。</li>
</ol>
<hr>
<h2 id="_4-完整的-闭环-逻辑图" tabindex="-1"><a class="header-anchor" href="#_4-完整的-闭环-逻辑图"><span>4. 完整的“闭环”逻辑图</span></a></h2>
<p>这就是你之前觉得“流程不一样”的根本原因。现在你需要处理的是一个 <strong>“请求 - 拦截 - 执行 - 再请求”</strong> 的循环：</p>
<table>
<thead>
<tr>
<th><strong>步骤</strong></th>
<th><strong>角色</strong></th>
<th><strong>动作</strong></th>
<th><strong>本质</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>1</strong></td>
<td><strong>用户</strong></td>
<td>问：“现在 CPU 高吗？”</td>
<td>触发意图</td>
</tr>
<tr>
<td><strong>2</strong></td>
<td><strong>LLM</strong></td>
<td>返回 <code v-pre>tool_calls</code>&lt;br&gt;（JSON 字符串）</td>
<td><strong>大脑决策</strong>（虚构调用）</td>
</tr>
<tr>
<td><strong>3</strong></td>
<td><strong>你的代码</strong></td>
<td><strong>解析 JSON</strong>，运行 <code v-pre>psutil.cpu_percent()</code></td>
<td><strong>身体执行</strong>（真实动作）</td>
</tr>
<tr>
<td><strong>4</strong></td>
<td><strong>你的代码</strong></td>
<td>把结果（如 <code v-pre>95%</code>&lt;br&gt;）发给 LLM</td>
<td>反馈观察结果</td>
</tr>
<tr>
<td><strong>5</strong></td>
<td><strong>LLM</strong></td>
<td>返回“是的，负载很高，建议检查进程。”</td>
<td>总结陈述</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="_5-总结-tool-到底是什么" tabindex="-1"><a class="header-anchor" href="#_5-总结-tool-到底是什么"><span>5. 总结：<code v-pre>tool</code> 到底是什么？</span></a></h2>
<ul>
<li><strong>在</strong> <code v-pre>**client.create**</code> <strong>里</strong>：它是一个 <strong>协议 (Protocol)</strong>。</li>
<li><strong>在你的本地代码里</strong>：它是一个 <strong>功能 (Function)</strong>。</li>
<li><strong>两者结合起来</strong>：才叫 <strong>智能体 (Agent)</strong>。</li>
</ul>
<hr>
<h2 id="​你的下一步-亲自拦截一次-虚假调用" tabindex="-1"><a class="header-anchor" href="#​你的下一步-亲自拦截一次-虚假调用"><span>​你的下一步：亲自拦截一次“虚假调用”</span></a></h2>
<p>我们要不要做一个实验？</p>
<ol>
<li>你定义一个 <code v-pre>get_cpu_usage</code> 的 <code v-pre>tool</code> 参数发给百炼。</li>
<li><strong>先不要写任何本地函数。</strong></li>
<li>你问它：“帮我查下 CPU。”</li>
<li>然后你 <code v-pre>print(response.choices[0].message)</code>。</li>
</ol>
<p>你会亲眼看到，AI 并没有报错，而是乖乖地返回了一串 <strong>JSON</strong>。看到那串 JSON 的那一刻，你就会瞬间明白：<strong>原来 AI 只是在给我下达“工单”！</strong></p>
<p><strong>你想看一眼如何捕捉并打印这个“工单”的代码吗？</strong></p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};