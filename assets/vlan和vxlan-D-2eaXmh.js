import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E4%BA%A4%E6%8D%A2%E6%9C%BA/vlan%E5%92%8Cvxlan.html","title":"vlan和vxlan","lang":"zh-CN","frontmatter":{"title":"vlan和vxlan","icon":"network","date":"2026-07-23T00:00:00.000Z","category":["计算机网络"],"description":"1. 什么是 VLAN？ (Virtual Local Area Network) VLAN 是一种在**二层（数据链路层）**隔离广播域的技术。它通过在以太网帧中插入一个 802.1Q 标签（Tag），让物理上的同一台交换机逻辑上变成多台虚拟交换机。 核心限制： 它的标签只有 12 位（bits），这意味着一个网络里最多只能有 $2^{12} = 4...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"vlan和vxlan\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/vlan%E5%92%8Cvxlan-1.png\\",\\"https://venking.tech/blog/blog/assets/posts/vlan%E5%92%8Cvxlan-2.png\\",\\"https://venking.tech/blog/blog/assets/posts/vlan%E5%92%8Cvxlan-3.png\\",\\"https://venking.tech/blog/blog/assets/posts/vlan%E5%92%8Cvxlan-4.png\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E4%BA%A4%E6%8D%A2%E6%9C%BA/vlan%E5%92%8Cvxlan.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"vlan和vxlan"}],["meta",{"property":"og:description","content":"1. 什么是 VLAN？ (Virtual Local Area Network) VLAN 是一种在**二层（数据链路层）**隔离广播域的技术。它通过在以太网帧中插入一个 802.1Q 标签（Tag），让物理上的同一台交换机逻辑上变成多台虚拟交换机。 核心限制： 它的标签只有 12 位（bits），这意味着一个网络里最多只能有 $2^{12} = 4..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/vlan%E5%92%8Cvxlan-1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.91,"words":1173},"filePathRelative":"posts/计算机网络/网络的概念/交换机/vlan和vxlan.md","excerpt":"<h2>1. 什么是 VLAN？ (Virtual Local Area Network)</h2>\\n<p>VLAN 是一种在**二层（数据链路层）**隔离广播域的技术。它通过在以太网帧中插入一个 <strong>802.1Q 标签（Tag）</strong>，让物理上的同一台交换机逻辑上变成多台虚拟交换机。</p>\\n<ul>\\n<li><strong>核心限制：</strong> 它的标签只有 <strong>12 位（bits）</strong>，这意味着一个网络里最多只能有 $2^{12} = 4096$ 个 VLAN。这在早期的公司网络够用了，但在拥有成千上万租户的云数据中心里，这远远不够。</li>\\n</ul>","autoDesc":true}`),i={name:`vlan和vxlan.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><h2 id="_1-什么是-vlan-virtual-local-area-network" tabindex="-1"><a class="header-anchor" href="#_1-什么是-vlan-virtual-local-area-network"><span>1. 什么是 VLAN？ (Virtual Local Area Network)</span></a></h2>
<p>VLAN 是一种在**二层（数据链路层）**隔离广播域的技术。它通过在以太网帧中插入一个 <strong>802.1Q 标签（Tag）</strong>，让物理上的同一台交换机逻辑上变成多台虚拟交换机。</p>
<ul>
<li><strong>核心限制：</strong> 它的标签只有 <strong>12 位（bits）</strong>，这意味着一个网络里最多只能有 $2^{12} = 4096$ 个 VLAN。这在早期的公司网络够用了，但在拥有成千上万租户的云数据中心里，这远远不够。</li>
</ul>
<h2 id="_2-什么是-vxlan-virtual-extensible-lan" tabindex="-1"><a class="header-anchor" href="#_2-什么是-vxlan-virtual-extensible-lan"><span>2. 什么是 VXLAN？ (Virtual Extensible LAN)</span></a></h2>
<p>VXLAN 是一种 <strong>MAC-in-UDP</strong> 的隧道技术（隧道协议）。它把二层以太网帧封装在三层 UDP 报文中，从而实现“大二层网络”。</p>
<ul>
<li><strong>核心优势：</strong> 它的标识符（VNI）有 <strong>24 位（bits）</strong>，支持多达 $2^{24} \\approx 1600$ 万个隔离网络。</li>
</ul>
<p>​</p>
<h3 id="_3-vlan-与-vxlan-的深度对比" tabindex="-1"><a class="header-anchor" href="#_3-vlan-与-vxlan-的深度对比"><span>3. VLAN 与 VXLAN 的深度对比</span></a></h3>
<table>
<thead>
<tr>
<th><strong>特性</strong></th>
<th><strong>VLAN (传统)</strong></th>
<th><strong>VXLAN (现代)</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>OSI 层级</strong></td>
<td>二层 (Layer 2)</td>
<td>三层之上的隧道 (Layer 3 Overlay)</td>
</tr>
<tr>
<td><strong>ID 限制</strong></td>
<td><strong>4,096</strong> (12-bit ID)</td>
<td><strong>16,777,216</strong> (24-bit VNI)</td>
</tr>
<tr>
<td><strong>跨网段传输</strong></td>
<td>困难（通常需要二层链路汇聚）</td>
<td>轻松（基于 IP 网络，可跨路由器/互联网）</td>
</tr>
<tr>
<td><strong>负载均衡</strong></td>
<td>使用 STP（生成树），链路利用率低</td>
<td>使用 ECMP（等价多路径），多条路径同时跑</td>
</tr>
<tr>
<td><strong>主要用途</strong></td>
<td>办公室、实验室、小型机房</td>
<td><strong>公有云、SDN（软件定义网络）、大规模虚拟机迁移</strong></td>
</tr>
</tbody>
</table>
<hr>
<h3 id="_4-为什么现在大家都聊-vxlan" tabindex="-1"><a class="header-anchor" href="#_4-为什么现在大家都聊-vxlan"><span>4. 为什么现在大家都聊 VXLAN？</span></a></h3>
<p>想象一下，如果你在阿里云或华为云上开了一台虚拟机：</p>
<ol>
<li><strong>突破物理限制：</strong> 你的两台服务器可能物理上相隔几公里，中间隔着无数路由器。VLAN 没法跨路由器，但 VXLAN 可以像“钻山隧道”一样，让两台机器觉得自己在同一个交换机下。</li>
<li><strong>虚拟机迁移：</strong> 当你的虚拟机从 A 机架搬到 B 机架时，它的 IP 地址不需要变，业务不会中断。这是因为 VXLAN 在底层 IP 网络之上构建了一个透明的虚拟层。</li>
<li><strong>多租户隔离：</strong> 在云环境下，4096 个分区根本不够分给成千上万的用户，VXLAN 的 1600 万个分区解决了这个燃眉之急。</li>
</ol>
<hr>
<h3 id="_5-总结" tabindex="-1"><a class="header-anchor" href="#_5-总结"><span>5. 总结</span></a></h3>
<ul>
<li><strong>VLAN</strong> 就像是把一个大房间用<strong>屏风</strong>隔成几个小单间。</li>
<li><strong>VXLAN</strong> 就像是在不同的城市之间修了<strong>专用的高速隧道</strong>，即使物理距离很远，逻辑上也像是在同一个房间里。</li>
</ul>
<p>​</p>
<h2 id="广播域是什么" tabindex="-1"><a class="header-anchor" href="#广播域是什么"><span>广播域是什么？</span></a></h2>
<p><strong>广播域（Broadcast Domain）</strong> 简单来说，就是<strong>广播包（全网喊话）能够传达到的最大范围。</strong></p>
<h3 id="_1-核心定义" tabindex="-1"><a class="header-anchor" href="#_1-核心定义"><span>1. 核心定义</span></a></h3>
<p>在一个广播域内，如果一台设备发送了一个广播帧（目标 MAC 地址为 <code v-pre>FF:FF:FF:FF:FF:FF</code>），该范围内所有的其他设备都能收到这个包。</p>
<h3 id="_2-关键设备区别" tabindex="-1"><a class="header-anchor" href="#_2-关键设备区别"><span>2. 关键设备区别</span></a></h3>
<p>判断广播域范围，看这三样东西：</p>
<ul>
<li><strong>交换机（Switch）：</strong> 默认情况下，连接在同一台交换机上的所有电脑都在<strong>同一个</strong>广播域内。</li>
<li><strong>路由器（Router）：</strong> 路由器的每一个接口都是一个<strong>独立</strong>的广播域。路由器默认<strong>隔离</strong>广播，不会把广播包从一个接口传到另一个接口。</li>
<li><strong>VLAN（虚拟局域网）：</strong> 在交换机上划分 VLAN 后，每一个 VLAN 就是一个<strong>逻辑上独立</strong>的广播域。</li>
</ul>
<hr>
<h3 id="_3-为什么要限制广播域" tabindex="-1"><a class="header-anchor" href="#_3-为什么要限制广播域"><span>3. 为什么要限制广播域？</span></a></h3>
<p>如果一个广播域太大（比如几千台电脑连在一起）：</p>
<ol>
<li><strong>广播风暴：</strong> 太多设备同时“喊话”，会挤爆网络带宽。</li>
<li><strong>性能损耗：</strong> 每台电脑的 CPU 都要停下手中的活儿去处理这个广播包，导致设备变慢。</li>
<li><strong>安全问题：</strong> 广播包里可能含有敏感信息，不该听到的设备也能听到。</li>
</ol>
<hr>
<h3 id="_4-总结对比" tabindex="-1"><a class="header-anchor" href="#_4-总结对比"><span>4. 总结对比</span></a></h3>
<table>
<thead>
<tr>
<th><strong>概念</strong></th>
<th><strong>范围层级</strong></th>
<th><strong>核心作用</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>冲突域</strong></td>
<td>物理层/数据链路层</td>
<td>解决“两台机器同时说话会撞车”的问题（交换机端口隔离）</td>
</tr>
<tr>
<td><strong>广播域</strong></td>
<td>数据链路层</td>
<td>解决“一个人说话全网都要听”的问题（路由器/VLAN 隔离）</td>
</tr>
</tbody>
</table>
<p><strong>一句话总结：</strong> 交换机隔离冲突域，路由器隔离广播域。</p>
<p>​</p>
<h2 id="划分vlan" tabindex="-1"><a class="header-anchor" href="#划分vlan"><span>划分vlan</span></a></h2>
<p>即使在同一网段也不一定能通信，vlan可能不同</p>
<h3 id="_1-点击交换机进入配置界面" tabindex="-1"><a class="header-anchor" href="#_1-点击交换机进入配置界面"><span>1，点击交换机进入配置界面</span></a></h3>
<figure><img src="/blog/assets/posts/vlan%E5%92%8Cvxlan-1.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h3 id="_2-点击config选择vlan-databases添加vlan" tabindex="-1"><a class="header-anchor" href="#_2-点击config选择vlan-databases添加vlan"><span>2，点击config选择vlan databases添加vlan</span></a></h3>
<figure><img src="/blog/assets/posts/vlan%E5%92%8Cvxlan-2.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<p>添加了vlan100，名字是dev的vlan网段</p>
<figure><img src="/blog/assets/posts/vlan%E5%92%8Cvxlan-3.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h3 id="_3-选择接口修改vlan网段" tabindex="-1"><a class="header-anchor" href="#_3-选择接口修改vlan网段"><span>3，选择接口修改vlan网段</span></a></h3>
<figure><img src="/blog/assets/posts/vlan%E5%92%8Cvxlan-4.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};