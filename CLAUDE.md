## resume-portfolio

Personal resume + portfolio site deployed on GitHub Pages.

## Commands

```bash
npm run dev      # Dev server (http://localhost:3000)
npm run build    # Static export to out/
npm run lint     # ESLint
```

## Key Rules

- **Output**: static export (`out/`) — no server-side features (no `getServerSideProps`, no API routes, no `cookies()`)
- **i18n**: simple React context in `lib/i18n.ts`, no external library — all text as `{ ko: string; en: string }`
- **Content**: add a case study = add one TS file to `content/cases/` + register in `content/cases/index.ts`
- **Styling**: Tailwind + shadcn/ui only — no custom CSS files
- **Images**: `next/image` with `unoptimized: true` (required for static export)

## Architecture

```
app/
  layout.tsx              # Shared nav + LanguageProvider
  page.tsx                # Resume page
  portfolio/
    page.tsx              # Portfolio index (case study grid)
    [slug]/page.tsx       # Case study detail (SSG via generateStaticParams)
components/
  Nav.tsx                 # Top nav with KO/EN toggle
  resume/                 # Hero, Projects, TechStack, Education
  portfolio/              # CaseCard, CaseTimeline
content/cases/            # One .ts file per case study
lib/i18n.ts               # useLanguage() hook + LanguageProvider
```

## Deployment

Push to `main` → GitHub Actions builds → deploys `out/` to GitHub Pages automatically.
GitHub repo Settings → Pages → Source: GitHub Actions

## Design Spec

Full design decisions documented in `docs/specs/2026-03-31-portfolio-design.md`
