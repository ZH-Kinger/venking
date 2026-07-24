"""converters.slugify —— 非法字符去除 / 空白转 - / 截断 80 / 空→untitled / NFKC。纯逻辑。"""
from __future__ import annotations

from blog_rag.converters import slugify


def test_removes_illegal_chars():
    # 非法字符集: \ / : * ? " < > | #
    assert slugify('a/b:c*d?e"f<g>h|i#j') == "abcdefghij"


def test_removes_backslash():
    assert slugify("a\\b") == "ab"


def test_whitespace_to_dash():
    assert slugify("hello world") == "hello-world"


def test_multiple_whitespace_collapsed():
    assert slugify("a   b\t\nc") == "a-b-c"


def test_leading_trailing_whitespace_stripped():
    assert slugify("  hello  ") == "hello"


def test_truncate_80():
    assert len(slugify("a" * 100)) == 80


def test_empty_string_to_untitled():
    assert slugify("") == "untitled"


def test_whitespace_only_to_untitled():
    assert slugify("   \t\n") == "untitled"


def test_only_illegal_chars_to_untitled():
    assert slugify('///###') == "untitled"


def test_nfkc_normalization_fullwidth():
    # 全角字母 → 半角(NFKC)
    assert slugify("ＡＢＣ") == "ABC"


def test_hash_removed_with_surrounding_space():
    # "C# Programming" → 去 # → "C Programming" → "C-Programming"
    assert slugify("C# Programming") == "C-Programming"


def test_normal_chinese_title_kept():
    assert slugify("分布式训练") == "分布式训练"
