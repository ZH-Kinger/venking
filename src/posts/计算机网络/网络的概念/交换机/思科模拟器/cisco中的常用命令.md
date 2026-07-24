---
title: "cisco中的常用命令"
icon: network
date: 2026-07-23
category:
  - 计算机网络
---
## 常见命令

### 一、 模式切换与基础管理

这些命令决定了你在哪个“层级”进行操作。

![](/blog/assets/posts/cisco%E4%B8%AD%E7%9A%84%E5%B8%B8%E7%94%A8%E5%91%BD%E4%BB%A4-1.png)

| **命令** | **功能** | **备注** |
| --- | --- | --- |
| `enable` | 进入特权模式 | 图标从 `>`<br>变为 `#` |
| `configure terminal` | 进入全局配置模式 | 简称 `conf t`<br>，大部分配置在此进行 |
| `hostname [名称]` | 修改设备名称 | 方便在多台设备中辨别 |
| `exit` | 退回上一级 | — |
| `end` | 直接退回特权模式 | 快捷键 `Ctrl+Z`<br>效果相同 |
| `write` | 保存当前配置 | 重启不丢失配置的关键（等同于 `copy run start`<br>） |

---

### 二、 三层核心与路由配置

这是让交换机实现“路由”功能的关键命令。

| **命令** | **功能** | **关键说明** |
| --- | --- | --- |
| `ip routing` | **开启三层转发** | **必做步骤**，否则无法实现 VLAN 间路由 |
| `interface vlan [ID]` | 进入 VLAN 虚接口 (SVI) | 用于给对应的 VLAN 配置网关 IP |
| `ip address [IP] [子网掩码]` | 配置接口 IP 地址 | 在 SVI 或路由口模式下使用 |
| `no shutdown` | 激活接口 | 开启 SVI 或物理接口 |
| `no switchport` | **切换物理口模式** | 将二层交换口变为三层路由口（可直接配 IP） |
| `ip route 0.0.0.0 0.0.0.0 [下一跳]` | 配置默认路由 | 告诉交换机所有外网流量往哪发 |

---

### 三、 以太网通道 (EtherChannel)

用于多条链路捆绑，增加带宽和冗余。

| **命令** | **功能** | **示例/备注** |
| --- | --- | --- |
| `interface range [接口列表]` | 批量选择端口 | 如 `int range g0/1 - 2` |
| `channel-group [组号] mode active` | 建立 LACP 通道 | `active`<br>代表主动协商（常用） |
| `interface port-channel [组号]` | 进入逻辑通道接口 | 对捆绑后的“虚拟大网线”进行统一配置 |
| `switchport mode trunk` | 设置为中继链路 | 允许所有 VLAN 通过此通道 |

---

### 四、 状态查看与故障排查 (Show 系列)

当实验不通时，请务必使用以下命令检查。

| **命令** | **检查重点** | **常用场景** |
| --- | --- | --- |
| `show ip interface brief` | 接口状态 (Status/Protocol) | 检查接口是否为 `up/up`<br>，IP 是否配对 |
| `show ip route` | 路由表 | 确认是否有 `C`<br>(直连) 或 `S`<br>(静态) 路由 |
| `show vlan brief` | VLAN 划分 | 确认物理端口是否被正确划分到了对应的 VLAN |
| `show etherchannel summary` | 通道状态 | 检查通道成员状态是否为 `(P)`<br>(已捆绑) |
| `show running-config` | 所有配置 | 查看你到底敲了哪些命令，是否有错漏 |

---

### ​进阶小贴士

-   **如何查命令？** 在任何模式下输入 `?`，系统会告诉你当前可以输入的所有命令。
-   **写错了怎么办？** 在原命令前加上 `no` 即可撤销。例如：`no ip address`（删除 IP）。
-   **自动补齐：** 输入命令前几个字母后按 `Tab` 键，省去敲全单词的麻烦。

​  

## 不同模式之间的区别

在 Cisco 网络设备的操作中，理解**模式 (Modes)** 的区别至关重要，因为这决定了你的权限范围以及命令的影响程度。

Cisco IOS 采用了分层的 CLI 结构，主要分为以下四个核心模式：

---

### 一、 模式功能对比表

| **模式名称** | **提示符示例** | **权限级别** | **主要用途** | **常用操作** |
| --- | --- | --- | --- | --- |
| **用户模式** (User EXEC) | `Switch>` | 最低 | 查看基础信息，无法修改配置。 | `ping`<br>, `traceroute` |
| **特权模式** (Privileged EXEC) | `Switch#` | 中等 | 查看详细状态、保存配置、进入配置模式。 | `show`<br>命令, `write` |
| **全局配置模式** (Global Config) | `Switch(config)#` | 高 | 修改影响整台设备的参数。 | `hostname`<br>, `ip routing` |
| **特定配置模式** (Sub-config) | `Switch(config-if)#` | 高 | 修改特定接口、VLAN 或路由协议。 | `ip address`<br>, `no shutdown` |

---

### 二、 模式间的切换流程

你可以通过以下命令在模式间跳转。

1.  **进入特权模式**：在 `>` 下输入 `enable`。
2.  **进入全局配置**：在 `#` 下输入 `configure terminal`。
3.  **进入接口配置**：在 `(config)#` 下输入特定的接口命令，如 `interface vlan 10` 或 `interface g0/1`。
4.  **返回上一级**：输入 `exit`。
5.  **一键回到特权模式**：输入 `end` 或使用快捷键 `Ctrl + Z`。

​
