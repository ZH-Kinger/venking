"""retriever._with_meta —— 审计修复的核心:返回副本、绝不就地改传入 Document。

BM25 单例在跨请求间共享同一批 Document 对象;若就地写 score 会造成并发污染/竞态。
本组用例证明 _with_meta 只在副本上写、原对象保持不变。纯逻辑,零网络。
"""
from __future__ import annotations

from langchain_core.documents import Document

from blog_rag.retriever import _with_meta


def test_with_meta_returns_copy_not_same_object():
    d = Document(page_content="x", metadata={"a": 1})
    nd = _with_meta(d, b=2)
    assert nd is not d


def test_with_meta_original_metadata_unchanged():
    d = Document(page_content="x", metadata={"a": 1})
    _with_meta(d, rerank_score=9)
    assert d.metadata == {"a": 1}                 # 原对象未被写入新键


def test_with_meta_copy_has_merged_metadata():
    d = Document(page_content="x", metadata={"a": 1})
    nd = _with_meta(d, b=2, c=3)
    assert nd.metadata == {"a": 1, "b": 2, "c": 3}


def test_with_meta_override_existing_key_on_copy_only():
    d = Document(page_content="x", metadata={"score": 1})
    nd = _with_meta(d, score=9)
    assert nd.metadata["score"] == 9             # 副本被覆盖
    assert d.metadata["score"] == 1              # 原对象保持


def test_with_meta_metadata_dict_is_not_shared():
    # 改副本的 metadata 不应回流到原对象(证明不是同一个 dict 引用)
    d = Document(page_content="x", metadata={"a": 1})
    nd = _with_meta(d, b=2)
    nd.metadata["a"] = 999
    assert d.metadata["a"] == 1


def test_with_meta_preserves_page_content():
    d = Document(page_content="hello world", metadata={})
    nd = _with_meta(d, k=1)
    assert nd.page_content == "hello world"


def test_with_meta_no_extra_returns_equivalent_copy():
    d = Document(page_content="p", metadata={"a": 1})
    nd = _with_meta(d)
    assert nd is not d
    assert nd.metadata == {"a": 1}
