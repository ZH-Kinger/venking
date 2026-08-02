import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/data_Infra/%E5%88%86%E5%B8%83%E5%BC%8F%E5%AD%98%E5%82%A8/%E6%95%B0%E6%8D%AE%E7%AE%A1%E7%90%86.html","title":"数据管理","lang":"zh-CN","frontmatter":{"title":"数据管理","icon":"cpu","date":"2026-07-31T00:00:00.000Z","category":["AI基础设施"],"description":"当你决定用 TiKV 作为 JuiceFS 的大脑，搭配 MinIO 作为底层存储，你实际上正在构建一套顶级的企业级存算分离架构。这种架构特别适合用来支撑高并发的智能日志处理，或者承载海量多模态数据的大模型训练。 在这个体系下，所有的组件各司其职。为了让你对整个系统的拓扑结构一目了然，我们从部署位置、数据分布、元数据管理和数据流动四个维度来进行彻底拆解...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"数据管理\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-31T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/data_Infra/%E5%88%86%E5%B8%83%E5%BC%8F%E5%AD%98%E5%82%A8/%E6%95%B0%E6%8D%AE%E7%AE%A1%E7%90%86.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"数据管理"}],["meta",{"property":"og:description","content":"当你决定用 TiKV 作为 JuiceFS 的大脑，搭配 MinIO 作为底层存储，你实际上正在构建一套顶级的企业级存算分离架构。这种架构特别适合用来支撑高并发的智能日志处理，或者承载海量多模态数据的大模型训练。 在这个体系下，所有的组件各司其职。为了让你对整个系统的拓扑结构一目了然，我们从部署位置、数据分布、元数据管理和数据流动四个维度来进行彻底拆解..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-31T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":5.04,"words":1513},"filePathRelative":"posts/AI基础设施/data_Infra/分布式存储/数据管理.md","excerpt":"<p>当你决定用 <strong>TiKV</strong> 作为 JuiceFS 的大脑，搭配 <strong>MinIO</strong> 作为底层存储，你实际上正在构建一套顶级的企业级存算分离架构。这种架构特别适合用来支撑高并发的智能日志处理，或者承载海量多模态数据的大模型训练。</p>\\n<p>在这个体系下，所有的组件各司其职。为了让你对整个系统的拓扑结构一目了然，我们从部署位置、数据分布、元数据管理和数据流动四个维度来进行彻底拆解：</p>\\n<h3>一、 服务都部署在哪里？（物理与容器拓扑）</h3>\\n<p>在一个标准的 Kubernetes 集群或裸金属多机房架构中，这套系统通常被划分为三个相互独立的集群（或者节点组）：</p>","autoDesc":true}`),i={name:`数据管理.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>当你决定用 <strong>TiKV</strong> 作为 JuiceFS 的大脑，搭配 <strong>MinIO</strong> 作为底层存储，你实际上正在构建一套顶级的企业级存算分离架构。这种架构特别适合用来支撑高并发的智能日志处理，或者承载海量多模态数据的大模型训练。</p>
<p>在这个体系下，所有的组件各司其职。为了让你对整个系统的拓扑结构一目了然，我们从部署位置、数据分布、元数据管理和数据流动四个维度来进行彻底拆解：</p>
<h3 id="一、-服务都部署在哪里-物理与容器拓扑" tabindex="-1"><a class="header-anchor" href="#一、-服务都部署在哪里-物理与容器拓扑"><span>一、 服务都部署在哪里？（物理与容器拓扑）</span></a></h3>
<p>在一个标准的 Kubernetes 集群或裸金属多机房架构中，这套系统通常被划分为三个相互独立的集群（或者节点组）：</p>
<ol>
<li>
<p><strong>元数据集群（大脑区）：部署 TiKV 与 PD</strong></p>
<ul>
<li>
<p><strong>部署组件</strong>：TiKV 节点（实际存 KV 数据）、PD 节点（Placement Driver，负责集群调度和分配时间戳）。</p>
</li>
<li>
<p><strong>硬件要求</strong>：对 CPU 和内存有一定要求，最重要的是<strong>必须挂载低延迟的本地 NVMe/SSD 盘</strong>。因为元数据的响应速度直接决定了 <code v-pre>ls</code> 和 <code v-pre>find</code> 命令的速度。</p>
</li>
</ul>
</li>
<li>
<p><strong>数据存储集群（仓库区）：部署 MinIO</strong></p>
<ul>
<li>
<p><strong>部署组件</strong>：MinIO Server 进程。</p>
</li>
<li>
<p><strong>硬件要求</strong>：这是吞吐成本的重心。通常部署在挂满大容量、高密度机械硬盘（HDD）或廉价 SSD 的存储型服务器上。它不需要极低的随机寻道延迟，只需要极高的网络并发吞吐。</p>
</li>
</ul>
</li>
<li>
<p><strong>计算节点（干活区）：部署 JuiceFS 客户端</strong></p>
<ul>
<li>
<p><strong>部署组件</strong>：你的业务代码（如 PyTorch 训练脚本、Kafka 日志消费程序）以及 <strong>JuiceFS Client</strong>（通常以 K8s CSI 插件、DaemonSet 或直接以 FUSE 进程的形式挂载在宿主机上）。</p>
</li>
<li>
<p><strong>硬件要求</strong>：除了强大的 GPU 或 CPU 算力，这里<strong>强烈建议预留一块本地 NVMe 盘给 JuiceFS 做专属数据缓存区</strong>。</p>
</li>
</ul>
</li>
</ol>
<h3 id="二、-各种数据都分布在哪里" tabindex="-1"><a class="header-anchor" href="#二、-各种数据都分布在哪里"><span>二、 各种数据都分布在哪里？</span></a></h3>
<p>数据在这个架构下被“骨肉分离”，存放在三个不同的物理位置：</p>
<ol>
<li>
<p><strong>TiKV 内部（存“骨架”与“户口本”）</strong></p>
<ul>
<li>
<p>所有的文件名、目录层级（比如 <code v-pre>/wujioss/worldengine/</code>）、文件大小、创建修改时间、权限信息。</p>
</li>
<li>
<p><strong>最核心的数据</strong>：文件与数据块（Block）的映射关系。比如记录 <code v-pre>episode_1.mp4</code> 是由编号为 A, B, C 的三个 4MB 块组成的。</p>
</li>
</ul>
</li>
<li>
<p><strong>MinIO 内部（存“血肉”积木）</strong></p>
<ul>
<li>存放真正的文件内容。但这里面没有文件夹，只有打散的、加密或压缩后的 <strong>4MB 物理数据块（Block）</strong>。对 MinIO 来说，里面就是一堆随机字符串命名的纯数据 Object。</li>
</ul>
</li>
<li>
<p><strong>计算节点的本地盘（存“热数据”缓存）</strong></p>
<ul>
<li>存放最近被访问过的 4MB 数据块。比如你的脚本刚读取完某个数据集的第一个 Epoch，这些数据的 Block 就会被 JuiceFS 临时保存在计算节点的硬盘上。</li>
</ul>
</li>
</ol>
<h3 id="三、-元数据是怎么管理的" tabindex="-1"><a class="header-anchor" href="#三、-元数据是怎么管理的"><span>三、 元数据是怎么管理的？</span></a></h3>
<p>TiKV 是一个分布式的键值（Key-Value）数据库，它不认识什么是“文件夹”。JuiceFS 是如何把复杂的目录树放进 TiKV 的？</p>
<ol>
<li>
<p><strong>POSIX 到 KV 的魔法转换</strong>：</p>
<p>JuiceFS 在内部把每一个目录和文件都抽象成了一个 inode（节点编号）。</p>
<p>当你在 <code v-pre>/data/</code> 目录下创建一个 <code v-pre>log.txt</code> 时，JuiceFS 会在 TiKV 里写入几条极为精简的 KV 记录：</p>
<ul>
<li>
<p><code v-pre>Key: 父目录ID_log.txt_名字 -&gt; Value: 新文件的 inode 编号</code> (用于目录查找)</p>
</li>
<li>
<p><code v-pre>Key: 新文件的 inode_属性 -&gt; Value: 权限755、大小0</code> (用于属性查询)</p>
</li>
</ul>
</li>
<li>
<p><strong>TiKV 的自动分片与高可用管理</strong>：</p>
<p>当你的文件达到几千万甚至上亿个时，这些 KV 记录会非常多。TiKV 会自动把这些连续的 Key 切分成很多个 <strong>Region（约 96MB 的分片）</strong>。</p>
<p>通过 Multi-Raft 协议，TiKV 会自动把每一个 Region 复制成 3 份，分散保存在不同的 TiKV 节点上。如果某台 TiKV 服务器宕机，PD 调度中心会在毫秒级将该机器上的 Region Leader 转移到健康的节点，你的文件目录树绝对不会乱，也不会丢。</p>
</li>
</ol>
<h3 id="四、-数据是怎么流动的-全链路演练" tabindex="-1"><a class="header-anchor" href="#四、-数据是怎么流动的-全链路演练"><span>四、 数据是怎么流动的？（全链路演练）</span></a></h3>
<p>我们以一段分布式训练或日志清洗任务去<strong>读取一个 1GB 的文件</strong>为例，看看数据流转的全过程：</p>
<ol>
<li>
<p><strong>发起请求</strong>：计算节点上的业务容器执行 <code v-pre>open('/mnt/jfs/data/big_file.parquet')</code>。</p>
</li>
<li>
<p><strong>查询元数据</strong>：JuiceFS 客户端立刻通过网络向远端的 <strong>TiKV 集群</strong>发起 RPC 调用，极速查出这个大文件对应的 250 个 Block ID（块编号）和块的位置映射。</p>
</li>
<li>
<p><strong>拉取数据与预读</strong>：JuiceFS 客户端拿着这 250 个 Block ID，开启多线程，向远端的 <strong>MinIO 集群</strong>发起高并发的 HTTP GET 请求。同时，它会智能预测你接下来的读取行为，在后台提前把后面的 Block 拉取过来（Prefetching）。</p>
</li>
<li>
<p><strong>本地缓存留存</strong>：从 MinIO 拉回来的数据块，除了喂给你的应用程序外，JuiceFS 会在计算节点的本地 NVMe 盘上<strong>复制存留一份</strong>。</p>
</li>
<li>
<p><strong>下一次读取（极速模式）</strong>：当你的代码第二次读取这个文件，或者读取同一文件的其他行时，JuiceFS 发现数据块已经在本地缓存盘上了，它会直接跨过网络，从本地硬盘把数据塞进内存，这时的网络流量为零，I/O 速度达到物理硬盘极限。</p>
</li>
</ol>
<p>通过这种数据流向，TiKV 扛下了所有的高频目录寻址压力，MinIO 扛下了海量的静态数据吞吐，而计算节点的本地缓存消除了网络延迟，三者协同，实现了真正的降维打击。</p>
<p>想了解在实际的 Kubernetes 集群中，如何通过 YAML 声明将这套 TiKV + MinIO 的 JuiceFS 直接挂载给不同的 Pod 供它们并发读写吗？</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};