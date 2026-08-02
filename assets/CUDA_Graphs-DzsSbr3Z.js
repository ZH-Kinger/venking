import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/AI_infra/CUDA_Graphs.html","title":"CUDA_Graphs","lang":"zh-CN","frontmatter":{"title":"CUDA_Graphs","icon":"cpu","date":"2026-07-23T00:00:00.000Z","category":["AI基础设施"],"description":"在大模型高并发推理（Inference，如 vLLM、TensorRT-LLM）以及极速微调场景中，CUDA Graphs 是一项由 NVIDIA 官方提供、用来彻底干掉 CPU 开销、将显卡延迟（Latency）压榨到物理极限的重型底层黑科技。 一句话道破本质：传统的运行模式是“CPU 像个碎嘴子，下一条指令显卡打一枪”；而 CUDA Graphs ...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"CUDA_Graphs\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/AI_infra/CUDA_Graphs.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"CUDA_Graphs"}],["meta",{"property":"og:description","content":"在大模型高并发推理（Inference，如 vLLM、TensorRT-LLM）以及极速微调场景中，CUDA Graphs 是一项由 NVIDIA 官方提供、用来彻底干掉 CPU 开销、将显卡延迟（Latency）压榨到物理极限的重型底层黑科技。 一句话道破本质：传统的运行模式是“CPU 像个碎嘴子，下一条指令显卡打一枪”；而 CUDA Graphs ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":5.44,"words":1631},"filePathRelative":"posts/AI基础设施/学习计划/AI_infra/CUDA_Graphs.md","excerpt":"<p>在大模型高并发推理（Inference，如 vLLM、TensorRT-LLM）以及极速微调场景中，<strong>CUDA Graphs</strong> 是一项由 NVIDIA 官方提供、用来<strong>彻底干掉 CPU 开销、将显卡延迟（Latency）压榨到物理极限</strong>的重型底层黑科技。</p>\\n<p>一句话道破本质：<strong>传统的运行模式是“CPU 像个碎嘴子，下一条指令显卡打一枪”；而 CUDA Graphs 则是“CPU 提前把全套战术录制成一张铁板图直接丢给 GPU，GPU 自己在内部循环狂飙，彻底不需要 CPU 介入”。</strong></p>","autoDesc":true}`),i={name:`CUDA_Graphs.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在大模型高并发推理（Inference，如 vLLM、TensorRT-LLM）以及极速微调场景中，<strong>CUDA Graphs</strong> 是一项由 NVIDIA 官方提供、用来<strong>彻底干掉 CPU 开销、将显卡延迟（Latency）压榨到物理极限</strong>的重型底层黑科技。</p>
<p>一句话道破本质：<strong>传统的运行模式是“CPU 像个碎嘴子，下一条指令显卡打一枪”；而 CUDA Graphs 则是“CPU 提前把全套战术录制成一张铁板图直接丢给 GPU，GPU 自己在内部循环狂飙，彻底不需要 CPU 介入”。</strong></p>
<hr>
<h3 id="一、-痛点-为什么需要-cuda-graphs-干掉-cpu-墙" tabindex="-1"><a class="header-anchor" href="#一、-痛点-为什么需要-cuda-graphs-干掉-cpu-墙"><span>一、 痛点：为什么需要 CUDA Graphs？（干掉 CPU 墙）</span></a></h3>
<p>在运行大语言模型（LLM）的自回归生成（Token-by-Token 吐字）或者小 Batch 推理时，你会遇到一个非常恶心的物理现象：<strong>GPU 算力利用率极低，显卡根本不热，但推理速度就是提不上来。</strong></p>
<p>这背后的物理死穴叫做 <strong>CPU 运行时开销（CPU Overhead）</strong>：</p>
<ol>
<li>原生模式下，每一个 Step 包含成百上千个细小的算子（矩阵乘、加偏置、激活、LayerNorm）。</li>
<li>每启动一个算子，CPU 上的 CUDA 驱动都要高频调用一次 <code v-pre>cudaLaunchKernel()</code>。这个调用不是免费的，每次会产生几微秒的 CPU 延迟。</li>
<li>当算子数量极多、但每个算子计算量很小（如 LLM 推理的 Decode 阶段）时，<strong>CPU 传话的速度（微秒级）远远慢于 GPU 爆算的速度（纳秒级）</strong>。GPU 大量时间都在空转干等 CPU 发号施令。</li>
</ol>
<hr>
<h3 id="二、-它是如何实现的-核心物理流" tabindex="-1"><a class="header-anchor" href="#二、-它是如何实现的-核心物理流"><span>二、 它是如何实现的？（核心物理流）</span></a></h3>
<p>CUDA Graphs 的核心破局思路非常暴力：<strong>录制（Capture）</strong> $\\rightarrow$ <strong>实例化（Instantiate）</strong> $\\rightarrow$ <strong>狂飙重放（Exec）。</strong></p>
<p>它的底层物理工作流分为三个严密的工程阶段：</p>
<h4 id="阶段-1-流录制模式-stream-capture" tabindex="-1"><a class="header-anchor" href="#阶段-1-流录制模式-stream-capture"><span>阶段 1：流录制模式（Stream Capture）</span></a></h4>
<p>系统在正式运行前，会进行一次所谓的 <strong>Warmup（预热录制）</strong>。</p>
<ul>
<li>CPU 照常执行一遍前向传播。但此时，CUDA 驱动会开启“录像机”。</li>
<li>驱动不会把算子真的一个个下发给 GPU 执行，而是将这些算子的内存地址、依赖关系、格点大小（Grid/Block Dimensions）全部捕捉下来。</li>
<li>最终，在 GPU 驱动层物理构建出一张完全静态的、固化好的 <strong>DAG（有向无环图）</strong>。</li>
</ul>
<h4 id="_2-阶段-2-图实例化-graph-exec-executable-graph" tabindex="-1"><a class="header-anchor" href="#_2-阶段-2-图实例化-graph-exec-executable-graph"><span>2. 阶段 2：图实例化（Graph Exec / Executable Graph）</span></a></h4>
<p>录制完成后，这张图被送入 CUDA 运行时的“压缩流水线”。</p>
<ul>
<li>驱动会对这张静态图进行底层的硬件级拓扑优化，把成百上千个 Kernel 之间的依赖关系锁死，直接映射为 GPU 内部的<strong>硬件调度队列（Hardware Queue）</strong>。</li>
<li>这张图一旦被实例化，就变成了一个驻留在 GPU 驱动层内的静态“死物”。</li>
</ul>
<h4 id="_3-阶段-3-零-cpu-介入重放-zero-overhead-launch" tabindex="-1"><a class="header-anchor" href="#_3-阶段-3-零-cpu-介入重放-zero-overhead-launch"><span>3. 阶段 3：零 CPU 介入重放（Zero-overhead Launch）</span></a></h4>
<p>在后续正式的千万次循环训练或推理中，代码一字不改。</p>
<ul>
<li>每当进入新的一步，CPU 只需要调用一次极轻量的一行物理指令：<code v-pre>cudaGraphLaunch(graphExec)</code>。</li>
<li><strong>物理奇迹发生</strong>：CPU 传完这一句话后就可以直接去睡觉了。<strong>GPU 硬件会根据内部早已固化好的图结构，自动、高并发、无缝串联地把所有算子一路炸过去</strong>。算子与算子之间的切换间隙被压缩到了绝对零度（纳秒级）。</li>
</ul>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span> 【 传统原生模式：CPU-GPU 频繁拉扯 】</span></span>
<span class="line"><span> CPU: [启动 Kernel 1] ──(几微秒延迟)──> GPU: [计算 10 纳秒] ──> 回传</span></span>
<span class="line"><span> CPU: [启动 Kernel 2] ──(几微秒延迟)──> GPU: [计算 5 纳秒]  ──> 回传</span></span>
<span class="line"><span> (CPU 变成坚固的物理瓶颈 🐢)</span></span>
<span class="line"><span></span></span>
<span class="line"><span> 【 CUDA Graphs 模式：一次录制，全线狂飙 】</span></span>
<span class="line"><span> CPU: [只喊一声：Graph 启动！] ───> GPU 内部: [Kernel 1] ➔ [Kernel 2] ➔ [Kernel 3]</span></span>
<span class="line"><span> (GPU 内部零间隙自主流转，速度飞起 🚀)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h3 id="三、-在-pytorch-中怎么用" tabindex="-1"><a class="header-anchor" href="#三、-在-pytorch-中怎么用"><span>三、 在 PyTorch 中怎么用？</span></a></h3>
<p>在现代 PyTorch 中，你既可以通过原生 CUDA API 手动录制，也可以通过 <code v-pre>torch.compile()</code> 顺理成章地自动开启。</p>
<h4 id="方式-a-通过-torch-compile-自动白嫖-最推荐" tabindex="-1"><a class="header-anchor" href="#方式-a-通过-torch-compile-自动白嫖-最推荐"><span>方式 A：通过 <code v-pre>torch.compile</code> 自动白嫖（最推荐）</span></a></h4>
<p>我们在前文讲过 <code v-pre>torch.compile</code> 的三种模式。当你选择 <code v-pre>reduce-overhead</code> 时，PyTorch 底层就是通过 <strong>TorchDynamo 生成 FX Graph，然后自动在后台为你套上一层 CUDA Graphs 外挂</strong>：</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 这行代码在后台会自动完成符号追踪、FX 图生成、并自动用 CUDA Graphs 把整张图录制到 GPU 中</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">compiled_model </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> torch.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">compile</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(model, </span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">mode</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"reduce-overhead"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="方式-b-原生的手动录制上下文-底层架构常用" tabindex="-1"><a class="header-anchor" href="#方式-b-原生的手动录制上下文-底层架构常用"><span>方式 B：原生的手动录制上下文（底层架构常用）</span></a></h4>
<p>如果你在自研高并发的推理引擎（如特定 Agent 的极速响应网关），常用原生上下文管理器：</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> torch</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 1. 预热，确保缓存和内存分配器（CUDACachingAllocator）稳定</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">s </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> torch.cuda.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">Stream</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">s.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">wait_stream</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(torch.cuda.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">current_stream</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">())</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">with</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> torch.cuda.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">stream</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(s):</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> _ </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">in</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> range</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">3</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">):</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        static_output </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF"> model</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(static_input)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">torch.cuda.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">current_stream</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">().</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">wait_stream</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(s)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 2. 开启录像机，创建 CUDA Graph 对象</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">g </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> torch.cuda.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">CUDAGraph</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 3. 开始物理录制</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">with</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> torch.cuda.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">graph</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(g):</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    static_output </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF"> model</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(static_input)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 4. 后续消费：在千万次循环中，直接重放图！</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> _ </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">in</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> range</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">10000</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">):</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    # 如果是推理，先将动态输入拷入 static_input 的固定显存地址</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    g.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">replay</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">() </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    # 从 static_output 的固定显存地址直接拿结果，全程 0 CPU 开销！</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h3 id="⚠️-工业落地的冷酷铁律-天下没有免费的午餐" tabindex="-1"><a class="header-anchor" href="#⚠️-工业落地的冷酷铁律-天下没有免费的午餐"><span>⚠️ 工业落地的冷酷铁律（天下没有免费的午餐）</span></a></h3>
<p>CUDA Graphs 速度快到飞起，但它的肉身极其娇贵，在工程上有两大不可逾越的红线：</p>
<ol>
<li><strong>绝对静态内存锁定（Static Memory Address）</strong>：<br>
CUDA Graphs 录制的是<strong>死死的物理显存指针地址</strong>。这意味着，你在重放图（<code v-pre>g.replay()</code>）的时候，输入和输出的 Tensor 在显存里的<strong>物理首地址绝对不能变</strong>。你不能申请新内存，只能玩命地用 <code v-pre>.copy_()</code> 把新数据覆盖进那个录制好的“固定坑位”里。</li>
<li><strong>绝对静态形状锁定（Static Shapes）</strong>：<br>
如果你的输入 Tensor 的维度（Shape）发生改变（例如大模型这一轮处理 10 个 Token，下一轮处理 15 个 Token），<strong>原先录制的硬件拓扑结构当场作废</strong>，强行重放直接引发 CUDA 内存非法越界崩溃。</li>
</ol>
<ul>
<li><em>大模型 Infra 是怎么解的</em>：像 vLLM 这样的顶级推理框架，为了享受到 CUDA Graphs 的极限低延迟，会在系统启动时，<strong>在后台提前把各种可能遇到的长度（如 1 到 2048）全部排列组合录制好几百张不同的 CUDA Graphs 缓存在显存里</strong>（这就是为什么 vLLM 极其吃显存的原因）。运行时输入长度是多少，就动态路由调度对应那张图去重放，拿空间换取绝对的极速。</li>
</ul>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};