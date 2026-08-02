import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/data_Infra/%E5%88%86%E5%B8%83%E5%BC%8F%E5%AD%98%E5%82%A8/%E5%88%86%E5%B8%83%E5%BC%8F%E5%AD%98%E5%82%A8%E9%9B%86%E7%BE%A4.html","title":"分布式存储集群","lang":"zh-CN","frontmatter":{"title":"分布式存储集群","icon":"cpu","date":"2026-07-31T00:00:00.000Z","category":["AI基础设施"],"description":"在 JuiceFS + MinIO 这个架构下，数据的管理方式可以用一句话来概括：“挂羊头，卖狗肉，而且卖得极度高效。” 这里所谓的“羊头”就是你看到的完美的 Linux 文件目录，而“狗肉”则是底层被打碎的无数个纯粹的数据块。 为了让你有最直观的体感，我们结合你之前跑的那段 rclone 命令（把数据拷入 wujioss/worldengine/ 目...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"分布式存储集群\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-31T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/data_Infra/%E5%88%86%E5%B8%83%E5%BC%8F%E5%AD%98%E5%82%A8/%E5%88%86%E5%B8%83%E5%BC%8F%E5%AD%98%E5%82%A8%E9%9B%86%E7%BE%A4.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"分布式存储集群"}],["meta",{"property":"og:description","content":"在 JuiceFS + MinIO 这个架构下，数据的管理方式可以用一句话来概括：“挂羊头，卖狗肉，而且卖得极度高效。” 这里所谓的“羊头”就是你看到的完美的 Linux 文件目录，而“狗肉”则是底层被打碎的无数个纯粹的数据块。 为了让你有最直观的体感，我们结合你之前跑的那段 rclone 命令（把数据拷入 wujioss/worldengine/ 目..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-31T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.67,"words":1102},"filePathRelative":"posts/AI基础设施/data_Infra/分布式存储/分布式存储集群.md","excerpt":"<p>在 <strong>JuiceFS + MinIO</strong> 这个架构下，数据的管理方式可以用一句话来概括：<strong>“挂羊头，卖狗肉，而且卖得极度高效。”</strong></p>\\n<p>这里所谓的“羊头”就是你看到的完美的 Linux 文件目录，而“狗肉”则是底层被打碎的无数个纯粹的数据块。</p>\\n<p>为了让你有最直观的体感，我们结合你之前跑的那段 <code>rclone</code> 命令（把数据拷入 <code>wujioss/worldengine/</code> 目录），来看看在这个架构下，数据在底层究竟是如何被“解构”和“管理”的：</p>\\n<h3>第一步：文件的“无情肢解”（写入数据时）</h3>","autoDesc":true}`),i={name:`分布式存储集群.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在 <strong>JuiceFS + MinIO</strong> 这个架构下，数据的管理方式可以用一句话来概括：<strong>“挂羊头，卖狗肉，而且卖得极度高效。”</strong></p>
<p>这里所谓的“羊头”就是你看到的完美的 Linux 文件目录，而“狗肉”则是底层被打碎的无数个纯粹的数据块。</p>
<p>为了让你有最直观的体感，我们结合你之前跑的那段 <code v-pre>rclone</code> 命令（把数据拷入 <code v-pre>wujioss/worldengine/</code> 目录），来看看在这个架构下，数据在底层究竟是如何被“解构”和“管理”的：</p>
<h3 id="第一步-文件的-无情肢解-写入数据时" tabindex="-1"><a class="header-anchor" href="#第一步-文件的-无情肢解-写入数据时"><span>第一步：文件的“无情肢解”（写入数据时）</span></a></h3>
<p>假设你通过 <code v-pre>rclone</code> 或者 Python 脚本，向 JuiceFS 挂载的目录（比如 <code v-pre>/mnt/jfs/wujioss/worldengine/</code>）写入了一个 1GB 的 <code v-pre>episode_0001.mp4</code> 视频文件。</p>
<ol>
<li>
<p><strong>JuiceFS 拦截</strong>：JuiceFS 客户端（挂载程序）会瞬间拦截这个写入请求。</p>
</li>
<li>
<p><strong>切成小块</strong>：它绝对不会把这个 1GB 的完整文件直接发给 MinIO。JuiceFS 会在内存里把这个视频切成 64MB 的 Chunk，然后再细分成无数个 <strong>4MB 的 Block（数据块）</strong>。</p>
</li>
<li>
<p><strong>并发扔进 MinIO</strong>：JuiceFS 客户端开启多线程并发，把这 250 个 4MB 的 Block 疯狂上传到底层的 MinIO 里。</p>
</li>
</ol>
<p>👉 <strong>此时 MinIO 的视角（数据仓库）</strong>：</p>
<p>如果你直接登录 MinIO 的控制台，你会发现里面<strong>根本没有</strong> <code v-pre>wujioss/worldengine/</code> 这个文件夹，也找不到 <code v-pre>episode_0001.mp4</code> 这个文件。</p>
<p>你在 MinIO 里只会看到一个以哈希值命名的巨大扁平 Bucket，里面堆满了随机字符串命名的 4MB 小文件（比如 <code v-pre>a7b9f3...</code>、<code v-pre>c2d4e5...</code>）。MinIO 此时纯粹就是一个“无脑的吞吐机器”。</p>
<h3 id="第二步-元数据引擎-建立户口本-管理目录树" tabindex="-1"><a class="header-anchor" href="#第二步-元数据引擎-建立户口本-管理目录树"><span>第二步：元数据引擎“建立户口本”（管理目录树）</span></a></h3>
<p>既然 MinIO 里没有文件夹，那你在 DSW 容器或者 Ubuntu 终端里敲下 <code v-pre>ls /mnt/jfs/wujioss/worldengine/</code> 时，为什么能看到完美的目录树？</p>
<p>因为这些结构全部被 <strong>JuiceFS 记在了 Redis（或 TiKV）里</strong>。</p>
<p>在写完 MinIO 后，JuiceFS 会在后端的 Redis 数据库里写入一条极具逻辑的“映射记录（元数据）”：</p>
<ul>
<li>
<p><strong>文件名</strong>: <code v-pre>episode_0001.mp4</code></p>
</li>
<li>
<p><strong>虚拟路径</strong>: <code v-pre>/wujioss/worldengine/</code></p>
</li>
<li>
<p><strong>文件大小</strong>: 1GB</p>
</li>
<li>
<p><strong>权限</strong>: 755 (root:root)</p>
</li>
<li>
<p><strong>包含的 Block 列表</strong>: <code v-pre>[a7b9f3, c2d4e5, ...等 250 个积木块编号]</code></p>
</li>
</ul>
<p>👉 <strong>此时 Redis/TiKV 的视角（大脑大脑）</strong>：</p>
<p>它掌握着全局的目录树。不管你创建了多少层级的文件夹，或者存放了上百万张用来做大模型训练的小图片，对 Redis 来说，这仅仅是内存里的几十万条 Key-Value 字典记录。</p>
<h3 id="第三步-透明的-魔法拼装-与多级缓存-读取数据时" tabindex="-1"><a class="header-anchor" href="#第三步-透明的-魔法拼装-与多级缓存-读取数据时"><span>第三步：透明的“魔法拼装”与多级缓存（读取数据时）</span></a></h3>
<p>当你的训练框架（如 PyTorch）通过 Dataloader 试图打开这个文件时：<code v-pre>open('/mnt/jfs/wujioss/worldengine/episode_0001.mp4')</code>。</p>
<ol>
<li>
<p><strong>问路</strong>：JuiceFS 瞬间去问 Redis：“这个文件由哪些 Block 组成？”</p>
</li>
<li>
<p><strong>拉取</strong>：拿到一长串 4MB Block 的编号后，JuiceFS 多线程去底层的 MinIO 里把这些“积木”拉回来。</p>
</li>
<li>
<p><strong>拼装喂给程序</strong>：在内存中把 4MB 的小块拼装成连续的数据流，伪装成一个普通文件喂给 PyTorch。</p>
</li>
<li>
<p><strong>终极必杀（落盘缓存）</strong>：最关键的一步，JuiceFS 会顺手把这些从 MinIO 拉回来的 4MB 小块，<strong>偷偷保存在你当前计算节点（比如你跑程序的 DSW 容器所在的宿主机）的本地 NVMe 硬盘里</strong>。</p>
</li>
</ol>
<h3 id="架构师总结-这种管理方式牛在哪里" tabindex="-1"><a class="header-anchor" href="#架构师总结-这种管理方式牛在哪里"><span>架构师总结：这种管理方式牛在哪里？</span></a></h3>
<p>当你利用这种架构来管理 AI 基础设施的数据流时，它实现了完美的职责分离：</p>
<ul>
<li>
<p><strong>MinIO 承担了“无限扩容的苦力”</strong>：你可以在机房里不断往 MinIO 节点插便宜的高密度机械硬盘。</p>
</li>
<li>
<p><strong>TiKV/Redis 承担了“秒级响应的大脑”</strong>：哪怕你存放了一亿个小 json 或图片帧，<code v-pre>ls</code> 和 <code v-pre>find</code> 命令依然是毫秒级，因为纯粹是在查数据库。</p>
</li>
<li>
<p><strong>本地 NVMe 承担了“榨干 GPU 的加速器”</strong>：你的模型在第一轮（Epoch 1）训练时，数据从 MinIO 流向 GPU 并留在本地缓存；到了 Epoch 2，网络流量直接降为 0，GPU 直接从本地高速硬盘吃数据。</p>
</li>
</ul>
<p>在这种管理模式下，底层的物理硬件是可以随意替换和横向扩展的，而上层的算法工程师则感觉自己只是在用一块无限大、永远不会满、且速度极快的本地移动硬盘。</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};