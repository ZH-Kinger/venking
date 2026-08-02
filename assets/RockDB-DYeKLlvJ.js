import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/data_Infra/%E5%88%86%E5%B8%83%E5%BC%8F%E5%AD%98%E5%82%A8/RockDB.html","title":"RockDB","lang":"zh-CN","frontmatter":{"title":"RockDB","icon":"cpu","date":"2026-07-31T00:00:00.000Z","category":["AI基础设施"],"description":"RocksDB 是一个极其强悍的单机、嵌入式、持久化键值（Key-Value）存储引擎。它最初由 Facebook（现 Meta）基于 Google 开源的 LevelDB 深度定制和优化而来。 如果要在数据库的鄙视链和生态位里给它找个位置，核心在于理解“嵌入式（Embeddable）”和“存储引擎（Storage Engine）”这两个词。 以下为你...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"RockDB\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-31T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/data_Infra/%E5%88%86%E5%B8%83%E5%BC%8F%E5%AD%98%E5%82%A8/RockDB.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"RockDB"}],["meta",{"property":"og:description","content":"RocksDB 是一个极其强悍的单机、嵌入式、持久化键值（Key-Value）存储引擎。它最初由 Facebook（现 Meta）基于 Google 开源的 LevelDB 深度定制和优化而来。 如果要在数据库的鄙视链和生态位里给它找个位置，核心在于理解“嵌入式（Embeddable）”和“存储引擎（Storage Engine）”这两个词。 以下为你..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-31T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.41,"words":1022},"filePathRelative":"posts/AI基础设施/data_Infra/分布式存储/RockDB.md","excerpt":"<p><strong>RocksDB</strong> 是一个极其强悍的<strong>单机、嵌入式、持久化键值（Key-Value）存储引擎</strong>。它最初由 Facebook（现 Meta）基于 Google 开源的 LevelDB 深度定制和优化而来。</p>\\n<p>如果要在数据库的鄙视链和生态位里给它找个位置，核心在于理解“嵌入式（Embeddable）”<strong>和</strong>“存储引擎（Storage Engine）”这两个词。</p>\\n<p>以下为你硬核拆解 RocksDB 的本质以及它的底层黑科技：</p>\\n<h3>一、 它是一台“V8 发动机”，而不是一辆“整车”</h3>","autoDesc":true}`),i={name:`RockDB.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p><strong>RocksDB</strong> 是一个极其强悍的<strong>单机、嵌入式、持久化键值（Key-Value）存储引擎</strong>。它最初由 Facebook（现 Meta）基于 Google 开源的 LevelDB 深度定制和优化而来。</p>
<p>如果要在数据库的鄙视链和生态位里给它找个位置，核心在于理解“嵌入式（Embeddable）”<strong>和</strong>“存储引擎（Storage Engine）”这两个词。</p>
<p>以下为你硬核拆解 RocksDB 的本质以及它的底层黑科技：</p>
<h3 id="一、-它是一台-v8-发动机-而不是一辆-整车" tabindex="-1"><a class="header-anchor" href="#一、-它是一台-v8-发动机-而不是一辆-整车"><span>一、 它是一台“V8 发动机”，而不是一辆“整车”</span></a></h3>
<p>我们平时用的 MySQL、Redis 或者 TiKV，被称为“完整的数据库系统”（整车）。它们拥有网络监听端口、权限管理机制、SQL 解析器或者复杂的分布式协议。</p>
<p><strong>RocksDB 不是一个可以独立运行的服务</strong>。你不能通过 IP 地址和端口去连接一个 RocksDB。</p>
<p>它本质上是一个 <strong>C++ 代码库</strong>。各种分布式数据库（包括 TiKV）在编写代码时，把 RocksDB 像一个零件一样“嵌入”到自己的程序里。</p>
<ul>
<li>
<p>TiKV 负责处理网络请求、Raft 协议复制、分布式锁。</p>
</li>
<li>
<p>当 TiKV 决定要把一行数据真正写入物理硬盘时，它会调用内置的 RocksDB 的接口：<code v-pre>rocksdb-&gt;Put(key, value)</code>。<strong>RocksDB 只负责纯粹的、极限的单机本地硬盘读写。</strong></p>
</li>
</ul>
<h3 id="二、-底层黑科技-lsm-tree-为什么它写数据这么快" tabindex="-1"><a class="header-anchor" href="#二、-底层黑科技-lsm-tree-为什么它写数据这么快"><span>二、 底层黑科技：LSM-Tree（为什么它写数据这么快？）</span></a></h3>
<p>传统的数据库（如早期的 MySQL InnoDB）底层通常使用 <strong>B+ 树</strong> 数据结构。B+ 树在更新数据时，需要去硬盘上找到原来的位置并覆盖它。这就产生大量的<strong>随机写（Random Write）</strong>。而在物理学上，硬盘最怕的就是随机寻道。</p>
<p>RocksDB 抛弃了 B+ 树，采用了极其暴力的 <strong>LSM-Tree（日志结构合并树）</strong> 架构，核心逻辑是“把一切随机写，变成顺序写”：</p>
<ol>
<li>
<p><strong>写内存（MemTable）</strong>：你写入的任何数据，RocksDB 先不往硬盘里写，而是直接写进内存里的一个数据结构（通常是跳表 SkipList）。同时为了防止断电，会在硬盘上顺序追加一条日志（WAL）。</p>
</li>
<li>
<p><strong>冻结与落盘（Flush）</strong>：当内存里的数据达到一定大小（比如 64MB），这块内存会被冻结，然后<strong>一次性、顺序地</strong>变成一个物理文件（SSTable）砸向硬盘。</p>
</li>
<li>
<p><strong>后台合并（Compaction）</strong>：随着硬盘上的 SSTable 文件越来越多，RocksDB 会在后台默默地把这些文件读取出来，合并、排序、清理掉被删除或覆盖的旧数据，再写成更大的新文件。</p>
</li>
</ol>
<p><strong>这种设计的降维打击在于</strong>：把对硬盘的蹂躏降到了最低，极大地压榨了现代 NVMe 固态硬盘（SSD）的极限写入吞吐量。这也让 RocksDB 成为了<strong>写入密集型</strong>场景的绝对王者。</p>
<h3 id="三、-rocksdb-在-tikv-中的生态位" tabindex="-1"><a class="header-anchor" href="#三、-rocksdb-在-tikv-中的生态位"><span>三、 RocksDB 在 TiKV 中的生态位</span></a></h3>
<p>结合我们之前聊到的 TiKV 架构，RocksDB 在里面扮演了最底层的基石角色。</p>
<p>实际上，在一个 TiKV 节点（一台物理机）内部，默默运行着<strong>两个</strong>独立的 RocksDB 实例：</p>
<ol>
<li>
<p><strong>Raft Engine (RocksDB 1)</strong>：专门用来存储 Raft 共识协议产生的操作日志。这要求极低的延迟和极高的追加写入速度。</p>
</li>
<li>
<p><strong>KV Engine (RocksDB 2)</strong>：专门用来存储真正的业务数据（比如 JuiceFS 生成的目录树 Key-Value 映射）。</p>
</li>
</ol>
<h3 id="四、-它的行业地位" tabindex="-1"><a class="header-anchor" href="#四、-它的行业地位"><span>四、 它的行业地位</span></a></h3>
<p>因为其单机性能过于逆天，且代码质量极高，现如今的开源界，只要涉及到“需要把数据存到本地硬盘”，各路大神通常不再自己造轮子，而是直接套用 RocksDB。</p>
<p>它已经成了无数顶级分布式系统背后的“无名英雄”，除了 TiKV，还有：</p>
<ul>
<li>
<p><strong>Apache Kafka</strong> 的 KStreams 状态存储。</p>
</li>
<li>
<p><strong>Apache Flink</strong> 的 Checkpoint 本地状态后端。</p>
</li>
<li>
<p><strong>MySQL</strong> 甚至推出了 MyRocks 引擎（用 RocksDB 替换 InnoDB 来省空间和提速）。</p>
</li>
<li>
<p><strong>Ceph</strong> 底层负责管理本地硬盘存储的 BlueStore 引擎中，也内嵌了 RocksDB 来存放元数据。</p>
</li>
</ul>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};