import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%80%E9%98%B6%E6%AE%B5_%E6%8E%8C%E6%8F%A1%E2%80%9C%E5%A4%A7%E8%84%91%E2%80%9D%E7%9A%84%E5%86%B3%E7%AD%96%E6%9C%BA%E5%88%B6_(%E5%9F%BA%E7%A1%80)/%E7%AC%AC%E4%B8%80%E9%98%B6%E6%AE%B5_%E6%8E%8C%E6%8F%A1%E2%80%9C%E5%A4%A7%E8%84%91%E2%80%9D%E7%9A%84%E5%86%B3%E7%AD%96%E6%9C%BA%E5%88%B6_(%E5%9F%BA%E7%A1%80).html","title":"第一阶段_掌握“大脑”的决策机制_(基础)","lang":"zh-CN","frontmatter":{"title":"第一阶段_掌握“大脑”的决策机制_(基础)","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"第一阶段的目标是让你从底层理解 Agent 是如何思考并做出行动决策的。所有的 Agent 框架（不管是 LangChain 还是 OpenClaw）底层都跑不脱这个逻辑：ReAct 模式。 核心概念：ReAct (Reasoning and Acting) 在传统的 AI 聊天中，AI 是“想好了直接说”；而在 Agent 中，AI 是**“边思考、...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"第一阶段_掌握“大脑”的决策机制_(基础)\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%80%E9%98%B6%E6%AE%B5_%E6%8E%8C%E6%8F%A1%E2%80%9C%E5%A4%A7%E8%84%91%E2%80%9D%E7%9A%84%E5%86%B3%E7%AD%96%E6%9C%BA%E5%88%B6_(%E5%9F%BA%E7%A1%80)/%E7%AC%AC%E4%B8%80%E9%98%B6%E6%AE%B5_%E6%8E%8C%E6%8F%A1%E2%80%9C%E5%A4%A7%E8%84%91%E2%80%9D%E7%9A%84%E5%86%B3%E7%AD%96%E6%9C%BA%E5%88%B6_(%E5%9F%BA%E7%A1%80).html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"第一阶段_掌握“大脑”的决策机制_(基础)"}],["meta",{"property":"og:description","content":"第一阶段的目标是让你从底层理解 Agent 是如何思考并做出行动决策的。所有的 Agent 框架（不管是 LangChain 还是 OpenClaw）底层都跑不脱这个逻辑：ReAct 模式。 核心概念：ReAct (Reasoning and Acting) 在传统的 AI 聊天中，AI 是“想好了直接说”；而在 Agent 中，AI 是**“边思考、..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.52,"words":755},"filePathRelative":"posts/AI大模型/Agent应用开发/第一阶段_掌握“大脑”的决策机制_(基础)/第一阶段_掌握“大脑”的决策机制_(基础).md","excerpt":"<p>第一阶段的目标是让你从底层理解 <strong>Agent 是如何思考并做出行动决策的</strong>。所有的 Agent 框架（不管是 LangChain 还是 OpenClaw）底层都跑不脱这个逻辑：<strong>ReAct 模式</strong>。</p>\\n<hr>\\n<h2>核心概念：ReAct (Reasoning and Acting)</h2>\\n<p>在传统的 AI 聊天中，AI 是“想好了直接说”；而在 Agent 中，AI 是**“边思考、边观察、边行动”**。</p>\\n<h2>1. ReAct 的四个基本动作</h2>\\n<p>想象你是一个运维工程师，收到一个“服务器负载高”的告警，你的大脑反应过程就是 ReAct：</p>","autoDesc":true}`),i={name:`第一阶段_掌握“大脑”的决策机制_(基础).md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>第一阶段的目标是让你从底层理解 <strong>Agent 是如何思考并做出行动决策的</strong>。所有的 Agent 框架（不管是 LangChain 还是 OpenClaw）底层都跑不脱这个逻辑：<strong>ReAct 模式</strong>。</p>
<hr>
<h2 id="核心概念-react-reasoning-and-acting" tabindex="-1"><a class="header-anchor" href="#核心概念-react-reasoning-and-acting"><span>核心概念：ReAct (Reasoning and Acting)</span></a></h2>
<p>在传统的 AI 聊天中，AI 是“想好了直接说”；而在 Agent 中，AI 是**“边思考、边观察、边行动”**。</p>
<h2 id="_1-react-的四个基本动作" tabindex="-1"><a class="header-anchor" href="#_1-react-的四个基本动作"><span>1. ReAct 的四个基本动作</span></a></h2>
<p>想象你是一个运维工程师，收到一个“服务器负载高”的告警，你的大脑反应过程就是 ReAct：</p>
<ul>
<li><strong>Thought (思考):</strong> “收到 CPU 告警，我需要先看看是哪个进程占用了资源。”</li>
<li><strong>Action (行动):</strong> 在终端输入 <code v-pre>top -c -o %CPU</code>。</li>
<li><strong>Observation (观察):</strong> 发现是一个 Java 进程在做 Full GC。</li>
<li><strong>Final Answer (结论):</strong> “是订单服务的堆内存溢出导致了高负载，建议重启并调整 JVM 参数。”</li>
</ul>
<hr>
<h2 id="_2-核心技术-function-calling-函数调用" tabindex="-1"><a class="header-anchor" href="#_2-核心技术-function-calling-函数调用"><span>2. 核心技术：Function Calling (函数调用)</span></a></h2>
<p>大模型本身并不能跑代码，它只是一个**“决策者”**。它通过 <strong>Function Calling</strong> 告诉你的 Python 程序：“嘿，我现在需要运行 <code v-pre>check_log</code> 这个函数，参数是 <code v-pre>error.log</code>”。</p>
<h2 id="实战演练-手动模拟一个-agent" tabindex="-1"><a class="header-anchor" href="#实战演练-手动模拟一个-agent"><span>实战演练：手动模拟一个 Agent</span></a></h2>
<p>为了让你彻底理解，我们不调 API，先用<strong>脑补</strong>的方式走一遍逻辑。</p>
<p><strong>场景：</strong> 你写了一个 Python 函数 <code v-pre>get_weather(city)</code>，能查天气。</p>
<p><strong>过程：</strong></p>
<ol>
<li><strong>用户问：</strong> “今天上海要带伞吗？”</li>
<li><strong>AI 思考 (Thought)：</strong> 用户想知道要不要带伞，我需要查上海的天气。</li>
<li><strong>AI 决策 (Action)：</strong> 输出一段特殊格式：<code v-pre>call: get_weather(city=&quot;shanghai&quot;)</code>。</li>
<li><strong>你的 Python 程序：</strong> 拦截到这段输出，真的去跑了函数，得到结果：<code v-pre>Observation: 阵雨</code>。</li>
<li><strong>AI 最终回答 (Final Answer)：</strong> “上海今天有阵雨，建议带伞。”</li>
</ol>
<hr>
<h2 id="_3-动手任务-配置你的-实验环境" tabindex="-1"><a class="header-anchor" href="#_3-动手任务-配置你的-实验环境"><span>3. 动手任务：配置你的“实验环境”</span></a></h2>
<p>在写代码之前，你需要准备好以下工具，这和你平时的开发环境基本一致：</p>
<ol>
<li><strong>Python 环境：</strong> 建议使用 Python 3.10+。</li>
<li><strong>大模型 API：</strong> * <strong>推荐：</strong> 使用 <strong>DeepSeek</strong> 或 <strong>通义千问 (Qwen)</strong> 的 API，因为它们对 <strong>Function Calling</strong> 的支持非常稳，而且极其便宜（甚至有免费额度）。</li>
</ol>
<ul>
<li>如果你有现成的 OpenAI 接口也可以。</li>
</ul>
<ol start="3">
<li><strong>安装 SDK：</strong></li>
</ol>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>pip install openai  # 大多数国产模型都兼容 openai 的调用库</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><hr>
<h2 id="第一阶段的小练习-无需代码-只需思考" tabindex="-1"><a class="header-anchor" href="#第一阶段的小练习-无需代码-只需思考"><span>第一阶段的小练习 (无需代码，只需思考)</span></a></h2>
<p>假设你现在要给你的**“分布式日志分析平台”**做一个 Agent。</p>
<p>你手头有三个现成的 Python 函数：</p>
<ol>
<li><code v-pre>fetch_kafka_logs(topic)</code>：从 Kafka 取最新日志。</li>
<li><code v-pre>query_prometheus(metric)</code>：查监控指标。</li>
<li><code v-pre>send_wechat_msg(content)</code>：发微信通知。</li>
</ol>
<p><strong>问题：</strong> 如果用户说“帮我看看生产环境的订单服务稳不稳定，有问题微信告诉我”，<strong>请你写出这个 Agent 应该经历的 Thought -&gt; Action -&gt; Observation 过程。</strong></p>
<p><strong>你可以试着描述一下这个过程，或者如果你准备好了，我们可以直接进入代码实现环节？</strong></p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};