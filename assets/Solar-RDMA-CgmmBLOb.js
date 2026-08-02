import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/AI_infra/5_node_5090%E8%AE%A1%E7%AE%97%E8%8A%82%E7%82%B9%E6%94%B9%E9%80%A0/%E9%98%BF%E9%87%8C%E4%BA%91%E7%81%B5%E9%AA%8F%E6%99%BA%E7%AE%97%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%9E%B6%E6%9E%84/%E7%BD%91%E7%BB%9C%E5%B1%82/Solar-RDMA.html","title":"Solar-RDMA","lang":"zh-CN","frontmatter":{"title":"Solar-RDMA","icon":"cpu","date":"2026-07-23T00:00:00.000Z","category":["AI基础设施"],"description":"在大模型万卡集群（如阿里云灵骏智算）的底层网络中，Solar-RDMA（在业内常被称为 Solar 协议或阿里云自研高性能端网协同传输协议）是支撑 HPN（高性能网络） 能够全速飙车的核心通信协议内核。 如果把 HPN 比作是一座设计完美的八车道全连接高速公路，那么 Solar-RDMA 就是行驶在上面的、拥有自主导航和防撞功能的超极速赛车****。 ...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Solar-RDMA\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/AI_infra/5_node_5090%E8%AE%A1%E7%AE%97%E8%8A%82%E7%82%B9%E6%94%B9%E9%80%A0/%E9%98%BF%E9%87%8C%E4%BA%91%E7%81%B5%E9%AA%8F%E6%99%BA%E7%AE%97%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%9E%B6%E6%9E%84/%E7%BD%91%E7%BB%9C%E5%B1%82/Solar-RDMA.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"Solar-RDMA"}],["meta",{"property":"og:description","content":"在大模型万卡集群（如阿里云灵骏智算）的底层网络中，Solar-RDMA（在业内常被称为 Solar 协议或阿里云自研高性能端网协同传输协议）是支撑 HPN（高性能网络） 能够全速飙车的核心通信协议内核。 如果把 HPN 比作是一座设计完美的八车道全连接高速公路，那么 Solar-RDMA 就是行驶在上面的、拥有自主导航和防撞功能的超极速赛车****。 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":5.84,"words":1753},"filePathRelative":"posts/AI基础设施/学习计划/AI_infra/5_node_5090计算节点改造/阿里云灵骏智算服务器架构/网络层/Solar-RDMA.md","excerpt":"<p>在大模型万卡集群（如阿里云灵骏智算）的底层网络中，<strong>Solar-RDMA</strong>（在业内常被称为 <strong>Solar</strong> 协议或阿里云自研高性能端网协同传输协议）是支撑 <strong>HPN（高性能网络）</strong> 能够全速飙车的<strong>核心通信协议内核</strong>。</p>\\n<p><strong>如果把 HPN 比作是一座设计完美的八车道全连接高速公路，那么</strong> <strong>Solar-RDMA 就是行驶在上面的、拥有自主导航和防撞功能的超极速赛车****。</strong></p>\\n<p><strong>以下是关于 Solar-RDMA 的物理实现机制、核心破局点以及它在大模型训练中的技术详解：</strong></p>","autoDesc":true}`),i={name:`Solar-RDMA.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在大模型万卡集群（如阿里云灵骏智算）的底层网络中，<strong>Solar-RDMA</strong>（在业内常被称为 <strong>Solar</strong> 协议或阿里云自研高性能端网协同传输协议）是支撑 <strong>HPN（高性能网络）</strong> 能够全速飙车的<strong>核心通信协议内核</strong>。</p>
<p><strong>如果把 HPN 比作是一座设计完美的八车道全连接高速公路，那么</strong> <strong>Solar-RDMA 就是行驶在上面的、拥有自主导航和防撞功能的超极速赛车****。</strong></p>
<p><strong>以下是关于 Solar-RDMA 的物理实现机制、核心破局点以及它在大模型训练中的技术详解：</strong></p>
<hr>
<h3 id="一、-痛点-为什么传统的-roce-v2-和-infiniband-在大模型万卡下会掉链子" tabindex="-1"><a class="header-anchor" href="#一、-痛点-为什么传统的-roce-v2-和-infiniband-在大模型万卡下会掉链子"><span><strong>一、 痛点：为什么传统的 RoCE v2 和 InfiniBand 在大模型万卡下会掉链子？</strong></span></a></h3>
<p><strong>在 Solar-RDMA 诞生前，智算中心主要依赖两种网络传输手段：一种是贵上天且闭源的</strong> <strong>InfiniBand (IB)****，另一种是基于标准以太网的</strong> <strong>RoCE v2****。但在千卡、万卡分布式训练中，RoCE v2 暴露出两个几乎致命的物理死穴：</strong></p>
<ol>
<li><strong>极其脆弱的“无损”依赖（PFC 暴风雨）****：<br>
RoCE v2 依赖交换机底层的 PFC（基于优先级的流量控制）来实现不丢包。当大模型全速进行</strong> <code v-pre>**All-Reduce**</code> <strong>梯度同步时，万卡同时突发大流量，一旦某个交换机缓冲区满了，就会向上游发送“暂停”信号。这个信号会像多米诺骨牌一样向全网扩散，导致整个智算中心网络发生<strong><strong>网络瘫痪/死锁（PFC Storm）</strong></strong>，算力利用率直接归零。</strong></li>
<li><strong>死板的哈希单路径（PFC 无法跨路径路由）<strong><strong>：<br>
传统的 RoCE v2 发送一个大流时，会通过五元组哈希算法硬编码死一条物理路径。如果这条路径上的某个交换机正好堵车（Congestion），数据包就会死等，而旁边空闲的物理链路却只能干看着，造成极大的</strong></strong>带宽浪费和尾部延迟（Tail Latency）暴增****。</strong></li>
</ol>
<hr>
<h3 id="二、-solar-rdma-的硬核物理突破-怎么实现的" tabindex="-1"><a class="header-anchor" href="#二、-solar-rdma-的硬核物理突破-怎么实现的"><span><strong>二、 Solar-RDMA 的硬核物理突破（怎么实现的）</strong></span></a></h3>
<p><strong>为了彻底解决上述问题，阿里云在自研神龙（X-Dragon）智能网卡（DPU/MOC卡）与交换机上，全栈自研了</strong> <strong>Solar-RDMA<strong><strong>。它的底层核心魔法可以总结为：</strong></strong>用户态直通 + 精细化喷枪分包 + 硬件级快速重传****。</strong></p>
<h4 id="_1-动态逐包动态路由-多路径喷枪机制-multi-path-packet-spraying" tabindex="-1"><a class="header-anchor" href="#_1-动态逐包动态路由-多路径喷枪机制-multi-path-packet-spraying"><span><strong>1. 动态逐包动态路由：多路径喷枪机制（Multi-Path Packet Spraying）</strong></span></a></h4>
<ul>
<li><strong>物理颠覆****：Solar-RDMA 彻底废除了传统的“单条大流走死一条路”的死板机制。</strong></li>
<li><strong>怎么做****：当大模型要传输一个 10GB 的梯度数据时，神龙网卡硬件会在发送端把这个大数据拆散成无数个微小的</strong> <strong>网络包（Packets）<strong><strong>。随后，网卡像一把高频喷枪一样，将这些微小的包</strong></strong>同时均匀地“喷射”到 HPN 网络中所有可用的物理路径和交换机上****。</strong></li>
<li><strong>物理红利<strong><strong>：哪怕其中某条链路上有其他流量在拥堵，或者某个交换机突然坏掉，数据包也能从其他成百上千条大路上同时飙过去，</strong></strong>全网带宽利用率直接拉满到 95% 以上****，并且彻底消除了哈希极化导致的局部爆满。</strong></li>
</ul>
<h4 id="_2-硬件级容忍乱序与极速重传-out-of-order-recovery" tabindex="-1"><a class="header-anchor" href="#_2-硬件级容忍乱序与极速重传-out-of-order-recovery"><span><strong>2. 硬件级容忍乱序与极速重传（Out-of-Order Recovery）</strong></span></a></h4>
<ul>
<li><strong>物理挑战****：既然数据包是分头走不同道路的，那它们到达目的地（接收端网卡）时的先后顺序一定会错乱（乱序包）。传统的 TCP 或老旧 RoCE 遇到乱序包会直接丢弃并要求全部重传，导致网络雪崩。</strong></li>
<li><strong>Solar 的解法<strong><strong>：Solar-RDMA 直接在</strong></strong>神龙网卡的 ASIC 芯片硬件上****焊死了“乱序接收缓冲区”和“硬件重传引擎”。</strong></li>
<li><strong>怎么做<strong><strong>：接收端网卡硬件在底层会自动为乱序到达的包排队洗牌，还原顺序。如果发现中间漏了第 99 号包，网卡硬件会</strong></strong>绕过 CPU 和操作系统内核<strong><strong>，直接向发送端网卡发起动态物理重传（选择性重传 NACK）。整个重传在</strong></strong>微秒级****内由硬件芯片闭环搞定。</strong></li>
</ul>
<h4 id="_3-彻底干掉-pfc-依赖-端到端选路降噪-congestion-control" tabindex="-1"><a class="header-anchor" href="#_3-彻底干掉-pfc-依赖-端到端选路降噪-congestion-control"><span><strong>3. 彻底干掉 PFC 依赖：端到端选路降噪（Congestion Control）</strong></span></a></h4>
<ul>
<li><strong>因为 Solar-RDMA 拥有极其恐怖的硬件容错、重传和乱序整理能力，它在底层运行 RoCE v2 时，<strong><strong>可以允许网络发生轻微丢包，从而能够完全关闭或者极大限度地放宽交换机的 PFC 限制</strong></strong>。</strong></li>
<li><strong>这从根本上断了“PFC 流量控制暴风雨”的物理根源，让智算中心网络从“脆弱的绝对无损”演进为了“高韧性的强抗噪无损网络”。</strong></li>
</ul>
<hr>
<h3 id="三、-宏观运行图景-solar-rdma-的物理流转" tabindex="-1"><a class="header-anchor" href="#三、-宏观运行图景-solar-rdma-的物理流转"><span><strong>三、 宏观运行图景：Solar-RDMA 的物理流转</strong></span></a></h3>
<p><strong>当你的多卡训练任务（如</strong> <code v-pre>**torchrun**</code> <strong>16卡作业）触发了一次跨机数据同步，底层的物理链路是这样咬合的：</strong></p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span> 【 GPU 显存 (存储梯度数据) 】</span></span>
<span class="line"><span>             │</span></span>
<span class="line"><span>             ▼ (通过 PCIe Gen5 / NVLink 零拷贝直通)</span></span>
<span class="line"><span> ┌────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span> │      发送端：神龙高性能网卡 (搭载 Solar-RDMA 驱动)       │</span></span>
<span class="line"><span> │  - 物理切片：把数据包打散成无数 Packet                 │</span></span>
<span class="line"><span> │  - 喷枪分发：利用 Solar 算法同时喷向 HPN 所有物理链路    │</span></span>
<span class="line"><span> └───────────┬────────────────────────────────────────────┘</span></span>
<span class="line"><span>             │</span></span>
<span class="line"><span>             ├──────────────────────┬──────────────────────┐ (网络全路网多路径同时狂飙)</span></span>
<span class="line"><span>             ▼                      ▼                      ▼</span></span>
<span class="line"><span>      【 交换机 A 】          【 交换机 B 】          【 交换机 C 】</span></span>
<span class="line"><span>             │                      │                      │</span></span>
<span class="line"><span>             └──────────────────────┼──────────────────────┘</span></span>
<span class="line"><span>                                    │ (即使某个交换机丢包，Solar 硬件秒级重传)</span></span>
<span class="line"><span>                                    ▼</span></span>
<span class="line"><span> ┌────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span> │      接收端：神龙高性能网卡 (ASIC 硬件乱序重组)         │</span></span>
<span class="line"><span> │  - 硬件级洗牌：把乱序到达的 Packet 重新按序号排好      │</span></span>
<span class="line"><span> └───────────┬────────────────────────────────────────────┘</span></span>
<span class="line"><span>             │</span></span>
<span class="line"><span>             ▼ (直接 DMA 写入目标 GPU 显存)</span></span>
<span class="line"><span> 【 目标 GPU 显存 (开始下一个 Step 爆算) 】</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h3 id="四、-总结-大模型-infra-团队能得到什么" tabindex="-1"><a class="header-anchor" href="#四、-总结-大模型-infra-团队能得到什么"><span><strong>四、 总结：大模型 Infra 团队能得到什么？</strong></span></a></h3>
<p><strong>在工业落地中，阿里云把 Solar-RDMA 深度封装在了其底层的灵骏智算产品中。对于在上层编写 Agent、微调 Llama 或 DeepSeek 的算法架构师而言，Solar-RDMA 带来了以下冷酷的<strong><strong>确定性技术红利</strong></strong>：</strong></p>
<ol>
<li><strong>万卡千亿参数模型千小时训练“0”因网络中断****：传统的 RoCE 网络由于拥堵和死锁，几乎每隔几天就会让万卡集群崩溃一次（需要断点恢复）。Solar-RDMA 配合 HPN 的双上联，让跨机 NCCL 通信的可靠性提升了 10 倍以上。</strong></li>
<li><strong>极低的尾部延迟（Tail Latency）****：大模型分布式训练是典型的“短板效应”，整台机器的步调必须和最慢的那张卡对齐。Solar-RDMA 的逐包动态多路径路由，保证了每一批数据同步都能在极其平稳、极低的延迟内同时到达，杜绝了“1张卡卡死，9999张卡干等”的残局。</strong></li>
<li><strong>白嫖更优的算力利用率（MFU）：在完全不改动任何 PyTorch 代码和算法结构的前提下，纯靠神龙网卡刷入 Solar-RDMA 协议，集群的整体算力吞吐量能获得近 10%~15% 的净纯硬件红利提升。</strong></li>
</ol>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};