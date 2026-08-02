import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/NAT.html","title":"NAT","lang":"zh-CN","frontmatter":{"title":"NAT","icon":"network","date":"2026-07-23T00:00:00.000Z","category":["计算机网络"],"description":"nat是什么？ 简单来说，NAT（Network Address Translation，网络地址转换）是一种将“私有 IP 地址”转换为“公用 IP 地址”的技术。 它的核心作用是让多台处于局域网（内网）的设备，通过共享同一个公网 IP 地址来访问互联网。 一、 为什么需要 NAT？ NAT 的出现主要是为了解决以下两个问题： 缓解 IPv4 地址枯...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"NAT\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/NAT.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"NAT"}],["meta",{"property":"og:description","content":"nat是什么？ 简单来说，NAT（Network Address Translation，网络地址转换）是一种将“私有 IP 地址”转换为“公用 IP 地址”的技术。 它的核心作用是让多台处于局域网（内网）的设备，通过共享同一个公网 IP 地址来访问互联网。 一、 为什么需要 NAT？ NAT 的出现主要是为了解决以下两个问题： 缓解 IPv4 地址枯..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.78,"words":1135},"filePathRelative":"posts/计算机网络/网络的概念/NAT.md","excerpt":"<h2>nat是什么？</h2>\\n<p>简单来说，<strong>NAT</strong>（Network Address Translation，网络地址转换）是一种将“私有 IP 地址”转换为“公用 IP 地址”的技术。</p>\\n<p>它的核心作用是让多台处于局域网（内网）的设备，通过共享同一个公网 IP 地址来访问互联网。</p>\\n<hr>\\n<h2>一、 为什么需要 NAT？</h2>\\n<p>NAT 的出现主要是为了解决以下两个问题：</p>\\n<ol>\\n<li><strong>缓解 IPv4 地址枯竭</strong>：IPv4 地址只有约 43 亿个，远远不够全球设备使用。通过 NAT，一个家庭或公司只需要一个公网 IP，内部成百上千台设备就能上网。</li>\\n<li><strong>安全性</strong>：NAT 隐藏了内网设备的真实 IP 地址。外界只能看到路由器的公网 IP，无法直接攻击内网的电脑，相当于一层天然的防火墙。</li>\\n</ol>","autoDesc":true}`),i={name:`NAT.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><h2 id="nat是什么" tabindex="-1"><a class="header-anchor" href="#nat是什么"><span>nat是什么？</span></a></h2>
<p>简单来说，<strong>NAT</strong>（Network Address Translation，网络地址转换）是一种将“私有 IP 地址”转换为“公用 IP 地址”的技术。</p>
<p>它的核心作用是让多台处于局域网（内网）的设备，通过共享同一个公网 IP 地址来访问互联网。</p>
<hr>
<h2 id="一、-为什么需要-nat" tabindex="-1"><a class="header-anchor" href="#一、-为什么需要-nat"><span>一、 为什么需要 NAT？</span></a></h2>
<p>NAT 的出现主要是为了解决以下两个问题：</p>
<ol>
<li><strong>缓解 IPv4 地址枯竭</strong>：IPv4 地址只有约 43 亿个，远远不够全球设备使用。通过 NAT，一个家庭或公司只需要一个公网 IP，内部成百上千台设备就能上网。</li>
<li><strong>安全性</strong>：NAT 隐藏了内网设备的真实 IP 地址。外界只能看到路由器的公网 IP，无法直接攻击内网的电脑，相当于一层天然的防火墙。</li>
</ol>
<hr>
<h2 id="二、-nat-是如何工作的" tabindex="-1"><a class="header-anchor" href="#二、-nat-是如何工作的"><span>二、 NAT 是如何工作的？</span></a></h2>
<p>你可以把 NAT 想象成一个**“邮件转办处”**：</p>
<ol>
<li><strong>发出请求</strong>：你的电脑（IP: <code v-pre>192.168.1.5</code>）想看网页。它把数据包发给路由器。</li>
<li><strong>地址转换</strong>：路由器把数据包里的“寄件人”地址从私有的 <code v-pre>192.168.1.5</code> 换成运营商给它的公网 IP（比如 <code v-pre>202.96.x.x</code>），并记录在一个 <strong>NAT 转换表</strong>里。</li>
<li><strong>数据返回</strong>：网页服务器把内容发回到公网 IP。</li>
<li><strong>分发回传</strong>：路由器查表发现这个请求是 <code v-pre>192.168.1.5</code> 发起的，再把地址换回来，转发给你的电脑。</li>
</ol>
<hr>
<h2 id="三、-nat-的常见分类" tabindex="-1"><a class="header-anchor" href="#三、-nat-的常见分类"><span>三、 NAT 的常见分类</span></a></h2>
<table>
<thead>
<tr>
<th><strong>类型</strong></th>
<th><strong>简称</strong></th>
<th><strong>特点</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>静态 NAT</strong></td>
<td>Static NAT</td>
<td>一个内网 IP 固定对应一个公网 IP。通常用于内网服务器对外提供服务。</td>
</tr>
<tr>
<td><strong>动态 NAT</strong></td>
<td>Dynamic NAT</td>
<td>在一个公网 IP 池中动态分配。谁先上网谁占用，用完释放。</td>
</tr>
<tr>
<td><strong>端口多路复用</strong></td>
<td><strong>NAPT / PAT</strong></td>
<td><strong>最常用类型</strong>。通过不同的“端口号”来区分不同的设备。即使只有一个公网 IP，也能让上百台设备同时在线。</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="四、-在三层交换机中的应用" tabindex="-1"><a class="header-anchor" href="#四、-在三层交换机中的应用"><span>四、 在三层交换机中的应用</span></a></h2>
<p>在你之前的实验中，<strong>三层交换机主要负责内网 VLAN 间的通信</strong>。通常 NAT 功能是在连接外网的<strong>出口路由器</strong>上开启的。</p>
<ul>
<li><strong>三层交换机</strong>：负责“楼层内/部门间”的路由。</li>
<li><strong>路由器（开启 NAT）</strong>：负责“公司到互联网”的转换。</li>
</ul>
<hr>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h3>
<p>NAT 就是<strong>内网到外网的“翻译官”</strong>。它既省了钱（不用买那么多公网 IP），又保了命（隐藏了内网结构）。</p>
<p><strong>既然你了解了 NAT，你想看看如何在思科设备上配置一个简单的 NAT 指令，还是想了解一下它的“兄弟”技术——端口映射（Port Forwarding）？</strong></p>
<p><strong>​</strong></p>
<p><strong>​</strong></p>
<h2 id="snat-源地址转换" tabindex="-1"><a class="header-anchor" href="#snat-源地址转换"><span>SNAT（源地址转换）</span></a></h2>
<p><strong>SNAT (Source Network Address Translation)</strong> 修改数据包的<strong>源 IP 地址</strong>。</p>
<ul>
<li><strong>应用场景</strong>：最常见的上网方式。当内网（私有 IP）的多台电脑想要访问互联网（公网 IP）时，路由器将这些电脑发出的数据包的源地址改为路由器的公网 IP。</li>
<li><strong>谁发起的？</strong>：由<strong>内部网络终端</strong>发起的请求。</li>
<li><strong>作用</strong>：隐藏内部真实 IP，解决公网 IP 不足的问题。</li>
<li><strong>典型案例</strong>：你在家里连接 WiFi 上网。</li>
</ul>
<hr>
<h2 id="dnat-目的地址转换" tabindex="-1"><a class="header-anchor" href="#dnat-目的地址转换"><span>DNAT（目的地址转换）</span></a></h2>
<p><strong>DNAT (Destination Network Address Translation)</strong> 修改数据包的<strong>目的 IP 地址</strong>。</p>
<ul>
<li><strong>应用场景</strong>：通常用于<strong>发布服务</strong>。当外部用户想要访问你内网的一台服务器（比如 Web 服务器或游戏服务器）时，他们访问的是你的公网 IP，路由器收到请求后，将数据包的目的地址改为内网服务器的私有 IP。</li>
<li><strong>谁发起的？</strong>：由**外部网络（互联网）**发起的请求。</li>
<li><strong>作用</strong>：保护服务器，使外部用户无法直接看到内网服务器的真实 IP，同时实现“端口映射”。</li>
<li><strong>典型案例</strong>：公司内网有一台网站服务器，你想让全世界的人都能通过公司的公网 IP 看到这个网站。</li>
</ul>
<hr>
<h2 id="snat-vs-dnat-对比表" tabindex="-1"><a class="header-anchor" href="#snat-vs-dnat-对比表"><span>SNAT vs DNAT 对比表</span></a></h2>
<table>
<thead>
<tr>
<th><strong>特性</strong></th>
<th><strong>SNAT (源地址转换)</strong></th>
<th><strong>DNAT (目的地址转换)</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>修改位置</strong></td>
<td>数据包的 <strong>Source IP</strong></td>
<td>数据包的 <strong>Destination IP</strong></td>
</tr>
<tr>
<td><strong>数据流向</strong></td>
<td><strong>内部 → 外部</strong></td>
<td><strong>外部 → 内部</strong></td>
</tr>
<tr>
<td><strong>主要目的</strong></td>
<td>内部私网主机访问互联网</td>
<td>互联网用户访问内部服务器</td>
</tr>
<tr>
<td><strong>典型配置</strong></td>
<td>配置在出口路由器的 <strong>Outbound</strong> 方向</td>
<td>配置在出口路由器的 <strong>Inbound</strong> 方向</td>
</tr>
<tr>
<td><strong>生活例子</strong></td>
<td>多人共用一个公网 IP 上网</td>
<td>远程桌面映射、内网建站</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="​" tabindex="-1"><a class="header-anchor" href="#​"><span>​</span></a></h2>
<p><strong>​</strong></p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};