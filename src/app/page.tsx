import { CtaBand } from "@/components/sections/CtaBand/CtaBand";
import { EditorialStatement } from "@/components/sections/home/EditorialStatement/EditorialStatement";
import { FeaturedProjects } from "@/components/sections/home/FeaturedProjects/FeaturedProjects";
import { Hero } from "@/components/sections/home/Hero/Hero";
import { ProcessOverview } from "@/components/sections/home/ProcessOverview/ProcessOverview";
import { ProjectSpotlight } from "@/components/sections/home/ProjectSpotlight/ProjectSpotlight";
import { ServicesStrip } from "@/components/sections/home/ServicesStrip/ServicesStrip";
import { processSteps } from "@/content/process";
import { getFeaturedProjects, getProject, spotlightProjectSlug } from "@/content/projects";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { getImageCollection } from "@/lib/media/get-image-collection";
import { localImages } from "@/lib/media/local-library";

export default async function HomePage() {
  const heroImages = await getImageCollection("homepage-hero");
  const spotlight = getProject(spotlightProjectSlug);

  return (
    <>
      <Hero image={{ ...heroImages.images[0], priority: true }} />
      <FeaturedProjects projects={getFeaturedProjects()} />
      <EditorialStatement image={localImages.ornamentDetail} />
      <ServicesStrip services={services} />
      {spotlight && (
        <ProjectSpotlight
          project={spotlight}
          details={[localImages.detailOrnaments, localImages.detailStair]}
        />
      )}
      <ProcessOverview steps={processSteps} />
      <CtaBand
        eyebrow="Make this season feel"
        title="Extraordinary."
        action={{ label: "Start your holiday design", href: site.booking.href }}
        tagline={site.tagline}
        image={localImages.candles}
      />
    </>
  );
}
