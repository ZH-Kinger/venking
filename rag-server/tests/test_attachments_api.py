"""附件上传 API(me_routes.py)+ /api/chat 的 `att` 引用 + history 的 parts —— 零网络零 live-DB。

被测对象:
- `POST /api/me/attachments`、`GET|DELETE /api/me/attachments/{id}`、
  `GET /api/me/attachments/quota`
- `me_routes._as_uuid` / `_safe_name` / `_disposition`
- `api.py::chat` 的 `att`(逗号分隔附件 id)owner 过滤
- `history.record_turn(attachment_ids=...)` 与 `get_conversation` 的 `parts`

隔离手段(**绝不污染仓库 data/**,也绝不连 .env 里的 PostgreSQL):
- `storage.settings` / `me_routes.settings` 换成只含四个字段的替身,附件目录指向 tmp;
- 业务库用进程内 SQLite:`app.dependency_overrides[get_db]`(路由)、`db.session_scope`
  (chat 的 att 校验)、`history.session_scope`(落库)三处全部指过去;
- 身份用 `dependency_overrides[require_user]` + 假 `optional_user_sse`("令牌串 == sub",
  真校验归 test_logto_auth.py);限流/令牌关掉,免得与本主题无关的 401/429 干扰。

安全断言的重点(每条都对应一种真实攻击):
- 取回/删除非本人一律 **404 而不是 403** —— 403 会泄露"这个 id 确实存在";
- 匿名既不能传、不能取、不能删,也不能引用附件(依赖是 require_user;chat 的 att 匿名恒空);
- 路径参数任意畸形串只能 404,不能 500,也不能触发 SQLAlchemy 的"全 NULL 主键"警告;
- 文件名只进 Content-Disposition,不参与任何路径拼接,不能截断/注入响应头,
  且**必须能 latin-1 编码**(中文名曾让取回端点每次 500);
- `deduped` 只反映本人是否已有,不做跨用户存在性泄露;**它是安全相关字段** ——
  前端(static/index.html 的缩略图 ✕)只对 `deduped === false` 的项发 DELETE,
  靠它避免删掉"去重命中的旧 id"(那个 id 很可能已被历史消息引用);
- 删除按 sha256 跨全表引用计数(实现在 `storage.delete_blob_if_unreferenced`),
  不能打掉别人共享同一 blob 的图,且必须在自己那行 commit **之后**才回收。
"""
from __future__ import annotations

import io
import json
import uuid
import warnings

import pytest

pytest.importorskip("fastapi", reason="需要 blog_rag[api] 依赖")
pytest.importorskip("multipart", reason="需要 python-multipart(UploadFile 运行时依赖)")
pytest.importorskip("jwt", reason="需要 blog_rag[admin] 依赖(logto_auth)")

from fastapi import HTTPException, Request
from fastapi.testclient import TestClient
from sqlalchemy import create_engine, func, select
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from blog_rag import api as api_mod
from blog_rag import db as db_mod
from blog_rag import graph as graph_mod
from blog_rag import history, logto_auth, me_routes, security, storage
from blog_rag.config import settings as real_settings
from blog_rag.models import Attachment, Base, Conversation, Message

PNG = b"\x89PNG\r\n\x1a\n" + b"\x00" * 40
JPEG = b"\xff\xd8\xff\xe0\x00\x10JFIF\x00" + b"\x00" * 30
WEBP = b"RIFF" + (100).to_bytes(4, "little") + b"WEBPVP8 " + b"\x03" * 40
PDF = b"%PDF-1.7\n%\xc7\xec\x8f\xa2\n" + b"\x00" * 30
PHP = b"<?php system($_GET['c']); ?>" + b"\n" * 20
ELF = b"\x7fELF\x02\x01\x01\x00" + b"\x00" * 30
SVG = b'<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>'

A = "user_aaa111"
B = "user_bbb222"

_FINAL = {
    "generation": "答", "mode": "general", "sources": [],
    "retrieved_doc_ids": [], "contexts": [], "suggestions": [],
}


class _Limits:
    """storage/me_routes 用到的配置替身(字段漏了就 AttributeError,不会静默回落真配置)。"""

    def __init__(self, attachments_dir, max_bytes: int, quota: int, total: int) -> None:
        self.attachments_dir = attachments_dir
        self.upload_max_bytes = max_bytes
        self.upload_quota_bytes = quota
        self.upload_total_bytes = total


class _FakeCompiled:
    """假编译图:不跑 LLM,只吐一个 token + 一个终态(chat 用例只关心 att 落库)。"""

    def stream(self, init, cfg, stream_mode=None):
        yield ("custom", {"type": "token", "text": "答"})
        yield ("values", dict(_FINAL))

    def invoke(self, init, cfg):
        return dict(_FINAL)


def _fake_sse_identity(request):
    """/api/chat:`?access_token=<sub>` 直接当身份(真 JWT 校验归 test_logto_auth.py)。"""
    tok = request.query_params.get("access_token") or ""
    if not tok:
        auth = request.headers.get("authorization", "")
        if auth.lower().startswith("bearer "):
            tok = auth[7:]
    return logto_auth.Identity(sub=tok, scopes=[], roles=[], claims={"sub": tok}) if tok else None


def _fake_require_user(request: Request) -> logto_auth.Identity:
    """/api/me/*:`Authorization: Bearer <sub>`;无 token → 401(与真实 require_user 同形)。"""
    auth = request.headers.get("authorization", "")
    tok = auth[7:].strip() if auth[:7].lower() == "bearer " else ""
    if not tok:
        raise HTTPException(status_code=401, detail="未登录")
    return logto_auth.Identity(sub=tok, scopes=[], roles=[], claims={"sub": tok})


