import Image from "next/image";

import { cn } from "@/lib/cn";
import { focalPointStyle } from "@/lib/media/layout";
import type { GalleryImage } from "@/lib/media/types";

export type ImageFrameTreatment = "plain" | "print" | "offset";

interface ImageFrameProps {
  image: GalleryImage;
  /** Responsive `sizes` hint for next/image. Always set this for fluid frames. */
  sizes: string;
  treatment?: ImageFrameTreatment;
  /** Slow zoom when an ancestor with `group` is hovered. */
  zoomOnHover?: boolean;
  /** Mark decorative when adjacent text already describes the image. */
  decorative?: boolean;
  /** Sizing and placement: aspect-*, h-*, w-*, rotate-* … */
  className?: string;
}

const treatments: Record<ImageFrameTreatment, string> = {
  plain: "",
  /** Photographic print: ivory border and a soft lifted shadow. */
  print: "border-6 border-frame shadow-print",
  offset: "",
};

/**
 * Crops an image to fill whatever box the caller sizes. The frame reserves
 * its space up front, so images never shift the layout while loading.
 */
export function ImageFrame({
  image,
  sizes,
  treatment = "plain",
  zoomOnHover = false,
  decorative = false,
  className,
}: ImageFrameProps) {
  const picture = (
    <div
      className={cn(
        "relative overflow-hidden bg-placeholder",
        treatments[treatment],
        treatment !== "offset" && className,
        treatment === "offset" && "h-full",
      )}
    >
      <Image
        src={image.src}
        alt={decorative ? "" : image.alt}
        fill
        sizes={sizes}
        preload={image.priority}
        placeholder={image.blurDataURL ? "blur" : "empty"}
        blurDataURL={image.blurDataURL}
        style={focalPointStyle(image)}
        className={cn(
          "object-cover",
          zoomOnHover && "transition-transform duration-reveal ease-out-soft group-hover:scale-103",
        )}
      />
    </div>
  );

  if (treatment !== "offset") return picture;

  return (
    <div className={cn("relative", className)}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-4 translate-y-4 border border-accent"
      />
      {picture}
    </div>
  );
}
