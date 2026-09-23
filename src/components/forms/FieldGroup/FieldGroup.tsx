import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface FieldGroupProps {
  legend: string;
  children: ReactNode;
  className?: string;
}

/** Fieldset for related checkboxes or radios, labelled like a single field. */
export function FieldGroup({ legend, children, className }: FieldGroupProps) {
  return (
    <fieldset className={cn("m-0 border-0 p-0", className)}>
      <legend className="mb-1 type-label text-primary">{legend}</legend>
      {children}
    </fieldset>
  );
}
