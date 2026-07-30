"""用户上传附件的存储层:内容寻址落盘 + 配额 + 类型校验。

设计要点(每条都有对应的失败场景):

- **内容寻址**:落盘路径由内容 sha256 决定(`attachments/ab/abcdef…`),不用原始文件名。
  原始名只存进库供展示 —— 用户能控制文件名,拿它拼路径就是路径穿越漏洞(`../../etc/…`)。
  两级子目录(sha 前 2 位)避免单目录堆几万文件。

- **按嗅探到的真实类型判断,不信 Content-Type 也不信扩展名**:两者都由客户端提供,
  可以伪造。用魔数(magic bytes)识别,只放行图片。

- **配额在写盘前算**:`SUM(bytes) WHERE owner_sub=?` 一条 SQL —— 这正是把字节记进
  attachments 表(而不是塞进消息的 JSON)换来的好处。

- **去重只在用户内部**:`(owner_sub, sha256)` 唯一。不跨用户去重,否则
  ①删自己的图会影响别人 ②能通过"上传某文件看是否秒传"探测他人是否持有该文件。

- **流式读取 + 边读边限长**:不能先 `await file.read()` 再看大小 —— 那样 100MB 的请求
  已经进内存了,限制形同虚设(这台机总共 1.8G)。
"""
from __future__ import annotations

import hashlib
import re
import uuid
from dataclasses import dataclass
from pathlib import Path
from typing import BinaryIO

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from blog_rag.config import settings
from blog_rag.models import Attachment

# 魔数 → mime。只放行图片;这里认的是**内容**,不是用户给的 Content-Type/扩展名。
# webp 需要同时看 RIFF 头与 WEBP 标记(偏移 8),故单独判。
_MAGIC: list[tuple[bytes, str]] = [
    (b"\xff\xd8\xff", "image/jpeg"),
    (b"\x89PNG\r\n\x1a\n", "image/png"),
    (b"GIF87a", "image/gif"),
    (b"GIF89a", "image/gif"),
]

CHUNK = 64 * 1024
# 判类型需要的最少字节:webp 要看到偏移 8..12 的 "WEBP" 标记,所以 12 起;取 16 留余量。
HEAD_BYTES = 16
_SHA_RE = re.compile(r"[0-9a-f]{64}")


class UploadError(Exception):
    """带 HTTP 状态码的上传失败,由路由层转成响应。"""

    def __init__(self, status: int, detail: str) -> None:
        super().__init__(detail)
        self.status = status
        self.detail = detail


@dataclass
class StoredFile:
    sha256: str
    size: int
    mime: str
    path: Path
    deduped: bool          # True = 该用户此前已上传过同一内容,未额外占盘


def sniff_mime(head: bytes) -> str | None:
    """按魔数识别图片类型;不认识返回 None(调用方据此拒绝)。"""
    for magic, mime in _MAGIC:
        if head.startswith(magic):
            return mime
    if head[:4] == b"RIFF" and head[8:12] == b"WEBP":
        return "image/webp"
    return None


def used_bytes(db: Session, owner_sub: str) -> int:
    """该用户已占用的字节数(配额分母)。"""
    return db.scalar(
        select(func.coalesce(func.sum(Attachment.bytes), 0)).where(Attachment.owner_sub == owner_sub)
    ) or 0


def total_bytes(db: Session) -> int:
    """全站已占用字节数。per-user 配额挡不住用户数增长,所以还需要一道全局水位。

    注意这是 **DB 里 bytes 之和,不等于磁盘占用**:
    - 跨用户共享同一 blob 时它会**高于**真实占用(偏保守,方向安全);
    - 写盘成功但建库失败留下的孤儿 blob 不计入,这部分会让它**低于**真实占用
      (已知缺口,见 tests 里的 xfail;真要当磁盘用量读请用 shutil.disk_usage)。
    """
    return db.scalar(select(func.coalesce(func.sum(Attachment.bytes), 0))) or 0


def _blob_path(sha256: str) -> Path:
    # 断言而非信任:今天只有 digest.hexdigest() 能喂到这里,但任何新写入路径
    # (导入、迁移、修复脚本)若传进带 ../ 的串就是任意文件写。一行成本挡死这类未来事故。
    if not _SHA_RE.fullmatch(sha256):
        raise ValueError(f"非法 sha256:{sha256!r}")
    return settings.attachments_dir / sha256[:2] / sha256


