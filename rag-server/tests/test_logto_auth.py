"""Logto OIDC 资源服务器令牌校验(logto_auth.py)—— 零外网/零 live-Logto。

自造 RSA 密钥对 + 本地 jwt.encode 签发 access token,monkeypatch `_client()` 让
`get_signing_key_from_jwt(token).key` 返回我方公钥,从而完整走 verify_bearer 的
验签 + iss/aud/exp/sub 校验 + 算法白名单(杜绝 alg=none)分支。

同时覆盖 require_admin(403/放行)与 optional_user_sse(?access_token= 兜底 / 匿名 None)。

401 与 503 的分界线是**谁的错**:令牌不对=401(客户端该重登),我方/Logto 出问题=503
(重登也没用)。误判成 401 的事故很隐蔽 —— 全站每个用户都"无效或过���的令牌"+ 无限重登,
日志却一片安静。第 4、7、8 节专门盯这条分界线;第 8 节用**真实 pyjwt + 本地 HTTP JWKS
端点**跑,避免我们的替身把库的真实行为假设错(替身写得再像也只是我们以为的样子)。
"""
from __future__ import annotations

import base64
import json
import socketserver
import threading
import time
import urllib.request
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from types import SimpleNamespace

import jwt
import pytest
from cryptography.hazmat.primitives.asymmetric import rsa
from fastapi import HTTPException
from jwt import PyJWKClientConnectionError, PyJWKClientError
from jwt.exceptions import (
    DecodeError,
    InvalidTokenError,
    MissingCryptographyError,
    PyJWKError,
    PyJWKSetError,
)

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

# 未被替身覆盖的真实 `_client`,第 8 节要用它跑真实 PyJWKClient。
_REAL_CLIENT = logto_auth._client

# 一次性生成密钥对(慢,复用);_WRONG 用于伪造"被篡改/异钥"签名。
_KEY = rsa.generate_private_key(public_exponent=65537, key_size=2048)
_WRONG = rsa.generate_private_key(public_exponent=65537, key_size=2048)


def _mint(private_key=_KEY, alg: str = "RS256", headers: dict | None = None, **overrides) -> str:
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
        return jwt.encode(payload, key=None, algorithm="none", headers=headers)
    return jwt.encode(payload, private_key, algorithm=alg, headers=headers)


_DELETE = object()


@pytest.fixture(autouse=True)
def _iam_env(monkeypatch):
    """把 IAM 配置钉到测试值,并让 JWKS 客户端返回我方公钥(不触网)。"""
    monkeypatch.setattr(logto_auth.settings, "logto_api_resource", API_RESOURCE)
    monkeypatch.setattr(logto_auth.settings, "logto_endpoint", ENDPOINT)
    monkeypatch.setattr(logto_auth.settings, "logto_admin_scope", ADMIN_SCOPE)

    monkeypatch.setattr(logto_auth, "_client", lambda: _FakeJWKS())
    # 确保没有残留的真实全局客户端影响(_client 已被替换,这里防御性清零)。
    monkeypatch.setattr(logto_auth, "_jwk_client", None, raising=False)


def _fake_request(*, auth: str | None = None, query: dict | None = None):
    """最小化 Request 替身:_bearer 只用 .headers.get,SSE 只用 .query_params.get。"""
    headers = {}
    if auth is not None:
        headers["authorization"] = auth
    return SimpleNamespace(headers=headers, query_params=(query or {}))


class _FakeJWKS:
    """可控的 JWKS 客户端替身。

    三个维度**互相独立**,这正是新实现区分 401/503 的依据:
      - `key_error`:取签名密钥时抛什么(kid 不匹配 / 配置写错 / 密钥损坏 / 畸形令牌)
      - `jwks_error`:JWKS 整体取不到时抛什么(None = 端点是通的)
      - `no_signing_keys`:JWKS **文档取得到、但里面没有可用签名密钥**(key 全无 kid
        或 use != sig)。这一档单独存在,因为它正是"配置故障伪装成 401"的洞:
        `get_jwk_set()` 成功而 `get_signing_keys()` 失败,探活若只看前者就会误判。
    歧义的 PyJWKClientError 靠"JWKS 现在可不可用"落地成 401 还是 503,
    所以这几个维度必须能单独摆布,不能绑死。
    """

    _NO_KEYS = PyJWKClientError("The JWKS endpoint did not contain any signing keys")

    def __init__(
        self,
        key_error: Exception | None = None,
        jwks_error: Exception | None = None,
        no_signing_keys: bool = False,
    ):
        self.key_error = key_error
        self.jwks_error = jwks_error
        self.no_signing_keys = no_signing_keys
        self.signing_key_calls = 0
        self.jwk_set_calls = 0
        self.signing_keys_calls = 0

    def get_signing_key_from_jwt(self, token):
        self.signing_key_calls += 1
        if self.key_error is not None:
            raise self.key_error
        return SimpleNamespace(key=_KEY.public_key())

    def get_jwk_set(self, refresh: bool = False):
        self.jwk_set_calls += 1
        if self.jwks_error is not None:
            raise self.jwks_error
        # 注意:no_signing_keys 时**这一步照样成功** —— 文档是取到了,只是没有可用密钥。
        return SimpleNamespace(keys=[SimpleNamespace(key_id="k1")])

    def get_signing_keys(self, refresh: bool = False):
        self.signing_keys_calls += 1
        if self.jwks_error is not None:
            raise self.jwks_error
        if self.no_signing_keys:
            raise self._NO_KEYS
        return [SimpleNamespace(key_id="k1")]


