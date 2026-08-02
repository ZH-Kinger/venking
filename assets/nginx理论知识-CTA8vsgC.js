import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%BF%90%E7%BB%B4/web%E9%9B%86%E7%BE%A4/nginx%E7%90%86%E8%AE%BA%E7%9F%A5%E8%AF%86.html","title":"nginx理论知识","lang":"zh-CN","frontmatter":{"title":"nginx理论知识","icon":"server","date":"2026-07-23T00:00:00.000Z","category":["运维"],"description":"nginx (&quot;engine x&quot;) is an HTTP web server, reverse proxy, content cache, load balancer, TCP/UDP proxy server, and mail proxy server. Originally written by Igor Sysoev a...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"nginx理论知识\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/nginx%E7%90%86%E8%AE%BA%E7%9F%A5%E8%AF%86-1.png\\",\\"https://venking.tech/blog/blog/assets/posts/nginx%E7%90%86%E8%AE%BA%E7%9F%A5%E8%AF%86-2.jpeg\\",\\"https://venking.tech/blog/blog/assets/posts/nginx%E7%90%86%E8%AE%BA%E7%9F%A5%E8%AF%86-%E7%99%BD%E6%9D%BF-1.svg\\",\\"https://venking.tech/blog/blog/assets/posts/nginx%E7%90%86%E8%AE%BA%E7%9F%A5%E8%AF%86-3.png\\",\\"https://venking.tech/blog/blog/assets/posts/nginx%E7%90%86%E8%AE%BA%E7%9F%A5%E8%AF%86-%E7%99%BD%E6%9D%BF-2.svg\\",\\"https://venking.tech/blog/blog/assets/posts/nginx%E7%90%86%E8%AE%BA%E7%9F%A5%E8%AF%86-4.png\\",\\"https://venking.tech/blog/blog/assets/posts/nginx%E7%90%86%E8%AE%BA%E7%9F%A5%E8%AF%86-5.png\\",\\"https://venking.tech/blog/blog/assets/posts/nginx%E7%90%86%E8%AE%BA%E7%9F%A5%E8%AF%86-%E7%99%BD%E6%9D%BF-3.svg\\",\\"https://venking.tech/blog/blog/assets/posts/nginx%E7%90%86%E8%AE%BA%E7%9F%A5%E8%AF%86-6.png\\",\\"https://venking.tech/blog/blog/assets/posts/nginx%E7%90%86%E8%AE%BA%E7%9F%A5%E8%AF%86-7.png\\",\\"https://venking.tech/blog/blog/assets/posts/nginx%E7%90%86%E8%AE%BA%E7%9F%A5%E8%AF%86-8.png\\",\\"https://venking.tech/blog/blog/assets/posts/nginx%E7%90%86%E8%AE%BA%E7%9F%A5%E8%AF%86-9.png\\",\\"https://venking.tech/blog/blog/assets/posts/nginx%E7%90%86%E8%AE%BA%E7%9F%A5%E8%AF%86-10.png\\",\\"https://venking.tech/blog/blog/assets/posts/nginx%E7%90%86%E8%AE%BA%E7%9F%A5%E8%AF%86-%E7%99%BD%E6%9D%BF-4.svg\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%BF%90%E7%BB%B4/web%E9%9B%86%E7%BE%A4/nginx%E7%90%86%E8%AE%BA%E7%9F%A5%E8%AF%86.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"nginx理论知识"}],["meta",{"property":"og:description","content":"nginx (&quot;engine x&quot;) is an HTTP web server, reverse proxy, content cache, load balancer, TCP/UDP proxy server, and mail proxy server. Originally written by Igor Sysoev a..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/nginx%E7%90%86%E8%AE%BA%E7%9F%A5%E8%AF%86-1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":37.91,"words":11373},"filePathRelative":"posts/运维/web集群/nginx理论知识.md","excerpt":"<p>nginx (&quot;<em>engine x</em>&quot;) is an HTTP web server, reverse proxy, content cache, load balancer, TCP/UDP proxy server, and mail proxy server. Originally written by <a href=\\"http://sysoev.ru/en/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Igor Sysoev</a> and distributed under the <a href=\\"https://nginx.org/LICENSE\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">2-clause BSD License</a>.</p>","autoDesc":true}`),i={name:`nginx理论知识.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>nginx (&quot;<em>engine x</em>&quot;) is an HTTP web server, reverse proxy, content cache, load balancer, TCP/UDP proxy server, and mail proxy server. Originally written by <a href="http://sysoev.ru/en/" target="_blank" rel="noopener noreferrer">Igor Sysoev</a> and distributed under the <a href="https://nginx.org/LICENSE" target="_blank" rel="noopener noreferrer">2-clause BSD License</a>.</p>
<p>​</p>
<p>nginx是什么</p>
<p><strong>Nginx</strong>（发音为 &quot;engine x&quot;）是一款<strong>高性能的开源 HTTP 服务器、反向代理服务器</strong>，同时也可以作为邮件代理服务器、负载均衡器使用</p>
<figure><img src="/blog/assets/posts/nginx%E7%90%86%E8%AE%BA%E7%9F%A5%E8%AF%86-1.png" alt="QQ图片20260121215914.png" tabindex="0" loading="lazy"><figcaption>QQ图片20260121215914.png</figcaption></figure>
<p>反向代理 &amp; 负载均衡这是 Nginx 最常用的功能之一。</p>
<p>反向代理：客户端请求先发送到 Nginx，再由 Nginx 转发到后端的应用服务器（如 Tomcat、Node.js、Python 后端），对外隐藏真实的后端服务地址，提高安全性。</p>
<p>负载均衡：当后端有多台应用服务器时，Nginx 可以按照预设策略（如轮询、加权轮询、IP 哈希、最少连接数）将请求分发到不同服务器，避免单台服务器过载，提升系统可用性。</p>
<figure><img src="/blog/assets/posts/nginx%E7%90%86%E8%AE%BA%E7%9F%A5%E8%AF%86-2.jpeg" alt="P20260121-214728.jpg" tabindex="0" loading="lazy"><figcaption>P20260121-214728.jpg</figcaption></figure>
<p>​</p>
<p>初始化操作</p>
<h2 id="_1-修改主机名" tabindex="-1"><a class="header-anchor" href="#_1-修改主机名"><span>1.修改主机名</span></a></h2>
<p>​</p>
<p>[wang@localhost ~]$ <strong>hostnamectl set-hostname web-1</strong></p>
<p>[wang@localhost ~]$ <strong>su</strong></p>
<p>[root@web-1 wang]# <strong>hostname</strong></p>
<p>web-1</p>
<p>​</p>
<h2 id="_2-禁用firewalld-和selinux服务" tabindex="-1"><a class="header-anchor" href="#_2-禁用firewalld-和selinux服务"><span>2.禁用firewalld 和selinux服务</span></a></h2>
<p>禁用firewalld</p>
<p>[root@web-1 wang]# <strong>service firewalld stop</strong></p>
<p>Redirecting to /bin/systemctl stop <a href="http://firewalld.se" target="_blank" rel="noopener noreferrer">firewalld.se</a> rvice</p>
<p>[root@web-1 wang]# <strong>systemctl disable firewalld</strong></p>
<p>Removed '/etc/systemd/system/multi-user.target.wants/firewalld.service'.</p>
<p>Removed '/etc/systemd/system/dbus-org.fedoraproject.FirewallD1.service'.</p>
<p>​</p>
<p>禁用selinux</p>
<p>[root@web-1 wang]# <strong>setenforce 0 临时禁用selinux</strong></p>
<p>[root@web-1 wang]# <strong>getenforce</strong></p>
<p>Permissive</p>
<p>​</p>
<p>[root@web-1 wang]# <strong>vi /etc/selinux/config 修改配置文件永久禁用</strong></p>
<p>修改配置项为</p>
<p>SELINUX=disabled</p>
<p>[root@web-1 wang]# <strong>reboot 修改完重启</strong></p>
<p><strong>​</strong></p>
<h3 id="selinux是什么" tabindex="-1"><a class="header-anchor" href="#selinux是什么"><span>Selinux是什么</span></a></h3>
<p><strong>SELinux</strong>，它的全称是 Security-Enhanced Linux（安全增强型 Linux），是由美国国家安全局开发的 Linux 内核中的强制访问控制（MAC）安全子系统，能为 Linux 系统提供额外的安全防护，以下是其核心信息：</p>
<ol>
<li><strong>核心机制</strong></li>
</ol>
<ul>
<li><strong>强制访问控制</strong>：和 Linux 传统的自主访问控制不同，即便进程拥有 root 权限，SELinux 也会依据预设策略限制它的行为。它会为进程、文件、端口等所有资源都打上安全上下文标签，只有符合策略规则的标签组合，才能实现资源访问。</li>
<li><strong>最小权限原则</strong>：进程仅能获取完成自身任务所必需的权限，就算进程被入侵，入侵者也难以突破权限限制去访问其他无关资源，能大大缩小破坏范围。</li>
</ul>
<ol start="2">
<li><strong>三种工作模式</strong></li>
</ol>
<table>
<thead>
<tr>
<th><strong>模式</strong></th>
<th><strong>特点</strong></th>
<th><strong>适用场景</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>Enforcing（强制模式）</td>
<td>会主动拦截违规的访问操作，同时记录相关日志</td>
<td>生产环境，保障系统安全</td>
</tr>
<tr>
<td>Permissive（宽容模式）</td>
<td>不会拦截违规操作，仅记录违规行为日志</td>
<td>调试策略或者临时排查权限相关问题</td>
</tr>
<tr>
<td>Disabled（禁用模式）</td>
<td>完全关闭 SELinux 功能</td>
<td>仅建议在测试环境短期使用</td>
</tr>
</tbody>
</table>
<ol start="3">
<li><strong>常见争议</strong>一方面，它常被初学者关闭。因为其配置复杂，默认策略可能阻碍 Nginx 读取自定义目录这类合法操作，且权限问题排查难度大，相关日志混杂在审计日志中，不易定位问题。另一方面，生产环境却建议开启它，它能提升系统防御能力，阻止漏洞扩散，而且像政府、金融等对安全要求高的领域，启用它也是满足合规性的必要要求。</li>
</ol>
<h2 id="_3-下载nginx-curl是linux的字符界面的浏览器" tabindex="-1"><a class="header-anchor" href="#_3-下载nginx-curl是linux的字符界面的浏览器"><span>3.下载nginx curl是linux的字符界面的浏览器</span></a></h2>
<p>[root@web-1 wang]# <strong>curl -O</strong> <a href="https://nginx.org/download/nginx-1.28.1.tar.gz" target="_blank" rel="noopener noreferrer"><strong>https://nginx.org/download/nginx-1.28.1.tar.gz</strong></a></p>
<p>% Total % Received % Xferd Average Speed Time Time Time Current</p>
<p>Dload Upload Total Spent Left Speed</p>
<p>100 1252k 100 1252k 0 0 68529 0 0:00:18 0:00:18 --:--:-- 32857</p>
<p>[root@web-1 wang]# <strong>ls</strong></p>
<p>公共 模板 视频 图片 文档 下载 音乐 桌面 nginx-1.28.1.tar.gz</p>
<p>​</p>
<p><strong>虚拟机关机</strong> init 0</p>
<h2 id="编写一键安装脚本" tabindex="-1"><a class="header-anchor" href="#编写一键安装脚本"><span>编写一键安装脚本</span></a></h2>
<p>使用命令修改/etc/selinux/config 关闭selinux</p>
<p>​</p>
<p>[root@web-1 wang]# <strong>sed -i '/^SELINUX=/ s/enforcing/disabled/' /etc/selinux/config</strong></p>
<p>​</p>
<p>​</p>
<p>-i 作用是直接对文件进行操作/^SELINUX=/</p>
<p>​</p>
<p>查询以SELINUX开头的行</p>
<p>​</p>
<p>s/enforcing/disabled/'</p>
<p>​</p>
<p>进行替换操作，将enforcing替换为disabled</p>
<p>source在当前终端执行</p>
<p>​</p>
<div class="language-mermaid line-numbers-mode" data-highlighter="shiki" data-ext="mermaid" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-mermaid"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">flowchart LR</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n1["节点"]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n2["节点"]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n3["节点"]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n1 --> n2</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n2 -- "孙进程bash" --> n3</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n3 --> n1</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="/blog/assets/posts/nginx%E7%90%86%E8%AE%BA%E7%9F%A5%E8%AF%86-%E7%99%BD%E6%9D%BF-1.svg" alt="白板 1" tabindex="0" loading="lazy"><figcaption>白板 1</figcaption></figure>
<h3 id="nginx一键下载脚本" tabindex="-1"><a class="header-anchor" href="#nginx一键下载脚本"><span>nginx一键下载脚本</span></a></h3>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>#!/bin/bash</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#修改主机名</span></span>
<span class="line"><span>hostnamectl set-hostname $1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#su</span></span>
<span class="line"><span>#禁用firewalld和selinux</span></span>
<span class="line"><span>systemctl stop firewalld</span></span>
<span class="line"><span>systemctl disable firewalld</span></span>
<span class="line"><span></span></span>
<span class="line"><span>setenforce 0</span></span>
<span class="line"><span>sed -i '/^SELINUX=/ s/enforcing/disabled/' /etc/selinux/config</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#新建用户</span></span>
<span class="line"><span>useradd sc -c /sbin/nologin</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 创建目录并进入</span></span>
<span class="line"><span>mkdir -p /nginx</span></span>
<span class="line"><span>cd /nginx || exit  # 进入目录失败则直接退出</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo "开始下载 Nginx 1.28.1..."</span></span>
<span class="line"><span>curl -O https://nginx.org/download/nginx-1.28.1.tar.gz</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if [ $? -eq 0 ] &#x26;&#x26; [ -f "nginx-1.28.1.tar.gz" ]; then</span></span>
<span class="line"><span>    echo "nginx下载成功"</span></span>
<span class="line"><span>    sleep 2</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    echo "开始解压 Nginx 源码包..."</span></span>
<span class="line"><span>    tar xf nginx-1.28.1.tar.gz</span></span>
<span class="line"><span>    cd nginx-1.28.1 || echo "进入解压目录失败"</span></span>
<span class="line"><span>    echo "Nginx 源码包解压完成！"</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>    echo "❌ nginx下载失败！请检查网络或下载链接"</span></span>
<span class="line"><span>    exit 1 </span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#解决软件依赖</span></span>
<span class="line"><span>yum install gcc pcre2-devel openssl-devel zlib-devel -y</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#编译前的配置工作</span></span>
<span class="line"><span>./configure --prefix=/usr/local/nginx --with-http_ssl_module --with-http_v2_module --with-http_v3_module --with-http_sub_module --with-stream --with-stream_ssl_module --with-threads</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#编译</span></span>
<span class="line"><span>make -j 2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#编译安装</span></span>
<span class="line"><span>make install</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#修改环境变量</span></span>
<span class="line"><span>echo 'PATH=/usr/local/nginx/sbin:$PATH' >> /etc/bashrc</span></span>
<span class="line"><span>echo "nginx安装成功"</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#考虑nginx开机自启</span></span>
<span class="line"><span>echo '/usr/local/nginx/sbin/nginx' >>/etc/rc.local</span></span>
<span class="line"><span>chmod +x /etc/rc.d/rc.local</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p>
<p>解压nginx压缩包</p>
<p>bash</p>
<p>tar xf 被压缩的文件</p>
<p>​</p>
<h3 id="配置systemctl启动" tabindex="-1"><a class="header-anchor" href="#配置systemctl启动"><span>配置systemctl启动</span></a></h3>
<p>也可以使用systemd 管理 nginx 服务的核心配置文件</p>
<p>修改vim /usr/lib/systemd/system/nginx.service</p>
<p>​</p>
<p>添加</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>[Unit]</span></span>
<span class="line"><span>Description=nginx - high performance web server</span></span>
<span class="line"><span>Documentation=http://nginx.org/en/docs/</span></span>
<span class="line"><span>After=network-online.target remote-fs.target nss-lookup.target</span></span>
<span class="line"><span>Wants=network-online.target</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[Service]</span></span>
<span class="line"><span>Type=forking</span></span>
<span class="line"><span># 替换为你实际的Nginx启动路径和配置文件路径</span></span>
<span class="line"><span>ExecStart=/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf</span></span>
<span class="line"><span>ExecReload=/usr/local/nginx/sbin/nginx -s reload -c /usr/local/nginx/conf/nginx.conf</span></span>
<span class="line"><span>ExecStop=/usr/local/nginx/sbin/nginx -s stop</span></span>
<span class="line"><span># 防止进程残留</span></span>
<span class="line"><span>KillMode=process</span></span>
<span class="line"><span># 重启策略（异常时重启）</span></span>
<span class="line"><span>Restart=on-failure</span></span>
<span class="line"><span>RestartSec=5s</span></span>
<span class="line"><span># 权限配置</span></span>
<span class="line"><span>PrivateTmp=true</span></span>
<span class="line"><span>User=root</span></span>
<span class="line"><span>Group=root</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[Install]</span></span>
<span class="line"><span>WantedBy=multi-user.target</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p>
<h3 id="nginx文件目录及各个文件的意义" tabindex="-1"><a class="header-anchor" href="#nginx文件目录及各个文件的意义"><span>nginx文件目录及各个文件的意义</span></a></h3>
<p>auto <a href="http://CHANGES.ru" target="_blank" rel="noopener noreferrer">CHANGES.ru</a> conf contrib html man <a href="http://SECURITY.md" target="_blank" rel="noopener noreferrer">SECURITY.md</a><br>
CHANGES CODE_OF_CONDUCT.md configure <a href="http://CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">CONTRIBUTING.md</a> LICENSE <a href="http://README.md" target="_blank" rel="noopener noreferrer">README.md</a> src</p>
<p>​</p>
<p>src 存放nginx的源码包的文件夹 source code</p>
<p>conf 存放nginx的样例配置文件的目录</p>
<p>html 存放了默认的首页文件目录</p>
<p>configure 是编译前配置的脚本 --》给nginx在编译的时候传递参数，当编译的时候会使用这些参数</p>
<p>​</p>
<p>--prefix=PATH set installation prefix 安装路径</p>
<p>​</p>
<p>without-http disable HTTP server 禁用http功能</p>
<p>without-http-cache disable HTTP cache 禁用http缓存功能</p>
<p>with-mail enable POP3/IMAP4/SMTP proxy module 开启邮件功能成功</p>
<p>​</p>
<p>正则表达式 是一种方法，用来查询内容非常方便</p>
<p>正则表达式：将字母，数字，特殊符号组成一个公式，用来表达某个意思</p>
<p>echo &quot;rottttttwangzihan&quot;|egrep &quot;^root{4,6}&quot;</p>
<p>​</p>
<p>PCRE --》perl 语言发明了正则表达式</p>
<p>python --》支持正则</p>
<p>​</p>
<h3 id="配置组件" tabindex="-1"><a class="header-anchor" href="#配置组件"><span>配置组件</span></a></h3>
<p>编译安装3步曲</p>
<h4 id="_1-编译前的配置工作-本质上就是收集用户的需求信息-产生makefile文件" tabindex="-1"><a class="header-anchor" href="#_1-编译前的配置工作-本质上就是收集用户的需求信息-产生makefile文件"><span>1.编译前的配置工作，本质上就是收集用户的需求信息，产生Makefile文件</span></a></h4>
<p>[root@web-1 nginx-1.28.1]# ./configure --prefix=/usr/local/nginx1 --with-http_ssl_module --with-http_v2_module --with-http_v3_module --with-http_sub_module --with-stream --with-stream_ssl_module --with-threads</p>
<p>​</p>
<p>根据提示安装缺少的包</p>
<p>最后会创建一个 objs/Makefile文件</p>
<h4 id="_2-将nginx的c语言代码编译成二进制这种程序" tabindex="-1"><a class="header-anchor" href="#_2-将nginx的c语言代码编译成二进制这种程序"><span>2.将nginx的c语言代码编译成二进制这种程序</span></a></h4>
<p><strong>make -j 2</strong> 同时开启两个进程进行编译</p>
<h4 id="_3-编译安装-本质上就是将编译好的二进制程序和默认源码包里的文件和文件夹复制到指定的安装目录下" tabindex="-1"><a class="header-anchor" href="#_3-编译安装-本质上就是将编译好的二进制程序和默认源码包里的文件和文件夹复制到指定的安装目录下"><span>3.编译安装，本质上就是将编译好的二进制程序和默认源码包里的文件和文件夹复制到指定的安装目录下</span></a></h4>
<p><strong>make install</strong> 编译安装</p>
<p>什么是编译安装？为什么要编译安装？</p>
<p>​</p>
<p>C语言代码编译好了，为什么要编译</p>
<p>c语言是人类能识别的语言，但机器不认识，所以需要翻译成机器能够认识的语言</p>
<p>gcc</p>
<p>linux里的编译工具，可以将c语言程序转换为二进制程序</p>
<p>yum install gcc -y</p>
<p>gcc -o hello hello.c</p>
<p>源码文件 二进制文件</p>
<h4 id="编译安装的好处" tabindex="-1"><a class="header-anchor" href="#编译安装的好处"><span>编译安装的好处</span></a></h4>
<p>可以定制软件的功能，哪些功能开启1，哪些功能关闭，哪些功能禁用</p>
<p>好处：节约资源（cpu、内存）</p>
<p>可复用提高生产效率</p>
<p>​</p>
<h3 id="编译安装和yum安装文件存放位置的区别" tabindex="-1"><a class="header-anchor" href="#编译安装和yum安装文件存放位置的区别"><span>编译安装和yum安装文件存放位置的区别</span></a></h3>
<p>​</p>
<p>[root@web1 wang]# cd /usr/local/nginx1</p>
<p>[root@web1 nginx1]# ls</p>
<p>conf html logs sbin</p>
<p>conf 目录存放配置文件的 config</p>
<p>html 存放网页文件的目录</p>
<p>logs 存放nginx日志的目录</p>
<p>sbin 存放可执行程序的目录 super user used binary</p>
<p>​</p>
<h3 id="nginx开启root用户远程ssh登录" tabindex="-1"><a class="header-anchor" href="#nginx开启root用户远程ssh登录"><span>nginx开启root用户远程ssh登录</span></a></h3>
<p>1.修改配置文件vi /etc/ssh/sshd_config</p>
<p>将PermitRootLogin prohibit-password修改为yes</p>
<figure><img src="/blog/assets/posts/nginx%E7%90%86%E8%AE%BA%E7%9F%A5%E8%AF%86-3.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<p>2.重启ssh服务</p>
<p>systemctl restart sshd</p>
<p>​</p>
<p>​</p>
<p>netstat 核心命令：用于查看 Linux 系统的网络连接、路由表、端口监听等网络状态</p>
<p>​</p>
<p>netstat -anplut|grep nginx</p>
<p>​</p>
<p>​</p>
<h3 id="在不同主机间传输文件" tabindex="-1"><a class="header-anchor" href="#在不同主机间传输文件"><span>在不同主机间传输文件</span></a></h3>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>scp 文件名 root@目标ip:/root</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="修改nginx首页" tabindex="-1"><a class="header-anchor" href="#修改nginx首页"><span>修改nginx首页</span></a></h3>
<p>vim /usr/local/nginx/html/index.html</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>&#x3C;html></span></span>
<span class="line"><span>	&#x3C;head></span></span>
<span class="line"><span>		&#x3C;meta charset="UTF-8"></span></span>
<span class="line"><span>		&#x3C;title>/index&#x3C;/title></span></span>
<span class="line"><span>	&#x3C;/head></span></span>
<span class="line"><span>	&#x3C;body></span></span>
<span class="line"><span>		&#x3C;p>welcome to king^s web&#x3C;/p></span></span>
<span class="line"><span>		&#x3C;p>欢迎来到我的网站&#x3C;/p></span></span>
<span class="line"><span>    &#x3C;img src= width=500></span></span>
<span class="line"><span>	&#x3C;/body></span></span>
<span class="line"><span>&#x3C;/html></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="http协议" tabindex="-1"><a class="header-anchor" href="#http协议"><span>Http协议</span></a></h2>
<p>HTTP（HyperText Transfer Protocol，超文本传输协议）是一种基于 TCP/IP 的应用层协议，用于在客户端和服务器之间传输超文本数据（如 HTML、图片、视频、API 数据等），是万维网（WWW）的核心通信协议。</p>
<p>它的核心设计目标是实现客户端与服务器的无状态通信，即服务器不会保留客户端的连接状态，每次请求都被视为独立的新请求。</p>
<figure><img src="/blog/assets/posts/nginx%E7%90%86%E8%AE%BA%E7%9F%A5%E8%AF%86-%E7%99%BD%E6%9D%BF-2.svg" alt="白板 2" tabindex="0" loading="lazy"><figcaption>白板 2</figcaption></figure>
<h3 id="超文本-hypertext" tabindex="-1"><a class="header-anchor" href="#超文本-hypertext"><span>超文本（HyperText）</span></a></h3>
<p>超文本是<strong>带超链接的非线性信息组织形式</strong>，核心是通过链接将文本与其他文本、图片、网页等资源关联，打破传统文本的线性顺序，支持自由跳转，HTML 网页是其最典型的实现。</p>
<p>​</p>
<h3 id="page-view页面访问量" tabindex="-1"><a class="header-anchor" href="#page-view页面访问量"><span>page view页面访问量</span></a></h3>
<p>​</p>
<h3 id="html文件-相当于http的货物" tabindex="-1"><a class="header-anchor" href="#html文件-相当于http的货物"><span>Html文件，相当于http的货物</span></a></h3>
<p>​</p>
<h3 id="什么是url" tabindex="-1"><a class="header-anchor" href="#什么是url"><span>什么是URL</span></a></h3>
<p>URL（统一资源定位符）是<strong>互联网上资源的唯一地址</strong>，用来定位网页、文件、图片等内容，比如<code v-pre>https://www.baidu.com/index.html</code>，核心是通过 “协议 + 域名 / IP + 路径” 精准找到目标资源，是访问网络内容的 “地址标识”。</p>
<p>​</p>
<h3 id="uri-和-url-核心区别" tabindex="-1"><a class="header-anchor" href="#uri-和-url-核心区别"><span>URI 和 URL 核心区别</span></a></h3>
<p><strong>URI 是大概念，URL 是 URI 的子集</strong>，核心是<strong>范围不同、作用不同</strong>，一句话讲清：</p>
<ul>
<li><strong>URI</strong>（统一资源标识符）：<strong>唯一标识</strong>网络中某个资源的字符串（只负责「认出来」，不管怎么找）；</li>
<li><strong>URL</strong>（统一资源定位符）：<strong>不仅标识资源，还给出资源的具体访问地址 / 路径</strong>（既「认出来」，又「告诉你怎么找到」）。</li>
</ul>
<p>简单说：<strong>所有 URL 都是 URI，但不是所有 URI 都是 URL</strong>。</p>
<h3 id="关键维度对比-极简" tabindex="-1"><a class="header-anchor" href="#关键维度对比-极简"><span>关键维度对比（极简）</span></a></h3>
<table>
<thead>
<tr>
<th><strong>特性</strong></th>
<th><strong>URI</strong></th>
<th><strong>URL</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>核心作用</td>
<td>唯一<strong>标识</strong>资源</td>
<td>唯一<strong>定位</strong>资源</td>
</tr>
<tr>
<td>范围</td>
<td>大（包含 URL/URN）</td>
<td>小（URI 的子集）</td>
</tr>
<tr>
<td>核心信息</td>
<td>资源唯一标识</td>
<td>标识 + 访问协议 + 地址 + 路径</td>
</tr>
<tr>
<td>能否访问</td>
<td>不一定</td>
<td>可以直接访问</td>
</tr>
</tbody>
</table>
<h3 id="输入url一个回车背后发生了什么" tabindex="-1"><a class="header-anchor" href="#输入url一个回车背后发生了什么"><span>输入URL一个回车背后发生了什么</span></a></h3>
<p>访问<a href="http://www.jd.xn--comURL-5l2j09oe9gv0y6oty4b03bmy8a13xn6vhvfut8hjyam904owia" target="_blank" rel="noopener noreferrer">www.jd.com输入URL回车后，的访问流程：</a></p>
<ol>
<li><strong>解析URL+查本地缓存</strong>：浏览器识别域名，先查本地DNS/hosts缓存，无则发起DNS解析；</li>
<li><strong>DNS解析</strong>：通过本地DNS→根DNS→.com顶级DNS→京东权威DNS，获取域名对应服务器/CDN节点IP；</li>
<li><strong>建连接</strong>：先TCP三次握手建立连接，再TLS/SSL握手完成HTTPS加密（443端口）；</li>
<li><strong>发请求</strong>：浏览器向目标IP发送HTTP GET请求，申请首页资源；</li>
<li><strong>服务端响应</strong>：京东服务器（经负载均衡）处理请求，返回200响应+首页HTML主文档；</li>
<li><strong>渲染+加载资源</strong>：浏览器解析HTML生成DOM树，加载CSS/JS/图片等附属资源，渲染出完整京东首页，执行JS完成动态交互。</li>
</ol>
<p>核心：<strong>域名转IP→加密连接→请求数据→页面渲染</strong>，全程多协议协同、客户端与服务端/CDN的双向交互。</p>
<p>​</p>
<h3 id="cookie-session和token" tabindex="-1"><a class="header-anchor" href="#cookie-session和token"><span>cookie-session和token</span></a></h3>
<h3 id="一、核心定义-一句话概括" tabindex="-1"><a class="header-anchor" href="#一、核心定义-一句话概括"><span>一、核心定义（一句话概括）</span></a></h3>
<table>
<thead>
<tr>
<th><strong>概念</strong></th>
<th><strong>核心本质</strong></th>
<th><strong>存储位置</strong></th>
<th><strong>核心用途</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Cookie</strong></td>
<td>服务器下发给浏览器的「小型文本文件」，浏览器会自动保存并随请求携带</td>
<td>客户端（浏览器）</td>
<td>标识用户身份、保存少量状态（如登录状态、购物车）</td>
</tr>
<tr>
<td><strong>Session</strong></td>
<td>服务器端为每个用户创建的「内存 / 数据库存储的状态数据」，靠 Cookie 传递标识</td>
<td>服务端</td>
<td>存储用户会话信息（如登录后的用户信息、权限）</td>
</tr>
<tr>
<td><strong>Token</strong></td>
<td>服务器生成的「加密字符串凭证」，无固定存储位置，需手动携带</td>
<td>客户端（Cookie / 本地存储）+ 服务端验证</td>
<td>跨域 / 前后端分离场景下的身份认证（如 JWT）</td>
</tr>
</tbody>
</table>
<h3 id="二、核心关系-以登录京东为例" tabindex="-1"><a class="header-anchor" href="#二、核心关系-以登录京东为例"><span>二、核心关系（以登录京东为例）</span></a></h3>
<ol>
<li><strong>Cookie + Session 模式</strong>：</li>
</ol>
<ul>
<li>你登录京东，服务器验证账号密码后，创建 Session（存用户 ID、登录状态），生成 SessionID；</li>
<li>服务器把 SessionID 写入 Cookie 下发给浏览器，浏览器后续访问京东时，自动携带该 Cookie；</li>
<li>服务器通过 Cookie 里的 SessionID 找到对应的 Session，确认 “你是已登录的用户”。</li>
</ul>
<ol start="2">
<li><strong>Token 模式（京东移动端 / 接口）</strong>：</li>
</ol>
<ul>
<li>登录时服务器生成 Token（如 JWT，包含用户 ID + 过期时间，加密），返回给客户端；</li>
<li>客户端把 Token 存在本地（如 localStorage），后续调接口时手动放在请求头（<code v-pre>Authorization: Bearer xxx</code>）；</li>
<li>服务器验证 Token 合法性，无需存储 Session，直接解析出用户信息。</li>
</ul>
<p>​</p>
<h3 id="计算机网络知识" tabindex="-1"><a class="header-anchor" href="#计算机网络知识"><span>计算机网络知识</span></a></h3>
<h4 id="五层模型核心对应表" tabindex="-1"><a class="header-anchor" href="#五层模型核心对应表"><span>五层模型核心对应表</span></a></h4>
<table>
<thead>
<tr>
<th><strong>分层</strong></th>
<th><strong>核心作用</strong></th>
<th><strong>数据单元</strong></th>
<th><strong>核心协议</strong></th>
<th><strong>典型设备</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>应用层</td>
<td>面向用户，提供网络应用服务</td>
<td>报文</td>
<td>HTTP/HTTPS、DNS、FTP 等</td>
<td>主机（浏览器 / 服务器）</td>
</tr>
<tr>
<td>传输层</td>
<td>端到端的进程通信、资源分配</td>
<td>段 / 数据报</td>
<td>TCP、UDP</td>
<td>主机</td>
</tr>
<tr>
<td>网络层</td>
<td>跨网络的路径选择、IP 寻址</td>
<td>数据包</td>
<td>IP、ICMP、ARP、RARP</td>
<td>路由器、三层交换机</td>
</tr>
<tr>
<td>数据链路层</td>
<td>局域网内的 MAC 寻址、帧传输</td>
<td>帧</td>
<td>Ethernet（以太网）、ARP</td>
<td>交换机、网卡</td>
</tr>
<tr>
<td>物理层</td>
<td>传输二进制比特流、定义物理标准</td>
<td>比特流</td>
<td>无专属协议（仅物理标准）</td>
<td>集线器、网线 / 光纤</td>
</tr>
</tbody>
</table>
<h4 id="tcp和udp的区别" tabindex="-1"><a class="header-anchor" href="#tcp和udp的区别"><span>tcp和udp的区别</span></a></h4>
<p>TCP 和 UDP 是传输层两大核心协议，核心差异围绕<strong>连接性、可靠性、传输效率</strong>展开，极简梳理核心区别和适用场景：</p>
<h5 id="核心区别-一句话-关键维度" tabindex="-1"><a class="header-anchor" href="#核心区别-一句话-关键维度"><span>核心区别（一句话 + 关键维度）</span></a></h5>
<table>
<thead>
<tr>
<th><strong>特性</strong></th>
<th><strong>TCP</strong></th>
<th><strong>UDP</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>连接性</td>
<td>面向连接（需三次握手建立）</td>
<td>无连接（直接发，无需建立）</td>
</tr>
<tr>
<td>可靠性</td>
<td>可靠传输（确认、重传、排序）</td>
<td>不可靠传输（无确认，丢包不重传）</td>
</tr>
<tr>
<td>传输效率</td>
<td>低（头部大、有握手 / 重传开销）</td>
<td>高（头部小、无额外开销，速度快）</td>
</tr>
<tr>
<td>数据边界</td>
<td>无（流式传输，拼包 / 拆包）</td>
<td>有（按数据报传输，一次发一次收）</td>
</tr>
<tr>
<td>拥塞 / 流量控制</td>
<td>支持（避免网络拥塞、数据溢出）</td>
<td>不支持（无控制，易丢包）</td>
</tr>
<tr>
<td>资源占用</td>
<td>高（需维护连接状态、缓冲区）</td>
<td>低（无状态，无需维护）</td>
</tr>
</tbody>
</table>
<h5 id="极简总结" tabindex="-1"><a class="header-anchor" href="#极简总结"><span>极简总结</span></a></h5>
<ul>
<li><strong>TCP</strong>：稳而慢的 “快递”，先签单建连接，全程跟踪确保包裹完整、按序送达，丢件必补；</li>
<li><strong>UDP</strong>：快而简的 “平邮”，直接发件不签单，不保证送达 / 按序，胜在速度快、成本低。</li>
</ul>
<h5 id="典型适用场景" tabindex="-1"><a class="header-anchor" href="#典型适用场景"><span>典型适用场景</span></a></h5>
<ul>
<li>TCP：对可靠性要求高的场景（HTTP/HTTPS、FTP、SSH、邮件）；</li>
<li>UDP：对实时性要求高的场景（视频直播、语音通话、DNS、游戏、物联网报文）。</li>
</ul>
<p>​</p>
<h4 id="http和https" tabindex="-1"><a class="header-anchor" href="#http和https"><span>http和https</span></a></h4>
<h5 id="http-https-核心定义" tabindex="-1"><a class="header-anchor" href="#http-https-核心定义"><span>HTTP/HTTPS 核心定义</span></a></h5>
<ul>
<li><strong>HTTP</strong>：超文本传输协议，是客户端（浏览器）和服务端之间传输网页、数据的<strong>明文应用层协议</strong>，基于 TCP 实现，默认走 80 端口，是网页通信的基础。</li>
<li><strong>HTTPS</strong>：超文本传输安全协议，是<strong>HTTP + TLS/SSL</strong>的加密版本，在 HTTP 基础上通过 TLS/SSL 协议对传输数据加密，默认走 443 端口，解决了 HTTP 明文传输的安全问题。</li>
</ul>
<h5 id="核心区别-极简梳理" tabindex="-1"><a class="header-anchor" href="#核心区别-极简梳理"><span>核心区别（极简梳理）</span></a></h5>
<table>
<thead>
<tr>
<th><strong>特性</strong></th>
<th><strong>HTTP</strong></th>
<th><strong>HTTPS</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>传输安全性</td>
<td>明文传输，无加密</td>
<td>加密传输（TLS/SSL）</td>
</tr>
<tr>
<td>默认端口</td>
<td>80</td>
<td>443</td>
</tr>
<tr>
<td>证书要求</td>
<td>无需证书</td>
<td>需 CA 机构颁发的数字证书</td>
</tr>
<tr>
<td>传输速度</td>
<td>快（无加密开销）</td>
<td>稍慢（加解密耗时）</td>
</tr>
<tr>
<td>资源消耗</td>
<td>低</td>
<td>高（服务器加解密占用资源）</td>
</tr>
<tr>
<td>地址栏标识</td>
<td>无特殊标识 / 提示不安全</td>
<td>带🔒锁标、显示 HTTPS</td>
</tr>
<tr>
<td>核心作用</td>
<td>简单数据传输</td>
<td>安全传输（防窃取 / 篡改 / 冒充）</td>
</tr>
</tbody>
</table>
<h5 id="核心差异核心-https-的加密逻辑" tabindex="-1"><a class="header-anchor" href="#核心差异核心-https-的加密逻辑"><span>核心差异核心：HTTPS 的加密逻辑</span></a></h5>
<p>HTTPS 并非直接加密 HTTP，而是在<strong>TCP 三次握手后</strong>增加<strong>TLS/SSL 握手</strong>：</p>
<ol>
<li>客户端验证服务端的合法数字证书；</li>
<li>双方协商生成<strong>唯一的会话密钥</strong>；</li>
<li>后续所有 HTTP 数据，都通过该密钥<strong>对称加密</strong>后传输，第三方即使截获数据也无法解密。</li>
</ol>
<h5 id="适用场景" tabindex="-1"><a class="header-anchor" href="#适用场景"><span>适用场景</span></a></h5>
<ul>
<li><strong>HTTP</strong>：无敏感数据的静态页面、内部测试系统、纯展示类网站；</li>
<li><strong>HTTPS</strong>：所有涉及敏感数据的场景（登录、支付、购物、个人信息、接口通信），目前主流网站（如京东、百度）均强制使用 HTTPS。</li>
</ul>
<h5 id="终极极简总结" tabindex="-1"><a class="header-anchor" href="#终极极简总结"><span>终极极简总结</span></a></h5>
<ul>
<li>HTTP：裸奔的传输协议，快但不安全，数据可被随意截获篡改；</li>
<li>HTTPS：穿了 “加密防护衣” 的 HTTP，通过 TLS/SSL 实现安全传输，是目前互联网的主流标准。</li>
</ul>
<h4 id="http报文结构图" tabindex="-1"><a class="header-anchor" href="#http报文结构图"><span>http报文结构图</span></a></h4>
<h3 id="请求报文" tabindex="-1"><a class="header-anchor" href="#请求报文"><span>请求报文</span></a></h3>
<h4 id="post和get的区别" tabindex="-1"><a class="header-anchor" href="#post和get的区别"><span>post和get的区别</span></a></h4>
<h5 id="一、核心区别" tabindex="-1"><a class="header-anchor" href="#一、核心区别"><span>一、核心区别</span></a></h5>
<table>
<thead>
<tr>
<th><strong>特性</strong></th>
<th><strong>GET</strong></th>
<th><strong>POST</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>请求数据位置</td>
<td>URL 后（查询字符串，如 <code v-pre>?id=1</code>&lt;br&gt;）</td>
<td>请求体（Body）中（隐藏在报文里）</td>
</tr>
<tr>
<td>数据大小限制</td>
<td>有限制（依赖浏览器 / 服务器，通常几 KB）</td>
<td>无明确限制（由服务器配置决定）</td>
</tr>
<tr>
<td>缓存特性</td>
<td>可缓存（浏览器会保存历史记录）</td>
<td>不可缓存</td>
</tr>
<tr>
<td>安全性</td>
<td>低（数据暴露在 URL，易被截取）</td>
<td>高（数据在请求体，相对隐蔽）</td>
</tr>
<tr>
<td>幂等性</td>
<td>幂等（多次请求结果一致，如查数据）</td>
<td>非幂等（多次请求可能有副作用，如提交订单）</td>
</tr>
<tr>
<td>核心用途</td>
<td>从服务器<strong>获取</strong>数据</td>
<td>向服务器<strong>提交 / 修改</strong>数据</td>
</tr>
</tbody>
</table>
<h5 id="二、关键补充-易踩坑点" tabindex="-1"><a class="header-anchor" href="#二、关键补充-易踩坑点"><span>二、关键补充（易踩坑点）</span></a></h5>
<ol>
<li><strong>“安全性” 的误区</strong>：POST 仅 “相对安全”（数据不在 URL 暴露），但未加密的 HTTP 下，POST 数据仍可被截获；真正安全需结合 HTTPS。</li>
</ol>
<p>​</p>
<h3 id="查看nginx访问日志" tabindex="-1"><a class="header-anchor" href="#查看nginx访问日志"><span>查看nginx访问日志</span></a></h3>
<p>tail -f /usr/local/nginx/logs/access.log</p>
<p>​</p>
<h4 id="http报文结构图-1" tabindex="-1"><a class="header-anchor" href="#http报文结构图-1"><span>HTTP报文结构图</span></a></h4>
<figure><img src="/blog/assets/posts/nginx%E7%90%86%E8%AE%BA%E7%9F%A5%E8%AF%86-4.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h5 id="http的请求报文里的字段" tabindex="-1"><a class="header-anchor" href="#http的请求报文里的字段"><span>http的请求报文里的字段</span></a></h5>
<h6 id="头部字段" tabindex="-1"><a class="header-anchor" href="#头部字段"><span>头部字段</span></a></h6>
<p>Host 目标服务器域名或者ip地址</p>
<p>​</p>
<p>User-Agent 客户端标识（如浏览器类型）--》用户使用的浏览器或者其他工具</p>
<p>​</p>
<p>connection keep-alive表示目前处于长连接状态 closed连接已经关闭</p>
<p>​</p>
<p>Accept 表明客户端可以接受的响应格式（如application/json）--》浏览器可以接受哪些类型的数据</p>
<p>​</p>
<p>Accept-Encoding gzip，feflate --》浏览器可以接受压缩的数据，流量</p>
<h6 id="body字段" tabindex="-1"><a class="header-anchor" href="#body字段"><span>body字段</span></a></h6>
<p>HTTP 报文体（Body）无固定内置字段，<strong>内容 / 字段完全由业务自定义</strong>，格式由请求头 / 响应头的<code v-pre>Content-Type</code>指定，GET 无 Body，仅 POST/PUT/ 响应等有，核心常用形式极简总结：</p>
<ol>
<li><strong>表单键值对</strong>：<code v-pre>k1=v1&amp;k2=v2</code>，对应简单数据提交；</li>
<li><strong>JSON 对象 / 数组</strong>：多层自定义业务字段，前后端分离主流；</li>
<li><strong>分段式数据</strong>：含普通字段 + 文件二进制，用于文件上传；</li>
<li><strong>纯文本 / HTML / 二进制</strong>：响应体专属，如页面 HTML、图片 / 视频流。</li>
</ol>
<p>一句话：Body 是<strong>自定义业务数据的传输容器</strong>，格式靠<code v-pre>Content-Type</code>标识，字段随业务需求定。</p>
<h6 id="https-报文结构图" tabindex="-1"><a class="header-anchor" href="#https-报文结构图"><span>HTTPS 报文结构图</span></a></h6>
<figure><img src="/blog/assets/posts/nginx%E7%90%86%E8%AE%BA%E7%9F%A5%E8%AF%86-5.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<figure><img src="/blog/assets/posts/nginx%E7%90%86%E8%AE%BA%E7%9F%A5%E8%AF%86-%E7%99%BD%E6%9D%BF-3.svg" alt="白板 3" tabindex="0" loading="lazy"><figcaption>白板 3</figcaption></figure>
<h3 id="响应报文" tabindex="-1"><a class="header-anchor" href="#响应报文"><span>响应报文</span></a></h3>
<h4 id="header" tabindex="-1"><a class="header-anchor" href="#header"><span>header</span></a></h4>
<h5 id="响应状态码" tabindex="-1"><a class="header-anchor" href="#响应状态码"><span>响应状态码</span></a></h5>
<table>
<thead>
<tr>
<th><strong>态码分类</strong></th>
<th><strong>首位数字</strong></th>
<th><strong>核心作用</strong></th>
<th><strong>常用状态码</strong></th>
<th><strong>代码 + 描述</strong></th>
<th><strong>适用场景</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>信息性状态码</strong></td>
<td>1xx</td>
<td>临时响应，告知客户端<strong>请求已接收，正在处理</strong>，需继续等待最终响应</td>
<td>100、101</td>
<td>100 Continue101 Switching Protocols</td>
<td>100：客户端可继续发送请求体（大请求预检）101：服务端同意切换协议（如 HTTP 升级为 WebSocket）</td>
</tr>
<tr>
<td><strong>成功状态码</strong></td>
<td>2xx</td>
<td>告知客户端<strong>请求已成功接收、处理并返回结果</strong></td>
<td>200、201、204</td>
<td>200 OK201 Created204 No Content</td>
<td>200：通用成功（查询 / 获取数据、页面访问）201：资源创建成功（新增用户、发布文章）204：请求成功但<strong>无响应体</strong>（仅更新状态，无需返回数据）</td>
</tr>
<tr>
<td><strong>重定向状态码</strong></td>
<td>3xx</td>
<td>告知客户端<strong>请求的资源位置发生变化，需重新发起请求</strong></td>
<td>301、302、304</td>
<td>301 Moved Permanently302 Found304 Not Modified</td>
<td>301：永久重定向（域名更换、资源永久迁移）302：临时重定向（临时维护、页面跳转）304：协商缓存成功（资源未修改，客户端使用本地缓存）</td>
</tr>
<tr>
<td><strong>客户端错误码</strong></td>
<td>4xx</td>
<td>表示<strong>请求本身存在错误</strong>（语法 / 参数 / 权限），服务端无法处理</td>
<td>400、401、403、404、405</td>
<td>400 Bad Request401 Unauthorized403 Forbidden404 Not Found405 Method Not Allowed</td>
<td>400：请求参数 / 格式错误（如 JSON 解析失败）401：未登录 / 令牌失效（需身份认证）403：已登录但无操作权限404：请求的资源 / 接口不存在405：使用了服务端不支持的请求方法（如 GET 访问仅允许 POST 的接口）</td>
</tr>
<tr>
<td><strong>服务端错误码</strong></td>
<td>5xx</td>
<td>表示<strong>请求本身无错误</strong>，但服务端处理过程中发生异常 / 故障</td>
<td>500、502、503、504</td>
<td>500 Internal Server Error502 Bad Gateway503 Service Unavailable504 Gateway Timeout</td>
<td>500：服务端未知内部错误（代码 bug、数据库异常）502：网关 / 反向代理收到无效响应（如 Nginx 转发到异常的后端服务）503：服务端暂时不可用（维护、过载）504：网关 / 反向代理请求超时（后端服务响应过慢）</td>
</tr>
</tbody>
</table>
<h4 id="body" tabindex="-1"><a class="header-anchor" href="#body"><span>body</span></a></h4>
<h5 id="nginx代理网站时怎么隐藏nginx版本" tabindex="-1"><a class="header-anchor" href="#nginx代理网站时怎么隐藏nginx版本"><span>nginx代理网站时怎么隐藏nginx版本</span></a></h5>
<h5 id="隐藏版本号-保留-server-nginx" tabindex="-1"><a class="header-anchor" href="#隐藏版本号-保留-server-nginx"><span>隐藏版本号（保留 <code v-pre>Server: nginx</code>）</span></a></h5>
<p>这是最常用的方式，仅隐藏具体版本号，保留服务器标识。</p>
<p><strong>编辑 Nginx 主配置文件</strong>（如 <code v-pre>/etc/nginx/nginx.conf</code> 或 <code v-pre>/usr/local/nginx/conf/nginx.conf</code>）：nginx</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>http {</span></span>
<span class="line"><span>    # 添加或修改该配置</span></span>
<span class="line"><span>    server_tokens off;</span></span>
<span class="line"><span>    ...</span></span>
<span class="line"><span>}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>重启 Nginx</strong> 使配置生效：bash运行</li>
</ul>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 系统包安装（YUM/APT）</span></span>
<span class="line"><span>systemctl restart nginx</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 编译安装</span></span>
<span class="line"><span>/usr/local/nginx/sbin/nginx -s reload</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>效果：响应头会从 <code v-pre>Server: nginx/1.28.1</code> 变为 <code v-pre>Server: nginx</code>。</li>
</ul>
<figure><img src="/blog/assets/posts/nginx%E7%90%86%E8%AE%BA%E7%9F%A5%E8%AF%86-6.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<p>content-length 41266 响应报文返回的内容的数据大小</p>
<p>content-type image/jpeg 返回的内容的类型</p>
<p>date Thu, 22 Jan 2026 12:04:18 GMT 返回响应报文的时间</p>
<p>etag &quot;696f905f-64bfb&quot; 资 源的<strong>唯一标识（哈希值 / 版本号）</strong></p>
<p>last-modified Tue, 20 Jan 2026 14:25:35 GMT 资源（如图片、文件）在服务端的<strong>最后修改时间</strong></p>
<p>server nginx/1.28.1 web服务器采用的软件的名字以及版本</p>
<h4 id="" tabindex="-1"><a class="header-anchor" href="#"><span></span></a></h4>
<p>http：80</p>
<p>http：443</p>
<h2 id="nginx" tabindex="-1"><a class="header-anchor" href="#nginx"><span>nginx</span></a></h2>
<h3 id="nginx主配置文件" tabindex="-1"><a class="header-anchor" href="#nginx主配置文件"><span>nginx主配置文件</span></a></h3>
<p>配置文件采用层级化的块式结构</p>
<p>编译安装存放在 cd /usr/local/nginx下</p>
<p>​</p>
<p>​</p>
<h3 id="全局块" tabindex="-1"><a class="header-anchor" href="#全局块"><span>全局块</span></a></h3>
<h4 id="evnents块" tabindex="-1"><a class="header-anchor" href="#evnents块"><span>evnents块</span></a></h4>
<p>#核心作用：Nginx 性能调优的关键配置区域之一，主要负责管理 Nginx 与客户端的网络连接建立、处理的底层参数，决定了 Nginx 如何高效地应对并发连接请求</p>
<p># 事件驱动配置块</p>
<p>events {</p>
<p># 指定事件驱动模型（Linux 优先 epoll）</p>
<p>use epoll;</p>
<p># 单个工作进程最大并发连接数</p>
<p>worker_connections 65535;</p>
<p># 开启批量接收新连接</p>
<p>multi_accept on;</p>
<p># 限制工作进程最大文件描述符数量</p>
<p>worker_rlimit_nofile 65535;</p>
<p>}</p>
<h4 id="http块" tabindex="-1"><a class="header-anchor" href="#http块"><span>http块</span></a></h4>
<p>#核心作用：Nginx 配置的核心应用层配置区域，主要负责管理 HTTP/HTTPS 相关的所有配置（包括请求处理、响应返回、反向代理、缓存等），配置会全局生效（可被下属的 server 块、location 块继承或覆盖）</p>
<p>http {</p>
<p>#引入 Nginx 预设的 MIME 类型映射配置文件</p>
<p>include mime.types;</p>
<p>​</p>
<p>#隐藏nginx版本号</p>
<p>server_tokens off;</p>
<p>#定义 Nginx 无法识别文件扩展名时，默认返回的 MIME 类型</p>
<p>default_type application/octet-stream;</p>
<p>#定义 Nginx 访问日志的格式，并为该格式命名（此处命名为 main）</p>
<p>#位置在./nginx/logs</p>
<p>log_format main '$remote_addr - $remote_user [$time_local] &quot;$request&quot; '</p>
<p>'$status $body_bytes_sent &quot;$http_referer&quot; '</p>
<p>'&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;';</p>
<p>#启用高效文件传输模式</p>
<p>sendfile on;</p>
<p>#保持长连接</p>
<p>keepalive_timeout 65;</p>
<p>​</p>
<p>}</p>
<h4 id="常用的访问日志字段" tabindex="-1"><a class="header-anchor" href="#常用的访问日志字段"><span>常用的访问日志字段</span></a></h4>
<p>常用的访问日志字段</p>
<p>$remote_addr</p>
<p>​</p>
<p>客户端的真实 IP 地址（发起请求的客户端 / 代理服务器的 IP）</p>
<p>$remote_user</p>
<p>​</p>
<p>客户端认证的用户名（仅当开启 HTTP 基础认证时才有值，否则为 -）</p>
<p>$time_local</p>
<p>​</p>
<p>本地服务器的访问时间（格式：dd/MMM/yyyy:HH:mm:ss ±zzzz，如 23/Jan/2026:10:30:00 +0800）</p>
<p>$request</p>
<p>​</p>
<p>客户端的完整请求信息（包括「请求方法」「请求 URL」「HTTP 协议版本」），如 GET /api/user HTTP/1.1</p>
<p>$status</p>
<p>​</p>
<p>Nginx 返回给客户端的 HTTP 状态码（如 200成功、404未找到、500服务器内部错误）</p>
<p>$body_bytes_sent</p>
<p>​</p>
<p>Nginx 发送给客户端的响应体大小（不包括响应头，单位：字节）</p>
<p>$http_referer</p>
<p>​</p>
<p>来源页面（即客户端是从哪个 URL 跳转到当前请求 URL 的），如 <a href="https://www.baidu.com/s?wd=nginx" target="_blank" rel="noopener noreferrer">https://www.baidu.com/s?wd=nginx</a>，无来源时为 -</p>
<p>$http_user_agent</p>
<p>​</p>
<p>客户端的用户代理信息（包括浏览器类型、版本、操作系统等），如 Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36</p>
<p>$http_x_forwarded_for</p>
<p>​</p>
<p>客户端的真实 IP 地址（多级反向代理场景下），用于穿透代理获取原始客户端 IP，无代理时为 -</p>
<h4 id="upstream块" tabindex="-1"><a class="header-anchor" href="#upstream块"><span>upstream块</span></a></h4>
<h5 id="server块" tabindex="-1"><a class="header-anchor" href="#server块"><span>server块</span></a></h5>
<p>server {</p>
<p>listen 80; #监听端口</p>
<p>server_name <a href="http://www.feng.com" target="_blank" rel="noopener noreferrer">www.feng.com</a>; ：#域名</p>
<p>access_log logs/feng.com.access.log main; #访问日志</p>
<p>location / { #网页目录位置</p>
<p>root html/feng.com;</p>
<p>index index.html index.htm;</p>
<p>}</p>
<p>#设置错误状态码指向的页面</p>
<p>error_page 404 /404.html; #404页面</p>
<p>​</p>
<p># redirect server error pages to the static page /50x.html</p>
<h1 id="-1" tabindex="-1"><a class="header-anchor" href="#-1"><span></span></a></h1>
<p>error_page 500 502 503 504 /50x.html;</p>
<p>location = /50x.html {</p>
<p>root html;</p>
<p>}</p>
<p>​</p>
<h2 id="检查配置文件" tabindex="-1"><a class="header-anchor" href="#检查配置文件"><span>检查配置文件</span></a></h2>
<p>修改配置文件需要测试一下防止进程死掉</p>
<p>nginx -t</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>[root@web2 conf]# nginx -t</span></span>
<span class="line"><span>nginx: the configuration file /usr/local/nginx/conf/nginx.conf syntax is ok</span></span>
<span class="line"><span>nginx: configuration file /usr/local/nginx/conf/nginx.conf test is successful</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p>
<h3 id="nginx-conf" tabindex="-1"><a class="header-anchor" href="#nginx-conf"><span>nginx.conf</span></a></h3>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>#user  nobody;</span></span>
<span class="line"><span>worker_processes  2;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#error_log  logs/error.log;</span></span>
<span class="line"><span>#error_log  logs/error.log  notice;</span></span>
<span class="line"><span>#error_log  logs/error.log  info;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#pid        logs/nginx.pid;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>events {</span></span>
<span class="line"><span>    worker_connections  1024;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>http {</span></span>
<span class="line"><span>    include       mime.types;</span></span>
<span class="line"><span>    default_type  application/octet-stream;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '</span></span>
<span class="line"><span>    #                  '$status $body_bytes_sent "$http_referer" '</span></span>
<span class="line"><span>    #                  '"$http_user_agent" "$http_x_forwarded_for"';</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    #access_log  logs/access.log  main;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    sendfile        on;</span></span>
<span class="line"><span>    #tcp_nopush     on;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    #keepalive_timeout  0;</span></span>
<span class="line"><span>    keepalive_timeout  65;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    #gzip  on;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    server {</span></span>
<span class="line"><span>        listen       80;</span></span>
<span class="line"><span>        server_name  localhost;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        #charset koi8-r;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        #access_log  logs/host.access.log  main;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        location / {</span></span>
<span class="line"><span>            root   html;</span></span>
<span class="line"><span>            index  index.html index.htm;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        #error_page  404              /404.html;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # redirect server error pages to the static page /50x.html</span></span>
<span class="line"><span>        #</span></span>
<span class="line"><span>        error_page   500 502 503 504  /50x.html;</span></span>
<span class="line"><span>        location = /50x.html {</span></span>
<span class="line"><span>            root   html;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # proxy the PHP scripts to Apache listening on 127.0.0.1:80</span></span>
<span class="line"><span>        #</span></span>
<span class="line"><span>        #location ~ \\.php$ {</span></span>
<span class="line"><span>        #    proxy_pass   http://127.0.0.1;</span></span>
<span class="line"><span>        #}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000</span></span>
<span class="line"><span>        #</span></span>
<span class="line"><span>        #location ~ \\.php$ {</span></span>
<span class="line"><span>        #    root           html;</span></span>
<span class="line"><span>        #    fastcgi_pass   127.0.0.1:9000;</span></span>
<span class="line"><span>        #    fastcgi_index  index.php;</span></span>
<span class="line"><span>        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;</span></span>
<span class="line"><span>        #    include        fastcgi_params;</span></span>
<span class="line"><span>        #}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # deny access to .htaccess files, if Apache's document root</span></span>
<span class="line"><span>        # concurs with nginx's one</span></span>
<span class="line"><span>        #</span></span>
<span class="line"><span>        #location ~ /\\.ht {</span></span>
<span class="line"><span>        #    deny  all;</span></span>
<span class="line"><span>        #}</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # another virtual host using mix of IP-, name-, and port-based configuration</span></span>
<span class="line"><span>    #</span></span>
<span class="line"><span>    #server {</span></span>
<span class="line"><span>    #    listen       8000;</span></span>
<span class="line"><span>    #    listen       somename:8080;</span></span>
<span class="line"><span>    #    server_name  somename  alias  another.alias;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    #    location / {</span></span>
<span class="line"><span>    #        root   html;</span></span>
<span class="line"><span>    #        index  index.html index.htm;</span></span>
<span class="line"><span>    #    }</span></span>
<span class="line"><span>    #}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # HTTPS server</span></span>
<span class="line"><span>    #</span></span>
<span class="line"><span>    #server {</span></span>
<span class="line"><span>    #    listen       443 ssl;</span></span>
<span class="line"><span>    #    server_name  localhost;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    #    ssl_certificate      cert.pem;</span></span>
<span class="line"><span>    #    ssl_certificate_key  cert.key;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    #    ssl_session_cache    shared:SSL:1m;</span></span>
<span class="line"><span>    #    ssl_session_timeout  5m;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    #    ssl_ciphers  HIGH:!aNULL:!MD5;</span></span>
<span class="line"><span>    #    ssl_prefer_server_ciphers  on;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    #    location / {</span></span>
<span class="line"><span>    #        root   html;</span></span>
<span class="line"><span>    #        index  index.html index.htm;</span></span>
<span class="line"><span>    #    }</span></span>
<span class="line"><span>    #}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="查看cpu有几个核心" tabindex="-1"><a class="header-anchor" href="#查看cpu有几个核心"><span>查看cpu有几个核心</span></a></h4>
<p>top 再按1</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>top </span></span>
<span class="line"><span>top - 21:54:21 up  7:24,  3 users,  load average: 0.00, 0.00, 0.00</span></span>
<span class="line"><span>Tasks: 161 total,   1 running, 160 sleeping,   0 stopped,   0 zombie</span></span>
<span class="line"><span>%Cpu0  :  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st </span></span>
<span class="line"><span>%Cpu1  :  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st </span></span>
<span class="line"><span>MiB Mem :   2606.7 total,   2064.4 free,    385.3 used,    315.4 buff/cache     </span></span>
<span class="line"><span>MiB Swap:   2048.0 total,   2048.0 free,      0.0 used.   2221.4 avail Mem </span></span>
<span class="line"><span></span></span>
<span class="line"><span>    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND           </span></span>
<span class="line"><span>    927 root      20   0  331104  17908  15064 S   0.3   0.7   0:01.07 NetworkManager    </span></span>
<span class="line"><span>   3286 root      20   0   10416   5464   3324 R   0.3   0.2   0:00.03 top               </span></span>
<span class="line"><span>      1 root      20   0   22752  13856   9612 S   0.0   0.5   0:02.15 systemd           </span></span>
<span class="line"><span>      2 root      20   0       0      0      0 S   0.0   0.0   0:00.02 kthreadd          </span></span>
<span class="line"><span>      3 root      20   0       0      0      0 S   0.0   0.0   0:00.00 pool_workqueue_re+</span></span>
<span class="line"><span>      4 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 kworker/R-rcu_gp  </span></span>
<span class="line"><span>      5 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 kworker/R-sync_wq </span></span>
<span class="line"><span>      6 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 kworker/R-slub_fl+</span></span>
<span class="line"><span>      7 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 kworker/R-netns   </span></span>
<span class="line"><span>     10 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 kworker/0:0H-even+</span></span>
<span class="line"><span>     12 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 kworker/R-mm_perc+</span></span>
<span class="line"><span>     14 root      20   0       0      0      0 I   0.0   0.0   0:00.00 rcu_tasks_kthread </span></span>
<span class="line"><span>[root@web1 conf]#</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="为什么进程数要和cpu核心数一致" tabindex="-1"><a class="header-anchor" href="#为什么进程数要和cpu核心数一致"><span>为什么进程数要和cpu核心数一致</span></a></h4>
<p>核心目的是<strong>让 CPU 核心满负荷并行工作，避免进程切换开销，最大化利用 CPU 资源</strong>。CPU 核心数是硬件并行处理的上限，进程数与之一致时，每个核心可独立运行一个进程，无空闲核心、无进程竞争 CPU，也不会因进程过多引发频繁的上下文切换（切换会消耗 CPU 资源、降低效率），实现 CPU 利用率最优。</p>
<figure><img src="/blog/assets/posts/nginx%E7%90%86%E8%AE%BA%E7%9F%A5%E8%AF%86-7.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<p>#user nobody;</p>
<p>worker_processes auto;</p>
<h3 id="查看当前-shell-进程的所有资源限制" tabindex="-1"><a class="header-anchor" href="#查看当前-shell-进程的所有资源限制"><span>查看当前 Shell 进程的所有资源限制</span></a></h3>
<p>ulimit -a</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>[root@web2 conf]# ulimit -a</span></span>
<span class="line"><span>real-time non-blocking time  (microseconds, -R) unlimited</span></span>
<span class="line"><span>core file size              (blocks, -c) unlimited</span></span>
<span class="line"><span>data seg size               (kbytes, -d) unlimited</span></span>
<span class="line"><span>scheduling priority                 (-e) 0</span></span>
<span class="line"><span>file size                   (blocks, -f) unlimited</span></span>
<span class="line"><span>pending signals                     (-i) 10217</span></span>
<span class="line"><span>max locked memory           (kbytes, -l) 8192</span></span>
<span class="line"><span>max memory size             (kbytes, -m) unlimited</span></span>
<span class="line"><span>open files                          (-n) 1024</span></span>
<span class="line"><span>pipe size                (512 bytes, -p) 8</span></span>
<span class="line"><span>POSIX message queues         (bytes, -q) 819200</span></span>
<span class="line"><span>real-time priority                  (-r) 0</span></span>
<span class="line"><span>stack size                  (kbytes, -s) 8192</span></span>
<span class="line"><span>cpu time                   (seconds, -t) unlimited</span></span>
<span class="line"><span>max user processes                  (-u) 10217</span></span>
<span class="line"><span>virtual memory              (kbytes, -v) unlimited</span></span>
<span class="line"><span>file locks                          (-x) unlimited</span></span>
<span class="line"><span>[root@web2 conf]#</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="计算nginx最大连接数" tabindex="-1"><a class="header-anchor" href="#计算nginx最大连接数"><span>计算nginx最大连接数</span></a></h3>
<p>worker_process*worker_connections=2*1024=2048</p>
<p>进程数*最大连接数</p>
<h3 id="日志级别-0-7" tabindex="-1"><a class="header-anchor" href="#日志级别-0-7"><span>日志级别（0~7）</span></a></h3>
<table>
<thead>
<tr>
<th><strong>数字</strong></th>
<th><strong>字符串标识</strong></th>
<th><strong>含义</strong></th>
<th><strong>适用场景</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>0</td>
<td>emerg/panic</td>
<td>紧急 / 系统不可用</td>
<td>系统核心故障，如内核崩溃、硬件致命错误，所有用户都会收到通知</td>
</tr>
<tr>
<td>1</td>
<td>alert</td>
<td>告警 / 必须立即处理</td>
<td>严重错误，不处理会导致系统瘫痪，如磁盘满、关键服务崩溃</td>
</tr>
<tr>
<td>2</td>
<td>crit</td>
<td>严重 / 临界错误</td>
<td>严重故障，部分功能失效，如数据库连接失败、权限致命错误</td>
</tr>
<tr>
<td>3</td>
<td>err/error</td>
<td>错误</td>
<td>普通运行错误，功能异常但不影响系统整体，如文件读写失败、接口调用报错</td>
</tr>
<tr>
<td>4</td>
<td>warning/warn</td>
<td>警告</td>
<td>潜在风险，未发生错误但需关注，如磁盘空间不足 80%、配置项不规范</td>
</tr>
<tr>
<td>5</td>
<td>notice</td>
<td>通知</td>
<td>正常但重要的事件，如服务启动 / 停止、用户登录、配置加载完成</td>
</tr>
<tr>
<td>6</td>
<td>info</td>
<td>信息</td>
<td>普通运行信息，如程序正常执行日志、访问记录、状态更新</td>
</tr>
<tr>
<td>7</td>
<td>debug</td>
<td>调试</td>
<td>调试细节，如变量值、函数调用、详细执行流程，<strong>生产环境一般关闭</strong></td>
</tr>
</tbody>
</table>
<h3 id="host文件是ip映射文件" tabindex="-1"><a class="header-anchor" href="#host文件是ip映射文件"><span>Host文件是ip映射文件</span></a></h3>
<h4 id="如果windows需要连接kafka集群也需要修改hosts的ip地址映射" tabindex="-1"><a class="header-anchor" href="#如果windows需要连接kafka集群也需要修改hosts的ip地址映射"><span>如果windows需要连接kafka集群也需要修改hosts的ip地址映射</span></a></h4>
<p>​</p>
<p>window连接需要在本地修改 C:\\Windows\\System32\\drivers\\etc\\hosts 文件添加映射（需要管理员权限）</p>
<h3 id="清理dns缓存" tabindex="-1"><a class="header-anchor" href="#清理dns缓存"><span>清理DNS缓存</span></a></h3>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>ipconfig /flushdns  # 执行后提示 "成功刷新DNS解析缓存"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>​</p>
<p>浏览器也可能保存原来网站映射的cookie导致下修改后的映射无法ping通</p>
<p>所有要删除浏览器的cookie</p>
<p>​</p>
<h3 id="增加一个虚拟主机" tabindex="-1"><a class="header-anchor" href="#增加一个虚拟主机"><span>增加一个虚拟主机</span></a></h3>
<p>在/usr/local/nginx/conf/nginx.conf中再添加一个server字段（必须在第一个server的花括号后）</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span> server {</span></span>
<span class="line"><span>        listen       80;</span></span>
<span class="line"><span>        server_name  localhost;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        #charset koi8-r;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        access_log  logs/feng.com.access.log  main;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        location / {</span></span>
<span class="line"><span>            root   html/feng.com;</span></span>
<span class="line"><span>            index  index.html index.htm;</span></span>
<span class="line"><span>            #rewrite ^/(.*) http://www.baidu.com/$1  redirct</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>         error_page  404              /404.html;	#这个/的根目录是html/feng.com</span></span>
<span class="line"><span>         #/404.html  --》/usr/local/nginx/html/feng.com/50x.html</span></span>
<span class="line"><span>}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一个nginx可以打开多个网站，这样可以节约资源</p>
<p>​</p>
<h3 id="服务中创建的日志文件位置" tabindex="-1"><a class="header-anchor" href="#服务中创建的日志文件位置"><span>服务中创建的日志文件位置</span></a></h3>
<p>[root@web1 ~]# cd /usr/local/nginx/logs</p>
<p>[root@web1 logs]# ls</p>
<p>access.log error.log feng.com.access.log nginx.pid wang.com.access.log</p>
<p><strong>​</strong></p>
<h2 id="大并发" tabindex="-1"><a class="header-anchor" href="#大并发"><span>大并发</span></a></h2>
<p>系统同时处理<strong>大量客户端连接 / 请求</strong>（如 Nginx 同时处理万级 HTTP 请求），传统 “一连接一进程 / 线程” 模型因资源开销过高无法支撑，需依赖 I/O 多路复用技术解决。</p>
<h3 id="i-o-多路复用" tabindex="-1"><a class="header-anchor" href="#i-o-多路复用"><span>I/O 多路复用</span></a></h3>
<p>核心是<strong>单个进程 / 线程同时监听多个 I/O 连接</strong>，仅当连接就绪（可读 / 可写）时才处理，用少量资源支撑大量并发，是大并发场景的核心解决方案。</p>
<h3 id="select-poll-epoll-linux-下-i-o-多路复用技术演进" tabindex="-1"><a class="header-anchor" href="#select-poll-epoll-linux-下-i-o-多路复用技术演进"><span>select/poll/epoll（Linux 下 I/O 多路复用技术演进）</span></a></h3>
<table>
<thead>
<tr>
<th><strong>技术</strong></th>
<th><strong>核心特点</strong></th>
<th><strong>适用场景</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>select</td>
<td>最早实现，FD 数量限 1024，内核全量遍历 FD、用户态需轮询，效率低</td>
<td>低并发（几百连接）</td>
</tr>
<tr>
<td>poll</td>
<td>取消 FD 数量限制，但仍需内核全量遍历、用户态轮询，未解决核心效率问题</td>
<td>中并发（几千连接）、兼容老系统</td>
</tr>
<tr>
<td>epoll</td>
<td>Linux 2.6 + 引入，无 FD 数量限制，内核回调通知就绪 FD、用户态仅处理就绪连接，O (1) 效率</td>
<td>高并发（万级～百万级），Nginx/Redis 等首选</td>
</tr>
</tbody>
</table>
<figure><img src="/blog/assets/posts/nginx%E7%90%86%E8%AE%BA%E7%9F%A5%E8%AF%86-8.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h4 id="fd是什么" tabindex="-1"><a class="header-anchor" href="#fd是什么"><span>FD是什么</span></a></h4>
<p>FD 是 <strong>File Descriptor（文件描述符）</strong> 的缩写，是 Linux/Unix 系统中<strong>用于标识 “打开的文件 / 资源” 的整数编号</strong>。</p>
<p>​</p>
<p>可以把它理解成：系统给每个 “正在使用的资源” 分配的「身份证号」—— 不管是普通文件、网络连接、管道、设备（如网卡），只要被进程打开 / 创建，内核就会分配一个唯一的 FD 来标识它，进程后续操作这个资源（读 / 写 / 关闭），都通过这个数字来指定。</p>
<h3 id="核心总结" tabindex="-1"><a class="header-anchor" href="#核心总结"><span>核心总结</span></a></h3>
<ol>
<li>大并发需 I/O 多路复用突破 “一连接一进程” 的资源瓶颈；</li>
<li>select/poll 是基础版，核心问题是 “全量遍历” 导致高并发下效率低；</li>
<li>epoll 是高性能版，通过 “就绪通知 + 零拷贝 + 无数量限制” 成为大并发场景最优解。</li>
</ol>
<p>​</p>
<p>​</p>
<h3 id="linux中文件备份" tabindex="-1"><a class="header-anchor" href="#linux中文件备份"><span>linux中文件备份</span></a></h3>
<h4 id="cp" tabindex="-1"><a class="header-anchor" href="#cp"><span>cp</span></a></h4>
<p>适合快速备份单个配置文件或小型目录，操作简单无需额外安装</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 1. 备份单个文件（推荐加 .bak 后缀标识备份）</span></span>
<span class="line"><span>cp -a /etc/nginx/nginx.conf /etc/nginx/nginx.conf.bak  # -a：保留权限、时间戳</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 2. 备份目录（含子目录）</span></span>
<span class="line"><span>cp -a /etc/nginx /etc/nginx.bak  # 备份 Nginx 整个配置目录</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 3. 覆盖备份前先确认（避免误删）</span></span>
<span class="line"><span>cp -i /etc/nginx/nginx.conf /etc/nginx/nginx.conf.bak  # -i：覆盖前提示</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="tar" tabindex="-1"><a class="header-anchor" href="#tar"><span>tar</span></a></h4>
<p>支持打包目录、压缩（gzip/bzip2）、增量备份，适合大多数场景（如备份 Kafka 数据目录、Elasticsearch 索引）</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 1. 打包+压缩备份（推荐 .tar.gz 格式，压缩率高）</span></span>
<span class="line"><span>tar -zcvf /backup/kafka_data_$(date +%Y%m%d).tar.gz /var/lib/kafka  # 备份 Kafka 数据目录</span></span>
<span class="line"><span># 参数说明：</span></span>
<span class="line"><span># -z：用 gzip 压缩；-c：创建归档；-v：显示过程；-f：指定备份文件名；$(date +%Y%m%d)：自动添加日期后缀</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 2. 备份配置文件+排除无用目录（如 Nginx 日志目录）</span></span>
<span class="line"><span>tar -zcvf /backup/nginx_all_$(date +%Y%m%d).tar.gz /etc/nginx --exclude=/etc/nginx/logs</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 3. 增量备份（仅备份上次备份后变更的文件）</span></span>
<span class="line"><span># 第一步：创建全量备份（基础备份）</span></span>
<span class="line"><span>tar -zcvf /backup/es_full_20240520.tar.gz /var/lib/elasticsearch</span></span>
<span class="line"><span># 第二步：创建增量备份（基于全量备份的变更）</span></span>
<span class="line"><span>tar -zcvf /backup/es_incr_20240521.tar.gz --newer-mtime=2024-05-20 /var/lib/elasticsearch</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 4. 恢复备份（解压）</span></span>
<span class="line"><span>tar -zxvf /backup/kafka_data_20240520.tar.gz -C /  # -C：指定恢复到根目录（原路径）</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="rsync" tabindex="-1"><a class="header-anchor" href="#rsync"><span>rsync</span></a></h4>
<p><code v-pre>rsync</code> 是 Linux 下高性能的增量备份工具，支持 “仅同步变更文件”，且能保留文件权限、时间戳，还可通过 SSH 实现异地备份（如备份到远程服务器），适合核心数据的定时备份</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 1. 本地增量备份（备份 Kafka 数据到本地备份目录）</span></span>
<span class="line"><span>rsync -avz /var/lib/kafka /backup/kafka_backup/  # -a：归档模式（保留属性）；-v：显示过程；-z：压缩传输</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 2. 异地备份（通过 SSH 备份到远程服务器 192.168.245.150）</span></span>
<span class="line"><span>rsync -avz /var/lib/elasticsearch root@192.168.245.150:/remote/backup/es/</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 3. 定时增量备份（结合 crontab，每天凌晨 2 点执行）</span></span>
<span class="line"><span># 编辑定时任务</span></span>
<span class="line"><span>crontab -e</span></span>
<span class="line"><span># 添加以下内容（每天 2 点备份 ES 数据到远程服务器）</span></span>
<span class="line"><span>0 2 * * * /usr/bin/rsync -avz /var/lib/elasticsearch root@192.168.245.150:/remote/backup/es/ > /var/log/es_backup.log 2>&#x26;1</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="nginx工作流程" tabindex="-1"><a class="header-anchor" href="#nginx工作流程"><span>nginx工作流程</span></a></h3>
<figure><img src="/blog/assets/posts/nginx%E7%90%86%E8%AE%BA%E7%9F%A5%E8%AF%86-9.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<p>​</p>
<h4 id="设置开机自启" tabindex="-1"><a class="header-anchor" href="#设置开机自启"><span>设置开机自启</span></a></h4>
<p>如果配置了systemd</p>
<p>直接systemctl enable nginx</p>
<p>​</p>
<p>如果没有需要去修改配置文件</p>
<p>vim /etc/rc.local</p>
<p>添加 /usr/local/nginx/sbin/nginx</p>
<figure><img src="/blog/assets/posts/nginx%E7%90%86%E8%AE%BA%E7%9F%A5%E8%AF%86-10.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h2 id="域名" tabindex="-1"><a class="header-anchor" href="#域名"><span>域名</span></a></h2>
<h3 id="一、域名的核心定义" tabindex="-1"><a class="header-anchor" href="#一、域名的核心定义"><span>一、域名的核心定义</span></a></h3>
<p>域名是<strong>互联网上标识网站 / 服务器的易记字符地址</strong>，是 IP 地址（如 192.168.1.1）的 “人性化别名”，通过 DNS（域名系统）解析可映射到真实 IP，让用户无需记忆复杂数字就能访问网络资源。简单说：IP 是服务器的 “身份证号”，域名是服务器的 “门牌号 / 名字”。</p>
<h3 id="二、域名的结构-从右到左-层级递减" tabindex="-1"><a class="header-anchor" href="#二、域名的结构-从右到左-层级递减"><span>二、域名的结构（从右到左，层级递减）</span></a></h3>
<p>域名采用<strong>分层级的点分结构</strong>，核心分为 3 部分，以<code v-pre>www.baidu.com</code>为例：</p>
<ol>
<li><strong>根域</strong>：最顶层，用<code v-pre>.</code>表示，通常省略；</li>
<li><strong>顶级域（TLD）</strong>：最右侧的后缀，域名的 “大类”，如<code v-pre>com</code>（商业）、<code v-pre>cn</code>（中国国家顶级域）、<code v-pre>org</code>（非盈利）、<code v-pre>net</code>（网络服务）；</li>
<li><strong>二级域</strong>：顶级域左侧的核心字符，是<strong>域名的主体</strong>，具有唯一性，如<code v-pre>baidu</code>（百度的核心标识）；</li>
<li><strong>子域</strong>：二级域左侧的自定义字符，可无限创建，如<code v-pre>www</code>（通用网页子域）、<code v-pre>mail</code>（邮箱子域，如<code v-pre>mail.baidu.com</code>）。</li>
</ol>
<p><strong>核心规则</strong>：同一顶级域下，二级域唯一（比如<code v-pre>baidu.com</code>被注册后，其他人不能再注册）；子域由域名所有者自由定义，无唯一性限制。</p>
<h3 id="三、域名的命名规则-强制规范-通用建议" tabindex="-1"><a class="header-anchor" href="#三、域名的命名规则-强制规范-通用建议"><span>三、域名的命名规则（强制规范 + 通用建议）</span></a></h3>
<h4 id="一-强制技术规范-所有域名必须遵守-否则无法注册-解析" tabindex="-1"><a class="header-anchor" href="#一-强制技术规范-所有域名必须遵守-否则无法注册-解析"><span>（一）<strong>强制技术规范</strong>（所有域名必须遵守，否则无法注册 / 解析）</span></a></h4>
<ol>
<li><strong>字符范围</strong>：</li>
</ol>
<ul>
<li>英文域名：只能包含<strong>a-z 小写字母</strong>、<strong>0-9 数字</strong>、<strong>连字符 -</strong>（中横线）；</li>
<li>中文域名：可包含中文字符 + 上述英文字符（需支持中文解析的 DNS）；</li>
</ul>
<ol start="2">
<li><strong>字符限制</strong>：</li>
</ol>
<ul>
<li>二级域长度：<strong>3-63 个字符</strong>（英文 / 数字 / 连字符，一个中文字符算 2 个）；</li>
<li>完整域名（含所有层级）总长度≤253 个字符；</li>
</ul>
<ol start="3">
<li><strong>特殊限制</strong>：</li>
</ol>
<ul>
<li>连字符<code v-pre>-</code><strong>不能出现在开头 / 结尾</strong>，也不能<strong>连续出现</strong>（如<code v-pre>abc--123.com</code>无效）；</li>
<li>不能包含空格、下划线_、斜杠 /、特殊符号（!@#$% 等）；</li>
<li>数字可混合使用，但纯数字域名（如<code v-pre>123.com</code>）允许注册；</li>
</ul>
<ol start="4">
<li><strong>大小写无关</strong>：域名不区分大小写（<code v-pre>Baidu.com</code>和<code v-pre>baidu.com</code>是同一个域名），注册后系统自动统一为小写。</li>
</ol>
<h4 id="二-通用命名建议-易记、易传播、适配业务-实操核心" tabindex="-1"><a class="header-anchor" href="#二-通用命名建议-易记、易传播、适配业务-实操核心"><span>（二）<strong>通用命名建议</strong>（易记、易传播、适配业务，实操核心）</span></a></h4>
<p>这是域名命名的核心技巧，兼顾<strong>品牌性、实用性、SEO 优化</strong>，分通用型和场景型：</p>
<h5 id="_1-通用核心原则-所有场景通用" tabindex="-1"><a class="header-anchor" href="#_1-通用核心原则-所有场景通用"><span>1. 通用核心原则（所有场景通用）</span></a></h5>
<ul>
<li><strong>简洁短小</strong>：越短越好，避免过长字符（如<code v-pre>taobao.com</code>比<code v-pre>taobaowangdian.com</code>易记）；</li>
<li><strong>易读易拼</strong>：避免生僻字、谐音混淆、连续重复字符（如<code v-pre>zhizun.com</code>比<code v-pre>zhizunzhe.com</code>易拼，避免<code v-pre>ssss.com</code>）；</li>
<li><strong>贴合品牌 / 业务</strong>：优先使用品牌名、产品名、核心业务词（如<code v-pre>jd.com</code>对应京东，<code v-pre>zhihu.com</code>对应知乎，<code v-pre>cloud.tencent.com</code>对应腾讯云）；</li>
<li><strong>避免歧义</strong>：不用多音、多义字符，避免英文拼写错误（如<code v-pre>aliexpress.com</code>而非<code v-pre>aliexprees.com</code>）；</li>
<li><strong>避开侵权</strong>：不使用知名品牌、商标、名人姓名（如<code v-pre>tmall123.com</code>可能侵权天猫，会被投诉注销）。</li>
</ul>
<h5 id="_2-不同场景的命名技巧" tabindex="-1"><a class="header-anchor" href="#_2-不同场景的命名技巧"><span>2. 不同场景的命名技巧</span></a></h5>
<table>
<thead>
<tr>
<th><strong>适用场景</strong></th>
<th><strong>命名方法</strong></th>
<th><strong>示例</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>企业官方站</td>
<td>品牌全称 / 缩写 + 顶级域</td>
<td><code v-pre>huawei.com</code>&lt;br&gt;、<code v-pre>hw.cn</code></td>
</tr>
<tr>
<td>个人博客 / 自媒体</td>
<td>姓名 / 昵称 + 顶级域</td>
<td><code v-pre>lixiaolong.com</code></td>
</tr>
<tr>
<td>行业平台</td>
<td>核心业务词 + 顶级域</td>
<td><code v-pre>fang.com</code>&lt;br&gt;（房产）</td>
</tr>
<tr>
<td>功能型子域</td>
<td>功能词 + 主域名</td>
<td><code v-pre>pay.aliyun.com</code>&lt;br&gt;（支付）</td>
</tr>
</tbody>
</table>
<h4 id="三-避坑点" tabindex="-1"><a class="header-anchor" href="#三-避坑点"><span>（三）<strong>避坑点</strong></span></a></h4>
<ol>
<li>不要注册与知名域名高度相似的 “仿冒域名”（如<code v-pre>bajdu.com</code>仿<code v-pre>baidu.com</code>），不仅易被投诉，还会降低用户信任；</li>
<li>连字符<code v-pre>-</code>尽量少用，用户输入时容易遗漏（如<code v-pre>ai-edu.com</code>不如<code v-pre>aiedu.com</code>）；</li>
<li>避免使用数字替代字母的谐音（如<code v-pre>5188.com</code>可，但<code v-pre>ba1du.com</code>易拼错）；</li>
<li>优先选择主流顶级域（<code v-pre>com</code>/<code v-pre>cn</code>/<code v-pre>com.cn</code>），小众顶级域（如<code v-pre>xyz</code>/<code v-pre>top</code>）虽便宜，但用户辨识度低。</li>
</ol>
<h3 id="四、常见顶级域的选择建议-按使用场景" tabindex="-1"><a class="header-anchor" href="#四、常见顶级域的选择建议-按使用场景"><span>四、常见顶级域的选择建议（按使用场景）</span></a></h3>
<ol>
<li><strong>.com</strong>：全球通用，商业属性最强，<strong>企业 / 商业项目首选</strong>，辨识度和价值最高；</li>
<li><strong>.cn</strong>：中国国家顶级域，适合面向国内用户的网站，需实名认证；</li>
<li><strong>.</strong><a href="https://com.cn" target="_blank" rel="noopener noreferrer"><strong>com.cn</strong></a>：结合<code v-pre>com</code>和<code v-pre>cn</code>，国内企业常用，同样需实名认证；</li>
<li><strong>.org</strong>：非盈利组织、公益项目专用，商业项目不建议使用；</li>
<li><strong>.net</strong>：原用于网络服务提供商，现可通用，优先级低于<code v-pre>com</code>；</li>
<li><strong>. 行业专属域</strong>：如<code v-pre>.shop</code>（电商）、<code v-pre>.tech</code>（科技）、<code v-pre>.edu</code>（教育机构，仅限官方注册），适合垂直领域。</li>
</ol>
<p>​</p>
<p>​</p>
<h2 id="linux中的配置静态ip地址问题" tabindex="-1"><a class="header-anchor" href="#linux中的配置静态ip地址问题"><span>Linux中的配置静态ip地址问题</span></a></h2>
<h3 id="dhcp-核心概念与工作原理" tabindex="-1"><a class="header-anchor" href="#dhcp-核心概念与工作原理"><span>DHCP 核心概念与工作原理</span></a></h3>
<p>DHCP（Dynamic Host Configuration Protocol，动态主机配置协议）是一种<strong>局域网网络协议</strong>，核心作用是<strong>自动为接入网络的设备分配 IP 地址、子网掩码、网关、DNS 服务器</strong>等网络配置信息，避免手动配置的繁琐和 IP 冲突问题，实现网络设备的 “即插即用”。</p>
<p>​</p>
<p>​</p>
<div class="language-mermaid line-numbers-mode" data-highlighter="shiki" data-ext="mermaid" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-mermaid"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">flowchart LR</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n1["互联网"]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n2["笔记本"]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n3["路由器"]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n4["LAN"]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n5["WAN"]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n6["ISP，电信，移动联通"]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n2 -- "接局域网的接口：local area network" --> n4</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n5 --> n6</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n6 --> n1</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="/blog/assets/posts/nginx%E7%90%86%E8%AE%BA%E7%9F%A5%E8%AF%86-%E7%99%BD%E6%9D%BF-4.svg" alt="白板 4" tabindex="0" loading="lazy"><figcaption>白板 4</figcaption></figure>
<p>1.动态获得 --》DHCP服务器给我们分配ip地址</p>
<p>2.静态配置</p>
<p>​</p>
<p>LAN 局域网 local area network</p>
<p>WAN 广域网（外网）</p>
<p>WLAN 无线局域网 wireless local area network</p>
<p>​</p>
<h2 id="linux中如何配置静态ip地址" tabindex="-1"><a class="header-anchor" href="#linux中如何配置静态ip地址"><span>linux中如何配置静态ip地址</span></a></h2>
<h3 id="rokcy-centos" tabindex="-1"><a class="header-anchor" href="#rokcy-centos"><span>rokcy，centos</span></a></h3>
<p>centos</p>
<p>rocky linux</p>
<p>ubuntu</p>
<p>​</p>
<h3 id="一、前置准备-必做" tabindex="-1"><a class="header-anchor" href="#一、前置准备-必做"><span>一、前置准备（必做）</span></a></h3>
<ol>
<li><strong>获取网卡名与连接名</strong>bash运行</li>
</ol>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>ip a  # 查看网卡名（如ens160、eth0）</span></span>
<span class="line"><span>nmcli connection show  # 查看NetworkManager连接名（关键，避免改错配置）</span></span>
<span class="line"><span>ip route show		#查看网关信息</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p>
<p>​</p>
<h3 id="二、方法一-nmcli-命令行-推荐-即时生效" tabindex="-1"><a class="header-anchor" href="#二、方法一-nmcli-命令行-推荐-即时生效"><span>二、方法一：nmcli 命令行（推荐，即时生效）</span></a></h3>
<p><strong>修改连接为静态模式并配置参数</strong>（替换连接名与示例值）</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>nmcli con mod "ens160" \\</span></span>
<span class="line"><span>ipv4.method manual \\</span></span>
<span class="line"><span>ipv4.addresses "192.168.245.151/24" \\</span></span>
<span class="line"><span>ipv4.gateway "192.168.245.2" \\</span></span>
<span class="line"><span>ipv4.dns "114.114.114.114,8.8.8.8" \\</span></span>
<span class="line"><span>ipv4.ignore-auto-dns yes  # 禁用DHCP自动DNS，确保手动DNS生效</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>重启连接使配置生效</strong></p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>nmcli c reload</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><strong>修改后出现断连，进入虚拟机输入</strong></p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>nmcli d status</span></span>
<span class="line"><span>nmcli d up ens160</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="方法二-手动编辑-nmconnection-配置文件" tabindex="-1"><a class="header-anchor" href="#方法二-手动编辑-nmconnection-配置文件"><span>方法二：手动编辑 nmconnection 配置文件</span></a></h3>
<p><strong>编辑 NetworkManager 配置文件</strong>（路径固定，文件名 = 连接名.nmconnection）</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>vim /etc/NetworkManager/system-connections/ens160.nmconnection</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><strong>修改 [ipv4] 段内容</strong>（保留其他段，仅改 ipv4 部分）</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>[ipv4]</span></span>
<span class="line"><span>method=manual  # 手动模式（静态）</span></span>
<span class="line"><span>addresses1=192.168.1.100/24,192.168.1.1  # IP/掩码,网关</span></span>
<span class="line"><span>dns=114.114.114.114;8.8.8.8;  # DNS用分号分隔</span></span>
<span class="line"><span>ignore-auto-dns=true</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>修复文件权限（关键，否则配置不生效）</strong>bash运行</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>chmod 600 /etc/NetworkManager/system-connections/ens160.nmconnection</span></span>
<span class="line"><span>chown root:root /etc/NetworkManager/system-connections/ens160.nmconnection</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>重新加载网络配置</strong></p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>nmcli c reload</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><strong>修改后出现断连，进入虚拟机输入</strong></p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>nmcli d status</span></span>
<span class="line"><span>nmcli d up ens160</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ubuntu如何去手工配置静态ip地址" tabindex="-1"><a class="header-anchor" href="#ubuntu如何去手工配置静态ip地址"><span>Ubuntu如何去手工配置静态ip地址</span></a></h2>
<h3 id="第一步-确认你的网卡名称" tabindex="-1"><a class="header-anchor" href="#第一步-确认你的网卡名称"><span>第一步：确认你的网卡名称</span></a></h3>
<p>在改配置之前，你得知道你要改哪张网卡。</p>
<p>输入以下命令：</p>
<p>Bash</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>ip addr</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>找到类似 <code v-pre>enp0s3</code> 或 <code v-pre>eth0</code> 这样的名字。记住它，下面会用到。</p>
<hr>
<h3 id="第二步-找到-netplan-配置文件" tabindex="-1"><a class="header-anchor" href="#第二步-找到-netplan-配置文件"><span>第二步：找到 Netplan 配置文件</span></a></h3>
<p>Netplan 的配置文件通常在 <code v-pre>/etc/netplan/</code> 目录下，后缀是 <code v-pre>.yaml</code>。</p>
<p>列出文件：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>ls /etc/netplan/</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>常见的文件名可能是 <code v-pre>01-netcfg.yaml</code>、<code v-pre>50-cloud-init.yaml</code> 或 <code v-pre>00-installer-config.yaml</code>。</p>
<h3 id="第三步-编辑配置文件" tabindex="-1"><a class="header-anchor" href="#第三步-编辑配置文件"><span>第三步：编辑配置文件</span></a></h3>
<p>使用 <code v-pre>vim</code>（或者你喜欢的编辑器）打开它。<strong>注意：修改前建议先备份。</strong></p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>vim nano /etc/netplan/你的文件名.yaml</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>将内容修改为如下结构（请根据你的实际网络环境替换 IP）：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>network:</span></span>
<span class="line"><span>  version: 2</span></span>
<span class="line"><span>  renderer: networkd  # 如果是桌面版，这里通常是 NetworkManager</span></span>
<span class="line"><span>  ethernets:</span></span>
<span class="line"><span>    ens33:           # 替换为你第一步看到的网卡名</span></span>
<span class="line"><span>      dhcp4: no       # 关闭 IPv4 的 DHCP</span></span>
<span class="line"><span>      addresses:</span></span>
<span class="line"><span>        - 192.168.1.100/24  # 你想设置的静态 IP 及掩码</span></span>
<span class="line"><span>      routes:</span></span>
<span class="line"><span>        - to: default</span></span>
<span class="line"><span>          via: 192.168.1.1  # 你的网关地址（通常是路由器 IP）</span></span>
<span class="line"><span>      nameservers:</span></span>
<span class="line"><span>        addresses: [8.8.8.8, 114.114.114.114] # DNS 地址</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>[!CAUTION] <strong>避坑指南：</strong></p>
<ol>
<li><strong>缩进：</strong> YAML 文件必须使用<strong>空格</strong>缩进，严禁使用 Tab 键，否则会报错。</li>
<li><strong>冒号：</strong> 每个冒号后面通常都要有一个空格（例如 <code v-pre>dhcp4: no</code>）。</li>
</ol>
<hr>
<h3 id="第四步-测试并应用" tabindex="-1"><a class="header-anchor" href="#第四步-测试并应用"><span>第四步：测试并应用</span></a></h3>
<p>在正式应用之前，先让 Netplan 帮你检查一下语法是否有误：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>sudo netplan try</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>如果配置没问题，它会提示你按回车确认。如果没报错，直接执行应用：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>sudo netplan apply</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><hr>
<h3 id="验证结果" tabindex="-1"><a class="header-anchor" href="#验证结果"><span>验证结果</span></a></h3>
<p>最后，检查一下 IP 是否已经变过来了：</p>
<p>Bash</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>ip addr show ens33# 替换为你的网卡名</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>基于IP的虚拟主机 一个网站对应一个公网ip</p>
<p>基于端口的虚拟主机 一个网站对应一个端口</p>
<p>​</p>
<p>优点：节省服务器，省钱</p>
<p>缺点：一台虚拟服务器受到攻击，其他的会受到牵连</p>
<p>​</p>
<p>共用cpu，磁盘，带宽，如果一台服务器访问量特别大，会导致其他网站访问时候异常</p>
<h2 id="nginx实现下载功能" tabindex="-1"><a class="header-anchor" href="#nginx实现下载功能"><span>nginx实现下载功能</span></a></h2>
<p>在html下建立一个download文件夹，将可供下载文件添加进去</p>
<p>然后去nginx主配置文件nginx.conf中的server中添加autoindex on;</p>
<p>​</p>
<h4 id="创建文件夹" tabindex="-1"><a class="header-anchor" href="#创建文件夹"><span>创建文件夹</span></a></h4>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>cd /usr/local/nginx/html/wang.com</span></span>
<span class="line"><span>mkdir download</span></span>
<span class="line"><span>vim index.html.back			#添加一些文件</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="修改配置文件" tabindex="-1"><a class="header-anchor" href="#修改配置文件"><span>修改配置文件</span></a></h4>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>server {</span></span>
<span class="line"><span>        listen       80;</span></span>
<span class="line"><span>        server_name  www.wang.com;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        #charset koi8-r;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        access_log  logs/wang.com.access.log  main;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        location / {</span></span>
<span class="line"><span>            root   html/wang.com;</span></span>
<span class="line"><span>            index  index.html index.htm;</span></span>
<span class="line"><span>            autoindex on;						#开启autoindex on可让目录显示文件列表</span></span>
<span class="line"><span>            #rewrite ^/(.*) http://www.baidu.com/$1  redirct</span></span>
<span class="line"><span>        }</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p>
<h4 id="重新加载配置文件" tabindex="-1"><a class="header-anchor" href="#重新加载配置文件"><span>重新加载配置文件</span></a></h4>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>nginx -t				#测试配置文件如果没有问题再加载配置文件</span></span>
<span class="line"><span>nginx -s reload			#重新加载配置文件</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h3>
<ol>
<li>访问<code v-pre>/download/</code>目录时，Nginx 优先找<code v-pre>index</code>指令指定的<code v-pre>index.html</code>等文件，你目录中无匹配文件，该配置失效；</li>
<li><code v-pre>autoindex</code>默认关闭，Nginx 既无首页文件可返回，又不能显示目录文件列表，因此返回 403；</li>
<li>开启<code v-pre>autoindex on</code>，Nginx 会展示目录内文件列表，既解决 403 问题，也适配下载目录让用户直观下载文件的需求。</li>
</ol>
<p>​</p>
<p>​</p>
<p>​</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};