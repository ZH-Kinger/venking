import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E4%BC%A0%E8%BE%93%E5%B1%82/TCP%E7%9A%84%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86/TCP%E5%9B%9B%E6%AC%A1%E6%8C%A5%E6%89%8B.html","title":"TCP四次挥手","lang":"zh-CN","frontmatter":{"title":"TCP四次挥手","icon":"network","date":"2026-07-23T00:00:00.000Z","category":["计算机网络"],"description":"既然三次握手是为了“确认眼神”建立连接，那么**四次挥手（Four-Way Wavehand）**就是为了“体面分手”。 TCP 是全双工的（即双方都能同时收发数据），这意味着即使一方发完了数据（主动关闭），另一方可能还有数据没发完。因此，每个方向的连接都需要单独关闭。 ​ 748605951-5e7b1e45d431b_fix732.webp7486...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"TCP四次挥手\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/TCP%E5%9B%9B%E6%AC%A1%E6%8C%A5%E6%89%8B-1.webp\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E4%BC%A0%E8%BE%93%E5%B1%82/TCP%E7%9A%84%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86/TCP%E5%9B%9B%E6%AC%A1%E6%8C%A5%E6%89%8B.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"TCP四次挥手"}],["meta",{"property":"og:description","content":"既然三次握手是为了“确认眼神”建立连接，那么**四次挥手（Four-Way Wavehand）**就是为了“体面分手”。 TCP 是全双工的（即双方都能同时收发数据），这意味着即使一方发完了数据（主动关闭），另一方可能还有数据没发完。因此，每个方向的连接都需要单独关闭。 ​ 748605951-5e7b1e45d431b_fix732.webp7486..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/TCP%E5%9B%9B%E6%AC%A1%E6%8C%A5%E6%89%8B-1.webp"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":4.37,"words":1312},"filePathRelative":"posts/计算机网络/网络的概念/传输层/TCP的工作原理/TCP四次挥手.md","excerpt":"<p>既然<strong>三次握手</strong>是为了“确认眼神”建立连接，那么**四次挥手（Four-Way Wavehand）**就是为了“体面分手”。</p>\\n<p>TCP 是<strong>全双工</strong>的（即双方都能同时收发数据），这意味着即使一方发完了数据（主动关闭），另一方可能还有数据没发完。因此，每个方向的连接都需要单独关闭。</p>\\n<p>​</p>\\n<figure><img src=\\"/blog/assets/posts/TCP%E5%9B%9B%E6%AC%A1%E6%8C%A5%E6%89%8B-1.webp\\" alt=\\"748605951-5e7b1e45d431b_fix732.webp\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>748605951-5e7b1e45d431b_fix732.webp</figcaption></figure>","autoDesc":true}`),i={name:`TCP四次挥手.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>既然<strong>三次握手</strong>是为了“确认眼神”建立连接，那么**四次挥手（Four-Way Wavehand）**就是为了“体面分手”。</p>
<p>TCP 是<strong>全双工</strong>的（即双方都能同时收发数据），这意味着即使一方发完了数据（主动关闭），另一方可能还有数据没发完。因此，每个方向的连接都需要单独关闭。</p>
<p>​</p>
<figure><img src="/blog/assets/posts/TCP%E5%9B%9B%E6%AC%A1%E6%8C%A5%E6%89%8B-1.webp" alt="748605951-5e7b1e45d431b_fix732.webp" tabindex="0" loading="lazy"><figcaption>748605951-5e7b1e45d431b_fix732.webp</figcaption></figure>
<hr>
<h3 id="_1-四次挥手的详细过程" tabindex="-1"><a class="header-anchor" href="#_1-四次挥手的详细过程"><span>1. 四次挥手的详细过程</span></a></h3>
<h4 id="第一步-主动方发起断开-fin" tabindex="-1"><a class="header-anchor" href="#第一步-主动方发起断开-fin"><span><strong>第一步：主动方发起断开 (FIN)</strong></span></a></h4>
<ul>
<li><strong>动作</strong>：客户端（假设是主动方）发送一个 <strong>FIN</strong>（Finish）报文。</li>
<li><strong>状态</strong>：客户端进入 <code v-pre>FIN-WAIT-1</code> 状态。</li>
<li><strong>含义</strong>：“我的数据发完了，我想关掉我的发送通道了。”</li>
</ul>
<h4 id="第二步-被动方确认收到-ack" tabindex="-1"><a class="header-anchor" href="#第二步-被动方确认收到-ack"><span><strong>第二步：被动方确认收到 (ACK)</strong></span></a></h4>
<ul>
<li><strong>动作</strong>：服务端收到后，立刻回复一个 <strong>ACK</strong>。</li>
<li><strong>状态</strong>：服务端进入 <code v-pre>CLOSE-WAIT</code>（等待关闭）状态；客户端收到后进入 <code v-pre>FIN-WAIT-2</code> 状态。</li>
<li><strong>含义</strong>：“收到你的申请了。但我这边可能还有点数据没发完，你等我一下。”</li>
</ul>
<p><strong>注意</strong>：此时连接处于“半关闭”状态。客户端不能再发数据，但仍可以接收服务端发来的剩余数据。</p>
<h4 id="第三步-被动方发完数据-请求断开-fin" tabindex="-1"><a class="header-anchor" href="#第三步-被动方发完数据-请求断开-fin"><span><strong>第三步：被动方发完数据，请求断开 (FIN)</strong></span></a></h4>
<ul>
<li><strong>动作</strong>：服务端处理完所有数据后，也发送一个 <strong>FIN</strong> 报文。</li>
<li><strong>状态</strong>：服务端进入 <code v-pre>LAST-ACK</code> 状态。</li>
<li><strong>含义</strong>：“好了，我的数据也发完了，我也可以关了。再见！”</li>
</ul>
<h4 id="第四步-主动方最后确认-ack" tabindex="-1"><a class="header-anchor" href="#第四步-主动方最后确认-ack"><span><strong>第四步：主动方最后确认 (ACK)</strong></span></a></h4>
<ul>
<li><strong>动作</strong>：客户端收到 FIN 后，发送最后一个 <strong>ACK</strong>。</li>
<li><strong>状态</strong>：客户端进入 <code v-pre>TIME-WAIT</code> 状态，经过 <strong>2MSL</strong>（最大报文生存时间）后彻底关闭；服务端收到 ACK 后立即进入 <code v-pre>CLOSED</code> 状态。</li>
<li><strong>含义</strong>：“好的，拜拜！我知道你也要关了。”</li>
</ul>
<hr>
<h3 id="_2-核心疑问-为什么挥手要-四次" tabindex="-1"><a class="header-anchor" href="#_2-核心疑问-为什么挥手要-四次"><span>2. 核心疑问：为什么挥手要“四次”？</span></a></h3>
<p><strong>握手只要三次，是因为第二步把确认（ACK）和同步（SYN）合并了。</strong></p>
<p>但在挥手时，当服务端收到客户端的 <code v-pre>FIN</code>，往往它还有数据在传，不能立刻关闭。所以它先回一个 <code v-pre>ACK</code> 表示收到了请求，等自己手头的工作彻底干完，才发 <code v-pre>FIN</code>。</p>
<p><strong>总结</strong>：因为被动方的 ACK 和 FIN 通常是<strong>分开发送</strong>的，所以比握手多了一次。</p>
<hr>
<h3 id="_3-关键机制-为什么要等待-2msl" tabindex="-1"><a class="header-anchor" href="#_3-关键机制-为什么要等待-2msl"><span>3. 关键机制：为什么要等待 2MSL？</span></a></h3>
<p>客户端发送完最后的 ACK 后，并不会立刻消失，而是要原地等待一段时间（通常是 2 分钟左右）。这是为了：</p>
<ol>
<li><strong>防止最后的 ACK 丢失</strong>：如果服务端没收到最后的 ACK，会重发第三步的 <code v-pre>FIN</code>。如果客户端直接关闭了，服务端就会收到一个 <code v-pre>RST</code> 报错，没法优雅关闭。</li>
<li><strong>清理“残存”报文</strong>：确保本次连接中所有在网络中乱窜的数据包都彻底消失，防止这些旧数据干扰下一个使用相同端口号的新连接。</li>
</ol>
<p>​</p>
<h3 id="_4-计时器" tabindex="-1"><a class="header-anchor" href="#_4-计时器"><span>4.计时器</span></a></h3>
<p>在 TCP 四次挥手（断开连接）的过程中，为了保证连接能够可靠地关闭并防止旧数据包干扰新连接，设计了几个关键的计时器。</p>
<p>最核心、最常被讨论的是 <strong>TIME_WAIT</strong> 状态下的 <strong>2MSL 计时器</strong>。</p>
<hr>
<h4 id="_1-2msl-计时器-time-wait-timer" tabindex="-1"><a class="header-anchor" href="#_1-2msl-计时器-time-wait-timer"><span>1. 2MSL 计时器 (TIME_WAIT Timer)</span></a></h4>
<p>这是四次挥手中最重要的计时器。当<strong>主动关闭方</strong>发送完最后一个 ACK 后，会进入 <code v-pre>TIME_WAIT</code> 状态，并启动该计时器。</p>
<ul>
<li><strong>时长</strong>：通常为 <strong>2倍的 MSL</strong> (Maximum Segment Life，报文最大生存时间)。在 Linux 中通常硬编码为 <strong>60秒</strong>（30s + 30s）。</li>
<li><strong>为什么要等 2MSL？</strong></li>
</ul>
<ol>
<li><strong>确认最后一个 ACK 到达</strong>：如果被动方没收到最后的 ACK，会重发 <code v-pre>FIN</code>。主动方在 2MSL 内如果又收到 <code v-pre>FIN</code>，说明 ACK 丢了，需要重发。</li>
<li><strong>让旧报文消失</strong>：防止失效的报文在网络中转了一圈后，出现在后续使用相同 IP 和端口的新连接中，造成数据混乱。</li>
</ol>
<hr>
<h4 id="_2-fin-wait-2-计时器" tabindex="-1"><a class="header-anchor" href="#_2-fin-wait-2-计时器"><span>2. FIN_WAIT_2 计时器</span></a></h4>
<p>当主动方收到对方的 <code v-pre>ACK</code> 进入 <code v-pre>FIN_WAIT_2</code> 状态后，它在等待对方发送 <code v-pre>FIN</code>（即对方也想关闭）。</p>
<ul>
<li><strong>目的</strong>：防止对方一直不发 <code v-pre>FIN</code>，导致主动方永远卡在 <code v-pre>FIN_WAIT_2</code> 状态（半关闭状态）。</li>
<li><strong>超时处理</strong>：如果超过系统设定的时间（Linux 默认为 60s），内核会直接关闭该连接。</li>
<li><strong>配置</strong>：可通过 <code v-pre>/proc/sys/net/ipv4/tcp_fin_timeout</code> 修改。</li>
</ul>
<hr>
<h4 id="_3-重传计时器-retransmission-timer" tabindex="-1"><a class="header-anchor" href="#_3-重传计时器-retransmission-timer"><span>3. 重传计时器 (Retransmission Timer)</span></a></h4>
<p>在挥手的每一步，发送方（无论是发 <code v-pre>FIN</code> 还是发 <code v-pre>ACK</code>）都会启动重传计时器。</p>
<ul>
<li><strong>场景</strong>：如果主动方发出 <code v-pre>FIN</code> 后，在 RTO（Retransmission TimeOut）时间内没收到 <code v-pre>ACK</code>，就会重新发送 <code v-pre>FIN</code>。</li>
<li><strong>策略</strong>：通常采用指数退避算法（等待时间翻倍），直到重试次数达到上限。</li>
</ul>
<hr>
<h4 id="对比表" tabindex="-1"><a class="header-anchor" href="#对比表"><span>对比表</span></a></h4>
<table>
<thead>
<tr>
<th><strong>计时器名称</strong></th>
<th><strong>所在状态</strong></th>
<th><strong>角色</strong></th>
<th><strong>核心目的</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>2MSL 计时器</strong></td>
<td><code v-pre>TIME_WAIT</code></td>
<td>主动关闭方</td>
<td>确保 ACK 到达 + 清除网络残余报文。</td>
</tr>
<tr>
<td><strong>FIN_WAIT_2 计时器</strong></td>
<td><code v-pre>FIN_WAIT_2</code></td>
<td>主动关闭方</td>
<td>防止对方“赖着不走”导致连接无法释放。</td>
</tr>
<tr>
<td><strong>重传计时器</strong></td>
<td>任意发送阶段</td>
<td>双方</td>
<td>确保 <code v-pre>FIN</code>&lt;br&gt;或 <code v-pre>ACK</code>&lt;br&gt;报文丢失后能重新发送。</td>
</tr>
</tbody>
</table>
<hr>
<hr>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};