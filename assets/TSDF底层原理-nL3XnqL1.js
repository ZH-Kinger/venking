import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/%E5%A4%A7%E6%A8%A1%E5%9E%8B%E6%8A%80%E6%9C%AF/%E6%95%B0%E6%8D%AE%E7%AE%A1%E7%BA%BF(Data_Pipeline)/%E6%95%B0%E6%8D%AE%E6%A0%BC%E5%BC%8F/TSDF%E5%BA%95%E5%B1%82%E5%8E%9F%E7%90%86/TSDF%E5%BA%95%E5%B1%82%E5%8E%9F%E7%90%86.html","title":"TSDF底层原理","lang":"zh-CN","frontmatter":{"title":"TSDF底层原理","icon":"cpu","date":"2026-07-23T00:00:00.000Z","category":["AI基础设施"],"description":"既然我们要深入到 TSDF（Truncated Signed Distance Function，截断符号距离函数） 的最底层，我们就需要抛开表面的概念，直接进入它的数学本质、算法推演以及在 GPU 上的显存工程实践。 TSDF 是目前微软 KinectFusion 及其所有衍生 3D 重建算法（包括各种机器人的实时环境感知系统）的绝对核心。它的出现，...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"TSDF底层原理\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/%E5%A4%A7%E6%A8%A1%E5%9E%8B%E6%8A%80%E6%9C%AF/%E6%95%B0%E6%8D%AE%E7%AE%A1%E7%BA%BF(Data_Pipeline)/%E6%95%B0%E6%8D%AE%E6%A0%BC%E5%BC%8F/TSDF%E5%BA%95%E5%B1%82%E5%8E%9F%E7%90%86/TSDF%E5%BA%95%E5%B1%82%E5%8E%9F%E7%90%86.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"TSDF底层原理"}],["meta",{"property":"og:description","content":"既然我们要深入到 TSDF（Truncated Signed Distance Function，截断符号距离函数） 的最底层，我们就需要抛开表面的概念，直接进入它的数学本质、算法推演以及在 GPU 上的显存工程实践。 TSDF 是目前微软 KinectFusion 及其所有衍生 3D 重建算法（包括各种机器人的实时环境感知系统）的绝对核心。它的出现，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":5.6,"words":1681},"filePathRelative":"posts/AI基础设施/学习计划/大模型技术/数据管线(Data_Pipeline)/数据格式/TSDF底层原理/TSDF底层原理.md","excerpt":"<p>既然我们要深入到 <strong>TSDF（Truncated Signed Distance Function，截断符号距离函数）</strong> 的最底层，我们就需要抛开表面的概念，直接进入它的数学本质、算法推演以及在 GPU 上的显存工程实践。</p>\\n<p>TSDF 是目前微软 KinectFusion 及其所有衍生 3D 重建算法（包括各种机器人的实时环境感知系统）的绝对核心。它的出现，本质上是为了解决一个极度复杂的统计学和计算机图形学问题：<strong>如何在充满大量不可预测噪声的连续 2.5D 深度帧中，求导出一个绝对稳定、平滑的 3D 物理表面？</strong></p>","autoDesc":true}`),i={name:`TSDF底层原理.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>既然我们要深入到 <strong>TSDF（Truncated Signed Distance Function，截断符号距离函数）</strong> 的最底层，我们就需要抛开表面的概念，直接进入它的数学本质、算法推演以及在 GPU 上的显存工程实践。</p>
<p>TSDF 是目前微软 KinectFusion 及其所有衍生 3D 重建算法（包括各种机器人的实时环境感知系统）的绝对核心。它的出现，本质上是为了解决一个极度复杂的统计学和计算机图形学问题：<strong>如何在充满大量不可预测噪声的连续 2.5D 深度帧中，求导出一个绝对稳定、平滑的 3D 物理表面？</strong></p>
<p>以下是 TSDF 算法的深度技术解剖：</p>
<h3 id="一、-tsdf-的数学本质" tabindex="-1"><a class="header-anchor" href="#一、-tsdf-的数学本质"><span>一、 TSDF 的数学本质</span></a></h3>
<p>我们先从最基础的 SDF 说起，再看它是如何被“截断（Truncated）”的。</p>
<h4 id="_1-sdf-符号距离函数" tabindex="-1"><a class="header-anchor" href="#_1-sdf-符号距离函数"><span>1. SDF（符号距离函数）</span></a></h4>
<p>假设在 3D 空间中有一个真实的物理表面 $S$。对于空间中的任意一个点 $\\mathbf{x} = (x, y, z)$，它的 SDF 值被定义为：该点到表面 $S$ 的<strong>最短欧几里得距离</strong>。</p>
<ul>
<li>如果 $\\mathbf{x}$ 在空气中（物体外部），值为正（$d &gt; 0$）。</li>
<li>如果 $\\mathbf{x}$ 在物体内部，值为负（$d &lt; 0$）。</li>
<li>如果 $\\mathbf{x}$ 恰好在表面上，值为 0。</li>
</ul>
<h4 id="_2-truncation-截断机制" tabindex="-1"><a class="header-anchor" href="#_2-truncation-截断机制"><span>2. Truncation（截断机制）</span></a></h4>
<p>真实的物理世界空间无限大，如果我们计算所有空间的 SDF，算力会瞬间崩溃。此外，深度相机只能看到物体的“前表面”，它根本不知道物体背面的 SDF 是多少。<br>
因此，引入了一个极小的值 $\\mu$（通常设置为几厘米，比如 5cm），作为<strong>截断带（Truncation Band）</strong>。</p>
<p>TSDF 的数学定义为：</p>
<p>$$<br>
TSDF(\\mathbf{x}) = \\max\\left(-1, \\min\\left(1, \\frac{SDF(\\mathbf{x})}{\\mu}\\right)\\right)<br>
$$</p>
<ul>
<li><strong>物理意义：</strong> 我们只关心距离物体表面 $\\pm\\mu$ 范围内的薄薄一层空间。在这个带内，距离被线性归一化到了 $[-1, 1]$。超出这个范围的空间，TSDF 值直接被强行截断为 1（太远）或 -1（太深），系统不再对它们进行高精度的浮点运算。</li>
</ul>
<hr>
<h3 id="二、-核心算法-tsdf-的加权融合流水线-fusion" tabindex="-1"><a class="header-anchor" href="#二、-核心算法-tsdf-的加权融合流水线-fusion"><span>二、 核心算法：TSDF 的加权融合流水线 (Fusion)</span></a></h3>
<p>深度相机每秒会吐出 30 帧深度图，TSDF 是如何把这 30 帧图像融合成一个 3D 模型的？这是一个极其精妙的投影与加权更新（Projective Update）过程。</p>
<p>假设我们在显存里开辟了一个巨大的 3D 体素网格（Voxel Grid），每个格子 $\\mathbf{v}$ 里存两个值：当前的 $TSDF$ 值，以及一个权重 $W$。</p>
<p>当新的一帧深度图（带有相机的 6DoF 位姿）到来时，算法会在 GPU 上并行执行以下步骤：</p>
<h4 id="第一步-全局到局部的投影-projection" tabindex="-1"><a class="header-anchor" href="#第一步-全局到局部的投影-projection"><span>第一步：全局到局部的投影 (Projection)</span></a></h4>
<p>对于显存里的每一个体素 $\\mathbf{v} = (x,y,z)$，利用当前相机的外参矩阵（旋转和平移 $\\mathbf{T}$）和内参矩阵（焦距等 $\\mathbf{K}$），将这个 3D 体素<strong>投影</strong>到当前相机的 2D 像素平面上，找到它对应的像素坐标 $(u, v)$。</p>
<h4 id="第二步-计算瞬时-sdf" tabindex="-1"><a class="header-anchor" href="#第二步-计算瞬时-sdf"><span>第二步：计算瞬时 SDF</span></a></h4>
<p>在这个 2D 像素 $(u, v)$ 处，读取深度相机拍到的真实深度值 $d_{sensor}$。<br>
同时，计算体素 $\\mathbf{v}$ 到相机的理论深度 $d_{voxel}$。<br>
瞬时的符号距离即为：</p>
<p>$$<br>
sdf = d_{sensor} - d_{voxel}<br>
$$</p>
<p>如果 $sdf &gt; 0$，说明体素在表面前方；如果 $sdf &lt; 0$，说明体素陷入了表面后方。</p>
<h4 id="第三步-状态更新-噪声过滤的终极杀器" tabindex="-1"><a class="header-anchor" href="#第三步-状态更新-噪声过滤的终极杀器"><span>第三步：状态更新（噪声过滤的终极杀器）</span></a></h4>
<p>将上述算出的 $sdf$ 经过 $\\mu$ 截断后，得到这一帧的瞬时 $tsdf_{new}$。接下来使用经典的加权平均公式更新体素的全局状态：</p>
<p>$$<br>
TSDF_{global} = \\frac{TSDF_{global} \\cdot W_{old} + tsdf_{new} \\cdot W_{new&amp;#125;&amp;#125;{W_{old} + W_{new&amp;#125;&amp;#125;<br>
$$</p>
<p>$$<br>
W_{global} = W_{old} + W_{new}<br>
$$</p>
<ul>
<li><strong>为什么这能过滤噪声？</strong> 深度相机的噪声是符合高斯分布的随机跳动。当你在同一位置累加了 100 帧数据后，全局的权重 $W$ 变得非常大。此时即使第 101 帧因为反光出现了一个极其荒谬的噪点，它在加权公式中也会被庞大的历史数据直接“稀释”掉。这就把剧烈闪烁的深度图，变成了一个坚如磐石的 3D 场。</li>
</ul>
<hr>
<h3 id="三、-架构师视角的显存优化战役" tabindex="-1"><a class="header-anchor" href="#三、-架构师视角的显存优化战役"><span>三、 架构师视角的显存优化战役</span></a></h3>
<p>在工程落地时，TSDF 最大的敌人是<strong>空间复杂度</strong> $O(N^3)$。<br>
如果我们在一个 $5\\text{m} \\times 5\\text{m} \\times 5\\text{m}$ 的房间里，想要达到 5 毫米精度的 3D 重建，我们需要划分 $(1000 \\times 1000 \\times 1000) = 10^9$ 个体素。每个体素存 TSDF 和 Weight（各 16-bit），一瞬间就会吃掉几 GB 到十几 GB 的显存。而房间里 99% 的空间都是空的（空气）。</p>
<p>为了把 TSDF 塞进普通的 GPU 或边缘计算设备，业界演化出了极度硬核的数据结构：</p>
<h4 id="_1-八叉树-octree" tabindex="-1"><a class="header-anchor" href="#_1-八叉树-octree"><span>1. 八叉树 (Octree)</span></a></h4>
<p>将 3D 空间不断八等分。如果一个区域里全是空气，或者全在物体极深处，就不再往下细分。只有在 TSDF 零交叉点（表面）附近，才将格子切分到最细。这种方法大幅压缩了内存，但指针跳转会导致 GPU 并行计算效率下降。</p>
<h4 id="_2-voxel-hashing-体素哈希" tabindex="-1"><a class="header-anchor" href="#_2-voxel-hashing-体素哈希"><span>2. Voxel Hashing (体素哈希)</span></a></h4>
<p>这是由 Niessner 等人提出的神级优化（目前多数现代重建管线的底层逻辑）。<br>
不再维护一个巨大的 3D 数组，而是只在物体表面附近分配 $8 \\times 8 \\times 8$ 的“体素块（Voxel Blocks）”。系统维护一个巨大的哈希表（Hash Table）。GPU 计算时，通过空间坐标算出一个 Hash 值，用 $O(1)$ 的时间复杂度瞬间找到对应的体素块。这让大场景的实时高精度 TSDF 重建成为可能。</p>
<hr>
<h3 id="四、-从-tsdf-到物理网格的终跃" tabindex="-1"><a class="header-anchor" href="#四、-从-tsdf-到物理网格的终跃"><span>四、 从 TSDF 到物理网格的终跃</span></a></h3>
<p>经过成百上千帧的加权融合，GPU 显存里现在有了一个完美的 TSDF 场。但物理引擎（如 PhysX、MuJoCo）依然不认识它，物理引擎只认识顶点和三角形。</p>
<p>最后一步，是运行 <strong>Marching Cubes（移动立方体）算法</strong> 或 <strong>Raycasting（光线投射）</strong>：<br>
遍历所有的体素，寻找 TSDF 值从正数变为负数的相邻格子（这意味着恰好穿过了表面）。算法在这些格子的连线上进行线性插值，精确计算出 0 值所在的精确 3D 坐标，并在这些坐标上自动生成三角面片（Mesh）。</p>
<p>至此，冰冷的传感器电流，彻底变成了一个可以在虚拟元宇宙中进行碰撞、抓取和重力计算的数字孪生物体。</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};