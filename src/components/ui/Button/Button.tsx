import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { Icon, type IconName } from "@/components/ui/Icon/Icon";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "outline" | "inverse" | "text";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center type-button whitespace-nowrap border border-transparent transition-colors duration-fast ease-standard disabled:cursor-not-allowed";

const variants: Record<ButtonVariant, string> = {
  /** Champagne fill — the one gold call to action per view. */
  primary:
    "bg-action-primary text-on-action-primary hover:bg-action-primary-hover active:bg-action-primary-active",
  /** Navy fill for forms and light surfaces. */
  secondary:
    "bg-action-secondary text-on-action-secondary hover:bg-action-secondary-hover active:bg-action-secondary-active",
  /** Gold hairline that fills navy on hover. */
  outline:
    "border-accent text-primary hover:border-strong hover:bg-action-secondary hover:text-on-action-secondary",
  /** Gold hairline for dark surfaces; fills champagne on hover. */
  inverse:
    "border-accent-inverse text-inverse hover:bg-action-primary-hover hover:text-on-action-primary",
  /** Underlined label without a box. */
  text: "text-primary hover:text-accent",
};

const disabledVariants: Record<ButtonVariant, string> = {
  primary: "bg-action-disabled text-disabled",
  secondary: "bg-action-disabled text-disabled",
  outline: "border-disabled text-disabled",
  inverse: "border-disabled text-disabled",
  text: "text-disabled",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-11 gap-2.5 px-5",
  md: "min-h-13 gap-3.5 px-7",
  lg: "min-h-15 gap-4 px-9",
};

interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
}

function buttonClasses({
  variant = "primary",
  size = "md",
  disabled = false,
  className,
}: ButtonStyleOptions) {
  return cn(
    base,
    variant === "text" ? "min-h-11 gap-3 px-0" : sizes[size],
    disabled ? disabledVariants[variant] : variants[variant],
    className,
  );
}

interface ButtonOwnProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName;
  iconPosition?: "start" | "end";
  children: ReactNode;
  className?: string;
}

type LinkRest = Omit<ComponentPropsWithoutRef<typeof Link>, keyof ButtonOwnProps> & {
  href: string;
};
type NativeRest = Omit<ComponentPropsWithoutRef<"button">, keyof ButtonOwnProps> & {
  href?: undefined;
};

export type ButtonProps = ButtonOwnProps & (LinkRest | NativeRest);

function isLink(rest: LinkRest | NativeRest): rest is LinkRest {
  return rest.href !== undefined;
}

export function Button({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "end",
  children,
  className,
  ...rest
}: ButtonProps) {
  const iconNode = icon && (
    <Icon
      name={icon}
      className={cn(
        "size-4.5 transition-transform duration-base ease-out-soft",
        iconPosition === "end" && "group-hover:translate-x-1",
      )}
    />
  );
  const content = (
    <>
      {iconPosition === "start" && iconNode}
      <span className={cn(variant === "text" && "border-b border-accent pb-1.5")}>{children}</span>
      {iconPosition === "end" && iconNode}
    </>
  );

  if (isLink(rest)) {
    return (
      <Link {...rest} className={buttonClasses({ variant, size, className })}>
        {content}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = rest;
  return (
    <button
      type={type}
      {...buttonProps}
      className={buttonClasses({ variant, size, disabled: buttonProps.disabled, className })}
    >
      {content}
    </button>
  );
}
