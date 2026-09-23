import { ImageFrame } from "@/components/media/ImageFrame/ImageFrame";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import type { Project } from "@/content/projects";

interface ProjectHeroProps {
  project: Project;
}

/** Full-bleed cover photograph with the project title set over a navy scrim. */
export function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <section
      aria-labelledby="project-title"
      className="relative isolate flex h-115 items-end overflow-hidden bg-inverse tone-inverse md:h-170"
    >
      <ImageFrame
        image={{ ...project.cover, priority: true }}
        sizes="100vw"
        className="absolute inset-0 -z-10"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-b from-transparent from-40% to-scrim/80"
      />
      <div className="flex flex-col gap-4 px-gutter pb-8 md:pb-14">
        <Eyebrow tone="inverse" rule>
          {project.label}
        </Eyebrow>
        <h1 id="project-title" className="max-w-measure-title type-display-l">
          {project.title}
        </h1>
      </div>
    </section>
  );
}
