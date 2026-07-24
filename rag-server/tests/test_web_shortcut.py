"""链路优化 #1:web_mode 短路检索(graders.after_contextualize + graph 布线)。"""
from __future__ import annotations

from blog_rag.graders import after_contextualize


def test_after_contextualize_shortcircuits_on_web_mode():
    # 用户强制联网:跳过本地检索+细筛,直达 web_search
    assert after_contextualize({"web_mode": True}) == "web_search"


def test_after_contextualize_defaults_to_retrieve():
    assert after_contextualize({}) == "retrieve"
    assert after_contextualize({"web_mode": False}) == "retrieve"


def test_graph_wires_web_shortcut_branch():
    """编译图应包含 contextualize_query → web_search 这条短路边(不再无条件走 retrieve)。"""
    from blog_rag.graph import build_graph
    g = build_graph()
    graph = g.get_graph()
    edge_pairs = {(e.source, e.target) for e in graph.edges}
    assert ("contextualize_query", "web_search") in edge_pairs   # 短路边存在
    assert ("contextualize_query", "retrieve") in edge_pairs     # 默认边仍在
