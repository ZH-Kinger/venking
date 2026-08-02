import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/AI_infra/B300%E6%B5%8B%E8%AF%95%E4%B8%8E%E4%BC%98%E5%8C%96/%E8%AE%AD%E7%BB%83%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E5%8F%82%E6%95%B0/%E8%AE%AD%E7%BB%83%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E5%8F%82%E6%95%B0.html","title":"训练中的一些参数","lang":"zh-CN","frontmatter":{"title":"训练中的一些参数","icon":"cpu","date":"2026-07-23T00:00:00.000Z","category":["AI基础设施"],"description":"在大模型和深度学习训练的控制面板上，这五个词是出现频率最高的核心物理量指标。它们共同组成了监控模型是否在“好好学习”的仪表盘。 为了让你闭眼都能理清它们的关系，我们可以把大模型训练直接比作“一位高考生（模型）刷一本厚达 10 万道题的巨型复习题集（数据集）”： 1. Epoch (轮次 / 彻底刷完一遍题集) 物理含义：模型把训练集里所有的样本全部完整...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"训练中的一些参数\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/AI_infra/B300%E6%B5%8B%E8%AF%95%E4%B8%8E%E4%BC%98%E5%8C%96/%E8%AE%AD%E7%BB%83%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E5%8F%82%E6%95%B0/%E8%AE%AD%E7%BB%83%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E5%8F%82%E6%95%B0.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"训练中的一些参数"}],["meta",{"property":"og:description","content":"在大模型和深度学习训练的控制面板上，这五个词是出现频率最高的核心物理量指标。它们共同组成了监控模型是否在“好好学习”的仪表盘。 为了让你闭眼都能理清它们的关系，我们可以把大模型训练直接比作“一位高考生（模型）刷一本厚达 10 万道题的巨型复习题集（数据集）”： 1. Epoch (轮次 / 彻底刷完一遍题集) 物理含义：模型把训练集里所有的样本全部完整..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.56,"words":1067},"filePathRelative":"posts/AI基础设施/学习计划/AI_infra/B300测试与优化/训练中的一些参数/训练中的一些参数.md","excerpt":"<p>在大模型和深度学习训练的控制面板上，这五个词是出现频率最高的<strong>核心物理量指标</strong>。它们共同组成了监控模型是否在“好好学习”的仪表盘。</p>\\n<p>为了让你闭眼都能理清它们的关系，我们可以把<strong>大模型训练</strong>直接比作“一位高考生（模型）刷一本厚达 10 万道题的巨型复习题集（数据集）”：</p>\\n<hr>\\n<h3>1. Epoch (轮次 / 彻底刷完一遍题集)</h3>\\n<ul>\\n<li><strong>物理含义</strong>：模型把训练集里<strong>所有的样本全部完整地看了一遍（前向传播 + 反向传播更新）</strong>，这就叫完成了一个 Epoch。</li>\\n<li><strong>高考比喻</strong>：高考生把这本 10 万道题的巨型复习题集，<strong>从第一页完整地刷到了最后一页</strong>。如果训练配置 <code>epochs = 3</code>，意味着这个学生要把这本题集来来回回死磕刷 3 遍。</li>\\n</ul>","autoDesc":true}`),i={name:`训练中的一些参数.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在大模型和深度学习训练的控制面板上，这五个词是出现频率最高的<strong>核心物理量指标</strong>。它们共同组成了监控模型是否在“好好学习”的仪表盘。</p>
<p>为了让你闭眼都能理清它们的关系，我们可以把<strong>大模型训练</strong>直接比作“一位高考生（模型）刷一本厚达 10 万道题的巨型复习题集（数据集）”：</p>
<hr>
<h3 id="_1-epoch-轮次-彻底刷完一遍题集" tabindex="-1"><a class="header-anchor" href="#_1-epoch-轮次-彻底刷完一遍题集"><span>1. Epoch (轮次 / 彻底刷完一遍题集)</span></a></h3>
<ul>
<li><strong>物理含义</strong>：模型把训练集里<strong>所有的样本全部完整地看了一遍（前向传播 + 反向传播更新）</strong>，这就叫完成了一个 Epoch。</li>
<li><strong>高考比喻</strong>：高考生把这本 10 万道题的巨型复习题集，<strong>从第一页完整地刷到了最后一页</strong>。如果训练配置 <code v-pre>epochs = 3</code>，意味着这个学生要把这本题集来来回回死磕刷 3 遍。</li>
</ul>
<h3 id="_2-step-步数-迭代轮次-挪动一次参数" tabindex="-1"><a class="header-anchor" href="#_2-step-步数-迭代轮次-挪动一次参数"><span>2. Step (步数 / 迭代轮次 / 挪动一次参数)</span></a></h3>
<ul>
<li><strong>物理含义</strong>：训练过程中<strong>参数物理更新（优化器迈出一步）的最基本工程单元</strong>。每吃完一个 Batch Size（批次）的数据，并完成一次梯度更新，Step 计数器就 $+1$。</li>
<li><strong>高考比喻</strong>：学生不可能一口气吞掉整本书，他必须一页一页地刷。假设他每天看 100 道题（Batch Size = 100），看完这 100 道题并对答案纠错一次，这就叫完成了一个 <strong>Step</strong>。刷完这本 10 万道题的 Epoch，他一共需要走 $100,000 / 100 = 1000$ 个 Steps。</li>
</ul>
<h3 id="_3-action-动作-大模型作出的预测输出" tabindex="-1"><a class="header-anchor" href="#_3-action-动作-大模型作出的预测输出"><span>3. Action (动作 / 大模型作出的预测输出)</span></a></h3>
<ul>
<li><strong>物理含义</strong>：在上文我们讨论的 <strong>Agent / 强化学习（RLHF / PPO）</strong> 语境下，Action 是大模型基于当前环境输入，<strong>自主作出的决策或吐出的文本/参数 Token</strong>。</li>
<li><strong>高考比喻</strong>：这就是学生针对当前这道题目，<strong>在答题纸上写下的具体答案</strong>。这个答案（Action）对不对，后续会被交给物理外设去执行（或者交给判卷老师打分），产生环境反馈。</li>
</ul>
<h3 id="_4-loss-损失值-错误率的物理量化" tabindex="-1"><a class="header-anchor" href="#_4-loss-损失值-错误率的物理量化"><span>4. Loss (损失值 / 错误率的物理量化)</span></a></h3>
<ul>
<li><strong>物理含义</strong>：一个数学标量，用来绝对量化<strong>模型当前的预测输出（Action）与真实正确答案（Label）之间的“惨烈差距”</strong>。Loss 越接近 0，说明模型越聪明、学得越准。</li>
<li><strong>高考比喻</strong>：就是<strong>对答案时扣掉的分数</strong>。如果学生把题做错了，判卷老师会给出很高的扣分（High Loss）；随着小伙子越刷越熟练，做错的题越来越少，每次对答案被扣的分数（Loss 曲线）就会一路稳健下滑。</li>
</ul>
<h3 id="_5-lr-learning-rate-学习率-修正错误的步长" tabindex="-1"><a class="header-anchor" href="#_5-lr-learning-rate-学习率-修正错误的步长"><span>5. Lr (Learning Rate - 学习率 / 修正错误的步长)</span></a></h3>
<ul>
<li><strong>物理含义</strong>：控制模型在根据错误（Loss）调整自身参数时，<strong>迈出的步子到底有多大</strong>。它是一个通常介于 $10^{-3}$ 到 $10^{-6}$ 之间的微小系数。</li>
<li><strong>高考比喻</strong>：就是<strong>这个学生根据错题“修正自己固有观念的激进程度”</strong>：</li>
<li><strong>Lr 太大（步子扯太大）</strong>：看了一眼错题解析，当场把自己的整个知识体系全部推翻重来。结果导致思想极度不稳定，考试直接跑飞崩溃（在代码里表现为 Loss 变成 <code v-pre>NaN</code>）。</li>
<li><strong>Lr 太小（唯唯诺诺）</strong>：看到了错题，却只打算把概念极其微弱地改个标点符号。这会导致他学得巨慢无比（系统收敛极慢），显卡烧了半个月，他还没开窍。</li>
</ul>
<hr>
<h3 id="⚙️-仪表盘联动总结" tabindex="-1"><a class="header-anchor" href="#⚙️-仪表盘联动总结"><span>⚙️ 仪表盘联动总结：</span></a></h3>
<p>我们在监控大模型训练时，脑子里跑的物理画面是这样的：</p>
<p>在这个 <strong>Epoch（刷第几遍书）</strong> 里，显卡以每秒几十个 <strong>Step（每秒对几次答案）</strong> 的速度狂飙。大模型每走一步，就吐出一个 <strong>Action（作出一场预测）</strong>，系统立刻计算出 <strong>Loss（被扣了多少分）</strong>。随后，优化器高频参考 <strong>Lr（设定的修正步长）</strong>，顺着梯度的反方向物理挪动模型的参数，直到 <strong>Loss 曲线被压成一条贴近地面的平线</strong>——大模型，宣告神功大成。</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};