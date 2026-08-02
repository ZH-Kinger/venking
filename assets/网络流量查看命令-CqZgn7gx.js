import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E4%BC%A0%E8%BE%93%E5%B1%82/%E7%BD%91%E7%BB%9C%E6%B5%81%E9%87%8F%E6%9F%A5%E7%9C%8B%E5%91%BD%E4%BB%A4.html","title":"网络流量查看命令","lang":"zh-CN","frontmatter":{"title":"网络流量查看命令","icon":"network","date":"2026-07-23T00:00:00.000Z","category":["计算机网络"],"description":"glances、dstats、nethogs、iftop 在 Linux 中查看网络流量，可以根据你的需求维度（实时带宽监控、进程级流量分析、历史流量统计）选择不同的工具。 以下是按照从“宏观”到“微观”的顺序整理的常用命令： 1. 宏观实时监控（看网卡总带宽） 这类工具适合快速查看服务器当前的总流入（In）和流出（Out）速度。 **sar** (S...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"网络流量查看命令\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E4%BC%A0%E8%BE%93%E5%B1%82/%E7%BD%91%E7%BB%9C%E6%B5%81%E9%87%8F%E6%9F%A5%E7%9C%8B%E5%91%BD%E4%BB%A4.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"网络流量查看命令"}],["meta",{"property":"og:description","content":"glances、dstats、nethogs、iftop 在 Linux 中查看网络流量，可以根据你的需求维度（实时带宽监控、进程级流量分析、历史流量统计）选择不同的工具。 以下是按照从“宏观”到“微观”的顺序整理的常用命令： 1. 宏观实时监控（看网卡总带宽） 这类工具适合快速查看服务器当前的总流入（In）和流出（Out）速度。 **sar** (S..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.36,"words":708},"filePathRelative":"posts/计算机网络/网络的概念/传输层/网络流量查看命令.md","excerpt":"<p>glances、dstats、nethogs、iftop</p>\\n<p>在 Linux 中查看网络流量，可以根据你的需求维度（<strong>实时带宽监控、进程级流量分析、历史流量统计</strong>）选择不同的工具。</p>\\n<p>以下是按照从“宏观”到“微观”的顺序整理的常用命令：</p>\\n<hr>\\n<h3>1. 宏观实时监控（看网卡总带宽）</h3>\\n<p>这类工具适合快速查看服务器当前的总流入（In）和流出（Out）速度。</p>\\n<ul>\\n<li>\\n<p><code>**sar**</code> <strong>(System Activity Reporter)</strong></p>\\n</li>\\n<li>\\n<p><strong>命令：</strong><code>sar -n DEV 1 5</code></p>\\n</li>\\n<li>\\n<p><strong>用途：</strong> 每秒统计一次所有网卡的流量，连续 5 次。这是最权威的系统级统计。</p>\\n</li>\\n<li>\\n<p><code>**bmon**</code> <strong>(Bandwidth Monitor)</strong></p>\\n</li>\\n<li>\\n<p><strong>特点：</strong> 界面非常直观，带有简易的 ASCII 折线图。</p>\\n</li>\\n<li>\\n<p><strong>安装：</strong><code>sudo apt install bmon</code></p>\\n</li>\\n<li>\\n<p><code>**nload**</code></p>\\n</li>\\n<li>\\n<p><strong>特点：</strong> 像汽车仪表盘一样，分别显示入站和出站流量的当前值、平均值和最大值。</p>\\n</li>\\n</ul>","autoDesc":true}`),i={name:`网络流量查看命令.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>glances、dstats、nethogs、iftop</p>
<p>在 Linux 中查看网络流量，可以根据你的需求维度（<strong>实时带宽监控、进程级流量分析、历史流量统计</strong>）选择不同的工具。</p>
<p>以下是按照从“宏观”到“微观”的顺序整理的常用命令：</p>
<hr>
<h3 id="_1-宏观实时监控-看网卡总带宽" tabindex="-1"><a class="header-anchor" href="#_1-宏观实时监控-看网卡总带宽"><span>1. 宏观实时监控（看网卡总带宽）</span></a></h3>
<p>这类工具适合快速查看服务器当前的总流入（In）和流出（Out）速度。</p>
<ul>
<li>
<p><code v-pre>**sar**</code> <strong>(System Activity Reporter)</strong></p>
</li>
<li>
<p><strong>命令：</strong><code v-pre>sar -n DEV 1 5</code></p>
</li>
<li>
<p><strong>用途：</strong> 每秒统计一次所有网卡的流量，连续 5 次。这是最权威的系统级统计。</p>
</li>
<li>
<p><code v-pre>**bmon**</code> <strong>(Bandwidth Monitor)</strong></p>
</li>
<li>
<p><strong>特点：</strong> 界面非常直观，带有简易的 ASCII 折线图。</p>
</li>
<li>
<p><strong>安装：</strong><code v-pre>sudo apt install bmon</code></p>
</li>
<li>
<p><code v-pre>**nload**</code></p>
</li>
<li>
<p><strong>特点：</strong> 像汽车仪表盘一样，分别显示入站和出站流量的当前值、平均值和最大值。</p>
</li>
</ul>
<hr>
<h3 id="_2-进程级监控-看谁在偷跑流量" tabindex="-1"><a class="header-anchor" href="#_2-进程级监控-看谁在偷跑流量"><span>2. 进程级监控（看谁在偷跑流量）</span></a></h3>
<p>当你发现带宽异常升高，想揪出是哪个程序在疯狂下载时，这两个工具是首选。</p>
<ul>
<li>
<p><code v-pre>**iftop**</code> <strong>(像 top 一样看流量)</strong></p>
</li>
<li>
<p><strong>命令：</strong><code v-pre>sudo iftop -P</code></p>
</li>
<li>
<p><strong>特点：</strong> 实时列出消耗流量的 IP 对（Source &lt;&gt; Dest）。配合 <code v-pre>-P</code> 可以显示端口。</p>
</li>
<li>
<p><code v-pre>**nethogs**</code> <strong>(按进程分组)</strong></p>
</li>
<li>
<p><strong>命令：</strong><code v-pre>sudo nethogs</code></p>
</li>
<li>
<p><strong>特点：****最推荐！</strong> 它不按 IP 排行，而是直接按**进程名（PID）**排行。一眼就能看到是 <code v-pre>nginx</code>、<code v-pre>java</code> 还是某个恶意脚本占用了带宽。</p>
</li>
</ul>
<hr>
<h3 id="_3-详细会话监控-看连接细节" tabindex="-1"><a class="header-anchor" href="#_3-详细会话监控-看连接细节"><span>3. 详细会话监控（看连接细节）</span></a></h3>
<ul>
<li>
<p><code v-pre>**iptraf-ng**</code></p>
</li>
<li>
<p><strong>特点：</strong> 交互式菜单界面，可以查看具体的连接协议（TCP/UDP）、包大小分布等，适合排查网络异常。</p>
</li>
</ul>
<hr>
<h3 id="_4-历史流量统计-看昨天-本月用了多少" tabindex="-1"><a class="header-anchor" href="#_4-历史流量统计-看昨天-本月用了多少"><span>4. 历史流量统计（看昨天/本月用了多少）</span></a></h3>
<p>如果你想知道服务器这个月一共跑了多少流量（防止超支），需要这些带数据库功能的工具。</p>
<ul>
<li>
<p><code v-pre>**vnstat**</code></p>
</li>
<li>
<p><strong>特点：</strong> 轻量级后台服务。安装后会自动记录每天、每月的流量总额。</p>
</li>
<li>
<p><strong>查看：</strong><code v-pre>vnstat -d</code> (按天查看), <code v-pre>vnstat -m</code> (按月查看)。</p>
</li>
</ul>
<hr>
<h3 id="总结对照表" tabindex="-1"><a class="header-anchor" href="#总结对照表"><span>总结对照表</span></a></h3>
<table>
<thead>
<tr>
<th><strong>需求场景</strong></th>
<th><strong>推荐命令</strong></th>
<th><strong>关键优势</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>快速看总带宽</strong></td>
<td><code v-pre>nload</code>&lt;br&gt;/ <code v-pre>sar</code></td>
<td>无需配置，直观简单</td>
</tr>
<tr>
<td><strong>找出流量最高的进程</strong></td>
<td><code v-pre>nethogs</code></td>
<td>直指源头（按 PID 分类）</td>
</tr>
<tr>
<td><strong>查看具体的 IP 连接</strong></td>
<td><code v-pre>iftop</code></td>
<td>查明是在和哪个外部 IP 通信</td>
</tr>
<tr>
<td><strong>审计月度/年度流量</strong></td>
<td><code v-pre>vnstat</code></td>
<td>带有数据持久化功能</td>
</tr>
<tr>
<td><strong>深度协议抓包</strong></td>
<td><code v-pre>tcpdump</code></td>
<td>看到每一个字节的细节</td>
</tr>
</tbody>
</table>
<hr>
<h3 id="💡-小技巧-不安装工具怎么看" tabindex="-1"><a class="header-anchor" href="#💡-小技巧-不安装工具怎么看"><span>💡 小技巧：不安装工具怎么看？</span></a></h3>
<p>在没有任何第三方工具的服务器上，你可以直接读取系统内核文件：</p>
<p><code v-pre>watch -n 1 &quot;cat /proc/net/dev&quot;</code></p>
<p>这个文件记录了网卡自启动以来的累计字节数，通过 <code v-pre>watch</code> 每秒刷新，你自己心算一下差值就能得出即时带宽。</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};