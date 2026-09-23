import type { ComponentPropsWithoutRef } from "react";

import { FieldLabel, FieldMessage, fieldControlClasses, fieldIds } from "@/components/forms/Field/Field";
import { Icon } from "@/components/ui/Icon/Icon";
import { cn } from "@/lib/cn";

interface SelectFieldProps extends Omit<ComponentPropsWithoutRef<"select">, "name" | "id"> {
  label: string;
  name: string;
  options: string[];
  placeholder?: string;
  hint?: string;
  error?: string;
  className?: string;
}

export function SelectField({
  label,
  name,
  options,
  placeholder = "Select",
  hint,
  error,
  className,
  defaultValue = "",
  ...selectProps
}: SelectFieldProps) {
  const { id, messageId, describedBy } = fieldIds(name, { error, hint });

  return (
    <div className={className}>
      <FieldLabel htmlFor={id} required={selectProps.required}>
        {label}
      </FieldLabel>
      <div className="relative">
        <select
          id={id}
          name={name}
          defaultValue={defaultValue}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...selectProps}
          className={cn(fieldControlClasses, "cursor-pointer pr-9")}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <Icon
          name="chevron-down"
          className="pointer-events-none absolute top-1/2 right-0.5 size-4 -translate-y-1/2"
        />
      </div>
      <FieldMessage id={messageId} error={error} hint={hint} />
    </div>
  );
}
