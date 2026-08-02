import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/%E8%AE%AD%E7%BB%83%E6%9E%B6%E6%9E%84/Cluster_monitor/DCGM_%E5%AE%8C%E6%95%B4%E5%8F%82%E6%95%B0%E4%B8%8E%E7%9B%91%E6%8E%A7%E6%8C%87%E6%A0%87%E9%80%9F%E6%9F%A5%E6%89%8B%E5%86%8C/Xid_Hardware_Failure.html","title":"Xid_Hardware_Failure","lang":"zh-CN","frontmatter":{"title":"Xid_Hardware_Failure","icon":"cpu","date":"2026-07-23T00:00:00.000Z","category":["AI基础设施"],"description":"在 AI 算力集群和 GPU 运维的语境下，XID（或者写作 Xid） 是英伟达（NVIDIA）GPU 驱动抛出的系统级底层错误代码。 它是 SRE 和 AI Infra 工程师排查 GPU 故障时最权威、最直接的“判官”。当 GPU 发生硬件故障、驱动崩溃、应用层越界或网络死锁时，NVIDIA 的内核驱动程序（NVRM）会向操作系统的内核日志（sys...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Xid_Hardware_Failure\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/%E8%AE%AD%E7%BB%83%E6%9E%B6%E6%9E%84/Cluster_monitor/DCGM_%E5%AE%8C%E6%95%B4%E5%8F%82%E6%95%B0%E4%B8%8E%E7%9B%91%E6%8E%A7%E6%8C%87%E6%A0%87%E9%80%9F%E6%9F%A5%E6%89%8B%E5%86%8C/Xid_Hardware_Failure.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"Xid_Hardware_Failure"}],["meta",{"property":"og:description","content":"在 AI 算力集群和 GPU 运维的语境下，XID（或者写作 Xid） 是英伟达（NVIDIA）GPU 驱动抛出的系统级底层错误代码。 它是 SRE 和 AI Infra 工程师排查 GPU 故障时最权威、最直接的“判官”。当 GPU 发生硬件故障、驱动崩溃、应用层越界或网络死锁时，NVIDIA 的内核驱动程序（NVRM）会向操作系统的内核日志（sys..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":5.31,"words":1594},"filePathRelative":"posts/AI基础设施/学习计划/训练架构/Cluster_monitor/DCGM_完整参数与监控指标速查手册/Xid_Hardware_Failure.md","excerpt":"<p>在 AI 算力集群和 GPU 运维的语境下，<strong>XID（或者写作 Xid）</strong> 是英伟达（NVIDIA）GPU 驱动抛出的<strong>系统级底层错误代码</strong>。</p>\\n<p>它是 SRE 和 AI Infra 工程师排查 GPU 故障时<strong>最权威、最直接的“判官”</strong>。当 GPU 发生硬件故障、驱动崩溃、应用层越界或网络死锁时，NVIDIA 的内核驱动程序（<code>NVRM</code>）会向操作系统的内核日志（<code>syslog</code> 或 <code>dmesg</code>）中打印一条包含特定 XID 数字的错误消息。</p>","autoDesc":true}`),i={name:`Xid_Hardware_Failure.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在 AI 算力集群和 GPU 运维的语境下，<strong>XID（或者写作 Xid）</strong> 是英伟达（NVIDIA）GPU 驱动抛出的<strong>系统级底层错误代码</strong>。</p>
<p>它是 SRE 和 AI Infra 工程师排查 GPU 故障时<strong>最权威、最直接的“判官”</strong>。当 GPU 发生硬件故障、驱动崩溃、应用层越界或网络死锁时，NVIDIA 的内核驱动程序（<code v-pre>NVRM</code>）会向操作系统的内核日志（<code v-pre>syslog</code> 或 <code v-pre>dmesg</code>）中打印一条包含特定 XID 数字的错误消息。</p>
<hr>
<h3 id="🔍-一、-如何发现和读取-xid-错误" tabindex="-1"><a class="header-anchor" href="#🔍-一、-如何发现和读取-xid-错误"><span>🔍 一、 如何发现和读取 XID 错误？</span></a></h3>
<p>XID 并不是由 PyTorch 直接抛出的，它隐藏在系统内核的最底层。你可以通过以下三个渠道抓取它：</p>
<ol>
<li><strong>宿主机内核日志（最原始、最精准）</strong>：<br>
在服务器终端运行以下命令，可以直接过滤出 XID 报错：</li>
</ol>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">dmesg</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -T</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">grep</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -i</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> NVRM</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 或者</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">journalctl</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -k</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">grep</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -i</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "Xid"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>典型的报错日志格式</em>：</p>
<blockquote>
<p><code v-pre>NVRM: Xid (PCI:0000:0e:00): 79, GPU has fallen off the bus.</code> <em>(这行日志意味着这物理槽位上的 GPU 掉卡了)</em></p>
</blockquote>
<ol start="2">
<li><strong>Prometheus 监控监控（AIOps 实时告警）</strong>：<br>
我们在 <code v-pre>dcgm_parameters_reference.md</code> 中提到的 <code v-pre>DCGM_FI_DEV_XID_ERRORS</code> <strong>(Field ID 152)</strong> 指标，会实时捕获最近一次发生的 XID 错误代码。</li>
<li><strong>Kubernetes 容器事件</strong>：<br>
如果宿主机安装了 NVIDIA Node Problem Detector (NPD)，XID 错误会被转化为 K8s Event，从而自动触发 Pod 驱逐。</li>
</ol>
<hr>
<h3 id="🛠️-二、-常见的-xid-故障代码大盘点" tabindex="-1"><a class="header-anchor" href="#🛠️-二、-常见的-xid-故障代码大盘点"><span>🛠️ 二、 常见的 XID 故障代码大盘点</span></a></h3>
<p>英伟达官方定义了上百个 XID 代码，但在大模型训练和 AI 算力集群中，<strong>最常遇到、杀伤力最大</strong>的主要是以下几类。我们将其分为：<strong>软件/算法导致的异常</strong>、<strong>硬件损坏（必须换卡）</strong>、以及<strong>驱动/固件卡死（需要复位/重启）</strong>。</p>
<h4 id="_1-软件-算法与显存越界类-通常无需更换硬件-需算法优化" tabindex="-1"><a class="header-anchor" href="#_1-软件-算法与显存越界类-通常无需更换硬件-需算法优化"><span>1. 软件/算法与显存越界类（通常无需更换硬件，需算法优化）</span></a></h4>
<table>
<thead>
<tr>
<th>XID 代码</th>
<th>错误英文全称</th>
<th>物理含义与痛点</th>
<th>根因与 SRE/算法解决手段</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>XID 31</strong></td>
<td><code v-pre>MMS-triggered Page Retirement</code></td>
<td><strong>显存页面退休事件或驱动分配异常。</strong> 通常伴随着显存耗尽或驱动在尝试回收不稳定的物理显存。</td>
<td><strong>排查</strong>：检查显存占用。这通常是 OOM（显存溢出）的前兆或伴生现象。</td>
</tr>
<tr>
<td><strong>XID 45</strong></td>
<td><code v-pre>Preemption Timeout</code></td>
<td><strong>抢占超时。</strong> 某个 CUDA 核心上运行的计算任务太霸道、运行时间过长，拒绝释放（Yield）计算资源给其他任务。</td>
<td><strong>根因</strong>：算法团队写了低效的 custom CUDA 算子、Triton 算子，或者代码中出现了死循环。</td>
</tr>
</tbody>
</table>
<p><strong>解决</strong>：优化算子，或调整驱动的抢占超时阈值。 |<br>
| <strong>XID 62</strong> | <code v-pre>Address Translation Fault</code> | <strong>地址翻译故障（即 GPU 端的“段错误 Segment Fault”）。</strong> GPU 尝试读写一个未分配、越界或已被释放的显存物理地址。 | <strong>根因</strong>：极其经典的算法 Bug。多发生于 custom 算子中的指针越界，或者 PyTorch 与底层 CUDA 驱动的版本冲突。</p>
<p><strong>解决</strong>：使用 <code v-pre>cuda-gdb</code> 或 <code v-pre>compute-sanitizer</code> 调试算法代码，定位越界的张量。 |</p>
<h4 id="_2-物理硬件损坏类-p0级灾难-通常必须联系厂商换卡" tabindex="-1"><a class="header-anchor" href="#_2-物理硬件损坏类-p0级灾难-通常必须联系厂商换卡"><span>2. 物理硬件损坏类（P0级灾难，通常必须联系厂商换卡）</span></a></h4>
<table>
<thead>
<tr>
<th>XID 代码</th>
<th>错误英文全称</th>
<th>物理含义与痛点</th>
<th>根因与 SRE/算法解决手段</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>XID 79</strong></td>
<td><code v-pre>GPU fallen off the bus</code></td>
<td><strong>GPU 掉卡（脱离 PCIe 总线）。</strong> 物理主板再也检测不到这张显卡，像被物理拔出了一样。</td>
<td><strong>根因</strong>：1. <strong>供电暴跌</strong>：GPU 暴算时瞬时电流过大把电源（PSU）打挂；2. <strong>热保护</strong>：温度过高触发硬件强制断电；3. <strong>金手指氧化/松动</strong>。</td>
</tr>
</tbody>
</table>
<p><strong>解决</strong>：先尝试下线机器重启；若无法恢复，必须开箱重新插拔显卡，重打螺丝扭矩，或者更换整卡/主板。 |<br>
| <strong>XID 92</strong> | <code v-pre>HBM Link Training Error</code> | <strong>HBM 显存物理链路训练错误。</strong> GPU 与其物理并排封装的 HBM 显存之间的微米级连接通道发生信号失真。 | <strong>根因</strong>：HBM 颗粒由于长期高温老化、物理微裂纹导致损坏。<strong>无法通过软件修复</strong>。</p>
<p><strong>解决</strong>：直接报修换卡。 |<br>
| <strong>XID 94 / 95</strong> | <code v-pre>NVLink Error</code> | <strong>NVLink 物理链路错误。</strong> 机器内部 8 张卡之间的高速互联通道发生严重信号失真或中断。 | <strong>根因</strong>：对应我们聊到的 <code v-pre>DCGM_FI_DEV_NVLINK_FLIT_CRC_ERR_COUNT</code> 飙升。物理 NVLink 桥接板损坏、接触不良、或主板高频电磁干扰。</p>
<p><strong>解决</strong>：重新拔插并清理 NVLink 桥接板金手指，重打官方扭矩螺丝。 |</p>
<h4 id="_3-驱动与固件卡死类-可以通过重启或复位尝试自愈" tabindex="-1"><a class="header-anchor" href="#_3-驱动与固件卡死类-可以通过重启或复位尝试自愈"><span>3. 驱动与固件卡死类（可以通过重启或复位尝试自愈）</span></a></h4>
<table>
<thead>
<tr>
<th>XID 代码</th>
<th>错误英文全称</th>
<th>物理含义与痛点</th>
<th>根因与 SRE/算法解决手段</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>XID 61</strong></td>
<td><code v-pre>Internal Microcontroller Error</code></td>
<td><strong>GPU 内部微控制器（如 GSP 芯片）内部错误。</strong></td>
<td><strong>根因</strong>：GPU 的内部管理芯片固件（GSP Firmware）发生了死锁或跑偏。</td>
</tr>
</tbody>
</table>
<p><strong>解决</strong>：尝试通过 <code v-pre>nvidia-smi -r</code> 软件复位 GPU，或者温和重启（Warm Reboot）服务器。 |<br>
| <strong>XID 119 / 120</strong> | <code v-pre>GSP RPC Timeout</code> | <strong>GSP 远程过程调用超时。</strong> 在 Hopper（H100/H200）及更新的架构中，英伟达默认启用了 GSP（GPU System Processor）固件。CPU 与 GSP 通信时发生超时卡死。 | <strong>根因</strong>：驱动（Driver）版本与 GSP 固件版本不兼容，或高负载下 GSP 固件死锁。</p>
<p><strong>解决</strong>：强烈建议升级 NVIDIA GPU 驱动到官方最新的长生命周期（LTS）版本。 |</p>
<hr>
<h3 id="⚙️-三、-sre-视角-基于-xid-的智能化自愈工作流-aiops" tabindex="-1"><a class="header-anchor" href="#⚙️-三、-sre-视角-基于-xid-的智能化自愈工作流-aiops"><span>⚙️ 三、 SRE 视角：基于 XID 的智能化自愈工作流 (AIOps)</span></a></h3>
<p>在真实的万卡大模型训练集群中，如果 1 张卡报 XID 故障导致整批 1024 张卡停工，人工去排查会造成巨大的算力资金浪费。现代智算中心通常会部署如下的<strong>自动自愈链路</strong>：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>[GPU 产生 XID 79 掉卡] </span></span>
<span class="line"><span>       │</span></span>
<span class="line"><span>       ▼</span></span>
<span class="line"><span>[dcgm-exporter (指标 152) 捕获到 79] </span></span>
<span class="line"><span>       │</span></span>
<span class="line"><span>       ▼</span></span>
<span class="line"><span>[Prometheus 触发告警] ───> [K8s Operator 拦截并标记节点为 脏节点 (Taint)]</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                      [将当前的 PyTorch 训练 Pod 驱逐 (Evict)]</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                      [在健康节点上拉起新 Pod，自动从最近的 Checkpoint 恢复]</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                                      ▼</span></span>
<span class="line"><span>                      [故障机自动执行硬件自检 (Diag Script)]</span></span>
<span class="line"><span>                                      │</span></span>
<span class="line"><span>                       ┌──────────────┴──────────────┐</span></span>
<span class="line"><span>                       ▼                             ▼</span></span>
<span class="line"><span>                 [自检通过: 清除 XID]          [自检失败: 自动向厂商申报换卡]</span></span>
<span class="line"><span>                       │                             │</span></span>
<span class="line"><span>                       ▼                             ▼</span></span>
<span class="line"><span>                 [重新上线 (Ready)]           [保持隔离 (Offline)]</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过这套逻辑，XID 就不再只是一个冷冰冰的报错数字，而是变成了整个智算中心自动化运维、保卫大模型算力资产的<strong>核心数据源</strong>。</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};