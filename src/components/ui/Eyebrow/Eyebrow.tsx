import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type EyebrowTone = "default" | "accent" | "inverse";

const tones: Record<EyebrowTone, string> = {
  default: "text-primary",
  accent: "text-accent",
  /** Champagne label for navy and photographic surfaces. */
  inverse: "text-accent-inverse",
};

interface EyebrowProps {
  children: ReactNode;
  tone?: EyebrowTone;
  /** Leading gold hairline. */
  rule?: boolean;
  as?: "p" | "span" | "h2" | "h3";
  id?: string;
  className?: string;
}

/** Small tracked-caps label that introduces a heading or section. */
export function Eyebrow({ children, tone = "default", rule = false, as: Tag = "p", id, className }: EyebrowProps) {
  return (
    <Tag id={id} className={cn("flex items-center gap-4 type-eyebrow", tones[tone], className)}>
      {rule && (
        <span
          aria-hidden="true"
          className={cn("h-px w-8 shrink-0", tone === "inverse" ? "bg-ornament-inverse" : "bg-ornament")}
        />
      )}
      <span>{children}</span>
    </Tag>
  );
}
