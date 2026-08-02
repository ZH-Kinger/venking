import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/LangChain/%E5%90%91%E9%87%8F%E6%95%B0%E6%8D%AE%E5%BA%93.html","title":"向量数据库","lang":"zh-CN","frontmatter":{"title":"向量数据库","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"既然你已经在用 ChromaDB 跑通了 RAG 流程，理解“向量数据库”的本质会让你对 AIOps 项目 的架构有更深的认识。 简单来说，向量数据库（Vector Database） 是 AI 的“语义索引库”。它不存文字或表格，而是存储数字坐标（向量）。 1. 它是用来干啥的？（核心场景） 传统数据库（如 MySQL）擅长精确匹配，而向量数据库擅长...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"向量数据库\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/LangChain/%E5%90%91%E9%87%8F%E6%95%B0%E6%8D%AE%E5%BA%93.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"向量数据库"}],["meta",{"property":"og:description","content":"既然你已经在用 ChromaDB 跑通了 RAG 流程，理解“向量数据库”的本质会让你对 AIOps 项目 的架构有更深的认识。 简单来说，向量数据库（Vector Database） 是 AI 的“语义索引库”。它不存文字或表格，而是存储数字坐标（向量）。 1. 它是用来干啥的？（核心场景） 传统数据库（如 MySQL）擅长精确匹配，而向量数据库擅长..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.98,"words":894},"filePathRelative":"posts/AI大模型/Agent应用开发/第三阶段_拥抱生态与框架_(工程化)/LangChain/向量数据库.md","excerpt":"<p>既然你已经在用 <strong>ChromaDB</strong> 跑通了 RAG 流程，理解“向量数据库”的本质会让你对 <strong>AIOps 项目</strong> 的架构有更深的认识。</p>\\n<p>简单来说，<strong>向量数据库（Vector Database）</strong> 是 AI 的“语义索引库”。它不存文字或表格，而是存储<strong>数字坐标（向量）</strong>。</p>\\n<hr>\\n<h2>1. 它是用来干啥的？（核心场景）</h2>\\n<p>传统数据库（如 MySQL）擅长<strong>精确匹配</strong>，而向量数据库擅长<strong>语义查找</strong>。</p>","autoDesc":true}`),i={name:`向量数据库.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>既然你已经在用 <strong>ChromaDB</strong> 跑通了 RAG 流程，理解“向量数据库”的本质会让你对 <strong>AIOps 项目</strong> 的架构有更深的认识。</p>
<p>简单来说，<strong>向量数据库（Vector Database）</strong> 是 AI 的“语义索引库”。它不存文字或表格，而是存储<strong>数字坐标（向量）</strong>。</p>
<hr>
<h2 id="_1-它是用来干啥的-核心场景" tabindex="-1"><a class="header-anchor" href="#_1-它是用来干啥的-核心场景"><span>1. 它是用来干啥的？（核心场景）</span></a></h2>
<p>传统数据库（如 MySQL）擅长<strong>精确匹配</strong>，而向量数据库擅长<strong>语义查找</strong>。</p>
<ul>
<li><strong>实现“模糊但精准”的搜索</strong>：</li>
</ul>
<p>比如在你的运维日志中，你搜“内存炸了”，传统数据库找不到这个词。但向量数据库知道“炸了”在语义上接近 <code v-pre>OOM</code>、<code v-pre>Out of Memory</code> 或“溢出”，所以能把相关的解决方案翻出来。</p>
<ul>
<li><strong>给大模型提供“长效记忆” (RAG)</strong>：</li>
</ul>
<p>大模型（如 Qwen）的记忆力有限（上下文窗口）。向量数据库就像一个<strong>外部硬盘</strong>，存了几万篇运维手册。AI 碰到不懂的问题，就去这个硬盘里秒级搜索相关的片段，看一眼再回答。</p>
<ul>
<li><strong>相似性排障</strong>：</li>
</ul>
<p>你可以把当前的报错日志转成向量，去数据库里搜：“过去三年里，有没有发生过类似的报错？”它能帮你找到历史处理方案。</p>
<hr>
<h2 id="_2-它是怎么工作的-三步走" tabindex="-1"><a class="header-anchor" href="#_2-它是怎么工作的-三步走"><span>2. 它是怎么工作的？（三步走）</span></a></h2>
<p>为了让你直观理解，我们可以把向量数据库的工作流程比作**“坐标定位”**：</p>
<ol>
<li><strong>特征提取（Embedding）</strong>：</li>
</ol>
<p>你的本地模型（<code v-pre>text2vec</code>）把一段文字（比如“K8s 节点失联”）翻译成一组数字：<code v-pre>[0.12, -0.98, 0.45, ...]</code>（通常有 768 个数字）。这组数字就是这段话在多维空间里的<strong>唯一坐标</strong>。</p>
<ol start="2">
<li><strong>建立索引（Indexing）</strong>：</li>
</ol>
<p>向量数据库（ChromaDB）把这些坐标存起来。它会建立特殊的索引结构（如 HNSW），像在地图上划分区域一样，确保查找时不需要挨个对比。</p>
<ol start="3">
<li><strong>计算距离（Search）</strong>：</li>
</ol>
<p>当你提问时，数据库计算你的问题坐标离哪个文档坐标最近。<strong>距离越近，意思越像。</strong></p>
<hr>
<h2 id="_3-为什么-aiops-离不开它" tabindex="-1"><a class="header-anchor" href="#_3-为什么-aiops-离不开它"><span>3. 为什么 AIOps 离不开它？</span></a></h2>
<p>在分布式系统中，日志是海量的且非结构化的。向量数据库解决了两个痛点：</p>
<ul>
<li><strong>消除关键词依赖</strong>：不同程序员写的日志风格不同（有人写 <code v-pre>Error</code>，有人写 <code v-pre>Fail</code>），向量库能统一识别。</li>
<li><strong>海量数据秒级检索</strong>：如果你用 Python 的 <code v-pre>for</code> 循环去匹配几百万行日志，电脑会卡死。向量数据库利用数学算法，可以在毫秒内从百万级数据中抓取最相关的 Top 3。</li>
</ul>
<hr>
<h2 id="_4-总结-向量库-vs-传统库" tabindex="-1"><a class="header-anchor" href="#_4-总结-向量库-vs-传统库"><span>4. 总结：向量库 vs 传统库</span></a></h2>
<table>
<thead>
<tr>
<th><strong>维度</strong></th>
<th><strong>传统数据库 (MySQL/ES)</strong></th>
<th><strong>向量数据库 (Chroma/Milvus)</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>存储内容</strong></td>
<td>文本、数字、布尔值</td>
<td>高维向量 (数字列表)</td>
</tr>
<tr>
<td><strong>检索方式</strong></td>
<td>关键词、范围、布尔逻辑</td>
<td><strong>相似度搜索</strong> (余弦相似度等)</td>
</tr>
<tr>
<td><strong>理解能力</strong></td>
<td>只能匹配字面意思</td>
<td><strong>能理解语义和语境</strong></td>
</tr>
<tr>
<td><strong>运维用途</strong></td>
<td>查具体的流水、用户表</td>
<td>查报错原因、查相似案例、知识库</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="​你的现状" tabindex="-1"><a class="header-anchor" href="#​你的现状"><span>​你的现状</span></a></h2>
<p>你已经在 <code v-pre>app.py</code> 中用上了它：</p>
<ul>
<li><strong>ChromaDB</strong>：就是你的仓库。</li>
<li><code v-pre>**vectorstore.as_retriever()**</code>：就是你在调用它的“搜索功能”。</li>
</ul>
<p><strong>你想亲眼看看你的“运维手册”在数据库里被转换成了什么样的数字吗？</strong> 我可以写一段简单的代码，打印出你某条数据的“向量坐标”，让你看看 AI 眼中的世界长什么样。你要试试吗？</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};