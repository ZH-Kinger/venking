---
title: "k8s怎么做资源隔离与网络通信的"
icon: clipboard-text
date: 2026-07-23
category:
  - 面试
---
### 一、 资源隔离：cgroups 与 Namespace 的深度配合

K8s 的隔离不是“真虚拟机”，而是**进程级的逻辑限制**。

#### 1. 基础隔离：Linux Namespace

每个 Pod 都有自己独立的 **命名空间**，这保证了 Pod 之间看不到对方的进程（PID）、挂载点（Mount）和主机名（UTS）。

**面试点**：K8s 最精妙的是 **Infra Container（Pause 容器）**。一个 Pod 里的所有容器共享同一个 Network Namespace，所以它们可以直接通过 `localhost` 通信。

#### 2. 资源限制：cgroups (Request & Limit)

这是你做 **AIOps 趋势预警** 的基础数据来源。

-   **Requests**：保证“底线”。调度器（Scheduler）根据这个值决定 Pod 往哪台机器放。
-   **Limits**：设定“天花板”。

-   **CPU 隔离**：是压缩型资源。超过 Limit 只是会被 **Throttling（限流）**，进程变慢但不会死。
-   **Memory 隔离**：是非压缩型。一旦超过 Limit，就会触发 **OOM Killer**。

**话术**：*“在我的压测中，我会重点监控* `*container_cpu_cfs_throttled_seconds_total*` *指标。如果这个值激增，说明我的 Limit 设小了，触发了内核的 CFS 调度限制，这会直接导致业务延迟（Latency）抖动。”*

---

### 二、 网络通信：从 Pod 到 Service 的流量转发

K8s 网络遵循 **“每个 Pod 拥有独立 IP”** 的扁平化原则。

#### 1. Pod 间通信：CNI 插件 (Overlay vs Routing)

你简历里提到的 **Flannel** 或 **Calico** 解决了跨节点通信问题：

-   **Flannel (VxLAN)**：在物理包外再包一层隧道头。
-   **Calico (BGP)**：直接修改宿主机的路由表，把宿主机当路由器。

**落地感**：如果你追求性能（像你的 LVS 架构一样），你会选 Calico 的 BGP 模式，因为它省去了封包解包的 CPU 损耗。

#### 2. 服务发现：Service 与 kube-proxy

这是实现\*\*“内部负载均衡”\*\*的核心。流量到达 Service IP 后，由 **kube-proxy** 转发：

-   **IPVS 模式 (你的最爱)**：

K8s 会在每个节点上创建一个虚拟网卡，并利用 **IPVS 模块**（和 LVS 同款）来做负载均衡。

-   **对比**：相比传统的 Iptables 模式，IPVS 在处理成千上万个 Service 时，查询效率是 O(1)，性能更稳，且支持 **轮询（rr）** 和 **最小连接数（lc）** 算法。

[Image showing K8s networking: Pod-to-Pod via CNI and Pod-to-Service via IPVS]

---

### 三、 网络隔离：Network Policy (安全组)

既然你熟悉 **DMZ 隔离**，那在 K8s 里你就不能只靠防火墙了，得靠 **Network Policy**。

-   **原理**：基于标签（Label）选择器，通过控制 Iptables 链来决定哪些 Pod 能互访。
-   **具体操作**：

“我会定义一条策略，只允许带有 `app: gateway` 标签的 Pod 访问 `app: database` 的 3306 端口，禁止其他所有非业务流量。这在 Pod 频繁漂移的情况下，实现了**动态的精细化访问控制**。”

---

### 面试必杀技：

面试官问：**“既然 LVS 很快，那 K8s 里的 Ingress 为什么要用 Nginx？”**

**你的满分回答**：

“这其实是 **‘四层调度与七层转发’** 的结合。

1.  **LVS/云负载均衡 (LB)**：站在最前面，利用其极致的四层转发性能（MAC 转换）处理大规模并发，将流量导向 K8s 节点的 NodePort。
2.  **Ingress (Nginx/Envoy)**：处理七层的逻辑，如 SSL 卸载、路径路由、Rewrite 规则。

这种\*\*‘双层负载均衡’\*\*架构，既发挥了 LVS 的高吞吐，又利用了 Nginx 处理复杂业务逻辑的灵活性，这正是大型分布式系统的标准实践。”

---

### 总结

K8s 的资源隔离靠 **cgroups**，网络通信靠 **CNI（打通隧道）** 和 **Service（转发流量）**。

**梓涵，你既然熟悉 Kafka 和 MySQL，你想了解一下在 K8s 中如何通过 Headless Service 和 StatefulSet 来保证这些“有状态应用”的网络唯一性吗？这是从“只会用 K8s”到“能做中间件运维”的分水岭。**
