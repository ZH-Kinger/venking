import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/LangChain/%E6%B5%81%E5%BC%8F%E8%BE%93%E5%87%BA.html","title":"流式输出","lang":"zh-CN","frontmatter":{"title":"流式输出","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"既然你已经成功在控制台看到了 ​AIOps 助手已上线！(流式输出模式)，现在的关键在于如何让它像打字机一样“丝滑”地蹦出字符，而不是转圈圈等半天。 在 LCEL 模式下，实现流式输出最核心的变化是从 .invoke()（一次性返回）切换到 **.stream()**（像水流一样输出）。 ​你的 app.py 核心代码写法 请检查或修改你的 chat ...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"流式输出\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/LangChain/%E6%B5%81%E5%BC%8F%E8%BE%93%E5%87%BA.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"流式输出"}],["meta",{"property":"og:description","content":"既然你已经成功在控制台看到了 ​AIOps 助手已上线！(流式输出模式)，现在的关键在于如何让它像打字机一样“丝滑”地蹦出字符，而不是转圈圈等半天。 在 LCEL 模式下，实现流式输出最核心的变化是从 .invoke()（一次性返回）切换到 **.stream()**（像水流一样输出）。 ​你的 app.py 核心代码写法 请检查或修改你的 chat ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":1.87,"words":562},"filePathRelative":"posts/AI大模型/Agent应用开发/第三阶段_拥抱生态与框架_(工程化)/LangChain/流式输出.md","excerpt":"<p>既然你已经成功在控制台看到了 <code>​AIOps 助手已上线！(流式输出模式)</code>，现在的关键在于如何让它像打字机一样“丝滑”地蹦出字符，而不是转圈圈等半天。</p>\\n<p>在 <strong>LCEL 模式</strong>下，实现流式输出最核心的变化是从 <code>.invoke()</code>（一次性返回）切换到 <code>**.stream()**</code>（像水流一样输出）。</p>\\n<hr>\\n<h2>​你的 <code>app.py</code> 核心代码写法</h2>\\n<p>请检查或修改你的 <code>chat</code> 函数，确保它是这样写的：</p>","autoDesc":true}`),i={name:`流式输出.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>既然你已经成功在控制台看到了 <code v-pre>​AIOps 助手已上线！(流式输出模式)</code>，现在的关键在于如何让它像打字机一样“丝滑”地蹦出字符，而不是转圈圈等半天。</p>
<p>在 <strong>LCEL 模式</strong>下，实现流式输出最核心的变化是从 <code v-pre>.invoke()</code>（一次性返回）切换到 <code v-pre>**.stream()**</code>（像水流一样输出）。</p>
<hr>
<h2 id="​你的-app-py-核心代码写法" tabindex="-1"><a class="header-anchor" href="#​你的-app-py-核心代码写法"><span>​你的 <code v-pre>app.py</code> 核心代码写法</span></a></h2>
<p>请检查或修改你的 <code v-pre>chat</code> 函数，确保它是这样写的：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>def chat():</span></span>
<span class="line"><span>    print("🤖 AIOps 助手已上线！(流式输出模式)")</span></span>
<span class="line"><span>    while True:</span></span>
<span class="line"><span>        user_input = input("\\n运维问题 >> ")</span></span>
<span class="line"><span>        if user_input == "exit": break</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        print("\\n💡 建议方案：", end="", flush=True)</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        # 核心：使用 .stream 而不是 .invoke</span></span>
<span class="line"><span>        # rag_chain 会返回一个迭代器，每产生一个 Token 就抛出一个 chunk</span></span>
<span class="line"><span>        for chunk in rag_chain.stream(user_input):</span></span>
<span class="line"><span>            # end="" 确保不换行，flush=True 确保立即在屏幕显示而不是存在缓冲区</span></span>
<span class="line"><span>            print(chunk, end="", flush=True)</span></span>
<span class="line"><span>            </span></span>
<span class="line"><span>        print("\\n" + "-"*30) # 结束分割线</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="​为什么流式输出对你的项目很重要" tabindex="-1"><a class="header-anchor" href="#​为什么流式输出对你的项目很重要"><span>​为什么流式输出对你的项目很重要？</span></a></h2>
<ol>
<li><strong>消除“卡顿感”</strong>：由于你使用了<strong>本地 Embedding 模型</strong>（加载慢）+ <strong>云端 Qwen 模型</strong>（生成慢），如果不流式输出，用户可能要盯着屏幕死等 5-10 秒。</li>
<li><strong>实时排障</strong>：在 AIOps 场景中，日志分析通常很长。流式输出能让你在 AI 还没写完时，就先看到前几行的报错原因分析，提高运维效率。</li>
</ol>
<hr>
<h2 id="​-一个容易忽略的小细节-stroutputparser" tabindex="-1"><a class="header-anchor" href="#​-一个容易忽略的小细节-stroutputparser"><span>​ 一个容易忽略的小细节：<code v-pre>StrOutputParser</code></span></a></h2>
<p>在你的代码截图（第 16 行）中，你导入了 <code v-pre>StrOutputParser</code>。在 LCEL 管道中，你<strong>必须</strong>把这个解析器挂在最后，流式输出才能生效：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 你的管道定义应该是这样的</span></span>
<span class="line"><span>rag_chain = (</span></span>
<span class="line"><span>    {"context": retriever | format_docs, "question": RunnablePassthrough()}</span></span>
<span class="line"><span>    | prompt </span></span>
<span class="line"><span>    | llm </span></span>
<span class="line"><span>    | StrOutputParser()  # 必须加这个，它负责把模型返回的复杂对象转成纯字符串流</span></span>
<span class="line"><span>)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="​下一步建议" tabindex="-1"><a class="header-anchor" href="#​下一步建议"><span>​下一步建议</span></a></h2>
<p>你现在的流式输出是在终端（Terminal）里跑的。</p>
<p><strong>你想试试把这个流式效果做到网页上吗？</strong> 既然你之前在折腾 <strong>VuePress 博客</strong>，我们可以用 <strong>FastAPI</strong> 写一个后端接口，让你的 AI 助手以 <code v-pre>Server-Sent Events (SSE)</code> 的方式在网页上实现像 ChatGPT 那样的打字效果。你要试试吗？</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};