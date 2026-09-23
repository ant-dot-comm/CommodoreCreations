import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface TileMosaicProps {
  children: ReactNode;
  className?: string;
}

/**
 * Two-column grid on small screens, four fluid-height rows on desktop.
 * Children choose their own spans, so each section can compose its layout.
 */
export function TileMosaic({ children, className }: TileMosaicProps) {
  return (
    <div
      className={cn(
        "grid auto-rows-[13.75rem] grid-cols-2 gap-2 md:auto-rows-[clamp(16rem,21vw,21rem)] md:grid-cols-4 md:gap-3",
        className,
      )}
    >
      {children}
    </div>
  );
}
