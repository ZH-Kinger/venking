import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%80%E9%98%B6%E6%AE%B5_%E6%8E%8C%E6%8F%A1%E2%80%9C%E5%A4%A7%E8%84%91%E2%80%9D%E7%9A%84%E5%86%B3%E7%AD%96%E6%9C%BA%E5%88%B6_(%E5%9F%BA%E7%A1%80)/Function_Calling_(%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8)/OpenAI%E5%BA%93/OpenAI%E5%BA%93%E7%9A%84%E6%B5%81%E5%BC%8F%E8%BE%93%E5%87%BA/delta%E6%98%AF%E4%BB%80%E4%B9%88_.html","title":"delta是什么_","lang":"zh-CN","frontmatter":{"title":"delta是什么_","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"在流式输出（Streaming）的语境下，**delta** 意为“增量”或“变化量”。 如果你把普通的 API 回复比作一封“写好的信”，那么流式输出里的 **delta** 就是“一个个蹦出来的字符”。 1. 形象对比：Message vs. Delta 非流式 (**message**)：模型憋了大招，最后给你一个完整的 {&quot;role&...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"delta是什么_\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%80%E9%98%B6%E6%AE%B5_%E6%8E%8C%E6%8F%A1%E2%80%9C%E5%A4%A7%E8%84%91%E2%80%9D%E7%9A%84%E5%86%B3%E7%AD%96%E6%9C%BA%E5%88%B6_(%E5%9F%BA%E7%A1%80)/Function_Calling_(%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8)/OpenAI%E5%BA%93/OpenAI%E5%BA%93%E7%9A%84%E6%B5%81%E5%BC%8F%E8%BE%93%E5%87%BA/delta%E6%98%AF%E4%BB%80%E4%B9%88_.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"delta是什么_"}],["meta",{"property":"og:description","content":"在流式输出（Streaming）的语境下，**delta** 意为“增量”或“变化量”。 如果你把普通的 API 回复比作一封“写好的信”，那么流式输出里的 **delta** 就是“一个个蹦出来的字符”。 1. 形象对比：Message vs. Delta 非流式 (**message**)：模型憋了大招，最后给你一个完整的 {&quot;role&..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":1.61,"words":483},"filePathRelative":"posts/AI大模型/Agent应用开发/第一阶段_掌握“大脑”的决策机制_(基础)/Function_Calling_(函数调用)/OpenAI库/OpenAI库的流式输出/delta是什么_.md","excerpt":"<p>在流式输出（Streaming）的语境下，<code>**delta**</code> <strong>意为“增量”或“变化量”</strong>。</p>\\n<p>如果你把普通的 API 回复比作一封“写好的信”<strong>，那么流式输出里的</strong> <code>**delta**</code> <strong>就是</strong>“一个个蹦出来的字符”。</p>\\n<hr>\\n<h2>1. 形象对比：Message vs. Delta</h2>\\n<ul>\\n<li>\\n<p><strong>非流式 (</strong><code>**message**</code><strong>)</strong>：模型憋了大招，最后给你一个完整的 <code>{&quot;role&quot;: &quot;assistant&quot;, &quot;content&quot;: &quot;你好，我是 Qwen。&quot;}</code>。</p>\\n</li>\\n<li>\\n<p><strong>流式 (</strong><code>**delta**</code><strong>)</strong>：模型每产生一个字就发一个包。</p>\\n</li>\\n<li>\\n<p>第一个包：<code>{&quot;role&quot;: &quot;assistant&quot;}</code>（只有角色，内容为空）</p>\\n</li>\\n<li>\\n<p>第二个包：<code>{&quot;content&quot;: &quot;你&quot;}</code></p>\\n</li>\\n<li>\\n<p>第三个包：<code>{&quot;content&quot;: &quot;好&quot;}</code></p>\\n</li>\\n<li>\\n<p>第四个包：<code>{&quot;content&quot;: &quot;，&quot;}</code></p>\\n</li>\\n<li>\\n<p>...以此类推。</p>\\n</li>\\n</ul>","autoDesc":true}`),i={name:`delta是什么_.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在流式输出（Streaming）的语境下，<code v-pre>**delta**</code> <strong>意为“增量”或“变化量”</strong>。</p>
<p>如果你把普通的 API 回复比作一封“写好的信”<strong>，那么流式输出里的</strong> <code v-pre>**delta**</code> <strong>就是</strong>“一个个蹦出来的字符”。</p>
<hr>
<h2 id="_1-形象对比-message-vs-delta" tabindex="-1"><a class="header-anchor" href="#_1-形象对比-message-vs-delta"><span>1. 形象对比：Message vs. Delta</span></a></h2>
<ul>
<li>
<p><strong>非流式 (</strong><code v-pre>**message**</code><strong>)</strong>：模型憋了大招，最后给你一个完整的 <code v-pre>{&quot;role&quot;: &quot;assistant&quot;, &quot;content&quot;: &quot;你好，我是 Qwen。&quot;}</code>。</p>
</li>
<li>
<p><strong>流式 (</strong><code v-pre>**delta**</code><strong>)</strong>：模型每产生一个字就发一个包。</p>
</li>
<li>
<p>第一个包：<code v-pre>{&quot;role&quot;: &quot;assistant&quot;}</code>（只有角色，内容为空）</p>
</li>
<li>
<p>第二个包：<code v-pre>{&quot;content&quot;: &quot;你&quot;}</code></p>
</li>
<li>
<p>第三个包：<code v-pre>{&quot;content&quot;: &quot;好&quot;}</code></p>
</li>
<li>
<p>第四个包：<code v-pre>{&quot;content&quot;: &quot;，&quot;}</code></p>
</li>
<li>
<p>...以此类推。</p>
</li>
</ul>
<p><strong>这些只包含“新产生的碎片”的对象，就叫</strong> <code v-pre>**delta**</code><strong>。</strong></p>
<hr>
<h2 id="_2-为什么字段名变了" tabindex="-1"><a class="header-anchor" href="#_2-为什么字段名变了"><span>2. 为什么字段名变了？</span></a></h2>
<p>这是为了在编程逻辑上做区分：</p>
<ul>
<li><code v-pre>**response.choices[0].message**</code>：代表这是一个<strong>完整的、确定的</strong>消息对象。</li>
<li><code v-pre>**chunk.choices[0].delta**</code>：代表这是一个<strong>暂时的、不完整的</strong>增量片段。</li>
</ul>
<p>在 Python 字典中，它的结构看起来是这样的：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 普通回复的 message</span></span>
<span class="line"><span>"message": {</span></span>
<span class="line"><span>    "role": "assistant",</span></span>
<span class="line"><span>    "content": "你好"</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 流式回复的其中一个 delta</span></span>
<span class="line"><span>"delta": {</span></span>
<span class="line"><span>    "content": "好"</span></span>
<span class="line"><span>}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="_3-在-agent-function-calling-中的-delta" tabindex="-1"><a class="header-anchor" href="#_3-在-agent-function-calling-中的-delta"><span>3. 在 Agent (Function Calling) 中的 delta</span></a></h2>
<p>当你以后进阶到 <strong>Agent 开发</strong>，你会发现 <code v-pre>delta</code> 变得非常关键。</p>
<p>如果 AI 决定调用一个工具（比如 <code v-pre>query_kafka_logs</code>），它的函数参数可能很长。在流式状态下，参数也是通过 <code v-pre>delta</code> 一点点传回来的：</p>
<ul>
<li><code v-pre>delta</code> 1: <code v-pre>{&quot;tool_calls&quot;: [{&quot;function&quot;: {&quot;arguments&quot;: &quot;{\\&quot;topic\\&quot;&quot;}}]}</code></li>
<li><code v-pre>delta</code> 2: <code v-pre>{&quot;tool_calls&quot;: [{&quot;function&quot;: {&quot;arguments&quot;: &quot;: \\&quot;test\\&quot;&quot;}}]}</code></li>
<li><code v-pre>delta</code> 3: <code v-pre>{&quot;tool_calls&quot;: [{&quot;function&quot;: {&quot;arguments&quot;: &quot;}&quot;}}]}</code></li>
</ul>
<p><strong>你需要手动把这些</strong> <code v-pre>**delta**</code> <strong>里的字符串拼接起来</strong>，才能得到完整的 JSON 参数 <code v-pre>{&quot;topic&quot;: &quot;test&quot;}</code>。</p>
<hr>
<h2 id="_4-总结-如何处理-delta" tabindex="-1"><a class="header-anchor" href="#_4-总结-如何处理-delta"><span>4. 总结：如何处理 delta</span></a></h2>
<p>在代码中处理 <code v-pre>delta</code> 时，最核心的操作就是**“检查并拼接”**：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>full_response = ""</span></span>
<span class="line"><span>for chunk in response:</span></span>
<span class="line"><span>    # 必须检查 content 是否存在，因为第一个和最后一个 chunk 可能没有内容</span></span>
<span class="line"><span>    delta_content = chunk.choices[0].delta.content</span></span>
<span class="line"><span>    if delta_content:</span></span>
<span class="line"><span>        print(delta_content, end="")</span></span>
<span class="line"><span>        full_response += delta_content # 像接雨水一样把它接住</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};