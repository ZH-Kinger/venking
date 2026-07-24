// ============================================================
// 同步脚本:Obsidian vault → VuePress theme-hope(src/posts,全量替换)
//
// 用法:node scripts/sync-obsidian-to-vuepress.mjs [--dry]
//   --dry 只统计不写文件(先看清单再真跑)
//
// 与 astro 版(astro-site/scripts/migrate-obsidian.mjs)的差异:
//   - 输出 src/posts(非 content/posts);保留原中文文件名(不 slugify,VuePress URL 现状一致)
//   - frontmatter 生成 theme-hope 格式:title + date + icon(按分类) + category(YAML 数组)
//   - 空占位桩用 article:false(theme-hope 不进博客列表)代替 astro 的 draft:true
//   - 图片本地化到 src/.vuepress/public/assets/posts/,正文引用改绝对路径 /blog/assets/posts/...
//   - 新增 1\. 转义标题修复(语雀导出序号反斜杠 → VuePress 标题渲染异常)
// 复用:walk / shouldSkip / isPlaceholder / parseFrontmatter / gitFirstDate / wiki 链接转换
// ============================================================
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, copyFileSync, rmSync } from "node:fs";
import { join, relative, dirname, basename } from "node:path";
import { execSync } from "node:child_process";

const VAULT = "D:/obsidian workspace";
const OUT = "src/posts";
const PUB_IMG = "src/.vuepress/public/assets/posts";   // 图片落地(public 下)
const IMG_URLBASE = "/blog/assets/posts";              // 引用绝对路径(注意 base=/blog/)
const DRY = process.argv.includes("--dry");

// Obsidian 顶层目录 → theme-hope 中文分类名(用户审定)
const CATEGORY_MAP = {
  AI_INFRA_SRE: "AI基础设施",
  Agent_development: "AI大模型",
  计算机网络: "计算机网络",
  面试: "面试",
  默认知识库: "杂项笔记",
  web集群: "运维",
  Docker: "云原生",
  "OpenClaw_+_多Agent协同的下一代AIOPS平台": "AIOps平台",
  python开发: "开发",
  GitHub: "开发",
  go语言开发: "开发",
  数据库: "数据库",
};

// 分类 → Tabler 线性图标(theme-hope frontmatter icon)
const CATEGORY_ICON = {
  AI基础设施: "cpu",
  AI大模型: "robot",
  计算机网络: "network",
  面试: "clipboard-text",
  杂项笔记: "note",
  运维: "server",
  云原生: "cloud",
  AIOps平台: "settings",
  开发: "code",
  数据库: "database",
};

// —— 跳过(占位/空壳/冲突副本/vault README)——
function shouldSkip(relPath) {
  const name = basename(relPath);
  if (/^(无标题文档|未命名|Untitled)/i.test(name)) return "占位文件名";
  if (/ \(\d+\)\.md$/i.test(name)) return "同步冲突副本";
  if (/^README\.md$/i.test(name) && !relPath.includes("/")) return "vault 说明文件";
  return null;
}

// —— 空占位桩(标 article:false,不跳过)——
function isPlaceholder(fm, body) {
  if (fm.type === "placeholder") return true;
  const stripped = body.replace(/^#\s+.*$/m, "").trim();
  return stripped === "待补充" || stripped === "";
}

function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { fm: {}, body: raw };
  const fm = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2].trim();
  }
  return { fm, body: m[2] };
}

const TODAY = new Date().toISOString().slice(0, 10);
function gitFirstDate(absPath) {
  try {
    const out = execSync(
      `git -C "${VAULT}" log --diff-filter=A --format=%as -- "${relative(VAULT, absPath)}"`,
      { encoding: "utf8", stdio: ["pipe", "pipe", "ignore"] }
    ).trim();
    const lines = out.split("\n").filter(Boolean);
    return lines.length ? lines[lines.length - 1] : TODAY;
  } catch {
    return TODAY;
  }
}

