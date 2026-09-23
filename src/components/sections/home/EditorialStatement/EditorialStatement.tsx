import { ScriptNote } from "@/components/brand/ScriptNote/ScriptNote";
import { ImageFrame } from "@/components/media/ImageFrame/ImageFrame";
import { EditorialTitle } from "@/components/ui/EditorialTitle/EditorialTitle";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import type { GalleryImage } from "@/lib/media/types";

interface EditorialStatementProps {
  image: GalleryImage;
}

/** Brand belief statement: angled detail photograph, indented headline, script aside. */
export function EditorialStatement({ image }: EditorialStatementProps) {
  return (
    <section
      aria-labelledby="statement-title"
      className="grid items-center gap-8 bg-tertiary pb-12 md:grid-cols-12 md:gap-10 md:pr-gutter md:pb-0"
    >
      <ImageFrame
        image={image}
        sizes="(min-width: 768px) 25vw, 100vw"
        className="h-55 clip-slant-end md:col-span-3 md:h-65"
      />

      <div className="flex flex-col gap-5 px-gutter md:col-span-4 md:px-0">
        <Eyebrow>
          Your space.
          <br />
          Your traditions.
        </Eyebrow>
        <EditorialTitle
          id="statement-title"
          lines={["Beautifully", "reimagined."]}
          indent
          className="type-display-m"
        />
      </div>

      <p className="mx-gutter max-w-measure-sm border-l border-accent pl-7 type-body text-secondary md:col-span-3 md:mx-0">
        We believe the best holiday spaces feel like you — elevated. Our designs enhance the unique
        character of your space, creating seasonal moments that bring people together.
      </p>

      <div className="relative hidden h-50 border-l border-accent-soft md:col-span-2 md:block">
        <ScriptNote lines={["Spaces", "that bring", "us closer."]} className="absolute top-10 left-10 text-accent" />
      </div>
    </section>
  );
}
