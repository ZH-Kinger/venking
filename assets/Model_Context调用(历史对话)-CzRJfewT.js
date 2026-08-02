import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%80%E9%98%B6%E6%AE%B5_%E6%8E%8C%E6%8F%A1%E2%80%9C%E5%A4%A7%E8%84%91%E2%80%9D%E7%9A%84%E5%86%B3%E7%AD%96%E6%9C%BA%E5%88%B6_(%E5%9F%BA%E7%A1%80)/Function_Calling_(%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8)/OpenAI%E5%BA%93/Model_Context%E8%B0%83%E7%94%A8(%E5%8E%86%E5%8F%B2%E5%AF%B9%E8%AF%9D).html","title":"Model_Context调用(历史对话)","lang":"zh-CN","frontmatter":{"title":"Model_Context调用(历史对话)","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"要在调用模型时附带“历史消息”，核心在于维护好那个 messages 列表。 由于大模型 API 本身是无状态的（它不记得你上一秒说了什么），所以你必须在每一次发起请求时，把之前的对话记录全部打包发给它。 1. 核心原理：维护一个“记忆列表” 在代码逻辑上，你需要执行以下循环： 用户输入 -&gt; append 到 messages。 调用模型 -&...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Model_Context调用(历史对话)\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/Model_Context%E8%B0%83%E7%94%A8(%E5%8E%86%E5%8F%B2%E5%AF%B9%E8%AF%9D\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%80%E9%98%B6%E6%AE%B5_%E6%8E%8C%E6%8F%A1%E2%80%9C%E5%A4%A7%E8%84%91%E2%80%9D%E7%9A%84%E5%86%B3%E7%AD%96%E6%9C%BA%E5%88%B6_(%E5%9F%BA%E7%A1%80)/Function_Calling_(%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8)/OpenAI%E5%BA%93/Model_Context%E8%B0%83%E7%94%A8(%E5%8E%86%E5%8F%B2%E5%AF%B9%E8%AF%9D).html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"Model_Context调用(历史对话)"}],["meta",{"property":"og:description","content":"要在调用模型时附带“历史消息”，核心在于维护好那个 messages 列表。 由于大模型 API 本身是无状态的（它不记得你上一秒说了什么），所以你必须在每一次发起请求时，把之前的对话记录全部打包发给它。 1. 核心原理：维护一个“记忆列表” 在代码逻辑上，你需要执行以下循环： 用户输入 -&gt; append 到 messages。 调用模型 -&..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/Model_Context%E8%B0%83%E7%94%A8(%E5%8E%86%E5%8F%B2%E5%AF%B9%E8%AF%9D"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.66,"words":798},"filePathRelative":"posts/AI大模型/Agent应用开发/第一阶段_掌握“大脑”的决策机制_(基础)/Function_Calling_(函数调用)/OpenAI库/Model_Context调用(历史对话).md","excerpt":"<p>要在调用模型时附带“历史消息”，核心在于维护好那个 <code>messages</code> 列表。</p>\\n<p>由于大模型 API 本身是<strong>无状态</strong>的（它不记得你上一秒说了什么），所以你必须在每一次发起请求时，把<strong>之前的对话记录</strong>全部打包发给它。</p>\\n<hr>\\n<h2>1. 核心原理：维护一个“记忆列表”</h2>\\n<p>在代码逻辑上，你需要执行以下循环：</p>\\n<ol>\\n<li><strong>用户输入</strong> -&gt; <code>append</code> 到 <code>messages</code>。</li>\\n<li><strong>调用模型</strong> -&gt; 传入整个 <code>messages</code>。</li>\\n<li><strong>获取回复</strong> -&gt; 将 AI 的回答也 <code>append</code> 到 <code>messages</code>（角色设为 <code>assistant</code>）。</li>\\n</ol>","autoDesc":true}`),i={name:`Model_Context调用(历史对话).md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>要在调用模型时附带“历史消息”，核心在于维护好那个 <code v-pre>messages</code> 列表。</p>
<p>由于大模型 API 本身是<strong>无状态</strong>的（它不记得你上一秒说了什么），所以你必须在每一次发起请求时，把<strong>之前的对话记录</strong>全部打包发给它。</p>
<hr>
<h2 id="_1-核心原理-维护一个-记忆列表" tabindex="-1"><a class="header-anchor" href="#_1-核心原理-维护一个-记忆列表"><span>1. 核心原理：维护一个“记忆列表”</span></a></h2>
<p>在代码逻辑上，你需要执行以下循环：</p>
<ol>
<li><strong>用户输入</strong> -&gt; <code v-pre>append</code> 到 <code v-pre>messages</code>。</li>
<li><strong>调用模型</strong> -&gt; 传入整个 <code v-pre>messages</code>。</li>
<li><strong>获取回复</strong> -&gt; 将 AI 的回答也 <code v-pre>append</code> 到 <code v-pre>messages</code>（角色设为 <code v-pre>assistant</code>）。</li>
</ol>
<hr>
<h2 id="_2-带历史记录的流式对话完整代码" tabindex="-1"><a class="header-anchor" href="#_2-带历史记录的流式对话完整代码"><span>2. 带历史记录的流式对话完整代码</span></a></h2>
<p>我们将你之前的 <code v-pre>basic_chat</code> 改造为一个支持多轮对话的循环：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>from openai import OpenAI</span></span>
<span class="line"><span>from config.settings import settings</span></span>
<span class="line"><span>from openai.types.chat import ChatCompletionMessageParam</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def continuous_chat():</span></span>
<span class="line"><span>    client = OpenAI(</span></span>
<span class="line"><span>        api_key=settings.API_KEY,</span></span>
<span class="line"><span>        base_url=settings.BASE_URL</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 1. 初始化对话历史（放入 System 提示词）</span></span>
<span class="line"><span>    history: list[ChatCompletionMessageParam] = [</span></span>
<span class="line"><span>        {"role": "system", "content": "你是一个专业的运维助手，记得之前的对话内容。"}</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    print("--- 已进入多轮对话模式（输入 'quit' 退出） ---")</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    while True:</span></span>
<span class="line"><span>        # 2. 获取用户输入</span></span>
<span class="line"><span>        user_input = input("\\n用户 >> ")</span></span>
<span class="line"><span>        if user_input.lower() in ['quit', 'exit']:</span></span>
<span class="line"><span>            break</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 3. 将用户话语加入历史</span></span>
<span class="line"><span>        history.append({"role": "user", "content": user_input})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 4. 发起流式调用，传入完整的 history</span></span>
<span class="line"><span>        response = client.chat.completions.create(</span></span>
<span class="line"><span>            model=settings.MODEL_NAME,</span></span>
<span class="line"><span>            messages=history, # 关键：这里传的是整个列表</span></span>
<span class="line"><span>            temperature=settings.TEMPERATURE,</span></span>
<span class="line"><span>            stream=True</span></span>
<span class="line"><span>        )</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        print("AI >> ", end="", flush=True)</span></span>
<span class="line"><span>        full_reply = ""</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        for chunk in response:</span></span>
<span class="line"><span>            content = chunk.choices[0].delta.content</span></span>
<span class="line"><span>            if content:</span></span>
<span class="line"><span>                print(content, end="", flush=True)</span></span>
<span class="line"><span>                full_reply += content # 拼接碎片</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        # 5. 关键一步：将 AI 的回复也存入历史，否则下一轮它就忘了自己说过什么</span></span>
<span class="line"><span>        history.append({"role": "assistant", "content": full_reply})</span></span>
<span class="line"><span>        print() # 换行</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if __name__ == "__main__":</span></span>
<span class="line"><span>    continuous_chat()</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="对话结果" tabindex="-1"><a class="header-anchor" href="#对话结果"><span>对话结果</span></a></h3>
<figure><img src="/blog/assets/posts/Model_Context%E8%B0%83%E7%94%A8(%E5%8E%86%E5%8F%B2%E5%AF%B9%E8%AF%9D)-1.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<hr>
<h2 id="_3-为什么必须存入-assistant-角色" tabindex="-1"><a class="header-anchor" href="#_3-为什么必须存入-assistant-角色"><span>3. 为什么必须存入 <code v-pre>assistant</code> 角色？</span></a></h2>
<p>如果不把 AI 的回复（<code v-pre>assistant</code>）存回列表，下一轮对话时，AI 只会看到：</p>
<ul>
<li><code v-pre>System</code>: 你是助手</li>
<li><code v-pre>User</code>: 什么是 Kafka？</li>
<li><code v-pre>User</code>: 它的优点呢？</li>
</ul>
<p>此时 AI 会一脸懵逼，因为它不知道“它”指代的是 Kafka。只有加上了中间那句 <code v-pre>Assistant: Kafka 是分布式流处理平台...</code>，它才能通过上下文推断出你的意图。</p>
<hr>
<h2 id="_4-进阶-如何防止-历史记录过长" tabindex="-1"><a class="header-anchor" href="#_4-进阶-如何防止-历史记录过长"><span>4. 进阶：如何防止“历史记录过长”？</span></a></h2>
<p>随着对话次数增加，<code v-pre>messages</code> 列表会越来越长，导致两个问题：</p>
<ol>
<li><strong>费钱</strong>：每一轮都要重复发送前面的所有内容。</li>
<li><strong>爆仓</strong>：超过模型的 <code v-pre>context_window</code>（上下文窗口限制）后，模型会报错。</li>
</ol>
<p><strong>常用的处理方案：</strong></p>
<ul>
<li><strong>滑动窗口</strong>：只保留最近的 10 轮对话（<code v-pre>history = history[-10:]</code>，注意保留第一条 System 消息）。</li>
<li><strong>总结记忆</strong>：当记录太长时，让 AI 把之前的对话总结成一段话，替换掉旧记录（这是 <strong>Agentic RAG</strong> 经常干的事）。</li>
</ul>
<hr>
<h2 id="_5-你的下一步挑战" tabindex="-1"><a class="header-anchor" href="#_5-你的下一步挑战"><span>5. 你的下一步挑战</span></a></h2>
<p>现在你已经实现了<strong>带记忆的流式对话</strong>。在 <strong>Agent</strong> 开发中，这个 <code v-pre>history</code> 列表还会包含 <code v-pre>tool_calls</code> 和 <code v-pre>tool</code> 的返回结果。</p>
<p><strong>你想试试看，当历史记录里包含了一个“报错日志”时，AI 是如何根据上下文帮你持续排查问题的吗？</strong> 我们可以模拟一个 Kafka 挂掉的场景来测试。</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};