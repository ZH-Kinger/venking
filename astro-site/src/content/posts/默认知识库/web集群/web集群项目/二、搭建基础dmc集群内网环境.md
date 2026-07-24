---
title: "二、搭建基础DMC集群(内网环境)"
date: 2026-07-23
category: "杂项笔记"
---
你需要配置的是一台**双网卡防火墙 / 路由器服务器**（WAN 口连外网、LAN 口连 DMZ 区），核心目标是实现「DMZ 区服务器上网（SNAT）」「外网访问内网 Web / 堡垒机（DNAT）」「限制 SSH 访问（TCP Wrappers）」，我结合你现有的集群环境（DMZ 网段 192.168.203.0/24、web1/web2/nfs-server 堡垒机），整理出**分步、可落地、适配你集群**的完整配置流程，每一步都标注关键注意事项，确保和你的 Web/NFS/DNS 集群无缝配合

  

## 一、给防火墙机器添加一块网卡

### 1.打开虚拟机设置，点击添加网络适配器

![image.png](assets/%E4%BA%8C%E3%80%81%E6%90%AD%E5%BB%BA%E5%9F%BA%E7%A1%80DMC%E9%9B%86%E7%BE%A4(%E5%86%85%E7%BD%91%E7%8E%AF%E5%A2%83)-1.png)

### 2.设置网卡模式

一块设置桥接模式作为WAN口

![image.png](assets/%E4%BA%8C%E3%80%81%E6%90%AD%E5%BB%BA%E5%9F%BA%E7%A1%80DMC%E9%9B%86%E7%BE%A4(%E5%86%85%E7%BD%91%E7%8E%AF%E5%A2%83)-2.png)

  

一块设置仅主机模式作为LAN口

![image.png](assets/%E4%BA%8C%E3%80%81%E6%90%AD%E5%BB%BA%E5%9F%BA%E7%A1%80DMC%E9%9B%86%E7%BE%A4(%E5%86%85%E7%BD%91%E7%8E%AF%E5%A2%83)-3.png)

  

打开防火墙虚拟机

### 1.查看虚拟机ip，并连接xshell

```plain
ip add
```

​  

​  

### 2.设置静态IP

**nmcli 命令行**

```plain
nmcli con mod "ens160" \
ipv4.method manual \
ipv4.addresses "192.168.1.8/24" \
ipv4.gateway "192.168.1.1" \
```

  

**手动编辑 nmconnection 配置文件****编辑 NetworkManager 配置文件**

```plain
vim /etc/NetworkManager/system-connections/ens160.nmconnection
```

**修改 [ipv4] 段内容**（保留其他段，仅改 ipv4 部分）

```plain
[ipv4]
method=manual # 手动模式（静态）
addresses1=192.168.1.8/24,192.168.1.1 # IP/掩码,网关
ignore-auto-dns=true
```

**修复文件权限**

```plain
chmod 600 /etc/NetworkManager/system-connections/ens160.nmconnection
```

​  

**重启连接使配置生效**

```plain
nmcli c reload
nmcli c up ens160
nmcli c up ens224
```

**如果xshell出现断连，去VMware中禁用再重启一下网卡**

```plain
nmcli d up ens160
nmcli d up ens224
```

## 可能会存在的问题

### 网络设备中文问题

网卡名是中文导致找不到你添加的网卡进入/etc/NetworkManager/system-connections/查看有几个网卡的配置文件

```plain
[root@localhost ~]# cd /etc/NetworkManager/system-connections/
[root@localhost system-connections]# ls
ens160.nmconnection
```

实际上你有不只有一个nmcli connection show查看网络设备

```plain
[root@localhost system-connections]#  nmcli connection show
NAME        UUID                                  TYPE      DEVICE 
ens160      d33dec02-4b3c-3053-82f2-acc4ea253510  ethernet  ens160 
有线连接 1  51054532-8ba0-3cd2-9194-a6c1a6bb8f90  ethernet  ens224 
有线连接 2  c1c09e1f-8e3e-37e2-b87a-122970464b26  ethernet  ens256 
lo          84b5497b-6232-489d-8728-d3034cdfcd63  loopback  lo   
```

修改网络设备名称

```plain
[root@localhost system-connections]# nmcli connection modify "有线连接 1" connection.id ens224
[root@localhost system-connections]# nmcli connection modify "有线连接 2" connection.id ens256
```

  

## 配置SNAT和DNAT

## 配置堡垒机，web1，web2的ip地址为静态（注意DMZ中的机器网卡模式都是仅主机模式）

修改堡垒机ip地址为静态ip，配置网关到防火墙的LAN口

### 堡垒机

```plain
nmcli con mod "ens160" \
ipv4.method manual \
ipv4.addresses "192.168.31.136/24" \
ipv4.gateway "192.168.31.135" \
ipv4.dns= "114.114.114.114"
```

### web1

```plain
nmcli con mod "ens160" \
ipv4.method manual \
ipv4.addresses "192.168.31.130/24" \
ipv4.gateway "192.168.31.135" \
ipv4.dns= "114.114.114.114"
```

### web2

