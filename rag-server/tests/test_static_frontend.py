"""Static Agent UI regression checks.

These tests keep the dependency-free frontend's critical controls and self-hosted
rendering assets from silently disappearing during later visual refactors.
"""
from pathlib import Path


STATIC_DIR = Path(__file__).parents[1] / "src" / "blog_rag" / "static"
INDEX = STATIC_DIR / "index.html"


def _html() -> str:
    return INDEX.read_text(encoding="utf-8")


def test_agent_ui_has_complete_conversation_controls():
    html = _html()
    assert 'id="exportChat"' in html
    assert "window.renameConv=" in html
    assert "deleteArmed" in html
    assert "window.retryAnswer=" in html
    assert "重新生成" in html
    assert "const STAGE_LABEL=" in html
    assert "ev.type==='progress'" in html


def test_agent_ui_stop_finishes_the_active_run():
    html = _html()
    assert "sendBtn.onclick=()=>{if(busy)cancelActive();else send();};" in html
    assert "activeRun={cancel:" in html
    assert "if(finished)return;finished=true;source.close();" in html
    assert "if(busy&&es){es.close();stopUI();}" not in html


def test_agent_ui_uses_self_hosted_code_highlighting():
    html = _html()
    assert "loadScript('/vendor/prism.js')" in html
    assert "highlightCode(wrap)" in html
    assert 'class="language-${safeLang}"' in html
    assert "cdn.jsdelivr.net" not in html
    assert "cdnjs.cloudflare.com" not in html


def test_prism_assets_and_license_are_vendored():
    expected = {
        "prism.js",
        "prism-python.min.js",
        "prism-bash.min.js",
        "prism-json.min.js",
        "prism-sql.min.js",
        "prism-java.min.js",
        "prism-go.min.js",
        "prism-csharp.min.js",
        "prism-typescript.min.js",
        "prism-yaml.min.js",
        "prism-docker.min.js",
        "prism-markdown.min.js",
        "PRISM-LICENSE",
    }
    vendor = STATIC_DIR / "vendor"
    assert expected <= {path.name for path in vendor.iterdir()}
    assert "MIT" in (vendor / "PRISM-LICENSE").read_text(encoding="utf-8")
