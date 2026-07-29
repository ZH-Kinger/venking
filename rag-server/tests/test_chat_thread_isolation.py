"""跨用户上下文泄露回归:checkpointer 的线程键必须按 Logto `sub` 命名空间隔离。

线上实测到的 bug(非假设):LangGraph 的 checkpointer 只按 `thread_id` 存状态、**不认用户**,
而前端的 thread 存在 localStorage(每浏览器一个,不随账号变)。同一浏览器换账号登录会复用
同一个 thread → 后登录者的提问带着前一个人的对话上下文。
证据:`conversations` 表两条 `user_sub` 不同、`thread_id` 相同(`g5o3hzxgc3sms4g0pxo`),
而 `checkpoints.sqlite` 里该 thread 下有 10 个 checkpoint(两账号轮次混在一个线程)。
注意:**库侧历史本来就是隔离的**(history 按 (user_sub, thread_id) 建行),漏的是喂给模型的上下文。

修法(命名空间**下沉到 graph 层**,即 checkpointer 的拥有者):
- `graph._thread_key(thread_id, user_sub)` 拼键,`graph.strip_ns()` 还原;
- `stream_answer` / `answer_graph` 收 `user_sub` kwarg,内部寻址 checkpointer;
- 对外(done 事件)始终是**不带命名空间**的原始 id;
- `api.py::chat` 只负责把身份传下去,不再自己拼/剥前缀。

本文件的断言层次也随之下移:**看 checkpointer 实际收到的键**,而不是"api 传给
stream_answer 的参数" —— 前者才是泄露与否的唯一判据,换实现也不会测空。
覆盖:
1. 核心:同 thread + 不同 sub → checkpointer 键互不相同;
2. 匿名原样(没有身份可绑,不该被加前缀);
3. 防叠加:把 `done.thread_id` 当下一轮 `thread` 发回,键仍是单层前缀;
4. 流出客户端的 `done.thread_id` 不含 \\x1f 且等于客户端原本发的那个;
5. 落库用原始 id(否则 /api/me/conversations 返回的 id 和前端的对不上);
6. 同用户同 thread 多轮 → 键稳定(隔离不能做成"每轮新线程",那会毁掉多轮记忆);
7. 下沉本身的保证:两入口同键、`_thread_key`/`strip_ns` 不变量、api 只传身份不拼键;
8. 真实 langgraph + 真实 SqliteSaver:证明"换了键"确实换掉了喂给模型的上下文。
全程零网络 / 零 LLM / 零 live-DB(checkpoint 落 tmp,业务库调用被替身接住)。
"""
from __future__ import annotations

import json
from typing import Annotated, TypedDict

import pytest
from langchain_core.messages import AIMessage, HumanMessage
from langgraph.graph import END, START, StateGraph
from langgraph.graph.message import add_messages

from blog_rag import graph

SEP = "\x1f"          # 单元分隔符:不会出现在 sub 或前端生成的 id 里
CLIENT_THREAD = "g5o3hzxgc3sms4g0pxo"      # 线上出事那条 thread(原样用作回归输入)
SUB_A = "user_aaa111"
SUB_B = "user_bbb222"

_FINAL = {
    "generation": "答", "mode": "general", "sources": [],
    "retrieved_doc_ids": [], "contexts": [], "suggestions": [],
}


class _FakeCompiled:
    """假 CompiledStateGraph:**记录 checkpointer 实际收到的线程键**。

    两个入口都覆盖(stream / invoke),这样"两入口同键"能对着同一份记录断言。
    """

    def __init__(self):
        self.keys: list[str] = []
        self.inits: list[dict] = []

    def _record(self, init, cfg):
        self.keys.append(cfg["configurable"]["thread_id"])
        self.inits.append(init)

    def stream(self, init, cfg, stream_mode=None):
        self._record(init, cfg)
        yield ("custom", {"type": "token", "text": "答"})
        yield ("values", dict(_FINAL))

    def invoke(self, init, cfg):
        self._record(init, cfg)
        return dict(_FINAL)


class _RecordSpy:
    """`history.record_turn` 的替身:只记参数,不碰库。"""

    def __init__(self):
        self.calls: list[tuple] = []

    def __call__(self, user_sub, thread_id, question, answer, mode=None, sources=None):
        self.calls.append((user_sub, thread_id, question, answer, mode, sources))

    @property
    def thread_ids(self) -> list[str]:
        return [c[1] for c in self.calls]


class _Chat:
    """TestClient + 两处观察点;`.ask()` 直接返回解析好的 SSE 事件。

    `.keys` 是 checkpointer 真正被寻址的线程键(本文件的核心断言对象)。
    """

    def __init__(self, client, compiled: _FakeCompiled, record: _RecordSpy):
        self.client = client
        self.compiled = compiled
        self.record = record

    @property
    def keys(self) -> list[str]:
        return self.compiled.keys

    def ask(self, q="问题", *, sub: str | None = None, thread: str = "", **params) -> list[dict]:
        qs = {"q": q, **params}
        if thread:
            qs["thread"] = thread
        if sub:
            qs["access_token"] = sub      # 假 optional_user_sse 把令牌串直接当 sub
        r = self.client.get("/api/chat", params=qs)
        assert r.status_code == 200, f"{r.status_code}: {r.text[:200]}"
        return _events(r.text)

    def done(self, *a, **kw) -> dict:
        evs = self.ask(*a, **kw)
        assert evs[-1]["type"] == "done", evs[-1]
        return evs[-1]


