import { localImages as img } from "@/lib/media/local-library";
import type { GalleryImage } from "@/lib/media/types";

/**
 * Every image collection the site can display.
 *
 * `driveFolder` is the folder path under the configured Google Drive root
 * (see src/lib/google-drive). When Drive is not configured, or a folder is
 * empty, the local `fallback` images are used instead.
 */
export interface CollectionDefinition {
  title: string;
  driveFolder: string;
  fallback: GalleryImage[];
}

export const collections = {
  "homepage-hero": {
    title: "Homepage hero",
    driveFolder: "Homepage Hero",
    fallback: [img.heroLivingRoom],
  },
  trees: {
    title: "Christmas Tree Styling",
    driveFolder: "Christmas Trees",
    fallback: [
      { ...img.modernWinter, layout: "featured" },
      img.ornamentDetail,
      img.detailOrnaments,
      img.delMar,
      img.heroLivingRoom,
    ],
  },
  mantels: {
    title: "Mantels & Fireplace Decor",
    driveFolder: "Mantels",
    fallback: [{ ...img.classicMantel, layout: "featured" }, img.heroLivingRoom, img.candles],
  },
  entryways: {
    title: "Entryways & Staircases",
    driveFolder: "Staircases",
    fallback: [{ ...img.grandEntry, layout: "featured" }, img.detailStair],
  },
  "whole-space": {
    title: "Whole-Space Decorating",
    driveFolder: "Full Home",
    fallback: [
      { ...img.delMar, layout: "featured" },
      img.heroLivingRoom,
      img.grandEntry,
      img.classicMantel,
      img.tablescape,
    ],
  },
  tablescapes: {
    title: "Tablescapes",
    driveFolder: "Tablescapes",
    fallback: [{ ...img.tablescape, layout: "featured" }, img.candles],
  },
  "projects/grand-entry": {
    title: "Grand Holiday Entry",
    driveFolder: "Projects/Grand Holiday Entry",
    fallback: [{ ...img.grandEntry, layout: "featured" }, img.detailStair, img.candles],
  },
  "projects/carlsbad-office": {
    title: "The Carlsbad Office",
    driveFolder: "Projects/The Carlsbad Office",
    fallback: [{ ...img.modernWinter, layout: "featured" }, img.ornamentDetail, img.detailOrnaments],
  },
  "projects/classic-christmas": {
    title: "Classic Christmas",
    driveFolder: "Projects/Classic Christmas",
    fallback: [{ ...img.classicMantel, layout: "featured" }, img.candles, img.goodTidings],
  },
  "projects/winter-gala": {
    title: "Winter Gala Dinner",
    driveFolder: "Projects/Winter Gala Dinner",
    fallback: [{ ...img.tablescape, layout: "featured" }, img.candles, img.ornamentDetail],
  },
} satisfies Record<string, CollectionDefinition>;

export type CollectionKey = keyof typeof collections;
