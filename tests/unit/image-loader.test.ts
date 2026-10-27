import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import imageLoader, { IMAGE_WIDTHS } from "@/lib/image-loader";
import { WIDTHS, referencedImages, variantPath } from "../../scripts/optimize-images.mjs";
import nextConfig from "../../next.config";

describe("image loader", () => {
  it("maps each requested width to the next pre-built WebP size", () => {
    expect(imageLoader({ src: "/img/team/a.png", width: 300 })).toBe("/img-opt/team/a-384.webp");
    expect(imageLoader({ src: "/img/team/a.jpg", width: 640 })).toBe("/img-opt/team/a-640.webp");
    expect(imageLoader({ src: "/img/x/b.webp", width: 1200 })).toBe("/img-opt/x/b-1920.webp");
    expect(imageLoader({ src: "/img/x/b.png", width: 3840 })).toBe("/img-opt/x/b-1920.webp");
  });

  it("leaves SVGs and non-/img paths alone", () => {
    expect(imageLoader({ src: "/img/logo.svg", width: 640 })).toBe("/img/logo.svg");
    expect(imageLoader({ src: "/other.png", width: 640 })).toBe("/other.png");
  });

  it("uses the same widths as the build script and next.config", () => {
    expect([...IMAGE_WIDTHS]).toEqual(WIDTHS);
    const sizes = [...(nextConfig.images?.imageSizes ?? []), ...(nextConfig.images?.deviceSizes ?? [])];
    expect(sizes.sort((a, b) => a - b)).toEqual(WIDTHS);
  });

  it("every referenced image has all its pre-built sizes (run npm run images)", () => {
    const missing: string[] = [];
    for (const src of referencedImages() as string[]) {
      for (const w of WIDTHS as number[]) if (!existsSync(variantPath(src, w))) missing.push(variantPath(src, w));
    }
    expect(missing).toEqual([]);
  });
});
