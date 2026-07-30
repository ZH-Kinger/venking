"""附件存储层(storage.py)——魔数嗅探 / 配额 / 全站水位 / 内容寻址 / 去重,零网络零 live-DB。

被测对象:`sniff_mime`、`used_bytes`、`total_bytes`、`store_stream`、`find_by_sha`、
`blob_path_of`、`_blob_path`、`delete_blob_if_unreferenced`、`UploadError`、常量 `HEAD_BYTES`。
路由层在 test_attachments_api.py。

隔离手段(**绝不污染仓库 data/**):
- `storage.settings` 整体换成一个只含四个字段的替身(附件目录指向 tmp_path)。
  比给 `type(settings).attachments_dir` 打 property 补丁干净:不改全局单例、不改类,
  monkeypatch 作用域内天然回滚;字段漏读会 AttributeError 当场暴露而不是静默回落真配置。
- 库用进程内 / tmp 文件 SQLite,不碰 `data/admin.sqlite`,更不连 .env 里的 PostgreSQL。
- 文件末尾有一条"未污染"守卫用例,直接对真实 `settings.attachments_dir` 断言。

覆盖:
1. sniff_mime 白名单(jpeg/png/gif87/gif89/webp)与拒绝集(PDF/PHP/ELF/HTML/**SVG**/
   RIFF-WAV/zip/bmp/ico/tiff/空/半截魔数)—— SVG 必须继续被拒:它是无魔数的文本格式,
   放行等于存储型 XSS;
2. store_stream 的边界:空 0B / 恰好上限 / 上限+1 / 恰好填满配额 / 超配额 / 全站水位,
   以及失败路径不留临时文件、不留 blob;
3. HEAD_BYTES 累积:每次只吐 1/2/3/7… 字节时 png/webp/jpeg/gif 仍能识别(回归——原实现
   只取首个 chunk 前 16 字节,首块不足 8 字节会把合法 PNG 误拒成 415);
4. 内容寻址布局 `<sha[:2]>/<sha>`、`_blob_path` 的 sha 守卫、临时名唯一性、
   用户内去重((owner_sub, sha256))与"磁盘级 deduped 不等于用户级";
   `delete_blob_if_unreferenced` 的跨全表引用计数、幂等、非法 sha 守卫与**调用方顺序契约**;
5. 已知缺口用 xfail(strict=True) 钉住:配额并发窗口、孤儿文件、满配额重传旧文件被误拒。
"""
from __future__ import annotations

import hashlib
import io
import threading

import pytest
from sqlalchemy import create_engine, func, select
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from blog_rag import storage
from blog_rag.config import settings as real_settings
from blog_rag.models import Attachment, Base

# ---------------- 素材 ----------------
# 只要魔数正确即可(嗅探只看头部);不用真图,免得测试依赖 Pillow。
PNG = b"\x89PNG\r\n\x1a\n" + b"\x00" * 40
JPEG = b"\xff\xd8\xff\xe0\x00\x10JFIF\x00" + b"\x00" * 30
JPEG_EXIF = b"\xff\xd8\xff\xe1\x00\x10Exif\x00" + b"\x00" * 30
GIF87 = b"GIF87a" + b"\x01" * 40
GIF89 = b"GIF89a" + b"\x02" * 40
WEBP = b"RIFF" + (100).to_bytes(4, "little") + b"WEBPVP8 " + b"\x03" * 40

PDF = b"%PDF-1.7\n%\xc7\xec\x8f\xa2\n" + b"\x00" * 30
PHP = b"<?php system($_GET['c']); ?>" + b"\n" * 20
ELF = b"\x7fELF\x02\x01\x01\x00" + b"\x00" * 30
HTML = b"<!DOCTYPE html><html><body><script>alert(1)</script></body></html>"
SVG = b'<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>'
SVG_XML = b'<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg"/>'


def _uniq(seed: bytes) -> bytes:
    """同类型、内容互不相同的图片字节(避免测配额时被去重吃掉)。"""
    return PNG + seed


class Drip(io.RawIOBase):
    """每次 read 只吐 n 字节的流(模拟分块 / 慢速上传)。"""

    def __init__(self, data: bytes, n: int) -> None:
        self._buf = io.BytesIO(data)
        self._n = n

    def read(self, _size: int = -1) -> bytes:
        return self._buf.read(self._n)


# ---------------- fixtures ----------------


class _Limits:
    """storage.settings 的替身:只暴露 storage 真正读的四个字段。

    用普通类而非真 Settings:漏读/改名任一字段都会 AttributeError 当场暴露,
    不会静默拿到真实配置(那意味着可能写进仓库 data/)。
    """

    def __init__(self, attachments_dir, max_bytes: int, quota: int, total: int) -> None:
        self.attachments_dir = attachments_dir
        self.upload_max_bytes = max_bytes
        self.upload_quota_bytes = quota
        self.upload_total_bytes = total


@pytest.fixture()
def limits(tmp_path, monkeypatch) -> _Limits:
    """附件目录指到 tmp;上限默认取**真实配置值**(5MB/100MB/5GB),用例可就地调小。"""
    lim = _Limits(tmp_path / "attachments", real_settings.upload_max_bytes,
                  real_settings.upload_quota_bytes, real_settings.upload_total_bytes)
    monkeypatch.setattr(storage, "settings", lim)
    return lim


