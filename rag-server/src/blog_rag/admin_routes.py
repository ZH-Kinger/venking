"""M10:管理后台路由 /api/admin/*(全部要求 admin 登录)。

本轮(P2)实现只读能力:系统状态、审计/登录流水、反馈列表。
文章管理(P3)、用户管理、发布(P4)后续轮次接入(此处不实现)。
"""
from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends, Query
from sqlalchemy import func, select

from blog_rag.config import settings
from blog_rag.db import get_engine
from blog_rag.deps import DbDep, require_admin
from blog_rag.models import AuditLog, LoginEvent, User

# 整组默认要求 admin;各端点再注入 user 便于审计。
router = APIRouter(prefix="/api/admin", tags=["admin"], dependencies=[Depends(require_admin)])


@router.get("/system/health")
def system_health(db: DbDep):
    """系统状态:DB 连通性 + 知识库/数据目录 + API key 就绪(不调付费 API)。"""
    checks: dict[str, bool] = {}
    try:
        db.execute(select(func.count()).select_from(User))
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
        "dev_mode": settings.dev_mode,
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
        "actor_user_id": str(r.actor_user_id) if r.actor_user_id else None,
        "action": r.action,
        "resource_type": r.resource_type,
        "resource_id": r.resource_id,
        "request_id": r.request_id,
        "created_at": r.created_at.isoformat() if r.created_at else None,
    } for r in rows]
    return {"total": total, "limit": limit, "offset": offset, "items": items}


@router.get("/login-events")
def login_events(
    db: DbDep,
    limit: Annotated[int, Query(ge=1, le=200)] = 50,
    offset: Annotated[int, Query(ge=0)] = 0,
):
    total = db.scalar(select(func.count()).select_from(LoginEvent)) or 0
    rows = db.scalars(
        select(LoginEvent).order_by(LoginEvent.created_at.desc()).limit(limit).offset(offset)
    ).all()
    items = [{
        "id": str(r.id),
        "event_type": r.event_type,
        "user_id": str(r.user_id) if r.user_id else None,
        "created_at": r.created_at.isoformat() if r.created_at else None,
    } for r in rows]
    return {"total": total, "limit": limit, "offset": offset, "items": items}


@router.get("/feedback")
def feedback_list(limit: Annotated[int, Query(ge=1, le=500)] = 100):
    """只读展示 👍👎 反馈(复用 feedback.load_feedback();最新在前)。"""
    from blog_rag.feedback import load_feedback
    items = load_feedback()
    items = list(reversed(items))[:limit]
    return {"total": len(items), "items": items}
