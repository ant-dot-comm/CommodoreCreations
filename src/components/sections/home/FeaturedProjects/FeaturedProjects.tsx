import { MediaTile } from "@/components/media/MediaTile/MediaTile";
import { TileMosaic } from "@/components/media/TileMosaic/TileMosaic";
import { Container } from "@/components/ui/Container/Container";
import { Section } from "@/components/ui/Section/Section";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import { TextLink } from "@/components/ui/TextLink/TextLink";
import type { Project } from "@/content/projects";

/** Placement for up to four tiles: one hero tile, two squares, one wide. */
const slots = [
  "col-span-2 md:row-span-2",
  "",
  "",
  "col-span-2",
];

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <Section spacing="tight" aria-labelledby="featured-projects-title">
      <Container>
        <SectionHeading
          variant="ruled"
          eyebrow="Featured holiday projects"
          titleId="featured-projects-title"
          action={
            <TextLink variant="arrow" href="/work">
              View all projects
            </TextLink>
          }
        />
        <TileMosaic className="mt-10">
          {projects.slice(0, slots.length).map((project, index) => (
            <MediaTile
              key={project.slug}
              href={`/projects/${project.slug}`}
              image={project.cover}
              title={project.title}
              meta={`${project.kind} · ${project.location}`}
              cue="View project"
              prominent={index === 0}
              sizes={index === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
              className={slots[index]}
            />
          ))}
        </TileMosaic>
      </Container>
    </Section>
  );
}
