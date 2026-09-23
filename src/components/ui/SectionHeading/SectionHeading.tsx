import type { ReactNode } from "react";

import { EditorialTitle, type HeadingLevel } from "@/components/ui/EditorialTitle/EditorialTitle";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { cn } from "@/lib/cn";

export type SectionHeadingVariant = "stacked" | "ruled" | "asymmetric" | "centered";

interface SectionHeadingProps {
  variant?: SectionHeadingVariant;
  eyebrow?: ReactNode;
  title?: string | string[];
  intro?: ReactNode;
  action?: ReactNode;
  level?: HeadingLevel;
  titleId?: string;
  inverse?: boolean;
  className?: string;
}

const titleRoles: Record<SectionHeadingVariant, string> = {
  stacked: "type-h1",
  ruled: "type-h2",
  asymmetric: "type-display-m",
  centered: "type-h1",
};

/**
 * Shared eyebrow / title / intro / action pattern. Variants change the
 * composition, never the underlying type roles or tokens.
 */
export function SectionHeading({
  variant = "stacked",
  eyebrow,
  title,
  intro,
  action,
  level = 2,
  titleId,
  inverse = false,
  className,
}: SectionHeadingProps) {
  // Without a title, the eyebrow is the section's heading.
  const eyebrowNode = eyebrow && (
    <Eyebrow
      tone={inverse ? "inverse" : "default"}
      rule={variant === "stacked"}
      as={title ? "p" : (`h${level}` as "h2" | "h3")}
      id={title ? undefined : titleId}
    >
      {eyebrow}
    </Eyebrow>
  );
  const titleNode = title && (
    <EditorialTitle
      lines={title}
      level={level}
      id={titleId}
      indent={variant === "asymmetric"}
      className={cn(titleRoles[variant], variant === "centered" && "max-w-measure-title")}
    />
  );
  const introNode = intro && (
    <p className={cn("max-w-measure type-body", inverse ? "text-inverse-muted" : "text-secondary")}>
      {intro}
    </p>
  );

  if (variant === "ruled") {
    return (
      <header
        className={cn(
          "flex flex-wrap items-end justify-between gap-4 border-b pb-5",
          inverse ? "border-inverse" : "border-subtle",
          className,
        )}
      >
        <div className="flex flex-col gap-3">
          {eyebrowNode}
          {titleNode}
        </div>
        {action}
      </header>
    );
  }

  if (variant === "asymmetric") {
    return (
      <header className={cn("grid items-end gap-8 md:grid-cols-2 md:gap-16", className)}>
        <div className="flex flex-col gap-5">
          {eyebrowNode}
          {titleNode}
        </div>
        {(introNode || action) && (
          <div className="flex flex-col gap-5 border-l border-accent pl-7 md:mb-2">
            {introNode}
            {action}
          </div>
        )}
      </header>
    );
  }

  if (variant === "centered") {
    return (
      <header className={cn("flex flex-col items-center gap-5 text-center", className)}>
        {eyebrowNode}
        {titleNode}
        <span aria-hidden="true" className="flex items-center gap-2.5">
          <span className="h-px w-10 bg-ornament" />
          <span className="size-1.5 rotate-45 bg-ornament" />
          <span className="h-px w-10 bg-ornament" />
        </span>
        {introNode}
        {action}
      </header>
    );
  }

  return (
    <header className={cn("flex max-w-reading flex-col gap-5", className)}>
      {eyebrowNode}
      {titleNode}
      {introNode}
      {action}
    </header>
  );
}
