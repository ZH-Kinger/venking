import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/AI_infra/%E9%9B%86%E7%BE%A4%E5%85%B7%E4%BD%93%E5%AE%9E%E7%8E%B0/%E6%90%AD%E5%BB%BA%E6%96%B9%E6%A1%88.html","title":"搭建方案","lang":"zh-CN","frontmatter":{"title":"搭建方案","icon":"cpu","date":"2026-07-23T00:00:00.000Z","category":["AI基础设施"],"description":"&lt;!-- 图片缺失:gpu5090-hpn-weka-final-topology.svg --&gt;GPU：20 台 8 卡 RTX 5090，合计 160 GPU CPU：3 台控制面 存储：6 台 WEKA 存储节点 GPU 单机：2TB 内存，4 x 200G RDMA 存储网：WEKA Storage Fabric，2 x 200G ...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"搭建方案\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/AI%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD/%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/AI_infra/%E9%9B%86%E7%BE%A4%E5%85%B7%E4%BD%93%E5%AE%9E%E7%8E%B0/%E6%90%AD%E5%BB%BA%E6%96%B9%E6%A1%88.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"搭建方案"}],["meta",{"property":"og:description","content":"&lt;!-- 图片缺失:gpu5090-hpn-weka-final-topology.svg --&gt;GPU：20 台 8 卡 RTX 5090，合计 160 GPU CPU：3 台控制面 存储：6 台 WEKA 存储节点 GPU 单机：2TB 内存，4 x 200G RDMA 存储网：WEKA Storage Fabric，2 x 200G ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":1.03,"words":309},"filePathRelative":"posts/AI基础设施/学习计划/AI_infra/集群具体实现/搭建方案.md","excerpt":"<p> &lt;!-- 图片缺失:gpu5090-hpn-weka-final-topology.svg --&gt;GPU：20 台 8 卡 RTX 5090，合计 160 GPU<br>\\nCPU：3 台控制面<br>\\n存储：6 台 WEKA 存储节点<br>\\nGPU 单机：2TB 内存，4 x 200G RDMA<br>\\n存储网：WEKA Storage Fabric，2 x 200G 交换机<br>\\n训练网：HPN 双 Plane，Plane A/B 物理隔离</p>\\n<div class=\\"language- line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code class=\\"language-\\"><span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>**最终配置**  </span></span>\\n<span class=\\"line\\"><span>每台 GPU 服务器：</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`),i={name:`搭建方案.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p><img src="#" alt="" loading="lazy"> &lt;!-- 图片缺失:gpu5090-hpn-weka-final-topology.svg --&gt;GPU：20 台 8 卡 RTX 5090，合计 160 GPU<br>
CPU：3 台控制面<br>
存储：6 台 WEKA 存储节点<br>
GPU 单机：2TB 内存，4 x 200G RDMA<br>
存储网：WEKA Storage Fabric，2 x 200G 交换机<br>
训练网：HPN 双 Plane，Plane A/B 物理隔离</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span></span></span>
<span class="line"><span>**最终配置**  </span></span>
<span class="line"><span>每台 GPU 服务器：</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>BMC：1 x 1G -&gt; OOB<br>
Mgmt/Service：2 x 25G -&gt; MLAG/堆叠交换机<br>
WEKA Storage：2 x 200G -&gt; WEKA 存储交换机<br>
HPN RDMA：4 x 200G<br>
rdma0/mlx5_0 -&gt; Plane A rail 0<br>
rdma2/mlx5_2 -&gt; Plane A rail 1<br>
rdma1/mlx5_1 -&gt; Plane B rail 0<br>
rdma3/mlx5_3 -&gt; Plane B rail 1</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span></span></span>
<span class="line"><span>**网络分层**</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>OOB：<br>
1 x 48口 1G，接所有服务器 BMC</p>
<p>Mgmt + Service：<br>
2 x 48口 25G，MLAG/堆叠<br>
VLAN10：K8s 管理、SSH、监控<br>
VLAN20：Ingress、API、业务 Pod 流量</p>
<p>WEKA Storage：<br>
2 x 200G 交换机<br>
GPU/CPU/WEKA 存储节点双上联<br>
跑数据集、模型权重、checkpoint</p>
<p>HPN Training：<br>
Plane A/B 物理隔离<br>
每台 GPU 4 张 RDMA，两个 rail 到 A，两个 rail 到 B<br>
NCCL 走 mlx5_0,mlx5_1,mlx5_2,mlx5_3</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span></span></span>
<span class="line"><span>**NCCL 分流**  </span></span>
<span class="line"><span>训练时可以配置：</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>export NCCL_NET=IB<br>
export NCCL_IB_HCA=mlx5_0,mlx5_1,mlx5_2,mlx5_3</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span></span></span>
<span class="line"><span>NCCL 会把 AllReduce/AllGather 拆成多个 channel，分摊到 4 张 RDMA 卡上。存储流量不走 HPN，WEKA 单独走 Storage Fabric，这样 checkpoint 和数据读取不会干扰训练通信。</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};