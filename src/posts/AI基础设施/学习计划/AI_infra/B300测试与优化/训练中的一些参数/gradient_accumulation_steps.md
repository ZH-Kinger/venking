---
title: "gradient_accumulation_steps"
icon: cpu
date: 2026-07-23
category:
  - AI基础设施
---
在大模型和分布式深度学习训练中，`gradient_accumulation_steps`**（梯度累积步数）** 是一种极其精妙的“物理显存避险与过载外挂”技术。

简单来说：**它允许你在“显存不爆”的前提下，通过时间（多次计算）换空间（显存），物理模拟出一个超级巨大的 Batch Size（批大小）来训练模型。**

它是消费级显卡（如 RTX 3090/4090）或受限算力节点训练百亿、千亿参数大模型时不可或缺的底层黑科技。

---

### 一、 为什么要用它？（直面显存物理墙）

我们在前文讨论过，增大 **Batch Size (BS)** 能让显卡吃得更饱、训练更稳定。  
但是，大模型的参数量巨大，在训练过程中，显卡需要塞入：*模型参数 + 梯度 + 优化器状态 +* ***激活值（Activation）***。

-   如果你的目标是让模型以 **BS = 128** 进行训练，但你的显卡显存很小（比如只有 24GB），你一把塞入 128 个样本，显卡会瞬间爆显存崩溃（**Out of Memory，OOM**）。
-   如果你妥协，把 BS 降到 **16**，显卡确实不爆了，但是 16 的小 Batch 会导致梯度噪声太大，模型根本无法稳定收敛，训练出来的效果极差。

`gradient_accumulation_steps` **就是为了解决这个“既要大 Batch Size，又不想爆显存”的物理死锁。**

---

### 二、 它的物理工作原理是什么？

假设你的目标是 **全局 Batch Size（Global Batch Size）= 128**，但你的显存极限只能承受 **微批次（Micro Batch Size）= 16**。

你可以设置 `gradient_accumulation_steps = 8`（因为 $16 \times 8 = 128$）。  
系统在后台会开启以下“分批攒大招”的物理循环：

```plain
       ┌────────────────────────────────────────────────────────┐
       │   1. 连续跑 8 个 Step (每个 Step 只喂入 Micro BS=16)     │
       │   - 每次只计算梯度 (Gradient)，但【不更新】模型参数         │
       │   - 每次算出来的梯度，在显存里默默【累加 (Accumulate)】    │
       └──────────────────────────┬─────────────────────────────┘
                                  │ (攒够了 8 步的梯度量)
                                  ▼
       ┌────────────────────────────────────────────────────────┐
       │   2. 迈出真正的“一大步” (Optimizer Step)                 │
       │   - 优化器利用这 8 步累加出来的总梯度，执行一次参数更新     │
       │   - 清空梯度累加池，重置计数器                            │
       └────────────────────────────────────────────────────────┘

```

#### 💡 物理效果对比：

通过这种“攒 8 步再更新一次”的方法：

-   **在算法层面上**：模型表现出来的更新逻辑，跟**一口气吃掉 128 个样本更新一次（Global BS = 128）在数学上是完全等价的**。
-   **在显存占用上**：由于每次前向/反向传播只处理 16 个样本，**显存压力被死死卡在 BS = 16 的极低水平线**。

---

### 三、 工业级 PyTorch 伪代码：它是怎么写出来的？

为了让你看透本质，其实这个逻辑在 PyTorch 的底层训练循环（Training Loop）里极其简单，只需要几行判断：

```python
# 假设配置
micro_batch_size = 16
gradient_accumulation_steps = 8  # 攒 8 步
global_batch_size = micro_batch_size * gradient_accumulation_steps # 128

optimizer.zero_grad()  # 在最开始清空梯度

for step, (inputs, targets) in enumerate(dataloader):
    # 1. 前向传播：每次只吃 16 个样本
    outputs = model(inputs)
    
    # ⚠️ 物理细节：因为我们攒了 8 步才更新一次，所以每一步的 Loss 必须除以 8 
    # 否则最终累加出来的梯度会物理放大 8 倍，导致模型直接跑飞（梯度爆炸）
    loss = criterion(outputs, targets) / gradient_accumulation_steps
    
    # 2. 反向传播：计算梯度，PyTorch 会在后台自动把梯度累加（Accumulate）到 .grad 属性中
    loss.backward()
    
    # 3. 核心判定：只有当攒够了 8 步（或者到了数据集的末尾），才执行真正的参数物理更新
    if (step + 1) % gradient_accumulation_steps == 0:
        # 物理迈出一步 (这一步才更新权重)
        optimizer.step()
        # 清空梯度池，准备下一次循环累加
        optimizer.zero_grad()
        
        print(f"🔄 [Step {step}] 攒满 8 步，物理执行一次模型参数更新！")

```
---

### 四、 使用它的硬冷物理权衡（Trade-offs）

虽然这个黑科技很完美，但作为架构师你必须接受它的**物理代价**：

1.  **训练总时间会线性拉长（以时间换空间）**：  
    虽然你用 16 的显存跑出了 128 的效果，但你物理上确实老老实实跑了 8 次前向和反向传播。它**不会缩短任何计算时间**，它唯一的功劳是**防止 OOM 崩溃**。
2.  **不增加显卡计算吞吐量（Samples/s 不变）**：  
    它的吞吐量依然受限于 Micro BS = 16 的速度。
3.  **对 Batch Normalization（批归一化）不友好**：  
    如果你的模型里包含 `BatchNorm` 层，BatchNorm 是强依赖单次 Batch 内样本的均值和方差的。由于物理上的 Batch 只有 16，它的统计量会失真。

-   *大模型时代幸免*：谢天谢地，当下的 Transformer 大模型（如 Llama、Gemma）底层全部改用了 **RMSNorm** 或 **LayerNorm（层归一化）**，这些归一化算法是在单条样本内部独立进行的，天生对梯度累积免疫，没有任何副作用。

  

### 💡 决策一句话：

当你想提升 Batch Size 来稳定大模型训练，但**显卡疯狂报错 OOM 时**，立刻在你的 DeepSpeed、Hugging Face `TrainingArguments` 或者是自研脚本里，调小 `per_device_train_batch_size`，同时\*\*成倍调大 `gradient_accumulation_steps**`。这是大模型微调中性价比最高、最无脑的显存降温良药。
