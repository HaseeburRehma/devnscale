// Pre-builds the WebP sizes that src/lib/image-loader.ts points next/image at,
// so no image depends on Vercel's on-demand optimizer (and its quota).
// Run after adding or changing an image: npm run images
import { readdirSync, readFileSync, statSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import sharp from "sharp";

export const WIDTHS = [384, 640, 1080, 1920];
const QUALITY = 75;
const RASTER = /\.(png|jpe?g|webp)$/i;
// Folders whose paths are built at runtime, so they never appear in the source.
const RUNTIME_DIRS = [];

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
    d.isDirectory() ? walk(join(dir, d.name)) : [join(dir, d.name)],
  );
}

/** Every /img/… raster path the site can request. */
export function referencedImages() {
  const refs = new Set();
  for (const f of walk("src")) {
    if (!/\.(tsx?|mdx?)$/.test(f)) continue;
    for (const line of readFileSync(f, "utf8").split("\n")) {
      if (/^\s*(\/\/|\*|\/\*)/.test(line)) continue; // comments
      for (const m of line.matchAll(/\/img\/[A-Za-z0-9_./ %-]+\.(png|jpe?g|webp)/gi)) refs.add(m[0]);
    }
  }
  for (const d of RUNTIME_DIRS) {
    for (const f of walk(join("public/img", d))) if (RASTER.test(f)) refs.add("/" + f.slice("public/".length));
  }
  return [...refs].sort();
}

export const variantPath = (src, w) => join("public/img-opt", src.replace(/^\/img\//, "").replace(RASTER, "") + `-${w}.webp`);

if (import.meta.url === `file://${process.argv[1]}`) {
  let made = 0;
  const missing = [];
  for (const src of referencedImages()) {
    const input = join("public", decodeURIComponent(src));
    if (!existsSync(input)) {
      missing.push(src);
      continue;
    }
    const mtime = statSync(input).mtimeMs;
    for (const w of WIDTHS) {
      const out = variantPath(src, w);
      if (existsSync(out) && statSync(out).mtimeMs >= mtime) continue;
      mkdirSync(dirname(out), { recursive: true });
      await sharp(input).resize({ width: w, withoutEnlargement: true }).webp({ quality: QUALITY }).toFile(out);
      made++;
    }
  }
  console.log(`wrote ${made} files`);
  if (missing.length) {
    console.error("referenced but missing:\n" + missing.join("\n"));
    process.exitCode = 1;
  }
}
