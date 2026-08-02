import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E8%B7%B3%E6%9D%BF%E6%9C%BA/DMZ%E5%8C%BA%E5%9F%9F.html","title":"DMZ区域","lang":"zh-CN","frontmatter":{"title":"DMZ区域","icon":"network","date":"2026-07-23T00:00:00.000Z","category":["计算机网络"],"description":"DMZ（Demilitarized Zone，隔离区 ） 是网络安全中的一个重要概念。 如果把你的内网（局域网）比作私人住宅，把公网（互联网）****比作混乱的街道，那么 DMZ 区就像是住宅门前的“小院子”或“接待室”。 1. 为什么需要 DMZ 区？ 在企业网络中，有些服务必须让外部用户访问（比如公司官网、邮件服务器、FTP 端口）。 如果不设 D...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"DMZ区域\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E8%B7%B3%E6%9D%BF%E6%9C%BA/DMZ%E5%8C%BA%E5%9F%9F.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"DMZ区域"}],["meta",{"property":"og:description","content":"DMZ（Demilitarized Zone，隔离区 ） 是网络安全中的一个重要概念。 如果把你的内网（局域网）比作私人住宅，把公网（互联网）****比作混乱的街道，那么 DMZ 区就像是住宅门前的“小院子”或“接待室”。 1. 为什么需要 DMZ 区？ 在企业网络中，有些服务必须让外部用户访问（比如公司官网、邮件服务器、FTP 端口）。 如果不设 D..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.75,"words":824},"filePathRelative":"posts/计算机网络/网络的概念/跳板机/DMZ区域.md","excerpt":"<p><strong>DMZ（Demilitarized Zone，隔离区 ）</strong> 是网络安全中的一个重要概念。</p>\\n<p>如果把你的<strong>内网（局域网）<strong><strong>比作私人住宅，把</strong></strong>公网（互联网）****比作混乱的街道，那么</strong> <strong>DMZ 区<strong><strong>就像是住宅门前的</strong></strong>“小院子”<strong><strong>或</strong></strong>“接待室”</strong>。</p>\\n<hr>\\n<h2>1. 为什么需要 DMZ 区？</h2>","autoDesc":true}`),i={name:`DMZ区域.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p><strong>DMZ（Demilitarized Zone，隔离区 ）</strong> 是网络安全中的一个重要概念。</p>
<p>如果把你的<strong>内网（局域网）<strong><strong>比作私人住宅，把</strong></strong>公网（互联网）****比作混乱的街道，那么</strong> <strong>DMZ 区<strong><strong>就像是住宅门前的</strong></strong>“小院子”<strong><strong>或</strong></strong>“接待室”</strong>。</p>
<hr>
<h2 id="_1-为什么需要-dmz-区" tabindex="-1"><a class="header-anchor" href="#_1-为什么需要-dmz-区"><span>1. 为什么需要 DMZ 区？</span></a></h2>
<p>在企业网络中，有些服务必须让外部用户访问（比如公司官网、邮件服务器、FTP 端口）。</p>
<ul>
<li><strong>如果不设 DMZ：</strong> 你直接把服务器放在内网，一旦服务器被黑客攻破，黑客就直接进入了你的内网核心区域。</li>
<li><strong>如果设了 DMZ：</strong> 即使这台面向公众的服务器被攻破，黑客也只能在 DMZ 这个“小院子”里活动，无法轻易越过第二道防火墙进入你的“私人住宅”。</li>
</ul>
<hr>
<h2 id="_2-dmz-的工作原理" tabindex="-1"><a class="header-anchor" href="#_2-dmz-的工作原理"><span>2. DMZ 的工作原理</span></a></h2>
<p>DMZ 通常通过防火墙的规则来实现。标准的 DMZ 架构（双防火墙模式）遵循以下访问逻辑：</p>
<ol>
<li><strong>公网用户 → DMZ：</strong> 允许访问。用户可以查看网页、发送邮件。</li>
<li><strong>DMZ → 内网：****严格禁止（或受限）</strong>。DMZ 内的服务器不能主动发起连接去访问内网的核心数据库或员工电脑。</li>
<li><strong>内网 → DMZ：</strong> 允许访问。内网管理员可以管理 DMZ 区的服务器。</li>
<li><strong>内网 → 公网：</strong> 允许访问。员工可以上网。</li>
</ol>
<hr>
<h2 id="_3-dmz-区通常放什么" tabindex="-1"><a class="header-anchor" href="#_3-dmz-区通常放什么"><span>3. DMZ 区通常放什么？</span></a></h2>
<p>只有那些<strong>必须暴露在公网上</strong>的服务才应该放在 DMZ：</p>
<ul>
<li><strong>Web 服务器：</strong> 你的官方网站。</li>
<li><strong>邮件服务器（Email Server）：</strong> 负责收发外部邮件。</li>
<li><strong>FTP 服务器：</strong> 提供文件下载。</li>
<li><strong>DNS 服务器：</strong> 域名解析服务。</li>
<li><strong>跳板机/VPN 网关：</strong> 远程接入的入口。</li>
</ul>
<hr>
<h2 id="_4-dmz-的实现方式" tabindex="-1"><a class="header-anchor" href="#_4-dmz-的实现方式"><span>4. DMZ 的实现方式</span></a></h2>
<h3 id="a-单防火墙模式-三向控制" tabindex="-1"><a class="header-anchor" href="#a-单防火墙模式-三向控制"><span>A. 单防火墙模式（三向控制）</span></a></h3>
<p>使用一台防火墙，但它有三个网口：一个接公网，一个接内网，一个接 DMZ。通过在这台设备上配置不同的安全策略来隔离三个区域。</p>
<h3 id="b-双防火墙模式-背靠背" tabindex="-1"><a class="header-anchor" href="#b-双防火墙模式-背靠背"><span>B. 双防火墙模式（背靠背）</span></a></h3>
<p>最安全的方式。</p>
<ul>
<li><strong>外侧防火墙：</strong> 挡在公网和 DMZ 之间。</li>
<li><strong>内侧防火墙：</strong> 挡在 DMZ 和内网之间。 这种方式提供了双重保障，黑客需要攻破两台不同配置（甚至不同品牌）的防火墙才能进入内网。</li>
</ul>
<hr>
<h2 id="_5-总结-它与跳板机的关系" tabindex="-1"><a class="header-anchor" href="#_5-总结-它与跳板机的关系"><span>5. 总结：它与跳板机的关系</span></a></h2>
<p>你之前问过<strong>跳板机</strong>，其实跳板机通常就部署在 <strong>DMZ 区</strong>。</p>
<ul>
<li><strong>物理位置：</strong> 跳板机住在 DMZ 这个“接待室”里。</li>
<li><strong>协作方式：</strong> 你从公网先进入 DMZ 的跳板机，再通过跳板机跨过第二道防火墙进入内网。</li>
</ul>
<p>[!TIP] <strong>对于家庭用户：</strong> 很多家用路由器里也有“DMZ 主机”设置。如果你开启它并指向某台电脑，那台电脑的所 有端口都会暴露在互联网上。<strong>除非你要跑特殊的服务器或联机游戏，否则不建议家庭用户开启，因为这相当于撤掉了所有防护。</strong></p>
<p>你想了解如何利用 Linux（如 <code v-pre>iptables</code>）手动配置一个简单的 DMZ 隔离规则，还是想看看它在更复杂的云环境（如 VPC）中是如何演变的？</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};