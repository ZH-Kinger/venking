import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%BF%90%E7%BB%B4/web%E9%9B%86%E7%BE%A4/web%E9%9B%86%E7%BE%A4%E9%A1%B9%E7%9B%AE/%E4%B9%9D%E3%80%81AIops%E6%94%B9%E9%80%A0.html","title":"九、AIops改造","lang":"zh-CN","frontmatter":{"title":"九、AIops改造","icon":"server","date":"2026-07-23T00:00:00.000Z","category":["运维"],"description":"DMZ 集群 AIOps 智能化运维方案 第一阶段：稳固基石 —— 全栈可观测性构建 目标：消除盲区，实现指标（Metrics）与日志（Logs）的统一。 自动化部署 (Ansible)： 编写 Playbook 批量完成 130-135 节点的 node_exporter 安装、Systemd 服务配置及 firewalld 9100 端口放行。 引...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"九、AIops改造\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%BF%90%E7%BB%B4/web%E9%9B%86%E7%BE%A4/web%E9%9B%86%E7%BE%A4%E9%A1%B9%E7%9B%AE/%E4%B9%9D%E3%80%81AIops%E6%94%B9%E9%80%A0.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"九、AIops改造"}],["meta",{"property":"og:description","content":"DMZ 集群 AIOps 智能化运维方案 第一阶段：稳固基石 —— 全栈可观测性构建 目标：消除盲区，实现指标（Metrics）与日志（Logs）的统一。 自动化部署 (Ansible)： 编写 Playbook 批量完成 130-135 节点的 node_exporter 安装、Systemd 服务配置及 firewalld 9100 端口放行。 引..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.5,"words":749},"filePathRelative":"posts/运维/web集群/web集群项目/九、AIops改造.md","excerpt":"<h2>DMZ 集群 AIOps 智能化运维方案</h2>\\n<h3>第一阶段：稳固基石 —— 全栈可观测性构建</h3>\\n<p><strong>目标</strong>：消除盲区，实现指标（Metrics）与日志（Logs）的统一。</p>\\n<ol>\\n<li><strong>自动化部署 (Ansible)</strong>：</li>\\n</ol>\\n<ul>\\n<li>编写 Playbook 批量完成 130-135 节点的 <code>node_exporter</code> 安装、Systemd 服务配置及 <code>firewalld</code> 9100 端口放行。</li>\\n</ul>","autoDesc":true}`),i={name:`九、AIops改造.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><h2 id="dmz-集群-aiops-智能化运维方案" tabindex="-1"><a class="header-anchor" href="#dmz-集群-aiops-智能化运维方案"><span>DMZ 集群 AIOps 智能化运维方案</span></a></h2>
<h3 id="第一阶段-稳固基石-——-全栈可观测性构建" tabindex="-1"><a class="header-anchor" href="#第一阶段-稳固基石-——-全栈可观测性构建"><span>第一阶段：稳固基石 —— 全栈可观测性构建</span></a></h3>
<p><strong>目标</strong>：消除盲区，实现指标（Metrics）与日志（Logs）的统一。</p>
<ol>
<li><strong>自动化部署 (Ansible)</strong>：</li>
</ol>
<ul>
<li>编写 Playbook 批量完成 130-135 节点的 <code v-pre>node_exporter</code> 安装、Systemd 服务配置及 <code v-pre>firewalld</code> 9100 端口放行。</li>
</ul>
<ol start="2">
<li><strong>引入日志聚合 (Grafana Loki)</strong>：</li>
</ol>
<ul>
<li>在堡垒机（136）部署 Loki 容器。</li>
<li>在各节点部署 <strong>Promtail</strong>，实时抓取 <code v-pre>/var/log/messages</code> 和应用日志。</li>
<li><strong>价值</strong>：在 Grafana 中实现“点击异常指标曲线，直接弹出对应时间点的系统日志”，排障效率提升 80%。</li>
</ul>
<h3 id="第二阶段-预警升级-——-从-死阈值-转向-趋势预测" tabindex="-1"><a class="header-anchor" href="#第二阶段-预警升级-——-从-死阈值-转向-趋势预测"><span>第二阶段：预警升级 —— 从“死阈值”转向“趋势预测”</span></a></h3>
<p><strong>目标</strong>：在故障发生前解决问题。</p>
<ol>
<li><strong>配置趋势预警 (PromQL)</strong>：</li>
</ol>
<ul>
<li>在 Prometheus 中添加记录规则（Recording Rules），利用 <code v-pre>predict_linear</code> 函数监控磁盘和内存。</li>
<li><strong>示例逻辑</strong>：如果预测磁盘空间在 4 小时内将耗尽，即刻触发 <code v-pre>Warning</code> 告警，而非等到 90% 才报 <code v-pre>Critical</code>。</li>
</ul>
<ol start="2">
<li><strong>多渠道告警路由 (Alertmanager)</strong>：</li>
</ol>
<ul>
<li>集成钉钉/企业微信 Webhook。根据告警级别实现分类：普通波动发群聊，关键服务挂掉直接触发短信/电话。</li>
</ul>
<hr>
<h3 id="第三阶段-ai-赋能-——-故障快速定位与根因分析" tabindex="-1"><a class="header-anchor" href="#第三阶段-ai-赋能-——-故障快速定位与根因分析"><span>第三阶段：AI 赋能 —— 故障快速定位与根因分析</span></a></h3>
<p><strong>目标</strong>：利用 AI 减少人工分析链路，实现“辅助决策”。</p>
<ol>
<li><strong>集成 AI 诊断助手 (基于 LLM API)</strong>：</li>
</ol>
<ul>
<li><strong>开发逻辑</strong>：编写一个 Python 中间件。</li>
<li><strong>流程</strong>：当 Alertmanager 触发告警时，中间件自动调用 Prometheus API 抓取该节点过去 15 分钟的 CPU、IO、Load 指标及 Loki 日志片段。</li>
<li><strong>AI 处理</strong>：将数据脱敏后传给大模型提示词：“<em>分析以下监控快照，给出可能的 3 个故障点及修复建议</em>”。</li>
<li><strong>反馈</strong>：将 AI 分析报告随告警信息一并推送到你的手机。</li>
</ul>
<ol start="2">
<li><strong>动态阈值异常检测 (Grafana ML)</strong>：</li>
</ol>
<ul>
<li>启用 Grafana 自带的 Machine Learning 模块。</li>
<li>针对 Web 访问量和 CPU 负载开启训练，自动生成<strong>置信区间（阴影带）</strong>。偏离阴影带即视为异常，能有效识别隐蔽的内存泄漏。</li>
</ul>
<hr>
<h3 id="第四阶段-闭环自动化-——-故障自愈-self-healing" tabindex="-1"><a class="header-anchor" href="#第四阶段-闭环自动化-——-故障自愈-self-healing"><span>第四阶段：闭环自动化 —— 故障自愈 (Self-Healing)</span></a></h3>
<p><strong>目标</strong>：实现无人值守的运维闭环。</p>
<ol>
<li><strong>事件驱动修复</strong>：</li>
</ol>
<ul>
<li>利用 Alertmanager 的 Webhook 触发 136 堡垒机上的 <strong>FastAPI 脚本</strong>。</li>
<li><strong>脚本逻辑</strong>：如果告警类型是 <code v-pre>service_down</code>，脚本自动运行 <code v-pre>ansible-playbook restart_service.yml</code> 尝试重启。</li>
<li><strong>反馈</strong>：修复成功后，发送“故障已自愈”通知；若失败，再转人工介入。</li>
</ul>
<hr>
<h2 id="方案落地清单-你可以直接用于博客目录" tabindex="-1"><a class="header-anchor" href="#方案落地清单-你可以直接用于博客目录"><span>方案落地清单（你可以直接用于博客目录）</span></a></h2>
<table>
<thead>
<tr>
<th><strong>模块</strong></th>
<th><strong>技术栈</strong></th>
<th><strong>核心价值</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>基础监控</strong></td>
<td>Prometheus + Node Exporter</td>
<td>硬件实时数据采集</td>
</tr>
<tr>
<td><strong>可观测性</strong></td>
<td>Grafana + Loki + Promtail</td>
<td>指标与日志关联分析</td>
</tr>
<tr>
<td><strong>智能告警</strong></td>
<td>Alertmanager + PromQL 预测</td>
<td>提前 4 小时发现隐患</td>
</tr>
<tr>
<td><strong>AI 诊断</strong></td>
<td>Python + GPT API</td>
<td>自动输出根因分析报告</td>
</tr>
<tr>
<td><strong>故障自愈</strong></td>
<td>Webhook + Ansible</td>
<td>缩短平均修复时间 (MTTR)</td>
</tr>
</tbody>
</table>
<hr>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};