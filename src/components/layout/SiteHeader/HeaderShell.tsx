"use client";

import { useSyncExternalStore, type ReactNode } from "react";

const SCROLL_THRESHOLD = 80;

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

const isScrolled = () => window.scrollY > SCROLL_THRESHOLD;
const isScrolledOnServer = () => false;

/** Sticky header frame that condenses and frosts once the page scrolls. */
export function HeaderShell({ children }: { children: ReactNode }) {
  const scrolled = useSyncExternalStore(subscribe, isScrolled, isScrolledOnServer);

  return (
    <header
      data-scrolled={scrolled}
      className="sticky top-0 z-navigation h-header border-b border-transparent bg-primary transition-[height,background-color,border-color,box-shadow] duration-base ease-standard data-[scrolled=true]:border-subtle data-[scrolled=true]:bg-primary/94 data-[scrolled=true]:shadow-xs data-[scrolled=true]:backdrop-blur-md nav:h-header-lg nav:data-[scrolled=true]:h-header"
    >
      {children}
    </header>
  );
}
