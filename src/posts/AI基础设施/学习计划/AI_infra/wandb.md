---
title: "wandb"
icon: cpu
date: 2026-07-23
category:
  - AI基础设施
---
**Weights & Biases（简称 W&B 或 WandB）** 是一个专门针对机器学习与深度学习开发者的**模型训练可视化与实验跟踪工具**。

你可以把它理解为机器学习领域的“代码版本控制+运行日志仪表盘”。在训练模型（如神经网络）时，我们通常需要监控大量的参数和指标，WandB 就是为了解决这些痛点而设计的。

它的核心功能主要包括以下几个方面：

1.  **实验跟踪（Dashboard & Metric Tracking）**

-   **功能**：自动记录训练过程中的损失函数（Loss）、准确率（Accuracy）、学习率（Learning Rate）等指标，并实时绘制成可视化图表。
-   **优势**：不需要你手动用 `matplotlib` 画图。只要在代码中插入几行 API，训练数据就会实时同步到 WandB 的云端（或本地私有部署的服务器），你可以在浏览器中直观地看到训练趋势。

  

2.  **超参数调优（Sweeps）**

-   **功能**：自动进行超参数搜索（如网格搜索、随机搜索、贝叶斯优化）。
-   **优势**：你只需要定义好超参数的范围，WandB 就会自动并发启动多个训练任务，并在后台帮你对比哪组超参数的效果最好。

  

3.  **模型与数据集版本控制（Artifacts）**

-   **功能**：对训练数据集、验证集以及训练出来的模型权重（Weights）进行版本管理。
-   **优势**：类似于 Git 针对代码，Artifacts 针对的是大文件。它能记录“某次训练用了哪个版本的数据集，产出了哪个版本的模型”，实现完全的可复现性。

  

4.  **系统监控（System Metrics）**

-   **功能**：自动监控运行训练任务的硬件状态，包括 GPU/CPU 使用率、显存占用、内存占用、系统温度等，帮你排查是否存在显存溢出（OOM）或硬件瓶颈。

  

5.  **协作与分享（Collaboration）**

-   **功能**：你可以创建团队项目，把实验结果分享给同事或导师。
-   **优势**：支持撰写报告（Reports），直接把动态运行的图表插入到文档中，方便展示和学术交流。

  

### 核心工作原理

WandB 的使用非常轻量。在 Python 代码中，你只需要初始化并记录数据：

```python
import wandb

# 1. 初始化项目
wandb.init(project="my-awesome-project", config={"learning_rate": 0.01, "epochs": 10})

# 2. 模拟训练循环
for epoch in range(10):
    loss = 2 ** -epoch  # 模拟 loss 变小
    # 3. 记录指标
    wandb.log({"epoch": epoch, "loss": loss})

# 4. 结束实验
wandb.finish()

```

运行这段代码后，命令行会输出一个链接，点击进去就能在网页端看到漂亮的折线图。它目前原生支持 PyTorch、TensorFlow、Keras、Hugging Face (Transformers)、Ultralytics (YOLO) 等几乎所有主流的机器学习框架。

你目前是在进行具体的模型训练实验，还是在技术选型中对比它与 TensorBoard 等工具的区别？
