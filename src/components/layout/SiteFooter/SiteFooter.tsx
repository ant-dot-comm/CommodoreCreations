import Link from "next/link";
import type { ReactNode } from "react";

import { Logo } from "@/components/brand/Logo/Logo";
import { MonogramAccent } from "@/components/brand/MonogramAccent/MonogramAccent";
import { Container } from "@/components/ui/Container/Container";
import { TextLink } from "@/components/ui/TextLink/TextLink";
import { footerExploreLinks } from "@/content/navigation";
import { footerServiceSlugs, services } from "@/content/services";
import { site, telHref } from "@/content/site";

const linkClasses =
  "block py-1.5 type-body-sm text-inverse transition-colors duration-fast hover:text-accent-inverse";

function FooterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="mb-4 type-label-sm text-accent-inverse">{title}</h2>
      {children}
    </div>
  );
}

export function SiteFooter() {
  const footerServices = services.filter((service) => footerServiceSlugs.includes(service.slug));

  return (
    <footer className="relative overflow-hidden bg-deep pt-24 pb-8 tone-inverse">
      <MonogramAccent className="-top-10 -right-16 h-115 text-inverse opacity-4" />

      <Container size="standard" className="relative z-content">
        <div className="grid gap-x-10 gap-y-12 border-b border-inverse pb-14 sm:grid-cols-2 lg:grid-cols-5">
          <div className="flex flex-col items-start gap-7 sm:col-span-2">
            <Logo layout="stacked" tone="inverse" href="/" className="w-52" />
            <p className="max-w-measure-sm font-display text-h4 leading-snug font-light italic">{site.tagline}</p>
          </div>

          <FooterGroup title="Explore">
            <ul>
              {footerExploreLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClasses}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterGroup>

          <FooterGroup title="Services">
            <ul>
              {footerServices.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services#${service.slug}`} className={linkClasses}>
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterGroup>

          <div className="flex flex-col gap-7">
            <FooterGroup title="Contact">
              <a href={`mailto:${site.email}`} className={linkClasses}>
                {site.email}
              </a>
              <a href={telHref(site.phone)} className={linkClasses}>
                {site.phone}
              </a>
            </FooterGroup>
            <FooterGroup title="Service area">
              <p className="type-body-sm text-inverse-muted">{site.serviceArea}</p>
            </FooterGroup>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-7 type-caption text-inverse-muted">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <ul className="flex gap-7 sm:ml-auto">
            {site.social.map((link) => (
              <li key={link.label}>
                <TextLink href={link.href} inverse className="text-inverse">
                  {link.label}
                </TextLink>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
