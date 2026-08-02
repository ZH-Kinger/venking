import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E4%BC%A0%E8%BE%93%E5%B1%82/%E7%AB%AF%E5%8F%A3%E7%9B%B8%E5%85%B3%E5%91%BD%E4%BB%A4/nmap%E5%91%BD%E4%BB%A4.html","title":"nmap命令","lang":"zh-CN","frontmatter":{"title":"nmap命令","icon":"network","date":"2026-07-23T00:00:00.000Z","category":["计算机网络"],"description":"如果说 nc 是网络界的“瑞士军刀”，那么 **nmap** (Network Mapper) 就是“核动力扫描仪”。它是网络管理员和安全审计员最常用的工具，用于列举网络主机、发现服务、检测操作系统版本以及漏洞扫描。 1. nmap 的核心工作原理 nmap 通过发送经过精心设计的原始 IP 数据包（如 TCP SYN, UDP, ICMP 等），并分...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"nmap命令\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E4%BC%A0%E8%BE%93%E5%B1%82/%E7%AB%AF%E5%8F%A3%E7%9B%B8%E5%85%B3%E5%91%BD%E4%BB%A4/nmap%E5%91%BD%E4%BB%A4.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"nmap命令"}],["meta",{"property":"og:description","content":"如果说 nc 是网络界的“瑞士军刀”，那么 **nmap** (Network Mapper) 就是“核动力扫描仪”。它是网络管理员和安全审计员最常用的工具，用于列举网络主机、发现服务、检测操作系统版本以及漏洞扫描。 1. nmap 的核心工作原理 nmap 通过发送经过精心设计的原始 IP 数据包（如 TCP SYN, UDP, ICMP 等），并分..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.43,"words":728},"filePathRelative":"posts/计算机网络/网络的概念/传输层/端口相关命令/nmap命令.md","excerpt":"<p>如果说 <code>nc</code> 是网络界的“瑞士军刀”，那么 <code>**nmap**</code> <strong>(Network Mapper)</strong> 就是“核动力扫描仪”。它是网络管理员和安全审计员最常用的工具，用于列举网络主机、发现服务、检测操作系统版本以及漏洞扫描。</p>\\n<hr>\\n<h3>1. <code>nmap</code> 的核心工作原理</h3>\\n<p><code>nmap</code> 通过发送经过精心设计的原始 IP 数据包（如 TCP SYN, UDP, ICMP 等），并分析目标的响应来判断端口状态。</p>\\n<hr>\\n<h3>2. 常用命令参数速查表</h3>","autoDesc":true}`),i={name:`nmap命令.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>如果说 <code v-pre>nc</code> 是网络界的“瑞士军刀”，那么 <code v-pre>**nmap**</code> <strong>(Network Mapper)</strong> 就是“核动力扫描仪”。它是网络管理员和安全审计员最常用的工具，用于列举网络主机、发现服务、检测操作系统版本以及漏洞扫描。</p>
<hr>
<h3 id="_1-nmap-的核心工作原理" tabindex="-1"><a class="header-anchor" href="#_1-nmap-的核心工作原理"><span>1. <code v-pre>nmap</code> 的核心工作原理</span></a></h3>
<p><code v-pre>nmap</code> 通过发送经过精心设计的原始 IP 数据包（如 TCP SYN, UDP, ICMP 等），并分析目标的响应来判断端口状态。</p>
<hr>
<h3 id="_2-常用命令参数速查表" tabindex="-1"><a class="header-anchor" href="#_2-常用命令参数速查表"><span>2. 常用命令参数速查表</span></a></h3>
<p>根据你的需求，<code v-pre>nmap</code> 的用法可以从简单到复杂分为四个级别：</p>
<table>
<thead>
<tr>
<th><strong>级别</strong></th>
<th><strong>命令示例</strong></th>
<th><strong>功能描述</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>快速扫描</strong></td>
<td><code v-pre>nmap 192.168.1.1</code></td>
<td>扫描最常用的 1000 个 TCP 端口。</td>
</tr>
<tr>
<td><strong>指定端口</strong></td>
<td><code v-pre>nmap -p 80,443 192.168.1.1</code></td>
<td>仅扫描 80 和 443 端口。</td>
</tr>
<tr>
<td><strong>服务/版本探测</strong></td>
<td><code v-pre>nmap -sV 192.168.1.1</code></td>
<td><strong>最常用</strong>。探测端口运行的具体服务及版本号。</td>
</tr>
<tr>
<td><strong>操作系统识别</strong></td>
<td><code v-pre>nmap -O 192.168.1.1</code></td>
<td>通过指纹分析判断目标是 Linux, Windows 还是嵌入式设备。</td>
</tr>
<tr>
<td><strong>全面扫描</strong></td>
<td><code v-pre>nmap -A 192.168.1.1</code></td>
<td>强力模式：包含版本探测、OS识别、脚本扫描和路由追踪。</td>
</tr>
<tr>
<td><strong>网段存活扫描</strong></td>
<td><code v-pre>nmap -sn 192.168.1.0/24</code></td>
<td>“Ping 扫描”，只查看哪些机器开机，不扫描端口。</td>
</tr>
</tbody>
</table>
<hr>
<h3 id="_3-理解扫描结果的-六种状态" tabindex="-1"><a class="header-anchor" href="#_3-理解扫描结果的-六种状态"><span>3. 理解扫描结果的“六种状态”</span></a></h3>
<p><code v-pre>nmap</code> 返回的不仅仅是“开”或“关”，它有更细致的定义：</p>
<ul>
<li><strong>open</strong>：应用程序正在此端口监听连接。</li>
<li><strong>closed</strong>：端口接收到了包，但没有程序在监听。</li>
<li><strong>filtered</strong>：<strong>最常见于防火墙环境</strong>。<code v-pre>nmap</code> 无法确定端口是否开放，因为数据包被过滤掉（无回应）。</li>
<li><strong>unfiltered</strong>：端口可访问，但 <code v-pre>nmap</code> 无法确定其开关状态（通常出现在 ACK 扫描中）。</li>
<li><strong>open|filtered</strong>：无法确定是开放还是被过滤。</li>
<li><strong>closed|filtered</strong>：无法确定是关闭还是被过滤。</li>
</ul>
<hr>
<h3 id="_4-高级进阶-nse-脚本引擎" tabindex="-1"><a class="header-anchor" href="#_4-高级进阶-nse-脚本引擎"><span>4. 高级进阶：NSE 脚本引擎</span></a></h3>
<p><code v-pre>nmap</code> 真正恐怖的地方在于它的脚本引擎 (<strong>NSE</strong>)。你可以通过 <code v-pre>--script</code> 参数调用数以百计的现成脚本进行漏洞探测。</p>
<ul>
<li><strong>漏洞扫描：</strong><code v-pre>nmap --script vuln 192.168.1.1</code> (自动检查目标是否存在常见 CVE 漏洞)</li>
<li><strong>暴力破解：</strong><code v-pre>nmap --script ssh-brute 192.168.1.1</code> (尝试破解 SSH 密码)</li>
</ul>
<hr>
<h3 id="_5-一个实用的-全能型-命令建议" tabindex="-1"><a class="header-anchor" href="#_5-一个实用的-全能型-命令建议"><span>5. 一个实用的“全能型”命令建议</span></a></h3>
<p>如果你在排查一台服务器的详细信息，建议使用这条组合命令：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>nmap -sS -sV -T4 -A -v 192.168.1.1</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ul>
<li><code v-pre>-sS</code>：半开放扫描（SYN），隐蔽且快。</li>
<li><code v-pre>-sV</code>：查版本。</li>
<li><code v-pre>-T4</code>：设置速度等级（1-5，4 比较平衡）。</li>
<li><code v-pre>-v</code>：显示实时扫描进度。</li>
</ul>
<hr>
<h3 id="⚠️-安全提醒" tabindex="-1"><a class="header-anchor" href="#⚠️-安全提醒"><span>⚠️ 安全提醒</span></a></h3>
<ul>
<li><strong>法律风险</strong>：未经授权扫描他人服务器在很多国家是非法的。</li>
<li><strong>隐蔽性</strong>：普通扫描很容易被 IDS（入侵检测系统）或防火墙拦截。如果你需要更隐蔽的扫描，可能需要研究 <code v-pre>-f</code> (分片) 或 <code v-pre>--spoof</code> (伪造 IP) 参数。</li>
</ul>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};