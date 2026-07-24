---
title: "python复习"
date: 2026-07-23
category: "面试"
---
## python是什么？

Python 是一种简洁、易读、功能强大的编程语言，广泛应用于 Web 开发、数据分析、人工智能等领域（1.web开发，2.数据分析，数据分析库，3.ai 人工智能，4.运维工具（运维是运行和维护保障服务7\*24小时不间断运行）

​  

1.解释型语言

2.动态类型语言

3.强类型语言

​  

​  

## 虚拟环境是什么？

简单来说，虚拟环境就是为每一个 Python 项目创造一个**完全独立、纯净**的运行空间。

​  

### 虚拟环境的作用就是：

-   **版本隔离**：项目 A 和 B 各自拥有独立的 `site-packages` 目录，互不干扰。
-   **权限控制**：安装包不需要 `sudo` 权限，直接装在当前用户的目录下。
-   **环境一致性**：你可以轻松生成一个 `requirements.txt` 清单，让同事在他们的机器上复现出一模一样的环境。

​  

### 核心原理：它是怎么实现“隔离”的？

当你激活（Activate）一个虚拟环境时，它背后做了两件非常简单但有效的事：

1.  **修改环境变量** `**$PATH**`：它把你虚拟环境下的 `bin` 目录插到了系统路径的最前面。当你输入 `python` 或 `pip` 时，系统会优先找到虚拟环境里的程序，而不是 `/usr/bin/` 下的。
2.  **软链接**：虚拟环境内部通常只包含一个指向系统 Python 解释器的软链接，以及一套独立的第三方库文件夹。

​  

​  

## python的基本数据类型

整型

浮点型

复数

字符串

布尔类型

NoneType

​  

​  

### 转义字符

#\\n 换行符

#\\t tab键

#\\a 响铃

#“

#\\\\ 代表\\

#\\" 代表”

print("a\\tb")

print(""a\\\\b)

print(r"a\\tb") #raw r标记位字符串原样输出

​  

​  

### 字符串的格式化

name=input("请输入用户名：")

age=input("请输入年龄：")

#%s 字符串

#%d 十进制整数

#%x 十六进制整数

#%.2f 保留两位小数

print("name is %s,age is %d"%(name,age))

​  

f1=0.37296

print("%.2f%%(f1\*100)")

print("name is {},age is {}".format(name,age))

print("name is {0},age is {1}".format(name,age))

print("name is {username},age is {userage}".format(username=name,userage=age))

​  

**#python f标志位格式化**

print(f"name is {name},age is {age}")

​  

### 字符串的截取

str1 = "abcdefgx"

​  

#索引

#str[start:end:step]

#先确定step为正还是负

#正向后截取，负向前截取

#确定start和end的位置

#确定步长step的值

#start，end，step三个值都可以省略

​  

### 算术运算符

#+ - \* / // % \*\*

print(5 // 2 , 6 // 2 , -5 // 2)

print(5 % 2 , 2 \*\*3)

#赋值运算符

\# += -= \*= /= //= %=

#比较运算符

#> < >= <= != ==

\# 10<x15

​  

#逻辑运算符号

\# and or not

​  

​  

## 容器类型

string、list、tuple、dict、set

​  

#列表 list --》底层存储 数组

#[1,2,3]

#1.存放任何数据类型  
#2.有序项目集合  
#3.可变数据类型

​  

​  

lst = []  
lst2 = ['abc']

print(lst,lst2)  
print(type(lst),type(lst2))  
print(isinstance(lst,list),isinstance(lst2,list))

lst3=[1,2.2,2+3j,"abc",None,False,print]  
print(lst3)

#有序项目集合  
print(lst3[3],lst3[-3])  
#字符串的截取  
print(lst3[2:])  
print(lst3[2:6])
