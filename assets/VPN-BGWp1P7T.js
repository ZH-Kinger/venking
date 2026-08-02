import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E8%B7%B3%E6%9D%BF%E6%9C%BA/VPN.html","title":"VPN","lang":"zh-CN","frontmatter":{"title":"VPN","icon":"network","date":"2026-07-23T00:00:00.000Z","category":["计算机网络"],"description":"VPN是什么？ VPN（Virtual Private Network，虚拟专用网络） 简单来说，就是在公共的网络基础设施（如互联网）上，通过加密和隧道技术，为你开辟的一条“专属私人隧道”。 通过这条隧道，你的设备可以像直接连接在某个私有局域网内一样进行通信，同时保证数据不被外界窃听或篡改。 1. VPN 的工作原理 VPN 的核心在于三个关键技术：隧...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"VPN\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E8%B7%B3%E6%9D%BF%E6%9C%BA/VPN.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"VPN"}],["meta",{"property":"og:description","content":"VPN是什么？ VPN（Virtual Private Network，虚拟专用网络） 简单来说，就是在公共的网络基础设施（如互联网）上，通过加密和隧道技术，为你开辟的一条“专属私人隧道”。 通过这条隧道，你的设备可以像直接连接在某个私有局域网内一样进行通信，同时保证数据不被外界窃听或篡改。 1. VPN 的工作原理 VPN 的核心在于三个关键技术：隧..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.5,"words":751},"filePathRelative":"posts/计算机网络/网络的概念/跳板机/VPN.md","excerpt":"<h2>VPN是什么？</h2>\\n<p><strong>VPN（Virtual Private Network，虚拟专用网络）</strong> 简单来说，就是在公共的网络基础设施（如互联网）上，通过加密和隧道技术，为你开辟的一条“专属私人隧道”。</p>\\n<p>通过这条隧道，你的设备可以像直接连接在某个私有局域网内一样进行通信，同时保证数据不被外界窃听或篡改。</p>\\n<h2>1. VPN 的工作原理</h2>\\n<p>VPN 的核心在于三个关键技术：<strong>隧道（Tunneling）</strong>、<strong>加密（Encryption）</strong> 和 <strong>身份认证</strong>。</p>","autoDesc":true}`),i={name:`VPN.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><h2 id="vpn是什么" tabindex="-1"><a class="header-anchor" href="#vpn是什么"><span>VPN是什么？</span></a></h2>
<p><strong>VPN（Virtual Private Network，虚拟专用网络）</strong> 简单来说，就是在公共的网络基础设施（如互联网）上，通过加密和隧道技术，为你开辟的一条“专属私人隧道”。</p>
<p>通过这条隧道，你的设备可以像直接连接在某个私有局域网内一样进行通信，同时保证数据不被外界窃听或篡改。</p>
<h2 id="_1-vpn-的工作原理" tabindex="-1"><a class="header-anchor" href="#_1-vpn-的工作原理"><span>1. VPN 的工作原理</span></a></h2>
<p>VPN 的核心在于三个关键技术：<strong>隧道（Tunneling）</strong>、<strong>加密（Encryption）</strong> 和 <strong>身份认证</strong>。</p>
<h3 id="通俗的流程图解" tabindex="-1"><a class="header-anchor" href="#通俗的流程图解"><span>通俗的流程图解：</span></a></h3>
<ol>
<li><strong>建立隧道：</strong> 你的 VPN 客户端与 VPN 服务器之间协商建立一个逻辑上的连接。</li>
<li><strong>数据装箱（封装）：</strong> 你发送的数据包会被重新包装，外面套上一个 VPN 协议的“外壳”。</li>
<li><strong>加密传输：</strong> 数据在通过互联网传输前被加密。即使黑客在半路截获了数据，看到的也只是乱码。</li>
<li><strong>拆封解密：</strong> 数据到达 VPN 服务器后，服务器拆掉外壳并解密，然后将原始数据转发给目标资源（如公司内部服务器或某个网站）。</li>
</ol>
<hr>
<h2 id="_2-vpn-的核心功能" tabindex="-1"><a class="header-anchor" href="#_2-vpn-的核心功能"><span>2. VPN 的核心功能</span></a></h2>
<ul>
<li><strong>隐藏真实 IP：</strong> 目标服务器只能看到 VPN 服务器的 IP 地址，无法直接追踪到你的真实地理位置。</li>
<li><strong>数据加固：</strong> 在公共 Wi-Fi（如咖啡厅、机场）等不安全环境下，VPN 能有效防止账号密码被“嗅探”。</li>
<li><strong>远程接入（最原始用途）：</strong> 让出差的员工能够安全地访问公司内网的文档、代码库或 OA 系统，就像坐在办公室里办公一样。</li>
<li><strong>突破网络限制：</strong> 改变网络出口路径，绕过某些基于地域或策略的网络封锁。</li>
</ul>
<hr>
<h2 id="_3-常见的-vpn-实现协议" tabindex="-1"><a class="header-anchor" href="#_3-常见的-vpn-实现协议"><span>3. 常见的 VPN 实现协议</span></a></h2>
<p>不同的协议在速度和安全性之间有不同的取舍：</p>
<table>
<thead>
<tr>
<th><strong>协议名称</strong></th>
<th><strong>特点</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>IPsec</strong></td>
<td>极其安全，常用于企业分支机构之间的常驻连接（Site-to-Site）。</td>
</tr>
<tr>
<td><strong>SSL/TLS</strong></td>
<td>无需安装复杂客户端，通常通过浏览器或简单的 App 即可使用（如 OpenVPN）。</td>
</tr>
<tr>
<td><strong>WireGuard</strong></td>
<td>近几年兴起的新协议，代码极简，速度极快，性能优于传统的 OpenVPN。</td>
</tr>
<tr>
<td><strong>L2TP/PPTP</strong></td>
<td>较老的协议，兼容性好，但安全性相对较低。</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="_4-与跳板机-堡垒机的区别" tabindex="-1"><a class="header-anchor" href="#_4-与跳板机-堡垒机的区别"><span>4. 与跳板机/堡垒机的区别</span></a></h2>
<p>既然 VPN 也能访问内网，为什么还要跳板机？</p>
<ul>
<li><strong>VPN 解决的是“准入”：</strong> 它让你进入内网这个“房间”，但进入后你可能能看到所有的机器。</li>
<li><strong>跳板机/堡垒机解决的是“管控”：</strong> 它是房间里的“安检柜台”。即使你通过 VPN 进来了，要操作核心服务器，还得在跳板机上登录并留下操作记录。</li>
<li><strong>典型实践：</strong> 企业通常采用 <strong>“VPN + 堡垒机”</strong> 的组合。先连 VPN 进内网，再登录堡垒机进行具体的运维操作。</li>
</ul>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};