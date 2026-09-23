"use server";

import { parseConsultation, type ConsultationState } from "@/lib/consultation/consultation";

export async function submitConsultation(
  _previous: ConsultationState,
  formData: FormData,
): Promise<ConsultationState> {
  const { values, errors } = parseConsultation(formData);
  if (Object.keys(errors).length > 0) {
    return { status: "invalid", values, errors };
  }

  // Delivery is not connected yet. Send `values` to an email or CRM provider
  // here and return { status: "sent" } once it succeeds. Until then visitors
  // are asked to email the studio, so no request is silently lost.
  return { status: "unavailable", values, errors: {} };
}