class Env:
    """测试夹具句柄:HTTP 客户端 + 直连测试库的 session 工厂 + 常用动作。"""

    def __init__(self, client: TestClient, Session, limits: _Limits) -> None:
        self.client = client
        self.Session = Session
        self.limits = limits

    # --- HTTP 动作 ---
    def upload(self, data: bytes = PNG, *, name: str = "a.png",
               content_type: str = "image/png", sub: str | None = A):
        headers = {"Authorization": f"Bearer {sub}"} if sub else {}
        return self.client.post("/api/me/attachments",
                                files={"file": (name, io.BytesIO(data), content_type)},
                                headers=headers)

    def upload_id(self, data: bytes = PNG, **kw) -> str:
        r = self.upload(data, **kw)
        assert r.status_code == 201, f"{r.status_code}: {r.text[:200]}"
        return r.json()["id"]

    def fetch(self, att_id: str, *, sub: str | None = A):
        headers = {"Authorization": f"Bearer {sub}"} if sub else {}
        return self.client.get(f"/api/me/attachments/{att_id}", headers=headers)

    def delete(self, att_id: str, *, sub: str | None = A):
        headers = {"Authorization": f"Bearer {sub}"} if sub else {}
        return self.client.delete(f"/api/me/attachments/{att_id}", headers=headers)

    def quota(self, *, sub: str | None = A):
        headers = {"Authorization": f"Bearer {sub}"} if sub else {}
        return self.client.get("/api/me/attachments/quota", headers=headers)

    def chat(self, q: str = "这图什么问题", *, sub: str | None = A, att: str | None = None,
             thread: str = "t1"):
        params: dict = {"q": q, "thread": thread}
        if att is not None:
            params["att"] = att
        if sub:
            params["access_token"] = sub
        return self.client.get("/api/chat", params=params)

    # --- 直连测试库 ---
    def rows(self, model):
        with self.Session() as s:
            return list(s.scalars(select(model)).all())

    def messages(self) -> list[Message]:
        with self.Session() as s:
            return list(s.scalars(select(Message).order_by(Message.created_at)).all())

    def user_parts(self) -> list:
        """最近一条 user 消息的 parts_json(没有消息则 KeyError 式失败,便于定位)。"""
        msgs = [m for m in self.messages() if m.role == "user"]
        assert msgs, "库里没有 user 消息(record_turn 没落库?)"
        return msgs[-1].parts_json

    def make_blob(self, data: bytes) -> str:
        """把 blob 直接写进内容寻址路径,返回 sha(配合直插 Attachment 记录用)。"""
        import hashlib
        sha = hashlib.sha256(data).hexdigest()
        p = self.limits.attachments_dir / sha[:2] / sha
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_bytes(data)
        return sha

    def insert_attachment(self, *, owner: str = A, filename: str | None = "x.png",
                          data: bytes = PNG) -> str:
        """绕过 multipart 直插一条记录 —— HTTP 客户端会自行转义文件名,
        要测"服务端拿到原始恶意文件名"只能从这一侧构造。"""
        sha = self.make_blob(data)
        with self.Session() as s:
            att = Attachment(owner_sub=owner, kind="image", mime="image/png",
                             bytes=len(data), sha256=sha, filename=filename)
            s.add(att)
            s.commit()
            return str(att.id)


@pytest.fixture()
def env(tmp_path, monkeypatch):
    limits = _Limits(tmp_path / "attachments", real_settings.upload_max_bytes,
                     real_settings.upload_quota_bytes, real_settings.upload_total_bytes)
    monkeypatch.setattr(storage, "settings", limits)
    monkeypatch.setattr(me_routes, "settings", limits)

    engine = create_engine("sqlite://", connect_args={"check_same_thread": False},
                           poolclass=StaticPool, future=True)
    Base.metadata.create_all(engine)
    Session = sessionmaker(bind=engine, autoflush=False, expire_on_commit=False, future=True)

    def _get_db():
        s = Session()
        try:
            yield s
        finally:
            s.close()

    # 三处入口全部改指测试库:路由依赖 / chat 的 att 校验 / history 落库。
    monkeypatch.setitem(api_mod.app.dependency_overrides, db_mod.get_db, _get_db)
    monkeypatch.setitem(api_mod.app.dependency_overrides, logto_auth.require_user,
                        _fake_require_user)
    monkeypatch.setattr(db_mod, "session_scope", Session)
    monkeypatch.setattr(history, "session_scope", Session)
    # 身份 / 限流 / LLM
    monkeypatch.setattr(logto_auth, "optional_user_sse", _fake_sse_identity)
    monkeypatch.setattr(security.settings, "api_token", "")
    monkeypatch.setattr(security.settings, "rate_limit_enabled", False)
    monkeypatch.setattr(graph_mod, "get_graph", lambda: _FakeCompiled())

    with TestClient(api_mod.app, raise_server_exceptions=False) as client:
        yield Env(client, Session, limits)


def _events(body: str) -> list[dict]:
    return [json.loads(line[len("data: "):]) for line in body.split("\n\n")
            if line.startswith("data: ")]


# ==================== 1. 上传 → 取回 ====================


def test_upload_returns_201_with_metadata(env):
    r = env.upload(PNG, name="cat.png")
    assert r.status_code == 201
    body = r.json()
    assert uuid.UUID(body["id"])                 # 是合法 uuid
    assert body["mime"] == "image/png"
    assert body["bytes"] == len(PNG)
    assert body["filename"] == "cat.png"
    assert body["deduped"] is False
    # 库里确实有一条归属 A 的记录,且 kind=image。
    (att,) = env.rows(Attachment)
    assert att.owner_sub == A and att.kind == "image" and att.bytes == len(PNG)


def test_owner_can_fetch_own_attachment(env):
    att_id = env.upload_id(PNG)
    r = env.fetch(att_id, sub=A)
    assert r.status_code == 200
    assert r.content == PNG
    assert r.headers["content-type"] == "image/png"


def test_fetch_by_other_user_is_404_not_403(env):
    """非本人一律 404 —— 403 等于告诉对方"这个 id 存在"(枚举 + 存在性泄露)。"""
    att_id = env.upload_id(PNG, sub=A)
    r = env.fetch(att_id, sub=B)
    assert r.status_code == 404
    assert r.status_code != 403
    assert r.json()["detail"] == "附件不存在"
    # 对照:A 自己取得到(证明 404 不是因为记录根本没建)。
    assert env.fetch(att_id, sub=A).status_code == 200


def test_fetch_unknown_uuid_is_404(env):
    assert env.fetch(str(uuid.uuid4()), sub=A).status_code == 404


@pytest.mark.parametrize("att_id", [
    "not-a-uuid",
    "../../etc/passwd",
    "..%2f..%2fetc%2fpasswd",
    "%00",
    "0",
    "null",
    "None",
    "1 OR 1=1",
    "'; DROP TABLE attachments;--",
    "0" * 500,
    "中文",
    "12345678-1234-1234-1234-1234567890",          # 少一位的 uuid
    "12345678123412341234123456789012",            # 无横线但长度对(uuid.UUID 其实接受)
])
@pytest.mark.filterwarnings("error::sqlalchemy.exc.SAWarning")
def test_malformed_path_param_is_404_never_500(env, att_id):
    """畸形路径参数只能 404。

    两个额外约束:
    - **绝不 500**:把 None 交给 `db.get()` 会 500 或至少抛警告;
    - **绝不触发 SAWarning**("全 NULL 主键"),故本用例把 SAWarning 升级成 error ——
      SQLAlchemy 官方说明未来版本可能直接报错,别指望它一直宽容。
    """
    r = env.fetch(att_id, sub=A)
    assert r.status_code == 404, f"{att_id!r} → {r.status_code}: {r.text[:200]}"


def test_as_uuid_returns_none_for_garbage():
    """`_as_uuid` 的纯函数契约:任何非法**字符串** → None,不抛异常。

    (路径参数在 FastAPI 里恒为 str,所以这些就是真实的输入空间;
    非 str 的情况见下一条。)
    """
    for bad in ["not-a-uuid", "", "0", "../../etc/passwd", "%00", "中文",
                "12345678-1234-1234-1234-12345678901", "x" * 200]:
        assert me_routes._as_uuid(bad) is None, f"{bad!r} 没被判成 None"
    good = uuid.uuid4()
    assert me_routes._as_uuid(str(good)) == good
    # 大写/带花括号/urn 前缀是 uuid 的合法写法,应当照常解析(否则前端大小写不同就 404)。
    assert me_routes._as_uuid(str(good).upper()) == good
    assert me_routes._as_uuid(f"urn:uuid:{good}") == good