@pytest.fixture()
def db(limits):
    """进程内 SQLite(StaticPool = 单连接,同一份内存库)。"""
    engine = create_engine("sqlite://", connect_args={"check_same_thread": False},
                           poolclass=StaticPool, future=True)
    Base.metadata.create_all(engine)
    Session = sessionmaker(bind=engine, autoflush=False, expire_on_commit=False, future=True)
    with Session() as s:
        yield s


def _put(db, owner: str, data: bytes) -> Attachment:
    """走一遍"store_stream + 建记录"(等价于路由层做的事),返回入库对象。"""
    stored = storage.store_stream(io.BytesIO(data), owner_sub=owner, db=db)
    att = storage.find_by_sha(db, owner, stored.sha256)
    if att is None:
        att = Attachment(owner_sub=owner, kind="image", mime=stored.mime, bytes=stored.size,
                         sha256=stored.sha256, filename="x.png")
        db.add(att)
        db.commit()
    return att


def _blobs(lim: _Limits) -> list:
    """attachments_dir 下真正落盘的 blob(不含 _tmp)。"""
    root = lim.attachments_dir
    if not root.exists():
        return []
    return [p for p in root.rglob("*") if p.is_file() and "_tmp" not in p.parts]


def _tmp_left(lim: _Limits) -> list:
    d = lim.attachments_dir / "_tmp"
    return list(d.iterdir()) if d.exists() else []


# ---------------- 1. sniff_mime:白名单 ----------------


@pytest.mark.parametrize(("data", "mime"), [
    (JPEG, "image/jpeg"),
    (JPEG_EXIF, "image/jpeg"),
    (PNG, "image/png"),
    (GIF87, "image/gif"),
    (GIF89, "image/gif"),
    (WEBP, "image/webp"),
])
def test_sniff_accepts_the_four_image_types(data, mime):
    assert storage.sniff_mime(data) == mime


@pytest.mark.parametrize(("name", "data"), [
    ("pdf", PDF),
    ("php", PHP),
    ("elf", ELF),
    ("html", HTML),
    # SVG 是**文本**格式,没有魔数;它能带 <script>,若放行并被浏览器按 image/svg+xml
    # 渲染就是存储型 XSS(同源!)。这两条是安全断言,任何"顺手支持 SVG"都必须先过它。
    ("svg", SVG),
    ("svg_with_xml_decl", SVG_XML),
    # RIFF 家族但不是 WEBP:只看前 4 字节会误判,必须同时看偏移 8..12。
    ("riff_wav", b"RIFF" + (36).to_bytes(4, "little") + b"WAVEfmt " + b"\x00" * 20),
    ("riff_avi", b"RIFF" + (36).to_bytes(4, "little") + b"AVI LIST" + b"\x00" * 20),
    ("zip", b"PK\x03\x04" + b"\x00" * 20),
    ("bmp", b"BM" + b"\x00" * 20),
    ("ico", b"\x00\x00\x01\x00" + b"\x00" * 20),
    ("tiff_le", b"II*\x00" + b"\x00" * 20),
    ("empty", b""),
    ("truncated_png_magic", b"\x89PNG"),          # 半截魔数不算数
    ("png_magic_not_at_offset_0", b"XX" + PNG),   # 魔数必须在开头,不能在文件中间
    ("gif_lowercase", b"gif89a" + b"\x00" * 20),  # 大小写敏感
    ("utf8_bom_svg", b"\xef\xbb\xbf" + SVG),
    ("leading_space_svg", b"   " + SVG),
])
def test_sniff_rejects_everything_that_is_not_an_image(name, data):
    assert storage.sniff_mime(data) is None, f"{name} 被当成图片放行了"


def test_sniff_ignores_declared_type_entirely():
    """嗅探只吃字节:PDF 内容不会因为"叫 .png / 声明 image/png"而变成图片。

    (Content-Type 与扩展名都由客户端提供,可任意伪造 —— 这正是不信它们的原因。)
    """
    assert storage.sniff_mime(PDF) is None
    assert storage.sniff_mime(PNG) == "image/png"


def test_sniff_accepts_polyglot_gif_php_and_relies_on_other_layers():
    """对抗:GIF89a 头 + PHP 载荷(经典 polyglot)—— 魔数嗅探**认它是 gif**。

    这是纯魔数方案的固有上界,不是本层的 bug。真正兜底的是别的三层:
    ①落盘名是 sha256、无扩展名(不可能被 PHP-FPM 当脚本执行);
    ②取回走鉴权端点而非静态目录;③响应带 X-Content-Type-Options: nosniff。
    这条用例把"上界在哪"写死,防止有人误以为嗅探能挡住内容注入。
    """
    assert storage.sniff_mime(GIF89[:6] + PHP) == "image/gif"


def test_head_bytes_is_enough_for_webp():
    """HEAD_BYTES 必须 ≥12(webp 的标记在偏移 8..12),否则 webp 永远识别不了。"""
    assert storage.HEAD_BYTES >= 12
    assert storage.sniff_mime(WEBP[: storage.HEAD_BYTES]) == "image/webp"


# ---------------- 2. used_bytes ----------------


def test_used_bytes_zero_for_user_without_attachments(db):
    """无附件必须是 int 0(不是 None)——它是配额算式的分母,None 会 TypeError。"""
    v = storage.used_bytes(db, "nobody")
    assert v == 0
    assert isinstance(v, int)


def test_used_bytes_counts_only_that_owner(db):
    _put(db, "userA", _uniq(b"a1"))
    _put(db, "userA", _uniq(b"a2"))
    _put(db, "userB", _uniq(b"b1"))
    assert storage.used_bytes(db, "userA") == len(_uniq(b"a1")) + len(_uniq(b"a2"))
    assert storage.used_bytes(db, "userB") == len(_uniq(b"b1"))
    assert storage.used_bytes(db, "userC") == 0


