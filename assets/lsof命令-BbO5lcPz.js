import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E4%BC%A0%E8%BE%93%E5%B1%82/%E7%AB%AF%E5%8F%A3%E7%9B%B8%E5%85%B3%E5%91%BD%E4%BB%A4/lsof%E5%91%BD%E4%BB%A4.html","title":"lsof命令","lang":"zh-CN","frontmatter":{"title":"lsof命令","icon":"network","date":"2026-07-23T00:00:00.000Z","category":["计算机网络"],"description":"在 Linux 的世界里，有一个核心哲学：“一切皆文件”（Everything is a file）。无论是普通的文本文件、硬件设备（如硬盘、网卡），还是网络连接（TCP/UDP 套接字），在系统底层都是以文件的形式存在的。 lsof 的全称就是 List Open Files，它的作用就是列出系统中当前所有被打开的文件信息。 1. lsof 输出内容...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"lsof命令\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E4%BC%A0%E8%BE%93%E5%B1%82/%E7%AB%AF%E5%8F%A3%E7%9B%B8%E5%85%B3%E5%91%BD%E4%BB%A4/lsof%E5%91%BD%E4%BB%A4.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"lsof命令"}],["meta",{"property":"og:description","content":"在 Linux 的世界里，有一个核心哲学：“一切皆文件”（Everything is a file）。无论是普通的文本文件、硬件设备（如硬盘、网卡），还是网络连接（TCP/UDP 套接字），在系统底层都是以文件的形式存在的。 lsof 的全称就是 List Open Files，它的作用就是列出系统中当前所有被打开的文件信息。 1. lsof 输出内容..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.33,"words":699},"filePathRelative":"posts/计算机网络/网络的概念/传输层/端口相关命令/lsof命令.md","excerpt":"<p>在 Linux 的世界里，有一个核心哲学：“<strong>一切皆文件</strong>”（Everything is a file）。无论是普通的文本文件、硬件设备（如硬盘、网卡），还是网络连接（TCP/UDP 套接字），在系统底层都是以文件的形式存在的。</p>\\n<p><code>lsof</code> 的全称就是 <strong>List Open Files</strong>，它的作用就是列出系统中当前所有被打开的文件信息。</p>\\n<hr>\\n<h3>1. <code>lsof</code> 输出内容的含义</h3>\\n<p>当你直接输入 <code>lsof</code> 时，会看到密密麻麻的表格，每一列都有特定含义：</p>","autoDesc":true}`),i={name:`lsof命令.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在 Linux 的世界里，有一个核心哲学：“<strong>一切皆文件</strong>”（Everything is a file）。无论是普通的文本文件、硬件设备（如硬盘、网卡），还是网络连接（TCP/UDP 套接字），在系统底层都是以文件的形式存在的。</p>
<p><code v-pre>lsof</code> 的全称就是 <strong>List Open Files</strong>，它的作用就是列出系统中当前所有被打开的文件信息。</p>
<hr>
<h3 id="_1-lsof-输出内容的含义" tabindex="-1"><a class="header-anchor" href="#_1-lsof-输出内容的含义"><span>1. <code v-pre>lsof</code> 输出内容的含义</span></a></h3>
<p>当你直接输入 <code v-pre>lsof</code> 时，会看到密密麻麻的表格，每一列都有特定含义：</p>
<ul>
<li><strong>COMMAND</strong>: 进程的名称。</li>
<li><strong>PID</strong>: 进程标识符。</li>
<li><strong>USER</strong>: 运行该进程的用户。</li>
<li><strong>FD (File Descriptor)</strong>: 文件描述符（如 <code v-pre>cwd</code> 是当前目录，<code v-pre>txt</code> 是程序代码，<code v-pre>0u</code> 是标准输入等）。</li>
<li><strong>TYPE</strong>: 文件类型（如 <code v-pre>REG</code> 是普通文件，<code v-pre>DIR</code> 是目录，<code v-pre>IPv4</code> 是网络连接）。</li>
<li><strong>NAME</strong>: 文件的确切路径或网络地址。</li>
</ul>
<hr>
<h3 id="_2-常用实战场景-必会命令" tabindex="-1"><a class="header-anchor" href="#_2-常用实战场景-必会命令"><span>2. 常用实战场景 (必会命令)</span></a></h3>
<h4 id="a-端口排查-最常用" tabindex="-1"><a class="header-anchor" href="#a-端口排查-最常用"><span>A. 端口排查（最常用）</span></a></h4>
<p>查看哪个进程占用了某个端口（比如 80 端口）：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>lsof -i :80</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>如果你想查看所有的网络连接：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>lsof -i</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h4 id="b-查找某个用户打开的文件" tabindex="-1"><a class="header-anchor" href="#b-查找某个用户打开的文件"><span>B. 查找某个用户打开的文件</span></a></h4>
<p>当你怀疑某个用户的进程消耗了太多资源时：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>lsof -u root</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h4 id="c-查看某个进程打开了哪些文件" tabindex="-1"><a class="header-anchor" href="#c-查看某个进程打开了哪些文件"><span>C. 查看某个进程打开了哪些文件</span></a></h4>
<p>如果你知道进程的 PID（假设是 1234）：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>lsof -p 1234</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h4 id="d-查看某个目录下被打开的文件" tabindex="-1"><a class="header-anchor" href="#d-查看某个目录下被打开的文件"><span>D. 查看某个目录下被打开的文件</span></a></h4>
<p>常用于排查“为什么我无法卸载（umount）这个 U 盘/磁盘”：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>lsof +D /var/log/</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><hr>
<h3 id="_3-高级进阶-组合拳技巧" tabindex="-1"><a class="header-anchor" href="#_3-高级进阶-组合拳技巧"><span>3. 高级进阶：组合拳技巧</span></a></h3>
<h4 id="技巧-1-恢复已删除但仍被占用的文件" tabindex="-1"><a class="header-anchor" href="#技巧-1-恢复已删除但仍被占用的文件"><span>技巧 1：恢复已删除但仍被占用的文件</span></a></h4>
<p>在 Linux 中，如果一个文件被进程占用，即使你执行了 <code v-pre>rm</code> 删除，磁盘空间也不会释放。</p>
<ol>
<li>用 <code v-pre>lsof | grep deleted</code> 找到这些文件。</li>
<li>通过 <code v-pre>/proc/[PID]/fd/[FD]</code> 甚至可以把误删的数据拷贝回来！</li>
</ol>
<h4 id="技巧-2-快速杀死占用端口的进程" tabindex="-1"><a class="header-anchor" href="#技巧-2-快速杀死占用端口的进程"><span>技巧 2：快速杀死占用端口的进程</span></a></h4>
<p>想关掉占用 3000 端口的流氓进程？</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>kill -9 $(lsof -t -i:3000)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><em>注：</em><code v-pre>*-t*</code> <em>参数让</em> <code v-pre>*lsof*</code> <em>只输出 PID，非常适合脚本调用。</em></p>
<hr>
<h3 id="_4-lsof-与-netstat-ss-的区别" tabindex="-1"><a class="header-anchor" href="#_4-lsof-与-netstat-ss-的区别"><span>4. <code v-pre>lsof</code> 与 <code v-pre>netstat</code> / <code v-pre>ss</code> 的区别</span></a></h3>
<table>
<thead>
<tr>
<th><strong>命令</strong></th>
<th><strong>侧重点</strong></th>
<th><strong>优势</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>lsof</code></td>
<td><strong>文件视角</strong></td>
<td>能关联进程与文件路径、硬件设备，非常全能。</td>
</tr>
<tr>
<td><code v-pre>netstat</code>&lt;br&gt;**/ **<code v-pre>ss</code></td>
<td><strong>网络视角</strong></td>
<td>专门处理 TCP/UDP 状态、队列等，网络信息更专业。</td>
</tr>
</tbody>
</table>
<hr>
<h3 id="​-避坑指南" tabindex="-1"><a class="header-anchor" href="#​-避坑指南"><span>​ 避坑指南</span></a></h3>
<ul>
<li><strong>权限问题</strong>：普通用户只能看到自己打开的文件。要查看系统级信息（如其他用户的进程或系统套接字），必须加 <code v-pre>sudo</code>。</li>
<li><strong>性能开销</strong>：在文件极多的繁忙服务器上，直接运行 <code v-pre>lsof</code> 可能会有明显的延迟，建议配合具体的参数（如 <code v-pre>-i</code> 或 <code v-pre>-p</code>）缩小范围。</li>
</ul>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};