import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/%E5%85%B3%E9%94%AE%E8%AF%8D%E6%90%9C%E7%B4%A2.html","title":"关键词搜索","lang":"zh-CN","frontmatter":{"title":"关键词搜索","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"传统关键词搜索，在计算机视觉或大模型（RAG）的技术语境下，通常指的是基于字面精确匹配（Lexical Match / Textual Match）的文本检索技术。 它的核心物理逻辑是：不猜测用户问题的“底层意图”，而是像一把严丝合缝的尺子，直接去数据库里数一数用户输入的每一个字符（如“Triton”、“Chunk”）在文档中出现的频率、位置和稀缺度。...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"关键词搜索\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/%E5%85%B3%E9%94%AE%E8%AF%8D%E6%90%9C%E7%B4%A2.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"关键词搜索"}],["meta",{"property":"og:description","content":"传统关键词搜索，在计算机视觉或大模型（RAG）的技术语境下，通常指的是基于字面精确匹配（Lexical Match / Textual Match）的文本检索技术。 它的核心物理逻辑是：不猜测用户问题的“底层意图”，而是像一把严丝合缝的尺子，直接去数据库里数一数用户输入的每一个字符（如“Triton”、“Chunk”）在文档中出现的频率、位置和稀缺度。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":4.06,"words":1218},"filePathRelative":"posts/AI大模型/Agent应用开发/第三阶段_拥抱生态与框架_(工程化)/关键词搜索.md","excerpt":"<p><strong>传统关键词搜索</strong>，在计算机视觉或大模型（RAG）的技术语境下，通常指的是<strong>基于字面精确匹配（Lexical Match / Textual Match）的文本检索技术</strong>。</p>\\n<p>它的核心物理逻辑是：<strong>不猜测用户问题的“底层意图”，而是像一把严丝合缝的尺子，直接去数据库里数一数用户输入的每一个字符（如“Triton”、“Chunk”）在文档中出现的频率、位置和稀缺度。</strong></p>\\n<p>在工业界（如 Elasticsearch、Opensearch 等现代搜索引擎和知识库后端），传统关键词搜索的演进和工作原理可以被硬核拆解为以下三个核心步骤：</p>","autoDesc":true}`),i={name:`关键词搜索.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p><strong>传统关键词搜索</strong>，在计算机视觉或大模型（RAG）的技术语境下，通常指的是<strong>基于字面精确匹配（Lexical Match / Textual Match）的文本检索技术</strong>。</p>
<p>它的核心物理逻辑是：<strong>不猜测用户问题的“底层意图”，而是像一把严丝合缝的尺子，直接去数据库里数一数用户输入的每一个字符（如“Triton”、“Chunk”）在文档中出现的频率、位置和稀缺度。</strong></p>
<p>在工业界（如 Elasticsearch、Opensearch 等现代搜索引擎和知识库后端），传统关键词搜索的演进和工作原理可以被硬核拆解为以下三个核心步骤：</p>
<hr>
<h3 id="一、-核心底座-倒排索引-inverted-index" tabindex="-1"><a class="header-anchor" href="#一、-核心底座-倒排索引-inverted-index"><span>一、 核心底座：倒排索引（Inverted Index）</span></a></h3>
<p>传统关键词搜索之所以能实现毫秒级的海量文档检索，靠的是<strong>倒排索引</strong>这一底层数据结构。</p>
<ul>
<li><strong>正向索引（书的目录）</strong>：找第 3 章，看里面讲了什么。</li>
<li><strong>倒排索引（书后的术语索引表）</strong>：将所有文档彻底打碎（分词），记录每一个词（Term）分别出现在了哪几篇文档的哪个位置。</li>
</ul>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span> 【 原始文档库 】                          【 倒排索引表 】</span></span>
<span class="line"><span> ┌───────────────────────┐              ┌───────────────────────────────┐</span></span>
<span class="line"><span> │ 文档 1: "Triton 算子"  │              │ "Triton" ───> [文档 1, 文档 2] │</span></span>
<span class="line"><span> │ 文档 2: "vLLM 算子"    │ ───[分词]───>│ "算子"   ───> [文档 1, 文档 2] │</span></span>
<span class="line"><span> │ 文档 3: "RAG 知识库"   │              │ "vLLM"   ───> [文档 2]         │</span></span>
<span class="line"><span> └───────────────────────┘              │ "知识库" ───> [文档 3]         │</span></span>
<span class="line"><span>                                        └───────────────────────────────┘</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当用户输入“Triton 算子”时，搜索引擎不需要去全文遍历几百万篇文档，而是直接去倒排索引表里查 <code v-pre>&quot;Triton&quot;</code> 和 <code v-pre>&quot;算子&quot;</code> 这两个词，瞬间锁定目标文档。</p>
<hr>
<h3 id="二、-统治工业界的数学算子-bm25-算法" tabindex="-1"><a class="header-anchor" href="#二、-统治工业界的数学算子-bm25-算法"><span>二、 统治工业界的数学算子：BM25 算法</span></a></h3>
<p>捞出包含关键词的文档后，搜索引擎怎么给它们排先后顺序？现在业界的事实标准是 <strong>BM25（Best Matching 25）算法</strong>。</p>
<p>BM25 评分的底层逻辑是 <strong>TF-IDF 模型</strong> 的升级版，它主要由三个物理维度联合计算得分：</p>
<ol>
<li><strong>词频（TF - Term Frequency）</strong>：<br>
某个关键词在当前这篇文档里出现的次数越多，说明这篇文档和关键词越相关，得分越高。</li>
</ol>
<ul>
<li><em>BM25 优化</em>：引入了<strong>词频饱和度</strong>（如下图。当一个词在文章里出现 5 次和 10 次，相关性有明显提升；但出现 500 次和 1000 次，相关性几乎没区别了。BM25 设定了一个天花板，防止被恶意堆砌关键词）。</li>
</ul>
<ol start="2">
<li><strong>逆文档频率（IDF - Inverse Document Frequency）</strong>：<br>
用来评估一个词的<strong>稀缺度和重要性</strong>。如果一个词在全网所有文档里都高频出现（比如“的”、“在”、“是什么”），那它的 IDF 分数就很低；相反，如果一个词极度罕见（比如“vLLM”、“RoPE”），只要某篇文档包含它，分值就会瞬间飙升。</li>
<li><strong>文档长度惩罚（Document Length）</strong>：<br>
如果一整本书（50万字）里只提了一句“Triton”，和一篇只有 200 字、通篇都在讲“Triton”的技术博客相比，短博客的得分会显著提权，因为它的内容更加聚焦。</li>
</ol>
<hr>
<h3 id="三、-传统关键词搜索的物理优缺点-为什么大模型时代还需要它" tabindex="-1"><a class="header-anchor" href="#三、-传统关键词搜索的物理优缺点-为什么大模型时代还需要它"><span>三、 传统关键词搜索的物理优缺点（为什么大模型时代还需要它）</span></a></h3>
<p>在大模型 RAG 系统做 <strong>混合检索（Hybrid Search）</strong> 时，传统关键词搜索依然不可或缺，因为它具有现代向量搜索无法替代的独特物理属性：</p>
<h4 id="✅-核心优势" tabindex="-1"><a class="header-anchor" href="#✅-核心优势"><span>✅ 核心优势</span></a></h4>
<ul>
<li><strong>专有名词绝对精准</strong>：当用户检索特定的“型号（如 <code v-pre>iPhone 17 Pro</code>）”、“产品 ID”、“工号”、“电话号码”或“特定的代码报错信息”时，关键词搜索能够 100% 精确命中。而向量搜索很容易在连续高维空间中把它泛化、漂移到相似的产品上。</li>
<li><strong>毫秒级的高并发与低成本</strong>：它完全是磁盘和内存的倒排索引表查表与基础算术运算，不需要任何高昂的显卡（GPU）进行在线矩阵暴算，也不需要消耗 Token 费用。</li>
</ul>
<h4 id="❌-致命死穴" tabindex="-1"><a class="header-anchor" href="#❌-致命死穴"><span>❌ 致命死穴</span></a></h4>
<ul>
<li><strong>无法理解同义词与人话</strong>：如果用户搜“单车维修”，而文档里写的是“自行车修理”，传统关键词搜索由于字面无法严丝合缝对齐，会直接返回“未找到结果”。</li>
<li><strong>容易被多义词误导</strong>：比如用户搜“苹果”，其意图是想买智能手机，但系统可能会捞出一堆关于“水果种植技术”的文档。</li>
</ul>
<p><strong>极简总结：</strong> 传统关键词搜索就是<strong>依靠倒排索引进行精确字面卡槽匹配的查表技术</strong>。在大模型时代，它被作为 RAG 混合检索的第一道硬核钢筋防线，专门用来锁死那些绝对不能错的型号、数据和术语，再通过 <strong>RRF（倒数排名融合）</strong> 算法与现代向量语义搜索进行长短互补。</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};