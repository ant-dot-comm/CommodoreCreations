import { fetchDriveFile } from "@/lib/google-drive/client";
import { getDriveConfig } from "@/lib/google-drive/config";
import { isPublishedDriveImage } from "@/lib/media/get-image-collection";

/**
 * Streams images from Google Drive through the site so the API key stays on
 * the server and next/image can optimize and cache them. Only files that
 * appear in a configured collection are served.
 */
export async function GET(_request: Request, context: RouteContext<"/media/drive/[fileId]">) {
  const { fileId } = await context.params;
  const config = getDriveConfig();

  if (!config || !/^[\w-]{10,}$/.test(fileId) || !(await isPublishedDriveImage(fileId))) {
    return new Response("Not found", { status: 404 });
  }

  const upstream = await fetchDriveFile(config, fileId);
  const contentType = upstream.headers.get("content-type") ?? "";
  if (!upstream.ok || !upstream.body || !contentType.startsWith("image/")) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(upstream.body, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