// —— Obsidian 语法转换 + 语雀序号转义修复 ——
function convertSyntax(body) {
  return body
    // 图片嵌入 ![[x.png|alt]] → ![](x.png)
    .replace(/!\[\[([^\]|]+?\.(?:png|jpe?g|gif|webp|svg))(?:\|[^\]]*)?\]\]/gi,
      (_, p) => `![](${encodeURI(p.trim())})`)
    // wiki 链接 [[页面|显示]]→显示;[[页面]]→页面(纯文本,去链接)
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$2")
    .replace(/\[\[([^\]]+)\]\]/g, "$1")
    // 语雀序号转义修复:标题行 "## 1\. xxx" → "## 1. xxx"(否则 VuePress 标题渲染异常)
    .replace(/^(#{1,6}\s+.*?)\\\./gm, "$1.");
}

function yamlStr(s) {
  return `"${String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function walk(dir, acc = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === ".git" || e.name === ".obsidian" || e.name === "assets") continue;
      walk(p, acc);
    } else if (e.name.endsWith(".md")) acc.push(p);
  }
  return acc;
}

// ============ 主流程 ============
// 全量替换:先清空 src/posts(已在外部 git + _backup_posts_orig 双备份)
if (!DRY) {
  if (existsSync(OUT)) rmSync(OUT, { recursive: true, force: true });
  mkdirSync(OUT, { recursive: true });
  mkdirSync(PUB_IMG, { recursive: true });
}

const files = walk(VAULT);
const stats = { total: files.length, migrated: 0, hidden: 0, skipped: 0, images: 0, imgMissing: 0, byCategory: {}, skipReasons: {} };
const seenPaths = new Set();
const seenImg = new Set();     // 图片去重(同图多篇引用只拷一次)

const IMG_EXT = /\.(png|jpe?g|gif|webp|svg)$/i;
const IMG_RE = /(!\[[^\]]*\]\()([\s\S]*?\.(?:png|jpe?g|gif|webp|svg))(\))/gi;

for (const abs of files) {
  const rel = relative(VAULT, abs).replace(/\\/g, "/");
  const parts = rel.split("/");
  const topDir = parts.length > 1 ? parts[0] : "默认知识库";

  const raw = readFileSync(abs, "utf8");
  const { fm, body } = parseFrontmatter(raw);

  const skip = shouldSkip(rel);
  if (skip) { stats.skipped++; stats.skipReasons[skip] = (stats.skipReasons[skip] || 0) + 1; continue; }

  const title = fm.title || basename(rel).replace(/\.md$/i, "");
  const category = CATEGORY_MAP[topDir] || topDir;
  const icon = CATEGORY_ICON[category] || "file-text";
  const hidden = isPlaceholder(fm, body);
  const date = gitFirstDate(abs);

  let converted = convertSyntax(body).trim();

  // 输出路径:保留原目录层级 + 原文件名(不 slugify,中文 URL);仅顶层目录换成中文分类名
  const subDirs = parts.slice(1, -1);                       // 分类下的子目录(原样保留)
  const outRelDir = [category, ...subDirs].join("/");
  let outName = basename(rel);
  let n = 1;
  while (seenPaths.has(join(outRelDir, outName))) { n++; outName = basename(rel).replace(/\.md$/i, `-${n}.md`); }
  seenPaths.add(join(outRelDir, outName));
  const outDir = join(OUT, outRelDir);
  const outPath = join(outDir, outName);

  // 图片本地化到 public/assets/posts(绝对路径引用)。三基准定位 + 括号文件名正则。
  const mdDir = dirname(abs);
  converted = converted.replace(IMG_RE, (whole, pre, refPath, post) => {
    if (/^https?:/i.test(refPath) || refPath === "#") return whole;   // 外链保留
    const decoded = decodeURIComponent(refPath.trim());
    if (!IMG_EXT.test(decoded)) return whole;
    const srcImg = [join(mdDir, decoded), join(dirname(mdDir), decoded), join(VAULT, decoded)].find((c) => existsSync(c));
    const fileName = basename(decoded);
    if (srcImg) {
      if (!DRY && !seenImg.has(fileName)) {
        copyFileSync(srcImg, join(PUB_IMG, fileName));
        seenImg.add(fileName);
      }
      stats.images++;
      return `${pre}${IMG_URLBASE}/${encodeURI(fileName)}${post}`;
    }
    stats.imgMissing++;
    return `${pre}#${post} <!-- 图片缺失:${decoded} -->`;
  });

  const frontmatter = [
    "---",
    `title: ${yamlStr(title)}`,
    `icon: ${icon}`,
    `date: ${date}`,
    "category:",
    `  - ${category}`,
    ...(hidden ? ["article: false"] : []),
    "---",
    "",
  ].join("\n");

  if (!DRY) { mkdirSync(outDir, { recursive: true }); writeFileSync(outPath, frontmatter + converted + "\n", "utf8"); }

  stats.migrated++;
  if (hidden) stats.hidden++;
  stats.byCategory[category] = (stats.byCategory[category] || 0) + 1;
}

// ============ 报告 ============
console.log(`\n${DRY ? "[DRY RUN — 不写文件]" : "[已写入 " + OUT + "]"}`);
console.log(`扫描 ${stats.total} 篇 → 迁移 ${stats.migrated}(其中隐藏占位 ${stats.hidden})、跳过 ${stats.skipped}`);
console.log(`图片:拷贝 ${stats.images} 处引用、缺失 ${stats.imgMissing} 处`);
console.log("\n跳过原因:", stats.skipReasons);
console.log("\n分类分布:");
for (const [c, n] of Object.entries(stats.byCategory).sort((a, b) => b[1] - a[1])) console.log(`  ${c}: ${n}`);
