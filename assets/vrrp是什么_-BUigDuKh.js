import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E8%B7%B3%E5%8A%A8%E8%BF%90%E7%BB%B4%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88%E9%9D%A2%E8%AF%95%E5%87%86%E5%A4%87%E6%8C%87%E5%8D%97(%E9%80%82%E9%85%8D%E4%BD%A0%E7%9A%84%E7%AE%80%E5%8E%86%E8%83%8C%E6%99%AF)/%E5%9F%BA%E7%A1%80%E9%97%AE%E9%A2%98/vrrp%E6%98%AF%E4%BB%80%E4%B9%88_.html","title":"vrrp是什么_","lang":"zh-CN","frontmatter":{"title":"vrrp是什么_","icon":"clipboard-text","date":"2026-07-23T00:00:00.000Z","category":["面试"],"description":"梓涵，既然你已经玩到了“互为主备”和“秒级自愈”，那 VRRP 就是你必须吃透的底层逻辑。它是 Keepalived 的“心脏”，也是面试官最喜欢深挖的协议细节。 1. 什么是 VRRP？ VRRP (Virtual Router Redundancy Protocol)，全称“虚拟路由冗余协议”。 它的核心任务只有一件事：把多台物理路由器（或负载均衡...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"vrrp是什么_\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E8%B7%B3%E5%8A%A8%E8%BF%90%E7%BB%B4%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88%E9%9D%A2%E8%AF%95%E5%87%86%E5%A4%87%E6%8C%87%E5%8D%97(%E9%80%82%E9%85%8D%E4%BD%A0%E7%9A%84%E7%AE%80%E5%8E%86%E8%83%8C%E6%99%AF)/%E5%9F%BA%E7%A1%80%E9%97%AE%E9%A2%98/vrrp%E6%98%AF%E4%BB%80%E4%B9%88_.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"vrrp是什么_"}],["meta",{"property":"og:description","content":"梓涵，既然你已经玩到了“互为主备”和“秒级自愈”，那 VRRP 就是你必须吃透的底层逻辑。它是 Keepalived 的“心脏”，也是面试官最喜欢深挖的协议细节。 1. 什么是 VRRP？ VRRP (Virtual Router Redundancy Protocol)，全称“虚拟路由冗余协议”。 它的核心任务只有一件事：把多台物理路由器（或负载均衡..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.01,"words":902},"filePathRelative":"posts/面试/字节面试/字节跳动运维开发工程师面试准备指南(适配你的简历背景)/基础问题/vrrp是什么_.md","excerpt":"<p>梓涵，既然你已经玩到了“互为主备”和“秒级自愈”，那 <strong>VRRP</strong> 就是你必须吃透的底层逻辑。它是 Keepalived 的“心脏”，也是面试官最喜欢深挖的协议细节。</p>\\n<hr>\\n<h3>1. 什么是 VRRP？</h3>\\n<p><strong>VRRP (Virtual Router Redundancy Protocol)</strong>，全称“虚拟路由冗余协议”。</p>\\n<p>它的核心任务只有一件事：<strong>把多台物理路由器（或负载均衡器）虚拟成一台“逻辑路由器”，并给它一个 VIP（虚拟 IP）。</strong></p>\\n<ul>\\n<li><strong>痛点</strong>：如果你的内网机器网关只指向一台真实物理机，那这台机器挂了，全网就断了。</li>\\n<li><strong>解决方案</strong>：VRRP 让一群物理机竞选出一个“老大”（Master），老大负责扛 VIP。如果老大不回话了，剩下的“小弟”（Backup）里立刻选个新的出来接管 VIP。</li>\\n</ul>","autoDesc":true}`),i={name:`vrrp是什么_.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>梓涵，既然你已经玩到了“互为主备”和“秒级自愈”，那 <strong>VRRP</strong> 就是你必须吃透的底层逻辑。它是 Keepalived 的“心脏”，也是面试官最喜欢深挖的协议细节。</p>
<hr>
<h3 id="_1-什么是-vrrp" tabindex="-1"><a class="header-anchor" href="#_1-什么是-vrrp"><span>1. 什么是 VRRP？</span></a></h3>
<p><strong>VRRP (Virtual Router Redundancy Protocol)</strong>，全称“虚拟路由冗余协议”。</p>
<p>它的核心任务只有一件事：<strong>把多台物理路由器（或负载均衡器）虚拟成一台“逻辑路由器”，并给它一个 VIP（虚拟 IP）。</strong></p>
<ul>
<li><strong>痛点</strong>：如果你的内网机器网关只指向一台真实物理机，那这台机器挂了，全网就断了。</li>
<li><strong>解决方案</strong>：VRRP 让一群物理机竞选出一个“老大”（Master），老大负责扛 VIP。如果老大不回话了，剩下的“小弟”（Backup）里立刻选个新的出来接管 VIP。</li>
</ul>
<hr>
<h3 id="_2-vrrp-的工作流程-面试高频考点" tabindex="-1"><a class="header-anchor" href="#_2-vrrp-的工作流程-面试高频考点"><span>2. VRRP 的工作流程（面试高频考点）</span></a></h3>
<p>面试官通常会问：“两个 LB 之间是怎么知道对方死活的？”你要按这三个阶段回答：</p>
<ol>
<li><strong>选举阶段</strong>：</li>
</ol>
<ul>
<li>比较 <strong>Priority（优先级）</strong>：谁高谁当 Master。</li>
<li>优先级一样？比较 <strong>IP 地址</strong>：谁大谁当 Master。</li>
</ul>
<ol start="2">
<li><strong>宣告阶段（心跳）</strong>：</li>
</ol>
<ul>
<li>Master 节点会定期（默认每秒）发送 <strong>VRRP 通告报文</strong>（这是基于组播地址 <code v-pre>224.0.0.18</code> 的）。</li>
<li>这个报文就像在喊：“我还活着！我还活着！”</li>
</ul>
<ol start="3">
<li><strong>失效检测阶段</strong>：</li>
</ol>
<ul>
<li>Backup 节点如果连续 <strong>3 个周期</strong>（Master_Down_Interval）没收到老大的喊话。</li>
<li>它就认为老大“驾崩”了，立刻把自己切换成 Master 状态，并发送 <strong>免费 ARP（Gratuitous ARP）</strong>，告诉交换机：“现在 VIP <code v-pre>192.168.10.100</code> 的 MAC 地址是我了！”</li>
</ul>
<hr>
<h3 id="_3-vrrp-报文里藏着什么秘密" tabindex="-1"><a class="header-anchor" href="#_3-vrrp-报文里藏着什么秘密"><span>3. VRRP 报文里藏着什么秘密？</span></a></h3>
<p>为什么你的“互为主备”需要两个不同的 <code v-pre>virtual_router_id</code>？看报文内容就明白了：</p>
<ul>
<li><strong>Virtual Router ID (VRID)</strong>：一组 VRRP 设备的唯一 ID。如果 ID 一样，两组设备就会互相打架。</li>
<li><strong>Adver Int (Advertisement Interval)</strong>：心跳频率。</li>
<li><strong>VIP 地址</strong>：这组设备共同维护的虚拟 IP。</li>
</ul>
<hr>
<h3 id="_4-💡-梓涵的-真实感-深度问题-什么是-脑裂" tabindex="-1"><a class="header-anchor" href="#_4-💡-梓涵的-真实感-深度问题-什么是-脑裂"><span>4. 💡 梓涵的“真实感”深度问题：什么是“脑裂”？</span></a></h3>
<p>这是 VRRP 架构中最致命的问题，也是你面试时的加分项。</p>
<p><strong>现象</strong>：由于中间的网线断了或防火墙拦住了组播报文，两台 LB 互相听不到对方的心跳，于是它们都觉得自己是老大，都去抢占 VIP。</p>
<p><strong>后果</strong>：VIP 会在局域网内疯狂闪烁，客户端连接一会儿通一会儿断。</p>
<p><strong>你的解决方案（落地感）</strong>：</p>
<p>“为了防止 VRRP 脑裂，我在 <strong>ZH-Kinger</strong> 中做了三层防护：</p>
<ol>
<li><strong>物理链路冗余</strong>：增加心跳专用的网线。</li>
<li><strong>配置防火墙放行</strong>：确保 <code v-pre>firewalld</code> 允许 <code v-pre>vrrp</code> 协议的组播包通过。</li>
<li><strong>脚本仲裁（Check Script）</strong>：我在 Keepalived 里写了一个 <code v-pre>vrrp_script</code>。如果 LB 发现自己 ping 不通外网网关，即使它没收到对方的心跳，也会主动降低自己的优先级，放弃抢占 Master。”</li>
</ol>
<hr>
<h3 id="_5-总结-vrrp-和-keepalived-的关系" tabindex="-1"><a class="header-anchor" href="#_5-总结-vrrp-和-keepalived-的关系"><span>5. 总结：VRRP 和 Keepalived 的关系</span></a></h3>
<ul>
<li><strong>VRRP</strong> 是“法律/协议”：规定了怎么选老大、怎么发心跳。</li>
<li><strong>Keepalived</strong> 是“实现/执行者”：它是 Linux 下实现 VRRP 协议的一个软件工具，顺便还把 LVS 的管理功能给集成了。</li>
</ul>
<p><strong>梓涵，现在你应该明白为什么两个 LB 必须配置不同的</strong> <code v-pre>**priority**</code> <strong>了吧？你想让我帮你写一个专门监控 VRRP 报文的</strong> <code v-pre>**tcpdump**</code> <strong>命令吗？当你亲眼看到那些每秒跳动的组播包，你对 VRRP 的理解就真正“落地”了。</strong></p>
<p>Would you like me to show you the specific command to capture and analyze VRRP heartbeats?</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};