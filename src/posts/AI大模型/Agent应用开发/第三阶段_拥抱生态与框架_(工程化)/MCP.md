---
title: "MCP"
icon: robot
date: 2026-07-23
category:
  - AI大模型
---
在大模型和 Agent 生态中，**MCP** 全称是 **Model Context Protocol（模型上下文协议）**。

它是由 Anthropic 公司于 2024 年底开源、并迅速成为行业事实标准的一项**开放性网络协议**。

如果把大模型（LLM）比作一台性能强劲的“全功能 CPU”**，那么 MCP 就是计算机主板上的**“USB 接口规范”。它规定了外设（如数据库、本地文件系统、开发工具、Web API）应该通过何种统一的标准连接到大模型上。

---

### 一、 为什么需要 MCP？（它解决了什么行业死穴）

在 MCP 出现之前，大模型连接外部世界（如读写本地文件、查数据库）的做法非常原始且混乱：

-   **传统的 Tool/Function Calling 痛点**：每一个开发者、每一个软件（如 Cursor、Claude Desktop、Dify）连接数据库时，都需要自己手写一套私有的 API 胶水代码和特定的 Prompt 描述。
-   **碎片化灾难**：如果市场上出现了 10 个优秀的 AI IDE 和 100 个开发者常用的工具（如 Jira、GitLab、PostgreSQL），行业就需要编写 $10 \times 100 = 1000$ 套互不兼容的集成代码。

**MCP 的解法：解耦连接层。**  
它制定了一个大一统一的标准。任何工具只需要开发一个符合 MCP 规范的 Server（服务端），任何支持 MCP 的大模型客户端（Client）就能直接无缝插拔调用它。

---

### 二、 MCP 的核心三层架构设计

MCP 协议的核心非常紧凑，主要由以下三个物理概念构成：

```plain
 ┌────────────────────────┐
 │   MCP Client (客户端)  │  (例如: Cursor 编译器 / Claude Desktop / 自研 Agent)
 └───────────┬────────────┘
             │
             ▼ (通过标准 JSON-RPC 2.0 协议通信)
 ┌────────────────────────┐
 │   MCP Server (服务端)  │  (暴露以下三种核心物理能力给大模型)
 └───────────┬────────────┘
             ├── 1. Resources (资源): 允许 LLM 以只读方式安全读取外部数据 (如：读特定文件、查数据库行)
             ├── 2. Prompts (提示词模板): 预设的结构化 Prompt 模板 (如：拉取特定报错分析模板)
             └── 3. Tools (工具): 允许 LLM 执行具有副作用的物理动作 (如：编译代码、外发邮件、重启服务)

```

1.  **Resources（资源）**：  
    向大模型提供**只读**的数据通道。比如，Server 可以把本地的 `logs/error.log` 或者一个 MySQL 数据表包装成一个 Resource 标识符（如 `postgres://db/users`）。大模型可以通过协议直接、安全地读取其内容。
2.  **Tools（工具）**：  
    向大模型提供可执行的、有副作用（Side-effects）的动作。这等同于传统 Function Calling 的升级版。大模型可以通过调用 Tool 去执行一条 Shell 命令、修改本地代码、或者调用企业内部的 API。
3.  **Prompts（提示词模板）**：  
    Server 内置的、由生产环境沉淀下来的黄金提示词模板。大模型客户端可以直接调用这些模板来初始化对话语境，避免用户手动复制粘贴复杂的 System Prompt。

---

### 三、 MCP 的底层物理通信机制

MCP 在底层采用极其成熟、轻量且好调试的 **JSON-RPC 2.0 协议** 作为通信骨架。客户端和服务端通常通过标准的输入输出流（STDIO）或者 **EventSource（SSE / WebSockets）** 进行跨进程或跨网络通信。

#### 💡 一个典型的 MCP 工具调用（Tool Call） JSON 数据流：

当大模型决定通过 MCP 调用一个名为 `fetch_k8s_logs` 的工具时，客户端会向 MCP 服务端发送这样一段标准的 JSON 报文：

```json
{
  "jsonrpc": "2.0",
  "method": "tools/call",
  "params": {
    "name": "fetch_k8s_logs",
    "arguments": {
      "cluster_name": "k8s-prod",
      "pod_name": "nginx-backend-xyz"
    }
  },
  "id": 42
}

```

MCP 服务端执行完物理的底层集群查询代码后，再用同样规范的 JSON 格式将日志文本回复给客户端。大模型读到数据，完成整条 RAG 或 Agent 推理闭环。

---

### 四、 极简工程选型总结

在当前大模型全栈开发与 Agent Infra 建设中：

-   **如果你在自研 AI 生态**：不要再手写私有的 Function Calling 胶水层了。直接基于 MCP 规范（开源社区提供了极其成熟的 Python 和 TypeScript SDK）来封装你的内部系统接口。
-   **最大的红利**：一旦你的服务支持了 MCP，它就能**无缝、零代码修改地**直接接入到 Cursor、Zed、Claude Desktop 等主流前沿 AI 生产力工具中，让这些全球顶级的大模型生态直接拥有操作你企业内部数据的能力。
