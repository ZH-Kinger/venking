import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/%E5%A4%A7%E6%A8%A1%E5%9E%8B%E6%8A%80%E6%9C%AF/%E6%95%B0%E6%8D%AE%E7%AE%A1%E7%BA%BF(Data_Pipeline)/%E6%95%B0%E6%8D%AE%E6%A0%BC%E5%BC%8F/Apache%20Parquet.html","title":"Apache Parquet","lang":"zh-CN","frontmatter":{"title":"Apache Parquet","icon":"cpu","date":"2026-07-31T00:00:00.000Z","category":["AI基础设施"],"description":"如果说 JSON 和 CSV 是写给人类看的“流水账”，那么 Apache Parquet 就是专门给计算集群和 AI 引擎设计的“高度压缩机密档案”。 要深刻理解它“是什么、怎么样、为什么要用”，我们直接把它放到一个高并发、大吞吐的实战场景中来拆解。 一、 Apache Parquet 是什么？（物理结构揭秘） Parquet 是一种开源的、面向列式...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Apache Parquet\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/Pasted%20image%2020260730164314.png\\"],\\"datePublished\\":\\"2026-07-31T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/%E5%A4%A7%E6%A8%A1%E5%9E%8B%E6%8A%80%E6%9C%AF/%E6%95%B0%E6%8D%AE%E7%AE%A1%E7%BA%BF(Data_Pipeline)/%E6%95%B0%E6%8D%AE%E6%A0%BC%E5%BC%8F/Apache%20Parquet.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"Apache Parquet"}],["meta",{"property":"og:description","content":"如果说 JSON 和 CSV 是写给人类看的“流水账”，那么 Apache Parquet 就是专门给计算集群和 AI 引擎设计的“高度压缩机密档案”。 要深刻理解它“是什么、怎么样、为什么要用”，我们直接把它放到一个高并发、大吞吐的实战场景中来拆解。 一、 Apache Parquet 是什么？（物理结构揭秘） Parquet 是一种开源的、面向列式..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/Pasted%20image%2020260730164314.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-31T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":4.25,"words":1276},"filePathRelative":"posts/AI基础设施/学习计划/大模型技术/数据管线(Data_Pipeline)/数据格式/Apache Parquet.md","excerpt":"<p>如果说 JSON 和 CSV 是写给人类看的“流水账”，那么 <strong>Apache Parquet 就是专门给计算集群和 AI 引擎设计的“高度压缩机密档案”。</strong></p>\\n<p>要深刻理解它“是什么、怎么样、为什么要用”，我们直接把它放到一个高并发、大吞吐的实战场景中来拆解。<br>\\n<img src=\\"/blog/assets/posts/Pasted%20image%2020260730164314.png\\" alt loading=\\"lazy\\"></p>\\n<h3>一、 Apache Parquet 是什么？（物理结构揭秘）</h3>\\n<p>Parquet 是一种<strong>开源的、面向列式存储的文件格式</strong>。但它的“列式”并不是简单地把一列数据写在一起，而是有着极其精密的内部层级划分。</p>","autoDesc":true}`),i={name:`Apache Parquet.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>如果说 JSON 和 CSV 是写给人类看的“流水账”，那么 <strong>Apache Parquet 就是专门给计算集群和 AI 引擎设计的“高度压缩机密档案”。</strong></p>
<p>要深刻理解它“是什么、怎么样、为什么要用”，我们直接把它放到一个高并发、大吞吐的实战场景中来拆解。<br>
<img src="/blog/assets/posts/Pasted%20image%2020260730164314.png" alt="" loading="lazy"></p>
<h3 id="一、-apache-parquet-是什么-物理结构揭秘" tabindex="-1"><a class="header-anchor" href="#一、-apache-parquet-是什么-物理结构揭秘"><span>一、 Apache Parquet 是什么？（物理结构揭秘）</span></a></h3>
<p>Parquet 是一种<strong>开源的、面向列式存储的文件格式</strong>。但它的“列式”并不是简单地把一列数据写在一起，而是有着极其精密的内部层级划分。</p>
<p>如果你用十六进制编辑器打开一个 <code v-pre>.parquet</code> 文件，你会发现它由以下三个核心物理层级构成：</p>
<ol>
<li>
<p><strong>Row Group（行组）</strong>：</p>
<p>Parquet 在宏观上依然是“按行”切分的。比如一亿条数据，它会每 100 万行切成一个 Row Group。这保证了在分布式计算时，不同的机器可以并行去拉取不同的 Row Group。</p>
</li>
<li>
<p><strong>Column Chunk（列块）</strong>：</p>
<p>在每一个 Row Group 内部，数据才是真正<strong>按列存放</strong>的。如果你有 50 个字段，这里就有 50 个 Column Chunk。</p>
</li>
<li>
<p><strong>Page（数据页）</strong>：</p>
<p>这是 Parquet 最小的物理存储单元（通常是 1MB 左右）。每一个 Column Chunk 会被切分成多个 Page，并且<strong>数据的压缩和编码都是在 Page 级别完成的</strong>。</p>
</li>
</ol>
<p><strong>最核心的灵魂：Footer（尾部元数据）</strong></p>
<p>Parquet 文件的最后一部分是 Footer。这里极其详尽地记录了每一个 Row Group 在文件中的字节偏移量、每一列的最大值/最小值、以及有多少个 Null 值。查询引擎读取数据前，永远会先读 Footer。</p>
<h3 id="二、-为什么要用它-aiops-与智能预警平台的实战推演" tabindex="-1"><a class="header-anchor" href="#二、-为什么要用它-aiops-与智能预警平台的实战推演"><span>二、 为什么要用它？（AIOps 与智能预警平台的实战推演）</span></a></h3>
<p>想象一下这样的架构场景：你正在搭建一个<strong>分布式智能日志分析与 AIOps 预警平台</strong>。前端 Kafka 每天都在疯狂吞吐着数百 GB 甚至 TB 级的业务 JSON 日志，同时 Prometheus 也在不断生成海量的监控指标。</p>
<p>如果你把这些从 Kafka 消费出来的数据直接以 JSON 或文本格式落盘存入底层的分布式存储，系统很快就会面临灾难。而引入 Parquet 作为落盘格式，会带来三大降维打击般的优势：</p>
<h4 id="_1-极其暴力的存储降本-省硬盘、省网络" tabindex="-1"><a class="header-anchor" href="#_1-极其暴力的存储降本-省硬盘、省网络"><span>1. 极其暴力的存储降本（省硬盘、省网络）</span></a></h4>
<p>日志数据中存在着极其可怕的“冗余”。比如 <code v-pre>level: &quot;INFO&quot;</code> 这个键值对，或者某个相同的微服务 IP 地址，在一天内可能会重复出现几千万次。</p>
<ul>
<li>
<p><strong>传统 JSON</strong>：重复记录几千万次字符串，白白吞噬硬盘。</p>
</li>
<li>
<p><strong>Parquet</strong>：因为它把同一列（比如 <code v-pre>level</code> 列）的数据全放在同一个 Page 里，它可以极其轻松地使用<strong>字典编码（Dictionary Encoding）</strong>。它只存一个字典（<code v-pre>0=&quot;INFO&quot;, 1=&quot;ERROR&quot;</code>），剩下的几千万行全存成微小的数字 <code v-pre>0</code>。</p>
</li>
<li>
<p><strong>结果</strong>：100GB 的原始 Kafka 日志，写成 Parquet 后，通常会瞬间被压缩到 <strong>10GB 甚至更小</strong>。</p>
</li>
</ul>
<h4 id="_2-查询性能的绝地反击-谓词下推" tabindex="-1"><a class="header-anchor" href="#_2-查询性能的绝地反击-谓词下推"><span>2. 查询性能的绝地反击（谓词下推）</span></a></h4>
<p>当 AIOps 平台的预测模型需要分析历史数据，或者你要紧急排查线上故障，执行了类似这样的查询：<em>“找出过去三天内，<code v-pre>host_ip</code> 为 <code v-pre>10.0.0.5</code> 并且 <code v-pre>error_code</code> 大于 <code v-pre>500</code> 的所有日志。”</em></p>
<ul>
<li>
<p><strong>传统做法</strong>：把过去三天所有的日志全从硬盘读进内存，逐行用 CPU 解析 JSON，再用正则匹配。GPU 和 CPU 全在等极其缓慢的 I/O。</p>
</li>
<li>
<p><strong>Parquet 的魔法（Predicate Pushdown）</strong>：查询引擎先读取 Parquet 文件的 Footer。</p>
<ul>
<li>
<p>首先，它发现只要 <code v-pre>host_ip</code> 和 <code v-pre>error_code</code> 两列，于是它在物理层面上<strong>直接跳过了其他 90 多列</strong>的读取。</p>
</li>
<li>
<p>其次，它看了一眼 Footer 里的统计信息，发现前 50 个 Row Group 里 <code v-pre>error_code</code> 的最大值只有 404。于是，引擎<strong>连这 50 个块的硬盘都不碰</strong>，直接略过。</p>
</li>
</ul>
</li>
<li>
<p><strong>结果</strong>：原本需要扫描几十 GB 数据的任务，最终只读取了几 MB 的核心数据块，查询在毫秒级完成响应。</p>
</li>
</ul>
<h4 id="_3-强类型的-schema-演进-向后兼容" tabindex="-1"><a class="header-anchor" href="#_3-强类型的-schema-演进-向后兼容"><span>3. 强类型的 Schema 演进（向后兼容）</span></a></h4>
<p>在敏捷迭代的 DevOps 流程中，日志格式是经常变的（比如今天加了一个 <code v-pre>trace_id</code> 字段，明天删了一个 <code v-pre>user_tag</code> 字段）。</p>
<p>Parquet 原生支持 <strong>Schema Evolution（模式演进）</strong>。由于它严格定义了每一列的数据类型，在处理新旧日志文件混合查询时，它可以自动用 <code v-pre>Null</code> 填充缺失的列，或者智能合并结构，绝不会像普通文本解析那样直接报错宕机。</p>
<h3 id="三、-总结" tabindex="-1"><a class="header-anchor" href="#三、-总结"><span>三、 总结</span></a></h3>
<p>在现代的数据流水线架构中：</p>
<ul>
<li>
<p><strong>Kafka</strong> 负责数据的<strong>缓冲与流转</strong>。</p>
</li>
<li>
<p><strong>TiKV / Redis</strong> 负责状态的<strong>极速点查</strong>。</p>
</li>
<li>
<p><strong>Apache Parquet</strong> 则是所有数据最终沉淀到数据湖（如 MinIO）时的<strong>终极封印形态</strong>。它用极其复杂的写入过程，换取了未来无数次查询的极致效率。</p>
</li>
</ul>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};