"""M10:管理后台账号 CLI —— `blog-rag-admin`。

子命令:
  create-admin   交互创建管理员(email/username/密码;无默认密码)
  list-users     列出账号

延迟导入 DB/哈希(遵循仓库纪律:未装 [admin] 依赖时导入本模块不崩)。
"""
from __future__ import annotations

import argparse
import sys


def _create_admin(args: argparse.Namespace) -> int:
    import getpass

    from sqlalchemy import select

    from blog_rag import authn
    from blog_rag.db import get_engine, session_scope
    from blog_rag.models import Base, User

    Base.metadata.create_all(get_engine())        # 本地便利:表不存在则建(与 alembic 幂等共存)

    email = (args.email or input("Email: ")).strip()
    username = (args.username or input("Username: ")).strip()
    if not email or not username:
        print("✖ email 和 username 不能为空", file=sys.stderr)
        return 2
    pw1 = getpass.getpass("Password (≥8): ")
    if len(pw1) < 8:
        print("✖ 密码至少 8 位", file=sys.stderr)
        return 2
    if pw1 != getpass.getpass("Confirm password: "):
        print("✖ 两次输入不一致", file=sys.stderr)
        return 2

    with session_scope() as db:
        exists = db.scalar(select(User).where((User.email == email) | (User.username == username)))
        if exists:
            print(f"✖ 已存在同 email/username 的账号:{exists.username}", file=sys.stderr)
            return 1
        db.add(User(email=email, username=username, role="admin",
                    password_hash=authn.hash_password(pw1)))
        db.commit()
    print(f"✔ 管理员已创建:{username} <{email}>")
    return 0


def _list_users(_args: argparse.Namespace) -> int:
    from sqlalchemy import select

    from blog_rag.db import session_scope
    from blog_rag.models import User

    with session_scope() as db:
        users = db.scalars(select(User).order_by(User.created_at)).all()
        if not users:
            print("(无账号)")
            return 0
        for u in users:
            print(f"  {u.username:<20} {u.email:<32} {u.role:<8} {u.status}")
    return 0


def main() -> None:
    parser = argparse.ArgumentParser(prog="blog-rag-admin", description="管理后台账号管理")
    sub = parser.add_subparsers(dest="cmd", required=True)

    p_create = sub.add_parser("create-admin", help="交互创建管理员账号")
    p_create.add_argument("--email", default="")
    p_create.add_argument("--username", default="")
    p_create.set_defaults(func=_create_admin)

    p_list = sub.add_parser("list-users", help="列出账号")
    p_list.set_defaults(func=_list_users)

    args = parser.parse_args()
    sys.exit(args.func(args))


if __name__ == "__main__":
    main()