def _events(body: str) -> list[dict]:
    """解析 SSE 帧(api 只发 `data: <json>\\n\\n`)。"""
    return [
        json.loads(line[len("data: "):])
        for line in body.split("\n\n")
        if line.startswith("data: ")
    ]


def _fake_sse_identity(request):
    """令牌串 == sub 的最小身份解析(真校验由 test_logto_auth.py 负责)。"""
    from blog_rag import logto_auth

    tok = request.query_params.get("access_token") or ""
    if not tok:
        auth = request.headers.get("authorization", "")
        if auth.lower().startswith("bearer "):
            tok = auth[7:]
    if not tok:
        return None
    return logto_auth.Identity(sub=tok, scopes=[], roles=[], claims={"sub": tok})


def _client(monkeypatch):
    """真 ASGI 客户端 + 真 `graph.stream_answer`,只把身份与落库换成替身。"""
    pytest.importorskip("fastapi", reason="需要 blog_rag[api] 依赖")
    pytest.importorskip("jwt", reason="需要 blog_rag[admin] 依赖(logto_auth)")
    from fastapi.testclient import TestClient

    from blog_rag import api as api_mod
    from blog_rag import logto_auth, security

    # 端点挂了 guard:关掉令牌与限流,免得用例被 429/401 挡住(与本次改动无关)。
    monkeypatch.setattr(security.settings, "api_token", "")
    monkeypatch.setattr(security.settings, "rate_limit_enabled", False)
    # chat() 里是 `from blog_rag.logto_auth import optional_user_sse`(调用时取模块属性)。
    monkeypatch.setattr(logto_auth, "optional_user_sse", _fake_sse_identity)

    record = _RecordSpy()
    history = pytest.importorskip("blog_rag.history", reason="需要 blog_rag[admin] 依赖")
    monkeypatch.setattr(history, "record_turn", record)
    return api_mod, TestClient(api_mod.app, raise_server_exceptions=False), record


@pytest.fixture()
def chat(monkeypatch):
    """/api/chat → **真** graph.stream_answer → 假编译图(只截 checkpointer 的键)。"""
    _api_mod, client, record = _client(monkeypatch)
    compiled = _FakeCompiled()
    monkeypatch.setattr(graph, "get_graph", lambda: compiled)
    with client as c:
        yield _Chat(c, compiled, record)


# ---------------- 1. 核心:同 thread 不同 sub → 两个 checkpointer 键 ----------------

def test_same_thread_two_users_get_distinct_checkpointer_keys(chat):
    """出事场景本身:同一浏览器(同一个 localStorage thread)换账号登录。

    断言 checkpointer 收到的线程键互不相同 —— 只有这样状态才落在两条独立线程上,
    后登录者拿不到前一个人的上下文。
    """
    chat.ask("A 的问题", sub=SUB_A, thread=CLIENT_THREAD)
    chat.ask("B 的问题", sub=SUB_B, thread=CLIENT_THREAD)

    a_key, b_key = chat.keys
    assert a_key != b_key, "同一 thread 下两个账号仍共用一条线程 → 上下文互串"
    # 且都不是那个裸的客户端 id(裸 id 才是被两人共享的那个键)。
    assert CLIENT_THREAD not in (a_key, b_key)


def test_checkpointer_key_is_sub_namespaced(chat):
    """键的格式钉死:`<sub>\\x1f<客户端 thread>`,分隔符只出现一次。"""
    chat.ask(sub=SUB_A, thread=CLIENT_THREAD)
    key = chat.keys[0]
    assert key == f"{SUB_A}{SEP}{CLIENT_THREAD}"
    assert key.count(SEP) == 1
    assert key.endswith(CLIENT_THREAD)


def test_two_users_keys_disjoint_across_many_client_ids(chat):
    """多个客户端 id 一起看:A、B 的键集合完全不相交。"""
    for t in ("t1", "t2", "t3"):
        chat.ask(sub=SUB_A, thread=t)
        chat.ask(sub=SUB_B, thread=t)
    a = set(chat.keys[0::2])
    b = set(chat.keys[1::2])
    assert len(a) == 3 and len(b) == 3
    assert a.isdisjoint(b)


