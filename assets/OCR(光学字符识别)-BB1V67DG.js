import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/OCR(%E5%85%89%E5%AD%A6%E5%AD%97%E7%AC%A6%E8%AF%86%E5%88%AB).html","title":"OCR(光学字符识别)","lang":"zh-CN","frontmatter":{"title":"OCR(光学字符识别)","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"OCR 全称是 Optical Character Recognition（光学字符识别）。 简单来说，OCR 是一种将“图片里的文字”物理转换为“计算机可以编辑、复制和检索的纯文本”的技术。 它的核心物理任务就是让机器“看懂”图像中的视觉像素符号，并将其映射为计算机底层的标准字符编码（如 UTF-8）。 在传统互联网和当今的 AI 大模型（RAG /...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"OCR(光学字符识别)\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/%E7%AC%AC%E4%B8%89%E9%98%B6%E6%AE%B5_%E6%8B%A5%E6%8A%B1%E7%94%9F%E6%80%81%E4%B8%8E%E6%A1%86%E6%9E%B6_(%E5%B7%A5%E7%A8%8B%E5%8C%96)/OCR(%E5%85%89%E5%AD%A6%E5%AD%97%E7%AC%A6%E8%AF%86%E5%88%AB).html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"OCR(光学字符识别)"}],["meta",{"property":"og:description","content":"OCR 全称是 Optical Character Recognition（光学字符识别）。 简单来说，OCR 是一种将“图片里的文字”物理转换为“计算机可以编辑、复制和检索的纯文本”的技术。 它的核心物理任务就是让机器“看懂”图像中的视觉像素符号，并将其映射为计算机底层的标准字符编码（如 UTF-8）。 在传统互联网和当今的 AI 大模型（RAG /..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":4.01,"words":1204},"filePathRelative":"posts/AI大模型/Agent应用开发/第三阶段_拥抱生态与框架_(工程化)/OCR(光学字符识别).md","excerpt":"<p><strong>OCR</strong> 全称是 <strong>Optical Character Recognition（光学字符识别）</strong>。</p>\\n<p>简单来说，<strong>OCR 是一种将“图片里的文字”物理转换为“计算机可以编辑、复制和检索的纯文本”的技术。</strong> 它的核心物理任务就是让机器“看懂”图像中的视觉像素符号，并将其映射为计算机底层的标准字符编码（如 UTF-8）。</p>\\n<p>在传统互联网和当今的 AI 大模型（RAG / 知识库数据清洗）领域，OCR 都是不可或缺的底层基础设施。</p>\\n<hr>\\n<h3>一、 传统 OCR 的物理工作流水线（Pipeline）</h3>","autoDesc":true}`),i={name:`OCR(光学字符识别).md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p><strong>OCR</strong> 全称是 <strong>Optical Character Recognition（光学字符识别）</strong>。</p>
<p>简单来说，<strong>OCR 是一种将“图片里的文字”物理转换为“计算机可以编辑、复制和检索的纯文本”的技术。</strong> 它的核心物理任务就是让机器“看懂”图像中的视觉像素符号，并将其映射为计算机底层的标准字符编码（如 UTF-8）。</p>
<p>在传统互联网和当今的 AI 大模型（RAG / 知识库数据清洗）领域，OCR 都是不可或缺的底层基础设施。</p>
<hr>
<h3 id="一、-传统-ocr-的物理工作流水线-pipeline" tabindex="-1"><a class="header-anchor" href="#一、-传统-ocr-的物理工作流水线-pipeline"><span>一、 传统 OCR 的物理工作流水线（Pipeline）</span></a></h3>
<p>传统 OCR 引擎（如经典的开源库 Tesseract，或者各大云厂商的印刷体识别接口）在后台处理一张图片（如发票扫描件、路牌照片）时，通常要走完以下四个硬核步骤：</p>
<ol>
<li><strong>前置图像预处理（Pre-processing）</strong>：<br>
刚输入的图片可能存在歪斜、暗光或噪点。OCR 引擎第一步会进行<strong>二值化处理（Binarization，把彩色图变成纯黑白二色图）</strong>、去噪点、以及几何校正（倾斜旋转矫正），物理调高文字与背景的对比度。</li>
<li><strong>版面分析与文字检测（Layout Analysis &amp; Text Detection）</strong>：<br>
算法需要先找出“字在哪里”。通过检测图像中的边缘特征，定位出一个个包含文字的物理矩形框（Bounding Box，简称 BBox），把文本行从背景中隔离出来。</li>
<li><strong>字符识别（Text Recognition）</strong>：<br>
针对切出来的文字行图片，提取几何特征或利用卷积神经网络（CNN）对每一个像素块进行概率打分，判断这个图形到底对应哪一个字母或汉字。</li>
<li><strong>后置语言校正（Post-processing）</strong>：<br>
由于单纯看图容易看错（比如把 <code v-pre>l</code> 认成 <code v-pre>1</code>），OCR 系统通常会挂载一个轻量级语言模型（N-gram），结合上下文词汇表进行纠错（比如如果前两个字是“计算”，那第三个图形概率上更有可能是“机”而不是“肌”）。</li>
</ol>
<hr>
<h3 id="二、-现代大模型时代-ocr-正在发生什么革命" tabindex="-1"><a class="header-anchor" href="#二、-现代大模型时代-ocr-正在发生什么革命"><span>二、 现代大模型时代：OCR 正在发生什么革命？</span></a></h3>
<p>如果你关注当下的大模型（LLM）与 RAG 知识库管道，你会发现 <strong>传统 OCR 正在被“原生多模态大模型（Native Multimodal Models）”全面降维打击和跨代融合</strong>。</p>
<h4 id="传统-ocr-的致命死穴" tabindex="-1"><a class="header-anchor" href="#传统-ocr-的致命死穴"><span>传统 OCR 的致命死穴：</span></a></h4>
<p>面对复杂的论文、排版多变的技术白皮书，传统 OCR 是“盲人摸象”。它虽然能认出单字，但它<strong>看不懂双栏排版、看不懂复杂的公式矩阵、更无法还原表格的行列对应关系</strong>。最终提取出的文本往往顺序错乱、逻辑穿行，直接导致下游的 RAG 向量检索（Embedding）彻底报废。</p>
<h4 id="现代多模态-vision-ocr-的破局" tabindex="-1"><a class="header-anchor" href="#现代多模态-vision-ocr-的破局"><span>现代多模态 Vision-OCR 的破局：</span></a></h4>
<p>现在的 RAG 前端数据提取工程（如大名鼎鼎的 <strong>MinerU</strong>、<strong>Marker</strong> 或是 <strong>Qwen-VL</strong> 视觉模型），不再使用死板的字形比对，而是使用<strong>端到端的多模态网络（VLM）</strong>：</p>
<ul>
<li><strong>做法</strong>：直接把一整页 PDF 或图片当成“像素序列”喂给视觉大模型。</li>
<li><strong>物理效果</strong>：模型不仅能瞬间“读出”里面的文字，还能<strong>直接把图片无损编译成包含完美排版排布的 Markdown 源码</strong>。图表会被自动剥离，公式会被当场翻译成标准的 LaTeX 表达式（如 <code v-pre>$E=mc^2$</code>），双栏布局会被自动理顺。这极大地提升了大数据量下长文本切片入库的质量。</li>
</ul>
<hr>
<h3 id="三、-工业落地常见的-ocr-技术选型" tabindex="-1"><a class="header-anchor" href="#三、-工业落地常见的-ocr-技术选型"><span>三、 工业落地常见的 OCR 技术选型</span></a></h3>
<p>在日常开发或 Infra 建设中，根据不同的 ROI（投资回报率）和场景，有三种主流选型：</p>
<ol>
<li><strong>开源自部署派（Tesseract / PaddleOCR）</strong>：</li>
</ol>
<ul>
<li><strong>PaddleOCR</strong> 是目前国内开源界极度推崇的明星项目，基于飞桨底座，对中文印刷体、手写体、增值税发票的识别准确率非常恐怖，且运行速度极快，适合做单机大批量发票、车牌、身份证的后台纯自动化流水线解析。</li>
</ul>
<ol start="2">
<li><strong>商业云 API 派（阿里云/腾讯云 OCR、合合信息 TextIn）</strong>：</li>
</ol>
<ul>
<li>针对特定垂直场景（如复杂的表格财务报表、营业执照识别），商业级 OCR SDK 封装了极其变态的领域规则引擎，能直接吐出严丝合缝的结构化数据（JSON），省去了复杂的后置清洗逻辑。</li>
</ul>
<ol start="3">
<li><strong>大模型多模态解析派（MinerU / Got-OCR）</strong>：</li>
</ol>
<ul>
<li>如果你的终极任务是<strong>为大模型构建 RAG 知识库</strong>，优先选择这类基于视觉的文档解析工具（Document Layout Analysis）。它们是专门为了“喂饱大模型上下文”而生的新时代 OCR 架构。</li>
</ul>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};