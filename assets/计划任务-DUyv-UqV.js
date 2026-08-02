import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/firewalld(%E9%98%B2%E7%81%AB%E5%A2%99)/iptables%E5%91%BD%E4%BB%A4/%E8%AE%A1%E5%88%92%E4%BB%BB%E5%8A%A1.html","title":"计划任务","lang":"zh-CN","frontmatter":{"title":"计划任务","icon":"network","date":"2026-07-23T00:00:00.000Z","category":["计算机网络"],"description":"Crontab命令 crontab 是 Linux 下基于时间的任务调度器。其核心语法如下： 1. 语法格式 在配置文件中，每一行代表一个任务，格式为： * * * * * command_to_execute 2. 特殊符号 *：匹配任意值（每...）。 ,：枚举值（如 1,3,5 表示第 1, 3, 5 分钟）。 -：范围（如 1-5 表示周一到周...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"计划任务\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/firewalld(%E9%98%B2%E7%81%AB%E5%A2%99)/iptables%E5%91%BD%E4%BB%A4/%E8%AE%A1%E5%88%92%E4%BB%BB%E5%8A%A1.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"计划任务"}],["meta",{"property":"og:description","content":"Crontab命令 crontab 是 Linux 下基于时间的任务调度器。其核心语法如下： 1. 语法格式 在配置文件中，每一行代表一个任务，格式为： * * * * * command_to_execute 2. 特殊符号 *：匹配任意值（每...）。 ,：枚举值（如 1,3,5 表示第 1, 3, 5 分钟）。 -：范围（如 1-5 表示周一到周..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":1.55,"words":466},"filePathRelative":"posts/计算机网络/网络的概念/firewalld(防火墙)/iptables命令/计划任务.md","excerpt":"<h2>Crontab命令</h2>\\n<p><code>crontab</code> 是 Linux 下基于时间的任务调度器。其核心语法如下：</p>\\n<h3>1. 语法格式</h3>\\n<p>在配置文件中，每一行代表一个任务，格式为：</p>\\n<p><code>* * * * * command_to_execute</code></p>\\n<table>\\n<thead>\\n<tr>\\n<th><strong>字段</strong></th>\\n<th><strong>含义</strong></th>\\n<th><strong>取值范围</strong></th>\\n</tr>\\n</thead>\\n<tbody>\\n<tr>\\n<td><strong>第1位</strong></td>\\n<td>分钟 (Minute)</td>\\n<td>0 - 59</td>\\n</tr>\\n<tr>\\n<td><strong>第2位</strong></td>\\n<td>小时 (Hour)</td>\\n<td>0 - 23</td>\\n</tr>\\n<tr>\\n<td><strong>第3位</strong></td>\\n<td>日期 (Day of Month)</td>\\n<td>1 - 31</td>\\n</tr>\\n<tr>\\n<td><strong>第4位</strong></td>\\n<td>月份 (Month)</td>\\n<td>1 - 12</td>\\n</tr>\\n<tr>\\n<td><strong>第5位</strong></td>\\n<td>星期 (Day of Week)</td>\\n<td>0 - 7 (0和7均代表周日)</td>\\n</tr>\\n</tbody>\\n</table>","autoDesc":true}`),i={name:`计划任务.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><h2 id="crontab命令" tabindex="-1"><a class="header-anchor" href="#crontab命令"><span>Crontab命令</span></a></h2>
<p><code v-pre>crontab</code> 是 Linux 下基于时间的任务调度器。其核心语法如下：</p>
<h3 id="_1-语法格式" tabindex="-1"><a class="header-anchor" href="#_1-语法格式"><span>1. 语法格式</span></a></h3>
<p>在配置文件中，每一行代表一个任务，格式为：</p>
<p><code v-pre>* * * * * command_to_execute</code></p>
<table>
<thead>
<tr>
<th><strong>字段</strong></th>
<th><strong>含义</strong></th>
<th><strong>取值范围</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>第1位</strong></td>
<td>分钟 (Minute)</td>
<td>0 - 59</td>
</tr>
<tr>
<td><strong>第2位</strong></td>
<td>小时 (Hour)</td>
<td>0 - 23</td>
</tr>
<tr>
<td><strong>第3位</strong></td>
<td>日期 (Day of Month)</td>
<td>1 - 31</td>
</tr>
<tr>
<td><strong>第4位</strong></td>
<td>月份 (Month)</td>
<td>1 - 12</td>
</tr>
<tr>
<td><strong>第5位</strong></td>
<td>星期 (Day of Week)</td>
<td>0 - 7 (0和7均代表周日)</td>
</tr>
</tbody>
</table>
<hr>
<h3 id="_2-特殊符号" tabindex="-1"><a class="header-anchor" href="#_2-特殊符号"><span>2. 特殊符号</span></a></h3>
<ul>
<li><code v-pre>*</code>：匹配任意值（每...）。</li>
<li><code v-pre>,</code>：枚举值（如 <code v-pre>1,3,5</code> 表示第 1, 3, 5 分钟）。</li>
<li><code v-pre>-</code>：范围（如 <code v-pre>1-5</code> 表示周一到周五）。</li>
<li><code v-pre>/n</code>：间隔步长（如 <code v-pre>*/10</code> 表示每隔 10 个单位）。</li>
</ul>
<hr>
<h3 id="_3-管理命令" tabindex="-1"><a class="header-anchor" href="#_3-管理命令"><span>3. 管理命令</span></a></h3>
<ul>
<li><code v-pre>**crontab -e**</code>：编辑当前用户的任务列表（使用默认编辑器）。</li>
<li><code v-pre>**crontab -l**</code>：列出当前用户的所有定时任务。</li>
<li><code v-pre>**crontab -r**</code>：<strong>删除</strong>当前用户的所有任务（慎用）。</li>
<li><code v-pre>**crontab -u username -e**</code>：以管理员身份编辑指定用户的任务。</li>
</ul>
<hr>
<h3 id="_4-典型示例" tabindex="-1"><a class="header-anchor" href="#_4-典型示例"><span>4. 典型示例</span></a></h3>
<ul>
<li><strong>每分钟执行一次：</strong><code v-pre>* * * * * /usr/bin/script.sh</code></li>
<li><strong>每天凌晨 2:30 执行：</strong><code v-pre>30 2 * * * /usr/bin/backup.sh</code></li>
<li><strong>每小时的第 5 分钟执行：</strong><code v-pre>5 * * * * /usr/bin/check.sh</code></li>
<li><strong>每周一至周五 8:00 执行：</strong><code v-pre>0 8 * * 1-5 /usr/bin/work.sh</code></li>
<li><strong>每隔 5 天执行一次（0:00）：</strong><code v-pre>0 0 */5 * * /usr/bin/clean.sh</code></li>
</ul>
<hr>
<h3 id="_5-核心注意事项" tabindex="-1"><a class="header-anchor" href="#_5-核心注意事项"><span>5. 核心注意事项</span></a></h3>
<ol>
<li><strong>使用绝对路径</strong>：<code v-pre>crontab</code> 运行环境与用户登录环境不同，必须使用 <code v-pre>/usr/bin/python3</code> 而非 <code v-pre>python3</code>。</li>
<li><strong>标准输出处理</strong>：任务执行时的输出默认会发邮件给用户。建议重定向 到文件或丢弃：</li>
</ol>
<p><code v-pre>* * * * * /path/to/cmd &gt;&gt; /var/log/cron.log 2&gt;&amp;1</code></p>
<ol start="3">
<li><strong>环境变量</strong>：若脚本依赖特定环境变量，需在脚本开头显式 <code v-pre>source /etc/profile</code>。</li>
</ol>
<p>​</p>
<h2 id="iptables-crontab" tabindex="-1"><a class="header-anchor" href="#iptables-crontab"><span>iptables+crontab</span></a></h2>
<p>创建计划任务每分钟清除一次防火墙</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>crontab -e</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>添加规则</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>*/1 * * * * bash /iptables/clear_iptables_rules.sh</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>脚本内容</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>#!/bin/bash</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/usr/sbin/iptables -t nat -F</span></span>
<span class="line"><span>/usr/sbin/iptables -t filter -F</span></span>
<span class="line"><span>/usr/sbin/iptables -P INPUT ACCEPT</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};