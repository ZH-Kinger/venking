import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/LangChain/LangChain%E4%B8%8B%E8%BD%BD.html","title":"LangChain下载","lang":"zh-CN","frontmatter":{"title":"LangChain下载","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"这份笔记专门为你从 “基础对话” 向 “Agent 开发” 转型而准备。在 PyCharm 环境下，建议按照以下结构记录你的部署流程： ​ LangChain 开发环境部署笔记 一、 核心组件清单 (Why we download these?) 在执行安装命令前，需理解每个包在 Agent 架构 中的生态定位： 二、 部署步骤 (Step-by-St...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"LangChain下载\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/LangChain/LangChain%E4%B8%8B%E8%BD%BD.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"LangChain下载"}],["meta",{"property":"og:description","content":"这份笔记专门为你从 “基础对话” 向 “Agent 开发” 转型而准备。在 PyCharm 环境下，建议按照以下结构记录你的部署流程： ​ LangChain 开发环境部署笔记 一、 核心组件清单 (Why we download these?) 在执行安装命令前，需理解每个包在 Agent 架构 中的生态定位： 二、 部署步骤 (Step-by-St..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.6,"words":781},"filePathRelative":"posts/AI大模型/Agent应用开发/第三阶段_拥抱生态与框架_(工程化)/LangChain/LangChain下载.md","excerpt":"<p>这份笔记专门为你从 <strong>“基础对话”</strong> 向 <strong>“Agent 开发”</strong> 转型而准备。在 PyCharm 环境下，建议按照以下结构记录你的部署流程：</p>\\n<hr>\\n<h1>​ LangChain 开发环境部署笔记</h1>\\n<h2>一、 核心组件清单 (Why we download these?)</h2>\\n<p>在执行安装命令前，需理解每个包在 <strong>Agent 架构</strong> 中的生态定位：</p>\\n<table>\\n<thead>\\n<tr>\\n<th><strong>软件包</strong></th>\\n<th><strong>定位</strong></th>\\n<th><strong>核心作用</strong></th>\\n</tr>\\n</thead>\\n<tbody>\\n<tr>\\n<td><code>langchain</code></td>\\n<td><strong>核心框架</strong></td>\\n<td>Agent 的“骨架”，负责连接 Prompt、LLM 和工具链。</td>\\n</tr>\\n<tr>\\n<td><code>langchain-community</code></td>\\n<td><strong>工具生态</strong></td>\\n<td>包含各种第三方集成（如数据库连接、本地文件读取）。</td>\\n</tr>\\n<tr>\\n<td><code>langchain-openai</code></td>\\n<td><strong>协议适配</strong></td>\\n<td>让 LangChain 能通过 OpenAI 标准协议调用 <strong>阿里云百炼 (Qwen)</strong>。</td>\\n</tr>\\n<tr>\\n<td><code>langchain-ollama</code></td>\\n<td><strong>本地大脑</strong></td>\\n<td>支持在本地私有化部署 Llama 3 或 Qwen 2 模型。</td>\\n</tr>\\n<tr>\\n<td><code>dashscope</code></td>\\n<td><strong>官方 SDK</strong></td>\\n<td>阿里云百炼的原生工具包，处理高级功能（如多模态、长文本）。</td>\\n</tr>\\n<tr>\\n<td><code>chromadb</code></td>\\n<td><strong>向量数据库</strong></td>\\n<td>Agent 的“长期硬盘”，用于存储运维手册、日志知识（RAG）。</td>\\n</tr>\\n</tbody>\\n</table>","autoDesc":true}`),i={name:`LangChain下载.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>这份笔记专门为你从 <strong>“基础对话”</strong> 向 <strong>“Agent 开发”</strong> 转型而准备。在 PyCharm 环境下，建议按照以下结构记录你的部署流程：</p>
<hr>
<h1 id="​-langchain-开发环境部署笔记" tabindex="-1"><a class="header-anchor" href="#​-langchain-开发环境部署笔记"><span>​ LangChain 开发环境部署笔记</span></a></h1>
<h2 id="一、-核心组件清单-why-we-download-these" tabindex="-1"><a class="header-anchor" href="#一、-核心组件清单-why-we-download-these"><span>一、 核心组件清单 (Why we download these?)</span></a></h2>
<p>在执行安装命令前，需理解每个包在 <strong>Agent 架构</strong> 中的生态定位：</p>
<table>
<thead>
<tr>
<th><strong>软件包</strong></th>
<th><strong>定位</strong></th>
<th><strong>核心作用</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>langchain</code></td>
<td><strong>核心框架</strong></td>
<td>Agent 的“骨架”，负责连接 Prompt、LLM 和工具链。</td>
</tr>
<tr>
<td><code v-pre>langchain-community</code></td>
<td><strong>工具生态</strong></td>
<td>包含各种第三方集成（如数据库连接、本地文件读取）。</td>
</tr>
<tr>
<td><code v-pre>langchain-openai</code></td>
<td><strong>协议适配</strong></td>
<td>让 LangChain 能通过 OpenAI 标准协议调用 <strong>阿里云百炼 (Qwen)</strong>。</td>
</tr>
<tr>
<td><code v-pre>langchain-ollama</code></td>
<td><strong>本地大脑</strong></td>
<td>支持在本地私有化部署 Llama 3 或 Qwen 2 模型。</td>
</tr>
<tr>
<td><code v-pre>dashscope</code></td>
<td><strong>官方 SDK</strong></td>
<td>阿里云百炼的原生工具包，处理高级功能（如多模态、长文本）。</td>
</tr>
<tr>
<td><code v-pre>chromadb</code></td>
<td><strong>向量数据库</strong></td>
<td>Agent 的“长期硬盘”，用于存储运维手册、日志知识（RAG）。</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="二、-部署步骤-step-by-step" tabindex="-1"><a class="header-anchor" href="#二、-部署步骤-step-by-step"><span>二、 部署步骤 (Step-by-Step)</span></a></h2>
<h3 id="_1-创建并激活虚拟环境" tabindex="-1"><a class="header-anchor" href="#_1-创建并激活虚拟环境"><span>1. 创建并激活虚拟环境</span></a></h3>
<p>在 PyCharm 的 <strong>Terminal</strong> 中执行，防止包版本冲突。</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 创建虚拟环境 (venv)</span></span>
<span class="line"><span>python -m venv venv</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 激活环境 (Windows)</span></span>
<span class="line"><span>.\\venv\\Scripts\\activate</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-一键安装全家桶-加速镜像版" tabindex="-1"><a class="header-anchor" href="#_2-一键安装全家桶-加速镜像版"><span>2. 一键安装全家桶 (加速镜像版)</span></a></h3>
<p>使用清华源加速，避免因网络问题导致的 <code v-pre>Timeout</code>。</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>pip install langchain==0.3.0 langchain-core==0.3.0 langchain-community==0.3.0 langchain-openai==0.2.0 langchain-huggingface -i https://mirrors.aliyun.com/pypi/simple/ --no-cache-dir</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 1. 安装核心驱动</span></span>
<span class="line"><span>pip install chromadb -i https://mirrors.aliyun.com/pypi/simple/</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 2. 安装 LangChain 最新的 Chroma 适配器（消除那个弃用警告）</span></span>
<span class="line"><span>pip install langchain-chroma -i https://mirrors.aliyun.com/pypi/simple/</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="三、-验证与配置-verification" tabindex="-1"><a class="header-anchor" href="#三、-验证与配置-verification"><span>三、 验证与配置 (Verification)</span></a></h2>
<h3 id="_1-验证安装版本" tabindex="-1"><a class="header-anchor" href="#_1-验证安装版本"><span>1. 验证安装版本</span></a></h3>
<p>新建 <code v-pre>check_env.py</code>，确保所有组件已就绪：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>import langchain</span></span>
<span class="line"><span>import chromadb</span></span>
<span class="line"><span>from langchain_openai import ChatOpenAI</span></span>
<span class="line"><span></span></span>
<span class="line"><span>print(f"LangChain 版本: {langchain.__version__}")</span></span>
<span class="line"><span>print(f"ChromaDB 已就绪")</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="查看langchain版本" tabindex="-1"><a class="header-anchor" href="#查看langchain版本"><span>查看langchain版本</span></a></h4>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>pip show langchain</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h4 id="导出当前依赖" tabindex="-1"><a class="header-anchor" href="#导出当前依赖"><span>导出当前依赖</span></a></h4>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>pip freeze</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="_2-环境变量配置-env-文件" tabindex="-1"><a class="header-anchor" href="#_2-环境变量配置-env-文件"><span>2. 环境变量配置 (<code v-pre>.env</code> 文件)</span></a></h3>
<p>在项目根目录创建 <code v-pre>.env</code>，统一管理你的 <strong>百炼 API Key</strong>：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 阿里云百炼配置</span></span>
<span class="line"><span>DASHSCOPE_API_KEY="你的API_KEY"</span></span>
<span class="line"><span># OpenAI 兼容模式地址</span></span>
<span class="line"><span>OPENAI_API_BASE="https://dashscope.aliyuncs.com/compatible-mode/v1"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="四、-避坑与技巧-troubleshooting" tabindex="-1"><a class="header-anchor" href="#四、-避坑与技巧-troubleshooting"><span>四、 避坑与技巧 (Troubleshooting)</span></a></h2>
<ul>
<li><strong>Pydantic 版本冲突</strong>：LangChain 深度依赖 Pydantic。如果报错，通常是因为版本太旧，尝试执行 <code v-pre>pip install -U pydantic</code>。</li>
<li><strong>PyCharm 识别不到包</strong>：如果 Terminal 装好了但代码报红，请点击 PyCharm 右下角的解释器名称，重新选择当前项目的 <code v-pre>venv/Scripts/python.exe</code>。</li>
<li><strong>ChromaDB 编译失败</strong>：在 Windows 上安装 <code v-pre>chromadb</code> 有时需要 C++ 编译环境。若报错，请先安装 <a href="https://www.google.com/search?q=https://visualstudio.microsoft.com/zh-hans/visual-cpp-build-tools/" target="_blank" rel="noopener noreferrer">Visual Studio 生成工具</a>。</li>
</ul>
<hr>
<h2 id="💡笔记小结-接下来的实战方向" tabindex="-1"><a class="header-anchor" href="#💡笔记小结-接下来的实战方向"><span>💡笔记小结：接下来的实战方向</span></a></h2>
<p>现在你的“工厂”已经建好了，接下来的 <strong>Agent 第一阶段</strong> 任务是：</p>
<ol>
<li><strong>封装模型</strong>：利用 <code v-pre>ChatOpenAI</code> 类把百炼模型实例化。</li>
<li><strong>构建 RAG</strong>：用 <code v-pre>ChromaDB</code> 把你的 <code v-pre>sidebar.ts</code>（博客配置）变成 AI 可以检索的知识库。</li>
</ol>
<p><strong>既然笔记已经整理好了，我们要不要试着写一个“最简 LangChain 脚本”，让你安装的这些包第一次协同工作？</strong> 我们可以做一个“读取本地笔记并回答”的小 Demo。你要试试吗？</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};