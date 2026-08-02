import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/%E8%AE%AD%E7%BB%83%E6%9E%B6%E6%9E%84/Cluster_monitor/LLM%E8%AE%AD%E7%BB%83%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E4%B8%AD%E5%B8%B8%E8%A7%81%E6%8C%87%E6%A0%87/%E6%A8%A1%E5%9E%8B%E7%B2%BE%E5%BA%A6/BF16%E5%92%8CFP16%E7%9A%84%E5%8C%BA%E5%88%AB.html","title":"BF16和FP16的区别","lang":"zh-CN","frontmatter":{"title":"BF16和FP16的区别","icon":"cpu","date":"2026-07-23T00:00:00.000Z","category":["AI基础设施"],"description":"​在 AI Infra 的真实机房里，FP16 和 BF16 简直就是“地狱与天堂”的分界线。 虽然它们俩占用的显存一模一样（都是 2 字节/16 个比特），但英伟达和 Google 对这 16 个P比特的“切分方式”不同，导致了它们在物理命运上的天壤之别。 我们可以用最直观的表格和比喻把它们彻底拆解： 核心物理差异：这 16 个比特是怎么分配的？ 计...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"BF16和FP16的区别\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/%E8%AE%AD%E7%BB%83%E6%9E%B6%E6%9E%84/Cluster_monitor/LLM%E8%AE%AD%E7%BB%83%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E4%B8%AD%E5%B8%B8%E8%A7%81%E6%8C%87%E6%A0%87/%E6%A8%A1%E5%9E%8B%E7%B2%BE%E5%BA%A6/BF16%E5%92%8CFP16%E7%9A%84%E5%8C%BA%E5%88%AB.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"BF16和FP16的区别"}],["meta",{"property":"og:description","content":"​在 AI Infra 的真实机房里，FP16 和 BF16 简直就是“地狱与天堂”的分界线。 虽然它们俩占用的显存一模一样（都是 2 字节/16 个比特），但英伟达和 Google 对这 16 个P比特的“切分方式”不同，导致了它们在物理命运上的天壤之别。 我们可以用最直观的表格和比喻把它们彻底拆解： 核心物理差异：这 16 个比特是怎么分配的？ 计..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.15,"words":945},"filePathRelative":"posts/AI基础设施/学习计划/训练架构/Cluster_monitor/LLM训练生命周期中常见指标/模型精度/BF16和FP16的区别.md","excerpt":"<p>​<strong>在 AI Infra 的真实机房里，FP16 和 BF16 简直就是“地狱与天堂”的分界线。</strong></p>\\n<p>虽然它们俩占用的显存一模一样（都是 <strong>2 字节/16 个比特</strong>），但英伟达和 Google 对这 16 个P比特的“切分方式”不同，导致了它们在物理命运上的天壤之别。</p>\\n<p>我们可以用最直观的表格和比喻把它们彻底拆解：</p>\\n<h3>核心物理差异：这 16 个比特是怎么分配的？</h3>\\n<p>计算机存储小数分为三个部分：<strong>符号位</strong>（管正负）、<strong>指数位</strong>（管数字能表示得多大）、<strong>尾数位</strong>（管小数点后面有多精确）。</p>","autoDesc":true}`),i={name:`BF16和FP16的区别.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>​<strong>在 AI Infra 的真实机房里，FP16 和 BF16 简直就是“地狱与天堂”的分界线。</strong></p>
<p>虽然它们俩占用的显存一模一样（都是 <strong>2 字节/16 个比特</strong>），但英伟达和 Google 对这 16 个P比特的“切分方式”不同，导致了它们在物理命运上的天壤之别。</p>
<p>我们可以用最直观的表格和比喻把它们彻底拆解：</p>
<h3 id="核心物理差异-这-16-个比特是怎么分配的" tabindex="-1"><a class="header-anchor" href="#核心物理差异-这-16-个比特是怎么分配的"><span>核心物理差异：这 16 个比特是怎么分配的？</span></a></h3>
<p>计算机存储小数分为三个部分：<strong>符号位</strong>（管正负）、<strong>指数位</strong>（管数字能表示得多大）、<strong>尾数位</strong>（管小数点后面有多精确）。</p>
<table>
<thead>
<tr>
<th>精度类型</th>
<th>总大小</th>
<th>指数位 (决定范围)</th>
<th>尾数位 (决定精确度)</th>
<th>能表示的最大数字范围</th>
<th>SRE 真实体感</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>FP16</strong></td>
<td>16 Bit</td>
<td><strong>5 位</strong> (太窄)</td>
<td><strong>10 位</strong> (很精细)</td>
<td><strong>±65,504</strong></td>
<td>动不动就溢出崩溃</td>
</tr>
<tr>
<td><strong>BF16</strong></td>
<td>16 Bit</td>
<td><strong>8 位</strong> (极宽)</td>
<td><strong>7 位</strong> (较粗糙)</td>
<td><strong>±3.4 × 10³⁸</strong> (和 FP32 一样大)</td>
<td>稳如老狗，绝不溢出</td>
</tr>
</tbody>
</table>
<hr>
<h3 id="通俗比喻-两把不同的尺子" tabindex="-1"><a class="header-anchor" href="#通俗比喻-两把不同的尺子"><span>通俗比喻：两把不同的尺子</span></a></h3>
<ul>
<li><strong>FP16 就像是一把“极度精密的短游标卡尺”：</strong><br>
它能精确到零点零几毫米（尾数位多），但它整把尺子最多只能量到 <strong>65.5 米</strong>。如果你用它去量一座 100 米的大楼，尺子直接“啪”地一声断了。这就是所谓的 <strong>溢出 (Overflow)</strong>。</li>
<li><strong>BF16 (Brain Floating Point) 就像是一把“粗犷的登月卷尺”：</strong><br>
它能一直拉到月球那么远（指数位多，范围极大），但代价是它的刻度有点粗糙，只能精确到厘米，量不出毫米。</li>
</ul>
<hr>
<h3 id="sre-实战-为什么大模型必须抛弃-fp16-全面拥抱-bf16" tabindex="-1"><a class="header-anchor" href="#sre-实战-为什么大模型必须抛弃-fp16-全面拥抱-bf16"><span>SRE 实战：为什么大模型必须抛弃 FP16，全面拥抱 BF16？</span></a></h3>
<p>在古典深度学习时代（比如训练 ResNet 图像识别），模型很小，大家用的都是 FP16，因为它足够精确。</p>
<p>但到了大语言模型（LLM）时代，几十亿、几百亿参数的矩阵在疯狂相乘，特别是在我们上一节讲的 <strong>Backward Pass（反向传播算梯度）</strong> 的时候，梯度累加起来的数字极其庞大，轻轻松松就会突破 <strong>65,504</strong> 这个微弱的上限。</p>
<h4 id="_1-当你使用-fp16-训练大模型时-噩梦模式" tabindex="-1"><a class="header-anchor" href="#_1-当你使用-fp16-训练大模型时-噩梦模式"><span>1. 当你使用 FP16 训练大模型时（噩梦模式）</span></a></h4>
<p>一旦反向传播时某个梯度算出来是 70,000，超出了 FP16 的上限。</p>
<ul>
<li><strong>物理表现：</strong> 显卡装不下这个数，直接把它变成 <code v-pre>Inf</code><strong>（无穷大）</strong>。</li>
<li><strong>连锁反应：</strong> 任何数乘以无穷大都会变成 <code v-pre>NaN</code><strong>（非数）</strong>。</li>
<li><strong>最终结局：</strong> 你的 Loss 曲线突然变成 <code v-pre>NaN</code>，几百张卡直接白跑，昨天晚上的训练记录全部作废。为了防止这个问题，算法工程师每天都要痛苦地去调 <code v-pre>Loss Scaling</code>（动态缩放参数），心惊胆战。</li>
</ul>
<h4 id="_2-当你使用-bf16-训练大模型时-无脑飞升模式" tabindex="-1"><a class="header-anchor" href="#_2-当你使用-bf16-训练大模型时-无脑飞升模式"><span>2. 当你使用 BF16 训练大模型时（无脑飞升模式）</span></a></h4>
<p>Google 的大脑团队（Google Brain，也是 BF16 名字的由来）发现了一个大模型的底层潜规则：<strong>大模型其实是一个“近视眼”。它根本不在乎小数点后面第五位是几（不需要尾数位精细），但它绝对不能忍受数字装不下（必须保证指数位够大）！</strong></p>
<ul>
<li><strong>物理表现：</strong> BF16 直接从 FP32 那里“抄”来了完整的 8 位指数，让它的范围大到了 $10^{38}$。</li>
<li><strong>最终结局：</strong> 梯度永远不可能溢出。不需要任何复杂的动态缩放，Loss 曲线稳稳当当一路向南。</li>
</ul>
<p><strong>SRE 终极避坑口诀：</strong><br>
<strong>“不管算法团队给的模型叫什么名字，只要你看到启动脚本里写着</strong> <code v-pre>fp16=True</code><strong>，立刻把它改成</strong> <code v-pre>bf16=True</code><strong>。这一个参数，能帮你挡掉线上 90% 莫名其妙的训练崩溃故障。”</strong></p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};