import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E4%BC%A0%E8%BE%93%E5%B1%82/%E6%B5%81%E9%87%8F%E6%8E%A7%E5%88%B6%E3%80%81%E6%8B%A5%E5%A1%9E%E6%8E%A7%E5%88%B6%E3%80%81%E8%AE%A1%E6%97%B6%E5%99%A8.html","title":"流量控制、拥塞控制、计时器","lang":"zh-CN","frontmatter":{"title":"流量控制、拥塞控制、计时器","icon":"network","date":"2026-07-23T00:00:00.000Z","category":["计算机网络"],"description":"1. 流量控制 (Flow Control) 目的： 防止发送方发得太快，导致接收方的缓存溢出（别让接收者“噎死”）。 机制： 使用滑动窗口 (Sliding Window) 协议。 实现： 接收方在确认报文（ACK）中会携带一个 rwnd (Receiver Window) 字段，告诉发送方：“我现在的缓存还能收多少字节”。 状态： * 如果 rwn...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"流量控制、拥塞控制、计时器\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E4%BC%A0%E8%BE%93%E5%B1%82/%E6%B5%81%E9%87%8F%E6%8E%A7%E5%88%B6%E3%80%81%E6%8B%A5%E5%A1%9E%E6%8E%A7%E5%88%B6%E3%80%81%E8%AE%A1%E6%97%B6%E5%99%A8.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"流量控制、拥塞控制、计时器"}],["meta",{"property":"og:description","content":"1. 流量控制 (Flow Control) 目的： 防止发送方发得太快，导致接收方的缓存溢出（别让接收者“噎死”）。 机制： 使用滑动窗口 (Sliding Window) 协议。 实现： 接收方在确认报文（ACK）中会携带一个 rwnd (Receiver Window) 字段，告诉发送方：“我现在的缓存还能收多少字节”。 状态： * 如果 rwn..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.56,"words":768},"filePathRelative":"posts/计算机网络/网络的概念/传输层/流量控制、拥塞控制、计时器.md","excerpt":"<h2>1. 流量控制 (Flow Control)</h2>\\n<p><strong>目的：</strong> 防止发送方发得太快，导致接收方的缓存溢出（别让接收者“噎死”）。</p>\\n<ul>\\n<li>\\n<p><strong>机制：</strong> 使用<strong>滑动窗口 (Sliding Window)</strong> 协议。</p>\\n</li>\\n<li>\\n<p><strong>实现：</strong> 接收方在确认报文（ACK）中会携带一个 <code>rwnd</code> (Receiver Window) 字段，告诉发送方：“我现在的缓存还能收多少字节”。</p>\\n</li>\\n<li>\\n<p><strong>状态：</strong> * 如果 <code>rwnd = 0</code>，发送方必须停止发送，直到收到新的窗口更新。</p>\\n</li>\\n<li>\\n<p><strong>持续计时器</strong>（见下文）会介入，防止窗口更新包丢失导致的死锁。</p>\\n</li>\\n</ul>","autoDesc":true}`),i={name:`流量控制、拥塞控制、计时器.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><h2 id="_1-流量控制-flow-control" tabindex="-1"><a class="header-anchor" href="#_1-流量控制-flow-control"><span>1. 流量控制 (Flow Control)</span></a></h2>
<p><strong>目的：</strong> 防止发送方发得太快，导致接收方的缓存溢出（别让接收者“噎死”）。</p>
<ul>
<li>
<p><strong>机制：</strong> 使用<strong>滑动窗口 (Sliding Window)</strong> 协议。</p>
</li>
<li>
<p><strong>实现：</strong> 接收方在确认报文（ACK）中会携带一个 <code v-pre>rwnd</code> (Receiver Window) 字段，告诉发送方：“我现在的缓存还能收多少字节”。</p>
</li>
<li>
<p><strong>状态：</strong> * 如果 <code v-pre>rwnd = 0</code>，发送方必须停止发送，直到收到新的窗口更新。</p>
</li>
<li>
<p><strong>持续计时器</strong>（见下文）会介入，防止窗口更新包丢失导致的死锁。</p>
</li>
</ul>
<hr>
<h2 id="_2-拥塞控制-congestion-control" tabindex="-1"><a class="header-anchor" href="#_2-拥塞控制-congestion-control"><span>2. 拥塞控制 (Congestion Control)</span></a></h2>
<p><strong>目的：</strong> 防止过多的数据注入到网络中，导致路由器或链路过载（别让网络“堵死”）。</p>
<p>TCP 主要通过四个算法来动态调整<strong>拥塞窗口 (</strong><code v-pre>**cwnd**</code><strong>)</strong>：</p>
<table>
<thead>
<tr>
<th><strong>阶段</strong></th>
<th><strong>动作</strong></th>
<th><strong>触发条件</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>慢启动 (Slow Start)</strong></td>
<td><code v-pre>cwnd</code>&lt;br&gt;从 1 开始，每收到一个 ACK，窗口翻倍（指数增长）。</td>
<td>建立连接初期。</td>
</tr>
<tr>
<td><strong>拥塞避免 (Congestion Avoidance)</strong></td>
<td>当 <code v-pre>cwnd</code>&lt;br&gt;达到阈值 (<code v-pre>ssthresh</code>&lt;br&gt;) 后，变为线性增长（每轮 +1）。</td>
<td><code v-pre>cwnd &gt;= ssthresh</code>&lt;br&gt;。</td>
</tr>
<tr>
<td><strong>快重传 (Fast Retransmit)</strong></td>
<td>发送方连续收到 <strong>3 个冗余 ACK</strong>，立即重传丢失包，不等待超时。</td>
<td>丢包但网络未完全瘫痪。</td>
</tr>
<tr>
<td><strong>快恢复 (Fast Recovery)</strong></td>
<td>将 <code v-pre>ssthresh</code>&lt;br&gt;减半，<code v-pre>cwnd</code>&lt;br&gt;设为减半后的值，直接进入拥塞避免。</td>
<td>配合快重传使用。</td>
</tr>
</tbody>
</table>
<p><strong>注意：</strong> 如果发生了<strong>超时 (Timeout)</strong>，TCP 会表现得很悲观：将 <code v-pre>ssthresh</code> 设为当前窗口的一半，并将 <code v-pre>cwnd</code> 直接重置为 <strong>1</strong>，重新开始慢启动。</p>
<hr>
<h2 id="_3-tcp-的四大计时器" tabindex="-1"><a class="header-anchor" href="#_3-tcp-的四大计时器"><span>3. TCP 的四大计时器</span></a></h2>
<p>为了处理网络中的不确定性，TCP 手里握着好几块“表”：</p>
<h3 id="_1-重传计时器-retransmission-timer" tabindex="-1"><a class="header-anchor" href="#_1-重传计时器-retransmission-timer"><span>① 重传计时器 (Retransmission Timer)</span></a></h3>
<ul>
<li><strong>作用：</strong> 解决丢包问题。</li>
<li><strong>原理：</strong> 当发送一个报文时，启动计时。如果在 <strong>RTO (超时重传时间)</strong> 内没收到确认，就重发。</li>
<li><strong>细节：</strong> RTO 是根据网络往返时间 (RTT) 动态计算的。</li>
</ul>
<h3 id="_2-坚持计时器-persistence-timer" tabindex="-1"><a class="header-anchor" href="#_2-坚持计时器-persistence-timer"><span>② 坚持计时器 (Persistence Timer)</span></a></h3>
<ul>
<li><strong>作用：</strong> 解决“零窗口”死锁。</li>
<li><strong>原理：</strong> 如果接收方告诉发送方 <code v-pre>rwnd=0</code>，后来接收方缓存空了并发送了窗口更新，但这个更新包丢了。发送方会一直等，接收方也会一直等。</li>
<li><strong>方案：</strong> 坚持计时器到期后，发送方发一个很小的“探测报文”，强迫接收方回传当前的窗口状态。</li>
</ul>
<h3 id="_3-保活计时器-keepalive-timer" tabindex="-1"><a class="header-anchor" href="#_3-保活计时器-keepalive-timer"><span>③ 保活计时器 (Keepalive Timer)</span></a></h3>
<ul>
<li><strong>作用：</strong> 检测“死连接”。</li>
<li><strong>场景：</strong> 如果客户端突然断电（未正常关闭连接），服务器不能永远等下去。通常设为 2 小时，若无活动则发送探测报文，没响应就关闭连接。</li>
</ul>
<h3 id="_4-时间等待计时器-time-wait-timer" tabindex="-1"><a class="header-anchor" href="#_4-时间等待计时器-time-wait-timer"><span>④ 时间等待计时器 (Time-Wait Timer)</span></a></h3>
<ul>
<li><strong>作用：</strong> 确保连接正常关闭。</li>
<li><strong>场景：</strong> 发生在主动关闭连接的一方（通常是客户端）进入 <code v-pre>TIME_WAIT</code> 状态时。</li>
<li><strong>时长：****2MSL</strong> (Maximum Segment Lifetime)。</li>
<li><strong>理由：</strong> 确保最后一个 ACK 到达对方；并让本次连接产生的所有报文都在网络中消失，防止影响下一个新连接。</li>
</ul>
<hr>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};