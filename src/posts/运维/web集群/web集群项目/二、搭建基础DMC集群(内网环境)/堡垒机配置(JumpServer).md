---
title: "堡垒机配置(JumpServer)"
icon: server
date: 2026-07-23
category:
  - 运维
---
## docker下载

因为 JumpServer 是**多组件复杂系统**，官方只提供 **Docker 一键部署**方式：

-   Docker 能把所有依赖、环境打包好，**不用手动配环境**
-   装完 Docker 才能运行 JumpServer 镜像，所以必须先装 Docker

```plain
# 1. 卸载旧版本（如果有）
yum remove docker docker-client docker-client-latest docker-common docker-latest docker-latest-logrotate docker-logrotate docker-engine

# 2. 安装必要工具
yum install -y yum-utils device-mapper-persistent-data lvm2

# 3. 添加阿里云的 Docker 源 (比官方快得多)
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

# 4. 安装 Docker 引擎
yum install -y docker-ce docker-ce-cli containerd.io

# 5. 启动并设置开机自启
systemctl start docker
systemctl enable docker
```

## 配置docker 镜像加速器

为了防止后面下载 JumpServer 的几十个镜像（Images）时再次失败，请配置阿里云或华为云的加速器：

```plain
mkdir -p /etc/docker
tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": [
    "https://do.nark.eu.org",
    "https://dc.jessestuart.com",
    "https://docker.m.daocloud.io",
    "https://auth.docker.nanoda.net",
    "https://dockerhub.timeweb.cloud"
  ]
}
EOF

# 重启 Docker 生效
systemctl daemon-reload
systemctl restart docker
```

​  

## 下载jumpserver

```plain
# 创建安装目录
mkdir -p /opt/jumpserver
cd /opt/jumpserver

# 下载并运行在线安装脚本
curl -sSL https://resource.fit2cloud.com/jumpserver/jumpserver/releases/latest/download/quick_start.sh | bash
```

  

## 安装完成

![image.png](/blog/assets/posts/%E5%A0%A1%E5%9E%92%E6%9C%BA%E9%85%8D%E7%BD%AE(JumpServer)-1.png)

![image.png](/blog/assets/posts/%E5%A0%A1%E5%9E%92%E6%9C%BA%E9%85%8D%E7%BD%AE(JumpServer)-2.png)

  

### 首次登录与初始化设置

1.  **访问地址**：打开浏览器，输入 `http://192.168.31.136:80`。
2.  **默认账号**：`admin`
3.  **默认密码**：`ChangeMe`
4.  **改密与 MFA**：首次登录会强制要求修改密码，并强烈建议绑定 **MFA (手机验证码)**，这是堡垒机的“灵魂”。

![image.png](/blog/assets/posts/%E5%A0%A1%E5%9E%92%E6%9C%BA%E9%85%8D%E7%BD%AE(JumpServer)-3.png)

  

### 登录后会提示修改密码，修改密码后重新登录

![image.png](/blog/assets/posts/%E5%A0%A1%E5%9E%92%E6%9C%BA%E9%85%8D%E7%BD%AE(JumpServer)-4.png)
