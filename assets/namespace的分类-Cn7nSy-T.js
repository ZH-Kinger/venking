import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E8%B7%B3%E5%8A%A8%E8%BF%90%E7%BB%B4%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88%E9%9D%A2%E8%AF%95%E5%87%86%E5%A4%87%E6%8C%87%E5%8D%97(%E9%80%82%E9%85%8D%E4%BD%A0%E7%9A%84%E7%AE%80%E5%8E%86%E8%83%8C%E6%99%AF)/K8s/Namespace%E5%91%BD%E5%90%8D%E7%A9%BA%E9%97%B4/namespace%E7%9A%84%E5%88%86%E7%B1%BB.html","title":"namespace的分类","lang":"zh-CN","frontmatter":{"title":"namespace的分类","icon":"clipboard-text","date":"2026-07-23T00:00:00.000Z","category":["面试"],"description":"在 Kubernetes (K8s) 底层所依赖的 Linux 内核中，Namespace（命名空间） 是实现容器隔离的核心技术 。它就像给进程戴上了“护目镜”，让进程只能看到属于自己的资源，从而实现 Pod 与 Pod 之间的隔离 。 主要有以下 7 种 常见的 Namespace，它们各自负责不同维度的资源隔离： 1. PID Namespace ...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"namespace的分类\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E8%B7%B3%E5%8A%A8%E8%BF%90%E7%BB%B4%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88%E9%9D%A2%E8%AF%95%E5%87%86%E5%A4%87%E6%8C%87%E5%8D%97(%E9%80%82%E9%85%8D%E4%BD%A0%E7%9A%84%E7%AE%80%E5%8E%86%E8%83%8C%E6%99%AF)/K8s/Namespace%E5%91%BD%E5%90%8D%E7%A9%BA%E9%97%B4/namespace%E7%9A%84%E5%88%86%E7%B1%BB.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"namespace的分类"}],["meta",{"property":"og:description","content":"在 Kubernetes (K8s) 底层所依赖的 Linux 内核中，Namespace（命名空间） 是实现容器隔离的核心技术 。它就像给进程戴上了“护目镜”，让进程只能看到属于自己的资源，从而实现 Pod 与 Pod 之间的隔离 。 主要有以下 7 种 常见的 Namespace，它们各自负责不同维度的资源隔离： 1. PID Namespace ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.13,"words":939},"filePathRelative":"posts/面试/字节面试/字节跳动运维开发工程师面试准备指南(适配你的简历背景)/K8s/Namespace命名空间/namespace的分类.md","excerpt":"<p>在 Kubernetes (K8s) 底层所依赖的 Linux 内核中，<strong>Namespace（命名空间）</strong> 是实现容器隔离的核心技术 。它就像给进程戴上了“护目镜”，让进程只能看到属于自己的资源，从而实现 Pod 与 Pod 之间的隔离 。</p>\\n<p>主要有以下 <strong>7 种</strong> 常见的 Namespace，它们各自负责不同维度的资源隔离：</p>\\n<hr>\\n<h2>1. PID Namespace (进程隔离)</h2>\\n<ul>\\n<li><strong>作用</strong>：隔离进程 ID 。</li>\\n<li><strong>效果</strong>：容器内的进程拥有自己独立的 PID 计数（通常从 PID 1 开始） 。Pod A 里的进程看不到也无法通过 <code>kill</code> 命令影响 Pod B 里的进程 。</li>\\n</ul>","autoDesc":true}`),i={name:`namespace的分类.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在 Kubernetes (K8s) 底层所依赖的 Linux 内核中，<strong>Namespace（命名空间）</strong> 是实现容器隔离的核心技术 。它就像给进程戴上了“护目镜”，让进程只能看到属于自己的资源，从而实现 Pod 与 Pod 之间的隔离 。</p>
<p>主要有以下 <strong>7 种</strong> 常见的 Namespace，它们各自负责不同维度的资源隔离：</p>
<hr>
<h2 id="_1-pid-namespace-进程隔离" tabindex="-1"><a class="header-anchor" href="#_1-pid-namespace-进程隔离"><span>1. PID Namespace (进程隔离)</span></a></h2>
<ul>
<li><strong>作用</strong>：隔离进程 ID 。</li>
<li><strong>效果</strong>：容器内的进程拥有自己独立的 PID 计数（通常从 PID 1 开始） 。Pod A 里的进程看不到也无法通过 <code v-pre>kill</code> 命令影响 Pod B 里的进程 。</li>
</ul>
<h2 id="_2-net-namespace-网络隔离" tabindex="-1"><a class="header-anchor" href="#_2-net-namespace-网络隔离"><span>2. Net Namespace (网络隔离)</span></a></h2>
<ul>
<li><strong>作用</strong>：隔离网络设备、IP 地址、端口号等 。</li>
<li><strong>效果</strong>：每个 Pod 拥有自己独立的虚拟网卡和 IP 地址 。即使两个 Pod 都想监听 80 端口，因为在不同的 Net Namespace 里，互不冲突 。</li>
</ul>
<h2 id="_3-mount-namespace-文件系统隔离" tabindex="-1"><a class="header-anchor" href="#_3-mount-namespace-文件系统隔离"><span>3. Mount Namespace (文件系统隔离)</span></a></h2>
<ul>
<li><strong>作用</strong>：隔离挂载点 。</li>
<li><strong>效果</strong>：每个容器拥有自己独立的文件系统视图 。容器 A 对 <code v-pre>/tmp</code> 的修改，容器 B 完全感知不到 。这也是 Docker 镜像能提供独立运行环境的基础 。</li>
</ul>
<h2 id="_4-uts-namespace-主机名隔离" tabindex="-1"><a class="header-anchor" href="#_4-uts-namespace-主机名隔离"><span>4. UTS Namespace (主机名隔离)</span></a></h2>
<ul>
<li><strong>作用</strong>：隔离主机名（Hostname）和域名（NIS Domain name） 。</li>
<li><strong>效果</strong>：在一个宿主机上，不同的 Pod 可以设置完全不同的主机名，这对于通过主机名进行标识的服务发现至关重要 。</li>
</ul>
<h2 id="_5-ipc-namespace-进程间通信隔离" tabindex="-1"><a class="header-anchor" href="#_5-ipc-namespace-进程间通信隔离"><span>5. IPC Namespace (进程间通信隔离)</span></a></h2>
<ul>
<li><strong>作用</strong>：隔离信号量、消息队列和共享内存 。</li>
<li><strong>效果</strong>：防止 Pod A 的进程通过内存共享手段直接访问或干扰 Pod B 的数据，确保了通信安全 。</li>
</ul>
<h2 id="_6-user-namespace-用户权限隔离" tabindex="-1"><a class="header-anchor" href="#_6-user-namespace-用户权限隔离"><span>6. User Namespace (用户权限隔离)</span></a></h2>
<ul>
<li><strong>作用</strong>：隔离用户 ID 和组 ID 。</li>
<li><strong>效果</strong>：实现“权限降维”。容器内部的 <code v-pre>root</code> 用户在宿主机视角下可能只是一个普通用户 。这增强了安全性，防止容器逃逸后直接获取宿主机的 root 权限 。</li>
</ul>
<h2 id="_7-cgroup-namespace-资源视图隔离" tabindex="-1"><a class="header-anchor" href="#_7-cgroup-namespace-资源视图隔离"><span>7. Cgroup Namespace (资源视图隔离)</span></a></h2>
<ul>
<li><strong>作用</strong>：隔离进程对 Cgroup 层级结构的视图 。</li>
<li><strong>效果</strong>：容器内部看到的 <code v-pre>/proc/self/cgroup</code> 只包含其自身的限制信息，而不是整个宿主机的资源分配情况 。</li>
</ul>
<hr>
<h2 id="​在你的-aiops-项目中的技术体现" tabindex="-1"><a class="header-anchor" href="#​在你的-aiops-项目中的技术体现"><span>​在你的 AIOps 项目中的技术体现</span></a></h2>
<p>在你的 <strong>OpenClaw + 多 Agent 协同平台</strong> 中，Namespace 技术是保障自愈脚本安全运行的底层基石：</p>
<ul>
<li><strong>沙箱执行环境</strong>：由于使用了 <strong>Ray Actor</strong>，每一个自愈任务实际上都运行在受 Namespace 保护的独立进程空间中 。即使某个自愈脚本因 Bug 试图扫描内网或修改主机名，也会被 <strong>Net</strong> 和 <strong>UTS Namespace</strong> 锁定在沙箱内，不会影响监控底座 。</li>
<li><strong>审计与快照</strong>：基于 <strong>IPC Namespace</strong> 的隔离，<strong>Audit Agent</strong> 存储在内存中的 <code v-pre>self.backup_context</code> 快照是绝对私有的，任何其他的 Agent 或受损的业务进程都无法通过内存直接篡改这些关键的回滚数据 。</li>
</ul>
<hr>
<h2 id="​总结速查表" tabindex="-1"><a class="header-anchor" href="#​总结速查表"><span>​总结速查表</span></a></h2>
<table>
<thead>
<tr>
<th><strong>Namespace 类型</strong></th>
<th><strong>隔离对象</strong></th>
<th><strong>解决的问题</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>PID</strong></td>
<td>进程编号</td>
<td>进程互不干扰、独立启动</td>
</tr>
<tr>
<td><strong>Net</strong></td>
<td>网络协议栈</td>
<td>IP 与端口冲突、流量隔离</td>
</tr>
<tr>
<td><strong>Mount</strong></td>
<td>磁盘挂载点</td>
<td>独立文件系统、镜像运行环境</td>
</tr>
<tr>
<td><strong>User</strong></td>
<td>用户与组 ID</td>
<td>容器逃逸风险、权限最小化</td>
</tr>
<tr>
<td><strong>IPC</strong></td>
<td>共享内存</td>
<td>数据跨容器泄露</td>
</tr>
</tbody>
</table>
<p><strong>梓涵，理解了 Namespace 负责“看得到什么”，再配合 Cgroup 负责“能用多少”，你就彻底掌握了容器隔离的底层逻辑。你想让我再详细讲讲你的审计 Agent 是如何通过 cgroup 监控来判定某个 Pod 正在遭受内存泄漏攻击的吗？</strong></p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};