import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E4%BC%A0%E8%BE%93%E5%B1%82/%E7%AB%AF%E5%8F%A3%E7%9B%B8%E5%85%B3%E5%91%BD%E4%BB%A4/tcpdump%E5%91%BD%E4%BB%A4.html","title":"tcpdump命令","lang":"zh-CN","frontmatter":{"title":"tcpdump命令","icon":"network","date":"2026-07-23T00:00:00.000Z","category":["计算机网络"],"description":"如果说 nmap 是侦察兵，lsof 是管理员，那么 **tcpdump** 就是网络世界的“闭路电视”和“显微镜”。它是 Linux 下最强大的命令行抓包工具，能够实时截获并分析网卡上通过的数据包。 1. tcpdump 的核心逻辑 tcpdump 的强大在于它的过滤表达式。如果不加过滤，海量的数据包会瞬间刷屏。它的命令结构通常是： tcpdump ...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"tcpdump命令\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E4%BC%A0%E8%BE%93%E5%B1%82/%E7%AB%AF%E5%8F%A3%E7%9B%B8%E5%85%B3%E5%91%BD%E4%BB%A4/tcpdump%E5%91%BD%E4%BB%A4.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"tcpdump命令"}],["meta",{"property":"og:description","content":"如果说 nmap 是侦察兵，lsof 是管理员，那么 **tcpdump** 就是网络世界的“闭路电视”和“显微镜”。它是 Linux 下最强大的命令行抓包工具，能够实时截获并分析网卡上通过的数据包。 1. tcpdump 的核心逻辑 tcpdump 的强大在于它的过滤表达式。如果不加过滤，海量的数据包会瞬间刷屏。它的命令结构通常是： tcpdump ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.6,"words":779},"filePathRelative":"posts/计算机网络/网络的概念/传输层/端口相关命令/tcpdump命令.md","excerpt":"<p>如果说 <code>nmap</code> 是侦察兵，<code>lsof</code> 是管理员，那么 <code>**tcpdump**</code> 就是网络世界的“闭路电视”和“显微镜”。它是 Linux 下最强大的命令行抓包工具，能够实时截获并分析网卡上通过的数据包。</p>\\n<hr>\\n<h3>1. <code>tcpdump</code> 的核心逻辑</h3>\\n<p><code>tcpdump</code> 的强大在于它的<strong>过滤表达式</strong>。如果不加过滤，海量的数据包会瞬间刷屏。它的命令结构通常是：</p>\\n<p><code>tcpdump [选项] [过滤表达式]</code></p>","autoDesc":true}`),i={name:`tcpdump命令.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>如果说 <code v-pre>nmap</code> 是侦察兵，<code v-pre>lsof</code> 是管理员，那么 <code v-pre>**tcpdump**</code> 就是网络世界的“闭路电视”和“显微镜”。它是 Linux 下最强大的命令行抓包工具，能够实时截获并分析网卡上通过的数据包。</p>
<hr>
<h3 id="_1-tcpdump-的核心逻辑" tabindex="-1"><a class="header-anchor" href="#_1-tcpdump-的核心逻辑"><span>1. <code v-pre>tcpdump</code> 的核心逻辑</span></a></h3>
<p><code v-pre>tcpdump</code> 的强大在于它的<strong>过滤表达式</strong>。如果不加过滤，海量的数据包会瞬间刷屏。它的命令结构通常是：</p>
<p><code v-pre>tcpdump [选项] [过滤表达式]</code></p>
<hr>
<h3 id="_2-常用基础选项-options" tabindex="-1"><a class="header-anchor" href="#_2-常用基础选项-options"><span>2. 常用基础选项 (Options)</span></a></h3>
<table>
<thead>
<tr>
<th><strong>选项</strong></th>
<th><strong>功能描述</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>-i</code></td>
<td>指定监听的网卡（如 <code v-pre>-i eth0</code>&lt;br&gt;），<code v-pre>any</code>&lt;br&gt;表示监听所有网卡。</td>
</tr>
<tr>
<td><code v-pre>-n</code></td>
<td>不解析主机名（显示 IP 而不是域名），速度更快。</td>
</tr>
<tr>
<td><code v-pre>-nn</code></td>
<td>不解析主机名和端口名（显示 80 而不是 http）。</td>
</tr>
<tr>
<td><code v-pre>-X</code></td>
<td>以 Hex (十六进制) 和 ASCII 形式打印数据包内容（看明文协议很有用）。</td>
</tr>
<tr>
<td><code v-pre>-v / -vv</code></td>
<td>显示更详细的报文信息（如 TTL、ID、标志位等）。</td>
</tr>
<tr>
<td><code v-pre>-c</code></td>
<td>抓取指定数量的包后退出（如 <code v-pre>-c 10</code>&lt;br&gt;）。</td>
</tr>
<tr>
<td><code v-pre>-w</code></td>
<td>将抓取的包保存到文件（如 <code v-pre>-w test.pcap</code>&lt;br&gt;），可用 Wireshark 打开。</td>
</tr>
</tbody>
</table>
<hr>
<h3 id="_3-精准过滤表达式-filters" tabindex="-1"><a class="header-anchor" href="#_3-精准过滤表达式-filters"><span>3. 精准过滤表达式 (Filters)</span></a></h3>
<p>这是 <code v-pre>tcpdump</code> 的灵魂，支持按地址、端口、协议进行组合。</p>
<h4 id="a-按主机-网段过滤" tabindex="-1"><a class="header-anchor" href="#a-按主机-网段过滤"><span>A. 按主机/网段过滤</span></a></h4>
<ul>
<li><code v-pre>tcpdump host 192.168.1.1</code> (只看与该 IP 相关的所有流量)</li>
<li><code v-pre>tcpdump src 192.168.1.5</code> (只看来源是该 IP 的包)</li>
<li><code v-pre>tcpdump net 192.168.1.0/24</code> (查看整个网段)</li>
</ul>
<h4 id="b-按端口过滤" tabindex="-1"><a class="header-anchor" href="#b-按端口过滤"><span>B. 按端口过滤</span></a></h4>
<ul>
<li><code v-pre>tcpdump port 80</code> (只看 80 端口)</li>
<li><code v-pre>tcpdump portrange 1000-2000</code> (查看端口范围)</li>
</ul>
<h4 id="c-按协议过滤" tabindex="-1"><a class="header-anchor" href="#c-按协议过滤"><span>C. 按协议过滤</span></a></h4>
<ul>
<li><code v-pre>tcpdump icmp</code> (看 Ping 包)</li>
<li><code v-pre>tcpdump tcp</code> 或 <code v-pre>tcpdump udp</code></li>
</ul>
<h4 id="d-逻辑组合-and-or-not" tabindex="-1"><a class="header-anchor" href="#d-逻辑组合-and-or-not"><span>D. 逻辑组合 (and, or, not)</span></a></h4>
<ul>
<li><code v-pre>tcpdump src 192.168.1.1 and port 80</code> (来源是 .1 且端口是 80)</li>
<li><code v-pre>tcpdump port 80 or port 443</code> (看 HTTP 或 HTTPS)</li>
<li><code v-pre>tcpdump not port 22</code> (排除 SSH 流量，避免被自己的远程连接刷屏)</li>
</ul>
<hr>
<h3 id="_4-实战案例-直接拿去用" tabindex="-1"><a class="header-anchor" href="#_4-实战案例-直接拿去用"><span>4. 实战案例 (直接拿去用)</span></a></h3>
<h4 id="场景-1-排查-web-服务响应慢" tabindex="-1"><a class="header-anchor" href="#场景-1-排查-web-服务响应慢"><span>场景 1：排查 Web 服务响应慢</span></a></h4>
<p>抓取 80 端口的所有包，并显示内容：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>tcpdump -i eth0 -nn -X port 80</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h4 id="场景-2-查看经典的-tcp-三次握手" tabindex="-1"><a class="header-anchor" href="#场景-2-查看经典的-tcp-三次握手"><span>场景 2：查看经典的 TCP 三次握手</span></a></h4>
<p>利用标志位过滤（只看 SYN 和 ACK）：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>tcpdump -i eth0 'tcp[tcpflags] &#x26; (tcp-syn|tcp-ack) != 0'</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h4 id="场景-3-保存包给-wireshark-分析" tabindex="-1"><a class="header-anchor" href="#场景-3-保存包给-wireshark-分析"><span>场景 3：保存包给 Wireshark 分析</span></a></h4>
<p>在服务器上抓包，在电脑上用图形化工具看：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>tcpdump -i eth0 -w dump.pcap</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><hr>
<h3 id="_5-tcpdump-输出内容怎么看" tabindex="-1"><a class="header-anchor" href="#_5-tcpdump-输出内容怎么看"><span>5. <code v-pre>tcpdump</code> 输出内容怎么看？</span></a></h3>
<p>一条标准的 TCP 包输出通常长这样：</p>
<p><code v-pre>23:10:01.123456 IP 192.168.1.5.54321 &gt; 192.168.1.1.80: Flags [S], seq 12345, win 64240, length 0</code></p>
<ol>
<li><strong>时间戳</strong>：23:10:01...</li>
<li><strong>源 IP.端口 &gt; 目的 IP.端口</strong>：1.5.54321 &gt; 1.1.80</li>
<li><strong>Flags</strong>: <code v-pre>[S]</code> 代表 SYN（请求连接），<code v-pre>[.]</code> 代表 ACK（确认），<code v-pre>[P]</code> 代表推送数据，<code v-pre>[F]</code> 代表结束连接。</li>
<li><strong>seq/ack</strong>: 序列号和确认号。</li>
</ol>
<hr>
<h3 id="​避坑指南" tabindex="-1"><a class="header-anchor" href="#​避坑指南"><span>​避坑指南</span></a></h3>
<ol>
<li><strong>权限</strong>：必须使用 <code v-pre>sudo</code> 运行。</li>
<li><strong>性能</strong>：在高并发服务器上，尽量使用具体的过滤条件，并配合 <code v-pre>-c</code> 限制数量，否则可能导致 CPU 飙升。</li>
<li><strong>SSH 陷阱</strong>：如果你通过 SSH 连接服务器，千万不要在不加过滤的情况下抓包，否则会产生“死循环”（抓包动作产生 SSH 流量 -&gt; 产生新包 -&gt; 又被抓到），屏幕会疯狂滚动。</li>
</ol>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};