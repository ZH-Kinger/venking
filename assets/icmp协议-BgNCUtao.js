import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E8%B7%AF%E7%94%B1/icmp%E5%8D%8F%E8%AE%AE.html","title":"icmp协议","lang":"zh-CN","frontmatter":{"title":"icmp协议","icon":"network","date":"2026-07-23T00:00:00.000Z","category":["计算机网络"],"description":"如果说 ARP 是网络界的“翻译官”，那么 ICMP（Internet Control Message Protocol，互联网控制报文协议） 就是网络界的**“勤务兵”兼“体检医生”**。 它不负责传输用户数据（比如网页或视频内容），而是专门负责发送控制消息，告知网络设备之间发生了什么问题，或者探测网络是否通畅。 ICMP 的核心功能 在复杂的网络传...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"icmp协议\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E8%B7%AF%E7%94%B1/icmp%E5%8D%8F%E8%AE%AE.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"icmp协议"}],["meta",{"property":"og:description","content":"如果说 ARP 是网络界的“翻译官”，那么 ICMP（Internet Control Message Protocol，互联网控制报文协议） 就是网络界的**“勤务兵”兼“体检医生”**。 它不负责传输用户数据（比如网页或视频内容），而是专门负责发送控制消息，告知网络设备之间发生了什么问题，或者探测网络是否通畅。 ICMP 的核心功能 在复杂的网络传..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.12,"words":637},"filePathRelative":"posts/计算机网络/网络的概念/路由/icmp协议.md","excerpt":"<p>如果说 <strong>ARP</strong> 是网络界的“翻译官”，那么 <strong>ICMP（Internet Control Message Protocol，互联网控制报文协议）</strong> 就是网络界的**“勤务兵”兼“体检医生”**。</p>\\n<p>它不负责传输用户数据（比如网页或视频内容），而是专门负责发送<strong>控制消息</strong>，告知网络设备之间发生了什么问题，或者探测网络是否通畅。</p>\\n<hr>\\n<h3>ICMP 的核心功能</h3>\\n<p>在复杂的网络传输中，数据包可能会迷路、超时或者目标不可达。这时，ICMP 就会站出来“打报告”：</p>","autoDesc":true}`),i={name:`icmp协议.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>如果说 <strong>ARP</strong> 是网络界的“翻译官”，那么 <strong>ICMP（Internet Control Message Protocol，互联网控制报文协议）</strong> 就是网络界的**“勤务兵”兼“体检医生”**。</p>
<p>它不负责传输用户数据（比如网页或视频内容），而是专门负责发送<strong>控制消息</strong>，告知网络设备之间发生了什么问题，或者探测网络是否通畅。</p>
<hr>
<h3 id="icmp-的核心功能" tabindex="-1"><a class="header-anchor" href="#icmp-的核心功能"><span>ICMP 的核心功能</span></a></h3>
<p>在复杂的网络传输中，数据包可能会迷路、超时或者目标不可达。这时，ICMP 就会站出来“打报告”：</p>
<ol>
<li><strong>差错报告</strong>：当路由器发现无法把包送到目的地时（例如线路断了或目标 IP 不存在），它会向发送者回传一个 ICMP 消息，说明失败原因。</li>
<li><strong>网络探测</strong>：检查目标主机是否在线，或者测量数据传输的延迟。</li>
</ol>
<hr>
<h3 id="我们最常用的-icmp-工具" tabindex="-1"><a class="header-anchor" href="#我们最常用的-icmp-工具"><span>我们最常用的 ICMP 工具</span></a></h3>
<p>你可能每天都在用 ICMP，只是没意识到：</p>
<ul>
<li>
<p><strong>Ping</strong>： 它使用的是 ICMP 的“回显请求（Echo Request）”和“回显回答（Echo Reply）”。</p>
</li>
<li>
<p>你发一个 Ping 包给服务器，服务器回一个包。通过往返时间，你就能判断网络快不快、有没有掉包。</p>
</li>
<li>
<p><strong>Tracert / Traceroute</strong>： 它利用 ICMP 的超时机制来追踪数据包经过了哪些路由器。</p>
</li>
<li>
<p>它能帮你找出网络连接在哪一跳（哪台设备）卡住了。</p>
</li>
</ul>
<hr>
<h3 id="icmp-数据包的结构" tabindex="-1"><a class="header-anchor" href="#icmp-数据包的结构"><span>ICMP 数据包的结构</span></a></h3>
<p>ICMP 报文通常封装在 <strong>IP 数据包</strong> 内部。它的关键字段包括：</p>
<ul>
<li><strong>类型 (Type)</strong>：消息的大类（如：8 代表请求，0 代表响应，3 代表目标不可达）。</li>
<li><strong>代码 (Code)</strong>：更细分的原因（如：目标不可达是因为网络断了，还是端口被禁了）。</li>
<li><strong>校验和 (Checksum)</strong>：确保消息在传输中没有损坏。</li>
</ul>
<hr>
<h3 id="icmp-与安全-为什么有些服务器-ping-不通" tabindex="-1"><a class="header-anchor" href="#icmp-与安全-为什么有些服务器-ping-不通"><span>ICMP 与安全：为什么有些服务器 Ping 不通？</span></a></h3>
<p>虽然 ICMP 很有用，但它也常被黑客利用：</p>
<ul>
<li><strong>死亡之 Ping (Ping of Death)</strong>：发送异常巨大的 ICMP 包导致对方系统崩溃。</li>
<li><strong>ICMP 洪水攻击</strong>：短时间内发送海量 Ping 请求，消耗对方带宽。</li>
</ul>
<p>因此，很多公司的防火墙会<strong>禁用 ICMP</strong>。这就是为什么有时你能正常打开一个网站，但在命令行里却 <code v-pre>ping</code> 不通它的原因。</p>
<hr>
<h3 id="总结-arp-vs-icmp" tabindex="-1"><a class="header-anchor" href="#总结-arp-vs-icmp"><span>总结：ARP vs ICMP</span></a></h3>
<ul>
<li><strong>ARP</strong>：解决的是“你的<strong>硬件地址</strong>是什么”的问题（局域网内部）。</li>
<li><strong>ICMP</strong>：解决的是“网络<strong>通不通</strong>，出了什么错”的问题（跨网络）。</li>
</ul>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};