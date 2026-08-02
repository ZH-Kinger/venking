import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/MCP.html","title":"MCP","lang":"zh-CN","frontmatter":{"title":"MCP","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"在大模型和 Agent 生态中，MCP 全称是 Model Context Protocol（模型上下文协议）。 它是由 Anthropic 公司于 2024 年底开源、并迅速成为行业事实标准的一项开放性网络协议。 如果把大模型（LLM）比作一台性能强劲的“全功能 CPU”，那么 MCP 就是计算机主板上的“USB 接口规范”。它规定了外设（如数据库、...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MCP\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/MCP.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"MCP"}],["meta",{"property":"og:description","content":"在大模型和 Agent 生态中，MCP 全称是 Model Context Protocol（模型上下文协议）。 它是由 Anthropic 公司于 2024 年底开源、并迅速成为行业事实标准的一项开放性网络协议。 如果把大模型（LLM）比作一台性能强劲的“全功能 CPU”，那么 MCP 就是计算机主板上的“USB 接口规范”。它规定了外设（如数据库、..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.73,"words":1119},"filePathRelative":"posts/AI大模型/Agent应用开发/第三阶段_拥抱生态与框架_(工程化)/MCP.md","excerpt":"<p>在大模型和 Agent 生态中，<strong>MCP</strong> 全称是 <strong>Model Context Protocol（模型上下文协议）</strong>。</p>\\n<p>它是由 Anthropic 公司于 2024 年底开源、并迅速成为行业事实标准的一项<strong>开放性网络协议</strong>。</p>\\n<p>如果把大模型（LLM）比作一台性能强劲的“全功能 CPU”<strong>，那么 MCP 就是计算机主板上的</strong>“USB 接口规范”。它规定了外设（如数据库、本地文件系统、开发工具、Web API）应该通过何种统一的标准连接到大模型上。</p>","autoDesc":true}`),i={name:`MCP.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在大模型和 Agent 生态中，<strong>MCP</strong> 全称是 <strong>Model Context Protocol（模型上下文协议）</strong>。</p>
<p>它是由 Anthropic 公司于 2024 年底开源、并迅速成为行业事实标准的一项<strong>开放性网络协议</strong>。</p>
<p>如果把大模型（LLM）比作一台性能强劲的“全功能 CPU”<strong>，那么 MCP 就是计算机主板上的</strong>“USB 接口规范”。它规定了外设（如数据库、本地文件系统、开发工具、Web API）应该通过何种统一的标准连接到大模型上。</p>
<hr>
<h3 id="一、-为什么需要-mcp-它解决了什么行业死穴" tabindex="-1"><a class="header-anchor" href="#一、-为什么需要-mcp-它解决了什么行业死穴"><span>一、 为什么需要 MCP？（它解决了什么行业死穴）</span></a></h3>
<p>在 MCP 出现之前，大模型连接外部世界（如读写本地文件、查数据库）的做法非常原始且混乱：</p>
<ul>
<li><strong>传统的 Tool/Function Calling 痛点</strong>：每一个开发者、每一个软件（如 Cursor、Claude Desktop、Dify）连接数据库时，都需要自己手写一套私有的 API 胶水代码和特定的 Prompt 描述。</li>
<li><strong>碎片化灾难</strong>：如果市场上出现了 10 个优秀的 AI IDE 和 100 个开发者常用的工具（如 Jira、GitLab、PostgreSQL），行业就需要编写 $10 \\times 100 = 1000$ 套互不兼容的集成代码。</li>
</ul>
<p><strong>MCP 的解法：解耦连接层。</strong><br>
它制定了一个大一统一的标准。任何工具只需要开发一个符合 MCP 规范的 Server（服务端），任何支持 MCP 的大模型客户端（Client）就能直接无缝插拔调用它。</p>
<hr>
<h3 id="二、-mcp-的核心三层架构设计" tabindex="-1"><a class="header-anchor" href="#二、-mcp-的核心三层架构设计"><span>二、 MCP 的核心三层架构设计</span></a></h3>
<p>MCP 协议的核心非常紧凑，主要由以下三个物理概念构成：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span> ┌────────────────────────┐</span></span>
<span class="line"><span> │   MCP Client (客户端)  │  (例如: Cursor 编译器 / Claude Desktop / 自研 Agent)</span></span>
<span class="line"><span> └───────────┬────────────┘</span></span>
<span class="line"><span>             │</span></span>
<span class="line"><span>             ▼ (通过标准 JSON-RPC 2.0 协议通信)</span></span>
<span class="line"><span> ┌────────────────────────┐</span></span>
<span class="line"><span> │   MCP Server (服务端)  │  (暴露以下三种核心物理能力给大模型)</span></span>
<span class="line"><span> └───────────┬────────────┘</span></span>
<span class="line"><span>             ├── 1. Resources (资源): 允许 LLM 以只读方式安全读取外部数据 (如：读特定文件、查数据库行)</span></span>
<span class="line"><span>             ├── 2. Prompts (提示词模板): 预设的结构化 Prompt 模板 (如：拉取特定报错分析模板)</span></span>
<span class="line"><span>             └── 3. Tools (工具): 允许 LLM 执行具有副作用的物理动作 (如：编译代码、外发邮件、重启服务)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li><strong>Resources（资源）</strong>：<br>
向大模型提供<strong>只读</strong>的数据通道。比如，Server 可以把本地的 <code v-pre>logs/error.log</code> 或者一个 MySQL 数据表包装成一个 Resource 标识符（如 <code v-pre>postgres://db/users</code>）。大模型可以通过协议直接、安全地读取其内容。</li>
<li><strong>Tools（工具）</strong>：<br>
向大模型提供可执行的、有副作用（Side-effects）的动作。这等同于传统 Function Calling 的升级版。大模型可以通过调用 Tool 去执行一条 Shell 命令、修改本地代码、或者调用企业内部的 API。</li>
<li><strong>Prompts（提示词模板）</strong>：<br>
Server 内置的、由生产环境沉淀下来的黄金提示词模板。大模型客户端可以直接调用这些模板来初始化对话语境，避免用户手动复制粘贴复杂的 System Prompt。</li>
</ol>
<hr>
<h3 id="三、-mcp-的底层物理通信机制" tabindex="-1"><a class="header-anchor" href="#三、-mcp-的底层物理通信机制"><span>三、 MCP 的底层物理通信机制</span></a></h3>
<p>MCP 在底层采用极其成熟、轻量且好调试的 <strong>JSON-RPC 2.0 协议</strong> 作为通信骨架。客户端和服务端通常通过标准的输入输出流（STDIO）或者 <strong>EventSource（SSE / WebSockets）</strong> 进行跨进程或跨网络通信。</p>
<h4 id="💡-一个典型的-mcp-工具调用-tool-call-json-数据流" tabindex="-1"><a class="header-anchor" href="#💡-一个典型的-mcp-工具调用-tool-call-json-数据流"><span>💡 一个典型的 MCP 工具调用（Tool Call） JSON 数据流：</span></a></h4>
<p>当大模型决定通过 MCP 调用一个名为 <code v-pre>fetch_k8s_logs</code> 的工具时，客户端会向 MCP 服务端发送这样一段标准的 JSON 报文：</p>
<div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-json"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  "jsonrpc"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"2.0"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  "method"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"tools/call"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  "params"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "name"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"fetch_k8s_logs"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "arguments"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">      "cluster_name"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"k8s-prod"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">      "pod_name"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"nginx-backend-xyz"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  },</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  "id"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">42</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>MCP 服务端执行完物理的底层集群查询代码后，再用同样规范的 JSON 格式将日志文本回复给客户端。大模型读到数据，完成整条 RAG 或 Agent 推理闭环。</p>
<hr>
<h3 id="四、-极简工程选型总结" tabindex="-1"><a class="header-anchor" href="#四、-极简工程选型总结"><span>四、 极简工程选型总结</span></a></h3>
<p>在当前大模型全栈开发与 Agent Infra 建设中：</p>
<ul>
<li><strong>如果你在自研 AI 生态</strong>：不要再手写私有的 Function Calling 胶水层了。直接基于 MCP 规范（开源社区提供了极其成熟的 Python 和 TypeScript SDK）来封装你的内部系统接口。</li>
<li><strong>最大的红利</strong>：一旦你的服务支持了 MCP，它就能<strong>无缝、零代码修改地</strong>直接接入到 Cursor、Zed、Claude Desktop 等主流前沿 AI 生产力工具中，让这些全球顶级的大模型生态直接拥有操作你企业内部数据的能力。</li>
</ul>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};