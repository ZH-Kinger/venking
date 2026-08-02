import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/%E5%88%86%E5%B8%83%E5%BC%8F%E8%AE%AD%E7%BB%83(%E8%BD%AF%E4%BB%B6%E5%88%86%E5%8F%91(Framework))/DeepSpeed.html","title":"DeepSpeed","lang":"zh-CN","frontmatter":{"title":"DeepSpeed","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"DeepSpeed是什么？ DeepSpeed 是理解现代 AI 大规模部署的必经之路。如果说大模型是“庞然大物”，那么 DeepSpeed 就是一套极致的**“空间折叠技术”**。 它是微软开发的一个深度学习优化库，核心使命只有一个：打破显存限制，让小显卡（或更少的显卡）也能跑大模型 1. 核心大招：ZeRO (零冗余优化器) 这是 DeepSpee...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"DeepSpeed\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/%E5%88%86%E5%B8%83%E5%BC%8F%E8%AE%AD%E7%BB%83(%E8%BD%AF%E4%BB%B6%E5%88%86%E5%8F%91(Framework))/DeepSpeed.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"DeepSpeed"}],["meta",{"property":"og:description","content":"DeepSpeed是什么？ DeepSpeed 是理解现代 AI 大规模部署的必经之路。如果说大模型是“庞然大物”，那么 DeepSpeed 就是一套极致的**“空间折叠技术”**。 它是微软开发的一个深度学习优化库，核心使命只有一个：打破显存限制，让小显卡（或更少的显卡）也能跑大模型 1. 核心大招：ZeRO (零冗余优化器) 这是 DeepSpee..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.84,"words":851},"filePathRelative":"posts/AI大模型/AI大模型/分布式训练(软件分发(Framework))/DeepSpeed.md","excerpt":"<h2>DeepSpeed是什么？</h2>\\n<p>DeepSpeed 是理解现代 AI 大规模部署的<strong>必经之路</strong>。如果说大模型是“庞然大物”，那么 DeepSpeed 就是一套极致的**“空间折叠技术”**。</p>\\n<p>它是微软开发的一个深度学习优化库，核心使命只有一个：<strong>打破显存限制，让小显卡（或更少的显卡）也能跑大模型</strong></p>\\n<hr>\\n<h2>1. 核心大招：ZeRO (零冗余优化器)</h2>\\n<p>这是 DeepSpeed 的成名绝技。在传统的分布式训练中，每个 GPU 都要存储一份完整的模型参数、梯度和优化器状态。这就像每个员工都背着全套的工具箱，非常沉重且浪费。</p>","autoDesc":true}`),i={name:`DeepSpeed.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><h2 id="deepspeed是什么" tabindex="-1"><a class="header-anchor" href="#deepspeed是什么"><span>DeepSpeed是什么？</span></a></h2>
<p>DeepSpeed 是理解现代 AI 大规模部署的<strong>必经之路</strong>。如果说大模型是“庞然大物”，那么 DeepSpeed 就是一套极致的**“空间折叠技术”**。</p>
<p>它是微软开发的一个深度学习优化库，核心使命只有一个：<strong>打破显存限制，让小显卡（或更少的显卡）也能跑大模型</strong></p>
<hr>
<h2 id="_1-核心大招-zero-零冗余优化器" tabindex="-1"><a class="header-anchor" href="#_1-核心大招-zero-零冗余优化器"><span>1. 核心大招：ZeRO (零冗余优化器)</span></a></h2>
<p>这是 DeepSpeed 的成名绝技。在传统的分布式训练中，每个 GPU 都要存储一份完整的模型参数、梯度和优化器状态。这就像每个员工都背着全套的工具箱，非常沉重且浪费。</p>
<p>ZeRO 将这些数据分成了三个阶段进行“瘦身”：</p>
<ul>
<li><strong>ZeRO-1</strong>：只把**优化器状态（Optimizer States）**切开，平摊到各个 GPU。</li>
<li><strong>ZeRO-2</strong>：把**梯度（Gradients）**也切开平摊。</li>
<li><strong>ZeRO-3</strong>：最激进的阶段，把**模型参数（Parameters）**也全部切开平摊。</li>
</ul>
<p><strong>结果</strong>：原本需要 64 张显卡才能跑的模型，用了 ZeRO-3 之后，可能 8 张显卡就能跑起来。显存占用被降低到了原来的 $1/N$（N 是显卡数量）。</p>
<hr>
<h2 id="_2-内存卸载-offload-技术" tabindex="-1"><a class="header-anchor" href="#_2-内存卸载-offload-技术"><span>2. 内存卸载：Offload 技术</span></a></h2>
<p>如果你的显存（VRAM）连切开后的模型都塞不下，DeepSpeed 还有第二招：<strong>Offload</strong>。</p>
<ul>
<li><strong>CPU Offload</strong>：把暂时不参与计算的参数挪到 <strong>内存 (RAM)</strong> 里。</li>
<li><strong>NVMe Offload</strong>：如果内存也满了，就挪到 <strong>SSD 硬盘</strong> 里。</li>
</ul>
<p>虽然硬盘比显存慢，但通过 DeepSpeed 极致的预取（Prefetch）和并行策略，它能让你在普通的消费级显卡（比如单张 RTX 3090/4090）上跑起原本属于 A100/H100 的千亿参数大模型。</p>
<hr>
<h2 id="_3-deepspeed-与底层的联动-结合你之前的-infra-知识" tabindex="-1"><a class="header-anchor" href="#_3-deepspeed-与底层的联动-结合你之前的-infra-知识"><span>3. DeepSpeed 与底层的联动（结合你之前的 Infra 知识）</span></a></h2>
<p>为什么我之前一直跟你强调 <strong>RDMA</strong> 和 <strong>InfiniBand</strong>？因为 DeepSpeed 的 ZeRO 架构有一个副作用：<strong>通信压力极大</strong>。</p>
<p>由于参数被切开存在不同显卡上，每次计算（前向传播和反向传播）时，GPU 之间都要疯狂地互相“借”参数。</p>
<ul>
<li>如果你的网络是普通的 <strong>TCP/IP</strong>，带宽低且 CPU 占用高，DeepSpeed 就会卡在数据传输上（即 <strong>Communication Bottleneck</strong>）。</li>
<li>如果你有 <strong>RDMA/RoCE</strong>，数据搬运几乎不占 CPU，DeepSpeed 才能发挥出真正的“空间折叠”威力。</li>
</ul>
<hr>
<h2 id="_4-实战笔记" tabindex="-1"><a class="header-anchor" href="#_4-实战笔记"><span>4. 实战笔记</span></a></h2>
<p>你可以把 DeepSpeed 总结为 AI 运维中的 <strong>“资源调优大师”</strong>：</p>
<table>
<thead>
<tr>
<th><strong>解决的问题</strong></th>
<th><strong>DeepSpeed 的方案</strong></th>
<th><strong>运维效果</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>显存溢出 (OOM)</strong></td>
<td>ZeRO 1/2/3 分块存储</td>
<td>支持训练/微调超大规模模型</td>
</tr>
<tr>
<td><strong>硬件设备贵</strong></td>
<td>CPU/NVMe Offload</td>
<td>用廉价硬件跑高性能任务</td>
</tr>
<tr>
<td><strong>训练速度慢</strong></td>
<td>1位 Adam 优化器 / 浮点压缩</td>
<td>提高吞吐量，缩短训练周期</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="这块知识如何运用" tabindex="-1"><a class="header-anchor" href="#这块知识如何运用"><span>这块知识如何运用？</span></a></h2>
<p>你在面试时，如果能把 <strong>DeepSpeed 的 ZeRO 机制</strong> 结合 <strong>RDMA 网络</strong> 一起讲，面试官会觉得你对“AI 系统的全栈协同”理解得非常深刻。</p>
<p>既然 DeepSpeed 是为了处理“大”，而你之前研究的量化是为了让模型变“小”，你想不想对比一下：<strong>在一个 4B 的轻量级 Agent 场景下，是该用 DeepSpeed 还是该用量化？</strong></p>
<p>我会建议你在博客中写一个专题：<strong>《大与小的博弈：DeepSpeed 的分布式扩展 vs 模型量化的本地加速》</strong>。要不要我帮你理一下这个专题的提纲？</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};