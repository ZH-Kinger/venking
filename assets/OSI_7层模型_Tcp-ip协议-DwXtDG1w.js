import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/OSI_7%E5%B1%82%E6%A8%A1%E5%9E%8B_Tcp-ip%E5%8D%8F%E8%AE%AE.html","title":"OSI_7层模型_Tcp-ip协议","lang":"zh-CN","frontmatter":{"title":"OSI_7层模型_Tcp-ip协议","icon":"network","date":"2026-07-23T00:00:00.000Z","category":["计算机网络"],"description":"OSI 7层模型 /Tcp-ip协议 ​ 在计算机网络的世界里，为了让不同厂家、不同系统的设备能互相沟通，人们制定了“分层”的标准。最著名的就是理论上的 OSI 七层模型和实际应用的 TCP/IP 四层（或五层）模型。 1. OSI 七层参考模型 (理论标杆) OSI（Open System Interconnection）由国际标准化组织定义，它将网...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"OSI_7层模型_Tcp-ip协议\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/OSI_7%E5%B1%82%E6%A8%A1%E5%9E%8B_Tcp-ip%E5%8D%8F%E8%AE%AE-1.png\\",\\"https://venking.tech/blog/blog/assets/posts/OSI_7%E5%B1%82%E6%A8%A1%E5%9E%8B_Tcp-ip%E5%8D%8F%E8%AE%AE-2.png\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E7%9A%84%E6%A6%82%E5%BF%B5/OSI_7%E5%B1%82%E6%A8%A1%E5%9E%8B_Tcp-ip%E5%8D%8F%E8%AE%AE.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"OSI_7层模型_Tcp-ip协议"}],["meta",{"property":"og:description","content":"OSI 7层模型 /Tcp-ip协议 ​ 在计算机网络的世界里，为了让不同厂家、不同系统的设备能互相沟通，人们制定了“分层”的标准。最著名的就是理论上的 OSI 七层模型和实际应用的 TCP/IP 四层（或五层）模型。 1. OSI 七层参考模型 (理论标杆) OSI（Open System Interconnection）由国际标准化组织定义，它将网..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/OSI_7%E5%B1%82%E6%A8%A1%E5%9E%8B_Tcp-ip%E5%8D%8F%E8%AE%AE-1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":5.49,"words":1648},"filePathRelative":"posts/计算机网络/网络的概念/OSI_7层模型_Tcp-ip协议.md","excerpt":"<h2>OSI 7层模型 /Tcp-ip协议</h2>\\n<p>​</p>\\n<p>在计算机网络的世界里，为了让不同厂家、不同系统的设备能互相沟通，人们制定了“分层”的标准。最著名的就是理论上的 <strong>OSI 七层模型</strong>和实际应用的 <strong>TCP/IP 四层（或五层）模型</strong>。</p>\\n<hr>\\n<h3>1. OSI 七层参考模型 (理论标杆)</h3>\\n<p>OSI（Open System Interconnection）由国际标准化组织定义，它将网络通信细分为 7 层，每一层都有明确的职责。</p>\\n<table>\\n<thead>\\n<tr>\\n<th><strong>层级</strong></th>\\n<th><strong>名称</strong></th>\\n<th><strong>核心功能</strong></th>\\n<th><strong>形象比喻</strong></th>\\n</tr>\\n</thead>\\n<tbody>\\n<tr>\\n<td><strong>7</strong></td>\\n<td><strong>应用层</strong></td>\\n<td>用户接口，处理特定应用细节。</td>\\n<td>写信的内容 (HTTP/FTP)</td>\\n</tr>\\n<tr>\\n<td><strong>6</strong></td>\\n<td><strong>表示层</strong></td>\\n<td>数据格式化、加密、压缩。</td>\\n<td>翻译成对方懂的语言</td>\\n</tr>\\n<tr>\\n<td><strong>5</strong></td>\\n<td><strong>会话层</strong></td>\\n<td>建立、管理和终止会话。</td>\\n<td>确认对方是否在线</td>\\n</tr>\\n<tr>\\n<td><strong>4</strong></td>\\n<td><strong>传输层</strong></td>\\n<td>端到端的数据传输、流量控制、纠错。</td>\\n<td>选择平邮还是挂号信 (TCP/UDP)</td>\\n</tr>\\n<tr>\\n<td><strong>3</strong></td>\\n<td><strong>网络层</strong></td>\\n<td>逻辑寻址，选择路由路径。</td>\\n<td>在信封上写地址 (IP)</td>\\n</tr>\\n<tr>\\n<td><strong>2</strong></td>\\n<td><strong>数据链路层</strong></td>\\n<td>物理地址寻址，错误检测。</td>\\n<td>封装成信封，交给邮局 (MAC)</td>\\n</tr>\\n<tr>\\n<td><strong>1</strong></td>\\n<td><strong>物理层</strong></td>\\n<td>物理介质上的比特流传输。</td>\\n<td>运输信件的汽车、飞机</td>\\n</tr>\\n</tbody>\\n</table>","autoDesc":true}`),i={name:`OSI_7层模型_Tcp-ip协议.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><h2 id="osi-7层模型-tcp-ip协议" tabindex="-1"><a class="header-anchor" href="#osi-7层模型-tcp-ip协议"><span>OSI 7层模型 /Tcp-ip协议</span></a></h2>
<p>​</p>
<p>在计算机网络的世界里，为了让不同厂家、不同系统的设备能互相沟通，人们制定了“分层”的标准。最著名的就是理论上的 <strong>OSI 七层模型</strong>和实际应用的 <strong>TCP/IP 四层（或五层）模型</strong>。</p>
<hr>
<h3 id="_1-osi-七层参考模型-理论标杆" tabindex="-1"><a class="header-anchor" href="#_1-osi-七层参考模型-理论标杆"><span>1. OSI 七层参考模型 (理论标杆)</span></a></h3>
<p>OSI（Open System Interconnection）由国际标准化组织定义，它将网络通信细分为 7 层，每一层都有明确的职责。</p>
<table>
<thead>
<tr>
<th><strong>层级</strong></th>
<th><strong>名称</strong></th>
<th><strong>核心功能</strong></th>
<th><strong>形象比喻</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>7</strong></td>
<td><strong>应用层</strong></td>
<td>用户接口，处理特定应用细节。</td>
<td>写信的内容 (HTTP/FTP)</td>
</tr>
<tr>
<td><strong>6</strong></td>
<td><strong>表示层</strong></td>
<td>数据格式化、加密、压缩。</td>
<td>翻译成对方懂的语言</td>
</tr>
<tr>
<td><strong>5</strong></td>
<td><strong>会话层</strong></td>
<td>建立、管理和终止会话。</td>
<td>确认对方是否在线</td>
</tr>
<tr>
<td><strong>4</strong></td>
<td><strong>传输层</strong></td>
<td>端到端的数据传输、流量控制、纠错。</td>
<td>选择平邮还是挂号信 (TCP/UDP)</td>
</tr>
<tr>
<td><strong>3</strong></td>
<td><strong>网络层</strong></td>
<td>逻辑寻址，选择路由路径。</td>
<td>在信封上写地址 (IP)</td>
</tr>
<tr>
<td><strong>2</strong></td>
<td><strong>数据链路层</strong></td>
<td>物理地址寻址，错误检测。</td>
<td>封装成信封，交给邮局 (MAC)</td>
</tr>
<tr>
<td><strong>1</strong></td>
<td><strong>物理层</strong></td>
<td>物理介质上的比特流传输。</td>
<td>运输信件的汽车、飞机</td>
</tr>
</tbody>
</table>
<hr>
<h3 id="_2-tcp-ip-协议栈-事实标准" tabindex="-1"><a class="header-anchor" href="#_2-tcp-ip-协议栈-事实标准"><span>2. TCP/IP 协议栈 (事实标准)</span></a></h3>
<p>虽然 OSI 模型很完美，但它太复杂了。在实际互联网中，我们使用的是 <strong>TCP/IP 模型</strong>。它更简洁，将 OSI 的上三层合并，下两层有时也合并。</p>
<h4 id="常见的五层结构" tabindex="-1"><a class="header-anchor" href="#常见的五层结构"><span>常见的五层结构：</span></a></h4>
<table>
<thead>
<tr>
<th><strong>层级</strong></th>
<th><strong>层名称</strong></th>
<th><strong>数据单位</strong></th>
<th><strong>核心功能</strong></th>
<th><strong>典型协议</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>5</strong></td>
<td><strong>应用层</strong> (Application)</td>
<td><strong>消息 (Message)</strong></td>
<td>直接为应用进程提供服务，定义数据格式。</td>
<td><strong>HTTP</strong> (网页), <strong>DNS</strong> (域名), <strong>FTP</strong> (文件), <strong>MQTT</strong> (物联网)</td>
</tr>
<tr>
<td><strong>4</strong></td>
<td><strong>传输层</strong> (Transport)</td>
<td><strong>段 (Segment)</strong> / <strong>数据报 (Datagram)</strong></td>
<td>提供端到端的通信控制，负责数据的可靠性或速度。</td>
<td><strong>TCP</strong> (可靠传输), <strong>UDP</strong> (快速传输)</td>
</tr>
<tr>
<td><strong>3</strong></td>
<td><strong>网络层</strong> (Internet)</td>
<td><strong>包 (Packet)</strong></td>
<td>负责将数据包从源主机发送到目标主机（寻址和路由）。</td>
<td><strong>IP</strong> (IPv4/IPv6), <strong>ICMP</strong> (Ping命令), <strong>ARP</strong> (地址解析)</td>
</tr>
<tr>
<td><strong>2</strong></td>
<td><strong>数据链路层</strong> (Data Link)</td>
<td><strong>帧 (Frame)</strong></td>
<td>在相邻节点（如电脑与路由器）间建立逻辑连接，错误检测。</td>
<td><strong>Ethernet</strong> (以太网), <strong>Wi-Fi</strong> (802.11), <strong>PPP</strong></td>
</tr>
<tr>
<td><strong>1</strong></td>
<td><strong>物理层</strong> (Physical)</td>
<td><strong>比特 (Bit)</strong></td>
<td>定义物理媒介（网线、光纤）的机械和电气特性。</td>
<td><strong>RJ45</strong> (网线接口), <strong>光纤</strong>, <strong>中继器</strong></td>
</tr>
</tbody>
</table>
<h3 id="tcp-ip协议簇" tabindex="-1"><a class="header-anchor" href="#tcp-ip协议簇"><span>tcp/ip协议簇</span></a></h3>
<figure><img src="/blog/assets/posts/OSI_7%E5%B1%82%E6%A8%A1%E5%9E%8B_Tcp-ip%E5%8D%8F%E8%AE%AE-1.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>
<h3 id="_3-核心差异-为什么我们要学两个" tabindex="-1"><a class="header-anchor" href="#_3-核心差异-为什么我们要学两个"><span>3. 核心差异：为什么我们要学两个？</span></a></h3>
<ul>
<li><strong>OSI</strong> 是<strong>法律上的标准</strong>（De jure standard）：它非常严谨，适合教学和排查故障（比如常说的“排查一下是不是物理层断了”）。</li>
<li><strong>TCP/IP</strong> 是<strong>事实上的标准</strong>（De facto standard）：它是互联网成功的基石，实用性极强。</li>
</ul>
<hr>
<h3 id="_4-数据在模型中的流动-封装与解封装" tabindex="-1"><a class="header-anchor" href="#_4-数据在模型中的流动-封装与解封装"><span>4. 数据在模型中的流动：封装与解封装</span></a></h3>
<p>这是理解分层模型最关键的一环。</p>
<ul>
<li><strong>封装 (Encapsulation)</strong>：当你发一条消息，数据从高层向底层流动。每经过一层，就会套上一个该层的“头部”（Header），就像给礼物一层层包上包装纸。</li>
<li><strong>解封装 (Decapsulation)</strong>：接收方收到后，从物理层往应用层拆包，每一层读取并去掉自己的头部，最后露出最里面的数据。</li>
</ul>
<hr>
<h3 id="_5-总结-如何快速记忆" tabindex="-1"><a class="header-anchor" href="#_5-总结-如何快速记忆"><span>5. 总结：如何快速记忆？</span></a></h3>
<p>你可以记住这个顺口溜（从下往上）：</p>
<p><strong>物、链、网、传、会、表、应</strong>。</p>
<ul>
<li><strong>物理层</strong>：看得到、摸得着的。</li>
<li><strong>链路层</strong>：局域网内的“小圈子”通信。</li>
<li><strong>网络层</strong>：跨网络的“远程”导航。</li>
<li><strong>传输层</strong>：确保数据“完整、有序”地到达。</li>
<li><strong>应用层</strong>：你看到的、用的各种功能。</li>
</ul>
<p>​</p>
<p>​</p>
<h2 id="数据封装" tabindex="-1"><a class="header-anchor" href="#数据封装"><span>数据封装</span></a></h2>
<p><strong>数据封装（Data Encapsulation）</strong> 是计算机网络通信中的核心逻辑。它就像寄快递时“层层装箱”的过程：每一层协议都会在原始数据的基础上加上自己的<strong>控制信息（报头 Header）</strong>，从而确保数据能准确、安全地送达。</p>
<hr>
<figure><img src="/blog/assets/posts/OSI_7%E5%B1%82%E6%A8%A1%E5%9E%8B_Tcp-ip%E5%8D%8F%E8%AE%AE-2.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_1-封装的全过程-以-tcp-ip-五层模型为例" tabindex="-1"><a class="header-anchor" href="#_1-封装的全过程-以-tcp-ip-五层模型为例"><span>1. 封装的全过程 (以 TCP/IP 五层模型为例)</span></a></h3>
<p>当你在电脑上发出一行文字时，数据会自上而下经历以下过程：</p>
<table>
<thead>
<tr>
<th><strong>步骤</strong></th>
<th><strong>层级</strong></th>
<th><strong>动作：加上“信封”</strong></th>
<th><strong>封装后的名称</strong></th>
<th><strong>核心附加信息</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>1</strong></td>
<td><strong>应用层</strong></td>
<td>原始数据格式化</td>
<td><strong>数据 (Data)</strong></td>
<td>用户真实内容（如：HTTP 请求头）</td>
</tr>
<tr>
<td><strong>2</strong></td>
<td><strong>传输层</strong></td>
<td>加上 <strong>TCP/UDP 头</strong></td>
<td><strong>段 (Segment)</strong></td>
<td><strong>源端口、目的端口</strong>（决定交给哪个程序）</td>
</tr>
<tr>
<td><strong>3</strong></td>
<td><strong>网络层</strong></td>
<td>加上 <strong>IP 头</strong></td>
<td><strong>包 (Packet)</strong></td>
<td><strong>源IP、目的IP</strong>（决定发给哪台电脑）</td>
</tr>
<tr>
<td><strong>4</strong></td>
<td><strong>数据链路层</strong></td>
<td>加上 <strong>MAC 头和尾</strong></td>
<td><strong>帧 (Frame)</strong></td>
<td><strong>源MAC、目的MAC</strong>（决定走哪个网口）</td>
</tr>
<tr>
<td><strong>5</strong></td>
<td><strong>物理层</strong></td>
<td>转换成电/光信号</td>
<td><strong>比特 (Bit)</strong></td>
<td>纯粹的 <code v-pre>0</code>&lt;br&gt;和 <code v-pre>1</code>&lt;br&gt;二进制流</td>
</tr>
</tbody>
</table>
<hr>
<h3 id="_2-为什么要层层加头-形象比喻" tabindex="-1"><a class="header-anchor" href="#_2-为什么要层层加头-形象比喻"><span>2. 为什么要层层加头？（形象比喻）</span></a></h3>
<p>想象你要给远方的朋友寄一个<strong>乐高积木模型</strong>：</p>
<ol>
<li><strong>应用层</strong>：你把模型拼好（原始数据）。</li>
<li><strong>传输层（加内层包装）</strong>：你把模型拆成几块，贴上标签“1号块”、“2号块”，并写上“丢了请联系我”（TCP 序列号与可靠性）。</li>
<li><strong>网络层（写快递单）</strong>：你在纸箱外写上<strong>收件人家庭住址</strong>和你的地址（IP 地址）。</li>
<li><strong>数据链路层（装入运输车）</strong>：快递员把箱子放进货车，货车上写着“去往xx分拣中心”（MAC 地址，负责局部跳转）。</li>
<li><strong>物理层（上路）</strong>：货车在公路上跑（物理传输）。</li>
</ol>
<hr>
<h3 id="_3-解封装-decapsulation-对方收到后干什么" tabindex="-1"><a class="header-anchor" href="#_3-解封装-decapsulation-对方收到后干什么"><span>3. 解封装 (Decapsulation)：对方收到后干什么？</span></a></h3>
<p>当对方收到数据后，会进行完全相反的操作：<strong>层层拆箱</strong>。</p>
<ul>
<li><strong>物理层</strong>收到信号变回比特流。</li>
<li><strong>链路层</strong>拆开 MAC 头，发现是给自己的，传给上一层。</li>
<li><strong>网络层</strong>拆开 IP 头，确认目标 IP 正确，传给上一层。</li>
<li><strong>传输层</strong>拆开 TCP 头，根据端口号（如 5000）把数据塞给对应的程序（如你的 Flask 后端）。</li>
<li><strong>应用层</strong>最终显示出那行文字。</li>
</ul>
<hr>
<h3 id="_4-关键术语-pdu" tabindex="-1"><a class="header-anchor" href="#_4-关键术语-pdu"><span>4. 关键术语：PDU</span></a></h3>
<p>在网络专业术语中，每一层封装好的数据统称为 <strong>PDU（协议数据单元）</strong>。</p>
<ul>
<li>四层 PDU 是 <strong>Segment</strong>。</li>
<li>三层 PDU 是 <strong>Packet</strong>。</li>
<li>二层 PDU 是 <strong>Frame</strong>。</li>
</ul>
<hr>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h3>
<p><strong>封装</strong>是为了让复杂的网络环境知道：<strong>这包东西是谁发的？发给谁？丢了怎么办？该交给哪个软件处理？</strong></p>
<p><strong>你想看看一个真实的 IP 包头或者 TCP 包头里具体长什么样吗？我们可以拆开一个“快递单”看看里面的细节。</strong></p>
<hr>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};