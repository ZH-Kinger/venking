import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/%E8%AE%AD%E7%BB%83%E6%9E%B6%E6%9E%84/Cluster_monitor/LLM%E8%AE%AD%E7%BB%83%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E4%B8%AD%E5%B8%B8%E8%A7%81%E6%8C%87%E6%A0%87/LLM%E8%AE%AD%E7%BB%83%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E4%B8%AD%E5%B8%B8%E8%A7%81%E6%8C%87%E6%A0%87.html","title":"LLM训练生命周期中常见指标","lang":"zh-CN","frontmatter":{"title":"LLM训练生命周期中常见指标","icon":"cpu","date":"2026-07-23T00:00:00.000Z","category":["AI基础设施"],"description":"二、 算力与配置参数板块（“给机器排产”） 这一板块是算法同学每天在训练脚本里修改最多的核心控制台。 1. 核心参数 Micro Batch Size (MBS / 单卡单步批次大小)： 极其关键！指单张 GPU 在单次前向传播中，一次性吃进去的文本样本数量（比如 MBS=2）。调得太大显存直接炸，调得太小显卡“吃不饱”。 Gradient Accum...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"LLM训练生命周期中常见指标\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/%E8%AE%AD%E7%BB%83%E6%9E%B6%E6%9E%84/Cluster_monitor/LLM%E8%AE%AD%E7%BB%83%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E4%B8%AD%E5%B8%B8%E8%A7%81%E6%8C%87%E6%A0%87/LLM%E8%AE%AD%E7%BB%83%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E4%B8%AD%E5%B8%B8%E8%A7%81%E6%8C%87%E6%A0%87.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"LLM训练生命周期中常见指标"}],["meta",{"property":"og:description","content":"二、 算力与配置参数板块（“给机器排产”） 这一板块是算法同学每天在训练脚本里修改最多的核心控制台。 1. 核心参数 Micro Batch Size (MBS / 单卡单步批次大小)： 极其关键！指单张 GPU 在单次前向传播中，一次性吃进去的文本样本数量（比如 MBS=2）。调得太大显存直接炸，调得太小显卡“吃不饱”。 Gradient Accum..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":4.42,"words":1326},"filePathRelative":"posts/AI基础设施/学习计划/训练架构/Cluster_monitor/LLM训练生命周期中常见指标/LLM训练生命周期中常见指标.md","excerpt":"<h2>二、 算力与配置参数板块（“给机器排产”）</h2>\\n<p>这一板块是算法同学每天在训练脚本里修改最多的核心控制台。</p>\\n<h3>1. 核心参数</h3>\\n<ul>\\n<li><strong>Micro Batch Size (MBS / 单卡单步批次大小)：</strong> 极其关键！指<strong>单张 GPU</strong> 在单次前向传播中，一次性吃进去的文本样本数量（比如 <code>MBS=2</code>）。调得太大显存直接炸，调得太小显卡“吃不饱”。</li>\\n<li><strong>Gradient Accumulation Steps (GAS / 梯度累积步数)：</strong> 显存不够、无法一次性吃下大 Batch 时的保命参数。让显卡连续闷头算 $N$ 步，把梯度在本地叠加，不触发网络通信。</li>\\n<li><strong>Global Batch Size (GBS / 全局总批次大小)：</strong> 算法真正关心的、模型每更新一次权重所看过的总样本数。</li>\\n</ul>","autoDesc":true}`),i={name:`LLM训练生命周期中常见指标.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><h2 id="二、-算力与配置参数板块-给机器排产" tabindex="-1"><a class="header-anchor" href="#二、-算力与配置参数板块-给机器排产"><span>二、 算力与配置参数板块（“给机器排产”）</span></a></h2>
<p>这一板块是算法同学每天在训练脚本里修改最多的核心控制台。</p>
<h3 id="_1-核心参数" tabindex="-1"><a class="header-anchor" href="#_1-核心参数"><span>1. 核心参数</span></a></h3>
<ul>
<li><strong>Micro Batch Size (MBS / 单卡单步批次大小)：</strong> 极其关键！指<strong>单张 GPU</strong> 在单次前向传播中，一次性吃进去的文本样本数量（比如 <code v-pre>MBS=2</code>）。调得太大显存直接炸，调得太小显卡“吃不饱”。</li>
<li><strong>Gradient Accumulation Steps (GAS / 梯度累积步数)：</strong> 显存不够、无法一次性吃下大 Batch 时的保命参数。让显卡连续闷头算 $N$ 步，把梯度在本地叠加，不触发网络通信。</li>
<li><strong>Global Batch Size (GBS / 全局总批次大小)：</strong> 算法真正关心的、模型每更新一次权重所看过的总样本数。</li>
</ul>
<p>$$<br>
\\text{计算公式：} \\text{GBS} = \\text{MBS} \\times \\text{GAS} \\times \\text{数据并行卡数 (DP_Size)}<br>
$$</p>
<ul>
<li><strong>Sequence Length (SeqLen / 上下文长度)：</strong> 训练时输入的单条文本有多长（如 4K、8K、32K）。<strong>它对显存（尤其是激活值）的消耗呈二次方（</strong>$O(N^2)$<strong>）爆炸级增长</strong>。</li>
</ul>
<h3 id="_2-核心优化技术" tabindex="-1"><a class="header-anchor" href="#_2-核心优化技术"><span>2. 核心优化技术</span></a></h3>
<ul>
<li><strong>Activation Checkpointing (重计算)：</strong> 拿算力换显存。前向传播算完后，把庞大的激活值直接从显存里丢弃；反向传播需要用时，GPU 现场重新算一遍。能让单卡 MBS 瞬间翻倍。</li>
</ul>
<hr>
<h2 id="三、-分布式并行与通信板块-大卸八块与传小纸条" tabindex="-1"><a class="header-anchor" href="#三、-分布式并行与通信板块-大卸八块与传小纸条"><span>三、 分布式并行与通信板块（“大卸八块与传小纸条”）</span></a></h2>
<p>当一个模型大到单卡装不下、必须上多卡或多机时，这就是 Infra SRE 的技术主战场。</p>
<h3 id="_1-3d-并行策略" tabindex="-1"><a class="header-anchor" href="#_1-3d-并行策略"><span>1. 3D 并行策略</span></a></h3>
<ul>
<li><strong>DP / DDP (数据并行)：</strong> 每个人手里拿着全套模型，各自吃不同的数据，最后用 <code v-pre>NCCL AllReduce</code> 对答案（同步梯度）。</li>
<li><strong>TP (张量并行)：</strong> 把模型内部的矩阵切开，GPU 0 算左半边，GPU 1 算右半边。<strong>通信极度频繁，物理上必须锁死在单机内部的 NVLink 高速公路上，绝对不能跨机。</strong></li>
<li><strong>PP (流水线并行)：</strong> 纵向切分层数。GPU 0 算 1-10 层，算完把边界结果像接力棒一样扔给 GPU 1 算 11-20 层。通信量小，适合跨机。</li>
<li><strong>FSDP2 (完全分片数据并行第二代)：</strong> 现代大厂的首选。原生基于 <strong>DTensor</strong>，完全保留参数的矩阵形状，把参数、梯度、优化器状态平均切分到各卡上。前向时用 <code v-pre>AllGather</code> 现拼现算，算完立删，反向时用 <code v-pre>ReduceScatter</code> 同步，完美兼容 TP。</li>
<li><strong>HSDP (混合分片数据并行)：</strong> 针对“跨机网络慢”发明的折中策略。<strong>机内走 FSDP（切分省显存），跨机走 DDP（复制省通信带宽）</strong>。</li>
</ul>
<h3 id="_2-nccl-底层原语" tabindex="-1"><a class="header-anchor" href="#_2-nccl-底层原语"><span>2. NCCL 底层原语</span></a></h3>
<ul>
<li><strong>AllReduce：</strong> DDP 的核心。所有人手里的局部梯度互相求和，最后每个人都拿到一份完全一致的全局平均梯度。</li>
<li><strong>AllGather：</strong> FSDP2 的核心。每个人出自己的一小块切片，互相交换后，所有人手里都拼出了一份完整的大模型参数。</li>
<li><strong>ReduceScatter：</strong> 所有人手里形状相同的梯度一边传递一边相加，但最后切开，每张卡只保留属于自己的那 1/4 梯度切片。</li>
</ul>
<hr>
<h2 id="四、-核心监控指标板块-年终-kpi-与故障排查" tabindex="-1"><a class="header-anchor" href="#四、-核心监控指标板块-年终-kpi-与故障排查"><span>四、 核心监控指标板块（“年终 KPI 与故障排查”）</span></a></h2>
<p>这是你作为 SRE 在 Prometheus、Grafana 或者训练日志里需要死死盯住的仪表盘。</p>
<h3 id="_1-效率指标" tabindex="-1"><a class="header-anchor" href="#_1-效率指标"><span>1. 效率指标</span></a></h3>
<ul>
<li><strong>MFU (Model FLOPs Utilization / 模型算力利用率)：</strong> <strong>Infra 团队的终极 ROI 指标。</strong> 硬件实际干正事的有效算力占理论巅峰算力的百分比。及格线 30%，优秀线 &gt;50%，大厂顶尖调优能压榨到 60% 以上。</li>
<li><strong>TFLOPS (每秒万亿次浮点运算)：</strong> 显卡当前每秒实际吐出的算力数值。</li>
<li><strong>Tokens/s/GPU：</strong> 平均单张卡一秒钟能吞吐多少个 Token，反映了整体数据流水线的通畅度。</li>
</ul>
<h3 id="_2-稳定性与故障指标" tabindex="-1"><a class="header-anchor" href="#_2-稳定性与故障指标"><span>2. 稳定性与故障指标</span></a></h3>
<ul>
<li><strong>Loss (损失值)：</strong> 算法同学最看重的值，代表模型有多笨。如果 Loss 突然变成 <code v-pre>NaN</code> 或者 <code v-pre>Inf</code>，说明模型彻底训练崩溃（崩盘）了，SRE 需要配合检查是不是发生了精度溢出。</li>
<li><strong>Distributed Hang (分布式挂起/假死)：</strong> 极其经典的故障。表现为 GPU 功耗全部瞬间掉到十几瓦（摸鱼状态），日志停止输出。通常是因为集群网络有坏节点或丢包，导致 NCCL 在进行 <code v-pre>AllReduce</code> 时某个节点死等，全盘卡死。</li>
</ul>
<hr>
<h3 id="💡-sre-实战速查口诀" tabindex="-1"><a class="header-anchor" href="#💡-sre-实战速查口诀"><span>💡 SRE 实战速查口诀</span></a></h3>
<blockquote>
<p><strong>显存炸了（OOM）</strong> $\\rightarrow$ 找算法降 <strong>MBS</strong>，开 <strong>Activation Checkpointing</strong>，或者把 DDP 升级为 <strong>FSDP2</strong>。<br>
<strong>速度太慢（MFU低）</strong> $\\rightarrow$ 开 <strong>NCCL_DEBUG=INFO</strong> 查是不是跨机没走 <strong>RDMA</strong> 走了慢速 Socket；或者加大 <strong>GAS</strong> 减少通信频率。<strong>模型崩了（NaN）</strong> $\\rightarrow$ 检查代码里的 <strong>Dtype</strong> 是不是配错了 FP16，立刻强推换成 <strong>BF16</strong>。</p>
</blockquote>
<p>这份全景图基本涵盖了你目前在 8 卡服务器上死磕 PyTorch 期间会遇到的所有核心词汇。把这张图刻进脑海里，整个大模型训练的物理运行轨迹在你眼里就是完全透明的了！</p>
<p>在这四大板块里，你目前手头在看的 PyTorch 文档或报错，正对应着哪一个板块的内容？</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};