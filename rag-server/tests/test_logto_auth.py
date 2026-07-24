"""Logto OIDC 资源服务器令牌校验(logto_auth.py)—— 零网络/零 live-Logto。

自造 RSA 密钥对 + 本地 jwt.encode 签发 access token,monkeypatch `_client()` 让
`get_signing_key_from_jwt(token).key` 返回我方公钥,从而完整走 verify_bearer 的
验签 + iss/aud/exp/sub 校验 + 算法白名单(杜绝 alg=none)分支。

同时覆盖 require_admin(403/放行)与 optional_user_sse(?access_token= 兜底 / 匿名 None)。
"""
from __future__ import annotations

import time
from types import SimpleNamespace

import jwt
import pytest
from cryptography.hazmat.primitives.asymmetric import rsa
from fastapi import HTTPException

from blog_rag import logto_auth
from blog_rag.logto_auth import (
    Identity,
    optional_user,
    optional_user_sse,
    require_admin,
    require_user,
    verify_bearer,
)

# ---- 测试固定的 IAM 配置(与真实环境无关) ----
API_RESOURCE = "https://api.test.local"
ENDPOINT = "https://logto.test.local"
ISSUER = f"{ENDPOINT}/oidc"
ADMIN_SCOPE = "admin"

# 一次性生成密钥对(慢,复用);_WRONG 用于伪造"被篡改/异钥"签名。
_KEY = rsa.generate_private_key(public_exponent=65537, key_size=2048)
_WRONG = rsa.generate_private_key(public_exponent=65537, key_size=2048)


def _mint(private_key=_KEY, alg: str = "RS256", **overrides) -> str:
    """签发一枚 token;overrides 可覆盖/删除(值为 None 且 pop)标准 claim。"""
    now = int(time.time())
    payload = {
        "sub": "user_abc",
        "iss": ISSUER,
        "aud": API_RESOURCE,
        "exp": now + 3600,
        "iat": now,
        "scope": "read write",
        "roles": [],
    }
    for k, v in overrides.items():
        if v is _DELETE:
            payload.pop(k, None)
        else:
            payload[k] = v
    if alg == "none":
        return jwt.encode(payload, key=None, algorithm="none")
    return jwt.encode(payload, private_key, algorithm=alg)


_DELETE = object()


@pytest.fixture(autouse=True)
def _iam_env(monkeypatch):
    """把 IAM 配置钉到测试值,并让 JWKS 客户端返回我方公钥(不触网)。"""
    monkeypatch.setattr(logto_auth.settings, "logto_api_resource", API_RESOURCE)
    monkeypatch.setattr(logto_auth.settings, "logto_endpoint", ENDPOINT)
    monkeypatch.setattr(logto_auth.settings, "logto_admin_scope", ADMIN_SCOPE)

    fake_client = SimpleNamespace(
        get_signing_key_from_jwt=lambda token: SimpleNamespace(key=_KEY.public_key())
    )
    monkeypatch.setattr(logto_auth, "_client", lambda: fake_client)
    # 确保没有残留的真实全局客户端影响(_client 已被替换,这里防御性清零)。
    monkeypatch.setattr(logto_auth, "_jwk_client", None, raising=False)


def _fake_request(*, auth: str | None = None, query: dict | None = None):
    """最小化 Request 替身:_bearer 只用 .headers.get,SSE 只用 .query_params.get。"""
    headers = {}
    if auth is not None:
        headers["authorization"] = auth
    return SimpleNamespace(headers=headers, query_params=(query or {}))


# ---------------- 1. verify_bearer 正/反用例 ----------------

def test_valid_token_yields_identity():
    ident = verify_bearer(_mint(sub="user_xyz", scope="read admin extra", roles=["editor"]))
    assert isinstance(ident, Identity)
    assert ident.sub == "user_xyz"
    assert ident.scopes == ["read", "admin", "extra"]
    assert ident.roles == ["editor"]
    assert ident.claims["iss"] == ISSUER


def test_scope_absent_gives_empty_scopes_and_roles():
    ident = verify_bearer(_mint(scope=_DELETE, roles=_DELETE))
    assert ident.scopes == []
    assert ident.roles == []


def test_expired_token_401():
    now = int(time.time())
    tok = _mint(exp=now - 10, iat=now - 3600)
    with pytest.raises(HTTPException) as ei:
        verify_bearer(tok)
    assert ei.value.status_code == 401


