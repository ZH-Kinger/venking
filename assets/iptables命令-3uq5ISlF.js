import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/firewalld(%E9%98%B2%E7%81%AB%E5%A2%99)/iptables%E5%91%BD%E4%BB%A4.html","title":"iptables命令","lang":"zh-CN","frontmatter":{"title":"iptables命令","icon":"network","date":"2026-07-23T00:00:00.000Z","category":["计算机网络"],"description":"iptables iptables 是 Linux 内核集成的 IP 信息包过滤系统（Netfilter）的用户层配置工具。它通过一系列表（Tables）、链（Chains）和规则（Rules）来控制进出系统的网络数据流。 1. 核心四表五链 (The 4 Tables &amp; 5 Chains) 理解 iptables 的关键在于掌握数据包在内核...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"iptables命令\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/iptables%E5%91%BD%E4%BB%A4-1.webp\\",\\"https://venking.tech/blog/blog/assets/posts/iptables%E5%91%BD%E4%BB%A4-2.png\\",\\"https://venking.tech/blog/blog/assets/posts/iptables%E5%91%BD%E4%BB%A4-3.png\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/firewalld(%E9%98%B2%E7%81%AB%E5%A2%99)/iptables%E5%91%BD%E4%BB%A4.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"iptables命令"}],["meta",{"property":"og:description","content":"iptables iptables 是 Linux 内核集成的 IP 信息包过滤系统（Netfilter）的用户层配置工具。它通过一系列表（Tables）、链（Chains）和规则（Rules）来控制进出系统的网络数据流。 1. 核心四表五链 (The 4 Tables &amp; 5 Chains) 理解 iptables 的关键在于掌握数据包在内核..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/iptables%E5%91%BD%E4%BB%A4-1.webp"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":5.07,"words":1522},"filePathRelative":"posts/计算机网络/网络的概念/firewalld(防火墙)/iptables命令.md","excerpt":"<h2>iptables</h2>\\n<p><code>iptables</code> 是 Linux 内核集成的 IP 信息包过滤系统（Netfilter）的用户层配置工具。它通过一系列<strong>表（Tables）</strong>、链（Chains）<strong>和</strong>规则（Rules）来控制进出系统的网络数据流。</p>\\n<figure><img src=\\"/blog/assets/posts/iptables%E5%91%BD%E4%BB%A4-1.webp\\" alt tabindex=\\"0\\" loading=\\"lazy\\"><figcaption></figcaption></figure>","autoDesc":true}`),i={name:`iptables命令.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><h2 id="iptables" tabindex="-1"><a class="header-anchor" href="#iptables"><span>iptables</span></a></h2>
<p><code v-pre>iptables</code> 是 Linux 内核集成的 IP 信息包过滤系统（Netfilter）的用户层配置工具。它通过一系列<strong>表（Tables）</strong>、链（Chains）<strong>和</strong>规则（Rules）来控制进出系统的网络数据流。</p>
<figure><img src="/blog/assets/posts/iptables%E5%91%BD%E4%BB%A4-1.webp" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<hr>
<h2 id="_1-核心四表五链-the-4-tables-5-chains" tabindex="-1"><a class="header-anchor" href="#_1-核心四表五链-the-4-tables-5-chains"><span>1. 核心四表五链 (The 4 Tables &amp; 5 Chains)</span></a></h2>
<p>理解 <code v-pre>iptables</code> 的关键在于掌握数据包在内核中的“旅行路线”。</p>
<figure><img src="/blog/assets/posts/iptables%E5%91%BD%E4%BB%A4-2.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<figure><img src="/blog/assets/posts/iptables%E5%91%BD%E4%BB%A4-3.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="四张表-功能分类" tabindex="-1"><a class="header-anchor" href="#四张表-功能分类"><span><strong>四张表（功能分类）</strong></span></a></h3>
<ol>
<li><strong>Filter 表</strong>（默认表）：负责过滤数据包（允许/拒绝）。</li>
<li><strong>NAT 表</strong>：负责网络地址转换（修改源/目的 IP 或端口）。</li>
<li><strong>Mangle 表</strong>：负责修改数据包内容（如设置 TOS、TTL 或标记数据包）。</li>
<li><strong>Raw 表</strong>：负责关闭连接追踪机制（提高性能，防止状态跟踪）。</li>
</ol>
<h4 id="优先级排序-从高到低" tabindex="-1"><a class="header-anchor" href="#优先级排序-从高到低"><span>优先级排序（从高到低）</span></a></h4>
<p>如果多张表同时作用在同一个钩子点，处理顺序如下：</p>
<p><code v-pre>raw</code> (最高优先级)：用于脱离连接跟踪（Connection Tracking）。</p>
<p><code v-pre>mangle</code>：用于修改数据包内容（TTL, TOS, Mark）。</p>
<p><code v-pre>nat</code> (dst)：目的地址转换（DNAT）。</p>
<p><code v-pre>filter</code>：数据包过滤（放行/丢弃）。</p>
<p><code v-pre>nat</code> (src)：源地址转换（SNAT）。</p>
<h3 id="五条链-处理时机" tabindex="-1"><a class="header-anchor" href="#五条链-处理时机"><span><strong>五条链（处理时机）</strong></span></a></h3>
<ul>
<li><strong>PREROUTING</strong>：数据包刚到达网络接口，路由决策前。</li>
<li><strong>INPUT</strong>：数据包目的地为本机。</li>
<li><strong>FORWARD</strong>：数据包只是路过本机，转发到其他目标。</li>
<li><strong>OUTPUT</strong>：本机产生的数据包向外发送。</li>
<li><strong>POSTROUTING</strong>：数据包离开网络接口前，路由决策后。</li>
</ul>
<hr>
<h2 id="_2-命令基本语法" tabindex="-1"><a class="header-anchor" href="#_2-命令基本语法"><span>2. 命令基本语法</span></a></h2>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>iptables [-t 表名] 选项 [链名] [条件匹配] [-j 处理动作]</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="_1-命令操作选项-commands" tabindex="-1"><a class="header-anchor" href="#_1-命令操作选项-commands"><span>1. 命令操作选项 (Commands)</span></a></h3>
<p>这些选项告诉 <code v-pre>iptables</code> 你要对“规则链”做什么。</p>
<table>
<thead>
<tr>
<th><strong>选项</strong></th>
<th><strong>全称</strong></th>
<th><strong>含义</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>-A</code></td>
<td><code v-pre>--append</code></td>
<td><strong>追加</strong>。在链的末尾添加一条规则（最常用）。</td>
</tr>
<tr>
<td><code v-pre>-I</code></td>
<td><code v-pre>--insert</code></td>
<td><strong>插入</strong>。在链的开头（或指定行号）插入规则，<strong>优先级最高</strong>。</td>
</tr>
<tr>
<td><code v-pre>-D</code></td>
<td><code v-pre>--delete</code></td>
<td><strong>删除</strong>。按内容或行号删除规则。</td>
</tr>
<tr>
<td><code v-pre>-R</code></td>
<td><code v-pre>--replace</code></td>
<td><strong>替换</strong>。修改现有规则。</td>
</tr>
<tr>
<td><code v-pre>-L</code></td>
<td><code v-pre>--list</code></td>
<td><strong>列出</strong>。查看当前表中的所有规则。</td>
</tr>
<tr>
<td><code v-pre>-F</code></td>
<td><code v-pre>--flush</code></td>
<td><strong>清空</strong>。删除选定表中的所有规则。</td>
</tr>
<tr>
<td><code v-pre>-P</code></td>
<td><code v-pre>--policy</code></td>
<td><strong>设置默认策略</strong>。比如 <code v-pre>iptables -P INPUT DROP</code>&lt;br&gt;（默认全拦）。</td>
</tr>
<tr>
<td>-N</td>
<td>--new</td>
<td><strong>新建一个自定义链</strong></td>
</tr>
</tbody>
</table>
<hr>
<h3 id="_2-数据包匹配条件-parameters" tabindex="-1"><a class="header-anchor" href="#_2-数据包匹配条件-parameters"><span>2. 数据包匹配条件 (Parameters)</span></a></h3>
<p>这些选项决定了哪些包会被这条规则“抓到”。</p>
<ul>
<li>
<p><code v-pre>**-p**</code> (<code v-pre>--protocol</code>)：指定协议。常用的有 <code v-pre>tcp</code>, <code v-pre>udp</code>, <code v-pre>icmp</code>, <code v-pre>all</code>。</p>
</li>
<li>
<p><code v-pre>**-s**</code> (<code v-pre>--source</code>)：源地址。支持 IP 或网段（如 <code v-pre>192.168.1.1</code> 或 <code v-pre>192.168.1.0/24</code>）。</p>
</li>
<li>
<p><code v-pre>**-d**</code> (<code v-pre>--destination</code>)：目的地址。</p>
</li>
<li>
<p><code v-pre>**--sport**</code> / <code v-pre>**--dport**</code>：源端口 / 目的端口（<strong>注意：</strong> 必须先用 <code v-pre>-p</code> 指定协议才能用端口）。</p>
</li>
<li>
<p><code v-pre>**-m**</code> (<code v-pre>--match</code>)：调用扩展模块。比如：</p>
</li>
<li>
<p><code v-pre>-m state --state ESTABLISHED</code>：匹配已建立连接的状态。</p>
</li>
<li>
<p><code v-pre>-m limit --limit 5/min</code>：限制匹配速率（防洪水攻击）。</p>
</li>
<li>
<p><code v-pre>-m mac --mac-source</code>：匹配特定的 MAC 地址。</p>
</li>
<li>
<p>-m multiport ：允许指定多个不连续的端口。</p>
</li>
</ul>
<hr>
<h3 id="_3-网络接口与辅助选项-interfaces-misc" tabindex="-1"><a class="header-anchor" href="#_3-网络接口与辅助选项-interfaces-misc"><span>3. 网络接口与辅助选项 (Interfaces &amp; Misc)</span></a></h3>
<ul>
<li><code v-pre>**-i**</code> (<code v-pre>--in-interface</code>)：数据包<strong>进入</strong>的网卡（如 <code v-pre>eth0</code>, <code v-pre>lo</code>）通常用于 <code v-pre>INPUT</code> 和 <code v-pre>PREROUTING</code>。</li>
<li><code v-pre>**-o**</code> (<code v-pre>--out-interface</code>)：数据包<strong>发出</strong>的网卡。通常用于 <code v-pre>OUTPUT</code> 和 <code v-pre>POSTROUTING</code>。</li>
<li><code v-pre>**-n**</code> (<code v-pre>--numeric</code>)：数字显示。禁止把 IP 解析成域名，把端口解析成服务名（查看规则时<strong>速度极快</strong>）。</li>
<li><code v-pre>**-v**</code> (<code v-pre>--verbose</code>)：详细模式。显示通过该规则的数据包数量和字节数。</li>
<li><code v-pre>**--line-numbers**</code>：显示规则行号。</li>
</ul>
<hr>
<h3 id="_4-处理动作-target" tabindex="-1"><a class="header-anchor" href="#_4-处理动作-target"><span>4. 处理动作 (Target)</span></a></h3>
<p>由 <code v-pre>**-j**</code> (<code v-pre>--jump</code>) 引出，决定包的生死。</p>
<ul>
<li><code v-pre>**ACCEPT**</code>：允许包通过。</li>
<li><code v-pre>**DROP**</code>：悄悄丢弃包，不回复。</li>
<li><code v-pre>**REJECT**</code>：拒绝包，并给对方回一个“我很忙/拒绝访问”的信息。</li>
<li><code v-pre>**LOG**</code>：在内核日志（<code v-pre>/var/log/messages</code>）里记录这个包的信息，然后继续匹配下一条规则。</li>
<li><code v-pre>**SNAT**</code> <strong>/</strong> <code v-pre>**DNAT**</code>：源/目的地址转换。</li>
<li><code v-pre>**MASQUERADE**</code>：特殊的 SNAT，用于动态拨号上网。</li>
</ul>
<hr>
<h2 id="_3-常用操作指令" tabindex="-1"><a class="header-anchor" href="#_3-常用操作指令"><span>3. 常用操作指令</span></a></h2>
<h3 id="查询与管理" tabindex="-1"><a class="header-anchor" href="#查询与管理"><span><strong>查询与管理</strong></span></a></h3>
<ul>
<li><strong>列出规则</strong>：<code v-pre>iptables -L -n -v</code>（<code v-pre>-n</code> 数字显示，<code v-pre>-v</code> 详细信息）。</li>
<li><strong>清空规则</strong>：<code v-pre>iptables -F</code>（清除所有规则，注意：这可能会导致远程连接中断，如果默认策略是 DROP）。</li>
<li><strong>删除特定规则</strong>：<code v-pre>iptables -D INPUT 2</code>（删除 INPUT 链中的第 2 条规则）。</li>
</ul>
<h3 id="常见配置场景" tabindex="-1"><a class="header-anchor" href="#常见配置场景"><span><strong>常见配置场景</strong></span></a></h3>
<h4 id="a-基础安全设置" tabindex="-1"><a class="header-anchor" href="#a-基础安全设置"><span><strong>A. 基础安全设置</strong></span></a></h4>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 允许本地回环接口（本地服务通信必需）</span></span>
<span class="line"><span>iptables -A INPUT -i lo -j ACCEPT</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 允许已建立的连接和相关的连接（保证你发出的请求能收到回包）</span></span>
<span class="line"><span>iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 开放 SSH 端口 (22)</span></span>
<span class="line"><span>iptables -A INPUT -p tcp --dport 22 -j ACCEPT</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 设置默认策略为丢弃（白名单模式，最安全）</span></span>
<span class="line"><span>iptables -P INPUT DROP</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="b-限制访问" tabindex="-1"><a class="header-anchor" href="#b-限制访问"><span><strong>B. 限制访问</strong></span></a></h4>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 屏蔽特定 IP 地址</span></span>
<span class="line"><span>iptables -I INPUT -s 192.168.1.100 -j DROP</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 屏蔽一个 IP 段</span></span>
<span class="line"><span>iptables -A INPUT -s 10.0.0.0/8 -j REJECT</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 限制单 IP 的并发连接数（防简单的 CC 攻击）</span></span>
<span class="line"><span>iptables -I INPUT -p tcp --dport 80 -m connlimit --connlimit-above 20 -j REJECT</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="c-端口转发-nat" tabindex="-1"><a class="header-anchor" href="#c-端口转发-nat"><span><strong>C. 端口转发 (NAT)</strong></span></a></h4>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 将访问本机 80 端口的流量转发到内部服务器 192.168.1.2 的 8080 端口</span></span>
<span class="line"><span>iptables -t nat -A PREROUTING -p tcp --dport 80 -j DNAT --to-destination 192.168.1.2:8080</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 开启 SNAT（共享上网）</span></span>
<span class="line"><span>iptables -t nat -A POSTROUTING -s 192.168.1.0/24 -o eth0 -j MASQUERADE</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="_4-规则匹配流程" tabindex="-1"><a class="header-anchor" href="#_4-规则匹配流程"><span>4. 规则匹配流程</span></a></h2>
<p><code v-pre>iptables</code> 的规则是<strong>从上到下按顺序匹配</strong>的：</p>
<ol>
<li>一旦匹配到某条规则，就会执行相应的动作（ACCEPT/DROP），并不再继续向下检查（LOG 动作除外）。</li>
<li>如果所有规则都没匹配上，则执行该链的<strong>默认策略 (Policy)</strong>。</li>
</ol>
<p><strong>​</strong> <strong>重要警告：</strong> &gt; <code v-pre>iptables</code> 的修改是即时生效的，但重启后会丢失。</p>
<ul>
<li>在 CentOS/RHEL 上使用：<code v-pre>service iptables save</code></li>
<li>在 Ubuntu/Debian 上使用：<code v-pre>iptables-save &gt; /etc/iptables/rules.v4</code></li>
</ul>
<hr>
<h2 id="_5-现代替代方案-nftables" tabindex="-1"><a class="header-anchor" href="#_5-现代替代方案-nftables"><span>5. 现代替代方案：nftables</span></a></h2>
<p>虽然 <code v-pre>iptables</code> 依然经典，但在现代 Linux 内核中（如 RHEL 8+, Debian 10+），它正逐渐被 <code v-pre>nftables</code> 取代。<code v-pre>nftables</code> 拥有更简洁的语法和更高的执行效率。此外，许多人更倾向于使用更简单的封装工具，如：</p>
<ul>
<li><strong>UFW</strong> (Uncomplicated Firewall)：Ubuntu 默认。</li>
<li><strong>firewalld</strong>：CentOS/Fedora 默认，支持“区域 (Zones)”概念。</li>
</ul>
<p><strong>如果你正面临某个具体的网络访问问题（例如：Web 服务器无法访问或需要设置内网穿透），需要我为你编写一套完整的防火墙脚本吗？</strong></p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};