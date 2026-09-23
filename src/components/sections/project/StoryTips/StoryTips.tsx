import { Button } from "@/components/ui/Button/Button";
import { Container } from "@/components/ui/Container/Container";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { site } from "@/content/site";

interface StoryTipsProps {
  title: string;
  items: { title: string; description: string }[];
}

/** Numbered takeaways that close a case study, followed by next steps. */
export function StoryTips({ title, items }: StoryTipsProps) {
  return (
    <Container size="reading" as="section" className="flex flex-col gap-6">
      <Eyebrow as="h2">{title}</Eyebrow>
      <ol>
        {items.map((item, index) => (
          <li key={item.title} className="grid grid-cols-[auto_1fr] gap-4 border-t border-subtle py-5">
            <span className="w-10 type-numeral text-h5 text-accent">{String(index + 1).padStart(2, "0")}</span>
            <div className="flex flex-col gap-1.5">
              <h3 className="font-display text-h4">{item.title}</h3>
              <p className="type-body-sm text-secondary">{item.description}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-2 flex flex-wrap gap-4">
        <Button href={site.booking.href} icon="arrow-right">
          Plan your holiday design
        </Button>
        <Button href="/services" variant="outline">
          View services
        </Button>
      </div>
    </Container>
  );
}
