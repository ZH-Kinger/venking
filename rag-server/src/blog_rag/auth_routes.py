"""M10:认证路由 /api/auth/*。

login / logout / me / change-password / csrf。安全:HTTPS 硬闸门(dev_mode 豁免)、登录限速、
账号枚举防护(不区分"不存在/密码错"、未命中也走一次假校验消解时序差异)、HttpOnly+SameSite cookie。
"""
from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Request, Response
from pydantic import BaseModel, Field

from blog_rag import authn
from blog_rag.config import settings
from blog_rag.deps import SESSION_COOKIE, DbDep, SessionPair, require_csrf, require_session
from blog_rag.models import User
from blog_rag.security import client_ip

router = APIRouter(prefix="/api/auth", tags=["auth"])

# 未命中用户时也跑一次哈希校验,消解"存在/不存在"的响应时序差异(防账号枚举)。
_DUMMY_HASH = None


def _dummy_hash() -> str:
    global _DUMMY_HASH
    if _DUMMY_HASH is None:
        _DUMMY_HASH = authn.hash_password("dummy-password-for-timing-equalization")
    return _DUMMY_HASH


def _require_secure(request: Request) -> None:
    """生产硬闸门:非 dev_mode 时,登录必须走 HTTPS(经 nginx 看 X-Forwarded-Proto)。"""
    if settings.dev_mode:
        return
    proto = request.headers.get("x-forwarded-proto") or request.url.scheme
    if proto != "https":
        raise HTTPException(status_code=403, detail="登录需在 HTTPS 下进行")


def _set_session_cookie(response: Response, raw_token: str) -> None:
    response.set_cookie(
        SESSION_COOKIE, raw_token,
        max_age=settings.session_ttl_hours * 3600,
        httponly=True,
        samesite="lax",
        secure=not settings.dev_mode,      # 本地 http 开发不设 Secure;生产必 Secure
        path="/",
    )


def _user_public(user: User) -> dict:
    return {"id": str(user.id), "email": user.email, "username": user.username,
            "role": user.role, "status": user.status,
            "last_login_at": user.last_login_at.isoformat() if user.last_login_at else None}


class LoginIn(BaseModel):
    identifier: str = Field(min_length=1, max_length=320)   # email 或 username
    password: str = Field(min_length=1, max_length=1024)


@router.post("/login")
def login(body: LoginIn, request: Request, response: Response, db: DbDep):
    _require_secure(request)
    ip = client_ip(request)
    if not authn.login_allowed(ip, body.identifier):
        raise HTTPException(status_code=429, detail="登录尝试过于频繁,请稍后再试")

    user = authn.get_user_by_identifier(db, body.identifier)
    ok = authn.verify_password(body.password, user.password_hash if user else _dummy_hash())
    if not user or not ok or user.status != "active":
        authn.record_login_event(db, event_type="login_fail", user_id=user.id if user else None,
                                 identifier=body.identifier, ip=ip)
        raise HTTPException(status_code=401, detail="账号或密码错误")   # 不区分不存在/密码错

    raw_token, sess = authn.create_session(db, user, ip=ip,
                                           user_agent=request.headers.get("user-agent", ""))
    user.last_login_at = authn.now_utc()
    db.commit()
    authn.record_login_event(db, event_type="login_ok", user_id=user.id, identifier=body.identifier, ip=ip)
    _set_session_cookie(response, raw_token)
    return {"user": _user_public(user), "csrf": authn.csrf_token(sess)}


@router.post("/logout")
def logout(response: Response, pair: Annotated[SessionPair, Depends(require_session)], db: DbDep):
    user, sess = pair
    authn.revoke_session(db, sess)
    authn.record_login_event(db, event_type="logout", user_id=user.id)
    response.delete_cookie(SESSION_COOKIE, path="/")
    return {"ok": True}


@router.get("/me")
def me(pair: Annotated[SessionPair, Depends(require_session)]):
    user, sess = pair
    return {"user": _user_public(user), "csrf": authn.csrf_token(sess)}


@router.get("/csrf")
def csrf(pair: Annotated[SessionPair, Depends(require_session)]):
    _user, sess = pair
    return {"csrf": authn.csrf_token(sess)}


class ChangePasswordIn(BaseModel):
    old_password: str = Field(min_length=1, max_length=1024)
    new_password: str = Field(min_length=8, max_length=1024)


@router.post("/change-password")
def change_password(body: ChangePasswordIn, response: Response,
                    _csrf_user: Annotated[User, Depends(require_csrf)],
                    pair: Annotated[SessionPair, Depends(require_session)],
                    db: DbDep):
    user, _sess = pair
    if not authn.verify_password(body.old_password, user.password_hash):
        raise HTTPException(status_code=400, detail="原密码不正确")
    user.password_hash = authn.hash_password(body.new_password)
    db.commit()
    authn.revoke_all_user_sessions(db, user.id)        # 改密 → 全部 session 失效,须重新登录
    authn.record_login_event(db, event_type="password_change", user_id=user.id)
    response.delete_cookie(SESSION_COOKIE, path="/")
    return {"ok": True, "relogin": True}
