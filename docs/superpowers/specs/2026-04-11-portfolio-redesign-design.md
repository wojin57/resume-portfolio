# Portfolio Pages Redesign — Design Spec

**Date:** 2026-04-11  
**Audience:** Korean tech company recruiters  
**Scope:** Visual redesign of `/portfolio` (index) and `/portfolio/[slug]` (detail) — same structure, dramatically better aesthetics  
**Constraints:** Tailwind + shadcn/ui only, static export, no custom CSS files, `globals.css` additions are permitted

---

## Design Decisions

### Keyword Accent Style
Technical terms and key concepts within prose are rendered as **bold accent blue** (`font-weight: 600`, `color: #2563eb` / Tailwind `text-blue-600 font-semibold`). No background fill, no chips — just color + weight contrast inline. This keeps text readable while making important terms scannable at a glance.

Applied to:
- Card description text on the index page
- All four timeline step bodies on the detail page
- The detail page summary paragraph

Keyword wrapping is done in the content layer — each `CaseStudy` object's prose fields (`summary`, `problem`, `plan`, `solution`, `result`) will use `<strong className="text-blue-600 font-semibold">` tags embedded in a JSX render function, replacing the current plain string fields with JSX-renderable content.

> **Alternative considered and rejected:** Inline code chips (`<code>`) — too dev-specific in feel; yellow highlights — too editorial. Bold accent color is the cleanest solution.

---

## Page 1 — Portfolio Index (`/portfolio`)

### Layout
Replace the current `grid gap-4 sm:grid-cols-2 lg:grid-cols-3` card grid with a **vertical numbered list**. Each case study is a full-width row.

### Row Structure
```
[01]  Title (bold, dark)
      One-line description with keyword accents in blue
      [Tag] [Tag] [Tag]          ›
```

- Number: `text-blue-600 font-black text-sm tabular-nums`, fixed width
- Title: `font-bold text-gray-900 text-sm`
- Description: `text-xs text-gray-500 leading-relaxed` with `<strong className="text-blue-600 font-semibold">` for keywords
- Tags: small chips, `bg-blue-50 text-blue-700 text-[10px] font-semibold px-2 py-0.5 rounded`
- Arrow: `text-gray-300` chevron `›`, right-aligned, vertically centered
- Row separator: `border-b border-gray-100`
- Hover: `hover:bg-gray-50` on the row link

### Page Header
- `<h1>` large bold heading, `tracking-tight`
- Subheading in `text-gray-500 text-sm`
- Short `2px` blue accent bar (`w-8 bg-blue-600`) below the subheading, before the list

### Removed
- shadcn `Card`, `CardHeader`, `CardContent` components — replaced with plain divs
- 3-column grid layout

---

## Page 2 — Case Study Detail (`/portfolio/[slug]`)

### Layout
Max-width centered column, same `max-w-2xl px-6 py-12` as current.

### Header Section
- Back link: `text-blue-600 font-bold text-xs tracking-widest uppercase` — `← 포트폴리오로 돌아가기`
- `<h1>`: large bold title, `tracking-tight`
- Summary paragraph: `text-gray-500 text-sm leading-relaxed` with keyword accents
- Tech stack chips: same `bg-blue-50 text-blue-700` style as index tags

### Timeline (replaces `CaseTimeline`)
A new `CaseTimeline` implementation — vertical timeline with a connecting line and dots:

```
●  ─────────── (line continues down)
   PROBLEM (label, uppercase, small, gray)
   Full paragraph text with keyword accents...

●  ─────────── (line continues down)  
   PLAN
   ...

●  ─────────── (line continues down)
   SOLUTION
   ...

○              (hollow dot, last step)
   RESULT
   ...
```

**Implementation:**
- Outer container: `flex flex-col`
- Each step: `flex gap-4 pb-6 last:pb-0`
- Left column (`flex flex-col items-center w-5 shrink-0`):
  - Dot: `w-2.5 h-2.5 rounded-full mt-1` — filled `bg-gray-900` for first 3 steps, `bg-gray-300` for Result
  - Connector line: `w-px bg-gray-200 flex-1 mt-1` (not rendered on last step)
- Right column:
  - Label: `text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5`
  - Body: `text-sm text-gray-600 leading-7` with `<strong className="text-blue-600 font-semibold">` for keywords

**Removed:** The current color-coded step cards (`bg-red-50 border-red-200`, etc.) are fully replaced.

---

## Keyword Rendering Architecture

The current `CaseStudy` type uses plain strings for all prose fields. To support inline keyword accents without JSX in content files (which would require `.tsx` extensions and per-language JSX variants), a keyword-array approach is used:

**Chosen approach: `keywords: string[]` field + `highlightKeywords` render helper**

Each `CaseStudy` gains an optional `keywords` field — a flat list of terms to bold across all prose fields in all languages:

```ts
keywords?: string[];
```

A shared `highlightKeywords(text: string, keywords: string[])` utility in `lib/highlight.tsx` splits the text on matched keywords (case-insensitive, whole-word) and returns a `ReactNode` array with matches wrapped in `<strong className="text-blue-600 font-semibold">`.

Components call it as: `highlightKeywords(c.problem[lang], c.keywords ?? [])`.

**Why this works:** Technical keywords like `PostgreSQL`, `as any`, `ArenaCacheService`, `Redis`, `60s TTL` appear verbatim in both Korean and English prose — no per-language variant needed.

**Alternatives rejected:**
- JSX in content `.ts` files — requires `.tsx` extension, per-language JSX variants, React imports in content layer
- `dangerouslySetInnerHTML` with HTML strings — unsafe, untyped

---

## Files Changed

| File | Change |
|------|--------|
| `app/portfolio/page.tsx` | Replace grid with numbered list |
| `components/portfolio/CaseCard.tsx` | Delete — replaced by inline row in page |
| `components/portfolio/CaseTimeline.tsx` | Full rewrite — vertical dot timeline |
| `components/portfolio/CaseDetailClient.tsx` | Update header styles, summary keyword rendering |
| `content/cases/index.ts` | Add `keywords?: string[]` to `CaseStudy` type |
| `content/cases/*.ts` | Add `keywords` array to each case file |
| `lib/highlight.tsx` | New — `highlightKeywords(text, keywords)` helper returning `ReactNode` |

---

## Out of Scope
- Resume page (`/`) — not changed
- Navigation (`Nav.tsx`) — not changed
- Adding new case studies
- Animations or scroll effects
- Font changes (system font stack retained)
