import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%BF%90%E7%BB%B4/web%E9%9B%86%E7%BE%A4/web%E9%9B%86%E7%BE%A4%E9%A1%B9%E7%9B%AE/%E4%BA%94%E3%80%81Ansible_%E5%AE%89%E8%A3%85.html","title":"五、Ansible_安装","lang":"zh-CN","frontmatter":{"title":"五、Ansible_安装","icon":"server","date":"2026-07-23T00:00:00.000Z","category":["运维"],"description":"1. 什么是 Ansible？ 简单来说，Ansible 是一款自动化运维工具。 它的作用：如果你想给 5 台服务器同时安装 Nginx 或修改防火墙规则，你不需要逐一登录，只需在主控端写一行命令，Ansible 就会自动批量完成。 它的特点：无 Agent（无需安装客户端）。它通过 SSH 协议工作。既然你的 JumpServer 已经能通过 SSH...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"五、Ansible_安装\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/%E4%BA%94%E3%80%81Ansible_%E5%AE%89%E8%A3%85-1.png\\",\\"https://venking.tech/blog/blog/assets/posts/%E4%BA%94%E3%80%81Ansible_%E5%AE%89%E8%A3%85-2.png\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%BF%90%E7%BB%B4/web%E9%9B%86%E7%BE%A4/web%E9%9B%86%E7%BE%A4%E9%A1%B9%E7%9B%AE/%E4%BA%94%E3%80%81Ansible_%E5%AE%89%E8%A3%85.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"五、Ansible_安装"}],["meta",{"property":"og:description","content":"1. 什么是 Ansible？ 简单来说，Ansible 是一款自动化运维工具。 它的作用：如果你想给 5 台服务器同时安装 Nginx 或修改防火墙规则，你不需要逐一登录，只需在主控端写一行命令，Ansible 就会自动批量完成。 它的特点：无 Agent（无需安装客户端）。它通过 SSH 协议工作。既然你的 JumpServer 已经能通过 SSH..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/%E4%BA%94%E3%80%81Ansible_%E5%AE%89%E8%A3%85-1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":1.34,"words":401},"filePathRelative":"posts/运维/web集群/web集群项目/五、Ansible_安装.md","excerpt":"<h2>1. 什么是 Ansible？</h2>\\n<p>简单来说，Ansible 是一款<strong>自动化运维工具</strong>。</p>\\n<ul>\\n<li><strong>它的作用</strong>：如果你想给 5 台服务器同时安装 Nginx 或修改防火墙规则，你不需要逐一登录，只需在主控端写一行命令，Ansible 就会自动批量完成。</li>\\n<li><strong>它的特点</strong>：<strong>无 Agent（无需安装客户端）</strong>。它通过 <strong>SSH</strong> 协议工作。既然你的 JumpServer 已经能通过 SSH 管理这些机器了，Ansible 也能直接用。</li>\\n</ul>","autoDesc":true}`),i={name:`五、Ansible_安装.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><h2 id="_1-什么是-ansible" tabindex="-1"><a class="header-anchor" href="#_1-什么是-ansible"><span>1. 什么是 Ansible？</span></a></h2>
<p>简单来说，Ansible 是一款<strong>自动化运维工具</strong>。</p>
<ul>
<li><strong>它的作用</strong>：如果你想给 5 台服务器同时安装 Nginx 或修改防火墙规则，你不需要逐一登录，只需在主控端写一行命令，Ansible 就会自动批量完成。</li>
<li><strong>它的特点</strong>：<strong>无 Agent（无需安装客户端）</strong>。它通过 <strong>SSH</strong> 协议工作。既然你的 JumpServer 已经能通过 SSH 管理这些机器了，Ansible 也能直接用。</li>
</ul>
<figure><img src="/blog/assets/posts/%E4%BA%94%E3%80%81Ansible_%E5%AE%89%E8%A3%85-1.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<hr>
<h2 id="_2-在哪里部署" tabindex="-1"><a class="header-anchor" href="#_2-在哪里部署"><span>2. 在哪里部署？</span></a></h2>
<p>由于你已经有了一台 <strong>JumpServer (192.168.31.136)</strong>，我强烈建议将 <strong>Ansible 安装在 JumpServer 这台机器上</strong>。</p>
<ul>
<li><strong>理由</strong>：136 是你的“指挥部”，它已经拥有访问所有 DMZ 机器的权限。</li>
</ul>
<p>​</p>
<h2 id="ansible部署" tabindex="-1"><a class="header-anchor" href="#ansible部署"><span>Ansible部署</span></a></h2>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 安装 epel 源</span></span>
<span class="line"><span>dnf install epel-release -y</span></span>
<span class="line"><span>#启用 CRB 仓库 (重要)</span></span>
<span class="line"><span>/usr/bin/crb enable</span></span>
<span class="line"><span># 安装 ansible</span></span>
<span class="line"><span>dnf install ansible-core -y</span></span>
<span class="line"><span># 安装sshpass</span></span>
<span class="line"><span>dnf install sshpass -y</span></span>
<span class="line"><span># 验证安装</span></span>
<span class="line"><span>ansible --version</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p>
<h3 id="sshpass" tabindex="-1"><a class="header-anchor" href="#sshpass"><span>sshpass</span></a></h3>
<p>Ansible 默认使用 SSH 进行通信，当你通过 <code v-pre>ansible_ssh_pass</code> 指定明文密码时，它在底层需要调用一个名为 <code v-pre>sshpass</code> 的小工具来自动输入密码。</p>
<p>安装成功的标志</p>
<figure><img src="/blog/assets/posts/%E4%BA%94%E3%80%81Ansible_%E5%AE%89%E8%A3%85-2.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h3 id="安装扩展模块" tabindex="-1"><a class="header-anchor" href="#安装扩展模块"><span>安装扩展模块</span></a></h3>
<p>这是因为你安装的是 <strong>ansible-core</strong>（精简版），它只包含了最核心的功能，而 <code v-pre>authorized_key</code> 属于扩展模块（ansible.posix），目前还没安装到你的系统里。</p>
<p>如果你想让 Ansible 以后更强大，可以把缺失的模块补上：</p>
<p><strong>安装 posix 集合</strong>：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>ansible-galaxy collection install ansible.posix</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};