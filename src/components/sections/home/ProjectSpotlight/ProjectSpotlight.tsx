import { ScriptNote } from "@/components/brand/ScriptNote/ScriptNote";
import { ImageFrame } from "@/components/media/ImageFrame/ImageFrame";
import { Button } from "@/components/ui/Button/Button";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import type { Project } from "@/content/projects";
import type { GalleryImage } from "@/lib/media/types";

interface ProjectSpotlightProps {
  project: Project;
  /** Two detail shots shown as scattered prints beside the main photograph. */
  details: [GalleryImage, GalleryImage];
}

/**
 * Navy panel with an angled edge overlapping the project photograph, plus
 * printed detail shots that bleed into the right margin on large screens.
 */
export function ProjectSpotlight({ project, details }: ProjectSpotlightProps) {
  return (
    <section aria-labelledby="spotlight-title" className="relative grid lg:grid-cols-14">
      <div className="relative z-content flex flex-col justify-center gap-5 bg-inverse px-gutter py-12 tone-inverse lg:col-span-4 lg:-mr-15 lg:py-16 lg:pr-16 lg:clip-slant-end">
        <Eyebrow tone="inverse">Featured project</Eyebrow>
        <h2 id="spotlight-title" className="max-w-measure-title type-h1">
          {project.title}
        </h2>
        <p className="max-w-measure-sm type-body-sm text-inverse-muted">{project.summary}</p>
        <div>
          <Button href={`/projects/${project.slug}`} variant="inverse" size="sm" icon="arrow-right">
            View full project
          </Button>
        </div>
      </div>

      <ImageFrame
        image={project.cover}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="min-h-65 lg:col-span-7 lg:min-h-115"
      />

      <div aria-hidden="true" className="relative hidden flex-col lg:col-span-3 lg:flex">
        <ImageFrame
          image={details[0]}
          sizes="10rem"
          decorative
          treatment="print"
          className="mt-9 -ml-18 aspect-portrait w-38 rotate-4"
        />
        <ImageFrame
          image={details[1]}
          sizes="10rem"
          decorative
          treatment="print"
          className="mt-3 -ml-2 aspect-square w-35 -rotate-3"
        />
        <ScriptNote
          lines={["Thoughtful", "details,", "lasting", "memories."]}
          size="sm"
          className="absolute top-10 left-38 text-accent"
        />
      </div>
    </section>
  );
}
