import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E8%B7%AF%E7%94%B1/arp%E5%8D%8F%E8%AE%AE.html","title":"arp协议","lang":"zh-CN","frontmatter":{"title":"arp协议","icon":"network","date":"2026-07-23T00:00:00.000Z","category":["计算机网络"],"description":"简单来说，ARP（Address Resolution Protocol，地址解析协议） 是局域网中的“翻译官”。它的核心任务是将网络层的 IP 地址（逻辑地址）转换为数据链路层的 MAC 地址（物理地址）。 为什么需要 ARP？ 在网络通信中，由于 IP 协议和以太网协议分工不同，会出现一个“信息差”： IP 地址：告诉你目的地在网络的哪个位置（像收...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"arp协议\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E8%B7%AF%E7%94%B1/arp%E5%8D%8F%E8%AE%AE.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"arp协议"}],["meta",{"property":"og:description","content":"简单来说，ARP（Address Resolution Protocol，地址解析协议） 是局域网中的“翻译官”。它的核心任务是将网络层的 IP 地址（逻辑地址）转换为数据链路层的 MAC 地址（物理地址）。 为什么需要 ARP？ 在网络通信中，由于 IP 协议和以太网协议分工不同，会出现一个“信息差”： IP 地址：告诉你目的地在网络的哪个位置（像收..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.1,"words":631},"filePathRelative":"posts/计算机网络/网络的概念/路由/arp协议.md","excerpt":"<p>简单来说，<strong>ARP（Address Resolution Protocol，地址解析协议）</strong> 是局域网中的“翻译官”。它的核心任务是将网络层的 <strong>IP 地址</strong>（逻辑地址）转换为数据链路层的 <strong>MAC 地址</strong>（物理地址）。</p>\\n<hr>\\n<h3>为什么需要 ARP？</h3>\\n<p>在网络通信中，由于 IP 协议和以太网协议分工不同，会出现一个“信息差”：</p>\\n<ul>\\n<li><strong>IP 地址</strong>：告诉你目的地在网络的哪个位置（像收件人姓名）。</li>\\n<li><strong>MAC 地址</strong>：网卡唯一的硬件标识，是局域网内传输数据的“真正门牌号”（像身份证号）。</li>\\n</ul>","autoDesc":true}`),i={name:`arp协议.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>简单来说，<strong>ARP（Address Resolution Protocol，地址解析协议）</strong> 是局域网中的“翻译官”。它的核心任务是将网络层的 <strong>IP 地址</strong>（逻辑地址）转换为数据链路层的 <strong>MAC 地址</strong>（物理地址）。</p>
<hr>
<h3 id="为什么需要-arp" tabindex="-1"><a class="header-anchor" href="#为什么需要-arp"><span>为什么需要 ARP？</span></a></h3>
<p>在网络通信中，由于 IP 协议和以太网协议分工不同，会出现一个“信息差”：</p>
<ul>
<li><strong>IP 地址</strong>：告诉你目的地在网络的哪个位置（像收件人姓名）。</li>
<li><strong>MAC 地址</strong>：网卡唯一的硬件标识，是局域网内传输数据的“真正门牌号”（像身份证号）。</li>
</ul>
<p>当你只知道目标的 IP 地址时，电脑无法直接把数据包发出去，因为它不知道要把这个包交给哪块网卡。这时候，ARP 就会出面解决问题。</p>
<hr>
<h3 id="arp-的工作流程-从-广播喊话-到-私信回复" tabindex="-1"><a class="header-anchor" href="#arp-的工作流程-从-广播喊话-到-私信回复"><span>ARP 的工作流程：从“广播喊话”到“私信回复”</span></a></h3>
<p>我们可以把 ARP 的工作过程想象成在一个办公室里找人：</p>
<ol>
<li><strong>ARP 请求（广播）</strong>：</li>
</ol>
<p>你的电脑（主机 A）在局域网内大声喊：“<strong>谁的 IP 是 192.168.1.5？请把你的 MAC 地址告诉我！</strong>”</p>
<p><em>这条消息会被发给局域网内的所有人（广播）。</em></p>
<ol start="2">
<li><strong>ARP 响应（单播）</strong>：</li>
</ol>
<p>拥有该 IP 的电脑（主机 B）听到后，会回复：“<strong>是我！我的 MAC 地址是 00-AA-BB-CC-DD-EE。</strong>”</p>
<p><em>这条回复是直接发给主机 A 的（单播）。</em></p>
<ol start="3">
<li><strong>ARP 缓存</strong>：</li>
</ol>
<p>主机 A 收到回复后，会把这个对应关系存入自己的 <strong>ARP 缓存表</strong>（ARP Cache）里。下次再发数据时，直接查表就行，不用再到处喊了。</p>
<hr>
<h3 id="常见的几种-arp-类型" tabindex="-1"><a class="header-anchor" href="#常见的几种-arp-类型"><span>常见的几种 ARP 类型</span></a></h3>
<p>除了标准的 ARP，你可能还会听到这些变体：</p>
<table>
<thead>
<tr>
<th><strong>类型</strong></th>
<th><strong>说明</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>免费 ARP (Gratuitous ARP)</strong></td>
<td>电脑刚开机时自己喊一声：“我的 IP 是 XXX，MAC 是 YYY”。主要用于检测 IP 冲突。</td>
</tr>
<tr>
<td><strong>代理 ARP (Proxy ARP)</strong></td>
<td>当目标不在本局域网时，路由器可以代为响应，告诉发送者：“把包发给我，我帮你转交”。</td>
</tr>
<tr>
<td><strong>反向 ARP (RARP)</strong></td>
<td>知道 MAC 地址求 IP 地址（现在基本被 DHCP 协议取代了）。</td>
</tr>
</tbody>
</table>
<hr>
<h3 id="潜在的安全风险-arp-欺骗" tabindex="-1"><a class="header-anchor" href="#潜在的安全风险-arp-欺骗"><span>潜在的安全风险：ARP 欺骗</span></a></h3>
<p>ARP 协议设计得很“单纯”：它默认相信任何发来的 ARP 响应。</p>
<p>攻击者可以伪造虚假的响应，告诉你的电脑：“我就是网关”。这样，你原本发往互联网的所有流量都会先经过攻击者的电脑，导致隐私泄露或网络中断。</p>
<p>​</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};