def test_used_bytes_counts_deduped_upload_once(db):
    """同一用户重复上传同一内容只占一份配额(去重的意义所在)。"""
    _put(db, "userA", PNG)
    _put(db, "userA", PNG)
    _put(db, "userA", PNG)
    assert storage.used_bytes(db, "userA") == len(PNG)


# ---------------- 2b. total_bytes:全站水位 ----------------


def test_total_bytes_sums_across_all_owners(db):
    """全站水位的分子:**不按 owner 过滤** —— per-user 配额挡不住"用户数增长"。"""
    assert storage.total_bytes(db) == 0
    _put(db, "userA", _uniq(b"a"))
    _put(db, "userB", _uniq(b"b"))
    _put(db, "userC", _uniq(b"c"))
    assert storage.total_bytes(db) == 3 * len(_uniq(b"a"))
    # 与 used_bytes 的关系:全站 ≥ 任一用户。
    assert storage.total_bytes(db) > storage.used_bytes(db, "userA")


def test_real_default_total_watermark_is_5gb():
    """这台机 ~27G 可用盘:5GB 水位留足余量给业务库 + chroma + checkpoints。"""
    assert real_settings.upload_total_bytes == 5 * 1024 * 1024 * 1024


def test_site_full_returns_507_not_413(db, limits):
    """全站水位打满 → **507**,与"你个人超配额"的 413 有意区分。

    413 用户删自己的图能解;507 删自己的也没用,得管理员处理。前端提示文案不同,
    所以这两个码不能混:混了就会让用户徒劳地删自己的图。
    """
    limits.upload_total_bytes = len(PNG)          # 一张图就到水位
    _put(db, "userA", PNG)
    with pytest.raises(storage.UploadError) as e:
        storage.store_stream(io.BytesIO(_uniq(b"more")), owner_sub="userB", db=db)
    assert e.value.status == 507
    assert e.value.status != 413
    assert "站点" in e.value.detail


def test_site_watermark_counts_other_users_uploads(db, limits):
    """水位是全站的:B 一个人传满,A(自己配额还空着)也被 507 挡住。"""
    limits.upload_total_bytes = len(PNG)
    _put(db, "userB", PNG)
    assert storage.used_bytes(db, "userA") == 0
    with pytest.raises(storage.UploadError) as e:
        storage.store_stream(io.BytesIO(_uniq(b"x")), owner_sub="userA", db=db)
    assert e.value.status == 507


def test_site_watermark_is_a_soft_ceiling_by_one_file(db, limits):
    """水位是**软**上界:检查在写之前(`total >= watermark`),所以最后一次上传可以
    把总量顶过水位,超出量的上界是单文件上限(5MB)。

    这不是 bug 而是取舍(逐块判全站 SUM 太贵),但必须写明白 —— 否则运维会以为
    5GB 是硬上界,按它算余量。
    """
    limits.upload_total_bytes = len(PNG) + 1
    _put(db, "userB", PNG)                                     # 48B,未达水位
    _put(db, "userA", _uniq(b"y" * 100))                       # 再进 148B → 总 196B
    assert storage.total_bytes(db) > limits.upload_total_bytes
    overshoot = storage.total_bytes(db) - limits.upload_total_bytes
    assert overshoot <= limits.upload_max_bytes
    # 下一次一定被挡(水位已过)。
    with pytest.raises(storage.UploadError) as e:
        storage.store_stream(io.BytesIO(_uniq(b"z")), owner_sub="userA", db=db)
    assert e.value.status == 507


def test_below_watermark_is_unaffected(db, limits):
    """未达水位不受影响(水位不能变成"总是挡")。"""
    limits.upload_total_bytes = len(PNG) * 10
    for i in range(5):
        _put(db, "userA", _uniq(bytes([i])))
    assert storage.total_bytes(db) < limits.upload_total_bytes
    assert storage.store_stream(io.BytesIO(_uniq(b"last")), owner_sub="userA", db=db).size > 0


def test_watermark_is_checked_before_writing_anything(db, limits):
    """507 必须在写盘前判掉:盘都满了还先写 5MB 临时文件是最坏的时机。"""
    limits.upload_total_bytes = len(PNG)
    _put(db, "userA", PNG)
    before = {p.name for p in _blobs(limits)}
    with pytest.raises(storage.UploadError):
        storage.store_stream(io.BytesIO(_uniq(b"nope")), owner_sub="userA", db=db)
    assert {p.name for p in _blobs(limits)} == before
    assert _tmp_left(limits) == []


# ---------------- 2c. _blob_path:内容寻址键的守卫 ----------------


@pytest.mark.parametrize("bad", [
    "../../etc/passwd",
    "../" * 10 + "etc/passwd",
    "/etc/passwd",
    "a" * 63,                       # 短一位
    "a" * 65,                       # 长一位
    "A" * 64,                       # 大写不是 hexdigest() 的输出形式
    "g" * 64,                       # 非十六进制字符
    "",
    "abc/../../x" + "0" * 53,
])
def test_blob_path_rejects_anything_that_is_not_a_sha256(bad, limits):
    """落盘键必须是规范 sha256。

    今天只有 `digest.hexdigest()` 能喂进来,但任何新写入路径(导入脚本、迁移、修复
    工具)传进带 `../` 的串就是**任意文件写**。这条把断言钉住,别让后来的调用方绕过。
    """
    with pytest.raises(ValueError):
        storage._blob_path(bad)


