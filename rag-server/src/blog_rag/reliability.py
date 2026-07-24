"""M7 韧性:LLM 调用的超时 / 重试 / 降级。

设计取舍(学习锚点):
- **超时 + 指数退避重试用 OpenAI SDK 内置**(get_client 里设 timeout/max_retries),不重复造 tenacity 轮子——
  SDK 只对**该重试的错误类**(连接错误/超时/429/5xx)退避重试,对 4xx(鉴权/参数)直接抛,语义正好。
- **备用 provider(SDK 不管)在这里补**:主端点重试耗尽仍失败 → 切 fallback 兜一次(自动换 model)。
  只对可重试错误降级(4xx 不降级,换端点也没用)。
- **流式约束**:降级/重试只能兜"首 token 之前"的失败——已吐出的 token 收不回,这与 SDK 重试作用点一致。

为什么延迟 import get_client:llm.py 顶层 import 本模块的 create_completion,本模块若顶层 import llm 就成环;
故 get_client 在函数内延迟 import(本模块顶层不依赖 llm)。
"""
from __future__ import annotations

from openai import (
    APIConnectionError,
    APITimeoutError,
    InternalServerError,
    OpenAI,
    RateLimitError,
)

from blog_rag.config import settings

# 值得切备用端点/重试的错误类(4xx 如 BadRequest/Authentication 不在内:换端点也不会好)
_RETRYABLE = (APIConnectionError, APITimeoutError, RateLimitError, InternalServerError)


def _fallback_client() -> OpenAI | None:
    """构造备用 provider 客户端;未配置(缺 base_url/model)→ None(不启用降级)。"""
    if not (settings.fallback_base_url and settings.fallback_model):
        return None
    key = settings.fallback_api_key or settings.api_key
    return OpenAI(api_key=key, base_url=settings.fallback_base_url,
                  timeout=settings.llm_timeout, max_retries=settings.llm_max_retries)


def create_completion(**kwargs):
    """建 chat completion(参数透传给 chat.completions.create)。

    主 provider(自带 SDK 超时+退避重试)→ 若抛可重试错误且配置了 fallback → 切备用兜一次(换 model)。
    未配置 fallback 时行为 = 直接用主 provider(与改动前等价,只是多了超时/重试)。
    """
    from blog_rag.llm import get_client   # 延迟 import 破环
    try:
        return get_client().chat.completions.create(**kwargs)
    except _RETRYABLE:
        fb = _fallback_client()
        if fb is None:
            raise                           # 没配备用 → 如实抛错(上层 SSE 以 error 帧告知前端)
        return fb.chat.completions.create(**{**kwargs, "model": settings.fallback_model})
