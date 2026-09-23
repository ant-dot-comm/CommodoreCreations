import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EditorialGallery } from "@/components/gallery/EditorialGallery/EditorialGallery";
import { ProjectHero } from "@/components/sections/project/ProjectHero/ProjectHero";
import { ProjectOverview } from "@/components/sections/project/ProjectOverview/ProjectOverview";
import { ProjectPager } from "@/components/sections/project/ProjectPager/ProjectPager";
import { ProjectStory } from "@/components/sections/project/ProjectStory/ProjectStory";
import { Container } from "@/components/ui/Container/Container";
import { getNextProject, getProject, projects } from "@/content/projects";
import { getImageCollection } from "@/lib/media/get-image-collection";

/** Re-read Drive-backed project galleries hourly. */
export const revalidate = 3600;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const gallery = !project.story && project.collection ? await getImageCollection(project.collection) : null;

  return (
    <>
      <ProjectHero project={project} />
      <ProjectOverview project={project} />
      {project.story && <ProjectStory blocks={project.story} />}
      {gallery && (
        <Container className="pb-section">
          <EditorialGallery images={gallery.images} label={`${project.title} gallery`} />
        </Container>
      )}
      <ProjectPager next={getNextProject(project.slug)} />
    </>
  );
}
