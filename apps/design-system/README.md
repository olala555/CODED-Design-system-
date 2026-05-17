# CODED Studio — Design System Platform

Scope 3 of the **CODED Studio** group capstone (owner: Ola).

A centralized, interactive brand-and-design ecosystem for all CODED programs —
replacing scattered PDFs and folders with a single living source of truth,
augmented by an AI brand assistant.

## What's in this scaffold

- **Next.js 16** (App Router, Turbopack) · TypeScript · Tailwind v4
- **MDX** wired up for brand-book content (`@next/mdx`)
- **CODED brand tokens** sourced from the Figma library (node `78-2641`):
  - All 8 product palettes (CODED master, AI App Developer, Unicode, CODED Juniors, Data Science, Kuwait Codes, Academy-X, Cybersecurity)
  - CSS variables in [`src/app/globals.css`](src/app/globals.css)
  - Typed data in [`src/brand.json`](src/brand.json) + [`src/lib/brand.ts`](src/lib/brand.ts)
  - Full usage rules in [`BRAND_SKILL.md`](BRAND_SKILL.md)
- **App shell**: frosted-glass sidebar + topbar with cobalt accent
- **Pages**: Dashboard, Brand Book (index + per-palette detail), AI Assistant,
  Assets, Templates, Sponsors, Products, Downloads, Settings

## Run it

```bash
cd apps/design-system
npm install   # (already installed if you cloned and ran scaffolding)
npm run dev
```

Open <http://localhost:3000>.

## File layout

```
src/
├── app/
│   ├── layout.tsx          # Root layout — fonts + AppShell
│   ├── page.tsx            # Dashboard
│   ├── globals.css         # Brand tokens + base styles
│   ├── brand-book/
│   │   ├── page.tsx        # Palette index
│   │   └── [id]/page.tsx   # Per-palette detail
│   ├── assistant/page.tsx  # AI brand assistant (stub)
│   ├── assets/page.tsx     # Asset library (stub)
│   ├── templates/page.tsx  # Dynamic templates (stub)
│   ├── sponsors/page.tsx   # Sponsor rules (stub)
│   ├── products/
│   │   ├── page.tsx        # All programs grid
│   │   └── [id]/page.tsx   # Redirects into brand book
│   ├── downloads/page.tsx  # AI prompt packs (stub)
│   └── settings/page.tsx   # Auth + sync (stub)
├── components/
│   ├── AppShell.tsx        # Sidebar + topbar + main
│   ├── Sidebar.tsx         # Glass sidebar nav
│   ├── Topbar.tsx          # Search + breadcrumb + avatar
│   ├── ProductCard.tsx     # Per-program theme card
│   ├── StatCard.tsx
│   ├── SectionHeader.tsx
│   ├── PlaceholderPage.tsx
│   └── Icon.tsx            # Inline SVG icon set
├── lib/
│   ├── brand.ts            # Typed brand data access
│   └── products.ts         # Program list + sidebar nav
├── brand.json              # Source of truth (from Figma)
└── mdx-components.tsx      # MDX styling
```

## What's next (capstone must-haves)

Per the PRD, these are the must-have features still to build:

- [ ] **Admin auth** (sign in / sign out — admins can edit, others browse)
- [ ] **Interactive brand-book pages** — convert palette detail into full
      MDX-driven pages (typography, motion, photography, sponsors)
- [ ] **Asset library** — searchable grid with downloadable SVG/PNG/fonts
- [ ] **AI brand assistant** — wire up Claude with the brand system as
      system context (the JSON in `src/brand.json` is the seed)
- [ ] **2 dynamic templates** — Certificate + Presentation, theme-switching
      per program (Satori for PDF/PNG export)
- [ ] **Downloadable `.md` prompt packs** per program

## How this fits into CODED Studio

This project is one of three independent capstone deliverables. Each ships
standalone with its own deploy, repo path, and brand-tokens copy:

| Scope | Owner | Path |
|---|---|---|
| Showcase | Majid | `apps/showcase/` *(not yet scaffolded)* |
| Content Creator | Fatma | `apps/content-creator/` *(not yet scaffolded)* |
| **Design System** | **Ola** | **`apps/design-system/`** ← you are here |

No runtime dependencies cross between them. The only shared artefact is the
brand tokens, which each project copies locally.

## Notes on the stack

- **Tailwind v4** is configured via `@theme inline` in `globals.css` — brand
  colors are exposed as `bg-coded-navy`, `text-accent`, etc.
- **Fonts**: DM Sans (Latin) + IBM Plex Sans Arabic (bilingual) +
  JetBrains Mono. Neufile Grotesk is the brand typeface — drop it into
  `src/app/fonts/` and wire it via `next/font/local` when the license is
  ready.
- **AGENTS.md** in this folder reminds Claude that Next.js 16 has breaking
  changes — always check `node_modules/next/dist/docs/` before writing
  framework code.
