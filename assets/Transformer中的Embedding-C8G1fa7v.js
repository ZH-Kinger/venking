import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E5%9F%BA%E7%A1%80/Transformer/Embedding(%E5%90%91%E9%87%8F%E5%8C%96)/Transformer%E4%B8%AD%E7%9A%84Embedding.html","title":"Transformer中的Embedding","lang":"zh-CN","frontmatter":{"title":"Transformer中的Embedding","icon":"cpu","date":"2026-07-23T00:00:00.000Z","category":["AI基础设施"],"description":"在标准的 Transformer 架构（如 BERT、GPT、Llama）中，Embedding 的实现物理上分为两个核心部分：一个是负责将离散 Token ID 映射为稠密向量的 Word Embedding（词嵌入），另一个是负责注入序列顺序信息的 Positional Encoding（位置编码）。两者在输入端会进行物理相加，拼装成 Transf...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Transformer中的Embedding\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E5%9F%BA%E7%A1%80/Transformer/Embedding(%E5%90%91%E9%87%8F%E5%8C%96)/Transformer%E4%B8%AD%E7%9A%84Embedding.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"Transformer中的Embedding"}],["meta",{"property":"og:description","content":"在标准的 Transformer 架构（如 BERT、GPT、Llama）中，Embedding 的实现物理上分为两个核心部分：一个是负责将离散 Token ID 映射为稠密向量的 Word Embedding（词嵌入），另一个是负责注入序列顺序信息的 Positional Encoding（位置编码）。两者在输入端会进行物理相加，拼装成 Transf..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.78,"words":1135},"filePathRelative":"posts/AI基础设施/学习计划/深度学习基础/Transformer/Embedding(向量化)/Transformer中的Embedding.md","excerpt":"<p>在标准的 Transformer 架构（如 BERT、GPT、Llama）中，<strong>Embedding 的实现物理上分为两个核心部分</strong>：一个是负责将离散 Token ID 映射为稠密向量的 <strong>Word Embedding（词嵌入）</strong>，另一个是负责注入序列顺序信息的 <strong>Positional Encoding（位置编码）</strong>。两者在输入端会进行<strong>物理相加</strong>，拼装成 Transformer Block 的最终输入。</p>\\n<p>以下是其底层的工程实现与物理机制：</p>\\n<hr>","autoDesc":true}`),i={name:`Transformer中的Embedding.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在标准的 Transformer 架构（如 BERT、GPT、Llama）中，<strong>Embedding 的实现物理上分为两个核心部分</strong>：一个是负责将离散 Token ID 映射为稠密向量的 <strong>Word Embedding（词嵌入）</strong>，另一个是负责注入序列顺序信息的 <strong>Positional Encoding（位置编码）</strong>。两者在输入端会进行<strong>物理相加</strong>，拼装成 Transformer Block 的最终输入。</p>
<p>以下是其底层的工程实现与物理机制：</p>
<hr>
<h3 id="第一部分-word-embedding-词嵌入-的查表实现" tabindex="-1"><a class="header-anchor" href="#第一部分-word-embedding-词嵌入-的查表实现"><span>第一部分：Word Embedding（词嵌入）的查表实现</span></a></h3>
<p>在 Transformer 的最开头，离散的文本首先会通过 Tokenizer（分词器）切分成一串数字 ID。随后，这一串 ID 会送入 PyTorch 的 <code v-pre>nn.Embedding</code> 层。</p>
<h4 id="_1-物理本质-一个巨型特征矩阵" tabindex="-1"><a class="header-anchor" href="#_1-物理本质-一个巨型特征矩阵"><span>1. 物理本质：一个巨型特征矩阵</span></a></h4>
<p>在显存（HBM）中，<code v-pre>nn.Embedding</code> 物理上就是一个规整的二维浮点数矩阵，其维度为：</p>
<p>$$<br>
\\text{Matrix Size} = [\\text{Vocabulary Size（词表大小）}, , \\text{Hidden Dimension（隐藏层维度）}]<br>
$$</p>
<ul>
<li>例如，词表大小为 $32000$，隐藏层维度（$d_{\\text{model&amp;#125;&amp;#125;$）为 $768$。那么这就是一个 $32000 \\times 768$ 的二维矩阵。</li>
</ul>
<h4 id="_2-工程实现-gpu-指令级的-查表-lookup" tabindex="-1"><a class="header-anchor" href="#_2-工程实现-gpu-指令级的-查表-lookup"><span>2. 工程实现：GPU 指令级的“查表（Lookup）”</span></a></h4>
<p>虽然在数学公式中，词嵌入常被抽象为 <strong>One-Hot 向量</strong> 乘以 <strong>权重矩阵</strong>，但在实际的 GPU 算子实现中，<strong>绝对不会进行这种高耗能的矩阵乘法</strong>。</p>
<ul>
<li><strong>指针偏移寻址</strong>：当一个 Token ID（如“狗”的 ID 是 <code v-pre>142</code>）输入时，底层算子会直接根据偏置值计算出内存地址，<strong>一行式地把矩阵中第 142 行的那 768 个浮点数“捞出来”</strong>。</li>
<li>这一步在计算机底层是纯粹的 I/O 查表操作，没有任何乘法器（Tensor Core）的开销。</li>
</ul>
<hr>
<h3 id="第二部分-positional-encoding-位置编码-的显式实现" tabindex="-1"><a class="header-anchor" href="#第二部分-positional-encoding-位置编码-的显式实现"><span>第二部分：Positional Encoding（位置编码）的显式实现</span></a></h3>
<p>由于 Transformer 的自注意力机制（Self-Attention）是同时对全序列进行并行暴算的，它天然抹去了时间步的先后顺序。为了让模型分清 <code v-pre>&quot;我吃苹果&quot;</code> 和 <code v-pre>&quot;苹果吃我&quot;</code>，必须在输入端显式引入位置信息。</p>
<p>在标准的 Transformer 中，最经典的是利用<strong>正弦与余弦三角函数</strong>直接计算出位置矩阵：</p>
<h4 id="_1-数学计算公式" tabindex="-1"><a class="header-anchor" href="#_1-数学计算公式"><span>1. 数学计算公式</span></a></h4>
<p>对于序列中第 $pos$ 个位置的 Token，在其 Embedding 向量的第 $2i$（偶数）和 $2i+1$（奇数）个通道上，位置编码的数值计算如下：</p>
<p>$$<br>
PE_{(pos, 2i)} = \\sin\\left(\\frac{pos}{10000^{\\frac{2i}{d_{\\text{model&amp;#125;&amp;#125;&amp;#125;&amp;#125;}\\right)<br>
$$</p>
<p>$$<br>
PE_{(pos, 2i+1)} = \\cos\\left(\\frac{pos}{10000^{\\frac{2i}{d_{\\text{model&amp;#125;&amp;#125;&amp;#125;&amp;#125;}\\right)<br>
$$</p>
<h4 id="_2-物理重构与优势" tabindex="-1"><a class="header-anchor" href="#_2-物理重构与优势"><span>2. 物理重构与优势</span></a></h4>
<ul>
<li><strong>无需训练</strong>：这段代码在初始化时直接通过 CPU/GPU 算好，是一个固定不变的常量矩阵。</li>
<li><strong>相对位置泛化</strong>：三角函数的数学特性允许模型通过简单的线性变换，轻松学到 Token 之间的相对距离。</li>
<li><strong>外推能力</strong>：即使在训练时只见过长度为 512 的句子，由于三角函数的周期性，它依然能为长度为 1024 的句子提供唯一的位置编码。</li>
</ul>
<hr>
<h3 id="第三部分-完整的输入拼装流水线" tabindex="-1"><a class="header-anchor" href="#第三部分-完整的输入拼装流水线"><span>第三部分：完整的输入拼装流水线</span></a></h3>
<p>在 Transformer 的数据流入口，最终的输入张量是由上述两者物理相加（Element-wise Add）而成的：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>[输入文本] ──> "我" "爱" "中国"</span></span>
<span class="line"><span>                  │ (Tokenizer 分词)</span></span>
<span class="line"><span>                  ▼</span></span>
<span class="line"><span>              [ 12, 459, 883 ] (离散 Token IDs)</span></span>
<span class="line"><span>                  │</span></span>
<span class="line"><span>        ┌─────────┴─────────┐</span></span>
<span class="line"><span>        ▼                   ▼</span></span>
<span class="line"><span>[ Word Embedding 查表 ]   [ Positional Encoding 计算 ]</span></span>
<span class="line"><span>  (从大矩阵里捞出向量)      (三角函数生成位置特征)</span></span>
<span class="line"><span>  维度: [Seq_Len, 768]     维度: [Seq_Len, 768]</span></span>
<span class="line"><span>        │                   │</span></span>
<span class="line"><span>        └─────────┬─────────┘</span></span>
<span class="line"><span>                  │ (对应位置直接相加)</span></span>
<span class="line"><span>                  ▼</span></span>
<span class="line"><span>         [ 最终 Embedding 张量 ] ──> 送入后续的 Transformer Block</span></span>
<span class="line"><span>         维度: [Seq_Len, 768]</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="⚙️-infra-sre-视角的显存避坑提示" tabindex="-1"><a class="header-anchor" href="#⚙️-infra-sre-视角的显存避坑提示"><span>⚙️ Infra / SRE 视角的显存避坑提示：</span></a></h3>
<p>在千卡或万卡集群上进行大模型长文本训练（如上下文拉到 $32\\text{K} \\sim 128\\text{K}$）时，输入端的 Embedding 会带来一个隐藏的显存与计算陷阱：</p>
<ol>
<li><strong>RoPE 旋转位置编码的平替</strong>：目前现代大模型（如 Llama、Mistral）基本抛弃了上面这种“输入端直接相加”的静态绝对位置编码，改为了 <strong>RoPE（旋转位置编码）</strong>。RoPE 的实现是在每一个 Transformer Block 的 Attention 算子内部，对 $Q$ 和 $K$ 矩阵进行旋转变换。</li>
<li><strong>词表开销暴涨</strong>：当算法团队为了支持多语言，将词表从 32K 扩大到 128K 甚至 256K 时，整个输入层的 <code v-pre>nn.Embedding</code> 矩阵将吃掉数 GB 的显存。在开启 <strong>张量并行（Tensor Parallelism, TP）</strong> 时，作为 Infra 必须配合将这个巨大的 Embedding 矩阵纵向切开，均匀打散到同一物理机内的 8 张 GPU 上，从而防止单卡 HBM 发生 OOM 崩溃。</li>
</ol>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};