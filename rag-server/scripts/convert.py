"""统一转换编排:扫 inbox → 按类型分派 handler → 文章/图片落地 → 幂等 → 自动入 RAG。

投放约定:  rag-server/data/inbox/<分类>/文件
  子目录名=博客分类 → 文章落 src/posts/<分类>/,图片落 src/.vuepress/public/assets/<分类>/

幂等:记录每个输入文件的 sha256,内容未变则跳过(重放不重复干活)。
一键到底(有变更时):转文章 → 入知识库(RAG)→ 重建前端(VuePress),三步全自动。

用法:
  ...python scripts/convert.py               # 转 + 入库 + 重建前端(全自动)
  ...python scripts/convert.py --force        # 无视 hash 全量重转
  ...python scripts/convert.py --no-ingest    # 跳过入库
  ...python scripts/convert.py --no-build     # 跳过前端重建
"""
from __future__ import annotations

import hashlib
import json
import subprocess
import sys
from datetime import date

from blog_rag.config import settings
from blog_rag.converters import DISPATCH, IMAGE_EXTS, handle_image

INBOX = settings.inbox_dir
POSTS = settings.posts_dir
ASSETS = settings.posts_dir.parent / ".vuepress" / "public" / "assets"
STATE = settings.convert_state_path

# 目录名 → 分类显示名(缺省用目录名本身)
CATEGORY_DISPLAY = {"AI_Infra": "AI基础设施"}


def sha(p) -> str:
    return hashlib.sha256(p.read_bytes()).hexdigest()


def build_frontend() -> None:
    """重建 VuePress 站点,让新文章在部署前端生效。"""
    blog_root = settings.posts_dir.parents[1]        # src/posts → src → <blog root>
    print("→ 重建前端(npm run docs:build)…", flush=True)
    r = subprocess.run("npm run docs:build", cwd=str(blog_root), shell=True)
    print("✅ 前端重建完成" if r.returncode == 0 else f"❌ 前端重建失败(exit {r.returncode})", flush=True)


def main() -> None:
    force = "--force" in sys.argv
    do_ingest = "--no-ingest" not in sys.argv
    do_build = "--no-build" not in sys.argv

    if not INBOX.exists():
        INBOX.mkdir(parents=True, exist_ok=True)
        print(f"已建投放目录:{INBOX}\n把源文件放进 <分类>/ 子目录(如 AI_Infra/xxx.lakebook)再跑本脚本。")
        return

    state = json.loads(STATE.read_text(encoding="utf-8")) if STATE.exists() else {}
    today = date.today().isoformat()
    files = [p for p in INBOX.rglob("*") if p.is_file()]
    changed, pending = 0, {}   # pending:本轮变更的 rel→hash,入库成功后才并入 state 落盘

    for f in sorted(files):
        rel = f.relative_to(INBOX).as_posix()
        parts = f.relative_to(INBOX).parts
        cat_dir = parts[0] if len(parts) > 1 else "Uncategorized"
        category = CATEGORY_DISPLAY.get(cat_dir, cat_dir)
        ext = f.suffix.lower()

        h = sha(f)
        if not force and state.get(rel) == h:
            continue

        if ext in IMAGE_EXTS:
            out = handle_image(f, ASSETS / cat_dir)
        elif ext in DISPATCH:
            out = DISPATCH[ext](f, POSTS / cat_dir, category, today)
        else:
            print(f"  ? 未知类型跳过:{rel}")
            continue

        pending[rel] = h
        changed += 1
        print(f"  ✓ {rel} [{ext}] → {len(out)} 篇/项 → {cat_dir}", flush=True)

    print(f"\n处理 {changed} 个有变更的输入(inbox 共 {len(files)} 个文件)")
    if not changed:
        print("(无变更:跳过入库与前端重建)")
        return

    # 一键到底:先入库,成功后才落 state(入库失败则不记录 → 下次重处理,不静默漏档)
    if do_ingest:
        print("→ 自动 ingest 入 RAG …", flush=True)
        from blog_rag.ingest import run_ingest
        run_ingest()   # 若抛异常,下面的 state 写入不会执行
    else:
        print("(--no-ingest:跳过入库)")

    state.update(pending)
    STATE.parent.mkdir(parents=True, exist_ok=True)
    STATE.write_text(json.dumps(state, ensure_ascii=False, indent=2), encoding="utf-8")

    if do_build:
        build_frontend()
    else:
        print("(--no-build:跳过前端重建)")


if __name__ == "__main__":
    main()
