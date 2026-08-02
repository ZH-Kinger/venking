import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/AI_infra/%E9%9B%86%E7%BE%A4%E5%85%B7%E4%BD%93%E5%AE%9E%E7%8E%B0/%E9%9B%86%E7%BE%A4%E6%90%AD%E5%BB%BA%E6%B5%81%E7%A8%8B.html","title":"集群搭建流程","lang":"zh-CN","frontmatter":{"title":"集群搭建流程","icon":"cpu","date":"2026-07-23T00:00:00.000Z","category":["AI基础设施"],"description":"对，这个问题问到核心了：K8s 接管 GPU 机器，本质上不是“把 GPU 收进来”，而是先把服务器收进集群，再通过 GPU 插件把每台机器上的 GPU 资源上报给 K8s。 整体流程是： 第一步：先有一个 K8s 控制面 K8s 集群通常有两类节点： 控制面负责： 工作节点负责： 你可以理解成： 第二步：每台 GPU 机器加入集群 比如用 kubea...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"集群搭建流程\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/AI_infra/%E9%9B%86%E7%BE%A4%E5%85%B7%E4%BD%93%E5%AE%9E%E7%8E%B0/%E9%9B%86%E7%BE%A4%E6%90%AD%E5%BB%BA%E6%B5%81%E7%A8%8B.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"集群搭建流程"}],["meta",{"property":"og:description","content":"对，这个问题问到核心了：K8s 接管 GPU 机器，本质上不是“把 GPU 收进来”，而是先把服务器收进集群，再通过 GPU 插件把每台机器上的 GPU 资源上报给 K8s。 整体流程是： 第一步：先有一个 K8s 控制面 K8s 集群通常有两类节点： 控制面负责： 工作节点负责： 你可以理解成： 第二步：每台 GPU 机器加入集群 比如用 kubea..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":4.29,"words":1288},"filePathRelative":"posts/AI基础设施/学习计划/AI_infra/集群具体实现/集群搭建流程.md","excerpt":"<p>对，这个问题问到核心了：<strong>K8s 接管 GPU 机器，本质上不是“把 GPU 收进来”，而是先把服务器收进集群，再通过 GPU 插件把每台机器上的 GPU 资源上报给 K8s。</strong></p>\\n<p>整体流程是：</p>\\n<div class=\\"language- line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code class=\\"language-\\"><span class=\\"line\\"><span>GPU 服务器</span></span>\\n<span class=\\"line\\"><span>  ↓</span></span>\\n<span class=\\"line\\"><span>安装 OS / 驱动 / 容器运行时</span></span>\\n<span class=\\"line\\"><span>  ↓</span></span>\\n<span class=\\"line\\"><span>加入 Kubernetes 集群，成为 Node</span></span>\\n<span class=\\"line\\"><span>  ↓</span></span>\\n<span class=\\"line\\"><span>安装 NVIDIA Device Plugin</span></span>\\n<span class=\\"line\\"><span>  ↓</span></span>\\n<span class=\\"line\\"><span>Device Plugin 发现本机 GPU</span></span>\\n<span class=\\"line\\"><span>  ↓</span></span>\\n<span class=\\"line\\"><span>把 GPU 数量上报给 kubelet</span></span>\\n<span class=\\"line\\"><span>  ↓</span></span>\\n<span class=\\"line\\"><span>kubelet 上报给 API Server</span></span>\\n<span class=\\"line\\"><span>  ↓</span></span>\\n<span class=\\"line\\"><span>K8s Scheduler 可以调度 GPU Pod</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`),i={name:`集群搭建流程.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>对，这个问题问到核心了：<strong>K8s 接管 GPU 机器，本质上不是“把 GPU 收进来”，而是先把服务器收进集群，再通过 GPU 插件把每台机器上的 GPU 资源上报给 K8s。</strong></p>
<p>整体流程是：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>GPU 服务器</span></span>
<span class="line"><span>  ↓</span></span>
<span class="line"><span>安装 OS / 驱动 / 容器运行时</span></span>
<span class="line"><span>  ↓</span></span>
<span class="line"><span>加入 Kubernetes 集群，成为 Node</span></span>
<span class="line"><span>  ↓</span></span>
<span class="line"><span>安装 NVIDIA Device Plugin</span></span>
<span class="line"><span>  ↓</span></span>
<span class="line"><span>Device Plugin 发现本机 GPU</span></span>
<span class="line"><span>  ↓</span></span>
<span class="line"><span>把 GPU 数量上报给 kubelet</span></span>
<span class="line"><span>  ↓</span></span>
<span class="line"><span>kubelet 上报给 API Server</span></span>
<span class="line"><span>  ↓</span></span>
<span class="line"><span>K8s Scheduler 可以调度 GPU Pod</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>第一步：先有一个 K8s 控制面</strong></p>
<p>K8s 集群通常有两类节点：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>Control Plane：控制面</span></span>
<span class="line"><span>Worker Node：工作节点</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>控制面负责：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>API Server：所有操作入口</span></span>
<span class="line"><span>Scheduler：决定 Pod 放在哪台机器</span></span>
<span class="line"><span>Controller Manager：维护集群状态</span></span>
<span class="line"><span>etcd：保存集群数据</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>工作节点负责：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>kubelet：节点代理，向控制面汇报状态</span></span>
<span class="line"><span>containerd / Docker：运行容器</span></span>
<span class="line"><span>kube-proxy / CNI：网络</span></span>
<span class="line"><span>NVIDIA 驱动和 GPU 插件：暴露 GPU</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你可以理解成：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>Control Plane 是总部</span></span>
<span class="line"><span>Worker Node 是工厂车间</span></span>
<span class="line"><span>kubelet 是每个车间派驻的联络员</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>第二步：每台 GPU 机器加入集群</strong></p>
<p>比如用 <code v-pre>kubeadm</code> 搭 K8s，控制面初始化后会生成一个 join 命令：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>kubeadm join 10.0.0.10:6443 \\</span></span>
<span class="line"><span>  --token xxxxxx.xxxxxxxxxxxxxxxx \\</span></span>
<span class="line"><span>  --discovery-token-ca-cert-hash sha256:xxxxxxxx</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你在每台 GPU 服务器上执行这个命令，它就会加入集群。</p>
<p>加入过程大概是：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>1. GPU 服务器连接 API Server</span></span>
<span class="line"><span>2. 提交自己的身份和证书请求</span></span>
<span class="line"><span>3. 控制面批准后，机器成为 Node</span></span>
<span class="line"><span>4. kubelet 开始持续上报节点状态</span></span>
<span class="line"><span>5. API Server 记录这个节点</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后你在控制面执行：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>kubectl get nodes</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>就能看到所有机器：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>NAME          STATUS   ROLES    AGE</span></span>
<span class="line"><span>gpu-node-01   Ready    worker   10m</span></span>
<span class="line"><span>gpu-node-02   Ready    worker   10m</span></span>
<span class="line"><span>gpu-node-03   Ready    worker   10m</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这一步叫：<strong>K8s 收录机器为 Node。</strong></p>
<p>注意：这时 K8s 只知道“有这些机器”，还不一定知道“机器上有几张 GPU”。</p>
<p><strong>第三步：每台 GPU 机器安装 NVIDIA 驱动</strong></p>
<p>K8s 自己不负责驱动。</p>
<p>你必须先让宿主机能识别 GPU：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>nvidia-smi</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>如果宿主机都看不到 GPU，K8s 也不可能调度 GPU。</p>
<p>所以节点上要有：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>NVIDIA Driver</span></span>
<span class="line"><span>CUDA runtime 可选</span></span>
<span class="line"><span>containerd / Docker</span></span>
<span class="line"><span>NVIDIA Container Toolkit</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>第四步：安装 NVIDIA Device Plugin</strong></p>
<p>K8s 默认只认识这些资源：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>cpu</span></span>
<span class="line"><span>memory</span></span>
<span class="line"><span>ephemeral-storage</span></span>
<span class="line"><span>pods</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它默认不认识：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>nvidia.com/gpu</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>所以要安装 <strong>NVIDIA Device Plugin</strong>。</p>
<p>它一般以 DaemonSet 形式部署：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>kubectl apply -f https://raw.githubusercontent.com/NVIDIA/k8s-device-plugin/v0.16.2/deployments/static/nvidia-device-plugin.yml</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>DaemonSet 的意思是：</p>
<blockquote>
<p>每个 GPU 节点上都跑一个插件 Pod。</p>
</blockquote>
<p>Device Plugin 做的事情是：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>扫描本机 GPU</span></span>
<span class="line"><span>和本机 kubelet 通信</span></span>
<span class="line"><span>把 GPU 注册为扩展资源</span></span>
<span class="line"><span>告诉 kubelet 本机有几张 GPU</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>比如一台机器有 8 张 GPU，插件会让 kubelet 上报：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>nvidia.com/gpu: 8</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>然后你看节点信息：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>kubectl describe node gpu-node-01</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>会看到类似：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>Capacity:</span></span>
<span class="line"><span>  cpu:                128</span></span>
<span class="line"><span>  memory:             1024Gi</span></span>
<span class="line"><span>  nvidia.com/gpu:     8</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Allocatable:</span></span>
<span class="line"><span>  cpu:                128</span></span>
<span class="line"><span>  memory:             1024Gi</span></span>
<span class="line"><span>  nvidia.com/gpu:     8</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>到这里，K8s 才真正知道：</p>
<blockquote>
<p>这台机器有 8 张 GPU 可以调度。</p>
</blockquote>
<p><strong>第五步：GPU 资源怎么被 Pod 使用</strong></p>
<p>用户提交 Pod 时声明：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>resources:</span></span>
<span class="line"><span>  limits:</span></span>
<span class="line"><span>    nvidia.com/gpu: 1</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>意思是：这个容器需要 1 张 GPU。</p>
<p>完整例子：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>apiVersion: v1</span></span>
<span class="line"><span>kind: Pod</span></span>
<span class="line"><span>metadata:</span></span>
<span class="line"><span>  name: gpu-test</span></span>
<span class="line"><span>spec:</span></span>
<span class="line"><span>  containers:</span></span>
<span class="line"><span>    - name: cuda</span></span>
<span class="line"><span>      image: nvidia/cuda:12.4.1-base-ubuntu22.04</span></span>
<span class="line"><span>      command: ["nvidia-smi"]</span></span>
<span class="line"><span>      resources:</span></span>
<span class="line"><span>        limits:</span></span>
<span class="line"><span>          nvidia.com/gpu: 1</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>K8s Scheduler 看到这个 Pod 后，会找一台还有 GPU 余量的节点。</p>
<p>比如：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>gpu-node-01 有 8 张，已分配 8 张，不可用</span></span>
<span class="line"><span>gpu-node-02 有 8 张，已分配 4 张，还剩 4 张，可以用</span></span>
<span class="line"><span>gpu-node-03 有 8 张，已分配 0 张，可以用</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Scheduler 选择一个节点后，kubelet 会在该节点启动容器。</p>
<p>然后 NVIDIA Container Runtime 会把对应 GPU 设备挂进容器里。</p>
<p>容器内就能看到 GPU：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>nvidia-smi</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><strong>K8s 是怎么“收录全部机器”的</strong></p>
<p>更准确地说，K8s 收录机器靠的是每台机器上的 <strong>kubelet</strong>。</p>
<p>流程是：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>控制面 API Server 在那里等</span></span>
<span class="line"><span>每台机器安装 kubelet</span></span>
<span class="line"><span>每台机器执行 join</span></span>
<span class="line"><span>kubelet 带着证书和身份去注册</span></span>
<span class="line"><span>API Server 接收注册信息</span></span>
<span class="line"><span>Node 对象被创建</span></span>
<span class="line"><span>kubelet 持续上报心跳和资源</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>K8s 里的 Node 对象大概保存：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>节点名</span></span>
<span class="line"><span>IP</span></span>
<span class="line"><span>操作系统</span></span>
<span class="line"><span>CPU 数量</span></span>
<span class="line"><span>内存容量</span></span>
<span class="line"><span>容器运行时</span></span>
<span class="line"><span>节点标签</span></span>
<span class="line"><span>污点</span></span>
<span class="line"><span>可分配资源</span></span>
<span class="line"><span>健康状态</span></span>
<span class="line"><span>GPU 扩展资源</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以你看到的：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>kubectl get nodes</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>本质上是 API Server 从 etcd 里读出所有已注册的 Node 对象。</p>
<p><strong>GPU 信息是怎么进 K8s 的</strong></p>
<p>普通资源是 kubelet 自己上报：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>CPU</span></span>
<span class="line"><span>内存</span></span>
<span class="line"><span>磁盘</span></span>
<span class="line"><span>Pod 数量</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>GPU 是 Device Plugin 上报给 kubelet：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>NVIDIA Device Plugin</span></span>
<span class="line"><span>  ↓</span></span>
<span class="line"><span>kubelet Device Plugin Manager</span></span>
<span class="line"><span>  ↓</span></span>
<span class="line"><span>Node.Status.Capacity / Allocatable</span></span>
<span class="line"><span>  ↓</span></span>
<span class="line"><span>API Server</span></span>
<span class="line"><span>  ↓</span></span>
<span class="line"><span>Scheduler</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这就是为什么没有 NVIDIA Device Plugin 时，你可能看到：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>节点 Ready</span></span>
<span class="line"><span>nvidia-smi 正常</span></span>
<span class="line"><span>但 kubectl describe node 看不到 nvidia.com/gpu</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为 GPU 没注册成 K8s 可调度资源。</p>
<p><strong>一句话总结</strong></p>
<p>K8s 接管 GPU 机器分两步：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>第一步：kubelet 把服务器注册成 Node</span></span>
<span class="line"><span>第二步：NVIDIA Device Plugin 把 GPU 注册成 nvidia.com/gpu 资源</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>所以完整链路是：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>物理 GPU 服务器</span></span>
<span class="line"><span>  ↓ kubeadm join / 节点注册</span></span>
<span class="line"><span>K8s Node</span></span>
<span class="line"><span>  ↓ NVIDIA Device Plugin</span></span>
<span class="line"><span>nvidia.com/gpu 扩展资源</span></span>
<span class="line"><span>  ↓ Scheduler</span></span>
<span class="line"><span>GPU Pod 调度</span></span>
<span class="line"><span>  ↓ NVIDIA Container Runtime</span></span>
<span class="line"><span>容器使用 GPU</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你把这个链路记住，K8s 管 GPU 集群这件事就通了。</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};