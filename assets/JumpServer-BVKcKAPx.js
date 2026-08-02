import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E8%B7%B3%E6%9D%BF%E6%9C%BA/JumpServer.html","title":"JumpServer","lang":"zh-CN","frontmatter":{"title":"JumpServer","icon":"network","date":"2026-07-23T00:00:00.000Z","category":["计算机网络"],"description":"简单来说，JumpServer 是全球首款开源的 “堡垒机”（也叫运维审计系统）。 在你的 LVS + NFS 集群架构中，它扮演的是**“超级管家”和“黑匣子”**的角色。 1. 核心定义：它是干什么用的？ 想象一下，你现在有 130 到 135 好几台服务器。如果没有 JumpServer，你可能需要记住每个机器的 root 密码，用 Xshell...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JumpServer\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E8%B7%B3%E6%9D%BF%E6%9C%BA/JumpServer.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"JumpServer"}],["meta",{"property":"og:description","content":"简单来说，JumpServer 是全球首款开源的 “堡垒机”（也叫运维审计系统）。 在你的 LVS + NFS 集群架构中，它扮演的是**“超级管家”和“黑匣子”**的角色。 1. 核心定义：它是干什么用的？ 想象一下，你现在有 130 到 135 好几台服务器。如果没有 JumpServer，你可能需要记住每个机器的 root 密码，用 Xshell..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.58,"words":774},"filePathRelative":"posts/计算机网络/网络的概念/跳板机/JumpServer.md","excerpt":"<p>简单来说，<strong>JumpServer</strong> 是全球首款开源的 <strong>“堡垒机”</strong>（也叫运维审计系统）。</p>\\n<p>在你的 LVS + NFS 集群架构中，它扮演的是**“超级管家”<strong>和</strong>“黑匣子”**的角色。</p>\\n<hr>\\n<h3>1. 核心定义：它是干什么用的？</h3>\\n<p>想象一下，你现在有 130 到 135 好几台服务器。如果没有 JumpServer，你可能需要记住每个机器的 root 密码，用 Xshell 一个个连接。</p>\\n<ul>\\n<li><strong>风险</strong>：如果你不小心在 Web1 执行了 <code>rm -rf /</code>，没人知道是你干的，也无法拦截。</li>\\n<li><strong>解决</strong>：JumpServer 把所有的服务器“收纳”进一个网页后台。你以后只需登录 JumpServer，就能通过浏览器直接操作所有机器，且所有行为都被<strong>录像</strong>和<strong>审计</strong>。</li>\\n</ul>","autoDesc":true}`),i={name:`JumpServer.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>简单来说，<strong>JumpServer</strong> 是全球首款开源的 <strong>“堡垒机”</strong>（也叫运维审计系统）。</p>
<p>在你的 LVS + NFS 集群架构中，它扮演的是**“超级管家”<strong>和</strong>“黑匣子”**的角色。</p>
<hr>
<h3 id="_1-核心定义-它是干什么用的" tabindex="-1"><a class="header-anchor" href="#_1-核心定义-它是干什么用的"><span>1. 核心定义：它是干什么用的？</span></a></h3>
<p>想象一下，你现在有 130 到 135 好几台服务器。如果没有 JumpServer，你可能需要记住每个机器的 root 密码，用 Xshell 一个个连接。</p>
<ul>
<li><strong>风险</strong>：如果你不小心在 Web1 执行了 <code v-pre>rm -rf /</code>，没人知道是你干的，也无法拦截。</li>
<li><strong>解决</strong>：JumpServer 把所有的服务器“收纳”进一个网页后台。你以后只需登录 JumpServer，就能通过浏览器直接操作所有机器，且所有行为都被<strong>录像</strong>和<strong>审计</strong>。</li>
</ul>
<hr>
<h3 id="_2-四大核心功能-4a-规范" tabindex="-1"><a class="header-anchor" href="#_2-四大核心功能-4a-规范"><span>2. 四大核心功能（4A 规范）</span></a></h3>
<p>JumpServer 遵循安全运维的 <strong>4A 准则</strong>，这对你管理 DMZ 区域至关重要：</p>
<ul>
<li><strong>身份验证 (Authentication)</strong>：</li>
</ul>
<p>你是谁？支持 MFA（手机验证码）登录，防止你的 root 密码被暴力破解。</p>
<ul>
<li><strong>账号管理 (Account)</strong>：</li>
</ul>
<p>你管谁？它可以统一管理 Web1、LB1 的账号，你甚至不需要知道服务器的真实密码，JumpServer 帮你自动登录。</p>
<ul>
<li><strong>授权控制 (Authorization)</strong>：</li>
</ul>
<p>你能干什么？你可以设置：王同学只能看 Web1 的日志，不能重启服务；李同学可以管理 LVS，但不能动数据库。</p>
<ul>
<li><strong>审计合规 (Audit)</strong>：</li>
</ul>
<p>你干了什么？所有的操作都会录制成视频，支持指令搜索。哪怕你只是 <code v-pre>cat</code> 了一个文件，后台都能查到记录。</p>
<hr>
<h3 id="_3-为什么在你的架构中很重要" tabindex="-1"><a class="header-anchor" href="#_3-为什么在你的架构中很重要"><span>3. 为什么在你的架构中很重要？</span></a></h3>
<p>你目前正在搭建一个包含 <strong>LVS (DR模式)</strong> 和 <strong>NFS 共享</strong> 的复杂环境，JumpServer 能帮你解决以下痛点：</p>
<ol>
<li><strong>统一入口</strong>：你不再需要给防火墙（135）开一大堆 SSH 端口。只需开一个 JumpServer 的端口，就能横向管理内网所有机器。</li>
<li><strong>文件同步利器</strong>：你想更新 Web1 的网页？不用 FTP。直接在 JumpServer 的 Web 页面把文件拖进去，配合你的 <strong>NFS 挂载</strong>，Web2 也会立刻同步更新。</li>
<li><strong>防止“炸群”</strong>：LVS 配置非常精细（比如 ARP 抑制、VIP 绑定）。你可以设置命令过滤，防止自己在实验过程中敲错关键网络指令导致整个集群断网。</li>
</ol>
<hr>
<h3 id="_4-它长什么样" tabindex="-1"><a class="header-anchor" href="#_4-它长什么样"><span>4. 它长什么样？</span></a></h3>
<ul>
<li><strong>Web 界面</strong>：像一个现代化的管理后台，左侧是资产树，右侧是仪表盘。</li>
<li><strong>Web 终端</strong>：在浏览器里直接弹出一个黑色的 Linux 命令行窗口（基于 WebTerminal 技术），手感和 Xshell 一样流畅。</li>
</ul>
<hr>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h3>
<p>对于你来说，JumpServer 不仅仅是一个软件，它是你<strong>内网集群的防火墙延伸</strong>。它不处理用户的 Web 请求，但它盯着你（管理员）的每一个动作，确保运维过程安全、透明。</p>
<p><strong>你现在已经安装好了，要不要尝试在 JumpServer 界面里创建一个“作业”，让 Web1 和 Web2 同时执行一次</strong> <code v-pre>**yum update**</code> <strong>感受一下批量管理的威力？</strong></p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};