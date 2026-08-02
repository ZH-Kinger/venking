import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E4%BC%A0%E8%BE%93%E5%B1%82/TCP%E7%9A%84%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86/TCP%E7%9A%84%E5%B0%81%E8%A3%85%E6%A0%BC%E5%BC%8F.html","title":"TCP的封装格式","lang":"zh-CN","frontmatter":{"title":"TCP的封装格式","icon":"network","date":"2026-07-23T00:00:00.000Z","category":["计算机网络"],"description":"TCP 的封装格式（也称为 TCP 报文首部）是确保可靠传输的“指挥中心”。在没有选项的情况下，TCP 首部固定为 20 字节。 我们可以把 TCP 报文想象成一个极其严密的快递面单，上面不仅写了地址，还写了包裹的序号、确认号以及各种控制指令。 TCP 报文格式图解 核心字段详解 1. 端口号（各 16 位） 源端口 (Source Port)：发送进...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"TCP的封装格式\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/TCP%E7%9A%84%E5%B0%81%E8%A3%85%E6%A0%BC%E5%BC%8F-1.png\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E4%BC%A0%E8%BE%93%E5%B1%82/TCP%E7%9A%84%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86/TCP%E7%9A%84%E5%B0%81%E8%A3%85%E6%A0%BC%E5%BC%8F.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"TCP的封装格式"}],["meta",{"property":"og:description","content":"TCP 的封装格式（也称为 TCP 报文首部）是确保可靠传输的“指挥中心”。在没有选项的情况下，TCP 首部固定为 20 字节。 我们可以把 TCP 报文想象成一个极其严密的快递面单，上面不仅写了地址，还写了包裹的序号、确认号以及各种控制指令。 TCP 报文格式图解 核心字段详解 1. 端口号（各 16 位） 源端口 (Source Port)：发送进..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/TCP%E7%9A%84%E5%B0%81%E8%A3%85%E6%A0%BC%E5%BC%8F-1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.64,"words":792},"filePathRelative":"posts/计算机网络/网络的概念/传输层/TCP的工作原理/TCP的封装格式.md","excerpt":"<figure><img src=\\"/blog/assets/posts/TCP%E7%9A%84%E5%B0%81%E8%A3%85%E6%A0%BC%E5%BC%8F-1.png\\" alt tabindex=\\"0\\" loading=\\"lazy\\"><figcaption></figcaption></figure>\\n<p>TCP 的封装格式（也称为 TCP 报文首部）是确保可靠传输的“指挥中心”。在没有选项的情况下，TCP 首部固定为 <strong>20 字节</strong>。</p>\\n<p>我们可以把 TCP 报文想象成一个极其严密的快递面单，上面不仅写了地址，还写了包裹的序号、确认号以及各种控制指令。</p>","autoDesc":true}`),i={name:`TCP的封装格式.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><figure><img src="/blog/assets/posts/TCP%E7%9A%84%E5%B0%81%E8%A3%85%E6%A0%BC%E5%BC%8F-1.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>TCP 的封装格式（也称为 TCP 报文首部）是确保可靠传输的“指挥中心”。在没有选项的情况下，TCP 首部固定为 <strong>20 字节</strong>。</p>
<p>我们可以把 TCP 报文想象成一个极其严密的快递面单，上面不仅写了地址，还写了包裹的序号、确认号以及各种控制指令。</p>
<hr>
<h3 id="tcp-报文格式图解" tabindex="-1"><a class="header-anchor" href="#tcp-报文格式图解"><span>TCP 报文格式图解</span></a></h3>
<hr>
<h3 id="核心字段详解" tabindex="-1"><a class="header-anchor" href="#核心字段详解"><span>核心字段详解</span></a></h3>
<h4 id="_1-端口号-各-16-位" tabindex="-1"><a class="header-anchor" href="#_1-端口号-各-16-位"><span>1. 端口号（各 16 位）</span></a></h4>
<ul>
<li><strong>源端口 (Source Port)</strong>：发送进程的端口。</li>
<li><strong>目的端口 (Destination Port)</strong>：接收进程的端口。</li>
</ul>
<p>TCP 通过“IP地址 + 端口号”的组合（即套接字 Socket）来确定唯一的通信链路。</p>
<h4 id="_2-序列号与确认号-各-32-位-——-可靠性的基石" tabindex="-1"><a class="header-anchor" href="#_2-序列号与确认号-各-32-位-——-可靠性的基石"><span>2. 序列号与确认号（各 32 位）—— 可靠性的基石</span></a></h4>
<ul>
<li><strong>序列号 (Sequence Number)</strong>：本报文段发送的数据组中第一个字节的编号。它保证了数据的<strong>有序性</strong>。</li>
<li><strong>确认号 (Acknowledgment Number)</strong>：期望收到对方下一个报文段的第一个数据字节的编号。比如确认号是 N，代表“前 N-1个字节我已收到，请发第 N个”。</li>
</ul>
<h4 id="_3-数据偏移-4-位" tabindex="-1"><a class="header-anchor" href="#_3-数据偏移-4-位"><span>3. 数据偏移（4 位）</span></a></h4>
<ul>
<li>指出 TCP 报文首部长度。因为“选项”字段长度不固定，所以需要这个字段告诉接收方数据从哪里开始。</li>
</ul>
<h4 id="_4-控制标志位-flags-6-位" tabindex="-1"><a class="header-anchor" href="#_4-控制标志位-flags-6-位"><span>4. 控制标志位 (Flags, 6 位)</span></a></h4>
<p>这是 TCP 的“指挥旗语”，最关键的几个包括：</p>
<ul>
<li><strong>ACK</strong>：确认标志。有效时，确认号字段才生效。（ackonwledge）</li>
<li><strong>SYN</strong>：同步标志。用于建立连接（三次握手）。（synchronous）</li>
<li><strong>FIN</strong>：结束标志。用于释放连接（四次挥手）。（finish）</li>
<li><strong>RST</strong>：复位标志。强制断开异常连接。（reset）</li>
<li><strong>PSH</strong>：推送标志。要求接收方尽快将数据交给应用层，而不是在缓冲区排队。（push）</li>
<li><strong>URG：</strong> 当 URG 标志位被设置为 1 时，它通常与 TCP 首部中的另一个字段——紧急指针 (Urgent Pointer) 配合使用。</li>
</ul>
<h4 id="_5-窗口大小-window-size-16-位" tabindex="-1"><a class="header-anchor" href="#_5-窗口大小-window-size-16-位"><span>5. 窗口大小 (Window Size, 16 位)</span></a></h4>
<ul>
<li>用于<strong>流量控制</strong>。它告诉对方：“我现在还能收多少字节的数据”，防止发送方发得太快把接收方的缓存撑破。</li>
</ul>
<h4 id="_6-校验和-checksum-16-位" tabindex="-1"><a class="header-anchor" href="#_6-校验和-checksum-16-位"><span>6. 校验和 (Checksum, 16 位)</span></a></h4>
<ul>
<li>用于检测首部和数据在传输过程中是否发生了位错误。如果校验失败，TCP 会直接丢弃该报文且不发 ACK。</li>
</ul>
<h4 id="_7-紧急指针-urgent-pointer" tabindex="-1"><a class="header-anchor" href="#_7-紧急指针-urgent-pointer"><span>7. 紧急指针 (Urgent Pointer)</span></a></h4>
<ul>
<li>配合 URG 标志使用，指示报文中有紧急数据，需要优先处理（现在已较少使用）。</li>
</ul>
<h4 id="_8-选项-options" tabindex="-1"><a class="header-anchor" href="#_8-选项-options"><span>8. 选项 (Options)</span></a></h4>
<ul>
<li>长度可变。最常见的是 <strong>MSS (Maximum Segment Size)</strong>，用于协商每一个 TCP 段的最大长度，防止在 IP 层被分片。</li>
</ul>
<hr>
<h3 id="数据封装的整体视角" tabindex="-1"><a class="header-anchor" href="#数据封装的整体视角"><span>数据封装的整体视角</span></a></h3>
<p>当 TCP 报文传给下一层时，它会被嵌套进 IP 报文，再嵌套进以太网帧：</p>
<p><code v-pre>[以太网首部] [IP 首部] [TCP 首部] [应用层数据] [以太网尾部]</code></p>
<hr>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h3>
<p>TCP 首部的设计非常精巧：<strong>序列号和确认号</strong>解决了“丢包和乱序”问题，<strong>窗口大小</strong>解决了“速度匹配”问题，<strong>标志位</strong>解决了“状态切换”问题。</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};