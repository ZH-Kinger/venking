---
title: "你的ai在中间做了什么"
date: 2026-07-23
category: "面试"
---
梓涵，这正是你简历中 **“自动化”** 与 **“智能化”** 结合最紧密的地方。

在你的架构中，AI 并不是一个悬浮的口号，而是一个\*\*“决策中枢”\*\*。它通过 Python 编写的脚本作为桥梁，实现从“读取数据”到“下发指令”的闭环。

以下是你的 AI 调用这些 API 的具体实现逻辑：

---

### 1\. 数据采集：调用 Prometheus HTTP API（之前是直接访问告警数据）

AI 模型（Scikit-learn）需要实时的指标数据才能进行预测。

-   **调用方式**：Python 使用 `requests` 库访问 Prometheus 的 `query` 或 `query_range` 接口。

**具体操作**：

脚本每隔一分钟向 Prometheus 发起一次请求，获取最近 1 小时的磁盘使用率或 QPS 序列。

```plain
# 逻辑伪代码
url = "http://prometheus-server:9090/api/v1/query"
params = {'query': 'node_disk_written_bytes_total{device="vda"}[1h]'}
response = requests.get(url, params=params)
data = response.json()['data']['result'] # 获取原始时间序列
```

-   **AI 预处理**：将获取到的 JSON 数据转换成 Numpy 数组，喂给训练好的线性回归模型。

---

### 2\. 指令下发：调用 Ansible Python API (Runner)

当 AI 计算出 **MAE**（平均绝对误差）在范围内，且预测值即将触及阈值时，它需要“动手”干活。

-   **调用方式**：你没有直接在命令行敲 `ansible-playbook`，而是利用了 **Ansible Python API**（或者是通过 Python 的 `subprocess` 模块封装）。
-   **具体操作**：

AI 脚本判断出故障类型后，直接实例化一个 Ansible 执行任务，将目标主机的 IP 和对应的自愈 Playbook（如 `clean_log.yml`）关联起来。

```plain
# 逻辑伪代码
import ansible_runner
if prediction > threshold:
    ansible_runner.run(private_data_dir='/tmp/ansible', playbook='clean_disk.yml', inventory='hosts.ini')
```

-   **落地点**：这避开了手动操作的延迟，真正实现了从“预测”到“自愈”的**秒级对接**。

---

### 3\. 结果反馈：调用 飞书/钉钉机器人 Webhook API

自愈完成后，系统必须通知运维人员（也就是你），实现“事后审计”。

-   **调用方式**：HTTP POST 请求到机器人的 Webhook 地址。
-   **具体操作**：

脚本将 AI 预测的结果图表（或简报）连同 Ansible 的执行结果（Success/Fail）封装成一个 JSON 消息发送出去。

“消息内容：[AI 预警] 预测节点 192.168.10.11 磁盘将于 2 小时后满，已自动调用 Ansible 清理日志，当前剩余空间 40%。”

---

### 💡 梓涵的面试进阶：如何体现“精细化”调用？

面试官可能会问：**“如果 AI 频繁调用 API，导致系统资源被占满怎么办？”**

**你的硬核回答（项目亮点）：**

“我在 AI 调用 API 时设计了两个机制：

1.  **分段调用策略**：为了不给 Prometheus 增加查询压力，我并不是每次都拉取全量数据，而是只拉取增量数据。
2.  **API 熔断机制**：如果 AI 脚本在 10 分钟内连续调用了 3 次自愈 API 且指标没有好转，脚本会自动锁定（Locking），停止进一步调用并触发高级人工告警。

这种‘调用管理’保证了即使 AI 模型出现偏差（比如 MAE 异常变大），也不会对生产环境造成恶意冲击。”

---

### 🛠️ 怎么在简历里描述这段“调用”？

你可以写：

“利用 **Python 封装 Prometheus HTTP API** 实现分钟级监控数据抓取，集成 **Ansible Runner API** 实现预测触发后的无人值守自愈。通过 Webhook 机制与即时通讯软件打通，构建了‘监测-预测-执行-反馈’的自动化闭环。”

**梓涵，这套“API 驱动”的逻辑非常有 SRE 的风范。你想让我帮你写一个完整的、包含 Prometheus 查询和 Ansible 触发的 Python 脚本 demo 吗？这可以直接作为你项目的核心代码展示。**
