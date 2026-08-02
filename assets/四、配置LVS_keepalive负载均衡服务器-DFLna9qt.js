import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E6%9D%82%E9%A1%B9%E7%AC%94%E8%AE%B0/web%E9%9B%86%E7%BE%A4/web%E9%9B%86%E7%BE%A4%E9%A1%B9%E7%9B%AE/%E5%9B%9B%E3%80%81%E9%85%8D%E7%BD%AELVS_keepalive%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1%E6%9C%8D%E5%8A%A1%E5%99%A8.html","title":"四、配置LVS,keepalive负载均衡服务器","lang":"zh-CN","frontmatter":{"title":"四、配置LVS,keepalive负载均衡服务器","icon":"note","date":"2026-07-23T00:00:00.000Z","category":["杂项笔记"],"description":"配置 LVS（Linux Virtual Server）配合 Keepalived 负载均衡服务器，其核心目的可以概括为：消除单点故障、实现高可用性（HA）和扩展系统的吞吐能力。 简单来说，就是把一堆普通的服务器变成一个“打不倒、能扛压”的整体。 1. 为什么要配置LVS和keepalive 1. 提高并发处理能力（负载均衡） 单台 Web 服务器的资...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"四、配置LVS,keepalive负载均衡服务器\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E6%9D%82%E9%A1%B9%E7%AC%94%E8%AE%B0/web%E9%9B%86%E7%BE%A4/web%E9%9B%86%E7%BE%A4%E9%A1%B9%E7%9B%AE/%E5%9B%9B%E3%80%81%E9%85%8D%E7%BD%AELVS_keepalive%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1%E6%9C%8D%E5%8A%A1%E5%99%A8.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"四、配置LVS,keepalive负载均衡服务器"}],["meta",{"property":"og:description","content":"配置 LVS（Linux Virtual Server）配合 Keepalived 负载均衡服务器，其核心目的可以概括为：消除单点故障、实现高可用性（HA）和扩展系统的吞吐能力。 简单来说，就是把一堆普通的服务器变成一个“打不倒、能扛压”的整体。 1. 为什么要配置LVS和keepalive 1. 提高并发处理能力（负载均衡） 单台 Web 服务器的资..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":7.05,"words":2116},"filePathRelative":"posts/杂项笔记/web集群/web集群项目/四、配置LVS,keepalive负载均衡服务器.md","excerpt":"<p>配置 LVS（Linux Virtual Server）配合 Keepalived 负载均衡服务器，其核心目的可以概括为：<strong>消除单点故障、实现高可用性（HA）和扩展系统的吞吐能力。</strong></p>\\n<p>简单来说，就是把一堆普通的服务器变成一个“打不倒、能扛压”的整体。</p>\\n<hr>\\n<h2>1. 为什么要配置LVS和keepalive</h2>\\n<h3>1. 提高并发处理能力（负载均衡）</h3>\\n<p>单台 Web 服务器的资源（CPU、内存、带宽）是有上限的。</p>\\n<ul>\\n<li><strong>均衡分配</strong>：LVS 作为流量调度器，根据预设算法（如轮询 rr、加权轮询 wrr）将成千上万的并发请求均匀地分发给后端的 Real Server（Web 节点）。</li>\\n<li><strong>无缝扩展</strong>：当业务增长时，你只需要在后端增加服务器，LVS 就能立刻利用新机器，而客户端对此完全无感知。</li>\\n</ul>","autoDesc":true}`),i={name:`四、配置LVS,keepalive负载均衡服务器.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>配置 LVS（Linux Virtual Server）配合 Keepalived 负载均衡服务器，其核心目的可以概括为：<strong>消除单点故障、实现高可用性（HA）和扩展系统的吞吐能力。</strong></p>
<p>简单来说，就是把一堆普通的服务器变成一个“打不倒、能扛压”的整体。</p>
<hr>
<h2 id="_1-为什么要配置lvs和keepalive" tabindex="-1"><a class="header-anchor" href="#_1-为什么要配置lvs和keepalive"><span>1. 为什么要配置LVS和keepalive</span></a></h2>
<h3 id="_1-提高并发处理能力-负载均衡" tabindex="-1"><a class="header-anchor" href="#_1-提高并发处理能力-负载均衡"><span>1. 提高并发处理能力（负载均衡）</span></a></h3>
<p>单台 Web 服务器的资源（CPU、内存、带宽）是有上限的。</p>
<ul>
<li><strong>均衡分配</strong>：LVS 作为流量调度器，根据预设算法（如轮询 rr、加权轮询 wrr）将成千上万的并发请求均匀地分发给后端的 Real Server（Web 节点）。</li>
<li><strong>无缝扩展</strong>：当业务增长时，你只需要在后端增加服务器，LVS 就能立刻利用新机器，而客户端对此完全无感知。</li>
</ul>
<h3 id="_2-实现高可用性-high-availability" tabindex="-1"><a class="header-anchor" href="#_2-实现高可用性-high-availability"><span>2. 实现高可用性（High Availability）</span></a></h3>
<p>这是引入 <strong>Keepalived</strong> 的主要原因。</p>
<ul>
<li><strong>健康检查 (Health Check)</strong>：Keepalived 会定期给后端服务器“把脉”。如果某台 Web 节点宕机（比如网口坏了或进程崩溃），Keepalived 会自动在 LVS 转发列表中将其剔除。</li>
<li><strong>调度器冗余 (Failover)</strong>：如果负载均衡器（LB）本身坏了怎么办？Keepalived 通过 VRRP 协议实现主备切换（Master/Backup）。当主调度器宕机，备用调度器会瞬间抢占 <strong>VIP (虚拟IP)</strong>，保证业务不断网。</li>
</ul>
<h3 id="_3-成本与性能平衡" tabindex="-1"><a class="header-anchor" href="#_3-成本与性能平衡"><span>3. 成本与性能平衡</span></a></h3>
<ul>
<li><strong>极致性能</strong>：LVS 运行在 Linux 内核层（第四层），不涉及复杂的协议解析，处理能力远超 Nginx、HAProxy 等软件负载。</li>
<li><strong>低成本</strong>：相比昂贵的硬件负载均衡（如 F5），LVS + Keepalived 是基于标准 Linux 硬件的开源方案，成本极低且性能强悍。</li>
</ul>
<p>​</p>
<h2 id="iptables命令" tabindex="-1"><a class="header-anchor" href="#iptables命令"><span>iptables命令</span></a></h2>
<h3 id="一、-核心概念-四表五链" tabindex="-1"><a class="header-anchor" href="#一、-核心概念-四表五链"><span>一、 核心概念：四表五链</span></a></h3>
<h4 id="_1-四表-功能分类" tabindex="-1"><a class="header-anchor" href="#_1-四表-功能分类"><span>1. 四表（功能分类）</span></a></h4>
<ul>
<li><strong>filter</strong>（默认表）：过滤包。决定包是放行（ACCEPT）还是丢弃（DROP/REJECT）。</li>
<li><strong>nat</strong>：地址转换。修改源地址（SNAT）或目标地址（DNAT）。</li>
<li><strong>mangle</strong>：修改数据包内容（如修改 TTL、打标记）。</li>
<li><strong>raw</strong>：关闭连接追踪，提高性能。</li>
</ul>
<h4 id="_2-五链-时机分类" tabindex="-1"><a class="header-anchor" href="#_2-五链-时机分类"><span>2. 五链（时机分类）</span></a></h4>
<ul>
<li><strong>PREROUTING</strong>：数据包刚到达网卡，还未决定路由。</li>
<li><strong>INPUT</strong>：发往本机的数据包。</li>
<li><strong>FORWARD</strong>：本机只做中转，发往其他机器的数据包。</li>
<li><strong>OUTPUT</strong>：本机产生并向外发出的数据包。</li>
<li><strong>POSTROUTING</strong>：路由决策完成后，数据包离开网卡前。</li>
</ul>
<hr>
<h3 id="二、-命令基本格式" tabindex="-1"><a class="header-anchor" href="#二、-命令基本格式"><span>二、 命令基本格式</span></a></h3>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>iptables [-t 表名] 命令选项 [链名] [匹配条件] [-j 控制动作]</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h4 id="_1-常用命令选项" tabindex="-1"><a class="header-anchor" href="#_1-常用命令选项"><span>1. 常用命令选项</span></a></h4>
<ul>
<li><code v-pre>-A</code> (Append)：在链的末尾追加一条规则。</li>
<li><code v-pre>-I</code> (Insert)：在链的开头或指定位置插入一条规则。</li>
<li><code v-pre>-L</code> (List)：列出所有规则（常用 <code v-pre>-L -n -v</code> 查看详情）。</li>
<li><code v-pre>-D</code> (Delete)：删除指定规则。</li>
<li><code v-pre>-F</code> (Flush)：清空规则。</li>
<li><code v-pre>-P</code> (Policy)：设置默认策略（如 <code v-pre>iptables -P INPUT DROP</code>）。</li>
</ul>
<h4 id="_2-常用控制动作-j" tabindex="-1"><a class="header-anchor" href="#_2-常用控制动作-j"><span>2. 常用控制动作 (<code v-pre>-j</code>)</span></a></h4>
<ul>
<li><strong>ACCEPT</strong>：允许。</li>
<li><strong>DROP</strong>：丢弃（不给任何回应）。</li>
<li><strong>REJECT</strong>：拒绝（回给对方一个“拒绝”的错误包）。</li>
<li><strong>DNAT/SNAT</strong>：NAT 转换。</li>
<li><strong>LOG</strong>：记录日志。</li>
</ul>
<hr>
<h3 id="三、-实战案例" tabindex="-1"><a class="header-anchor" href="#三、-实战案例"><span>三、 实战案例</span></a></h3>
<h4 id="_1-基础过滤-保护本机" tabindex="-1"><a class="header-anchor" href="#_1-基础过滤-保护本机"><span>1. 基础过滤：保护本机</span></a></h4>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 1. 允许回环接口（127.0.0.1）的所有流量</span></span>
<span class="line"><span>iptables -A INPUT -i lo -j ACCEPT</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 2. 允许已建立的连接通过（防止你自己发起的请求被拦）</span></span>
<span class="line"><span>iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 3. 开放 22 端口 (SSH)</span></span>
<span class="line"><span>iptables -A INPUT -p tcp --dport 22 -j ACCEPT</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 4. 开放 80 端口 (HTTP)</span></span>
<span class="line"><span>iptables -A INPUT -p tcp --dport 80 -j ACCEPT</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 5. 禁止其他所有进入的流量（慎用，先开 SSH 再执行）</span></span>
<span class="line"><span>iptables -P INPUT DROP</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-nat-地址转换-你刚才实验的核心" tabindex="-1"><a class="header-anchor" href="#_2-nat-地址转换-你刚才实验的核心"><span>2. NAT 地址转换（你刚才实验的核心）</span></a></h4>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># DNAT：外网访问本机的 80 端口，转发到内网的 31.200</span></span>
<span class="line"><span>iptables -t nat -A PREROUTING -p tcp --dport 80 -j DNAT --to-destination 192.168.31.200</span></span>
<span class="line"><span></span></span>
<span class="line"><span># SNAT：内网 31.0 网段通过本机上网，把源地址改成 1.128</span></span>
<span class="line"><span>iptables -t nat -A POSTROUTING -s 192.168.31.0/24 -j SNAT --to-source 192.168.1.128</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-查看与删除" tabindex="-1"><a class="header-anchor" href="#_3-查看与删除"><span>3. 查看与删除</span></a></h4>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 列出 nat 表规则并显示行号</span></span>
<span class="line"><span>iptables -t nat -L -n --line-numbers</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 删除 nat 表 PREROUTING 链的第一条规则</span></span>
<span class="line"><span>iptables -t nat -D PREROUTING 1</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="什么是snat和dnat" tabindex="-1"><a class="header-anchor" href="#什么是snat和dnat"><span>什么是SNAT和DNAT？</span></a></h2>
<h3 id="_1-snat-source-network-address-translation-——-源地址转换" tabindex="-1"><a class="header-anchor" href="#_1-snat-source-network-address-translation-——-源地址转换"><span>1. SNAT (Source Network Address Translation) —— 源地址转换</span></a></h3>
<p><strong>核心功能</strong>：修改数据包的 <strong>源 IP 地址</strong>。</p>
<ul>
<li><strong>典型场景</strong>：内网机器访问互联网。</li>
<li><strong>工作流程</strong>：当你实验室或公司的电脑（私有 IP，如 <code v-pre>192.168.1.5</code>）想访问百度时，公网是不识别私有 IP 的。当包经过防火墙时，防火墙把“源 IP”改成自己的“公网 IP”，然后再发给百度。百度回包时，防火墙再根据记录转交给你的电脑。</li>
<li><strong>生活类比</strong>：你在宿舍（内网）给外面写信。你虽然是发信人，但在信封的“发件地址”一栏写的是“宿舍传达室地址”（公网 IP）。回信寄到传达室，传达室大爷再根据收件人名字送到你手里。</li>
</ul>
<hr>
<h3 id="_2-dnat-destination-network-address-translation-——-目的地址转换" tabindex="-1"><a class="header-anchor" href="#_2-dnat-destination-network-address-translation-——-目的地址转换"><span>2. DNAT (Destination Network Address Translation) —— 目的地址转换</span></a></h3>
<p><strong>核心功能</strong>：修改数据包的 <strong>目的 IP 地址</strong>。</p>
<ul>
<li><strong>典型场景</strong>：互联网用户访问内网服务器（发布服务）。</li>
<li><strong>工作流程</strong>：你公司内网有一台 Web 服务器（<code v-pre>192.168.31.200</code>）。外网用户访问公司的公网 IP（<code v-pre>1.1.1.1</code>）的 80 端口时，防火墙收到包，发现是找 Web 服务的，就把包的“目的 IP”改成内网的 <code v-pre>192.168.31.200</code>，把请求“引”进去。</li>
<li><strong>生活类比</strong>：你拨打一个公司的总机电话。你只知道总机号（公网 IP），拨通后，前台接线员（防火墙）询问你的需求，然后把电话线路转接（DNAT）到了某个具体的工位分机（内网服务器）上。</li>
</ul>
<table>
<thead>
<tr>
<th><strong>特性</strong></th>
<th><strong>SNAT</strong></th>
<th><strong>DNAT</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>修改对象</strong></td>
<td>源 IP 地址</td>
<td>目的 IP 地址</td>
</tr>
<tr>
<td><strong>主要用途</strong></td>
<td>内部机器共享公网 IP 上网</td>
<td>外部用户访问内部服务器</td>
</tr>
<tr>
<td><strong>生效位置</strong></td>
<td><code v-pre>POSTROUTING</code>&lt;br&gt;（路由之后，出网卡前）</td>
<td><code v-pre>PREROUTING</code>&lt;br&gt;（路由之前，进网卡时）</td>
</tr>
<tr>
<td><strong>隐藏对象</strong></td>
<td>隐藏了客户端的真实 IP</td>
<td>隐藏了服务器的真实 IP</td>
</tr>
</tbody>
</table>
<h2 id="lvs-dr模式-keepalived-架构配置" tabindex="-1"><a class="header-anchor" href="#lvs-dr模式-keepalived-架构配置"><span>LVS (DR模式) + Keepalived 架构配置</span></a></h2>
<h3 id="_1-角色规划与-vip-准备" tabindex="-1"><a class="header-anchor" href="#_1-角色规划与-vip-准备"><span>1. 角色规划与 VIP 准备</span></a></h3>
<ul>
<li><strong>VIP (虚拟IP)</strong>: <code v-pre>192.168.31.200</code> (请确保此 IP 在你的路由器中未被占用)</li>
<li><strong>负载均衡 (LB)</strong>: <code v-pre>192.168.31.132</code> (Master), <code v-pre>192.168.31.133</code> (Backup)</li>
<li><strong>Web 节点 (Real Server)</strong>: <code v-pre>192.168.31.130</code>, <code v-pre>192.168.31.131</code></li>
<li><strong>防火墙 (FW)</strong>: <code v-pre>192.168.31.135</code></li>
</ul>
<hr>
<h3 id="_2-第一阶段-配置-web-节点-130-131" tabindex="-1"><a class="header-anchor" href="#_2-第一阶段-配置-web-节点-130-131"><span>2. 第一阶段：配置 Web 节点 (130/131)</span></a></h3>
<p>在 LVS-DR 模式下，Web 节点必须绑定 VIP 但不能响应 ARP，否则会导致 IP 冲突。</p>
<p><strong>在两台 Web 服务器上分别执行以下操作：</strong></p>
<ol>
<li><strong>创建脚本</strong> <code v-pre>**/lvs_dr/set_vip_arp.sh**</code> (参考文档逻辑)：</li>
</ol>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>#!/bin/bash</span></span>
<span class="line"><span>VIP=192.168.31.200</span></span>
<span class="line"><span>case "$1" in</span></span>
<span class="line"><span>start)</span></span>
<span class="line"><span>    # 在 lo 接口绑定 VIP</span></span>
<span class="line"><span>    ifconfig lo:0 $VIP netmask 255.255.255.255 broadcast $VIP up</span></span>
<span class="line"><span>    route add -host $VIP dev lo:0</span></span>
<span class="line"><span>    # 抑制 ARP 响应</span></span>
<span class="line"><span>    echo "1" > /proc/sys/net/ipv4/conf/lo/arp_ignore</span></span>
<span class="line"><span>    echo "2" > /proc/sys/net/ipv4/conf/lo/arp_announce</span></span>
<span class="line"><span>    echo "1" > /proc/sys/net/ipv4/conf/all/arp_ignore</span></span>
<span class="line"><span>    echo "2" > /proc/sys/net/ipv4/conf/all/arp_announce</span></span>
<span class="line"><span>    echo "LVS DR Real Server started"</span></span>
<span class="line"><span>    ;;</span></span>
<span class="line"><span>stop)</span></span>
<span class="line"><span>    ifconfig lo:0 down</span></span>
<span class="line"><span>    route del -host $VIP dev lo:0</span></span>
<span class="line"><span>    echo "0" > /proc/sys/net/ipv4/conf/lo/arp_ignore</span></span>
<span class="line"><span>    echo "0" > /proc/sys/net/ipv4/conf/lo/arp_announce</span></span>
<span class="line"><span>    echo "0" > /proc/sys/net/ipv4/conf/all/arp_ignore</span></span>
<span class="line"><span>    echo "0" > /proc/sys/net/ipv4/conf/all/arp_announce</span></span>
<span class="line"><span>    echo "LVS DR Real Server stopped"</span></span>
<span class="line"><span>    ;;</span></span>
<span class="line"><span>esac</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li><strong>执行脚本并设置开机自启</strong>：</li>
</ol>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>chmod +x /lvs_dr/set_vip_arp.sh</span></span>
<span class="line"><span>/lvs_dr/set_vip_arp.sh start</span></span>
<span class="line"><span># 将启动命令写入 /etc/rc.local</span></span>
<span class="line"><span>echo "bash /lvs_dr/set_vip_arp.sh start" >> /etc/rc.local</span></span>
<span class="line"><span>chmod +x /etc/rc.d/rc.local</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h3 id="_3-第二阶段-配置负载均衡器-132-133" tabindex="-1"><a class="header-anchor" href="#_3-第二阶段-配置负载均衡器-132-133"><span>3. 第二阶段：配置负载均衡器 (132/133)</span></a></h3>
<p>你需要在两台 LB 上安装 <code v-pre>keepalived</code> 和 <code v-pre>ipvsadm</code>。</p>
<ol>
<li><strong>安装软件</strong>：</li>
</ol>
<p><code v-pre>yum install -y keepalived ipvsadm</code></p>
<ol start="2">
<li><strong>修改 Keepalived 配置文件</strong> (<code v-pre>/etc/keepalived/keepalived.conf</code>)：</li>
</ol>
<ul>
<li><strong>LB1 (Master)</strong> 关键配置：</li>
</ul>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>vrrp_instance VI_1 {</span></span>
<span class="line"><span>    state MASTER</span></span>
<span class="line"><span>    interface ens33        # 确认你的网卡名称</span></span>
<span class="line"><span>    virtual_router_id 51</span></span>
<span class="line"><span>    priority 100           # 优先级比 Backup 高</span></span>
<span class="line"><span>    advert_int 1</span></span>
<span class="line"><span>    virtual_ipaddress {</span></span>
<span class="line"><span>        192.168.31.200     # VIP</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>virtual_server 192.168.31.200 80 {</span></span>
<span class="line"><span>    delay_loop 6</span></span>
<span class="line"><span>    lb_algo rr             # 轮询调度算法</span></span>
<span class="line"><span>    lb_kind DR             # DR模式</span></span>
<span class="line"><span>    protocol TCP</span></span>
<span class="line"><span>    real_server 192.168.31.130 80 {</span></span>
<span class="line"><span>        weight 1</span></span>
<span class="line"><span>        TCP_CHECK { connect_timeout 3 }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    real_server 192.168.31.131 80 {</span></span>
<span class="line"><span>        weight 1</span></span>
<span class="line"><span>        TCP_CHECK { connect_timeout 3 }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>LB2 (Backup)</strong> 只需要将 <code v-pre>state</code> 改为 <code v-pre>BACKUP</code>，<code v-pre>priority</code> 改为 <code v-pre>90</code>。</li>
</ul>
<ol start="3">
<li><strong>启动服务</strong>：</li>
</ol>
<p><code v-pre>systemctl start keepalived &amp;&amp; systemctl enable keepalived</code></p>
<hr>
<h3 id="_4-第三阶段-防火墙与连通性" tabindex="-1"><a class="header-anchor" href="#_4-第三阶段-防火墙与连通性"><span>4. 第三阶段：防火墙与连通性</span></a></h3>
<p>由于你的防火墙 IP 是 <code v-pre>192.168.31.135</code>：</p>
<ul>
<li><strong>内外网映射</strong>：如果在公网访问，请在 135 防火墙上做端口转发，将公网 80 端口指向 <strong>VIP 192.168.31.200</strong>。</li>
<li><strong>后端存储</strong>：确保两台 Web 节点（130/131）都挂载了管理服务器（如 132 或其他节点）提供的 NFS 目录，以保证内容一致。</li>
</ul>
<hr>
<h3 id="_5-如何测试" tabindex="-1"><a class="header-anchor" href="#_5-如何测试"><span>5. 如何测试？</span></a></h3>
<ol>
<li><strong>检查 VIP</strong>：在 LB1 上执行 <code v-pre>ip addr</code>，看是否出现了 <code v-pre>192.168.31.200</code>。</li>
<li><strong>检查调度</strong>：执行 <code v-pre>ipvsadm -Ln</code>，你会看到两个后端 IP。</li>
<li><strong>访问测试</strong>：在浏览器访问 <code v-pre>http://192.168.31.200</code>。</li>
<li><strong>压力测试</strong>：参考文档中的 <code v-pre>ab</code> 命令：</li>
</ol>
<p><code v-pre>ab -n 1000 -c 100 http://192.168.31.200/index.html</code></p>
<p><strong>提示</strong>：如果你想更专业地管理，建议在综合服务器上使用 <strong>Ansible</strong> 编写一个 Playbook，把上述步骤写成自动化脚本，这样后期扩展 Web 节点（如增加 .134）只需要改一个配置文件即可。</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};