# Portfolio Pages Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the portfolio index and case study detail pages — numbered list layout, vertical dot timeline, and bold blue keyword accents — without changing the resume page or navigation.

**Architecture:** A new `highlightKeywords(text, keywords)` helper in `lib/highlight.tsx` wraps matched terms in `<strong className="text-blue-600 font-semibold">`. Each `CaseStudy` object gains a `keywords?: string[]` field listing which terms to accent. Components call the helper when rendering prose fields. The portfolio index becomes a full-width numbered list; the detail timeline becomes a vertical dot connector replacing the current color-coded cards.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, TypeScript

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `lib/highlight.tsx` | **Create** | `highlightKeywords(text, keywords)` → `ReactNode` |
| `content/cases/index.ts` | **Modify** | Add `keywords?: string[]` to `CaseStudy` type |
| `content/cases/api-refactor.ts` | **Modify** | Add `keywords` array |
| `content/cases/claude-adopting.ts` | **Modify** | Add `keywords` array |
| `content/cases/fetching-integration.ts` | **Modify** | Add `keywords` array |
| `content/cases/redis-caching.ts` | **Modify** | Add `keywords` array |
| `content/cases/logging.ts` | **Modify** | Add `keywords` array |
| `content/cases/security-cluster.ts` | **Modify** | Add `keywords` array |
| `content/cases/testing-setup.ts` | **Modify** | Add `keywords` array |
| `app/portfolio/page.tsx` | **Rewrite** | Numbered list of cases with keyword accents |
| `components/portfolio/CaseTimeline.tsx` | **Rewrite** | Vertical dot timeline with keyword accents |
| `components/portfolio/CaseDetailClient.tsx` | **Modify** | New header styles + highlighted summary |
| `components/portfolio/CaseCard.tsx` | **Delete** | Replaced by inline rows in `page.tsx` |

---

## Task 1: Create `highlightKeywords` helper

**Files:**
- Create: `lib/highlight.tsx`

- [ ] **Step 1: Create the file**

```tsx
// lib/highlight.tsx
import type { ReactNode } from "react";

/**
 * Wraps occurrences of `keywords` inside `text` with bold blue <strong>.
 * Matching is case-insensitive. Longer keywords are matched first to prevent
 * partial matches (e.g. "Redis" before "Red").
 * Returns a ReactNode array safe to render directly in JSX.
 */
export function highlightKeywords(
    text: string,
    keywords: string[],
): ReactNode {
    if (!keywords.length) return text;

    const escaped = keywords
        .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
        .sort((a, b) => b.length - a.length);

    const pattern = new RegExp(`(${escaped.join("|")})`, "gi");
    const parts = text.split(pattern);

    return parts.map((part, i) =>
        keywords.some((k) => k.toLowerCase() === part.toLowerCase()) ? (
            <strong key={i} className="font-semibold text-blue-600">
                {part}
            </strong>
        ) : (
            part
        ),
    );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd C:/Users/wojin/Desktop/Projects/resume-portfolio && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add lib/highlight.tsx
git commit -m "feat: add highlightKeywords helper for bold blue keyword accents"
```

---

## Task 2: Add `keywords` field to `CaseStudy` type

**Files:**
- Modify: `content/cases/index.ts`

- [ ] **Step 1: Add `keywords` to the type**

In `content/cases/index.ts`, update the `CaseStudy` type:

