import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/Caption.html","title":"Caption","lang":"zh-CN","frontmatter":{"title":"Caption","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"在大模型与 Agent（智能体）开发、尤其是 Multimodal Agent（多模态智能体） 的语境下，Caption（图文描述 / 字幕 / 行为文本化） 指的是将非文本的模态（如图像、视频、音频、甚至屏幕 UI 界面）通过大模型转化为具有高稠密语义的结构化文本描述的过程。 在 Agent 架构中，Caption 绝不仅仅是“给图片加个标签”，它是...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Caption\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/Caption.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"Caption"}],["meta",{"property":"og:description","content":"在大模型与 Agent（智能体）开发、尤其是 Multimodal Agent（多模态智能体） 的语境下，Caption（图文描述 / 字幕 / 行为文本化） 指的是将非文本的模态（如图像、视频、音频、甚至屏幕 UI 界面）通过大模型转化为具有高稠密语义的结构化文本描述的过程。 在 Agent 架构中，Caption 绝不仅仅是“给图片加个标签”，它是..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":5.52,"words":1657},"filePathRelative":"posts/AI大模型/Agent应用开发/第三阶段_拥抱生态与框架_(工程化)/Caption.md","excerpt":"<p>在大模型与 <strong>Agent（智能体）开发</strong>、尤其是 <strong>Multimodal Agent（多模态智能体）</strong> 的语境下，<strong>Caption（图文描述 / 字幕 / 行为文本化）</strong> 指的是<strong>将非文本的模态（如图像、视频、音频、甚至屏幕 UI 界面）通过大模型转化为具有高稠密语义的结构化文本描述的过程。</strong></p>\\n<p>在 Agent 架构中，Caption 绝不仅仅是“给图片加个标签”，它是将物理世界的复杂视觉信号，物理降级翻译为大模型能够吞下、理解并进行逻辑推理的“语义大白话（Textual Representation）”。</p>","autoDesc":true}`),i={name:`Caption.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在大模型与 <strong>Agent（智能体）开发</strong>、尤其是 <strong>Multimodal Agent（多模态智能体）</strong> 的语境下，<strong>Caption（图文描述 / 字幕 / 行为文本化）</strong> 指的是<strong>将非文本的模态（如图像、视频、音频、甚至屏幕 UI 界面）通过大模型转化为具有高稠密语义的结构化文本描述的过程。</strong></p>
<p>在 Agent 架构中，Caption 绝不仅仅是“给图片加个标签”，它是将物理世界的复杂视觉信号，物理降级翻译为大模型能够吞下、理解并进行逻辑推理的“语义大白话（Textual Representation）”。</p>
<p>为了让你在做 Agent 研发时彻底搞懂它的物理生态，我们可以从它的核心角色、三种主流应用场景以及典型的 Prompt/代码实现进行深度拆解：</p>
<hr>
<h3 id="一、-为什么-agent-开发需要-caption-核心角色" tabindex="-1"><a class="header-anchor" href="#一、-为什么-agent-开发需要-caption-核心角色"><span>一、 为什么 Agent 开发需要 Caption？（核心角色）</span></a></h3>
<p>目前的 LLM（大语言模型）本质上是一个<strong>文本符号处理器</strong>。即便现在很多模型原生支持多模态输入（如 GPT-4o、Claude 3.5 Sonnet），但在构建复杂的多步骤 Agent（如自动化操控电脑的桌面 Agent、自主抓取网页的 Web Agent）时，直接让 Agent 盯着原始图片看往往面临以下物理硬伤：</p>
<ol>
<li><strong>Token 消耗与成本雪崩</strong>：原生多模态模型处理一张图片通常需要耗费数百个 Token，如果 Agent 进行 50 步的连续环境探索，每一次都把整张图塞进去，Token 费用和延迟（Latency）会直接突破天际。</li>
<li><strong>视觉注意力焦点丢失（Lost in Vision）</strong>：直接看图时，大模型很容易忽略掉边缘极小的按钮或关键提示文字。</li>
<li><strong>记忆与检索瘫痪</strong>：Agent 需要维护一个 <strong>Memory（记忆体）</strong>。图片和视频是非常难被存入向量数据库（Vector DB）进行精确文本语义检索的。</li>
</ol>
<p><strong>Caption 在这里的角色，就是作为一种“高纯度的特征提取器”：把复杂的像素信号洗成纯文本的记忆片段，存入 Agent 的思考上下文或长期记忆中。</strong></p>
<hr>
<h3 id="二、-agent-开发中的三大主流-caption-场景" tabindex="-1"><a class="header-anchor" href="#二、-agent-开发中的三大主流-caption-场景"><span>二、 Agent 开发中的三大主流 Caption 场景</span></a></h3>
<p>根据 Agent 类型的不同，Caption 的物理化身可以分为以下三种：</p>
<h4 id="_1-gui-web-agent-中的-界面状态-captioning-screen-to-text" tabindex="-1"><a class="header-anchor" href="#_1-gui-web-agent-中的-界面状态-captioning-screen-to-text"><span>1. GUI / Web Agent 中的“界面状态 Captioning”（Screen-to-Text）</span></a></h4>
<p>这类 Agent（如操控手机的 Mobile Agent 或浏览器智能体）需要感知当前屏幕发生了什么。</p>
<ul>
<li><strong>怎么做</strong>：Agent 先截一张图（Screenshot），然后调用一个专门的微型视觉模型（或者通过系统的无障碍服务 XML 树映射），为当前屏幕生成一份 <strong>Caption 报告</strong>。</li>
<li><strong>生成的 Caption 文本长这样</strong>：</li>
</ul>
<blockquote>
<p><code v-pre>&quot;当前屏幕是一个电商购物车页面。中心位置有一个商品卡片，显示『无线机械键盘，价格：￥299，数量：1』。页面右下角包含一个高亮的绿色物理按钮，文本为『去结算』。页面最上方有一个返回箭头的图标。&quot;</code></p>
</blockquote>
<ul>
<li><strong>作用</strong>：主 Agent 读到这段 Caption 后，它的 Reasoning（推理）引擎立刻就能做出决策：<code v-pre>思考：我的任务是买下键盘 $\\to$ 决策：调用 Click 算子物理点击右下角的『去结算』按钮。</code></li>
</ul>
<h4 id="_2-embodied-agent-具身智能体-机器人-中的-环境语义感知-scene-captioning" tabindex="-1"><a class="header-anchor" href="#_2-embodied-agent-具身智能体-机器人-中的-环境语义感知-scene-captioning"><span>2. Embodied Agent（具身智能体/机器人）中的“环境语义感知”（Scene Captioning）</span></a></h4>
<p>机器人 Agent 身上挂着摄像头，它在房间里移动时，需要把看到的物理世界同步给大脑。</p>
<ul>
<li><strong>怎么做</strong>：利用开箱即用的图像描述模型（如 BLIP-2、LLaVA），以 1Hz 的频率对摄像头画面进行连续 Caption。</li>
<li><strong>生成的 Caption 文本长这样</strong>：</li>
</ul>
<blockquote>
<p><code v-pre>[时间戳 12:00:05]: &quot;正前方 1.5 米处有一张红色的标准办公桌，桌面上杂乱放置着一个白色的陶瓷马克杯和一本打开的书。&quot;</code></p>
</blockquote>
<ul>
<li><strong>作用</strong>：这段 Caption 被作为 <strong>Observation（环境观察）</strong> 实时喂给 Agent 的 ReAct（推理-行动）循环。</li>
</ul>
<h4 id="_3-视频理解与长期记忆-agent-video-captioning-episodic-memory" tabindex="-1"><a class="header-anchor" href="#_3-视频理解与长期记忆-agent-video-captioning-episodic-memory"><span>3. 视频理解与长期记忆 Agent（Video Captioning / Episodic Memory）</span></a></h4>
<p>如果 Agent 的任务是看一部两小时的电影或者分析一天的监控录像，并回答用户问题。</p>
<ul>
<li><strong>怎么做</strong>：Agent 会把视频切成一个个的关键帧（Keyframes），让 Vision-Language 模型对每一帧进行精细的视频流 Caption，并附带时间戳。</li>
<li><strong>作用</strong>：把两小时的庞大视频，彻底压缩提炼成一本只有几万字的“纯文本行为日志”。当用户问：“下午谁动了我的杯子？”Agent 只需要去这个 <strong>Caption 日志文本</strong> 里做最简单的关键词匹配或 RAG（检索增强生成），就能瞬间定位到具体的视频秒数。</li>
</ul>
<hr>
<h3 id="三、-工业界-agent-开发中怎么写-caption-逻辑" tabindex="-1"><a class="header-anchor" href="#三、-工业界-agent-开发中怎么写-caption-逻辑"><span>三、 工业界 Agent 开发中怎么写 Caption 逻辑</span></a></h3>
<p>在实际手写一个 LangChain、LlamaIndex 或者是自研的 Agent 框架时，一个典型的“截屏 $\\to$ Caption $\\to$ 推理”的 Pipeline 代码逻辑通常长这样：</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> base64</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> openai </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> OpenAI</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">client </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF"> OpenAI</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">def</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> generate_screen_caption</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic">screenshot_path</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">):</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    """把 Agent 截取的屏幕像素，翻译成高稠密的纯文本描述 (Caption)"""</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    with</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> open</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(screenshot_path, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"rb"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">as</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> image_file:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        base64_image </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> base64.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">b64encode</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(image_file.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">read</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()).</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">decode</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'utf-8'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    response </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> client.chat.completions.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">create</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">        model</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"gpt-4o-mini"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 通常用速度极快、成本极低的微型多模态模型来做 Caption 基座</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">        messages</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">            {</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">                "role"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"user"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">                "content"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: [</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">                    {</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">                        "type"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"text"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">                        "text"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"请以一个 UI 自动化控制 Agent 的视角，对这张屏幕截图进行精细的 Caption。请列出所有可交互的按钮、当前页面所处的业务状态、以及任何关键的文字提示信息。"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">                    },</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">                    {</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">                        "type"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"image_url"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">                        "image_url"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: {</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"url"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">f</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"data:image/jpeg;base64,</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">{</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">base64_image</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">                    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">                ]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">            }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        ]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    )</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> response.choices[</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">].message.content</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># ---- Agent 核心循环 (Core Loop) ----</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 1. 物理层行动：Agent 截图保存为 current_screen.jpg</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 2. 感知层：</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">caption_observation </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF"> generate_screen_caption</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"current_screen.jpg"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 3. 思考层：把这个纯文本的 Caption 作为 Observation 喂给主推理 LLM</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">agent_prompt </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> f</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"""</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">你是一个全自动 Web 任务执行 Agent。</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">用户最终目标：帮我把购物车里的键盘清空。</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">当前的屏幕描述 (Caption Observation): </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">{</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">caption_observation</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">请输出你下一步需要执行的具体 Python 自动化指令 (如 click("去结算"))：</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"""</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 4. 执行层：主模型读取后，由于输入的是干净的文本 Caption，能以极高准确率输出下一步动作。</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="💡-极简总结" tabindex="-1"><a class="header-anchor" href="#💡-极简总结"><span>💡 极简总结：</span></a></h3>
<p>在 Agent 开发中，<strong>Caption 就是非文本世界的“全职翻译官”</strong>。它负责把红绿蓝的像素矩阵、屏幕上的 UI 控件，统一格式化翻译成大模型最擅长处理的<strong>结构化文本语言</strong>，从而让 Agent 在后台能够以极低的 Token 成本和极高的逻辑稳定性，完成长时间跨度（Long-horizon）的任务编排。</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};