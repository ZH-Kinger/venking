import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E6%95%B0%E6%8D%AE%E5%BA%93/%E6%95%B0%E6%8D%AE%E5%BA%93/Redis(%E9%9D%9E%E5%85%B3%E7%B3%BB%E5%9E%8B%E6%95%B0%E6%8D%AE%E5%BA%93).html","title":"Redis(非关系型数据库)","lang":"zh-CN","frontmatter":{"title":"Redis(非关系型数据库)","icon":"database","date":"2026-07-23T00:00:00.000Z","category":["数据库"],"description":"redis是什么，可以用来干什么？ Redis是一个开源的内存数据存储系统，它非常适合用作缓存或消息代理，但当您不需要传统数据库的所有功能时，它也可以用作数据库。Redis 性能卓越，能够快速地读写内存中的数据。此外，Redis 支持原子操作，使其成为需要快速访问的缓存场景的理想选择。 内存数据库 内存数据库是一种将数据完全存储在主内存（RAM）而非磁...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Redis(非关系型数据库)\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/Redis(%E9%9D%9E%E5%85%B3%E7%B3%BB%E5%9E%8B%E6%95%B0%E6%8D%AE%E5%BA%93\\",\\"https://venking.tech/blog/blog/assets/posts/Redis(%E9%9D%9E%E5%85%B3%E7%B3%BB%E5%9E%8B%E6%95%B0%E6%8D%AE%E5%BA%93\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E6%95%B0%E6%8D%AE%E5%BA%93/%E6%95%B0%E6%8D%AE%E5%BA%93/Redis(%E9%9D%9E%E5%85%B3%E7%B3%BB%E5%9E%8B%E6%95%B0%E6%8D%AE%E5%BA%93).html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"Redis(非关系型数据库)"}],["meta",{"property":"og:description","content":"redis是什么，可以用来干什么？ Redis是一个开源的内存数据存储系统，它非常适合用作缓存或消息代理，但当您不需要传统数据库的所有功能时，它也可以用作数据库。Redis 性能卓越，能够快速地读写内存中的数据。此外，Redis 支持原子操作，使其成为需要快速访问的缓存场景的理想选择。 内存数据库 内存数据库是一种将数据完全存储在主内存（RAM）而非磁..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/Redis(%E9%9D%9E%E5%85%B3%E7%B3%BB%E5%9E%8B%E6%95%B0%E6%8D%AE%E5%BA%93"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":7.83,"words":2348},"filePathRelative":"posts/数据库/数据库/Redis(非关系型数据库).md","excerpt":"<h2>redis是什么，可以用来干什么？</h2>\\n<p><a href=\\"https://redis.com/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Redis</a>是一个开源的内存数据存储系统，它非常适合用作缓存或消息代理，但当您不需要传统数据库的所有功能时，它也可以用作数据库。Redis 性能卓越，能够快速地读写内存中的数据。此外，Redis 支持原子操作，使其成为需要快速访问的缓存场景的理想选择。</p>\\n<h3>内存数据库</h3>\\n<p>内存数据库是一种将数据完全存储在主内存（RAM）而非磁盘上的数据库。内存数据库旨在利用主内存的高速特性（比磁盘存储速度快几个数量级）提供快速的数据访问。</p>","autoDesc":true}`),i={name:`Redis(非关系型数据库).md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><h2 id="redis是什么-可以用来干什么" tabindex="-1"><a class="header-anchor" href="#redis是什么-可以用来干什么"><span>redis是什么，可以用来干什么？</span></a></h2>
<p><a href="https://redis.com/" target="_blank" rel="noopener noreferrer">Redis</a>是一个开源的内存数据存储系统，它非常适合用作缓存或消息代理，但当您不需要传统数据库的所有功能时，它也可以用作数据库。Redis 性能卓越，能够快速地读写内存中的数据。此外，Redis 支持原子操作，使其成为需要快速访问的缓存场景的理想选择。</p>
<h3 id="内存数据库" tabindex="-1"><a class="header-anchor" href="#内存数据库"><span>内存数据库</span></a></h3>
<p>内存数据库是一种将数据完全存储在主内存（RAM）而非磁盘上的数据库。内存数据库旨在利用主内存的高速特性（比磁盘存储速度快几个数量级）提供快速的数据访问。</p>
<p>内存数据库常用于需要快速访问大量数据的应用，例如实时分析、在线游戏、电子商务和社交媒体。它们也用于需要高性能和<a href="https://backendless.com/what-is-app-scaling-and-why-it-matters/" target="_blank" rel="noopener noreferrer">可扩展性的</a>应用，因为内存数据库可以在不牺牲性能的情况下处理大量数据和事务。</p>
<p>​</p>
<h3 id="为什么-redis-这么快" tabindex="-1"><a class="header-anchor" href="#为什么-redis-这么快"><span>为什么 Redis 这么快？</span></a></h3>
<p>在学习操作之前，必须理解它的三个核心特性，这决定了它在生产环境中的地位：</p>
<ul>
<li><strong>全内存操作：</strong> 绝大多数请求只访问内存，没有磁盘 I/O 的开销。</li>
<li><strong>单线程模型：</strong> Redis 核心处理逻辑是单线程的，这听起来很慢，但实际上它避免了多线程的上下文切换和锁竞争，配合 <strong>IO 多路复用机制</strong>，性能极高。</li>
<li><strong>高效的数据结构：</strong> 它的每种数据类型（如 String, Hash, List）在底层都经过了极致的内存优化。</li>
<li>​</li>
</ul>
<p>内存数据库的主要缺点之一是，由于数据完全存储在内存中，并未持久化到磁盘，因此在系统崩溃或关闭时更容易丢失数据。为了解决这个问题，许多内存数据库（包括 Redis）都提供了持久化和复制等功能，允许将数据保存到磁盘并跨多个服务器进行复制，从而确保数据的持久性和可用性。</p>
<hr>
<h2 id="redis-是用来干什么的-核心场景" tabindex="-1"><a class="header-anchor" href="#redis-是用来干什么的-核心场景"><span>Redis 是用来干什么的？（核心场景）</span></a></h2>
<figure><img src="/blog/assets/posts/Redis(%E9%9D%9E%E5%85%B3%E7%B3%BB%E5%9E%8B%E6%95%B0%E6%8D%AE%E5%BA%93)-1.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<p>​</p>
<h3 id="缓存-最经典用法" tabindex="-1"><a class="header-anchor" href="#缓存-最经典用法"><span>缓存（最经典用法）</span></a></h3>
<p>这是 Redis 最核心的用途。将 MySQL 中频繁查询但不常变动的数据（如用户信息、热门日志规则）存入 Redis。</p>
<ul>
<li><strong>效果</strong>：访问速度从毫秒级提升到微秒级，极大地减轻了数据库的压力。</li>
</ul>
<h3 id="计数器与限流-高效计算" tabindex="-1"><a class="header-anchor" href="#计数器与限流-高效计算"><span>计数器与限流（高效计算）</span></a></h3>
<p>由于 Redis 的操作是原子的（Atomic），它非常适合做：</p>
<ul>
<li><strong>计数</strong>：统计网站 PV/UV、文章点赞数。</li>
<li><strong>限流</strong>：比如你的告警系统规定“1 分钟内同一个错误只能发 3 次邮件”，Redis 可以轻松记录并自动过期。</li>
</ul>
<h3 id="消息队列-异步处理" tabindex="-1"><a class="header-anchor" href="#消息队列-异步处理"><span>消息队列（异步处理）</span></a></h3>
<p>利用 Redis 的 <code v-pre>List</code> 或 <code v-pre>Stream</code> 结构，可以实现轻量级的生产者-消费者模型。</p>
<ul>
<li><strong>场景</strong>：日志分析平台接收到大量日志时，可以先塞进 Redis 队列，后台 Python 脚本再慢慢消费处理，起到“削峰填谷”的作用。</li>
</ul>
<h3 id="分布式锁-同步控制" tabindex="-1"><a class="header-anchor" href="#分布式锁-同步控制"><span>分布式锁（同步控制）</span></a></h3>
<p>在分布式环境下，多个服务器实例同时操作同一个资源会出问题。</p>
<ul>
<li><strong>场景</strong>：利用 Redis 的 <code v-pre>SETNX</code> 指令，可以保证在同一时刻只有一个节点能执行特定的任务（比如执行自动化运维脚本）。</li>
</ul>
<h3 id="排行榜-排序专家" tabindex="-1"><a class="header-anchor" href="#排行榜-排序专家"><span>排行榜（排序专家）</span></a></h3>
<p>利用 <code v-pre>Sorted Set</code>，Redis 可以根据你给出的分数（Score）自动对数据排序。</p>
<ul>
<li><strong>场景</strong>：展示今日错误频率最高的 Top 10 IP。</li>
</ul>
<p>​</p>
<h3 id="会话存储" tabindex="-1"><a class="header-anchor" href="#会话存储"><span>会话存储</span></a></h3>
<p>会话存储是一种用于在 Web 应用程序中存储用户会话数据的机制。在 Redis 会话存储中，会话数据存储在 Redis 数据库中，Redis 数据库是一种快速的内存数据结构存储，可用作缓存、数据库和消息代理。</p>
<p>​</p>
<p>在 Redis 会话存储中，会话数据以键值对的形式存储在 Redis 数据库中，其中键是会话的唯一标识符，值是会话数据本身，其中可能包括用户的登录状态、偏好和购物车内容等信息。</p>
<p>​</p>
<p>使用 Redis 会话存储的优势包括提升性能和可扩展性，因为 Redis 可以快速高效地存储和检索会话数据，即使处理海量数据也不例外。此外，Redis 还允许在多个服务器之间共享会话数据，这在负载均衡环境中非常有用。</p>
<h3 id="让我们来看一些具体的-redis-使用案例" tabindex="-1"><a class="header-anchor" href="#让我们来看一些具体的-redis-使用案例"><span>让我们来看一些具体的 Redis 使用案例：</span></a></h3>
<ol>
<li>实时分析：应用程序可以使用 Redis 实时存储和处理大量数据，使组织能够快速分析和可视化数据，从而做出业务决策。</li>
<li>在线游戏：游戏软件可以使用 Redis 来存储和管理游戏状态，例如玩家个人资料、游戏分数和排行榜，从而实现快速流畅的游戏体验。</li>
<li>电子商务：电子商务应用程序可以使用 Redis 来存储和管理与在线购物相关的数据，例如产品目录、用户个人资料和购物车内容，从而为用户提供快速高效的购物体验。</li>
<li>社交媒体：社交应用可以使用 Redis 来存储和管理与社交媒体互动相关的数据，例如用户个人资料、好友列表和新闻推送，从而实现快速流畅的用户体验。</li>
</ol>
<hr>
<h2 id="redis-与传统数据库-mysql-的区别" tabindex="-1"><a class="header-anchor" href="#redis-与传统数据库-mysql-的区别"><span>Redis 与传统数据库（MySQL）的区别</span></a></h2>
<p>为了让你直观理解，我们对比一下：</p>
<table>
<thead>
<tr>
<th><strong>特性</strong></th>
<th><strong>Redis</strong></th>
<th><strong>MySQL</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>存储介质</strong></td>
<td><strong>内存</strong> (RAM)</td>
<td><strong>磁盘</strong> (Disk)</td>
</tr>
<tr>
<td><strong>读写速度</strong></td>
<td>极快（10w+ QPS）</td>
<td>相对较慢</td>
</tr>
<tr>
<td><strong>数据结构</strong></td>
<td>键值对、多种高级结构</td>
<td>表格（行与列）、外键</td>
</tr>
<tr>
<td><strong>持久化</strong></td>
<td>支持，但主要是为了备份</td>
<td>原生持久化，保证数据不丢失</td>
</tr>
<tr>
<td><strong>主要定位</strong></td>
<td>性能加速、辅助存储</td>
<td>核心业务数据存储</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="redis-持久化" tabindex="-1"><a class="header-anchor" href="#redis-持久化"><span>Redis 持久化</span></a></h2>
<p>Redis 持久化是 Redis 数据库的一项特性，它允许将数据保存到磁盘，并在服务器崩溃或关闭时进行恢复。默认情况下，Redis 将数据存储在内存中，这意味着当 Redis 服务器关闭或重启时，数据会丢失。Redis 持久化能够将数据保存到磁盘，并在 Redis 服务器重新启动时进行恢复，从而确保在服务器崩溃或关闭时数据不会丢失。</p>
<p>​</p>
<p><a href="https://redis.com/redis-enterprise/technology/durable-redis/" target="_blank" rel="noopener noreferrer">根据应用程序的需求， Redis 持久化可以通过多种方式进行配置</a>。最简单的持久化方式是快照，即定期将整个 Redis 数据集保存到磁盘。这种方法快速高效，但如果 Redis 服务器在两次快照之间崩溃，则可能导致数据丢失。</p>
<figure><img src="/blog/assets/posts/Redis(%E9%9D%9E%E5%85%B3%E7%B3%BB%E5%9E%8B%E6%95%B0%E6%8D%AE%E5%BA%93)-2.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<p>另一种持久化方式是追加式文件（AOF）持久化，它将每次写入操作保存到磁盘上的日志文件中。这种方法比快照更持久，因为它允许 Redis 服务器在崩溃时通过重放日志文件来重建数据集。但是，它的速度可能比快照慢，并且消耗更多资源。</p>
<p>​</p>
<p>总的来说，Redis 持久化是一项很有价值的功能，它允许将数据保存到磁盘，并在发生崩溃或关闭时进行恢复，从而确保数据的持久性和可用性。</p>
<p>​</p>
<p>​</p>
<h2 id="丰富的数据结构" tabindex="-1"><a class="header-anchor" href="#丰富的数据结构"><span>丰富的数据结构</span></a></h2>
<p>Redis 中的数据结构是以特定方式组织和管理的数据集合，旨在支持高效的操作。例如，Redis 中的字符串数据类型是一系列字节，可用于存储和操作文本或二进制数据。而哈希数据类型则是字段-值对的映射，可用于存储和操作复杂的数据结构。</p>
<p>​</p>
<p>Redis 中的每种数据结构都有其独特的操作集，例如字符串的 GET、SET 和 DELETE 操作，哈希表的 HGET、HSET 和 HDEL 操作，以及列表的 LPUSH、LPOP 和 LRANGE 操作。这些操作使开发人员能够高效地在 Redis 中存储、检索和操作数据。</p>
<p>​</p>
<p>总的来说，Redis 中的数据结构是该框架的一个重要方面，因为它们为高效的数据管理和操作提供了底层基础。</p>
<p>​</p>
<p>​</p>
<p>​</p>
<h2 id="redis基础数据类型" tabindex="-1"><a class="header-anchor" href="#redis基础数据类型"><span>redis基础数据类型</span></a></h2>
<table>
<thead>
<tr>
<th><strong>数据类型</strong></th>
<th><strong>特点</strong></th>
<th><strong>常用命令</strong></th>
<th><strong>典型场景</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>String (字符串)</strong></td>
<td>最基础类型，支持文本、二进制、数字</td>
<td><code v-pre>SET</code>&lt;br&gt;, <code v-pre>GET</code>&lt;br&gt;, <code v-pre>INCR</code></td>
<td>缓存、计数器、分布式锁</td>
</tr>
<tr>
<td><strong>Hash (哈希)</strong></td>
<td>适合存储对象（类似 Java 的 Map 或 Python 的 Dict）</td>
<td><code v-pre>HSET</code>&lt;br&gt;, <code v-pre>HGETALL</code></td>
<td>存储用户信息、配置信息</td>
</tr>
<tr>
<td><strong>List (列表)</strong></td>
<td>有序集合，底层是双向链表</td>
<td><code v-pre>LPUSH</code>&lt;br&gt;, <code v-pre>RPOP</code></td>
<td>消息队列、最新动态列表</td>
</tr>
<tr>
<td><strong>Set (集合)</strong></td>
<td>无序且唯一，支持交集、并集</td>
<td><code v-pre>SADD</code>&lt;br&gt;, <code v-pre>SINTER</code></td>
<td>抽奖、共同好友、标签系统</td>
</tr>
<tr>
<td><strong>Sorted Set (有序集合)</strong></td>
<td>每个元素关联一个分数（score），按分数排序</td>
<td><code v-pre>ZADD</code>&lt;br&gt;, <code v-pre>ZRANGE</code></td>
<td>排行榜、限流器</td>
</tr>
</tbody>
</table>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};