```plain
nmcli con mod "ens160" \
ipv4.method manual \
ipv4.addresses "192.168.31.131/24" \
ipv4.gateway "192.168.31.135" \
ipv4.dns= "114.114.114.114"
```

  

分别测试他们内网能不能ping通网关

  

### 一、SNAT（Source NAT，源网络地址转换）

#### 核心作用

修改**数据包的源 IP 地址**（偶尔也改源端口），让**内网私有 IP**的设备，通过公网 IP 与外网通信，是内网设备访问外网的 “必经转换”。

#### 工作原理

1.  内网设备（如 192.168.1.100）向外网发送数据包，源 IP 是私有 IP，目的 IP 是外网公网 IP；
2.  数据包到达 NAT 网关（路由器 / 防火墙 / 服务器），网关通过 SNAT 将**源 IP 替换为网关的公网 IP**（如 202.103.0.1），并记录 “内网 IP: 端口 ↔ 公网 IP: 端口” 的映射关系；
3.  外网服务器收到数据包，仅能看到网关的公网 IP，回复的数据包将发送到该公网 IP；
4.  网关收到回复，通过之前的映射关系，反向找到对应的内网设备，将数据包转发过去。

#### 核心特征

-   **单向访问**：仅支持**内网→外网**，外网无法主动访问内网；
-   **地址复用**：多个内网设备可共享**同一个公网 IP**访问外网（通过端口区分不同设备），这是解决 IPv4 地址枯竭的关键；
-   **隐藏内网**：外网无法获取内网设备的真实 IP，提升内网安全性。

​  

### 二、DNAT（Destination NAT，目的网络地址转换）

#### 核心作用

修改**数据包的目的 IP 地址**（或目的端口），将**外网发往网关公网 IP**的数据包，转发到**内网指定的私有 IP 设备**，是外网访问内网服务的 “核心转换”（端口映射是 DNAT 的常见形式）。

#### 工作原理

1.  外网设备（如公网 IP101.37.0.2）向内网网关的公网 IP（202.103.0.1）发送数据包，目的 IP 是网关公网 IP，目的端口可指定（如 80、443）；
2.  数据包到达 NAT 网关，网关通过 DNAT 将**目的 IP 替换为内网目标设备的私有 IP**（如 192.168.1.20，内网 web 服务器），若为端口映射，同时替换目的端口；
3.  内网目标设备收到数据包，处理后将回复发送给网关；
4.  网关将回复的源 IP 换回自身公网 IP，转发给外网设备。

#### 核心特征

-   **反向访问**：支持**外网→内网**，是外网访问内网服务的唯一方式（因内网私有 IP 无法被外网路由）；
-   **精准映射**：可将 “公网 IP: 端口” 精准映射到 “内网 IP: 端口”，实现多内网服务共享一个公网 IP；
-   **端口转发**：DNAT 最常用的形式是**端口映射**（如将公网 IP 的 80 端口映射到内网 192.168.1.20 的 80 端口，外网访问公网 80 即访问内网 web 服务器）。

  

  

### 再防火墙机器上配置DNAT和SNAT

编写一键部署脚本

```plain
vi init.sh
```

#### 一键配置脚本

```plain
#!/bin/bash
# 一键配置 SNAT/DNAT 脚本（补充关键项，不修改原有规则逻辑）

# 0. 检查是否为 root 用户（非 root 无权限操作 iptables）
if [ $UID -ne 0 ]; then
    echo "错误：请使用 root 用户执行此脚本！"
    exit 1
fi

# 1. 开启路由转发
echo 1 > /proc/sys/net/ipv4/ip_forward
echo "net.ipv4.ip_forward = 1" >> /etc/sysctl.conf
sysctl -p > /dev/null 2>&1

# 2. 清空规则
iptables -F
iptables -t nat -F

# 3. 配置 SNAT（内网流量伪装成外网 IP 访问外网）
iptables -t nat -A POSTROUTING -s 192.168.31.0/24 -o ens160   -j MASQUERADE
iptables -t nat -A POSTROUTING -s 192.168.31.0/24 -o ens224   -j MASQUERADE

# 4. 配置 DNAT（端口转发，发布两个 VIP 提供 Web 服务）
iptables -t nat -A PREROUTING -d 192.168.1.8 -i ens160 -p tcp --dport 80 -j DNAT --to-destination 192.168.31.130
iptables -t nat -A PREROUTING -d 192.168.1.8 -i ens160 -p tcp --dport 80 -j DNAT --to-destination 192.168.31.131

# 5. 配置堡垒机端口转发（2233 → 堡垒机 22 端口）
iptables -t nat -A PREROUTING -d 192.168.1.8 -i ens160 -p tcp --dport 2233 -j DNAT --to-destination 192.168.31.136:22

# 6. 保存 iptables 规则（重启后生效，适配 CentOS/Ubuntu 主流系统）
if command -v iptables-save >/dev/null 2>&1; then
    # CentOS/RHEL
    iptables-save > /etc/sysconfig/iptables
    # Ubuntu/Debian
    iptables-save > /etc/iptables/rules.v4
    echo "规则已保存，重启后生效！"
else
    echo "提示：未找到 iptables-save 命令，需手动保存规则"
fi

echo "SNAT/DNAT 规则配置完成！"
```

  

  

  

​  

​
