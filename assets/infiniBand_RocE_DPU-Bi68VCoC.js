import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/%E9%AB%98%E5%90%9E%E5%90%90%E5%88%86%E5%B8%83%E5%BC%8F%E7%BD%91%E7%BB%9C%E6%9E%B6%E6%9E%84(%E7%89%A9%E7%90%86%E5%88%86%E5%8F%91)/infiniBand_RocE_DPU.html","title":"infiniBand,RocE,DPU","lang":"zh-CN","frontmatter":{"title":"infiniBand,RocE,DPU","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"梓涵，你已经触及了 AI Data Center（AI数据中心） 最核心的“三剑客”了。 在传统互联网时代，我们用 TCP/IP 握手、用 CPU 处理网络包；但在 AI 时代，数据量大到 CPU 根本处理不过来。于是，这三项技术应运而生，目标只有一个：绕过 CPU，直接把数据“搬”到显存里。 1. InfiniBand (IB) —— 昂贵的“私家赛...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"infiniBand,RocE,DPU\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/%E9%AB%98%E5%90%9E%E5%90%90%E5%88%86%E5%B8%83%E5%BC%8F%E7%BD%91%E7%BB%9C%E6%9E%B6%E6%9E%84(%E7%89%A9%E7%90%86%E5%88%86%E5%8F%91)/infiniBand_RocE_DPU.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"infiniBand,RocE,DPU"}],["meta",{"property":"og:description","content":"梓涵，你已经触及了 AI Data Center（AI数据中心） 最核心的“三剑客”了。 在传统互联网时代，我们用 TCP/IP 握手、用 CPU 处理网络包；但在 AI 时代，数据量大到 CPU 根本处理不过来。于是，这三项技术应运而生，目标只有一个：绕过 CPU，直接把数据“搬”到显存里。 1. InfiniBand (IB) —— 昂贵的“私家赛..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.36,"words":1007},"filePathRelative":"posts/AI大模型/AI大模型/高吞吐分布式网络架构(物理分发)/infiniBand,RocE,DPU.md","excerpt":"<p>梓涵，你已经触及了 <strong>AI Data Center（AI数据中心）</strong> 最核心的“三剑客”了。</p>\\n<p>在传统互联网时代，我们用 TCP/IP 握手、用 CPU 处理网络包；但在 AI 时代，数据量大到 CPU 根本处理不过来。于是，这三项技术应运而生，目标只有一个：<strong>绕过 CPU，直接把数据“搬”到显存里。</strong></p>\\n<hr>\\n<h2>1. InfiniBand (IB) —— 昂贵的“私家赛车场”</h2>\\n<p>InfiniBand 是一种专为高性能计算（HPC）设计的网络标准。它从诞生之日起就不是为了跑网页，而是为了跑超大规模并行计算。</p>","autoDesc":true}`),i={name:`infiniBand,RocE,DPU.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>梓涵，你已经触及了 <strong>AI Data Center（AI数据中心）</strong> 最核心的“三剑客”了。</p>
<p>在传统互联网时代，我们用 TCP/IP 握手、用 CPU 处理网络包；但在 AI 时代，数据量大到 CPU 根本处理不过来。于是，这三项技术应运而生，目标只有一个：<strong>绕过 CPU，直接把数据“搬”到显存里。</strong></p>
<hr>
<h2 id="_1-infiniband-ib-——-昂贵的-私家赛车场" tabindex="-1"><a class="header-anchor" href="#_1-infiniband-ib-——-昂贵的-私家赛车场"><span>1. InfiniBand (IB) —— 昂贵的“私家赛车场”</span></a></h2>
<p>InfiniBand 是一种专为高性能计算（HPC）设计的网络标准。它从诞生之日起就不是为了跑网页，而是为了跑超大规模并行计算。</p>
<ul>
<li>
<p><strong>本质</strong>：一种完全不同于以太网的物理网络协议。它需要专门的 <strong>IB 交换机</strong> 和 <strong>IB 网卡</strong>。</p>
</li>
<li>
<p><strong>核心优势</strong>：</p>
</li>
<li>
<p><strong>极低延迟</strong>：延迟在纳秒级别，远低于传统以太网。</p>
</li>
<li>
<p><strong>无损网络</strong>：它在硬件层面保证不丢包（Credit-based flow control）。</p>
</li>
<li>
<p><strong>原生支持 RDMA</strong>：数据直接在内存间拷贝，无需 CPU 介入。</p>
</li>
<li>
<p><strong>区别</strong>：它是“封闭且高端”的。如果你不差钱（像 NVIDIA 的集群），你会选 IB。</p>
</li>
</ul>
<hr>
<h2 id="_2-roce-rdma-over-converged-ethernet-——-普惠的-高速公路" tabindex="-1"><a class="header-anchor" href="#_2-roce-rdma-over-converged-ethernet-——-普惠的-高速公路"><span>2. RoCE (RDMA over Converged Ethernet) —— 普惠的“高速公路”</span></a></h2>
<p>RoCE 的出现是为了解决一个问题：<strong>能不能在便宜、通用的以太网上，跑出 InfiniBand 的 RDMA 性能？</strong></p>
<ul>
<li>
<p><strong>本质</strong>：它是以太网的一种“进化版”。它把 RDMA 的数据包封装在以太网帧里。</p>
</li>
<li>
<p><strong>核心优势</strong>：</p>
</li>
<li>
<p><strong>兼容性</strong>：可以使用现有的以太网基础设施（虽然需要支持 DCB 的高性能交换机）。</p>
</li>
<li>
<p><strong>性价比</strong>：比 IB 便宜，适合大规模铺开。</p>
</li>
<li>
<p><strong>区别</strong>：RoCE 试图在以太网（有损）上通过协议模拟出无损环境（如 PFC 流量控制）。它和 IB 的竞争就像是“改装后的高速公路” vs “专业赛车场”。</p>
</li>
</ul>
<hr>
<h2 id="_3-dpu-data-processing-unit-——-数据中心的-第三颗大核" tabindex="-1"><a class="header-anchor" href="#_3-dpu-data-processing-unit-——-数据中心的-第三颗大核"><span>3. DPU (Data Processing Unit) —— 数据中心的“第三颗大核”</span></a></h2>
<p>过去我们说电脑有 CPU 和 GPU，现在多了个 <strong>DPU</strong>（NVIDIA 叫它 BlueField）。</p>
<ul>
<li>
<p><strong>本质</strong>：它是网卡（NIC）的进化版。它把原本由 CPU 处理的<strong>网络、存储、安全、管理</strong>逻辑，全部卸载到网卡上的一颗独立芯片里。</p>
</li>
<li>
<p><strong>核心任务</strong>：</p>
</li>
<li>
<p><strong>卸载 (Offloading)</strong>：CPU 不再需要去计算网络包怎么拆、怎么加密。</p>
</li>
<li>
<p><strong>加速</strong>：硬件级处理 NVMe-oF（远程存储访问）和防火墙。</p>
</li>
<li>
<p><strong>区别</strong>：如果说 IB/RoCE 是<strong>路</strong>，那么 DPU 就是<strong>收费站和调度中心</strong>。它让 CPU 彻底从繁重的 IO 琐事中解脱出来，专心运行业务代码。</p>
</li>
</ul>
<hr>
<h2 id="​技术架构大对比" tabindex="-1"><a class="header-anchor" href="#​技术架构大对比"><span>​技术架构大对比</span></a></h2>
<table>
<thead>
<tr>
<th><strong>特性</strong></th>
<th><strong>传统 TCP/IP 网络</strong></th>
<th><strong>InfiniBand (IB)</strong></th>
<th><strong>RoCE (v2)</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>物理介质</strong></td>
<td>普通以太网</td>
<td><strong>专用 IB 线缆/交换机</strong></td>
<td>高性能以太网</td>
</tr>
<tr>
<td><strong>CPU 占用</strong></td>
<td><strong>极高</strong> (需要频繁中断/拷贝)</td>
<td><strong>极低</strong> (RDMA 零拷贝)</td>
<td><strong>极低</strong> (RDMA 零拷贝)</td>
</tr>
<tr>
<td><strong>延迟</strong></td>
<td>毫秒/微秒级 (慢)</td>
<td><strong>纳秒级 (极快)</strong></td>
<td>微秒级 (快)</td>
</tr>
<tr>
<td><strong>可靠性</strong></td>
<td>靠 TCP 丢包重传 (慢)</td>
<td><strong>硬件级无损</strong></td>
<td>靠 PFC 等协议模拟无损</td>
</tr>
<tr>
<td><strong>应用场景</strong></td>
<td>网页、普通办公</td>
<td><strong>大模型训练、超算</strong></td>
<td><strong>AI 推理、云存储、大厂内网</strong></td>
</tr>
</tbody>
</table>
<hr>
<h2 id="💡-梓涵的面试进阶谈资" tabindex="-1"><a class="header-anchor" href="#💡-梓涵的面试进阶谈资"><span>💡 梓涵的面试进阶谈资</span></a></h2>
<p>在你的 AI Infra 博客中，你可以用这个逻辑来总结：</p>
<p>“在大规模分布式 AI 架构中，网络不再是辅助。<strong>InfiniBand</strong> 是目前最顶级的选择，保证了训练时的无损和低延迟；而 <strong>RoCE</strong> 则是企业实现降本增效、在以太网架构上运行 RDMA 的主流方案。而 <strong>DPU</strong> 的加入，则将管理开销（Infrastructure overhead）从 CPU 剥离，实现了真正的<strong>计算与 IO 分离</strong>。”</p>
<hr>
<h2 id="🚀-你的-infra-知识地图已点亮" tabindex="-1"><a class="header-anchor" href="#🚀-你的-infra-知识地图已点亮"><span>🚀 你的 Infra 知识地图已点亮</span></a></h2>
<p>梓涵，你已经从单纯的“写脚本”进化到了“设计数据中心架构”。</p>
<p><strong>接下来，你想不想了解一下：为什么 NVIDIA 买了 Mellanox（做 IB 的）之后才真正统治了 AI 市场？</strong> 或者是你想看看 DPU 是如何配合你刚才学的 <strong>多智能体协作</strong> 来提升效率的？</p>
<p>Would you like me to explain the strategic role of DPU in an AI Agent cluster?</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};