import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/%E8%AE%AD%E7%BB%83%E6%9E%B6%E6%9E%84/%E5%88%86%E5%B8%83%E5%BC%8F%E8%AE%AD%E7%BB%83/PyTorch_%E5%88%86%E5%B8%83%E5%BC%8F%E6%A6%82%E8%BF%B0/Parallel_(%E5%B9%B6%E8%A1%8C)/FSDP2/Placement(%E6%94%BE%E7%BD%AE%E7%AD%96%E7%95%A5).html","title":"Placement(放置策略)","lang":"zh-CN","frontmatter":{"title":"Placement(放置策略)","icon":"cpu","date":"2026-07-23T00:00:00.000Z","category":["AI基础设施"],"description":"我们在聊 DTensor 的时候，其实你在那个可视化工具里已经和它打过照面了。现在我们来给它下一个极其严谨且硬核的定义。 如果说 DeviceMesh（设备网格） 是一张说明了 GPU 怎么排列的“硬件地图”； 那么 Placement（放置策略） 就是一张说明了全局数据该怎么发到这些 GPU 上的“切蛋糕说明书”。 在 PyTorch 的底层源码中，...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Placement(放置策略)\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/%E8%AE%AD%E7%BB%83%E6%9E%B6%E6%9E%84/%E5%88%86%E5%B8%83%E5%BC%8F%E8%AE%AD%E7%BB%83/PyTorch_%E5%88%86%E5%B8%83%E5%BC%8F%E6%A6%82%E8%BF%B0/Parallel_(%E5%B9%B6%E8%A1%8C)/FSDP2/Placement(%E6%94%BE%E7%BD%AE%E7%AD%96%E7%95%A5).html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"Placement(放置策略)"}],["meta",{"property":"og:description","content":"我们在聊 DTensor 的时候，其实你在那个可视化工具里已经和它打过照面了。现在我们来给它下一个极其严谨且硬核的定义。 如果说 DeviceMesh（设备网格） 是一张说明了 GPU 怎么排列的“硬件地图”； 那么 Placement（放置策略） 就是一张说明了全局数据该怎么发到这些 GPU 上的“切蛋糕说明书”。 在 PyTorch 的底层源码中，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.47,"words":1041},"filePathRelative":"posts/AI基础设施/学习计划/训练架构/分布式训练/PyTorch_分布式概述/Parallel_(并行)/FSDP2/Placement(放置策略).md","excerpt":"<p>我们在聊 DTensor 的时候，其实你在那个可视化工具里已经和它打过照面了。现在我们来给它下一个极其严谨且硬核的定义。</p>\\n<p>如果说 <strong>DeviceMesh（设备网格）</strong> 是一张说明了 GPU 怎么排列的“硬件地图”<strong>；<br>\\n那么</strong> <strong>Placement（放置策略）</strong> <strong>就是一张说明了全局数据该怎么发到这些 GPU 上的</strong>“切蛋糕说明书”。</p>\\n<p>在 PyTorch 的底层源码中，有且仅有三种最基础的 Placement 原语。作为 AI Infra SRE，你不仅要知道它们怎么切数据，更要一眼看出<strong>它们在底层会触发什么样极其昂贵的 NCCL 网络通信</strong>。</p>","autoDesc":true}`),i={name:`Placement(放置策略).md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>我们在聊 DTensor 的时候，其实你在那个可视化工具里已经和它打过照面了。现在我们来给它下一个极其严谨且硬核的定义。</p>
<p>如果说 <strong>DeviceMesh（设备网格）</strong> 是一张说明了 GPU 怎么排列的“硬件地图”<strong>；<br>
那么</strong> <strong>Placement（放置策略）</strong> <strong>就是一张说明了全局数据该怎么发到这些 GPU 上的</strong>“切蛋糕说明书”。</p>
<p>在 PyTorch 的底层源码中，有且仅有三种最基础的 Placement 原语。作为 AI Infra SRE，你不仅要知道它们怎么切数据，更要一眼看出<strong>它们在底层会触发什么样极其昂贵的 NCCL 网络通信</strong>。</p>
<h3 id="pytorch-的三大-placement-策略" tabindex="-1"><a class="header-anchor" href="#pytorch-的三大-placement-策略"><span>PyTorch 的三大 Placement 策略</span></a></h3>
<p>假设我们有一个全局的二维权重矩阵（100行 x 100列），要放到 4 张卡上。</p>
<h4 id="_1-replicate-全量复制" tabindex="-1"><a class="header-anchor" href="#_1-replicate-全量复制"><span>1. Replicate (全量复制)</span></a></h4>
<ul>
<li><strong>怎么放：</strong> 每张 GPU 的显存里，都塞入一个完整的 100x100 矩阵。</li>
<li><strong>SRE 视角（极度费显存）：</strong> 这就是最传统的 DDP（数据并行）行为。</li>
<li><strong>触发的 NCCL 动作：</strong> 当你试图把数据从某一张卡同步成 <code v-pre>Replicate</code> 状态时，底层会自动触发 <code v-pre>NCCL Broadcast</code><strong>（广播）</strong> 或者 <code v-pre>NCCL AllGather</code><strong>（全量收集）</strong>。</li>
</ul>
<h4 id="_2-shard-维度分片" tabindex="-1"><a class="header-anchor" href="#_2-shard-维度分片"><span>2. Shard (维度分片)</span></a></h4>
<ul>
<li><strong>怎么放：</strong> 切蛋糕。</li>
<li><code v-pre>Shard(0)</code>：按行切，每张卡拿到 25行 x 100列。</li>
<li><code v-pre>Shard(1)</code>：按列切，每张卡拿到 100行 x 25列。</li>
<li><strong>SRE 视角（拯救显存）：</strong> 这是 FSDP 和 TP（张量并行）的核心。切得越碎，单卡显存占用越小。</li>
<li><strong>触发的 NCCL 动作：</strong> 当你把一个 <code v-pre>Replicate</code> 的张量变成 <code v-pre>Shard</code> 时，相当于把多余的数据扔掉，不需要通信（Scatter）。但如果你要把 <code v-pre>Shard</code> 变回 <code v-pre>Replicate</code>，就会触发疯狂的 <code v-pre>NCCL AllGather</code>。</li>
</ul>
<h4 id="_3-partial-部分和-待规约-——-✨高阶必考点" tabindex="-1"><a class="header-anchor" href="#_3-partial-部分和-待规约-——-✨高阶必考点"><span>3. Partial (部分和/待规约) —— ✨高阶必考点</span></a></h4>
<ul>
<li><strong>怎么放：</strong> 每张卡上都有一块 <strong>形状完整 (100x100)</strong> 但 <strong>数值不完整</strong> 的矩阵。</li>
<li><strong>大白话解释：</strong> 想象你在算这桌饭钱，GPU 0 算了酒水钱（100元），GPU 1 算了菜钱（200元）。它们手里拿的都是“局部总和”。在算法眼里，真实的全局结果必须是它们相加（300元）。</li>
<li><strong>SRE 视角（网络大杀器）：</strong> <code v-pre>Partial</code> 状态是张量并行（TP）在做完矩阵乘法后必经的中间状态。当你试图把 <code v-pre>Partial</code> 状态转换成真实的可用数据时，PyTorch 底层会毫不犹豫地触发 <code v-pre>NCCL AllReduce</code><strong>（全量规约，把所有卡的数据加起来求和）</strong>。如果你的网络不行，这一步就会卡死。</li>
</ul>
<hr>
<h3 id="sre-看代码-魔法是如何发生的" tabindex="-1"><a class="header-anchor" href="#sre-看代码-魔法是如何发生的"><span>SRE 看代码：魔法是如何发生的？</span></a></h3>
<p>算法工程师在最前沿的 FSDP2 或 TP 代码里，就是通过组合 <strong>DeviceMesh</strong> 和 <strong>Placement</strong> 来召唤 DTensor 的。</p>
<p>看看这行极具工业美感的代码：</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> torch</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> torch.distributed.tensor </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> distribute_tensor, Replicate, Shard</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 假设我们在前面建好了一个 2D 网格，大小是 [2台机器, 4张卡]</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># mesh_dim_names = ("dp", "tp")</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 把一个普通的本地 Tensor 变成分布式的 DTensor</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">dtensor </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF"> distribute_tensor</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    local_tensor, </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    device_mesh, </span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">    placements</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">Replicate</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(), </span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">Shard</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)]  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 这里的魔法！</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>SRE 级别解析：</strong>这里的 <code v-pre>placements=[Replicate(), Shard(0)]</code> 对应了前面 <code v-pre>DeviceMesh</code> 的两个维度：</p>
<ol>
<li>**在 &quot;dp&quot; (跨机器) 维度上 <code v-pre>Replicate()**</code>：意味着机器 1 和机器 2 拥有完全一样的模型副本（这就是我们刚才聊的 <strong>HSDP 跨机复制</strong>逻辑！）。</li>
<li>**在 &quot;tp&quot; (机内 NVLink) 维度上 <code v-pre>Shard(0)**</code>：意味着同一台机器里的 4 张卡，把参数按行切成了 4 份，分摊了显存（这就是 <strong>TP/FSDP 机内切分</strong>逻辑！）。</li>
</ol>
<p><strong>总结公式：</strong><br>
<code v-pre>全局数据 (Global Tensor) = 本地物理碎片 (Local Tensor) + 设备网格 (DeviceMesh) + 放置策略 (Placement)</code></p>
<p>理解了这三个概念，你就彻底看透了 PyTorch 分布式框架的五脏六腑。以后算法工程师抱怨“跑得慢”、“显存炸了”，你脑子里浮现的就不再是一堆乱码，而是数据在设备网格之间被 <code v-pre>Shard</code>、<code v-pre>Replicate</code> 和 <code v-pre>AllReduce</code> 的物理运动轨迹。</p>
<p>这一块的底层抽象非常密集，目前关于 DTensor 和它的通信机制，你的脑海里是不是已经有一张比较清晰的网络拓扑图了？</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};