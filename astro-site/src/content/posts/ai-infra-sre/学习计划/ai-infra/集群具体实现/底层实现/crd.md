---
title: "CRD"
date: 2026-07-23
category: "AI 基础设施"
---
在大模型智算中心和云原生基础设施的语境下，**CRD（Custom Resource Definition，自定义资源定义）** 是 **Kubernetes（K8s）** 生态中最核心的“大招”和灵魂机制。

一句话道破本质：**CRD 是 Kubernetes 留给开发者的“乐高扩展接口”。通过它，你可以打破 K8s 原生只认识 Nginx、微服务（Pod、Deployment、Service）的局限，强行让 K8s 听懂并认识大模型时代的硬核新名词（比如 `PyTorchJob`、`VolcanoJob`、`TensorflowJob`）。**

把 CRD 放进我们前文聊到的大模型 AI Infra 宇宙里，它的底层原理与核心红利可以这样详细拆解：

### 一、 为什么大模型智算必须依赖 CRD？

Kubernetes 诞生之初，是用来调度传统 Web 网页、微服务或者数据库的。它天然只认识一些固定好的对象（内置资源），比如：

- **Pod**：运行一个容器。
    
- **Deployment**：管理多个 Pod 的副本数量。
    

**大模型的变态痛点**：

大模型的分布式训练任务是一套极其复杂的“团战”。正如我们刚才聊到的，一个大模型任务需要 16 台机器（128张 GPU 卡）组团启动（Gang Scheduling）、声明多轨网络、挂载 Weka 存储，还要指定主节点（Master）和工作节点（Worker）。

这种复杂的“AI 批量作业（Batch Job）”，传统的 K8s 概念完全无法表达。AI 架构师们迫切需要一种手段，能直接向 K8s 声明：“我今天要运行一个对象叫做 `PyTorchJob`，它里面包含了 16 个 Worker 容器，请帮我用 Volcano 调度器整体拉起来。”

**CRD 就是用来在 K8s 的大脑（API Server）里，注册这个全新“新词汇”的物理定义。**

### 二、 CRD 的运行图景：CRD + Custom Resource + Controller

CRD 在生产落地中，通常由三个部分咬合成一个闭环：

#### 1. CRD（自定义资源定义 —— 模板注册）

开发人员（例如 Volcano 团队或 Kubeflow 团队）编写一个 YAML 文件，提交给 K8s。这个 YAML 就像一张营业执照，告诉 K8s：**“从今往后，集群里多了一种全新的资源类型，名字叫 `VolcanoJob`。”**

#### 2. CR（Custom Resource，自定义资源 —— 你的任务单）

你（算法工程师或 Infra 运维）在提交大模型微调任务时，写下一段普通的 YAML 配置。因为 K8s 已经通过 CRD 认识它了，所以 K8s 会高高兴兴地把这个任务单存进底层的数据库（etcd）里：

YAML

```
apiVersion: batch.volcano.sh/v1alpha1
kind: VolcanoJob  # ◄── 这就是一个由 CRD 定义出来的全新自定义资源
metadata:
  name: llama3-8b-finetune
spec:
  minAvailable: 16 # ◄── 配合 Volcano 实现 Gang Scheduling（少于16台死不开工）
  tasks:
    - replicas: 16
      template:
        spec:
          containers:
            - name: pytorch-container
```

#### 3. Controller / Operator（控制器 —— 干活的打工人）

只有 CRD 和 CR，K8s 还只是把任务单“记在了账本上”，并没有人去物理搬运服务器。

必须配合一个常驻后台的**控制器（Controller / Operator 进程）**。Volcano 控制器会高频死盯着 K8s 账本，一旦发现有人提交了 `kind: VolcanoJob`，它就会立刻跳出来执行它体内的 AI 调度算法，命令 K8s 控制面：**“去！挑选 16 台连在同一个 Spine-Leaf 交换机下、插着 `mlx5_0` 智能网卡的物理机，把这 16 个 PyTorch 容器给我组团砸上去！”**

### 三、 总结：大模型 Infra 团队得到了什么红利？

1. **全面声明式 API 托管**：大模型、小模型、数据清洗任务全都可以化为一根根标准干净的 YAML 织物（CRD）。你可以直接用标准的 `kubectl get volcanojob` 甚至 GitOps 流水线去统一管理和监控你的万卡训练集群。
    
2. **厂商无缝生态焊接**：不管是阿里云灵骏网络、华为云昇腾、还是自建的 HPC 算力池，厂商们只需要为自己的黑科技网络（如 HPN、Solar-RDMA 的配置）编写一套 K8s CRD 及其配套的 Controller，就能瞬间白嫖整个 Kubernetes 庞大成熟的调度、监控和资源分配生态，不需要去改动 K8s 哪怕一行的核心源码。
