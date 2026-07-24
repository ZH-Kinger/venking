"""tokenize —— jieba 切词 + 滤空白 token + 专有名词保留为整词。纯逻辑,零网络。"""
from __future__ import annotations

from blog_rag.retriever import tokenize


def test_returns_list_of_str():
    out = tokenize("你好世界")
    assert isinstance(out, list)
    assert all(isinstance(t, str) for t in out)
    assert len(out) > 0


def test_no_whitespace_only_tokens():
    out = tokenize("请问  NCCL\t是\n什么")
    assert out, "不应为空"
    # 没有任何纯空白 token
    assert all(t.strip() for t in out)
    assert " " not in out
    assert "\t" not in out
    assert "\n" not in out


def test_proper_noun_nccl_kept_whole():
    # 专有名词/缩写整词保留,不被拆成字符
    out = tokenize("请问 NCCL 是什么")
    assert "NCCL" in out


def test_proper_noun_bf16_kept_whole():
    out = tokenize("训练用 BF16 精度")
    assert "BF16" in out


def test_empty_string():
    assert tokenize("") == []


def test_whitespace_only_string():
    assert tokenize("   \t\n  ") == []


def test_chinese_segmented():
    # 分词后中文被切开(而非整句一个 token)—— BM25 中文命门
    out = tokenize("分布式训练框架")
    assert len(out) >= 2
