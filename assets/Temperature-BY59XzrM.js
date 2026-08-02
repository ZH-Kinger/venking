import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/Temperature.html","title":"Temperature","lang":"zh-CN","frontmatter":{"title":"Temperature","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"在大模型（LLM）推理与文本生成中，Temperature（温度） 是控制模型输出“创造力”与“确定性”最核心的概率分布平滑系数。 它的物理任务是在模型即将吐出下一个 Token 之前，直接插手改变全量词表中所有候选词的概率差距。 一、 它的底层数学与物理本质 在神经网络的最后一层（分类层），模型输出的是每个词的原始得分，被称为 Logits。通常，我...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Temperature\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/Temperature.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"Temperature"}],["meta",{"property":"og:description","content":"在大模型（LLM）推理与文本生成中，Temperature（温度） 是控制模型输出“创造力”与“确定性”最核心的概率分布平滑系数。 它的物理任务是在模型即将吐出下一个 Token 之前，直接插手改变全量词表中所有候选词的概率差距。 一、 它的底层数学与物理本质 在神经网络的最后一层（分类层），模型输出的是每个词的原始得分，被称为 Logits。通常，我..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":4.25,"words":1274},"filePathRelative":"posts/AI大模型/Agent应用开发/第三阶段_拥抱生态与框架_(工程化)/Temperature.md","excerpt":"<p>在大模型（LLM）推理与文本生成中，<strong>Temperature（温度）</strong> 是控制模型输出“创造力”<strong>与</strong>“确定性”<strong>最核心的</strong>概率分布平滑系数。</p>\\n<p>它的物理任务是在模型即将吐出下一个 Token 之前，<strong>直接插手改变全量词表中所有候选词的概率差距</strong>。</p>\\n<hr>\\n<h3>一、 它的底层数学与物理本质</h3>\\n<p>在神经网络的最后一层（分类层），模型输出的是每个词的原始得分，被称为 <strong>Logits</strong>。通常，我们需要通过 <strong>Softmax</strong> 函数将这些 Logits 转化为相加等于 100% 的概率分布。</p>","autoDesc":true}`),i={name:`Temperature.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在大模型（LLM）推理与文本生成中，<strong>Temperature（温度）</strong> 是控制模型输出“创造力”<strong>与</strong>“确定性”<strong>最核心的</strong>概率分布平滑系数。</p>
<p>它的物理任务是在模型即将吐出下一个 Token 之前，<strong>直接插手改变全量词表中所有候选词的概率差距</strong>。</p>
<hr>
<h3 id="一、-它的底层数学与物理本质" tabindex="-1"><a class="header-anchor" href="#一、-它的底层数学与物理本质"><span>一、 它的底层数学与物理本质</span></a></h3>
<p>在神经网络的最后一层（分类层），模型输出的是每个词的原始得分，被称为 <strong>Logits</strong>。通常，我们需要通过 <strong>Softmax</strong> 函数将这些 Logits 转化为相加等于 100% 的概率分布。</p>
<p><strong>Temperature (</strong>$T$<strong>) 就是插入到 Softmax 公式分母里的一个调节因子：</strong></p>
<p>$$<br>
\\text{P}(w_i) = \\frac{e^{\\frac{L_i}{T&amp;#125;&amp;#125;}{\\sum_{j} e^{\\frac{L_j}{T&amp;#125;&amp;#125;}<br>
$$</p>
<p><em>(其中</em> $L_i$ <em>是第</em> $i$ <em>个词的原始得分 Logits，</em>$T$ <em>就是温度)</em></p>
<p>通过调节这个分母 $T$，会产生极为硬核的物理数学物理形变：</p>
<h4 id="_1-当温度调低时-t-to-0-强者更强-弱者归零" tabindex="-1"><a class="header-anchor" href="#_1-当温度调低时-t-to-0-强者更强-弱者归零"><span>1. 当温度调低时（$T \\to 0$，强者更强，弱者归零）</span></a></h4>
<ul>
<li><strong>数学变化</strong>：当 $T$ 小于 1 时，原本 Logits 分数最高的那个词，经过指数运算后会膨胀得极其巨大，从而拉大与其他词的绝对差距。</li>
<li><strong>物理结果</strong>：<strong>概率分布变得极其“尖锐（Sharp）”</strong>。原本第一名概率是 50%，第二名是 30%；当温度降到 0.1 时，第一名的概率会被放大到 99.9%，其余词的概率无限趋近于 0。</li>
<li><strong>极致情况（</strong>$T = 0$<strong>）</strong>：等同于<strong>贪婪搜索（Greedy Search）</strong>。完全抹杀随机性，大模型退化为确定性的复读机，同样的 Prompt 无论你测多少次，吐出的答案一字不差。</li>
</ul>
<h4 id="_2-当温度调高时-t-1-劫富济贫-众生平等" tabindex="-1"><a class="header-anchor" href="#_2-当温度调高时-t-1-劫富济贫-众生平等"><span>2. 当温度调高时（$T &gt; 1$，劫富济贫，众生平等）</span></a></h4>
<ul>
<li><strong>数学变化</strong>：当 $T$ 远大于 1 时，分数会被严重稀释（分母变大），导致每个词算出来的指数值变得非常接近，原本的得分差距被强行抹平。</li>
<li><strong>物理结果</strong>：<strong>概率分布变得极其“平坦（Flat/Uniform）”</strong>。原本领先的词失去了绝对优势，原本排名靠后、极其罕见的冷门词（长尾词）的概率被显著抬高。</li>
<li><strong>极致情况（</strong>$T \\to \\infty$<strong>）</strong>：模型将彻底失去逻辑，变成一个纯粹的“随机乱码生成器”，开始胡言乱语、答非所问。</li>
</ul>
<hr>
<h3 id="二、-工业界调优指南" tabindex="-1"><a class="header-anchor" href="#二、-工业界调优指南"><span>二、 工业界调优指南</span></a></h3>
<p>在手写 Agent 或者是配置大模型（MaaS API / vLLM 引擎）时，根据具体任务的属性，温度的调节策略遵循明确的物理对齐准则：</p>
<h4 id="_1-业务场景对齐矩阵" tabindex="-1"><a class="header-anchor" href="#_1-业务场景对齐矩阵"><span>1. 业务场景对齐矩阵</span></a></h4>
<table>
<thead>
<tr>
<th>温度设置区间</th>
<th>代表参数</th>
<th>适用业务场景</th>
<th>调优逻辑</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>冰点（绝对理性）</strong></td>
<td><code v-pre>0.0</code></td>
<td>代码编写、SQL生成、数学推导、数据清洗（ETL提取）、严格结构化 JSON 输出</td>
<td>这类任务不需要大模型发挥任何想象力，差一个字符就是编译错误。必须锁死最高概率，确保输出的绝对稳定和严谨。</td>
</tr>
<tr>
<td><strong>低迷区（稳健克制）</strong></td>
<td>**<code v-pre>0.2</code> ~ <code v-pre>0.5**</code></td>
<td>企业知识库问答（RAG）、公文摘要、事实性客服、合同条款条款检索</td>
<td>任务要求在“基于客观事实”的前提下，语气能够自然流畅。适当给一点点温度让话术不呆板，但绝不允许它瞎编乱造。</td>
</tr>
<tr>
<td><strong>甜点位（标准日常）</strong></td>
<td>**<code v-pre>0.7</code> ~ <code v-pre>0.8**</code></td>
<td>通用聊天（General Chat）、邮件撰写、方案大纲润色、翻译</td>
<td>绝大多数云厂商大模型 API 的<strong>默认推荐温度</strong>。在逻辑条理与语言丰富度之间取得了完美的物理平衡。</td>
</tr>
<tr>
<td><strong>高热区（灵感狂飙）</strong></td>
<td>**<code v-pre>0.9</code> ~ <code v-pre>1.2**</code></td>
<td>广告营销文案头脑风暴、科幻小说续写、游戏 NPC 角色扮演（Roleplay）</td>
<td>此时需要打破陈词滥调（套话）。拔高温度可以让一些极具创意、意想不到的低频词跳进候选池，激发模型的“文采”与发散思维。</td>
</tr>
</tbody>
</table>
<hr>
<h3 id="三、-采样铁三角的流式顺序" tabindex="-1"><a class="header-anchor" href="#三、-采样铁三角的流式顺序"><span>三、 采样铁三角的流式顺序</span></a></h3>
<p>在实际的推理管道中，<strong>Temperature 必须在</strong> <code v-pre>top_k</code> <strong>和</strong> <code v-pre>top_p</code> <strong>之前首先执行。</strong> 它的调优会直接牵一发而动全身：</p>
<ol>
<li><strong>Temperature 负责“改变地形”</strong>：先通过温度拉大或缩小词语之间的概率贫富差距。</li>
<li><code v-pre>top_k</code> <strong>负责“划定边界”</strong>：在改变后的地形上，粗暴砍掉排名靠后的词。</li>
<li><code v-pre>top_p</code> <strong>负责“水位的自适应动态截断”</strong>：从上往下累加概率。</li>
</ol>
<ul>
<li><em>联动陷阱</em>：如果你把温度调得极高（如 <code v-pre>1.5</code>），概率分布被彻底抹平，这时候 <code v-pre>top_p=0.9</code> 组成的候选池会瞬间扩容得极大，包含大量垃圾词；反之，若温度接近 0，<code v-pre>top_p</code> 无论设置多少都会瞬间收拢，因为第一个词的概率就已经顶天了。</li>
</ul>
<p><strong>最佳调优建议</strong>：在微调或调试 Prompt 效果时，<strong>强烈建议每次只微调这三个参数中的一个（优先固定 top_k / top_p 调 Temperature）</strong>，否则多个概率过滤器在底层同时掐架，会导致模型的输出质量变得极难预测。</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};