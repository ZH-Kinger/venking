import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%80%E9%98%B6%E6%AE%B5_%E6%8E%8C%E6%8F%A1%E2%80%9C%E5%A4%A7%E8%84%91%E2%80%9D%E7%9A%84%E5%86%B3%E7%AD%96%E6%9C%BA%E5%88%B6_(%E5%9F%BA%E7%A1%80)/Function_Calling_(%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8)/JSON_Schema/TOOLS/%E8%A3%85%E9%A5%B0%E5%99%A8.html","title":"装饰器","lang":"zh-CN","frontmatter":{"title":"装饰器","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"在 Python 中，装饰器 (Decorator) 是一种极具艺术感的语法。 简单来说，装饰器就是一个**“包装盒”。它可以在不修改原函数代码的情况下，给函数增加额外功能**（比如：记录日志、计时、权限检查等）。 对于你正在开发的 Agent 来说，装饰器非常关键，因为很多框架（如 smolagents 或 OpenClaw）都用它来一键将普通函数转...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"装饰器\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%80%E9%98%B6%E6%AE%B5_%E6%8E%8C%E6%8F%A1%E2%80%9C%E5%A4%A7%E8%84%91%E2%80%9D%E7%9A%84%E5%86%B3%E7%AD%96%E6%9C%BA%E5%88%B6_(%E5%9F%BA%E7%A1%80)/Function_Calling_(%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8)/JSON_Schema/TOOLS/%E8%A3%85%E9%A5%B0%E5%99%A8.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"装饰器"}],["meta",{"property":"og:description","content":"在 Python 中，装饰器 (Decorator) 是一种极具艺术感的语法。 简单来说，装饰器就是一个**“包装盒”。它可以在不修改原函数代码的情况下，给函数增加额外功能**（比如：记录日志、计时、权限检查等）。 对于你正在开发的 Agent 来说，装饰器非常关键，因为很多框架（如 smolagents 或 OpenClaw）都用它来一键将普通函数转..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.3,"words":690},"filePathRelative":"posts/AI大模型/Agent应用开发/第一阶段_掌握“大脑”的决策机制_(基础)/Function_Calling_(函数调用)/JSON_Schema/TOOLS/装饰器.md","excerpt":"<p>在 Python 中，<strong>装饰器 (Decorator)</strong> 是一种极具艺术感的语法。</p>\\n<p>简单来说，装饰器就是一个**“包装盒”<strong>。它可以在不修改原函数代码的情况下，给函数</strong>增加额外功能**（比如：记录日志、计时、权限检查等）。</p>\\n<p>对于你正在开发的 <strong>Agent</strong> 来说，装饰器非常关键，因为很多框架（如 <code>smolagents</code> 或 <code>OpenClaw</code>）都用它来<strong>一键将普通函数转变为 AI 工具</strong>。</p>","autoDesc":true}`),i={name:`装饰器.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在 Python 中，<strong>装饰器 (Decorator)</strong> 是一种极具艺术感的语法。</p>
<p>简单来说，装饰器就是一个**“包装盒”<strong>。它可以在不修改原函数代码的情况下，给函数</strong>增加额外功能**（比如：记录日志、计时、权限检查等）。</p>
<p>对于你正在开发的 <strong>Agent</strong> 来说，装饰器非常关键，因为很多框架（如 <code v-pre>smolagents</code> 或 <code v-pre>OpenClaw</code>）都用它来<strong>一键将普通函数转变为 AI 工具</strong>。</p>
<hr>
<h2 id="_1-形象理解-装饰器是什么" tabindex="-1"><a class="header-anchor" href="#_1-形象理解-装饰器是什么"><span>1. 形象理解：装饰器是什么？</span></a></h2>
<p>想象你有一个“裸机”函数，它只能执行简单的逻辑。</p>
<ul>
<li><strong>装饰器</strong>就像是一套<strong>钢铁侠战衣</strong>。</li>
<li>你把战衣套在“裸机”函数上，函数就瞬间获得了“飞行”和“激光”的能力，但函数内部的逻辑（托尼·史塔克本人）并没有改变。</li>
</ul>
<hr>
<h2 id="_2-基础语法-如何写一个装饰器" tabindex="-1"><a class="header-anchor" href="#_2-基础语法-如何写一个装饰器"><span>2. 基础语法：如何写一个装饰器？</span></a></h2>
<p>装饰器的本质是一个<strong>闭包</strong>：一个函数返回另一个函数。</p>
<p>Python</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 1. 定义装饰器</span></span>
<span class="line"><span>def my_decorator(func):</span></span>
<span class="line"><span>    def wrapper():</span></span>
<span class="line"><span>        print("--- 执行前：检查系统权限 ---")</span></span>
<span class="line"><span>        func()  # 运行原函数</span></span>
<span class="line"><span>        print("--- 执行后：记录操作日志 ---")</span></span>
<span class="line"><span>    return wrapper</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 2. 使用装饰器 (用 @ 符号)</span></span>
<span class="line"><span>@my_decorator</span></span>
<span class="line"><span>def say_hello():</span></span>
<span class="line"><span>    print("正在执行核心业务：Hello Agent!")</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 3. 调用</span></span>
<span class="line"><span>say_hello()</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="_3-进阶-带参数的装饰器-最常用" tabindex="-1"><a class="header-anchor" href="#_3-进阶-带参数的装饰器-最常用"><span>3. 进阶：带参数的装饰器（最常用）</span></a></h2>
<p>在实际开发中，你的函数通常是有参数的（比如查询某个特定的 Topic）。这时需要用到 <code v-pre>*args</code> 和 <code v-pre>**kwargs</code>：</p>
<p>Python</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>def log_tool_call(func):</span></span>
<span class="line"><span>    def wrapper(*args, **kwargs):</span></span>
<span class="line"><span>        print(f"正在调用工具: {func.__name__}，参数为: {args} {kwargs}")</span></span>
<span class="line"><span>        result = func(*args, **kwargs)</span></span>
<span class="line"><span>        print(f"调用结束，结果为: {result}")</span></span>
<span class="line"><span>        return result</span></span>
<span class="line"><span>    return wrapper</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@log_tool_call</span></span>
<span class="line"><span>def query_kafka(topic, lines=10):</span></span>
<span class="line"><span>    return f"从 {topic} 读取了 {lines} 行日志"</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 调用时，会自动打印日志</span></span>
<span class="line"><span>query_kafka("order-service", lines=5)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="_4-为什么-agent-开发离不开装饰器" tabindex="-1"><a class="header-anchor" href="#_4-为什么-agent-开发离不开装饰器"><span>4. 为什么 Agent 开发离不开装饰器？</span></a></h2>
<p>在你计划的 <strong>第三阶段（轻量级工具链）</strong> 中，你会看到类似这样的写法：</p>
<p>Python</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>@tool</span></span>
<span class="line"><span>def get_weather(city: str):</span></span>
<span class="line"><span>    """获取指定城市的天气。"""</span></span>
<span class="line"><span>    # 你的逻辑</span></span>
<span class="line"><span>    return "晴天"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个 <code v-pre>@tool</code> 装饰器在背后帮你做了三件极其繁琐的事：</p>
<ol>
<li><strong>自动提取</strong>：它读取函数的名称 <code v-pre>get_weather</code>。</li>
<li><strong>自动生成 Schema</strong>：它把你的文档字符串（Docstring）提取出来，直接转成 <strong>JSON Schema</strong> 里的 <code v-pre>description</code>。</li>
<li><strong>类型检查</strong>：它根据 <code v-pre>city: str</code> 自动生成 Schema 里的 <code v-pre>type: &quot;string&quot;</code>。</li>
</ol>
<p><strong>这就是为什么用了装饰器，你就不用手写那几百行枯燥的 JSON 了。</strong></p>
<hr>
<h2 id="_5-总结-装饰器的三步走" tabindex="-1"><a class="header-anchor" href="#_5-总结-装饰器的三步走"><span>5. 总结：装饰器的三步走</span></a></h2>
<ol>
<li><strong>定义</strong>：写一个接收函数并返回新函数的“外壳”。</li>
<li><strong>套用</strong>：在目标函数上方写上 <code v-pre>@装饰器名</code>。</li>
<li><strong>执行</strong>：像平常一样调用原函数，它会自动带上“外壳”里的功能。</li>
</ol>
<hr>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};