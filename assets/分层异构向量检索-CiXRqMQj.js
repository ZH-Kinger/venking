import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/%E5%A4%9A%E6%A8%A1%E6%80%81RAG/%E5%88%86%E5%B1%82%E5%BC%82%E6%9E%84%E5%90%91%E9%87%8F%E6%A3%80%E7%B4%A2.html","title":"分层异构向量检索","lang":"zh-CN","frontmatter":{"title":"分层异构向量检索","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"可以，而且这正是工业级、高性能 RAG 系统在架构演进时的必经之路。在 Infra（基础设施）领域，这种架构被称为“分层异构向量检索（Tiered &amp; Heterogeneous Vector Indexing）”。 如果把一个包含图片、表格、正文、目录的大型知识库无脑塞进同一个向量空间，不同模态的数据会发生严重的“语义稀疏与互撞”（比如图片的...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"分层异构向量检索\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/%E5%A4%9A%E6%A8%A1%E6%80%81RAG/%E5%88%86%E5%B1%82%E5%BC%82%E6%9E%84%E5%90%91%E9%87%8F%E6%A3%80%E7%B4%A2.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"分层异构向量检索"}],["meta",{"property":"og:description","content":"可以，而且这正是工业级、高性能 RAG 系统在架构演进时的必经之路。在 Infra（基础设施）领域，这种架构被称为“分层异构向量检索（Tiered &amp; Heterogeneous Vector Indexing）”。 如果把一个包含图片、表格、正文、目录的大型知识库无脑塞进同一个向量空间，不同模态的数据会发生严重的“语义稀疏与互撞”（比如图片的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":4.7,"words":1410},"filePathRelative":"posts/AI大模型/Agent应用开发/第三阶段_拥抱生态与框架_(工程化)/多模态RAG/分层异构向量检索.md","excerpt":"<p>可以，而且这正是<strong>工业级、高性能 RAG 系统在架构演进时的必经之路</strong>。在 Infra（基础设施）领域，这种架构被称为“分层异构向量检索（Tiered &amp; Heterogeneous Vector Indexing）”。</p>\\n<p>如果把一个包含图片、表格、正文、目录的大型知识库无脑塞进同一个向量空间，不同模态的数据会发生严重的“语义稀疏与互撞”（比如图片的向量会把特定长文本的专有名词挤出 Top-K 候选池）。</p>\\n<p>为了完美破局，我们需要建立一套“按模态与结构分层分流（Layered Ingestion）”的高级架构。</p>\\n<hr>","autoDesc":true}`),i={name:`分层异构向量检索.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>可以，而且这正是<strong>工业级、高性能 RAG 系统在架构演进时的必经之路</strong>。在 Infra（基础设施）领域，这种架构被称为“分层异构向量检索（Tiered &amp; Heterogeneous Vector Indexing）”。</p>
<p>如果把一个包含图片、表格、正文、目录的大型知识库无脑塞进同一个向量空间，不同模态的数据会发生严重的“语义稀疏与互撞”（比如图片的向量会把特定长文本的专有名词挤出 Top-K 候选池）。</p>
<p>为了完美破局，我们需要建立一套“按模态与结构分层分流（Layered Ingestion）”的高级架构。</p>
<hr>
<h3 id="一、-黄金四层架构设计-the-4-layer-embedding-architecture" tabindex="-1"><a class="header-anchor" href="#一、-黄金四层架构设计-the-4-layer-embedding-architecture"><span>一、 黄金四层架构设计（The 4-Layer Embedding Architecture）</span></a></h3>
<p>针对你提到的混合 PDF，推荐在底层建立四个平行的 <strong>Vector Layers（向量层 / 命名空间）</strong>：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>                    【 物理混合 PDF 知识库 】</span></span>
<span class="line"><span>                               │</span></span>
<span class="line"><span>                               ▼ (通过 MinerU / Marker 视觉拆解分流)</span></span>
<span class="line"><span>     ┌───────────────────┬─────┴─────────────┬───────────────────┐</span></span>
<span class="line"><span>     ▼                   ▼                   ▼                   ▼</span></span>
<span class="line"><span> 【 Layer 1: 骨架层 】 【 Layer 2: 细节层 】 【 Layer 3: 表格层 】 【 Layer 4: 多模态层 】</span></span>
<span class="line"><span> (章节树 / 概要描述)   (切细的 Parent-Child) (Markdown / 键值对)  (架构图 / 流程图)</span></span>
<span class="line"><span>     │                   │                   │                   │</span></span>
<span class="line"><span>     ▼ (Embedding A)     ▼ (Embedding B)     ▼ (Embedding C)     ▼ (Embedding D)</span></span>
<span class="line"><span>  [ 骨架向量空间 ]      [ 细节短句空间 ]      [ 结构化表格空间 ]    [ 原生多模态空间 ]</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="layer-1-骨架层-structural-atlas-layer" tabindex="-1"><a class="header-anchor" href="#layer-1-骨架层-structural-atlas-layer"><span>Layer 1：骨架层（Structural / Atlas Layer）</span></a></h4>
<ul>
<li><strong>对象</strong>：PDF 的多级目录树、每一章的全局 Summary（摘要）、文档的元数据。</li>
<li><strong>物理方案</strong>：使用大窗口的文本 Embedding 模型（如 <code v-pre>text-embedding-3-large</code> 或 <code v-pre>BGE-m3</code>）。</li>
<li><strong>物理任务</strong>：<strong>高空粗筛</strong>。当用户问：“你们这个系统部署需要几步？”系统优先触发骨架层，瞬间锁定“第二章：安装部署”对应的所有 Chunk 族群，从上往下进行<strong>粗粒度路由（Routing）</strong>。</li>
</ul>
<h4 id="layer-2-细节正文层-granular-detail-layer" tabindex="-1"><a class="header-anchor" href="#layer-2-细节正文层-granular-detail-layer"><span>Layer 2：细节正文层（Granular Detail Layer）</span></a></h4>
<ul>
<li><strong>对象</strong>：PDF 的具体段落文本。</li>
<li><strong>物理方案</strong>：采用 <strong>父子块（Parent-Child）双层切片</strong>。子块控制在 100~200 Token，专门用来做稠密向量化。</li>
<li><strong>物理任务</strong>：<strong>定点爆破</strong>。专门应付“某个具体报错代码是什么含义”、“某个网络端口号是多少”这种微观细节检索。</li>
</ul>
<h4 id="layer-3-结构化表格层-structured-table-layer" tabindex="-1"><a class="header-anchor" href="#layer-3-结构化表格层-structured-table-layer"><span>Layer 3：结构化表格层（Structured Table Layer）</span></a></h4>
<ul>
<li><strong>对象</strong>：PDF 中提取出来的纯 Markdown 表格、资产负债表、参数对照表。</li>
<li><strong>物理方案</strong>：不要直接做文本 Embedding。先让大模型把表格转化为 <strong>Key-Value Pair（键值对）或者自然语言描述</strong>（例如：“该表格记录了 Llama 3 模型的推理吞吐量，当 Batch 为 1 时值为 42t/s”），然后对这串描述以及原始 Markdown 分别做 Embedding。</li>
<li><strong>物理任务</strong>：保护数据指标不串行，确保大模型对表格矩阵的检索召回率。</li>
</ul>
<h4 id="layer-4-多模态图像层-native-multimodal-layer" tabindex="-1"><a class="header-anchor" href="#layer-4-多模态图像层-native-multimodal-layer"><span>Layer 4：多模态图像层（Native Multimodal Layer）</span></a></h4>
<ul>
<li><strong>对象</strong>：PDF 里的架构拓扑图、时序图、算法流程图。</li>
<li><strong>物理方案</strong>：两条线选一种：</li>
<li><em>线 A</em>：用 VLM 算出的<strong>精细文本 Caption</strong> 存入独立分区。</li>
<li><em>线 B（更推荐）</em>：直接用原生多模态 Embedding 模型（如 <code v-pre>CLIP</code> 或 <code v-pre>Google Vertex Multimodal</code>）把图片像素转成高维向量，建立独立的<strong>图像向量索引区</strong>。</li>
<li><strong>物理任务</strong>：处理用户的图形提问，或者支持“以图找文”的高级检索。</li>
</ul>
<hr>
<h3 id="二、-在向量数据库中如何物理落地" tabindex="-1"><a class="header-anchor" href="#二、-在向量数据库中如何物理落地"><span>二、 在向量数据库中如何物理落地？</span></a></h3>
<p>在具体的向量库（如 Milvus、Qdrant 或 Pgvector）中实现上述四层分层，有三种成熟的工程手段：</p>
<ol>
<li><strong>物理隔离：独立 Collection（集合）—— 适合规模极大、模型不同的情况</strong><br>
如果你的 Layer 4 用了 CLIP 模型（512维），而 Layer 2 用了 BGE 模型（1024维），由于<strong>维度和数学模型完全不兼容</strong>，必须在数据库里开辟 4 个完全独立的 Collection。</li>
<li><strong>逻辑隔离：单 Collection + Partition/Namespace（分区）—— 适合模型相同的情况</strong><br>
如果 1~3 层你用的都是同一种文本 Embedding 模型，可以建一个大 Collection，内部开辟 3 个 Partition：<code v-pre>partition_structure</code>、<code v-pre>partition_text</code>、<code v-pre>partition_table</code>。检索时，通过添加过滤标签（Filter Tag）来实现分层检索。</li>
</ol>
<hr>
<h3 id="三、-分层之后的-多路融合检索-怎么做" tabindex="-1"><a class="header-anchor" href="#三、-分层之后的-多路融合检索-怎么做"><span>三、 分层之后的“多路融合检索”怎么做？</span></a></h3>
<p>分层之后，不能各玩各的，必须在最上层通过一个“路由与融合网关（Retriever Gateway）”重新拧成一股绳。这就是我们前面提到的 <strong>RAG-Fusion</strong> 机制的超级升级版：</p>
<ol>
<li><strong>用户发起 Query。</strong></li>
<li><strong>多层并发检索（Multi-tier Retrieval）</strong>：<br>
后台拉起 4 个并发线程（异步 IO），同时去 4 个 Layer 捞数据。每层各吐出各自的 Top-10 文档。</li>
<li><strong>异构融合与重排（Hybrid Rerank &amp; RRF）</strong>：</li>
</ol>
<ul>
<li>先过一道 <strong>RRF（倒数排名融合）</strong> 算子，把所有层召回的文档按照排位强行拉平合并。</li>
<li>紧接着挂载一个 <strong>Reranker（重排模型）</strong>，把合并后的 Top-30 文档做最后一轮针对原始提问的“交叉注意力打分”。</li>
</ul>
<ol start="4">
<li><strong>截断控窗（Context Control）</strong>：<br>
卡死只要最后的 Top-5（比如最终包含 1个表格、1个架构图的Caption、3个核心细节正文），打包灌入大模型上下文。</li>
</ol>
<h3 id="💡-这样做有什么降维打击级的优势" tabindex="-1"><a class="header-anchor" href="#💡-这样做有什么降维打击级的优势"><span>💡 这样做有什么降维打击级的优势？</span></a></h3>
<ul>
<li><strong>物理消灭上下文爆表</strong>：因为每一层各司其职，你不需要为了找一句话而把整章的废话都打包进去，精准度提升数倍。</li>
<li><strong>更新极度丝滑</strong>：如果 PDF 里只是改了一张架构图，你只需要去定点抹除并更新 Layer 4（多模态层）里的那一条向量记录，其他三层（正文、表格、骨架）的索引动都不用动。这极大地降低了大数据量下的知识库运维成本。</li>
</ul>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};