import { Container } from "@/components/ui/Container/Container";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import type { PaletteSwatch } from "@/content/projects";

interface StoryPaletteProps {
  title: string;
  swatches: PaletteSwatch[];
}

/** Material palette for a project. Swatch colors are content, so they are inline. */
export function StoryPalette({ title, swatches }: StoryPaletteProps) {
  return (
    <Container size="reading" as="section" className="flex flex-col gap-5">
      <Eyebrow as="h2">{title}</Eyebrow>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {swatches.map((swatch) => (
          <li key={swatch.name} className="flex flex-col gap-2.5">
            <span
              aria-hidden="true"
              className="aspect-square border border-subtle"
              style={{ backgroundColor: swatch.color }}
            />
            <span className="type-body-sm">{swatch.name}</span>
          </li>
        ))}
      </ul>
    </Container>
  );
}
