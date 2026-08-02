import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E8%B7%B3%E5%8A%A8%E8%BF%90%E7%BB%B4%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88%E9%9D%A2%E8%AF%95%E5%87%86%E5%A4%87%E6%8C%87%E5%8D%97(%E9%80%82%E9%85%8D%E4%BD%A0%E7%9A%84%E7%AE%80%E5%8E%86%E8%83%8C%E6%99%AF)/Shell%E5%A4%8D%E4%B9%A0.html","title":"Shell复习","lang":"zh-CN","frontmatter":{"title":"Shell复习","icon":"clipboard-text","date":"2026-07-23T00:00:00.000Z","category":["面试"],"description":"变量 什么是变量? 很多人可能会说，可以变化的量就是变量。但是发现很多汉语意思很强大，你看的懂的字，却不一定可以理解它的意思。这里你可以理解为 a = 1,同时还可以 a =2、a = 3 ，不同的值都可以复制给同一个 变量 a 。 ​ # 常见的3种变量 Shell编程中变量分为三种，分别是系统变量、环境变量和用户变量，Shell变量名在定义时，首个...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Shell复习\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E8%B7%B3%E5%8A%A8%E8%BF%90%E7%BB%B4%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88%E9%9D%A2%E8%AF%95%E5%87%86%E5%A4%87%E6%8C%87%E5%8D%97(%E9%80%82%E9%85%8D%E4%BD%A0%E7%9A%84%E7%AE%80%E5%8E%86%E8%83%8C%E6%99%AF)/Shell%E5%A4%8D%E4%B9%A0.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"Shell复习"}],["meta",{"property":"og:description","content":"变量 什么是变量? 很多人可能会说，可以变化的量就是变量。但是发现很多汉语意思很强大，你看的懂的字，却不一定可以理解它的意思。这里你可以理解为 a = 1,同时还可以 a =2、a = 3 ，不同的值都可以复制给同一个 变量 a 。 ​ # 常见的3种变量 Shell编程中变量分为三种，分别是系统变量、环境变量和用户变量，Shell变量名在定义时，首个..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":10.48,"words":3144},"filePathRelative":"posts/面试/字节面试/字节跳动运维开发工程师面试准备指南(适配你的简历背景)/Shell复习.md","excerpt":"<h2>变量</h2>\\n<h3>什么是变量?</h3>\\n<p>很多人可能会说，可以变化的量就是变量。但是发现很多汉语意思很强大，你看的懂的字，却不一定可以理解它的意思。这里你可以理解为 a = 1,同时还可以 a =2、a = 3 ，不同的值都可以复制给同一个 变量 a 。</p>\\n<p>​</p>\\n<p># 常见的3种变量</p>\\n<p>Shell编程中变量分为三种，分别是系统变量、环境变量和用户变量，Shell变量名在定义时，首个字符必须为字母（a-z，A-Z），不能以数字开头，中间不能有空格，可以使用下划线（_），不能使用（-），也不能使用标点符号等。</p>\\n<div class=\\"language-plain line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"plain\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code class=\\"language-plain\\"><span class=\\"line\\"><span>[root@keeplived_server~]# a=18</span></span>\\n<span class=\\"line\\"><span>[root@keeplived_server~]# echo $a</span></span>\\n<span class=\\"line\\"><span>18</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`),i={name:`Shell复习.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><h2 id="变量" tabindex="-1"><a class="header-anchor" href="#变量"><span>变量</span></a></h2>
<h3 id="什么是变量" tabindex="-1"><a class="header-anchor" href="#什么是变量"><span>什么是变量?</span></a></h3>
<p>很多人可能会说，可以变化的量就是变量。但是发现很多汉语意思很强大，你看的懂的字，却不一定可以理解它的意思。这里你可以理解为 a = 1,同时还可以 a =2、a = 3 ，不同的值都可以复制给同一个 变量 a 。</p>
<p>​</p>
<p># 常见的3种变量</p>
<p>Shell编程中变量分为三种，分别是系统变量、环境变量和用户变量，Shell变量名在定义时，首个字符必须为字母（a-z，A-Z），不能以数字开头，中间不能有空格，可以使用下划线（_），不能使用（-），也不能使用标点符号等。</p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>[root@keeplived_server~]# a=18</span></span>
<span class="line"><span>[root@keeplived_server~]# echo $a</span></span>
<span class="line"><span>18</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p>
<h3 id="系统变量" tabindex="-1"><a class="header-anchor" href="#系统变量"><span>系统变量</span></a></h3>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># Shell常见的变量之一系统变量，主要是用于对参数判断和命令返回值判断时使用，系统变量详解如下：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$0 		当前脚本的名称；</span></span>
<span class="line"><span>$n 		当前脚本的第n个参数,n=1,2,…9；</span></span>
<span class="line"><span>$* 		当前脚本的所有参数(不包括程序本身)；</span></span>
<span class="line"><span>$# 		当前脚本的参数个数(不包括程序本身)；</span></span>
<span class="line"><span>$? 		令或程序执行完后的状态，返回0表示执行成功；</span></span>
<span class="line"><span>$$ 		程序本身的PID号。</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="环境变量" tabindex="-1"><a class="header-anchor" href="#环境变量"><span>环境变量</span></a></h3>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>#Shell常见的变量之二环境变量，主要是在程序运行时需要设置，环境变量详解如下：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>PATH  		命令所示路径，以冒号为分割；</span></span>
<span class="line"><span>HOME  		打印用户家目录；</span></span>
<span class="line"><span>SHELL 		显示当前Shell类型；</span></span>
<span class="line"><span>USER  		打印当前用户名；</span></span>
<span class="line"><span>ID    		打印当前用户id信息；</span></span>
<span class="line"><span>PWD   		显示当前所在路径；</span></span>
<span class="line"><span>TERM  		打印当前终端类型；</span></span>
<span class="line"><span>HOSTNAME    显示当前主机名；</span></span>
<span class="line"><span>PS1         定义主机命令提示符的；</span></span>
<span class="line"><span>HISTSIZE    历史命令大小，可通过 HISTTIMEFORMAT 变量设置命令执行时间;</span></span>
<span class="line"><span>RANDOM      随机生成一个 0 至 32767 的整数;</span></span>
<span class="line"><span>HOSTNAME    主机名</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p>
<h3 id="用户变量" tabindex="-1"><a class="header-anchor" href="#用户变量"><span>用户变量</span></a></h3>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># 常见的变量之三用户变量，用户变量又称为局部变量，主要用在Shell脚本内部或者临时局部使用，系统变量详解如下：</span></span>
<span class="line"><span>a=rivers 				       自定义变量A；</span></span>
<span class="line"><span>Httpd_sort=httpd-2.4.6-97.tar  自定义变量N_SOFT；</span></span>
<span class="line"><span>BACK_DIR=/data/backup/         自定义变量BACK_DIR；</span></span>
<span class="line"><span>IPaddress=10.0.0.1			   自定义变量IP1；</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="流程控制语句" tabindex="-1"><a class="header-anchor" href="#流程控制语句"><span>流程控制语句</span></a></h2>
<h3 id="if条件语句" tabindex="-1"><a class="header-anchor" href="#if条件语句"><span>if条件语句</span></a></h3>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># If条件判断语句，通常以if开头，fi结尾。也可加入else或者elif进行多条件的判断</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 单分支语句 ---比较大小</span></span>
<span class="line"><span>	if (条件表达式);then</span></span>
<span class="line"><span>		语句1</span></span>
<span class="line"><span>	fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 双分支if 语句</span></span>
<span class="line"><span>	if (表达式)</span></span>
<span class="line"><span>		语句1</span></span>
<span class="line"><span>	else</span></span>
<span class="line"><span>		语句2</span></span>
<span class="line"><span>	fi</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 多支条件语句 ---判断成绩</span></span>
<span class="line"><span>	if (表达式)</span></span>
<span class="line"><span>		语句1</span></span>
<span class="line"><span>	elif</span></span>
<span class="line"><span>		语句2</span></span>
<span class="line"><span>	elif</span></span>
<span class="line"><span>		语句2</span></span>
<span class="line"><span>	fi</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p>
<h4 id="if的逻辑运算符" tabindex="-1"><a class="header-anchor" href="#if的逻辑运算符"><span>if的逻辑运算符</span></a></h4>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>-f	 	判断文件是否存在 eg: if [ -f filename ]；</span></span>
<span class="line"><span>-d	 	判断目录是否存在 eg: if [ -d dir     ]；</span></span>
<span class="line"><span>-eq		等于，应用于整型比较 equal；</span></span>
<span class="line"><span>-ne		不等于，应用于整型比较 not equal；</span></span>
<span class="line"><span>-lt		小于，应用于整型比较 letter；</span></span>
<span class="line"><span>-gt		大于，应用于整型比较 greater；</span></span>
<span class="line"><span>-le		小于或等于，应用于整型比较；</span></span>
<span class="line"><span>-ge 	大于或等于，应用于整型比较；</span></span>
<span class="line"><span>-a		双方都成立（and） 逻辑表达式 –a 逻辑表达式；</span></span>
<span class="line"><span>-o		单方成立（or） 逻辑表达式 –o 逻辑表达式；</span></span>
<span class="line"><span>-z		空字符串；</span></span>
<span class="line"><span>-x      是否具有可执行权限</span></span>
<span class="line"><span>||      单方成立；</span></span>
<span class="line"><span>&#x26;&#x26;      双方都成立表达式。</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="判断学生成绩等级" tabindex="-1"><a class="header-anchor" href="#判断学生成绩等级"><span>判断学生成绩等级</span></a></h4>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># if 语句可以直接对命令状态进行判断，就省去了获取$?这一步！</span></span>
<span class="line"><span>  # 如果第一个条件符合就不再向下匹配</span></span>
<span class="line"><span>#!/bin/bash</span></span>
<span class="line"><span>  # this check grade shell</span></span>
<span class="line"><span>  # by author rivers on 2021-09-27</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  grade=$1</span></span>
<span class="line"><span>  if [ $grade -gt 90 ];then</span></span>
<span class="line"><span>    echo "Is's very good!"</span></span>
<span class="line"><span>  elif [ $grade -gt 70 ];then</span></span>
<span class="line"><span>    echo "Is's is good!"</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  elif [ $grade -ge 60 ];then</span></span>
<span class="line"><span>    echo "pass"</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  else</span></span>
<span class="line"><span>    echo "no pass"</span></span>
<span class="line"><span>  fi</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="for循环语句" tabindex="-1"><a class="header-anchor" href="#for循环语句"><span>for循环语句</span></a></h3>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>#格式：for name [ [ in [ word ... ] ] ; ] do list ; done</span></span>
<span class="line"><span>  for 变量名 in 取值列表; do</span></span>
<span class="line"><span>    语句 1</span></span>
<span class="line"><span>  done</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p>
<h4 id="查看多台主机存活情况" tabindex="-1"><a class="header-anchor" href="#查看多台主机存活情况"><span>查看多台主机存活情况</span></a></h4>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>#!/bin/bash</span></span>
<span class="line"><span># check hosts is on/Off</span></span>
<span class="line"><span># by rivers on 20219-23</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Network=$1</span></span>
<span class="line"><span>for Host in $(seq 1 254)</span></span>
<span class="line"><span>do</span></span>
<span class="line"><span>ping -c 1 $Network.$Host > /dev/null &#x26;&#x26; result=0 || result=1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if [ "$result" == 0 ];then</span></span>
<span class="line"><span>  echo -e "\\033[32;1m$Network.$Host is up \\033[0m"</span></span>
<span class="line"><span>  echo "$Network.$Host" >> /tmp/up.txt</span></span>
<span class="line"><span></span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>  echo -e "\\033[;31m$Network.$Host is down \\033[0m"</span></span>
<span class="line"><span>  echo "$Network.$Host" >> /tmp/down.txt</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span>done</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="while循环语句" tabindex="-1"><a class="header-anchor" href="#while循环语句"><span>while循环语句</span></a></h3>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># While循环语句与for循环功能类似，主要用于对某个数据域进行循环读取、对文件进行遍历，通常用于需要循环某个文件或者列表，满足循环条件会一直循环，不满足则退出循环，其语法格式以while…do开头，done结尾与 </span></span>
<span class="line"><span>#while 关联的还有一个 until 语句，它与 while 不同之处在于，是当条件表达式为 false 时才循环，实际使用中比较少，这里不再讲解。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>while  (表达式)</span></span>
<span class="line"><span>do</span></span>
<span class="line"><span>  语句1</span></span>
<span class="line"><span>done</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="break和continue语句" tabindex="-1"><a class="header-anchor" href="#break和continue语句"><span>break和continue语句</span></a></h4>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span># break 和 continue 语句</span></span>
<span class="line"><span>  break 是终止循环。</span></span>
<span class="line"><span>  continue 是跳出当前循环。</span></span>
<span class="line"><span>#示例 1：在死循环中，满足条件终止循环</span></span>
<span class="line"><span>while true; do</span></span>
<span class="line"><span>  let N++</span></span>
<span class="line"><span>  if [ $N -eq 5 ]; then</span></span>
<span class="line"><span>    break</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span>  echo $N</span></span>
<span class="line"><span>done</span></span>
<span class="line"><span>输出： 1 2 3 4</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#示例 2：举例子说明 continue 用法</span></span>
<span class="line"><span>N=0</span></span>
<span class="line"><span>while [ $N -lt 5 ]; do</span></span>
<span class="line"><span>  let N++</span></span>
<span class="line"><span>if [ $N -eq 3 ]; then</span></span>
<span class="line"><span>  continue</span></span>
<span class="line"><span>fi</span></span>
<span class="line"><span>  echo $N</span></span>
<span class="line"><span>done</span></span>
<span class="line"><span></span></span>
<span class="line"><span>输出： 1 2 4</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 打印 1-100 数字</span></span>
<span class="line"><span>i=0</span></span>
<span class="line"><span>while ((i&#x3C;=100))</span></span>
<span class="line"><span>do</span></span>
<span class="line"><span>        echo  $i</span></span>
<span class="line"><span>        i=$((i + 1))</span></span>
<span class="line"><span>done</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="while求1-100的和" tabindex="-1"><a class="header-anchor" href="#while求1-100的和"><span>while求1-100的和</span></a></h4>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>#!/bin/bash</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sum=0</span></span>
<span class="line"><span>limit=100</span></span>
<span class="line"><span>for ((i=1;i&#x3C;=limit;i++)); do</span></span>
<span class="line"><span>    ((sum+=i))</span></span>
<span class="line"><span>done</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo "$sum"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="case选择语句" tabindex="-1"><a class="header-anchor" href="#case选择语句"><span>case选择语句</span></a></h3>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>#Case选择语句，主要用于对多个选择条件进行匹配输出，与if elif语句结构类似，通常用于脚本传递输入参数，打印出输出结果及内容，其语法格式以Case…in开头，esac结尾。语法格式如下：</span></span>
<span class="line"><span>case 模式名  in</span></span>
<span class="line"><span>  模式 1)</span></span>
<span class="line"><span>    命令</span></span>
<span class="line"><span>    ;;</span></span>
<span class="line"><span>  模式 2)</span></span>
<span class="line"><span>    命令</span></span>
<span class="line"><span>    ;;</span></span>
<span class="line"><span>*)</span></span>
<span class="line"><span>不符合以上模式执行的命令</span></span>
<span class="line"><span>esac</span></span>
<span class="line"><span># 每个模式必须以右括号结束，命令结尾以双分号结束</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p>
<h4 id="http服务启动脚本" tabindex="-1"><a class="header-anchor" href="#http服务启动脚本"><span>http服务启动脚本</span></a></h4>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>[root@web-server01~/script]# vim httpd_start.sh </span></span>
<span class="line"><span># check http server start|stop|starus</span></span>
<span class="line"><span># by author rivers on 2021-9-27</span></span>
<span class="line"><span>while true</span></span>
<span class="line"><span>do</span></span>
<span class="line"><span>    echo -e "</span></span>
<span class="line"><span>    \\033[31m start \\033[0m</span></span>
<span class="line"><span>    \\033[32m stop \\033[0m </span></span>
<span class="line"><span>    \\033[33m status \\033[0m</span></span>
<span class="line"><span>    \\033[34m quit \\033[0m </span></span>
<span class="line"><span>"</span></span>
<span class="line"><span>read -p "请输入你的选择start|stop|quit：" char</span></span>
<span class="line"><span>case $char in</span></span>
<span class="line"><span>start)</span></span>
<span class="line"><span>    systemctl start httpd &#x26;&#x26; echo "httpd服务已经开启" || echo "开启失败"</span></span>
<span class="line"><span>;;</span></span>
<span class="line"><span>stop)</span></span>
<span class="line"><span>    systemctl stop httpd &#x26;&#x26; echo "httpd服务已经关闭" || echo "关闭失败"</span></span>
<span class="line"><span>;;</span></span>
<span class="line"><span>restart)</span></span>
<span class="line"><span>    systemctl restart httpd &#x26;&#x26; echo "httpd服务已经重启" || echo "重启失败</span></span>
<span class="line"><span>"</span></span>
<span class="line"><span>;;</span></span>
<span class="line"><span>status)</span></span>
<span class="line"><span>    systemctl status httpd &#x26;&#x26; echo -e "</span></span>
<span class="line"><span>        httpd 的服务状态</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>;;</span></span>
<span class="line"><span>quit)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="select-选择语句" tabindex="-1"><a class="header-anchor" href="#select-选择语句"><span>select 选择语句</span></a></h3>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>#select 是一个类似于 for 循环的语句</span></span>
<span class="line"><span>#Select语句一般用于选择，常用于选择菜单的创建，可以配合PS3来做打印菜单的输出信息，其语法格式以select…in do开头，done结尾：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>select i in （表达式） </span></span>
<span class="line"><span>do</span></span>
<span class="line"><span>语句</span></span>
<span class="line"><span>done</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 选择mysql 版本</span></span>
<span class="line"><span>#!/bin/bash</span></span>
<span class="line"><span># by author rivers on 2021-9-27</span></span>
<span class="line"><span>PS3="Select a number: "</span></span>
<span class="line"><span>while true; do</span></span>
<span class="line"><span>select mysql_version in 5.1 5.6 quit;</span></span>
<span class="line"><span> do</span></span>
<span class="line"><span>  case $mysql_version in</span></span>
<span class="line"><span>  5.1)</span></span>
<span class="line"><span>    echo "mysql 5.1"</span></span>
<span class="line"><span>      break</span></span>
<span class="line"><span>      ;;</span></span>
<span class="line"><span>  5.6)</span></span>
<span class="line"><span>    echo "mysql 5.6"</span></span>
<span class="line"><span>       break</span></span>
<span class="line"><span>       ;;</span></span>
<span class="line"><span>  quit)</span></span>
<span class="line"><span>    exit</span></span>
<span class="line"><span>    ;;</span></span>
<span class="line"><span>  *)</span></span>
<span class="line"><span>    echo "Input error, Please enter again!"</span></span>
<span class="line"><span>      break</span></span>
<span class="line"><span>esac</span></span>
<span class="line"><span> done</span></span>
<span class="line"><span>done</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="进阶" tabindex="-1"><a class="header-anchor" href="#进阶"><span>进阶</span></a></h2>
<h2 id="shell正则表达式" tabindex="-1"><a class="header-anchor" href="#shell正则表达式"><span>shell正则表达式</span></a></h2>
<p>如果你用 <code v-pre>grep</code>、<code v-pre>sed</code>，默认用的是基础正则；如果你用 <code v-pre>egrep</code> 或者 <code v-pre>awk</code>，则可以使用更强大的扩展正则。</p>
<hr>
<h3 id="基础元字符-所有流派通用" tabindex="-1"><a class="header-anchor" href="#基础元字符-所有流派通用"><span>基础元字符（所有流派通用）</span></a></h3>
<p>这些是你处理日志、过滤 IP 时的“基本功”。</p>
<table>
<thead>
<tr>
<th><strong>元字符</strong></th>
<th><strong>含义</strong></th>
<th><strong>示例</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>.</code></td>
<td>匹配<strong>任意单个</strong>字符（换行符除外）</td>
<td><code v-pre>r..t</code>&lt;br&gt;匹配 <code v-pre>root</code>&lt;br&gt;, <code v-pre>rsst</code></td>
</tr>
<tr>
<td><code v-pre>*</code></td>
<td>匹配前面的字符<strong>0次或多次</strong></td>
<td><code v-pre>ab*</code>&lt;br&gt;匹配 <code v-pre>a</code>&lt;br&gt;, <code v-pre>ab</code>&lt;br&gt;, <code v-pre>abbb</code></td>
</tr>
<tr>
<td><code v-pre>^</code></td>
<td>匹配<strong>行首</strong></td>
<td><code v-pre>^root</code>&lt;br&gt;匹配以 root 开头的行</td>
</tr>
<tr>
<td><code v-pre>$</code></td>
<td>匹配<strong>行尾</strong></td>
<td><code v-pre>false$</code>&lt;br&gt;匹配以 false 结尾的行</td>
</tr>
<tr>
<td><code v-pre>[ ]</code></td>
<td>匹配括号内<strong>任意一个</strong>字符</td>
<td><code v-pre>[abc]</code>&lt;br&gt;匹配 a 或 b 或 c</td>
</tr>
<tr>
<td><code v-pre>[^ ]</code></td>
<td>匹配<strong>不在</strong>括号内的任意一个字符</td>
<td><code v-pre>[^0-9]</code>&lt;br&gt;匹配非数字字符</td>
</tr>
<tr>
<td><code v-pre>\\</code></td>
<td><strong>转义符</strong>，让特殊字符失去魔力</td>
<td><code v-pre>\\.</code>&lt;br&gt;匹配真正的点号</td>
</tr>
</tbody>
</table>
<hr>
<h3 id="扩展元字符-让逻辑更简单" tabindex="-1"><a class="header-anchor" href="#扩展元字符-让逻辑更简单"><span>扩展元字符（让逻辑更简单）</span></a></h3>
<p>使用 <code v-pre>grep -E</code> 或 <code v-pre>awk</code> 时，这些符号能让你少写很多繁琐的转义。</p>
<table>
<thead>
<tr>
<th><strong>元字符</strong></th>
<th><strong>含义</strong></th>
<th><strong>示例</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>+</code></td>
<td>匹配前面的字符<strong>1次或多次</strong></td>
<td><code v-pre>[0-9]+</code>&lt;br&gt;匹配至少一个数字</td>
</tr>
<tr>
<td><code v-pre>?</code></td>
<td>匹配前面的字符<strong>0次或1次</strong></td>
<td><code v-pre>https?</code>&lt;br&gt;匹配 http 或 https</td>
</tr>
<tr>
<td>**\`</td>
<td>\`**</td>
<td><strong>逻辑或</strong>（二选一）</td>
</tr>
<tr>
<td><code v-pre>( )</code></td>
<td><strong>分组</strong>，将多个字符看作整体</td>
<td><code v-pre>(abc)+</code>&lt;br&gt;匹配 abc, abcabc</td>
</tr>
<tr>
<td><code v-pre>{n,m}</code></td>
<td>匹配前面的字符 <strong>n 到 m 次</strong></td>
<td><code v-pre>[0-9]{1,3}</code>&lt;br&gt;匹配 1 到 3 位数字</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="grep" tabindex="-1"><a class="header-anchor" href="#grep"><span>grep</span></a></h2>
<h3 id="基础过滤-入门级-找得到" tabindex="-1"><a class="header-anchor" href="#基础过滤-入门级-找得到"><span>基础过滤（入门级：找得到）</span></a></h3>
<p>这是最常用的基本操作，重点在于<strong>精准定位</strong>。</p>
<ul>
<li>
<p><code v-pre>**-i**</code> <strong>(Ignore case)</strong>：忽略大小写。查日志时，你不知道错误是 <code v-pre>Error</code> 还是 <code v-pre>error</code>，必带 <code v-pre>-i</code>。</p>
</li>
<li>
<p><code v-pre>**-v**</code> <strong>(Invert match)</strong>：反向选择。</p>
</li>
<li>
<p><em>实战场景</em>：<code v-pre>grep -v &quot;^#&quot; /etc/nginx/nginx.conf | grep -v &quot;^$&quot;</code>（查看配置文件时，过滤掉所有注释行和空行，只看干货）。</p>
</li>
<li>
<p><code v-pre>**-w**</code> <strong>(Word regexp)</strong>：精确匹配单词。搜 <code v-pre>user</code> 不会搜到 <code v-pre>users</code>。</p>
</li>
</ul>
<hr>
<h3 id="场景化增强-进阶级-上下文" tabindex="-1"><a class="header-anchor" href="#场景化增强-进阶级-上下文"><span>场景化增强（进阶级：上下文）</span></a></h3>
<p>在排查 <strong>LVS</strong> 或 <strong>MySQL</strong> 崩溃时，光看报错那一行是不够的，你需要看它的“前因后果”。</p>
<ul>
<li>
<p><code v-pre>**-A n**</code> <strong>(After)</strong>：显示匹配行及<strong>后</strong> n 行。</p>
</li>
<li>
<p><code v-pre>**-B n**</code> <strong>(Before)</strong>：显示匹配行及<strong>前</strong> n 行。</p>
</li>
<li>
<p><code v-pre>**-C n**</code> <strong>(Context)</strong>：显示匹配行及<strong>前后</strong>各 n 行。</p>
</li>
<li>
<p><em>实战场景</em>：<code v-pre>grep -C 5 &quot;Connection refused&quot; /var/log/messages</code>（查看报错发生前后的系统日志，寻找诱因）。</p>
</li>
<li>
<p><code v-pre>**-n**</code>：显示行号，方便你直接 <code v-pre>vim +行号</code> 去修改文件。</p>
</li>
</ul>
<hr>
<h3 id="强力搜索-专家级-正则与递归" tabindex="-1"><a class="header-anchor" href="#强力搜索-专家级-正则与递归"><span>强力搜索（专家级：正则与递归）</span></a></h3>
<p>当你需要处理复杂逻辑或大规模文件集时。</p>
<ul>
<li>
<p><code v-pre>**-E**</code> <strong>(Extended regexp)</strong>：开启扩展正则（相当于 <code v-pre>egrep</code>）。</p>
</li>
<li>
<p><em>实战场景</em>：<code v-pre>grep -E &quot;404|500|502&quot; access.log</code>（同时查找多种状态码）。</p>
</li>
<li>
<p><code v-pre>**-r**</code> <strong>(Recursive)</strong>：递归搜索目录。</p>
</li>
<li>
<p><em>实战场景</em>：<code v-pre>grep -r &quot;zh-kinger.com&quot; /etc/nginx/conf.d/</code>（在所有配置文件中查找某个域名）。</p>
</li>
<li>
<p><code v-pre>**-l**</code> <strong>(files-with-matches)</strong>：只列出包含关键词的文件名。</p>
</li>
<li>
<p><em>实战场景</em>：配合 <code v-pre>sed</code> 进行批量替换。<code v-pre>grep -rl &quot;old_ip&quot; ./ | xargs sed -i 's/old_ip/new_ip/g'</code>。</p>
</li>
</ul>
<h2 id="awk介绍与语法" tabindex="-1"><a class="header-anchor" href="#awk介绍与语法"><span>awk介绍与语法</span></a></h2>
<h3 id="核心模型-行-record-与列-field" tabindex="-1"><a class="header-anchor" href="#核心模型-行-record-与列-field"><span>核心模型：行（Record）与列（Field）</span></a></h3>
<p><code v-pre>awk</code> 默认以<strong>空格</strong>或<strong>制表符</strong>作为分隔符，将每一行切开。</p>
<ul>
<li><code v-pre>**$0**</code>：代表整行内容。</li>
<li><code v-pre>**$1, $2...$n**</code>：代表第 1, 2...n 个字段（列）。</li>
<li><code v-pre>**NF**</code> <strong>(Number of Fields)</strong>：内置变量，代表当前行一共有多少列。</li>
<li><code v-pre>**NR**</code> <strong>(Number of Records)</strong>：内置变量，代表当前处理的是第几行。</li>
</ul>
<hr>
<h3 id="语法精髓-pattern-action" tabindex="-1"><a class="header-anchor" href="#语法精髓-pattern-action"><span>语法精髓：Pattern + Action</span></a></h3>
<p><code v-pre>awk</code> 的逻辑结构非常固定：<code v-pre>awk '条件 { 动作 }' 文件名</code></p>
<h4 id="a-基础截取-最常用" tabindex="-1"><a class="header-anchor" href="#a-基础截取-最常用"><span>A. 基础截取（最常用）</span></a></h4>
<ul>
<li><strong>提取 IP</strong>：<code v-pre>ifconfig eth0 | awk '/inet / {print $2}'</code></li>
<li><strong>提取倒数第一列</strong>：<code v-pre>awk '{print $NF}' file</code>（不管每行有多少空格，永远拿最后一列）。</li>
</ul>
<h4 id="b-条件过滤-比-grep-更精细" tabindex="-1"><a class="header-anchor" href="#b-条件过滤-比-grep-更精细"><span>B. 条件过滤（比 grep 更精细）</span></a></h4>
<ul>
<li><strong>数值比较</strong>：<code v-pre>awk '$9 &gt;= 500 {print $0}' access.log</code>（只打印 HTTP 状态码大于等于 500 的报错行）。</li>
<li><strong>逻辑组合</strong>：<code v-pre>awk '$1==&quot;192.168.1.100&quot; &amp;&amp; $9==200' access.log</code>（找出特定 IP 且访问成功的记录）。</li>
</ul>
<h4 id="c-格式化输出" tabindex="-1"><a class="header-anchor" href="#c-格式化输出"><span>C. 格式化输出</span></a></h4>
<ul>
<li>
<p><code v-pre>awk -F &quot;:&quot; '{printf &quot;用户: %-15s ID: %d\\n&quot;, $1, $3}' /etc/passwd</code></p>
</li>
<li>
<p><code v-pre>-F &quot;:&quot;</code>：指定冒号为分隔符。</p>
</li>
<li>
<p><code v-pre>printf</code>：像 C 语言一样控制对齐，这在你生成巡检报表时非常有用。</p>
</li>
</ul>
<hr>
<h3 id="高阶进阶-begin、end-与-变量计算" tabindex="-1"><a class="header-anchor" href="#高阶进阶-begin、end-与-变量计算"><span>高阶进阶：BEGIN、END 与 变量计算</span></a></h3>
<p>这是 <code v-pre>awk</code> 区别于其他工具的地方——它有状态。</p>
<ul>
<li><strong>BEGIN</strong>：处理第一行数据<strong>之前</strong>执行（通常用于定义变量、打印表头）。</li>
<li><strong>主体逻辑</strong>：每读一行就执行一次。</li>
<li><strong>END</strong>：处理完所有数据<strong>之后</strong>执行（通常用于汇总结果）。</li>
</ul>
<p><strong>实战案例：统计所有 Nginx 响应的大小总和（流量统计）</strong></p>
<div class="language-plain line-numbers-mode" data-highlighter="shiki" data-ext="plain" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-plain"><span class="line"><span>awk 'BEGIN {sum=0} {sum+=$10} END {print "总流量: " sum/1024/1024 " MB"}' access.log</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><hr>
<h2 id="sed" tabindex="-1"><a class="header-anchor" href="#sed"><span>sed</span></a></h2>
<h3 id="工作原理-模式空间-pattern-space" tabindex="-1"><a class="header-anchor" href="#工作原理-模式空间-pattern-space"><span>工作原理：模式空间（Pattern Space）</span></a></h3>
<p>理解 <code v-pre>sed</code> 必须理解它的“临时加工厂”：</p>
<ol>
<li><strong>读取</strong>：从文件或管道读取一行。</li>
<li><strong>加工</strong>：放入“模式空间”，按照你的指令进行处理（如替换、删除）。</li>
<li><strong>输出</strong>：把处理后的结果打印到屏幕（默认），然后清空空间处理下一行。</li>
</ol>
<hr>
<h3 id="核心语法-四大常用操作" tabindex="-1"><a class="header-anchor" href="#核心语法-四大常用操作"><span>核心语法：四大常用操作</span></a></h3>
<p><code v-pre>sed</code> 的基本格式是：<code v-pre>sed [选项] '地址 + 操作' 文件名</code></p>
<h4 id="a-替换-substitute-——-最强功能" tabindex="-1"><a class="header-anchor" href="#a-替换-substitute-——-最强功能"><span>A. 替换 (Substitute) —— 最强功能</span></a></h4>
<ul>
<li>
<p><strong>基础格式</strong>：<code v-pre>sed 's/旧内容/新内容/g' file</code>（<code v-pre>g</code> 代表全局替换，不加则只换每行第一个）。</p>
</li>
<li>
<p><strong>实战场景</strong>：</p>
</li>
<li>
<p><strong>修改内核参数</strong>：<code v-pre>sed -i 's/SELINUX=enforcing/SELINUX=disabled/g' /etc/selinux/config</code></p>
</li>
<li>
<p><strong>修改监听端口</strong>：<code v-pre>sed -i 's/Listen 80/Listen 8080/g' httpd.conf</code></p>
</li>
</ul>
<h4 id="b-删除-delete" tabindex="-1"><a class="header-anchor" href="#b-删除-delete"><span>B. 删除 (Delete)</span></a></h4>
<ul>
<li>
<p><strong>地址定位</strong>：</p>
</li>
<li>
<p><code v-pre>sed '1,3d' file</code>：删除 1 到 3 行。</p>
</li>
<li>
<p><code v-pre>sed '/^#/d' file</code>：删除所有以 <code v-pre>#</code> 开头的注释行。</p>
</li>
<li>
<p><code v-pre>sed '/^$/d' file</code>：删除空行。</p>
</li>
</ul>
<h4 id="c-插入与追加-insert-append" tabindex="-1"><a class="header-anchor" href="#c-插入与追加-insert-append"><span>C. 插入与追加 (Insert / Append)</span></a></h4>
<ul>
<li><code v-pre>**i**</code> <strong>(insert)</strong>：在匹配行<strong>上方</strong>插入。</li>
<li><code v-pre>**a**</code> <strong>(append)</strong>：在匹配行<strong>下方</strong>追加。</li>
<li><strong>实战场景</strong>：在配置文件末尾添加一行新配置： <code v-pre>sed -i '$a \\export JAVA_HOME=/usr/local/jdk' /etc/profile</code></li>
</ul>
<h4 id="d-打印-print" tabindex="-1"><a class="header-anchor" href="#d-打印-print"><span>D. 打印 (Print)</span></a></h4>
<ul>
<li>配合 <code v-pre>-n</code> 选项（静默模式），只显示匹配到的行。 <code v-pre>sed -n '5,10p' file</code>：只看第 5 到第 10 行。</li>
</ul>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};