"""迁移 c3d2e1f0a9b8(attachments 表 + messages.parts_json)—— upgrade/downgrade 可逆。

为什么起子进程跑 alembic 而不是在进程内 `command.upgrade`:
- `alembic/env.py` 里有 `fileConfig(config.config_file_name)`,在进程内跑会**重配全局
  logging 并禁用已存在的 logger**,污染同一次 pytest 会话里其它用例(observability 那批
  正是靠 logger 断言的);
- env.py 的连接串取自 `settings.resolved_db_url`,子进程用 `DATABASE_URL` 环境变量覆盖
  即可(env 变量优先级高于 .env 文件),不必给全局单例打补丁。
  → 顺带保证**绝不碰** .env 里那个 PostgreSQL 开发库,也不碰 data/admin.sqlite。

覆盖:
1. upgrade head 后有 attachments 表(列/索引/唯一约束齐全)与 messages.parts_json;
2. 老数据零迁移:迁移前写的 message,升级后 parts_json 为 NULL 且内容不变;
3. downgrade -1 干净移除两者且老数据仍在;再 upgrade 回来可用(可逆,不是单程票);
4. 迁移建出来的 schema 与 models.py 的 metadata 一致(防"模型改了迁移没改"的漂移);
5. (owner_sub, sha256) 唯一约束在**库层**真的生效 —— 应用层去重之外的最后一道。
"""
from __future__ import annotations

import os
import subprocess
import sys
from pathlib import Path

import pytest
from sqlalchemy import create_engine, inspect, text

from blog_rag.models import Base

pytest.importorskip("alembic", reason="需要 blog_rag[admin] 依赖")

PROJECT_ROOT = Path(__file__).resolve().parents[1]
REVISION = "c3d2e1f0a9b8"
PREV = "b2f1c0d3e4a5"


def _alembic(db_path: Path, *args: str) -> None:
    """在子进程里跑 alembic,库指向 tmp 文件(DATABASE_URL 覆盖 .env)。"""
    env = {**os.environ, "DATABASE_URL": f"sqlite:///{db_path}"}
    proc = subprocess.run(
        [sys.executable, "-m", "alembic", *args],
        cwd=PROJECT_ROOT, env=env, capture_output=True, text=True, timeout=120, check=False,
    )
    assert proc.returncode == 0, f"alembic {' '.join(args)} 失败:\n{proc.stdout}\n{proc.stderr}"


def _engine(db_path: Path):
    return create_engine(f"sqlite:///{db_path}", future=True)


@pytest.fixture(scope="module")
def upgraded(tmp_path_factory) -> Path:
    """升到 head 的一份 tmp 库(只读断言共用,省掉重复的子进程开销)。"""
    db = tmp_path_factory.mktemp("mig") / "m.sqlite"
    _alembic(db, "upgrade", "head")
    return db


# ---------------- 1. upgrade 后的 schema ----------------


def test_upgrade_creates_attachments_table(upgraded):
    insp = inspect(_engine(upgraded))
    assert "attachments" in insp.get_table_names()
    cols = {c["name"]: c for c in insp.get_columns("attachments")}
    assert set(cols) == {"id", "owner_sub", "kind", "mime", "bytes", "sha256",
                         "filename", "width", "height", "created_at"}
    # 归属键与计量字段不可空:配额靠 SUM(bytes) WHERE owner_sub,NULL 会让它算错。
    for required in ("id", "owner_sub", "kind", "mime", "bytes", "sha256", "created_at"):
        assert cols[required]["nullable"] is False, f"{required} 不该可空"
    # 展示字段可空(没有原始名 / 未解析尺寸都是正常的)。
    for optional in ("filename", "width", "height"):
        assert cols[optional]["nullable"] is True


def test_upgrade_creates_expected_indexes_and_unique(upgraded):
    insp = inspect(_engine(upgraded))
    idx = {i["name"] for i in insp.get_indexes("attachments")}
    assert {"ix_attachments_owner_sub", "ix_attachments_sha256",
            "ix_attachments_created_at"} <= idx
    uniques = {u["name"]: u["column_names"] for u in insp.get_unique_constraints("attachments")}
    assert uniques.get("uq_attachment_owner_sha") == ["owner_sub", "sha256"], \
        "用户内去重靠这个唯一约束,应用层的 find_by_sha 只是快路径"


def test_upgrade_adds_nullable_parts_json_to_messages(upgraded):
    cols = {c["name"]: c for c in inspect(_engine(upgraded)).get_columns("messages")}
    assert "parts_json" in cols
    assert cols["parts_json"]["nullable"] is True, "必须可空:老消息保持 NULL,读取回落 content"


