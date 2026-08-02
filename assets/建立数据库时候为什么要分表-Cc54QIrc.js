import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E8%B7%B3%E5%8A%A8%E8%BF%90%E7%BB%B4%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88%E9%9D%A2%E8%AF%95%E5%87%86%E5%A4%87%E6%8C%87%E5%8D%97(%E9%80%82%E9%85%8D%E4%BD%A0%E7%9A%84%E7%AE%80%E5%8E%86%E8%83%8C%E6%99%AF)/mysql%E5%A4%8D%E4%B9%A0/%E5%BB%BA%E7%AB%8B%E6%95%B0%E6%8D%AE%E5%BA%93%E6%97%B6%E5%80%99%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E5%88%86%E8%A1%A8.html","title":"建立数据库时候为什么要分表","lang":"zh-CN","frontmatter":{"title":"建立数据库时候为什么要分表","icon":"clipboard-text","date":"2026-07-23T00:00:00.000Z","category":["面试"],"description":"在数据库设计中，分表（Sharding / Partitioning） 主要是为了解决由“大数据量”和“高并发”带来的性能瓶颈。当一张表的数据达到千万甚至亿级时，查询和写入的效率会断崖式下跌。 分表通常分为垂直分表和水平分表两种逻辑： 1. 垂直分表 (Vertical Splitting) 做法： 把一张有很多字段的表，拆分成多张表，每张表存储一部分...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"建立数据库时候为什么要分表\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E8%B7%B3%E5%8A%A8%E8%BF%90%E7%BB%B4%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88%E9%9D%A2%E8%AF%95%E5%87%86%E5%A4%87%E6%8C%87%E5%8D%97(%E9%80%82%E9%85%8D%E4%BD%A0%E7%9A%84%E7%AE%80%E5%8E%86%E8%83%8C%E6%99%AF)/mysql%E5%A4%8D%E4%B9%A0/%E5%BB%BA%E7%AB%8B%E6%95%B0%E6%8D%AE%E5%BA%93%E6%97%B6%E5%80%99%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E5%88%86%E8%A1%A8.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"建立数据库时候为什么要分表"}],["meta",{"property":"og:description","content":"在数据库设计中，分表（Sharding / Partitioning） 主要是为了解决由“大数据量”和“高并发”带来的性能瓶颈。当一张表的数据达到千万甚至亿级时，查询和写入的效率会断崖式下跌。 分表通常分为垂直分表和水平分表两种逻辑： 1. 垂直分表 (Vertical Splitting) 做法： 把一张有很多字段的表，拆分成多张表，每张表存储一部分..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.54,"words":762},"filePathRelative":"posts/面试/字节面试/字节跳动运维开发工程师面试准备指南(适配你的简历背景)/mysql复习/建立数据库时候为什么要分表.md","excerpt":"<p>在数据库设计中，<strong>分表（Sharding / Partitioning）</strong> 主要是为了解决由“大数据量”和“高并发”带来的性能瓶颈。当一张表的数据达到千万甚至亿级时，查询和写入的效率会断崖式下跌。</p>\\n<p>分表通常分为<strong>垂直分表</strong>和<strong>水平分表</strong>两种逻辑：</p>\\n<hr>\\n<h2>1. 垂直分表 (Vertical Splitting)</h2>\\n<p><strong>做法：</strong> 把一张有很多字段的表，拆分成多张表，每张表存储一部分字段。通常是将“大字段”或“冷门字段”拆出去。</p>","autoDesc":true}`),i={name:`建立数据库时候为什么要分表.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在数据库设计中，<strong>分表（Sharding / Partitioning）</strong> 主要是为了解决由“大数据量”和“高并发”带来的性能瓶颈。当一张表的数据达到千万甚至亿级时，查询和写入的效率会断崖式下跌。</p>
<p>分表通常分为<strong>垂直分表</strong>和<strong>水平分表</strong>两种逻辑：</p>
<hr>
<h2 id="_1-垂直分表-vertical-splitting" tabindex="-1"><a class="header-anchor" href="#_1-垂直分表-vertical-splitting"><span>1. 垂直分表 (Vertical Splitting)</span></a></h2>
<p><strong>做法：</strong> 把一张有很多字段的表，拆分成多张表，每张表存储一部分字段。通常是将“大字段”或“冷门字段”拆出去。</p>
<ul>
<li>
<p><strong>为什么要分：</strong></p>
</li>
<li>
<p><strong>减少 I/O 消耗：</strong> 数据库是以“页”为单位读取数据的。如果表太宽（字段太多），一页能存的行数就少，查询时需要加载更多的磁盘页。</p>
</li>
<li>
<p><strong>提高并发能力：</strong> 减少锁的竞争。比如用户基本信息经常改，但用户详细背景介绍很少改，拆开后互不干扰。</p>
</li>
<li>
<p><strong>例子：</strong> 将 <code v-pre>User</code> 表拆分为 <code v-pre>User_Base</code>（存储账号密码）和 <code v-pre>User_Detail</code>（存储个人简介、头像等大文本）。</p>
</li>
</ul>
<hr>
<h2 id="_2-水平分表-horizontal-splitting" tabindex="-1"><a class="header-anchor" href="#_2-水平分表-horizontal-splitting"><span>2. 水平分表 (Horizontal Splitting)</span></a></h2>
<p><strong>做法：</strong> 保持表结构不变，将数据行分布到不同的表中（如 <code v-pre>order_2023</code>, <code v-pre>order_2024</code>）。</p>
<ul>
<li>
<p><strong>为什么要分：</strong></p>
</li>
<li>
<p><strong>优化 B+ 树索引：</strong> InnoDB 存储引擎使用 B+ 树。当数据量过大，树的层级会变深，导致查询时的磁盘寻道次数增加，性能下降。</p>
</li>
<li>
<p><strong>规避单表限制：</strong> 许多数据库单表在超过 2000 万行后，维护索引、修改表结构的成本会变得极高。</p>
</li>
<li>
<p><strong>提升写入性能：</strong> 单表写入会有行锁或表锁竞争，分散到多张表可以实现并行写入。</p>
</li>
<li>
<p><strong>例子：</strong> 按用户 ID 取模（<code v-pre>ID % 10</code>），将数据分散到 10 张不同的表中。</p>
</li>
</ul>
<hr>
<h2 id="_3-分表带来的核心收益" tabindex="-1"><a class="header-anchor" href="#_3-分表带来的核心收益"><span>3. 分表带来的核心收益</span></a></h2>
<table>
<thead>
<tr>
<th><strong>维度</strong></th>
<th><strong>分表前的痛点</strong></th>
<th><strong>分表后的改进</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>查询速度</strong></td>
<td>扫描全表或巨型索引，速度极慢</td>
<td>缩小了扫描范围，索引更轻量</td>
</tr>
<tr>
<td><strong>磁盘 I/O</strong></td>
<td>每次查询加载大量无关数据</td>
<td>只加载必要的字段或数据片</td>
</tr>
<tr>
<td><strong>系统稳定性</strong></td>
<td>单表故障或锁死导致全站瘫痪</td>
<td>风险分散，部分表损坏不影响整体</td>
</tr>
<tr>
<td><strong>维护成本</strong></td>
<td>备份、恢复、修改表结构（DDL）极其耗时</td>
<td>可以针对小表进行快速维护</td>
</tr>
</tbody>
</table>
<h2 id="_4-什么时候需要分表" tabindex="-1"><a class="header-anchor" href="#_4-什么时候需要分表"><span>4. 什么时候需要分表？</span></a></h2>
<p>并不是所有项目都要分表，因为分表会带来<strong>分布式事务、跨表 Join 困难、分页查询复杂</strong>等副作用。通常以下情况才考虑：</p>
<ol>
<li><strong>单表行数过多：</strong> 比如 MySQL 单表超过 1000 万-2000 万行。</li>
<li><strong>单表文件过大：</strong> 占用磁盘几十个 GB，备份和迁移非常困难。</li>
<li><strong>高并发写入：</strong> 数据库连接数和锁竞争成为瓶颈。</li>
</ol>
<hr>
<p><strong>你想了解具体的拆分策略（比如按时间、按哈希值）还是想知道在 Vue + Spring Boot 项目中如何通过代码实现分表？</strong></p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};