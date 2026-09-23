import Link from "next/link";

import { ImageFrame } from "@/components/media/ImageFrame/ImageFrame";
import { cn } from "@/lib/cn";
import type { GalleryImage } from "@/lib/media/types";

interface MediaTileProps {
  href: string;
  image: GalleryImage;
  title: string;
  meta?: string;
  /** Italic index such as "01". */
  numeral?: string;
  cue: string;
  /** Larger title for tiles that span several grid cells. */
  prominent?: boolean;
  sizes: string;
  /** Grid placement (col-span / row-span) from the parent mosaic. */
  className?: string;
}

/**
 * Photographic link tile: full-bleed image, navy scrim and title block.
 * Used for featured projects and portfolio categories.
 */
export function MediaTile({
  href,
  image,
  title,
  meta,
  numeral,
  cue,
  prominent = false,
  sizes,
  className,
}: MediaTileProps) {
  return (
    <Link
      href={href}
      className={cn("group relative isolate flex min-h-55 overflow-hidden bg-inverse tone-inverse", className)}
    >
      <ImageFrame image={image} sizes={sizes} decorative zoomOnHover className="absolute inset-0 -z-10" />
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-b from-transparent from-35% to-scrim/80"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-scrim/28 opacity-0 transition-opacity duration-base ease-standard group-hover:opacity-100"
      />

      <span className={cn("mt-auto flex min-w-0 flex-col", prominent ? "gap-2.5 p-5 md:p-9" : "gap-2 p-4 sm:p-5")}>
        {numeral && <span className="type-numeral text-h5 text-accent-inverse">{numeral}</span>}
        <span
          className={cn(
            "max-w-measure-title font-display text-balance hyphens-auto",
            prominent ? "text-h3 md:text-h2" : "text-h5 sm:text-h4 lg:text-h3",
          )}
        >
          {title}
        </span>
        {meta && <span className="truncate type-caption text-inverse-muted">{meta}</span>}
        <span className="flex items-center gap-3 type-label-sm whitespace-nowrap">
          <span
            aria-hidden="true"
            className="h-px w-6 bg-ornament-soft transition-[width] duration-base ease-standard group-hover:w-18"
          />
          <span className="opacity-75 transition-opacity duration-fast group-hover:opacity-100">{cue}</span>
        </span>
      </span>
    </Link>
  );
}
