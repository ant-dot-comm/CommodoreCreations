import { Container } from "@/components/ui/Container/Container";

interface StoryQuoteProps {
  quote: string;
  attribution: string;
  detail?: string;
}

/** Oversized client quote with a gold hairline citation. */
export function StoryQuote({ quote, attribution, detail }: StoryQuoteProps) {
  return (
    <Container size="standard" as="figure" className="flex flex-col items-center gap-8 text-center">
      <span aria-hidden="true" className="h-13 font-display text-display-xl leading-none font-light text-accent">
        &ldquo;
      </span>
      <blockquote className="max-w-measure-title type-display-m font-light">
        <p>{quote}</p>
      </blockquote>
      <figcaption className="flex items-center gap-4 type-label">
        <span aria-hidden="true" className="h-px w-8 bg-ornament" />
        <span>
          {attribution}
          {detail && <span className="text-muted"> · {detail}</span>}
        </span>
      </figcaption>
    </Container>
  );
}
