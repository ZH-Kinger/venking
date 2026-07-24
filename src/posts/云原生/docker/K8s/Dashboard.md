---
title: "Dashboard"
icon: cloud
date: 2026-07-23
category:
  - 云原生
---
## 获取YAML文件

```plain
wget https://raw.githubusercontent.com/kubernetes/dashboard/v2.7.0/aio/deploy/recommended.yaml
```

## 修改 Service 类型

修改访问模式，将 默认ClusterIP类型修改为 NodePort 支持外部访问

#### 修改recommended.yaml文件

```plain
kind: Service
apiVersion: v1
metadata:
  labels:
    k8s-app: kubernetes-dashboard
  name: kubernetes-dashboard
  namespace: kubernetes-dashboard
spec:
  type: NodePort  # 👈 1. 添加这一行
  ports:
    - port: 443
      targetPort: 8443
      nodePort: 30443 # 👈 2. 添加这一行（手动指定端口，方便记忆）
  selector:
    k8s-app: kubernetes-dashboard
```

直接使用Sed命令修改（不同版本的yaml可能不同）

```plain
sed -i '/targetPort: 8443/a \  type: NodePort\n  ports:\n    - port: 443\n      targetPort: 8443\n      nodePort: 30443' recommended.yaml
```

## 应用配置文件

```plain
kubectl apply -f recommended.yaml
```

#### 验证端口是否生效

```plain
kubectl get svc -n kubernetes-dashboard
```

​  

## 获取Token

```plain
# 创建管理员并生成 Token
kubectl create serviceaccount admin-user -n kubernetes-dashboard 2>/dev/null || echo "User exists"
kubectl create clusterrolebinding admin-user-binding --clusterrole=cluster-admin --serviceaccount=kubernetes-dashboard:admin-user 2>/dev/null || echo "Binding exists"

# 打印出你的登录 Token
kubectl -n kubernetes-dashboard create token admin-user
```

将下面那一串字符复制下来

![image.png](/blog/assets/posts/Dashboard-1.png)

  

## 登录问题

可能出现Client sent an HTTP request to an HTTPS server.

![image.png](/blog/assets/posts/Dashboard-2.png)

将地址的http需改为https即可

​  

输入你之前复制的token即可

![image.png](/blog/assets/posts/Dashboard-3.png)

  

## 最终效果

![image.png](/blog/assets/posts/Dashboard-4.png)