def test_sub_prefix_cannot_be_forged_via_thread_param(chat):
    """B 想冒充 A:把 `A\\x1f...` 塞进 thread 参数 —— 被 Query 的 pattern 挡在门外。

    `thread` 的正则是 `^[A-Za-z0-9_-]*$`,\\x1f 与其它标点一律 422,
    所以"自带前缀"这条构造路径不成立(前缀只可能由 graph 层按已验证的 sub 拼出来)。
    """
    for forged in (f"{SUB_A}{SEP}{CLIENT_THREAD}", f"{SUB_A}\x1e{CLIENT_THREAD}", "a b", "a/b"):
        r = chat.client.get("/api/chat", params={"q": "x", "thread": forged,
                                                 "access_token": SUB_B})
        assert r.status_code == 422, f"{forged!r} 应被参数校验挡住,实际 {r.status_code}"
    assert chat.keys == []      # 一次都没进到 graph


def test_separator_inside_sub_still_strips_back_to_client_id(chat):
    """对抗:假如 sub 自己含 \\x1f(Logto 不会,但方案不该只在"分隔符唯一"时成立)。

    `strip_ns` 用 `rsplit(SEP, 1)[-1]`(取最后一段)而非 `split[1]`,配合 `thread` 的正则
    (客户端 id 绝不含 SEP),无论 sub 里有几个分隔符,回给前端的都还原成原始 id。
    """
    weird = f"weird{SEP}sub"
    chat.done(sub=weird, thread=CLIENT_THREAD)
    done = chat.done(sub=weird, thread=CLIENT_THREAD)
    assert chat.keys[0] == f"{weird}{SEP}{CLIENT_THREAD}"
    assert done["thread_id"] == CLIENT_THREAD
    assert len(set(chat.keys)) == 1                    # 仍然稳定,没每轮换线程
    assert chat.record.thread_ids == [CLIENT_THREAD, CLIENT_THREAD]


# ---------------- 2. 匿名:原样透传,不加前缀 ----------------

def test_anonymous_key_is_the_bare_client_thread(chat):
    """匿名(无 token)没有身份可绑 → checkpointer 键必须是原始 id。"""
    chat.ask(thread=CLIENT_THREAD)
    assert chat.keys == [CLIENT_THREAD]
    assert SEP not in chat.keys[0]


def test_anonymous_and_logged_in_same_thread_still_split(chat):
    """同一浏览器登录前/后:匿名那轮与登录那轮也落在不同键上。"""
    chat.ask("匿名问的", thread=CLIENT_THREAD)
    chat.ask("登录后问的", sub=SUB_A, thread=CLIENT_THREAD)
    anon, signed = chat.keys
    assert anon == CLIENT_THREAD
    assert signed == f"{SUB_A}{SEP}{CLIENT_THREAD}"
    assert anon != signed


def test_anonymous_turn_is_not_recorded(chat):
    """匿名不落库(对照:api 只在 identity 存在时调 record_turn)。"""
    chat.ask(thread=CLIENT_THREAD)
    assert chat.record.calls == []


def test_logged_in_without_thread_param_is_still_namespaced(chat):
    """登录但没给 thread:graph 自造 id **也要**进命名空间(下沉后的新行为)。

    旧实现里 api 层只在"客户端给了 thread"时加前缀,自造 id 会落在**无命名空间**的
    全局键上;若前端此后回带它,下一轮又变成 `sub\\x1f<uuid>` —— 两轮不同线程,
    第一轮上下文当场丢。下沉到 graph 层后由构造覆盖,连自造 id 都带前缀。
    """
    done = chat.done(sub=SUB_A)
    key = chat.keys[0]
    assert key.startswith(f"{SUB_A}{SEP}"), f"自造 id 未进命名空间:{key!r}"
    assert key.count(SEP) == 1
    # 对外回的仍是**裸** id(前缀不外泄),且正是键去掉前缀那一段。
    assert SEP not in done["thread_id"]
    assert key == f"{SUB_A}{SEP}{done['thread_id']}"


def test_first_turn_without_thread_then_echo_stays_one_key(chat):
    """接上一条:第一轮不带 thread、第二轮回带 done.thread_id → 仍是**同一条**线程。

    这是"观察 1"的实质危害(第一轮上下文丢失),下沉后必须闭合。
    """
    first = chat.done("第一轮", sub=SUB_A)
    chat.done("第二轮", sub=SUB_A, thread=first["thread_id"])
    assert len(set(chat.keys)) == 1, f"第一轮与第二轮不在同一线程:{chat.keys}"


def test_two_users_without_thread_never_collide(chat):
    """无 thread 时每次都是新线程 —— 不会因为"都没给 thread"而撞在一起。"""
    chat.ask(sub=SUB_A)
    chat.ask(sub=SUB_B)
    chat.ask()
    assert len(set(chat.keys)) == 3


# ---------------- 3. 防叠加:前端回传 done.thread_id 不能叠成两层前缀 ----------------