```ts
export type CaseStudy = {
    slug: string;
    title: { ko: string; en: string };
    summary: { ko: string; en: string };
    tags: string[];
    techStack: string[];
    keywords?: string[];
    problem: { ko: string; en: string };
    plan: { ko: string; en: string };
    solution: { ko: string; en: string };
    result: { ko: string; en: string };
};
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors (field is optional, no existing code breaks).

- [ ] **Step 3: Commit**

```bash
git add content/cases/index.ts
git commit -m "feat: add optional keywords field to CaseStudy type"
```

---

## Task 3: Add `keywords` arrays to all case files

**Files:**
- Modify: `content/cases/api-refactor.ts`
- Modify: `content/cases/claude-adopting.ts`
- Modify: `content/cases/fetching-integration.ts`
- Modify: `content/cases/redis-caching.ts`
- Modify: `content/cases/logging.ts`
- Modify: `content/cases/security-cluster.ts`
- Modify: `content/cases/testing-setup.ts`

Add a `keywords` field to each case object immediately after `techStack`. The keywords appear verbatim in both the Korean and English prose.

- [ ] **Step 1: Update `api-refactor.ts`**

Add after `techStack: [...]`:
```ts
keywords: [
    "PostgreSQL",
    "MySQL",
    "as any",
    "UseCase",
    "ArenaWithRelations",
    "ArenaCacheService",
    "60s TTL",
    "120s TTL",
    "SCAN",
    "Redis",
    "Prisma",
],
```

- [ ] **Step 2: Update `claude-adopting.ts`**

Add after `techStack: [...]`:
```ts
keywords: ["Claude Code", "Superpowers", "everything-claude-code"],
```

- [ ] **Step 3: Update `fetching-integration.ts`**

Add after `techStack: [...]`:
```ts
keywords: [
    "useState",
    "useEffect",
    "TanStack Query",
    "useQuery",
    "useMutation",
    "queryKeys",
    "QueryProvider",
    "staleTime",
    "gcTime",
    "setQueryData",
    "createQueryWrapper",
    "invalidateQueries",
    "NotificationModal",
    "WishlistButtonClient",
    "ClientContentWrapper",
],
```

- [ ] **Step 4: Update `redis-caching.ts`**

Add after `techStack: [...]`:
```ts
keywords: [
    "withCache",
    "Redis",
    "ArenaCacheService",
    "SCAN",
    "arena:list:version",
    "redis.incr()",
    "redis.del()",
    "UseCase",
    "Clean Architecture",
],
```

- [ ] **Step 5: Update `logging.ts`**

Add after `techStack: [...]`:
```ts
keywords: [
    "console.error",
    "pino",
    "pino-pretty",
    "try-catch-rethrow",
    "UseCase",
    "logger.child",
    "HMR",
    "ISO 8601",
    "logger.warn",
    "PM2",
],
```

- [ ] **Step 6: Update `security-cluster.ts`**

Add after `techStack: [...]`:
```ts
keywords: [
    "XSS",
    "CSRF",
    "Zod",
    "TipTap",
    "Lexical",
    "middleware.ts",
    "validate()",
    "IdSchema",
    "IDOR",
    "Playwright",
    "Origin",
],
```

- [ ] **Step 7: Update `testing-setup.ts`**

Add after `techStack: [...]`:
```ts
keywords: [
    "Vitest",
    "Playwright",
    "createMockXxx",
    "createQueryWrapper",
    "UseCase",
    "Repository",
    "vi.fn()",
    "CSRF",
    "E2E",
],
```

- [ ] **Step 8: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 9: Commit**

```bash
git add content/cases/
git commit -m "feat: add keywords arrays to all case study files"
```

---

## Task 4: Rewrite portfolio index page

**Files:**
- Modify: `app/portfolio/page.tsx`
- Delete: `components/portfolio/CaseCard.tsx`

The new index page renders a numbered list of all cases. Each row: number (blue, bold) · title · one-line summary with keyword highlights · tag chips · `›` arrow.

- [ ] **Step 1: Rewrite `app/portfolio/page.tsx`**

Replace the entire file with:

```tsx
"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { highlightKeywords } from "@/lib/highlight";
import { cases } from "@/content/cases";

