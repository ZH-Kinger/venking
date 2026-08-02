import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%80%E9%98%B6%E6%AE%B5_%E6%8E%8C%E6%8F%A1%E2%80%9C%E5%A4%A7%E8%84%91%E2%80%9D%E7%9A%84%E5%86%B3%E7%AD%96%E6%9C%BA%E5%88%B6_(%E5%9F%BA%E7%A1%80)/Prompt_Enginnering(%E6%8F%90%E7%A4%BA%E8%AF%8D%E5%B7%A5%E7%A8%8B)/%E6%8F%90%E7%A4%BA%E8%AF%8D%E6%A0%BC%E5%BC%8F%E4%B8%8E%E4%BC%98%E5%8C%96.html","title":"提示词格式与优化","lang":"zh-CN","frontmatter":{"title":"提示词格式与优化","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"在 AIOps 和 Agent 开发中，Prompt Engineering (提示工程) 的优化不是靠“玄学”，而是一套类似软件工程的迭代流程。 如果你的 Qwen 模型在分析 Kafka 日志时表现不稳定，或者输出的 JSON 格式老是报错，你可以通过以下五个层级进行优化： image.pngimage.png 1. 结构化你的 System Pr...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"提示词格式与优化\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/%E6%8F%90%E7%A4%BA%E8%AF%8D%E6%A0%BC%E5%BC%8F%E4%B8%8E%E4%BC%98%E5%8C%96-1.png\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%80%E9%98%B6%E6%AE%B5_%E6%8E%8C%E6%8F%A1%E2%80%9C%E5%A4%A7%E8%84%91%E2%80%9D%E7%9A%84%E5%86%B3%E7%AD%96%E6%9C%BA%E5%88%B6_(%E5%9F%BA%E7%A1%80)/Prompt_Enginnering(%E6%8F%90%E7%A4%BA%E8%AF%8D%E5%B7%A5%E7%A8%8B)/%E6%8F%90%E7%A4%BA%E8%AF%8D%E6%A0%BC%E5%BC%8F%E4%B8%8E%E4%BC%98%E5%8C%96.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"提示词格式与优化"}],["meta",{"property":"og:description","content":"在 AIOps 和 Agent 开发中，Prompt Engineering (提示工程) 的优化不是靠“玄学”，而是一套类似软件工程的迭代流程。 如果你的 Qwen 模型在分析 Kafka 日志时表现不稳定，或者输出的 JSON 格式老是报错，你可以通过以下五个层级进行优化： image.pngimage.png 1. 结构化你的 System Pr..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/%E6%8F%90%E7%A4%BA%E8%AF%8D%E6%A0%BC%E5%BC%8F%E4%B8%8E%E4%BC%98%E5%8C%96-1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.92,"words":876},"filePathRelative":"posts/AI大模型/Agent应用开发/第一阶段_掌握“大脑”的决策机制_(基础)/Prompt_Enginnering(提示词工程)/提示词格式与优化.md","excerpt":"<p>在 AIOps 和 Agent 开发中，<strong>Prompt Engineering (提示工程)</strong> 的优化不是靠“玄学”，而是一套类似软件工程的<strong>迭代流程</strong>。</p>\\n<p>如果你的 Qwen 模型在分析 Kafka 日志时表现不稳定，或者输出的 JSON 格式老是报错，你可以通过以下五个层级进行优化：</p>\\n<figure><img src=\\"/blog/assets/posts/%E6%8F%90%E7%A4%BA%E8%AF%8D%E6%A0%BC%E5%BC%8F%E4%B8%8E%E4%BC%98%E5%8C%96-1.png\\" alt=\\"image.png\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>image.png</figcaption></figure>","autoDesc":true}`),i={name:`提示词格式与优化.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在 AIOps 和 Agent 开发中，<strong>Prompt Engineering (提示工程)</strong> 的优化不是靠“玄学”，而是一套类似软件工程的<strong>迭代流程</strong>。</p>
<p>如果你的 Qwen 模型在分析 Kafka 日志时表现不稳定，或者输出的 JSON 格式老是报错，你可以通过以下五个层级进行优化：</p>
<figure><img src="/blog/assets/posts/%E6%8F%90%E7%A4%BA%E8%AF%8D%E6%A0%BC%E5%BC%8F%E4%B8%8E%E4%BC%98%E5%8C%96-1.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<hr>
<h2 id="_1-结构化你的-system-prompt-使用-xml-标签" tabindex="-1"><a class="header-anchor" href="#_1-结构化你的-system-prompt-使用-xml-标签"><span>1. 结构化你的 System Prompt (使用 XML 标签)</span></a></h2>
<p>不要给模型一段散乱的文字。大模型对<strong>结构化标记</strong>（如 XML 标签）非常敏感，这能帮助它区分什么是“规则”，什么是“背景”，什么是“任务”。</p>
<p><strong>优化前：</strong></p>
<p>你是一个运维专家，帮我分析日志，输出 JSON。</p>
<p><strong>优化后：</strong></p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>&#x3C;role>你是一个资深的 AIOps 专家，专注于分布式系统故障诊断。&#x3C;/role></span></span>
<span class="line"><span>&#x3C;context>当前分析的对象是 Kafka 集群，日志级别为 \${settings.LOG_LEVEL}。&#x3C;/context></span></span>
<span class="line"><span>&#x3C;task>请分析下文中的错误日志，并给出修复建议。&#x3C;/task></span></span>
<span class="line"><span>&#x3C;format_requirement></span></span>
<span class="line"><span>  - 必须返回纯 JSON 格式。</span></span>
<span class="line"><span>  - 严禁输出任何 Markdown 代码块标签（如 \`\`\`json）。</span></span>
<span class="line"><span>  - 包含字段：error_type, severity, suggestion。</span></span>
<span class="line"><span>&#x3C;/format_requirement></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="_2-少样本提示-few-shot-prompting" tabindex="-1"><a class="header-anchor" href="#_2-少样本提示-few-shot-prompting"><span>2. 少样本提示 (Few-Shot Prompting)</span></a></h2>
<p>这是提升模型<strong>输出稳定性</strong>最有效的方法。给模型 1-2 个“标准答案”的例子，它会模仿例子的语气、格式和逻辑。</p>
<p><strong>在 Prompt 中加入：</strong></p>
<p><strong>示例输入：</strong> &quot;Connection refused at 10.0.0.1:9092&quot;</p>
<p><strong>示例输出：</strong><code v-pre>{&quot;error_type&quot;: &quot;Network&quot;, &quot;severity&quot;: &quot;High&quot;, &quot;suggestion&quot;: &quot;检查目标 IP 端口监听状态&quot;}</code></p>
<hr>
<h2 id="_3-思维链引导-chain-of-thought-cot" tabindex="-1"><a class="header-anchor" href="#_3-思维链引导-chain-of-thought-cot"><span>3. 思维链引导 (Chain of Thought, CoT)</span></a></h2>
<p>对于复杂的逻辑（如判断 Ingress 报错是因为后端 Pod 挂了还是证书过期），直接要结果容易出错。引导模型“先思考，再回答”。</p>
<p><strong>优化技巧：</strong></p>
<p>在指令中加入：<strong>&quot;请先在 标签内分步骤推导故障原因，最后在 标签内给出结论。&quot;</strong></p>
<hr>
<h2 id="_4-负向约束-negative-constraints" tabindex="-1"><a class="header-anchor" href="#_4-负向约束-negative-constraints"><span>4. 负向约束 (Negative Constraints)</span></a></h2>
<p>明确告诉模型“<strong>不要做什么</strong>”。在运维 Agent 中，这能防止 AI 乱搞。</p>
<ul>
<li>&quot;如果日志中没有明确报错，<strong>不要</strong>尝试猜测原因。&quot;</li>
<li>&quot;<strong>不要</strong>输出任何超过 200 字的冗长解释。&quot;</li>
<li>&quot;在未获得确认前，<strong>不要</strong>给出重启服务的建议。&quot;</li>
</ul>
<hr>
<h2 id="_5-提示词自动优化循环-iterative-refinement" tabindex="-1"><a class="header-anchor" href="#_5-提示词自动优化循环-iterative-refinement"><span>5. 提示词自动优化循环 (Iterative Refinement)</span></a></h2>
<p>这是一种进阶的工程化思维：</p>
<ol>
<li><strong>测试 (Test)：</strong> 准备 10 条典型的故障日志。</li>
<li><strong>评估 (Eval)：</strong> 运行你现在的 Prompt，看有多少条输出了错误的 JSON。</li>
<li><strong>分析 (Analyze)：</strong> 发现模型在处理“多行堆栈信息”时会乱码。</li>
<li><strong>改进 (Improve)：</strong> 在 Prompt 中加入“处理多行异常时的特殊规则”。</li>
<li><strong>回归 (Repeat)：</strong> 再次测试，直到准确率达到 95% 以上。</li>
</ol>
<hr>
<h2 id="针对你项目的实战建议" tabindex="-1"><a class="header-anchor" href="#针对你项目的实战建议"><span>针对你项目的实战建议</span></a></h2>
<p>既然你正在用 <strong>阿里云百炼 (Qwen-max)</strong>，它对中文指令的遵循度很高。你可以尝试以下这个<strong>专门针对 Agentic RAG 的优化模板</strong>：</p>
<p><strong>System Prompt:</strong></p>
<p>&quot;你是一个 AIOps 调度员。</p>
<ol>
<li><strong>判断需求</strong>：如果用户的问题涉及实时数据（如查 CPU），你必须回复调用工具。</li>
<li><strong>知识检索</strong>：如果涉及历史方案，请参考检索到的文档。</li>
<li><strong>输出控制</strong>：最终回复给用户时，语言要简洁，优先列出核心指标。&quot;</li>
</ol>
<p><strong>你想试试把这个优化后的 Prompt 放到你之前的</strong> <code v-pre>**basic_chat**</code> <strong>代码里跑一下，看看 Qwen 的回复质量会有多大提升吗？</strong></p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};