---
title: "Shell复习"
icon: clipboard-text
date: 2026-07-23
category:
  - 面试
---
## 变量

### 什么是变量?

很多人可能会说，可以变化的量就是变量。但是发现很多汉语意思很强大，你看的懂的字，却不一定可以理解它的意思。这里你可以理解为 a = 1,同时还可以 a =2、a = 3 ，不同的值都可以复制给同一个 变量 a 。

​  

\# 常见的3种变量

Shell编程中变量分为三种，分别是系统变量、环境变量和用户变量，Shell变量名在定义时，首个字符必须为字母（a-z，A-Z），不能以数字开头，中间不能有空格，可以使用下划线（\_），不能使用（-），也不能使用标点符号等。

  

```plain
[root@keeplived_server~]# a=18
[root@keeplived_server~]# echo $a
18

```

​  

### 系统变量

```plain
# Shell常见的变量之一系统变量，主要是用于对参数判断和命令返回值判断时使用，系统变量详解如下：

$0 		当前脚本的名称；
$n 		当前脚本的第n个参数,n=1,2,…9；
$* 		当前脚本的所有参数(不包括程序本身)；
$# 		当前脚本的参数个数(不包括程序本身)；
$? 		令或程序执行完后的状态，返回0表示执行成功；
$$ 		程序本身的PID号。
```

  

### 环境变量

```plain
#Shell常见的变量之二环境变量，主要是在程序运行时需要设置，环境变量详解如下：

PATH  		命令所示路径，以冒号为分割；
HOME  		打印用户家目录；
SHELL 		显示当前Shell类型；
USER  		打印当前用户名；
ID    		打印当前用户id信息；
PWD   		显示当前所在路径；
TERM  		打印当前终端类型；
HOSTNAME    显示当前主机名；
PS1         定义主机命令提示符的；
HISTSIZE    历史命令大小，可通过 HISTTIMEFORMAT 变量设置命令执行时间;
RANDOM      随机生成一个 0 至 32767 的整数;
HOSTNAME    主机名

```

​  

### 用户变量

```plain
# 常见的变量之三用户变量，用户变量又称为局部变量，主要用在Shell脚本内部或者临时局部使用，系统变量详解如下：
a=rivers 				       自定义变量A；
Httpd_sort=httpd-2.4.6-97.tar  自定义变量N_SOFT；
BACK_DIR=/data/backup/         自定义变量BACK_DIR；
IPaddress=10.0.0.1			   自定义变量IP1；
```

  

  

  

## 流程控制语句

### if条件语句

```plain
# If条件判断语句，通常以if开头，fi结尾。也可加入else或者elif进行多条件的判断

# 单分支语句 ---比较大小
	if (条件表达式);then
		语句1
	fi

# 双分支if 语句
	if (表达式)
		语句1
	else
		语句2
	fi

# 多支条件语句 ---判断成绩
	if (表达式)
		语句1
	elif
		语句2
	elif
		语句2
	fi  
```

​  

#### if的逻辑运算符

```plain
-f	 	判断文件是否存在 eg: if [ -f filename ]；
-d	 	判断目录是否存在 eg: if [ -d dir     ]；
-eq		等于，应用于整型比较 equal；
-ne		不等于，应用于整型比较 not equal；
-lt		小于，应用于整型比较 letter；
-gt		大于，应用于整型比较 greater；
-le		小于或等于，应用于整型比较；
-ge 	大于或等于，应用于整型比较；
-a		双方都成立（and） 逻辑表达式 –a 逻辑表达式；
-o		单方成立（or） 逻辑表达式 –o 逻辑表达式；
-z		空字符串；
-x      是否具有可执行权限
||      单方成立；
&&      双方都成立表达式。

```

  

  

#### 判断学生成绩等级

```plain
# if 语句可以直接对命令状态进行判断，就省去了获取$?这一步！
  # 如果第一个条件符合就不再向下匹配
#!/bin/bash
  # this check grade shell
  # by author rivers on 2021-09-27
  
  grade=$1
  if [ $grade -gt 90 ];then
    echo "Is's very good!"
  elif [ $grade -gt 70 ];then
    echo "Is's is good!"
  
  elif [ $grade -ge 60 ];then
    echo "pass"
  
  else
    echo "no pass"
  fi

```

  

  

