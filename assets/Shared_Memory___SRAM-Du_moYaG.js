import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/AI_infra/%E8%BF%90%E7%AE%97%E6%B5%81%E6%B0%B4%E7%BA%BF%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86/Shared_Memory___SRAM.html","title":"Shared_Memory_&_SRAM","lang":"zh-CN","frontmatter":{"title":"Shared_Memory_&_SRAM","icon":"cpu","date":"2026-07-23T00:00:00.000Z","category":["AI基础设施"],"description":"在英伟达 GPU（以及许多异构处理器）的语境下，SRAM 是一种芯片硬件层面的“晶体管物理构造”，而 Shared Memory（共享内存）则是运行在这个硬件上的一种“软件可控的存储层级抽象”。 它们的关系就像 “硅基木材”与“做出来的桌子”。为了让你在底层架构和算子开发时完全不混淆，我们直接切入它们的物理本质和本质区别： 一、 SRAM：物理硬件材料...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Shared_Memory_&_SRAM\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/AI_infra/%E8%BF%90%E7%AE%97%E6%B5%81%E6%B0%B4%E7%BA%BF%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86/Shared_Memory___SRAM.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"Shared_Memory_&_SRAM"}],["meta",{"property":"og:description","content":"在英伟达 GPU（以及许多异构处理器）的语境下，SRAM 是一种芯片硬件层面的“晶体管物理构造”，而 Shared Memory（共享内存）则是运行在这个硬件上的一种“软件可控的存储层级抽象”。 它们的关系就像 “硅基木材”与“做出来的桌子”。为了让你在底层架构和算子开发时完全不混淆，我们直接切入它们的物理本质和本质区别： 一、 SRAM：物理硬件材料..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.92,"words":1175},"filePathRelative":"posts/AI基础设施/学习计划/AI_infra/运算流水线工作原理/Shared_Memory_&_SRAM.md","excerpt":"<p>在英伟达 GPU（以及许多异构处理器）的语境下，<strong>SRAM 是一种芯片硬件层面的“晶体管物理构造”，而 Shared Memory（共享内存）则是运行在这个硬件上的一种“软件可控的存储层级抽象”。</strong></p>\\n<p>它们的关系就像 <strong>“硅基木材”与“做出来的桌子”</strong>。为了让你在底层架构和算子开发时完全不混淆，我们直接切入它们的物理本质和本质区别：</p>\\n<hr>\\n<h3>一、 SRAM：物理硬件材料（It's Hardware）</h3>\\n<p><strong>SRAM（Static Random-Access Memory，静态随机存取内存）</strong> 是一种纯粹的<strong>物理硬件芯片构造</strong>。</p>","autoDesc":true}`),i={name:`Shared_Memory_&_SRAM.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在英伟达 GPU（以及许多异构处理器）的语境下，<strong>SRAM 是一种芯片硬件层面的“晶体管物理构造”，而 Shared Memory（共享内存）则是运行在这个硬件上的一种“软件可控的存储层级抽象”。</strong></p>
<p>它们的关系就像 <strong>“硅基木材”与“做出来的桌子”</strong>。为了让你在底层架构和算子开发时完全不混淆，我们直接切入它们的物理本质和本质区别：</p>
<hr>
<h3 id="一、-sram-物理硬件材料-it-s-hardware" tabindex="-1"><a class="header-anchor" href="#一、-sram-物理硬件材料-it-s-hardware"><span>一、 SRAM：物理硬件材料（It's Hardware）</span></a></h3>
<p><strong>SRAM（Static Random-Access Memory，静态随机存取内存）</strong> 是一种纯粹的<strong>物理硬件芯片构造</strong>。</p>
<ul>
<li><strong>物理实现</strong>：它通常由 6 个晶体管（6T）组成一个比特位。它不需要刷新电路，只要通电，数据就能永久锁死在晶体管的状态里。</li>
<li><strong>物理特性</strong>：</li>
<li><strong>速度无敌快</strong>：它的读写延迟通常只有几个时钟周期（几纳秒），而显卡片外的主显存（HBM 或 GDDR）读写延迟高达几百个周期（数百纳秒）。</li>
<li><strong>能耗极低</strong>：因为数据不需要像 DRAM 那样频繁电容充放电，所以搬运数据的功耗非常小。</li>
<li><strong>面积巨大、容量极小</strong>：6个晶体管才存1个比特，导致它在硅片上极其吃面积。所以每块显卡内部的 SRAM 总量非常珍贵（通常只有几百 KB 到十几 MB）。</li>
<li><strong>硬件分工</strong>：在 GPU 芯片内部，<strong>所有的 L1 Cache（一级缓存）、L2 Cache（二级缓存）、寄存器堆（Register File）以及共享内存（Shared Memory），在物理材料上全都是由 SRAM 制造的。</strong></li>
</ul>
<hr>
<h3 id="二、-shared-memory-软件和架构层面的抽象-it-s-architecture-software-logic" tabindex="-1"><a class="header-anchor" href="#二、-shared-memory-软件和架构层面的抽象-it-s-architecture-software-logic"><span>二、 Shared Memory：软件和架构层面的抽象（It's Architecture / Software Logic）</span></a></h3>
<p><strong>Shared Memory（共享内存）</strong> 是 GPU 流多处理器（SM）内部、<strong>由程序员通过代码完全控制的、驻留在 SRAM 硬件上的一块高速存储空间。</strong></p>
<ul>
<li><strong>它的存在意义</strong>：传统的 CPU 缓存（L1/L2 Cache）是“硬件和操作系统完全托管”的，程序员写代码时无法决定把哪个变量锁在 L1 缓存里。而 GPU 为了追求极致的算子性能，开辟了 Shared Memory。它在编程模型里是一个<strong>明确暴露给程序员的地址空间</strong>。</li>
<li><strong>核心特性</strong>：</li>
<li><strong>软件可控（Scratchpad Memory）</strong>：你可以像在 Triton 或 CUDA C++ 里写 <code v-pre>tl.load</code> 或分配共享空间那样，强行命令数据“现在、立刻、马上从主显存搬进这块高速空间，我不发指令你绝对不准把它擦掉”。</li>
<li><strong>线程块内共享（Block-level Shared）</strong>：同一个线程块（Thread Block / Warp Group）内部的所有并发线程，都可以同时读写这块内存空间，用来进行跨线程的高速数据交换和协同。</li>
</ul>
<hr>
<h3 id="三、-核心区别横评表" tabindex="-1"><a class="header-anchor" href="#三、-核心区别横评表"><span>三、 核心区别横评表</span></a></h3>
<table>
<thead>
<tr>
<th>维度</th>
<th>SRAM（静态随机存取内存）</th>
<th>Shared Memory（共享内存）</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>本质属性</strong></td>
<td><strong>芯片物理晶体管构造（硬件层）</strong></td>
<td><strong>内存层次抽象与编程模型接口（软件/架构层）</strong></td>
</tr>
<tr>
<td><strong>充当的角色</strong></td>
<td>原材料。GPU 内部的寄存器、L1、L2 缓存全部由它充当。</td>
<td>具体的储物间。它是硬件划分出来专供程序员代码调度的独立空间。</td>
</tr>
<tr>
<td><strong>可控性</strong></td>
<td>程序员无法直接感知或操作具体的晶体管。</td>
<td>程序员在算子开发（如 Triton、CUDA）中可以直接分配、读写它。</td>
</tr>
<tr>
<td><strong>生命周期</strong></td>
<td>与显卡硬件共存亡（只要通电就在）。</td>
<td>随着当前执行的算子（Kernel）线程块的启动而创建，销毁而释放。</td>
</tr>
</tbody>
</table>
<hr>
<h3 id="💡-在大模型算子-如-flashattention-里-它们是怎么交织的" tabindex="-1"><a class="header-anchor" href="#💡-在大模型算子-如-flashattention-里-它们是怎么交织的"><span>💡 在大模型算子（如 FlashAttention）里，它们是怎么交织的？</span></a></h3>
<p>当你在手写一个 <strong>FlashAttention</strong> 或者是矩阵乘法算子时：</p>
<ol>
<li>你规划了一个 <strong>Tiling（分块算法）</strong> 逻辑，开辟了一块名为 <code v-pre>smem</code> 的共享内存。</li>
<li>你的代码发动指令，把 $Q, K$ 矩阵的小方块从 HBM（慢速主显存）搬运到 <code v-pre>smem</code> 里。</li>
<li><strong>物理发生的事情</strong>：显卡硬件收到指令，启动 DMA 或 TMA 硬件单元，把数据通过总线抽向了物理 <strong>SRAM 芯片颗粒</strong> 中那块被划分为 <strong>Shared Memory</strong> 的特定晶体管区域。</li>
<li>紧接着，你让各个线程去 <code v-pre>smem</code> 里读数据算 Softmax。这时候，如果读写的索引没设计好，32个线程撞在了同一个物理 SRAM 晶体管分区上，就会触发我们前面提到的 <strong>Bank 冲突</strong>。</li>
</ol>
<p><strong>极简总结：</strong> SRAM 规定了这块存储能跑多快（硬件天花板），而 Shared Memory 决定了程序员能在这么快的存储里玩出什么花样（算子融合、消灭带宽瓶颈）。</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};