@pytest.mark.parametrize("bad", [123, [], object()])
def test_as_uuid_tolerates_non_string_inputs(bad):
    """非 str 输入也不该抛(`history.get_conversation` 就是这么写的,两处应当一致)。"""
    assert me_routes._as_uuid(bad) is None


@pytest.mark.xfail(strict=True, reason="小瑕疵:_as_uuid 漏接 TypeError(None → "
                                       "uuid.UUID(None) 抛 TypeError),"
                                       "history.get_conversation 同款函数是接了的;"
                                       "当前 HTTP 路径参数恒为 str,故不可达")
def test_as_uuid_handles_none():
    """`_as_uuid(None)` 目前抛 TypeError(故 xfail(strict))。

    走 HTTP 到不了这里(path 参数恒为 str),所以**不是线上 bug**;钉住只是因为
    同一份"非法一律当不存在"的逻辑在 history.py 里写的是
    `except (ValueError, AttributeError, TypeError)` —— 两处不一致,哪天有人从别处
    (后台脚本、批量清理)传 None 进来就会 500。修法是把 TypeError 也加进 except。
    """
    assert me_routes._as_uuid(None) is None


def test_fetch_returns_410_when_blob_is_gone(env):
    """库里有记录、盘上文件没了 → 410(不是 404):一眼看出是"存过但丢了"。"""
    att_id = env.upload_id(PNG)
    (att,) = env.rows(Attachment)
    storage.blob_path_of(att).unlink()
    r = env.fetch(att_id, sub=A)
    assert r.status_code == 410
    # 且他人取这个"丢了文件"的 id 仍然是 404(别用 410 泄露存在性)。
    assert env.fetch(att_id, sub=B).status_code == 404


def test_fetch_sets_no_store_and_nosniff_headers(env):
    """私有内容的响应头:不留任何缓存 + 禁 MIME 嗅探 + inline 展示。

    `no-store` 而不是 `private, max-age=…`:后者没有 Vary,同一浏览器换账号后若知道
    对方 id,有可能命中**本地**缓存拿到上一账号的图(共享缓存被 private 挡住了,
    私有缓存没有)。
    """
    att_id = env.upload_id(PNG, name="cat.png")
    r = env.fetch(att_id, sub=A)
    assert r.headers["x-content-type-options"] == "nosniff"
    cc = r.headers["cache-control"]
    assert cc == "no-store"
    assert "max-age" not in cc and "public" not in cc
    assert r.headers["content-disposition"].startswith("inline; filename=")


def test_polyglot_gif_php_is_served_defensively(env):
    """GIF89a 头 + PHP 载荷:嗅探会放行(魔数方案的固有上界),但后续三层要兜住。

    ①落盘名是 sha256、无扩展名 → 不可能被当脚本执行;②只经鉴权端点取回;
    ③响应带 nosniff 且 Content-Type 是 image/gif。
    """
    att_id = env.upload_id(b"GIF89a" + PHP, name="evil.php")
    (att,) = env.rows(Attachment)
    blob = storage.blob_path_of(att)
    assert blob.name == att.sha256 and blob.suffix == ""
    r = env.fetch(att_id, sub=A)
    assert r.headers["content-type"] == "image/gif"
    assert r.headers["x-content-type-options"] == "nosniff"


# ==================== 2. 去重 / 跨用户 ====================


def test_same_content_twice_returns_same_id_and_counts_once(env):
    first = env.upload(PNG, name="one.png")
    second = env.upload(PNG, name="two.png")
    assert first.status_code == second.status_code == 201
    assert second.json()["id"] == first.json()["id"], "同用户同内容必须复用同一条记录"
    assert second.json()["deduped"] is True
    assert first.json()["deduped"] is False
    assert len(env.rows(Attachment)) == 1
    assert env.quota().json()["used_bytes"] == len(PNG), "重复上传不该重复计配额"
    # 复用旧记录 → 文件名保持首次那个(展示名不会被第二次上传改写)。
    assert second.json()["filename"] == "one.png"


def test_cross_user_same_content_gets_separate_records(env):
    """有意**不跨用户去重**:两条独立记录、各自计配额、互相取不到。"""
    a_id = env.upload_id(PNG, sub=A)
    b_id = env.upload_id(PNG, sub=B)
    assert a_id != b_id
    assert len(env.rows(Attachment)) == 2
    assert env.quota(sub=A).json()["used_bytes"] == len(PNG)
    assert env.quota(sub=B).json()["used_bytes"] == len(PNG)
    assert env.fetch(a_id, sub=B).status_code == 404
    assert env.fetch(b_id, sub=A).status_code == 404


def test_deduped_is_per_user_not_global(env):
    """`deduped` 只能由**本人是否已有记录**决定,不能由 blob 是否在盘上决定。

    两条互相独立的理由,任何一条都足以要求这个语义:

    ① **跨用户存在性 oracle**:blob 路径是全局的(`attachments/<sha[:2]>/<sha>`),
       A 传过之后 B 传同一张图也会命中同一个文件。若把"文件已存在"当成 deduped 返回,
       全新账号传一张自己从没传过的图却收到 `deduped: true` ⇒ 站上有别人持有完全相同
       的文件(可用来验证某人是否保存了某张特定图片)。正是 storage.py / models.py
       注释里声称要避免的"上传某文件看是否秒传"探测。
    ② **前端拿它做删除保护**(见下一条用例):缩略图 ✕ 只对 `deduped === false` 的项
       调 `DELETE /api/me/attachments/{id}`。所以这个字段**是安全相关的**,不是信息性的:
       一旦回退成按磁盘判定,B 传一张 A 也有的图会拿到 `deduped: true`……更糟的方向是
       反过来——真去重时误报 false,前端就会去删一个可能已被历史引用的旧 id。
    """
    a_id = env.upload_id(PNG, sub=A)
    r = env.upload(PNG, name="same.png", sub=B)
    assert r.status_code == 201
    assert r.json()["deduped"] is False, "泄露了 A 持有这张图"
    assert r.json()["id"] != a_id, "必须是 B 自己的新记录"
    # 对照:B 再传一次同一张才算真去重。
    assert env.upload(PNG, name="same.png", sub=B).json()["deduped"] is True


def test_deduped_true_always_means_a_preexisting_row_of_this_user(env):
    """`deduped: true` ⇔ 返回的 id 是**本人此前那条记录**,没有新建行。

    前端的删除保护就建立在这个等价关系上,��以它必须严格成立(不是"大致如此")。
    """
    first = env.upload(PNG, name="one.png", sub=A).json()
    (row,) = env.rows(Attachment)
    second = env.upload(PNG, name="two.png", sub=A).json()

    assert second["deduped"] is True
    assert second["id"] == first["id"] == str(row.id)
    assert len(env.rows(Attachment)) == 1, "去重命中却新建了行"
    # 反向:deduped=false 必须对应一条**新**行。
    third = env.upload(PNG + b"other", name="three.png", sub=A).json()
    assert third["deduped"] is False
    assert third["id"] not in {first["id"]}
    assert len(env.rows(Attachment)) == 2


