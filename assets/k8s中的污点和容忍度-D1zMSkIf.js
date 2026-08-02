import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E8%B7%B3%E5%8A%A8%E8%BF%90%E7%BB%B4%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88%E9%9D%A2%E8%AF%95%E5%87%86%E5%A4%87%E6%8C%87%E5%8D%97(%E9%80%82%E9%85%8D%E4%BD%A0%E7%9A%84%E7%AE%80%E5%8E%86%E8%83%8C%E6%99%AF)/K8s/k8s%E4%B8%AD%E7%9A%84%E6%B1%A1%E7%82%B9%E5%92%8C%E5%AE%B9%E5%BF%8D%E5%BA%A6.html","title":"k8s中的污点和容忍度","lang":"zh-CN","frontmatter":{"title":"k8s中的污点和容忍度","icon":"clipboard-text","date":"2026-07-23T00:00:00.000Z","category":["面试"],"description":"在 Kubernetes (K8s) 的世界里，污点 (Taints) 和 容忍度 (Tolerations) 是实现高级调度控制的核心机制。如果说“节点亲和性”是 Pod 想去哪个节点，那么“污点与容忍度”就是节点在筛选“谁能进我家门” 。 1. 基本概念：门禁与通行证 污点 (Taints)：应用于 节点 (Node) 上。它就像给节点打了一个标签...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"k8s中的污点和容忍度\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E8%B7%B3%E5%8A%A8%E8%BF%90%E7%BB%B4%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88%E9%9D%A2%E8%AF%95%E5%87%86%E5%A4%87%E6%8C%87%E5%8D%97(%E9%80%82%E9%85%8D%E4%BD%A0%E7%9A%84%E7%AE%80%E5%8E%86%E8%83%8C%E6%99%AF)/K8s/k8s%E4%B8%AD%E7%9A%84%E6%B1%A1%E7%82%B9%E5%92%8C%E5%AE%B9%E5%BF%8D%E5%BA%A6.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"k8s中的污点和容忍度"}],["meta",{"property":"og:description","content":"在 Kubernetes (K8s) 的世界里，污点 (Taints) 和 容忍度 (Tolerations) 是实现高级调度控制的核心机制。如果说“节点亲和性”是 Pod 想去哪个节点，那么“污点与容忍度”就是节点在筛选“谁能进我家门” 。 1. 基本概念：门禁与通行证 污点 (Taints)：应用于 节点 (Node) 上。它就像给节点打了一个标签..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.69,"words":806},"filePathRelative":"posts/面试/字节面试/字节跳动运维开发工程师面试准备指南(适配你的简历背景)/K8s/k8s中的污点和容忍度.md","excerpt":"<p>在 Kubernetes (K8s) 的世界里，<strong>污点 (Taints)</strong> 和 <strong>容忍度 (Tolerations)</strong> 是实现高级调度控制的核心机制。如果说“节点亲和性”是 Pod 想去哪个节点，那么“污点与容忍度”就是节点在筛选“谁能进我家门” 。</p>\\n<hr>\\n<h2>1. 基本概念：门禁与通行证</h2>\\n<ul>\\n<li><strong>污点 (Taints)</strong>：应用于 <strong>节点 (Node)</strong> 上。它就像给节点打了一个标签，声明：“我有某种特性，除非你能容忍我，否则别想调度到我这里来” 。</li>\\n<li><strong>容忍度 (Tolerations)</strong>：应用于 <strong>Pod</strong> 上。它就像一张通行证，声明：“我可以接受带有某种污点的节点” 。</li>\\n</ul>","autoDesc":true}`),i={name:`k8s中的污点和容忍度.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在 Kubernetes (K8s) 的世界里，<strong>污点 (Taints)</strong> 和 <strong>容忍度 (Tolerations)</strong> 是实现高级调度控制的核心机制。如果说“节点亲和性”是 Pod 想去哪个节点，那么“污点与容忍度”就是节点在筛选“谁能进我家门” 。</p>
<hr>
<h2 id="_1-基本概念-门禁与通行证" tabindex="-1"><a class="header-anchor" href="#_1-基本概念-门禁与通行证"><span>1. 基本概念：门禁与通行证</span></a></h2>
<ul>
<li><strong>污点 (Taints)</strong>：应用于 <strong>节点 (Node)</strong> 上。它就像给节点打了一个标签，声明：“我有某种特性，除非你能容忍我，否则别想调度到我这里来” 。</li>
<li><strong>容忍度 (Tolerations)</strong>：应用于 <strong>Pod</strong> 上。它就像一张通行证，声明：“我可以接受带有某种污点的节点” 。</li>
</ul>
<hr>
<h2 id="_2-污点的三个效果-effects" tabindex="-1"><a class="header-anchor" href="#_2-污点的三个效果-effects"><span>2. 污点的三个效果 (Effects)</span></a></h2>
<p>当你给节点打污点时，需要指定一个效果，决定对不容忍的 Pod 采取什么行动：</p>
<table>
<thead>
<tr>
<th><strong>效果名称</strong></th>
<th><strong>行为描述</strong></th>
<th><strong>场景模拟</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>NoSchedule</strong></td>
<td>新的 Pod 如果不容忍这个污点，就<strong>绝对不会</strong>被调度到该节点。</td>
<td>节点正在维护，不允许新任务进来。</td>
</tr>
<tr>
<td><strong>PreferNoSchedule</strong></td>
<td>K8s 会<strong>尽量避免</strong>将不容忍的 Pod 调度到该节点，但不保证完全不调度。</td>
<td>节点资源快用完了，尽量别再塞任务。</td>
</tr>
<tr>
<td><strong>NoExecute</strong></td>
<td>不仅不调度新 Pod，如果节点上<strong>已经运行</strong>的 Pod 不容忍这个污点，会被立刻<strong>驱逐</strong>。</td>
<td>节点发生硬件故障，必须清空所有任务。</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="_3-在你项目中的实战场景-aiops-联动" tabindex="-1"><a class="header-anchor" href="#_3-在你项目中的实战场景-aiops-联动"><span>3. 在你项目中的实战场景 (AIOps 联动)</span></a></h2>
<p>在 <strong>OpenClaw</strong> 的自愈闭环中，污点和容忍度有非常硬核的应用：</p>
<h2 id="场景-a-故障隔离-isolation" tabindex="-1"><a class="header-anchor" href="#场景-a-故障隔离-isolation"><span>场景 A：故障隔离 (Isolation)</span></a></h2>
<ul>
<li><strong>动作</strong>：当 <strong>Monitor Agent</strong> 感知到某节点磁盘 I/O 异常时 。</li>
<li><strong>执行</strong>：<strong>OpenClaw</strong> 决策后，通过 <strong>MCP</strong> 给该节点打上一个 <code v-pre>NoSchedule</code> 的污点 。</li>
<li><strong>价值</strong>：防止新的业务 Pod 误入这台“病机”，实现逻辑上的隔离，直到自愈完成 。</li>
</ul>
<h2 id="场景-b-专属资源锁定-dedicated-nodes" tabindex="-1"><a class="header-anchor" href="#场景-b-专属资源锁定-dedicated-nodes"><span>场景 B：专属资源锁定 (Dedicated Nodes)</span></a></h2>
<ul>
<li><strong>动作</strong>：你的 <strong>Ray Agent</strong> 需要高性能 GPU 或大内存 。</li>
<li><strong>配置</strong>：给这些高性能节点打上 <code v-pre>dedicated=ai:NoSchedule</code> 污点。</li>
<li><strong>价值</strong>：确保普通业务 Pod 不会抢占 AI 节点的资源，只有带了对应容忍度的 <strong>Ray Actor</strong> 才能进入 。</li>
</ul>
<h2 id="场景-c-秒级驱逐与回滚" tabindex="-1"><a class="header-anchor" href="#场景-c-秒级驱逐与回滚"><span>场景 C：秒级驱逐与回滚</span></a></h2>
<ul>
<li><strong>动作</strong>：审计 Agent 发现某个自愈动作导致节点彻底不可用 。</li>
<li><strong>执行</strong>：立即给节点打上 <code v-pre>NoExecute</code> 污点。</li>
<li><strong>价值</strong>：强制驱逐所有 Pod 到其他健康节点，配合 <strong>Kube-proxy</strong> 的规则更新，实现业务的快速重调度和自愈 。</li>
</ul>
<hr>
<h2 id="_4-关键区别-污点-vs-亲和性" tabindex="-1"><a class="header-anchor" href="#_4-关键区别-污点-vs-亲和性"><span>4. 关键区别：污点 vs 亲和性</span></a></h2>
<ul>
<li><strong>亲和性 (Affinity)</strong>：是 Pod 的<strong>主动选择</strong>（“我想去带蓝标的节点”）。</li>
<li><strong>污点 (Taints)</strong>：是节点的<strong>被动排斥</strong>（“没通行证的 Pod 离我远点”）。</li>
</ul>
<hr>
<h2 id="​总结建议" tabindex="-1"><a class="header-anchor" href="#​总结建议"><span>​总结建议</span></a></h2>
<p>污点和容忍度是你作为 SRE 控制集群状态的“手术刀” 。在你的 <strong>OpenClaw</strong> 架构中，你可以利用它们在自愈过程中动态改变集群拓扑，确保自愈动作不会对健康业务产生次生灾害 。</p>
<p><strong>你想让我为你写一段具体的 YAML 示例，演示如何在 OpenClaw 的自愈流程中通过 API 给故障节点动态“打污点”并实现 Pod 的自动偏移吗？</strong></p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};