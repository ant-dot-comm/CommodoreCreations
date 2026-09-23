import Link from "next/link";

import { cn } from "@/lib/cn";

interface WorkFilter {
  label: string;
  href: string;
  active: boolean;
}

interface WorkFilterNavProps {
  filters: WorkFilter[];
  className?: string;
}

/**
 * Portfolio filters. Each filter is a page, so they are links rather than tabs.
 * On narrow screens the row scrolls sideways instead of wrapping.
 */
export function WorkFilterNav({ filters, className }: WorkFilterNavProps) {
  return (
    <nav aria-label="Filter work by service" className={cn("border-b border-subtle", className)}>
      <ul className="-mb-px flex gap-x-7 overflow-x-auto [scrollbar-width:none] md:flex-wrap md:overflow-visible">
        {filters.map((filter) => (
          <li key={filter.href}>
            <Link
              href={filter.href}
              aria-current={filter.active ? "page" : undefined}
              scroll={false}
              className={cn(
                "inline-flex min-h-11 items-end border-b pb-3.5 type-nav whitespace-nowrap transition-colors duration-fast",
                filter.active
                  ? "border-accent text-primary"
                  : "border-transparent text-muted hover:text-primary",
              )}
            >
              {filter.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
