import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E8%B7%B3%E5%8A%A8%E8%BF%90%E7%BB%B4%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88%E9%9D%A2%E8%AF%95%E5%87%86%E5%A4%87%E6%8C%87%E5%8D%97(%E9%80%82%E9%85%8D%E4%BD%A0%E7%9A%84%E7%AE%80%E5%8E%86%E8%83%8C%E6%99%AF)/mysql%E5%A4%8D%E4%B9%A0/%E9%9D%A2%E8%AF%95%E4%B8%AD%E5%B8%B8%E8%A7%81%E7%9A%84%E9%97%AE%E9%A2%98.html","title":"面试中常见的问题","lang":"zh-CN","frontmatter":{"title":"面试中常见的问题","icon":"clipboard-text","date":"2026-07-23T00:00:00.000Z","category":["面试"],"description":"在 MySQL 的面试中，面试官通常会从索引、事务、锁、架构、调优这五个核心维度进行深挖。为了帮你应对，我整理了一份高频面试题集锦： 一、 索引相关（最核心） 索引是面试的重灾区，考察的是你对底层数据结构的理解。 为什么 MySQL 使用 B+ 树，而不是二叉树、红黑树或哈希表？ B+ 树对比二叉树/红黑树： 树的高度更低，磁盘 I/O 次数更少。 B...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"面试中常见的问题\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E8%B7%B3%E5%8A%A8%E8%BF%90%E7%BB%B4%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88%E9%9D%A2%E8%AF%95%E5%87%86%E5%A4%87%E6%8C%87%E5%8D%97(%E9%80%82%E9%85%8D%E4%BD%A0%E7%9A%84%E7%AE%80%E5%8E%86%E8%83%8C%E6%99%AF)/mysql%E5%A4%8D%E4%B9%A0/%E9%9D%A2%E8%AF%95%E4%B8%AD%E5%B8%B8%E8%A7%81%E7%9A%84%E9%97%AE%E9%A2%98.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"面试中常见的问题"}],["meta",{"property":"og:description","content":"在 MySQL 的面试中，面试官通常会从索引、事务、锁、架构、调优这五个核心维度进行深挖。为了帮你应对，我整理了一份高频面试题集锦： 一、 索引相关（最核心） 索引是面试的重灾区，考察的是你对底层数据结构的理解。 为什么 MySQL 使用 B+ 树，而不是二叉树、红黑树或哈希表？ B+ 树对比二叉树/红黑树： 树的高度更低，磁盘 I/O 次数更少。 B..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.01,"words":903},"filePathRelative":"posts/面试/字节面试/字节跳动运维开发工程师面试准备指南(适配你的简历背景)/mysql复习/面试中常见的问题.md","excerpt":"<p>在 MySQL 的面试中，面试官通常会从<strong>索引、事务、锁、架构、调优</strong>这五个核心维度进行深挖。为了帮你应对，我整理了一份高频面试题集锦：</p>\\n<hr>\\n<h2>一、 索引相关（最核心）</h2>\\n<p>索引是面试的重灾区，考察的是你对底层数据结构的理解。</p>\\n<ul>\\n<li>\\n<p><strong>为什么 MySQL 使用 B+ 树，而不是二叉树、红黑树或哈希表？</strong></p>\\n</li>\\n<li>\\n<p><strong>B+ 树对比二叉树/红黑树：</strong> 树的高度更低，磁盘 I/O 次数更少。</p>\\n</li>\\n<li>\\n<p><strong>B+ 树对比 B 树：</strong> 非叶子节点不存数据，能容纳更多索引，查询更稳定；叶子节点通过双向链表连接，范围查询极强。</p>\\n</li>\\n<li>\\n<p><strong>B+ 树对比哈希表：</strong> 哈希只适合等值查询，不支持范围查询和排序。</p>\\n</li>\\n<li>\\n<p><strong>聚簇索引与非聚簇索引的区别？</strong></p>\\n</li>\\n<li>\\n<p><strong>聚簇索引：</strong> 数据和索引存在一起（叶子节点就是行数据），一个表只能有一个（通常是主键）。</p>\\n</li>\\n<li>\\n<p><strong>非聚簇索引（二级索引）：</strong> 叶子节点存的是主键值。查非聚簇索引通常需要“回表”。</p>\\n</li>\\n<li>\\n<p><strong>什么是回表？如何减少回表？</strong></p>\\n</li>\\n<li>\\n<p><strong>回表：</strong> 先查二级索引找到主键，再用主键去聚簇索引查完整行数据。</p>\\n</li>\\n<li>\\n<p><strong>优化：</strong> 使用<strong>覆盖索引</strong>（索引包含查询所需的所有字段），直接在索引树上返回结果。</p>\\n</li>\\n</ul>","autoDesc":true}`),i={name:`面试中常见的问题.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在 MySQL 的面试中，面试官通常会从<strong>索引、事务、锁、架构、调优</strong>这五个核心维度进行深挖。为了帮你应对，我整理了一份高频面试题集锦：</p>
<hr>
<h2 id="一、-索引相关-最核心" tabindex="-1"><a class="header-anchor" href="#一、-索引相关-最核心"><span>一、 索引相关（最核心）</span></a></h2>
<p>索引是面试的重灾区，考察的是你对底层数据结构的理解。</p>
<ul>
<li>
<p><strong>为什么 MySQL 使用 B+ 树，而不是二叉树、红黑树或哈希表？</strong></p>
</li>
<li>
<p><strong>B+ 树对比二叉树/红黑树：</strong> 树的高度更低，磁盘 I/O 次数更少。</p>
</li>
<li>
<p><strong>B+ 树对比 B 树：</strong> 非叶子节点不存数据，能容纳更多索引，查询更稳定；叶子节点通过双向链表连接，范围查询极强。</p>
</li>
<li>
<p><strong>B+ 树对比哈希表：</strong> 哈希只适合等值查询，不支持范围查询和排序。</p>
</li>
<li>
<p><strong>聚簇索引与非聚簇索引的区别？</strong></p>
</li>
<li>
<p><strong>聚簇索引：</strong> 数据和索引存在一起（叶子节点就是行数据），一个表只能有一个（通常是主键）。</p>
</li>
<li>
<p><strong>非聚簇索引（二级索引）：</strong> 叶子节点存的是主键值。查非聚簇索引通常需要“回表”。</p>
</li>
<li>
<p><strong>什么是回表？如何减少回表？</strong></p>
</li>
<li>
<p><strong>回表：</strong> 先查二级索引找到主键，再用主键去聚簇索引查完整行数据。</p>
</li>
<li>
<p><strong>优化：</strong> 使用<strong>覆盖索引</strong>（索引包含查询所需的所有字段），直接在索引树上返回结果。</p>
</li>
</ul>
<hr>
<h2 id="二、-事务与并发-acid" tabindex="-1"><a class="header-anchor" href="#二、-事务与并发-acid"><span>二、 事务与并发（ACID）</span></a></h2>
<p>考察你对数据一致性保证的理解。</p>
<ul>
<li>
<p><strong>ACID 特性是如何实现的？</strong></p>
</li>
<li>
<p><strong>原子性 (A)：</strong> 通过 <code v-pre>undo log</code>（回滚日志）实现。</p>
</li>
<li>
<p><strong>一致性 (C)：</strong> 数据库的核心目标，由其他三个特性共同保证。</p>
</li>
<li>
<p><strong>隔离性 (I)：</strong> 通过锁机制和 <code v-pre>MVCC</code> 实现。</p>
</li>
<li>
<p><strong>持久性 (D)：</strong> 通过 <code v-pre>redo log</code>（重做日志）实现。</p>
</li>
<li>
<p><strong>事务的隔离级别有哪些？MySQL 默认是什么？</strong></p>
</li>
</ul>
<ol>
<li>读未提交 (Read Uncommitted)</li>
<li>读已提交 (Read Committed)</li>
<li>可重复读 (<strong>Repeatable Read</strong>, MySQL 默认)</li>
<li>串行化 (Serializable)</li>
</ol>
<ul>
<li>
<p><strong>什么是 MVCC（多版本并发控制）？</strong></p>
</li>
<li>
<p>通过 ReadView 和记录中的隐藏字段（<code v-pre>trx_id</code>, <code v-pre>roll_ptr</code>）来实现。它让读写不冲突，提高了并发性能。</p>
</li>
</ul>
<hr>
<h2 id="三、-锁机制" tabindex="-1"><a class="header-anchor" href="#三、-锁机制"><span>三、 锁机制</span></a></h2>
<ul>
<li>
<p><strong>表级锁 vs 行级锁：</strong> InnoDB 支持行锁，开销大但并发高；MyISAM 仅支持表锁。</p>
</li>
<li>
<p><strong>乐观锁 vs 悲观锁：</strong> * <strong>悲观锁：</strong> 假定一定会冲突，操作数据前先加锁（如 <code v-pre>SELECT ... FOR UPDATE</code>）。</p>
</li>
<li>
<p><strong>乐观锁：</strong> 假定不会冲突，只在提交时检查版本号（通常用 <code v-pre>version</code> 字段）。</p>
</li>
<li>
<p><strong>间隙锁 (Gap Lock) 的作用？</strong></p>
</li>
<li>
<p>在“可重复读”级别下，防止幻读。</p>
</li>
</ul>
<hr>
<h2 id="四、-日志与高可用" tabindex="-1"><a class="header-anchor" href="#四、-日志与高可用"><span>四、 日志与高可用</span></a></h2>
<ul>
<li>
<p><strong>binlog、redo log、undo log 的区别？</strong></p>
</li>
<li>
<p><strong>binlog（归档日志）：</strong> Server 层产生，用于主从同步和数据恢复。</p>
</li>
<li>
<p><strong>redo log（重做日志）：</strong> InnoDB 引擎产生，物理日志，保证崩溃后的数据持久化。</p>
</li>
<li>
<p><strong>undo log（回滚日志）：</strong> 用于事务回滚和 MVCC。</p>
</li>
<li>
<p><strong>主从复制的原理？</strong></p>
</li>
</ul>
<ol>
<li>主库记录 binlog。</li>
<li>从库 I/O 线程读取 binlog 写入中继日志（relay log）。</li>
<li>从库 SQL 线程重放 relay log。</li>
</ol>
<hr>
<h2 id="五、-sql-优化-实战向" tabindex="-1"><a class="header-anchor" href="#五、-sql-优化-实战向"><span>五、 SQL 优化（实战向）</span></a></h2>
<ul>
<li>
<p><strong>如何定位慢查询？</strong></p>
</li>
<li>
<p>开启 <code v-pre>slow_query_log</code>，使用 <code v-pre>mysqldumpslow</code> 工具分析。</p>
</li>
<li>
<p><strong>Explain 命令关注哪些字段？</strong></p>
</li>
<li>
<p><code v-pre>type</code>：连接类型（<code v-pre>const</code> &gt; <code v-pre>eq_ref</code> &gt; <code v-pre>ref</code> &gt; <code v-pre>range</code> &gt; <code v-pre>index</code> &gt; <code v-pre>ALL</code>）。要求至少达到 <code v-pre>range</code> 级别。</p>
</li>
<li>
<p><code v-pre>key</code>：实际用到的索引。</p>
</li>
<li>
<p><code v-pre>rows</code>：预计扫描的行数。</p>
</li>
<li>
<p><code v-pre>Extra</code>：是否出现 <code v-pre>Using filesort</code> 或 <code v-pre>Using temporary</code>（这两个很慢）。</p>
</li>
<li>
<p><strong>索引失效的情况有哪些？</strong></p>
</li>
<li>
<p>对索引列做运算（<code v-pre>ID + 1 = 10</code>）。</p>
</li>
<li>
<p>左模糊查询（<code v-pre>LIKE '%abc'</code>）。</p>
</li>
<li>
<p>不符合最左前缀原则（复合索引）。</p>
</li>
<li>
<p>类型转换（字符串不加引号）。</p>
</li>
</ul>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};