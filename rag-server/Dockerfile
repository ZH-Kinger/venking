# ============================================================
# Blog RAG agent —— 部署镜像(生产运行时,**故意不含 torch/docling**)
#
# 为什么这样写:
# - 运行时全是 API 调用(embedding/rerank/GLM 都走 HTTP),不碰 torch。
#   只装 rag,agent,web,ui 四组;pdf(docling→torch 527M)/ingest 是**入库期**依赖,
#   不进部署镜像 → 镜像从 ~2.5G 砍到几百 M。装完用 `pip show torch` **验证**没被隐式拉进来。
# - data/(chroma 库)和 .env(含 key)**不 COPY 进镜像**,运行时挂载卷进来:
#   库可单独更新不必重建镜像;key 不落进镜像层(安全)。
# - 用清华 pip 源:国内服务器装依赖快且稳。
# ============================================================
FROM python:3.13-slim

# 清华 pip 源(国内快)+ 不写 .pyc + 输出不缓冲(日志实时)
ENV PIP_INDEX_URL=https://pypi.tuna.tsinghua.edu.cn/simple \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# ---------- 依赖层(★改代码不动这层,缓存命中→不重装,重建秒级)----------
# 只 COPY 依赖清单 + 一个占位包(让 editable install 能解析包与依赖)。
COPY pyproject.toml ./
RUN mkdir -p src/blog_rag && echo "" > src/blog_rag/__init__.py

# 装运行时依赖组;--no-cache-dir 让镜像更小。
# 为什么带 ingest:运行时链路 retriever→ingest→loaders,而 loaders 顶层 import 了
#   frontmatter/langchain-text-splitters/markdownify/pyyaml(入库期包)。这是既存代码耦合,
#   先装上跑通;把 loaders 改成延迟 import 以解耦、进一步瘦身,记 backlog。
#   注:ingest 里的 pymupdf 是 loaders 函数内延迟 import,运行时不触发,但装上无害(无 torch)。
RUN pip install --no-cache-dir -e ".[rag,agent,web,ingest,api]" \
    # 验证:torch 不该出现在部署镜像里(出现即说明依赖被污染,构建就该警觉)
    && (pip show torch >/dev/null 2>&1 \
        && echo "⚠️  WARN: torch 被拉进镜像了,检查依赖!" \
        || echo "✅ OK: 镜像不含 torch(运行时纯 API 调用)")

# ---------- 源码层(★改代码只重建这层,秒级;-e 装的是 /app/src 路径,真码在此覆盖占位)----------
COPY src ./src

# 为什么放这里(而非顶部 ENV 块):editable 安装用占位 __init__.py 建的映射是"装机时快照",
# 后加的 api.py 不被暴露 → 裸 `uvicorn blog_rag.api:app` 报 Could not import module。
# 显式把源码根加进 PYTHONPATH,让 blog_rag.* 一律可导入,**不再依赖易丢的 compose --app-dir 覆盖**。
# 放在 COPY src 之后=靠后的层,改这行不动 pip 依赖层缓存(不触发 10-20min 重装)。
ENV PYTHONPATH=/app/src

EXPOSE 7860

# data/(chroma)与 .env 由 compose 挂载到 /app/data 和 /app/.env
# FastAPI + SSE(取代旧的 gradio app);PYTHONPATH 已含 /app/src,裸导入 blog_rag.api 即可。
CMD ["uvicorn", "blog_rag.api:app", "--host", "0.0.0.0", "--port", "7860"]
