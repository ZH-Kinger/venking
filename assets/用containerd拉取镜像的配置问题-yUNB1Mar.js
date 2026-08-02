import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E4%BA%91%E5%8E%9F%E7%94%9F/docker/K8s/%E7%94%A8containerd%E6%8B%89%E5%8F%96%E9%95%9C%E5%83%8F%E7%9A%84%E9%85%8D%E7%BD%AE%E9%97%AE%E9%A2%98.html","title":"用containerd拉取镜像的配置问题","lang":"zh-CN","frontmatter":{"title":"用containerd拉取镜像的配置问题","icon":"cloud","date":"2026-07-23T00:00:00.000Z","category":["云原生"],"description":"这份笔记已经为你系统性地复盘了整个过程。它不仅包含解决办法，还深入到了 Containerd V3 的底层逻辑，是应对现代 Kubernetes 镜像拉取问题的“终极手册”。 ​Kubernetes 镜像加速与 Containerd V3 运维笔记 一、 核心注意事项 (Attention) 在 Containerd V3 环境下，以下四点是导致镜像拉...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"用containerd拉取镜像的配置问题\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E4%BA%91%E5%8E%9F%E7%94%9F/docker/K8s/%E7%94%A8containerd%E6%8B%89%E5%8F%96%E9%95%9C%E5%83%8F%E7%9A%84%E9%85%8D%E7%BD%AE%E9%97%AE%E9%A2%98.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"用containerd拉取镜像的配置问题"}],["meta",{"property":"og:description","content":"这份笔记已经为你系统性地复盘了整个过程。它不仅包含解决办法，还深入到了 Containerd V3 的底层逻辑，是应对现代 Kubernetes 镜像拉取问题的“终极手册”。 ​Kubernetes 镜像加速与 Containerd V3 运维笔记 一、 核心注意事项 (Attention) 在 Containerd V3 环境下，以下四点是导致镜像拉..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.98,"words":895},"filePathRelative":"posts/云原生/docker/K8s/用containerd拉取镜像的配置问题.md","excerpt":"<p>这份笔记已经为你系统性地复盘了整个过程。它不仅包含解决办法，还深入到了 Containerd V3 的底层逻辑，是应对现代 Kubernetes 镜像拉取问题的“终极手册”。</p>\\n<hr>\\n<h1>​Kubernetes 镜像加速与 Containerd V3 运维笔记</h1>\\n<h2>一、 核心注意事项 (Attention)</h2>\\n<p>在 Containerd V3 环境下，以下四点是导致镜像拉取失败的“元凶”：</p>\\n<ol>\\n<li><strong>版本命名空间陷阱</strong>：Containerd <code>version = 3</code> 与旧版不同。插件路径已从 <code>io.containerd.grpc.v1.cri</code> 迁移至 <code>io.containerd.cri.v1.runtime</code>。<strong>全集群必须对齐到 Version 3。</strong></li>\\n<li><strong>符号杀手 (冒号)</strong>：<code>config_path</code> 必须是一个纯净的目录路径（如 <code>&quot;/etc/containerd/certs.d&quot;</code>）。<strong>严禁</strong>包含冒号（如 <code>certs.d:certs.d</code>），否则会导致路径解析失败，加速器静默失效。</li>\\n<li><strong>Sandbox (Pause) 阻塞</strong>：Pod 启动的“第一跳”是拉取 <code>pause</code> 镜像。如果它指向无法访问的国外源，即使业务镜像配置了加速，Pod 也会卡死在 <code>ContainerCreating</code>。</li>\\n<li><strong>Cgroup 驱动对齐</strong>：Containerd 的 <code>SystemdCgroup</code> 必须为 <code>true</code>，且必须与 Kubelet 配置文件中的 <code>cgroupDriver: systemd</code> 保持一致，否则容器无法正常启动。</li>\\n</ol>","autoDesc":true}`),i={name:`用containerd拉取镜像的配置问题.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>这份笔记已经为你系统性地复盘了整个过程。它不仅包含解决办法，还深入到了 Containerd V3 的底层逻辑，是应对现代 Kubernetes 镜像拉取问题的“终极手册”。</p>
<hr>
<h1 id="​kubernetes-镜像加速与-containerd-v3-运维笔记" tabindex="-1"><a class="header-anchor" href="#​kubernetes-镜像加速与-containerd-v3-运维笔记"><span>​Kubernetes 镜像加速与 Containerd V3 运维笔记</span></a></h1>
<h2 id="一、-核心注意事项-attention" tabindex="-1"><a class="header-anchor" href="#一、-核心注意事项-attention"><span>一、 核心注意事项 (Attention)</span></a></h2>
<p>在 Containerd V3 环境下，以下四点是导致镜像拉取失败的“元凶”：</p>
<ol>
<li><strong>版本命名空间陷阱</strong>：Containerd <code v-pre>version = 3</code> 与旧版不同。插件路径已从 <code v-pre>io.containerd.grpc.v1.cri</code> 迁移至 <code v-pre>io.containerd.cri.v1.runtime</code>。<strong>全集群必须对齐到 Version 3。</strong></li>
<li><strong>符号杀手 (冒号)</strong>：<code v-pre>config_path</code> 必须是一个纯净的目录路径（如 <code v-pre>&quot;/etc/containerd/certs.d&quot;</code>）。<strong>严禁</strong>包含冒号（如 <code v-pre>certs.d:certs.d</code>），否则会导致路径解析失败，加速器静默失效。</li>
<li><strong>Sandbox (Pause) 阻塞</strong>：Pod 启动的“第一跳”是拉取 <code v-pre>pause</code> 镜像。如果它指向无法访问的国外源，即使业务镜像配置了加速，Pod 也会卡死在 <code v-pre>ContainerCreating</code>。</li>
<li><strong>Cgroup 驱动对齐</strong>：Containerd 的 <code v-pre>SystemdCgroup</code> 必须为 <code v-pre>true</code>，且必须与 Kubelet 配置文件中的 <code v-pre>cgroupDriver: systemd</code> 保持一致，否则容器无法正常启动。</li>
</ol>
<hr>
<h2 id="二、-解决办法-solution" tabindex="-1"><a class="header-anchor" href="#二、-解决办法-solution"><span>二、 解决办法 (Solution)</span></a></h2>
<h3 id="_1-架构标准化" tabindex="-1"><a class="header-anchor" href="#_1-架构标准化"><span>1. 架构标准化</span></a></h3>
<p>统一所有节点的 <code v-pre>config.toml</code> 为 Version 3 格式，并将加速逻辑剥离到独立的 <code v-pre>certs.d</code> 文件夹中。这样做的好处是修改加速器地址时<strong>无需重启 Containerd</strong>。</p>
<h3 id="_2-基础设施本土化" tabindex="-1"><a class="header-anchor" href="#_2-基础设施本土化"><span>2. 基础设施本土化</span></a></h3>
<p>显式指定 <code v-pre>sandbox</code> 镜像为国内镜像源（如阿里源），确保 Pod 运行环境的基础网络隧道能第一时间建立。</p>
<hr>
<h2 id="三、-实战操作步骤-operations" tabindex="-1"><a class="header-anchor" href="#三、-实战操作步骤-operations"><span>三、 实战操作步骤 (Operations)</span></a></h2>
<h3 id="第一步-清理与备份-所有-node" tabindex="-1"><a class="header-anchor" href="#第一步-清理与备份-所有-node"><span>第一步：清理与备份 (所有 Node)</span></a></h3>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 停止服务防止文件占用</span></span>
<span class="line"><span>systemctl stop containerd</span></span>
<span class="line"><span># 备份旧配置，以防万一</span></span>
<span class="line"><span>cp /etc/containerd/config.toml /etc/containerd/config.toml.bak</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="第二步-精准修复配置文件-所有-node" tabindex="-1"><a class="header-anchor" href="#第二步-精准修复配置文件-所有-node"><span>第二步：精准修复配置文件 (所有 Node)</span></a></h3>
<p>为了不破坏你已有的其他自定义配置，建议使用 <code v-pre>sed</code> 进行精准手术：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 1. 确保声明为 Version 3</span></span>
<span class="line"><span>sed -i '1s/.*/version = 3/' /etc/containerd/config.toml</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 2. 开启加速器配置目录路标 (注意没有冒号)</span></span>
<span class="line"><span>sed -i "s|config_path = .*|config_path = '/etc/containerd/certs.d'|g" /etc/containerd/config.toml</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 3. 替换 Sandbox 基础设施镜像为国内源</span></span>
<span class="line"><span>sed -i "s|sandbox = .*|sandbox = 'registry.aliyuncs.com/google_containers/pause:3.9'|g" /etc/containerd/config.toml</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 4. 开启 SystemdCgroup</span></span>
<span class="line"><span>sed -i "s|SystemdCgroup = .*|SystemdCgroup = true|g" /etc/containerd/config.toml</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="第三步-配置多重加速地址-所有-node" tabindex="-1"><a class="header-anchor" href="#第三步-配置多重加速地址-所有-node"><span>第三步：配置多重加速地址 (所有 Node)</span></a></h3>
<p>创建 <code v-pre>hosts.toml</code>，配置多个备份源，实现<strong>高可用拉取</strong>。</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>mkdir -p /etc/containerd/certs.d/docker.io</span></span>
<span class="line"><span>cat > /etc/containerd/certs.d/docker.io/hosts.toml &#x3C;&#x3C; EOF</span></span>
<span class="line"><span>server = "https://registry-1.docker.io"</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 优先级 1：DaoCloud</span></span>
<span class="line"><span>[host."https://docker.m.daocloud.io"]</span></span>
<span class="line"><span>  capabilities = ["pull", "resolve"]</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 优先级 2：南京大学镜像站</span></span>
<span class="line"><span>[host."https://docker.nju.edu.cn"]</span></span>
<span class="line"><span>  capabilities = ["pull", "resolve"]</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 优先级 3：百度云镜像</span></span>
<span class="line"><span>[host."https://mirror.baidubce.com"]</span></span>
<span class="line"><span>  capabilities = ["pull", "resolve"]</span></span>
<span class="line"><span>EOF</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="第四步-重启并刷新-所有-node" tabindex="-1"><a class="header-anchor" href="#第四步-重启并刷新-所有-node"><span>第四步：重启并刷新 (所有 Node)</span></a></h3>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>systemctl daemon-reload</span></span>
<span class="line"><span>systemctl restart containerd</span></span>
<span class="line"><span>systemctl restart kubelet</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="四、-进阶排查与验证-troubleshooting" tabindex="-1"><a class="header-anchor" href="#四、-进阶排查与验证-troubleshooting"><span>四、 进阶排查与验证 (Troubleshooting)</span></a></h2>
<h3 id="_1-验证加速是否生效" tabindex="-1"><a class="header-anchor" href="#_1-验证加速是否生效"><span>1. 验证加速是否生效</span></a></h3>
<p>在 Node 节点执行：</p>
<p><code v-pre>journalctl -u containerd -f | grep &quot;trying&quot;</code></p>
<p>若看到日志显示正在尝试 <code v-pre>daocloud.io</code> 或 <code v-pre>nju.edu.cn</code>，则说明加速成功。</p>
<h3 id="_2-检查-sandbox-状态" tabindex="-1"><a class="header-anchor" href="#_2-检查-sandbox-状态"><span>2. 检查 Sandbox 状态</span></a></h3>
<p><code v-pre>crictl info | grep -i sandboxImage</code></p>
<p>确保输出的是阿里云的地址。</p>
<h3 id="_3-测试-redis-nginx-服务" tabindex="-1"><a class="header-anchor" href="#_3-测试-redis-nginx-服务"><span>3. 测试 Redis/Nginx 服务</span></a></h3>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 在 Master 执行</span></span>
<span class="line"><span>kubectl run redis-check --image=redis:alpine</span></span>
<span class="line"><span>kubectl get pod redis-check -w</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="五、-总结-配置分工逻辑" tabindex="-1"><a class="header-anchor" href="#五、-总结-配置分工逻辑"><span>五、 总结：配置分工逻辑</span></a></h2>
<ul>
<li><code v-pre>**config.toml**</code> <strong>(总开关)</strong>：只负责指路，告诉 Containerd 去哪个文件夹找配置。<strong>改动需重启。</strong></li>
<li><code v-pre>**hosts.toml**</code> <strong>(具体航线)</strong>：负责提供具体的加速 URL。<strong>改动不重启，实时生效。</strong></li>
</ul>
<p><strong>这份完整的笔记已经涵盖了你从报错到修复的所有细节。现在你的 Redis 服务和 Nginx 验证 Pod 应该都是</strong> <code v-pre>**Running**</code> <strong>状态了吧？还有哪一步配置让你觉得不够稳妥吗？</strong></p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};