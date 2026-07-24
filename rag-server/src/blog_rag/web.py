"""M4 联网搜索:三 provider 工厂(ddgs / tavily / bocha)→ 统一 {title,url,snippet}。

设计(为什么这样):
- 联网是"本地不接地"时的兜底(CRAG 阶梯),不是每次都搜——KB 权威/免费/快,联网只补洞。
- 三家字段名不同 → 归一化成统一 schema,上层复用本地 [S#] 那套引用,只是 source 换 URL([W#])。
- **失败必降级返回 []**(限流/超时/无key),绝不让联网故障拖垮问答。
- provider 由 config.web_provider 三选一;DDG 免key起步,Tavily/博查需key更稳。
"""
from __future__ import annotations

import time

from blog_rag.config import settings


def _ddg(query: str, n: int) -> list[dict]:
    from ddgs import DDGS

    rows = DDGS(timeout=5).text(query, region="cn-zh", safesearch="moderate", max_results=n)
    return [{"title": r.get("title", ""), "url": r.get("href", ""), "snippet": r.get("body", "")}
            for r in rows]


def _tavily(query: str, n: int) -> list[dict]:
    from tavily import TavilyClient

    resp = TavilyClient(api_key=settings.tavily_api_key or None).search(
        query=query, max_results=n, search_depth="basic"
    )
    return [{"title": r.get("title", ""), "url": r.get("url", ""), "snippet": r.get("content", "")}
            for r in resp.get("results", [])]


def _bocha(query: str, n: int) -> list[dict]:
    import requests

    resp = requests.post(
        "https://api.bochaai.com/v1/web-search",
        headers={"Authorization": f"Bearer {settings.bocha_api_key}"},
        json={"query": query, "summary": True, "count": n},
        timeout=8,
    )
    resp.raise_for_status()
    data = resp.json().get("data") or {}          # 防 {"data": null}
    vals = (data.get("webPages") or {}).get("value", [])
    return [{"title": v.get("name", ""), "url": v.get("url", ""),
             "snippet": v.get("summary") or v.get("snippet", "")} for v in vals]


_PROVIDERS = {"duckduckgo": _ddg, "tavily": _tavily, "bocha": _bocha}


def web_search(query: str, max_results: int | None = None, retries: int = 2) -> list[dict]:
    """按 config.web_provider 联网搜索,返回归一化 [{title,url,snippet}];失败退避重试,仍失败→[]。"""
    n = max_results or settings.web_max_results
    if settings.web_provider == "bocha" and not settings.bocha_api_key:
        print("⚠ 博查未配 key(BOCHA_API_KEY),跳过联网", flush=True)
        return []                                  # 确定性失败:不重试白等
    fn = _PROVIDERS.get(settings.web_provider, _ddg)
    last = None
    for attempt in range(retries + 1):
        try:
            return fn(query, n)
        except Exception as e:                      # 限流/超时/无key/网络 → 退避重试
            last = e
            if attempt < retries:
                time.sleep(1.5 * (attempt + 1))
    print(f"⚠ 联网搜索失败({settings.web_provider}):{type(last).__name__} {str(last)[:60]}", flush=True)
    return []                                        # 降级:返回空,让上层走通用/弃答


def build_web_context(items: list[dict]) -> tuple[str, list[dict]]:
    """web 结果 → 上下文块([W#]+URL)+ 出处列表,供带出处作答(与本地 [S#] 平行)。"""
    blocks, sources = [], []
    for i, it in enumerate(items, 1):
        blocks.append(f"[W{i}] {it['title']}\n{it['snippet']}\n(来源: {it['url']})")
        sources.append({"wid": f"W{i}", "title": it["title"], "url": it["url"]})
    return "\n\n".join(blocks), sources
