"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { isCurrentPath, type NavigationItem } from "@/content/navigation";
import { cn } from "@/lib/cn";

interface PrimaryNavigationProps {
  items: NavigationItem[];
  className?: string;
}

/** Desktop navigation. The current page keeps a short gold rule. */
export function PrimaryNavigation({ items, className }: PrimaryNavigationProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className={className}>
      <ul className="flex items-center gap-9">
        {items.map((item) => {
          const current = isCurrentPath(item, pathname);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={current ? "page" : undefined}
                className="group relative inline-flex min-h-11 items-center type-nav whitespace-nowrap text-primary"
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute bottom-2 left-0 h-px bg-ornament transition-[width] duration-base ease-out-soft",
                    current ? "w-6" : "w-0 group-hover:w-full",
                  )}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
