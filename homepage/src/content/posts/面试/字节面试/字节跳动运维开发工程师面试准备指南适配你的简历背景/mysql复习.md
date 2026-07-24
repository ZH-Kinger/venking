---
title: "mysql复习"
date: 2026-07-23
category: "面试"
---
## 用户

### 创建一个用户

create USER'test'@localhost IDENTIFIED by 'TestPass123!'

​  

### 查看所有用户的用户名和允许登录的主机

SELECT user, host FROM mysql.user;

​  

### 删除一个用户

DROP USER'用户名'@'主机名';

​  

### 修改密码

set password for '用户名'@'主机' = password('新密码')

​  

​  

## 基础命令

**查看数据库** show database；

**创建数据库** create database <数据库名>

**选择数据库** use <数据库名>

**查看创建数据库命令** show create database test\\G

**删除数据库** drop databse test3

​  

​  

## 表

### 查看表 show tables；

### 查看创建表语句 show create table <表名>

### 查看表结构 desc <表名>

​  

### 创建表

create table <表名>(

column1 datatye column\_constrains,

column1 datatye column\_constrains,

column1 datatye column\_constrains,

column1 datatye column\_constrains,

)

列名：大小写下划线，小写+下划线

​  

### 插入数据 insert into test\_int (age,num1,num2)values(1,2,3),(4,5,6);

### 查询表中的数据 select \*from test\_int；

### 删除表 drop table <表名>

### 修改表（alter table）

#### 在末尾添加 alter table articles add phone char(11);

![image.png](assets/mysql%E5%A4%8D%E4%B9%A0-1.png)

  

#### 在第一行添加 alter table articles add id int first;

#### 在什么之间添加 alter table articles add email varchar(10) after author;

![image.png](assets/mysql%E5%A4%8D%E4%B9%A0-2.png)

  

#### 修改数据类型/长度 alter table articles modify title varchar(200);

![image.png](assets/mysql%E5%A4%8D%E4%B9%A0-3.png)

#### 修改字段名 alter table articles change phone mobile char(11);3

![image.png](assets/mysql%E5%A4%8D%E4%B9%A0-4.png)

#### 删除字段 alter table articles drop column email;

​  

#### 添加约束信息 alter table articles add constraint pk\_id primary key(id);

​  

#### 修改表名 alter table person rename to person2；

​  

## 数据类型

### 整数类型

TINYINT 1字节 -128-127 0-255

SMALLINT 2字节

MEDIUMINT 3字节

INT 4字节

BIGINT 8字节

​  

TYPE(n) =>显示宽度 n=2

ZEROFILL =>零填充 00127

UNSIGNED =>无符号

​  

注释：

单行注释：SELECT \* FROM user;-- 查询数据 # 正确：--后有空格

多行注释：/\* \*/

​  

### 浮点型（小数）

float 4字节 默认长度7 单精度浮点型

double 8字节 默认长度17 双精度浮点型

decimal 精确的浮点数

​  

float/double 指定显示宽度和小数位数，如果没有指定按实际精度来处理

decimal 不指定显示宽度和小数位数，默认为（10，0）10位整数位，0位小数位

​  

### 字符串类型

char(n) 固定长度字符串，手机号，身份证。。

varchar(n) 可变长字符串，标题，昵称（灵活，省空间，效率稍微差一点）

text 用于储存大块文本 0-65535

tinytext 小文本 0-255

mediumntext 中等文本

longtext 超大文本

blog 储存二进制数据（图片，音频，视频）

json 轻量级数据 ‘交换’文本

​  

### 日期时间类型

date 3字节 yyyy-MM-dd 日期

time 3字节 HH:mm:ss 时间

year 1字节 yyyy 年份

datetime 8字节 yyyy-MM-dd HH:mm:ss

timestamp 4字节 yyyy-MM-dd HH:mm:ss（显示数据依赖当前时区）

​  

### 枚举和集合类型

enum 枚举 多选一 男/女/保密

set 集合 多选多 唱歌，跳舞

​  

​  

## 常见的约束

### 非空约束（NOT NULL）：该列数据不能为空

  

### 唯一约束（UNIQUE）：该列数据的值必须唯一

  

### 默认值约束（DEFAULT）：该列元素如果没有给值，使用默认值

  

### 主键约束（PRIMARY KEY）：不能为空加唯一约束，一个表只能有一个主键

主键：单个字段，多个字段

作用：标识唯一的一条记录，一般来说建议每个表都创建一个主键

创建了主键之后 =>自动创建索引 =>提升查询效率

  

### 外键约束（FOREIGN KEY）：用于建立表之间的关系

分表的意义？

节省存储空间（减少数据冗余）

提升可维护性

#### 数据分表 ->外键

优点：数据之间有关联，数据一致性检查，数据完整性

