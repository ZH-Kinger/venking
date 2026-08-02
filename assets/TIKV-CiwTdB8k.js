import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/data_Infra/%E5%88%86%E5%B8%83%E5%BC%8F%E5%AD%98%E5%82%A8/TIKV.html","title":"TIKV","lang":"zh-CN","frontmatter":{"title":"TIKV","icon":"cpu","date":"2026-07-31T00:00:00.000Z","category":["AI基础设施"],"description":"在上一节剖析 JuiceFS 的架构时，我提到在海量规模下，JuiceFS 的元数据引擎会从 Redis 切换为 TiKV。 如果用一句话来定义它：TiKV 是一个开源的、分布式的、支持强一致性和分布式事务的键值（Key-Value）数据库。 它由著名的国产开源团队 PingCAP 打造，目前已经是云原生计算基金会（CNCF）的顶级毕业项目。 如果说 ...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"TIKV\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-31T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/data_Infra/%E5%88%86%E5%B8%83%E5%BC%8F%E5%AD%98%E5%82%A8/TIKV.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"TIKV"}],["meta",{"property":"og:description","content":"在上一节剖析 JuiceFS 的架构时，我提到在海量规模下，JuiceFS 的元数据引擎会从 Redis 切换为 TiKV。 如果用一句话来定义它：TiKV 是一个开源的、分布式的、支持强一致性和分布式事务的键值（Key-Value）数据库。 它由著名的国产开源团队 PingCAP 打造，目前已经是云原生计算基金会（CNCF）的顶级毕业项目。 如果说 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-31T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":4.35,"words":1305},"filePathRelative":"posts/AI基础设施/data_Infra/分布式存储/TIKV.md","excerpt":"<p>在上一节剖析 JuiceFS 的架构时，我提到在海量规模下，JuiceFS 的元数据引擎会从 Redis 切换为 <strong>TiKV</strong>。</p>\\n<p>如果用一句话来定义它：<strong>TiKV 是一个开源的、分布式的、支持强一致性和分布式事务的键值（Key-Value）数据库。</strong> 它由著名的国产开源团队 PingCAP 打造，目前已经是云原生计算基金会（CNCF）的顶级毕业项目。</p>\\n<p>如果说 Redis 是跑在单机内存里的“顶级跑车”（极速但容量受限且容易丢数据），那么 <strong>TiKV 就是一列可以无限加挂车厢的“重型高铁”</strong>（跑在 SSD 上，容量无限扩展，且数据绝对不会错）。</p>","autoDesc":true}`),i={name:`TIKV.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在上一节剖析 JuiceFS 的架构时，我提到在海量规模下，JuiceFS 的元数据引擎会从 Redis 切换为 <strong>TiKV</strong>。</p>
<p>如果用一句话来定义它：<strong>TiKV 是一个开源的、分布式的、支持强一致性和分布式事务的键值（Key-Value）数据库。</strong> 它由著名的国产开源团队 PingCAP 打造，目前已经是云原生计算基金会（CNCF）的顶级毕业项目。</p>
<p>如果说 Redis 是跑在单机内存里的“顶级跑车”（极速但容量受限且容易丢数据），那么 <strong>TiKV 就是一列可以无限加挂车厢的“重型高铁”</strong>（跑在 SSD 上，容量无限扩展，且数据绝对不会错）。</p>
<p>以下为你硬核拆解 TiKV 的底层架构和核心黑科技：</p>
<h3 id="一、-tikv-的三层核心架构" tabindex="-1"><a class="header-anchor" href="#一、-tikv-的三层核心架构"><span>一、 TiKV 的三层核心架构</span></a></h3>
<p>TiKV 的设计极为优雅，它把极其复杂的分布式存储问题，拆解成了三个高度解耦的模块：</p>
<h4 id="_1-单机存储引擎-rocksdb-扎马步" tabindex="-1"><a class="header-anchor" href="#_1-单机存储引擎-rocksdb-扎马步"><span>1. 单机存储引擎：RocksDB（扎马步）</span></a></h4>
<p>TiKV 不会自己去造单机读写硬盘的轮子。在每一个 TiKV 节点（物理机）的底层，它直接内嵌了 Facebook 开源的单机存储引擎之王——<strong>RocksDB</strong>。</p>
<p>你存入 TiKV 的任何 Key-Value 数据，最终都是交由底层这块石头（RocksDB）以 LSM-Tree（日志结构合并树）的数据结构，死死地刻在本地的 NVMe 闪存盘上。</p>
<h4 id="_2-分布式共识层-multi-raft-分身术" tabindex="-1"><a class="header-anchor" href="#_2-分布式共识层-multi-raft-分身术"><span>2. 分布式共识层：Multi-Raft（分身术）</span></a></h4>
<p>单机存数据容易，但如果机器炸了怎么办？必须做多副本。TiKV 采用了大名鼎鼎的 <strong>Raft 共识算法</strong>。</p>
<ul>
<li>
<p><strong>传统痛点</strong>：如果你把一万 TB 数据当成一个整体去跑 Raft，系统早就卡死了。</p>
</li>
<li>
<p><strong>TiKV 的魔法（Multi-Raft）</strong>：TiKV 会把所有的 Key 按照顺序切分成无数个连续的切片，每个切片叫做一个 <strong>Region</strong>（默认 96MB）。</p>
<p>然后，TiKV 为<strong>每一个 Region 独立运行一套 Raft 协议</strong>。你的集群里可能有几十万个 Region，就有几十万个互不干扰的 Raft 副本组在并行工作。如果某台机器宕机，只会影响它上面的那部分 Region，其他 Region 瞬间就会在别的机器上选出新的 Leader 接管读写，整个过程对上层完全透明。</p>
</li>
</ul>
<h4 id="_3-智能调度中心-placement-driver-pd-总指挥" tabindex="-1"><a class="header-anchor" href="#_3-智能调度中心-placement-driver-pd-总指挥"><span>3. 智能调度中心：Placement Driver (PD)（总指挥）</span></a></h4>
<p>当你的集群达到几百台服务器、几百万个 Region 时，数据放在哪台机器上最合适？如果某台机器快被撑爆了怎么办？</p>
<p>TiKV 架构中有一个独立的大脑叫做 <strong>PD (Placement Driver)</strong>。它在全局俯瞰整个集群：</p>
<ul>
<li>
<p><strong>负载均衡</strong>：如果 PD 发现 A 机器的 Region 太多，它会自动指挥把部分 Region 悄悄搬迁到比较空的 B 机器上。</p>
</li>
<li>
<p><strong>热点打散</strong>：如果某个文件（Key）突然被疯狂读取（比如大模型训练瞬间同时读取某个 Manifest 账本），PD 会立刻发现这个“热点 Region”，并把它分裂、打散到多台机器上，用整个集群的吞吐去扛这个热点。</p>
</li>
</ul>
<h3 id="二、-终极杀手锏-分布式-acid-事务-percolator-模型" tabindex="-1"><a class="header-anchor" href="#二、-终极杀手锏-分布式-acid-事务-percolator-模型"><span>二、 终极杀手锏：分布式 ACID 事务 (Percolator 模型)</span></a></h3>
<p>这是 TiKV 区别于普通 NoSQL（比如 Cassandra 或 HBase）最强悍的地方。</p>
<p>在分布式系统里，假设你要同时修改 A 机器上的 Key1 和 B 机器上的 Key2。如果 Key1 修改成功了，但在修改 Key2 时网络断了，数据就产生了“撕裂”。</p>
<p>TiKV 基于 Google 的 <strong>Percolator 事务模型</strong> 实现了强一致性的分布式事务。它引入了全局的时间戳（TSO），保证了跨机器的多次修改，要么<strong>全部成功</strong>，要么<strong>全部回滚（撤销）</strong>。这让 TiKV 拥有了媲美传统关系型数据库（MySQL/Oracle）级别的数据安全性。</p>
<h3 id="三、-tikv-在你的云原生架构中-juicefs-场景-扮演什么角色" tabindex="-1"><a class="header-anchor" href="#三、-tikv-在你的云原生架构中-juicefs-场景-扮演什么角色"><span>三、 TiKV 在你的云原生架构中（JuiceFS 场景）扮演什么角色？</span></a></h3>
<p>回到我们之前的 DataOps 与 AI 存储架构中。</p>
<p>如果你使用 JuiceFS 管理大模型数据，初期用 Redis 当元数据引擎非常爽，因为快。但当你积累了 10 亿张图片（10 亿个文件）时，Redis 的痛点就爆发了：</p>
<ol>
<li>
<p><strong>内存撑爆</strong>：10 亿个文件的目录树，大概需要吞噬几百 GB 甚至上 TB 的纯内存，硬件成本极其昂贵。</p>
</li>
<li>
<p><strong>宕机灾难</strong>：Redis 哪怕做了 RDB/AOF 持久化，在海量数据下重启恢复也需要很久，甚至可能丢失最后一秒的元数据（导致你的 OSS 孤儿文件泛滥）。</p>
</li>
</ol>
<p><strong>这时候，你只需在后台把 JuiceFS 的元数据引擎从 Redis 零缝隙切换为 TiKV：</strong></p>
<ul>
<li>
<p><strong>成本骤降</strong>：TiKV 的数据是存在本地 NVMe 盘（RocksDB）上的，不再吞噬昂贵的内存空间。</p>
</li>
<li>
<p><strong>无限扩展</strong>：10 亿个文件？100 亿个文件？没关系，加几台普通的物理机，TiKV 的 PD 会自动把新产生的元数据 Region 调度到新机器上，容量无上限。</p>
</li>
<li>
<p><strong>绝对安全</strong>：依靠 Multi-Raft 和分布式事务，即使你直接拔掉两台服务器的电源，JuiceFS 的文件目录结构和权限属性也绝对不会产生一丝一毫的混乱。</p>
</li>
</ul>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};