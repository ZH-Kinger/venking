import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/AI_infra/5_node_5090%E8%AE%A1%E7%AE%97%E8%8A%82%E7%82%B9%E6%94%B9%E9%80%A0/%E9%98%BF%E9%87%8C%E4%BA%91%E7%81%B5%E9%AA%8F%E6%99%BA%E7%AE%97%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%9E%B6%E6%9E%84/%E7%BD%91%E7%BB%9C%E5%B1%82/ECMP%EF%BC%88Equal-Cost%20Multi-Path%EF%BC%89.html","title":"ECMP（Equal-Cost Multi-Path）","lang":"zh-CN","frontmatter":{"title":"ECMP（Equal-Cost Multi-Path）","icon":"cpu","date":"2026-07-23T00:00:00.000Z","category":["AI基础设施"],"description":"ECMP（Equal-Cost Multi-Path，等价多路径路由） 是现代智算中心和大规模数据中心网络中最为核心的流量调度协议。 一句话道破本质：如果在 Clos 架构或 Spine-Leaf 拓扑中，服务器 A 到服务器 B 之间同时存在 8 条物理带宽完全相同、延迟完全相等的“等价马路”，ECMP 就是那个负责决定把这辆“数据车”打向哪条马路的...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"ECMP（Equal-Cost Multi-Path）\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/Pasted%20image%2020260718214406.png\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/AI_infra/5_node_5090%E8%AE%A1%E7%AE%97%E8%8A%82%E7%82%B9%E6%94%B9%E9%80%A0/%E9%98%BF%E9%87%8C%E4%BA%91%E7%81%B5%E9%AA%8F%E6%99%BA%E7%AE%97%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%9E%B6%E6%9E%84/%E7%BD%91%E7%BB%9C%E5%B1%82/ECMP%EF%BC%88Equal-Cost%20Multi-Path%EF%BC%89.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"ECMP（Equal-Cost Multi-Path）"}],["meta",{"property":"og:description","content":"ECMP（Equal-Cost Multi-Path，等价多路径路由） 是现代智算中心和大规模数据中心网络中最为核心的流量调度协议。 一句话道破本质：如果在 Clos 架构或 Spine-Leaf 拓扑中，服务器 A 到服务器 B 之间同时存在 8 条物理带宽完全相同、延迟完全相等的“等价马路”，ECMP 就是那个负责决定把这辆“数据车”打向哪条马路的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/Pasted%20image%2020260718214406.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":4.94,"words":1483},"filePathRelative":"posts/AI基础设施/学习计划/AI_infra/5_node_5090计算节点改造/阿里云灵骏智算服务器架构/网络层/ECMP（Equal-Cost Multi-Path）.md","excerpt":"<p><strong>ECMP（Equal-Cost Multi-Path，等价多路径路由）</strong> 是现代智算中心和大规模数据中心网络中最为核心的流量调度协议。</p>\\n<p>一句话道破本质：<strong>如果在 Clos 架构或 Spine-Leaf 拓扑中，服务器 A 到服务器 B 之间同时存在 8 条物理带宽完全相同、延迟完全相等的“等价马路”，ECMP 就是那个负责决定把这辆“数据车”打向哪条马路的物理分流网关。它从根本上解决了传统网络中“只有一条大路忙死、旁边七条大路闲死”的通信死结。</strong></p>\\n<h3>一、 核心物理机制：它是怎么做路径分流的？</h3>","autoDesc":true}`),i={name:`ECMP（Equal-Cost Multi-Path）.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p><strong>ECMP（Equal-Cost Multi-Path，等价多路径路由）</strong> 是现代智算中心和大规模数据中心网络中最为核心的流量调度协议。</p>
<p>一句话道破本质：<strong>如果在 Clos 架构或 Spine-Leaf 拓扑中，服务器 A 到服务器 B 之间同时存在 8 条物理带宽完全相同、延迟完全相等的“等价马路”，ECMP 就是那个负责决定把这辆“数据车”打向哪条马路的物理分流网关。它从根本上解决了传统网络中“只有一条大路忙死、旁边七条大路闲死”的通信死结。</strong></p>
<h3 id="一、-核心物理机制-它是怎么做路径分流的" tabindex="-1"><a class="header-anchor" href="#一、-核心物理机制-它是怎么做路径分流的"><span>一、 核心物理机制：它是怎么做路径分流的？</span></a></h3>
<p>在传统的网络路由里，路由器遵循“单解法则”，即使有两条路，也必须挑选一条最优的写进路由表，另一条作为备份。这在 AI 大模型同步梯度时会导致严重的算力空转。</p>
<p>ECMP 的底层运转逻辑是将多条<strong>物理开销（Metric/Cost）完全相同</strong>的路由同时激活，并遵循以下步骤进行动态分流：<br>
<img src="/blog/assets/posts/Pasted%20image%2020260718214406.png" alt="" loading="lazy"></p>
<p>Plaintext</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>               ┌─── [ 路径 1: Spine 交换机 A ] ───┐</span></span>
<span class="line"><span>               ├─── [ 路径 2: Spine 交换机 B ] ───┤</span></span>
<span class="line"><span>               ├─── [ 路径 3: Spine 交换机 C ] ───┤</span></span>
<span class="line"><span>               ├─── [ 路径 4: Spine 交换机 D ] ───┤</span></span>
<span class="line"><span>               │                                  │</span></span>
<span class="line"><span>【 源端 Pod 】 ─── 🔑 [ ECMP 芯片五元组哈希 ] ──────┴───> 【 目的端 Pod 】</span></span>
<span class="line"><span>(10.244.1.5)                                            (10.244.2.8)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>
<p><strong>提取“数据包指纹”（五元组）</strong>：</p>
<p>当一个数据包到达交换机时，交换机芯片（如 Broadcom Tomahawk 系列）会立刻抓取该数据包包头的五个核心物理特征，统称为<strong>五元组（5-Tuple）</strong>：</p>
<p>$$\\text{源 IP} \\quad + \\quad \\text{目的 IP} \\quad + \\quad \\text{源端口} \\quad + \\quad \\text{目的端口} \\quad + \\quad \\text{传输层协议 (TCP/UDP)}$$</p>
</li>
<li>
<p><strong>数学哈希（Hashing）计算</strong>：</p>
<p>交换机将这五个特征送入硬件哈希算法（如 CRC32 或 MD5）中进行爆算，得出一个固定位数的哈希值（Hash Value）。</p>
</li>
<li>
<p><strong>取模转发（Modulo Operation）</strong>：</p>
<p>用计算出的哈希值对当前可用的等价路径总数（假设有 8 条路径）进行取模操作：</p>
<p>$$\\text{路径索引} = \\text{Hash Value} \\pmod 8$$</p>
<p>得出的余数是几（0到7），这个数据包就会被死死投递到对应的第几条物理公路上。</p>
</li>
</ol>
<h3 id="二、-核心红利-为什么大模型-scale-out-极其依赖-ecmp" tabindex="-1"><a class="header-anchor" href="#二、-核心红利-为什么大模型-scale-out-极其依赖-ecmp"><span>二、 核心红利：为什么大模型 Scale-out 极其依赖 ECMP？</span></a></h3>
<p>结合我们前文聊到的万卡横向扩展（Scale-out）与 Clos 拓扑，ECMP 的存在直接锁定了两大核心网络红利：</p>
<ul>
<li>
<p><strong>完美的带宽聚合（Bandwidth Aggregation）</strong>：</p>
<p>如果单条光纤的带宽是 400Gbps，而你有 8 条全联接的等价路径，通过 ECMP，这 8 条路径能够并联运转，在逻辑上为上层的大模型微调集群拓宽出高达 <strong>3.2Tbps ($400\\text{Gbps} \\times 8$) 的超大通信水管</strong>。</p>
</li>
<li>
<p><strong>毫秒级物理容灾（Fast Convergence）</strong>：</p>
<p>在长时间的分布式训练周期中，光纤偶发抖动或某个 Spine 交换机突然物理损坏是家常便饭。如果路径 3 挂掉，ECMP 硬件控制面会在几毫秒内将路径总数从 8 改为 7，随后的流量会自动重新对 7 取模分流，<strong>整个过程不需要改动 K8s 内部 Pod 的任何配置，训练任务绝不会中断</strong>。</p>
</li>
</ul>
<h3 id="三、-传统-ecmp-的-物理致命伤-大模型时代的痛点" tabindex="-1"><a class="header-anchor" href="#三、-传统-ecmp-的-物理致命伤-大模型时代的痛点"><span>三、 传统 ECMP 的“物理致命伤”（大模型时代的痛点）</span></a></h3>
<p>虽然 ECMP 在传统云计算中表现完美，但在大模型（LLM）万卡全速爆算、同步梯度（All-Reduce）时，它暴露出两个几乎致命的缺点：</p>
<h4 id="_1-哈希极化与碰撞-hash-polarization-collision" tabindex="-1"><a class="header-anchor" href="#_1-哈希极化与碰撞-hash-polarization-collision"><span>1. 哈希极化与碰撞（Hash Polarization &amp; Collision）</span></a></h4>
<p>哈希算法具有随机性。当一万张卡同时爆发流量时，两股完全不同的大模型数据流（大流，Elephant Flow）经过哈希计算后，<strong>极有可能不幸被算出了同一个余数</strong>。</p>
<ul>
<li>结果就是：这两股极其庞大的流量会被强行塞进同一种“路径 3”里，导致路径 3 的交换机缓冲区瞬间被打爆，发生严重丢包；而旁边的路径 0 到 2 却是完全空置的。这就是俗称的<strong>网络大流追尾</strong>。</li>
</ul>
<h4 id="_2-对-链路不均-完全无感-static-routing" tabindex="-1"><a class="header-anchor" href="#_2-对-链路不均-完全无感-static-routing"><span>2. 对“链路不均”完全无感（Static Routing）</span></a></h4>
<p>ECMP 是个盲目的“静态交警”。它分发流量时只看数学公式，根本不关心前面的路况。如果路径 1 的前方交换机正在因为其他任务而严重堵车（拥堵），ECMP 依然会按照哈希结果把大包往路径 1 里送，导致整个微调集群的尾部延迟（Tail Latency）被无限拉长。</p>
<h3 id="四、-工业界的进化-如何拯救-ecmp" tabindex="-1"><a class="header-anchor" href="#四、-工业界的进化-如何拯救-ecmp"><span>四、 工业界的进化：如何拯救 ECMP？</span></a></h3>
<p>为了彻底干掉传统 ECMP 的短板，头部的智算云底座（如阿里云灵骏网络、自建高性能机房）在底层对其进行了硬核魔改：</p>
<ol>
<li>
<p><strong>动态负载均衡（DLB - Dynamic Load Balancing）</strong>：</p>
<p>交换机芯片不再死板地看五元组哈希。芯片硬件会实时嗅探 8 条等价路径上每个输出端口的<strong>队列排队深度（Queue Depth）</strong>。哪条路空闲，就把下一个数据流塞给谁，彻底干掉了哈希碰撞。</p>
</li>
<li>
<p><strong>配合 Solar-RDMA 进行“逐包喷枪分发”（Packet Spraying）</strong>：</p>
<p>正如前文所述，Solar-RDMA 协议彻底打破了 ECMP 的大流限制。它在发送端网卡就将数据彻底打碎成微小的 Packet，<strong>主动无视五元组的绑定限制，利用多路径喷枪直接把每一个小包均匀洒满 ECMP 的所有等价路径</strong>。</p>
<p>即使有几条路径发生了轻微乱序，接收端神龙网卡靠底层的 ASIC 芯片在硬件级进行乱序重组。这种“Solar-RDMA + 完美 Clos 拓扑 + 极限 ECMP 链路压榨”的组合拳，正是目前大模型全栈 Infra 团队压榨全路网带宽（利用率突破 95%）的终极物理标准形态。</p>
</li>
</ol>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};