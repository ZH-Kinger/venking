import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/firewalld(%E9%98%B2%E7%81%AB%E5%A2%99)/firewalld%E5%91%BD%E4%BB%A4.html","title":"firewalld命令","lang":"zh-CN","frontmatter":{"title":"firewalld命令","icon":"network","date":"2026-07-23T00:00:00.000Z","category":["计算机网络"],"description":"firewall是什么？ firewalld 是 CentOS 7/8 和 RHEL 系列的默认防火墙管理工具。它最大的特点是引入了 区域（Zone） 的概念，并且支持动态更新（即修改规则不需要重启服务，不会导致现有连接断开）。 image.pngimage.png 为了让你更透彻地理解防火墙，我们可以把 firewalld 想象成一个**“智能安检中...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"firewalld命令\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/firewalld%E5%91%BD%E4%BB%A4-1.png\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/firewalld(%E9%98%B2%E7%81%AB%E5%A2%99)/firewalld%E5%91%BD%E4%BB%A4.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"firewalld命令"}],["meta",{"property":"og:description","content":"firewall是什么？ firewalld 是 CentOS 7/8 和 RHEL 系列的默认防火墙管理工具。它最大的特点是引入了 区域（Zone） 的概念，并且支持动态更新（即修改规则不需要重启服务，不会导致现有连接断开）。 image.pngimage.png 为了让你更透彻地理解防火墙，我们可以把 firewalld 想象成一个**“智能安检中..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/firewalld%E5%91%BD%E4%BB%A4-1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.24,"words":972},"filePathRelative":"posts/计算机网络/网络的概念/firewalld(防火墙)/firewalld命令.md","excerpt":"<h2>firewall是什么？</h2>\\n<p><code>firewalld</code> 是 CentOS 7/8 和 RHEL 系列的默认防火墙管理工具。它最大的特点是引入了 <strong>区域（Zone）</strong> 的概念，并且支持<strong>动态更新</strong>（即修改规则不需要重启服务，不会导致现有连接断开）。</p>\\n<figure><img src=\\"/blog/assets/posts/firewalld%E5%91%BD%E4%BB%A4-1.png\\" alt=\\"image.png\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>image.png</figcaption></figure>","autoDesc":true}`),i={name:`firewalld命令.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><h2 id="firewall是什么" tabindex="-1"><a class="header-anchor" href="#firewall是什么"><span>firewall是什么？</span></a></h2>
<p><code v-pre>firewalld</code> 是 CentOS 7/8 和 RHEL 系列的默认防火墙管理工具。它最大的特点是引入了 <strong>区域（Zone）</strong> 的概念，并且支持<strong>动态更新</strong>（即修改规则不需要重启服务，不会导致现有连接断开）。</p>
<figure><img src="/blog/assets/posts/firewalld%E5%91%BD%E4%BB%A4-1.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<p>为了让你更透彻地理解防火墙，我们可以把 <code v-pre>firewalld</code> 想象成一个**“智能安检中心”**。相比传统的 <code v-pre>iptables</code>（手动查表），它提供了更现代、更动态的管理方式。</p>
<p>以下是关于 <code v-pre>firewalld</code> 核心概念与常用命令的详细介绍：</p>
<hr>
<h3 id="一、-核心概念-区域-zone" tabindex="-1"><a class="header-anchor" href="#一、-核心概念-区域-zone"><span>一、 核心概念：区域 (Zone)</span></a></h3>
<p><code v-pre>firewalld</code> 最核心的创新就是引入了<strong>区域（Zone）</strong>。你可以根据网络环境的信任程度，将网卡或源 IP 划分为不同的“安检级别”。</p>
<p><code v-pre>firewalld</code> 默认定义了 <strong>9 个区域</strong>：</p>
<ul>
<li><strong>drop (丢弃)</strong>：最低信任度。所有进入的数据包都会被直接丢弃，不给发送者任何回应。</li>
<li><strong>block (拒绝)</strong>：低信任度。拒绝所有进入的连接，但会发回一个回应（ICMP 消息）告知对方已被拒绝。</li>
<li><strong>public (公共)</strong>：<strong>系统默认区域</strong>。不信任网络中的其他计算机，仅允许选定的入站连接（如 SSH）。</li>
<li><strong>external (外部)</strong>：用于路由器场景。开启了地址伪装（Masquerading），保护内网私有地址。</li>
<li><strong>dmz (隔离区)</strong>：允许受限的公开访问，但禁止该区域访问内部网络。</li>
<li><strong>work / home / internal</strong>：对应工作、家庭、内网环境，信任度依次升高，默认开放的服务也更多。</li>
<li><strong>trusted (信任)</strong>：最高信任度。接受所有的网络连接，不做任何拦截。</li>
</ul>
<hr>
<h3 id="二、-核心机制-运行时-vs-永久配置" tabindex="-1"><a class="header-anchor" href="#二、-核心机制-运行时-vs-永久配置"><span>二、 核心机制：运行时 vs 永久配置</span></a></h3>
<p>这是新手最容易出错的地方：</p>
<ul>
<li>
<p><strong>Runtime (运行时)</strong>：命令立即生效，但重启服务器或重启防火墙后规则会<strong>丢失</strong>。适用于临时测试。</p>
</li>
<li>
<p><strong>Permanent (永久)</strong>：命令写入配置文件，重启后依然有效。</p>
</li>
<li>
<p><strong>注意</strong>：带 <code v-pre>--permanent</code> 的命令不会立即生效，必须执行 <code v-pre>firewall-cmd --reload</code> 才能将其加载进内存。</p>
</li>
</ul>
<hr>
<h3 id="三、-常用命令宝典" tabindex="-1"><a class="header-anchor" href="#三、-常用命令宝典"><span>三、 常用命令宝典</span></a></h3>
<h4 id="_1-基础查询命令" tabindex="-1"><a class="header-anchor" href="#_1-基础查询命令"><span>1. 基础查询命令</span></a></h4>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 查看防火墙运行状态</span></span>
<span class="line"><span>firewall-cmd --state</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 查看当前默认区域</span></span>
<span class="line"><span>firewall-cmd --get-default-zone</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 查看所有活动的区域及其绑定的网卡</span></span>
<span class="line"><span>firewall-cmd --get-active-zones</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 列出当前区域的所有规则（服务、端口、富规则等）</span></span>
<span class="line"><span>firewall-cmd --list-all</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-管理端口与服务" tabindex="-1"><a class="header-anchor" href="#_2-管理端口与服务"><span>2. 管理端口与服务</span></a></h4>
<p><code v-pre>firewalld</code> 允许按“端口号”或“服务名”（如 http）来放行流量。</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 永久放行 80 端口（推荐做法）</span></span>
<span class="line"><span>firewall-cmd --permanent --add-port=80/tcp</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 永久放行 https 服务</span></span>
<span class="line"><span>firewall-cmd --permanent --add-service=https</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 移除已开放的端口</span></span>
<span class="line"><span>firewall-cmd --permanent --remove-port=80/tcp</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 【关键步】重新加载使永久配置生效</span></span>
<span class="line"><span>firewall-cmd --reload</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-进阶-富规则-rich-rules" tabindex="-1"><a class="header-anchor" href="#_3-进阶-富规则-rich-rules"><span>3. 进阶：富规则 (Rich Rules)</span></a></h4>
<p>当你需要复杂的匹配逻辑（例如：只允许特定 IP 访问特定端口）时，使用富规则。</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 允许来自 192.168.1.100 的 IP 访问 22 端口</span></span>
<span class="line"><span>firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="192.168.1.100" port port="22" protocol="tcp" accept'</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 屏蔽某个恶意网段</span></span>
<span class="line"><span>firewall-cmd --permanent --add-rich-rule='rule family="ipv4" source address="123.12.1.0/24" drop'</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-应急-恐慌模式" tabindex="-1"><a class="header-anchor" href="#_4-应急-恐慌模式"><span>4. 应急“恐慌模式”</span></a></h4>
<p>如果服务器正遭受严重攻击，可以使用此命令切断所有网络：</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 开启恐慌模式（切断所有进出流量）</span></span>
<span class="line"><span>firewall-cmd --panic-on</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 关闭恐慌模式（恢复网络）</span></span>
<span class="line"><span>firewall-cmd --panic-off</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h3 id="四、-总结-为什么用-firewalld" tabindex="-1"><a class="header-anchor" href="#四、-总结-为什么用-firewalld"><span>四、 总结：为什么用 firewalld？</span></a></h3>
<ol>
<li><strong>动态更新</strong>：修改规则不需要像 <code v-pre>iptables</code> 那样重启服务，因此<strong>不会断开现有的网络连接</strong>。</li>
<li><strong>语义清晰</strong>：按区域和服务管理，比单纯记端口号更符合人类逻辑。</li>
</ol>
<p><strong>你想尝试一下如何将你之前写的那个</strong> <code v-pre>**iptables**</code> <strong>练习脚本，完整地转化成</strong> <code v-pre>**firewalld**</code> <strong>的命令吗？</strong></p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};