### for循环语句

```plain
#格式：for name [ [ in [ word ... ] ] ; ] do list ; done
  for 变量名 in 取值列表; do
    语句 1
  done
```

​  

#### 查看多台主机存活情况

```plain
#!/bin/bash
# check hosts is on/Off
# by rivers on 20219-23

Network=$1
for Host in $(seq 1 254)
do
ping -c 1 $Network.$Host > /dev/null && result=0 || result=1

if [ "$result" == 0 ];then
  echo -e "\033[32;1m$Network.$Host is up \033[0m"
  echo "$Network.$Host" >> /tmp/up.txt

else
  echo -e "\033[;31m$Network.$Host is down \033[0m"
  echo "$Network.$Host" >> /tmp/down.txt
fi
done
```

  

### while循环语句

```plain
# While循环语句与for循环功能类似，主要用于对某个数据域进行循环读取、对文件进行遍历，通常用于需要循环某个文件或者列表，满足循环条件会一直循环，不满足则退出循环，其语法格式以while…do开头，done结尾与 
#while 关联的还有一个 until 语句，它与 while 不同之处在于，是当条件表达式为 false 时才循环，实际使用中比较少，这里不再讲解。

while  (表达式)
do
  语句1
done
```

  

#### break和continue语句

```plain
# break 和 continue 语句
  break 是终止循环。
  continue 是跳出当前循环。
#示例 1：在死循环中，满足条件终止循环
while true; do
  let N++
  if [ $N -eq 5 ]; then
    break
fi
  echo $N
done
输出： 1 2 3 4

#示例 2：举例子说明 continue 用法
N=0
while [ $N -lt 5 ]; do
  let N++
if [ $N -eq 3 ]; then
  continue
fi
  echo $N
done

输出： 1 2 4

# 打印 1-100 数字
i=0
while ((i<=100))
do
        echo  $i
        i=$((i + 1))
done
```

  

#### while求1-100的和

```plain
#!/bin/bash

sum=0
limit=100
for ((i=1;i<=limit;i++)); do
    ((sum+=i))
done

echo "$sum"
```

  

  

### case选择语句

```plain
#Case选择语句，主要用于对多个选择条件进行匹配输出，与if elif语句结构类似，通常用于脚本传递输入参数，打印出输出结果及内容，其语法格式以Case…in开头，esac结尾。语法格式如下：
case 模式名  in
  模式 1)
    命令
    ;;
  模式 2)
    命令
    ;;
*)
不符合以上模式执行的命令
esac
# 每个模式必须以右括号结束，命令结尾以双分号结束
```

​  

#### http服务启动脚本

```plain
[root@web-server01~/script]# vim httpd_start.sh 
# check http server start|stop|starus
# by author rivers on 2021-9-27
while true
do
    echo -e "
    \033[31m start \033[0m
    \033[32m stop \033[0m 
    \033[33m status \033[0m
    \033[34m quit \033[0m 
"
read -p "请输入你的选择start|stop|quit：" char
case $char in
start)
    systemctl start httpd && echo "httpd服务已经开启" || echo "开启失败"
;;
stop)
    systemctl stop httpd && echo "httpd服务已经关闭" || echo "关闭失败"
;;
restart)
    systemctl restart httpd && echo "httpd服务已经重启" || echo "重启失败
"
;;
status)
    systemctl status httpd && echo -e "
        httpd 的服务状态
  
;;
quit)
```

  

  

  

### select 选择语句

```plain
#select 是一个类似于 for 循环的语句
#Select语句一般用于选择，常用于选择菜单的创建，可以配合PS3来做打印菜单的输出信息，其语法格式以select…in do开头，done结尾：

select i in （表达式） 
do
语句
done

# 选择mysql 版本
#!/bin/bash
# by author rivers on 2021-9-27
PS3="Select a number: "
while true; do
select mysql_version in 5.1 5.6 quit;
 do
  case $mysql_version in
  5.1)
    echo "mysql 5.1"
      break
      ;;
  5.6)
    echo "mysql 5.6"
       break
       ;;
  quit)
    exit
    ;;
  *)
    echo "Input error, Please enter again!"
      break
esac
 done
done

```

  

  

  