缺点：

外键有一定的性能开销（产生临时表，消耗内存和cpu）

复杂性：进行2数据插入和删除时，由于有约束更麻烦

  

企业：会分表

外键 =》数据库层面解决一些约束问题

通常从代码层面解决约束问题

​  

​  

## 查询SQL

select [distinct] <列名|\*> from <表名> [where <条件>] [order by <列名>] [group by <列名>]

  

select 查询

distinct 去重(对结果去重)

from 从哪个表查询

where 条件

order by 排序

group by 分组

limit M,N 限制返回数据

  

### 条件查询

select \*from product where pname="真维斯";

### 比较查询 <,>,<=,>=,!=或<>,=

名字不等于花花公子的数据

select \*from product where pname <> "花花公子";

​  

单价大于1000的商品

select \*from product where price >1000;

  

### 逻辑查询 and,or,not

a and b =>a和b同时位真，结果为真

单价大于200，且小于等于1000

select \*from product where price>200 and price <=1000

  

### 范围查询 in,between and

单价大于200，且小于等于1000

select \*from product where price between 200 and 1000

select \*from product where not (cid=c004)

​  

### 模糊查询 like（字符串）

select \*from product where pname like '%家'

#### 通配符

| `%` | 匹配 **任意长度** 的字符（0 个 / 1 个 / 多个） | 模糊匹配开头 / 结尾 / 包含内容 |
| --- | --- | --- |
| `_` | 匹配 **单个** 任意字符 | 精准控制字符长度的模糊匹配 |
| `[]` | 匹配括号内 **单个** 字符（需搭配 `REGEXP`） | 匹配指定范围内的单个字符 |

  

限制返回数据limit m,n

​  

select \*from product

  

### 正则匹配regexp 或 rlike

SELECT 字段 FROM 表名 WHERE 字段 REGEXP '正则模式';

SELECT 字段 FROM 表名 WHERE 字段 RLIKE '正则模式'; -- 与REGEXP等价

​  

\-- 示例1：匹配test\_enum\_set中name以“刘”开头的记录（^）

SELECT \* FROM test\_enum\_set WHERE name REGEXP '^刘';

\-- 输出：刘志强

​  

\-- 示例2：匹配articles中title以“log”结尾的记录（$）

SELECT \* FROM articles WHERE title REGEXP 'log$';

\-- 输出：test123.log

​  

\-- 示例3：匹配name包含“张”或“李”的记录（|）

SELECT \* FROM test\_enum\_set WHERE name REGEXP '张|李';

\-- 输出：张伟、张张强、李强

​  

限制返回数量 limit

limit n =>返回n条数据

select \*from product limit 1；

​  

limit n,m =>跳过前面n条数据，输出m条数据

select \*from product limit 3,3;

​  

查询空值和非空值 NULL

select \*from articles where id is not null;

​  

正则匹配

如果基本的能满足需求，尽量用基本的查询方法

[0-9]：匹配在这个范围内任意一个数据

[a-z,A-Z]

​  

重复前面指定的字符出现的次数

？：前面的字符重复0-1次

+：前面的字符出现1次及以上

\*：匹配一个字符0次或者多次

^： 匹配字符串开头

$： 匹配字符串结尾

​  

### 排序查询

默认升序

select \*from product order by price;

select \*from product order by price desc;（desc倒序排序）

​  

默认ASC升序

​  

#### 多字段排序

select \*from product where pid between 1 and 10 order by cid desc,price desc;

### 聚合查询：将多条记录聚合到一起计算出一条

计数，求和，求平均

#### count（字段名）：统计值不为NULL的数量

select count(\*) from product;

select count(pid) from product;

​  

#### sum字段：计算数字的和

select sum(price) from product;

​  

#### max字段，max：求最大值，min：最小值

select max(price),min(price) from product;

​  

avg字段：求平均值

select avg(price) from product;

### 分组查询

...where 条件 group by 列名 [having 条件表达式（having对分组的结果在操作)]

查看每个不同类别的平均值

select avg(price),cid from product group by cid;

查找商品类别数量大于等于3的分类

select cid,count(pid) cid\_count from product group by cid having cid\_count >=3;

## 更新SQL

update <表名> set 列名=值，列名=值...where 条件;

update product set price=price\*10 where price<=100;

​  

## 删除SQL

delete from <表名> where 条件;

delete from product where pid=13;

​  

### 清空表

delete from product;

truncate table product;

​  

用delete和truncate清空表有什么区别

delete :删除数据是一行一行的删除 ->删除会产生二进制日志 -》可以恢复

删除慢

truncate：删除表，重新创建表 ->数据无法恢复

速度快

​  

​  

## 联接查询（多个表）

多表查询：查询操作中涉及两个或多个表数据查询

