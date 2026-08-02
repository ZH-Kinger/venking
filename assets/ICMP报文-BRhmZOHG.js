import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E4%BC%A0%E8%BE%93%E5%B1%82/ICMP%E6%8A%A5%E6%96%87.html","title":"ICMP报文","lang":"zh-CN","frontmatter":{"title":"ICMP报文","icon":"network","date":"2026-07-23T00:00:00.000Z","category":["计算机网络"],"description":"简单来说，ICMP（Internet Control Message Protocol，互联网控制报文协议）是 TCP/IP 协议族中的一个核心辅助协议。 如果把互联网通信比作寄快递，IP 协议负责把包裹送到目的地，而 ICMP 就像是快递查询系统和异常报告机制：它不直接运送你的信件内容，但会告诉你“快递丢了”、“地址找不到”或者“路堵了”。 1. I...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"ICMP报文\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E4%BC%A0%E8%BE%93%E5%B1%82/ICMP%E6%8A%A5%E6%96%87.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"ICMP报文"}],["meta",{"property":"og:description","content":"简单来说，ICMP（Internet Control Message Protocol，互联网控制报文协议）是 TCP/IP 协议族中的一个核心辅助协议。 如果把互联网通信比作寄快递，IP 协议负责把包裹送到目的地，而 ICMP 就像是快递查询系统和异常报告机制：它不直接运送你的信件内容，但会告诉你“快递丢了”、“地址找不到”或者“路堵了”。 1. I..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.15,"words":645},"filePathRelative":"posts/计算机网络/网络的概念/传输层/ICMP报文.md","excerpt":"<p>简单来说，<strong>ICMP</strong>（Internet Control Message Protocol，互联网控制报文协议）是 TCP/IP 协议族中的一个核心辅助协议。</p>\\n<p>如果把互联网通信比作寄快递，<strong>IP 协议</strong>负责把包裹送到目的地，而 <strong>ICMP</strong> 就像是快递查询系统和异常报告机制：它不直接运送你的信件内容，但会告诉你“快递丢了”、“地址找不到”或者“路堵了”。</p>\\n<hr>\\n<h3>1. ICMP 的核心功能</h3>\\n<p>ICMP 运行在<strong>网络层（Network Layer）</strong>，它的主要任务有两个：<strong>确认网络通畅性</strong>和<strong>报告错误</strong>。</p>","autoDesc":true}`),i={name:`ICMP报文.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>简单来说，<strong>ICMP</strong>（Internet Control Message Protocol，互联网控制报文协议）是 TCP/IP 协议族中的一个核心辅助协议。</p>
<p>如果把互联网通信比作寄快递，<strong>IP 协议</strong>负责把包裹送到目的地，而 <strong>ICMP</strong> 就像是快递查询系统和异常报告机制：它不直接运送你的信件内容，但会告诉你“快递丢了”、“地址找不到”或者“路堵了”。</p>
<hr>
<h3 id="_1-icmp-的核心功能" tabindex="-1"><a class="header-anchor" href="#_1-icmp-的核心功能"><span>1. ICMP 的核心功能</span></a></h3>
<p>ICMP 运行在<strong>网络层（Network Layer）</strong>，它的主要任务有两个：<strong>确认网络通畅性</strong>和<strong>报告错误</strong>。</p>
<ul>
<li><strong>确认状态（查询任务）：</strong> 检查目标主机是否在线，或者测量数据包往返的时间。</li>
<li><strong>报告错误（控制任务）：</strong> 当数据包在传输过程中遇到问题（比如找不到路径、生存时间 TTL 耗尽）时，路由器会通过 ICMP 报文通知发送者。</li>
</ul>
<hr>
<h3 id="_2-icmp-的两大常用工具" tabindex="-1"><a class="header-anchor" href="#_2-icmp-的两大常用工具"><span>2. ICMP 的两大常用工具</span></a></h3>
<p>你可能每天都在使用 ICMP，只是没有意识到：</p>
<ol>
<li><strong>Ping</strong>：</li>
</ol>
<ul>
<li>它利用了 ICMP 的 <strong>回显请求（Echo Request）</strong> 和 <strong>回显应答（Echo Reply）</strong>。</li>
<li>当你执行 <code v-pre>ping google.com</code>，你的电脑发出 Request，对方回传 Reply。如果能收到，说明物理链路和对方主机都是正常的。</li>
</ul>
<ol start="2">
<li><strong>Traceroute（路由跟踪）</strong>：</li>
</ol>
<ul>
<li>它利用 ICMP 的 <strong>超时报文（Time Exceeded）</strong>。</li>
<li>它通过故意让数据包的 TTL 逐个增加，诱导路径上的每个路由器发回 ICMP 报错，从而“画”出数据包经过的所有站点。</li>
</ul>
<hr>
<h3 id="_3-icmp-的报文结构" tabindex="-1"><a class="header-anchor" href="#_3-icmp-的报文结构"><span>3. ICMP 的报文结构</span></a></h3>
<p>ICMP 报文是封装在 <strong>IP 数据包</strong> 内部的。它的关键字段包括：</p>
<ul>
<li><strong>类型（Type）</strong>：大类。例如 8 代表请求，0 代表应答，3 代表不可达。</li>
<li><strong>代码（Code）</strong>：小类。例如类型 3 下的代码 1 代表“主机不可达”，代码 3 代表“端口不可达”。</li>
<li><strong>校验和（Checksum）</strong>：确保数据在传输中没被损坏。</li>
</ul>
<hr>
<h3 id="_4-icmp-与安全-iptables-相关" tabindex="-1"><a class="header-anchor" href="#_4-icmp-与安全-iptables-相关"><span>4. ICMP 与安全（iptables 相关）</span></a></h3>
<p>在网络安全中，ICMP 是一把双刃剑：</p>
<ul>
<li><strong>风险：</strong> 黑客可以通过 ICMP 探测你的网络拓扑（扫描哪些 IP 在线），或者发动 ICMP Flood 攻击（洪水攻击）让你的网卡瘫痪。</li>
<li><strong>防御：</strong> 许多管理员会在防火墙中限制 ICMP。</li>
</ul>
<p><strong>在</strong> <code v-pre>**iptables**</code> <strong>中禁掉 Ping 的典型命令：</strong></p>
<p>Bash</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 拦截所有进入本机的 ICMP 回显请求（别人 Ping 不通你）</span></span>
<span class="line"><span>iptables -A INPUT -p icmp --icmp-type echo-request -j DROP</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h3 id="_5-总结" tabindex="-1"><a class="header-anchor" href="#_5-总结"><span>5. 总结</span></a></h3>
<ul>
<li><strong>TCP/UDP</strong>：负责搬运<strong>业务数据</strong>（网页、视频、聊天内容）。</li>
<li><strong>ICMP</strong>：负责搬运<strong>网络状态信息</strong>。</li>
</ul>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};