def test_deduped_flag_is_the_frontends_delete_protection_contract(env):
    """**前端依赖**:缩略图 ✕ 只对 `deduped === false` 的项发 DELETE。

    场景(这是真会发生的操作序列):
      1. 用户传图 X,带它提问 → 历史里那条消息的 parts 引用了 X 的 id;
      2. 过一会儿又把**同一张** X 拖进输入框 → 后端去重,返回的是**步骤 1 那个 id**;
      3. 用户点缩略图的 ✕ 只是想把它从"这次要发的附件"里去掉。
    若此时前端 DELETE 了那个 id,步骤 1 的历史消息里的图当场变 404 —— 用户从没打算
    删历史。所以后端必须让第 2 步的响应带 `deduped: true`,前端据此只做本地移除。

    本用例把危害本身也断言出来(证明这不是纸上的顾虑):对 deduped 命中的 id 调
    DELETE,历史那条消息的图确实取不回来了。
    """
    att_id = env.upload_id(PNG, name="x.png", sub=A)
    env.chat("看这张图", sub=A, att=att_id, thread="t-hist")
    with env.Session() as s:
        conv_id = history.list_conversations(s, A)[0]["id"]
        parts = history.get_conversation(s, A, conv_id)["messages"][0]["parts"]
    assert parts[1]["image_url"]["url"] == f"attachment:{att_id}", "前置条件:历史已引用它"

    again = env.upload(PNG, name="x-again.png", sub=A).json()
    assert again["id"] == att_id, "去重返回的就是历史里那个 id"
    assert again["deduped"] is True, "错报 false → 前端会删掉被历史引用的图"

    # 危害验证:真去删了会怎样(所以前端必须靠 deduped 挡住这一步)。
    assert env.delete(att_id, sub=A).status_code == 204
    assert env.fetch(att_id, sub=A).status_code == 404
    with env.Session() as s:
        still = history.get_conversation(s, A, conv_id)["messages"][0]["parts"]
    assert still[1]["image_url"]["url"] == f"attachment:{att_id}", "历史仍指着它,但图已没了"


def test_first_upload_of_a_content_is_safe_to_delete(env):
    """对照:`deduped: false` 的项没有被任何历史引用过,前端删它是安全的。"""
    att_id = env.upload_id(PNG, name="fresh.png", sub=A)
    assert env.rows(Message) == [], "全新上传时不该已经存在引用它的消息"
    assert env.delete(att_id, sub=A).status_code == 204
    assert env.quota(sub=A).json()["used_bytes"] == 0


def test_deduped_false_for_shared_content_lets_the_frontend_clean_up(env):
    """删除保护契约的**另一个方向**:错报 `true` 会造成配额泄漏。

    B 传一张 A 也有的图(blob 命中、但 B 名下是新记录)。若 deduped 按磁盘判定成 true,
    前端点 ✕ 就**不会**发 DELETE,只做本地移除 —— B 名下于是留下一条界面上看不见、
    却一直算在 100MB 配额里的记录,用户完全没有办法清掉它(界面里没有入口)。
    这条与 `test_deduped_is_per_user_not_global` 同源但危害不同:那条是信息泄露,
    这条是可用性/配额。两条一起构成"deduped 必须只由本人记录决定"的完整理由。
    """
    a_id = env.upload_id(PNG, sub=A)
    b = env.upload(PNG, name="b.png", sub=B).json()
    assert b["deduped"] is False, "前端会因此跳过 DELETE → B 的配额永远降不下来"
    assert env.quota(sub=B).json()["used_bytes"] == len(PNG)

    assert env.delete(b["id"], sub=B).status_code == 204
    assert env.quota(sub=B).json()["used_bytes"] == 0
    # A 的图与配额毫发无损(共享 blob 靠引用计数保住)。
    assert env.fetch(a_id, sub=A).status_code == 200
    assert env.quota(sub=A).json()["used_bytes"] == len(PNG)


def test_site_full_returns_507_at_the_route(env):
    """全站水位打满 → 507(不是 413):用户删自己的图也没用,得管理员处理。"""
    env.limits.upload_total_bytes = len(PNG)
    env.upload_id(PNG, sub=A)
    r = env.upload(PNG + b"new-content", name="x.png", sub=B)
    assert r.status_code == 507
    assert r.status_code != 413
    assert "站点" in r.json()["detail"]
    assert len(env.rows(Attachment)) == 1


def test_real_default_total_watermark_is_5gb():
    assert real_settings.upload_total_bytes == 5 * 1024 * 1024 * 1024


@pytest.mark.parametrize(("data", "mime"), [(PNG, "image/png"), (JPEG, "image/jpeg"),
                                            (WEBP, "image/webp")])
def test_each_image_type_round_trips(env, data, mime):
    att_id = env.upload_id(data, name="x.bin", content_type="application/octet-stream")
    r = env.fetch(att_id, sub=A)
    assert r.status_code == 200 and r.content == data
    assert r.headers["content-type"] == mime, "mime 取自嗅探结果,不是客户端声明的那个"


# ==================== 3. 类型 / 大小 / 配额的拒绝 ====================


@pytest.mark.parametrize(("name", "data"), [("pdf", PDF), ("php", PHP), ("elf", ELF),
                                            ("svg", SVG)])
def test_non_image_renamed_to_png_is_415(env, name, data):
    """改扩展名 + 伪造 Content-Type 都没用 —— 只认内容魔数。

    SVG 单列强调:它无魔数、能带 <script>,放行就是同源存储型 XSS。
    """
    r = env.upload(data, name=f"{name}.png", content_type="image/png")
    assert r.status_code == 415, f"{name} 被放行了:{r.text[:200]}"
    assert env.rows(Attachment) == [], "被拒的上传不该留库记录"


def test_empty_file_is_400(env):
    r = env.upload(b"", name="empty.png")
    assert r.status_code == 400
    assert env.rows(Attachment) == []


def test_file_over_5mb_is_413(env):
    """真实 5MB 上限:5MB+1 → 413,且什么都不落库。"""
    assert env.limits.upload_max_bytes == 5 * 1024 * 1024
    payload = PNG + b"\x00" * (5 * 1024 * 1024 + 1 - len(PNG))
    r = env.upload(payload, name="big.png")
    assert r.status_code == 413
    assert "5MB" in r.json()["detail"]
    assert env.rows(Attachment) == []


def test_quota_exhausted_is_413(env):
    env.limits.upload_quota_bytes = len(PNG) + 10
    env.upload_id(PNG)
    r = env.upload(PNG + b"different-content", name="second.png")
    assert r.status_code == 413
    assert "配额" in r.json()["detail"]
    assert len(env.rows(Attachment)) == 1


def test_quota_endpoint_reports_settings_and_usage(env):
    r = env.quota()
    assert r.status_code == 200
    assert r.json() == {"used_bytes": 0,
                        "quota_bytes": env.limits.upload_quota_bytes,
                        "max_file_bytes": env.limits.upload_max_bytes}
    env.upload_id(PNG)
    env.upload_id(PNG + b"more")
    assert env.quota().json()["used_bytes"] == len(PNG) + len(PNG) + 4
    assert env.quota(sub=B).json()["used_bytes"] == 0, "配额按用户算,不是全站"


# ==================== 4. 匿名一律挡住 ====================


def test_anonymous_cannot_upload(env):
    """匿名上传 = 开一个无主图床:存了既算不了配额也回收不掉。"""
    r = env.upload(PNG, sub=None)
    assert r.status_code == 401
    assert env.rows(Attachment) == []


