"""业务数据模型(SQLAlchemy 2,可移植类型)。

身份/登录/会话交给 **Logto**(见 logto_auth.py),本库不再存用户密码/会话。
这里只存业务数据,均以 Logto 的 `sub`(稳定 user_id 字符串)为归属键:
- AuditLog     后台写操作审计
- Conversation 用户的一段 AI 对话(对应一个 LangGraph thread_id)
- Message      对话里的每条消息(用户问 / 助手答)

用 Uuid / JSON / DateTime(timezone=True) / String 等通用类型,SQLite 与 PostgreSQL 通用。
"""
from __future__ import annotations

import uuid
from datetime import datetime

from sqlalchemy import JSON, DateTime, ForeignKey, String, Text, Uuid, func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class Base(DeclarativeBase):
    pass


def _uuid() -> uuid.UUID:
    return uuid.uuid4()


class AuditLog(Base):
    """后台写操作审计:谁(Logto sub)、对什么资源、做了什么、前后快照。"""

    __tablename__ = "audit_logs"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=_uuid)
    actor_sub: Mapped[str | None] = mapped_column(String(128), nullable=True, index=True)  # Logto user sub
    action: Mapped[str] = mapped_column(String(64))
    resource_type: Mapped[str | None] = mapped_column(String(64), nullable=True)
    resource_id: Mapped[str | None] = mapped_column(String(128), nullable=True)
    before_json: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    after_json: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    request_id: Mapped[str | None] = mapped_column(String(64), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), index=True)


class Conversation(Base):
    """用户的一段 AI 对话;user_sub=Logto sub,thread_id=LangGraph 短时记忆线程。"""

    __tablename__ = "conversations"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=_uuid)
    user_sub: Mapped[str] = mapped_column(String(128), index=True)      # 归属用户(跨设备可见)
    thread_id: Mapped[str] = mapped_column(String(128), index=True)     # 接 checkpointer 的 thread
    title: Mapped[str | None] = mapped_column(String(200), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), index=True
    )

    messages: Mapped[list[Message]] = relationship(
        back_populates="conversation", cascade="all, delete-orphan", order_by="Message.created_at"
    )


class Message(Base):
    """对话里的一条消息(role=user/assistant;助手答附 mode + 来源)。"""

    __tablename__ = "messages"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=_uuid)
    conversation_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("conversations.id", ondelete="CASCADE"), index=True
    )
    role: Mapped[str] = mapped_column(String(16))          # user | assistant
    content: Mapped[str] = mapped_column(Text)
    mode: Mapped[str | None] = mapped_column(String(16), nullable=True)      # grounded/web/general/refuse
    sources_json: Mapped[list | None] = mapped_column(JSON, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    conversation: Mapped[Conversation] = relationship(back_populates="messages")