def test_client_echoing_done_thread_id_does_not_double_prefix(chat):
    """模拟前端行为:第一轮拿 done.thread_id 存起来,第二轮当 thread 发回。

    若 done 回的是带前缀的值,第二轮会被**二次加前缀**叠成 `sub\\x1fsub\\x1fxxx`,
    每轮换一条新线程 → 多轮记忆当场失效(隔离做过头,等于把 checkpointer 废了)。
    """
    first = chat.done("第一轮", sub=SUB_A, thread=CLIENT_THREAD)
    second = chat.done("第二轮", sub=SUB_A, thread=first["thread_id"])

    k1, k2 = chat.keys
    assert k2.count(SEP) == 1, f"叠加了:{k2!r}"
    assert k2 == f"{SUB_A}{SEP}{CLIENT_THREAD}"
    assert k1 == k2, "回传 done.thread_id 后必须仍是同一条线程"
    assert second["thread_id"] == CLIENT_THREAD


def test_echo_loop_stays_single_prefix_over_many_turns(chat):
    """对抗:连回传 5 轮(前端每轮都覆写 localStorage)—— 键恒定、前缀恒为一层。"""
    thread = CLIENT_THREAD
    for i in range(5):
        thread = chat.done(f"Q{i}", sub=SUB_A, thread=thread)["thread_id"]
    assert set(chat.keys) == {f"{SUB_A}{SEP}{CLIENT_THREAD}"}
    assert thread == CLIENT_THREAD


def test_echo_loop_does_not_leak_across_users(chat):
    """回传循环 + 换账号:B 回传自己拿到的 id,仍进不了 A 的线程。"""
    a_done = chat.done("A", sub=SUB_A, thread=CLIENT_THREAD)
    b_done = chat.done("B", sub=SUB_B, thread=a_done["thread_id"])
    chat.done("B 再问", sub=SUB_B, thread=b_done["thread_id"])
    a_k, b_k1, b_k2 = chat.keys
    assert a_k == f"{SUB_A}{SEP}{CLIENT_THREAD}"
    assert b_k1 == b_k2 == f"{SUB_B}{SEP}{CLIENT_THREAD}"
    assert a_k != b_k1


# ---------------- 4. 出网事件:done.thread_id 必须是客户端认得的原始值 ----------------

def test_done_thread_id_has_no_separator_and_equals_client_thread(chat):
    done = chat.done(sub=SUB_A, thread=CLIENT_THREAD)
    assert SEP not in done["thread_id"]
    assert done["thread_id"] == CLIENT_THREAD


def test_done_never_leaks_sub_to_client(chat):
    """整条 SSE 响应体里不得出现 sub 或分隔符(命名空间是纯服务端概念)。"""
    r = chat.client.get("/api/chat", params={"q": "x", "thread": CLIENT_THREAD,
                                             "access_token": SUB_A})
    assert SEP not in r.text
    assert SUB_A not in r.text


def test_two_users_both_get_their_own_client_thread_back(chat):
    """两个账号拿回的都是各自发上来的那个 id(前端 localStorage 不该被服务端改写)。"""
    a = chat.done(sub=SUB_A, thread=CLIENT_THREAD)
    b = chat.done(sub=SUB_B, thread=CLIENT_THREAD)
    assert a["thread_id"] == b["thread_id"] == CLIENT_THREAD
    # 对外同一个 id,对内两条线程 —— 这正是本次修法的意图。
    assert chat.keys[0] != chat.keys[1]


def test_token_events_untouched(chat):
    """只改线程寻址,token 事件不受影响(别顺手动了正文流)。"""
    evs = chat.ask("正文", sub=SUB_A, thread=CLIENT_THREAD)
    assert [e["type"] for e in evs] == ["token", "done"]
    assert evs[0]["text"] == "答"


# ---------------- 5. 落库用原始 id(否则 /api/me/conversations 与前端对不上) ----------------

def test_recorded_thread_id_is_the_raw_client_id(chat):
    chat.ask("Q", sub=SUB_A, thread=CLIENT_THREAD)
    sub, thread_id, question, answer, mode, _sources = chat.record.calls[0]
    assert sub == SUB_A
    assert thread_id == CLIENT_THREAD, "落库带了前缀 → 前端拿云端会话点不开"
    assert SEP not in thread_id
    assert question == "Q"
    assert answer == "答"
    assert mode == "general"


def test_recorded_thread_id_matches_done_thread_id(chat):
    """库里的 id 与回给前端的 id 必须是同一个(cloud 会话靠它接续)。"""
    done = chat.done(sub=SUB_A, thread=CLIENT_THREAD)
    assert chat.record.thread_ids == [done["thread_id"]]


def test_two_users_recorded_under_same_raw_thread_but_own_sub(chat):
    """库侧本来就按 (sub, thread) 隔离:同一 raw thread 落两行,sub 不同。

    这正是线上那张表的样子 —— 说明本次修的是 checkpointer 侧,库侧行为**不许被改动**。
    """
    chat.ask("A", sub=SUB_A, thread=CLIENT_THREAD)
    chat.ask("B", sub=SUB_B, thread=CLIENT_THREAD)
    assert [(c[0], c[1]) for c in chat.record.calls] == [
        (SUB_A, CLIENT_THREAD), (SUB_B, CLIENT_THREAD),
    ]


