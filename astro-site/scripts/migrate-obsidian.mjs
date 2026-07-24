// ============================================================
// 阶段2 迁移脚本:Obsidian vault → Astro content collection
//
// 用法:node scripts/migrate-obsidian.mjs [--dry]
//   --dry 只统计不写文件(先看清单再真跑)
//
// 策略(用户已定):
//   - 日期:不显示(vault mtime 全是导入日不可靠)→ 仍写 date 字段(schema 必填)但用 git 首次提交时间兜底,
//           博客页不展示日期、不按日期排序(改按分类+标题)。
//   - 空占位桩(type:placeholder / 正文仅"待补充"):迁入但标 draft:true(不上列表,不丢文件)。
//   - 过滤:无标题文档/未命名/(1)冲突副本 直接跳过。
//   - 分类:英文目录名映射中文(见 CATEGORY_MAP)。
//   - Obsidian 语法:wiki 链接 [[x]]→纯文本;图片嵌入 ![[x.png]]→标准 ![](x.png)。
//   - 图片:各 assets/ 目录连同 md 的相对关系保留(见 migrate-images 步骤,本脚本先只搬 md+改引用)。
// ============================================================
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, existsSync, copyFileSync } from "node:fs";
import { join, relative, dirname, basename, extname } from "node:path";
import { execSync } from "node:child_process";

const VAULT = "D:/obsidian workspace";
const OUT = "src/content/posts";
const DRY = process.argv.includes("--dry");

// 顶层目录 → 中文分类名(用户审定)
const CATEGORY_MAP = {
  AI_INFRA_SRE: "AI 基础设施",
  Agent_development: "Agent 开发",
  计算机网络: "计算机网络",
  面试: "面试",
  默认知识库: "杂项笔记",
  web集群: "Web 集群",
  Docker: "Docker",
  "OpenClaw_+_多Agent协同的下一代AIOPS平台": "AIOps 平台",
  python开发: "Python 开发",
  GitHub: "GitHub",
  数据库: "数据库",
  go语言开发: "Go 开发",
};

