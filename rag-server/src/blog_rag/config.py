"""统一配置(单一事实源)——生产级 pydantic-settings 实现。

要点:
- **所有可调参数都能用 .env 覆盖**;字段名(大小写不敏感)= 环境变量名,
  例如字段 `top_k` ← 环境变量 `TOP_K`;`api_key` 走别名 `DASHSCOPE_API_KEY`。
- pydantic 自动做**类型校验**:.env 里把 `TOP_K` 填成 "abc" 会立刻报清晰错,
  而不是等运行时才炸。
- config.py 是**唯一**读 env 的地方;其他模块统一 `from blog_rag.config import settings`。
- 不同能力在不同 endpoint(对话 LLM 在 MaaS;embedding/视觉/重排在百炼标准端点)。
- 路径与 index_version 是**派生**的(不从 env),用 @property 暴露。
改行为 → 改 .env 一处,不动代码。
"""
from __future__ import annotations

from pathlib import Path

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

# 路径锚点:本文件在 rag-server/src/blog_rag/config.py
PKG_DIR = Path(__file__).resolve().parent          # .../rag-server/src/blog_rag
PROJECT_ROOT = PKG_DIR.parents[1]                  # .../rag-server
BLOG_ROOT = PROJECT_ROOT.parent                    # .../ZH-Kinger

# 端点常量
DASHSCOPE_COMPAT = "https://dashscope.aliyuncs.com/compatible-mode/v1"
# 自定义 MaaS 兼容端点默认值仅作占位;真实实例地址在 .env 的 LLM_BASE_URL 覆盖。
GLM_MAAS = "https://YOUR-MAAS-INSTANCE.cn-beijing.maas.aliyuncs.com/compatible-mode/v1"


