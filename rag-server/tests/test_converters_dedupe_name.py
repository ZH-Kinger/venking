"""converters._dedupe_name —— 同一 seen 集内 slug 碰撞 → 追加 -2/-3…,不看磁盘。

设计意图:避免同轮转换里不同标题 slug 相同时静默覆盖;基于本轮 seen(内存集),
不查磁盘 → 不破坏 Indexing API 的幂等重写。纯逻辑,零网络、零磁盘依赖。
"""
from __future__ import annotations

from pathlib import Path

from blog_rag.converters import _dedupe_name


def test_first_occurrence_returns_same_path():
    seen: set[Path] = set()
    p = Path("dir/sub/foo.md")
    assert _dedupe_name(p, seen) == p
    assert p in seen


def test_second_collision_appends_2():
    seen: set[Path] = set()
    p = Path("dir/foo.md")
    first = _dedupe_name(p, seen)
    second = _dedupe_name(p, seen)
    assert first == Path("dir/foo.md")
    assert second == Path("dir/foo-2.md")


def test_third_collision_appends_3():
    seen: set[Path] = set()
    p = Path("dir/foo.md")
    _dedupe_name(p, seen)
    _dedupe_name(p, seen)
    assert _dedupe_name(p, seen) == Path("dir/foo-3.md")


def test_preserves_parent_and_suffix():
    seen: set[Path] = set()
    p = Path("a/b/report.md")
    _dedupe_name(p, seen)
    out = _dedupe_name(p, seen)
    assert out.parent == Path("a/b")
    assert out.suffix == ".md"
    assert out.stem == "report-2"


def test_distinct_names_get_no_suffix():
    seen: set[Path] = set()
    a = _dedupe_name(Path("d/a.md"), seen)
    b = _dedupe_name(Path("d/b.md"), seen)
    assert a == Path("d/a.md")
    assert b == Path("d/b.md")


def test_skips_suffix_already_taken_in_seen():
    # seen 里已占 foo.md 与 foo-2.md → 下一个碰撞跳到 foo-3.md
    seen = {Path("d/foo.md"), Path("d/foo-2.md")}
    assert _dedupe_name(Path("d/foo.md"), seen) == Path("d/foo-3.md")


def test_independent_seen_sets_do_not_interfere():
    p = Path("d/foo.md")
    s1: set[Path] = set()
    s2: set[Path] = set()
    assert _dedupe_name(p, s1) == p          # s1 内首次
    assert _dedupe_name(p, s2) == p          # s2 内也是首次 → 不加后缀


def test_does_not_consult_disk(tmp_path):
    # 磁盘上已存在同名文件,但 seen 为空 → 仍返回原名(证明只看 seen、不看磁盘)
    existing = tmp_path / "foo.md"
    existing.write_text("hi", encoding="utf-8")
    seen: set[Path] = set()
    assert _dedupe_name(tmp_path / "foo.md", seen) == tmp_path / "foo.md"


def test_returned_path_is_added_to_seen():
    seen: set[Path] = set()
    p = Path("d/foo.md")
    _dedupe_name(p, seen)
    out2 = _dedupe_name(p, seen)
    assert out2 in seen                      # 去重后的新名也进 seen,后续再碰撞会跳过
    third = _dedupe_name(p, seen)
    assert third == Path("d/foo-3.md")
