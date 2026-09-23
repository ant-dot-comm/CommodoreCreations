import { Button } from "@/components/ui/Button/Button";
import { Container } from "@/components/ui/Container/Container";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { TextLink } from "@/components/ui/TextLink/TextLink";
import { ImageFrame } from "@/components/media/ImageFrame/ImageFrame";
import { cn } from "@/lib/cn";
import type { GalleryImage } from "@/lib/media/types";

interface CtaLink {
  label: string;
  href: string;
}

interface CtaBandProps {
  tone?: "dark" | "light";
  eyebrow: string;
  title: string;
  body?: string;
  action: CtaLink;
  secondaryAction?: CtaLink;
  /** Tracked caps line beneath the action. */
  tagline?: string;
  /** Optional photograph cut in on the leading edge (dark tone). */
  image?: GalleryImage;
}

/** Closing call to action. Dark bands lead with gold; light bands with navy. */
export function CtaBand({
  tone = "dark",
  eyebrow,
  title,
  body,
  action,
  secondaryAction,
  tagline,
  image,
}: CtaBandProps) {
  const dark = tone === "dark";
  const headingId = `cta-${title.toLowerCase().replace(/[^a-z]+/g, "-")}`;

  const content = (
    <div className="flex flex-col gap-10 md:flex-row md:flex-wrap md:items-center md:justify-between">
      <div className="flex flex-col gap-4">
        <Eyebrow tone={dark ? "inverse" : "accent"}>{eyebrow}</Eyebrow>
        <h2 id={headingId} className="type-display-m">
          {title}
        </h2>
        {body && (
          <p className={cn("max-w-measure type-body", dark ? "text-inverse-muted" : "text-secondary")}>
            {body}
          </p>
        )}
      </div>
      <div className="flex flex-col items-start gap-5">
        <div className="flex flex-wrap items-center gap-6">
          <Button href={action.href} variant={dark ? "primary" : "secondary"} icon="arrow-right">
            {action.label}
          </Button>
          {secondaryAction && (
            <TextLink variant="arrow" inverse={dark} href={secondaryAction.href}>
              {secondaryAction.label}
            </TextLink>
          )}
        </div>
        {tagline && <p className={cn("type-tagline", dark ? "text-accent-inverse" : "text-accent")}>{tagline}</p>}
      </div>
    </div>
  );

  return (
    <section
      aria-labelledby={headingId}
      className={cn(dark ? "bg-inverse tone-inverse" : "bg-secondary", image && "md:grid md:grid-cols-12")}
    >
      {image && (
        <ImageFrame
          image={image}
          sizes="(min-width: 768px) 33vw, 100vw"
          decorative
          className="h-50 md:col-span-4 md:h-full md:min-h-65 md:clip-slant-end-reverse"
        />
      )}
      {image ? (
        <div className="px-gutter py-12 md:col-span-8 md:py-16">{content}</div>
      ) : (
        <Container size="standard" className="py-section">
          {content}
        </Container>
      )}
    </section>
  );
}
