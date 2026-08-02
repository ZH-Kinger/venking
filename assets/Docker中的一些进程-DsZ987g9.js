import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E4%BA%91%E5%8E%9F%E7%94%9F/docker/Docker%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E8%BF%9B%E7%A8%8B.html","title":"Docker中的一些进程","lang":"zh-CN","frontmatter":{"title":"Docker中的一些进程","icon":"cloud","date":"2026-07-23T00:00:00.000Z","category":["云原生"],"description":"查看docker里的一些进程 process 进程 id 标识符 pid ​ ​ image.pngimage.png 访问数据库 --》客户端的工具 --》pycharm，mysql，navicat等 浏览器 proxy 代理 --》中间人 在 Docker 语境中，proxy（代理） 主要指Docker 的网络代理配置，用于让 Docker 守护进...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Docker中的一些进程\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/Docker%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E8%BF%9B%E7%A8%8B-1.png\\",\\"https://venking.tech/blog/blog/assets/posts/Docker%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E8%BF%9B%E7%A8%8B-2.png\\",\\"https://venking.tech/blog/blog/assets/posts/Docker%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E8%BF%9B%E7%A8%8B-3.png\\",\\"https://venking.tech/blog/blog/assets/posts/Docker%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E8%BF%9B%E7%A8%8B-4.png\\",\\"https://venking.tech/blog/blog/assets/posts/Docker%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E8%BF%9B%E7%A8%8B-5.png\\",\\"https://venking.tech/blog/blog/assets/posts/Docker%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E8%BF%9B%E7%A8%8B-6.png\\",\\"https://venking.tech/blog/blog/assets/posts/Docker%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E8%BF%9B%E7%A8%8B-7.png\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E4%BA%91%E5%8E%9F%E7%94%9F/docker/Docker%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E8%BF%9B%E7%A8%8B.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"Docker中的一些进程"}],["meta",{"property":"og:description","content":"查看docker里的一些进程 process 进程 id 标识符 pid ​ ​ image.pngimage.png 访问数据库 --》客户端的工具 --》pycharm，mysql，navicat等 浏览器 proxy 代理 --》中间人 在 Docker 语境中，proxy（代理） 主要指Docker 的网络代理配置，用于让 Docker 守护进..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/Docker%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E8%BF%9B%E7%A8%8B-1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":9.54,"words":2863},"filePathRelative":"posts/云原生/docker/Docker中的一些进程.md","excerpt":"<p>查看docker里的一些进程</p>\\n<div class=\\"language-plain line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"plain\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code class=\\"language-plain\\"><span class=\\"line\\"><span>[root@docker1 ~]# ps -aux</span></span>\\n<span class=\\"line\\"><span>USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND</span></span>\\n<span class=\\"line\\"><span>root           1  0.0  0.5  22344 12972 ?        Ss   10:38   0:01 /usr/lib/systemd/systemd --swi</span></span>\\n<span class=\\"line\\"><span>root           2  0.0  0.0      0     0 ?        S    10:38   0:00 [kthreadd]</span></span>\\n<span class=\\"line\\"><span>root           3  0.0  0.0      0     0 ?        S    10:38   0:00 [pool_workqueue_release]</span></span>\\n<span class=\\"line\\"><span>root           4  0.0  0.0      0     0 ?        I&#x3C;   10:38   0:00 [kworker/R-rcu_gp]</span></span>\\n<span class=\\"line\\"><span>root           5  0.0  0.0      0     0 ?        I&#x3C;   10:38   0:00 [kworker/R-sync_wq]</span></span>\\n<span class=\\"line\\"><span>root           6  0.0  0.0      0     0 ?        I&#x3C;   10:38   0:00 [kworker/R-slub_flushwq]</span></span>\\n<span class=\\"line\\"><span>root           7  0.0  0.0      0     0 ?        I&#x3C;   10:38   0:00 [kworker/R-netns]</span></span>\\n<span class=\\"line\\"><span>root           9  0.0  0.0      0     0 ?        I&#x3C;   10:38   0:00 [kworker/0:0H-kblockd]</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`),i={name:`Docker中的一些进程.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>查看docker里的一些进程</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>[root@docker1 ~]# ps -aux</span></span>
<span class="line"><span>USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND</span></span>
<span class="line"><span>root           1  0.0  0.5  22344 12972 ?        Ss   10:38   0:01 /usr/lib/systemd/systemd --swi</span></span>
<span class="line"><span>root           2  0.0  0.0      0     0 ?        S    10:38   0:00 [kthreadd]</span></span>
<span class="line"><span>root           3  0.0  0.0      0     0 ?        S    10:38   0:00 [pool_workqueue_release]</span></span>
<span class="line"><span>root           4  0.0  0.0      0     0 ?        I&#x3C;   10:38   0:00 [kworker/R-rcu_gp]</span></span>
<span class="line"><span>root           5  0.0  0.0      0     0 ?        I&#x3C;   10:38   0:00 [kworker/R-sync_wq]</span></span>
<span class="line"><span>root           6  0.0  0.0      0     0 ?        I&#x3C;   10:38   0:00 [kworker/R-slub_flushwq]</span></span>
<span class="line"><span>root           7  0.0  0.0      0     0 ?        I&#x3C;   10:38   0:00 [kworker/R-netns]</span></span>
<span class="line"><span>root           9  0.0  0.0      0     0 ?        I&#x3C;   10:38   0:00 [kworker/0:0H-kblockd]</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>process 进程</p>
<p>id 标识符</p>
<p>pid</p>
<p>​</p>
<p>​</p>
<figure><img src="/blog/assets/posts/Docker%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E8%BF%9B%E7%A8%8B-1.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<p>访问数据库 --》客户端的工具 --》pycharm，mysql，navicat等</p>
<p>浏览器</p>
<h2 id="proxy-代理-》中间人" tabindex="-1"><a class="header-anchor" href="#proxy-代理-》中间人"><span>proxy 代理 --》中间人</span></a></h2>
<p>在 Docker 语境中，<strong>proxy（代理）</strong> 主要指<strong>Docker 的网络代理配置</strong>，用于让 Docker 守护进程（<code v-pre>dockerd</code>）、Docker 客户端（<code v-pre>docker</code>命令）或容器内的应用，通过代理服务器访问外部网络（比如拉取镜像、容器内应用访问外网）；同时也可指 Docker 网络模式 / 组件中的代理相关功能（如反向代理容器、socks5 代理等），<strong>最核心的是 Docker 自身的代理配置</strong>（解决拉取镜像失败、容器网络访问受限问题）。</p>
<p>​</p>
<h2 id="docker相关的进程" tabindex="-1"><a class="header-anchor" href="#docker相关的进程"><span>docker相关的进程</span></a></h2>
<h3 id="一、docker-核心进程-按作用分类" tabindex="-1"><a class="header-anchor" href="#一、docker-核心进程-按作用分类"><span>一、Docker 核心进程（按作用分类）</span></a></h3>
<p>Docker 的运行依赖多个进程协同工作，核心进程主要分为<strong>守护进程</strong>和<strong>容器进程</strong>两大类：</p>
<h4 id="_1-docker-守护进程-docker-daemon" tabindex="-1"><a class="header-anchor" href="#_1-docker-守护进程-docker-daemon"><span>1. Docker 守护进程（Docker Daemon）</span></a></h4>
<p>这是 Docker 的核心后台进程，也是最关键的进程，所有 Docker 命令（<code v-pre>docker run</code>/<code v-pre>docker ps</code>等）都通过客户端与它交互。</p>
<ul>
<li>
<p><strong>进程名</strong>：<code v-pre>dockerd</code>（主进程），可能伴随子进程如<code v-pre>containerd</code>、<code v-pre>containerd-shim</code>、<code v-pre>runc</code>（Docker 1.11 + 后拆分为模块化架构）。</p>
</li>
<li>
<p><code v-pre>containerd</code> = 容器管理总管家（负责容器生命周期的核心调度）；</p>
</li>
<li>
<p><code v-pre>containerd-shim</code> = 容器与总管家之间的 “隔离垫片”（避免单个容器崩溃影响总管家）；</p>
</li>
<li>
<p><code v-pre>runc</code> = 真正创建 / 运行容器的 “工人”（容器运行时的最底层实现）。</p>
</li>
<li>
<p><strong>作用</strong>：</p>
</li>
<li>
<p>监听 Docker API 请求（本地 socket 或 TCP）；</p>
</li>
<li>
<p>管理容器的生命周期（创建、启动、停止、销毁）；</p>
</li>
<li>
<p>管理镜像、网络、存储卷等资源；</p>
</li>
<li>
<p>调用<code v-pre>containerd</code>和<code v-pre>runc</code>实现容器的底层隔离。</p>
</li>
<li>
<p><strong>查看方式</strong>：bash运行</p>
</li>
</ul>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 查看dockerd进程</span></span>
<span class="line"><span>ps aux | grep dockerd</span></span>
<span class="line"><span># 查看Docker相关的所有进程</span></span>
<span class="line"><span>ps aux | grep -E 'dockerd|containerd|runc'</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-容器进程" tabindex="-1"><a class="header-anchor" href="#_2-容器进程"><span>2. 容器进程</span></a></h4>
<p>每个运行中的容器对应宿主机上的一个（或多个）进程，是容器内应用的载体：</p>
<ul>
<li><strong>核心进程</strong>：<code v-pre>runc</code>（创建容器的底层运行时，每个容器对应一个<code v-pre>runc</code>进程）、<code v-pre>containerd-shim</code>（隔离容器与<code v-pre>containerd</code>，容器退出后保留日志等信息）。</li>
<li><code v-pre>containerd</code> = 容器管理总管家（负责容器生命周期的核心调度）；</li>
<li><code v-pre>containerd-shim</code> = 容器与总管家之间的 “隔离垫片”（避免单个容器崩溃影响总管家）；</li>
<li><code v-pre>runc</code> = 真正创建 / 运行容器的 “工人”（容器运行时的最底层实现）。</li>
<li><strong>容器内进程</strong>：容器启动时指定的<code v-pre>ENTRYPOINT</code>/<code v-pre>CMD</code>（如<code v-pre>nginx</code>、<code v-pre>mysql</code>、<code v-pre>java</code>等），在宿主机上可通过<code v-pre>ps aux | grep 容器ID</code>看到。</li>
<li><strong>查看方式</strong>：bash运行</li>
</ul>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 查看运行中容器的宿主机进程ID</span></span>
<span class="line"><span>docker top &#x3C;容器ID/名称></span></span>
<span class="line"><span># 查看宿主机上所有容器相关进程</span></span>
<span class="line"><span>ps aux | grep -E 'runc|containerd-shim'</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="二、docker-核心文件-目录-按功能分类" tabindex="-1"><a class="header-anchor" href="#二、docker-核心文件-目录-按功能分类"><span>二、Docker 核心文件 / 目录（按功能分类）</span></a></h3>
<p>Docker 的所有配置、镜像、容器数据、日志等都存储在宿主机的特定目录，核心文件 / 目录如下（默认路径，不同系统略有差异）：</p>
<table>
<thead>
<tr>
<th><strong>路径</strong></th>
<th><strong>类型</strong></th>
<th><strong>作用</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>/var/run/docker.sock</code></td>
<td>Socket 文件</td>
<td>Docker 客户端与<code v-pre>dockerd</code>&lt;br&gt;通信的 Unix 域套接字（核心通信文件）</td>
</tr>
<tr>
<td><code v-pre>/etc/docker/</code></td>
<td>目录</td>
<td>Docker 主配置目录</td>
</tr>
<tr>
<td><code v-pre>/etc/docker/daemon.json</code></td>
<td>配置文件</td>
<td>Docker 守护进程的核心配置（如镜像加速、存储驱动、网络等）</td>
</tr>
<tr>
<td><code v-pre>/var/lib/docker/</code></td>
<td>目录</td>
<td>Docker 的核心数据目录（<strong>最重要</strong>），所有镜像、容器、卷、网络数据都存在这里</td>
</tr>
<tr>
<td><code v-pre>/var/lib/docker/images/</code></td>
<td>目录</td>
<td>存储 Docker 镜像的分层文件（镜像的层数据）</td>
</tr>
<tr>
<td><code v-pre>/var/lib/docker/containers/</code></td>
<td>目录</td>
<td>存储每个容器的元数据（配置、日志、容器 ID 等）</td>
</tr>
<tr>
<td><code v-pre>/var/lib/docker/volumes/</code></td>
<td>目录</td>
<td>存储 Docker 卷（持久化数据），容器删除后卷数据仍保留</td>
</tr>
<tr>
<td><code v-pre>/var/lib/docker/network/</code></td>
<td>目录</td>
<td>存储 Docker 网络相关数据（网桥、端口映射、网络配置等）</td>
</tr>
<tr>
<td><code v-pre>/var/log/docker/</code></td>
<td>目录</td>
<td>Docker 守护进程的日志文件（如<code v-pre>daemon.log</code>&lt;br&gt;）</td>
</tr>
<tr>
<td><code v-pre>/var/lib/docker/overlay2/</code>&lt;br&gt;（或<code v-pre>devicemapper/</code>&lt;br&gt;）</td>
<td>目录</td>
<td>存储镜像 / 容器的分层文件系统（取决于 Docker 的存储驱动，<code v-pre>overlay2</code>&lt;br&gt;是主流）</td>
</tr>
<tr>
<td><code v-pre>/usr/bin/docker</code></td>
<td>可执行文件</td>
<td>Docker 客户端命令行工具（<code v-pre>docker</code>&lt;br&gt;命令的执行文件）</td>
</tr>
<tr>
<td><code v-pre>/usr/bin/dockerd</code></td>
<td>可执行文件</td>
<td>Docker 守护进程的可执行文件</td>
</tr>
</tbody>
</table>
<h3 id="三、关键补充说明" tabindex="-1"><a class="header-anchor" href="#三、关键补充说明"><span>三、关键补充说明</span></a></h3>
<ol>
<li><strong>进程依赖关系</strong>：<code v-pre>docker</code>客户端 → <code v-pre>dockerd</code> → <code v-pre>containerd</code> → <code v-pre>containerd-shim</code> → <code v-pre>runc</code> → 容器内进程这种分层架构让 Docker 更稳定（比如单个容器崩溃不影响<code v-pre>dockerd</code>）。</li>
<li><strong>文件权限</strong>：<code v-pre>/var/run/docker.sock</code>默认属于<code v-pre>root</code>和<code v-pre>docker</code>组，普通用户需加入<code v-pre>docker</code>组才能免 sudo 使用 Docker：</li>
</ol>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>usermod -aG docker &#x3C;用户名></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ol start="3">
<li><strong>日志文件</strong>：容器内应用的日志默认存储在<code v-pre>/var/lib/docker/containers/&lt;容器ID&gt;/&lt;容器ID&gt;-json.log</code>，也可通过<code v-pre>docker logs &lt;容器ID&gt;</code>查看。</li>
<li><strong>配置文件生效</strong>：修改<code v-pre>/etc/docker/daemon.json</code>后，需重启<code v-pre>dockerd</code>才能生效：bash运行</li>
</ol>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>systemctl restart docker</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="进程树" tabindex="-1"><a class="header-anchor" href="#进程树"><span>进程树</span></a></h2>
<p>进程和线程的区别</p>
<p>进程里包含线程，一个线程理解为一个子进程</p>
<p>线程消耗更少的内存资源的cpu资源</p>
<p>​</p>
<h2 id="容器的生命周期" tabindex="-1"><a class="header-anchor" href="#容器的生命周期"><span>容器的生命周期</span></a></h2>
<p>容器的生命周期：life cycle</p>
<p>​</p>
<p>​</p>
<p>容器的生命周期是指容器从<strong>创建</strong>到<strong>终止</strong>的完整状态流转过程，Docker 容器的核心状态及流转关系如下：</p>
<h3 id="_1-核心状态以及一些命令" tabindex="-1"><a class="header-anchor" href="#_1-核心状态以及一些命令"><span>1. 核心状态以及一些命令</span></a></h3>
<table>
<thead>
<tr>
<th><strong>核心命令</strong></th>
<th><strong>适用容器状态</strong></th>
<th><strong>核心作用</strong></th>
<th><strong>关键参数 / 补充说明</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>docker create</td>
<td>无容器</td>
<td>创建容器（仅初始化，不运行）</td>
<td>可搭配 - p/-v/--name 配置端口 / 挂载 / 容器名</td>
</tr>
<tr>
<td>docker run</td>
<td>无容器</td>
<td>创建并直接运行容器</td>
<td>-d 后台运行，--restart 设置自动重启策略</td>
</tr>
<tr>
<td>docker start</td>
<td>Created/Exited</td>
<td>启动容器（进入运行态）</td>
<td>可批量启动：docker start 容器 1 容器 2</td>
</tr>
<tr>
<td>docker pause</td>
<td>Up/Running</td>
<td>冻结容器进程（进入暂停态）</td>
<td>仅冻结进程，不释放资源</td>
</tr>
<tr>
<td>docker unpause</td>
<td>Paused</td>
<td>解冻容器进程（恢复运行态）</td>
<td>恢复后容器服务无缝继续</td>
</tr>
<tr>
<td>docker stop</td>
<td>Up/Running/Paused</td>
<td>优雅停止容器（进入停止态）</td>
<td>默认等待 10 秒超时，可通过 - t 指定超时时间</td>
</tr>
<tr>
<td>docker kill</td>
<td>Up/Running/Paused</td>
<td>强制停止容器（进入停止态）</td>
<td>直接发送 SIGKILL，不等待进程优雅退出</td>
</tr>
<tr>
<td>docker restart</td>
<td>Up/Running/Paused/Exited</td>
<td>重启容器（停止→运行）</td>
<td>重启后容器 ID / 数据不变</td>
</tr>
<tr>
<td>docker rm</td>
<td>Exited（默认）</td>
<td>删除容器（进入删除态）</td>
<td>-f 强制删除运行中容器，-v 同时删除容器挂载的匿名卷</td>
</tr>
<tr>
<td>docker container prune</td>
<td>所有 Exited 容器</td>
<td>批量清理已停止容器</td>
<td>执行前会确认，-f 直接清理无需确认</td>
</tr>
</tbody>
</table>
<h3 id="_2-状态流转顺序" tabindex="-1"><a class="header-anchor" href="#_2-状态流转顺序"><span>2. 状态流转顺序</span></a></h3>
<p>​</p>
<p>![W_G6(SD5<a href="/blog/assets/posts/Docker%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E8%BF%9B%E7%A8%8B-2.png">XWN$7$CEUXFYIT_tmb.png</a></p>
<p>​</p>
<p>​</p>
<h2 id="oci" tabindex="-1"><a class="header-anchor" href="#oci"><span>OCI</span></a></h2>
<p><strong>OCI 的全称是 Open Container Initiative（开放容器倡议）</strong>，是由 Linux 基金会主导的一个开源项目，核心目标是<strong>制定容器技术的开放标准</strong>，避免容器生态碎片化。</p>
<h3 id="oci-的核心作用与内容" tabindex="-1"><a class="header-anchor" href="#oci-的核心作用与内容"><span>OCI 的核心作用与内容</span></a></h3>
<ol>
<li><strong>定义容器标准规范</strong>它制定了两个关键标准：</li>
</ol>
<ul>
<li><strong>镜像规范</strong>：统一容器镜像的格式、结构和分发方式，确保不同容器运行时（如 Docker、containerd）能兼容同一份镜像。</li>
<li><strong>运行时规范</strong>：定义容器的生命周期、隔离方式（如 Linux Namespace、Cgroups）等，保证容器在不同环境下的行为一致。</li>
</ul>
<ol start="2">
<li><strong>推动容器生态标准化</strong>早期 Docker 是容器技术的事实标准，但 OCI 的出现让容器技术脱离单一厂商绑定 —— 现在 Docker、Kubernetes 等主流工具都遵循 OCI 规范，实现了 “镜像跨运行时通用、容器跨平台一致”。</li>
</ol>
<h1 id="harbor使用" tabindex="-1"><a class="header-anchor" href="#harbor使用"><span>Harbor使用</span></a></h1>
<h3 id="harbor是什么" tabindex="-1"><a class="header-anchor" href="#harbor是什么"><span>Harbor是什么</span></a></h3>
<p>Harbor 是<strong>企业级容器镜像仓库系统</strong>，核心用于安全、高效地管理容器镜像（及 Helm Chart 等制品），解决 Docker 原生 Registry 功能不足的问题，是企业云原生环境的核心镜像管理工具：</p>
<ol>
<li><strong>安全管理</strong>：支持镜像漏洞扫描、数字签名，通过 RBAC 做权限控制，保障镜像安全合规；</li>
<li><strong>高效分发</strong>：可跨环境同步镜像、自动清理旧镜像，支持对接对象存储扩容；</li>
<li><strong>合规运维</strong>：记录操作审计日志，提供图形化界面简化管理；</li>
<li><strong>DevOps 集成</strong>：对接 CI/CD 工具，支持高可用部署，适配多团队、多集群场景。</li>
</ol>
<p>​</p>
<p>先下载一个Harbor，链接<a href="https://github.com/goharbor/harbor/releases/download/v2.14.2/harbor-offline-installer-v2.14.2.tgz" target="_blank" rel="noopener noreferrer">https://github.com/goharbor/harbor/releases/download/v2.14.2/harbor-offline-installer-v2.14.2.tgz</a></p>
<p>​</p>
<p>建一个harbor文件夹存放harbor压缩包</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>cd /</span></span>
<span class="line"><span>mkdir /harbor</span></span>
<span class="line"><span>cd /harbor</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解压harbor压缩包</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>tar xf harbor-offline-installer-v2.14.2.tgz</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>​</p>
<p>修改配置文件中的域名为你的主机ip</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>cd /harbor</span></span>
<span class="line"><span>cp harbor.yml.tmpl harbor.yml</span></span>
<span class="line"><span>vi harbor.yml										#修改配置文件</span></span>
<span class="line"><span>#修改hostname为你的主机ip</span></span>
<span class="line"><span>#hostname: 192.168.245.147</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p>
<p>Harbor 安装目录下执行的 <code v-pre>./install.sh</code> 。这是 Harbor 官方提供的<strong>一键安装 &amp; 启动脚本</strong></p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>./install.sh</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>​</p>
<p>查看是否运行成功</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>docker compose ps</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><figure><img src="/blog/assets/posts/Docker%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E8%BF%9B%E7%A8%8B-3.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<p>看到这样就是运行成功了</p>
<p>​</p>
<p>在浏览器中访问你的主机ip</p>
<p><a href="http://192.168.245.147/" target="_blank" rel="noopener noreferrer">http://192.168.245.147/</a></p>
<figure><img src="/blog/assets/posts/Docker%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E8%BF%9B%E7%A8%8B-4.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<p>登录，账号密码没有修改的话，默认是账号：admin，密码：Harbor12345</p>
<p>​</p>
<p>新建一个项目</p>
<figure><img src="/blog/assets/posts/Docker%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E8%BF%9B%E7%A8%8B-5.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<p>创建一个用户以后能用到</p>
<figure><img src="/blog/assets/posts/Docker%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E8%BF%9B%E7%A8%8B-6.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<p>回到虚拟机中，查看你的镜像</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>docker images</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><figure><img src="/blog/assets/posts/Docker%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E8%BF%9B%E7%A8%8B-7.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<p>可以看到你之前拉取的一些镜像</p>
<p>​</p>
<p>编辑Docker守护进程配置 （同一网段的其他虚拟机拉取镜像也需要添加守护进程）</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 1. 编辑Docker守护进程配置（若文件不存在则新建）</span></span>
<span class="line"><span>vi /etc/docker/daemon.json</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>添加内容</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>{</span></span>
<span class="line"><span>    "registry-mirrors": ["https://docker.xuanyuan.me","https://docker.1panel.live"],  // 可选，加速官方镜像</span></span>
<span class="line"><span>    "insecure-registries": ["http://192.168.245.147:80"]  // 核心：允许访问Harbor的HTTP仓库</span></span>
<span class="line"><span>}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同一网段的其他虚拟机拉取镜像也需要添加守护进程</p>
<p>​</p>
<p>修改配置后重新加载</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>systemctl daemon-reload</span></span>
<span class="line"><span>systemctl restart docker</span></span>
<span class="line"><span>#进入/harbor/harbor目录</span></span>
<span class="line"><span>cd /harbor/harbor</span></span>
<span class="line"><span>docker compose restart</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p>
<p>给本地镜像打标签（king是我之前新建的项目名）</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 给本地nginx:latest打Harbor标签</span></span>
<span class="line"><span>docker tag nginx:latest 192.168.245.147:80/king/nginx:latest</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 验证标签是否创建成功（能看到新标签的镜像即为成功）</span></span>
<span class="line"><span>docker images | grep 192.168.245.147:80/king/nginx</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p>
<p>推送镜像</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 执行推送命令</span></span>
<span class="line"><span>docker push 192.168.245.147:80/king/nginx:latest</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>注意事项</p>
<p>确保已登录 Harbor：若推送时提示<code v-pre>unauthorized</code>，先重新登录：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>docker login http://192.168.245.147:80</span></span>
<span class="line"><span># 输入admin + 你的密码（如Harbor12345）</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>登出</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>docker loginout http://192.168.245.147:80</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>同一网段的其他虚拟机访问我的仓库拉取镜像</p>
<p># 1. 编辑Docker守护进程配置（若文件不存在则新建） vi /etc/docker/daemon.json</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};