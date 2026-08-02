import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/Top_p.html","title":"Top_p","lang":"zh-CN","frontmatter":{"title":"Top_p","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"在大模型（LLM）文本生成的世界里，top_p（也被称为 核采样，Nucleus Sampling）是另一个极度硬核且现代的采样截断超参数。 如果说 top_k 是不管三七二十一、死板地给候选池规定一个“最大数量上限”，那么 top_p 则是一个能够根据模型当前的“自信程度”，动态缩放候选池大小的“智能过滤器”。 一、 它的物理本质是什么？ top_p...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Top_p\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/Top_p.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"Top_p"}],["meta",{"property":"og:description","content":"在大模型（LLM）文本生成的世界里，top_p（也被称为 核采样，Nucleus Sampling）是另一个极度硬核且现代的采样截断超参数。 如果说 top_k 是不管三七二十一、死板地给候选池规定一个“最大数量上限”，那么 top_p 则是一个能够根据模型当前的“自信程度”，动态缩放候选池大小的“智能过滤器”。 一、 它的物理本质是什么？ top_p..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":4,"words":1200},"filePathRelative":"posts/AI大模型/Agent应用开发/第三阶段_拥抱生态与框架_(工程化)/Top_p.md","excerpt":"<p>在大模型（LLM）文本生成的世界里，<strong>top_p</strong>（也被称为 <strong>核采样，Nucleus Sampling</strong>）是另一个极度硬核且现代的<strong>采样截断超参数</strong>。</p>\\n<p>如果说 <code>top_k</code> 是不管三七二十一、死板地给候选池规定一个“<strong>最大数量上限</strong>”，那么 <code>top_p</code> 则是一个<strong>能够根据模型当前的“自信程度”，动态缩放候选池大小的“智能过滤器”</strong>。</p>\\n<hr>\\n<h3>一、 它的物理本质是什么？</h3>","autoDesc":true}`),i={name:`Top_p.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在大模型（LLM）文本生成的世界里，<strong>top_p</strong>（也被称为 <strong>核采样，Nucleus Sampling</strong>）是另一个极度硬核且现代的<strong>采样截断超参数</strong>。</p>
<p>如果说 <code v-pre>top_k</code> 是不管三七二十一、死板地给候选池规定一个“<strong>最大数量上限</strong>”，那么 <code v-pre>top_p</code> 则是一个<strong>能够根据模型当前的“自信程度”，动态缩放候选池大小的“智能过滤器”</strong>。</p>
<hr>
<h3 id="一、-它的物理本质是什么" tabindex="-1"><a class="header-anchor" href="#一、-它的物理本质是什么"><span>一、 它的物理本质是什么？</span></a></h3>
<p><code v-pre>top_p</code> 的核心思想是：<strong>不看候选词的绝对数量，而是看候选词的“累计概率质量（Cumulative Probability）”。</strong></p>
<ul>
<li><strong>物理规则</strong>：模型在输出下一个 Token 的全量概率分布后，算法会将所有词按照概率从大到小进行降序排列。然后从上往下依次累加这些词的概率，<strong>直到累加值刚刚达到或超过设定的阈值</strong> $p$<strong>（如</strong> $0.90$<strong>）时，强行切断长尾，把剩下的低概率词当场物理抹杀（概率清零）。</strong></li>
</ul>
<h4 id="💡-为什么它比-top-k-更聪明-两幅场景的生动对比" tabindex="-1"><a class="header-anchor" href="#💡-为什么它比-top-k-更聪明-两幅场景的生动对比"><span>💡 为什么它比 top_k 更聪明？（两幅场景的生动对比）</span></a></h4>
<p>假设我们把 <code v-pre>top_p</code> 设为 <code v-pre>0.90</code>（保留前 90% 的概率置信区间）：</p>
<ul>
<li><strong>场景 A（模型极其自信，答案很明显）</strong>：<br>
输入 <code v-pre>“一加一等于...”</code></li>
<li>排序后的概率：<code v-pre>[二: 88%, 两: 4%, 3: 1%, 苹果: 0.1% ...]</code></li>
<li><strong>top_p 执行</strong>：从上往下加，第一个词“二”是 88%，加上第二个词“两”变成 92%，已经超过了 90%。<strong>截断！</strong></li>
<li><strong>结果</strong>：候选池里<strong>只有 2 个词</strong>。因为模型非常笃定，候选池会自动收缩，绝不让杂音（如“3”、“苹果”）混进来。</li>
<li><strong>场景 B（模型很迷茫，答案极其开放）</strong>：<br>
输入 <code v-pre>“在那个风雨交加的夜晚，他缓缓打开了那扇...”</code></li>
<li>排序后的概率：<code v-pre>[门: 15%, 窗: 12%, 灯: 10%, 笔记本: 8%, 箱子: 7% ...]</code></li>
<li><strong>top_p 执行</strong>：因为概率非常平摊，算法必须从上往下一路加：$15% + 12% + 10% + 8% + 7% + \\dots$ 也许要连续加到<strong>前 20 个词</strong>，累计概率才能凑满 90%。</li>
<li><strong>结果</strong>：候选池会自动扩容到 <strong>20 个词</strong>。因为语境很开放，模型需要保留更丰富的可能性来激发创造力。</li>
</ul>
<blockquote>
<p>🛠️ <strong>对比总结：</strong> 如果用死板的 <code v-pre>top_k=5</code>，在场景 A 里它会逼大模型在“二”、“两”之外强行凑 3 个离谱的错词进候选池；在场景 B 里它又会把“箱子”等很有创意的词粗暴砍掉。而 <code v-pre>top_p</code> 完美解决了这个动态宽容度问题。</p>
</blockquote>
<hr>
<h3 id="二、-top-p-的工业调优矩阵与策略" tabindex="-1"><a class="header-anchor" href="#二、-top-p-的工业调优矩阵与策略"><span>二、 top_p 的工业调优矩阵与策略</span></a></h3>
<p>在实际调优大模型（如配置 vLLM 引擎、Ollama 或调用 OpenAI 级别的 MaaS API）时，<code v-pre>top_p</code> 的取值范围通常在 <code v-pre>0.0</code> 到 <code v-pre>1.0</code> 之间：</p>
<table>
<thead>
<tr>
<th>调优目标</th>
<th>top_p 推荐配置</th>
<th>联动配置 (Temperature)</th>
<th>核心调优逻辑</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>严谨与客观</strong></td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<p>(代码、数学、结构化解析) | **<code v-pre>0.1</code> ~ <code v-pre>0.3**</code> | <code v-pre>0.0</code> ~ <code v-pre>0.2</code> | 只在最顶部的极少数核心概率词里抽签，彻底锁死随机性，消灭幻觉，确保语法正确和逻辑严密。 |<br>
| <strong>平衡与日常</strong></p>
<p>(RAG知识库、问答、客服) | **<code v-pre>0.7</code> ~ <code v-pre>0.85**</code> | <code v-pre>0.5</code> ~ <code v-pre>0.7</code> | 工业界最喜欢的甜点位。过滤掉最后 15% 毫无意义的胡言乱语噪声，同时保留前 85% 合理的话术空间，让回答流畅且不呆板。 |<br>
| <strong>创意与发散</strong></p>
<p>(角色扮演、小说續写、灵感扩散) | **<code v-pre>0.9</code> ~ <code v-pre>0.95**</code> | <code v-pre>0.85</code> ~ <code v-pre>0.95</code> | 只要是不太离谱的词（只要在前 95% 的人类语言概率空间内），全部放行进入候选池，极大地激活模型的发散思维和文采。 |<br>
| <strong>关闭核采样</strong> | <code v-pre>1.0</code> | 根据需要调整 | 彻底不做累计概率截断。全量词表能否被抽中完全交由温度（Temperature）来控制。 |</p>
<hr>
<h3 id="三、-避坑指南-top-k-与-top-p-的混战秩序" tabindex="-1"><a class="header-anchor" href="#三、-避坑指南-top-k-与-top-p-的混战秩序"><span>三、 避坑指南：top_k 与 top_p 的混战秩序</span></a></h3>
<p>当你在编写 Agent 框架或配置推理集群时，如果同时开启了 <code v-pre>top_k</code> 和 <code v-pre>top_p</code>，必须知晓它们在底层的<strong>物理级联顺序</strong>：</p>
<ol>
<li>**大模型推理引擎（如 HuggingFace, vLLM）的默认管道顺序是：先做 <code v-pre>top_k</code>，再做 <code v-pre>top_p**</code>。</li>
<li>如果你把 <code v-pre>top_k</code> 设得过小（比如 <code v-pre>top_k = 3</code>），然后把 <code v-pre>top_p</code> 设为 <code v-pre>0.95</code>。此时 <code v-pre>top_p</code> 将<strong>彻底失效</strong>。因为在第一道防线 <code v-pre>top_k</code> 砍完后，候选池里横竖就剩下 3 个词了，这 3 个词的概率加起来可能也就 70%，后续的 <code v-pre>top_p=0.95</code> 永远无法被满足。</li>
<li><strong>最佳实践</strong>：</li>
</ol>
<ul>
<li>如果你想用更现代、更智能的采样逻辑，<strong>建议将</strong> <code v-pre>top_k</code> <strong>设为</strong> <code v-pre>0</code> <strong>或</strong> <code v-pre>-1</code><strong>（即关闭 top_k）</strong>，只精细调节 <code v-pre>top_p</code> 和 <code v-pre>Temperature</code>。</li>
<li>如果你想联合双保险，通常将 <code v-pre>top_k</code> 设为一个较大的安全边界粗筛（如 <code v-pre>top_k = 50</code>），然后用 <code v-pre>top_p</code>（如 <code v-pre>0.9</code>）在 50 个词内部进行精细的动态缩放。</li>
</ul>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};