"""语料加载器(M1)。把异构源统一成 LangChain `Document`。

现在实现博客 md;PDF 走"双轨"(版面解析器→Markdown + fitz 后勤),
其产出的 Markdown 会**复用**本文件的 `split_markdown_to_docs()`,一套切块两种源。

统一约定(见 docs/知识库存储规范.md):
- doc_id   = 源相对 posts_dir 的 posix 路径,如 "AI_LLM/RAG.md"(稳定、可读)
- chunk_id = f"{doc_id}::{i}"(确定性 → 幂等 upsert / 按 doc_id 精确删)
- metadata = source/source_type/category/title/section(面包屑)/doc_id/chunk_id/doc_hash
"""
from __future__ import annotations

import hashlib
from pathlib import Path

import frontmatter
from langchain_core.documents import Document
from langchain_text_splitters import (
    MarkdownHeaderTextSplitter,
    RecursiveCharacterTextSplitter,
)

from blog_rag.config import settings

# 按标题分块:H1/H2/H3 → 记录成面包屑元数据键 h1/h2/h3
_HEADERS = [("#", "h1"), ("##", "h2"), ("###", "h3")]


def _short_hash(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()[:16]


def _breadcrumb(header_meta: dict) -> str:
    """把 MarkdownHeaderTextSplitter 记的 h1/h2/h3 拼成 '一 > 二 > 三'。"""
    return " > ".join(header_meta[k] for k in ("h1", "h2", "h3") if header_meta.get(k))


def split_markdown_to_docs(md_text: str, base_meta: dict) -> list[Document]:
    """把一段 Markdown 切成带面包屑+确定性 chunk_id 的 Document 列表。

    **可复用**:博客 md 与(将来)MinerU 解析 PDF 得到的 Markdown 都走这里。
    两步切:①按标题切(保结构)②按大小再切(防超长)。base_meta 需含 doc_id。
    """
    doc_id = base_meta["doc_id"]
    doc_hash = _short_hash(md_text)

    header_splitter = MarkdownHeaderTextSplitter(_HEADERS, strip_headers=False)
    size_splitter = RecursiveCharacterTextSplitter(
        chunk_size=settings.chunk_size, chunk_overlap=settings.chunk_overlap
    )
    header_chunks = header_splitter.split_text(md_text)
    sized = size_splitter.split_documents(header_chunks)

    docs: list[Document] = []
    for i, ch in enumerate(sized):
        if not ch.page_content.strip():
            continue
        docs.append(
            Document(
                page_content=ch.page_content,
                metadata={
                    **base_meta,
                    "chunk_id": f"{doc_id}::{i}",
                    "section": _breadcrumb(ch.metadata),
                    "doc_hash": doc_hash,
                },
            )
        )
    return docs


def load_markdown(posts_dir: Path | None = None) -> list[Document]:
    """加载博客 posts 目录下所有 .md → Document 列表。"""
    posts_dir = posts_dir or settings.posts_dir
    docs: list[Document] = []

    for md_path in sorted(posts_dir.rglob("*.md")):
        post = frontmatter.load(md_path)
        body = post.content
        if not body.strip():
            continue

        doc_id = md_path.relative_to(posts_dir).as_posix()
        fm = post.metadata
        title = fm.get("title") or md_path.stem
        # category:frontmatter 优先(可能是 list),否则用顶层目录名
        cat = fm.get("category")
        if isinstance(cat, list):
            cat = cat[0] if cat else None
        category = cat or md_path.relative_to(posts_dir).parts[0]

        base_meta = {
            "doc_id": doc_id,
            "source": md_path.name,
            "source_type": "blog_md",
            "category": category,
            "title": title,
        }
        docs.extend(split_markdown_to_docs(body, base_meta))

    return docs


if __name__ == "__main__":
    docs = load_markdown()
    print(f"共加载 {len(docs)} 个 chunk")
    # 分类计数
    from collections import Counter

    by_cat = Counter(d.metadata["category"] for d in docs)
    print("按分类:", dict(by_cat))
    # 抽样看一条(带面包屑的)
    sample = next((d for d in docs if d.metadata["section"]), docs[0])
    print("\n--- 抽样 chunk ---")
    for k, v in sample.metadata.items():
        print(f"  {k}: {v}")
    print("  正文前140字:", sample.page_content[:140].replace("\n", " "))
