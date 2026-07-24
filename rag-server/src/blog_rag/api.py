"""FastAPI 后端:把 agent 暴露成 HTTP + SSE 流式,供自定义前端(Gemini 风格)调用。

为什么从 Gradio 换成 FastAPI + 自定义前端:
- Gradio 是快速搭 demo 的工具,界面框架痕迹重、难做到 Gemini 那种精致度;
- 用户要"像公司官网/Gemini"的正规前端 + 公开无登录 → 自定义 HTML/CSS/JS 前端 + FastAPI API 是标准做法;
- 后端复用已有 graph.stream_answer(流式生成器),前端用 EventSource(SSE)接 token 增量;
- 单页静态前端由 FastAPI 直接托管,一个进程搞定,无需 node 构建 / nginx。
"""
from __future__ import annotations

import json
import logging
from pathlib import Path
from typing import Annotated, Literal
from uuid import uuid4

from fastapi import Depends, FastAPI, HTTPException, Query, Request
from fastapi.responses import FileResponse, JSONResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from blog_rag.config import settings
from blog_rag.graph import stream_answer
from blog_rag.security import guard

STATIC_DIR = Path(__file__).parent / "static"
logger = logging.getLogger("blog_rag.api")

app = FastAPI(title="Blog RAG · Agentic 问答", docs_url=None, redoc_url=None)

# 自托管前端资产(如 mermaid.min.js):同源提供,避免依赖外部 CDN(国内易被墙,与前端"零 CDN"一致)。
# 懒挂载:目录存在才挂,避免首启时目录缺失导致启动崩溃(static/vendor 由 compose 卷挂载进来)。
_VENDOR = STATIC_DIR / "vendor"
if _VENDOR.is_dir():
    app.mount("/vendor", StaticFiles(directory=str(_VENDOR)), name="vendor")

# 管理后台 + 用户历史 API(登录交给 Logto,后端只校验 token)。懒导入——未装 [admin] 依赖
# 时不影响纯问答部署启动(与 feedback/ingest 的延迟导入纪律一致)。
try:
    from blog_rag.admin_routes import router as _admin_router
    from blog_rag.me_routes import router as _me_router

    app.include_router(_admin_router)
    app.include_router(_me_router)
except ImportError:  # 仅"未装 [admin] 依赖"才跳过;真实代码 bug 应暴露而非静默吞掉
    logger.info("admin/me routes not mounted (blog_rag[admin] deps absent)")

# admin-web 生产构建产物(SPA):存在才挂。资产按真实文件服务;其余 /admin/* 深链一律回退
# index.html(SPA 客户端路由,避免硬刷 /admin/login 404)——等价于 nginx try_files,不依赖反代。
# 本地开发走 Vite dev server(:5173 proxy /api),此挂载仅用于生产同源提供 /admin/。
_ADMIN_DIST = STATIC_DIR / "admin"
if (_ADMIN_DIST / "index.html").is_file():
    if (_ADMIN_DIST / "assets").is_dir():
        app.mount("/admin/assets", StaticFiles(directory=str(_ADMIN_DIST / "assets")), name="admin-assets")

    @app.get("/admin")
    @app.get("/admin/{_spa_path:path}")
    def admin_spa(_spa_path: str = ""):
        return FileResponse(_ADMIN_DIST / "index.html", headers={"Cache-Control": "no-cache"})


def _sse(ev: dict) -> str:
    """打包成 SSE 帧(data: <json>\\n\\n),中文不转义。"""
    return f"data: {json.dumps(ev, ensure_ascii=False)}\n\n"


