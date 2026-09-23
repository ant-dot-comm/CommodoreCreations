"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Logo } from "@/components/brand/Logo/Logo";
import { MonogramAccent } from "@/components/brand/MonogramAccent/MonogramAccent";
import { Button } from "@/components/ui/Button/Button";
import { Icon } from "@/components/ui/Icon/Icon";
import { isCurrentPath, type NavigationItem } from "@/content/navigation";
import { site, telHref } from "@/content/site";
import { cn } from "@/lib/cn";

const MENU_ID = "mobile-navigation";

interface MobileNavigationProps {
  items: NavigationItem[];
  className?: string;
}

/**
 * Full-screen menu below the `nav` breakpoint. A native modal <dialog>
 * provides focus trapping, Escape to close and focus return to the trigger.
 */
export function MobileNavigation({ items, className }: MobileNavigationProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const openMenu = () => {
    dialogRef.current?.showModal();
    setOpen(true);
  };
  const closeMenu = () => dialogRef.current?.close();

  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  return (
    <div className={className}>
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls={MENU_ID}
        onClick={openMenu}
        className="-mr-3 inline-flex size-12 items-center justify-center text-primary transition-colors duration-fast hover:text-accent"
      >
        <Icon name="menu" className="size-6" />
      </button>

      <dialog
        id={MENU_ID}
        ref={dialogRef}
        aria-label="Menu"
        onClose={() => setOpen(false)}
        className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-hidden bg-inverse p-0 tone-inverse opacity-0 transition-[opacity,translate,display,overlay] transition-discrete duration-base ease-out-soft backdrop:bg-transparent open:flex open:flex-col open:opacity-100 starting:open:-translate-y-3 starting:open:opacity-0"
      >
        <div className="flex h-header shrink-0 items-center border-b border-inverse px-gutter">
          <Logo tone="inverse" className="h-9" />
          <button
            type="button"
            aria-label="Close menu"
            onClick={closeMenu}
            autoFocus
            className="-mr-3 ml-auto inline-flex size-12 items-center justify-center transition-colors duration-fast hover:text-accent-inverse"
          >
            <Icon name="close" className="size-6" />
          </button>
        </div>

        <nav aria-label="Primary" className="relative z-content flex-1 px-gutter py-8">
          <ol>
            {items.map((item, index) => {
              const current = isCurrentPath(item, pathname);
              return (
                <li key={item.href} className="border-b border-inverse">
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    aria-current={current ? "page" : undefined}
                    className="flex items-baseline gap-4 py-4.5"
                  >
                    <span className="w-6 type-numeral text-body-sm text-accent-inverse">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-h2 leading-none">{item.label}</span>
                    <span
                      aria-hidden="true"
                      className={cn("ml-auto h-px w-6 self-center bg-ornament-inverse", !current && "hidden")}
                    />
                  </Link>
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="relative z-content flex flex-col gap-5 px-gutter pt-6 pb-8">
          <Button href={site.booking.href} icon="arrow-right" onClick={closeMenu} className="w-full">
            {site.booking.label}
          </Button>
          <div className="flex flex-wrap justify-between gap-x-6 gap-y-2 type-caption text-inverse-muted">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={telHref(site.phone)}>{site.phone}</a>
          </div>
        </div>

        <MonogramAccent className="-right-24 bottom-24 h-75 text-inverse opacity-6" />
      </dialog>
    </div>
  );
}
