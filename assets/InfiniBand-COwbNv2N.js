import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/%E9%AB%98%E5%90%9E%E5%90%90%E5%88%86%E5%B8%83%E5%BC%8F%E7%BD%91%E7%BB%9C%E6%9E%B6%E6%9E%84(%E7%89%A9%E7%90%86%E5%88%86%E5%8F%91)/InfiniBand.html","title":"InfiniBand","lang":"zh-CN","frontmatter":{"title":"InfiniBand","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"在普通的互联网世界，我们用以太网（Ethernet）；但在大模型训练和超级计算机的世界，InfiniBand 是绝对的统治者。它是目前 NVIDIA 构建万卡集群（如 H100 集群）时唯一首选的网络方案。 梓涵，既然你已经了解了 RDMA 和 DPU，那 InfiniBand (IB) 就是站在这个领域食物链顶端的“网络之王”。 在普通的互联网世界，...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"InfiniBand\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/InfiniBand-1.png\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/%E9%AB%98%E5%90%9E%E5%90%90%E5%88%86%E5%B8%83%E5%BC%8F%E7%BD%91%E7%BB%9C%E6%9E%B6%E6%9E%84(%E7%89%A9%E7%90%86%E5%88%86%E5%8F%91)/InfiniBand.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"InfiniBand"}],["meta",{"property":"og:description","content":"在普通的互联网世界，我们用以太网（Ethernet）；但在大模型训练和超级计算机的世界，InfiniBand 是绝对的统治者。它是目前 NVIDIA 构建万卡集群（如 H100 集群）时唯一首选的网络方案。 梓涵，既然你已经了解了 RDMA 和 DPU，那 InfiniBand (IB) 就是站在这个领域食物链顶端的“网络之王”。 在普通的互联网世界，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/InfiniBand-1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.51,"words":754},"filePathRelative":"posts/AI大模型/AI大模型/高吞吐分布式网络架构(物理分发)/InfiniBand.md","excerpt":"<p>在普通的互联网世界，我们用以太网（Ethernet）；但在<strong>大模型训练</strong>和<strong>超级计算机</strong>的世界，InfiniBand 是绝对的统治者。它是目前 NVIDIA 构建万卡集群（如 H100 集群）时唯一首选的网络方案。</p>\\n<figure><img src=\\"/blog/assets/posts/InfiniBand-1.png\\" alt tabindex=\\"0\\" loading=\\"lazy\\"><figcaption></figcaption></figure>\\n<p>梓涵，既然你已经了解了 RDMA 和 DPU，那 <strong>InfiniBand (IB)</strong> 就是站在这个领域食物链顶端的“网络之王”。</p>","autoDesc":true}`),i={name:`InfiniBand.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在普通的互联网世界，我们用以太网（Ethernet）；但在<strong>大模型训练</strong>和<strong>超级计算机</strong>的世界，InfiniBand 是绝对的统治者。它是目前 NVIDIA 构建万卡集群（如 H100 集群）时唯一首选的网络方案。</p>
<figure><img src="/blog/assets/posts/InfiniBand-1.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>梓涵，既然你已经了解了 RDMA 和 DPU，那 <strong>InfiniBand (IB)</strong> 就是站在这个领域食物链顶端的“网络之王”。</p>
<p>在普通的互联网世界，我们用以太网（Ethernet）；但在<strong>大模型训练</strong>和<strong>超级计算机</strong>的世界，InfiniBand 是绝对的统治者。它是目前 NVIDIA 构建万卡集群（如 H100 集群）时唯一首选的网络方案。</p>
<hr>
<h2 id="核心定义-专为-快-而生的网络协议" tabindex="-1"><a class="header-anchor" href="#核心定义-专为-快-而生的网络协议"><span>核心定义：专为“快”而生的网络协议</span></a></h2>
<p>InfiniBand 并不是一种更快的以太网，而是一套<strong>完全独立</strong>的、从底层物理层到应用层重新设计的网络架构。</p>
<ul>
<li><strong>物理层</strong>：它使用专用的 IB 网卡、IB 交换机和特殊的导线。</li>
<li><strong>协议层</strong>：它不跑传统的 TCP/IP，而是天生就为 <strong>RDMA</strong>（远程直接内存访问）设计的。</li>
</ul>
<hr>
<h2 id="为什么-ai-训练离不开它-三大必杀技" tabindex="-1"><a class="header-anchor" href="#为什么-ai-训练离不开它-三大必杀技"><span>为什么 AI 训练离不开它？（三大必杀技）</span></a></h2>
<p>如果你的 Agent 需要在多台服务器之间频繁同步几百 GB 的参数，以太网会让你“等到花儿都谢了”，而 IB 能做到：</p>
<ul>
<li><strong>极低延迟 (Ultra-low Latency)</strong>：</li>
</ul>
<p>以太网的延迟通常在微秒级别，而 IB 能压到<strong>纳秒级</strong>。这对于并行计算中成千上万次的细碎通信至关重要。</p>
<ul>
<li><strong>无损网络 (Lossless Network)</strong>：</li>
</ul>
<p>以太网在拥堵时会丢包（靠 TCP 重传，很慢）。IB 在硬件层面实现了基于信用的流量控制（Credit-based flow control），<strong>天生不丢包</strong>。</p>
<ul>
<li><strong>高带宽与效率</strong>：</li>
</ul>
<p>目前主流已经达到 400Gbps (NDR) 甚至更高。更重要的是，它对 CPU 的占用极低，因为所有的搬运工作都由硬件完成。</p>
<hr>
<h2 id="infiniband-vs-roce-以太网" tabindex="-1"><a class="header-anchor" href="#infiniband-vs-roce-以太网"><span>InfiniBand vs. RoCE (以太网)</span></a></h2>
<p>这是面试中最常考的区别点：</p>
<table>
<thead>
<tr>
<th><strong>特性</strong></th>
<th><strong>InfiniBand (IB)</strong></th>
<th><strong>RoCE (基于以太网)</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>部署成本</strong></td>
<td><strong>极其昂贵</strong>（专用设备）</td>
<td>较低（兼容现有以太网）</td>
</tr>
<tr>
<td><strong>性能</strong></td>
<td><strong>天花板级</strong>，最稳定</td>
<td>很高，但受限于以太网丢包特性</td>
</tr>
<tr>
<td><strong>配置难度</strong></td>
<td>插件化，管理简单（子网管理器）</td>
<td>复杂（需要精细配置交换机 PFC/ECN）</td>
</tr>
<tr>
<td><strong>典型用户</strong></td>
<td>NVIDIA H100 集群、超算中心</td>
<td>互联网大厂云平台、AI 推理集群</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="进阶视角" tabindex="-1"><a class="header-anchor" href="#进阶视角"><span>进阶视角</span></a></h2>
<p>你可以把这个逻辑写进博客，解释为什么 NVIDIA 这么强势：</p>
<p>“NVIDIA 的护城河不仅是 GPU，更是它收购 Mellanox 后获得的 <strong>InfiniBand</strong> 技术。通过 IB 网络，NVIDIA 将成千上万颗 GPU 连成了一台‘超级计算机’。对于运维来说，理解 IB 意味着你触及了 <strong>AI Infra 的性能核心</strong>。虽然我们在本地实验多用以太网，但在真正的生产级大模型训练中，IB 才是确保算力不被网络损耗浪费的唯一答案。”</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};