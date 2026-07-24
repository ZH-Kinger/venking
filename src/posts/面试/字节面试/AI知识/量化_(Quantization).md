---
title: "量化_(Quantization)"
icon: clipboard-text
date: 2026-07-23
category:
  - 面试
---
## 量化 (Quantization)：让 4B 模型跑在你的旧电脑上

你用的 Qwen-4B 之所以快，是因为它经过了**量化**。

-   **原理**：大模型的参数原本是 16 位或 32 位的高精度浮点数（很占显存）。量化就是把它们压缩成 8 位甚至 4 位（INT4）。
-   **价值**：牺牲极小的精度，换取几倍