def test_recorded_thread_falls_back_to_done_thread(chat):
    """登录但没给 thread:落库用 done 里的裸 id,不能是空串(空串会被 record_turn 丢掉)。"""
    done = chat.done(sub=SUB_A)
    assert chat.record.thread_ids == [done["thread_id"]]
    assert chat.record.thread_ids[0]
    assert SEP not in chat.record.thread_ids[0]


# ---------------- 6. 多轮稳定性:隔离不能退化成"每轮新线程" ----------------

def test_same_user_same_thread_is_stable_across_turns(chat):
    """同用户同 thread 连问 3 轮 → 键恒定(否则 checkpointer 记不住上下文)。"""
    for i in range(3):
        chat.ask(f"Q{i}", sub=SUB_A, thread=CLIENT_THREAD)
    assert set(chat.keys) == {f"{SUB_A}{SEP}{CLIENT_THREAD}"}


def test_same_user_different_threads_stay_separate(chat):
    """同用户切会话(前端新建对话 → 新 thread)仍分线程,别被前缀合并掉。"""
    chat.ask(sub=SUB_A, thread="conv-one")
    chat.ask(sub=SUB_A, thread="conv-two")
    assert len(set(chat.keys)) == 2


def test_anonymous_same_thread_is_also_stable(chat):
    """匿名多轮也得稳定(匿名分支没身份,更不能每轮换线程)。"""
    chat.ask("Q1", thread=CLIENT_THREAD)
    chat.ask("Q2", thread=CLIENT_THREAD)
    assert chat.keys == [CLIENT_THREAD, CLIENT_THREAD]


def test_flags_do_not_affect_thread_namespacing(chat):
    """deep/web/length 等开关切换不改线程(同一会话开关联网不该丢上下文)。"""
    chat.ask(sub=SUB_A, thread=CLIENT_THREAD)
    chat.ask(sub=SUB_A, thread=CLIENT_THREAD, deep="true", web="true", length="short")
    assert len(set(chat.keys)) == 1


# ---------------- 7. 下沉本身的保证:两入口同键 + 纯函数不变量 + api 只传身份 ----------------

@pytest.fixture()
def compiled(monkeypatch) -> _FakeCompiled:
    fake = _FakeCompiled()
    monkeypatch.setattr(graph, "get_graph", lambda: fake)
    return fake


def test_both_entrypoints_address_the_same_key(compiled):
    """**下沉的核心**:同一个 (thread, sub) 经两个入口必须落在同一个 checkpointer 键上。

    若各走各的(比如只有 stream_answer 加了前缀),同一会话在流式/非流式之间来回
    就会分裂成两条线程 —— 而且非流式那条还是无命名空间的,等于洞没堵上。
    """
    list(graph.stream_answer("q", thread_id=CLIENT_THREAD, user_sub=SUB_A))
    graph.answer_graph("q", thread_id=CLIENT_THREAD, user_sub=SUB_A)
    assert compiled.keys == [f"{SUB_A}{SEP}{CLIENT_THREAD}"] * 2


def test_both_entrypoints_isolate_the_same_way(compiled):
    """两入口的隔离语义也一致:换 sub 就换键,匿名都不加前缀。"""
    list(graph.stream_answer("q", thread_id=CLIENT_THREAD, user_sub=SUB_B))
    graph.answer_graph("q", thread_id=CLIENT_THREAD, user_sub=SUB_B)
    list(graph.stream_answer("q", thread_id=CLIENT_THREAD))
    graph.answer_graph("q", thread_id=CLIENT_THREAD)
    assert compiled.keys == [
        f"{SUB_B}{SEP}{CLIENT_THREAD}", f"{SUB_B}{SEP}{CLIENT_THREAD}",
        CLIENT_THREAD, CLIENT_THREAD,
    ]


def test_answer_graph_self_minted_id_is_namespaced_too(compiled):
    """`answer_graph` 不带 thread_id 但带 sub → 自造 id 同样进命名空间,且每次新线程。"""
    graph.answer_graph("q", user_sub=SUB_A)
    graph.answer_graph("q", user_sub=SUB_A)
    assert all(k.startswith(f"{SUB_A}{SEP}") and k.count(SEP) == 1 for k in compiled.keys)
    assert len(set(compiled.keys)) == 2


def test_stream_answer_done_reports_bare_thread_id(compiled):
    """graph 层直接用时,done 回的也是裸 id(命名空间不外泄的责任在这一层)。"""
    done = list(graph.stream_answer("q", thread_id=CLIENT_THREAD, user_sub=SUB_A))[-1]
    assert done["thread_id"] == CLIENT_THREAD
    assert compiled.keys == [f"{SUB_A}{SEP}{CLIENT_THREAD}"]


def test_stream_answer_without_thread_id_never_reuses_a_key(compiled):
    seen = {list(graph.stream_answer("q"))[-1]["thread_id"] for _ in range(3)}
    assert len(seen) == 3, "无 thread_id 时必须每次新线程,否则所有匿名请求共用一条"
    assert len(set(compiled.keys)) == 3


