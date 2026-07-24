---
title: "Volcano"
date: 2026-07-23
category: "AI 基础设施"
---
大语言模型（LLM）与智能体（Agent）的训练与推理正以前所未有的速度向前推进。在云原生算力底座中，**Volcano** 作为 CNCF 首个也是唯一一个容器批量调度项目，已经成为分布式 AI 训练（如大规模大模型预训练、RLHF 强化学习对齐）的黄金底座。

将为你彻底解刨 Volcano 的底层物理实现，并给出如何让你的 Agent 与 Volcano 深度绑定、实现“智商与算力完美咬合”的工业级落地架构。

---

# 第一部分：Volcano 到底是怎么实现的？

原生 Kubernetes 的 `kube-scheduler` 是典型的“单体流控”设计：它像一条狭窄的安检通道，不管后面有多少人，它每次只拉出一个 Pod 独立评估，找个坑位塞进去。这在 AI 分布式训练中会导致灾难性的死锁（比如一个 8 卡并行的训练任务，原生调度器塞进去了 7 个 Pod，第 8 个由于没显存挂起了，导致前面的 7 个 Pod 永远在空等，白白霸占显存）。

Volcano 彻底打破了这种限制，它的底层实现由以下 **三大硬核支柱** 构成：

### 1\. 核心物理组件架构

Volcano 并没有去改写 K8s 源码，而是通过 **CRD（自定义资源）** 和一套独立的分布式调度管道与 K8s 平行运转：

-   `vcjob` **与** `PodGroup` **(自定义控制器)**：这是 Volcano 的行政层。它不再以 Pod 为最小单位，而是把一个训练任务的所有 Pod 绑定在一起，抽象成一个 `PodGroup`。
-   **Volcano Admission (网关守护)**：一个 Webhook 服务器，负责对提交的作业进行拦截与校验，如果格式或基础配额不满足直接在前线熔断。
-   **Volcano Scheduler (大脑核心)**：核心调度器，它采用了一种基于 **Session（会话）** 的“宏观快照机制”。

### 2\. 基于 Session 的四步闭环流转

与原生调度器不同，Volcano Scheduler 在运行时，会周期性地对整个集群的 CPU、内存、显存（GPU/Ascend）等拓扑状态拍摄一张**全局快照**，并开启一个临时的 **Session 线程**。在 Session 内部，作业会死死遵循以下五个动作顺序（Actions）的爆算：

$$
\text{Session Start} \longrightarrow \text{Enqueue} \longrightarrow \text{Allocate} \longrightarrow \text{Preempt} \longrightarrow \text{Reclaim} \longrightarrow \text{Backfill} \longrightarrow \text{Session Close}
$$

1.  **Enqueue（入队）**：根据不同队列（Queue）的权重，决定把哪些处于 Pending 状态的 VCJob 放进本次调度的备选池。
2.  **Allocate（物理分配）**：调度器开始遍历备选池。此时注册在后端的核心插件（Plugins）开始介入（例如计算**DRF主资源公平度**、计算显卡物理拓扑拓扑网络）。
3.  **Preempt（高频抢占）**：如果高优先级任务进场但资源不够，根据策略暴力驱逐或暂停低优先级的 Pod，腾出连续的显存块。
4.  **Backfill（回填机制）**：如果大任务之间有细碎的空闲资源（如剩下 1 个卡、2核CPU），快速挑选一些小推理或清洗任务塞进去，将集群算力利用率压榨到极限。

### 3\. 杀手级算法插件（Plugins）

Volcano 的真正威力在于将复杂的分布式调度算法模块化（Plug-and-Play）：

-   **Gang Scheduling（组团调度 / 全员到齐）**：设置一个 `minAvailable` 参数。只有当集群内有足够的物理卡能一次性把这个作业所需的所有 Pod 同时拉起时，才允许执行分配；否则资源一个都不放，防止死锁。
-   **Binpack（紧凑打包）**：尽量把 Pod 往同一台机器或同一个机架（Rack）上塞，缩短多卡之间 NVLink 或者是 RDMA 网络的物理通信距离，防止网络阻塞导致 `Step/s` 慢。

