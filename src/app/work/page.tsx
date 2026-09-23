import type { Metadata } from "next";

import { MediaTile } from "@/components/media/MediaTile/MediaTile";
import { TileMosaic } from "@/components/media/TileMosaic/TileMosaic";
import { WorkPageShell } from "@/components/sections/work/WorkPageShell/WorkPageShell";
import { portfolioServices } from "@/content/services";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Recent holiday installations across San Diego County in homes, offices and event venues.",
};

/** Placement for the five category tiles: hero, square, tall, square, full-width. */
const slots = [
  { className: "col-span-2 md:row-span-2", prominent: true, sizes: "(min-width: 768px) 50vw, 100vw" },
  { className: "", prominent: false, sizes: "(min-width: 768px) 25vw, 50vw" },
  { className: "md:row-span-2", prominent: false, sizes: "(min-width: 768px) 25vw, 50vw" },
  { className: "col-span-2 md:col-span-1", prominent: false, sizes: "(min-width: 768px) 25vw, 100vw" },
  { className: "col-span-2 md:col-span-4", prominent: true, sizes: "100vw" },
];

export default function WorkPage() {
  return (
    <WorkPageShell
      eyebrow="Our work"
      title={["Spaces, dressed", "for the season."]}
      intro="Recent installations across San Diego County in homes, offices and event venues, each designed around the space it lives in."
    >
      <TileMosaic>
        {portfolioServices.slice(0, slots.length).map((service, index) => (
          <MediaTile
            key={service.slug}
            href={`/work/${service.slug}`}
            image={service.image}
            title={service.title}
            numeral={String(index + 1).padStart(2, "0")}
            cue="View work"
            prominent={slots[index].prominent}
            sizes={slots[index].sizes}
            className={slots[index].className}
          />
        ))}
      </TileMosaic>
    </WorkPageShell>
  );
}
