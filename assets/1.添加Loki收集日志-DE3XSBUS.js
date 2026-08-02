import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%BF%90%E7%BB%B4/web%E9%9B%86%E7%BE%A4/web%E9%9B%86%E7%BE%A4%E9%A1%B9%E7%9B%AE/%E4%B9%9D%E3%80%81AIops%E6%94%B9%E9%80%A0/1.%E6%B7%BB%E5%8A%A0Loki%E6%94%B6%E9%9B%86%E6%97%A5%E5%BF%97.html","title":"1.添加Loki收集日志","lang":"zh-CN","frontmatter":{"title":"1.添加Loki收集日志","icon":"server","date":"2026-07-23T00:00:00.000Z","category":["运维"],"description":"Loki是什么？ Loki 是和 Prometheus 配套的轻量日志系统，Prometheus 管监控指标，Loki 管日志存储与查询，共用 Grafana 展示。 启动 Docker 版 Grafana 和 Loki 删除之前的grafana容器（如果之前安装过） 安装Grafana 和 Loki 打通“三方”数据链路 现在你的“大脑”组件已经就位...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"1.添加Loki收集日志\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/1.%E6%B7%BB%E5%8A%A0Loki%E6%94%B6%E9%9B%86%E6%97%A5%E5%BF%97-1.png\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%BF%90%E7%BB%B4/web%E9%9B%86%E7%BE%A4/web%E9%9B%86%E7%BE%A4%E9%A1%B9%E7%9B%AE/%E4%B9%9D%E3%80%81AIops%E6%94%B9%E9%80%A0/1.%E6%B7%BB%E5%8A%A0Loki%E6%94%B6%E9%9B%86%E6%97%A5%E5%BF%97.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"1.添加Loki收集日志"}],["meta",{"property":"og:description","content":"Loki是什么？ Loki 是和 Prometheus 配套的轻量日志系统，Prometheus 管监控指标，Loki 管日志存储与查询，共用 Grafana 展示。 启动 Docker 版 Grafana 和 Loki 删除之前的grafana容器（如果之前安装过） 安装Grafana 和 Loki 打通“三方”数据链路 现在你的“大脑”组件已经就位..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/1.%E6%B7%BB%E5%8A%A0Loki%E6%94%B6%E9%9B%86%E6%97%A5%E5%BF%97-1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":5.62,"words":1686},"filePathRelative":"posts/运维/web集群/web集群项目/九、AIops改造/1.添加Loki收集日志.md","excerpt":"<h2>Loki是什么？</h2>\\n<p>Loki 是和 Prometheus 配套的轻量日志系统，Prometheus 管监控指标，Loki 管日志存储与查询，共用 Grafana 展示。</p>\\n<h3>启动 Docker 版 Grafana 和 Loki</h3>\\n<h4>删除之前的grafana容器（如果之前安装过）</h4>\\n<div class=\\"language-plain line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"plain\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code class=\\"language-plain\\"><span class=\\"line\\"><span>docker rm -f grafana</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`),i={name:`1.添加Loki收集日志.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><h2 id="loki是什么" tabindex="-1"><a class="header-anchor" href="#loki是什么"><span>Loki是什么？</span></a></h2>
<p>Loki 是和 Prometheus 配套的轻量日志系统，Prometheus 管监控指标，Loki 管日志存储与查询，共用 Grafana 展示。</p>
<h3 id="启动-docker-版-grafana-和-loki" tabindex="-1"><a class="header-anchor" href="#启动-docker-版-grafana-和-loki"><span>启动 Docker 版 Grafana 和 Loki</span></a></h3>
<h4 id="删除之前的grafana容器-如果之前安装过" tabindex="-1"><a class="header-anchor" href="#删除之前的grafana容器-如果之前安装过"><span>删除之前的grafana容器（如果之前安装过）</span></a></h4>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>docker rm -f grafana</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h4 id="安装grafana-和-loki" tabindex="-1"><a class="header-anchor" href="#安装grafana-和-loki"><span>安装Grafana 和 Loki</span></a></h4>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 创建一个简单的 docker-compose.yml</span></span>
<span class="line"><span>cat > docker-compose-logging.yml &#x3C;&#x3C;EOF</span></span>
<span class="line"><span>services:</span></span>
<span class="line"><span>  loki:</span></span>
<span class="line"><span>    image: grafana/loki:latest</span></span>
<span class="line"><span>    container_name: loki</span></span>
<span class="line"><span>    ports:</span></span>
<span class="line"><span>      - "3100:3100"</span></span>
<span class="line"><span>    restart: always</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  grafana:</span></span>
<span class="line"><span>    image: grafana/grafana:latest</span></span>
<span class="line"><span>    container_name: grafana</span></span>
<span class="line"><span>    ports:</span></span>
<span class="line"><span>      - "3000:3000"</span></span>
<span class="line"><span>    restart: always</span></span>
<span class="line"><span>EOF</span></span>
<span class="line"><span></span></span>
<span class="line"><span>docker compose -f docker-compose-logging.yml up -d</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="打通-三方-数据链路" tabindex="-1"><a class="header-anchor" href="#打通-三方-数据链路"><span>打通“三方”数据链路</span></a></h3>
<p>现在你的“大脑”组件已经就位，我们需要在网页上把它们串起来：</p>
<ol>
<li><strong>访问 Grafana</strong>： 浏览器输入 <code v-pre>http://192.168.31.136:3000</code> (账号密码 admin/admin)。</li>
<li><strong>添加二进制 Prometheus（核心步骤）</strong>：</li>
</ol>
<ul>
<li><code v-pre>Connections</code> -&gt; <code v-pre>Data Sources</code> -&gt; <code v-pre>Add data source</code> -&gt; <code v-pre>Prometheus</code>。</li>
<li><strong>URL 填写</strong>：<code v-pre>http://192.168.31.136:9090</code> (注意：这是你二进制 Prometheus 的宿主机地址)。</li>
<li>点击 <code v-pre>Save &amp; test</code>。</li>
</ul>
<ol start="3">
<li><strong>添加 Docker Loki</strong>：</li>
</ol>
<ul>
<li>再点 <code v-pre>Add data source</code> -&gt; <code v-pre>Loki</code>。</li>
<li><strong>URL 填写</strong>：<code v-pre>http://loki:3100</code> (因为它们在同一个 Compose 网络里，直接写名字就行)。</li>
<li>点击 <code v-pre>Save &amp; test</code>。</li>
</ul>
<h2 id="配置-promtail-和nginx-export" tabindex="-1"><a class="header-anchor" href="#配置-promtail-和nginx-export"><span>配置 Promtail 和Nginx export</span></a></h2>
<h3 id="补齐nginx核心模块" tabindex="-1"><a class="header-anchor" href="#补齐nginx核心模块"><span>补齐nginx核心模块</span></a></h3>
<p>你需要用获取nginx_status的数据需要安装 with-http_stub_status_module 模块我们之前是没有安装的</p>
<h4 id="_1-寻找源码并重新编译" tabindex="-1"><a class="header-anchor" href="#_1-寻找源码并重新编译"><span>1. 寻找源码并重新编译</span></a></h4>
<p>如果你不记得源码在哪，可以尝试用 <code v-pre>find / -name &quot;nginx-1.28.1&quot; -type d</code> 找一下。找到后执行以下步骤：</p>
<p><strong>重新配置</strong>：</p>
<p>在源码目录下执行，务必加上刚才缺失的模块：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>./configure --prefix=/usr/local/nginx \\</span></span>
<span class="line"><span>--with-http_ssl_module \\</span></span>
<span class="line"><span>--with-http_v2_module \\</span></span>
<span class="line"><span>--with-http_v3_module \\</span></span>
<span class="line"><span>--with-http_sub_module \\</span></span>
<span class="line"><span>--with-stream \\</span></span>
<span class="line"><span>--with-stream_ssl_module \\</span></span>
<span class="line"><span>--with-threads \\</span></span>
<span class="line"><span>--with-http_stub_status_module</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>编译（只make）</strong></p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>make</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h4 id="_2-替换旧的二进制文件" tabindex="-1"><a class="header-anchor" href="#_2-替换旧的二进制文件"><span>2.替换旧的二进制文件</span></a></h4>
<p>编译完成后，我们需要将新生成的二进制文件移动到运行目录。</p>
<p><strong>备份原有的 nginx 程序</strong>：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>cp /usr/local/nginx/sbin/nginx /usr/local/nginx/sbin/nginx.bak</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><strong>替换程序</strong>（即使 Nginx 正在运行也可以直接覆盖，Linux 支持此操作）：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>cp -f objs/nginx /usr/local/nginx/sbin/nginx</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><hr>
<h4 id="_3-验证并重启" tabindex="-1"><a class="header-anchor" href="#_3-验证并重启"><span>3.验证并重启</span></a></h4>
<p>现在我们来验证 Nginx 是否已经识别了 <code v-pre>stub_status</code> 指令。</p>
<p><strong>测试配置文件</strong>：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>/usr/local/nginx/sbin/nginx -t</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>如果显示 <code v-pre>syntax is ok</code> 和 <code v-pre>test is successful</code>，说明模块加载成功了！</p>
<p><strong>平滑重启</strong>：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>/usr/local/nginx/sbin/nginx</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><hr>
<h4 id="_4-最终确认" tabindex="-1"><a class="header-anchor" href="#_4-最终确认"><span>4.最终确认</span></a></h4>
<p>现在执行你之前失败的那个命令：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>curl http://127.0.0.1/nginx_status</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>你应该能看到类似这样的三行输出：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>Active connections: 1 </span></span>
<span class="line"><span>server accepts handled requests</span></span>
<span class="line"><span> 1 1 1 </span></span>
<span class="line"><span>Reading: 0 Writing: 1 Waiting: 0</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h3 id="修改nginx主配置文件为nginx-export提供数据" tabindex="-1"><a class="header-anchor" href="#修改nginx主配置文件为nginx-export提供数据"><span>修改nginx主配置文件为nginx-export提供数据</span></a></h3>
<p>修改nginx.conf文件（二进制安装通常在/usr/local/nginx/conf/nginx下，yum安装通常在/etc/nginx/nginx.conf下）</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>server {</span></span>
<span class="line"><span>    listen 80;</span></span>
<span class="line"><span>    server_name localhost;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 这是你需要增加/修改的核心部分</span></span>
<span class="line"><span>    location /nginx_status {</span></span>
<span class="line"><span>            stub_status on;</span></span>
<span class="line"><span>            access_log off;</span></span>
<span class="line"><span>            allow 127.0.0.1;            # 允许本机访问</span></span>
<span class="line"><span>            allow 192.168.31.0/24;      # 允许你整个 31 网段（包含堡垒机）访问</span></span>
<span class="line"><span>            # 显式清除继承可能导致的干扰</span></span>
<span class="line"><span>            root /dev/null;             # 强制不找物理文件，彻底根治 404</span></span>
<span class="line"><span>            deny all;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    # ... 其他原本的博客配置 ...</span></span>
<span class="line"><span>}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p>
<h3 id="执行修改与生效" tabindex="-1"><a class="header-anchor" href="#执行修改与生效"><span>执行修改与生效</span></a></h3>
<p>你可以利用 Ansible 直接在堡垒机上一键更新 131/130 节点，并验证之前的 404 报错是否消失：</p>
<ol>
<li><strong>手动修改</strong>：<code v-pre>vi /usr/local/nginx/conf/nginx.conf</code>。</li>
<li><strong>语法检查</strong>：<code v-pre>/usr/local/nginx/sbin/nginx -t</code>。</li>
<li><strong>热加载生效</strong>：<code v-pre>/usr/local/nginx/sbin/nginx -s reload</code>。</li>
</ol>
<p>​</p>
<p>​</p>
<p>​</p>
<h3 id="部署全栈监控-playbook" tabindex="-1"><a class="header-anchor" href="#部署全栈监控-playbook"><span>部署全栈监控 (Playbook)</span></a></h3>
<p>等你替换完二进制文件并确认 <code v-pre>nginx -t</code> 通过后，回到 <strong>136 堡垒机</strong>。我们将利用你的 <strong>Ansible</strong> 技能，一次性把 130-135 节点的监控铺开。</p>
<p><strong>创建并运行</strong> <code v-pre>**deploy_nginx_full_stack.yml**</code><strong>：</strong></p>
<hr>
<h4 id="_1-在堡垒机-136-准备物料" tabindex="-1"><a class="header-anchor" href="#_1-在堡垒机-136-准备物料"><span>1.在堡垒机（136）准备物料</span></a></h4>
<p>在 <strong>136</strong> 上下载好正确的包（堡垒机通常有更好的出口带宽或代理）：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>cd /prom/</span></span>
<span class="line"><span># 下载 Nginx Exporter</span></span>
<span class="line"><span>wget https://github.com/nginxinc/nginx-prometheus-exporter/releases/download/v1.5.0/nginx-prometheus-exporter_1.5.0_linux_amd64.tar.gz</span></span>
<span class="line"><span># 下载 Promtail (用于日志采集)</span></span>
<span class="line"><span>curl -L -o promtail.zip https://ghproxy.net/https://github.com/grafana/loki/releases/download/v3.0.0/promtail-linux-amd64.zip</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 【关键验证】确保大小正确：Exporter 约 700k，Promtail 约 30MB</span></span>
<span class="line"><span>ls -lh</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p>
<h4 id="_2-解压promtail和nginx-export" tabindex="-1"><a class="header-anchor" href="#_2-解压promtail和nginx-export"><span>2.解压Promtail和Nginx export</span></a></h4>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>yum install -y unzip</span></span>
<span class="line"><span>tar -xf nginx-prometheus-exporter_1.5.0_linux_amd64.tar.gz</span></span>
<span class="line"><span>unzip promtail-linux-amd64.zip</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="/blog/assets/posts/1.%E6%B7%BB%E5%8A%A0Loki%E6%94%B6%E9%9B%86%E6%97%A5%E5%BF%97-1.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<hr>
<h4 id="_3-利用-ansible安装nginx-exporter-安装在web机器上" tabindex="-1"><a class="header-anchor" href="#_3-利用-ansible安装nginx-exporter-安装在web机器上"><span>3.利用 Ansible安装nginx-exporter（安装在web机器上）</span></a></h4>
<p>既然你已经有 <code v-pre>dmz</code> 的主机组，我们直接写一个 Playbook，把物料推送到 130、131 所有的机器上。</p>
<h5 id="创建-deploy-latest-exporter-yml" tabindex="-1"><a class="header-anchor" href="#创建-deploy-latest-exporter-yml"><span>创建 <code v-pre>deploy_latest_exporter.yml</code>：</span></a></h5>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>---</span></span>
<span class="line"><span>- hosts: 192.168.31.131,192.168.31.130</span></span>
<span class="line"><span>  become: yes</span></span>
<span class="line"><span>  tasks:</span></span>
<span class="line"><span>    - name: 1. 推送二进制文件</span></span>
<span class="line"><span>      copy:</span></span>
<span class="line"><span>        src: "/prom/nginx-prometheus-exporter"</span></span>
<span class="line"><span>        dest: /usr/local/bin/nginx-prometheus-exporter</span></span>
<span class="line"><span>        mode: '0755'</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    - name: 2. 配置 Systemd 服务文件</span></span>
<span class="line"><span>      copy:</span></span>
<span class="line"><span>        dest: /etc/systemd/system/nginx_exporter.service</span></span>
<span class="line"><span>        content: |</span></span>
<span class="line"><span>          [Unit]</span></span>
<span class="line"><span>          Description=Nginx Prometheus Exporter</span></span>
<span class="line"><span>          After=network.target</span></span>
<span class="line"><span></span></span>
<span class="line"><span>          [Service]</span></span>
<span class="line"><span>          Type=simple</span></span>
<span class="line"><span>          ExecStart=/usr/local/bin/nginx-prometheus-exporter -nginx.scrape-uri=http://127.0.0.1/nginx_status</span></span>
<span class="line"><span>          Restart=on-failure</span></span>
<span class="line"><span></span></span>
<span class="line"><span>          [Install]</span></span>
<span class="line"><span>          WantedBy=multi-user.target</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    - name: 3. 启动并开机自启</span></span>
<span class="line"><span>      systemd:</span></span>
<span class="line"><span>        name: nginx_exporter</span></span>
<span class="line"><span>        state: restarted</span></span>
<span class="line"><span>        enabled: yes</span></span>
<span class="line"><span>        daemon_reload: yes</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="执行脚本" tabindex="-1"><a class="header-anchor" href="#执行脚本"><span>执行脚本</span></a></h5>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>ansible-playbook deploy_latest_exporter.yml</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h4 id="_4-利用-ansible安装promtail" tabindex="-1"><a class="header-anchor" href="#_4-利用-ansible安装promtail"><span>4.利用 Ansible安装promtail</span></a></h4>
<h5 id="创建一个promtail-config-yml配置文件" tabindex="-1"><a class="header-anchor" href="#创建一个promtail-config-yml配置文件"><span>创建一个promtail-config.yml配置文件</span></a></h5>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>server:</span></span>
<span class="line"><span>  http_listen_port: 9080</span></span>
<span class="line"><span>  grpc_listen_port: 0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>positions:</span></span>
<span class="line"><span>  filename: /tmp/positions.yaml</span></span>
<span class="line"><span></span></span>
<span class="line"><span>clients:</span></span>
<span class="line"><span>  - url: http://192.168.31.136:3100/loki/api/v1/push</span></span>
<span class="line"><span></span></span>
<span class="line"><span>scrape_configs:</span></span>
<span class="line"><span>- job_name: nginx-logs</span></span>
<span class="line"><span>  static_configs:</span></span>
<span class="line"><span>  - targets:</span></span>
<span class="line"><span>      - localhost</span></span>
<span class="line"><span>    labels:</span></span>
<span class="line"><span>      job: nginx-access</span></span>
<span class="line"><span>      host: 192.168.31.131</span></span>
<span class="line"><span>      __path__: /usr/local/nginx/logs/*.log</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>自动化部署（所有DMZ机器都需要装）</strong></p>
<h5 id="创建-deploy-promtail-yml" tabindex="-1"><a class="header-anchor" href="#创建-deploy-promtail-yml"><span>创建 <code v-pre>deploy_promtail.yml</code>：</span></a></h5>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>---</span></span>
<span class="line"><span>- hosts: all</span></span>
<span class="line"><span>  become: yes</span></span>
<span class="line"><span>  tasks:</span></span>
<span class="line"><span>    - name: 1. 推送 Promtail 二进制文件</span></span>
<span class="line"><span>      copy:</span></span>
<span class="line"><span>        src: "/prom/promtail"</span></span>
<span class="line"><span>        dest: /usr/local/bin/promtail</span></span>
<span class="line"><span>        mode: '0755'</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    - name: 2. 创建配置目录并推送配置</span></span>
<span class="line"><span>      file:</span></span>
<span class="line"><span>        path: /etc/promtail</span></span>
<span class="line"><span>        state: directory</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    - name: 3. 推送配置文件</span></span>
<span class="line"><span>      copy:</span></span>
<span class="line"><span>        src: "/prom/promtail-config.yml"</span></span>
<span class="line"><span>        dest: /etc/promtail/config.yml</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    - name: 4. 配置 Systemd 服务</span></span>
<span class="line"><span>      copy:</span></span>
<span class="line"><span>        dest: /etc/systemd/system/promtail.service</span></span>
<span class="line"><span>        content: |</span></span>
<span class="line"><span>          [Unit]</span></span>
<span class="line"><span>          Description=Promtail service</span></span>
<span class="line"><span>          After=network.target</span></span>
<span class="line"><span></span></span>
<span class="line"><span>          [Service]</span></span>
<span class="line"><span>          Type=simple</span></span>
<span class="line"><span>          ExecStart=/usr/local/bin/promtail -config.file=/etc/promtail/config.yml</span></span>
<span class="line"><span>          Restart=on-failure</span></span>
<span class="line"><span></span></span>
<span class="line"><span>          [Install]</span></span>
<span class="line"><span>          WantedBy=multi-user.target</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    - name: 5. 启动并开机自启</span></span>
<span class="line"><span>      systemd:</span></span>
<span class="line"><span>        name: promtail</span></span>
<span class="line"><span>        state: restarted</span></span>
<span class="line"><span>        enabled: yes</span></span>
<span class="line"><span>        daemon_reload: yes</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="执行脚本-1" tabindex="-1"><a class="header-anchor" href="#执行脚本-1"><span>执行脚本</span></a></h5>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>ansible-playbook deploy_promtail.yml</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><strong>添加权限</strong></p>
<ul>
<li><strong>检查进程</strong>：<code v-pre>ansible 192.168.31.131 -m shell -a &quot;systemctl status promtail&quot;</code></li>
<li><strong>检查日志读取权限</strong>：Promtail 需要有权限读取 <code v-pre>/usr/local/nginx/logs/</code> 下的文件。如果日志权限是 <code v-pre>700</code>，Promtail 会报错。</li>
<li>快速修正：<code v-pre>ansible 192.168.31.131 -m shell -a &quot;chmod -R 755 /usr/local/nginx/logs/&quot;</code></li>
</ul>
<hr>
<h3 id="修改防火墙规则放行9113端口的流量-在堡垒机上执行" tabindex="-1"><a class="header-anchor" href="#修改防火墙规则放行9113端口的流量-在堡垒机上执行"><span>修改防火墙规则放行9113端口的流量（在堡垒机上执行）</span></a></h3>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 永久放行 9113 端口并立即生效</span></span>
<span class="line"><span>ansible 192.168.31.131，192.168.31.131 -m shell -a "firewall-cmd --permanent --add-port=9113/tcp &#x26;&#x26; firewall-cmd --reload"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="同步时间" tabindex="-1"><a class="header-anchor" href="#同步时间"><span>同步时间</span></a></h2>
<h3 id="_1-使用-chrony-同步时间" tabindex="-1"><a class="header-anchor" href="#_1-使用-chrony-同步时间"><span>1. 使用 Chrony 同步时间</span></a></h3>
<p>既然 <code v-pre>yum</code> 找不到 <code v-pre>ntpdate</code>，请直接在 <strong>136</strong> 上尝试安装并运行 <code v-pre>chronyd</code>：</p>
<p>Bash</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 安装 chrony (通常系统自带)</span></span>
<span class="line"><span>yum install -y chrony</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 立即与阿里云时间服务器同步一次</span></span>
<span class="line"><span># -q 代表 quit, -t 代表 timeout</span></span>
<span class="line"><span>chronyd -q 'server ntp.aliyun.com iburst'</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-给-130-131-等节点一键配置" tabindex="-1"><a class="header-anchor" href="#_2-给-130-131-等节点一键配置"><span>2. 给 130/131 等节点一键配置</span></a></h3>
<p>同样地，我们可以用 Ansible 批量让所有节点都切换到 Chrony 模式，这样比 <code v-pre>ntpdate</code> 更稳定：</p>
<p>Bash</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 1. 给所有节点安装并启动 chrony</span></span>
<span class="line"><span>ansible all -m shell -a "yum install -y chrony &#x26;&#x26; systemctl enable --now chronyd"</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 2. 强制所有节点立即同步一次</span></span>
<span class="line"><span>ansible all -m shell -a "chronyc makestep"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h3 id="_3-彻底对齐时区-关键步" tabindex="-1"><a class="header-anchor" href="#_3-彻底对齐时区-关键步"><span>3. 彻底对齐时区（关键步）</span></a></h3>
<p>由于你之前的日志显示时间差了一个小时，很大可能是<strong>时区设置</strong>不统一。请务必执行这一步，确保全集群都在“北京时间”：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>ansible all -m shell -a "timedatectl set-timezone Asia/Shanghai"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="_4-终极验证" tabindex="-1"><a class="header-anchor" href="#_4-终极验证"><span>4. 终极验证</span></a></h3>
<p>执行这条命令，观察每台机器返回的最后一行：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>ansible all -m shell -a "date"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><strong>如果所有机器返回的时间（秒级误</strong></p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};