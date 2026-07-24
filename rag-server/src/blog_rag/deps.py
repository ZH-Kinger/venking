"""M10:FastAPI 鉴权依赖。

- require_session:读 session cookie → 校验 → 返回 (user, session);无效 401。
- require_admin:在此基础上要求 role==admin;否则 403。
- require_csrf:写操作校验 X-CSRF-Token 与 session 的 csrf_hash 匹配(双提交防 CSRF)。
挂法:`@router.get(..., dependencies=[Depends(require_admin)])` 或注入 `user=Depends(require_admin)`。
"""
from __future__ import annotations

from typing import Annotated

from fastapi import Depends, HTTPException, Request
from sqlalchemy.orm import Session as DBSession

from blog_rag import authn
from blog_rag.db import get_db
from blog_rag.models import Session as SessionModel
from blog_rag.models import User
from blog_rag.security import client_ip  # noqa: F401  (供 auth_routes 复用同一取 IP 逻辑)

SESSION_COOKIE = "blog_rag_session"

# FastAPI 依赖的 Annotated 别名(避免 `= Depends(...)` 默认值,符合 ruff B008 与仓库风格)
DbDep = Annotated[DBSession, Depends(get_db)]
SessionPair = tuple[User, SessionModel]


def require_session(request: Request, db: DbDep) -> tuple[User, SessionModel]:
    token = request.cookies.get(SESSION_COOKIE, "")
    sess = authn.resolve_session(db, token)
    if sess is None:
        raise HTTPException(status_code=401, detail="未登录或会话已失效")
    user = db.get(User, sess.user_id)
    if user is None or user.status != "active":
        raise HTTPException(status_code=401, detail="账号不可用")
    return user, sess


def require_admin(pair: Annotated[SessionPair, Depends(require_session)]) -> User:
    user, _ = pair
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="需要管理员权限")
    return user


def require_csrf(request: Request, pair: Annotated[SessionPair, Depends(require_session)]) -> User:
    """写操作 CSRF 校验:请求头 X-CSRF-Token 必须等于本 session 派生的 csrf 令牌(常量时间比较)。"""
    import secrets as _secrets

    _user, sess = pair
    token = request.headers.get("x-csrf-token", "")
    if not token or not _secrets.compare_digest(token, authn.csrf_token(sess)):
        raise HTTPException(status_code=403, detail="CSRF 校验失败")
    return _user
