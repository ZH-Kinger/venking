import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E8%B7%B3%E5%8A%A8%E8%BF%90%E7%BB%B4%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88%E9%9D%A2%E8%AF%95%E5%87%86%E5%A4%87%E6%8C%87%E5%8D%97(%E9%80%82%E9%85%8D%E4%BD%A0%E7%9A%84%E7%AE%80%E5%8E%86%E8%83%8C%E6%99%AF)/%E5%9F%BA%E7%A1%80%E9%97%AE%E9%A2%98/DR%E6%A8%A1%E5%BC%8F%E7%9A%84mac%E5%9C%B0%E5%9D%80%E8%BD%AC%E6%8D%A2.html","title":"DR模式的mac地址转换","lang":"zh-CN","frontmatter":{"title":"DR模式的mac地址转换","icon":"clipboard-text","date":"2026-07-23T00:00:00.000Z","category":["面试"],"description":"梓涵，你问到了 LVS DR（Direct Routing，直接路由） 模式最底层的黑科技。很多面试官会问：“既然 LVS 和后端机器（Real Server）都有同一个 VIP，包是怎么精准发到某一台机器上的？” 答案就在 二层 MAC 地址转换。 1. 核心原理：不改 IP，改 MAC 在 DR 模式下，当一个数据包到达 LVS 调度器时： IP ...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"DR模式的mac地址转换\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E8%B7%B3%E5%8A%A8%E8%BF%90%E7%BB%B4%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88%E9%9D%A2%E8%AF%95%E5%87%86%E5%A4%87%E6%8C%87%E5%8D%97(%E9%80%82%E9%85%8D%E4%BD%A0%E7%9A%84%E7%AE%80%E5%8E%86%E8%83%8C%E6%99%AF)/%E5%9F%BA%E7%A1%80%E9%97%AE%E9%A2%98/DR%E6%A8%A1%E5%BC%8F%E7%9A%84mac%E5%9C%B0%E5%9D%80%E8%BD%AC%E6%8D%A2.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"DR模式的mac地址转换"}],["meta",{"property":"og:description","content":"梓涵，你问到了 LVS DR（Direct Routing，直接路由） 模式最底层的黑科技。很多面试官会问：“既然 LVS 和后端机器（Real Server）都有同一个 VIP，包是怎么精准发到某一台机器上的？” 答案就在 二层 MAC 地址转换。 1. 核心原理：不改 IP，改 MAC 在 DR 模式下，当一个数据包到达 LVS 调度器时： IP ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.93,"words":878},"filePathRelative":"posts/面试/字节面试/字节跳动运维开发工程师面试准备指南(适配你的简历背景)/基础问题/DR模式的mac地址转换.md","excerpt":"<p>梓涵，你问到了 LVS <strong>DR（Direct Routing，直接路由）</strong> 模式最底层的黑科技。很多面试官会问：“既然 LVS 和后端机器（Real Server）都有同一个 VIP，包是怎么精准发到某一台机器上的？”</p>\\n<p>答案就在 <strong>二层 MAC 地址转换</strong>。</p>\\n<h3>1. 核心原理：不改 IP，改 MAC</h3>\\n<p>在 DR 模式下，当一个数据包到达 LVS 调度器时：</p>\\n<ul>\\n<li><strong>IP 层不变</strong>：源 IP 是客户端 IP，目的 IP 依然是 <strong>VIP</strong>。</li>\\n<li><strong>链路层（MAC）变了</strong>：LVS 根据调度算法选出一台 Real Server，然后把数据包帧头的 <strong>“目的 MAC 地址”</strong> 从自己的 MAC 改成 <strong>Real Server 的 MAC</strong>。</li>\\n</ul>","autoDesc":true}`),i={name:`DR模式的mac地址转换.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>梓涵，你问到了 LVS <strong>DR（Direct Routing，直接路由）</strong> 模式最底层的黑科技。很多面试官会问：“既然 LVS 和后端机器（Real Server）都有同一个 VIP，包是怎么精准发到某一台机器上的？”</p>
<p>答案就在 <strong>二层 MAC 地址转换</strong>。</p>
<h3 id="_1-核心原理-不改-ip-改-mac" tabindex="-1"><a class="header-anchor" href="#_1-核心原理-不改-ip-改-mac"><span>1. 核心原理：不改 IP，改 MAC</span></a></h3>
<p>在 DR 模式下，当一个数据包到达 LVS 调度器时：</p>
<ul>
<li><strong>IP 层不变</strong>：源 IP 是客户端 IP，目的 IP 依然是 <strong>VIP</strong>。</li>
<li><strong>链路层（MAC）变了</strong>：LVS 根据调度算法选出一台 Real Server，然后把数据包帧头的 <strong>“目的 MAC 地址”</strong> 从自己的 MAC 改成 <strong>Real Server 的 MAC</strong>。</li>
</ul>
<hr>
<h3 id="_2-为什么这样做-dr-模式起飞的原因" tabindex="-1"><a class="header-anchor" href="#_2-为什么这样做-dr-模式起飞的原因"><span>2. 为什么这样做？（DR 模式起飞的原因）</span></a></h3>
<ul>
<li><strong>欺骗二层交换机</strong>：包被改了 MAC 后，二层交换机就会根据 MAC 地址表，把这个包直接甩给选中的那台 Real Server。</li>
<li><strong>Real Server 认这个包</strong>：因为 Real Server 的 <code v-pre>lo</code> 网卡上也绑了 VIP，它发现目的 IP 是自己的 VIP，就高高兴兴地处理了。</li>
<li><strong>跳过 LVS 回包</strong>：这是最绝的。Real Server 处理完后，发现目的 IP 是客户端，它就直接把回包发给客户端了，不再经过 LVS。这大大减轻了 LVS 的压力（因为入站流量小，出站流量大）。</li>
</ul>
<hr>
<h3 id="_3-实现这个转换的两个-死要求" tabindex="-1"><a class="header-anchor" href="#_3-实现这个转换的两个-死要求"><span>3. 实现这个转换的两个“死要求”</span></a></h3>
<p>这就是为什么你在实验中必须配置那些复杂参数的原因：</p>
<h4 id="a-二层必须连通" tabindex="-1"><a class="header-anchor" href="#a-二层必须连通"><span>A. 二层必须连通</span></a></h4>
<p>因为 LVS 是通过 MAC 地址转发的，所以 LVS 和所有的 Real Server <strong>必须在同一个物理网段（同一个 VLAN/交换机下）</strong>。如果跨了路由器，MAC 地址就被剥掉了，DR 模式就失效了。</p>
<p><strong>简历点</strong>：这也就是你提到的“精细划分物理网段”时，为什么要把 LVS 和 Web 节点放在同一个二层域。</p>
<h4 id="b-抑制-arp-防止-抢答" tabindex="-1"><a class="header-anchor" href="#b-抑制-arp-防止-抢答"><span>B. 抑制 ARP（防止“抢答”）</span></a></h4>
<p>如果不做抑制，当交换机广播问“谁是 VIP”时，LVS 和所有的 Real Server 都会回答。</p>
<ul>
<li><strong>你的操作</strong>：修改 <code v-pre>/proc/sys/net/ipv4/conf/all/arp_ignore</code> 等参数。</li>
<li><strong>效果</strong>：让 Real Server 变成“闷葫芦”，只有 LVS 响应 VIP 的 ARP 请求。这样流量才会先到 LVS，由它改了 MAC 后再分发。</li>
</ul>
<hr>
<h3 id="_4-💡-梓涵的面试必杀技" tabindex="-1"><a class="header-anchor" href="#_4-💡-梓涵的面试必杀技"><span>4. 💡 梓涵的面试必杀技：</span></a></h3>
<p>如果面试官问：“DR 模式和 NAT 模式在地址转换上最大的区别是什么？”</p>
<p><strong>你的满分回答</strong>：</p>
<p>“NAT 模式是在三层修改 <strong>IP 地址（DNAT）</strong>，所有的回包必须经过 LVS 做 SNAT 转换，容易产生带宽瓶颈。</p>
<p>而 DR 模式是在二层修改 <strong>MAC 地址</strong>，不触动三层 IP 头部。这使得 Real Server 可以绕过 LVS 直接回包给客户端（即 <strong>DR/三角传输</strong> 路径）。</p>
<p>在我的 <strong>ZH-Kinger</strong> 压测中，正是通过这种 MAC 转换机制，配合 <strong>Nginx 的</strong> <code v-pre>**proxy_cache**</code>，实现了单台负载均衡器支撑万级 QPS 的吞吐能力。”</p>
<hr>
<h3 id="_5-🛠️-怎么验证这个-mac-转换" tabindex="-1"><a class="header-anchor" href="#_5-🛠️-怎么验证这个-mac-转换"><span>5. 🛠️ 怎么验证这个 MAC 转换？</span></a></h3>
<p>你想亲眼看看这个过程吗？在你的 LVS 节点上运行这个命令：</p>
<p><code v-pre>tcpdump -e -i eth0 port 80</code></p>
<ul>
<li><strong>关键看点</strong>：你会发现发往后端机器的包，目的 IP 没变，但前面的 <code v-pre>eth</code> 目的地址变成了后端 Web 节点的 MAC 地址。</li>
</ul>
<p><strong>梓涵，理解了 MAC 转换，你就理解了 LVS 的精髓。要不要我帮你总结一下 DR、NAT、TUNNEL 三种模式在“地址转换”上的差异对比表？这是面试官最喜欢考的填空题。</strong></p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};