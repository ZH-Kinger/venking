import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%BF%90%E7%BB%B4/web%E9%9B%86%E7%BE%A4/web%E9%9B%86%E7%BE%A4%E9%A1%B9%E7%9B%AE/%E4%B9%9D%E3%80%81AIops%E6%94%B9%E9%80%A0/2.%E8%B6%8B%E5%8A%BF%E9%A2%84%E6%B5%8B.html","title":"2.趋势预测","lang":"zh-CN","frontmatter":{"title":"2.趋势预测","icon":"server","date":"2026-07-23T00:00:00.000Z","category":["运维"],"description":"线性回归算法实现流量预警 修改Prometheus的配置文件添加告警规则 1. 修改后的 prometheus.yml（/usr/local/prometheus/prometheus.yml） 建议直接按照以下结构更新你的配置文件： 2. 第二阶段：趋势预警规则实现 在刚才建议你创建的 /usr/local/prometheus/rules/（新建）...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"2.趋势预测\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/2.%E8%B6%8B%E5%8A%BF%E9%A2%84%E6%B5%8B-1.png\\",\\"https://venking.tech/blog/blog/assets/posts/2.%E8%B6%8B%E5%8A%BF%E9%A2%84%E6%B5%8B-2.png\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%BF%90%E7%BB%B4/web%E9%9B%86%E7%BE%A4/web%E9%9B%86%E7%BE%A4%E9%A1%B9%E7%9B%AE/%E4%B9%9D%E3%80%81AIops%E6%94%B9%E9%80%A0/2.%E8%B6%8B%E5%8A%BF%E9%A2%84%E6%B5%8B.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"2.趋势预测"}],["meta",{"property":"og:description","content":"线性回归算法实现流量预警 修改Prometheus的配置文件添加告警规则 1. 修改后的 prometheus.yml（/usr/local/prometheus/prometheus.yml） 建议直接按照以下结构更新你的配置文件： 2. 第二阶段：趋势预警规则实现 在刚才建议你创建的 /usr/local/prometheus/rules/（新建）..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/2.%E8%B6%8B%E5%8A%BF%E9%A2%84%E6%B5%8B-1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":4.04,"words":1211},"filePathRelative":"posts/运维/web集群/web集群项目/九、AIops改造/2.趋势预测.md","excerpt":"<p>线性回归算法实现流量预警</p>\\n<h2>修改Prometheus的配置文件添加告警规则</h2>\\n<p>1. 修改后的 <code>prometheus.yml</code>（/usr/local/prometheus/prometheus.yml）</p>\\n<p>建议直接按照以下结构更新你的配置文件：</p>\\n<div class=\\"language-plain line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"plain\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code class=\\"language-plain\\"><span class=\\"line\\"><span>global:</span></span>\\n<span class=\\"line\\"><span>  scrape_interval: 15s     # 抓取间隔，用于 predict_linear 计算斜率</span></span>\\n<span class=\\"line\\"><span>  evaluation_interval: 15s # 规则评估频率</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span># 1. 核心：加载趋势预警规则文件</span></span>\\n<span class=\\"line\\"><span>rule_files:</span></span>\\n<span class=\\"line\\"><span>  - \\"rules/*.yml\\"</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span># 2. 核心：定义告警发送目的地（Alertmanager）</span></span>\\n<span class=\\"line\\"><span>alerting:</span></span>\\n<span class=\\"line\\"><span>  alertmanagers:</span></span>\\n<span class=\\"line\\"><span>    - static_configs:</span></span>\\n<span class=\\"line\\"><span>        - targets: [\\"localhost:9093\\"]</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>scrape_configs:</span></span>\\n<span class=\\"line\\"><span>  - job_name: \\"prometheus\\"</span></span>\\n<span class=\\"line\\"><span>    static_configs:</span></span>\\n<span class=\\"line\\"><span>      - targets: [\\"localhost:9090\\"]</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>  - job_name: \\"dmz_cluster\\"</span></span>\\n<span class=\\"line\\"><span>    static_configs:</span></span>\\n<span class=\\"line\\"><span>      - targets: </span></span>\\n<span class=\\"line\\"><span>          - \\"localhost:9100\\"       # 136 堡垒机节点</span></span>\\n<span class=\\"line\\"><span>          - \\"192.168.31.130:9100\\"  # Web 1</span></span>\\n<span class=\\"line\\"><span>          - \\"192.168.31.131:9100\\"  # Web 2</span></span>\\n<span class=\\"line\\"><span>          - \\"192.168.31.132:9100\\"  # 业务节点</span></span>\\n<span class=\\"line\\"><span>          - \\"192.168.31.133:9100\\"  # 待救治节点</span></span>\\n<span class=\\"line\\"><span>          - \\"192.168.31.135:9100\\"  # 业务节点</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`),i={name:`2.趋势预测.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>线性回归算法实现流量预警</p>
<h2 id="修改prometheus的配置文件添加告警规则" tabindex="-1"><a class="header-anchor" href="#修改prometheus的配置文件添加告警规则"><span>修改Prometheus的配置文件添加告警规则</span></a></h2>
<p>1. 修改后的 <code v-pre>prometheus.yml</code>（/usr/local/prometheus/prometheus.yml）</p>
<p>建议直接按照以下结构更新你的配置文件：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>global:</span></span>
<span class="line"><span>  scrape_interval: 15s     # 抓取间隔，用于 predict_linear 计算斜率</span></span>
<span class="line"><span>  evaluation_interval: 15s # 规则评估频率</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 1. 核心：加载趋势预警规则文件</span></span>
<span class="line"><span>rule_files:</span></span>
<span class="line"><span>  - "rules/*.yml"</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 2. 核心：定义告警发送目的地（Alertmanager）</span></span>
<span class="line"><span>alerting:</span></span>
<span class="line"><span>  alertmanagers:</span></span>
<span class="line"><span>    - static_configs:</span></span>
<span class="line"><span>        - targets: ["localhost:9093"]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>scrape_configs:</span></span>
<span class="line"><span>  - job_name: "prometheus"</span></span>
<span class="line"><span>    static_configs:</span></span>
<span class="line"><span>      - targets: ["localhost:9090"]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  - job_name: "dmz_cluster"</span></span>
<span class="line"><span>    static_configs:</span></span>
<span class="line"><span>      - targets: </span></span>
<span class="line"><span>          - "localhost:9100"       # 136 堡垒机节点</span></span>
<span class="line"><span>          - "192.168.31.130:9100"  # Web 1</span></span>
<span class="line"><span>          - "192.168.31.131:9100"  # Web 2</span></span>
<span class="line"><span>          - "192.168.31.132:9100"  # 业务节点</span></span>
<span class="line"><span>          - "192.168.31.133:9100"  # 待救治节点</span></span>
<span class="line"><span>          - "192.168.31.135:9100"  # 业务节点</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-第二阶段-趋势预警规则实现" tabindex="-1"><a class="header-anchor" href="#_2-第二阶段-趋势预警规则实现"><span>2. 第二阶段：趋势预警规则实现</span></a></h3>
<p>在刚才建议你创建的 <code v-pre>/usr/local/prometheus/rules/（新建）</code> 目录下，新建 <code v-pre>predict_rules.yml</code>：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>groups:</span></span>
<span class="line"><span>  - name: HostStatusPrediction</span></span>
<span class="line"><span>    rules:</span></span>
<span class="line"><span>      # 1. 磁盘趋势预测 (你原有的逻辑，保留)</span></span>
<span class="line"><span>      - alert: DiskSpaceWillFillIn4Hours</span></span>
<span class="line"><span>        expr: predict_linear(node_filesystem_free_bytes{mountpoint="/"}[1h], 4 * 3600) &#x3C; 0</span></span>
<span class="line"><span>        for: 5m</span></span>
<span class="line"><span>        labels:</span></span>
<span class="line"><span>          severity: warning</span></span>
<span class="line"><span>        annotations:</span></span>
<span class="line"><span>          summary: "磁盘预警: {{ $labels.instance }}"</span></span>
<span class="line"><span>          description: "预计4小时后磁盘耗尽。"</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      # 2. 动态 CPU 负载预警 (新增：智能识别凌晨备份)</span></span>
<span class="line"><span>      - alert: HostCPULoadAbnormal</span></span>
<span class="line"><span>        # 逻辑：当前 1 分钟负载 > (过去 7 天平均值 + 3 * 过去 7 天标准差)</span></span>
<span class="line"><span>        # 这种算法会自动把“每天凌晨都发生的备份高峰”包含在正常范围内</span></span>
<span class="line"><span>        expr: |</span></span>
<span class="line"><span>          node_load1 > (</span></span>
<span class="line"><span>            avg_over_time(node_load1[7d]) </span></span>
<span class="line"><span>            + 3 * stddev_over_time(node_load1[7d])</span></span>
<span class="line"><span>          )</span></span>
<span class="line"><span>        for: 2m</span></span>
<span class="line"><span>        labels:</span></span>
<span class="line"><span>          severity: critical</span></span>
<span class="line"><span>          source: "ZH-Kinger-AI"</span></span>
<span class="line"><span>        annotations:</span></span>
<span class="line"><span>          summary: "CPU 异常偏离: {{ $labels.instance }}"</span></span>
<span class="line"><span>          description: "当前负载 {{ $value | printf \\"%.2f\\" }} 已显著超过 7 天基线水平，非周期性波动，建议 AI 介入。"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="应用配置" tabindex="-1"><a class="header-anchor" href="#应用配置"><span>应用配置</span></a></h3>
<h4 id="查看prometheus的systemd-配置文件" tabindex="-1"><a class="header-anchor" href="#查看prometheus的systemd-配置文件"><span>查看Prometheus的Systemd 配置文件</span></a></h4>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>systemctl status prometheus</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><figure><img src="/blog/assets/posts/2.%E8%B6%8B%E5%8A%BF%E9%A2%84%E6%B5%8B-1.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h4 id="修改-systemd-配置文件" tabindex="-1"><a class="header-anchor" href="#修改-systemd-配置文件"><span>修改 Systemd 配置文件</span></a></h4>
<p>出现 &quot;Lifecycle API is not enabled&quot; 的原因是 Prometheus 出于安全性考虑，默认关闭了可以通过 HTTP 请求远程控制服务状态的接口。</p>
<p>在 Prometheus 的设计中，像 /-/reload（热加载配置）或 /-/quit（安全退出）这类操作具有较高的权限。如果默认开启且你的 136 堡垒机 9090 端口暴露在公网或不安全的内网中，任何人都可以通过简单的 curl 命令干扰你的监控系统</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>vi /usr/lib/systemd/system/prometheus.service</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>在 <code v-pre>ExecStart</code> 这一行的末尾添加 <code v-pre>--web.enable-lifecycle</code> 参数。修改后的内容应该类似这样：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>[Unit]</span></span>
<span class="line"><span>Description=Prometheus</span></span>
<span class="line"><span>After=network.target</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[Service]</span></span>
<span class="line"><span>Type=simple</span></span>
<span class="line"><span># 核心修改：增加了 --web.enable-lifecycle 开启热加载 API</span></span>
<span class="line"><span>ExecStart=/usr/local/prometheus/prometheus \\</span></span>
<span class="line"><span>  --config.file=/usr/local/prometheus/prometheus.yml \\</span></span>
<span class="line"><span>  --storage.tsdb.path=/usr/local/prometheus/data \\</span></span>
<span class="line"><span>  --web.enable-lifecycle</span></span>
<span class="line"><span>Restart=on-failure</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[Install]</span></span>
<span class="line"><span>WantedBy=multi-user.target</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="执行生效与验证" tabindex="-1"><a class="header-anchor" href="#执行生效与验证"><span>执行生效与验证</span></a></h3>
<p>修改完成后，按照以下步骤操作，确保你的趋势预警逻辑（<code v-pre>predict_linear</code>）成功加载：</p>
<p><strong>重载 Systemd 并重启</strong>：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>systemctl daemon-reload</span></span>
<span class="line"><span>systemctl restart prometheus</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>验证 API 是否开启</strong>： 执行刚才报错的命令，如果不再提示 <code v-pre>Lifecycle API is not enabled</code>，则说明配置成功：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>curl -X POST http://localhost:9090/-/reload</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ol>
<li><strong>检查规则加载状态</strong>: 登录 <code v-pre>http://192.168.31.136:9090/alerts</code>，确认你刚才通过 <code v-pre>promtool</code> 检查通过的 <strong>2 条预警规则</strong>（磁盘和内存预测）已经显示在列表中。</li>
</ol>
<figure><img src="/blog/assets/posts/2.%E8%B6%8B%E5%8A%BF%E9%A2%84%E6%B5%8B-2.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<hr>
<h3 id="_3-第二阶段-多渠道告警配置思路" tabindex="-1"><a class="header-anchor" href="#_3-第二阶段-多渠道告警配置思路"><span>3. 第二阶段：多渠道告警配置思路</span></a></h3>
<p>由于你打算接入钉钉/企业微信 Webhook，你还需要在 <strong>136 堡垒机</strong>上启动 <code v-pre>alertmanager</code> 程序。</p>
<ul>
<li><strong>分类路由</strong>：在 <code v-pre>alertmanager.yml</code> 中，将 <code v-pre>severity: warning</code> 的告警发给“运维通知群”，将 <code v-pre>severity: critical</code> 的告警直接推送到你的个人终端。</li>
<li><strong>消除抖动</strong>：配置 <code v-pre>group_wait</code> 和 <code v-pre>repeat_interval</code>，防止在 133 这种不稳定节点恢复时产生告警风暴。</li>
</ul>
<p>​</p>
<h3 id="alertmanager安装" tabindex="-1"><a class="header-anchor" href="#alertmanager安装"><span>Alertmanager安装</span></a></h3>
<p><strong>官方下载与安装指令</strong></p>
<p>你可以直接在堡垒机执行以下命令进行快速部署：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 1. 下载 Alertmanager 0.27.0 (目前最稳定的版本之一)</span></span>
<span class="line"><span>wget https://github.com/prometheus/alertmanager/releases/download/v0.27.0/alertmanager-0.27.0.linux-amd64.tar.gz</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 2. 解压文件</span></span>
<span class="line"><span>tar -xvf alertmanager-0.27.0.linux-amd64.tar.gz</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 3. 移动到你的规范路径</span></span>
<span class="line"><span>mv alertmanager-0.27.0.linux-amd64 /usr/local/alertmanager</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="配置systemed管理" tabindex="-1"><a class="header-anchor" href="#配置systemed管理"><span>配置systemed管理</span></a></h3>
<p>执行 <code v-pre>vi /etc/systemd/system/alertmanager.service</code>，写入以下内容：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>[Unit]</span></span>
<span class="line"><span>Description=Alertmanager</span></span>
<span class="line"><span>After=network.target</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[Service]</span></span>
<span class="line"><span>Type=simple</span></span>
<span class="line"><span>ExecStart=/usr/local/alertmanager/alertmanager --config.file=/usr/local/alertmanager/alertmanager.yml --storage.path=/usr/local/alertmanager/data</span></span>
<span class="line"><span>Restart=on-failure</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[Install]</span></span>
<span class="line"><span>WantedBy=multi-user.target</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="启动服务" tabindex="-1"><a class="header-anchor" href="#启动服务"><span>启动服务</span></a></h3>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>systemctl start alertmanager</span></span>
<span class="line"><span>systemctl enable alertmanager</span></span>
<span class="line"><span>systemctl status alertmanager</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="修改alertmanager-yml配置文件" tabindex="-1"><a class="header-anchor" href="#修改alertmanager-yml配置文件"><span>修改alertmanager.yml配置文件</span></a></h3>
<p>修改配置文件vi /usr/local/alertmanager.alertmanager.yml添加预警方式</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>global:</span></span>
<span class="line"><span>  # 邮件服务器配置（以 QQ 邮箱为例，网易/Gmail 同理）</span></span>
<span class="line"><span>  smtp_smarthost: 'smtp.qq.com:465'</span></span>
<span class="line"><span>  smtp_from: '你的邮箱@qq.com'</span></span>
<span class="line"><span>  smtp_auth_username: '你的邮箱@qq.com'</span></span>
<span class="line"><span>  smtp_auth_password: '你的授权码' # 注意：不是登录密码，是 SMTP 授权码</span></span>
<span class="line"><span>  smtp_hello: 'prometheus'</span></span>
<span class="line"><span>  smtp_require_tls: false # 465 端口通常设为 false，587 设为 true</span></span>
<span class="line"><span></span></span>
<span class="line"><span>route:</span></span>
<span class="line"><span>  group_by: ['alertname']</span></span>
<span class="line"><span>  group_wait: 30s</span></span>
<span class="line"><span>  group_interval: 5m</span></span>
<span class="line"><span>  repeat_interval: 4h</span></span>
<span class="line"><span>  receiver: 'email-receiver' # 默认走邮件</span></span>
<span class="line"><span>  routes:</span></span>
<span class="line"><span>    # 扩展接口预留：未来可以根据 severity 过滤到不同的 Webhook</span></span>
<span class="line"><span>    - match:</span></span>
<span class="line"><span>        severity: critical</span></span>
<span class="line"><span>      receiver: 'email-receiver'</span></span>
<span class="line"><span></span></span>
<span class="line"><span>receivers:</span></span>
<span class="line"><span>- name: 'email-receiver'</span></span>
<span class="line"><span>  email_configs:</span></span>
<span class="line"><span>  - to: '你的接收邮箱@xxx.com'</span></span>
<span class="line"><span>    send_resolved: true # 故障恢复后也发一封邮件通知</span></span>
<span class="line"><span>    headers:</span></span>
<span class="line"><span>      subject: "【ZH-Kinger 预警】{{ .CommonAnnotations.summary }}"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="检查语法" tabindex="-1"><a class="header-anchor" href="#检查语法"><span>检查语法</span></a></h4>
<p>使用 Alertmanager 自带工具检查刚才的 YAML 缩进：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>./amtool check-config alertmanager.yml</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h4 id="重启服务" tabindex="-1"><a class="header-anchor" href="#重启服务"><span>重启服务</span></a></h4>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>systemctl restart alertmanager</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};