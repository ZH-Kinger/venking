import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E8%B7%AF%E7%94%B1.html","title":"路由","lang":"zh-CN","frontmatter":{"title":"路由","icon":"network","date":"2026-07-23T00:00:00.000Z","category":["计算机网络"],"description":"什么是路由？ 简单来说，路由（Routing） 就是网络数据包从源地址到目的地址的“寻路”过程。 如果把互联网比作城市交通网，数据包就是送货的快递车，而路由器（Router） 就是各个十字路口的交通警察或导航仪，负责告诉快递车下一步该往哪条路走。 1. 路由的核心工作原理 路由过程主要依靠一张“地图”——路由表（Routing Table）。 当一个数...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"路由\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/%E8%B7%AF%E7%94%B1-1.png\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E8%B7%AF%E7%94%B1.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"路由"}],["meta",{"property":"og:description","content":"什么是路由？ 简单来说，路由（Routing） 就是网络数据包从源地址到目的地址的“寻路”过程。 如果把互联网比作城市交通网，数据包就是送货的快递车，而路由器（Router） 就是各个十字路口的交通警察或导航仪，负责告诉快递车下一步该往哪条路走。 1. 路由的核心工作原理 路由过程主要依靠一张“地图”——路由表（Routing Table）。 当一个数..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/%E8%B7%AF%E7%94%B1-1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":5.4,"words":1619},"filePathRelative":"posts/计算机网络/网络的概念/路由.md","excerpt":"<h2>什么是路由？</h2>\\n<p>简单来说，<strong>路由（Routing）</strong> 就是网络数据包从源地址到目的地址的“寻路”过程。</p>\\n<p>如果把互联网比作城市交通网，<strong>数据包</strong>就是送货的快递车，而<strong>路由器（Router）</strong> 就是各个十字路口的交通警察或导航仪，负责告诉快递车下一步该往哪条路走。</p>\\n<hr>\\n<h3>1. 路由的核心工作原理</h3>\\n<p>路由过程主要依靠一张“地图”——<strong>路由表（Routing Table）</strong>。</p>\\n<p>当一个数据包到达路由器时，路由器会执行以下三个步骤：</p>","autoDesc":true}`),i={name:`路由.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><h2 id="什么是路由" tabindex="-1"><a class="header-anchor" href="#什么是路由"><span>什么是路由？</span></a></h2>
<p>简单来说，<strong>路由（Routing）</strong> 就是网络数据包从源地址到目的地址的“寻路”过程。</p>
<p>如果把互联网比作城市交通网，<strong>数据包</strong>就是送货的快递车，而<strong>路由器（Router）</strong> 就是各个十字路口的交通警察或导航仪，负责告诉快递车下一步该往哪条路走。</p>
<hr>
<h3 id="_1-路由的核心工作原理" tabindex="-1"><a class="header-anchor" href="#_1-路由的核心工作原理"><span>1. 路由的核心工作原理</span></a></h3>
<p>路由过程主要依靠一张“地图”——<strong>路由表（Routing Table）</strong>。</p>
<p>当一个数据包到达路由器时，路由器会执行以下三个步骤：</p>
<ol>
<li><strong>拆解与查看：</strong> 查看数据包的目标 IP 地址。</li>
<li><strong>查表匹配：</strong> 在路由表中寻找与目标地址匹配的路径。</li>
<li><strong>转发（Forwarding）：</strong> 将数据包从正确的接口发送出去，交给下一个“站点”。</li>
</ol>
<hr>
<h3 id="_2-路由的类型" tabindex="-1"><a class="header-anchor" href="#_2-路由的类型"><span>2. 路由的类型</span></a></h3>
<p>根据“地图”是怎么画出来的，路由分为两大类：</p>
<h3 id="_1-直连路由-directly-connected-routes" tabindex="-1"><a class="header-anchor" href="#_1-直连路由-directly-connected-routes"><span>1. 直连路由 (Directly Connected Routes)</span></a></h3>
<p>当路由器的物理接口配置了 IP 地址并处于激活状态（Up）时，路由器会自动学习该接口所在的网段。</p>
<ul>
<li><strong>特点</strong>：优先级最高（管理距离通常为 0）。</li>
<li><strong>触发条件</strong>：接口 IP 已配置且 <code v-pre>no shutdown</code>，链路物理状态正常。</li>
<li><strong>作用</strong>：让路由器知道自己直接相连的“邻居”网段在哪里。</li>
</ul>
<hr>
<h3 id="_2-静态路由-static-routes" tabindex="-1"><a class="header-anchor" href="#_2-静态路由-static-routes"><span>2. 静态路由 (Static Routes)</span></a></h3>
<p>由网络管理员手动配置的路由条目。你之前通过命令手动指定的路径就属于这一类。</p>
<ul>
<li>
<p><strong>组成部分</strong>：目的网络地址、子网掩码、下一跳 IP 地址或出接口。</p>
</li>
<li>
<p><strong>优缺点</strong>：</p>
</li>
<li>
<p><strong>优点</strong>：不占用 CPU 和带宽资源，路径明确且安全。</p>
</li>
<li>
<p><strong>缺点</strong>：无法自动适应网络拓扑的变化（如线路断开需要手动修改）。</p>
</li>
<li>
<p><strong>特殊形式——默认路由 (Default Route)</strong>：</p>
</li>
<li>
<p>目的地址和掩码全为 <code v-pre>0.0.0.0</code>。</p>
</li>
<li>
<p>它是路由器的“兜底”路径，当路由表中找不到精确匹配的条目时，包会丢给默认路由。</p>
</li>
</ul>
<hr>
<h3 id="_3-动态路由-dynamic-routes" tabindex="-1"><a class="header-anchor" href="#_3-动态路由-dynamic-routes"><span>3. 动态路由 (Dynamic Routes)</span></a></h3>
<p>路由器之间运行特定的<strong>路由协议</strong>（Routing Protocol），通过互相“交谈”自动学习并维护路由表。</p>
<ul>
<li>
<p><strong>特点</strong>：能够自动适应网络变化（收敛），在大规模网络中减轻管理负担。</p>
</li>
<li>
<p><strong>常见协议分类</strong>：</p>
</li>
<li>
<p><strong>IGP（内部网关协议）</strong>：在同一个公司或机构内部使用。</p>
</li>
<li>
<p><strong>距离矢量协议</strong>：如 RIP（按跳数算路）。</p>
</li>
<li>
<p><strong>链路状态协议</strong>：如 <strong>OSPF</strong>（按带宽算路，目前最主流）、IS-IS。</p>
</li>
<li>
<p><strong>EGP（外部网关协议）</strong>：在不同运营商或大机构之间使用。</p>
</li>
<li>
<p>如 <strong>BGP</strong>（互联网的基石协议）。</p>
</li>
</ul>
<hr>
<h3 id="总结对比" tabindex="-1"><a class="header-anchor" href="#总结对比"><span>总结对比</span></a></h3>
<table>
<thead>
<tr>
<th><strong>路由类型</strong></th>
<th><strong>配置方式</strong></th>
<th><strong>资源占用</strong></th>
<th><strong>拓扑变化适应性</strong></th>
<th><strong>适用场景</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>直连路由</strong></td>
<td>自动生成</td>
<td>极低</td>
<td>随接口状态即时变化</td>
<td>基础寻址</td>
</tr>
<tr>
<td><strong>静态路由</strong></td>
<td>手动配置</td>
<td>极低</td>
<td><strong>差</strong>（需人工干预）</td>
<td>小型网络、边界出口</td>
</tr>
<tr>
<td><strong>动态路由</strong></td>
<td>协议学习</td>
<td>较高</td>
<td><strong>强</strong>（自动重新计算）</td>
<td>中大型复杂网络</td>
</tr>
</tbody>
</table>
<hr>
<p><strong>既然你已经掌握了静态路由，想在</strong></p>
<hr>
<h3 id="_3-核心概念-默认网关-default-gateway" tabindex="-1"><a class="header-anchor" href="#_3-核心概念-默认网关-default-gateway"><span>3. 核心概念：默认网关 (Default Gateway)</span></a></h3>
<p>在你的家用网络中，你的电脑或手机并不认识互联网上成千上万的路径。它们只知道一件事：<strong>只要不是发给家里其他设备的，统统丢给路由器。</strong></p>
<p>这个路由器的 IP 地址就是你设备的<strong>默认网关</strong>。它是你通往外界网络的“大门”。</p>
<p>​</p>
<h4 id="添加一个默认网关本质上就是添加一个默认路由" tabindex="-1"><a class="header-anchor" href="#添加一个默认网关本质上就是添加一个默认路由"><span>添加一个默认网关本质上就是添加一个默认路由</span></a></h4>
<hr>
<h3 id="_4-路由与交换的区别" tabindex="-1"><a class="header-anchor" href="#_4-路由与交换的区别"><span>4. 路由与交换的区别</span></a></h3>
<p>很多人容易混淆路由器和交换机，它们虽然长得像，但分工明确：</p>
<table>
<thead>
<tr>
<th><strong>特性</strong></th>
<th><strong>交换机 (Switch)</strong></th>
<th><strong>路由器 (Router)</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>工作层次</strong></td>
<td>数据链路层（L2）</td>
<td>网络层（L3）</td>
</tr>
<tr>
<td><strong>识别地址</strong></td>
<td>MAC 地址（硬件指纹）</td>
<td>IP 地址（逻辑地址）</td>
</tr>
<tr>
<td><strong>主要功能</strong></td>
<td>连接同一网络内的设备</td>
<td>连接不同的网络（如家网连外网）</td>
</tr>
<tr>
<td><strong>打个比方</strong></td>
<td>教学楼内的<strong>走廊</strong></td>
<td>城市间的<strong>高速公路入口</strong></td>
</tr>
</tbody>
</table>
<h2 id="路由器是什么" tabindex="-1"><a class="header-anchor" href="#路由器是什么"><span>路由器是什么？</span></a></h2>
<h3 id="_1-路由器的核心功能" tabindex="-1"><a class="header-anchor" href="#_1-路由器的核心功能"><span>1. 路由器的核心功能</span></a></h3>
<p>路由器的存在主要为了解决以下三个问题：</p>
<ul>
<li><strong>连接不同网络</strong>：路由器工作在 OSI 模型的<strong>网络层（第三层）</strong>，它可以连接物理介质或逻辑协议完全不同的网络（比如把你的家用局域网连接到互联网运营商的网络）。</li>
<li><strong>路径选择（路由）</strong>：当一个数据包进入路由器，路由器会查看数据包的“目的 IP 地址”，然后在自己的“路由表”中查找最合适的路径，决定下一步把包发给谁。</li>
<li><strong>隔离广播域</strong>：与交换机不同，路由器不会转发广播包。这意味着一个网段里的垃圾信息不会漫延到另一个网段，从而提高网络性能和安全性。</li>
</ul>
<hr>
<h3 id="_2-路由器的-大脑-路由表" tabindex="-1"><a class="header-anchor" href="#_2-路由器的-大脑-路由表"><span>2. 路由器的“大脑”：路由表</span></a></h3>
<p>路由器之所以知道路怎么走，是因为它维护着一张<strong>路由表（Routing Table）</strong>。正如我们之前讨论过的，路由表里的条目来源主要有三类：</p>
<ul>
<li><strong>直连路由 (Directly Connected)</strong>：路由器直接插着线的网段，状态为 <code v-pre>Up</code> 时自动生成。</li>
<li><strong>静态路由 (Static)</strong>：由你手动输入命令（如 <code v-pre>ip route ...</code>）告诉路由器的路径。</li>
<li><strong>动态路由 (Dynamic)</strong>：路由器通过 OSPF、RIP 等协议，通过和其他路由器“聊天”自动学来的路径。</li>
</ul>
<hr>
<h3 id="_3-数据转发的微观过程" tabindex="-1"><a class="header-anchor" href="#_3-数据转发的微观过程"><span>3. 数据转发的微观过程</span></a></h3>
<p>当一个数据包经过路由器时，路由器其实做了三件事：</p>
<ol>
<li><strong>拆信封（解封装）</strong>：剥掉二层的 MAC 地址帧头，查看三层的 IP 包头。</li>
<li><strong>看地址（查表）</strong>：匹配目的 IP，确认下一跳交给谁。</li>
<li><strong>换信封（重新封装）</strong>：根据下一跳的物理链路，封装新的源/目 MAC 地址，并把 TTL（生存时间）减 1。</li>
</ol>
<hr>
<h3 id="_4-路由器与交换机的区别" tabindex="-1"><a class="header-anchor" href="#_4-路由器与交换机的区别"><span>4. 路由器与交换机的区别</span></a></h3>
<p>这是很多初学者容易混淆的地方：</p>
<table>
<thead>
<tr>
<th><strong>特性</strong></th>
<th><strong>交换机 (Switch)</strong></th>
<th><strong>路由器 (Router)</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>工作层级</strong></td>
<td>数据链路层（第二层）</td>
<td>网络层（第三层）</td>
</tr>
<tr>
<td><strong>核心依据</strong></td>
<td>MAC 地址</td>
<td>IP 地址</td>
</tr>
<tr>
<td><strong>主要功能</strong></td>
<td>连接同一网段内的终端设备</td>
<td>连接不同的网络/网段</td>
</tr>
<tr>
<td><strong>广播处理</strong></td>
<td>转发广播</td>
<td>隔离广播</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="实验" tabindex="-1"><a class="header-anchor" href="#实验"><span>实验</span></a></h2>
<figure><img src="/blog/assets/posts/%E8%B7%AF%E7%94%B1-1.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};