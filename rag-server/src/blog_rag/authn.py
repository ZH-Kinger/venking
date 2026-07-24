"""M10:认证原语 —— 密码哈希、session 签发/校验/撤销、CSRF、登录限速。

安全约束(方案 §5):
- 密码 Argon2id(pwdlib);库只存 password_hash。
- session token / csrf 是高熵随机串,浏览器持原始值,**库只存 sha256**。
- 标识/IP 落库前用 HMAC-SHA256(session_secret) 脱敏(identifier_hash / ip_hash 不可逆推)。
- 登录限速:按 IP、按账号双维度各一令牌桶(复用 security.RateLimiter)。
"""
from __future__ import annotations

import hashlib
import hmac
import secrets
from datetime import UTC, datetime, timedelta

from sqlalchemy import select
from sqlalchemy.orm import Session as DBSession

from blog_rag.config import settings
from blog_rag.models import LoginEvent, User
from blog_rag.models import Session as SessionModel
from blog_rag.security import RateLimiter

# ---------- 密码哈希(Argon2id)----------
_pwd = None


def _hasher():
    global _pwd
    if _pwd is None:
        from pwdlib import PasswordHash
        _pwd = PasswordHash.recommended()      # Argon2id
    return _pwd


def hash_password(password: str) -> str:
    return _hasher().hash(password)


def verify_password(password: str, password_hash: str) -> bool:
    try:
        return _hasher().verify(password, password_hash)
    except Exception:
        return False                            # 任何解析异常都视作校验失败(不放行)


# ---------- 哈希工具 ----------
def sha256_hex(value: str) -> str:
    return hashlib.sha256(value.encode("utf-8")).hexdigest()


def hmac_hex(value: str) -> str:
    """脱敏 IP/账号 + 派生 CSRF:HMAC-SHA256(session_secret)。

    生产(非 dev_mode)缺 SESSION_SECRET → **快速失败**,绝不静默回退公开盐(否则 ip_hash/
    identifier_hash 脱敏被公开盐打穿、CSRF 可预测);仅本地 dev_mode 才用固定开发盐。
    """
    secret = settings.session_secret
    if not secret:
        secret = "blog-rag-dev-salt" if settings.dev_mode else settings.require_session_secret()
    return hmac.new(secret.encode("utf-8"), value.encode("utf-8"), hashlib.sha256).hexdigest()


def now_utc() -> datetime:
    return datetime.now(UTC)


# ---------- 登录限速(双维度)----------
_ip_limiter = RateLimiter(settings.login_rate_per_min)
_id_limiter = RateLimiter(settings.login_rate_per_min)


def login_allowed(ip: str, identifier: str) -> bool:
    """IP 与账号任一超限即拒(先判再消耗两个桶各一次)。"""
    return _ip_limiter.allow(f"ip:{ip}") and _id_limiter.allow(f"id:{identifier.lower()}")


# ---------- 用户查询 ----------
def get_user_by_identifier(db: DBSession, identifier: str) -> User | None:
    """按 email 或 username 查(登录允许两者;不区分以防账号枚举时序差异见 auth_routes)。"""
    ident = identifier.strip()
    return db.scalar(
        select(User).where((User.email == ident) | (User.username == ident))
    )


# ---------- Session 签发 / 校验 / 撤销 ----------
def create_session(db: DBSession, user: User, *, ip: str = "", user_agent: str = "") -> tuple[str, SessionModel]:
    """新建 session,返回 (raw_token, session)。cookie 持 raw_token,库只存其 sha256。"""
    raw_token = secrets.token_urlsafe(32)
    sess = SessionModel(
        user_id=user.id,
        token_hash=sha256_hex(raw_token),
        expires_at=now_utc() + timedelta(hours=settings.session_ttl_hours),
        ip_hash=hmac_hex(ip) if ip else None,
        user_agent=(user_agent or "")[:400] or None,
    )
    db.add(sess)
    db.commit()
    return raw_token, sess


def csrf_token(sess: SessionModel) -> str:
    """无状态 CSRF 令牌:HMAC(session_secret, token_hash)。只有服务端(持 secret)能产出;
    绑定具体 session;刷新后可由 GET /api/auth/csrf 随时重算,无需落库。"""
    return hmac_hex(f"csrf:{sess.token_hash}")


def resolve_session(db: DBSession, raw_token: str) -> SessionModel | None:
    """按原始 token 找有效 session(未撤销、未过期);顺带刷新 last_seen_at。"""
    if not raw_token:
        return None
    sess = db.scalar(select(SessionModel).where(SessionModel.token_hash == sha256_hex(raw_token)))
    if sess is None or sess.revoked_at is not None:
        return None
    exp = sess.expires_at
    if exp.tzinfo is None:                       # SQLite 取回可能无 tzinfo,按 UTC 处理
        exp = exp.replace(tzinfo=UTC)
    if exp <= now_utc():
        return None
    sess.last_seen_at = now_utc()
    db.commit()
    return sess


def revoke_session(db: DBSession, sess: SessionModel) -> None:
    sess.revoked_at = now_utc()
    db.commit()


def revoke_all_user_sessions(db: DBSession, user_id) -> int:
    """撤销某用户全部有效 session(改密 / 强制下线用)。返回撤销数。"""
    rows = db.scalars(
        select(SessionModel).where(SessionModel.user_id == user_id, SessionModel.revoked_at.is_(None))
    ).all()
    for s in rows:
        s.revoked_at = now_utc()
    db.commit()
    return len(rows)


# ---------- 审计流水 ----------
def record_login_event(db: DBSession, *, event_type: str, user_id=None,
                       identifier: str = "", ip: str = "") -> None:
    db.add(LoginEvent(
        user_id=user_id,
        identifier_hash=hmac_hex(identifier) if identifier else None,
        event_type=event_type,
        ip_hash=hmac_hex(ip) if ip else None,
    ))
    db.commit()