---

# 第二部分：如何让 Volcano 和你的 Agent 一起协同工作？

如果你的 Agent 正在做一件重型任务——例如“自主感知线上日志 $\rightarrow$ 动态拉起 10 亿参数的小模型进行微调测试 $\rightarrow$ 动态压测推理 $\rightarrow$ 评估上线”**。或者你的多智能体矩阵（Multi-Agent）在探索中需要**动态调配物理算力。

你需要将 Agent 的“规划脑”**与 Volcano 的**“算力腿”进行咬合。以下是工业界最成熟的 **Agent-Volcano 编排架构**：

```plain
                              ┌───────────────────────────┐
                              │    User / Task Trigger    │
                              └─────────────┬─────────────┘
                                            │
                                            ▼
                              ┌───────────────────────────┐
                              │  LLM Agent (Planning Core)│ ───> 负责拆解任务、评估所需显存
                              └─────────────┬─────────────┘
                                            │
                   ┌────────────────────────┴────────────────────────┐
                   │ (通过 MCP / K8s Client 物理注入声明式定义)          │
                   ▼                                                 ▼
     ┌───────────────────────────┐                     ┌───────────────────────────┐
     │ Volcano 集群状态只读流     │                     │  Volcano CRD (VCJob/Queue)│
     │  (Watch API / PodGroup)   │                     │   (动态算力供给 / 弹性扩缩)   │
     └─────────────┬─────────────┘                     └─────────────┬─────────────┘
                   │                                                 │
                   │ (作为 Observation 反馈)                          │ (驱动集群做出物理响应)
                   ▼                                                 ▼
      [ Agent 反思与动态调度决策 ]                       【 GPU / NPU 算力集群物理层 】
      - 发现 Queue 占满 ➔ 自动降级 BS                     - Gang 机制避免死锁
      - 发现节点挂掉 ➔ 重试拉起训练                       - Binpack 压榨 Samples/s

```

### 核心落地方案：构建基于 MCP (Model Context Protocol) 的 K8s 算力工具箱

别让 Agent 直接去生写复杂的 YAML 文件，这会导致幻觉。你应该为 Agent 封装一组极其严格的 **K8s API 工具（Tools）**，让 Agent 通过 **Tool Use (Function Calling)** 动态下发指令。

#### 1\. 赋予 Agent “看懂算力队列”的眼睛 (Observation Tool)

让 Agent 在决定拉起大模型微调前，先去嗅探 Volcano 的队列水位：

```python
import notebook
from kubernetes import client, config

def get_volcano_queue_status(queue_name: str):
    """
    Agent 专用工具：获取当前 Volcano 特定计算队列的剩余配额和排队状况。
    """
    config.load_incluster_config() # 或者 load_kube_config()
    custom_api = client.CustomObjectsApi()
    
    # 读取 Volcano Queue CRD 状态
    queue = custom_api.get_cluster_custom_object(
        group="batch.volcano.sh",
        version="v1alpha1",
        plural="queues",
        name=queue_name
    )
    
    # 提取关键信息，返回给大模型供其思考
    allocated = queue.get('status', {}).get('allocated', {})
    pending_jobs = queue.get('status', {}).get('pending', 0)
    
    return {
        "queue": queue_name,
        "current_allocated_resources": allocated,
        "pending_jobs_count": pending_jobs,
        "verdict": "Cluster is crowded" if pending_jobs > 0 else "Cluster is clear"
    }

```

#### 2\. 动态编译并投喂弹性作业 (Action Tool)

当 Agent 分析完当前任务（例如：“需要为这个特定垂直领域微调一个 8B 的模型”），它可以通过工具当场向 Volcano 投递一个带有 **Gang Scheduling** 的高规格训练作业：

