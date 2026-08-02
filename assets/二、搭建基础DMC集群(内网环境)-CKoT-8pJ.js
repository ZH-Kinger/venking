import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%BF%90%E7%BB%B4/web%E9%9B%86%E7%BE%A4/web%E9%9B%86%E7%BE%A4%E9%A1%B9%E7%9B%AE/%E4%BA%8C%E3%80%81%E6%90%AD%E5%BB%BA%E5%9F%BA%E7%A1%80DMC%E9%9B%86%E7%BE%A4(%E5%86%85%E7%BD%91%E7%8E%AF%E5%A2%83).html","title":"二、搭建基础DMC集群(内网环境)","lang":"zh-CN","frontmatter":{"title":"二、搭建基础DMC集群(内网环境)","icon":"server","date":"2026-07-23T00:00:00.000Z","category":["运维"],"description":"你需要配置的是一台双网卡防火墙 / 路由器服务器（WAN 口连外网、LAN 口连 DMZ 区），核心目标是实现「DMZ 区服务器上网（SNAT）」「外网访问内网 Web / 堡垒机（DNAT）」「限制 SSH 访问（TCP Wrappers）」，我结合你现有的集群环境（DMZ 网段 192.168.203.0/24、web1/web2/nfs-serv...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"二、搭建基础DMC集群(内网环境)\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/%E4%BA%8C%E3%80%81%E6%90%AD%E5%BB%BA%E5%9F%BA%E7%A1%80DMC%E9%9B%86%E7%BE%A4(%E5%86%85%E7%BD%91%E7%8E%AF%E5%A2%83\\",\\"https://venking.tech/blog/blog/assets/posts/%E4%BA%8C%E3%80%81%E6%90%AD%E5%BB%BA%E5%9F%BA%E7%A1%80DMC%E9%9B%86%E7%BE%A4(%E5%86%85%E7%BD%91%E7%8E%AF%E5%A2%83\\",\\"https://venking.tech/blog/blog/assets/posts/%E4%BA%8C%E3%80%81%E6%90%AD%E5%BB%BA%E5%9F%BA%E7%A1%80DMC%E9%9B%86%E7%BE%A4(%E5%86%85%E7%BD%91%E7%8E%AF%E5%A2%83\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%BF%90%E7%BB%B4/web%E9%9B%86%E7%BE%A4/web%E9%9B%86%E7%BE%A4%E9%A1%B9%E7%9B%AE/%E4%BA%8C%E3%80%81%E6%90%AD%E5%BB%BA%E5%9F%BA%E7%A1%80DMC%E9%9B%86%E7%BE%A4(%E5%86%85%E7%BD%91%E7%8E%AF%E5%A2%83).html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"二、搭建基础DMC集群(内网环境)"}],["meta",{"property":"og:description","content":"你需要配置的是一台双网卡防火墙 / 路由器服务器（WAN 口连外网、LAN 口连 DMZ 区），核心目标是实现「DMZ 区服务器上网（SNAT）」「外网访问内网 Web / 堡垒机（DNAT）」「限制 SSH 访问（TCP Wrappers）」，我结合你现有的集群环境（DMZ 网段 192.168.203.0/24、web1/web2/nfs-serv..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/%E4%BA%8C%E3%80%81%E6%90%AD%E5%BB%BA%E5%9F%BA%E7%A1%80DMC%E9%9B%86%E7%BE%A4(%E5%86%85%E7%BD%91%E7%8E%AF%E5%A2%83"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":6.2,"words":1859},"filePathRelative":"posts/运维/web集群/web集群项目/二、搭建基础DMC集群(内网环境).md","excerpt":"<p>你需要配置的是一台<strong>双网卡防火墙 / 路由器服务器</strong>（WAN 口连外网、LAN 口连 DMZ 区），核心目标是实现「DMZ 区服务器上网（SNAT）」「外网访问内网 Web / 堡垒机（DNAT）」「限制 SSH 访问（TCP Wrappers）」，我结合你现有的集群环境（DMZ 网段 192.168.203.0/24、web1/web2/nfs-server 堡垒机），整理出<strong>分步、可落地、适配你集群</strong>的完整配置流程，每一步都标注关键注意事项，确保和你的 Web/NFS/DNS 集群无缝配合</p>\\n<h2>一、给防火墙机器添加一块网卡</h2>","autoDesc":true}`),i={name:`二、搭建基础DMC集群(内网环境).md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>你需要配置的是一台<strong>双网卡防火墙 / 路由器服务器</strong>（WAN 口连外网、LAN 口连 DMZ 区），核心目标是实现「DMZ 区服务器上网（SNAT）」「外网访问内网 Web / 堡垒机（DNAT）」「限制 SSH 访问（TCP Wrappers）」，我结合你现有的集群环境（DMZ 网段 192.168.203.0/24、web1/web2/nfs-server 堡垒机），整理出<strong>分步、可落地、适配你集群</strong>的完整配置流程，每一步都标注关键注意事项，确保和你的 Web/NFS/DNS 集群无缝配合</p>
<h2 id="一、给防火墙机器添加一块网卡" tabindex="-1"><a class="header-anchor" href="#一、给防火墙机器添加一块网卡"><span>一、给防火墙机器添加一块网卡</span></a></h2>
<h3 id="_1-打开虚拟机设置-点击添加网络适配器" tabindex="-1"><a class="header-anchor" href="#_1-打开虚拟机设置-点击添加网络适配器"><span>1.打开虚拟机设置，点击添加网络适配器</span></a></h3>
<figure><img src="/blog/assets/posts/%E4%BA%8C%E3%80%81%E6%90%AD%E5%BB%BA%E5%9F%BA%E7%A1%80DMC%E9%9B%86%E7%BE%A4(%E5%86%85%E7%BD%91%E7%8E%AF%E5%A2%83)-1.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h3 id="_2-设置网卡模式" tabindex="-1"><a class="header-anchor" href="#_2-设置网卡模式"><span>2.设置网卡模式</span></a></h3>
<p>一块设置桥接模式作为WAN口</p>
<figure><img src="/blog/assets/posts/%E4%BA%8C%E3%80%81%E6%90%AD%E5%BB%BA%E5%9F%BA%E7%A1%80DMC%E9%9B%86%E7%BE%A4(%E5%86%85%E7%BD%91%E7%8E%AF%E5%A2%83)-2.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<p>一块设置仅主机模式作为LAN口</p>
<figure><img src="/blog/assets/posts/%E4%BA%8C%E3%80%81%E6%90%AD%E5%BB%BA%E5%9F%BA%E7%A1%80DMC%E9%9B%86%E7%BE%A4(%E5%86%85%E7%BD%91%E7%8E%AF%E5%A2%83)-3.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<p>打开防火墙虚拟机</p>
<h3 id="_1-查看虚拟机ip-并连接xshell" tabindex="-1"><a class="header-anchor" href="#_1-查看虚拟机ip-并连接xshell"><span>1.查看虚拟机ip，并连接xshell</span></a></h3>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>ip add</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>​</p>
<p>​</p>
<h3 id="_2-设置静态ip" tabindex="-1"><a class="header-anchor" href="#_2-设置静态ip"><span>2.设置静态IP</span></a></h3>
<p><strong>nmcli 命令行</strong></p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>nmcli con mod "ens160" \\</span></span>
<span class="line"><span>ipv4.method manual \\</span></span>
<span class="line"><span>ipv4.addresses "192.168.1.8/24" \\</span></span>
<span class="line"><span>ipv4.gateway "192.168.1.1" \\</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>手动编辑 nmconnection 配置文件****编辑 NetworkManager 配置文件</strong></p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>vim /etc/NetworkManager/system-connections/ens160.nmconnection</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><strong>修改 [ipv4] 段内容</strong>（保留其他段，仅改 ipv4 部分）</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>[ipv4]</span></span>
<span class="line"><span>method=manual # 手动模式（静态）</span></span>
<span class="line"><span>addresses1=192.168.1.8/24,192.168.1.1 # IP/掩码,网关</span></span>
<span class="line"><span>ignore-auto-dns=true</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>修复文件权限</strong></p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>chmod 600 /etc/NetworkManager/system-connections/ens160.nmconnection</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>​</p>
<p><strong>重启连接使配置生效</strong></p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>nmcli c reload</span></span>
<span class="line"><span>nmcli c up ens160</span></span>
<span class="line"><span>nmcli c up ens224</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>如果xshell出现断连，去VMware中禁用再重启一下网卡</strong></p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>nmcli d up ens160</span></span>
<span class="line"><span>nmcli d up ens224</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="可能会存在的问题" tabindex="-1"><a class="header-anchor" href="#可能会存在的问题"><span>可能会存在的问题</span></a></h2>
<h3 id="网络设备中文问题" tabindex="-1"><a class="header-anchor" href="#网络设备中文问题"><span>网络设备中文问题</span></a></h3>
<p>网卡名是中文导致找不到你添加的网卡进入/etc/NetworkManager/system-connections/查看有几个网卡的配置文件</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>[root@localhost ~]# cd /etc/NetworkManager/system-connections/</span></span>
<span class="line"><span>[root@localhost system-connections]# ls</span></span>
<span class="line"><span>ens160.nmconnection</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实际上你有不只有一个nmcli connection show查看网络设备</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>[root@localhost system-connections]#  nmcli connection show</span></span>
<span class="line"><span>NAME        UUID                                  TYPE      DEVICE </span></span>
<span class="line"><span>ens160      d33dec02-4b3c-3053-82f2-acc4ea253510  ethernet  ens160 </span></span>
<span class="line"><span>有线连接 1  51054532-8ba0-3cd2-9194-a6c1a6bb8f90  ethernet  ens224 </span></span>
<span class="line"><span>有线连接 2  c1c09e1f-8e3e-37e2-b87a-122970464b26  ethernet  ens256 </span></span>
<span class="line"><span>lo          84b5497b-6232-489d-8728-d3034cdfcd63  loopback  lo</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改网络设备名称</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>[root@localhost system-connections]# nmcli connection modify "有线连接 1" connection.id ens224</span></span>
<span class="line"><span>[root@localhost system-connections]# nmcli connection modify "有线连接 2" connection.id ens256</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置snat和dnat" tabindex="-1"><a class="header-anchor" href="#配置snat和dnat"><span>配置SNAT和DNAT</span></a></h2>
<h2 id="配置堡垒机-web1-web2的ip地址为静态-注意dmz中的机器网卡模式都是仅主机模式" tabindex="-1"><a class="header-anchor" href="#配置堡垒机-web1-web2的ip地址为静态-注意dmz中的机器网卡模式都是仅主机模式"><span>配置堡垒机，web1，web2的ip地址为静态（注意DMZ中的机器网卡模式都是仅主机模式）</span></a></h2>
<p>修改堡垒机ip地址为静态ip，配置网关到防火墙的LAN口</p>
<h3 id="堡垒机" tabindex="-1"><a class="header-anchor" href="#堡垒机"><span>堡垒机</span></a></h3>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>nmcli con mod "ens160" \\</span></span>
<span class="line"><span>ipv4.method manual \\</span></span>
<span class="line"><span>ipv4.addresses "192.168.31.136/24" \\</span></span>
<span class="line"><span>ipv4.gateway "192.168.31.135" \\</span></span>
<span class="line"><span>ipv4.dns= "114.114.114.114"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="web1" tabindex="-1"><a class="header-anchor" href="#web1"><span>web1</span></a></h3>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>nmcli con mod "ens160" \\</span></span>
<span class="line"><span>ipv4.method manual \\</span></span>
<span class="line"><span>ipv4.addresses "192.168.31.130/24" \\</span></span>
<span class="line"><span>ipv4.gateway "192.168.31.135" \\</span></span>
<span class="line"><span>ipv4.dns= "114.114.114.114"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="web2" tabindex="-1"><a class="header-anchor" href="#web2"><span>web2</span></a></h3>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>nmcli con mod "ens160" \\</span></span>
<span class="line"><span>ipv4.method manual \\</span></span>
<span class="line"><span>ipv4.addresses "192.168.31.131/24" \\</span></span>
<span class="line"><span>ipv4.gateway "192.168.31.135" \\</span></span>
<span class="line"><span>ipv4.dns= "114.114.114.114"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>分别测试他们内网能不能ping通网关</p>
<h3 id="一、snat-source-nat-源网络地址转换" tabindex="-1"><a class="header-anchor" href="#一、snat-source-nat-源网络地址转换"><span>一、SNAT（Source NAT，源网络地址转换）</span></a></h3>
<h4 id="核心作用" tabindex="-1"><a class="header-anchor" href="#核心作用"><span>核心作用</span></a></h4>
<p>修改<strong>数据包的源 IP 地址</strong>（偶尔也改源端口），让<strong>内网私有 IP</strong>的设备，通过公网 IP 与外网通信，是内网设备访问外网的 “必经转换”。</p>
<h4 id="工作原理" tabindex="-1"><a class="header-anchor" href="#工作原理"><span>工作原理</span></a></h4>
<ol>
<li>内网设备（如 192.168.1.100）向外网发送数据包，源 IP 是私有 IP，目的 IP 是外网公网 IP；</li>
<li>数据包到达 NAT 网关（路由器 / 防火墙 / 服务器），网关通过 SNAT 将<strong>源 IP 替换为网关的公网 IP</strong>（如 202.103.0.1），并记录 “内网 IP: 端口 ↔ 公网 IP: 端口” 的映射关系；</li>
<li>外网服务器收到数据包，仅能看到网关的公网 IP，回复的数据包将发送到该公网 IP；</li>
<li>网关收到回复，通过之前的映射关系，反向找到对应的内网设备，将数据包转发过去。</li>
</ol>
<h4 id="核心特征" tabindex="-1"><a class="header-anchor" href="#核心特征"><span>核心特征</span></a></h4>
<ul>
<li><strong>单向访问</strong>：仅支持<strong>内网→外网</strong>，外网无法主动访问内网；</li>
<li><strong>地址复用</strong>：多个内网设备可共享<strong>同一个公网 IP</strong>访问外网（通过端口区分不同设备），这是解决 IPv4 地址枯竭的关键；</li>
<li><strong>隐藏内网</strong>：外网无法获取内网设备的真实 IP，提升内网安全性。</li>
</ul>
<p>​</p>
<h3 id="二、dnat-destination-nat-目的网络地址转换" tabindex="-1"><a class="header-anchor" href="#二、dnat-destination-nat-目的网络地址转换"><span>二、DNAT（Destination NAT，目的网络地址转换）</span></a></h3>
<h4 id="核心作用-1" tabindex="-1"><a class="header-anchor" href="#核心作用-1"><span>核心作用</span></a></h4>
<p>修改<strong>数据包的目的 IP 地址</strong>（或目的端口），将<strong>外网发往网关公网 IP</strong>的数据包，转发到<strong>内网指定的私有 IP 设备</strong>，是外网访问内网服务的 “核心转换”（端口映射是 DNAT 的常见形式）。</p>
<h4 id="工作原理-1" tabindex="-1"><a class="header-anchor" href="#工作原理-1"><span>工作原理</span></a></h4>
<ol>
<li>外网设备（如公网 IP101.37.0.2）向内网网关的公网 IP（202.103.0.1）发送数据包，目的 IP 是网关公网 IP，目的端口可指定（如 80、443）；</li>
<li>数据包到达 NAT 网关，网关通过 DNAT 将<strong>目的 IP 替换为内网目标设备的私有 IP</strong>（如 192.168.1.20，内网 web 服务器），若为端口映射，同时替换目的端口；</li>
<li>内网目标设备收到数据包，处理后将回复发送给网关；</li>
<li>网关将回复的源 IP 换回自身公网 IP，转发给外网设备。</li>
</ol>
<h4 id="核心特征-1" tabindex="-1"><a class="header-anchor" href="#核心特征-1"><span>核心特征</span></a></h4>
<ul>
<li><strong>反向访问</strong>：支持<strong>外网→内网</strong>，是外网访问内网服务的唯一方式（因内网私有 IP 无法被外网路由）；</li>
<li><strong>精准映射</strong>：可将 “公网 IP: 端口” 精准映射到 “内网 IP: 端口”，实现多内网服务共享一个公网 IP；</li>
<li><strong>端口转发</strong>：DNAT 最常用的形式是<strong>端口映射</strong>（如将公网 IP 的 80 端口映射到内网 192.168.1.20 的 80 端口，外网访问公网 80 即访问内网 web 服务器）。</li>
</ul>
<h3 id="再防火墙机器上配置dnat和snat" tabindex="-1"><a class="header-anchor" href="#再防火墙机器上配置dnat和snat"><span>再防火墙机器上配置DNAT和SNAT</span></a></h3>
<p>编写一键部署脚本</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>vi init.sh</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h4 id="一键配置脚本" tabindex="-1"><a class="header-anchor" href="#一键配置脚本"><span>一键配置脚本</span></a></h4>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>#!/bin/bash</span></span>
<span class="line"><span># 一键配置 SNAT/DNAT 优化版脚本</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 0. 检查 root 权限</span></span>
<span class="line"><span>if [ "$EUID" -ne 0 ]; then</span></span>
<span class="line"><span>    echo "错误：请使用 root 用户执行此脚本！"</span></span>
<span class="line"><span>    exit 1</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo "开始配置网络规则..."</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 1. 开启路由转发 (优化：避免重复追加)</span></span>
<span class="line"><span>echo "1. 配置内核路由转发..."</span></span>
<span class="line"><span>echo 1 > /proc/sys/net/ipv4/ip_forward</span></span>
<span class="line"><span>if ! grep -q "net.ipv4.ip_forward = 1" /etc/sysctl.conf; then</span></span>
<span class="line"><span>    echo "net.ipv4.ip_forward = 1" >> /etc/sysctl.conf</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span>sysctl -p > /dev/null 2>&#x26;1</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 2. 清空旧规则 (防止多次运行产生重复规则)</span></span>
<span class="line"><span>echo "2. 清理现有 iptables 规则..."</span></span>
<span class="line"><span>iptables -F</span></span>
<span class="line"><span>iptables -t nat -F</span></span>
<span class="line"><span>iptables -X</span></span>
<span class="line"><span>iptables -t nat -X</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 3. 配置 SNAT</span></span>
<span class="line"><span>echo "3. 配置 POSTROUTING (SNAT)..."</span></span>
<span class="line"><span># 注意：如果 ens224 不存在会报错，这里可以加个判断</span></span>
<span class="line"><span>for dev in ens160 ens224; do</span></span>
<span class="line"><span>    if ip link show "$dev" >/dev/null 2>&#x26;1; then</span></span>
<span class="line"><span>        iptables -t nat -A POSTROUTING -s 192.168.31.0/24 -o "$dev" -j MASQUERADE</span></span>
<span class="line"><span>        echo "   - 已为 $dev 配置 MASQUERADE"</span></span>
<span class="line"><span>    fi</span></span>
<span class="line"><span>done</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 4. 配置 DNAT</span></span>
<span class="line"><span>echo "4. 配置 PREROUTING (DNAT)..."</span></span>
<span class="line"><span># 转发外网访问 192.168.1.128:80 的流量到 LVS VIP 192.168.31.200</span></span>
<span class="line"><span>iptables -t nat -A PREROUTING -d 192.168.1.128 -p tcp --dport 80 -j DNAT --to-destination 192.168.31.200</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 5. 保存规则 (解决你之前的目录报错问题)</span></span>
<span class="line"><span>echo "5. 持久化规则保存..."</span></span>
<span class="line"><span>if command -v iptables-save >/dev/null 2>&#x26;1; then</span></span>
<span class="line"><span>    # CentOS/RHEL 路径</span></span>
<span class="line"><span>    if [ -d /etc/sysconfig ]; then</span></span>
<span class="line"><span>        iptables-save > /etc/sysconfig/iptables</span></span>
<span class="line"><span>        echo "   - [CentOS] 规则已保存至 /etc/sysconfig/iptables"</span></span>
<span class="line"><span>    fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # Ubuntu/Debian 路径 (增加目录创建判断)</span></span>
<span class="line"><span>    if [ -d /etc/iptables ] || mkdir -p /etc/iptables 2>/dev/null; then</span></span>
<span class="line"><span>        iptables-save > /etc/iptables/rules.v4</span></span>
<span class="line"><span>        echo "   - [Ubuntu] 规则已保存至 /etc/iptables/rules.v4"</span></span>
<span class="line"><span>    fi</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>    echo "警告：未找到 iptables-save 命令，规则可能在重启后丢失！"</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo "-------------------------------------------"</span></span>
<span class="line"><span>echo "SNAT/DNAT 配置成功！"</span></span>
<span class="line"><span>echo "当前 NAT 表规则如下："</span></span>
<span class="line"><span>iptables -t nat -L -n --line-numbers</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p>
<p>​</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};