import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E9%9D%A2%E8%AF%95/AI%E7%9F%A5%E8%AF%86/RAG_vs_Fine-tuning.html","title":"RAG_vs_Fine-tuning","lang":"zh-CN","frontmatter":{"title":"RAG_vs_Fine-tuning","icon":"clipboard-text","date":"2026-07-23T00:00:00.000Z","category":["面试"],"description":"知识注入：RAG vs Fine-tuning 如果你想让 AI 知道你博客 ZH-Kinger 里的私有部署文档，你有两种方法： Fine-tuning (微调)：把文档喂给模型，重新训练它的“大脑”。 缺点：贵，更新慢。就像让专家把你的书背下来。 RAG (检索增强生成 - Retrieval-Augmented Generation)：这是目前的...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"RAG_vs_Fine-tuning\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E9%9D%A2%E8%AF%95/AI%E7%9F%A5%E8%AF%86/RAG_vs_Fine-tuning.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"RAG_vs_Fine-tuning"}],["meta",{"property":"og:description","content":"知识注入：RAG vs Fine-tuning 如果你想让 AI 知道你博客 ZH-Kinger 里的私有部署文档，你有两种方法： Fine-tuning (微调)：把文档喂给模型，重新训练它的“大脑”。 缺点：贵，更新慢。就像让专家把你的书背下来。 RAG (检索增强生成 - Retrieval-Augmented Generation)：这是目前的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":0.6,"words":180},"filePathRelative":"posts/面试/字节面试/AI知识/RAG_vs_Fine-tuning.md","excerpt":"<h2>知识注入：RAG vs Fine-tuning</h2>\\n<p>如果你想让 AI 知道你博客 <strong>ZH-Kinger</strong> 里的私有部署文档，你有两种方法：</p>\\n<ul>\\n<li>\\n<p><strong>Fine-tuning (微调)</strong>：把文档喂给模型，重新训练它的“大脑”。</p>\\n</li>\\n<li>\\n<p><em>缺点</em>：贵，更新慢。就像让专家把你的书背下来。</p>\\n</li>\\n<li>\\n<p><strong>RAG (检索增强生成 - Retrieval-Augmented Generation)</strong>：<strong>这是目前的绝对主流</strong>。</p>\\n</li>\\n<li>\\n<p><em>原理</em>：AI 并不背你的文档，而是当你提问时，它先去你的文档库（向量数据库）里“翻书”，把找到的相关内容贴在 Prompt 里一起发给大脑。</p>\\n</li>\\n<li>\\n<p><em>比喻</em>：给 AI 准备了一台能联网的电脑和一套开卷考试的资料。</p>\\n</li>\\n</ul>","autoDesc":true}`),i={name:`RAG_vs_Fine-tuning.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><h2 id="知识注入-rag-vs-fine-tuning" tabindex="-1"><a class="header-anchor" href="#知识注入-rag-vs-fine-tuning"><span>知识注入：RAG vs Fine-tuning</span></a></h2>
<p>如果你想让 AI 知道你博客 <strong>ZH-Kinger</strong> 里的私有部署文档，你有两种方法：</p>
<ul>
<li>
<p><strong>Fine-tuning (微调)</strong>：把文档喂给模型，重新训练它的“大脑”。</p>
</li>
<li>
<p><em>缺点</em>：贵，更新慢。就像让专家把你的书背下来。</p>
</li>
<li>
<p><strong>RAG (检索增强生成 - Retrieval-Augmented Generation)</strong>：<strong>这是目前的绝对主流</strong>。</p>
</li>
<li>
<p><em>原理</em>：AI 并不背你的文档，而是当你提问时，它先去你的文档库（向量数据库）里“翻书”，把找到的相关内容贴在 Prompt 里一起发给大脑。</p>
</li>
<li>
<p><em>比喻</em>：给 AI 准备了一台能联网的电脑和一套开卷考试的资料。</p>
</li>
</ul>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};