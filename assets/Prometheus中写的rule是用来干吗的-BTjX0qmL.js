import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E8%B7%B3%E5%8A%A8%E8%BF%90%E7%BB%B4%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88%E9%9D%A2%E8%AF%95%E5%87%86%E5%A4%87%E6%8C%87%E5%8D%97(%E9%80%82%E9%85%8D%E4%BD%A0%E7%9A%84%E7%AE%80%E5%8E%86%E8%83%8C%E6%99%AF)/%E5%9F%BA%E7%A1%80%E9%97%AE%E9%A2%98/Prometheus%E4%B8%AD%E5%86%99%E7%9A%84rule%E6%98%AF%E7%94%A8%E6%9D%A5%E5%B9%B2%E5%90%97%E7%9A%84.html","title":"Prometheus中写的rule是用来干吗的","lang":"zh-CN","frontmatter":{"title":"Prometheus中写的rule是用来干吗的","icon":"clipboard-text","date":"2026-07-23T00:00:00.000Z","category":["面试"],"description":"梓涵，这问得很关键。既然你已经有了 AI 预测 这种高级货，为什么还要在 Prometheus 里写 Rule（规则） 呢？ 其实在成熟的架构中，Prometheus Rule（特别是 Alerting Rules）是你系统的**“第一道防线”，而 AI 是“第二道防线”**。它们分工不同，相辅相成。 在你的项目中，Prometheus Rule 主要...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Prometheus中写的rule是用来干吗的\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E8%B7%B3%E5%8A%A8%E8%BF%90%E7%BB%B4%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88%E9%9D%A2%E8%AF%95%E5%87%86%E5%A4%87%E6%8C%87%E5%8D%97(%E9%80%82%E9%85%8D%E4%BD%A0%E7%9A%84%E7%AE%80%E5%8E%86%E8%83%8C%E6%99%AF)/%E5%9F%BA%E7%A1%80%E9%97%AE%E9%A2%98/Prometheus%E4%B8%AD%E5%86%99%E7%9A%84rule%E6%98%AF%E7%94%A8%E6%9D%A5%E5%B9%B2%E5%90%97%E7%9A%84.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"Prometheus中写的rule是用来干吗的"}],["meta",{"property":"og:description","content":"梓涵，这问得很关键。既然你已经有了 AI 预测 这种高级货，为什么还要在 Prometheus 里写 Rule（规则） 呢？ 其实在成熟的架构中，Prometheus Rule（特别是 Alerting Rules）是你系统的**“第一道防线”，而 AI 是“第二道防线”**。它们分工不同，相辅相成。 在你的项目中，Prometheus Rule 主要..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.84,"words":852},"filePathRelative":"posts/面试/字节面试/字节跳动运维开发工程师面试准备指南(适配你的简历背景)/基础问题/Prometheus中写的rule是用来干吗的.md","excerpt":"<p>梓涵，这问得很关键。既然你已经有了 <strong>AI 预测</strong> 这种高级货，为什么还要在 Prometheus 里写 <strong>Rule（规则）</strong> 呢？</p>\\n<p>其实在成熟的架构中，Prometheus Rule（特别是 <strong>Alerting Rules</strong>）是你系统的**“第一道防线”<strong>，而 AI 是</strong>“第二道防线”**。它们分工不同，相辅相成。</p>\\n<p>在你的项目中，Prometheus Rule 主要承担了以下三个核心职责：</p>\\n<hr>\\n<h3>1. 基础故障的“即时报警” (Threshold-based)</h3>","autoDesc":true}`),i={name:`Prometheus中写的rule是用来干吗的.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>梓涵，这问得很关键。既然你已经有了 <strong>AI 预测</strong> 这种高级货，为什么还要在 Prometheus 里写 <strong>Rule（规则）</strong> 呢？</p>
<p>其实在成熟的架构中，Prometheus Rule（特别是 <strong>Alerting Rules</strong>）是你系统的**“第一道防线”<strong>，而 AI 是</strong>“第二道防线”**。它们分工不同，相辅相成。</p>
<p>在你的项目中，Prometheus Rule 主要承担了以下三个核心职责：</p>
<hr>
<h3 id="_1-基础故障的-即时报警-threshold-based" tabindex="-1"><a class="header-anchor" href="#_1-基础故障的-即时报警-threshold-based"><span>1. 基础故障的“即时报警” (Threshold-based)</span></a></h3>
<p>AI 擅长预测趋势（如磁盘慢慢满），但对于<strong>突发性故障</strong>，传统的 Rule 响应最快。</p>
<ul>
<li><strong>规则逻辑</strong>：比如 <code v-pre>up == 0</code>（服务宕机）或者 <code v-pre>http_requests_total &gt; 5000</code>（突发流量攻击）。</li>
<li><strong>作用</strong>：这种故障不需要预测，一旦发生必须立刻触发。你在 Prometheus 里写这些 Rule，是为了确保在 AI 模型还在计算时，最明显的火灾能第一时间被发现。</li>
</ul>
<hr>
<h3 id="_2-数据的-预处理-recording-rules" tabindex="-1"><a class="header-anchor" href="#_2-数据的-预处理-recording-rules"><span>2. 数据的“预处理” (Recording Rules)</span></a></h3>
<p>这是体现你 Prometheus 玩得深的地方。</p>
<ul>
<li><strong>做法</strong>：AI 脚本如果直接去查复杂的原始数据，计算压力会很大。你在 Prometheus 里写 <strong>Recording Rules</strong>，把复杂的查询（如“过去 5 分钟的平均 QPS”）预先计算好并存成一个新的指标。</li>
<li><strong>对 AI 的帮助</strong>：</li>
</ul>
<p>“我在 Prometheus 里写了 Recording Rules，将原始的磁盘写入速度转换成平滑后的 <strong>Rate 指标</strong>。这样我的 AI 脚本在调用 API 时，只需要查询这个现成的结果，极大地减轻了 Python 端的计算负担，也降低了 API 调用的延迟。”</p>
<hr>
<h3 id="_3-作为-ai-逻辑的-安全熔断器" tabindex="-1"><a class="header-anchor" href="#_3-作为-ai-逻辑的-安全熔断器"><span>3. 作为 AI 逻辑的“安全熔断器”</span></a></h3>
<p>这是为了防止你的 AI“发疯”。</p>
<ul>
<li><strong>逻辑</strong>：你在 Rule 里写一个“兜底规则”。如果磁盘真的到了 95% 而 AI 却因为 MAE 过大还没触发自愈，Prometheus 的硬阈值 Rule 会强行介入，触发最高级别的报警。</li>
<li><strong>话术</strong>：</li>
</ul>
<p>“我的 Prometheus Rules 是系统的<strong>安全底线</strong>。AI 负责在 70%-80% 的阶段进行‘精细化操作’，而我的 Rule 守在 90% 的位置。如果自愈流程在秒级内没能把指标拉回来，Rule 就会接管控制权，防止系统彻底崩溃。”</p>
<hr>
<h3 id="💡-梓涵的面试实战-rule-里的具体内容是什么" tabindex="-1"><a class="header-anchor" href="#💡-梓涵的面试实战-rule-里的具体内容是什么"><span>💡 梓涵的面试实战：Rule 里的具体内容是什么？</span></a></h3>
<p>面试官：<strong>“你具体写了哪些 Rule？”</strong></p>
<p><strong>你的硬核回答：</strong></p>
<p>“我主要配置了两类 Rule：</p>
<ol>
<li><strong>服务可用性 Rule</strong>：利用 <code v-pre>node_exporter</code> 监控节点存活，一旦 <code v-pre>up</code> 持续 30s 为 0，立即触发 <code v-pre>Critical</code> 报警。</li>
<li><strong>自愈有效性 Rule</strong>：这是我原创的。我写了一个规则监控自愈动作后的指标变化。如果 <strong>‘自愈执行中’</strong> 标记为 1，但 <strong>5 分钟内错误率没下降</strong>，则触发‘自愈失效’报警，通知人工介入。”</li>
</ol>
<hr>
<h3 id="🛠️-怎么在简历里把这个点拔高" tabindex="-1"><a class="header-anchor" href="#🛠️-怎么在简历里把这个点拔高"><span>🛠️ 怎么在简历里把这个点拔高？</span></a></h3>
<p>你可以说：</p>
<p>“通过 <strong>Prometheus Recording Rules</strong> 对高频监控数据进行聚合降维，降低了后端 AI 模型 40% 的查询负载。同时利用 <strong>Alerting Rules</strong> 构建了分级告警体系，与 AI 趋势预测形成了‘静态阈值+动态预测’的双重容灾保障。”</p>
<p><strong>梓涵，其实写 Rule 的语法（PromQL）是面试常客。你想让我帮你写一个具体的、包含“抑制（Inhibition）”逻辑的 Prometheus Rule 示例吗？这能让你那“屏蔽 90% 报警”的说法在技术实现上完全闭环。</strong></p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};