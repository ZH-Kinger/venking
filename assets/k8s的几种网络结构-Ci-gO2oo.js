import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/AI_infra/5_node_5090%E8%AE%A1%E7%AE%97%E8%8A%82%E7%82%B9%E6%94%B9%E9%80%A0/k8s%E7%9A%84%E5%87%A0%E7%A7%8D%E7%BD%91%E7%BB%9C%E7%BB%93%E6%9E%84.html","title":"k8s的几种网络结构","lang":"zh-CN","frontmatter":{"title":"k8s的几种网络结构","icon":"cpu","date":"2026-07-23T00:00:00.000Z","category":["AI基础设施"],"description":"在 Kubernetes (K8s) 的物理架构中，网络模式通常可以从「Pod 内部的网络通信模式」以及「集群级别的网络插件（CNI）实现模式」两个维度来进行解剖。 这是决定大模型算力集群通信延迟与吞吐量的底层生命线。 维度一：Pod 级别的四种网络模式（容器共享机制） 在 K8s 内部，可以通过配置 Pod 的 spec 显式改变其网络隔离级别。 1...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"k8s的几种网络结构\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/AI_infra/5_node_5090%E8%AE%A1%E7%AE%97%E8%8A%82%E7%82%B9%E6%94%B9%E9%80%A0/k8s%E7%9A%84%E5%87%A0%E7%A7%8D%E7%BD%91%E7%BB%9C%E7%BB%93%E6%9E%84.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"k8s的几种网络结构"}],["meta",{"property":"og:description","content":"在 Kubernetes (K8s) 的物理架构中，网络模式通常可以从「Pod 内部的网络通信模式」以及「集群级别的网络插件（CNI）实现模式」两个维度来进行解剖。 这是决定大模型算力集群通信延迟与吞吐量的底层生命线。 维度一：Pod 级别的四种网络模式（容器共享机制） 在 K8s 内部，可以通过配置 Pod 的 spec 显式改变其网络隔离级别。 1..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":5.67,"words":1701},"filePathRelative":"posts/AI基础设施/学习计划/AI_infra/5_node_5090计算节点改造/k8s的几种网络结构.md","excerpt":"<p>在 Kubernetes (K8s) 的物理架构中，网络模式通常可以从「Pod 内部的网络通信模式」<strong>以及</strong>「集群级别的网络插件（CNI）实现模式」两个维度来进行解剖。</p>\\n<p>这是决定大模型算力集群通信延迟与吞吐量的底层生命线。</p>\\n<hr>\\n<h3>维度一：Pod 级别的四种网络模式（容器共享机制）</h3>\\n<p>在 K8s 内部，可以通过配置 Pod 的 <code>spec</code> 显式改变其网络隔离级别。</p>\\n<h4>1. Host 模式 (<code>hostNetwork: true</code>)</h4>\\n<p>我们在前文聊 <code>nodeexpose</code> 时提到过这种暴力直通的机制。</p>","autoDesc":true}`),i={name:`k8s的几种网络结构.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在 Kubernetes (K8s) 的物理架构中，网络模式通常可以从「Pod 内部的网络通信模式」<strong>以及</strong>「集群级别的网络插件（CNI）实现模式」两个维度来进行解剖。</p>
<p>这是决定大模型算力集群通信延迟与吞吐量的底层生命线。</p>
<hr>
<h3 id="维度一-pod-级别的四种网络模式-容器共享机制" tabindex="-1"><a class="header-anchor" href="#维度一-pod-级别的四种网络模式-容器共享机制"><span>维度一：Pod 级别的四种网络模式（容器共享机制）</span></a></h3>
<p>在 K8s 内部，可以通过配置 Pod 的 <code v-pre>spec</code> 显式改变其网络隔离级别。</p>
<h4 id="_1-host-模式-hostnetwork-true" tabindex="-1"><a class="header-anchor" href="#_1-host-模式-hostnetwork-true"><span>1. Host 模式 (<code v-pre>hostNetwork: true</code>)</span></a></h4>
<p>我们在前文聊 <code v-pre>nodeexpose</code> 时提到过这种暴力直通的机制。</p>
<ul>
<li><strong>物理实现</strong>：Pod 完全剥离网络隔离，<strong>直接物理共享宿主机的网络命名空间（Network Namespace）</strong>。</li>
<li><strong>特点</strong>：Pod 内部看到的网卡、IP、端口和路由表与宿主机一模一样。如果在 Pod 里起一个 8080 端口的服务，会直接物理霸占宿主机的 8080 端口。</li>
<li><strong>适用场景</strong>：极致压榨网络性能、完全不想经过任何容器网络损耗的重型 AI 算力节点（如分布式训练的 Worker）。</li>
</ul>
<h4 id="_2-container-模式-shareable-container" tabindex="-1"><a class="header-anchor" href="#_2-container-模式-shareable-container"><span>2. Container 模式 (<code v-pre>Shareable / Container</code>)</span></a></h4>
<ul>
<li><strong>物理实现</strong>：新启动的容器<strong>物理指定加入到一个已经存在的容器的网络命名空间中</strong>。</li>
<li><strong>特点</strong>：这两个容器共享同一个 IP、同一个网卡和同一套端口。它们之间可以通过 <code v-pre>localhost</code> 进行纳秒级的片内超高速通信。</li>
<li><strong>典型应用</strong>：K8s 最核心的 <strong>Pod 内部多容器（Sidecar 模式）</strong>。例如，大模型推理主容器与负责收集 Metrics 监控的 Sidecar 容器之间就是这种关系。</li>
</ul>
<h4 id="_3-none-模式" tabindex="-1"><a class="header-anchor" href="#_3-none-模式"><span>3. None 模式</span></a></h4>
<ul>
<li><strong>物理实现</strong>：Pod 拥有自己独立的网络命名空间，但是 <strong>K8s 不为其配置任何网卡、IP 或路由规则</strong>，只留下一个本地环回网卡（<code v-pre>lo</code>）。</li>
<li><strong>适用场景</strong>：对安全性要求极高、完全不需要且禁止进行任何网络 I/O 的纯封闭式批处理计算任务。</li>
</ul>
<h4 id="_4-bridge-模式-默认模式" tabindex="-1"><a class="header-anchor" href="#_4-bridge-模式-默认模式"><span>4. Bridge 模式（默认模式）</span></a></h4>
<ul>
<li><strong>物理实现</strong>：每个 Pod 拥有独立的网络命名空间，并通过一对虚拟网卡对（<strong>veth-pair</strong>）一头扎在 Pod 内部，一头物理焊接在宿主机的虚拟网桥（如 <code v-pre>cni0</code> 或 <code v-pre>br0</code>）上。</li>
<li><strong>特点</strong>：这是标准的基础隔离模式，Pod 拥有完全独立的、由集群分配的虚拟 IP（如 <code v-pre>10.244.x.x</code>）。</li>
</ul>
<hr>
<h3 id="维度二-集群级别-cni-插件-的三种主流网络架构" tabindex="-1"><a class="header-anchor" href="#维度二-集群级别-cni-插件-的三种主流网络架构"><span>维度二：集群级别（CNI 插件）的三种主流网络架构</span></a></h3>
<p>当多台 8 卡服务器需要跨节点进行大模型、智能体的数据交互时，底层网络插件（CNI）如何打通节点边界，主要依赖以下三种工业架构：</p>
<h4 id="_1-overlay-模式-隧道覆盖网络-——-代表-flannel-vxlan、calico-vxlan" tabindex="-1"><a class="header-anchor" href="#_1-overlay-模式-隧道覆盖网络-——-代表-flannel-vxlan、calico-vxlan"><span>1. Overlay 模式（隧道覆盖网络 —— 代表：Flannel VXLAN、Calico VXLAN）</span></a></h4>
<p>大模型中小规模测试集群最常用的“百搭模式”。</p>
<div class="language-latex line-numbers-mode" data-highlighter="shiki" data-ext="latex" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-latex"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> 【 Pod A (10.244.1.5) 】 ➔ 发出原始数据包 (源: 10.244.1.5, 目的: 10.244.2.8)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">          │</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">          ▼</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> 【 宿主机 A 物理网卡 】 ➔ 物理内封：把原始包作为 Payload，外面再套一层物理机的真实 IP 头</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">          │              (封包过程：添加 VXLAN 头部，将目的转换为 宿主机B 的物理 IP)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">          ▼</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> 【 物理交换机网络 】 ───> 像普通物理机流量一样，穿过 PCIe/网线 传输</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">          │</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">          ▼</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> 【 宿主机 B 物理网卡 】 ➔ 物理解封：剥离外层物理机外壳，还原出原始的 10.244.2.8 数据包</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">          │</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">          ▼</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> 【 Pod B (10.244.2.8) 】 ➔ 成功接收到纯净的原始包</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>技术原理</strong>：通过 <strong>VXLAN</strong> 或 <strong>Geneve</strong> 技术，在现有的物理三层网络之上，通过“封包-解包（Encapsulation/Decapsulation）”，强行在软件层虚拟出一张巨大的、跨机器的二层局域网。</li>
<li><strong>优缺点</strong>：</li>
<li><em>优</em>：对底层物理网络没有任何依赖，只要机器之间能 ping 通，就能一键拉起 K8s 网络。</li>
<li><em>缺</em>：<strong>CPU 损耗大</strong>。每发送一个数据包，宿主机内核都要进行高频的封包和解包计算。在大模型万卡大流吞吐、需要极速同步梯度的场景下，<strong>绝对禁止使用此模式</strong>。</li>
</ul>
<h4 id="_2-underlay-模式-直接物理路由-——-代表-calico-bgp、云厂商-eni-terway" tabindex="-1"><a class="header-anchor" href="#_2-underlay-模式-直接物理路由-——-代表-calico-bgp、云厂商-eni-terway"><span>2. Underlay 模式（直接物理路由 —— 代表：Calico BGP、云厂商 ENI/Terway）</span></a></h4>
<p>我们在 <code v-pre>nodeexpose</code> 篇章中深入剖析过的、专为高性能 AI 智算中心而生的网络方案。</p>
<div class="language-latex line-numbers-mode" data-highlighter="shiki" data-ext="latex" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-latex"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> 【 Pod A (10.244.1.5) 】 ➔ 发出原始数据包</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">          │</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">          ▼ (直接打向宿主机网关，没有任何封包损耗)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> 【 物理核心交换机 】 ➔ 交换机由于提前通过 BGP 学习到了路由：</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">          │             直接查表判断：“10.244.2.0/24 应该路由给 宿主机B 的物理端口”</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">          ▼</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> 【 Pod B (10.244.2.8) 】 ➔ 纳秒级直接送达</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>技术原理</strong>：<strong>完全抛弃软件封包</strong>。</li>
<li><em>方案 A (Calico BGP)</em>：宿主机直接当成路由器，通过 BGP 协议把 Pod 的网段动态宣告给机房的物理核心交换机，让<strong>物理交换机直接负责 Pod 之间的路由转发</strong>。</li>
<li><em>方案 B (云厂商 ENI)</em>：直接调用云厂商 VPC 的底层网络 API，把真实的弹性网卡（VPC 内部真实二级 IP）物理插到容器内部。</li>
<li><strong>优缺点</strong>：</li>
<li><em>优</em>：<strong>几乎零网络损耗</strong>，通信性能等同于物理机直连，完美支持无损 RDMA 网络。</li>
<li><em>缺</em>：对机房物理网络要求极高。物理交换机的路由表容量如果满了，就无法扩展更多节点；云厂商环境则高度绑定厂商特定的 CNI 驱动。</li>
</ul>
<h4 id="_3-routing-模式-直连路由模式-——-代表-flannel-host-gw" tabindex="-1"><a class="header-anchor" href="#_3-routing-模式-直连路由模式-——-代表-flannel-host-gw"><span>3. Routing 模式（直连路由模式 —— 代表：Flannel host-gw）</span></a></h4>
<p>介于 Overlay 与 Underlay 之间的折中设计。</p>
<ul>
<li><strong>技术原理</strong>：不采用 BGP 这种高级协议，而是在每台宿主机的内核路由表里，死死硬编码写入其他所有节点的静态路由规则（例如：“要去节点 B 的 Pod，下一跳直接指向节点 B 的物理 IP”）。</li>
<li><strong>优缺点</strong>：</li>
<li><em>优</em>：没有封包开销，性能非常好。</li>
<li><em>缺</em>：<strong>无法跨三层网络</strong>。所有宿主机必须物理处于同一个二层交换机（同一个局域网网段）内部。如果集群规模变大、跨了不同的机房机架或子网，该模式当场失效。</li>
</ul>
<hr>
<h3 id="💡-工业界架构师的硬冷选型准则" tabindex="-1"><a class="header-anchor" href="#💡-工业界架构师的硬冷选型准则"><span>💡 工业界架构师的硬冷选型准则</span></a></h3>
<ol>
<li><strong>如果你在做大模型微调/预训练算力集群（追求极致 Samples/s）</strong>：<br>
锁死 <strong>Underlay 模式（如云厂商原生 ENI/Terway 或者是自建机房的 Calico BGP 模式）</strong>。配合高性能网络 HPN 拓扑，直接打通物理层，把网络延迟压到物理极限。</li>
<li><strong>如果你在做智能体（Agent）应用开发、微服务编排（追求弹性和研发敏捷度）</strong>：<br>
使用默认的 <strong>Overlay 模式（如 Calico/Flannel VXLAN）</strong>。此时网络开销不是第一瓶颈，研发团队能像玩乐高积木一样快速创建、销毁、迁移 Pod 的隔离优势才是最高优先级。</li>
</ol>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};