import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%80%E9%98%B6%E6%AE%B5_%E6%8E%8C%E6%8F%A1%E2%80%9C%E5%A4%A7%E8%84%91%E2%80%9D%E7%9A%84%E5%86%B3%E7%AD%96%E6%9C%BA%E5%88%B6_(%E5%9F%BA%E7%A1%80)/Function_Calling_(%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8)/OpenAI%E5%BA%93/OpenAi%E5%BA%93%E7%9A%84%E5%9F%BA%E7%A1%80%E4%BD%BF%E7%94%A8/LLM%E8%B0%83%E7%94%A8%E8%A7%84%E8%8C%83.html","title":"LLM调用规范","lang":"zh-CN","frontmatter":{"title":"LLM调用规范","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"大模型调用规范是保障调用过程稳定、安全、合规、高效的一套标准化准则，涵盖接口调用、参数配置、安全合规、异常处理、性能优化等核心维度，是企业和开发者落地大模型应用的必备准则。 下面从 核心规范（通用）→ 接口调用规范 → 安全合规规范 → 性能与稳定性规范 → 最佳实践 四个层面，系统讲解大模型调用的核心准则，覆盖 OpenAI、阿里云、Google 等...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"LLM调用规范\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%80%E9%98%B6%E6%AE%B5_%E6%8E%8C%E6%8F%A1%E2%80%9C%E5%A4%A7%E8%84%91%E2%80%9D%E7%9A%84%E5%86%B3%E7%AD%96%E6%9C%BA%E5%88%B6_(%E5%9F%BA%E7%A1%80)/Function_Calling_(%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8)/OpenAI%E5%BA%93/OpenAi%E5%BA%93%E7%9A%84%E5%9F%BA%E7%A1%80%E4%BD%BF%E7%94%A8/LLM%E8%B0%83%E7%94%A8%E8%A7%84%E8%8C%83.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"LLM调用规范"}],["meta",{"property":"og:description","content":"大模型调用规范是保障调用过程稳定、安全、合规、高效的一套标准化准则，涵盖接口调用、参数配置、安全合规、异常处理、性能优化等核心维度，是企业和开发者落地大模型应用的必备准则。 下面从 核心规范（通用）→ 接口调用规范 → 安全合规规范 → 性能与稳定性规范 → 最佳实践 四个层面，系统讲解大模型调用的核心准则，覆盖 OpenAI、阿里云、Google 等..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":7.4,"words":2220},"filePathRelative":"posts/AI大模型/Agent应用开发/第一阶段_掌握“大脑”的决策机制_(基础)/Function_Calling_(函数调用)/OpenAI库/OpenAi库的基础使用/LLM调用规范.md","excerpt":"<p>大模型调用规范是保障调用过程<strong>稳定、安全、合规、高效</strong>的一套标准化准则，涵盖<strong>接口调用、参数配置、安全合规、异常处理、性能优化</strong>等核心维度，是企业和开发者落地大模型应用的必备准则。</p>\\n<p>下面从 <strong>核心规范（通用）→ 接口调用规范 → 安全合规规范 → 性能与稳定性规范 → 最佳实践</strong> 四个层面，系统讲解大模型调用的核心准则，覆盖 OpenAI、阿里云、Google 等主流平台。</p>\\n<hr>\\n<h2>一、核心通用规范（所有平台通用）</h2>\\n<h3>1. 接口版本与兼容性</h3>\\n","autoDesc":true}`),i={name:`LLM调用规范.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>大模型调用规范是保障调用过程<strong>稳定、安全、合规、高效</strong>的一套标准化准则，涵盖<strong>接口调用、参数配置、安全合规、异常处理、性能优化</strong>等核心维度，是企业和开发者落地大模型应用的必备准则。</p>
<p>下面从 <strong>核心规范（通用）→ 接口调用规范 → 安全合规规范 → 性能与稳定性规范 → 最佳实践</strong> 四个层面，系统讲解大模型调用的核心准则，覆盖 OpenAI、阿里云、Google 等主流平台。</p>
<hr>
<h2 id="一、核心通用规范-所有平台通用" tabindex="-1"><a class="header-anchor" href="#一、核心通用规范-所有平台通用"><span>一、核心通用规范（所有平台通用）</span></a></h2>
<h3 id="_1-接口版本与兼容性" tabindex="-1"><a class="header-anchor" href="#_1-接口版本与兼容性"><span>1. 接口版本与兼容性</span></a></h3>
<ul>
<li><strong>固定模型版本</strong>：避免使用 <code v-pre>latest</code>/<code v-pre>default</code> 等动态版本，指定具体版本（如 <code v-pre>gpt-3.5-turbo-0125</code>、<code v-pre>qwen-max-202404</code>、<code v-pre>gemini-1.5-pro-001</code>），防止模型迭代导致调用结果异常。</li>
<li><strong>兼容新旧版本</strong>：若平台接口升级（如 OpenAI v0.x → v1.x、阿里云 DashScope 1.0 → 2.0），需做好版本适配，保留降级方案。</li>
</ul>
<h3 id="_2-参数标准化配置" tabindex="-1"><a class="header-anchor" href="#_2-参数标准化配置"><span>2. 参数标准化配置</span></a></h3>
<table>
<thead>
<tr>
<th>参数</th>
<th>规范要求</th>
<th>推荐值（通用）</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>model</code></td>
<td>明确指定，避免模糊匹配</td>
<td>gpt-3.5-turbo/qwen-max</td>
</tr>
<tr>
<td><code v-pre>temperature</code></td>
<td>按场景固定：精准任务（0<sub>0.3）、创意任务（0.7</sub>1.2）、禁止动态调整</td>
<td>0.3（通用）/0.7（创意）</td>
</tr>
<tr>
<td><code v-pre>max_tokens</code></td>
<td>按场景限制（如客服问答≤500，长文本生成≤2000），避免无限制消耗 Token</td>
<td>500~1000</td>
</tr>
<tr>
<td><code v-pre>top_p</code></td>
<td>与 <code v-pre>temperature</code> 二选一，固定值（如 0.9），避免同时调整导致结果不可控</td>
<td>0.9</td>
</tr>
<tr>
<td><code v-pre>stop</code></td>
<td>定义终止符（如 <code v-pre>[&quot;\\n&quot;, &quot;###&quot;]</code>），防止生成无关内容</td>
<td>按需配置</td>
</tr>
</tbody>
</table>
<h3 id="_3-输入输出规范" tabindex="-1"><a class="header-anchor" href="#_3-输入输出规范"><span>3. 输入输出规范</span></a></h3>
<h4 id="输入-prompt-规范" tabindex="-1"><a class="header-anchor" href="#输入-prompt-规范"><span>输入（Prompt）规范</span></a></h4>
<ul>
<li><strong>结构化 Prompt</strong>：统一使用「系统指令 + 用户输入」格式，避免杂乱的自然语言拼接：</li>
</ul>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">messages </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    {</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"role"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"system"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"content"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"你是合规客服，仅回答订单相关问题，拒绝无关请求"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">},</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    {</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"role"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"user"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"content"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: user_input}</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>输入长度限制</strong>：严格控制单轮输入 Token 数（如 GPT-3.5 单轮≤4096），超长内容需分段/摘要后传入。</li>
<li><strong>输入清洗</strong>：过滤敏感字符（如 <code v-pre>\\n\\n</code> 重复换行、特殊符号）、恶意输入（如 Prompt 注入）。</li>
</ul>
<h4 id="输出规范" tabindex="-1"><a class="header-anchor" href="#输出规范"><span>输出规范</span></a></h4>
<ul>
<li><strong>格式约束</strong>：要求模型输出结构化内容（JSON/XML/固定模板），便于解析：</li>
</ul>
<blockquote>
<p>系统指令：&quot;你的回答必须以 JSON 格式返回，包含 <code v-pre>code</code>（状态码）、<code v-pre>content</code>（内容）、<code v-pre>reason</code>（原因）字段&quot;</p>
</blockquote>
<ul>
<li><strong>输出校验</strong>：对模型返回结果做格式校验（如 JSON 解析、字段检查），异常时重试或降级。</li>
</ul>
<hr>
<h2 id="二、接口调用规范-技术层面" tabindex="-1"><a class="header-anchor" href="#二、接口调用规范-技术层面"><span>二、接口调用规范（技术层面）</span></a></h2>
<h3 id="_1-调用方式规范" tabindex="-1"><a class="header-anchor" href="#_1-调用方式规范"><span>1. 调用方式规范</span></a></h3>
<ul>
<li>
<p><strong>优先使用官方 SDK</strong>：如 OpenAI <code v-pre>openai</code>、阿里云 <code v-pre>dashscope</code>、Google <code v-pre>vertexai</code>，避免直接调用 HTTP API（SDK 内置重试、鉴权、格式校验）。</p>
</li>
<li>
<p><strong>异步 vs 同步</strong>：</p>
</li>
<li>
<p>短文本交互（≤10 秒）：用同步调用；</p>
</li>
<li>
<p>长任务（如文档生成、数据分析）：用异步调用（如 OpenAI <code v-pre>stream=True</code>、阿里云 <code v-pre>async_call</code>），避免阻塞。</p>
</li>
<li>
<p><strong>流式调用规范</strong>：流式返回时需处理断流、乱序问题，逐段拼接结果，设置超时时间。</p>
</li>
</ul>
<h3 id="_2-鉴权与密钥管理规范" tabindex="-1"><a class="header-anchor" href="#_2-鉴权与密钥管理规范"><span>2. 鉴权与密钥管理规范</span></a></h3>
<ul>
<li><strong>密钥不硬编码</strong>：禁止将 API Key/AccessKey 写死在代码中，通过环境变量/配置中心/密钥管理服务（如阿里云 KMS、AWS KMS）存储：</li>
</ul>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 正确方式</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> openai </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> OpenAI</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">client </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF"> OpenAI</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">api_key</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">os.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">getenv</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"OPENAI_API_KEY"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">))  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 从环境变量读取</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>密钥权限最小化</strong>：创建专用子账号，仅授予「模型调用」权限，禁止管理员权限。</li>
<li><strong>密钥轮换</strong>：定期（如 90 天）轮换密钥，泄露后立即禁用。</li>
</ul>
<h3 id="_3-异常处理规范-核心" tabindex="-1"><a class="header-anchor" href="#_3-异常处理规范-核心"><span>3. 异常处理规范（核心）</span></a></h3>
<p>生产环境必须覆盖以下异常类型，并制定重试/降级策略：</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> time</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> openai </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> APIError, RateLimitError, APIConnectionError</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">def</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> call_llm_safely</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic">messages</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">):</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    max_retries </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 3</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">  # 最大重试次数</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    retry_delay </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">  # 重试间隔（秒）</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> attempt </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">in</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> range</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(max_retries):</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        try</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">            response </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> client.chat.completions.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">create</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">                model</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"gpt-3.5-turbo"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">                messages</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">messages,</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">                timeout</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">10</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">  # 超时时间（秒）</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">            )</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">            return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> response.choices[</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">].message.content</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        # 1. 限流异常：等待后重试（遵守平台限流规则）</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        except</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> RateLimitError </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">as</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> e:</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">            print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">f</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"限流：</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">{</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">e</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">，等待 </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">{</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">retry_delay</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">*</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(attempt</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">+</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 秒"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">            time.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">sleep</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(retry_delay</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">*</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(attempt</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">+</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">))  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 指数退避</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        # 2. 连接异常：重试</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        except</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> APIConnectionError </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">as</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> e:</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">            print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">f</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"连接失败：</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">{</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">e</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">，第 </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">{</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">attempt</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">+</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 次重试"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">            time.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">sleep</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(retry_delay)</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        # 3. 其他 API 异常：重试</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        except</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> APIError </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">as</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> e:</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">            print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">f</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"API 错误：</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">{</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">e</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">，第 </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">{</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">attempt</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">+</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 次重试"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">            time.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">sleep</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(retry_delay)</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        # 4. 最终失败：降级处理</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> attempt </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">==</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> max_retries </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">            return</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "抱歉，服务暂时不可用"</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">  # 降级返回</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>异常类型与处理策略</strong>：</p>
<table>
<thead>
<tr>
<th>异常类型</th>
<th>处理策略</th>
</tr>
</thead>
<tbody>
<tr>
<td>限流（RateLimit）</td>
<td>指数退避重试（如 1s→2s→4s）、扩容 API Key</td>
</tr>
<tr>
<td>连接超时</td>
<td>重试 + 缩短超时时间</td>
</tr>
<tr>
<td>模型不可用</td>
<td>降级到备用模型（如 gpt-4o → gpt-3.5）</td>
</tr>
<tr>
<td>权限错误</td>
<td>告警 + 人工介入</td>
</tr>
</tbody>
</table>
<h3 id="_4-日志与监控规范" tabindex="-1"><a class="header-anchor" href="#_4-日志与监控规范"><span>4. 日志与监控规范</span></a></h3>
<ul>
<li>
<p><strong>必打日志字段</strong>：</p>
</li>
<li>
<p>调用维度：<code v-pre>request_id</code>（请求ID）、<code v-pre>model</code>、<code v-pre>tokens_used</code>（消耗Token）、<code v-pre>cost</code>（成本）、<code v-pre>duration</code>（耗时）；</p>
</li>
<li>
<p>业务维度：<code v-pre>user_id</code>（用户ID）、<code v-pre>prompt</code>（脱敏后）、<code v-pre>response</code>（脱敏后）、<code v-pre>error_msg</code>（异常信息）。</p>
</li>
<li>
<p><strong>监控指标</strong>：</p>
</li>
<li>
<p>核心指标：调用成功率（≥99.9%）、平均耗时（≤5s）、Token 消耗、限流次数；</p>
</li>
<li>
<p>告警阈值：成功率＜99%、耗时＞10s、异常率＞1% 触发告警。</p>
</li>
</ul>
<hr>
<h2 id="三、安全与合规规范-企业级核心" tabindex="-1"><a class="header-anchor" href="#三、安全与合规规范-企业级核心"><span>三、安全与合规规范（企业级核心）</span></a></h2>
<h3 id="_1-数据合规" tabindex="-1"><a class="header-anchor" href="#_1-数据合规"><span>1. 数据合规</span></a></h3>
<ul>
<li><strong>数据脱敏</strong>：用户输入/模型输出中的敏感信息（手机号、身份证、银行卡）必须脱敏（如 <code v-pre>138****1234</code>），禁止明文存储。</li>
<li><strong>数据留存</strong>：遵循「最小留存」原则，仅留存必要的调用日志，且留存时间符合法规（如 GDPR/《个人信息保护法》）。</li>
<li><strong>数据传输</strong>：调用接口时使用 HTTPS 协议，禁止明文传输。</li>
</ul>
<h3 id="_2-内容合规" tabindex="-1"><a class="header-anchor" href="#_2-内容合规"><span>2. 内容合规</span></a></h3>
<ul>
<li><strong>输入过滤</strong>：禁止调用模型处理违法、违规内容（如暴力、色情、政治敏感），接入内容审核接口（如阿里云内容安全、腾讯云内容审核）前置过滤。</li>
<li><strong>输出审核</strong>：模型返回结果需经过内容审核，违规内容直接拦截，禁止返回给用户。</li>
<li><strong>功能限制</strong>：禁止利用大模型生成恶意代码、虚假信息、侵权内容，明确模型使用场景边界。</li>
</ul>
<h3 id="_3-隐私保护" tabindex="-1"><a class="header-anchor" href="#_3-隐私保护"><span>3. 隐私保护</span></a></h3>
<ul>
<li><strong>禁止传敏感数据</strong>：除非获得用户授权，否则禁止将用户隐私数据（如医疗记录、财务数据）传入大模型。</li>
<li><strong>私有化部署</strong>：核心业务/高敏感场景，优先使用私有化部署的大模型（如通义千问私有化、GPT-4 企业私有化），避免数据上云。</li>
</ul>
<hr>
<h2 id="四、性能与成本优化规范" tabindex="-1"><a class="header-anchor" href="#四、性能与成本优化规范"><span>四、性能与成本优化规范</span></a></h2>
<h3 id="_1-成本控制" tabindex="-1"><a class="header-anchor" href="#_1-成本控制"><span>1. 成本控制</span></a></h3>
<ul>
<li>
<p><strong>Token 管控</strong>：</p>
</li>
<li>
<p>限制单用户/单会话的 Token 消耗（如单用户每日≤10万 Token）；</p>
</li>
<li>
<p>长文本交互时，仅传入上下文的关键部分（如最近3轮对话），而非全部历史。</p>
</li>
<li>
<p><strong>模型选择</strong>：非核心场景用低成本模型（如 gpt-3.5-turbo、qwen-turbo），核心场景才用高端模型（gpt-4o、qwen-max）。</p>
</li>
<li>
<p><strong>缓存策略</strong>：对高频、重复的查询（如常见问题）缓存模型回复，避免重复调用（缓存 Key 建议：MD5(标准化 Prompt)）。</p>
</li>
</ul>
<h3 id="_2-性能优化" tabindex="-1"><a class="header-anchor" href="#_2-性能优化"><span>2. 性能优化</span></a></h3>
<ul>
<li><strong>批量调用</strong>：支持批量处理的场景（如文本嵌入），批量传入数据（如一次传入10条文本），减少接口调用次数。</li>
<li><strong>就近调用</strong>：选择离业务服务器最近的接口地域（如阿里云选 cn-hangzhou、OpenAI 选 us-east-1），降低网络延迟。</li>
<li><strong>并发控制</strong>：避免高并发下瞬时大量调用导致限流，设置并发数上限（如每秒≤100次调用）。</li>
</ul>
<hr>
<h2 id="五、function-calling-专项规范" tabindex="-1"><a class="header-anchor" href="#五、function-calling-专项规范"><span>五、Function Calling 专项规范</span></a></h2>
<p>若涉及工具调用（ReAct 智能体），需额外遵守：</p>
<ol>
<li><strong>工具描述标准化</strong>：严格按照 JSON Schema 定义工具名称、参数、描述，避免模糊表述（如“城市”需明确“中文全称，如北京市”）。</li>
<li><strong>工具调用校验</strong>：模型调用工具前，校验参数合法性（如城市名是否存在、数值是否合理），避免无效调用。</li>
<li><strong>工具权限隔离</strong>：不同工具（如查订单、查物流）绑定不同的权限，禁止一个工具调用接口拥有所有业务权限。</li>
</ol>
<hr>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2>
<ol>
<li><strong>核心准则</strong>：调用规范的核心是「标准化（参数/格式）+ 稳定性（异常/重试）+ 合规性（数据/内容）+ 经济性（成本/Token）」。</li>
<li><strong>落地关键</strong>：优先使用官方 SDK、做好异常重试与降级、严格管控密钥与敏感数据、监控核心指标。</li>
<li><strong>企业级重点</strong>：内容审核、数据脱敏、隐私保护是合规底线，成本控制与性能优化是落地关键。</li>
</ol>
<p>遵循以上规范，可大幅降低大模型调用的故障率、合规风险和成本，是从“测试级调用”走向“生产级应用”的必经之路。如果需要针对某一平台（如阿里云/OpenAI）制定专属的调用规范模板，我可以提供可直接落地的文档/代码示例。</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};