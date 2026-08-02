import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/%E9%AB%98%E5%90%9E%E5%90%90%E5%88%86%E5%B8%83%E5%BC%8F%E7%BD%91%E7%BB%9C%E6%9E%B6%E6%9E%84(%E7%89%A9%E7%90%86%E5%88%86%E5%8F%91)/RDMA.html","title":"RDMA","lang":"zh-CN","frontmatter":{"title":"RDMA","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"梓涵，既然你已经了解了 InfiniBand 和 RoCE，那 RDMA 就是它们共同的“核心灵魂”。 简单来说，RDMA (Remote Direct Memory Access)，翻译过来就是 “远程直接内存访问”。它是分布式计算和 AI 基础设施中最重要的网络黑科技之一。 1. 为什么需要 RDMA？（传统网络的“痛”） 在传统的 TCP/IP ...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"RDMA\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/RDMA-1.png\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/%E9%AB%98%E5%90%9E%E5%90%90%E5%88%86%E5%B8%83%E5%BC%8F%E7%BD%91%E7%BB%9C%E6%9E%B6%E6%9E%84(%E7%89%A9%E7%90%86%E5%88%86%E5%8F%91)/RDMA.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"RDMA"}],["meta",{"property":"og:description","content":"梓涵，既然你已经了解了 InfiniBand 和 RoCE，那 RDMA 就是它们共同的“核心灵魂”。 简单来说，RDMA (Remote Direct Memory Access)，翻译过来就是 “远程直接内存访问”。它是分布式计算和 AI 基础设施中最重要的网络黑科技之一。 1. 为什么需要 RDMA？（传统网络的“痛”） 在传统的 TCP/IP ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/RDMA-1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.66,"words":797},"filePathRelative":"posts/AI大模型/AI大模型/高吞吐分布式网络架构(物理分发)/RDMA.md","excerpt":"<p>梓涵，既然你已经了解了 InfiniBand 和 RoCE，那 <strong>RDMA</strong> 就是它们共同的“核心灵魂”。</p>\\n<p>简单来说，<strong>RDMA (Remote Direct Memory Access)</strong>，翻译过来就是 <strong>“远程直接内存访问”</strong>。它是分布式计算和 AI 基础设施中最重要的网络黑科技之一。</p>\\n<figure><img src=\\"/blog/assets/posts/RDMA-1.png\\" alt tabindex=\\"0\\" loading=\\"lazy\\"><figcaption></figcaption></figure>","autoDesc":true}`),i={name:`RDMA.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>梓涵，既然你已经了解了 InfiniBand 和 RoCE，那 <strong>RDMA</strong> 就是它们共同的“核心灵魂”。</p>
<p>简单来说，<strong>RDMA (Remote Direct Memory Access)</strong>，翻译过来就是 <strong>“远程直接内存访问”</strong>。它是分布式计算和 AI 基础设施中最重要的网络黑科技之一。</p>
<figure><img src="/blog/assets/posts/RDMA-1.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<hr>
<h2 id="_1-为什么需要-rdma-传统网络的-痛" tabindex="-1"><a class="header-anchor" href="#_1-为什么需要-rdma-传统网络的-痛"><span>1. 为什么需要 RDMA？（传统网络的“痛”）</span></a></h2>
<p>在传统的 <strong>TCP/IP</strong> 网络中，数据搬运是一个非常累人的过程：</p>
<ol>
<li><strong>多次拷贝</strong>：数据要从网卡拷到内核内存，再从内核内存拷到用户程序的内存。</li>
<li><strong>CPU 疯狂打工</strong>：每一次数据包的拆解、封装和拷贝，都需要 CPU 亲自下场处理中断。</li>
<li><strong>高延迟</strong>：这一来二去，时间都浪费在“搬运”和“等待 CPU”上了。</li>
</ol>
<p>在 AI 训练时，如果你有 1000 块 GPU 要交换数据，如果还用 TCP/IP，那 CPU 全在搬运数据了，根本没空管模型。</p>
<hr>
<h2 id="_2-rdma-是怎么解决的-顺丰直达" tabindex="-1"><a class="header-anchor" href="#_2-rdma-是怎么解决的-顺丰直达"><span>2. RDMA 是怎么解决的？（“顺丰直达”）</span></a></h2>
<p>RDMA 的核心思想是：<strong>“绕过 CPU，直接送货上门。”</strong></p>
<p>它的工作流程是：</p>
<ul>
<li><strong>零拷贝 (Zero-copy)</strong>：数据直接从一台机器的应用程序内存，通过网卡，直接写到另一台机器的应用程序内存中。</li>
<li><strong>内核旁路 (Kernel Bypass)</strong>：不需要进入复杂的 Linux 内核协议栈。网卡直接和用户态程序对话。</li>
<li><strong>CPU 卸载 (CPU Offload)</strong>：数据传输过程中，两边的 CPU 都在“睡觉”或者干别的活，完全不参与搬运。</li>
</ul>
<p><strong>比喻</strong>：</p>
<ul>
<li><strong>传统方式</strong>：你要给邻居送快递，得先送去邮局（内核），邮局分拣后再送去邻居家的收发室，邻居再去拿。</li>
<li><strong>RDMA 方式</strong>：你直接拿着邻居家的备用钥匙（内存地址权限），把快递轻轻放在他卧室的桌子上。</li>
</ul>
<hr>
<h2 id="_3-rdma-的三大支柱" tabindex="-1"><a class="header-anchor" href="#_3-rdma-的三大支柱"><span>3. RDMA 的三大支柱</span></a></h2>
<p>要实现这种“直达”效果，需要依靠：</p>
<ol>
<li><strong>RNIC (RDMA 网卡)</strong>：特殊的网卡硬件，具备直接读写内存的逻辑。</li>
<li><strong>队列对 (Queue Pair, QP)</strong>：发送端和接收端建立的直接通信通道。</li>
<li><strong>内存注册 (Memory Registration)</strong>：程序必须提前告诉网卡，哪块内存区域是允许远程访问的，以保证安全。</li>
</ol>
<hr>
<h2 id="_4-rdma-的三种实现方式" tabindex="-1"><a class="header-anchor" href="#_4-rdma-的三种实现方式"><span>4. RDMA 的三种实现方式</span></a></h2>
<p>你在上一条提问中见到的技术，其实就是 RDMA 的不同“马甲”：</p>
<ul>
<li><strong>InfiniBand (IB)</strong>：RDMA 的原生形态，性能最强，但硬件最贵。</li>
<li><strong>RoCE (v1/v2)</strong>：让 RDMA 跑在以太网上。目前 AI 推理和云数据中心最主流的选择。</li>
<li><strong>iWARP</strong>：通过 TCP 协议跑 RDMA。延迟略高，但对网络要求低，现在用得比较少了。</li>
</ul>
<hr>
<h2 id="aiops-总结点" tabindex="-1"><a class="header-anchor" href="#aiops-总结点"><span>AIOps 总结点</span></a></h2>
<p>在你的博客中，你可以这样给读者科普 RDMA 的意义：</p>
<p>“在分布式智能体协作或大模型推理中，<strong>RDMA</strong> 是解决‘通讯墙’的关键。它实现了<strong>计算（CPU/GPU）与传输（Network）的彻底解耦</strong>。有了 RDMA，网络传输不再是系统的负担，而变成了几乎透明的‘内存扩展’。这就是为什么我们能在大规模集群上实现亚毫秒级响应的底层逻辑。”</p>
<hr>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};