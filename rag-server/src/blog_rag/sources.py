"""知识库来源登记表读取器。

语料物理上分散,但**逻辑上统一**登记在 rag-server/sources.toml。
ingest 调 `load_sources()` 拿到已启用的来源,按 `type` 分发给对应 loader。
用标准库 tomllib(Python 3.11+),零依赖。
"""
from __future__ import annotations

import tomllib
from dataclasses import dataclass
from pathlib import Path

from blog_rag.config import PROJECT_ROOT

DEFAULT_REGISTRY = PROJECT_ROOT / "sources.toml"


@dataclass(frozen=True)
class Source:
    name: str
    type: str          # blog_md | pdf | md_dir | ...
    path: Path         # 解析成绝对路径(相对 rag-server/ 的相对路径也支持)
    enabled: bool

    def exists(self) -> bool:
        return self.path.exists()


def load_sources(registry: Path | None = None, *, only_enabled: bool = True) -> list[Source]:
    registry = registry or DEFAULT_REGISTRY
    data = tomllib.loads(registry.read_text(encoding="utf-8"))
    out: list[Source] = []
    for s in data.get("source", []):
        raw = Path(s["path"])
        path = raw if raw.is_absolute() else (PROJECT_ROOT / raw).resolve()
        src = Source(
            name=s["name"],
            type=s["type"],
            path=path,
            enabled=bool(s.get("enabled", True)),
        )
        if only_enabled and not src.enabled:
            continue
        out.append(src)
    return out


if __name__ == "__main__":
    print("=== 知识库来源登记表 ===")
    for s in load_sources(only_enabled=False):
        flag = "✅启用" if s.enabled else "⬜停用"
        ok = "存在" if s.exists() else "❌缺失"
        print(f"  [{flag}] {s.name:16} type={s.type:8} {ok}  {s.path}")
