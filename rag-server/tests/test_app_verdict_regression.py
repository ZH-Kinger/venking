"""回归守卫:like_fn 的 verdict 归一(auditor 2026-07-14 抓到的高危 bug)。

背景:gradio 自定义 feedback_options 标签会让 data.liked 回传**字符串**而非 bool,
旧代码 `"up" if data.liked else "down"` 对非空字符串恒真→👎 被记成 👍。
_verdict_of 对 bool 和字符串都要正确;此测试专盯这个反转不复发。
"""
from __future__ import annotations

import pytest

from blog_rag.app import _verdict_of


@pytest.mark.parametrize("liked,expected", [
    (True, "up"),                 # 精确 "Like"/"Dislike" → bool
    (False, "down"),
    ("Like", "up"),               # 万一回传标签字符串也要对
    ("Dislike", "down"),
    ("👎 没用", "down"),           # 自定义中文标签(旧 bug 会误判成 up)
    ("👍 有用", "up"),
    ("dislike", "down"),          # 大小写
])
def test_verdict_of_bool_and_string(liked, expected):
    assert _verdict_of(liked) == expected
