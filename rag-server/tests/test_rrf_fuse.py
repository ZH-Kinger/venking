"""rrf_fuse —— 核心纯函数(混合检索 & RAG-Fusion 共用算子)。

覆盖:①融合公式 weight/(k+rank+1) ②按 chunk_id 去重累加 ③按融合分降序
     ④weights 生效 ⑤metadata 写回 rrf_score(round 6)⑥id 回退/自定义 id_key。
纯逻辑,零网络。
"""
from __future__ import annotations

import pytest
from langchain_core.documents import Document

from blog_rag.retriever import rrf_fuse


def _doc(cid: str | None = None, content: str = "x") -> Document:
    meta = {} if cid is None else {"chunk_id": cid}
    return Document(page_content=content, metadata=meta)


# ---------- ① 融合公式:score = Σ w/(k+rank+1),rank 从 0 起 ----------
def test_formula_single_list_default_k():
    # rrf_k 默认 60;单路排名 a>b>c
    docs = [_doc("a"), _doc("b"), _doc("c")]
    out = rrf_fuse([docs], k=60)
    assert [d.metadata["chunk_id"] for d in out] == ["a", "b", "c"]
    assert out[0].metadata["rrf_score"] == round(1 / (60 + 0 + 1), 6)
    assert out[1].metadata["rrf_score"] == round(1 / (60 + 1 + 1), 6)
    assert out[2].metadata["rrf_score"] == round(1 / (60 + 2 + 1), 6)


def test_k_parameter_changes_score():
    docs = [_doc("a")]
    out = rrf_fuse([docs], k=10)
    assert out[0].metadata["rrf_score"] == round(1 / (10 + 0 + 1), 6)


# ---------- ② 多路按 chunk_id 去重累加 ----------
def test_dedup_accumulate_across_lists():
    list1 = [_doc("a", "a1"), _doc("b", "b_from_list1")]
    list2 = [_doc("b", "b_from_list2"), _doc("c", "c1")]
    out = rrf_fuse([list1, list2], k=60)

    # 每个 id 只出现一次
    ids = [d.metadata["chunk_id"] for d in out]
    assert sorted(ids) == ["a", "b", "c"]
    assert len(ids) == 3

    by = {d.metadata["chunk_id"]: d for d in out}
    # b 累加两路:list1 rank1 + list2 rank0
    expected_b = round(1 / (60 + 1 + 1) + 1 / (60 + 0 + 1), 6)
    assert by["b"].metadata["rrf_score"] == expected_b
    # by_id.setdefault → 保留首次出现的 Document(list1 的 b)
    assert by["b"].page_content == "b_from_list1"


# ---------- ③ 最终按融合分降序 ----------
def test_sorted_descending():
    list1 = [_doc("a", "a1"), _doc("b", "b1")]
    list2 = [_doc("b", "b2"), _doc("c", "c1")]
    out = rrf_fuse([list1, list2], k=60)
    scores = [d.metadata["rrf_score"] for d in out]
    assert scores == sorted(scores, reverse=True)
    # b 累加两路必最高;a(1/61) > c(1/62)
    assert [d.metadata["chunk_id"] for d in out] == ["b", "a", "c"]


# ---------- ④ weights 生效 ----------
def test_weights_applied():
    l1 = [_doc("x")]
    l2 = [_doc("y")]
    out = rrf_fuse([l1, l2], k=60, weights=[2.0, 1.0])
    by = {d.metadata["chunk_id"]: d for d in out}
    assert by["x"].metadata["rrf_score"] == round(2.0 / 61, 6)
    assert by["y"].metadata["rrf_score"] == round(1.0 / 61, 6)
    # 权重让 x 排前
    assert out[0].metadata["chunk_id"] == "x"


