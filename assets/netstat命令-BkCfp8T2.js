import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E4%BC%A0%E8%BE%93%E5%B1%82/%E7%AB%AF%E5%8F%A3%E7%9B%B8%E5%85%B3%E5%91%BD%E4%BB%A4/netstat%E5%91%BD%E4%BB%A4.html","title":"netstat命令","lang":"zh-CN","frontmatter":{"title":"netstat命令","icon":"network","date":"2026-07-23T00:00:00.000Z","category":["计算机网络"],"description":"netstat（Network Statistics）是一个经典的命令行工具，用于监控网络连接、路由表、接口统计以及更多网络相关信息。虽然在一些现代 Linux 系统中它逐渐被 ss 命令取代，但它依然是网络排障和系统监控的“瑞士军刀”。 常用参数组合 在实际操作中，我们很少单独运行 netstat，通常会配合以下参数： 5 个最高频的使用场景 1. ...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"netstat命令\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E4%BC%A0%E8%BE%93%E5%B1%82/%E7%AB%AF%E5%8F%A3%E7%9B%B8%E5%85%B3%E5%91%BD%E4%BB%A4/netstat%E5%91%BD%E4%BB%A4.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"netstat命令"}],["meta",{"property":"og:description","content":"netstat（Network Statistics）是一个经典的命令行工具，用于监控网络连接、路由表、接口统计以及更多网络相关信息。虽然在一些现代 Linux 系统中它逐渐被 ss 命令取代，但它依然是网络排障和系统监控的“瑞士军刀”。 常用参数组合 在实际操作中，我们很少单独运行 netstat，通常会配合以下参数： 5 个最高频的使用场景 1. ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.15,"words":644},"filePathRelative":"posts/计算机网络/网络的概念/传输层/端口相关命令/netstat命令.md","excerpt":"<p><code>netstat</code>（Network Statistics）是一个经典的命令行工具，用于监控网络连接、路由表、接口统计以及更多网络相关信息。虽然在一些现代 Linux 系统中它逐渐被 <code>ss</code> 命令取代，但它依然是网络排障和系统监控的“瑞士军刀”。</p>\\n<hr>\\n<h2>常用参数组合</h2>\\n<p>在实际操作中，我们很少单独运行 <code>netstat</code>，通常会配合以下参数：</p>\\n<table>\\n<thead>\\n<tr>\\n<th><strong>参数</strong></th>\\n<th><strong>含义</strong></th>\\n</tr>\\n</thead>\\n<tbody>\\n<tr>\\n<td><strong>-a</strong> (all)</td>\\n<td>显示所有连接中的 Socket（包括监听和非监听状态）。</td>\\n</tr>\\n<tr>\\n<td><strong>-t</strong> (tcp)</td>\\n<td>仅显示 TCP 相关连接。</td>\\n</tr>\\n<tr>\\n<td><strong>-u</strong> (udp)</td>\\n<td>仅显示 UDP 相关连接。</td>\\n</tr>\\n<tr>\\n<td><strong>-n</strong> (numeric)</td>\\n<td>直接使用 IP 地址和端口号，不进行域名解析（速度极快）。</td>\\n</tr>\\n<tr>\\n<td><strong>-l</strong> (listening)</td>\\n<td>仅列出正在监听（Listening）的服务端口。</td>\\n</tr>\\n<tr>\\n<td><strong>-p</strong> (programs)</td>\\n<td>显示占用该连接的程序 PID 和名称（通常需要 root 权限）。</td>\\n</tr>\\n<tr>\\n<td><strong>-r</strong> (route)</td>\\n<td>显示核心路由表。</td>\\n</tr>\\n</tbody>\\n</table>","autoDesc":true}`),i={name:`netstat命令.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p><code v-pre>netstat</code>（Network Statistics）是一个经典的命令行工具，用于监控网络连接、路由表、接口统计以及更多网络相关信息。虽然在一些现代 Linux 系统中它逐渐被 <code v-pre>ss</code> 命令取代，但它依然是网络排障和系统监控的“瑞士军刀”。</p>
<hr>
<h2 id="常用参数组合" tabindex="-1"><a class="header-anchor" href="#常用参数组合"><span>常用参数组合</span></a></h2>
<p>在实际操作中，我们很少单独运行 <code v-pre>netstat</code>，通常会配合以下参数：</p>
<table>
<thead>
<tr>
<th><strong>参数</strong></th>
<th><strong>含义</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>-a</strong> (all)</td>
<td>显示所有连接中的 Socket（包括监听和非监听状态）。</td>
</tr>
<tr>
<td><strong>-t</strong> (tcp)</td>
<td>仅显示 TCP 相关连接。</td>
</tr>
<tr>
<td><strong>-u</strong> (udp)</td>
<td>仅显示 UDP 相关连接。</td>
</tr>
<tr>
<td><strong>-n</strong> (numeric)</td>
<td>直接使用 IP 地址和端口号，不进行域名解析（速度极快）。</td>
</tr>
<tr>
<td><strong>-l</strong> (listening)</td>
<td>仅列出正在监听（Listening）的服务端口。</td>
</tr>
<tr>
<td><strong>-p</strong> (programs)</td>
<td>显示占用该连接的程序 PID 和名称（通常需要 root 权限）。</td>
</tr>
<tr>
<td><strong>-r</strong> (route)</td>
<td>显示核心路由表。</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="_5-个最高频的使用场景" tabindex="-1"><a class="header-anchor" href="#_5-个最高频的使用场景"><span>5 个最高频的使用场景</span></a></h2>
<h3 id="_1-查看哪些端口正在被监听" tabindex="-1"><a class="header-anchor" href="#_1-查看哪些端口正在被监听"><span>1. 查看哪些端口正在被监听</span></a></h3>
<p>这是最常见的用法，用来确认你的 Web 服务器、数据库等是否已正常启动。</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>netstat -tunlp</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ul>
<li><strong>解读</strong>：你会看到 <code v-pre>Local Address</code> 列显示类似 <code v-pre>0.0.0.0:80</code>，表示 80 端口正在全网监听。</li>
</ul>
<h3 id="_2-查找特定端口被哪个进程占用" tabindex="-1"><a class="header-anchor" href="#_2-查找特定端口被哪个进程占用"><span>2. 查找特定端口被哪个进程占用</span></a></h3>
<p>如果你尝试启动一个服务却提示“端口已被占用”，可以用这个组合：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>netstat -anp | grep :8080</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="_3-查看网络接口统计" tabindex="-1"><a class="header-anchor" href="#_3-查看网络接口统计"><span>3. 查看网络接口统计</span></a></h3>
<p>想看看网卡有没有丢包或错误？</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>netstat -i</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="_4-实时监控网络连接状态" tabindex="-1"><a class="header-anchor" href="#_4-实时监控网络连接状态"><span>4. 实时监控网络连接状态</span></a></h3>
<p>如果你怀疑服务器遭受攻击（如 SYN Flood），可以统计各种连接状态的数量：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>netstat -n | awk '/^tcp/ {++S[$NF]} END {for(a in S) print a, S[a]}'</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ul>
<li>这会输出类似 <code v-pre>ESTABLISHED 50</code>, <code v-pre>TIME_WAIT 200</code> 等数据。</li>
</ul>
<h3 id="_5-查看路由信息" tabindex="-1"><a class="header-anchor" href="#_5-查看路由信息"><span>5. 查看路由信息</span></a></h3>
<p>确认数据包是从哪个网关出去的：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>netstat -rn</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><hr>
<h2 id="状态说明-state" tabindex="-1"><a class="header-anchor" href="#状态说明-state"><span>状态说明（State）</span></a></h2>
<p>当你运行 <code v-pre>netstat</code> 时，<code v-pre>State</code> 列的信息至关重要：</p>
<ul>
<li><strong>LISTEN</strong>: 等待从任意远程端口和地址发来的连接请求。</li>
<li><strong>ESTABLISHED</strong>: 连接已建立，双方正在传输数据。</li>
<li><strong>TIME_WAIT</strong>: 客户端主动关闭连接后进入的等待状态，属于正常现象，但过多可能消耗资源。</li>
<li><strong>CLOSE_WAIT</strong>: 远程端已关闭连接，等待本地端关闭。如果此处堆积过多，通常说明程序代码有 Bug。</li>
</ul>
<hr>
<h3 id="​-小贴士" tabindex="-1"><a class="header-anchor" href="#​-小贴士"><span>​ 小贴士</span></a></h3>
<p>如果你发现系统提示 <code v-pre>command not found</code>，在 CentOS/RHEL 上可以通过 <code v-pre>yum install net-tools</code> 安装，在 Ubuntu/Debian 上则是 <code v-pre>apt install net-tools</code>。</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};