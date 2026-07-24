"""用户 AI 历史按 Logto `sub` 严格隔离(history.py)—— 零网络/零 live-DB。

用进程内 SQLite(StaticPool 共享同一连接)建全套 schema,monkeypatch
`history.session_scope` 指到测试 sessionmaker,验证:
- record_turn 按 (sub, thread_id) 归组落 user+assistant 两条消息;
- list_conversations / get_conversation 对 A 绝不泄露 B;
- get_conversation 传他人 conv_id / 非法 UUID → None;
- 未登录(user_sub 为空)→ record_turn no-op(对应 optional_user_sse 匿名 None 后跳过落库)。
"""
from __future__ import annotations

import uuid

import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from blog_rag import history
from blog_rag.models import Base, Conversation


@pytest.fixture
def db_factory(monkeypatch):
    """进程内共享 SQLite;返回一个可反复取 Session 的 sessionmaker。

    StaticPool + 单连接 → 多次 session_scope() 看到同一份内存库(否则各连接各库)。
    """
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
        future=True,
    )
    Base.metadata.create_all(engine)
    SessionLocal = sessionmaker(bind=engine, autoflush=False, expire_on_commit=False, future=True)
    # record_turn 内部 `with session_scope() as db:`,故换掉 history 模块级引用即可。
    monkeypatch.setattr(history, "session_scope", SessionLocal)
    return SessionLocal


def test_record_turn_persists_user_and_assistant_pair(db_factory):
    history.record_turn("userA", "t1", "问题一", "回答一", mode="grounded", sources=[{"id": "S1"}])
    with db_factory() as db:
        convs = history.list_conversations(db, "userA")
        assert len(convs) == 1
        detail = history.get_conversation(db, "userA", convs[0]["id"])
    assert detail is not None
    assert [m["role"] for m in detail["messages"]] == ["user", "assistant"]
    assert detail["messages"][0]["content"] == "问题一"
    assert detail["messages"][1]["content"] == "回答一"
    assert detail["messages"][1]["mode"] == "grounded"
    assert detail["messages"][1]["sources"] == [{"id": "S1"}]
    assert detail["title"] == "问题一"


def test_same_thread_appends_into_one_conversation(db_factory):
    history.record_turn("userA", "t1", "Q1", "A1")
    history.record_turn("userA", "t1", "Q2", "A2")
    with db_factory() as db:
        convs = history.list_conversations(db, "userA")
        assert len(convs) == 1  # 同 (sub,thread) 复用同一 Conversation
        detail = history.get_conversation(db, "userA", convs[0]["id"])
    assert [m["content"] for m in detail["messages"]] == ["Q1", "A1", "Q2", "A2"]
    # 标题保持首问,不被后续问题覆盖。
    assert detail["title"] == "Q1"


def test_different_threads_are_separate_conversations(db_factory):
    history.record_turn("userA", "t1", "Q-in-1", "A")
    history.record_turn("userA", "t2", "Q-in-2", "A")
    with db_factory() as db:
        convs = history.list_conversations(db, "userA")
    assert len(convs) == 2
    assert {c["thread_id"] for c in convs} == {"t1", "t2"}


def test_list_never_leaks_other_user(db_factory):
    history.record_turn("userA", "ta", "A的问题", "A的答案")
    history.record_turn("userB", "tb", "B的问题", "B的答案")
    with db_factory() as db:
        a_convs = history.list_conversations(db, "userA")
        b_convs = history.list_conversations(db, "userB")
    assert len(a_convs) == 1 and a_convs[0]["thread_id"] == "ta"
    assert len(b_convs) == 1 and b_convs[0]["thread_id"] == "tb"
    a_ids = {c["id"] for c in a_convs}
    b_ids = {c["id"] for c in b_convs}
    assert a_ids.isdisjoint(b_ids)


def test_get_conversation_cross_user_returns_none(db_factory):
    history.record_turn("userA", "ta", "A only", "answer")
    history.record_turn("userB", "tb", "B only", "answer")
    with db_factory() as db:
        b_conv_id = history.list_conversations(db, "userB")[0]["id"]
        # A 拿 B 的 conv_id → None(不泄露他人存在)。
        assert history.get_conversation(db, "userA", b_conv_id) is None
        # B 自己取自然可见,作为对照。
        assert history.get_conversation(db, "userB", b_conv_id) is not None


def test_get_conversation_bad_uuid_returns_none(db_factory):
    with db_factory() as db:
        # conv_id 来自路由 path 参数(恒为 str);非法/空 UUID 串 → None。
        assert history.get_conversation(db, "userA", "not-a-uuid") is None
        assert history.get_conversation(db, "userA", "") is None
        assert history.get_conversation(db, "userA", "12345") is None


def test_get_conversation_unknown_but_valid_uuid_returns_none(db_factory):
    with db_factory() as db:
        assert history.get_conversation(db, "userA", str(uuid.uuid4())) is None


def test_anonymous_turn_is_noop(db_factory):
    """匿名(user_sub 为空)不落库——对应 optional_user_sse 匿名 None 后跳过 record_turn。"""
    history.record_turn("", "t1", "Q", "A")
    history.record_turn(None, "t1", "Q", "A")  # type: ignore[arg-type]
    history.record_turn("userA", "", "Q", "A")  # 缺 thread_id 同样跳过
    with db_factory() as db:
        assert db.query(Conversation).count() == 0


def test_list_pagination_scoped_to_user(db_factory):
    for i in range(3):
        history.record_turn("userA", f"t{i}", f"Q{i}", "A")
    history.record_turn("userB", "tb", "Bq", "A")
    with db_factory() as db:
        page = history.list_conversations(db, "userA", limit=2, offset=0)
        assert len(page) == 2
        rest = history.list_conversations(db, "userA", limit=2, offset=2)
        assert len(rest) == 1
        # 分页始终限定在 A 名下,总数为 3(不含 B)。
        all_a = history.list_conversations(db, "userA", limit=50)
        assert len(all_a) == 3
