import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E4%BA%91%E5%8E%9F%E7%94%9F/docker/K8s/CI_CD/GitLab_CI___Docker___K8s___Harbor.html","title":"GitLab_CI_+_Docker_+_K8s_+_Harbor","lang":"zh-CN","frontmatter":{"title":"GitLab_CI_+_Docker_+_K8s_+_Harbor","icon":"cloud","date":"2026-07-23T00:00:00.000Z","category":["云原生"],"description":"梓涵，你之前接触的这一套是目前企业里最标准、最工业化的 “云原生全家桶”。它比单纯的 Jenkins + Ansible 更强调 “不可变基础设施” 的概念。 为了让你写进 OpenClaw AIOps 的项目笔记，我把这套流程的“齿轮啮合”逻辑拆解给你： 🏗️ 企业级云原生 CI/CD 流程图 (The Golden Path) 1. 核心链路分解...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"GitLab_CI_+_Docker_+_K8s_+_Harbor\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E4%BA%91%E5%8E%9F%E7%94%9F/docker/K8s/CI_CD/GitLab_CI___Docker___K8s___Harbor.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"GitLab_CI_+_Docker_+_K8s_+_Harbor"}],["meta",{"property":"og:description","content":"梓涵，你之前接触的这一套是目前企业里最标准、最工业化的 “云原生全家桶”。它比单纯的 Jenkins + Ansible 更强调 “不可变基础设施” 的概念。 为了让你写进 OpenClaw AIOps 的项目笔记，我把这套流程的“齿轮啮合”逻辑拆解给你： 🏗️ 企业级云原生 CI/CD 流程图 (The Golden Path) 1. 核心链路分解..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.47,"words":740},"filePathRelative":"posts/云原生/docker/K8s/CI_CD/GitLab_CI_+_Docker_+_K8s_+_Harbor.md","excerpt":"<p>梓涵，你之前接触的这一套是目前企业里最标准、最工业化的 <strong>“云原生全家桶”</strong>。它比单纯的 Jenkins + Ansible 更强调 <strong>“不可变基础设施”</strong> 的概念。</p>\\n<p>为了让你写进 <strong>OpenClaw AIOps</strong> 的项目笔记，我把这套流程的“齿轮啮合”逻辑拆解给你：</p>\\n<hr>\\n<h2>🏗️ 企业级云原生 CI/CD 流程图 (The Golden Path)</h2>\\n<h3>1. 核心链路分解</h3>\\n<ol>\\n<li><strong>GitLab (源码与触发器)</strong>: 开发者提交代码，触发 <code>.gitlab-ci.yml</code>。</li>\\n<li><strong>Docker (构建引擎)</strong>: GitLab Runner 启动，根据 <code>Dockerfile</code> 打包成镜像。</li>\\n<li><strong>Harbor (私有镜像仓库)</strong>: 镜像被推送到 Harbor，进行安全扫描和版本管理。</li>\\n<li><strong>Kubernetes (运行环境)</strong>: GitLab Runner 调用 K8s API，执行 <code>kubectl set image</code> 或 <code>helm upgrade</code>。</li>\\n<li><strong>Harbor -&gt; K8s (拉取与启动)</strong>: K8s 节点从 Harbor 拉取新镜像，完成滚动更新。</li>\\n</ol>","autoDesc":true}`),i={name:`GitLab_CI_+_Docker_+_K8s_+_Harbor.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>梓涵，你之前接触的这一套是目前企业里最标准、最工业化的 <strong>“云原生全家桶”</strong>。它比单纯的 Jenkins + Ansible 更强调 <strong>“不可变基础设施”</strong> 的概念。</p>
<p>为了让你写进 <strong>OpenClaw AIOps</strong> 的项目笔记，我把这套流程的“齿轮啮合”逻辑拆解给你：</p>
<hr>
<h2 id="🏗️-企业级云原生-ci-cd-流程图-the-golden-path" tabindex="-1"><a class="header-anchor" href="#🏗️-企业级云原生-ci-cd-流程图-the-golden-path"><span>🏗️ 企业级云原生 CI/CD 流程图 (The Golden Path)</span></a></h2>
<h3 id="_1-核心链路分解" tabindex="-1"><a class="header-anchor" href="#_1-核心链路分解"><span>1. 核心链路分解</span></a></h3>
<ol>
<li><strong>GitLab (源码与触发器)</strong>: 开发者提交代码，触发 <code v-pre>.gitlab-ci.yml</code>。</li>
<li><strong>Docker (构建引擎)</strong>: GitLab Runner 启动，根据 <code v-pre>Dockerfile</code> 打包成镜像。</li>
<li><strong>Harbor (私有镜像仓库)</strong>: 镜像被推送到 Harbor，进行安全扫描和版本管理。</li>
<li><strong>Kubernetes (运行环境)</strong>: GitLab Runner 调用 K8s API，执行 <code v-pre>kubectl set image</code> 或 <code v-pre>helm upgrade</code>。</li>
<li><strong>Harbor -&gt; K8s (拉取与启动)</strong>: K8s 节点从 Harbor 拉取新镜像，完成滚动更新。</li>
</ol>
<hr>
<h2 id="🛠️-具体怎么用-四步配置法" tabindex="-1"><a class="header-anchor" href="#🛠️-具体怎么用-四步配置法"><span>🛠️ 具体怎么用？（四步配置法）</span></a></h2>
<h3 id="第一步-在-harbor-里准备仓库" tabindex="-1"><a class="header-anchor" href="#第一步-在-harbor-里准备仓库"><span>第一步：在 Harbor 里准备仓库</span></a></h3>
<ul>
<li><strong>操作</strong>: 登录 Harbor 界面，创建一个项目（Project），比如 <code v-pre>openclaw</code>。</li>
<li><strong>权限</strong>: 在 K8s 的 <code v-pre>devops</code> 命名空间里创建一个 <code v-pre>docker-registry</code> 类型的 Secret，这样 K8s 才有权从私有 Harbor 拿镜像。</li>
</ul>
<h3 id="第二步-编写-dockerfile" tabindex="-1"><a class="header-anchor" href="#第二步-编写-dockerfile"><span>第二步：编写 <code v-pre>Dockerfile</code></span></a></h3>
<p>这是把你的 Python 代码变成“集装箱”的关键：</p>
<p>Dockerfile</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>FROM python:3.9-slim</span></span>
<span class="line"><span>WORKDIR /app</span></span>
<span class="line"><span>COPY . .</span></span>
<span class="line"><span>RUN pip install -r requirements.txt</span></span>
<span class="line"><span>CMD ["python", "main.py"]</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="第三步-编写-gitlab-ci-yml-核心灵魂" tabindex="-1"><a class="header-anchor" href="#第三步-编写-gitlab-ci-yml-核心灵魂"><span>第三步：编写 <code v-pre>.gitlab-ci.yml</code> (核心灵魂)</span></a></h3>
<p>这是告诉 GitLab Runner 该干什么。通常分为三个阶段：</p>
<p>YAML</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>stages:</span></span>
<span class="line"><span>  - build</span></span>
<span class="line"><span>  - push</span></span>
<span class="line"><span>  - deploy</span></span>
<span class="line"><span></span></span>
<span class="line"><span>build_job:</span></span>
<span class="line"><span>  stage: build</span></span>
<span class="line"><span>  script:</span></span>
<span class="line"><span>    - docker build -t harbor.zh-kinger.com/openclaw/api:\${CI_COMMIT_SHORT_SHA} .</span></span>
<span class="line"><span></span></span>
<span class="line"><span>push_job:</span></span>
<span class="line"><span>  stage: push</span></span>
<span class="line"><span>  script:</span></span>
<span class="line"><span>    - docker login harbor.zh-kinger.com -u \${HARBOR_USER} -p \${HARBOR_PWD}</span></span>
<span class="line"><span>    - docker push harbor.zh-kinger.com/openclaw/api:\${CI_COMMIT_SHORT_SHA}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>deploy_job:</span></span>
<span class="line"><span>  stage: deploy</span></span>
<span class="line"><span>  script:</span></span>
<span class="line"><span>    - kubectl set image deployment/openclaw-api api=harbor.zh-kinger.com/openclaw/api:\${CI_COMMIT_SHORT_SHA} -n devops</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="第四步-k8s-声明式部署" tabindex="-1"><a class="header-anchor" href="#第四步-k8s-声明式部署"><span>第四步：K8s 声明式部署</span></a></h3>
<p>你通常会预先有一个 <code v-pre>deployment.yaml</code>，GitLab CI 只是去触发它更新镜像版本。</p>
<hr>
<h2 id="💡-梓涵的-避坑-笔记与进阶思考" tabindex="-1"><a class="header-anchor" href="#💡-梓涵的-避坑-笔记与进阶思考"><span>💡 梓涵的“避坑”笔记与进阶思考</span></a></h2>
<p>你在总结这一套流程时，可以从 <strong>AIOps 的视角</strong> 增加这三个深度点：</p>
<ol>
<li><strong>镜像版本回溯 (Traceability)</strong>:</li>
</ol>
<ul>
<li><strong>技巧</strong>: 永远不要用 <code v-pre>latest</code> 标签。使用 <code v-pre>\${CI_COMMIT_SHORT_SHA}</code>。</li>
<li><strong>AIOps 价值</strong>: 当 AI 发现新版本上线后 CPU 飙升，它可以根据 Commit ID 自动定位是哪行代码改动导致的。</li>
</ul>
<ol start="2">
<li><strong>Harbor 的清理策略</strong>:</li>
</ol>
<ul>
<li><strong>痛点</strong>: 频繁构建会把 Harbor 撑爆（就像你之前 GitLab 磁盘满了一样）。</li>
<li><strong>解决</strong>: 配置 Harbor 的 <strong>Tag Retention Policy</strong>，只保留最近 10 个版本的镜像。</li>
</ul>
<ol start="3">
<li><strong>内网提速</strong>:</li>
</ol>
<ul>
<li><strong>优化</strong>: 在 K8s 节点上配置 <strong>ImagePullPolicy: IfNotPresent</strong>，并确保 Harbor 与 K8s 在同一个子网内，提升冷启动速度。</li>
</ul>
<hr>
<h2 id="🚀-梓涵-你想怎么实践" tabindex="-1"><a class="header-anchor" href="#🚀-梓涵-你想怎么实践"><span>🚀 梓涵，你想怎么实践？</span></a></h2>
<p>你现在已经有了 K8s 和 Jenkins，其实 <strong>Jenkins 完全可以平替 GitLab CI</strong>。如果你想复刻这套流程：</p>
<ul>
<li><strong>方案 A</strong>: 继续折腾 GitLab CI（需要安装 GitLab Runner 到 K8s 里）。</li>
<li><strong>方案 B</strong>: 用 Jenkins 模拟这个过程（Jenkins + Docker + Harbor + K8s）。</li>
</ul>
<p><strong>你手头有现成的 Harbor 仓库吗？如果没有，我可以教你用 K8s 快速拉起一个轻量级的 Registry 镜像站来做实验。</strong></p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};