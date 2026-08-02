import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/AI_infra/5_node_5090%E8%AE%A1%E7%AE%97%E8%8A%82%E7%82%B9%E6%94%B9%E9%80%A0/%E9%98%BF%E9%87%8C%E4%BA%91%E7%81%B5%E9%AA%8F%E6%99%BA%E7%AE%97%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%9E%B6%E6%9E%84/%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD%E5%B1%82/Clos%20%E6%9E%B6%E6%9E%84.html","title":"Clos 架构","lang":"zh-CN","frontmatter":{"title":"Clos 架构","icon":"cpu","date":"2026-07-23T00:00:00.000Z","category":["AI基础设施"],"description":"Clos 架构（Clos Architecture）是现代大规模智算中心、数据中心网络的绝对基石技术。从宏观上看，我们前文聊过的 Spine-Leaf（叶脊网络）拓扑，本质上就是 Clos 架构在现代两层网络演进中的一种特化体现。 为了彻底看透它的底层逻辑，我们可以从它的起源、数学本质以及如何解决万卡大模型集群通信瓶颈来详细拆解： 一、 核心起源：干掉...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Clos 架构\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/Pasted%20image%2020260718214023.png\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/AI_infra/5_node_5090%E8%AE%A1%E7%AE%97%E8%8A%82%E7%82%B9%E6%94%B9%E9%80%A0/%E9%98%BF%E9%87%8C%E4%BA%91%E7%81%B5%E9%AA%8F%E6%99%BA%E7%AE%97%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%9E%B6%E6%9E%84/%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD%E5%B1%82/Clos%20%E6%9E%B6%E6%9E%84.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"Clos 架构"}],["meta",{"property":"og:description","content":"Clos 架构（Clos Architecture）是现代大规模智算中心、数据中心网络的绝对基石技术。从宏观上看，我们前文聊过的 Spine-Leaf（叶脊网络）拓扑，本质上就是 Clos 架构在现代两层网络演进中的一种特化体现。 为了彻底看透它的底层逻辑，我们可以从它的起源、数学本质以及如何解决万卡大模型集群通信瓶颈来详细拆解： 一、 核心起源：干掉..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/Pasted%20image%2020260718214023.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":4.29,"words":1287},"filePathRelative":"posts/AI基础设施/学习计划/AI_infra/5_node_5090计算节点改造/阿里云灵骏智算服务器架构/基础设施层/Clos 架构.md","excerpt":"<p><strong>Clos 架构</strong>（Clos Architecture）是现代大规模智算中心、数据中心网络的绝对基石技术。从宏观上看，我们前文聊过的 <strong>Spine-Leaf（叶脊网络）拓扑，本质上就是 Clos 架构在现代两层网络演进中的一种特化体现</strong>。</p>\\n<p>为了彻底看透它的底层逻辑，我们可以从它的起源、数学本质以及如何解决万卡大模型集群通信瓶颈来详细拆解：<br>\\n<img src=\\"/blog/assets/posts/Pasted%20image%2020260718214023.png\\" alt loading=\\"lazy\\"></p>","autoDesc":true}`),i={name:`Clos 架构.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p><strong>Clos 架构</strong>（Clos Architecture）是现代大规模智算中心、数据中心网络的绝对基石技术。从宏观上看，我们前文聊过的 <strong>Spine-Leaf（叶脊网络）拓扑，本质上就是 Clos 架构在现代两层网络演进中的一种特化体现</strong>。</p>
<p>为了彻底看透它的底层逻辑，我们可以从它的起源、数学本质以及如何解决万卡大模型集群通信瓶颈来详细拆解：<br>
<img src="/blog/assets/posts/Pasted%20image%2020260718214023.png" alt="" loading="lazy"></p>
<h3 id="一、-核心起源-干掉-排队挂断-的数学奇迹" tabindex="-1"><a class="header-anchor" href="#一、-核心起源-干掉-排队挂断-的数学奇迹"><span>一、 核心起源：干掉“排队挂断”的数学奇迹</span></a></h3>
<p>Clos 架构由贝尔实验室的科学家查尔斯·克洛斯（Charles Clos）在 1953 年提出。当时正值电话交换机时代，成千上万户电话要互相拨通，传统的电话交换机采用“单点全联接”，如果两个通话同时抢占同一个交叉点，后续的电话就会直接被挂断（发生阻塞）。</p>
<p>为了用最少的硬件成本实现全网互通且不发生堵车，Clos 提出了一个多级交换网络（Multi-stage Switching Network）的数学模型。</p>
<p>Clos 定义了一个标准的三层 Clos 架构，由输入层（Ingress）、中间层（Middle）和输出层（Egress）<strong>组成。为了保证这个网络是</strong>严格无阻塞（Strictly Non-blocking）的——即任意一个空闲的输入端想和任意一个空闲的输出端通话，总能在中间层找到一条可用的通路，而不需要断开现有的任何通话，Clos 推导出了一个冷酷的数学铁律：</p>
<p>$$m \\ge 2n - 1$$</p>
<ul>
<li>
<p>$n$：代表输入层每个交换芯片管理的端口数量。</p>
</li>
<li>
<p>$m$：代表中间层交换芯片的总数量。</p>
</li>
</ul>
<p>只要中间层的芯片数量大于或等于输入端端口数的两倍减一，这个网络在数学结构上就是绝对无损、完全免疫死锁的。这套数学理论在 50 年后，完美契合了大模型万卡分布式训练对网络通信的极致严苛要求。</p>
<h3 id="二、-现代演进-从三层-clos-到两层-spine-leaf" tabindex="-1"><a class="header-anchor" href="#二、-现代演进-从三层-clos-到两层-spine-leaf"><span>二、 现代演进：从三层 Clos 到两层 Spine-Leaf</span></a></h3>
<p>传统的 Clos 架构是纵向三层的（如下图所示）：</p>
<p>Plaintext</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span> 【 输入层 (Ingress) 】      【 中间层 (Middle) 】      【 输出层 (Egress) 】</span></span>
<span class="line"><span>   ┌───────────┐               ┌───────────┐               ┌───────────┐</span></span>
<span class="line"><span>   │ 交换芯片 A │ ───────────>  │ 交换芯片 X │  ───────────> │ 交换芯片 P │</span></span>
<span class="line"><span>   └───────────┘ \\           / └───────────┘ \\           / └───────────┘</span></span>
<span class="line"><span>                  \\         /                 \\         /</span></span>
<span class="line"><span>   ┌───────────┐   \\       /   ┌───────────┐   \\       /   ┌───────────┐</span></span>
<span class="line"><span>   │ 交换芯片 B │ ───\\─X─/───>  │ 交换芯片 Y │  ───\\─X─/───> │ 交换芯片 Q │</span></span>
<span class="line"><span>   └───────────┘    /     \\    └───────────┘    /     \\    └───────────┘</span></span>
<span class="line"><span>                   /       \\                   /       \\</span></span>
<span class="line"><span>                  /         \\                 /         \\</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在现代数据中心建设中，因为服务器既是“输入端”又是“输出端”（既发送梯度也接收数据），工程师们把三层 Clos 架构进行了<strong>折叠与压缩（Folded Clos）</strong>：</p>
<ol>
<li>
<p>将<strong>输入层</strong>和<strong>输出层</strong>物理合并为同一种角色——<strong>Leaf 交换机（叶层）</strong>。</p>
</li>
<li>
<p>将<strong>中间层</strong>特化为专门负责高速流转的核心中转站——<strong>Spine 交换机（脊层）</strong>。</p>
</li>
</ol>
<p>这种折叠 Clos 架构，就是当今智算中心横向扩展（Scale-out）的核心骨架。</p>
<h3 id="三、-为什么大模型与云原生调度死锁-clos-架构" tabindex="-1"><a class="header-anchor" href="#三、-为什么大模型与云原生调度死锁-clos-架构"><span>三、 为什么大模型与云原生调度死锁 Clos 架构？</span></a></h3>
<p>大模型预训练或微调（如 16 卡、万卡分布式爆算）在全局梯度同步时会产生恐怖的流量突发，Clos 架构凭借三个物理红利成为了唯一的选型标准：</p>
<h4 id="_1-物理层面的无阻塞路由与多路径供给" tabindex="-1"><a class="header-anchor" href="#_1-物理层面的无阻塞路由与多路径供给"><span>1. 物理层面的无阻塞路由与多路径供给</span></a></h4>
<p>传统的树状网络只有一条主干大路，流量稍大就瘫痪。Clos 架构在 Leaf 与 Spine 之间交织出了极其致密的<strong>等价多路径（ECMP - Equal-Cost Multi-Path）</strong>。数据包从任意一台服务器出发，都有数十条完全等价、带宽相同的物理路径可以选择，为我们前文提到的 <strong>Solar-RDMA 协议进行“多路径逐包喷枪分发”</strong> 提供了完美且充沛的公路网资源。</p>
<h4 id="_2-爆炸半径极低的高可用性" tabindex="-1"><a class="header-anchor" href="#_2-爆炸半径极低的高可用性"><span>2. 爆炸半径极低的高可用性</span></a></h4>
<p>在 Clos 架构中，算力不再绑定在某一个特定核心交换机的生老病死上。由于采用了完全扁平化的多路径解耦，集群中任意一台 Spine 交换机发生物理损坏或端口掉线，底层的 Volcano 调度器和网络协议只会感知到可用总带宽略微下降，剩余的交换机矩阵会在微秒级自动分摊流量，<strong>大模型长周期训练绝不会因为单点网络故障而中断雪崩</strong>。</p>
<h4 id="_3-极佳的弹性横向扩展-scale-out" tabindex="-1"><a class="header-anchor" href="#_3-极佳的弹性横向扩展-scale-out"><span>3. 极佳的弹性横向扩展（Scale-out）</span></a></h4>
<p>当集群需要从 1000 卡扩容到 10000 卡时，在 Clos 架构下：</p>
<ul>
<li>
<p><strong>增加算力</strong>：直接在底层并排增加 Leaf 交换机和服务器挂载。</p>
</li>
<li>
<p><strong>增加网络带宽</strong>：直接在顶层并排增加 Spine 交换机，并把每一根新增的光纤物理插满下方的 Leaf 交换机。</p>
<p>整个算力中心的扩建就像搭乐高积木一样，不需要对既有的网络进行整体重构，这正是阿里云灵骏高性能网络（HPN）等智算底座能以万卡为单位进行算力规模化合拢的底层数学逻辑。</p>
</li>
</ul>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};