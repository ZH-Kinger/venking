"""语料入库(M1)。

流水线:`load_sources()`(读登记表)→ 按 type 分发 loader → `text-embedding-v4`
向量化 → Chroma,经 **LangChain Indexing API** 幂等去重/同步。

- 幂等:内容未变的 chunk 自动跳过(不重复 embedding);按 `doc_id` 分组,
  改一篇自动删旧写新;`cleanup="full"` 会 purge 掉源里已删除的文档。
- Embedding 用 DashScopeEmbeddings(百炼标准端点,自动分批,规避 batch≤10 的坑)。

运行:python -m blog_rag.ingest
"""
from __future__ import annotations

from langchain_chroma import Chroma
from langchain_classic.indexes import SQLRecordManager, index  # langchain 1.x 迁到 classic
from langchain_community.embeddings import DashScopeEmbeddings
from langchain_core.documents import Document

from blog_rag.config import settings
from blog_rag.loaders import load_markdown
from blog_rag.sources import load_sources

COLLECTION = "blog_rag"


def get_embeddings() -> DashScopeEmbeddings:
    """百炼 text-embedding-v4(OpenAIEmbeddings 指向百炼是备选,但要手动 chunk_size=10)。"""
    return DashScopeEmbeddings(
        model=settings.embedding_model,
        dashscope_api_key=settings.require_api_key(),
    )


def get_vectorstore(embeddings: DashScopeEmbeddings | None = None) -> Chroma:
    return Chroma(
        collection_name=COLLECTION,
        embedding_function=embeddings or get_embeddings(),
        persist_directory=str(settings.chroma_dir),
    )


def collect_documents() -> list[Document]:
    """按登记表把所有启用来源加载成统一 Document 列表。"""
    docs: list[Document] = []
    for src in load_sources():  # 仅启用的
        if not src.exists():
            print(f"  [缺失] {src.name}: {src.path}")
            continue
        if src.type == "blog_md":
            got = load_markdown(src.path)
        elif src.type == "pdf":
            print(f"  [跳过] {src.name}: PDF loader(docling)尚未实现,PDF 阶段再接")
            continue
        else:
            print(f"  [跳过] {src.name}: 未知 type={src.type}")
            continue
        print(f"  [{src.name}] {len(got)} chunk")
        docs.extend(got)
    return docs


def run_ingest() -> dict:
    settings.data_dir.mkdir(parents=True, exist_ok=True)

    print("① 加载语料(读 sources.toml)...")
    docs = collect_documents()
    print(f"   合计 {len(docs)} chunk")

    print(f"② 向量化 + 入库(embedding={settings.embedding_model} @ 百炼)...")
    vs = get_vectorstore()
    rm = SQLRecordManager(
        f"chroma/{COLLECTION}",
        db_url=f"sqlite:///{settings.record_manager_path.as_posix()}",
    )
    rm.create_schema()  # 幂等,首次建表

    result = index(
        docs,
        rm,
        vs,
        cleanup="full",           # 全量对账:新增/改/删(purge 源里已没有的)
        source_id_key="doc_id",   # 按源文档分组 → 改一篇能精确删其旧 chunk
    )
    print("③ 入库结果:", result)
    print(f"   collection={COLLECTION} 现有向量:", vs._collection.count())
    return result


if __name__ == "__main__":
    run_ingest()
