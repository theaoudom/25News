/**
 * SVG sources (logos, flags, our branded placeholders) are vector assets that
 * gain nothing from Next's raster optimizer — and the optimizer rejects some of
 * them. Marking them `unoptimized` serves the original directly, which always
 * works. Raster images (jpg/png/webp) still flow through the optimizer.
 */
export const isSvg = (src: string): boolean => {
  const s = src.toLowerCase();
  return s.endsWith('.svg') || s.includes('.svg?');
};
