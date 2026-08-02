import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/AI_infra/%E9%9B%86%E7%BE%A4%E5%85%B7%E4%BD%93%E5%AE%9E%E7%8E%B0/%E5%BA%95%E5%B1%82%E5%AE%9E%E7%8E%B0/CRD.html","title":"CRD","lang":"zh-CN","frontmatter":{"title":"CRD","icon":"cpu","date":"2026-07-23T00:00:00.000Z","category":["AI基础设施"],"description":"在大模型智算中心和云原生基础设施的语境下，CRD（Custom Resource Definition，自定义资源定义） 是 Kubernetes（K8s） 生态中最核心的“大招”和灵魂机制。 一句话道破本质：CRD 是 Kubernetes 留给开发者的“乐高扩展接口”。通过它，你可以打破 K8s 原生只认识 Nginx、微服务（Pod、Deploy...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"CRD\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/AI_infra/%E9%9B%86%E7%BE%A4%E5%85%B7%E4%BD%93%E5%AE%9E%E7%8E%B0/%E5%BA%95%E5%B1%82%E5%AE%9E%E7%8E%B0/CRD.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"CRD"}],["meta",{"property":"og:description","content":"在大模型智算中心和云原生基础设施的语境下，CRD（Custom Resource Definition，自定义资源定义） 是 Kubernetes（K8s） 生态中最核心的“大招”和灵魂机制。 一句话道破本质：CRD 是 Kubernetes 留给开发者的“乐高扩展接口”。通过它，你可以打破 K8s 原生只认识 Nginx、微服务（Pod、Deploy..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.45,"words":1034},"filePathRelative":"posts/AI基础设施/学习计划/AI_infra/集群具体实现/底层实现/CRD.md","excerpt":"<p>在大模型智算中心和云原生基础设施的语境下，<strong>CRD（Custom Resource Definition，自定义资源定义）</strong> 是 <strong>Kubernetes（K8s）</strong> 生态中最核心的“大招”和灵魂机制。</p>\\n<p>一句话道破本质：<strong>CRD 是 Kubernetes 留给开发者的“乐高扩展接口”。通过它，你可以打破 K8s 原生只认识 Nginx、微服务（Pod、Deployment、Service）的局限，强行让 K8s 听懂并认识大模型时代的硬核新名词（比如 <code>PyTorchJob</code>、<code>VolcanoJob</code>、<code>TensorflowJob</code>）。</strong></p>","autoDesc":true}`),i={name:`CRD.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在大模型智算中心和云原生基础设施的语境下，<strong>CRD（Custom Resource Definition，自定义资源定义）</strong> 是 <strong>Kubernetes（K8s）</strong> 生态中最核心的“大招”和灵魂机制。</p>
<p>一句话道破本质：<strong>CRD 是 Kubernetes 留给开发者的“乐高扩展接口”。通过它，你可以打破 K8s 原生只认识 Nginx、微服务（Pod、Deployment、Service）的局限，强行让 K8s 听懂并认识大模型时代的硬核新名词（比如 <code v-pre>PyTorchJob</code>、<code v-pre>VolcanoJob</code>、<code v-pre>TensorflowJob</code>）。</strong></p>
<p>把 CRD 放进我们前文聊到的大模型 AI Infra 宇宙里，它的底层原理与核心红利可以这样详细拆解：</p>
<h3 id="一、-为什么大模型智算必须依赖-crd" tabindex="-1"><a class="header-anchor" href="#一、-为什么大模型智算必须依赖-crd"><span>一、 为什么大模型智算必须依赖 CRD？</span></a></h3>
<p>Kubernetes 诞生之初，是用来调度传统 Web 网页、微服务或者数据库的。它天然只认识一些固定好的对象（内置资源），比如：</p>
<ul>
<li>
<p><strong>Pod</strong>：运行一个容器。</p>
</li>
<li>
<p><strong>Deployment</strong>：管理多个 Pod 的副本数量。</p>
</li>
</ul>
<p><strong>大模型的变态痛点</strong>：</p>
<p>大模型的分布式训练任务是一套极其复杂的“团战”。正如我们刚才聊到的，一个大模型任务需要 16 台机器（128张 GPU 卡）组团启动（Gang Scheduling）、声明多轨网络、挂载 Weka 存储，还要指定主节点（Master）和工作节点（Worker）。</p>
<p>这种复杂的“AI 批量作业（Batch Job）”，传统的 K8s 概念完全无法表达。AI 架构师们迫切需要一种手段，能直接向 K8s 声明：“我今天要运行一个对象叫做 <code v-pre>PyTorchJob</code>，它里面包含了 16 个 Worker 容器，请帮我用 Volcano 调度器整体拉起来。”</p>
<p><strong>CRD 就是用来在 K8s 的大脑（API Server）里，注册这个全新“新词汇”的物理定义。</strong></p>
<h3 id="二、-crd-的运行图景-crd-custom-resource-controller" tabindex="-1"><a class="header-anchor" href="#二、-crd-的运行图景-crd-custom-resource-controller"><span>二、 CRD 的运行图景：CRD + Custom Resource + Controller</span></a></h3>
<p>CRD 在生产落地中，通常由三个部分咬合成一个闭环：</p>
<h4 id="_1-crd-自定义资源定义-——-模板注册" tabindex="-1"><a class="header-anchor" href="#_1-crd-自定义资源定义-——-模板注册"><span>1. CRD（自定义资源定义 —— 模板注册）</span></a></h4>
<p>开发人员（例如 Volcano 团队或 Kubeflow 团队）编写一个 YAML 文件，提交给 K8s。这个 YAML 就像一张营业执照，告诉 K8s：<strong>“从今往后，集群里多了一种全新的资源类型，名字叫 <code v-pre>VolcanoJob</code>。”</strong></p>
<h4 id="_2-cr-custom-resource-自定义资源-——-你的任务单" tabindex="-1"><a class="header-anchor" href="#_2-cr-custom-resource-自定义资源-——-你的任务单"><span>2. CR（Custom Resource，自定义资源 —— 你的任务单）</span></a></h4>
<p>你（算法工程师或 Infra 运维）在提交大模型微调任务时，写下一段普通的 YAML 配置。因为 K8s 已经通过 CRD 认识它了，所以 K8s 会高高兴兴地把这个任务单存进底层的数据库（etcd）里：</p>
<p>YAML</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>apiVersion: batch.volcano.sh/v1alpha1</span></span>
<span class="line"><span>kind: VolcanoJob  # ◄── 这就是一个由 CRD 定义出来的全新自定义资源</span></span>
<span class="line"><span>metadata:</span></span>
<span class="line"><span>  name: llama3-8b-finetune</span></span>
<span class="line"><span>spec:</span></span>
<span class="line"><span>  minAvailable: 16 # ◄── 配合 Volcano 实现 Gang Scheduling（少于16台死不开工）</span></span>
<span class="line"><span>  tasks:</span></span>
<span class="line"><span>    - replicas: 16</span></span>
<span class="line"><span>      template:</span></span>
<span class="line"><span>        spec:</span></span>
<span class="line"><span>          containers:</span></span>
<span class="line"><span>            - name: pytorch-container</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-controller-operator-控制器-——-干活的打工人" tabindex="-1"><a class="header-anchor" href="#_3-controller-operator-控制器-——-干活的打工人"><span>3. Controller / Operator（控制器 —— 干活的打工人）</span></a></h4>
<p>只有 CRD 和 CR，K8s 还只是把任务单“记在了账本上”，并没有人去物理搬运服务器。</p>
<p>必须配合一个常驻后台的<strong>控制器（Controller / Operator 进程）</strong>。Volcano 控制器会高频死盯着 K8s 账本，一旦发现有人提交了 <code v-pre>kind: VolcanoJob</code>，它就会立刻跳出来执行它体内的 AI 调度算法，命令 K8s 控制面：<strong>“去！挑选 16 台连在同一个 Spine-Leaf 交换机下、插着 <code v-pre>mlx5_0</code> 智能网卡的物理机，把这 16 个 PyTorch 容器给我组团砸上去！”</strong></p>
<h3 id="三、-总结-大模型-infra-团队得到了什么红利" tabindex="-1"><a class="header-anchor" href="#三、-总结-大模型-infra-团队得到了什么红利"><span>三、 总结：大模型 Infra 团队得到了什么红利？</span></a></h3>
<ol>
<li>
<p><strong>全面声明式 API 托管</strong>：大模型、小模型、数据清洗任务全都可以化为一根根标准干净的 YAML 织物（CRD）。你可以直接用标准的 <code v-pre>kubectl get volcanojob</code> 甚至 GitOps 流水线去统一管理和监控你的万卡训练集群。</p>
</li>
<li>
<p><strong>厂商无缝生态焊接</strong>：不管是阿里云灵骏网络、华为云昇腾、还是自建的 HPC 算力池，厂商们只需要为自己的黑科技网络（如 HPN、Solar-RDMA 的配置）编写一套 K8s CRD 及其配套的 Controller，就能瞬间白嫖整个 Kubernetes 庞大成熟的调度、监控和资源分配生态，不需要去改动 K8s 哪怕一行的核心源码。</p>
</li>
</ol>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};