import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E9%9D%A2%E8%AF%95/%E5%86%85%E6%A0%B8%E8%B0%83%E4%BC%98(Kernel_Tuning).html","title":"内核调优(Kernel_Tuning)","lang":"zh-CN","frontmatter":{"title":"内核调优(Kernel_Tuning)","icon":"clipboard-text","date":"2026-07-23T00:00:00.000Z","category":["面试"],"description":"内核调优（Kernel Tuning）在 SRE 运维中是提升系统在高并发场景下承载上限的关键手段。在你的项目一和项目二中，通过调优将并发承载能力提升了 30%，这在面试中是一个非常硬核的加分项。 内核调优的操作主要通过 **sysctl** 工具及其配置文件进行，核心逻辑是优化“网络协议栈”、“文件描述符”和“内存管理”。 一、 核心操作步骤 在 L...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"内核调优(Kernel_Tuning)\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E9%9D%A2%E8%AF%95/%E5%86%85%E6%A0%B8%E8%B0%83%E4%BC%98(Kernel_Tuning).html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"内核调优(Kernel_Tuning)"}],["meta",{"property":"og:description","content":"内核调优（Kernel Tuning）在 SRE 运维中是提升系统在高并发场景下承载上限的关键手段。在你的项目一和项目二中，通过调优将并发承载能力提升了 30%，这在面试中是一个非常硬核的加分项。 内核调优的操作主要通过 **sysctl** 工具及其配置文件进行，核心逻辑是优化“网络协议栈”、“文件描述符”和“内存管理”。 一、 核心操作步骤 在 L..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.97,"words":891},"filePathRelative":"posts/面试/字节面试/内核调优(Kernel_Tuning).md","excerpt":"<p>内核调优（Kernel Tuning）在 SRE 运维中是提升系统在高并发场景下承载上限的关键手段。在你的项目一和项目二中，通过调优将并发承载能力提升了 30%，这在面试中是一个非常硬核的加分项。</p>\\n<p>内核调优的操作主要通过 <code>**sysctl**</code> 工具及其配置文件进行，核心逻辑是优化“网络协议栈”、“文件描述符”和“内存管理”。</p>\\n<hr>\\n<h3>一、 核心操作步骤</h3>\\n<p>在 Linux (Rocky/CentOS) 中，操作流程如下：</p>\\n<p><strong>临时修改（立即生效，重启失效）</strong>：</p>\\n<div class=\\"language-plain line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"plain\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code class=\\"language-plain\\"><span class=\\"line\\"><span># 例如：临时开启 TCP 连接复用</span></span>\\n<span class=\\"line\\"><span>sysctl -w net.ipv4.tcp_tw_reuse=1</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`),i={name:`内核调优(Kernel_Tuning).md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>内核调优（Kernel Tuning）在 SRE 运维中是提升系统在高并发场景下承载上限的关键手段。在你的项目一和项目二中，通过调优将并发承载能力提升了 30%，这在面试中是一个非常硬核的加分项。</p>
<p>内核调优的操作主要通过 <code v-pre>**sysctl**</code> 工具及其配置文件进行，核心逻辑是优化“网络协议栈”、“文件描述符”和“内存管理”。</p>
<hr>
<h3 id="一、-核心操作步骤" tabindex="-1"><a class="header-anchor" href="#一、-核心操作步骤"><span>一、 核心操作步骤</span></a></h3>
<p>在 Linux (Rocky/CentOS) 中，操作流程如下：</p>
<p><strong>临时修改（立即生效，重启失效）</strong>：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 例如：临时开启 TCP 连接复用</span></span>
<span class="line"><span>sysctl -w net.ipv4.tcp_tw_reuse=1</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li><strong>永久修改（生产标准）</strong>：</li>
</ol>
<p>编辑 <code v-pre>/etc/sysctl.conf</code> 或在 <code v-pre>/etc/sysctl.d/</code> 目录下创建新文件（如 <code v-pre>99-tuning.conf</code>）。</p>
<p><strong>生效配置</strong>：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>sysctl -p  # 加载配置文件到内核</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><hr>
<h3 id="二、-针对你项目的核心参数调优-面试必背" tabindex="-1"><a class="header-anchor" href="#二、-针对你项目的核心参数调优-面试必背"><span>二、 针对你项目的核心参数调优（面试必背）</span></a></h3>
<p>面试官会问你“具体调了哪些参数”，建议按功能分类回答：</p>
<h4 id="_1-网络连接优化-解决高并发下的端口耗尽与延迟" tabindex="-1"><a class="header-anchor" href="#_1-网络连接优化-解决高并发下的端口耗尽与延迟"><span>1. 网络连接优化（解决高并发下的端口耗尽与延迟）</span></a></h4>
<p>这是 LVS 和 Web 集群最需要的调优。</p>
<ul>
<li><code v-pre>**net.ipv4.tcp_tw_reuse = 1**</code>：允许将处于 <code v-pre>TIME_WAIT</code> 状态的 socket 重新用于新的 TCP 连接。防止高并发下端口被占满。</li>
<li><code v-pre>**net.ipv4.tcp_max_syn_backlog = 8192**</code>：增加 SYN 队列长度。防止半连接攻击或瞬时流量过大导致丢包。</li>
<li><code v-pre>**net.core.somaxconn = 4096**</code>：增大服务端完全连接队列。默认只有 128，在高并发 Web 场景下明显不足。</li>
<li><code v-pre>**net.ipv4.tcp_fin_timeout = 30**</code>：缩短处于 <code v-pre>FIN-WAIT-2</code> 状态的时间，加快连接释放。</li>
</ul>
<h4 id="_2-文件句柄优化-解决-too-many-open-files-报错" tabindex="-1"><a class="header-anchor" href="#_2-文件句柄优化-解决-too-many-open-files-报错"><span>2. 文件句柄优化（解决“Too many open files”报错）</span></a></h4>
<p>Linux 一切皆文件，每个连接都要占用一个文件描述符。</p>
<ul>
<li><code v-pre>**fs.file-max = 655350**</code>：系统级别允许打开的最大文件总数。</li>
<li><strong>配合</strong> <code v-pre>**ulimit**</code> <strong>修改</strong>：除了内核参数，还需要修改 <code v-pre>/etc/security/limits.conf</code>，设置进程级别的 <code v-pre>soft</code> 和 <code v-pre>hard</code> 限制。</li>
</ul>
<h4 id="_3-内存与虚拟内存调优" tabindex="-1"><a class="header-anchor" href="#_3-内存与虚拟内存调优"><span>3. 内存与虚拟内存调优</span></a></h4>
<ul>
<li><code v-pre>**vm.swappiness = 10**</code>：降低对 Swap 分区的使用频率。SRE 倾向于尽可能使用物理内存以保证 I/O 性能。</li>
</ul>
<hr>
<h3 id="三、-为什么要调优-sre-深度思考" tabindex="-1"><a class="header-anchor" href="#三、-为什么要调优-sre-深度思考"><span>三、 为什么要调优？（SRE 深度思考）</span></a></h3>
<p>面试官可能会追问：<strong>“为什么 Linux 默认参数不能直接满足高并发需求？”</strong></p>
<p><strong>你的回答逻辑：</strong></p>
<ol>
<li><strong>通用性 vs. 专业性</strong>：Linux 默认参数是为了兼顾桌面端、嵌入式等各种通用场景，配置较为保守（比如 <code v-pre>somaxconn</code> 默认为 128）。</li>
<li><strong>资源保护机制</strong>：内核默认参数通常带有一种“自我保护”机制，防止单个服务耗尽所有系统资源导致内核挂掉（Panic）。</li>
<li><strong>SRE 的职责</strong>：我们的职责是根据**压测（如你使用的 ab/PTS）**反馈的瓶颈，有针对性地打破这些限制。例如，当你观察到监控看板上 <code v-pre>TIME_WAIT</code> 指标飙升且新建连接失败时，调优 <code v-pre>tcp_tw_reuse</code> 就是唯一的解决方案。</li>
</ol>
<hr>
<h3 id="四、-字节跳动面试防坑指南" tabindex="-1"><a class="header-anchor" href="#四、-字节跳动面试防坑指南"><span>四、 字节跳动面试防坑指南</span></a></h3>
<ol>
<li><strong>不要背参数，要讲场景</strong>：</li>
</ol>
<p>不要说“我改了 tcp_tw_reuse 等于 1”，要说“在压测 LVS-DR 架构时，我发现客户端出现大量连接重置，通过监控发现 <code v-pre>TIME_WAIT</code> 状态连接数达到了 2 万，导致端口耗尽，于是我开启了连接复用”。</p>
<ol start="2">
<li><strong>注意前提条件</strong>：</li>
</ol>
<p>开启 <code v-pre>tcp_tw_reuse</code> 的前提是 <code v-pre>**net.ipv4.tcp_timestamps = 1**</code>（必须开启时间戳控制），否则会有数据错乱风险。如果你能主动提到这一点，面试官会觉得你对协议栈理解非常透彻。</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};