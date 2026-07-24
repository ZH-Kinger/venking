"""当前用户 API /api/me/*(需 Logto 登录)——个人 AI 对话历史,跨设备可见。"""
from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session as DBSession

from blog_rag import history
from blog_rag.db import get_db
from blog_rag.logto_auth import Identity, require_user

DbDep = Annotated[DBSession, Depends(get_db)]
UserDep = Annotated[Identity, Depends(require_user)]

router = APIRouter(prefix="/api/me", tags=["me"])


@router.get("")
def me(user: UserDep):
    """当前登录用户(来自 Logto token 的 sub + 部分 claims)。"""
    c = user.claims
    return {"sub": user.sub, "is_admin": user.is_admin,
            "username": c.get("username") or c.get("name"), "email": c.get("email")}


@router.get("/conversations")
def my_conversations(
    user: UserDep, db: DbDep,
    limit: Annotated[int, Query(ge=1, le=200)] = 50,
    offset: Annotated[int, Query(ge=0)] = 0,
):
    return {"items": history.list_conversations(db, user.sub, limit, offset)}


@router.get("/conversations/{conv_id}")
def my_conversation(user: UserDep, db: DbDep, conv_id: str):
    data = history.get_conversation(db, user.sub, conv_id)
    if data is None:
        raise HTTPException(status_code=404, detail="对话不存在")   # 按 sub 隔离,不泄露他人
    return data
