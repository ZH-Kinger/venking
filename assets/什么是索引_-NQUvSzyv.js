import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E8%B7%B3%E5%8A%A8%E8%BF%90%E7%BB%B4%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88%E9%9D%A2%E8%AF%95%E5%87%86%E5%A4%87%E6%8C%87%E5%8D%97(%E9%80%82%E9%85%8D%E4%BD%A0%E7%9A%84%E7%AE%80%E5%8E%86%E8%83%8C%E6%99%AF)/mysql%E5%A4%8D%E4%B9%A0/%E4%BB%80%E4%B9%88%E6%98%AF%E7%B4%A2%E5%BC%95_.html","title":"什么是索引_","lang":"zh-CN","frontmatter":{"title":"什么是索引_","icon":"clipboard-text","date":"2026-07-23T00:00:00.000Z","category":["面试"],"description":"简单来说，索引（Index） 就是数据库中的“目录”。 它是数据库管理系统（DBMS）中一个排序的数据结构，通过它，数据库可以像查字典一样，不需要扫描全表就能快速找到你需要的数据。 核心原理：为什么要索引？ 想象一本书有 500 页，如果你想找“异步编程”在哪一页： 没有索引（全表扫描）：你必须从第 1 页翻到第 500 页。 有索引（使用目录）：你先...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"什么是索引_\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E8%B7%B3%E5%8A%A8%E8%BF%90%E7%BB%B4%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88%E9%9D%A2%E8%AF%95%E5%87%86%E5%A4%87%E6%8C%87%E5%8D%97(%E9%80%82%E9%85%8D%E4%BD%A0%E7%9A%84%E7%AE%80%E5%8E%86%E8%83%8C%E6%99%AF)/mysql%E5%A4%8D%E4%B9%A0/%E4%BB%80%E4%B9%88%E6%98%AF%E7%B4%A2%E5%BC%95_.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"什么是索引_"}],["meta",{"property":"og:description","content":"简单来说，索引（Index） 就是数据库中的“目录”。 它是数据库管理系统（DBMS）中一个排序的数据结构，通过它，数据库可以像查字典一样，不需要扫描全表就能快速找到你需要的数据。 核心原理：为什么要索引？ 想象一本书有 500 页，如果你想找“异步编程”在哪一页： 没有索引（全表扫描）：你必须从第 1 页翻到第 500 页。 有索引（使用目录）：你先..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.07,"words":622},"filePathRelative":"posts/面试/字节面试/字节跳动运维开发工程师面试准备指南(适配你的简历背景)/mysql复习/什么是索引_.md","excerpt":"<p>简单来说，<strong>索引（Index）</strong> 就是数据库中的“目录”。</p>\\n<p>它是数据库管理系统（DBMS）中一个排序的数据结构，通过它，数据库可以像查字典一样，不需要扫描全表就能快速找到你需要的数据。</p>\\n<hr>\\n<h2>核心原理：为什么要索引？</h2>\\n<p>想象一本书有 500 页，如果你想找“异步编程”在哪一页：</p>\\n<ul>\\n<li><strong>没有索引（全表扫描）</strong>：你必须从第 1 页翻到第 500 页。</li>\\n<li><strong>有索引（使用目录）</strong>：你先翻到书后的索引表，找到“异步编程”，看到它在第 213 页，直接翻过去。</li>\\n</ul>","autoDesc":true}`),i={name:`什么是索引_.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>简单来说，<strong>索引（Index）</strong> 就是数据库中的“目录”。</p>
<p>它是数据库管理系统（DBMS）中一个排序的数据结构，通过它，数据库可以像查字典一样，不需要扫描全表就能快速找到你需要的数据。</p>
<hr>
<h2 id="核心原理-为什么要索引" tabindex="-1"><a class="header-anchor" href="#核心原理-为什么要索引"><span>核心原理：为什么要索引？</span></a></h2>
<p>想象一本书有 500 页，如果你想找“异步编程”在哪一页：</p>
<ul>
<li><strong>没有索引（全表扫描）</strong>：你必须从第 1 页翻到第 500 页。</li>
<li><strong>有索引（使用目录）</strong>：你先翻到书后的索引表，找到“异步编程”，看到它在第 213 页，直接翻过去。</li>
</ul>
<p>在 MySQL 中，如果不加索引，查询数据的时间复杂度是 O(n)；有了索引（通常是 B+ 树结构），时间复杂度可以降低到 O(\\log n)。</p>
<p>​</p>
<h2 id="索引的分类" tabindex="-1"><a class="header-anchor" href="#索引的分类"><span>索引的分类</span></a></h2>
<p>索引根据不同的维度有多种叫法：</p>
<h4 id="逻辑功能角度" tabindex="-1"><a class="header-anchor" href="#逻辑功能角度"><span>逻辑功能角度</span></a></h4>
<ul>
<li><strong>主键索引 (Primary Key)</strong>：唯一且不为空。</li>
<li><strong>唯一索引 (Unique Index)</strong>：字段值必须唯一，但允许为空。</li>
<li><strong>普通索引 (Normal Index)</strong>：最基本的索引，没有任何限制。</li>
<li><strong>全文索引 (Full-text Index)</strong>：用于在大文本里搜索关键词。</li>
</ul>
<h4 id="字段个数角度" tabindex="-1"><a class="header-anchor" href="#字段个数角度"><span>字段个数角度</span></a></h4>
<ul>
<li><strong>单列索引</strong>：只针对一个字段建索引。</li>
<li><strong>联合索引 (Composite Index)</strong>：多个字段组合成一个索引。<strong>注意：</strong> 必须符合“最左前缀法则”才能生效。</li>
</ul>
<p>​</p>
<h2 id="索引的优缺点" tabindex="-1"><a class="header-anchor" href="#索引的优缺点"><span>索引的优缺点</span></a></h2>
<p>索引虽好，但不能乱加：</p>
<table>
<thead>
<tr>
<th><strong>优点</strong></th>
<th><strong>缺点</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>查询速度极快</strong>，减少磁盘 I/O。</td>
<td><strong>占用物理空间</strong>。索引本身也是要存磁盘的。</td>
</tr>
<tr>
<td>提高分组 (<code v-pre>GROUP BY</code>&lt;br&gt;) 和排序 (<code v-pre>ORDER BY</code>&lt;br&gt;) 的效率。</td>
<td><strong>降低写操作性能</strong>。每次 <code v-pre>INSERT</code>&lt;br&gt;, <code v-pre>UPDATE</code>&lt;br&gt;, <code v-pre>DELETE</code>&lt;br&gt;时，数据库都要同步维护索引树。</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="什么场景适合加索引" tabindex="-1"><a class="header-anchor" href="#什么场景适合加索引"><span>什么场景适合加索引？</span></a></h2>
<ul>
<li><strong>经常作为查询条件的字段</strong>（<code v-pre>WHERE</code> 后的字段）。</li>
<li><strong>经常需要排序、分组的字段</strong>。</li>
<li><strong>用于多表连接 (JOIN) 的关联字段</strong>（外键）。</li>
<li><strong>区分度高的字段</strong>（比如手机号、用户 ID。性别这种区分度低的字段加索引意义不大）。</li>
</ul>
<h2 id="为什么索引会失效-面试重点" tabindex="-1"><a class="header-anchor" href="#为什么索引会失效-面试重点"><span>为什么索引会失效？（面试重点）</span></a></h2>
<p>即便加了索引，某些骚操作也会让它失效：</p>
<ol>
<li><strong>左模糊查询</strong>：<code v-pre>LIKE '%abc'</code>。</li>
<li><strong>对索引列做运算或函数</strong>：<code v-pre>WHERE YEAR(create_time) = 2026</code>。</li>
<li><strong>类型转换</strong>：字段是字符串，查询时没加引号 <code v-pre>WHERE phone = 138000</code>。</li>
<li><strong>联合索引不满足最左匹配</strong>。</li>
</ol>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};