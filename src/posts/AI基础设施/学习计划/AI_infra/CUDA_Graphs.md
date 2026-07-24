---
title: "CUDA_Graphs"
icon: cpu
date: 2026-07-23
category:
  - AI基础设施
---
在大模型高并发推理（Inference，如 vLLM、TensorRT-LLM）以及极速微调场景中，**CUDA Graphs** 是一项由 NVIDIA 官方提供、用来**彻底干掉 CPU 开销、将显卡延迟（Latency）压榨到物理极限**的重型底层黑科技。

一句话道破本质：**传统的运行模式是“CPU 像个碎嘴子，下一条指令显卡打一枪”；而 CUDA Graphs 则是“CPU 提前把全套战术录制成一张铁板图直接丢给 GPU，GPU 自己在内部循环狂飙，彻底不需要 CPU 介入”。**

---

### 一、 痛点：为什么需要 CUDA Graphs？（干掉 CPU 墙）

在运行大语言模型（LLM）的自回归生成（Token-by-Token 吐字）或者小 Batch 推理时，你会遇到一个非常恶心的物理现象：**GPU 算力利用率极低，显卡根本不热，但推理速度就是提不上来。**

这背后的物理死穴叫做 **CPU 运行时开销（CPU Overhead）**：

1.  原生模式下，每一个 Step 包含成百上千个细小的算子（矩阵乘、加偏置、激活、LayerNorm）。
2.  每启动一个算子，CPU 上的 CUDA 驱动都要高频调用一次 `cudaLaunchKernel()`。这个调用不是免费的，每次会产生几微秒的 CPU 延迟。
3.  当算子数量极多、但每个算子计算量很小（如 LLM 推理的 Decode 阶段）时，**CPU 传话的速度（微秒级）远远慢于 GPU 爆算的速度（纳秒级）**。GPU 大量时间都在空转干等 CPU 发号施令。

---

### 二、 它是如何实现的？（核心物理流）

CUDA Graphs 的核心破局思路非常暴力：**录制（Capture）** $\rightarrow$ **实例化（Instantiate）** $\rightarrow$ **狂飙重放（Exec）。**

它的底层物理工作流分为三个严密的工程阶段：

#### 阶段 1：流录制模式（Stream Capture）

系统在正式运行前，会进行一次所谓的 **Warmup（预热录制）**。

-   CPU 照常执行一遍前向传播。但此时，CUDA 驱动会开启“录像机”。
-   驱动不会把算子真的一个个下发给 GPU 执行，而是将这些算子的内存地址、依赖关系、格点大小（Grid/Block Dimensions）全部捕捉下来。
-   最终，在 GPU 驱动层物理构建出一张完全静态的、固化好的 **DAG（有向无环图）**。

#### 2. 阶段 2：图实例化（Graph Exec / Executable Graph）

录制完成后，这张图被送入 CUDA 运行时的“压缩流水线”。

-   驱动会对这张静态图进行底层的硬件级拓扑优化，把成百上千个 Kernel 之间的依赖关系锁死，直接映射为 GPU 内部的**硬件调度队列（Hardware Queue）**。
-   这张图一旦被实例化，就变成了一个驻留在 GPU 驱动层内的静态“死物”。

#### 3. 阶段 3：零 CPU 介入重放（Zero-overhead Launch）

在后续正式的千万次循环训练或推理中，代码一字不改。

-   每当进入新的一步，CPU 只需要调用一次极轻量的一行物理指令：`cudaGraphLaunch(graphExec)`。
-   **物理奇迹发生**：CPU 传完这一句话后就可以直接去睡觉了。**GPU 硬件会根据内部早已固化好的图结构，自动、高并发、无缝串联地把所有算子一路炸过去**。算子与算子之间的切换间隙被压缩到了绝对零度（纳秒级）。

```plain
 【 传统原生模式：CPU-GPU 频繁拉扯 】
 CPU: [启动 Kernel 1] ──(几微秒延迟)──> GPU: [计算 10 纳秒] ──> 回传
 CPU: [启动 Kernel 2] ──(几微秒延迟)──> GPU: [计算 5 纳秒]  ──> 回传
 (CPU 变成坚固的物理瓶颈 🐢)

 【 CUDA Graphs 模式：一次录制，全线狂飙 】
 CPU: [只喊一声：Graph 启动！] ───> GPU 内部: [Kernel 1] ➔ [Kernel 2] ➔ [Kernel 3]
 (GPU 内部零间隙自主流转，速度飞起 🚀)

```
---

### 三、 在 PyTorch 中怎么用？

在现代 PyTorch 中，你既可以通过原生 CUDA API 手动录制，也可以通过 `torch.compile()` 顺理成章地自动开启。

#### 方式 A：通过 `torch.compile` 自动白嫖（最推荐）

我们在前文讲过 `torch.compile` 的三种模式。当你选择 `reduce-overhead` 时，PyTorch 底层就是通过 **TorchDynamo 生成 FX Graph，然后自动在后台为你套上一层 CUDA Graphs 外挂**：

```python
# 这行代码在后台会自动完成符号追踪、FX 图生成、并自动用 CUDA Graphs 把整张图录制到 GPU 中
compiled_model = torch.compile(model, mode="reduce-overhead")

```

#### 方式 B：原生的手动录制上下文（底层架构常用）

如果你在自研高并发的推理引擎（如特定 Agent 的极速响应网关），常用原生上下文管理器：

```python
import torch

# 1. 预热，确保缓存和内存分配器（CUDACachingAllocator）稳定
s = torch.cuda.Stream()
s.wait_stream(torch.cuda.current_stream())
with torch.cuda.stream(s):
    for _ in range(3):
        static_output = model(static_input)
torch.cuda.current_stream().wait_stream(s)

# 2. 开启录像机，创建 CUDA Graph 对象
g = torch.cuda.CUDAGraph()

# 3. 开始物理录制
with torch.cuda.graph(g):
    static_output = model(static_input)

# 4. 后续消费：在千万次循环中，直接重放图！
for _ in range(10000):
    # 如果是推理，先将动态输入拷入 static_input 的固定显存地址
    g.replay() 
    # 从 static_output 的固定显存地址直接拿结果，全程 0 CPU 开销！

```
---

### ⚠️ 工业落地的冷酷铁律（天下没有免费的午餐）

CUDA Graphs 速度快到飞起，但它的肉身极其娇贵，在工程上有两大不可逾越的红线：

1.  **绝对静态内存锁定（Static Memory Address）**：  
    CUDA Graphs 录制的是**死死的物理显存指针地址**。这意味着，你在重放图（`g.replay()`）的时候，输入和输出的 Tensor 在显存里的**物理首地址绝对不能变**。你不能申请新内存，只能玩命地用 `.copy_()` 把新数据覆盖进那个录制好的“固定坑位”里。
2.  **绝对静态形状锁定（Static Shapes）**：  
    如果你的输入 Tensor 的维度（Shape）发生改变（例如大模型这一轮处理 10 个 Token，下一轮处理 15 个 Token），**原先录制的硬件拓扑结构当场作废**，强行重放直接引发 CUDA 内存非法越界崩溃。

-   *大模型 Infra 是怎么解的*：像 vLLM 这样的顶级推理框架，为了享受到 CUDA Graphs 的极限低延迟，会在系统启动时，**在后台提前把各种可能遇到的长度（如 1 到 2048）全部排列组合录制好几百张不同的 CUDA Graphs 缓存在显存里**（这就是为什么 vLLM 极其吃显存的原因）。运行时输入长度是多少，就动态路由调度对应那张图去重放，拿空间换取绝对的极速。