def test_migrated_schema_matches_models_metadata(upgraded):
    """防漂移:迁移建出来的列与 models.py 声明的一致。

    (这两处分开维护,历史上最常见的事故就是改了模型忘了写迁移 —— 本地 create_all
    照跑,生产 alembic 后表里没那列,500 只在生产出现。)
    """
    insp = inspect(_engine(upgraded))
    for table in ("attachments", "messages", "conversations"):
        migrated = {c["name"] for c in insp.get_columns(table)}
        declared = {c.name for c in Base.metadata.tables[table].columns}
        assert migrated == declared, f"{table} 列漂移:迁移 {migrated} vs 模型 {declared}"


def test_unique_owner_sha_is_enforced_by_the_database(upgraded, tmp_path):
    """唯一约束在库层真的生效(不是只写在模型里)。"""
    db = tmp_path / "uniq.sqlite"
    _alembic(db, "upgrade", "head")
    ins = text("INSERT INTO attachments (id, owner_sub, kind, mime, bytes, sha256) "
               "VALUES (:id, :owner, 'image', 'image/png', 48, :sha)")
    with _engine(db).begin() as conn:
        conn.execute(ins, {"id": "1" * 32, "owner": "userA", "sha": "a" * 64})
        # 同用户同内容 → 撞唯一索引
        with pytest.raises(Exception) as e:
            conn.execute(ins, {"id": "2" * 32, "owner": "userA", "sha": "a" * 64})
        assert "unique" in str(e.value).lower()
    with _engine(db).begin() as conn:
        # 不同用户的同一内容必须允许(有意不跨用户去重)
        conn.execute(ins, {"id": "3" * 32, "owner": "userB", "sha": "a" * 64})
        assert conn.execute(text("SELECT COUNT(*) FROM attachments")).scalar() == 2


# ---------------- 2. 老数据零迁移 + downgrade 可逆 ----------------


def test_downgrade_is_reversible_and_keeps_legacy_rows(tmp_path):
    """迁移前的老消息 → 升级 → 降级 → 再升级,全程内容不变、不需要回填。"""
    db = tmp_path / "round.sqlite"
    _alembic(db, "upgrade", PREV)          # 停在本迁移**之前**

    with _engine(db).begin() as conn:
        conn.execute(text(
            "INSERT INTO conversations (id, user_sub, thread_id, title) "
            "VALUES ('11111111111111111111111111111111', 'userA', 't1', '老对话')"))
        conn.execute(text(
            "INSERT INTO messages (id, conversation_id, role, content) VALUES "
            "('22222222222222222222222222222222','11111111111111111111111111111111',"
            "'user','老问题')"))
        assert "attachments" not in inspect(conn).get_table_names()

    _alembic(db, "upgrade", "head")
    with _engine(db).begin() as conn:
        row = conn.execute(text("SELECT content, parts_json FROM messages")).one()
        assert row.content == "老问题"
        assert row.parts_json is None, "老消息必须保持 NULL(零迁移的前提)"
        assert "attachments" in inspect(conn).get_table_names()
        conn.execute(text(
            "INSERT INTO attachments (id, owner_sub, kind, mime, bytes, sha256) VALUES "
            f"('{'3' * 32}', 'userA', 'image', 'image/png', 48, '{'a' * 64}')"))

    _alembic(db, "downgrade", "-1")
    with _engine(db).begin() as conn:
        insp = inspect(conn)
        assert "attachments" not in insp.get_table_names(), "downgrade 没删干净"
        assert "parts_json" not in {c["name"] for c in insp.get_columns("messages")}
        # 老数据仍在:降级不能顺手丢用户历史。
        assert conn.execute(text("SELECT content FROM messages")).scalar() == "老问题"
        assert conn.execute(text("SELECT title FROM conversations")).scalar() == "老对话"

    _alembic(db, "upgrade", "head")        # 再升回来仍然可用(不是单程票)
    with _engine(db).begin() as conn:
        assert "attachments" in inspect(conn).get_table_names()
        assert conn.execute(text("SELECT COUNT(*) FROM attachments")).scalar() == 0
        assert conn.execute(text("SELECT content FROM messages")).scalar() == "老问题"


def test_head_is_this_revision(upgraded):
    """head 就是本次迁移(有人加了新迁移却没跑,断言会提醒更新本文件)。"""
    with _engine(upgraded).begin() as conn:
        assert conn.execute(text("SELECT version_num FROM alembic_version")).scalar() == REVISION


def test_migration_never_touches_the_real_database(tmp_path):
    """守卫:子进程只认 DATABASE_URL 指定的 tmp 库,不碰 data/admin.sqlite。"""
    from blog_rag.config import settings

    real = Path(str(settings.data_dir / "admin.sqlite"))
    before = real.stat().st_mtime_ns if real.exists() else None
    db = tmp_path / "guard.sqlite"
    _alembic(db, "upgrade", "head")
    after = real.stat().st_mtime_ns if real.exists() else None
    assert after == before, f"迁移写到了真实库 {real}"
    assert db.exists() and db.stat().st_size > 0, "对照:tmp 库确实被写了"
