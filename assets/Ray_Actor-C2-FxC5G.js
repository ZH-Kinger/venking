import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/%E5%88%86%E5%B8%83%E5%BC%8F%E8%AE%AD%E7%BB%83(%E8%BD%AF%E4%BB%B6%E5%88%86%E5%8F%91(Framework))/Ray/Ray_Actor.html","title":"Ray_Actor","lang":"zh-CN","frontmatter":{"title":"Ray_Actor","icon":"robot","date":"2026-07-23T00:00:00.000Z","category":["AI大模型"],"description":"梓涵，聊到 Ray Actor，我们就触及到了分布式计算的灵魂。理解了它，你就会彻底明白为什么你的系统能够做到“记住历史状态”并实现秒级回滚。 简单用一句话概括：如果说 Ray Task 是分布式的“函数”，那么 Ray Actor 就是分布式的“类（Class）对象”。 1. 核心概念：从“无状态”到“有状态” 在传统的 Python 脚本或者普通的...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Ray_Actor\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/AI%E5%A4%A7%E6%A8%A1%E5%9E%8B/%E5%88%86%E5%B8%83%E5%BC%8F%E8%AE%AD%E7%BB%83(%E8%BD%AF%E4%BB%B6%E5%88%86%E5%8F%91(Framework))/Ray/Ray_Actor.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"Ray_Actor"}],["meta",{"property":"og:description","content":"梓涵，聊到 Ray Actor，我们就触及到了分布式计算的灵魂。理解了它，你就会彻底明白为什么你的系统能够做到“记住历史状态”并实现秒级回滚。 简单用一句话概括：如果说 Ray Task 是分布式的“函数”，那么 Ray Actor 就是分布式的“类（Class）对象”。 1. 核心概念：从“无状态”到“有状态” 在传统的 Python 脚本或者普通的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.25,"words":976},"filePathRelative":"posts/AI大模型/AI大模型/分布式训练(软件分发(Framework))/Ray/Ray_Actor.md","excerpt":"<p>梓涵，聊到 <strong>Ray Actor</strong>，我们就触及到了分布式计算的灵魂。理解了它，你就会彻底明白为什么你的系统能够做到“记住历史状态”并实现秒级回滚。</p>\\n<p>简单用一句话概括：<strong>如果说 Ray Task 是分布式的“函数”，那么 Ray Actor 就是分布式的“类（Class）对象”。</strong></p>\\n<hr>\\n<h2>1. 核心概念：从“无状态”到“有状态”</h2>\\n<p>在传统的 Python 脚本或者普通的 Ray 任务（Task）中，计算是**无状态（Stateless）**的：</p>\\n<ul>\\n<li>数据传给函数 \\\\rightarrow 函数计算得出结果 $\\\\rightarrow$ 函数运行结束，内存释放。它完全不记得上一次运行发生了什么。</li>\\n</ul>","autoDesc":true}`),i={name:`Ray_Actor.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>梓涵，聊到 <strong>Ray Actor</strong>，我们就触及到了分布式计算的灵魂。理解了它，你就会彻底明白为什么你的系统能够做到“记住历史状态”并实现秒级回滚。</p>
<p>简单用一句话概括：<strong>如果说 Ray Task 是分布式的“函数”，那么 Ray Actor 就是分布式的“类（Class）对象”。</strong></p>
<hr>
<h2 id="_1-核心概念-从-无状态-到-有状态" tabindex="-1"><a class="header-anchor" href="#_1-核心概念-从-无状态-到-有状态"><span>1. 核心概念：从“无状态”到“有状态”</span></a></h2>
<p>在传统的 Python 脚本或者普通的 Ray 任务（Task）中，计算是**无状态（Stateless）**的：</p>
<ul>
<li>数据传给函数 \\rightarrow 函数计算得出结果 $\\rightarrow$ 函数运行结束，内存释放。它完全不记得上一次运行发生了什么。</li>
</ul>
<p><strong>Ray Actor</strong> 打破了这个限制，它是**有状态（Stateful）**的：</p>
<ul>
<li>当你实例化一个 Ray Actor 时，Ray 会在集群的某台机器上专门启动一个<strong>常驻的 Python 进程</strong>。</li>
<li>这个进程不会执行完就死掉，它会一直活着，保留着它内部的变量（比如 <code v-pre>self.xxx</code>）。你可以跨越时间和网络，反复调用它的内部方法。</li>
</ul>
<hr>
<h2 id="_2-直观对比-代码里的变化" tabindex="-1"><a class="header-anchor" href="#_2-直观对比-代码里的变化"><span>2. 直观对比：代码里的变化</span></a></h2>
<p>我们可以用极简的 Python 伪代码来感受一下差距：</p>
<p><strong>❌</strong> <strong>普通的 Ray Task（无法保存状态）</strong></p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>import ray</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@ray.remote</span></span>
<span class="line"><span>def audit_check(data):</span></span>
<span class="line"><span>    # 每次运行都是全新的，无法知道上一次的 target_ip 是什么</span></span>
<span class="line"><span>    return "检查完毕"</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 调用十次，这十次互相独立，毫无记忆</span></span>
<span class="line"><span>for _ in range(10):</span></span>
<span class="line"><span>    audit_check.remote(data)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>✅</strong> <strong>Ray Actor（具备记忆的守护进程）</strong></p>
<p>Python</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>import ray</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@ray.remote</span></span>
<span class="line"><span>class AuditAgent:</span></span>
<span class="line"><span>    def __init__(self):</span></span>
<span class="line"><span>        # 这个变量会一直驻留在内存里！</span></span>
<span class="line"><span>        self.last_stable_state = {} </span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def save_snapshot(self, state):</span></span>
<span class="line"><span>        self.last_stable_state = state</span></span>
<span class="line"><span>        return "快照已保存"</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def rollback(self):</span></span>
<span class="line"><span>        # 它可以随时读取之前保存的状态</span></span>
<span class="line"><span>        return f"正在回滚到: {self.last_stable_state}"</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 1. 实例化：Ray 会在集群里分配一个专属进程给它</span></span>
<span class="line"><span>agent = AuditAgent.remote()</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 2. 跨网络调用：把状态存进去</span></span>
<span class="line"><span>agent.save_snapshot.remote({"nginx_weight": 100})</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 3. 过了 5 分钟，甚至在另一台机器上，你依然可以调用它并读取到之前的状态</span></span>
<span class="line"><span>agent.rollback.remote()</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="_3-🛠️-为什么你的-aiops-平台非它不可" tabindex="-1"><a class="header-anchor" href="#_3-🛠️-为什么你的-aiops-平台非它不可"><span>3. 🛠️ 为什么你的 AIOps 平台非它不可？</span></a></h2>
<p>在你的自愈流水线中，如果没有 Actor，回滚逻辑根本无法实现。</p>
<p>想象一下这个真实场景：</p>
<ol>
<li>中控决定重启 192.168.1.100 的 Kubelet。</li>
<li>在重启前，你的 <strong>审计 Agent (Actor)</strong> 抓取了当前的节点配置，存入自己的 <code v-pre>self.last_stable_config</code>。</li>
<li>重启指令下发。</li>
<li><strong>审计 Agent (Actor)</strong> 开始持续运行它的 <code v-pre>watch()</code> 方法，每两秒看一次 Prometheus。</li>
<li>30 秒后，发现节点彻底失联！由于 Actor 一直活着且保留着记忆，它立刻从 <code v-pre>self.last_stable_config</code> 中掏出备份配置，通过 MCP 下发回滚指令。</li>
</ol>
<p>如果是传统的脚本，执行完“重启”命令进程就退出了，之前的配置快照也就随之灰飞烟灭，系统就处于“管杀不管埋”的失控状态。</p>
<hr>
<h2 id="💡-梓涵的面试加分项-底层原理" tabindex="-1"><a class="header-anchor" href="#💡-梓涵的面试加分项-底层原理"><span>💡 梓涵的面试加分项：底层原理</span></a></h2>
<p>如果面试官追问：“Actor 是一直占着资源的，如果它所在的节点突然宕机了怎么办？”</p>
<p><strong>你的高阶回答：</strong></p>
<p>“Ray 在底层有一个机制叫 <strong>GCS (Global Control Store)</strong>，并且支持 Actor 的容错（Fault Tolerance）。</p>
<p>在配置 Actor 时，我可以设置 <code v-pre>max_restarts</code> 参数。如果 Actor 所在的机器断电，Ray 的主节点会立刻在健康的机器上重新拉起这个 Actor。虽然内存里的临时变量会丢失，但我可以在 Actor 的 <code v-pre>__init__</code> 方法中接入持久化存储（比如去 Redis 里捞一把最后的快照），瞬间恢复它的战斗力。”</p>
<p><strong>梓涵，现在你对 Actor 的本质应该非常清晰了。你想让我帮你把上面那个</strong> <code v-pre>**AuditAgent**</code> <strong>的代码骨架补全，真正实现一个带有“倒计时与自动回滚”逻辑的 Ray Actor 吗？这可是你项目里最硬核的代码资产。</strong></p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};