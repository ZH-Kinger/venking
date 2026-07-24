"""M10 P1:登录 + 管理后台认证(TestClient 全栈,内存 SQLite,离线自包含)。

覆盖:密码哈希、session 生命周期、RBAC(401/403)、CSRF、登录限速、账号枚举防护、
改密使所有旧 session 失效、审计流水。DB 用内存 SQLite(模型可移植),不需跑着的 PG。
"""
from __future__ import annotations

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from blog_rag import authn
from blog_rag.api import app
from blog_rag.config import settings
from blog_rag.db import get_db
from blog_rag.models import Base, User
from blog_rag.security import RateLimiter


@pytest.fixture
def client(monkeypatch):
    # 内存 SQLite + StaticPool:单连接共享,多 session 见同一份数据。
    engine = create_engine("sqlite://", connect_args={"check_same_thread": False}, poolclass=StaticPool)
    Base.metadata.create_all(engine)
    TestSession = sessionmaker(bind=engine, expire_on_commit=False)

    def _override_db():
        db = TestSession()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = _override_db
    monkeypatch.setattr(settings, "session_secret", "test-secret-xxxxxxxxxxxxxxxxxxxx")
    monkeypatch.setattr(settings, "dev_mode", True)          # 免 HTTPS 闸门 + 非 Secure cookie
    # 每测重置登录限速器,避免跨测 429
    monkeypatch.setattr(authn, "_ip_limiter", RateLimiter(10_000))
    monkeypatch.setattr(authn, "_id_limiter", RateLimiter(10_000))

    # 建一个管理员
    with TestSession() as db:
        db.add(User(email="a@b.co", username="admin", role="admin",
                    password_hash=authn.hash_password("Secret12345")))
        db.commit()

    with TestClient(app) as c:
        c._TestSession = TestSession  # 方便个别测试直连库
        yield c
    app.dependency_overrides.clear()


def _login(client, identifier="admin", password="Secret12345"):
    return client.post("/api/auth/login", json={"identifier": identifier, "password": password})


# ---------- 密码哈希(纯单元)----------
def test_password_hash_roundtrip():
    h = authn.hash_password("hunter2!!")
    assert h != "hunter2!!" and authn.verify_password("hunter2!!", h)
    assert not authn.verify_password("wrong", h)
    assert not authn.verify_password("x", "not-a-valid-hash")   # 坏 hash 不抛、判否


# ---------- RBAC ----------
def test_admin_requires_auth(client):
    assert client.get("/api/admin/system/health").status_code == 401


def test_non_admin_forbidden(client):
    with client._TestSession() as db:
        db.add(User(email="e@b.co", username="editor", role="editor",
                    password_hash=authn.hash_password("Secret12345")))
        db.commit()
    _login(client, "editor")
    assert client.get("/api/admin/system/health").status_code == 403   # 登录了但非 admin


def test_login_and_access_admin(client):
    r = _login(client)
    assert r.status_code == 200
    body = r.json()
    assert body["user"]["role"] == "admin" and body["csrf"]
    # cookie 应为 HttpOnly
    set_cookie = r.headers.get("set-cookie", "")
    assert "httponly" in set_cookie.lower()
    assert client.get("/api/admin/system/health").json()["checks"]["database"] is True


# ---------- 账号枚举防护 ----------
def test_login_wrong_password_and_unknown_user_same_response(client):
    r1 = client.post("/api/auth/login", json={"identifier": "admin", "password": "bad"})
    r2 = client.post("/api/auth/login", json={"identifier": "ghost", "password": "bad"})
    assert r1.status_code == r2.status_code == 401
    assert r1.json()["detail"] == r2.json()["detail"]   # 不区分"不存在/密码错"


# ---------- CSRF ----------
def test_change_password_requires_csrf(client):
    _login(client)
    # 无 CSRF 头 → 403
    assert client.post("/api/auth/change-password",
                       json={"old_password": "Secret12345", "new_password": "Newpass12345"}).status_code == 403
    csrf = client.get("/api/auth/csrf").json()["csrf"]
    r = client.post("/api/auth/change-password",
                    headers={"X-CSRF-Token": csrf},
                    json={"old_password": "Secret12345", "new_password": "Newpass12345"})
    assert r.status_code == 200 and r.json().get("relogin") is True


def test_change_password_revokes_all_sessions(client):
    _login(client)
    csrf = client.get("/api/auth/csrf").json()["csrf"]
    assert client.get("/api/auth/me").status_code == 200
    client.post("/api/auth/change-password", headers={"X-CSRF-Token": csrf},
                json={"old_password": "Secret12345", "new_password": "Newpass12345"})
    assert client.get("/api/auth/me").status_code == 401   # 旧 session 已失效


# ---------- session 生命周期 ----------
def test_logout_invalidates_session(client):
    _login(client)
    assert client.get("/api/auth/me").status_code == 200
    client.post("/api/auth/logout")
    assert client.get("/api/auth/me").status_code == 401


def test_expired_session_rejected(client, monkeypatch):
    _login(client)
    # 把 TTL 设成负数并新建一个 session 直接验证 resolve 逻辑
    with client._TestSession() as db:
        user = db.query(User).first()
        monkeypatch.setattr(settings, "session_ttl_hours", -1)
        raw, _sess = authn.create_session(db, user)
        assert authn.resolve_session(db, raw) is None      # 已过期 → 解析为 None


# ---------- 登录限速 ----------
def test_login_rate_limited(client, monkeypatch):
    monkeypatch.setattr(authn, "_ip_limiter", RateLimiter(3))
    monkeypatch.setattr(authn, "_id_limiter", RateLimiter(3))
    codes = [client.post("/api/auth/login", json={"identifier": "admin", "password": "bad"}).status_code
             for _ in range(6)]
    assert 429 in codes            # 超过阈值后被限流


# ---------- 生产必须有 SESSION_SECRET(不静默回退公开盐)----------
def test_session_secret_required_in_prod(monkeypatch):
    monkeypatch.setattr(settings, "session_secret", "")
    monkeypatch.setattr(settings, "dev_mode", False)
    with pytest.raises(RuntimeError):
        authn.hmac_hex("1.2.3.4")          # 生产缺 secret → 快速失败
    monkeypatch.setattr(settings, "dev_mode", True)
    assert authn.hmac_hex("1.2.3.4")       # 本地 dev 回退开发盐,不抛


# ---------- CSRF 令牌绑定 session ----------
def test_csrf_token_is_session_bound():
    from blog_rag.models import Session as S
    s1 = S(token_hash="a" * 64)
    s2 = S(token_hash="b" * 64)
    assert authn.csrf_token(s1) != authn.csrf_token(s2)
    assert authn.csrf_token(s1) == authn.csrf_token(s1)     # 确定性