def test_anonymous_cannot_fetch_or_read_quota(env):
    att_id = env.upload_id(PNG, sub=A)
    assert env.fetch(att_id, sub=None).status_code == 401
    assert env.quota(sub=None).status_code == 401


def test_anonymous_cannot_delete(env):
    att_id = env.upload_id(PNG, sub=A)
    assert env.delete(att_id, sub=None).status_code == 401
    assert len(env.rows(Attachment)) == 1


# ==================== 4b. DELETE:配额要能降下来,blob 要按引用计数回收 ====================


def test_delete_own_attachment_frees_quota_and_blob(env):
    """没有删除端点的话配额只增不减 —— 而超限提示恰恰是"请先删除一些旧附件"。"""
    att_id = env.upload_id(PNG, sub=A)
    (att,) = env.rows(Attachment)
    blob = storage.blob_path_of(att)
    assert env.quota().json()["used_bytes"] == len(PNG)

    r = env.delete(att_id, sub=A)
    assert r.status_code == 204
    assert r.content == b""
    assert env.rows(Attachment) == []
    assert env.quota().json()["used_bytes"] == 0, "配额没有释放,删了等于没删"
    assert not blob.exists(), "没人再引用的 blob 应该被回收"
    assert env.fetch(att_id, sub=A).status_code == 404


def test_delete_keeps_blob_while_another_user_still_references_it(env):
    """**引用计数的核心**:blob 全局共享,A 删自己的记录不能打掉 B 的图。

    (直接 unlink 就是静默数据丢失:B 那边的记录还在,取回却变 410,查起来毫无头绪。)
    """
    a_id = env.upload_id(PNG, sub=A)
    b_id = env.upload_id(PNG, sub=B)
    assert env.delete(a_id, sub=A).status_code == 204

    r = env.fetch(b_id, sub=B)
    assert r.status_code == 200, "A 的删除把 B 的图一起打掉了"
    assert r.content == PNG
    assert env.quota(sub=B).json()["used_bytes"] == len(PNG)
    # B 再删,此时确实没人引用了 → blob 回收。
    (att,) = env.rows(Attachment)
    blob = storage.blob_path_of(att)
    assert env.delete(b_id, sub=B).status_code == 204
    assert not blob.exists()


def test_delete_someone_elses_attachment_is_404_and_changes_nothing(env):
    """非本人 404(不是 403),且**什么都不能动** —— 否则就是任意删除他人数据。"""
    victim = env.upload_id(PNG, sub=B)
    r = env.delete(victim, sub=A)
    assert r.status_code == 404
    assert r.status_code != 403
    assert len(env.rows(Attachment)) == 1
    assert env.fetch(victim, sub=B).status_code == 200
    assert env.quota(sub=B).json()["used_bytes"] == len(PNG)


@pytest.mark.parametrize("att_id", ["not-a-uuid", "../../etc/passwd", "0", "%00",
                                    "00000000-0000-0000-0000-000000000000"])
@pytest.mark.filterwarnings("error::sqlalchemy.exc.SAWarning")
def test_delete_with_bad_or_unknown_id_is_404(env, att_id):
    env.upload_id(PNG, sub=A)
    assert env.delete(att_id, sub=A).status_code == 404
    assert len(env.rows(Attachment)) == 1, "畸形 id 误删了别的记录"


def test_delete_is_idempotent_from_the_clients_view(env):
    """重复删除 → 第二次 404(前端重试/双击不该 500)。"""
    att_id = env.upload_id(PNG, sub=A)
    assert env.delete(att_id, sub=A).status_code == 204
    assert env.delete(att_id, sub=A).status_code == 404


def test_delete_route_delegates_to_storage_after_committing_the_row(env, monkeypatch):
    """路由把回收 blob 交给 `storage.delete_blob_if_unreferenced`,且**在提交之后**调。

    两件事都要钉:
    - 委派本身(blob 布局归 storage;路由不该自己拼 sha 的 SQL 再猜文件在哪);
    - **调用时机** —— 必须在自己那行 delete+commit 之后。反了会把自己算进引用,
      于是永远不回收磁盘,而且完全静默:配额降了,盘只涨。
    观察点用**另一个 session** 数行数,这样只有真提交了才数得到 0。
    """
    calls: list[tuple[str, int]] = []
    real = storage.delete_blob_if_unreferenced

    def spy(db, sha256):
        with env.Session() as fresh:      # 独立连接:未提交的删除在这里看不见
            remaining = fresh.scalar(
                select(func.count()).select_from(Attachment).where(Attachment.sha256 == sha256))
        calls.append((sha256, remaining))
        return real(db, sha256)

    monkeypatch.setattr(storage, "delete_blob_if_unreferenced", spy)

    att_id = env.upload_id(PNG, sub=A)
    (att,) = env.rows(Attachment)
    sha, blob = att.sha256, storage.blob_path_of(att)
    assert env.delete(att_id, sub=A).status_code == 204

    assert calls == [(sha, 0)], f"要么没委派,要么调用时机不对:{calls}"
    assert not blob.exists()


def test_delete_route_does_not_call_storage_when_it_refuses(env, monkeypatch):
    """404 路径(非本人 / 畸形 id)绝不能走到回收 blob —— 那会删掉别人的文件。"""
    calls: list[str] = []
    monkeypatch.setattr(storage, "delete_blob_if_unreferenced",
                        lambda db, sha: calls.append(sha) or False)
    victim = env.upload_id(PNG, sub=B)
    assert env.delete(victim, sub=A).status_code == 404
    assert env.delete("not-a-uuid", sub=A).status_code == 404
    assert env.delete(str(uuid.uuid4()), sub=A).status_code == 404
    assert calls == []
    assert env.fetch(victim, sub=B).status_code == 200


def test_delete_then_reupload_works(env):
    """删了再传同一张图:重新计配额、能取回(blob 已被回收,要重新写盘)。"""
    att_id = env.upload_id(PNG, sub=A)
    env.delete(att_id, sub=A)
    new_id = env.upload_id(PNG, sub=A)
    assert new_id != att_id
    assert env.fetch(new_id, sub=A).content == PNG
    assert env.quota().json()["used_bytes"] == len(PNG)


def test_delete_leaves_history_reference_dangling_but_readable(env):
    """删附件不回溯改历史:老消息里的 `attachment:<id>` 还在,取回变 404。

    这是**有意**的取舍(消息是不可变记录),但前端必须能处理"图取不回来":
    这条用例把契约钉住 —— 历史照常可读、不会因为附件没了而 500。
    """
    att_id = env.upload_id(PNG, sub=A)
    env.chat("看图", sub=A, att=att_id)
    env.delete(att_id, sub=A)

    with env.Session() as s:
        conv_id = history.list_conversations(s, A)[0]["id"]
        detail = history.get_conversation(s, A, conv_id)
    assert detail["messages"][0]["parts"][1]["image_url"]["url"] == f"attachment:{att_id}"
    assert env.fetch(att_id, sub=A).status_code == 404


@pytest.mark.xfail(strict=True, reason="发现的问题:删除的引用计数与'按磁盘去重'之间有 TOCTOU"
                                       " —— 另一用户上传同内容(已判 blob 存在、记录未提交)"
                                       "期间被删,会得到一条指向已回收 blob 的记录(410)")