多表查询需要表与表之间有紧密联系

​  

表：学生姓名，id ，年龄，年纪，班级id，班主任，教室

分表 = >classes，student（classid）,menus

​  

### 交叉联结

select 列名 from 表1，表2 where

select 列名 from 表1 cross join 表2

两个表相乘

​  

### 内连接（inner join）

核心逻辑：只保留两个表中「关联字段完全匹配」的记录

返回两个表中满足条件的行的组合

​  

select 列名 from 表1 inner join 表2 on 连接条件;

select \*from student inner join class on students.class\_id=classes.id;

​  

select \* from classes, students where students.class\_id=classes.id;

​  

+----+--------+------+----------+----+--------+-----------+  
| id | name | age | class\_id | id | name | teacher |  
+----+--------+------+----------+----+--------+-----------+  
| 1 | 张三 | 18 | 1 | 1 | 一班 | 张老师 |  
| 2 | 李四 | 19 | 2 | 2 | 二班 | 李老师 |  
| 3 | 王五 | 20 | 1 | 1 | 一班 | 张老师 |  
| 4 | 赵六 | 18 | 2 | 2 | 二班 | 李老师 |  
+----+--------+------+----------+----+--------+-----------+  
4 rows in set (0.00 sec)

### 左连接（left join）

核心逻辑：保留「左表全部数据」，右表只保留匹配的记录；右表无匹配时，显示 NULL

select \*from student left join class on students.class\_id=classes.id;

​  

### 右连接（right join）

核心逻辑：保留「右表全部数据」，左表只保留匹配的记录；左表无匹配时，显示 NULL

select \*from student right join class on students.class\_id=classes.id;

​  

自连接

select \*from menus as a,menus as b where a.id =b.parent;

​  

​  

​  

## 索引

简单来说，**索引（Index）** 就是数据库中的“目录”。

它是数据库管理系统（DBMS）中一个排序的数据结构，通过它，数据库可以像查字典一样，不需要扫描全表就能快速找到你需要的数据。

---

### 核心原理：为什么要索引？

想象一本书有 500 页，如果你想找“异步编程”在哪一页：

-   **没有索引（全表扫描）**：你必须从第 1 页翻到第 500 页。
-   **有索引（使用目录）**：你先翻到书后的索引表，找到“异步编程”，看到它在第 213 页，直接翻过去。

在 MySQL 中，如果不加索引，查询数据的时间复杂度是 O(n)；有了索引（通常是 B+ 树结构），时间复杂度可以降低到 O(\\log n)。

​  

### 索引的分类

索引根据不同的维度有多种叫法：

#### 逻辑功能角度

-   **主键索引 (Primary Key)**：唯一且不为空。
-   **唯一索引 (Unique Index)**：字段值必须唯一，但允许为空。
-   **普通索引 (Normal Index)**：最基本的索引，没有任何限制。
-   **全文索引 (Full-text Index)**：用于在大文本里搜索关键词。

#### 字段个数角度

-   **单列索引**：只针对一个字段建索引。
-   **联合索引 (Composite Index)**：多个字段组合成一个索引。**注意：** 必须符合“最左前缀法则”才能生效。

​  

### 索引的优缺点

索引虽好，但不能乱加：

| **优点** | **缺点** |
| --- | --- |
| **查询速度极快**，减少磁盘 I/O。 | **占用物理空间**。索引本身也是要存磁盘的。 |
| 提高分组 (`GROUP BY`<br>) 和排序 (`ORDER BY`<br>) 的效率。 | **降低写操作性能**。每次 `INSERT`<br>, `UPDATE`<br>, `DELETE`<br>时，数据库都要同步维护索引树。 |

---

### 什么场景适合加索引？

-   **经常作为查询条件的字段**（`WHERE` 后的字段）。
-   **经常需要排序、分组的字段**。
-   **用于多表连接 (JOIN) 的关联字段**（外键）。
-   **区分度高的字段**（比如手机号、用户 ID。性别这种区分度低的字段加索引意义不大）。

### 为什么索引会失效？

即便加了索引，某些骚操作也会让它失效：

1.  **左模糊查询**：`LIKE '%abc'`。
2.  **对索引列做运算或函数**：`WHERE YEAR(create_time) = 2026`。
3.  **类型转换**：字段是字符串，查询时没加引号 `WHERE phone = 138000`。
4.  **联合索引不满足最左匹配**。

​  

## 事务

事务主要用于处理操作量大、复杂度高的数据

### 事务是什么？

是一种机制，一个事务中包含一组数据库操作命令，将所有命令看作一个整体，要么全部执行要么全部不执行

事务是一个不可分割的工作单元

要么同时全部执行，要么全部不执行

​  

用于处理大任务的一批SQL语句，这些SQL要么同时执行，要么同时不执行

