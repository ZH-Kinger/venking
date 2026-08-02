import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E4%BA%A4%E6%8D%A2%E6%9C%BA/%E6%80%9D%E7%A7%91%E6%A8%A1%E6%8B%9F%E5%99%A8/cisco%E4%B8%AD%E7%9A%84%E5%B8%B8%E7%94%A8%E5%91%BD%E4%BB%A4.html","title":"cisco中的常用命令","lang":"zh-CN","frontmatter":{"title":"cisco中的常用命令","icon":"network","date":"2026-07-23T00:00:00.000Z","category":["计算机网络"],"description":"常见命令 一、 模式切换与基础管理 这些命令决定了你在哪个“层级”进行操作。 二、 三层核心与路由配置 这是让交换机实现“路由”功能的关键命令。 三、 以太网通道 (EtherChannel) 用于多条链路捆绑，增加带宽和冗余。 四、 状态查看与故障排查 (Show 系列) 当实验不通时，请务必使用以下命令检查。 ​进阶小贴士 如何查命令？ 在任何模式...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"cisco中的常用命令\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/cisco%E4%B8%AD%E7%9A%84%E5%B8%B8%E7%94%A8%E5%91%BD%E4%BB%A4-1.png\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E4%BA%A4%E6%8D%A2%E6%9C%BA/%E6%80%9D%E7%A7%91%E6%A8%A1%E6%8B%9F%E5%99%A8/cisco%E4%B8%AD%E7%9A%84%E5%B8%B8%E7%94%A8%E5%91%BD%E4%BB%A4.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"cisco中的常用命令"}],["meta",{"property":"og:description","content":"常见命令 一、 模式切换与基础管理 这些命令决定了你在哪个“层级”进行操作。 二、 三层核心与路由配置 这是让交换机实现“路由”功能的关键命令。 三、 以太网通道 (EtherChannel) 用于多条链路捆绑，增加带宽和冗余。 四、 状态查看与故障排查 (Show 系列) 当实验不通时，请务必使用以下命令检查。 ​进阶小贴士 如何查命令？ 在任何模式..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/cisco%E4%B8%AD%E7%9A%84%E5%B8%B8%E7%94%A8%E5%91%BD%E4%BB%A4-1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.44,"words":1032},"filePathRelative":"posts/计算机网络/网络的概念/交换机/思科模拟器/cisco中的常用命令.md","excerpt":"<h2>常见命令</h2>\\n<h3>一、 模式切换与基础管理</h3>\\n<p>这些命令决定了你在哪个“层级”进行操作。</p>\\n<figure><img src=\\"/blog/assets/posts/cisco%E4%B8%AD%E7%9A%84%E5%B8%B8%E7%94%A8%E5%91%BD%E4%BB%A4-1.png\\" alt tabindex=\\"0\\" loading=\\"lazy\\"><figcaption></figcaption></figure>\\n<table>\\n<thead>\\n<tr>\\n<th><strong>命令</strong></th>\\n<th><strong>功能</strong></th>\\n<th><strong>备注</strong></th>\\n</tr>\\n</thead>\\n<tbody>\\n<tr>\\n<td><code>enable</code></td>\\n<td>进入特权模式</td>\\n<td>图标从 <code>&gt;</code>&lt;br&gt;变为 <code>#</code></td>\\n</tr>\\n<tr>\\n<td><code>configure terminal</code></td>\\n<td>进入全局配置模式</td>\\n<td>简称 <code>conf t</code>&lt;br&gt;，大部分配置在此进行</td>\\n</tr>\\n<tr>\\n<td><code>hostname [名称]</code></td>\\n<td>修改设备名称</td>\\n<td>方便在多台设备中辨别</td>\\n</tr>\\n<tr>\\n<td><code>exit</code></td>\\n<td>退回上一级</td>\\n<td>—</td>\\n</tr>\\n<tr>\\n<td><code>end</code></td>\\n<td>直接退回特权模式</td>\\n<td>快捷键 <code>Ctrl+Z</code>&lt;br&gt;效果相同</td>\\n</tr>\\n<tr>\\n<td><code>write</code></td>\\n<td>保存当前配置</td>\\n<td>重启不丢失配置的关键（等同于 <code>copy run start</code>&lt;br&gt;）</td>\\n</tr>\\n</tbody>\\n</table>","autoDesc":true}`),i={name:`cisco中的常用命令.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><h2 id="常见命令" tabindex="-1"><a class="header-anchor" href="#常见命令"><span>常见命令</span></a></h2>
<h3 id="一、-模式切换与基础管理" tabindex="-1"><a class="header-anchor" href="#一、-模式切换与基础管理"><span>一、 模式切换与基础管理</span></a></h3>
<p>这些命令决定了你在哪个“层级”进行操作。</p>
<figure><img src="/blog/assets/posts/cisco%E4%B8%AD%E7%9A%84%E5%B8%B8%E7%94%A8%E5%91%BD%E4%BB%A4-1.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<table>
<thead>
<tr>
<th><strong>命令</strong></th>
<th><strong>功能</strong></th>
<th><strong>备注</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>enable</code></td>
<td>进入特权模式</td>
<td>图标从 <code v-pre>&gt;</code>&lt;br&gt;变为 <code v-pre>#</code></td>
</tr>
<tr>
<td><code v-pre>configure terminal</code></td>
<td>进入全局配置模式</td>
<td>简称 <code v-pre>conf t</code>&lt;br&gt;，大部分配置在此进行</td>
</tr>
<tr>
<td><code v-pre>hostname [名称]</code></td>
<td>修改设备名称</td>
<td>方便在多台设备中辨别</td>
</tr>
<tr>
<td><code v-pre>exit</code></td>
<td>退回上一级</td>
<td>—</td>
</tr>
<tr>
<td><code v-pre>end</code></td>
<td>直接退回特权模式</td>
<td>快捷键 <code v-pre>Ctrl+Z</code>&lt;br&gt;效果相同</td>
</tr>
<tr>
<td><code v-pre>write</code></td>
<td>保存当前配置</td>
<td>重启不丢失配置的关键（等同于 <code v-pre>copy run start</code>&lt;br&gt;）</td>
</tr>
</tbody>
</table>
<hr>
<h3 id="二、-三层核心与路由配置" tabindex="-1"><a class="header-anchor" href="#二、-三层核心与路由配置"><span>二、 三层核心与路由配置</span></a></h3>
<p>这是让交换机实现“路由”功能的关键命令。</p>
<table>
<thead>
<tr>
<th><strong>命令</strong></th>
<th><strong>功能</strong></th>
<th><strong>关键说明</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>ip routing</code></td>
<td><strong>开启三层转发</strong></td>
<td><strong>必做步骤</strong>，否则无法实现 VLAN 间路由</td>
</tr>
<tr>
<td><code v-pre>interface vlan [ID]</code></td>
<td>进入 VLAN 虚接口 (SVI)</td>
<td>用于给对应的 VLAN 配置网关 IP</td>
</tr>
<tr>
<td><code v-pre>ip address [IP] [子网掩码]</code></td>
<td>配置接口 IP 地址</td>
<td>在 SVI 或路由口模式下使用</td>
</tr>
<tr>
<td><code v-pre>no shutdown</code></td>
<td>激活接口</td>
<td>开启 SVI 或物理接口</td>
</tr>
<tr>
<td><code v-pre>no switchport</code></td>
<td><strong>切换物理口模式</strong></td>
<td>将二层交换口变为三层路由口（可直接配 IP）</td>
</tr>
<tr>
<td><code v-pre>ip route 0.0.0.0 0.0.0.0 [下一跳]</code></td>
<td>配置默认路由</td>
<td>告诉交换机所有外网流量往哪发</td>
</tr>
</tbody>
</table>
<hr>
<h3 id="三、-以太网通道-etherchannel" tabindex="-1"><a class="header-anchor" href="#三、-以太网通道-etherchannel"><span>三、 以太网通道 (EtherChannel)</span></a></h3>
<p>用于多条链路捆绑，增加带宽和冗余。</p>
<table>
<thead>
<tr>
<th><strong>命令</strong></th>
<th><strong>功能</strong></th>
<th><strong>示例/备注</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>interface range [接口列表]</code></td>
<td>批量选择端口</td>
<td>如 <code v-pre>int range g0/1 - 2</code></td>
</tr>
<tr>
<td><code v-pre>channel-group [组号] mode active</code></td>
<td>建立 LACP 通道</td>
<td><code v-pre>active</code>&lt;br&gt;代表主动协商（常用）</td>
</tr>
<tr>
<td><code v-pre>interface port-channel [组号]</code></td>
<td>进入逻辑通道接口</td>
<td>对捆绑后的“虚拟大网线”进行统一配置</td>
</tr>
<tr>
<td><code v-pre>switchport mode trunk</code></td>
<td>设置为中继链路</td>
<td>允许所有 VLAN 通过此通道</td>
</tr>
</tbody>
</table>
<hr>
<h3 id="四、-状态查看与故障排查-show-系列" tabindex="-1"><a class="header-anchor" href="#四、-状态查看与故障排查-show-系列"><span>四、 状态查看与故障排查 (Show 系列)</span></a></h3>
<p>当实验不通时，请务必使用以下命令检查。</p>
<table>
<thead>
<tr>
<th><strong>命令</strong></th>
<th><strong>检查重点</strong></th>
<th><strong>常用场景</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>show ip interface brief</code></td>
<td>接口状态 (Status/Protocol)</td>
<td>检查接口是否为 <code v-pre>up/up</code>&lt;br&gt;，IP 是否配对</td>
</tr>
<tr>
<td><code v-pre>show ip route</code></td>
<td>路由表</td>
<td>确认是否有 <code v-pre>C</code>&lt;br&gt;(直连) 或 <code v-pre>S</code>&lt;br&gt;(静态) 路由</td>
</tr>
<tr>
<td><code v-pre>show vlan brief</code></td>
<td>VLAN 划分</td>
<td>确认物理端口是否被正确划分到了对应的 VLAN</td>
</tr>
<tr>
<td><code v-pre>show etherchannel summary</code></td>
<td>通道状态</td>
<td>检查通道成员状态是否为 <code v-pre>(P)</code>&lt;br&gt;(已捆绑)</td>
</tr>
<tr>
<td><code v-pre>show running-config</code></td>
<td>所有配置</td>
<td>查看你到底敲了哪些命令，是否有错漏</td>
</tr>
</tbody>
</table>
<hr>
<h3 id="​进阶小贴士" tabindex="-1"><a class="header-anchor" href="#​进阶小贴士"><span>​进阶小贴士</span></a></h3>
<ul>
<li><strong>如何查命令？</strong> 在任何模式下输入 <code v-pre>?</code>，系统会告诉你当前可以输入的所有命令。</li>
<li><strong>写错了怎么办？</strong> 在原命令前加上 <code v-pre>no</code> 即可撤销。例如：<code v-pre>no ip address</code>（删除 IP）。</li>
<li><strong>自动补齐：</strong> 输入命令前几个字母后按 <code v-pre>Tab</code> 键，省去敲全单词的麻烦。</li>
</ul>
<p>​</p>
<h2 id="不同模式之间的区别" tabindex="-1"><a class="header-anchor" href="#不同模式之间的区别"><span>不同模式之间的区别</span></a></h2>
<p>在 Cisco 网络设备的操作中，理解<strong>模式 (Modes)</strong> 的区别至关重要，因为这决定了你的权限范围以及命令的影响程度。</p>
<p>Cisco IOS 采用了分层的 CLI 结构，主要分为以下四个核心模式：</p>
<hr>
<h3 id="一、-模式功能对比表" tabindex="-1"><a class="header-anchor" href="#一、-模式功能对比表"><span>一、 模式功能对比表</span></a></h3>
<table>
<thead>
<tr>
<th><strong>模式名称</strong></th>
<th><strong>提示符示例</strong></th>
<th><strong>权限级别</strong></th>
<th><strong>主要用途</strong></th>
<th><strong>常用操作</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>用户模式</strong> (User EXEC)</td>
<td><code v-pre>Switch&gt;</code></td>
<td>最低</td>
<td>查看基础信息，无法修改配置。</td>
<td><code v-pre>ping</code>&lt;br&gt;, <code v-pre>traceroute</code></td>
</tr>
<tr>
<td><strong>特权模式</strong> (Privileged EXEC)</td>
<td><code v-pre>Switch#</code></td>
<td>中等</td>
<td>查看详细状态、保存配置、进入配置模式。</td>
<td><code v-pre>show</code>&lt;br&gt;命令, <code v-pre>write</code></td>
</tr>
<tr>
<td><strong>全局配置模式</strong> (Global Config)</td>
<td><code v-pre>Switch(config)#</code></td>
<td>高</td>
<td>修改影响整台设备的参数。</td>
<td><code v-pre>hostname</code>&lt;br&gt;, <code v-pre>ip routing</code></td>
</tr>
<tr>
<td><strong>特定配置模式</strong> (Sub-config)</td>
<td><code v-pre>Switch(config-if)#</code></td>
<td>高</td>
<td>修改特定接口、VLAN 或路由协议。</td>
<td><code v-pre>ip address</code>&lt;br&gt;, <code v-pre>no shutdown</code></td>
</tr>
</tbody>
</table>
<hr>
<h3 id="二、-模式间的切换流程" tabindex="-1"><a class="header-anchor" href="#二、-模式间的切换流程"><span>二、 模式间的切换流程</span></a></h3>
<p>你可以通过以下命令在模式间跳转。</p>
<ol>
<li><strong>进入特权模式</strong>：在 <code v-pre>&gt;</code> 下输入 <code v-pre>enable</code>。</li>
<li><strong>进入全局配置</strong>：在 <code v-pre>#</code> 下输入 <code v-pre>configure terminal</code>。</li>
<li><strong>进入接口配置</strong>：在 <code v-pre>(config)#</code> 下输入特定的接口命令，如 <code v-pre>interface vlan 10</code> 或 <code v-pre>interface g0/1</code>。</li>
<li><strong>返回上一级</strong>：输入 <code v-pre>exit</code>。</li>
<li><strong>一键回到特权模式</strong>：输入 <code v-pre>end</code> 或使用快捷键 <code v-pre>Ctrl + Z</code>。</li>
</ol>
<p>​</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};