class Settings(BaseSettings):
    """全部旋钮;每个都可在 .env 覆盖。类型由 pydantic 校验。"""

    model_config = SettingsConfigDict(
        env_file=str(PROJECT_ROOT / ".env"),
        env_file_encoding="utf-8",
        case_sensitive=False,   # TOP_K / top_k 都认
        extra="ignore",         # .env 里多余的键不报错
    )

    # ---- 鉴权 ----
    api_key: str = Field(default="", validation_alias="DASHSCOPE_API_KEY")

    # ---- 对话 LLM(GLM-5.2 @ MaaS)----
    llm_base_url: str = GLM_MAAS
    llm_model: str = "glm-5.2"
    temperature: float = 0.0            # 打分器/路由确定性

    # ---- Embedding(专门的向量模型,**不能是对话 LLM**)----
    embedding_base_url: str = DASHSCOPE_COMPAT
    embedding_model: str = "text-embedding-v4"
    embedding_dim: int = 1024           # 锁定;改维度须 kb rebuild
    embedding_batch: int = 10           # 百炼上限

    # ---- 视觉(PDF 图 caption + 生成时看原图;默认试 GLM-5.2,不支持改 VL_MODEL)----
    vl_base_url: str = GLM_MAAS
    vl_model: str = "glm-5.2"
    # 派系2 多模态 RAG:命中图片块时把**原图**喂 VLM 作答(而非只喂caption)。
    # 需生成模型多模态;M1 实测 GLM-5.2 端点,不支持则回退纯caption(派系1)。
    multimodal_generation: bool = True

    # ---- 重排(GLM-5.2 做 LLM 重排)----
    rerank_model: str = "glm-5.2"

    # ---- 分块 ----
    chunk_size: int = 500
    chunk_overlap: int = 80

    # ---- 检索 ----
    top_k: int = 4                      # 最终喂 LLM 条数
    fetch_k: int = 20                   # 宽召回(重排前)
    rerank_top_n: int = 4
    rerank_candidates: int = 10         # listwise 重排只喂 RRF top-N 候选(1 次调用打全部分,比 pointwise 快~20x)
    score_threshold: float = 0.3        # 稠密相关性阈值(0~1;注:Chroma 分数待归一化)
    grounding_min_rerank: int = 5       # 接地闸门:最佳重排分(0~10)低于此→不接地,走通用回答/弃答
    max_context_tokens: int = 8000      # 喂给 LLM 的上下文 token 预算,超了砍低分块(防爆+防lost-in-middle)
    rrf_k: int = 60                     # RRF 融合平滑常量(混合检索 & RAG-Fusion 共用)

    # ---- RAG-Fusion(多查询融合,自适应检索模式)----
    rag_fusion_enabled: bool = False    # 默认关;复杂问题由 route_question 触发
    rag_fusion_n_queries: int = 3       # 生成的衍生子问题数

    # ---- Agent ----
    max_retries: int = 1
    recursion_limit: int = 15
    # A/B 开关:True→answer 走 M5 LangGraph 图;False→M2 单跳链(基线)。
    # 显式别名 RAG_USE_GRAPH(否则默认只认 USE_GRAPH,曾导致评测静默跑成基线)。
    use_graph: bool = Field(default=False, validation_alias="RAG_USE_GRAPH")

    # ---- 韧性(M7:超时/重试/降级)----
    llm_timeout: float = 60.0           # 单次请求超时(秒);超时算可重试错误
    llm_max_retries: int = 2            # SDK 内置指数退避重试次数(仅对 连接/超时/429/5xx;4xx 不重试)
    # 备用 provider(可选):主端点重试耗尽仍失败 → 切它兜一次;两项都填才启用。key 留空则复用主 key。
    fallback_base_url: str = Field(default="", validation_alias="FALLBACK_BASE_URL")
    fallback_model: str = Field(default="", validation_alias="FALLBACK_MODEL")
    fallback_api_key: str = Field(default="", validation_alias="FALLBACK_API_KEY")

    # ---- 联网搜索 ----
    web_search_enabled: bool = True     # 本地不接地时是否自动联网兜底(CRAG 阶梯)
    web_provider: str = "duckduckgo"    # duckduckgo(免key) | tavily(需key,精准) | bocha(需key,中文)
    web_max_results: int = 5
    tavily_api_key: str = Field(default="", validation_alias="TAVILY_API_KEY")
    bocha_api_key: str = Field(default="", validation_alias="BOCHA_API_KEY")

    # ---- UI / 部署 ----
    # host 默认 127.0.0.1 = **安全默认**:本地开发只绑本机、不暴露公网;
    # 部署时在 .env 显式设 UI_HOST=0.0.0.0 才对外(明确意图才开门,防误暴露)。
    ui_host: str = Field(default="127.0.0.1", validation_alias="UI_HOST")
    ui_port: int = Field(default=7860, validation_alias="UI_PORT")
    # 登录鉴权:两者都填才启用 Gradio auth(挡白嫖 GLM key)。留空=不鉴权(仅限本机开发)。
    ui_auth_user: str = Field(default="", validation_alias="UI_AUTH_USER")
    ui_auth_pass: str = Field(default="", validation_alias="UI_AUTH_PASS")

    # ---------- 校验 ----------
    @field_validator("embedding_dim")
    @classmethod
    def _valid_dim(cls, v: int) -> int:
        allowed = {64, 128, 256, 512, 768, 1024, 1536, 2048}
        if v not in allowed:
            raise ValueError(f"EMBEDDING_DIM={v} 非法,text-embedding-v4 支持 {sorted(allowed)}")
        return v

    # ---------- 派生路径(结构性,不从 env)----------
    @property
    def posts_dir(self) -> Path:
        return BLOG_ROOT / "src" / "posts"

    @property
    def data_dir(self) -> Path:
        return PROJECT_ROOT / "data"

    @property
    def inbox_dir(self) -> Path:
        """唯一投放入口:把原始源丢进 data/inbox/<分类>/,convert 按扩展名分派转换+入库。"""
        return self.data_dir / "inbox"

    @property
    def archive_dir(self) -> Path:
        """被取代/留存但不处理的原件(如已改用 lakebook 的 PDF 版)。"""
        return self.data_dir / "_archive"

    @property
    def convert_state_path(self) -> Path:
        """convert 管道的幂等状态(输入文件 sha256)。"""
        return self.data_dir / "convert_state.json"

    @property
    def chroma_dir(self) -> Path:
        return self.data_dir / "chroma_db"

    @property
    def image_dir(self) -> Path:
        return self.data_dir / "pdf_images"

    @property
    def caption_cache_dir(self) -> Path:
        return self.data_dir / "caption_cache"

    @property
    def manifest_path(self) -> Path:
        return self.data_dir / "manifest.json"

    @property
    def record_manager_path(self) -> Path:
        return self.data_dir / "record_manager.sqlite"

    @property
    def feedback_dir(self) -> Path:
        return self.data_dir / "feedback"

    @property
    def checkpoint_db(self) -> Path:
        """M8 短时记忆:LangGraph SqliteSaver 落盘(挂载卷,重启不丢多轮对话)。"""
        return self.data_dir / "checkpoints.sqlite"

    @property
    def index_version(self) -> str:
        """embedding|维度|分块 指纹;任一变即作废旧向量(须 kb rebuild)。"""
        return f"{self.embedding_model}|{self.embedding_dim}|md-header|cs{self.chunk_size}"

    # ---------- 工具 ----------
    def require_api_key(self) -> str:
        """需要鉴权时调用;没填 / 没换掉占位符时给人话报错。"""
        if not self.api_key:
            raise RuntimeError("缺少 API Key:请在 rag-server/.env 填 DASHSCOPE_API_KEY。")
        if not self.api_key.isascii() or "在这里" in self.api_key:
            raise RuntimeError(
                "DASHSCOPE_API_KEY 还是占位符,请在 rag-server/.env 填真实的 sk- key。"
            )
        return self.api_key


# 全局唯一实例
settings = Settings()
