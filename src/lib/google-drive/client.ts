import "server-only";

import type { GalleryImage } from "@/lib/media/types";

import type { DriveConfig } from "./config";
import { toGalleryImage, type DriveImageFile } from "./normalize";

const DRIVE_API = "https://www.googleapis.com/drive/v3";
const FOLDER_MIME = "application/vnd.google-apps.folder";
export const DRIVE_CACHE_TAG = "google-drive";

interface DriveFileList<T> {
  files: T[];
  nextPageToken?: string;
}

function escapeQuery(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

async function listFiles<T>(
  config: DriveConfig,
  query: string,
  fields: string,
): Promise<T[]> {
  const files: T[] = [];
  let pageToken: string | undefined;

  do {
    const url = new URL(`${DRIVE_API}/files`);
    url.search = new URLSearchParams({
      q: query,
      fields: `nextPageToken, files(${fields})`,
      orderBy: "name",
      pageSize: "1000",
      key: config.apiKey,
      ...(pageToken ? { pageToken } : {}),
    }).toString();

    const response = await fetch(url, {
      next: { revalidate: config.revalidateSeconds, tags: [DRIVE_CACHE_TAG] },
    });
    if (!response.ok) {
      throw new Error(`Google Drive request failed (${response.status}): ${await response.text()}`);
    }
    const page = (await response.json()) as DriveFileList<T>;
    files.push(...page.files);
    pageToken = page.nextPageToken;
  } while (pageToken);

  return files;
}

async function findChildFolderId(config: DriveConfig, parentId: string, name: string) {
  const [folder] = await listFiles<{ id: string }>(
    config,
    `'${escapeQuery(parentId)}' in parents and name = '${escapeQuery(name)}' and mimeType = '${FOLDER_MIME}' and trashed = false`,
    "id",
  );
  return folder?.id ?? null;
}

/** Resolves "Projects/Del Mar Residence" to a folder id under the root. */
async function resolveFolderPath(config: DriveConfig, folderPath: string) {
  let folderId: string | null = config.rootFolderId;
  for (const segment of folderPath.split("/").filter(Boolean)) {
    if (!folderId) return null;
    folderId = await findChildFolderId(config, folderId, segment);
  }
  return folderId;
}

/** Lists the images in a folder (by path under the root), normalized and in filename order. */
export async function listDriveFolderImages(
  config: DriveConfig,
  folderPath: string,
): Promise<GalleryImage[]> {
  const folderId = await resolveFolderPath(config, folderPath);
  if (!folderId) return [];

  const files = await listFiles<DriveImageFile>(
    config,
    `'${escapeQuery(folderId)}' in parents and mimeType contains 'image/' and trashed = false`,
    "id, name, mimeType, description, imageMediaMetadata(width, height, rotation)",
  );
  return files.map(toGalleryImage).filter((image) => image !== null);
}

/** Streams the original bytes of a Drive file. */
export function fetchDriveFile(config: DriveConfig, fileId: string) {
  const url = new URL(`${DRIVE_API}/files/${encodeURIComponent(fileId)}`);
  url.search = new URLSearchParams({ alt: "media", key: config.apiKey }).toString();
  return fetch(url, { cache: "no-store" });
}
