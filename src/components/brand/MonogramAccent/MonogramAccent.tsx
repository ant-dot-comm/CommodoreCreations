import { cn } from "@/lib/cn";

interface MonogramAccentProps {
  /**
   * Position, height, color (text-*) and opacity. The design system allows
   * 4–28% opacity for oversized monogram fragments.
   */
  className?: string;
}

/** Oversized, cropped CC monogram silhouette used as a background accent. */
export function MonogramAccent({ className }: MonogramAccentProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute z-decorative block aspect-[106/124] mask-monogram select-none",
        className,
      )}
    />
  );
}
