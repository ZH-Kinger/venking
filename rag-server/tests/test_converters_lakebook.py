"""converters.handle_lakebook —— STRIP_TITLES / MAX_DIRS 嵌套行为(用小型构造 tar)。

同时覆盖:容器节点→目录 README.md、叶子→.md、空叶子过滤、空容器留 README、
        超深容器拍平成文件、祖先目录去透明壳并截断到 MAX_DIRS、order 保序。
纯本地 tar,零网络。
"""
from __future__ import annotations

import io
import json
import tarfile

import yaml

from blog_rag import converters
from blog_rag.converters import MAX_DIRS, STRIP_TITLES, handle_lakebook

PREFIX = "book"


def _make_lakebook(tmp_path, docs: list[dict], bodies: dict[str, str]):
    """构造一个最小 .lakebook(tar):$meta.json(含 tocYml) + 每个 doc 的 <url>.json。"""
    toc_yaml = yaml.safe_dump(docs, allow_unicode=True)
    meta_inner = json.dumps({"book": {"tocYml": toc_yaml}})
    meta_file = json.dumps({"meta": meta_inner})

    path = tmp_path / "sample.lakebook"
    with tarfile.open(path, "w") as tar:
        def _add(name: str, data: str):
            raw = data.encode("utf-8")
            info = tarfile.TarInfo(name=name)
            info.size = len(raw)
            tar.addfile(info, io.BytesIO(raw))

        _add(f"{PREFIX}/$meta.json", meta_file)
        for d in docs:
            body_html = bodies.get(d["uuid"], "")
            _add(f"{PREFIX}/{d['url']}.json", json.dumps({"doc": {"body": body_html}}))
    return path


def _build_toc():
    """构造层级:
      学习计划(STRIP root)
        └ 阶段一(STRIP)
            └ 训练架构 A (容器→dir)
                ├ 分布式基础 B (容器→dir)
                │   └ 通信原语 C (容器→dir, depth3)
                │       └ NCCL D (有子但深度已达上限→拍平成 file)
                │           └ AllReduce E (叶子, 路径截断到3层)
                ├ 空叶子 F (空 body → 跳过)
                └ 空容器 G (容器, 空 body → 仍留 README)
                    └ H (叶子)
    """
    def n(uuid, title, parent=None):
        d = {"uuid": uuid, "title": title, "url": uuid, "type": "DOC"}
        if parent:
            d["parent_uuid"] = parent
        return d

    return [
        n("root", "学习计划"),
        n("s1", "阶段一", "root"),
        n("A", "训练架构", "s1"),
        n("B", "分布式基础", "A"),
        n("C", "通信原语", "B"),
        n("D", "NCCL", "C"),
        n("E", "AllReduce", "D"),
        n("F", "空叶子", "A"),
        n("G", "空容器", "A"),
        n("H", "被压节点", "G"),
    ]


def _run(tmp_path):
    docs = _build_toc()
    bodies = {
        "A": "<h1>训练架构</h1><p>arch</p>",
        "B": "<p>dist</p>",
        "C": "<p>comm</p>",
        "D": "<p>nccl body</p>",
        "E": "<p>allreduce body</p>",
        "F": "",          # 空叶子 → 跳过
        "G": "",          # 空容器 → 仍留 README
        "H": "<p>h body</p>",
    }
    src = _make_lakebook(tmp_path, docs, bodies)
    out_dir = tmp_path / "posts"
    written = handle_lakebook(src, out_dir, category="AI_Infra", date="2026-07-13")
    rels = sorted(p.relative_to(out_dir).as_posix() for p in written)
    return out_dir, written, rels


def test_precondition_config():
    assert STRIP_TITLES == {"学习计划", "阶段一"}
    assert MAX_DIRS == 3


def test_strip_titles_produce_no_output(tmp_path):
    _, _, rels = _run(tmp_path)
    # 透明壳自身不建目录/文件
    assert not any("学习计划" in r for r in rels)
    assert not any("阶段一" in r for r in rels)


def test_container_becomes_dir_readme(tmp_path):
    _, _, rels = _run(tmp_path)
    # A 是容器且祖先全被 strip → 顶层目录 训练架构/README.md
    assert "训练架构/README.md" in rels


def test_nested_containers_readme(tmp_path):
    _, _, rels = _run(tmp_path)
    assert "训练架构/分布式基础/README.md" in rels
    assert "训练架构/分布式基础/通信原语/README.md" in rels


def test_deep_container_flattened_to_file(tmp_path):
    _, _, rels = _run(tmp_path)
    # D(NCCL)有子节点,但深度已达 MAX_DIRS=3 → 不再建目录,拍平成文件
    assert "训练架构/分布式基础/通信原语/NCCL.md" in rels
    # 不应存在 NCCL 目录下的 README
    assert "训练架构/分布式基础/通信原语/NCCL/README.md" not in rels


def test_leaf_path_truncated_to_max_dirs(tmp_path):
    _, _, rels = _run(tmp_path)
    # E(AllReduce)祖先链 [训练架构,分布式基础,通信原语,NCCL] 截断到 3 → NCCL 从路径掉出
    assert "训练架构/分布式基础/通信原语/AllReduce.md" in rels


def test_empty_leaf_skipped(tmp_path):
    _, _, rels = _run(tmp_path)
    assert not any("空叶子" in r for r in rels)


def test_empty_container_keeps_readme(tmp_path):
    _, _, rels = _run(tmp_path)
    # 空容器仍留 README 当分区索引
    assert "训练架构/空容器/README.md" in rels
    assert "训练架构/空容器/被压节点.md" in rels


def test_order_preserved_in_frontmatter(tmp_path):
    out_dir, _, _ = _run(tmp_path)
    # A(训练架构)在 docs 列表第 3 位 → order: 3
    text = (out_dir / "训练架构" / "README.md").read_text(encoding="utf-8")
    assert "order: 3" in text
    # 容器带 dir: 块
    assert "dir:" in text


def test_leaf_file_has_no_dir_block(tmp_path):
    out_dir, _, _ = _run(tmp_path)
    text = (out_dir / "训练架构/分布式基础/通信原语/NCCL.md").read_text(encoding="utf-8")
    assert "dir:" not in text
    assert "nccl body" in text
    assert "category:" in text
    assert "AI_Infra" in text


def test_written_count(tmp_path):
    _, written, rels = _run(tmp_path)
    # A,B,C README(3) + D,E,H 文件(3) + 空容器 G README(1) = 7;空叶子 F 跳过
    assert len(written) == 7
    assert len(set(rels)) == 7