def _install(monkeypatch, fake: _FakeJWKS) -> _FakeJWKS:
    monkeypatch.setattr(logto_auth, "_client", lambda: fake)
    return fake


def _client_raising(
    monkeypatch,
    exc: Exception,
    *,
    jwks_error: Exception | None = None,
    no_signing_keys: bool = False,
):
    """取密钥时抛 exc;默认 JWKS 本身是健康的(探活成功)。返回替身以便断言调用次数。"""
    return _install(
        monkeypatch,
        _FakeJWKS(key_error=exc, jwks_error=jwks_error, no_signing_keys=no_signing_keys),
    )


_JWKS_DOWN = PyJWKClientConnectionError("Fail to fetch data from the url")


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


# ---------------- 4. 取签名密钥失败的分流(401 坏令牌 vs 503 我方故障)----------------
#
# 分界线是**谁的错**,不是"哪个异常类":
#   401 = 调用方的令牌不对(畸形串、kid 不在 JWKS 里)→ 客户端该重新登录;
#   503 = 我方/Logto 出问题(JWKS 取不到、返回的不是合法 JWKS、URI 配置写错)
#         → 客户端重登也没用,应稍后重试,而且我们要在日志里看得见。
# PyJWKClientError 这一支两种可能都有,靠"JWKS 现在取不取得到"落地,
# **不能**靠匹配英文报错串(库改文案行为就翻转)。

def test_jwks_connection_error_503(monkeypatch):
    """取 JWKS 的网络请求失败 → 503(可重试),不是用户的令牌问题。"""
    _client_raising(monkeypatch, PyJWKClientConnectionError("Fail to fetch data from the url"))
    with pytest.raises(HTTPException) as ei:
        verify_bearer(_mint())
    assert ei.value.status_code == 503


def test_jwks_kid_not_found_401(monkeypatch):
    """JWKS 可用、只是没有匹配的 kid(密钥轮换后的旧令牌 / 伪造头)→ 401。"""
    fake = _client_raising(
        monkeypatch, PyJWKClientError('Unable to find a signing key that matches: "abc"')
    )
    with pytest.raises(HTTPException) as ei:
        verify_bearer(_mint())
    assert ei.value.status_code == 401
    assert fake.signing_keys_calls == 1, "歧义分支应当探活 JWKS 后再判定,而不是直接猜"


def test_jwks_reachable_but_no_signing_keys_503(monkeypatch, caplog):
    """JWKS 文档取得到,但里面没有一个可用签名密钥(key 全无 kid / use != sig)。

    这是"配置故障伪装成 401"最隐蔽的一档:`get_jwk_set()` 是成功的,探活若只看它
    就会判 401 → 全站每个用户无限重登且零 error 日志。探活必须用 `get_signing_keys()`。
    """
    fake = _client_raising(
        monkeypatch,
        PyJWKClientError("The JWKS endpoint did not contain any signing keys"),
        no_signing_keys=True,
    )
    with caplog.at_level("ERROR", logger="blog_rag.logto_auth"), pytest.raises(HTTPException) as ei:
        verify_bearer(_mint())
    assert ei.value.status_code == 503, "JWKS 里没有可用签名密钥是服务端问题,不是坏令牌"
    assert fake.signing_keys_calls == 1
    assert any(r.exc_info for r in caplog.records), "503 分支必须留日志"


def test_ambiguous_jwks_error_with_unreachable_jwks_503(monkeypatch, caplog):
    """同样是 PyJWKClientError,但 JWKS 探活失败 → 这是我方故障,503 且必须留日志。

    ("JWK Set 里没有可用密钥"这类消息语义上就是服务端问题,旧实现一律 401 是错的。)
    """
    _client_raising(
        monkeypatch,
        PyJWKClientError("The JWK Set did not contain any keys"),
        jwks_error=_JWKS_DOWN,
    )
    with caplog.at_level("ERROR", logger="blog_rag.logto_auth"), pytest.raises(HTTPException) as ei:
        verify_bearer(_mint())
    assert ei.value.status_code == 503
    assert any(r.exc_info for r in caplog.records), "503 分支必须 logger.exception,不能静默"


