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

from fastapi import Depends, FastAPI, HTTPException, Query
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


def _sse(ev: dict) -> str:
    """打包成 SSE 帧(data: <json>\\n\\n),中文不转义。"""
    return f"data: {json.dumps(ev, ensure_ascii=False)}\n\n"


@app.get("/api/chat", dependencies=[Depends(guard)])   # 按 IP 限流 + 可选 token(防白嫖 GLM key)
def chat(
    q: Annotated[str, Query(min_length=1, max_length=4000)],
    deep: bool = False,
    web: bool = False,
    length: Literal["", "short", "detailed"] = "",
    thread: Annotated[str, Query(max_length=128, pattern=r"^[A-Za-z0-9_-]*$")] = "",
):
    """SSE 流式问答:逐 token 推 {type:token} + 末尾推 {type:done}(含 mode/sources/suggestions)。

    前端用 EventSource 接:token 事件追加正文,done 事件渲染来源面板。
    thread 由前端生成并固定一会话(接 checkpointer,多轮上下文用留 M8)。
    """
    question = q.strip()
    if not question:
        raise HTTPException(status_code=422, detail="问题不能为空")
    request_id = uuid4().hex

    def gen():
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
                yield _sse(ev)
        except Exception:                            # 真实异常只进服务端日志,公网不泄露内部实现/key 路径
            logger.exception("agent_request_failed request_id=%s", request_id)
            yield _sse({
                "type": "error",
                "msg": "Agent 服务暂时不可用，请稍后重试。",
                "request_id": request_id,
            })
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
