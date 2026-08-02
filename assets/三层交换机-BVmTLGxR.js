import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E4%B8%89%E5%B1%82%E4%BA%A4%E6%8D%A2%E6%9C%BA.html","title":"三层交换机","lang":"zh-CN","frontmatter":{"title":"三层交换机","icon":"network","date":"2026-07-23T00:00:00.000Z","category":["计算机网络"],"description":"Ethernetchannel-以太通道 多条线路负载均衡，带宽提高 容错，当一条线路失效时，其他线路通信，不会丢包 ​ 一、 什么是以太网通道 (Ethernet Channel)？ 以太网通道（也叫链路聚合、Port Channel 或 LACP）是将多条物理链路逻辑上捆绑成一条的技术。 为什么要用它？ 增加带宽：如果你把 4 根 1Gbps 的网...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"三层交换机\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/%E4%B8%89%E5%B1%82%E4%BA%A4%E6%8D%A2%E6%9C%BA-1.png\\",\\"https://venking.tech/blog/blog/assets/posts/%E4%B8%89%E5%B1%82%E4%BA%A4%E6%8D%A2%E6%9C%BA-2.png\\",\\"https://venking.tech/blog/blog/assets/posts/%E4%B8%89%E5%B1%82%E4%BA%A4%E6%8D%A2%E6%9C%BA-3.png\\",\\"https://venking.tech/blog/blog/assets/posts/%E4%B8%89%E5%B1%82%E4%BA%A4%E6%8D%A2%E6%9C%BA-4.png\\",\\"https://venking.tech/blog/blog/assets/posts/%E4%B8%89%E5%B1%82%E4%BA%A4%E6%8D%A2%E6%9C%BA-5.png\\",\\"https://venking.tech/blog/blog/assets/posts/%E4%B8%89%E5%B1%82%E4%BA%A4%E6%8D%A2%E6%9C%BA-6.png\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E4%B8%89%E5%B1%82%E4%BA%A4%E6%8D%A2%E6%9C%BA.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"三层交换机"}],["meta",{"property":"og:description","content":"Ethernetchannel-以太通道 多条线路负载均衡，带宽提高 容错，当一条线路失效时，其他线路通信，不会丢包 ​ 一、 什么是以太网通道 (Ethernet Channel)？ 以太网通道（也叫链路聚合、Port Channel 或 LACP）是将多条物理链路逻辑上捆绑成一条的技术。 为什么要用它？ 增加带宽：如果你把 4 根 1Gbps 的网..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/%E4%B8%89%E5%B1%82%E4%BA%A4%E6%8D%A2%E6%9C%BA-1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":4.58,"words":1373},"filePathRelative":"posts/计算机网络/网络的概念/三层交换机.md","excerpt":"<h2>Ethernetchannel-以太通道</h2>\\n<p>多条线路负载均衡，带宽提高</p>\\n<p>容错，当一条线路失效时，其他线路通信，不会丢包</p>\\n<p>​</p>\\n<h3>一、 什么是以太网通道 (Ethernet Channel)？</h3>\\n<p><strong>以太网通道</strong>（也叫链路聚合、Port Channel 或 LACP）是将<strong>多条物理链路逻辑上捆绑成一条</strong>的技术。</p>\\n<h3>为什么要用它？</h3>\\n<ol>\\n<li><strong>增加带宽</strong>：如果你把 4 根 1Gbps 的网线捆绑，逻辑上你就拥有了一个 4Gbps 的大通道。</li>\\n<li><strong>冗余备份</strong>：其中一根线断了，流量会自动切换到剩下的线上，网络不会中断。</li>\\n<li><strong>防止环路</strong>：生成树协议（STP）会将它看作一条线，从而避免因为多条连线导致的广播风暴。</li>\\n</ol>","autoDesc":true}`),i={name:`三层交换机.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><h2 id="ethernetchannel-以太通道" tabindex="-1"><a class="header-anchor" href="#ethernetchannel-以太通道"><span>Ethernetchannel-以太通道</span></a></h2>
<p>多条线路负载均衡，带宽提高</p>
<p>容错，当一条线路失效时，其他线路通信，不会丢包</p>
<p>​</p>
<h3 id="一、-什么是以太网通道-ethernet-channel" tabindex="-1"><a class="header-anchor" href="#一、-什么是以太网通道-ethernet-channel"><span>一、 什么是以太网通道 (Ethernet Channel)？</span></a></h3>
<p><strong>以太网通道</strong>（也叫链路聚合、Port Channel 或 LACP）是将<strong>多条物理链路逻辑上捆绑成一条</strong>的技术。</p>
<h3 id="为什么要用它" tabindex="-1"><a class="header-anchor" href="#为什么要用它"><span>为什么要用它？</span></a></h3>
<ol>
<li><strong>增加带宽</strong>：如果你把 4 根 1Gbps 的网线捆绑，逻辑上你就拥有了一个 4Gbps 的大通道。</li>
<li><strong>冗余备份</strong>：其中一根线断了，流量会自动切换到剩下的线上，网络不会中断。</li>
<li><strong>防止环路</strong>：生成树协议（STP）会将它看作一条线，从而避免因为多条连线导致的广播风暴。</li>
</ol>
<p>​</p>
<h2 id="三层交换" tabindex="-1"><a class="header-anchor" href="#三层交换"><span>三层交换</span></a></h2>
<p>简单来说，<strong>三层交换（Layer 3 Switching）</strong> 是一种结合了“交换机”的极速和“路由器”的智能的技术。</p>
<p>如果把网络比作交通系统：</p>
<ul>
<li><strong>二层交换机</strong>：就像一个“立交桥”，它只负责在同一个城市（同一个网段/VLAN）内部导流，靠看车牌（MAC地址）转发。</li>
<li><strong>三层交换机</strong>：不仅能做立交桥，还内置了一个“导航中心”。它能识别目的地城市（IP地址），让不同城市（不同网段/VLAN）之间的车辆直接通行。</li>
</ul>
<hr>
<h3 id="一、-核心逻辑-从-硬件-到-路由" tabindex="-1"><a class="header-anchor" href="#一、-核心逻辑-从-硬件-到-路由"><span>一、 核心逻辑：从“硬件”到“路由”</span></a></h3>
<p>三层交换的核心在于：<strong>硬件转发路由数据</strong>。</p>
<h4 id="_1-传统路由器-vs-三层交换机" tabindex="-1"><a class="header-anchor" href="#_1-传统路由器-vs-三层交换机"><span>1. 传统路由器 vs 三层交换机</span></a></h4>
<ul>
<li>
<p><strong>传统路由器</strong>：靠软件处理，每一个数据包都要拆开、检查、重新封装，速度相对较慢（类似于人工收费站）。</p>
</li>
<li>
<p><strong>三层交换机</strong>：采用 <strong>ASIC（专用集成电路）</strong> 芯片。它遵循 <strong>“一次路由，多次交换”</strong> 的原则。</p>
</li>
<li>
<p>第一个包由 CPU 算出路径；</p>
</li>
<li>
<p>后续的所有包直接由硬件芯片在二层高速转发。</p>
</li>
</ul>
<hr>
<h3 id="二、-三层交换解决了什么问题" tabindex="-1"><a class="header-anchor" href="#二、-三层交换解决了什么问题"><span>二、 三层交换解决了什么问题？</span></a></h3>
<p>在没有三层交换机之前，不同 VLAN（虚拟局域网）之间通讯必须经过路由器，这被称为 <strong>“单臂路由”</strong>。</p>
<ul>
<li>
<p><strong>瓶颈问题</strong>：所有流量都挤在路由器的一根线上，容易造成交通堵塞。</p>
</li>
<li>
<p><strong>三层交换的优势</strong>：</p>
</li>
<li>
<p><strong>低延迟</strong>：直接在交换机内部背板带宽上转发。</p>
</li>
<li>
<p><strong>高扩展性</strong>：可以轻松带动成百上千台设备跨网段通信。</p>
</li>
<li>
<p><strong>简化拓扑</strong>：不再需要额外的路由器来连接内部 VLAN。</p>
</li>
</ul>
<hr>
<h3 id="三、-两个核心组件" tabindex="-1"><a class="header-anchor" href="#三、-两个核心组件"><span>三、 两个核心组件</span></a></h3>
<p>理解三层交换，必须理解这两个“虚拟”概念：</p>
<h4 id="_1-svi-switch-virtual-interface" tabindex="-1"><a class="header-anchor" href="#_1-svi-switch-virtual-interface"><span>1. SVI (Switch Virtual Interface)</span></a></h4>
<p>这是三层交换机的“灵魂”。在交换机内部，你可以为每个 VLAN 创建一个虚拟接口，并给它配上 IP 地址。这个 IP 就是该 VLAN 下所有电脑的 <strong>“默认网关”</strong>。</p>
<h4 id="_2-路由表-routing-table" tabindex="-1"><a class="header-anchor" href="#_2-路由表-routing-table"><span>2. 路由表 (Routing Table)</span></a></h4>
<p>虽然它是交换机，但它维护着一张路由表。它可以运行静态路由，也可以运行动态路由协议（如 OSPF、BGP），实现与外界（比如互联网防火墙）的对接。</p>
<hr>
<h3 id="四、-应用场景-它放在哪" tabindex="-1"><a class="header-anchor" href="#四、-应用场景-它放在哪"><span>四、 应用场景：它放在哪？</span></a></h3>
<p>在企业网络架构中，三层交换机通常处于 <strong>“核心层”</strong> 或 <strong>“汇聚层”</strong>。</p>
<ul>
<li><strong>核心层</strong>：负责海量数据的高速交换，连接服务器集群和外网出口。</li>
<li><strong>汇聚层</strong>：负责把不同楼层、不同部门的二层交换机汇总起来，并在这里做 VLAN 间的路由和访问控制（ACL）。</li>
</ul>
<hr>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h3>
<p>三层交换 = <strong>二层交换机（物理连接）</strong> + <strong>路由器（逻辑转发）</strong>。</p>
<p>它用硬件的速度解决了 IP 路由的问题。</p>
<p><strong>​</strong></p>
<h2 id="配置一个三层交换" tabindex="-1"><a class="header-anchor" href="#配置一个三层交换"><span>配置一个三层交换</span></a></h2>
<figure><img src="/blog/assets/posts/%E4%B8%89%E5%B1%82%E4%BA%A4%E6%8D%A2%E6%9C%BA-1.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<p>1，配置机器两台pc两台switch，一台三层交换机</p>
<p>​</p>
<p>2，连线如图</p>
<p>​</p>
<p>3，配置线路连接模式pc和交换机之间access，交换机和三层交换机之间trunk</p>
<p>​</p>
<p>4，划分网段vlan10和vlan20三个交换机都需要划分网段，修改交换机和pc之间接口的vlan</p>
<p>​</p>
<p>5，配置vlan的ip（命令行）</p>
<figure><img src="/blog/assets/posts/%E4%B8%89%E5%B1%82%E4%BA%A4%E6%8D%A2%E6%9C%BA-2.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<p>6，查看路由表</p>
<p>show ip route （在switch#下操作）</p>
<figure><img src="/blog/assets/posts/%E4%B8%89%E5%B1%82%E4%BA%A4%E6%8D%A2%E6%9C%BA-3.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h3 id="每台pc都需要自己配置ip和gateway" tabindex="-1"><a class="header-anchor" href="#每台pc都需要自己配置ip和gateway"><span>每台pc都需要自己配置ip和gateway</span></a></h3>
<figure><img src="/blog/assets/posts/%E4%B8%89%E5%B1%82%E4%BA%A4%E6%8D%A2%E6%9C%BA-4.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<p>7.在vlan10的pc下ping一下vlan20的网关和主机</p>
<figure><img src="/blog/assets/posts/%E4%B8%89%E5%B1%82%E4%BA%A4%E6%8D%A2%E6%9C%BA-5.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h2 id="在三层交换机上配置路由" tabindex="-1"><a class="header-anchor" href="#在三层交换机上配置路由"><span>在三层交换机上配置路由</span></a></h2>
<h3 id="配置物理三层接口-routed-port" tabindex="-1"><a class="header-anchor" href="#配置物理三层接口-routed-port"><span>配置物理三层接口 (Routed Port)</span></a></h3>
<p>有时候，你需要交换机的某个物理端口像路由器接口一样直接配 IP（不属于任何 VLAN）。</p>
<p><strong>配置步骤：</strong></p>
<ol>
<li>进入物理接口。</li>
<li>使用 <code v-pre>no switchport</code> 命令关闭该接口的交换属性（使其从二层变三层）。</li>
<li>配置 IP 地址。</li>
</ol>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>Switch(config)# interface f0/1</span></span>
<span class="line"><span>Switch(config-if)# no switchport</span></span>
<span class="line"><span>Switch(config-if)# ip address 10.1.1.1 255.255.255.0</span></span>
<span class="line"><span>Switch(config-if)# no shutdown</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h3 id="验证路由配置" tabindex="-1"><a class="header-anchor" href="#验证路由配置"><span>验证路由配置</span></a></h3>
<p>配置完后，一定要通过以下命令确认路由是否生效：</p>
<ul>
<li>
<p><code v-pre>**show ip route**</code>：查看路由表。</p>
</li>
<li>
<p><code v-pre>C</code> 代表直连（你配的 SVI 会显示为 C）。</p>
</li>
<li>
<p><code v-pre>S</code> 代表静态路由。</p>
</li>
<li>
<p><code v-pre>**ping [目的IP]**</code>：测试连通性。</p>
</li>
</ul>
<p>​</p>
<p>在三层交换机上操作</p>
<p>​</p>
<figure><img src="/blog/assets/posts/%E4%B8%89%E5%B1%82%E4%BA%A4%E6%8D%A2%E6%9C%BA-6.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<p>同时要将路由器的接口调成on</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};