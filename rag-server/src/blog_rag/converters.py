"""异构源 → 博客文章 的类型处理器(按文件类型分派)。

每个 handler:输入一个源文件 + 目标分类,产出若干 `src/posts/<分类>/*.md`(带 frontmatter),
返回写出的 Path 列表。图片走单独 handler 拷进 public/assets。空内容一律过滤。

被 `scripts/convert.py` 编排调用;与 `loaders.py`(RAG 切块)分工:converters 管"源→博客文章",
文章落到 posts 后由 blog_md loader 自动纳入 RAG(一份来源、不重复)。
"""
from __future__ import annotations

import html
import json
import re
import tarfile
import unicodedata
from pathlib import Path

import yaml
from markdownify import markdownify as _html2md

ICON = "server"
IMAGE_EXTS = {".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".bmp"}

# lakebook 结构重写:透明化冗余壳(整本都压在这两层下)+ 目录最大深度(更深拍平)
STRIP_TITLES = {"学习计划", "阶段一"}
MAX_DIRS = 3


# ---------- 公共工具 ----------
def slugify(title: str) -> str:
    t = unicodedata.normalize("NFKC", title)
    t = re.sub(r'[\\/:*?"<>|#]', "", t)
    t = re.sub(r"\s+", "-", t.strip())
    return t[:80] or "untitled"


def _dedupe_name(path: Path, seen: set[Path]) -> Path:
    """同一轮内 slug 碰撞时追加 -2/-3…避免静默覆盖(基于本轮 seen,不看磁盘→不破坏幂等重写)。"""
    if path not in seen:
        seen.add(path)
        return path
    i = 2
    while (p := path.with_name(f"{path.stem}-{i}{path.suffix}")) in seen:
        i += 1
    seen.add(p)
    return p


def frontmatter(title: str, category: str, date: str, tags: list[str]) -> str:
    title = title.replace('"', "'")
    tag_lines = "".join(f"  - {t}\n" for t in tags)
    return (
        "---\n"
        f"title: {title}\n"
        f"icon: {ICON}\n"
        f"date: {date}\n"
        "category:\n"
        f"  - {category}\n"
        "tag:\n"
        f"{tag_lines}"
        "---\n\n"
    )


def html_to_markdown(html_str: str) -> str:
    md = _html2md(html_str, heading_style="ATX", bullets="-")
    return re.sub(r"\n{3,}", "\n\n", md).strip()


def _write(out_dir: Path, seq: int | None, title: str, body: str,
           category: str, date: str, tags: list[str]) -> Path | None:
    if not body.strip():            # 完全空 → 不生成
        return None
    out_dir.mkdir(parents=True, exist_ok=True)
    stem = slugify(title)
    name = f"{seq:03d}-{stem}.md" if seq is not None else f"{stem}.md"
    path = out_dir / name
    path.write_text(frontmatter(title, category, date, tags) + body + "\n", encoding="utf-8")
    return path


# ---------- .lakebook(语雀导出 = tar) ----------
def _nested_frontmatter(title: str, category: str, date: str,
                        order: int, is_dir: bool) -> str:
    title = title.replace('"', "'")
    fm = [
        "---",
        f"title: {title}",
        f"icon: {ICON}",
        f"date: {date}",
        f"order: {order}",              # 保持语雀原顺序(theme-hope 侧边栏据此排序)
        "category:",
        f"  - {category}",
        "tag:",
        "  - AI Infra",
    ]
    if is_dir:                          # 容器节点(目录)→ dir.order 定分区顺序
        fm += ["dir:", f"  order: {order}", "  collapsible: true"]
    fm += ["---", "", ""]
    return "\n".join(fm)


def handle_lakebook(src: Path, out_dir: Path, category: str, date: str) -> list[Path]:
    """按 tocYml 的父子层级还原为**嵌套目录**:容器节点→目录(内容进 README.md),叶子→.md。"""
    written: list[Path] = []
    with tarfile.open(src) as tar:
        meta_m = next((m for m in tar.getmembers() if m.name.endswith("$meta.json")), None)
        if meta_m is None:
            raise ValueError(f"{src.name} 不是有效的 lakebook:缺 $meta.json")
        prefix = meta_m.name.rsplit("/", 1)[0]
        meta = json.loads(tar.extractfile(meta_m).read().decode("utf-8"))
        toc = yaml.safe_load(json.loads(meta["meta"])["book"]["tocYml"])
        docs = [t for t in toc if t.get("type") == "DOC"]

        by_uuid = {d["uuid"]: d for d in docs}
        parents_with_children = {d.get("parent_uuid") for d in docs if d.get("parent_uuid")}

        def ancestor_dirs(d: dict) -> list[str]:
            """祖先标题→目录(剔除透明壳,截断到 MAX_DIRS;更深的自动拍平到上限层)。"""
            chain, p = [], d.get("parent_uuid")
            while p and p in by_uuid:
                t = by_uuid[p]["title"]
                if t not in STRIP_TITLES:
                    chain.append(slugify(t))
                p = by_uuid[p].get("parent_uuid")
            return list(reversed(chain))[:MAX_DIRS]

        seen: set[Path] = set()
        for order, d in enumerate(docs, 1):
            if d["title"] in STRIP_TITLES:              # 透明壳:自身不建目录/文件
                continue
            try:                                         # 单篇畸形不拖垮整本转换
                member = tar.getmember(f"{prefix}/{d['url']}.json")
                body = html_to_markdown(json.loads(tar.extractfile(member).read().decode("utf-8"))["doc"]["body"])
            except (KeyError, json.JSONDecodeError, UnicodeDecodeError) as e:
                print(f"  ⚠ 跳过畸形文档 {d.get('title', '?')}: {type(e).__name__}", flush=True)
                continue
            dirs = ancestor_dirs(d)
            # 有子节点且未触深度上限 → 容器目录;否则(叶子/超深容器)→ 文件
            is_dir = d["uuid"] in parents_with_children and len(dirs) < MAX_DIRS

            if is_dir:                                   # 容器 → 目录/README.md(空的也留,当分区索引)
                target = out_dir.joinpath(*dirs, slugify(d["title"]), "README.md")
            else:                                        # 叶子 → 文件;完全空则跳过
                if not body.strip():
                    continue
                target = _dedupe_name(out_dir.joinpath(*dirs, f"{slugify(d['title'])}.md"), seen)

            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_text(
                _nested_frontmatter(d["title"], category, date, order, is_dir) + body + "\n",
                encoding="utf-8",
            )
            written.append(target)
    return written


# ---------- .pdf(docling 版面解析,保留能力)----------
def handle_pdf(src: Path, out_dir: Path, category: str, date: str) -> list[Path]:
    from docling.document_converter import DocumentConverter  # 重依赖,用时才导

    md = DocumentConverter().convert(str(src)).document.export_to_markdown()
    md = unicodedata.normalize("NFKC", html.unescape(md))
    p = _write(out_dir, None, src.stem, md.strip(), category, date, [category])
    return [p] if p else []


# ---------- .md(直通,补 frontmatter)----------
def handle_markdown(src: Path, out_dir: Path, category: str, date: str) -> list[Path]:
    text = src.read_text(encoding="utf-8")
    if text.lstrip().startswith("---"):          # 已有 frontmatter → 原样搬
        out_dir.mkdir(parents=True, exist_ok=True)
        path = out_dir / f"{slugify(src.stem)}.md"
        path.write_text(text, encoding="utf-8")
        return [path]
    p = _write(out_dir, None, src.stem, text.strip(), category, date, [category])
    return [p] if p else []


# ---------- 图片(拷进 public/assets)----------
def handle_image(src: Path, assets_dir: Path) -> list[Path]:
    assets_dir.mkdir(parents=True, exist_ok=True)
    dst = assets_dir / src.name
    dst.write_bytes(src.read_bytes())
    return [dst]


# 扩展名 → handler 分派表(加新类型:加一个 handle_xxx + 在此登记一行)
DISPATCH = {
    ".lakebook": handle_lakebook,
    ".pdf": handle_pdf,
    ".md": handle_markdown,
    ".markdown": handle_markdown,
}
