# Commodore Creations

Marketing and portfolio site for Commodore Creations — in-home holiday decor design and setup.

Next.js 16 (App Router, TypeScript) · Tailwind CSS v4 · deployed on Vercel.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Where things live

| Path | Contents |
| --- | --- |
| `src/styles/tokens.css` | Design tokens: brand primitives (`:root`) mapped to semantic Tailwind roles (`@theme`) |
| `src/styles/typography.css` | Typography roles — `type-display-l`, `type-h2`, `type-eyebrow`, `type-body` … |
| `src/styles/effects.css` | Brand treatments Tailwind lacks: angled cuts (`clip-slant-*`), monogram mask |
| `src/styles/base.css` | Base element styles, focus rings, `tone-inverse`, reduced motion |
| `src/lib/cn.ts` | `cn()` — clsx + tailwind-merge taught the custom token scales |
| `src/components/ui` | Primitives: Button, TextLink, Eyebrow, SectionHeading, EditorialTitle, Container, Section, Icon |
| `src/components/brand` | Logo, MonogramAccent, ScriptNote |
| `src/components/layout` | SiteHeader, PrimaryNavigation, MobileNavigation, SiteFooter |
| `src/components/media` | ImageFrame (plain / print / offset), MediaTile, TileMosaic |
| `src/components/gallery` | EditorialGallery + GalleryItem (portfolio layout) |
| `src/components/sections` | Page sections, grouped by page (`home/`, `work/`, `services/`, `project/`) plus shared `CtaBand` and `ProcessSteps` |
| `src/components/forms` | Field primitives and the ConsultationForm |
| `src/content` | Site data: navigation, services, projects, process, image collections |
| `src/lib/media` | Normalized `GalleryImage` model, layout helpers, collection resolver |
| `src/lib/google-drive` | Drive adapter (server-only) |
| `public/brand` | Monogram and wordmark SVGs built from the master logo |

## Styling conventions

- Use semantic utilities, never raw colors: `bg-primary`, `bg-inverse`, `text-secondary`, `text-accent`, `border-subtle`. Tailwind's default palette and type scale are disabled, so off-brand values fail to compile rather than slipping in.
- Use a typography role for text (`type-h2`, `type-eyebrow`) and pair it with a color token.
- Page width comes from `<Container>` (`wide` · `standard` · `reading`); vertical rhythm from `<Section>` or `py-section` / `py-section-tight`.
- Dark regions add `tone-inverse`, which switches text to ivory and focus rings to champagne.
- Motion uses `duration-fast|base|slow|reveal` with `ease-standard` / `ease-out-soft`; these collapse automatically under `prefers-reduced-motion`.

## Images and Google Drive

Every image is a normalized `GalleryImage` (`src/lib/media/types.ts`). Components never know where an image came from.

Galleries read **collections** defined in `src/content/collections.ts`. Each collection names a Drive folder and a local fallback:

```
Google Drive folder → lib/google-drive (list + normalize) → GalleryImage[] → EditorialGallery
```

To serve photography from Drive, copy `.env.example` to `.env.local` (and add the same variables in Vercel), then follow the steps in that file. After that, adding or removing photos in a Drive folder updates the site within the revalidation window, with no code change or deploy. Inside Drive:

- **Order** follows filenames, so prefix with `01 `, `02 `…
- **Alt text** comes from the file's Drive description, falling back to the filename.
- **Layout** can be set with a filename tag: `[featured]`, `[large]`, `[wide]`, `[tall]`. Without one, orientation decides.

Drive images are streamed through `/media/drive/[fileId]` so the API key stays on the server, and only files that belong to a configured collection are served. `next/image` then optimizes and caches them.

## Adding content

- **A new project**: add an entry to `src/content/projects.ts` and a matching collection in `collections.ts`. Projects with a `story` render the written case study; the rest render their gallery.
- **A new page**: compose existing sections and primitives in `src/app/<route>/page.tsx`. Page files should read as a list of sections.

## Before launch

- Replace placeholder contact details and social URLs in `src/content/site.ts`.
- Connect consultation delivery in `src/app/contact/actions.ts`. Until then the form validates and asks visitors to email the studio.
- Replace the low-resolution placeholder photography in `src/assets/images` (or connect Drive).
- Fonts are the design system's Google Fonts substitutes (Noto Serif Display, Jost, Mrs Saint Delafield); swap in licensed files if the brand has them.
