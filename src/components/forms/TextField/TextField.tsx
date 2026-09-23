import type { ComponentPropsWithoutRef } from "react";

import { FieldLabel, FieldMessage, fieldControlClasses, fieldIds } from "@/components/forms/Field/Field";
import { cn } from "@/lib/cn";

type InputProps = Omit<ComponentPropsWithoutRef<"input">, "name" | "id">;
type TextareaProps = Omit<ComponentPropsWithoutRef<"textarea">, "name" | "id">;

interface TextFieldBaseProps {
  label: string;
  name: string;
  hint?: string;
  error?: string;
  className?: string;
}

type TextFieldProps = TextFieldBaseProps &
  ((InputProps & { multiline?: false }) | (TextareaProps & { multiline: true }));

export function TextField({ label, name, hint, error, className, multiline, ...controlProps }: TextFieldProps) {
  const { id, messageId, describedBy } = fieldIds(name, { error, hint });
  const shared = {
    id,
    name,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
  };

  return (
    <div className={className}>
      <FieldLabel htmlFor={id} required={controlProps.required}>
        {label}
      </FieldLabel>
      {multiline ? (
        <textarea
          rows={4}
          {...(controlProps as TextareaProps)}
          {...shared}
          className={cn(fieldControlClasses, "resize-y")}
        />
      ) : (
        <input type="text" {...(controlProps as InputProps)} {...shared} className={fieldControlClasses} />
      )}
      <FieldMessage id={messageId} error={error} hint={hint} />
    </div>
  );
}
