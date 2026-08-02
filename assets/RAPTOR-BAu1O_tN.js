import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/%E5%A4%9A%E6%A8%A1%E6%80%81RAG/%E9%95%BFPDF/RAPTOR.html","title":"RAPTOR","lang":"zh-CN","frontmatter":{"title":"RAPTOR","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"在大模型应用（RAG 知识库）领域，你提到的应该是 RAPTOR。 RAPTOR 全称是 Recursive Abstractive Processing for Tree-Organized Retrieval（基于树状组织检索的递归抽象处理）。这是斯坦福大学等机构在 2024 年提出的一种颠覆传统“扁平化切片”的顶级分层 RAG 索引技术。 如果说...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"RAPTOR\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/%E5%A4%9A%E6%A8%A1%E6%80%81RAG/%E9%95%BFPDF/RAPTOR.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"RAPTOR"}],["meta",{"property":"og:description","content":"在大模型应用（RAG 知识库）领域，你提到的应该是 RAPTOR。 RAPTOR 全称是 Recursive Abstractive Processing for Tree-Organized Retrieval（基于树状组织检索的递归抽象处理）。这是斯坦福大学等机构在 2024 年提出的一种颠覆传统“扁平化切片”的顶级分层 RAG 索引技术。 如果说..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":4.2,"words":1260},"filePathRelative":"posts/AI大模型/Agent应用开发/第三阶段_拥抱生态与框架_(工程化)/多模态RAG/长PDF/RAPTOR.md","excerpt":"<p>在大模型应用（RAG 知识库）领域，你提到的应该是 <strong>RAPTOR</strong>。</p>\\n<p><strong>RAPTOR</strong> 全称是 <strong>Recursive Abstractive Processing for Tree-Organized Retrieval（基于树状组织检索的递归抽象处理）</strong>。这是斯坦福大学等机构在 2024 年提出的一种<strong>颠覆传统“扁平化切片”的顶级分层 RAG 索引技术</strong>。</p>\\n<p>如果说传统的 RAG 只是把书本切成一堆散落的纸片（扁平 Chunk），那么 <strong>RAPTOR 就是在数据入库时，自动在知识库内部搭建起一座“知识金字塔（树状图）”</strong>。</p>","autoDesc":true}`),i={name:`RAPTOR.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在大模型应用（RAG 知识库）领域，你提到的应该是 <strong>RAPTOR</strong>。</p>
<p><strong>RAPTOR</strong> 全称是 <strong>Recursive Abstractive Processing for Tree-Organized Retrieval（基于树状组织检索的递归抽象处理）</strong>。这是斯坦福大学等机构在 2024 年提出的一种<strong>颠覆传统“扁平化切片”的顶级分层 RAG 索引技术</strong>。</p>
<p>如果说传统的 RAG 只是把书本切成一堆散落的纸片（扁平 Chunk），那么 <strong>RAPTOR 就是在数据入库时，自动在知识库内部搭建起一座“知识金字塔（树状图）”</strong>。</p>
<hr>
<h3 id="一、-传统-rag-的死穴-vs-raptor-的降维打击" tabindex="-1"><a class="header-anchor" href="#一、-传统-rag-的死穴-vs-raptor-的降维打击"><span>一、 传统 RAG 的死穴 vs RAPTOR 的降维打击</span></a></h3>
<ul>
<li><strong>传统 RAG 的无能为力</strong>：当你问一个微观问题（如“Triton 算子在 Batch=1 时的延迟是多少”），传统 RAG 很灵。但如果你问一个<strong>宏观全局问题</strong>（如“总结这本 300 页 PDF 里面所有的系统架构设计缺陷”，或者“对比本文中两种算法的优劣”），传统 RAG 捞出来的永远是局部碎片，大模型由于看不到“大局观”而彻底瘫痪。</li>
<li><strong>RAPTOR 的核心解法</strong>：通过“向量聚类 $\\to$ 大模型总结 $\\to$ 再次聚类”的递归操作，自底向上建立一棵编码了不同抽象层次语义的树。不管用户问得多宏观或多微观，它都能在树的对应高度上精准接住。</li>
</ul>
<hr>
<h3 id="二、-raptor-在后台具体是怎么做的-构建三部曲" tabindex="-1"><a class="header-anchor" href="#二、-raptor-在后台具体是怎么做的-构建三部曲"><span>二、 RAPTOR 在后台具体是怎么做的？（构建三部曲）</span></a></h3>
<p>它的底层流水线就像是一个自底向上的“情报提炼官”：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>       【 RAPTOR 树状金字塔构建流程 】</span></span>
<span class="line"><span></span></span>
<span class="line"><span>               [ 顶级父节点: 全书超级总括摘要 ] (Layer N)</span></span>
<span class="line"><span>                         ▲</span></span>
<span class="line"><span>                         │ (继续聚类总结)</span></span>
<span class="line"><span>             ┌───────────┴───────────┐</span></span>
<span class="line"><span>      [ 摘要节点 A: 第二章大意 ]  [ 摘要节点 B: 第三章大意 ] (Layer 1)</span></span>
<span class="line"><span>             ▲                       ▲</span></span>
<span class="line"><span>             │ (GMM 聚类 + LLM 总结)  │</span></span>
<span class="line"><span>       ┌─────┴─────┐           ┌─────┴─────┐</span></span>
<span class="line"><span>    [Chunk1]    [Chunk2]    [Chunk3]    [Chunk4] (Layer 0: 原始100字叶子节点)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li><strong>第一步：叶子节点打底（Leaf Embedding）</strong><br>
把长文档切成非常小的标准连续文本块（比如每块只有 100 个 Token），算好向量。这些最底层的细节碎块，就是树的<strong>叶子节点（Layer 0）</strong>。</li>
<li><strong>第二步：高斯混合软聚类（GMM Clustering）</strong>使用 <strong>高斯混合模型（GMM）</strong> 对这些叶子节点的向量进行聚类。为什么要用 GMM？因为它是“软聚类”，<strong>允许一个 Chunk 同时属于多个簇（Cluster）</strong>。<em>(比如一段讲“GPU 显存优化”的文字，既属于“硬件层”簇，也属于“性能调优”簇，完美符合人类语言的交叉性)。</em></li>
<li><strong>第三步：递归抽象总结（Recursive Summarization）</strong><br>
后台调用大模型，把同一个簇里关联的所有 Chunk 文本融合在一起，让大语言模型<strong>强行写一段高浓度摘要</strong>。<br>
这段摘要生成后，也算出它的 Embedding 向量，作为这一簇兄弟节点的<strong>父节点（Parent Node）</strong>。</li>
<li><strong>死循环直至封顶</strong>：<br>
把这些新生成的父节点当成新的输入，重复步骤 2 和 3（继续聚类、继续写摘要），直到最后聚不出新簇为止，最终收敛结出一棵<strong>宏观语义树</strong>。</li>
</ol>
<hr>
<h3 id="三、-检索-inference-时的两种策略" tabindex="-1"><a class="header-anchor" href="#三、-检索-inference-时的两种策略"><span>三、 检索（Inference）时的两种策略</span></a></h3>
<p>当用户发起提问时，RAPTOR 提供了两种极聪明的打捞策略：</p>
<ul>
<li><strong>策略 A：树状遍历扫描（Tree Traversal）</strong><br>
从树根（最宏观的摘要）开始往下搜。如果查询向量和某个大方向的摘要相似度很高，就顺着这个树枝往下层继续检索细节。</li>
<li><strong>策略 B：全树拍扁打平（Collapsed Tree）—— 实验证明效果最好</strong><br>
把这棵树里所有的节点（<strong>无论是最底层的 100 字细节 Chunk，还是中间层的章节摘要，甚至顶层的全书大纲</strong>）全部拉平，塞进同一个向量索引池子里。<br>
计算用户提问与所有节点的相似度，直接捞出前 $K$ 个节点。如果用户问的是宏观大局，系统会自然捞出好几个“摘要节点”；如果问的是微观数据，系统会自然捞出“叶子节点”。</li>
</ul>
<hr>
<h3 id="四、-总结与实战建议" tabindex="-1"><a class="header-anchor" href="#四、-总结与实战建议"><span>四、 总结与实战建议</span></a></h3>
<p>在论文实验中，RAPTOR 配合 GPT-4 在复杂长文本问答（如 QuALITY 基准测试）中，<strong>比传统扁平 RAG 的准确率直接暴涨了 20%</strong>。</p>
<p><strong>⚠️</strong> <strong>工业落地闭坑警示：</strong><br>
虽然 RAPTOR 降维打击了长文本归纳，但在工程中它有一个明显的<strong>性能阿喀琉斯之踵</strong> —— <strong>入库（Ingestion）极度昂贵且慢</strong>。因为构建树时要对海量簇疯狂调用 LLM 算摘要，Token 消耗和时间延迟极大。</p>
<p><strong>最佳实践：</strong><br>
在搭建知识库时，<strong>不要全量无脑盲目上 RAPTOR</strong>。应该将其作为特定 Layer（如前文讨论的“骨架层 / 概要层”）的生成器，专门用来对付企业规章制度、超长年报的宏观摘要提取，而底层的微观正文，依然走标准的父子块（Parent-Child）映射，用空间换精度，达成最完美的工程 ROI（投资回报率）。</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};