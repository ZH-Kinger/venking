import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/data_Infra/NLB.html","title":"NLB","lang":"zh-CN","frontmatter":{"title":"NLB","icon":"cpu","date":"2026-07-31T00:00:00.000Z","category":["AI基础设施"],"description":"网络负载均衡（Network Load Balancer，简称 NLB） 是云计算和数据中心架构中专门用于处理极高并发、超低延迟流量转发的关键组件。 简单来说，它的主要任务就是站在一群后端服务器的前面，把成千上万来自客户端的网络请求，均匀、快速地分发给后面的服务器，避免某台服务器被压垮，同时保证系统的高可用。 1. NLB 的核心定位：四层负载均衡 在...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"NLB\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/Pasted%20image%2020260729194401.png\\"],\\"datePublished\\":\\"2026-07-31T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/data_Infra/NLB.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"NLB"}],["meta",{"property":"og:description","content":"网络负载均衡（Network Load Balancer，简称 NLB） 是云计算和数据中心架构中专门用于处理极高并发、超低延迟流量转发的关键组件。 简单来说，它的主要任务就是站在一群后端服务器的前面，把成千上万来自客户端的网络请求，均匀、快速地分发给后面的服务器，避免某台服务器被压垮，同时保证系统的高可用。 1. NLB 的核心定位：四层负载均衡 在..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/Pasted%20image%2020260729194401.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-31T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":4,"words":1199},"filePathRelative":"posts/AI基础设施/data_Infra/NLB.md","excerpt":"<p><strong>网络负载均衡（Network Load Balancer，简称 NLB）</strong> 是云计算和数据中心架构中专门用于处理<strong>极高并发</strong>、<strong>超低延迟</strong>流量转发的关键组件。</p>\\n<p>简单来说，它的主要任务就是<strong>站在一群后端服务器的前面，把成千上万来自客户端的网络请求，均匀、快速地分发给后面的服务器</strong>，避免某台服务器被压垮，同时保证系统的高可用。</p>\\n<h2>1. NLB 的核心定位：四层负载均衡</h2>\\n<p>在网络 OSI 七层模型中，NLB 工作在 <strong>第 4 层（Transport Layer，传输层）</strong>，主要处理 <strong>TCP、UDP、TLS</strong> 协议。</p>","autoDesc":true}`),i={name:`NLB.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p><strong>网络负载均衡（Network Load Balancer，简称 NLB）</strong> 是云计算和数据中心架构中专门用于处理<strong>极高并发</strong>、<strong>超低延迟</strong>流量转发的关键组件。</p>
<p>简单来说，它的主要任务就是<strong>站在一群后端服务器的前面，把成千上万来自客户端的网络请求，均匀、快速地分发给后面的服务器</strong>，避免某台服务器被压垮，同时保证系统的高可用。</p>
<h2 id="_1-nlb-的核心定位-四层负载均衡" tabindex="-1"><a class="header-anchor" href="#_1-nlb-的核心定位-四层负载均衡"><span>1. NLB 的核心定位：四层负载均衡</span></a></h2>
<p>在网络 OSI 七层模型中，NLB 工作在 <strong>第 4 层（Transport Layer，传输层）</strong>，主要处理 <strong>TCP、UDP、TLS</strong> 协议。</p>
<p>与工作在 <strong>第 7 层（Application Layer，应用层）</strong> 的应用负载均衡（ALB，如 Nginx、HTTP 转发）不同：<br>
<img src="/blog/assets/posts/Pasted%20image%2020260729194401.png" alt="" loading="lazy"></p>
<table>
<thead>
<tr>
<th><strong>特性</strong></th>
<th><strong>NLB（四层负载均衡）</strong></th>
<th><strong>ALB（七层负载均衡）</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>工作层级</strong></td>
<td>OSI 第 4 层（IP + Port）</td>
<td>OSI 第 7 层（HTTP / HTTPS / Cookie 等）</td>
</tr>
<tr>
<td><strong>数据感知</strong></td>
<td><strong>不解析</strong>应用层数据，只看源/目的 IP 和端口</td>
<td>解析完整 HTTP 报文、URL 路径、Header、Cookie</td>
</tr>
<tr>
<td><strong>性能/延迟</strong></td>
<td><strong>极高吞吐量，亚毫秒级延迟</strong></td>
<td>吞吐量较低，毫秒级延迟（解包/组包有开销）</td>
</tr>
<tr>
<td><strong>典型场景</strong></td>
<td>游戏服务器、物联网（IoT）、数据库集群、K8s NodePort / Ingress 入口</td>
<td>Web 网站、微路由分发、API 网关</td>
</tr>
</tbody>
</table>
<blockquote>
<p><strong>关键区别</strong>：NLB 就像快递分拣中心，<strong>只看包裹外面的地址（IP 和端口）</strong> 就快速甩给下一站，根本不拆开看包裹里面装的是文字、图片还是视频。因此它的处理效率极高。</p>
</blockquote>
<h2 id="_2-nlb-是怎么工作的-技术实现原理" tabindex="-1"><a class="header-anchor" href="#_2-nlb-是怎么工作的-技术实现原理"><span>2. NLB 是怎么工作的？（技术实现原理）</span></a></h2>
<p>NLB 要实现高性能转发，底层依赖于几种核心技术机制：</p>
<h3 id="_1-哈希算法与连接保持-5-tuple-hashing" tabindex="-1"><a class="header-anchor" href="#_1-哈希算法与连接保持-5-tuple-hashing"><span>① 哈希算法与连接保持（5-Tuple Hashing）</span></a></h3>
<p>当客户端发起 TCP/UDP 请求时，NLB 会提取数据包的<strong>五元组</strong>信息：</p>
<ul>
<li>
<p>源 IP（Source IP）</p>
</li>
<li>
<p>源端口（Source Port）</p>
</li>
<li>
<p>目的 IP（Destination IP）</p>
</li>
<li>
<p>目的端口（Destination Port）</p>
</li>
<li>
<p>传输层协议（TCP/UDP）</p>
</li>
</ul>
<p>通过对五元组计算 Hash 值，NLB 将请求映射到后端的某台特定的后端服务器（Real Server）。<strong>只要这五元组不变，同一个客户端连接的所有后续数据包都会落到同一台后端机器上</strong>。</p>
<h3 id="_2-转发模式-dnat-与-direct-server-return" tabindex="-1"><a class="header-anchor" href="#_2-转发模式-dnat-与-direct-server-return"><span>② 转发模式（DNAT 与 Direct Server Return）</span></a></h3>
<p>在底层数据包转发上，NLB 主要有两种主流模式：</p>
<ol>
<li>
<p><strong>DNAT 模式（Destination Network Address Translation）</strong>：</p>
<ul>
<li>
<p>客户端发送请求到 NLB 的 VIP（Virtual IP）。</p>
</li>
<li>
<p>NLB 将数据包的<strong>目的 IP</strong> 修改为所选后端服务器的 Real IP，然后转发过去。</p>
</li>
<li>
<p>后端服务器响应时，数据包再原路返回给 NLB，NLB 把<strong>源 IP</strong> 改回 VIP 再发给客户端。</p>
</li>
</ul>
</li>
<li>
<p><strong>DSR 模式（Direct Server Return / 三角传输）</strong>：</p>
<ul>
<li>
<p><strong>超高性能场景常用</strong>。NLB 收到请求后，仅修改数据包的<strong>目的 MAC 地址</strong>（IP 保持 VIP 不变），直接送给后端服务器。</p>
</li>
<li>
<p>后端服务器配置有 Loopback 虚拟网卡挂载该 VIP，处理完请求后，<strong>直接把响应包发送给客户端，不再经过 NLB</strong>。</p>
</li>
<li>
<p><strong>优势</strong>：出网流量（通常远大于入网流量）不占用 NLB 的带宽瓶颈。</p>
</li>
</ul>
</li>
</ol>
<h3 id="_3-健康检查-health-check-与故障转移" tabindex="-1"><a class="header-anchor" href="#_3-健康检查-health-check-与故障转移"><span>③ 健康检查（Health Check）与故障转移</span></a></h3>
<p>NLB 会定期向后端服务器发送探针：</p>
<ul>
<li>
<p><strong>TCP 探针</strong>：尝试与后端的指定端口建立 TCP 三次握手。</p>
</li>
<li>
<p><strong>HTTP/UDP 探针</strong>：发送简单请求并校验返回状态。</p>
</li>
</ul>
<p>如果某台后端服务器在连续 N 次检查中未响应，NLB 会将其自动标记为 &quot;Unhealthy&quot;（不健康），并将新流量切走；待该节点恢复后，再自动将其拉回集群。</p>
<h2 id="_3-生产环境中的典型架构示例" tabindex="-1"><a class="header-anchor" href="#_3-生产环境中的典型架构示例"><span>3. 生产环境中的典型架构示例</span></a></h2>
<p>在现代云原生架构（如 AWS、阿里云或 Kubernetes 环境）中，NLB 通常与 ALB 配合形成<strong>双层负载均衡</strong>：</p>
<p>Plaintext</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>[ 互联网客户端 / 移动 App ]</span></span>
<span class="line"><span>           │</span></span>
<span class="line"><span>           ▼</span></span>
<span class="line"><span>┌──────────────────────────┐</span></span>
<span class="line"><span>│  NLB (网络负载均衡 - L4) │ ──► 负责处理极高并发、提供固定公网静态 IP、防 DDOS 入口</span></span>
<span class="line"><span>└────────────┬─────────────┘</span></span>
<span class="line"><span>             │ (将 TCP 流量透传)</span></span>
<span class="line"><span>             ▼</span></span>
<span class="line"><span>┌──────────────────────────┐</span></span>
<span class="line"><span>│  ALB (应用负载均衡 - L7) │ ──► 负责 SSL 证书卸载、基于域名/路径路由 (如 /api, /static)</span></span>
<span class="line"><span>└────────────┬─────────────┘</span></span>
<span class="line"><span>             │</span></span>
<span class="line"><span>             ▼</span></span>
<span class="line"><span>┌──────────────────────────┐</span></span>
<span class="line"><span>│   Backend Pods / VMs     │ ──► 真正的业务微服务集群</span></span>
<span class="line"><span>└──────────────────────────┘</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="关键使用场景" tabindex="-1"><a class="header-anchor" href="#关键使用场景"><span>关键使用场景：</span></a></h3>
<ol>
<li>
<p><strong>静态公网 IP 需求</strong>：云厂商的 NLB（如 AWS NLB）通常可以为每个可用区绑定固定的静态 IP（甚至 Elastic IP），非常适合需要域名白名单采纳的企业场景。</p>
</li>
<li>
<p><strong>超大流量 / 突发流量</strong>：在双十一抢购、大游戏开服等场景下，NLB 可以直接应对每秒数百万级别的并发连接（CPS），且无需像七层负载均衡那样预热（Pre-warming）。</p>
</li>
<li>
<p><strong>非 HTTP 协议</strong>：如 MQTT（物联网）、gRPC（部分场景）、MySQL/Redis 数据库代理、DNS 服务等。</p>
</li>
</ol>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};