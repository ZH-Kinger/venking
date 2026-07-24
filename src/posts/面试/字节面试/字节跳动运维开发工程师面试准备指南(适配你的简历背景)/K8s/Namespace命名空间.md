---
title: "Namespace命名空间"
icon: clipboard-text
date: 2026-07-23
category:
  - 面试
---
## Namespace是什么？

在 Kubernetes 中，*命名空间*提供了一种机制，用于隔离单个集群内的资源组。资源名称在同一个命名空间内必须唯一，但在不同的命名空间之间则不必相同。基于命名空间的机制仅适用于命名空间。[对象](https://kubernetes.io/docs/concepts/overview/working-with-objects/#kubernetes-objects) *（例如部署、服务等）*，而不是集群范围的对象*（例如存储类、节点、持久卷等）*。

## 何时使用多个命名空间

命名空间适用于用户众多、分散在多个团队或项目中的环境。对于只有几到几十个用户的集群，您完全不需要创建或考虑命名空间。只有在需要命名空间提供的功能时才开始使用它们。

命名空间为名称提供作用域。资源名称在同一个命名空间内必须唯一，但在不同的命名空间之间不必唯一。命名空间不能相互嵌套，每个 Kubernetes 资源只能位于一个命名空间中。

命名空间是一种在多个用户之间划分集群资源（通过[资源配额](https://kubernetes.io/docs/concepts/policy/resource-quotas/)）的方法。

无需使用多个命名空间来区分略有不同的资源，例如同一软件的不同版本：使用 [标签](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels)用于区分同一命名空间内的资源。

#### 笔记：

**对于生产集群，请考虑*****不要*****使用该**`**default**`**命名空间。而是创建其他命名空间并使用这些命名空间。**

## 初始命名空间

Kubernetes 最初有四个命名空间：

`**default**`

Kubernetes 包含了这个命名空间，这样您就可以直接使用新的集群，而无需先创建命名空间。

`**kube-node-lease**`

此命名空间保存与每个节点关联的[租约](https://kubernetes.io/docs/concepts/architecture/leases/)对象。节点租约允许 kubelet 发送[心跳信号](https://kubernetes.io/docs/concepts/architecture/nodes/#node-heartbeats)，以便控制平面能够检测到节点故障。

`**kube-public**`

*所有*客户端（包括未认证客户端）均可读取此命名空间。此命名空间主要用于集群环境，例如某些资源需要在整个集群中公开可见和可读时。此命名空间的公开性仅是一种约定，并非强制要求。

`**kube-system**`

Kubernetes 系统创建的对象的命名空间。

## 使用命名空间

命名空间的创建和删除在 [命名空间管理指南文档](https://kubernetes.io/docs/tasks/administer-cluster/namespaces/)中有详细说明。

#### 笔记：

**避免创建带有前缀的命名空间**`**kube-**`**，因为该前缀保留给 Kubernetes 系统命名空间。**

### 查看命名空间

您可以使用以下命令列出集群中的当前命名空间：

```shell
kubectl get namespace
```
```plain
NAME              STATUS   AGE
default           Active   1d
kube-node-lease   Active   1d
kube-public       Active   1d
kube-system       Active   1d
```

### 为请求设置命名空间

要为当前请求设置命名空间，请使用该`--namespace`标志。

例如：

```shell
kubectl run nginx --image=nginx --namespace=<insert-namespace-name-here>
kubectl get pods --namespace=<insert-namespace-name-here>
```

### 设置命名空间首选项

您可以永久保存命名空间，以便在该上下文中对所有后续的 kubectl 命令使用。

```shell
kubectl config set-context --current --namespace=<insert-namespace-name-here>
# Validate it
kubectl config view --minify | grep namespace:
```

## 命名空间和 DNS

创建[服务](https://kubernetes.io/docs/concepts/services-networking/service/)时，系统会创建一个相应的[DNS 条目](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/)。该条目的格式为 \`<service\_name>.example.com\` `<service-name>.<namespace-name>.svc.cluster.local`，这意味着如果容器仅使用 \` `<service-name>`<service\_name>.example.com\`，则会解析到位于特定命名空间内的本地服务。这对于在多个命名空间（例如开发、测试和生产）中使用相同的配置非常有用。如果要跨命名空间访问服务，则需要使用完全限定域名 (FQDN)。

因此，所有命名空间名称都必须是有效的 [RFC 1123 DNS 标签](https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#dns-label-names)。

#### 警告：

[**通过创建与公共顶级域名**](https://data.iana.org/TLD/tlds-alpha-by-domain.txt)**同名的命名空间****，这些命名空间中的服务可以拥有与公共 DNS 记录重叠的简短 DNS 名称。任何命名空间中执行 DNS 查询且名称**[**末尾不带点号**](https://datatracker.ietf.org/doc/html/rfc1034#page-8)**的工作负载都将被重定向到这些服务，其优先级高于公共 DNS。**

**为缓解此问题，请将创建命名空间的权限限制在受信任的用户范围内。如有必要，您还可以配置第三方安全控制措施（例如**[**准入 Webhook） ，以阻止创建任何以**](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/)[**公共顶级域名**](https://data.iana.org/TLD/tlds-alpha-by-domain.txt)**命名的命名空间****。**

## 并非所有对象都位于命名空间中。

大多数 Kubernetes 资源（例如 Pod、Service、Replication Controller 等）都位于某个命名空间中。但是，命名空间资源本身并不位于任何命名空间中。而底层资源，例如 [节点](https://kubernetes.io/docs/concepts/architecture/nodes/)和 [持久卷](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)，则不属于任何命名空间。

要查看哪些 Kubernetes 资源位于命名空间中，哪些不位于命名空间中：

```shell
# In a namespace
kubectl api-resources --namespaced=true

# Not in a namespace
kubectl api-resources --namespaced=false
```

## 自动贴标

**特征状态：** `Kubernetes 1.22 [stable]`

Kubernetes 控制平面设置了一个不可变的[标签](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels) `kubernetes.io/metadata.name`适用于所有命名空间。标签的值即为命名空间名称。
