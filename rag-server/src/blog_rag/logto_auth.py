"""Logto OIDC 令牌校验(资源服务器侧)——取代自建 session/CSRF。

后端不再管登录(交给 Logto 托管),只校验前端带来的 access token(JWT):
- JWKS 从 `{issuer}/jwks` 取(PyJWKClient 缓存 + 自动轮换);
- 验签 + `iss` + `aud`(我方 API resource)+ `exp`;算法白名单(RS256/ES*,杜绝 alg=none);
- 取 `sub`(稳定 user_id,绑 AI 历史)+ 授权信息(Logto API-resource token 用 `scope` 权限位;
  兼容 `roles` claim)。管理员端点要求 `admin` 权限。

FastAPI 依赖:
- require_user   有效 token,否则 401
- require_admin  且具 admin 权限,否则 403
- optional_user  匿名放行(未登录=None;登录=Identity)——AI 前端未登录仍可用
"""
from __future__ import annotations

from typing import Annotated

import jwt
from fastapi import Depends, HTTPException, Request
from jwt import PyJWKClient, PyJWKClientError

from blog_rag.config import settings


# Logto OIDC issuer = ENDPOINT/oidc(见 discovery)
def _issuer() -> str:
    return f"{settings.logto_endpoint.rstrip('/')}/oidc"


_jwk_client: PyJWKClient | None = None


def _client() -> PyJWKClient:
    global _jwk_client
    if _jwk_client is None:
        # cache_jwk_set(默认 300s)已缓存 JWKS 文档;单键不再永久缓存(cache_keys=False),
        # 使密钥吊销在 ≤300s 内生效(否则被缓存的 kid 直到进程重启仍被接受)。
        _jwk_client = PyJWKClient(f"{_issuer()}/jwks", cache_keys=False)
    return _jwk_client


class Identity:
    """已校验的调用者身份。"""

    def __init__(self, sub: str, scopes: list[str], roles: list[str], claims: dict) -> None:
        self.sub = sub
        self.scopes = scopes
        self.roles = roles
        self.claims = claims

    @property
    def is_admin(self) -> bool:
        # 兼容两种 Logto RBAC 配置:API-resource 权限位 `admin`,或 `roles` 里含 admin。
        return settings.logto_admin_scope in self.scopes or "admin" in self.roles


def verify_bearer(token: str) -> Identity:
    # JWKS 取键失败(Logto/网络不可达)是**服务不可用**,不是坏令牌 → 503,别误导成 401。
    try:
        signing_key = _client().get_signing_key_from_jwt(token).key
    except PyJWKClientError as e:
        raise HTTPException(status_code=503, detail="鉴权服务暂不可用，请稍后重试") from e
    try:
        claims = jwt.decode(
            token,
            signing_key,
            algorithms=["RS256", "ES256", "ES384", "ES512"],   # 白名单,禁 none
            audience=settings.logto_api_resource,
            issuer=_issuer(),
            options={"require": ["exp", "iss", "aud", "sub"]},
        )
    except jwt.PyJWTError as e:
        raise HTTPException(status_code=401, detail="无效或过期的令牌") from e
    scope = claims.get("scope") or ""
    roles = claims.get("roles") or []
    return Identity(sub=claims["sub"], scopes=scope.split(), roles=list(roles), claims=claims)


def _bearer(request: Request) -> str | None:
    auth = request.headers.get("authorization", "")
    return auth[7:].strip() if auth[:7].lower() == "bearer " else None


def require_user(request: Request) -> Identity:
    token = _bearer(request)
    if not token:
        raise HTTPException(status_code=401, detail="未登录")
    return verify_bearer(token)


def require_admin(user: Annotated[Identity, Depends(require_user)]) -> Identity:
    if not user.is_admin:
        raise HTTPException(status_code=403, detail="需要管理员权限")
    return user


def optional_user(request: Request) -> Identity | None:
    """匿名放行:无 token→None;有效 token→Identity;无效 token→None(不阻断匿名使用)。"""
    token = _bearer(request)
    if not token:
        return None
    try:
        return verify_bearer(token)
    except HTTPException:
        return None


def optional_user_sse(request: Request) -> Identity | None:
    """SSE/EventSource 专用匿名放行。

    浏览器 EventSource 不能设 Authorization 头,故额外允许 `?access_token=` 兜底
    (仅用于绑定登录用户历史;令牌为短时 Logto access token,生产走 HTTPS)。
    无 token→None(匿名照常可用);无效 token→None(不阻断匿名)。
    """
    token = _bearer(request) or request.query_params.get("access_token")
    if not token:
        return None
    try:
        return verify_bearer(token)
    except HTTPException:
        return None
