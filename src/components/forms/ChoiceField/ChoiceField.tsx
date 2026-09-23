import type { ComponentPropsWithoutRef } from "react";

import { Icon } from "@/components/ui/Icon/Icon";
import { cn } from "@/lib/cn";

interface ChoiceFieldProps extends Omit<ComponentPropsWithoutRef<"input">, "type"> {
  type: "checkbox" | "radio";
  label: string;
}

/**
 * Checkbox or radio drawn with CSS on the native input, so checked state,
 * keyboard behavior and form submission all stay native.
 */
export function ChoiceField({ type, label, className, ...inputProps }: ChoiceFieldProps) {
  const isRadio = type === "radio";
  return (
    <label className={cn("flex min-h-11 cursor-pointer items-start gap-3.5 pt-3", className)}>
      <span className="relative mt-px flex size-5 shrink-0 items-center justify-center">
        <input
          type={type}
          {...inputProps}
          className={cn(
            "peer absolute inset-0 m-0 cursor-pointer appearance-none border border-default transition-colors duration-fast",
            "hover:border-strong checked:border-strong",
            isRadio ? "rounded-full" : "rounded-xs checked:bg-action-secondary",
          )}
        />
        {isRadio ? (
          <span className="pointer-events-none size-2 scale-0 rounded-full bg-action-secondary transition-transform duration-fast peer-checked:scale-100" />
        ) : (
          <Icon
            name="check"
            className="pointer-events-none relative size-3.5 text-on-action-secondary opacity-0 peer-checked:opacity-100"
          />
        )}
      </span>
      <span className="type-body leading-snug text-primary">{label}</span>
    </label>
  );
}
