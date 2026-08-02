import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AIOps%E5%B9%B3%E5%8F%B0/%E5%85%B7%E4%BD%93%E5%AE%9E%E8%B7%B5/Claude%E9%85%8D%E7%BD%AE.html","title":"Claude配置","lang":"zh-CN","frontmatter":{"title":"Claude配置","icon":"settings","date":"2026-07-23T00:00:00.000Z","category":["AIOps平台"],"description":"claude下载 授予权限 既然你以后还要做开发，建议直接把当前用户的脚本执行权限打开，以后就不会再遇到这种报错了。 在你当前的 PowerShell 窗口中，直接输入并运行以下命令： 如果系统弹出一大段文字问你是否要更改执行策略，输入 **Y** 然后回车确认。 权限修改成功后，系统不会有特殊提示。此时你再重新运行安装命令： 这次就可以顺利下载安装了...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Claude配置\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/Claude%E9%85%8D%E7%BD%AE-1.png\\",\\"https://venking.tech/blog/blog/assets/posts/Claude%E9%85%8D%E7%BD%AE-2.png\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AIOps%E5%B9%B3%E5%8F%B0/%E5%85%B7%E4%BD%93%E5%AE%9E%E8%B7%B5/Claude%E9%85%8D%E7%BD%AE.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"Claude配置"}],["meta",{"property":"og:description","content":"claude下载 授予权限 既然你以后还要做开发，建议直接把当前用户的脚本执行权限打开，以后就不会再遇到这种报错了。 在你当前的 PowerShell 窗口中，直接输入并运行以下命令： 如果系统弹出一大段文字问你是否要更改执行策略，输入 **Y** 然后回车确认。 权限修改成功后，系统不会有特殊提示。此时你再重新运行安装命令： 这次就可以顺利下载安装了..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/Claude%E9%85%8D%E7%BD%AE-1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":1.89,"words":567},"filePathRelative":"posts/AIOps平台/具体实践/Claude配置.md","excerpt":"<h2>claude下载</h2>\\n<h3>授予权限</h3>\\n<p>既然你以后还要做开发，建议直接把当前用户的脚本执行权限打开，以后就不会再遇到这种报错了。</p>\\n<p>在你当前的 PowerShell 窗口中，直接输入并运行以下命令：</p>\\n<div class=\\"language-plain line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"plain\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code class=\\"language-plain\\"><span class=\\"line\\"><span>Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`),i={name:`Claude配置.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><h2 id="claude下载" tabindex="-1"><a class="header-anchor" href="#claude下载"><span>claude下载</span></a></h2>
<h3 id="授予权限" tabindex="-1"><a class="header-anchor" href="#授予权限"><span>授予权限</span></a></h3>
<p>既然你以后还要做开发，建议直接把当前用户的脚本执行权限打开，以后就不会再遇到这种报错了。</p>
<p>在你当前的 PowerShell 窗口中，直接输入并运行以下命令：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ol>
<li>如果系统弹出一大段文字问你是否要更改执行策略，输入 <code v-pre>**Y**</code> 然后回车确认。</li>
</ol>
<p>权限修改成功后，系统不会有特殊提示。此时你再重新运行安装命令：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>npm install -g @anthropic-ai/claude-code</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>这次就可以顺利下载安装了。</p>
<p>​</p>
<p>​</p>
<h2 id="配置第三方api-key" tabindex="-1"><a class="header-anchor" href="#配置第三方api-key"><span>配置第三方API KEY</span></a></h2>
<p>现在你已经可以唤醒 Claude Code 了。请在当前的 PowerShell 窗口中直接输入：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>claude</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>敲击回车后，会经历以下几个标准流程：</p>
<ol>
<li><strong>首次授权登录</strong>： 系统会自动在你的终端里生成一个链接，或者直接弹开你的默认浏览器。 你需要使用你的 Claude 账号（Pro/Team 或绑了 API 计费的 Console 账号）进行一次授权（Authorize）。</li>
<li><strong>进入对话模式</strong>： 授权成功后，回到 PowerShell 窗口，你会看到提示符变成了类似 <code v-pre>&gt;</code> 的样式，这意味着 Claude 助手已经在监听你的指令了。</li>
<li><strong>开始使用</strong>： 你可以直接用自然语言打字了。比如：</li>
</ol>
<ul>
<li><em>“帮我用 Python 写一个批量重命名当前文件夹里所有图片的脚本。”</em></li>
<li><em>“解释一下这个目录下的</em> <code v-pre>*main.py*</code> <em>是做什么的。”</em></li>
</ul>
<figure><img src="/blog/assets/posts/Claude%E9%85%8D%E7%BD%AE-1.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h3 id="解决api问题" tabindex="-1"><a class="header-anchor" href="#解决api问题"><span>解决API问题</span></a></h3>
<p>申请一个公司的api key</p>
<p>请在你的 PowerShell 窗口中，直接复制、粘贴并回车运行下面这<strong>一行</strong>命令：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>'{"hasCompletedOnboarding": true}' | Out-File -FilePath "$HOME\\.claude.json" -Encoding utf8</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><em>(这句话的意思是：直接把这段 JSON 代码，以 UTF-8 的编码格式，强行写入到你主目录的</em> <code v-pre>*.claude.json*</code> <em>文件里。没有弹窗，瞬间完成。)</em></p>
<hr>
<h3 id="最终冲刺" tabindex="-1"><a class="header-anchor" href="#最终冲刺"><span>最终冲刺</span></a></h3>
<p>文件写进去之后，我们再把之前的“召唤咒语”连起来念一遍。请按顺序执行：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 1. 挂载代理</span></span>
<span class="line"><span>$env:ANTHROPIC_BASE_URL="https://ai.wuji.tech/api"</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 2. 挂载秘钥</span></span>
<span class="line"><span>$env:ANTHROPIC_API_KEY="cr_bd414d2312416afe5c9a2095c8de2e96359e7f824a872dcba3ebdd4e8a84e5c9"</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 3. 启动 Claude</span></span>
<span class="line"><span>claude</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="最终效果" tabindex="-1"><a class="header-anchor" href="#最终效果"><span>最终效果</span></a></h3>
<figure><img src="/blog/assets/posts/Claude%E9%85%8D%E7%BD%AE-2.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};