def test_wrong_audience_401():
    with pytest.raises(HTTPException) as ei:
        verify_bearer(_mint(aud="https://someone-else.example"))
    assert ei.value.status_code == 401


def test_wrong_issuer_401():
    with pytest.raises(HTTPException) as ei:
        verify_bearer(_mint(iss="https://evil.example/oidc"))
    assert ei.value.status_code == 401


def test_missing_sub_401():
    with pytest.raises(HTTPException) as ei:
        verify_bearer(_mint(sub=_DELETE))
    assert ei.value.status_code == 401


def test_missing_exp_401():
    # options.require 含 exp;缺 exp 应被拒(防止"永不过期"令牌)。
    with pytest.raises(HTTPException) as ei:
        verify_bearer(_mint(exp=_DELETE))
    assert ei.value.status_code == 401


def test_alg_none_rejected_401():
    """alg=none 必须被算法白名单拒绝(经典 OIDC 绕过攻击)。"""
    tok = _mint(alg="none")
    with pytest.raises(HTTPException) as ei:
        verify_bearer(tok)
    assert ei.value.status_code == 401


def test_wrong_signing_key_401():
    """用异钥签名(等价于篡改)→ 验签失败 401。"""
    tok = _mint(private_key=_WRONG)
    with pytest.raises(HTTPException) as ei:
        verify_bearer(tok)
    assert ei.value.status_code == 401


def test_tampered_payload_401():
    """改动 payload 段但保留原签名 → 验签失败 401。"""
    tok = _mint()
    head, _payload, sig = tok.split(".")
    # 换一个明显不同的合法 base64url payload 段。
    import base64
    import json
    forged = base64.urlsafe_b64encode(
        json.dumps({"sub": "attacker", "aud": API_RESOURCE, "iss": ISSUER}).encode()
    ).rstrip(b"=").decode()
    with pytest.raises(HTTPException) as ei:
        verify_bearer(f"{head}.{forged}.{sig}")
    assert ei.value.status_code == 401


# ---------------- 2. 依赖:require_user / require_admin ----------------

def test_require_user_no_bearer_401():
    with pytest.raises(HTTPException) as ei:
        require_user(_fake_request(auth=None))
    assert ei.value.status_code == 401


def test_require_user_valid_bearer():
    ident = require_user(_fake_request(auth=f"Bearer {_mint(sub='u1')}"))
    assert ident.sub == "u1"


def test_require_user_bearer_case_insensitive():
    ident = require_user(_fake_request(auth=f"bearer {_mint(sub='u2')}"))
    assert ident.sub == "u2"


def test_require_admin_via_scope_passes():
    admin = Identity(sub="a", scopes=["read", ADMIN_SCOPE], roles=[], claims={})
    assert require_admin(admin) is admin


def test_require_admin_via_role_passes():
    admin = Identity(sub="a", scopes=["read"], roles=["admin"], claims={})
    assert require_admin(admin) is admin


def test_require_admin_non_admin_403():
    plain = Identity(sub="a", scopes=["read", "write"], roles=["editor"], claims={})
    assert plain.is_admin is False
    with pytest.raises(HTTPException) as ei:
        require_admin(plain)
    assert ei.value.status_code == 403


# ---------------- 3. optional_user / optional_user_sse ----------------

def test_optional_user_anonymous_none():
    assert optional_user(_fake_request(auth=None)) is None


def test_optional_user_bad_token_none():
    # 无效令牌不阻断匿名使用 → None(而非 401)。
    assert optional_user(_fake_request(auth="Bearer garbage.token.here")) is None


def test_optional_user_valid_identity():
    ident = optional_user(_fake_request(auth=f"Bearer {_mint(sub='ou')}"))
    assert ident is not None and ident.sub == "ou"


def test_sse_token_in_query_resolves():
    req = _fake_request(query={"access_token": _mint(sub="sse_user")})
    ident = optional_user_sse(req)
    assert ident is not None and ident.sub == "sse_user"


def test_sse_header_takes_precedence_over_query():
    # 头里有有效 token 时优先用头(query 给个坏的也不影响)。
    req = _fake_request(auth=f"Bearer {_mint(sub='hdr')}", query={"access_token": "junk"})
    assert optional_user_sse(req).sub == "hdr"


def test_sse_no_token_none():
    assert optional_user_sse(_fake_request(auth=None, query={})) is None


def test_sse_bad_query_token_none():
    req = _fake_request(query={"access_token": "not.a.jwt"})
    assert optional_user_sse(req) is None
