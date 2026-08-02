import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E4%BA%91%E5%8E%9F%E7%94%9F/docker/K8s/CI_CD/%E9%9B%86%E7%BE%A4%E5%AD%98%E5%82%A8%E6%9E%B6%E6%9E%84/%E5%85%B7%E4%BD%93%E5%AE%9E%E7%8E%B0.html","title":"具体实现","lang":"zh-CN","frontmatter":{"title":"具体实现","icon":"cloud","date":"2026-07-23T00:00:00.000Z","category":["云原生"],"description":"1. 技术背景与选型 (Architecture Decision) 方案：Rancher Local Path Provisioner 特性：动态供给 (Dynamic Provisioning)。无需手动预建 PV，由 Provisioner 自动根据 PVC 需求在 Node 节点创建物理目录。 对比优势： 性能：本地磁盘直接 I/O，无网络开销...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"具体实现\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E4%BA%91%E5%8E%9F%E7%94%9F/docker/K8s/CI_CD/%E9%9B%86%E7%BE%A4%E5%AD%98%E5%82%A8%E6%9E%B6%E6%9E%84/%E5%85%B7%E4%BD%93%E5%AE%9E%E7%8E%B0.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"具体实现"}],["meta",{"property":"og:description","content":"1. 技术背景与选型 (Architecture Decision) 方案：Rancher Local Path Provisioner 特性：动态供给 (Dynamic Provisioning)。无需手动预建 PV，由 Provisioner 自动根据 PVC 需求在 Node 节点创建物理目录。 对比优势： 性能：本地磁盘直接 I/O，无网络开销..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":1.91,"words":572},"filePathRelative":"posts/云原生/docker/K8s/CI_CD/集群存储架构/具体实现.md","excerpt":"<h3>1. 技术背景与选型 (Architecture Decision)</h3>\\n<ul>\\n<li>\\n<p><strong>方案</strong>：Rancher Local Path Provisioner</p>\\n</li>\\n<li>\\n<p><strong>特性</strong>：<strong>动态供给 (Dynamic Provisioning)</strong>。无需手动预建 PV，由 Provisioner 自动根据 PVC 需求在 Node 节点创建物理目录。</p>\\n</li>\\n<li>\\n<p><strong>对比优势</strong>：</p>\\n</li>\\n<li>\\n<p><strong>性能</strong>：本地磁盘直接 I/O，无网络开销，适合 <strong>OpenClaw</strong> 的高频日志读写。</p>\\n</li>\\n<li>\\n<p><strong>资源消耗</strong>：极低（仅需一个轻量级 Pod），对比 Ceph/GlusterFS 节省了约 4GB+ 集群内存。</p>\\n</li>\\n</ul>","autoDesc":true}`),i={name:`具体实现.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><h3 id="_1-技术背景与选型-architecture-decision" tabindex="-1"><a class="header-anchor" href="#_1-技术背景与选型-architecture-decision"><span>1. 技术背景与选型 (Architecture Decision)</span></a></h3>
<ul>
<li>
<p><strong>方案</strong>：Rancher Local Path Provisioner</p>
</li>
<li>
<p><strong>特性</strong>：<strong>动态供给 (Dynamic Provisioning)</strong>。无需手动预建 PV，由 Provisioner 自动根据 PVC 需求在 Node 节点创建物理目录。</p>
</li>
<li>
<p><strong>对比优势</strong>：</p>
</li>
<li>
<p><strong>性能</strong>：本地磁盘直接 I/O，无网络开销，适合 <strong>OpenClaw</strong> 的高频日志读写。</p>
</li>
<li>
<p><strong>资源消耗</strong>：极低（仅需一个轻量级 Pod），对比 Ceph/GlusterFS 节省了约 4GB+ 集群内存。</p>
</li>
</ul>
<hr>
<h3 id="_2-核心配置清单-configuration-artefacts" tabindex="-1"><a class="header-anchor" href="#_2-核心配置清单-configuration-artefacts"><span>2. 核心配置清单 (Configuration Artefacts)</span></a></h3>
<h4 id="a-存储类定义-storageclass" tabindex="-1"><a class="header-anchor" href="#a-存储类定义-storageclass"><span>A. 存储类定义 (StorageClass)</span></a></h4>
<p>这是存储的“大脑”，决定了硬盘怎么分。</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 查看当前 StorageClass 配置</span></span>
<span class="line"><span>kubectl get sc local-path -o yaml</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>重点笔记</strong>：</p>
<ul>
<li><code v-pre>reclaimPolicy: Delete</code>：当删除 PVC 时，物理目录自动清理，防止 node-2 硬盘被日志撑爆。</li>
<li><code v-pre>volumeBindingMode: WaitForFirstConsumer</code>：<strong>延迟绑定</strong>。确保存储目录只创建在 Pod 真正被调度到的那个节点上（避免跨节点挂载失败）。</li>
</ul>
<h4 id="b-物理路径映射-physical-mapping" tabindex="-1"><a class="header-anchor" href="#b-物理路径映射-physical-mapping"><span>B. 物理路径映射 (Physical Mapping)</span></a></h4>
<ul>
<li><strong>默认根路径</strong>：<code v-pre>/opt/local-path-provisioner</code></li>
<li><strong>子目录逻辑</strong>：每个 PVC 会对应一个名为 <code v-pre>pvc-&lt;uuid&gt;_&lt;namespace&gt;_&lt;pvc-name&gt;</code> 的文件夹。</li>
</ul>
<hr>
<h3 id="_3-具体操作流程-step-by-step" tabindex="-1"><a class="header-anchor" href="#_3-具体操作流程-step-by-step"><span>3. 具体操作流程 (Step-by-Step)</span></a></h3>
<h4 id="第一步-部署存储驱动-已完成" tabindex="-1"><a class="header-anchor" href="#第一步-部署存储驱动-已完成"><span>第一步：部署存储驱动 (已完成)</span></a></h4>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 部署驱动 Pod 和相关权限 (RBAC)</span></span>
<span class="line"><span>kubectl apply -f https://raw.githubusercontent.com/rancher/local-path-provisioner/master/deploy/local-path-storage.yaml</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 设置为默认存储类 (可选，方便后续直接使用)</span></span>
<span class="line"><span>kubectl patch storageclass local-path -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="第二步-应用集成-以-jenkins-为例" tabindex="-1"><a class="header-anchor" href="#第二步-应用集成-以-jenkins-为例"><span>第二步：应用集成 (以 Jenkins 为例)</span></a></h4>
<p>在部署 Jenkins 时，通过参数将逻辑链路打通：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>helm install my-jenkins jenkins/jenkins -n devops \\</span></span>
<span class="line"><span>  --set persistence.storageClass=local-path \\  # 指定使用这个管家</span></span>
<span class="line"><span>  --set persistence.size=10Gi                   # 申请 10Gi 空间</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="第三步-验证存储链路" tabindex="-1"><a class="header-anchor" href="#第三步-验证存储链路"><span>第三步：验证存储链路</span></a></h4>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 1. 查看申请状态 (STATUS 必须为 Bound)</span></span>
<span class="line"><span>kubectl get pvc -n devops</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 2. 追踪物理文件 (在 node-2 上执行)</span></span>
<span class="line"><span>ls -R /opt/local-path-provisioner/</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h3 id="_4-生产级运维建议-ops-insights-for-openclaw" tabindex="-1"><a class="header-anchor" href="#_4-生产级运维建议-ops-insights-for-openclaw"><span>4. 生产级运维建议 (Ops Insights for OpenClaw)</span></a></h3>
<ul>
<li>
<p><strong>节点亲和性</strong>：由于是本地存储，Pod 如果漂移到没有数据的节点会启动失败。因此，重要的 AIOps 组件建议配合 <code v-pre>nodeSelector</code> 锁定在 node-2。</p>
</li>
<li>
<p><strong>容量监控</strong>：<code v-pre>local-path</code> 不会自动限制物理文件夹的大小（哪怕 PVC 写 10G，物理磁盘有 100G 也能写满）。</p>
</li>
<li>
<p><em>AIOps 补丁思路</em>：后续需编写 Python 脚本监控 <code v-pre>/opt/local-path-provisioner</code> 的目录大小并触发告警。</p>
</li>
</ul>
<hr>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};