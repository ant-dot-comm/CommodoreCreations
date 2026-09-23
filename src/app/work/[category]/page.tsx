import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EditorialGallery } from "@/components/gallery/EditorialGallery/EditorialGallery";
import { WorkPageShell } from "@/components/sections/work/WorkPageShell/WorkPageShell";
import { getPortfolioService, portfolioServices } from "@/content/services";
import { getImageCollection } from "@/lib/media/get-image-collection";

/** Re-read Drive-backed galleries hourly so new uploads appear without a deploy. */
export const revalidate = 3600;

export function generateStaticParams() {
  return portfolioServices.map((service) => ({ category: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[category]">): Promise<Metadata> {
  const { category } = await params;
  const service = getPortfolioService(category);
  if (!service) return {};
  return { title: `${service.title} · Our Work`, description: service.portfolio.intro };
}

export default async function WorkCategoryPage({ params }: PageProps<"/work/[category]">) {
  const { category } = await params;
  const service = getPortfolioService(category);
  if (!service) notFound();

  const collection = await getImageCollection(service.portfolio.collection);

  return (
    <WorkPageShell
      eyebrow={`Our work · ${service.shortTitle}`}
      title={service.portfolio.heading}
      intro={service.portfolio.intro}
      activeSlug={service.slug}
    >
      <EditorialGallery images={collection.images} label={`${service.title} gallery`} />
    </WorkPageShell>
  );
}
