import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/cn";

type LogoLayout = "inline" | "stacked";
type LogoTone = "default" | "inverse";

interface LogoProps {
  layout?: LogoLayout;
  /** `inverse` switches the wordmark to ivory for navy surfaces. */
  tone?: LogoTone;
  href?: string;
  /** Size the lockup from the outside: height for inline, width for stacked. */
  className?: string;
  eager?: boolean;
}

/**
 * The CC monogram paired with the COMMODORE / CREATIONS wordmark.
 * Proportions inside the lockup are fixed; callers only set its overall size.
 */
export function Logo({ layout = "inline", tone = "default", href, className, eager = false }: LogoProps) {
  const loading = eager ? "eager" : "lazy";
  const lockup = (
    <span
      className={cn(
        "flex",
        layout === "inline" ? "h-12 items-center gap-3" : "w-52 flex-col items-center gap-4",
        className,
      )}
    >
      <Image
        src="/brand/monogram.svg"
        alt=""
        width={106}
        height={124}
        unoptimized
        loading={loading}
        className={layout === "inline" ? "h-full w-auto" : "h-auto w-[36%]"}
      />
      <Image
        src={tone === "inverse" ? "/brand/wordmark-inverse.svg" : "/brand/wordmark.svg"}
        alt="Commodore Creations"
        width={341}
        height={54}
        unoptimized
        loading={loading}
        className={layout === "inline" ? "h-[46%] w-auto" : "h-auto w-full"}
      />
    </span>
  );

  if (!href) return lockup;
  return (
    <Link href={href} className="inline-flex" aria-label="Commodore Creations, home">
      {lockup}
    </Link>
  );
}
