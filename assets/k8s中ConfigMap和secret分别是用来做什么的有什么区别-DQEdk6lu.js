import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E8%B7%B3%E5%8A%A8%E8%BF%90%E7%BB%B4%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88%E9%9D%A2%E8%AF%95%E5%87%86%E5%A4%87%E6%8C%87%E5%8D%97(%E9%80%82%E9%85%8D%E4%BD%A0%E7%9A%84%E7%AE%80%E5%8E%86%E8%83%8C%E6%99%AF)/K8s/k8s%E4%B8%ADConfigMap%E5%92%8Csecret%E5%88%86%E5%88%AB%E6%98%AF%E7%94%A8%E6%9D%A5%E5%81%9A%E4%BB%80%E4%B9%88%E7%9A%84%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB.html","title":"k8s中ConfigMap和secret分别是用来做什么的有什么区别","lang":"zh-CN","frontmatter":{"title":"k8s中ConfigMap和secret分别是用来做什么的有什么区别","icon":"clipboard-text","date":"2026-07-23T00:00:00.000Z","category":["面试"],"description":"在 Kubernetes (K8s) 中，ConfigMap 和 Secret 都是用来实现“配置与代码分离”的对象。它们允许你将应用程序的配置、凭据等信息从容器镜像中剥离出来，从而提高应用的可移植性和安全性。 1. ConfigMap：通用配置管理 ConfigMap 主要用于存储非敏感的配置数据。你可以将其理解为一个外部的“配置字典”。 常见用途：...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"k8s中ConfigMap和secret分别是用来做什么的有什么区别\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E8%B7%B3%E5%8A%A8%E8%BF%90%E7%BB%B4%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88%E9%9D%A2%E8%AF%95%E5%87%86%E5%A4%87%E6%8C%87%E5%8D%97(%E9%80%82%E9%85%8D%E4%BD%A0%E7%9A%84%E7%AE%80%E5%8E%86%E8%83%8C%E6%99%AF)/K8s/k8s%E4%B8%ADConfigMap%E5%92%8Csecret%E5%88%86%E5%88%AB%E6%98%AF%E7%94%A8%E6%9D%A5%E5%81%9A%E4%BB%80%E4%B9%88%E7%9A%84%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"k8s中ConfigMap和secret分别是用来做什么的有什么区别"}],["meta",{"property":"og:description","content":"在 Kubernetes (K8s) 中，ConfigMap 和 Secret 都是用来实现“配置与代码分离”的对象。它们允许你将应用程序的配置、凭据等信息从容器镜像中剥离出来，从而提高应用的可移植性和安全性。 1. ConfigMap：通用配置管理 ConfigMap 主要用于存储非敏感的配置数据。你可以将其理解为一个外部的“配置字典”。 常见用途：..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.21,"words":664},"filePathRelative":"posts/面试/字节面试/字节跳动运维开发工程师面试准备指南(适配你的简历背景)/K8s/k8s中ConfigMap和secret分别是用来做什么的有什么区别.md","excerpt":"<p>在 Kubernetes (K8s) 中，<strong>ConfigMap</strong> 和 <strong>Secret</strong> 都是用来实现“配置与代码分离”的对象。它们允许你将应用程序的配置、凭据等信息从容器镜像中剥离出来，从而提高应用的可移植性和安全性。</p>\\n<hr>\\n<h2>1. ConfigMap：通用配置管理</h2>\\n<p>ConfigMap 主要用于存储<strong>非敏感</strong>的配置数据。你可以将其理解为一个外部的“配置字典”。</p>\\n<ul>\\n<li>\\n<p><strong>常见用途：</strong></p>\\n</li>\\n<li>\\n<p>存储环境变量（如 <code>DB_HOST=localhost</code>）。</p>\\n</li>\\n<li>\\n<p>存储配置文件（如 <code>nginx.conf</code>、<code>application.yml</code>）。</p>\\n</li>\\n<li>\\n<p>存储命令行参数。</p>\\n</li>\\n<li>\\n<p><strong>存储形式：</strong> 以明文形式存储在 etcd 中。</p>\\n</li>\\n</ul>","autoDesc":true}`),i={name:`k8s中ConfigMap和secret分别是用来做什么的有什么区别.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在 Kubernetes (K8s) 中，<strong>ConfigMap</strong> 和 <strong>Secret</strong> 都是用来实现“配置与代码分离”的对象。它们允许你将应用程序的配置、凭据等信息从容器镜像中剥离出来，从而提高应用的可移植性和安全性。</p>
<hr>
<h2 id="_1-configmap-通用配置管理" tabindex="-1"><a class="header-anchor" href="#_1-configmap-通用配置管理"><span>1. ConfigMap：通用配置管理</span></a></h2>
<p>ConfigMap 主要用于存储<strong>非敏感</strong>的配置数据。你可以将其理解为一个外部的“配置字典”。</p>
<ul>
<li>
<p><strong>常见用途：</strong></p>
</li>
<li>
<p>存储环境变量（如 <code v-pre>DB_HOST=localhost</code>）。</p>
</li>
<li>
<p>存储配置文件（如 <code v-pre>nginx.conf</code>、<code v-pre>application.yml</code>）。</p>
</li>
<li>
<p>存储命令行参数。</p>
</li>
<li>
<p><strong>存储形式：</strong> 以明文形式存储在 etcd 中。</p>
</li>
</ul>
<h2 id="_2-secret-敏感数据管理" tabindex="-1"><a class="header-anchor" href="#_2-secret-敏感数据管理"><span>2. Secret：敏感数据管理</span></a></h2>
<p>Secret 专门用于存储<strong>敏感信息</strong>。它的工作机制与 ConfigMap 类似，但在处理和存储上多了一层保护。</p>
<ul>
<li>
<p><strong>常见用途：</strong></p>
</li>
<li>
<p>数据库密码、用户密钥。</p>
</li>
<li>
<p>SSH 密钥、TLS 证书。</p>
</li>
<li>
<p>Docker Registry 的认证信息（用于拉取私有镜像）。</p>
</li>
<li>
<p><strong>存储形式：</strong> 在 etcd 中以 <strong>Base64 编码</strong>存储（注意：Base64 仅是编码，不是加密，生产环境通常需要配合额外的加密插件，如 KMS）。</p>
</li>
</ul>
<hr>
<h2 id="_3-configmap-vs-secret-的核心区别" tabindex="-1"><a class="header-anchor" href="#_3-configmap-vs-secret-的核心区别"><span>3. ConfigMap vs Secret 的核心区别</span></a></h2>
<table>
<thead>
<tr>
<th><strong>特性</strong></th>
<th><strong>ConfigMap</strong></th>
<th><strong>Secret</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>主要目的</strong></td>
<td>存储非敏感配置（明文）</td>
<td>存储敏感信息（加密/编码）</td>
</tr>
<tr>
<td><strong>数据展示</strong></td>
<td>直接可见明文</td>
<td>默认以 Base64 编码显示</td>
</tr>
<tr>
<td><strong>典型内容</strong></td>
<td>配置文件、环境变量、开关</td>
<td>密码、Token、证书、密钥</td>
</tr>
<tr>
<td><strong>内存限制</strong></td>
<td>1MB (etcd 限制)</td>
<td>1MB (etcd 限制)</td>
</tr>
<tr>
<td><strong>挂载机制</strong></td>
<td>可作为环境变量或文件挂载</td>
<td>同左，但挂载为文件时通常使用内存文件系统 (tmpfs)</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="_4-它们是如何被使用的" tabindex="-1"><a class="header-anchor" href="#_4-它们是如何被使用的"><span>4. 它们是如何被使用的？</span></a></h2>
<p>无论哪种对象，你通常有三种方式将它们注入到 Pod 中：</p>
<ol>
<li><strong>环境变量 (Environment Variables)：</strong> 直接将键值对映射给容器。</li>
<li><strong>命令行参数 (Command-line arguments)：</strong> 在 <code v-pre>args</code> 中引用。</li>
<li><strong>数据卷挂载 (Volume Mounts)：</strong> 将配置对象挂载为容器内的一个<strong>目录</strong>，每个 Key 都会变成该目录下的一个<strong>文件</strong>。这种方式最常用，因为支持<strong>热更新</strong>（修改 ConfigMap 后，容器内的文件会自动更新，而环境变量则需要重启 Pod）。</li>
</ol>
<h2 id="关键建议" tabindex="-1"><a class="header-anchor" href="#关键建议"><span>关键建议</span></a></h2>
<p>虽然 Secret 默认只是 Base64 编码，但在集群管理中，Kubernetes 对 Secret 有特殊的优化：比如 Secret 数据通常只发送到运行相关 Pod 的节点上，且存储在节点的内存中（tmpfs），而不是写到磁盘上。</p>
<p>你想了解如何编写一个 YAML 文件来将 ConfigMap 挂载为容器内的配置文件吗？</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};