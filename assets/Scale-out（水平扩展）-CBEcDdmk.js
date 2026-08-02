import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/AI_infra/5_node_5090%E8%AE%A1%E7%AE%97%E8%8A%82%E7%82%B9%E6%94%B9%E9%80%A0/%E9%98%BF%E9%87%8C%E4%BA%91%E7%81%B5%E9%AA%8F%E6%99%BA%E7%AE%97%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%9E%B6%E6%9E%84/%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD%E5%B1%82/Scale-out%EF%BC%88%E6%B0%B4%E5%B9%B3%E6%89%A9%E5%B1%95%EF%BC%89.html","title":"Scale-out（水平扩展）","lang":"zh-CN","frontmatter":{"title":"Scale-out（水平扩展）","icon":"cpu","date":"2026-07-23T00:00:00.000Z","category":["AI基础设施"],"description":"与专注于“单机/单机柜内部极致内聚”的 Scale-up 相对应，Scale-out（水平扩展 / 横向扩展） 是大模型进入万卡、十万卡超级集群时代的绝对算力供给支柱。 一句话道破本质：Scale-up 是“精益求精”，把单台机器的配置推向物理极限；而 Scale-out 则是“人多力量大”，通过标准的网络通信协议，把成百上千台独立的服务器连接成一个无...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Scale-out（水平扩展）\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/AI_infra/5_node_5090%E8%AE%A1%E7%AE%97%E8%8A%82%E7%82%B9%E6%94%B9%E9%80%A0/%E9%98%BF%E9%87%8C%E4%BA%91%E7%81%B5%E9%AA%8F%E6%99%BA%E7%AE%97%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%9E%B6%E6%9E%84/%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD%E5%B1%82/Scale-out%EF%BC%88%E6%B0%B4%E5%B9%B3%E6%89%A9%E5%B1%95%EF%BC%89.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"Scale-out（水平扩展）"}],["meta",{"property":"og:description","content":"与专注于“单机/单机柜内部极致内聚”的 Scale-up 相对应，Scale-out（水平扩展 / 横向扩展） 是大模型进入万卡、十万卡超级集群时代的绝对算力供给支柱。 一句话道破本质：Scale-up 是“精益求精”，把单台机器的配置推向物理极限；而 Scale-out 则是“人多力量大”，通过标准的网络通信协议，把成百上千台独立的服务器连接成一个无..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":4.58,"words":1374},"filePathRelative":"posts/AI基础设施/学习计划/AI_infra/5_node_5090计算节点改造/阿里云灵骏智算服务器架构/基础设施层/Scale-out（水平扩展）.md","excerpt":"<p>与专注于“单机/单机柜内部极致内聚”的 Scale-up 相对应，<strong>Scale-out（水平扩展 / 横向扩展）</strong> 是大模型进入万卡、十万卡超级集群时代的<strong>绝对算力供给支柱</strong>。</p>\\n<p>一句话道破本质：<strong>Scale-up 是“精益求精”，把单台机器的配置推向物理极限；而 Scale-out 则是“人多力量大”，通过标准的网络通信协议，把成百上千台独立的服务器连接成一个无边无际的分布式算力海洋。</strong></p>\\n<h3>一、 物理图景：AI 时代的 Scale-out 怎么玩？</h3>\\n<p>传统的云计算 Scale-out 只需要通过负载均衡（如我们聊过的 SLB）在最外层分发流量，后端每台物理机各跑各的，互不干扰。</p>","autoDesc":true}`),i={name:`Scale-out（水平扩展）.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>与专注于“单机/单机柜内部极致内聚”的 Scale-up 相对应，<strong>Scale-out（水平扩展 / 横向扩展）</strong> 是大模型进入万卡、十万卡超级集群时代的<strong>绝对算力供给支柱</strong>。</p>
<p>一句话道破本质：<strong>Scale-up 是“精益求精”，把单台机器的配置推向物理极限；而 Scale-out 则是“人多力量大”，通过标准的网络通信协议，把成百上千台独立的服务器连接成一个无边无际的分布式算力海洋。</strong></p>
<h3 id="一、-物理图景-ai-时代的-scale-out-怎么玩" tabindex="-1"><a class="header-anchor" href="#一、-物理图景-ai-时代的-scale-out-怎么玩"><span>一、 物理图景：AI 时代的 Scale-out 怎么玩？</span></a></h3>
<p>传统的云计算 Scale-out 只需要通过负载均衡（如我们聊过的 SLB）在最外层分发流量，后端每台物理机各跑各的，互不干扰。</p>
<p>但在大模型分布式训练场景下，Scale-out 迎来了极其硬核的演进。它不是简单的机器拼盘，而是要解决“如何让上万台服务器在地理分散的机房里同步呼吸、联合攻克同一个大模型模型”：</p>
<ol>
<li>
<p><strong>多节点流水线（Pipeline Parallelism, PP）</strong>：</p>
<p>当一个 1750 亿（甚至万亿）参数的大模型大到单个 Scale-up 超节点完全装不下时，Scale-out 登场。我们将模型的 1 到 20 层放在服务器 A，21 到 40 层放在服务器 B，41 到 60 层放在服务器 C。数据像工厂流水线一样，跨越物理服务器进行<strong>前向传递和反向求导</strong>。</p>
</li>
<li>
<p><strong>海量数据并发（Data Parallelism, DP / ZeRO 阶段）</strong>：</p>
<p>为了加速训练，我们将庞大的数据集切分成上万份。上千台服务器（每台都是一个 Scale-out 节点）各自拿着一份数据进行计算，并在每个 Step 结束时，跨越全网进行 <strong>All-Reduce（梯度全局总和同步）</strong>。</p>
</li>
</ol>
<h3 id="二、-为什么大模型后期更依赖-scale-out" tabindex="-1"><a class="header-anchor" href="#二、-为什么大模型后期更依赖-scale-out"><span>二、 为什么大模型后期更依赖 Scale-out？</span></a></h3>
<p>虽然 Scale-up（如 NVLink）的带宽大到恐怖，但它在物理上面临不可逾越的“空间墙”与“功耗墙”：</p>
<ul>
<li>
<p>你无法在一个机柜里塞下无限颗芯片，因为供电、散热（液冷极限）和高密度的信号衰减会迅速让系统崩溃。</p>
</li>
<li>
<p>当模型参数量和数据量大到一定量级后，<strong>通过网络将数千台标准的 8 卡服务器横向铺开（Scale-out），是唯一能够无限堆叠算力总量的物理手段</strong>。</p>
</li>
</ul>
<h3 id="三、-scale-out-的核心底层技术栈-如何打通网络墙" tabindex="-1"><a class="header-anchor" href="#三、-scale-out-的核心底层技术栈-如何打通网络墙"><span>三、 Scale-out 的核心底层技术栈（如何打通网络墙）</span></a></h3>
<p>横向扩展最害怕的就是“木桶效应”——某台服务器网卡掉包或者延迟高，上千台机器就要集体停工干等（即网络气泡）。为了解决跨机通信瓶颈，Scale-out 高度依赖以下底层架构：</p>
<ol>
<li>
<p><strong>RDMA（远程直接内存访问）无损网络</strong>：</p>
<ul>
<li>
<p><strong>InfiniBand (IB)</strong>：标准的超高性能 Scale-out 专用网络，拥有极高的吞吐和几乎为零的软件栈延迟，但价格高昂。</p>
</li>
<li>
<p><strong>RoCE v2（基于以太网的 RDMA）</strong>：目前互联网巨头大规模外扩的主流选择。它通过端网协同，让服务器 A 的 GPU 能够直接越过 CPU 和操作系统内核，直接读写服务器 B 的 GPU 显存，将跨机延迟压到微秒级。</p>
</li>
</ul>
</li>
<li>
<p><strong>智算中心网络架构优化（如前文提到的 HPN 与 Solar-RDMA）</strong>：</p>
<ul>
<li>
<p>采用 Spine-Leaf（叶脊网络）拓扑，确保任意两台服务器之间都是“单跳直达”。</p>
</li>
<li>
<p>利用<strong>多路径逐包喷枪分发技术（Packet Spraying）</strong>，把跨机的大流量拆散动态打向所有交换机，彻底杜绝横向扩展时的网络拥堵。</p>
</li>
</ul>
</li>
<li>
<p><strong>云原生高效调度（如 Volcano）</strong>：</p>
<ul>
<li>当你需要扩容 100 台机器（Scale-out）来分担训练任务时，由 Volcano 这样的批量调度器进行 <strong>Gang Scheduling（组团调度）</strong>。它确保这 100 台机器在云端同时弹出、同时就绪、并在最邻近的物理网络机架上打包分发，避免算力碎片化。</li>
</ul>
</li>
</ol>
<h3 id="四、-综合对比-scale-up-vs-scale-out" tabindex="-1"><a class="header-anchor" href="#四、-综合对比-scale-up-vs-scale-out"><span>四、 综合对比：Scale-up vs. Scale-out</span></a></h3>
<p>在大模型全栈 Infra 团队的日常架构中，两者的物理属性对比极其鲜明：</p>
<table>
<thead>
<tr>
<th><strong>维度</strong></th>
<th><strong>Scale-up（纵向扩展 / 向内聚）</strong></th>
<th><strong>Scale-out（横向扩展 / 向外扩）</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>核心媒介</strong></td>
<td>单机/单机柜内部的高速总线（NVLink / UALink）</td>
<td>跨机器/跨机房的无损网络（InfiniBand / RoCE v2）</td>
</tr>
<tr>
<td><strong>物理带宽</strong></td>
<td>极高（TB/s 级别，如 H100 达 900 GB/s）</td>
<td>较高（GB/s 级别，如标准 400Gbps/800Gbps 网卡）</td>
</tr>
<tr>
<td><strong>延迟级别</strong></td>
<td>纳秒级（Nanoseconds）</td>
<td>微秒级（Microseconds）</td>
</tr>
<tr>
<td><strong>扩展极限</strong></td>
<td>存在强物理天花板（通常单机柜 8~72 卡）</td>
<td>理论上几乎无上限（可横向扩展至十万卡集群）</td>
</tr>
<tr>
<td><strong>承载并行</strong></td>
<td><strong>张量并行（TP）</strong>、专家并行（EP）</td>
<td><strong>数据并行（DP）</strong>、流水线并行（PP）</td>
</tr>
</tbody>
</table>
<h3 id="💡-架构师总结" tabindex="-1"><a class="header-anchor" href="#💡-架构师总结"><span>💡 架构师总结</span></a></h3>
<p>现代智算中心永远是 <strong>“先 Scale-up，再 Scale-out”</strong>：</p>
<p>在单台 8 卡机器或者单个 NVL72 机柜内，用 <strong>Scale-up</strong> 把芯片死死焊在一起，攻克最吃带宽的局部矩阵爆算（TP）；随后，用 <strong>Scale-out</strong> 将上万个这样的高性能机柜通过高速以太网/IB 网线横向交织成一张巨型算力网，吞噬海量的数据集（DP）。两者精密的规模化协同，才是 Llama 4、DeepSeek-V3 等超级大模型能够被物理训练出来的终极解。</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};