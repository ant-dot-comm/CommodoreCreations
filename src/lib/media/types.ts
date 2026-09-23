/**
 * Normalized image model shared by every visual component.
 *
 * Components never know where an image came from — local assets, Google Drive,
 * a CDN or a CMS all resolve to this shape before reaching the UI.
 */

/** How much visual weight an image asks for in an editorial layout. */
export type ImageLayout = "standard" | "wide" | "tall" | "large" | "featured";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
  title?: string;
  caption?: string;
  filename?: string;
  /** Explicit layout. When omitted, it is derived from the aspect ratio. */
  layout?: ImageLayout;
  /** Load eagerly with high priority — reserve for above-the-fold imagery. */
  priority?: boolean;
  /** Crop anchor in percent, used when the image is cropped to fill a frame. */
  focalPoint?: { x: number; y: number };
}

/** A named set of images: one gallery, one Drive folder, one project. */
export interface ImageCollection {
  key: string;
  title: string;
  images: GalleryImage[];
}
