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

/** The copy each case study supplies. Layout and imagery come from the template. */
interface CaseStudyCopy {
  brief: string[];
  palette: PaletteSwatch[];
  roomCaption: string;
  tree: string;
  mantel: string;
  mantelCaption: string;
  quote: { quote: string; attribution: string; detail?: string };
  entry: string;
  table: string;
  tips: { title: string; description: string }[];
}

/**
 * The shared case-study structure: every project tells its story through the
 * same sequence of chapters and photo compositions, with its own words and
 * palette. The same placeholder photography is used for every project until
 * project-specific images are available.
 */
function caseStudy(copy: CaseStudyCopy): ProjectStoryBlock[] {
  return [
    { type: "chapter", title: "The brief", body: copy.brief },
    { type: "palette", title: "The palette", swatches: copy.palette },
    { type: "media", layout: "full", images: [img.heroLivingRoom], caption: copy.roomCaption },
    { type: "chapter", title: "The tree", body: [copy.tree] },
    {
      type: "media",
      layout: "feature-stack",
      images: [img.ornamentDetail, img.detailOrnaments, img.modernWinter],
    },
    { type: "chapter", title: "The mantel", body: [copy.mantel] },
    {
      type: "media",
      layout: "framed-pair",
      images: [img.candles, img.classicMantel],
      caption: copy.mantelCaption,
    },
    { type: "quote", ...copy.quote },
    { type: "chapter", title: "The entry and stair", body: [copy.entry] },
    { type: "media", layout: "pair", images: [img.grandEntry, img.detailStair] },
    { type: "chapter", title: "The table", body: [copy.table] },
    { type: "media", layout: "single", images: [img.tablescape] },
    { type: "tips", title: "Get the look", items: copy.tips },
  ];
}

