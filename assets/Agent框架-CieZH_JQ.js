import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/Agent%E6%A1%86%E6%9E%B6.html","title":"Agent框架","lang":"zh-CN","frontmatter":{"title":"Agent框架","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"在 2026 年的 AI 开发生态中，Agent 框架已经形成了非常清晰的层级。既然你对 OpenClaw 感兴趣，我们先从它聊起，再横向对比目前主流的“三驾马车”。 1. 深度解析：OpenClaw 正如你之前提到的，OpenClaw 是一个非常有特色的开源项目。 核心定位：****“自托管、本地优先”的 Agent 助手。 * 交互逻辑： 它最强的...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Agent框架\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/Agent%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91/Agent%E6%A1%86%E6%9E%B6.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"Agent框架"}],["meta",{"property":"og:description","content":"在 2026 年的 AI 开发生态中，Agent 框架已经形成了非常清晰的层级。既然你对 OpenClaw 感兴趣，我们先从它聊起，再横向对比目前主流的“三驾马车”。 1. 深度解析：OpenClaw 正如你之前提到的，OpenClaw 是一个非常有特色的开源项目。 核心定位：****“自托管、本地优先”的 Agent 助手。 * 交互逻辑： 它最强的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.9,"words":871},"filePathRelative":"posts/AI大模型/Agent应用开发/Agent框架.md","excerpt":"<p>在 2026 年的 AI 开发生态中，Agent 框架已经形成了非常清晰的层级。既然你对 <strong>OpenClaw</strong> 感兴趣，我们先从它聊起，再横向对比目前主流的“三驾马车”。</p>\\n<hr>\\n<h2>1. 深度解析：OpenClaw</h2>\\n<p>正如你之前提到的，<strong>OpenClaw</strong> 是一个非常有特色的开源项目。</p>\\n<ul>\\n<li>\\n<p><strong>核心定位：****“自托管、本地优先”的 Agent 助手。</strong> * <strong>交互逻辑：</strong> 它最强的地方在于<strong>多平台集成</strong>。它不只是一个运行在终端的脚本，它可以直接连接你的 Telegram、飞书、Discord 或微信。你可以像跟朋友聊天一样，给你的服务器发指令。</p>\\n</li>\\n<li>\\n<p><strong>权限模型：</strong> 它的 Agent 拥有很高的系统权限。对于你做的 <strong>AIOps</strong> 来说，这意味着你可以让 OpenClaw 直接去：</p>\\n</li>\\n<li>\\n<p>读取 <code>/var/log</code> 下的日志。</p>\\n</li>\\n<li>\\n<p>执行 <code>systemctl restart</code> 重启服务。</p>\\n</li>\\n<li>\\n<p>通过 <code>curl</code> 调用你分布式平台的 API。</p>\\n</li>\\n<li>\\n<p><strong>优势：</strong> 极简、不乱封装、数据全在你自己手里，非常适合<strong>运维工具化</strong>。</p>\\n</li>\\n</ul>","autoDesc":true}`),i={name:`Agent框架.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>在 2026 年的 AI 开发生态中，Agent 框架已经形成了非常清晰的层级。既然你对 <strong>OpenClaw</strong> 感兴趣，我们先从它聊起，再横向对比目前主流的“三驾马车”。</p>
<hr>
<h2 id="_1-深度解析-openclaw" tabindex="-1"><a class="header-anchor" href="#_1-深度解析-openclaw"><span>1. 深度解析：OpenClaw</span></a></h2>
<p>正如你之前提到的，<strong>OpenClaw</strong> 是一个非常有特色的开源项目。</p>
<ul>
<li>
<p><strong>核心定位：****“自托管、本地优先”的 Agent 助手。</strong> * <strong>交互逻辑：</strong> 它最强的地方在于<strong>多平台集成</strong>。它不只是一个运行在终端的脚本，它可以直接连接你的 Telegram、飞书、Discord 或微信。你可以像跟朋友聊天一样，给你的服务器发指令。</p>
</li>
<li>
<p><strong>权限模型：</strong> 它的 Agent 拥有很高的系统权限。对于你做的 <strong>AIOps</strong> 来说，这意味着你可以让 OpenClaw 直接去：</p>
</li>
<li>
<p>读取 <code v-pre>/var/log</code> 下的日志。</p>
</li>
<li>
<p>执行 <code v-pre>systemctl restart</code> 重启服务。</p>
</li>
<li>
<p>通过 <code v-pre>curl</code> 调用你分布式平台的 API。</p>
</li>
<li>
<p><strong>优势：</strong> 极简、不乱封装、数据全在你自己手里，非常适合<strong>运维工具化</strong>。</p>
</li>
</ul>
<hr>
<h2 id="_2-2026-年主流-agent-框架-全景图" tabindex="-1"><a class="header-anchor" href="#_2-2026-年主流-agent-框架-全景图"><span>2. 2026 年主流 Agent 框架“全景图”</span></a></h2>
<p>根据你的开发背景（大学在校生、运维方向），我将这些框架分为三类：</p>
<h2 id="第一类-工业级重型武器-langchain-langgraph" tabindex="-1"><a class="header-anchor" href="#第一类-工业级重型武器-langchain-langgraph"><span>第一类：工业级重型武器 (LangChain &amp; LangGraph)</span></a></h2>
<ul>
<li>
<p><strong>LangChain:</strong> 老大哥，功能最全，插件（工具、数据库、LLM 接口）超过 700 种。</p>
</li>
<li>
<p><strong>LangGraph:</strong> 目前最火。它把 Agent 看作一个<strong>状态机（Graph）</strong>。</p>
</li>
<li>
<p><em>特点：</em> 支持“循环”。比如 Agent 执行任务失败了，它可以回到上一步重新规划，而不是死循环或直接报错。</p>
</li>
<li>
<p><em>适用：</em> 复杂的排障流程（日志分析 -&gt; 猜测原因 -&gt; 验证 -&gt; 验证失败 -&gt; 重新分析）。</p>
</li>
</ul>
<h2 id="第二类-多智能体协作-crewai-autogen" tabindex="-1"><a class="header-anchor" href="#第二类-多智能体协作-crewai-autogen"><span>第二类：多智能体协作 (CrewAI &amp; AutoGen)</span></a></h2>
<ul>
<li>
<p><strong>CrewAI:</strong> 强调**“角色扮演”**。</p>
</li>
<li>
<p>你可以定义一个“监控专家”Agent 和一个“数据库专家”Agent。CrewAI 负责协调它们之间的工作顺序（比如监控发现问题后，必须先交给数据库专家诊断，最后交给运维主管确认）。</p>
</li>
<li>
<p><strong>AutoGen (微软):</strong> 强调**“对话”**。</p>
</li>
<li>
<p>Agent 之间通过互相聊天来解决问题。它最擅长<strong>自动写代码和 Debug</strong>。</p>
</li>
</ul>
<h2 id="第三类-新晋轻量级黑马-pydanticai-smolagents" tabindex="-1"><a class="header-anchor" href="#第三类-新晋轻量级黑马-pydanticai-smolagents"><span>第三类：新晋轻量级黑马 (PydanticAI &amp; Smolagents)</span></a></h2>
<ul>
<li><strong>PydanticAI:</strong> 由 FastAPI 团队出品。如果你追求代码的<strong>类型安全</strong>，不希望 Agent 乱传参数导致程序崩溃，选这个。</li>
<li><strong>Smolagents (HuggingFace):</strong> 极度轻量（核心代码仅约 1000 行）。它提倡用 <strong>纯 Python 代码</strong> 作为 Agent 的工具，而不是复杂的 JSON Schema，性能极高。</li>
</ul>
<hr>
<h2 id="_3-选型指南-你该用哪个" tabindex="-1"><a class="header-anchor" href="#_3-选型指南-你该用哪个"><span>3. 选型指南：你该用哪个？</span></a></h2>
<table>
<thead>
<tr>
<th><strong>你的需求</strong></th>
<th><strong>推荐框架</strong></th>
<th><strong>理由</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>快速做一个能发消息的运维助手</strong></td>
<td><strong>OpenClaw</strong></td>
<td>现成的 IM 机器人集成，上手即用。</td>
</tr>
<tr>
<td><strong>构建分布式日志分析的复杂逻辑</strong></td>
<td><strong>LangGraph</strong></td>
<td>强大的状态管理，能处理复杂的“重试”逻辑。</td>
</tr>
<tr>
<td><strong>想让 AI 自动写修复脚本并测试</strong></td>
<td><strong>AutoGen</strong></td>
<td>它是目前最擅长代码闭环协作的框架。</td>
</tr>
<tr>
<td><strong>做一个严谨的生产级 API 后端</strong></td>
<td><strong>PydanticAI</strong></td>
<td>基于 Pydantic 的验证，减少模型幻觉带来的 Bug。</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="建议第一步" tabindex="-1"><a class="header-anchor" href="#建议第一步"><span>建议第一步：</span></a></h2>
<p>既然你已经有 Python 基础，<strong>与其看文档，不如写个简单的 Demo 感知一下。</strong></p>
<p>我们可以先用最简单的 <code v-pre>Smolagents</code> 或 <code v-pre>LangChain</code> 的 <code v-pre>tool</code> 装饰器，写一个能<strong>自动分析 Linux</strong> <code v-pre>**df -h**</code><strong>（磁盘空间）并预测什么时候满</strong>的 Agent。</p>
<p><strong>你想看这个“磁盘分析 Agent”的代码实现，还是想了解如何把 OpenClaw 接入你的 AIOps 平台？</strong></p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};