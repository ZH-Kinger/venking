---
title: "Caption"
icon: robot
date: 2026-07-23
category:
  - AI大模型
---
在大模型与 **Agent（智能体）开发**、尤其是 **Multimodal Agent（多模态智能体）** 的语境下，**Caption（图文描述 / 字幕 / 行为文本化）** 指的是**将非文本的模态（如图像、视频、音频、甚至屏幕 UI 界面）通过大模型转化为具有高稠密语义的结构化文本描述的过程。**

在 Agent 架构中，Caption 绝不仅仅是“给图片加个标签”，它是将物理世界的复杂视觉信号，物理降级翻译为大模型能够吞下、理解并进行逻辑推理的“语义大白话（Textual Representation）”。

为了让你在做 Agent 研发时彻底搞懂它的物理生态，我们可以从它的核心角色、三种主流应用场景以及典型的 Prompt/代码实现进行深度拆解：

---

### 一、 为什么 Agent 开发需要 Caption？（核心角色）

目前的 LLM（大语言模型）本质上是一个**文本符号处理器**。即便现在很多模型原生支持多模态输入（如 GPT-4o、Claude 3.5 Sonnet），但在构建复杂的多步骤 Agent（如自动化操控电脑的桌面 Agent、自主抓取网页的 Web Agent）时，直接让 Agent 盯着原始图片看往往面临以下物理硬伤：

1.  **Token 消耗与成本雪崩**：原生多模态模型处理一张图片通常需要耗费数百个 Token，如果 Agent 进行 50 步的连续环境探索，每一次都把整张图塞进去，Token 费用和延迟（Latency）会直接突破天际。
2.  **视觉注意力焦点丢失（Lost in Vision）**：直接看图时，大模型很容易忽略掉边缘极小的按钮或关键提示文字。
3.  **记忆与检索瘫痪**：Agent 需要维护一个 **Memory（记忆体）**。图片和视频是非常难被存入向量数据库（Vector DB）进行精确文本语义检索的。

**Caption 在这里的角色，就是作为一种“高纯度的特征提取器”：把复杂的像素信号洗成纯文本的记忆片段，存入 Agent 的思考上下文或长期记忆中。**

---

### 二、 Agent 开发中的三大主流 Caption 场景

根据 Agent 类型的不同，Caption 的物理化身可以分为以下三种：

#### 1. GUI / Web Agent 中的“界面状态 Captioning”（Screen-to-Text）

这类 Agent（如操控手机的 Mobile Agent 或浏览器智能体）需要感知当前屏幕发生了什么。

-   **怎么做**：Agent 先截一张图（Screenshot），然后调用一个专门的微型视觉模型（或者通过系统的无障碍服务 XML 树映射），为当前屏幕生成一份 **Caption 报告**。
-   **生成的 Caption 文本长这样**：

> `"当前屏幕是一个电商购物车页面。中心位置有一个商品卡片，显示『无线机械键盘，价格：￥299，数量：1』。页面右下角包含一个高亮的绿色物理按钮，文本为『去结算』。页面最上方有一个返回箭头的图标。"`

-   **作用**：主 Agent 读到这段 Caption 后，它的 Reasoning（推理）引擎立刻就能做出决策：`思考：我的任务是买下键盘 $\to$ 决策：调用 Click 算子物理点击右下角的『去结算』按钮。`

#### 2. Embodied Agent（具身智能体/机器人）中的“环境语义感知”（Scene Captioning）

机器人 Agent 身上挂着摄像头，它在房间里移动时，需要把看到的物理世界同步给大脑。

-   **怎么做**：利用开箱即用的图像描述模型（如 BLIP-2、LLaVA），以 1Hz 的频率对摄像头画面进行连续 Caption。
-   **生成的 Caption 文本长这样**：

> `[时间戳 12:00:05]: "正前方 1.5 米处有一张红色的标准办公桌，桌面上杂乱放置着一个白色的陶瓷马克杯和一本打开的书。"`

-   **作用**：这段 Caption 被作为 **Observation（环境观察）** 实时喂给 Agent 的 ReAct（推理-行动）循环。

#### 3. 视频理解与长期记忆 Agent（Video Captioning / Episodic Memory）

如果 Agent 的任务是看一部两小时的电影或者分析一天的监控录像，并回答用户问题。

-   **怎么做**：Agent 会把视频切成一个个的关键帧（Keyframes），让 Vision-Language 模型对每一帧进行精细的视频流 Caption，并附带时间戳。
-   **作用**：把两小时的庞大视频，彻底压缩提炼成一本只有几万字的“纯文本行为日志”。当用户问：“下午谁动了我的杯子？”Agent 只需要去这个 **Caption 日志文本** 里做最简单的关键词匹配或 RAG（检索增强生成），就能瞬间定位到具体的视频秒数。

---

### 三、 工业界 Agent 开发中怎么写 Caption 逻辑

在实际手写一个 LangChain、LlamaIndex 或者是自研的 Agent 框架时，一个典型的“截屏 $\to$ Caption $\to$ 推理”的 Pipeline 代码逻辑通常长这样：

```python
import base64
from openai import OpenAI

client = OpenAI()

def generate_screen_caption(screenshot_path):
    """把 Agent 截取的屏幕像素，翻译成高稠密的纯文本描述 (Caption)"""
    with open(screenshot_path, "rb") as image_file:
        base64_image = base64.b64encode(image_file.read()).decode('utf-8')
        
    response = client.chat.completions.create(
        model="gpt-4o-mini", # 通常用速度极快、成本极低的微型多模态模型来做 Caption 基座
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text", 
                        "text": "请以一个 UI 自动化控制 Agent 的视角，对这张屏幕截图进行精细的 Caption。请列出所有可交互的按钮、当前页面所处的业务状态、以及任何关键的文字提示信息。"
                    },
                    {
                        "type": "image_url",
                        "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"}
                    }
                ]
            }
        ]
    )
    return response.choices[0].message.content

# ---- Agent 核心循环 (Core Loop) ----
# 1. 物理层行动：Agent 截图保存为 current_screen.jpg
# 2. 感知层：
caption_observation = generate_screen_caption("current_screen.jpg")

# 3. 思考层：把这个纯文本的 Caption 作为 Observation 喂给主推理 LLM
agent_prompt = f"""
你是一个全自动 Web 任务执行 Agent。
用户最终目标：帮我把购物车里的键盘清空。
当前的屏幕描述 (Caption Observation): {caption_observation}

请输出你下一步需要执行的具体 Python 自动化指令 (如 click("去结算"))：
"""
# 4. 执行层：主模型读取后，由于输入的是干净的文本 Caption，能以极高准确率输出下一步动作。

```

### 💡 极简总结：

在 Agent 开发中，**Caption 就是非文本世界的“全职翻译官”**。它负责把红绿蓝的像素矩阵、屏幕上的 UI 控件，统一格式化翻译成大模型最擅长处理的**结构化文本语言**，从而让 Agent 在后台能够以极低的 Token 成本和极高的逻辑稳定性，完成长时间跨度（Long-horizon）的任务编排。
