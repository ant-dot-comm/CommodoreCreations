import type { Metadata } from "next";
import { Jost, Mrs_Saint_Delafield, Noto_Serif_Display } from "next/font/google";

import { SiteFooter } from "@/components/layout/SiteFooter/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader/SiteHeader";
import { site } from "@/content/site";

import "./globals.css";

const display = Noto_Serif_Display({
  variable: "--font-noto-serif-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const sans = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

const script = Mrs_Saint_Delafield({
  variable: "--font-mrs-saint-delafield",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} | In-Home Holiday Decor Design & Setup`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${script.variable} has-[dialog[open]]:overflow-hidden`}
    >
      <body className="flex flex-col">
        <a
          href="#main"
          className="sr-only z-modal bg-inverse px-5 py-3 type-label tone-inverse focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
