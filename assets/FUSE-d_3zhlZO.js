import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/data_Infra/%E5%88%86%E5%B8%83%E5%BC%8F%E5%AD%98%E5%82%A8/FUSE.html","title":"FUSE","lang":"zh-CN","frontmatter":{"title":"FUSE","icon":"cpu","date":"2026-07-31T00:00:00.000Z","category":["AI基础设施"],"description":"在 Linux 操作系统和云原生存储领域，FUSE 的全称是 Filesystem in Userspace（用户空间文件系统）。 它是我们前面聊到的 JuiceFS 能够“挂羊头卖狗肉”（把底层的对象存储伪装成完美的本地硬盘）的核心魔法。 要彻底搞懂 FUSE，我们需要从 Linux 操作系统的底层权限设计说起。 一、 传统文件系统的痛点（内核态的特...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"FUSE\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-31T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/data_Infra/%E5%88%86%E5%B8%83%E5%BC%8F%E5%AD%98%E5%82%A8/FUSE.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"FUSE"}],["meta",{"property":"og:description","content":"在 Linux 操作系统和云原生存储领域，FUSE 的全称是 Filesystem in Userspace（用户空间文件系统）。 它是我们前面聊到的 JuiceFS 能够“挂羊头卖狗肉”（把底层的对象存储伪装成完美的本地硬盘）的核心魔法。 要彻底搞懂 FUSE，我们需要从 Linux 操作系统的底层权限设计说起。 一、 传统文件系统的痛点（内核态的特..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-31T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.67,"words":1101},"filePathRelative":"posts/AI基础设施/data_Infra/分布式存储/FUSE.md","excerpt":"<p>在 Linux 操作系统和云原生存储领域，<strong>FUSE</strong> 的全称是 <strong>Filesystem in Userspace（用户空间文件系统）</strong>。</p>\\n<p>它是我们前面聊到的 JuiceFS 能够“挂羊头卖狗肉”（把底层的对象存储伪装成完美的本地硬盘）的核心魔法。</p>\\n<p>要彻底搞懂 FUSE，我们需要从 Linux 操作系统的底层权限设计说起。</p>\\n<h3>一、 传统文件系统的痛点（内核态的特权）</h3>\\n<p>在 Linux 系统中，分为“内核态（Kernel Space）”<strong>和</strong>“用户态（User Space）”：</p>","autoDesc":true}`),i={name:`FUSE.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在 Linux 操作系统和云原生存储领域，<strong>FUSE</strong> 的全称是 <strong>Filesystem in Userspace（用户空间文件系统）</strong>。</p>
<p>它是我们前面聊到的 JuiceFS 能够“挂羊头卖狗肉”（把底层的对象存储伪装成完美的本地硬盘）的核心魔法。</p>
<p>要彻底搞懂 FUSE，我们需要从 Linux 操作系统的底层权限设计说起。</p>
<h3 id="一、-传统文件系统的痛点-内核态的特权" tabindex="-1"><a class="header-anchor" href="#一、-传统文件系统的痛点-内核态的特权"><span>一、 传统文件系统的痛点（内核态的特权）</span></a></h3>
<p>在 Linux 系统中，分为“内核态（Kernel Space）”<strong>和</strong>“用户态（User Space）”：</p>
<ul>
<li>
<p><strong>用户态</strong>：你平时运行的普通程序（如 Python、Nginx、甚至 <code v-pre>ls</code> 命令）都在这里，权限很低。</p>
</li>
<li>
<p><strong>内核态</strong>：掌握生杀大权，负责直接操控物理硬件（CPU、网卡、硬盘）。</p>
</li>
</ul>
<p>在传统架构下，所有的文件系统（比如 ext4、XFS、或者你之前提到的 GPFS 内核版）都必须写在<strong>内核态</strong>里。</p>
<p>这就带来了一个巨大的灾难：<strong>开发难度极高，且极不安全。</strong> 只要文件系统的代码里有一个小 Bug，整个 Linux 操作系统就会直接崩溃（Kernel Panic），也就是俗称的“死机”。</p>
<h3 id="二、-fuse-的诞生-把文件系统搬到-用户态" tabindex="-1"><a class="header-anchor" href="#二、-fuse-的诞生-把文件系统搬到-用户态"><span>二、 FUSE 的诞生：把文件系统搬到“用户态”</span></a></h3>
<p>为了让开发者能够用 Go、Python、C++ 像写普通软件一样去写文件系统，而不用担心把系统搞死，Linux 内核引入了 <strong>FUSE</strong> 模块。</p>
<p><strong>FUSE 本质上是一个“内核中的桥梁兼翻译官”。</strong> 它允许开发者在没有任何特权的“用户态”中，实现一个完整的文件系统。</p>
<p>当你启动 JuiceFS 客户端或者使用 <code v-pre>rclone mount</code> 命令时，它们底层依赖的全部都是 FUSE 技术。</p>
<h3 id="三、-数据流转路径-fuse-是如何工作的" tabindex="-1"><a class="header-anchor" href="#三、-数据流转路径-fuse-是如何工作的"><span>三、 数据流转路径（FUSE 是如何工作的？）</span></a></h3>
<p>假设你在挂载了 JuiceFS 的目录里执行了一句最简单的读取代码：<code v-pre>open('/mnt/jfs/video.mp4')</code>。底层的流转路径是这样的：</p>
<ol>
<li>
<p><strong>发起请求（用户态）</strong>：你的 Python 程序发起读取文件的系统调用。</p>
</li>
<li>
<p><strong>VFS 拦截（内核态）</strong>：请求进入 Linux 内核的虚拟文件系统层（VFS）。VFS 发现这个目录属于 FUSE，就把请求转交给内核中的 <code v-pre>fuse.ko</code> 模块。</p>
</li>
<li>
<p><strong>穿透回传（回到用户态）</strong>：内核的 FUSE 模块通过一个特殊的设备文件（<code v-pre>/dev/fuse</code>），把这个请求<strong>踢出内核</strong>，传给了在用户态默默运行的 <strong>JuiceFS 客户端进程</strong>。</p>
</li>
<li>
<p><strong>真正干活（用户态）</strong>：JuiceFS 客户端接到了这个指令，去查远端的 Redis 拿块编号，去远端的 MinIO 拉取真实数据块，然后在内存里拼装好。</p>
</li>
<li>
<p><strong>原路返回</strong>：JuiceFS 客户端把拼装好的数据，通过 <code v-pre>/dev/fuse</code> 传回给内核，内核再交回给你的 Python 程序。</p>
</li>
</ol>
<p>对于你的 Python 程序来说，它以为自己只是在读一块普通的本地硬盘，根本不知道底层经历了一场极其复杂的“跨界微服务调用”。</p>
<h3 id="四、-fuse-的优缺点对比" tabindex="-1"><a class="header-anchor" href="#四、-fuse-的优缺点对比"><span>四、 FUSE 的优缺点对比</span></a></h3>
<table>
<thead>
<tr>
<th><strong>维度</strong></th>
<th><strong>评价</strong></th>
<th><strong>详解</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>安全性与稳定性</strong></td>
<td><strong>极佳</strong></td>
<td>如果 JuiceFS 或 rclone 客户端发生 Bug 崩溃了，它只会作为一个普通进程死掉，Linux 操作系统本身和其他程序安然无恙。重启客户端即可恢复。</td>
</tr>
<tr>
<td><strong>开发灵活性</strong></td>
<td><strong>极高</strong></td>
<td>开发者几乎可以用任何语言（Go, Rust, Python）编写文件系统。你可以把阿里云 OSS、FTP 甚至是一个 Gmail 邮箱，通过 FUSE 挂载成 Linux 的本地目录。</td>
</tr>
<tr>
<td><strong>性能损耗</strong></td>
<td><strong>存在瓶颈</strong></td>
<td>这是 FUSE 唯一的弱点。正如上面的流转路径所示，一次简单的读写，数据需要在“用户态 -&gt; 内核态 -&gt; 用户态”之间来回穿梭（上下文切换 Context Switch）。在应对极其海量的超小文件并发访问时，这种切换开销会吃掉大量的 CPU 资源。</td>
</tr>
</tbody>
</table>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h3>
<p><strong>FUSE 是一把打破内核垄断的钥匙。</strong> 它用微小的性能损耗（上下文切换），换取了存储架构的极度灵活。</p>
<p>正是因为有了 FUSE，现代的云原生存储（如 JuiceFS、CephFS 的 FUSE 客户端、甚至早期的 Weka 兼容层）才能在完全不修改底层 Linux 内核的情况下，将庞大复杂的分布式存储协议，极其优雅地呈现为算法工程师最熟悉的一个普通本地文件夹。</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};