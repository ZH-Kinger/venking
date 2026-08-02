import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/%E5%88%86%E5%B8%83%E5%BC%8F%E8%AE%AD%E7%BB%83(%E8%BD%AF%E4%BB%B6%E5%88%86%E5%8F%91(Framework))/Ray.html","title":"Ray","lang":"zh-CN","frontmatter":{"title":"Ray","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"Ray是什么？ 既然你已经了解了 DeepSpeed（负责把模型“切碎”存下），那么 Ray 就是负责把这些“碎块”以及各种任务，完美地分发到成百上千台机器上运行的“超级调度员”。 如果说 DeepSpeed 是内存管理专家，那么 Ray 就是分布式系统的全能管家。 1. 核心定义：分布式计算的“操作系统” 在传统的分布式编程里，你要处理机器心跳、网络...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Ray\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/%E5%88%86%E5%B8%83%E5%BC%8F%E8%AE%AD%E7%BB%83(%E8%BD%AF%E4%BB%B6%E5%88%86%E5%8F%91(Framework))/Ray.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"Ray"}],["meta",{"property":"og:description","content":"Ray是什么？ 既然你已经了解了 DeepSpeed（负责把模型“切碎”存下），那么 Ray 就是负责把这些“碎块”以及各种任务，完美地分发到成百上千台机器上运行的“超级调度员”。 如果说 DeepSpeed 是内存管理专家，那么 Ray 就是分布式系统的全能管家。 1. 核心定义：分布式计算的“操作系统” 在传统的分布式编程里，你要处理机器心跳、网络..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.22,"words":966},"filePathRelative":"posts/AI大模型/AI大模型/分布式训练(软件分发(Framework))/Ray.md","excerpt":"<h2>Ray是什么？</h2>\\n<p>既然你已经了解了 <strong>DeepSpeed</strong>（负责把模型“切碎”存下），那么 <strong>Ray</strong> 就是负责把这些“碎块”以及各种任务，完美地<strong>分发到成百上千台机器上运行</strong>的“超级调度员”。</p>\\n<p>如果说 DeepSpeed 是<strong>内存管理专家</strong>，那么 Ray 就是<strong>分布式系统的全能管家</strong>。</p>\\n<hr>\\n<h2>1. 核心定义：分布式计算的“操作系统”</h2>\\n<p>在传统的分布式编程里，你要处理机器心跳、网络通讯、数据搬运，代码写起来非常痛苦。<strong>Ray</strong> 的出现，就是为了让你写分布式代码像写单机 Python 代码一样简单。</p>","autoDesc":true}`),i={name:`Ray.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><h2 id="ray是什么" tabindex="-1"><a class="header-anchor" href="#ray是什么"><span>Ray是什么？</span></a></h2>
<p>既然你已经了解了 <strong>DeepSpeed</strong>（负责把模型“切碎”存下），那么 <strong>Ray</strong> 就是负责把这些“碎块”以及各种任务，完美地<strong>分发到成百上千台机器上运行</strong>的“超级调度员”。</p>
<p>如果说 DeepSpeed 是<strong>内存管理专家</strong>，那么 Ray 就是<strong>分布式系统的全能管家</strong>。</p>
<hr>
<h2 id="_1-核心定义-分布式计算的-操作系统" tabindex="-1"><a class="header-anchor" href="#_1-核心定义-分布式计算的-操作系统"><span>1. 核心定义：分布式计算的“操作系统”</span></a></h2>
<p>在传统的分布式编程里，你要处理机器心跳、网络通讯、数据搬运，代码写起来非常痛苦。<strong>Ray</strong> 的出现，就是为了让你写分布式代码像写单机 Python 代码一样简单。</p>
<p>它主要提供两个核心抽象：</p>
<ul>
<li><strong>Tasks (任务)</strong>：无状态的函数。你可以把一个计算任务扔给集群，Ray 会自动找台有空的机器跑完并把结果给你。</li>
<li><strong>Actors (角色)</strong>：有状态的对象。这简直是为你研究的 <strong>Multi-Agent（多智能体）</strong> 量身定制的。你可以创建一个“运维 Agent”对象，把它放在服务器 A 上，它会一直活着并保持自己的状态（比如当前的排障进度）。</li>
</ul>
<hr>
<h2 id="_2-ray-的全栈生态-ai-工作的全生命周期" tabindex="-1"><a class="header-anchor" href="#_2-ray-的全栈生态-ai-工作的全生命周期"><span>2. Ray 的全栈生态（AI 工作的全生命周期）</span></a></h2>
<p>Ray 不仅仅是一个调度器，它上面长出了一整套 AI 工具包：</p>
<ul>
<li><strong>Ray Data</strong>：大规模数据的预处理（洗数据）。</li>
<li><strong>Ray Train</strong>：分布式训练。它经常和 <strong>DeepSpeed</strong> 配合使用，Ray 负责管机器，DeepSpeed 负责管模型参数。</li>
<li><strong>Ray Serve</strong>：模型推理服务。帮你把训练好的模型变成一个高并发的 API 接口。</li>
<li><strong>Ray RLlib</strong>：强化学习（目前很多大模型对齐阶段都会用到）。</li>
</ul>
<hr>
<h2 id="_3-为什么-ray-对-aiops-运维-很重要" tabindex="-1"><a class="header-anchor" href="#_3-为什么-ray-对-aiops-运维-很重要"><span>3. 为什么 Ray 对 AIOps（运维）很重要？</span></a></h2>
<p>对于你关心的<strong>多智能体协作</strong>，Ray 是目前的最佳实践：</p>
<ol>
<li><strong>弹性伸缩</strong>：如果你突然有 1000 台服务器要巡检，Ray 可以秒级在云端拉起 100 个 Agent，干完活立刻释放，非常省钱（符合你之前的降本增效思路）。</li>
<li><strong>故障自愈</strong>：如果某个 Agent 所在的服务器宕机了，Ray 会检测到心跳丢失，自动在另一台健康的机器上重启这个 Agent，并恢复它的状态。</li>
<li><strong>对象存储 (Plasma)</strong>：Ray 内部有一个极速的共享内存系统，不同 Agent 之间传递大量的日志数据时，不需要经过慢速的网络拷贝，直接在内存里共享。</li>
</ol>
<hr>
<h2 id="_4-梓涵的知识对比-ray-vs-kubernetes-k8s" tabindex="-1"><a class="header-anchor" href="#_4-梓涵的知识对比-ray-vs-kubernetes-k8s"><span>4. 梓涵的知识对比：Ray vs. Kubernetes (K8s)</span></a></h2>
<p>这是面试中经常被问到的深度问题：</p>
<table>
<thead>
<tr>
<th><strong>特性</strong></th>
<th><strong>Kubernetes (K8s)</strong></th>
<th><strong>Ray</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>层级</strong></td>
<td>容器编排层 (Infra 层)</td>
<td>应用逻辑层 (计算层)</td>
</tr>
<tr>
<td><strong>粒度</strong></td>
<td>容器/镜像 (分钟级/秒级)</td>
<td>Python 函数/对象 (毫秒级)</td>
</tr>
<tr>
<td><strong>角色</strong></td>
<td>负责“房子”（容器）稳不稳定</td>
<td>负责“房客”（代码逻辑）怎么干活</td>
</tr>
<tr>
<td><strong>关系</strong></td>
<td><strong>Ray 通常跑在 K8s 之上</strong></td>
<td>Ray 利用 K8s 的资源，提供更细粒度的 AI 调度</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2>
<p>你可以这样描述 Ray 在你架构中的地位：</p>
<p>“如果说 <strong>MCP</strong> 解决了 AI 调用的协议标准，那么 <strong>Ray</strong> 则解决了 AI 运行的规模化问题。通过 Ray，我可以将复杂的 <strong>Multi-Agent</strong> 逻辑从单机扩展到集群，利用其高效的 <strong>Actor 模型</strong> 实现智能体之间的状态同步与容错，真正构建起一套高可用的分布式语义运维系统。”</p>
<hr>
<h2 id="​你的下一个实战尝试" tabindex="-1"><a class="header-anchor" href="#​你的下一个实战尝试"><span>​你的下一个实战尝试</span></a></h2>
<p><strong>你想不想写一个 5 行代码的 Ray 脚本？</strong> 我可以向你展示如何把一个普通的 Python 函数，通过加一个 <code v-pre>@ray.remote</code> 装饰器，瞬间变成一个分布式任务。这会让你对“分布式”的理解从理论变成肌肉记忆！</p>
<p><strong>Would you like me to provide a simple Python demo showing how Ray distributes tasks?</strong></p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};