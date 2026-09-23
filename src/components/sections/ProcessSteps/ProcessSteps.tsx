import { Icon } from "@/components/ui/Icon/Icon";
import type { ProcessStep } from "@/content/process";
import { cn } from "@/lib/cn";

interface ProcessStepsProps {
  steps: ProcessStep[];
  className?: string;
}

/**
 * Numbered steps joined by a gold hairline — vertical on small screens,
 * a single horizontal row from `md`.
 */
export function ProcessSteps({ steps, className }: ProcessStepsProps) {
  return (
    <ol className={cn("grid gap-9 md:grid-cols-4 md:gap-6", className)}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        return (
          <li key={step.title} className="relative grid grid-cols-[auto_1fr] gap-x-5 md:block">
            {!isLast && (
              <span
                aria-hidden="true"
                className="absolute top-11 -bottom-9 left-5.5 w-px bg-ornament opacity-60 md:hidden"
              />
            )}
            <div className="flex items-center">
              <span className="relative z-content flex size-11 shrink-0 items-center justify-center rounded-full border border-accent bg-primary font-display text-h5 font-light">
                {index + 1}
              </span>
              {!isLast && (
                <span aria-hidden="true" className="ml-3 -mr-3 hidden flex-1 items-center text-ornament md:flex">
                  <span className="h-px flex-1 bg-current opacity-70" />
                  <Icon name="chevron-right" className="-ml-1.5 size-3" />
                </span>
              )}
            </div>
            <div className="pt-2 md:pt-5">
              <h3 className="type-h4">{step.title}</h3>
              <p className="mt-2 max-w-measure-sm type-body-sm text-secondary">{step.description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
