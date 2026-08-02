import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/LangChain/%E5%90%91%E9%87%8F%E6%95%B0%E6%8D%AE%E5%BA%93/Embedding.html","title":"Embedding","lang":"zh-CN","frontmatter":{"title":"Embedding","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"简在机器学习和大语言模型（LLM）的语境下，Embedding（嵌入，或称向量嵌入） 是一种将现实世界中高维且非结构化的离散数据（如汉字、英文单词、整篇文章、物理图片、音频甚至用户行为），转化为低维、连续、密集实数向量（Vector）的数学方法。 它是现代人工智能和主流大模型的底层视觉与通用通行证。如果没有 Embedding，AI 就无法理解和计算任...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Embedding\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/LangChain/%E5%90%91%E9%87%8F%E6%95%B0%E6%8D%AE%E5%BA%93/Embedding.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"Embedding"}],["meta",{"property":"og:description","content":"简在机器学习和大语言模型（LLM）的语境下，Embedding（嵌入，或称向量嵌入） 是一种将现实世界中高维且非结构化的离散数据（如汉字、英文单词、整篇文章、物理图片、音频甚至用户行为），转化为低维、连续、密集实数向量（Vector）的数学方法。 它是现代人工智能和主流大模型的底层视觉与通用通行证。如果没有 Embedding，AI 就无法理解和计算任..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":6.08,"words":1823},"filePathRelative":"posts/AI大模型/Agent应用开发/第三阶段_拥抱生态与框架_(工程化)/LangChain/向量数据库/Embedding.md","excerpt":"<p>简在机器学习和大语言模型（LLM）的语境下，<strong>Embedding（嵌入，或称向量嵌入）</strong> 是一种将现实世界中<strong>高维且非结构化的离散数据</strong>（如汉字、英文单词、整篇文章、物理图片、音频甚至用户行为），转化为低维、连续、密集实数向量（Vector）的数学方法。</p>\\n<p>它是现代人工智能和主流大模型的<strong>底层视觉与通用通行证</strong>。如果没有 Embedding，AI 就无法理解和计算任何现实世界中的符号。</p>\\n<p>为了帮你彻底吃透这个概念，我们从它的解决痛点、数学本质、物理工作机理以及工业界实战场景进行深度拆解：</p>","autoDesc":true}`),i={name:`Embedding.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>简在机器学习和大语言模型（LLM）的语境下，<strong>Embedding（嵌入，或称向量嵌入）</strong> 是一种将现实世界中<strong>高维且非结构化的离散数据</strong>（如汉字、英文单词、整篇文章、物理图片、音频甚至用户行为），转化为低维、连续、密集实数向量（Vector）的数学方法。</p>
<p>它是现代人工智能和主流大模型的<strong>底层视觉与通用通行证</strong>。如果没有 Embedding，AI 就无法理解和计算任何现实世界中的符号。</p>
<p>为了帮你彻底吃透这个概念，我们从它的解决痛点、数学本质、物理工作机理以及工业界实战场景进行深度拆解：</p>
<hr>
<h3 id="一、-为什么要引入-embedding-它干掉了什么痛点" tabindex="-1"><a class="header-anchor" href="#一、-为什么要引入-embedding-它干掉了什么痛点"><span>一、 为什么要引入 Embedding？（它干掉了什么痛点）</span></a></h3>
<p>在 AI 领域，计算机本质上只能做高频的数学运算（如矩阵乘加 $A \\times B + C$），它根本不认识字母或符号。要想让电脑处理文字，最初的办法是 <strong>One-Hot Encoding（独热编码）</strong>。</p>
<h4 id="_1-传统-one-hot-的灾难" tabindex="-1"><a class="header-anchor" href="#_1-传统-one-hot-的灾难"><span>1. 传统 One-Hot 的灾难</span></a></h4>
<p>假设我们的词典里只有 4 个词：<code v-pre>['狗', '猫', '狼', '苹果']</code>。<br>
用 One-Hot 表示它们：</p>
<ul>
<li>狗 = <code v-pre>[1, 0, 0, 0]</code></li>
<li>猫 = <code v-pre>[0, 1, 0, 0]</code></li>
<li>狼 = <code v-pre>[0, 0, 1, 0]</code></li>
<li>苹果 = <code v-pre>[0, 0, 0, 1]</code></li>
</ul>
<p><strong>致命缺陷：</strong></p>
<ul>
<li><strong>维度灾难</strong>：如果中文词典有 10 万个词，每个词向量的长度就是 10 万维，但其中 99.99% 的位置全是 0（极度稀疏），这会瞬间挤爆 GPU 的存储（SRAM/HBM）。</li>
<li><strong>语义孤岛（最致命）</strong>：在数学上，任意两个 One-Hot 向量进行点积（Dot Product）计算，结果永远是 <strong>0</strong>。这意味着在算法眼里，<strong>“狗”和“狼”的亲缘关系，与“狗”和“苹果”的亲缘关系完全一样</strong>。这彻底抹杀了现实语言的“上下文语义”。</li>
</ul>
<h4 id="_2-embedding-的降维打击" tabindex="-1"><a class="header-anchor" href="#_2-embedding-的降维打击"><span>2. Embedding 的降维打击</span></a></h4>
<p>Embedding 通过算法学习，把高维稀疏的符号压缩进一个固定维度（如 768 维、1536 维或 3072 维）的连续数学空间中。<br>
在这个新空间里，每个位置不再是 0 或 1，而是变成了类似 <code v-pre>[-0.23, 0.45, 0.89, ...]</code> 这样的浮点数。最神奇的是：<strong>含义相近的词，在空间中的物理距离会非常接近</strong>。</p>
<hr>
<h3 id="二、-数学层面的本质-语义空间与向量夹角" tabindex="-1"><a class="header-anchor" href="#二、-数学层面的本质-语义空间与向量夹角"><span>二、 数学层面的本质：语义空间与向量夹角</span></a></h3>
<p>Embedding 的核心魔法在于<strong>语义几何化</strong>。算法在海量语料库中通过自监督学习，自动解析出了符号背后的“特征维度”。</p>
<p>虽然在机器里这个维度通常是 1536 维（人类无法直观想象），但我们可以将其简化到 <strong>3维坐标系</strong> 中来理解：<br>
假设坐标轴的三个维度分别代表：【是不是动物】、【是不是犬科】、【是不是水果】。</p>
<ul>
<li><strong>狗</strong> 的坐标 $\\approx$ <code v-pre>[0.99, 0.95, 0.01]</code></li>
<li><strong>狼</strong> 的坐标 $\\approx$ <code v-pre>[0.99, 0.89, 0.00]</code></li>
<li><strong>苹果</strong> 的坐标 $\\approx$ <code v-pre>[0.00, 0.00, 0.98]</code></li>
</ul>
<h4 id="📐-如何衡量语义相似度" tabindex="-1"><a class="header-anchor" href="#📐-如何衡量语义相似度"><span>📐 如何衡量语义相似度？</span></a></h4>
<p>在离散语境下，我们用 <code v-pre>grep</code> 只能匹配字面量。但在向量空间里，我们要找“意思相近”的内容，只需要计算两个向量的 <strong>余弦相似度（Cosine Similarity）</strong>：</p>
<p>$$<br>
\\text{Similarity} = \\cos(\\theta) = \\frac{A \\cdot B}{|A| |B|}<br>
$$</p>
<ul>
<li>计算 <strong>狗</strong> 和 <strong>狼</strong> 的向量夹角 $\\theta$，会发现 $\\cos(\\theta) \\approx 0.92$（夹角极小，语义高度相似）。</li>
<li>计算 <strong>狗</strong> 和 <strong>苹果</strong> 的向量夹角，会发现 $\\cos(\\theta) \\approx 0.02$（相互垂直，毫无语义关联）。</li>
</ul>
<h4 id="经典的-语义向量代数" tabindex="-1"><a class="header-anchor" href="#经典的-语义向量代数"><span>经典的“语义向量代数”</span></a></h4>
<p>因为语义被完全数学化了，向量之间甚至可以做加减法：</p>
<p>$$<br>
\\text{Vector(&quot;国王&quot;)} - \\text{Vector(&quot;男人&quot;)} + \\text{Vector(&quot;女人&quot;)} \\approx \\text{Vector(&quot;女王&quot;)}<br>
$$</p>
<p>$$<br>
\\text{Vector(&quot;巴黎&quot;)} - \\text{Vector(&quot;法国&quot;)} + \\text{Vector(&quot;中国&quot;)} \\approx \\text{Vector(&quot;北京&quot;)}<br>
$$</p>
<hr>
<h3 id="三、-在大模型大工厂里-embedding-位于哪一步" tabindex="-1"><a class="header-anchor" href="#三、-在大模型大工厂里-embedding-位于哪一步"><span>三、 在大模型大工厂里，Embedding 位于哪一步？</span></a></h3>
<p>在任何大模型（如 GPT-4、Llama）的执行流水线中，Embedding 都是<strong>大门守护者（第一层）</strong>和<strong>出口押运员（最后一层）</strong>。</p>
<h4 id="_1-前向计算中的-token-embedding-文字转向量" tabindex="-1"><a class="header-anchor" href="#_1-前向计算中的-token-embedding-文字转向量"><span>1. 前向计算中的 Token Embedding（文字转向量）</span></a></h4>
<p>当你向模型输入一句话：<code v-pre>&quot;我喜欢自行车&quot;</code>。</p>
<ol>
<li><strong>Tokenizer（分词器）</strong> 先把句子切碎并变成词表 ID：<code v-pre>[234, 1098, 4567]</code>。</li>
<li><strong>Embedding Layer</strong>（本质上是一个超大的权重查找表 $M \\times N$）启动。根据 ID 去索引，瞬间将这三个数字转换为三个 $1536$ 维的浮面向量。</li>
<li>大模型真正的矩阵绞肉机（Transformer Layer / Tensor Core）接管，开始在这个向量矩阵上疯狂进行 Attention 注意力计算。</li>
</ol>
<h4 id="_2-多模态中的-cross-modal-embedding-图片文字连连看" tabindex="-1"><a class="header-anchor" href="#_2-多模态中的-cross-modal-embedding-图片文字连连看"><span>2. 多模态中的 Cross-Modal Embedding（图片文字连连看）</span></a></h4>
<p>像 CLIP、GPT-4o 这样的多模态大模型，之所以能做到“看图说话”，是因为多模态 Embedding 技术。</p>
<ul>
<li>一个图片编码器（Vision Encoder）把一张“金毛寻回犬”的物理图片压缩成一个 1024 维向量。</li>
<li>一个文本编码器（Text Encoder）把一句<code v-pre>&quot;一只奔跑的金色小狗&quot;</code>也压缩成一个 1024 维向量。</li>
<li><strong>调优目标</strong>：让这两个来自不同物理世界的向量，在数学空间里精准地重叠在同一个坐标点上。由此，大模型成功打通了视觉与听觉的语义隔阂。</li>
</ul>
<hr>
<h3 id="四、-工业界四大-rag-ai-杀手级实战场景" tabindex="-1"><a class="header-anchor" href="#四、-工业界四大-rag-ai-杀手级实战场景"><span>四、 工业界四大 RAG / AI 杀手级实战场景</span></a></h3>
<p>理解了 Embedding，你就理解了目前整个大模型应用生态（AI Agent / RAG）的半壁江山：</p>
<h4 id="_1-rag-检索增强生成-与向量数据库" tabindex="-1"><a class="header-anchor" href="#_1-rag-检索增强生成-与向量数据库"><span>1. RAG（检索增强生成）与向量数据库</span></a></h4>
<p>这是目前大厂解决大模型“胡说八道（幻觉）”的最主流方案：</p>
<ul>
<li><strong>离线阶段</strong>：把公司全量几万篇 PDF 技术文档（如运维手册）按段落切碎（Chunking），调用 Embedding 模型（如 OpenAI 的 <code v-pre>text-embedding-3</code>）变成高维向量，全部整齐地存入向量数据库（Milvus / Pinecone / PGVector）中。</li>
<li><strong>在线阶段（RAG式 grep）</strong>：用户提问<code v-pre>&quot;K8s节点GPU掉卡怎么排查？&quot;</code>。系统先将提问转化为 Embedding 向量，去向量数据库里进行“最近邻检索（ANN）”，毫秒级捞出语义最接近的 3 篇文档段落，作为黄金背景塞给大模型。大模型据此生成绝对精准的回答。</li>
</ul>
<h4 id="_2-高阶智能语义检索-semantic-search" tabindex="-1"><a class="header-anchor" href="#_2-高阶智能语义检索-semantic-search"><span>2. 高阶智能语义检索（Semantic Search）</span></a></h4>
<p>也就是我们之前聊过的“语义 Grep”。电商网站或内网搜索不再依赖单纯的关键词匹配。用户搜<code v-pre>&quot;适合夏天喝的冰凉解暑的东西&quot;</code>，哪怕商品标题里只有<code v-pre>&quot;冷萃咖啡&quot;</code>或<code v-pre>&quot;西瓜汁&quot;</code>，Embedding 依然能靠空间距离把它们精准呈现在搜索第一页。</p>
<h4 id="_3-聚类分类与推荐系统" tabindex="-1"><a class="header-anchor" href="#_3-聚类分类与推荐系统"><span>3. 聚类分类与推荐系统</span></a></h4>
<ul>
<li><strong>用户画像 Embedding</strong>：把一个用户的浏览历史、点击偏好转化成一个动态向量。</li>
<li><strong>内容 Embedding</strong>：把短视频、商品也转为向量。</li>
<li><strong>推荐物理机理</strong>：抖音或淘宝的底层推荐引擎，就是不断在海量商品库中，寻找那些与你当前的“用户向量”物理距离最近的“商品向量”并推送到你的屏幕上。</li>
</ul>
<h3 id="💡-极简总结" tabindex="-1"><a class="header-anchor" href="#💡-极简总结"><span>💡 极简总结</span></a></h3>
<p><strong>Embedding 就是一张现实世界跨越到数字世界的物理地图。</strong> 它把复杂、冰冷、人类独有的符号和像素，通过降维和特征提取，统一重构为了包含“语义物理距离”的数学矩阵，让计算机和 AI 第一次拥有了“理解事物本质内在联系”的能力。</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};