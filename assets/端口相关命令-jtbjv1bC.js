import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E4%BC%A0%E8%BE%93%E5%B1%82/%E7%AB%AF%E5%8F%A3%E7%9B%B8%E5%85%B3%E5%91%BD%E4%BB%A4.html","title":"端口相关命令","lang":"zh-CN","frontmatter":{"title":"端口相关命令","icon":"network","date":"2026-07-23T00:00:00.000Z","category":["计算机网络"],"description":"在 Linux 和网络排查中，熟练使用端口相关命令是“基操”。我们可以根据查看监听、测试连通性、流量抓取这三个维度来划分。 1. 查看本地监听与连接 (状态查询) 这是最常用的场景：检查某个服务是否启动，或者哪个进程占用了端口。 **netstat** (经典但逐渐被替代) netstat -tulnp：查看所有 TCP (t)、UDP (u) 的监听...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"端口相关命令\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E4%BC%A0%E8%BE%93%E5%B1%82/%E7%AB%AF%E5%8F%A3%E7%9B%B8%E5%85%B3%E5%91%BD%E4%BB%A4.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"端口相关命令"}],["meta",{"property":"og:description","content":"在 Linux 和网络排查中，熟练使用端口相关命令是“基操”。我们可以根据查看监听、测试连通性、流量抓取这三个维度来划分。 1. 查看本地监听与连接 (状态查询) 这是最常用的场景：检查某个服务是否启动，或者哪个进程占用了端口。 **netstat** (经典但逐渐被替代) netstat -tulnp：查看所有 TCP (t)、UDP (u) 的监听..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":1.98,"words":595},"filePathRelative":"posts/计算机网络/网络的概念/传输层/端口相关命令.md","excerpt":"<p>在 Linux 和网络排查中，熟练使用端口相关命令是“基操”。我们可以根据<strong>查看监听、测试连通性、流量抓取</strong>这三个维度来划分。</p>\\n<hr>\\n<h3>1. 查看本地监听与连接 (状态查询)</h3>\\n<p>这是最常用的场景：检查某个服务是否启动，或者哪个进程占用了端口。</p>\\n<ul>\\n<li>\\n<p><code>**netstat**</code> <strong>(经典但逐渐被替代)</strong></p>\\n</li>\\n<li>\\n<p><code>netstat -tulnp</code>：查看所有 TCP (<code>t</code>)、UDP (<code>u</code>) 的监听 (<code>l</code>) 端口，并显示进程 PID (<code>p</code>) 和数字地址 (<code>n</code>)。</p>\\n</li>\\n<li>\\n<p><code>**ss**</code> <strong>(Socket Statistics - 更快、现代)</strong></p>\\n</li>\\n<li>\\n<p><code>ss -tulnp</code>：功能与 netstat 类似，但在处理大量连接时速度飞快。</p>\\n</li>\\n<li>\\n<p><code>**lsof**</code> <strong>(List Open Files)</strong></p>\\n</li>\\n<li>\\n<p><code>lsof -i :80</code>：直接查询 <strong>80 端口</strong>被哪个进程占用。</p>\\n</li>\\n<li>\\n<p>非常有用的技巧：如果你想杀掉占用某端口的进程，可以用 <code>kill -9 $(lsof -t -i:80)</code>。</p>\\n</li>\\n</ul>","autoDesc":true}`),i={name:`端口相关命令.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在 Linux 和网络排查中，熟练使用端口相关命令是“基操”。我们可以根据<strong>查看监听、测试连通性、流量抓取</strong>这三个维度来划分。</p>
<hr>
<h3 id="_1-查看本地监听与连接-状态查询" tabindex="-1"><a class="header-anchor" href="#_1-查看本地监听与连接-状态查询"><span>1. 查看本地监听与连接 (状态查询)</span></a></h3>
<p>这是最常用的场景：检查某个服务是否启动，或者哪个进程占用了端口。</p>
<ul>
<li>
<p><code v-pre>**netstat**</code> <strong>(经典但逐渐被替代)</strong></p>
</li>
<li>
<p><code v-pre>netstat -tulnp</code>：查看所有 TCP (<code v-pre>t</code>)、UDP (<code v-pre>u</code>) 的监听 (<code v-pre>l</code>) 端口，并显示进程 PID (<code v-pre>p</code>) 和数字地址 (<code v-pre>n</code>)。</p>
</li>
<li>
<p><code v-pre>**ss**</code> <strong>(Socket Statistics - 更快、现代)</strong></p>
</li>
<li>
<p><code v-pre>ss -tulnp</code>：功能与 netstat 类似，但在处理大量连接时速度飞快。</p>
</li>
<li>
<p><code v-pre>**lsof**</code> <strong>(List Open Files)</strong></p>
</li>
<li>
<p><code v-pre>lsof -i :80</code>：直接查询 <strong>80 端口</strong>被哪个进程占用。</p>
</li>
<li>
<p>非常有用的技巧：如果你想杀掉占用某端口的进程，可以用 <code v-pre>kill -9 $(lsof -t -i:80)</code>。</p>
</li>
</ul>
<hr>
<h3 id="_2-测试远程端口连通性-拨测" tabindex="-1"><a class="header-anchor" href="#_2-测试远程端口连通性-拨测"><span>2. 测试远程端口连通性 (拨测)</span></a></h3>
<p>当你怀疑防火墙拦截或服务没开时，用这些命令从客户端探测。</p>
<ul>
<li>
<p><code v-pre>**telnet**</code> <strong>(最老牌)</strong></p>
</li>
<li>
<p><code v-pre>telnet 192.168.1.1 80</code>：如果黑屏表示连通，提示 <code v-pre>Connection refused</code> 表示端口未开。</p>
</li>
<li>
<p><code v-pre>**nc**</code> <strong>(Netcat - 瑞士军刀)</strong></p>
</li>
<li>
<p><code v-pre>nc -zv 192.168.1.1 80</code>：扫描模式，直接告诉你结果。</p>
</li>
<li>
<p><code v-pre>**nmap**</code> <strong>(扫描专家)</strong></p>
</li>
<li>
<p><code v-pre>nmap -p 1-1024 192.168.1.1</code>：扫描目标主机 1 到 1024 之间的所有端口。</p>
</li>
<li>
<p><code v-pre>**curl**</code> <strong>(针对 Web 端口)</strong></p>
</li>
<li>
<p><code v-pre>curl -I 192.168.1.1:80</code>：不仅测试连通，还能看到 HTTP 响应头。</p>
</li>
</ul>
<hr>
<h3 id="_3-流量分析与抓包-深度侦察" tabindex="-1"><a class="header-anchor" href="#_3-流量分析与抓包-深度侦察"><span>3. 流量分析与抓包 (深度侦察)</span></a></h3>
<p>如果你想看端口里具体在传输什么数据，就需要动用“重型武器”了。</p>
<ul>
<li>
<p><code v-pre>**tcpdump**</code> <strong>(命令行抓包王者)</strong></p>
</li>
<li>
<p><code v-pre>tcpdump -i eth0 port 80</code>：实时监控网卡 <code v-pre>eth0</code> 上 80 端口的所有流量。</p>
</li>
<li>
<p><code v-pre>tcpdump -i any port 443 -A</code>：以 ASCII 文本形式查看 443 端口的数据包内容（加密流通常是乱码）。</p>
</li>
</ul>
<hr>
<h3 id="_4-防火墙端口管理-开关门" tabindex="-1"><a class="header-anchor" href="#_4-防火墙端口管理-开关门"><span>4. 防火墙端口管理 (开关门)</span></a></h3>
<p>在 Linux (CentOS/Ubuntu) 中，开放或关闭端口通常使用以下命令：</p>
<table>
<thead>
<tr>
<th><strong>系统/工具</strong></th>
<th><strong>常用命令示例</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>firewalld</strong> (CentOS)</td>
<td><code v-pre>firewall-cmd --add-port=80/tcp --permanent</code></td>
</tr>
<tr>
<td><strong>ufw</strong> (Ubuntu)</td>
<td><code v-pre>ufw allow 80/tcp</code></td>
</tr>
<tr>
<td><strong>iptables</strong> (底层)</td>
<td><code v-pre>iptables -A INPUT -p tcp --dport 80 -j ACCEPT</code></td>
</tr>
</tbody>
</table>
<hr>
<h3 id="总结对照表" tabindex="-1"><a class="header-anchor" href="#总结对照表"><span>总结对照表</span></a></h3>
<table>
<thead>
<tr>
<th><strong>需求</strong></th>
<th><strong>首选命令</strong></th>
<th><strong>备选/更强工具</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>谁占用了端口？</strong></td>
<td><code v-pre>lsof -i :port</code></td>
<td><code v-pre>ss -p</code></td>
</tr>
<tr>
<td><strong>远程端口开了吗？</strong></td>
<td><code v-pre>nc -zv IP port</code></td>
<td><code v-pre>telnet</code>&lt;br&gt;/ <code v-pre>nmap</code></td>
</tr>
<tr>
<td><strong>服务启动了吗？</strong></td>
<td><code v-pre>ss -tunl</code></td>
<td><code v-pre>netstat -tunl</code></td>
</tr>
<tr>
<td><strong>端口里传了什么？</strong></td>
<td><code v-pre>tcpdump</code></td>
<td><code v-pre>tshark</code>&lt;br&gt;(Wireshark 命令行版)</td>
</tr>
</tbody>
</table>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};