```python
def launch_agent_training_job(job_name: str, num_gpus: int, micro_bs: int):
    """
    Agent 专用工具：根据模型大小与显存预估，动态生成并向 Volcano 投递分布式微调 VCJob。
    """
    custom_api = client.CustomObjectsApi()
    
    # 物理构建基于 Volcano 规范的声明式 JSON 骨架
    vcjob_manifest = {
        "apiVersion": "batch.volcano.sh/v1alpha1",
        "kind": "Job",
        "metadata": {"name": job_name},
        "spec": {
            "minAvailable": num_gpus,  # 🌟 核心： Gang 插件的物理硬门禁，少于这个卡数绝不启动
            "schedulerName": "volcano", # 指定由 Volcano 强力调度，而非原生
            "queue": "ai-training-queue",
            "tasks": [{
                "replicas": num_gpus,
                "name": "worker",
                "template": {
                    "spec": {
                        "containers": [{
                            "name": "llama-finetune",
                            "image": "my-registry/llama3-finetune:latest",
                            "env": [
                                {"name": "MICRO_BATCH_SIZE", "value": str(micro_bs)},
                                {"name": "GRADIENT_ACCUMULATION_STEPS", "value": "8"}
                            ],
                            "resources": {
                                "limits": {"nvidia.com/gpu": "1"}, # 每辆车1张卡
                                "requests": {"nvidia.com/gpu": "1"}
                            }
                        }],
                        "restartPolicy": "Never"
                    }
                }
            }]
        }
    }
    
    # 向 K8s API 网关发起物理注射
    response = custom_api.create_namespaced_custom_object(
        group="batch.volcano.sh",
        version="v1alpha1",
        namespace="default",
        plural="jobs",
        body=vcjob_manifest
    )
    return f"🚀 智能体已成功通过 Volcano 拉起分布式微调作业: {job_name}，锁定卡数: {num_gpus}"

```

### 3\. Agent 与 Volcano 深度共生的三大高级场景

一旦你打通了这条闭环链路，你的 Agent 可以解锁以下极高阶的**自治运维红利（MLOps Autopilot）**：

-   **动态显存自适应（Elastic Batch Size）**：  
    Agent 发现当前大算力 Queue 被其他人占满，排队数极高。Agent 可以通过反思，主动修改策略，自动降低 `num_gpus`（比如从 8 卡降到 2 卡），同时成倍调高代码里的 `gradient_accumulation_steps`（梯度累积），向小算力的低优队列投递任务，完成**曲线救国**。
-   **训练崩溃故障自治愈（Auto-Healing）**：  
    在长时间训练中，某台机器的 GPU 可能会发生物理掉线（ECC错误/XID报错）。Volcano 会立刻捕捉到 PodGroup 状态异常并同步回 K8s Event。Agent 的感知管道监测到报错后，可以自动执行健康检查，向 Volcano 申请清空该故障节点的亲和性（Affinity），重新挑两台好机器一键拉起训练，并自动挂载最新的 Checkpoint。
-   **强化学习（RLHF）的动态在线进化**：  
    在 Agentic 演进中，Agent 可以扮演评判者。当它发现生产环境的用户反馈恶化时，当场在后台调度 Volcano 启动多节点分布式评测；Volcano 凭借 **Binpack** 算法在极短时间内把评测容器密集拉起、几秒钟跑完吞吐并当场销毁释放显存，Agent 读取结果后完成认知升级。

**冷酷选型铁律：**  
不要指望用传统的 shell 脚本去管理大模型智能体的后端算力。**让 Agent 作为“大智慧的决策者（发号施令的甲方）”，让 Volcano 作为“底层超强吞吐、死锁免疫的算力大总管（干苦力的乙方）”**，通过 K8s CRD API 作为它们唯一的沟通圣经，这是目前大模型全栈 Infra 团队最优雅、最高效的工程标准形态。
