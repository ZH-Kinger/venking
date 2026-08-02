import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%80%E9%98%B6%E6%AE%B5_%E6%8E%8C%E6%8F%A1%E2%80%9C%E5%A4%A7%E8%84%91%E2%80%9D%E7%9A%84%E5%86%B3%E7%AD%96%E6%9C%BA%E5%88%B6_(%E5%9F%BA%E7%A1%80)/Function_Calling_(%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8)/OpenAI%E5%BA%93/OpenAi%E5%BA%93%E7%9A%84%E5%9F%BA%E7%A1%80%E4%BD%BF%E7%94%A8/LLM%E8%B0%83%E7%94%A8%E8%A7%84%E8%8C%83/client%E5%88%9D%E5%A7%8B%E5%8C%96.html","title":"client初始化","lang":"zh-CN","frontmatter":{"title":"client初始化","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"我们可以把 client 想象成一个“翻译官+速递员”，它拿着你的 Key（通行证），去指定的 URL（官邸）找模型办事。 标准初始化代码 这是最推荐的工程化写法，直接引用你之前的 settings 对象： 初始化时到底发生了什么？ 当你运行这行代码时，SDK 内部做了三件大事： 权限封装：它把你的 API_KEY 放在 HTTP 请求的 Author...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"client初始化\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%80%E9%98%B6%E6%AE%B5_%E6%8E%8C%E6%8F%A1%E2%80%9C%E5%A4%A7%E8%84%91%E2%80%9D%E7%9A%84%E5%86%B3%E7%AD%96%E6%9C%BA%E5%88%B6_(%E5%9F%BA%E7%A1%80)/Function_Calling_(%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8)/OpenAI%E5%BA%93/OpenAi%E5%BA%93%E7%9A%84%E5%9F%BA%E7%A1%80%E4%BD%BF%E7%94%A8/LLM%E8%B0%83%E7%94%A8%E8%A7%84%E8%8C%83/client%E5%88%9D%E5%A7%8B%E5%8C%96.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"client初始化"}],["meta",{"property":"og:description","content":"我们可以把 client 想象成一个“翻译官+速递员”，它拿着你的 Key（通行证），去指定的 URL（官邸）找模型办事。 标准初始化代码 这是最推荐的工程化写法，直接引用你之前的 settings 对象： 初始化时到底发生了什么？ 当你运行这行代码时，SDK 内部做了三件大事： 权限封装：它把你的 API_KEY 放在 HTTP 请求的 Author..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":1.29,"words":388},"filePathRelative":"posts/AI大模型/Agent应用开发/第一阶段_掌握“大脑”的决策机制_(基础)/Function_Calling_(函数调用)/OpenAI库/OpenAi库的基础使用/LLM调用规范/client初始化.md","excerpt":"<p>我们可以把 <code>client</code> 想象成一个“翻译官+速递员”，它拿着你的 Key（通行证），去指定的 URL（官邸）找模型办事。</p>\\n<h2>标准初始化代码</h2>\\n<p>这是最推荐的工程化写法，直接引用你之前的 <code>settings</code> 对象：</p>\\n<div class=\\"language-plain line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"plain\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code class=\\"language-plain\\"><span class=\\"line\\"><span>from openai import OpenAI</span></span>\\n<span class=\\"line\\"><span>from config.settings import settings </span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span># 初始化 client</span></span>\\n<span class=\\"line\\"><span># 这一步只是在内存中创建一个配置对象，并不会产生网络请求（不耗流量，不花钱）</span></span>\\n<span class=\\"line\\"><span>client = OpenAI(</span></span>\\n<span class=\\"line\\"><span>    api_key=settings.API_KEY,      # 你的百炼 API Key</span></span>\\n<span class=\\"line\\"><span>    base_url=settings.BASE_URL     # https://dashscope.aliyuncs.com/compatible-mode/v1</span></span>\\n<span class=\\"line\\"><span>)</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`),i={name:`client初始化.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>我们可以把 <code v-pre>client</code> 想象成一个“翻译官+速递员”，它拿着你的 Key（通行证），去指定的 URL（官邸）找模型办事。</p>
<h2 id="标准初始化代码" tabindex="-1"><a class="header-anchor" href="#标准初始化代码"><span>标准初始化代码</span></a></h2>
<p>这是最推荐的工程化写法，直接引用你之前的 <code v-pre>settings</code> 对象：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>from openai import OpenAI</span></span>
<span class="line"><span>from config.settings import settings </span></span>
<span class="line"><span></span></span>
<span class="line"><span># 初始化 client</span></span>
<span class="line"><span># 这一步只是在内存中创建一个配置对象，并不会产生网络请求（不耗流量，不花钱）</span></span>
<span class="line"><span>client = OpenAI(</span></span>
<span class="line"><span>    api_key=settings.API_KEY,      # 你的百炼 API Key</span></span>
<span class="line"><span>    base_url=settings.BASE_URL     # https://dashscope.aliyuncs.com/compatible-mode/v1</span></span>
<span class="line"><span>)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="初始化时到底发生了什么" tabindex="-1"><a class="header-anchor" href="#初始化时到底发生了什么"><span>初始化时到底发生了什么？</span></a></h2>
<p>当你运行这行代码时，SDK 内部做了三件大事：</p>
<ol>
<li><strong>权限封装</strong>：它把你的 <code v-pre>API_KEY</code> 放在 HTTP 请求的 <code v-pre>Authorization</code> 头部，确保每次对话模型都知道你是谁。</li>
<li><strong>路由绑定</strong>：它记住了 <code v-pre>BASE_URL</code>。以后你调用 <code v-pre>chat.completions.create</code> 时，它会自动在后面拼接路径（如 <code v-pre>/chat/completions</code>）。</li>
<li><strong>连接池管理</strong>：它准备好了一个 HTTP 连接池（基于 <code v-pre>httpx</code> 库），这样你在进行多轮对话时，不需要反复握手，速度更快。</li>
</ol>
<hr>
<h2 id="常见的初始化-进阶参数" tabindex="-1"><a class="header-anchor" href="#常见的初始化-进阶参数"><span>常见的初始化“进阶参数”</span></a></h2>
<p>除了 Key 和 URL，在真实的 <strong>AIOps 平台</strong>开发中，你可能还会用到这两个参数：</p>
<table>
<thead>
<tr>
<th><strong>参数</strong></th>
<th><strong>作用</strong></th>
<th><strong>推荐场景</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>timeout</code></td>
<td>设置超时时间（秒）</td>
<td>默认通常是 60s。如果你查日志的任务很重，建议设为 <code v-pre>120.0</code>&lt;br&gt;。</td>
</tr>
<tr>
<td><code v-pre>max_retries</code></td>
<td>自动重试次数</td>
<td>网络抖动时很有用。默认是 2 次。</td>
</tr>
</tbody>
</table>
<p><strong>示例：</strong></p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>client = OpenAI(</span></span>
<span class="line"><span>    api_key=settings.API_KEY,</span></span>
<span class="line"><span>    base_url=settings.BASE_URL,</span></span>
<span class="line"><span>    timeout=60.0,</span></span>
<span class="line"><span>    max_retries=3</span></span>
<span class="line"><span>)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="​" tabindex="-1"><a class="header-anchor" href="#​"><span>​</span></a></h2>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};