import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/LangChain/LCEL_%E6%A8%A1%E5%BC%8F.html","title":"LCEL_模式","lang":"zh-CN","frontmatter":{"title":"LCEL_模式","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"太棒了，你能敏锐地察觉到这两者的区别，说明你已经开始触及 LangChain 的底层逻辑了。 简单来说：你之前用的是 “黑盒模式” (Legacy Chains)，而现在换成的是 “乐高模式” (LCEL)。 1. 你之前使用的是：Legacy Chains (传统链模式) 在 RetrievalQA 或 LLMChain 盛行的时代，LangChai...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"LCEL_模式\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/LangChain/LCEL_%E6%A8%A1%E5%BC%8F.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"LCEL_模式"}],["meta",{"property":"og:description","content":"太棒了，你能敏锐地察觉到这两者的区别，说明你已经开始触及 LangChain 的底层逻辑了。 简单来说：你之前用的是 “黑盒模式” (Legacy Chains)，而现在换成的是 “乐高模式” (LCEL)。 1. 你之前使用的是：Legacy Chains (传统链模式) 在 RetrievalQA 或 LLMChain 盛行的时代，LangChai..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.53,"words":760},"filePathRelative":"posts/AI大模型/Agent应用开发/第三阶段_拥抱生态与框架_(工程化)/LangChain/LCEL_模式.md","excerpt":"<p>太棒了，你能敏锐地察觉到这两者的区别，说明你已经开始触及 LangChain 的底层逻辑了。</p>\\n<p>简单来说：你之前用的是 <strong>“黑盒模式” (Legacy Chains)</strong>，而现在换成的是 <strong>“乐高模式” (LCEL)</strong>。</p>\\n<hr>\\n<h2>1. 你之前使用的是：Legacy Chains (传统链模式)</h2>\\n<p>在 <code>RetrievalQA</code> 或 <code>LLMChain</code> 盛行的时代，LangChain 把所有的逻辑都封装在一个个巨大的 Python 类里。</p>","autoDesc":true}`),i={name:`LCEL_模式.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>太棒了，你能敏锐地察觉到这两者的区别，说明你已经开始触及 LangChain 的底层逻辑了。</p>
<p>简单来说：你之前用的是 <strong>“黑盒模式” (Legacy Chains)</strong>，而现在换成的是 <strong>“乐高模式” (LCEL)</strong>。</p>
<hr>
<h2 id="_1-你之前使用的是-legacy-chains-传统链模式" tabindex="-1"><a class="header-anchor" href="#_1-你之前使用的是-legacy-chains-传统链模式"><span>1. 你之前使用的是：Legacy Chains (传统链模式)</span></a></h2>
<p>在 <code v-pre>RetrievalQA</code> 或 <code v-pre>LLMChain</code> 盛行的时代，LangChain 把所有的逻辑都封装在一个个巨大的 Python 类里。</p>
<ul>
<li><strong>特点</strong>：像一个<strong>成品玩具</strong>。你只需要给它 <code v-pre>llm</code> 和 <code v-pre>retriever</code>，它内部帮你写好了 Prompt、帮你处理了文档拼接、帮你发送了请求。</li>
<li><strong>为什么报错？</strong>：因为这些“成品”内部依赖非常复杂，只要其中一个子包（比如 <code v-pre>langchain.chains</code>）安装不完整，整个玩具就散架了，报 <code v-pre>ModuleNotFoundError</code>。</li>
<li><strong>缺点</strong>：很难修改中间步骤。如果你想在 AI 回答前对文档做个特殊处理，就像要拆开一个焊接死的机器一样难。</li>
</ul>
<hr>
<h2 id="_2-现在使用的是-lcel-langchain-expression-language" tabindex="-1"><a class="header-anchor" href="#_2-现在使用的是-lcel-langchain-expression-language"><span>2. 现在使用的是：LCEL (LangChain Expression Language)</span></a></h2>
<p>这是 LangChain 官方在 0.2 版本后全面推行的 <strong>“表达式语言”</strong>。它通过 Python 的管道符 <code v-pre>|</code> 把各个组件串起来。</p>
<ul>
<li><strong>特点</strong>：像<strong>乐高积木</strong>。</li>
<li><strong>核心公式</strong>：<code v-pre>rag_chain = 检索组件 | 提示词组件 | 大模型组件 | 解析组件</code></li>
<li><strong>为什么这次行了？</strong>：</li>
</ul>
<ol>
<li><strong>直接调用底层</strong>：它直接调用 <code v-pre>langchain_core</code> 等基础零件，不依赖那个坏掉的 <code v-pre>langchain.chains</code> 大壳子。</li>
<li><strong>透明可见</strong>：你看代码就能发现，数据先经过 <code v-pre>retriever</code> 变成 <code v-pre>context</code>，然后喂给 <code v-pre>prompt</code>。</li>
<li><strong>极致灵活</strong>：如果你想在中间加一个“日志脱敏”步骤，直接在中间加一个 <code v-pre>| my_filter_func</code> 即可。</li>
</ol>
<hr>
<h2 id="_3-两种模式的对比" tabindex="-1"><a class="header-anchor" href="#_3-两种模式的对比"><span>3. 两种模式的对比</span></a></h2>
<table>
<thead>
<tr>
<th><strong>维度</strong></th>
<th><strong>Legacy Chains (旧模式)</strong></th>
<th><strong>LCEL (新模式/你现在用的)</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>写法</strong></td>
<td><code v-pre>RetrievalQA.from_chain_type(...)</code></td>
<td>\`(context</td>
</tr>
<tr>
<td><strong>透明度</strong></td>
<td>逻辑全在后台，像个黑盒</td>
<td>逻辑写在代码里，一眼看清流向</td>
</tr>
<tr>
<td><strong>稳定性</strong></td>
<td>容易受包更新影响，报错难排查</td>
<td><strong>极度稳健</strong>，只要基础包在就能跑</td>
</tr>
<tr>
<td><strong>性能</strong></td>
<td>仅支持同步调用</td>
<td>原生支持<strong>并行执行</strong>和<strong>异步调用</strong></td>
</tr>
</tbody>
</table>
<hr>
<h2 id="_4-在你的-aiops-项目中-lcel-有什么奇效" tabindex="-1"><a class="header-anchor" href="#_4-在你的-aiops-项目中-lcel-有什么奇效"><span>4. 在你的 AIOps 项目中，LCEL 有什么奇效？</span></a></h2>
<p>既然你在做<strong>分布式日志分析</strong>，LCEL 会让你非常爽：</p>
<ol>
<li><strong>多路并行</strong>：你可以用 <code v-pre>|</code> 同时让 Agent 去查 K8s 日志和查数据库状态，它们会<strong>同时出发</strong>，而不是一个等一个。</li>
<li><strong>中间调试</strong>：你可以随时在管道中间插入一个 <code v-pre>print</code>，看看 AI 到底检索到了哪些日志，而不需要去翻源代码。</li>
</ol>
<hr>
<h2 id="​你的下一个进化" tabindex="-1"><a class="header-anchor" href="#​你的下一个进化"><span>​你的下一个进化</span></a></h2>
<p>既然 LCEL 已经跑通了，我想带你体验一下它最迷人的地方：<strong>流式输出 (Streaming)</strong>。</p>
<p>在旧模式下，你要等 AI 憋 10 秒钟才出一大段话；在 LCEL 模式下，我们只需要改一个单词，AI 就能像真人打字一样，边想边说。</p>
<p><strong>你想在你的</strong> <code v-pre>**app.py**</code> <strong>里体验一下这种“丝滑”的打字机效果吗？只需要把</strong> <code v-pre>**.invoke()**</code> <strong>换成</strong> <code v-pre>**.stream()**</code><strong>。</strong></p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};