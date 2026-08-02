import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E4%BC%A0%E8%BE%93%E5%B1%82/UDP%E7%9A%84%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86.html","title":"UDP的工作原理","lang":"zh-CN","frontmatter":{"title":"UDP的工作原理","icon":"network","date":"2026-07-23T00:00:00.000Z","category":["计算机网络"],"description":"如果说 TCP 是打挂号信，必须确认对方在家、签收并回执；那么 UDP（用户数据报协议） 就是普通的平信：写好地址，扔进邮筒，剩下的全靠缘分。 UDP 的工作原理非常简单，它几乎不对原始数据做任何加工，直接将其封装成数据报发送出去。 1. UDP 的核心机制：无连接与不可靠 UDP 的工作过程可以用“发后即忘”（Fire and Forget）来形容：...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"UDP的工作原理\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E4%BC%A0%E8%BE%93%E5%B1%82/UDP%E7%9A%84%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"UDP的工作原理"}],["meta",{"property":"og:description","content":"如果说 TCP 是打挂号信，必须确认对方在家、签收并回执；那么 UDP（用户数据报协议） 就是普通的平信：写好地址，扔进邮筒，剩下的全靠缘分。 UDP 的工作原理非常简单，它几乎不对原始数据做任何加工，直接将其封装成数据报发送出去。 1. UDP 的核心机制：无连接与不可靠 UDP 的工作过程可以用“发后即忘”（Fire and Forget）来形容：..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.45,"words":736},"filePathRelative":"posts/计算机网络/网络的概念/传输层/UDP的工作原理.md","excerpt":"<p>如果说 <strong>TCP</strong> 是打挂号信，必须确认对方在家、签收并回执；那么 <strong>UDP（用户数据报协议）</strong> 就是普通的<strong>平信</strong>：写好地址，扔进邮筒，剩下的全靠缘分。</p>\\n<p>UDP 的工作原理非常简单，它几乎不对原始数据做任何加工，直接将其封装成数据报发送出去。</p>\\n<hr>\\n<h3>1. UDP 的核心机制：无连接与不可靠</h3>\\n<p>UDP 的工作过程可以用“<strong>发后即忘</strong>”（Fire and Forget）来形容：</p>\\n<ul>\\n<li><strong>无需握手</strong>：发送数据前不需要像 TCP 那样进行“三次握手”。只要应用层有数据，UDP 加上报头就直接发。</li>\\n<li><strong>不保证到达</strong>：它不负责确认对方是否收到，也不负责超时重传。如果数据在网络中丢了，那就丢了。</li>\\n<li><strong>不保证顺序</strong>：数据包 A 先发，数据包 B 后发，结果 B 先到、A 后到。UDP 不会帮你重新排序，直接原样交给应用层。</li>\\n<li><strong>无拥塞控制</strong>：不管网络堵不堵，UDP 都会按照应用层要求的速率拼命发数据。</li>\\n</ul>","autoDesc":true}`),i={name:`UDP的工作原理.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>如果说 <strong>TCP</strong> 是打挂号信，必须确认对方在家、签收并回执；那么 <strong>UDP（用户数据报协议）</strong> 就是普通的<strong>平信</strong>：写好地址，扔进邮筒，剩下的全靠缘分。</p>
<p>UDP 的工作原理非常简单，它几乎不对原始数据做任何加工，直接将其封装成数据报发送出去。</p>
<hr>
<h3 id="_1-udp-的核心机制-无连接与不可靠" tabindex="-1"><a class="header-anchor" href="#_1-udp-的核心机制-无连接与不可靠"><span>1. UDP 的核心机制：无连接与不可靠</span></a></h3>
<p>UDP 的工作过程可以用“<strong>发后即忘</strong>”（Fire and Forget）来形容：</p>
<ul>
<li><strong>无需握手</strong>：发送数据前不需要像 TCP 那样进行“三次握手”。只要应用层有数据，UDP 加上报头就直接发。</li>
<li><strong>不保证到达</strong>：它不负责确认对方是否收到，也不负责超时重传。如果数据在网络中丢了，那就丢了。</li>
<li><strong>不保证顺序</strong>：数据包 A 先发，数据包 B 后发，结果 B 先到、A 后到。UDP 不会帮你重新排序，直接原样交给应用层。</li>
<li><strong>无拥塞控制</strong>：不管网络堵不堵，UDP 都会按照应用层要求的速率拼命发数据。</li>
</ul>
<hr>
<h3 id="_2-udp-报头-极简主义的典范" tabindex="-1"><a class="header-anchor" href="#_2-udp-报头-极简主义的典范"><span>2. UDP 报头：极简主义的典范</span></a></h3>
<p>TCP 的报头通常有 <strong>20 字节</strong>，包含各种复杂的控制位。而 UDP 的报头只有固定的 <strong>8 字节</strong>，包含四个字段：</p>
<ol>
<li><strong>源端口号</strong>（2字节）：发件人是谁。</li>
<li><strong>目的端口号</strong>（2字节）：收件人是谁。</li>
<li><strong>长度</strong>（2字节）：整个 UDP 数据报的大小。</li>
<li><strong>校验和</strong>（2字节）：简单的错误检测（如果发现数据损坏，直接丢弃，不通知）。</li>
</ol>
<hr>
<h3 id="_3-udp-为什么存在-应用场景" tabindex="-1"><a class="header-anchor" href="#_3-udp-为什么存在-应用场景"><span>3. UDP 为什么存在？（应用场景）</span></a></h3>
<p>既然它这么“不靠谱”，为什么大家还要用它？因为它有 <strong>TCP 无法比拟的速度和低延迟</strong>。</p>
<ul>
<li>
<p><strong>实时性要求极高</strong>：</p>
</li>
<li>
<p><strong>在线游戏</strong>：比如 FPS 或 MOBA 游戏。如果你网络卡了，比起重传 5 秒前的“走位数据”，游戏更需要你现在这一秒的最新的位置。</p>
</li>
<li>
<p><strong>音视频通话</strong>：视频聊天时，偶尔掉一个像素点（丢包）没关系，但如果为了等那个像素点而导致整个画面卡住（TCP 重传机制），用户体验会非常糟糕。</p>
</li>
<li>
<p><strong>广播与多播</strong>：</p>
</li>
<li>
<p>UDP 支持一对多传输。比如你在局域网内寻找打印机，或者视频直播分发，UDP 非常高效。</p>
</li>
<li>
<p><strong>简单查询</strong>：</p>
</li>
<li>
<p><strong>DNS（域名系统）</strong>：你查一个网址的 IP，发个包过去，回个包过来。如果没回，大不了过半秒再查一次，没必要为了这一个包去搞复杂的握手。</p>
</li>
</ul>
<hr>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h3>
<p>UDP 的哲学是：<strong>速度第一，准不准再说</strong>。它把可靠性的控制权完全交给了应用层程序——如果你需要可靠，你自己写算法去补（比如 <strong>QUIC协议</strong> 就是在 UDP 之上自建了可靠性机制）。</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};