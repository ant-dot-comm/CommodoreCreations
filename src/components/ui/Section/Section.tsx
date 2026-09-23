import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

export type SectionSurface = "primary" | "secondary" | "tertiary" | "inverse";
export type SectionSpacing = "default" | "tight" | "none";

const surfaces: Record<SectionSurface, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  tertiary: "bg-tertiary",
  inverse: "bg-inverse tone-inverse",
};

const spacings: Record<SectionSpacing, string> = {
  default: "py-section",
  tight: "py-section-tight",
  none: "",
};

interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  surface?: SectionSurface;
  spacing?: SectionSpacing;
}

/** Vertical rhythm and surface color for a page band. Width lives in Container. */
export function Section({ surface = "primary", spacing = "default", className, ...props }: SectionProps) {
  return <section className={cn("relative", surfaces[surface], spacings[spacing], className)} {...props} />;
}
