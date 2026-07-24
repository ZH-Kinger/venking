"""M7 主模型超时/重试耗尽后的备用 provider 降级。全部离线。"""
from __future__ import annotations

from types import SimpleNamespace

import pytest

from blog_rag import reliability


class RetryableForTest(Exception):
    pass


def _settings(**overrides):
    base = {
        "fallback_base_url": "",
        "fallback_model": "",
        "fallback_api_key": "",
        "api_key": "main-key",
        "llm_timeout": 60.0,
        "llm_max_retries": 2,
    }
    base.update(overrides)
    return SimpleNamespace(**base)


def test_fallback_requires_base_url_and_model(monkeypatch):
    monkeypatch.setattr(reliability, "settings", _settings(fallback_base_url="https://fallback"))
    assert reliability._fallback_client() is None
    monkeypatch.setattr(reliability, "settings", _settings(fallback_model="backup-model"))
    assert reliability._fallback_client() is None


def test_fallback_client_uses_dedicated_key_or_main_key(monkeypatch):
    captured = []
    monkeypatch.setattr(reliability, "OpenAI",
                        lambda **kwargs: captured.append(kwargs) or SimpleNamespace())

    monkeypatch.setattr(
        reliability,
        "settings",
        _settings(fallback_base_url="https://fallback", fallback_model="backup",
                  fallback_api_key="backup-key"),
    )
    reliability._fallback_client()
    assert captured[-1]["api_key"] == "backup-key"

    monkeypatch.setattr(
        reliability,
        "settings",
        _settings(fallback_base_url="https://fallback", fallback_model="backup"),
    )
    reliability._fallback_client()
    assert captured[-1]["api_key"] == "main-key"


def test_primary_success_does_not_build_fallback(monkeypatch):
    primary = SimpleNamespace(
        chat=SimpleNamespace(
            completions=SimpleNamespace(create=lambda **kwargs: ("primary", kwargs))
        )
    )
    monkeypatch.setattr("blog_rag.llm.get_client", lambda: primary)
    monkeypatch.setattr(reliability, "_fallback_client",
                        lambda: (_ for _ in ()).throw(AssertionError("不应调用")))
    assert reliability.create_completion(model="m") == ("primary", {"model": "m"})


def test_retryable_error_switches_to_fallback_and_model(monkeypatch):
    monkeypatch.setattr(reliability, "_RETRYABLE", (RetryableForTest,))

    def fail(**kwargs):
        raise RetryableForTest("primary down")

    primary = SimpleNamespace(
        chat=SimpleNamespace(completions=SimpleNamespace(create=fail))
    )
    captured = {}
    fallback = SimpleNamespace(
        chat=SimpleNamespace(
            completions=SimpleNamespace(
                create=lambda **kwargs: captured.update(kwargs) or "fallback-ok"
            )
        )
    )
    monkeypatch.setattr("blog_rag.llm.get_client", lambda: primary)
    monkeypatch.setattr(reliability, "_fallback_client", lambda: fallback)
    monkeypatch.setattr(reliability, "settings", _settings(fallback_model="backup-model"))

    assert reliability.create_completion(model="main-model", stream=False) == "fallback-ok"
    assert captured["model"] == "backup-model"
    assert captured["stream"] is False


def test_retryable_without_fallback_reraises(monkeypatch):
    monkeypatch.setattr(reliability, "_RETRYABLE", (RetryableForTest,))
    primary = SimpleNamespace(
        chat=SimpleNamespace(
            completions=SimpleNamespace(
                create=lambda **kwargs: (_ for _ in ()).throw(RetryableForTest("down"))
            )
        )
    )
    monkeypatch.setattr("blog_rag.llm.get_client", lambda: primary)
    monkeypatch.setattr(reliability, "_fallback_client", lambda: None)
    with pytest.raises(RetryableForTest):
        reliability.create_completion(model="m")


def test_non_retryable_error_never_falls_back(monkeypatch):
    monkeypatch.setattr(reliability, "_RETRYABLE", (RetryableForTest,))
    primary = SimpleNamespace(
        chat=SimpleNamespace(
            completions=SimpleNamespace(
                create=lambda **kwargs: (_ for _ in ()).throw(ValueError("bad request"))
            )
        )
    )
    monkeypatch.setattr("blog_rag.llm.get_client", lambda: primary)
    monkeypatch.setattr(reliability, "_fallback_client",
                        lambda: (_ for _ in ()).throw(AssertionError("不应调用")))
    with pytest.raises(ValueError):
        reliability.create_completion(model="m")
