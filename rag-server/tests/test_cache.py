"""链路优化 #3:进程内确定性缓存(cache.py)。"""
from __future__ import annotations

from blog_rag.cache import _MISS, LRUCache, clear_all, memoize
from blog_rag.config import settings


def test_lru_hit_miss_and_lru_eviction():
    c = LRUCache(2)
    assert c.get("a") is _MISS               # 未命中
    c.set("a", 1)
    c.set("b", 2)
    assert c.get("a") == 1                    # 命中,并把 a 提为最近使用
    c.set("c", 3)                             # 容量 2 → 淘汰最久未用的 b(a 刚被读过)
    assert c.get("b") is _MISS
    assert c.get("a") == 1 and c.get("c") == 3
    assert c.hits >= 3 and c.misses >= 2


def test_memoize_caches_and_keys_on_args(monkeypatch):
    monkeypatch.setattr(settings, "retrieval_cache_enabled", True)
    clear_all()
    calls = []

    @memoize("t_args")
    def f(x, *, y=0):
        calls.append((x, y))
        return x + y

    assert f(1, y=2) == 3
    assert f(1, y=2) == 3          # 第二次命中缓存
    assert calls == [(1, 2)]       # 底层函数只被调用一次
    assert f(1, y=5) == 6          # kwargs 不同 → 不同键,重新计算
    assert len(calls) == 2


def test_memoize_disabled_is_passthrough(monkeypatch):
    monkeypatch.setattr(settings, "retrieval_cache_enabled", False)
    calls = []

    @memoize("t_off")
    def f(x):
        calls.append(x)
        return x

    f(1)
    f(1)
    assert calls == [1, 1]         # 关闭时每次都真正调用


def test_memoize_invalidated_when_index_version_changes(monkeypatch):
    """kb rebuild 会改 index_version(embedding/维度/分块指纹)→ 旧缓存自动失效。"""
    monkeypatch.setattr(settings, "retrieval_cache_enabled", True)
    clear_all()
    calls = []

    @memoize("t_ver")
    def f(x):
        calls.append(x)
        return x

    monkeypatch.setattr(settings, "embedding_model", "model-A")   # 派生出 index_version 的一部分
    f(1)
    f(1)
    assert calls == [1]            # 同版本命中
    monkeypatch.setattr(settings, "embedding_model", "model-B")   # 版本变 → 键变
    f(1)
    assert calls == [1, 1]         # 失效后重新计算


def test_classify_route_fallback_not_cached(monkeypatch):
    """瞬时失败走兜底 rag 但不入缓存:下次成功仍能得到真实分类(不被降级值钉死)。"""
    from blog_rag import graders

    monkeypatch.setattr(settings, "retrieval_cache_enabled", True)
    clear_all()
    calls = {"n": 0}

    class _Resp:
        class _Ch:
            class _M:
                content = "general"
            message = _M()
        choices = (_Ch(),)

    class _Client:
        class chat:
            class completions:
                @staticmethod
                def create(**_kw):
                    calls["n"] += 1
                    if calls["n"] == 1:
                        raise RuntimeError("transient")   # 首次抖动
                    return _Resp()

    monkeypatch.setattr(graders, "get_client", lambda: _Client())
    assert graders.classify_route("这个问题？") == "rag"       # 失败兜底,不缓存
    assert graders.classify_route("这个问题？") == "general"   # 重试命中真实分类 → 证明没缓存兜底
    assert calls["n"] == 2


def test_memoize_preserves_wrapped():
    @memoize("t_wrap")
    def f(x):
        """doc."""
        return x
    assert hasattr(f, "__wrapped__")
    assert f.__wrapped__(9) == 9   # 可直取未缓存原函数
    assert f.__doc__ == "doc."
