import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/LangChain/%E7%A4%BA%E4%BE%8B%E4%BB%A3%E7%A0%81.html","title":"示例代码","lang":"zh-CN","frontmatter":{"title":"示例代码","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"1. 环境“防卡顿”配置 代码开头的 os.environ 是为了解决你在 Windows 下开发常遇到的痛点： 离线模式：TRANSFORMERS_OFFLINE 告诉程序：“模型已经在本地了，别再去连 HuggingFace 的服务器检查更新了。”这能显著提升启动速度，避免因为网络抖动卡在加载界面。 路径锁定：SENTENCE_TRANSFORME...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"示例代码\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/LangChain/%E7%A4%BA%E4%BE%8B%E4%BB%A3%E7%A0%81.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"示例代码"}],["meta",{"property":"og:description","content":"1. 环境“防卡顿”配置 代码开头的 os.environ 是为了解决你在 Windows 下开发常遇到的痛点： 离线模式：TRANSFORMERS_OFFLINE 告诉程序：“模型已经在本地了，别再去连 HuggingFace 的服务器检查更新了。”这能显著提升启动速度，避免因为网络抖动卡在加载界面。 路径锁定：SENTENCE_TRANSFORME..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.54,"words":1061},"filePathRelative":"posts/AI大模型/Agent应用开发/第三阶段_拥抱生态与框架_(工程化)/LangChain/示例代码.md","excerpt":"<div class=\\"language-plain line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"plain\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code class=\\"language-plain\\"><span class=\\"line\\"><span>import os</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span># 1. 禁用 HuggingFace 联网检查（解决连不上国外服务器导致的卡顿）</span></span>\\n<span class=\\"line\\"><span>os.environ[\\"TRANSFORMERS_OFFLINE\\"] = \\"1\\"</span></span>\\n<span class=\\"line\\"><span>os.environ[\\"HF_HUB_OFFLINE\\"] = \\"1\\"</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span># 2. 消除 Windows 下烦人的符号链接警告</span></span>\\n<span class=\\"line\\"><span>os.environ[\\"HF_HUB_DISABLE_SYMLINKS_WARNING\\"] = \\"1\\"</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span># 3. 告诉 Python 以后只去本地缓存找模型</span></span>\\n<span class=\\"line\\"><span>os.environ[\\"SENTENCE_TRANSFORMERS_HOME\\"] = \\"./models/model_cache\\"</span></span>\\n<span class=\\"line\\"><span>from langchain_openai import ChatOpenAI</span></span>\\n<span class=\\"line\\"><span>from langchain_huggingface import HuggingFaceEmbeddings</span></span>\\n<span class=\\"line\\"><span>from langchain_community.vectorstores import Chroma</span></span>\\n<span class=\\"line\\"><span>from langchain_core.prompts import ChatPromptTemplate</span></span>\\n<span class=\\"line\\"><span>from langchain_core.output_parsers import StrOutputParser</span></span>\\n<span class=\\"line\\"><span>from langchain_core.runnables import RunnablePassthrough</span></span>\\n<span class=\\"line\\"><span>from config.settings import settings</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span># 1. 加载本地 Embedding (这是基础包，肯定有)</span></span>\\n<span class=\\"line\\"><span>embeddings = HuggingFaceEmbeddings(</span></span>\\n<span class=\\"line\\"><span>    model_name=\\"shibing624/text2vec-base-chinese\\",</span></span>\\n<span class=\\"line\\"><span>    cache_folder=\\"./models/model_cache\\"</span></span>\\n<span class=\\"line\\"><span>)</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span># 2. 加载数据库</span></span>\\n<span class=\\"line\\"><span>vectorstore = Chroma(persist_directory=\\"./vector_db\\", embedding_function=embeddings)</span></span>\\n<span class=\\"line\\"><span>retriever = vectorstore.as_retriever(search_kwargs={\\"k\\": 3})</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span># 3. 初始化 Qwen</span></span>\\n<span class=\\"line\\"><span>llm = ChatOpenAI(</span></span>\\n<span class=\\"line\\"><span>    model=settings.MODEL_NAME,</span></span>\\n<span class=\\"line\\"><span>    api_key=settings.API_KEY,</span></span>\\n<span class=\\"line\\"><span>    base_url=settings.BASE_URL,</span></span>\\n<span class=\\"line\\"><span>    temperature=settings.TEMPERATURE,</span></span>\\n<span class=\\"line\\"><span>)</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span># 4. 定义 Prompt</span></span>\\n<span class=\\"line\\"><span>template = \\"\\"\\"你是一个 AIOps 专家。请根据以下上下文回答问题。</span></span>\\n<span class=\\"line\\"><span>上下文: {context}</span></span>\\n<span class=\\"line\\"><span>问题: {question}</span></span>\\n<span class=\\"line\\"><span>回答:\\"\\"\\"</span></span>\\n<span class=\\"line\\"><span>prompt = ChatPromptTemplate.from_template(template)</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span># 5. 【核心】LCEL 表达式 (这是现代写法，不依赖 langchain.chains)</span></span>\\n<span class=\\"line\\"><span>def format_docs(docs):</span></span>\\n<span class=\\"line\\"><span>    return \\"\\\\n\\\\n\\".join(doc.page_content for doc in docs)</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span># 这一行就是你的“大脑回路”：找资料 -> 格式化 -> 喂给 Prompt -> 给 LLM -> 转成文字</span></span>\\n<span class=\\"line\\"><span>rag_chain = (</span></span>\\n<span class=\\"line\\"><span>        {\\"context\\": retriever | format_docs, \\"question\\": RunnablePassthrough()}</span></span>\\n<span class=\\"line\\"><span>        | prompt</span></span>\\n<span class=\\"line\\"><span>        | llm</span></span>\\n<span class=\\"line\\"><span>        | StrOutputParser()</span></span>\\n<span class=\\"line\\"><span>)</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>def chat():</span></span>\\n<span class=\\"line\\"><span>    print(\\"🤖 AIOps 助手已上线！(流式输出模式)\\")</span></span>\\n<span class=\\"line\\"><span>    while True:</span></span>\\n<span class=\\"line\\"><span>        user_input = input(\\"\\\\n运维问题 >> \\")</span></span>\\n<span class=\\"line\\"><span>        if user_input == \\"exit\\": break</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>        print(\\"\\\\n💡 建议方案：\\", end=\\"\\", flush=True)</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>        # 将 .invoke() 替换为 .stream()</span></span>\\n<span class=\\"line\\"><span>        # 这会让数据像水流一样，出一块打一块</span></span>\\n<span class=\\"line\\"><span>        for chunk in rag_chain.stream(user_input):</span></span>\\n<span class=\\"line\\"><span>            print(chunk, end=\\"\\", flush=True)</span></span>\\n<span class=\\"line\\"><span>        print(\\"\\\\n\\")  # 换行</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>if __name__ == \\"__main__\\":</span></span>\\n<span class=\\"line\\"><span>    chat()</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`),i={name:`示例代码.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>import os</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 1. 禁用 HuggingFace 联网检查（解决连不上国外服务器导致的卡顿）</span></span>
<span class="line"><span>os.environ["TRANSFORMERS_OFFLINE"] = "1"</span></span>
<span class="line"><span>os.environ["HF_HUB_OFFLINE"] = "1"</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 2. 消除 Windows 下烦人的符号链接警告</span></span>
<span class="line"><span>os.environ["HF_HUB_DISABLE_SYMLINKS_WARNING"] = "1"</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 3. 告诉 Python 以后只去本地缓存找模型</span></span>
<span class="line"><span>os.environ["SENTENCE_TRANSFORMERS_HOME"] = "./models/model_cache"</span></span>
<span class="line"><span>from langchain_openai import ChatOpenAI</span></span>
<span class="line"><span>from langchain_huggingface import HuggingFaceEmbeddings</span></span>
<span class="line"><span>from langchain_community.vectorstores import Chroma</span></span>
<span class="line"><span>from langchain_core.prompts import ChatPromptTemplate</span></span>
<span class="line"><span>from langchain_core.output_parsers import StrOutputParser</span></span>
<span class="line"><span>from langchain_core.runnables import RunnablePassthrough</span></span>
<span class="line"><span>from config.settings import settings</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 1. 加载本地 Embedding (这是基础包，肯定有)</span></span>
<span class="line"><span>embeddings = HuggingFaceEmbeddings(</span></span>
<span class="line"><span>    model_name="shibing624/text2vec-base-chinese",</span></span>
<span class="line"><span>    cache_folder="./models/model_cache"</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 2. 加载数据库</span></span>
<span class="line"><span>vectorstore = Chroma(persist_directory="./vector_db", embedding_function=embeddings)</span></span>
<span class="line"><span>retriever = vectorstore.as_retriever(search_kwargs={"k": 3})</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 3. 初始化 Qwen</span></span>
<span class="line"><span>llm = ChatOpenAI(</span></span>
<span class="line"><span>    model=settings.MODEL_NAME,</span></span>
<span class="line"><span>    api_key=settings.API_KEY,</span></span>
<span class="line"><span>    base_url=settings.BASE_URL,</span></span>
<span class="line"><span>    temperature=settings.TEMPERATURE,</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 4. 定义 Prompt</span></span>
<span class="line"><span>template = """你是一个 AIOps 专家。请根据以下上下文回答问题。</span></span>
<span class="line"><span>上下文: {context}</span></span>
<span class="line"><span>问题: {question}</span></span>
<span class="line"><span>回答:"""</span></span>
<span class="line"><span>prompt = ChatPromptTemplate.from_template(template)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 5. 【核心】LCEL 表达式 (这是现代写法，不依赖 langchain.chains)</span></span>
<span class="line"><span>def format_docs(docs):</span></span>
<span class="line"><span>    return "\\n\\n".join(doc.page_content for doc in docs)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 这一行就是你的“大脑回路”：找资料 -> 格式化 -> 喂给 Prompt -> 给 LLM -> 转成文字</span></span>
<span class="line"><span>rag_chain = (</span></span>
<span class="line"><span>        {"context": retriever | format_docs, "question": RunnablePassthrough()}</span></span>
<span class="line"><span>        | prompt</span></span>
<span class="line"><span>        | llm</span></span>
<span class="line"><span>        | StrOutputParser()</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def chat():</span></span>
<span class="line"><span>    print("🤖 AIOps 助手已上线！(流式输出模式)")</span></span>
<span class="line"><span>    while True:</span></span>
<span class="line"><span>        user_input = input("\\n运维问题 >> ")</span></span>
<span class="line"><span>        if user_input == "exit": break</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        print("\\n💡 建议方案：", end="", flush=True)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 将 .invoke() 替换为 .stream()</span></span>
<span class="line"><span>        # 这会让数据像水流一样，出一块打一块</span></span>
<span class="line"><span>        for chunk in rag_chain.stream(user_input):</span></span>
<span class="line"><span>            print(chunk, end="", flush=True)</span></span>
<span class="line"><span>        print("\\n")  # 换行</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if __name__ == "__main__":</span></span>
<span class="line"><span>    chat()</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_1-环境-防卡顿-配置" tabindex="-1"><a class="header-anchor" href="#_1-环境-防卡顿-配置"><span>1. 环境“防卡顿”配置</span></a></h2>
<p>代码开头的 <code v-pre>os.environ</code> 是为了解决你在 Windows 下开发常遇到的痛点：</p>
<ul>
<li><strong>离线模式</strong>：<code v-pre>TRANSFORMERS_OFFLINE</code> 告诉程序：“模型已经在本地了，别再去连 HuggingFace 的服务器检查更新了。”这能显著提升启动速度，避免因为网络抖动卡在加载界面。</li>
<li><strong>路径锁定</strong>：<code v-pre>SENTENCE_TRANSFORMERS_HOME</code> 明确告诉 Python 你的 Embedding 模型藏在 <code v-pre>./models/model_cache</code> 里。</li>
</ul>
<hr>
<h2 id="_2-知识库加载-检索层" tabindex="-1"><a class="header-anchor" href="#_2-知识库加载-检索层"><span>2. 知识库加载（检索层）</span></a></h2>
<p>这里是 AI 的“长期记忆”来源：</p>
<ul>
<li><code v-pre>**HuggingFaceEmbeddings**</code>：这是你的“翻译官”。它负责把用户输入的文字翻译成 AI 能理解的向量数字。</li>
<li><code v-pre>**Chroma**</code>：这是你的“图书馆”。<code v-pre>persist_directory=&quot;./vector_db&quot;</code> 指定了数据库文件就在本地。</li>
<li><code v-pre>**retriever**</code>：这是你的“图书管理员”。<code v-pre>search_kwargs={&quot;k&quot;: 3}</code> 表示它每次收到提问，都会去库里抓取最相关的 <strong>3 段内容</strong> 出来。</li>
</ul>
<hr>
<h2 id="_3-lcel-管道表达式-逻辑神经回路" tabindex="-1"><a class="header-anchor" href="#_3-lcel-管道表达式-逻辑神经回路"><span>3. LCEL 管道表达式（逻辑神经回路）</span></a></h2>
<p>这是你代码中最精彩的部分，采用了 <strong>LCEL (LangChain Expression Language)</strong>。它通过管道符 <code v-pre>|</code> 把数据流串起来：</p>
<ul>
<li>
<p><code v-pre>**{&quot;context&quot;: retriever | format_docs, &quot;question&quot;: RunnablePassthrough()}**</code>：</p>
</li>
<li>
<p><code v-pre>context</code>：调用管理员找资料，并用 <code v-pre>format_docs</code> 把多段资料拼成一个大长段。</p>
</li>
<li>
<p><code v-pre>question</code>：原封不动地传下用户的提问。</p>
</li>
<li>
<p><code v-pre>**| prompt**</code>：把找来的资料和问题塞进你定义的 <code v-pre>template</code>（模版）里，变成一段完整的指令。</p>
</li>
<li>
<p><code v-pre>**| llm**</code>：把指令发给 Qwen 大脑进行推理。</p>
</li>
<li>
<p><code v-pre>**| StrOutputParser()**</code>：把 AI 返回的复杂数据包，精简提取成我们能看懂的纯文本字符串。</p>
</li>
</ul>
<hr>
<h2 id="_4-流式输出交互-表现层" tabindex="-1"><a class="header-anchor" href="#_4-流式输出交互-表现层"><span>4. 流式输出交互（表现层）</span></a></h2>
<p>在 <code v-pre>chat()</code> 函数中，你使用了 <code v-pre>.stream()</code> 模式：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>for chunk in rag_chain.stream(user_input):</span></span>
<span class="line"><span>    print(chunk, end="", flush=True)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>**chunk**</code>：表示 AI 生成的一小块内容（通常是一个词或一个字）。</li>
<li><code v-pre>**flush=True**</code>：强迫 Python 立即把字吐到屏幕上，而不是攒够了再输出。</li>
<li><strong>效果</strong>：这让 AI 看起来像是在“实时思考并打字”，极大缓解了用户等待云端 API 返回时的焦虑感。</li>
</ul>
<hr>
<h2 id="​总结-这个-rag-到底是怎么跑的" tabindex="-1"><a class="header-anchor" href="#​总结-这个-rag-到底是怎么跑的"><span>​总结：这个 RAG 到底是怎么跑的？</span></a></h2>
<ol>
<li><strong>输入</strong>：你问“K8s 怎么重启 Pod？”</li>
<li><strong>检索</strong>：ChromaDB 翻出《K8s 运维手册》第 5 页关于重启的说明。</li>
<li><strong>组合</strong>：Prompt 变成：“你是一个专家，请根据《手册第 5 页内容》，回答‘K8s 怎么重启 Pod？’”。</li>
<li><strong>生成</strong>：Qwen 收到指令，开始一个字一个字地吐出操作步骤。</li>
</ol>
<hr>
<h2 id="​你的下一个优化方向" tabindex="-1"><a class="header-anchor" href="#​你的下一个优化方向"><span>​你的下一个优化方向</span></a></h2>
<p>你的代码现在已经很稳健了。如果想让它更像一个**“运维助手”**，可以考虑：</p>
<ul>
<li><strong>增加溯源</strong>：在输出答案后，让 AI 告诉你是从哪个 <code v-pre>.txt</code> 文件里找到的（利用 <code v-pre>doc.metadata</code>）。</li>
<li><strong>异常捕获</strong>：加上 <code v-pre>try...except</code>，防止 Qwen API 偶尔波动导致整个程序崩溃退出。</li>
</ul>
<p><strong>你想试试让 AI 在回答完问题后，自动显示出它是参考了哪份文件吗？</strong> 我可以帮你微调一下 <code v-pre>rag_chain</code> 的结构。</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};