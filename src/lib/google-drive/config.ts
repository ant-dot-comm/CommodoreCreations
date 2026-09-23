import "server-only";

export interface DriveConfig {
  apiKey: string;
  rootFolderId: string;
  /** Seconds before folder listings are re-fetched from Drive. */
  revalidateSeconds: number;
}

/**
 * Drive is optional. With both variables set, collections are read from the
 * shared root folder; otherwise the site falls back to local images.
 * These values are server-only and never reach the browser.
 */
export function getDriveConfig(): DriveConfig | null {
  const apiKey = process.env.GOOGLE_DRIVE_API_KEY;
  const rootFolderId = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID;
  if (!apiKey || !rootFolderId) return null;

  const revalidate = Number(process.env.GOOGLE_DRIVE_REVALIDATE_SECONDS);
  return {
    apiKey,
    rootFolderId,
    revalidateSeconds: Number.isFinite(revalidate) && revalidate > 0 ? revalidate : 3600,
  };
}
