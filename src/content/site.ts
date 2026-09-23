/**
 * Studio details shown across the site.
 * Contact details and social URLs are placeholders from the design comps —
 * replace them with the real values before launch.
 */
export const site = {
  name: "Commodore Creations",
  tagline: "Holiday styling for a more beautiful life.",
  description:
    "Commodore Creations designs and installs holiday decor for homes, offices and event spaces across San Diego County.",
  email: "hello@commodorecreations.com",
  phone: "(858) 555-0142",
  serviceArea: "San Diego County · Orange County · by appointment beyond",
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Pinterest", href: "https://www.pinterest.com/" },
  ],
  booking: {
    label: "Book your holiday design",
    href: "/contact",
  },
} as const;

export function telHref(phone: string) {
  return `tel:+1${phone.replace(/\D/g, "")}`;
}
