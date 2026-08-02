import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/data_Infra/%E6%95%B0%E6%8D%AE%E6%B9%96/Spark.html","title":"Spark","lang":"zh-CN","frontmatter":{"title":"Spark","icon":"cpu","date":"2026-07-31T00:00:00.000Z","category":["AI基础设施"],"description":"如果说 MinIO 是存放海量集装箱的“超级仓库”，Parquet 是那些打包得极其严密的“集装箱”，那么在数据湖（Data Lake）架构中，Apache Spark 就是那支在仓库里疯狂运转的“重型挖掘机编队与自动化加工厂”。 在一个纯粹的数据湖架构里，无论是 MinIO 还是底层的 HDFS，它们都是“死”的——只负责无脑存数据。如果没有一个强大...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spark\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-31T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/data_Infra/%E6%95%B0%E6%8D%AE%E6%B9%96/Spark.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"Spark"}],["meta",{"property":"og:description","content":"如果说 MinIO 是存放海量集装箱的“超级仓库”，Parquet 是那些打包得极其严密的“集装箱”，那么在数据湖（Data Lake）架构中，Apache Spark 就是那支在仓库里疯狂运转的“重型挖掘机编队与自动化加工厂”。 在一个纯粹的数据湖架构里，无论是 MinIO 还是底层的 HDFS，它们都是“死”的——只负责无脑存数据。如果没有一个强大..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-31T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.35,"words":1004},"filePathRelative":"posts/AI基础设施/data_Infra/数据湖/Spark.md","excerpt":"<p>如果说 MinIO 是存放海量集装箱的“超级仓库”，Parquet 是那些打包得极其严密的“集装箱”，那么在数据湖（Data Lake）架构中，<strong>Apache Spark 就是那支在仓库里疯狂运转的“重型挖掘机编队与自动化加工厂”。</strong></p>\\n<p>在一个纯粹的数据湖架构里，无论是 MinIO 还是底层的 HDFS，它们都是“死”的——只负责无脑存数据。如果没有一个强大的引擎去清洗、关联和分析这些数据，数据湖就会变成发臭的“数据沼泽（Data Swamp）”。</p>\\n<p>Spark 就是用来让这些死水转动起来的<strong>大规模分布式计算引擎</strong>。在这个体系里，它扮演着以下几个不可替代的硬核角色：</p>","autoDesc":true}`),i={name:`Spark.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>如果说 MinIO 是存放海量集装箱的“超级仓库”，Parquet 是那些打包得极其严密的“集装箱”，那么在数据湖（Data Lake）架构中，<strong>Apache Spark 就是那支在仓库里疯狂运转的“重型挖掘机编队与自动化加工厂”。</strong></p>
<p>在一个纯粹的数据湖架构里，无论是 MinIO 还是底层的 HDFS，它们都是“死”的——只负责无脑存数据。如果没有一个强大的引擎去清洗、关联和分析这些数据，数据湖就会变成发臭的“数据沼泽（Data Swamp）”。</p>
<p>Spark 就是用来让这些死水转动起来的<strong>大规模分布式计算引擎</strong>。在这个体系里，它扮演着以下几个不可替代的硬核角色：</p>
<h2 id="一、-存算分离架构中的-纯粹算力" tabindex="-1"><a class="header-anchor" href="#一、-存算分离架构中的-纯粹算力"><span>一、 存算分离架构中的“纯粹算力”</span></a></h2>
<p>在现代云原生架构中，最讲究的就是<strong>存算分离（Compute-Storage Separation）</strong>。</p>
<ul>
<li>
<p><strong>存储层（Storage）</strong>：MinIO / JuiceFS 负责把 PB 级的数据存下来。</p>
</li>
<li>
<p><strong>计算层（Compute）</strong>：Spark 纯粹由一群 CPU 和内存组成，<strong>它自己不存任何持久化数据</strong>。</p>
</li>
</ul>
<p>当你需要清洗 100TB 的大模型训练数据时，你可以瞬间在 Kubernetes 集群里拉起 100 个 Spark 容器（Executor）。它们通过高速网络并发连接到底层的 MinIO，像群狼一样把 100TB 的 Parquet 文件咬碎、吞进内存里进行分布式计算。算完之后，把结果写回 MinIO，然后这 100 个容器立刻销毁，释放昂贵的 CPU 资源。</p>
<h2 id="二、-降维打击单机瓶颈-为什么不用-python-pandas" tabindex="-1"><a class="header-anchor" href="#二、-降维打击单机瓶颈-为什么不用-python-pandas"><span>二、 降维打击单机瓶颈（为什么不用 Python/Pandas？）</span></a></h2>
<p>在处理日常数据时，用 Python 的 Pandas 库非常方便。但到了数据湖的规模，单机内存的物理极限就是死穴。</p>
<p>假设你有一个 500GB 的日志文件需要过滤错误代码：</p>
<ul>
<li>
<p><strong>Pandas 的死局</strong>：你的服务器只有 128GB 内存。Pandas 试图把 500GB 数据全塞进内存，服务器直接 OOM（Out of Memory）崩溃死机。</p>
</li>
<li>
<p><strong>Spark 的魔法（RDD/DataFrame）</strong>：Spark 知道数据太大。它会在主节点（Driver）把这个 500GB 的任务，极其聪明地切分成 10,000 个小任务。然后分发给下面 50 个工作节点（Worker），每个节点每次只读几十 MB 的 Parquet 块进内存，算完就扔，算完就扔。理论上，<strong>只要集群足够大，Spark 可以处理无限大的数据量</strong>。</p>
</li>
</ul>
<h2 id="三、-数据湖里的-净水器-etl-流水线核心" tabindex="-1"><a class="header-anchor" href="#三、-数据湖里的-净水器-etl-流水线核心"><span>三、 数据湖里的“净水器”（ETL 流水线核心）</span></a></h2>
<p>数据湖的一大特点是“来者不拒”，什么脏数据、乱码 JSON、半结构化日志都可以往里扔。但在喂给 AIOps 模型或者大语言模型之前，必须有一套极度强悍的流水线（ETL：提取、转换、加载）来做清洗。</p>
<p>在实战中，Spark 就是这条流水线的绝对核心：</p>
<ol>
<li>
<p><strong>Extract（提取）</strong>：Spark 并发读取 MinIO 里从 Kafka 倒进来的、几百 GB 乱七八糟的原始 JSON 日志。</p>
</li>
<li>
<p><strong>Transform（转换）</strong>：在内存里极其暴力地进行去重、拆分字段、把 IP 地址映射成城市、丢弃报错记录。</p>
</li>
<li>
<p><strong>Load（加载）</strong>：<strong>最关键的一步</strong>，Spark 把洗得干干净净的数据，按照最佳的压缩比和严格的 Schema，<strong>转换成 Apache Parquet 格式</strong>，整整齐齐地写回 JuiceFS/MinIO 里的“干净数据区（Gold Zone）”。</p>
</li>
</ol>
<h2 id="四、-内存计算的霸主地位" tabindex="-1"><a class="header-anchor" href="#四、-内存计算的霸主地位"><span>四、 内存计算的霸主地位</span></a></h2>
<p>在 Spark 诞生之前，大数据界的老大是 Hadoop 的 MapReduce。但 MapReduce 极度依赖硬盘——它每算完一步，就要把中间结果写回硬盘，下一步再从硬盘读出来，速度慢得令人发指。</p>
<p>Spark 的革命性创新在于<strong>基于内存的分布式计算</strong>。只要内存足够大，它会把所有的中间结果死死按在内存里，直到全部算完才最终落盘。在涉及到大模型的迭代训练数据准备、或是 AIOps 的复杂图关联分析时，Spark 的速度比传统的 MapReduce 快 10 到 100 倍。</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};