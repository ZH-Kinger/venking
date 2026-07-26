// ============================================================
// 一键发布闭环:私有 obisidian 仓库 → 博客 posts → RAG 索引 → 前端构建
//
// 用法(在仓库根运行):
//   node scripts/publish.mjs               # 拉取 → 同步 → ingest → build(全自动)
//   node scripts/publish.mjs --dry         # 只拉取 + 同步的 dry-run(看 diff,不写、不 ingest、不 build)
//   node scripts/publish.mjs --no-pull     # 用现有 vault 缓存,不 git pull
//   node scripts/publish.mjs --no-ingest   # 跳过 RAG 重建
//   node scripts/publish.mjs --no-build    # 跳过前端构建
//
// 私有仓库鉴权:复用本机 git 凭据助手(keychain 里已存 token,clone 已验证可用)。
// 全程 GIT_TERMINAL_PROMPT=0:token 失效时直接报错,而非挂起等输入。
// 浅克隆(--depth 1):体积小、抗直连 GitHub 的偶发断连。文章日期靠同步脚本的「日期结转」
// (从现有 posts 沿用),不依赖 git 历史;真·新增文章用单提交日/今天兜底,足够。
// ============================================================
import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const REPO_URL = "https://github.com/ZH-Kinger/obisidian.git";
const VAULT_DIR = join(REPO_ROOT, ".cache", "obsidian-vault");

const DRY = process.argv.includes("--dry");
const NO_PULL = process.argv.includes("--no-pull");
const NO_INGEST = process.argv.includes("--no-ingest");
const NO_BUILD = process.argv.includes("--no-build");
const DEPLOY = process.argv.includes("--deploy");   // 构建后 rsync 博客到生产服务器(本地→服务器快)

const GIT_ENV = { ...process.env, GIT_TERMINAL_PROMPT: "0" };
// 关掉可能干扰 git 的代理(与本仓库既有 push 约定一致)
const GIT_NOPROXY = ["-c", "http.proxy=", "-c", "https.proxy="];

function run(cmd, args, opts = {}) {
  console.log(`\n$ ${cmd} ${args.join(" ")}`);
  const r = spawnSync(cmd, args, { cwd: REPO_ROOT, stdio: "inherit", ...opts });
  if (r.status !== 0) {
    console.error(`\n✗ 失败(exit ${r.status ?? "signal " + r.signal}):${cmd} ${args.join(" ")}`);
    process.exit(r.status ?? 1);
  }
  return r;
}

// ① 拉取私有 obisidian 仓库到缓存目录(首次 clone,之后 pull)
if (!NO_PULL) {
  if (existsSync(join(VAULT_DIR, ".git"))) {
    console.log("① git pull 更新 vault 缓存 …");
    run("git", [...GIT_NOPROXY, "-C", VAULT_DIR, "pull", "--ff-only"], { env: GIT_ENV });
  } else {
    console.log("① 首次浅克隆 obisidian 私有仓库(--depth 1,抗断连)…");
    run("git", [...GIT_NOPROXY, "clone", "--depth", "1", REPO_URL, VAULT_DIR], { env: GIT_ENV });
  }
} else {
  console.log("①(--no-pull:用现有 vault 缓存)");
  if (!existsSync(VAULT_DIR)) {
    console.error(`✗ 缓存不存在:${VAULT_DIR};先不带 --no-pull 跑一次以完成首次 clone。`);
    process.exit(1);
  }
}

// ② 同步 vault → blog/src/posts(全量替换 + 日期结转)
console.log(`\n② 同步 vault → blog/src/posts${DRY ? "(dry-run)" : ""} …`);
run("node", ["scripts/sync-obsidian-to-vuepress.mjs", ...(DRY ? ["--dry"] : [])], {
  env: { ...process.env, OBSIDIAN_VAULT: VAULT_DIR },
});

if (DRY) {
  console.log("\n[dry-run] 未写文件。若执行,posts 会有如下变更(git status):");
  run("git", ["status", "--short", "blog/src/posts"]);
  console.log("\n确认无误后去掉 --dry 重跑,即执行真写入 + 图片压缩 + ingest + build。");
  process.exit(0);
}

// ②.5 压缩文章图片(降到最大边 1600 + 质量,10× 缩小,解决大图加载慢)
console.log("\n②.5 压缩文章图片 …");
run("node", ["scripts/optimize-images.mjs"]);

// ③ 重建 RAG 索引(LangChain Indexing API 幂等增量:只处理变化的 chunk)
if (!NO_INGEST) {
  console.log("\n③ 重建 RAG 索引(python -m blog_rag.ingest)…");
  const venvPy = join(REPO_ROOT, "rag-server", ".venv", "bin", "python");
  run(existsSync(venvPy) ? venvPy : "python3", ["-m", "blog_rag.ingest"], {
    cwd: join(REPO_ROOT, "rag-server"),
  });
} else {
  console.log("\n③(--no-ingest:跳过 RAG 重建)");
}

// ④ 重建博客前端
if (!NO_BUILD) {
  console.log("\n④ 重建博客前端(npm run docs:build)…");
  run("npm", ["run", "docs:build"], { cwd: join(REPO_ROOT, "blog") });
} else {
  console.log("\n④(--no-build:跳过前端构建)");
}

// ⑤ (可选)部署到生产服务器 —— 本地→服务器传输快(CI 跨太平洋到中国服务器极慢,故放本地)。
//    服务器地址存 gitignored 的 scripts/.deploy-target(内容如 root@1.2.3.4),避免 IP 入公开仓。
if (DEPLOY) {
  const TARGET_FILE = "scripts/.deploy-target";
  if (!existsSync(TARGET_FILE)) {
    console.log(`\n⑤(--deploy 但缺 ${TARGET_FILE};新建它、内容填 user@host 再跑;或手动 rsync)`);
  } else {
    const target = readFileSync(TARGET_FILE, "utf8").trim();
    console.log(`\n⑤ rsync 博客 → 服务器 ${target}:/usr/share/nginx/html/blog …`);
    // 增量同步(只传改动);用户默认 SSH key 由 ssh 自行匹配(如需指定,配 ~/.ssh/config)
    run("rsync", ["-az", "--delete", "blog/src/.vuepress/dist/", `${target}:/usr/share/nginx/html/blog/`]);
    console.log("✅ 博客已同步到服务器。RAG 向量库若有更新:cd rag-server && SERVER=" + target + " bash deploy.sh");
  }
} else {
  console.log("\n⑤(未加 --deploy:跳过服务器部署。加 --deploy 可 rsync 博客到服务器)");
}

// ⑥ 变更摘要(审阅后自行 commit;posts/图片已 gitignore)
console.log("\n⑥ 变更摘要(git status):");
run("git", ["status", "--short"]);
console.log(
  "\n✅ 闭环完成。commit & push(触发 CI 部署 GitHub Pages);服务器主站已由 --deploy 同步(或手动)。" +
    "\n   线上 RAG 生效:cd rag-server && SERVER=<user@host> bash deploy.sh(推新 chroma)。",
);
