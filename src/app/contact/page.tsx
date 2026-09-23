import type { Metadata } from "next";

import { ConsultationForm } from "@/components/forms/ConsultationForm/ConsultationForm";
import { ImageFrame } from "@/components/media/ImageFrame/ImageFrame";
import { EditorialTitle } from "@/components/ui/EditorialTitle/EditorialTitle";
import { Eyebrow } from "@/components/ui/Eyebrow/Eyebrow";
import { localImages } from "@/lib/media/local-library";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description:
    "Tell us about your space or event. We reply within two business days to schedule an on-site visit.",
};

export default function ContactPage() {
  return (
    <div className="grid md:grid-cols-12">
      <aside className="relative isolate overflow-hidden bg-inverse tone-inverse md:col-span-5">
        <ImageFrame
          image={localImages.candles}
          sizes="(min-width: 768px) 40vw, 100vw"
          decorative
          className="absolute inset-0 -z-10 opacity-50"
        />
        <div className="flex flex-col gap-6 px-gutter py-12 md:py-24 md:pr-16">
          <Eyebrow tone="inverse">Consultation</Eyebrow>
          <EditorialTitle level={1} lines={["Let's design", "your season."]} className="type-display-m" />
          <p className="max-w-measure-sm type-body text-inverse-muted">
            Tell us a little about your space or event. We reply within two business days to schedule
            an on-site visit.
          </p>
        </div>
      </aside>

      <section aria-label="Consultation request" className="px-gutter pt-12 pb-20 md:col-span-7 md:pt-24 md:pb-30 lg:pl-20">
        <ConsultationForm />
      </section>
    </div>
  );
}
