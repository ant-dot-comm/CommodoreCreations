import type { GalleryImage, ImageLayout } from "@/lib/media/types";

/** The subset of the Drive v3 `File` resource the site requests. */
export interface DriveImageFile {
  id: string;
  name: string;
  mimeType: string;
  description?: string;
  imageMediaMetadata?: {
    width?: number;
    height?: number;
    /** Clockwise quarter turns applied by the camera (0–3). */
    rotation?: number;
  };
}

const LAYOUT_TAG = /\[(standard|wide|tall|large|featured)\]/i;

/** Public path of the server-side proxy that streams a Drive file. */
export function driveImageSrc(fileId: string) {
  return `/media/drive/${fileId}`;
}

/**
 * "03 Mantel garland [featured].jpg" → "Mantel garland".
 * Leading ordering numbers, layout tags and the extension are removed.
 */
export function humanizeFilename(name: string) {
  const base = name
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(LAYOUT_TAG, "")
    .replace(/^\d+[\s._-]*/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return base.charAt(0).toUpperCase() + base.slice(1);
}

/**
 * Converts a Drive file into the site's GalleryImage model.
 *
 * Editors control presentation from Drive itself:
 * - the file description becomes the alt text (falls back to the filename)
 * - a tag such as "[featured]" or "[wide]" in the filename sets the layout
 * - files are displayed in filename order, so "01 …", "02 …" sets the sequence
 */
export function toGalleryImage(file: DriveImageFile): GalleryImage | null {
  const meta = file.imageMediaMetadata;
  if (!meta?.width || !meta.height) return null;

  const quarterTurned = meta.rotation === 1 || meta.rotation === 3;
  const layoutTag = file.name.match(LAYOUT_TAG)?.[1]?.toLowerCase() as ImageLayout | undefined;

  return {
    id: `drive-${file.id}`,
    src: driveImageSrc(file.id),
    width: quarterTurned ? meta.height : meta.width,
    height: quarterTurned ? meta.width : meta.height,
    alt: file.description?.trim() || humanizeFilename(file.name),
    filename: file.name,
    layout: layoutTag,
  };
}
