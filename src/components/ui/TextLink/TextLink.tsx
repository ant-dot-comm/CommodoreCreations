import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { Icon } from "@/components/ui/Icon/Icon";
import { cn } from "@/lib/cn";

type TextLinkVariant = "arrow" | "inline";

interface TextLinkProps extends ComponentPropsWithoutRef<typeof Link> {
  variant?: TextLinkVariant;
  /** Use on dark surfaces. */
  inverse?: boolean;
}

export function TextLink({
  variant = "inline",
  inverse = false,
  className,
  children,
  ...props
}: TextLinkProps) {
  if (variant === "arrow") {
    return (
      <Link
        {...props}
        className={cn(
          "group inline-flex min-h-11 items-center gap-3 type-label transition-colors duration-fast ease-standard",
          inverse ? "text-inverse hover:text-accent-inverse" : "text-primary hover:text-accent",
          className,
        )}
      >
        <span className={cn("border-b pb-1", inverse ? "border-accent-inverse" : "border-accent")}>
          {children}
        </span>
        <Icon
          name="arrow-right"
          className="size-4 transition-transform duration-base ease-out-soft group-hover:translate-x-1"
        />
      </Link>
    );
  }

  return (
    <Link
      {...props}
      className={cn(
        "underline decoration-1 underline-offset-[0.3em] transition-colors duration-fast ease-standard",
        inverse
          ? "decoration-ornament-inverse hover:text-accent-inverse"
          : "decoration-ornament hover:text-accent",
        className,
      )}
    >
      {children}
    </Link>
  );
}