export const projects: Project[] = [
  {
    slug: "grand-entry",
    title: "Grand Holiday Entry",
    kind: "Private residence",
    location: "Rancho Santa Fe",
    label: "Case study · Entry & stair · 2025",
    summary:
      "A double-height foyer dressed to greet family and guests, with garland carried up the full sweep of the stair.",
    cover: img.grandEntry,
    facts: [
      { label: "Location", value: "Rancho Santa Fe, California" },
      { label: "Scope", value: "Foyer, stair · 5 rooms" },
      { label: "Install", value: "2 days" },
      { label: "Services", value: "Entry, stair, tree, mantel" },
    ],
    collection: "projects/grand-entry",
    story: caseStudy({
      brief: [
        "The family hosts a holiday open house every year, and nearly two hundred guests pass through the front door in a single evening. They wanted the entry to feel like an arrival, grand enough for the architecture, but warm enough that people linger instead of hurrying through.",
        "We built the plan around the stair. Everything else in the house would support it, in the same greens and golds, so the first impression carried through to every room guests wandered into.",
      ],
      palette: [
        { name: "Antique gold", color: "#b08d57" },
        { name: "Winter cream", color: "#f1ebe0" },
        { name: "Deep fir", color: "#2f4535" },
        { name: "Oxblood", color: "#6e2f2c" },
      ],
      roomCaption: "The formal living room, just off the foyer, set for the open house.",
      tree: "A fourteen-foot Fraser fir anchors the living room, visible from the front door through the foyer arch. We lit it in warm white, then layered antique gold ornaments with a few deep red velvet ribbons that echo the dining room.",
      mantel:
        "The limestone mantel called for scale. We built a full garland of fir and magnolia, let it drape past both ends of the surround, and set brass lanterns at the base so the fireplace glows even before the fire is lit.",
      mantelCaption: "Lanterns sit on the hearth, well clear of the firebox.",
      quote: {
        quote: "Every guest stopped at the bottom of the stairs.",
        attribution: "The homeowners",
        detail: "Rancho Santa Fe",
      },
      entry:
        "The staircase is the heart of the design. A single garland runs from the newel post to the landing, wired in place with padded ties, lit from within, and finished with oversized velvet bows at every third baluster so the rhythm reads from across the foyer.",
      table:
        "The dining table became the open-house buffet. We ran low greenery down its length with pillar candles in hurricanes, so food could sit between them and nothing blocked the view across the room.",
      tips: [
        {
          title: "Design for the first step inside",
          description: "Stand where guests will stand and decorate what they see first.",
        },
        {
          title: "Scale to the architecture",
          description: "A double-height space needs fuller garland and larger bows than you think.",
        },
        {
          title: "Repeat one accent color",
          description: "A single deep red, used sparingly, ties every room together.",
        },
        {
          title: "Light from within",
          description: "Wire lights into the garland itself so the stair glows after dark.",
        },
      ],
    }),
  },
  {
    slug: "carlsbad-office",
    title: "The Carlsbad Office",
    kind: "Lobby & reception",
    location: "Carlsbad",
    label: "Case study · Workplace · 2025",
    summary:
      "A calm, modern lobby tree and reception styling that welcomes clients without crowding the workday.",
    cover: img.modernWinter,
    facts: [
      { label: "Location", value: "Carlsbad, California" },
      { label: "Scope", value: "Lobby, reception · 3 spaces" },
      { label: "Install", value: "Overnight" },
      { label: "Services", value: "Tree, lounge, entry, table" },
    ],
    collection: "projects/carlsbad-office",
    story: caseStudy({
      brief: [
        "The firm sees clients every day through December and wanted the office to feel festive without looking like a department store. Nothing could slow down the front desk, block a walkway or need attention from staff during the season.",
        "We kept the design quiet and architectural: fewer, better pieces, a restrained palette taken from the building's own materials, and an install scheduled overnight so the team arrived to a finished space.",
      ],
      palette: [
        { name: "Pale oak", color: "#c9b08c" },
        { name: "Chalk white", color: "#f4f1ea" },
        { name: "Brushed silver", color: "#a7a9a6" },
        { name: "Eucalyptus", color: "#7d8f7f" },
      ],
      roomCaption: "The client lounge, styled to feel like a living room rather than a lobby.",
      tree: "A slim nine-foot tree stands beside the lounge window, where it can be seen from the street but never interrupts the path to reception. Clear glass and brushed silver ornaments pick up the building's steel and glass, with the lights set on a timer that follows office hours.",
      mantel:
        "The lounge's linear fireplace got a low, sculptural garland of eucalyptus and preserved cedar, kept to the ledge so it never overhangs the glass, with candles in heavy glass hurricanes that are safe for a busy room.",
      mantelCaption: "Flameless candles in the lounge, real flame only where it is supervised.",
      quote: {
        quote: "Our clients noticed it the moment they walked in.",
        attribution: "Office manager",
        detail: "Carlsbad",
      },
      entry:
        "The entry sets the tone for the whole floor. A pair of wreaths on the glass doors, matched planters at the threshold and a single garland along the feature stair that leads to the conference level, secured so nothing sheds onto the walkway.",
      table:
        "The boardroom table carries the design into meetings: a narrow runner of greenery and short candles that sits well below eye level, so it can stay in place through every presentation of the season.",
      tips: [
        {
          title: "Keep walkways clear",
          description: "Place every piece so staff and visitors never have to step around it.",
        },
        {
          title: "Borrow the building's palette",
          description: "Pull ornament colors from the finishes already in the space.",
        },
        {
          title: "Install out of hours",
          description: "An overnight install means the reveal happens when the team arrives.",
        },
        {
          title: "Choose low-maintenance materials",
          description: "Preserved greens and flameless candles last the season with no upkeep.",
        },
      ],
    }),
  },
  {
    slug: "classic-christmas",
    title: "Classic Christmas",
    kind: "Private residence",
    location: "La Jolla",
    label: "Case study · Private residence · 2025",
    summary:
      "A traditional mantel of cedar and pine, stockings for every grandchild and candlelight layered at three heights.",
    cover: img.classicMantel,
    facts: [
      { label: "Location", value: "La Jolla, California" },
      { label: "Scope", value: "Living, dining · 4 rooms" },
      { label: "Install", value: "1 day" },
      { label: "Services", value: "Mantel, tree, stair, table" },
    ],
    collection: "projects/classic-christmas",
    story: caseStudy({
      brief: [
        "Three generations gather in this house every Christmas, and the grandparents wanted it to look the way the holidays looked when their own children were small: red, green and gold, stockings on the mantel and a tree covered in ornaments with a story behind each one.",
        "Our job was to make the traditional feel fresh rather than dated. We edited the family's collection, added a few new heirloom-quality pieces, and gave every room a single focal point.",
      ],
      palette: [
        { name: "Holly red", color: "#9b2f2f" },
        { name: "Cedar green", color: "#3e5641" },
        { name: "Candle gold", color: "#c9a35c" },
        { name: "Warm ivory", color: "#f3ecdf" },
      ],
      roomCaption: "The family room, ready for Christmas morning.",
      tree: "The tree holds decades of family ornaments. We sorted them by color and size, hung the most meaningful pieces at eye level where they can be found, and filled between them with simple gold and red glass so the whole tree reads as one design.",
      mantel:
        "The mantel is the centerpiece: a full cedar and pine garland studded with pinecones and berries, a stocking for each of the nine grandchildren, and candlelight layered at three heights across the ledge.",
      mantelCaption: "Nine stockings, spaced so every name can be read from the sofa.",
      quote: {
        quote: "It looked like every Christmas we remember.",
        attribution: "The grandparents",
        detail: "La Jolla",
      },
      entry:
        "Plaid ribbon winds up the stair rail with a small garland, and the front door wears a full wreath with a velvet bow so the tradition starts before anyone steps inside.",
      table:
        "The dining table is set for Christmas dinner with a long garland runner, red taper candles in brass holders and the family's own china, dressed with a sprig of greenery at every place.",
      tips: [
        {
          title: "Edit the collection",
          description: "Choose the ornaments that matter most and store the rest for next year.",
        },
        {
          title: "Hang heirlooms at eye level",
          description: "Put the meaningful pieces where they will be noticed and talked about.",
        },
        {
          title: "Use real greenery where you can",
          description: "Cedar and pine bring scent and texture no artificial garland can.",
        },
        {
          title: "Give every room one focal point",
          description: "A mantel, a tree or a table. Let it lead and keep the rest quiet.",
        },
      ],
    }),
  },
  {
    slug: "winter-gala",
    title: "Winter Gala Dinner",
    kind: "Private event · 120 guests",
    location: "Encinitas",
    label: "Case study · Private event · 2025",
    summary:
      "Long candlelit tables for a winter gala, with greenery runners kept low so conversation carries across the room.",
    cover: img.tablescape,
    facts: [
      { label: "Location", value: "Encinitas, California" },
      { label: "Scope", value: "Event hall · 12 tables" },
      { label: "Install", value: "Same day" },
      { label: "Services", value: "Tables, tree, entry, lounge" },
    ],
    collection: "projects/winter-gala",
    story: caseStudy({
      brief: [
        "A foundation's annual winter gala moved to a new venue this year: a long hall with high ceilings and very little character of its own. The committee wanted guests to feel they had arrived somewhere intimate, not a rented room.",
        "We had one afternoon to transform it. Everything was planned, built and labeled in our studio ahead of time, so the install was a matter of placement and lighting.",
      ],
      palette: [
        { name: "Midnight blue", color: "#1f2a44" },
        { name: "Champagne", color: "#d8c3a0" },
        { name: "Silver birch", color: "#e4e1da" },
        { name: "Winter moss", color: "#56654f" },
      ],
      roomCaption: "The pre-dinner lounge, where guests gathered before the doors opened.",
      tree: "A twelve-foot tree marks the lounge and acts as the evening's photo backdrop. We dressed it in champagne and silver with deep blue ribbon that matches the gala's invitations and signage.",
      mantel:
        "The venue's fireplace wall became the lounge focal point, with a long garland of cedar and silver-dollar eucalyptus, clusters of pillar candles and low arrangements that leave room for the evening's speakers to stand beside it.",
      mantelCaption: "The fireplace wall doubles as the backdrop for the welcome speech.",
      quote: {
        quote: "Guests asked if we had moved the gala somewhere new.",
        attribution: "Gala committee chair",
        detail: "Encinitas",
      },
      entry:
        "Guests arrive by the venue's grand stair, so we lined it with garland and hundreds of lights, turning the walk up to the hall into the first moment of the night.",
      table:
        "Twelve long tables seat 120 guests. Low runners of greenery with taper and pillar candles in varied heights keep every centerpiece below eye level, so conversation carries across the table.",
      tips: [
        {
          title: "Build ahead, place on site",
          description: "Pre-assemble garlands and centerpieces so the install fits a short window.",
        },
        {
          title: "Match the event's identity",
          description: "Pull one color from the invitations and repeat it throughout the room.",
        },
        {
          title: "Plan for photographs",
          description: "Give guests one beautiful backdrop where every photo will be taken.",
        },
        {
          title: "Light the arrival",
          description: "The walk in is the first impression. Make it glow.",
        },
      ],
    }),
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
    story: caseStudy({
      brief: [
        "The homeowners host both sides of the family every December and wanted the house to feel dressed for it without competing with the ocean. The living room faces west, so whatever we added had to hold up against a full sunset every evening.",
        "We set three rules at the first visit: keep the palette to materials already in the house, keep the sightlines to the water clear, and let candlelight do most of the work after dark.",
      ],
      palette: [
        { name: "Driftwood", color: "#a89580" },
        { name: "Ivory linen", color: "#efe7da" },
        { name: "Aged brass", color: "#a9844f" },
        { name: "Coastal pine", color: "#3f4f40" },
      ],
      roomCaption: "The living room, set for the first family dinner of the season.",
      tree: "A twelve-foot noble fir sits in the corner farthest from the windows, so it reads from the entry and never blocks the view. We wrapped every branch in warm-white lights before adding a single ornament, then dressed it in clear glass, linen ribbon and a handful of brass pieces the family already owned.",
      mantel:
        "The mantel is the one place we let the design get full. Garland was built on-site from cedar, pine and preserved eucalyptus, run long past the edges of the firebox, and layered with pillar candles at three heights so the glow reads from across the room.",
      mantelCaption: "Stocking hangers were sized to the mantel ledge so nothing is drilled.",
      quote: {
        quote: "It felt like our home, only more so.",
        attribution: "The homeowners",
        detail: "Del Mar",
      },
      entry:
        "Guests arrive through a double-height foyer, so the stair carries most of the first impression. We ran a single continuous garland up the banister, secured with padded ties rather than wire, and kept the landing simple with one lantern and a low arrangement.",
      table:
        "The dining table seats fourteen. A runner of greenery with clusters of taper and pillar candles kept every centerpiece below eye level, so conversation carries across the table.",
      tips: [
        {
          title: "Start with what you own",
          description:
            "Pull brass, glass and textiles from around the house before buying anything new.",
        },
        {
          title: "Light before you decorate",
          description: "Wrap the tree and garland in warm white first. Ornaments are the last layer.",
        },
        {
          title: "Protect the view",
          description: "Keep tall pieces away from windows and the main sightline into each room.",
        },
        {
          title: "Vary candle heights",
          description: "Group candles at three heights so the light moves across the room.",
        },
      ],
    }),
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
