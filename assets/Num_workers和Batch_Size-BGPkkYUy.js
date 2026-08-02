import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/AI_infra/B300%E6%B5%8B%E8%AF%95%E4%B8%8E%E4%BC%98%E5%8C%96/%E8%AE%AD%E7%BB%83%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E5%8F%82%E6%95%B0/Num_workers%E5%92%8CBatch_Size.html","title":"Num_workers和Batch_Size","lang":"zh-CN","frontmatter":{"title":"Num_workers和Batch_Size","icon":"cpu","date":"2026-07-23T00:00:00.000Z","category":["AI基础设施"],"description":"在大模型和深度学习（如 PyTorch）的数据准备与训练流水线中，num_workers 和 bs（Batch Size）共同决定了“数据从硬盘加载到 GPU 显存中，并喂给模型吃”的整条流水线的速度。 这两个参数一个是“运货卡车的数量”，一个是“每辆卡车装载的货物箱数”。 一、 两个核心指标的物理定义 1. bs (Batch Size / 批大小)...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Num_workers和Batch_Size\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/AI_infra/B300%E6%B5%8B%E8%AF%95%E4%B8%8E%E4%BC%98%E5%8C%96/%E8%AE%AD%E7%BB%83%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E5%8F%82%E6%95%B0/Num_workers%E5%92%8CBatch_Size.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"Num_workers和Batch_Size"}],["meta",{"property":"og:description","content":"在大模型和深度学习（如 PyTorch）的数据准备与训练流水线中，num_workers 和 bs（Batch Size）共同决定了“数据从硬盘加载到 GPU 显存中，并喂给模型吃”的整条流水线的速度。 这两个参数一个是“运货卡车的数量”，一个是“每辆卡车装载的货物箱数”。 一、 两个核心指标的物理定义 1. bs (Batch Size / 批大小)..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.66,"words":1098},"filePathRelative":"posts/AI基础设施/学习计划/AI_infra/B300测试与优化/训练中的一些参数/Num_workers和Batch_Size.md","excerpt":"<p>在大模型和深度学习（如 PyTorch）的数据准备与训练流水线中，<code>num_workers</code> <strong>和</strong> <code>bs</code><strong>（Batch Size）共同决定了“数据从硬盘加载到 GPU 显存中，并喂给模型吃”的整条流水线的速度。</strong></p>\\n<p>这两个参数一个是“运货卡车的数量”<strong>，一个是</strong>“每辆卡车装载的货物箱数”。</p>\\n<hr>\\n<h3>一、 两个核心指标的物理定义</h3>\\n<h4>1. <code>bs</code> (Batch Size / 批大小)</h4>","autoDesc":true}`),i={name:`Num_workers和Batch_Size.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在大模型和深度学习（如 PyTorch）的数据准备与训练流水线中，<code v-pre>num_workers</code> <strong>和</strong> <code v-pre>bs</code><strong>（Batch Size）共同决定了“数据从硬盘加载到 GPU 显存中，并喂给模型吃”的整条流水线的速度。</strong></p>
<p>这两个参数一个是“运货卡车的数量”<strong>，一个是</strong>“每辆卡车装载的货物箱数”。</p>
<hr>
<h3 id="一、-两个核心指标的物理定义" tabindex="-1"><a class="header-anchor" href="#一、-两个核心指标的物理定义"><span>一、 两个核心指标的物理定义</span></a></h3>
<h4 id="_1-bs-batch-size-批大小" tabindex="-1"><a class="header-anchor" href="#_1-bs-batch-size-批大小"><span>1. <code v-pre>bs</code> (Batch Size / 批大小)</span></a></h4>
<ul>
<li><strong>物理含义</strong>：模型在每一个训练步（Step）中，<strong>一次性吃进去并处理的样本数量</strong>。</li>
<li><strong>物理比喻</strong>：<strong>“大货车每趟拉的集装箱数量”</strong>。<code v-pre>bs=256</code> 意味着大货车每跑一趟，车上都整整齐齐装了 256 箱货（样本），少一个都不行。</li>
</ul>
<h4 id="_2-num-workers-数据加载线程-进程数" tabindex="-1"><a class="header-anchor" href="#_2-num-workers-数据加载线程-进程数"><span>2. <code v-pre>num_workers</code> (数据加载线程/进程数)</span></a></h4>
<ul>
<li><strong>物理含义</strong>：在 PyTorch 的 <code v-pre>DataLoader</code> 中，用来<strong>从硬盘读取数据、进行数据预处理（如裁剪、旋转、正则化），并拼装成 Batch 喂给 GPU 的子进程数量</strong>。</li>
<li><strong>物理比喻</strong>：<strong>“在仓库里负责搬运、打包和装车的小工（Worker）数量”</strong>。</li>
</ul>
<hr>
<h3 id="二、-它们是如何在后台协同工作的-物理流" tabindex="-1"><a class="header-anchor" href="#二、-它们是如何在后台协同工作的-物理流"><span>二、 它们是如何在后台协同工作的？（物理流）</span></a></h3>
<p>在训练过程中，CPU 负责“数据准备”，GPU 负责“核心计算”。它们构成了一个高频流转的生产线：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span> 【 硬盘 (仓库) 】</span></span>
<span class="line"><span>       │</span></span>
<span class="line"><span>       ▼ (num_workers 决定有多少个搬运工在这里干活)</span></span>
<span class="line"><span>  [ 小工 1 ]  ──┐</span></span>
<span class="line"><span>  [ 小工 2 ]  ──┼─> 【 CPU 内存 (装配车间) 】 ───> 拼装成一个 Batch (容量由 bs 决定)</span></span>
<span class="line"><span>  [ 小工 3 ]  ──┘</span></span>
<span class="line"><span>                       │</span></span>
<span class="line"><span>                       ▼ (数据通过 PCIe 通道拉到显存)</span></span>
<span class="line"><span>                 【 GPU 显存 (生产线) 】 ───> 模型进行 Step 训练</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li><code v-pre>num_workers=0</code>（默认）：<br>
<strong>只有一个光杆司令（主进程）在干活。</strong> 主进程得自己去硬盘里读数据、做预处理、打包成 <code v-pre>bs</code> 大小的包，然后亲自送到 GPU 手里。送完之后，GPU 在计算，主进程只能干等；GPU 算完了，主进程再去仓库搬货。</li>
</ol>
<ul>
<li><em>致命后果</em>：<strong>GPU 长期处于“饥饿”状态</strong>，显力利用率极低（极低的 Samples/s），Step/s 极其缓慢。</li>
</ul>
<ol start="2">
<li><code v-pre>num_workers=4</code>（多小工并行）：<br>
主进程当了包工头。他手下有 4 个小工（4 个独立子进程）。</li>
</ol>
<ul>
<li>小工们在后台<strong>提前</strong>从硬盘里读数据、做预处理，并源源不断地在内存里拼装好下一个 <code v-pre>bs</code>（比如 256 个样本）的货。</li>
<li>GPU 一算完当前这步，主进程立刻把后台已经装配好的新 Batch 扔给 GPU。</li>
<li><em>物理效果</em>：<strong>GPU 零等待，全程满载燃脂，吞吐量暴涨。</strong></li>
</ul>
<hr>
<h3 id="三、-工业界调优-这两个参数该怎么配" tabindex="-1"><a class="header-anchor" href="#三、-工业界调优-这两个参数该怎么配"><span>三、 工业界调优：这两个参数该怎么配？</span></a></h3>
<p>在实际 MLOps 生产中，如果这两个参数配得不合理，系统不是卡死就是崩溃：</p>
<h4 id="_1-num-workers-绝对不是越大越好" tabindex="-1"><a class="header-anchor" href="#_1-num-workers-绝对不是越大越好"><span>1. <code v-pre>num_workers</code> 绝对不是越大越好</span></a></h4>
<ul>
<li><strong>物理代价</strong>：每一个 worker 都是一个独立的 Python 子进程，它们会<strong>物理复制一份数据加载代码并常驻在你的系统内存（RAM）里</strong>。</li>
<li><strong>崩溃报错</strong>：如果你把 <code v-pre>num_workers</code> 设得太大（比如在 16 核 CPU 上强行设了 32），你会遇到极其恶心的 <code v-pre>Shared memory error</code> <strong>(共享内存耗尽)</strong>，或者因为 CPU 频繁在不同进程间切换（上下文切换损耗），导致 <code v-pre>DataLoader</code> 越来越卡，甚至系统直接内存溢出（OOM）崩掉。</li>
<li><strong>黄金公式</strong>：</li>
<li><strong>通用推荐</strong>：$\\text{num_workers} = \\text{当前宿主机 CPU 的物理核心数} \\times 1 \\text{ 或 } 2$。</li>
<li>如果训练集是存在极快 SSD 上的小图片，可以配高一点（如 4 或 8）；如果是很大的 3D 医疗影像或重型视频，应该调低，防止撑爆物理内存。</li>
</ul>
<h4 id="_2-bs-与-num-workers-的动态配比关系" tabindex="-1"><a class="header-anchor" href="#_2-bs-与-num-workers-的动态配比关系"><span>2. <code v-pre>bs</code> 与 <code v-pre>num_workers</code> 的动态配比关系</span></a></h4>
<ul>
<li><strong>如果你调大了</strong> <code v-pre>bs</code><strong>（如 256</strong> $\\rightarrow$ <strong>512）</strong>：</li>
<li>因为每一个 Batch 的体积变大了一倍，后台装配车间的工作量变重了。</li>
<li>如果你保持 <code v-pre>num_workers</code> 不变，小工们装配一个 Batch 的时间变长，可能会跟不上 GPU 的计算速度，GPU 重新开始挨饿。</li>
<li><strong>应对手段</strong>：调大 <code v-pre>bs</code> 的同时，通常需要**适当调大 <code v-pre>num_workers**</code>，给后台增加人手，保证装配线的供货速度。</li>
</ul>
<h3 id="💡-架构师调优顺口溜" tabindex="-1"><a class="header-anchor" href="#💡-架构师调优顺口溜"><span>💡 架构师调优顺口溜：</span></a></h3>
<blockquote>
<p><code v-pre>bs</code> <strong>决定 GPU 肚子有多大</strong>：调大它能让显卡干活更饱满，但别撑爆显存（VRAM）。<br>
<code v-pre>num_workers</code> <strong>决定 CPU 送货有多快</strong>：调大它能消除 GPU 挨饿的气泡，但别撑爆物理内存（RAM）。</p>
</blockquote>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};