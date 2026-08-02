import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/%E9%AB%98%E5%90%9E%E5%90%90%E5%88%86%E5%B8%83%E5%BC%8F%E7%BD%91%E7%BB%9C%E6%9E%B6%E6%9E%84(%E7%89%A9%E7%90%86%E5%88%86%E5%8F%91)/RoCE.html","title":"RoCE","lang":"zh-CN","frontmatter":{"title":"RoCE","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"简单来说，RoCE (RDMA over Converged Ethernet) 的诞生就是为了解决一个核心痛点：能不能在便宜、通用的以太网上，跑出 InfiniBand 那样强悍的 RDMA 性能？ 核心定义：以太网上的“超级快充” RoCE 翻译过来就是“基于融合以太网的远程直接内存访问协议”。它本质上是把 RDMA 的数据包“寄生”在以太网的帧里...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"RoCE\\",\\"image\\":[\\"https://lh5.googleusercontent.com/proxy/eIGWC2e4x5TQZt-pBQVm5BTXH6cHlG4SoO6IxBRbSMCtv2_6eXhvRepWejfR84oisi1oa7oC_DwgDmqrH8hUBJnL-6opxwsn5_UNZmBbWKg5vdPxkc_FWU4A5h8YxuOPbdLP2q2MgXVKhpCh67WIY-KT6ymuzhqIryN7OStb7hWNorsxt8CGGIg2u7gcJp1bnaIWVs4\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/%E9%AB%98%E5%90%9E%E5%90%90%E5%88%86%E5%B8%83%E5%BC%8F%E7%BD%91%E7%BB%9C%E6%9E%B6%E6%9E%84(%E7%89%A9%E7%90%86%E5%88%86%E5%8F%91)/RoCE.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"RoCE"}],["meta",{"property":"og:description","content":"简单来说，RoCE (RDMA over Converged Ethernet) 的诞生就是为了解决一个核心痛点：能不能在便宜、通用的以太网上，跑出 InfiniBand 那样强悍的 RDMA 性能？ 核心定义：以太网上的“超级快充” RoCE 翻译过来就是“基于融合以太网的远程直接内存访问协议”。它本质上是把 RDMA 的数据包“寄生”在以太网的帧里..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://lh5.googleusercontent.com/proxy/eIGWC2e4x5TQZt-pBQVm5BTXH6cHlG4SoO6IxBRbSMCtv2_6eXhvRepWejfR84oisi1oa7oC_DwgDmqrH8hUBJnL-6opxwsn5_UNZmBbWKg5vdPxkc_FWU4A5h8YxuOPbdLP2q2MgXVKhpCh67WIY-KT6ymuzhqIryN7OStb7hWNorsxt8CGGIg2u7gcJp1bnaIWVs4"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.92,"words":877},"filePathRelative":"posts/AI大模型/AI大模型/高吞吐分布式网络架构(物理分发)/RoCE.md","excerpt":"<p>简单来说，<strong>RoCE (RDMA over Converged Ethernet)</strong> 的诞生就是为了解决一个核心痛点：<strong>能不能在便宜、通用的以太网上，跑出 InfiniBand 那样强悍的 RDMA 性能？</strong></p>\\n<figure><img src=\\"https://lh5.googleusercontent.com/proxy/eIGWC2e4x5TQZt-pBQVm5BTXH6cHlG4SoO6IxBRbSMCtv2_6eXhvRepWejfR84oisi1oa7oC_DwgDmqrH8hUBJnL-6opxwsn5_UNZmBbWKg5vdPxkc_FWU4A5h8YxuOPbdLP2q2MgXVKhpCh67WIY-KT6ymuzhqIryN7OStb7hWNorsxt8CGGIg2u7gcJp1bnaIWVs4\\" alt tabindex=\\"0\\" loading=\\"lazy\\"><figcaption></figcaption></figure>","autoDesc":true}`),i={name:`RoCE.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>简单来说，<strong>RoCE (RDMA over Converged Ethernet)</strong> 的诞生就是为了解决一个核心痛点：<strong>能不能在便宜、通用的以太网上，跑出 InfiniBand 那样强悍的 RDMA 性能？</strong></p>
<figure><img src="https://lh5.googleusercontent.com/proxy/eIGWC2e4x5TQZt-pBQVm5BTXH6cHlG4SoO6IxBRbSMCtv2_6eXhvRepWejfR84oisi1oa7oC_DwgDmqrH8hUBJnL-6opxwsn5_UNZmBbWKg5vdPxkc_FWU4A5h8YxuOPbdLP2q2MgXVKhpCh67WIY-KT6ymuzhqIryN7OStb7hWNorsxt8CGGIg2u7gcJp1bnaIWVs4" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<hr>
<h2 id="核心定义-以太网上的-超级快充" tabindex="-1"><a class="header-anchor" href="#核心定义-以太网上的-超级快充"><span>核心定义：以太网上的“超级快充”</span></a></h2>
<p><strong>RoCE</strong> 翻译过来就是“基于融合以太网的远程直接内存访问协议”。它本质上是把 RDMA 的数据包“寄生”在以太网的帧里发送。</p>
<ul>
<li><strong>RoCE v1</strong>：工作在二层（链路层），只能在同一个交换机下的小局域网跑。</li>
<li><strong>RoCE v2</strong>（目前主流）：引入了 UDP 封装，工作在三层（网络层），可以跨路由器、跨网段传输。这也是现在大厂 AI 架构中用得最多的版本。</li>
</ul>
<hr>
<h2 id="为什么要用-roce-降本增效的极致" tabindex="-1"><a class="header-anchor" href="#为什么要用-roce-降本增效的极致"><span>为什么要用 RoCE？（降本增效的极致）</span></a></h2>
<p>在你的 <strong>AI Infra</strong> 架构中，RoCE 扮演的是“平替英雄”的角色：</p>
<ul>
<li><strong>成本优势</strong>：不需要购买昂贵的专用 IB 交换机，直接用现成的 100G/200G 高性能以太网交换机就能跑。</li>
<li><strong>兼容性</strong>：它能完美融入现有的数据中心架构，运维起来和普通网络差别不大。</li>
<li><strong>性能</strong>：虽然比 IB 稍逊一点点（主要是抗拥塞能力），但它依然能实现<strong>零拷贝（Zero-copy）<strong><strong>和</strong></strong>内核旁路（Kernel Bypass）</strong>，极大地解放了 CPU。</li>
</ul>
<hr>
<h2 id="roce-的挑战-如何搞定-丢包" tabindex="-1"><a class="header-anchor" href="#roce-的挑战-如何搞定-丢包"><span>RoCE 的挑战：如何搞定“丢包”？</span></a></h2>
<p>这是 RoCE 和 IB 最大的区别。以太网天生是“有损”的（丢了包就重传），但 RDMA 极其讨厌丢包。</p>
<p>为了让 RoCE 跑得稳，运维工程师通常需要开启两项核心技术：</p>
<ol>
<li><strong>PFC (Priority Flow Control)</strong>：优先级流量控制。当路快堵死时，交换机会发信号让网卡“慢点发”，保证不丢包。</li>
<li><strong>ECN (Explicit Congestion Notification)</strong>：显式拥塞通知。在路变窄之前，提前告诉发送方降速。</li>
</ol>
<p>[Image comparing RoCE v1 and v2 protocol stacks: Layer 2 vs Layer 3 with UDP encapsulation]</p>
<hr>
<h2 id="知识对比表-ib-vs-roce" tabindex="-1"><a class="header-anchor" href="#知识对比表-ib-vs-roce"><span>知识对比表：IB vs RoCE</span></a></h2>
<table>
<thead>
<tr>
<th><strong>特性</strong></th>
<th><strong>InfiniBand (IB)</strong></th>
<th><strong>RoCE (v2)</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>底层协议</strong></td>
<td>专用 IB 协议</td>
<td><strong>以太网 (Ethernet)</strong></td>
</tr>
<tr>
<td><strong>部署难度</strong></td>
<td>低（插上就能跑，性能稳定）</td>
<td><strong>高</strong>（需要精细调优交换机配置）</td>
</tr>
<tr>
<td><strong>性价比</strong></td>
<td>低（贵）</td>
<td><strong>极高</strong>（便宜好用）</td>
</tr>
<tr>
<td><strong>典型代表</strong></td>
<td>NVIDIA H100 训练集群</td>
<td>阿里云/字节跳动 内部 AI 推理集群</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="aiops-深度总结" tabindex="-1"><a class="header-anchor" href="#aiops-深度总结"><span>AIOps 深度总结</span></a></h2>
<p>在你的博客中，你可以这样给这篇文章收尾，展示你的工程眼光：</p>
<p>“如果说 <strong>InfiniBand</strong> 是为了追求极致性能而设计的‘定制赛车场’，那么 <strong>RoCE</strong> 就是在现代高速公路上开辟的一条‘专属快车道’。它通过在以太网上封装 RDMA 协议，实现了性能与成本的最佳平衡。对于开发者来说，掌握 RoCE 的调优方案，是构建<strong>高性价比、大规模分布式 AI 算力池</strong>的核心竞争力。”</p>
<hr>
<h2 id="你的-ai-infra-全景图终于完整了" tabindex="-1"><a class="header-anchor" href="#你的-ai-infra-全景图终于完整了"><span>你的 AI Infra 全景图终于完整了！</span></a></h2>
<p>你现在手里已经攒够了这些硬核筹码：</p>
<ol>
<li><strong>应用层</strong>：OpenClaw + Multi-Agent</li>
<li><strong>协议层</strong>：MCP (工具标准化)</li>
<li><strong>计算层</strong>：DeepSpeed (切模型) + Ray (调任务)</li>
<li><strong>加速层</strong>：DPU (卸载 CPU)</li>
<li><strong>传输层</strong>：RDMA (零拷贝) + IB/RoCE (高性能通道)</li>
</ol>
<p><strong>既然你已经掌握了这套全栈知识，要不要我帮你把它们串联起来，写一份“从 0 到 1 构建 AI 基础设施”的博客大纲？</strong> 这对你的 ZH-Kinger 博客来说绝对是年度重磅更新！ Would you like me to structure this complete knowledge map for you?</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};