​  

如：事务中有10个SQL语句，1234成功5失败 -》回滚

​  

事务是一种机制，包含了一组SQL语句，要么同时执行，要么同时不执行。

事务是一个整体

​  

​  

​  

### 事务的特点

事务的特点：ACID

A - Atomicity 原子性

事务是一个不可再分割的工作单元，要么都发生，要么都不发生

​  

C -Consistency 一致性

事务开始之前和结束之后，数据库的完整性约束没有被破坏

转账

库存：购物（售出，出库）

​  

I - Isolation 隔离性

多个事务并发执行时，一个事务的执行不能被其他事务干扰。

​  

D -Durability 持久性

事务执行完成后（commit），数据写入磁盘，不能被回滚

​  

### 事务的格式：

begin

SQL 语句

SQL 语句

2SQL 语句

commit；

  

### 事务并发存在的问题

1.**脏读**：读到未提交的数据

2.**不可重复读**：前后多次读取同一个数据内容不一致

3.**幻读**：前后多次读取数据，数量的总量不一致（插入删除数据时）

4.**丢失更新：**多个事务同时更新一个数据时，后提交的事务覆盖先提交大的事务

​  

### 隔离级别（4种）

**读未提交**（read uncommitted）：读取尚未提交的数据

不解决以上任何问题

**读已提交**（read commited）：读取已经提交的数据，可以解决脏读

只能读到已经提交的数据，未提交的不能读取

Oracle数据中默认的级别

安全性较差，性能较好

**可重复读**（Repeatable read）：可以解决脏读，不可重复读

一个事务执行大的过程中，多次读取同一个数据，会得到相同的结果

mysql默认的隔离级别

安全性号，性能中等

**串行化**（Serializable）:

事务被一个一个串行执行

安全性最好，性能差

脏读 不可重复读 幻读 丢失更新

read uncommitted yes yes yes yes

read commited no yes yes yes

Repeatable read no no no yes mysql默认级别

Serializable no no no no

  

### 查看当前隔离级别

show global variables like "%isolation%";

![image.png](assets/mysql%E5%A4%8D%E4%B9%A0-5.png)

  

  

## 锁

在并发环境中，会存在资源争夺，如何解决资源争夺问题？谁可以使用数据？ =》锁

并发执行 -》资源争夺 -》锁 -》

Mysql使用隔离级别（不同的隔离级别会有不同的锁策略）

​  

锁：可以理解为一个凭证

​  

事务 -- 基于数据库连接（session） - 连接由工作线程来维护

多个事务并发 -- 多个工作线并发 -- 存在资源分配

​  

通过调整事务的隔离级别来避免以上问题

​  

事务的隔离级别 - 锁机制 -》解决事务并发问题

​  

### 锁的分类

#### 按颗粒度分

**全局锁**：锁定数据库中的所有表，加上全局锁后，数据库只读不能写（数据备份）

**表锁**：锁住整张表

表锁：共享读锁，独占写锁（read/write）

元数据锁：锁住表结构（不能修改表结构）

意向锁：为了提升锁的效率，配合行锁使用

**行锁**：锁定指定的行

记录锁：id=1，id=2 在rc和rr级别下支持（update/delete）

间隙锁：id=1，(2,9) id=10（不允许insert操作，避免幻读）

临键锁：间隙锁的升级 =》记录锁+间隙锁，rr级别下支持

​  

  

#### 互斥性划分

**共享锁/S锁/读锁**：不同事务之间不会相互排斥

**排他锁/X锁/写锁**：同一时刻只能有一个事务获取锁，一般写操作

​  

#### 以加锁方式分

**显示锁**（手动指定加锁）和隐式锁

​  

#### 以思想维度分

**乐观锁**：先操作，失败了在解决 -》代码实现

**悲观锁**：（Mysql中）先加锁在操作数据

​  

​  

### 什么是死锁 (Deadlock)？

当两个事务互相持有对方需要的锁，并都在等待对方释放时，就会陷入死循环。

-   **例子**：

-   事务 A 锁住了记录 1，想去锁记录 2。
-   事务 B 锁住了记录 2，想去锁记录 1。
-   **结果**：两个人都卡在那儿了。MySQL 通常会自动检测并强行回滚其中一个事务来解锁。

​  

​  

## 日志

对于 MySQL（尤其是 InnoDB 引擎）来说，日志不仅仅是为了查错，更是**保证数据不丢失（持久性）和主从复制**的核心机制。面试中常说的“MySQL 三大日志”分别是：**binlog、redo log 和 undo log**。

​  

### 日志用来作什么？

记录了很多关于程序运行状态的信息（正常，出错。。。）

用于排错

了解Mysql性能（速度）运行状况

数据的备份和恢复

​  

## 日志的备份和恢复
