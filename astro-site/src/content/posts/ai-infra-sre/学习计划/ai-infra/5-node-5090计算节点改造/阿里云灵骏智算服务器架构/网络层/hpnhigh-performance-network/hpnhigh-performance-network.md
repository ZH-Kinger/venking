---
title: "HPN(High_Performance_Network)"
date: 2026-07-23
category: "AI 基础设施"
---
## 1. 摘要

  
本文介绍了阿里云的[大型语言模型](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=1&q=%E5%A4%A7%E5%9E%8B%E8%AF%AD%E8%A8%80%E6%A8%A1%E5%9E%8B&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiLlpKflnovor63oqIDmqKHlnosiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDQ4ODIwNDcsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.sgmMWKOwV86UWyD8xE7pyH2zp_24P2XVuCSK-IITdOU&zhida_source=entity)（LLM）训练数据中心网络HPN。主流的LLM训练在每个主机上会产生少量周期性突发流量（如400Gbps）。这种LLM训练的特性使得在传统数据中心常用的负载均衡方案等价多路径（[ECMP](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=1&q=ECMP&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiJFQ01QIiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MjQ0ODgyMDQ3LCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.w5jTXq3r_eTk54s077ieKCgNbv1LG-K33Qo6-3jpT6o&zhida_source=entity)）容易出现[哈希极化](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=1&q=%E5%93%88%E5%B8%8C%E6%9E%81%E5%8C%96&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiLlk4jluIzmnoHljJYiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDQ4ODIwNDcsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.6vmh7BcbAmNlbe4WFTh-8tqpmQt4iAXYDFd5_a2WabY&zhida_source=entity)，导致流量分布不均。HPN引入了一种双平面2层架构，能够在一个Pod中连接15K个GPU。新的[架构设计](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=1&q=%E6%9E%B6%E6%9E%84%E8%AE%BE%E8%AE%A1&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiLmnrbmnoTorr7orqEiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDQ4ODIwNDcsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.POXPHdrHaqShptEEq2NTMLcT5CN8S4P7l69u6Nw7Gqs&zhida_source=entity)不仅通过减少ECMP的出现避免了哈希极化，还大大缩小了路径选择的搜索空间，能够承载更大流量。同时HPN提出了一种新的双ToR设计，有效解决发生在[ToR交换机](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=1&q=ToR%E4%BA%A4%E6%8D%A2%E6%9C%BA&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiJUb1LkuqTmjaLmnLoiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDQ4ODIwNDcsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.1WjYf2PCLrRArU_YO_CywqxaeN_ao28indAI6OLkaSs&zhida_source=entity)的故障，维护了生产环境稳定性。

## 2. 背景介绍

大型语言模型（LLM）为当今的人工智能和云服务带来了巨大革命。拥有数千亿参数的LLM训练依赖于大规模分布式训练集群，通常配备数千万个GPU。由于其独特的特性，LLM训练对数据中心网络的设计提出了新的挑战。

- 问题1：[流量模式](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=1&q=%E6%B5%81%E9%87%8F%E6%A8%A1%E5%BC%8F&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiLmtYHph4_mqKHlvI8iLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDQ4ODIwNDcsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.Vx7leWzabZEG1g3h_v8Zyom7qbkVmcoqzseixi1dU9o&zhida_source=entity)

LLM训练的流量模式与普通云计算在以下方面有所不同：**(1) 低熵和(2) 突发流量**。

