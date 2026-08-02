import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/firewalld(%E9%98%B2%E7%81%AB%E5%A2%99)/iptables%E5%91%BD%E4%BB%A4/iptables%E5%91%BD%E4%BB%A4%E7%BB%83%E4%B9%A0.html","title":"iptables命令练习","lang":"zh-CN","frontmatter":{"title":"iptables命令练习","icon":"network","date":"2026-07-23T00:00:00.000Z","category":["计算机网络"],"description":"环境centos stream 10 实验要求 白板 1白板 1 1. 在Linux服务器上开放以上业务端口，其他的端口都不允许访问，INPUT链的默认规则设置为DROP。 2. 允许ping。 3. 新建一个自定义链SCLOG，用来记录所有的tcp和udp，icmp协议的数据，level 4以上级别日志需要记录，设置一个日志前缀“sanchuang”...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"iptables命令练习\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/iptables%E5%91%BD%E4%BB%A4%E7%BB%83%E4%B9%A0-%E7%99%BD%E6%9D%BF-1.svg\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/firewalld(%E9%98%B2%E7%81%AB%E5%A2%99)/iptables%E5%91%BD%E4%BB%A4/iptables%E5%91%BD%E4%BB%A4%E7%BB%83%E4%B9%A0.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"iptables命令练习"}],["meta",{"property":"og:description","content":"环境centos stream 10 实验要求 白板 1白板 1 1. 在Linux服务器上开放以上业务端口，其他的端口都不允许访问，INPUT链的默认规则设置为DROP。 2. 允许ping。 3. 新建一个自定义链SCLOG，用来记录所有的tcp和udp，icmp协议的数据，level 4以上级别日志需要记录，设置一个日志前缀“sanchuang”..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/iptables%E5%91%BD%E4%BB%A4%E7%BB%83%E4%B9%A0-%E7%99%BD%E6%9D%BF-1.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":1.83,"words":548},"filePathRelative":"posts/计算机网络/网络的概念/firewalld(防火墙)/iptables命令/iptables命令练习.md","excerpt":"<p>环境centos stream 10</p>\\n<h2>实验要求</h2>\\n<figure><img src=\\"/blog/assets/posts/iptables%E5%91%BD%E4%BB%A4%E7%BB%83%E4%B9%A0-%E7%99%BD%E6%9D%BF-1.svg\\" alt=\\"白板 1\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>白板 1</figcaption></figure>\\n<p>1.\xA0在Linux服务器上开放以上业务端口，其他的端口都不允许访问，INPUT链的默认规则设置为DROP。</p>\\n<p>2.\xA0允许ping。</p>","autoDesc":true}`),i={name:`iptables命令练习.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>环境centos stream 10</p>
<h2 id="实验要求" tabindex="-1"><a class="header-anchor" href="#实验要求"><span>实验要求</span></a></h2>
<figure><img src="/blog/assets/posts/iptables%E5%91%BD%E4%BB%A4%E7%BB%83%E4%B9%A0-%E7%99%BD%E6%9D%BF-1.svg" alt="白板 1" tabindex="0" loading="lazy"><figcaption>白板 1</figcaption></figure>
<p>1.\xA0在Linux服务器上开放以上业务端口，其他的端口都不允许访问，INPUT链的默认规则设置为DROP。</p>
<p>2.\xA0允许ping。</p>
<p>3.\xA0新建一个自定义链SCLOG，用来记录所有的tcp和udp，icmp协议的数据，level 4以上级别日志需要记录，设置一个日志前缀“sanchuang”。</p>
<p>4.\xA0不允许123.12.1.0/24访问所有的业务和ping，不允许181.12.13.14主机访问web业务和ssh服务。</p>
<p>以上要求编写脚本 \xA0iptables_rules.sh\xA0，同时编写一个清除所有规则的脚本 \xA0clear_rule.sh\xA0。</p>
<p>​</p>
<p>​</p>
<h2 id="iptables-rules-sh脚本" tabindex="-1"><a class="header-anchor" href="#iptables-rules-sh脚本"><span>iptables_rules.sh脚本</span></a></h2>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>#!/bin/bash</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 1. 清空旧规则(-X 清除自定义链)</span></span>
<span class="line"><span>iptables -F</span></span>
<span class="line"><span>iptables -X</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 2. 【最高优先级】黑名单 (必须放在最前面)、（-m multiport 允许指定多个不连续的端口）</span></span>
<span class="line"><span>iptables -A INPUT -s 123.12.1.0/24 -j DROP</span></span>
<span class="line"><span>iptables -A INPUT -s 181.12.13.14 -p tcp -m multiport --dports 80,22,443 -j DROP</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 3. 允许已建立的连接 (防止你自己发出的请求回不来)、（-i lo 匹配lo网卡的数据，本地回环接口）</span></span>
<span class="line"><span>#（-m status 匹配已建立的连接防止xshell连接中断）</span></span>
<span class="line"><span>iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT</span></span>
<span class="line"><span>iptables -A INPUT -i lo -j ACCEPT</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 4. 【日志】设置自定义链并关联 (在放行前记录，才能抓到所有包)、（--log-prefix 设置前缀）</span></span>
<span class="line"><span>iptables -N SCLOG</span></span>
<span class="line"><span>iptables -A SCLOG -p tcp -j LOG --log-prefix "sanchuang-tcp " --log-level 4</span></span>
<span class="line"><span>iptables -A SCLOG -p udp -j LOG --log-prefix "sanchuang-udp " --log-level 4</span></span>
<span class="line"><span>iptables -A SCLOG -p icmp -j LOG --log-prefix "sanchuang-icmp " --log-level 4</span></span>
<span class="line"><span>#-j RETURN 的意义：执行完毕了，请把这个数据包送回到主链（INPUT）</span></span>
<span class="line"><span>iptables -A SCLOG -j RETURN</span></span>
<span class="line"><span># 将所有进入的包先导流到 SCLOG 记录日志</span></span>
<span class="line"><span>iptables -A INPUT -j SCLOG</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 5. 【放行】业务端口</span></span>
<span class="line"><span>iptables -A INPUT -p tcp -m multiport --dports 80,22,3306,443,21,20 -j ACCEPT</span></span>
<span class="line"><span>iptables -A INPUT -p udp --dport 53 -j ACCEPT</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 6. 【放行】Ping</span></span>
<span class="line"><span>iptables -A INPUT -p icmp --icmp-type echo-request -j ACCEPT</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 7. 【最后一步】设置默认策略为 DROP</span></span>
<span class="line"><span>iptables -P INPUT DROP</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="clear-rule-sh脚本" tabindex="-1"><a class="header-anchor" href="#clear-rule-sh脚本"><span>clear_rule.sh脚本</span></a></h2>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>#!/bin/bash</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/usr/sbin/iptables -t nat -F</span></span>
<span class="line"><span>/usr/sbin/iptables -t filter -F</span></span>
<span class="line"><span>/usr/sbin/iptables -P INPUT ACCEPT</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};