@pytest.mark.parametrize("msg", ["", "密钥对不上", "🙈", "Unable to find a signing key"])
def test_classification_does_not_depend_on_error_message(monkeypatch, msg):
    """钉死"不靠报错串":消息是什么都无所谓,JWKS 探活成功就判 401。"""
    _client_raising(monkeypatch, PyJWKClientError(msg))
    with pytest.raises(HTTPException) as ei:
        verify_bearer(_mint())
    assert ei.value.status_code == 401


def test_kid_message_but_jwks_unreachable_is_503(monkeypatch):
    """反向钉死:报错串写着"找不到 kid",但 JWKS 取不到 → 仍判 503。

    这条和上一条互为对照 —— 若有人把实现改回 `"Unable to find" in str(e)`,必有一条会红。
    """
    _client_raising(
        monkeypatch,
        PyJWKClientError('Unable to find a signing key that matches: "abc"'),
        jwks_error=_JWKS_DOWN,
    )
    with pytest.raises(HTTPException) as ei:
        verify_bearer(_mint())
    assert ei.value.status_code == 503


def test_connection_error_is_subclass_so_except_order_matters(monkeypatch):
    """对抗用例:PyJWKClientConnectionError 是 PyJWKClientError 的子类。

    若 except 顺序写反(先 catch 基类),连接失败会被送进歧义分支 —— 这条钉死顺序。
    """
    assert issubclass(PyJWKClientConnectionError, PyJWKClientError)
    fake = _client_raising(monkeypatch, PyJWKClientConnectionError("connection refused"))
    with pytest.raises(HTTPException) as ei:
        verify_bearer(_mint())
    assert ei.value.status_code == 503, "子类被基类分支吞掉了(except 顺序写反)"
    assert fake.signing_keys_calls == 0, "已经明确是连接失败,不该再多探活一次"


def test_exception_hierarchy_assumptions_still_hold():
    """钉死实现所依赖的 pyjwt 异常谱系 —— 升级 pyjwt 若改了继承关系,这里先红。

    这些不是"显然"的:PyJWKSetError / PyJWKError / PyJWKClientError 三族是
    **兄弟**而非父子,谁都不是 InvalidTokenError 的子类,所以只接 InvalidTokenError
    会漏,只接 PyJWKClientError 也会漏。
    """
    assert issubclass(DecodeError, InvalidTokenError)          # 畸形串走 401 分支的前提
    assert not issubclass(PyJWKClientError, InvalidTokenError)  # 否则全被 401 分支吞掉
    assert not issubclass(PyJWKSetError, InvalidTokenError)
    assert not issubclass(PyJWKError, InvalidTokenError)
    assert issubclass(PyJWKClientConnectionError, PyJWKClientError)
    assert issubclass(MissingCryptographyError, PyJWKError)
    assert issubclass(json.JSONDecodeError, ValueError)         # 非 JSON 响应走 ValueError 分支
    for cls in (PyJWKSetError, PyJWKError, PyJWKClientError, InvalidTokenError):
        assert issubclass(cls, jwt.PyJWTError), f"{cls.__name__} 脱离 PyJWTError 兜底"


@pytest.mark.parametrize(
    ("exc", "label"),
    [
        (PyJWKSetError("The JWK Set did not contain any keys"), "JWKS 里没有可用密钥"),
        (MissingCryptographyError("cryptography is required"), "缺 cryptography 后端"),
        (json.JSONDecodeError("Expecting value", "<html>", 0), "JWKS 端点返回了 HTML"),
        (ValueError("boom"), "裸 ValueError"),
        (OSError("socket blew up"), "IO 错误"),
    ],
)
def test_server_side_failures_are_503_with_log(monkeypatch, caplog, exc, label):
    """这几类以前要么穿透成 500、要么被误判成 401,现在统一 503 + 日志。"""
    _client_raising(monkeypatch, exc)
    with caplog.at_level("ERROR", logger="blog_rag.logto_auth"), pytest.raises(HTTPException) as ei:
        verify_bearer(_mint())
    assert ei.value.status_code == 503, f"{label} 被误判成 {ei.value.status_code}"
    assert any(r.exc_info for r in caplog.records), f"{label} 走 503 却没留日志"


def test_missing_scheme_in_logto_endpoint_is_503_not_401(monkeypatch, caplog):
    """现实事故:LOGTO_ENDPOINT 少写 `https://` → PyJWKClient 构造就抛 PyJWKClientError。

    旧实现判 401 → **每个用户**都收到"无效或过期的令牌"并陷入无限重登,日志一片安静;
    正确行为是 503 + 日志(重登救不了配置错误)。这里用**真实** PyJWKClient,
    因为要覆盖的正是它构造函数里的 scheme 校验。
    """
    monkeypatch.setattr(logto_auth.settings, "logto_endpoint", "auth.venking.tech")
    monkeypatch.setattr(logto_auth, "_client", _REAL_CLIENT)
    monkeypatch.setattr(logto_auth, "_jwk_client", None)
    with caplog.at_level("ERROR", logger="blog_rag.logto_auth"), pytest.raises(HTTPException) as ei:
        verify_bearer(_mint(headers={"kid": "k1"}))
    assert ei.value.status_code == 503, "配置写错被判成 401 → 全站无限重登"
    assert any(r.exc_info for r in caplog.records), "配置错却零日志,正是本次要消灭的沉默失败"