def test_delete_does_not_break_an_inflight_upload_of_the_same_content(env):
    """删除 vs 同内容上传的竞态(**当前会丢数据,故 xfail(strict)**)。

    交错(两个请求并发时天然可达,这里按顺序复现):
      1. A 已持有内容 X(blob 在盘上);
      2. B 上传 X:`store_stream` 看到 blob 已存在 → 丢弃临时文件、复用旧 blob,
         **但 B 的记录还没提交**;
      3. A 删除自己的 X:引用计数只数到 0(B 的记录还没落库)→ unlink blob;
      4. B 的记录提交完成 → 指向一个已经不存在的文件 → 此后取回恒 410。
    危害:B 的图静默消失,库里却有记录,排查时看起来像"文件莫名丢失"。

    修的方向:引用计数与删除放同一事务并对 sha 加锁 / 不立刻 unlink 改由延迟 GC
    (标记 + 宽限期)回收 / 复用 blob 时先建记录再确认文件存在。
    """
    env.upload_id(PNG, sub=A)                      # 1
    with env.Session() as s:                       # 2:B 的上传"进行到一半"
        stored = storage.store_stream(io.BytesIO(PNG), owner_sub=B, db=s)
        assert stored.deduped is True

        (a_att,) = env.rows(Attachment)
        assert env.delete(str(a_att.id), sub=A).status_code == 204     # 3

        b_att = Attachment(owner_sub=B, kind="image", mime=stored.mime, bytes=stored.size,
                           sha256=stored.sha256, filename="b.png")
        s.add(b_att)
        s.commit()                                                     # 4
        b_id = str(b_att.id)
    assert env.fetch(b_id, sub=B).status_code == 200, "B 的图指向了已被回收的 blob"


# ==================== 5. 文件名:只进响应头,不进路径 ====================
# 攻击面有两层:①头部注入(引号/反斜杠/CRLF/控制字符);②**编码**——响应头只能是
# latin-1,中文名在中文站是默认情况而非边角,原实现每次取回都 500(图永久不可见)。


@pytest.mark.parametrize(("raw", "expect"), [
    ('ev"il.png', "evil.png"),                       # 双引号会闭合 filename="
    ("back\\slash.png", "backslash.png"),            # 反斜杠是头部里的转义符
    ("x\r\nX-Injected: 1", "xX-Injected: 1"),        # CRLF = 响应头注入
    ("x\nX-Injected: 1", "xX-Injected: 1"),
    ("nul\x00.png", "nul.png"),
    ("tab\there.png", "tabhere.png"),
    ("", "attachment"),                              # 空 → 兜底名
    (None, "attachment"),
    ('"\\\r\n', "attachment"),                       # 全是危险字符 → 过滤后为空 → 兜底
])
def test_safe_name_strips_header_injection_vectors(raw, expect):
    """`_safe_name` 现在只供测试/日志用,但清洗规则仍是 `_disposition` 的同一份逻辑。"""
    assert me_routes._safe_name(raw) == expect


@pytest.mark.parametrize("raw", [
    'a"b\\c\r\nd', "x" * 400, "\x00\x01\x02", "中文名.png", "emoji🙂.png",
    "../../etc/passwd", "%00.png", "a" * 100 + '"', "café.png", " line-sep",
    "", None, "屏幕截图 2026-07-30 下午3.14.png",
])
def test_disposition_header_is_always_latin1_encodable(raw):
    """**最关键的性质**:`_disposition` 产出的头值必须一定能 latin-1 编码。

    starlette 的 `init_headers` 做 `v.encode("latin-1")`,编不了就 UnicodeEncodeError
    → 500。而文件名来自用户,任何"大部分情况能编"的实现都等于给自己埋雷。
    """
    (value,) = me_routes._disposition(raw).values()
    value.encode("latin-1")                          # 编不了直接抛,就是失败
    assert "\r" not in value and "\n" not in value
    assert value.startswith('inline; filename="')
    assert value.count('"') == 2, "引号必须恰好是包住 ASCII 名的那一对"


@pytest.mark.parametrize(("raw", "ascii_part"), [
    ("cat.png", "cat.png"),
    ("中文名.png", "___.png"),                        # 非 ASCII 逐字符换 _
    ("café.png", "caf_.png"),
    ("emoji🙂.png", "emoji_.png"),
    (None, "attachment"),
    ("", "attachment"),
])
def test_disposition_ascii_fallback_and_rfc5987(raw, ascii_part):
    """双写:`filename=` 给老客户端的 ASCII 兜底,`filename*=UTF-8''…` 带真名。"""
    (value,) = me_routes._disposition(raw).values()
    assert value.startswith(f'inline; filename="{ascii_part}"')
    if ascii_part == (raw or "attachment"):
        assert "filename*=" not in value, "纯 ASCII 名不必多写一份(避免无谓的头膨胀)"
    else:
        assert "filename*=UTF-8''" in value


def test_disposition_percent_encodes_the_real_name(env):
    """`filename*` 里是 UTF-8 百分号编码的真名,浏览器据此还原中文名。"""
    (value,) = me_routes._disposition("截图.png").values()
    star = value.split("filename*=UTF-8''")[1]
    from urllib.parse import unquote
    assert unquote(star) == "截图.png"
    assert " " not in star and '"' not in star


def test_safe_name_never_used_for_path(env):
    """文件名从不参与落盘路径:传个 ../../ 名字,blob 仍在 <sha[:2]>/<sha> 下。"""
    env.upload_id(PNG, name="../../../../etc/passwd")
    (att,) = env.rows(Attachment)
    blob = storage.blob_path_of(att)
    assert blob.parent.parent == env.limits.attachments_dir
    assert blob.name == att.sha256
    assert blob.resolve().is_relative_to(env.limits.attachments_dir.resolve())


def test_adversarial_filename_cannot_inject_response_headers(env):
    """服务端拿到**原始**恶意文件名(绕过 HTTP 客户端的转义,直插库)时的行为。

    要求:响应仍是 200、不能凭空多出被注入的头、Content-Disposition 只有一行。
    """
    att_id = env.insert_attachment(filename='x"; \r\nX-Injected: yes\r\n\r\nevil.png')
    r = env.fetch(att_id, sub=A)
    assert r.status_code == 200
    assert "x-injected" not in {k.lower() for k in r.headers}
    cd = r.headers["content-disposition"]
    assert "\r" not in cd and "\n" not in cd
    assert cd.count('"') == 2 and cd.startswith('inline; filename="')


def test_empty_and_missing_filename_fall_back(env):
    att_id = env.insert_attachment(filename=None)
    r = env.fetch(att_id, sub=A)
    assert r.status_code == 200
    assert r.headers["content-disposition"] == 'inline; filename="attachment"'


def test_overlong_filename_is_capped_in_header(env):
    att_id = env.insert_attachment(filename="n" * 400 + ".png")
    r = env.fetch(att_id, sub=A)
    assert r.status_code == 200
    assert len(r.headers["content-disposition"]) < 200


@pytest.mark.parametrize("name", ["截图 2026-07-30.png", "logo_副本.jpeg", "emoji🙂.png",
                                  "café.png", "нет.png"])
