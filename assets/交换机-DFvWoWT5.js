import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E4%BA%A4%E6%8D%A2%E6%9C%BA.html","title":"交换机","lang":"zh-CN","frontmatter":{"title":"交换机","icon":"network","date":"2026-07-23T00:00:00.000Z","category":["计算机网络"],"description":"交换机 1. 交换机是干什么的？（核心功能） 交换机的主要工作是数据转发。它的存在解决了两个核心问题： 多设备互联： 一个路由器通常只有 4 个网口，但一个办公室可能有 50 台电脑。交换机提供大量的端口（常见有 8、16、24、48 口），让所有设备都能连入网络。 定向传输（不打架）： 早期的网络设备（集线器 Hub）会将信息广播给所有人，导致网络拥...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"交换机\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/%E4%BA%A4%E6%8D%A2%E6%9C%BA-1.png\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/%E4%BA%A4%E6%8D%A2%E6%9C%BA.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"交换机"}],["meta",{"property":"og:description","content":"交换机 1. 交换机是干什么的？（核心功能） 交换机的主要工作是数据转发。它的存在解决了两个核心问题： 多设备互联： 一个路由器通常只有 4 个网口，但一个办公室可能有 50 台电脑。交换机提供大量的端口（常见有 8、16、24、48 口），让所有设备都能连入网络。 定向传输（不打架）： 早期的网络设备（集线器 Hub）会将信息广播给所有人，导致网络拥..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/%E4%BA%A4%E6%8D%A2%E6%9C%BA-1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":8.24,"words":2472},"filePathRelative":"posts/计算机网络/网络的概念/交换机.md","excerpt":"<h2>交换机</h2>\\n<h3>1. 交换机是干什么的？（核心功能）</h3>\\n<p>交换机的主要工作是<strong>数据转发</strong>。它的存在解决了两个核心问题：</p>\\n<ul>\\n<li><strong>多设备互联：</strong> 一个路由器通常只有 4 个网口，但一个办公室可能有 50 台电脑。交换机提供大量的端口（常见有 8、16、24、48 口），让所有设备都能连入网络。</li>\\n<li><strong>定向传输（不打架）：</strong> 早期的网络设备（集线器 Hub）会将信息广播给所有人，导致网络拥塞。交换机会“记住”每台设备的身份（MAC 地址），实现<strong>点对点</strong>通信。</li>\\n</ul>","autoDesc":true}`),i={name:`交换机.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><h2 id="交换机" tabindex="-1"><a class="header-anchor" href="#交换机"><span>交换机</span></a></h2>
<h3 id="_1-交换机是干什么的-核心功能" tabindex="-1"><a class="header-anchor" href="#_1-交换机是干什么的-核心功能"><span>1. 交换机是干什么的？（核心功能）</span></a></h3>
<p>交换机的主要工作是<strong>数据转发</strong>。它的存在解决了两个核心问题：</p>
<ul>
<li><strong>多设备互联：</strong> 一个路由器通常只有 4 个网口，但一个办公室可能有 50 台电脑。交换机提供大量的端口（常见有 8、16、24、48 口），让所有设备都能连入网络。</li>
<li><strong>定向传输（不打架）：</strong> 早期的网络设备（集线器 Hub）会将信息广播给所有人，导致网络拥塞。交换机会“记住”每台设备的身份（MAC 地址），实现<strong>点对点</strong>通信。</li>
</ul>
<p><strong>比喻：</strong></p>
<ul>
<li><strong>集线器 (Hub)：</strong> 像在大厅里用大喇叭喊话，所有人都能听见，一次只能一个人说。</li>
<li><strong>交换机 (Switch)：</strong> 像打电话，拨通分机号后，两人直接对话，其他人互不干扰。</li>
</ul>
<hr>
<h3 id="_2-交换机是怎么工作的-原理" tabindex="-1"><a class="header-anchor" href="#_2-交换机是怎么工作的-原理"><span>2. 交换机是怎么工作的？（原理）</span></a></h3>
<p>交换机非常“聪明”，它有一张** MAC 地址表**（可以理解为通讯录）：</p>
<ol>
<li><strong>学习：</strong> 当电脑 A 给电脑 B 发数据时，交换机记录下 A 的网口位置和它的 MAC 地址。</li>
<li><strong>查找：</strong> 它查看数据包的目标地址，去表里找 B 在哪个口。</li>
<li><strong>转发：</strong> 找到后，直接将数据推送到 B 所在的端口，而不惊动其他电脑。</li>
</ol>
<p>​</p>
<h4 id="_1-核心机制-mac-地址表" tabindex="-1"><a class="header-anchor" href="#_1-核心机制-mac-地址表"><span>1. 核心机制：MAC 地址表</span></a></h4>
<p>交换机内部有一张动态更新的表格，记录了<strong>端口号</strong>与<strong>连接设备的 MAC 地址</strong>之间的对应关系。</p>
<ul>
<li><strong>初始状态：</strong> 交换机刚开机时，MAC 地址表是<strong>空的</strong>。</li>
<li><strong>学习过程：</strong> 当某个端口收到一个数据帧时，交换机会查看该帧的<strong>源 MAC 地址</strong>，并将其与接收端口号绑定记录到表中。</li>
</ul>
<hr>
<h4 id="_2-交换机的四个动作" tabindex="-1"><a class="header-anchor" href="#_2-交换机的四个动作"><span>2. 交换机的四个动作</span></a></h4>
<p>当一个数据帧进入交换机后，它会根据 MAC 地址表执行以下操作之一：</p>
<h5 id="_1-学习-learning" tabindex="-1"><a class="header-anchor" href="#_1-学习-learning"><span>① 学习 (Learning)</span></a></h5>
<p>每收到一个帧，交换机都会“记账”。它看一眼发件人（源 MAC），更新自己的表。如果这个地址已经存在，则刷新它的生存时间（Aging time）。</p>
<h5 id="_2-泛洪-flooding-广播" tabindex="-1"><a class="header-anchor" href="#_2-泛洪-flooding-广播"><span>② 泛洪 (Flooding) / 广播</span></a></h5>
<p>如果交换机在表里<strong>查不到</strong>目标 MAC 地址，或者目标地址是<strong>广播地址</strong>（FF:FF:FF:FF:FF:FF），它会将这个帧复制并发送给<strong>除接收端口以外的所有端口</strong>。这保证了目标设备一定能收到信息。</p>
<h5 id="_3-转发-forwarding" tabindex="-1"><a class="header-anchor" href="#_3-转发-forwarding"><span>③ 转发 (Forwarding)</span></a></h5>
<p>如果目标 MAC 地址在表里有记录，交换机就直接将帧从对应的端口送出去。这就像点对点专线，不会干扰其他端口的通信。</p>
<h5 id="_4-丢弃-discarding-filtering" tabindex="-1"><a class="header-anchor" href="#_4-丢弃-discarding-filtering"><span>④ 丢弃 (Discarding / Filtering)</span></a></h5>
<p>如果目标 MAC 地址对应的端口正是收到该帧的端口（比如通过集线器连接的回路），或者帧经过校验（FCS）发现损坏，交换机会直接丢弃它。</p>
<hr>
<h4 id="_3-交换机的工作流程演示" tabindex="-1"><a class="header-anchor" href="#_3-交换机的工作流程演示"><span>3. 交换机的工作流程演示</span></a></h4>
<p>假设电脑 A（端口 1）要给电脑 B（端口 2）发消息：</p>
<ol>
<li><strong>A 发出帧：</strong> 交换机从口 1 收到帧，记录“A 在口 1”。</li>
<li><strong>查找 B：</strong> 交换机查表发现没有 B 的记录，于是向口 2、3、4 <strong>泛洪</strong>。</li>
<li><strong>B 回应：</strong> 电脑 B 收到后给 A 回复。交换机从口 2 收到回包，记录“B 在口 2”。</li>
<li><strong>定向通信：</strong> 此时表里已经有了 A 和 B。以后 A 再找 B，交换机直接在口 1 和口 2 之间转发，口 3 和口 4 的设备完全看不见这些流量。</li>
</ol>
<hr>
<h4 id="_4-冲突域与广播域" tabindex="-1"><a class="header-anchor" href="#_4-冲突域与广播域"><span>4. 冲突域与广播域</span></a></h4>
<p>理解交换机原理时，必须搞清楚这两个概念：</p>
<ul>
<li><strong>隔离冲突域：</strong> 交换机的每个端口都是一个独立的冲突域。这意味着端口 1 和端口 2 可以同时全双工通信，不会像集线器（Hub）那样发生撞车。</li>
<li><strong>不隔离广播域：</strong> 默认情况下，交换机无法阻止广播包。如果局域网内广播包太多（广播风暴），网络会变慢。为了解决这个问题，我们需要引入 <strong>VLAN（虚拟局域网）</strong>。</li>
</ul>
<hr>
<h4 id="_5-交换方式-switching-modes" tabindex="-1"><a class="header-anchor" href="#_5-交换方式-switching-modes"><span>5. 交换方式 (Switching Modes)</span></a></h4>
<ul>
<li><strong>存储转发 (Store-and-Forward)：</strong> 接收完整个帧并检查是否有错再转发。<strong>最安全，目前最常用</strong>。</li>
<li><strong>直通转发 (Cut-Through)：</strong> 只要看到目标 MAC 就立刻转发。<strong>延迟极低，但不校验错误</strong>。</li>
<li><strong>无碎片转发 (Fragment-Free)：</strong> 接收前 64 字节（确保没碰撞）后开始转发。</li>
</ul>
<p>​</p>
<hr>
<h3 id="_3-常见的交换机类型" tabindex="-1"><a class="header-anchor" href="#_3-常见的交换机类型"><span>3. 常见的交换机类型</span></a></h3>
<table>
<thead>
<tr>
<th><strong>类型</strong></th>
<th><strong>描述</strong></th>
<th><strong>适用场景</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>傻瓜交换机 (Unmanaged)</strong></td>
<td>插电即用，无法设置。</td>
<td>家庭、小型办公室。</td>
</tr>
<tr>
<td><strong>网管交换机 (Managed)</strong></td>
<td>可以划分 VLAN（虚拟局域网）、监控流量、设置优先级。</td>
<td>企业、机房、医院等复杂环境。</td>
</tr>
<tr>
<td><strong>PoE 交换机</strong></td>
<td>通过网线同时传输数据和<strong>电力</strong>。</td>
<td>连接摄像头 (IP Cam) 或无线 AP，省去电源线。</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="​" tabindex="-1"><a class="header-anchor" href="#​"><span>​</span></a></h2>
<h2 id="路由器是什么" tabindex="-1"><a class="header-anchor" href="#路由器是什么"><span>路由器是什么</span></a></h2>
<h3 id="_1-路由器是干什么的" tabindex="-1"><a class="header-anchor" href="#_1-路由器是干什么的"><span>1. 路由器是干什么的？</span></a></h3>
<p>路由器的核心任务是<strong>寻径</strong>（Routing），也就是为数据包指路。它的主要功能包括：</p>
<ul>
<li><strong>连接不同网络：</strong> 它是你家内网（LAN）与运营商外网（WAN）之间的唯一门户。</li>
<li><strong>分配 IP 地址：</strong> 路由器内置了 <strong>DHCP 服务</strong>，给连上的手机、电脑分发类似“门牌号”的私有 IP 地址。</li>
<li><strong>NAT 转换（最重要的秘密）：</strong> 运营商通常只给你一个公网 IP，路由器通过 <strong>网络地址转换（NAT）</strong> 技术，让全家几十个设备能共享这一个 IP 上网。</li>
<li><strong>安全防护：</strong> 路由器自带简易防火墙，挡住外部的主动攻击。</li>
</ul>
<hr>
<h3 id="_2-路由器的内部结构" tabindex="-1"><a class="header-anchor" href="#_2-路由器的内部结构"><span>2. 路由器的内部结构</span></a></h3>
<p>你在市面上买到的“无线路由器”，其实是一个<strong>三合一</strong>的设备：</p>
<ol>
<li><strong>路由器 (Router)：</strong> 负责连接宽带、拨号、寻址。</li>
<li><strong>交换机 (Switch)：</strong> 路由器背后的那几个 LAN 口，负责有线连接。</li>
<li><strong>无线接入点 (AP)：</strong> 那些天线，负责把有线信号变成 Wi-Fi 信号。</li>
</ol>
<hr>
<h3 id="_3-路由器-vs-交换机-本质区别" tabindex="-1"><a class="header-anchor" href="#_3-路由器-vs-交换机-本质区别"><span>3. 路由器 vs 交换机：本质区别</span></a></h3>
<p>很多人分不清这两者，可以用这个生活化的比喻：</p>
<table>
<thead>
<tr>
<th><strong>特性</strong></th>
<th><strong>交换机 (Switch)</strong></th>
<th><strong>路由器 (Router)</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>比喻</strong></td>
<td>楼层里的<strong>走廊和门</strong></td>
<td>大楼的<strong>传达室/大门</strong></td>
</tr>
<tr>
<td><strong>工作层级</strong></td>
<td>数据链路层（第二层）</td>
<td><strong>网络层（第三层）</strong></td>
</tr>
<tr>
<td><strong>识别标识</strong></td>
<td>MAC 地址（物理编号）</td>
<td><strong>IP 地址（逻辑编号）</strong></td>
</tr>
<tr>
<td><strong>主要任务</strong></td>
<td>让家里电脑和打印机说话</td>
<td>让家里电脑和百度/腾讯说话</td>
</tr>
</tbody>
</table>
<hr>
<h3 id="_4-选购时的关键术语" tabindex="-1"><a class="header-anchor" href="#_4-选购时的关键术语"><span>4. 选购时的关键术语</span></a></h3>
<ul>
<li><strong>双频/三频：</strong> 指 Wi-Fi 频率。<strong>2.4GHz</strong> 穿墙好但慢；<strong>5GHz</strong> 极快但穿墙差。</li>
<li><strong>Wi-Fi 6 / Wi-Fi 7：</strong> 新一代的传输标准，延迟更低，能同时连接更多设备不卡顿。</li>
<li><strong>Mesh 组网：</strong> 如果你家房子很大，一台路由器覆盖不住，可以用两三台支持 Mesh 的路由器“接力”，实现全屋 Wi-Fi 无缝切换。</li>
</ul>
<hr>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h3>
<p><strong>路由器是局域网的“出口”</strong>。没有它，你的设备只能在家里互相传文件（单机局域网），而无法访问互联网。</p>
<p><strong>您是遇到家里 Wi-Fi 信号不好的问题了，还是想知道如何进入路由器后台（比如 192.168.1.1）进行设置？</strong></p>
<h2 id="以太网mac地址" tabindex="-1"><a class="header-anchor" href="#以太网mac地址"><span>以太网mac地址</span></a></h2>
<p>以太网 Ethernet：就是我们平常说的局域网</p>
<p>​</p>
<p>以太网地址：mac地址、硬件地址、物理地址 --》帧里的地址 --》数据链路层的使用</p>
<p>​</p>
<p>如果说 <strong>IP 地址</strong>是网络世界里的“收件地址”（会随着你搬家、连接不同 Wi-Fi 而改变），那么 <strong>MAC 地址</strong>就是设备的“身份证号”，它是出厂时就烧录在网卡里的<strong>唯一物理标记</strong>。</p>
<hr>
<h3 id="_1-什么是-mac-地址" tabindex="-1"><a class="header-anchor" href="#_1-什么是-mac-地址"><span>1. 什么是 MAC 地址？</span></a></h3>
<p><strong>MAC (Media Access Control)</strong> 全称是<strong>介质访问控制地址</strong>。</p>
<ul>
<li>
<p><strong>唯一性：</strong> 全球每一块网卡（有线网卡、Wi-Fi 芯片、蓝牙模块）都有一个独一无二的 MAC 地址。</p>
</li>
<li>
<p><strong>格式：</strong> 通常由 <strong>48 位二进制</strong> 组成，但为了方便阅读，我们习惯用 <strong>12 位十六进制</strong> 来表示，每两个数字一组，中间用冒号或连字符隔开。</p>
</li>
<li>
<p><em>例如：</em><code v-pre>00:0C:29:4F:8B:35</code></p>
</li>
</ul>
<hr>
<h3 id="_2-mac-地址的构成" tabindex="-1"><a class="header-anchor" href="#_2-mac-地址的构成"><span>2. MAC 地址的构成</span></a></h3>
<p>一个标准的 MAC 地址分为两个部分，一眼就能看出这块网卡是谁生产的：</p>
<table>
<thead>
<tr>
<th><strong>部分</strong></th>
<th><strong>名称</strong></th>
<th><strong>位数</strong></th>
<th><strong>作用</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>前 24 位</strong></td>
<td><strong>OUI</strong> (厂商代码)</td>
<td>前 6 位十六进制</td>
<td>由 IEEE 分配，代表生产厂家（如华为、苹果、Intel）。</td>
</tr>
<tr>
<td><strong>后 24 位</strong></td>
<td><strong>NIC</strong> (设备代码)</td>
<td>后 6 位十六进制</td>
<td>厂家自己分配，确保每一块网卡序列号不重复。</td>
</tr>
</tbody>
</table>
<hr>
<h3 id="_3-为什么有了-ip-地址-还需要-mac-地址" tabindex="-1"><a class="header-anchor" href="#_3-为什么有了-ip-地址-还需要-mac-地址"><span>3. 为什么有了 IP 地址，还需要 MAC 地址？</span></a></h3>
<p>这是一个非常经典的问题。它们在网络中分工明确：</p>
<ol>
<li><strong>IP 地址（逻辑地址）：</strong> 负责“长途运输”。它告诉网络包要去哪个城市、哪个小区。</li>
<li><strong>MAC 地址（物理地址）：</strong> 负责“最后一公里”。当数据包到达你的局域网（交换机）时，交换机不看 IP，它只看 MAC 地址来决定把数据包扔进哪个网口。</li>
</ol>
<p><strong>生活化比喻：</strong></p>
<ul>
<li><strong>IP 地址</strong> = 邮寄地址（XX省XX市XX路XX号）。</li>
<li><strong>MAC 地址</strong> = 收件人的身份证号。</li>
<li>邮递员根据地址（IP）找到你的楼，但最后把包裹递给你时，需要核对你的身份（MAC）。</li>
</ul>
<hr>
<h3 id="_4-交换机是如何利用-mac-地址的" tabindex="-1"><a class="header-anchor" href="#_4-交换机是如何利用-mac-地址的"><span>4. 交换机是如何利用 MAC 地址的？</span></a></h3>
<p>交换机内部有一张 <strong>MAC 地址表</strong>。</p>
<ol>
<li>当一个数据帧进入交换机时，交换机会记录下：“1 号口连着 MAC 地址为 A 的电脑”。</li>
<li>下次有人要发给 A 时，交换机直接把电信号发往 1 号口。</li>
<li>这种基于 MAC 地址的精准投放，避免了局域网内的拥堵。</li>
</ol>
<p>​</p>
<h2 id="ethernet-帧的格式" tabindex="-1"><a class="header-anchor" href="#ethernet-帧的格式"><span>Ethernet 帧的格式</span></a></h2>
<figure><img src="/blog/assets/posts/%E4%BA%A4%E6%8D%A2%E6%9C%BA-1.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>​</p>
<p>​</p>
<p>​</p>
<p>​</p>
<h2 id="​-1" tabindex="-1"><a class="header-anchor" href="#​-1"><span>​</span></a></h2>
<h2 id="​-2" tabindex="-1"><a class="header-anchor" href="#​-2"><span>​</span></a></h2>
<h3 id="​-3" tabindex="-1"><a class="header-anchor" href="#​-3"><span>​</span></a></h3>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};