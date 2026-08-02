import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%BF%90%E7%BB%B4/web%E9%9B%86%E7%BE%A4/web%E9%9B%86%E7%BE%A4%E9%A1%B9%E7%9B%AE/%E4%BA%94%E3%80%81Ansible_%E5%AE%89%E8%A3%85/Ansible%E5%B8%B8%E7%94%A8%E5%91%BD%E4%BB%A4.html","title":"Ansible常用命令","lang":"zh-CN","frontmatter":{"title":"Ansible常用命令","icon":"server","date":"2026-07-23T00:00:00.000Z","category":["运维"],"description":"梓涵，根据你之前在 ZH-Kinger 项目中的实战经验，以及参考卢陈、全妍等人的面试笔记，我为你整理了一份最全的 Ansible 常用命令手册。 这份手册不仅包含基础命令，还结合了你在扩容 Web 节点、配置 VIP、执行内核调优时最真实的用法。 一、 临时任务执行（Ad-hoc 命令） 这种方式不需要写剧本，适合临时查看系统状态或快速下发简单指令。...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Ansible常用命令\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%BF%90%E7%BB%B4/web%E9%9B%86%E7%BE%A4/web%E9%9B%86%E7%BE%A4%E9%A1%B9%E7%9B%AE/%E4%BA%94%E3%80%81Ansible_%E5%AE%89%E8%A3%85/Ansible%E5%B8%B8%E7%94%A8%E5%91%BD%E4%BB%A4.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"Ansible常用命令"}],["meta",{"property":"og:description","content":"梓涵，根据你之前在 ZH-Kinger 项目中的实战经验，以及参考卢陈、全妍等人的面试笔记，我为你整理了一份最全的 Ansible 常用命令手册。 这份手册不仅包含基础命令，还结合了你在扩容 Web 节点、配置 VIP、执行内核调优时最真实的用法。 一、 临时任务执行（Ad-hoc 命令） 这种方式不需要写剧本，适合临时查看系统状态或快速下发简单指令。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.81,"words":844},"filePathRelative":"posts/运维/web集群/web集群项目/五、Ansible_安装/Ansible常用命令.md","excerpt":"<p>梓涵，根据你之前在 <strong>ZH-Kinger</strong> 项目中的实战经验，以及参考卢陈、全妍等人的面试笔记，我为你整理了一份最全的 Ansible 常用命令手册。</p>\\n<p>这份手册不仅包含基础命令，还结合了你在扩容 Web 节点、配置 VIP、执行内核调优时最真实的用法。</p>\\n<hr>\\n<h3>一、 临时任务执行（Ad-hoc 命令）</h3>\\n<p>这种方式不需要写剧本，适合临时查看系统状态或快速下发简单指令。</p>\\n<p>格式：<code>ansible &lt;主机组&gt; -m &lt;模块名&gt; -a &lt;参数&gt;</code></p>","autoDesc":true}`),i={name:`Ansible常用命令.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>梓涵，根据你之前在 <strong>ZH-Kinger</strong> 项目中的实战经验，以及参考卢陈、全妍等人的面试笔记，我为你整理了一份最全的 Ansible 常用命令手册。</p>
<p>这份手册不仅包含基础命令，还结合了你在扩容 Web 节点、配置 VIP、执行内核调优时最真实的用法。</p>
<hr>
<h3 id="一、-临时任务执行-ad-hoc-命令" tabindex="-1"><a class="header-anchor" href="#一、-临时任务执行-ad-hoc-命令"><span>一、 临时任务执行（Ad-hoc 命令）</span></a></h3>
<p>这种方式不需要写剧本，适合临时查看系统状态或快速下发简单指令。</p>
<p>格式：<code v-pre>ansible &lt;主机组&gt; -m &lt;模块名&gt; -a &lt;参数&gt;</code></p>
<table>
<thead>
<tr>
<th><strong>常用模块</strong></th>
<th><strong>场景及命令示例</strong></th>
<th><strong>关键点</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>ping</strong></td>
<td><code v-pre>ansible all -m ping</code></td>
<td>测试 SSH 连通性。</td>
</tr>
<tr>
<td><strong>setup</strong></td>
<td><code v-pre>ansible web -m setup</code></td>
<td><strong>必考！</strong> 收集 Facts 信息（如 IP、内存、内核版本）。</td>
</tr>
<tr>
<td><strong>shell</strong></td>
<td>\`ansible all -m shell -a &quot;ip addr</td>
<td>grep lo:0&quot;\`</td>
</tr>
<tr>
<td><strong>copy</strong></td>
<td><code v-pre>ansible all -m copy -a &quot;src=sysctl.conf dest=/etc/&quot;</code></td>
<td>批量分发调优后的内核配置文件。</td>
</tr>
<tr>
<td><strong>sysctl</strong></td>
<td><code v-pre>ansible all -m sysctl -a &quot;name=net.ipv4.ip_forward value=1&quot;</code></td>
<td>修改内核参数并持久化。</td>
</tr>
<tr>
<td><strong>systemd</strong></td>
<td><code v-pre>ansible web -m systemd -a &quot;name=nginx state=restarted&quot;</code></td>
<td>扩容后批量重启 Nginx 服务。</td>
</tr>
<tr>
<td><strong>yum/apt</strong></td>
<td><code v-pre>ansible all -m yum -a &quot;name=keepalived state=present&quot;</code></td>
<td>批量安装高可用组件。</td>
</tr>
<tr>
<td><strong>mount</strong></td>
<td><code v-pre>ansible web -m mount -a &quot;path=/data src=10.0.0.1:/nfs fstype=nfs state=mounted&quot;</code></td>
<td>自动挂载 NFS 并写入 <code v-pre>/etc/fstab</code>&lt;br&gt;。</td>
</tr>
</tbody>
</table>
<hr>
<h3 id="二、-剧本编排-playbook-命令" tabindex="-1"><a class="header-anchor" href="#二、-剧本编排-playbook-命令"><span>二、 剧本编排（Playbook 命令）</span></a></h3>
<p>这是你进行 <strong>ZH-Kinger V3.0</strong> 自动化交付的核心。</p>
<ol>
<li><strong>执行剧本</strong>：</li>
</ol>
<p><code v-pre>ansible-playbook deploy_web.yml</code></p>
<ol start="2">
<li><strong>语法检查</strong>：</li>
</ol>
<p><code v-pre>ansible-playbook deploy_web.yml --syntax-check</code></p>
<ol start="3">
<li><strong>模拟执行 (Dry Run)</strong>：</li>
</ol>
<p><code v-pre>ansible-playbook deploy_web.yml -C</code>（或 <code v-pre>--check</code>，<strong>字节面试常考点</strong>，不执行只预演结果）。</p>
<ol start="4">
<li><strong>指定主机执行</strong>：</li>
</ol>
<p><code v-pre>ansible-playbook deploy_web.yml --limit &quot;192.168.10.11&quot;</code></p>
<ol start="5">
<li><strong>精准重试（后悔药）</strong>：</li>
</ol>
<p><code v-pre>ansible-playbook deploy_web.yml --limit @deploy_web.retry</code>（只对上次失败的机器进行补救）。</p>
<hr>
<h3 id="三、-辅助辅助工具命令" tabindex="-1"><a class="header-anchor" href="#三、-辅助辅助工具命令"><span>三、 辅助辅助工具命令</span></a></h3>
<ol>
<li><strong>ansible-vault（机密管理）</strong>：</li>
</ol>
<ul>
<li><code v-pre>ansible-vault encrypt vars.yml</code>：加密包含密码的变量文件。</li>
<li><code v-pre>ansible-vault decrypt vars.yml</code>：解密文件。</li>
</ul>
<ol start="2">
<li><strong>ansible-galaxy（社区角色）</strong>：</li>
</ol>
<ul>
<li><code v-pre>ansible-galaxy install geerlingguy.nginx</code>：下载大牛写好的现成 Role。</li>
</ul>
<ol start="3">
<li><strong>ansible-inventory（资产查看）</strong>：</li>
</ol>
<ul>
<li><code v-pre>ansible-inventory --list --yaml</code>：以 YAML 格式查看当前所有主机的层级关系。</li>
</ul>
<hr>
<h3 id="四、-💡-结合你项目的-面试必杀技" tabindex="-1"><a class="header-anchor" href="#四、-💡-结合你项目的-面试必杀技"><span>四、 💡 结合你项目的“面试必杀技”</span></a></h3>
<p>在面试中，如果你能抛出下面这两个命令用法，面试官会觉得你很有工程经验：</p>
<h4 id="_1-故障排查专用-vvv" tabindex="-1"><a class="header-anchor" href="#_1-故障排查专用-vvv"><span>1. 故障排查专用：<code v-pre>-vvv</code></span></a></h4>
<p>如果扩容时某个任务卡住了，你会怎么做？</p>
<p>“我会加上 <code v-pre>-vvv</code> 参数重新运行：<code v-pre>ansible-playbook deploy.yml -vvv</code>。这能展示最详细的 SSH 连接过程和输出，帮我快速定位是 SSH 密钥失效还是远程 Python 路径不正确。”</p>
<h4 id="_2-标签执行-tags" tabindex="-1"><a class="header-anchor" href="#_2-标签执行-tags"><span>2. 标签执行：<code v-pre>--tags</code></span></a></h4>
<p>如果你的剧本里有 10 个步骤，你只想重跑“内核调优”那一部分：</p>
<p>“我在 YAML 里给内核调优任务打了 <code v-pre>tags: kernel</code>，执行时只需：<code v-pre>ansible-playbook site.yml --tags &quot;kernel&quot;</code>。这极大地提高了扩容时的效率。”</p>
<hr>
<h3 id="五、-针对卢陈、全妍笔记的补充-快速问答" tabindex="-1"><a class="header-anchor" href="#五、-针对卢陈、全妍笔记的补充-快速问答"><span>五、 针对卢陈、全妍笔记的补充（快速问答）</span></a></h3>
<ul>
<li><strong>问：Ansible 默认并发是多少？</strong></li>
</ul>
<p>答：默认是 <strong>5</strong>。如果机器多，可以在 <code v-pre>ansible.cfg</code> 里改大 <code v-pre>forks</code>。</p>
<ul>
<li><strong>问：如何查看远程机器的全部变量？</strong></li>
</ul>
<p>答：执行 <code v-pre>ansible &lt;host&gt; -m debug -a &quot;var=hostvars[inventory_hostname]&quot;</code>。</p>
<ul>
<li><strong>问：Ansible 为什么是幂等的？</strong></li>
</ul>
<p>答：因为它在执行每个任务前会先检查目标状态。如果目标文件和要分发的文件一模一样，它就不做任何操作（显示绿色的 <code v-pre>SUCCESS</code> 而不是黄色的 <code v-pre>CHANGED</code>）。</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};