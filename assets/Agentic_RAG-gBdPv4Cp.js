import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/LangChain/Agentic_RAG.html","title":"Agentic_RAG","lang":"zh-CN","frontmatter":{"title":"Agentic_RAG","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"image.pngimage.png 简单来说，Agentic RAG 是传统 RAG（检索增强生成）的“进化版”。 如果说传统 RAG 是一个“死板的资料员”（你问什么，他查什么，查不到也硬着头皮回），那么 Agentic RAG 就是一个“聪明的调查记者”。 image.pngimage.png 1. 核心区别：直觉 vs. 逻辑 传统 RAG (...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Agentic_RAG\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/Agentic_RAG-1.png\\",\\"https://venking.tech/blog/blog/assets/posts/Agentic_RAG-2.png\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/LangChain/Agentic_RAG.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"Agentic_RAG"}],["meta",{"property":"og:description","content":"image.pngimage.png 简单来说，Agentic RAG 是传统 RAG（检索增强生成）的“进化版”。 如果说传统 RAG 是一个“死板的资料员”（你问什么，他查什么，查不到也硬着头皮回），那么 Agentic RAG 就是一个“聪明的调查记者”。 image.pngimage.png 1. 核心区别：直觉 vs. 逻辑 传统 RAG (..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/Agentic_RAG-1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.68,"words":805},"filePathRelative":"posts/AI大模型/Agent应用开发/第三阶段_拥抱生态与框架_(工程化)/LangChain/Agentic_RAG.md","excerpt":"<figure><img src=\\"/blog/assets/posts/Agentic_RAG-1.png\\" alt=\\"image.png\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>image.png</figcaption></figure>\\n<p>简单来说，<strong>Agentic RAG</strong> 是传统 RAG（检索增强生成）的“进化版”。</p>\\n<p>如果说传统 RAG 是一个“死板的资料员”<strong>（你问什么，他查什么，查不到也硬着头皮回），那么 Agentic RAG 就是一个</strong>“聪明的调查记者”。</p>","autoDesc":true}`),i={name:`Agentic_RAG.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><figure><img src="/blog/assets/posts/Agentic_RAG-1.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<p>简单来说，<strong>Agentic RAG</strong> 是传统 RAG（检索增强生成）的“进化版”。</p>
<p>如果说传统 RAG 是一个“死板的资料员”<strong>（你问什么，他查什么，查不到也硬着头皮回），那么 Agentic RAG 就是一个</strong>“聪明的调查记者”。</p>
<figure><img src="/blog/assets/posts/Agentic_RAG-2.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<hr>
<h2 id="_1-核心区别-直觉-vs-逻辑" tabindex="-1"><a class="header-anchor" href="#_1-核心区别-直觉-vs-逻辑"><span>1. 核心区别：直觉 vs. 逻辑</span></a></h2>
<h2 id="传统-rag-standard-rag" tabindex="-1"><a class="header-anchor" href="#传统-rag-standard-rag"><span>传统 RAG (Standard RAG)</span></a></h2>
<ul>
<li><strong>流程：</strong> 用户提问 -&gt; 向量搜索 -&gt; 检索 Top-K 文档 -&gt; 丢给 AI 总结。</li>
<li><strong>缺点：</strong> 如果检索到的文档质量差，或者问题很复杂（需要查好几次），它就瞎编（幻觉）。它没有“反思”能力。</li>
</ul>
<h2 id="agentic-rag" tabindex="-1"><a class="header-anchor" href="#agentic-rag"><span>Agentic RAG</span></a></h2>
<ul>
<li><strong>流程：</strong> 用户提问 -&gt; <strong>Agent 思考 (Planning)</strong> -&gt; 决定去哪查 -&gt; <strong>检查检索结果 (Evaluation)</strong> -&gt; 如果不够好，换个关键词再查 -&gt; 汇总信息 -&gt; 回答。</li>
<li><strong>核心：</strong> 它引入了 <strong>推理 (Reasoning)</strong> 和 <strong>迭代 (Iteration)</strong>。</li>
</ul>
<hr>
<h2 id="_2-agentic-rag-的-超能力" tabindex="-1"><a class="header-anchor" href="#_2-agentic-rag-的-超能力"><span>2. Agentic RAG 的“超能力”</span></a></h2>
<p>在你开发的 <strong>AIOps 分布式平台</strong>背景下，Agentic RAG 的优势非常明显：</p>
<ol>
<li><strong>多步检索 (Multi-hop Retrieval)：</strong></li>
</ol>
<p>用户问：“昨晚 Kafka 堆积的原因是什么？”</p>
<ul>
<li><strong>第一步：</strong> Agent 查 Kafka 监控日志。</li>
<li><strong>第二步：</strong> 发现有网络抖动，Agent 自动决定再去查网络设备的 Syslog。</li>
<li><strong>第三步：</strong> 综合两边信息，得出结论。</li>
<li><em>传统 RAG 只能查一次，通常只能给你一半答案。</em></li>
</ul>
<ol start="2">
<li><strong>自我修正 (Self-Correction)：</strong></li>
</ol>
<p>如果 Agent 检索出来的文档和问题完全不相关，它会通过 <strong>Router（路由）</strong> 发现：“不对，这资料没用”，然后重新调整搜索词再次尝试。</p>
<ol start="3">
<li><strong>自适应工具调用：</strong></li>
</ol>
<p>它不只查向量数据库。它可能决定：</p>
<ul>
<li>调用 <strong>SQL 工具</strong> 查数据库指标。</li>
<li>调用 <strong>Local Shell</strong> 查看当前进程。</li>
<li>调用 <strong>Vector DB</strong> 查历史故障案例。</li>
</ul>
<hr>
<h2 id="_3-技术实现栈" tabindex="-1"><a class="header-anchor" href="#_3-技术实现栈"><span>3. 技术实现栈</span></a></h2>
<p>要实现 Agentic RAG，通常需要在你现有的 <code v-pre>openai</code> 库基础上增加以下组件：</p>
<ul>
<li><strong>Router（路由）：</strong> 决定这个请求是该查文档，还是该调 API。</li>
<li><strong>Query Rewriter（查询重写）：</strong> 把用户的模糊提问转换成更专业的搜索词。</li>
<li><strong>Reasoning Loop（推理循环）：</strong> 经典的 <code v-pre>Thought -&gt; Action -&gt; Observation</code> 循环。</li>
</ul>
<hr>
<h2 id="_4-为什么它对你的项目很重要" tabindex="-1"><a class="header-anchor" href="#_4-为什么它对你的项目很重要"><span>4. 为什么它对你的项目很重要？</span></a></h2>
<p>你正在做“分布式智能日志分析”。</p>
<p>传统的 RAG 只能帮你从“知识库”里找现成的文档。但 <strong>Agentic RAG 可以实时地在你的分布式集群里“探路”</strong>。</p>
<p><strong>举个例子：</strong></p>
<p>当你的平台收到一个报警，Agentic RAG 可以先检索“历史类似故障”，如果发现匹配度不高，它会自动触发一个 <code v-pre>ls -l</code> 或 <code v-pre>top</code> 命令去获取实时状态，再把这些实时状态作为“动态文档”进行 RAG 分析。</p>
<hr>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2>
<p><strong>Agentic RAG = 传统 RAG + 思考能力 + 自主工具使用。</strong></p>
<p>它让 AI 不再只是一个“读书人”，而变成了一个能够<strong>一边查阅资料、一边动手实操</strong>的运维工程师。</p>
<p><strong>既然你已经跑通了基础对话，我们要不要试着写一个“极简版”的 Agentic 逻辑？比如：让 AI 先判断用户的问题需不需要查日志，如果需要，它才去调用你写的工具。</strong> 这种“按需决策”就是 Agentic RAG 的雏形。你要试试吗？</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};