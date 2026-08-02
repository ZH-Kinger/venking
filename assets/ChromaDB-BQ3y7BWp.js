import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/LangChain/%E5%90%91%E9%87%8F%E6%95%B0%E6%8D%AE%E5%BA%93/ChromaDB.html","title":"ChromaDB","lang":"zh-CN","frontmatter":{"title":"ChromaDB","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"在你的 AIOps 项目中，ChromaDB 扮演的是 AI 的**“长期记忆存储器”**。 简单来说，它是一个专门为 AI 准备的数据库，存的不是传统的表格（如 MySQL），而是由文字转换而来的向量（Vectors）。 1. 为什么 AI 需要 ChromaDB？ 普通的数据库（比如 Excel 或 MySQL）是靠关键词搜索的。 普通数据库：搜“...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"ChromaDB\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/LangChain/%E5%90%91%E9%87%8F%E6%95%B0%E6%8D%AE%E5%BA%93/ChromaDB.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"ChromaDB"}],["meta",{"property":"og:description","content":"在你的 AIOps 项目中，ChromaDB 扮演的是 AI 的**“长期记忆存储器”**。 简单来说，它是一个专门为 AI 准备的数据库，存的不是传统的表格（如 MySQL），而是由文字转换而来的向量（Vectors）。 1. 为什么 AI 需要 ChromaDB？ 普通的数据库（比如 Excel 或 MySQL）是靠关键词搜索的。 普通数据库：搜“..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.24,"words":673},"filePathRelative":"posts/AI大模型/Agent应用开发/第三阶段_拥抱生态与框架_(工程化)/LangChain/向量数据库/ChromaDB.md","excerpt":"<p>在你的 <strong>AIOps 项目</strong>中，<strong>ChromaDB</strong> 扮演的是 AI 的**“长期记忆存储器”**。</p>\\n<p>简单来说，它是一个专门为 AI 准备的数据库，存的不是传统的表格（如 MySQL），而是由文字转换而来的<strong>向量（Vectors）</strong>。</p>\\n<hr>\\n<h2>1. 为什么 AI 需要 ChromaDB？</h2>\\n<p>普通的数据库（比如 Excel 或 MySQL）是靠<strong>关键词</strong>搜索的。</p>\\n<ul>\\n<li><strong>普通数据库</strong>：搜“内存不足”，如果文档里写的是 <code>Out of Memory</code>，它就找不到。</li>\\n<li><strong>ChromaDB</strong>：它通过 <strong>Embedding（嵌入）</strong> 技术理解语义。它知道“内存不足”和 <code>OOM</code> 是一个意思，所以能精准定位。</li>\\n</ul>","autoDesc":true}`),i={name:`ChromaDB.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在你的 <strong>AIOps 项目</strong>中，<strong>ChromaDB</strong> 扮演的是 AI 的**“长期记忆存储器”**。</p>
<p>简单来说，它是一个专门为 AI 准备的数据库，存的不是传统的表格（如 MySQL），而是由文字转换而来的<strong>向量（Vectors）</strong>。</p>
<hr>
<h2 id="_1-为什么-ai-需要-chromadb" tabindex="-1"><a class="header-anchor" href="#_1-为什么-ai-需要-chromadb"><span>1. 为什么 AI 需要 ChromaDB？</span></a></h2>
<p>普通的数据库（比如 Excel 或 MySQL）是靠<strong>关键词</strong>搜索的。</p>
<ul>
<li><strong>普通数据库</strong>：搜“内存不足”，如果文档里写的是 <code v-pre>Out of Memory</code>，它就找不到。</li>
<li><strong>ChromaDB</strong>：它通过 <strong>Embedding（嵌入）</strong> 技术理解语义。它知道“内存不足”和 <code v-pre>OOM</code> 是一个意思，所以能精准定位。</li>
</ul>
<hr>
<h2 id="_2-chromadb-的三个核心功能" tabindex="-1"><a class="header-anchor" href="#_2-chromadb-的三个核心功能"><span>2. ChromaDB 的三个核心功能</span></a></h2>
<h4 id="a-存储向量-storage" tabindex="-1"><a class="header-anchor" href="#a-存储向量-storage"><span>A. 存储向量 (Storage)</span></a></h4>
<p>当你运行 <code v-pre>ingest.py</code> 时，ChromaDB 把你的运维文档（.txt, .md）切成小块，并把它们转换成一串长长的数字（向量），然后永久存在你硬盘的 <code v-pre>vector_db</code> 文件夹里。</p>
<h4 id="b-语义检索-retrieval" tabindex="-1"><a class="header-anchor" href="#b-语义检索-retrieval"><span>B. 语义检索 (Retrieval)</span></a></h4>
<p>当你提问时，ChromaDB 会迅速在数千个向量中找到离你的问题“距离最近”的那几个片段。它不像在翻书，更像是在地图上找邻居。</p>
<h4 id="c-元数据管理-metadata" tabindex="-1"><a class="header-anchor" href="#c-元数据管理-metadata"><span>C. 元数据管理 (Metadata)</span></a></h4>
<p>它不仅存文字，还能存<strong>元数据</strong>（比如：这是哪个服务器的日志？这是哪一行的报错？）。这让你的 AIOps 平台可以实现“精准排障”。</p>
<hr>
<h2 id="_3-在你项目中的位置" tabindex="-1"><a class="header-anchor" href="#_3-在你项目中的位置"><span>3. 在你项目中的位置</span></a></h2>
<table>
<thead>
<tr>
<th><strong>组件</strong></th>
<th><strong>角色</strong></th>
<th><strong>对应你项目中的内容</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Qwen (LLM)</strong></td>
<td><strong>大脑</strong></td>
<td>负责逻辑推理和组织语言。</td>
</tr>
<tr>
<td><strong>ChromaDB</strong></td>
<td><strong>知识库</strong></td>
<td>负责提供 K8s 手册和历史故障数据。</td>
</tr>
<tr>
<td><strong>LangChain</strong></td>
<td><strong>神经系统</strong></td>
<td>负责把大脑和知识库串联起来。</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="_4-为什么选-chromadb-而不是别的" tabindex="-1"><a class="header-anchor" href="#_4-为什么选-chromadb-而不是别的"><span>4. 为什么选 ChromaDB 而不是别的？</span></a></h2>
<ol>
<li><strong>轻量且本地化</strong>：它不需要安装复杂的服务器（比如 Pinecone 或 Milvus），直接在你的 Python 环境里运行，数据完全存在你本地，符合你**“不使用第三方存储”**的安全需求。</li>
<li><strong>开源免费</strong>：非常适合大学生创业项目和 AIOps 实验。</li>
<li><strong>集成简单</strong>：它和 LangChain 是“原生配对”，几行代码就能搞定。</li>
</ol>
<hr>
<h2 id="​你的现状与风险提示" tabindex="-1"><a class="header-anchor" href="#​你的现状与风险提示"><span>​你的现状与风险提示</span></a></h2>
<p>你现在已经成功通过 <code v-pre>Chroma(persist_directory=&quot;./vector_db&quot;, ...)</code> 连上了它。</p>
<p><strong>需要注意的是：</strong></p>
<p>由于 ChromaDB 升级很快，你看到的 <code v-pre>LangChainDeprecationWarning</code> 提醒你，未来可能需要安装 <code v-pre>langchain-chroma</code> 独立包。但在你目前的 <strong>3.11 环境</strong> 下，现在的写法是最稳妥的。</p>
<p><strong>你想看看你的</strong> <code v-pre>**vector_db**</code> <strong>文件夹里到底存了多少条“记忆”吗？</strong> 我们可以写一行简单的代码，打印出你数据库里的文档总数，帮你确认 <code v-pre>ingest.py</code> 是否真的把所有文件都吃进去了。你要试试吗？</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};