@app.get("/api/chat", dependencies=[Depends(guard)])   # 按 IP 限流 + 可选 token(防白嫖 GLM key)
def chat(
    request: Request,
    q: Annotated[str, Query(min_length=1, max_length=4000)],
    deep: bool = False,
    web: bool = False,
    length: Literal["", "short", "detailed"] = "",
    thread: Annotated[str, Query(max_length=128, pattern=r"^[A-Za-z0-9_-]*$")] = "",
):
    """SSE 流式问答:逐 token 推 {type:token} + 末尾推 {type:done}(含 mode/sources/suggestions)。

    前端用 EventSource 接:token 事件追加正文,done 事件渲染来源面板。
    thread 由前端生成并固定一会话(接 checkpointer,多轮上下文用留 M8)。
    登录用户(带 Logto token,EventSource 经 ?access_token= 兜底)问答落库,匿名不落库。
    """
    question = q.strip()
    if not question:
        raise HTTPException(status_code=422, detail="问题不能为空")
    request_id = uuid4().hex

    # 解析调用者身份(可选;未装 [admin] 依赖时静默降级为匿名,不影响纯问答部署)。
    identity = None
    try:
        from blog_rag.logto_auth import optional_user_sse
        identity = optional_user_sse(request)
    except ImportError:
        pass

    def gen():
        answer_parts: list[str] = []
        done_mode: str | None = None
        done_sources: list = []
        done_thread: str | None = None
        try:
            for ev in stream_answer(
                question,
                deep_thinking=deep,
                web_mode=web,
                length=length,
                thread_id=thread or None,
                show_reasoning=False,
                request_id=request_id,
            ):
                etype = ev.get("type")
                if etype == "token":
                    answer_parts.append(ev.get("text", ""))
                elif etype == "done":
                    done_mode = ev.get("mode")
                    done_sources = ev.get("sources", [])
                    done_thread = ev.get("thread_id")
                yield _sse(ev)
        except Exception:                            # 真实异常只进服务端日志,公网不泄露内部实现/key 路径
            logger.exception("agent_request_failed request_id=%s", request_id)
            yield _sse({
                "type": "error",
                "msg": "Agent 服务暂时不可用，请稍后重试。",
                "request_id": request_id,
            })
            return
        # 落个人历史(仅登录用户;record_turn 内部再做静默保护,落库失败不影响已流出的答案)。
        if identity is not None:
            try:
                from blog_rag import history
                history.record_turn(
                    identity.sub, thread or done_thread or "", question,
                    "".join(answer_parts), mode=done_mode, sources=done_sources,
                )
            except ImportError:
                pass
    return StreamingResponse(
        gen(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
            "X-Request-ID": request_id,
        },  # 禁反代缓冲,保流式
    )


class FeedbackIn(BaseModel):
    verdict: str                      # up / down
    question: str
    answer: str
    mode: str = "general"
    retrieved_doc_ids: list[str] = []
    sources: list = []
    correction: str | None = None     # 👎 时可附纠正 → 回流 golden reference


@app.post("/api/feedback", dependencies=[Depends(guard)])
def feedback_ep(f: FeedbackIn):
    """👍👎(可带纠正)落盘 feedback.jsonl(字段对齐 golden,供回流评测集)。"""
    from blog_rag import feedback as fb
    fb.record_feedback(f.verdict, f.question, f.answer, f.mode,
                       f.retrieved_doc_ids, f.sources, correction=f.correction)
    return {"ok": True}


@app.get("/api/public-config")
def public_config():
    """公开的前端接入配置(非机密):静态 AI 页据此初始化 Logto。app_id 空=不显示登录入口。"""
    return {
        "endpoint": settings.logto_endpoint,
        "app_id": settings.logto_app_id,
        "api_resource": settings.logto_api_resource,
    }


@app.get("/health")
def health():
    return {"ok": True, "service": "blog-rag-agent"}


@app.get("/ready")
def ready():
    """Cheap readiness check: validates required local dependencies without calling paid APIs."""
    checks = {
        "api_key": True,
        "data_dir": settings.data_dir.is_dir(),
        "knowledge_base": settings.chroma_dir.is_dir(),
    }
    try:
        settings.require_api_key()
    except RuntimeError:
        checks["api_key"] = False
    ok = all(checks.values())
    return JSONResponse(
        {"ok": ok, "service": "blog-rag-agent", "checks": checks},
        status_code=200 if ok else 503,
    )


@app.get("/")
def index():
    # no-cache:每次带 etag 回源校验(未变则 304,便宜),保证前端热更新(改 static 卷)后浏览器立即拿到新版,
    # 不会像之前那样被浏览器静默缓存旧 JS。大文件 /vendor/* 仍由 StaticFiles 正常缓存,不受影响。
    return FileResponse(STATIC_DIR / "index.html", headers={"Cache-Control": "no-cache"})
