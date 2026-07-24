---
title: "Iterative_Loop"
icon: robot
date: 2026-07-23
category:
  - AI大模型
---
在大模型与 Agent 系统架构中，**Iterative Loop（迭代循环 / 自主闭环控制流）** 是让系统具备 **Agentic（智能体化）** 核心特征的物理引擎。

传统的 AI 调用是“单向直出”的：*输入* $\rightarrow$ *模型前向传播* $\rightarrow$ *吐出文本* $\rightarrow$ *结束*。  
而 **Iterative Loop** 引入了类似传统控制工程（如 PID 控制、状态机）的**反馈回路（Feedback Loop）**：系统在后端代码中拉起一个循环，让大模型自主决定动作、执行工具、捕获环境返回的错误或数据，然后**把结果作为新的上下文重新喂给自己，直到达成预期目标或触发硬熔断。**

最顶级的开源框架（如 Anthropic 官方 Agent 示例、LangGraph 等）在底层实现 Iterative Loop 时，都遵循一套被称为 **ReAct（Reasoning + Acting）** 循环的工业标准骨架。

---

### 一、 Iterative Loop 的核心物理循环架构

一个标准的迭代循环在后台每转动一圈（Turn），都要经历四个严格的状态转移：

```plain
     ┌─────────────────────────────────────────────────────────┐
     │                1. 思考阶段 (Thought)                     │
     │     LLM 评估当前状态与最终目标的差距，决定下一步动作        │
     └──────────────────────────┬──────────────────────────────┘
                                │
                                ▼ (决定调用某个工具)
     ┌─────────────────────────────────────────────────────────┐
     │                2. 行动阶段 (Action)                      │
     │     模型吐出标准的 JSON Schema 规范的工具参数             │
     └──────────────────────────┬──────────────────────────────┘
                                │
                                ▼ (代码层接管，物理执行)
     ┌─────────────────────────────────────────────────────────┐
     │               3. 物理执行与环境反馈 (Observation)         │
     │     网关并发拉起 API / Shell 脚本，捕获返回的 Data 或 Error  │
     └──────────────────────────┬──────────────────────────────┘
                                │
                                ▼ (将反馈拼回上下文，重回判断)
     ┌─────────────────────────────────────────────────────────┐
     │              4. 终止判定 (Convergence / Maximum Turns)  │
     │     检查：目标达成？命中硬熔断上限？ ──> 否 ──> 重回 1   │
     └─────────────────────────────────────────────────────────┘

```
---

### 二、 工业级工程落地：如何用 Python 亲手写一个 Iterative Loop

为了让你看透其底层的物理链路，这里不使用任何第三方重型框架（如 LangChain），直接使用 **Python 异步标准库 (**`asyncio`**)** 和原生的 **Pydantic / JSON Mode** 约束，手写一个具备**自我纠错能力**的极简工业迭代循环。

#### 场景设想：

用户要求 Agent 重启一台服务器，但输入的参数有误（故意输错）。看 Agent 如何通过 `Iterative Loop` 自主发现报错、更正参数并最终成功。

