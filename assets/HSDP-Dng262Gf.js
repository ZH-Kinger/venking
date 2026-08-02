import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/%E8%AE%AD%E7%BB%83%E6%9E%B6%E6%9E%84/%E5%88%86%E5%B8%83%E5%BC%8F%E8%AE%AD%E7%BB%83/PyTorch_%E5%88%86%E5%B8%83%E5%BC%8F%E6%A6%82%E8%BF%B0/Parallel_(%E5%B9%B6%E8%A1%8C)/HSDP.html","title":"HSDP","lang":"zh-CN","frontmatter":{"title":"HSDP","icon":"cpu","date":"2026-07-23T00:00:00.000Z","category":["AI基础设施"],"description":"​HSDP（Hybrid Sharded Data Parallel，混合分片数据并行） 恰好就是当今工业界为了拯救“偏科服务器（机内卡极好，跨机网极差）”而发明的终极大招。 要理解 HSDP，我们需要把它拆解成你已经认识的两位老熟人：FSDP (切分显存) + DDP (跨机复制)。 为什么纯 FSDP 会翻车？ 前置知识：FSDP（完全分片数据并行...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"HSDP\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/HSDP-1.png\\",\\"https://venking.tech/blog/blog/assets/posts/HSDP-2.png\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/%E8%AE%AD%E7%BB%83%E6%9E%B6%E6%9E%84/%E5%88%86%E5%B8%83%E5%BC%8F%E8%AE%AD%E7%BB%83/PyTorch_%E5%88%86%E5%B8%83%E5%BC%8F%E6%A6%82%E8%BF%B0/Parallel_(%E5%B9%B6%E8%A1%8C)/HSDP.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"HSDP"}],["meta",{"property":"og:description","content":"​HSDP（Hybrid Sharded Data Parallel，混合分片数据并行） 恰好就是当今工业界为了拯救“偏科服务器（机内卡极好，跨机网极差）”而发明的终极大招。 要理解 HSDP，我们需要把它拆解成你已经认识的两位老熟人：FSDP (切分显存) + DDP (跨机复制)。 为什么纯 FSDP 会翻车？ 前置知识：FSDP（完全分片数据并行..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/HSDP-1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.84,"words":851},"filePathRelative":"posts/AI基础设施/学习计划/训练架构/分布式训练/PyTorch_分布式概述/Parallel_(并行)/HSDP.md","excerpt":"<p>​<strong>HSDP（Hybrid Sharded Data Parallel，混合分片数据并行）</strong> 恰好就是当今工业界为了拯救“偏科服务器（机内卡极好，跨机网极差）”而发明的终极大招。</p>\\n<p>要理解 HSDP，我们需要把它拆解成你已经认识的两位老熟人：<strong>FSDP (切分显存) + DDP (跨机复制)</strong>。</p>\\n<h3>为什么纯 FSDP 会翻车？</h3>\\n<p>前置知识：FSDP（完全分片数据并行）的逻辑是“有几张卡，就把模型切几份”。</p>\\n<p>如果你有 2 台机器，每台 8 张卡（共 16 张卡），FSDP 会毫不留情地把模型切成 16 份。</p>","autoDesc":true}`),i={name:`HSDP.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>​<strong>HSDP（Hybrid Sharded Data Parallel，混合分片数据并行）</strong> 恰好就是当今工业界为了拯救“偏科服务器（机内卡极好，跨机网极差）”而发明的终极大招。</p>
<p>要理解 HSDP，我们需要把它拆解成你已经认识的两位老熟人：<strong>FSDP (切分显存) + DDP (跨机复制)</strong>。</p>
<h3 id="为什么纯-fsdp-会翻车" tabindex="-1"><a class="header-anchor" href="#为什么纯-fsdp-会翻车"><span>为什么纯 FSDP 会翻车？</span></a></h3>
<p>前置知识：FSDP（完全分片数据并行）的逻辑是“有几张卡，就把模型切几份”。</p>
<p>如果你有 2 台机器，每台 8 张卡（共 16 张卡），FSDP 会毫不留情地把模型切成 16 份。</p>
<ul>
<li><strong>致命瓶颈：</strong> 在计算（前向传播）时，每张卡都需要向另外 15 张卡要数据（AllGather）。</li>
<li><strong>SRE 的灾难：</strong> 同一台机器里的 8 张卡互相给数据，走的是 <strong>NVLink</strong>（跑车在高速公路上飞奔，毫无压力）。但是，它还要跨机器向另外 8 张卡要数据，这必须走<strong>跨机网卡</strong>（跑车突然挤进了泥泞的乡间小道）。如果你们机房的网卡恰好配置不高（比如之前那台单张 200G 的配置），跨机的 AllGather 会把网卡彻底干爆，所有的 GPU 都在死等网络传输，算力利用率（MFU）暴跌。</li>
</ul>
<h3 id="hsdp-的破局之道-内外有别" tabindex="-1"><a class="header-anchor" href="#hsdp-的破局之道-内外有别"><span>HSDP 的破局之道：内外有别</span></a></h3>
<p>HSDP 的核心哲学极其务实：<strong>认清硬件现实，机内走切分，机外走复制。</strong></p>
<ol>
<li><strong>在机器内部 (Intra-node)：使用 FSDP。</strong> 它把模型切成 8 份分给机内的 8 张卡。因为机内有无敌的 NVLink，互相拼凑数据极快，还能省下大量显存。</li>
<li><strong>在机器之间 (Inter-node)：使用 DDP。</strong> 节点 1 拥有一套完整的模型（由内部 8 张卡拼成），节点 2 <strong>也拥有一套一模一样的完整模型</strong>。节点之间不再互相要模型切片，只在最后算完梯度时，互相交流一下“更新方向”（AllReduce）。</li>
</ol>
<p>为了让你一眼看穿这两者在底层是如何分配内存的，我为你做了一个可视化的显存切片模拟器。你可以切换看看，在 2 台机器（共 8 张卡）的集群里，参数是怎么分布的：</p>
<p><img src="/blog/assets/posts/HSDP-1.png" alt="image.png" loading="lazy"><img src="/blog/assets/posts/HSDP-2.png" alt="image.png" loading="lazy"></p>
<h3 id="sre-面试黄金考点-什么时候该用-hsdp" tabindex="-1"><a class="header-anchor" href="#sre-面试黄金考点-什么时候该用-hsdp"><span>SRE 面试黄金考点：什么时候该用 HSDP？</span></a></h3>
<p>当你作为 AI Infra SRE 面对一个新的大模型训练任务时，你需要这样帮算法团队做决策：</p>
<ol>
<li><strong>什么时候用纯 FSDP？</strong></li>
</ol>
<p>你们公司很有钱，买的都是顶级机器，不但机内有 NVLink，跨机网络也是满配的 8 轨 400G InfiniBand（俗称 IB 网）。跨机网络和机内网络一样快，不用犹豫，直接上纯 FSDP，显存利用率最大化。</p>
<ol start="2">
<li><strong>什么时候用 HSDP？</strong></li>
</ol>
<p>像你之前发的那张配置图：单机 8 卡算力爆表（NVLink 互联），但跨机只有一张 200G 的普通以太网卡。这时候如果你用纯 FSDP，集群就“瘫痪”了。你必须强制算法同学在启动 PyTorch 脚本时开启 HSDP，<strong>用显存空间（每个节点存一份副本）去换取通信时间（不用跨机传参数）</strong>。</p>
<p>在你们目前的基础设施里，如果涉及到多机训练，网络配置通常是怎样的呢？是豪华的专线 IB 网络，还是容易拥堵的普通以太网？</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};