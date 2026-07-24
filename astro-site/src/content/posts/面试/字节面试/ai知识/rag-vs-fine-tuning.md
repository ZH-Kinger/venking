---
title: "RAG_vs_Fine-tuning"
date: 2026-07-23
category: "面试"
---
## 知识注入：RAG vs Fine-tuning

如果你想让 AI 知道你博客 **ZH-Kinger** 里的私有部署文档，你有两种方法：

-   **Fine-tuning (微调)**：把文档喂给模型，重新训练它的“大脑”。

-   *缺点*：贵，更新慢。就像让专家把你的书背下来。

-   **RAG (检索增强生成 - Retrieval-Augmented Generation)**：**这是目前的绝对主流**。

-   *原理*：AI 并不背你的文档，而是当你提问时，它先去你的文档库（向量数据库）里“翻书”，把找到的相关内容贴在 Prompt 里一起发给大脑。
-   *比喻*：给 AI 准备了一台能联网的电脑和一套开卷考试的资料。
