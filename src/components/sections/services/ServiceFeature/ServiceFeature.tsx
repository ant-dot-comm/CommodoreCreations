import { ImageFrame } from "@/components/media/ImageFrame/ImageFrame";
import { Button } from "@/components/ui/Button/Button";
import type { Service } from "@/content/services";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

interface ServiceFeatureProps {
  service: Service;
  /** Alternate rows flip the image to the right and change the surface. */
  reversed?: boolean;
}

/** Half photograph, half description — one row per service. */
export function ServiceFeature({ service, reversed = false }: ServiceFeatureProps) {
  const headingId = `service-${service.slug}-title`;
  const action = service.portfolio
    ? { label: service.portfolio.cta, href: `/work/${service.slug}` }
    : { label: "Book a consultation", href: site.booking.href };

  return (
    <section
      id={service.slug}
      aria-labelledby={headingId}
      className={cn("grid md:grid-cols-2", reversed ? "bg-primary" : "bg-secondary")}
    >
      <ImageFrame
        image={service.image}
        sizes="(min-width: 768px) 50vw, 100vw"
        className={cn("min-h-70 md:min-h-140", reversed && "md:order-2")}
      />
      <div className="flex flex-col justify-center gap-6 px-gutter py-12 md:py-24 lg:px-20">
        <h2 id={headingId} className="max-w-measure-title type-h1">
          {service.title}
        </h2>
        <p className="max-w-measure type-body text-secondary">{service.description}</p>
        <ul className="max-w-120">
          {service.highlights.map((highlight) => (
            <li key={highlight} className="border-b border-subtle py-3 type-body-sm">
              {highlight}
            </li>
          ))}
        </ul>
        <div>
          <Button href={action.href} variant="secondary" icon="arrow-right">
            {action.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
