"""Logto IAM 迁移:退役自建 users/sessions/login_events,新增 conversations/messages

身份/登录改由 Logto(见 logto_auth.py):
- 删 users / sessions / login_events(自建会话/密码,已退役)。
- audit_logs.actor 从本地用户 UUID(actor_user_id)改存 Logto sub 字符串(actor_sub)。
- 新增 conversations / messages:按 Logto `sub` 归属的用户 AI 对话历史(跨设备可见)。

注:本迁移会丢弃旧 audit_logs 的 actor_user_id 关联(dev 库近乎空数据,可接受)。

Revision ID: b2f1c0d3e4a5
Revises: 9b59b7bdb04b
Create Date: 2026-07-24 20:10:00.000000

"""
from collections.abc import Sequence

import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "b2f1c0d3e4a5"
down_revision: str | Sequence[str] | None = "9b59b7bdb04b"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    """Upgrade schema."""
    # --- 退役自建身份表 ---
    op.drop_index(op.f("ix_sessions_user_id"), table_name="sessions")
    op.drop_index(op.f("ix_sessions_token_hash"), table_name="sessions")
    op.drop_table("sessions")
    op.drop_index(op.f("ix_users_username"), table_name="users")
    op.drop_index(op.f("ix_users_email"), table_name="users")
    op.drop_table("users")
    op.drop_index(op.f("ix_login_events_user_id"), table_name="login_events")
    op.drop_index(op.f("ix_login_events_created_at"), table_name="login_events")
    op.drop_table("login_events")

    # --- audit_logs:actor_user_id(UUID) → actor_sub(Logto sub 字符串)---
    with op.batch_alter_table("audit_logs") as batch:
        batch.drop_index(op.f("ix_audit_logs_actor_user_id"))
        batch.drop_column("actor_user_id")
        batch.add_column(sa.Column("actor_sub", sa.String(length=128), nullable=True))
        batch.create_index(op.f("ix_audit_logs_actor_sub"), ["actor_sub"], unique=False)

    # --- 用户 AI 对话历史(按 Logto sub 归属)---
    op.create_table(
        "conversations",
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.Column("user_sub", sa.String(length=128), nullable=False),
        sa.Column("thread_id", sa.String(length=128), nullable=False),
        sa.Column("title", sa.String(length=200), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_conversations_user_sub"), "conversations", ["user_sub"], unique=False)
    op.create_index(op.f("ix_conversations_thread_id"), "conversations", ["thread_id"], unique=False)
    op.create_index(op.f("ix_conversations_updated_at"), "conversations", ["updated_at"], unique=False)

    op.create_table(
        "messages",
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.Column("conversation_id", sa.Uuid(), nullable=False),
        sa.Column("role", sa.String(length=16), nullable=False),
        sa.Column("content", sa.Text(), nullable=False),
        sa.Column("mode", sa.String(length=16), nullable=True),
        sa.Column("sources_json", sa.JSON(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.ForeignKeyConstraint(["conversation_id"], ["conversations.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_messages_conversation_id"), "messages", ["conversation_id"], unique=False)


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_index(op.f("ix_messages_conversation_id"), table_name="messages")
    op.drop_table("messages")
    op.drop_index(op.f("ix_conversations_updated_at"), table_name="conversations")
    op.drop_index(op.f("ix_conversations_thread_id"), table_name="conversations")
    op.drop_index(op.f("ix_conversations_user_sub"), table_name="conversations")
    op.drop_table("conversations")

    with op.batch_alter_table("audit_logs") as batch:
        batch.drop_index(op.f("ix_audit_logs_actor_sub"))
        batch.drop_column("actor_sub")
        batch.add_column(sa.Column("actor_user_id", sa.Uuid(), nullable=True))
        batch.create_index(op.f("ix_audit_logs_actor_user_id"), ["actor_user_id"], unique=False)

    op.create_table(
        "login_events",
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.Column("user_id", sa.Uuid(), nullable=True),
        sa.Column("identifier_hash", sa.String(length=64), nullable=True),
        sa.Column("event_type", sa.String(length=32), nullable=False),
        sa.Column("ip_hash", sa.String(length=64), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_login_events_created_at"), "login_events", ["created_at"], unique=False)
    op.create_index(op.f("ix_login_events_user_id"), "login_events", ["user_id"], unique=False)
    op.create_table(
        "users",
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.Column("email", sa.String(length=320), nullable=False),
        sa.Column("username", sa.String(length=64), nullable=False),
        sa.Column("password_hash", sa.String(length=255), nullable=False),
        sa.Column("role", sa.String(length=16), nullable=False),
        sa.Column("status", sa.String(length=16), nullable=False),
        sa.Column("last_login_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_users_email"), "users", ["email"], unique=True)
    op.create_index(op.f("ix_users_username"), "users", ["username"], unique=True)
    op.create_table(
        "sessions",
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.Column("user_id", sa.Uuid(), nullable=False),
        sa.Column("token_hash", sa.String(length=64), nullable=False),
        sa.Column("expires_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("last_seen_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("ip_hash", sa.String(length=64), nullable=True),
        sa.Column("user_agent", sa.String(length=400), nullable=True),
        sa.Column("revoked_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_sessions_token_hash"), "sessions", ["token_hash"], unique=True)
    op.create_index(op.f("ix_sessions_user_id"), "sessions", ["user_id"], unique=False)
