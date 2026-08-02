import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E5%BC%80%E5%8F%91/%E9%A1%B9%E7%9B%AE%E7%BB%93%E6%9E%84%E5%88%86%E6%9E%90.html","title":"项目结构分析","lang":"zh-CN","frontmatter":{"title":"项目结构分析","icon":"code","date":"2026-07-23T00:00:00.000Z","category":["开发"],"description":"VuePress 是以 Markdown 为中心的。你项目中的每一个 Markdown 文件都是一个单独的页面。 默认情况下，页面的路由路径是根据你的 Markdown 文件的相对路径决定的。 由于你的项目是通过创建助手生成的，那么你会得到以下文件结构: 项目结构 你的 Markdown 文件对应的路由路径为: README.md README.md ...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"项目结构分析\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/%E9%A1%B9%E7%9B%AE%E7%BB%93%E6%9E%84%E5%88%86%E6%9E%90-1.png\\",\\"https://venking.tech/blog/blog/assets/posts/%E9%A1%B9%E7%9B%AE%E7%BB%93%E6%9E%84%E5%88%86%E6%9E%90-2.png\\",\\"https://venking.tech/blog/blog/assets/posts/%E9%A1%B9%E7%9B%AE%E7%BB%93%E6%9E%84%E5%88%86%E6%9E%90-3.png\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E5%BC%80%E5%8F%91/%E9%A1%B9%E7%9B%AE%E7%BB%93%E6%9E%84%E5%88%86%E6%9E%90.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"项目结构分析"}],["meta",{"property":"og:description","content":"VuePress 是以 Markdown 为中心的。你项目中的每一个 Markdown 文件都是一个单独的页面。 默认情况下，页面的路由路径是根据你的 Markdown 文件的相对路径决定的。 由于你的项目是通过创建助手生成的，那么你会得到以下文件结构: 项目结构 你的 Markdown 文件对应的路由路径为: README.md README.md ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/%E9%A1%B9%E7%9B%AE%E7%BB%93%E6%9E%84%E5%88%86%E6%9E%90-1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":10.84,"words":3252},"filePathRelative":"posts/开发/项目结构分析.md","excerpt":"<p>VuePress 是以 Markdown 为中心的。你项目中的每一个 Markdown 文件都是一个单独的页面。</p>\\n<p>默认情况下，页面的路由路径是根据你的 Markdown 文件的相对路径决定的。</p>\\n<p>由于你的项目是通过创建助手生成的，那么你会得到以下文件结构:</p>\\n<h2>项目结构</h2>\\n<div class=\\"language-plain line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"plain\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code class=\\"language-plain\\"><span class=\\"line\\"><span>ZH-Kinger/</span></span>\\n<span class=\\"line\\"><span>├── .github/              # GitHub Actions 自动化部署配置（可选）</span></span>\\n<span class=\\"line\\"><span>├── node_modules/         # [核心] 项目依赖包（VuePress 实体就在这里）</span></span>\\n<span class=\\"line\\"><span>├── src/                  # [核心] 你的源文件目录</span></span>\\n<span class=\\"line\\"><span>│   ├── .vuepress/        # [核心] VuePress 特有配置文件夹</span></span>\\n<span class=\\"line\\"><span>│   │   ├── public/       # 静态资源（本地图片、图标、favicon）</span></span>\\n<span class=\\"line\\"><span>│   │   ├── config.ts     # 站点总配置文件（基础路径、语言、head等）</span></span>\\n<span class=\\"line\\"><span>│   │   ├── navbar.ts     # 顶部导航栏配置</span></span>\\n<span class=\\"line\\"><span>│   │   ├── sidebar.ts    # 侧边栏配置</span></span>\\n<span class=\\"line\\"><span>│   │   └── theme.ts      # 主题深度配置（颜色、插件、博主信息）</span></span>\\n<span class=\\"line\\"><span>│   ├── demo/             # 示例文章文件夹（后续可以删除）</span></span>\\n<span class=\\"line\\"><span>│   ├── posts/            # 你的博文存放目录</span></span>\\n<span class=\\"line\\"><span>│   │   ├── apple/        # 子分类文件夹</span></span>\\n<span class=\\"line\\"><span>│   │   └── nginx.md      # 具体文章文件</span></span>\\n<span class=\\"line\\"><span>│   └── README.md         # 博客主页内容</span></span>\\n<span class=\\"line\\"><span>├── package.json          # [核心] 项目脚本(npm run)和版本信息</span></span>\\n<span class=\\"line\\"><span>├── tsconfig.json         # TypeScript 配置文件</span></span>\\n<span class=\\"line\\"><span>└── package-lock.json     # 依赖锁定文件</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`),i={name:`项目结构分析.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>VuePress 是以 Markdown 为中心的。你项目中的每一个 Markdown 文件都是一个单独的页面。</p>
<p>默认情况下，页面的路由路径是根据你的 Markdown 文件的相对路径决定的。</p>
<p>由于你的项目是通过创建助手生成的，那么你会得到以下文件结构:</p>
<h2 id="项目结构" tabindex="-1"><a class="header-anchor" href="#项目结构"><span>项目结构</span></a></h2>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>ZH-Kinger/</span></span>
<span class="line"><span>├── .github/              # GitHub Actions 自动化部署配置（可选）</span></span>
<span class="line"><span>├── node_modules/         # [核心] 项目依赖包（VuePress 实体就在这里）</span></span>
<span class="line"><span>├── src/                  # [核心] 你的源文件目录</span></span>
<span class="line"><span>│   ├── .vuepress/        # [核心] VuePress 特有配置文件夹</span></span>
<span class="line"><span>│   │   ├── public/       # 静态资源（本地图片、图标、favicon）</span></span>
<span class="line"><span>│   │   ├── config.ts     # 站点总配置文件（基础路径、语言、head等）</span></span>
<span class="line"><span>│   │   ├── navbar.ts     # 顶部导航栏配置</span></span>
<span class="line"><span>│   │   ├── sidebar.ts    # 侧边栏配置</span></span>
<span class="line"><span>│   │   └── theme.ts      # 主题深度配置（颜色、插件、博主信息）</span></span>
<span class="line"><span>│   ├── demo/             # 示例文章文件夹（后续可以删除）</span></span>
<span class="line"><span>│   ├── posts/            # 你的博文存放目录</span></span>
<span class="line"><span>│   │   ├── apple/        # 子分类文件夹</span></span>
<span class="line"><span>│   │   └── nginx.md      # 具体文章文件</span></span>
<span class="line"><span>│   └── README.md         # 博客主页内容</span></span>
<span class="line"><span>├── package.json          # [核心] 项目脚本(npm run)和版本信息</span></span>
<span class="line"><span>├── tsconfig.json         # TypeScript 配置文件</span></span>
<span class="line"><span>└── package-lock.json     # 依赖锁定文件</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你的 Markdown 文件对应的路由路径为:</p>
<table>
<thead>
<tr>
<th>相对路径</th>
<th>路由路径</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>/README.md</code></td>
<td><code v-pre>/</code></td>
</tr>
<tr>
<td><code v-pre>/demo/README.md</code></td>
<td><code v-pre>/demo/</code></td>
</tr>
<tr>
<td><code v-pre>/demo/page.md</code></td>
<td><code v-pre>/demo/page.html</code></td>
</tr>
</tbody>
</table>
<p><strong><a href="http://README.md" target="_blank" rel="noopener noreferrer">README.md</a></strong></p>
<p><code v-pre>README.md</code> 是特例，在 Markdown 中，按照约定俗成，它会作为所在文件夹的主页。所以在渲染为网页时，它的对应路径为网页中的主页路径 <code v-pre>index.html</code>。</p>
<p>这应该很好理解。</p>
<p>​</p>
<h2 id="配置文件介绍" tabindex="-1"><a class="header-anchor" href="#配置文件介绍"><span>配置文件介绍</span></a></h2>
<h3 id="src-readme-md-主页配置文件" tabindex="-1"><a class="header-anchor" href="#src-readme-md-主页配置文件"><span>src/README.md（主页配置文件）</span></a></h3>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>---</span></span>
<span class="line"><span>home: true</span></span>
<span class="line"><span>layout: Blog</span></span>
<span class="line"><span>title: ZH-Kinger		#标题</span></span>
<span class="line"><span>heroImage: /assets/images/logo.png					#头像图标</span></span>
<span class="line"><span>bgImage: /assets/images/cover4.jpg					#背景图</span></span>
<span class="line"><span>heroText: 王梓涵	</span></span>
<span class="line"><span>heroFullScreen: true</span></span>
<span class="line"><span>tagline: Without Mercy</span></span>
<span class="line"><span>projects:</span></span>
<span class="line"><span>  - icon: folder-open</span></span>
<span class="line"><span>    name: 项目名称</span></span>
<span class="line"><span>    desc: 项目详细描述</span></span>
<span class="line"><span>    link: https://你的项目链接</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  - icon: link</span></span>
<span class="line"><span>    name: 链接名称</span></span>
<span class="line"><span>    desc: 链接详细描述</span></span>
<span class="line"><span>    link: https://链接地址</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  - icon: book</span></span>
<span class="line"><span>    name: 书籍名称</span></span>
<span class="line"><span>    desc: 书籍详细描述</span></span>
<span class="line"><span>    link: https://你的书籍链接</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  - icon: newspaper</span></span>
<span class="line"><span>    name: 文章名称</span></span>
<span class="line"><span>    desc: 文章详细描述</span></span>
<span class="line"><span>    link: https://你的文章链接</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  - icon: user-group</span></span>
<span class="line"><span>    name: 伙伴名称</span></span>
<span class="line"><span>    desc: 伙伴详细介绍</span></span>
<span class="line"><span>    link: https://你的伙伴链接</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  - icon: https://theme-hope-assets.vuejs.press/logo.svg</span></span>
<span class="line"><span>    name: 自定义项目</span></span>
<span class="line"><span>    desc: 自定义详细介绍</span></span>
<span class="line"><span>    link: https://你的自定义链接</span></span>
<span class="line"><span></span></span>
<span class="line"><span>footer: 自定义你的页脚文字</span></span>
<span class="line"><span>---</span></span>
<span class="line"><span></span></span>
<span class="line"><span>这是一个博客主页的案例。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>要使用此布局，你应该在页面前端设置 \`layout: Blog\` 和 \`home: true\`。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>相关配置文档请见 [博客主页](https://theme-hope.vuejs.press/zh/guide/blog/home.html)。</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="配置项功能解析" tabindex="-1"><a class="header-anchor" href="#配置项功能解析"><span>配置项功能解析</span></a></h4>
<h4 id="_1-基础布局与身份定义" tabindex="-1"><a class="header-anchor" href="#_1-基础布局与身份定义"><span>1. 基础布局与身份定义</span></a></h4>
<ul>
<li><code v-pre>**home: true**</code>: 告诉 VuePress 这不是一篇普通文章，而是一个<strong>特殊的首页</strong>。</li>
<li><code v-pre>**layout: Blog**</code>: 指定使用“博客布局”。这会启用大图背景、博主信息卡片和文章列表。</li>
<li><code v-pre>**icon: house**</code>: 在浏览器标签页或路径导航中显示的首页图标。</li>
<li><code v-pre>**title: ZH-Kinger**</code>: 网页的标题，显示在浏览器最上方的标签栏。</li>
</ul>
<hr>
<h4 id="_2-视觉门面-hero-部分" tabindex="-1"><a class="header-anchor" href="#_2-视觉门面-hero-部分"><span>2. 视觉门面（Hero 部分）</span></a></h4>
<p>这部分控制首页中间那块巨大的背景和文字。</p>
<ul>
<li><code v-pre>**heroImage**</code>: 你的 Logo。<code v-pre>/assets/images/logo.png</code> 指向的是项目里 <code v-pre>public</code> 文件夹下的图片。</li>
<li><code v-pre>**bgImage**</code>: 首页的全屏背景图。建议找一张高清、不刺眼的图。</li>
<li><code v-pre>**heroText**</code>: 你的大名，会以最醒目的字体显示在屏幕中间。</li>
<li><code v-pre>**heroFullScreen: true**</code>: 背景图是否撑满整个屏幕。如果设为 <code v-pre>false</code>，背景图会变矮。</li>
<li><code v-pre>**tagline**</code>: 你的<strong>座右铭</strong>或简短自我介绍，显示在大名下方。</li>
<li><img src="/blog/assets/posts/%E9%A1%B9%E7%9B%AE%E7%BB%93%E6%9E%84%E5%88%86%E6%9E%90-1.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></li>
</ul>
<hr>
<h4 id="_3-项目展示栏-projects" tabindex="-1"><a class="header-anchor" href="#_3-项目展示栏-projects"><span>3. 项目展示栏（Projects）</span></a></h4>
<p>这是一个非常有用的展示区域，可以链接到你的 GitHub、作品集或推荐资源。</p>
<ul>
<li><code v-pre>**projects**</code>: 一个列表数组。</li>
<li><code v-pre>**icon**</code>: 图标。支持图标库名字（如 <code v-pre>folder-open</code>）或图片链接。</li>
<li><code v-pre>**name**</code>: 项目的小标题。</li>
<li><code v-pre>**desc**</code>: 对项目的简短描述（一行字左右）。</li>
<li><code v-pre>**link**</code>: 点击后跳转到的地址。</li>
</ul>
<p><strong>💡</strong> <strong>建议</strong>：如果你目前还没有这么多项目，可以先删掉多余的部分，只留下一两个重要的链接。</p>
<figure><img src="/blog/assets/posts/%E9%A1%B9%E7%9B%AE%E7%BB%93%E6%9E%84%E5%88%86%E6%9E%90-2.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<hr>
<h4 id="_4-底部信息-footer" tabindex="-1"><a class="header-anchor" href="#_4-底部信息-footer"><span>4. 底部信息（Footer）</span></a></h4>
<ul>
<li><code v-pre>**footer**</code>: 页面最底部的版权信息或备案号。</li>
</ul>
<h2 id="页面元素配置" tabindex="-1"><a class="header-anchor" href="#页面元素配置"><span>页面元素配置</span></a></h2>
<h3 id="config-ts-网页配置文件" tabindex="-1"><a class="header-anchor" href="#config-ts-网页配置文件"><span>config.ts（网页配置文件）</span></a></h3>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>import { defineUserConfig } from "vuepress";</span></span>
<span class="line"><span>import theme from "./theme.js";</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default defineUserConfig({</span></span>
<span class="line"><span>  base: "/blog/",				#默认是/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  lang: "zh-CN",</span></span>
<span class="line"><span>  title: "博客blog",</span></span>
<span class="line"><span>  description: "vuepress-theme-hope 的博客blog",</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  theme,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 添加以下 head 配置来解决语雀图片不显示的问题</span></span>
<span class="line"><span>  head: [</span></span>
<span class="line"><span>    [</span></span>
<span class="line"><span>      "meta",</span></span>
<span class="line"><span>      { name: "referrer", content: "no-referrer" }</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 和 PWA 一起启用</span></span>
<span class="line"><span>  // shouldPrefetch: false,</span></span>
<span class="line"><span>});</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="格式错误问题" tabindex="-1"><a class="header-anchor" href="#格式错误问题"><span>格式错误问题</span></a></h4>
<p>刚开始进入时格式可能乱码大概率时BaseUrl的问题</p>
<p>构建时的默认BaseUrl是 /</p>
<p>我们要将它修改为/blog/</p>
<h4 id="图片配置解决md文件外部链接图片加载失败问题" tabindex="-1"><a class="header-anchor" href="#图片配置解决md文件外部链接图片加载失败问题"><span>图片配置解决md文件外部链接图片加载失败问题</span></a></h4>
<h5 id="如何让-vuepress-直接-加载出来" tabindex="-1"><a class="header-anchor" href="#如何让-vuepress-直接-加载出来"><span>如何让 VuePress “直接”加载出来？</span></a></h5>
<p>如果你坚持不想下载图片到本地，可以通过修改 VuePress 配置，告诉浏览器 <strong>“不要告诉对方我是谁”</strong>，从而绕过防盗链限制。</p>
<h5 id="修改方法" tabindex="-1"><a class="header-anchor" href="#修改方法"><span>修改方法：</span></a></h5>
<p>打开你的配置文件：<code v-pre>**src/.vuepress/config.ts**</code>（或者是 <code v-pre>.vuepress/config.js</code>），在 <code v-pre>head</code> 部分添加一行代码：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>export default {</span></span>
<span class="line"><span>  // ... 其他配置</span></span>
<span class="line"><span>  head: [</span></span>
<span class="line"><span>    // 核心代码：强制浏览器不发送 Referer 信息</span></span>
<span class="line"><span>    ['meta', { name: 'referrer', content: 'no-referrer' }]</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>  // ...</span></span>
<span class="line"><span>}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>原理：</strong> 设置 <code v-pre>no-referrer</code> 后，浏览器在加载图片时会隐藏你的网站信息，语雀服务器就会像你手动输入链接一样，认为这是合法请求，图片就能直接显示了。</p>
<h3 id="navbar-ts-顶栏组件" tabindex="-1"><a class="header-anchor" href="#navbar-ts-顶栏组件"><span>navbar.ts（顶栏组件）</span></a></h3>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>import { navbar } from "vuepress-theme-hope";</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default navbar([</span></span>
<span class="line"><span>  "/",</span></span>
<span class="line"><span>  "/demo/",</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    text: "博文",</span></span>
<span class="line"><span>    icon: "pen-to-square",</span></span>
<span class="line"><span>    prefix: "/posts/",</span></span>
<span class="line"><span>    children: [</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        text: "苹果",</span></span>
<span class="line"><span>        icon: "pen-to-square",</span></span>
<span class="line"><span>        prefix: "apple/",</span></span>
<span class="line"><span>        children: [</span></span>
<span class="line"><span>          { text: "苹果1", icon: "pen-to-square", link: "1" },</span></span>
<span class="line"><span>          { text: "苹果2", icon: "pen-to-square", link: "2" },</span></span>
<span class="line"><span>          "3",</span></span>
<span class="line"><span>          "4",</span></span>
<span class="line"><span>        ],</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        text: "香蕉",</span></span>
<span class="line"><span>        icon: "pen-to-square",</span></span>
<span class="line"><span>        prefix: "banana/",</span></span>
<span class="line"><span>        children: [</span></span>
<span class="line"><span>          {</span></span>
<span class="line"><span>            text: "香蕉 1",</span></span>
<span class="line"><span>            icon: "pen-to-square",</span></span>
<span class="line"><span>            link: "1",</span></span>
<span class="line"><span>          },</span></span>
<span class="line"><span>          {</span></span>
<span class="line"><span>            text: "香蕉 2",</span></span>
<span class="line"><span>            icon: "pen-to-square",</span></span>
<span class="line"><span>            link: "2",</span></span>
<span class="line"><span>          },</span></span>
<span class="line"><span>          "3",</span></span>
<span class="line"><span>          "4",</span></span>
<span class="line"><span>        ],</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      { text: "樱桃", icon: "pen-to-square", link: "cherry" },</span></span>
<span class="line"><span>      { text: "火龙果", icon: "pen-to-square", link: "dragonfruit" },</span></span>
<span class="line"><span>      "服务器资源预警平台",</span></span>
<span class="line"><span>      "web开发教程",</span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    text: "V2 文档",</span></span>
<span class="line"><span>    icon: "book",</span></span>
<span class="line"><span>    link: "https://theme-hope.vuejs.press/zh/",</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>]);</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="sidebar-ts-侧栏-下拉栏" tabindex="-1"><a class="header-anchor" href="#sidebar-ts-侧栏-下拉栏"><span>sidebar.ts（侧栏/下拉栏）</span></a></h3>
<h4 id="_1-核心功能" tabindex="-1"><a class="header-anchor" href="#_1-核心功能"><span>1. 核心功能</span></a></h4>
<ul>
<li><strong>文章导航</strong>：展示当前栏目下的所有文章标题，方便用户快速跳转。</li>
<li><strong>目录分组</strong>：可以将文章按照文件夹或主题进行分组（如：Python、Nginx、生活随笔）。</li>
<li><strong>多级折叠</strong>：支持创建多级嵌套菜单，点击父级可以展开或收起子项目。</li>
<li><strong>自动/手动生成</strong>：既可以让 VuePress 自动扫描文件夹生成目录，也可以由你手动指定显示的顺序。</li>
</ul>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>import { sidebar } from "vuepress-theme-hope";</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default sidebar({</span></span>
<span class="line"><span>  "/": [</span></span>
<span class="line"><span>    "",</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      text: "如何使用",</span></span>
<span class="line"><span>      icon: "laptop-code",</span></span>
<span class="line"><span>      prefix: "demo/",</span></span>
<span class="line"><span>      link: "demo/",</span></span>
<span class="line"><span>      children: "structure",</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      text: "文章",</span></span>
<span class="line"><span>      icon: "book",</span></span>
<span class="line"><span>      prefix: "posts/",</span></span>
<span class="line"><span>      children: "structure",				#自动获取你的md文件</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    "intro",</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      text: "幻灯片",</span></span>
<span class="line"><span>      icon: "person-chalkboard",</span></span>
<span class="line"><span>      link: "https://ecosystem.vuejs.press/zh/plugins/markdown/revealjs/demo.html",</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>});</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="theme-ts-主页面配置" tabindex="-1"><a class="header-anchor" href="#theme-ts-主页面配置"><span>theme.ts（主页面配置）</span></a></h3>
<h4 id="_1-核心功能配置" tabindex="-1"><a class="header-anchor" href="#_1-核心功能配置"><span>1. 核心功能配置</span></a></h4>
<ul>
<li><strong>博主信息设置</strong>：配置你（author）在首页和侧边栏显示的头像(logo)、昵称(name)、座右铭以及社交媒体链接（blog如 GitHub、知乎等）。</li>
<li><strong>博客属性开关</strong>：控制是否开启文章列表页、时间轴、分类和标签功能。</li>
<li><strong>外观定制</strong>：设置网站的主题色、是否允许暗黑模式切换、以及页脚（Footer）的默认显示内容。</li>
</ul>
<hr>
<h4 id="_2-插件中心-plugins" tabindex="-1"><a class="header-anchor" href="#_2-插件中心-plugins"><span>2. 插件中心（Plugins）</span></a></h4>
<p><code v-pre>theme.ts</code> 内部通常包含一个巨大的 <code v-pre>plugins</code> 对象，用来开启或关闭强大的内置功能：</p>
<ul>
<li><strong>搜索功能</strong>：配置搜索插件（如本地搜索或 DocSearch）。</li>
<li><strong>Markdown 增强</strong>：开启公式（LaTeX）、流程图（Mermaid）、代码块选项卡、交互式演示等。</li>
<li><strong>组件支持</strong>：是否允许在 Markdown 里使用图标、视频播放器、PDF 预览等组件。</li>
<li><strong>复制保护</strong>：设置代码块的一键复制功能，或者为文章添加版权后缀。</li>
</ul>
<hr>
<h4 id="_3-配置示例拆解" tabindex="-1"><a class="header-anchor" href="#_3-配置示例拆解"><span>3. 配置示例拆解</span></a></h4>
<p>你的 <code v-pre>theme.ts</code> 代码结构通常如下：</p>
<hr>
<h4 id="它与其他文件的关系" tabindex="-1"><a class="header-anchor" href="#它与其他文件的关系"><span>它与其他文件的关系</span></a></h4>
<ol>
<li><code v-pre>**config.ts**</code> <strong>调用它</strong>：<code v-pre>config.ts</code> 会导入 <code v-pre>theme.ts</code> 生成的主题配置并应用到站点。</li>
<li><code v-pre>**navbar.ts**</code> <strong>和</strong> <code v-pre>**sidebar.ts**</code> <strong>被它引用</strong>：为了让代码不那么臃肿，导航栏和侧边栏的细节通常写在独立文件里，然后在 <code v-pre>theme.ts</code> 中被 <code v-pre>import</code> 进来。</li>
</ol>
<p><strong>简单总结</strong>：如果你想修改<strong>博主头像、更改全站配色、或者开启流程图/公式支持</strong>，直接去 <code v-pre>theme.ts</code> 里找对应的配置项即可。</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>import { hopeTheme } from "vuepress-theme-hope";</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import navbar from "./navbar.js";</span></span>
<span class="line"><span>import sidebar from "./sidebar.js";</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default hopeTheme({</span></span>
<span class="line"><span>  hostname: "https://mister-hope.github.io",</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  author: {</span></span>
<span class="line"><span>    name: "王梓涵",</span></span>
<span class="line"><span>    url: "https://mister-hope.com",</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  logo: "/assets/images/logo.png",</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  repo: "vuepress-theme-hope/vuepress-theme-hope",</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  docsDir: "src",</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 导航栏</span></span>
<span class="line"><span>  navbar,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 侧边栏</span></span>
<span class="line"><span>  sidebar,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 页脚</span></span>
<span class="line"><span>  footer: "默认页脚",</span></span>
<span class="line"><span>  displayFooter: true,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 博客相关</span></span>
<span class="line"><span>  blog: {</span></span>
<span class="line"><span>    description: "一个前端开发者",</span></span>
<span class="line"><span>    intro: "/intro.html",</span></span>
<span class="line"><span>    medias: {</span></span>
<span class="line"><span>      Baidu: "https://example.com",</span></span>
<span class="line"><span>      BiliBili: "https://example.com",</span></span>
<span class="line"><span>      Bitbucket: "https://example.com",</span></span>
<span class="line"><span>      Dingding: "https://example.com",</span></span>
<span class="line"><span>      Discord: "https://example.com",</span></span>
<span class="line"><span>      Dribbble: "https://example.com",</span></span>
<span class="line"><span>      Email: "mailto:info@example.com",</span></span>
<span class="line"><span>      Evernote: "https://example.com",</span></span>
<span class="line"><span>      Facebook: "https://example.com",</span></span>
<span class="line"><span>      Flipboard: "https://example.com",</span></span>
<span class="line"><span>      Gitee: "https://example.com",</span></span>
<span class="line"><span>      GitHub: "https://example.com",</span></span>
<span class="line"><span>      Gitlab: "https://example.com",</span></span>
<span class="line"><span>      Gmail: "mailto:info@example.com",</span></span>
<span class="line"><span>      Instagram: "https://example.com",</span></span>
<span class="line"><span>      Lark: "https://example.com",</span></span>
<span class="line"><span>      Lines: "https://example.com",</span></span>
<span class="line"><span>      Linkedin: "https://example.com",</span></span>
<span class="line"><span>      Pinterest: "https://example.com",</span></span>
<span class="line"><span>      Pocket: "https://example.com",</span></span>
<span class="line"><span>      QQ: "https://example.com",</span></span>
<span class="line"><span>      Qzone: "https://example.com",</span></span>
<span class="line"><span>      Reddit: "https://example.com",</span></span>
<span class="line"><span>      Rss: "https://example.com",</span></span>
<span class="line"><span>      Steam: "https://example.com",</span></span>
<span class="line"><span>      Twitter: "https://example.com",</span></span>
<span class="line"><span>      Wechat: "https://example.com",</span></span>
<span class="line"><span>      Weibo: "https://example.com",</span></span>
<span class="line"><span>      Whatsapp: "https://example.com",</span></span>
<span class="line"><span>      Youtube: "https://example.com",</span></span>
<span class="line"><span>      Zhihu: "https://example.com",</span></span>
<span class="line"><span>      VuePressThemeHope: {</span></span>
<span class="line"><span>        icon: "https://theme-hope-assets.vuejs.press/logo.svg",</span></span>
<span class="line"><span>        link: "https://theme-hope.vuejs.press",</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 加密配置</span></span>
<span class="line"><span>  encrypt: {</span></span>
<span class="line"><span>    config: {</span></span>
<span class="line"><span>      "/demo/encrypt.html": {</span></span>
<span class="line"><span>        hint: "Password: 1234",</span></span>
<span class="line"><span>        password: "1234",</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 多语言配置</span></span>
<span class="line"><span>  metaLocales: {</span></span>
<span class="line"><span>    editLink: "在 GitHub 上编辑此页",</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 如果想要实时查看任何改变，启用它。注: 这对更新性能有很大负面影响</span></span>
<span class="line"><span>  // hotReload: true,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 此处开启了很多功能用于演示，你应仅保留用到的功能。</span></span>
<span class="line"><span>  markdown: {</span></span>
<span class="line"><span>    align: true,</span></span>
<span class="line"><span>    attrs: true,</span></span>
<span class="line"><span>    codeTabs: true,</span></span>
<span class="line"><span>    component: true,</span></span>
<span class="line"><span>    demo: true,</span></span>
<span class="line"><span>    figure: true,</span></span>
<span class="line"><span>    gfm: true,</span></span>
<span class="line"><span>    imgLazyload: true,</span></span>
<span class="line"><span>    imgSize: true,</span></span>
<span class="line"><span>    include: true,</span></span>
<span class="line"><span>    mark: true,</span></span>
<span class="line"><span>    plantuml: true,</span></span>
<span class="line"><span>    spoiler: true,</span></span>
<span class="line"><span>    stylize: [</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        matcher: "Recommended",</span></span>
<span class="line"><span>        replacer: ({ tag }) => {</span></span>
<span class="line"><span>          if (tag === "em")</span></span>
<span class="line"><span>            return {</span></span>
<span class="line"><span>              tag: "Badge",</span></span>
<span class="line"><span>              attrs: { type: "tip" },</span></span>
<span class="line"><span>              content: "Recommended",</span></span>
<span class="line"><span>            };</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span>    sub: true,</span></span>
<span class="line"><span>    sup: true,</span></span>
<span class="line"><span>    tabs: true,</span></span>
<span class="line"><span>    tasklist: true,</span></span>
<span class="line"><span>    vPre: true,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 取消注释它们如果你需要 TeX 支持</span></span>
<span class="line"><span>    // math: {</span></span>
<span class="line"><span>    //   // 启用前安装 katex</span></span>
<span class="line"><span>    //   type: "katex",</span></span>
<span class="line"><span>    //   // 或者安装 @mathjax/src</span></span>
<span class="line"><span>    //   type: "mathjax",</span></span>
<span class="line"><span>    // },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 如果你需要幻灯片，安装 @vuepress/plugin-revealjs 并取消下方注释</span></span>
<span class="line"><span>    // revealjs: {</span></span>
<span class="line"><span>    //   plugins: ["highlight", "math", "search", "notes", "zoom"],</span></span>
<span class="line"><span>    // },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 在启用之前安装 chart.js</span></span>
<span class="line"><span>    // chartjs: true,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // insert component easily</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 在启用之前安装 echarts</span></span>
<span class="line"><span>    // echarts: true,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 在启用之前安装 flowchart.ts</span></span>
<span class="line"><span>    // flowchart: true,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 在启用之前安装 mermaid</span></span>
<span class="line"><span>    // mermaid: true,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // playground: {</span></span>
<span class="line"><span>    //   presets: ["ts", "vue"],</span></span>
<span class="line"><span>    // },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 在启用之前安装 @vue/repl</span></span>
<span class="line"><span>    // vuePlayground: true,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 在启用之前安装 sandpack-vue3</span></span>
<span class="line"><span>    // sandpack: true,</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 在这里配置主题提供的插件</span></span>
<span class="line"><span>  plugins: {</span></span>
<span class="line"><span>    blog: true,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 启用之前需安装 @waline/client</span></span>
<span class="line"><span>    // 警告: 这是一个仅供演示的测试服务，在生产环境中请自行部署并使用自己的服务！</span></span>
<span class="line"><span>    // comment: {</span></span>
<span class="line"><span>    //   provider: "Waline",</span></span>
<span class="line"><span>    //   serverURL: "https://waline-comment.vuejs.press",</span></span>
<span class="line"><span>    // },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    components: {</span></span>
<span class="line"><span>      components: ["Badge", "VPCard"],</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    icon: {</span></span>
<span class="line"><span>      prefix: "fa6-solid:",</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 如果你需要 PWA。安装 @vuepress/plugin-pwa 并取消下方注释</span></span>
<span class="line"><span>    // pwa: {</span></span>
<span class="line"><span>    //   favicon: "/favicon.ico",</span></span>
<span class="line"><span>    //   cacheHTML: true,</span></span>
<span class="line"><span>    //   cacheImage: true,</span></span>
<span class="line"><span>    //   appendBase: true,</span></span>
<span class="line"><span>    //   apple: {</span></span>
<span class="line"><span>    //     icon: "/assets/icon/apple-icon-152.png",</span></span>
<span class="line"><span>    //     statusBarColor: "black",</span></span>
<span class="line"><span>    //   },</span></span>
<span class="line"><span>    //   msTile: {</span></span>
<span class="line"><span>    //     image: "/assets/icon/ms-icon-144.png",</span></span>
<span class="line"><span>    //     color: "#ffffff",</span></span>
<span class="line"><span>    //   },</span></span>
<span class="line"><span>    //   manifest: {</span></span>
<span class="line"><span>    //     icons: [</span></span>
<span class="line"><span>    //       {</span></span>
<span class="line"><span>    //         src: "/assets/icon/chrome-mask-512.png",</span></span>
<span class="line"><span>    //         sizes: "512x512",</span></span>
<span class="line"><span>    //         purpose: "maskable",</span></span>
<span class="line"><span>    //         type: "image/png",</span></span>
<span class="line"><span>    //       },</span></span>
<span class="line"><span>    //       {</span></span>
<span class="line"><span>    //         src: "/assets/icon/chrome-mask-192.png",</span></span>
<span class="line"><span>    //         sizes: "192x192",</span></span>
<span class="line"><span>    //         purpose: "maskable",</span></span>
<span class="line"><span>    //         type: "image/png",</span></span>
<span class="line"><span>    //       },</span></span>
<span class="line"><span>    //       {</span></span>
<span class="line"><span>    //         src: "/assets/icon/chrome-512.png",</span></span>
<span class="line"><span>    //         sizes: "512x512",</span></span>
<span class="line"><span>    //         type: "image/png",</span></span>
<span class="line"><span>    //       },</span></span>
<span class="line"><span>    //       {</span></span>
<span class="line"><span>    //         src: "/assets/icon/chrome-192.png",</span></span>
<span class="line"><span>    //         sizes: "192x192",</span></span>
<span class="line"><span>    //         type: "image/png",</span></span>
<span class="line"><span>    //       },</span></span>
<span class="line"><span>    //     ],</span></span>
<span class="line"><span>    //     shortcuts: [</span></span>
<span class="line"><span>    //       {</span></span>
<span class="line"><span>    //         name: "Demo",</span></span>
<span class="line"><span>    //         short_name: "Demo",</span></span>
<span class="line"><span>    //         url: "/demo/",</span></span>
<span class="line"><span>    //         icons: [</span></span>
<span class="line"><span>    //           {</span></span>
<span class="line"><span>    //             src: "/assets/icon/guide-maskable.png",</span></span>
<span class="line"><span>    //             sizes: "192x192",</span></span>
<span class="line"><span>    //             purpose: "maskable",</span></span>
<span class="line"><span>    //             type: "image/png",</span></span>
<span class="line"><span>    //           },</span></span>
<span class="line"><span>    //         ],</span></span>
<span class="line"><span>    //       },</span></span>
<span class="line"><span>    //     ],</span></span>
<span class="line"><span>    //   },</span></span>
<span class="line"><span>    // },</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>});</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p>
<p>​</p>
<h2 id="存放你的文章的目录-src-posts" tabindex="-1"><a class="header-anchor" href="#存放你的文章的目录-src-posts"><span>存放你的文章的目录：src/posts</span></a></h2>
<p>你的所有文章都将存放在这个目录下</p>
<figure><img src="/blog/assets/posts/%E9%A1%B9%E7%9B%AE%E7%BB%93%E6%9E%84%E5%88%86%E6%9E%90-3.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h3 id="markdown" tabindex="-1"><a class="header-anchor" href="#markdown"><span><a href="https://theme-hope.vuejs.press/zh/get-started/content.html#markdown" target="_blank" rel="noopener noreferrer">Markdown</a></span></a></h3>
<p>每一个 Markdown 文件都会被 VuePress Theme Hope 处理，将文件内容渲染为网页内容。</p>
<p>你可以尝试自己编辑 Markdown 文件来修改模板的内容。如果你已启动开发服务器，那么修改后的结果会被实时同步到开发服务器上。</p>
<p><strong>Markdown 语法</strong></p>
<p>如果你尚不了解 Markdown，请查看 <a href="https://theme-hope.vuejs.press/zh/cookbook/markdown/" target="_blank" rel="noopener noreferrer">Markdown 教程</a>。</p>
<p>大概十五分钟，你就可以学会如何书写 Markdown，看完之后记得回来！</p>
<p><strong>Markdown 语法扩展</strong></p>
<ul>
<li>VuePress 自身对 Markdown 语法进行了一些扩展，关于这些扩展的语法，详见 <a href="https://theme-hope.vuejs.press/zh/cookbook/vuepress/markdown.html" target="_blank" rel="noopener noreferrer">VuePress → Markdown</a>。</li>
<li>主题通过 VuePress 插件额外启用了一些语法扩展，详见 <a href="https://theme-hope.vuejs.press/zh/guide/intro/markdown.html" target="_blank" rel="noopener noreferrer">指南 → Markdown</a>。</li>
</ul>
<h3 id="frontmatter" tabindex="-1"><a class="header-anchor" href="#frontmatter"><span><a href="https://theme-hope.vuejs.press/zh/get-started/content.html#frontmatter" target="_blank" rel="noopener noreferrer">Frontmatter</a></span></a></h3>
<p>Frontmatter 是 VuePress 中很重要的一个概念，它用于承载 Markdown 文件的配置。Markdown 文件可以包含一个 <a href="https://yaml.org/" target="_blank" rel="noopener noreferrer">YAML</a> Frontmatter。</p>
<p><strong>YAML</strong></p>
<p>如果你对 YAML 也不熟悉，你可以查看 <a href="https://mister-hope.com/code/language/yaml/" target="_blank" rel="noopener noreferrer">YAML 教程</a>。</p>
<h3 id="你的markdown文件必须在前面加上一个frontmatter" tabindex="-1"><a class="header-anchor" href="#你的markdown文件必须在前面加上一个frontmatter"><span>你的Markdown文件必须在前面加上一个Frontmatter</span></a></h3>
<p>Frontmatter 必须在 Markdown 文件的顶部，并且被包裹在一对三短划线中间。下面是一个基本的示例:</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>---</span></span>
<span class="line"><span>lang: zh-CN</span></span>
<span class="line"><span>title: 页面的标题</span></span>
<span class="line"><span>description: 页面的描述</span></span>
<span class="line"><span>---</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&#x3C;!-- 这里是 Markdown 内容 --></span></span>
<span class="line"><span></span></span>
<span class="line"><span>...</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你也许注意到案例中 Frontmatter 中的字段和 <a href="https://vuejs.press/zh/guide/configuration.html#%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6" target="_blank" rel="noopener noreferrer">VuePress 配置文件</a> 十分类似。你可以通过 Frontmatter 来覆盖当前页面的 <code v-pre>lang</code>, <code v-pre>title</code>, <code v-pre>description</code> 等属性。因此，你可以把 Frontmatter 当作页面级作用域的配置，它通常具有最高优先级，所作配置仅对当前页面生效。</p>
<p>​</p>
<h3 id="​" tabindex="-1"><a class="header-anchor" href="#​"><span>​</span></a></h3>
<h2 id="" tabindex="-1"><a class="header-anchor" href="#"><span></span></a></h2>
<p>​</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};