import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/AI_infra/B300%E6%B5%8B%E8%AF%95%E4%B8%8E%E4%BC%98%E5%8C%96/%E8%AE%AD%E7%BB%83%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E5%8F%82%E6%95%B0/gradient_accumulation_steps.html","title":"gradient_accumulation_steps","lang":"zh-CN","frontmatter":{"title":"gradient_accumulation_steps","icon":"cpu","date":"2026-07-23T00:00:00.000Z","category":["AI基础设施"],"description":"在大模型和分布式深度学习训练中，gradient_accumulation_steps（梯度累积步数） 是一种极其精妙的“物理显存避险与过载外挂”技术。 简单来说：它允许你在“显存不爆”的前提下，通过时间（多次计算）换空间（显存），物理模拟出一个超级巨大的 Batch Size（批大小）来训练模型。 它是消费级显卡（如 RTX 3090/4090）或受...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"gradient_accumulation_steps\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/AI_infra/B300%E6%B5%8B%E8%AF%95%E4%B8%8E%E4%BC%98%E5%8C%96/%E8%AE%AD%E7%BB%83%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E5%8F%82%E6%95%B0/gradient_accumulation_steps.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"gradient_accumulation_steps"}],["meta",{"property":"og:description","content":"在大模型和分布式深度学习训练中，gradient_accumulation_steps（梯度累积步数） 是一种极其精妙的“物理显存避险与过载外挂”技术。 简单来说：它允许你在“显存不爆”的前提下，通过时间（多次计算）换空间（显存），物理模拟出一个超级巨大的 Batch Size（批大小）来训练模型。 它是消费级显卡（如 RTX 3090/4090）或受..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":4.28,"words":1285},"filePathRelative":"posts/AI基础设施/学习计划/AI_infra/B300测试与优化/训练中的一些参数/gradient_accumulation_steps.md","excerpt":"<p>在大模型和分布式深度学习训练中，<code>gradient_accumulation_steps</code><strong>（梯度累积步数）</strong> 是一种极其精妙的“物理显存避险与过载外挂”技术。</p>\\n<p>简单来说：<strong>它允许你在“显存不爆”的前提下，通过时间（多次计算）换空间（显存），物理模拟出一个超级巨大的 Batch Size（批大小）来训练模型。</strong></p>\\n<p>它是消费级显卡（如 RTX 3090/4090）或受限算力节点训练百亿、千亿参数大模型时不可或缺的底层黑科技。</p>\\n<hr>\\n<h3>一、 为什么要用它？（直面显存物理墙）</h3>","autoDesc":true}`),i={name:`gradient_accumulation_steps.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在大模型和分布式深度学习训练中，<code v-pre>gradient_accumulation_steps</code><strong>（梯度累积步数）</strong> 是一种极其精妙的“物理显存避险与过载外挂”技术。</p>
<p>简单来说：<strong>它允许你在“显存不爆”的前提下，通过时间（多次计算）换空间（显存），物理模拟出一个超级巨大的 Batch Size（批大小）来训练模型。</strong></p>
<p>它是消费级显卡（如 RTX 3090/4090）或受限算力节点训练百亿、千亿参数大模型时不可或缺的底层黑科技。</p>
<hr>
<h3 id="一、-为什么要用它-直面显存物理墙" tabindex="-1"><a class="header-anchor" href="#一、-为什么要用它-直面显存物理墙"><span>一、 为什么要用它？（直面显存物理墙）</span></a></h3>
<p>我们在前文讨论过，增大 <strong>Batch Size (BS)</strong> 能让显卡吃得更饱、训练更稳定。<br>
但是，大模型的参数量巨大，在训练过程中，显卡需要塞入：<em>模型参数 + 梯度 + 优化器状态 +</em> <em><strong>激活值（Activation）</strong></em>。</p>
<ul>
<li>如果你的目标是让模型以 <strong>BS = 128</strong> 进行训练，但你的显卡显存很小（比如只有 24GB），你一把塞入 128 个样本，显卡会瞬间爆显存崩溃（<strong>Out of Memory，OOM</strong>）。</li>
<li>如果你妥协，把 BS 降到 <strong>16</strong>，显卡确实不爆了，但是 16 的小 Batch 会导致梯度噪声太大，模型根本无法稳定收敛，训练出来的效果极差。</li>
</ul>
<p><code v-pre>gradient_accumulation_steps</code> <strong>就是为了解决这个“既要大 Batch Size，又不想爆显存”的物理死锁。</strong></p>
<hr>
<h3 id="二、-它的物理工作原理是什么" tabindex="-1"><a class="header-anchor" href="#二、-它的物理工作原理是什么"><span>二、 它的物理工作原理是什么？</span></a></h3>
<p>假设你的目标是 <strong>全局 Batch Size（Global Batch Size）= 128</strong>，但你的显存极限只能承受 <strong>微批次（Micro Batch Size）= 16</strong>。</p>
<p>你可以设置 <code v-pre>gradient_accumulation_steps = 8</code>（因为 $16 \\times 8 = 128$）。<br>
系统在后台会开启以下“分批攒大招”的物理循环：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>       ┌────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>       │   1. 连续跑 8 个 Step (每个 Step 只喂入 Micro BS=16)     │</span></span>
<span class="line"><span>       │   - 每次只计算梯度 (Gradient)，但【不更新】模型参数         │</span></span>
<span class="line"><span>       │   - 每次算出来的梯度，在显存里默默【累加 (Accumulate)】    │</span></span>
<span class="line"><span>       └──────────────────────────┬─────────────────────────────┘</span></span>
<span class="line"><span>                                  │ (攒够了 8 步的梯度量)</span></span>
<span class="line"><span>                                  ▼</span></span>
<span class="line"><span>       ┌────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>       │   2. 迈出真正的“一大步” (Optimizer Step)                 │</span></span>
<span class="line"><span>       │   - 优化器利用这 8 步累加出来的总梯度，执行一次参数更新     │</span></span>
<span class="line"><span>       │   - 清空梯度累加池，重置计数器                            │</span></span>
<span class="line"><span>       └────────────────────────────────────────────────────────┘</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="💡-物理效果对比" tabindex="-1"><a class="header-anchor" href="#💡-物理效果对比"><span>💡 物理效果对比：</span></a></h4>
<p>通过这种“攒 8 步再更新一次”的方法：</p>
<ul>
<li><strong>在算法层面上</strong>：模型表现出来的更新逻辑，跟<strong>一口气吃掉 128 个样本更新一次（Global BS = 128）在数学上是完全等价的</strong>。</li>
<li><strong>在显存占用上</strong>：由于每次前向/反向传播只处理 16 个样本，<strong>显存压力被死死卡在 BS = 16 的极低水平线</strong>。</li>
</ul>
<hr>
<h3 id="三、-工业级-pytorch-伪代码-它是怎么写出来的" tabindex="-1"><a class="header-anchor" href="#三、-工业级-pytorch-伪代码-它是怎么写出来的"><span>三、 工业级 PyTorch 伪代码：它是怎么写出来的？</span></a></h3>
<p>为了让你看透本质，其实这个逻辑在 PyTorch 的底层训练循环（Training Loop）里极其简单，只需要几行判断：</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 假设配置</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">micro_batch_size </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 16</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">gradient_accumulation_steps </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 8</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">  # 攒 8 步</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">global_batch_size </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> micro_batch_size </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">*</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> gradient_accumulation_steps </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 128</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">optimizer.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">zero_grad</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 在最开始清空梯度</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> step, (inputs, targets) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">in</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> enumerate</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(dataloader):</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    # 1. 前向传播：每次只吃 16 个样本</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    outputs </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF"> model</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(inputs)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    # ⚠️ 物理细节：因为我们攒了 8 步才更新一次，所以每一步的 Loss 必须除以 8 </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    # 否则最终累加出来的梯度会物理放大 8 倍，导致模型直接跑飞（梯度爆炸）</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    loss </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF"> criterion</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(outputs, targets) </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">/</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> gradient_accumulation_steps</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    # 2. 反向传播：计算梯度，PyTorch 会在后台自动把梯度累加（Accumulate）到 .grad 属性中</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    loss.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">backward</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    # 3. 核心判定：只有当攒够了 8 步（或者到了数据集的末尾），才执行真正的参数物理更新</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (step </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">+</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">%</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> gradient_accumulation_steps </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">==</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        # 物理迈出一步 (这一步才更新权重)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        optimizer.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">step</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        # 清空梯度池，准备下一次循环累加</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        optimizer.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">zero_grad</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        </span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">        print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">f</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"🔄 [Step </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">{</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">step</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">] 攒满 8 步，物理执行一次模型参数更新！"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h3 id="四、-使用它的硬冷物理权衡-trade-offs" tabindex="-1"><a class="header-anchor" href="#四、-使用它的硬冷物理权衡-trade-offs"><span>四、 使用它的硬冷物理权衡（Trade-offs）</span></a></h3>
<p>虽然这个黑科技很完美，但作为架构师你必须接受它的<strong>物理代价</strong>：</p>
<ol>
<li><strong>训练总时间会线性拉长（以时间换空间）</strong>：<br>
虽然你用 16 的显存跑出了 128 的效果，但你物理上确实老老实实跑了 8 次前向和反向传播。它<strong>不会缩短任何计算时间</strong>，它唯一的功劳是<strong>防止 OOM 崩溃</strong>。</li>
<li><strong>不增加显卡计算吞吐量（Samples/s 不变）</strong>：<br>
它的吞吐量依然受限于 Micro BS = 16 的速度。</li>
<li><strong>对 Batch Normalization（批归一化）不友好</strong>：<br>
如果你的模型里包含 <code v-pre>BatchNorm</code> 层，BatchNorm 是强依赖单次 Batch 内样本的均值和方差的。由于物理上的 Batch 只有 16，它的统计量会失真。</li>
</ol>
<ul>
<li><em>大模型时代幸免</em>：谢天谢地，当下的 Transformer 大模型（如 Llama、Gemma）底层全部改用了 <strong>RMSNorm</strong> 或 <strong>LayerNorm（层归一化）</strong>，这些归一化算法是在单条样本内部独立进行的，天生对梯度累积免疫，没有任何副作用。</li>
</ul>
<h3 id="💡-决策一句话" tabindex="-1"><a class="header-anchor" href="#💡-决策一句话"><span>💡 决策一句话：</span></a></h3>
<p>当你想提升 Batch Size 来稳定大模型训练，但<strong>显卡疯狂报错 OOM 时</strong>，立刻在你的 DeepSpeed、Hugging Face <code v-pre>TrainingArguments</code> 或者是自研脚本里，调小 <code v-pre>per_device_train_batch_size</code>，同时**成倍调大 <code v-pre>gradient_accumulation_steps**</code>。这是大模型微调中性价比最高、最无脑的显存降温良药。</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};