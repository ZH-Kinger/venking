import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E8%B7%AF%E7%94%B1/ping%E7%9A%84%E8%BF%87%E7%A8%8B.html","title":"ping的过程","lang":"zh-CN","frontmatter":{"title":"ping的过程","icon":"network","date":"2026-07-23T00:00:00.000Z","category":["计算机网络"],"description":"ping的过程 1.首先拿对面的ip地址和自己的子网掩码进行与运算得到目的网段 192.168.3.1 255.255.255.0 192.168.3.0 2.pc机会在自己的路由表里查询是否有到192.168.3.0的路由条目 pc里的路由表里有2个路由条目 直连路由 192.168.1.0 默认路由 192.168.1.254 --走默认路由 查询...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"ping的过程\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E8%B7%AF%E7%94%B1/ping%E7%9A%84%E8%BF%87%E7%A8%8B.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"ping的过程"}],["meta",{"property":"og:description","content":"ping的过程 1.首先拿对面的ip地址和自己的子网掩码进行与运算得到目的网段 192.168.3.1 255.255.255.0 192.168.3.0 2.pc机会在自己的路由表里查询是否有到192.168.3.0的路由条目 pc里的路由表里有2个路由条目 直连路由 192.168.1.0 默认路由 192.168.1.254 --走默认路由 查询..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":0.56,"words":169},"filePathRelative":"posts/计算机网络/网络的概念/路由/ping的过程.md","excerpt":"<h2>ping的过程</h2>\\n<p>1.首先拿对面的ip地址和自己的子网掩码进行与运算得到目的网段</p>\\n<p>192.168.3.1</p>\\n<p>255.255.255.0</p>\\n<p>192.168.3.0</p>\\n<p>2.pc机会在自己的路由表里查询是否有到192.168.3.0的路由条目</p>\\n<p>pc里的路由表里有2个路由条目</p>\\n<p>直连路由 192.168.1.0</p>\\n<p>默认路由 192.168.1.254 --走默认路由</p>\\n<p>查询 192.168.1.254 对应的mac表</p>\\n<p>--arp缓存表--》如果arp缓存表里没有对应的条目，就会进行arp广播192.168.1.254对应的mac地址--&gt;192.168.2.154的mac是66.77.88</p>","autoDesc":true}`),i={name:`ping的过程.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><h2 id="ping的过程" tabindex="-1"><a class="header-anchor" href="#ping的过程"><span>ping的过程</span></a></h2>
<p>1.首先拿对面的ip地址和自己的子网掩码进行与运算得到目的网段</p>
<p>192.168.3.1</p>
<p>255.255.255.0</p>
<p>192.168.3.0</p>
<p>2.pc机会在自己的路由表里查询是否有到192.168.3.0的路由条目</p>
<p>pc里的路由表里有2个路由条目</p>
<p>直连路由 192.168.1.0</p>
<p>默认路由 192.168.1.254 --走默认路由</p>
<p>查询 192.168.1.254 对应的mac表</p>
<p>--arp缓存表--》如果arp缓存表里没有对应的条目，就会进行arp广播192.168.1.254对应的mac地址--&gt;192.168.2.154的mac是66.77.88</p>
<p>​</p>
<p>ip包：</p>
<p>源：192.168.1.1 目的ip：192.168.3.1</p>
<p>源mac：11:22:33 目的mac：66:77:88</p>
<p>​</p>
<p>​</p>
<p>​</p>
<h2 id="​" tabindex="-1"><a class="header-anchor" href="#​"><span>​</span></a></h2>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};