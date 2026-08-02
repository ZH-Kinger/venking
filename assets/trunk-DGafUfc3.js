import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E4%BA%A4%E6%8D%A2%E6%9C%BA/trunk.html","title":"trunk","lang":"zh-CN","frontmatter":{"title":"trunk","icon":"network","date":"2026-07-23T00:00:00.000Z","category":["计算机网络"],"description":"在网络实验和工程中，Trunk（干道） 是最基础也最关键的概念之一。 简单来说，如果你有两台交换机，每台交换机上都有 VLAN 10 和 VLAN 20，那么连接这两台交换机的线路就必须配置为 Trunk，否则不同交换机上的相同 VLAN 无法通信。 1. 为什么要用 Trunk？ 如果没有 Trunk，每增加一个 VLAN，你就得在两台交换机之间多拉...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"trunk\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/trunk-1.jpeg\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E4%BA%A4%E6%8D%A2%E6%9C%BA/trunk.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"trunk"}],["meta",{"property":"og:description","content":"在网络实验和工程中，Trunk（干道） 是最基础也最关键的概念之一。 简单来说，如果你有两台交换机，每台交换机上都有 VLAN 10 和 VLAN 20，那么连接这两台交换机的线路就必须配置为 Trunk，否则不同交换机上的相同 VLAN 无法通信。 1. 为什么要用 Trunk？ 如果没有 Trunk，每增加一个 VLAN，你就得在两台交换机之间多拉..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/trunk-1.jpeg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.88,"words":863},"filePathRelative":"posts/计算机网络/网络的概念/交换机/trunk.md","excerpt":"<p>在网络实验和工程中，<strong>Trunk（干道）</strong> 是最基础也最关键的概念之一。</p>\\n<p>简单来说，如果你有两台交换机，每台交换机上都有 VLAN 10 和 VLAN 20，那么连接这两台交换机的线路就必须配置为 <strong>Trunk</strong>，否则不同交换机上的相同 VLAN 无法通信。</p>\\n<figure><img src=\\"/blog/assets/posts/trunk-1.jpeg\\" alt tabindex=\\"0\\" loading=\\"lazy\\"><figcaption></figcaption></figure>\\n<hr>\\n<h3>1. 为什么要用 Trunk？</h3>","autoDesc":true}`),i={name:`trunk.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在网络实验和工程中，<strong>Trunk（干道）</strong> 是最基础也最关键的概念之一。</p>
<p>简单来说，如果你有两台交换机，每台交换机上都有 VLAN 10 和 VLAN 20，那么连接这两台交换机的线路就必须配置为 <strong>Trunk</strong>，否则不同交换机上的相同 VLAN 无法通信。</p>
<figure><img src="/blog/assets/posts/trunk-1.jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<hr>
<h3 id="_1-为什么要用-trunk" tabindex="-1"><a class="header-anchor" href="#_1-为什么要用-trunk"><span>1. 为什么要用 Trunk？</span></a></h3>
<p>如果没有 Trunk，每增加一个 VLAN，你就得在两台交换机之间多拉一根物理网线。</p>
<ul>
<li><strong>Access 模式：</strong> 一个接口只能属于一个 VLAN（像单行道）。</li>
<li><strong>Trunk 模式：</strong> 一个接口可以承载<strong>多个 VLAN</strong> 的数据（像多车道高速公路）。</li>
</ul>
<p>Trunk 通过在数据包里打上 <strong>VLAN Tag（标签）</strong> 来区分这个包属于哪个部门，最常用的协议是 <strong>IEEE 802.1Q</strong>。</p>
<hr>
<h3 id="_2-cisco-packet-tracer-中的配置命令" tabindex="-1"><a class="header-anchor" href="#_2-cisco-packet-tracer-中的配置命令"><span>2. Cisco Packet Tracer 中的配置命令</span></a></h3>
<p>假设你要把交换机的 <code v-pre>FastEthernet 0/24</code> 端口设为 Trunk：</p>
<p>Bash</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>Switch> enable</span></span>
<span class="line"><span>Switch# configure terminal</span></span>
<span class="line"><span>Switch(config)# interface f0/24</span></span>
<span class="line"><span>Switch(config-if)# switchport mode trunk</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>关键检查命令：</strong></p>
<ul>
<li><code v-pre>show interfaces trunk</code>：查看哪些接口是 Trunk，以及允许通过哪些 VLAN。</li>
</ul>
<hr>
<h3 id="_3-trunk-的核心参数" tabindex="-1"><a class="header-anchor" href="#_3-trunk-的核心参数"><span>3. Trunk 的核心参数</span></a></h3>
<ul>
<li>
<p><strong>Native VLAN（本征 VLAN）：</strong></p>
</li>
<li>
<p>默认是 <strong>VLAN 1</strong>。</p>
</li>
<li>
<p>Trunk 链路上不打标签的数据包都会被归类到 Native VLAN。</p>
</li>
<li>
<p><strong>安全建议：</strong> 两端交换机的 Native VLAN 必须一致，否则会报错或产生环路。</p>
</li>
<li>
<p><strong>Allowed VLAN（允许列表）：</strong></p>
</li>
<li>
<p>默认 Trunk 允许所有 VLAN 通过。</p>
</li>
<li>
<p>你可以手动限制，比如只允许 VLAN 10： <code v-pre>switchport trunk allowed vlan 10</code></p>
</li>
</ul>
<hr>
<h3 id="_4-常见应用场景" tabindex="-1"><a class="header-anchor" href="#_4-常见应用场景"><span>4. 常见应用场景</span></a></h3>
<ol>
<li><strong>交换机级联：</strong> 连接两台交换机，传输多个 VLAN。</li>
<li><strong>单臂路由 (Router-on-a-Stick)：</strong> 路由器的一个物理接口连接交换机的 Trunk 口，通过“子接口”实现不同 VLAN 间的通信。</li>
</ol>
<hr>
<h3 id="_5-快速排错口诀" tabindex="-1"><a class="header-anchor" href="#_5-快速排错口诀"><span>5. 快速排错口诀</span></a></h3>
<p>如果你的网络不通，检查这三点：</p>
<ol>
<li><strong>两端模式是否匹配：</strong> 物理链路两头都必须是 <code v-pre>trunk</code>（或者一头是 <code v-pre>desirable</code>）。</li>
<li><strong>VLAN 是否存在：</strong> 交换机里必须先创建了对应的 VLAN，Trunk 才会转发它。</li>
<li><strong>Native VLAN 是否一致：</strong> 不一致会导致流量错乱。</li>
</ol>
<p>​</p>
<p>​</p>
<h2 id="trunk的模式" tabindex="-1"><a class="header-anchor" href="#trunk的模式"><span>trunk的模式</span></a></h2>
<p>在 Cisco 网络设备中，<strong>Trunk 模式</strong>不仅仅是简单的“开启”或“关闭”，它涉及到一个自动协商协议，叫做 <strong>DTP (Dynamic Trunking Protocol)</strong>。</p>
<p>根据接口对 Trunk 意愿的主动程度，通常分为以下几种模式：</p>
<hr>
<h3 id="_1-常见的四种模式" tabindex="-1"><a class="header-anchor" href="#_1-常见的四种模式"><span>1. 常见的四种模式</span></a></h3>
<table>
<thead>
<tr>
<th><strong>模式 (Mode)</strong></th>
<th><strong>描述</strong></th>
<th><strong>对端匹配建议</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Access</strong></td>
<td><strong>强制非 Trunk</strong>。该接口只能属于一个 VLAN，不发送 DTP 帧。</td>
<td>连接电脑、服务器。</td>
</tr>
<tr>
<td><strong>Trunk</strong></td>
<td><strong>强制 Trunk</strong>。无论对方是谁，我都会把接口变为 Trunk，并试图与对方协商。</td>
<td>连接另一台交换机。</td>
</tr>
<tr>
<td><strong>Dynamic Desirable</strong></td>
<td><strong>主动协商</strong>。我会主动问对方：“你想变 Trunk 吗？”如果对方是 Trunk 或 Desirable 或 Auto，就变 Trunk。</td>
<td>旧版设备默认，现在较少用。</td>
</tr>
<tr>
<td><strong>Dynamic Auto</strong></td>
<td><strong>被动协商</strong>。我愿意变 Trunk，但我不主动。如果对方不提要求，我就默认当个 Access 口。</td>
<td>现代 Cisco 交换机的默认模式。</td>
</tr>
</tbody>
</table>
<hr>
<h3 id="_2-模式组合结果表-协商结果" tabindex="-1"><a class="header-anchor" href="#_2-模式组合结果表-协商结果"><span>2. 模式组合结果表 (协商结果)</span></a></h3>
<p>这是网络工程师必须掌握的“对碰”结果：</p>
<table>
<thead>
<tr>
<th></th>
<th><strong>Access</strong></th>
<th><strong>Trunk</strong></th>
<th><strong>Dynamic Desirable</strong></th>
<th><strong>Dynamic Auto</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Access</strong></td>
<td>Access</td>
<td><strong>(冲突报错)</strong></td>
<td>Access</td>
<td>Access</td>
</tr>
<tr>
<td><strong>Trunk</strong></td>
<td><strong>(冲突报错)</strong></td>
<td><strong>Trunk</strong></td>
<td><strong>Trunk</strong></td>
<td><strong>Trunk</strong></td>
</tr>
<tr>
<td><strong>Dyn. Desirable</strong></td>
<td>Access</td>
<td><strong>Trunk</strong></td>
<td><strong>Trunk</strong></td>
<td><strong>Trunk</strong></td>
</tr>
<tr>
<td><strong>Dyn. Auto</strong></td>
<td>Access</td>
<td><strong>Trunk</strong></td>
<td><strong>Trunk</strong></td>
<td>Access</td>
</tr>
</tbody>
</table>
<p><strong>注意：</strong> 如果两端都是 <strong>Dynamic Auto</strong>，结果是 <strong>Access</strong>（因为两个都不主动，没法达成共识）。</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};