// —— slug 化:中文保留、空格/特殊字符转连字符,URL 安全 ——
// 为什么保留中文:Astro/现代浏览器支持中文 URL(会自动 encode),比转拼音更可读、更好维护。
function slugify(s) {
  return s
    .replace(/\.md$/i, "")
    .replace(/[()（）,，"""']/g, "")       // 去括号/逗号/引号
    .replace(/[\s_]+/g, "-")               // 空格/下划线 → 连字符
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

// —— 判断是否跳过(占位/空壳/冲突副本)——
function shouldSkip(relPath, raw) {
  const name = basename(relPath);
  if (/^(无标题文档|未命名|Untitled)/i.test(name)) return "占位文件名";
  if (/ \(\d+\)\.md$/i.test(name)) return "同步冲突副本";
  // vault 根目录的 README(说明文件/乱码 BOM 空文件),不是文章
  if (/^README\.md$/i.test(name) && !relPath.includes("/")) return "vault 说明文件";
  return null;
}

// —— 判断是否空占位桩(标 draft,不跳过)——
function isPlaceholder(fm, body) {
  if (fm.type === "placeholder") return true;
  // 正文去掉标题后只剩"待补充"之类
  const stripped = body.replace(/^#\s+.*$/m, "").trim();
  return stripped === "待补充" || stripped === "";
}

// —— 极简 frontmatter 解析(vault 里 fm 简单,不引 yaml 库)——
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

// —— git 首次提交时间(兜底日期;拿不到用今天)——
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

// —— Obsidian 语法转换 ——
function convertSyntax(body) {
  return body
    // 图片嵌入 ![[x.png|alt]] / ![[x.png]] → ![](x.png)
    .replace(/!\[\[([^\]|]+?\.(?:png|jpe?g|gif|webp|svg))(?:\|[^\]]*)?\]\]/gi,
      (_, p) => `![](${encodeURI(p.trim())})`)
    // wiki 链接 [[页面|显示]] → 显示(纯文本,去链接);[[页面]] → 页面
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$2")
    .replace(/\[\[([^\]]+)\]\]/g, "$1");
}

// —— YAML 值转义(标题可能含冒号/引号)——
function yamlStr(s) {
  return `"${String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

// —— 递归收集所有 md ——
function walk(dir, acc = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === ".git" || e.name === ".obsidian" || e.name === "assets") continue;
      walk(p, acc);
    } else if (e.name.endsWith(".md")) {
      acc.push(p);
    }
  }
  return acc;
}

// ============ 主流程 ============
const files = walk(VAULT);
const stats = { total: files.length, migrated: 0, draft: 0, skipped: 0, byCategory: {}, skipReasons: {} };
const seenPaths = new Set();   // slug 碰撞防护:两篇 slug 相同会静默覆盖 → 检测并加后缀

for (const abs of files) {
  const rel = relative(VAULT, abs).replace(/\\/g, "/");
  const parts = rel.split("/");
  const topDir = parts.length > 1 ? parts[0] : "杂项笔记";

  const raw = readFileSync(abs, "utf8");
  const { fm, body } = parseFrontmatter(raw);

  const skip = shouldSkip(rel, raw);
  if (skip) {
    stats.skipped++;
    stats.skipReasons[skip] = (stats.skipReasons[skip] || 0) + 1;
    continue;
  }

  const title = fm.title || basename(rel).replace(/\.md$/i, "");
  const category = CATEGORY_MAP[topDir] || topDir;
  const isDraft = isPlaceholder(fm, body);
  const date = gitFirstDate(abs);

  let converted = convertSyntax(body).trim();

  // 目标路径:保留分类目录层级(用 slug 化的目录 + 文件名)
  const outRelDir = parts.slice(0, -1).map(slugify).join("/");
  let baseSlug = slugify(basename(rel)) || "untitled";   // 纯标点标题兜底,不出空 .md
  // slug 碰撞防护:同路径已存在则加 -2/-3… 后缀,避免静默覆盖丢文件
  let outName = baseSlug + ".md";
  let n = 1;
  while (seenPaths.has(join(outRelDir, outName))) { n++; outName = `${baseSlug}-${n}.md`; }
  seenPaths.add(join(outRelDir, outName));
  const outDir = join(OUT, outRelDir);
  const outPath = join(outDir, outName);

  // —— 图片本地化:把正文引用到的本地图片从 vault 拷到输出、统一重写成同级 assets/ 相对路径 ——
  // 语雀导入器路径风格不一致:同一篇里可能混用 `assets/foo.png`(相对 md 目录)
  // 和 `Docker/docker/assets/foo.png`(相对 vault 根)。两种基准都试着定位真实文件。
  // 全部归一成 `assets/<文件名>` 输出,图片拷到 outDir/assets/,消除路径风格差异。
  // 用单次正则回调替换(不用 split/join——含 -9/-19 这类子串重叠时 split 会误伤)。
  const mdDir = dirname(abs);
  const IMG_EXT = /\.(png|jpe?g|gif|webp|svg)$/i;
  // 图片引用正则:路径含扩展名后紧跟 ) 才收尾。用 [\s\S]*? 非贪婪 + 扩展名锚点,
  // 容忍文件名里的括号(如 MySQL(关系型数据库)-9.png)——普通 [^)]+ 会在第一个 ) 截断。
  const IMG_RE = /(!\[[^\]]*\]\()([\s\S]*?\.(?:png|jpe?g|gif|webp|svg))(\))/gi;
  converted = converted.replace(IMG_RE, (whole, pre, refPath, post) => {
    if (/^https?:/i.test(refPath) || refPath === "#") return whole;   // 外链/已降级
    const decoded = decodeURIComponent(refPath.trim());
    if (!IMG_EXT.test(decoded)) return whole;                         // 非图片
    // 三个基准:①md 同级 ②父目录(笔记常在同名子目录里,assets 在父级)③vault 根(绝对风格引用)
    const srcImg = [join(mdDir, decoded), join(dirname(mdDir), decoded), join(VAULT, decoded)].find((c) => existsSync(c));
    const fileName = basename(decoded);
    if (srcImg) {
      const dstImg = join(outDir, "assets", fileName);
      if (!DRY) { mkdirSync(join(outDir, "assets"), { recursive: true }); copyFileSync(srcImg, dstImg); }
      stats.images = (stats.images || 0) + 1;
      return `${pre}assets/${encodeURI(fileName)}${post}`;
    }
    stats.imgMissing = (stats.imgMissing || 0) + 1;
    return `${pre}#${post} <!-- 图片缺失:${decoded} -->`;
  });

  const frontmatter = [
    "---",
    `title: ${yamlStr(title)}`,
    `date: ${date}`,
    `category: ${yamlStr(category)}`,
    ...(isDraft ? ["draft: true"] : []),
    "---",
    "",
  ].join("\n");

  if (!DRY) {
    mkdirSync(outDir, { recursive: true });
    writeFileSync(outPath, frontmatter + converted + "\n", "utf8");
  }

  stats.migrated++;
  if (isDraft) stats.draft++;
  stats.byCategory[category] = (stats.byCategory[category] || 0) + 1;
}

// ============ 报告 ============
console.log(`\n${DRY ? "[DRY RUN — 不写文件]" : "[已写入 " + OUT + "]"}`);
console.log(`扫描 ${stats.total} 篇 → 迁移 ${stats.migrated}(其中 draft 占位 ${stats.draft})、跳过 ${stats.skipped}`);
console.log(`图片:拷贝 ${stats.images || 0} 张、缺失降级 ${stats.imgMissing || 0} 处`);
console.log("\n跳过原因:", stats.skipReasons);
console.log("\n分类分布:");
for (const [c, n] of Object.entries(stats.byCategory).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${c}: ${n}`);
}
