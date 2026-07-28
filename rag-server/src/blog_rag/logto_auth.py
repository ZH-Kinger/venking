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

import logging
from typing import Annotated

import jwt
from fastapi import Depends, HTTPException, Request
from jwt import PyJWKClient, PyJWKClientConnectionError, PyJWKClientError

from blog_rag.config import settings

logger = logging.getLogger(__name__)


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


def _jwks_reachable() -> bool:
    """JWKS 现在可用吗?——用于把歧义的 PyJWKClientError 判成 401 还是 503。

    用 `get_signing_keys()` 而不是 `get_jwk_set()`:后者只验"文档取得到",
    而"取得到、但里面的 key 全没有 kid(或 use != sig)"同样是服务端/配置问题,
    此时 get_jwk_set 会成功、判成 401,于是配置故障又伪装成全站无限重登。
    get_signing_keys 内部走 `get_jwk_set(refresh=False)` 缓存,不产生额外网络请求。

    只在错误路径调用。任何异常都算"不可用"(此处只需布尔判断,
    具体原因由调用方用 logger.exception 记)。
    """
    try:
        _client().get_signing_keys()
    except Exception:
        logger.debug("JWKS 探活失败", exc_info=True)
        return False
    return True


def verify_bearer(token: str) -> Identity:
    """校验 access token,返回身份;失败抛 HTTPException(401 坏令牌 / 503 服务故障)。

    401 与 503 的分界线是**谁的错**:
      401 = 调用方拿来的令牌不对(畸形、签名不符、kid 找不到、过期、aud/iss 不匹配)
            → 客户端应重新登录。
      503 = 我方或 Logto 侧出了问题(JWKS 取不到、返回的不是合法 JWKS、配置写错)
            → 客户端应稍后重试,**不该**去重登(重登也没用)。
    把 503 类错误误判成 401 的后果很隐蔽:比如 LOGTO_ENDPOINT 少写 `https://`,
    每个用户都收到"无效或过期的令牌"并陷入无限重登,而日志里一片安静。
    """
    try:
        signing_key = _client().get_signing_key_from_jwt(token).key
    except jwt.InvalidTokenError as e:
        # 令牌本身坏掉:get_signing_key_from_jwt 读 kid 前会先 decode 一次,
        # 畸形串在那步抛 DecodeError(典型是前端把 localStorage 里的字符串
        # "undefined"/"null" 当令牌发上来)。这是 401,不是故障。
        raise HTTPException(status_code=401, detail="无效或过期的令牌") from e
    except PyJWKClientConnectionError as e:
        raise HTTPException(status_code=503, detail="鉴权服务暂不可用，请稍后重试") from e
    except PyJWKClientError as e:
        # 这一支是**歧义**的:既可能是"JWKS 里找不到匹配的 kid"(坏令牌 → 401),
        # 也可能是"JWKS URI scheme 非法"(配置错)或 JWKS 内容异常(服务故障 → 503)。
        #
        # 不靠英文报错串区分(库改文案行为就会翻转),改问一个客观问题:
        # **JWKS 现在到底取不取得到?** 取得到 → 是这个令牌的 kid 不在里面,401;
        # 取不到 → 我方/Logto 的问题,503 并记日志。
        # 只在错误路径上多这一次调用,正常请求零额外开销(且 JWKS 有 300s 缓存)。
        if _jwks_reachable():
            raise HTTPException(status_code=401, detail="无效或过期的令牌") from e
        logger.exception("JWKS 不可用或配置有误,鉴权降级为 503")
        raise HTTPException(status_code=503, detail="鉴权服务暂不可用，请稍后重试") from e
    except (OSError, ValueError) as e:
        # pyjwt 只把 (URLError, TimeoutError) 包成 PyJWKClientConnectionError;
        # JWKS 端点返回非 JSON(前置 nginx/CDN 吐了 HTML 错误页或人机校验页)时,
        # json.load 抛的是 ValueError,会直接穿透成 500。这是服务故障,归 503。
        logger.exception("取 JWKS 失败(响应无法解析或 IO 错误)")
        raise HTTPException(status_code=503, detail="鉴权服务暂不可用，请稍后重试") from e
    except jwt.PyJWTError as e:
        # 兜住 PyJWTError 下**不属于** InvalidTokenError / PyJWKClientError 的旁支 ——
        # 实测这两族是兄弟而非父子,PyJWKSetError("JWK Set 里没有可用密钥")与
        # PyJWKError/MissingCryptographyError(缺 cryptography 后端)都从缝里漏出去,
        # 不接就是 500。它们全是我方/Logto 侧的问题,归 503 并记日志。
        logger.exception("JWKS/密钥处理异常")
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
    return _try_identity(token)


def _try_identity(token: str) -> Identity | None:
    """校验失败一律降级为匿名。

    这里**故意**兜住所有异常,而不只是 HTTPException:本函数的契约是"绝不阻断匿名使用",
    一旦有未预料的异常穿透,受影响的是所有匿名访客(线上出过一次:畸形令牌抛 jwt.DecodeError
    穿透依赖层,/api/chat?access_token=undefined 直接 500)。宁可记一条 warning 降级,
    也不能让登录相关的意外把不登录的人也挡在外面。
    """
    try:
        return verify_bearer(token)
    except HTTPException:
        return None
    except Exception:  # 见上:此处可用性优先于暴露异常(仅限 optional_*,强制登录路径不兜)
        logger.warning("optional auth: 令牌校验意外失败,降级为匿名", exc_info=True)
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
    return _try_identity(token)
