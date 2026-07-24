// 一次性脚本:把 public/favicon.svg 渲染成多尺寸 PNG + favicon.ico。
// 为什么:浏览器标签页 favicon 常回退到 .ico,旧的是 Vue 图标,必须一并替换。
// 依赖 sharp(Astro 已自带)。运行:node scripts/gen-favicon.mjs
import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const pub = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
const svg = readFileSync(join(pub, "favicon.svg"));

// 1) 现代浏览器优先用的 PNG favicon(32/180)
for (const size of [32, 180]) {
  await sharp(svg, { density: 384 })
    .resize(size, size)
    .png()
    .toFile(join(pub, size === 180 ? "apple-touch-icon.png" : `favicon-${size}.png`));
  console.log(`✓ ${size === 180 ? "apple-touch-icon" : "favicon-" + size}.png`);
}

// 2) favicon.ico —— 用 32x32 PNG 数据封装成 ICO 容器(单尺寸,足够)
const png32 = await sharp(svg, { density: 384 }).resize(32, 32).png().toBuffer();
// ICO 文件头(6B) + 目录项(16B) + PNG 数据。ICO 支持内嵌 PNG(Vista+)。
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);   // reserved
header.writeUInt16LE(1, 2);   // type=1(icon)
header.writeUInt16LE(1, 4);   // count=1
const entry = Buffer.alloc(16);
entry.writeUInt8(32, 0);      // width
entry.writeUInt8(32, 1);      // height
entry.writeUInt8(0, 2);       // palette
entry.writeUInt8(0, 3);       // reserved
entry.writeUInt16LE(1, 4);    // color planes
entry.writeUInt16LE(32, 6);   // bpp
entry.writeUInt32LE(png32.length, 8);  // data size
entry.writeUInt32LE(22, 12);           // data offset(6+16)
writeFileSync(join(pub, "favicon.ico"), Buffer.concat([header, entry, png32]));
console.log(`✓ favicon.ico (${png32.length + 22} B)`);
