import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%BF%90%E7%BB%B4/web%E9%9B%86%E7%BE%A4/web%E9%9B%86%E7%BE%A4%E9%A1%B9%E7%9B%AE/%E4%B9%9D%E3%80%81AIops%E6%94%B9%E9%80%A0/4.%E9%97%AD%E7%8E%AF%E8%87%AA%E5%8A%A8%E5%8C%96.html","title":"4.闭环自动化","lang":"zh-CN","frontmatter":{"title":"4.闭环自动化","icon":"server","date":"2026-07-23T00:00:00.000Z","category":["运维"],"description":"核心流程设计 当告警发生时，不再仅仅是发邮件给 AI，而是先尝试执行自愈逻辑： 识别标签：Webhook 收到告警，判断 alertname 或 severity。 执行指令：匹配到 service_down 时，调用系统命令运行 ansible-playbook。 二次检查：重启后调用 Prometheus API 确认指标是否恢复。 最终通知：将“...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"4.闭环自动化\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%BF%90%E7%BB%B4/web%E9%9B%86%E7%BE%A4/web%E9%9B%86%E7%BE%A4%E9%A1%B9%E7%9B%AE/%E4%B9%9D%E3%80%81AIops%E6%94%B9%E9%80%A0/4.%E9%97%AD%E7%8E%AF%E8%87%AA%E5%8A%A8%E5%8C%96.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"4.闭环自动化"}],["meta",{"property":"og:description","content":"核心流程设计 当告警发生时，不再仅仅是发邮件给 AI，而是先尝试执行自愈逻辑： 识别标签：Webhook 收到告警，判断 alertname 或 severity。 执行指令：匹配到 service_down 时，调用系统命令运行 ansible-playbook。 二次检查：重启后调用 Prometheus API 确认指标是否恢复。 最终通知：将“..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.89,"words":1166},"filePathRelative":"posts/运维/web集群/web集群项目/九、AIops改造/4.闭环自动化.md","excerpt":"<h2>核心流程设计</h2>\\n<p>当告警发生时，不再仅仅是发邮件给 AI，而是先尝试执行自愈逻辑：</p>\\n<ol>\\n<li><strong>识别标签</strong>：Webhook 收到告警，判断 <code>alertname</code> 或 <code>severity</code>。</li>\\n<li><strong>执行指令</strong>：匹配到 <code>service_down</code> 时，调用系统命令运行 <code>ansible-playbook</code>。</li>\\n<li><strong>二次检查</strong>：重启后调用 Prometheus API 确认指标是否恢复。</li>\\n<li><strong>最终通知</strong>：将“自愈结果”反馈到你的手机。</li>\\n</ol>","autoDesc":true}`),i={name:`4.闭环自动化.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><h2 id="核心流程设计" tabindex="-1"><a class="header-anchor" href="#核心流程设计"><span>核心流程设计</span></a></h2>
<p>当告警发生时，不再仅仅是发邮件给 AI，而是先尝试执行自愈逻辑：</p>
<ol>
<li><strong>识别标签</strong>：Webhook 收到告警，判断 <code v-pre>alertname</code> 或 <code v-pre>severity</code>。</li>
<li><strong>执行指令</strong>：匹配到 <code v-pre>service_down</code> 时，调用系统命令运行 <code v-pre>ansible-playbook</code>。</li>
<li><strong>二次检查</strong>：重启后调用 Prometheus API 确认指标是否恢复。</li>
<li><strong>最终通知</strong>：将“自愈结果”反馈到你的手机。</li>
</ol>
<h2 id="编写-ansible-自愈剧本-restart-service-yml" tabindex="-1"><a class="header-anchor" href="#编写-ansible-自愈剧本-restart-service-yml"><span>编写 Ansible 自愈剧本 (restart_service.yml)</span></a></h2>
<p>路径/ansible/self_healing.yml</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>---</span></span>
<span class="line"><span>- name: ZH-Kinger 故障自愈任务</span></span>
<span class="line"><span>  hosts: "{{ target_host }}"</span></span>
<span class="line"><span>  become: yes</span></span>
<span class="line"><span>  tasks:</span></span>
<span class="line"><span>    - name: 强制重启目标服务</span></span>
<span class="line"><span>      systemd:</span></span>
<span class="line"><span>        name: "{{ target_service }}"</span></span>
<span class="line"><span>        state: restarted</span></span>
<span class="line"><span>      register: restart_res</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    - name: 验证服务状态</span></span>
<span class="line"><span>      shell: "systemctl is-active {{ target_service }}"</span></span>
<span class="line"><span>      register: service_check</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    - name: 输出自愈状态</span></span>
<span class="line"><span>      debug:</span></span>
<span class="line"><span>        msg: "服务 {{ target_service }} 现在的状态是: {{ service_check.stdout }}"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="升级中间件脚本" tabindex="-1"><a class="header-anchor" href="#升级中间件脚本"><span>升级中间件脚本</span></a></h2>
<h3 id="v3-0-核心升级简述" tabindex="-1"><a class="header-anchor" href="#v3-0-核心升级简述"><span>V3.0 核心升级简述</span></a></h3>
<ol>
<li><strong>实现故障自愈 (Self-Healing)</strong> 不再停留在“发现问题”，而是直接通过 <strong>Ansible</strong> 介入。当 131/132 节点服务宕机时，系统会自动尝试重启修复，实现了运维的<strong>闭环自动化</strong>。</li>
<li><strong>AI 诊断具备“上下文意识”</strong> 你将“自愈结果”喂给了百炼 AI。AI 现在知道服务是否已经重启成功，并能根据结果给出<strong>差异化建议</strong>（成功则分析诱因，失败则给出人工抢修步骤）。</li>
<li><strong>数据清洗与精准投放</strong> 新增了 IP 自动提取逻辑，能自动剔除 Prometheus 标签中的端口号（如 <code v-pre>:9100</code>），确保自愈指令能准确送达目标主机 IP。</li>
</ol>
<p>​</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>import logging</span></span>
<span class="line"><span>from logging.handlers import RotatingFileHandler</span></span>
<span class="line"><span>import dashscope</span></span>
<span class="line"><span>from dashscope import Application</span></span>
<span class="line"><span>from flask import Flask, request</span></span>
<span class="line"><span>import smtplib</span></span>
<span class="line"><span>import time</span></span>
<span class="line"><span>import random</span></span>
<span class="line"><span>import subprocess  # 新增：用于调用系统Ansible命令</span></span>
<span class="line"><span>from email.mime.text import MIMEText</span></span>
<span class="line"><span>from email.header import Header</span></span>
<span class="line"><span></span></span>
<span class="line"><span># --- 1. 日志系统配置 ---</span></span>
<span class="line"><span>logging.basicConfig(level=logging.INFO)</span></span>
<span class="line"><span>logger = logging.getLogger("AI-SelfHealing")</span></span>
<span class="line"><span>file_handler = RotatingFileHandler('/llm/ai_running.log', maxBytes=5*1024*1024, backupCount=3)</span></span>
<span class="line"><span>formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')</span></span>
<span class="line"><span>file_handler.setFormatter(formatter)</span></span>
<span class="line"><span>logger.addHandler(file_handler)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>app = Flask(__name__)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># --- 2. 核心参数配置 ---</span></span>
<span class="line"><span>dashscope.api_key = "你的API-KEY"</span></span>
<span class="line"><span>APP_ID = "你的应用id"</span></span>
<span class="line"><span></span></span>
<span class="line"><span>SMTP_SERVER = "smtp.163.com"</span></span>
<span class="line"><span>SMTP_PORT = 465</span></span>
<span class="line"><span>MAIL_USER = "www914132612@163.com"</span></span>
<span class="line"><span>MAIL_PASS = "你的邮箱授权码"</span></span>
<span class="line"><span>RECEIVER = "914132612@qq.com"</span></span>
<span class="line"><span></span></span>
<span class="line"><span># --- 3. 自愈逻辑函数 (第四阶段核心) ---</span></span>
<span class="line"><span>def run_self_healing(instance_ip, alert_name):</span></span>
<span class="line"><span>    """匹配告警并执行Ansible自愈脚本"""</span></span>
<span class="line"><span>    # 告警名与系统服务的映射表</span></span>
<span class="line"><span>    service_map = {</span></span>
<span class="line"><span>        "KubeletDown": "kubelet",</span></span>
<span class="line"><span>        "DockerDown": "docker",</span></span>
<span class="line"><span>        "NginxDown": "nginx",</span></span>
<span class="line"><span>        "ServiceDown": "docker" # 默认策略</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # 匹配服务名</span></span>
<span class="line"><span>    target_svc = None</span></span>
<span class="line"><span>    for key in service_map:</span></span>
<span class="line"><span>        if key in alert_name:</span></span>
<span class="line"><span>            target_svc = service_map[key]</span></span>
<span class="line"><span>            break</span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>    if not target_svc:</span></span>
<span class="line"><span>        return "⚠️ 未匹配到预设自愈方案，跳过自动修复。"</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    logger.info(f"🛠️ 触发自愈：尝试重启 {instance_ip} 上的 {target_svc} 服务...")</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # 构造Ansible指令 (指向你指定的路径)</span></span>
<span class="line"><span>    ansible_cmd = [</span></span>
<span class="line"><span>        "ansible-playbook",</span></span>
<span class="line"><span>        "/ansible/self_healing.yml",</span></span>
<span class="line"><span>        "-e", f"target_host={instance_ip} target_service={target_svc}"</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    try:</span></span>
<span class="line"><span>        # 执行命令，超时45秒</span></span>
<span class="line"><span>        result = subprocess.run(ansible_cmd, capture_output=True, text=True, timeout=45)</span></span>
<span class="line"><span>        if result.returncode == 0:</span></span>
<span class="line"><span>            logger.info(f"✅ 节点 {instance_ip} 自愈指令执行成功")</span></span>
<span class="line"><span>            return f"✅ 自愈动作已执行：已下发 {target_svc} 重启指令。"</span></span>
<span class="line"><span>        else:</span></span>
<span class="line"><span>            logger.error(f"❌ Ansible自愈失败: {result.stderr}")</span></span>
<span class="line"><span>            return f"❌ 自愈动作失败：Ansible执行异常，请人工介入。"</span></span>
<span class="line"><span>    except Exception as e:</span></span>
<span class="line"><span>        logger.error(f"🚨 自愈模块崩溃: {str(e)}")</span></span>
<span class="line"><span>        return f"🚨 自愈系统故障: {str(e)}"</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def send_email(subject, content):</span></span>
<span class="line"><span>    """发送邮件并记录日志"""</span></span>
<span class="line"><span>    message = MIMEText(content, 'plain', 'utf-8')</span></span>
<span class="line"><span>    message['From'] = MAIL_USER</span></span>
<span class="line"><span>    message['To'] = RECEIVER</span></span>
<span class="line"><span>    message['Subject'] = Header(subject, 'utf-8')</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    try:</span></span>
<span class="line"><span>        smtp_obj = smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT)</span></span>
<span class="line"><span>        smtp_obj.login(MAIL_USER, MAIL_PASS)</span></span>
<span class="line"><span>        smtp_obj.sendmail(MAIL_USER, [RECEIVER], message.as_string())</span></span>
<span class="line"><span>        smtp_obj.quit()</span></span>
<span class="line"><span>        logger.info(f"邮件成功发送至 {RECEIVER}")</span></span>
<span class="line"><span>        return True</span></span>
<span class="line"><span>    except Exception as e:</span></span>
<span class="line"><span>        logger.error(f"邮件发送异常: {str(e)}")</span></span>
<span class="line"><span>        return False</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@app.route('/webhook', methods=['POST'])</span></span>
<span class="line"><span>def webhook():</span></span>
<span class="line"><span>    data = request.json</span></span>
<span class="line"><span>    alerts = data.get('alerts', [])</span></span>
<span class="line"><span>    logger.info(f"收到 Webhook 信号，包含 {len(alerts)} 条告警")</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    for alert in alerts:</span></span>
<span class="line"><span>        # 提取干净的 IP (去掉 :9100 等端口号)</span></span>
<span class="line"><span>        raw_instance = alert['labels'].get('instance', '192.168.31.x')</span></span>
<span class="line"><span>        instance = raw_instance.split(':')[0] </span></span>
<span class="line"><span>        alert_name = alert['labels'].get('alertname', '未知告警')</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        # --- A. 执行自愈流程 ---</span></span>
<span class="line"><span>        healing_result = run_self_healing(instance, alert_name)</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        # --- B. 准备 AI 诊断 ---</span></span>
<span class="line"><span>        current_session_id = f"session_{instance.replace('.', '_')}"</span></span>
<span class="line"><span>        random_mark = random.randint(1000, 9999)</span></span>
<span class="line"><span>        timestamp = time.strftime("%H:%M:%S")</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        logger.info(f"开始诊断节点 {instance} (Mark: {random_mark})...")</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        try:</span></span>
<span class="line"><span>            # 将自愈结果直接喂给 AI 增加上下文</span></span>
<span class="line"><span>            response = Application.call(</span></span>
<span class="line"><span>                app_id=APP_ID, </span></span>
<span class="line"><span>                prompt=(</span></span>
<span class="line"><span>                    f"【ZH-Kinger 自动化报告 - 编号：{random_mark}】\\n"</span></span>
<span class="line"><span>                    f"1. 节点信息：{instance}\\n"</span></span>
<span class="line"><span>                    f"2. 告警事件：{alert_name}\\n"</span></span>
<span class="line"><span>                    f"3. 自动修复结果：{healing_result}\\n\\n"</span></span>
<span class="line"><span>                    f"请作为 SRE 专家：\\n"</span></span>
<span class="line"><span>                    f"- 如果修复成功，分析该服务为何会崩溃（根因追溯）。\\n"</span></span>
<span class="line"><span>                    f"- 如果修复失败，给出最急迫的人工介入指令。"</span></span>
<span class="line"><span>                ),</span></span>
<span class="line"><span>                session_id=current_session_id,</span></span>
<span class="line"><span>                parameters={'temperature': 0.8, 'top_p': 0.95}</span></span>
<span class="line"><span>            )</span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>            if response.status_code == 200:</span></span>
<span class="line"><span>                ai_report = response.output.text</span></span>
<span class="line"><span>                </span></span>
<span class="line"><span>                # 4. 构造邮件内容 (包含自愈详情)</span></span>
<span class="line"><span>                subject = f"【ZH-Kinger 自愈&#x26;诊断】{alert_name} @ {instance} (#{random_mark})"</span></span>
<span class="line"><span>                content = (</span></span>
<span class="line"><span>                    f"告警节点: {instance}\\n"</span></span>
<span class="line"><span>                    f"告警项目: {alert_name}\\n"</span></span>
<span class="line"><span>                    f"自愈尝试: {healing_result}\\n"</span></span>
<span class="line"><span>                    f"诊断序列: {random_mark}\\n"</span></span>
<span class="line"><span>                    f"-------------------------------------------\\n"</span></span>
<span class="line"><span>                    f"AI 专家深度分析:\\n{ai_report}"</span></span>
<span class="line"><span>                )</span></span>
<span class="line"><span>                send_email(subject, content)</span></span>
<span class="line"><span>            else:</span></span>
<span class="line"><span>                logger.error(f"百炼 API 异常: {response.message}")</span></span>
<span class="line"><span>                </span></span>
<span class="line"><span>        except Exception as e:</span></span>
<span class="line"><span>            logger.error(f"处理告警逻辑时发生崩溃: {str(e)}")</span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>    return "OK", 200</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if __name__ == '__main__':</span></span>
<span class="line"><span>    logger.info("ZH-Kinger AI 闭环系统 V3.0 上线 (已集成Ansible自愈模块)")</span></span>
<span class="line"><span>    app.run(host='0.0.0.0', port=5000)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};