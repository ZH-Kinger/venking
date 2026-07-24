"""管理后台路由 /api/admin/*(全部要求 Logto admin 权限)。

鉴权改由 Logto(logto_auth.require_admin)——校验 access token 且具 admin 权限位。
只读能力:系统状态、审计流水、反馈列表、用户对话概览。文章/发布(P3/P4)后续接入。
"""
from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends, Query
from sqlalchemy import func, select, text
from sqlalchemy.orm import Session as DBSession

from blog_rag.config import settings
from blog_rag.db import get_db, get_engine
from blog_rag.logto_auth import require_admin
from blog_rag.models import AuditLog, Conversation

DbDep = Annotated[DBSession, Depends(get_db)]

# 整组默认要求 Logto admin。
router = APIRouter(prefix="/api/admin", tags=["admin"], dependencies=[Depends(require_admin)])


@router.get("/system/health")
def system_health(db: DbDep):
    """系统状态:DB 连通性 + 知识库/数据目录 + API key 就绪(不调付费 API)。"""
    checks: dict[str, bool] = {}
    try:
        db.execute(text("SELECT 1"))
        checks["database"] = True
    except Exception:
        checks["database"] = False
    checks["data_dir"] = settings.data_dir.is_dir()
    checks["knowledge_base"] = settings.chroma_dir.is_dir()
    checks["api_key"] = bool(settings.api_key)
    return {
        "ok": all(checks.values()),
        "checks": checks,
        "db_backend": get_engine().url.get_backend_name(),
        "iam": "logto",
    }


@router.get("/audit-logs")
def audit_logs(
    db: DbDep,
    limit: Annotated[int, Query(ge=1, le=200)] = 50,
    offset: Annotated[int, Query(ge=0)] = 0,
):
    total = db.scalar(select(func.count()).select_from(AuditLog)) or 0
    rows = db.scalars(
        select(AuditLog).order_by(AuditLog.created_at.desc()).limit(limit).offset(offset)
    ).all()
    items = [{
        "id": str(r.id),
        "actor_sub": r.actor_sub,
        "action": r.action,
        "resource_type": r.resource_type,
        "resource_id": r.resource_id,
        "request_id": r.request_id,
        "created_at": r.created_at.isoformat() if r.created_at else None,
    } for r in rows]
    return {"total": total, "limit": limit, "offset": offset, "items": items}


@router.get("/conversations")
def all_conversations(
    db: DbDep,
    limit: Annotated[int, Query(ge=1, le=200)] = 50,
    offset: Annotated[int, Query(ge=0)] = 0,
):
    """全站对话概览(管理员视角;按用户 sub 分组的原始列表)。"""
    total = db.scalar(select(func.count()).select_from(Conversation)) or 0
    rows = db.scalars(
        select(Conversation).order_by(Conversation.updated_at.desc()).limit(limit).offset(offset)
    ).all()
    items = [{
        "id": str(c.id), "user_sub": c.user_sub, "title": c.title,
        "updated_at": c.updated_at.isoformat() if c.updated_at else None,
    } for c in rows]
    return {"total": total, "limit": limit, "offset": offset, "items": items}


@router.get("/feedback")
def feedback_list(limit: Annotated[int, Query(ge=1, le=500)] = 100):
    """只读展示 👍👎 反馈(复用 feedback.load_feedback();最新在前)。"""
    from blog_rag.feedback import load_feedback
    items = load_feedback()
    items = list(reversed(items))[:limit]
    return {"total": len(items), "items": items}
