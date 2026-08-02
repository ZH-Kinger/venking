import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/%E8%AE%AD%E7%BB%83%E6%9E%B6%E6%9E%84/%E5%88%86%E5%B8%83%E5%BC%8F%E8%AE%AD%E7%BB%83/%E9%AB%98%E6%80%A7%E8%83%BD%E7%BD%91%E7%BB%9C%E4%B8%8E%E5%AD%98%E5%82%A8%E5%B1%82/%E5%AD%98%E5%82%A8%E6%9E%B6%E6%9E%84/%E9%AB%98%E6%80%A7%E8%83%BD%E5%AD%98%E5%82%A8(CPFS_WEKA)/GPFS.html","title":"GPFS","lang":"zh-CN","frontmatter":{"title":"GPFS","icon":"cpu","date":"2026-07-23T00:00:00.000Z","category":["AI基础设施"],"description":"GPFS（General Parallel File System），现已被 IBM 更名为 IBM Spectrum Scale。它是全球顶级超算中心（HPC）和大型 AI 计算集群长期以来的“御用”底层存储系统，代表了传统架构下商业并行文件系统的最高水平。 如果你在构建大模型计算底座，理解 GPFS 的工作原理，就等于理解了所有高性能 AI 存储（...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"GPFS\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/%E8%AE%AD%E7%BB%83%E6%9E%B6%E6%9E%84/%E5%88%86%E5%B8%83%E5%BC%8F%E8%AE%AD%E7%BB%83/%E9%AB%98%E6%80%A7%E8%83%BD%E7%BD%91%E7%BB%9C%E4%B8%8E%E5%AD%98%E5%82%A8%E5%B1%82/%E5%AD%98%E5%82%A8%E6%9E%B6%E6%9E%84/%E9%AB%98%E6%80%A7%E8%83%BD%E5%AD%98%E5%82%A8(CPFS_WEKA)/GPFS.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"GPFS"}],["meta",{"property":"og:description","content":"GPFS（General Parallel File System），现已被 IBM 更名为 IBM Spectrum Scale。它是全球顶级超算中心（HPC）和大型 AI 计算集群长期以来的“御用”底层存储系统，代表了传统架构下商业并行文件系统的最高水平。 如果你在构建大模型计算底座，理解 GPFS 的工作原理，就等于理解了所有高性能 AI 存储（..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.89,"words":867},"filePathRelative":"posts/AI基础设施/学习计划/训练架构/分布式训练/高性能网络与存储层/存储架构/高性能存储(CPFS_WEKA)/GPFS.md","excerpt":"<p><strong>GPFS（General Parallel File System）</strong>，现已被 IBM 更名为 <strong>IBM Spectrum Scale</strong>。它是全球顶级超算中心（HPC）和大型 AI 计算集群长期以来的“御用”底层存储系统，代表了传统架构下<strong>商业并行文件系统</strong>的最高水平。</p>\\n<p>如果你在构建大模型计算底座，理解 GPFS 的工作原理，就等于理解了所有高性能 AI 存储（包括阿里云 CPFS）的底层逻辑。</p>\\n<h3>核心原理：什么是“并行（Parallel）”？</h3>\\n<p>要理解 GPFS，可以把它和传统的网络共享存储（如 NFS）做一个对比：</p>","autoDesc":true}`),i={name:`GPFS.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p><strong>GPFS（General Parallel File System）</strong>，现已被 IBM 更名为 <strong>IBM Spectrum Scale</strong>。它是全球顶级超算中心（HPC）和大型 AI 计算集群长期以来的“御用”底层存储系统，代表了传统架构下<strong>商业并行文件系统</strong>的最高水平。</p>
<p>如果你在构建大模型计算底座，理解 GPFS 的工作原理，就等于理解了所有高性能 AI 存储（包括阿里云 CPFS）的底层逻辑。</p>
<h3 id="核心原理-什么是-并行-parallel" tabindex="-1"><a class="header-anchor" href="#核心原理-什么是-并行-parallel"><span>核心原理：什么是“并行（Parallel）”？</span></a></h3>
<p>要理解 GPFS，可以把它和传统的网络共享存储（如 NFS）做一个对比：</p>
<ul>
<li>
<p><strong>传统 NFS（单车道收费站）</strong>：所有的读写请求，都必须经过一台特定的 NAS 服务器网卡。当上百张 GPU 同时去读几十 GB 的数据时，这台服务器的网卡瞬间就会被挤爆。</p>
</li>
<li>
<p><strong>GPFS（多车道高速公路）</strong>：它将“元数据（文件的目录、属性）”和“实际数据”分离开来。当你写入一个大文件时，GPFS 会把这个文件像切吐司一样切成无数个 Block（数据块），然后<strong>均匀打散存储在后端的几十上百台存储节点上</strong>。</p>
<p>当计算节点（GPU 服务器）去读取这个文件时，它是<strong>同时向后端所有的存储节点发起并发读取请求的</strong>。这就把单台服务器的网络压力，分摊到了整个集群的网卡上，从而实现极度恐怖的聚合吞吐量（几十甚至几百 GB/s）。</p>
</li>
</ul>
<h3 id="gpfs-的三大硬核技术特征" tabindex="-1"><a class="header-anchor" href="#gpfs-的三大硬核技术特征"><span>GPFS 的三大硬核技术特征</span></a></h3>
<ol>
<li>
<p><strong>极速的 POSIX 兼容性</strong></p>
<p>不像对象存储（S3）需要用特定的 API 去调用数据，GPFS 呈现给你的就是一个最普通的本地文件夹。你在上面跑 Python 脚本、Hugging Face Dataloader 或 PyTorch 代码，直接用传统的 <code v-pre>open('/mnt/gpfs/data.json')</code> 就能读写，且拥有极速性能。</p>
</li>
<li>
<p><strong>变态级的分布式锁管理器（DLM &amp; Token Management）</strong></p>
<p>这是 GPFS 称霸超算界的核心护城河。当一千台计算节点同时试图修改同一个文件时，GPFS 通过极其复杂的令牌（Token）机制来管理读写锁，确保数据绝对不会产生冲突或损坏。</p>
</li>
<li>
<p><strong>极其灵活的存储分层（ILM, Information Lifecycle Management）</strong></p>
<p>GPFS 允许你把不同速度的硬件（NVMe 闪存、普通机械硬盘、甚至磁带）混搭在一个文件系统里。你可以配置策略：让大模型正在训练的“热数据”跑在昂贵的 NVMe 上，训练结束一个月不碰的“冷数据”自动流转到便宜的机械硬盘上，但对用户来说，文件路径看起来完全没变。</p>
</li>
</ol>
<h3 id="在现代云原生架构中的映射" tabindex="-1"><a class="header-anchor" href="#在现代云原生架构中的映射"><span>在现代云原生架构中的映射</span></a></h3>
<p>在过去的机房里，部署一套 GPFS 需要购买 IBM 昂贵的软件授权和专有硬件，部署和运维极其复杂。</p>
<p>随着公有云的崛起，为了让 AI 开发者能用上这种超算级别的读写性能，云厂商开始将这种并行架构“云化”。你之前接触过的<strong>阿里云 CPFS（Cloud Parallel File System）</strong>，其早期架构正是脱胎于 GPFS 的商业定制版。它屏蔽了底层复杂的集群搭建过程，让你一键就能拉起一个拥有类似 GPFS 极速并发能力的缓存盘，直接挂载给 K8s (ACK) 或 PAI DLC 里的 GPU 去爆算。</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};