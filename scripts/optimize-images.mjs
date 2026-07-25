// ============================================================
// 博客文章图片「双层」处理:
//   posts/orig/<name>  = 原图(全分辨率,点击查看)
//   posts/<name>       = 显示版(最大边 1600px + 质量 80,内联快速加载)
//
// 语雀/Obsidian 原图常 4–6MB,内联直接用会很慢;这里内联用压缩显示版,原图另存供点击看清晰。
// 用法:node scripts/optimize-images.mjs [--dir <目录>]  由 publish.mjs 在 sync 后自动调用。
// 工具优先级:sharp > ImageMagick(magick/convert)> macOS sips。
//
// 幂等:orig/<name> 缺失才从当前图复制(保原图);仅对 >1600px 的图生成显示版。
// publish 流程里 sync 会先清空 posts(含 orig)→ 每次发布 orig 都是最新原图。
// ============================================================
import { readdirSync, statSync, existsSync, mkdirSync, copyFileSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { execSync } from "node:child_process";

function argVal(flag) { const a = process.argv.find((s) => s.startsWith(flag + "=")); return a ? a.slice(flag.length + 1) : null; }
const DIR = argVal("--dir") || "blog/src/.vuepress/public/assets/posts";
const ORIG_DIR = join(DIR, "orig");
const MAXDIM = 1600;
const JPEG_Q = 80;

function has(cmd) { try { execSync(`command -v ${cmd}`, { stdio: "ignore" }); return true; } catch { return false; } }
const TOOL = has("sips") ? "sips" : has("magick") ? "magick" : has("convert") ? "convert" : null;

function pixelWidth(f) {
  try {
    if (TOOL === "sips") return parseInt(execSync(`sips -g pixelWidth "${f}"`, { encoding: "utf8" }).match(/pixelWidth:\s*(\d+)/)?.[1] || "0", 10);
    return parseInt(execSync(`${TOOL} identify -format "%w" "${f}"`, { encoding: "utf8" }).trim() || "0", 10);
  } catch { return 0; }
}
function resize(f, isJpeg) {
  if (TOOL === "sips") execSync(`sips -Z ${MAXDIM} ${isJpeg ? `-s formatOptions ${JPEG_Q}` : ""} "${f}"`, { stdio: "ignore" });
  else execSync(`${TOOL} "${f}" -resize ${MAXDIM}x${MAXDIM}\\> -strip ${isJpeg ? `-quality ${JPEG_Q}` : ""} "${f}"`, { stdio: "ignore" });
}

let origSaved = 0, resized = 0, total = 0;
function walk(d) {
  let entries; try { entries = readdirSync(d, { withFileTypes: true }); } catch { return; }
  for (const e of entries) {
    const p = join(d, e.name);
    if (e.isDirectory()) { if (p === ORIG_DIR) continue; walk(p); continue; }  // 不处理 orig/ 自身
    const ext = e.name.toLowerCase().split(".").pop();
    if (!["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) continue;
    total++;
    // 1) 保原图:orig/<相对路径> 缺失才复制(此刻 p 还是原图)
    const rel = relative(DIR, p);
    const origPath = join(ORIG_DIR, rel);
    if (!existsSync(origPath)) { mkdirSync(dirname(origPath), { recursive: true }); copyFileSync(p, origPath); origSaved++; }
    // 2) 生成显示版:仅当宽度 > 1600(小图无需处理,显示版=原图)
    if (["jpg", "jpeg", "png"].includes(ext) && pixelWidth(p) > MAXDIM) { try { resize(p, ext.startsWith("jp")); resized++; } catch { /* 保留原图 */ } }
  }
}

if (!TOOL) { console.log("⚠️  无图片工具(sharp/magick/sips),跳过。CI 可 apt-get install imagemagick。"); process.exit(0); }
walk(DIR);
console.log(`🖼️  双层图片:扫 ${total} 张 → 存原图 ${origSaved} 张、生成显示版 ${resized} 张(内联≤${MAXDIM}px,点击看 orig/ 原图)`);
