import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/Google_Cloud/Vertex_ai.html","title":"Vertex_ai","lang":"zh-CN","frontmatter":{"title":"Vertex_ai","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"如果你在学习 Agent 开发，那么 Vertex AI 就是 Google 提供的“重型军火库”。 简单来说，Vertex AI 是 Google Cloud 上的企业级全栈 AI 平台。它不仅提供大模型（Gemini），还提供了一整套工具来帮你训练、部署和管理这些模型。 1. Vertex AI 的核心组成部分 你可以把 Vertex AI 看作是...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Vertex_ai\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/Google_Cloud/Vertex_ai.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"Vertex_ai"}],["meta",{"property":"og:description","content":"如果你在学习 Agent 开发，那么 Vertex AI 就是 Google 提供的“重型军火库”。 简单来说，Vertex AI 是 Google Cloud 上的企业级全栈 AI 平台。它不仅提供大模型（Gemini），还提供了一整套工具来帮你训练、部署和管理这些模型。 1. Vertex AI 的核心组成部分 你可以把 Vertex AI 看作是..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.35,"words":704},"filePathRelative":"posts/AI大模型/Agent应用开发/Google_Cloud/Vertex_ai.md","excerpt":"<p>如果你在学习 Agent 开发，那么 <strong>Vertex AI</strong> 就是 Google 提供的“重型军火库”。</p>\\n<p>简单来说，<strong>Vertex AI 是 Google Cloud 上的企业级全栈 AI 平台</strong>。它不仅提供大模型（Gemini），还提供了一整套工具来帮你训练、部署和管理这些模型。</p>\\n<hr>\\n<h2>1. Vertex AI 的核心组成部分</h2>\\n<p>你可以把 Vertex AI 看作是一个集成了多个功能的“实验室”：</p>\\n<ul>\\n<li><strong>Model Garden（模型花园）：</strong> 这是一个模型库。你可以在里面找到 Google 自家的 <strong>Gemini 2.0</strong>，也可以找到开源的 <strong>Llama 3</strong>、<strong>Mistral</strong> 等。你不需要自己买显卡，点一下就能部署。</li>\\n<li><strong>Vertex AI Studio：</strong> 一个可视化界面，让你直接在网页上测试 Prompt、调整参数、测试 <strong>Function Calling</strong>。</li>\\n<li><strong>Vertex AI Agent Builder：****这是你最需要关注的！</strong> 它是专门为开发 Agent 设计的低代码工具。它把 RAG（搜索）、工具调用、流程控制全部整合在一起，让你能快速捏出一个“客服 Agent”或“运维 Agent”。</li>\\n<li><strong>Gemini API：</strong> Vertex AI 是调用 Gemini 模型的官方企业渠道，安全性（数据不被拿去训练）和稳定性比普通的公开 API 更高。</li>\\n</ul>","autoDesc":true}`),i={name:`Vertex_ai.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>如果你在学习 Agent 开发，那么 <strong>Vertex AI</strong> 就是 Google 提供的“重型军火库”。</p>
<p>简单来说，<strong>Vertex AI 是 Google Cloud 上的企业级全栈 AI 平台</strong>。它不仅提供大模型（Gemini），还提供了一整套工具来帮你训练、部署和管理这些模型。</p>
<hr>
<h2 id="_1-vertex-ai-的核心组成部分" tabindex="-1"><a class="header-anchor" href="#_1-vertex-ai-的核心组成部分"><span>1. Vertex AI 的核心组成部分</span></a></h2>
<p>你可以把 Vertex AI 看作是一个集成了多个功能的“实验室”：</p>
<ul>
<li><strong>Model Garden（模型花园）：</strong> 这是一个模型库。你可以在里面找到 Google 自家的 <strong>Gemini 2.0</strong>，也可以找到开源的 <strong>Llama 3</strong>、<strong>Mistral</strong> 等。你不需要自己买显卡，点一下就能部署。</li>
<li><strong>Vertex AI Studio：</strong> 一个可视化界面，让你直接在网页上测试 Prompt、调整参数、测试 <strong>Function Calling</strong>。</li>
<li><strong>Vertex AI Agent Builder：****这是你最需要关注的！</strong> 它是专门为开发 Agent 设计的低代码工具。它把 RAG（搜索）、工具调用、流程控制全部整合在一起，让你能快速捏出一个“客服 Agent”或“运维 Agent”。</li>
<li><strong>Gemini API：</strong> Vertex AI 是调用 Gemini 模型的官方企业渠道，安全性（数据不被拿去训练）和稳定性比普通的公开 API 更高。</li>
</ul>
<hr>
<h2 id="_2-为什么-agent-开发者要用-vertex-ai" tabindex="-1"><a class="header-anchor" href="#_2-为什么-agent-开发者要用-vertex-ai"><span>2. 为什么 Agent 开发者要用 Vertex AI？</span></a></h2>
<p>作为一个正在研究 AIOps 和分布式平台的大学生，Vertex AI 对你有几个核心价值：</p>
<ol>
<li><strong>原生集成 Google 搜索（Grounding）：</strong></li>
</ol>
<p>你可以让你的 Agent 联网。如果用户问一个最新的 Linux 漏洞，Agent 可以直接调用 Google 搜索获取实时信息，而不是胡编乱造。</p>
<ol start="2">
<li><strong>强大的多模态能力：</strong></li>
</ol>
<p>Gemini 能够直接看懂监控图表。你可以把 Grafana 的截图发给 Vertex AI 上的 Agent，它能告诉你曲线哪里异常。</p>
<ol start="3">
<li><strong>长上下文（Long Context）：</strong></li>
</ol>
<p>Gemini 支持 <strong>100万到200万</strong> 的 Token。这意味着你可以把整个项目的代码库、或者过去一个月的几万行日志全丢给它，它不会“忘事儿”。</p>
<ol start="4">
<li><strong>推理与管理：</strong></li>
</ol>
<p>它提供完善的 API 监控，你可以看到 Agent 每次调用花了多少钱、延迟是多少，非常适合工程化。</p>
<hr>
<h2 id="_3-vertex-ai-vs-openai-chatgpt" tabindex="-1"><a class="header-anchor" href="#_3-vertex-ai-vs-openai-chatgpt"><span>3. Vertex AI vs. OpenAI (ChatGPT)</span></a></h2>
<table>
<thead>
<tr>
<th><strong>维度</strong></th>
<th><strong>OpenAI</strong></th>
<th><strong>Vertex AI (Google)</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>核心模型</strong></td>
<td>GPT-4o / o1</td>
<td>Gemini 1.5 Pro / Flash / 2.0</td>
</tr>
<tr>
<td><strong>上下文长度</strong></td>
<td>128k (标准)</td>
<td><strong>1M - 2M (极大优势)</strong></td>
</tr>
<tr>
<td><strong>云生态</strong></td>
<td>绑定 Microsoft Azure</td>
<td><strong>绑定 Google Cloud (GCP)</strong></td>
</tr>
<tr>
<td><strong>Agent 工具</strong></td>
<td>Assistants API</td>
<td><strong>Agent Builder (更系统化)</strong></td>
</tr>
</tbody>
</table>
<hr>
<h2 id="_4-如何开始使用" tabindex="-1"><a class="header-anchor" href="#_4-如何开始使用"><span>4. 如何开始使用？</span></a></h2>
<p>既然你正在学习 <strong>Function Calling</strong>，在 Vertex AI 上实现它的流程和你之前学的基本一致，只是 SDK 不同：</p>
<ol>
<li><strong>注册 GCP：</strong> 注册 Google Cloud（通常有 300 刀免费额度）。</li>
<li><strong>启用 Vertex AI API。</strong></li>
<li><strong>安装 Python SDK：</strong></li>
</ol>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>pip install google-cloud-aiplatform</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ol start="4">
<li><strong>调用：</strong> 在代码中定义 <code v-pre>tools</code>，然后传给 <code v-pre>GenerativeModel.generate_content</code>。</li>
</ol>
<hr>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};