![](https://pic2.zhimg.com/v2-12b5e55f5b8f734cee964c35593c45f1_1440w.jpg)

具体来说，普通云计算生成数百万个流量，这使得网络具有高熵。每个流量是连续且低利用率的（例如，通常低于[网卡](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=1&q=%E7%BD%91%E5%8D%A1&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiLnvZHljaEiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDQ4ODIwNDcsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.DmVqkZrldcqjNgRugQZGLCz37iX4pO5hCk1fFmdcy4c&zhida_source=entity)容量的20%），如图1所示。相反，LLM训练生成很少但周期性突发的流量，导致网络的低熵和高利用率。突发流量可以直接达到网卡容量，在作者的生产集群中为400Gbps（如图2所示）。

![](https://pic3.zhimg.com/v2-185baa07a3c0b465939089f51465788a_1440w.jpg)

这种流量模式削弱了广泛部署在作者传统数据中心网络中的等价多路径（ECMP）负载均衡方案。由于ECMP使用[哈希算法](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=1&q=%E5%93%88%E5%B8%8C%E7%AE%97%E6%B3%95&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiLlk4jluIznrpfms5UiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDQ4ODIwNDcsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.ZlGzSKM9I3GRIz7-T48MHyWB-zFHEls8hJl8bjnd6WU&zhida_source=entity)将流量均匀分配到所有等效路径上，可以在具有高熵和低利用率流量模式（即传统数据中心网络）的网络中很好地工作，但在LLM训练的情况下则不然。由于传统数据中心网络的三层架构特性，大流量的转发会经过三次哈希（即ToR、汇聚层和核心层）。由于每次哈希的输入（即流量的[五元组](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=1&q=%E4%BA%94%E5%85%83%E7%BB%84&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiLkupTlhYPnu4QiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDQ4ODIwNDcsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.zUM2uTqIqK8MEcXWBLEpwTA-P-Y-4zMwI4CLOvglyzY&zhida_source=entity)）保持不变，这种“级联”哈希的效果可能导致更严重的负载不平衡（即哈希极化）。

同时，突发的高流量意味着LLM训练需要极高的[网络带宽](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=1&q=%E7%BD%91%E7%BB%9C%E5%B8%A6%E5%AE%BD&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiLnvZHnu5zluKblrr0iLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDQ4ODIwNDcsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.ONO_uMiMykQgn618ceiCCEGikr5eC_mb3Wn3PoRflkI&zhida_source=entity)。因此，需要确保用于LLM训练的网络能够提供足够的物理带宽以应对突发流量，避免数据包丢失。此外，流量的同步性表明LLM训练对长尾延迟特别敏感。任何长尾流都会阻碍整个[集合通信](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=1&q=%E9%9B%86%E5%90%88%E9%80%9A%E4%BF%A1&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiLpm4blkIjpgJrkv6EiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDQ4ODIwNDcsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.wgSMgHrTjZXSydJZFq6nwNUsALM2wZTi3sTMIsfcmfM&zhida_source=entity)操作的完成，使所有[并行组](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=1&q=%E5%B9%B6%E8%A1%8C%E7%BB%84&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiLlubbooYznu4QiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDQ4ODIwNDcsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.IFknDGjxnPwSwk_0JKjINKwdAzQbNhT2iVd-DlgRWxA&zhida_source=entity)暂停。

- 问题2：对故障的更高敏感性，特别是[单点故障](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=1&q=%E5%8D%95%E7%82%B9%E6%95%85%E9%9A%9C&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiLljZXngrnmlYXpmpwiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDQ4ODIwNDcsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.jrdGlrkwGGaWtt_lgFdHtqGpzmYu7qX2-QU_xdodkYo&zhida_source=entity)

LLM训练是一个同步过程，所有GPU协同完成一系列迭代；因此，任何GPU中的异常都可能延迟或崩溃整个训练过程。这意味着LLM训练对故障比传统云计算更为敏感。作者发现，对LLM训练影响最大的故障是机架顶部交换机（ToR）相关的单点故障，这可能影响大量的GPU。此外，LLM训练中的故障成本很高。作者的生产统计数据显示，LLM训练中的故障成本是普通云计算故障成本的20倍。

![](https://pica.zhimg.com/v2-c81346f751f5a25bbbe231911d64ccea_1440w.jpg)

在阿里的集群中，如图5所示，每月有0.057%的NIC-ToR链路发生故障，大约0.051%的ToR交换机遇到关键错误并崩溃。在这种高故障率下，每个LLM训练任务每月会遇到1-2次崩溃。此外，每天有5K-60K次链路抖动案例，导致暂时的性能下降。

## 3. HPN架构概述

作者设计并建立了HPN，一个专门用于LLM训练的新型数据中心网络。图7展示了HPN的概述。

![](https://pica.zhimg.com/v2-a38d078abdf4ebaf77db6224c571d18e_1440w.jpg)

**图7: 1个segment支持1,024+64 GPUs，1个[pod](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=1&q=pod&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiJwb2QiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDQ4ODIwNDcsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.FW6pHnTFyokRrtNV52olbBu_7_bO2BXvLPw5aAgjvhY&zhida_source=entity)支持15,360 GPUs，全量支持245,760 GPUs。**

HPN包括前端网络和后端网络。后端网络主要支持训练过程中的流量，而[前端网络](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=2&q=%E5%89%8D%E7%AB%AF%E7%BD%91%E7%BB%9C&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiLliY3nq6_nvZHnu5wiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDQ4ODIwNDcsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MiwiemRfdG9rZW4iOm51bGx9.MQ9o5qzUBzKQCphaTcwI5xqOovTaePG-QsXfj5J2mdU&zhida_source=entity)则承载其他流量（如管理、推理和存储的流量）。对于LLM训练，主要关注HPN的后端网络。

在HPN的后端网络中，每个主机配备8个GPU，每个GPU通过专用的高带宽内部主机网络（例如[NVLINK](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=1&q=NVLINK&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiJOVkxJTksiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDQ4ODIwNDcsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.3TS7v-FLR1GqO19ksnoFVbtKTRqN0ZzHWRHKgljl010&zhida_source=entity)）连接。每个GPU可以通过这个内部主机网络直接与其他GPU通信，速率为每个方向400GBps至900GBps。

为了提供最大的网络容量，每个主机配备了9个NIC，每个NIC有2×200Gbps的带宽。这九个NIC中的一个（即图7中的NIC0）连接到前端网络，而其余8个NIC连接到后端网络，在LLM训练期间承载流量。这8个NIC中的每一个为一个专用的GPU（称为rail），因此每个GPU拥有专用的400Gbps的RDMA[网络吞吐量](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=1&q=%E7%BD%91%E7%BB%9C%E5%90%9E%E5%90%90%E9%87%8F&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiLnvZHnu5zlkJ7lkJDph48iLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDQ4ODIwNDcsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.CDJ6jJKRh8AR6N1aW-60Vw9_YaqRftFAyuPEqSJmPyM&zhida_source=entity)，总带宽为3.2Tbps。这样的设计旨在最大化利用GPU的PCIe能力（PCIe Gen5×16），从而将网络发送/接收容量推向极限。每个NIC的两个端口分别连接到不同的ToR，形成双ToR设计。这种双ToR设计旨在避免单ToR故障问题。

Tier1中，鉴于内部主机网络（如NVLINK）的容量高于主机间[以太网网络](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=1&q=%E4%BB%A5%E5%A4%AA%E7%BD%91%E7%BD%91%E7%BB%9C&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiLku6XlpKrnvZHnvZHnu5wiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDQ4ODIwNDcsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.u33qf_6X2Ql_HAN15dfzSVN-P9Z_EN-195lMuiuFlaI&zhida_source=entity)，作者采用了rail-optimized设计，其中属于不同rail的NIC连接到不同组ToR。结合上述的双ToR设计，一个主机在后端网络连接到16个ToR。通过充分利用51.2Tbps交换芯片的能力，HPN使得1024个GPU可以通过单层网络（称为segment）互联。约96.3%的生产中LLM训练作业使用不到1K个GPU；因此，在HPN中，这些作业可以放置在一个[segment](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=3&q=segment&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiJzZWdtZW50IiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MjQ0ODgyMDQ3LCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjMsInpkX3Rva2VuIjpudWxsfQ.3pvsPRjjALxdK-2kyHWcPtWp6jed4N-IDfkQQW7ar4g&zhida_source=entity)中，实现最大的网络性能。

Tier2连接多个segments。作者在这一层次引入了双ToR特性，设计了双平面转发（如图7所示）。从源NIC的端口0发送的流量可以通过网络转发，最终只由目标NIC的端口0接收，物理上与来自源NIC端口1的流量隔离。这种双[平面设计](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=1&q=%E5%B9%B3%E9%9D%A2%E8%AE%BE%E8%AE%A1&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiLlubPpnaLorr7orqEiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDQ4ODIwNDcsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.xB8X8OBvpvwZbRik5q9u85qx4ZZw1YaeUe2znwDOqLA&zhida_source=entity)避免了在Aggregation层的哈希极化问题，同时不影响1:1的网络二分带宽。此外，双平面设计还将每个Pod覆盖的GPU数量加倍，支持15K GPU的互联。

对于未来可能需要单个作业规模更大的情况，作者还设计了Core层之间的连接，连接不同的Pods。由于单个Pod的规模已经达到15K GPU，需要通过Core层进行协调的作业是罕见的。在作者的设计中，作者选择在Aggregation-Core层进行15:1的[收敛比](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=1&q=%E6%94%B6%E6%95%9B%E6%AF%94&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiLmlLbmlZvmr5QiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDQ4ODIwNDcsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.qMeuVK4QohKYi63QHeV42mDh-5SeGuYQqiWcJHMt8Hk&zhida_source=entity)。根据LLM训练的[流量特性](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=1&q=%E6%B5%81%E9%87%8F%E7%89%B9%E6%80%A7&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiLmtYHph4_nibnmgKciLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDQ4ODIwNDcsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.fQRGm1UH7R34imK_8t3FM-XTIUFXAEyIYuvb7Lroclg&zhida_source=entity)，作者将PP通信分配给跨Pods，确保跨Pod传输对端到端训练性能的最小影响。

对于前端网络，主要用于承载管理、推理和存储的流量。前端和后端网络的物理分离确保前端流量不影响训练作业的主要过程。此外，前端网络设计为1:1的收敛比，使其能够扩展到更多的场景，如LLM训练和推理的混合部署。

## 4. Access: 非堆叠双ToR

在传统的数据中心网络中，每个NIC的两个端口通过一根连接到ToR交换机的电缆/光纤聚合，称为单ToR设计**（如[字节跳动](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=1&q=%E5%AD%97%E8%8A%82%E8%B7%B3%E5%8A%A8&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiLlrZfoioLot7PliqgiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDQ4ODIwNDcsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.9QERB57q8TjxKn8o7ZgbUUbr5-wMzrzvgMHhhFUI2gk&zhida_source=entity)的MegaScale提到的方案）**。然而，单ToR设计容易受到交换机/链路故障的影响，严重影响LLM训练。

相反，双ToR设计将每个NIC的两个端口以主动-主动方式连接到不同的ToR。这两个端口配置相同的IP和MAC地址。如果一个ToR（或一个端口）出现故障，另一个仍然可以工作。此外，由于同一NIC中的两个端口共享相同的队列对（QP）上下文，流量的切换不会导致活动流的中断，并且对上层应用程序是透明的。图8a展示了一个典型的双ToR设计，称为堆叠双ToR，这种设计已经通过诸如虚拟端口通道（vPC）、[多链路聚合](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=1&q=%E5%A4%9A%E9%93%BE%E8%B7%AF%E8%81%9A%E5%90%88&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiLlpJrpk77ot6_ogZrlkIgiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDQ4ODIwNDcsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9._fHQcO5sEJ53om0lsQZtcJvKae_D0hPMOb_95ikcejI&zhida_source=entity)（M-LAG）和堆叠等商品化解决方案实现。在堆叠双ToR中，两个ToR通过直接链接连接，这是用于同步数据平面转发信息（如ARP和MAC）的重要设计。主机使用[链路聚合控制协议](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=1&q=%E9%93%BE%E8%B7%AF%E8%81%9A%E5%90%88%E6%8E%A7%E5%88%B6%E5%8D%8F%E8%AE%AE&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiLpk77ot6_ogZrlkIjmjqfliLbljY_orq4iLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDQ4ODIwNDcsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.WG30UOCWz0U9pLbxppOepxkH-TO2y54JxPE8CNUw3XI&zhida_source=entity)（LACP）将两个ToR聚合为一个。原则上，堆叠双ToR解决方案可以显著减少独立ToR交换机故障造成的性能降级，这在生产中非常普遍。

![](https://pic2.zhimg.com/v2-f353e7fd7c8278d2d2e12f1386649c51_1440w.jpg)

### 4.1 堆叠双ToR及其问题

如图8a所示，典型的双ToR设计使用一条链接将两个ToR连接起来以同步状态。两个ToR的控制平面以主备方式运行，通过带外网络[同步控制器](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=1&q=%E5%90%8C%E6%AD%A5%E6%8E%A7%E5%88%B6%E5%99%A8&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiLlkIzmraXmjqfliLblmagiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDQ4ODIwNDcsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.0A6xKB9E1891FyoIKnt_InhlZ_MlJhYmOSeRJJrJAK4&zhida_source=entity)状态，以确保正确的主选择。在主机端，可以使用绑定（bond）（Linux内置模块）实现双ToR访问。具体而言，绑定模式4（[动态链路聚合](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=1&q=%E5%8A%A8%E6%80%81%E9%93%BE%E8%B7%AF%E8%81%9A%E5%90%88&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiLliqjmgIHpk77ot6_ogZrlkIgiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDQ4ODIwNDcsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.PZSMjzqe1zZzk-IY0na6AFY-2JsSePtfFid8kRmwGIk&zhida_source=entity)）使得在两个端口之间实现自动负载均衡，并在一个链接/ToR交换机故障时自动重新路由流量。堆叠双ToR最大程度地减少了对主机端的修改，为部署和升级提供了便利性。

然而，在实践中，作者发现堆叠双ToR设计引入了许多风险。

1. 堆叠故障：ToR之间直接链接的问题或者一个ToR的故障可能会导致异常，使得所有双ToR下的NIC都离线。例如，如图8a所示，ToR1和ToR2分别作为主备。假设由于MMU（[内存管理单元](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=1&q=%E5%86%85%E5%AD%98%E7%AE%A1%E7%90%86%E5%8D%95%E5%85%83&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiLlhoXlrZjnrqHnkIbljZXlhYMiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDQ4ODIwNDcsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.Us-JmFSZC6dZpw3f-4XIFMaNu-3KlwXVbmPzptJrPac&zhida_source=entity) Memory management unit）溢出，ToR1的数据平面不工作，而其[控制平面](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=2&q=%E6%8E%A7%E5%88%B6%E5%B9%B3%E9%9D%A2&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiLmjqfliLblubPpnaIiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDQ4ODIwNDcsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MiwiemRfdG9rZW4iOm51bGx9.LPcBo2vQRycSp6v9YA6VmNjn0GwHv1g29XqFFZkU2rI&zhida_source=entity)未能识别此根本原因。因此，ToR1和ToR2不能通过直接链接同步ARP或MAC。由于带外网络（Out-of-band是指在网络通信中,发送方和接收方之间不仅通过正常的数据传输通道进行通信,而且还通过另一个独立的[控制通道](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=1&q=%E6%8E%A7%E5%88%B6%E9%80%9A%E9%81%93&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiLmjqfliLbpgJrpgZMiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDQ4ODIwNDcsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.vXZsHJM_Fior2bArxn8CvjIg0tn5ItaXyl6hOthGGcQ&zhida_source=entity)进行通信。）正常运行，ToR1和ToR2的控制平面仍然正常协商。从ToR1的角度看，ToR2在数据平面上是无法访问的，ToR1应继续在主状态下工作。从ToR2的角度看，ToR1的数据平面无法访问，这意味着不能再同步转发信息，但ToR1仍在主状态下运行。为防止[数据平面](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=5&q=%E6%95%B0%E6%8D%AE%E5%B9%B3%E9%9D%A2&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiLmlbDmja7lubPpnaIiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDQ4ODIwNDcsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6NSwiemRfdG9rZW4iOm51bGx9.qVopT8320uYo-aoZ1Cpb1F6C25jtXOR1Leqae9SMCfY&zhida_source=entity)中的不一致转发，ToR2选择关闭自身。然而，由于剩余的ToR1数据平面已关闭，所有此双ToR下的NIC都变得不可用。这种机架级别的故障导致生产中严重的不可用问题。
2. ToR升级引起的问题：在双ToR升级期间，可能出现一个ToR运行新升级版本，而另一个运行旧版本的情况。这种情况可能导致通过RPC同步控制平面信息时的不兼容性问题，因为此时两个版本的RPC值和字段可能不匹配。如果发生这种不兼容性问题，ToR可能会宕机。虽然交换机供应商已经提出了逐步升级（ISSU）的解决方案，但它只在旧版本和新版本之间的差异足够小的情况下有效。然而，70%的ToR升级不符合ISSU的假设，导致升级效果不佳。

**综述：由堆叠双ToR引起的故障。根据内部故障报告，在过去三年中，传统数据中心中超过40%的关键故障是由堆叠双ToR引入的上述两类问题所致。**

### 4.2 非堆叠双ToR

阿里构建一种非堆叠双ToR方案，如图8b所示，该方案移除了两个ToR之间的直接链接。

现有的堆叠双ToR方案中，因为两个ToR通过一条直接链接相连，它们可以通过直接链接协商共享的sysID。这使得主机可以通过LACP将堆叠双ToR交换机看作一个设备。

原始的LACP工作方式如下：两个ToR的LACP模块分别从下游主机（Host1）接收LACP[数据单元](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=1&q=%E6%95%B0%E6%8D%AE%E5%8D%95%E5%85%83&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiLmlbDmja7ljZXlhYMiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDQ4ODIwNDcsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.8Ntq4c5xgR80n8KxF2CVwfOzTeFo2YvhfdtreREA8vg&zhida_source=entity)（LACPDU）。在生成响应LACPDU之前，为了使双ToR功能正常，两个ToR需要通过直接链接协商，以确保它们使用相同的MAC地址和不同的端口ID作为输入。LACP模块填充LACPDU中的Actor信息字段，包括sysID（根据协商的MAC地址生成）、portID和其他字段，然后将其发送回主机。

**捆绑两条独立的链路**：阿里与交换机供应商深入合作，保在LACP协商期间，双ToR交换机使用相同的MAC地址和不同的portID，定制的LACP模块来实现这一目标。

1. 相同的MAC地址：当ToR的LACP模块接收到LACPDU时，它根据预配置的MAC地址生成sysID。选择预配置的MAC地址并不简单。这个[MAC地址](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=8&q=MAC%E5%9C%B0%E5%9D%80&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiJNQUPlnLDlnYAiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDQ4ODIwNDcsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6OCwiemRfdG9rZW4iOm51bGx9.n2iGVay8cE0Ko9cHabmp2t31DFdcPbdQt_NvgliKuEQ&zhida_source=entity)应该在同一个双ToR集中的两个交换机之间是相同的。此外，此MAC地址不应被任何主机使用；否则可能会发生冲突。因此，作者选择了一个RFC保留的[虚拟路由器](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=1&q=%E8%99%9A%E6%8B%9F%E8%B7%AF%E7%94%B1%E5%99%A8&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiLomZrmi5_ot6_nlLHlmagiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDQ4ODIwNDcsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.wkEgq0jM8sJnUPlYKIYcsRnvIVMB67brzpIG7PQmQOk&zhida_source=entity)MAC地址，00:00:5E:00:01:01 ，作为预配置的MAC地址。原则上，在同一层2子网中，不同双ToR集中的ToR交换机不能使用相同的预配置MAC地址，以避免MAC地址冲突。在阿里云，作者完全采用层3转发（通过BGP）处理不同双ToR交换机之间的通信。因此，不同的双ToR集自然属于不同的层2子网，消除了MAC地址冲突的可能性。
2. 不同的portID：默认情况下，两个ToR交换机为同一主机生成相同的portID（因为它们的布线相似）。为了生成不同的portID，每个ToR交换机对原始portID执行位移操作。操作为： ' = + offset ，其中 是原始的portID。作者为同一双ToR集中的交换机设置不同的offset ，它是一个大于256的整数（例如，300）。由于ToR上的总端口数少于256，计算得到的portID（ '）不会与其他系统设置冲突。

最后，主机应该能够通过将每个ARP消息复制到NIC上的两个端口（即图8b中的ARP广播模块）同时更新两个ToR上的ARP信息。到目前为止，所有主机都可以支持作者的非堆叠双ToR方案。这种创新的非堆叠双ToR方案通过消除直接链接，减少了由堆叠双ToR引入的故障风险，同时仍然支持高效的LACP协商和通信。

**利用BGP在故障处理中的应用：**在正常情况下，每个ToR交换机会更新BGP，将默认[子网路由](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=1&q=%E5%AD%90%E7%BD%91%E8%B7%AF%E7%94%B1&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiLlrZDnvZHot6_nlLEiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDQ4ODIwNDcsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.IowauWnQeZc-hj6C3qacT6zG_fAMCOgRCcL0EcswTZQ&zhida_source=entity)（在图8b中为1.0.0.0/24）设置为等成本路径。当发生故障时，作者需要确保[路由收敛](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=1&q=%E8%B7%AF%E7%94%B1%E6%94%B6%E6%95%9B&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiLot6_nlLHmlLbmlZsiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDQ4ODIwNDcsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.1MWa7AVKxpFZl8fM4Ta2go7mG76EZPOmFHGDyMnc_18&zhida_source=entity)到剩余的可用路径，这是BGP的主要特性之一。因此，作者决定在故障处理中最大化地利用BGP。在HPN中，所有在ToR上学习的ARP条目都会转换为BGP中的/32主机路由（Host Routes模块），并在整个网络中被识别。当NIC-ToR链路失败时，交换机会撤回相应的ARP条目和对应的主机路由，触发BGP的更新。如图8b所示，当发生故障时，ToR1会撤回1.0.0.1/32。因此，在整个集群中，到达Host1的转发路径会收敛到通过ToR2，因为只有ToR2发布了最长前缀路由（1.0.0.1/32）。**（这里说明下，32: 32位掩码，即匹配1.0.0.1四字节）**

需要特别注意处理段内流量，因为它默认可以通过层2直接转发。MAC地址表中项目的实际aging时间为5分钟，这会在NIC-ToR链路失败时导致黑洞问题。为了解决这个问题，作者关闭了层2广播，并在交换机中实施了ARP代理。ARP代理使用交换机自己的MAC地址响应所有来自主机的ARP请求，强制所有层2转发在ToR交换机上终止，并使得段内流量可以通过BGP正确路由，避免黑洞问题。

## 5. Tier1: 1K GPUs in one Segment

### 5.1 充分利用51.2Tbps单芯片

在HPN中，作者采用了最新的51.2Tbps以太网单芯片交换机（于2023年初首次发布）。在Tier1中，每个交换机具有128个主动+8个备用的200Gbps下行端口和60个上行的400Gbps端口。这种设计保证了接近1:1的收敛比**（实际上是1.067:1）**。每个ToR交换机保留了8个备用的下行端口。作者利用这些端口连接备用主机，以便在主机端故障（包括CPU、内存、GPU、PCIe、NVLINK和NIC）发生时快速更换主机。

![](https://pic1.zhimg.com/v2-0ca06d32ed9851a86fd713d8cb294a34_1440w.jpg)

虽然有多芯片机箱交换机支持更高的带宽容量，但多芯片交换机的关键硬件故障总数是单芯片交换机的3.77倍。其根本原因在于多芯片交换机是分布式交换系统，通过芯片布线互连。内部布线故障、芯片间互操作以及芯片与CPU之间的通信故障都会导致整体关键性中断。

单芯片支持更高吞吐量意味着单位面积内处理的流量增加，实际上导致了功耗的增加。如图9a所示，与之前的25.6Tbps芯片相比，51.2Tbps交换芯片的功耗增加了45%。然而，芯片的最大结温（Tjmax）保持不变（105°C）。如果芯片的工作温度超过Tjmax，将立即触发过温保护，关闭所有数据传输。如图10所示，作者设计了一种新的VC散热器来解决这个问题。通过优化蒸发室的毛细管结构，并在芯片中心部署更多的毛细管柱，可以更有效地传出热量。这种设计将散热效率提高了15%（见图9b中的Optimized VC）。

![](https://pic2.zhimg.com/v2-66f2689e0d58622cc845b09c59d0207d_1440w.jpg)

### 5.2 [Rail优化网络](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=1&q=Rail%E4%BC%98%E5%8C%96%E7%BD%91%E7%BB%9C&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiJSYWls5LyY5YyW572R57ucIiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MjQ0ODgyMDQ3LCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.o6vSuOTMW-ZEPpB1QFeO4CDNVt95IpRBuIUq1aZjxi0&zhida_source=entity)

目前的配置是，主机内部的8个GPU通过高带宽的主机内部网络（如NVLINK）连接起来。尽管不同类型的GPU的主机内部网络带宽有所不同，但比起NIC提供的2×200Gbps带宽，它通常高出4到9倍。为了充分利用不同的转发能力，NVIDIA首先提出了Rail优化网络的概念，这在训练集群中被广泛采用。

在Rail优化网络中，同一Rail中的NIC通过同一组双ToR交换机连接。不同Rail中的NIC可以通过主机内部和主机间的组合转发进行通信。例如，在图11中，如果主机1中的GPU1要与主机3中的GPU2通信，**则转发路径是：主机1中的GPU1 → 主机1中的GPU2 → ToR3 → 主机3中的GPU2。**

![](https://pic2.zhimg.com/v2-c53251e83b7bebef19f35ba2b3df43f3_1440w.jpg)

图11展示了作者如何在实践中应用Rail优化网络，这使得单个主机的3.2Tbps（8×400Gbps）可以跨多达16个ToR交换机提供服务（在双ToR的情况下）。一个片段可以容纳的GPU数量增加了8倍，相比于原始的拓扑结构，其中一个主机的3.2Tbps由2个ToR交换机提供服务。每组双ToR交换机可以为128个GPU提供服务，16个ToR总共连接1024个GPU形成一个片段，大幅减少了转发延迟，并提供了极致的性能。更重要的是，它显著减少了通过聚合层的流量，降低了网络负载不均衡的可能性。

## 6 Tier2: 15K GPUs in one Pod

### 6.1 Conquering Load Imbalance

在Tier1网络中使用双ToR时，如果简单地在ToR和汇聚层之间部署典型的[Clos拓扑结构](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=1&q=Clos%E6%8B%93%E6%89%91%E7%BB%93%E6%9E%84&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiJDbG9z5ouT5omR57uT5p6EIiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MjQ0ODgyMDQ3LCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.sczGjonKFZ4EmTA-40Rbsnoy0y6C2NjsoHf_Lb9tHnY&zhida_source=entity)，如图12a所示，哈希极化仍然存在。在下行方向，由于双ToR的存在，从60个汇聚交换机向2个ToR交换机的流量汇聚较高。图13a展示了在生产中对一个变种GPT-3 175B的实际训练作业期间，双ToR设置中两个下行端口的出口流量。这两个端口的负载差异显著（3倍），降低了训练性能。

![](https://pic2.zhimg.com/v2-066d0dcbf77a31fb2ac8ef8add23fd0f_1440w.jpg)

![](https://pica.zhimg.com/v2-db382564d96121d87e2b83a27fb64954_1440w.jpg)

双平面：消除Pod中的哈希极化。如图12b所示，在双平面中，每个双ToR设置中的ToR交换机被分类为两个独立的组。通过这种设计，一旦流量进入ToR中的一个[上行链路](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=1&q=%E4%B8%8A%E8%A1%8C%E9%93%BE%E8%B7%AF&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiLkuIrooYzpk77ot68iLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDQ4ODIwNDcsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.r5TVxuw8EnsJwCHYkkeF9PE2dzxX9qUgJ2XgVysm7CM&zhida_source=entity)，其在Pod内的转发路径就完全确定了。**因此，在Pod中消除了哈希极化。部署双平面设计后，如图13b所示，不同端口的入口流量变得均匀，ToR下行端口的队列长度减少了91.8%。**

![](https://pic2.zhimg.com/v2-3a2043cdcf5bc6c03cbbb80686cc0ee9_1440w.jpg)

如图14所示，当Tier2网络部署典型的Clos连接时，不平衡的负载会导致交换机上持续的拥塞。队列长度分别保持在267KB和3KB。部署双平面后，两个ToR的负载变得均匀，平均队列长度为20KB。

**优化路径选择：**HPN在集体通信库中有效地获取精确的不交叉等路径，并在其上平衡负载。首先，对于每个新的连接请求，作者生成通过不交叉路径的连接集合。通过大规模部署的RePaC，主机可以直接在每个交换机中复制精确的哈希结果。根据结果，作者部署了一个主机-交换机协作系统，以确保所有主机保持最新的链路状态并计算正确的不交叉路径。其次，对于每个连接，HPN维护一个计数器，记录当前活动工作队列元素（WQE）中的总字节数。计数器显示当前连接的拥塞状态：拥塞连接较慢地排空工作队列。因此，作者的方案（在集体通信库中）通过具有最小计数器的连接发送消息。**通过在512个GPU上[并发运行](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=1&q=%E5%B9%B6%E5%8F%91%E8%BF%90%E8%A1%8C&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiLlubblj5Hov5DooYwiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDQ4ODIwNDcsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.TQEp2yoyM5VEcgdP8Xa0CxrHXHyx2sXEYD6AHD58SoU&zhida_source=entity)四个AllReduce任务的测试，这种优化路径选择可以将集体通信性能提高高达34.7%。**

### 6.2 15K GPUs in One Pod

双平面设计带来了另一个重要的好处：它将ToR与汇聚之间的链路连接数量减半，使得汇聚交换机能够在同一Pod中支持更多的段。因此，Tier2网络的规模扩大了一倍。此外，作者将汇聚-核心的收敛比设置为15:1，这释放了汇聚交换机上87.5%更多的端口，用于连接额外的段。最终，作者实现了在同一Pod内包含15K张卡的目标，并为每个GPU提供了400Gbps的网络访问能力。表2总结了HPN中的关键机制。

![](https://pic3.zhimg.com/v2-1abb16dbcc005c0cb831c6dd8eeb1c1a_1440w.jpg)

## 7. Supporting Larger Scale

为了满足支持更多GPU（例如，O(100K) GPUs）的长期规划，作者还设计了连接多个Pod的Tier3网络。作者妥协了汇聚-核心层收敛比（15:1）以增加Pod的规模。深入研究LLM训练中的通信模式，作者发现跨数万个GPU进行单个训练作业并不需要过多的Tier3带宽容量。

以GPT-3 175B使用TP=8，PP=8，DP=512为例（需要32K个GPU）。如表3所示，PP生成的流量最少，并且利用基本的发送/接收进行通信，对网络带宽不敏感。因此，通过与工作调度器的合作，作者可以确保只有PP流量通过核心层，最小化多跳转发引入的副作用。

减少Tier3中的负载不均衡，作者进行了两项增强措施：（1）在核心层继续使用双平面设计；（2）在每个核心交换机中，采用优先端口哈希，确保从物理端口 到Pod 的流量唯一转发到端口 （与5元组无关），消除哈希[极化效应](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=1&q=%E6%9E%81%E5%8C%96%E6%95%88%E5%BA%94&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiLmnoHljJbmlYjlupQiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDQ4ODIwNDcsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.gsf2RiXe_7DQDTi0ZS039h3JmgSd4oY8MCdJU9yHzrg&zhida_source=entity)。如果端口 发生链路故障，流量将回退到执行默认的基于5元组的哈希。

## 8. Independent Frontend Network

在HPN中，每个主机配备额外的2×200Gbps NIC用于前端网络访问，并设计了一个独立的前端网络。前端网络主要处理管理和存储流量（例如，集群管理、数据集加载、镜像加载和检查点保存/加载）。在提供模型推理服务时，前端网络也可以处理推理请求/响应。由于前端网络支持的流量类似于传统的云计算场景，如图7所示，作者采用经典的三层拓扑结构用于前端网络。为了保证可靠性，每个前端NIC以非堆叠的双ToR方式连接到两个ToR交换机。

在前端网络中，作者设计了汇聚层和核心层的收敛比例为1:1，确保最大双分割带宽。隔离训练流量和存储流量。为了提供最佳的训练性能，存储集群安置在前端网络中。存储集群由96-128个存储主机组成，运行CPFS和OSS存储服务，用于存储训练数据集、训练所需的容器镜像以及训练过程中保存的检查点。

在设计HPN前端网络时，作者充分考虑了上述需求，2×200Gbps的前端网络提供了良好的性能。因此，这样的设计确保了HPN中的主机可以灵活地用于训练和推理，建立一个统一平台，支持用户各种需求。

## 9. 评估

作者将HPN与作者先前一代的训练网络架构（[DCN+](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=1&q=DCN%2B&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiJEQ04rIiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MjQ0ODgyMDQ3LCJjb250ZW50X3R5cGUiOiJBcnRpY2xlIiwibWF0Y2hfb3JkZXIiOjEsInpkX3Rva2VuIjpudWxsfQ.nx7MGT2cb-UJsnRXt-vUuwjWBG7966t8Lwerswm9oJw&zhida_source=entity)）进行了比较。DCN+的后端网络是传统的三层Clos数据中心网络，具有全分割带宽和双ToR支持。在DCN+中，每个segment包含128个GPU，每个Pod包含4个segment。在评估中，每个主机配备了8个NVIDIA H800 GPU 和 9个NVIDIA BlueField3 2×200Gbps DPU 。同一主机内的GPU通过400GBps（双向）NVLINK相互连接。

### 9.1 LLM 训练性能

**在生产环境中的大规模训练性能：**阿里云专有的LLM模型在超过2300个GPU（288个主机）上进行了数月的训练。该模型首先在DCN+上进行训练，然后迁移到了HPN上。在DCN+中，训练作业涵盖了19个segment，而在HPN中，训练作业仅需要3个segment。作者观察到迁移后性能显著提升。如图15a所示，端到端训练性能提升了超过14.9%。

作者进一步收集了训练期间汇聚交换机的统计数据。汇聚交换机负责跨segment的流量传输，其统计数据直接反映了网络的状态。如图15b所示，跨segment流量平均减少了37%。更少的跨segment流量减少了网络中的拥塞情况。图15c展示了汇聚交换机[下行链路](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=1&q=%E4%B8%8B%E8%A1%8C%E9%93%BE%E8%B7%AF&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiLkuIvooYzpk77ot68iLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDQ4ODIwNDcsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.vDLEG0hJrg9f5Vp4OObXOuByjRqM3LPRuHGU3sBRMUc&zhida_source=entity)的队列长度分布。在DCN+中，高流量量和哈希冲突不断导致队列的积累。而在HPN中，这个问题得到了极大的缓解。

![](https://pic4.zhimg.com/v2-7c34659bd186e396d1dd39a2c0ea33c5_1440w.jpg)

**典型LLM训练性能：**作者进一步评估了三个流行的LLM模型的训练性能：LLaMa-7B、LLaMa-13B和GPT3-175B，使用448个GPU（56个主机）。如图16所示，通过采用HPN，端到端训练性能分别提升了7.9%、14.4%和6.3%。

![](https://pic2.zhimg.com/v2-cf9cadfa9a5d36d64149e45814b8b777_1440w.jpg)

### 9.2 网络层性能

作者使用NCCL 2.18.3评估了HPN的集体通信性能。

**集体通信结果：**作者评估了典型的集体通信操作（AllReduce和AllGather）的性能，使用448个GPU（56个主机）。在LLM训练作业中，AllReduce是主要的操作。图17列出了结果。HPN将AllReduce的性能提升了高达59.3%。由于HPN中的每个segment包含1K个GPU，因此在流量之间不存在竞争。AllGather的性能在HPN和DCN+之间类似。主要原因是作者在AllReduce中使用了NVLS。它可以在NVSwitch中进行聚合，从而为AllReduce提供更高的内部主机吞吐量。然而，NVLS无法加速AllGather。因此，AllGather的结果都受到NVSwitch的限制。

![](https://pic1.zhimg.com/v2-a8b50acdcc7bd27e530a456f9c6fbdb4_1440w.jpg)

在Megatron框架中，当设置TP=8时，Multi-AllReduce主要用于梯度同步。在Multi-AllReduce中，同一DP组中具有相同索引的GPU并行进行AllReduce。所有数据通过跨主机[网络交换](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=1&q=%E7%BD%91%E7%BB%9C%E4%BA%A4%E6%8D%A2&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiLnvZHnu5zkuqTmjaIiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDQ4ODIwNDcsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.lA-YfsLMaGPAHFU7i1Flnsm6WV29i1Eb9pILNRKaONk&zhida_source=entity)，而不是通过NVLink。如图17c所示，**HPN可以将Multi-AllReduce的性能提升高达158.2%。**根本原因是HPN在跨主机网络中更好地平衡负载，并最大化了网络的利用率。

### 9.3 可靠性

在作者生产环境运行的八个月中，HPN没有观察到任何单点故障。作者使用256个GPU（32个主机）训练LLaMa-7B，并在NIC-ToR链路上注入链路故障（链路失效和链路抖动）。作者比较了双ToR设计与典型的单ToR设计，以验证可靠性的提升。

**[案例研究](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=1&q=%E6%A1%88%E4%BE%8B%E7%A0%94%E7%A9%B6&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiLmoYjkvovnoJTnqbYiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDQ4ODIwNDcsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.EdWGnbX7qrar0g9G8oRMVKH0pEdYlYwZNSRMrZlAMcc&zhida_source=entity)1：链路故障和修复**

如图18a所示，在单ToR拓扑中发生了链路故障，在10秒时训练立即停止。如果能够在1分钟内定位和修复故障，则训练可以恢复。然而，如果修复时间超过两分钟，则训练无法恢复。相反，**在双ToR设计中，单个链路的故障只会导致性能下降6.25%。一旦修复故障，训练吞吐量立即恢复正常。**

**案例研究2：链路抖动**

图18b显示了链路抖动的影响。在单ToR中，临时链路抖动会导致训练停顿超过9秒钟。而在双ToR中，性能下降可以忽略不计。

![](https://picx.zhimg.com/v2-c9a5bfc751cbb48d6701887c010edb45_1440w.jpg)

## 10. 经验与教训

具体内容可以参考论文，以下只做总结。

1. 单数据中心建筑内的一个Pod**（减少布线复杂性和成本）**
2. 单个以太网芯片的转发能力每两年翻倍**（102.4Tbps的单芯片交换机和下一代HPN）**
3. 不对称链路状态的可能性**（链路故障信号（LFS）协商失效，即：NIC -> ToR 方向的光信号质量异常，而 ToR -> NIC 方向的质量正常）**
4. HPN的布线复杂性**（布线错误）**
5. 为什么不在tier2上采用铁路优化的想法以支持更大规模？**（rail Tier2严重依赖于rail内部流量，无法用户隔离）**
6. 存储集群的位置选择**（网络访问、后断网络稳定性和接入GPU数量）**
7. 为何不利用rail优化拓扑处理ToR相关故障？**（NCCL改造大）**

## 11. 结论

本文介绍了HPN，一种用于训练GPU集群的新型网络架构，已在阿里巴巴云中广泛部署超过八个月。HPN避免了传统数据中心拓扑中单ToR设计引起的单点故障。HPN通过双层双[平面网络](https://zhida.zhihu.com/search?content_id=244882047&content_type=Article&match_order=1&q=%E5%B9%B3%E9%9D%A2%E7%BD%91%E7%BB%9C&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3ODQ1NTU1NTAsInEiOiLlubPpnaLnvZHnu5wiLCJ6aGlkYV9zb3VyY2UiOiJlbnRpdHkiLCJjb250ZW50X2lkIjoyNDQ4ODIwNDcsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.GpM2iskB4_W5RmSNnZgbibm6i6o50e6yvlkgB80o_F0&zhida_source=entity)连接15K个GPU，消除了哈希极化并简化了最优路径选择。HPN提高了端到端的LLM训练性能达14.9%。**HPN 7.0的网络结果相对字节跳动MegaScale提到的网络对于LLM训练更加定制化，其中双ToR设计十分新颖，对于其他公司后向网络有很多启示。**