def store_stream(src: BinaryIO, *, owner_sub: str, db: Session) -> StoredFile:
    """把上传流写盘并返回内容信息;不写数据库(由调用方在同一事务里建记录)。

    边读边校验:超过单文件上限立刻中止,不把整个请求读进内存。
    """
    max_bytes = settings.upload_max_bytes
    quota = settings.upload_quota_bytes
    already = used_bytes(db, owner_sub)
    # 全站水位:磁盘满会连带打死业务库与 checkpoints,不只是"传不了图"。
    # 507 Insufficient Storage 语义准确,且能和"你个人超配额"的 413 区分开 ——
    # 前者用户删自己的图也没用,得管理员处理。
    #
    # 这是**软**上界,别当硬保证读:
    # ① 判据是 `>=` 且不含本次体积,所以最后一次上传总能越线;
    # ② 检查在写盘之前,并发 N 个请求最多超出 N × upload_max_bytes;
    # ③ 水位命中后,连"纯 dedup、零新增磁盘"的重传也会被拒 —— 因为此刻还没算出 sha,
    #    store_stream 无从知道会不会命中去重。把配额/水位判定挪到算完 sha 之后能一并解决
    #    这条和"满配额重传旧文件误 413",但那会打开配额 TOCTOU 窗口,要连同
    #    `async def` → 线程池那件事一起改。
    if total_bytes(db) >= settings.upload_total_bytes:
        raise UploadError(507, "站点存储已满,暂时无法上传;请稍后再试或联系管理员")

    tmp_dir = settings.attachments_dir / "_tmp"
    tmp_dir.mkdir(parents=True, exist_ok=True)
    # 真·随机名。曾写成 sha256(owner_sub + id(src)) 并在注释里号称"随机 uuid" ——
    # 那依赖 CPython 的 id() 对活对象互异这一实现细节,注释与实现也对不上。
    tmp = tmp_dir / f"up-{uuid.uuid4().hex}"

    digest = hashlib.sha256()
    size = 0
    head = b""
    try:
        with tmp.open("wb") as out:
            while True:
                chunk = src.read(CHUNK)
                if not chunk:
                    break
                # **累积**到够长再判类型,不能只取第一个 chunk:分块/慢速上传时首个 chunk
                # 可能只有几字节,而 PNG 魔数就要 8 字节 —— 那样合法图片会被误拒 415。
                # 12 字节足够(webp 要看到偏移 8..12 的 "WEBP" 标记)。
                if len(head) < HEAD_BYTES:
                    head += chunk[: HEAD_BYTES - len(head)]
                size += len(chunk)
                if size > max_bytes:
                    raise UploadError(413, f"单个文件不能超过 {max_bytes // 1024 // 1024}MB")
                if already + size > quota:
                    raise UploadError(
                        413,
                        f"已用 {already // 1024 // 1024}MB,超出 {quota // 1024 // 1024}MB 配额;"
                        "请先删除一些旧附件",
                    )
                digest.update(chunk)
                out.write(chunk)

        if size == 0:
            raise UploadError(400, "空文件")
        mime = sniff_mime(head)
        if mime is None:
            raise UploadError(415, "只支持图片(jpeg/png/gif/webp);按文件内容判断,改扩展名无效")

        sha = digest.hexdigest()
        final = _blob_path(sha)
        final.parent.mkdir(parents=True, exist_ok=True)
        # 已存在同内容(可能来自本人此前上传)→ 直接丢弃临时文件复用旧 blob
        deduped = final.exists()
        if deduped:
            tmp.unlink(missing_ok=True)
        else:
            tmp.replace(final)          # 同分区 rename,原子
        return StoredFile(sha256=sha, size=size, mime=mime, path=final, deduped=deduped)
    finally:
        tmp.unlink(missing_ok=True)     # 异常路径清理;成功路径已 replace/unlink,missing_ok 兜住


def find_by_sha(db: Session, owner_sub: str, sha256: str) -> Attachment | None:
    """该用户是否已有同内容附件(去重命中则复用记录,不重复计配额)。"""
    return db.scalar(
        select(Attachment).where(Attachment.owner_sub == owner_sub, Attachment.sha256 == sha256)
    )


def blob_path_of(att: Attachment) -> Path:
    return _blob_path(att.sha256)


def delete_blob_if_unreferenced(db: Session, sha256: str) -> bool:
    """没有任何记录再引用这个内容时回收磁盘;返回是否真的删了文件。

    **必须跨全表数**,不能只看本人:blob 路径是全局的(`attachments/<sha[:2]>/<sha>`),
    别的用户可能持有同一内容的记录,直接 unlink 会把他们的图一起打掉(静默数据丢失)。
    调用方要先 delete + commit 掉自己那行,否则会把自己算进引用里、永远不回收。

    放在 storage 而不是路由层:blob 的布局(两级子目录、sha 命名)只有这里知道,
    路由层不该自己拼 `Attachment.sha256` 的 SQL 再去猜文件在哪。
    """
    others = db.scalar(
        select(func.count()).select_from(Attachment).where(Attachment.sha256 == sha256)
    )
    if others:
        return False
    _blob_path(sha256).unlink(missing_ok=True)
    return True
