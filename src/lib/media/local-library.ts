import type { StaticImageData } from "next/image";

import candles from "@/assets/images/candles.png";
import classicMantel from "@/assets/images/classic-mantel.png";
import delMar from "@/assets/images/del-mar.png";
import detailOrnaments from "@/assets/images/detail-ornaments.png";
import detailStair from "@/assets/images/detail-stair.png";
import goodTidings from "@/assets/images/good-tidings.png";
import grandEntry from "@/assets/images/grand-entry.png";
import heroLivingRoom from "@/assets/images/hero-living-room.png";
import modernWinter from "@/assets/images/modern-winter.png";
import ornamentDetail from "@/assets/images/ornament-detail.png";
import tablescape from "@/assets/images/tablescape.png";

import type { GalleryImage } from "./types";

/**
 * Local placeholder photography, normalized into GalleryImage records.
 * Static imports give Next.js exact dimensions and blur placeholders.
 */
function fromStatic(
  id: string,
  asset: StaticImageData,
  alt: string,
  extra: Partial<GalleryImage> = {},
): GalleryImage {
  return {
    id,
    src: asset.src,
    width: asset.width,
    height: asset.height,
    blurDataURL: asset.blurDataURL,
    alt,
    ...extra,
  };
}

export const localImages = {
  heroLivingRoom: fromStatic(
    "hero-living-room",
    heroLivingRoom,
    "Living room with a lit Christmas tree, garlanded mantel and candles",
    { focalPoint: { x: 20, y: 50 } },
  ),
  grandEntry: fromStatic(
    "grand-entry",
    grandEntry,
    "Foyer with a garlanded staircase beneath a crystal chandelier",
  ),
  modernWinter: fromStatic(
    "modern-winter",
    modernWinter,
    "Christmas tree beside a linen sofa in a sunlit living room",
  ),
  classicMantel: fromStatic(
    "classic-mantel",
    classicMantel,
    "Fireplace mantel dressed with garland, a wreath and stockings",
  ),
  tablescape: fromStatic(
    "tablescape",
    tablescape,
    "Candlelit holiday table with greenery running down the center",
  ),
  delMar: fromStatic(
    "del-mar",
    delMar,
    "Coastal living room at sunset with a lit tree beside the windows",
  ),
  ornamentDetail: fromStatic(
    "ornament-detail",
    ornamentDetail,
    "Clear glass ornaments on a frosted branch",
  ),
  detailOrnaments: fromStatic(
    "detail-ornaments",
    detailOrnaments,
    "Close view of silver and glass ornaments",
  ),
  detailStair: fromStatic(
    "detail-stair",
    detailStair,
    "Garland wound along a staircase banister",
  ),
  candles: fromStatic(
    "candles",
    candles,
    "Pillar candles glowing beside a lit tree",
  ),
  goodTidings: fromStatic(
    "good-tidings",
    goodTidings,
    "Embroidered pillow reading Good Tidings beside pine branches",
  ),
} satisfies Record<string, GalleryImage>;

export type LocalImageName = keyof typeof localImages;
