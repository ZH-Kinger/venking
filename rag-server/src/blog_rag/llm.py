"""大模型核心调用(M0)。

两个关键理念:
1) OpenAI 兼容接口:GLM-5.2 提供“OpenAI 兼容”端点,故直接用官方 `openai` SDK,
   只改 base_url + model 即可连它。换 base_url 也能连百炼/DeepSeek/本地 Ollama。
2) 推理模型的两段流:GLM-5.2 会“思考”。流式返回里先吐 `reasoning_content`
   (思考过程),再吐 `content`(正式回复)。下面把两段分开处理。

运行连通性 smoke:  python -m blog_rag.llm
"""
from __future__ import annotations

from openai import OpenAI

from blog_rag.config import settings
from blog_rag.reliability import create_completion  # M7:主+备用降级(内部延迟 import 破环)


def get_client() -> OpenAI:
    """按统一配置构造 OpenAI 兼容客户端(指向 GLM-5.2 的 MaaS 端点)。

    M7 韧性:带 timeout + max_retries。SDK 会对**该重试的错误类**(连接错误/超时/429/5xx)
    做指数退避重试,对 4xx(鉴权/参数)直接抛——正好符合我们要的语义,无需手写 tenacity。
    """
    return OpenAI(api_key=settings.require_api_key(), base_url=settings.llm_base_url,
                  timeout=settings.llm_timeout, max_retries=settings.llm_max_retries)


def chat_stream(messages: list[dict], *, show_reasoning: bool = True) -> str:
    """流式对话,边收边打印,返回最终“正式回复”文本。

    参数:
        messages: OpenAI 格式消息,如 [{"role": "user", "content": "..."}]
        show_reasoning: 是否打印模型思考过程
    返回:
        拼接好的正式回复(不含思考过程)。
    """
    client = get_client()
    completion = client.chat.completions.create(
        model=settings.llm_model,
        messages=messages,
        stream=True,
    )

    answer_parts: list[str] = []
    is_answering = False  # 是否已进入“正式回复”阶段

    if show_reasoning:
        print("\n" + "=" * 20 + " 思考过程 " + "=" * 20)

    for chunk in completion:
        if not chunk.choices:
            continue
        delta = chunk.choices[0].delta

        reasoning = getattr(delta, "reasoning_content", None)
        if reasoning and show_reasoning and not is_answering:
            print(reasoning, end="", flush=True)

        if getattr(delta, "content", None):
            if not is_answering:
                print("\n" + "=" * 20 + " 完整回复 " + "=" * 20)
                is_answering = True
            print(delta.content, end="", flush=True)
            answer_parts.append(delta.content)

    print()
    return "".join(answer_parts)


def _emit_token(text: str) -> None:
    """把一段正文 token 通过 LangGraph 的 custom 流发给上层(UI 用)。

    为什么这样:图节点走裸 openai SDK(非 LangChain 模型),`stream_mode="messages"` 拿不到
    token;改用 `get_stream_writer()` 主动发 custom 事件是最小改动。**必须 guard**:
    - CLI/eval 里 run_chat 不在图流式上下文 → get_stream_writer() 抛错 → 吞掉,退化为纯 print;
    - 图内但没开 custom 流(如 eval 的 .invoke)→ writer 是 no-op。
    这样 UI 能拿增量,而 CLI/eval 行为完全不变(基线零风险)。
    """
    if not text:
        return
    try:
        from langgraph.config import get_stream_writer
        writer = get_stream_writer()
    except Exception:
        return
    if writer:
        try:
            writer({"type": "token", "text": text})
        except Exception:
            pass


def _consume(completion, *, stream: bool, show_reasoning: bool) -> str:
    """兼容 stream / 非 stream 两种返回,边打印/发流边收集正式回复。

    (刻意与 rag_chain._consume 并存:M2 的 rag_chain 是冻结的 A/B 基线,不去动它;
     M5 图节点共用这份,基线零风险。)
    """
    if not stream:                       # 非流式:一次性拿完整回复
        msg = completion.choices[0].message
        if show_reasoning and getattr(msg, "reasoning_content", None):
            print(msg.reasoning_content)
        text = msg.content or ""
        print(text)
        _emit_token(text)                # UI 若在监听 custom 流则收到整段;否则 no-op
        return text
    parts, answering = [], False
    for chunk in completion:
        if not chunk.choices:
            continue
        delta = chunk.choices[0].delta
        if show_reasoning and getattr(delta, "reasoning_content", None) and not answering:
            print(delta.reasoning_content, end="", flush=True)
        if getattr(delta, "content", None):
            answering = True
            print(delta.content, end="", flush=True)
            _emit_token(delta.content)   # 逐 token 发给 UI(guard:非流式上下文自动退化)
            parts.append(delta.content)
    print()
    return "".join(parts)


# 长度指令(M6.2c):作为**生成期**指令追加到 system(检索用干净问题,不被污染)。
# 只加"简短/详细"两档;None/""/未知 → 标准长度(不加指令,行为与原来一致=零回归)。
_LENGTH_DIRECTIVE = {
    "short": "\n\n**长度要求:简短作答**——直接给结论/要点,控制在 2–4 句或少量要点内,不展开、不赘述。",
    "detailed": "\n\n**长度要求:详细作答**——系统展开:背景、原理、步骤/示例、注意事项讲清,可分点、可举例。",
}


def run_chat(system: str, user: str, *, stream: bool = True, show_reasoning: bool = False,
             temperature: float | None = None, length: str | None = None) -> str:
    """M5 图节点共用的生成器:system+user → 一次 LLM 调用 → 返回正式回复文本。

    生成任务**保留思考**(temp 默认取 settings.temperature=0);判断类调用请在各自
    grader 里显式 enable_thinking=False,不走这里。

    length: "short"/"detailed" → 给 system 追加长度指令;其余(含 None)= 标准长度不追加。
    """
    system = system + _LENGTH_DIRECTIVE.get(length or "", "")
    completion = create_completion(
        model=settings.llm_model,
        temperature=settings.temperature if temperature is None else temperature,
        stream=stream,
        messages=[{"role": "system", "content": system}, {"role": "user", "content": user}],
    )
    return _consume(completion, stream=stream, show_reasoning=show_reasoning)


if __name__ == "__main__":
    answer = chat_stream([{"role": "user", "content": "你是谁?用一句话介绍自己。"}])
    print(f"\n[smoke] ✅ 打通,正式回复共 {len(answer)} 字。")
