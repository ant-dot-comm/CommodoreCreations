import type { GalleryImage, ImageLayout } from "./types";

const PORTRAIT_MAX_RATIO = 0.85;
const LANDSCAPE_MIN_RATIO = 1.25;

/** Explicit layout wins; otherwise the aspect ratio decides. */
export function resolveImageLayout(image: GalleryImage): ImageLayout {
  if (image.layout) return image.layout;
  const ratio = image.width / image.height;
  if (ratio <= PORTRAIT_MAX_RATIO) return "tall";
  if (ratio >= LANDSCAPE_MIN_RATIO) return "wide";
  return "standard";
}

/**
 * Relative footprint each layout requests from the packing algorithm.
 * Units are arbitrary; only the proportions between layouts matter.
 */
const layoutFootprint: Record<ImageLayout, { width: number; height: number }> = {
  standard: { width: 2, height: 2 },
  tall: { width: 2, height: 3 },
  wide: { width: 3, height: 2 },
  large: { width: 3, height: 3 },
  featured: { width: 4, height: 3 },
};

export function getLayoutFootprint(image: GalleryImage) {
  return layoutFootprint[resolveImageLayout(image)];
}

/**
 * Splits a collection into "spreads" — small groups packed together like a
 * magazine layout. Featured images always open a new spread.
 */
export function groupIntoSpreads(images: GalleryImage[], maxPerSpread = 5) {
  const spreads: GalleryImage[][] = [];
  for (const image of images) {
    const current = spreads.at(-1);
    const startsNew =
      !current ||
      current.length >= maxPerSpread ||
      resolveImageLayout(image) === "featured";
    if (startsNew) spreads.push([image]);
    else current.push(image);
  }
  return spreads;
}

/** CSS object-position for an image's focal point, if it has one. */
export function focalPointStyle(image: GalleryImage) {
  return image.focalPoint
    ? { objectPosition: `${image.focalPoint.x}% ${image.focalPoint.y}%` }
    : undefined;
}