```python
import asyncio
from pydantic import BaseModel, Field
from typing import Literal, Optional

# 1. 严格划定大模型在循环中可以采取的动作 (Action Schema)
class ActionSelection(BaseModel):
    # FINISH 代表任务圆满完成退出；CALL_TOOL 代表需要执行物理外设
    action_type: Literal["CALL_TOOL", "FINISH"] = Field(description="当前决定执行动作还是结束任务")
    server_id: Optional[str] = Field(default=None, description="需要操作的服务器物理 ID，如 srv-001")
    reasoning: str = Field(description="当前步骤的思考过程 (Thought)")

# 2. 模拟外部物理世界环境 (物理 API / 环境反馈)
async def call_reboot_api(server_id: str) -> str:
    """真实世界的物理接口，带有严格的参数校验"""
    await asyncio.sleep(0.1) # 模拟网络 I/O 延迟
    # 故意埋下一个坑：真实生产环境的 ID 必须是 srv- 开头
    if not server_id.startswith("srv-"):
        return f"❌ [API 物理报错]: 非法 Server_ID 格式 '{server_id}'。合法格式必须以 'srv-' 为前缀！"
    return f"✓ [API 物理返回]: 服务器 {server_id} 重启指令下发成功，状态：RUNNING。"

# 3. 核心迭代循环控制器 (The Iterative Loop Engine)
class IterativeAgentEngine:
    def __init__(self, llm_client):
        self.llm = llm_client
        self.max_turns = 5 # ⚡ 工业铁律 1: 必须设置硬性最大循环上限，防止死循环烧暴 Token

    async def run_loop(self, user_goal: str):
        print(f"🎯 最终任务目标: '{user_goal}'\n" + "="*50)
        
        # 初始化循环上下文账本 (将初始目标投入记忆)
        messages = [{"role": "user", "content": f"你的终极任务目标是：{user_goal}。请通过迭代完成它。"}]
        
        # ⚡ 启动物理循环控制流 (Iterative Loop)
        for turn in range(1, self.max_turns + 1):
            print(f"🔄 [LOOP TURN {turn}/{self.max_turns}] 大脑启动前向传播思考...")
            
            # 让大模型读入迄今为止所有的执行历史，并严格约束输出格式
            llm_decision = await self.llm.get_structured_action(
                messages=messages, 
                schema=ActionSelection.model_json_schema()
            )
            agent_step = ActionSelection.model_validate(llm_decision)
            
            print(f"  🧠 思考 (Thought): {agent_step.reasoning}")
            
            # 【判断分支 1】：大模型评估认为任务已完美结束
            if agent_step.action_type == "FINISH":
                print("🏁 [LOOP 终止] 大模型自主宣告目标达成。")
                return "🎉 任务圆满成功！"

            # 【判断分支 2】：大模型决定调用工具
            print(f"  🔌 行动 (Action): 尝试调用重启工具，入参 server_id='{agent_step.server_id}'")
            
            # 代码层物理干活，拿到环境真实反馈 (Observation)
            observation = await call_reboot_api(agent_step.server_id)
            print(f"  📥 反馈 (Observation): {observation}")
            
            # ⚡ 关键步骤：将这一轮的思考、行动和环境反馈，全部物理追加(Append)到上下文账本中
            # 这使得下一轮循环启动时，大模型拥有了“刚刚报错了”的全新短时记忆
            messages.append({
                "role": "assistant", 
                "content": f"我上一步决定执行: {agent_step.action_type}, 参数为: {agent_step.server_id}。思考依据是: {agent_step.reasoning}"
            })
            messages.append({
                "role": "user", 
                "content": f"系统环境给出的真实物理反馈是: {observation}。请评估该反馈并决定下一步。"
            })
            print("-" * 50)

        # 【故障安全熔断】：转圈超过设定阈值
        return "🚨 [LOOP 物理熔断] 达到最大迭代步数上限，任务未能收敛，自动中断防雪崩。"

# ----------------------------------------------------
# 模拟大模型在循环中面对“报错反馈”时的连续智商表现
# ----------------------------------------------------
class MockLLM:
    def __init__(self):
        self.turn_count = 0

    async def get_structured_action(self, messages, schema):
        self.turn_count += 1
        if self.turn_count == 1:
            # 第一圈：大模型粗心大意，直接把用户输入的“001”丢进了槽位
            return {
                "action_type": "CALL_TOOL",
                "server_id": "001",
                "reasoning": "用户要求操作服务器 001，我决定直接激活重启接口。"
            }
        elif self.turn_count == 2:
            # 第二圈：大模型读到了上一圈 API 吐出的错误反馈，启动自主纠错机制
            return {
                "action_type": "CALL_TOOL",
                "server_id": "srv-001",
                "reasoning": "发现上一步接口报错提示 ID 格式非法，必须包含 'srv-' 前缀。我已经自动补全为 'srv-001' 并再次尝试。"
            }
        else:
            # 第三圈：看到接口返回了成功字样，满足收敛条件
            return {
                "action_type": "FINISH",
                "reasoning": "看到接口返回重启指令下发成功，任务已彻底闭环，我可以退出循环了。"
            }

# 运行控制流
engine = IterativeAgentEngine(MockLLM())
final_status = asyncio.run(engine.run_loop("帮我把 001 服务器重启一下"))
print(final_status)

```
---

### 三、 落地生产环境的 3 大冷酷铁律（防止资源雪崩）

当你在生产环境中实现 `Iterative Loop` 时，如果设计不当，系统会直接变成“吞金兽”。请务必锁死以下三道闸门：

1.  **铁律一：必须设置硬上限（Max Turns Guardrail）**大模型一旦面对一些逻辑打架的工具返回，极其容易陷入无限复读的死循环（例如：工具返回“A不存在”，模型思考“那我再查一次A”）。代码层必须死死卡住 `max_turns <= 5`（或者 10），超过次数必须强制中断，抛出系统异常并人工介入，防止账单瞬间暴涨。
2.  **铁律二：每次循环必须做 Token 裁剪（KV Cache Management）**  
    随着循环圈数越来越多，`messages` 数组会变得极其冗长。如果每次都把前面几圈厚重的“思考+工具返回”原封不动塞回去，不仅慢，而且由于后面的上下文噪声增加，大模型在第 4、5 圈时的智商会呈指数级下降。

-   *工业做法*：每一圈结束时，让一个小模型或纯代码去对上一圈的 `Observation` 进行压缩摘要（Summarization），只保留核心状态码，**物理精简上下文历史（Context Pruning）**。

  

3.  **铁律三：区分确定性异常与不确定性异常**

-   如果物理外设返回的是 `401 Unauthorized`（鉴权失败）或 `404 Not Found`，这种属于**确定性硬致命错误**，大模型再迭代一万遍也改不了权限，此时必须**在代码层直接触发 break 强行跳出循环**，不给大模型继续尝试的机会。
-   只有当返回 `400 Bad Request`（参数校验失败）、代码编译报错（SyntaxError）时，才允许模型进入下一轮 `Iterative Loop` 进行语义级别的自愈和重试。
