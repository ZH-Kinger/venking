---
title: "k8s之POD、容器之间的网络通信"
date: 2026-07-23
category: "面试"
---
## 前言

Kubernetes(简称K8S)是开源的容器集群管理系统，可以实现容器集群的自动化部署、自动扩缩容、维护等功能。它既是一款容器编排工具，也是全新的基于容器技术的分布式架构领先方案。在Docker技术的基础上，为容器化的应用提供部署运行、资源调度、服务发现和动态伸缩等功能，提高了大规模容器集群管理的便捷性。

## 基础概念

### Container

Container(容器)是一种便携式、轻量级的操作系统级虚拟化技术。它使用 NameSpace 隔离不同的软件运行环境，并通过镜像自包含软件的运行环境，从而使得容器可以很方便的在任何地方运行。由于容器体积小且启动快，因此可以在每个容器镜像中打包一个应用程序。一对一的关系

### POD

Kubernetes 使用 Pod 来管理容器，每个 Pod 可以包含一个或多个紧密关联的容器。一对多的关系

​  

![](assets/k8s%E4%B9%8BPOD%E3%80%81%E5%AE%B9%E5%99%A8%E4%B9%8B%E9%97%B4%E7%9A%84%E7%BD%91%E7%BB%9C%E9%80%9A%E4%BF%A1-1.jpeg)

​  

### Node

Node 是 Pod 真正运行的主机，可以是物理机，也可以是虚拟机，也称为宿主机。为了管理 Pod，每个 Node 节点上至少要运行docker 、kubelet 服务。

​  

![](assets/k8s%E4%B9%8BPOD%E3%80%81%E5%AE%B9%E5%99%A8%E4%B9%8B%E9%97%B4%E7%9A%84%E7%BD%91%E7%BB%9C%E9%80%9A%E4%BF%A1-2.jpeg)

​  

### Namespace

Namespace 是对一组资源和对象的抽象集合，比如可以用来将系统内部的对象划分为不同的项目组或用户组。常见的 pods, services, replication controllers 和 deployments 等都是属于某一个 namespace 的(默认是 default)，而 node, persistentVolumes 等则不属于任何 namespace

### Service

Service 是应用服务的抽象，通过 labels 为应用提供负载均衡和服务发现。匹配 labels 的 Pod IP 和端口列表组成 endpoints，由 kube-proxy 负责将服务 IP 负载均衡到这些 endpoints 上

## 网络通讯方式

了解了上面的基本概念后，我们考虑一下K8s集群中docker容器之间是如何通讯的?我们这里需要区分一下不同的场景

（1)**在同一个POD上Container通信**

​  

（2)**同一个Node,不同POD**

​  

（3)**不同Node，不同POD**

我们先来看看上面的不同场景是怎么通信的

### 同一个POD上Container通信

在k8s中每个Pod中管理着一组Docker容器，这些Docker容器共享同一个网络命名空间，Pod中的每个Docker容器拥有与Pod相同的IP和port地址空间，并且由于他们在同一个网络命名空间，他们之间可以通过localhost相互访问。

什么机制让同一个Pod内的多个docker容器相互通信?就是使用Docker的一种网络模型：–net=container

container模式指定新创建的Docker容器和已经存在的一个容器共享一个网络命名空间，而不是和宿主机共享。新创建的Docker容器不会创建自己的网卡，配置自己的 IP，而是和一个指定的容器共享 IP、端口范围等

在k8s中每个Pod容器有一个pause容器有独立的网络命名空间，在Pod内启动Docker容器时候使用 –net=container就可以让当前Docker容器加入到Pod容器拥有的网络命名空间(pause容器)

​  

![](assets/k8s%E4%B9%8BPOD%E3%80%81%E5%AE%B9%E5%99%A8%E4%B9%8B%E9%97%B4%E7%9A%84%E7%BD%91%E7%BB%9C%E9%80%9A%E4%BF%A1-3.jpeg)

​  

这里就是为什么k8s在调度pod时，尽量把关系紧密的服务放到一个pod中，这样网络的请求耗时就可以忽略，因为容器之间通信共享了网络空间，就像local本地通信一样。

### 同一个Node，不同Pod

​  

![](assets/k8s%E4%B9%8BPOD%E3%80%81%E5%AE%B9%E5%99%A8%E4%B9%8B%E9%97%B4%E7%9A%84%E7%BD%91%E7%BB%9C%E9%80%9A%E4%BF%A1-4.jpeg)

​  

​  

![](assets/k8s%E4%B9%8BPOD%E3%80%81%E5%AE%B9%E5%99%A8%E4%B9%8B%E9%97%B4%E7%9A%84%E7%BD%91%E7%BB%9C%E9%80%9A%E4%BF%A1-5.jpeg)

​  

上图就是同一个node，不同pod之间的通信，就是使用linux虚拟以太网设备或者说是由两个虚拟接口组成的veth对使不同的网络命名空间链接起来，这些虚拟接口分布在多个网络命名空间上(这里是指多个Pod上)。

通过网桥把veth0和veth1组成为一个以太网，他们直接是可以直接通信的，另外这里通过veth对让pod1的eth0和veth0、pod2的eth0和veth1关联起来，从而让pod1和pod2相互通信。

### 不同Node，不同Pod

​  

![](assets/k8s%E4%B9%8BPOD%E3%80%81%E5%AE%B9%E5%99%A8%E4%B9%8B%E9%97%B4%E7%9A%84%E7%BD%91%E7%BB%9C%E9%80%9A%E4%BF%A1-6.jpeg)

​  

上图就是不同node之间的pod通信，Node1中的Pod1如何和Node2的Pod4进行通信的，我们来看看具体流程：

（1)首先pod1通过自己的以太网设备eth0把数据包发送到关联到root命名空间的veth0上

​  

（2)然后数据包被Node1上的网桥设备接受到，网桥查找转发表发现找不到pod4的Mac地址，则会把包转发到默认路由(root命名空间的eth0设备)

​  

（3)然后数据包经过eth0就离开了Node1，被发送到网络。

​  

（4)数据包到达Node2后，首先会被root命名空间的eth0设备

​  

（5)然后通过网桥把数据路由到虚拟设备veth1,最终数据表会被流转到与veth1配对的另外一端(pod4的eth0)

每个Node都知道如何把数据包转发到其内部运行的Pod，当一个数据包到达Node后，其内部数据流就和Node内Pod之间的流转类似了

​  

补充说明：对于如何来配置网络，k8s在网络这块自身并没有实现网络规划的具体逻辑，而是制定了一套CNI(Container Network Interface)接口规范，开放给社区来实现。Flannel就是k8s中比较出名的一个。

### flannel

flannel组建一个大二层扁平网络，pod的ip分配由flannel统一分配，通讯过程也是走flannel的网桥。

每个node上面都会创建一个flannel0虚拟网卡，用于跨node之间通讯。所以容器直接可以直接使用pod id进行通讯。

跨节点通讯时，发送端数据会从docker0路由到flannel0虚拟网卡，接收端数据会从flannel0路由到docker0。

## 总结

​  

上面老顾介绍了几种网络通信的场景，以及他们的通信流程，k8s的网络通信远远不止这些，还有很重要的集群外如何访问集群内部?以及Service访问是用来做什么的?
