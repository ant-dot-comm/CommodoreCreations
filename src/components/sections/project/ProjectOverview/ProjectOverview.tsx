import { Container } from "@/components/ui/Container/Container";
import type { Project } from "@/content/projects";

interface ProjectOverviewProps {
  project: Project;
}

/** Key facts beside the project's one-sentence summary. */
export function ProjectOverview({ project }: ProjectOverviewProps) {
  return (
    <Container size="standard" className="grid gap-10 py-14 md:grid-cols-12 md:gap-0 md:py-26">
      <dl className="grid grid-cols-2 content-start gap-x-6 gap-y-7 md:col-span-5">
        {project.facts.map((fact) => (
          <div key={fact.label} className="border-t border-accent pt-3">
            <dt className="type-label-sm text-muted">{fact.label}</dt>
            <dd className="mt-2 font-display text-h5 leading-snug">{fact.value}</dd>
          </div>
        ))}
      </dl>
      <p className="type-lede md:col-span-6 md:col-start-7">{project.summary}</p>
    </Container>
  );
}
