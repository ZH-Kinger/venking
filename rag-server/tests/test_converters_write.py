"""converters._write —— 空正文过滤(not body.strip() → None,不生成文件)+ 命名规则。"""
from __future__ import annotations

from blog_rag.converters import _write


def test_empty_body_returns_none_no_file(tmp_path):
    out = tmp_path / "posts"
    assert _write(out, None, "标题", "", "cat", "2026-07-13", ["cat"]) is None
    assert _write(out, None, "标题", "   \n\t ", "cat", "2026-07-13", ["cat"]) is None
    # 完全没有文件被创建
    assert not out.exists() or not any(out.iterdir())


def test_nonempty_body_writes_file(tmp_path):
    out = tmp_path / "posts"
    p = _write(out, None, "分布式训练", "正文", "AI_Infra", "2026-07-13", ["AI_Infra"])
    assert p is not None
    assert p.name == "分布式训练.md"
    text = p.read_text(encoding="utf-8")
    assert text.startswith("---\n")
    assert "title: 分布式训练" in text
    assert "正文" in text
    assert text.endswith("\n")


def test_seq_prefix_naming(tmp_path):
    out = tmp_path / "posts"
    p = _write(out, 7, "第七篇", "body", "cat", "2026-07-13", ["cat"])
    assert p is not None
    assert p.name == "007-第七篇.md"


def test_title_slugified_in_filename(tmp_path):
    out = tmp_path / "posts"
    p = _write(out, None, 'a/b:c', "body", "cat", "2026-07-13", ["cat"])
    assert p is not None
    assert p.name == "abc.md"
