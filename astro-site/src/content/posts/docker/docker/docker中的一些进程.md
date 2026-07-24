---
title: "Docker中的一些进程"
date: 2026-07-23
category: "Docker"
---
查看docker里的一些进程

```plain
[root@docker1 ~]# ps -aux
USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root           1  0.0  0.5  22344 12972 ?        Ss   10:38   0:01 /usr/lib/systemd/systemd --swi
root           2  0.0  0.0      0     0 ?        S    10:38   0:00 [kthreadd]
root           3  0.0  0.0      0     0 ?        S    10:38   0:00 [pool_workqueue_release]
root           4  0.0  0.0      0     0 ?        I<   10:38   0:00 [kworker/R-rcu_gp]
root           5  0.0  0.0      0     0 ?        I<   10:38   0:00 [kworker/R-sync_wq]
root           6  0.0  0.0      0     0 ?        I<   10:38   0:00 [kworker/R-slub_flushwq]
root           7  0.0  0.0      0     0 ?        I<   10:38   0:00 [kworker/R-netns]
root           9  0.0  0.0      0     0 ?        I<   10:38   0:00 [kworker/0:0H-kblockd]

```

  

  

process 进程

id 标识符

pid

​  

​  

![image.png](assets/Docker%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E8%BF%9B%E7%A8%8B-1.png)

  

  

访问数据库 --》客户端的工具 --》pycharm，mysql，navicat等

浏览器

## proxy 代理 --》中间人

在 Docker 语境中，**proxy（代理）** 主要指**Docker 的网络代理配置**，用于让 Docker 守护进程（`dockerd`）、Docker 客户端（`docker`命令）或容器内的应用，通过代理服务器访问外部网络（比如拉取镜像、容器内应用访问外网）；同时也可指 Docker 网络模式 / 组件中的代理相关功能（如反向代理容器、socks5 代理等），**最核心的是 Docker 自身的代理配置**（解决拉取镜像失败、容器网络访问受限问题）。

​  

## docker相关的进程

### 一、Docker 核心进程（按作用分类）

Docker 的运行依赖多个进程协同工作，核心进程主要分为**守护进程**和**容器进程**两大类：

#### 1\. Docker 守护进程（Docker Daemon）

这是 Docker 的核心后台进程，也是最关键的进程，所有 Docker 命令（`docker run`/`docker ps`等）都通过客户端与它交互。

-   **进程名**：`dockerd`（主进程），可能伴随子进程如`containerd`、`containerd-shim`、`runc`（Docker 1.11 + 后拆分为模块化架构）。
-   `containerd` = 容器管理总管家（负责容器生命周期的核心调度）；
-   `containerd-shim` = 容器与总管家之间的 “隔离垫片”（避免单个容器崩溃影响总管家）；
-   `runc` = 真正创建 / 运行容器的 “工人”（容器运行时的最底层实现）。
-   **作用**：

-   监听 Docker API 请求（本地 socket 或 TCP）；
-   管理容器的生命周期（创建、启动、停止、销毁）；
-   管理镜像、网络、存储卷等资源；
-   调用`containerd`和`runc`实现容器的底层隔离。

-   **查看方式**：bash运行

```plain
# 查看dockerd进程
ps aux | grep dockerd
# 查看Docker相关的所有进程
ps aux | grep -E 'dockerd|containerd|runc'
```

#### 2\. 容器进程

每个运行中的容器对应宿主机上的一个（或多个）进程，是容器内应用的载体：

-   **核心进程**：`runc`（创建容器的底层运行时，每个容器对应一个`runc`进程）、`containerd-shim`（隔离容器与`containerd`，容器退出后保留日志等信息）。
-   `containerd` = 容器管理总管家（负责容器生命周期的核心调度）；
-   `containerd-shim` = 容器与总管家之间的 “隔离垫片”（避免单个容器崩溃影响总管家）；
-   `runc` = 真正创建 / 运行容器的 “工人”（容器运行时的最底层实现）。
-   **容器内进程**：容器启动时指定的`ENTRYPOINT`/`CMD`（如`nginx`、`mysql`、`java`等），在宿主机上可通过`ps aux | grep 容器ID`看到。
-   **查看方式**：bash运行

```plain
# 查看运行中容器的宿主机进程ID
docker top <容器ID/名称>
# 查看宿主机上所有容器相关进程
ps aux | grep -E 'runc|containerd-shim'
```

### 二、Docker 核心文件 / 目录（按功能分类）

Docker 的所有配置、镜像、容器数据、日志等都存储在宿主机的特定目录，核心文件 / 目录如下（默认路径，不同系统略有差异）：

