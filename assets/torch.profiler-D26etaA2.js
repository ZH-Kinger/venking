import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/AI_infra/B300%E6%B5%8B%E8%AF%95%E4%B8%8E%E4%BC%98%E5%8C%96/torch.profiler/torch.profiler.html","title":"torch.profiler","lang":"zh-CN","frontmatter":{"title":"torch.profiler","icon":"cpu","date":"2026-07-23T00:00:00.000Z","category":["AI基础设施"],"description":"在大模型和 PyTorch 2.0+ 时代，torch.compile() 是一项具有划时代意义的编译器级黑科技。 一句话道破本质：torch.compile() 是一个“代码物理重构与加速引擎”。它能将你用 Python 编写的、原本慢吞吞“单步执行”的 PyTorch 动态代码，物理编译成针对特定显卡（如 Hopper/Blackwell）极致优化...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"torch.profiler\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/AI_infra/B300%E6%B5%8B%E8%AF%95%E4%B8%8E%E4%BC%98%E5%8C%96/torch.profiler/torch.profiler.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"torch.profiler"}],["meta",{"property":"og:description","content":"在大模型和 PyTorch 2.0+ 时代，torch.compile() 是一项具有划时代意义的编译器级黑科技。 一句话道破本质：torch.compile() 是一个“代码物理重构与加速引擎”。它能将你用 Python 编写的、原本慢吞吞“单步执行”的 PyTorch 动态代码，物理编译成针对特定显卡（如 Hopper/Blackwell）极致优化..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":4.32,"words":1297},"filePathRelative":"posts/AI基础设施/学习计划/AI_infra/B300测试与优化/torch.profiler/torch.profiler.md","excerpt":"<p>在大模型和 PyTorch 2.0+ 时代，<code>torch.compile()</code> 是一项具有划时代意义的<strong>编译器级黑科技</strong>。</p>\\n<p>一句话道破本质：<code>torch.compile()</code> <strong>是一个“代码物理重构与加速引擎”。它能将你用 Python 编写的、原本慢吞吞“单步执行”的 PyTorch 动态代码，物理编译成针对特定显卡（如 Hopper/Blackwell）极致优化后的高速机器码，在完全不改变模型精度（Loss/Action）的前提下，让训练和推理的速度原地狂飙 15% - 50%。</strong></p>","autoDesc":true}`),i={name:`torch.profiler.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在大模型和 PyTorch 2.0+ 时代，<code v-pre>torch.compile()</code> 是一项具有划时代意义的<strong>编译器级黑科技</strong>。</p>
<p>一句话道破本质：<code v-pre>torch.compile()</code> <strong>是一个“代码物理重构与加速引擎”。它能将你用 Python 编写的、原本慢吞吞“单步执行”的 PyTorch 动态代码，物理编译成针对特定显卡（如 Hopper/Blackwell）极致优化后的高速机器码，在完全不改变模型精度（Loss/Action）的前提下，让训练和推理的速度原地狂飙 15% - 50%。</strong></p>
<hr>
<h3 id="一、-痛点-为什么原生-pytorch-需要编译" tabindex="-1"><a class="header-anchor" href="#一、-痛点-为什么原生-pytorch-需要编译"><span>一、 痛点：为什么原生 PyTorch 需要编译？</span></a></h3>
<p>原生的 PyTorch 采用的是“急切执行（Eager Mode）”模式。</p>
<ul>
<li><strong>物理过程</strong>：大模型在跑前向传播时，Python 会像个传话筒一样，执行完第 1 行（比如矩阵加法），把数据丢给 GPU，等 GPU 算完；再执行第 2 行（比如激活函数 Sigmoid），再丢给 GPU……</li>
<li><strong>致命死穴</strong>：</li>
</ul>
<ol>
<li><strong>频繁的 GPU 读写开销（Memory-bound）</strong>：每一步计算的中间结果，都必须从 GPU 的高速计算单元（SRAM）里退出来，物理写入到慢速的显存（HBM/VRAM）中，下一步再读出来。这种高频的读写（I/O）极大地拖慢了速度。</li>
<li><strong>Python 解释器本身的开销（Overhead）</strong>：Python 语言本身执行慢，在处理高频、极短的算子时，Python 传话的速度甚至跟不上 GPU 计算的速度。</li>
</ol>
<hr>
<h3 id="二、-torch-compile-的核心物理魔法-算子融合-kernel-fusion" tabindex="-1"><a class="header-anchor" href="#二、-torch-compile-的核心物理魔法-算子融合-kernel-fusion"><span>二、 <code v-pre>torch.compile()</code> 的核心物理魔法：算子融合（Kernel Fusion）</span></a></h3>
<p>当你对模型套上 <code v-pre>compiled_model = torch.compile(model)</code> 时，PyTorch 底层会悄悄拉起三大核心编译器技术（<strong>TorchDynamo、AOTAutograd、Triton</strong>）。</p>
<p>它最核心的降维打击手段叫做<strong>算子融合（Kernel Fusion）</strong>。</p>
<p>假设你的模型中有这样一段基础运算：</p>
<p>$$<br>
Y = \\text{Activation}(\\text{LayerNorm}(X \\times W + B))<br>
$$</p>
<ul>
<li><strong>没有</strong> <code v-pre>torch.compile**</code><strong>：GPU 需要分别启动 4 个不同的物理算子（Kernel）去干活。数据要在显存（VRAM）和 GPU 核心（SRAM）之间</strong>来回倒腾 4 次**。</li>
<li><strong>开启</strong> <code v-pre>torch.compile**</code><strong>：编译器会一眼看穿整段代码的物理意图。它直接用</strong> <strong>Triton</strong> <strong>语言，</strong>当场把这 4 步合并编写成一个量身定制的“超级算子”（Fused Kernel）**。</li>
</ul>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span> 【 传统 Eager 模式 】                 【 torch.compile 融合模式 】</span></span>
<span class="line"><span>   GPU 核心 (SRAM)                      GPU 核心 (SRAM)</span></span>
<span class="line"><span>  ┌───────────────┐                    ┌─────────────────────────┐</span></span>
<span class="line"><span>  │ 1. 矩阵乘法    │                    │                         │</span></span>
<span class="line"><span>  └───────┬───────┘                    │                         │</span></span>
<span class="line"><span>          ▼ 写入/读取显存 (VRAM)         │                         │</span></span>
<span class="line"><span>  ┌───────────────┐                    │   直接在 GPU 寄存器内部    │</span></span>
<span class="line"><span>  │ 2. 偏置加法    │                    │   一次性把 4 步算完     │</span></span>
<span class="line"><span>  └───────┬───────┘                    │                         │</span></span>
<span class="line"><span>          ▼ 写入/读取显存 (VRAM)         │                         │</span></span>
<span class="line"><span>  ┌───────────────┐                    │                         │</span></span>
<span class="line"><span>  │ 3. LayerNorm  │                    │                         │</span></span>
<span class="line"><span>  └───────┬───────┘                    └────────────┬────────────┘</span></span>
<span class="line"><span>          ▼ 写入/读取显存 (VRAM)                             │</span></span>
<span class="line"><span>  ┌───────────────┐                                         ▼ 仅写入一次显存</span></span>
<span class="line"><span>  │ 4. 激活函数    │                                ┌─────────────────┐</span></span>
<span class="line"><span>  └───────────────┘                                │  最终输出 Y      │</span></span>
<span class="line"><span>                                                   └─────────────────┘</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>数据只需要在刚进入时读一次，在输出时写一次，中间所有的临时账本（激活值）全部在 GPU 的超高速片上缓存（SRAM）里流转。<strong>内存带宽压力瞬间减少了 70%，Step/s 瞬间暴涨。</strong></p>
<hr>
<h3 id="三、-极简工程代码-如何使用它" tabindex="-1"><a class="header-anchor" href="#三、-极简工程代码-如何使用它"><span>三、 极简工程代码：如何使用它</span></a></h3>
<p>在代码中启用它极其无脑，甚至不需要修改任何模型结构：</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> torch</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 1. 定义你的标准 PyTorch 模型 (比如一个 Transformer Block)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">model </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF"> MyTransformerBlock</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">().</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">cuda</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 2. 一键编译！</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># mode 可选: </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># - "default" (平衡编译时间和加速比)</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># - "reduce-overhead" (适合小 Batch，能显著干掉 Python 开销，但显存开销会略微增加)</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># - "max-autotune" (极致压榨显卡，编译很慢，但跑起来最快)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">compiled_model </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> torch.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">compile</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(model, </span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">mode</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"default"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 3. 正常写训练/推理循环</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># ⚠️ 注意：第一次执行 forward(inputs) 时会非常卡（可能要卡几十秒甚至几分钟）</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 因为编译器正在后台疯狂地进行代码分析、生成 Triton C++ 机器码并编译。</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 一旦第一步（Warmup）走完，后面所有的 Steps 就会直接进入狂飙模式。</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">outputs </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF"> compiled_model</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(inputs)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h3 id="四、-工业落地必须要知道的坑-架构师预警" tabindex="-1"><a class="header-anchor" href="#四、-工业落地必须要知道的坑-架构师预警"><span>四、 工业落地必须要知道的坑（架构师预警）</span></a></h3>
<p>虽然 <code v-pre>torch.compile</code> 极为诱人，但在复杂的分布式大模型生产中，你需要提防以下两点：</p>
<ol>
<li><strong>图分裂（Graph Breaks）</strong>：<br>
<code v-pre>torch.compile</code> 的前提是它能把你的代码绘制成一个连续、确定的“静态计算图”。</li>
</ol>
<ul>
<li>如果你的模型代码里包含大量复杂的 Python 原生控制流（比如 <code v-pre>if x.sum() &gt; 0: print(&quot;error&quot;)</code>，或者在 Forward 里面调用了第三方非 PyTorch 的库），编译器无法预测其走向，就会产生“图分裂”。</li>
<li>一旦发生分裂，系统会退回到慢速的 Eager Mode 交互。如果分裂太多，编译甚至比不编译还要慢。</li>
</ul>
<ol start="2">
<li><strong>动态形状（Dynamic Shapes）的妥协</strong>：<br>
如果你的大模型推理输入，每次送入的 <code v-pre>seq_len</code>（文本长度）都是忽长忽短随机变化的，编译器会反复触发重新编译。</li>
</ol>
<ul>
<li><em>应对</em>：好在现在的 <code v-pre>torch.compile</code> 已经支持 <code v-pre>dynamic=True</code> 参数，虽然会稍微损失一点极限加速比，但能完美兼容动态长度。</li>
</ul>
<h3 id="💡-决策一句话" tabindex="-1"><a class="header-anchor" href="#💡-决策一句话"><span>💡 决策一句话：</span></a></h3>
<p>如果你正在使用 <strong>PyTorch 2.0 以上版本</strong>，并且你的模型（特别是 Transformer 架构，如 Llama、BERT等）已经进入到<strong>需要大规模压榨吞吐量（Samples/s）的生产/微调阶段</strong>，请毫不犹豫地在你的启动脚本里加上 <code v-pre>torch.compile()</code>。这是在不改变任何数学逻辑和代码结构的前提下，显卡厂商和 PyTorch 官方免费送给你的“性能蛋糕”。</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};