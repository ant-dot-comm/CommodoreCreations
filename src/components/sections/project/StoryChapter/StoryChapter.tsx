import { Container } from "@/components/ui/Container/Container";

interface StoryChapterProps {
  numeral: string;
  title: string;
  body: string[];
}

/** Numbered chapter of a case study, set in the reading column. */
export function StoryChapter({ numeral, title, body }: StoryChapterProps) {
  return (
    <Container size="reading" as="section" className="flex flex-col gap-5">
      <div className="flex items-baseline gap-4">
        <span className="type-numeral text-h4 text-accent">{numeral}</span>
        <h2 className="type-h2">{title}</h2>
      </div>
      {body.map((paragraph) => (
        <p key={paragraph} className="type-body leading-relaxed text-secondary">
          {paragraph}
        </p>
      ))}
    </Container>
  );
}
