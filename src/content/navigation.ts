export interface NavigationItem {
  label: string;
  href: string;
  /** Additional path prefixes that should mark this item as current. */
  matches?: string[];
}

export const primaryNavigation: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "Our Work", href: "/work", matches: ["/projects"] },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export const footerExploreLinks: NavigationItem[] = [
  { label: "Our Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "/services#process" },
];

export function isCurrentPath(item: NavigationItem, pathname: string) {
  if (item.href === "/") return pathname === "/";
  return [item.href, ...(item.matches ?? [])].some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}
