import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/AI_infra/%E9%9B%86%E7%BE%A4%E5%85%B7%E4%BD%93%E5%AE%9E%E7%8E%B0/%E5%BA%95%E5%B1%82%E5%AE%9E%E7%8E%B0/Volcano.html","title":"Volcano","lang":"zh-CN","frontmatter":{"title":"Volcano","icon":"cpu","date":"2026-07-23T00:00:00.000Z","category":["AI基础设施"],"description":"Volcano 是跑在 Kubernetes 上的 AI / HPC / 大数据批任务调度系统。它不是替代 K8s，而是在 K8s 上增强调度能力，特别适合你现在这种： 一句话理解： K8s 管机器和容器，Volcano 管大规模训练任务怎么排队、怎么抢资源、怎么一起启动。 为什么需要 Volcano 普通 K8s 默认调度器更适合这种任务： 比如一个...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Volcano\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/AI_infra/%E9%9B%86%E7%BE%A4%E5%85%B7%E4%BD%93%E5%AE%9E%E7%8E%B0/%E5%BA%95%E5%B1%82%E5%AE%9E%E7%8E%B0/Volcano.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"Volcano"}],["meta",{"property":"og:description","content":"Volcano 是跑在 Kubernetes 上的 AI / HPC / 大数据批任务调度系统。它不是替代 K8s，而是在 K8s 上增强调度能力，特别适合你现在这种： 一句话理解： K8s 管机器和容器，Volcano 管大规模训练任务怎么排队、怎么抢资源、怎么一起启动。 为什么需要 Volcano 普通 K8s 默认调度器更适合这种任务： 比如一个..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":4.34,"words":1302},"filePathRelative":"posts/AI基础设施/学习计划/AI_infra/集群具体实现/底层实现/Volcano.md","excerpt":"<p>Volcano 是跑在 Kubernetes 上的 <strong>AI / HPC / 大数据批任务调度系统</strong>。它不是替代 K8s，而是在 K8s 上增强调度能力，特别适合你现在这种：</p>\\n<div class=\\"language- line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code class=\\"language-\\"><span class=\\"line\\"><span>K8s + Volcano + GPU 集群 + 用户 SDK 提交训练任务</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`),i={name:`Volcano.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>Volcano 是跑在 Kubernetes 上的 <strong>AI / HPC / 大数据批任务调度系统</strong>。它不是替代 K8s，而是在 K8s 上增强调度能力，特别适合你现在这种：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>K8s + Volcano + GPU 集群 + 用户 SDK 提交训练任务</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>一句话理解：</p>
<p><strong>K8s 管机器和容器，Volcano 管大规模训练任务怎么排队、怎么抢资源、怎么一起启动。</strong></p>
<hr>
<p><strong>为什么需要 Volcano</strong></p>
<p>普通 K8s 默认调度器更适合这种任务：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>Web 服务</span></span>
<span class="line"><span>API 服务</span></span>
<span class="line"><span>Deployment</span></span>
<span class="line"><span>普通 Pod</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>比如一个服务要 3 个副本，K8s 可以先启动 1 个，再启动 2 个，问题不大。</p>
<p>但是 AI 训练不一样。</p>
<p>假设用户提交一个分布式训练任务：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>需要 4 台机器</span></span>
<span class="line"><span>每台 8 张 GPU</span></span>
<span class="line"><span>总共 32 张 GPU</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个任务通常要求：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>4 个 worker 要一起启动</span></span>
<span class="line"><span>否则训练没法开始</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果普通 K8s 只调起来 2 个 worker，另外 2 个一直 Pending，就会出现：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>GPU 被占着</span></span>
<span class="line"><span>任务又跑不起来</span></span>
<span class="line"><span>资源浪费</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Volcano 解决的就是这个问题。</p>
<hr>
<p><strong>Volcano 最核心的能力</strong></p>
<p>第一是 <strong>Gang Scheduling，成组调度</strong>。</p>
<p>意思是：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>资源够，就整组一起启动</span></span>
<span class="line"><span>资源不够，就一个都先不启动</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>比如：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>Job 需要 4 个 Pod</span></span>
<span class="line"><span>minAvailable = 4</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>那么 Volcano 会等到能同时满足 4 个 Pod 的资源后再调度。</p>
<p>这对分布式训练非常重要。</p>
<hr>
<p>第二是 <strong>Queue，队列管理</strong>。</p>
<p>你可以给不同团队建队列：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>team-a queue</span></span>
<span class="line"><span>team-b queue</span></span>
<span class="line"><span>research queue</span></span>
<span class="line"><span>inference queue</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每个队列可以有自己的资源策略：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>team-a 最多 80 张 GPU</span></span>
<span class="line"><span>team-b 最多 40 张 GPU</span></span>
<span class="line"><span>高优先级任务可以抢占低优先级任务</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以 Volcano 不只是“找机器”，它还会考虑：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>谁先来</span></span>
<span class="line"><span>谁优先级高</span></span>
<span class="line"><span>哪个团队还有配额</span></span>
<span class="line"><span>资源怎么公平分</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<p>第三是 <strong>Priority / Preemption，优先级和抢占</strong>。</p>
<p>比如：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>普通实验任务：低优先级</span></span>
<span class="line"><span>紧急线上训练：高优先级</span></span>
<span class="line"><span>老板演示任务：更高优先级</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当资源不够时，高优先级任务可以抢占低优先级任务。</p>
<hr>
<p>第四是 <strong>Binpack / Backfill，提高资源利用率</strong>。</p>
<p>比如集群里碎片资源很多：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>gpu-01 剩 2 张卡</span></span>
<span class="line"><span>gpu-02 剩 1 张卡</span></span>
<span class="line"><span>gpu-03 剩 4 张卡</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Volcano 可以根据插件策略更聪明地放置任务，减少 GPU 碎片。</p>
<hr>
<p><strong>Volcano 的几个核心组件</strong></p>
<p>官方架构里，Volcano 主要由这几个组件组成：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>volcano-scheduler</span></span>
<span class="line"><span>volcano-controller-manager</span></span>
<span class="line"><span>volcano-admission</span></span>
<span class="line"><span>vcctl</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<p><strong>1. volcano-scheduler</strong></p>
<p>这是最核心的组件。</p>
<p>它负责真正调度任务：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>这个 Job 该不该运行？</span></span>
<span class="line"><span>该放到哪些 GPU 节点上？</span></span>
<span class="line"><span>是否满足 minAvailable？</span></span>
<span class="line"><span>是否符合 Queue 资源限制？</span></span>
<span class="line"><span>是否要抢占别的任务？</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你的训练 Pod 里通常会写：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>schedulerName: volcano</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>这样这些 Pod 就不是交给 K8s 默认调度器，而是交给 Volcano Scheduler。</p>
<hr>
<p><strong>2. volcano-controller-manager</strong></p>
<p>它负责管理 Volcano 的 CRD 生命周期。</p>
<p>比如你创建一个 VolcanoJob：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>VolcanoJob</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>Controller 会继续创建和维护：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>PodGroup</span></span>
<span class="line"><span>Pod</span></span>
<span class="line"><span>Job 状态</span></span>
<span class="line"><span>生命周期状态</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你可以把它理解成：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>VolcanoJob 的执行管家</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><hr>
<p><strong>3. volcano-admission</strong></p>
<p>这是准入校验组件。</p>
<p>它负责在任务进入集群前检查：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>VolcanoJob 写得对不对</span></span>
<span class="line"><span>Queue 是否存在</span></span>
<span class="line"><span>参数是否合法</span></span>
<span class="line"><span>是否需要补默认值</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>比如用户 SDK 传了一个不存在的 queue，admission 可以直接拒绝。</p>
<hr>
<p><strong>4. vcctl</strong></p>
<p>这是 Volcano 的命令行工具。</p>
<p>类似：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>kubectl 是 K8s 的客户端</span></span>
<span class="line"><span>vcctl 是 Volcano 的客户端</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>不过你已经封装 SDK 了，普通用户一般不用直接接触它。</p>
<hr>
<p><strong>Volcano 的几个核心对象</strong></p>
<p>你最需要理解这 4 个：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>VolcanoJob</span></span>
<span class="line"><span>PodGroup</span></span>
<span class="line"><span>Queue</span></span>
<span class="line"><span>Task</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<p><strong>VolcanoJob</strong></p>
<p>这是用户提交的训练任务。</p>
<p>比如：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>llama-sft-001</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>里面定义：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>镜像是什么</span></span>
<span class="line"><span>启动命令是什么</span></span>
<span class="line"><span>需要几张 GPU</span></span>
<span class="line"><span>有几个 worker</span></span>
<span class="line"><span>属于哪个 queue</span></span>
<span class="line"><span>最少几个 Pod 同时启动</span></span>
<span class="line"><span>挂载哪些数据目录</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<p><strong>PodGroup</strong></p>
<p>这是 Volcano 做成组调度的关键。</p>
<p>比如一个任务有：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>1 个 master</span></span>
<span class="line"><span>3 个 worker</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>Volcano 会把它们看成一个 PodGroup。</p>
<p>如果你设置：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>minAvailable = 4</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>意思就是：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>至少 4 个 Pod 都能跑，这个任务才启动</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><hr>
<p><strong>Queue</strong></p>
<p>Queue 是队列，也可以理解成团队资源池。</p>
<p>比如：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>team-a</span></span>
<span class="line"><span>team-b</span></span>
<span class="line"><span>default</span></span>
<span class="line"><span>research</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每个 VolcanoJob 都会进入一个 Queue。</p>
<hr>
<p><strong>Task</strong></p>
<p>Task 是 VolcanoJob 里面的角色。</p>
<p>比如 PyTorch 分布式训练可以拆成：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>master task</span></span>
<span class="line"><span>worker task</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>一个 VolcanoJob 里可以有多个 task，每个 task 可以有多个副本。</p>
<hr>
<p>放到你自己的平台里，完整链路是：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>用户 SDK</span></span>
<span class="line"><span>   |</span></span>
<span class="line"><span>   v</span></span>
<span class="line"><span>平台 Backend</span></span>
<span class="line"><span>   |</span></span>
<span class="line"><span>   v</span></span>
<span class="line"><span>创建 VolcanoJob</span></span>
<span class="line"><span>   |</span></span>
<span class="line"><span>   v</span></span>
<span class="line"><span>volcano-admission 校验</span></span>
<span class="line"><span>   |</span></span>
<span class="line"><span>   v</span></span>
<span class="line"><span>volcano-controller-manager 创建 PodGroup / Pod</span></span>
<span class="line"><span>   |</span></span>
<span class="line"><span>   v</span></span>
<span class="line"><span>volcano-scheduler 按 Queue / Gang / GPU 资源调度</span></span>
<span class="line"><span>   |</span></span>
<span class="line"><span>   v</span></span>
<span class="line"><span>GPU 节点 kubelet 启动容器</span></span>
<span class="line"><span>   |</span></span>
<span class="line"><span>   v</span></span>
<span class="line"><span>训练任务运行</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果用户还声明了端口暴露：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>expose jupyter:8888</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>你的平台还会创建：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>Service</span></span>
<span class="line"><span>Ingress</span></span>
<span class="line"><span>访问 URL</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<p>你可以这样记：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>K8s = 集群底座</span></span>
<span class="line"><span>Volcano = AI 任务调度器</span></span>
<span class="line"><span>VolcanoJob = 用户提交的训练任务</span></span>
<span class="line"><span>PodGroup = 一组必须一起调度的 Pod</span></span>
<span class="line"><span>Queue = 团队资源池</span></span>
<span class="line"><span>Ingress + Service = 用户访问任务端口</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参考：Volcano 官方 <a href="https://volcano.sh/docs/home/introduction/" target="_blank" rel="noopener noreferrer">Introduction</a>、<a href="https://volcano.sh/docs/home/architecture/" target="_blank" rel="noopener noreferrer">Architecture</a>、<a href="https://volcano.sh/docs/concepts/volcanojob/" target="_blank" rel="noopener noreferrer">VolcanoJob</a>、<a href="https://volcano.sh/docs/concepts/podgroup/" target="_blank" rel="noopener noreferrer">PodGroup</a>。</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};