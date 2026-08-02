import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E4%BA%91%E5%8E%9F%E7%94%9F/docker/K8s/CI_CD/CI_CD%E5%B8%B8%E8%A7%84%E6%96%B9%E6%A1%88.html","title":"CI_CD常规方案","lang":"zh-CN","frontmatter":{"title":"CI_CD常规方案","icon":"cloud","date":"2026-07-23T00:00:00.000Z","category":["云原生"],"description":"梓涵，在企业级工程中，CI/CD 从来不是指某一个具体的工具，而是一套**“把代码安全、快速地搬运到服务器上”的流水线架构**。 根据公司业务的体量和底层基础设施（比如是物理机还是容器化），目前业界有三套最主流的常规 CI/CD 方案。我为你梳理了这三种架构的流转逻辑，你可以直接对照着你的项目场景来看： 方案一：云原生标准方案（GitLab CI + ...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"CI_CD常规方案\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E4%BA%91%E5%8E%9F%E7%94%9F/docker/K8s/CI_CD/CI_CD%E5%B8%B8%E8%A7%84%E6%96%B9%E6%A1%88.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"CI_CD常规方案"}],["meta",{"property":"og:description","content":"梓涵，在企业级工程中，CI/CD 从来不是指某一个具体的工具，而是一套**“把代码安全、快速地搬运到服务器上”的流水线架构**。 根据公司业务的体量和底层基础设施（比如是物理机还是容器化），目前业界有三套最主流的常规 CI/CD 方案。我为你梳理了这三种架构的流转逻辑，你可以直接对照着你的项目场景来看： 方案一：云原生标准方案（GitLab CI + ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.54,"words":1061},"filePathRelative":"posts/云原生/docker/K8s/CI_CD/CI_CD常规方案.md","excerpt":"<p>梓涵，在企业级工程中，CI/CD 从来不是指某一个具体的工具，而是一套**“把代码安全、快速地搬运到服务器上”的流水线架构**。</p>\\n<p>根据公司业务的体量和底层基础设施（比如是物理机还是容器化），目前业界有三套最主流的常规 CI/CD 方案。我为你梳理了这三种架构的流转逻辑，你可以直接对照着你的项目场景来看：</p>\\n<hr>\\n<h2>方案一：云原生标准方案（GitLab CI + Docker + K8s + Harbor）</h2>\\n<p>这是目前绝大多数互联网公司和现代化项目的<strong>绝对主流</strong>。整个过程高度容器化，非常适合微服务架构。</p>\\n<ul>\\n<li><strong>适用场景：</strong> 底层基础设施已经是 Kubernetes，且项目微服务较多。</li>\\n<li><strong>流水线流程：</strong></li>\\n</ul>","autoDesc":true}`),i={name:`CI_CD常规方案.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>梓涵，在企业级工程中，CI/CD 从来不是指某一个具体的工具，而是一套**“把代码安全、快速地搬运到服务器上”的流水线架构**。</p>
<p>根据公司业务的体量和底层基础设施（比如是物理机还是容器化），目前业界有三套最主流的常规 CI/CD 方案。我为你梳理了这三种架构的流转逻辑，你可以直接对照着你的项目场景来看：</p>
<hr>
<h2 id="方案一-云原生标准方案-gitlab-ci-docker-k8s-harbor" tabindex="-1"><a class="header-anchor" href="#方案一-云原生标准方案-gitlab-ci-docker-k8s-harbor"><span>方案一：云原生标准方案（GitLab CI + Docker + K8s + Harbor）</span></a></h2>
<p>这是目前绝大多数互联网公司和现代化项目的<strong>绝对主流</strong>。整个过程高度容器化，非常适合微服务架构。</p>
<ul>
<li><strong>适用场景：</strong> 底层基础设施已经是 Kubernetes，且项目微服务较多。</li>
<li><strong>流水线流程：</strong></li>
</ul>
<ol>
<li><strong>提交触发 (CI)：</strong> 开发者把 Python 后端或 Vue 前端代码 Push 到 GitLab。</li>
<li><strong>编译打包 (CI)：</strong> GitLab Runner 被自动唤醒，拉取代码，进行单元测试，并编译成可执行文件。</li>
<li><strong>构建镜像 (CI)：</strong> 自动执行 <code v-pre>docker build</code>，将代码和运行环境打包成不可变的 Docker 镜像。</li>
<li><strong>推送仓库 (CI)：</strong> 将镜像 Push 到企业私有镜像仓库（如 <strong>Harbor</strong> 或阿里云 ACR）。</li>
<li><strong>部署上线 (CD)：</strong> 流水线自动修改 K8s 的 YAML 配置文件（比如更新 Image Tag），调用 K8s API 执行滚动更新（Rolling Update）。</li>
</ol>
<h2 id="方案二-经典企业级方案-jenkins-ansible-ecs-物理机" tabindex="-1"><a class="header-anchor" href="#方案二-经典企业级方案-jenkins-ansible-ecs-物理机"><span>方案二：经典企业级方案（Jenkins + Ansible + ECS/物理机）</span></a></h2>
<p>老牌、稳健，插件生态天下无敌。很多传统企业或者还没完全容器化的团队都在用这套方案。</p>
<ul>
<li><strong>适用场景：</strong> 系统部署在传统的云服务器（ECS）或物理机上，强依赖配置管理工具。</li>
<li><strong>流水线流程：</strong></li>
</ul>
<ol>
<li><strong>获取代码 (CI)：</strong> Jenkins 监听到 Git 仓库的代码合并事件，拉取最新代码。</li>
<li><strong>构建测试 (CI)：</strong> Jenkins 调用本地的 Maven/Node.js/Python 环境进行打包和测试。</li>
<li><strong>制品归档 (CI)：</strong> 将打好的包（如 <code v-pre>.jar</code>、<code v-pre>.tar.gz</code>）推送到制品库（如 Nexus 或 OSS）。</li>
<li><strong>自动化部署 (CD)：</strong> Jenkins 触发 <strong>Ansible</strong> 剧本。Ansible 通过 SSH 批量登录到目标服务器集群，执行下载包、替换文件、重启服务（如重启 Nginx 或 Systemd 服务）的动作。</li>
</ol>
<h2 id="方案三-前沿的-gitops-方案-gitlab-ci-argocd-k8s" tabindex="-1"><a class="header-anchor" href="#方案三-前沿的-gitops-方案-gitlab-ci-argocd-k8s"><span>方案三：前沿的 GitOps 方案（GitLab CI + ArgoCD + K8s）</span></a></h2>
<p>这是在 K8s 时代衍生出的<strong>持续部署最高境界</strong>。它把“配置”也当成了代码来管理，实现了真正的“所见即所得”。</p>
<ul>
<li><strong>适用场景：</strong> 深度依赖 K8s，追求极高的部署安全性和快速回滚能力。</li>
<li><strong>流水线流程：</strong></li>
</ul>
<ol>
<li><strong>CI 阶段（同方案一）：</strong> 依旧是代码 Push --》 跑测试 --》 构建 Docker 镜像 --》 推送到 Harbor。</li>
<li><strong>配置更新：</strong> CI 的最后一步，不是直接去连 K8s，而是去修改一个专门存放 K8s YAML 配置的 Git 仓库（把里面的镜像版本号改掉）。</li>
<li><strong>自动同步 (CD)：****ArgoCD</strong> 这个组件会一直盯着那个 Git 仓库。一旦发现 YAML 文件有更新，它会自动把 K8s 集群的实际状态“拉”平到与 Git 仓库一致（拉取新镜像并重启 Pod）。</li>
<li><strong>优势：</strong> 如果新版本挂了，只需要在 Git 上执行一次 <code v-pre>git revert</code> 撤销提交，K8s 就会瞬间自动回滚，极其安全。</li>
</ol>
<hr>
<h2 id="方案对比速查表" tabindex="-1"><a class="header-anchor" href="#方案对比速查表"><span>方案对比速查表</span></a></h2>
<table>
<thead>
<tr>
<th><strong>特性</strong></th>
<th><strong>方案一 (GitLab CI + K8s)</strong></th>
<th><strong>方案二 (Jenkins + Ansible)</strong></th>
<th><strong>方案三 (GitOps / ArgoCD)</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>核心特点</strong></td>
<td>容器化原生，全自动化</td>
<td>万物皆可集成，适合非容器环境</td>
<td>声明式发布，极致的安全回滚</td>
</tr>
<tr>
<td><strong>架构重心</strong></td>
<td>镜像构建与 K8s 调度</td>
<td>任务编排与脚本分发</td>
<td>配置即代码 (IaC)</td>
</tr>
<tr>
<td><strong>部署模式</strong></td>
<td>Push (流水线把代码推过去)</td>
<td>Push (Ansible 登录机器操作)</td>
<td><strong>Pull</strong> (ArgoCD 主动把配置拉过去)</td>
</tr>
</tbody>
</table>
<hr>
<p>这三种方案其实没有绝对的好坏，只有适不适合当前的业务底座。</p>
<p><strong>你想让我以“方案一（GitLab CI + K8s）”为例，为你写一份极其标准的</strong> <code v-pre>**.gitlab-ci.yml**</code> <strong>配置文件模板吗？我们可以设定一个场景：自动将一个 Vue 3 的前端项目打包成 Docker 镜像并推送到 Harbor。</strong></p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};