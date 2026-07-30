"""当前用户 API /api/me/*(需 Logto 登录)——个人 AI 对话历史与附件,跨设备可见。"""
from __future__ import annotations

import uuid
from typing import Annotated
from urllib.parse import quote

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
    reused = att is not None
    if att is None:
        att = Attachment(
            owner_sub=user.sub, kind="image", mime=stored.mime, bytes=stored.size,
            # 按列宽截断。**SQLite 不校验 String(255) 的长度,PostgreSQL 会** ——
            # 本地和 CI 全绿,生产则 `value too long for character varying(255)` → 上传 500。
            # 这类"只在生产炸"的差异必须在写入侧堵死,不能指望被测出来。
            sha256=stored.sha256, filename=((file.filename or "")[:255] or None),
        )
        db.add(att)
        db.commit()
        db.refresh(att)
    # deduped 必须由**本人是否已有记录**决定,不能用 stored.deduped ——
    # 后者是"blob 文件已存在",而 blob 路径是全局的(attachments/<sha[:2]>/<sha>),
    # 别人传过同一张图也会命中。那样这个字段就成了跨用户存在性 oracle:
    # 新账号传一张自己从没传过的图却收到 deduped=true ⇒ 站上有别人持有完全相同的文件。
    # 这正是设计注释里声称要避免的"上传某文件看是否秒传"探测。
    #
    # ⚠️ 这个字段还是**安全相关**的:前端缩略图的 ✕ 只对 `deduped === false` 发 DELETE
    # (见 static/index.html 的 attachBar 点击处理),因为 true 意味着返回的是本人此前
    # 那条**可能已被历史消息引用**的旧记录。两个方向的破坏不对称:
    #   · 错报 true  → 前端不删 → 只是配额泄漏(fail-safe);
    #   · 错报 false → 删掉被引用的行 → 历史消息的图当场 404,**数据丢失**(fail-dangerous)。
    # 任何让 find_by_sha 漏命中的改动(改唯一约束、改查询范围、加软删过滤)都会翻到危险那侧。
    return {"id": str(att.id), "mime": att.mime, "bytes": att.bytes,
            "filename": att.filename, "deduped": reused}


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
            # 私有内容:no-store 而不是 private+max-age —— 后者没有 Vary,同一浏览器换账号后
            # 若知道对方 id 有可能命中本地缓存拿到上一账号的图。前端本来就按 id 缓存 blob,
            # 不走 HTTP 缓存也没有性能损失。
            "Cache-Control": "no-store",
            **_disposition(att.filename),
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


@router.delete("/attachments/{att_id}", status_code=204)
def delete_attachment(user: UserDep, db: DbDep, att_id: str):
    """删除自己的附件,释放配额。

    没有这个端点的话配额只增不减 —— 而超限时的提示恰恰是"请先删除一些旧附件",
    等于指了一个做不到的动作;用户把 100MB 用完就永久发不了图,零恢复路径。

    删 blob 前必须按 sha256 做**跨全表**引用计数(实现见
    `storage.delete_blob_if_unreferenced` —— blob 的布局只有 storage 知道,
    路由层不该自己拼 sha 的 SQL 再去猜文件在哪)。

    ⚠️ **本端点不检查 `messages.parts` 里的引用** —— 删一个已被历史消息引用的附件是
    允许的,那条消息的图之后会 404 → 前端显示"图片已不可用"。防误删完全靠前端:
    缩略图的 ✕ 只对 `deduped === false`(= 刚新建的行)发 DELETE。所以那个字段
    是**安全相关**的,不只是信息性的,别顺手改它的语义(见 upload_attachment)。
    要硬保证得在这里查引用或改软删。
    """
    aid = _as_uuid(att_id)
    att = db.get(Attachment, aid) if aid is not None else None
    if att is None or att.owner_sub != user.sub:
        raise HTTPException(status_code=404, detail="附件不存在")
    sha = att.sha256
    # 先校验 sha 合法(会在非法时抛),**再**删记录:守卫放在 commit 之后的话,
    # 坏 sha 的后果就从"500 但数据完好"变成"记录已删、blob 成孤儿"——
    # 而这道守卫存在的理由恰恰是防未来的导入/迁移脚本,那正是可能有坏 sha 的场景。
    storage.blob_path_of(att)
    # 先删记录并提交,再数引用 —— 顺序反了会把自己算进去,于是永远不回收磁盘。
    db.delete(att)
    db.commit()
    storage.delete_blob_if_unreferenced(db, sha)


def _disposition(name: str | None) -> dict[str, str]:
    """构造 Content-Disposition。

    ⚠️ **响应头只能是 latin-1**(starlette 用 `v.encode("latin-1")`),而中文文件名
    在中文站是**默认情况**不是边缘情况(「屏幕截图 2026-07-30.png」)。直接把原名塞进去
    会让取回端点每次都 500,而且名字存在库里 → 那张图**永久**不可见;
    前端拿到非 200 会静默移除占位,用户只看到图凭空消失、控制台无错。
    所以按 RFC 5987 双写:`filename=` 给 ASCII 兜底(老客户端),`filename*=` 给真名。
    """
    raw = (name or "attachment")[:100]
    # 剥掉能截断/注入响应头的字符;isprintable() 已排除 CR/LF/U+2028 等
    cleaned = "".join(ch for ch in raw if ch.isprintable() and ch not in '"\\\r\n') or "attachment"
    # ASCII 兜底:非 latin-1 字符换成下划线,保证一定能编码
    ascii_name = cleaned.encode("ascii", "replace").decode("ascii").replace("?", "_")
    value = f'inline; filename="{ascii_name}"'
    if ascii_name != cleaned:
        value += f"; filename*=UTF-8''{quote(cleaned, safe='')}"
    return {"Content-Disposition": value}


def _safe_name(name: str | None) -> str:
    """仅保留给测试/日志用的清洗函数;响应头请用 _disposition()。"""
    base = (name or "attachment")[:100]
    return "".join(ch for ch in base if ch.isprintable() and ch not in '"\\\r\n') or "attachment"
