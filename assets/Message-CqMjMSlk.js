import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%80%E9%98%B6%E6%AE%B5_%E6%8E%8C%E6%8F%A1%E2%80%9C%E5%A4%A7%E8%84%91%E2%80%9D%E7%9A%84%E5%86%B3%E7%AD%96%E6%9C%BA%E5%88%B6_(%E5%9F%BA%E7%A1%80)/Function_Calling_(%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8)/OpenAI%E5%BA%93/OpenAi%E5%BA%93%E7%9A%84%E5%9F%BA%E7%A1%80%E4%BD%BF%E7%94%A8/LLM%E8%B0%83%E7%94%A8%E8%A7%84%E8%8C%83/Message.html","title":"Message","lang":"zh-CN","frontmatter":{"title":"Message","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"Message是什么？ 简单来说，**message** 是你与大模型沟通的“对话档案”。 在 API 调用中，大模型是“无记忆”的。为了让它知道你之前说了什么，或者给它设定一个特定身份，你必须把整段对话历史作为一个列表（List）发送给它。这个列表里的每一个元素就是一个 message。 message 的核心结构 每一个 message 都是一个字...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Message\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%80%E9%98%B6%E6%AE%B5_%E6%8E%8C%E6%8F%A1%E2%80%9C%E5%A4%A7%E8%84%91%E2%80%9D%E7%9A%84%E5%86%B3%E7%AD%96%E6%9C%BA%E5%88%B6_(%E5%9F%BA%E7%A1%80)/Function_Calling_(%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8)/OpenAI%E5%BA%93/OpenAi%E5%BA%93%E7%9A%84%E5%9F%BA%E7%A1%80%E4%BD%BF%E7%94%A8/LLM%E8%B0%83%E7%94%A8%E8%A7%84%E8%8C%83/Message.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"Message"}],["meta",{"property":"og:description","content":"Message是什么？ 简单来说，**message** 是你与大模型沟通的“对话档案”。 在 API 调用中，大模型是“无记忆”的。为了让它知道你之前说了什么，或者给它设定一个特定身份，你必须把整段对话历史作为一个列表（List）发送给它。这个列表里的每一个元素就是一个 message。 message 的核心结构 每一个 message 都是一个字..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.22,"words":666},"filePathRelative":"posts/AI大模型/Agent应用开发/第一阶段_掌握“大脑”的决策机制_(基础)/Function_Calling_(函数调用)/OpenAI库/OpenAi库的基础使用/LLM调用规范/Message.md","excerpt":"<h2>Message是什么？</h2>\\n<p>简单来说，<code>**message**</code> <strong>是你与大模型沟通的“对话档案”</strong>。</p>\\n<p>在 API 调用中，大模型是“无记忆”的。为了让它知道你之前说了什么，或者给它设定一个特定身份，你必须把<strong>整段对话历史</strong>作为一个列表（List）发送给它。这个列表里的每一个元素就是一个 <code>message</code>。</p>\\n<hr>\\n<h2><code>message</code> 的核心结构</h2>\\n<p>每一个 <code>message</code> 都是一个字典（Dict），由两个最核心的字段组成：</p>","autoDesc":true}`),i={name:`Message.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><h2 id="message是什么" tabindex="-1"><a class="header-anchor" href="#message是什么"><span>Message是什么？</span></a></h2>
<p>简单来说，<code v-pre>**message**</code> <strong>是你与大模型沟通的“对话档案”</strong>。</p>
<p>在 API 调用中，大模型是“无记忆”的。为了让它知道你之前说了什么，或者给它设定一个特定身份，你必须把<strong>整段对话历史</strong>作为一个列表（List）发送给它。这个列表里的每一个元素就是一个 <code v-pre>message</code>。</p>
<hr>
<h2 id="message-的核心结构" tabindex="-1"><a class="header-anchor" href="#message-的核心结构"><span><code v-pre>message</code> 的核心结构</span></a></h2>
<p>每一个 <code v-pre>message</code> 都是一个字典（Dict），由两个最核心的字段组成：</p>
<ul>
<li><code v-pre>**role**</code> <strong>(角色)</strong>：指明这句话是谁说的。</li>
<li><code v-pre>**content**</code> <strong>(内容)</strong>：对话的具体文本信息。</li>
</ul>
<hr>
<h2 id="四大核心角色-roles" tabindex="-1"><a class="header-anchor" href="#四大核心角色-roles"><span>四大核心角色（Roles）</span></a></h2>
<p>在开发 Agent（智能体）时，你会用到这四种角色：</p>
<table>
<thead>
<tr>
<th><strong>角色 (Role)</strong></th>
<th><strong>谁在说话</strong></th>
<th><strong>作用</strong></th>
<th><strong>你的运维场景示例</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>system</code></td>
<td>系统/开发者</td>
<td><strong>设定人设和规则</strong>。它是 AI 必须遵守的底层指令。</td>
<td>&quot;你是一个 K8s 专家，回答必须严谨。&quot;</td>
</tr>
<tr>
<td><code v-pre>user</code></td>
<td>用户</td>
<td><strong>发送指令或提问</strong>。</td>
<td>&quot;查一下订单服务的 Pod 状态。&quot;</td>
</tr>
<tr>
<td><code v-pre>assistant</code></td>
<td>大模型</td>
<td><strong>AI 的回复</strong>。手动传入它是为了提供上下文记忆。</td>
<td>&quot;Pod <code v-pre>order-v1</code>&lt;br&gt;运行正常。&quot;</td>
</tr>
<tr>
<td><code v-pre>tool</code></td>
<td>外部工具/代码</td>
<td><strong>返回函数执行结果</strong>。这是 Agent 模式特有的。</td>
<td>&quot;CPU 占用率: 98%&quot; (由你的 Python 代码返回)</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="为什么它是一个列表-list" tabindex="-1"><a class="header-anchor" href="#为什么它是一个列表-list"><span>为什么它是一个列表（List）？</span></a></h2>
<p><strong>因为列表代表了“记忆”。</strong></p>
<p>如果你只发当前的提问给模型，它是记不住上一句的。为了实现多轮对话，你的 <code v-pre>messages</code> 列表会像这样不断增长：</p>
<p>Python</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>messages = [</span></span>
<span class="line"><span>    {"role": "system", "content": "你是一个 AIOps 助手"},  # 设定身份</span></span>
<span class="line"><span>    {"role": "user", "content": "帮我看看 Kafka 状态"},     # 第一次提问</span></span>
<span class="line"><span>    {"role": "assistant", "content": "Kafka 目前运行正常"}, # AI 的回答（需存入列表）</span></span>
<span class="line"><span>    {"role": "user", "content": "那它的堆积情况呢？"}        # 第二次提问（由于有上下文，AI 知道“它”指 Kafka）</span></span>
<span class="line"><span>]</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="为什么你在-vs-code-里会看到类型警告" tabindex="-1"><a class="header-anchor" href="#为什么你在-vs-code-里会看到类型警告"><span>为什么你在 VS Code 里会看到类型警告？</span></a></h2>
<p>正如你之前遇到的红线，OpenAI 的 SDK 对 <code v-pre>messages</code> 的格式要求极其严苛：</p>
<ol>
<li><strong>必须是列表</strong>：即使只有一句话，也要写成 <code v-pre>[{&quot;role&quot;: &quot;...&quot;, &quot;content&quot;: &quot;...&quot;}]</code>。</li>
<li><strong>字段不能错</strong>：不能把 <code v-pre>content</code> 写成 <code v-pre>text</code>，不能把 <code v-pre>role</code> 写成 <code v-pre>part</code>。</li>
<li><strong>角色受限</strong>：只能填那几个固定的字符串。</li>
</ol>
<p><strong>总结：</strong></p>
<p><code v-pre>message</code> 就是 <strong>Agent 的记忆载体</strong>。你通过不断往这个列表中 <code v-pre>append</code>（添加）新的对话，来维持 Agent 的连续思考能力。</p>
<p><strong>既然理解了</strong> <code v-pre>**message**</code> <strong>是记忆，我们要不要试着写一个“带记忆”的对话程序？</strong> 让 AI 记住你刚才提到的“日志路径”，并在下一轮回答中使用它。你想试试吗？</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};