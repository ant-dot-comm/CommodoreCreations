import { cn } from "@/lib/cn";

interface ScriptNoteProps {
  lines: string[];
  size?: "md" | "sm";
  /** Placement and color are set by the caller. */
  className?: string;
}

/**
 * Handwritten aside ("More than decor, it's a feeling."). Decorative only —
 * never carry essential information in a script note.
 */
export function ScriptNote({ lines, size = "md", className }: ScriptNoteProps) {
  return (
    <p
      aria-hidden="true"
      className={cn(
        "pointer-events-none z-decorative -rotate-8 type-script whitespace-nowrap select-none",
        size === "md" ? "text-script" : "text-h3",
        className,
      )}
    >
      {lines.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </p>
  );
}