def test_blob_path_accepts_canonical_sha(limits):
    sha = hashlib.sha256(PNG).hexdigest()
    p = storage._blob_path(sha)
    assert p == limits.attachments_dir / sha[:2] / sha
    assert p.resolve().is_relative_to(limits.attachments_dir.resolve())


def test_temp_names_are_unique_across_uploads(db, limits, monkeypatch):
    """临时名必须真随机:并发上传同一内容时不能互相覆盖到写了一半的文件。

    观察点是"同一用户、同一内容、连续多次上传时用过的临时名互不相同" ——
    旧实现是 `sha256(owner_sub + id(src))`,依赖 CPython 的 id() 对活对象互异
    这一实现细节(且注释号称"随机 uuid",与实现不符)。
    """
    seen: list[str] = []
    real_open = type(limits.attachments_dir).open

    def spy_open(self, *a, **kw):
        if "_tmp" in self.parts:
            seen.append(self.name)
        return real_open(self, *a, **kw)

    monkeypatch.setattr(type(limits.attachments_dir), "open", spy_open)
    for i in range(5):
        storage.store_stream(io.BytesIO(_uniq(bytes([i]))), owner_sub="userA", db=db)
    assert len(seen) == 5
    assert len(set(seen)) == 5, f"临时名重复:{seen}"
    assert all(n.startswith("up-") for n in seen)


# ---------------- 3. store_stream:正常路径 ----------------


def test_store_stream_returns_content_addressed_file(db, limits):
    stored = storage.store_stream(io.BytesIO(PNG), owner_sub="userA", db=db)
    assert stored.mime == "image/png"
    assert stored.size == len(PNG)
    assert stored.sha256 == hashlib.sha256(PNG).hexdigest()
    assert stored.deduped is False
    # 落盘布局:<attachments_dir>/<sha[:2]>/<sha>,两级分桶,文件名**不含**原始名。
    assert stored.path.relative_to(limits.attachments_dir).parts == (
        stored.sha256[:2], stored.sha256)
    assert stored.path.read_bytes() == PNG
    assert _tmp_left(limits) == []


def test_store_stream_same_content_same_path_for_different_users(db, limits):
    """内容寻址:路径只由内容决定,与上传者无关(同内容不会存两份盘)。"""
    a = storage.store_stream(io.BytesIO(PNG), owner_sub="userA", db=db)
    b = storage.store_stream(io.BytesIO(PNG), owner_sub="userB", db=db)
    assert a.path == b.path
    assert len(_blobs(limits)) == 1


def test_store_stream_dedupes_within_one_user(db):
    first = storage.store_stream(io.BytesIO(PNG), owner_sub="userA", db=db)
    assert first.deduped is False
    second = storage.store_stream(io.BytesIO(PNG), owner_sub="userA", db=db)
    assert second.deduped is True
    assert second.sha256 == first.sha256 and second.path == first.path


def test_store_stream_different_content_different_blobs(db, limits):
    a = storage.store_stream(io.BytesIO(_uniq(b"1")), owner_sub="userA", db=db)
    b = storage.store_stream(io.BytesIO(_uniq(b"2")), owner_sub="userA", db=db)
    assert a.sha256 != b.sha256
    assert len(_blobs(limits)) == 2


def test_find_by_sha_is_scoped_to_owner(db):
    att = _put(db, "userA", PNG)
    sha = att.sha256
    assert storage.find_by_sha(db, "userA", sha) is not None
    # 有意**不跨用户去重**:B 查 A 的 sha 必须查不到,否则 ①删 A 的图会影响 B
    # ②B 能用"秒传与否"探测 A 是否持有某文件。
    assert storage.find_by_sha(db, "userB", sha) is None
    assert storage.find_by_sha(db, "userA", "0" * 64) is None


def test_blob_path_of_matches_store_layout(db, limits):
    att = _put(db, "userA", PNG)
    p = storage.blob_path_of(att)
    assert p == limits.attachments_dir / att.sha256[:2] / att.sha256
    assert p.is_file()


# ---------------- 3b. delete_blob_if_unreferenced:跨全表引用计数 + 回收 ----------------
# blob 是**全站共享一份**的(内容寻址),所以"删记录"和"删文件"不是一回事。
# 这一族用例单测这个函数而不是走 HTTP:更便宜、失败定位直接指到计数逻辑,
# 而 DELETE 端点那边只需验它被正确调用(见 test_attachments_api.py)。


def test_delete_blob_removes_file_when_last_reference_is_gone(db, limits):
    """唯一引用被删掉后 → 返回 True 且文件真的没了。"""
    att = _put(db, "userA", PNG)
    sha, blob = att.sha256, storage.blob_path_of(att)
    assert blob.is_file()

    db.delete(att)                       # 调用方的契约:先删自己那行并提交
    db.commit()
    assert storage.delete_blob_if_unreferenced(db, sha) is True
    assert not blob.exists()
    assert _blobs(limits) == []


