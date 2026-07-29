// ============================================================
// 构建后校验:博客顶栏/侧边栏里的**站内**链接是否都指向真实存在的产物文件。
//
// 为什么需要:2026-07 顶栏有四条死链在线上跑了一段时间没人发现 ——
//   · 「AI 助手」写 `/ai/`,被 base(`/blog/`)加前缀成 `/blog/ai/` → 404
//   · 三个含 ASCII 字母的分类写成 `AI基础设施`,而 theme-hope 把聚合页 slugify 成
//     小写 `ai基础设施` → 404。这三个分类合计 312 篇,占全站 59%。
// 纯中文分类没有大小写之分所以没中招,于是"看着大部分都能点"掩盖了问题。
// 单元测试碰不到这类 bug(它是配置与产物目录结构之间的错配),只能构建后比对。
//
// 用法(在仓库根,先 build):
//   node scripts/check-navbar-links.mjs
// 退出码非 0 = 有死链。CI 在 build 之后跑它,死链直接挡下部署。
//
// 只查站内链接;http(s) 外链不碰(不做网络请求,离线可跑、不受第三方站点抖动影响)。
// ============================================================
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, resolve, sep } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const DIST = join(ROOT, "blog/src/.vuepress/dist");
const BASE = "/blog/";

if (!existsSync(DIST)) {
  console.error(`✗ 找不到构建产物 ${DIST}\n  先跑:cd blog && npm run docs:build`);
  process.exit(1);
}

/** 从产物 HTML 里抽出顶栏区域的所有 href(校验的是**真实渲染结果**,而不是重新解释配置文件 —— */
/*  配置到 URL 之间的 base 前缀、slugify 都是 theme 的行为,重新实现一遍等于把 bug 抄两份)。 */
const home = readFileSync(join(DIST, "index.html"), "utf8");
// 实际标记是 `<header id="navbar" class="vp-navbar" vp-navbar>`:
// 按 id 定位而不是 `<header class=...`,后者要求 class 紧跟标签名,中间多一个属性就匹配不到。
const navMatch = home.match(/<header[^>]*id="navbar"[\s\S]*?<\/header>/);
if (!navMatch) {
  console.error("✗ 没在 index.html 里定位到顶栏(<header id=\"navbar\">)。\n"
    + "  theme-hope 可能改了结构 —— 请更新本脚本的选择器,别直接删掉这个校验。");
  process.exit(1);
}
const hrefs = [...new Set([...navMatch[0].matchAll(/href="([^"]+)"/g)].map((m) => m[1]))];

const internal = hrefs.filter((h) => !/^(https?:)?\/\//.test(h) && !h.startsWith("mailto:"));
const external = hrefs.filter((h) => /^https?:\/\//.test(h));

/** 站内 URL → 产物文件路径。`/blog/x/` → dist/x/index.html;`/blog/x.html` → dist/x.html */
function toFile(href) {
  let p = decodeURIComponent(href.split(/[?#]/)[0]);
  if (!p.startsWith(BASE)) return null;             // 落在 base 之外 = 一定 404
  p = p.slice(BASE.length);
  if (p === "" || p.endsWith("/")) p += "index.html";
  return join(DIST, p);
}

/** 大小写敏感地判断文件是否存在。
 *
 * **不能用 existsSync** —— macOS 的 APFS 默认大小写不敏感,
 * `dist/category/AI基础设施/index.html` 在本地会返回 true(实际目录是 `ai基础设施`),
 * 而 Linux 服务器大小写敏感、线上就是 404。这个校验本来就是为了逮"大小写写错"这类 bug,
 * 若用 existsSync 就恰好对它失效 —— 变异测试证实过:注入大写分类后本地校验照样全绿。
 * 所以逐段 readdir 做精确比对。
 */
function existsExact(abs) {
  const rel = abs.slice(DIST.length).replace(/^[/\\]/, "");
  let dir = DIST;
  for (const seg of rel.split(sep)) {
    let entries;
    try { entries = readdirSync(dir); } catch { return false; }
    if (!entries.includes(seg)) return false;       // includes = 精确比对,不受 FS 大小写策略影响
    dir = join(dir, seg);
  }
  return true;
}

const dead = [];
for (const href of internal) {
  const f = toFile(href);
  if (f === null) {
    dead.push([href, `不在 base(${BASE})下 —— 站内相对链接会被加 base 前缀,想指向站外应用请用绝对 URL`]);
  } else if (!existsExact(f)) {
    const hint = existsSync(f) ? "(大小写不符 —— 本地 FS 不敏感所以看着像存在,Linux 上是 404)" : "";
    dead.push([href, `产物里没有 ${f.replace(DIST, "dist")}${hint}`]);
  }
}

console.log(`顶栏链接:站内 ${internal.length} 条、外链 ${external.length} 条(外链不校验)`);
if (dead.length === 0) {
  console.log("✓ 站内链接全部指向真实产物");
  process.exit(0);
}
console.error(`\n✗ 检出 ${dead.length} 条死链:`);
for (const [href, why] of dead) console.error(`  ${href}\n      ${why}`);
console.error("\n提示:分类聚合页的路径是 slugify 过的(ASCII 转小写),"
  + "见 blog/src/.vuepress/navbar.ts 顶部注释。");
process.exit(1);
