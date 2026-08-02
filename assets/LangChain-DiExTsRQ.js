import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/LangChain.html","title":"LangChain","lang":"zh-CN","frontmatter":{"title":"LangChain","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"如果你在 Agent 开发的路上走得够深，迟早会撞上 LangChain。 简单来说，LangChain 是目前全球最流行的 AI 应用开发框架。如果把大模型（LLM）比作一颗“大脑”，那么 LangChain 就是一套极其复杂的“义体系统”——它提供了连接数据库、记忆管理、工具链调度和工作流控制的所有组件。 但在你开始学之前，我必须给你一个橙色警告：...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"LangChain\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/LangChain-1.png\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/LangChain.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"LangChain"}],["meta",{"property":"og:description","content":"如果你在 Agent 开发的路上走得够深，迟早会撞上 LangChain。 简单来说，LangChain 是目前全球最流行的 AI 应用开发框架。如果把大模型（LLM）比作一颗“大脑”，那么 LangChain 就是一套极其复杂的“义体系统”——它提供了连接数据库、记忆管理、工具链调度和工作流控制的所有组件。 但在你开始学之前，我必须给你一个橙色警告：..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/LangChain-1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.07,"words":920},"filePathRelative":"posts/AI大模型/Agent应用开发/第三阶段_拥抱生态与框架_(工程化)/LangChain.md","excerpt":"<p>如果你在 <strong>Agent 开发</strong>的路上走得够深，迟早会撞上 <strong>LangChain</strong>。</p>\\n<p>简单来说，LangChain 是目前全球最流行的 <strong>AI 应用开发框架</strong>。如果把大模型（LLM）比作一颗“大脑”，那么 LangChain 就是一套极其复杂的“义体系统”——它提供了连接数据库、记忆管理、工具链调度和工作流控制的所有组件。</p>\\n<p>但在你开始学之前，我必须给你一个<strong>橙色警告</strong>：LangChain 非常强大，但也因“过度封装”而臭名昭著。对于初学者，它有时会让简单的逻辑变得极其晦涩。</p>","autoDesc":true}`),i={name:`LangChain.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>如果你在 <strong>Agent 开发</strong>的路上走得够深，迟早会撞上 <strong>LangChain</strong>。</p>
<p>简单来说，LangChain 是目前全球最流行的 <strong>AI 应用开发框架</strong>。如果把大模型（LLM）比作一颗“大脑”，那么 LangChain 就是一套极其复杂的“义体系统”——它提供了连接数据库、记忆管理、工具链调度和工作流控制的所有组件。</p>
<p>但在你开始学之前，我必须给你一个<strong>橙色警告</strong>：LangChain 非常强大，但也因“过度封装”而臭名昭著。对于初学者，它有时会让简单的逻辑变得极其晦涩。</p>
<figure><img src="/blog/assets/posts/LangChain-1.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<hr>
<h2 id="_1-langchain-的核心六大模块" tabindex="-1"><a class="header-anchor" href="#_1-langchain-的核心六大模块"><span>1. LangChain 的核心六大模块</span></a></h2>
<p>LangChain 把 Agent 开发拆成了六块积木：</p>
<table>
<thead>
<tr>
<th><strong>模块名称</strong></th>
<th><strong>作用</strong></th>
<th><strong>你的运维场景示例</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Model I/O</strong></td>
<td>管理提示词和模型调用</td>
<td>统一调用 OpenAI 或 阿里云百炼 的接口。</td>
</tr>
<tr>
<td><strong>Retrieval (RAG)</strong></td>
<td>向量数据库连接</td>
<td>把 K8s 排障手册切片并存入数据库。</td>
</tr>
<tr>
<td><strong>Chains (链)</strong></td>
<td>把多个动作串起来</td>
<td>1. 查日志 -&gt; 2. 总结错误 -&gt; 3. 发钉钉。</td>
</tr>
<tr>
<td><strong>Memory (记忆)</strong></td>
<td>让 AI 记住之前的对话</td>
<td>在多轮排障中记住上一步查出的 IP 地址。</td>
</tr>
<tr>
<td><strong>Agents (智能体)</strong></td>
<td>自动决策中心</td>
<td>让 LLM 决定该调哪个工具，还是直接回答。</td>
</tr>
<tr>
<td><strong>Callbacks (回调)</strong></td>
<td>监控与日志</td>
<td>记录 AI 每一轮思考花了多少钱、多少时间。</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="_2-为什么大家都在用它-核心优势" tabindex="-1"><a class="header-anchor" href="#_2-为什么大家都在用它-核心优势"><span>2. 为什么大家都在用它？（核心优势）</span></a></h2>
<ol>
<li><strong>极速原型</strong>：如果你想做一个“基于本地文档的聊天机器人”，用原生代码可能要写 100 行，用 LangChain 的 <code v-pre>RetrievalQA</code> 可能只需要 10 行。</li>
<li><strong>模型中立</strong>：今天用百炼的 Qwen，明天想换 DeepSeek，你只需要改一行配置，不需要重写解析逻辑。</li>
<li><strong>生态丰富</strong>：它几乎集成了市面上所有的向量数据库（Milvus, Pinecone）和工具（Google Search, GitHub, SQL）。</li>
</ol>
<hr>
<h2 id="_3-langchain-怎么用-极简三步走" tabindex="-1"><a class="header-anchor" href="#_3-langchain-怎么用-极简三步走"><span>3. LangChain 怎么用？（极简三步走）</span></a></h2>
<p>虽然它很复杂，但入门通常遵循这个逻辑：</p>
<h2 id="第一步-安装环境" tabindex="-1"><a class="header-anchor" href="#第一步-安装环境"><span>第一步：安装环境</span></a></h2>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>pip install langchain langchain-openai</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="第二步-定义-chain-链" tabindex="-1"><a class="header-anchor" href="#第二步-定义-chain-链"><span>第二步：定义 Chain（链）</span></a></h2>
<p>这是最基础的用法：把 Prompt 和 LLM 焊在一起。</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>from langchain_openai import ChatOpenAI</span></span>
<span class="line"><span>from langchain_core.prompts import ChatPromptTemplate</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 1. 初始化模型（指向你的百炼地址）</span></span>
<span class="line"><span>llm = ChatOpenAI(api_key="KEY", base_url="百炼URL", model="qwen-max")</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 2. 定义模板</span></span>
<span class="line"><span>prompt = ChatPromptTemplate.from_template("你是一个 K8s 专家，请简要解释 {topic}")</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 3. 组合成链 (使用管道符号 | 是 LangChain 的特色)</span></span>
<span class="line"><span>chain = prompt | llm</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 4. 调用</span></span>
<span class="line"><span>response = chain.invoke({"topic": "Ingress"})</span></span>
<span class="line"><span>print(response.content)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="第三步-定义-agent-真正的自动驾驶" tabindex="-1"><a class="header-anchor" href="#第三步-定义-agent-真正的自动驾驶"><span>第三步：定义 Agent（真正的自动驾驶）</span></a></h2>
<p>LangChain 会自动帮你处理我们之前聊过的那个复杂的“JSON 拦截-执行-再请求”循环。</p>
<hr>
<h2 id="_4-给你的建议-学还是不学" tabindex="-1"><a class="header-anchor" href="#_4-给你的建议-学还是不学"><span>4. 给你的建议：学还是不学？</span></a></h2>
<p>根据你之前提到的<strong>四阶段计划</strong>，我的建议是：</p>
<ul>
<li><strong>现在（第一/二阶段）</strong>：<strong>不要用 LangChain。</strong> 继续用原生的 <code v-pre>openai</code> 库。因为只有手写过 <code v-pre>tool_calls</code> 的解析，你才能理解 LangChain 在背后到底帮你掩盖了多少“坑”。</li>
<li><strong>后期（第三/四阶段）</strong>：<strong>学习 LangGraph。</strong> 它是 LangChain 团队推出的新一代框架，比传统的 LangChain 更适合做复杂的 AIOps 工作流。</li>
</ul>
<hr>
<h2 id="总结-langchain-的本质" tabindex="-1"><a class="header-anchor" href="#总结-langchain-的本质"><span>总结：LangChain 的本质</span></a></h2>
<p><strong>LangChain = 各种 AI 工具的“粘合剂”。</strong> 它把复杂的 <code v-pre>JSON Schema</code> 封装成了简单的 <code v-pre>Tool</code> 类，把复杂的 <code v-pre>messages</code> 拼接封装成了 <code v-pre>Memory</code> 类。</p>
<p><strong>既然你对框架感兴趣，我们要不要试着模拟一下 LangChain 的“链式思考”？</strong> 我们可以写一段简单的代码，模拟“先提取关键词，再根据关键词查手册”的两个步骤。你想看看这种“链式”逻辑在原生代码里是怎么实现的吗？</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};