def test_delete_blob_keeps_file_while_another_user_references_it(db, limits):
    """**核心**:A、B 各有一条记录指向同一内容,A 删完后文件必须留着。

    直接 unlink 就是静默数据丢失:B 那条记录还在,取回却变 410,查起来毫无头绪。
    """
    a = _put(db, "userA", PNG)
    b = _put(db, "userB", PNG)
    assert a.sha256 == b.sha256
    blob = storage.blob_path_of(a)

    db.delete(a)
    db.commit()
    assert storage.delete_blob_if_unreferenced(db, a.sha256) is False
    assert blob.is_file(), "把别人的图一起删了"
    assert len(_blobs(limits)) == 1

    # B 再删,此时才真的没人引用 → 回收。
    db.delete(b)
    db.commit()
    assert storage.delete_blob_if_unreferenced(db, b.sha256) is True
    assert not blob.exists()


def test_delete_blob_counts_references_across_all_owners(db, limits):
    """引用计数**跨全表**,不是只数自己名下的(3 个用户共享,前两次都不能删)。"""
    atts = [_put(db, f"user{i}", PNG) for i in "ABC"]
    sha = atts[0].sha256
    blob = storage.blob_path_of(atts[0])
    for att in atts[:2]:
        db.delete(att)
        db.commit()
        assert storage.delete_blob_if_unreferenced(db, sha) is False
        assert blob.is_file()
    db.delete(atts[2])
    db.commit()
    assert storage.delete_blob_if_unreferenced(db, sha) is True
    assert not blob.exists()


def test_delete_blob_is_idempotent_when_file_already_missing(db, limits):
    """文件早就没了(手工清理/上一次删到一半)→ 不抛,仍返回 True。

    删除端点会连着调它;这里一抛异常,用户就会看到 500 且记录已经删了 —— 不可重试。
    """
    att = _put(db, "userA", PNG)
    sha, blob = att.sha256, storage.blob_path_of(att)
    blob.unlink()                        # 先把文件弄丢
    db.delete(att)
    db.commit()
    assert storage.delete_blob_if_unreferenced(db, sha) is True
    # 再调一次也不抛(幂等)。
    assert storage.delete_blob_if_unreferenced(db, sha) is True


def test_delete_blob_of_unknown_sha_is_a_noop(db, limits):
    """库里从没有过这个 sha:不抛、返回 True,且不碰任何现有文件。"""
    kept = _put(db, "userA", PNG)
    other = hashlib.sha256(b"never-uploaded").hexdigest()
    assert storage.delete_blob_if_unreferenced(db, other) is True
    assert storage.blob_path_of(kept).is_file()


@pytest.mark.parametrize("bad", [
    "A" * 64,                            # 大写:hexdigest() 不会产出,视为非法
    "../../etc/passwd",
    "../" * 10 + "a" * 20,
    "/etc/passwd",
    "g" * 64,
    "a" * 63,
    "",
])
def test_delete_blob_rejects_non_canonical_sha(db, limits, bad):
    """非规范 sha 必须由 `_blob_path` 的守卫抛 ValueError,**绝不能**静默 unlink 别处的文件。

    这个函数现在是 storage 的**公开** API(路由层直接调),所以它拿到的串必须一样被审。
    真实威胁不是今天的路由,而是明天的导入/修复脚本:传进带 `../` 的串就是任意文件删除。
    """
    kept = _put(db, "userA", PNG)
    with pytest.raises(ValueError):
        storage.delete_blob_if_unreferenced(db, bad)
    assert storage.blob_path_of(kept).is_file(), "误删了别的文件"


def test_delete_blob_called_before_deleting_the_row_never_reclaims(db, limits):
    """**调用方顺序契约**:必须"先 delete 记录 + commit,再调本函数"。

    顺序反了(先数引用再删记录)会把**自己那一行**算进引用里 → 永远返回 False、
    磁盘永不回收,而且完全静默:配额降下去了,盘却一直涨。这条用例把这个
    先后关系写成可执行的文档,免得哪天有人"顺手"把两行调换。
    """
    att = _put(db, "userA", PNG)
    sha, blob = att.sha256, storage.blob_path_of(att)

    # 反序:记录还在 → 把自己数进去了。
    assert storage.delete_blob_if_unreferenced(db, sha) is False
    assert blob.is_file()

    # 正序:先删+提交,再数。
    db.delete(att)
    db.commit()
    assert storage.delete_blob_if_unreferenced(db, sha) is True
    assert not blob.exists()


def test_delete_blob_only_touches_the_target_content(db, limits):
    """只删目标 sha 那个文件,别的内容一个都不能少(两级分桶下尤其要看清)。"""
    target = _put(db, "userA", PNG)
    keep = [_put(db, "userA", _uniq(bytes([i]))) for i in range(3)]
    sha = target.sha256
    db.delete(target)
    db.commit()
    assert storage.delete_blob_if_unreferenced(db, sha) is True
    assert not (limits.attachments_dir / sha[:2] / sha).exists()
    assert all(storage.blob_path_of(a).is_file() for a in keep)
    assert len(_blobs(limits)) == 3


# ---------------- 4. store_stream:拒绝路径 ----------------


@pytest.mark.parametrize(("name", "data"), [("pdf", PDF), ("php", PHP), ("elf", ELF),
                                            ("html", HTML), ("svg", SVG)])
def test_non_image_raises_415_and_leaves_no_file(db, limits, name, data):
    with pytest.raises(storage.UploadError) as e:
        storage.store_stream(io.BytesIO(data), owner_sub="userA", db=db)
    assert e.value.status == 415
    assert _blobs(limits) == [], f"{name} 被拒后仍留下了 blob"
    assert _tmp_left(limits) == [], f"{name} 被拒后仍留下了临时文件"


def test_empty_file_raises_400(db, limits):
    with pytest.raises(storage.UploadError) as e:
        storage.store_stream(io.BytesIO(b""), owner_sub="userA", db=db)
    assert e.value.status == 400
    assert _blobs(limits) == [] and _tmp_left(limits) == []