def test_503_and_401_details_are_distinct(monkeypatch):
    """两支的 detail 不能串味:503 提示重试,401 提示令牌无效(前端据此决定是否重新登录)。"""
    _client_raising(monkeypatch, PyJWKClientConnectionError("down"))
    with pytest.raises(HTTPException) as down:
        verify_bearer(_mint())
    _client_raising(monkeypatch, PyJWKClientError("no kid"))   # JWKS 健康 → 坏令牌
    with pytest.raises(HTTPException) as bad:
        verify_bearer(_mint())
    assert bad.value.status_code == 401 and down.value.status_code == 503
    assert bad.value.detail == "无效或过期的令牌"
    assert down.value.detail != bad.value.detail
    assert "重试" in down.value.detail


def test_require_user_jwks_down_503(monkeypatch):
    """依赖层同样透传 503(受保护端点在 Logto 宕机时报"稍后重试"而非"未登录")。"""
    _client_raising(monkeypatch, PyJWKClientConnectionError("down"))
    with pytest.raises(HTTPException) as ei:
        require_user(_fake_request(auth=f"Bearer {_mint()}"))
    assert ei.value.status_code == 503


def test_require_user_kid_not_found_401(monkeypatch):
    """JWKS 健康、只是 kid 对不上 → 401(该重登)。"""
    _client_raising(monkeypatch, PyJWKClientError("Unable to find a signing key"))
    with pytest.raises(HTTPException) as ei:
        require_user(_fake_request(auth=f"Bearer {_mint()}"))
    assert ei.value.status_code == 401


def test_optional_user_kid_not_found_still_none(monkeypatch):
    """坏令牌(找不到 kid)不阻断匿名 → None。"""
    _client_raising(monkeypatch, PyJWKClientError("Unable to find a signing key"))
    assert optional_user(_fake_request(auth=f"Bearer {_mint()}")) is None


def test_optional_user_jwks_down_still_none(monkeypatch):
    """Logto 宕机时匿名问答仍可用:optional_user 吞掉 503 返回 None(不把故障传染给匿名路径)。"""
    _client_raising(monkeypatch, PyJWKClientConnectionError("down"))
    assert optional_user(_fake_request(auth=f"Bearer {_mint()}")) is None


def test_optional_user_sse_jwks_down_still_none(monkeypatch):
    """SSE 同理:Logto 宕机不得打断匿名 EventSource。"""
    _client_raising(monkeypatch, PyJWKClientConnectionError("down"))
    assert optional_user_sse(_fake_request(query={"access_token": _mint()})) is None


def test_valid_token_unaffected_by_new_branching():
    """回归:分流改动不影响正常令牌(fixture 的 fake client 正常返回公钥)。"""
    assert verify_bearer(_mint(sub="still_ok")).sub == "still_ok"


# ---------------- 5. 端到端:受保护端点的状态码(不是 503)----------------

@pytest.fixture()
def api_client(monkeypatch):
    """真 ASGI 客户端;JWKS 行为按生产模拟。

    替身的关键是**忠实**:畸形令牌照抛 pyjwt 自己的 DecodeError(别替它包装成
    PyJWKClientError,那会把 401 分支测成歧义分支);无 kid / 未知 kid 才抛
    PyJWKClientError,且 `get_jwk_set()` 正常返回 —— 对应"Logto 好好的,是令牌不对"。

    未装 [admin] 依赖(/api/me/* 不挂载)时跳过本节,不影响纯问答部署跑测试。
    """
    pytest.importorskip("sqlalchemy", reason="需要 blog_rag[admin] 依赖才挂载 /api/me/*")
    pytest.importorskip("blog_rag.me_routes", reason="/api/me/* 未挂载(admin 依赖缺失)")
    from fastapi.testclient import TestClient

    from blog_rag.api import app

    class _ProdLike(_FakeJWKS):
        def get_signing_key_from_jwt(self, token):
            self.signing_key_calls += 1
            # 畸形串:让 pyjwt 的真实异常原样抛出(DecodeError,属 InvalidTokenError)
            kid = jwt.get_unverified_header(token).get("kid")
            if kid != "k1":
                raise PyJWKClientError(f'Unable to find a signing key that matches: "{kid}"')
            return SimpleNamespace(key=_KEY.public_key())

    monkeypatch.setattr(logto_auth, "_client", lambda: _ProdLike())
    with TestClient(app, raise_server_exceptions=False) as c:
        yield c


