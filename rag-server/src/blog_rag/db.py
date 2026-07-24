"""M10:数据库引擎 + 会话工厂(SQLAlchemy 2)。

- 引擎从 `settings.resolved_db_url` 读:未设 DATABASE_URL 时回退 data/admin.sqlite(本地零安装);
  生产/本地 PG 用 `postgresql+psycopg://...` 覆盖。
- 模型写成可移植类型(见 models.py),同一套 schema 两引擎通用。
- `get_db()` 是 FastAPI 请求级依赖:每请求一个 Session,结束即关。
- 懒初始化:import 本模块不连库(未装/未配 DB 也能导入 config);首次用到才建引擎。
"""
from __future__ import annotations

from collections.abc import Iterator

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from blog_rag.config import settings

_engine = None
_SessionLocal: sessionmaker[Session] | None = None


def _init() -> None:
    global _engine, _SessionLocal
    if _SessionLocal is not None:
        return
    url = settings.resolved_db_url
    # SQLite 需允许跨线程(FastAPI 同步端点跑线程池);PG 无此参数。
    connect_args = {"check_same_thread": False} if url.startswith("sqlite") else {}
    if url.startswith("sqlite"):
        settings.data_dir.mkdir(parents=True, exist_ok=True)   # 确保落盘目录存在
    _engine = create_engine(url, connect_args=connect_args, pool_pre_ping=True, future=True)
    _SessionLocal = sessionmaker(bind=_engine, autoflush=False, expire_on_commit=False)


def get_engine():
    _init()
    return _engine


def session_scope() -> Session:
    """新建一个 Session(调用方负责 close);CLI / 后台任务用。"""
    _init()
    assert _SessionLocal is not None
    return _SessionLocal()


def get_db() -> Iterator[Session]:
    """FastAPI 依赖:yield 请求级 Session,请求结束自动关闭。"""
    _init()
    assert _SessionLocal is not None
    db = _SessionLocal()
    try:
        yield db
    finally:
        db.close()
