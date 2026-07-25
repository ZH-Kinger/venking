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

// vault 路径:优先 CLI `--vault=<path>`,其次环境变量 OBSIDIAN_VAULT,最后默认克隆缓存目录。
// 不再写死 D:/(换机即失效)。publish.mjs 会先把私有 obisidian 仓库 clone/pull 到该缓存目录。
function argVal(flag) { const a = process.argv.find((s) => s.startsWith(flag + "=")); return a ? a.slice(flag.length + 1) : null; }
const VAULT = argVal("--vault") || process.env.OBSIDIAN_VAULT || ".cache/obsidian-vault";
const OUT = "blog/src/posts";                          // 博客已下沉到 blog/(结构规范化 2026-07-24)

// 已知真密钥/PII 精确 denylist(gitignored,不入库;每行一条,# 注释)。
// 用途:精确复现人工脱敏、且补上人工漏掉的位置。源头治理仍应回 Obsidian 改成占位 + 轮换密钥。
const DENYLIST_FILE = "scripts/.secrets-denylist";
const DENYLIST = existsSync(DENYLIST_FILE)
  ? readFileSync(DENYLIST_FILE, "utf8").split("\n").map((s) => s.trim()).filter((s) => s && !s.startsWith("#"))
  : [];
const PUB_IMG = "blog/src/.vuepress/public/assets/posts";  // 图片落地(public 下)
const IMG_URLBASE = "/blog/assets/posts";              // 引用绝对路径(URL,base=/blog/,不随目录改)
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

// 日期结转:清空 posts 前先记录现有文章「输出相对路径 → date」,重写时同一篇沿用旧日期。
// obisidian 私有仓库可能只有浅历史(单提交)→ gitFirstDate 会把所有文章打成同一天;
// 结转旧日期使日期稳定不塌,且未变文章 frontmatter 不变(避免 RAG 重复 embedding、烧额度)。
function readExistingDates(dir, acc = {}) {
  if (!existsSync(dir)) return acc;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) readExistingDates(p, acc);
    else if (e.name.endsWith(".md")) {
      const { fm } = parseFrontmatter(readFileSync(p, "utf8"));
      if (fm.date) acc[relative(OUT, p).replace(/\\/g, "/")] = fm.date;
    }
  }
  return acc;
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

// —— 密钥脱敏(安全闸门)——
// vault 是私有笔记,代码块里常留真实密钥;而博客是公开站(GitHub Pages)。
// 这里在写入 posts 前扫描并打码,杜绝"私有笔记的密钥被同步进公开博客"。
// 命中项会在末尾报告(供你回 Obsidian 源头也改成占位)。非阻塞:先保证发布安全,再清源头。
const SECRET_ASSIGN =
  /((?:dashscope\.)?\b(?:api[_-]?key|apikey|secret[_-]?key|secret|access[_-]?key[_-]?id|access[_-]?key[_-]?secret|password|passwd|pwd|app[_-]?id|mail[_-]?pass(?:word)?|smtp[_-]?pass(?:word)?)\b\s*[:=]\s*)(["'])(.*?)\2/gi;
const PLACEHOLDER_RE = /^\s*$|YOUR|你的|有效API|xxx|<[^>]*>|example|changeme|placeholder|redacted|填|\*{3,}/i;
function redactSecrets(body, rel, stats) {
  let n = 0;
  let out = body;
  // ① 精确 denylist:scripts/.secrets-denylist(gitignored)里登记的已知真密钥/PII。
  //    零误伤,能抓正文、代码、URL 任意位置——用于精确复现人工脱敏,并补上人工漏掉的处。
  for (const lit of DENYLIST) {
    const re = new RegExp(lit.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
    out = out.replace(re, () => { n++; return "<REDACTED>"; });
  }
  // ② 赋值式兜底:api_key/password/app_id/... = "真值"。放过明显占位与过短值(玩具值如 1234/KEY/...)。
  out = out.replace(SECRET_ASSIGN, (m, pre, q, val) => {
    if (PLACEHOLDER_RE.test(val) || val.length < 10) return m;
    n++;
    return `${pre}${q}<REDACTED>${q}`;
  });
  // ③ 独立出现的 sk- 形态密钥(prose 里/未加引号)
  out = out.replace(/\bsk-[A-Za-z0-9]{16,}\b/g, () => { n++; return "sk-<REDACTED>"; });
  if (n) { stats.redacted += n; stats.redactedFiles.push(`${rel}(${n})`); }
  return out;
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
// 日期结转表:必须在清空 OUT 之前读取现有文章日期(供上面循环沿用)。
const priorDates = readExistingDates(OUT);

// 全量替换:先清空 src/posts(posts 受 venking git 跟踪,可 git checkout 回滚)
if (!DRY) {
  if (existsSync(OUT)) rmSync(OUT, { recursive: true, force: true });
  mkdirSync(OUT, { recursive: true });
  mkdirSync(PUB_IMG, { recursive: true });
}

const files = walk(VAULT);
const stats = { total: files.length, migrated: 0, hidden: 0, skipped: 0, images: 0, imgMissing: 0, byCategory: {}, skipReasons: {}, redacted: 0, redactedFiles: [] };
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

  let converted = convertSyntax(body).trim();
  converted = redactSecrets(converted, rel, stats);   // 安全闸门:密钥不进公开博客

  // 输出路径:保留原目录层级 + 原文件名(不 slugify,中文 URL);仅顶层目录换成中文分类名
  const subDirs = parts.slice(1, -1);                       // 分类下的子目录(原样保留)
  const outRelDir = [category, ...subDirs].join("/");
  let outName = basename(rel);
  let n = 1;
  while (seenPaths.has(join(outRelDir, outName))) { n++; outName = basename(rel).replace(/\.md$/i, `-${n}.md`); }
  seenPaths.add(join(outRelDir, outName));
  const outDir = join(OUT, outRelDir);
  const outPath = join(outDir, outName);

  // 日期优先级:vault 笔记自带 date > 结转的旧日期 > git 首次提交日 > 今天
  const outKey = join(outRelDir, outName).replace(/\\/g, "/");
  const date = fm.date || priorDates[outKey] || gitFirstDate(abs);

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
if (stats.redacted) {
  console.log(`\n🔒 已脱敏 ${stats.redacted} 处疑似密钥(未进公开博客)。建议回 Obsidian 源头也改成占位并轮换泄露的密钥:`);
  for (const f of stats.redactedFiles) console.log(`   - ${f}`);
} else {
  console.log("\n🔒 未检出明文密钥。");
}
console.log("\n跳过原因:", stats.skipReasons);
console.log("\n分类分布:");
for (const [c, n] of Object.entries(stats.byCategory).sort((a, b) => b[1] - a[1])) console.log(`  ${c}: ${n}`);
