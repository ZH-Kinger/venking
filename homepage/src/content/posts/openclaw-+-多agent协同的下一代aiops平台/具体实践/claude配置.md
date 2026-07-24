---
title: "Claude配置"
date: 2026-07-23
category: "AIOps 平台"
---
## claude下载

### 授予权限

既然你以后还要做开发，建议直接把当前用户的脚本执行权限打开，以后就不会再遇到这种报错了。

在你当前的 PowerShell 窗口中，直接输入并运行以下命令：

```plain
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

1.  如果系统弹出一大段文字问你是否要更改执行策略，输入 `**Y**` 然后回车确认。

权限修改成功后，系统不会有特殊提示。此时你再重新运行安装命令：

```plain
npm install -g @anthropic-ai/claude-code
```

这次就可以顺利下载安装了。

​  

​  

## 配置第三方API KEY

现在你已经可以唤醒 Claude Code 了。请在当前的 PowerShell 窗口中直接输入：

```plain
claude
```

敲击回车后，会经历以下几个标准流程：

1.  **首次授权登录**： 系统会自动在你的终端里生成一个链接，或者直接弹开你的默认浏览器。 你需要使用你的 Claude 账号（Pro/Team 或绑了 API 计费的 Console 账号）进行一次授权（Authorize）。
2.  **进入对话模式**： 授权成功后，回到 PowerShell 窗口，你会看到提示符变成了类似 `>` 的样式，这意味着 Claude 助手已经在监听你的指令了。
3.  **开始使用**： 你可以直接用自然语言打字了。比如：

-   *“帮我用 Python 写一个批量重命名当前文件夹里所有图片的脚本。”*
-   *“解释一下这个目录下的* `*main.py*` *是做什么的。”*

  

![image.png](assets/Claude%E9%85%8D%E7%BD%AE-1.png)

  

### 解决API问题

申请一个公司的api key

请在你的 PowerShell 窗口中，直接复制、粘贴并回车运行下面这**一行**命令：

```plain
'{"hasCompletedOnboarding": true}' | Out-File -FilePath "$HOME\.claude.json" -Encoding utf8
```

*(这句话的意思是：直接把这段 JSON 代码，以 UTF-8 的编码格式，强行写入到你主目录的* `*.claude.json*` *文件里。没有弹窗，瞬间完成。)*

---

### 最终冲刺

文件写进去之后，我们再把之前的“召唤咒语”连起来念一遍。请按顺序执行：

```plain
# 1. 挂载代理
$env:ANTHROPIC_BASE_URL="https://ai.wuji.tech/api"

# 2. 挂载秘钥
$env:ANTHROPIC_API_KEY="cr_bd414d2312416afe5c9a2095c8de2e96359e7f824a872dcba3ebdd4e8a84e5c9"

# 3. 启动 Claude
claude
```

  

### 最终效果

![image.png](assets/Claude%E9%85%8D%E7%BD%AE-2.png)
