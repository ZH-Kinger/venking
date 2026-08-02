import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E5%9F%BA%E7%A1%80/Transformer/Positional_Encoding(%E4%BD%8D%E7%BD%AE%E7%BC%96%E7%A0%81).html","title":"Positional_Encoding(位置编码)","lang":"zh-CN","frontmatter":{"title":"Positional_Encoding(位置编码)","icon":"cpu","date":"2026-07-23T00:00:00.000Z","category":["AI基础设施"],"description":"在大模型（Transformer 架构）的世界里，Positional Encoding（位置编码） 是赋予大模型“空间感”与“文字顺序感知能力”的物理金钥匙。 简单来说：如果没有位置编码，你把一句话打乱顺序喂给大模型，大模型算出来的结果是完全一模一样的。它分不清“我通过了面试”和“面试通过了我”。 为了理解为什么需要它、它的数学本质以及现代大模型（如...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Positional_Encoding(位置编码)\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E5%9F%BA%E7%A1%80/Transformer/Positional_Encoding(%E4%BD%8D%E7%BD%AE%E7%BC%96%E7%A0%81).html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"Positional_Encoding(位置编码)"}],["meta",{"property":"og:description","content":"在大模型（Transformer 架构）的世界里，Positional Encoding（位置编码） 是赋予大模型“空间感”与“文字顺序感知能力”的物理金钥匙。 简单来说：如果没有位置编码，你把一句话打乱顺序喂给大模型，大模型算出来的结果是完全一模一样的。它分不清“我通过了面试”和“面试通过了我”。 为了理解为什么需要它、它的数学本质以及现代大模型（如..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":5.02,"words":1505},"filePathRelative":"posts/AI基础设施/学习计划/深度学习基础/Transformer/Positional_Encoding(位置编码).md","excerpt":"<p>在大模型（Transformer 架构）的世界里，<strong>Positional Encoding（位置编码）</strong> 是赋予大模型“空间感”与“文字顺序感知能力”的物理金钥匙。</p>\\n<p>简单来说：<strong>如果没有位置编码，你把一句话打乱顺序喂给大模型，大模型算出来的结果是完全一模一样的。它分不清“我通过了面试”和“面试通过了我”。</strong></p>\\n<p>为了理解为什么需要它、它的数学本质以及现代大模型（如 Llama 3）是怎么做的，我们直接扒开它的物理真相：</p>\\n<hr>\\n<h3>一、 传统网络 vs Transformer 的“先天残疾”</h3>","autoDesc":true}`),i={name:`Positional_Encoding(位置编码).md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在大模型（Transformer 架构）的世界里，<strong>Positional Encoding（位置编码）</strong> 是赋予大模型“空间感”与“文字顺序感知能力”的物理金钥匙。</p>
<p>简单来说：<strong>如果没有位置编码，你把一句话打乱顺序喂给大模型，大模型算出来的结果是完全一模一样的。它分不清“我通过了面试”和“面试通过了我”。</strong></p>
<p>为了理解为什么需要它、它的数学本质以及现代大模型（如 Llama 3）是怎么做的，我们直接扒开它的物理真相：</p>
<hr>
<h3 id="一、-传统网络-vs-transformer-的-先天残疾" tabindex="-1"><a class="header-anchor" href="#一、-传统网络-vs-transformer-的-先天残疾"><span>一、 传统网络 vs Transformer 的“先天残疾”</span></a></h3>
<ul>
<li><strong>传统的 RNN / LSTM 网络</strong>：天生具备时序感。因为数据是一个词接一个词、按时间顺序“流”进网络的。前一个词不跑完，后一个词进不来。</li>
<li><strong>Transformer 架构</strong>：为了极大地压榨 GPU 的并发算力，它抛弃了这种死板的串行流，采用 <strong>Self-Attention（自注意力机制）</strong>。它把一句话里的所有单词（无论是一百个字还是一万个字）<strong>在同一个时间步、齐刷刷地一次性全部并行塞进显存暴算</strong>。</li>
</ul>
<p>但是这种极致的并行带来了一个致命的物理副作用：自注意力机制在算两个词之间的相关性时，采用的是点积（Dot Product）操作。而点积在数学上是具有<strong>交换律</strong>的。<br>
也就是说，在纯 Transformer 的世界观里，它只知道这句话里有哪些词（像一个装满词的袋子），但<strong>完全分不清这些词谁在前、谁在后</strong>。这种残疾被称为“排列不变性（Permutation Invariance）”。</p>
<hr>
<h3 id="二、-位置编码的物理本质-给每个词发一张-座位号" tabindex="-1"><a class="header-anchor" href="#二、-位置编码的物理本质-给每个词发一张-座位号"><span>二、 位置编码的物理本质：给每个词发一张“座位号”</span></a></h3>
<p>为了解决这个残疾，科学家想出了一个绝妙的做法：既然文字序列本身没有顺序，那我们就人为创造一套<strong>代表物理位置的特征向量</strong>，把每个词在句子里的“绝对座位号”或者“相对距离”强行揉进数据里。</p>
<p>在工程演进中，主要出现了两大派系的位置编码技术：</p>
<h4 id="派系-1-经典的-绝对位置编码-以-gpt-2、bert-为代表" tabindex="-1"><a class="header-anchor" href="#派系-1-经典的-绝对位置编码-以-gpt-2、bert-为代表"><span>派系 1：经典的“绝对位置编码”（以 GPT-2、BERT 为代表）</span></a></h4>
<p>在 Transformer 最早期的论文（<em>Attention Is All You Need</em>）中，采用的是 <strong>正弦/余弦静态编码（Sinusoidal Positional Encoding）</strong>。</p>
<ul>
<li><strong>做法</strong>：算法利用不同频率的正弦和余弦函数，生成一个与单词向量（Embedding）维度完全一样的位置向量 $P$。</li>
<li><strong>物理操作</strong>：在数据刚进模型的第一层，直接将<strong>词向量</strong>与<strong>位置向量</strong>进行<strong>物理相加（Plus）</strong>：</li>
</ul>
<p>$$<br>
\\text{Final Input} = \\text{Word Embedding} + \\text{Positional Encoding}<br>
$$</p>
<ul>
<li><strong>数学美感</strong>：因为三角函数的数学特性（如 $\\cos(\\alpha+\\beta)$ 的展开），这种编码方式可以让模型仅仅通过两点之间的点积，就能轻松学到“词 A 和词 B 之间物理距离是 3 个字”这样的几何关系。</li>
</ul>
<p>后来，GPT-2 等模型把这种静态函数改为了 <strong>Learnable Absolute Positional Encoding（可学习的绝对位置编码）</strong>，即直接在内存里开辟一块 <code v-pre>[Max_Seq_Len, Hidden_Size]</code> 的参数矩阵，让模型在训练过程中自己去摸索和进化每个座位的最优特征。</p>
<hr>
<h3 id="三、-现代大模型的绝对主流-rope-旋转位置编码-相对位置" tabindex="-1"><a class="header-anchor" href="#三、-现代大模型的绝对主流-rope-旋转位置编码-相对位置"><span>三、 现代大模型的绝对主流：RoPE 旋转位置编码（相对位置）</span></a></h3>
<p>传统的绝对位置编码有一个致命的物理硬伤：<strong>它锁死了模型的最大文本长度。</strong> 如果你训练时位置编码矩阵只设了 2048，那模型这辈子就只能读 2048 个字，遇到 4096 的长文本，多出来的座位直接没有“座位号”了。</p>
<p>因此，以 Llama、Mistral、Qwen 等为代表的现代大模型，全面抛弃了绝对位置编码，改用目前 Infra 界封神的 <strong>RoPE（Rotary Position Embedding，旋转位置编码）</strong>。</p>
<h4 id="💡-rope-是怎么玩的-硬核物理拆解" tabindex="-1"><a class="header-anchor" href="#💡-rope-是怎么玩的-硬核物理拆解"><span>💡 RoPE 是怎么玩的？（硬核物理拆解）</span></a></h4>
<p>RoPE 彻底颠覆了“直接相加”的死板做法，它巧妙地借用了<strong>复数几何空间和二维旋转矩阵</strong>：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>     【 传统的绝对编码 】                         【 现代的 RoPE 旋转编码 】</span></span>
<span class="line"><span>  ┌───────────────────────┐                    ┌───────────────────────────────────┐</span></span>
<span class="line"><span>  │  词向量 ⊕ 位置向量     │                    │  让词向量在二维高维空间上 “转圈”    │</span></span>
<span class="line"><span>  │ (在原始维度上暴力相加)  │                    │ (通过旋转角度 θ 物理绑定相对距离)     │</span></span>
<span class="line"><span>  └───────────────────────┘                    └───────────────────────────────────┘</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li><strong>空间旋转</strong>：模型在每一层算自注意力之前，把查询向量 $Q$ 和键向量 $K$ 切成很多个两两一组的二维平面。</li>
<li><strong>乘以旋转矩阵</strong>：如果一个词处在第 $m$ 个位置，RoPE 就会让这个词的向量在二维平面上<strong>物理逆时针旋转</strong> $m \\times \\theta$ <strong>个角度</strong>。如果另一个词在第 $n$ 个位置，它就旋转 $n \\times \\theta$ 个角度。</li>
<li><strong>内嵌相对距离</strong>：当这两个词在计算 Attention 点积（$Q \\times K^T$）时，奇妙的数学魔法发生了：由于两个向量各自旋转后的点积，其结果<strong>只取决于它们两个旋转角度的差值（即</strong> $m - n$<strong>）</strong>！</li>
<li><strong>长文本外推（Extrapolation）的基石</strong>：RoPE 完美地将“绝对位置”转化为了“两词之间的相对距离”。这使得现代大模型具备了极其恐怖的<strong>外推能力</strong>。当我们需要将大模型从 8K 上下文扩展到 128K 甚至 1M 时，工程师只需要在底层把旋转的弧度 $\\theta$ 稍微做一下动态缩放（如 Linear Scaling、Yarn 或 NTK-aware 缩放算子），不需要重新训练整个模型，就能让大模型直接吞下超级长文本。</li>
</ol>
<h3 id="💡-极简总结" tabindex="-1"><a class="header-anchor" href="#💡-极简总结"><span>💡 极简总结：</span></a></h3>
<p><strong>Positional Encoding 就是 Transformer 架构里的“空间坐标系”。</strong> 它通过数学算子（早期相加，现代旋转）将文字在句子中的物理先后顺序灌进向量里，从而让天生只懂并发暴算、缺乏时序感的 Transformer 重新获得了完美的语言逻辑和上下文顺序感知能力。</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};