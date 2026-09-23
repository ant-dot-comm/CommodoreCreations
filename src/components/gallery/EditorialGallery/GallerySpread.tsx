"use client";

import { PackingGrid } from "@egjs/react-grid";
import { useEffect, useRef, useState } from "react";

import { GalleryItem } from "@/components/gallery/GalleryItem/GalleryItem";
import { cn } from "@/lib/cn";
import { getLayoutFootprint } from "@/lib/media/layout";
import type { GalleryImage } from "@/lib/media/types";

/** Pixel size of one footprint unit. Only the proportions matter to the packer. */
const FOOTPRINT_UNIT = 64;
const GAP = 12;
/** Used for the server render, before the real ratio has been measured. */
const INITIAL_RATIO = 1.5;

/** Reads the aspect ratio CSS assigns to the spread at the current breakpoint. */
function useCssAspectRatio() {
  const ref = useRef<HTMLDivElement>(null);
  const [ratio, setRatio] = useState<number | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(() => {
      const { width, height } = element.getBoundingClientRect();
      if (width > 0 && height > 0) setRatio(Math.round((width / height) * 100) / 100);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, ratio] as const;
}

interface GallerySpreadProps {
  images: GalleryImage[];
  sizes: string;
}

/**
 * A group of images packed into one rectangle. The rectangle's aspect ratio
 * is set in CSS so the space is reserved before the layout engine runs.
 * Images are in the server HTML but stay transparent until they are placed.
 */
export function GallerySpread({ images, sizes }: GallerySpreadProps) {
  const [ref, ratio] = useCssAspectRatio();
  const [placed, setPlaced] = useState(false);

  return (
    <div
      ref={ref}
      className={cn(
        "relative w-full",
        images.length > 2 ? "aspect-portrait sm:aspect-classic lg:aspect-video" : "aspect-classic lg:aspect-cinema",
      )}
    >
      <PackingGrid
        aspectRatio={ratio ?? INITIAL_RATIO}
        gap={GAP}
        useResizeObserver
        onRenderComplete={() => setPlaced(true)}
        className={cn(
          "absolute! inset-0 transition-opacity duration-slow ease-standard",
          placed ? "opacity-100" : "opacity-0",
        )}
      >
        {images.map((image) => {
          const footprint = getLayoutFootprint(image);
          return (
            <GalleryItem
              key={image.id}
              image={image}
              sizes={sizes}
              style={{
                width: footprint.width * FOOTPRINT_UNIT,
                height: footprint.height * FOOTPRINT_UNIT,
              }}
            />
          );
        })}
      </PackingGrid>
    </div>
  );
}