## 进阶

## shell正则表达式

如果你用 `grep`、`sed`，默认用的是基础正则；如果你用 `egrep` 或者 `awk`，则可以使用更强大的扩展正则。

---

### 基础元字符（所有流派通用）

这些是你处理日志、过滤 IP 时的“基本功”。

| **元字符** | **含义** | **示例** |
| --- | --- | --- |
| `.` | 匹配**任意单个**字符（换行符除外） | `r..t`<br>匹配 `root`<br>, `rsst` |
| `*` | 匹配前面的字符**0次或多次** | `ab*`<br>匹配 `a`<br>, `ab`<br>, `abbb` |
| `^` | 匹配**行首** | `^root`<br>匹配以 root 开头的行 |
| `$` | 匹配**行尾** | `false$`<br>匹配以 false 结尾的行 |
| `[ ]` | 匹配括号内**任意一个**字符 | `[abc]`<br>匹配 a 或 b 或 c |
| `[^ ]` | 匹配**不在**括号内的任意一个字符 | `[^0-9]`<br>匹配非数字字符 |
| `\` | **转义符**，让特殊字符失去魔力 | `\.`<br>匹配真正的点号 |

---

### 扩展元字符（让逻辑更简单）

使用 `grep -E` 或 `awk` 时，这些符号能让你少写很多繁琐的转义。

| **元字符** | **含义** | **示例** |
| --- | --- | --- |
| `+` | 匹配前面的字符**1次或多次** | `[0-9]+`<br>匹配至少一个数字 |
| `?` | 匹配前面的字符**0次或1次** | `https?`<br>匹配 http 或 https |
| **` | `** | **逻辑或**（二选一） |
| `( )` | **分组**，将多个字符看作整体 | `(abc)+`<br>匹配 abc, abcabc |
| `{n,m}` | 匹配前面的字符 **n 到 m 次** | `[0-9]{1,3}`<br>匹配 1 到 3 位数字 |

---

  

## grep

### 基础过滤（入门级：找得到）

这是最常用的基本操作，重点在于**精准定位**。

-   `**-i**` **(Ignore case)**：忽略大小写。查日志时，你不知道错误是 `Error` 还是 `error`，必带 `-i`。
-   `**-v**` **(Invert match)**：反向选择。

-   *实战场景*：`grep -v "^#" /etc/nginx/nginx.conf | grep -v "^$"`（查看配置文件时，过滤掉所有注释行和空行，只看干货）。

-   `**-w**` **(Word regexp)**：精确匹配单词。搜 `user` 不会搜到 `users`。

---

### 场景化增强（进阶级：上下文）

在排查 **LVS** 或 **MySQL** 崩溃时，光看报错那一行是不够的，你需要看它的“前因后果”。

-   `**-A n**` **(After)**：显示匹配行及**后** n 行。
-   `**-B n**` **(Before)**：显示匹配行及**前** n 行。
-   `**-C n**` **(Context)**：显示匹配行及**前后**各 n 行。

-   *实战场景*：`grep -C 5 "Connection refused" /var/log/messages`（查看报错发生前后的系统日志，寻找诱因）。

-   `**-n**`：显示行号，方便你直接 `vim +行号` 去修改文件。

---

### 强力搜索（专家级：正则与递归）

当你需要处理复杂逻辑或大规模文件集时。

-   `**-E**` **(Extended regexp)**：开启扩展正则（相当于 `egrep`）。

-   *实战场景*：`grep -E "404|500|502" access.log`（同时查找多种状态码）。

-   `**-r**` **(Recursive)**：递归搜索目录。

-   *实战场景*：`grep -r "zh-kinger.com" /etc/nginx/conf.d/`（在所有配置文件中查找某个域名）。

-   `**-l**` **(files-with-matches)**：只列出包含关键词的文件名。

-   *实战场景*：配合 `sed` 进行批量替换。`grep -rl "old_ip" ./ | xargs sed -i 's/old_ip/new_ip/g'`。

## awk介绍与语法

### 核心模型：行（Record）与列（Field）

`awk` 默认以**空格**或**制表符**作为分隔符，将每一行切开。

-   `**$0**`：代表整行内容。
-   `**$1, $2...$n**`：代表第 1, 2...n 个字段（列）。
-   `**NF**` **(Number of Fields)**：内置变量，代表当前行一共有多少列。
-   `**NR**` **(Number of Records)**：内置变量，代表当前处理的是第几行。

---

### 语法精髓：Pattern + Action

`awk` 的逻辑结构非常固定：`awk '条件 { 动作 }' 文件名`

#### A. 基础截取（最常用）

-   **提取 IP**：`ifconfig eth0 | awk '/inet / {print $2}'`
-   **提取倒数第一列**：`awk '{print $NF}' file`（不管每行有多少空格，永远拿最后一列）。

#### B. 条件过滤（比 grep 更精细）

-   **数值比较**：`awk '$9 >= 500 {print $0}' access.log`（只打印 HTTP 状态码大于等于 500 的报错行）。
-   **逻辑组合**：`awk '$1=="192.168.1.100" && $9==200' access.log`（找出特定 IP 且访问成功的记录）。

#### C. 格式化输出

-   `awk -F ":" '{printf "用户: %-15s ID: %d\n", $1, $3}' /etc/passwd`

-   `-F ":"`：指定冒号为分隔符。
-   `printf`：像 C 语言一样控制对齐，这在你生成巡检报表时非常有用。

---

### 高阶进阶：BEGIN、END 与 变量计算

这是 `awk` 区别于其他工具的地方——它有状态。

-   **BEGIN**：处理第一行数据**之前**执行（通常用于定义变量、打印表头）。
-   **主体逻辑**：每读一行就执行一次。
-   **END**：处理完所有数据**之后**执行（通常用于汇总结果）。

**实战案例：统计所有 Nginx 响应的大小总和（流量统计）**

```plain
awk 'BEGIN {sum=0} {sum+=$10} END {print "总流量: " sum/1024/1024 " MB"}' access.log
```
---

  

## sed

### 工作原理：模式空间（Pattern Space）

理解 `sed` 必须理解它的“临时加工厂”：

1.  **读取**：从文件或管道读取一行。
2.  **加工**：放入“模式空间”，按照你的指令进行处理（如替换、删除）。
3.  **输出**：把处理后的结果打印到屏幕（默认），然后清空空间处理下一行。

---

### 核心语法：四大常用操作

`sed` 的基本格式是：`sed [选项] '地址 + 操作' 文件名`

#### A. 替换 (Substitute) —— 最强功能

-   **基础格式**：`sed 's/旧内容/新内容/g' file`（`g` 代表全局替换，不加则只换每行第一个）。
-   **实战场景**：

-   **修改内核参数**：`sed -i 's/SELINUX=enforcing/SELINUX=disabled/g' /etc/selinux/config`
-   **修改监听端口**：`sed -i 's/Listen 80/Listen 8080/g' httpd.conf`

#### B. 删除 (Delete)

-   **地址定位**：

-   `sed '1,3d' file`：删除 1 到 3 行。
-   `sed '/^#/d' file`：删除所有以 `#` 开头的注释行。
-   `sed '/^$/d' file`：删除空行。

#### C. 插入与追加 (Insert / Append)

-   `**i**` **(insert)**：在匹配行**上方**插入。
-   `**a**` **(append)**：在匹配行**下方**追加。
-   **实战场景**：在配置文件末尾添加一行新配置： `sed -i '$a \export JAVA_HOME=/usr/local/jdk' /etc/profile`

#### D. 打印 (Print)

-   配合 `-n` 选项（静默模式），只显示匹配到的行。 `sed -n '5,10p' file`：只看第 5 到第 10 行。
