import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/LangChain/%E4%B8%BA%E4%BB%80%E4%B9%88%E5%8A%A0%E8%BD%BD%E6%85%A2.html","title":"为什么加载慢","lang":"zh-CN","frontmatter":{"title":"为什么加载慢","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"初始化慢是一个非常典型的现象，特别是在你这种**“全本地化”**的配置下。简单来说，是因为你的电脑在执行几个非常耗费 CPU 和内存的“重体力活”。 以下是导致初始化慢的三个核心原因： 1. 本地 Embedding 模型的“冷启动” 这是最主要的原因。 发生了什么：当你运行代码时，Python 必须从硬盘（./models/model_cache）读...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"为什么加载慢\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/LangChain/%E4%B8%BA%E4%BB%80%E4%B9%88%E5%8A%A0%E8%BD%BD%E6%85%A2.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"为什么加载慢"}],["meta",{"property":"og:description","content":"初始化慢是一个非常典型的现象，特别是在你这种**“全本地化”**的配置下。简单来说，是因为你的电脑在执行几个非常耗费 CPU 和内存的“重体力活”。 以下是导致初始化慢的三个核心原因： 1. 本地 Embedding 模型的“冷启动” 这是最主要的原因。 发生了什么：当你运行代码时，Python 必须从硬盘（./models/model_cache）读..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.45,"words":736},"filePathRelative":"posts/AI大模型/Agent应用开发/第三阶段_拥抱生态与框架_(工程化)/LangChain/为什么加载慢.md","excerpt":"<p>初始化慢是一个非常典型的现象，特别是在你这种**“全本地化”**的配置下。简单来说，是因为你的电脑在执行几个非常耗费 CPU 和内存的“重体力活”。</p>\\n<p>以下是导致初始化慢的三个核心原因：</p>\\n<hr>\\n<h2>1. 本地 Embedding 模型的“冷启动”</h2>\\n<p>这是最主要的原因。</p>\\n<ul>\\n<li><strong>发生了什么</strong>：当你运行代码时，Python 必须从硬盘（<code>./models/model_cache</code>）读取约 <strong>400MB - 1GB</strong> 的模型权重文件。</li>\\n<li><strong>处理过程</strong>：这些数据要被加载到 <strong>RAM（内存）</strong> 中，并且 <code>shibing624/text2vec</code> 还需要在 CPU 上初始化 BERT 的神经网络结构。</li>\\n<li><strong>现状</strong>：你看到的 <code>Loading weights: 100%</code> 进度条就是在做这件事。一旦加载完成，后续的检索速度会非常快。</li>\\n</ul>","autoDesc":true}`),i={name:`为什么加载慢.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>初始化慢是一个非常典型的现象，特别是在你这种**“全本地化”**的配置下。简单来说，是因为你的电脑在执行几个非常耗费 CPU 和内存的“重体力活”。</p>
<p>以下是导致初始化慢的三个核心原因：</p>
<hr>
<h2 id="_1-本地-embedding-模型的-冷启动" tabindex="-1"><a class="header-anchor" href="#_1-本地-embedding-模型的-冷启动"><span>1. 本地 Embedding 模型的“冷启动”</span></a></h2>
<p>这是最主要的原因。</p>
<ul>
<li><strong>发生了什么</strong>：当你运行代码时，Python 必须从硬盘（<code v-pre>./models/model_cache</code>）读取约 <strong>400MB - 1GB</strong> 的模型权重文件。</li>
<li><strong>处理过程</strong>：这些数据要被加载到 <strong>RAM（内存）</strong> 中，并且 <code v-pre>shibing624/text2vec</code> 还需要在 CPU 上初始化 BERT 的神经网络结构。</li>
<li><strong>现状</strong>：你看到的 <code v-pre>Loading weights: 100%</code> 进度条就是在做这件事。一旦加载完成，后续的检索速度会非常快。</li>
</ul>
<h2 id="_2-chromadb-的索引构建" tabindex="-1"><a class="header-anchor" href="#_2-chromadb-的索引构建"><span>2. ChromaDB 的索引构建</span></a></h2>
<ul>
<li><strong>发生了什么</strong>：代码中的 <code v-pre>vectorstore = Chroma(...)</code> 这一行会打开本地的 SQLite 数据库和向量索引文件（HNSW 索引）。</li>
<li><strong>处理过程</strong>：它需要扫描索引目录，将数据库的元数据加载到内存，以便随时准备好进行“相似度搜索”。如果你的知识库文档很多，这个过程会更久。</li>
</ul>
<h2 id="_3-网络检测-huggingface-hub" tabindex="-1"><a class="header-anchor" href="#_3-网络检测-huggingface-hub"><span>3. 网络检测 (HuggingFace Hub)</span></a></h2>
<ul>
<li><strong>发生了什么</strong>：你看到的 <code v-pre>Warning: You are sending unauthenticated requests...</code> 说明 LangChain 正在尝试连接 HuggingFace 服务器。</li>
<li><strong>原因</strong>：即便你本地有缓存，<code v-pre>HuggingFaceEmbeddings</code> 默认还是会尝试联网检查模型有没有更新版本。在网络环境不佳（比如国内网络）的情况下，这个“握手”过程会卡住几秒钟。</li>
</ul>
<hr>
<h2 id="​如何让它变快-优化建议" tabindex="-1"><a class="header-anchor" href="#​如何让它变快-优化建议"><span>​如何让它变快？（优化建议）</span></a></h2>
<p>如果你想缩短启动时间，可以尝试以下三个优化：</p>
<h4 id="a-彻底禁用联网检查-离线模式" tabindex="-1"><a class="header-anchor" href="#a-彻底禁用联网检查-离线模式"><span>A. 彻底禁用联网检查（离线模式）</span></a></h4>
<p>在加载 Embedding 模型时，强制它只看本地，不联网问服务器。</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>embeddings = HuggingFaceEmbeddings(</span></span>
<span class="line"><span>    model_name="shibing624/text2vec-base-chinese",</span></span>
<span class="line"><span>    cache_folder="./models/model_cache",</span></span>
<span class="line"><span>    model_kwargs={'device': 'cpu'}, # 显式指定设备</span></span>
<span class="line"><span>    encode_kwargs={'normalize_embeddings': False}</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span># 并在环境变量里设置离线模式</span></span>
<span class="line"><span>import os</span></span>
<span class="line"><span>os.environ["TRANSFORMERS_OFFLINE"] = "1"</span></span>
<span class="line"><span>os.environ["HF_HUB_OFFLINE"] = "1"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="b-保持程序运行-长连接" tabindex="-1"><a class="header-anchor" href="#b-保持程序运行-长连接"><span>B. 保持程序运行（长连接）</span></a></h4>
<p>在 AIOps 实际场景中，我们通常不会每问一个问题就启动一次程序。</p>
<ul>
<li><strong>建议</strong>：你可以把这个程序改成一个 <strong>API 服务</strong>（使用 FastAPI）。这样模型只需要在服务器启动时加载一次，之后的每个提问都是秒回。</li>
</ul>
<h4 id="c-使用更轻量级的模型" tabindex="-1"><a class="header-anchor" href="#c-使用更轻量级的模型"><span>C. 使用更轻量级的模型</span></a></h4>
<p>如果你对精度要求没那么高，可以换成 <code v-pre>paraphrase-multilingual-MiniLM-L12-v2</code>，它的体积只有 100MB 左右，加载速度会提升数倍。</p>
<hr>
<h2 id="​心理预期" tabindex="-1"><a class="header-anchor" href="#​心理预期"><span>​心理预期</span></a></h2>
<p>目前你的初始化速度（看到那个进度条走完）大约在 <strong>5-15 秒</strong> 属于正常范围。</p>
<p><strong>你想让我帮你把刚才那个</strong> <code v-pre>**app.py**</code> <strong>改成“离线加速版”吗？</strong> 加上那几行环境变量配置后，它就不会再去尝试连 HuggingFace 的服务器，启动会顺滑很多。</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};