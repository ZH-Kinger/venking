import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E8%B7%B3%E5%8A%A8%E8%BF%90%E7%BB%B4%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88%E9%9D%A2%E8%AF%95%E5%87%86%E5%A4%87%E6%8C%87%E5%8D%97(%E9%80%82%E9%85%8D%E4%BD%A0%E7%9A%84%E7%AE%80%E5%8E%86%E8%83%8C%E6%99%AF)/Prometheus_%E5%AD%98%E5%82%A8%E5%8E%9F%E7%90%86(TSDB)%E3%80%81%E6%95%85%E9%9A%9C%E6%8E%92%E6%9F%A5%E6%96%B9%E6%B3%95%E8%AE%BA(Load_%E9%AB%98%E3%80%81IO_%E5%BF%99%E3%80%81%E5%86%85%E5%AD%98%E6%B3%84%E6%BC%8F%E5%A6%82%E4%BD%95%E6%8E%92%E6%9F%A5)%E3%80%82.html","title":"Prometheus_存储原理(TSDB)、故障排查方法论(Load_高、IO_忙、内存泄漏如何排查)。","lang":"zh-CN","frontmatter":{"title":"Prometheus_存储原理(TSDB)、故障排查方法论(Load_高、IO_忙、内存泄漏如何排查)。","icon":"clipboard-text","date":"2026-07-23T00:00:00.000Z","category":["面试"],"description":"你好！进入 Day 3：SRE 专项：监控、告警与故障演练，这部分是决定你是否具备“资深感”的关键。字节跳动的 SRE 面试官非常看重你处理不确定性故障的逻辑，以及对监控底层的理解。 以下是针对今日重点及你简历亮点的深度拆解： 一、 Prometheus 存储原理（TSDB）深度解析 字节面试常问：“为什么 Prometheus 能处理每秒百万级的数据...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Prometheus_存储原理(TSDB)、故障排查方法论(Load_高、IO_忙、内存泄漏如何排查)。\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E8%B7%B3%E5%8A%A8%E8%BF%90%E7%BB%B4%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88%E9%9D%A2%E8%AF%95%E5%87%86%E5%A4%87%E6%8C%87%E5%8D%97(%E9%80%82%E9%85%8D%E4%BD%A0%E7%9A%84%E7%AE%80%E5%8E%86%E8%83%8C%E6%99%AF)/Prometheus_%E5%AD%98%E5%82%A8%E5%8E%9F%E7%90%86(TSDB)%E3%80%81%E6%95%85%E9%9A%9C%E6%8E%92%E6%9F%A5%E6%96%B9%E6%B3%95%E8%AE%BA(Load_%E9%AB%98%E3%80%81IO_%E5%BF%99%E3%80%81%E5%86%85%E5%AD%98%E6%B3%84%E6%BC%8F%E5%A6%82%E4%BD%95%E6%8E%92%E6%9F%A5)%E3%80%82.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"Prometheus_存储原理(TSDB)、故障排查方法论(Load_高、IO_忙、内存泄漏如何排查)。"}],["meta",{"property":"og:description","content":"你好！进入 Day 3：SRE 专项：监控、告警与故障演练，这部分是决定你是否具备“资深感”的关键。字节跳动的 SRE 面试官非常看重你处理不确定性故障的逻辑，以及对监控底层的理解。 以下是针对今日重点及你简历亮点的深度拆解： 一、 Prometheus 存储原理（TSDB）深度解析 字节面试常问：“为什么 Prometheus 能处理每秒百万级的数据..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.97,"words":1191},"filePathRelative":"posts/面试/字节面试/字节跳动运维开发工程师面试准备指南(适配你的简历背景)/Prometheus_存储原理(TSDB)、故障排查方法论(Load_高、IO_忙、内存泄漏如何排查)。.md","excerpt":"<p>你好！进入 <strong>Day 3：SRE 专项：监控、告警与故障演练</strong>，这部分是决定你是否具备“资深感”的关键。字节跳动的 SRE 面试官非常看重你处理不确定性故障的逻辑，以及对监控底层的理解。</p>\\n<p>以下是针对今日重点及你简历亮点的深度拆解：</p>\\n<hr>\\n<h3>一、 Prometheus 存储原理（TSDB）深度解析</h3>\\n<p>字节面试常问：<strong>“为什么 Prometheus 能处理每秒百万级的数据指标？”</strong></p>\\n<ol>\\n<li><strong>数据模型</strong>：时间序列（Time Series）由 <code>Metric Name + Labels</code> 确定。</li>\\n<li><strong>存储结构（Block）</strong>：</li>\\n</ol>","autoDesc":true}`),i={name:`Prometheus_存储原理(TSDB)、故障排查方法论(Load_高、IO_忙、内存泄漏如何排查)。.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>你好！进入 <strong>Day 3：SRE 专项：监控、告警与故障演练</strong>，这部分是决定你是否具备“资深感”的关键。字节跳动的 SRE 面试官非常看重你处理不确定性故障的逻辑，以及对监控底层的理解。</p>
<p>以下是针对今日重点及你简历亮点的深度拆解：</p>
<hr>
<h3 id="一、-prometheus-存储原理-tsdb-深度解析" tabindex="-1"><a class="header-anchor" href="#一、-prometheus-存储原理-tsdb-深度解析"><span>一、 Prometheus 存储原理（TSDB）深度解析</span></a></h3>
<p>字节面试常问：<strong>“为什么 Prometheus 能处理每秒百万级的数据指标？”</strong></p>
<ol>
<li><strong>数据模型</strong>：时间序列（Time Series）由 <code v-pre>Metric Name + Labels</code> 确定。</li>
<li><strong>存储结构（Block）</strong>：</li>
</ol>
<ul>
<li><strong>内存（Head Block）</strong>：新产生的数据先存入内存，并写入 <strong>WAL（预写日志）</strong> 保证宕机不丢数据。</li>
<li><strong>磁盘（Persistent Block）</strong>：每 2 小时将内存数据压缩成一个 Block 存入磁盘。</li>
</ul>
<ol start="3">
<li><strong>核心优化技术</strong>：</li>
</ol>
<ul>
<li><strong>倒排索引（Inverted Index）</strong>：通过 Label 快速定位 Series ID。</li>
<li><strong>数据压缩（Gorilla 算法）</strong>：通过 Delta-of-delta（差值再差值）算法，将 16 字节的时间戳压缩到平均 1.37 比特，极大地节省了存储空间。</li>
</ul>
<hr>
<h3 id="二、-故障排查方法论-字节高频必考" tabindex="-1"><a class="header-anchor" href="#二、-故障排查方法论-字节高频必考"><span>二、 故障排查方法论（字节高频必考）</span></a></h3>
<p>当面试官问“服务器 Load 高怎么排查”时，千万不要只说一个 <code v-pre>top</code>。要展现你的<strong>体系化思维</strong>。</p>
<h4 id="_1-cpu-load-高-平均负载高" tabindex="-1"><a class="header-anchor" href="#_1-cpu-load-高-平均负载高"><span>1. CPU Load 高（平均负载高）</span></a></h4>
<ul>
<li>
<p><strong>第一步</strong>：使用 <code v-pre>uptime</code> 看 Load 趋势，使用 <code v-pre>top</code> 或 <code v-pre>htop</code> 看进程。</p>
</li>
<li>
<p><strong>第二步</strong>：区分 Load 类型。</p>
</li>
<li>
<p><strong>CPU 密集型</strong>：<code v-pre>top</code> 看到 <code v-pre>us</code>（用户态）高，说明是计算逻辑问题。</p>
</li>
<li>
<p><strong>IO 密集型</strong>：<code v-pre>top</code> 看到 <code v-pre>wa</code>（等待 IO）高，说明磁盘/网络慢了。</p>
</li>
<li>
<p><strong>中断高</strong>：看 <code v-pre>/proc/interrupts</code>，可能是网卡多队列没调优。</p>
</li>
<li>
<p><strong>第三步</strong>：定位。<code v-pre>perf top</code> 看哪个内核函数调用高，或者 <code v-pre>strace -p [pid]</code> 看系统调用。</p>
</li>
</ul>
<h4 id="_2-io-忙-disk-io-瓶颈" tabindex="-1"><a class="header-anchor" href="#_2-io-忙-disk-io-瓶颈"><span>2. IO 忙（Disk IO 瓶颈）</span></a></h4>
<ul>
<li><strong>工具</strong>：<code v-pre>iostat -x 1</code> 观察 <code v-pre>%util</code> 和 <code v-pre>await</code>。</li>
<li><strong>深度排查</strong>：使用 <code v-pre>iotop</code> 定位具体的进程。使用 <code v-pre>lsof -p [pid]</code> 查看该进程打开了哪些大文件。</li>
<li><strong>场景</strong>：如果磁盘空间满了但 <code v-pre>du -sh</code> 看不到大文件？说明文件被删除但进程未释放句柄，用 <code v-pre>lsof | grep deleted</code> 找回并重启进程。</li>
</ul>
<h4 id="_3-内存泄漏-memory-leak" tabindex="-1"><a class="header-anchor" href="#_3-内存泄漏-memory-leak"><span>3. 内存泄漏（Memory Leak）</span></a></h4>
<ul>
<li>
<p><strong>现象</strong>：监控曲线稳步上升，且 <code v-pre>free</code> 命令显示的 <code v-pre>available</code> 持续下降。</p>
</li>
<li>
<p><strong>排查</strong>：</p>
</li>
<li>
<p>看 <code v-pre>/proc/meminfo</code> 确认是用户态还是内核态（如 Slab）泄漏。</p>
</li>
<li>
<p>使用 <code v-pre>valgrind</code> 或 <code v-pre>gperftools</code>（针对 C/C++）或 <code v-pre>jmap</code>（针对 Java）做 Heap Dump 分析。</p>
</li>
</ul>
<hr>
<h3 id="三、-简历深挖-动态基线与-ai-自愈-挑战题" tabindex="-1"><a class="header-anchor" href="#三、-简历深挖-动态基线与-ai-自愈-挑战题"><span>三、 简历深挖：动态基线与 AI 自愈（挑战题）</span></a></h3>
<p>面试官会针对你的项目进行“压力面试”：</p>
<h4 id="_1-3倍标准差-算法在实际中有什么坑" tabindex="-1"><a class="header-anchor" href="#_1-3倍标准差-算法在实际中有什么坑"><span>1. “3倍标准差”算法在实际中有什么坑？</span></a></h4>
<ul>
<li><strong>你的回答</strong>：3-Sigma 假设数据符合<strong>正态分布</strong>。但在互联网场景下，流量通常是“长尾分布”或有“阶梯性”突发。</li>
<li><strong>改进方案</strong>：我会引入<strong>加权移动平均（EWMA）</strong>，给最近的数据更高的权重，从而让基线更敏感地适应业务架构的正常调整。</li>
</ul>
<h4 id="_2-字节高频-如果-ai-自愈误判了怎么办-必杀技" tabindex="-1"><a class="header-anchor" href="#_2-字节高频-如果-ai-自愈误判了怎么办-必杀技"><span>2. 字节高频：如果 AI 自愈误判了怎么办？（必杀技）</span></a></h4>
<p>这是面试官考察你<strong>风险意识</strong>的核心题。建议从以下四个维度回答：</p>
<ol>
<li><strong>设置“熔断机制”</strong>：</li>
</ol>
<ul>
<li><strong>频率熔断</strong>：同一个节点 10 分钟内只允许执行 1 次自愈操作。</li>
<li><strong>规模熔断</strong>：如果集群内超过 5% 的机器同时触发自愈，立即停止所有自动操作，转人工处理（防止由于全局配置错误导致的连锁重启）。</li>
</ul>
<ol start="2">
<li><strong>操作分级（白名单）</strong>：</li>
</ol>
<ul>
<li><strong>无损操作</strong>（如清理日志、重启非核心组件）：AI 直接执行。</li>
<li><strong>有损操作</strong>（如重启数据库、扩容）：AI 给出建议，必须由运维在飞书机器人点击“Confirm”后才执行（<strong>Human-in-the-loop</strong>）。</li>
</ul>
<ol start="3">
<li><strong>前置校验与后置检查</strong>：</li>
</ol>
<ul>
<li>执行前检查：目标 IP 是否在核心服务列表？</li>
<li>执行后验证：执行完 <code v-pre>systemctl restart</code> 后，必须检查端口是否监听、健康检查接口是否返回 200，若失败立即回滚。</li>
</ul>
<ol start="4">
<li><strong>影子模式（Shadow Mode）</strong>：</li>
</ol>
<ul>
<li>在新功能上线初期，AI 只输出“建议操作”但不实际执行，通过比对人工处理结果来优化模型准确率。</li>
</ul>
<hr>
<h3 id="今日互动测试" tabindex="-1"><a class="header-anchor" href="#今日互动测试"><span>今日互动测试</span></a></h3>
<p><strong>场景模拟：</strong></p>
<p>你收到一个 Prometheus 告警，显示某 K8s 节点的内存使用率达到 95%。你登录机器发现 <code v-pre>top</code> 显示内存确实很高，但你通过 <code v-pre>ps</code> 把所有进程内存加起来却只占了 40%。</p>
<p><strong>请问：剩下的 55% 内存去哪了？你会查看哪个系统文件来确认？</strong></p>
<p>（提示：这个知识点在你的简历“内核调优”部分有涉及）</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};