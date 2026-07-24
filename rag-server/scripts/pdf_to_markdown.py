"""把大 PDF 分小批转成一份干净 Markdown(规避 docling 内存累积 OOM)。

策略:fitz 抽 BATCH 页小 PDF → docling 转 → 拼接;批间 gc.collect() 释放。
每批 try/except,坏批跳过不拖垮全程。图不在这里出(双轨:图交给 fitz)。

用法:
  python rag-server/scripts/pdf_to_markdown.py            # 全本
  python rag-server/scripts/pdf_to_markdown.py 40         # 只前 40 页(测试)
"""
from __future__ import annotations

import gc
import sys
from pathlib import Path

import fitz
from docling.datamodel.base_models import InputFormat
from docling.datamodel.pipeline_options import PdfPipelineOptions
from docling.document_converter import DocumentConverter, PdfFormatOption

# 大 PDF 批处理工具(docling 单次转会 OOM;handle_pdf 是简版,超大 PDF 用本脚本)。
# 默认读归档区的 PDF;需要时改路径或传参。
SRC = Path("rag-server/data/_archive/AI INFRA SRE.pdf")
OUT = Path("rag-server/data/_archive/AI_INFRA_SRE.md")
BATCH = 5


def make_converter() -> DocumentConverter:
    opts = PdfPipelineOptions()
    opts.do_ocr = False               # 有文字层,不用 OCR
    opts.generate_picture_images = False
    opts.generate_page_images = False
    return DocumentConverter(
        format_options={InputFormat.PDF: PdfFormatOption(pipeline_options=opts)}
    )


def main() -> None:
    max_pages = int(sys.argv[1]) if len(sys.argv) > 1 else None
    doc = fitz.open(SRC)
    n = min(doc.page_count, max_pages) if max_pages else doc.page_count
    conv = make_converter()
    tmp = SRC.parent / "_batch.pdf"

    parts, ok, fail = [], 0, 0
    for start in range(0, n, BATCH):
        end = min(start + BATCH, n)
        mini = fitz.open()
        mini.insert_pdf(doc, from_page=start, to_page=end - 1)
        mini.save(tmp)
        mini.close()
        try:
            res = conv.convert(str(tmp))
            parts.append(f"<!-- pages {start+1}-{end} -->\n" + res.document.export_to_markdown())
            ok += 1
            print(f"  [{start+1:>3}-{end:<3}/{n}] ✅ {res.status}", flush=True)
        except Exception as e:
            fail += 1
            print(f"  [{start+1:>3}-{end:<3}/{n}] ❌ {str(e)[:60]}", flush=True)
        gc.collect()

    tmp.unlink(missing_ok=True)
    full = "\n\n".join(parts)
    OUT.write_text(full, encoding="utf-8")
    print(f"\n完成: {OUT.name} | 批次 ok={ok} fail={fail} | 总字数 {len(full)}")


if __name__ == "__main__":
    main()
