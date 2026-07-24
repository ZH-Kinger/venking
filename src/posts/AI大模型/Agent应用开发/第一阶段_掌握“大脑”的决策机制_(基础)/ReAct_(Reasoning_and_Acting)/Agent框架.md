---
title: "Agent框架"
icon: robot
date: 2026-07-23
category:
  - AI大模型
---
**ReAct (Reasoning + Acting)** 是当前构建 **AI 智能体 (AI Agent)** 的核心范式。以下是基于 ReAct 框架（或其变种）开发的主流应用、开源项目与产品：

### 一、主流开源 Agent 框架（基于 ReAct）

这些是开发者最常用的底层框架，直接实现或深度集成了 ReAct 逻辑。

1.  **LangChain (最流行)**

-   核心：`Agent` 模块原生支持 **ReAct** 模式（`create_react_agent`）。
-   功能：支持 LLM 思考、调用工具（搜索/计算器/API）、观察结果、循环直至完成任务。
-   应用：几乎所有基于 LangChain 构建的问答、自动化助手、数据分析应用。

2.  **AutoGPT (第一个现象级 ReAct 应用)**

-   核心：完全基于 ReAct 闭环，**自主设定目标、规划步骤、调用工具**。
-   特点：无需人类干预，自动拆解复杂任务（如市场调研、写代码、运营社交媒体）。
-   影响：引爆了“自主 AI 智能体”概念，是 ReAct 最知名的开源 Demo。

3.  **BabyAGI**

-   核心：简化版 ReAct 框架，专注 **任务生成、优先级排序、执行、复盘**。
-   特点：轻量、专注任务流管理，常被用于构建个人助理、研究助手。

4.  **LangGraph (LangChain 下一代)**

-   核心：将 ReAct 升级为 **状态图 (StateGraph)**，支持多智能体协作、循环、条件分支。
-   应用：构建更复杂的工作流（如代码开发、客户支持、多步骤数据分析）。

5.  **CrewAI**

-   核心：基于 ReAct，主打 **多智能体协作 (Multi-Agent)**。
-   特点：为不同 Agent 分配角色（产品经理/程序员/设计师），协同完成项目。
-   应用：自动软件开发、市场研究报告、内容创作团队。

  

### 二、知名商业产品（底层采用 ReAct）

这些面向用户的产品，其 AI 能力内核是 ReAct。

1.  **ChatGPT with Browse / Code Interpreter (GPT-4o)**

-   机制：当你开启 **联网搜索** 或 **代码解释器** 时，GPT-4 内部运行 ReAct 流程：

-   Thought: "需要最新数据，我得搜索。"
-   Action: 调用 Bing Search
-   Observation: 读取搜索结果
-   Thought: "信息足够，可以总结答案。"

2.  **GitHub Copilot Chat / Cursor (AI 编辑器)**

-   机制：理解复杂编程问题（"修复这个Bug并解释原因"），ReAct 循环：

-   思考：分析代码 → 行动：运行测试/查询文档 → 观察：报错信息 → 再思考：定位问题。

3.  **Perplexity Pro / Claude 3 (联网助手)**

-   核心：**学术/深度问答** 必用 ReAct。
-   流程：拆解问题 → 多轮学术搜索 → 精读论文 → 综合推理 → 输出结论。

4.  **Microsoft Copilot (Windows/365)**

-   机制：操作电脑/Office 时，执行 ReAct：

-   Thought: "用户要做PPT，需分析文档并生成大纲。"
-   Action: 读取Word → 生成幻灯片 → 检查格式。

  

### 三、垂直领域应用（ReAct 典型场景）

1.  **AI 数据分析**

-   **Tableau GPT, Power BI Copilot**：自然语言提问 → ReAct 生成 SQL/DAX → 查询数据库 → 可视化。

2.  **客户服务/客服机器人**

-   **IBM Watsonx Assistant, 阿里云小蜜**：理解用户问题 → 查询订单/物流系统 → 多轮对话解决。

3.  **研究与情报分析**

-   **Consensus, Elicit**：ReAct 驱动，自动检索、阅读、总结海量学术论文。

4.  **具身智能 (机器人/游戏)**

-   **Google DeepMind RoboCat**：机器人通过 ReAct 思考（"如何抓起杯子"）→ 执行动作 → 视觉反馈 → 调整策略。

### 总结

**ReAct 已成为现代 AI 应用的“操作系统”**。

-   **底层框架**：LangChain, LangGraph, AutoGPT, CrewAI
-   **大众产品**：ChatGPT (高级功能), Copilot, Perplexity
-   **企业场景**：数据分析、智能客服、自动化办公、研发助手

需要我帮你对比 **LangChain、CrewAI 和 AutoGPT** 的区别，帮你选择适合的 ReAct 框架吗？
