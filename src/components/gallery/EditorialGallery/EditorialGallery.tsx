import { cn } from "@/lib/cn";
import { groupIntoSpreads } from "@/lib/media/layout";
import type { GalleryImage } from "@/lib/media/types";

import { GallerySpread } from "./GallerySpread";

interface EditorialGalleryProps {
  images: GalleryImage[];
  /** Accessible name for the gallery region. */
  label: string;
  /** Responsive `sizes` hint for the largest tile a spread can produce. */
  sizes?: string;
  className?: string;
}

/**
 * Editorial portfolio layout for any normalized image collection.
 *
 * Images are grouped into magazine-style spreads and packed by weight:
 * featured and large images claim more space, and portrait or landscape
 * images keep their orientation where possible. The packing library is an
 * implementation detail of GallerySpread and can be swapped without
 * touching callers.
 */
export function EditorialGallery({
  images,
  label,
  sizes = "(min-width: 1024px) 60vw, 90vw",
  className,
}: EditorialGalleryProps) {
  if (images.length === 0) return null;

  return (
    <section aria-label={label} className={cn("flex flex-col gap-3", className)}>
      {groupIntoSpreads(images).map((spread) => (
        <GallerySpread key={spread.map((image) => image.id).join("|")} images={spread} sizes={sizes} />
      ))}
    </section>
  );
}
