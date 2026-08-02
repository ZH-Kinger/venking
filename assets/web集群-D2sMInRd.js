import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%BF%90%E7%BB%B4/web%E9%9B%86%E7%BE%A4/web%E9%9B%86%E7%BE%A4.html","title":"web集群","lang":"zh-CN","frontmatter":{"title":"web集群","icon":"server","date":"2026-07-23T00:00:00.000Z","category":["运维"],"description":"项目名字:基于nginx+keepalivedBJweb高性能的集群项目 项目描述: 模拟企业里的web项目需求,最终日的是构建个高可用高性能的web集群系统。部罢|vs负载均衡系统+keepalived高可用软件, 后端使用nginx做web服务器,同时搭建内部的-套基TPrometheus的监控系统。使用ansible实现整个集群系统的自动化运维工...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"web集群\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/web%E9%9B%86%E7%BE%A4-%E7%99%BD%E6%9D%BF-1.svg\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%BF%90%E7%BB%B4/web%E9%9B%86%E7%BE%A4/web%E9%9B%86%E7%BE%A4.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"web集群"}],["meta",{"property":"og:description","content":"项目名字:基于nginx+keepalivedBJweb高性能的集群项目 项目描述: 模拟企业里的web项目需求,最终日的是构建个高可用高性能的web集群系统。部罢|vs负载均衡系统+keepalived高可用软件, 后端使用nginx做web服务器,同时搭建内部的-套基TPrometheus的监控系统。使用ansible实现整个集群系统的自动化运维工..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/web%E9%9B%86%E7%BE%A4-%E7%99%BD%E6%9D%BF-1.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":2.36,"words":708},"filePathRelative":"posts/运维/web集群/web集群.md","excerpt":"<p>项目名字:基于nginx+keepalivedBJweb高性能的集群项目<br>\\n项目描述:<br>\\n模拟企业里的web项目需求,最终日的是构建个高可用高性能的web集群系统。部罢|vs负载均衡系统+keepalived高可用软件,<br>\\n后端使用nginx做web服务器,同时搭建内部的-套基TPrometheus的监控系统。使用ansible实现整个集群系统的自动化运维工作。<br>\\n项目步骤:<br>\\n项目步骤:</p>\\n<p>1.使用processon国图软件规划好整个项目的拓扑结构图,并日将ip地址标识好。</p>\\n<p>2.安装部罢6台Linux虚拟机服务器,做好网络初始化工作(配置静态ip地址和dns服务器.主机名、禁用firewalldFuselinux功能)</p>","autoDesc":true}`),i={name:`web集群.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>项目名字:基于nginx+keepalivedBJweb高性能的集群项目<br>
项目描述:<br>
模拟企业里的web项目需求,最终日的是构建个高可用高性能的web集群系统。部罢|vs负载均衡系统+keepalived高可用软件,<br>
后端使用nginx做web服务器,同时搭建内部的-套基TPrometheus的监控系统。使用ansible实现整个集群系统的自动化运维工作。<br>
项目步骤:<br>
项目步骤:</p>
<p>1.使用processon国图软件规划好整个项目的拓扑结构图,并日将ip地址标识好。</p>
<p>2.安装部罢6台Linux虚拟机服务器,做好网络初始化工作(配置静态ip地址和dns服务器.主机名、禁用firewalldFuselinux功能)</p>
<p>3.安装nfs服务器,共享网页目录,实现web服务器的数据一致性</p>
<p>4.安装ansible服务器,设置好主机清单,配置免密通道,方便日后批量自动化运维</p>
<p>5.安装Prometheus服务,给每个集群里的节点服务器安装node exporter再安装grafana出图展示监控的效果</p>
<p>6.安装基于binddns服务器为整个web集群提供域名解析服务</p>
<p>7.安装mysql 5.7.37版本的数据库服务器,为后端的接口项目提供数据库服务,同时安装mysqld exporterxtmysql内部性能指标进<br>
行监控</p>
<p>8.部署堡垒机,设置tcp wrappers,只允许堡全机访问内部的其他服务器</p>
<p>9.部署防火墙服务器发布内网的web服务器和堡垒机</p>
<p>10.进行SNAT和DNAT、堡垒机发布测试,最后使用ab进行web服务的压力测试(了解过PTS测试)</p>
<p>11.在第1台web服务器上采用一键安装nginx的脚本部署nginx web服务,然后在web2直接执行脚本安装nginx.</p>
<p>12.使用基于域名的虚拟主机功能,配置2个虚拟主机分别对应2个网站(<a href="http://www.sc.xn--comsoftware-904s.sc.com" target="_blank" rel="noopener noreferrer">www.sc.com和software.sc.com</a>),同时配置https功能</p>
<p>13.在2台web服务器上都安装nginx流量监控的一个模块VTS(虚拟主机的流量监控)了解nginx的访问情况及负载</p>
<p>14.部署nginx负载均衡器LB1,采用7层负载均衡,轮询调度算法实现webi访问负载均衡</p>
<p>15结合keepalived和nginx实现高可用的负载均衡功能(单vip和x双vip),采用7层nginx的负载均衡</p>
<p>16.使用压力测试软件进行综合的压力测试</p>
<p>17.扩展:本次项目实验可以使用自己编写的python 接口程序作为web应用,同时需要部署MySQL服务器。</p>
<figure><img src="/blog/assets/posts/web%E9%9B%86%E7%BE%A4-%E7%99%BD%E6%9D%BF-1.svg" alt="白板 1" tabindex="0" loading="lazy"><figcaption>白板 1</figcaption></figure>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};