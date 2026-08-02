import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/ip%E5%9C%B0%E5%9D%80%E7%9A%84%E5%88%86%E7%B1%BB/%E5%AD%90%E7%BD%91%E7%9A%84%E5%88%92%E5%88%86.html","title":"子网的划分","lang":"zh-CN","frontmatter":{"title":"子网的划分","icon":"network","date":"2026-07-23T00:00:00.000Z","category":["计算机网络"],"description":"子网划分（Subnetting）本质上是从 IP 地址的主机部分“借用”几位作为网络部分，从而将一个大的网络分割成若干个更小、更易于管理的小网络。 这种做法不仅能减少广播风暴，还能提高 IP 地址的利用率。 ​ 1. 核心概念：IP 地址的结构 在划分前，你需要理解 IP 地址由两部分组成： 网络地址 (Network ID)：代表你所在的“街道”。 ...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"子网的划分\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/%E5%AD%90%E7%BD%91%E7%9A%84%E5%88%92%E5%88%86-1.png\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/ip%E5%9C%B0%E5%9D%80%E7%9A%84%E5%88%86%E7%B1%BB/%E5%AD%90%E7%BD%91%E7%9A%84%E5%88%92%E5%88%86.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"子网的划分"}],["meta",{"property":"og:description","content":"子网划分（Subnetting）本质上是从 IP 地址的主机部分“借用”几位作为网络部分，从而将一个大的网络分割成若干个更小、更易于管理的小网络。 这种做法不仅能减少广播风暴，还能提高 IP 地址的利用率。 ​ 1. 核心概念：IP 地址的结构 在划分前，你需要理解 IP 地址由两部分组成： 网络地址 (Network ID)：代表你所在的“街道”。 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/%E5%AD%90%E7%BD%91%E7%9A%84%E5%88%92%E5%88%86-1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.02,"words":606},"filePathRelative":"posts/计算机网络/网络的概念/ip地址的分类/子网的划分.md","excerpt":"<p>子网划分（Subnetting）本质上是<strong>从 IP 地址的主机部分“借用”几位作为网络部分</strong>，从而将一个大的网络分割成若干个更小、更易于管理的小网络。</p>\\n<p>这种做法不仅能减少广播风暴，还能提高 IP 地址的利用率。</p>\\n<p>​</p>\\n<figure><img src=\\"/blog/assets/posts/%E5%AD%90%E7%BD%91%E7%9A%84%E5%88%92%E5%88%86-1.png\\" alt tabindex=\\"0\\" loading=\\"lazy\\"><figcaption></figcaption></figure>","autoDesc":true}`),i={name:`子网的划分.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>子网划分（Subnetting）本质上是<strong>从 IP 地址的主机部分“借用”几位作为网络部分</strong>，从而将一个大的网络分割成若干个更小、更易于管理的小网络。</p>
<p>这种做法不仅能减少广播风暴，还能提高 IP 地址的利用率。</p>
<p>​</p>
<figure><img src="/blog/assets/posts/%E5%AD%90%E7%BD%91%E7%9A%84%E5%88%92%E5%88%86-1.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<hr>
<h3 id="_1-核心概念-ip-地址的结构" tabindex="-1"><a class="header-anchor" href="#_1-核心概念-ip-地址的结构"><span>1. 核心概念：IP 地址的结构</span></a></h3>
<p>在划分前，你需要理解 IP 地址由两部分组成：</p>
<ul>
<li><strong>网络地址 (Network ID)</strong>：代表你所在的“街道”。</li>
<li><strong>主机地址 (Host ID)</strong>：代表街道上的“门牌号”。</li>
</ul>
<hr>
<h3 id="_2-子网划分的步骤" tabindex="-1"><a class="header-anchor" href="#_2-子网划分的步骤"><span>2. 子网划分的步骤</span></a></h3>
<p>划分过程通常遵循以下四个逻辑步骤：</p>
<h4 id="第一步-确定需求" tabindex="-1"><a class="header-anchor" href="#第一步-确定需求"><span>第一步：确定需求</span></a></h4>
<p>你需要明确：是根据<strong>需要多少个子网</strong>来划，还是根据<strong>每个子网需要多少台主机</strong>来划？</p>
<h4 id="第二步-借位-borrowing-bits" tabindex="-1"><a class="header-anchor" href="#第二步-借位-borrowing-bits"><span>第二步：借位 (Borrowing Bits)</span></a></h4>
<p>你会从主机位中“借”走 $n$ 位。</p>
<ul>
<li><strong>新增子网数</strong> = $2^n$</li>
<li><strong>剩余主机数</strong> = $2^{(剩余位数)} - 2$ （减去 2 是因为要扣除网络地址和广播地址）</li>
</ul>
<h4 id="第三步-计算新的子网掩码" tabindex="-1"><a class="header-anchor" href="#第三步-计算新的子网掩码"><span>第三步：计算新的子网掩码</span></a></h4>
<p>将借走的位在掩码中从 <code v-pre>0</code> 变为 <code v-pre>1</code>。</p>
<p><strong>例子：</strong> 一个 C 类地址 <code v-pre>192.168.1.0/24</code>，如果借走 2 位：</p>
<ul>
<li>原来的掩码：<code v-pre>255.255.255.0</code></li>
<li>新的掩码：<code v-pre>255.255.255.192</code> (因为二进制 $11000000 = 192$)</li>
</ul>
<h4 id="第四步-确定子网范围和块大小" tabindex="-1"><a class="header-anchor" href="#第四步-确定子网范围和块大小"><span>第四步：确定子网范围和块大小</span></a></h4>
<p><strong>块大小 (Block Size) = 256 - 掩码最后一位的值。</strong></p>
<p>如果掩码是 192，块大小就是 256 - 192 = 64。这意味着子网将以 64 为间隔跳动：<code v-pre>.0</code>, <code v-pre>.64</code>, <code v-pre>.128</code>, <code v-pre>.192</code>。</p>
<hr>
<h3 id="_3-实例演练" tabindex="-1"><a class="header-anchor" href="#_3-实例演练"><span>3. 实例演练</span></a></h3>
<p>假设你有一个 C 类网络 <code v-pre>192.168.1.0</code>，需要划分出 <strong>4 个部门</strong>。</p>
<table>
<thead>
<tr>
<th><strong>项目</strong></th>
<th><strong>计算结果</strong></th>
<th><strong>备注</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>借位数</strong></td>
<td>2 位</td>
<td>$2^2 = 4$ 个子网</td>
</tr>
<tr>
<td><strong>新掩码</strong></td>
<td><code v-pre>255.255.255.192</code></td>
<td>即 <code v-pre>/26</code></td>
</tr>
<tr>
<td><strong>每个子网主机数</strong></td>
<td>2^6 - 2 = 62 台</td>
<td>剩余 6 位主机位</td>
</tr>
<tr>
<td><strong>第一个子网范围</strong></td>
<td><code v-pre>192.168.1.1</code>&lt;br&gt;- <code v-pre>192.168.1.62</code></td>
<td><code v-pre>.0</code>&lt;br&gt;为网络号，<code v-pre>.63</code>&lt;br&gt;为广播号</td>
</tr>
</tbody>
</table>
<hr>
<h3 id="​-快速记忆公式" tabindex="-1"><a class="header-anchor" href="#​-快速记忆公式"><span>​ 快速记忆公式</span></a></h3>
<ol>
<li><strong>子网数</strong> = 2^n (n 为借位数)</li>
<li><strong>可用主机数</strong> = 2^h - 2 (h 为剩余主机位数)</li>
<li><strong>CIDR 表示法</strong>：<code v-pre>/24</code> 借 1 位变 <code v-pre>/25</code>，借 2 位变 <code v-pre>/26</code>，以此类推。</li>
</ol>
<p>划分完子网后，最麻烦的往往是计算每一个子网的具体起始 IP。<strong>需要我帮你针对某个具体的 IP 段计算出一份完整的子网对照表吗？</strong></p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};