export default function PortfolioPage() {
    const { lang } = useLanguage();

    return (
        <div className="mx-auto max-w-4xl px-6 py-12">
            <h1 className="mb-1 text-3xl font-bold tracking-tight text-gray-900">
                {lang === "ko" ? "포트폴리오" : "Portfolio"}
            </h1>
            <p className="mb-3 text-sm text-gray-500">
                {lang === "ko"
                    ? "GameChu 프로젝트에서 해결한 7가지 문제"
                    : "7 problems solved in the GameChu project"}
            </p>
            <div className="mb-8 h-0.5 w-8 bg-blue-600" />

            <div className="flex flex-col">
                {cases.map((c, i) => (
                    <Link
                        key={c.slug}
                        href={`/portfolio/${c.slug}`}
                        className="flex items-start gap-4 border-b border-gray-100 py-4 first:border-t hover:bg-gray-50"
                    >
                        <span className="min-w-[28px] font-black tabular-nums text-blue-600">
                            {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="flex-1">
                            <p className="mb-1 text-sm font-bold text-gray-900">
                                {c.title[lang]}
                            </p>
                            <p className="mb-2 text-xs leading-relaxed text-gray-500">
                                {highlightKeywords(
                                    c.summary[lang],
                                    c.keywords ?? [],
                                )}
                            </p>
                            <div className="flex flex-wrap gap-1">
                                {c.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <span className="self-center text-lg text-gray-300">
                            ›
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
```

- [ ] **Step 2: Delete `CaseCard.tsx`**

```bash
rm components/portfolio/CaseCard.tsx
```

- [ ] **Step 3: Verify TypeScript compiles and lint passes**

```bash
npx tsc --noEmit && npm run lint
```

Expected: no errors. (If lint flags the deleted import in `CaseCard.tsx`, verify the file is gone.)

- [ ] **Step 4: Start dev server and visually verify the index page**

```bash
npm run dev
```

Open http://localhost:3000/portfolio. Verify:
- Numbered rows 01–07 appear
- Summary text has bold blue keywords
- Tag chips are `bg-blue-50 text-blue-700`
- Hover turns row background to `bg-gray-50`
- Clicking a row navigates to the case study detail

- [ ] **Step 5: Commit**

```bash
git add app/portfolio/page.tsx
git rm components/portfolio/CaseCard.tsx
git commit -m "feat: replace card grid with numbered list on portfolio index"
```

---

## Task 5: Rewrite `CaseTimeline` — vertical dot timeline

**Files:**
- Modify: `components/portfolio/CaseTimeline.tsx`

Replace the color-coded card design with a vertical dot timeline. Thin gray line connects dots; black filled dot for Problem/Plan/Solution, light gray dot for Result.

- [ ] **Step 1: Rewrite `components/portfolio/CaseTimeline.tsx`**

Replace the entire file with:

```tsx
"use client";

import { useLanguage } from "@/lib/i18n";
import { highlightKeywords } from "@/lib/highlight";
import type { CaseStudy } from "@/content/cases";

const steps = [
    { key: "problem" as const, label: { ko: "문제", en: "Problem" }, active: true },
    { key: "plan" as const, label: { ko: "계획", en: "Plan" }, active: true },
    { key: "solution" as const, label: { ko: "해결", en: "Solution" }, active: true },
    { key: "result" as const, label: { ko: "결과", en: "Result" }, active: false },
] as const;

interface Props {
    caseStudy: CaseStudy;
}

export function CaseTimeline({ caseStudy: c }: Props) {
    const { lang } = useLanguage();
    return (
        <div className="flex flex-col">
            {steps.map((step, i) => (
                <div key={step.key} className="flex gap-4 pb-6 last:pb-0">
                    {/* left column: dot + connector line */}
                    <div className="flex w-5 shrink-0 flex-col items-center">
                        <div
                            className={`mt-1 h-2.5 w-2.5 rounded-full ${
                                step.active ? "bg-gray-900" : "bg-gray-300"
                            }`}
                        />
                        {i < steps.length - 1 && (
                            <div className="mt-1 w-px flex-1 bg-gray-200" />
                        )}
                    </div>
                    {/* right column: label + body */}
                    <div className="flex-1">
                        <p className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                            {step.label[lang]}
                        </p>
                        <p className="text-sm leading-7 text-gray-600">
                            {highlightKeywords(
                                c[step.key][lang],
                                c.keywords ?? [],
                            )}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Start dev server and visually verify the detail page**

```bash
npm run dev
```

Open http://localhost:3000/portfolio/api-refactor. Verify:
- Four steps appear in a vertical column with a thin gray connecting line
- Black dot for Problem / Plan / Solution; gray dot for Result
- Step labels are small uppercase gray text
- Keywords like `PostgreSQL`, `as any`, `Redis` appear bold blue inline in the body text

- [ ] **Step 4: Commit**

```bash
git add components/portfolio/CaseTimeline.tsx
git commit -m "feat: rewrite CaseTimeline as vertical dot timeline with keyword accents"
```

---

## Task 6: Update `CaseDetailClient` — new header styles and highlighted summary

**Files:**
- Modify: `components/portfolio/CaseDetailClient.tsx`

Update the back link, title, summary, and tech stack chip styles to match the design spec.

- [ ] **Step 1: Rewrite `components/portfolio/CaseDetailClient.tsx`**

Replace the entire file with:

```tsx
"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { highlightKeywords } from "@/lib/highlight";
import { CaseTimeline } from "@/components/portfolio/CaseTimeline";
import type { CaseStudy } from "@/content/cases";

interface Props {
    caseStudy: CaseStudy;
}

export function CaseDetailClient({ caseStudy: c }: Props) {
    const { lang } = useLanguage();
    return (
        <div className="mx-auto max-w-2xl px-6 py-12">
            <Link
                href="/portfolio"
                className="mb-6 block text-xs font-bold uppercase tracking-widest text-blue-600 hover:underline"
            >
                ← {lang === "ko" ? "포트폴리오로 돌아가기" : "Back to Portfolio"}
            </Link>
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
                {c.title[lang]}
            </h1>
            <p className="mb-4 text-sm leading-relaxed text-gray-500">
                {highlightKeywords(c.summary[lang], c.keywords ?? [])}
            </p>
            <div className="mb-8 flex flex-wrap gap-2">
                {c.techStack.map((t) => (
                    <span
                        key={t}
                        className="rounded bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700"
                    >
                        {t}
                    </span>
                ))}
            </div>
            <CaseTimeline caseStudy={c} />
        </div>
    );
}
```

- [ ] **Step 2: Verify TypeScript compiles and lint passes**

```bash
npx tsc --noEmit && npm run lint
```

Expected: no errors.

- [ ] **Step 3: Visually verify the full detail page**

```bash
npm run dev
```

Open http://localhost:3000/portfolio/api-refactor. Verify:
- Back link is `text-xs font-bold uppercase tracking-widest text-blue-600`
- Title is large, bold, tight tracking
- Summary has bold blue keywords inline
- Tech stack chips are `bg-blue-50 text-blue-700` (no longer shadcn Badge)
- Timeline has the new vertical dot style from Task 5

Also open http://localhost:3000/portfolio/security-cluster and verify `XSS`, `CSRF`, `Zod`, `Lexical` appear highlighted.

Also open http://localhost:3000/portfolio/fetching-integration and verify `TanStack Query`, `useQuery`, `staleTime` appear highlighted.

- [ ] **Step 4: Run a static build to confirm no SSR/export issues**

```bash
npm run build
```

Expected: build completes with no errors. The `out/` directory is populated.

- [ ] **Step 5: Commit**

```bash
git add components/portfolio/CaseDetailClient.tsx
git commit -m "feat: update CaseDetailClient with new header styles and keyword-highlighted summary"
```

---

## Task 7: Final check — lint, build, spot-check all case studies

- [ ] **Step 1: Run lint**

```bash
npm run lint
```

Expected: no errors or warnings.

- [ ] **Step 2: Run full build**

```bash
npm run build
```

Expected: exits 0, `out/` populated.

- [ ] **Step 3: Spot-check remaining case studies in dev**

```bash
npm run dev
```

Open each page and verify keywords render correctly:
- http://localhost:3000/portfolio/claude-adopting — `Claude Code`, `Superpowers`
- http://localhost:3000/portfolio/redis-caching — `withCache`, `Clean Architecture`, `arena:list:version`
- http://localhost:3000/portfolio/logging — `pino`, `try-catch-rethrow`, `HMR`, `ISO 8601`
- http://localhost:3000/portfolio/testing-setup — `Vitest`, `createMockXxx`, `vi.fn()`

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: portfolio redesign complete — numbered list, dot timeline, keyword accents"
```
