import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E4%BA%91%E5%8E%9F%E7%94%9F/docker/K8s/CI_CD/%E9%9B%86%E7%BE%A4%E5%AD%98%E5%82%A8%E6%9E%B6%E6%9E%84/%E9%9B%86%E7%BE%A4%E5%AD%98%E5%82%A8%E6%9E%B6%E6%9E%84.html","title":"集群存储架构","lang":"zh-CN","frontmatter":{"title":"集群存储架构","icon":"cloud","date":"2026-07-23T00:00:00.000Z","category":["云原生"],"description":"集群存储架构速查表 1. 核心技术选型：Local Path Provisioner 你使用的是 Rancher 开发的 Local Path Provisioner。它不像 Ceph 或 NFS 那样需要复杂的网络协议，而是直接利用宿主机的硬盘。 存储驱动 (CSI): local-path 管理工具: Kubernetes StorageClass...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"集群存储架构\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E4%BA%91%E5%8E%9F%E7%94%9F/docker/K8s/CI_CD/%E9%9B%86%E7%BE%A4%E5%AD%98%E5%82%A8%E6%9E%B6%E6%9E%84/%E9%9B%86%E7%BE%A4%E5%AD%98%E5%82%A8%E6%9E%B6%E6%9E%84.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"集群存储架构"}],["meta",{"property":"og:description","content":"集群存储架构速查表 1. 核心技术选型：Local Path Provisioner 你使用的是 Rancher 开发的 Local Path Provisioner。它不像 Ceph 或 NFS 那样需要复杂的网络协议，而是直接利用宿主机的硬盘。 存储驱动 (CSI): local-path 管理工具: Kubernetes StorageClass..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":1.83,"words":549},"filePathRelative":"posts/云原生/docker/K8s/CI_CD/集群存储架构/集群存储架构.md","excerpt":"<h2>集群存储架构速查表</h2>\\n<h3>1. 核心技术选型：<strong>Local Path Provisioner</strong></h3>\\n<p>你使用的是 Rancher 开发的 <strong>Local Path Provisioner</strong>。它不像 Ceph 或 NFS 那样需要复杂的网络协议，而是直接利用宿主机的硬盘。</p>\\n<ul>\\n<li><strong>存储驱动 (CSI)</strong>: <code>local-path</code></li>\\n<li><strong>管理工具</strong>: <code>Kubernetes StorageClass</code></li>\\n<li><strong>物理位置</strong>: 默认在 <code>node-2</code>（以及 <code>node-1</code>）的 <code>/opt/local-path-provisioner/</code> 目录下。</li>\\n</ul>","autoDesc":true}`),i={name:`集群存储架构.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><h2 id="集群存储架构速查表" tabindex="-1"><a class="header-anchor" href="#集群存储架构速查表"><span>集群存储架构速查表</span></a></h2>
<h3 id="_1-核心技术选型-local-path-provisioner" tabindex="-1"><a class="header-anchor" href="#_1-核心技术选型-local-path-provisioner"><span>1. 核心技术选型：<strong>Local Path Provisioner</strong></span></a></h3>
<p>你使用的是 Rancher 开发的 <strong>Local Path Provisioner</strong>。它不像 Ceph 或 NFS 那样需要复杂的网络协议，而是直接利用宿主机的硬盘。</p>
<ul>
<li><strong>存储驱动 (CSI)</strong>: <code v-pre>local-path</code></li>
<li><strong>管理工具</strong>: <code v-pre>Kubernetes StorageClass</code></li>
<li><strong>物理位置</strong>: 默认在 <code v-pre>node-2</code>（以及 <code v-pre>node-1</code>）的 <code v-pre>/opt/local-path-provisioner/</code> 目录下。</li>
</ul>
<hr>
<h3 id="_2-存储运作逻辑-你是怎么实现-自动化-的" tabindex="-1"><a class="header-anchor" href="#_2-存储运作逻辑-你是怎么实现-自动化-的"><span>2. 存储运作逻辑（你是怎么实现“自动化”的）</span></a></h3>
<p>你刚才安装 Jenkins 时，并没有手动去分硬盘，而是通过以下链路实现的：</p>
<ol>
<li><strong>声明 (PVC)</strong>: Jenkins 发出申请：“我需要 10Gi 空间，请找 <code v-pre>local-path</code> 要。”</li>
<li><strong>调度 (Provisioner)</strong>: <code v-pre>local-path</code> 插件监听到申请，自动在 <code v-pre>node-2</code> 的硬盘上创建了一个专属文件夹。</li>
<li><strong>绑定 (PV)</strong>: 系统自动生成一个 <code v-pre>PersistentVolume</code>，并把文件夹“挂载”进 Jenkins 的 Pod。</li>
<li><strong>持久化</strong>: 哪怕你删掉 Jenkins 的 Pod，只要不删 PVC，你的插件和配置都稳稳地躺在 <code v-pre>node-2</code> 的硬盘里。</li>
</ol>
<hr>
<h3 id="_3-当前已承载的资产" tabindex="-1"><a class="header-anchor" href="#_3-当前已承载的资产"><span>3. 当前已承载的资产</span></a></h3>
<p>你可以通过 <code v-pre>kubectl get pvc -A</code> 看到你现在的“家产”：</p>
<table>
<thead>
<tr>
<th><strong>应用名称</strong></th>
<th><strong>存储占用</strong></th>
<th><strong>存储状态</strong></th>
<th><strong>物理节点</strong></th>
<th><strong>存放内容</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Jenkins</strong></td>
<td>10Gi</td>
<td><strong>Bound</strong></td>
<td>node-2</td>
<td>插件、Pipeline 脚本、用户凭据</td>
</tr>
<tr>
<td><strong>(已清理)</strong></td>
<td>70Gi+</td>
<td>-</td>
<td>-</td>
<td>刚才删除 GitLab 释放出的巨大空间</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="为什么这个存储架构适合-openclaw" tabindex="-1"><a class="header-anchor" href="#为什么这个存储架构适合-openclaw"><span>为什么这个存储架构适合 OpenClaw？</span></a></h2>
<p>梓涵，你在面试或写博客时可以这样描述你的思考：</p>
<ul>
<li><strong>低延迟 (Low Latency)</strong>: 因为是本地磁盘 I/O，Python 脚本读取日志文件的速度远高于网络存储，这对 <strong>AIOps 实时预警</strong> 至关重要。</li>
<li><strong>资源精益 (FinOps)</strong>: 零额外内存占用。相比部署一套 Ceph 需要额外消耗 3-5GB 内存，<code v-pre>local-path</code> 几乎不占资源。</li>
<li><strong>高可靠性</strong>: 配合 K8s 的 <code v-pre>StatefulSet</code>，确保了 Jenkins 这种有状态应用的**“数据粘性”**。</li>
</ul>
<hr>
<h2 id="运维小贴士-记在你的开发笔记里" tabindex="-1"><a class="header-anchor" href="#运维小贴士-记在你的开发笔记里"><span>运维小贴士（记在你的开发笔记里）</span></a></h2>
<p>如果你想看看 Jenkins 的数据到底长啥样，可以直接去 <strong>node-2</strong> 执行：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>ls -lh /opt/local-path-provisioner/</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>你会看到一串以 <code v-pre>pvc-xxx</code> 命名的文件夹，那里面就是 Jenkins 的灵魂。</p>
<hr>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};