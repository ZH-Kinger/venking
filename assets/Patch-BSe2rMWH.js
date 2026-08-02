import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/%E5%A4%A7%E6%A8%A1%E5%9E%8B%E6%8A%80%E6%9C%AF/%E8%AF%8D%E5%B5%8C%E5%85%A5/Video_Tokenization/Patch.html","title":"Patch","lang":"zh-CN","frontmatter":{"title":"Patch","icon":"cpu","date":"2026-07-23T00:00:00.000Z","category":["AI基础设施"],"description":"在计算机视觉（CV）和大模型领域中，Patch（图像块 / 视觉块） 是指将一张完整的二维图像物理切碎后，得到的固定大小的局部像素方块。 它是多模态大模型和 Vision Transformer (ViT) 架构的底层通行证。 一、 为什么要引入 Patch？（它干掉了什么痛点） 在传统大语言模型（LLM）中，文字被切成一个个 Token 送入模型进行...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Patch\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/%E5%A4%A7%E6%A8%A1%E5%9E%8B%E6%8A%80%E6%9C%AF/%E8%AF%8D%E5%B5%8C%E5%85%A5/Video_Tokenization/Patch.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"Patch"}],["meta",{"property":"og:description","content":"在计算机视觉（CV）和大模型领域中，Patch（图像块 / 视觉块） 是指将一张完整的二维图像物理切碎后，得到的固定大小的局部像素方块。 它是多模态大模型和 Vision Transformer (ViT) 架构的底层通行证。 一、 为什么要引入 Patch？（它干掉了什么痛点） 在传统大语言模型（LLM）中，文字被切成一个个 Token 送入模型进行..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.05,"words":915},"filePathRelative":"posts/AI基础设施/学习计划/大模型技术/词嵌入/Video_Tokenization/Patch.md","excerpt":"<p>在计算机视觉（CV）和大模型领域中，<strong>Patch（图像块 / 视觉块）</strong> 是指<strong>将一张完整的二维图像物理切碎后，得到的固定大小的局部像素方块</strong>。</p>\\n<p>它是多模态大模型和 Vision Transformer (ViT) 架构的<strong>底层通行证</strong>。</p>\\n<hr>\\n<h3>一、 为什么要引入 Patch？（它干掉了什么痛点）</h3>\\n<p>在传统大语言模型（LLM）中，文字被切成一个个 <strong>Token</strong> 送入模型进行处理。然而，图像是连续的像素点（比如一张 $224 \\\\times 224$ 的图片，包含约 5 万个像素点）。如果直接把每个像素点当作一个 Token 送进 Transformer 算自注意力（Attention），其平方级的计算量（$O(N^2)$）会瞬间引爆 GPU 的显存。</p>","autoDesc":true}`),i={name:`Patch.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在计算机视觉（CV）和大模型领域中，<strong>Patch（图像块 / 视觉块）</strong> 是指<strong>将一张完整的二维图像物理切碎后，得到的固定大小的局部像素方块</strong>。</p>
<p>它是多模态大模型和 Vision Transformer (ViT) 架构的<strong>底层通行证</strong>。</p>
<hr>
<h3 id="一、-为什么要引入-patch-它干掉了什么痛点" tabindex="-1"><a class="header-anchor" href="#一、-为什么要引入-patch-它干掉了什么痛点"><span>一、 为什么要引入 Patch？（它干掉了什么痛点）</span></a></h3>
<p>在传统大语言模型（LLM）中，文字被切成一个个 <strong>Token</strong> 送入模型进行处理。然而，图像是连续的像素点（比如一张 $224 \\times 224$ 的图片，包含约 5 万个像素点）。如果直接把每个像素点当作一个 Token 送进 Transformer 算自注意力（Attention），其平方级的计算量（$O(N^2)$）会瞬间引爆 GPU 的显存。</p>
<p>为了解决这个算力灾难，谷歌在 2020 年的 ViT 论文中提出了一个极其简单暴力的物理重构手段：<strong>把图片当成文章来读，把 Patch 当成单词（Token）来看</strong>。</p>
<h4 id="🧱-形象的比喻-切拼图" tabindex="-1"><a class="header-anchor" href="#🧱-形象的比喻-切拼图"><span>🧱 形象的比喻：切拼图</span></a></h4>
<p>假设有一张 $224 \\times 224$ 像素的静态图片：</p>
<ol>
<li><strong>进行 Patch 切分</strong>：规定每个 Patch 的尺寸为 $16 \\times 16$ 像素。</li>
<li><strong>算一下数量</strong>：横向可以切 $224 / 16 = 14$ 块，纵向切 $14$ 块。整张图最终被完美切碎成了 $14 \\times 14 = 196$ 个局部的<strong>物理小方块（Patches）</strong>。</li>
<li><strong>效果</strong>：大模型原本要处理 5 万个像素点，现在只需要处理 <strong>196 个 Patch Tokens</strong>。计算量直接暴跌了成百上千倍。</li>
</ol>
<hr>
<h3 id="二、-从物理像素到向量-patch-embedding-的转化" tabindex="-1"><a class="header-anchor" href="#二、-从物理像素到向量-patch-embedding-的转化"><span>二、 从物理像素到向量：Patch Embedding 的转化</span></a></h3>
<p>切碎后的 Patch 依然是三维的像素点矩阵（$16 \\times 16 \\times 3$ 通道，共 768 个像素值），计算机同样无法直接理解其语义。这就需要进行 <strong>Patch Embedding（Patch 嵌入）</strong>，在底层通常由一个 2D 卷积核（Conv2d）瞬间完成：</p>
<ol>
<li><strong>升维映射</strong>：利用一个 <code v-pre>kernel_size=16</code>、<code v-pre>stride=16</code>、输出通道数为 768 的 2D 卷积核直接扫过整张图。</li>
<li><strong>展平（Flatten）</strong>：卷积出来的结果在空间维度上直接被拉平，变成一个 $196 \\times 768$ 的二维数学矩阵。</li>
<li><strong>物理成果</strong>：每一个 $16 \\times 16$ 的局部小方块，至此被彻底压缩并重构为了一个包含局部视觉特征的 <strong>768 维密集实数向量</strong>。大模型（Transformer）就可以像处理文本的 Embedding 一样，在这个矩阵上疯狂运行 Tensor Core 进行自注意力计算了。</li>
</ol>
<hr>
<h3 id="三、-视频场景下的升级-spatial-temporal-patch-时空块" tabindex="-1"><a class="header-anchor" href="#三、-视频场景下的升级-spatial-temporal-patch-时空块"><span>三、 视频场景下的升级：Spatial-Temporal Patch（时空块）</span></a></h3>
<p>正如我们前面聊过的视频 Tokenization，在处理视频（Video）时，二维的静态 Patch 会直接进化为三维的 <strong>Spatial-Temporal Patch（时空块 / Tubelet）</strong>。</p>
<ul>
<li><strong>2D Patch</strong>：一刀切下去是<strong>一个平面方块（长</strong> $\\times$ <strong>宽）</strong>。</li>
<li><strong>3D Patch</strong>：一刀切下去是<strong>一个时空立方体（时间帧数</strong> $\\times$ <strong>长</strong> $\\times$ <strong>宽）</strong>，比如 $4 \\times 16 \\times 16$。它不仅包裹了这 16x16 范围内的画面轮廓，还一口气打包锁定了这块画面在连续 4 帧时间内的运动轨迹和光流变化。</li>
</ul>
<hr>
<h3 id="💡-极简总结与补充说明" tabindex="-1"><a class="header-anchor" href="#💡-极简总结与补充说明"><span>💡 极简总结与补充说明</span></a></h3>
<p>在大模型时代，<strong>“Patch”就是视觉世界里的“Token”</strong>。它强行将庞大、连续的像素矩阵，降维、切割成了不失局部语义的离散方块，打通了文本与视觉在 Transformer 内部统一计算的桥梁。</p>
<p><em>(注：在传统软件工程或 Linux 运维中，patch</em>* 还有另一个含义，指“补丁文件”或用 <code v-pre>patch</code> 命令给代码/内核打补丁升级。但在机器学习和智算领域，它 100% 指的是图像块。)*</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};