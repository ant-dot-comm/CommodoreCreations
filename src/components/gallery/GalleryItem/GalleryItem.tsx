import Image from "next/image";
import type { CSSProperties } from "react";

import { cn } from "@/lib/cn";
import { focalPointStyle } from "@/lib/media/layout";
import type { GalleryImage } from "@/lib/media/types";

interface GalleryItemProps {
  image: GalleryImage;
  sizes: string;
  /** Size and position supplied by the gallery layout engine. */
  style?: CSSProperties;
  className?: string;
}

/** One photograph in an editorial gallery, cropped to the box it is given. */
export function GalleryItem({ image, sizes, style, className }: GalleryItemProps) {
  return (
    <figure style={style} className={cn("group relative m-0 overflow-hidden bg-placeholder", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        preload={image.priority}
        placeholder={image.blurDataURL ? "blur" : "empty"}
        blurDataURL={image.blurDataURL}
        style={focalPointStyle(image)}
        className="object-cover transition-transform duration-reveal ease-out-soft group-hover:scale-103"
      />
      {image.caption && <figcaption className="sr-only">{image.caption}</figcaption>}
    </figure>
  );
}
