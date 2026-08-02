import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/AI_infra/%E9%9B%86%E7%BE%A4%E5%85%B7%E4%BD%93%E5%AE%9E%E7%8E%B0/%E7%AE%A1%E7%90%86%E7%BD%91%E7%BB%9C%EF%BC%88oob%E5%92%8Cmgmt%EF%BC%89.html","title":"管理网络（oob和mgmt）","lang":"zh-CN","frontmatter":{"title":"管理网络（oob和mgmt）","icon":"cpu","date":"2026-07-23T00:00:00.000Z","category":["AI基础设施"],"description":"在大模型智算中心和 K8s 物理机房的运维中，BMC、OOB、MGMT 是服务器网络管理与控制平面的三张底牌。 我们可以用一个通俗的物理隐喻来理清它们： 假设一台 8 卡 GPU 服务器是一艘巨大的宇宙飞船。 MGMT 像是飞船开机进入轨道后，舰长在主控制室里操作的「内部管理系统」； BMC 则是焊死在飞船骨架上的、拥有独立核电池的「生命维持芯片」； ...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"管理网络（oob和mgmt）\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/AI_infra/%E9%9B%86%E7%BE%A4%E5%85%B7%E4%BD%93%E5%AE%9E%E7%8E%B0/%E7%AE%A1%E7%90%86%E7%BD%91%E7%BB%9C%EF%BC%88oob%E5%92%8Cmgmt%EF%BC%89.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"管理网络（oob和mgmt）"}],["meta",{"property":"og:description","content":"在大模型智算中心和 K8s 物理机房的运维中，BMC、OOB、MGMT 是服务器网络管理与控制平面的三张底牌。 我们可以用一个通俗的物理隐喻来理清它们： 假设一台 8 卡 GPU 服务器是一艘巨大的宇宙飞船。 MGMT 像是飞船开机进入轨道后，舰长在主控制室里操作的「内部管理系统」； BMC 则是焊死在飞船骨架上的、拥有独立核电池的「生命维持芯片」； ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.99,"words":1198},"filePathRelative":"posts/AI基础设施/学习计划/AI_infra/集群具体实现/管理网络（oob和mgmt）.md","excerpt":"<p>在大模型智算中心和 K8s 物理机房的运维中，<strong>BMC、OOB、MGMT</strong> 是服务器网络管理与控制平面的三张底牌。</p>\\n<p>我们可以用一个通俗的物理隐喻来理清它们：</p>\\n<blockquote>\\n<p>假设一台 8 卡 GPU 服务器是一艘巨大的宇宙飞船。</p>\\n<ul>\\n<li>\\n<p><strong>MGMT</strong> 像是飞船开机进入轨道后，舰长在主控制室里操作的<strong>「内部管理系统」</strong>；</p>\\n</li>\\n<li>\\n<p><strong>BMC</strong> 则是焊死在飞船骨架上的、拥有独立核电池的<strong>「生命维持芯片」</strong>；</p>\\n</li>\\n<li>\\n<p><strong>OOB</strong> 则是连通这个芯片、完全独立于飞船主引擎的<strong>「物理逃生加密通道」</strong>。</p>\\n</li>\\n</ul>\\n</blockquote>","autoDesc":true}`),i={name:`管理网络（oob和mgmt）.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在大模型智算中心和 K8s 物理机房的运维中，<strong>BMC、OOB、MGMT</strong> 是服务器网络管理与控制平面的三张底牌。</p>
<p>我们可以用一个通俗的物理隐喻来理清它们：</p>
<blockquote>
<p>假设一台 8 卡 GPU 服务器是一艘巨大的宇宙飞船。</p>
<ul>
<li>
<p><strong>MGMT</strong> 像是飞船开机进入轨道后，舰长在主控制室里操作的<strong>「内部管理系统」</strong>；</p>
</li>
<li>
<p><strong>BMC</strong> 则是焊死在飞船骨架上的、拥有独立核电池的<strong>「生命维持芯片」</strong>；</p>
</li>
<li>
<p><strong>OOB</strong> 则是连通这个芯片、完全独立于飞船主引擎的<strong>「物理逃生加密通道」</strong>。</p>
</li>
</ul>
</blockquote>
<h3 id="一、-bmc-基板管理控制器-——-那个物理芯片" tabindex="-1"><a class="header-anchor" href="#一、-bmc-基板管理控制器-——-那个物理芯片"><span>一、 BMC（基板管理控制器 —— 那个物理芯片）</span></a></h3>
<p><strong>BMC（Baseboard Management Controller）</strong> 是焊在服务器主板上的一个<strong>独立的、微型的低功耗处理器（芯片）</strong>。</p>
<ul>
<li>
<p><strong>物理本质</strong>：它拥有自己独立的 CPU、独立的 Linux 操作系统微内核、独立的内存，以及<strong>独立的供电</strong>（只要机房的物理电源插头插着，即使服务器关机、主 CPU 烧毁，BMC 芯片也依然活在后台）。</p>
</li>
<li>
<p><strong>物理连接</strong>：它在服务器主板上伸出了无数根“触角”，连接着机箱的物理风扇、主板电压、电源模块、CPU 温度传感器，以及 GPU 显卡内部的 PCIe 控制面。</p>
</li>
<li>
<p><strong>常见品牌/产品</strong>：在业界，各大服务器厂商的 BMC 管理界面有不同的商品名。比如戴尔的 <strong>iDRAC</strong>、惠普的 <strong>iLO</strong>、华为的 <strong>iBMC</strong>、浪潮的 <strong>M those/IPMI</strong> 界面，底层全都是这颗 BMC 芯片在支撑。</p>
</li>
</ul>
<h3 id="二、-oob-带外管理网络-——-那个独立通道" tabindex="-1"><a class="header-anchor" href="#二、-oob-带外管理网络-——-那个独立通道"><span>二、 OOB（带外管理网络 —— 那个独立通道）</span></a></h3>
<p><strong>OOB（Out-of-Band，带外网络）</strong> 是用来<strong>远程连接并操控上述 BMC 芯片的专属物理网络</strong>。</p>
<ul>
<li>
<p><strong>物理实现</strong>：看一眼 8 卡 GPU 服务器的背面，除了插光纤的高速网卡外，必定有一个孤零零的、通常标着 “MGMT” 或 “IPMI” 的普通千兆/百兆 RJ45 <strong>电网口</strong>。这个网口就是 <strong>BMC 的专属外设通道</strong>。</p>
</li>
<li>
<p><strong>绝对隔离</strong>：在机房布线时，这个网口出来的网线，必须接入一个完全独立的、低速的、物理隔离的交换机网络。它<strong>绝对不与</strong>大模型跑计算的 RDMA Fabric 网络产生任何交集。</p>
</li>
</ul>
<h4 id="💡-大模型场景下的救僵死红利" tabindex="-1"><a class="header-anchor" href="#💡-大模型场景下的救僵死红利"><span>💡 大模型场景下的救僵死红利：</span></a></h4>
<p>大模型训练中，GPU 极高负载经常引发物理机<strong>系统死机（Kernel Panic）或者操作系统彻底卡死假死</strong>，此时你通过原有的 SSH 已经完全进不去了。</p>
<p>由于 OOB（带外网络）完全不依赖服务器的主 CPU 和 Linux 系统，运维工程师可以通过 OOB 网络物理登录 BMC 的 Web 界面，点击“硬件冷重置”强制切断服务器主电源、直接在硬件层重启机器，或者查看 GPU 物理断电的硬件级报错日志。</p>
<h3 id="三、-mgmt-带内管理网络-——-正规军系统通道" tabindex="-1"><a class="header-anchor" href="#三、-mgmt-带内管理网络-——-正规军系统通道"><span>三、 MGMT（带内管理网络 —— 正规军系统通道）</span></a></h3>
<p><strong>MGMT（Management Network，通常指带内管理/控制网）</strong> 是服务器在正常开机、顺利进入操作系统（如 Ubuntu / RedHat）后，<strong>由主 CPU 和主内核驱动管辖的管理网络</strong>。</p>
<ul>
<li>
<p><strong>物理实现</strong>：它依赖服务器正常的主系统、驱动和 TCP/IP 协议栈。通常绑定在服务器主板自带的 10G/25G 標準以太网卡（网口）上，并接入机顶的管理交换机。</p>
</li>
<li>
<p><strong>主要职责</strong>：这是 K8s 控制面、Volcano 调度器调度算力的“官方运输大动脉”。</p>
<ul>
<li>
<p>K8s 集群组件（如 <code v-pre>kubelet</code>）通过 MGMT 网络与 Master 节点握手，接收你下发的 PyTorch 训练作业容器。</p>
</li>
<li>
<p>监控组件（如 Prometheus）通过这个网络，高频抓取 GPU 的温度、功率、算力利用率（Metrics）并上报给大屏。</p>
</li>
</ul>
</li>
</ul>
<h3 id="🛠️-终极硬核对比表" tabindex="-1"><a class="header-anchor" href="#🛠️-终极硬核对比表"><span>🛠️ 终极硬核对比表</span></a></h3>
<p>在智算中心的运维中，它们的地位和角色分工泾渭分明：</p>
<table>
<thead>
<tr>
<th><strong>维度</strong></th>
<th><strong>BMC (管理芯片)</strong></th>
<th><strong>OOB (带外网络)</strong></th>
<th><strong>MGMT (带内控制网)</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>物理本质</strong></td>
<td>主板上的<strong>微型芯片/微系统</strong></td>
<td>连接 BMC 的<strong>专属物理网络</strong></td>
<td>跑在主系统内核里的<strong>管理通路</strong></td>
</tr>
<tr>
<td><strong>前置物理条件</strong></td>
<td>服务器插上电源线即活</td>
<td>只要服务器插电，通电即活</td>
<td>必须成功开机并顺利进入 Linux 系统</td>
</tr>
<tr>
<td><strong>物理带宽</strong></td>
<td>N/A (芯片本身)</td>
<td>极低 (通常 100Mbps / 1Gbps)</td>
<td>较高 (通常 10Gbps / 25Gbps / 100Gbps)</td>
</tr>
<tr>
<td><strong>主要控制对象</strong></td>
<td>电源、BIOS、物理风扇、传感器</td>
<td>远端的 BMC 芯片界面</td>
<td>K8s 进程、Docker 容器、系统日志</td>
</tr>
<tr>
<td><strong>一句话功能</strong></td>
<td>服务器在硬件层的“最后底牌”</td>
<td>操作系统彻底死机时的“硬件物理后门”</td>
<td>操作系统完好时，K8s 调兵遣将的“官方通道”</td>
</tr>
</tbody>
</table>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};