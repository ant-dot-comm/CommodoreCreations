import Link from "next/link";

import { Container } from "@/components/ui/Container/Container";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import type { Service } from "@/content/services";

interface ServicesStripProps {
  services: Service[];
}

/** Compact index of every service, divided by champagne hairlines. */
export function ServicesStrip({ services }: ServicesStripProps) {
  return (
    <section aria-labelledby="services-strip-title" className="pt-14 pb-18 md:pt-16">
      <Container className="flex flex-col gap-7">
        <Eyebrow as="h2" id="services-strip-title">
          Our services
        </Eyebrow>
        <ul className="grid grid-cols-2 gap-y-7 lg:grid-cols-7">
          {services.map((service) => (
            <li
              key={service.slug}
              className="border-l border-accent-soft pl-5 max-lg:odd:border-l-0 max-lg:odd:pl-0 lg:first:border-l-0 lg:first:pl-0"
            >
              <Link
                href={`/services#${service.slug}`}
                className="block pr-5 font-display text-h5 transition-colors duration-fast hover:text-accent"
              >
                {service.title}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
