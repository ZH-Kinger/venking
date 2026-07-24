---
title: "Jenkins_+_Ansible_+_ECS_物理机"
icon: cloud
date: 2026-07-23
category:
  - 云原生
---
## helm下载

### wget安装

```plain
#wget安装
dnf install wget -y
```

### 手动安装 Helm

```plain
# 1. 下载压缩包
wget https://mirrors.huaweicloud.com/helm/v3.12.0/helm-v3.12.0-linux-amd64.tar.gz

# 2. 解压它
tar -zxvf helm-v3.12.0-linux-amd64.tar.gz

# 3. 把里面的二进制文件挪到系统目录
mv linux-amd64/helm /usr/local/bin/helm

# 4. 验证一下
helm version
```

下载成功

![image.png](/blog/assets/posts/Jenkins_+_Ansible_+_ECS_%E7%89%A9%E7%90%86%E6%9C%BA-1.png)

  

  

## Jenkins下载

### 准备命名空间与仓库

在 `**master**`上执行：

```plain
# 1. 创建专门存放 DevOps 工具的房间
kubectl create ns devops

# 2. 添加 Jenkins 官方图表库
helm repo add jenkins https://charts.jenkins.io
helm repo update
```
---

### 🛠️ 第二步：正式安装 Jenkins

为了确保 Jenkins 能像刚才一样正确使用你修好的 `**local-path**` 存储，我们要在安装时指定参数。

**请直接执行这一条大命令：**

```plain
helm install my-jenkins jenkins/jenkins -n devops \
  --set persistence.storageClass=local-path \
  --set persistence.size=10Gi \
  --set controller.serviceType=NodePort \
  --set controller.admin.password=Kinger@2026
```
