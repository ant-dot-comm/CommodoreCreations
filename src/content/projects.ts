import { localImages as img } from "@/lib/media/local-library";
import type { GalleryImage } from "@/lib/media/types";

import type { CollectionKey } from "./collections";

export interface ProjectFact {
  label: string;
  value: string;
}

export interface PaletteSwatch {
  name: string;
  /** Material color shown in the swatch. Content data, not a design token. */
  color: string;
}

export type ProjectMediaLayout = "full" | "single" | "pair" | "feature-stack" | "framed-pair";

/** Ordered building blocks of a written case study. */
export type ProjectStoryBlock =
  | { type: "chapter"; title: string; body: string[] }
  | { type: "palette"; title: string; swatches: PaletteSwatch[] }
  | { type: "media"; layout: ProjectMediaLayout; images: GalleryImage[]; caption?: string }
  | { type: "quote"; quote: string; attribution: string; detail?: string }
  | { type: "tips"; title: string; items: { title: string; description: string }[] };

export interface Project {
  slug: string;
  title: string;
  /** Short descriptor, e.g. "Private residence". */
  kind: string;
  location: string;
  summary: string;
  cover: GalleryImage;
  facts: ProjectFact[];
  /** Eyebrow shown over the project hero. */
  label: string;
  /** Written case study. Projects without one show their image collection. */
  story?: ProjectStoryBlock[];
  collection?: CollectionKey;
}

