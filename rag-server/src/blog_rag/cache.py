"""进程内确定性缓存(链路优化:检索/路由结果重用)。

只缓存 **temp=0 的确定性算子**输出(同输入必同输出):检索结果、认知路由分类。
这类调用重复问同一问题时是纯浪费——命中缓存即省掉整条检索链(embedding + dense + BM25 +
RRF + 一次 LLM 重排)或一次路由 LLM。

设计:
- 键含 `index_version`:知识库 rebuild(embedding/维度/分块指纹变)后旧缓存自动作废。
- 有界 LRU + 线程锁:FastAPI 同步端点跑在 anyio 线程池,多线程并发安全。
- `settings.retrieval_cache_enabled=False` 时直通不缓存(便于评测对比 / 排障)。
- 只缓存确定性只读结果;调用方不得就地改返回对象的 metadata(现有调用均只读或拷贝,见
  rag_chain._dedupe_by_doc / _build_context —— 只读;retriever.llm_rerank 产出的是 _with_meta 副本)。
"""
from __future__ import annotations

import threading
from collections import OrderedDict
from collections.abc import Callable
from typing import Any

from blog_rag.config import settings

_MISS = object()


class LRUCache:
    """最简有界 LRU(线程安全);记 hits/misses 便于观测命中率。"""

    def __init__(self, maxsize: int) -> None:
        self.maxsize = max(1, maxsize)
        self._d: OrderedDict[str, Any] = OrderedDict()
        self._lock = threading.Lock()
        self.hits = 0
        self.misses = 0

    def get(self, key: str) -> Any:
        with self._lock:
            if key in self._d:
                self._d.move_to_end(key)
                self.hits += 1
                return self._d[key]
            self.misses += 1
            return _MISS

    def set(self, key: str, value: Any) -> None:
        with self._lock:
            self._d[key] = value
            self._d.move_to_end(key)
            while len(self._d) > self.maxsize:
                self._d.popitem(last=False)   # 淘汰最久未用

    def clear(self) -> None:
        with self._lock:
            self._d.clear()
            self.hits = self.misses = 0


_caches: dict[str, LRUCache] = {}
_caches_lock = threading.Lock()


def get_cache(name: str) -> LRUCache:
    with _caches_lock:
        c = _caches.get(name)
        if c is None:
            c = LRUCache(settings.retrieval_cache_size)
            _caches[name] = c
        return c


def clear_all() -> None:
    """清空所有命名缓存(kb rebuild 或测试隔离时用)。"""
    with _caches_lock:
        for c in _caches.values():
            c.clear()


def memoize(name: str) -> Callable:
    """装饰器:按 (index_version, args, sorted kwargs) 缓存确定性函数返回值。

    - 参数必须可 repr 且语义上可哈希为键(str/bool/None/数字等,现有用法满足)。
    - 关闭开关时零开销直通,不建缓存条目。
    """
    def deco(fn: Callable) -> Callable:
        def wrapper(*args, **kwargs):
            if not settings.retrieval_cache_enabled:
                return fn(*args, **kwargs)
            key = repr((settings.index_version, args, tuple(sorted(kwargs.items()))))
            cache = get_cache(name)
            hit = cache.get(key)
            if hit is not _MISS:
                return hit
            value = fn(*args, **kwargs)
            cache.set(key, value)
            return value
        wrapper.__wrapped__ = fn          # 便于测试直取未缓存原函数
        wrapper.__name__ = getattr(fn, "__name__", "wrapped")
        wrapper.__doc__ = fn.__doc__
        return wrapper
    return deco
