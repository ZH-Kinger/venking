"""附件上传:attachments 表 + messages.parts_json

Revision ID: c3d2e1f0a9b8
Revises: b2f1c0d3e4a5
Create Date: 2026-07-30

混合文图对话的两层表示:
- messages.parts_json 存标准 OpenAI parts 结构,只管**表示与顺序**(图可夹在文字中间);
  纯文本消息为 NULL,读取时回落 content —— 所以**老数据零迁移**。
- attachments 表管**字节**:配额(SUM(bytes) WHERE owner_sub)、去重、垃圾回收。
  这些都要能用一条 SQL 算清楚,扫 JSON 做不到、也没法建唯一索引。

(owner_sub, sha256) 唯一 = 用户内去重。**有意不做跨用户去重**:那会让删自己的图影响
别人,且能通过"上传某文件看是否秒传"探测他人是否持有该文件。
"""
from __future__ import annotations

import sqlalchemy as sa

from alembic import op

revision = "c3d2e1f0a9b8"
down_revision = "b2f1c0d3e4a5"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "attachments",
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.Column("owner_sub", sa.String(length=128), nullable=False),
        sa.Column("kind", sa.String(length=16), nullable=False, server_default="image"),
        sa.Column("mime", sa.String(length=64), nullable=False),
        sa.Column("bytes", sa.Integer(), nullable=False),
        sa.Column("sha256", sa.String(length=64), nullable=False),
        sa.Column("filename", sa.String(length=255), nullable=True),
        sa.Column("width", sa.Integer(), nullable=True),
        sa.Column("height", sa.Integer(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("owner_sub", "sha256", name="uq_attachment_owner_sha"),
    )
    op.create_index("ix_attachments_owner_sub", "attachments", ["owner_sub"])
    op.create_index("ix_attachments_sha256", "attachments", ["sha256"])
    op.create_index("ix_attachments_created_at", "attachments", ["created_at"])

    # nullable:老消息保持 NULL,读取回落 content,不需要回填
    op.add_column("messages", sa.Column("parts_json", sa.JSON(), nullable=True))


def downgrade() -> None:
    op.drop_column("messages", "parts_json")
    op.drop_index("ix_attachments_created_at", table_name="attachments")
    op.drop_index("ix_attachments_sha256", table_name="attachments")
    op.drop_index("ix_attachments_owner_sub", table_name="attachments")
    op.drop_table("attachments")
