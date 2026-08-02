import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92.html","title":"学习计划","lang":"zh-CN","frontmatter":{"title":"学习计划","icon":"cpu","date":"2026-07-23T00:00:00.000Z","category":["AI基础设施"],"description":"这份最完整的学习计划，将结合你目前身处算法组、拥有 GPU 实操环境的绝对优势，全面对标 JD 中“训练、推理、网络、平台、智能化”的全生命周期要求。 这份计划的设计思路是：从微观的单卡算力压榨，到宏观的多机多节点协同，最后走向以 AI 治理 AI 的自动化闭环。 image.pngimage.png 阶段一：大语言模型分布式训练底座建设（重构底层认知...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"学习计划\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92-1.png\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"学习计划"}],["meta",{"property":"og:description","content":"这份最完整的学习计划，将结合你目前身处算法组、拥有 GPU 实操环境的绝对优势，全面对标 JD 中“训练、推理、网络、平台、智能化”的全生命周期要求。 这份计划的设计思路是：从微观的单卡算力压榨，到宏观的多机多节点协同，最后走向以 AI 治理 AI 的自动化闭环。 image.pngimage.png 阶段一：大语言模型分布式训练底座建设（重构底层认知..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92-1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":5.09,"words":1528},"filePathRelative":"posts/AI基础设施/学习计划/学习计划.md","excerpt":"<p>这份最完整的学习计划，将结合你目前身处算法组、拥有 GPU 实操环境的绝对优势，全面对标 JD 中“训练、推理、网络、平台、智能化”的全生命周期要求。</p>\\n<p>这份计划的设计思路是：<strong>从微观的单卡算力压榨，到宏观的多机多节点协同，最后走向以 AI 治理 AI 的自动化闭环。</strong></p>\\n<figure><img src=\\"/blog/assets/posts/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92-1.png\\" alt=\\"image.png\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>image.png</figcaption></figure>","autoDesc":true}`),i={name:`学习计划.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>这份最完整的学习计划，将结合你目前身处算法组、拥有 GPU 实操环境的绝对优势，全面对标 JD 中“训练、推理、网络、平台、智能化”的全生命周期要求。</p>
<p>这份计划的设计思路是：<strong>从微观的单卡算力压榨，到宏观的多机多节点协同，最后走向以 AI 治理 AI 的自动化闭环。</strong></p>
<figure><img src="/blog/assets/posts/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92-1.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h3 id="阶段一-大语言模型分布式训练底座建设-重构底层认知" tabindex="-1"><a class="header-anchor" href="#阶段一-大语言模型分布式训练底座建设-重构底层认知"><span>阶段一：大语言模型分布式训练底座建设（重构底层认知）</span></a></h3>
<p>这是跨越普通运维与 AI Infra 的最大门槛，核心在于理解多机多卡环境下的计算与通信机制。</p>
<ul>
<li><strong>3D 并行策略剖析：</strong> 彻底吃透数据并行（FSDP）、张量并行（TP）与流水线并行（PP）的原理，理解这三种策略在显存占用与通信频率上的本质区别。</li>
<li><strong>网络通信原语与 NCCL：</strong> 学习 AllReduce、AllGather、ReduceScatter 等集合通信动作。通过监控 NVIDIA NCCL 了解计算与通信的重叠（Overlap）机制，排查 PCIe 降速问题。</li>
<li><strong>核心性能指标监控大盘：</strong> 将 MFU（模型算力利用率）和 Tokens/GPU/Second 指标接入现有的 Prometheus 监控体系，直观评估当前训练任务的硬件利用效率。</li>
<li><strong>稳定性与 I/O 治理实战：</strong> 针对 Loss 突然爆炸或训练卡死，建立一套从硬件层（例如排查 GPU XID 错误、ECC 错误）到存储层（Checkpoint 写入延迟过高导致全量等待）的排查 SOP。</li>
</ul>
<h3 id="阶段二-超大规模推理引擎与性能极致榨取-响应高吞吐诉求" tabindex="-1"><a class="header-anchor" href="#阶段二-超大规模推理引擎与性能极致榨取-响应高吞吐诉求"><span>阶段二：超大规模推理引擎与性能极致榨取（响应高吞吐诉求）</span></a></h3>
<p>在这个阶段，你需要解决高并发、低延迟的业务诉求，直接关系到公司的资源使用成本 (ROI)。</p>
<ul>
<li><strong>推理框架底座实战：</strong> 在本地集群上完整部署 vLLM 或 TensorRT-LLM 服务，告别低效的基础模型加载方式。</li>
<li><strong>显存管理技术攻坚：</strong> 深入研究 PagedAttention 机制，理解它如何解决传统 KV Cache 带来的显存碎片化死锁问题，以及 Continuous Batching 如何提升并发吞吐。</li>
<li><strong>吞吐与延迟压测调优：</strong> 编写高并发压测脚本，调整 <code v-pre>max_num_seqs</code>（最大并发序列数）和 <code v-pre>gpu_memory_utilization</code>，寻找 TTFT（首字延迟）与系统整体吞吐量（Tokens/s）的最佳平衡点。</li>
<li><strong>服务化与反向代理网关：</strong> 处理流式输出（Streaming）在网关侧的超时断连问题，保障长链接的稳定性。</li>
</ul>
<h3 id="阶段三-ai-专属高性能异构网络演进-打破跨机瓶颈" tabindex="-1"><a class="header-anchor" href="#阶段三-ai-专属高性能异构网络演进-打破跨机瓶颈"><span>阶段三：AI 专属高性能异构网络演进（打破跨机瓶颈）</span></a></h3>
<p>在算力如此昂贵的今天，不能让 GPU 把时间浪费在等网络数据包上。</p>
<ul>
<li><strong>无损网络架构转型：</strong> 在已有的二三层路由交换基础上，将重心转向 RDMA 与 RoCEv2 架构，理解为什么 AI 集群必须依赖无损网络。</li>
<li><strong>微爆流与拥塞控制：</strong> 深入学习 PFC（基于优先级的流量控制）与 DCQCN 算法，排查高端显卡（如 H200/A800）在多机并行训练时产生的网络微爆流（Microburst）丢包问题。</li>
</ul>
<h3 id="阶段四-云原生调度与多租户异构资源池化-构建基础设施平台" tabindex="-1"><a class="header-anchor" href="#阶段四-云原生调度与多租户异构资源池化-构建基础设施平台"><span>阶段四：云原生调度与多租户异构资源池化（构建基础设施平台）</span></a></h3>
<p>将散乱的裸金属节点，升级为标准化的 MLOps 资源平台。</p>
<ul>
<li><strong>Kubernetes 高级 AI 调度：</strong> 在 Kubeflow 环境下，精通亲和性调度、污点与容忍机制，保障高优先级的分布式训练任务能够独占无碎片的高性能节点组合。</li>
<li><strong>GPU 切分与隔离复用：</strong> 落地 vGPU 或 MIG (Multi-Instance GPU) 技术，将单张大显存显卡细粒度切分，解决海量小规模推理服务的资源浪费问题。</li>
<li><strong>服务网格架构落地：</strong> 运用 Istio 等组件，解决大模型微服务化后的多模型流量路由、负载均衡与灰度发布挑战。</li>
</ul>
<h3 id="阶段五-探索-agentic-运维与故障自愈体系-决胜智能化演进" tabindex="-1"><a class="header-anchor" href="#阶段五-探索-agentic-运维与故障自愈体系-决胜智能化演进"><span>阶段五：探索 Agentic 运维与故障自愈体系（决胜智能化演进）</span></a></h3>
<p>这是 JD 中最具前瞻性的一条，也是让你脱颖而出的核心杀手锏：利用大型语言模型来运维大型语言集群。</p>
<ul>
<li><strong>全链路异构数据湖：</strong> 串接 Kafka 收集的分布式日志与 Prometheus 抓取的时序指标，为 AIOps 平台提供高质量的上下文数据源。</li>
<li><strong>Agentic 机器人开发框架升级：</strong> 迭代已有的 Flask 飞书 Webhook 机器人，将后端的决策大脑统一配置为你最熟悉的 Qwen 基础模型。</li>
<li><strong>Function Calling 工具链落地：</strong> 结合 LangChain，赋予 Qwen 模型直接执行指令的权限。封装诸如 <code v-pre>kubectl describe node</code>、重启容器、屏蔽告警节点等 API 供其调用。</li>
<li><strong>故障自愈闭环实操：</strong> 实现完整的智能工作流，即：集群告警触发 -&gt; 飞书接收并唤醒 Qwen -&gt; Qwen 主动调用工具拉取监控截图与错误日志 -&gt; 生成根因排查报告 -&gt; 机器人在群内发起确认 -&gt; 获得授权后自动执行故障隔离与业务迁移。</li>
</ul>
<hr>
<p><strong>核心技术栈与产出总结：</strong></p>
<table>
<thead>
<tr>
<th>学习阶段</th>
<th>核心技术栈与工具链</th>
<th>阶段产出目标</th>
</tr>
</thead>
<tbody>
<tr>
<td>分布式训练底座</td>
<td>PyTorch Distributed, NCCL</td>
<td>能够独立排查训练卡死与降速的底层原因</td>
</tr>
<tr>
<td>极致推理引擎</td>
<td>vLLM, TensorRT-LLM</td>
<td>输出深度压测对比报告至 ZH-Kinger 博客</td>
</tr>
<tr>
<td>异构高性能网络</td>
<td>RoCEv2, PFC, 交换机 QoS</td>
<td>掌握解决跨节点并行计算通信拥塞的方法</td>
</tr>
<tr>
<td>云原生调度平台</td>
<td>Kubernetes, Kubeflow, vGPU</td>
<td>搭建支持多租户抢占的企业级 AI 计算平台</td>
</tr>
<tr>
<td>智能自愈机器人</td>
<td>Qwen, Flask, Kafka, 飞书 API</td>
<td>落地具备工具调用与执行能力的 AI SRE 智能体</td>
</tr>
</tbody>
</table>
<p>这套计划几乎涵盖了当前大厂 AI Infra 的核心技术栈，也是在本科阶段直接对标资深岗位的极佳路径。面对这么多的技术点，你希望我们在接下来的交流中，先深挖其中的哪一个具体模块来开局？</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};