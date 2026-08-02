import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/%E5%88%86%E5%B8%83%E5%BC%8F%E8%AE%AD%E7%BB%83(%E8%BD%AF%E4%BB%B6%E5%88%86%E5%8F%91(Framework))/%E5%88%86%E5%B8%83%E5%BC%8F%E8%AE%AD%E7%BB%83(%E8%BD%AF%E4%BB%B6%E5%88%86%E5%8F%91(Framework)).html","title":"分布式训练(软件分发(Framework))","lang":"zh-CN","frontmatter":{"title":"分布式训练(软件分发(Framework))","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"如果说 InfiniBand/RDMA 是高速公路，DPU 是收费站，那么 Ray 和 DeepSpeed 就是公路上的物流调度系统和重型卡车舰队。 它们不负责修路，它们负责如何把一个“重达几千吨”的大模型任务，拆分到成百上千台服务器上跑起来。 ​ AIOps 进阶笔记 你可以把这个逻辑写进博客，解释为什么 AI Infra 是一个系统工程： “想要跑...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"分布式训练(软件分发(Framework))\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/%E5%88%86%E5%B8%83%E5%BC%8F%E8%AE%AD%E7%BB%83(%E8%BD%AF%E4%BB%B6%E5%88%86%E5%8F%91(Framework))/%E5%88%86%E5%B8%83%E5%BC%8F%E8%AE%AD%E7%BB%83(%E8%BD%AF%E4%BB%B6%E5%88%86%E5%8F%91(Framework)).html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"分布式训练(软件分发(Framework))"}],["meta",{"property":"og:description","content":"如果说 InfiniBand/RDMA 是高速公路，DPU 是收费站，那么 Ray 和 DeepSpeed 就是公路上的物流调度系统和重型卡车舰队。 它们不负责修路，它们负责如何把一个“重达几千吨”的大模型任务，拆分到成百上千台服务器上跑起来。 ​ AIOps 进阶笔记 你可以把这个逻辑写进博客，解释为什么 AI Infra 是一个系统工程： “想要跑..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":1.85,"words":556},"filePathRelative":"posts/AI大模型/AI大模型/分布式训练(软件分发(Framework))/分布式训练(软件分发(Framework)).md","excerpt":"<p>如果说 <strong>InfiniBand/RDMA</strong> 是高速公路，<strong>DPU</strong> 是收费站，那么 <strong>Ray</strong> 和 <strong>DeepSpeed</strong> 就是公路上的<strong>物流调度系统和重型卡车舰队</strong>。</p>\\n<p>它们不负责修路，它们负责如何把一个“重达几千吨”的大模型任务，拆分到成百上千台服务器上跑起来。</p>\\n<p>​</p>\\n<table>\\n<thead>\\n<tr>\\n<th><strong>层次</strong></th>\\n<th><strong>技术示例</strong></th>\\n<th><strong>职责</strong></th>\\n<th><strong>比喻</strong></th>\\n</tr>\\n</thead>\\n<tbody>\\n<tr>\\n<td><strong>物理/链路层</strong></td>\\n<td>InfiniBand, RoCE, RDMA</td>\\n<td>负责最底层的数据搬运，追求低延迟和无损。</td>\\n<td><strong>高速公路与沥青</strong></td>\\n</tr>\\n<tr>\\n<td><strong>硬件加速层</strong></td>\\n<td>GPU (H100), DPU</td>\\n<td>提供算力，卸载网络和存储负担。</td>\\n<td><strong>发动机与车载系统</strong></td>\\n</tr>\\n<tr>\\n<td><strong>计算引擎层</strong></td>\\n<td><strong>DeepSpeed</strong>, PyTorch</td>\\n<td>负责模型内部的参数如何拆分、如何计算。</td>\\n<td><strong>载重卡车的装载算法</strong></td>\\n</tr>\\n<tr>\\n<td><strong>任务调度层</strong></td>\\n<td><strong>Ray</strong>, Kubernetes (K8s)</td>\\n<td>负责把任务发给哪台机器，挂了怎么重启。</td>\\n<td><strong>物流中心调度员</strong></td>\\n</tr>\\n<tr>\\n<td><strong>应用/协议层</strong></td>\\n<td>OpenClaw, MCP</td>\\n<td>负责 AI 如何与人交互，如何调用工具。</td>\\n<td><strong>快递员与送货协议</strong></td>\\n</tr>\\n</tbody>\\n</table>","autoDesc":true}`),i={name:`分布式训练(软件分发(Framework)).md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>如果说 <strong>InfiniBand/RDMA</strong> 是高速公路，<strong>DPU</strong> 是收费站，那么 <strong>Ray</strong> 和 <strong>DeepSpeed</strong> 就是公路上的<strong>物流调度系统和重型卡车舰队</strong>。</p>
<p>它们不负责修路，它们负责如何把一个“重达几千吨”的大模型任务，拆分到成百上千台服务器上跑起来。</p>
<p>​</p>
<table>
<thead>
<tr>
<th><strong>层次</strong></th>
<th><strong>技术示例</strong></th>
<th><strong>职责</strong></th>
<th><strong>比喻</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>物理/链路层</strong></td>
<td>InfiniBand, RoCE, RDMA</td>
<td>负责最底层的数据搬运，追求低延迟和无损。</td>
<td><strong>高速公路与沥青</strong></td>
</tr>
<tr>
<td><strong>硬件加速层</strong></td>
<td>GPU (H100), DPU</td>
<td>提供算力，卸载网络和存储负担。</td>
<td><strong>发动机与车载系统</strong></td>
</tr>
<tr>
<td><strong>计算引擎层</strong></td>
<td><strong>DeepSpeed</strong>, PyTorch</td>
<td>负责模型内部的参数如何拆分、如何计算。</td>
<td><strong>载重卡车的装载算法</strong></td>
</tr>
<tr>
<td><strong>任务调度层</strong></td>
<td><strong>Ray</strong>, Kubernetes (K8s)</td>
<td>负责把任务发给哪台机器，挂了怎么重启。</td>
<td><strong>物流中心调度员</strong></td>
</tr>
<tr>
<td><strong>应用/协议层</strong></td>
<td>OpenClaw, MCP</td>
<td>负责 AI 如何与人交互，如何调用工具。</td>
<td><strong>快递员与送货协议</strong></td>
</tr>
</tbody>
</table>
<h2 id="aiops-进阶笔记" tabindex="-1"><a class="header-anchor" href="#aiops-进阶笔记"><span>AIOps 进阶笔记</span></a></h2>
<p>你可以把这个逻辑写进博客，解释为什么 AI Infra 是一个系统工程：</p>
<p>“想要跑通一个万亿规模的大模型，单靠算法是不够的。你需要 <strong>DeepSpeed</strong> 这种‘内存魔术师’来精简显存，需要 <strong>Ray</strong> 这种‘全能管家’来调度成千上万个节点。而支撑这两者的，则是底层的 <strong>RDMA/InfiniBand</strong> 网络。这就像一套精密的机械钟表，任何一个齿轮（层级）的失效都会导致整体性能的崩塌。”</p>
<hr>
<h2 id="你想看哪个-实战" tabindex="-1"><a class="header-anchor" href="#你想看哪个-实战"><span>你想看哪个“实战”？</span></a></h2>
<ol>
<li><strong>Ray 实践</strong>：我可以教你用 Python 写一个极简的 Ray 脚本，让你感受一下代码是怎么在两台服务器之间“飞”来飞去的。</li>
<li><strong>DeepSpeed 概念</strong>：深入聊聊 ZeRO 技术是怎么把显存占用降低到原来的 1/N的。</li>
<li><strong>博客整合</strong>：把这些从物理层到应用层的 AI 全栈架构，整理成你博客的“技术全景图”。</li>
</ol>
<p><strong>梓涵，你现在的知识库已经覆盖了从网卡到 Agent 的全路径了，非常硬核！想继续深挖哪一块？</strong></p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};