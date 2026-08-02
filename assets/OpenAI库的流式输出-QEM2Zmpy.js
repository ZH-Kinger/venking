import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%80%E9%98%B6%E6%AE%B5_%E6%8E%8C%E6%8F%A1%E2%80%9C%E5%A4%A7%E8%84%91%E2%80%9D%E7%9A%84%E5%86%B3%E7%AD%96%E6%9C%BA%E5%88%B6_(%E5%9F%BA%E7%A1%80)/Function_Calling_(%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8)/OpenAI%E5%BA%93/OpenAI%E5%BA%93%E7%9A%84%E6%B5%81%E5%BC%8F%E8%BE%93%E5%87%BA.html","title":"OpenAI库的流式输出","lang":"zh-CN","frontmatter":{"title":"OpenAI库的流式输出","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"流式输出（stream）是什么？ 流式输出（Streaming） 是提高 AI 交互体验的关键技术。 简单来说，普通的输出是“等 AI 全部想好了，一次性把整段话塞给你”；而流式输出是“AI 每想出一个字，就立刻发给你一个字”。这就像看真人打字一样，能极大地缓解用户的等待焦虑。 1. 为什么需要流式输出？ 在大模型处理复杂逻辑（比如你的 AIOps 日...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"OpenAI库的流式输出\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/OpenAI%E5%BA%93%E7%9A%84%E6%B5%81%E5%BC%8F%E8%BE%93%E5%87%BA-1.png\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%80%E9%98%B6%E6%AE%B5_%E6%8E%8C%E6%8F%A1%E2%80%9C%E5%A4%A7%E8%84%91%E2%80%9D%E7%9A%84%E5%86%B3%E7%AD%96%E6%9C%BA%E5%88%B6_(%E5%9F%BA%E7%A1%80)/Function_Calling_(%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8)/OpenAI%E5%BA%93/OpenAI%E5%BA%93%E7%9A%84%E6%B5%81%E5%BC%8F%E8%BE%93%E5%87%BA.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"OpenAI库的流式输出"}],["meta",{"property":"og:description","content":"流式输出（stream）是什么？ 流式输出（Streaming） 是提高 AI 交互体验的关键技术。 简单来说，普通的输出是“等 AI 全部想好了，一次性把整段话塞给你”；而流式输出是“AI 每想出一个字，就立刻发给你一个字”。这就像看真人打字一样，能极大地缓解用户的等待焦虑。 1. 为什么需要流式输出？ 在大模型处理复杂逻辑（比如你的 AIOps 日..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/OpenAI%E5%BA%93%E7%9A%84%E6%B5%81%E5%BC%8F%E8%BE%93%E5%87%BA-1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.29,"words":987},"filePathRelative":"posts/AI大模型/Agent应用开发/第一阶段_掌握“大脑”的决策机制_(基础)/Function_Calling_(函数调用)/OpenAI库/OpenAI库的流式输出.md","excerpt":"<h2>流式输出（stream）是什么？</h2>\\n<p><strong>流式输出（Streaming）</strong> 是提高 AI 交互体验的关键技术。</p>\\n<p>简单来说，普通的输出是“<strong>等 AI 全部想好了，一次性把整段话塞给你</strong>”；而流式输出是“<strong>AI 每想出一个字，就立刻发给你一个字</strong>”。这就像看真人打字一样，能极大地缓解用户的等待焦虑。</p>\\n<hr>\\n<h2>1. 为什么需要流式输出？</h2>\\n<p>在大模型处理复杂逻辑（比如你的 <strong>AIOps 日志分析</strong>）时，生成一段 500 字的建议可能需要 10 秒钟。</p>","autoDesc":true}`),i={name:`OpenAI库的流式输出.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><h2 id="流式输出-stream-是什么" tabindex="-1"><a class="header-anchor" href="#流式输出-stream-是什么"><span>流式输出（stream）是什么？</span></a></h2>
<p><strong>流式输出（Streaming）</strong> 是提高 AI 交互体验的关键技术。</p>
<p>简单来说，普通的输出是“<strong>等 AI 全部想好了，一次性把整段话塞给你</strong>”；而流式输出是“<strong>AI 每想出一个字，就立刻发给你一个字</strong>”。这就像看真人打字一样，能极大地缓解用户的等待焦虑。</p>
<hr>
<h2 id="_1-为什么需要流式输出" tabindex="-1"><a class="header-anchor" href="#_1-为什么需要流式输出"><span>1. 为什么需要流式输出？</span></a></h2>
<p>在大模型处理复杂逻辑（比如你的 <strong>AIOps 日志分析</strong>）时，生成一段 500 字的建议可能需要 10 秒钟。</p>
<ul>
<li><strong>非流式（Standard）：</strong> 用户盯着屏幕发呆 10 秒，然后文字突然全部弹出。</li>
<li><strong>流式（Streaming）：</strong> 用户在第 1 秒就能看到第一个字，阅读速度和 AI 生成速度基本同步，体感延迟几乎为零。</li>
</ul>
<hr>
<h2 id="_2-代码实现-如何开启流式" tabindex="-1"><a class="header-anchor" href="#_2-代码实现-如何开启流式"><span>2. 代码实现：如何开启流式？</span></a></h2>
<p>在 <code v-pre>openai</code> 库中，你只需要做两件事：</p>
<ol>
<li>在 <code v-pre>create</code> 方法中设置 <code v-pre>stream=True</code>。</li>
<li>用 <code v-pre>for</code> 循环遍历返回的“流”。</li>
</ol>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>from openai import OpenAI</span></span>
<span class="line"><span>from config.settings import settings</span></span>
<span class="line"><span>from openai.types.chat import ChatCompletionMessageParam</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def basic_chat():</span></span>
<span class="line"><span>    client = OpenAI(</span></span>
<span class="line"><span>        api_key=settings.API_KEY,</span></span>
<span class="line"><span>        base_url=settings.BASE_URL</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    messages: list[ChatCompletionMessageParam] = [</span></span>
<span class="line"><span>        {"role": "system", "content": "你是一个专业的助手。"},</span></span>
<span class="line"><span>        {"role": "user", "content": "请详细介绍一下什么是分布式系统。"}</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 1. 发起流式请求</span></span>
<span class="line"><span>    response = client.chat.completions.create(</span></span>
<span class="line"><span>        model=settings.MODEL_NAME,</span></span>
<span class="line"><span>        messages=messages,</span></span>
<span class="line"><span>        temperature=settings.TEMPERATURE,</span></span>
<span class="line"><span>        max_tokens=settings.MAX_TOKENS,</span></span>
<span class="line"><span>        stream=True  # 开启流式</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    print("模型正在打字：", end="", flush=True)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 2. 遍历流式返回的每一个“碎片”</span></span>
<span class="line"><span>    # 注意：流式输出中，获取内容的路径变为了 .choices[0].delta.content</span></span>
<span class="line"><span>    full_content = ""</span></span>
<span class="line"><span>    for chunk in response:</span></span>
<span class="line"><span>        content = chunk.choices[0].delta.content</span></span>
<span class="line"><span>        if content:</span></span>
<span class="line"><span>            print(content, end="", flush=True)  # 实时打印到控制台</span></span>
<span class="line"><span>            full_content += content            # 同时也存起来，方便后续逻辑使用</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    print("\\n\\n--- 打印完毕 ---")</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if __name__ == "__main__":</span></span>
<span class="line"><span>    basic_chat()</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="运行结果" tabindex="-1"><a class="header-anchor" href="#运行结果"><span>运行结果</span></a></h3>
<ul>
<li><code v-pre>**for chunk in response**</code>: 这是最关键的改变。<code v-pre>response</code> 变成了一个可迭代对象。每当 AI 算出一个新的词，循环就会运行一次。</li>
<li><code v-pre>**delta**</code> <strong>取代了</strong> <code v-pre>**message**</code>:</li>
<li><strong>普通模式</strong>：<code v-pre>response.choices[0].message.content</code>（拿最终结果）。</li>
<li><strong>流式模式</strong>：<code v-pre>chunk.choices[0].delta.content</code>（拿这次流出来的增量）。</li>
<li><code v-pre>**end=&quot;&quot;, flush=True**</code>:</li>
<li><code v-pre>end=&quot;&quot;</code>：告诉 <code v-pre>print</code> 不要自动换行，让字连在一起。</li>
<li><code v-pre>flush=True</code>：强制 Python 立即把缓冲区的内容吐到屏幕上。不加这个的话，系统可能会攒一大段才显示，失去了“打字机”的快感。</li>
</ul>
<figure><img src="/blog/assets/posts/OpenAI%E5%BA%93%E7%9A%84%E6%B5%81%E5%BC%8F%E8%BE%93%E5%87%BA-1.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<hr>
<h2 id="_3-流式输出的响应格式有什么不同" tabindex="-1"><a class="header-anchor" href="#_3-流式输出的响应格式有什么不同"><span>3. 流式输出的响应格式有什么不同？</span></a></h2>
<p>当你开启 <code v-pre>stream=True</code> 时，返回的 <code v-pre>chunk</code> 结构会发生变化：</p>
<ul>
<li><strong>普通回复</strong>：返回的是 <code v-pre>message</code> 对象。</li>
<li><strong>流式回复</strong>：返回的是一系列 <code v-pre>delta</code>（增量）对象。第一个 chunk 可能是 <code v-pre>{&quot;role&quot;: &quot;assistant&quot;}</code>，随后的 chunks 才是 <code v-pre>{&quot;content&quot;: &quot;...&quot;}</code>，最后一个 chunk 的 <code v-pre>finish_reason</code> 才会是 <code v-pre>&quot;stop&quot;</code>。</li>
</ul>
<hr>
<h2 id="_4-agent-开发中的-流式-难点" tabindex="-1"><a class="header-anchor" href="#_4-agent-开发中的-流式-难点"><span>4. Agent 开发中的“流式”难点</span></a></h2>
<p>虽然流式输出对用户很友好，但对 <strong>Agent (Function Calling)</strong> 开发者来说是个挑战：</p>
<ol>
<li><strong>解析复杂：</strong> AI 请求调用工具时，<code v-pre>tool_calls</code> 也是流式回传的。你需要手动把多个 chunk 里的参数片段拼接起来，才能得到完整的 JSON。</li>
<li><strong>无法撤回：</strong> 一旦第一个字发给了用户，你就没法修改了。</li>
<li><strong>Token 计算：</strong> 只有最后一个 chunk 才会包含完整的 <code v-pre>usage</code> 统计信息（有些模型甚至在流式下不返回 usage）。</li>
</ol>
<hr>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2>
<p><strong>流式输出 = 更好的用户体验 + 更复杂的代码处理。</strong></p>
<p>在你的 <strong>AIOps 平台</strong>中，如果只是给管理员看分析报告，开启流式会显得非常高端且流畅。但如果你是在后台偷偷运行 Agent 自动修 Bug，那就没必要开流式，直接拿最终结果更省事。</p>
<p><strong>既然你了解了流式输出，我们要不要尝试写一个“打字机效果”的控制台 Demo？</strong> 运行它时，你会看到 Qwen 就像真人在你电脑前写运维报告一样。你想试试吗？</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};