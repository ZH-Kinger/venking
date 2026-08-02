import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E8%B7%AF%E7%94%B1/%E8%99%9A%E6%8B%9F%E6%9C%BA%E7%BD%91%E7%BB%9C%E6%A8%A1%E5%BC%8F.html","title":"虚拟机网络模式","lang":"zh-CN","frontmatter":{"title":"虚拟机网络模式","icon":"network","date":"2026-07-23T00:00:00.000Z","category":["计算机网络"],"description":"在计算机网络中，“网络模式”这个词在不同场景下（如虚拟机、内网穿透、容器化）有不同的含义。 最常见且最实用的场景是在 虚拟机（如 VMware、VirtualBox） 或 Docker 中。理解这些模式的区别，能帮你解决“为什么我连不上网”或“为什么别人访问不到我”的问题。 1. 虚拟机（VMware/VirtualBox）三大核心模式 这是新手最容易...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"虚拟机网络模式\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E8%B7%AF%E7%94%B1/%E8%99%9A%E6%8B%9F%E6%9C%BA%E7%BD%91%E7%BB%9C%E6%A8%A1%E5%BC%8F.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"虚拟机网络模式"}],["meta",{"property":"og:description","content":"在计算机网络中，“网络模式”这个词在不同场景下（如虚拟机、内网穿透、容器化）有不同的含义。 最常见且最实用的场景是在 虚拟机（如 VMware、VirtualBox） 或 Docker 中。理解这些模式的区别，能帮你解决“为什么我连不上网”或“为什么别人访问不到我”的问题。 1. 虚拟机（VMware/VirtualBox）三大核心模式 这是新手最容易..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.1,"words":630},"filePathRelative":"posts/计算机网络/网络的概念/路由/虚拟机网络模式.md","excerpt":"<p>在计算机网络中，“网络模式”这个词在不同场景下（如虚拟机、内网穿透、容器化）有不同的含义。</p>\\n<p>最常见且最实用的场景是在 <strong>虚拟机（如 VMware、VirtualBox）</strong> 或 <strong>Docker</strong> 中。理解这些模式的区别，能帮你解决“为什么我连不上网”或“为什么别人访问不到我”的问题。</p>\\n<hr>\\n<h3>1. 虚拟机（VMware/VirtualBox）三大核心模式</h3>\\n<p>这是新手最容易混淆的地方，我们用“借宿”来打比方：</p>\\n<table>\\n<thead>\\n<tr>\\n<th><strong>模式</strong></th>\\n<th><strong>形象比喻</strong></th>\\n<th><strong>IP 地址特点</strong></th>\\n<th><strong>连通性</strong></th>\\n</tr>\\n</thead>\\n<tbody>\\n<tr>\\n<td><strong>桥接模式 (Bridge)</strong></td>\\n<td><strong>独立房客</strong>：虚拟机像一台物理机一样，直接向路由器申请独立的“房间”。</td>\\n<td>与宿主机在同一网段（如 192.168.1.x）。</td>\\n<td>虚拟机可以上网，局域网内其他电脑也能直接访问虚拟机。</td>\\n</tr>\\n<tr>\\n<td><strong>NAT 模式 (网络地址转换)</strong></td>\\n<td><strong>合租房</strong>：宿主机是“房东”，虚拟机躲在房东后面，共用一个出口上网。</td>\\n<td>由宿主机虚拟出的网段（如 192.168.10.x）。</td>\\n<td>虚拟机可以上网，但外部设备无法直接找到虚拟机，除非做了端口转发。</td>\\n</tr>\\n<tr>\\n<td><strong>仅主机模式 (Host-Only)</strong></td>\\n<td><strong>封闭空间</strong>：虚拟机和宿主机关起门来交流，不与外界（互联网）联系。</td>\\n<td>独立的私有网段。</td>\\n<td>虚拟机无法上网，只能跟宿主机通信。</td>\\n</tr>\\n</tbody>\\n</table>","autoDesc":true}`),i={name:`虚拟机网络模式.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在计算机网络中，“网络模式”这个词在不同场景下（如虚拟机、内网穿透、容器化）有不同的含义。</p>
<p>最常见且最实用的场景是在 <strong>虚拟机（如 VMware、VirtualBox）</strong> 或 <strong>Docker</strong> 中。理解这些模式的区别，能帮你解决“为什么我连不上网”或“为什么别人访问不到我”的问题。</p>
<hr>
<h3 id="_1-虚拟机-vmware-virtualbox-三大核心模式" tabindex="-1"><a class="header-anchor" href="#_1-虚拟机-vmware-virtualbox-三大核心模式"><span>1. 虚拟机（VMware/VirtualBox）三大核心模式</span></a></h3>
<p>这是新手最容易混淆的地方，我们用“借宿”来打比方：</p>
<table>
<thead>
<tr>
<th><strong>模式</strong></th>
<th><strong>形象比喻</strong></th>
<th><strong>IP 地址特点</strong></th>
<th><strong>连通性</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>桥接模式 (Bridge)</strong></td>
<td><strong>独立房客</strong>：虚拟机像一台物理机一样，直接向路由器申请独立的“房间”。</td>
<td>与宿主机在同一网段（如 192.168.1.x）。</td>
<td>虚拟机可以上网，局域网内其他电脑也能直接访问虚拟机。</td>
</tr>
<tr>
<td><strong>NAT 模式 (网络地址转换)</strong></td>
<td><strong>合租房</strong>：宿主机是“房东”，虚拟机躲在房东后面，共用一个出口上网。</td>
<td>由宿主机虚拟出的网段（如 192.168.10.x）。</td>
<td>虚拟机可以上网，但外部设备无法直接找到虚拟机，除非做了端口转发。</td>
</tr>
<tr>
<td><strong>仅主机模式 (Host-Only)</strong></td>
<td><strong>封闭空间</strong>：虚拟机和宿主机关起门来交流，不与外界（互联网）联系。</td>
<td>独立的私有网段。</td>
<td>虚拟机无法上网，只能跟宿主机通信。</td>
</tr>
</tbody>
</table>
<hr>
<h3 id="_2-docker-容器网络模式" tabindex="-1"><a class="header-anchor" href="#_2-docker-容器网络模式"><span>2. Docker 容器网络模式</span></a></h3>
<p>Docker 的网络设计更偏向于微服务和隔离：</p>
<ul>
<li><strong>Bridge (默认)</strong>：每个容器有独立 IP，通过 Docker0 网桥通信。需要手动映射端口（如 <code v-pre>-p 80:80</code>）才能让外部访问。</li>
<li><strong>Host</strong>：容器直接共享宿主机的 IP 和端口。性能最高，但端口容易冲突。</li>
<li><strong>None</strong>：没有任何网络协议栈，通常用于高安全性或自定义网络插件。</li>
<li><strong>Overlay</strong>：用于跨机器的容器通信（如 Swarm 或 Kubernetes 集群）。</li>
</ul>
<hr>
<h3 id="_3-网络协议的工作模式-单工、半双工、全双工" tabindex="-1"><a class="header-anchor" href="#_3-网络协议的工作模式-单工、半双工、全双工"><span>3. 网络协议的工作模式：单工、半双工、全双工</span></a></h3>
<p>如果你是在问数据传输的“交通规则”，那么区别如下：</p>
<ul>
<li><strong>单工 (Simplex)</strong>：只能单向传输。就像广播站发广播，你只能听，不能回。</li>
<li><strong>半双工 (Half-Duplex)</strong>：可以双向，但同一时刻只能一方发。就像<strong>对讲机</strong>，说话时得按住按钮，对方只能听。</li>
<li><strong>全双工 (Full-Duplex)</strong>：同时双向传输。就像<strong>手机通话</strong>，双方可以同时说话。现在的以太网交换机基本都是全双工。</li>
</ul>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};