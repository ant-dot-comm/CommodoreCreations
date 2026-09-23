import Link from "next/link";

import type { Project } from "@/content/projects";
import { cn } from "@/lib/cn";

interface ProjectPagerProps {
  next: Project;
}

const linkClasses =
  "group flex flex-col gap-2.5 px-gutter py-10 transition-colors duration-fast hover:bg-tertiary";

/** Back to the portfolio, forward to the next project. */
export function ProjectPager({ next }: ProjectPagerProps) {
  return (
    <nav aria-label="Project navigation" className="grid grid-cols-2 border-y border-subtle">
      <Link href="/work" className={linkClasses}>
        <span className="type-label-sm text-muted">Back to</span>
        <span className="font-display text-h3">Our work</span>
      </Link>
      <Link href={`/projects/${next.slug}`} className={cn(linkClasses, "items-end border-l border-subtle text-right")}>
        <span className="type-label-sm text-muted">Next project</span>
        <span className="font-display text-h3">{next.title}</span>
      </Link>
    </nav>
  );
}