def test_answer_graph_without_thread_id_never_reuses_a_key(compiled):
    for _ in range(3):
        graph.answer_graph("q")
    assert len(set(compiled.keys)) == 3


# --- 纯函数不变量(便宜、失败定位准) ---

def test_thread_key_namespaces_for_logged_in_user():
    assert graph._thread_key(CLIENT_THREAD, SUB_A) == f"{SUB_A}{SEP}{CLIENT_THREAD}"
    assert graph._thread_key(CLIENT_THREAD, SUB_A) != graph._thread_key(CLIENT_THREAD, SUB_B)


@pytest.mark.parametrize("anon", [None, ""])
def test_thread_key_is_identity_for_anonymous(anon):
    """匿名(None 或空 sub)绝不加前缀 —— 空 sub 若拼成 `\\x1fxxx` 会让所有匿名共用键。"""
    assert graph._thread_key(CLIENT_THREAD, anon) == CLIENT_THREAD


def test_strip_ns_round_trips():
    for sub in (SUB_A, f"weird{SEP}sub", "a" * 200):
        assert graph.strip_ns(graph._thread_key(CLIENT_THREAD, sub)) == CLIENT_THREAD


def test_strip_ns_is_noop_on_bare_id():
    """匿名键本来就没前缀,还原必须原样(别把裸 id 也切一刀)。"""
    assert graph.strip_ns(CLIENT_THREAD) == CLIENT_THREAD
    assert graph.strip_ns("") == ""


def test_strip_ns_takes_last_segment_not_second():
    """sub 自身含分隔符时必须取**最后一段**。

    (注:`rsplit(SEP, 1)[-1]` 与 `split(SEP)[-1]` 等价,真正的错法是取 `[1]`——
    那会把 sub 的第二段当成 thread 还给前端。本例钉的是"取最后一段"这个性质。)
    """
    key = graph._thread_key(CLIENT_THREAD, f"weird{SEP}sub")
    assert key.count(SEP) == 2
    assert graph.strip_ns(key) == CLIENT_THREAD
    assert graph.strip_ns(key) != "sub"


def test_thread_key_is_injective_over_users():
    """不同 sub × 同 thread 不可能撞键(拼接歧义会让隔离形同虚设)。"""
    keys = {graph._thread_key(CLIENT_THREAD, s) for s in (SUB_A, SUB_B, "user_a", "user_aaa1114")}
    assert len(keys) == 4


# --- api 传输层的契约:只传身份,不自己拼键 ---

def test_api_forwards_identity_not_a_prebuilt_key(monkeypatch):
    """api 必须传**裸** thread_id + `user_sub`;自己拼前缀就会与 graph 层叠加。"""
    api_mod, client, _record = _client(monkeypatch)
    seen: list[dict] = []

    def _spy(query, **kw):
        seen.append(kw)
        yield {"type": "done", "answer": "", "mode": "general", "sources": [],
               "retrieved_doc_ids": [], "contexts": [], "suggestions": [],
               "request_id": "r", "thread_id": kw.get("thread_id") or "gen", "trace": [],
               "latency_ms": 0.0}

    monkeypatch.setattr(api_mod, "stream_answer", _spy)
    with client as c:
        c.get("/api/chat", params={"q": "x", "thread": CLIENT_THREAD, "access_token": SUB_A})
        c.get("/api/chat", params={"q": "x", "thread": CLIENT_THREAD})
    assert seen[0]["thread_id"] == CLIENT_THREAD, "api 不该预先拼前缀"
    assert seen[0]["user_sub"] == SUB_A
    assert seen[1]["thread_id"] == CLIENT_THREAD
    assert seen[1]["user_sub"] is None, "匿名必须显式传 None,别漏传让 kwarg 静默回落"


def test_rag_chain_answer_does_not_forward_thread_or_sub(monkeypatch):
    """`rag_chain.answer`(cli/eval)不传 thread_id/user_sub → 每次全新匿名线程。"""
    import blog_rag.graph as graph_mod
    from blog_rag import rag_chain

    seen: list[dict] = []

    def _spy(query, **kw):
        seen.append(kw)
        return {**_FINAL, "answer": ""}

    monkeypatch.setattr(graph_mod, "answer_graph", _spy)
    monkeypatch.setattr(rag_chain.settings, "use_graph", True, raising=False)
    rag_chain.answer("q")
    assert seen, "未走到 graph 分支(use_graph 开关名可能已改)"
    assert seen[0].get("thread_id") is None
    assert seen[0].get("user_sub") is None


