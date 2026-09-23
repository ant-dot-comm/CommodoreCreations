import { localImages as img } from "@/lib/media/local-library";
import type { GalleryImage } from "@/lib/media/types";

import type { CollectionKey } from "./collections";

export interface Service {
  slug: string;
  title: string;
  /** Short label used in filters and compact lists. */
  shortTitle: string;
  description: string;
  highlights: string[];
  image: GalleryImage;
  /** Present when the service has its own portfolio gallery under Our Work. */
  portfolio?: {
    collection: CollectionKey;
    heading: string[];
    intro: string;
    cta: string;
  };
}

export const services: Service[] = [
  {
    slug: "trees",
    title: "Christmas Tree Styling",
    shortTitle: "Trees",
    description:
      "We design the tree around the room, whether that is a living room, a lobby or a ballroom: its height, palette and ornament story. Our team sources, lights and dresses it in place, from the first strand to the topper.",
    highlights: [
      "Lighting wrapped branch by branch",
      "Ornament and ribbon palette",
      "Heirlooms or brand colors worked in",
    ],
    image: img.modernWinter,
    portfolio: {
      collection: "trees",
      heading: ["Trees, dressed", "in place."],
      intro:
        "Trees for living rooms, office lobbies and event halls, lit branch by branch and styled to the room they stand in.",
      cta: "See our trees",
    },
  },
  {
    slug: "mantels",
    title: "Mantels & Fireplace Decor",
    shortTitle: "Mantels",
    description:
      "The mantel is where a room gathers. We build garland on-site from fresh and preserved greens, then layer candlelight, stockings and heirlooms you already own.",
    highlights: [
      "Custom garland, built in place",
      "Candle and lighting plan",
      "Stocking hangers sized to your mantel",
    ],
    image: img.classicMantel,
    portfolio: {
      collection: "mantels",
      heading: ["Mantels that", "gather a room."],
      intro:
        "Garland, candlelight and stockings built on-site around the fireplace, in homes, hotel lounges and private clubs.",
      cta: "See our mantels",
    },
  },
  {
    slug: "entryways",
    title: "Entryways & Staircases",
    shortTitle: "Entryways",
    description:
      "Doors, banisters, storefronts and lobbies set the tone before anyone takes off their coat. We scale garland and wreaths to the architecture so the entry reads from the street and from inside.",
    highlights: [
      "Door wreaths, planters and storefronts",
      "Banister garland, secured without damage",
      "Foyer, lobby and reception vignettes",
    ],
    image: img.grandEntry,
    portfolio: {
      collection: "entryways",
      heading: ["First", "impressions."],
      intro:
        "Front doors, storefronts, staircases and reception areas dressed to greet guests, clients and customers.",
      cta: "See our entryways",
    },
  },
  {
    slug: "whole-space",
    title: "Whole-Space Decorating",
    shortTitle: "Whole space",
    description:
      "One design carried room to room, so a house, an office floor or an event venue feels considered from the door to the last corner. We plan the palette once and install over one to three days.",
    highlights: [
      "One design plan for the whole space",
      "One palette across every room",
      "Multi-day install by one team",
    ],
    image: img.delMar,
    portfolio: {
      collection: "whole-space",
      heading: ["One design,", "every room."],
      intro:
        "Houses, office floors and event venues decorated as one cohesive space, planned once and installed by one team.",
      cta: "See whole-space projects",
    },
  },
  {
    slug: "tablescapes",
    title: "Tablescapes",
    shortTitle: "Tablescapes",
    description:
      "Layered tables for the dinners, company parties and galas you host: runners, candlelight, greenery and place settings composed for the length of your table.",
    highlights: [
      "Centerpieces kept below eye line",
      "Candle and linen styling",
      "Place settings and small details",
    ],
    image: img.tablescape,
    portfolio: {
      collection: "tablescapes",
      heading: ["Tables set", "for the occasion."],
      intro:
        "Family dinners, company parties and galas, each table composed for its length, its guests and its lighting.",
      cta: "See our tablescapes",
    },
  },
  {
    slug: "refreshes",
    title: "Seasonal Refreshes",
    shortTitle: "Refreshes",
    description:
      "A lighter touch between holidays. We swap textiles, greenery and accents to carry a home or workplace from autumn through winter.",
    highlights: [
      "Pillows, throws and textiles",
      "Seasonal greenery and florals",
      "Scheduled visits through the season",
    ],
    image: img.goodTidings,
  },
  {
    slug: "installation",
    title: "Installation & Takedown",
    shortTitle: "Install & takedown",
    description:
      "Careful install, and just as careful January packing. Every piece is wrapped, labeled and inventoried so next year starts where this one ended.",
    highlights: [
      "Install windows scheduled around your hours",
      "Labeled, inventoried storage",
      "January takedown and clean-up",
    ],
    image: img.candles,
  },
];

/** Services that have a portfolio gallery, in display order. */
export const portfolioServices = services.filter(
  (service): service is Service & Required<Pick<Service, "portfolio">> =>
    Boolean(service.portfolio),
);

export function getPortfolioService(slug: string) {
  return portfolioServices.find((service) => service.slug === slug);
}

export const footerServiceSlugs = [
  "trees",
  "mantels",
  "entryways",
  "whole-space",
  "installation",
];
