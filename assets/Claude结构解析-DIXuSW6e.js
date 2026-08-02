import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/Claude%E7%BB%93%E6%9E%84%E8%A7%A3%E6%9E%90.html","title":"Claude结构解析","lang":"zh-CN","frontmatter":{"title":"Claude结构解析","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"Anthropic（Claude 的母公司）官方在设计和定义 Agent 时，遵循了一套非常硬核的工程哲学：把复杂的控制流交给传统的确定性代码（Python/TypeScript），而让 LLM 只做纯粹的、无状态的最高价值认知决策。 基于这个理念，Claude 生态进化出了两大标志性的 Agent 结构：面向开发者的 Anthropic 官方三级编排...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Claude结构解析\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/Claude%E7%BB%93%E6%9E%84%E8%A7%A3%E6%9E%90-1.png\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/Claude%E7%BB%93%E6%9E%84%E8%A7%A3%E6%9E%90.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"Claude结构解析"}],["meta",{"property":"og:description","content":"Anthropic（Claude 的母公司）官方在设计和定义 Agent 时，遵循了一套非常硬核的工程哲学：把复杂的控制流交给传统的确定性代码（Python/TypeScript），而让 LLM 只做纯粹的、无状态的最高价值认知决策。 基于这个理念，Claude 生态进化出了两大标志性的 Agent 结构：面向开发者的 Anthropic 官方三级编排..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/Claude%E7%BB%93%E6%9E%84%E8%A7%A3%E6%9E%90-1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":5.41,"words":1623},"filePathRelative":"posts/AI大模型/Agent应用开发/第三阶段_拥抱生态与框架_(工程化)/Claude结构解析.md","excerpt":"<p>Anthropic（Claude 的母公司）官方在设计和定义 Agent 时，遵循了一套非常硬核的工程哲学：<strong>把复杂的控制流交给传统的确定性代码（Python/TypeScript），而让 LLM 只做纯粹的、无状态的最高价值认知决策。</strong></p>\\n<p>基于这个理念，Claude 生态进化出了两大标志性的 Agent 结构：面向开发者的 <strong>Anthropic 官方三级编排架构</strong>，以及震惊全网的 <strong>Computer Use 原生视觉循环控制架构</strong>。</p>\\n<hr>\\n<h3>一、 官方推崇的 Agent 三级编排架构（The 3 Building Blocks）</h3>","autoDesc":true}`),i={name:`Claude结构解析.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>Anthropic（Claude 的母公司）官方在设计和定义 Agent 时，遵循了一套非常硬核的工程哲学：<strong>把复杂的控制流交给传统的确定性代码（Python/TypeScript），而让 LLM 只做纯粹的、无状态的最高价值认知决策。</strong></p>
<p>基于这个理念，Claude 生态进化出了两大标志性的 Agent 结构：面向开发者的 <strong>Anthropic 官方三级编排架构</strong>，以及震惊全网的 <strong>Computer Use 原生视觉循环控制架构</strong>。</p>
<hr>
<h3 id="一、-官方推崇的-agent-三级编排架构-the-3-building-blocks" tabindex="-1"><a class="header-anchor" href="#一、-官方推崇的-agent-三级编排架构-the-3-building-blocks"><span>一、 官方推崇的 Agent 三级编排架构（The 3 Building Blocks）</span></a></h3>
<p>Anthropic 官方在长期的生产实践中，把 Claude 能够胜任的 Agent 结构精简地分类为三种演进模式。他们极力反对开发者无脑给所有场景上最复杂的自主循环，而是主张根据业务复杂度选择对应的结构：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span> 【 模式 1: 工作流模式 (Workflows) 】</span></span>
<span class="line"><span> [输入] ──> 【模型A: 解析/重写】 ──> 【模型B: 执行提取】 ──> [确定性输出]</span></span>
<span class="line"><span> </span></span>
<span class="line"><span> 【 模式 2: 路由与合并模式 (Routing &#x26; Parallel) 】</span></span>
<span class="line"><span>              ┌──> 【分支1: 财务处理】 ──┐</span></span>
<span class="line"><span> [复合输入] ──┼──> 【分支2: 人事处理】 ──┼──> 【聚合模型】 ──> [最终结果]</span></span>
<span class="line"><span>              └──> 【分支3: 技术处理】 ──┘</span></span>
<span class="line"><span>              </span></span>
<span class="line"><span> 【 模式 3: 协同工作流 (Orchestrator-Workers Loop) 】</span></span>
<span class="line"><span>                        ┌──> 【子Agent A】 ──┐</span></span>
<span class="line"><span> [复杂大任务] ──> 【主控编排大脑】 ┼──> 【子Agent B】 ──┼──> 动态反馈循环 ──> [终极交付]</span></span>
<span class="line"><span>                        └──> 【子Agent C】 ──┘</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-基础编排-工作流模式-routing-workflows" tabindex="-1"><a class="header-anchor" href="#_1-基础编排-工作流模式-routing-workflows"><span>1. 基础编排：工作流模式（Routing &amp; Workflows）</span></a></h4>
<ul>
<li><strong>结构</strong>：没有复杂的死循环，完全由后端工程代码（如 Python、TS）控制流程的物理走向。</li>
<li><strong>特点</strong>：大模型被当成一个个管道算子（链式调用），前一个模型的输出是后一个模型的输入。在稳定性要求极高、流程高度固定的企业场景中（如自动化报销审批、标准化简历初筛），这是最推荐的 Claude 落地结构。</li>
</ul>
<h4 id="_2-中级编排-双层主控路由-orchestrator-workers" tabindex="-1"><a class="header-anchor" href="#_2-中级编排-双层主控路由-orchestrator-workers"><span>2. 中级编排：双层主控路由（Orchestrator-Workers）</span></a></h4>
<ul>
<li><strong>结构</strong>：面对复杂大型任务，Claude 采用“主控大脑 + 专项打工人（子 Agent）”的结构。</li>
<li><strong>特点</strong>：主控模型（如 Claude 3.5 Sonnet）只负责做一件事——把大任务拆解、把任务下发给各自垂直领域的专项子 Agent。子 Agent 跑完后把数据返回给主控，主控在代码层做全局合并和质量把关。这避免了单个模型上下文过载和逻辑涣散。</li>
</ul>
<h4 id="_3-高级编排-反应堆自主循环-agent-loop-react" tabindex="-1"><a class="header-anchor" href="#_3-高级编排-反应堆自主循环-agent-loop-react"><span>3. 高级编排：反应堆自主循环（Agent Loop / ReAct）</span></a></h4>
<ul>
<li><strong>结构</strong>：由大模型自主决定动作、执行工具、并根据返回的 Observation（环境反馈）决定是否继续循环，直至达成目标。</li>
<li><strong>工程保障</strong>：在代码层必须设置 <strong>Hard Limit（最大硬循环上限，如 10 次）</strong>，防止模型陷入逻辑黑洞疯狂烧 Token。</li>
</ul>
<hr>
<h3 id="二、-claude-杀手级黑科技-computer-use-计算机使用-原生视觉代理架构" tabindex="-1"><a class="header-anchor" href="#二、-claude-杀手级黑科技-computer-use-计算机使用-原生视觉代理架构"><span>二、 Claude 杀手级黑科技：Computer Use（计算机使用）原生视觉代理架构</span></a></h3>
<p>在 2024 年底发布的 Claude 3.5 Sonnet 更新中，Anthropic 带来了一个完全颠覆传统 Function Calling 的特殊 Agent 结构 —— <strong>Computer Use</strong>。它的结构不再连接抽象的 API，而是<strong>直接去操作一台真实的虚拟电脑（操作系统桌面）</strong>。</p>
<figure><img src="/blog/assets/posts/Claude%E7%BB%93%E6%9E%84%E8%A7%A3%E6%9E%90-1.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h4 id="🛠️-computer-use-的四步循环控制结构" tabindex="-1"><a class="header-anchor" href="#🛠️-computer-use-的四步循环控制结构"><span>🛠️ Computer Use 的四步循环控制结构：</span></a></h4>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span> ┌────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span> │            1. 屏幕物理感知 (Perception)                 │</span></span>
<span class="line"><span> │            操作系统定时抓取当前桌面的全量实时截图(Screenshot) │</span></span>
<span class="line"><span> └──────────────────────────┬─────────────────────────────┘</span></span>
<span class="line"><span>                            │</span></span>
<span class="line"><span>                            ▼ (图像直接作为 Multimodal 输入)</span></span>
<span class="line"><span> ┌────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span> │            2. 大脑逻辑思考与像素定位 (Reasoning)       │</span></span>
<span class="line"><span> │            Claude 用原生视觉看图，并根据专属 Schema   │</span></span>
<span class="line"><span> │            算出目标按钮的绝对坐标 [X, Y]               │</span></span>
<span class="line"><span> └──────────────────────────┬─────────────────────────────┘</span></span>
<span class="line"><span>                            │</span></span>
<span class="line"><span>                            ▼ (输出标准的 JSON 工具调用命令)</span></span>
<span class="line"><span> ┌────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span> │            3. 操作系统动作执行 (Execution)               │</span></span>
<span class="line"><span> │            后台系统通过标准的 OS 驱动(如 PyAutoGUI/X11)  │</span></span>
<span class="line"><span> │            物理移动鼠标、点击 [X, Y]、或输入 Bash 命令 │</span></span>
<span class="line"><span> └──────────────────────────┬─────────────────────────────┘</span></span>
<span class="line"><span>                            │</span></span>
<span class="line"><span>                            ▼ (动作产生副作用，改变屏幕状态)</span></span>
<span class="line"><span> ┌────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span> │            4. 环境反馈捕获 (Observation)                │</span></span>
<span class="line"><span> │            捕获点击后的新屏幕和控制台 stdout，进入下一轮循环  │</span></span>
<span class="line"><span> └────────────────────────────────────────────────────────┘</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li><strong>感知（Perception）</strong>：Agent 在底层启动一个定时器，物理截取当前 OS 虚拟桌面的图片（Base64 格式），同时抓取当前环境中已知的系统变量。</li>
<li><strong>思考（Reasoning）</strong>：得益于 Claude 强大的<strong>原生多模态对齐结构</strong>，它能直接“肉眼”扫描这张图片。它能识别出浏览器上的输入框、底部的终端。它的工具箱里被强行注入了特制工具的 <strong>JSON Schema</strong>：</li>
</ol>
<ul>
<li><code v-pre>computer:click(x, y)</code>：在指定像素点点击。</li>
<li><code v-pre>computer:type(text)</code>：在当前焦点处输入文本。</li>
<li><code v-pre>computer:screenshot()</code>：再次截图。</li>
</ul>
<ol start="3">
<li><strong>动作（Action）</strong>：大模型不需要生成复杂的 Python 自动化脚本，它只需要吐出简单的 JSON 指令：<code v-pre>{&quot;action&quot;: &quot;click&quot;, &quot;coordinate&quot;: [450, 820]}</code>。</li>
<li><strong>后勤保障（OS Sandbox）</strong>：底层的 Python 控制面（客户端）接到 JSON 后，通过真实的系统驱动（如 X11 视窗服务或底层底层输入系统）去物理操纵鼠标指针点击。页面跳转后，重新截取新图喂给 Claude，形成完美的<strong>自主反馈闭环（Loop）</strong>。</li>
</ol>
<hr>
<h3 id="三、-claude-agent-架构的-2-大底座支撑" tabindex="-1"><a class="header-anchor" href="#三、-claude-agent-架构的-2-大底座支撑"><span>三、 Claude Agent 架构的 2 大底座支撑</span></a></h3>
<p>要让上面那些工作流和循环稳固运行，Claude 还在 Infra 层做好了两个接口级别的标准对齐：</p>
<ol>
<li><strong>原生 API 状态机支持（</strong><code v-pre>max_turns</code> <strong>与系统级消息维持）</strong>：<br>
在 Anthropic 官方最新的 SDK 中，它们优化了对话轮次中对 Tools 状态的内存持有，大模型能更高效地理解上一步执行的结果是 <code v-pre>success</code> 还是 <code v-pre>error</code>，专门强化了对于“系统报错（stderr）”的自我修正智商。</li>
<li><strong>MCP（模型上下文协议）统一作为外设接入网关</strong>：<br>
在 Claude Agent 的整个动作边界内，不论是写本地代码文件、查公司内部数据库，还是调用 Jira 接口，<strong>全部统一通过 MCP Server 进行标准代理</strong>。大模型不需要关心各个 API 的奇葩格式，它只需要面对标准的 Resources 和 Tools 定义。</li>
</ol>
<h3 id="💡-架构总结" tabindex="-1"><a class="header-anchor" href="#💡-架构总结"><span>💡 架构总结：</span></a></h3>
<p>Claude 官方给出的 Agent 设计教科书，核心秘诀就是<strong>不要让大模型去做流程图本身（即不要让模型用代码去管理自己的 while 循环）</strong>。用代码去写死工作流和状态转移，而把大模型当成<strong>流程图中关键分叉路口上的“高智商裁判”和“像素坐标定位器”</strong>。这种“代码套模型”的严密结构，才是目前保障 Agent 能够工业级落地的最成熟方案。</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};