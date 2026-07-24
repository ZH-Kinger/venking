"""FastAPI 公网防护(链路优化 #2):按 IP 限流 + 可选共享令牌。

背景:`/api/chat` 每次触发一条 GLM 计费调用。历史 `config.ui_auth_*` 是 Gradio 遗留旋钮,
**从未接进 FastAPI**(config.py 注释亦述),故生产端点此前完全无鉴权无限流 = key 白嫖敞口。

两道防线(均可 config 关闭,默认对公网安全):
1. **按 IP 令牌桶限流**(默认开,`rate_limit_per_min`):挡脚本刷量的成本失控;
   浏览器正常交互远低于阈值,不受影响。
2. **可选共享令牌**(`API_TOKEN`,默认空=关):填了才校验 `?token=` 或 `X-API-Token` 头,
   用于把非浏览器访问彻底锁死。

注意:状态在**进程内**(单 worker)。当前生产是单容器单进程,够用;若将来多 worker /
多实例,需换 Redis 之类共享存储,否则各进程限流独立。
"""
from __future__ import annotations

import threading
import time
from collections import OrderedDict

from fastapi import HTTPException, Request

from blog_rag.config import settings


class RateLimiter:
    """按 key(IP)令牌桶:每秒回填 rate 个令牌,桶容量 capacity;取不到令牌即拒。

    _buckets 用 OrderedDict 近似 LRU:每次访问 move_to_end,超 max_keys 硬上限时从头淘汰
    最久未用的桶(**无条件**,不只淘汰空闲桶)——否则攻击者持续制造不同 key 的活跃桶会让字典
    无界增长直至 OOM(auditor 2026-07-24 抓到,配合 XFF 伪造几乎零成本)。
    """

    def __init__(self, per_min: int, *, max_keys: int = 50_000) -> None:
        self.rate = max(per_min, 1) / 60.0                       # 令牌/秒
        self.capacity = float(max(per_min, 1))                   # 突发上限 = 每分钟额度
        self.max_keys = max(max_keys, 1)
        self._buckets: OrderedDict[str, list[float]] = OrderedDict()  # key -> [tokens, last_ts]
        self._lock = threading.Lock()

    def allow(self, key: str, *, now: float | None = None) -> bool:
        now = time.monotonic() if now is None else now
        with self._lock:
            tokens, last = self._buckets.get(key, [self.capacity, now])
            tokens = min(self.capacity, tokens + (now - last) * self.rate)
            allowed = tokens >= 1.0
            if allowed:
                tokens -= 1.0
            self._buckets[key] = [tokens, now]
            self._buckets.move_to_end(key)                       # 标记最近使用
            while len(self._buckets) > self.max_keys:            # 硬上限:防无界增长/内存 DoS
                self._buckets.popitem(last=False)                # 淘汰最久未用
            return allowed


# 单例限流器(按每分钟额度);测试可直接 new 一个独立实例。
_limiter = RateLimiter(settings.rate_limit_per_min)


def client_ip(request: Request) -> str:
    """取真实客户端 IP,用于按 IP 限流。

    **只信 X-Real-IP**($remote_addr,Nginx 覆盖写、客户端不可伪造;见 deploy/nginx 对 /api/ 的设置);
    直连(本地开发,无反代)回退连接地址。**绝不取 X-Forwarded-For 首段**——nginx 用
    `$proxy_add_x_forwarded_for` 追加语义,客户端自带的 XFF 会排在最前,取首段可被一行 header 伪造
    (每请求换个值→全新令牌桶→限流失效;auditor 2026-07-24 抓到的高危绕过)。
    """
    real = request.headers.get("x-real-ip")
    if real:
        return real.strip()
    return request.client.host if request.client else "unknown"


def guard(request: Request) -> None:
    """FastAPI 依赖:令牌校验(若配置)+ 按 IP 限流。用 dependencies=[Depends(guard)] 挂到端点。"""
    if settings.api_token:
        provided = request.headers.get("x-api-token") or request.query_params.get("token", "")
        if provided != settings.api_token:
            raise HTTPException(status_code=401, detail="未授权")
    if settings.rate_limit_enabled and not _limiter.allow(client_ip(request)):
        raise HTTPException(status_code=429, detail="请求过于频繁,请稍后再试")
