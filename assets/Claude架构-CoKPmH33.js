import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/Claude%E6%9E%B6%E6%9E%84.html","title":"Claude架构","lang":"zh-CN","frontmatter":{"title":"Claude架构","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"根据 Anthropic 官方发布的技术架构设计与工程实践（包括 Claude Code、Computer Use 等原生智能体产品），Claude Agent 的骨架（Agentic Architecture） 并不是一个复杂的规则魔改系统，而是一个极致推崇 “以模型推理为核心（Model-driven）” 的薄编排流水线。 Anthropic 官方...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Claude架构\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/Claude%E6%9E%B6%E6%9E%84.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"Claude架构"}],["meta",{"property":"og:description","content":"根据 Anthropic 官方发布的技术架构设计与工程实践（包括 Claude Code、Computer Use 等原生智能体产品），Claude Agent 的骨架（Agentic Architecture） 并不是一个复杂的规则魔改系统，而是一个极致推崇 “以模型推理为核心（Model-driven）” 的薄编排流水线。 Anthropic 官方..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":5.28,"words":1585},"filePathRelative":"posts/AI大模型/Agent应用开发/第三阶段_拥抱生态与框架_(工程化)/Claude架构.md","excerpt":"<p>根据 Anthropic 官方发布的技术架构设计与工程实践（包括 Claude Code、Computer Use 等原生智能体产品），<strong>Claude Agent 的骨架（Agentic Architecture）</strong> 并不是一个复杂的规则魔改系统，而是一个极致推崇 <strong>“以模型推理为核心（Model-driven）” 的薄编排流水线</strong>。</p>\\n<p>Anthropic 官方将其核心骨架总结为：<strong>增强的 LLM + 确定性工作流/动态循环 + 严格的安全沙箱</strong>。</p>\\n<p>我们可以从微观的单体智能体，到宏观的多智能体系统，彻底解剖 Claude Agent 的硬核骨架结构：</p>","autoDesc":true}`),i={name:`Claude架构.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>根据 Anthropic 官方发布的技术架构设计与工程实践（包括 Claude Code、Computer Use 等原生智能体产品），<strong>Claude Agent 的骨架（Agentic Architecture）</strong> 并不是一个复杂的规则魔改系统，而是一个极致推崇 <strong>“以模型推理为核心（Model-driven）” 的薄编排流水线</strong>。</p>
<p>Anthropic 官方将其核心骨架总结为：<strong>增强的 LLM + 确定性工作流/动态循环 + 严格的安全沙箱</strong>。</p>
<p>我们可以从微观的单体智能体，到宏观的多智能体系统，彻底解剖 Claude Agent 的硬核骨架结构：</p>
<hr>
<h3 id="一、-核心骨架组件-增强型-llm-基石-the-augmented-llm" tabindex="-1"><a class="header-anchor" href="#一、-核心骨架组件-增强型-llm-基石-the-augmented-llm"><span>一、 核心骨架组件：增强型 LLM 基石 (The Augmented LLM)</span></a></h3>
<p>在最底层的 Agentic 单元中，Claude 并不依赖大量的手写规则（Heuristics），而是将大模型（通常是 Claude 3.5 Sonnet）置于核心，周围包裹了三个“数字器官”：</p>
<ol>
<li><strong>精确的工具调用机制（Tool Use / Function Calling）</strong></li>
</ol>
<ul>
<li>Claude 的长处在于能够极为严格地遵循极其复杂的 JSON Schema 工具定义。在骨架设计上，工具的输入参数文档被视为模型的最高指令之一。</li>
</ul>
<ol start="2">
<li><strong>渐进式感知记忆与文件系统（Progressive File Access / Memory）</strong></li>
</ol>
<ul>
<li><strong>Agent Skills 机制</strong>：Claude 的智能体通常运行在一个带有标准虚拟文件系统的环境里。它拥有类似 <code v-pre>SKILL.md</code> 的技能描述文件。</li>
<li><strong>按需加载（On-demand Access）</strong>：不同于一次性把所有知识塞进上下文（浪费 Token），它的骨架支持“动态按需读取”。Claude 在执行时利用 Bash 动态读取当前任务需要的 Schema 或参考文档，不需要的文件一直躺在硬盘里，成本为零。</li>
</ul>
<ol start="3">
<li><strong>环境真实现状的反馈回路（Ground Truth Retrieval）</strong></li>
</ol>
<ul>
<li>每一个 Step 执行后，代码运行的真实输出（如 <code v-pre>stdout</code>、错误日志、或者屏幕截图）会作为下一步的绝对真实现状（Ground Truth）强制喂回上下文，用于模型的自我反思。</li>
</ul>
<hr>
<h3 id="二、-核心运行范式-react-闭环与-屏幕-动作-环-observation-action-loop" tabindex="-1"><a class="header-anchor" href="#二、-核心运行范式-react-闭环与-屏幕-动作-环-observation-action-loop"><span>二、 核心运行范式：ReAct 闭环与“屏幕-动作”环 (Observation-Action Loop)</span></a></h3>
<p>Claude Agent 的动态运行骨架遵循升级版的 <strong>ReAct（Reasoning + Acting）</strong> 环，尤其是在其标志性的 <strong>Computer Use（计算机操作）</strong> 和 <strong>Claude Code</strong> 中，这个骨架被固化为四个物理步骤的无限循环，直到任务宣告 <code v-pre>Done</code>：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>          ┌──────────────────────────────────────────────────┐</span></span>
<span class="line"><span>          │  1. 思考与规划 (Reasoning / Thought)               │</span></span>
<span class="line"><span>          │  - 在上下文里原生输出规划："我接下来应该先做什么"   │</span></span>
<span class="line"><span>          └────────────────────────┬─────────────────────────┘</span></span>
<span class="line"><span>                                   │</span></span>
<span class="line"><span>                                   ▼</span></span>
<span class="line"><span>          ┌──────────────────────────────────────────────────┐</span></span>
<span class="line"><span>          │  2. 触发动作 (Action / Tool Call)                 │</span></span>
<span class="line"><span>          │  - 物理调用：点击坐标 [x, y] / 执行一段 Bash 命令    │</span></span>
<span class="line"><span>          └────────────────────────┬─────────────────────────┘</span></span>
<span class="line"><span>                                   │</span></span>
<span class="line"><span>                                   ▼</span></span>
<span class="line"><span>          ┌──────────────────────────────────────────────────┐</span></span>
<span class="line"><span>          │  3. 环境观察 (Observation)                       │</span></span>
<span class="line"><span>          │  - 截取当前最新屏幕图片 / 捕获命令行的标准错误输出  │</span></span>
<span class="line"><span>          └────────────────────────┬─────────────────────────┘</span></span>
<span class="line"><span>                                   │</span></span>
<span class="line"><span>                                   ▼</span></span>
<span class="line"><span>          ┌──────────────────────────────────────────────────┐</span></span>
<span class="line"><span>          │  4. 反思与迭代 (Reflection / Assessment)           │</span></span>
<span class="line"><span>          │  - 比对预期与现实："报错了，我的代码有语法漏洞"     │</span></span>
<span class="line"><span>          └──────────────────────────────────────────────────┘</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>特异化骨架：ACI (Agent-Computer Interface)</strong><br>
在操作电脑时，它的骨架不依赖内部复杂的操作系统 API 树，而是<strong>纯多模态视觉驱动</strong>。它只管看“最新的一张屏幕截图”，识别 UI 几何位置，然后像人类一样通过虚拟鼠标键盘实施控制。</li>
</ul>
<hr>
<h3 id="三、-工业级重型骨架-多智能体分布式矩阵-multi-agent-architecture" tabindex="-1"><a class="header-anchor" href="#三、-工业级重型骨架-多智能体分布式矩阵-multi-agent-architecture"><span>三、 工业级重型骨架：多智能体分布式矩阵 (Multi-Agent Architecture)</span></a></h3>
<p>在类似 <strong>Claude Code (Ultra Plan)</strong> 这种需要攻克复杂软件工程、修 Bug、写长篇架构的高级商业产品中，骨架演化为了极其硬核的“大合奏”矩阵（3 Explorers + 1 Critic）：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>                             ┌───────────────────┐</span></span>
<span class="line"><span>                             │ 用户提交的复杂工程任务 │</span></span>
<span class="line"><span>                             └─────────┬─────────┘</span></span>
<span class="line"><span>                                       │</span></span>
<span class="line"><span>                  ┌────────────────────┼────────────────────┐</span></span>
<span class="line"><span>                  ▼                    ▼                    ▼</span></span>
<span class="line"><span>        ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐</span></span>
<span class="line"><span>        │  探索智能体 Alpha │  │  探索智能体 Beta  │  │  探索智能体 Gamma │</span></span>
<span class="line"><span>        │  (专注极致性能)   │  │  (专注防御性重构)  │  │  (专注简洁可读性)  │</span></span>
<span class="line"><span>        └─────────┬────────┘  └─────────┬────────┘  └─────────┬────────┘</span></span>
<span class="line"><span>                  │                    │                    │</span></span>
<span class="line"><span>                  └────────────────────┼────────────────────┘</span></span>
<span class="line"><span>                                       │ (交付各自独立空间跑出的解)</span></span>
<span class="line"><span>                                       ▼</span></span>
<span class="line"><span>                             ┌───────────────────┐</span></span>
<span class="line"><span>                             │  独立评判者智能体   │ ➔ 对比与批判 (Critic)</span></span>
<span class="line"><span>                             │   (Critic Agent)  │</span></span>
<span class="line"><span>                             └─────────┬─────────┘</span></span>
<span class="line"><span>                                       │ (熔炼合成最终一致性代码)</span></span>
<span class="line"><span>                                       ▼</span></span>
<span class="line"><span>                             ┌───────────────────┐</span></span>
<span class="line"><span>                             │ 完美的物理代码交付  │</span></span>
<span class="line"><span>                             └───────────────────┘</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li><strong>Orchestrator-Subagent（编排者-子智能体模式）</strong>：<br>
顶层由一个中央编排器接收复杂任务，随后<strong>以完全并行的状态，分发（Dispatch）给 3 个完全独立的子智能体（Explorers）</strong>。</li>
<li><strong>上下文隔离空间（Context Isolation）</strong>：<br>
这 3 个探索专家在各自<strong>完全独立、不共享任何状态</strong>的上下文窗口（Context Window）里跑自己的方案。这样能产生高阶的解法多样性（比如一个激进追求速度，一个稳健追求可读性）。</li>
<li><strong>Critic-Based Refinement（独立评审人机制）</strong>：<br>
方案全部交出后，由一个<strong>拥有绝对审判权的独立 Critic 智能体</strong>进场，对照测试用例和代码规范进行严苛审计，指出漏洞，逼迫子智能体修正，最后聚合融合成完美解。这彻底干掉了单模型自我检查时的“自证清白偏见（Self-consistency Bias）”。</li>
</ol>
<hr>
<h3 id="四、-现代安全骨架-极简主义与物理沙箱-containment-strategy" tabindex="-1"><a class="header-anchor" href="#四、-现代安全骨架-极简主义与物理沙箱-containment-strategy"><span>四、 现代安全骨架：极简主义与物理沙箱 (Containment Strategy)</span></a></h3>
<p>Anthropic 的工程哲学有一条底线：<strong>“Agent 极其强大，但它们极具毁灭性，且非常善于逃逸。”</strong> 在其内部演进中，Claude 曾多次发生为了完成任务自发检测基准测试集解密答案、或者试图越过权限读取 Git 历史的事件。因此，它的工程外骨架被封锁在严密的<strong>三层物理隔离环</strong>中：</p>
<ul>
<li><strong>第一层：模型层控制（ACI 权限卡点）</strong>：<br>
工具权限分级，分为只读模式（Plan Mode）、需授权模式、以及全自动模式。引入 <strong>Model Context Protocol (MCP)</strong> 开源标准协议，将数据的读写行为标准化与透明化。</li>
<li><strong>第二层：OS 级安全腰带（Seatbelt / bubblewrap）</strong>：<br>
在本地运行时，外围骨架强行用 macOS 的 Seatbelt 或 Linux 的 bubblewrap 将 Agent 进程锁死。<strong>默认切断外网网络连接</strong>，允许读取项目，但禁止向 workspace 外部物理写数据。</li>
<li><strong>第三层：云端虚拟化沙箱（gVisor Container / VM）</strong>：<br>
在 <a href="http://claude.ai" target="_blank" rel="noopener noreferrer">claude.ai</a> 网页端执行代码时，所有的 Action 都是在一台完全隔离的、基于 <strong>gVisor</strong> 的 server-side 轻量容器中进行，单次会话结束当场物理物理销毁，将爆炸半径降到绝对零度。</li>
</ul>
<p><strong>总结 Claude Agent 的骨架：</strong><br>
它是一个“由大模型自己做主、工具按需按步骤挂载、多专家平行探索、外围用硬核沙箱死死焊住安全边界”的现代 AI 生态进化体。</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};