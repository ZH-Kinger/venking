import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E8%B7%B3%E5%8A%A8%E8%BF%90%E7%BB%B4%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88%E9%9D%A2%E8%AF%95%E5%87%86%E5%A4%87%E6%8C%87%E5%8D%97(%E9%80%82%E9%85%8D%E4%BD%A0%E7%9A%84%E7%AE%80%E5%8E%86%E8%83%8C%E6%99%AF)/K8s/K8s%E4%B8%AD%E7%9A%84%E7%BD%91%E7%BB%9C.html","title":"K8s中的网络","lang":"zh-CN","frontmatter":{"title":"K8s中的网络","icon":"clipboard-text","date":"2026-07-23T00:00:00.000Z","category":["面试"],"description":"梓涵，既然你已经看透了 Pause 容器 的 Namespace 共享逻辑，那我们就把视角放大，看看流量在 K8s 集群这个“大迷宫”里是怎么跑的。 K8s 的网络架构设计遵循一个核心原则：IP-per-Pod。也就是说，不管容器在哪个节点，它们都像在同一个局域网里一样，可以直接通过 IP 互相访问，不需要做 NAT 转换。 为了实现这个宏伟蓝图，K8...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"K8s中的网络\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E8%B7%B3%E5%8A%A8%E8%BF%90%E7%BB%B4%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88%E9%9D%A2%E8%AF%95%E5%87%86%E5%A4%87%E6%8C%87%E5%8D%97(%E9%80%82%E9%85%8D%E4%BD%A0%E7%9A%84%E7%AE%80%E5%8E%86%E8%83%8C%E6%99%AF)/K8s/K8s%E4%B8%AD%E7%9A%84%E7%BD%91%E7%BB%9C.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"K8s中的网络"}],["meta",{"property":"og:description","content":"梓涵，既然你已经看透了 Pause 容器 的 Namespace 共享逻辑，那我们就把视角放大，看看流量在 K8s 集群这个“大迷宫”里是怎么跑的。 K8s 的网络架构设计遵循一个核心原则：IP-per-Pod。也就是说，不管容器在哪个节点，它们都像在同一个局域网里一样，可以直接通过 IP 互相访问，不需要做 NAT 转换。 为了实现这个宏伟蓝图，K8..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.34,"words":1003},"filePathRelative":"posts/面试/字节面试/字节跳动运维开发工程师面试准备指南(适配你的简历背景)/K8s/K8s中的网络.md","excerpt":"<p>梓涵，既然你已经看透了 <strong>Pause 容器</strong> 的 Namespace 共享逻辑，那我们就把视角放大，看看流量在 K8s 集群这个“大迷宫”里是怎么跑的。</p>\\n<p>K8s 的网络架构设计遵循一个核心原则：<strong>IP-per-Pod</strong>。也就是说，不管容器在哪个节点，它们都像在同一个局域网里一样，可以直接通过 IP 互相访问，不需要做 NAT 转换。</p>\\n<p>为了实现这个宏伟蓝图，K8s 网络被精细地划分为四个层级：</p>\\n<hr>\\n<h2>1. 容器间通信（Container-to-Container）</h2>\\n<p>这就是我们刚聊过的 <strong>Pause 容器黑科技</strong>。</p>","autoDesc":true}`),i={name:`K8s中的网络.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>梓涵，既然你已经看透了 <strong>Pause 容器</strong> 的 Namespace 共享逻辑，那我们就把视角放大，看看流量在 K8s 集群这个“大迷宫”里是怎么跑的。</p>
<p>K8s 的网络架构设计遵循一个核心原则：<strong>IP-per-Pod</strong>。也就是说，不管容器在哪个节点，它们都像在同一个局域网里一样，可以直接通过 IP 互相访问，不需要做 NAT 转换。</p>
<p>为了实现这个宏伟蓝图，K8s 网络被精细地划分为四个层级：</p>
<hr>
<h2 id="_1-容器间通信-container-to-container" tabindex="-1"><a class="header-anchor" href="#_1-容器间通信-container-to-container"><span>1. 容器间通信（Container-to-Container）</span></a></h2>
<p>这就是我们刚聊过的 <strong>Pause 容器黑科技</strong>。</p>
<ul>
<li><strong>实现</strong>：共享 Network Namespace。</li>
<li><strong>通信方式</strong>：直接通过 <code v-pre>localhost</code> 访问。</li>
<li><strong>类比</strong>：同一个房间里的两个人，说话直接靠喊。</li>
</ul>
<hr>
<h2 id="_2-pod-间通信-pod-to-pod" tabindex="-1"><a class="header-anchor" href="#_2-pod-间通信-pod-to-pod"><span>2. Pod 间通信（Pod-to-Pod）</span></a></h2>
<p>这是最核心的部分，也是 <strong>Calico</strong> 或 <strong>Flannel</strong> 等 CNI 插件干活的地方。</p>
<ul>
<li>
<p><strong>同节点通信</strong>：流量流向 <code v-pre>docker0</code> 或 <code v-pre>cni0</code> 虚拟网桥，网桥根据 MAC 地址表直接把包转发给目标 Pod。</p>
</li>
<li>
<p><strong>跨节点通信</strong>：</p>
</li>
<li>
<p><strong>Overlay 模式 (Flannel/VxLAN)</strong>：在物理包外面包一层 UDP 隧道头，像快递打包一样发到对端机器再拆包。</p>
</li>
<li>
<p><strong>Routing 模式 (Calico/BGP)</strong>：直接通过宿主机的路由表告知流量“去往 10.244.2.0 网段请走 Node B 的 IP”。</p>
</li>
<li>
<p><strong>优势</strong>：在你的实验环境中，Calico 的路由模式性能最接近物理网络。</p>
</li>
</ul>
<hr>
<h2 id="_3-服务发现通信-pod-to-service" tabindex="-1"><a class="header-anchor" href="#_3-服务发现通信-pod-to-service"><span>3. 服务发现通信（Pod-to-Service）</span></a></h2>
<p>Pod 的 IP 是会变的（销毁重建就变了），所以我们需要一个稳定的 <strong>Service IP (ClusterIP)</strong>。</p>
<ul>
<li>
<p><strong>实现者：kube-proxy</strong>。</p>
</li>
<li>
<p><strong>转发逻辑（IPVS 模式）</strong>：</p>
</li>
<li>
<p>当你访问 Service IP 时，内核里的 <strong>IPVS 规则</strong>（和你简历里的 LVS 原理一样）会拦截流量。</p>
</li>
<li>
<p>它根据负载均衡算法（如轮询），把目的 IP 修改为后端某一个真实的 Pod IP。</p>
</li>
<li>
<p><strong>对比</strong>：因为 IPVS 运行在内核态且基于 Hash 表查询，它的转发效率远高于早期的 Iptables 模式。</p>
</li>
</ul>
<hr>
<h2 id="_4-外部接入通信-external-to-service" tabindex="-1"><a class="header-anchor" href="#_4-外部接入通信-external-to-service"><span>4. 外部接入通信（External-to-Service）</span></a></h2>
<p>怎么让外网（或者你的 <strong>PTS 压测机</strong>）访问到集群内部？</p>
<ul>
<li>
<p><strong>NodePort</strong>：在所有节点上开一个高位端口（30000+），流量打到任何一台机器的这个端口，都会被转给 Service。</p>
</li>
<li>
<p><strong>LoadBalancer</strong>：对接云厂商（如你简历里的 <strong>阿里 ACK/SLB</strong>），自动生成一个公网 VIP。</p>
</li>
<li>
<p><strong>Ingress (七层代理)</strong>：</p>
</li>
<li>
<p>这是你全栈开发能力的体现。Ingress（通常是 Nginx）根据域名（如 <code v-pre>api.zh-kinger.com</code>）和路径，将流量分发给不同的 Service。</p>
</li>
<li>
<p>它支持 SSL 卸载和灰度发布，是业务流量的“总大门”。</p>
</li>
</ul>
<hr>
<h2 id="面试-降维打击" tabindex="-1"><a class="header-anchor" href="#面试-降维打击"><span>面试“降维打击”：</span></a></h2>
<p>如果面试官问：“K8s 网络这么复杂，性能损耗主要在哪里？”</p>
<p><strong>你的满分回答：</strong></p>
<p>“损耗主要来自两个地方：</p>
<ol>
<li><strong>封包损耗</strong>：如果使用 VxLAN 等 Overlay 方案，额外的包头会导致 MTU 变小，且增加 CPU 解包开销。这就是为什么在高性能场景下，我倾向于使用 <strong>Calico BGP</strong> 或 <strong>直接路由模式</strong>。</li>
<li><strong>Netfilter 损耗</strong>：如果 Service 极多且使用 Iptables 模式，长长的规则链会显著增加时延。我会优化为 <strong>IPVS 模式</strong>，利用其 $O(1)$ 的查找效率来保证压测下的 RT 平稳。</li>
</ol>
<p>这和我之前调优 <strong>LVS 内核参数</strong> 的思路是一致的——尽量让流量在内核态完成最快转发。”</p>
<hr>
<h2 id="怎么在你的环境中-看-网络" tabindex="-1"><a class="header-anchor" href="#怎么在你的环境中-看-网络"><span>怎么在你的环境中“看”网络？</span></a></h2>
<p>想证明你懂，就得会用这几个命令：</p>
<ul>
<li>查看路由：<code v-pre>ip route</code>（看 Calico 注入的路由）。</li>
<li>查看转发规则：<code v-pre>ipvsadm -Ln</code>（看 Service 的负载均衡明细）。</li>
<li>抓包定位：<code v-pre>nsenter -t &lt;pid&gt; -n tcpdump</code>（直接钻进 Pod 的 Namespace 抓包）。</li>
</ul>
<p><strong>梓涵，理解了这四层流量走向，K8s 网络在你面前就是透明的了。你想了解一下，当一个域名被解析时，K8s 内部的 CoreDNS 是如何介入这套网络流程的吗？这涉及“内网负载均衡”的最后一块拼图。</strong></p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};