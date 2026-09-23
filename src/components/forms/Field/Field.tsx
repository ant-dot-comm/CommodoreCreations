import type { ReactNode } from "react";

import { Icon } from "@/components/ui/Icon/Icon";
import { cn } from "@/lib/cn";

/** Underlined control shared by text inputs, selects and date fields. */
export const fieldControlClasses = cn(
  "min-h-12 w-full appearance-none rounded-none border-0 border-b border-default bg-transparent py-3 type-body text-primary",
  "transition-[border-color,box-shadow] duration-fast ease-standard",
  "hover:border-hover focus:border-strong focus:shadow-[0_1px_0_0_currentColor] focus:outline-none",
  "aria-invalid:border-error disabled:cursor-not-allowed disabled:border-dashed disabled:border-disabled disabled:text-disabled",
);

interface FieldLabelProps {
  htmlFor: string;
  required?: boolean;
  children: ReactNode;
}

export function FieldLabel({ htmlFor, required, children }: FieldLabelProps) {
  return (
    <label htmlFor={htmlFor} className="mb-2.5 block type-label text-primary">
      {children}
      {required && (
        <span aria-hidden="true" className="text-accent">
          {" "}
          *
        </span>
      )}
    </label>
  );
}

interface FieldMessageProps {
  id: string;
  error?: string;
  hint?: string;
}

/** Hint or error beneath a control, referenced by aria-describedby. */
export function FieldMessage({ id, error, hint }: FieldMessageProps) {
  if (!error && !hint) return null;
  return (
    <p
      id={id}
      className={cn("mt-2 flex items-center gap-2 type-caption", error ? "text-error" : "text-muted")}
    >
      {error && <Icon name="alert" className="size-3.5" />}
      <span>{error ? `Error: ${error}` : hint}</span>
    </p>
  );
}

/** Shared ids and aria wiring for a labelled control. */
export function fieldIds(name: string, { error, hint }: { error?: string; hint?: string }) {
  const id = `field-${name}`;
  const messageId = `${id}-message`;
  return {
    id,
    messageId,
    describedBy: error || hint ? messageId : undefined,
  };
}
