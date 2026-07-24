---
title: "rip实验"
date: 2026-07-23
category: "计算机网络"
---
## 网络拓扑图

![image.png](assets/rip%E5%AE%9E%E9%AA%8C-1.png)

## rip配置

### 1.配置好pc机的ip地址

### 2.配置好路由器的各个接口的ip地址

### 3.启用rip v2进程（每台路由器都需要操作）

![image.png](assets/rip%E5%AE%9E%E9%AA%8C-2.png)

#### 启用版本

```plain
Router(config)#router rip
Router(config-router)#version 2
```

  

#### 关闭rip v2路由自动汇总

```plain
Router(config-router)#no auto-summary 
```

  

#### 配置网段

```plain
Router(config-router)#network 192.168.3.0
Router(config-router)#network 192.168.40.0
```

### 4.宣告直连网络

### 5.查看动态路由的学习效果

![image.png](assets/rip%E5%AE%9E%E9%AA%8C-3.png)

### 6.各个pc机ping测试网络是否通畅
