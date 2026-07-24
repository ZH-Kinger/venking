---
title: "基于HPN的高性能算力服务器智能调度集群"
date: 2026-07-23
category: "AI 基础设施"
---
基于HPN+Spine-Leaf自建10node（80卡）5090+CPFS(全闪)算力集群
2 Control Plane+10 Worker Node，25g业务网卡

k8s+volcano共享算力资源 ，边缘/端侧SFT小模型+agent，实现智能调度，服务高可用，自动化观察，服务容灾
RNN + Agent analyze实现碎片化管理，Agent+远端GLM实现 训练/推理参数优化（基于硬件参数）
使用方式kubeconfig + SDK/CLI提供服务与SA访问控制
