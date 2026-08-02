import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/%E5%A4%9A%E6%A8%A1%E6%80%81RAG.html","title":"多模态RAG","lang":"zh-CN","frontmatter":{"title":"多模态RAG","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"多模态 RAG（Multimodal Retrieval-Augmented Generation） 是传统文本 RAG 的终极演进形态。 传统 RAG 的世界观里只有“纯文字”。而多模态 RAG 的核心定义是：允许输入（Query）、检索到的知识库数据、以及最终生成的答案，跨越文本、图像、图表、音频和视频等多种模态。 举个实战直观的例子：用户上传一张...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"多模态RAG\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/%E5%A4%9A%E6%A8%A1%E6%80%81RAG.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"多模态RAG"}],["meta",{"property":"og:description","content":"多模态 RAG（Multimodal Retrieval-Augmented Generation） 是传统文本 RAG 的终极演进形态。 传统 RAG 的世界观里只有“纯文字”。而多模态 RAG 的核心定义是：允许输入（Query）、检索到的知识库数据、以及最终生成的答案，跨越文本、图像、图表、音频和视频等多种模态。 举个实战直观的例子：用户上传一张..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":4.54,"words":1363},"filePathRelative":"posts/AI大模型/Agent应用开发/第三阶段_拥抱生态与框架_(工程化)/多模态RAG.md","excerpt":"<p><strong>多模态 RAG（Multimodal Retrieval-Augmented Generation）</strong> 是传统文本 RAG 的终极演进形态。</p>\\n<p>传统 RAG 的世界观里只有“纯文字”。而多模态 RAG 的核心定义是：<strong>允许输入（Query）、检索到的知识库数据、以及最终生成的答案，跨越文本、图像、图表、音频和视频等多种模态。</strong></p>\\n<p>举个实战直观的例子：用户上传一张手机电路板照片问：“这个电容烧了，该怎么修？”系统去后台几万页的 PDF 技术手册中，精准打捞出带有<strong>对应电路拓扑图和原理文字</strong>的页面，让多模态大模型（VLM）对照着图表，手把手教用户焊接修复。这就是典型的多模态 RAG。</p>","autoDesc":true}`),i={name:`多模态RAG.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p><strong>多模态 RAG（Multimodal Retrieval-Augmented Generation）</strong> 是传统文本 RAG 的终极演进形态。</p>
<p>传统 RAG 的世界观里只有“纯文字”。而多模态 RAG 的核心定义是：<strong>允许输入（Query）、检索到的知识库数据、以及最终生成的答案，跨越文本、图像、图表、音频和视频等多种模态。</strong></p>
<p>举个实战直观的例子：用户上传一张手机电路板照片问：“这个电容烧了，该怎么修？”系统去后台几万页的 PDF 技术手册中，精准打捞出带有<strong>对应电路拓扑图和原理文字</strong>的页面，让多模态大模型（VLM）对照着图表，手把手教用户焊接修复。这就是典型的多模态 RAG。</p>
<hr>
<h3 id="一、-多模态-rag-的三大工业界架构派系" tabindex="-1"><a class="header-anchor" href="#一、-多模态-rag-的三大工业界架构派系"><span>一、 多模态 RAG 的三大工业界架构派系</span></a></h3>
<p>目前在落地多模态 RAG 系统时，业界根据“何时将图像/图表打碎翻译”，分成了三种完全不同的物理架构路线：</p>
<h4 id="派系-1-文本桥梁模式-text-to-text-bridge" tabindex="-1"><a class="header-anchor" href="#派系-1-文本桥梁模式-text-to-text-bridge"><span>派系 1：文本桥梁模式（Text-to-Text Bridge）</span></a></h4>
<p>这是开发成本最低、最传统的做法（即我们前文讨论复杂 PDF 时的处理策略）。</p>
<ul>
<li><strong>物理流向</strong>：在数据入库（Ingestion）阶段，使用多模态小模型把图片、图表全部强制翻译成纯文本描述（Caption）。</li>
<li><strong>存储与检索</strong>：只使用传统的<strong>纯文本 Embedding 模型</strong>和纯文本向量库。</li>
<li><strong>优缺点</strong>：架构完全沿用老一套文本 RAG，极省成本。但缺点是<strong>语义损失灾难性</strong>。如果用户问“哪个元器件的位置在角落”，Caption 的纯文本很难精确描述出复杂的空间几何坐标和像素细节。</li>
</ul>
<h4 id="派系-2-多向量混部模式-multi-vector-store" tabindex="-1"><a class="header-anchor" href="#派系-2-多向量混部模式-multi-vector-store"><span>派系 2：多向量混部模式（Multi-Vector Store）</span></a></h4>
<p>这是 LangChain、LlamaIndex 等现代框架官方非常推崇的实用模式。</p>
<ul>
<li><strong>物理流向</strong>：文档中的纯文本归纯文本。文档里的图片抽出来，通过多模态大模型生成一份文本 Summary（摘要）。</li>
<li><strong>存储与检索</strong>：在向量库里，<strong>让图片的“纯文本摘要”和“原始图片物理路径”通过同一个 Key 绑定在多向量检索器（Multi-Vector Retriever）中</strong>。检索时，通过文字摘要把图片 ID 捞出来。</li>
<li><strong>最终生成</strong>：在生成阶段，系统不把图片摘要喂给模型，而是<strong>把原始图片文件（Raw Image Base64）直接和文本 Context 一起灌进多模态大模型（如 GPT-4o、Claude 3.5 Sonnet）</strong>。让多模态模型用原生视觉直接去肉眼看图表，生成高质量答案。</li>
</ul>
<h4 id="派系-3-原生跨模态空间对齐模式-native-multimodal-embedding" tabindex="-1"><a class="header-anchor" href="#派系-3-原生跨模态空间对齐模式-native-multimodal-embedding"><span>派系 3：原生跨模态空间对齐模式（Native Multimodal Embedding）</span></a></h4>
<p>这是最硬核、体验最丝滑，也代表未来的前沿架构。</p>
<ul>
<li><strong>物理流向</strong>：彻底干掉任何中间层的 Caption 翻译。</li>
<li><strong>核心引擎</strong>：引入真正的<strong>多模态向量化模型（如英伟达的 NeVA、OpenAI 的 CLIP、Google 的 Vertex Multimodal Embedding）</strong>。这类模型能将图片像素和文本字符，直接投影到同一个大一统的高维几何空间（Shared Embedding Space）中。</li>
<li><strong>物理操作</strong>：</li>
<li>“一句话”对应的向量，和“一张架构图”对应的向量，维度完全一致。</li>
<li>如果一句话描述的内容正好和一张图表达的意思高度吻合，它们在空间中的<strong>余弦相似度会无限接近 1</strong>。</li>
<li><strong>检索超能力</strong>：系统不仅支持输入文字找图，更支持“输入图片找图片”<strong>、</strong>“输入图片找相关文字段落”。</li>
</ul>
<hr>
<h3 id="二、-多模态-rag-的核心工程痛点" tabindex="-1"><a class="header-anchor" href="#二、-多模态-rag-的核心工程痛点"><span>二、 多模态 RAG 的核心工程痛点</span></a></h3>
<p>当模态变多之后，系统的复杂度呈指数级上升，开发时有三个物理级深水坑必须提防：</p>
<ol>
<li><strong>多模态文本块跨页切分（Cross-page Splitting）</strong>：<br>
一张系统流程图往往跨越了 PDF 的第 12 页到第 13 页，而正文解释文字在第 14 页。如果你的 Chunk 策略只按固定字数切，会导致图、表、文在空间上彻底脱节，检索时无法协同。必须采用逻辑页面合并（Layout-based Anchoring）将它们锁在一个逻辑块内。</li>
<li><strong>向量数据库的异构混合检索效率</strong>：<br>
原生多模态 Embedding 虽然美妙，但目前在小文本和特定工业领域专有名词上的检索锐利度，依然比不上传统关键词（BM25）。因此在多模态 RAG 中，<strong>多路并发检索 + RRF 融合算子</strong>依然是标配——文字路用 BM25+BGE，图像路用 CLIP+原生多模态向量。</li>
<li><strong>多模态重排（Multimodal Reranker）的匮乏</strong>：<br>
传统的 Reranker（如 BGE-Reranker）只认文本。当向量库吐出 10 张相似的拓扑图时，如何在上游对这 10 张图的视觉细节相关性进行二次精准重排，是目前全行业 Infra 团队正在集中攻坚的领域。</li>
</ol>
<hr>
<h3 id="三、-经典应用场景" tabindex="-1"><a class="header-anchor" href="#三、-经典应用场景"><span>三、 经典应用场景</span></a></h3>
<ul>
<li><strong>智能工业维修与车载 ADAS 手册</strong>：通过摄像头拍下故障机械部件，自动匹配维修白皮书里的拆解工程 3D 图。</li>
<li><strong>多模态财报/证券研报分析</strong>：大批量吞噬财报中的 K 线图、饼状图、折线表，自动归纳宏观经济周期。</li>
<li><strong>医疗多模态影像辅助判读</strong>：结合患者的病历文本描述，去 RAG 检索海量的历史医学 CT/MRI 图像库，辅助医生判断罕见病灶。</li>
</ul>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};