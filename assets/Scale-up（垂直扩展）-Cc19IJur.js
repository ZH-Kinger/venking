import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/AI_infra/5_node_5090%E8%AE%A1%E7%AE%97%E8%8A%82%E7%82%B9%E6%94%B9%E9%80%A0/%E9%98%BF%E9%87%8C%E4%BA%91%E7%81%B5%E9%AA%8F%E6%99%BA%E7%AE%97%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%9E%B6%E6%9E%84/%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD%E5%B1%82/Scale-up%EF%BC%88%E5%9E%82%E7%9B%B4%E6%89%A9%E5%B1%95%EF%BC%89.html","title":"Scale-up（垂直扩展）","lang":"zh-CN","frontmatter":{"title":"Scale-up（垂直扩展）","icon":"cpu","date":"2026-07-23T00:00:00.000Z","category":["AI基础设施"],"description":"在大模型与高性能智算中心的语境下，Scale-up（垂直扩展 / 纵向扩展） 是与 Scale-out（水平扩展 / 横向扩展） 并驾齐驱的两大算力扩张范式之一。 一句话道破本质：Scale-out 是“向外扩”，靠多买服务器、堆机器数量来做大集群；而 Scale-up 则是“向内聚”，它专注于通过极致的高速互联总线，把单个算力单元内部的芯片做得更紧、...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Scale-up（垂直扩展）\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/AI_infra/5_node_5090%E8%AE%A1%E7%AE%97%E8%8A%82%E7%82%B9%E6%94%B9%E9%80%A0/%E9%98%BF%E9%87%8C%E4%BA%91%E7%81%B5%E9%AA%8F%E6%99%BA%E7%AE%97%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%9E%B6%E6%9E%84/%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD%E5%B1%82/Scale-up%EF%BC%88%E5%9E%82%E7%9B%B4%E6%89%A9%E5%B1%95%EF%BC%89.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"Scale-up（垂直扩展）"}],["meta",{"property":"og:description","content":"在大模型与高性能智算中心的语境下，Scale-up（垂直扩展 / 纵向扩展） 是与 Scale-out（水平扩展 / 横向扩展） 并驾齐驱的两大算力扩张范式之一。 一句话道破本质：Scale-out 是“向外扩”，靠多买服务器、堆机器数量来做大集群；而 Scale-up 则是“向内聚”，它专注于通过极致的高速互联总线，把单个算力单元内部的芯片做得更紧、..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.99,"words":1198},"filePathRelative":"posts/AI基础设施/学习计划/AI_infra/5_node_5090计算节点改造/阿里云灵骏智算服务器架构/基础设施层/Scale-up（垂直扩展）.md","excerpt":"<p>在大模型与高性能智算中心的语境下，<strong>Scale-up（垂直扩展 / 纵向扩展）</strong> 是与 <strong>Scale-out（水平扩展 / 横向扩展）</strong> 并驾齐驱的两大算力扩张范式之一。</p>\\n<p>一句话道破本质：<strong>Scale-out 是“向外扩”，靠多买服务器、堆机器数量来做大集群；而 Scale-up 则是“向内聚”，它专注于通过极致的高速互联总线，把单个算力单元内部的芯片做得更紧、更快、更像一个无法分割的整体。</strong></p>\\n<p>在大模型微调、训练与超节点（SuperPod）的构建中，Scale-up 正在扮演至关重要的角色。</p>","autoDesc":true}`),i={name:`Scale-up（垂直扩展）.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在大模型与高性能智算中心的语境下，<strong>Scale-up（垂直扩展 / 纵向扩展）</strong> 是与 <strong>Scale-out（水平扩展 / 横向扩展）</strong> 并驾齐驱的两大算力扩张范式之一。</p>
<p>一句话道破本质：<strong>Scale-out 是“向外扩”，靠多买服务器、堆机器数量来做大集群；而 Scale-up 则是“向内聚”，它专注于通过极致的高速互联总线，把单个算力单元内部的芯片做得更紧、更快、更像一个无法分割的整体。</strong></p>
<p>在大模型微调、训练与超节点（SuperPod）的构建中，Scale-up 正在扮演至关重要的角色。</p>
<h3 id="一、-物理图景-ai-时代的-scale-up-到底长什么样" tabindex="-1"><a class="header-anchor" href="#一、-物理图景-ai-时代的-scale-up-到底长什么样"><span>一、 物理图景：AI 时代的 Scale-up 到底长什么样？</span></a></h3>
<p>在传统的云计算时代，Scale-up 指的是在一台服务器上多插几根内存、多换一个更强的 CPU。但在大模型 Infra 领域，Scale-up 被赋予了全新的物理定义：<strong>打造“超级节点（SuperPod）”。</strong></p>
<ol>
<li>
<p><strong>从单机 8 卡到 NVL72 机柜</strong>：传统的 8 卡服务器内部，8 张 GPU 通过 NVLink 互联，这 8 张卡形成了一个单机内的 Scale-up 域。而像 NVIDIA 架构（如 NVL72）则将整个机柜视为一个超节点，通过铜缆背板和 NVSwitch，将<strong>一个机柜内的 72 颗甚至更多芯片全部打通，让 72 张卡在数学和物理上表现得像一张巨大无比的“怪兽显卡”</strong>。</p>
</li>
<li>
<p><strong>内存池化与统一编址（Global Shared Memory）</strong>：Scale-up 能够让多张 GPU 通过内存级语义（如 Load/Store/Atomic 操作）直接物理互访对方的显存，延迟极低。这就是说，GPU 0 可以像读写自己的 HBM 显存一样，去直接读写 GPU 71 的显存，从而打破大模型的“内存墙”。</p>
</li>
</ol>
<h3 id="二、-为什么大模型训练必须要-scale-up" tabindex="-1"><a class="header-anchor" href="#二、-为什么大模型训练必须要-scale-up"><span>二、 为什么大模型训练必须要 Scale-up？</span></a></h3>
<p>大模型分布式训练常用的 <strong>3D 并行策略</strong>（张量并行 TP、流水线并行 PP、数据并行 DP）中，不同的并行模式对网络的要求有着天壤之别：</p>
<ul>
<li>
<p><strong>张量并行（Tensor Parallelism, TP）是 Scale-up 的专属舞台</strong>：</p>
<p>TP 是把大模型某一层的矩阵矩阵乘法横向切开，分给多张卡计算。在每次前向和反向传播中，这些卡之间都需要高频地、同步地交换几百 GB 的数据。</p>
<ul>
<li>
<p>如果走普通的 <strong>Scale-out（以太网/RDMA）</strong> 网络，通信延迟（微秒级）会瞬间吞噬掉 GPU 的计算时间，导致 GPU 产生大量的“计算空泡”。</p>
</li>
<li>
<p>必须走 <strong>Scale-up（NVLink / UALink 等芯片间直连协议）</strong>，将延迟压到纳秒级，才能跑得通张量并行。</p>
</li>
</ul>
</li>
</ul>
<h3 id="三、-scale-up-的核心底层技术栈" tabindex="-1"><a class="header-anchor" href="#三、-scale-up-的核心底层技术栈"><span>三、 Scale-up 的核心底层技术栈</span></a></h3>
<p>要在一个高带宽域内搞定 Scale-up，主要依赖以下硬核底座：</p>
<ol>
<li>
<p><strong>私有/开放的芯片级互联协议</strong>：</p>
<ul>
<li>
<p><em>私有垄断</em>：NVIDIA 的 <strong>NVLink</strong> 和 NVSwitch 技术，目前是 Scale-up 的绝对霸主。</p>
</li>
<li>
<p><em>开放联盟</em>：为了打破垄断，AMD、谷歌、微软、腾讯等巨头联合成立了 <strong>UALink（Ultra Accelerator Link）联盟</strong>，或者推进基于以太网物理层的 <strong>ESUN（Ethernet Scale-up Network）</strong>，旨在用统一的开放标准来实现非绿厂芯片的高性能 Scale-up 纵向扩展。</p>
</li>
</ul>
</li>
<li>
<p><strong>铜互联与光电协同</strong>：</p>
<ul>
<li>
<p>在机柜内部（1~3米短距离），Scale-up 疯狂堆叠<strong>高速铜缆（如有源铜缆 AEC）</strong>，利用铜缆极低的能耗和高带宽，满足短距极限吞吐。</p>
</li>
<li>
<p>跨机柜扩展时，则引入 <strong>CPO（光电共封装）</strong>、OCS（全光交换机）等前沿光通信技术来突破电信号的物理极限。</p>
</li>
</ul>
</li>
</ol>
<h3 id="四、-两者不是二选一-scale-up-与-scale-out-的协同" tabindex="-1"><a class="header-anchor" href="#四、-两者不是二选一-scale-up-与-scale-out-的协同"><span>四、 两者不是二选一：Scale-up 与 Scale-out 的协同</span></a></h3>
<p>在工业界落地万卡、十万卡集群时，这两种架构从来不是对立的，而是<strong>完美咬合的组合拳</strong>：</p>
<ul>
<li>
<p><strong>局部 Scale-up 筑巢</strong>：在单个机柜（或超节点）内部，利用 NVLink/UALink 建立极高带宽、极低延迟的物理核心圈，专门用来承载强耦合、高频同步的 <strong>张量并行（TP）</strong> 和 <strong>专家并行（EP）</strong>。</p>
</li>
<li>
<p><strong>全局 Scale-out 织网</strong>：在超节点与超节点之间，通过我们前文聊过的 <strong>InfiniBand / 阿里云 HPN / Solar-RDMA</strong> 等无损以太网建立大规模横向互联（Scale-out），用来承载 <strong>数据并行（DP）</strong> 和 <strong>流水线并行（PP）</strong>。</p>
</li>
</ul>
<p><strong>一句话总结：</strong></p>
<p><strong>Scale-up 负责把局部的算力单元捏得足够紧、焊得足够快；Scale-out 负责把这些高质量的算力单元无限铺开、连成无边无际的算力海洋。两者结合，才是现代大模型基础设施向前进化的终极标准形态。</strong></p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};