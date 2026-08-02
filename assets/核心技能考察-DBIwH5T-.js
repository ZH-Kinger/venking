import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E9%9D%A2%E8%AF%95/%E6%A0%B8%E5%BF%83%E6%8A%80%E8%83%BD%E8%80%83%E5%AF%9F.html","title":"核心技能考察","lang":"zh-CN","frontmatter":{"title":"核心技能考察","icon":"clipboard-text","date":"2026-07-23T00:00:00.000Z","category":["面试"],"description":"计算机网络 TCP/IP 协议栈（TCP 三次握手 / 四次挥手、滑动窗口、拥塞控制）、HTTP/HTTPS/HTTP2/HTTP3、DNS 解析、CDN 原理、负载均衡（四层 / 七层区别）； ​ TCP https://www.yuque.com/kinger-wwnro/tfdven/nxmygfgezb8w47ha ​ 滑动窗口的核心作用（TC...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"核心技能考察\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E9%9D%A2%E8%AF%95/%E6%A0%B8%E5%BF%83%E6%8A%80%E8%83%BD%E8%80%83%E5%AF%9F.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"核心技能考察"}],["meta",{"property":"og:description","content":"计算机网络 TCP/IP 协议栈（TCP 三次握手 / 四次挥手、滑动窗口、拥塞控制）、HTTP/HTTPS/HTTP2/HTTP3、DNS 解析、CDN 原理、负载均衡（四层 / 七层区别）； ​ TCP https://www.yuque.com/kinger-wwnro/tfdven/nxmygfgezb8w47ha ​ 滑动窗口的核心作用（TC..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.01,"words":904},"filePathRelative":"posts/面试/字节面试/核心技能考察.md","excerpt":"<h2>计算机网络</h2>\\n<p>TCP/IP 协议栈（TCP 三次握手 / 四次挥手、滑动窗口、拥塞控制）、HTTP/HTTPS/HTTP2/HTTP3、DNS 解析、CDN 原理、负载均衡（四层 / 七层区别）；</p>\\n<p>​</p>\\n<h3>TCP</h3>\\n<p><a href=\\"https://www.yuque.com/kinger-wwnro/tfdven/nxmygfgezb8w47ha\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://www.yuque.com/kinger-wwnro/tfdven/nxmygfgezb8w47ha</a></p>","autoDesc":true}`),i={name:`核心技能考察.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><h2 id="计算机网络" tabindex="-1"><a class="header-anchor" href="#计算机网络"><span>计算机网络</span></a></h2>
<p>TCP/IP 协议栈（TCP 三次握手 / 四次挥手、滑动窗口、拥塞控制）、HTTP/HTTPS/HTTP2/HTTP3、DNS 解析、CDN 原理、负载均衡（四层 / 七层区别）；</p>
<p>​</p>
<h3 id="tcp" tabindex="-1"><a class="header-anchor" href="#tcp"><span>TCP</span></a></h3>
<p><a href="https://www.yuque.com/kinger-wwnro/tfdven/nxmygfgezb8w47ha" target="_blank" rel="noopener noreferrer">https://www.yuque.com/kinger-wwnro/tfdven/nxmygfgezb8w47ha</a></p>
<p>​</p>
<h3 id="滑动窗口的核心作用-tcp-三大核心能力-贴合高并发场景" tabindex="-1"><a class="header-anchor" href="#滑动窗口的核心作用-tcp-三大核心能力-贴合高并发场景"><span>滑动窗口的核心作用（TCP 三大核心能力，贴合高并发场景）</span></a></h3>
<p>你的项目中涉及高并发 TCP 连接调优、LVS 四层流量调度，必须明确窗口对高并发的关键价值：</p>
<ol>
<li><strong>可靠传输</strong>：通过窗口实现<strong>累计确认</strong>，接收方只需对收到的最后一个有序字节确认，发送方就知道该字节之前的所有数据都已送达，减少 ACK 报文数量，降低网络开销；</li>
<li><strong>流量控制</strong>：接收方根据自身<strong>接收缓存（RcvBuffer）</strong> 大小，动态告知发送方<strong>接收窗口（rwnd）</strong> 大小，防止发送方发得太快，导致接收方缓存溢出、数据丢失（解决 “发送方速率&gt; 接收方处理速率” 问题）；</li>
<li><strong>拥塞控制</strong>：发送方根据<strong>网络拥塞状态</strong>，维护<strong>拥塞窗口（cwnd）</strong> 大小，网络通畅时扩大窗口、提升发送速率，网络拥塞（丢包）时缩小窗口、降低速率（解决 “发送速率&gt; 网络承载速率” 问题）；<strong>实际发送窗口</strong>：TCP 真实的单次发送最大字节数 = <strong>min (接收窗口 rwnd, 拥塞窗口 cwnd)</strong>，取两者最小值，兼顾接收方和网络状态。</li>
</ol>
<p>​</p>
<h3 id="http-的演进-从-1-0-到-3-0" tabindex="-1"><a class="header-anchor" href="#http-的演进-从-1-0-到-3-0"><span>HTTP 的演进：从 1.0 到 3.0</span></a></h3>
<table>
<thead>
<tr>
<th><strong>版本</strong></th>
<th><strong>传输层</strong></th>
<th><strong>核心改进</strong></th>
<th><strong>痛点解决</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>HTTP/1.1</strong></td>
<td>TCP</td>
<td>持久连接 (Keep-Alive)、管道化请求</td>
<td>减少了握手开销。</td>
</tr>
<tr>
<td><strong>HTTP/2</strong></td>
<td>TCP</td>
<td><strong>多路复用</strong> (二进制分帧)、头部压缩 (HPACK)、服务端推送</td>
<td>解决了 1.1 的“队头阻塞” (HoL Blocking) 问题。</td>
</tr>
<tr>
<td><strong>HTTP/3</strong></td>
<td><strong>UDP (QUIC)</strong></td>
<td>基于 UDP 重新实现可靠传输，连接迁移</td>
<td>解决了 TCP 层面的队头阻塞，握手更快（0-RTT）。</td>
</tr>
</tbody>
</table>
<hr>
<h3 id="dns-解析与-cdn-加速" tabindex="-1"><a class="header-anchor" href="#dns-解析与-cdn-加速"><span>DNS 解析与 CDN 加速</span></a></h3>
<ul>
<li><strong>DNS 解析过程</strong>：主机 -&gt; 本地 DNS -&gt; 根域名服务器 -&gt; 顶级域名服务器 -&gt; 权威 DNS -&gt; 返回 IP。</li>
<li><strong>CDN (内容分发网络) 原理</strong>：</li>
</ul>
<ol>
<li>用户发起 DNS 请求，DNS 将解析权交给 CDN 的 <strong>GSLB (全局负载均衡)</strong>。</li>
<li>GSLB 根据用户的 <strong>IP 地址（地理位置）</strong> 和各节点的 <strong>负载情况</strong>，返回离用户最近、最健康的边缘节点 IP。</li>
<li>用户直接向边缘节点请求数据，命中缓存则直接返回，否则由边缘节点回源抓取。</li>
</ol>
<hr>
<h3 id="负载均衡-四层-vs-七层" tabindex="-1"><a class="header-anchor" href="#负载均衡-四层-vs-七层"><span>负载均衡：四层 vs 七层</span></a></h3>
<p>这是你项目中的核心考点，请务必区分清楚：</p>
<ul>
<li>
<p><strong>四层负载均衡 (LVS)</strong>：</p>
</li>
<li>
<p><strong>协议层</strong>：传输层（TCP/UDP）。</p>
</li>
<li>
<p><strong>原理</strong>：根据 <strong>IP + 端口</strong> 进行转发。不拆包，只改写报文首部（IP/MAC），效率极高。</p>
</li>
<li>
<p><strong>场景</strong>：作为整个集群的总入口，处理极高并发。</p>
</li>
<li>
<p><strong>七层负载均衡 (Nginx/HAProxy)</strong>：</p>
</li>
<li>
<p><strong>协议层</strong>：应用层（HTTP/HTTPS/SSL）。</p>
</li>
<li>
<p><strong>原理</strong>：解析报文内容。可以根据 <strong>URL、Cookie、Header</strong> 信息做复杂的路由转发。</p>
</li>
<li>
<p><strong>场景</strong>：动静分离、灰度发布、WAF 防护。</p>
</li>
</ul>
<p>​</p>
<h2 id="linux-系统" tabindex="-1"><a class="header-anchor" href="#linux-系统"><span>Linux 系统</span></a></h2>
<p>进程管理（进程调度 / 守护进程 / 僵尸进程处理）、内存管理（虚拟内存 / 页缓存 / 交换分区）、文件系统（ext4/xfs）、网络配置（iproute2 / 网卡绑定）、系统启动流程；</p>
<p><strong>​</strong></p>
<h2 id="数据结构-算法" tabindex="-1"><a class="header-anchor" href="#数据结构-算法"><span>数据结构 &amp; 算法</span></a></h2>
<p>运维开发对算法要求低于纯开发，但<strong>链表、数组、哈希表、排序（快速 / 归并）、查找（二分）</strong> 是必掌握的，还要会用 Python 实现简单算法，字节会有<strong>手撕代码题</strong>（初面 / 复面都会考）。</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};