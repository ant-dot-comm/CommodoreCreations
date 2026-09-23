import { cn } from "@/lib/cn";

export type HeadingLevel = 1 | 2 | 3;

interface EditorialTitleProps {
  /** One entry per line. Lines are intentional editorial breaks, not wrapping. */
  lines: string | string[];
  /** Step continuation lines inward — the brand's "indented second line". */
  indent?: boolean;
  level?: HeadingLevel;
  id?: string;
  className?: string;
}

export function EditorialTitle({ lines, indent = false, level = 2, id, className }: EditorialTitleProps) {
  const Tag = `h${level}` as const;
  const list = Array.isArray(lines) ? lines : [lines];
  return (
    <Tag id={id} className={className}>
      {list.map((line, index) => (
        <span key={line} className={cn("block", indent && index > 0 && "pl-[1.1em]")}>
          {line}
        </span>
      ))}
    </Tag>
  );
}