export const projects: Project[] = [
  {
    slug: "grand-entry",
    title: "Grand Holiday Entry",
    kind: "Private residence",
    location: "Rancho Santa Fe",
    label: "Private residence · Entry & stair",
    summary:
      "A double-height foyer dressed to greet family and guests, with garland carried up the full sweep of the stair.",
    cover: img.grandEntry,
    facts: [
      { label: "Location", value: "Rancho Santa Fe, California" },
      { label: "Scope", value: "Foyer · staircase" },
      { label: "Install", value: "1 day" },
      { label: "Services", value: "Entry, stair, wreaths" },
    ],
    collection: "projects/grand-entry",
  },
  {
    slug: "carlsbad-office",
    title: "The Carlsbad Office",
    kind: "Lobby & reception",
    location: "Carlsbad",
    label: "Workplace · Lobby & reception",
    summary:
      "A calm, modern lobby tree and reception styling that welcomes clients without crowding the workday.",
    cover: img.modernWinter,
    facts: [
      { label: "Location", value: "Carlsbad, California" },
      { label: "Scope", value: "Lobby · reception" },
      { label: "Install", value: "Overnight" },
      { label: "Services", value: "Tree, reception, entry" },
    ],
    collection: "projects/carlsbad-office",
  },
  {
    slug: "classic-christmas",
    title: "Classic Christmas",
    kind: "Private residence",
    location: "La Jolla",
    label: "Private residence · Living room",
    summary:
      "A traditional mantel of cedar and pine, stockings for every grandchild and candlelight layered at three heights.",
    cover: img.classicMantel,
    facts: [
      { label: "Location", value: "La Jolla, California" },
      { label: "Scope", value: "Living room · mantel" },
      { label: "Install", value: "1 day" },
      { label: "Services", value: "Mantel, tree, table" },
    ],
    collection: "projects/classic-christmas",
  },
  {
    slug: "winter-gala",
    title: "Winter Gala Dinner",
    kind: "Private event · 120 guests",
    location: "Encinitas",
    label: "Private event · 120 guests",
    summary:
      "Long candlelit tables for a winter gala, with greenery runners kept low so conversation carries across the room.",
    cover: img.tablescape,
    facts: [
      { label: "Location", value: "Encinitas, California" },
      { label: "Scope", value: "Event hall · 12 tables" },
      { label: "Install", value: "Same day" },
      { label: "Services", value: "Tablescapes, candles" },
    ],
    collection: "projects/winter-gala",
  },
  {
    slug: "del-mar",
    title: "The Del Mar Residence",
    kind: "Coastal & layered",
    location: "Del Mar",
    label: "Case study · Full home · 2025",
    summary:
      "A coastal home, reimagined for the holidays with natural textures, timeless greenery, and warm, layered lighting.",
    cover: img.delMar,
    facts: [
      { label: "Location", value: "Del Mar, California" },
      { label: "Scope", value: "Full home · 7 rooms" },
      { label: "Install", value: "3 days" },
      { label: "Services", value: "Tree, mantel, entry, table" },
    ],
    story: [
      {
        type: "chapter",
        title: "The brief",
        body: [
          "The homeowners host both sides of the family every December and wanted the house to feel dressed for it without competing with the ocean. The living room faces west, so whatever we added had to hold up against a full sunset every evening.",
          "We set three rules at the first visit: keep the palette to materials already in the house, keep the sightlines to the water clear, and let candlelight do most of the work after dark.",
        ],
      },
      {
        type: "palette",
        title: "The palette",
        swatches: [
          { name: "Driftwood", color: "#a89580" },
          { name: "Ivory linen", color: "#efe7da" },
          { name: "Aged brass", color: "#a9844f" },
          { name: "Coastal pine", color: "#3f4f40" },
        ],
      },
      {
        type: "media",
        layout: "full",
        images: [img.heroLivingRoom],
        caption: "The living room, set for the first family dinner of the season.",
      },
      {
        type: "chapter",
        title: "The tree",
        body: [
          "A twelve-foot noble fir sits in the corner farthest from the windows, so it reads from the entry and never blocks the view. We wrapped every branch in warm-white lights before adding a single ornament, then dressed it in clear glass, linen ribbon and a handful of brass pieces the family already owned.",
        ],
      },
      {
        type: "media",
        layout: "feature-stack",
        images: [img.ornamentDetail, img.detailOrnaments, img.modernWinter],
      },
      {
        type: "chapter",
        title: "The mantel",
        body: [
          "The mantel is the one place we let the design get full. Garland was built on-site from cedar, pine and preserved eucalyptus, run long past the edges of the firebox, and layered with pillar candles at three heights so the glow reads from across the room.",
        ],
      },
      {
        type: "media",
        layout: "framed-pair",
        images: [img.candles, img.classicMantel],
        caption: "Stocking hangers were sized to the mantel ledge so nothing is drilled.",
      },
      {
        type: "quote",
        quote: "It felt like our home, only more so.",
        attribution: "The homeowners",
        detail: "Del Mar",
      },
      {
        type: "chapter",
        title: "The entry and stair",
        body: [
          "Guests arrive through a double-height foyer, so the stair carries most of the first impression. We ran a single continuous garland up the banister, secured with padded ties rather than wire, and kept the landing simple with one lantern and a low arrangement.",
        ],
      },
      { type: "media", layout: "pair", images: [img.grandEntry, img.detailStair] },
      {
        type: "chapter",
        title: "The table",
        body: [
          "The dining table seats fourteen. A runner of greenery with clusters of taper and pillar candles kept every centerpiece below eye level, so conversation carries across the table.",
        ],
      },
      { type: "media", layout: "single", images: [img.tablescape] },
      {
        type: "tips",
        title: "Get the look",
        items: [
          {
            title: "Start with what you own",
            description:
              "Pull brass, glass and textiles from around the house before buying anything new.",
          },
          {
            title: "Light before you decorate",
            description:
              "Wrap the tree and garland in warm white first. Ornaments are the last layer.",
          },
          {
            title: "Protect the view",
            description:
              "Keep tall pieces away from windows and the main sightline into each room.",
          },
          {
            title: "Vary candle heights",
            description: "Group candles at three heights so the light moves across the room.",
          },
        ],
      },
    ],
  },
];

export const featuredProjectSlugs = [
  "grand-entry",
  "carlsbad-office",
  "classic-christmas",
  "winter-gala",
];
export const spotlightProjectSlug = "del-mar";

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects() {
  return featuredProjectSlugs.map((slug) => getProject(slug)).filter((p) => p !== undefined);
}

/** The project that follows `slug`, wrapping to the first. */
export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
