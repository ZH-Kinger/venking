"""M6.1 对话界面(gr.Blocks)。

为什么用 Blocks 而非 ChatInterface:要自定义布局——左对话流、右来源面板(按 mode 渲染
[S#]/[W#]/建议)、顶部双开关(深度思考/联网),以及 👍👎 落盘。Blocks 全控制、能学到
组件/事件/State 全套(生产级)。

流式:调 `graph.stream_answer` 生成器,逐 token 累积刷新 Chatbot;末尾 done 事件渲染来源。
双开关:深度思考→deep_thinking(开 RAG-Fusion)、联网→web_mode(强制走联网),注入图 State
(优先级:用户 flag > 自动 router)。thread_id 每会话一个(gr.State),接 checkpointer;真正
用多轮历史做指代重组留 M8。
👍👎:Chatbot 的 like 事件 → feedback.record_feedback 落 JSONL(字段对齐 golden)。
"""
from __future__ import annotations

from uuid import uuid4

import gradio as gr

from blog_rag import feedback
from blog_rag.config import settings
from blog_rag.graph import stream_answer


def _render_sources(done: dict) -> str:
    """按 mode 渲染右侧来源面板(不互污:grounded 才有 [S#],web 才有 [W#]+URL)。"""
    mode = done.get("mode", "general")
    src = done.get("sources", [])
    if mode == "grounded":
        out = ["### 📚 来源(知识库 · 有据)"]
        out += [f"- **[{s['sid']}]** `{s['doc_id']}`"
                + (f" · {s['section']}" if s.get("section") else "") for s in src]
        return "\n".join(out)
    if mode == "web":
        out = ["### 🌐 联网来源(带 URL 出处)"]
        out += [f"- **[{s['wid']}]** [{s['title']}]({s['url']})" for s in src]
        return "\n".join(out)
    if mode == "refuse":
        return "### 🚫 诚实弃答\n本地知识库与联网均无权威依据 → 不臆造,如实说不知道。"
    # general
    out = ["### 💡 通用回答(**非知识库**,无出处,仅供参考)"]
    if done.get("suggestions"):
        out += ["", "**你可能想问(知识库相关主题):**"]
        out += [f"- `{s}`" for s in done["suggestions"]]
    return "\n".join(out)


_MODE_LABEL = {"grounded": "📚 接地", "web": "🌐 联网", "general": "💡 通用", "refuse": "🚫 弃答"}


def chat_fn(message: str, history: list, deep_thinking: bool, web_mode: bool,
            thread_id: str | None, last: dict | None = None):
    """流式对话处理器(生成器):累积 token 刷新对话,末尾渲染来源 + 记住本轮供反馈。"""
    if not (message or "").strip():
        yield history, "请输入问题。", thread_id, last   # 空输入:保留上一轮快照,别清掉(否则 👍👎 失效)
        return
    tid = thread_id or uuid4().hex                       # 每会话固定,接 checkpointer
    history = list(history) + [
        {"role": "user", "content": message},
        {"role": "assistant", "content": ""},
    ]
    acc, done = "", None
    for ev in stream_answer(message, deep_thinking=deep_thinking, web_mode=web_mode, thread_id=tid):
        if ev["type"] == "token":
            acc += ev["text"]
            history[-1]["content"] = acc
            yield history, "⏳ 生成中…", tid, None       # 流式增量刷新
        else:
            done = ev
    answer = (done.get("answer") or acc) if done else acc  # refuse 无 token,用 done 里的文本兜
    history[-1]["content"] = answer
    sources_md = _render_sources(done or {})
    badge = _MODE_LABEL.get((done or {}).get("mode", "general"), "")
    last = {                                             # 存本轮快照供 👍👎 落盘
        "question": message, "answer": answer, "mode": (done or {}).get("mode", "general"),
        "retrieved_doc_ids": (done or {}).get("retrieved_doc_ids", []),
        "sources": (done or {}).get("sources", []),
    }
    yield history, f"{badge}\n\n{sources_md}", tid, last


def _verdict_of(liked) -> str:
    """把 gr.LikeData.liked 归一成 up/down。

    **坑(auditor 2026-07-14 查 gradio 6.20 源码确认)**:只有 feedback_options 用精确
    "Like"/"Dislike" 时 liked 才是 bool;自定义标签会回传**标签字符串**,`if liked` 恒真→
    负反馈被记成正。这里对 bool 和字符串都鲁棒,双保险。
    """
    if isinstance(liked, bool):
        return "up" if liked else "down"
    s = str(liked)
    return "down" if any(k in s for k in ("Dislike", "dislike", "没用", "👎")) else "up"


def like_fn(data: gr.LikeData, last: dict | None):
    """👍👎 → 落盘 feedback.jsonl(字段对齐 golden,供回流评测集)。"""
    if not last:
        return
    verdict = _verdict_of(data.liked)
    try:
        feedback.record_feedback(
            verdict, last["question"], last["answer"], last["mode"],
            last.get("retrieved_doc_ids", []), last.get("sources", []),
        )
        gr.Info(f"已记录反馈:{'👍' if verdict == 'up' else '👎'}(→ data/feedback/feedback.jsonl)")
    except Exception as e:                       # 落盘失败不该崩 UI
        gr.Warning(f"反馈落盘失败:{type(e).__name__}")


def build_demo():
    with gr.Blocks(title="Blog RAG · Agentic 问答", fill_height=True) as demo:
        gr.Markdown("# 🧠 Blog RAG —— Agentic 知识库问答\n博客问题走**接地 RAG**(带引用)· 库外走**通用/联网**· 无据**诚实弃答**")
        thread_id = gr.State(None)
        last_exchange = gr.State(None)
        with gr.Row():
            deep = gr.Checkbox(label="🧩 深度思考(RAG-Fusion 多查询)", value=False)
            web = gr.Checkbox(label="🌐 联网搜索(强制)", value=False)
        with gr.Row():
            with gr.Column(scale=3):
                # 用精确 "Like"/"Dislike" → 渲染👍👎拇指 + 回传 bool(自定义中文标签会回传字符串,
                # 导致 like_fn verdict 反转,见 _verdict_of 注释 / ADR 提交闸记录)。
                chatbot = gr.Chatbot(height=460, label="对话",
                                     feedback_options=("Like", "Dislike"))
                msg = gr.Textbox(placeholder="问点什么…(例:NCCL 是什么?)", show_label=False,
                                 submit_btn=True)
                gr.Markdown("<small>👍👎 点消息右下角评价 → 沉淀到评测集</small>")
            with gr.Column(scale=2):
                sources = gr.Markdown("### 来源\n提问后在此显示引用/出处。", label="来源")

        outs = [chatbot, sources, thread_id, last_exchange]
        msg.submit(chat_fn, [msg, chatbot, deep, web, thread_id, last_exchange], outs).then(
            lambda: "", None, msg)                       # 清空输入框(last_exchange 传入→空输入时不清掉)
        chatbot.like(like_fn, [last_exchange], None)
    return demo


def _auth():
    """两者都填才启用鉴权;否则 None(仅本机开发用)。部署务必在 .env 设 UI_AUTH_USER/PASS。"""
    u, p = settings.ui_auth_user, settings.ui_auth_pass
    return (u, p) if (u and p) else None


if __name__ == "__main__":
    # server_name/port/auth 全从 config 读:本地默认 127.0.0.1 不暴露;
    # 部署容器里 .env 设 UI_HOST=0.0.0.0 + UI_AUTH_* 才对外并鉴权。
    build_demo().launch(
        server_name=settings.ui_host,
        server_port=settings.ui_port,
        auth=_auth(),
    )
