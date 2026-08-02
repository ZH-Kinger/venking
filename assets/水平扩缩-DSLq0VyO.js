import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E4%BA%91%E5%8E%9F%E7%94%9F/docker/K8s/CI_CD/%E6%B0%B4%E5%B9%B3%E6%89%A9%E7%BC%A9/%E6%B0%B4%E5%B9%B3%E6%89%A9%E7%BC%A9.html","title":"水平扩缩","lang":"zh-CN","frontmatter":{"title":"水平扩缩","icon":"cloud","date":"2026-07-23T00:00:00.000Z","category":["云原生"],"description":"在 Kubernetes (K8s) 的世界里，水平扩缩 (Horizontal Scaling) 俗称“变出更多的分身”。 它是相对于“垂直扩缩”（把一台服务器变强）而言的。简单来说： 垂直扩缩 (Vertical Scaling)：给现有的一个 Pod 增加 CPU 和内存（换个更大的发动机）。 水平扩缩 (Horizontal Scaling)：...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"水平扩缩\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E4%BA%91%E5%8E%9F%E7%94%9F/docker/K8s/CI_CD/%E6%B0%B4%E5%B9%B3%E6%89%A9%E7%BC%A9/%E6%B0%B4%E5%B9%B3%E6%89%A9%E7%BC%A9.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"水平扩缩"}],["meta",{"property":"og:description","content":"在 Kubernetes (K8s) 的世界里，水平扩缩 (Horizontal Scaling) 俗称“变出更多的分身”。 它是相对于“垂直扩缩”（把一台服务器变强）而言的。简单来说： 垂直扩缩 (Vertical Scaling)：给现有的一个 Pod 增加 CPU 和内存（换个更大的发动机）。 水平扩缩 (Horizontal Scaling)：..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.43,"words":730},"filePathRelative":"posts/云原生/docker/K8s/CI_CD/水平扩缩/水平扩缩.md","excerpt":"<p>在 Kubernetes (K8s) 的世界里，<strong>水平扩缩 (Horizontal Scaling)</strong> 俗称“变出更多的分身”。</p>\\n<p>它是相对于“垂直扩缩”（把一台服务器变强）而言的。简单来说：</p>\\n<ul>\\n<li><strong>垂直扩缩 (Vertical Scaling)</strong>：给现有的一个 Pod 增加 CPU 和内存（换个更大的发动机）。</li>\\n<li><strong>水平扩缩 (Horizontal Scaling)</strong>：增加 <strong>Pod 的数量</strong>（多派几辆车来运货）。</li>\\n</ul>","autoDesc":true}`),i={name:`水平扩缩.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在 Kubernetes (K8s) 的世界里，<strong>水平扩缩 (Horizontal Scaling)</strong> 俗称“变出更多的分身”。</p>
<p>它是相对于“垂直扩缩”（把一台服务器变强）而言的。简单来说：</p>
<ul>
<li><strong>垂直扩缩 (Vertical Scaling)</strong>：给现有的一个 Pod 增加 CPU 和内存（换个更大的发动机）。</li>
<li><strong>水平扩缩 (Horizontal Scaling)</strong>：增加 <strong>Pod 的数量</strong>（多派几辆车来运货）。</li>
</ul>
<hr>
<h3 id="_1-核心机制-hpa-horizontal-pod-autoscaler" tabindex="-1"><a class="header-anchor" href="#_1-核心机制-hpa-horizontal-pod-autoscaler"><span>1. 核心机制：HPA (Horizontal Pod Autoscaler)</span></a></h3>
<p>HPA 是 K8s 实现水平扩缩的“大脑”。它是一个控制循环，通过以下步骤运行：</p>
<ol>
<li><strong>指标采集</strong>：它每隔一段时间（默认 15s）去问 <strong>Metrics Server</strong>：“现在的 Pod 压力大吗？”</li>
<li><strong>公式计算</strong>：它会对比“当前指标”和“目标指标”。</li>
</ol>
<ul>
<li><strong>公式</strong>：</li>
</ul>
<p>期望副本数 = \\lceil 当前副本数 \\times \\frac{当前指标值}{期望目标值} \\rceil</p>
<ol start="3">
<li><strong>执行操作</strong>：如果计算结果需要 5 个 Pod，而现在只有 2 个，它会修改 Deployment 的 <code v-pre>replicas</code> 字段，K8s 就会自动创建 3 个新 Pod。</li>
</ol>
<hr>
<h3 id="_2-为什么-aiops-离不开水平扩缩" tabindex="-1"><a class="header-anchor" href="#_2-为什么-aiops-离不开水平扩缩"><span>2. 为什么 AIOps 离不开水平扩缩？</span></a></h3>
<p>在你的 <strong>OpenClaw</strong> 项目中，水平扩缩解决了三个痛点：</p>
<ul>
<li><strong>应对突发流量</strong>：当你的 Web 集群突然涌入大量用户，CPU 飙升到 90%，HPA 会迅速横向扩容，防止单点崩溃。</li>
<li><strong>提高可用性</strong>：如果有 10 个 Pod 在跑，死掉 1 个对业务几乎没影响；如果只有 1 个超强 Pod，一旦挂了就是全线宕机。</li>
<li><strong>成本优化</strong>：深夜没人的时候，HPA 会自动缩减到 1 个 Pod，节省资源（省钱）。</li>
</ul>
<hr>
<h3 id="_3-hpa-的-冷却-与-抖动" tabindex="-1"><a class="header-anchor" href="#_3-hpa-的-冷却-与-抖动"><span>3. HPA 的“冷却”与“抖动”</span></a></h3>
<p>水平扩缩最怕**“扩了缩，缩了扩”**（这叫 <strong>Thrashing/抖动</strong>）。</p>
<ul>
<li><strong>扩容</strong>：通常反应很快，为了救命。</li>
<li><strong>缩容</strong>：通常有“观察期”（默认 5 分钟）。即使 CPU 掉下去了，HPA 也会等一会儿，确认流量真的退去了才杀掉 Pod。</li>
</ul>
<hr>
<h3 id="_4-梓涵的面试高分点-自定义指标扩容" tabindex="-1"><a class="header-anchor" href="#_4-梓涵的面试高分点-自定义指标扩容"><span>4. 梓涵的面试高分点：自定义指标扩容</span></a></h3>
<p>面试官通常会问：“如果 CPU 没满，但业务响应变慢了（延迟高），HPA 怎么处理？”</p>
<p><strong>你的回答建议：</strong></p>
<p>“原生 HPA 只能监控 CPU/内存。但在 <strong>OpenClaw</strong> 中，我引入了 <strong>Prometheus Adapter</strong>。</p>
<p>我配置了基于 <strong>‘自定义指标（Custom Metrics）’</strong> 的扩缩容。例如，我监控 <strong>vLLM 推理队列的长度</strong>。当待处理的推理请求超过 10 个时，即使 CPU 还没满，HPA 也会提前触发扩容，确保 AI 响应的实时性。这种**‘预测性扩容’**比原生的指标触发更贴合 AIOps 场景。”</p>
<hr>
<h3 id="​-动手实验-你想看代码吗" tabindex="-1"><a class="header-anchor" href="#​-动手实验-你想看代码吗"><span>​ 动手实验：你想看代码吗？</span></a></h3>
<p>我们可以写一个简单的 <strong>HPA YAML</strong> 定义。假设我们要保护你的 Web 业务：</p>
<ul>
<li><strong>目标</strong>：保持每个 Pod 的平均 CPU 使用率在 <strong>50%</strong>。</li>
<li><strong>范围</strong>：最少 2 个 Pod，最多 10 个 Pod。</li>
</ul>
<p><strong>需要我把这个 YAML 配置文件写出来，并教你怎么在你的 K8s 集群里一键生效吗？</strong></p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};