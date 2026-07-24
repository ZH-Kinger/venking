"""用户 AI 对话历史(按 Logto `sub` 归属;跨设备可见)。

登录用户每问一轮,record_turn 落一条 user + 一条 assistant 消息到其 (sub, thread) 对话;
未登录不落库(匿名仍可用)。列表/详情按 sub 严格隔离(A 看不到 B)。
"""
from __future__ import annotations

import uuid

from sqlalchemy import select
from sqlalchemy.orm import Session as DBSession

from blog_rag.db import session_scope
from blog_rag.models import Conversation, Message


def _get_or_create(db: DBSession, user_sub: str, thread_id: str, first_question: str) -> Conversation:
    conv = db.scalar(
        select(Conversation).where(Conversation.user_sub == user_sub, Conversation.thread_id == thread_id)
    )
    if conv is None:
        conv = Conversation(
            user_sub=user_sub, thread_id=thread_id, title=(first_question or "").strip()[:60] or None
        )
        db.add(conv)
        db.commit()
    return conv


def record_turn(user_sub: str, thread_id: str, question: str, answer: str,
                mode: str | None = None, sources: list | None = None) -> None:
    """记录一轮问答(登录用户;失败静默——历史落库不应拖垮问答)。"""
    if not (user_sub and thread_id):
        return
    try:
        with session_scope() as db:
            conv = _get_or_create(db, user_sub, thread_id, question)
            db.add(Message(conversation_id=conv.id, role="user", content=question))
            db.add(Message(conversation_id=conv.id, role="assistant", content=answer or "",
                           mode=mode, sources_json=sources))
            conv.title = conv.title or (question or "").strip()[:60] or None
            db.commit()
    except Exception:
        pass


def list_conversations(db: DBSession, user_sub: str, limit: int = 50, offset: int = 0) -> list[dict]:
    rows = db.scalars(
        select(Conversation).where(Conversation.user_sub == user_sub)
        .order_by(Conversation.updated_at.desc()).limit(limit).offset(offset)
    ).all()
    return [{
        "id": str(c.id), "thread_id": c.thread_id, "title": c.title,
        "updated_at": c.updated_at.isoformat() if c.updated_at else None,
    } for c in rows]


def get_conversation(db: DBSession, user_sub: str, conv_id: str) -> dict | None:
    """按 sub 隔离取详情;非本人或不存在 → None(上层返 404,不泄露他人存在)。"""
    try:
        cid = uuid.UUID(conv_id)
    except (ValueError, AttributeError, TypeError):   # 非法/None 一律当"不存在",不泄露
        return None
    conv = db.get(Conversation, cid)
    if conv is None or conv.user_sub != user_sub:
        return None
    return {
        "id": str(conv.id), "thread_id": conv.thread_id, "title": conv.title,
        "messages": [{
            "role": m.role, "content": m.content, "mode": m.mode,
            "sources": m.sources_json, "created_at": m.created_at.isoformat() if m.created_at else None,
        } for m in conv.messages],
    }
