import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/data_Infra/%E5%88%86%E5%B8%83%E5%BC%8F%E5%AD%98%E5%82%A8/Aws%20s3.html","title":"Aws s3","lang":"zh-CN","frontmatter":{"title":"Aws s3","icon":"cpu","date":"2026-07-31T00:00:00.000Z","category":["AI基础设施"],"description":"无论是公有云上的 Amazon S3，还是你在 Kubernetes 集群中自建的 S3 兼容平替（如 MinIO），它们访问物理存储的底层逻辑都彻底抛弃了传统的“目录树”和“硬盘扇区”，而是采用了一套极度扁平化、基于 HTTP 协议的键值（Key-Value）模型。 要理解 S3 是如何精准且高速地从海量硬盘中捞出你的数据的，我们需要将整个访问链路进...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Aws s3\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/Pasted%20image%2020260731165835.png\\"],\\"datePublished\\":\\"2026-07-31T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/data_Infra/%E5%88%86%E5%B8%83%E5%BC%8F%E5%AD%98%E5%82%A8/Aws%20s3.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"Aws s3"}],["meta",{"property":"og:description","content":"无论是公有云上的 Amazon S3，还是你在 Kubernetes 集群中自建的 S3 兼容平替（如 MinIO），它们访问物理存储的底层逻辑都彻底抛弃了传统的“目录树”和“硬盘扇区”，而是采用了一套极度扁平化、基于 HTTP 协议的键值（Key-Value）模型。 要理解 S3 是如何精准且高速地从海量硬盘中捞出你的数据的，我们需要将整个访问链路进..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/Pasted%20image%2020260731165835.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-31T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":4.73,"words":1419},"filePathRelative":"posts/AI基础设施/data_Infra/分布式存储/Aws s3.md","excerpt":"<p>无论是公有云上的 Amazon S3，还是你在 Kubernetes 集群中自建的 S3 兼容平替（如 MinIO），它们访问物理存储的底层逻辑都彻底抛弃了传统的“目录树”和“硬盘扇区”，而是采用了一套极度扁平化、基于 HTTP 协议的键值（Key-Value）模型。</p>\\n<p>要理解 S3 是如何精准且高速地从海量硬盘中捞出你的数据的，我们需要将整个访问链路进行硬核拆解。<br>\\n<img src=\\"/blog/assets/posts/Pasted%20image%2020260731165835.png\\" alt loading=\\"lazy\\"></p>\\n<h2>一、 扁平化的寻址逻辑：Bucket + Key</h2>","autoDesc":true}`),i={name:`Aws s3.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>无论是公有云上的 Amazon S3，还是你在 Kubernetes 集群中自建的 S3 兼容平替（如 MinIO），它们访问物理存储的底层逻辑都彻底抛弃了传统的“目录树”和“硬盘扇区”，而是采用了一套极度扁平化、基于 HTTP 协议的键值（Key-Value）模型。</p>
<p>要理解 S3 是如何精准且高速地从海量硬盘中捞出你的数据的，我们需要将整个访问链路进行硬核拆解。<br>
<img src="/blog/assets/posts/Pasted%20image%2020260731165835.png" alt="" loading="lazy"></p>
<h2 id="一、-扁平化的寻址逻辑-bucket-key" tabindex="-1"><a class="header-anchor" href="#一、-扁平化的寻址逻辑-bucket-key"><span>一、 扁平化的寻址逻辑：Bucket + Key</span></a></h2>
<p>在传统的 NFS 文件系统或本地 ext4 文件系统中，找一个文件需要顺着目录树一层层往下爬（比如 <code v-pre>/data/ai-models/v1/weights.bin</code>）。当文件数量达到百亿级别时，这种树状遍历会直接让 NameNode 类的元数据服务器内存撑爆。</p>
<p>S3 的访问逻辑极其暴力且高效，它只有两个核心概念：</p>
<ul>
<li>
<p><strong>Bucket（存储桶）</strong>：相当于一个全局唯一的顶级命名空间（如 <code v-pre>ai-models</code>）。</p>
</li>
<li>
<p><strong>Key（对象键）</strong>：一个完整的字符串标识符（如 <code v-pre>v1/weights.bin</code>）。</p>
</li>
</ul>
<p>这里的一个关键认知是：<strong>S3 里根本没有“文件夹”的概念。</strong> 你看到的 <code v-pre>v1/</code> 仅仅是这个 Key 字符串的一部分（称为 Prefix 前缀），它在物理存储上并没有建立真实的层级目录结构。当你发起访问时，本质上是对一个无限大的 Hash Map 执行了一次极其快速的 <code v-pre>GET(Key)</code> 操作。</p>
<h2 id="二、-api-驱动的网络访问层" tabindex="-1"><a class="header-anchor" href="#二、-api-驱动的网络访问层"><span>二、 API 驱动的网络访问层</span></a></h2>
<p>S3 的每一次读取或写入，都是一次标准的 RESTful HTTP 请求。一个完整的数据拉取请求经历了以下网络接力赛：</p>
<ol>
<li>
<p><strong>DNS 解析与路由</strong>：当你请求 <code v-pre>[https://ai-models.s3.amazonaws.com/v1/weights.bin](https://ai-models.s3.amazonaws.com/v1/weights.bin)</code> 时，DNS 会将请求解析到 S3 的区域级（Region）负载均衡器或网关。</p>
</li>
<li>
<p><strong>SigV4 鉴权机制</strong>：S3 的安全极其严苛。客户端（比如你的 Python 代码或 Terraform 脚本）不会直接发送密码，而是使用 AWS Signature Version 4 算法，将你的 Access Key、Secret Key、时间戳和请求体计算出一个哈希签名。S3 网关收到请求后，会在毫秒级重新计算并比对这个签名，防止任何中间人篡改。</p>
</li>
<li>
<p><strong>IAM 与策略校验</strong>：通过鉴权后，网关会检查 Bucket Policy（存储桶策略）和你的 IAM 权限，确认你是否真的有权限 <code v-pre>GetObject</code>。</p>
</li>
</ol>
<h2 id="三、-脑体分离-元数据层与数据层的精密协同" tabindex="-1"><a class="header-anchor" href="#三、-脑体分离-元数据层与数据层的精密协同"><span>三、 脑体分离：元数据层与数据层的精密协同</span></a></h2>
<p>当请求通过了安全网关，就来到了 S3 内部最核心的“脑体分离”架构。</p>
<ul>
<li>
<p><strong>元数据层（Metadata Tier - 大脑）</strong>：</p>
<p>S3 内部维护着一个高度分布式的键值数据库（原理类似 DynamoDB）。网关会拿着你的 Key 去这个数据库里查询。这里记录着：这个对象的创建时间、标签、以及<strong>它被切分成了多少个物理数据块，这些数据块分别存放在哪些机房的哪些硬盘上</strong>。</p>
<p>（这也是为什么像 JuiceFS 这样的现代文件系统，可以通过把元数据剥离给高并发的 TiKV，只把底层的二进制大文件扔给 S3/MinIO 来实现性能狂飙，因为这顺应了脑体分离的底层逻辑。）</p>
</li>
<li>
<p><strong>数据层（Data Tier - 身体）</strong>：</p>
<p>拿到物理地址后，系统才会去真正的物理硬盘集群中拉取那些二进制文件流，并将它们拼接起来通过 HTTP 响应吐给客户端。</p>
</li>
</ul>
<h2 id="四、-物理存储底座与跨可用区容灾" tabindex="-1"><a class="header-anchor" href="#四、-物理存储底座与跨可用区容灾"><span>四、 物理存储底座与跨可用区容灾</span></a></h2>
<p>当你将一个几百 GB 的 Parquet 训练数据集写入 S3 时，S3 绝对不会把这个大文件傻傻地存在某一台服务器的一块硬盘上。</p>
<p>为了实现其宣称的 99.999999999%（11 个 9）的数据持久性，S3 在物理落盘时采用了极其复杂的分布式算法：</p>
<ol>
<li>
<p><strong>分块与纠删码（Erasure Coding）</strong>：</p>
<p>就像我们之前探讨过的 EC 4+2 机制，S3 在底层同样极度依赖纠删码算法。你的数据会被数学矩阵切分成多个数据块（Data Shards）和校验块（Parity Shards）。</p>
</li>
<li>
<p><strong>跨 AZ 分散存放</strong>：</p>
<p>在标准的 S3 存储类中，这些分片不会存放在同一个机房。AWS 会强制将它们分散存放到至少 3 个物理上完全独立的 Availability Zones（可用区，通常相隔数公里，拥有独立的电力和网络）。</p>
</li>
<li>
<p><strong>修复机制（Scrubbing）</strong>：</p>
<p>S3 底层有无数的后台守护进程在持续扫描这些物理分片。一旦发现某块硬盘出现坏道，或者某个机房断电，它会利用其他可用区的健康分片，瞬间在后台重新计算并补齐丢失的数据块。</p>
</li>
</ol>
<h2 id="五、-不可变性-immutability-的代价" tabindex="-1"><a class="header-anchor" href="#五、-不可变性-immutability-的代价"><span>五、 不可变性（Immutability）的代价</span></a></h2>
<p>由于你的数据在 S3 底层已经被打碎、计算成了纠删码，并分散到了几公里外的多个机房，这就决定了 S3 访问机制的最后一个硬核特性：<strong>对象是不可变的（Immutable）</strong>。</p>
<p>你无法像在本地 ext4 硬盘上那样，打开一个 1TB 的文件，仅仅修改其中的第 10 字节然后保存。在 S3 的世界里，如果你要改动 1 个字节，你必须把整个 1TB 的新文件通过 HTTP 重新 <code v-pre>PUT</code> 上去，彻底覆盖掉旧的对象。对于超大文件，系统则通过 <strong>Multipart Upload（分段上传）</strong> API，允许你并发上传多个小块，最后在 S3 内部再组装成一个不可变的对象。</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};