def test_upload_error_carries_status_and_detail():
    err = storage.UploadError(413, "太大了")
    assert err.status == 413 and err.detail == "太大了"
    assert str(err) == "太大了"
    assert isinstance(err, Exception)


def test_real_default_limits_are_5mb_and_100mb():
    """配额是硬约束(这台机 ~27G 盘,开放注册+图片上传=潜在免费图床)。"""
    assert real_settings.upload_max_bytes == 5 * 1024 * 1024
    assert real_settings.upload_quota_bytes == 100 * 1024 * 1024


def test_file_over_5mb_is_rejected_with_413(db, limits):
    """用**真实** 5MB 上限跑一遍(不是调小后的近似):5MB+1 → 413。"""
    assert limits.upload_max_bytes == 5 * 1024 * 1024
    payload = PNG + b"\x00" * (5 * 1024 * 1024 + 1 - len(PNG))
    with pytest.raises(storage.UploadError) as e:
        storage.store_stream(io.BytesIO(payload), owner_sub="userA", db=db)
    assert e.value.status == 413
    assert "5MB" in e.value.detail
    assert _blobs(limits) == [] and _tmp_left(limits) == []


def test_file_exactly_at_max_is_accepted(db, limits):
    """边界:恰好等于上限放行(">" 而非 ">=";写成 >= 会让整数倍大小的文件全被拒)。"""
    limits.upload_max_bytes = 1024
    payload = PNG + b"\x00" * (1024 - len(PNG))
    stored = storage.store_stream(io.BytesIO(payload), owner_sub="userA", db=db)
    assert stored.size == 1024


def test_file_one_byte_over_max_is_rejected(db, limits):
    limits.upload_max_bytes = 1024
    payload = PNG + b"\x00" * (1025 - len(PNG))
    with pytest.raises(storage.UploadError) as e:
        storage.store_stream(io.BytesIO(payload), owner_sub="userA", db=db)
    assert e.value.status == 413


def test_oversize_is_aborted_midstream_not_after_full_read(db, limits):
    """限长必须**边读边判**:不能先读完再看大小(那样 100MB 请求已经进内存了)。

    观察点是"读了多少":上限 1KB 时,读取量应在上限附近,而不是把 4MB 全吃进来。
    """
    limits.upload_max_bytes = 1024
    payload = PNG + b"\x00" * (4 * 1024 * 1024)
    src = io.BytesIO(payload)
    with pytest.raises(storage.UploadError):
        storage.store_stream(src, owner_sub="userA", db=db)
    assert src.tell() <= storage.CHUNK + limits.upload_max_bytes, "把整个请求读完了才判大小"


def test_quota_exceeded_raises_413(db, limits):
    limits.upload_quota_bytes = 200
    _put(db, "userA", _uniq(b"x" * 100))                    # 148B
    with pytest.raises(storage.UploadError) as e:
        storage.store_stream(io.BytesIO(_uniq(b"y" * 100)), owner_sub="userA", db=db)
    assert e.value.status == 413
    assert "配额" in e.value.detail


def test_quota_is_per_user_not_global(db, limits):
    """A 占满不影响 B(配额是 `SUM(bytes) WHERE owner_sub=?`,不是全站总量)。"""
    limits.upload_quota_bytes = 200
    _put(db, "userA", _uniq(b"x" * 100))
    ok = storage.store_stream(io.BytesIO(_uniq(b"z" * 100)), owner_sub="userB", db=db)
    assert ok.size == 148


def test_quota_exactly_filled_is_accepted(db, limits):
    """边界:刚好填满配额允许(检查是 `already + size > quota`,不是 `>=`)。"""
    second = _uniq(b"q")
    limits.upload_quota_bytes = len(PNG) + len(second)
    _put(db, "userA", PNG)
    stored = storage.store_stream(io.BytesIO(second), owner_sub="userA", db=db)
    assert stored.size == len(second)
    assert storage.used_bytes(db, "userA") == 0 + len(PNG)      # 记录尚未建,只算已入库的
    _put(db, "userA", second)
    assert storage.used_bytes(db, "userA") == limits.upload_quota_bytes


def test_quota_one_byte_over_is_rejected(db, limits):
    """边界另一侧:配额只差 1 字节也必须拒(拒的是整个请求,不是截断存半张图)。"""
    second = _uniq(b"q")
    limits.upload_quota_bytes = len(PNG) + len(second) - 1
    _put(db, "userA", PNG)
    with pytest.raises(storage.UploadError) as e:
        storage.store_stream(io.BytesIO(second), owner_sub="userA", db=db)
    assert e.value.status == 413


def test_quota_failure_leaves_no_partial_blob(db, limits):
    limits.upload_quota_bytes = 200
    _put(db, "userA", _uniq(b"x" * 100))
    before = {p.name for p in _blobs(limits)}
    with pytest.raises(storage.UploadError):
        storage.store_stream(io.BytesIO(_uniq(b"y" * 100)), owner_sub="userA", db=db)
    assert {p.name for p in _blobs(limits)} == before
    assert _tmp_left(limits) == []


def test_reader_exception_does_not_leak_temp_file(db, limits):
    """上传中途断流(客户端掉线):异常照常抛出,但临时文件必须被清掉。"""
    class Broken(io.RawIOBase):
        def __init__(self):
            self.calls = 0

        def read(self, _size=-1):
            self.calls += 1
            if self.calls == 1:
                return PNG
            raise OSError("connection reset")

    with pytest.raises(OSError):
        storage.store_stream(Broken(), owner_sub="userA", db=db)
    assert _tmp_left(limits) == []
    assert _blobs(limits) == []


