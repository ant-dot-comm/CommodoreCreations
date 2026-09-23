import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge only knows Tailwind's default scale. These lists mirror the
 * custom tokens in src/styles so overrides resolve correctly — without them,
 * `text-display-l` is mistaken for a color and dropped next to `text-primary`.
 * Keep in sync with tokens.css, typography.css and effects.css.
 */
const typeRoles = [
  "display-xl", "display-l", "display-m",
  "h1", "h2", "h3", "h4", "h5", "lede",
  "body-lg", "body", "body-sm", "caption",
  "eyebrow", "tagline", "label", "label-sm", "button", "nav", "numeral", "script",
];

const twMerge = extendTailwindMerge<"type-role" | "clip-slant">({
  extend: {
    theme: {
      text: [
        "display-xl", "display-l", "display-m", "h1", "h2", "h3", "h4", "h5",
        "body-lg", "body", "body-sm", "caption", "label", "label-sm", "numeral", "script",
      ],
      font: ["display", "sans", "script"],
      tracking: ["nav", "button", "label", "eyebrow"],
      spacing: ["gutter", "section", "section-tight", "header", "header-lg"],
      container: ["wide", "standard", "reading", "narrow", "measure-title", "measure-sm", "measure", "measure-lg"],
      aspect: ["cinema", "landscape", "classic", "portrait", "tall"],
      shadow: ["print", "photo"],
      ease: ["standard", "out-soft"],
    },
    classGroups: {
      "type-role": [{ type: typeRoles }],
      "clip-slant": [{ "clip-slant": ["start", "end", "end-reverse", "bottom"] }, "clip-none"],
      duration: [{ duration: ["fast", "base", "slow", "reveal"] }],
      z: [{ z: ["content", "decorative", "navigation", "modal"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
