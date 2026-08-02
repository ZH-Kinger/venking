import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E8%B7%B3%E6%9D%BF%E6%9C%BA.html","title":"跳板机","lang":"zh-CN","frontmatter":{"title":"跳板机","icon":"network","date":"2026-07-23T00:00:00.000Z","category":["计算机网络"],"description":"跳板机是什么？ 跳板机（Jump Server / Bastion Host） 是一种专门为了提高网络安全性而设置的特殊服务器。 简单来说，它就像是进入一个封闭社区的“唯一保安亭”。在企业或复杂的网络架构中，为了安全，内部的核心服务器（如数据库、应用服务器）通常不直接暴露在公网上。运维人员如果想管理这些内网机器，必须先登录到这台跳板机，然后再从跳板机“...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"跳板机\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/%E8%B7%B3%E6%9D%BF%E6%9C%BA-%E7%99%BD%E6%9D%BF-1.svg\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E8%B7%B3%E6%9D%BF%E6%9C%BA.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"跳板机"}],["meta",{"property":"og:description","content":"跳板机是什么？ 跳板机（Jump Server / Bastion Host） 是一种专门为了提高网络安全性而设置的特殊服务器。 简单来说，它就像是进入一个封闭社区的“唯一保安亭”。在企业或复杂的网络架构中，为了安全，内部的核心服务器（如数据库、应用服务器）通常不直接暴露在公网上。运维人员如果想管理这些内网机器，必须先登录到这台跳板机，然后再从跳板机“..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/%E8%B7%B3%E6%9D%BF%E6%9C%BA-%E7%99%BD%E6%9D%BF-1.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.76,"words":828},"filePathRelative":"posts/计算机网络/网络的概念/跳板机.md","excerpt":"<h2>跳板机是什么？</h2>\\n<p><strong>跳板机（Jump Server / Bastion Host）</strong> 是一种专门为了提高网络安全性而设置的特殊服务器。</p>\\n<p>简单来说，它就像是进入一个封闭社区的“唯一保安亭”。在企业或复杂的网络架构中，为了安全，内部的核心服务器（如数据库、应用服务器）通常不直接暴露在公网上。运维人员如果想管理这些内网机器，必须先登录到这台跳板机，然后再从跳板机“跳”到目标服务器上。</p>\\n<div class=\\"language-mermaid line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"mermaid\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code class=\\"language-mermaid\\"><span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">flowchart LR</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n1[\\"跳板机和堡垒机\\"]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n2[\\"INTERNET\\"]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n3[\\"USER（公司内部人员）\\"]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n4[\\"路由器\\"]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n5[\\"服务器区域\\"]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n6[\\"防火墙（硬件）\\"]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n7[\\"vlan10\\"]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n8[\\"三层交换机\\"]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n9[\\"办公区域\\"]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n10[\\"vlan20\\"]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n5 -- \\"交换机1\\" --> n7</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n9 -- \\"交换机2\\" --> n10</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n10 --> n8</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n7 --> n8</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n8 --> n4</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n4 --> n6</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n6 --> n2</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n2 --> n1</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n1 --> n5</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n3 --> n2</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`),i={name:`跳板机.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><h2 id="跳板机是什么" tabindex="-1"><a class="header-anchor" href="#跳板机是什么"><span>跳板机是什么？</span></a></h2>
<p><strong>跳板机（Jump Server / Bastion Host）</strong> 是一种专门为了提高网络安全性而设置的特殊服务器。</p>
<p>简单来说，它就像是进入一个封闭社区的“唯一保安亭”。在企业或复杂的网络架构中，为了安全，内部的核心服务器（如数据库、应用服务器）通常不直接暴露在公网上。运维人员如果想管理这些内网机器，必须先登录到这台跳板机，然后再从跳板机“跳”到目标服务器上。</p>
<div class="language-mermaid line-numbers-mode" data-highlighter="shiki" data-ext="mermaid" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-mermaid"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">flowchart LR</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n1["跳板机和堡垒机"]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n2["INTERNET"]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n3["USER（公司内部人员）"]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n4["路由器"]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n5["服务器区域"]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n6["防火墙（硬件）"]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n7["vlan10"]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n8["三层交换机"]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n9["办公区域"]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n10["vlan20"]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n5 -- "交换机1" --> n7</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n9 -- "交换机2" --> n10</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n10 --> n8</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n7 --> n8</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n8 --> n4</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n4 --> n6</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n6 --> n2</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n2 --> n1</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n1 --> n5</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n3 --> n2</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="/blog/assets/posts/%E8%B7%B3%E6%9D%BF%E6%9C%BA-%E7%99%BD%E6%9D%BF-1.svg" alt="白板 1" tabindex="0" loading="lazy"><figcaption>白板 1</figcaption></figure>
<h2 id="跳板机的工作原理" tabindex="-1"><a class="header-anchor" href="#跳板机的工作原理"><span>跳板机的工作原理</span></a></h2>
<p>跳板机的核心原理是<strong>物理/逻辑隔离</strong>。它位于公网和内网的交界处，充当一个中间代理的角色。</p>
<h3 id="_1-网络拓扑结构" tabindex="-1"><a class="header-anchor" href="#_1-网络拓扑结构"><span>1. 网络拓扑结构</span></a></h3>
<p>通常，跳板机会拥有两个网卡：</p>
<ul>
<li><strong>外网网卡：</strong> 允许特定的远程 IP 通过 SSH 或 RDP 访问。</li>
<li><strong>内网网卡：</strong> 与后端服务器集群相连。</li>
</ul>
<h3 id="_2-访问流程" tabindex="-1"><a class="header-anchor" href="#_2-访问流程"><span>2. 访问流程</span></a></h3>
<p>典型的操作步骤如下：</p>
<ol>
<li><strong>第一步：</strong> 运维人员通过互联网连接到跳板机，并进行身份验证（通常需要多因子认证 MFA）。</li>
<li><strong>第二步：</strong> 成功进入跳板机后，运维人员在跳板机的终端里发起第二次连接请求（如 <code v-pre>ssh root@internal-ip</code>）。</li>
<li><strong>第三步：</strong> 目标服务器验证请求来自受信任的跳板机 IP，允许访问。</li>
</ol>
<h3 id="_3-核心机制" tabindex="-1"><a class="header-anchor" href="#_3-核心机制"><span>3. 核心机制</span></a></h3>
<ul>
<li><strong>访问控制（ACL）：</strong> 后端服务器会配置防火墙规则（如 <code v-pre>iptables</code> 或 <code v-pre>firewalld</code>），<strong>只允许</strong>来自跳板机 IP 的流量，拒绝所有其他来源。</li>
<li><strong>协议转发：</strong> 跳板机利用 SSH 隧道（SSH Tunneling）或端口转发技术，安全地传递指令。</li>
</ul>
<hr>
<h2 id="为什么需要跳板机" tabindex="-1"><a class="header-anchor" href="#为什么需要跳板机"><span>为什么需要跳板机？</span></a></h2>
<table>
<thead>
<tr>
<th><strong>优势</strong></th>
<th><strong>说明</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>收缩攻击面</strong></td>
<td>只需要加固一台机器的防御，而不是几十台。</td>
</tr>
<tr>
<td><strong>集中审计</strong></td>
<td>所有的操作记录（命令输入、文件上传）都会在跳板机上留痕，方便追溯。</td>
</tr>
<tr>
<td><strong>身份管理</strong></td>
<td>无需给每个员工分发所有服务器的密钥，只需管理跳板机的访问权限。</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="跳板机-vs-堡垒机" tabindex="-1"><a class="header-anchor" href="#跳板机-vs-堡垒机"><span>跳板机 vs 堡垒机</span></a></h2>
<p>虽然这两个词常被混用，但它们在功能深度上有区别：</p>
<ol>
<li><strong>跳板机 (Jump Server)：</strong> 侧重于**“连通性”**。它通常只是一个安装了 Linux 系统的服务器，功能较为基础，主要解决“如何安全进入内网”的问题。</li>
<li><strong>堡垒机 (Bastion Host / PAM)：</strong> 侧重于“管理和审计”。它是跳板机的进化版，具备更强的监控功能，比如：</li>
</ol>
<ul>
<li>实时屏幕录制。</li>
<li>高危命令拦截（例如禁止执行 <code v-pre>rm -rf /</code>）。</li>
<li>自动定期修改后端服务器密码。</li>
</ul>
<p><strong>总结：</strong> 跳板机是“路口”，而堡垒机是带有“全方位监控和精细权限控制的安检站”。</p>
<h2 id="" tabindex="-1"><a class="header-anchor" href="#"><span></span></a></h2>
<h2 id="-1" tabindex="-1"><a class="header-anchor" href="#-1"><span></span></a></h2>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};