def test_weights_can_flip_ranking():
    # 同 rank(都在各自列表 rank0),仅靠权重决定顺序
    l1 = [_doc("low")]
    l2 = [_doc("high")]
    out = rrf_fuse([l1, l2], k=60, weights=[1.0, 5.0])
    assert out[0].metadata["chunk_id"] == "high"


# ---------- ⑤ metadata 写回 rrf_score(round 6)----------
def test_rrf_score_written_and_rounded():
    out = rrf_fuse([[_doc("a")]], k=7)
    val = out[0].metadata["rrf_score"]
    assert "rrf_score" in out[0].metadata
    # round 到 6 位小数
    assert val == round(val, 6)
    assert val == round(1 / 8, 6)


# ---------- ⑥ id 回退 / 自定义 id_key ----------
def test_fallback_id_uses_page_content_when_no_chunk_id():
    # 无 chunk_id → 用 page_content[:80] 作 id,内容相同即去重累加
    d1 = _doc(None, "same content")
    d2 = _doc(None, "same content")
    out = rrf_fuse([[d1], [d2]], k=60)
    assert len(out) == 1
    assert out[0].metadata["rrf_score"] == round(2 / 61, 6)


def test_custom_id_key():
    d1 = Document(page_content="p", metadata={"my_id": "k1"})
    d2 = Document(page_content="q", metadata={"my_id": "k1"})
    out = rrf_fuse([[d1], [d2]], k=60, id_key="my_id")
    assert len(out) == 1
    assert out[0].metadata["rrf_score"] == round(2 / 61, 6)


# ---------- 边界 ----------
def test_empty_input():
    assert rrf_fuse([]) == []


def test_empty_lists():
    assert rrf_fuse([[], []]) == []


def test_default_weights_all_one():
    # 不传 weights → 全 1.0
    out = rrf_fuse([[_doc("a")], [_doc("b")]], k=60)
    by = {d.metadata["chunk_id"]: d for d in out}
    assert by["a"].metadata["rrf_score"] == round(1 / 61, 6)
    assert by["b"].metadata["rrf_score"] == round(1 / 61, 6)


# ---------- 审计修复:返回副本、不就地改传入 Document ----------
def test_fuse_does_not_mutate_input_metadata():
    # 融合后原始 doc.metadata 不含 rrf_score(未被就地改)
    d = _doc("a", "content")
    rrf_fuse([[d]], k=60)
    assert "rrf_score" not in d.metadata
    assert d.metadata == {"chunk_id": "a"}


def test_fuse_returns_new_objects_not_input():
    d = _doc("a")
    out = rrf_fuse([[d]], k=60)
    assert out[0] is not d                     # 返回的是副本,非原对象
    assert "rrf_score" in out[0].metadata      # 副本上有分
    assert "rrf_score" not in d.metadata       # 原对象干净


def test_fuse_no_mutation_across_multiple_lists():
    # 多路 + 去重:所有传入的原始对象都不应被写 rrf_score(防 BM25 单例污染/竞态)
    d1, d2, d3 = _doc("a"), _doc("b"), _doc("a")  # d3 与 d1 同 id
    rrf_fuse([[d1, d2], [d3]], k=60)
    for d in (d1, d2, d3):
        assert "rrf_score" not in d.metadata


# ---------- 审计修复:weights 与 doc_lists 长度不等 → raise ValueError(不再静默 zip 截断)----------
def test_weights_length_mismatch_too_few_raises():
    with pytest.raises(ValueError, match="weights"):
        rrf_fuse([[_doc("a")], [_doc("b")]], weights=[1.0])


def test_weights_length_mismatch_too_many_raises():
    with pytest.raises(ValueError):
        rrf_fuse([[_doc("a")]], weights=[1.0, 2.0])


def test_weights_matching_length_ok():
    # 长度相等 → 不抛,正常融合(回归:确认异常只在不等时触发)
    out = rrf_fuse([[_doc("a")], [_doc("b")]], k=60, weights=[1.0, 1.0])
    assert len(out) == 2
