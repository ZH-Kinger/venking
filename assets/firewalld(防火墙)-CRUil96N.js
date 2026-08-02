import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/firewalld(%E9%98%B2%E7%81%AB%E5%A2%99).html","title":"firewalld(防火墙)","lang":"zh-CN","frontmatter":{"title":"firewalld(防火墙)","icon":"network","date":"2026-07-23T00:00:00.000Z","category":["计算机网络"],"description":"简单来说，防火墙（Firewall） 就像是网络世界的“门禁”或“安检站”。它根据预先设定的安全策略，对流经它的网络流量进行监控和过滤，决定哪些数据包可以进入你的网络，哪些必须被拦截。 防火墙既可以是硬件设备（如企业机房里的铁盒子），也可以是软件程序（如 Windows 自带的防火墙）。 防火墙 1.包过滤防火墙：看ip包、段（端口号） --工作在网络...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"firewalld(防火墙)\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/firewalld(%E9%98%B2%E7%81%AB%E5%A2%99).html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"firewalld(防火墙)"}],["meta",{"property":"og:description","content":"简单来说，防火墙（Firewall） 就像是网络世界的“门禁”或“安检站”。它根据预先设定的安全策略，对流经它的网络流量进行监控和过滤，决定哪些数据包可以进入你的网络，哪些必须被拦截。 防火墙既可以是硬件设备（如企业机房里的铁盒子），也可以是软件程序（如 Windows 自带的防火墙）。 防火墙 1.包过滤防火墙：看ip包、段（端口号） --工作在网络..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.22,"words":967},"filePathRelative":"posts/计算机网络/网络的概念/firewalld(防火墙).md","excerpt":"<p>简单来说，<strong>防火墙（Firewall）</strong> 就像是网络世界的“门禁”或“安检站”。它根据预先设定的<strong>安全策略</strong>，对流经它的网络流量进行监控和过滤，决定哪些数据包可以进入你的网络，哪些必须被拦截。</p>\\n<p>防火墙既可以是<strong>硬件设备</strong>（如企业机房里的铁盒子），也可以是<strong>软件程序</strong>（如 Windows 自带的防火墙）。</p>\\n<hr>\\n<h2>防火墙</h2>\\n<p>1.包过滤防火墙：看ip包、段（端口号） --工作在网络层和传输层</p>\\n<p>2.应用级别防火墙：看应用层协议：http、ftp、qq等 --应用层 --7层</p>","autoDesc":true}`),i={name:`firewalld(防火墙).md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>简单来说，<strong>防火墙（Firewall）</strong> 就像是网络世界的“门禁”或“安检站”。它根据预先设定的<strong>安全策略</strong>，对流经它的网络流量进行监控和过滤，决定哪些数据包可以进入你的网络，哪些必须被拦截。</p>
<p>防火墙既可以是<strong>硬件设备</strong>（如企业机房里的铁盒子），也可以是<strong>软件程序</strong>（如 Windows 自带的防火墙）。</p>
<hr>
<h2 id="防火墙" tabindex="-1"><a class="header-anchor" href="#防火墙"><span>防火墙</span></a></h2>
<p>1.包过滤防火墙：看ip包、段（端口号） --工作在网络层和传输层</p>
<p>2.应用级别防火墙：看应用层协议：http、ftp、qq等 --应用层 --7层</p>
<h2 id="防火墙分类-按功能分类" tabindex="-1"><a class="header-anchor" href="#防火墙分类-按功能分类"><span>防火墙分类（按功能分类）：</span></a></h2>
<p>1.软件防火墙 -- iptables + netfilter + 普通的机器 + linux</p>
<p>snat+dnat</p>
<p>2.硬件防火墙 --iptables + netfilter +普通的机器 + linux + 专用的芯片、网卡、cpu等路由器的使用</p>
<p><strong>waf</strong>：web应用防护系统（也称为应用级入侵防御系统。英文：web Application Firewall，简称firewall）</p>
<p>传统的防火墙主要工作在网络层（L3/L4），拦截特定的 IP 或端口。而 WAF 工作在 <strong>应用层（L7）</strong>，它会深度检测 HTTP/HTTPS 流量的具体内容。</p>
<h2 id="_1-防火墙的核心功能" tabindex="-1"><a class="header-anchor" href="#_1-防火墙的核心功能"><span>1. 防火墙的核心功能</span></a></h2>
<p>防火墙的主要任务是<strong>隔离</strong>。它通常部署在受信任的内部网络（如公司局域网）与不受信任的外部网络（如互联网）之间。</p>
<ul>
<li><strong>访问控制</strong>：根据 IP 地址、端口号或协议类型限制访问。</li>
<li><strong>攻击防护</strong>：拦截常见的网络攻击（如非法入侵、恶意扫描）。</li>
<li><strong>日志记录</strong>：记录所有尝试访问网络的行为，便于事后溯源。</li>
</ul>
<hr>
<h2 id="_2-防火墙的分类-按技术演进" tabindex="-1"><a class="header-anchor" href="#_2-防火墙的分类-按技术演进"><span>2. 防火墙的分类（按技术演进）</span></a></h2>
<p>随着网络攻击手段的升级，防火墙也经历了几个阶段：</p>
<h3 id="_1-包过滤防火墙-packet-filtering" tabindex="-1"><a class="header-anchor" href="#_1-包过滤防火墙-packet-filtering"><span>① 包过滤防火墙 (Packet Filtering)</span></a></h3>
<ul>
<li><strong>工作层面</strong>：网络层（Layer 3）和传输层（Layer 4）。</li>
<li><strong>原理</strong>：只检查数据包的“信封信息”（源地址、目的地址、端口）。</li>
<li><strong>缺点</strong>：它不看信件内容，容易被伪装的数据包欺骗。</li>
</ul>
<h3 id="_2-状态检测防火墙-stateful-inspection" tabindex="-1"><a class="header-anchor" href="#_2-状态检测防火墙-stateful-inspection"><span>② 状态检测防火墙 (Stateful Inspection)</span></a></h3>
<ul>
<li><strong>特性</strong>：目前最主流的基础机制。</li>
<li><strong>原理</strong>：它会记住“会话状态”。如果一个外部数据包不是对内部请求的回应，也不是已知合法连接的一部分，它会被拒绝。</li>
</ul>
<h3 id="_3-应用层网关-代理防火墙-application-gateway" tabindex="-1"><a class="header-anchor" href="#_3-应用层网关-代理防火墙-application-gateway"><span>③ 应用层网关 / 代理防火墙 (Application Gateway)</span></a></h3>
<ul>
<li><strong>工作层面</strong>：应用层（Layer 7）。</li>
<li><strong>原理</strong>：它彻底隔绝内外连接，数据必须由防火墙代为转发。它可以检查具体的协议内容（如拦截包含敏感词的 HTTP 请求）。</li>
</ul>
<h3 id="_4-下一代防火墙-ngfw" tabindex="-1"><a class="header-anchor" href="#_4-下一代防火墙-ngfw"><span>④ 下一代防火墙 (NGFW)</span></a></h3>
<ul>
<li><strong>特性</strong>：现代企业的标配。</li>
<li><strong>集成功能</strong>：除了传统防火墙功能，还集成了 <strong>入侵防御 (IPS)</strong>、<strong>深度包检测 (DPI)</strong>、<strong>反病毒</strong>、以及<strong>识别具体应用程序</strong>（例如：允许员工上微信，但不允许在微信里发文件）的功能。</li>
</ul>
<hr>
<h2 id="_3-防火墙与杀毒软件的区别" tabindex="-1"><a class="header-anchor" href="#_3-防火墙与杀毒软件的区别"><span>3. 防火墙与杀毒软件的区别</span></a></h2>
<p>很多人会混淆这两者，但它们的职责完全不同：</p>
<table>
<thead>
<tr>
<th><strong>维度</strong></th>
<th><strong>防火墙</strong></th>
<th><strong>杀毒软件 (Endpoint Security)</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>主要任务</strong></td>
<td><strong>控制流量</strong>（查“谁”进来了）</td>
<td><strong>清理病毒</strong>（查“进来的人”干了什么）</td>
</tr>
<tr>
<td><strong>防护位置</strong></td>
<td>网络边界、进出口</td>
<td>电脑/服务器内部</td>
</tr>
<tr>
<td><strong>比喻</strong></td>
<td>住宅小区的<strong>大门保安</strong></td>
<td>你家里的<strong>私人医生/保洁</strong></td>
</tr>
</tbody>
</table>
<hr>
<h2 id="_4-常见的部署位置" tabindex="-1"><a class="header-anchor" href="#_4-常见的部署位置"><span>4. 常见的部署位置</span></a></h2>
<ul>
<li><strong>边界防火墙</strong>：保护整个内网，过滤来自互联网的威胁。</li>
<li><strong>主机防火墙</strong>：安装在单台服务器或个人电脑上（如 Linux 的 <code v-pre>iptables</code> / <code v-pre>firewalld</code>）。</li>
<li><strong>DMZ（隔离区）</strong>：将对外提供服务的服务器（如 Web 服务器）放在一个特殊的区域，即便这些服务器被攻破，防火墙也能防止黑客进一步渗透到内部核心网络。</li>
</ul>
<hr>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};