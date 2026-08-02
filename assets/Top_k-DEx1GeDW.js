import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/Top_k.html","title":"Top_k","lang":"zh-CN","frontmatter":{"title":"Top_k","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"在大模型（LLM）推理与文本生成中，top_k 是一个核心的采样截断超参数。 它的物理任务是在模型输出下一个 Token 的概率分布时，强行锁死候选池的最大数量，直接切断长尾的低概率词，从而控制模型回答的创造力与胡说八道的边界。 一、 它的物理本质是什么？ 大模型生成文本时，本质上是在做“完形填空”。模型在前向传播的最后一层（Softmax）会吐出对全...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Top_k\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/Top_k.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"Top_k"}],["meta",{"property":"og:description","content":"在大模型（LLM）推理与文本生成中，top_k 是一个核心的采样截断超参数。 它的物理任务是在模型输出下一个 Token 的概率分布时，强行锁死候选池的最大数量，直接切断长尾的低概率词，从而控制模型回答的创造力与胡说八道的边界。 一、 它的物理本质是什么？ 大模型生成文本时，本质上是在做“完形填空”。模型在前向传播的最后一层（Softmax）会吐出对全..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":4.27,"words":1281},"filePathRelative":"posts/AI大模型/Agent应用开发/第三阶段_拥抱生态与框架_(工程化)/Top_k.md","excerpt":"<p>在大模型（LLM）推理与文本生成中，<strong>top_k</strong> 是一个核心的<strong>采样截断超参数</strong>。</p>\\n<p>它的物理任务是在模型输出下一个 Token 的概率分布时，<strong>强行锁死候选池的最大数量，直接切断长尾的低概率词，从而控制模型回答的创造力与胡说八道的边界。</strong></p>\\n<hr>\\n<h3>一、 它的物理本质是什么？</h3>\\n<p>大模型生成文本时，本质上是在做“完形填空”。模型在前向传播的最后一层（Softmax）会吐出对全量词表（Vocabulary，通常有几万到十几万个词）的概率预测。</p>\\n<p>如果不加限制地直接采样，模型很容易抽中那些概率极低但非零的“离谱词”，导致胡言乱语。</p>","autoDesc":true}`),i={name:`Top_k.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在大模型（LLM）推理与文本生成中，<strong>top_k</strong> 是一个核心的<strong>采样截断超参数</strong>。</p>
<p>它的物理任务是在模型输出下一个 Token 的概率分布时，<strong>强行锁死候选池的最大数量，直接切断长尾的低概率词，从而控制模型回答的创造力与胡说八道的边界。</strong></p>
<hr>
<h3 id="一、-它的物理本质是什么" tabindex="-1"><a class="header-anchor" href="#一、-它的物理本质是什么"><span>一、 它的物理本质是什么？</span></a></h3>
<p>大模型生成文本时，本质上是在做“完形填空”。模型在前向传播的最后一层（Softmax）会吐出对全量词表（Vocabulary，通常有几万到十几万个词）的概率预测。</p>
<p>如果不加限制地直接采样，模型很容易抽中那些概率极低但非零的“离谱词”，导致胡言乱语。</p>
<ul>
<li><strong>物理规则</strong>：<code v-pre>top_k</code> 规定，模型<strong>只保留概率最高的前</strong> $k$ <strong>个 Token</strong> 作为候选池，其余的所有词当场物理降级，概率直接抹成 0。</li>
<li><strong>举个例子</strong>：假设输入 <code v-pre>“今天天气真...”</code>，模型预测接下来的词概率排序为：<code v-pre>[好的: 40%, 晴朗: 30%, 糟糕: 15%, 菠萝: 0.1%, 编程: 0.05% ...]</code></li>
<li>如果设置 <code v-pre>top_k = 3</code>：候选池被强行锁定为 <code v-pre>[好的, 晴朗, 糟糕]</code>。模型会重新对这三个词的概率进行归一化（使它们相加等于 100%），然后从中随机抽一个。像“菠萝”这种词是绝对不可能被选中的。</li>
<li>如果设置 <code v-pre>top_k = 1</code>：等同于 <strong>Greedy Search（贪婪搜索）</strong>。模型没有任何随机性，每次永远只吐出概率最高的那一个词（即“好的”），模型的回答会变成 100% 确定性的。</li>
</ul>
<hr>
<h3 id="二、-top-k-与其他采样参数的联动生态" tabindex="-1"><a class="header-anchor" href="#二、-top-k-与其他采样参数的联动生态"><span>二、 top_k 与其他采样参数的联动生态</span></a></h3>
<p>在工业界（如调用 MaaS API 或是配置 vLLM 推理后端），<code v-pre>top_k</code> 很少单兵作战，它通常与 <strong>Temperature（温度）</strong> 以及 <strong>top_p（核采样）</strong> 组合成一条流式漏斗防线：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span> [ 原始的数十万全量词表概率分布 ] </span></span>
<span class="line"><span>               │</span></span>
<span class="line"><span>               ▼</span></span>
<span class="line"><span>   🌡️【 1. Temperature 调节 】 ─── 改变概率分布的平坦度。温度高则抹平差距（更随机），温度低则强者更强。</span></span>
<span class="line"><span>               │</span></span>
<span class="line"><span>               ▼</span></span>
<span class="line"><span>   ⚙️【 2. top_k 截断 】 ──────── 粗暴砍掉排名在 $k$ 之后的长尾词，给候选池划定一个“硬上限”。</span></span>
<span class="line"><span>               │</span></span>
<span class="line"><span>               ▼</span></span>
<span class="line"><span>   ⚙️【 3. top_p 过滤 】 ──────── 在剩下的词里，从上往下累加概率，直到累加值达到 $p$（如90%）时斩断。</span></span>
<span class="line"><span>               │</span></span>
<span class="line"><span>               ▼</span></span>
<span class="line"><span> [ 最终仅存的极少数Token ] ─────── 摇号随机抽取，吐出最终的字符。</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h3 id="三、-top-k-的工业调优指南-tuning-strategy" tabindex="-1"><a class="header-anchor" href="#三、-top-k-的工业调优指南-tuning-strategy"><span>三、 top_k 的工业调优指南（Tuning Strategy）</span></a></h3>
<p>调优 <code v-pre>top_k</code> 的核心思维模型是：<strong>在“确定性/准确性”与“多样性/创造力”之间寻找物理平衡。</strong></p>
<p>我们可以根据具体的业务场景和下游任务进行精细化对齐：</p>
<h4 id="_1-业务场景对齐矩阵" tabindex="-1"><a class="header-anchor" href="#_1-业务场景对齐矩阵"><span>1. 业务场景对齐矩阵</span></a></h4>
<table>
<thead>
<tr>
<th>业务场景</th>
<th>调优目标</th>
<th>推荐配置参考</th>
<th>调优逻辑</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>代码生成 / SQL 编写</strong></td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<p><strong>数学推导 / 结构化 ETL</strong> | <strong>绝对的精准与严谨</strong> | <code v-pre>top_k = 1</code> 到 <code v-pre>5</code></p>
<p>(配合 <code v-pre>temp = 0.0</code>) | 这类任务有唯一的客观真理。我们不需要大模型发挥想象力，必须物理锁死最头部的高概率词，彻底杜绝语法错误和幻觉。 |<br>
| <strong>企业知识库 RAG / 客服</strong></p>
<p><strong>合同分析 / 事实问答</strong> | <strong>高事实准确，允许语气自然</strong> | <code v-pre>top_k = 10</code> 到 <code v-pre>20</code></p>
<p>(配合 <code v-pre>top_p = 0.75</code>) | 需要严格基于参考文档回答，候选池不能开得太大。保留 10-20 个高频词既能保证事实不出错，又能让话术不那么机械死板。 |<br>
| <strong>营销文案创作 / 故事续写</strong></p>
<p><strong>角色扮演 (Roleplay)</strong> | <strong>极致的创造力与文采</strong> | <code v-pre>top_k = 40</code> 到 <code v-pre>80</code></p>
<p>(配合 <code v-pre>temp = 0.85</code>) | 需要打破常规的“套话”。将 $k$ 放大，允许一些低频但有灵气的词（如一些精妙的修辞手法）进入候选池，让生成的文本更有文采和惊喜感。 |</p>
<h4 id="_2-大模型工业界默认的-黄金分割区" tabindex="-1"><a class="header-anchor" href="#_2-大模型工业界默认的-黄金分割区"><span>2. 大模型工业界默认的“黄金分割区”</span></a></h4>
<p>在各大模型厂商的默认配置中，**<code v-pre>top_k = 40</code> 或 <code v-pre>50**</code> 是一个经过全量 Benchmark 跑出来的通用甜点位。因为在人类语言的统计学分布中，前 40-50 个词基本上已经覆盖了当前语境下 95% 以上所有合理的表达方式，再往后的词大概率就是噪声了。</p>
<hr>
<h3 id="四、-避坑的硬核避坑防线" tabindex="-1"><a class="header-anchor" href="#四、-避坑的硬核避坑防线"><span>四、 避坑的硬核避坑防线</span></a></h3>
<ol>
<li><strong>小心设置</strong> <code v-pre>top_k = 0**</code><strong>：<br>
在诸如 vLLM、HuggingFace 或某些开源引擎中，把</strong> <code v-pre>top_k</code> <strong>设为</strong> <code v-pre>0</code> <strong>或</strong> <code v-pre>-1</code> <strong>并不代表只保留 0 个词，而是代表</strong>彻底关闭 top_k 过滤功能**，候选池完全交由 <code v-pre>top_p</code> 去接管。</li>
<li><strong>避免</strong> <code v-pre>top_k</code> <strong>与</strong> <code v-pre>top_p</code> <strong>互相掐架</strong>：<br>
如果你同时把 <code v-pre>top_k</code> 设得非常小（如 <code v-pre>top_k = 2</code>），又把 <code v-pre>top_p</code> 设得挺大（如 <code v-pre>top_p = 0.95</code>），这时候 <code v-pre>top_p</code> 其实已经形同虚设了。因为在 <code v-pre>top_k</code> 粗暴砍完之后，候选池里一共就剩 2 个词了，这两个词的概率再怎么累加也触碰不到 95% 的边界。<strong>最佳实践是：优先用</strong> <code v-pre>top_k</code> <strong>做粗筛（防疯狗），再用</strong> <code v-pre>top_p</code> <strong>随着当前每一步的自信度做自适应精筛。</strong></li>
</ol>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};