# ---------------- 8. 真实 checkpointer:证明"换了键"确实换掉了上下文 ----------------
#
# 上面几节证明的是"键不同"。但这次修的是**喂给模型的上下文**,
# 只有让**真实 langgraph + 真实 SqliteSaver** 跑一遍,才能证明:
#   (a) 复用同一个键确实会串(即线上那个 bug 的机制,不是猜的);
#   (b) 走 graph 层入口(带 user_sub)之后确实断开;
#   (c) \x1f 能被 SqliteSaver 原样存取(它进的是 checkpoints 表的键,
#       若被截断/规范化,两人又回到同一条线程,而且是静默的);
#   (d) 重启(关连接重开库)后带前缀的线程仍续得上 —— 隔离不能以牺牲持久多轮为代价;
#   (e) 两个入口在**真库**上也确实共用一条线程(下沉"由构造保证"的最终验收)。


class MiniState(TypedDict, total=False):
    """(定义在模块级:本文件开了 `from __future__ import annotations`,
    函数内定义的 TypedDict 解析注解时取不到局部名字。)"""

    question: str
    messages: Annotated[list, add_messages]
    generation: str
    mode: str
    sources: list
    retrieved_doc_ids: list
    contexts: list
    suggestions: list


def _node(state):
    """把本线程见过的所有提问拼成答案 —— 谁的问题出现在答案里,就是谁的上下文被看见了。"""
    seen = [m.content for m in state.get("messages", []) if m.type == "human"]
    q = state.get("question", "")
    return {
        "messages": [HumanMessage(content=q), AIMessage(content="ok")],
        "generation": "本线程见过: " + " | ".join(seen + [q]),
        "mode": "general", "sources": [], "retrieved_doc_ids": [],
        "contexts": [], "suggestions": [],
    }


def _mini_app(saver):
    builder = StateGraph(MiniState)
    builder.add_node("n", _node)
    builder.add_edge(START, "n")
    builder.add_edge("n", END)
    return builder.compile(checkpointer=saver)


@pytest.fixture()
def saver_factory(monkeypatch, tmp_path):
    """指向 tmp 的真实 SqliteSaver 工厂(绝不碰 data/checkpoints.sqlite)。"""
    pytest.importorskip("langgraph.checkpoint.sqlite", reason="需要 blog_rag[agent] 依赖")
    from types import SimpleNamespace

    from blog_rag import memory

    monkeypatch.setattr(
        memory, "settings",
        SimpleNamespace(data_dir=tmp_path, checkpoint_db=tmp_path / "checkpoints.sqlite"),
    )
    made = []

    def _make():
        s = memory.make_checkpointer()
        made.append(s)
        return s

    yield _make
    for s in made:
        conn = getattr(s, "conn", None)
        if conn is not None:
            conn.close()


def _keys_in(saver) -> list[str]:
    """checkpoints 表里**实际存在**的线程键(去重保序)。"""
    out = []
    for t in saver.list(None):
        k = t.config["configurable"]["thread_id"]
        if k not in out:
            out.append(k)
    return out


def _say(app, thread_id: str, text: str) -> list[str]:
    """直接按线程键跑一轮(绕开入口层),返回该线程累计见过的**提问**。"""
    out = app.invoke({"question": text}, {"configurable": {"thread_id": thread_id}})
    return [m.content for m in out["messages"] if m.type == "human"]


def test_real_checkpointer_same_key_bleeds_context(saver_factory):
    """先把 bug 的机制钉住:同一个键下,后来者看得见前一个人说过的话。

    这条**必须常绿**(它描述的是 langgraph 的既有行为);它一旦变红,说明
    checkpointer 语义变了,整套隔离方案的前提需要重新评估。
    """
    app = _mini_app(saver_factory())
    _say(app, CLIENT_THREAD, "A 的私密问题")
    seen = _say(app, CLIENT_THREAD, "B 的问题")
    assert seen == ["A 的私密问题", "B 的问题"], "这就是线上那 10 个 checkpoint 混在一起的原因"


def test_real_checkpointer_stream_answer_isolates_by_user_sub(monkeypatch, saver_factory):
    """真库 + 真 stream_answer:B 那一轮的答案里不得出现 A 说过的任何东西。"""
    saver = saver_factory()
    monkeypatch.setattr(graph, "get_graph", lambda: _mini_app(saver))

    def ask(q, sub):
        return list(graph.stream_answer(q, thread_id=CLIENT_THREAD, user_sub=sub))[-1]["answer"]

    assert ask("A的私密问题", SUB_A) == "本线程见过: A的私密问题"
    b = ask("B的问题", SUB_B)
    assert b == "本线程见过: B的问题"
    assert "A的私密问题" not in b
    # 反向也不泄露,且 A 自己的上下文完好(隔离不等于清空)。
    assert ask("A的追问", SUB_A) == "本线程见过: A的私密问题 | A的追问"


