import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";

export type ContainerSize = "wide" | "standard" | "reading" | "full";

const sizes: Record<ContainerSize, string> = {
  wide: "max-w-wide",
  standard: "max-w-standard",
  reading: "max-w-reading",
  full: "max-w-none",
};

interface ContainerProps {
  children: ReactNode;
  size?: ContainerSize;
  /** Drop the page gutters, e.g. for content that is already inset. */
  bleed?: boolean;
  as?: ElementType;
  className?: string;
}

/** The single source of page max-widths and responsive gutters. */
export function Container({
  children,
  size = "wide",
  bleed = false,
  as: Tag = "div",
  className,
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full", sizes[size], !bleed && "px-gutter", className)}>
      {children}
    </Tag>
  );
}
