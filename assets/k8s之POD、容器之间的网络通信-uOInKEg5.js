import{n as e,r as t}from"./app-BoaHcSM-.js";import{t as n}from"./plugin-vue_export-helper-BBNlaSNf.js";var r=JSON.parse(`{"path":"/posts/%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E8%B7%B3%E5%8A%A8%E8%BF%90%E7%BB%B4%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88%E9%9D%A2%E8%AF%95%E5%87%86%E5%A4%87%E6%8C%87%E5%8D%97(%E9%80%82%E9%85%8D%E4%BD%A0%E7%9A%84%E7%AE%80%E5%8E%86%E8%83%8C%E6%99%AF)/K8s/k8s%E4%B9%8BPOD%E3%80%81%E5%AE%B9%E5%99%A8%E4%B9%8B%E9%97%B4%E7%9A%84%E7%BD%91%E7%BB%9C%E9%80%9A%E4%BF%A1.html","title":"k8s之POD、容器之间的网络通信","lang":"zh-CN","frontmatter":{"title":"k8s之POD、容器之间的网络通信","icon":"clipboard-text","date":"2026-07-23T00:00:00.000Z","category":["面试"],"description":"前言 Kubernetes(简称K8S)是开源的容器集群管理系统，可以实现容器集群的自动化部署、自动扩缩容、维护等功能。它既是一款容器编排工具，也是全新的基于容器技术的分布式架构领先方案。在Docker技术的基础上，为容器化的应用提供部署运行、资源调度、服务发现和动态伸缩等功能，提高了大规模容器集群管理的便捷性。 基础概念 Container Cont...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"k8s之POD、容器之间的网络通信\\",\\"image\\":[\\"https://venking.tech/blog/blog/assets/posts/k8s%E4%B9%8BPOD%E3%80%81%E5%AE%B9%E5%99%A8%E4%B9%8B%E9%97%B4%E7%9A%84%E7%BD%91%E7%BB%9C%E9%80%9A%E4%BF%A1-1.jpeg\\",\\"https://venking.tech/blog/blog/assets/posts/k8s%E4%B9%8BPOD%E3%80%81%E5%AE%B9%E5%99%A8%E4%B9%8B%E9%97%B4%E7%9A%84%E7%BD%91%E7%BB%9C%E9%80%9A%E4%BF%A1-2.jpeg\\",\\"https://venking.tech/blog/blog/assets/posts/k8s%E4%B9%8BPOD%E3%80%81%E5%AE%B9%E5%99%A8%E4%B9%8B%E9%97%B4%E7%9A%84%E7%BD%91%E7%BB%9C%E9%80%9A%E4%BF%A1-3.jpeg\\",\\"https://venking.tech/blog/blog/assets/posts/k8s%E4%B9%8BPOD%E3%80%81%E5%AE%B9%E5%99%A8%E4%B9%8B%E9%97%B4%E7%9A%84%E7%BD%91%E7%BB%9C%E9%80%9A%E4%BF%A1-4.jpeg\\",\\"https://venking.tech/blog/blog/assets/posts/k8s%E4%B9%8BPOD%E3%80%81%E5%AE%B9%E5%99%A8%E4%B9%8B%E9%97%B4%E7%9A%84%E7%BD%91%E7%BB%9C%E9%80%9A%E4%BF%A1-5.jpeg\\",\\"https://venking.tech/blog/blog/assets/posts/k8s%E4%B9%8BPOD%E3%80%81%E5%AE%B9%E5%99%A8%E4%B9%8B%E9%97%B4%E7%9A%84%E7%BD%91%E7%BB%9C%E9%80%9A%E4%BF%A1-6.jpeg\\"],\\"datePublished\\":\\"2026-07-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kinger\\",\\"url\\":\\"https://www.yuque.com/kinger-wwnro\\"}]}"],["meta",{"property":"og:url","content":"https://venking.tech/blog/posts/%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E9%9D%A2%E8%AF%95/%E5%AD%97%E8%8A%82%E8%B7%B3%E5%8A%A8%E8%BF%90%E7%BB%B4%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88%E9%9D%A2%E8%AF%95%E5%87%86%E5%A4%87%E6%8C%87%E5%8D%97(%E9%80%82%E9%85%8D%E4%BD%A0%E7%9A%84%E7%AE%80%E5%8E%86%E8%83%8C%E6%99%AF)/K8s/k8s%E4%B9%8BPOD%E3%80%81%E5%AE%B9%E5%99%A8%E4%B9%8B%E9%97%B4%E7%9A%84%E7%BD%91%E7%BB%9C%E9%80%9A%E4%BF%A1.html"}],["meta",{"property":"og:site_name","content":"Kinger 的技术博客"}],["meta",{"property":"og:title","content":"k8s之POD、容器之间的网络通信"}],["meta",{"property":"og:description","content":"前言 Kubernetes(简称K8S)是开源的容器集群管理系统，可以实现容器集群的自动化部署、自动扩缩容、维护等功能。它既是一款容器编排工具，也是全新的基于容器技术的分布式架构领先方案。在Docker技术的基础上，为容器化的应用提供部署运行、资源调度、服务发现和动态伸缩等功能，提高了大规模容器集群管理的便捷性。 基础概念 Container Cont..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://venking.tech/blog/blog/assets/posts/k8s%E4%B9%8BPOD%E3%80%81%E5%AE%B9%E5%99%A8%E4%B9%8B%E9%97%B4%E7%9A%84%E7%BD%91%E7%BB%9C%E9%80%9A%E4%BF%A1-1.jpeg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:published_time","content":"2026-07-23T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":5.97,"words":1792},"filePathRelative":"posts/面试/字节面试/字节跳动运维开发工程师面试准备指南(适配你的简历背景)/K8s/k8s之POD、容器之间的网络通信.md","excerpt":"<h2>前言</h2>\\n<p>Kubernetes(简称K8S)是开源的容器集群管理系统，可以实现容器集群的自动化部署、自动扩缩容、维护等功能。它既是一款容器编排工具，也是全新的基于容器技术的分布式架构领先方案。在Docker技术的基础上，为容器化的应用提供部署运行、资源调度、服务发现和动态伸缩等功能，提高了大规模容器集群管理的便捷性。</p>\\n<h2>基础概念</h2>\\n<h3>Container</h3>\\n<p>Container(容器)是一种便携式、轻量级的操作系统级虚拟化技术。它使用 NameSpace 隔离不同的软件运行环境，并通过镜像自包含软件的运行环境，从而使得容器可以很方便的在任何地方运行。由于容器体积小且启动快，因此可以在每个容器镜像中打包一个应用程序。一对一的关系</p>","autoDesc":true}`),i={name:`k8s之POD、容器之间的网络通信.md`},a=[`innerHTML`];function o(n,r,i,o,s,c){return t(),e(`div`,{class:`vp-migrated-content`,innerHTML:`<div><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言"><span>前言</span></a></h2>
<p>Kubernetes(简称K8S)是开源的容器集群管理系统，可以实现容器集群的自动化部署、自动扩缩容、维护等功能。它既是一款容器编排工具，也是全新的基于容器技术的分布式架构领先方案。在Docker技术的基础上，为容器化的应用提供部署运行、资源调度、服务发现和动态伸缩等功能，提高了大规模容器集群管理的便捷性。</p>
<h2 id="基础概念" tabindex="-1"><a class="header-anchor" href="#基础概念"><span>基础概念</span></a></h2>
<h3 id="container" tabindex="-1"><a class="header-anchor" href="#container"><span>Container</span></a></h3>
<p>Container(容器)是一种便携式、轻量级的操作系统级虚拟化技术。它使用 NameSpace 隔离不同的软件运行环境，并通过镜像自包含软件的运行环境，从而使得容器可以很方便的在任何地方运行。由于容器体积小且启动快，因此可以在每个容器镜像中打包一个应用程序。一对一的关系</p>
<h3 id="pod" tabindex="-1"><a class="header-anchor" href="#pod"><span>POD</span></a></h3>
<p>Kubernetes 使用 Pod 来管理容器，每个 Pod 可以包含一个或多个紧密关联的容器。一对多的关系</p>
<p>​</p>
<figure><img src="/blog/assets/posts/k8s%E4%B9%8BPOD%E3%80%81%E5%AE%B9%E5%99%A8%E4%B9%8B%E9%97%B4%E7%9A%84%E7%BD%91%E7%BB%9C%E9%80%9A%E4%BF%A1-1.jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>​</p>
<h3 id="node" tabindex="-1"><a class="header-anchor" href="#node"><span>Node</span></a></h3>
<p>Node 是 Pod 真正运行的主机，可以是物理机，也可以是虚拟机，也称为宿主机。为了管理 Pod，每个 Node 节点上至少要运行docker 、kubelet 服务。</p>
<p>​</p>
<figure><img src="/blog/assets/posts/k8s%E4%B9%8BPOD%E3%80%81%E5%AE%B9%E5%99%A8%E4%B9%8B%E9%97%B4%E7%9A%84%E7%BD%91%E7%BB%9C%E9%80%9A%E4%BF%A1-2.jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>​</p>
<h3 id="namespace" tabindex="-1"><a class="header-anchor" href="#namespace"><span>Namespace</span></a></h3>
<p>Namespace 是对一组资源和对象的抽象集合，比如可以用来将系统内部的对象划分为不同的项目组或用户组。常见的 pods, services, replication controllers 和 deployments 等都是属于某一个 namespace 的(默认是 default)，而 node, persistentVolumes 等则不属于任何 namespace</p>
<h3 id="service" tabindex="-1"><a class="header-anchor" href="#service"><span>Service</span></a></h3>
<p>Service 是应用服务的抽象，通过 labels 为应用提供负载均衡和服务发现。匹配 labels 的 Pod IP 和端口列表组成 endpoints，由 kube-proxy 负责将服务 IP 负载均衡到这些 endpoints 上</p>
<h2 id="网络通讯方式" tabindex="-1"><a class="header-anchor" href="#网络通讯方式"><span>网络通讯方式</span></a></h2>
<p>了解了上面的基本概念后，我们考虑一下K8s集群中docker容器之间是如何通讯的?我们这里需要区分一下不同的场景</p>
<p>（1)<strong>在同一个POD上Container通信</strong></p>
<p>​</p>
<p>（2)<strong>同一个Node,不同POD</strong></p>
<p>​</p>
<p>（3)<strong>不同Node，不同POD</strong></p>
<p>我们先来看看上面的不同场景是怎么通信的</p>
<h3 id="同一个pod上container通信" tabindex="-1"><a class="header-anchor" href="#同一个pod上container通信"><span>同一个POD上Container通信</span></a></h3>
<p>在k8s中每个Pod中管理着一组Docker容器，这些Docker容器共享同一个网络命名空间，Pod中的每个Docker容器拥有与Pod相同的IP和port地址空间，并且由于他们在同一个网络命名空间，他们之间可以通过localhost相互访问。</p>
<p>什么机制让同一个Pod内的多个docker容器相互通信?就是使用Docker的一种网络模型：–net=container</p>
<p>container模式指定新创建的Docker容器和已经存在的一个容器共享一个网络命名空间，而不是和宿主机共享。新创建的Docker容器不会创建自己的网卡，配置自己的 IP，而是和一个指定的容器共享 IP、端口范围等</p>
<p>在k8s中每个Pod容器有一个pause容器有独立的网络命名空间，在Pod内启动Docker容器时候使用 –net=container就可以让当前Docker容器加入到Pod容器拥有的网络命名空间(pause容器)</p>
<p>​</p>
<figure><img src="/blog/assets/posts/k8s%E4%B9%8BPOD%E3%80%81%E5%AE%B9%E5%99%A8%E4%B9%8B%E9%97%B4%E7%9A%84%E7%BD%91%E7%BB%9C%E9%80%9A%E4%BF%A1-3.jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>​</p>
<p>这里就是为什么k8s在调度pod时，尽量把关系紧密的服务放到一个pod中，这样网络的请求耗时就可以忽略，因为容器之间通信共享了网络空间，就像local本地通信一样。</p>
<h3 id="同一个node-不同pod" tabindex="-1"><a class="header-anchor" href="#同一个node-不同pod"><span>同一个Node，不同Pod</span></a></h3>
<p>​</p>
<figure><img src="/blog/assets/posts/k8s%E4%B9%8BPOD%E3%80%81%E5%AE%B9%E5%99%A8%E4%B9%8B%E9%97%B4%E7%9A%84%E7%BD%91%E7%BB%9C%E9%80%9A%E4%BF%A1-4.jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>​</p>
<p>​</p>
<figure><img src="/blog/assets/posts/k8s%E4%B9%8BPOD%E3%80%81%E5%AE%B9%E5%99%A8%E4%B9%8B%E9%97%B4%E7%9A%84%E7%BD%91%E7%BB%9C%E9%80%9A%E4%BF%A1-5.jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>​</p>
<p>上图就是同一个node，不同pod之间的通信，就是使用linux虚拟以太网设备或者说是由两个虚拟接口组成的veth对使不同的网络命名空间链接起来，这些虚拟接口分布在多个网络命名空间上(这里是指多个Pod上)。</p>
<p>通过网桥把veth0和veth1组成为一个以太网，他们直接是可以直接通信的，另外这里通过veth对让pod1的eth0和veth0、pod2的eth0和veth1关联起来，从而让pod1和pod2相互通信。</p>
<h3 id="不同node-不同pod" tabindex="-1"><a class="header-anchor" href="#不同node-不同pod"><span>不同Node，不同Pod</span></a></h3>
<p>​</p>
<figure><img src="/blog/assets/posts/k8s%E4%B9%8BPOD%E3%80%81%E5%AE%B9%E5%99%A8%E4%B9%8B%E9%97%B4%E7%9A%84%E7%BD%91%E7%BB%9C%E9%80%9A%E4%BF%A1-6.jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>​</p>
<p>上图就是不同node之间的pod通信，Node1中的Pod1如何和Node2的Pod4进行通信的，我们来看看具体流程：</p>
<p>（1)首先pod1通过自己的以太网设备eth0把数据包发送到关联到root命名空间的veth0上</p>
<p>​</p>
<p>（2)然后数据包被Node1上的网桥设备接受到，网桥查找转发表发现找不到pod4的Mac地址，则会把包转发到默认路由(root命名空间的eth0设备)</p>
<p>​</p>
<p>（3)然后数据包经过eth0就离开了Node1，被发送到网络。</p>
<p>​</p>
<p>（4)数据包到达Node2后，首先会被root命名空间的eth0设备</p>
<p>​</p>
<p>（5)然后通过网桥把数据路由到虚拟设备veth1,最终数据表会被流转到与veth1配对的另外一端(pod4的eth0)</p>
<p>每个Node都知道如何把数据包转发到其内部运行的Pod，当一个数据包到达Node后，其内部数据流就和Node内Pod之间的流转类似了</p>
<p>​</p>
<p>补充说明：对于如何来配置网络，k8s在网络这块自身并没有实现网络规划的具体逻辑，而是制定了一套CNI(Container Network Interface)接口规范，开放给社区来实现。Flannel就是k8s中比较出名的一个。</p>
<h3 id="flannel" tabindex="-1"><a class="header-anchor" href="#flannel"><span>flannel</span></a></h3>
<p>flannel组建一个大二层扁平网络，pod的ip分配由flannel统一分配，通讯过程也是走flannel的网桥。</p>
<p>每个node上面都会创建一个flannel0虚拟网卡，用于跨node之间通讯。所以容器直接可以直接使用pod id进行通讯。</p>
<p>跨节点通讯时，发送端数据会从docker0路由到flannel0虚拟网卡，接收端数据会从flannel0路由到docker0。</p>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2>
<p>​</p>
<p>上面老顾介绍了几种网络通信的场景，以及他们的通信流程，k8s的网络通信远远不止这些，还有很重要的集群外如何访问集群内部?以及Service访问是用来做什么的?</p>
</div>`},null,8,a)}var s=n(i,[[`render`,o]]);export{r as _pageData,s as default};