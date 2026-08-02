import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/data_Infra/%E5%88%86%E5%B8%83%E5%BC%8F%E5%AD%98%E5%82%A8/MLAG.html","title":"MLAG","lang":"zh-CN","frontmatter":{"title":"MLAG","icon":"cpu","date":"2026-07-31T00:00:00.000Z","category":["AI基础设施"],"description":"在数据中心网络和底层基础设施的架构中，MLAG（Multi-Chassis Link Aggregation Group，跨设备链路聚合） 是一项为了解决“单点故障”和“带宽浪费”而诞生的核心网络技术。 如果用一句话来概括：MLAG 就是让两台物理上独立的交换机，在下游服务器眼里“伪装”成一台逻辑上的超级交换机，从而实现真正的“双活”网络。 为了让你透...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MLAG\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-31T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/data_Infra/%E5%88%86%E5%B8%83%E5%BC%8F%E5%AD%98%E5%82%A8/MLAG.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"MLAG"}],["meta",{"property":"og:description","content":"在数据中心网络和底层基础设施的架构中，MLAG（Multi-Chassis Link Aggregation Group，跨设备链路聚合） 是一项为了解决“单点故障”和“带宽浪费”而诞生的核心网络技术。 如果用一句话来概括：MLAG 就是让两台物理上独立的交换机，在下游服务器眼里“伪装”成一台逻辑上的超级交换机，从而实现真正的“双活”网络。 为了让你透..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-31T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":4.11,"words":1234},"filePathRelative":"posts/AI基础设施/data_Infra/分布式存储/MLAG.md","excerpt":"<p>在数据中心网络和底层基础设施的架构中，<strong>MLAG（Multi-Chassis Link Aggregation Group，跨设备链路聚合）</strong> 是一项为了解决“单点故障”和“带宽浪费”而诞生的核心网络技术。</p>\\n<p>如果用一句话来概括：<strong>MLAG 就是让两台物理上独立的交换机，在下游服务器眼里“伪装”成一台逻辑上的超级交换机，从而实现真正的“双活”网络。</strong></p>\\n<p>为了让你透彻理解它的价值，我们需要看看在它诞生之前，网络架构面临着怎样让人头疼的死局。</p>\\n<h2>一、 传统网络的痛点（为什么需要 MLAG？）</h2>","autoDesc":true}`),i={name:`MLAG.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在数据中心网络和底层基础设施的架构中，<strong>MLAG（Multi-Chassis Link Aggregation Group，跨设备链路聚合）</strong> 是一项为了解决“单点故障”和“带宽浪费”而诞生的核心网络技术。</p>
<p>如果用一句话来概括：<strong>MLAG 就是让两台物理上独立的交换机，在下游服务器眼里“伪装”成一台逻辑上的超级交换机，从而实现真正的“双活”网络。</strong></p>
<p>为了让你透彻理解它的价值，我们需要看看在它诞生之前，网络架构面临着怎样让人头疼的死局。</p>
<h2 id="一、-传统网络的痛点-为什么需要-mlag" tabindex="-1"><a class="header-anchor" href="#一、-传统网络的痛点-为什么需要-mlag"><span>一、 传统网络的痛点（为什么需要 MLAG？）</span></a></h2>
<p>假设你有一台极其重要的 MinIO 存储服务器，为了防止网线断掉，你给它插了两张 10G（万兆）网卡。</p>
<h3 id="痛点-1-传统链路聚合-lag-lacp-的-单点故障" tabindex="-1"><a class="header-anchor" href="#痛点-1-传统链路聚合-lag-lacp-的-单点故障"><span>痛点 1：传统链路聚合（LAG/LACP）的“单点故障”</span></a></h3>
<p>你把两根网线都插在了<strong>同一台</strong>交换机上，并做了链路聚合。</p>
<ul>
<li>
<p><strong>好处</strong>：带宽变成了 20G，拔掉一根网线网络也不会断。</p>
</li>
<li>
<p><strong>致命弱点</strong>：如果这台交换机的主板烧了，或者需要重启升级，你的服务器就彻底断网了。这在企业级高可用架构中是绝对不允许的。</p>
</li>
</ul>
<h3 id="痛点-2-传统双机热备-stp-的-带宽浪费" tabindex="-1"><a class="header-anchor" href="#痛点-2-传统双机热备-stp-的-带宽浪费"><span>痛点 2：传统双机热备（STP）的“带宽浪费”</span></a></h3>
<p>为了防范交换机宕机，你买了两台交换机（交换机 A 和 B）。服务器的一根网线连 A，另一根连 B。两台交换机之间也连一根线。</p>
<ul>
<li>
<p><strong>致命弱点</strong>：网络中出现了“环路”。为了防止广播风暴把网络瘫痪，经典的 <strong>STP（生成树协议）</strong> 会强制把其中一根网线<strong>逻辑上堵死（Block）</strong>。</p>
</li>
<li>
<p><strong>结果</strong>：虽然你接了两根 10G 的线，但同一时间<strong>只有一根线能通数据</strong>。另一根线纯粹是“备胎”，平时带宽利用率只有 50%，极其浪费。</p>
</li>
</ul>
<h2 id="二、-mlag-的-欺骗-魔法" tabindex="-1"><a class="header-anchor" href="#二、-mlag-的-欺骗-魔法"><span>二、 MLAG 的“欺骗”魔法</span></a></h2>
<p>MLAG 完美打破了上述死局。它的核心工作机制如下：</p>
<ol>
<li>
<p><strong>建立兄弟同盟（Peer Link）</strong>：</p>
<p>交换机 A 和交换机 B 之间，用一根或多根极高带宽的光纤（比如 40G/100G）连起来。这根线叫 Peer Link，专门用来同步两台交换机的 MAC 地址表和运行状态。</p>
</li>
<li>
<p><strong>伪造统一身份（虚拟 MAC）</strong>：</p>
<p>两台交换机在软件层面上协商出一个统一的“虚拟 MAC 地址”和“系统优先级”。</p>
</li>
<li>
<p><strong>完美欺骗下游</strong>：</p>
<p>当下游的服务器（或下一级交换机）用标准的 LACP 协议向它们发起链路聚合请求时，交换机 A 和 B 都用那个统一的“虚拟 MAC”去回应。</p>
<p><strong>在服务器看来，它以为自己把两根网线插在了同一台异常强大的交换机上。</strong></p>
</li>
</ol>
<h3 id="mlag-架构的最终形态-双活-active-active" tabindex="-1"><a class="header-anchor" href="#mlag-架构的最终形态-双活-active-active"><span>MLAG 架构的最终形态（双活 Active-Active）：</span></a></h3>
<ul>
<li>
<p><strong>流量翻倍</strong>：服务器的两张 10G 网卡可以同时收发数据，总带宽达到 20G。</p>
</li>
<li>
<p><strong>无缝容灾</strong>：如果交换机 A 突然断电宕机，服务器根本感知不到“交换机切换”，剩下的流量会瞬间全部走交换机 B，业务网络零中断（毫秒级切换）。</p>
</li>
</ul>
<h2 id="三、-mlag-的核心组件术语" tabindex="-1"><a class="header-anchor" href="#三、-mlag-的核心组件术语"><span>三、 MLAG 的核心组件术语</span></a></h2>
<p>在配置或排查 MLAG 时，你经常会遇到这几个核心概念：</p>
<ul>
<li>
<p><strong>Peer Link（同行链路）</strong>：两台交换机之间的数据大动脉。不仅用来同步状态，当某台交换机的下行网线断了时，数据还会通过这根线绕行。</p>
</li>
<li>
<p><strong>Keepalive Link（心跳线）</strong>：通常走带外管理网口（OOB）。它只发轻量级的心跳包，用来确认对方是不是还活着。</p>
</li>
<li>
<p><strong>Split-Brain（脑裂防范）</strong>：如果最粗的 Peer Link 突然断了，但两台交换机都还活着，它们都会认为对方死了，从而争抢主导权，导致网络崩溃。Keepalive 线就是用来在此时确认对方死活，触发相应的孤立机制，防止脑裂的。</p>
</li>
</ul>
<h2 id="四、-架构对比总结" tabindex="-1"><a class="header-anchor" href="#四、-架构对比总结"><span>四、 架构对比总结</span></a></h2>
<table>
<thead>
<tr>
<th><strong>维度</strong></th>
<th><strong>传统 LAG (单台交换机)</strong></th>
<th><strong>传统 STP (主备交换机)</strong></th>
<th><strong>MLAG (跨设备聚合)</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>设备级容灾</strong></td>
<td>❌ 无，交换机挂了就全军覆没</td>
<td>✅ 有，主备容灾</td>
<td>✅ 有，双活容灾</td>
</tr>
<tr>
<td><strong>带宽利用率</strong></td>
<td>✅ 100% (例如 10G+10G=20G)</td>
<td>❌ 50% (一条通，一条堵死)</td>
<td>✅ 100% (两条线同时负载均衡)</td>
</tr>
<tr>
<td><strong>拓扑结构</strong></td>
<td>简单树状</td>
<td>复杂环状（靠协议堵死）</td>
<td><strong>无环（逻辑无环）</strong></td>
</tr>
<tr>
<td><strong>适用场景</strong></td>
<td>边缘接入、非核心业务</td>
<td>老旧网络架构</td>
<td><strong>现代数据中心、云原生存储集群底座</strong></td>
</tr>
</tbody>
</table>
<p>在现代的计算集群（如 K8s）和分布式存储（如 JuiceFS 依赖的 MinIO/Ceph）中，底层的网络基建几乎全部要求使用 MLAG 架构（或者更高级的 Spine-Leaf 配合 EVPN-VXLAN），以确保数据在任何单点硬件损毁时，都能保持满血的吞吐能力。</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};