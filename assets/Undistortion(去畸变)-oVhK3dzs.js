import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/%E5%A4%A7%E6%A8%A1%E5%9E%8B%E6%8A%80%E6%9C%AF/VITRA/%E6%95%B0%E6%8D%AE%E7%AE%A1%E7%BA%BF%E5%85%A8%E9%98%B6%E6%AE%B5%E6%80%BB%E8%A7%88/%E6%95%B0%E6%8D%AE%E6%B8%85%E6%B4%97/Undistortion(%E5%8E%BB%E7%95%B8%E5%8F%98).html","title":"Undistortion(去畸变)","lang":"zh-CN","frontmatter":{"title":"Undistortion(去畸变)","icon":"cpu","date":"2026-07-23T00:00:00.000Z","category":["AI基础设施"],"description":"去畸变（Undistortion / 畸变矫正） 是计算机视觉和图像处理中的一项经典前置技术。 它的核心目的，是通过数学映射和像素重排，把物理镜头（尤其是广角、鱼眼镜头）拍出来的“弯曲、扭曲”的画面，还原成完全符合理想针孔相机模型（Pinhole Model）的、横平竖直、符合人类真实透视视觉的图像。 下面为你拆解去畸变的物理本质、数学模型以及在工业界...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Undistortion(去畸变)\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/%E5%A4%A7%E6%A8%A1%E5%9E%8B%E6%8A%80%E6%9C%AF/VITRA/%E6%95%B0%E6%8D%AE%E7%AE%A1%E7%BA%BF%E5%85%A8%E9%98%B6%E6%AE%B5%E6%80%BB%E8%A7%88/%E6%95%B0%E6%8D%AE%E6%B8%85%E6%B4%97/Undistortion(%E5%8E%BB%E7%95%B8%E5%8F%98).html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"Undistortion(去畸变)"}],["meta",{"property":"og:description","content":"去畸变（Undistortion / 畸变矫正） 是计算机视觉和图像处理中的一项经典前置技术。 它的核心目的，是通过数学映射和像素重排，把物理镜头（尤其是广角、鱼眼镜头）拍出来的“弯曲、扭曲”的画面，还原成完全符合理想针孔相机模型（Pinhole Model）的、横平竖直、符合人类真实透视视觉的图像。 下面为你拆解去畸变的物理本质、数学模型以及在工业界..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":4.4,"words":1320},"filePathRelative":"posts/AI基础设施/学习计划/大模型技术/VITRA/数据管线全阶段总览/数据清洗/Undistortion(去畸变).md","excerpt":"<p><strong>去畸变（Undistortion / 畸变矫正）</strong> 是计算机视觉和图像处理中的一项经典前置技术。</p>\\n<p>它的核心目的，是<strong>通过数学映射和像素重排，把物理镜头（尤其是广角、鱼眼镜头）拍出来的“弯曲、扭曲”的画面，还原成完全符合理想针孔相机模型（Pinhole Model）的、横平竖直、符合人类真实透视视觉的图像。</strong></p>\\n<p>下面为你拆解去畸变的物理本质、数学模型以及在工业界（如 OpenCV 或 GPU 算子中）的具体做法：</p>\\n<hr>\\n<h3>一、 为什么要去做畸变？</h3>\\n<p>理想的相机模型（针孔模型）假设光线是沿直线传播并投影到传感器上的。但在现实中，为了获得更大的视野，镜头的镜片往往具有弧度。光线穿过镜头边缘时会发生偏折，导致成像出现几何扭曲：</p>","autoDesc":true}`),i={name:`Undistortion(去畸变).md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p><strong>去畸变（Undistortion / 畸变矫正）</strong> 是计算机视觉和图像处理中的一项经典前置技术。</p>
<p>它的核心目的，是<strong>通过数学映射和像素重排，把物理镜头（尤其是广角、鱼眼镜头）拍出来的“弯曲、扭曲”的画面，还原成完全符合理想针孔相机模型（Pinhole Model）的、横平竖直、符合人类真实透视视觉的图像。</strong></p>
<p>下面为你拆解去畸变的物理本质、数学模型以及在工业界（如 OpenCV 或 GPU 算子中）的具体做法：</p>
<hr>
<h3 id="一、-为什么要去做畸变" tabindex="-1"><a class="header-anchor" href="#一、-为什么要去做畸变"><span>一、 为什么要去做畸变？</span></a></h3>
<p>理想的相机模型（针孔模型）假设光线是沿直线传播并投影到传感器上的。但在现实中，为了获得更大的视野，镜头的镜片往往具有弧度。光线穿过镜头边缘时会发生偏折，导致成像出现几何扭曲：</p>
<ol>
<li><strong>桶形畸变（Barrel Distortion）</strong>：画面中心向外凸起，边缘线条向内弯曲（常见于广角镜头或全景相机）。</li>
<li><strong>枕形畸变（Pincushion Distortion）</strong>：画面向内塌陷，边缘线条向外弯曲（常见于长焦镜头）。</li>
</ol>
<p>如果不做去畸变，图像中的像素点位置就是“歪”的。这会导致后续的 AI 目标检测、车道线识别、SLAM 空间建图、或者多模态雷达点云融合等算法出现极其严重的物理位置偏差。</p>
<hr>
<h3 id="二、-去畸变的数学模型" tabindex="-1"><a class="header-anchor" href="#二、-去畸变的数学模型"><span>二、 去畸变的数学模型</span></a></h3>
<p>工业界最通用的是 <strong>Brown-Conrady 模型</strong>。它把镜头畸变拆解为两大物理分量：</p>
<h4 id="_1-径向畸变-radial-distortion" tabindex="-1"><a class="header-anchor" href="#_1-径向畸变-radial-distortion"><span>1. 径向畸变（Radial Distortion）</span></a></h4>
<p>由镜头的物理形状导致，越靠近图像边缘，扭曲越严重。数学上用围绕图像中心的泰勒级数来逼近，畸变系数通常记为 $k_1, k_2, k_3$：</p>
<p>$$<br>
x_{\\text{distorted&amp;#125;&amp;#125; = x(1 + k_1r^2 + k_2r^4 + k_3r^6)<br>
$$</p>
<p>$$<br>
y_{\\text{distorted&amp;#125;&amp;#125; = y(1 + k_1r^2 + k_2r^4 + k_3r^6)<br>
$$</p>
<p><em>(其中</em> $r^2 = x^2 + y^2$<em>，代表像素点到图像中心的物理距离)</em></p>
<h4 id="_2-切向畸变-tangential-distortion" tabindex="-1"><a class="header-anchor" href="#_2-切向畸变-tangential-distortion"><span>2. 切向畸变（Tangential Distortion）</span></a></h4>
<p>由于镜头组在装配、制造时，镜片与图像传感器（CMOS）表面没有做到<strong>绝对平行</strong>而导致的透视偏折。畸变系数记为 $p_1, p_2$：</p>
<p>$$<br>
x_{\\text{distorted&amp;#125;&amp;#125; = x_{\\text{radial&amp;#125;&amp;#125; + [2p_1xy + p_2(r^2 + 2x^2)]<br>
$$</p>
<p>$$<br>
y_{\\text{distorted&amp;#125;&amp;#125; = y_{\\text{radial&amp;#125;&amp;#125; + [p_1(r^2 + 2y^2) + 2p_2xy]<br>
$$</p>
<p>通过这组公式，只要知道了相机的畸变系数（$k_1, k_2, k_3, p_1, p_2$），就能精准算出一个平直空间里的坐标在扭曲图像上的具体落点。</p>
<hr>
<h3 id="三、-工业界具体怎么做-标准工程管线" tabindex="-1"><a class="header-anchor" href="#三、-工业界具体怎么做-标准工程管线"><span>三、 工业界具体怎么做？（标准工程管线）</span></a></h3>
<p>在实际工程中（例如使用 OpenCV 库或在 GPU 上手写高性能推理算子），去畸变通常遵循以下闭环流水线：</p>
<h4 id="第一步-相机标定-calibration-——-测出数学参数" tabindex="-1"><a class="header-anchor" href="#第一步-相机标定-calibration-——-测出数学参数"><span>第一步：相机标定（Calibration）—— 测出数学参数</span></a></h4>
<p>去畸变的前提是必须知道相机的“基因密码”（参数）。</p>
<ul>
<li><strong>做法</strong>：使用打印好的黑白棋盘格或圆点标定板（张正友标定法），让相机从不同角度拍几十张照片。</li>
<li><strong>输出</strong>：算法通过识别棋盘格的角点，计算出相机的<strong>内参矩阵</strong> $K$（包含焦距 $f_x, f_y$ 和光心位置 $c_x, c_y$）以及上述的<strong>畸变系数（</strong>$k_1, k_2, p_1, p_2...$<strong>）</strong>。</li>
</ul>
<h4 id="第二步-坐标重映射-remap-——-核心算子逻辑" tabindex="-1"><a class="header-anchor" href="#第二步-坐标重映射-remap-——-核心算子逻辑"><span>第二步：坐标重映射（Remap）—— 核心算子逻辑</span></a></h4>
<p>得到了参数后，开始处理图像。去畸变的算法执行逻辑在物理上是“反向推导”的：</p>
<ol>
<li><strong>建格子</strong>：算法首先创建一幅空的、目标“去畸变后”的理想长方形新图。</li>
<li><strong>反向投射</strong>：遍历新图中的每一个像素坐标 $(x_{\\text{rect&amp;#125;&amp;#125;, y_{\\text{rect&amp;#125;&amp;#125;)$。利用相机内参和上面的畸变公式，反向计算出这个点在<strong>原始畸变老图</strong>上的物理真实坐标 $(x_{\\text{distorted&amp;#125;&amp;#125;, y_{\\text{distorted&amp;#125;&amp;#125;)$。</li>
<li><strong>注意</strong>：算出来的老图坐标通常是带小数点的浮点数。</li>
</ol>
<h4 id="第三步-像素插值-interpolation-——-染色填空" tabindex="-1"><a class="header-anchor" href="#第三步-像素插值-interpolation-——-染色填空"><span>第三步：像素插值（Interpolation）—— 染色填空</span></a></h4>
<ul>
<li>因为老图上的坐标是浮点数（比如 $x=12.4, y=45.8$），无法直接对应物理像素点。</li>
<li>算法会使用<strong>双线性插值（Bilinear Interpolation）</strong>，抓取该浮点数四周最近的 4 个真实像素颜色，加权计算出最终颜色，精准地赋给新图对应的位置。</li>
</ul>
<hr>
<h3 id="四、-去畸变带来的物理代价-fov-损失" tabindex="-1"><a class="header-anchor" href="#四、-去畸变带来的物理代价-fov-损失"><span>四、 去畸变带来的物理代价：FOV 损失</span></a></h3>
<p>把一个碗状弯曲的画面强行扯平，图像的四个角会被极度拉伸。此时会出现一个两难的抉择：</p>
<ul>
<li><strong>保留完整视野（最大 FOV）</strong>：画面拉直后，四周会留下大面积没有像素的<strong>黑色盲区</strong>（图像变成风筝状或漏斗状）。</li>
<li><strong>裁剪黑边（标准长方形）</strong>：为了让图像好看，强行切掉黑边，只保留中间完好的长方形矩形。这会导致图像边缘有一部分视野被白白裁剪掉，使得相机的 <strong>FOV（视场角）变小</strong>。</li>
</ul>
<p>在工业应用（如自动驾驶感知的多相机拼接）中，通常会使用诸如 OpenCV 的 <code v-pre>cv2.getOptimalNewCameraMatrix</code> 函数，通过调整缩放参数（<code v-pre>alpha</code>）来定量调节去畸变后的裁剪比例，从而在“画面完整度”与“FOV 视场角大小”之间取得最佳的平衡。</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};