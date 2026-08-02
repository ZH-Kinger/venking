import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/AI_infra/5_node_5090%E8%AE%A1%E7%AE%97%E8%8A%82%E7%82%B9%E6%94%B9%E9%80%A0/%E9%98%BF%E9%87%8C%E4%BA%91%E7%81%B5%E9%AA%8F%E6%99%BA%E7%AE%97%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%9E%B6%E6%9E%84/%E7%BD%91%E7%BB%9C%E5%B1%82/SLB(%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1).html","title":"SLB(负载均衡)","lang":"zh-CN","frontmatter":{"title":"SLB(负载均衡)","icon":"cpu","date":"2026-07-23T00:00:00.000Z","category":["AI基础设施"],"description":"在大模型与分布式云原生架构中，SLB（Server Load Balancer，负载均衡） 是一项至关重要的核心流量调度与分发底座。 一句话道破本质：SLB 就像是一个拥有上帝视角的“超级流量交警”。它物理驻留在你的服务器集群最外层，负责统一接收来自全网的用户请求（如成千上万个 Agent 发起的并发推理请求），然后根据各台算力服务器（Pod/Node...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"SLB(负载均衡)\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/AI_infra/5_node_5090%E8%AE%A1%E7%AE%97%E8%8A%82%E7%82%B9%E6%94%B9%E9%80%A0/%E9%98%BF%E9%87%8C%E4%BA%91%E7%81%B5%E9%AA%8F%E6%99%BA%E7%AE%97%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%9E%B6%E6%9E%84/%E7%BD%91%E7%BB%9C%E5%B1%82/SLB(%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1).html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"SLB(负载均衡)"}],["meta",{"property":"og:description","content":"在大模型与分布式云原生架构中，SLB（Server Load Balancer，负载均衡） 是一项至关重要的核心流量调度与分发底座。 一句话道破本质：SLB 就像是一个拥有上帝视角的“超级流量交警”。它物理驻留在你的服务器集群最外层，负责统一接收来自全网的用户请求（如成千上万个 Agent 发起的并发推理请求），然后根据各台算力服务器（Pod/Node..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":4.63,"words":1388},"filePathRelative":"posts/AI基础设施/学习计划/AI_infra/5_node_5090计算节点改造/阿里云灵骏智算服务器架构/网络层/SLB(负载均衡).md","excerpt":"<p>在大模型与分布式云原生架构中，<strong>SLB（Server Load Balancer，负载均衡）</strong> 是一项至关重要的核心流量调度与分发底座。</p>\\n<p>一句话道破本质：<strong>SLB 就像是一个拥有上帝视角的“超级流量交警”。它物理驻留在你的服务器集群最外层，负责统一接收来自全网的用户请求（如成千上万个 Agent 发起的并发推理请求），然后根据各台算力服务器（Pod/Node）当前的健康状况与算力水位，将这些请求精准、均匀地分发（Load Balance）给后端的不同机器，从而防止单机被大流量瞬间冲垮，确保整个 AI 系统的高可用与丝滑响应。</strong></p>","autoDesc":true}`),i={name:`SLB(负载均衡).md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在大模型与分布式云原生架构中，<strong>SLB（Server Load Balancer，负载均衡）</strong> 是一项至关重要的核心流量调度与分发底座。</p>
<p>一句话道破本质：<strong>SLB 就像是一个拥有上帝视角的“超级流量交警”。它物理驻留在你的服务器集群最外层，负责统一接收来自全网的用户请求（如成千上万个 Agent 发起的并发推理请求），然后根据各台算力服务器（Pod/Node）当前的健康状况与算力水位，将这些请求精准、均匀地分发（Load Balance）给后端的不同机器，从而防止单机被大流量瞬间冲垮，确保整个 AI 系统的高可用与丝滑响应。</strong></p>
<hr>
<h3 id="一、-核心物理工作流-slb-是如何工作的" tabindex="-1"><a class="header-anchor" href="#一、-核心物理工作流-slb-是如何工作的"><span>一、 核心物理工作流：SLB 是如何工作的？</span></a></h3>
<p>当一个外部应用要访问你部署在 K8s 集群里的 AI 智能体（Agent）服务时，数据包会经历以下物理流转：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span> 【 全网并发用户 / Agent 客户端 】</span></span>
<span class="line"><span>             │ (通过同一个统一的公开公网 IP / 域名发起请求)</span></span>
<span class="line"><span>             ▼</span></span>
<span class="line"><span> ┌────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span> │            SLB 负载均衡器 (流量网关层)                 │</span></span>
<span class="line"><span> │  - 负责 SSL 证书卸载、高防清洗                         │</span></span>
<span class="line"><span> │  - 24小时不间断高频“健康检查” (Health Check)           │</span></span>
<span class="line"><span> └───────────┬────────────────────────────────────────────┘</span></span>
<span class="line"><span>             │</span></span>
<span class="line"><span>             ├──────────────────────┬──────────────────────┐ (根据算法调度分流)</span></span>
<span class="line"><span>             ▼                      ▼                      ▼</span></span>
<span class="line"><span> ┌──────────────────────┐┌──────────────────────┐┌──────────────────────┐</span></span>
<span class="line"><span> │ 8卡服务器 A (Pod 1)  ││ 8卡服务器 B (Pod 2)  ││ 8卡服务器 C (Pod 3)  │</span></span>
<span class="line"><span> │ [ 算力富余，正常接单 ]││ [ 算力吃紧，少分流量 ]││ [ 硬件故障，物理隔离 ]│</span></span>
<span class="line"><span> └──────────────────────┘└──────────────────────┘└──────────────────────┘</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li><strong>统一门禁，阻断直连</strong>：所有外部客户端都不需要、也无法知道后端具体某台 8 卡服务器的真实物理 IP。它们统一访问 SLB 提供的虚拟 IP（VIP）。</li>
<li><strong>高频体检，故障熔断（Health Check）</strong>：SLB 会以秒级频率向后端的每台机器发送心跳包（比如嗅探 <code v-pre>/healthz</code> 接口）。如果服务器 C 突然因为我们前文聊过的“显卡掉线/XID报错”而导致服务挂掉，<strong>SLB 会在毫秒级内将其物理隔离，并把随后的新流量全部转给 A 和 B</strong>，对终端用户做到完全零感知的故障自愈。</li>
<li><strong>算法分流，压榨集群</strong>：SLB 拿着流量表，根据特定算法（如轮询 Round Robin、最小连接数 Least Connections、加权轮询等）把并发请求打散到后端机器。</li>
</ol>
<hr>
<h3 id="二、-工业界两大物理级别-四层-slb-vs-七层-slb" tabindex="-1"><a class="header-anchor" href="#二、-工业界两大物理级别-四层-slb-vs-七层-slb"><span>二、 工业界两大物理级别：四层 SLB vs. 七层 SLB</span></a></h3>
<p>在云厂商（如阿里云、腾讯云或 AWS）的架构中，SLB 通常被物理切分为两个维度：</p>
<h4 id="_1-四层负载均衡-layer-4-网络传输层-——-代表-阿里云-nlb-clb" tabindex="-1"><a class="header-anchor" href="#_1-四层负载均衡-layer-4-网络传输层-——-代表-阿里云-nlb-clb"><span>1. 四层负载均衡（Layer 4 - 网络传输层 —— 代表：阿里云 NLB / CLB）</span></a></h4>
<ul>
<li><strong>物理原理</strong>：它只看数据包的 <strong>IP 地址和端口号（TCP/UDP）</strong>。它不拆开包裹看里面的具体内容，直接像转交快递一样把数据包转发到后端。</li>
<li><strong>物理红利</strong>：<strong>性能强到爆炸，吞吐量极高，延迟近乎为零</strong>。因为它不做复杂的应用层文本解析。</li>
<li><strong>大模型场景</strong>：非常适合用来做分布式训练节点之间、或者是大模型底座暴露出来的标准 TCP 通信流的骨干转发。</li>
</ul>
<h4 id="_2-七层负载均衡-layer-7-应用层-——-代表-阿里云-alb-ingress-网关" tabindex="-1"><a class="header-anchor" href="#_2-七层负载均衡-layer-7-应用层-——-代表-阿里云-alb-ingress-网关"><span>2. 七层负载均衡（Layer 7 - 应用层 —— 代表：阿里云 ALB / Ingress 网关）</span></a></h4>
<ul>
<li><strong>物理原理</strong>：它会把数据包拆开，<strong>深度解析应用层协议（如 HTTP、HTTPS、gRPC）</strong>。它可以根据你请求的 URL 路径、Header 头、甚至是 Cookie 来决定转发给谁。</li>
<li><strong>物理红利</strong>：<strong>极度智能</strong>。例如可以实现 SSL 证书一键卸载（在 SLB 上把 HTTPS 解密成普通的 HTTP，免去后端 GPU 服务器去耗费算力解密）。</li>
<li><strong>大模型场景</strong>：</li>
<li><strong>自回归推理分流</strong>：根据 HTTP 路径分流。如果请求是 <code v-pre>/v1/chat/completions</code>（文字对话），转给 Llama 3 算力池；如果是 <code v-pre>/v1/images/generations</code>（生图），转给 Stable Diffusion 算力池。</li>
<li><strong>智能体路由</strong>：根据用户 Header 里的 Token，把高价值 VIP 客户的 Agent 请求优先路由到配备了 NVIDIA B200 的极致高性能队列中。</li>
</ul>
<hr>
<h3 id="三、-联动闭环-slb-与-k8s、volcano-的化学反应" tabindex="-1"><a class="header-anchor" href="#三、-联动闭环-slb-与-k8s、volcano-的化学反应"><span>三、 联动闭环：SLB 与 K8s、Volcano 的化学反应</span></a></h3>
<p>在现代云原生 AI 算力底座中，SLB 通常不会由工程师手动去云控制台一行行配置，而是通过 <strong>K8s 的</strong> <code v-pre>Service</code> <strong>机制实现完全自动化编排</strong>。</p>
<p>当你用 Pulumi 或 YAML 部署好你的推理 Agent 容器群时，你会创建一个类型为 <code v-pre>type: LoadBalancer</code> 的 Service：</p>
<div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-yaml"><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">apiVersion</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">v1</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">kind</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">Service</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">metadata</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">claudecode-agent-service</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  annotations</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    # 🌟 声明式注射：通知阿里云/AWS，直接在后台为我自动购买并物理绑定一个七层高性能 SLB</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    service.beta.kubernetes.io/alibaba-cloud-loadbalancer-spec</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"slb.s3.medium"</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">spec</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  ports</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    - </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">port</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">80</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        # SLB 监听的外部端口</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">      targetPort</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">8080</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # 后端 Agent 容器真实的业务端口</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">      protocol</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">TCP</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  selector</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    app</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">claudecode-agent</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # 自动抓取带有这个标签的所有 Pod</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  type</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">LoadBalancer</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # 核心：直接向云厂商索要 SLB</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>底层联动过程</strong>：</p>
<ol>
<li>K8s 控制器监测到这个 YAML，自动调用云厂商 API 创建一个真实的物理 <strong>SLB</strong>。</li>
<li>随后，无论是由于业务激增导致你的容器弹性扩容（比如从 2 台变 10 台），还是 Volcano 调度器动态把 Pod 搬迁到了另一台物理机上，K8s 内部的 <code v-pre>Endpoints</code> 控制器都会<strong>实时、自动地把最新的 Pod 真实 IP 同步给 SLB 的后端转发列表（Target Group）</strong>。</li>
<li>整个过程没有任何人工介入，智能体（Agent）的算力通路在 SLB 的护航下实现无限弹性和绝对的高可用。</li>
</ol>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};