def test_e2e_alg_none_token_gets_401_not_503(api_client):
    """线上实测过的回归点:伪造的 alg=none(无 kid)令牌必须 401,不能 503。

    503 会让前端认为"服务挂了"而不去重新登录 → 会话永远卡死。
    """
    r = api_client.get(
        "/api/me/conversations", headers={"authorization": f"Bearer {_mint(alg='none')}"}
    )
    assert r.status_code == 401, f"期望 401,实际 {r.status_code}: {r.text[:200]}"


def test_e2e_wrong_key_token_401(api_client):
    """异钥签名(带 kid,能取到公钥但验签失败)→ 401。"""
    r = api_client.get(
        "/api/me/conversations",
        headers={"authorization": f"Bearer {_mint(private_key=_WRONG, headers={'kid': 'k1'})}"},
    )
    assert r.status_code == 401


def test_e2e_no_bearer_401(api_client):
    assert api_client.get("/api/me/conversations").status_code == 401


def test_e2e_jwks_down_gets_503(monkeypatch, api_client):
    """反向回归:真取不到 JWKS 时仍是 503(别为了修 401 把可重试语义也删了)。"""
    monkeypatch.setattr(
        logto_auth, "_client", lambda: _FakeJWKS(key_error=_JWKS_DOWN, jwks_error=_JWKS_DOWN)
    )
    r = api_client.get(
        "/api/me/conversations", headers={"authorization": f"Bearer {_mint(headers={'kid': 'k1'})}"}
    )
    assert r.status_code == 503


def test_e2e_ambiguous_error_with_broken_jwks_is_503(monkeypatch, api_client):
    """端到端:JWKS 坏掉(取不到)时,歧义错误必须落 503 —— 用户重登也没用。"""
    monkeypatch.setattr(
        logto_auth,
        "_client",
        lambda: _FakeJWKS(key_error=PyJWKClientError("no key"), jwks_error=_JWKS_DOWN),
    )
    r = api_client.get(
        "/api/me/conversations", headers={"authorization": f"Bearer {_mint(headers={'kid': 'zz'})}"}
    )
    assert r.status_code == 503


# ---------------- 6. 畸形令牌:401 而非 500(曾经线上真出过)----------------
#
# `PyJWKClient.get_signing_key_from_jwt()` 在解析 token 头之前会先 decode 一次,
# 畸形令牌("undefined"/"null"/被截断/段数不对)在那一步抛的是 **jwt.DecodeError**,
# 它是 PyJWTError 而**不是** PyJWKClientError。只接 PyJWKClientError 会让它穿透依赖层
# → 500,且 optional_user 只接 HTTPException 时连**匿名**路径也被打断。

@pytest.mark.parametrize("bad", ["undefined", "null", "junk", "a.b", "x.y.z.w", "", "."])
def test_malformed_token_401_not_500(monkeypatch, bad):
    """前端把 localStorage 里的字符串当令牌发上来 → 401,不能让异常穿透成 500。"""
    from jwt import PyJWKClient

    # 用真实 PyJWKClient:畸形令牌在 decode 阶段就失败,不会真的发起网络请求。
    real = PyJWKClient("https://logto.invalid.local/oidc/jwks")
    monkeypatch.setattr(logto_auth, "_client", lambda: real)
    with pytest.raises(HTTPException) as ei:
        verify_bearer(bad)
    assert ei.value.status_code == 401


def test_malformed_query_token_does_not_break_anonymous(monkeypatch):
    """匿名 SSE 不能被一个畸形 ?access_token= 打断。"""
    from jwt import PyJWKClient

    real = PyJWKClient("https://logto.invalid.local/oidc/jwks")
    monkeypatch.setattr(logto_auth, "_client", lambda: real)
    assert optional_user_sse(_fake_request(query={"access_token": "undefined"})) is None


def test_malformed_header_token_does_not_break_anonymous(monkeypatch):
    from jwt import PyJWKClient

    real = PyJWKClient("https://logto.invalid.local/oidc/jwks")
    monkeypatch.setattr(logto_auth, "_client", lambda: real)
    assert optional_user(_fake_request(auth="Bearer undefined")) is None


def test_e2e_malformed_bearer_401_not_500(api_client):
    """端到端回归:线上实测过的 500 场景,现在必须是 401。"""
    for bad in ("undefined", "null", "a.b", "xx"):
        r = api_client.get("/api/me/conversations", headers={"authorization": f"Bearer {bad}"})
        assert r.status_code == 401, f"Bearer {bad!r} → {r.status_code}(期望 401)"


# ---------------- 7. _try_identity 的兜底层:任何意外都不阻断匿名 ----------------
#
# optional_user / optional_user_sse 的契约是"绝不阻断匿名使用",不该依赖
# "verify_bearer 一定只抛 HTTPException"这个假设(线上已因此让匿名问答 500 过一次)。
# 下面用**非 HTTPException** 的意外异常钉住这层兜底。

