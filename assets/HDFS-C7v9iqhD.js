import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/data_Infra/%E5%88%86%E5%B8%83%E5%BC%8F%E5%AD%98%E5%82%A8/HDFS.html","title":"HDFS","lang":"zh-CN","frontmatter":{"title":"HDFS","icon":"cpu","date":"2026-07-31T00:00:00.000Z","category":["AI基础设施"],"description":"HDFS（Hadoop Distributed File System，Hadoop 分布式文件系统） 是整个大数据时代的“祖师爷”和奠基石。 如果说咱们之前聊的 MinIO / S3 是现代云原生时代的“超级物流仓库”，那么 HDFS 就是传统大数据机房里的“重型绿皮火车”。在它诞生（2006年左右）的那个年代，它是一项极其伟大的革命，直接开创了大数...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"HDFS\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-31T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/data_Infra/%E5%88%86%E5%B8%83%E5%BC%8F%E5%AD%98%E5%82%A8/HDFS.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"HDFS"}],["meta",{"property":"og:description","content":"HDFS（Hadoop Distributed File System，Hadoop 分布式文件系统） 是整个大数据时代的“祖师爷”和奠基石。 如果说咱们之前聊的 MinIO / S3 是现代云原生时代的“超级物流仓库”，那么 HDFS 就是传统大数据机房里的“重型绿皮火车”。在它诞生（2006年左右）的那个年代，它是一项极其伟大的革命，直接开创了大数..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-31T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.57,"words":1071},"filePathRelative":"posts/AI基础设施/data_Infra/分布式存储/HDFS.md","excerpt":"<p><strong>HDFS（Hadoop Distributed File System，Hadoop 分布式文件系统）</strong> 是整个大数据时代的“祖师爷”和奠基石。</p>\\n<p>如果说咱们之前聊的 <strong>MinIO / S3</strong> 是现代云原生时代的“超级物流仓库”，那么 <strong>HDFS</strong> 就是传统大数据机房里的“重型绿皮火车”。在它诞生（2006年左右）的那个年代，它是一项极其伟大的革命，直接开创了大数据时代。</p>\\n<p>为了让你把它和你熟悉的现代架构（JuiceFS + TiKV + MinIO）对标起来，我们从它的架构和命运来硬核拆解：</p>","autoDesc":true}`),i={name:`HDFS.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p><strong>HDFS（Hadoop Distributed File System，Hadoop 分布式文件系统）</strong> 是整个大数据时代的“祖师爷”和奠基石。</p>
<p>如果说咱们之前聊的 <strong>MinIO / S3</strong> 是现代云原生时代的“超级物流仓库”，那么 <strong>HDFS</strong> 就是传统大数据机房里的“重型绿皮火车”。在它诞生（2006年左右）的那个年代，它是一项极其伟大的革命，直接开创了大数据时代。</p>
<p>为了让你把它和你熟悉的现代架构（JuiceFS + TiKV + MinIO）对标起来，我们从它的架构和命运来硬核拆解：</p>
<h2 id="一、-它的核心架构-经典的-主从-模式" tabindex="-1"><a class="header-anchor" href="#一、-它的核心架构-经典的-主从-模式"><span>一、 它的核心架构（经典的“主从”模式）</span></a></h2>
<p>HDFS 的物理架构非常简单粗暴，分为两个绝对核心的角色：</p>
<ol>
<li>
<p><strong>NameNode（大管家 / 目录大脑）</strong></p>
<ul>
<li>
<p><strong>职责</strong>：类似于 JuiceFS 里的 TiKV，负责记录所有的文件名、目录层级，以及“文件被切成了哪些块，存在了哪台机器上”。</p>
</li>
<li>
<p><strong>致命弱点</strong>：早期的 NameNode 是<strong>单点</strong>的（虽然有 Standby，但也是主备模式，不是分布式）。更要命的是，它把整个目录树<strong>全部塞在 Java 的 JVM 内存里</strong>。如果你的小文件太多，NameNode 的内存会直接撑爆，导致整个集群瘫痪。这就是为什么大数据界有一句名言：“HDFS 极度恐惧小文件”。</p>
</li>
</ul>
</li>
<li>
<p><strong>DataNode（苦力搬运工 / 数据节点）</strong></p>
<ul>
<li>
<p><strong>职责</strong>：类似于 MinIO。负责真正存储物理数据。</p>
</li>
<li>
<p><strong>大块头设计</strong>：HDFS 默认把文件切成 <strong>128MB</strong> 的巨型数据块（Block），而 JuiceFS 是切成 4MB。这种大块设计注定了它只适合做“大吞吐的批量处理”，完全做不了低延迟的实时读写。</p>
</li>
</ul>
</li>
</ol>
<h2 id="二、-hdfs-那个年代的最高信仰-算力找数据" tabindex="-1"><a class="header-anchor" href="#二、-hdfs-那个年代的最高信仰-算力找数据"><span>二、 HDFS 那个年代的最高信仰：“算力找数据”</span></a></h2>
<p>理解 HDFS，必须理解它所处年代的硬件背景。十多年前，机房里的网络非常慢（千兆网甚至百兆网），如果让几十台机器跨网络去拉取 10TB 的数据，网卡会当场阵亡。</p>
<p>因此，HDFS 配合它的老搭档 MapReduce 确立了一个核心哲学：<strong>数据不动，代码动（Data Locality，数据本地性）。</strong></p>
<ul>
<li>
<p><strong>它的逻辑是</strong>：既然网络太慢拉不动数据，那我就把 Java 计算代码打包成一个只有几 MB 的小文件，通过网络发送到存放了数据的<strong>那台具体的 DataNode 物理机上</strong>，让代码在本地直接读本地的硬盘。</p>
</li>
<li>
<p>这在当时是神级设计，但这也导致了<strong>存储和计算被死死地绑定在了同一台物理机上</strong>（存算一体）。</p>
</li>
</ul>
<h2 id="三、-为什么在云原生与-ai-时代-hdfs-正在被边缘化" tabindex="-1"><a class="header-anchor" href="#三、-为什么在云原生与-ai-时代-hdfs-正在被边缘化"><span>三、 为什么在云原生与 AI 时代，HDFS 正在被边缘化？</span></a></h2>
<p>现在你在搭建大模型训练平台或 AIOps 平台时，几乎很少会首选新建一个 HDFS 集群，而是转向了我们之前聊过的 <strong>S3/MinIO + JuiceFS + Spark</strong> 的架构。原因在于：</p>
<ol>
<li>
<p><strong>网络的进化打破了旧信仰</strong></p>
<p>现在数据中心的网络动辄 40G、100G 甚至 400G（配合 MLAG 等技术）。网络速度甚至超过了普通硬盘的读取速度。这时候，“算力找数据”没意义了，<strong>存算分离</strong>成了王道。计算归 K8s 里的容器，存储归底层的 MinIO，互不干扰，按需扩容。</p>
</li>
<li>
<p><strong>不堪重负的 NameNode</strong></p>
<p>在深度学习和具身智能场景中，有着动辄几十亿张 100KB 的小图片或小日志文件。HDFS 的 NameNode 内存根本扛不住这么庞大的元数据量。而 TiKV 这种基于硬盘的分布式 KV 引擎，天生就是为了解决这个问题而生的。</p>
</li>
<li>
<p><strong>云原生兼容性极差</strong></p>
<p>HDFS 是一个极其沉重的 Java 生态怪兽，强依赖物理机的静态 IP 和主机名，把它塞进 Kubernetes 的动态容器环境里，维护起来简直是运维人员的噩梦。</p>
</li>
</ol>
<p><strong>总结：</strong></p>
<p>HDFS 是一个划时代的分布式文件系统，它用一己之力撑起了前十年的大数据革命（Hadoop 生态圈）。但在今天讲究弹性、容器化、存算分离的 AI 基建大潮中，它的生态位正在被 <strong>对象存储（MinIO/S3）+ 现代缓存网关（JuiceFS）</strong> 迅速取代。</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};