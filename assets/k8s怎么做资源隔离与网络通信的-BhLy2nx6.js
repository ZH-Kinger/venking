import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E8%B7%B3%E5%8A%A8%E8%BF%90%E7%BB%B4%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88%E9%9D%A2%E8%AF%95%E5%87%86%E5%A4%87%E6%8C%87%E5%8D%97(%E9%80%82%E9%85%8D%E4%BD%A0%E7%9A%84%E7%AE%80%E5%8E%86%E8%83%8C%E6%99%AF)/K8s/k8s%E6%80%8E%E4%B9%88%E5%81%9A%E8%B5%84%E6%BA%90%E9%9A%94%E7%A6%BB%E4%B8%8E%E7%BD%91%E7%BB%9C%E9%80%9A%E4%BF%A1%E7%9A%84.html","title":"k8s怎么做资源隔离与网络通信的","lang":"zh-CN","frontmatter":{"title":"k8s怎么做资源隔离与网络通信的","icon":"clipboard-text","date":"2026-07-23T00:00:00.000Z","category":["面试"],"description":"一、 资源隔离：cgroups 与 Namespace 的深度配合 K8s 的隔离不是“真虚拟机”，而是进程级的逻辑限制。 1. 基础隔离：Linux Namespace 每个 Pod 都有自己独立的 命名空间，这保证了 Pod 之间看不到对方的进程（PID）、挂载点（Mount）和主机名（UTS）。 面试点：K8s 最精妙的是 Infra Conta...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"k8s怎么做资源隔离与网络通信的\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E8%B7%B3%E5%8A%A8%E8%BF%90%E7%BB%B4%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88%E9%9D%A2%E8%AF%95%E5%87%86%E5%A4%87%E6%8C%87%E5%8D%97(%E9%80%82%E9%85%8D%E4%BD%A0%E7%9A%84%E7%AE%80%E5%8E%86%E8%83%8C%E6%99%AF)/K8s/k8s%E6%80%8E%E4%B9%88%E5%81%9A%E8%B5%84%E6%BA%90%E9%9A%94%E7%A6%BB%E4%B8%8E%E7%BD%91%E7%BB%9C%E9%80%9A%E4%BF%A1%E7%9A%84.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"k8s怎么做资源隔离与网络通信的"}],["meta",{"property":"og:description","content":"一、 资源隔离：cgroups 与 Namespace 的深度配合 K8s 的隔离不是“真虚拟机”，而是进程级的逻辑限制。 1. 基础隔离：Linux Namespace 每个 Pod 都有自己独立的 命名空间，这保证了 Pod 之间看不到对方的进程（PID）、挂载点（Mount）和主机名（UTS）。 面试点：K8s 最精妙的是 Infra Conta..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.19,"words":956},"filePathRelative":"posts/面试/字节面试/字节跳动运维开发工程师面试准备指南(适配你的简历背景)/K8s/k8s怎么做资源隔离与网络通信的.md","excerpt":"<h3>一、 资源隔离：cgroups 与 Namespace 的深度配合</h3>\\n<p>K8s 的隔离不是“真虚拟机”，而是<strong>进程级的逻辑限制</strong>。</p>\\n<h4>1. 基础隔离：Linux Namespace</h4>\\n<p>每个 Pod 都有自己独立的 <strong>命名空间</strong>，这保证了 Pod 之间看不到对方的进程（PID）、挂载点（Mount）和主机名（UTS）。</p>\\n<p><strong>面试点</strong>：K8s 最精妙的是 <strong>Infra Container（Pause 容器）</strong>。一个 Pod 里的所有容器共享同一个 Network Namespace，所以它们可以直接通过 <code>localhost</code> 通信。</p>","autoDesc":true}`),i={name:`k8s怎么做资源隔离与网络通信的.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><h3 id="一、-资源隔离-cgroups-与-namespace-的深度配合" tabindex="-1"><a class="header-anchor" href="#一、-资源隔离-cgroups-与-namespace-的深度配合"><span>一、 资源隔离：cgroups 与 Namespace 的深度配合</span></a></h3>
<p>K8s 的隔离不是“真虚拟机”，而是<strong>进程级的逻辑限制</strong>。</p>
<h4 id="_1-基础隔离-linux-namespace" tabindex="-1"><a class="header-anchor" href="#_1-基础隔离-linux-namespace"><span>1. 基础隔离：Linux Namespace</span></a></h4>
<p>每个 Pod 都有自己独立的 <strong>命名空间</strong>，这保证了 Pod 之间看不到对方的进程（PID）、挂载点（Mount）和主机名（UTS）。</p>
<p><strong>面试点</strong>：K8s 最精妙的是 <strong>Infra Container（Pause 容器）</strong>。一个 Pod 里的所有容器共享同一个 Network Namespace，所以它们可以直接通过 <code v-pre>localhost</code> 通信。</p>
<h4 id="_2-资源限制-cgroups-request-limit" tabindex="-1"><a class="header-anchor" href="#_2-资源限制-cgroups-request-limit"><span>2. 资源限制：cgroups (Request &amp; Limit)</span></a></h4>
<p>这是你做 <strong>AIOps 趋势预警</strong> 的基础数据来源。</p>
<ul>
<li>
<p><strong>Requests</strong>：保证“底线”。调度器（Scheduler）根据这个值决定 Pod 往哪台机器放。</p>
</li>
<li>
<p><strong>Limits</strong>：设定“天花板”。</p>
</li>
<li>
<p><strong>CPU 隔离</strong>：是压缩型资源。超过 Limit 只是会被 <strong>Throttling（限流）</strong>，进程变慢但不会死。</p>
</li>
<li>
<p><strong>Memory 隔离</strong>：是非压缩型。一旦超过 Limit，就会触发 <strong>OOM Killer</strong>。</p>
</li>
</ul>
<p><strong>话术</strong>：<em>“在我的压测中，我会重点监控</em> <code v-pre>*container_cpu_cfs_throttled_seconds_total*</code> <em>指标。如果这个值激增，说明我的 Limit 设小了，触发了内核的 CFS 调度限制，这会直接导致业务延迟（Latency）抖动。”</em></p>
<hr>
<h3 id="二、-网络通信-从-pod-到-service-的流量转发" tabindex="-1"><a class="header-anchor" href="#二、-网络通信-从-pod-到-service-的流量转发"><span>二、 网络通信：从 Pod 到 Service 的流量转发</span></a></h3>
<p>K8s 网络遵循 <strong>“每个 Pod 拥有独立 IP”</strong> 的扁平化原则。</p>
<h4 id="_1-pod-间通信-cni-插件-overlay-vs-routing" tabindex="-1"><a class="header-anchor" href="#_1-pod-间通信-cni-插件-overlay-vs-routing"><span>1. Pod 间通信：CNI 插件 (Overlay vs Routing)</span></a></h4>
<p>你简历里提到的 <strong>Flannel</strong> 或 <strong>Calico</strong> 解决了跨节点通信问题：</p>
<ul>
<li><strong>Flannel (VxLAN)</strong>：在物理包外再包一层隧道头。</li>
<li><strong>Calico (BGP)</strong>：直接修改宿主机的路由表，把宿主机当路由器。</li>
</ul>
<p><strong>落地感</strong>：如果你追求性能（像你的 LVS 架构一样），你会选 Calico 的 BGP 模式，因为它省去了封包解包的 CPU 损耗。</p>
<h4 id="_2-服务发现-service-与-kube-proxy" tabindex="-1"><a class="header-anchor" href="#_2-服务发现-service-与-kube-proxy"><span>2. 服务发现：Service 与 kube-proxy</span></a></h4>
<p>这是实现**“内部负载均衡”**的核心。流量到达 Service IP 后，由 <strong>kube-proxy</strong> 转发：</p>
<ul>
<li><strong>IPVS 模式 (你的最爱)</strong>：</li>
</ul>
<p>K8s 会在每个节点上创建一个虚拟网卡，并利用 <strong>IPVS 模块</strong>（和 LVS 同款）来做负载均衡。</p>
<ul>
<li><strong>对比</strong>：相比传统的 Iptables 模式，IPVS 在处理成千上万个 Service 时，查询效率是 O(1)，性能更稳，且支持 <strong>轮询（rr）</strong> 和 <strong>最小连接数（lc）</strong> 算法。</li>
</ul>
<p>[Image showing K8s networking: Pod-to-Pod via CNI and Pod-to-Service via IPVS]</p>
<hr>
<h3 id="三、-网络隔离-network-policy-安全组" tabindex="-1"><a class="header-anchor" href="#三、-网络隔离-network-policy-安全组"><span>三、 网络隔离：Network Policy (安全组)</span></a></h3>
<p>既然你熟悉 <strong>DMZ 隔离</strong>，那在 K8s 里你就不能只靠防火墙了，得靠 <strong>Network Policy</strong>。</p>
<ul>
<li><strong>原理</strong>：基于标签（Label）选择器，通过控制 Iptables 链来决定哪些 Pod 能互访。</li>
<li><strong>具体操作</strong>：</li>
</ul>
<p>“我会定义一条策略，只允许带有 <code v-pre>app: gateway</code> 标签的 Pod 访问 <code v-pre>app: database</code> 的 3306 端口，禁止其他所有非业务流量。这在 Pod 频繁漂移的情况下，实现了<strong>动态的精细化访问控制</strong>。”</p>
<hr>
<h3 id="面试必杀技" tabindex="-1"><a class="header-anchor" href="#面试必杀技"><span>面试必杀技：</span></a></h3>
<p>面试官问：<strong>“既然 LVS 很快，那 K8s 里的 Ingress 为什么要用 Nginx？”</strong></p>
<p><strong>你的满分回答</strong>：</p>
<p>“这其实是 <strong>‘四层调度与七层转发’</strong> 的结合。</p>
<ol>
<li><strong>LVS/云负载均衡 (LB)</strong>：站在最前面，利用其极致的四层转发性能（MAC 转换）处理大规模并发，将流量导向 K8s 节点的 NodePort。</li>
<li><strong>Ingress (Nginx/Envoy)</strong>：处理七层的逻辑，如 SSL 卸载、路径路由、Rewrite 规则。</li>
</ol>
<p>这种**‘双层负载均衡’**架构，既发挥了 LVS 的高吞吐，又利用了 Nginx 处理复杂业务逻辑的灵活性，这正是大型分布式系统的标准实践。”</p>
<hr>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h3>
<p>K8s 的资源隔离靠 <strong>cgroups</strong>，网络通信靠 <strong>CNI（打通隧道）</strong> 和 <strong>Service（转发流量）</strong>。</p>
<p><strong>梓涵，你既然熟悉 Kafka 和 MySQL，你想了解一下在 K8s 中如何通过 Headless Service 和 StatefulSet 来保证这些“有状态应用”的网络唯一性吗？这是从“只会用 K8s”到“能做中间件运维”的分水岭。</strong></p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};