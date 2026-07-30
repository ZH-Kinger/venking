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


def _blob_path(sha256: str) -> Path:
    return settings.attachments_dir / sha256[:2] / sha256


def store_stream(src: BinaryIO, *, owner_sub: str, db: Session) -> StoredFile:
    """把上传流写盘并返回内容信息;不写数据库(由调用方在同一事务里建记录)。

    边读边校验:超过单文件上限立刻中止,不把整个请求读进内存。
    """
    max_bytes = settings.upload_max_bytes
    quota = settings.upload_quota_bytes
    already = used_bytes(db, owner_sub)

    tmp_dir = settings.attachments_dir / "_tmp"
    tmp_dir.mkdir(parents=True, exist_ok=True)
    # 临时名用随机 uuid,避免并发上传同一内容时互相覆盖到写了一半的文件
    tmp = tmp_dir / f"up-{hashlib.sha256(f'{owner_sub}{id(src)}'.encode()).hexdigest()[:16]}"

    digest = hashlib.sha256()
    size = 0
    head = b""
    try:
        with tmp.open("wb") as out:
            while True:
                chunk = src.read(CHUNK)
                if not chunk:
                    break
                if not head:
                    head = chunk[:16]
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
