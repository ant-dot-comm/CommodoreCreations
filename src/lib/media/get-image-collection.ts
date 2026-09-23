import "server-only";

import { cache } from "react";

import { collections, type CollectionKey } from "@/content/collections";
import { listDriveFolderImages } from "@/lib/google-drive/client";
import { getDriveConfig } from "@/lib/google-drive/config";
import { driveImageSrc } from "@/lib/google-drive/normalize";

import type { ImageCollection } from "./types";

/**
 * Single entry point for image collections. Reads the collection's Google
 * Drive folder when Drive is configured and falls back to local images when
 * it isn't, or when the folder is missing, empty or unreachable.
 */
export const getImageCollection = cache(async (key: CollectionKey): Promise<ImageCollection> => {
  const definition = collections[key];
  const drive = getDriveConfig();

  if (drive) {
    try {
      const images = await listDriveFolderImages(drive, definition.driveFolder);
      if (images.length > 0) return { key, title: definition.title, images };
    } catch (error) {
      console.error(`[media] Falling back to local images for "${key}".`, error);
    }
  }

  return { key, title: definition.title, images: definition.fallback };
});

/** True when a Drive file belongs to one of the site's configured collections. */
export async function isPublishedDriveImage(fileId: string) {
  const src = driveImageSrc(fileId);
  const keys = Object.keys(collections) as CollectionKey[];
  const all = await Promise.all(keys.map((key) => getImageCollection(key)));
  return all.some((collection) => collection.images.some((image) => image.src === src));
}
