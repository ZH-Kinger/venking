---
title: "GIT_的使用"
date: 2026-07-23
category: "GitHub"
---
git的专业名称是**分布式版本控制系统**。如果你曾经在写论文或做设计时，保存过类似“成品.docx”、“成品-最终版.docx”、“成品-打死不改版.docx”的文件，那么 Git 就是为了终结这种混乱而生的。

---

## Git 的核心功能

Git 主要通过以下三个维度来管理你的工作：

-   **版本管理（时光机）：** 它记录文件的每一次修改。如果你今天写代码把程序写崩了，你可以一键“穿梭”回昨天还没出问题的状态。
-   **分支管理（平行时空）：** 你可以在主程序运行的同时，开辟一个“实验区”开发新功能。如果实验成功，就合并回来；如果失败，直接删掉，主程序毫发无损。
-   **团队协作（共享大脑）：** 多个开发者可以同时修改同一个项目。Git 会聪明地处理大家的修改，并在冲突时提醒你手动调整。

  

安装网址[https://git-scm.com/install/windows](https://git-scm.com/install/windows)

选择你要安装的系统

```mermaid
flowchart LR
  n1["节点"]
  n2["节点"]
  n3["节点"]
  n1 -- "拉取pull" --> n3
  n2 --> n1
```

![白板 1](assets/GIT_%E7%9A%84%E4%BD%BF%E7%94%A8-%E7%99%BD%E6%9D%BF-1.svg)

​  

## Git的常用命令

### 1\. 建立仓库（从零开始）

不管你是新建项目，还是去“搬运”别人的项目，都会用到这些。

-   `git init`：在当前文件夹初始化一个本地仓库（产生一个隐藏的 `.git` 文件夹）。
-   `git clone <url>`：**克隆**。把远程仓库（比如 GitHub 上的项目）完整下载到本地。

​  

`**URL**`：通常是 `https://github.com/用户名/项目名.git`

---

### 2\. 提交更改（保存进度）

这是最频繁的操作，就像玩单机游戏时的“存档”。

-   `git status`：**查看状态**。看看哪些文件改了还没保存。
-   `git add <file>`：**添加暂存**。把文件标记为“准备提交”。使用 `git add .` 可以添加全部修改。
-   `git commit -m "说明信息"`：**正式提交**。给这次改动打上标签，存入本地历史记录。

---

### 3\. 分支管理（平行时空）

分支是 Git 的灵魂，让你能安全地开发新功能。

-   `git branch`：查看当前有哪些分支。
-   `git branch <name>`：创建一个名为 `name` 的新分支。
-   `git checkout <name>`：**切换**到指定分支。
-   `git merge <name>`：**合并**。把 `name` 分支的代码合并到你当前所在的分支。

---

### 4\. 远程协作（同步数据）

当你需要把代码传到 GitHub 或从那里拉取代码时。

-   `git pull`：**拉取**。把远程最新的代码抓下来，并自动和你的本地代码合并。
-   `git push`：**推送**。把你本地的“存档”上传到云端仓库。
-   `git remote -v`：查看本地仓库关联了哪些远程地址。

---

### 5\. 撤销与“后悔药”

Git 最强大的地方在于你可以随时反悔。

-   `git log`：**查看历史**。看看过去是谁在什么时候提交了什么。
-   `git checkout -- <file>`：撤销对某个文件的修改，回到上次提交时的状态。
-   `git reset --hard <commit-id>`：**终极回滚**。强制让项目回到历史中某个特定的版本（慎用！）。

---

### 一个典型的操作流程

如果你今天领到了一个开发任务，你的命令顺序通常是这样的：

1.  `git pull`（先同步队友的代码）
2.  `git checkout -b feature-A`（开个新分支写新功能）
3.  *写代码...*
4.  `git add .`（把改动放入暂存区）
5.  `git commit -m "完成A功能开发"`（存档）
6.  `git push`（推送到云端）

​  

​  

## 关联仓库

### 场景一：先有远程（最推荐，最省心）

如果你在 GitHub 上新建了一个仓库（勾选了初始化 README 或 License），最简单的方式是直接**克隆**。

-   **操作逻辑：** 把远程的“空房子”直接搬到本地，Git 会**自动**帮你完成所有关联。

**常用命令：**

-   Bash

```plain
git clone https://github.com/用户名/仓库名.git
```

-   **结果：** 文件夹自动关联好了 `origin`，你直接 `git push` 就能成功。

---

### 场景二：先有本地（最常见，手动建立）

你在本地已经写了一堆代码，现在想把它上传到一个**全新的、空的** GitHub 仓库。

-   **第一步：本地初始化**

`git init` (让文件夹变成 Git 仓库)

-   **第二步：关联地址**

`git remote add origin https://github.com/用户名/仓库名.git`

-   **第三步：建立追踪关系**

`git push -u origin main` (把本地分支和远程分支“锁死”)

---

### 场景三：两边都有内容（最容易报错）

如果你本地有代码，GitHub 仓库里也有文件（比如 README），这时候直接关联会报错，因为两边的“历史记录”对不上。

-   **解决办法（强行合并）：**

1.  关联地址：`git remote add origin <URL>`
2.  抓取远程：`git fetch origin`
3.  强行合并：`git pull origin main --allow-unrelated-histories`

*(这行命令是关键，它允许合并没有共同祖先的项目)*

---

### 总结：关联方式对比表

| **方式** | **适用情况** | **核心命令** | **优点** |
| --- | --- | --- | --- |
| **Clone (克隆)** | 项目刚开始，GitHub 上已有仓库 | `git clone` | **一键完成**，自动关联，最不容易出错。 |
| **Remote Add** | 本地已有代码，想上传到新仓库 | `git remote add` | 灵活，适合把现有项目搬家到云端。 |
| **Set-url** | 仓库搬家了，或者写错了地址 | `git remote set-url` | 不需要删除重加，直接修改指向。 |

---

### 小贴士：怎么看我现在关联了谁？

如果你不确定当前的关联状态，输入这个命令：

Bash

```plain
git remote -v
```

它会显示两条记录（fetch 和 push），如果显示为空，说明你还没关联任何远程仓库。

​  

## 登录方式

### https

#### 第一步：在 GitHub 上获取你的“新密码” (Token)

因为你不能用网页登录密码推代码，所以需要生成一个专属令牌：

1.  登录 GitHub，点击右上角头像 -> **Settings**。
2.  拉到最底部，点击 **Developer settings**。
3.  选择 **Personal access tokens** -> **Tokens (classic)**。
4.  点击 **Generate new token (classic)**。
5.  **Note** 随便填（如 "MyLaptop"），**Expiration** 选永久或 90 天。
6.  **关键：** 勾选 `**repo**` 权限（这样你才有权推送代码）。
7.  点击生成，**立刻复制保存那串以** `**ghp_**` **开头的长字符**（它只会出现这一次！）。

---

#### 第二步：在本地建立连接

如果你已经有一个本地项目，使用 HTTPS 地址关联：

​  

```plain
# 关联远程仓库（把 URL 换成你仓库的 HTTPS 地址）
git remote add origin https://github.com/用户名/仓库名.git
```
---

#### 第三步：第一次推送与身份验证

当你执行推送命令时，系统会弹出验证框：

```plain
git push -u origin main
```

-   **如果弹出小窗口（Git Credential Manager）：** 点击 "Sign in with your browser"，它会自动跳转浏览器授权，这是最简单的。
-   **如果是在终端（Terminal/CMD）里提示：**

-   **Username:** 输入你的 GitHub 用户名。
-   **Password:****不要输入网页登录密码**，直接粘贴你刚才生成的那个 `**ghp_**` **开头的 Token**。

---

#### 💡 如何让电脑“记住”这个 Token？

你肯定不想每次 `push` 都去翻小本子找 Token。Git 提供了一个“凭据管理器”来帮你记住：

-   **Windows:** 默认已开启。你可以在“控制面板 -> 凭据管理器”里看到并修改它。
-   **Mac:** 默认使用 Keychain。
-   **通用命令（手动开启记住密码）：**

```plain
git config --global credential.helper store
```

*执行后，下次输入一次 Token，它就会永久保存在本地磁盘。*

---

#### 总结：HTTPS 连接的优缺点

| **优点** | **缺点** |
| --- | --- |
| **无需配置：** 只要有网，随时随地在任何电脑都能拉取代码。 | **Token 难记：** 必须妥善保存那串长字符，丢了得重设。 |
| **防火墙友好：** 几乎所有公司和学校的网络都开放 443 (HTTPS) 端口。 | **安全性稍低：** 如果 Token 泄露且没设有效期，风险较大。 |

  

  

### ssh

配置 SSH 的核心逻辑是：**在你的电脑上生成一对“钥匙”（公钥和私钥），把公钥存到 GitHub 上，私钥留在自己电脑里。** 这样当你推送代码时，GitHub 会用公钥来匹配你的私钥，匹配成功即允许通行，**全程不需要输入账号密码。**

---

#### 第一步：检查并生成 SSH Key

打开终端（Windows 用 Git Bash，Mac/Linux 用 Terminal），输入：

​  

```plain
ssh-keygen -t ed25519 -C "你的邮箱@example.com"
```

-   **敲三次回车：** 它会问你存哪、要不要设独立密码，全部直接按 **Enter** 跳过。
-   看到一串字符画（Randomart image）说明成功了。

---

#### 第二步：获取你的“钥匙内容” (公钥)

你需要把刚生成的公钥内容复制出来。

-   **Windows (Git Bash):** 输入 `cat ~/.ssh/id_ed25519.pub`
-   **Mac:** 输入 `pbcopy < ~/.ssh/id_ed25519.pub` (已自动复制)
-   **内容特征：** 以 `ssh-ed25519` 开头，以你的邮箱结尾的一长串字符。

---

#### 第三步：把公钥交给 GitHub

1.  登录 GitHub，点击右上角头像 -> **Settings**。
2.  左侧菜单点击 **SSH and GPG keys**。
3.  点击绿色按钮 **New SSH key**。
4.  **Title：** 随便起个名（比如 "Work-Laptop"）。
5.  **Key：** 把刚才复制的那一长串粘贴进去，点击 **Add SSH key**。

---

#### 第四步：测试是否连接成功

在终端输入：

​  

```plain
ssh -T git@github.com
```

-   如果提示 `Are you sure you want to continue connecting (yes/no/[fingerprint])?`，输入 `**yes**` 并回车。
-   如果看到 `Hi [你的用户名]! You've successfully authenticated...`，说明你已经和 GitHub “握手”成功了！

---

#### 第五步：使用 SSH 关联仓库

**关键点：** 如果你之前是用 HTTPS 关联的，现在需要把它改成 SSH 地址，否则它还是会管你要 Token。

1.  去 GitHub 仓库页面，点击 **Code** 按钮，选择 **SSH** 选项卡。
2.  复制那段地址（形如 `git@github.com:用户名/仓库名.git`）。

在本地终端执行：

```plain
git remote set-url origin git@github.com:用户名/仓库名.git
```
---

#### 为什么更推荐 SSH？

-   **一次配置，永久免密：** 只要你不重装系统或删除密钥文件，以后 `git push` 就是秒传。
-   **多仓库友好：** 你可以给不同的服务器（如公司 GitLab、个人 GitHub）配置不同的密钥。
-   **安全性：** 即使有人知道了你的 GitHub 账号密码，没有你电脑里的私钥，他也无法从你的电脑推送代码。

## Git GUI的使用

### 1.在本地新建版本库

首先，我们打开Git GUI是这样的一个界面，选择第一项，新建版本库。

![](assets/GIT_%E7%9A%84%E4%BD%BF%E7%94%A8-1.png)

然后选择你需要进行版本管理的项目路径，我选择了一个LoginDemo的项目。

![](assets/GIT_%E7%9A%84%E4%BD%BF%E7%94%A8-2.png)

当你创建了版本库的时候，你可以在该项目的路径下看见多了一个.git文件夹（设置了隐藏文件不可见的话看不见）

![](assets/GIT_%E7%9A%84%E4%BD%BF%E7%94%A8-3.png)

在Git Gui中，如果Unstaged Changes（未缓存的改动）中包含文件，则先点击Stage Changed，将未缓存的改动加入缓存，再点击Commit；否则需要先点击Rescan扫描项目中进行过改动的文件。注：提交描述必须要填写，不然无法提交。

![](assets/GIT_%E7%9A%84%E4%BD%BF%E7%94%A8-4.png)

提交成功后，我们可以在Repository->Visualize All Branches History中看到我们提交的历史记录（这是提交到本地而不是提交到远程服务器）。至此，本地版本库就创建成功了。

![](assets/GIT_%E7%9A%84%E4%BD%BF%E7%94%A8-5.png)

​  

### 2.将项目提交到远程

上一步已经使用Git在本地建立起了版本库，然后我们需要将该项目提交到远程服务器以便同事或其他合作者共同参与开发。一般的开源项目使用github作为远程服务器。其实在本地简历版本库后，只需要点击push就可以直接上传。但是我们还没有将本地的Git与github建立联系以及设置安全协议。

  

首先，我们需要在有一个自己的github帐户，然后在github上新建一个repository，名字也叫做LoginDemo（可以和本地项目名不一样）。

![](assets/GIT_%E7%9A%84%E4%BD%BF%E7%94%A8-6.png)

在Git Gui中，选择Remote->add添加远程服务器，远程服务器信息有两种填写方式，填写https地址或ssh地址，对应github项目的https和ssh地址，推荐使用ssh方式。

​  

#### 1.https地址

这种方式需要输入你的github帐户和密码，意味着通过这种方式你只能够操作自己的项目。

![](assets/GIT_%E7%9A%84%E4%BD%BF%E7%94%A8-7.png)

​  

#### 2.ssh地址

这种方式需要进行授权设置，在Git Gui的菜单栏，点击Help->Show SSH key->Generate SSH KEY创建密钥。

![](assets/GIT_%E7%9A%84%E4%BD%BF%E7%94%A8-8.png)

然后在github的Personal settings中添加它，title随意，可以用Home，company等作为标识来区别。

![](assets/GIT_%E7%9A%84%E4%BD%BF%E7%94%A8-9.png)

添加远程服务器信息。

![](assets/GIT_%E7%9A%84%E4%BD%BF%E7%94%A8-10.png)

​  

接下来，我们便可以直接在Git Gui点击push提交至远程客户端，刷新一下github，便可以看到项目已经在repository中了。

​  

​  

#### 3.从远程下载更新

设想多人参与项目开发，每个人都只push到远程，完全不顾其他成员的进度，这样的开发模式无疑是有问题的。我们最好的做法是，每次push到远程的时候，先从远程把目前进度fetch下来，在和自己目前项目进度merge后，再将它push到远程。打开Git Gui，在菜单栏中选择Remote->Fetch from->LoginTest，便可以从远程服务器更新到本地，但是尚未与自己当前项目合并。

![](assets/GIT_%E7%9A%84%E4%BD%BF%E7%94%A8-11.png)

​  

#### 4.合并解决冲突

从远程fetch后，选择Git Gui的Merge->Local Merge进行合并，选择Tracking Branch。

![](assets/GIT_%E7%9A%84%E4%BD%BF%E7%94%A8-12.png)

如果本地有一个方法名叫findUser，而远程服务器中该方法的名字改变了，例如变成了findPassword，则合并遇到冲突，可以右键空白部分选择保留本地版本或远程版本进行合并（图中绿色的代码表示冲突部分）。

![](assets/GIT_%E7%9A%84%E4%BD%BF%E7%94%A8-13.png)

​  

#### 5.克隆github上的项目到本地

在Git Gui的主界面选择克隆已有版本库。

![](assets/GIT_%E7%9A%84%E4%BD%BF%E7%94%A8-14.png)

Source Location即github中项目的地址，和第二部分（将项目提交到远程）中一样，可以选择https地址或ssh地址，Target Directory是在本地存放该项目的路径。点击Clone，成功从github将项目克隆到本地。

![](assets/GIT_%E7%9A%84%E4%BD%BF%E7%94%A8-15.png)

————————————————

版权声明：本文为CSDN博主「廿半」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。

原文链接：[https://blog.csdn.net/qq\_34842671/article/details/70916587](https://blog.csdn.net/qq_34842671/article/details/70916587)

## Vscode上的Git

### 1/安装git

在vscode上搜索github的扩展程序

![image.png](assets/GIT_%E7%9A%84%E4%BD%BF%E7%94%A8-16.png)

  

### 2.选择储存库

输入远程库的url添加远程仓库

![image.png](assets/GIT_%E7%9A%84%E4%BD%BF%E7%94%A8-17.png)

  

### 3.再进入分支界面

![image.png](assets/GIT_%E7%9A%84%E4%BD%BF%E7%94%A8-18.png)

  

### 4.点击更改下的加号去添加（相当于add操作）

![image.png](assets/GIT_%E7%9A%84%E4%BD%BF%E7%94%A8-19.png)

  

### 5.提交（相当于commit）

点击提交按钮将你加号添加的被修改的文件提交到暂存区

![image.png](assets/GIT_%E7%9A%84%E4%BD%BF%E7%94%A8-20.png)

### 6.同步更新（相当于push）

点击更改按钮将暂存区的文件同步到github上

然后就可以去github上查看action

![image.png](assets/GIT_%E7%9A%84%E4%BD%BF%E7%94%A8-21.png)
