import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/AI_infra/Kernel(%E7%AE%97%E5%AD%90)/FlushAttention_kernel.html","title":"FlushAttention_kernel","lang":"zh-CN","frontmatter":{"title":"FlushAttention_kernel","icon":"cpu","date":"2026-07-23T00:00:00.000Z","category":["AI基础设施"],"description":"FlashAttention 绝对是大模型时代（LLM）算子优化史诗级的、最具革命性的“神作”算子。 在它诞生之前，大模型在处理长文本（Long Context）时，90% 的算力都蒸发在了 Attention（自注意力）的显存内耗中。FlashAttention 的出现，直接通过底层算子重构，将大模型原本 $O(N^2)$ 的显存占用强行砍成了 $O...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"FlushAttention_kernel\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/AI_infra/Kernel(%E7%AE%97%E5%AD%90)/FlushAttention_kernel.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"FlushAttention_kernel"}],["meta",{"property":"og:description","content":"FlashAttention 绝对是大模型时代（LLM）算子优化史诗级的、最具革命性的“神作”算子。 在它诞生之前，大模型在处理长文本（Long Context）时，90% 的算力都蒸发在了 Attention（自注意力）的显存内耗中。FlashAttention 的出现，直接通过底层算子重构，将大模型原本 $O(N^2)$ 的显存占用强行砍成了 $O..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":6.07,"words":1822},"filePathRelative":"posts/AI基础设施/学习计划/AI_infra/Kernel(算子)/FlushAttention_kernel.md","excerpt":"<p><strong>FlashAttention</strong> 绝对是大模型时代（LLM）算子优化史诗级的、最具革命性的“神作”算子。</p>\\n<p>在它诞生之前，大模型在处理长文本（Long Context）时，90% 的算力都蒸发在了 Attention（自注意力）的显存内耗中。FlashAttention 的出现，直接通过底层算子重构，将大模型原本 $O(N^2)$ 的<strong>显存占用</strong>强行砍成了 $O(N)$<strong>（线性复杂度）</strong>，让长文本微调和推理服务成为现实。</p>\\n<p>以下为你硬核拆解它的痛点、底层的数学与物理黑科技，以及它的演进版本：</p>","autoDesc":true}`),i={name:`FlushAttention_kernel.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p><strong>FlashAttention</strong> 绝对是大模型时代（LLM）算子优化史诗级的、最具革命性的“神作”算子。</p>
<p>在它诞生之前，大模型在处理长文本（Long Context）时，90% 的算力都蒸发在了 Attention（自注意力）的显存内耗中。FlashAttention 的出现，直接通过底层算子重构，将大模型原本 $O(N^2)$ 的<strong>显存占用</strong>强行砍成了 $O(N)$<strong>（线性复杂度）</strong>，让长文本微调和推理服务成为现实。</p>
<p>以下为你硬核拆解它的痛点、底层的数学与物理黑科技，以及它的演进版本：</p>
<hr>
<h3 id="一、-传统-attention-的物理痛点-它干掉了什么" tabindex="-1"><a class="header-anchor" href="#一、-传统-attention-的物理痛点-它干掉了什么"><span>一、 传统 Attention 的物理痛点（它干掉了什么？）</span></a></h3>
<p>在标准的 Transformer 自注意力机制中，计算公式为：</p>
<p>$$<br>
\\text{Attention}(Q, K, V) = \\text{Softmax}\\left(\\frac{QK^T}{\\sqrt{d_k&amp;#125;&amp;#125;\\right)V<br>
$$</p>
<h4 id="_1-传统算子的显存爆炸轨迹" tabindex="-1"><a class="header-anchor" href="#_1-传统算子的显存爆炸轨迹"><span>1. 传统算子的显存爆炸轨迹</span></a></h4>
<p>假设输入序列长度（Sequence Length）为 $N$。</p>
<ol>
<li><strong>矩阵乘法</strong>：$Q$ 乘以 $K^T$，得到一个大小为 $N \\times N$ 的注意力得分矩阵 $S$。如果 $N = 64\\text{K}$（6万多个 Token），这个临时矩阵的大小将达到惊人的 $64000 \\times 64000 \\times 2\\text{ Bytes} \\approx 8.2\\text{ GB}$。</li>
<li><strong>读写内耗（Memory-Bound 噩梦）</strong>：传统算子会把这个巨大的 $N \\times N$ 矩阵<strong>完完整整地写入片外主显存（HBM）</strong>。</li>
<li><strong>Softmax 计算</strong>：紧接着，Softmax 算子从 HBM 中把这个矩阵读出来，在 GPU 内部算完归一化概率，<strong>再写回 HBM</strong>。</li>
<li><strong>乘以 V</strong>：最后，另一个矩阵乘法算子再次从 HBM 读出这个概率矩阵，去乘以 $V$，算出最终结果。</li>
</ol>
<h4 id="_2-物理致命伤" tabindex="-1"><a class="header-anchor" href="#_2-物理致命伤"><span>2. 物理致命伤</span></a></h4>
<p>这个 $N \\times N$ 的中间矩阵在算完之后其实就可以直接丢弃了，但为了算 Softmax，它在 HBM 里来回倒腾了数次。随着文本长度 $N$ 的增加，显存占用呈平方级（$O(N^2)$）暴涨，GPU 计算单元（Tensor Core）的大部分时间都在干等慢速的 HBM 搬运数据，模型利用率（MFU）发生雪崩。</p>
<hr>
<h3 id="二、-flashattention-的核心物理黑科技-怎么实现的" tabindex="-1"><a class="header-anchor" href="#二、-flashattention-的核心物理黑科技-怎么实现的"><span>二、 FlashAttention 的核心物理黑科技（怎么实现的？）</span></a></h3>
<p>它的核心第一性原理非常暴力：<strong>“哪怕我在片上多算几次，也绝对不要往片外慢速显存（HBM）写那个该死的</strong> $N \\times N$ <strong>矩阵！”</strong></p>
<p>它主要依靠两大底层算子优化手段：</p>
<h4 id="_1-硬件级分块计算-tiling" tabindex="-1"><a class="header-anchor" href="#_1-硬件级分块计算-tiling"><span>1. 硬件级分块计算（Tiling）</span></a></h4>
<p>FlashAttention 绝不一次性处理整张图或全量序列。它利用 <strong>Triton</strong> 或 <strong>CUDA C++</strong>，将巨大的 $Q, K, V$ 矩阵物理切碎成一个个适合 GPU 片上超高速缓存（SRAM/Shared Memory）大小的小块（Tiles）。</p>
<ul>
<li>数据被一小块一小块地加载进片上 SRAM。</li>
<li>所有中间的矩阵乘法、Softmax、以及乘以 $V$ 的操作，<strong>全部在这个超高速的 SRAM 内部闭环算完</strong>。</li>
<li>算完之后，直接把最终合并好的结果写回 HBM。自始至终，<strong>那个庞大的</strong> $N \\times N$ <strong>矩阵在物理上根本没有诞生过</strong>，它只存在于转瞬即逝的片上寄存器和 SRAM 中。显存空间复杂度瞬间从 $O(N^2)$ 降到了 $O(N)$。</li>
</ul>
<h4 id="_2-核心数学魔法-在线-softmax-增量更新-online-softmax" tabindex="-1"><a class="header-anchor" href="#_2-核心数学魔法-在线-softmax-增量更新-online-softmax"><span>2. 核心数学魔法：在线 Softmax 增量更新（Online Softmax）</span></a></h4>
<p>分块计算有一个巨大的数学逻辑硬伤：Softmax 的分母需要知道<strong>整行</strong>数据的最大值（$m$）和指数和（$d$）才能做归一化。我都把矩阵切碎了，算前一个小块时，怎么知道后面小块的最大值是多少？</p>
<p>FlashAttention 引入了 <strong>Online Softmax（在线分块缩放）</strong> 算法：</p>
<ul>
<li>当算完第一个分块（Tile 1）时，算子记录当前局部的最大值 $m_1$ 和分母 $d_1$，并算出一个局部结果。</li>
<li>当加载第二个分块（Tile 2）时，发现了一个更大的新最大值 $m_2$。</li>
<li><strong>增量修正</strong>：算子不需要推翻重算！它利用严格的数学公式，将旧的局部结果乘以一个<strong>缩放因子</strong>（如 $e^{m_1 - m_2}$），瞬间将其物理校正到以新最大值为基准的正确数值上，然后与新分块的结果融合成最新的全局状态。</li>
<li>依靠这个数学魔术，算子只需要对数据进行<strong>前向单次扫描（One-pass）</strong>，就能在完全不存大矩阵的情况下，算出完美的自注意力结果。</li>
</ul>
<h4 id="_3-反向传播的-重计算-recomputation-checkpointing" tabindex="-1"><a class="header-anchor" href="#_3-反向传播的-重计算-recomputation-checkpointing"><span>3. 反向传播的“重计算”（Recomputation / Checkpointing）</span></a></h4>
<p>在训练模型的反向传播（Backward）阶段，通常需要用到前向传播时产生的 Attention 矩阵来计算梯度。既然前向传时没存它，反向传时怎么办？</p>
<ul>
<li>FlashAttention 的选择是：<strong>要用的时候，当场在片上 SRAM 里重新算一遍！</strong></li>
<li>听起来多算了步骤，但因为片上 SRAM 算得极快，重新算一遍的时间，远远小于从 HBM 里面读取一个几十 GB 矩阵的时间。这就是高阶 Infra 调优里的“以计算换访存”。</li>
</ul>
<hr>
<h3 id="三、-flashattention-的家族史-进化到了哪一步" tabindex="-1"><a class="header-anchor" href="#三、-flashattention-的家族史-进化到了哪一步"><span>三、 FlashAttention 的家族史（进化到了哪一步？）</span></a></h3>
<p>随着 NVIDIA 显卡硬件架构的升级，该算子也在疯狂迭代：</p>
<h4 id="_1-flashattention-1-2022年" tabindex="-1"><a class="header-anchor" href="#_1-flashattention-1-2022年"><span>1. FlashAttention-1 (2022年)</span></a></h4>
<ul>
<li><strong>战绩</strong>：提出了 Tiling 和 Online Softmax 思想。</li>
<li><strong>效果</strong>：比原生 PyTorch 的 Attention 快了 2~4 倍，省下巨大显存。</li>
</ul>
<h4 id="_2-flashattention-2-2023年" tabindex="-1"><a class="header-anchor" href="#_2-flashattention-2-2023年"><span>2. FlashAttention-2 (2023年)</span></a></h4>
<ul>
<li><strong>战绩</strong>：针对 NVIDIA Ampere (A100) 和 Hopper (H100) 架构进行了硬件级重构。</li>
<li><strong>物理优化</strong>：</li>
<li>调整了计算指令的顺序，消灭了大量不必要的非矩阵乘法指令（Non-GEMM operations），让 GPU 几乎 100% 的时间都在高频运转 <strong>Tensor Core</strong>。</li>
<li>改进了线程块（Thread Blocks）之间的并行划分，避免了线程打架和数据冲突（Bank Conflict）。</li>
<li><strong>效果</strong>：速度再次比 1 代飙升了 2 倍，达到了硬件理论极限算力的 50%~70%（进入惊人的满血状态）。</li>
</ul>
<h4 id="_3-flashattention-3-2024-2025年之后" tabindex="-1"><a class="header-anchor" href="#_3-flashattention-3-2024-2025年之后"><span>3. FlashAttention-3 (2024~2025年之后)</span></a></h4>
<ul>
<li><strong>战绩</strong>：专门针对 <strong>NVIDIA Hopper (H100/H200) 和 Blackwell (B200/B300)</strong> 架构的全新硬件特性进行了死磕。</li>
<li><strong>物理优化</strong>：</li>
<li>利用 Hopper 架构底层的 <strong>TMA（张量内存加速器）</strong> 硬件单元，实现数据从 HBM 到 SRAM 的完全硬件级异步搬运，彻底解放了 SM 计算单元。</li>
<li>完美适配了全新的 <strong>FP8（8位浮点数）低精度低带宽暴算</strong>。</li>
<li>利用了 <strong>Warp-Group（线程束组）级异步指令</strong>，让计算和搬运在时间和空间上实现了像素级的 Overlap（重叠）。</li>
<li><strong>效果</strong>：在 H100/H200 上跑 FP8 时，吞吐量直奔 <strong>近 1 PFLOPS</strong> 的神级算力表现。</li>
</ul>
<hr>
<h3 id="💡-怎么看懂和学习它的源码" tabindex="-1"><a class="header-anchor" href="#💡-怎么看懂和学习它的源码"><span>💡 怎么看懂和学习它的源码？</span></a></h3>
<p>如果你打算去深挖大厂 Infra 岗位最看重的 FlashAttention 能力，可以从两条路径去切入：</p>
<ol>
<li><strong>看 Triton 版本实现（高回报率）</strong>：<br>
在 FlashAttention 官方仓库或 PyTorch 源码中，有一套用 <strong>OpenAI Triton</strong> 编写的 Python 满血版本。它用极度干净的 Python 语法完整重现了 Online Softmax 的增量更新公式（<code v-pre>tl.load</code>, <code v-pre>tl.dot</code>, <code v-pre>tl.store</code>）。看懂它，你的算子分块思想直接通关。</li>
<li><strong>看 NVIDIA 官方的 TileGym / cuTile 实现</strong>：<br>
去研读英伟达新一代 <strong>TileGym</strong> 仓库里用官方最新新兵器 <strong>cuTile</strong> 重新打磨的 FlashAttention 内核。对比一下官方是如何通过全新的 CUDA Tile IR 去压榨 Tensor Core 的，这能让你直接站在大模型 Infra 算子优化最前沿的浪尖上。</li>
</ol>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};