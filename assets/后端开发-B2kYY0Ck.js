import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E8%BF%90%E7%BB%B4/web%E5%88%B6%E4%BD%9C/web%E9%A1%B9%E7%9B%AE/%E5%90%8E%E7%AB%AF%E5%BC%80%E5%8F%91.html","title":"后端开发","lang":"zh-CN","frontmatter":{"title":"后端开发","icon":"server","date":"2026-07-23T00:00:00.000Z","category":["运维"],"description":"​ flask（是python的web框架） #flask django django “全栈”框架：内置ORM、Admin 后台、表单、认证、路由等全套工具，开箱即用 约定大于配置：强制遵守特定的项目结构（如models,views,template） 强调快速开发：适合需要快速构建标准化功能的应用(_如CMS，电商平台) flask “微框架”：核...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"后端开发\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/%E5%90%8E%E7%AB%AF%E5%BC%80%E5%8F%91-%E7%99%BD%E6%9D%BF-1.svg\\",\\"https://venking.tech/blog/blog/assets/posts/%E5%90%8E%E7%AB%AF%E5%BC%80%E5%8F%91-%E7%99%BD%E6%9D%BF-2.svg\\",\\"https://venking.tech/blog/blog/assets/posts/%E5%90%8E%E7%AB%AF%E5%BC%80%E5%8F%91-%E7%99%BD%E6%9D%BF-3.svg\\",\\"https://venking.tech/blog/blog/assets/posts/%E5%90%8E%E7%AB%AF%E5%BC%80%E5%8F%91-%E7%99%BD%E6%9D%BF-4.svg\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E8%BF%90%E7%BB%B4/web%E5%88%B6%E4%BD%9C/web%E9%A1%B9%E7%9B%AE/%E5%90%8E%E7%AB%AF%E5%BC%80%E5%8F%91.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"后端开发"}],["meta",{"property":"og:description","content":"​ flask（是python的web框架） #flask django django “全栈”框架：内置ORM、Admin 后台、表单、认证、路由等全套工具，开箱即用 约定大于配置：强制遵守特定的项目结构（如models,views,template） 强调快速开发：适合需要快速构建标准化功能的应用(_如CMS，电商平台) flask “微框架”：核..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/%E5%90%8E%E7%AB%AF%E5%BC%80%E5%8F%91-%E7%99%BD%E6%9D%BF-1.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":7.45,"words":2236},"filePathRelative":"posts/运维/web制作/web项目/后端开发.md","excerpt":"<p>​</p>\\n<h1>flask（是python的web框架）</h1>\\n<p>#flask django</p>\\n<h2>django</h2>\\n<p>“全栈”框架：内置ORM、Admin 后台、表单、认证、路由等全套工具，开箱即用</p>\\n<p>约定大于配置：强制遵守特定的项目结构（如models,views,template）</p>\\n<p>强调快速开发：适合需要快速构建标准化功能的应用(_如CMS，电商平台)</p>\\n<h2>flask</h2>\\n<p>“微框架”：核心仅包含路由和模块渲染，其他功能通过拓展按需添加</p>\\n<p>自由灵活：无强制项目结构，开发者可完全控制技术栈</p>","autoDesc":true}`),i={name:`后端开发.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><p>​</p>
<h1 id="flask-是python的web框架" tabindex="-1"><a class="header-anchor" href="#flask-是python的web框架"><span>flask（是python的web框架）</span></a></h1>
<p>#flask django</p>
<h2 id="django" tabindex="-1"><a class="header-anchor" href="#django"><span>django</span></a></h2>
<p>“全栈”框架：内置ORM、Admin 后台、表单、认证、路由等全套工具，开箱即用</p>
<p>约定大于配置：强制遵守特定的项目结构（如models,views,template）</p>
<p>强调快速开发：适合需要快速构建标准化功能的应用(_如CMS，电商平台)</p>
<h2 id="flask" tabindex="-1"><a class="header-anchor" href="#flask"><span>flask</span></a></h2>
<p>“微框架”：核心仅包含路由和模块渲染，其他功能通过拓展按需添加</p>
<p>自由灵活：无强制项目结构，开发者可完全控制技术栈</p>
<p>适合定制化场景：如微服务，API 后端需要特殊架构的项目</p>
<p>​</p>
<p>​</p>
<p>#启动app应用，只适合在开发过程中使用，线上生产环境要使用专门的wsgi server启动qpp</p>
<p>#python web服务网关接口</p>
<p>​</p>
<p>#专门的wsgi服务器 跑python应用</p>
<p>#我们用python专注于生成网页内容如html文档，而不希望接触到tcp连接，http原始请求和响应格式</p>
<p>#那就用专门的web服务器去运行python应用框架</p>
<p>​</p>
<p>#gunicorn</p>
<p>gunicorn server:app</p>
<p><a href="//xn--server-hp7it40akr4ava0046djbbk59ku8v.xn--pyapp-nn2h216kdo2a" target="_blank" rel="noopener noreferrer">//运行当前目录下的server.py文件的app</a></p>
<p>gunicorn -w 4 --bind '0.0.0.0:8000' server:app</p>
<p><code v-pre>-w</code> 是 <code v-pre>--workers</code> 的缩写，指定启动的<strong>工作进程数量</strong></p>
<p><code v-pre>--bind</code> 指定服务器监听的<strong>IP 地址和端口</strong>：</p>
<p><code v-pre>0.0.0.0</code>：表示允许所有网络接口访问（即外部设备可以通过服务器的 IP 地址访问，而不仅限于本地 <code v-pre>127.0.0.1</code>）。</p>
<p><code v-pre>8000</code>：监听的端口号（可根据需要修改，如 <code v-pre>80</code>、<code v-pre>5000</code> 等）。</p>
<p><code v-pre>server</code>：指当前目录下的 <code v-pre>server.py</code> 文件（模块名）。</p>
<p><code v-pre>app</code>：指 <code v-pre>server.py</code> 文件中定义的 WSGI 应用实例（通常是 <code v-pre>app = Flask(__name__)</code> 这样的代码定义的对象）。</p>
<p>#uwsgi</p>
<h1 id="前后端分离" tabindex="-1"><a class="header-anchor" href="#前后端分离"><span>前后端分离</span></a></h1>
<p>#svn git</p>
<p>git</p>
<div class="language-mermaid line-numbers-mode" data-highlighter="shiki" data-ext="mermaid" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-mermaid"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">flowchart LR</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n1["节点"]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n2["节点"]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n3["节点"]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n1 -- "拉取pull" --> n3</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  n2 --> n1</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="/blog/assets/posts/%E5%90%8E%E7%AB%AF%E5%BC%80%E5%8F%91-%E7%99%BD%E6%9D%BF-1.svg" alt="白板 1" tabindex="0" loading="lazy"><figcaption>白板 1</figcaption></figure>
<p>缺点：</p>
<p>不好做权限控制</p>
<p>每个人都要保存数据，占用磁盘空间</p>
<p>优点：</p>
<p>离线也能修改代码</p>
<p>数据分布在各个节点，不容易丢失</p>
<h2 id="git-bash使用" tabindex="-1"><a class="header-anchor" href="#git-bash使用"><span>git bash使用</span></a></h2>
<h3 id="git-init-创建git本地仓库" tabindex="-1"><a class="header-anchor" href="#git-init-创建git本地仓库"><span>git init//创建git本地仓库</span></a></h3>
<p>//删除git仓库</p>
<p>直接删除当前目录下的.git文件就可以了</p>
<h3 id="git-clone-远程仓库地址" tabindex="-1"><a class="header-anchor" href="#git-clone-远程仓库地址"><span>git clone &lt;远程仓库地址&gt;</span></a></h3>
<p><strong>克隆远程仓库</strong>（从 GitHub/Gitee 等下载项目到本地</p>
<p># 例如：git clone <a href="https://github.com/username/repo.git" target="_blank" rel="noopener noreferrer">https://github.com/username/repo.git</a></p>
<h3 id="git-add" tabindex="-1"><a class="header-anchor" href="#git-add"><span>git add</span></a></h3>
<p><strong>暂存文件</strong>（将修改加入暂存区，准备提交）</p>
<h3 id="git-clone-远程仓库地址-1" tabindex="-1"><a class="header-anchor" href="#git-clone-远程仓库地址-1"><span>git clone &lt;远程仓库地址&gt;</span></a></h3>
<p><strong>克隆远程仓库</strong>（从 GitHub/Gitee 等下载项目到本地）</p>
<h3 id="git-status" tabindex="-1"><a class="header-anchor" href="#git-status"><span>git status</span></a></h3>
<p># 详细状态</p>
<p><strong>查看文件状态</strong>（哪些文件被修改 / 新增 / 删除）</p>
<h3 id="git-add-文件名" tabindex="-1"><a class="header-anchor" href="#git-add-文件名"><span>git add &lt;文件名&gt;</span></a></h3>
<p># 暂存单个文件，例如：git add <a href="http://app.py" target="_blank" rel="noopener noreferrer">app.py</a></p>
<h3 id="git-commit-m" tabindex="-1"><a class="header-anchor" href="#git-commit-m"><span>git commit -m</span></a></h3>
<p>&quot;提交说明&quot; # 必须写清晰的说明，例如：&quot;修复登录bug&quot;</p>
<p>​</p>
<h3 id="git-log" tabindex="-1"><a class="header-anchor" href="#git-log"><span>git log</span></a></h3>
<p># 详细历史（按 q 退出</p>
<h3 id="git-reset-hard-commit-id" tabindex="-1"><a class="header-anchor" href="#git-reset-hard-commit-id"><span>git reset --hard &lt;commit ID&gt;</span></a></h3>
<p># 例如：git reset --hard a1b2c3d 回退版本</p>
<h3 id="git-reset-hard-head-1" tabindex="-1"><a class="header-anchor" href="#git-reset-hard-head-1"><span>git reset --hard HEAD~1</span></a></h3>
<p># 回退到上一个版本（HEAD 表示当前版本，HEAD~1 表示上一个，~2 表示上两个）</p>
<h3 id="git-checkout-文件名" tabindex="-1"><a class="header-anchor" href="#git-checkout-文件名"><span>git checkout -- &lt;文件名&gt;</span></a></h3>
<p># 例如：git checkout -- app.p</p>
<h3 id="git-remote-add-origin-远程仓库地址" tabindex="-1"><a class="header-anchor" href="#git-remote-add-origin-远程仓库地址"><span>git remote add origin &lt;远程仓库地址&gt;</span></a></h3>
<p>添加别名，关联远程仓库</p>
<p># origin 是远程仓库的默认别名</p>
<h3 id="git-remote" tabindex="-1"><a class="header-anchor" href="#git-remote"><span>git remote</span></a></h3>
<p>列出远程仓库别名</p>
<p><strong>查看远程仓库信息</strong>（通常是 origin）</p>
<h3 id="git-remote-v" tabindex="-1"><a class="header-anchor" href="#git-remote-v"><span>git remote -v</span></a></h3>
<p># 显示别名对应的远程地址</p>
<h3 id="git-push-origin-本地分支名" tabindex="-1"><a class="header-anchor" href="#git-push-origin-本地分支名"><span>git push origin &lt;本地分支名&gt;</span></a></h3>
<p># 例如：git push origin dev（推送本地 dev 到远程 dev）</p>
<h3 id="git-push-u-origin-分支名" tabindex="-1"><a class="header-anchor" href="#git-push-u-origin-分支名"><span>git push -u origin &lt;分支名&gt;</span></a></h3>
<p># 首次推送时关联远程分支，后续可直接用 git push</p>
<p>​</p>
<h3 id="git-branch-创建或查看分支" tabindex="-1"><a class="header-anchor" href="#git-branch-创建或查看分支"><span>git branch 创建或查看分支</span></a></h3>
<p># 列出本地分支（当前分支前有 *）</p>
<p>git branch -r # 列出远程分支</p>
<p>git branch -a # 列出所有分支（本地+远程）</p>
<p>git checkout -b &lt;分支名&gt; git switch -c &lt;分支名&gt; <strong>创建并切换分支</strong></p>
<p># 例如：git checkout -b feature/login</p>
<p>git branch -d &lt;分支名&gt; # 删除已合并的分支</p>
<p>git branch -D &lt;分支名&gt; # 强制删除未合并的分支（谨慎使用）</p>
<h2 id="路由-router" tabindex="-1"><a class="header-anchor" href="#路由-router"><span>路由（router）</span></a></h2>
<p>url处理函数</p>
<p>/student /teacher</p>
<p>在服务端 url和视图函数的映射关系称为路由</p>
<p>#常用属性：</p>
<p>#args 接收传递过来的url携带的参数</p>
<p>#json 接收json格式数据传入</p>
<p>#form 接收表单格式数据传入</p>
<p>#headers 获取头部</p>
<p>#url</p>
<p>#path</p>
<h3 id="flask路由管理" tabindex="-1"><a class="header-anchor" href="#flask路由管理"><span>flask路由管理</span></a></h3>
<p>1.当客户端请求，首先在url_map中找到客户端请求的url</p>
<p>2.如果没有直接放回404，有这个url就找出对应的endpoint</p>
<p>3.再拿endpoint去view_functions找对应的视图函数处理</p>
<p>endpoint全局唯一不能重复</p>
<p>​</p>
<h4 id="动态url" tabindex="-1"><a class="header-anchor" href="#动态url"><span>动态url</span></a></h4>
<p>尖括号里面放变量名</p>
<p>@app.route('/Logon/&lt;username&gt;/&lt;password&gt;',endpoint='loginweb',methods=['GET','POST'])</p>
<p>def loginweb(username,password):</p>
<p>if username == 'root' and password == '123456':</p>
<p>return '登录成功'</p>
<p>else:</p>
<p>return '登录失败'</p>
<h2 id="请求-postman使用" tabindex="-1"><a class="header-anchor" href="#请求-postman使用"><span>请求（postman使用）</span></a></h2>
<p>获取用户端请求时携带的数据/头部信息</p>
<p>​</p>
<p>flask中所有请求数据都封装在一个对象中</p>
<h4 id="_1-用「路径参数」-路由带-username-userage" tabindex="-1"><a class="header-anchor" href="#_1-用「路径参数」-路由带-username-userage"><span>1.用「路径参数」（路由带 <code v-pre>&lt;username&gt;/&lt;userage&gt;</code>）</span></a></h4>
<p>@app.route(&quot;/student/&lt;username&gt;/&lt;userage&gt;&quot;)</p>
<p>def student(username, userage):</p>
<p>print(f&quot;路径参数 - username: {username}, userage: {userage}&quot;)</p>
<p>return f&quot;Username: {username}, Userage: {userage}&quot;</p>
<h4 id="_2-用「查询参数」-路由不带路径参数-用-传递" tabindex="-1"><a class="header-anchor" href="#_2-用「查询参数」-路由不带路径参数-用-传递"><span>2.用「查询参数」（路由不带路径参数，用 <code v-pre>?</code> 传递）</span></a></h4>
<p>@app.route(&quot;/student&quot;) # 路由只写 /student，不带 &lt;参数&gt;</p>
<p>def student():</p>
<p>username = request.args.get(&quot;username&quot;)</p>
<p>userage = request.args.get(&quot;userage&quot;)</p>
<p>print(f&quot;查询参数 - username: {username}, userage: {userage}&quot;)</p>
<p>return f&quot;Username: {username}, Userage: {userage}&quot;</p>
<p>​</p>
<h3 id="通过json格式传递数据" tabindex="-1"><a class="header-anchor" href="#通过json格式传递数据"><span>通过json格式传递数据</span></a></h3>
<p>{</p>
<p>usernam：111</p>
<p>passwd：123456</p>
<p>}</p>
<h2 id="响应-response" tabindex="-1"><a class="header-anchor" href="#响应-response"><span>响应（response）</span></a></h2>
<p>api --json格式返回</p>
<p>code：程序状态码 设计 0为成功 非0为失败</p>
<p>data：返回的数据</p>
<p>message：对此次返回的说明</p>
<h2 id="工程化管理" tabindex="-1"><a class="header-anchor" href="#工程化管理"><span>工程化管理</span></a></h2>
<p>web开发软件设计模式</p>
<h3 id="_1-mvc" tabindex="-1"><a class="header-anchor" href="#_1-mvc"><span>1.mvc</span></a></h3>
<p>m -model(模型) 负责数据处理</p>
<p>v -view(视图) 用户界面展示</p>
<p>c -controller 负责接收请求，转发处理</p>
<h3 id="_2-mtv" tabindex="-1"><a class="header-anchor" href="#_2-mtv"><span>2.mtv</span></a></h3>
<p>m -model 数据</p>
<p>v -view --controller</p>
<p>t -template --view</p>
<p>项目拆分</p>
<h2 id="orm映射" tabindex="-1"><a class="header-anchor" href="#orm映射"><span>ORM映射</span></a></h2>
<p>#orm relationship mapping</p>
<p>#对象关系映射</p>
<p>#对数据库操作的常见设计</p>
<table>
<thead>
<tr>
<th></th>
<th>ORM</th>
<th>直接查询</th>
</tr>
</thead>
<tbody>
<tr>
<td>开发效率</td>
<td>高</td>
<td>低</td>
</tr>
<tr>
<td>性能</td>
<td>可优化程度低</td>
<td>可优化程度高</td>
</tr>
<tr>
<td>灵活性</td>
<td>低</td>
<td>高</td>
</tr>
<tr>
<td>数据迁移</td>
<td>容易</td>
<td>困难</td>
</tr>
</tbody>
</table>
<h2 id="api-设计-功能" tabindex="-1"><a class="header-anchor" href="#api-设计-功能"><span>api 设计 功能</span></a></h2>
<table>
<thead>
<tr>
<th>请求路由</th>
<th>请求方法</th>
<th>接受参数</th>
<th>参数类型</th>
<th>返回数据</th>
<th>状态码</th>
<th>​</th>
</tr>
</thead>
<tbody>
<tr>
<td>/student</td>
<td>GET</td>
<td>无</td>
<td>无</td>
<td>json</td>
<td>0成功</td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="restful接口规范" tabindex="-1"><a class="header-anchor" href="#restful接口规范"><span>restful接口规范</span></a></h3>
<p>#rest表现层状态转移</p>
<p>​</p>
<p>非restful接口架构</p>
<p>/student/add post，put</p>
<p>/student/modify post，put</p>
<p>/student/delete</p>
<p>​</p>
<p>#rest 每一类数据看作一种资源</p>
<p>/student</p>
<p>/teacher</p>
<p>#资源 通过http的动作实现状态转移 GET，POST，PUT，DELETE</p>
<p>#{version}{resource}{resource_id}</p>
<p>#version API版本号,有些版本号放置在头信息，通过控制版本号有利于应用迭代</p>
<p>#resource 资源</p>
<p>#resource_id 资源的id，</p>
<p>​</p>
<p>#restful api设计</p>
<p># 方法<br>
#/v1/student post 新增<br>
# get 查询所有学生<br>
#/v1/student/1 put 修改</p>
<p># delete 删除学生信息</p>
<p># get 查询某一个学生的具体信息</p>
<p>​</p>
<h2 id="数据库远端连接" tabindex="-1"><a class="header-anchor" href="#数据库远端连接"><span>数据库远端连接</span></a></h2>
<p>创建一个名为 <code v-pre>flask</code> 的 MySQL 用户。</p>
<p><code v-pre>create user &quot;flask&quot;@&quot;%&quot; identified by 'Asdf&amp;24680';</code></p>
<p>给 <code v-pre>flask</code> 用户分配权限。</p>
<p><code v-pre>grant all privileges on *.* to 'flask'@'%' with grant option;</code></p>
<p>刷新 MySQL 的权限表，使刚才的用户创建和权限分配立即生效（否则可能需要重启 MySQL 服务才生效）</p>
<p><code v-pre>flush privileges;</code></p>
<p>​</p>
<p>​</p>
<p>​</p>
<h2 id="数据库的关系-表设计" tabindex="-1"><a class="header-anchor" href="#数据库的关系-表设计"><span>数据库的关系（表设计）</span></a></h2>
<p>数据库的设计</p>
<p>​</p>
<p>​</p>
<p>​</p>
<h1 id="认证" tabindex="-1"><a class="header-anchor" href="#认证"><span>认证</span></a></h1>
<p>1.浏览器访问认证 --登录、</p>
<p>2.api授权认证 应用程序和服务之间</p>
<p>​</p>
<p>​</p>
<p>#http协议 无状态 本身不保存任何数据</p>
<p>​</p>
<p>#会话保持机制</p>
<p>#cookie session</p>
<p>#客户端 服务端</p>
<p>​</p>
<p>​</p>
<figure><img src="/blog/assets/posts/%E5%90%8E%E7%AB%AF%E5%BC%80%E5%8F%91-%E7%99%BD%E6%9D%BF-2.svg" alt="白板 2" tabindex="0" loading="lazy"><figcaption>白板 2</figcaption></figure>
<p>​</p>
<p>#token 验证</p>
<p>​</p>
<figure><img src="/blog/assets/posts/%E5%90%8E%E7%AB%AF%E5%BC%80%E5%8F%91-%E7%99%BD%E6%9D%BF-3.svg" alt="白板 3" tabindex="0" loading="lazy"><figcaption>白板 3</figcaption></figure>
<table>
<thead>
<tr>
<th><strong>特性</strong></th>
<th><strong>Cookie</strong></th>
<th><strong>Session</strong></th>
<th><strong>Token</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>存储位置</strong></td>
<td>客户端（浏览器）</td>
<td>服务器端</td>
<td>客户端（可存储在多种位置）</td>
</tr>
<tr>
<td><strong>安全性</strong></td>
<td>较低（可被客户端修改，除非设 HttpOnly）</td>
<td>较高（数据在服务器）</td>
<td>中高（加密，但需妥善存储）</td>
</tr>
<tr>
<td><strong>状态</strong></td>
<td>可持久化（设过期时间）或会话级</td>
<td>会话级（过期或关闭浏览器失效）</td>
<td>无状态（服务器不存储会话数据）</td>
</tr>
<tr>
<td><strong>数据容量</strong></td>
<td>小（约 4KB）</td>
<td>可存储较多数据</td>
<td>通常较小（仅为凭证）</td>
</tr>
<tr>
<td><strong>传递方式</strong></td>
<td>自动随请求发送（同一域名）</td>
<td>通过 Cookie 传递 Session ID</td>
<td>手动在请求头 / 参数中携带</td>
</tr>
<tr>
<td><strong>适用场景</strong></td>
<td>存储少量非敏感信息、会话标识</td>
<td>存储用户会话状态、临时数据</td>
<td>API 认证、第三方登录、跨域请求</td>
</tr>
</tbody>
</table>
<h2 id="jwt规范" tabindex="-1"><a class="header-anchor" href="#jwt规范"><span>JWT规范</span></a></h2>
<p>#jwt (JSON Web Token) 是一种开放标准（RFC 7519）,用于在各方之间以JSON对象的形式安全的传输信息的一种规范</p>
<p>​</p>
<p>#一个JWT令牌由三个部分组成，用 . 分隔</p>
<p>#xxxxx.yyyyy.zzzzz</p>
<p>​</p>
<p>第一部分：Header（头部）</p>
<p>包含令牌类型和签名算法：</p>
<p>{</p>
<p>&quot;alg&quot;:&quot;HS256&quot;,</p>
<p>&quot;typ&quot;:&quot;JWT&quot;</p>
<p>}</p>
<p>第二部分：payload</p>
<p>关于用户和附加信息的JSON数据</p>
<p>{</p>
<p>&quot;id&quot;:1,</p>
<p>&quot;username&quot;:&quot;KBL&quot;,</p>
<p>&quot;exp&quot;:1727779154， #过期时间</p>
<p>&quot;iss&quot;:&quot;myapp&quot;</p>
<p>}</p>
<p>第三部分：Signature（签名）</p>
<p>用于验证令牌完整性和防止篡改</p>
<p>​</p>
<p>​</p>
<h2 id="api授权认证" tabindex="-1"><a class="header-anchor" href="#api授权认证"><span>api授权认证</span></a></h2>
<figure><img src="/blog/assets/posts/%E5%90%8E%E7%AB%AF%E5%BC%80%E5%8F%91-%E7%99%BD%E6%9D%BF-4.svg" alt="白板 4" tabindex="0" loading="lazy"><figcaption>白板 4</figcaption></figure>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};