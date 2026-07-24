---
title: "ReAct_框架"
icon: clipboard-text
date: 2026-07-23
category:
  - 面试
---
## 推理范式：ReAct 框架 (Reasoning + Acting)

为什么 OpenClaw 能够“先思考再查内存”？因为它运行在 **ReAct 框架**上。

-   **传统模型**：像一个背书的学生，问它问题，它直接吐出一段话（经常幻读）。
-   **ReAct Agent**：像一个工作的工程师。它的思维链条是：

1.  **Thought (思考)**：我需要知道内存状态，应该用什么工具？
2.  **Action (行动)**：决定调用 `shell` 工具执行 `free -h`。
3.  **Observation (观察)**：看到输出结果。
4.  **Final Answer (总结)**：基于观察到的数据给出结论。

-   **核心点**：如果 AI 报错了，它是通过这个循环发现错误并自动纠错的。
