"""M5 图装配 + config A/B 开关别名 —— 零网络/LLM/Chroma。

覆盖(memory 重点 7/8):
- build_graph():能编译;节点集合含全部 13 个业务节点(含 CRAG + M8 记忆节点)。
- config RAG_USE_GRAPH 别名:字段 validation_alias 正确;setenv=1→use_graph True、=0→False
  (修复此前只认 USE_GRAPH → 评测静默跑成基线的 bug)。
"""
from __future__ import annotations

from blog_rag.config import Settings

# ==================== build_graph 装配 ====================
_EXPECTED_NODES = {
    "route_question", "contextualize_query", "retrieve", "grade_documents", "transform_query",
    "web_search", "grade_web", "grounded_generate", "web_generate",
    "general_generate", "refuse", "guardrails", "record_turn",
}


def test_build_graph_compiles_and_has_all_business_nodes():
    from blog_rag.graph import build_graph
    g = build_graph()
    # 编译成功即拿到 CompiledStateGraph
    assert g is not None
    nodes = set(g.nodes.keys())
    business = nodes - {"__start__", "__end__"}
    assert business == _EXPECTED_NODES
    assert len(business) == 13


def test_build_graph_includes_new_crag_nodes():
    # 显式守卫本轮新增的两个 CRAG 节点确实接进图
    from blog_rag.graph import build_graph
    nodes = set(build_graph().nodes.keys())
    assert "grade_documents" in nodes
    assert "grade_web" in nodes


def test_build_graph_includes_memory_nodes():
    from blog_rag.graph import build_graph
    nodes = set(build_graph().nodes.keys())
    assert "contextualize_query" in nodes
    assert "record_turn" in nodes


def test_get_graph_is_singleton():
    from blog_rag import graph
    g1 = graph.get_graph()
    g2 = graph.get_graph()
    assert g1 is g2


# ==================== config RAG_USE_GRAPH 别名 ====================
def test_use_graph_field_alias_is_rag_use_graph():
    # 字段层面断言 validation_alias(不依赖环境)——修 bug 的直接证据
    field = Settings.model_fields["use_graph"]
    assert field.validation_alias == "RAG_USE_GRAPH"
    assert field.default is False


def test_env_rag_use_graph_true_maps_to_use_graph(monkeypatch):
    # RAG_USE_GRAPH=1 → settings.use_graph True(评测能真正切到 M5 图)
    monkeypatch.setenv("RAG_USE_GRAPH", "1")
    s = Settings()
    assert s.use_graph is True


def test_env_rag_use_graph_false_maps_to_use_graph(monkeypatch):
    monkeypatch.setenv("RAG_USE_GRAPH", "0")
    s = Settings()
    assert s.use_graph is False


def test_use_graph_defaults_false_without_env(monkeypatch):
    # 无 RAG_USE_GRAPH 环境变量 → 默认 False(基线 M2 单跳链)
    monkeypatch.delenv("RAG_USE_GRAPH", raising=False)
    s = Settings()
    assert s.use_graph is False


def test_bare_use_graph_env_not_mapped(monkeypatch):
    # 回归 bug 本身:validation_alias 生效后,裸 USE_GRAPH 不再映射(须用 RAG_USE_GRAPH)
    monkeypatch.delenv("RAG_USE_GRAPH", raising=False)
    monkeypatch.setenv("USE_GRAPH", "1")
    s = Settings()
    assert s.use_graph is False
