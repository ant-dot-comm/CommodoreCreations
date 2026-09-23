export const spaceTypes = ["Home", "Office or workplace", "Retail or hospitality", "Event or party"];

export const designOptions = [
  "Christmas tree styling",
  "Mantels & fireplace",
  "Entryways & staircases",
  "Tablescapes",
  "Whole-space decorating",
  "Installation & takedown",
];

export const scopeOptions = ["A single room", "Several rooms", "The whole space"];

export interface ConsultationValues {
  name: string;
  email: string;
  phone: string;
  city: string;
  space: string;
  date: string;
  services: string[];
  scope: string;
  notes: string;
}

export type ConsultationErrors = Partial<Record<"name" | "email", string>>;

export interface ConsultationState {
  status: "idle" | "invalid" | "sent" | "unavailable";
  values: ConsultationValues;
  errors: ConsultationErrors;
}

export const initialConsultationState: ConsultationState = {
  status: "idle",
  values: {
    name: "",
    email: "",
    phone: "",
    city: "",
    space: "",
    date: "",
    services: [],
    scope: scopeOptions[1],
    notes: "",
  },
  errors: {},
};

const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export function parseConsultation(formData: FormData) {
  const values: ConsultationValues = {
    name: text(formData, "name"),
    email: text(formData, "email"),
    phone: text(formData, "phone"),
    city: text(formData, "city"),
    space: text(formData, "space"),
    date: text(formData, "date"),
    services: formData.getAll("services").filter((value): value is string => typeof value === "string"),
    scope: text(formData, "scope"),
    notes: text(formData, "notes"),
  };

  const errors: ConsultationErrors = {};
  if (!values.name) errors.name = "Please add your name";
  if (!EMAIL_PATTERN.test(values.email)) errors.email = "Enter a valid email address";

  return { values, errors };
}
