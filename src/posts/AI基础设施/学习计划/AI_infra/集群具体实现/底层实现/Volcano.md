---
title: "Volcano"
icon: cpu
date: 2026-07-23
category:
  - AI基础设施
---
Volcano 是跑在 Kubernetes 上的 **AI / HPC / 大数据批任务调度系统**。它不是替代 K8s，而是在 K8s 上增强调度能力，特别适合你现在这种：

```
K8s + Volcano + GPU 集群 + 用户 SDK 提交训练任务
```

一句话理解：

**K8s 管机器和容器，Volcano 管大规模训练任务怎么排队、怎么抢资源、怎么一起启动。**

---

**为什么需要 Volcano**

普通 K8s 默认调度器更适合这种任务：

```
Web 服务
API 服务
Deployment
普通 Pod
```

比如一个服务要 3 个副本，K8s 可以先启动 1 个，再启动 2 个，问题不大。

但是 AI 训练不一样。

假设用户提交一个分布式训练任务：

```
需要 4 台机器
每台 8 张 GPU
总共 32 张 GPU
```

这个任务通常要求：

```
4 个 worker 要一起启动
否则训练没法开始
```

如果普通 K8s 只调起来 2 个 worker，另外 2 个一直 Pending，就会出现：

```
GPU 被占着
任务又跑不起来
资源浪费
```

Volcano 解决的就是这个问题。

---

**Volcano 最核心的能力**

第一是 **Gang Scheduling，成组调度**。

意思是：

```
资源够，就整组一起启动
资源不够，就一个都先不启动
```

比如：

```
Job 需要 4 个 Pod
minAvailable = 4
```

那么 Volcano 会等到能同时满足 4 个 Pod 的资源后再调度。

这对分布式训练非常重要。

---

第二是 **Queue，队列管理**。

你可以给不同团队建队列：

```
team-a queue
team-b queue
research queue
inference queue
```

每个队列可以有自己的资源策略：

```
team-a 最多 80 张 GPU
team-b 最多 40 张 GPU
高优先级任务可以抢占低优先级任务
```

所以 Volcano 不只是“找机器”，它还会考虑：

```
谁先来
谁优先级高
哪个团队还有配额
资源怎么公平分
```

---

第三是 **Priority / Preemption，优先级和抢占**。

比如：

```
普通实验任务：低优先级
紧急线上训练：高优先级
老板演示任务：更高优先级
```

当资源不够时，高优先级任务可以抢占低优先级任务。

---

第四是 **Binpack / Backfill，提高资源利用率**。

比如集群里碎片资源很多：

```
gpu-01 剩 2 张卡
gpu-02 剩 1 张卡
gpu-03 剩 4 张卡
```

Volcano 可以根据插件策略更聪明地放置任务，减少 GPU 碎片。

---

**Volcano 的几个核心组件**

官方架构里，Volcano 主要由这几个组件组成：

```
volcano-scheduler
volcano-controller-manager
volcano-admission
vcctl
```

---

**1. volcano-scheduler**

这是最核心的组件。

它负责真正调度任务：

```
这个 Job 该不该运行？
该放到哪些 GPU 节点上？
是否满足 minAvailable？
是否符合 Queue 资源限制？
是否要抢占别的任务？
```

你的训练 Pod 里通常会写：

```
schedulerName: volcano
```

这样这些 Pod 就不是交给 K8s 默认调度器，而是交给 Volcano Scheduler。

---

**2. volcano-controller-manager**

它负责管理 Volcano 的 CRD 生命周期。

比如你创建一个 VolcanoJob：

```
VolcanoJob
```

Controller 会继续创建和维护：

```
PodGroup
Pod
Job 状态
生命周期状态
```

你可以把它理解成：

```
VolcanoJob 的执行管家
```

---

**3. volcano-admission**

这是准入校验组件。

它负责在任务进入集群前检查：

```
VolcanoJob 写得对不对
Queue 是否存在
参数是否合法
是否需要补默认值
```

比如用户 SDK 传了一个不存在的 queue，admission 可以直接拒绝。

---

**4. vcctl**

这是 Volcano 的命令行工具。

类似：

```
kubectl 是 K8s 的客户端
vcctl 是 Volcano 的客户端
```

不过你已经封装 SDK 了，普通用户一般不用直接接触它。

---

**Volcano 的几个核心对象**

你最需要理解这 4 个：

```
VolcanoJob
PodGroup
Queue
Task
```

---

**VolcanoJob**

这是用户提交的训练任务。

比如：

```
llama-sft-001
```

里面定义：

```
镜像是什么
启动命令是什么
需要几张 GPU
有几个 worker
属于哪个 queue
最少几个 Pod 同时启动
挂载哪些数据目录
```

---

**PodGroup**

这是 Volcano 做成组调度的关键。

比如一个任务有：

```
1 个 master
3 个 worker
```

Volcano 会把它们看成一个 PodGroup。

如果你设置：

```
minAvailable = 4
```

意思就是：

```
至少 4 个 Pod 都能跑，这个任务才启动
```

---

**Queue**

Queue 是队列，也可以理解成团队资源池。

比如：

```
team-a
team-b
default
research
```

每个 VolcanoJob 都会进入一个 Queue。

---

**Task**

Task 是 VolcanoJob 里面的角色。

比如 PyTorch 分布式训练可以拆成：

```
master task
worker task
```

一个 VolcanoJob 里可以有多个 task，每个 task 可以有多个副本。

---

放到你自己的平台里，完整链路是：

```
用户 SDK
   |
   v
平台 Backend
   |
   v
创建 VolcanoJob
   |
   v
volcano-admission 校验
   |
   v
volcano-controller-manager 创建 PodGroup / Pod
   |
   v
volcano-scheduler 按 Queue / Gang / GPU 资源调度
   |
   v
GPU 节点 kubelet 启动容器
   |
   v
训练任务运行
```

如果用户还声明了端口暴露：

```
expose jupyter:8888
```

你的平台还会创建：

```
Service
Ingress
访问 URL
```

---

你可以这样记：

```
K8s = 集群底座
Volcano = AI 任务调度器
VolcanoJob = 用户提交的训练任务
PodGroup = 一组必须一起调度的 Pod
Queue = 团队资源池
Ingress + Service = 用户访问任务端口
```

参考：Volcano 官方 [Introduction](https://volcano.sh/docs/home/introduction/)、[Architecture](https://volcano.sh/docs/home/architecture/)、[VolcanoJob](https://volcano.sh/docs/concepts/volcanojob/)、[PodGroup](https://volcano.sh/docs/concepts/podgroup/)。
