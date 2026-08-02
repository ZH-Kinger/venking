import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/AI_infra/%E9%9B%86%E7%BE%A4%E5%85%B7%E4%BD%93%E5%AE%9E%E7%8E%B0/%E8%AE%BF%E9%97%AE%E6%B5%81%E9%87%8F%E8%B5%B0%E5%90%91.html","title":"访问流量走向","lang":"zh-CN","frontmatter":{"title":"访问流量走向","icon":"cpu","date":"2026-07-23T00:00:00.000Z","category":["AI基础设施"],"description":"对，你这里的 NodeExpose 本质上不是 Volcano 的调度能力，而是你们平台 SDK 在 VolcanoJob 外面额外做的一层： 一句话： Volcano 负责“任务跑在哪些 GPU 上”，NodeExpose 负责“用户怎么访问任务里的某个端口”。 最常见实现：Service Type NodePort 比如用户提交了一个训练任务，里面...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"访问流量走向\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/AI_infra/%E9%9B%86%E7%BE%A4%E5%85%B7%E4%BD%93%E5%AE%9E%E7%8E%B0/%E8%AE%BF%E9%97%AE%E6%B5%81%E9%87%8F%E8%B5%B0%E5%90%91.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"访问流量走向"}],["meta",{"property":"og:description","content":"对，你这里的 NodeExpose 本质上不是 Volcano 的调度能力，而是你们平台 SDK 在 VolcanoJob 外面额外做的一层： 一句话： Volcano 负责“任务跑在哪些 GPU 上”，NodeExpose 负责“用户怎么访问任务里的某个端口”。 最常见实现：Service Type NodePort 比如用户提交了一个训练任务，里面..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.79,"words":837},"filePathRelative":"posts/AI基础设施/学习计划/AI_infra/集群具体实现/访问流量走向.md","excerpt":"<p>对，你这里的 <strong>NodeExpose</strong> 本质上不是 Volcano 的调度能力，而是你们平台 SDK 在 VolcanoJob 外面额外做的一层：</p>\\n<div class=\\"language- line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code class=\\"language-\\"><span class=\\"line\\"><span>用户 SDK 提交 VolcanoJob</span></span>\\n<span class=\\"line\\"><span>        |</span></span>\\n<span class=\\"line\\"><span>平台后端创建 VolcanoJob</span></span>\\n<span class=\\"line\\"><span>        |</span></span>\\n<span class=\\"line\\"><span>Volcano 调度 Pod 到 GPU 节点</span></span>\\n<span class=\\"line\\"><span>        |</span></span>\\n<span class=\\"line\\"><span>平台后端再创建 Service / Ingress</span></span>\\n<span class=\\"line\\"><span>        |</span></span>\\n<span class=\\"line\\"><span>用户通过某个地址访问这个任务里的端口</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`),i={name:`访问流量走向.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>对，你这里的 <strong>NodeExpose</strong> 本质上不是 Volcano 的调度能力，而是你们平台 SDK 在 VolcanoJob 外面额外做的一层：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>用户 SDK 提交 VolcanoJob</span></span>
<span class="line"><span>        |</span></span>
<span class="line"><span>平台后端创建 VolcanoJob</span></span>
<span class="line"><span>        |</span></span>
<span class="line"><span>Volcano 调度 Pod 到 GPU 节点</span></span>
<span class="line"><span>        |</span></span>
<span class="line"><span>平台后端再创建 Service / Ingress</span></span>
<span class="line"><span>        |</span></span>
<span class="line"><span>用户通过某个地址访问这个任务里的端口</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一句话：</p>
<p><strong>Volcano 负责“任务跑在哪些 GPU 上”，NodeExpose 负责“用户怎么访问任务里的某个端口”。</strong></p>
<hr>
<p><strong>最常见实现：Service Type NodePort</strong></p>
<p>比如用户提交了一个训练任务，里面有一个 <code v-pre>master</code> Pod 暴露 <code v-pre>8888</code>，你想让用户访问 Jupyter / TensorBoard / Web UI。</p>
<p>平台后端会额外创建一个 K8s Service：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>apiVersion: v1</span></span>
<span class="line"><span>kind: Service</span></span>
<span class="line"><span>metadata:</span></span>
<span class="line"><span>  name: train-job-001-jupyter</span></span>
<span class="line"><span>  namespace: team-a</span></span>
<span class="line"><span>spec:</span></span>
<span class="line"><span>  type: NodePort</span></span>
<span class="line"><span>  selector:</span></span>
<span class="line"><span>    volcano.sh/job-name: train-job-001</span></span>
<span class="line"><span>    volcano.sh/task-spec: master</span></span>
<span class="line"><span>  ports:</span></span>
<span class="line"><span>    - name: jupyter</span></span>
<span class="line"><span>      port: 8888</span></span>
<span class="line"><span>      targetPort: 8888</span></span>
<span class="line"><span>      nodePort: 30888</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里的意思是：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>访问 任意节点IP:30888</span></span>
<span class="line"><span>        |</span></span>
<span class="line"><span>K8s Service / kube-proxy</span></span>
<span class="line"><span>        |</span></span>
<span class="line"><span>转发到 train-job-001 的 master Pod:8888</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以用户访问的是：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>http://&#x3C;任意NodeIP>:30888</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>注意，是<strong>任意 Kubernetes 节点 IP</strong>，不一定是这个 Pod 所在的 GPU 节点。K8s 的 <code v-pre>kube-proxy</code> 会在节点上做转发规则，把流量送到真正的 Pod。</p>
<hr>
<p><strong>完整链路是这样</strong></p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>用户电脑</span></span>
<span class="line"><span>   |</span></span>
<span class="line"><span>VPN / 办公网 / HTTPS</span></span>
<span class="line"><span>   |</span></span>
<span class="line"><span>路由器 / 防火墙</span></span>
<span class="line"><span>   |</span></span>
<span class="line"><span>Mgmt + Service 网络</span></span>
<span class="line"><span>   |</span></span>
<span class="line"><span>任意 K8s Node IP:NodePort</span></span>
<span class="line"><span>   |</span></span>
<span class="line"><span>kube-proxy</span></span>
<span class="line"><span>   |</span></span>
<span class="line"><span>Service</span></span>
<span class="line"><span>   |</span></span>
<span class="line"><span>VolcanoJob 里的 master Pod</span></span>
<span class="line"><span>   |</span></span>
<span class="line"><span>容器端口 8888</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也就是：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>用户访问的不是 GPU 服务器本身的容器端口</span></span>
<span class="line"><span>而是访问 K8s 暴露出来的 Service 端口</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<p><strong>SDK 里面怎么封装</strong></p>
<p>你的 SDK 可以设计成这样：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>job = VolcanoJob(</span></span>
<span class="line"><span>    name="llama-sft-001",</span></span>
<span class="line"><span>    image="registry.local/train/llama:latest",</span></span>
<span class="line"><span>    queue="team-a",</span></span>
<span class="line"><span>    gpu=8,</span></span>
<span class="line"><span>    command="python train.py",</span></span>
<span class="line"><span>    expose=[</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            "name": "jupyter",</span></span>
<span class="line"><span>            "task": "master",</span></span>
<span class="line"><span>            "container_port": 8888,</span></span>
<span class="line"><span>            "protocol": "http"</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            "name": "tensorboard",</span></span>
<span class="line"><span>            "task": "master",</span></span>
<span class="line"><span>            "container_port": 6006,</span></span>
<span class="line"><span>            "protocol": "http"</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>client.submit(job)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>SDK 后端实际做两件事：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>1. 创建 VolcanoJob</span></span>
<span class="line"><span>2. 为 expose 里声明的端口创建 Service / Ingress</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>不是让用户自己写 NodePort。</p>
<hr>
<p><strong>更推荐的生产做法</strong></p>
<p>不要直接把 <code v-pre>NodeIP:NodePort</code> 丢给普通用户。生产里更建议这样：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>用户</span></span>
<span class="line"><span> |</span></span>
<span class="line"><span>https://train.company.com/jobs/llama-sft-001/jupyter</span></span>
<span class="line"><span> |</span></span>
<span class="line"><span>Ingress / API Gateway / Nginx</span></span>
<span class="line"><span> |</span></span>
<span class="line"><span>ClusterIP Service</span></span>
<span class="line"><span> |</span></span>
<span class="line"><span>VolcanoJob master Pod:8888</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也就是说：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>外部用户访问域名</span></span>
<span class="line"><span>内部平台再转发到对应 Job 的 Service</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>这样安全很多，也好做权限控制、审计、HTTPS、SSO、过期回收。</p>
<hr>
<p><strong>NodePort 和 Ingress 的区别</strong></p>
<p><code v-pre>NodePort</code> 更像临时调试入口：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>http://10.10.20.31:30888</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>优点是简单，缺点是不优雅、不安全、端口容易乱。</p>
<p><code v-pre>Ingress</code> 更适合平台化：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>https://train.your-domain.com/job/train-job-001/jupyter</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>优点是统一入口、支持 HTTPS、SSO、权限控制、审计。</p>
<p>你的用户使用 SDK 的话，我建议最终做成：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>SDK 提交任务</span></span>
<span class="line"><span>平台返回访问地址</span></span>
<span class="line"><span>用户不用知道 NodePort</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>比如返回：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>{</span></span>
<span class="line"><span>  "job_name": "llama-sft-001",</span></span>
<span class="line"><span>  "status": "running",</span></span>
<span class="line"><span>  "endpoints": {</span></span>
<span class="line"><span>    "jupyter": "https://train.example.com/jobs/llama-sft-001/jupyter",</span></span>
<span class="line"><span>    "tensorboard": "https://train.example.com/jobs/llama-sft-001/tensorboard"</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<p><strong>Volcano 自带的 svc 插件和 NodeExpose 不是一回事</strong></p>
<p>Volcano 的 <code v-pre>svc</code> 插件主要解决的是 <strong>任务内部 Pod 之间互相发现</strong>，比如 master/worker 之间通信。官方文档里也说明它会给 Pod 加上类似这些 label：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>volcano.sh/job-name: xxx</span></span>
<span class="line"><span>volcano.sh/task-spec: master</span></span>
<span class="line"><span>volcano.sh/job-namespace: team-a</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些 label 正好可以被你创建的 K8s Service 用来选择目标 Pod。</p>
<p>但它不是给外部用户访问用的。外部访问还得靠：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>Service NodePort</span></span>
<span class="line"><span>Ingress</span></span>
<span class="line"><span>LoadBalancer / MetalLB</span></span>
<span class="line"><span>平台网关</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参考：Volcano 官方 <a href="https://volcano.sh/docs/concepts/volcanojob/" target="_blank" rel="noopener noreferrer">VolcanoJob</a> 和 <a href="https://volcano.sh/docs/userguide/user_guide_how_to_use_svc_plugin/" target="_blank" rel="noopener noreferrer">SVC Plugin</a> 文档。</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};