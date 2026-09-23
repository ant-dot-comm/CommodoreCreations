import type { Metadata } from "next";

import { CtaBand } from "@/components/sections/CtaBand/CtaBand";
import { ProcessSteps } from "@/components/sections/ProcessSteps/ProcessSteps";
import { ServiceFeature } from "@/components/sections/services/ServiceFeature/ServiceFeature";
import { Container } from "@/components/ui/Container/Container";
import { Section } from "@/components/ui/Section/Section";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import { processSteps } from "@/content/process";
import { services } from "@/content/services";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Christmas tree styling, mantels, entryways, whole-space decorating, tablescapes, seasonal refreshes, and installation and takedown.",
};

export default function ServicesPage() {
  return (
    <>
      <Section spacing="tight">
        <Container size="standard">
          <SectionHeading
            level={1}
            eyebrow="Services"
            title={["Seven ways", "we dress a space."]}
            intro="For homes, offices, storefronts and events. Every service begins with an on-site consultation, and most clients combine two or three."
          />
        </Container>
      </Section>

      {services.map((service, index) => (
        <ServiceFeature key={service.slug} service={service} reversed={index % 2 === 1} />
      ))}

      <Section id="process" aria-labelledby="process-title">
        <Container size="standard" className="flex flex-col gap-12">
          <SectionHeading
            variant="centered"
            eyebrow="How it works"
            title={["From first visit", "to the reveal."]}
            titleId="process-title"
          />
          <ProcessSteps steps={processSteps} />
        </Container>
      </Section>

      <CtaBand
        eyebrow="Make this season feel"
        title="Extraordinary."
        action={{ label: site.booking.label, href: site.booking.href }}
        secondaryAction={{ label: "Our work", href: "/work" }}
      />
    </>
  );
}
