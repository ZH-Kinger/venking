import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AIOps%E5%B9%B3%E5%8F%B0/%E5%85%B7%E4%BD%93%E5%AE%9E%E8%B7%B5/OpenClaw%E7%9A%84%E5%AE%9A%E4%BD%8D.html","title":"OpenClaw的定位","lang":"zh-CN","frontmatter":{"title":"OpenClaw的定位","icon":"settings","date":"2026-07-23T00:00:00.000Z","category":["AIOps平台"],"description":"简单来说，OpenClaw 是你整个 AIOps 系统的“项目经理”或“总调度员”。 虽然云端大模型（Qwen3）很有才华，但它只是一个“大脑”，它没有手脚（无法执行指令），也没有长久记忆（不知道你之前的运维操作），更不认识你的内网环境。OpenClaw 的作用就是给这个“大脑”配上眼睛、耳朵和手脚。 在你的项目中，OpenClaw 主要负责以下三个核...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"OpenClaw的定位\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AIOps%E5%B9%B3%E5%8F%B0/%E5%85%B7%E4%BD%93%E5%AE%9E%E8%B7%B5/OpenClaw%E7%9A%84%E5%AE%9A%E4%BD%8D.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"OpenClaw的定位"}],["meta",{"property":"og:description","content":"简单来说，OpenClaw 是你整个 AIOps 系统的“项目经理”或“总调度员”。 虽然云端大模型（Qwen3）很有才华，但它只是一个“大脑”，它没有手脚（无法执行指令），也没有长久记忆（不知道你之前的运维操作），更不认识你的内网环境。OpenClaw 的作用就是给这个“大脑”配上眼睛、耳朵和手脚。 在你的项目中，OpenClaw 主要负责以下三个核..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.63,"words":789},"filePathRelative":"posts/AIOps平台/具体实践/OpenClaw的定位.md","excerpt":"<p>简单来说，<strong>OpenClaw 是你整个 AIOps 系统的“项目经理”或“总调度员”。</strong></p>\\n<p>虽然云端大模型（Qwen3）很有才华，但它只是一个“大脑”，它没有手脚（无法执行指令），也没有长久记忆（不知道你之前的运维操作），更不认识你的内网环境。<strong>OpenClaw 的作用就是给这个“大脑”配上眼睛、耳朵和手脚。</strong></p>\\n<p>在你的项目中，OpenClaw 主要负责以下三个核心任务：</p>\\n<hr>\\n<h2>意图解析与工具路由 (The Translator)</h2>\\n<p>大模型输出的是文字，而服务器需要的是指令。</p>","autoDesc":true}`),i={name:`OpenClaw的定位.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>简单来说，<strong>OpenClaw 是你整个 AIOps 系统的“项目经理”或“总调度员”。</strong></p>
<p>虽然云端大模型（Qwen3）很有才华，但它只是一个“大脑”，它没有手脚（无法执行指令），也没有长久记忆（不知道你之前的运维操作），更不认识你的内网环境。<strong>OpenClaw 的作用就是给这个“大脑”配上眼睛、耳朵和手脚。</strong></p>
<p>在你的项目中，OpenClaw 主要负责以下三个核心任务：</p>
<hr>
<h2 id="意图解析与工具路由-the-translator" tabindex="-1"><a class="header-anchor" href="#意图解析与工具路由-the-translator"><span>意图解析与工具路由 (The Translator)</span></a></h2>
<p>大模型输出的是文字，而服务器需要的是指令。</p>
<ul>
<li><strong>作用</strong>：当 Qwen3 分析完认为“应该重启服务”时，OpenClaw 会将这句自然语言<strong>解析为标准的 JSON 指令</strong>。</li>
<li><strong>执行</strong>：它根据指令类型，自动寻址并调用你本地的 <strong>MCP Server</strong> 或 <strong>Skill</strong>（即具体的 Ansible 脚本）。</li>
<li><strong>价值</strong>：它实现了“逻辑”与“执行”的解耦。</li>
</ul>
<h2 id="动态上下文组装-the-librarian" tabindex="-1"><a class="header-anchor" href="#动态上下文组装-the-librarian"><span>动态上下文组装 (The Librarian)</span></a></h2>
<p>大模型不知道你服务器现在的实时状态，也不知道你 ZH-Kinger 博客里的经验。</p>
<ul>
<li><strong>作用</strong>：在报警发生后，OpenClaw 不会直接问大模型“怎么办”，而是先去**“收集证据”**：</li>
</ul>
<ol>
<li>调用 <strong>Loki</strong> 接口抓取异常日志。</li>
<li>调用 <strong>Prometheus</strong> 获取当前 CPU/内存指标。</li>
<li>调用 <strong>RAG</strong> 检索本地运维手册。</li>
</ol>
<ul>
<li><strong>价值</strong>：它把这些信息拼成一个巨大的“信息包”喂给大模型，让 AI 决策具备<strong>根因分析 (RCA)</strong> 的依据。</li>
</ul>
<h2 id="任务流状态管理-the-manager" tabindex="-1"><a class="header-anchor" href="#任务流状态管理-the-manager"><span>任务流状态管理 (The Manager)</span></a></h2>
<p>运维往往不是一锤子买卖，需要“尝试-反馈-再决策”。</p>
<ul>
<li>
<p><strong>作用</strong>：OpenClaw 维护着整个自愈过程的<strong>多轮对话状态</strong>。</p>
</li>
<li>
<p>比如：第一步重启失败了，OpenClaw 会带着报错信息再次请求大模型：“重启失败，报错为权限不足，请重新规划策略。”</p>
</li>
<li>
<p><strong>价值</strong>：它确保了自愈过程是一个有逻辑、可追溯的<strong>闭环流程</strong>。</p>
</li>
</ul>
<hr>
<h2 id="​在你修改后的-审计准入-流程中" tabindex="-1"><a class="header-anchor" href="#​在你修改后的-审计准入-流程中"><span>​在你修改后的“审计准入”流程中：</span></a></h2>
<p>现在你对 OpenClaw 提出了更高的要求：它不仅要调度工具，还要**“服从审计”**。</p>
<ol>
<li><strong>提交提案</strong>：OpenClaw 生成修复计划后，不再直接执行，而是先发给 <strong>Audit Agent</strong>。</li>
<li><strong>等待许可</strong>：OpenClaw 进入挂起状态，直到收到审计通过的信号。</li>
<li><strong>反馈闭环</strong>：如果审计拒绝（如频率超限），OpenClaw 负责向大模型传递“被拒绝”的信息，要求大模型重新思考替代方案。</li>
</ol>
<hr>
<h2 id="硬核表达建议" tabindex="-1"><a class="header-anchor" href="#硬核表达建议"><span>硬核表达建议：</span></a></h2>
<p>当面试官问你“OpenClaw 起了什么作用”时，你可以这样回答：</p>
<p>“OpenClaw 在我项目中充当了<strong>智能调度中枢</strong>。它通过封装 <strong>MCP 协议</strong>和 <strong>RAG 插件</strong>，解决了大模型在运维场景下的‘幻觉’和‘执行断层’问题。</p>
<p>我对它进行了二次开发，实现了一个<strong>准入审计钩子（Audit Hook）</strong>，让它在执行任何高危动作前，必须先经过 Ray 审计 Agent 的安全性校验。这让我的系统从‘简单的脚本调用’升级为了‘具备确定性的闭环自愈平台’。”</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};