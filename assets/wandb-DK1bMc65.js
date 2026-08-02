import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/AI_infra/wandb.html","title":"wandb","lang":"zh-CN","frontmatter":{"title":"wandb","icon":"cpu","date":"2026-07-23T00:00:00.000Z","category":["AI基础设施"],"description":"Weights &amp; Biases（简称 W&amp;B 或 WandB） 是一个专门针对机器学习与深度学习开发者的模型训练可视化与实验跟踪工具。 你可以把它理解为机器学习领域的“代码版本控制+运行日志仪表盘”。在训练模型（如神经网络）时，我们通常需要监控大量的参数和指标，WandB 就是为了解决这些痛点而设计的。 它的核心功能主要包括以下几个方...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"wandb\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/AI_infra/wandb.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"wandb"}],["meta",{"property":"og:description","content":"Weights &amp; Biases（简称 W&amp;B 或 WandB） 是一个专门针对机器学习与深度学习开发者的模型训练可视化与实验跟踪工具。 你可以把它理解为机器学习领域的“代码版本控制+运行日志仪表盘”。在训练模型（如神经网络）时，我们通常需要监控大量的参数和指标，WandB 就是为了解决这些痛点而设计的。 它的核心功能主要包括以下几个方..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.48,"words":743},"filePathRelative":"posts/AI基础设施/学习计划/AI_infra/wandb.md","excerpt":"<p><strong>Weights &amp; Biases（简称 W&amp;B 或 WandB）</strong> 是一个专门针对机器学习与深度学习开发者的<strong>模型训练可视化与实验跟踪工具</strong>。</p>\\n<p>你可以把它理解为机器学习领域的“代码版本控制+运行日志仪表盘”。在训练模型（如神经网络）时，我们通常需要监控大量的参数和指标，WandB 就是为了解决这些痛点而设计的。</p>\\n<p>它的核心功能主要包括以下几个方面：</p>\\n<ol>\\n<li><strong>实验跟踪（Dashboard &amp; Metric Tracking）</strong></li>\\n</ol>","autoDesc":true}`),i={name:`wandb.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p><strong>Weights &amp; Biases（简称 W&amp;B 或 WandB）</strong> 是一个专门针对机器学习与深度学习开发者的<strong>模型训练可视化与实验跟踪工具</strong>。</p>
<p>你可以把它理解为机器学习领域的“代码版本控制+运行日志仪表盘”。在训练模型（如神经网络）时，我们通常需要监控大量的参数和指标，WandB 就是为了解决这些痛点而设计的。</p>
<p>它的核心功能主要包括以下几个方面：</p>
<ol>
<li><strong>实验跟踪（Dashboard &amp; Metric Tracking）</strong></li>
</ol>
<ul>
<li><strong>功能</strong>：自动记录训练过程中的损失函数（Loss）、准确率（Accuracy）、学习率（Learning Rate）等指标，并实时绘制成可视化图表。</li>
<li><strong>优势</strong>：不需要你手动用 <code v-pre>matplotlib</code> 画图。只要在代码中插入几行 API，训练数据就会实时同步到 WandB 的云端（或本地私有部署的服务器），你可以在浏览器中直观地看到训练趋势。</li>
</ul>
<ol start="2">
<li><strong>超参数调优（Sweeps）</strong></li>
</ol>
<ul>
<li><strong>功能</strong>：自动进行超参数搜索（如网格搜索、随机搜索、贝叶斯优化）。</li>
<li><strong>优势</strong>：你只需要定义好超参数的范围，WandB 就会自动并发启动多个训练任务，并在后台帮你对比哪组超参数的效果最好。</li>
</ul>
<ol start="3">
<li><strong>模型与数据集版本控制（Artifacts）</strong></li>
</ol>
<ul>
<li><strong>功能</strong>：对训练数据集、验证集以及训练出来的模型权重（Weights）进行版本管理。</li>
<li><strong>优势</strong>：类似于 Git 针对代码，Artifacts 针对的是大文件。它能记录“某次训练用了哪个版本的数据集，产出了哪个版本的模型”，实现完全的可复现性。</li>
</ul>
<ol start="4">
<li><strong>系统监控（System Metrics）</strong></li>
</ol>
<ul>
<li><strong>功能</strong>：自动监控运行训练任务的硬件状态，包括 GPU/CPU 使用率、显存占用、内存占用、系统温度等，帮你排查是否存在显存溢出（OOM）或硬件瓶颈。</li>
</ul>
<ol start="5">
<li><strong>协作与分享（Collaboration）</strong></li>
</ol>
<ul>
<li><strong>功能</strong>：你可以创建团队项目，把实验结果分享给同事或导师。</li>
<li><strong>优势</strong>：支持撰写报告（Reports），直接把动态运行的图表插入到文档中，方便展示和学术交流。</li>
</ul>
<h3 id="核心工作原理" tabindex="-1"><a class="header-anchor" href="#核心工作原理"><span>核心工作原理</span></a></h3>
<p>WandB 的使用非常轻量。在 Python 代码中，你只需要初始化并记录数据：</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> wandb</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 1. 初始化项目</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">wandb.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">init</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">project</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"my-awesome-project"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">config</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"learning_rate"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0.01</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"epochs"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">10</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">})</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 2. 模拟训练循环</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> epoch </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">in</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> range</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">10</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">):</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    loss </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 2</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> **</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> -</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">epoch  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 模拟 loss 变小</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    # 3. 记录指标</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    wandb.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">log</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">({</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"epoch"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: epoch, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"loss"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: loss})</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 4. 结束实验</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">wandb.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">finish</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行这段代码后，命令行会输出一个链接，点击进去就能在网页端看到漂亮的折线图。它目前原生支持 PyTorch、TensorFlow、Keras、Hugging Face (Transformers)、Ultralytics (YOLO) 等几乎所有主流的机器学习框架。</p>
<p>你目前是在进行具体的模型训练实验，还是在技术选型中对比它与 TensorBoard 等工具的区别？</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};