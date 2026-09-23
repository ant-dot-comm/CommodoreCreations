import type { ComponentPropsWithoutRef } from "react";

import { FieldLabel, FieldMessage, fieldControlClasses, fieldIds } from "@/components/forms/Field/Field";
import { Icon } from "@/components/ui/Icon/Icon";
import { cn } from "@/lib/cn";

interface DateFieldProps extends Omit<ComponentPropsWithoutRef<"input">, "name" | "id" | "type"> {
  label: string;
  name: string;
  hint?: string;
  error?: string;
  className?: string;
}

/**
 * Native date input with the brand calendar glyph. The browser's own picker
 * indicator is made transparent and laid over the glyph, so it still opens
 * the picker without drawing a second icon.
 */
export function DateField({ label, name, hint, error, className, ...inputProps }: DateFieldProps) {
  const { id, messageId, describedBy } = fieldIds(name, { error, hint });

  return (
    <div className={className}>
      <FieldLabel htmlFor={id} required={inputProps.required}>
        {label}
      </FieldLabel>
      <div className="relative">
        <input
          type="date"
          id={id}
          name={name}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...inputProps}
          className={cn(
            fieldControlClasses,
            "pr-9 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0",
          )}
        />
        <Icon
          name="calendar"
          className="pointer-events-none absolute top-1/2 right-0 size-4.5 -translate-y-1/2"
        />
      </div>
      <FieldMessage id={messageId} error={error} hint={hint} />
    </div>
  );
}
