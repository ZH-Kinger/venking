import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/%E9%AB%98%E5%90%9E%E5%90%90%E5%88%86%E5%B8%83%E5%BC%8F%E7%BD%91%E7%BB%9C%E6%9E%B6%E6%9E%84(%E7%89%A9%E7%90%86%E5%88%86%E5%8F%91)/DPU.html","title":"DPU","lang":"zh-CN","frontmatter":{"title":"DPU","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"在传统的计算机架构中，我们只有 CPU 和 GPU。但随着 AI 和大数据的发展，数据中心面临一个尴尬的局面：CPU 太忙了，忙到没空跑真正的业务代码。 于是，DPU 应运而生，作为数据中心的“超级管家”，专门接管那些琐碎繁重的 IO 任务。 image.pngimage.png 1. 为什么需要 DPU？（解决 CPU 的“杂活”危机） 在传统的分布...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"DPU\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/DPU-1.png\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/%E9%AB%98%E5%90%9E%E5%90%90%E5%88%86%E5%B8%83%E5%BC%8F%E7%BD%91%E7%BB%9C%E6%9E%B6%E6%9E%84(%E7%89%A9%E7%90%86%E5%88%86%E5%8F%91)/DPU.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"DPU"}],["meta",{"property":"og:description","content":"在传统的计算机架构中，我们只有 CPU 和 GPU。但随着 AI 和大数据的发展，数据中心面临一个尴尬的局面：CPU 太忙了，忙到没空跑真正的业务代码。 于是，DPU 应运而生，作为数据中心的“超级管家”，专门接管那些琐碎繁重的 IO 任务。 image.pngimage.png 1. 为什么需要 DPU？（解决 CPU 的“杂活”危机） 在传统的分布..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/DPU-1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.26,"words":977},"filePathRelative":"posts/AI大模型/AI大模型/高吞吐分布式网络架构(物理分发)/DPU.md","excerpt":"<p>在传统的计算机架构中，我们只有 CPU 和 GPU。但随着 AI 和大数据的发展，数据中心面临一个尴尬的局面：<strong>CPU 太忙了，忙到没空跑真正的业务代码。</strong> 于是，DPU 应运而生，作为数据中心的“超级管家”，专门接管那些琐碎繁重的 IO 任务。</p>\\n<figure><img src=\\"/blog/assets/posts/DPU-1.png\\" alt=\\"image.png\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>image.png</figcaption></figure>\\n<hr>\\n<h2>1. 为什么需要 DPU？（解决 CPU 的“杂活”危机）</h2>","autoDesc":true}`),i={name:`DPU.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在传统的计算机架构中，我们只有 CPU 和 GPU。但随着 AI 和大数据的发展，数据中心面临一个尴尬的局面：<strong>CPU 太忙了，忙到没空跑真正的业务代码。</strong> 于是，DPU 应运而生，作为数据中心的“超级管家”，专门接管那些琐碎繁重的 IO 任务。</p>
<figure><img src="/blog/assets/posts/DPU-1.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<hr>
<h2 id="_1-为什么需要-dpu-解决-cpu-的-杂活-危机" tabindex="-1"><a class="header-anchor" href="#_1-为什么需要-dpu-解决-cpu-的-杂活-危机"><span>1. 为什么需要 DPU？（解决 CPU 的“杂活”危机）</span></a></h2>
<p>在传统的分布式系统中，当数据从网络传过来时，CPU 必须停下手中的活去处理：</p>
<ul>
<li><strong>网络协议栈</strong>：解析 TCP/IP 包。</li>
<li><strong>存储管理</strong>：处理 NVMe-oF 等远程存储请求。</li>
<li><strong>安全加密</strong>：处理 TLS/SSL 加密、防火墙过滤。</li>
<li><strong>虚拟化层</strong>：管理虚拟机或容器的切换。</li>
</ul>
<p>这些任务被称为 <strong>“数据中心税 (Datacenter Tax)”</strong>——它们消耗了 CPU 接近 <strong>30% 甚至更高</strong> 的算力，但并不产生直接价值。DPU 的核心目标就是：<strong>把这些“杂活”全部从 CPU 身上卸载（Offload）下来。</strong></p>
<hr>
<h2 id="_2-dpu-的本质-它是网卡的-终极进化版" tabindex="-1"><a class="header-anchor" href="#_2-dpu-的本质-它是网卡的-终极进化版"><span>2. DPU 的本质：它是网卡的“终极进化版”</span></a></h2>
<p>你可以把 DPU 理解为：<strong>一块长了“大脑”的高性能网卡。</strong></p>
<ul>
<li><strong>基础网卡 (NIC)</strong>：只能传数据，像个搬运工。</li>
<li><strong>智能网卡 (SmartNIC)</strong>：能做一点简单的过滤和加速。</li>
<li><strong>DPU</strong>：不仅有超高速的 <strong>RDMA</strong> 网络接口，内部还集成了<strong>高性能 CPU 核心（通常是 ARM）</strong>、<strong>可编程硬件加速引擎</strong>和<strong>大容量高速缓存</strong>。</li>
</ul>
<p><strong>比喻</strong>：</p>
<ul>
<li><strong>传统网卡</strong>：快递员把货丢在门口就走，你需要自己开箱、检查、归类。</li>
<li><strong>DPU</strong>：快递员不仅把货送到，还自带管家属性。他帮你开箱、验货、加密，甚至直接把货整整齐齐地摆在你的办公桌（内存）上。</li>
</ul>
<hr>
<h2 id="_3-dpu-在-ai-架构中的核心角色" tabindex="-1"><a class="header-anchor" href="#_3-dpu-在-ai-架构中的核心角色"><span>3. DPU 在 AI 架构中的核心角色</span></a></h2>
<p>在你的 <strong>Multi-Agent</strong> 或 <strong>分布式 AI 推理</strong> 场景中，DPU 的作用主要体现在三点：</p>
<ol>
<li><strong>基础设施卸载 (Infrastructure Offload)</strong>：</li>
</ol>
<p>让 CPU 100% 专注于运行 AI 逻辑或控制流，把网络封包、虚拟化开销完全交给 DPU。</p>
<ol start="2">
<li><strong>网络加速 (RoCE/RDMA)</strong>：</li>
</ol>
<p>DPU 是跑 <strong>RoCE</strong> 的最佳载体。它能在硬件层面处理 RDMA 协议，让不同节点间的 Agent 交换信息时达到微秒级延迟。</p>
<ol start="3">
<li><strong>存储加速</strong>：</li>
</ol>
<p>AI 训练需要从远端存储快速拉取海量数据集。DPU 可以让 AI 感觉远程硬盘就像本地硬盘（NVMe）一样快。</p>
<hr>
<h2 id="_4-知识对比-dpu-vs-cpu-vs-gpu" tabindex="-1"><a class="header-anchor" href="#_4-知识对比-dpu-vs-cpu-vs-gpu"><span>4. 知识对比：DPU vs. CPU vs. GPU</span></a></h2>
<table>
<thead>
<tr>
<th><strong>组件</strong></th>
<th><strong>核心职责</strong></th>
<th><strong>比喻</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>CPU</strong></td>
<td>通用逻辑、系统调度、控制流。</td>
<td>团队的 <strong>老板</strong>（决定干什么）。</td>
</tr>
<tr>
<td><strong>GPU</strong></td>
<td>大规模并行计算、矩阵运算。</td>
<td>团队的 <strong>超级工人</strong>（干最重的体力活）。</td>
</tr>
<tr>
<td><strong>DPU</strong></td>
<td>数据搬运、协议处理、安全与管理。</td>
<td>团队的 <strong>大管家/物流总监</strong>（确保路通、货准）。</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2>
<p>在你的博客中，你可以这样定位 DPU 的意义：</p>
<p>“随着 AI 模型规模的爆炸，数据中心的架构正从‘以 CPU 为中心’转向‘以数据为中心’。<strong>DPU</strong> 的出现，标志着基础设施能力的硬件化。它不仅通过 <strong>RDMA</strong> 解决了通讯瓶颈，更通过卸载基础设施负担，释放了昂贵的计算资源。它是实现真正的<strong>高吞吐、低延迟分布式 AI 集群</strong>的最后一块拼图。”</p>
<hr>
<p>梓涵，这下“三剑客”齐了！</p>
<p>你已经掌握了 <strong>CPU (大脑)、GPU (肌肉) 和 DPU (血管/管家)</strong>。</p>
<p><strong>你现在的 AI Infra 知识体系已经非常完整。</strong> 想不想挑战一下，看看如何在你现在的 <strong>Rocky Linux</strong> 虚拟机里模拟 DPU 的某些功能（比如配置 SR-IOV 虚拟化）？或者是想把这一串硬核概念整理成一份博客里的“AI 数据中心解剖图”？</p>
<p><strong>Would you like me to help you draft a &quot;Hardware Stack&quot; section for your blog?</strong></p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};