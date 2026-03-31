# Portfolio & Resume Site — Design Spec

**Date:** 2026-03-31
**Project:** `resume-portfolio`

---

## Overview

A GitHub Pages static site for Kwon Woojin's resume and portfolio. The portfolio section focuses on **troubleshooting case studies** from the GameChu project, each structured as: Problem → Plan → Solution → Result.

---

## Tech Stack

| Layer     | Choice                                                  |
| --------- | ------------------------------------------------------- |
| Framework | Next.js (App Router) with `output: 'export'`            |
| Styling   | Tailwind CSS + shadcn/ui                                |
| Language  | TypeScript                                              |
| Hosting   | GitHub Pages                                            |
| Deploy    | GitHub Actions (push to `main` → build → deploy `out/`) |

---

## Pages & Routes

| Route               | Description                                                 |
| ------------------- | ----------------------------------------------------------- |
| `/`                 | Resume page — Hero, Projects summary, Tech Stack, Education |
| `/portfolio`        | Portfolio index — grid of 5 case study cards                |
| `/portfolio/[slug]` | Case study detail — vertical timeline layout                |

---

## Project Structure

```
resume-portfolio/
├── app/
│   ├── layout.tsx              # Shared nav + i18n provider
│   ├── page.tsx                # Resume page
│   └── portfolio/
│       ├── page.tsx            # Portfolio index
│       └── [slug]/
│           └── page.tsx        # Case study detail (SSG)
├── components/
│   ├── Nav.tsx                 # Top nav with KO/EN toggle
│   ├── resume/
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   ├── TechStack.tsx
│   │   └── Education.tsx
│   └── portfolio/
│       ├── CaseCard.tsx        # Card on index page
│       └── CaseTimeline.tsx    # Problem→Plan→Solution→Result
├── content/
│   └── cases/
│       ├── api-refactor.ts
│       ├── responsive-design.ts
│       ├── fetching-integration.ts
│       ├── redis-caching.ts
│       └── logging-cicd.ts
├── lib/
│   └── i18n.ts                 # useLanguage() hook + LanguageProvider
├── next.config.js              # output: 'export', images.unoptimized
└── .github/
    └── workflows/
        └── deploy.yml
```

---

## Visual Design

- **Style:** Clean/Minimal Light
- **Background:** White (`#ffffff`)
- **Primary accent:** Indigo (`#6366f1`)
- **Text:** Gray-900 / Gray-600
- **Components:** shadcn/ui (Card, Badge, Button, Separator)
- **Font:** System UI (Segoe UI / San Francisco)

---

## i18n (KO/EN Toggle)

- Default language: **Korean**
- `lib/i18n.ts` — React context with `useLanguage()` hook
- Language persisted in `localStorage`
- Toggle button in nav (`KO` / `EN`)
- All translatable strings typed as `{ ko: string; en: string }`
- No external i18n library — simple context pattern

---

## Content Model

Each case study is a typed TypeScript object in `content/cases/`:

```ts
export type CaseStudy = {
    slug: string;
    title: { ko: string; en: string };
    summary: { ko: string; en: string };
    tags: string[];
    techStack: string[];
    problem: { ko: string; en: string };
    plan: { ko: string; en: string };
    solution: { ko: string; en: string };
    result: { ko: string; en: string };
};
```

**5 Case Studies (all from GameChu):**

| Slug                   | Title (KO)                             | Title (EN)                                |
| ---------------------- | -------------------------------------- | ----------------------------------------- |
| `api-refactor`         | API 구조 리팩토링                      | API Structure Refactoring                 |
| `responsive-design`    | 반응형 웹 디자인                       | Responsive Web Design                     |
| `fetching-integration` | 데이터 페칭 통합                       | Integrating Fetch Logic                   |
| `redis-caching`        | Redis 캐싱으로 DB 쿼리 최적화          | Reducing DB Queries with Redis Caching    |
| `logging-cicd`         | 에러/로깅 구조 → CI/CD 파이프라인 적용 | Error/Logging Structure in CI/CD Pipeline |

---

## Resume Sections

1. **Hero** — name, title (Frontend Developer), brief self-introduction, contact links (GitHub, email)
2. **Projects** — GameChu card with description, tech stack badges, link to portfolio
3. **Tech Stack** — brief grouped badges (Frontend / Backend / Tools)
4. **Education** — 성균관대학교 수학과/소프트웨어학과, 2018.03–2025.02 + OPic IH

---

## Case Study Page Layout

Vertical timeline with 4 color-coded steps:

- 🔴 **Problem** — weakness of original structure
- 🟡 **Plan** — how I decided to resolve it
- 🔵 **Solution** — what I actually built / changed
- 🟢 **Result** — measurable or qualitative outcome

Each step has a header, body text, and optional code snippet or before/after comparison.

---

## Deployment

```yaml
# .github/workflows/deploy.yml
on:
    push:
        branches: [main]
jobs:
    deploy:
        steps:
            - checkout
            - setup Node 20
            - npm ci
            - npm run build # generates out/
            - deploy out/ to GitHub Pages
```

`next.config.js`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    images: { unoptimized: true },
};
module.exports = nextConfig;
```

GitHub repo Settings → Pages → Source: **GitHub Actions**

---

## Creation Notes

## Initial Setup Steps

### 1. Scaffold Next.js project

```bash
npx create-next-app@latest resume-portfolio \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --no-src-dir \
  --import-alias "@/*"
cd resume-portfolio
```

### 2. Install shadcn/ui

```bash
npx shadcn@latest init
# Style: Default, Base color: Slate, CSS variables: yes
npx shadcn@latest add card badge button separator
```

### 3. Git setup

```bash
git init                        # already done by create-next-app
git branch -M main
gh repo create resume-portfolio --public --source=. --remote=origin --push
```

### 4. GitHub Pages config

In GitHub repo Settings → Pages → Source: **GitHub Actions**

Add to `next.config.js` (or `next.config.ts`):

```js
const nextConfig = {
    output: "export",
    images: { unoptimized: true },
};
```

### 5. GitHub Actions deploy workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
    push:
        branches: [main]
permissions:
    contents: read
    pages: write
    id-token: write
jobs:
    build-and-deploy:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v4
            - uses: actions/setup-node@v4
              with:
                  node-version: 20
                  cache: npm
            - run: npm ci
            - run: npm run build
            - uses: actions/upload-pages-artifact@v3
              with:
                  path: out/
            - uses: actions/deploy-pages@v4
```

### 6. CLAUDE.md

Create `CLAUDE.md` at project root with:

```markdown
## resume-portfolio

Personal resume + portfolio site at GitHub Pages.

## Commands

\`\`\`bash
npm run dev # Dev server
npm run build # Static export to out/
\`\`\`

## Key Rules

- Output: static export (`out/`) — no server-side features
- i18n: simple React context in `lib/i18n.ts`, no external library
- Content: add case study = add one TS file to `content/cases/`
- Styling: Tailwind + shadcn/ui only — no custom CSS files
```

### 7. .gitignore additions

`create-next-app` generates a standard `.gitignore`. Add:

```
.superpowers/
```

### 8. Verify build

```bash
npm run build   # Should generate out/ with no errors
```
