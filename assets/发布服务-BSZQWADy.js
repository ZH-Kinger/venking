import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E4%BA%91%E5%8E%9F%E7%94%9F/docker/K8s/%E5%8F%91%E5%B8%83%E6%9C%8D%E5%8A%A1.html","title":"发布服务","lang":"zh-CN","frontmatter":{"title":"发布服务","icon":"cloud","date":"2026-07-23T00:00:00.000Z","category":["云原生"],"description":"一、 服务暴露（以 Nginx 为例） 在 Kubernetes 中，Pod 的 IP 是动态的，必须通过 Service 资源将服务暴露给外部访问。 1. 快速命令行发布 (Imperative) 如果你已经有一个正在运行的 Deployment（例如 nginx-deploy），可以使用 expose 命令快速创建 Service。 --port:...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"发布服务\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E4%BA%91%E5%8E%9F%E7%94%9F/docker/K8s/%E5%8F%91%E5%B8%83%E6%9C%8D%E5%8A%A1.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"发布服务"}],["meta",{"property":"og:description","content":"一、 服务暴露（以 Nginx 为例） 在 Kubernetes 中，Pod 的 IP 是动态的，必须通过 Service 资源将服务暴露给外部访问。 1. 快速命令行发布 (Imperative) 如果你已经有一个正在运行的 Deployment（例如 nginx-deploy），可以使用 expose 命令快速创建 Service。 --port:..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.18,"words":655},"filePathRelative":"posts/云原生/docker/K8s/发布服务.md","excerpt":"<h3>一、 服务暴露（以 Nginx 为例）</h3>\\n<p>在 Kubernetes 中，Pod 的 IP 是动态的，必须通过 <strong>Service</strong> 资源将服务暴露给外部访问。</p>\\n<h4>1. 快速命令行发布 (Imperative)</h4>\\n<p>如果你已经有一个正在运行的 Deployment（例如 <code>nginx-deploy</code>），可以使用 <code>expose</code> 命令快速创建 Service。</p>\\n<div class=\\"language-plain line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"plain\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code class=\\"language-plain\\"><span class=\\"line\\"><span># 对应图片中的操作</span></span>\\n<span class=\\"line\\"><span>kubectl expose deployment nginx-deploy --port=80 --target-port=80 --type=NodePort --name=nginx-service</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`),i={name:`发布服务.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><h3 id="一、-服务暴露-以-nginx-为例" tabindex="-1"><a class="header-anchor" href="#一、-服务暴露-以-nginx-为例"><span>一、 服务暴露（以 Nginx 为例）</span></a></h3>
<p>在 Kubernetes 中，Pod 的 IP 是动态的，必须通过 <strong>Service</strong> 资源将服务暴露给外部访问。</p>
<h4 id="_1-快速命令行发布-imperative" tabindex="-1"><a class="header-anchor" href="#_1-快速命令行发布-imperative"><span>1. 快速命令行发布 (Imperative)</span></a></h4>
<p>如果你已经有一个正在运行的 Deployment（例如 <code v-pre>nginx-deploy</code>），可以使用 <code v-pre>expose</code> 命令快速创建 Service。</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 对应图片中的操作</span></span>
<span class="line"><span>kubectl expose deployment nginx-deploy --port=80 --target-port=80 --type=NodePort --name=nginx-service</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>--port</strong>: Service 暴露的端口。</li>
<li><strong>--target-port</strong>: Pod 容器内部监听的端口。</li>
<li><strong>--type=NodePort</strong>: 关键参数。它会在所有节点上开启一个 30000+ 的随机端口，使外部浏览器可以访问。</li>
</ul>
<h4 id="_2-yaml-文件发布-declarative" tabindex="-1"><a class="header-anchor" href="#_2-yaml-文件发布-declarative"><span>2. YAML 文件发布 (Declarative)</span></a></h4>
<p>通过编写配置文件可以更精准地控制端口（例如固定为 <code v-pre>30080</code>）。</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>apiVersion: v1</span></span>
<span class="line"><span>kind: Service</span></span>
<span class="line"><span>metadata:</span></span>
<span class="line"><span>  annotations:</span></span>
<span class="line"><span>    kubectl.kubernetes.io/last-applied-configuration: |</span></span>
<span class="line"><span>      {"apiVersion":"v1","kind":"Service","metadata":{"annotations":{},"name":"nginx-service","namespace":"default"},"spec":{"ports":[{"nodePort":30080,"port":80,"protocol":"TCP","targetPort":80}],"selector":{"app":"nginx-deploy"},"type":"NodePort"}}</span></span>
<span class="line"><span>  creationTimestamp: "2026-02-05T09:07:58Z"</span></span>
<span class="line"><span>  name: nginx-service</span></span>
<span class="line"><span>  namespace: default</span></span>
<span class="line"><span>  resourceVersion: "38538"</span></span>
<span class="line"><span>  uid: 4ce9be55-91e3-459c-b7d8-daa03798377a</span></span>
<span class="line"><span>spec:</span></span>
<span class="line"><span>  clusterIP: 10.100.182.150</span></span>
<span class="line"><span>  clusterIPs:</span></span>
<span class="line"><span>  - 10.100.182.150</span></span>
<span class="line"><span>  externalTrafficPolicy: Cluster</span></span>
<span class="line"><span>  internalTrafficPolicy: Cluster</span></span>
<span class="line"><span>  ipFamilies:</span></span>
<span class="line"><span>  - IPv4</span></span>
<span class="line"><span>  ipFamilyPolicy: SingleStack</span></span>
<span class="line"><span>  ports:</span></span>
<span class="line"><span>  - nodePort: 30080					# 手动指定外部访问端口</span></span>
<span class="line"><span>    port: 80</span></span>
<span class="line"><span>    protocol: TCP</span></span>
<span class="line"><span>    targetPort: 80</span></span>
<span class="line"><span>  selector:</span></span>
<span class="line"><span>    app: nginx-deploy				# 必须与 Deployment 的 Labels 匹配</span></span>
<span class="line"><span>  sessionAffinity: None</span></span>
<span class="line"><span>  type: NodePort</span></span>
<span class="line"><span>status:</span></span>
<span class="line"><span>  loadBalancer: {}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h3 id="二、-kubernetes-dashboard-部署与避坑" tabindex="-1"><a class="header-anchor" href="#二、-kubernetes-dashboard-部署与避坑"><span>二、 Kubernetes Dashboard 部署与避坑</span></a></h3>
<p>Dashboard 是官方的图形化管理界面，部署时需要处理网络和权限问题。</p>
<h4 id="_1-部署步骤" tabindex="-1"><a class="header-anchor" href="#_1-部署步骤"><span>1. 部署步骤</span></a></h4>
<ol>
<li><strong>下载并修改配置</strong>：从官方获取 <code v-pre>recommended.yaml</code>，并手动将 <code v-pre>kubernetes-dashboard</code> 的 <code v-pre>Service</code> 类型从 <code v-pre>ClusterIP</code> 改为 <code v-pre>NodePort</code>（例如指定 <code v-pre>nodePort: 30443</code>）。</li>
<li><strong>应用配置</strong>：<code v-pre>kubectl apply -f recommended.yaml</code>。</li>
<li><strong>创建管理员账号</strong>：</li>
</ol>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 创建账号并绑定集群管理员权限 (cluster-admin)</span></span>
<span class="line"><span>kubectl create serviceaccount admin-user -n kubernetes-dashboard</span></span>
<span class="line"><span>kubectl create clusterrolebinding admin-user-binding --clusterrole=cluster-admin --serviceaccount=kubernetes-dashboard:admin-user</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-关键排错-协议问题" tabindex="-1"><a class="header-anchor" href="#_2-关键排错-协议问题"><span>2. 关键排错：协议问题</span></a></h4>
<ul>
<li><strong>现象</strong>：浏览器报错 <code v-pre>Client sent an HTTP request to an HTTPS server</code>。</li>
<li><strong>原因</strong>：Dashboard 强制使用加密协议。如果你在地址栏输入 <code v-pre>http://</code> 就会触发此错误。</li>
<li><strong>对策</strong>：必须手动输入 <code v-pre>**https://&lt;IP&gt;:30443**</code>。</li>
</ul>
<h4 id="_3-浏览器拦截提示-chrome-edge-特有" tabindex="-1"><a class="header-anchor" href="#_3-浏览器拦截提示-chrome-edge-特有"><span>3. 浏览器拦截提示（Chrome/Edge 特有）</span></a></h4>
<p>由于使用自签证书，浏览器会拦截。如果找不到“继续访问”按钮，可以在页面空白处盲敲键盘输入：<code v-pre>thisisunsafe</code>。</p>
<hr>
<h3 id="三、-核心概念总结" tabindex="-1"><a class="header-anchor" href="#三、-核心概念总结"><span>三、 核心概念总结</span></a></h3>
<table>
<thead>
<tr>
<th><strong>概念</strong></th>
<th><strong>说明</strong></th>
<th><strong>你的应用场景</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>ClusterIP</strong></td>
<td>默认类型，仅限集群内部互相调用。</td>
<td>Nginx 访问内部数据库。</td>
</tr>
<tr>
<td><strong>NodePort</strong></td>
<td>在所有节点开启物理端口，打通内外网。</td>
<td><strong>浏览器访问 Dashboard 或 Nginx。</strong></td>
</tr>
<tr>
<td><strong>Metrics Server</strong></td>
<td>资源监控组件。</td>
<td>Dashboard 里的 CPU/内存波浪图数据源。</td>
</tr>
<tr>
<td><strong>Token</strong></td>
<td>登录凭证。</td>
<td>进入 Dashboard 的“钥匙”，通过 <code v-pre>kubectl create token</code>&lt;br&gt;获取。</td>
</tr>
</tbody>
</table>
<hr>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};