# ---------------- 5. HEAD_BYTES 累积(回归:分块上传误拒合法图片) ----------------


@pytest.mark.parametrize("n", [1, 2, 3, 5, 7, 8, 11, 12, 15, 16, 17])
@pytest.mark.parametrize(("name", "data", "mime"), [
    ("png", PNG, "image/png"),          # 魔数 8 字节:n<8 时首块不足以判断
    ("webp", WEBP, "image/webp"),       # 需要看到偏移 8..12,最苛刻
    ("jpeg", JPEG, "image/jpeg"),
    ("gif", GIF89, "image/gif"),
])
def test_chunked_upload_still_sniffs_correctly(db, n, name, data, mime):
    """回归:每次只吐 n 字节时仍能识别。

    原实现只取**第一个** chunk 的前 16 字节,首块不足 8 字节的慢速/分块上传会把
    合法 PNG 误拒成 415(webp 更苛刻,要 12 字节)。现在是累积到 HEAD_BYTES 再判。
    """
    stored = storage.store_stream(Drip(data, n), owner_sub=f"u-{name}-{n}", db=db)
    assert stored.mime == mime
    assert stored.size == len(data)
    assert stored.sha256 == hashlib.sha256(data).hexdigest(), "分块下 sha 也必须与整体一致"


@pytest.mark.parametrize("n", [1, 3, 7])
def test_chunked_non_image_still_rejected(db, n):
    """反向:分块不能变成绕过 —— 一次吐 1 字节的 PDF 照样 415。"""
    with pytest.raises(storage.UploadError) as e:
        storage.store_stream(Drip(PDF, n), owner_sub="userA", db=db)
    assert e.value.status == 415


def test_head_accumulation_stops_at_head_bytes(db, limits):
    """累积只取前 HEAD_BYTES 字节 —— 别把整个文件攒进内存(5MB 图会直接 OOM 风险)。

    间接观察:大文件也能正常写入且内容完整(head 只影响判类型,不影响落盘)。
    """
    payload = PNG + b"\x5a" * (300 * 1024)
    stored = storage.store_stream(Drip(payload, 1024), owner_sub="userA", db=db)
    assert stored.mime == "image/png"
    assert stored.path.read_bytes() == payload


def test_single_byte_file_is_not_an_image(db):
    """极短文件:1 字节不可能匹配任何魔数 → 415(不是 500,也不是放行)。"""
    with pytest.raises(storage.UploadError) as e:
        storage.store_stream(io.BytesIO(b"\x89"), owner_sub="userA", db=db)
    assert e.value.status == 415


# ---------------- 6. 已知缺口:钉住,不默默放过 ----------------


@pytest.mark.xfail(strict=True, reason="已知未处理:配额检查是 read-then-write,无锁/无约束,"
                                       "并发窗口内两个请求都读到旧 used_bytes(上界 5MB×并发);"
                                       "与 upload 端点 async def 阻塞事件循环耦合,须一起改")
def test_quota_race_two_concurrent_uploads_cannot_exceed(tmp_path, limits, monkeypatch):
    """配额并发窗口(**当前会超配额,故 xfail(strict)**)。

    机制:`store_stream` 先 `SELECT SUM(bytes)` 再写盘,建库记录在调用方;两个请求
    同时通过检查时,谁都不知道对方也在写。这里用 Barrier **强制**两条线程都读完旧值
    再各自继续 —— 只是把天然存在的交错固定下来,被测代码本身没有被改。

    **与 async 的耦合**(为什么现在还没修):`upload_attachment` 是 `async def` 却做
    同步阻塞 IO,当前实际是串行化在事件循环里跑的 —— 这恰好掩盖了这个 race,同时也
    意味着一个 5MB 上传会卡住整个进程。把端点改成 `def`(丢线程池,该改)会立刻打开
    这个窗口,所以两件事必须一起动:改 `def` + 给配额检查加锁/约束。

    修的方向(任选):按 owner_sub 加行锁(PG:`SELECT … FOR UPDATE`)/ 先插占位记录
    再写盘 / DB 侧触发器。修好后本用例会 XPASS,strict 会变红提醒把 xfail 摘掉。
    """
    engine = create_engine(f"sqlite:///{tmp_path/'race.sqlite'}", future=True)
    Base.metadata.create_all(engine)
    Session = sessionmaker(bind=engine, autoflush=False, expire_on_commit=False, future=True)

    limits.upload_quota_bytes = 200          # 每个文件 148B:一个能放下,两个必超
    barrier = threading.Barrier(2, timeout=10)
    real_used = storage.used_bytes

    def gated(db, owner_sub):
        n = real_used(db, owner_sub)
        barrier.wait()                       # 两边都读到旧值(=0)后再放行
        return n

    monkeypatch.setattr(storage, "used_bytes", gated)
    errors: list[Exception] = []

    def upload(tag: bytes):
        try:
            with Session() as s:
                _put(s, "userA", _uniq(tag * 100))
        except Exception as exc:  # noqa: BLE001 - 线程里任何失败(413/锁冲突)都要留证据,
            errors.append(exc)    # 不能静默;真正的判据是下面那条总量断言

    threads = [threading.Thread(target=upload, args=(t,)) for t in (b"x", b"y")]
    for t in threads:
        t.start()
    for t in threads:
        t.join(timeout=15)

    with Session() as s:
        total = s.scalar(select(func.coalesce(func.sum(Attachment.bytes), 0))
                         .where(Attachment.owner_sub == "userA"))
    assert total <= limits.upload_quota_bytes, f"并发写入 {total}B,超出配额 {limits.upload_quota_bytes}B"


