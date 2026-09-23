import { ImageFrame } from "@/components/media/ImageFrame/ImageFrame";
import { Container } from "@/components/ui/Container/Container";
import type { ProjectMediaLayout } from "@/content/projects";
import type { GalleryImage } from "@/lib/media/types";

interface StoryMediaProps {
  layout: ProjectMediaLayout;
  images: GalleryImage[];
  caption?: string;
}

function Caption({ children }: { children: string }) {
  return <figcaption className="mt-3 type-caption text-muted">{children}</figcaption>;
}

/**
 * Photograph arrangements for a case study. Each layout names a composition
 * from the design; the images themselves come from project data.
 */
export function StoryMedia({ layout, images, caption }: StoryMediaProps) {
  const [first, second, third] = images;

  if (layout === "full" || layout === "single") {
    return (
      <Container size={layout === "full" ? "wide" : "standard"} as="figure">
        <ImageFrame
          image={first}
          sizes={layout === "full" ? "100vw" : "(min-width: 1280px) 1280px, 100vw"}
          className="h-75 md:h-160"
        />
        {caption && <Caption>{caption}</Caption>}
      </Container>
    );
  }

  if (layout === "pair") {
    return (
      <Container as="figure" className="grid gap-4 md:grid-cols-2">
        <ImageFrame image={first} sizes="(min-width: 768px) 50vw, 100vw" className="h-75 md:h-140" />
        <ImageFrame image={second} sizes="(min-width: 768px) 50vw, 100vw" className="h-60 md:h-140" />
        {caption && <Caption>{caption}</Caption>}
      </Container>
    );
  }

  if (layout === "feature-stack") {
    return (
      <Container size="standard" as="figure" className="grid gap-4 md:grid-cols-12">
        <ImageFrame image={first} sizes="(min-width: 768px) 58vw, 100vw" className="h-65 md:col-span-7 md:h-120" />
        <div className="grid gap-4 md:col-span-5 md:grid-rows-2">
          <ImageFrame image={second} sizes="(min-width: 768px) 42vw, 100vw" className="h-50 md:h-auto" />
          <ImageFrame image={third} sizes="(min-width: 768px) 42vw, 100vw" className="h-50 md:h-auto" />
        </div>
      </Container>
    );
  }

  return (
    <Container size="standard" as="figure" className="grid items-center gap-10 md:grid-cols-12 md:gap-4">
      <ImageFrame
        image={first}
        sizes="(min-width: 768px) 40vw, 100vw"
        treatment="offset"
        className="ml-4 h-60 md:col-span-5 md:h-105"
      />
      <div className="md:col-span-7">
        <ImageFrame image={second} sizes="(min-width: 768px) 58vw, 100vw" className="h-65 md:h-120" />
        {caption && <Caption>{caption}</Caption>}
      </div>
    </Container>
  );
}
