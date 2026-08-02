import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E8%B7%B3%E5%8A%A8%E8%BF%90%E7%BB%B4%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88%E9%9D%A2%E8%AF%95%E5%87%86%E5%A4%87%E6%8C%87%E5%8D%97(%E9%80%82%E9%85%8D%E4%BD%A0%E7%9A%84%E7%AE%80%E5%8E%86%E8%83%8C%E6%99%AF)/%E5%9F%BA%E7%A1%80%E9%97%AE%E9%A2%98/https%E8%AF%81%E4%B9%A6%E9%AA%8C%E8%AF%81%E8%BF%87%E7%A8%8B.html","title":"https证书验证过程","lang":"zh-CN","frontmatter":{"title":"https证书验证过程","icon":"clipboard-text","date":"2026-07-23T00:00:00.000Z","category":["面试"],"description":"面试官问这个问题，其实是想考察你对网络安全底层逻辑的理解。你可以把这个过程想象成：服务器拿着一张由“权威机构”背书的身份证，向客户端（浏览器）证明“我真的是我”。 以下是具体的验证步骤： 1. 握手初识：传递证书 当客户端发起 HTTPS 请求时，服务器会把自己的 公钥证书（Certificate） 发给客户端。 注意：服务器自己留着私钥，这是绝对不能...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"https证书验证过程\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/https%E8%AF%81%E4%B9%A6%E9%AA%8C%E8%AF%81%E8%BF%87%E7%A8%8B-1.png\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E8%B7%B3%E5%8A%A8%E8%BF%90%E7%BB%B4%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88%E9%9D%A2%E8%AF%95%E5%87%86%E5%A4%87%E6%8C%87%E5%8D%97(%E9%80%82%E9%85%8D%E4%BD%A0%E7%9A%84%E7%AE%80%E5%8E%86%E8%83%8C%E6%99%AF)/%E5%9F%BA%E7%A1%80%E9%97%AE%E9%A2%98/https%E8%AF%81%E4%B9%A6%E9%AA%8C%E8%AF%81%E8%BF%87%E7%A8%8B.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"https证书验证过程"}],["meta",{"property":"og:description","content":"面试官问这个问题，其实是想考察你对网络安全底层逻辑的理解。你可以把这个过程想象成：服务器拿着一张由“权威机构”背书的身份证，向客户端（浏览器）证明“我真的是我”。 以下是具体的验证步骤： 1. 握手初识：传递证书 当客户端发起 HTTPS 请求时，服务器会把自己的 公钥证书（Certificate） 发给客户端。 注意：服务器自己留着私钥，这是绝对不能..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/https%E8%AF%81%E4%B9%A6%E9%AA%8C%E8%AF%81%E8%BF%87%E7%A8%8B-1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.4,"words":1019},"filePathRelative":"posts/面试/字节面试/字节跳动运维开发工程师面试准备指南(适配你的简历背景)/基础问题/https证书验证过程.md","excerpt":"<p>面试官问这个问题，其实是想考察你对网络安全底层逻辑的理解。你可以把这个过程想象成：<strong>服务器拿着一张由“权威机构”背书的身份证，向客户端（浏览器）证明“我真的是我”。</strong></p>\\n<figure><img src=\\"/blog/assets/posts/https%E8%AF%81%E4%B9%A6%E9%AA%8C%E8%AF%81%E8%BF%87%E7%A8%8B-1.png\\" alt tabindex=\\"0\\" loading=\\"lazy\\"><figcaption></figcaption></figure>\\n<p>以下是具体的验证步骤：</p>\\n<hr>","autoDesc":true}`),i={name:`https证书验证过程.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>面试官问这个问题，其实是想考察你对网络安全底层逻辑的理解。你可以把这个过程想象成：<strong>服务器拿着一张由“权威机构”背书的身份证，向客户端（浏览器）证明“我真的是我”。</strong></p>
<figure><img src="/blog/assets/posts/https%E8%AF%81%E4%B9%A6%E9%AA%8C%E8%AF%81%E8%BF%87%E7%A8%8B-1.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>以下是具体的验证步骤：</p>
<hr>
<h2 id="_1-握手初识-传递证书" tabindex="-1"><a class="header-anchor" href="#_1-握手初识-传递证书"><span>1. 握手初识：传递证书</span></a></h2>
<p>当客户端发起 HTTPS 请求时，服务器会把自己的 <strong>公钥证书（Certificate）</strong> 发给客户端。</p>
<ul>
<li><strong>注意</strong>：服务器自己留着<strong>私钥</strong>，这是绝对不能泄露的。</li>
</ul>
<h2 id="_2-客户端验证-三看证书-核心步骤" tabindex="-1"><a class="header-anchor" href="#_2-客户端验证-三看证书-核心步骤"><span>2. 客户端验证：三看证书（核心步骤）</span></a></h2>
<p>客户端收到证书后，并不会直接信任，而是会进行极为严苛的审查：</p>
<h4 id="a-看-发证机关-是否靠谱-证书链验证" tabindex="-1"><a class="header-anchor" href="#a-看-发证机关-是否靠谱-证书链验证"><span>A. 看“发证机关”是否靠谱（证书链验证）</span></a></h4>
<p>客户端（如 Chrome 或操作系统）内置了一个 <strong>受信任的根证书颁发机构（Root CA）</strong> 列表。</p>
<ul>
<li>它会检查服务器证书是不是由这些 CA 签发的。</li>
<li>如果不是直接签发，它会沿着“证书链”向上找，直到找到根证书。</li>
</ul>
<h4 id="b-看-防伪标识-是否正确-数字签名验证" tabindex="-1"><a class="header-anchor" href="#b-看-防伪标识-是否正确-数字签名验证"><span>B. 看“防伪标识”是否正确（数字签名验证）</span></a></h4>
<p>这是数学上的博弈：</p>
<ol>
<li>客户端取出证书里的 <strong>CA 签名</strong>。</li>
<li>利用本地内置的 <strong>CA 公钥</strong> 对签名进行解密，得到一个 <strong>摘要（Hash A）</strong>。</li>
<li>同时，客户端对证书内容重新算一遍 Hash，得到 <strong>Hash B</strong>。</li>
<li><strong>比对</strong>：如果 Hash A == Hash B，说明证书在传输过程中没被篡改过。</li>
</ol>
<h4 id="c-看-身份信息-是否过期或吊销" tabindex="-1"><a class="header-anchor" href="#c-看-身份信息-是否过期或吊销"><span>C. 看“身份信息”是否过期或吊销</span></a></h4>
<ul>
<li><strong>有效期</strong>：检查当前时间是否在证书的 <code v-pre>Not Before</code> 和 <code v-pre>Not After</code> 之间。</li>
<li><strong>域名匹配</strong>：检查证书里的域名（Common Name）是否和你访问的网址一致。</li>
<li><strong>状态检查</strong>：通过 <strong>CRL</strong>（吊销列表）或 <strong>OCSP</strong>（在线状态协议）确认这张证书没被提前作废。</li>
</ul>
<hr>
<h2 id="_3-密钥协商-确定对称密钥" tabindex="-1"><a class="header-anchor" href="#_3-密钥协商-确定对称密钥"><span>3. 密钥协商：确定对称密钥</span></a></h2>
<p>验证通过后，双方就要商量后续怎么加密聊天了（因为非对称加密太慢，不适合传大数据）：</p>
<ol>
<li><strong>客户端生成随机数</strong>：客户端生成一个随机字符串（Pre-master secret）。</li>
<li><strong>公钥加密</strong>：客户端用证书里的 <strong>服务器公钥</strong> 对这个随机数进行加密，发给服务器。</li>
<li><strong>服务器私钥解密</strong>：服务器用自己的 <strong>私钥</strong> 解密，拿到这个随机数。</li>
<li><strong>合成对称密钥</strong>：现在，双方手里都有了同一个随机数，它们以此生成最终的 <strong>对称密钥（Session Key）</strong>。</li>
</ol>
<hr>
<h2 id="_4-💡-梓涵的面试-进阶-补位" tabindex="-1"><a class="header-anchor" href="#_4-💡-梓涵的面试-进阶-补位"><span>4. 💡 梓涵的面试“进阶”补位：</span></a></h2>
<p>如果面试官问：“为什么证书验证能防止中间人攻击（MITM）？”</p>
<p><strong>你的专业回答</strong>：</p>
<p>“关键在于 <strong>‘私钥的唯一性’</strong> 和 <strong>‘CA 的权威性’</strong>。</p>
<p>中间人可以拦截并伪造证书，但它无法伪造 CA 的数字签名（因为它没有 CA 的私钥）。</p>
<p>如果中间人试图把自己的公钥发给客户端，由于这个公钥不在客户端的信任链（Root CA）中，浏览器会立刻弹出著名的 <strong>‘您的连接不是私密连接’</strong> 警告。</p>
<p>在我的 <strong>Ingress 架构</strong> 中，我会通过 <strong>Cert-manager</strong> 自动化配置 Let's Encrypt 证书，确保这种信任链的实时更新。”</p>
<hr>
<h2 id="🛠️-怎么在你的环境中查看证书细节" tabindex="-1"><a class="header-anchor" href="#🛠️-怎么在你的环境中查看证书细节"><span>🛠️ 怎么在你的环境中查看证书细节？</span></a></h2>
<p>你可以直接用 <code v-pre>openssl</code> 命令来模拟这个验证过程，这显得你非常实战：</p>
<p><code v-pre>openssl s_client -connect zh-kinger.com:443 -showcerts</code></p>
<ul>
<li>这条命令会打印出整个 <strong>Certificate Chain（证书链）</strong>。</li>
<li>你可以看到每一级证书的 <code v-pre>Issuer</code>（颁发者）和 <code v-pre>Subject</code>（使用者）。</li>
</ul>
<p><strong>梓涵，理解了 HTTPS 验证，你就理解了 Web 安全的半壁江山。你想了解一下，当你的 Nginx 集群需要处理每秒上万次的 HTTPS 握手时，如何通过“TLS Session Resumption（会话复用）”来降低 CPU 的加解压损耗吗？这和你之前的压测优化是紧密相连的。</strong></p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};