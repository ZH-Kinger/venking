import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E4%BA%91%E5%8E%9F%E7%94%9F/docker/K8s/K8s.html","title":"K8s","lang":"zh-CN","frontmatter":{"title":"K8s","icon":"cloud","date":"2026-07-23T00:00:00.000Z","category":["云原生"],"description":"简单来说，Kubernetes（通常简称为 K8s，因为 K 和 s 之间有 8 个字母）是一个开源的容器编排平台。 如果把 Docker 容器比作一只只“运货的集装箱”，那么 K8s 就是那台巨大的“自动化起重机”和“港口调度系统”。 部署Kubernetes+docker 1. 为什么需要 K8s？ 在只有几个容器时，手动管理很简单。但当你有成百上...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"K8s\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/K8s-1.png\\",\\"https://venking.tech/blog/blog/assets/posts/K8s-2.png\\",\\"https://venking.tech/blog/blog/assets/posts/K8s-3.png\\",\\"https://venking.tech/blog/blog/assets/posts/K8s-4.png\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E4%BA%91%E5%8E%9F%E7%94%9F/docker/K8s/K8s.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"K8s"}],["meta",{"property":"og:description","content":"简单来说，Kubernetes（通常简称为 K8s，因为 K 和 s 之间有 8 个字母）是一个开源的容器编排平台。 如果把 Docker 容器比作一只只“运货的集装箱”，那么 K8s 就是那台巨大的“自动化起重机”和“港口调度系统”。 部署Kubernetes+docker 1. 为什么需要 K8s？ 在只有几个容器时，手动管理很简单。但当你有成百上..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/K8s-1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":24.89,"words":7468},"filePathRelative":"posts/云原生/docker/K8s/K8s.md","excerpt":"<p>简单来说，<strong>Kubernetes</strong>（通常简称为 <strong>K8s</strong>，因为 K 和 s 之间有 8 个字母）是一个开源的<strong>容器编排平台</strong>。</p>\\n<p>如果把 Docker 容器比作一只只“运货的集装箱”，那么 K8s 就是那台巨大的“自动化起重机”和“港口调度系统”。</p>\\n<hr>\\n<h1>部署Kubernetes+docker</h1>\\n<h2>1. 为什么需要 K8s？</h2>\\n<p>在只有几个容器时，手动管理很简单。但当你有成百上千个容器在几十台服务器上运行，且需要处理升级、扩容、宕机恢复时，靠人工是不可能的。K8s 解决了以下痛点：</p>","autoDesc":true}`),i={name:`K8s.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>简单来说，<strong>Kubernetes</strong>（通常简称为 <strong>K8s</strong>，因为 K 和 s 之间有 8 个字母）是一个开源的<strong>容器编排平台</strong>。</p>
<p>如果把 Docker 容器比作一只只“运货的集装箱”，那么 K8s 就是那台巨大的“自动化起重机”和“港口调度系统”。</p>
<hr>
<h1 id="部署kubernetes-docker" tabindex="-1"><a class="header-anchor" href="#部署kubernetes-docker"><span>部署Kubernetes+docker</span></a></h1>
<h2 id="_1-为什么需要-k8s" tabindex="-1"><a class="header-anchor" href="#_1-为什么需要-k8s"><span>1. 为什么需要 K8s？</span></a></h2>
<p>在只有几个容器时，手动管理很简单。但当你有成百上千个容器在几十台服务器上运行，且需要处理升级、扩容、宕机恢复时，靠人工是不可能的。K8s 解决了以下痛点：</p>
<ul>
<li><strong>自动化部署与回滚</strong>：你只需要告诉 K8s “我要运行 5 个版本的 A 应用”，它会自动帮你部署。如果更新出错了，它能一键退回。</li>
<li><strong>自我修复 (Self-healing)</strong>：如果某个容器挂了，K8s 会立即发现并重启一个新的；如果某台服务器坏了，它会把上面的容器搬到其他健康的机器上。</li>
<li><strong>水平伸缩 (Scaling)</strong>：根据流量大小，自动增加或减少容器的数量。</li>
<li><strong>负载均衡</strong>：它会自动给一组容器分配统一的 IP 和域名，并平衡进入的流量。</li>
</ul>
<p>​</p>
<p>k8s本质上就是一个管理容器的软件</p>
<p>​</p>
<figure><img src="/blog/assets/posts/K8s-1.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h3 id="k8s里有非常经典的3大接口" tabindex="-1"><a class="header-anchor" href="#k8s里有非常经典的3大接口"><span>k8s里有非常经典的3大接口</span></a></h3>
<table>
<thead>
<tr>
<th><strong>接口</strong></th>
<th><strong>负责什么</strong></th>
<th><strong>通俗理解</strong></th>
<th><strong>典型插件</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>CRI</strong> (运行时)</td>
<td><strong>怎么跑容器？</strong></td>
<td>就像电脑的<strong>CPU插槽</strong>，不论是 Intel 还是 AMD，只要接口对就能跑。</td>
<td>containerd, CRI-O</td>
</tr>
<tr>
<td><strong>CNI</strong> (网络)</td>
<td><strong>怎么通信？</strong></td>
<td>就像电脑的<strong>网卡驱动</strong>，决定了你是走拨号、光纤还是 5G。</td>
<td>Flannel, Calico</td>
</tr>
<tr>
<td><strong>CSI</strong> (存储)</td>
<td><strong>数据存哪？</strong></td>
<td>就像电脑的<strong>USB接口</strong>，你可以插 U 盘、移动硬盘或外接阵列。</td>
<td>Ceph, NFS, 云硬盘</td>
</tr>
</tbody>
</table>
<p>核心组件</p>
<h1 id="​" tabindex="-1"><a class="header-anchor" href="#​"><span>​</span></a></h1>
<p>kube-apiserver：</p>
<p>etcd：是一个数据库软件的名字 --》key：value --》go语言开发一致且高可用的键值存储，用作Kubernetes所有集群数据后台数据库。</p>
<p>scheduler：调度器 --》安排我们需要启动的pod到那个node上去运行，有哪些调度策略/方法</p>
<p>controller-manager 控制器管理员</p>
<p>​</p>
<h2 id="一些常用的kubernetes命令" tabindex="-1"><a class="header-anchor" href="#一些常用的kubernetes命令"><span>一些常用的kubernetes命令</span></a></h2>
<p>​</p>
<h2 id="虚拟机配置" tabindex="-1"><a class="header-anchor" href="#虚拟机配置"><span>虚拟机配置</span></a></h2>
<h3 id="为所有虚拟机器配置防火墙" tabindex="-1"><a class="header-anchor" href="#为所有虚拟机器配置防火墙"><span>为所有虚拟机器配置防火墙</span></a></h3>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>#禁用firewalld和selinux</span></span>
<span class="line"><span>systemctl stop firewalld</span></span>
<span class="line"><span>systemctl disable firewalld</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="关闭selinux和防火墙" tabindex="-1"><a class="header-anchor" href="#关闭selinux和防火墙"><span>关闭selinux和防火墙</span></a></h3>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>setenforce 0</span></span>
<span class="line"><span>sed -i '/^SELINUX=/ s/enforcing/disabled/' /etc/selinux/config</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="配置静态ip" tabindex="-1"><a class="header-anchor" href="#配置静态ip"><span>配置静态ip</span></a></h3>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>ip add										#先查看你的网卡信息</span></span>
<span class="line"><span>ip route									#查看你的网关</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>nmcli con mod "ens160" \\						#填你的网卡名</span></span>
<span class="line"><span>ipv4.method manual \\								#修改为手动模式</span></span>
<span class="line"><span>ipv4.addresses "192.168.1.8/24" \\		#修改为你预留的ip地址</span></span>
<span class="line"><span>ipv4.gateway "192.168.1.1" \\				#修改为你之前ip route看到的网关地址</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="添加ip映射-每个机器都需要脚本没有写" tabindex="-1"><a class="header-anchor" href="#添加ip映射-每个机器都需要脚本没有写"><span>添加ip映射（每个机器都需要脚本没有写）</span></a></h3>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>vi /etc/hosts</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>末尾添加以下内容</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>192.168.245.143 master-1</span></span>
<span class="line"><span>192.168.245.144 node-1</span></span>
<span class="line"><span>192.168.245.145 node-2</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p>
<h3 id="配置-docker-加速器-每个节点" tabindex="-1"><a class="header-anchor" href="#配置-docker-加速器-每个节点"><span>配置 Docker 加速器（每个节点）</span></a></h3>
<h3 id="_1-修改-创建-docker-配置文件" tabindex="-1"><a class="header-anchor" href="#_1-修改-创建-docker-配置文件"><span>1. 修改/创建 Docker 配置文件</span></a></h3>
<p>Docker 的官方配置文件位于 <code v-pre>/etc/docker/daemon.json</code>。如果该文件不存在，直接创建；如果已存在，则修改其内容。</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 1. 创建目录</span></span>
<span class="line"><span>sudo mkdir -p /etc/docker</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 2. 写入加速器配置</span></span>
<span class="line"><span>sudo tee /etc/docker/daemon.json &#x3C;&#x3C;EOF</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  "registry-mirrors": [</span></span>
<span class="line"><span>    "https://docker.m.daocloud.io",</span></span>
<span class="line"><span>    "https://hub-mirror.c.163.com",</span></span>
<span class="line"><span>    "https://mirror.baidubce.com",</span></span>
<span class="line"><span>    "https://docker.land007.top"</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>  "exec-opts": ["native.cgroupdriver=systemd"]</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>EOF</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意</strong>：<code v-pre>&quot;exec-opts&quot;: [&quot;native.cgroupdriver=systemd&quot;]</code> 是 Kubernetes 集群必需的配置，它能确保 Docker 和 Kubelet 使用相同的 Cgroup 驱动，防止集群崩溃。</p>
<hr>
<h4 id="_2-重启-docker-服务" tabindex="-1"><a class="header-anchor" href="#_2-重启-docker-服务"><span>2. 重启 Docker 服务</span></a></h4>
<p>配置写入后，必须重新加载配置并重启服务才能生效。</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 1. 重新加载系统配置</span></span>
<span class="line"><span>sudo systemctl daemon-reload</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 2. 重启 Docker</span></span>
<span class="line"><span>sudo systemctl restart docker</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h4 id="_3-验证是否配置成功" tabindex="-1"><a class="header-anchor" href="#_3-验证是否配置成功"><span>3. 验证是否配置成功</span></a></h4>
<p>执行以下命令，查看输出信息中的 <code v-pre>Registry Mirrors</code> 部分：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>docker info | grep -A 5 "Registry Mirrors"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><strong>预期输出：</strong></p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>Registry Mirrors:</span></span>
<span class="line"><span>  https://docker.m.daocloud.io/</span></span>
<span class="line"><span>  https://hub-mirror.c.163.com/</span></span>
<span class="line"><span>  https://mirror.baidubce.com/</span></span>
<span class="line"><span>  https://docker.land007.top/</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="机器初始化脚本-关闭selinux和防火墙-配置静态ip" tabindex="-1"><a class="header-anchor" href="#机器初始化脚本-关闭selinux和防火墙-配置静态ip"><span>机器初始化脚本（关闭selinux和防火墙，配置静态ip）</span></a></h3>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>#!/bin/bash</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 1. 修改主机名</span></span>
<span class="line"><span>read -p "请输入这台机器的主机名 (例如 node-1): " NEW_HOSTNAME</span></span>
<span class="line"><span>if [ -n "$NEW_HOSTNAME" ]; then</span></span>
<span class="line"><span>    hostnamectl set-hostname "$NEW_HOSTNAME"</span></span>
<span class="line"><span>    echo "主机名已修改为: $NEW_HOSTNAME"</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>    echo "未输入主机名，保持原样。"</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 2. 禁用防火墙和 SELinux</span></span>
<span class="line"><span>echo "--- 正在处理防火墙和 SELinux ---"</span></span>
<span class="line"><span>systemctl stop firewalld</span></span>
<span class="line"><span>systemctl disable firewalld</span></span>
<span class="line"><span>setenforce 0</span></span>
<span class="line"><span>sed -i '/^SELINUX=/ s/enforcing/disabled/' /etc/selinux/config</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 3. 自动检测网络环境</span></span>
<span class="line"><span>IFACE=$(ip -o link show | awk -F': ' '{print $2}' | grep -vE 'lo|docker|cni|veth|cali' | head -n 1)</span></span>
<span class="line"><span>GATEWAY=$(ip route | grep default | awk '{print $3}')</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 4. 交互式配置静态 IP</span></span>
<span class="line"><span>echo "检测到默认网卡: $IFACE"</span></span>
<span class="line"><span>read -p "请输入静态 IP (当前网关 $GATEWAY): " TARGET_IP</span></span>
<span class="line"><span>read -p "请输入掩码长度 (默认 24): " NETMASK</span></span>
<span class="line"><span>NETMASK=\${NETMASK:-24}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if [ -n "$TARGET_IP" ]; then</span></span>
<span class="line"><span>    nmcli con mod "$IFACE" \\</span></span>
<span class="line"><span>        ipv4.method manual \\</span></span>
<span class="line"><span>        ipv4.addresses "$TARGET_IP/$NETMASK" \\</span></span>
<span class="line"><span>        ipv4.gateway "$GATEWAY" \\</span></span>
<span class="line"><span>        ipv4.dns "114.114.114.114,8.8.8.8"</span></span>
<span class="line"><span>    nmcli con up "$IFACE"</span></span>
<span class="line"><span>    echo "静态 IP $TARGET_IP 配置成功！"</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>    echo "跳过 IP 配置。"</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 5. K8s 内核参数优化 (重要)</span></span>
<span class="line"><span>echo "--- 正在优化 K8s 内核参数 ---"</span></span>
<span class="line"><span>cat &#x3C;&#x3C;EOF > /etc/sysctl.d/k8s.conf</span></span>
<span class="line"><span>net.bridge.bridge-nf-call-iptables  = 1</span></span>
<span class="line"><span>net.bridge.bridge-nf-call-ip6tables = 1</span></span>
<span class="line"><span>net.ipv4.ip_forward                 = 1</span></span>
<span class="line"><span>EOF</span></span>
<span class="line"><span>sysctl --system</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo "------------------------------------------------"</span></span>
<span class="line"><span>echo "基础环境配置完成！"</span></span>
<span class="line"><span>echo "当前主机名: $(hostname)"</span></span>
<span class="line"><span>echo "当前 IP 地址: $(ip addr show $IFACE | grep 'inet ' | awk '{print $2}')"</span></span>
<span class="line"><span>echo "------------------------------------------------"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker安装" tabindex="-1"><a class="header-anchor" href="#docker安装"><span>docker安装</span></a></h2>
<h3 id="镜像下载docker" tabindex="-1"><a class="header-anchor" href="#镜像下载docker"><span>镜像下载docker</span></a></h3>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>#先安装一些docker的必要依赖</span></span>
<span class="line"><span>yum install -y yum-utils device-mapper-persistent-data lvm2  </span></span>
<span class="line"><span>#添加阿里云Docker源（国内下载快） </span></span>
<span class="line"><span>yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo  </span></span>
<span class="line"><span>#安装最新版Docker </span></span>
<span class="line"><span>yum install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="设置systemctl管理" tabindex="-1"><a class="header-anchor" href="#设置systemctl管理"><span>设置systemctl管理</span></a></h3>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>#启动并设置开机自启 </span></span>
<span class="line"><span>systemctl start docker&#x26;&#x26; systemctl enable docker</span></span>
<span class="line"><span>验证安装</span></span>
<span class="line"><span>#docker --version</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="/blog/assets/posts/K8s-2.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h2 id="cri-docker源码安装" tabindex="-1"><a class="header-anchor" href="#cri-docker源码安装"><span><strong>cri-docker源码安装</strong></span></a></h2>
<p>去官方网站获取压缩包<a href="https://github.com/Mirantis/cri-dockerd/releases" target="_blank" rel="noopener noreferrer">https://github.com/Mirantis/cri-dockerd/releases</a>，</p>
<p><a href="https://github.com/Mirantis/cri-dockerd/releases/download/v0.3.23/cri-dockerd-0.3.23.amd64.tgz" target="_blank" rel="noopener noreferrer">https://github.com/Mirantis/cri-dockerd/releases/download/v0.3.23/cri-dockerd-0.3.23.amd64.tgz</a></p>
<p>上传文件到虚拟机</p>
<h3 id="_1、准备二进制文件" tabindex="-1"><a class="header-anchor" href="#_1、准备二进制文件"><span>1、准备二进制文件</span></a></h3>
<p><strong>确保你的可执行文件位于正确路径，并拥有运行权限。</strong></p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 赋予执行权限</span></span>
<span class="line"><span>chmod +x /root/cri-dockerd/cri-dockerd</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h3 id="_2、创建-socket-文件" tabindex="-1"><a class="header-anchor" href="#_2、创建-socket-文件"><span>2、创建 Socket 文件</span></a></h3>
<p><strong>Socket 文件负责定义 Kubernetes 与 Docker 通信的端点。</strong></p>
<ul>
<li><strong>文件路径****：</strong><code v-pre>**/etc/systemd/system/cri-docker.socket**</code></li>
<li><strong>配置内容：</strong></li>
</ul>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>[Unit]</span></span>
<span class="line"><span>Description=Docker Systemd Container Runtime Interface Socket</span></span>
<span class="line"><span>PartOf=cri-docker.service</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[Socket]</span></span>
<span class="line"><span># Kubernetes 访问 Docker 的通信路径</span></span>
<span class="line"><span>ListenStream=/var/run/cri-dockerd.sock</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[Install]</span></span>
<span class="line"><span>WantedBy=sockets.target</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h3 id="_3、创建-service-服务文件" tabindex="-1"><a class="header-anchor" href="#_3、创建-service-服务文件"><span>3、创建 Service 服务文件</span></a></h3>
<p><strong>该文件定义了后台进程的启动参数和依赖关系。</strong></p>
<ul>
<li><strong>文件路径****：</strong><code v-pre>**/etc/systemd/system/cri-docker.service**</code></li>
<li><strong>配置内容：</strong></li>
</ul>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>[Unit]</span></span>
<span class="line"><span>Description=Docker Systemd Container Runtime Interface</span></span>
<span class="line"><span>After=network-online.target docker.service</span></span>
<span class="line"><span>Requires=cri-docker.socket</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[Service]</span></span>
<span class="line"><span>Type=notify</span></span>
<span class="line"><span># 重点：这里使用绝对路径指向你当前的位置</span></span>
<span class="line"><span>ExecStart=/root/cri-dockerd/cri-dockerd --container-runtime-endpoint fd:// --pod-infra-container-image=registry.aliyuncs.com/google_containers/pause:3.10</span></span>
<span class="line"><span># 如果程序需要读取当前目录下的配置文件，建议加上这一行</span></span>
<span class="line"><span>WorkingDirectory=/root/cri-dockerd/</span></span>
<span class="line"><span>ExecReload=/bin/kill -s HUP $MAINPID</span></span>
<span class="line"><span>TimeoutSec=0</span></span>
<span class="line"><span>RestartSec=2</span></span>
<span class="line"><span>Restart=always</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[Install]</span></span>
<span class="line"><span>WantedBy=multi-user.target</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h3 id="_4、启动并验证服务" tabindex="-1"><a class="header-anchor" href="#_4、启动并验证服务"><span>4、启动并验证服务</span></a></h3>
<p><strong>按照以下顺序执行命令以生效配置：</strong></p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 1. 重新加载 systemd 守护进程</span></span>
<span class="line"><span>systemctl daemon-reload</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 2. 启用并立即启动 Socket</span></span>
<span class="line"><span>systemctl enable --now cri-docker.socket</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 3. 启用并立即启动 Service</span></span>
<span class="line"><span>systemctl enable --now cri-docker.service</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 4. 检查运行状态</span></span>
<span class="line"><span>systemctl status cri-docker</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="cri-docker总结" tabindex="-1"><a class="header-anchor" href="#cri-docker总结"><span>cri-docker总结</span></a></h3>
<table>
<thead>
<tr>
<th><strong>检查点</strong></th>
<th><strong>描述</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>绝对路径</strong></td>
<td><code v-pre>ExecStart</code>&lt;br&gt;必须指向 <code v-pre>/root/cri-dockerd/cri-dockerd</code>&lt;br&gt;。</td>
</tr>
<tr>
<td><strong>依赖关系</strong></td>
<td><code v-pre>Service</code>&lt;br&gt;依赖于 <code v-pre>Socket</code>&lt;br&gt;，必须确保 Socket 先启动。</td>
</tr>
<tr>
<td><strong>权限</strong></td>
<td>二进制文件必须有 <code v-pre>+x</code>&lt;br&gt;权限，否则会报 <code v-pre>Permission denied</code>&lt;br&gt;。</td>
</tr>
</tbody>
</table>
<h2 id="kubernetes安装" tabindex="-1"><a class="header-anchor" href="#kubernetes安装"><span>Kubernetes安装</span></a></h2>
<h3 id="_1-配置-kubernetes-yum-源" tabindex="-1"><a class="header-anchor" href="#_1-配置-kubernetes-yum-源"><span><strong>1. 配置 Kubernetes Yum 源</strong></span></a></h3>
<p><strong>国内环境建议使用阿里云镜像源，速度最快：</strong></p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>cat &#x3C;&#x3C;EOF | tee /etc/yum.repos.d/kubernetes.repo</span></span>
<span class="line"><span>[kubernetes]</span></span>
<span class="line"><span>name=Kubernetes</span></span>
<span class="line"><span>baseurl=https://mirrors.aliyun.com/kubernetes-new/core/stable/v1.35/rpm/</span></span>
<span class="line"><span>enabled=1</span></span>
<span class="line"><span>gpgcheck=1</span></span>
<span class="line"><span>gpgkey=https://mirrors.aliyun.com/kubernetes-new/core/stable/v1.35/rpm/repodata/repomd.xml.key</span></span>
<span class="line"><span>EOF</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-安装-k8s-核心三件套" tabindex="-1"><a class="header-anchor" href="#_2-安装-k8s-核心三件套"><span><strong>2. 安装 K8s 核心三件套</strong></span></a></h3>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 安装最新版</span></span>
<span class="line"><span>yum install -y kubelet kubeadm kubectl</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 设置 kubelet 开机自启（现在还起不来，因为没初始化，但要设为 enable）</span></span>
<span class="line"><span>systemctl enable kubelet</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-初始化集群-最关键的一步" tabindex="-1"><a class="header-anchor" href="#_3-初始化集群-最关键的一步"><span><strong>3. 初始化集群（最关键的一步）</strong></span></a></h3>
<p><strong>这一步必须告诉</strong> <code v-pre>**kubeadm**</code> <strong>使用你刚才配置好的</strong> <code v-pre>**cri-dockerd**</code><strong>。</strong></p>
<p><strong>执行初始化命令：</strong></p>
<p><strong>Bash</strong></p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>kubeadm init \\</span></span>
<span class="line"><span>  --apiserver-advertise-address=$(hostname -I | awk '{print $1}') \\</span></span>
<span class="line"><span>  --image-repository registry.aliyuncs.com/google_containers \\</span></span>
<span class="line"><span>  --kubernetes-version v1.35.0 \\</span></span>
<span class="line"><span>  --cri-socket unix:///var/run/cri-dockerd.sock \\</span></span>
<span class="line"><span>  --pod-network-cidr=10.244.0.0/16</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>参数解释：</strong></p>
<ul>
<li><code v-pre>**--cri-socket**</code><strong>: 必须指向</strong> <code v-pre>**/var/run/cri-dockerd.sock**</code><strong>，否则它会去找默认的 containerd。</strong></li>
<li><code v-pre>**--image-repository**</code><strong>: 使用阿里云镜像源，避免被墙。</strong></li>
<li><code v-pre>**--pod-network-cidr**</code><strong>: 这是给 Flannel 等网络插件预留的地址段。</strong></li>
</ul>
<hr>
<h3 id="_4-必备的小工具-conntrack" tabindex="-1"><a class="header-anchor" href="#_4-必备的小工具-conntrack"><span><strong>4. 必备的小工具：conntrack</strong></span></a></h3>
<p><strong>还记得刚才</strong> <code v-pre>**cri-dockerd**</code> <strong>日志里的警告吗？在初始化前，最好把这个装上：</strong></p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>yum install -y conntrack-tools</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><hr>
<h2 id="关闭分区" tabindex="-1"><a class="header-anchor" href="#关闭分区"><span>关闭分区</span></a></h2>
<h3 id="_1-关闭-swap-内存交换分区" tabindex="-1"><a class="header-anchor" href="#_1-关闭-swap-内存交换分区"><span>1. 关闭 Swap（内存交换分区）</span></a></h3>
<p><strong>为什么要关？</strong> Kubernetes 的调度器（Scheduler）在分配资源时，是假设你的物理内存是“实打实”的。如果允许使用 Swap，当物理内存不足时，系统会把数据存到磁盘上，这会导致程序运行速度极度变慢，且会让 Kubelet 无法准确判断节点的压力情况。</p>
<p><strong>操作步骤：</strong></p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 临时关闭（立即生效，重启后失效）</span></span>
<span class="line"><span>swapoff -a</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 永久关闭（防止重启后又开了）</span></span>
<span class="line"><span># 使用 sed 命令直接注释掉 /etc/fstab 中包含 swap 的那一行</span></span>
<span class="line"><span>sed -i '/swap/s/^\\(.*\\)$/#\\1/g' /etc/fstab</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h3 id="_2-开启内核转发-ip-forwarding" tabindex="-1"><a class="header-anchor" href="#_2-开启内核转发-ip-forwarding"><span>2. 开启内核转发（IP Forwarding）</span></a></h3>
<p><strong>为什么要开？</strong> Kubernetes 本质上是一个复杂的虚拟网络。Pod 运行在不同的节点上，它们之间的通信需要通过 Linux 内核进行数据包的转发。如果不开启，你的 Pod 可能连外网都上不了，甚至 Node 之间都无法通信。</p>
<p><strong>操作步骤：</strong></p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 1. 创建转发配置文件</span></span>
<span class="line"><span>cat &#x3C;&#x3C;EOF | sudo tee /etc/sysctl.d/k8s.conf</span></span>
<span class="line"><span>net.bridge.bridge-nf-call-iptables  = 1</span></span>
<span class="line"><span>net.bridge.bridge-nf-call-ip6tables = 1</span></span>
<span class="line"><span>net.ipv4.ip_forward                 = 1</span></span>
<span class="line"><span>EOF</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 2. 立即应用配置</span></span>
<span class="line"><span>sysctl --system</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h3 id="_3-安装-conntrack" tabindex="-1"><a class="header-anchor" href="#_3-安装-conntrack"><span>3. 安装 conntrack</span></a></h3>
<p><strong>为什么要装？</strong><code v-pre>conntrack</code>（Connection Tracking）是 Linux 内核用于跟踪网络连接状态的工具。Kubernetes 的 Service（比如负载均衡）重度依赖 <code v-pre>iptables</code> 或 <code v-pre>IPVS</code> 规则，而这些规则需要 <code v-pre>conntrack</code> 来追踪数据包到底属于哪个连接。</p>
<p>如果你不装，你会发现 <code v-pre>cri-dockerd</code> 日志里一直在报错，且 K8s 的网络服务会变得极其不稳定。</p>
<p><strong>操作步骤：</strong></p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># CentOS / RHEL / AlmaLinux</span></span>
<span class="line"><span>yum install -y conntrack-tools</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Ubuntu / Debian</span></span>
<span class="line"><span># apt-get install -y conntrack</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h3 id="总结-如何验证" tabindex="-1"><a class="header-anchor" href="#总结-如何验证"><span>总结：如何验证？</span></a></h3>
<p>配置完这三项后，你的机器就从“普通服务器”变身为“准 K8s 节点”了。</p>
<ul>
<li><strong>验证 Swap</strong>：输入 <code v-pre>free -h</code>，看到 <code v-pre>Swap</code> 那一行显示为 <code v-pre>0B</code> 即可。</li>
<li><strong>验证转发</strong>：输入 <code v-pre>sysctl net.ipv4.ip_forward</code>，看到 <code v-pre>= 1</code> 即可。</li>
<li><strong>验证 conntrack</strong>：输入 <code v-pre>conntrack --version</code>，有输出版本号即可。</li>
</ul>
<p>​</p>
<p>​</p>
<p>​</p>
<p>​</p>
<p>​</p>
<p>​</p>
<p>​</p>
<h2 id="init集群初始化-仅在master节点执行" tabindex="-1"><a class="header-anchor" href="#init集群初始化-仅在master节点执行"><span>init集群初始化（仅在master节点执行）</span></a></h2>
<h3 id="初始化" tabindex="-1"><a class="header-anchor" href="#初始化"><span>初始化</span></a></h3>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>kubeadm init \\</span></span>
<span class="line"><span>  --apiserver-advertise-address=&#x3C;你master节点的ip> \\				</span></span>
<span class="line"><span>  --image-repository registry.aliyuncs.com/google_containers \\</span></span>
<span class="line"><span>  --kubernetes-version v1.35.0 \\</span></span>
<span class="line"><span>  --cri-socket unix:///var/run/cri-dockerd.sock \\</span></span>
<span class="line"><span>  --pod-network-cidr=192.168.0.0/16</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p>
<h3 id="成功执行后会得到" tabindex="-1"><a class="header-anchor" href="#成功执行后会得到"><span>成功执行后会得到</span></a></h3>
<figure><img src="/blog/assets/posts/K8s-3.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h3 id="记住你的token和256" tabindex="-1"><a class="header-anchor" href="#记住你的token和256"><span>记住你的token和256</span></a></h3>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>kubeadm join 192.168.245.143:6443 --token 2fbmo4.jolz018zlx9rmzd1 \\</span></span>
<span class="line"><span>	--discovery-token-ca-cert-hash sha256:b63a2cf1e05115f8260a81afc4198b98653ecf4e5f7dc60a539225afe0e2c3f0</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创建配置目录并给用户执行权限-在master节点上执行" tabindex="-1"><a class="header-anchor" href="#创建配置目录并给用户执行权限-在master节点上执行"><span>创建配置目录并给用户执行权限（在master节点上执行）</span></a></h3>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 创建配置目录</span></span>
<span class="line"><span>mkdir -p $HOME/.kube</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 拷贝集群管理配置文件到当前用户目录下</span></span>
<span class="line"><span>sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 赋予当前用户对配置文件的读写权限</span></span>
<span class="line"><span>sudo chown $(id -u):$(id -g) $HOME/.kube/config</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="将node节点加入集群" tabindex="-1"><a class="header-anchor" href="#将node节点加入集群"><span>将node节点加入集群</span></a></h3>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 在 Node 节点上运行（请替换为你自己的 token 和 hash）</span></span>
<span class="line"><span>kubeadm join 192.168.245.143:6443 --token 1q9lrd.wy04lh4odezywttl \\</span></span>
<span class="line"><span>    --discovery-token-ca-cert-hash sha256:b63a2cf1e05115f8260a81afc4198b98653ecf4e5f7dc60a539225afe0e2c3f0 \\</span></span>
<span class="line"><span>    --cri-socket unix:///var/run/cri-dockerd.sock</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="添加成功的标志" tabindex="-1"><a class="header-anchor" href="#添加成功的标志"><span>添加成功的标志</span></a></h3>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>kubectl get nodes						#查看节点信息</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>![9H\`(7PY5ELGQFW7I6RJ5<a href="/blog/assets/posts/K8s-4.png">SH.png</a></p>
<p>现在还是Notready的状态，需要配置网络插件</p>
<p>​</p>
<p>​</p>
<h3 id="在-worker-节点-k8s-node-2-上配置-kubectl-命令行工具的访问权限。" tabindex="-1"><a class="header-anchor" href="#在-worker-节点-k8s-node-2-上配置-kubectl-命令行工具的访问权限。"><span>在 Worker 节点（k8s-node-2）上配置 <code v-pre>kubectl</code> 命令行工具的访问权限。</span></a></h3>
<p>简单来说，你在把 Master 节点的“钥匙”复制到 Node 节点上，这样你在 Node 节点上也能直接运行 <code v-pre>kubectl get nodes</code> 等命令来管理集群了。</p>
<hr>
<h4 id="具体步骤解析" tabindex="-1"><a class="header-anchor" href="#具体步骤解析"><span>具体步骤解析：</span></a></h4>
<ol>
<li><strong>创建目录</strong>：<code v-pre>mkdir -p $HOME/.kube</code></li>
</ol>
<ul>
<li>在当前用户（root）家目录下创建一个隐藏文件夹 <code v-pre>.kube</code>，这是 <code v-pre>kubectl</code> 默认读取配置的地方。</li>
</ul>
<ol start="2">
<li><strong>远程拷贝配置文件 (scp)</strong>：<code v-pre>scp k8s-master-1:/etc/kubernetes/admin.conf /root/.kube/config</code></li>
</ol>
<ul>
<li>从主节点（k8s-master-1）把集群的<strong>最高权限配置文件</strong><code v-pre>admin.conf</code> 拷贝过来，并重命名为 <code v-pre>config</code>。</li>
<li><strong>核心原理</strong>：这个 <code v-pre>config</code> 文件包含了集群 API Server 的地址以及用于身份验证的证书。没有它，<code v-pre>kubectl</code> 就像没有账号密码的客户端，连不上集群。</li>
</ul>
<ol start="3">
<li><strong>修改权限 (chown)</strong>：<code v-pre>chown $(id -u):$(id -g) $HOME/.kube/config</code></li>
</ol>
<ul>
<li>将配置文件的所有者修改为当前用户和当前组。虽然你现在是用 root 操作，但这是一个标准的官方推荐动作，确保当前用户有权读写这个“钥匙”。</li>
</ul>
<hr>
<h4 id="这样做的目的是什么" tabindex="-1"><a class="header-anchor" href="#这样做的目的是什么"><span>这样做的目的是什么？</span></a></h4>
<p>通常情况下，只有 Master 节点能执行 <code v-pre>kubectl</code> 命令。你完成这些操作后，<strong>k8s-node-2</strong> 就变成了一个“管理终端”。</p>
<h2 id="安装calico网络插件" tabindex="-1"><a class="header-anchor" href="#安装calico网络插件"><span>安装Calico网络插件</span></a></h2>
<h3 id="_1-基础环境准备" tabindex="-1"><a class="header-anchor" href="#_1-基础环境准备"><span>1. 基础环境准备</span></a></h3>
<p>在应用 YAML 之前，所有节点（Master &amp; Nodes）必须确保：</p>
<ul>
<li><strong>禁用防火墙</strong>：<code v-pre>systemctl stop firewalld &amp;&amp; systemctl disable firewalld</code></li>
<li><strong>禁用 Swap</strong>：<code v-pre>swapoff -a</code></li>
<li><strong>内核转发</strong>：<code v-pre>net.bridge.bridge-nf-call-iptables</code> 设置为 1。</li>
</ul>
<p><strong>清理残留</strong>（如果曾安装过其他插件）：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>rm -rf /etc/cni/net.d/*</span></span>
<span class="line"><span>rm -rf /var/lib/calico</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h3 id="_2-下载-calico-的官方定义文件" tabindex="-1"><a class="header-anchor" href="#_2-下载-calico-的官方定义文件"><span>2. 下载 Calico 的官方定义文件</span></a></h3>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>curl -O https://raw.githubusercontent.com/projectcalico/calico/v3.25.0/manifests/calico.yaml</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>或者直接复制这个文件</p>
<blockquote>
<p><a href="https://www.yuque.com/attachments/yuque/0/2026/yaml/62301513/1770051399180-7fb1f41b-c40a-47b9-8fcc-991f11217d02.yaml" target="_blank" rel="noopener noreferrer">calico.yaml</a></p>
</blockquote>
<h3 id="_3-修改calico-yaml文件的下载源" tabindex="-1"><a class="header-anchor" href="#_3-修改calico-yaml文件的下载源"><span>3.修改calico.yaml文件的下载源</span></a></h3>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 1. 确保你在 calico.yaml 所在的目录</span></span>
<span class="line"><span># 2. 替换所有可能的镜像前缀（覆盖 docker.io, quay.io 以及你之前的阿里云错地址）</span></span>
<span class="line"><span>sed -i 's|docker.io/calico/|docker.m.daocloud.io/calico/|g' calico.yaml</span></span>
<span class="line"><span>sed -i 's|quay.io/calico/|docker.m.daocloud.io/calico/|g' calico.yaml</span></span>
<span class="line"><span>sed -i 's|registry.cn-hangzhou.aliyuncs.com/google_containers|docker.m.daocloud.io/calico|g' calico.yaml</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 3. 重新安装 Calico</span></span>
<span class="line"><span>kubectl apply -f calico.yaml</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、calico-配置与解决办法总结" tabindex="-1"><a class="header-anchor" href="#二、calico-配置与解决办法总结"><span>二、Calico 配置与解决办法总结</span></a></h2>
<h3 id="_1-镜像准备-手动-投喂-策略" tabindex="-1"><a class="header-anchor" href="#_1-镜像准备-手动-投喂-策略"><span>1. 镜像准备：手动“投喂”策略</span></a></h3>
<p>既然自动拉取不通，我们采用 <strong>“先拉取代理源、后伪装官方名”</strong> 的策略。</p>
<p><strong>在集群所有节点执行：</strong></p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 1. 定义需要拉取的镜像列表</span></span>
<span class="line"><span># cni, node, kube-controllers, pod2daemon-flexvol</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 2. 从国内代理源拉取 (以 v3.25.0 为例)</span></span>
<span class="line"><span>docker pull m.daocloud.io/docker.io/calico/node:v3.25.0</span></span>
<span class="line"><span>docker pull m.daocloud.io/docker.io/calico/cni:v3.25.0</span></span>
<span class="line"><span>docker pull m.daocloud.io/docker.io/calico/kube-controllers:v3.25.0</span></span>
<span class="line"><span>docker pull m.daocloud.io/docker.io/calico/pod2daemon-flexvol:v3.25.0</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 3. 核心步骤：根据 kubectl describe 看到的具体需求进行打标 (Tag)</span></span>
<span class="line"><span># 必须完全匹配 YAML 里的 image 字段</span></span>
<span class="line"><span>docker tag &#x3C;镜像ID> registry.cn-hangzhou.aliyuncs.com/google_containers/node:v3.25.0</span></span>
<span class="line"><span>docker tag &#x3C;镜像ID> registry.cn-hangzhou.aliyuncs.com/google_containers/cni:v3.25.0</span></span>
<span class="line"><span># ...以此类推</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-配置文件修正" tabindex="-1"><a class="header-anchor" href="#_2-配置文件修正"><span>2. 配置文件修正</span></a></h3>
<ul>
<li><strong>CIDR 匹配</strong>：确保 <code v-pre>calico.yaml</code> 中的 <code v-pre>CALICO_IPV4POOL_CIDR</code> 字段与 <code v-pre>kubeadm init</code> 时的 <code v-pre>--pod-network-cidr</code> 完全一致（通常是 <code v-pre>10.244.0.0/16</code> 或 <code v-pre>172.16.0.0/16</code>）。</li>
<li><strong>网卡识别</strong>：如果服务器有多块网卡，需在 YAML 中添加 <code v-pre>IP_AUTODETECTION_METHOD</code> 过滤，防止 Calico 绑定到错误的 IP 上。</li>
</ul>
<h3 id="_3-运行时维护常用命令" tabindex="-1"><a class="header-anchor" href="#_3-运行时维护常用命令"><span>3. 运行时维护常用命令</span></a></h3>
<ul>
<li><strong>查看详细报错</strong>（镜像问题的照妖镜）：</li>
</ul>
<p><code v-pre>kubectl describe pod &lt;pod名&gt; -n kube-system</code></p>
<ul>
<li><strong>强制刷新 Pod</strong>（打完 Tag 后手动触发）：</li>
</ul>
<p><code v-pre>kubectl delete pod &lt;pod名&gt; -n kube-system</code></p>
<ul>
<li><strong>移除 Master 污点</strong>（让插件能在 Master 运行）：</li>
</ul>
<p><code v-pre>kubectl taint nodes --all node-role.kubernetes.io/control-plane-</code></p>
<hr>
<h3 id="三、-终极避坑" tabindex="-1"><a class="header-anchor" href="#三、-终极避坑"><span>三、 终极避坑</span></a></h3>
<table>
<thead>
<tr>
<th><strong>检查项</strong></th>
<th><strong>操作目的</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Docker 加速器</strong></td>
<td>确保 <code v-pre>/etc/docker/daemon.json</code>&lt;br&gt;配置了国内镜像源。</td>
</tr>
<tr>
<td><strong>镜像全量性</strong></td>
<td>确认 <code v-pre>node</code>&lt;br&gt;, <code v-pre>cni</code>&lt;br&gt;, <code v-pre>controllers</code>&lt;br&gt;, <code v-pre>flexvol</code>&lt;br&gt;四个镜像是否都已就位。</td>
</tr>
<tr>
<td><strong>标签一致性</strong></td>
<td><code v-pre>docker images</code>&lt;br&gt;看到的名字必须和 <code v-pre>kubectl describe</code>&lt;br&gt;看到的一字不差。</td>
</tr>
<tr>
<td><strong>节点全覆盖</strong></td>
<td>每一个 Node 节点都要手动重复一遍镜像 Tag 操作。</td>
</tr>
</tbody>
</table>
<h4 id="常见状态" tabindex="-1"><a class="header-anchor" href="#常见状态"><span>常见状态</span></a></h4>
<table>
<thead>
<tr>
<th><strong>状态 (Status)</strong></th>
<th><strong>核心原因</strong></th>
<th><strong>解决方法</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>ImagePullBackOff</strong></td>
<td>镜像地址不对或网络不通</td>
<td>检查 <code v-pre>describe pod</code>&lt;br&gt;中的镜像地址；在对应节点手动 <code v-pre>docker pull</code></td>
</tr>
<tr>
<td><strong>Init:Error</strong></td>
<td>初始化脚本执行失败</td>
<td>查看日志：<code v-pre>kubectl logs &lt;pod&gt; -n kube-system -c install-cni</code></td>
</tr>
<tr>
<td><strong>Init:Error (flexvol)</strong></td>
<td>宿主机路径不存在</td>
<td>设置环境变量 <code v-pre>FLEXVOL_DIR=none</code>&lt;br&gt;或直接从 YAML 中删除 <code v-pre>flexvol</code>&lt;br&gt;容器</td>
</tr>
<tr>
<td><strong>CrashLoopBackOff</strong></td>
<td>控制器连不上 API Server</td>
<td>检查 <code v-pre>calico-node</code>&lt;br&gt;是否全部 Ready (1/1)；检查 Master 节点网络</td>
</tr>
</tbody>
</table>
<h2 id="kubectl-运维实战命令速查表" tabindex="-1"><a class="header-anchor" href="#kubectl-运维实战命令速查表"><span>Kubectl 运维实战命令速查表</span></a></h2>
<h3 id="_1-核心查看-get-—-集群监控" tabindex="-1"><a class="header-anchor" href="#_1-核心查看-get-—-集群监控"><span>1. 核心查看 (Get) — 集群监控</span></a></h3>
<table>
<thead>
<tr>
<th><strong>命令</strong></th>
<th><strong>功能描述</strong></th>
<th><strong>常用参数</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>kubectl get nodes</code></td>
<td>查看节点状态（Ready/NotReady）</td>
<td><code v-pre>-o wide</code>&lt;br&gt;(查看 IP/内核)</td>
</tr>
<tr>
<td><code v-pre>kubectl get pods</code></td>
<td>查看当前 Namespace 下的 Pod</td>
<td><code v-pre>-A</code>&lt;br&gt;(所有空间), <code v-pre>-w</code>&lt;br&gt;(持续监听)</td>
</tr>
<tr>
<td><code v-pre>kubectl get svc</code></td>
<td>查看 Service（映射端口/ClusterIP）</td>
<td><code v-pre>--show-labels</code></td>
</tr>
<tr>
<td><code v-pre>kubectl get deploy</code></td>
<td>查看控制器（副本数/可用数）</td>
<td><code v-pre>-n &lt;namespace&gt;</code></td>
</tr>
<tr>
<td><code v-pre>kubectl get events</code></td>
<td>查看集群最近的事件（排错神器）</td>
<td><code v-pre>--sort-by='.lastTimestamp'</code></td>
</tr>
</tbody>
</table>
<h3 id="_2-深度诊断-debug-—-故障排查" tabindex="-1"><a class="header-anchor" href="#_2-深度诊断-debug-—-故障排查"><span>2. 深度诊断 (Debug) — 故障排查</span></a></h3>
<table>
<thead>
<tr>
<th><strong>命令</strong></th>
<th><strong>功能描述</strong></th>
<th><strong>场景技巧</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>kubectl describe po &lt;name&gt;</code></td>
<td>查看资源详情和<strong>系统事件</strong></td>
<td>镜像拉不动、调度失败时必看</td>
</tr>
<tr>
<td><code v-pre>kubectl logs &lt;name&gt;</code></td>
<td>查看容器输出的<strong>程序日志</strong></td>
<td><code v-pre>-f</code>&lt;br&gt;(流式), <code v-pre>--tail 100</code>&lt;br&gt;(末尾 100 行)</td>
</tr>
<tr>
<td><code v-pre>kubectl exec -it &lt;name&gt; -- sh</code></td>
<td><strong>进入容器</strong>内部交互</td>
<td>测试网络连通性或查看内部配置</td>
</tr>
<tr>
<td><code v-pre>kubectl logs &lt;name&gt; -c &lt;container&gt;</code></td>
<td>查看多容器 Pod 中的指定容器日志</td>
<td>当 Pod 含有 Sidecar 时使用</td>
</tr>
<tr>
<td><code v-pre>kubectl top pod/node</code></td>
<td>查看资源占用 (CPU/内存)</td>
<td>需安装 Metrics Server</td>
</tr>
</tbody>
</table>
<h3 id="_3-资源操纵-action-—-状态变更" tabindex="-1"><a class="header-anchor" href="#_3-资源操纵-action-—-状态变更"><span>3. 资源操纵 (Action) — 状态变更</span></a></h3>
<table>
<thead>
<tr>
<th><strong>命令</strong></th>
<th><strong>功能描述</strong></th>
<th><strong>场景技巧</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>kubectl apply -f &lt;file&gt;.yaml</code></td>
<td><strong>创建或更新</strong>资源</td>
<td>声明式运维的核心命令</td>
</tr>
<tr>
<td><code v-pre>kubectl delete pod &lt;name&gt;</code></td>
<td>删除 Pod</td>
<td><code v-pre>--force --grace-period=0</code>&lt;br&gt;(强制删除)</td>
</tr>
<tr>
<td><code v-pre>kubectl scale deploy &lt;name&gt; --replicas=5</code></td>
<td>动态调整副本数量</td>
<td>应对突发流量</td>
</tr>
<tr>
<td><code v-pre>kubectl rollout restart deploy &lt;name&gt;</code></td>
<td><strong>平滑重启</strong>所有 Pod</td>
<td>修改配置后让 Pod 重新加载镜像</td>
</tr>
<tr>
<td><code v-pre>kubectl rollout undo deploy &lt;name&gt;</code></td>
<td><strong>版本回滚</strong></td>
<td>上线出错后秒回上一版本</td>
</tr>
</tbody>
</table>
<h3 id="_4-快捷生成-dry-run-—-yaml-模版" tabindex="-1"><a class="header-anchor" href="#_4-快捷生成-dry-run-—-yaml-模版"><span>4. 快捷生成 (Dry-run) — YAML 模版</span></a></h3>
<table>
<thead>
<tr>
<th><strong>命令</strong></th>
<th><strong>功能描述</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>kubectl run &lt;name&gt; --image=&lt;img-name&gt; --dry-run=client -o yaml &gt; pod.yaml</code></td>
<td>快速生成 Pod 的 YAML 模版</td>
</tr>
<tr>
<td><code v-pre>kubectl create deploy &lt;name&gt; --image=... --dry-run=client -o yaml &gt; deploy.yaml</code></td>
<td>快速生成 Deployment 模版</td>
</tr>
<tr>
<td><code v-pre>kubectl expose deploy &lt;name&gt; --port=80 --type=NodePort --dry-run=client -o yaml &gt; svc.yaml</code></td>
<td>快速生成 Service 模版</td>
</tr>
</tbody>
</table>
<h3 id="_5-创建一个yaml文件" tabindex="-1"><a class="header-anchor" href="#_5-创建一个yaml文件"><span>5.创建一个YAML文件</span></a></h3>
<p>不需要自己手写，利用 <code v-pre>kubectl</code> 的 <code v-pre>--dry-run</code> 参数，可以让系统帮你生成一个最标准的模板。</p>
<p><strong>生成 Deployment 模板：</strong></p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>kubectl create deploy my-nginx --image=nginx --dry-run=client -o yaml > nginx-all.yaml</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><strong>生成 Service 模板（追加到同一个文件）：</strong></p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>echo "---" >> nginx-all.yaml</span></span>
<span class="line"><span>kubectl expose deploy my-nginx --port=80 --target-port=80 --type=NodePort --dry-run=client -o yaml >> nginx-all.yaml</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>优点：</strong> 语法绝对正确，包含了所有必须的字段。</p>
<h2 id="kubectl-run启动和yaml文件启动的区别" tabindex="-1"><a class="header-anchor" href="#kubectl-run启动和yaml文件启动的区别"><span>kubectl run启动和yaml文件启动的区别</span></a></h2>
<h3 id="_1-核心区别对比表" tabindex="-1"><a class="header-anchor" href="#_1-核心区别对比表"><span>1. 核心区别对比表</span></a></h3>
<table>
<thead>
<tr>
<th><strong>特性</strong></th>
<th><strong>kubectl run (命令行)</strong></th>
<th><strong>kubectl apply -f (YAML 文件)</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>操作模式</strong></td>
<td><strong>命令式 (Imperative)</strong>：直接告诉 K8s “去做什么”。</td>
<td><strong>声明式 (Declarative)</strong>：告诉 K8s “最终状态是什么”。</td>
</tr>
<tr>
<td><strong>持久化</strong></td>
<td>随敲随写，命令执行完很难找回配置细节。</td>
<td><strong>配置即代码</strong>。文件可以存在 Git 中，版本可追溯。</td>
</tr>
<tr>
<td><strong>复杂度</strong></td>
<td>只能配置简单的参数（镜像、环境变量）。</td>
<td>支持 100% 的 K8s 特性（存储、资源限制、调度策略）。</td>
</tr>
<tr>
<td><strong>资源类型</strong></td>
<td>在新版本中通常只创建单独立的 <strong>Pod</strong>。</td>
<td>可以创建 <strong>Deployment</strong> (带副本控制)、Service 等复杂组合。</td>
</tr>
<tr>
<td><strong>适用场景</strong></td>
<td>临时调试、快速验证镜像、简单的工具运行。</td>
<td><strong>生产环境</strong>、正式项目部署、自动化 CI/CD。</td>
</tr>
</tbody>
</table>
<hr>
<h3 id="_2-逻辑架构差异" tabindex="-1"><a class="header-anchor" href="#_2-逻辑架构差异"><span>2. 逻辑架构差异</span></a></h3>
<ul>
<li><code v-pre>**kubectl run**</code>：你就像一个指挥官，一个口令一个动作。如果你不小心把 Pod 删了，除非你记得之前的长命令，否则很难复原一个一模一样的环境。</li>
<li><strong>YAML (apply)</strong>：你就像一个建筑师。你把蓝图交给 K8s，K8s 负责维持这个蓝图的现状。如果 Pod 掉了，K8s 会根据 YAML 里的副本数定义（Replicas）自动帮你拉起一个新的。</li>
</ul>
<hr>
<h3 id="_3-举个例子-启动-mysql-8-4" tabindex="-1"><a class="header-anchor" href="#_3-举个例子-启动-mysql-8-4"><span>3. 举个例子：启动 MySQL 8.4</span></a></h3>
<h4 id="命令式创建-run" tabindex="-1"><a class="header-anchor" href="#命令式创建-run"><span>命令式创建 (<code v-pre>run</code>)</span></a></h4>
<p>你只能在命令行里拼凑参数，很容易漏掉东西：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>kubectl run mysql-db --image=mysql:8.4 --env="MYSQL_ROOT_PASSWORD=123"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h4 id="获取已经创建进程的yaml文件" tabindex="-1"><a class="header-anchor" href="#获取已经创建进程的yaml文件"><span>获取已经创建进程的yaml文件</span></a></h4>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>kubectl get pod &#x3C;podname> -o yaml</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h4 id="声明式创建-yaml" tabindex="-1"><a class="header-anchor" href="#声明式创建-yaml"><span>声明式创建 (<code v-pre>YAML</code>)</span></a></h4>
<p>你可以把所有的细节都写清楚。创建一个 <code v-pre>mysql.yaml</code>：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>apiVersion: apps/v1</span></span>
<span class="line"><span>kind: Deployment        # 注意这里是 Deployment，带自动恢复功能</span></span>
<span class="line"><span>metadata:</span></span>
<span class="line"><span>  name: mysql-deploy</span></span>
<span class="line"><span>spec:</span></span>
<span class="line"><span>  replicas: 1</span></span>
<span class="line"><span>  selector:</span></span>
<span class="line"><span>    matchLabels:</span></span>
<span class="line"><span>      app: mysql</span></span>
<span class="line"><span>  template:</span></span>
<span class="line"><span>    metadata:</span></span>
<span class="line"><span>      labels:</span></span>
<span class="line"><span>        app: mysql</span></span>
<span class="line"><span>    spec:</span></span>
<span class="line"><span>      containers:</span></span>
<span class="line"><span>      - name: mysql</span></span>
<span class="line"><span>        image: mysql:8.4</span></span>
<span class="line"><span>        env:</span></span>
<span class="line"><span>        - name: MYSQL_ROOT_PASSWORD</span></span>
<span class="line"><span>          value: "123"</span></span>
<span class="line"><span>        resources:      # YAML 方便定义资源限制</span></span>
<span class="line"><span>          limits:</span></span>
<span class="line"><span>            memory: "512Mi"</span></span>
<span class="line"><span>            cpu: "500m"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>执行命令：</strong><code v-pre>kubectl apply -f mysql.yaml</code></p>
<hr>
<h3 id="_4-为什么生产环境禁用-run" tabindex="-1"><a class="header-anchor" href="#_4-为什么生产环境禁用-run"><span>4. 为什么生产环境禁用 <code v-pre>run</code>？</span></a></h3>
<p>在你的运维笔记中，一定要写下这一条：<strong>“生产环境严禁直接 run。”</strong> 原因如下：</p>
<ol>
<li><strong>无法版本回滚</strong>：YAML 配合 Git 可以轻松回滚到昨天的配置，<code v-pre>run</code> 做不到。</li>
<li><strong>管理混乱</strong>：过了一个月，没人记得当初 <code v-pre>run</code> 的时候加了哪些特殊的环境变量。</li>
<li><strong>单点故障</strong>：<code v-pre>kubectl run</code> 创建的通常是裸 Pod。一旦该 Pod 所在的 Node 宕机，这个 Pod <strong>不会</strong>在其他节点自动重启。而 YAML 创建的 Deployment 会自动在其他节点拉起新 Pod。</li>
</ol>
<hr>
<h3 id="运维提效小技巧-将-run-转化为-yaml" tabindex="-1"><a class="header-anchor" href="#运维提效小技巧-将-run-转化为-yaml"><span>运维提效小技巧：将 <code v-pre>run</code> 转化为 <code v-pre>yaml</code></span></a></h3>
<p>如果你不想手写复杂的 YAML，可以先用 <code v-pre>run</code> 生成一个“草稿”，然后保存成文件：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># --dry-run=client 表示不真正创建，只模拟执行</span></span>
<span class="line"><span># -o yaml 表示输出成 YAML 格式</span></span>
<span class="line"><span>kubectl run my-web --image=nginx:alpine --dry-run=client -o yaml > web-template.yaml</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="" tabindex="-1"><a class="header-anchor" href="#"><span></span></a></h4>
<h2 id="pod的启动流程" tabindex="-1"><a class="header-anchor" href="#pod的启动流程"><span>pod的启动流程</span></a></h2>
<p>在 Kubernetes 中，Pod 的状态主要分为两个维度：<strong>生命周期阶段 (Phase)</strong> 和 <strong>具体状况 (Condition)</strong>。</p>
<h3 id="_1-五大核心生命周期阶段-pod-phase" tabindex="-1"><a class="header-anchor" href="#_1-五大核心生命周期阶段-pod-phase"><span>1. 五大核心生命周期阶段 (Pod Phase)</span></a></h3>
<p>这是通过 <code v-pre>kubectl get pods</code> 最常看到的五个一级状态：</p>
<table>
<thead>
<tr>
<th><strong>状态</strong></th>
<th><strong>含义</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Pending</strong></td>
<td><strong>挂起</strong>。Pod 已被 API Server 创建，但由于镜像拉取中、资源不足或正在调度，容器尚未启动。</td>
</tr>
<tr>
<td><strong>Running</strong></td>
<td><strong>运行中</strong>。Pod 已绑定到节点，且至少有一个容器正在运行，或正处于启动/重启状态。</td>
</tr>
<tr>
<td><strong>Succeeded</strong></td>
<td><strong>成功</strong>。Pod 中的所有容器都已成功运行并退出（通常指一次性任务 Job），且不会再重启。</td>
</tr>
<tr>
<td><strong>Failed</strong></td>
<td><strong>失败</strong>。Pod 中所有容器都已终止，但至少有一个容器是因为出错（退出码非 0）而终止的。</td>
</tr>
<tr>
<td><strong>Unknown</strong></td>
<td><strong>未知</strong>。通常是因为 Master 无法与 Node 通信（比如 Node 挂了或网络断了），导致无法获取 Pod 状态。</td>
</tr>
</tbody>
</table>
<hr>
<h3 id="_2-常见的-非正常-运行状态-detail-status" tabindex="-1"><a class="header-anchor" href="#_2-常见的-非正常-运行状态-detail-status"><span>2. 常见的“非正常”运行状态 (Detail Status)</span></a></h3>
<p>在 <code v-pre>Running</code> 或 <code v-pre>Pending</code> 阶段，你经常会看到具体的 <code v-pre>REASON</code>，这些才是排障的关键：</p>
<ul>
<li><strong>ContainerCreating</strong>: 正在创建容器，通常是在拉镜像或挂载存储。</li>
<li><strong>CrashLoopBackOff</strong>: 容器启动后又崩溃了，K8s 正在尝试反复重启（通常是代码报错、配置文件不对）。</li>
<li><strong>ImagePullBackOff / ErrImagePull</strong>: 镜像拉不下来（地址写错、网络不通、加速器没配好）。</li>
<li><strong>Terminating</strong>: 正在删除中。如果一直卡在这个状态，通常是优雅退出超时（需用 <code v-pre>--force</code>）。</li>
<li><strong>Evicted</strong>: 驱逐状态。节点资源（如磁盘、内存）快耗尽了，K8s 强制杀掉 Pod 以保护节点。</li>
<li><strong>OOMKilled</strong>: 内存溢出。容器申请的内存超过了 <code v-pre>limits</code> 限制。</li>
</ul>
<hr>
<h3 id="_3-pod-的四大状况-conditions" tabindex="-1"><a class="header-anchor" href="#_3-pod-的四大状况-conditions"><span>3. Pod 的四大状况 (Conditions)</span></a></h3>
<p>如果你执行 <code v-pre>kubectl describe pod &lt;name&gt;</code>，在输出的底部会看到 <code v-pre>Conditions</code> 列表，这是更底层的健康指标：</p>
<ol>
<li><strong>PodScheduled</strong>: Pod 是否已经成功调度到某个 Node 上。</li>
<li><strong>Initialized</strong>: 所有的 <code v-pre>initContainers</code>（初始化容器）是否已成功完成。</li>
<li><strong>ContainersReady</strong>: Pod 内的所有容器是否都已经准备就绪。</li>
<li><strong>Ready</strong>: Pod 是否已经可以开始处理请求（并会被加入到 Service 的负载均衡中）。</li>
</ol>
<p>1.标准的正确输出文件</p>
<p>2.标准的错误输出文件</p>
<p>文件描述符（file desctipotor，简称FD）</p>
<p>默认情况下linux系统一个进程允许打开1024个进程</p>
<p>操作系统知识：</p>
<p>内核、系统调用、shell、其他</p>
<p>内核：=</p>
<p>cpu、内存、进程、网络、磁盘</p>
<p>内核的信息</p>
<p>​</p>
<p>​</p>
<p>​</p>
<p>​</p>
<h2 id="cronjob定时任务" tabindex="-1"><a class="header-anchor" href="#cronjob定时任务"><span>cronjob定时任务</span></a></h2>
<p>简单来说，<strong>CronJob</strong> 就是 Kubernetes 版的“闹钟”或“计划任务”。</p>
<p>如果你熟悉 Linux 的 <code v-pre>crontab</code>，那么 CronJob 就是把那种定时执行脚本的功能搬到了容器集群里。它不负责让程序“一直运行”，而是负责在<strong>特定的时间点</strong>拉起一个 <strong>Job</strong>（一次性任务），干完活就走。</p>
<hr>
<h3 id="_1-cronjob-的核心逻辑" tabindex="-1"><a class="header-anchor" href="#_1-cronjob-的核心逻辑"><span>1. CronJob 的核心逻辑</span></a></h3>
<ul>
<li><strong>CronJob</strong>: 策略层，规定“什么时候干”。</li>
<li><strong>Job</strong>: 执行层，规定“干什么”。</li>
<li><strong>Pod</strong>: 落地层，真正的容器在干活。</li>
</ul>
<hr>
<h3 id="_2-时间格式-schedule" tabindex="-1"><a class="header-anchor" href="#_2-时间格式-schedule"><span>2. 时间格式 (Schedule)</span></a></h3>
<p>它的时间表达式由 5 位组成：</p>
<p><code v-pre>分 时 日 月 周</code></p>
<ul>
<li><code v-pre>*/5 * * * *</code>: 每 5 分钟执行一次。</li>
<li><code v-pre>0 2 * * *</code>: 每天凌晨 2 点整执行一次。</li>
<li><code v-pre>0 9 * * 1-5</code>: 每个工作日（周一到周五）早上 9 点执行。</li>
</ul>
<hr>
<h3 id="_3-如何使用-yaml-示例" tabindex="-1"><a class="header-anchor" href="#_3-如何使用-yaml-示例"><span>3. 如何使用（YAML 示例）</span></a></h3>
<p>这是一个每分钟打印一次“Hello World”并退出的 CronJob：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>apiVersion: batch/v1</span></span>
<span class="line"><span>kind: CronJob</span></span>
<span class="line"><span>metadata:</span></span>
<span class="line"><span>  name: my-cronjob</span></span>
<span class="line"><span>spec:</span></span>
<span class="line"><span>  schedule: "*/1 * * * *"       # 核心：每分钟运行一次</span></span>
<span class="line"><span>  jobTemplate:</span></span>
<span class="line"><span>    spec:</span></span>
<span class="line"><span>      template:</span></span>
<span class="line"><span>        spec:</span></span>
<span class="line"><span>          containers:</span></span>
<span class="line"><span>          - name: hello</span></span>
<span class="line"><span>            image: busybox:1.28</span></span>
<span class="line"><span>            command:</span></span>
<span class="line"><span>            - /bin/sh</span></span>
<span class="line"><span>            - -c</span></span>
<span class="line"><span>            - date; echo "Hello from K8s CronJob"</span></span>
<span class="line"><span>          restartPolicy: OnFailure  # 任务失败时重启容器，成功则停止</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h3 id="_4-关键参数-避坑指南" tabindex="-1"><a class="header-anchor" href="#_4-关键参数-避坑指南"><span>4. 关键参数（避坑指南）</span></a></h3>
<p>写 CronJob 时，这几个参数非常重要：</p>
<ul>
<li>
<p><code v-pre>**concurrencyPolicy**</code> <strong>(并发策略)</strong>:</p>
</li>
<li>
<p><code v-pre>Allow</code> (默认): 允许同时跑多个任务。</p>
</li>
<li>
<p><code v-pre>Forbid</code>: 如果上一个还没跑完，下一个就先别开（防止任务堆积）。</p>
</li>
<li>
<p><code v-pre>**startingDeadlineSeconds**</code>: 如果因为某种原因（如集群挂了）错过了触发时间，超过这个秒数就不再补跑了。</p>
</li>
<li>
<p><code v-pre>**successfulJobsHistoryLimit**</code>: 保留多少个成功的 Pod 记录。默认 3 个。如果设为 0，你执行完就看不见日志了。</p>
</li>
</ul>
<hr>
<h3 id="_5-常用命令" tabindex="-1"><a class="header-anchor" href="#_5-常用命令"><span>5. 常用命令</span></a></h3>
<ul>
<li><strong>查看状态</strong>:</li>
</ul>
<p><code v-pre>kubectl get cronjob</code> (可以看到上次是什么时候执行的)</p>
<ul>
<li><strong>查看执行历史</strong>:</li>
</ul>
<p><code v-pre>kubectl get jobs</code> (CronJob 每次执行都会生成一个 Job)</p>
<ul>
<li><strong>手动触发一次</strong>:</li>
</ul>
<p>有时候没到时间，你想测试一下，可以手动根据 CronJob 生成一个 Job：</p>
<p><code v-pre>kubectl create job --from=cronjob/my-cronjob test-run-01</code></p>
<ul>
<li><strong>删除</strong>:</li>
</ul>
<p><code v-pre>kubectl delete cronjob my-cronjob</code></p>
<hr>
<h3 id="常见用途" tabindex="-1"><a class="header-anchor" href="#常见用途"><span>常见用途</span></a></h3>
<ol>
<li><strong>数据库备份</strong>：每天凌晨自动 dump 数据库并上传云存储。</li>
<li><strong>清理临时文件</strong>：每小时清理一次日志或缓存。</li>
<li><strong>发送报告</strong>：每周一早上统计上周业务数据。</li>
</ol>
<p>​</p>
<h2 id="daemonset-守护进程控制器" tabindex="-1"><a class="header-anchor" href="#daemonset-守护进程控制器"><span>daemonSet-守护进程控制器</span></a></h2>
<p><strong>DaemonSet (简称 DS)</strong> 是 Kubernetes 中一个非常特殊的控制器。</p>
<p>如果说 <strong>Deployment</strong> 的目标是“不论在哪，只要帮我跑够 $N$ 个副本就行”，那么 <strong>DaemonSet</strong> 的目标就是“<strong>全员集结</strong>”：它确保在集群的<strong>每一个</strong>（或指定的）Node 节点上，都运行且只运行一个 Pod 副本。</p>
<hr>
<h3 id="_1-核心特性-如影随形" tabindex="-1"><a class="header-anchor" href="#_1-核心特性-如影随形"><span>1. 核心特性：如影随形</span></a></h3>
<ul>
<li><strong>自动覆盖</strong>：每当有新节点加入集群，DaemonSet 会自动在该节点上启动一个 Pod。</li>
<li><strong>自动回收</strong>：当节点从集群中移除时，DaemonSet 也会自动删除该节点上的 Pod。</li>
<li><strong>唯一性</strong>：它能保证一个 Node 上不会运行两个相同的 DS Pod，避免资源冲突。</li>
</ul>
<hr>
<h3 id="_2-典型的使用场景-基础设施类" tabindex="-1"><a class="header-anchor" href="#_2-典型的使用场景-基础设施类"><span>2. 典型的使用场景（基础设施类）</span></a></h3>
<p>DaemonSet 通常不用于跑业务（比如 Nginx 或 Java 应用），而是用于<strong>支撑集群运行的后台服务</strong>：</p>
<ul>
<li><strong>网络插件 (CNI)</strong>：例如 <code v-pre>calico-node</code> 或 <code v-pre>flannel</code>。每个节点必须跑一个，否则节点无法通信。</li>
<li><strong>日志收集器</strong>：例如 <code v-pre>fluentd</code> 或 <code v-pre>logstash</code>。它们驻留在每个节点上，收集该节点上所有容器的日志。</li>
<li><strong>监控代理 (Agent)</strong>：例如 <code v-pre>Prometheus Node Exporter</code>。它需要读取每个物理节点的 CPU、内存等硬件数据。</li>
</ul>
<hr>
<h3 id="_3-动手实践-编写一个-daemonset" tabindex="-1"><a class="header-anchor" href="#_3-动手实践-编写一个-daemonset"><span>3. 动手实践：编写一个 DaemonSet</span></a></h3>
<p>假设我们要部署一个监控代理，其 YAML 结构如下：</p>
<p>YAML</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>apiVersion: apps/v1</span></span>
<span class="line"><span>kind: DaemonSet        # 资源类型</span></span>
<span class="line"><span>metadata:</span></span>
<span class="line"><span>  name: node-exporter</span></span>
<span class="line"><span>  namespace: kube-system</span></span>
<span class="line"><span>spec:</span></span>
<span class="line"><span>  selector:</span></span>
<span class="line"><span>    matchLabels:</span></span>
<span class="line"><span>      app: node-exporter</span></span>
<span class="line"><span>  template:</span></span>
<span class="line"><span>    metadata:</span></span>
<span class="line"><span>      labels:</span></span>
<span class="line"><span>        app: node-exporter</span></span>
<span class="line"><span>    spec:</span></span>
<span class="line"><span>      # 重点 1: 通常 DS 需要访问宿主机资源</span></span>
<span class="line"><span>      hostNetwork: true </span></span>
<span class="line"><span>      hostPID: true</span></span>
<span class="line"><span>      containers:</span></span>
<span class="line"><span>      - name: node-exporter</span></span>
<span class="line"><span>        image: prom/node-exporter:v1.3.1</span></span>
<span class="line"><span>        ports:</span></span>
<span class="line"><span>        - containerPort: 9100</span></span>
<span class="line"><span>          hostPort: 9100 # 直接映射到物理机端口</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h3 id="_4-进阶玩法-精准投放" tabindex="-1"><a class="header-anchor" href="#_4-进阶玩法-精准投放"><span>4. 进阶玩法：精准投放</span></a></h3>
<p>虽然 DaemonSet 默认是“全员集结”，但你也可以通过 <strong>标签 (Labels)</strong> 让它只在特定节点运行。</p>
<h4 id="_1-使用-nodeselector" tabindex="-1"><a class="header-anchor" href="#_1-使用-nodeselector"><span>① 使用 nodeSelector</span></a></h4>
<p>如果你只想在带 GPU 的节点上跑采集程序：</p>
<p>YAML</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>spec:</span></span>
<span class="line"><span>  template:</span></span>
<span class="line"><span>    spec:</span></span>
<span class="line"><span>      nodeSelector:</span></span>
<span class="line"><span>        hardware: gpu  # 只有打了这个标签的节点才会运行该 Pod</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-容忍污点-tolerations" tabindex="-1"><a class="header-anchor" href="#_2-容忍污点-tolerations"><span>② 容忍污点 (Tolerations)</span></a></h4>
<p>默认情况下，Master 节点是不跑 Pod 的（因为有污点）。但 DaemonSet 往往需要覆盖 Master，此时需要添加容忍度：</p>
<p>YAML</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>spec:</span></span>
<span class="line"><span>  template:</span></span>
<span class="line"><span>    spec:</span></span>
<span class="line"><span>      tolerations:</span></span>
<span class="line"><span>      - key: node-role.kubernetes.io/master</span></span>
<span class="line"><span>        effect: NoSchedule</span></span>
<span class="line"><span>        operator: Exists</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h3 id="_5-常用管理命令" tabindex="-1"><a class="header-anchor" href="#_5-常用管理命令"><span>5. 常用管理命令</span></a></h3>
<ul>
<li><strong>查看状态</strong>：</li>
</ul>
<p><code v-pre>kubectl get ds -n kube-system</code></p>
<p><em>你会发现</em> <code v-pre>*DESIRED*</code><em>（期望数）永远等于你的可用</em> <code v-pre>*NODE*</code> <em>数量。</em></p>
<ul>
<li><strong>滚动更新</strong>：</li>
</ul>
<p>当你修改了 DS 的镜像，它会一个节点接一个节点地重启 Pod，保证监控或网络不中断。</p>
<p><code v-pre>kubectl rollout status ds/node-exporter -n kube-system</code></p>
<hr>
<h3 id="总结对比" tabindex="-1"><a class="header-anchor" href="#总结对比"><span>总结对比</span></a></h3>
<table>
<thead>
<tr>
<th><strong>特性</strong></th>
<th><strong>Deployment</strong></th>
<th><strong>DaemonSet</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>副本数</strong></td>
<td>手动指定（如 3 或 5）</td>
<td><strong>由节点数量决定</strong></td>
</tr>
<tr>
<td><strong>调度</strong></td>
<td>调度器选（哪空闲去哪）</td>
<td><strong>固定（每个节点一个）</strong></td>
</tr>
<tr>
<td><strong>删除节点时</strong></td>
<td>副本会在其他节点漂移重启</td>
<td><strong>副本随节点销毁，不漂移</strong></td>
</tr>
<tr>
<td><strong>典型用途</strong></td>
<td>业务应用、微服务</td>
<td><strong>网络、日志、监控等插件</strong></td>
</tr>
</tbody>
</table>
<h2 id="pod的资源限制" tabindex="-1"><a class="header-anchor" href="#pod的资源限制"><span>pod的资源限制</span></a></h2>
<h3 id="一、-cpu-资源分配-算力的-量化" tabindex="-1"><a class="header-anchor" href="#一、-cpu-资源分配-算力的-量化"><span>一、 CPU 资源分配：算力的“量化”</span></a></h3>
<p>K8s 中的 CPU 单位是 <code v-pre>m</code> (millicores)。<code v-pre>1000m</code> 等于 <strong>1 个逻辑 CPU 核心</strong>。</p>
<h4 id="_1-配置示例" tabindex="-1"><a class="header-anchor" href="#_1-配置示例"><span>1. 配置示例</span></a></h4>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>resources:</span></span>
<span class="line"><span>  requests:</span></span>
<span class="line"><span>    cpu: "250m"  # 初始保证 0.25 核，底层对应 cgroups 的 cpu.shares</span></span>
<span class="line"><span>  limits:</span></span>
<span class="line"><span>    cpu: "500m"  # 最高占用 0.5 核，底层对应 cgroups 的 cpu.cfs_quota_us</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-核心避坑指南" tabindex="-1"><a class="header-anchor" href="#_2-核心避坑指南"><span>2. 核心避坑指南</span></a></h4>
<ul>
<li><strong>Requests</strong>：调度器（Scheduler）根据这个值决定 Pod 放在哪台 Node 上。如果 Node 剩余 CPU 不足 250m，Pod 就进不去。</li>
<li><strong>Limits</strong>：这是硬上限。如果 Pod 试图超过 0.5 核，内核会触发 <strong>CPU Throttling（限流）</strong>。</li>
<li><strong>面试点</strong>：CPU 是“可压缩资源”。超过 limit 不会死掉，只是会变慢（延迟增加）。</li>
</ul>
<hr>
<h3 id="二、-内存资源分配-空间的-死线" tabindex="-1"><a class="header-anchor" href="#二、-内存资源分配-空间的-死线"><span>二、 内存资源分配：空间的“死线”</span></a></h3>
<p>内存的单位通常是 <code v-pre>Mi</code> (Mebibytes) 或 <code v-pre>Gi</code> (Gibibytes)。</p>
<h4 id="_1-配置示例-1" tabindex="-1"><a class="header-anchor" href="#_1-配置示例-1"><span>1. 配置示例</span></a></h4>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>resources:</span></span>
<span class="line"><span>  requests:</span></span>
<span class="line"><span>    memory: "128Mi" # 调度参考值</span></span>
<span class="line"><span>  limits:</span></span>
<span class="line"><span>    memory: "512Mi" # 物理上限</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-核心避坑指南-1" tabindex="-1"><a class="header-anchor" href="#_2-核心避坑指南-1"><span>2. 核心避坑指南</span></a></h4>
<ul>
<li><strong>OOM Kill</strong>：内存是“不可压缩资源”。如果 Pod 使用的内存超过了 <code v-pre>limits</code>，K8s 会直接触发 <strong>OOM Kill</strong>，状态变为 <code v-pre>OOMKilled</code>，然后尝试重启。</li>
<li><strong>面试点</strong>：如果 <code v-pre>requests</code> 设得太小而 <code v-pre>limits</code> 很大，可能会导致 Node 内存耗尽（Overcommit），引发系统级别的稳定性问题。</li>
</ul>
<hr>
<h3 id="三、-深度进阶-服务质量等级-qos-classes" tabindex="-1"><a class="header-anchor" href="#三、-深度进阶-服务质量等级-qos-classes"><span>三、 深度进阶：服务质量等级 (QoS Classes)</span></a></h3>
<p>K8s 会根据你设置的 <code v-pre>requests</code> 和 <code v-pre>limits</code> 自动给 Pod 分成三个等级，这直接决定了<strong>当 Node 资源不足时，先杀谁</strong>：</p>
<ol>
<li><strong>Guaranteed (最高级)</strong>：<code v-pre>requests</code> 和 <code v-pre>limits</code> 完全相等。</li>
</ol>
<ul>
<li><em>待遇</em>：最稳定，除非万不得已，否则不会被杀。</li>
</ul>
<ol start="2">
<li><strong>Burstable (中等级)</strong>：<code v-pre>limits</code> 大于 <code v-pre>requests</code>（或者只设了其中一个）。</li>
</ol>
<ul>
<li><em>待遇</em>：平常用得爽，但 Node 压力大时，它是第一批被针对的目标。</li>
</ul>
<ol start="3">
<li><strong>BestEffort (最低级)</strong>：啥都没设。</li>
</ol>
<ul>
<li><em>待遇</em>：典型的“临时工”， 资源够你就用，不够第一个踢你走。</li>
</ul>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};