| **路径** | **类型** | **作用** |
| --- | --- | --- |
| `/var/run/docker.sock` | Socket 文件 | Docker 客户端与`dockerd`<br>通信的 Unix 域套接字（核心通信文件） |
| `/etc/docker/` | 目录 | Docker 主配置目录 |
| `/etc/docker/daemon.json` | 配置文件 | Docker 守护进程的核心配置（如镜像加速、存储驱动、网络等） |
| `/var/lib/docker/` | 目录 | Docker 的核心数据目录（**最重要**），所有镜像、容器、卷、网络数据都存在这里 |
| `/var/lib/docker/images/` | 目录 | 存储 Docker 镜像的分层文件（镜像的层数据） |
| `/var/lib/docker/containers/` | 目录 | 存储每个容器的元数据（配置、日志、容器 ID 等） |
| `/var/lib/docker/volumes/` | 目录 | 存储 Docker 卷（持久化数据），容器删除后卷数据仍保留 |
| `/var/lib/docker/network/` | 目录 | 存储 Docker 网络相关数据（网桥、端口映射、网络配置等） |
| `/var/log/docker/` | 目录 | Docker 守护进程的日志文件（如`daemon.log`<br>） |
| `/var/lib/docker/overlay2/`<br>（或`devicemapper/`<br>） | 目录 | 存储镜像 / 容器的分层文件系统（取决于 Docker 的存储驱动，`overlay2`<br>是主流） |
| `/usr/bin/docker` | 可执行文件 | Docker 客户端命令行工具（`docker`<br>命令的执行文件） |
| `/usr/bin/dockerd` | 可执行文件 | Docker 守护进程的可执行文件 |

### 三、关键补充说明

1.  **进程依赖关系**：`docker`客户端 → `dockerd` → `containerd` → `containerd-shim` → `runc` → 容器内进程这种分层架构让 Docker 更稳定（比如单个容器崩溃不影响`dockerd`）。
2.  **文件权限**：`/var/run/docker.sock`默认属于`root`和`docker`组，普通用户需加入`docker`组才能免 sudo 使用 Docker：

```plain
usermod -aG docker <用户名>
```

3.  **日志文件**：容器内应用的日志默认存储在`/var/lib/docker/containers/<容器ID>/<容器ID>-json.log`，也可通过`docker logs <容器ID>`查看。
4.  **配置文件生效**：修改`/etc/docker/daemon.json`后，需重启`dockerd`才能生效：bash运行

```plain
systemctl restart docker
```

  

## 进程树

进程和线程的区别

进程里包含线程，一个线程理解为一个子进程

线程消耗更少的内存资源的cpu资源

​  

  

  

## 容器的生命周期

容器的生命周期：life cycle

​  

​  

容器的生命周期是指容器从**创建**到**终止**的完整状态流转过程，Docker 容器的核心状态及流转关系如下：

### 1\. 核心状态以及一些命令

| **核心命令** | **适用容器状态** | **核心作用** | **关键参数 / 补充说明** |
| --- | --- | --- | --- |
| docker create | 无容器 | 创建容器（仅初始化，不运行） | 可搭配 - p/-v/--name 配置端口 / 挂载 / 容器名 |
| docker run | 无容器 | 创建并直接运行容器 | -d 后台运行，--restart 设置自动重启策略 |
| docker start | Created/Exited | 启动容器（进入运行态） | 可批量启动：docker start 容器 1 容器 2 |
| docker pause | Up/Running | 冻结容器进程（进入暂停态） | 仅冻结进程，不释放资源 |
| docker unpause | Paused | 解冻容器进程（恢复运行态） | 恢复后容器服务无缝继续 |
| docker stop | Up/Running/Paused | 优雅停止容器（进入停止态） | 默认等待 10 秒超时，可通过 - t 指定超时时间 |
| docker kill | Up/Running/Paused | 强制停止容器（进入停止态） | 直接发送 SIGKILL，不等待进程优雅退出 |
| docker restart | Up/Running/Paused/Exited | 重启容器（停止→运行） | 重启后容器 ID / 数据不变 |
| docker rm | Exited（默认） | 删除容器（进入删除态） | -f 强制删除运行中容器，-v 同时删除容器挂载的匿名卷 |
| docker container prune | 所有 Exited 容器 | 批量清理已停止容器 | 执行前会确认，-f 直接清理无需确认 |

  

### 2\. 状态流转顺序

​  