def test_non_ascii_filename_round_trips_end_to_end(env, name):
    """回归(线上真事):中文/emoji 名的图上传成功、取回也必须 **200**。

    坏掉时的现象极其迷惑:上传那步是 201,名字落进库里,之后**每次**取回都 500 →
    那张图永久不可见,前端拿到非 200 会静默移除占位,用户只看到图凭空消失、控制台无错。
    根因是 starlette 用 latin-1 编码响应头;修法是 RFC 5987 双写。
    """
    att_id = env.upload_id(PNG + name.encode(), name=name)
    r = env.fetch(att_id, sub=A)
    assert r.status_code == 200, f"{name} 的图取不回来:{r.text[:200]}"
    assert r.content == PNG + name.encode()
    cd = r.headers["content-disposition"]
    assert "filename*=UTF-8''" in cd
    from urllib.parse import unquote
    assert unquote(cd.split("filename*=UTF-8''")[1]) == name


def test_overlong_filename_is_truncated_before_insert(env):
    """超长文件名入库前必须截到 255(回归)。

    `Attachment.filename` 是 `String(255)`。SQLite 不校验列宽,所以**不截也能本地全绿**;
    生产是 PostgreSQL,>255 会 `value too long for type character varying(255)`,
    整个上传 500 —— 一类只在生产出现的失败。`_disposition`/`_safe_name` 的 `[:100]`
    只作用于响应头,救不了入库这一步,截断必须发生在建记录之前。
    """
    env.upload_id(PNG, name="n" * 400 + ".png")
    (att,) = env.rows(Attachment)
    assert len(att.filename) <= 255
    assert att.filename == "n" * 255              # 保留前 255,不是丢名字也不是报错
    # 取回照常(截断不能把展示链路弄坏)。
    assert env.fetch(str(att.id), sub=A).status_code == 200


def test_filename_truncation_counts_characters_not_bytes(env):
    """**按字符截,不是按字节** —— `character varying(255)` 在 PG 里算的是字符。

    300 个中文字符 = 900 UTF-8 字节。按字符截 → 255 个完整汉字,PG 收得下;
    若有人"优化"成按 byte 切(比如 `name.encode()[:255].decode(errors="ignore")`),
    会在多字节字符中间切开:轻则名字尾部变乱码/丢字,重则 decode 抛异常 → 上传 500。
    这条就是钉住这件事的,谁改成按字节它必须变红。
    """
    name = "中" * 300
    env.upload_id(PNG, name=name)
    (att,) = env.rows(Attachment)
    assert len(att.filename) == 255, "应当保留 255 个**字符**"
    assert att.filename == "中" * 255
    assert att.filename.encode() == "中".encode() * 255, "切在了字符中间(半个 UTF-8 序列)"
    assert len(att.filename.encode()) == 765          # 字节数远超 255,这是对的
    # 且这个名字仍能正常出现在响应头里(RFC 5987 那条路径)。
    r = env.fetch(str(att.id), sub=A)
    assert r.status_code == 200
    assert "filename*=UTF-8''" in r.headers["content-disposition"]


@pytest.mark.parametrize("name", ["a" * 255, "中" * 255, "x" * 254 + "y"])
def test_filename_exactly_at_the_column_limit_is_untouched(env, name):
    """边界:正好 255 字符不该被动(截断只该发生在**超出**时)。"""
    env.upload_id(PNG + name.encode()[:4], name=name)
    (att,) = env.rows(Attachment)
    assert att.filename == name


# ==================== 6. /api/chat?att= 的 owner 过滤 ====================


def test_chat_records_own_attachment_id(env):
    att_id = env.upload_id(PNG, sub=A)
    r = env.chat("这图什么问题", sub=A, att=att_id)
    assert r.status_code == 200
    assert [e["type"] for e in _events(r.text)] == ["token", "done"]
    parts = env.user_parts()
    assert parts == [
        {"type": "text", "text": "这图什么问题"},
        {"type": "image_url", "image_url": {"url": f"attachment:{att_id}"}},
    ]


def test_chat_silently_drops_someone_elses_attachment(env):
    """盗用他人 id:静默过滤(不报错、不打断问答),且绝不落进自己的历史。

    若不过滤,拿到别人的 id 就能把他人的图带进自己的对话 —— 以后接 VL 时等于能读别人的图。
    """
    victim = env.upload_id(PNG, sub=B)
    r = env.chat("偷看", sub=A, att=victim)
    assert r.status_code == 200
    assert env.user_parts() is None, "他人的附件被记进了 A 的消息"


def test_chat_keeps_only_own_ids_when_mixed(env):
    mine = env.upload_id(PNG, sub=A)
    theirs = env.upload_id(PNG + b"other", sub=B)
    env.chat("混用", sub=A, att=f"{theirs},{mine}")
    parts = env.user_parts()
    urls = [p["image_url"]["url"] for p in parts if p["type"] == "image_url"]
    assert urls == [f"attachment:{mine}"]


def test_chat_preserves_attachment_order(env):
    ids = [env.upload_id(PNG + bytes([i]), sub=A) for i in range(3)]
    env.chat("三张图", sub=A, att=",".join(ids))
    urls = [p["image_url"]["url"] for p in env.user_parts() if p["type"] == "image_url"]
    assert urls == [f"attachment:{i}" for i in ids], "顺序必须与请求一致(图文位置有意义)"


@pytest.mark.parametrize("att", ["abc", "deadbeef", "0" * 40, "-", ",,,",
                                 "abc,def", "0,0,0"])
def test_chat_ignores_malformed_ids_without_erroring(env, att):
    """形如十六进制但不是 uuid 的串:忽略即可,不能打断问答(用户正在等答案)。"""
    r = env.chat("正常提问", sub=A, att=att)
    assert r.status_code == 200
    assert [e["type"] for e in _events(r.text)] == ["token", "done"]
    assert env.user_parts() is None


@pytest.mark.parametrize("att", ["not-a-uuid", "../../etc/passwd", "<script>",
                                 "' OR 1=1--", "x" * 600])
def test_chat_rejects_out_of_charset_att_at_the_query_layer(env, att):
    """字符集之外的 att 在参数校验层就 422(`^[0-9a-fA-F,-]*$` + 长度上限)。

    这是**第一道**闸门:畸形串根本进不到查库那一步。
    """
    r = env.chat("提问", sub=A, att=att)
    assert r.status_code == 422
    assert env.rows(Conversation) == []


def test_chat_empty_att_records_no_parts(env):
    """`att=` 空串 → parts_json 必须是 NULL(老数据零迁移的前提:纯文本消息不写 parts)。"""
    env.chat("纯文本提问", sub=A, att="")
    assert env.user_parts() is None


def test_chat_without_att_records_no_parts(env):
    env.chat("纯文本提问", sub=A)
    assert env.user_parts() is None


def test_chat_caps_attachments_at_eight(env):
    """上限 8 张:防一次塞几十张(以后接 VL 时每张都是成本)。"""
    ids = [env.upload_id(PNG + bytes([i]), sub=A) for i in range(9)]
    env.chat("九张图", sub=A, att=",".join(ids))
    urls = [p["image_url"]["url"] for p in env.user_parts() if p["type"] == "image_url"]
    assert len(urls) == 8
    assert urls == [f"attachment:{i}" for i in ids[:8]]


