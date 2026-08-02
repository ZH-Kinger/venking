import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E5%9F%BA%E7%A1%80/%E7%A5%9E%E7%BB%8F%E7%BD%91%E7%BB%9C/CNN_-_%E5%8D%B7%E7%A7%AF%E5%92%8C%E6%B1%A0%E5%8C%96(Convolution_And_Pooling).html","title":"CNN_-_卷积和池化(Convolution_And_Pooling)","lang":"zh-CN","frontmatter":{"title":"CNN_-_卷积和池化(Convolution_And_Pooling)","icon":"cpu","date":"2026-07-23T00:00:00.000Z","category":["AI基础设施"],"description":"Convolutional Neural Network（概述） CNN（卷积神经网络）最核心的两大操作就是卷积（Convolution）和池化（Pooling）。 卷积用于特征 提取，通过卷积核在输入数据上滑动计算加权和；池化用 于特征降维 ，通过聚合统计池化窗口内的元素来减少数据空间大小 。 Convolution And Pooling 一、 卷...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"CNN_-_卷积和池化(Convolution_And_Pooling)\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/CNN_-_%E5%8D%B7%E7%A7%AF%E5%92%8C%E6%B1%A0%E5%8C%96(Convolution_And_Pooling\\",\\"https://venking.tech/blog/blog/assets/posts/CNN_-_%E5%8D%B7%E7%A7%AF%E5%92%8C%E6%B1%A0%E5%8C%96(Convolution_And_Pooling\\",\\"https://venking.tech/blog/blog/assets/posts/CNN_-_%E5%8D%B7%E7%A7%AF%E5%92%8C%E6%B1%A0%E5%8C%96(Convolution_And_Pooling\\",\\"https://venking.tech/blog/blog/assets/posts/CNN_-_%E5%8D%B7%E7%A7%AF%E5%92%8C%E6%B1%A0%E5%8C%96(Convolution_And_Pooling\\",\\"https://venking.tech/blog/blog/assets/posts/CNN_-_%E5%8D%B7%E7%A7%AF%E5%92%8C%E6%B1%A0%E5%8C%96(Convolution_And_Pooling\\",\\"https://venking.tech/blog/blog/assets/posts/CNN_-_%E5%8D%B7%E7%A7%AF%E5%92%8C%E6%B1%A0%E5%8C%96(Convolution_And_Pooling\\",\\"https://venking.tech/blog/blog/assets/posts/CNN_-_%E5%8D%B7%E7%A7%AF%E5%92%8C%E6%B1%A0%E5%8C%96(Convolution_And_Pooling\\",\\"https://venking.tech/blog/blog/assets/posts/CNN_-_%E5%8D%B7%E7%A7%AF%E5%92%8C%E6%B1%A0%E5%8C%96(Convolution_And_Pooling\\",\\"https://venking.tech/blog/blog/assets/posts/CNN_-_%E5%8D%B7%E7%A7%AF%E5%92%8C%E6%B1%A0%E5%8C%96(Convolution_And_Pooling\\",\\"https://venking.tech/blog/blog/assets/posts/CNN_-_%E5%8D%B7%E7%A7%AF%E5%92%8C%E6%B1%A0%E5%8C%96(Convolution_And_Pooling\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E5%9F%BA%E7%A1%80/%E7%A5%9E%E7%BB%8F%E7%BD%91%E7%BB%9C/CNN_-_%E5%8D%B7%E7%A7%AF%E5%92%8C%E6%B1%A0%E5%8C%96(Convolution_And_Pooling).html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"CNN_-_卷积和池化(Convolution_And_Pooling)"}],["meta",{"property":"og:description","content":"Convolutional Neural Network（概述） CNN（卷积神经网络）最核心的两大操作就是卷积（Convolution）和池化（Pooling）。 卷积用于特征 提取，通过卷积核在输入数据上滑动计算加权和；池化用 于特征降维 ，通过聚合统计池化窗口内的元素来减少数据空间大小 。 Convolution And Pooling 一、 卷..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/CNN_-_%E5%8D%B7%E7%A7%AF%E5%92%8C%E6%B1%A0%E5%8C%96(Convolution_And_Pooling"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":5.91,"words":1773},"filePathRelative":"posts/AI基础设施/学习计划/深度学习基础/神经网络/CNN_-_卷积和池化(Convolution_And_Pooling).md","excerpt":"<figure><img src=\\"/blog/assets/posts/CNN_-_%E5%8D%B7%E7%A7%AF%E5%92%8C%E6%B1%A0%E5%8C%96(Convolution_And_Pooling)-1.jpeg\\" alt tabindex=\\"0\\" loading=\\"lazy\\"><figcaption></figcaption></figure>\\n<h2>Convolutional Neural Network（概述）</h2>\\n<p>CNN（卷积神经网络）最核心的两大操作就是卷积（Convolution）和池化（Pooling）。</p>\\n<p>卷积用于特征</p>","autoDesc":true}`),i={name:`CNN_-_卷积和池化(Convolution_And_Pooling).md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><figure><img src="/blog/assets/posts/CNN_-_%E5%8D%B7%E7%A7%AF%E5%92%8C%E6%B1%A0%E5%8C%96(Convolution_And_Pooling)-1.jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="convolutional-neural-network-概述" tabindex="-1"><a class="header-anchor" href="#convolutional-neural-network-概述"><span>Convolutional Neural Network（概述）</span></a></h2>
<p>CNN（卷积神经网络）最核心的两大操作就是卷积（Convolution）和池化（Pooling）。</p>
<p>卷积用于特征</p>
<p>提取，通过卷积核在输入数据上滑动计算加权和；池化用 于特征降维 ，通过聚合统计池化窗口内的元素来减少数据空间大小 。</p>
<figure><img src="/blog/assets/posts/CNN_-_%E5%8D%B7%E7%A7%AF%E5%92%8C%E6%B1%A0%E5%8C%96(Convolution_And_Pooling)-2.jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>Convolution And Pooling</p>
<h2 id="一、-卷积-convolution" tabindex="-1"><a class="header-anchor" href="#一、-卷积-convolution"><span>一、 卷积（Convolution）</span></a></h2>
<p>卷积（ Convolution ）：卷积是一种数学运算，在CNN中，它通过滑动窗口（也称为卷积核或滤波器）在输入图像或特征图上滑动，并计算窗口内元素与对应卷积核元素的加权和（包括偏置项），从而生成输出特征图。</p>
<figure><img src="/blog/assets/posts/CNN_-_%E5%8D%B7%E7%A7%AF%E5%92%8C%E6%B1%A0%E5%8C%96(Convolution_And_Pooling)-3.gif" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>Convolution</p>
<h3 id="卷积的原理" tabindex="-1"><a class="header-anchor" href="#卷积的原理"><span>卷积的原理：</span></a></h3>
<p>卷积是一种特殊的线性运算，用于提取图像中的局部特征。</p>
<p>CNN通过使用一个或多个卷积核（也称为滤波器或特征检测器）在输入数据（如图像）上进行滑动窗口操作来提取特征。</p>
<p>• <strong>卷积核（Convolution Kernel）</strong>： 一个可学习的权重矩阵，其大小通常远小于输入图像的大小，用于在输入图像上滑动并进行元素级的乘法累加操作。</p>
<p>• <strong>特征图（Feature Map）</strong>：卷积操作的结果，每个特征图都代表了输入图像在不同卷积核下的特征响应。</p>
<figure><img src="/blog/assets/posts/CNN_-_%E5%8D%B7%E7%A7%AF%E5%92%8C%E6%B1%A0%E5%8C%96(Convolution_And_Pooling)-4.gif" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>Convolution</p>
<p><strong>卷积的计算过程</strong>： 通过卷积核在输入数据上滑动，计算每个位置上的加权和（包括偏置项），并可能应用激活函数，以生成输出特征图。</p>
<p>• <strong>选择卷积核</strong>：卷积核是一个可学习的参数矩阵，其大小（如3x3、5x5等）和数量（即输出特征图的通道数）是超参数。</p>
<p>• <strong>滑动窗口</strong>：将卷积核在输入图像或特征图上按指定步长（stride）滑动，每次滑动都计算窗口内元素与卷积核的加权和。</p>
<p>• <strong>计算加权和</strong>：对于每个滑动位置，将窗口内元素与卷积核对应位置的元素相乘后求和，并加上偏置项（如果有的话），得到输出特征图上对应位置的元素值。</p>
<p>• <strong>添加激活函数</strong>：通常，卷积操作后会接一个激活函数（如ReLU），以增加网络的非线性特性。</p>
<figure><img src="/blog/assets/posts/CNN_-_%E5%8D%B7%E7%A7%AF%E5%92%8C%E6%B1%A0%E5%8C%96(Convolution_And_Pooling)-5.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>Convolution</p>
<h3 id="卷积的重要参数" tabindex="-1"><a class="header-anchor" href="#卷积的重要参数"><span>卷积的重要参数：</span></a></h3>
<p>卷积的重要参数主要包括 卷积核大小（Kernel Size）、步长（Stride）以及填充（Padding） ，它们共同决定了卷积层的输出特征图的尺寸和特性。</p>
<p>• <strong>卷积核大小（Kernel Size）</strong>：决定了感受野的大小，即每次卷积操作能够覆盖的输入区域大小。</p>
<p>• <strong>步长（Stride</strong>）：决定了卷积核在输入图像或特征图上滑动的距离。步长为1表示每次滑动一个像素，步长大于1则表示每次滑动多个像素。</p>
<p>• <strong>填充（Padding）</strong>：在输入图像或特征图的边缘添加额外的零值，以控制输出特征图的尺寸。常见的填充方式有“valid”（无填充）和“same”（填充后输出尺寸与输入相同）。</p>
<p>• <strong>通道数（Channels）</strong>：对于输入图像，通道数指的是颜色通道数（如RGB图像的通道数为3）。对于卷积层，输出特征图的通道数由卷积核的数量决定。</p>
<figure><img src="/blog/assets/posts/CNN_-_%E5%8D%B7%E7%A7%AF%E5%92%8C%E6%B1%A0%E5%8C%96(Convolution_And_Pooling)-6.jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>Convolution</p>
<h2 id="二、-池化-pooling" tabindex="-1"><a class="header-anchor" href="#二、-池化-pooling"><span>二、 池化（Pooling）</span></a></h2>
<p>池化（Pooling）： 池化是卷积神经网络中的一种下采样操作。它通过定义一个空间邻域（通常为矩形区域），并对该邻域内的特征进行统计处理（如取最大值、平均值等），从而生成新的特征图。 池化操作通常紧随卷积层之后。</p>
<p>1. <strong>特征降维</strong>：池化操作通过减少特征图的尺寸，降低了后续卷积层的计算量和参数数量，从而提高了计算效率。</p>
<p>2. <strong>特征提取</strong>：通过池化操作，CNN能够进一步提取输入数据的特征，使模型能够学习到更加抽象和高级的特征表示。</p>
<p>3. <strong>防止过拟合</strong>：池化操作通过减少特征图的维度和参数数量，降低了模型的复杂度，从而在一定程度上防止了过拟合现象的发生。</p>
<figure><img src="/blog/assets/posts/CNN_-_%E5%8D%B7%E7%A7%AF%E5%92%8C%E6%B1%A0%E5%8C%96(Convolution_And_Pooling)-7.jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>Pooling</p>
<p>池化操作在降低特征图空间大小的同时，保持了特征的空间层次结构，有助于减少计算量并提高模型的泛化能力。</p>
<figure><img src="/blog/assets/posts/CNN_-_%E5%8D%B7%E7%A7%AF%E5%92%8C%E6%B1%A0%E5%8C%96(Convolution_And_Pooling)-8.gif" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>Pooling</p>
<h3 id="池化的常见类型" tabindex="-1"><a class="header-anchor" href="#池化的常见类型"><span>池化的常见类型：</span></a></h3>
<p>池化操作有多种方式，其中最常见的是最大值池化（Max Pooling）和 平均池化（Average Pooling） 。 它们分别通过选取局部区域内的最大值和平均值来减少特征图的尺寸 。</p>
<p>• <strong>最大值池化（Max Pooling）</strong>：</p>
<p>• 原理： 在定义的池化窗口内，选取所有元素中的最大值，并将该最大值作为池化结果输出到下一层特征图的对应位置。</p>
<p>• 特点： 能够保留更多的纹理信息，减少因卷积层参数误差造成的估计均值偏移，使模型对特征的具体位置变化更加鲁棒。</p>
<p>• <strong>平均池化</strong>（Average Pooling）：</p>
<p>• 原理： 在定义的池化窗口（如2x2、3x3等）内，计算所有元素的平均值，并将该平均值作为池化结果输出到下一层特征图的对应位置。</p>
<p>• 特点： 能够保留更多的背景信息，减少因邻域大小受限造成的估计值方差增大，使提取的特征更加平滑。</p>
<figure><img src="/blog/assets/posts/CNN_-_%E5%8D%B7%E7%A7%AF%E5%92%8C%E6%B1%A0%E5%8C%96(Convolution_And_Pooling)-9.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>Pooling</p>
<h3 id="池化的重要参数" tabindex="-1"><a class="header-anchor" href="#池化的重要参数"><span>池化的重要参数：</span></a></h3>
<p>池化窗口大小和步长是决定池化层输出尺寸的关键参数，窗口大小定义了覆盖区域，步长决定了滑动距离 。</p>
<p>• <strong>池化窗口大小（Kernel Size）</strong>：定义了池化操作的窗口大小，通常是一个正方形（如2x2、3x3等）。窗口大小决定了池化操作在输入数据上滑动时覆盖的区域大小。</p>
<p>• <strong>步长（Stride）</strong>：步长定义了池化窗口在输入数据上滑动的距离。如果步长与窗口大小相同，则池化操作不会重叠。如果步长小于窗口大小，则池化操作会重叠。</p>
<figure><img src="/blog/assets/posts/CNN_-_%E5%8D%B7%E7%A7%AF%E5%92%8C%E6%B1%A0%E5%8C%96(Convolution_And_Pooling)-10.gif" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};