![W_G6(SD5[XWN$7$CEUXFYIT_tmb.png](assets/Docker%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E8%BF%9B%E7%A8%8B-2.png)

​  

​  

## OCI

**OCI 的全称是 Open Container Initiative（开放容器倡议）**，是由 Linux 基金会主导的一个开源项目，核心目标是**制定容器技术的开放标准**，避免容器生态碎片化。

### OCI 的核心作用与内容

1.  **定义容器标准规范**它制定了两个关键标准：

-   **镜像规范**：统一容器镜像的格式、结构和分发方式，确保不同容器运行时（如 Docker、containerd）能兼容同一份镜像。
-   **运行时规范**：定义容器的生命周期、隔离方式（如 Linux Namespace、Cgroups）等，保证容器在不同环境下的行为一致。

2.  **推动容器生态标准化**早期 Docker 是容器技术的事实标准，但 OCI 的出现让容器技术脱离单一厂商绑定 —— 现在 Docker、Kubernetes 等主流工具都遵循 OCI 规范，实现了 “镜像跨运行时通用、容器跨平台一致”。

  

  

# Harbor使用

### Harbor是什么

Harbor 是**企业级容器镜像仓库系统**，核心用于安全、高效地管理容器镜像（及 Helm Chart 等制品），解决 Docker 原生 Registry 功能不足的问题，是企业云原生环境的核心镜像管理工具：

1.  **安全管理**：支持镜像漏洞扫描、数字签名，通过 RBAC 做权限控制，保障镜像安全合规；
2.  **高效分发**：可跨环境同步镜像、自动清理旧镜像，支持对接对象存储扩容；
3.  **合规运维**：记录操作审计日志，提供图形化界面简化管理；
4.  **DevOps 集成**：对接 CI/CD 工具，支持高可用部署，适配多团队、多集群场景。

​  

先下载一个Harbor，链接[https://github.com/goharbor/harbor/releases/download/v2.14.2/harbor-offline-installer-v2.14.2.tgz](https://github.com/goharbor/harbor/releases/download/v2.14.2/harbor-offline-installer-v2.14.2.tgz)

​  

建一个harbor文件夹存放harbor压缩包

```plain
cd /
mkdir /harbor
cd /harbor
```

解压harbor压缩包

```plain
tar xf harbor-offline-installer-v2.14.2.tgz
```

​  

修改配置文件中的域名为你的主机ip

```plain
cd /harbor
cp harbor.yml.tmpl harbor.yml
vi harbor.yml										#修改配置文件
#修改hostname为你的主机ip
#hostname: 192.168.245.147
```

​  

Harbor 安装目录下执行的 `./install.sh` 。这是 Harbor 官方提供的**一键安装 & 启动脚本**

```plain
./install.sh
```

​  

查看是否运行成功

```plain
docker compose ps
```

![image.png](assets/Docker%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E8%BF%9B%E7%A8%8B-3.png)

看到这样就是运行成功了

​  

在浏览器中访问你的主机ip

[http://192.168.245.147/](http://192.168.245.147/)

![image.png](assets/Docker%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E8%BF%9B%E7%A8%8B-4.png)

  

登录，账号密码没有修改的话，默认是账号：admin，密码：Harbor12345

​  

新建一个项目

![image.png](assets/Docker%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E8%BF%9B%E7%A8%8B-5.png)

  

创建一个用户以后能用到

![image.png](assets/Docker%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E8%BF%9B%E7%A8%8B-6.png)

  

回到虚拟机中，查看你的镜像

```plain
docker images
```

![image.png](assets/Docker%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E8%BF%9B%E7%A8%8B-7.png)

可以看到你之前拉取的一些镜像

​  

编辑Docker守护进程配置 （同一网段的其他虚拟机拉取镜像也需要添加守护进程）

```plain
# 1. 编辑Docker守护进程配置（若文件不存在则新建）
vi /etc/docker/daemon.json
```

添加内容

```plain
{
    "registry-mirrors": ["https://docker.xuanyuan.me","https://docker.1panel.live"],  // 可选，加速官方镜像
    "insecure-registries": ["http://192.168.245.147:80"]  // 核心：允许访问Harbor的HTTP仓库
}
```

同一网段的其他虚拟机拉取镜像也需要添加守护进程

​  

修改配置后重新加载

```plain
systemctl daemon-reload
systemctl restart docker
#进入/harbor/harbor目录
cd /harbor/harbor
docker compose restart
```

​  

  

  

给本地镜像打标签（king是我之前新建的项目名）

```plain
# 给本地nginx:latest打Harbor标签
docker tag nginx:latest 192.168.245.147:80/king/nginx:latest

# 验证标签是否创建成功（能看到新标签的镜像即为成功）
docker images | grep 192.168.245.147:80/king/nginx
```

​  

推送镜像

```plain
# 执行推送命令
docker push 192.168.245.147:80/king/nginx:latest
```

  

注意事项

确保已登录 Harbor：若推送时提示`unauthorized`，先重新登录：

```plain
docker login http://192.168.245.147:80
# 输入admin + 你的密码（如Harbor12345）
```

登出

```plain
docker loginout http://192.168.245.147:80
```

  

同一网段的其他虚拟机访问我的仓库拉取镜像

\# 1. 编辑Docker守护进程配置（若文件不存在则新建） vi /etc/docker/daemon.json
