import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/%E8%AE%AD%E7%BB%83%E6%9E%B6%E6%9E%84/Cluster_monitor/LLM%E8%AE%AD%E7%BB%83%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E4%B8%AD%E5%B8%B8%E8%A7%81%E6%8C%87%E6%A0%87/MFU(%E6%A8%A1%E5%9E%8B%E7%AE%97%E5%8A%9B%E5%88%A9%E7%94%A8%E7%8E%87).html","title":"MFU(模型算力利用率)","lang":"zh-CN","frontmatter":{"title":"MFU(模型算力利用率)","icon":"cpu","date":"2026-07-23T00:00:00.000Z","category":["AI基础设施"],"description":"在大模型和 AI Infra 的世界里，MFU（Model FLOPs Utilization，模型算力利用率） 是整个机房里最神圣、最致命，也是老板和 SRE 最死死盯着的终极 KPI。 用大白话来说：MFU 衡量的是，你花几百万买来的极其昂贵的 GPU，到底有百分之几的时间在“真正地算大模型”，又有百分之几的时间在“摸鱼等数据”。 一、 MFU 的...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MFU(模型算力利用率)\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/%E8%AE%AD%E7%BB%83%E6%9E%B6%E6%9E%84/Cluster_monitor/LLM%E8%AE%AD%E7%BB%83%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E4%B8%AD%E5%B8%B8%E8%A7%81%E6%8C%87%E6%A0%87/MFU(%E6%A8%A1%E5%9E%8B%E7%AE%97%E5%8A%9B%E5%88%A9%E7%94%A8%E7%8E%87).html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"MFU(模型算力利用率)"}],["meta",{"property":"og:description","content":"在大模型和 AI Infra 的世界里，MFU（Model FLOPs Utilization，模型算力利用率） 是整个机房里最神圣、最致命，也是老板和 SRE 最死死盯着的终极 KPI。 用大白话来说：MFU 衡量的是，你花几百万买来的极其昂贵的 GPU，到底有百分之几的时间在“真正地算大模型”，又有百分之几的时间在“摸鱼等数据”。 一、 MFU 的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.86,"words":859},"filePathRelative":"posts/AI基础设施/学习计划/训练架构/Cluster_monitor/LLM训练生命周期中常见指标/MFU(模型算力利用率).md","excerpt":"<p>在大模型和 AI Infra 的世界里，<strong>MFU（Model FLOPs Utilization，模型算力利用率）</strong> 是整个机房里最神圣、最致命，也是老板和 SRE 最死死盯着的<strong>终极 KPI</strong>。</p>\\n<p>用大白话来说：<strong>MFU 衡量的是，你花几百万买来的极其昂贵的 GPU，到底有百分之几的时间在“真正地算大模型”，又有百分之几的时间在“摸鱼等数据”。</strong></p>\\n<hr>\\n<h3>一、 MFU 的硬核数学定义</h3>\\n<p>MFU 的核心计算公式非常直接：</p>\\n<p>$<br>\\n\\\\text{MFU} = \\\\frac{\\\\text{模型实际消耗的计算量 (Actual FLOPs/s)&amp;#125;&amp;#125;{\\\\text{GPU 的理论峰值算力 (Peak FLOPs/s)&amp;#125;&amp;#125;<br>\\n$</p>","autoDesc":true}`),i={name:`MFU(模型算力利用率).md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在大模型和 AI Infra 的世界里，<strong>MFU（Model FLOPs Utilization，模型算力利用率）</strong> 是整个机房里最神圣、最致命，也是老板和 SRE 最死死盯着的<strong>终极 KPI</strong>。</p>
<p>用大白话来说：<strong>MFU 衡量的是，你花几百万买来的极其昂贵的 GPU，到底有百分之几的时间在“真正地算大模型”，又有百分之几的时间在“摸鱼等数据”。</strong></p>
<hr>
<h3 id="一、-mfu-的硬核数学定义" tabindex="-1"><a class="header-anchor" href="#一、-mfu-的硬核数学定义"><span>一、 MFU 的硬核数学定义</span></a></h3>
<p>MFU 的核心计算公式非常直接：</p>
<p>$$<br>
\\text{MFU} = \\frac{\\text{模型实际消耗的计算量 (Actual FLOPs/s)&amp;#125;&amp;#125;{\\text{GPU 的理论峰值算力 (Peak FLOPs/s)&amp;#125;&amp;#125;<br>
$$</p>
<ul>
<li><strong>分母（理论峰值）：</strong> 就是我们上一节在算力表里看到的“稠密算力”。比如 H100 的 BF16 理论峰值是 989 TFLOPS（每秒 989 万亿次浮点运算）。</li>
<li><strong>分子（实际消耗）：</strong> 是算法团队根据模型的参数量、Batch Size 和处理的 Token 数量，严格推算出来的<strong>有效数学计算量</strong>。</li>
</ul>
<h3 id="二、-为什么-mfu-永远达不到-100-sre-的噩梦" tabindex="-1"><a class="header-anchor" href="#二、-为什么-mfu-永远达不到-100-sre-的噩梦"><span>二、 为什么 MFU 永远达不到 100%？（SRE 的噩梦）</span></a></h3>
<p>如果你买了一张 H100，你肯定希望它的 MFU 是 100%，也就是它每一秒钟都在以 989 TFLOPS 的满血状态狂飙。</p>
<p><strong>但在物理现实中，这绝对不可能。</strong> 还记得我们之前聊过的“显卡微观工厂”和“网卡通信”吗？只要 GPU 在干下面这三件事，它的计算核心（Tensor Core）就处于<strong>停机摸鱼</strong>状态，MFU 就会往下掉：</p>
<ol>
<li><strong>Memory Bound（等显存搬砖）：</strong> 数据正在从 HBM 显存艰难地搬运到 SRAM 工作台上。计算核心在干等。</li>
<li><strong>Communication Bound（等网卡同步）：</strong> 跑分布式训练时，卡与卡之间正在通过 RDMA 网络（AllReduce）对答案、同步梯度。在网卡传完数据之前，计算核心只能干等。</li>
<li><strong>IO Bound（等硬盘加载）：</strong> 固态硬盘读取训练文本（语料库）的速度太慢，GPU 算完了一波，下一波文本还没解压出来。</li>
</ol>
<hr>
<h3 id="三、-工业界的-mfu-真实水位线" tabindex="-1"><a class="header-anchor" href="#三、-工业界的-mfu-真实水位线"><span>三、 工业界的 MFU 真实水位线</span></a></h3>
<p>作为一个 SRE 或者架构师，当你看到监控大盘上的 MFU 数字时，你的心脏应该有以下几种跳动频率：</p>
<ul>
<li>$\\text{MFU} &lt; 30%$<strong>：警报拉响，纯属败家。</strong> 说明你的底层系统千疮百孔，要么是网络有严重瓶颈，要么是没有用 FlashAttention 等算子融合技术，算力全浪费在等数据搬运上了。</li>
<li>$\\text{MFU} \\approx 40% \\sim 50%$<strong>：及格线，大多数公司的常态。</strong> 底层总线和网络配置得比较正常，跑主流的框架（如 Megatron-LM 或 DeepSpeed）基本能达到这个水平。</li>
<li>$\\text{MFU} \\approx 55% \\sim 60%$<strong>：业界顶尖水平！</strong> 这是 Meta 跑 Llama 3，或者 OpenAI 跑 GPT-4 时的极致表现。SRE 把通信和计算做了极其完美的重叠（Overlap），压榨干了硬件的最后一丝潜能。</li>
<li>$\\text{MFU} &gt; 70%$<strong>：不可能的物理奇迹（或者有人在造假）。</strong> 极少数情况下（比如没有网络通信的纯单卡极简任务），或者有人故意把重计算（Activation Checkpointing）的无效算力也算进了分子里，才会出现这种虚高数字。</li>
</ul>
<p><strong>一句话总结：</strong>GPU 的纸面算力决定了你能跑多快，但最终跑出来的 <strong>MFU</strong>，才是检验一个 AI 架构师和底层 SRE 功底的唯一真理。</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};