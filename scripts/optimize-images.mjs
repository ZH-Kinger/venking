// ============================================================
// 博客文章图片压缩:降到最大边 1600px + JPEG 质量 80 + 去元数据。
// 语雀/Obsidian 原图常有 4–6MB,直接搬会让文章页几十 MB、加载很慢;压后通常 10× 缩小。
//
// 用法:node scripts/optimize-images.mjs [--dir <目录>]
// 由 publish.mjs 在 sync 之后、build 之前自动调用。
//
// 工具优先级:sharp(若装)> ImageMagick(magick/convert)> macOS sips。
// 只处理 > 400KB 的图,幂等(sips -Z 不放大;重复跑对已小图无操作)。
// ============================================================
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { execSync } from "node:child_process";

function argVal(flag) { const a = process.argv.find((s) => s.startsWith(flag + "=")); return a ? a.slice(flag.length + 1) : null; }
const DIR = argVal("--dir") || "blog/src/.vuepress/public/assets/posts";
const MAXDIM = 1600;
const JPEG_Q = 80;
const THRESHOLD = 400 * 1024; // 只压 >400KB

function has(cmd) { try { execSync(`command -v ${cmd}`, { stdio: "ignore" }); return true; } catch { return false; } }
const TOOL = has("sips") ? "sips" : has("magick") ? "magick" : has("convert") ? "convert" : null;

function optimize(f) {
  const ext = f.toLowerCase().split(".").pop();
  if (!["jpg", "jpeg", "png"].includes(ext)) return 0;
  const before = statSync(f).size;
  if (before < THRESHOLD) return 0;
  const isJpeg = ext.startsWith("jp");
  try {
    if (TOOL === "sips") {
      execSync(`sips -Z ${MAXDIM} ${isJpeg ? `-s formatOptions ${JPEG_Q}` : ""} "${f}"`, { stdio: "ignore" });
    } else if (TOOL === "magick" || TOOL === "convert") {
      execSync(`${TOOL} "${f}" -resize ${MAXDIM}x${MAXDIM}\\> -strip ${isJpeg ? `-quality ${JPEG_Q}` : ""} "${f}"`, { stdio: "ignore" });
    }
  } catch { return 0; }
  const after = statSync(f).size;
  return Math.max(0, before - after);
}

let saved = 0, n = 0, total = 0;
function walk(d) {
  let entries; try { entries = readdirSync(d, { withFileTypes: true }); } catch { return; }
  for (const e of entries) {
    const p = join(d, e.name);
    if (e.isDirectory()) walk(p);
    else { total++; const s = optimize(p); if (s > 0) { saved += s; n++; } }
  }
}

if (!TOOL) {
  console.log("⚠️  未找到图片压缩工具(sharp/magick/sips),跳过图片压缩。CI(Linux)可 apt-get install imagemagick。");
  process.exit(0);
}
walk(DIR);
console.log(`🖼️  图片压缩(${TOOL}):处理 ${total} 张中的 ${n} 张 → 省 ${(saved / 1048576).toFixed(1)}MB`);
