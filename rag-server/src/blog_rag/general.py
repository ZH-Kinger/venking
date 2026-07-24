"""M5 通用分支子图:代码 / 画图 / 闲聊 / 常识 —— 不接地、不带引用、不进精准指标。

为什么独立成文件(照 Claude"每条路由=独立子图"):
- 双模式**不互污**:通用路径明确标注"非知识库、无出处",绝不套 [S#] 假引用;
  也不进 faithfulness/hit@k(那是接地路径的契约)。物理隔离防止松散污染严格。
- 快路径:route_question 判 general 的问题**跳过检索**(省 ~8s),直接来这里作答。
- **代码能力**:接地契约(只用资料)会扼杀代码生成,所以写代码/画图必须走这条通用路径,
  在这里模型可自由用自身知识产出。本分支用**代码感知 prompt**(见 _GENERAL_SYS_M5):
  代码用 ```语言 围栏 → Gradio 自动语法高亮;**只生成不执行**(安全设计:代码不跑→权限面天然小)。
- llm.run_chat(共享生成器)。M2 的 rag_chain._GENERAL_SYS 冻结不动,这里用自己的增强版。
"""
from __future__ import annotations

from blog_rag.llm import run_chat
from blog_rag.memory import recent_history

# 通用分支 prompt(代码感知;在 M2 _GENERAL_SYS 基础上强化"代码用围栏、可运行、只生成不执行")
_GENERAL_SYS_M5 = (
    "你是全能技术助手,用你自己的知识直接回答或**动手产出**(写代码、实现算法、写正则/SQL、画 Mermaid 图等)。\n"
    "- 涉及代码:用 Markdown ```语言 围栏输出(如 ```python),代码要**完整可运行**、加简洁注释;必要时附一句用法说明。\n"
    "- 涉及流程图:用 ```mermaid 围栏。\n"
    "- 这**不是**知识库检索结果,不要编造或标注任何 [S#] 引用。\n"
    "- 你**只生成代码,不执行**;如需运行请提示用户自行运行。\n"
    "- 简洁准确,中文说明。"
)


def general_generate(state: dict) -> dict:
    """通用节点:用模型自身知识作答,写回黑板 mode=general、sources=[]、无引用。

    suggestions 只有在 rag 阶梯降级到这里(state 里已有检索文档)时才非空;
    前置路由直达的通用问题(红烧肉/闲聊)无检索、suggestions=[](本就与 KB 无关)。
    """
    stream = state.get("stream", True)
    if stream:
        print("⚠️ 以下为**通用知识**回答(非知识库检索,无出处,仅供参考):\n")
    hist = recent_history(state)                       # M8:多轮上下文,让追问("它呢?")有指代
    user = (f"【最近对话】\n{hist}\n\n【当前问题】{state['question']}") if hist else state["question"]
    ans = run_chat(
        _GENERAL_SYS_M5, user,
        stream=stream, show_reasoning=state.get("show_reasoning", False),
        length=state.get("length"),
    )
    suggestions = state.get("suggestions", [])
    if stream and suggestions:
        print("\n你可能想问(知识库里的相关主题):")
        for s in suggestions:
            print(f"  · {s}")
    return {
        "generation": ans,
        "mode": "general",
        "sources": [],
        "suggestions": suggestions,
        "retrieved_doc_ids": state.get("retrieved_doc_ids", []),
        "contexts": state.get("contexts", []),
    }
