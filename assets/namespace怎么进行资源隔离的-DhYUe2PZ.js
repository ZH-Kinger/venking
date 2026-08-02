import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E8%B7%B3%E5%8A%A8%E8%BF%90%E7%BB%B4%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88%E9%9D%A2%E8%AF%95%E5%87%86%E5%A4%87%E6%8C%87%E5%8D%97(%E9%80%82%E9%85%8D%E4%BD%A0%E7%9A%84%E7%AE%80%E5%8E%86%E8%83%8C%E6%99%AF)/K8s/Namespace%E5%91%BD%E5%90%8D%E7%A9%BA%E9%97%B4/namespace%E6%80%8E%E4%B9%88%E8%BF%9B%E8%A1%8C%E8%B5%84%E6%BA%90%E9%9A%94%E7%A6%BB%E7%9A%84.html","title":"namespace怎么进行资源隔离的","lang":"zh-CN","frontmatter":{"title":"namespace怎么进行资源隔离的","icon":"clipboard-text","date":"2026-07-23T00:00:00.000Z","category":["面试"],"description":"梓涵，既然你已经在深入研究 K8s 的启动流程和 Pause 容器，那么 Namespace（命名空间） 就是你必须攻克的底层堡垒。 简单来说，Namespace 是 Linux 内核用来隔离系统资源的一种机制。它就像是在一台物理服务器内部，通过“障眼法”划分出了多个互不干扰的虚拟世界。 以下是它的底层实现与资源隔离的具体逻辑： 1. Namespac...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"namespace怎么进行资源隔离的\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E8%B7%B3%E5%8A%A8%E8%BF%90%E7%BB%B4%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88%E9%9D%A2%E8%AF%95%E5%87%86%E5%A4%87%E6%8C%87%E5%8D%97(%E9%80%82%E9%85%8D%E4%BD%A0%E7%9A%84%E7%AE%80%E5%8E%86%E8%83%8C%E6%99%AF)/K8s/Namespace%E5%91%BD%E5%90%8D%E7%A9%BA%E9%97%B4/namespace%E6%80%8E%E4%B9%88%E8%BF%9B%E8%A1%8C%E8%B5%84%E6%BA%90%E9%9A%94%E7%A6%BB%E7%9A%84.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"namespace怎么进行资源隔离的"}],["meta",{"property":"og:description","content":"梓涵，既然你已经在深入研究 K8s 的启动流程和 Pause 容器，那么 Namespace（命名空间） 就是你必须攻克的底层堡垒。 简单来说，Namespace 是 Linux 内核用来隔离系统资源的一种机制。它就像是在一台物理服务器内部，通过“障眼法”划分出了多个互不干扰的虚拟世界。 以下是它的底层实现与资源隔离的具体逻辑： 1. Namespac..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.59,"words":1076},"filePathRelative":"posts/面试/字节面试/字节跳动运维开发工程师面试准备指南(适配你的简历背景)/K8s/Namespace命名空间/namespace怎么进行资源隔离的.md","excerpt":"<p>梓涵，既然你已经在深入研究 K8s 的启动流程和 Pause 容器，那么 <strong>Namespace（命名空间）</strong> 就是你必须攻克的底层堡垒。</p>\\n<p>简单来说，Namespace 是 Linux 内核用来<strong>隔离系统资源</strong>的一种机制。它就像是在一台物理服务器内部，通过“障眼法”划分出了多个互不干扰的虚拟世界。</p>\\n<p>以下是它的底层实现与资源隔离的具体逻辑：</p>\\n<hr>\\n<h2>1. Namespace 的本质：内核的“障眼法”</h2>\\n<p>在 Linux 内核中，Namespace 并不是一种物理实体的划分，而是一种<strong>对全局系统资源的封装</strong>。</p>","autoDesc":true}`),i={name:`namespace怎么进行资源隔离的.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>梓涵，既然你已经在深入研究 K8s 的启动流程和 Pause 容器，那么 <strong>Namespace（命名空间）</strong> 就是你必须攻克的底层堡垒。</p>
<p>简单来说，Namespace 是 Linux 内核用来<strong>隔离系统资源</strong>的一种机制。它就像是在一台物理服务器内部，通过“障眼法”划分出了多个互不干扰的虚拟世界。</p>
<p>以下是它的底层实现与资源隔离的具体逻辑：</p>
<hr>
<h2 id="_1-namespace-的本质-内核的-障眼法" tabindex="-1"><a class="header-anchor" href="#_1-namespace-的本质-内核的-障眼法"><span>1. Namespace 的本质：内核的“障眼法”</span></a></h2>
<p>在 Linux 内核中，Namespace 并不是一种物理实体的划分，而是一种<strong>对全局系统资源的封装</strong>。</p>
<p>当一个进程被放入某个 Namespace 后，它能看到的资源（如 IP 地址、进程 ID 等）就会被限制在那个 Namespace 的范围内。它以为自己拥有整个系统，但实际上它只是“井底之蛙”。</p>
<hr>
<h2 id="_2-六大核心-namespace-与隔离维度" tabindex="-1"><a class="header-anchor" href="#_2-六大核心-namespace-与隔离维度"><span>2. 六大核心 Namespace 与隔离维度</span></a></h2>
<p>在 K8s 和 Docker 中，主要利用了以下 6 种 Namespace 来实现全方位的隔离：</p>
<table>
<thead>
<tr>
<th><strong>Namespace 类型</strong></th>
<th><strong>隔离的资源</strong></th>
<th><strong>隔离效果</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>UTS (Unix Timesharing System)</strong></td>
<td>主机名与域名</td>
<td>容器可以有自己的 Hostname，不会修改宿主机的名字。</td>
</tr>
<tr>
<td><strong>IPC (Inter-Process Communication)</strong></td>
<td>信号量、消息队列、共享内存</td>
<td>防止不同 Pod 之间的进程通过内存直接通信，保证安全。</td>
</tr>
<tr>
<td><strong>PID (Process ID)</strong></td>
<td>进程编号</td>
<td>容器内的 init 进程 ID 是 1。在容器里执行 <code v-pre>ps</code>&lt;br&gt;看不到宿主机的进程。</td>
</tr>
<tr>
<td><strong>Network (Net)</strong></td>
<td>网络设备、协议栈、端口</td>
<td><strong>这是你最关注的。</strong> 容器拥有独立的 IP、网卡和 Iptables 规则。</td>
</tr>
<tr>
<td><strong>Mount (Mnt)</strong></td>
<td>挂载点、文件系统</td>
<td>容器只能看到自己的目录树（rootfs），看不到宿主机的磁盘文件。</td>
</tr>
<tr>
<td><strong>User</strong></td>
<td>用户与用户组 ID</td>
<td>容器内的 root 用户（ID 0）在宿主机上其实只是一个普通用户。</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="_3-资源隔离是怎么实现的-底层原理" tabindex="-1"><a class="header-anchor" href="#_3-资源隔离是怎么实现的-底层原理"><span>3. 资源隔离是怎么实现的？（底层原理）</span></a></h2>
<p>底层主要通过两个关键的系统调用（System Call）来完成：</p>
<h4 id="a-clone-——-创建时隔离" tabindex="-1"><a class="header-anchor" href="#a-clone-——-创建时隔离"><span>A. <code v-pre>clone()</code> —— 创建时隔离</span></a></h4>
<p>当你启动一个容器进程时，Docker/K8s 底层会调用 <code v-pre>clone()</code>。</p>
<ul>
<li><strong>做法</strong>：在调用时传入类似 <code v-pre>CLONE_NEWNET</code> 或 <code v-pre>CLONE_NEWPID</code> 的参数。</li>
<li><strong>效果</strong>：操作系统会为这个新进程创建一个全新的 Namespace。</li>
</ul>
<h4 id="b-setns-——-运行时加入" tabindex="-1"><a class="header-anchor" href="#b-setns-——-运行时加入"><span>B. <code v-pre>setns()</code> —— 运行时加入</span></a></h4>
<p>这就是 <strong>Pause 容器共享网络</strong> 的核心。</p>
<ul>
<li><strong>做法</strong>：如果容器 B 想要加入容器 A 的网络，它会通过 <code v-pre>setns()</code> 系统调用，将其网络 Namespace 指向容器 A 的 Namespace 文件描述符。</li>
<li><strong>效果</strong>：两个进程“看”到了同一张虚拟网卡。</li>
</ul>
<hr>
<h2 id="_4-💡-梓涵的-面试进阶-namespace-的局限性" tabindex="-1"><a class="header-anchor" href="#_4-💡-梓涵的-面试进阶-namespace-的局限性"><span>4. 💡 梓涵的“面试进阶”：Namespace 的局限性</span></a></h2>
<p>面试官可能会问：<strong>“既然 Namespace 隔离了资源，那为什么容器不叫虚拟机？”</strong></p>
<p><strong>你的满分回答：</strong></p>
<p>“因为 Namespace 只能做到 <strong>‘可见性’的隔离</strong>，它不能做到 <strong>‘物理上’的隔离</strong>。</p>
<ol>
<li><strong>共享内核</strong>：所有容器共享同一个宿主机内核，如果某个容器利用内核漏洞发起攻击，整个宿主机都会沦陷。</li>
<li><strong>资源抢占</strong>：Namespace 无法限制你用多少 CPU。如果不配合 <strong>cgroups</strong>，一个 Namespace 里的进程可能会耗光宿主机的 CPU，导致其他 Namespace 的进程卡死。</li>
</ol>
<p>所以，在我的 <strong>ZH-Kinger</strong> 架构中，我始终坚持 <strong>‘Namespace 隔离视角 + cgroups 隔离资源’</strong> 的组合方案，这才是真正的容器隔离。”</p>
<hr>
<h2 id="_5-🛠️-怎么在你的-rocky-linux-里-捅破-这个隔离" tabindex="-1"><a class="header-anchor" href="#_5-🛠️-怎么在你的-rocky-linux-里-捅破-这个隔离"><span>5. 🛠️ 怎么在你的 Rocky Linux 里“捅破”这个隔离？</span></a></h2>
<p>你想看看真相吗？在你的机器上试试这两个操作：</p>
<ol>
<li><strong>查看 Namespace 文件</strong>：</li>
</ol>
<p>执行 <code v-pre>ls -l /proc/$$/ns</code>（<code v-pre>$$</code> 是当前 Shell 的 PID）。你会看到一系列 link 文件，每一行就是一个 Namespace 的 ID。</p>
<ol start="2">
<li><strong>跨隔离操作</strong>：</li>
</ol>
<p>使用 <code v-pre>**nsenter**</code> 工具。</p>
<p>“如果我想在宿主机上抓取某个 Pod 内部的数据包，我不需要进容器装 tcpdump，我直接执行 <code v-pre>nsenter -t &lt;容器PID&gt; -n tcpdump</code>。这相当于我这个‘上帝’强行闯入了容器的网络 Namespace。”</p>
<p><strong>梓涵，理解了 Namespace，你就理解了容器的“虚”。而接下来要聊的 cgroups，则是容器的“实（限制）”。你想了解一下 cgroups 是如何精准限制 CPU 指令周期，从而防止某个 Pod 把你的宿主机跑宕机的吗？</strong></p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};