def test_anonymous_chat_with_att_records_nothing(env):
    """匿名带 att:既不落库(匿名本就不落库),也不该引用任何附件。"""
    victim = env.upload_id(PNG, sub=B)
    r = env.chat("匿名带图", sub=None, att=victim)
    assert r.status_code == 200
    assert env.rows(Conversation) == []
    assert env.rows(Message) == []


def test_chat_att_does_not_break_the_answer_stream(env):
    """附件解析失败/为空都不能影响正文流(答案优先于附件这层锦上添花)。"""
    att_id = env.upload_id(PNG, sub=A)
    for att in (att_id, "abc", "", None):
        r = env.chat("提问", sub=A, att=att)
        evs = _events(r.text)
        assert evs[0]["type"] == "token" and evs[0]["text"] == "答"
        assert evs[-1]["type"] == "done"


def test_chat_attachment_ids_are_the_canonical_uuid_form(env):
    """落库的是**库里那条记录的 id**(canonical 小写带横线),不是用户发来的原串。

    否则同一附件可能以两种写法进历史,前端按 id 匹配就会漏。
    """
    att_id = env.upload_id(PNG, sub=A)
    env.chat("大写 id", sub=A, att=att_id.upper())
    urls = [p["image_url"]["url"] for p in env.user_parts() if p["type"] == "image_url"]
    assert urls == [f"attachment:{att_id}"]


# ==================== 7. record_turn / get_conversation 的 parts ====================


def test_record_turn_writes_openai_parts_with_text_first(env):
    """parts 是标准 OpenAI 结构,且 **text 在前** —— 顺序就是渲染顺序。"""
    ids = [str(uuid.uuid4()), str(uuid.uuid4())]
    history.record_turn(A, "t1", "看这两张图", "好的", attachment_ids=ids)
    msgs = env.messages()
    user, assistant = msgs[0], msgs[1]
    assert user.parts_json == [
        {"type": "text", "text": "看这两张图"},
        {"type": "image_url", "image_url": {"url": f"attachment:{ids[0]}"}},
        {"type": "image_url", "image_url": {"url": f"attachment:{ids[1]}"}},
    ]
    assert user.parts_json[0]["type"] == "text"
    assert user.content == "看这两张图", "content 仍是纯文本(检索/摘要/导出都靠它)"
    assert assistant.parts_json is None, "助手回答没有附件,不该写 parts"


def test_record_turn_uses_attachment_scheme_not_a_real_path(env):
    """url 用 `attachment:<id>` 自定义 scheme:真实路径会变,且取回必须走鉴权端点。"""
    att_id = str(uuid.uuid4())
    history.record_turn(A, "t1", "图", "答", attachment_ids=[att_id])
    url = env.messages()[0].parts_json[1]["image_url"]["url"]
    assert url == f"attachment:{att_id}"
    assert not url.startswith(("http", "/", "file:")), "不能是可直取的 URL"
    assert "attachments/" not in url


@pytest.mark.parametrize("ids", [None, []])
def test_record_turn_without_attachments_leaves_parts_null(env, ids):
    """不带附件必须是 NULL,不是 [] 也不是 [{text}] —— 老数据零迁移的前提。"""
    history.record_turn(A, "t1", "纯文本", "答", attachment_ids=ids)
    assert [m.parts_json for m in env.messages()] == [None, None]


def test_get_conversation_returns_parts_for_attachment_message(env):
    att_id = str(uuid.uuid4())
    history.record_turn(A, "t1", "带图的问题", "答", attachment_ids=[att_id])
    with env.Session() as s:
        conv_id = history.list_conversations(s, A)[0]["id"]
        detail = history.get_conversation(s, A, conv_id)
    user_msg = detail["messages"][0]
    assert user_msg["parts"][0] == {"type": "text", "text": "带图的问题"}
    assert user_msg["parts"][1]["image_url"]["url"] == f"attachment:{att_id}"
    assert detail["messages"][1]["parts"] is None


def test_get_conversation_returns_none_parts_for_legacy_messages(env):
    """老消息(parts_json 为 NULL)必须回 None 而不是崩 —— 前端两条路径都要能走。"""
    with env.Session() as s:
        conv = Conversation(user_sub=A, thread_id="old", title="老对话")
        s.add(conv)
        s.commit()
        s.add(Message(conversation_id=conv.id, role="user", content="老问题"))
        s.add(Message(conversation_id=conv.id, role="assistant", content="老答案"))
        s.commit()
        detail = history.get_conversation(s, A, str(conv.id))
    assert [m["parts"] for m in detail["messages"]] == [None, None]
    assert [m["content"] for m in detail["messages"]] == ["老问题", "老答案"]


def test_conversation_with_attachment_is_not_visible_to_other_user(env):
    """带附件的对话同样按 sub 隔离(附件不该成为绕过隔离的新入口)。"""
    att_id = env.upload_id(PNG, sub=A)
    env.chat("我的图", sub=A, att=att_id)
    with env.Session() as s:
        conv_id = history.list_conversations(s, A)[0]["id"]
        assert history.get_conversation(s, B, conv_id) is None
        assert history.list_conversations(s, B) == []


def test_end_to_end_upload_ask_then_read_back(env):
    """端到端:上传 → 带 att 提问 → 从 /api/me/conversations 读回图文历史 → 取回原图。"""
    att_id = env.upload_id(PNG, name="截图.png", sub=A)
    env.chat("这张图里是什么", sub=A, att=att_id, thread="conv-1")

    convs = env.client.get("/api/me/conversations", headers={"Authorization": f"Bearer {A}"})
    assert convs.status_code == 200
    items = convs.json()["items"]
    assert len(items) == 1 and items[0]["thread_id"] == "conv-1"

    detail = env.client.get(f"/api/me/conversations/{items[0]['id']}",
                            headers={"Authorization": f"Bearer {A}"})
    assert detail.status_code == 200
    msgs = detail.json()["messages"]
    assert msgs[0]["parts"][1]["image_url"]["url"] == f"attachment:{att_id}"
    # 前端据此 id 回访鉴权端点取图:本人 200、他人 404。
    assert env.fetch(att_id, sub=A).content == PNG
    assert env.fetch(att_id, sub=B).status_code == 404
    # B 也看不到这段对话本身。
    other = env.client.get(f"/api/me/conversations/{items[0]['id']}",
                           headers={"Authorization": f"Bearer {B}"})
    assert other.status_code == 404


# ==================== 8. 守卫:不写仓库 data/ ====================


def test_api_tests_never_touch_the_real_data_dir(env, tmp_path):
    real_dir = real_settings.attachments_dir
    before = sorted(p.name for p in real_dir.iterdir()) if real_dir.exists() else None
    with warnings.catch_warnings():
        warnings.simplefilter("ignore")
        att_id = env.upload_id(PNG)
        env.chat("提问", sub=A, att=att_id)
    after = sorted(p.name for p in real_dir.iterdir()) if real_dir.exists() else None
    assert after == before, f"测试写进了仓库的 {real_dir}"
    assert env.limits.attachments_dir.is_relative_to(tmp_path)
    assert list(env.limits.attachments_dir.rglob("*")), "对照:blob 确实落在 tmp 里"
