import { cn } from "@/lib/cn";

/** Hairline glyphs on a 24px grid, 1.25 stroke, per the brand icon rules. */
const paths = {
  "arrow-right": ["M3 12h17", "M15 7l5 5-5 5"],
  "chevron-down": ["M6 9l6 6 6-6"],
  "chevron-right": ["M9 6l6 6-6 6"],
  menu: ["M3 8h18", "M3 16h12"],
  close: ["M5 5l14 14", "M19 5L5 19"],
  check: ["M5 12.5l4.5 4.5L19 7"],
  calendar: ["M3.5 5h17v15.5h-17z", "M3.5 10h17", "M8 3v4", "M16 3v4"],
  alert: ["M12 3.5a8.5 8.5 0 1 1 0 17 8.5 8.5 0 0 1 0-17z", "M12 7.5v6", "M12 16v.5"],
} as const;

export type IconName = keyof typeof paths;

interface IconProps {
  name: IconName;
  className?: string;
  /** Provide only when the icon carries meaning on its own. */
  title?: string;
}

export function Icon({ name, className, title }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      className={cn("size-5 shrink-0", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {paths[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
