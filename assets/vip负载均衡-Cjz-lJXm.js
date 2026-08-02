import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E8%B7%B3%E5%8A%A8%E8%BF%90%E7%BB%B4%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88%E9%9D%A2%E8%AF%95%E5%87%86%E5%A4%87%E6%8C%87%E5%8D%97(%E9%80%82%E9%85%8D%E4%BD%A0%E7%9A%84%E7%AE%80%E5%8E%86%E8%83%8C%E6%99%AF)/%E5%9F%BA%E7%A1%80%E9%97%AE%E9%A2%98/vip%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1.html","title":"vip负载均衡","lang":"zh-CN","frontmatter":{"title":"vip负载均衡","icon":"clipboard-text","date":"2026-07-23T00:00:00.000Z","category":["面试"],"description":"梓涵，你一眼就看出了这个架构的“痛点”：在传统的 Master-Backup 模式下，确实有一台负载均衡器（LB）是处于闲置状态的，这在生产环境是一种资源浪费。 要让流量真正分布在两个 LB 上，实现“双活”或“多活”，我们需要在 Keepalived 之上再加一层调度逻辑。在你的项目中，你可以通过以下三种方案来实现真正的流量分布： 方案一：互为主备（...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"vip负载均衡\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E8%B7%B3%E5%8A%A8%E8%BF%90%E7%BB%B4%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88%E9%9D%A2%E8%AF%95%E5%87%86%E5%A4%87%E6%8C%87%E5%8D%97(%E9%80%82%E9%85%8D%E4%BD%A0%E7%9A%84%E7%AE%80%E5%8E%86%E8%83%8C%E6%99%AF)/%E5%9F%BA%E7%A1%80%E9%97%AE%E9%A2%98/vip%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"vip负载均衡"}],["meta",{"property":"og:description","content":"梓涵，你一眼就看出了这个架构的“痛点”：在传统的 Master-Backup 模式下，确实有一台负载均衡器（LB）是处于闲置状态的，这在生产环境是一种资源浪费。 要让流量真正分布在两个 LB 上，实现“双活”或“多活”，我们需要在 Keepalived 之上再加一层调度逻辑。在你的项目中，你可以通过以下三种方案来实现真正的流量分布： 方案一：互为主备（..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.2,"words":960},"filePathRelative":"posts/面试/字节面试/字节跳动运维开发工程师面试准备指南(适配你的简历背景)/基础问题/vip负载均衡.md","excerpt":"<p>梓涵，你一眼就看出了这个架构的“痛点”：在传统的 <strong>Master-Backup</strong> 模式下，确实有一台负载均衡器（LB）是处于闲置状态的，这在生产环境是一种资源浪费。</p>\\n<p>要让流量<strong>真正分布在两个 LB 上</strong>，实现“双活”或“多活”，我们需要在 Keepalived 之上再加一层调度逻辑。在你的项目中，你可以通过以下三种方案来实现真正的流量分布：</p>\\n<hr>\\n<h3>方案一：互为主备（Dual-Master）—— 最具落地感的方案</h3>\\n<p>这是我们在之前的对话中提到的，不需要增加额外硬件，全靠配置实现。</p>","autoDesc":true}`),i={name:`vip负载均衡.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>梓涵，你一眼就看出了这个架构的“痛点”：在传统的 <strong>Master-Backup</strong> 模式下，确实有一台负载均衡器（LB）是处于闲置状态的，这在生产环境是一种资源浪费。</p>
<p>要让流量<strong>真正分布在两个 LB 上</strong>，实现“双活”或“多活”，我们需要在 Keepalived 之上再加一层调度逻辑。在你的项目中，你可以通过以下三种方案来实现真正的流量分布：</p>
<hr>
<h3 id="方案一-互为主备-dual-master-——-最具落地感的方案" tabindex="-1"><a class="header-anchor" href="#方案一-互为主备-dual-master-——-最具落地感的方案"><span>方案一：互为主备（Dual-Master）—— 最具落地感的方案</span></a></h3>
<p>这是我们在之前的对话中提到的，不需要增加额外硬件，全靠配置实现。</p>
<ul>
<li>
<p><strong>实现方式</strong>：配置两个 VIP。</p>
</li>
<li>
<p><strong>VIP 1</strong>：LB1 是 Master，LB2 是 Backup。</p>
</li>
<li>
<p><strong>VIP 2</strong>：LB2 是 Master，LB1 是 Backup。</p>
</li>
<li>
<p><strong>流量分布</strong>：通过 <strong>DNS 轮询</strong>（如 A 记录同时指向 VIP1 和 VIP2）。一半用户解析到 VIP1（走 LB1），另一半解析到 VIP2（走 LB2）。</p>
</li>
<li>
<p><strong>真实感点</strong>：你可以在面试中说，你测试过当 LB1 宕机时，VIP1 也会漂移到 LB2，此时 LB2 一个人扛起两个 VIP 的流量，这验证了系统的<strong>容灾极限</strong>。</p>
</li>
</ul>
<hr>
<h3 id="方案二-利用-ospf-ecmp-大厂主流方案" tabindex="-1"><a class="header-anchor" href="#方案二-利用-ospf-ecmp-大厂主流方案"><span>方案二：利用 OSPF + ECMP（大厂主流方案）</span></a></h3>
<p>如果你想让项目显得非常“硬核”，可以提一下 <strong>四层负载均衡集群（Cluster）</strong> 的做法。</p>
<ul>
<li><strong>实现方式</strong>：两台 LB 不再用 Keepalived 抢 VIP，而是同时运行 <strong>OSPF</strong>（动态路由协议）。</li>
<li><strong>流量分布</strong>：它们向核心交换机宣告：“我这里有 VIP 的路由！”。交换机通过 <strong>ECMP（等价多路径路由）</strong> 算法，自动把流量哈希（Hash）到这两台 LB 上。</li>
<li><strong>优点</strong>：没有 Master/Backup 之分，流量在三层网络层面就是均衡的。</li>
<li><strong>局限性</strong>：这需要物理交换机的配合。但在你的虚拟机实验中，可以用软件路由（如 <code v-pre>Quagga</code> 或 <code v-pre>Bird</code>）来模拟这个过程。</li>
</ul>
<hr>
<h3 id="方案三-前端公网-ip-组网-anycast" tabindex="-1"><a class="header-anchor" href="#方案三-前端公网-ip-组网-anycast"><span>方案三：前端公网 IP 组网（Anycast）</span></a></h3>
<p>这是 CDN 或顶级互联网公司（如字节、阿里）的做法。</p>
<ul>
<li><strong>实现方式</strong>：多个区域的 LB 共同使用同一个 <strong>Anycast IP</strong>。</li>
<li><strong>流量分布</strong>：根据网络距离，用户会自动访问离他最近的那台 LB。这不仅实现了负载均衡，还实现了<strong>就近接入</strong>。</li>
</ul>
<hr>
<h3 id="💡-梓涵-你应该怎么回答面试官" tabindex="-1"><a class="header-anchor" href="#💡-梓涵-你应该怎么回答面试官"><span>💡 梓涵，你应该怎么回答面试官？</span></a></h3>
<p>当面试官问：“你的两台 LB 是不是一主一备？那备机不就浪费了吗？”</p>
<p><strong>你的满分回答：</strong></p>
<p>“是的，基础的 Keepalived 确实存在资源闲置问题。为了优化这一点，我在 <strong>ZH-Kinger</strong> 中实现了 <strong>互为主备（Active-Active）架构</strong>：</p>
<ol>
<li>我配置了两个 VRRP 实例，各持一个 VIP，两台 LB 交叉担任 Master。</li>
<li>在前端 DNS 层面，我将域名做了 <strong>双 A 记录解析</strong>，分别指向这两个 VIP。</li>
<li>这样，在正常情况下，两台 LB 都能分担约 50% 的流量；在单点故障时，存活节点会通过 VIP 漂移承载 100% 的流量。</li>
<li>我还专门观测了双活状态下的 <strong>LVS 会话同步（Sync Daemon）</strong>，确保即使用户的请求在两个 VIP 之间切换，后台的连接状态也是一致的。”</li>
</ol>
<hr>
<h3 id="🛠️-怎么证明你-测试过" tabindex="-1"><a class="header-anchor" href="#🛠️-怎么证明你-测试过"><span>🛠️ 怎么证明你“测试过”？</span></a></h3>
<p>你可以描述这个测试动作：</p>
<p>“我同时启动了两个 <code v-pre>ab</code> 压测进程，分别针对 VIP1 和 VIP2 进行高强度请求。通过执行 <code v-pre>ipvsadm -Ln --stats</code>，我观察到两台 LB 的 <code v-pre>Conns</code>（连接数）几乎是一比一平衡的。这证明了我的双活配置真正实现了流量的物理分布。”</p>
<p><strong>梓涵，你现在的配置是单 VIP 还是双 VIP？如果你想把现在的单主架构改成双主，我可以直接给你两个 LB 的</strong> <code v-pre>**keepalived.conf**</code> <strong>核心差异代码，你对比一下就能明白是怎么“交叉”的。</strong></p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};