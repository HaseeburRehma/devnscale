/**
 * next/image loader that points at WebP sizes pre-built by
 * scripts/optimize-images.mjs (public/img-opt), so images never go through
 * Vercel's on-demand optimizer, whose quota ran out (402 for uncached sizes).
 * The widths here must match the script's WIDTHS and next.config's sizes.
 */
export const IMAGE_WIDTHS = [384, 640, 1080, 1920] as const;

export default function imageLoader({ src, width }: { src: string; width: number }) {
  if (!src.startsWith("/img/") || !/\.(png|jpe?g|webp)$/i.test(src)) return src;
  const w = IMAGE_WIDTHS.find((x) => x >= width) ?? IMAGE_WIDTHS[IMAGE_WIDTHS.length - 1];
  return `/img-opt/${src.slice(5).replace(/\.(png|jpe?g|webp)$/i, "")}-${w}.webp`;
}
