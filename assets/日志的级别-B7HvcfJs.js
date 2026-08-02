import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/firewalld(%E9%98%B2%E7%81%AB%E5%A2%99)/iptables%E5%91%BD%E4%BB%A4/%E6%97%A5%E5%BF%97%E7%9A%84%E7%BA%A7%E5%88%AB.html","title":"日志的级别","lang":"zh-CN","frontmatter":{"title":"日志的级别","icon":"network","date":"2026-07-23T00:00:00.000Z","category":["计算机网络"],"description":"在 IT 系统和软件开发中，日志级别（Log Levels）是对信息严重程度的分类。它能帮助开发者在海量信息中快速过滤出关键问题。 目前业界最通用的标准是基于 RFC 5424（Syslog 标准）定义的 8 个级别，但在一般的应用开发（如 Python Flask、Java Spring、Log4j）中，常用的主要是以下 5 到 6 种。 1. 常用...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"日志的级别\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/firewalld(%E9%98%B2%E7%81%AB%E5%A2%99)/iptables%E5%91%BD%E4%BB%A4/%E6%97%A5%E5%BF%97%E7%9A%84%E7%BA%A7%E5%88%AB.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"日志的级别"}],["meta",{"property":"og:description","content":"在 IT 系统和软件开发中，日志级别（Log Levels）是对信息严重程度的分类。它能帮助开发者在海量信息中快速过滤出关键问题。 目前业界最通用的标准是基于 RFC 5424（Syslog 标准）定义的 8 个级别，但在一般的应用开发（如 Python Flask、Java Spring、Log4j）中，常用的主要是以下 5 到 6 种。 1. 常用..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.27,"words":680},"filePathRelative":"posts/计算机网络/网络的概念/firewalld(防火墙)/iptables命令/日志的级别.md","excerpt":"<p>在 IT 系统和软件开发中，日志级别（Log Levels）是对信息<strong>严重程度</strong>的分类。它能帮助开发者在海量信息中快速过滤出关键问题。</p>\\n<p>目前业界最通用的标准是基于 <strong>RFC 5424</strong>（Syslog 标准）定义的 8 个级别，但在一般的应用开发（如 Python Flask、Java Spring、Log4j）中，常用的主要是以下 5 到 6 种。</p>\\n<hr>\\n<h3>1. 常用日志级别（从轻到重）</h3>\\n<table>\\n<thead>\\n<tr>\\n<th><strong>级别</strong></th>\\n<th><strong>英文名</strong></th>\\n<th><strong>含义</strong></th>\\n<th><strong>场景示例</strong></th>\\n</tr>\\n</thead>\\n<tbody>\\n<tr>\\n<td><strong>调试</strong></td>\\n<td><strong>DEBUG</strong></td>\\n<td>最详尽的信息。仅在开发阶段或排查复杂问题时开启。</td>\\n<td>&quot;变量 <code>x</code>&lt;br&gt;的值当前为 10&quot;, &quot;数据库查询耗时 5ms&quot;</td>\\n</tr>\\n<tr>\\n<td><strong>信息</strong></td>\\n<td><strong>INFO</strong></td>\\n<td>记录系统的正常运行状态。通常作为生产环境的默认级别。</td>\\n<td>&quot;用户 <code>admin</code>&lt;br&gt;登录成功&quot;, &quot;服务已在端口 8080 启动&quot;</td>\\n</tr>\\n<tr>\\n<td><strong>警告</strong></td>\\n<td><strong>WARN</strong></td>\\n<td>出现了非预期的异常，但系统仍能继续运行，不需要立即干预。</td>\\n<td>&quot;磁盘空间剩余不足 10%&quot;, &quot;接口调用响应过慢&quot;</td>\\n</tr>\\n<tr>\\n<td><strong>错误</strong></td>\\n<td><strong>ERROR</strong></td>\\n<td>发生了严重问题，导致某个功能失效，需要引起重视。</td>\\n<td>&quot;无法连接数据库&quot;, &quot;用户上传文件失败&quot;, &quot;代码抛出 NullPointerException&quot;</td>\\n</tr>\\n<tr>\\n<td><strong>致命</strong></td>\\n<td><strong>FATAL</strong> / <strong>CRITICAL</strong></td>\\n<td><strong>最严重</strong>。导致系统崩溃、无法提供服务的事故。</td>\\n<td>&quot;主进程意外退出&quot;, &quot;服务器内存溢出 (OOM)&quot;, &quot;核心硬件故障&quot;</td>\\n</tr>\\n</tbody>\\n</table>","autoDesc":true}`),i={name:`日志的级别.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在 IT 系统和软件开发中，日志级别（Log Levels）是对信息<strong>严重程度</strong>的分类。它能帮助开发者在海量信息中快速过滤出关键问题。</p>
<p>目前业界最通用的标准是基于 <strong>RFC 5424</strong>（Syslog 标准）定义的 8 个级别，但在一般的应用开发（如 Python Flask、Java Spring、Log4j）中，常用的主要是以下 5 到 6 种。</p>
<hr>
<h3 id="_1-常用日志级别-从轻到重" tabindex="-1"><a class="header-anchor" href="#_1-常用日志级别-从轻到重"><span>1. 常用日志级别（从轻到重）</span></a></h3>
<table>
<thead>
<tr>
<th><strong>级别</strong></th>
<th><strong>英文名</strong></th>
<th><strong>含义</strong></th>
<th><strong>场景示例</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>调试</strong></td>
<td><strong>DEBUG</strong></td>
<td>最详尽的信息。仅在开发阶段或排查复杂问题时开启。</td>
<td>&quot;变量 <code v-pre>x</code>&lt;br&gt;的值当前为 10&quot;, &quot;数据库查询耗时 5ms&quot;</td>
</tr>
<tr>
<td><strong>信息</strong></td>
<td><strong>INFO</strong></td>
<td>记录系统的正常运行状态。通常作为生产环境的默认级别。</td>
<td>&quot;用户 <code v-pre>admin</code>&lt;br&gt;登录成功&quot;, &quot;服务已在端口 8080 启动&quot;</td>
</tr>
<tr>
<td><strong>警告</strong></td>
<td><strong>WARN</strong></td>
<td>出现了非预期的异常，但系统仍能继续运行，不需要立即干预。</td>
<td>&quot;磁盘空间剩余不足 10%&quot;, &quot;接口调用响应过慢&quot;</td>
</tr>
<tr>
<td><strong>错误</strong></td>
<td><strong>ERROR</strong></td>
<td>发生了严重问题，导致某个功能失效，需要引起重视。</td>
<td>&quot;无法连接数据库&quot;, &quot;用户上传文件失败&quot;, &quot;代码抛出 NullPointerException&quot;</td>
</tr>
<tr>
<td><strong>致命</strong></td>
<td><strong>FATAL</strong> / <strong>CRITICAL</strong></td>
<td><strong>最严重</strong>。导致系统崩溃、无法提供服务的事故。</td>
<td>&quot;主进程意外退出&quot;, &quot;服务器内存溢出 (OOM)&quot;, &quot;核心硬件故障&quot;</td>
</tr>
</tbody>
</table>
<hr>
<h3 id="_2-特殊级别" tabindex="-1"><a class="header-anchor" href="#_2-特殊级别"><span>2. 特殊级别</span></a></h3>
<p>除了上述五个，还有两个控制级别的开关：</p>
<ul>
<li><strong>TRACE</strong>：比 DEBUG 更细，通常记录每一步代码的执行流，甚至是方法进入/退出。</li>
<li><strong>ALL</strong>：开启所有级别的日志。</li>
<li><strong>OFF</strong>：关闭所有日志输出。</li>
</ul>
<hr>
<h3 id="_3-日志的-向上兼容-原则" tabindex="-1"><a class="header-anchor" href="#_3-日志的-向上兼容-原则"><span>3. 日志的“向上兼容”原则</span></a></h3>
<p>日志系统通常遵循一个规则：<strong>一旦你设置了某个级别，系统会记录该级别及以上的所有日志。</strong></p>
<p><strong>举个例子：</strong></p>
<ul>
<li>如果你设置级别为 <code v-pre>**INFO**</code>，那么 <code v-pre>INFO</code>、<code v-pre>WARN</code>、<code v-pre>ERROR</code>、<code v-pre>FATAL</code> 都会被记录，但 <code v-pre>DEBUG</code> 和 <code v-pre>TRACE</code> 会被过滤掉。</li>
<li>如果你在生产环境由于硬盘告急想减少日志，可以将级别调高至 <code v-pre>**ERROR**</code>，此时 <code v-pre>INFO</code> 和 <code v-pre>WARN</code> 都不会再打印。</li>
</ul>
<hr>
<h3 id="_4-最佳实践提示" tabindex="-1"><a class="header-anchor" href="#_4-最佳实践提示"><span>4. 最佳实践提示</span></a></h3>
<ol>
<li><strong>生产环境禁止 DEBUG</strong>：DEBUG 日志量极大，会迅速占满磁盘并严重拖慢系统性能（因为写磁盘是耗时操作）。</li>
<li><strong>动态调整</strong>：成熟的系统（如 Spring Boot 或 Flask）支持在不重启服务的情况下，通过接口动态修改日志级别，方便在线调试。</li>
<li><strong>结构化日志</strong>：建议使用 JSON 格式记录日志，方便后续配合 <strong>ELK</strong>（Elasticsearch, Logstash, Kibana）进行检索和可视化分析。</li>
</ol>
<hr>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};