@pytest.mark.xfail(strict=True, reason="已知未处理:写盘成功但建库记录失败时 blob 留在磁盘,"
                                       "不计配额也无 GC(孤儿文件)")
def test_orphan_blob_is_cleaned_when_db_record_fails(db, limits):
    """孤儿文件(**当前会残留,故 xfail(strict)**)。

    `store_stream` 只负责写盘,记录由调用方在之后 `db.add()+commit()`。二者不是一个
    事务:提交失败(唯一索引冲突、连接断、进程被 kill)时 blob 已经在盘上,却没有任何
    记录指向它 —— 既不计入 `SUM(bytes)` 配额,也没有 GC 会回收,盘只会单调涨。

    修的方向:先插记录后写盘(失败则删记录)/ 落一张 pending 表由定时任务清 /
    对 attachments_dir 做基于 sha 的孤儿扫描 GC。
    """
    stored = storage.store_stream(io.BytesIO(PNG), owner_sub="userA", db=db)
    assert stored.path.is_file()

    # 模拟建记录失败(等价于 commit 抛异常后 rollback)
    att = Attachment(owner_sub="userA", kind="image", mime=stored.mime, bytes=stored.size,
                     sha256=stored.sha256, filename="x.png")
    db.add(att)
    db.rollback()

    assert storage.used_bytes(db, "userA") == 0          # 没有记录 → 不计配额
    assert not stored.path.exists(), "无库记录的 blob 留在磁盘上:孤儿文件,永不回收"


def test_stored_deduped_is_disk_level_and_must_not_be_exposed(db):
    """`StoredFile.deduped` 是**磁盘级**语义(blob 已存在),不是"本人已有"。

    blob 路径全局共享(`attachments/<sha[:2]>/<sha>`),所以别人传过同一张图时它也为
    True。这个语义本身没问题(它回答的是"要不要再写一次盘"),但**不能直接外泄给用户**:
    那就成了跨用户存在性 oracle —— 新账号传一张自己没传过的图却收到 deduped=true
    ⇒ 站上有别人持有完全相同的文件。正是 storage.py 注释里声称要避免的"看是否秒传"探测。

    路由层的对策见 test_attachments_api.py::test_deduped_is_per_user_not_global:
    响应里的 `deduped` 由 `find_by_sha(owner_sub, sha)` 决定。这条用例把"两种语义确实
    不同"钉住 —— 谁哪天又把 `stored.deduped` 直接返回,那边会立刻变红。
    """
    a = storage.store_stream(io.BytesIO(PNG), owner_sub="userA", db=db)
    b = storage.store_stream(io.BytesIO(PNG), owner_sub="userB", db=db)
    assert a.deduped is False
    assert b.deduped is True, "磁盘级语义:blob 已在,不该再写一次盘"
    # 而"本人是否已有记录"是另一回事:B 名下什么都没有。
    assert storage.find_by_sha(db, "userB", b.sha256) is None


@pytest.mark.xfail(strict=True, reason="低危但真实:满配额时重传**已计过费**的旧文件被误 413,"
                                       "而该操作实际不占新空间(有 DELETE 端点后可自救,故低危)")
def test_reupload_of_existing_file_at_quota_is_not_rejected(db, limits):
    """满配额重传旧文件被误拒(**当前 413,故 xfail(strict)**)。

    去重路径不占新空间(blob 已存在、记录已存在、`SUM(bytes)` 不变),但配额检查在
    写盘前用 `already + size > quota` 一刀切,把"重传自己已有的图"也算成新增。
    用户表现:配额满了之后,连重发同一张图(比如刷新页面后重试)都失败。

    修的方向:命中 `find_by_sha` 时跳过配额检查 —— 需要先算出 sha 才知道是否命中,
    所以要么把配额判定挪到算完 sha 之后(改动小,但要接受"最多多写一份临时文件"),
    要么让客户端先带 sha 探一次。
    """
    _put(db, "userA", PNG)                       # 已计费 48B
    limits.upload_quota_bytes = len(PNG)         # 恰好满
    stored = storage.store_stream(io.BytesIO(PNG), owner_sub="userA", db=db)
    assert stored.deduped is True
    assert storage.used_bytes(db, "userA") == len(PNG)


# ---------------- 7. 守卫:测试绝不写仓库 data/ ----------------


def test_tests_never_touch_the_real_attachments_dir(db, limits, tmp_path):
    """所有落盘都发生在 tmp:真实 `settings.attachments_dir` 前后必须无变化。

    (这条挡的是"某天有人加了个用例忘了打 fixture",直接把用户数据目录写脏。)
    """
    real_dir = real_settings.attachments_dir
    before = sorted(p.name for p in real_dir.iterdir()) if real_dir.exists() else None

    _put(db, "userA", PNG)
    _put(db, "userB", _uniq(b"other"))

    after = sorted(p.name for p in real_dir.iterdir()) if real_dir.exists() else None
    assert after == before, f"测试写进了仓库的 {real_dir}"
    assert limits.attachments_dir.is_relative_to(tmp_path)
    assert _blobs(limits), "对照:blob 确实落在了 tmp 里(否则这条守卫是空转)"
