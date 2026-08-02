import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%80%E9%98%B6%E6%AE%B5_%E6%8E%8C%E6%8F%A1%E2%80%9C%E5%A4%A7%E8%84%91%E2%80%9D%E7%9A%84%E5%86%B3%E7%AD%96%E6%9C%BA%E5%88%B6_(%E5%9F%BA%E7%A1%80)/Function_Calling_(%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8)/JSON_Schema/TOOLS/%E6%A0%87%E5%87%86%E5%8C%96TOOLS.html","title":"标准化TOOLS","lang":"zh-CN","frontmatter":{"title":"标准化TOOLS","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"在 Agent 开发的工程实践中，函数的存放方式直接决定了你的代码是“玩具”还是“工业级平台”。 建议按照“逻辑分离”的原则来存放。千万不要把所有的业务逻辑都堆在 main.py 里。 1. 推荐目录结构：tools/ 文件夹 建议在项目根目录下创建一个 tools/ 包，将不同类别的“手脚”（函数）分开存放。 2. 编写函数：工具函数 (The Im...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"标准化TOOLS\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%80%E9%98%B6%E6%AE%B5_%E6%8E%8C%E6%8F%A1%E2%80%9C%E5%A4%A7%E8%84%91%E2%80%9D%E7%9A%84%E5%86%B3%E7%AD%96%E6%9C%BA%E5%88%B6_(%E5%9F%BA%E7%A1%80)/Function_Calling_(%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8)/JSON_Schema/TOOLS/%E6%A0%87%E5%87%86%E5%8C%96TOOLS.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"标准化TOOLS"}],["meta",{"property":"og:description","content":"在 Agent 开发的工程实践中，函数的存放方式直接决定了你的代码是“玩具”还是“工业级平台”。 建议按照“逻辑分离”的原则来存放。千万不要把所有的业务逻辑都堆在 main.py 里。 1. 推荐目录结构：tools/ 文件夹 建议在项目根目录下创建一个 tools/ 包，将不同类别的“手脚”（函数）分开存放。 2. 编写函数：工具函数 (The Im..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.39,"words":716},"filePathRelative":"posts/AI大模型/Agent应用开发/第一阶段_掌握“大脑”的决策机制_(基础)/Function_Calling_(函数调用)/JSON_Schema/TOOLS/标准化TOOLS.md","excerpt":"<p>在 <strong>Agent 开发</strong>的工程实践中，函数的存放方式直接决定了你的代码是“玩具”还是“工业级平台”。</p>\\n<p>建议按照“<strong>逻辑分离</strong>”的原则来存放。千万不要把所有的业务逻辑都堆在 <code>main.py</code> 里。</p>\\n<hr>\\n<h2>1. 推荐目录结构：<code>tools/</code> 文件夹</h2>\\n<p>建议在项目根目录下创建一个 <code>tools/</code> 包，将不同类别的“手脚”（函数）分开存放。</p>\\n<div class=\\"language-plain line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"plain\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code class=\\"language-plain\\"><span class=\\"line\\"><span>E:\\\\code\\\\blog\\\\ZH-Kinger\\\\  (你的项目根目录)</span></span>\\n<span class=\\"line\\"><span>├── config/</span></span>\\n<span class=\\"line\\"><span>│   └── settings.py      # 你的 API Key 和 URL</span></span>\\n<span class=\\"line\\"><span>├── tools/</span></span>\\n<span class=\\"line\\"><span>│   ├── __init__.py      # 让 tools 成为一个 Python 包</span></span>\\n<span class=\\"line\\"><span>│   ├── system_tools.py  # 存放 CPU、内存、磁盘相关的函数</span></span>\\n<span class=\\"line\\"><span>│   └── kafka_tools.py   # 存放 Kafka 查询、Topic 管理的函数</span></span>\\n<span class=\\"line\\"><span>└── main.py              # 主程序：初始化 Client 并运行 ReAct 循环</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`),i={name:`标准化TOOLS.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在 <strong>Agent 开发</strong>的工程实践中，函数的存放方式直接决定了你的代码是“玩具”还是“工业级平台”。</p>
<p>建议按照“<strong>逻辑分离</strong>”的原则来存放。千万不要把所有的业务逻辑都堆在 <code v-pre>main.py</code> 里。</p>
<hr>
<h2 id="_1-推荐目录结构-tools-文件夹" tabindex="-1"><a class="header-anchor" href="#_1-推荐目录结构-tools-文件夹"><span>1. 推荐目录结构：<code v-pre>tools/</code> 文件夹</span></a></h2>
<p>建议在项目根目录下创建一个 <code v-pre>tools/</code> 包，将不同类别的“手脚”（函数）分开存放。</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>E:\\code\\blog\\ZH-Kinger\\  (你的项目根目录)</span></span>
<span class="line"><span>├── config/</span></span>
<span class="line"><span>│   └── settings.py      # 你的 API Key 和 URL</span></span>
<span class="line"><span>├── tools/</span></span>
<span class="line"><span>│   ├── __init__.py      # 让 tools 成为一个 Python 包</span></span>
<span class="line"><span>│   ├── system_tools.py  # 存放 CPU、内存、磁盘相关的函数</span></span>
<span class="line"><span>│   └── kafka_tools.py   # 存放 Kafka 查询、Topic 管理的函数</span></span>
<span class="line"><span>└── main.py              # 主程序：初始化 Client 并运行 ReAct 循环</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="_2-编写函数-工具函数-the-implementation" tabindex="-1"><a class="header-anchor" href="#_2-编写函数-工具函数-the-implementation"><span>2. 编写函数：工具函数 (The Implementation)</span></a></h2>
<p>在 <code v-pre>tools/system_tools.py</code> 中，编写纯粹的 Python 逻辑。</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>import psutil</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def get_cpu_info():</span></span>
<span class="line"><span>    """这是真实的执行逻辑"""</span></span>
<span class="line"><span>    usage = psutil.cpu_percent(interval=1)</span></span>
<span class="line"><span>    return f"当前系统 CPU 占用率为 {usage}%"</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def get_mem_info():</span></span>
<span class="line"><span>    usage = psutil.virtual_memory().percent</span></span>
<span class="line"><span>    return f"当前系统内存占用率为 {usage}%"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="_3-映射逻辑-工具注册表-the-registry" tabindex="-1"><a class="header-anchor" href="#_3-映射逻辑-工具注册表-the-registry"><span>3. 映射逻辑：工具注册表 (The Registry)</span></a></h2>
<p>这是 Agent 开发中最巧妙的地方。你需要建立一个“函数名”到“函数对象”的映射表。</p>
<p>在 <code v-pre>main.py</code> 中，你可以这样写：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>from tools.system_tools import get_cpu_info, get_mem_info</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 1. 建立一个“工具字典”</span></span>
<span class="line"><span># Key 是你在 JSON Schema 里定义的 name，Value 是真实的函数对象</span></span>
<span class="line"><span>node_tools_map = {</span></span>
<span class="line"><span>    "get_cpu_usage": get_cpu_info,</span></span>
<span class="line"><span>    "get_mem_usage": get_mem_info</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 2. 当 AI 传回 tool_calls 时，直接根据名字查找并运行</span></span>
<span class="line"><span>for tool_call in response.choices[0].message.tool_calls:</span></span>
<span class="line"><span>    func_name = tool_call.function.name  # AI 说：我想用 get_cpu_usage</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    if func_name in node_tools_map:</span></span>
<span class="line"><span>        # 动态调用函数</span></span>
<span class="line"><span>        real_func = node_tools_map[func_name]</span></span>
<span class="line"><span>        result = real_func() </span></span>
<span class="line"><span>        print(f"执行成功，结果是: {result}")</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="_4-进阶存放方式-使用装饰器-decorator" tabindex="-1"><a class="header-anchor" href="#_4-进阶存放方式-使用装饰器-decorator"><span>4. 进阶存放方式：使用装饰器 (Decorator)</span></a></h2>
<p>如果你以后用了像 <strong>OpenClaw</strong> 或 <strong>Smolagents</strong> 这样的框架，它们通常使用装饰器。这种方式最优雅，因为它能同时生成 <strong>函数</strong> 和 <strong>JSON Schema</strong>。</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 伪代码示例：</span></span>
<span class="line"><span>@tool</span></span>
<span class="line"><span>def query_kafka_log(topic: str):</span></span>
<span class="line"><span>    """</span></span>
<span class="line"><span>    查询 Kafka 日志的工具。 (这里的注释会被自动提取为 Schema 的 description)</span></span>
<span class="line"><span>    """</span></span>
<span class="line"><span>    # 你的业务逻辑</span></span>
<span class="line"><span>    return "logs..."</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="_5-为什么要这样放-运维角度" tabindex="-1"><a class="header-anchor" href="#_5-为什么要这样放-运维角度"><span>5. 为什么要这样放？（运维角度）</span></a></h2>
<ol>
<li><strong>权限控制</strong>：你可以给 <code v-pre>system_tools</code> 极高的权限，但给 <code v-pre>user_tools</code> 极低的权限。</li>
<li><strong>易于测试</strong>：你可以单独运行 <code v-pre>pytest tools/kafka_tools.py</code>，确保工具本身没问题，再去调 AI。</li>
<li><strong>动态加载</strong>：在分布式平台中，你可以根据用户权限，动态地把不同的工具集（tools 列表）发给 AI。</li>
</ol>
<hr>
<h2 id="总结-你的-第一阶段-实战建议" tabindex="-1"><a class="header-anchor" href="#总结-你的-第一阶段-实战建议"><span>总结：你的“第一阶段”实战建议</span></a></h2>
<p>现在，你可以在你的项目中创建一个 <code v-pre>tools.py</code>，把 <code v-pre>get_cpu_usage</code> 放进去。</p>
<p><strong>你想看一眼如何利用 Python 的</strong> <code v-pre>**getattr**</code> <strong>或者刚才提到的“工具字典”，写一段不到 10 行的代码，就能自动处理 AI 发回来的任何工具调用吗？</strong> 这种“通用执行器”是 Agent 框架的核心逻辑。你要试试吗？</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};