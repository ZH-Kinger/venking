import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%BF%90%E7%BB%B4/web%E9%9B%86%E7%BE%A4/web%E9%9B%86%E7%BE%A4%E9%A1%B9%E7%9B%AE/web%E9%9B%86%E7%BE%A4%E9%A1%B9%E7%9B%AE.html","title":"web集群项目","lang":"zh-CN","frontmatter":{"title":"web集群项目","icon":"server","date":"2026-07-23T00:00:00.000Z","category":["运维"],"description":"这个项目的核心是基于 rocky10.1 搭建高可用、可监控、安全可控的 Web 集群系统，通过整合多种运维工具和服务，实现 Web 服务的稳定部署、高效管理与安全防护。 ​ 白板 1白板 1 核心模块与目标 Web 集群架构：以 web1、web2 为应用节点，搭配 LVS+Keepalived 实现负载均衡与高可用，确保服务不中断。 数据共享与统一...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"web集群项目\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/web%E9%9B%86%E7%BE%A4%E9%A1%B9%E7%9B%AE-%E7%99%BD%E6%9D%BF-1.svg\\",\\"https://venking.tech/blog/blog/assets/posts/web%E9%9B%86%E7%BE%A4%E9%A1%B9%E7%9B%AE-1.png\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%BF%90%E7%BB%B4/web%E9%9B%86%E7%BE%A4/web%E9%9B%86%E7%BE%A4%E9%A1%B9%E7%9B%AE/web%E9%9B%86%E7%BE%A4%E9%A1%B9%E7%9B%AE.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"web集群项目"}],["meta",{"property":"og:description","content":"这个项目的核心是基于 rocky10.1 搭建高可用、可监控、安全可控的 Web 集群系统，通过整合多种运维工具和服务，实现 Web 服务的稳定部署、高效管理与安全防护。 ​ 白板 1白板 1 核心模块与目标 Web 集群架构：以 web1、web2 为应用节点，搭配 LVS+Keepalived 实现负载均衡与高可用，确保服务不中断。 数据共享与统一..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/web%E9%9B%86%E7%BE%A4%E9%A1%B9%E7%9B%AE-%E7%99%BD%E6%9D%BF-1.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":4.21,"words":1263},"filePathRelative":"posts/运维/web集群/web集群项目/web集群项目.md","excerpt":"<p>这个项目的核心是<strong>基于 rocky10.1 搭建高可用、可监控、安全可控的 Web 集群系统</strong>，通过整合多种运维工具和服务，实现 Web 服务的稳定部署、高效管理与安全防护。</p>\\n<p>​</p>\\n<div class=\\"language-mermaid line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"mermaid\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code class=\\"language-mermaid\\"><span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">flowchart LR</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n1[\\"Mysql192.168.31.136\\"]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n2[\\"LB2192.168.31.133\\"]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n3[\\"web1192.168.31.131\\"]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n4[\\"Firewall\\"]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n5[\\"客户端\\"]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n6[\\"Basion192.168.31.136\\"]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n7[\\"WAN\\"]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n8[\\"LAN\\"]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n9[\\"nfs\\"]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n10[\\"web2192.168.31.130\\"]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n11[\\"LB1192.168.31.132\\"]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n5 -- \\"192.168.1.128\\" --> n7</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n8 --> n6</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n8 --> n2</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n8 --> n11</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n2 --> n3</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n11 --> n10</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n8 --> n3</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n8 --> n10</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n4 -- \\"192.168.31.135\\" --> n1</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n9 --> n3</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n9 --> n10</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">  n3 --> n10</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`),i={name:`web集群项目.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>这个项目的核心是<strong>基于 rocky10.1 搭建高可用、可监控、安全可控的 Web 集群系统</strong>，通过整合多种运维工具和服务，实现 Web 服务的稳定部署、高效管理与安全防护。</p>
<p>​</p>
<div class="language-mermaid line-numbers-mode" data-highlighter="shiki" data-ext="mermaid" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-mermaid"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">flowchart LR</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n1["Mysql192.168.31.136"]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n2["LB2192.168.31.133"]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n3["web1192.168.31.131"]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n4["Firewall"]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n5["客户端"]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n6["Basion192.168.31.136"]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n7["WAN"]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n8["LAN"]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n9["nfs"]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n10["web2192.168.31.130"]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n11["LB1192.168.31.132"]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n5 -- "192.168.1.128" --> n7</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n8 --> n6</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n8 --> n2</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n8 --> n11</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n2 --> n3</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n11 --> n10</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n8 --> n3</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n8 --> n10</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n4 -- "192.168.31.135" --> n1</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n9 --> n3</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n9 --> n10</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n3 --> n10</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="/blog/assets/posts/web%E9%9B%86%E7%BE%A4%E9%A1%B9%E7%9B%AE-%E7%99%BD%E6%9D%BF-1.svg" alt="白板 1" tabindex="0" loading="lazy"><figcaption>白板 1</figcaption></figure>
<h3 id="核心模块与目标" tabindex="-1"><a class="header-anchor" href="#核心模块与目标"><span>核心模块与目标</span></a></h3>
<ol>
<li><strong>Web 集群架构</strong>：以 web1、web2 为应用节点，搭配 LVS+Keepalived 实现负载均衡与高可用，确保服务不中断。</li>
<li><strong>数据共享与统一管理</strong>：通过 NFS 服务器提供共享存储，让集群节点共用 Web 资源，配合 Ansible 实现批量运维（如免密部署、脚本执行），提升管理效率。</li>
<li><strong>基础服务支撑</strong>：部署 MySQL 5.7 提供数据存储，搭建 DNS 服务器实现集群域名解析，保障服务正常访问。</li>
<li><strong>全链路监控</strong>：通过 Prometheus+Grafana 监控所有服务器（CPU、内存、网络等），搭配 node_exporter 采集数据，实时掌握集群状态。</li>
<li><strong>安全防护体系</strong>：通过防火墙 + 路由器划分 DMZ 区隔离内外网，配置 SNAT/DNAT 实现网络访问控制，结合堡垒机和 TCP wrappers 限制 SSH 访问，提升集群安全性。</li>
<li><strong>性能验证</strong>：通过 ab 工具、阿里云 PTS 进行压力测试，验证集群并发处理能力，确保服务稳定性。</li>
</ol>
<p>​</p>
<table>
<thead>
<tr>
<th><strong>角色名称</strong></th>
<th><strong>主机名 (Hostname)</strong></th>
<th><strong>IP 地址 (部分已知)</strong></th>
<th><strong>主要功能与部署软件</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>综合管理服务器</strong></td>
<td><code v-pre>nfs-ansible-prom</code></td>
<td><code v-pre>192.168.203.145</code>&lt;br&gt;(初始)</td>
<td><strong>NFS</strong>: 提供共享存储 <code v-pre>/web/html</code>。&lt;br&gt;+2&lt;br&gt;<strong>Ansible</strong>: 自动化运维管理中心 。&lt;br&gt;+1&lt;br&gt;<strong>Prometheus</strong>: 监控全网服务器状态 。</td>
</tr>
<tr>
<td><strong>Web 节点 1</strong></td>
<td><code v-pre>web1</code></td>
<td><code v-pre>192.168.203.133</code></td>
<td><strong>Nginx</strong>: Web 服务，挂载 NFS 共享目录 。&lt;br&gt;+1</td>
</tr>
<tr>
<td><strong>Web 节点 2</strong></td>
<td><code v-pre>web2</code></td>
<td><code v-pre>192.168.203.134</code></td>
<td><strong>Nginx</strong>: Web 服务，挂载 NFS 共享目录 。&lt;br&gt;+3</td>
</tr>
<tr>
<td><strong>数据库服务器</strong></td>
<td><code v-pre>db-mysql</code></td>
<td><code v-pre>192.168.203.147</code></td>
<td><strong>MySQL 5.7</strong>: 数据持久化存储 。&lt;br&gt;+2</td>
</tr>
<tr>
<td><strong>负载均衡器</strong></td>
<td><code v-pre>LB1</code>&lt;br&gt;/ <code v-pre>LB2</code></td>
<td><code v-pre>192.168.203.136/137</code></td>
<td><strong>LVS/Keepalived</strong>: 负责流量分发与高可用 。&lt;br&gt;+1</td>
</tr>
<tr>
<td><strong>防火墙/网关</strong></td>
<td><code v-pre>fw</code></td>
<td><code v-pre>192.168.203.138</code></td>
<td>安全防护与网络准入控制 。&lt;br&gt;+2</td>
</tr>
</tbody>
</table>
<h2 id="项目分布" tabindex="-1"><a class="header-anchor" href="#项目分布"><span>项目分布</span></a></h2>
<p>该 Web 集群项目共需 <strong>6 台机器</strong>，每台机器的角色、运行服务及核心作用如下，完全贴合文档架构设计：</p>
<h3 id="_1-web-节点服务器-2-台-web1、web2" tabindex="-1"><a class="header-anchor" href="#_1-web-节点服务器-2-台-web1、web2"><span>1. Web 节点服务器（2 台：web1、web2）</span></a></h3>
<ul>
<li>
<p><strong>运行服务</strong>：Nginx、nfs-utils（客户端）、node_exporter（监控采集）</p>
</li>
<li>
<p><strong>核心作用</strong>：</p>
</li>
<li>
<p>部署 Web 服务（如网站、下载功能），直接响应用户 HTTP 请求；</p>
</li>
<li>
<p>挂载 NFS 共享目录，实现 Web 资源（页面、下载文件）统一管理；</p>
</li>
<li>
<p>通过 node_exporter 向 Prometheus 上报服务器资源（CPU、内存）数据。</p>
</li>
</ul>
<h3 id="_2-负载均衡服务器-2-台-lb1、lb2" tabindex="-1"><a class="header-anchor" href="#_2-负载均衡服务器-2-台-lb1、lb2"><span>2. 负载均衡服务器（2 台：LB1、LB2）</span></a></h3>
<ul>
<li>
<p><strong>运行服务</strong>：LVS+Keepalived、node_exporter</p>
</li>
<li>
<p><strong>核心作用</strong>：</p>
</li>
<li>
<p>分发用户请求到 web1、web2，实现负载分担，提升并发处理能力；</p>
</li>
<li>
<p>Keepalived 实现高可用，一台故障时另一台自动接管（避免单点故障）；</p>
</li>
<li>
<p>监控自身资源状态，同步至监控系统。</p>
</li>
</ul>
<h3 id="_3-综合功能服务器-1-台" tabindex="-1"><a class="header-anchor" href="#_3-综合功能服务器-1-台"><span>3. 综合功能服务器（1 台）</span></a></h3>
<ul>
<li>
<p><strong>运行服务</strong>：NFS 服务器、Ansible、Prometheus、Grafana、DNS（Bind）、堡垒机</p>
</li>
<li>
<p><strong>核心作用</strong>：</p>
</li>
<li>
<p>NFS 服务器：提供共享存储，集中存放 Web 集群的页面、下载文件等资源；</p>
</li>
<li>
<p>Ansible：自动化运维（批量部署软件、执行脚本、配置管理）；</p>
</li>
<li>
<p>Prometheus+Grafana：采集所有服务器监控数据，可视化展示（如资源使用率、服务状态）；</p>
</li>
<li>
<p>DNS 服务器：解析集群内部域名（如<a href="https://www.sc.com" target="_blank" rel="noopener noreferrer">www.sc.com</a>），简化访问；</p>
</li>
<li>
<p>堡垒机：作为唯一 SSH 跳板机，控制对其他服务器的访问权限（提升安全性）。</p>
</li>
</ul>
<h3 id="_4-mysql-数据库服务器-1-台" tabindex="-1"><a class="header-anchor" href="#_4-mysql-数据库服务器-1-台"><span>4. MySQL 数据库服务器（1 台）</span></a></h3>
<ul>
<li>
<p><strong>运行服务</strong>：MySQL 5.7、node_exporter</p>
</li>
<li>
<p><strong>核心作用</strong>：</p>
</li>
<li>
<p>存储 Web 应用的业务数据（如用户信息、配置数据）；</p>
</li>
<li>
<p>提供稳定的数据读写服务，支撑 Web 集群功能运行；</p>
</li>
<li>
<p>上报数据库服务器资源监控数据。</p>
</li>
</ul>
<h3 id="_5-防火墙-路由器服务器-1-台" tabindex="-1"><a class="header-anchor" href="#_5-防火墙-路由器服务器-1-台"><span>5. 防火墙 + 路由器服务器（1 台）</span></a></h3>
<ul>
<li>
<p><strong>运行服务</strong>：iptables（SNAT/DNAT 规则）、TCP wrappers、node_exporter</p>
</li>
<li>
<p><strong>核心作用</strong>：</p>
</li>
<li>
<p>划分 DMZ 区（隔离内网与外网），保护集群安全；</p>
</li>
<li>
<p>SNAT：允许 DMZ 区服务器（Web、MySQL 等）访问外网（如下载软件）；</p>
</li>
<li>
<p>DNAT：将外网用户请求转发至内部服务（如 80 端口转发到 Web 节点、2233 端口转发到堡垒机）；</p>
</li>
<li>
<p>限制 SSH 访问：仅允许堡垒机连接其他服务器，禁止服务器间互访。</p>
</li>
</ul>
<h3 id="核心架构逻辑" tabindex="-1"><a class="header-anchor" href="#核心架构逻辑"><span>核心架构逻辑</span></a></h3>
<ul>
<li>高可用：Web、LB 均为双机部署，避免单点故障；</li>
<li>资源统一：NFS 集中管理 Web 资源，Ansible 统一运维；</li>
<li>安全隔离：防火墙 + 堡垒机 + TCP wrappers 构建多层安全防护；</li>
<li>可监控：全节点部署 node_exporter，通过 Prometheus+Grafana 实时监控。</li>
</ul>
<figure><img src="/blog/assets/posts/web%E9%9B%86%E7%BE%A4%E9%A1%B9%E7%9B%AE-1.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};