def test_real_checkpointer_two_entrypoints_share_one_thread(monkeypatch, saver_factory):
    """真库上的"由构造保证":stream_answer 写进去的上下文,answer_graph 同 (thread,sub) 读得到,
    换个 sub 就读不到。两个入口不能各走各的。
    """
    saver = saver_factory()
    monkeypatch.setattr(graph, "get_graph", lambda: _mini_app(saver))

    list(graph.stream_answer("流式那轮", thread_id=CLIENT_THREAD, user_sub=SUB_A))
    same = graph.answer_graph("非流式追问", thread_id=CLIENT_THREAD, user_sub=SUB_A)
    assert same["answer"] == "本线程见过: 流式那轮 | 非流式追问"

    other = graph.answer_graph("B 的非流式", thread_id=CLIENT_THREAD, user_sub=SUB_B)
    assert "流式那轮" not in other["answer"]

    assert sorted(_keys_in(saver)) == sorted(
        [f"{SUB_A}{SEP}{CLIENT_THREAD}", f"{SUB_B}{SEP}{CLIENT_THREAD}"]
    )


def test_real_checkpointer_keeps_unit_separator_in_thread_key(monkeypatch, saver_factory):
    """\\x1f 必须原样存进 SqliteSaver 的键。

    若被截断/规范化(比如只留 sub 之前的部分),两个账号会**静默**回到同一条线程 ——
    最坏的一类失败:测键的用例全绿,线上照泄。
    """
    saver = saver_factory()
    monkeypatch.setattr(graph, "get_graph", lambda: _mini_app(saver))
    list(graph.stream_answer("A的私密问题", thread_id=CLIENT_THREAD, user_sub=SUB_A))

    keys = _keys_in(saver)
    assert keys == [f"{SUB_A}{SEP}{CLIENT_THREAD}"], f"库里的键被改写了:{keys!r}"
    # 裸 id 与光秃秃的 sub 都不是同一条线程的别名。
    assert CLIENT_THREAD not in keys
    assert SUB_A not in keys


def test_real_checkpointer_anonymous_key_stays_bare(monkeypatch, saver_factory):
    """匿名那条在真库里就是裸 id(不该凭空多出 `None\\x1f...` 之类的前缀)。"""
    saver = saver_factory()
    monkeypatch.setattr(graph, "get_graph", lambda: _mini_app(saver))
    list(graph.stream_answer("匿名的问题", thread_id=CLIENT_THREAD))
    assert _keys_in(saver) == [CLIENT_THREAD]


def test_real_checkpointer_prefixed_thread_survives_restart(saver_factory):
    """重启(关连接重开同一个库文件)后,带前缀的线程仍续得上、且仍不串。"""
    app1 = _mini_app(saver_factory())
    a_key = f"{SUB_A}{SEP}{CLIENT_THREAD}"
    b_key = f"{SUB_B}{SEP}{CLIENT_THREAD}"
    _say(app1, a_key, "重启前 A")
    _say(app1, b_key, "重启前 B")

    app2 = _mini_app(saver_factory())          # 新连接、新 saver,同一个库文件
    assert _say(app2, a_key, "重启后 A") == ["重启前 A", "重启后 A"]
    assert _say(app2, b_key, "重启后 B") == ["重启前 B", "重启后 B"]


def test_real_checkpointer_end_to_end_through_api(monkeypatch, saver_factory):
    """全链路(/api/chat → 真 stream_answer → 真 SqliteSaver)复刻线上场景。

    断言一起成立:B 看不到 A 的上下文、A 多轮记忆完好、库里恰好三条键
    (匿名裸 id + 两条带前缀)—— 与线上"一条键 10 个 checkpoint"形成对照。
    """
    _api_mod, client, record = _client(monkeypatch)
    saver = saver_factory()
    monkeypatch.setattr(graph, "get_graph", lambda: _mini_app(saver))
    with client as c:
        chat = _Chat(c, _FakeCompiled(), record)     # 本例只用 client / record
        a1 = chat.done("A的私密问题", sub=SUB_A, thread=CLIENT_THREAD)
        assert a1["answer"] == "本线程见过: A的私密问题"
        b = chat.done("B的问题", sub=SUB_B, thread=CLIENT_THREAD)
        assert b["answer"] == "本线程见过: B的问题"
        assert "A的私密问题" not in b["answer"]
        a2 = chat.done("A的追问", sub=SUB_A, thread=CLIENT_THREAD)
        assert a2["answer"] == "本线程见过: A的私密问题 | A的追问"
        anon = chat.done("匿名的问题", thread=CLIENT_THREAD)
        assert anon["answer"] == "本线程见过: 匿名的问题"

    assert sorted(_keys_in(saver)) == sorted([
        f"{SUB_A}{SEP}{CLIENT_THREAD}", f"{SUB_B}{SEP}{CLIENT_THREAD}", CLIENT_THREAD,
    ])
    # 对外的 id 全程是裸值;库侧仍是"同 raw thread、不同 sub"(线上那张表的样子)。
    assert {d["thread_id"] for d in (a1, b, a2, anon)} == {CLIENT_THREAD}
    assert [(r[0], r[1]) for r in record.calls] == [
        (SUB_A, CLIENT_THREAD), (SUB_B, CLIENT_THREAD), (SUB_A, CLIENT_THREAD),
    ]