@pytest.fixture()
def _verify_explodes(monkeypatch):
    """让 verify_bearer 抛一个谁都没预料到的异常。"""
    def _boom(_token):
        raise RuntimeError("unexpected auth blowup")

    monkeypatch.setattr(logto_auth, "verify_bearer", _boom)


def test_optional_user_survives_unexpected_exception(_verify_explodes):
    assert optional_user(_fake_request(auth=f"Bearer {_mint()}")) is None


def test_optional_user_sse_survives_unexpected_exception(_verify_explodes):
    assert optional_user_sse(_fake_request(query={"access_token": _mint()})) is None


def test_optional_user_sse_header_path_survives_unexpected_exception(_verify_explodes):
    assert optional_user_sse(_fake_request(auth=f"Bearer {_mint()}")) is None


@pytest.mark.parametrize(
    "exc", [RuntimeError("boom"), ValueError("bad"), KeyError("kid"), AttributeError("nope")]
)
def test_optional_user_swallows_any_exception_type(monkeypatch, exc):
    """不挑异常类型:任何非 HTTPException 都降级为匿名。"""
    def _boom(_token):
        raise exc

    monkeypatch.setattr(logto_auth, "verify_bearer", _boom)
    assert optional_user(_fake_request(auth="Bearer whatever")) is None


def test_unexpected_exception_is_logged_as_warning(monkeypatch, caplog):
    """降级必须留痕(exc_info),否则线上只会看到"莫名其妙都成匿名了"。"""
    def _boom(_token):
        raise RuntimeError("unexpected auth blowup")

    monkeypatch.setattr(logto_auth, "verify_bearer", _boom)
    with caplog.at_level("WARNING", logger="blog_rag.logto_auth"):
        assert optional_user(_fake_request(auth="Bearer whatever")) is None
    recs = [r for r in caplog.records if r.levelname == "WARNING"]
    assert recs, "意外降级为匿名却没有任何 warning 日志"
    assert recs[0].exc_info is not None, "warning 未带 exc_info,排障时看不到原始异常"


def test_require_user_does_not_swallow_unexpected_exception(_verify_explodes):
    """反向边界:强制登录的路径**不该**被兜底静默 —— 意外异常仍要炸出来(500 可见),
    否则 bug 会被藏在"未登录"里。兜底只属于 optional_* 匿名路径。"""
    with pytest.raises(RuntimeError):
        require_user(_fake_request(auth=f"Bearer {_mint()}"))


@pytest.mark.parametrize("exc_cls", [KeyboardInterrupt, SystemExit])
def test_fallback_does_not_swallow_base_exceptions(monkeypatch, exc_cls):
    """兜底必须是 `except Exception` 而非 `except BaseException`:
    Ctrl-C / worker 退出(以及 asyncio.CancelledError)不能被"降级为匿名"吞掉。"""
    def _boom(_token):
        raise exc_cls()

    monkeypatch.setattr(logto_auth, "verify_bearer", _boom)
    with pytest.raises(exc_cls):
        optional_user(_fake_request(auth="Bearer whatever"))


# ---------------- 8. 真实 pyjwt + 真实 HTTP JWKS 端点 ----------------
#
# 上面几节用替身,好处是能精确摆布分支,坏处是**只验证了我们以为的库行为**。
# 401/503 的分类完全建立在"pyjwt 在各种坏 JWKS 下抛什么"之上,这个假设必须用
# 真货验一遍:起一个本地 HTTP JWKS 端点(127.0.0.1,不出网),让真实 PyJWKClient
# 去取,再看 verify_bearer 落到哪个码。pyjwt 升级后若行为变了,这一节先红。
#
# 实测对照表(取签名密钥抛出的原始异常 → 最终状态码):
#   正常 kid                → 200   ·  未知 kid            → 401(PyJWKClientError,探活通过)
#   过期 / 异钥             → 401   ·  端口不通 / 半路 RST  → 503
#   返回 HTML               → 503(JSONDecodeError)
#   {"keys": []} / 无 keys 字段 → 503(PyJWKSetError,既非 InvalidTokenError 也非 PyJWKClientError)
#   返回 JSON 数组          → 503(PyJWKClientError,探活同样失败)
#   key 全无 kid / use=enc  → 503(PyJWKClientError,但 get_jwk_set 成功 —— 探活必须用
#                                 get_signing_keys 才判得对)

