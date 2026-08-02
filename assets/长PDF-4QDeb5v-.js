import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/%E5%A4%9A%E6%A8%A1%E6%80%81RAG/%E9%95%BFPDF.html","title":"长PDF","lang":"zh-CN","frontmatter":{"title":"长PDF","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"处理长 PDF（比如几百页的招股书、技术白皮书、长篇财报）是 RAG 系统最核心的硬核实战场景。 如果直接无脑把整本 PDF 的文本转成向量丢进去，不仅会发生你提到的上下文爆掉（Context Overflow），更会因为长文本的“迷失在中间（Lost in the Middle）”效应，导致大模型严重漏掉核心信息。 要完美驯服长 PDF 并且死死卡住...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"长PDF\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/%E5%A4%9A%E6%A8%A1%E6%80%81RAG/%E9%95%BFPDF.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"长PDF"}],["meta",{"property":"og:description","content":"处理长 PDF（比如几百页的招股书、技术白皮书、长篇财报）是 RAG 系统最核心的硬核实战场景。 如果直接无脑把整本 PDF 的文本转成向量丢进去，不仅会发生你提到的上下文爆掉（Context Overflow），更会因为长文本的“迷失在中间（Lost in the Middle）”效应，导致大模型严重漏掉核心信息。 要完美驯服长 PDF 并且死死卡住..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":5.16,"words":1547},"filePathRelative":"posts/AI大模型/Agent应用开发/第三阶段_拥抱生态与框架_(工程化)/多模态RAG/长PDF.md","excerpt":"<p>处理长 PDF（比如几百页的招股书、技术白皮书、长篇财报）是 RAG 系统最核心的硬核实战场景。</p>\\n<p>如果直接无脑把整本 PDF 的文本转成向量丢进去，不仅会发生你提到的<strong>上下文爆掉（Context Overflow）</strong>，更会因为长文本的“迷失在中间（Lost in the Middle）”效应，导致大模型严重漏掉核心信息。</p>\\n<p>要完美驯服长 PDF 并且死死卡住上下文窗口，工业界沉淀出了一套“感知-切片-路由-聚合”的组合铁拳：</p>\\n<hr>\\n<h3>一、 物理卡碎：高级版长 PDF 处理管线</h3>\\n<p>长 PDF 处理的胜负手，在第一步解析（Parsing）阶段就已经决定了。绝对不要用基础的 <code>pypdf</code> 进行无脑的字符拉取，那会把表格和排版搅成一团浆糊。</p>","autoDesc":true}`),i={name:`长PDF.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>处理长 PDF（比如几百页的招股书、技术白皮书、长篇财报）是 RAG 系统最核心的硬核实战场景。</p>
<p>如果直接无脑把整本 PDF 的文本转成向量丢进去，不仅会发生你提到的<strong>上下文爆掉（Context Overflow）</strong>，更会因为长文本的“迷失在中间（Lost in the Middle）”效应，导致大模型严重漏掉核心信息。</p>
<p>要完美驯服长 PDF 并且死死卡住上下文窗口，工业界沉淀出了一套“感知-切片-路由-聚合”的组合铁拳：</p>
<hr>
<h3 id="一、-物理卡碎-高级版长-pdf-处理管线" tabindex="-1"><a class="header-anchor" href="#一、-物理卡碎-高级版长-pdf-处理管线"><span>一、 物理卡碎：高级版长 PDF 处理管线</span></a></h3>
<p>长 PDF 处理的胜负手，在第一步解析（Parsing）阶段就已经决定了。绝对不要用基础的 <code v-pre>pypdf</code> 进行无脑的字符拉取，那会把表格和排版搅成一团浆糊。</p>
<h4 id="_1-结构化解析-layout-aware-parsing" tabindex="-1"><a class="header-anchor" href="#_1-结构化解析-layout-aware-parsing"><span>1. 结构化解析（Layout-Aware Parsing）</span></a></h4>
<p>使用 <strong>Markdown 格式</strong>作为长 PDF 转换的物理终点。</p>
<ul>
<li><strong>工具选择</strong>：使用 <code v-pre>MinerU</code>、<code v-pre>Marker</code>、<code v-pre>Nougat</code> 或 <code v-pre>LlamaParse</code> 等具备视觉版面分析（Layout Analysis）能力的工具。</li>
<li><strong>物理效果</strong>：它们能把 PDF 里的<strong>多栏排版、复杂的财报三张表（资产负债表等）完美还原为 Markdown 语法中的</strong> <code v-pre>|</code> <strong>隔开的标准表格</strong>，并把一、二级标题精准翻译为 <code v-pre>#</code> 和 <code v-pre>##</code>。这保证了后续切片时，数据的骨架不会散。</li>
</ul>
<h4 id="_2-父子块双层切片策略-parent-child-chunking" tabindex="-1"><a class="header-anchor" href="#_2-父子块双层切片策略-parent-child-chunking"><span>2. 父子块双层切片策略（Parent-Child Chunking）</span></a></h4>
<p>这是目前防止检索失真最稳的切片模型：</p>
<ul>
<li><strong>子块（Child Chunk - 100~200 Token）</strong>：切得极细，专门用来做 Embedding 和向量数据库检索。因为块小，语义聚焦，能把 PDF 某个角落里的一句细节指标精准打捞出来。</li>
<li><strong>父块（Parent Chunk - 1000~2000 Token）</strong>：包含子块所在的上下完整段落甚至整页内容。</li>
<li><strong>路由机制</strong>：在向量库里我们只搜“子块”，但<strong>一旦子块中签，系统顺藤摸瓜，把这个子块对应的巨大“父块”捞出来喂给大模型</strong>。这既保证了检索的绝对锐利，又保证了大模型有充足的上下文去理解来龙去脉。</li>
</ul>
<hr>
<h3 id="二、-如果上下文-context-爆了-如何定点爆破" tabindex="-1"><a class="header-anchor" href="#二、-如果上下文-context-爆了-如何定点爆破"><span>二、 如果上下文（Context）爆了，如何定点爆破？</span></a></h3>
<p>当你使用 <strong>RAG-Fusion（多路并发检索）</strong> 捞出了大量文档，或者用户问了一个极为宏观的问题（如“总结这本 300 页 PDF 里面所有的系统架构设计缺陷”），捞出来的 Chunks 瞬间撑爆了 128K 上下文时，你可以祭出以下四道防火墙：</p>
<h4 id="防火墙-1-最立竿见影的-全能重排王-reranker-算子" tabindex="-1"><a class="header-anchor" href="#防火墙-1-最立竿见影的-全能重排王-reranker-算子"><span>防火墙 1：最立竿见影的“全能重排王”（Reranker 算子）</span></a></h4>
<p>向量库（Vector DB）找出来的 Top-50 文档，是基于“粗暴的向量相似度”，这里面有大量的滥竽充数。</p>
<ul>
<li><strong>做法</strong>：在向量库吐出 50 个 Chunks 后，<strong>千万别直接喂给 LLM</strong>。在中间加一个 <strong>Reranker（重排模型，如 BGE-Reranker、Cohere Rerank）</strong>。</li>
<li><strong>原理</strong>：Reranker 是一个交叉注意力（Cross-Attention）模型，它会把用户的提问和这 50 个 Chunk 组合成一对对的精细输入，像考官一样当场给它们打出真实的语义相关性分值。</li>
<li><strong>效果</strong>：通过重排，<strong>直接卡死只切出前 5 个（Top-5）最致命的黄金 Chunk 喂给 LLM</strong>，其余 45 个直接物理丢弃。上下文瞬间从“臃肿爆表”缩减到“几千 Token 的高纯度精髓”。</li>
</ul>
<h4 id="防火墙-2-分布式分而治之-map-reduce-推理模式" tabindex="-1"><a class="header-anchor" href="#防火墙-2-分布式分而治之-map-reduce-推理模式"><span>防火墙 2：分布式分而治之（Map-Reduce 推理模式）</span></a></h4>
<p>如果你的任务是全局归纳（比如提炼全书大纲），重排模型没法删数据，因为每个 Chunk 都有用。这时候必须在应用层改变 LLM 的调用架构：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>       【 Map-Reduce 架构应对长 PDF 全局归纳 】</span></span>
<span class="line"><span> ┌───────────────────────────────────────────────────┐</span></span>
<span class="line"><span> │ 长 PDF 拆出的 50 个有用 Chunks (总长 200,000 Token)│</span></span>
<span class="line"><span> └─────────────────┬─────────────────────────────────┘</span></span>
<span class="line"><span>                   │</span></span>
<span class="line"><span>    ┌──────────────┼──────────────┐ (分批并发提交)</span></span>
<span class="line"><span>    ▼              ▼              ▼</span></span>
<span class="line"><span> [ 批次 1 ]      [ 批次 2 ]     [ 批次 3 ]  (每批控制在 4000 Token 内)</span></span>
<span class="line"><span>    │              │              │</span></span>
<span class="line"><span>    ▼ (Map 阶段)    ▼ (Map 阶段)    ▼ (Map 阶段)</span></span>
<span class="line"><span> [微型大模型]    [微型大模型]    [微型大模型] (高并发，提炼出局部摘要)</span></span>
<span class="line"><span>    │              │              │</span></span>
<span class="line"><span>    ▼              ▼              ▼</span></span>
<span class="line"><span> [局部摘要 1]    [局部摘要 2]    [局部摘要 3] (各自缩减到 500 Token)</span></span>
<span class="line"><span>    │              │              │</span></span>
<span class="line"><span>    └──────────────┼──────────────┘ (拼装组合)</span></span>
<span class="line"><span>                   │</span></span>
<span class="line"><span>                   ▼ (Reduce 阶段)</span></span>
<span class="line"><span>         【 终极大模型 (LLM) 】 ────> 吐出最终的 300 页 PDF 全局总结大表</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>Map 阶段</strong>：把超长数据切成几千 Token 的并发组，让速度快、便宜的小模型同时去提炼“局部摘要”。</li>
<li><strong>Reduce 阶段</strong>：把所有局部摘要拼成一张几千字的小表，送进大模型的大脑，完成终极拼图。上下文永远不会爆。</li>
</ul>
<h4 id="防火墙-3-长文本感知调度-chunked-prefill-vllm" tabindex="-1"><a class="header-anchor" href="#防火墙-3-长文本感知调度-chunked-prefill-vllm"><span>防火墙 3：长文本感知调度（Chunked Prefill &amp; vLLM）</span></a></h4>
<p>如果是在你自己部署的端到端服务器上发生物理卡死或 OOM（显存溢出）：</p>
<ul>
<li>必须在底层的推理引擎（如 vLLM）中开启 <strong>Chunked Prefill</strong> 算子。</li>
<li>它会把长文本的庞大 KV Cache（键值缓存）打碎成多个 Chunk 分批加载、分批预填，阻止首字生成时因为巨大的 Attention 矩阵突发挤爆显卡显存。</li>
</ul>
<hr>
<h3 id="三、-混合多模态-长-pdf-的最终大绝招-raptor" tabindex="-1"><a class="header-anchor" href="#三、-混合多模态-长-pdf-的最终大绝招-raptor"><span>三、 混合多模态：长 PDF 的最终大绝招（RAPTOR）</span></a></h3>
<p>如果你面对的是逻辑错综复杂的教科书或研报，目前学术界和工业界最推崇的高阶长 PDF 方案是 <strong>RAPTOR（Recursive Abstractive Processing for Tree-Organized Retrieval）</strong>。</p>
<ul>
<li><strong>它的做法</strong>：</li>
</ul>
<ol>
<li>先把 PDF 切成底层的底层底层小 Chunks（叶子节点）。</li>
<li>用大模型把这些相邻的小 Chunks <strong>聚类并各自生成一份“高层摘要”</strong>（变成父节点）。</li>
<li>再对父节点继续聚类、生成摘要，在后台构建出一棵<strong>递归的知识树（Tree Structure）</strong>。</li>
</ol>
<ul>
<li><strong>检索时</strong>：当用户问宏观问题，系统去树的顶部直接捞“大高层摘要”；当用户问微观细节，系统顺着树枝去底部捞“细节小 Chunk”。通过在知识树上做自适应路由，用几千字就能直接概括几百万字的 PDF 精髓，优雅地在物理上绕过了任何上下文窗口的硬件限制。</li>
</ul>
<p>你现在处理的长 PDF 大概是多少页的体量？其核心内容是文本密集型（如小说、法律条文），还是包含了海量的财务结构化表格？</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};