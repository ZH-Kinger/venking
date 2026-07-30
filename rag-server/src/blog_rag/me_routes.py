"""当前用户 API /api/me/*(需 Logto 登录)——个人 AI 对话历史与附件,跨设备可见。"""
from __future__ import annotations

import uuid
from typing import Annotated

from fastapi import APIRouter, Depends, File, HTTPException, Query, UploadFile
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session as DBSession

from blog_rag import history, storage
from blog_rag.config import settings
from blog_rag.db import get_db
from blog_rag.logto_auth import Identity, require_user
from blog_rag.models import Attachment

DbDep = Annotated[DBSession, Depends(get_db)]
UserDep = Annotated[Identity, Depends(require_user)]

router = APIRouter(prefix="/api/me", tags=["me"])


@router.get("")
def me(user: UserDep):
    """当前登录用户(来自 Logto token 的 sub + 部分 claims)。"""
    c = user.claims
    return {"sub": user.sub, "is_admin": user.is_admin,
            "username": c.get("username") or c.get("name"), "email": c.get("email")}


@router.get("/conversations")
def my_conversations(
    user: UserDep, db: DbDep,
    limit: Annotated[int, Query(ge=1, le=200)] = 50,
    offset: Annotated[int, Query(ge=0)] = 0,
):
    return {"items": history.list_conversations(db, user.sub, limit, offset)}


@router.get("/conversations/{conv_id}")
def my_conversation(user: UserDep, db: DbDep, conv_id: str):
    data = history.get_conversation(db, user.sub, conv_id)
    if data is None:
        raise HTTPException(status_code=404, detail="对话不存在")   # 按 sub 隔离,不泄露他人
    return data


# ---------- 附件 ----------
# 上传发生在提问**之前**:先 POST 拿 id,再带着 id 提问。这样 SSE 那条 GET 不用重构成
# POST(EventSource 只能 GET),也让同一张图能被多轮追问复用。


@router.get("/attachments/quota")
def my_quota(user: UserDep, db: DbDep):
    used = storage.used_bytes(db, user.sub)
    return {"used_bytes": used, "quota_bytes": settings.upload_quota_bytes,
            "max_file_bytes": settings.upload_max_bytes}


@router.post("/attachments", status_code=201)
async def upload_attachment(user: UserDep, db: DbDep, file: Annotated[UploadFile, File()]):
    """上传一个附件(当前只收图片)。返回 id,提问时用 `att=<id>` 引用。

    **匿名不可达** —— 依赖是 require_user 而非 optional_user:匿名不落库,
    存了就无主、既算不了配额也回收不掉,等于开一个匿名图床。
    """
    try:
        # 传 file.file(同步文件对象)而不是先 await read():后者会把整个请求读进内存,
        # 5MB 上限就形同虚设 —— 这台机总共 1.8G。
        stored = storage.store_stream(file.file, owner_sub=user.sub, db=db)
    except storage.UploadError as e:
        raise HTTPException(status_code=e.status, detail=e.detail) from e

    # 同一用户重复上传同一内容 → 复用既有记录,不重复占配额(唯一索引也不允许重复插)
    att = storage.find_by_sha(db, user.sub, stored.sha256)
    if att is None:
        att = Attachment(
            owner_sub=user.sub, kind="image", mime=stored.mime, bytes=stored.size,
            sha256=stored.sha256, filename=(file.filename or None),
        )
        db.add(att)
        db.commit()
        db.refresh(att)
    return {"id": str(att.id), "mime": att.mime, "bytes": att.bytes,
            "filename": att.filename, "deduped": stored.deduped}


@router.get("/attachments/{att_id}")
def get_attachment(user: UserDep, db: DbDep, att_id: str):
    """取回附件原文件。

    **必须经过这里而不是公开静态目录** —— 静态目录意味着拿到 URL 就能看,
    而附件是私人对话的一部分。这里按 owner_sub 校验;非本人一律 404
    (不是 403 —— 403 会泄露"这个 id 确实存在")。
    """
    # 先判 uuid 再查库:把 None 交给 db.get() 会触发 SQLAlchemy 的"全 NULL 主键"警告,
    # 且官方说明未来版本可能直接报错 —— 别指望它一直宽容。
    aid = _as_uuid(att_id)
    att = db.get(Attachment, aid) if aid is not None else None
    if att is None or att.owner_sub != user.sub:
        raise HTTPException(status_code=404, detail="附件不存在")
    path = storage.blob_path_of(att)
    if not path.is_file():
        # 库里有记录但文件没了(手工清理/迁移事故)。报 410 而不是 404:
        # 让排查者一眼看出是"存过但丢了",而不是"从来没有过"。
        raise HTTPException(status_code=410, detail="附件文件已丢失")
    return FileResponse(
        path, media_type=att.mime,
        headers={
            # 私有内容:禁止任何共享缓存留存(nginx/CDN/代理)
            "Cache-Control": "private, max-age=86400",
            # 图片以附件名下载时用原始名;inline 让浏览器直接渲染
            "Content-Disposition": f'inline; filename="{_safe_name(att.filename)}"',
            # 兜底:即使 mime 被绕过,也不让浏览器把它当脚本执行
            "X-Content-Type-Options": "nosniff",
        },
    )


def _as_uuid(value: str) -> uuid.UUID | None:
    """把路径参数转 UUID;格式非法直接当"不存在"(不 500)。"""
    try:
        return uuid.UUID(value)
    except (ValueError, AttributeError):
        return None


def _safe_name(name: str | None) -> str:
    """文件名只用于 Content-Disposition 展示。

    去掉引号、反斜杠与控制字符 —— 它们能截断/注入响应头。
    文件名**从不参与路径拼接**(落盘走 sha256),所以这里只需防头部注入。
    """
    base = (name or "attachment")[:100]
    return "".join(ch for ch in base if ch.isprintable() and ch not in '"\\\r\n') or "attachment"
