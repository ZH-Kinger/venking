import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/Chunk.html","title":"Chunk","lang":"zh-CN","frontmatter":{"title":"Chunk","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"在大模型（LLM）与 AI Infra 的技术生态中，Chunk（分块/切片） 指的是将长文本、大规模数据集、或者超长上下文的激活值，按照一定的物理规则切割而成的、更小且相对独立的连续数据块。 根据你所处的具体技术管道（是做大模型应用层的 RAG，还是做底层算子编译与显存分配），Chunk 扮演着完全不同的三种物理角色： 1. 知识库与 RAG 层的“...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Chunk\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/Chunk.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"Chunk"}],["meta",{"property":"og:description","content":"在大模型（LLM）与 AI Infra 的技术生态中，Chunk（分块/切片） 指的是将长文本、大规模数据集、或者超长上下文的激活值，按照一定的物理规则切割而成的、更小且相对独立的连续数据块。 根据你所处的具体技术管道（是做大模型应用层的 RAG，还是做底层算子编译与显存分配），Chunk 扮演着完全不同的三种物理角色： 1. 知识库与 RAG 层的“..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.68,"words":1103},"filePathRelative":"posts/AI大模型/Agent应用开发/第三阶段_拥抱生态与框架_(工程化)/Chunk.md","excerpt":"<p>在大模型（LLM）与 AI Infra 的技术生态中，<strong>Chunk（分块/切片）</strong> 指的是<strong>将长文本、大规模数据集、或者超长上下文的激活值，按照一定的物理规则切割而成的、更小且相对独立的连续数据块。</strong></p>\\n<p>根据你所处的具体技术管道（是做大模型应用层的 RAG，还是做底层算子编译与显存分配），<strong>Chunk 扮演着完全不同的三种物理角色：</strong></p>\\n<hr>\\n<h3>1. 知识库与 RAG 层的“检索积木”（Text Chunking）</h3>\\n<p>这是在开发大模型应用（如 LangChain、LlamaIndex 或企业本地知识库）时最常听到的定义。</p>","autoDesc":true}`),i={name:`Chunk.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在大模型（LLM）与 AI Infra 的技术生态中，<strong>Chunk（分块/切片）</strong> 指的是<strong>将长文本、大规模数据集、或者超长上下文的激活值，按照一定的物理规则切割而成的、更小且相对独立的连续数据块。</strong></p>
<p>根据你所处的具体技术管道（是做大模型应用层的 RAG，还是做底层算子编译与显存分配），<strong>Chunk 扮演着完全不同的三种物理角色：</strong></p>
<hr>
<h3 id="_1-知识库与-rag-层的-检索积木-text-chunking" tabindex="-1"><a class="header-anchor" href="#_1-知识库与-rag-层的-检索积木-text-chunking"><span>1. 知识库与 RAG 层的“检索积木”（Text Chunking）</span></a></h3>
<p>这是在开发大模型应用（如 LangChain、LlamaIndex 或企业本地知识库）时最常听到的定义。</p>
<ul>
<li><strong>物理本质</strong>：大模型的单次输入是有上下文窗口限制的（比如 128K Token）。你不可能把一本 50 万字的产品手册一次性全部塞进大模型，更不可能把整本书直接转成一个向量（Vector），因为这样会导致语义被极度稀疏化。</li>
<li><strong>做法</strong>：通过 <strong>Chunking（切片算法）</strong>，把长文档切成很多个固定大小（如 512 个字符）的 <strong>Chunk</strong>。</li>
<li><strong>高级切片机理（Overlap 机制）</strong>：<br>
为了防止一句话正好在切分点被强行咔嚓切断、导致上下文语义丢失，工程师通常会设置一个重叠度（Overlap）。例如：</li>
<li><code v-pre>Chunk 1</code> 存储第 1 到 500 个字。</li>
<li><code v-pre>Chunk 2</code> 存储第 400 到 900 个字（400-500 字是重叠区）。</li>
<li><strong>流向</strong>：这些文本 Chunk 会被送去 Embedding（向量化），然后存入向量数据库。当用户提问时，系统精准捞出相关的 3 个 Chunk 喂给大模型。</li>
</ul>
<hr>
<h3 id="_2-底层算子与显存优化层的-tile-数据方块-computation-chunking" tabindex="-1"><a class="header-anchor" href="#_2-底层算子与显存优化层的-tile-数据方块-computation-chunking"><span>2. 底层算子与显存优化层的“Tile 数据方块”（Computation Chunking）</span></a></h3>
<p>如果你在编写类似 <strong>Triton 算子</strong>、<strong>FlashAttention</strong>，或者在优化大规模矩阵乘法（GEMM）时，Chunk 的含义会直接下沉到硬件级。</p>
<ul>
<li><strong>物理本质</strong>：在显卡硬件层面，由于主显存（HBM）的读取延迟非常高，而片上缓存（SRAM/Shared Memory）空间极度有限（往往只有几百 KB）。</li>
<li><strong>做法</strong>：面对大模型前向传播中巨大的 $Q, K, V$ 矩阵或长文本序列，算子编译器（如 Triton）会将注意力矩阵沿着序列长度（Sequence Length）轴切成一粒一粒的 <strong>Chunk（在硬件领域通常也叫 Tile，即数据小方块）</strong>。</li>
<li><strong>工作流</strong>：</li>
</ul>
<ol>
<li>每次只将一个 <code v-pre>128 x 64</code> 的 <strong>Chunk</strong> 数据从 HBM 拉进 SRAM。</li>
<li>让 Tensor Core 当场在片上把这个 Chunk 内部的 Softmax 和矩阵乘法暴算完。</li>
<li>立刻擦除，换下一个 Chunk 进来。<br>
<em>这套通过将计算任务划分为物理 Chunk 的流水线，正是 FlashAttention 能够为大模型长文本训练节省几十 GB 显存的物理底牌。</em></li>
</ol>
<hr>
<h3 id="_3-多通道长文本推理层-chunked-prefill" tabindex="-1"><a class="header-anchor" href="#_3-多通道长文本推理层-chunked-prefill"><span>3. 多通道长文本推理层（Chunked Prefill）</span></a></h3>
<p>在现代大模型高性能推理引擎（如 vLLM、TensorRT-LLM）中，Chunk 还有一种非常硬核的动态调度定义 —— <strong>Chunked Prefill（分块首字预填）</strong>。</p>
<ul>
<li><strong>传统痛点</strong>：当用户向大模型一口气输入一个 32K Token 的超级长文本时，推理引擎需要经历一个 <strong>Prefill（首字预填）</strong> 阶段。此时 GPU 会因为当场暴算超大矩阵而进入短时间的“卡顿”状态（Compute-Bound），导致其他正在生成文本（Decode）的用户发生严重的吐字抖动和延迟。</li>
<li><strong>Chunk 优化法</strong>：现代推理引擎引入了 Chunked Prefill 技术。它将这 32K 的超长 Prompt 切成若干个固定长度（例如每次只吞 512 个 Token）的 <strong>Chunk</strong>。</li>
<li><strong>调度魔术</strong>：引擎把这个超长任务打散，在每一个时间步（Step）里，<strong>让长文本的一个小 Chunk 与其他用户的 Decode 请求混合（Piggyback）在一起提交给 GPU</strong>。通过这种细粒度的分块吞吐，完美熨平了服务器的瞬时算力洪峰，大幅拉低了大模型线上服务的平均响应延迟。</li>
</ul>
<hr>
<h3 id="💡-极简物理总结" tabindex="-1"><a class="header-anchor" href="#💡-极简物理总结"><span>💡 极简物理总结</span></a></h3>
<p>在大模型世界里：</p>
<ul>
<li>在<strong>应用和数仓层</strong>：Chunk 是<strong>把一本书切成的一段段标准长度的文本段落</strong>，用来做向量检索。</li>
<li>在<strong>算子与硬件层</strong>：Chunk 是<strong>把巨大矩阵打碎成的、能塞进显卡 SRAM 晶体管里暴算的小数据方块</strong>。</li>
<li>在<strong>高性能推理层</strong>：Chunk 是<strong>把超长 Prompt 拆细、分批喂给 GPU 的动态调度单元</strong>。</li>
</ul>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};