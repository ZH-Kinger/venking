"""业务数据模型(SQLAlchemy 2,可移植类型)。

身份/登录/会话交给 **Logto**(见 logto_auth.py),本库不再存用户密码/会话。
这里只存业务数据,均以 Logto 的 `sub`(稳定 user_id 字符串)为归属键:
- AuditLog     后台写操作审计
- Conversation 用户的一段 AI 对话(对应一个 LangGraph thread_id)
- Message      对话里的每条消息(用户问 / 助手答)
- Attachment   用户上传的文件(图片等),按内容 sha256 寻址落盘

**消息内容的两层表示**(混合文图对话):
- `Message.content` 纯文本,保持不变 —— 检索、摘要、导出、旧数据都还靠它;
- `Message.parts_json` 存**标准 OpenAI parts 结构**(`[{type:"text"},{type:"image_url"}]`),
  只负责**表示与顺序**(图夹在文字中间也能表达),不存字节;
- 字节、配额、去重、垃圾回收全归 `Attachment` 表管 —— 因为这些都要能用一条 SQL 算清楚
  (`SELECT SUM(bytes) WHERE owner_sub=?`),而扫 JSON 做不到,也没法建唯一索引。
纯文本消息 `parts_json` 为 NULL,读取时回落 `content`,老数据零迁移。

用 Uuid / JSON / DateTime(timezone=True) / String 等通用类型,SQLite 与 PostgreSQL 通用。
"""
from __future__ import annotations

import uuid
from datetime import datetime

from sqlalchemy import (
    JSON,
    DateTime,
    ForeignKey,
    Integer,
    String,
    Text,
    UniqueConstraint,
    Uuid,
    func,
)
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
    # 标准 OpenAI parts 结构,仅当消息含附件时才写;纯文本消息为 NULL → 读取回落 content。
    # 形如 [{"type":"text","text":"这图什么问题"},
    #       {"type":"image_url","image_url":{"url":"attachment:<id>"}}]
    # url 用自定义 scheme 存**附件 id** 而非真实路径:真实路径会随存储布局变化,
    # 而且渲染时必须经过鉴权端点(见 attachments 路由),不能让 URL 直接可取。
    parts_json: Mapped[list | None] = mapped_column(JSON, nullable=True)
    mode: Mapped[str | None] = mapped_column(String(16), nullable=True)      # grounded/web/general/refuse
    sources_json: Mapped[list | None] = mapped_column(JSON, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    conversation: Mapped[Conversation] = relationship(back_populates="messages")


class Attachment(Base):
    """用户上传的文件(当前只开图片)。内容寻址:落盘路径由 sha256 决定。

    为什么**不挂 message_id**:上传发生在提问之前(先 POST 拿 id,再带 id 提问),
    此刻消息还不存在;而且同一附件可被多条消息引用(追问同一张图)。
    归属键是 `owner_sub` —— 配额、鉴权、清理都只认它,不依赖是否已被某条消息引用。

    去重靠 `(owner_sub, sha256)` 唯一索引:同一用户重复上传同一张图只占一份空间、
    只算一次配额。**不做跨用户去重** —— 那会让"删自己的图"影响别人,且能通过
    "上传某文件看是否秒传"探测他人是否持有该文件。
    """

    __tablename__ = "attachments"
    __table_args__ = (UniqueConstraint("owner_sub", "sha256", name="uq_attachment_owner_sha"),)

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=_uuid)
    owner_sub: Mapped[str] = mapped_column(String(128), index=True)   # Logto sub;匿名不允许上传
    kind: Mapped[str] = mapped_column(String(16), default="image")    # image(暂只此一种)
    mime: Mapped[str] = mapped_column(String(64))
    bytes: Mapped[int] = mapped_column(Integer)                      # 配额按它求和,单位 byte
    sha256: Mapped[str] = mapped_column(String(64), index=True)      # 内容寻址键 = 落盘路径来源
    filename: Mapped[str | None] = mapped_column(String(255), nullable=True)  # 原始名,仅供展示
    width: Mapped[int | None] = mapped_column(Integer, nullable=True)
    height: Mapped[int | None] = mapped_column(Integer, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), index=True)
