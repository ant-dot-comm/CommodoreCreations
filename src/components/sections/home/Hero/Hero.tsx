import { MonogramAccent } from "@/components/brand/MonogramAccent/MonogramAccent";
import { ScriptNote } from "@/components/brand/ScriptNote/ScriptNote";
import { ImageFrame } from "@/components/media/ImageFrame/ImageFrame";
import { Button } from "@/components/ui/Button/Button";
import { EditorialTitle } from "@/components/ui/EditorialTitle/EditorialTitle";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { site } from "@/content/site";
import type { GalleryImage } from "@/lib/media/types";

interface HeroProps {
  image: GalleryImage;
}

/**
 * Split hero: copy on ivory overlapping an angled photograph. On small
 * screens the photograph leads with a bottom cut and the copy follows.
 */
export function Hero({ image }: HeroProps) {
  return (
    <section aria-labelledby="hero-title" className="relative grid overflow-hidden md:grid-cols-12">
      <div className="relative z-content order-2 flex flex-col gap-7 px-gutter pt-12 pb-10 md:order-1 md:col-span-5 md:-mr-20 md:py-24 md:pr-0">
        <svg
          aria-hidden="true"
          viewBox="0 0 200 100"
          fill="none"
          className="pointer-events-none absolute top-6 -left-5 hidden h-22 w-45 stroke-ornament md:block"
        >
          <path d="M0 100 C 40 40, 110 4, 200 0" vectorEffect="non-scaling-stroke" />
        </svg>

        <Eyebrow>Holiday styling.</Eyebrow>
        <EditorialTitle id="hero-title" level={1} lines={["Designed", "for the Season."]} className="type-display-l" />
        <p className="max-w-measure-sm type-body-lg text-secondary">
          We transform homes, offices and event spaces through thoughtfully designed seasonal
          decorating — creating spaces that feel warm, personal, and unforgettable.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button href="/work" icon="arrow-right">
            Explore our work
          </Button>
          <Button href={site.booking.href} variant="outline">
            {site.booking.label}
          </Button>
        </div>
        <p className="mt-4 type-tagline text-accent">Beautiful spaces. Brighter seasons.</p>
      </div>

      <div className="relative order-1 min-h-105 clip-slant-bottom bg-inverse md:order-2 md:col-span-7 md:min-h-155 md:clip-slant-start">
        <ImageFrame
          image={image}
          sizes="(min-width: 768px) 60vw, 100vw"
          className="absolute inset-0"
        />
        <ScriptNote
          lines={["More", "than", "decor,", "it's a feeling."]}
          className="absolute top-6 right-5 text-inverse md:top-10 md:right-12"
        />
        <MonogramAccent className="-right-20 -bottom-10 h-75 text-inverse opacity-28 md:-right-28 md:-bottom-15 md:h-115" />
      </div>
    </section>
  );
}
