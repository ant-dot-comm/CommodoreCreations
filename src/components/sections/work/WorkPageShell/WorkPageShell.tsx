import type { ReactNode } from "react";

import { CtaBand } from "@/components/sections/CtaBand/CtaBand";
import { WorkFilterNav } from "@/components/sections/work/WorkFilterNav/WorkFilterNav";
import { Container } from "@/components/ui/Container/Container";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import { portfolioServices } from "@/content/services";
import { site } from "@/content/site";

interface WorkPageShellProps {
  eyebrow: string;
  title: string[];
  intro: string;
  /** Slug of the active service filter; omit for "All". */
  activeSlug?: string;
  children: ReactNode;
}

/** Shared frame for the portfolio index and each service gallery. */
export function WorkPageShell({ eyebrow, title, intro, activeSlug, children }: WorkPageShellProps) {
  const filters = [
    { label: "All", href: "/work", active: !activeSlug },
    ...portfolioServices.map((service) => ({
      label: service.shortTitle,
      href: `/work/${service.slug}`,
      active: service.slug === activeSlug,
    })),
  ];

  return (
    <>
      <Container className="pt-section-tight">
        <SectionHeading variant="asymmetric" level={1} eyebrow={eyebrow} title={title} intro={intro} />
        <WorkFilterNav filters={filters} className="mt-14 mb-10" />
      </Container>
      <Container>{children}</Container>
      <div className="mt-section">
        <CtaBand
          tone="light"
          eyebrow="Now booking"
          title="Your space, next."
          body="Holiday installations are scheduled from November 1. Consultations begin in August."
          action={{ label: "Book a consultation", href: site.booking.href }}
        />
      </div>
    </>
  );
}
