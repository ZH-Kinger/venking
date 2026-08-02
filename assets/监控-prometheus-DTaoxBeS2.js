import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E6%9D%82%E9%A1%B9%E7%AC%94%E8%AE%B0/docker/%E7%9B%91%E6%8E%A7-prometheus.html","title":"监控-prometheus","lang":"zh-CN","frontmatter":{"title":"监控-prometheus","icon":"note","date":"2026-07-23T00:00:00.000Z","category":["杂项笔记"],"description":"Prometheus 是一款开源的时序数据库监控告警系统，由 SoundCloud 开发并捐赠给 CNCF（云原生计算基金会），是云原生生态的核心监控组件，专为容器化、微服务架构设计，也适配传统物理机 / 虚拟机环境，目前是监控领域的事实标准之一。 ​ ​ Prometheus 核心组件 Prometheus 是一个生态体系，核心组件相互配合实现完整监...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"监控-prometheus\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/%E7%9B%91%E6%8E%A7-prometheus-1.svg\\",\\"https://venking.tech/blog/blog/assets/posts/%E7%9B%91%E6%8E%A7-prometheus-2.png\\",\\"https://venking.tech/blog/blog/assets/posts/%E7%9B%91%E6%8E%A7-prometheus-3.png\\",\\"https://venking.tech/blog/blog/assets/posts/%E7%9B%91%E6%8E%A7-prometheus-4.png\\",\\"https://venking.tech/blog/blog/assets/posts/%E7%9B%91%E6%8E%A7-prometheus-5.png\\",\\"https://venking.tech/blog/blog/assets/posts/%E7%9B%91%E6%8E%A7-prometheus-6.png\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E6%9D%82%E9%A1%B9%E7%AC%94%E8%AE%B0/docker/%E7%9B%91%E6%8E%A7-prometheus.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"监控-prometheus"}],["meta",{"property":"og:description","content":"Prometheus 是一款开源的时序数据库监控告警系统，由 SoundCloud 开发并捐赠给 CNCF（云原生计算基金会），是云原生生态的核心监控组件，专为容器化、微服务架构设计，也适配传统物理机 / 虚拟机环境，目前是监控领域的事实标准之一。 ​ ​ Prometheus 核心组件 Prometheus 是一个生态体系，核心组件相互配合实现完整监..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/%E7%9B%91%E6%8E%A7-prometheus-1.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":10.55,"words":3164},"filePathRelative":"posts/杂项笔记/docker/监控-prometheus.md","excerpt":"<p>Prometheus 是一款<strong>开源的时序数据库监控告警系统</strong>，由 SoundCloud 开发并捐赠给 CNCF（云原生计算基金会），是云原生生态的核心监控组件，专为容器化、微服务架构设计，也适配传统物理机 / 虚拟机环境，目前是监控领域的事实标准之一。</p>\\n<p>​</p>\\n<p>​</p>\\n<h3>Prometheus 核心组件</h3>\\n<p>Prometheus 是一个生态体系，核心组件相互配合实现完整监控能力，核心组件包括：</p>\\n<table>\\n<thead>\\n<tr>\\n<th><strong>组件</strong></th>\\n<th><strong>核心作用</strong></th>\\n</tr>\\n</thead>\\n<tbody>\\n<tr>\\n<td><strong>Prometheus Server</strong></td>\\n<td>核心组件，负责数据采集、存储、PromQL 查询、告警规则评估</td>\\n</tr>\\n<tr>\\n<td><strong>Alertmanager</strong></td>\\n<td>处理 Server 发送的告警，实现去重、分组、静默、路由至不同告警渠道</td>\\n</tr>\\n<tr>\\n<td><strong>PushGateway</strong></td>\\n<td>接收推送的指标数据，供 Server 拉取，适配短生命周期任务</td>\\n</tr>\\n<tr>\\n<td><strong>Exporters</strong></td>\\n<td>指标采集器，将第三方系统 / 组件的指标转换为 Prometheus 可识别的格式，暴露<code>/metrics</code>&lt;br&gt;接口（如 node_exporter 采集服务器指标、mysql_exporter 采集 MySQL 指标、cadvisor 采集容器指标）</td>\\n</tr>\\n<tr>\\n<td><strong>Grafana</strong></td>\\n<td>可视化面板（非 Prometheus 官方，但强绑定），通过 PromQL 从 Server 拉取数据，生成可视化图表、仪表盘</td>\\n</tr>\\n</tbody>\\n</table>","autoDesc":true}`),i={name:`监控-prometheus.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>Prometheus 是一款<strong>开源的时序数据库监控告警系统</strong>，由 SoundCloud 开发并捐赠给 CNCF（云原生计算基金会），是云原生生态的核心监控组件，专为容器化、微服务架构设计，也适配传统物理机 / 虚拟机环境，目前是监控领域的事实标准之一。</p>
<p>​</p>
<p>​</p>
<h3 id="prometheus-核心组件" tabindex="-1"><a class="header-anchor" href="#prometheus-核心组件"><span>Prometheus 核心组件</span></a></h3>
<p>Prometheus 是一个生态体系，核心组件相互配合实现完整监控能力，核心组件包括：</p>
<table>
<thead>
<tr>
<th><strong>组件</strong></th>
<th><strong>核心作用</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Prometheus Server</strong></td>
<td>核心组件，负责数据采集、存储、PromQL 查询、告警规则评估</td>
</tr>
<tr>
<td><strong>Alertmanager</strong></td>
<td>处理 Server 发送的告警，实现去重、分组、静默、路由至不同告警渠道</td>
</tr>
<tr>
<td><strong>PushGateway</strong></td>
<td>接收推送的指标数据，供 Server 拉取，适配短生命周期任务</td>
</tr>
<tr>
<td><strong>Exporters</strong></td>
<td>指标采集器，将第三方系统 / 组件的指标转换为 Prometheus 可识别的格式，暴露<code v-pre>/metrics</code>&lt;br&gt;接口（如 node_exporter 采集服务器指标、mysql_exporter 采集 MySQL 指标、cadvisor 采集容器指标）</td>
</tr>
<tr>
<td><strong>Grafana</strong></td>
<td>可视化面板（非 Prometheus 官方，但强绑定），通过 PromQL 从 Server 拉取数据，生成可视化图表、仪表盘</td>
</tr>
</tbody>
</table>
<p>为什么要进行监控，监控的意义？</p>
<p>提前发现问题，将问题消灭在萌芽阶段 --》防止重大事故的发生</p>
<p>​</p>
<p>监控什么东西？</p>
<p>容器的使用情况 --》消耗了多少cpu，内存，磁盘IO，网络IO的使用等情况 --》docker stats</p>
<p>运行容器的宿主机cpu，内存，磁盘IO，网络IO等情况 --&gt;得到数据</p>
<p>​</p>
<p>docker stats</p>
<p>top</p>
<p>free</p>
<p>​</p>
<p>BLock块 --》磁盘属于块设备，用来存储工具</p>
<p>​</p>
<p>监控工具</p>
<p><a href="https://prometheus.io/" target="_blank" rel="noopener noreferrer">https://prometheus.io/</a></p>
<p>​</p>
<p>grafana --&gt;根据prometheus提供的数据展示图形 --》出图工具</p>
<p>​</p>
<p>云原生 ：k8s，docker，containerd，Prometheus --go语言</p>
<p>​</p>
<p>Open source metrics and monitoring for your systems and services</p>
<p>​</p>
<p>metrics --指标</p>
<p>​</p>
<p>Prometheus 是一个开源工具</p>
<p>​</p>
<p>Prometheus架构</p>
<p>ssd （固态硬盘）</p>
<p>hdd （机械硬盘）</p>
<p>二者核心差异在于<strong>存储介质和工作原理</strong>，进而导致速度、稳定性、功耗等全维度表现不同，HDD 靠机械结构读写，SSD 为纯电子芯片式存储。</p>
<table>
<thead>
<tr>
<th><strong>对比维度</strong></th>
<th><strong>SSD（固态硬盘）</strong></th>
<th><strong>HDD（机械硬盘）</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>核心介质</td>
<td>闪存芯片（NAND）</td>
<td>磁性盘片 + 机械磁头</td>
</tr>
<tr>
<td>读写速度</td>
<td>极快（连续读写 GB/s 级，4K 随机读写毫秒级）</td>
<td>较慢（连续读写百 MB/s 级，4K 随机读写秒级）</td>
</tr>
<tr>
<td>物理特性</td>
<td>无机械部件，抗摔、抗震、无噪音</td>
<td>有机械转动 / 寻道，怕震动、有轻微噪音</td>
</tr>
<tr>
<td>功耗发热</td>
<td>功耗低、发热少</td>
<td>功耗较高、发热明显</td>
</tr>
<tr>
<td>容量 / 价格</td>
<td>同容量价格更高，大容价比低</td>
<td>容价比高，大容量（数 TB）更划算</td>
</tr>
<tr>
<td>使用寿命</td>
<td>有擦写次数限制（民用级完全够用，可写数百 TBW）</td>
<td>无擦写限制，机械故障为主要损耗原因</td>
</tr>
<tr>
<td>体积重量</td>
<td>体积小巧（可做 M.2/2.5 寸）、重量轻</td>
<td>2.5/3.5 寸为主，重量更大</td>
</tr>
</tbody>
</table>
<p>Prometheus核心主件</p>
<p>1.Prometheus server： http server ，tsdb，retrieval</p>
<p>2.Prometheus targets：exporter ：安装在被监控的机器上的，是一个采集数据的程序</p>
<p>木马，间谍</p>
<p>mysqld_exporter : 获取mysqld数据库的信息</p>
<p>node_exporter : 获取服务器节点的cpu，内存，磁盘IO，网络IO的数据</p>
<p>3.数据可视化 ： Prometheus web UI ，grafana</p>
<p>user interface 用户接口</p>
<p>4.告警 ： altermanager 通知用户，根据某个指标的阈值，发通知告诉运维人员</p>
<p>​</p>
<p>5.pushgateway ：中间件，替其他的短作业的程序保留数据，Prometheus server到pushgateway里获取数据--》中间存放数据的软件</p>
<p>​</p>
<figure><img src="/blog/assets/posts/%E7%9B%91%E6%8E%A7-prometheus-1.svg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="prometheus部署-docker" tabindex="-1"><a class="header-anchor" href="#prometheus部署-docker"><span>Prometheus部署（docker）</span></a></h2>
<h3 id="一、软件的下载" tabindex="-1"><a class="header-anchor" href="#一、软件的下载"><span>一、软件的下载</span></a></h3>
<h4 id="拉取docker镜像" tabindex="-1"><a class="header-anchor" href="#拉取docker镜像"><span>拉取docker镜像</span></a></h4>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 使用你环境里看起来能用的加速器拉取</span></span>
<span class="line"><span>docker pull swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/prom/prometheus:latest</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 拉取成功后，为了方便使用，给它打个短标签</span></span>
<span class="line"><span>docker tag swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/prom/prometheus:latest prom/prometheus:latest</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="启动prom" tabindex="-1"><a class="header-anchor" href="#启动prom"><span>启动prom</span></a></h4>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>docker  run -d   -p9090:9090  --name prom-1  prom/prometheus</span></span>
<span class="line"><span>docker ps</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p>
<p>在浏览器上访问localhost：9090（<a href="http://192.168.245.147:9090/" target="_blank" rel="noopener noreferrer">http://192.168.245.147:9090/</a>）</p>
<figure><img src="/blog/assets/posts/%E7%9B%91%E6%8E%A7-prometheus-2.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<p>​</p>
<p>然后就可以开始查看数据了</p>
<p>​</p>
<h4 id="访问之后他就会创建一个主配置文件放在prom-1-etc-prometheus-prometheus-yml" tabindex="-1"><a class="header-anchor" href="#访问之后他就会创建一个主配置文件放在prom-1-etc-prometheus-prometheus-yml"><span>访问之后他就会创建一个主配置文件放在prom-1:/etc/prometheus/prometheus.yml</span></a></h4>
<table>
<thead>
<tr>
<th><strong>组成部分</strong></th>
<th><strong>含义</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>docker cp</code></td>
<td>Docker 的复制命令（Copy）。</td>
</tr>
<tr>
<td><code v-pre>prom-1</code></td>
<td><strong>源容器的名字</strong>。这说明你有一个叫 <code v-pre>sc-prom-1</code>&lt;br&gt;的容器（通常是 Prometheus）。</td>
</tr>
<tr>
<td><code v-pre>:/etc/prometheus/prometheus.yml</code></td>
<td><strong>容器内部的绝对路径</strong>。这是 Prometheus 在容器里存放主配置文件的默认位置。</td>
</tr>
<tr>
<td><code v-pre>.</code></td>
<td><strong>目的地</strong>。在 Linux 中，点号 <code v-pre>.</code>&lt;br&gt;代表 <strong>当前目录</strong>（即你现在输入命令时所在的文件夹）。</td>
</tr>
</tbody>
</table>
<h3 id="将prometheus的主配置文件prometheus-yml复制出来-方便修改-持久化-挂载和备份" tabindex="-1"><a class="header-anchor" href="#将prometheus的主配置文件prometheus-yml复制出来-方便修改-持久化-挂载和备份"><span>将prometheus的主配置文件prometheus.yml复制出来（方便修改，持久化，挂载和备份）</span></a></h3>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>docker cp sc-prom-1:/etc/prometheus/prometheus.yml  .</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>​</p>
<h3 id="为什么要将这个文件复制出来" tabindex="-1"><a class="header-anchor" href="#为什么要将这个文件复制出来"><span>为什么要将这个文件复制出来？</span></a></h3>
<p>简单来说，将文件从容器中 <code v-pre>docker cp</code> 出来，主要就是为了 <strong>“好改、好存、好控制”</strong>。</p>
<p><strong>1. 修改方便（容器里没工具）</strong></p>
<p>容器通常是精简版的 Linux，没有 <code v-pre>vim</code> 或 <code v-pre>nano</code> 等编辑器。把文件拷贝到宿主机，你可以用任何你喜欢的工具（甚至可以在 Windows 上用 VS Code）修改后再放回去。</p>
<p><strong>2. 配置持久化（防止丢失）</strong></p>
<p>容器是易失性的。如果你直接在容器里改配置文件，一旦容器被删除（<code v-pre>docker rm</code>），你的修改就全没了。拷贝到宿主机意味着文件真正保存在了硬盘上。</p>
<p><strong>3. 实现挂载（Volume Mapping）</strong></p>
<p>这是最高级的设计：先把默认配置拷出来，然后在启动容器时通过 <code v-pre>-v</code> 参数建立 <strong>“映射”</strong>。</p>
<ul>
<li>这样你修改宿主机的这个文件，容器内部会<strong>实时同步</strong>。</li>
<li>以后升级容器版本，只需挂载这个文件，配置依然有效。</li>
</ul>
<p><strong>4. 备份与安全</strong></p>
<p>在宿主机上，你可以轻松地给文件重命名备份（如 <code v-pre>cp prometheus.yml prometheus.yml.bak</code>），或者在操作失误时快速恢复。</p>
<p>​</p>
<p>​</p>
<h4 id="同步时间-如果时间不对" tabindex="-1"><a class="header-anchor" href="#同步时间-如果时间不对"><span>同步时间，如果时间不对</span></a></h4>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>timedatectl set-timezone Asia/Shanghai</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><figure><img src="/blog/assets/posts/%E7%9B%91%E6%8E%A7-prometheus-3.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<p>​</p>
<p>​</p>
<h3 id="为什么需要配置文件prometheus-yml" tabindex="-1"><a class="header-anchor" href="#为什么需要配置文件prometheus-yml"><span>为什么需要配置文件prometheus.yml？</span></a></h3>
<p><strong>我们需要修改主配置文件，添加需要监控的主机？</strong></p>
<h3 id="安装cadvisor" tabindex="-1"><a class="header-anchor" href="#安装cadvisor"><span>安装cAdvisor</span></a></h3>
<p>在 Prometheus 监控体系中，<strong>cAdvisor</strong> 扮演的是“数据生产者”（Exporter）的角色，专门负责向 Prometheus 提供容器层面的监控指标。</p>
<h4 id="拉取cadvisor镜像-下载最新版本最新版本与老版本api不一致" tabindex="-1"><a class="header-anchor" href="#拉取cadvisor镜像-下载最新版本最新版本与老版本api不一致"><span>拉取cAdvisor镜像（下载最新版本最新版本与老版本api不一致）</span></a></h4>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>docker pull swr.cn-north-4.myhuaweicloud.com/ddn-k8s/ghcr.io/google/cadvisor:0.56.2</span></span>
<span class="line"><span>docker tag  swr.cn-north-4.myhuaweicloud.com/ddn-k8s/ghcr.io/google/cadvisor:0.56.2  ghcr.io/google/cadvisor:0.56.2</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p>
<h4 id="修改配置文件-添加cadvisor作为目标容器" tabindex="-1"><a class="header-anchor" href="#修改配置文件-添加cadvisor作为目标容器"><span>修改配置文件，添加cAdvisor作为目标容器</span></a></h4>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>vim /prom/prometheus.yml</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>修改为以下内容</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># my global config</span></span>
<span class="line"><span>global:</span></span>
<span class="line"><span>  scrape_interval: 15s # Set the scrape interval to every 15 seconds. Default is every 1 minute.</span></span>
<span class="line"><span>  evaluation_interval: 15s # Evaluate rules every 15 seconds. The default is every 1 minute.</span></span>
<span class="line"><span>  # scrape_timeout is set to the global default (10s).</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Alertmanager configuration</span></span>
<span class="line"><span>alerting:</span></span>
<span class="line"><span>  alertmanagers:</span></span>
<span class="line"><span>    - static_configs:</span></span>
<span class="line"><span>        - targets:</span></span>
<span class="line"><span>          # - alertmanager:9093</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Load rules once and periodically evaluate them according to the global 'evaluation_interval'.</span></span>
<span class="line"><span>rule_files:</span></span>
<span class="line"><span>  # - "first_rules.yml"</span></span>
<span class="line"><span>  # - "second_rules.yml"</span></span>
<span class="line"><span></span></span>
<span class="line"><span># A scrape configuration containing exactly one endpoint to scrape:</span></span>
<span class="line"><span># Here it's Prometheus itself.</span></span>
<span class="line"><span>scrape_configs:</span></span>
<span class="line"><span>  - job_name: "prometheus"</span></span>
<span class="line"><span>    static_configs:</span></span>
<span class="line"><span>      - targets: ["localhost:9090"]</span></span>
<span class="line"><span>        labels:</span></span>
<span class="line"><span>          app: "prometheus"</span></span>
<span class="line"><span>  - job_name: "cadvisor"</span></span>
<span class="line"><span>    scrape_interval: 5s</span></span>
<span class="line"><span>    static_configs:</span></span>
<span class="line"><span>      - targets: ["cadvisor:8080"]</span></span>
<span class="line"><span>        labels:</span></span>
<span class="line"><span>          app: "cadvisor"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p>
<h3 id="安装redis" tabindex="-1"><a class="header-anchor" href="#安装redis"><span>安装redis</span></a></h3>
<h4 id="拉取镜像" tabindex="-1"><a class="header-anchor" href="#拉取镜像"><span>拉取镜像</span></a></h4>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 从加速镜像站拉取</span></span>
<span class="line"><span>docker pull swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/library/redis:latest</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 打回原名方便后续使用</span></span>
<span class="line"><span>docker tag swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/library/redis:latest redis:latest</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="修改docker-compose-yml配置文件通过docker-compose启动prometheus-cadvisor-redis容器" tabindex="-1"><a class="header-anchor" href="#修改docker-compose-yml配置文件通过docker-compose启动prometheus-cadvisor-redis容器"><span>修改docker compose.yml配置文件通过docker compose启动Prometheus ，cadvisor ，redis容器</span></a></h4>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>cd /prom</span></span>
<span class="line"><span>vim docker-compose.yml</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p>
<p>添加内容</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>services:</span></span>
<span class="line"><span>  prometheus:</span></span>
<span class="line"><span>    image: prom/prometheus:latest</span></span>
<span class="line"><span>    container_name: prometheus</span></span>
<span class="line"><span>    ports:</span></span>
<span class="line"><span>      - 9090:9090</span></span>
<span class="line"><span>    volumes:</span></span>
<span class="line"><span>      - ./prometheus.yml:/etc/prometheus/prometheus.yml:ro</span></span>
<span class="line"><span>    depends_on:</span></span>
<span class="line"><span>      - cadvisor</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  cadvisor:</span></span>
<span class="line"><span>    # 替换为你刚下载的超新版本</span></span>
<span class="line"><span>    image: ghcr.io/google/cadvisor:0.56.2</span></span>
<span class="line"><span>    container_name: cadvisor</span></span>
<span class="line"><span>    privileged: true </span></span>
<span class="line"><span>    ports:</span></span>
<span class="line"><span>      - 8080:8080</span></span>
<span class="line"><span>    volumes:</span></span>
<span class="line"><span>      - /:/rootfs:ro</span></span>
<span class="line"><span>      - /var/run:/var/run:rw</span></span>
<span class="line"><span>      - /sys:/sys:ro</span></span>
<span class="line"><span>      - /var/lib/docker/:/var/lib/docker:ro</span></span>
<span class="line"><span>      - /dev/disk/:/dev/disk:ro</span></span>
<span class="line"><span>      - /var/run/docker.sock:/var/run/docker.sock:ro</span></span>
<span class="line"><span>      # --- 针对新版 Linux (Cgroup v2) 的关键挂载，必须加上 ---</span></span>
<span class="line"><span>      - /sys/fs/cgroup:/sys/fs/cgroup:ro</span></span>
<span class="line"><span>    environment:</span></span>
<span class="line"><span>      - DOCKER_API_VERSION=1.44</span></span>
<span class="line"><span>    command:</span></span>
<span class="line"><span>      - "--docker_only=true"</span></span>
<span class="line"><span>      - "--housekeeping_interval=10s"</span></span>
<span class="line"><span>    depends_on:</span></span>
<span class="line"><span>      - redis</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  redis:</span></span>
<span class="line"><span>    image: redis:latest</span></span>
<span class="line"><span>    container_name: redis</span></span>
<span class="line"><span>    ports:</span></span>
<span class="line"><span>      - 6379:6379</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="使用docker-compose启动这些容器" tabindex="-1"><a class="header-anchor" href="#使用docker-compose启动这些容器"><span>使用docker compose启动这些容器</span></a></h4>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>cd /prom	#进入prom配置文件的文件夹，确保使用这个配置文件</span></span>
<span class="line"><span>docker compose up -d			#创建容器并启动</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="访问宿主机的端口查看效果" tabindex="-1"><a class="header-anchor" href="#访问宿主机的端口查看效果"><span>访问宿主机的端口查看效果</span></a></h3>
<p>Prometheus</p>
<p><a href="http://192.168.245.147:9090/" target="_blank" rel="noopener noreferrer">http://192.168.245.147:9090</a></p>
<p>cAdvisor</p>
<p><a href="http://192.168.245.147:8080/" target="_blank" rel="noopener noreferrer">http://192.168.245.147:8080</a></p>
<p>Grafana</p>
<p><a href="http://192.168.245.147:3000/" target="_blank" rel="noopener noreferrer">http://192.168.245.147:3000</a></p>
<h3 id="安装grafana出图工具" tabindex="-1"><a class="header-anchor" href="#安装grafana出图工具"><span>安装grafana出图工具</span></a></h3>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 拉取镜像</span></span>
<span class="line"><span>docker pull swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/grafana/grafana:latest</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 打回原名</span></span>
<span class="line"><span>docker tag swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/grafana/grafana:latest grafana/grafana:latest</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="启动容器" tabindex="-1"><a class="header-anchor" href="#启动容器"><span>启动容器</span></a></h4>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>docker run -d --name=grafana -p 3000:3000 grafana/grafana:latest</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h4 id="在grafana的web-ui中添加数据源为prometheus-点击connection搜索prometheus" tabindex="-1"><a class="header-anchor" href="#在grafana的web-ui中添加数据源为prometheus-点击connection搜索prometheus"><span>在grafana的web UI中添加数据源为Prometheus（点击connection搜索Prometheus）</span></a></h4>
<figure><img src="/blog/assets/posts/%E7%9B%91%E6%8E%A7-prometheus-4.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<p>通过web方式登录</p>
<p><a href="http://192.168.100.128:3000" target="_blank" rel="noopener noreferrer">http://192.168.100.128:3000</a></p>
<p>​</p>
<h4 id="默认的用户名和密码都是" tabindex="-1"><a class="header-anchor" href="#默认的用户名和密码都是"><span>默认的用户名和密码都是</span></a></h4>
<p>admin</p>
<p>admin</p>
<p>​</p>
<h4 id="创建新的仪表盘" tabindex="-1"><a class="header-anchor" href="#创建新的仪表盘"><span>创建新的仪表盘</span></a></h4>
<p>添加模板可视化分析不同来源的数据 ---官方模板网站（ <a href="https://grafana.com/grafana/dashboards/" target="_blank" rel="noopener noreferrer">https://grafana.com/grafana/dashboards/</a>）</p>
<figure><img src="/blog/assets/posts/%E7%9B%91%E6%8E%A7-prometheus-5.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<figure><img src="/blog/assets/posts/%E7%9B%91%E6%8E%A7-prometheus-6.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2>
<p>容器的监控</p>
<p>1.cadvisor --》数据采集容器（工具）</p>
<p>2.Prometheus --》数据存储软件（时序数据库）</p>
<p>3.grafana --》出图工具--》模板（定义好了很多的监控指标，不需要自己去画图）</p>
<p>​</p>
<p>cadvisor --》Prometheus--》grafana--》出图模版</p>
<h2 id="部署node-exporter监控主机" tabindex="-1"><a class="header-anchor" href="#部署node-exporter监控主机"><span>部署node_exporter监控主机</span></a></h2>
<h3 id="方案一-二进制部署-推荐-作为-systemd-服务" tabindex="-1"><a class="header-anchor" href="#方案一-二进制部署-推荐-作为-systemd-服务"><span>方案一：二进制部署（推荐，作为 Systemd 服务）</span></a></h3>
<p>这是最稳妥的生产环境部署方式，能确保服务器重启后自动运行。</p>
<h4 id="_1-下载并解压" tabindex="-1"><a class="header-anchor" href="#_1-下载并解压"><span>1. 下载并解压</span></a></h4>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>cd /usr/local/src</span></span>
<span class="line"><span># 下载（如果 GitHub 慢，可以使用 ghproxy 等代理）</span></span>
<span class="line"><span>wget https://github.com/prometheus/node_exporter/releases/download/v1.8.2/node_exporter-1.8.2.linux-amd64.tar.gz</span></span>
<span class="line"><span>tar -xvf node_exporter-1.8.2.linux-amd64.tar.gz</span></span>
<span class="line"><span>mv node_exporter-1.8.2.linux-amd64/node_exporter /usr/local/bin/</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-创建-systemd-服务文件" tabindex="-1"><a class="header-anchor" href="#_2-创建-systemd-服务文件"><span>2. 创建 Systemd 服务文件</span></a></h4>
<p>为了让它像 Nginx 一样后台运行，我们需要创建一个服务配置文件：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>vim /etc/systemd/system/node_exporter.service</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>写入以下内容：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>[Unit]</span></span>
<span class="line"><span>Description=Node Exporter</span></span>
<span class="line"><span>Wants=network-online.target</span></span>
<span class="line"><span>After=network-online.target</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[Service]</span></span>
<span class="line"><span>User=root</span></span>
<span class="line"><span>ExecStart=/usr/local/bin/node_exporter</span></span>
<span class="line"><span>Restart=always</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[Install]</span></span>
<span class="line"><span>WantedBy=multi-user.target</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-启动并设置开机自启" tabindex="-1"><a class="header-anchor" href="#_3-启动并设置开机自启"><span>3. 启动并设置开机自启</span></a></h4>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>systemctl daemon-reload</span></span>
<span class="line"><span>systemctl start node_exporter</span></span>
<span class="line"><span>systemctl enable node_exporter</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h3 id="方案二-docker-compose-部署" tabindex="-1"><a class="header-anchor" href="#方案二-docker-compose-部署"><span>方案二：Docker Compose 部署</span></a></h3>
<p>如果你希望所有监控组件都在 Compose 里统一管理，可以把以下内容加入你的 <code v-pre>docker-compose.yml</code>。</p>
<p><strong>注意：</strong> 必须挂载宿主机的根目录，并使用 <code v-pre>host</code> 网络模式，否则它只能监控到容器内部的一点点数据。</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>services:</span></span>
<span class="line"><span>  node-exporter:</span></span>
<span class="line"><span>    image: prom/node-exporter:latest</span></span>
<span class="line"><span>    container_name: node-exporter</span></span>
<span class="line"><span>    restart: unless-stopped</span></span>
<span class="line"><span>    network_mode: "host"</span></span>
<span class="line"><span>    pid: "host"</span></span>
<span class="line"><span>    volumes:</span></span>
<span class="line"><span>      - /:/host:ro,rslave</span></span>
<span class="line"><span>    command:</span></span>
<span class="line"><span>      - '--path.rootfs=/host'</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h3 id="方案三-prometheus-侧的配置-最后一步" tabindex="-1"><a class="header-anchor" href="#方案三-prometheus-侧的配置-最后一步"><span>方案三：Prometheus 侧的配置（最后一步）</span></a></h3>
<p>部署完 <code v-pre>node_exporter</code> 之后，Prometheus 还没法自动看到它。你得修改你之前 <code v-pre>docker cp</code> 出来的 <code v-pre>prometheus.yml</code> 文件：</p>
<p><strong>编辑配置</strong>：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>scrape_configs:</span></span>
<span class="line"><span>  - job_name: 'node'</span></span>
<span class="line"><span>    static_configs:</span></span>
<span class="line"><span>      - targets: ['192.168.245.129:9100'] # 填入部署了 node_exporter 的服务器 IP</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>让配置生效</strong>： 如果你是用 Docker 跑的 Prometheus，记得把改好的文件 <code v-pre>cp</code> 回去并重启：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>docker cp prometheus.yml sc-prom-1:/etc/prometheus/prometheus.yml</span></span>
<span class="line"><span>docker restart sc-prom-1</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="设置开机自启动的几种方法" tabindex="-1"><a class="header-anchor" href="#设置开机自启动的几种方法"><span>设置开机自启动的几种方法</span></a></h2>
<h3 id="方法一-systemd-服务-centos-7-8-9-官方标准" tabindex="-1"><a class="header-anchor" href="#方法一-systemd-服务-centos-7-8-9-官方标准"><span>方法一：systemd 服务（CentOS 7/8/9 官方标准）</span></a></h3>
<p>这是最专业、最推荐的方式，适合长期运行的后台任务。</p>
<p><strong>创建服务文件：</strong></p>
<ol>
<li>​</li>
</ol>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>vi /etc/systemd/system/my_app.service</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><strong>写入配置：</strong></p>
<ol start="2">
<li>​</li>
</ol>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>[Unit]</span></span>
<span class="line"><span>Description=CentOS 自启动示例</span></span>
<span class="line"><span>After=network.target</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[Service]</span></span>
<span class="line"><span>Type=simple</span></span>
<span class="line"><span># 执行脚本的路径</span></span>
<span class="line"><span>ExecStart=/bin/bash /root/scripts/start.sh</span></span>
<span class="line"><span># 挂了自动重启</span></span>
<span class="line"><span>Restart=always</span></span>
<span class="line"><span>User=root</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[Install]</span></span>
<span class="line"><span>WantedBy=multi-user.target</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>激活并启动：</strong></p>
<ol start="3">
<li>​</li>
</ol>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>systemctl daemon-reload</span></span>
<span class="line"><span>systemctl enable my_app    # 设置开机自启</span></span>
<span class="line"><span>systemctl start my_app     # 立即启动</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h3 id="方法二-crontab-reboot-最省事" tabindex="-1"><a class="header-anchor" href="#方法二-crontab-reboot-最省事"><span>方法二：Crontab <code v-pre>@reboot</code>（最省事）</span></a></h3>
<p>CentOS 默认通常都安装并启用了 <code v-pre>crond</code> 服务，这种方法非常适合不需要复杂管理的个人脚本。</p>
<p><strong>编辑定时任务：</strong></p>
<ol>
<li>​</li>
</ol>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>crontab -e</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><strong>添加一行代码：</strong></p>
<ol start="2">
<li>​</li>
</ol>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>@reboot /bin/bash /root/scripts/start.sh > /root/scripts/cron_log.txt 2>&#x26;1</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ol start="3">
<li><strong>保存退出：</strong> 在 <code v-pre>vi</code> 中按 <code v-pre>Esc</code> 后输入 <code v-pre>:wq</code> 即可。</li>
</ol>
<hr>
<h3 id="方法三-etc-rc-d-rc-local-centos-特色坑" tabindex="-1"><a class="header-anchor" href="#方法三-etc-rc-d-rc-local-centos-特色坑"><span>方法三：/etc/rc.d/rc.local（CentOS 特色坑）</span></a></h3>
<p>在 CentOS 中，<code v-pre>/etc/rc.local</code> 其实是 <code v-pre>/etc/rc.d/rc.local</code> 的软链接。<strong>重点是：CentOS 为了安全，默认禁止了该文件的执行权限，你必须手动开启。</strong></p>
<p><strong>编辑文件：</strong></p>
<ol>
<li>​</li>
</ol>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>vi /etc/rc.d/rc.local</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><strong>在文件末尾加入你的命令（确保在</strong> <code v-pre>**exit 0**</code> <strong>之前）：</strong></p>
<ol start="2">
<li>​</li>
</ol>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>/root/scripts/start.sh &#x26;</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><strong>手动授予执行权限（最关键的一步）：</strong></p>
<ol start="3">
<li>​</li>
</ol>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>chmod +x /etc/rc.d/rc.local</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><em>如果不执行这一步，CentOS 启动时会直接跳过这个文件。</em></p>
<p><em>​</em></p>
<h3 id="软连接是什么" tabindex="-1"><a class="header-anchor" href="#软连接是什么"><span>软连接是什么</span></a></h3>
<p>简单来说，<strong>软链接</strong>（Soft Link，也叫 Symbolic Link 或 Symlink）就像是 Windows 系统里的**“快捷方式”**。</p>
<p>它本身是一个独立的文件，但它的内容并不包含实际的数据，而是包含<strong>指向另一个文件或目录的“路径”</strong>。</p>
<hr>
<h3 id="_1-它是如何工作的" tabindex="-1"><a class="header-anchor" href="#_1-它是如何工作的"><span>1. 它是如何工作的？</span></a></h3>
<p>当你打开一个软链接时，Linux 系统会看到这个文件是一个链接，然后自动“跳转”到它指向的目标文件。</p>
<ul>
<li><strong>本质：</strong> 一个特殊的文件，存储的是目标文件的<strong>路径名</strong>。</li>
<li><strong>灵活性：</strong> 软链接可以跨越不同的磁盘分区（文件系统），甚至可以指向一个目录。</li>
<li><strong>后果：</strong> 如果你删除了<strong>原始文件</strong>，软链接就会失效，变成一个“死链接”（也叫断链，通常在终端里会显示为红色闪烁）。但如果你删除<strong>软链接本身</strong>，原始文件毫发无损。</li>
</ul>
<p>​</p>
<p>​</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};