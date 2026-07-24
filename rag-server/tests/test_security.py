"""链路优化 #2:公网防护(security.py)—— 按 IP 令牌桶限流 + 可选共享令牌。"""
from __future__ import annotations

import pytest
from fastapi import HTTPException

from blog_rag import security
from blog_rag.config import settings
from blog_rag.security import RateLimiter, client_ip, guard


class _FakeReq:
    """最小化冒充 fastapi.Request(guard/client_ip 只用到 headers/query_params/client.host)。"""
    def __init__(self, headers=None, qs=None, host="1.2.3.4"):
        self.headers = headers or {}
        self.query_params = qs or {}
        self.client = type("C", (), {"host": host})()


def test_ratelimiter_allows_capacity_then_blocks():
    rl = RateLimiter(per_min=3)          # 突发容量 = 3
    t = 1000.0
    assert rl.allow("ip", now=t)
    assert rl.allow("ip", now=t)
    assert rl.allow("ip", now=t)
    assert not rl.allow("ip", now=t)     # 桶空 → 拒


def test_ratelimiter_refills_over_time():
    rl = RateLimiter(per_min=60)         # 1 令牌/秒
    t = 0.0
    for _ in range(60):
        assert rl.allow("ip", now=t)
    assert not rl.allow("ip", now=t)
    assert rl.allow("ip", now=t + 1.0)   # 过 1 秒回填 1 个 → 再放行 1 次


def test_ratelimiter_per_key_isolated():
    rl = RateLimiter(per_min=1)
    t = 0.0
    assert rl.allow("a", now=t)
    assert not rl.allow("a", now=t)
    assert rl.allow("b", now=t)          # 另一个 IP 有自己的桶


def test_ratelimiter_hard_caps_keys_lru():
    """硬上限:超 max_keys 立即淘汰最久未用(即使桶仍活跃),防无界增长/内存 DoS。"""
    rl = RateLimiter(per_min=1, max_keys=3)
    t = 0.0
    for k in ("a", "b", "c", "d"):       # 每个桶都活跃(tokens<capacity)
        rl.allow(k, now=t)
    assert len(rl._buckets) == 3         # d 挤掉最久未用的 a
    assert "a" not in rl._buckets
    assert {"b", "c", "d"} <= set(rl._buckets)


def test_client_ip_trusts_only_x_real_ip():
    # 经 nginx:取不可伪造的 X-Real-IP,忽略客户端可伪造的 X-Forwarded-For(防限流绕过)
    r = _FakeReq(headers={"x-real-ip": "3.3.3.3", "x-forwarded-for": "9.9.9.9, 10.0.0.1"})
    assert client_ip(r) == "3.3.3.3"
    # 无 X-Real-IP(本地直连):回退连接地址;XFF 存在也不采信
    assert client_ip(_FakeReq(headers={"x-forwarded-for": "9.9.9.9"}, host="5.6.7.8")) == "5.6.7.8"


def test_guard_token_required_when_configured(monkeypatch):
    monkeypatch.setattr(settings, "api_token", "secret")
    monkeypatch.setattr(settings, "rate_limit_enabled", False)
    with pytest.raises(HTTPException) as ei:
        guard(_FakeReq())                # 无 token
    assert ei.value.status_code == 401
    guard(_FakeReq(qs={"token": "secret"}))                 # query 带对 → 放行
    guard(_FakeReq(headers={"x-api-token": "secret"}))      # header 带对 → 放行


def test_guard_open_when_no_token(monkeypatch):
    monkeypatch.setattr(settings, "api_token", "")          # 未配置 token
    monkeypatch.setattr(settings, "rate_limit_enabled", False)
    guard(_FakeReq())                    # 不抛 = 放行(本地开发默认开放)


def test_guard_rate_limits(monkeypatch):
    monkeypatch.setattr(settings, "api_token", "")
    monkeypatch.setattr(settings, "rate_limit_enabled", True)
    monkeypatch.setattr(security, "_limiter", RateLimiter(per_min=1))
    guard(_FakeReq(host="7.7.7.7"))      # 首次放行
    with pytest.raises(HTTPException) as ei:
        guard(_FakeReq(host="7.7.7.7"))  # 同 IP 立刻再来 → 429
    assert ei.value.status_code == 429
    guard(_FakeReq(host="8.8.8.8"))      # 不同 IP 不受影响
