import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E4%BC%A0%E8%BE%93%E5%B1%82/TCP%E5%92%8CUDP%E5%AF%B9%E6%AF%94.html","title":"TCP和UDP对比","lang":"zh-CN","frontmatter":{"title":"TCP和UDP对比","icon":"network","date":"2026-07-23T00:00:00.000Z","category":["计算机网络"],"description":"简单来说，TCP 就像是打长途电话，必须确认接通了、听清了才继续说；而 UDP 就像是在路边支个大喇叭喊话，喊出去就不管了，听不听得到全看缘分。 为了让你更直观地理解，我们将从核心维度进行深度对比： 1. 核心差异对照表 2. 深度功能对比 (1) 确认机制 vs. 盲目发送 TCP：每发一个包，接收方都要回一个“收到”的信号（ACK）。如果没收到，发...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"TCP和UDP对比\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/TCP%E5%92%8CUDP%E5%AF%B9%E6%AF%94-1.png\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E4%BC%A0%E8%BE%93%E5%B1%82/TCP%E5%92%8CUDP%E5%AF%B9%E6%AF%94.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"TCP和UDP对比"}],["meta",{"property":"og:description","content":"简单来说，TCP 就像是打长途电话，必须确认接通了、听清了才继续说；而 UDP 就像是在路边支个大喇叭喊话，喊出去就不管了，听不听得到全看缘分。 为了让你更直观地理解，我们将从核心维度进行深度对比： 1. 核心差异对照表 2. 深度功能对比 (1) 确认机制 vs. 盲目发送 TCP：每发一个包，接收方都要回一个“收到”的信号（ACK）。如果没收到，发..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/TCP%E5%92%8CUDP%E5%AF%B9%E6%AF%94-1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.75,"words":825},"filePathRelative":"posts/计算机网络/网络的概念/传输层/TCP和UDP对比.md","excerpt":"<p>简单来说，<strong>TCP 就像是打长途电话</strong>，必须确认接通了、听清了才继续说；而 <strong>UDP 就像是在路边支个大喇叭喊话</strong>，喊出去就不管了，听不听得到全看缘分。</p>\\n<figure><img src=\\"/blog/assets/posts/TCP%E5%92%8CUDP%E5%AF%B9%E6%AF%94-1.png\\" alt tabindex=\\"0\\" loading=\\"lazy\\"><figcaption></figcaption></figure>\\n<p>为了让你更直观地理解，我们将从核心维度进行深度对比：</p>\\n<hr>\\n<h3>1. 核心差异对照表</h3>","autoDesc":true}`),i={name:`TCP和UDP对比.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>简单来说，<strong>TCP 就像是打长途电话</strong>，必须确认接通了、听清了才继续说；而 <strong>UDP 就像是在路边支个大喇叭喊话</strong>，喊出去就不管了，听不听得到全看缘分。</p>
<figure><img src="/blog/assets/posts/TCP%E5%92%8CUDP%E5%AF%B9%E6%AF%94-1.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>为了让你更直观地理解，我们将从核心维度进行深度对比：</p>
<hr>
<h3 id="_1-核心差异对照表" tabindex="-1"><a class="header-anchor" href="#_1-核心差异对照表"><span>1. 核心差异对照表</span></a></h3>
<table>
<thead>
<tr>
<th><strong>特性</strong></th>
<th><strong>TCP (传输控制协议)</strong></th>
<th><strong>UDP (用户数据报协议)</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>连接性</strong></td>
<td><strong>面向连接</strong>（需三次握手）</td>
<td><strong>无连接</strong>（直接发送）</td>
</tr>
<tr>
<td><strong>可靠性</strong></td>
<td><strong>可靠</strong>（保证不丢、不乱、不错）</td>
<td><strong>不可靠</strong>（可能丢包、乱序）</td>
</tr>
<tr>
<td><strong>传输方式</strong></td>
<td><strong>字节流</strong>（像自来水，无边界）</td>
<td><strong>数据报</strong>（像快递包裹，有边界）</td>
</tr>
<tr>
<td><strong>传输速度</strong></td>
<td>较慢（由于确认、重传等机制）</td>
<td>极快（几乎没有额外延迟）</td>
</tr>
<tr>
<td><strong>资源消耗</strong></td>
<td>较大（报头 20 字节，需维护状态）</td>
<td>较小（报头 8 字节，结构简单）</td>
</tr>
<tr>
<td><strong>通信目标</strong></td>
<td>一对一（点对点）</td>
<td>一对一、一对多、多对多</td>
</tr>
</tbody>
</table>
<hr>
<h3 id="_2-深度功能对比" tabindex="-1"><a class="header-anchor" href="#_2-深度功能对比"><span>2. 深度功能对比</span></a></h3>
<h4 id="_1-确认机制-vs-盲目发送" tabindex="-1"><a class="header-anchor" href="#_1-确认机制-vs-盲目发送"><span><strong>(1) 确认机制 vs. 盲目发送</strong></span></a></h4>
<ul>
<li><strong>TCP</strong>：每发一个包，接收方都要回一个“收到”的信号（ACK）。如果没收到，发送方会死磕到底，直到重传成功。</li>
<li><strong>UDP</strong>：只管把数据往网卡里塞，发完就清空缓存。至于数据在路上被路由器丢了，还是因为网络波动迟到了，UDP 概不负责。</li>
</ul>
<h4 id="_2-有序性-vs-随意性" tabindex="-1"><a class="header-anchor" href="#_2-有序性-vs-随意性"><span><strong>(2) 有序性 vs. 随意性</strong></span></a></h4>
<ul>
<li><strong>TCP</strong>：会给每个数据段打上序号。如果 2 号包比 1 号包先到，TCP 会让 2 号包在缓存里等着，排好队再交给应用层。</li>
<li><strong>UDP</strong>：谁先到谁先上。如果你在用 UDP 传图片，可能会看到图片的底脚先显示出来，头顶后显示。</li>
</ul>
<h4 id="_3-拥塞控制-文明人-vs-莽夫" tabindex="-1"><a class="header-anchor" href="#_3-拥塞控制-文明人-vs-莽夫"><span><strong>(3) 拥塞控制：文明人 vs. 莽夫</strong></span></a></h4>
<ul>
<li><strong>TCP</strong>：非常“文明”。如果发现网络堵塞，它会主动降低发送速度，避免网络崩溃。</li>
<li><strong>UDP</strong>：比较“莽”。不管网络塞成什么样，应用层给多少它就发多少，是网络拥塞的“加速器”。</li>
</ul>
<hr>
<h3 id="_3-应用场景-如何选择" tabindex="-1"><a class="header-anchor" href="#_3-应用场景-如何选择"><span>3. 应用场景：如何选择？</span></a></h3>
<h4 id="什么时候选-tcp-宁慢勿错" tabindex="-1"><a class="header-anchor" href="#什么时候选-tcp-宁慢勿错"><span><strong>什么时候选 TCP？（宁慢勿错）</strong></span></a></h4>
<ul>
<li><strong>网页浏览 (HTTP/HTTPS)</strong>：你肯定不希望打开网页时，文字是乱码或者少了半截。</li>
<li><strong>文件传输 (FTP)</strong>：下载安装包时，丢一个比特位都可能导致程序无法运行。</li>
<li><strong>邮件 (SMTP/POP3)</strong>：保证邮件内容的完整性。</li>
</ul>
<h4 id="什么时候选-udp-宁错勿慢" tabindex="-1"><a class="header-anchor" href="#什么时候选-udp-宁错勿慢"><span><strong>什么时候选 UDP？（宁错勿慢）</strong></span></a></h4>
<ul>
<li><strong>视频通话/直播</strong>：掉一两个像素点（花屏）没关系，但如果为了重传而卡顿 2 秒，天就没法聊了。</li>
<li><strong>在线游戏</strong>：FPS 游戏中，你更需要此时此刻对手的位置，而不是 3 秒前他消失在哪里的“补发数据”。</li>
<li><strong>DNS 查询</strong>：查个 IP 地址，速度越快越好，大不了没收到再查一次。</li>
</ul>
<hr>
<h3 id="_4-现代趋势-优缺点互补" tabindex="-1"><a class="header-anchor" href="#_4-现代趋势-优缺点互补"><span>4. 现代趋势：优缺点互补</span></a></h3>
<p>现在出现了一种新技术叫 <strong>QUIC（HTTP/3 的基础）</strong>。它很聪明地利用了 <strong>UDP 的快</strong>，然后在应用层自己实现了类似 <strong>TCP 的可靠性</strong>。</p>
<p><strong>比喻</strong>：TCP 是严谨的顺丰，UDP 是随性的平邮，而 QUIC 则是自己雇了保镖、装了北斗定位的极速快递。</p>
<hr>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};