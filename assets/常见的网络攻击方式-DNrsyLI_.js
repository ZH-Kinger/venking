import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E4%BC%A0%E8%BE%93%E5%B1%82/%E5%B8%B8%E8%A7%81%E7%9A%84%E7%BD%91%E7%BB%9C%E6%94%BB%E5%87%BB%E6%96%B9%E5%BC%8F.html","title":"常见的网络攻击方式","lang":"zh-CN","frontmatter":{"title":"常见的网络攻击方式","icon":"network","date":"2026-07-23T00:00:00.000Z","category":["计算机网络"],"description":"常见的网络攻击种类繁多，从消耗资源的“暴力拆解”到利用人性弱点的“尔虞我诈”，可以大致分为以下几类及其核心原理： 1. 拒绝服务攻击 (DoS / DDoS) 原理：通过短时间内发送海量的合法或非法请求，耗尽服务器的 带宽、内存、CPU 或连接数，导致正常用户无法访问。 SYN Flood (半连接攻击)：利用 TCP 三次握手原理。攻击者发送大量 S...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"常见的网络攻击方式\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E4%BC%A0%E8%BE%93%E5%B1%82/%E5%B8%B8%E8%A7%81%E7%9A%84%E7%BD%91%E7%BB%9C%E6%94%BB%E5%87%BB%E6%96%B9%E5%BC%8F.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"常见的网络攻击方式"}],["meta",{"property":"og:description","content":"常见的网络攻击种类繁多，从消耗资源的“暴力拆解”到利用人性弱点的“尔虞我诈”，可以大致分为以下几类及其核心原理： 1. 拒绝服务攻击 (DoS / DDoS) 原理：通过短时间内发送海量的合法或非法请求，耗尽服务器的 带宽、内存、CPU 或连接数，导致正常用户无法访问。 SYN Flood (半连接攻击)：利用 TCP 三次握手原理。攻击者发送大量 S..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.08,"words":924},"filePathRelative":"posts/计算机网络/网络的概念/传输层/常见的网络攻击方式.md","excerpt":"<p>常见的网络攻击种类繁多，从消耗资源的“暴力拆解”到利用人性弱点的“尔虞我诈”，可以大致分为以下几类及其核心原理：</p>\\n<hr>\\n<h2>1. 拒绝服务攻击 (DoS / DDoS)</h2>\\n<p><strong>原理</strong>：通过短时间内发送海量的合法或非法请求，耗尽服务器的 <strong>带宽、内存、CPU 或连接数</strong>，导致正常用户无法访问。</p>\\n<ul>\\n<li><strong>SYN Flood (半连接攻击)</strong>：利用 TCP 三次握手原理。攻击者发送大量 SYN 包但不回最后的 ACK，使服务器内存中堆积大量“半连接”队列，直至资源耗尽。</li>\\n<li><strong>反射放大攻击</strong>：攻击者冒充受害者的 IP 向 DNS 或 NTP 服务器发短请求，这些服务器会向受害者回传巨大的响应包，实现“以小博大”的流量轰炸。</li>\\n</ul>","autoDesc":true}`),i={name:`常见的网络攻击方式.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>常见的网络攻击种类繁多，从消耗资源的“暴力拆解”到利用人性弱点的“尔虞我诈”，可以大致分为以下几类及其核心原理：</p>
<hr>
<h2 id="_1-拒绝服务攻击-dos-ddos" tabindex="-1"><a class="header-anchor" href="#_1-拒绝服务攻击-dos-ddos"><span>1. 拒绝服务攻击 (DoS / DDoS)</span></a></h2>
<p><strong>原理</strong>：通过短时间内发送海量的合法或非法请求，耗尽服务器的 <strong>带宽、内存、CPU 或连接数</strong>，导致正常用户无法访问。</p>
<ul>
<li><strong>SYN Flood (半连接攻击)</strong>：利用 TCP 三次握手原理。攻击者发送大量 SYN 包但不回最后的 ACK，使服务器内存中堆积大量“半连接”队列，直至资源耗尽。</li>
<li><strong>反射放大攻击</strong>：攻击者冒充受害者的 IP 向 DNS 或 NTP 服务器发短请求，这些服务器会向受害者回传巨大的响应包，实现“以小博大”的流量轰炸。</li>
</ul>
<hr>
<h2 id="_2-注入攻击-injection" tabindex="-1"><a class="header-anchor" href="#_2-注入攻击-injection"><span>2. 注入攻击 (Injection)</span></a></h2>
<p><strong>原理</strong>：攻击者在输入框或 URL 参数中构造特殊的恶意代码，如果程序没做过滤直接拼接到执行命令中，就会被当作指令运行。</p>
<ul>
<li><strong>SQL 注入</strong>：在登录框输入 <code v-pre>' OR '1'='1</code>。程序将其拼入数据库查询语句，导致绕过密码验证直接登录。</li>
<li><strong>命令注入</strong>：利用 Web 服务的漏洞，在参数里加入 <code v-pre>; rm -rf /</code> 等系统命令，直接控制服务器。</li>
</ul>
<hr>
<h2 id="_3-中间人攻击-mitm" tabindex="-1"><a class="header-anchor" href="#_3-中间人攻击-mitm"><span>3. 中间人攻击 (MITM)</span></a></h2>
<p><strong>原理</strong>：攻击者潜伏在通信双方之间，拦截、阅读甚至篡改双方交换的数据，而双方对此一无所知。</p>
<ul>
<li><strong>ARP 欺骗</strong>：在局域网内广播伪造的 ARP 包，告诉大家“我就是网关”，从而拦截所有上网流量。</li>
<li><strong>SSL 剥离</strong>：强制将用户的 HTTPS 连接降级为明文的 HTTP，从而窃取账号密码。</li>
</ul>
<hr>
<h2 id="_4-跨站脚本攻击-xss" tabindex="-1"><a class="header-anchor" href="#_4-跨站脚本攻击-xss"><span>4. 跨站脚本攻击 (XSS)</span></a></h2>
<p><strong>原理</strong>：攻击者将恶意脚本（通常是 JavaScript）嵌入到正常网页中。当其他用户浏览该页面时，脚本会在用户的浏览器上运行。</p>
<ul>
<li><strong>存储型 XSS</strong>：恶意代码被存在网站数据库里（如评论区）。每个看评论的人都会被偷走 Cookie。</li>
<li><strong>反射型 XSS</strong>：通过诱导用户点击带有脚本参数的恶意链接触发。</li>
</ul>
<hr>
<h2 id="_5-跨站请求伪造-csrf" tabindex="-1"><a class="header-anchor" href="#_5-跨站请求伪造-csrf"><span>5. 跨站请求伪造 (CSRF)</span></a></h2>
<p><strong>原理</strong>：利用用户已登录的身份（浏览器自动携带的 Cookie），诱导用户在不知情的情况下点击链接，向受信任网站发起伪造请求。</p>
<ul>
<li><strong>例子</strong>：你在银行网页登录未退出，点击了一个“中奖链接”，该链接后台自动发起了给攻击者转账的请求。</li>
</ul>
<hr>
<h2 id="_6-社会工程学-social-engineering" tabindex="-1"><a class="header-anchor" href="#_6-社会工程学-social-engineering"><span>6. 社会工程学 (Social Engineering)</span></a></h2>
<p><strong>原理</strong>：<strong>不攻击系统，攻击人</strong>。利用贪婪、恐惧或信任等心理漏洞获取信息。</p>
<ul>
<li><strong>钓鱼攻击 (Phishing)</strong>：伪造高仿的银行登录页面、协作软件通知，骗取用户输入账号密码。</li>
<li><strong>鱼叉式钓鱼</strong>：针对特定目标（如财务人员）定制的极具欺骗性的邮件。</li>
</ul>
<hr>
<h2 id="总结对比" tabindex="-1"><a class="header-anchor" href="#总结对比"><span>总结对比</span></a></h2>
<table>
<thead>
<tr>
<th><strong>攻击类型</strong></th>
<th><strong>核心目标</strong></th>
<th><strong>防御关键词</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>DDoS</strong></td>
<td>瘫痪服务</td>
<td>流量清洗、高防 IP</td>
</tr>
<tr>
<td><strong>SQL 注入</strong></td>
<td>窃取/破坏数据</td>
<td>参数化查询、输入过滤</td>
</tr>
<tr>
<td><strong>XSS</strong></td>
<td>劫持用户会话</td>
<td>转义输出、内容安全策略 (CSP)</td>
</tr>
<tr>
<td><strong>MITM</strong></td>
<td>窃听/篡改</td>
<td>强制全量 HTTPS、静态 ARP</td>
</tr>
<tr>
<td><strong>钓鱼</strong></td>
<td>骗取凭证</td>
<td>多因素认证 (MFA)、安全意识培训</td>
</tr>
</tbody>
</table>
<p><strong>你是想了解如何为你的服务器配置防火墙防御，还是需要一份针对 Web 应用的安全开发指南？我可以为你列出具体的防御措施。</strong></p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};