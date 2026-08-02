import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E8%B7%B3%E6%9D%BF%E6%9C%BA/%E5%A0%A1%E5%9E%92%E6%9C%BA.html","title":"堡垒机","lang":"zh-CN","frontmatter":{"title":"堡垒机","icon":"network","date":"2026-07-23T00:00:00.000Z","category":["计算机网络"],"description":"堡垒机是什么？ 如果说跳板机是进入内网的一扇“门”，那么堡垒机（Bastion Host / PAM - Privileged Access Management）就是这扇门上加装的全方位监控摄像头、红外扫描仪和自动记录仪。 它不仅提供跳转功能，更核心的价值在于运维审计和权限精细化管理。 ​ 1. 堡垒机的核心定义 堡垒机（也叫运维审计系统）是集成了 ...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"堡垒机\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E8%B7%B3%E6%9D%BF%E6%9C%BA/%E5%A0%A1%E5%9E%92%E6%9C%BA.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"堡垒机"}],["meta",{"property":"og:description","content":"堡垒机是什么？ 如果说跳板机是进入内网的一扇“门”，那么堡垒机（Bastion Host / PAM - Privileged Access Management）就是这扇门上加装的全方位监控摄像头、红外扫描仪和自动记录仪。 它不仅提供跳转功能，更核心的价值在于运维审计和权限精细化管理。 ​ 1. 堡垒机的核心定义 堡垒机（也叫运维审计系统）是集成了 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.88,"words":864},"filePathRelative":"posts/计算机网络/网络的概念/跳板机/堡垒机.md","excerpt":"<h2>堡垒机是什么？</h2>\\n<p>如果说<strong>跳板机</strong>是进入内网的一扇“门”，那么<strong>堡垒机（Bastion Host / PAM - Privileged Access Management）<strong><strong>就是这扇门上加装的</strong></strong>全方位监控摄像头、红外扫描仪和自动记录仪</strong>。</p>\\n<p>它不仅提供跳转功能，更核心的价值在于<strong>运维审计</strong>和<strong>权限精细化管理</strong>。</p>\\n<p>​</p>\\n<h2>1. 堡垒机的核心定义</h2>\\n","autoDesc":true}`),i={name:`堡垒机.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><h2 id="堡垒机是什么" tabindex="-1"><a class="header-anchor" href="#堡垒机是什么"><span>堡垒机是什么？</span></a></h2>
<p>如果说<strong>跳板机</strong>是进入内网的一扇“门”，那么<strong>堡垒机（Bastion Host / PAM - Privileged Access Management）<strong><strong>就是这扇门上加装的</strong></strong>全方位监控摄像头、红外扫描仪和自动记录仪</strong>。</p>
<p>它不仅提供跳转功能，更核心的价值在于<strong>运维审计</strong>和<strong>权限精细化管理</strong>。</p>
<p>​</p>
<h2 id="_1-堡垒机的核心定义" tabindex="-1"><a class="header-anchor" href="#_1-堡垒机的核心定义"><span>1. 堡垒机的核心定义</span></a></h2>
<p>堡垒机（也叫运维审计系统）是集成了 <strong>资产管理、身份验证、访问控制、指令过滤</strong> 和 <strong>操作审计</strong> 于一体的网络安全管理平台。</p>
<p>在企业内部，它通常遵循 <strong>4A 规范</strong>：</p>
<ul>
<li><strong>Account（账号管理）：</strong> 集中管理所有服务器、数据库和网络设备的账号。</li>
<li><strong>Authentication（认证管理）：</strong> 提供强认证（如双因子认证 MFA、动态口令），确保“你就是你”。</li>
<li><strong>Authorization（授权管理）：</strong> 控制谁能访问哪台机器，能用什么权限（如仅查看、禁止删除）。</li>
<li><strong>Audit（审计管理）：</strong> 全程录像、命令记录，出现问题时可以“坐时光机”回去查证。</li>
</ul>
<hr>
<h2 id="_2-堡垒机的工作原理" tabindex="-1"><a class="header-anchor" href="#_2-堡垒机的工作原理"><span>2. 堡垒机的工作原理</span></a></h2>
<p>堡垒机在逻辑上处于<strong>外部访问者</strong>与<strong>内部资源</strong>之间，充当了所有流量的“唯一中转站”。</p>
<h3 id="关键机制" tabindex="-1"><a class="header-anchor" href="#关键机制"><span>关键机制：</span></a></h3>
<ol>
<li><strong>协议代理：</strong> 运维人员不再直接 SSH 到服务器，而是登录堡垒机的 Web 或客户端界面。堡垒机作为代理，通过 SSH、RDP、VNC、HTTPS 等协议连接后端资源。</li>
<li><strong>指纹与指令过滤：</strong> 堡垒机能实时解析你输入的每一条命令。如果你输入了高危指令（如 <code v-pre>rm -rf /</code> 或 <code v-pre>drop table</code>），堡垒机可以根据预设规则直接<strong>阻断</strong>并报警。</li>
<li><strong>录像与回放：</strong> 无论是 Linux 的命令行操作，还是 Windows 的图形化桌面操作，堡垒机都会将其转化成视频流记录下来。</li>
</ol>
<hr>
<h2 id="_3-堡垒机-vs-跳板机的深度区别" tabindex="-1"><a class="header-anchor" href="#_3-堡垒机-vs-跳板机的深度区别"><span>3. 堡垒机 vs 跳板机的深度区别</span></a></h2>
<table>
<thead>
<tr>
<th><strong>特性</strong></th>
<th><strong>跳板机 (Jump Server)</strong></th>
<th><strong>堡垒机 (Bastion Host)</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>主要定位</strong></td>
<td>解决“能不能进去”的问题</td>
<td>解决“进去能干嘛、干了嘛”的问题</td>
</tr>
<tr>
<td><strong>操作审计</strong></td>
<td>基本没有，或仅有简单的 Shell 日志</td>
<td>全程录像、指令实时监控、可随时回放</td>
</tr>
<tr>
<td><strong>安全深度</strong></td>
<td>弱（一台被入侵，内网全暴露）</td>
<td>强（支持指令拦截、访问策略动态调整）</td>
</tr>
<tr>
<td><strong>账号管理</strong></td>
<td>分散在各个服务器上</td>
<td>集中管理，支持一键修改所有设备密码</td>
</tr>
<tr>
<td><strong>合规性</strong></td>
<td>无法满足等保 2.0 等法律法规</td>
<td><strong>等保 2.0、ISO27001 等合规性必备</strong></td>
</tr>
</tbody>
</table>
<hr>
<h2 id="_4-为什么要用堡垒机" tabindex="-1"><a class="header-anchor" href="#_4-为什么要用堡垒机"><span>4. 为什么要用堡垒机？</span></a></h2>
<ul>
<li><strong>防止“删库跑路”：</strong> 通过高危命令拦截和权限限制，让这种风险降到最低。</li>
<li><strong>责任判定：</strong> 当多个人共用一个服务器账号（如 <code v-pre>root</code>）时，堡垒机能识别出背后操作的真实自然人是谁。</li>
<li><strong>符合法律合规：</strong> 在中国，关键信息基础设施必须通过**等级保护（等保）**评测，而“运维审计”是其中的硬性要求。</li>
<li><strong>简化运维：</strong> 运维人员不再需要记住几百台机器的 IP 和密码，只需要记住堡垒机的一个账号即可。</li>
</ul>
<h3 id="常见的堡垒机产品" tabindex="-1"><a class="header-anchor" href="#常见的堡垒机产品"><span>常见的堡垒机产品：</span></a></h3>
<ul>
<li><strong>开源：</strong> JumpServer（目前国内最流行的开源选择）。</li>
<li><strong>商业/云厂商：</strong> 阿里云堡垒机、腾讯云堡垒机、深信服堡垒机等。</li>
</ul>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};