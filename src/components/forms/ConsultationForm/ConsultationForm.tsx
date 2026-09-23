"use client";

import { useActionState, useEffect, useRef } from "react";

import { submitConsultation } from "@/app/contact/actions";
import { ChoiceField } from "@/components/forms/ChoiceField/ChoiceField";
import { DateField } from "@/components/forms/DateField/DateField";
import { FieldGroup } from "@/components/forms/FieldGroup/FieldGroup";
import { SelectField } from "@/components/forms/SelectField/SelectField";
import { TextField } from "@/components/forms/TextField/TextField";
import { Button } from "@/components/ui/Button/Button";
import { TextLink } from "@/components/ui/TextLink/TextLink";
import { site } from "@/content/site";
import {
  designOptions,
  initialConsultationState,
  scopeOptions,
  spaceTypes,
} from "@/lib/consultation/consultation";

/**
 * Consultation request. Validation runs on the server, so the form also works
 * before JavaScript loads; submitted values are echoed back as defaults so
 * nothing is lost when a field needs correcting.
 */
export function ConsultationForm() {
  const [state, formAction, pending] = useActionState(submitConsultation, initialConsultationState);
  const formRef = useRef<HTMLFormElement>(null);
  const { values, errors } = state;

  useEffect(() => {
    const firstInvalid = Object.keys(errors)[0];
    if (firstInvalid) formRef.current?.querySelector<HTMLElement>(`#field-${firstInvalid}`)?.focus();
  }, [errors]);

  if (state.status === "sent") {
    return (
      <div role="status" className="flex max-w-reading flex-col gap-5 pt-10">
        <p className="type-numeral text-h4 text-accent">Thank you.</p>
        <h2 className="type-h2">We&apos;ll be in touch within two business days.</h2>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      noValidate
      className="grid max-w-190 gap-x-10 gap-y-9 md:grid-cols-2"
    >
      <TextField label="Full name" name="name" required autoComplete="name" defaultValue={values.name} error={errors.name} />
      <TextField
        label="Email"
        name="email"
        type="email"
        required
        autoComplete="email"
        defaultValue={values.email}
        error={errors.email}
      />
      <TextField label="Phone" name="phone" type="tel" autoComplete="tel" hint="Optional" defaultValue={values.phone} />
      <TextField label="Neighborhood or city" name="city" autoComplete="address-level2" defaultValue={values.city} />
      <SelectField label="Type of space" name="space" options={spaceTypes} defaultValue={values.space} />
      <DateField label="Preferred install date" name="date" hint="Installs run Nov 1 – Dec 10" defaultValue={values.date} />

      <FieldGroup legend="What should we design?" className="md:col-span-2">
        <div className="grid md:grid-cols-2 md:gap-x-10">
          {designOptions.map((option) => (
            <ChoiceField
              key={option}
              type="checkbox"
              name="services"
              value={option}
              label={option}
              defaultChecked={values.services.includes(option)}
            />
          ))}
        </div>
      </FieldGroup>

      <FieldGroup legend="Scope" className="md:col-span-2">
        <div className="flex flex-wrap gap-x-10">
          {scopeOptions.map((option) => (
            <ChoiceField
              key={option}
              type="radio"
              name="scope"
              value={option}
              label={option}
              defaultChecked={values.scope === option}
            />
          ))}
        </div>
      </FieldGroup>

      <TextField
        label="Tell us about your space or event"
        name="notes"
        multiline
        defaultValue={values.notes}
        className="md:col-span-2"
      />

      {state.status === "unavailable" && (
        <p role="status" className="border-l border-accent pl-5 type-body text-secondary md:col-span-2">
          Online requests aren&apos;t connected yet. Please email your details to{" "}
          <TextLink href={`mailto:${site.email}`}>{site.email}</TextLink> and we&apos;ll reply within two
          business days.
        </p>
      )}

      <div className="flex flex-wrap items-center gap-6 md:col-span-2">
        <Button type="submit" variant="secondary" icon="arrow-right" disabled={pending}>
          {pending ? "Sending…" : "Request a consultation"}
        </Button>
        <p className="type-caption text-muted">* Required</p>
      </div>
    </form>
  );
}
