import { ProcessSteps } from "@/components/sections/ProcessSteps/ProcessSteps";
import { Container } from "@/components/ui/Container/Container";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { Section } from "@/components/ui/Section/Section";
import type { ProcessStep } from "@/content/process";

interface ProcessOverviewProps {
  steps: ProcessStep[];
}

export function ProcessOverview({ steps }: ProcessOverviewProps) {
  return (
    <Section spacing="tight" aria-labelledby="process-title">
      <Container className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
        <div className="flex flex-col gap-9">
          <Eyebrow as="h2" id="process-title">
            Our process
          </Eyebrow>
          <ProcessSteps steps={steps} />
        </div>
        <p className="hidden text-right type-tagline text-accent lg:block">
          A seamless experience
          <br />
          from vision to wow.
        </p>
      </Container>
    </Section>
  );
}
