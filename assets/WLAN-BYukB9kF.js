import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E4%BC%A0%E8%BE%93%E5%B1%82/WLAN.html","title":"WLAN","lang":"zh-CN","frontmatter":{"title":"WLAN","icon":"network","date":"2026-07-23T00:00:00.000Z","category":["计算机网络"],"description":"白板 1白板 1 WLAN（Wireless Local Area Network，无线局域网）是我们日常生活中最熟悉的无线技术。它通过无线信道（通常是射频电磁波）将设备连接到局域网。 以下是关于 WLAN 的核心架构、技术标准及关键机制的深度解析： 1. 核心架构：WLAN 是如何组成的？ WLAN 的基本单位是 BSS (Basic Service...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"WLAN\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/WLAN-%E7%99%BD%E6%9D%BF-1.svg\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E4%BC%A0%E8%BE%93%E5%B1%82/WLAN.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"WLAN"}],["meta",{"property":"og:description","content":"白板 1白板 1 WLAN（Wireless Local Area Network，无线局域网）是我们日常生活中最熟悉的无线技术。它通过无线信道（通常是射频电磁波）将设备连接到局域网。 以下是关于 WLAN 的核心架构、技术标准及关键机制的深度解析： 1. 核心架构：WLAN 是如何组成的？ WLAN 的基本单位是 BSS (Basic Service..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/WLAN-%E7%99%BD%E6%9D%BF-1.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.43,"words":729},"filePathRelative":"posts/计算机网络/网络的概念/传输层/WLAN.md","excerpt":"<div class=\\"language-mermaid line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"mermaid\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code class=\\"language-mermaid\\"><span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">flowchart LR</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n1[\\"ISP 互联网服务提供商电信/联通/移动\\"]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n2[\\"无线路由器\\"]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n3[\\"phone\\"]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n4[\\"节点\\"]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n5[\\"光猫\\"]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n6[\\"节点\\"]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n7[\\"节点\\"]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n8[\\"节点\\"]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n9[\\"pc\\"]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n1 -- \\"光口\\" --> n4</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n7 -- \\"网线\\" --> n6</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n8 -- \\"网线\\" --> n9</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`),i={name:`WLAN.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><div class="language-mermaid line-numbers-mode" data-highlighter="shiki" data-ext="mermaid" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-mermaid"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">flowchart LR</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n1["ISP 互联网服务提供商电信/联通/移动"]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n2["无线路由器"]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n3["phone"]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n4["节点"]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n5["光猫"]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n6["节点"]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n7["节点"]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n8["节点"]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n9["pc"]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n1 -- "光口" --> n4</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n7 -- "网线" --> n6</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n8 -- "网线" --> n9</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="/blog/assets/posts/WLAN-%E7%99%BD%E6%9D%BF-1.svg" alt="白板 1" tabindex="0" loading="lazy"><figcaption>白板 1</figcaption></figure>
<p>WLAN（Wireless Local Area Network，无线局域网）是我们日常生活中最熟悉的无线技术。它通过无线信道（通常是射频电磁波）将设备连接到局域网。</p>
<p>以下是关于 WLAN 的核心架构、技术标准及关键机制的深度解析：</p>
<hr>
<h2 id="_1-核心架构-wlan-是如何组成的" tabindex="-1"><a class="header-anchor" href="#_1-核心架构-wlan-是如何组成的"><span>1. 核心架构：WLAN 是如何组成的？</span></a></h2>
<p>WLAN 的基本单位是 <strong>BSS (Basic Service Set)</strong>。</p>
<ul>
<li>
<p><strong>基础设施模式 (Infrastructure Mode)：</strong> 这是最常见的模式。</p>
</li>
<li>
<p><strong>AP (Access Point)：</strong> 无线接入点（通常是路由器），负责管理信号。</p>
</li>
<li>
<p><strong>STA (Station)：</strong> 终端设备（手机、电脑）。</p>
</li>
<li>
<p><strong>自组网模式 (Ad-hoc Mode)：</strong> 设备之间直接连接，不需要 AP。</p>
</li>
<li>
<p><strong>ESS (Extended Service Set)：</strong> 多个 AP 通过有线网络连接在一起，形成一个更大的覆盖区域，支持<strong>无缝漫游</strong>。</p>
</li>
</ul>
<hr>
<h2 id="_2-核心协议-wi-fi-标准演进" tabindex="-1"><a class="header-anchor" href="#_2-核心协议-wi-fi-标准演进"><span>2. 核心协议：Wi-Fi 标准演进</span></a></h2>
<p>WLAN 遵循 IEEE <strong>802.11</strong> 协议簇。虽然 WLAN 和 Wi-Fi 经常混用，但严格来说，Wi-Fi 是由 Wi-Fi 联盟认证的符合 802.11 标准的产品。</p>
<table>
<thead>
<tr>
<th><strong>协议标准</strong></th>
<th><strong>Wi-Fi 代号</strong></th>
<th><strong>频段 (GHz)</strong></th>
<th><strong>最高理论速度</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>802.11n</td>
<td>Wi-Fi 4</td>
<td>2.4 / 5</td>
<td>600 Mbps</td>
</tr>
<tr>
<td>802.11ac</td>
<td>Wi-Fi 5</td>
<td>5</td>
<td>3.46 Gbps</td>
</tr>
<tr>
<td><strong>802.11ax</strong></td>
<td><strong>Wi-Fi 6 / 6E</strong></td>
<td>2.4 / 5 / 6</td>
<td>9.6 Gbps</td>
</tr>
<tr>
<td><strong>802.11be</strong></td>
<td><strong>Wi-Fi 7</strong></td>
<td>2.4 / 5 / 6</td>
<td>高达 30+ Gbps</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="_3-关键冲突解决机制-csma-ca" tabindex="-1"><a class="header-anchor" href="#_3-关键冲突解决机制-csma-ca"><span>3. 关键冲突解决机制：CSMA/CA</span></a></h2>
<p>与有线以太网的 CSMA/CD（碰撞检测）不同，无线环境无法边发边听，因此使用 <strong>CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance - 载波侦听多路访问/冲突避免)</strong>。</p>
<ul>
<li><strong>Listen before talk：</strong> 说话前先听。如果信道忙，就随机等待一段时间。</li>
<li><strong>确认机制 (ACK)：</strong> 只有收到接收方的 ACK，才认为发送成功。</li>
<li><strong>RTS/CTS 机制：</strong> 为了解决“<strong>隐藏节点</strong>”问题（两个终端都能看到 AP，但互看不到，导致同时发包碰撞），发送方先发一个小请求（RTS），AP 回复准许（CTS）后才正式传数据。</li>
</ul>
<hr>
<h2 id="_4-安全加密协议" tabindex="-1"><a class="header-anchor" href="#_4-安全加密协议"><span>4. 安全加密协议</span></a></h2>
<p>WLAN 信号在空气中传播，安全性至关重要：</p>
<ul>
<li><strong>WEP：</strong> 极不安全，早已被破解，严禁使用。</li>
<li><strong>WPA/WPA2：</strong> 目前最主流，使用 AES 加密。</li>
<li><strong>WPA3：</strong> 针对 Wi-Fi 6 引入的新标准，增强了防暴力破解能力（SAE 握手协议），建议开启。</li>
</ul>
<hr>
<h2 id="_5-wlan-的关键技术-wi-fi-6-7" tabindex="-1"><a class="header-anchor" href="#_5-wlan-的关键技术-wi-fi-6-7"><span>5. WLAN 的关键技术 (Wi-Fi 6/7)</span></a></h2>
<ul>
<li><strong>OFDMA：</strong> 将信道切分成更小的资源块，允许多个设备<strong>同时</strong>传输，显著降低延迟。</li>
<li><strong>MU-MIMO：</strong> 多用户多入多出，像超市开了多个收银柜台，提高并发能力。</li>
<li><strong>QAM (正交幅度调制)：</strong> Wi-Fi 7 升级到了 4K-QAM，在同样的信号里塞入更多数据位。</li>
</ul>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};