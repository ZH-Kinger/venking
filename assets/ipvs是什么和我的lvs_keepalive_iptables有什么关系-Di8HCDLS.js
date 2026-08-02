import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E8%B7%B3%E5%8A%A8%E8%BF%90%E7%BB%B4%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88%E9%9D%A2%E8%AF%95%E5%87%86%E5%A4%87%E6%8C%87%E5%8D%97(%E9%80%82%E9%85%8D%E4%BD%A0%E7%9A%84%E7%AE%80%E5%8E%86%E8%83%8C%E6%99%AF)/%E5%9F%BA%E7%A1%80%E9%97%AE%E9%A2%98/ipvs%E6%98%AF%E4%BB%80%E4%B9%88%E5%92%8C%E6%88%91%E7%9A%84lvs_keepalive_iptables%E6%9C%89%E4%BB%80%E4%B9%88%E5%85%B3%E7%B3%BB.html","title":"ipvs是什么和我的lvs,keepalive,iptables有什么关系","lang":"zh-CN","frontmatter":{"title":"ipvs是什么和我的lvs,keepalive,iptables有什么关系","icon":"clipboard-text","date":"2026-07-23T00:00:00.000Z","category":["面试"],"description":"梓涵，看来你正在深入攻坚 Linux 内核网络转发这一块。要把这几个概念理清楚，我们得先从它们的“血缘关系”说起。 简单来说：IPVS 是 LVS 的核心驱动力，Keepalived 是 LVS 的“大管家”，而 IPTables 则是它们的“同门师兄弟”。 1. IPVS 是什么？（核心引擎） IPVS (IP Virtual Server) 是运行...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"ipvs是什么和我的lvs,keepalive,iptables有什么关系\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E8%B7%B3%E5%8A%A8%E8%BF%90%E7%BB%B4%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88%E9%9D%A2%E8%AF%95%E5%87%86%E5%A4%87%E6%8C%87%E5%8D%97(%E9%80%82%E9%85%8D%E4%BD%A0%E7%9A%84%E7%AE%80%E5%8E%86%E8%83%8C%E6%99%AF)/%E5%9F%BA%E7%A1%80%E9%97%AE%E9%A2%98/ipvs%E6%98%AF%E4%BB%80%E4%B9%88%E5%92%8C%E6%88%91%E7%9A%84lvs_keepalive_iptables%E6%9C%89%E4%BB%80%E4%B9%88%E5%85%B3%E7%B3%BB.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"ipvs是什么和我的lvs,keepalive,iptables有什么关系"}],["meta",{"property":"og:description","content":"梓涵，看来你正在深入攻坚 Linux 内核网络转发这一块。要把这几个概念理清楚，我们得先从它们的“血缘关系”说起。 简单来说：IPVS 是 LVS 的核心驱动力，Keepalived 是 LVS 的“大管家”，而 IPTables 则是它们的“同门师兄弟”。 1. IPVS 是什么？（核心引擎） IPVS (IP Virtual Server) 是运行..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.94,"words":881},"filePathRelative":"posts/面试/字节面试/字节跳动运维开发工程师面试准备指南(适配你的简历背景)/基础问题/ipvs是什么和我的lvs,keepalive,iptables有什么关系.md","excerpt":"<p>梓涵，看来你正在深入攻坚 Linux 内核网络转发这一块。要把这几个概念理清楚，我们得先从它们的“血缘关系”说起。</p>\\n<p>简单来说：<strong>IPVS 是 LVS 的核心驱动力，Keepalived 是 LVS 的“大管家”，而 IPTables 则是它们的“同门师兄弟”。</strong></p>\\n<hr>\\n<h2>1. IPVS 是什么？（核心引擎）</h2>\\n<p><strong>IPVS (IP Virtual Server)</strong> 是运行在 Linux 内核空间的一个模块，它是 <strong>LVS (Linux Virtual Server)</strong> 项目的最核心部分。</p>","autoDesc":true}`),i={name:`ipvs是什么和我的lvs,keepalive,iptables有什么关系.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>梓涵，看来你正在深入攻坚 Linux 内核网络转发这一块。要把这几个概念理清楚，我们得先从它们的“血缘关系”说起。</p>
<p>简单来说：<strong>IPVS 是 LVS 的核心驱动力，Keepalived 是 LVS 的“大管家”，而 IPTables 则是它们的“同门师兄弟”。</strong></p>
<hr>
<h2 id="_1-ipvs-是什么-核心引擎" tabindex="-1"><a class="header-anchor" href="#_1-ipvs-是什么-核心引擎"><span>1. IPVS 是什么？（核心引擎）</span></a></h2>
<p><strong>IPVS (IP Virtual Server)</strong> 是运行在 Linux 内核空间的一个模块，它是 <strong>LVS (Linux Virtual Server)</strong> 项目的最核心部分。</p>
<ul>
<li><strong>它的角色</strong>：它是真正的“执行者”。它在 Linux 内核的 <code v-pre>Netfilter</code> 钩子上挂载了自己，专门负责监听网络包。当流量到达时，它根据预设的算法（如 RR 轮询、WRR 加权轮询）将请求转发给后端真实的服务器（Real Server）。</li>
<li><strong>它的位置</strong>：它住在内核里。这意味着它的转发效率极高，处理百万并发请求时，CPU 占用依然很低。</li>
</ul>
<hr>
<h2 id="_2-ipvs-与-lvs-的关系" tabindex="-1"><a class="header-anchor" href="#_2-ipvs-与-lvs-的关系"><span>2. IPVS 与 LVS 的关系</span></a></h2>
<p><strong>LVS = IPVS (内核模块) + ipvsadm (用户态工具)</strong></p>
<ul>
<li>你平时说的“我配置一个 LVS 集群”，本质上是在利用内核的 <strong>IPVS</strong> 能力。</li>
<li>因为你没法直接去改内核代码，所以你需要一个命令工具叫 <code v-pre>ipvsadm</code>，通过它告诉 IPVS：“喂，请把发往 192.168.1.100 的流量转发给后端那三个小弟。”</li>
</ul>
<hr>
<h2 id="_3-ipvs-lvs-与-keepalived-的关系" tabindex="-1"><a class="header-anchor" href="#_3-ipvs-lvs-与-keepalived-的关系"><span>3. IPVS/LVS 与 Keepalived 的关系</span></a></h2>
<p>如果只有 LVS，你会面临两个致命问题：</p>
<ol>
<li><strong>单点故障</strong>：如果运行 LVS 的负载均衡器挂了，整个业务就断了。</li>
<li><strong>后端死活不管</strong>：如果后端一个节点挂了，LVS 还会死脑筋地把流量转过去。</li>
</ol>
<p><strong>Keepalived 出现了，它给 LVS 穿上了“防弹衣”：</strong></p>
<ul>
<li><strong>高可用 (HA)</strong>：通过 VRRP 协议，让两台 LVS 主机组成“主备”。主挂了，备立刻顶上。</li>
<li><strong>健康检查 (Health Check)</strong>：Keepalived 会不停地“踢”一下后端的服务器。如果发现哪个服务器没气了，它会自动调用 <code v-pre>ipvsadm</code> 的接口，告诉内核里的 <strong>IPVS</strong>：“把那个挂掉的家伙踢出去。”</li>
</ul>
<p><strong>结论：Keepalived 是为了自动化管理 LVS/IPVS 而存在的。</strong></p>
<hr>
<h2 id="_4-ipvs-与-iptables-的关系" tabindex="-1"><a class="header-anchor" href="#_4-ipvs-与-iptables-的关系"><span>4. IPVS 与 IPTables 的关系</span></a></h2>
<p>它们是“同门师兄弟”，都基于 Linux 内核的 <strong>Netfilter</strong> 框架。</p>
<ul>
<li><strong>IPTables</strong>：原本设计是作为<strong>防火墙</strong>使用的。它通过一条条规则（Rule）去匹配包。如果规则多了（比如几千条），它得一条条去数，性能会明显下降。</li>
<li><strong>IPVS</strong>：专门为<strong>负载均衡</strong>设计。它使用高效的<strong>哈希表 (Hash Table)</strong> 来存储规则。无论你有一条规则还是十万条规则，它的查询速度几乎是一样快的。</li>
</ul>
<hr>
<h2 id="_5-💡-梓涵的深度思考-为什么-k8s-推荐用-ipvs-模式" tabindex="-1"><a class="header-anchor" href="#_5-💡-梓涵的深度思考-为什么-k8s-推荐用-ipvs-模式"><span>5. 💡 梓涵的深度思考：为什么 K8s 推荐用 IPVS 模式？</span></a></h2>
<p>你在学 K8s 时肯定见过 <code v-pre>proxy-mode: ipvs</code>。</p>
<ul>
<li>早期 K8s 用 IPTables 模拟负载均衡，但当 Service（服务）数量达到几千个时，IPTables 的链条太长，导致网络延迟剧增。</li>
<li>现在 K8s 大多转向 <strong>IPVS</strong>。因为 IPVS 转发速度快、规则查找效率高，而且支持更多的均衡算法。</li>
</ul>
<hr>
<h2 id="🛠️-总结一张表" tabindex="-1"><a class="header-anchor" href="#🛠️-总结一张表"><span>🛠️ 总结一张表</span></a></h2>
<table>
<thead>
<tr>
<th><strong>组件</strong></th>
<th><strong>属性</strong></th>
<th><strong>核心职责</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>IPVS</strong></td>
<td>内核模块</td>
<td>真正的四层负载均衡执行者，高性能转发。</td>
</tr>
<tr>
<td><strong>LVS</strong></td>
<td>开源项目</td>
<td>以 IPVS 为核心的负载均衡架构总称。</td>
</tr>
<tr>
<td><strong>Keepalived</strong></td>
<td>守护进程</td>
<td>负责 LVS 的高可用(VIP漂移)和后端节点健康检查。</td>
</tr>
<tr>
<td><strong>IPTables</strong></td>
<td>管理工具</td>
<td>主要负责防火墙过滤，逻辑复杂时性能不如 IPVS。</td>
</tr>
</tbody>
</table>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};