def _b64u_int(i: int) -> str:
    raw = i.to_bytes((i.bit_length() + 7) // 8, "big")
    return base64.urlsafe_b64encode(raw).rstrip(b"=").decode()


def _jwk_of(private_key, **overrides) -> dict:
    """把 RSA 公钥导出成 JWKS 里的一项。"""
    nums = private_key.public_key().public_numbers()
    jwk = {
        "kty": "RSA", "use": "sig", "alg": "RS256", "kid": "k1",
        "n": _b64u_int(nums.n), "e": _b64u_int(nums.e),
    }
    for k, v in overrides.items():
        if v is _DELETE:
            jwk.pop(k, None)
        else:
            jwk[k] = v
    return jwk


# 两种"文档取得到、却没有可用签名密钥"的 JWKS —— get_jwk_set() 成功而 get_signing_keys() 失败。
_JWK_NO_KID = _jwk_of(_KEY, kid=_DELETE)
_JWK_ENC = _jwk_of(_KEY, use="enc")


class _QuietHTTPServer(ThreadingHTTPServer):
    """跳过 HTTPServer.server_bind 里的 `socket.getfqdn()`。

    那句反向 DNS 在离线/受限网络下要卡满解析超时(实测首个用例 setup 35s),
    而我们只需要一个本地回环端口,server_name 是什么无所谓。
    """

    def server_bind(self):
        socketserver.TCPServer.server_bind(self)
        self.server_name = "127.0.0.1"
        self.server_port = self.server_address[1]


class _JWKSServer:
    """本地 JWKS 端点,可随时换返回内容 / 关停,并统计被取了几次。"""

    def __init__(self, monkeypatch):
        self.body = json.dumps({"keys": [_jwk_of(_KEY)]})
        self.content_type = "application/json"
        self.hits = 0
        self.hangup = False
        outer = self

        class _H(BaseHTTPRequestHandler):
            def do_GET(self):                      # BaseHTTPRequestHandler 的命名约定
                outer.hits += 1
                if outer.hangup:                   # 半路断连(反代重启 / 连接被 RST)
                    self.close_connection = True
                    try:
                        self.connection.close()
                    except OSError:
                        pass
                    return
                payload = outer.body.encode()
                self.send_response(200)
                self.send_header("Content-Type", outer.content_type)
                self.send_header("Content-Length", str(len(payload)))
                self.end_headers()
                self.wfile.write(payload)

            def log_message(self, *_a):            # 静音 access log
                pass

        self._httpd = _QuietHTTPServer(("127.0.0.1", 0), _H)
        self.port = self._httpd.server_address[1]
        self._thread = threading.Thread(
            target=self._httpd.serve_forever, kwargs={"poll_interval": 0.02}, daemon=True
        )
        self._thread.start()

        self.endpoint = f"http://127.0.0.1:{self.port}"
        self.issuer = f"{self.endpoint}/oidc"
        # 用真实 _client / 真实 PyJWKClient,并保证每个用例都从干净的缓存开始。
        monkeypatch.setattr(logto_auth.settings, "logto_endpoint", self.endpoint)
        monkeypatch.setattr(logto_auth, "_client", _REAL_CLIENT)
        monkeypatch.setattr(logto_auth, "_jwk_client", None)

    def serve(self, obj, content_type: str = "application/json") -> None:
        self.body = obj if isinstance(obj, str) else json.dumps(obj)
        self.content_type = content_type

    def token(self, **overrides) -> str:
        overrides.setdefault("iss", self.issuer)
        return _mint(headers={"kid": overrides.pop("kid", "k1")}, **overrides)

    def stop(self) -> None:
        if self._httpd is None:
            return
        self._httpd.shutdown()
        self._httpd.server_close()
        self._thread.join(timeout=5)
        self._httpd = None


@pytest.fixture()
def jwks(monkeypatch):
    # pyjwt 用 urllib 取 JWKS,而 urllib 会走环境里的 http_proxy —— 有代理时"端口不通"
    # 会变成"代理返回 502"(慢且不确定)。本节要测的是与 JWKS 端点的**直连**行为,
    # 故显式绕开代理并让 urllib 按新环境重建 opener(_opener=None 本就是默认状态)。
    monkeypatch.setenv("no_proxy", "*")
    monkeypatch.setenv("NO_PROXY", "*")
    monkeypatch.setattr(urllib.request, "_opener", None, raising=False)

    srv = _JWKSServer(monkeypatch)
    try:
        yield srv
    finally:
        srv.stop()


def _status_of(token: str) -> int:
    """跑一遍 verify_bearer,返回 HTTP 状态码;成功返回 200。异常穿透则测试失败。"""
    try:
        verify_bearer(token)
    except HTTPException as e:
        return e.status_code
    return 200


def test_real_jwks_happy_path(jwks):
    """真实链路打通:本地 JWKS + 真 PyJWKClient + 真验签。"""
    ident = verify_bearer(jwks.token(sub="real_user"))
    assert ident.sub == "real_user"
    assert jwks.hits == 1


def test_real_jwks_unknown_kid_401(jwks):
    """真实 pyjwt 下 kid 不匹配 → 401(JWKS 是好的,错在令牌)。"""
    assert _status_of(jwks.token(kid="rotated-away")) == 401


def test_real_jwks_unknown_kid_does_not_double_fetch_on_probe(jwks):
    """性能护栏:pyjwt 在 kid 未命中时**自己**已强制刷新过一次 JWKS(共 2 次取);
    探活走的是刚被填好的缓存,不该再多打一次 Logto —— 总数必须仍是 2。

    探活从 `get_jwk_set()` 换成 `get_signing_keys()` 后这条尤其要盯:后者多一层调用,
    但内部仍是 `get_jwk_set(refresh=False)`,命中缓存。变成 3 就是每个坏 kid 都在
    额外捶 Logto 一次(坏 kid 可被匿名者任意构造)。
    """
    assert _status_of(jwks.token(kid="nope")) == 401
    assert jwks.hits == 2, f"探活多打了 {jwks.hits - 2} 次 JWKS(应命中缓存)"


def test_real_jwks_returns_html_503(jwks):
    """前置 nginx/CDN 吐 HTML 错误页 → json.load 抛 ValueError,归 503(以前穿透成 500)。"""
    jwks.serve("<html><body>502 Bad Gateway</body></html>", content_type="text/html")
    assert _status_of(jwks.token()) == 503


def test_real_jwks_empty_keys_503(jwks):
    """JWKS 里一个 key 都没有 → PyJWKSetError(既非 InvalidTokenError 也非 PyJWKClientError)
    → 必须被 PyJWTError 兜底接住判 503,而不是穿透成 500 或误判 401。"""
    jwks.serve({"keys": []})
    assert _status_of(jwks.token()) == 503


def test_real_jwks_not_a_json_object_503(jwks):
    """端点返回 JSON 数组而非对象 → PyJWKClientError,且探活同样失败 → 503。"""
    jwks.serve([_jwk_of(_KEY)])
    assert _status_of(jwks.token()) == 503


def test_real_jwks_endpoint_down_503(jwks):
    """Logto 宕机/端口不通 → PyJWKClientConnectionError → 503。"""
    jwks.stop()
    assert _status_of(jwks.token()) == 503


def test_real_jwks_connection_reset_503(jwks, caplog):
    """半路断连(反代重启把连接 RST 掉)→ pyjwt **不**包装,原样抛 ConnectionResetError。

    它是 OSError 不是 URLError,所以只靠 PyJWKClientConnectionError 接不住;
    要靠 `except (OSError, ValueError)` 那支才不会穿透成 500。
    """
    jwks.hangup = True
    with caplog.at_level("ERROR", logger="blog_rag.logto_auth"):
        assert _status_of(jwks.token()) == 503
    assert any(r.exc_info for r in caplog.records), "连接被重置却零日志"


def test_real_jwks_expired_token_401(jwks):
    """真实链路下过期令牌仍是 401(别被新分类误伤成 503)。"""
    now = int(time.time())
    assert _status_of(jwks.token(exp=now - 10, iat=now - 3600)) == 401


def test_real_jwks_wrong_key_401(jwks):
    """签名密钥不对(kid 命中但验签失败)→ 401。"""
    assert _status_of(jwks.token(private_key=_WRONG)) == 401


def test_real_jwks_optional_user_never_blocks_anonymous(jwks):
    """真实链路下,JWKS 各种坏法都不能让匿名路径抛异常。"""
    for body, ctype in (
        ("<html>502</html>", "text/html"),
        (json.dumps({"keys": []}), "application/json"),
        (json.dumps({"nonsense": True}), "application/json"),
    ):
        jwks.serve(body, content_type=ctype)
        logto_auth._jwk_client = None                     # 清缓存,逼真实重取
        assert optional_user(_fake_request(auth=f"Bearer {jwks.token()}")) is None
        assert optional_user_sse(_fake_request(query={"access_token": "undefined"})) is None


@pytest.mark.parametrize(
    ("label", "jwks_body"),
    [
        ("key 全都没有 kid", {"keys": [_JWK_NO_KID]}),
        ("key 全是加密用途(use != sig)", {"keys": [_JWK_ENC]}),
    ],
)
def test_real_jwks_without_usable_signing_keys_503(jwks, label, jwks_body):
    """JWKS 文档取得到,但里面没有一个可用签名密钥 —— 这是服务端/配置问题,必须 503。

    最隐蔽的一档:`get_jwk_set()` 是**成功**的,只有 `get_signing_keys()` 会失败。
    探活若只看前者,换 IdP / 手搓 JWKS / 导出漏字段就会让全站每个用户拿到
    "无效或过期的令牌"、陷入无限重登,而日志里零 error。
    """
    jwks.serve(jwks_body)
    assert _status_of(jwks.token()) == 503, f"{label}被误判成坏令牌"


def test_real_jwks_no_keys_field_503(jwks):
    """端点返回合法 JSON 但根本没有 `keys` 字段(典型:被反代换成了某个 JSON 错误体)。"""
    jwks.serve({"error": "unauthorized"})
    assert _status_of(jwks.token()) == 503


