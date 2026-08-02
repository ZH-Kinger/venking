import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E4%BC%A0%E8%BE%93%E5%B1%82/TCP%E7%9A%84%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86/TCP%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B.html","title":"TCP三次握手","lang":"zh-CN","frontmatter":{"title":"TCP三次握手","icon":"network","date":"2026-07-23T00:00:00.000Z","category":["计算机网络"],"description":"TCP 的三次握手（Three-way Handshake）是建立可靠连接的关键过程。它的核心目的不仅是确认对方“在不在”，更重要的是同步双方的序列号（ISN）并确认双方的收发能力均正常。 我们可以把这个过程类比为两个人通过对讲机通话前的测试。 3507527407-5e7b1e199cbbb_fix732.webp3507527407-5e7b1e1...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"TCP三次握手\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/TCP%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B-1.webp\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E4%BC%A0%E8%BE%93%E5%B1%82/TCP%E7%9A%84%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86/TCP%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"TCP三次握手"}],["meta",{"property":"og:description","content":"TCP 的三次握手（Three-way Handshake）是建立可靠连接的关键过程。它的核心目的不仅是确认对方“在不在”，更重要的是同步双方的序列号（ISN）并确认双方的收发能力均正常。 我们可以把这个过程类比为两个人通过对讲机通话前的测试。 3507527407-5e7b1e199cbbb_fix732.webp3507527407-5e7b1e1..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/TCP%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B-1.webp"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.02,"words":906},"filePathRelative":"posts/计算机网络/网络的概念/传输层/TCP的工作原理/TCP三次握手.md","excerpt":"<p>TCP 的<strong>三次握手（Three-way Handshake）是建立可靠连接的关键过程。它的核心目的不仅是确认对方“在不在”，更重要的是同步双方的序列号（ISN）并确认双方的收发能力</strong>均正常。</p>\\n<p>我们可以把这个过程类比为两个人通过对讲机通话前的测试。</p>\\n<figure><img src=\\"/blog/assets/posts/TCP%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B-1.webp\\" alt=\\"3507527407-5e7b1e199cbbb_fix732.webp\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>3507527407-5e7b1e199cbbb_fix732.webp</figcaption></figure>","autoDesc":true}`),i={name:`TCP三次握手.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>TCP 的<strong>三次握手（Three-way Handshake）是建立可靠连接的关键过程。它的核心目的不仅是确认对方“在不在”，更重要的是同步双方的序列号（ISN）并确认双方的收发能力</strong>均正常。</p>
<p>我们可以把这个过程类比为两个人通过对讲机通话前的测试。</p>
<figure><img src="/blog/assets/posts/TCP%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B-1.webp" alt="3507527407-5e7b1e199cbbb_fix732.webp" tabindex="0" loading="lazy"><figcaption>3507527407-5e7b1e199cbbb_fix732.webp</figcaption></figure>
<hr>
<h3 id="_1-三次握手的详细过程" tabindex="-1"><a class="header-anchor" href="#_1-三次握手的详细过程"><span>1. 三次握手的详细过程</span></a></h3>
<h4 id="第一步-客户端发送请求-syn" tabindex="-1"><a class="header-anchor" href="#第一步-客户端发送请求-syn"><span><strong>第一步：客户端发送请求 (SYN)</strong></span></a></h4>
<ul>
<li><strong>动作</strong>：客户端（Client）向服务端（Server）发送一个 <strong>SYN</strong>（Synchronize）报文段。</li>
<li><strong>关键参数</strong>：设置标志位 <code v-pre>SYN=1</code>，并随机生成一个初始序列号 <code v-pre>seq=x</code>。</li>
<li><strong>状态</strong>：客户端进入 <code v-pre>SYN-SENT</code>（同步已发送）状态。</li>
<li><strong>含义</strong>：“你好，我想和你建立连接，这是我的初始序列号 x。”</li>
</ul>
<h4 id="第二步-服务端确认并回放-syn-ack" tabindex="-1"><a class="header-anchor" href="#第二步-服务端确认并回放-syn-ack"><span><strong>第二步：服务端确认并回放 (SYN + ACK)</strong></span></a></h4>
<ul>
<li><strong>动作</strong>：服务端收到后，如果同意连接，则回复一个 <strong>SYN+ACK</strong> 报文段。</li>
<li><strong>关键参数</strong>：设置 <code v-pre>SYN=1</code>，<code v-pre>ACK=1</code>。同时生成自己的序列号 <code v-pre>seq=y</code>，并将确认号设置为 <code v-pre>ack=x+1</code>（表示收到了客户端的 x）。</li>
<li><strong>状态</strong>：服务端进入 <code v-pre>SYN-RCVD</code>（同步已收到）状态。</li>
<li><strong>含义</strong>：“收到！我同意连接。这是我的序列号 y，我也确认收到了你的 x。你能听到我说话吗？”</li>
</ul>
<h4 id="第三步-客户端最终确认-ack" tabindex="-1"><a class="header-anchor" href="#第三步-客户端最终确认-ack"><span><strong>第三步：客户端最终确认 (ACK)</strong></span></a></h4>
<ul>
<li><strong>动作</strong>：客户端收到服务端的回复后，再发送一个 <strong>ACK</strong> 报文段。</li>
<li><strong>关键参数</strong>：设置 <code v-pre>ACK=1</code>，确认号 <code v-pre>ack=y+1</code>，自己的序列号变为 <code v-pre>seq=x+1</code>。</li>
<li><strong>状态</strong>：客户端发送后立即进入 <code v-pre>ESTABLISHED</code>（已建立连接）状态，服务端收到后也进入该状态。</li>
<li><strong>含义</strong>：“听到了！我也确认收到了你的 y。现在我们可以开始传数据了！”</li>
</ul>
<hr>
<h3 id="_2-为什么要-三次-两次不行吗" tabindex="-1"><a class="header-anchor" href="#_2-为什么要-三次-两次不行吗"><span>2. 为什么要“三次”？两次不行吗？</span></a></h3>
<p>这是面试中最经典的问题。答案主要有两点：</p>
<ol>
<li><strong>确认双向收发能力</strong>：</li>
</ol>
<ul>
<li><strong>第一次</strong>：服务端确认了“客户端发能力正常”和“自己收能力正常”。</li>
<li><strong>第二次</strong>：客户端确认了“服务端收、发能力正常”和“自己收、发能力正常”。</li>
<li><strong>第三次</strong>：服务端通过客户端的回应，最终确认了“客户端收能力正常”。</li>
</ul>
<p>如果只有两次，服务端无法确定客户端是否收到了自己的回馈，此时建立连接是单向且不可靠的。</p>
<ol start="2">
<li><strong>防止旧的连接请求突然到达（致命原因）</strong>：</li>
</ol>
<p>假设客户端发出的第一个 SYN 包在网络中“迷路”了（延迟）。客户端等不及了又发了第二个 SYN 并完成了通信。等通信结束后，那个迷路的第一个 SYN 突然传到了服务端。</p>
<ul>
<li><strong>如果是两次握手</strong>：服务端会直接建立连接并干等，造成资源浪费。</li>
<li><strong>如果是三次握手</strong>：服务端回发 SYN+ACK，但客户端知道这是一个过时的请求，于是拒绝回应（发送 RST），连接就不会建立。</li>
</ul>
<hr>
<h3 id="_3-三次握手期间的常见攻击-syn-flood" tabindex="-1"><a class="header-anchor" href="#_3-三次握手期间的常见攻击-syn-flood"><span>3. 三次握手期间的常见攻击：SYN Flood</span></a></h3>
<p>攻击者伪造大量的 IP 地址向服务器发送 <code v-pre>SYN</code> 包，但从不进行第三次 <code v-pre>ACK</code> 确认。这会导致服务器的半连接队列（SYN Queue）被占满，导致正常用户无法连接。</p>
<p><strong>应对方案</strong>：通常使用 <strong>SYN Cookie</strong> 技术，在不分配资源的情况下回发包，只有等到合法的第三次 ACK 到达时才真正分配内存。</p>
<hr>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};