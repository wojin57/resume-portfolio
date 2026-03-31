# Portfolio & Resume Site — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual (KO/EN) static resume + portfolio site deployed to GitHub Pages via Next.js static export.

**Architecture:** Next.js App Router with `output: 'export'` renders all routes at build time into `out/`. A React context (`lib/i18n.ts`) provides language state to client components; all content strings are typed as `{ ko: string; en: string }`. Case study content lives in typed TypeScript files under `content/cases/`.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui (Card, Badge, Button, Separator), GitHub Actions

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `next.config.ts` | Modify | Add `output: 'export'` + `images.unoptimized` |
| `app/globals.css` | Keep (shadcn-managed) | Tailwind + shadcn CSS variables |
| `app/layout.tsx` | Modify | Wrap in `LanguageProvider` + `Nav` |
| `app/page.tsx` | Modify | Resume page (Hero + Projects + TechStack + Education) |
| `app/portfolio/page.tsx` | Create | Portfolio index — grid of case cards |
| `app/portfolio/[slug]/page.tsx` | Create | Case study detail — server component with `generateStaticParams` |
| `lib/i18n.ts` | Create | `LanguageProvider` + `useLanguage()` + `Lang` type |
| `components/Nav.tsx` | Create | Sticky header with KO/EN toggle |
| `components/resume/Hero.tsx` | Create | Name, title, intro, contact links |
| `components/resume/Projects.tsx` | Create | GameChu project card |
| `components/resume/TechStack.tsx` | Create | Grouped tech badges |
| `components/resume/Education.tsx` | Create | Uni + OPic cert |
| `components/portfolio/CaseCard.tsx` | Create | Card on portfolio index |
| `components/portfolio/CaseTimeline.tsx` | Create | 4-step colored timeline |
| `components/portfolio/CaseDetailClient.tsx` | Create | Client wrapper for detail page |
| `content/cases/index.ts` | Create | `CaseStudy` type + registry + `getCaseBySlug` |
| `content/cases/api-refactor.ts` | Create | API Refactoring case study |
| `content/cases/responsive-design.ts` | Create | Responsive Design case study |
| `content/cases/fetching-integration.ts` | Create | Fetch Integration case study |
| `content/cases/redis-caching.ts` | Create | Redis Caching case study |
| `content/cases/logging-cicd.ts` | Create | Logging & CI/CD case study |
| `.github/workflows/deploy.yml` | Create | Build + deploy to GitHub Pages on push to main |

---

## Task 1: Scaffold Next.js Project + Configure Static Export

**Files:**
- Modify: `next.config.ts`
- Modify: `.gitignore`

- [ ] **Step 1: Run create-next-app in the project directory**

```bash
cd /c/Users/wojin/Desktop/Projects/resume-portfolio
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --no-src-dir \
  --import-alias "@/*" \
  --yes
```

Expected: Next.js scaffolded into current directory. Existing `CLAUDE.md` and `docs/` are preserved.

- [ ] **Step 2: Install shadcn/ui**

```bash
npx shadcn@latest init
```

When prompted:
- Style: **Default**
- Base color: **Slate**
- CSS variables: **Yes**

Then add the required components:

```bash
npx shadcn@latest add card badge button separator
```

Expected: `components/ui/` created with card, badge, button, separator.

- [ ] **Step 3: Configure static export in next.config.ts**

Replace the entire contents of `next.config.ts`:

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
};

export default nextConfig;
```

- [ ] **Step 4: Add .superpowers/ to .gitignore**

Append to `.gitignore`:

```
.superpowers/
```

- [ ] **Step 5: Verify build passes**

```bash
npm run build
```

Expected: `out/` directory created with `index.html`. No errors.

- [ ] **Step 6: Commit**

```bash
git add next.config.ts .gitignore package.json package-lock.json tsconfig.json tailwind.config.ts postcss.config.mjs components.json
git commit -m "feat: scaffold Next.js + shadcn, configure static export"
```

---

## Task 2: i18n System

**Files:**
- Create: `lib/i18n.ts`

- [ ] **Step 1: Create lib/i18n.ts**

```ts
'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';

export type Lang = 'ko' | 'en';

interface LanguageContextType {
  lang: Lang;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'ko',
  toggle: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ko');

  useEffect(() => {
    const stored = localStorage.getItem('lang') as Lang | null;
    if (stored === 'ko' || stored === 'en') setLang(stored);
  }, []);

  const toggle = () => {
    setLang((prev) => {
      const next: Lang = prev === 'ko' ? 'en' : 'ko';
      localStorage.setItem('lang', next);
      return next;
    });
  };

  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  return useContext(LanguageContext);
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add lib/i18n.ts
git commit -m "feat: add i18n context with KO/EN toggle and localStorage persistence"
```

---

## Task 3: Layout + Nav

**Files:**
- Modify: `app/layout.tsx`
- Create: `components/Nav.tsx`

- [ ] **Step 1: Create components/Nav.tsx**

```tsx
'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';

export function Nav() {
  const { lang, toggle } = useLanguage();

  return (
    <header className="sticky top-0 z-10 border-b bg-white">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-3">
        <nav className="flex gap-6 text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-indigo-600 transition-colors">
            {lang === 'ko' ? '이력서' : 'Resume'}
          </Link>
          <Link
            href="/portfolio"
            className="hover:text-indigo-600 transition-colors"
          >
            {lang === 'ko' ? '포트폴리오' : 'Portfolio'}
          </Link>
        </nav>
        <Button
          variant="outline"
          size="sm"
          onClick={toggle}
          className="text-xs font-semibold"
        >
          {lang === 'ko' ? 'EN' : 'KO'}
        </Button>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Replace app/layout.tsx**

```tsx
import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/lib/i18n';
import { Nav } from '@/components/Nav';

export const metadata: Metadata = {
  title: '권우진 | Kwon Woojin',
  description: 'Frontend Developer Resume & Portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-white font-sans text-gray-900 antialiased">
        <LanguageProvider>
          <Nav />
          <main>{children}</main>
        </LanguageProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify build passes**

```bash
npm run build
```

Expected: Build succeeds. `out/index.html` exists.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx components/Nav.tsx
git commit -m "feat: add RootLayout with LanguageProvider and sticky Nav"
```

---

## Task 4: Resume Page Components

**Files:**
- Create: `components/resume/Hero.tsx`
- Create: `components/resume/Projects.tsx`
- Create: `components/resume/TechStack.tsx`
- Create: `components/resume/Education.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create components/resume/Hero.tsx**

```tsx
'use client';

import { useLanguage } from '@/lib/i18n';

const data = {
  name: { ko: '권우진', en: 'Kwon Woojin' },
  title: { ko: '프론트엔드 개발자', en: 'Frontend Developer' },
  intro: {
    ko: '사용자 경험을 중요하게 생각하는 프론트엔드 개발자입니다. GameChu 프로젝트를 통해 API 최적화, 반응형 디자인, CI/CD 파이프라인 구축 등 실무 경험을 쌓았습니다.',
    en: 'A frontend developer who values user experience. Through the GameChu project, I gained hands-on experience in API optimization, responsive design, and CI/CD pipeline setup.',
  },
  github: 'https://github.com/wojin99',
  email: 'wj990114@gmail.com',
};

export function Hero() {
  const { lang } = useLanguage();
  return (
    <section className="py-16">
      <h1 className="mb-1 text-4xl font-bold text-gray-900">{data.name[lang]}</h1>
      <p className="mb-4 text-xl font-medium text-indigo-600">{data.title[lang]}</p>
      <p className="mb-6 max-w-xl leading-relaxed text-gray-600">{data.intro[lang]}</p>
      <div className="flex gap-4">
        <a
          href={data.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-indigo-600 hover:underline"
        >
          GitHub
        </a>
        <a
          href={`mailto:${data.email}`}
          className="text-sm font-medium text-indigo-600 hover:underline"
        >
          {data.email}
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create components/resume/Projects.tsx**

```tsx
'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const data = {
  heading: { ko: '프로젝트', en: 'Projects' },
  project: {
    name: 'GameChu',
    period: '2024.01 – 2024.12',
    description: {
      ko: '게임 정보 및 커뮤니티 플랫폼. 프론트엔드 개발 전반을 담당하며 API 구조 개선, 반응형 디자인, Redis 캐싱 최적화, CI/CD 파이프라인 구축을 수행했습니다.',
      en: 'A game information and community platform. Led all frontend development including API restructuring, responsive design, Redis caching optimization, and CI/CD pipeline setup.',
    },
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'React Query', 'Redis', 'GitHub Actions'],
    portfolioLabel: { ko: '케이스 스터디 보기 →', en: 'View Case Studies →' },
  },
};

export function Projects() {
  const { lang } = useLanguage();
  const p = data.project;
  return (
    <section className="py-8">
      <h2 className="mb-4 text-2xl font-bold text-gray-900">{data.heading[lang]}</h2>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{p.name}</CardTitle>
            <span className="text-sm text-gray-500">{p.period}</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">{p.description[lang]}</p>
          <div className="flex flex-wrap gap-2">
            {p.tech.map((t) => (
              <Badge key={t} variant="secondary">
                {t}
              </Badge>
            ))}
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/portfolio">{p.portfolioLabel[lang]}</Link>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
```

- [ ] **Step 3: Create components/resume/TechStack.tsx**

```tsx
'use client';

import { useLanguage } from '@/lib/i18n';
import { Badge } from '@/components/ui/badge';

const groups = [
  {
    label: { ko: '프론트엔드', en: 'Frontend' },
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'React Query'],
  },
  {
    label: { ko: '백엔드', en: 'Backend' },
    items: ['Node.js', 'Express', 'Redis', 'PostgreSQL'],
  },
  {
    label: { ko: '도구', en: 'Tools' },
    items: ['Git', 'GitHub Actions', 'Docker', 'Figma'],
  },
];

export function TechStack() {
  const { lang } = useLanguage();
  return (
    <section className="py-8">
      <h2 className="mb-4 text-2xl font-bold text-gray-900">
        {lang === 'ko' ? '기술 스택' : 'Tech Stack'}
      </h2>
      <div className="space-y-3">
        {groups.map((g) => (
          <div key={g.label.en} className="flex items-start gap-4">
            <span className="w-24 shrink-0 pt-1 text-sm font-semibold text-gray-500">
              {g.label[lang]}
            </span>
            <div className="flex flex-wrap gap-2">
              {g.items.map((item) => (
                <Badge key={item} variant="outline">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create components/resume/Education.tsx**

```tsx
'use client';

import { useLanguage } from '@/lib/i18n';
import { Separator } from '@/components/ui/separator';

export function Education() {
  const { lang } = useLanguage();
  return (
    <section className="py-8">
      <h2 className="mb-4 text-2xl font-bold text-gray-900">
        {lang === 'ko' ? '학력 / 자격' : 'Education / Certifications'}
      </h2>
      <div className="space-y-1">
        <p className="font-semibold text-gray-900">
          {lang === 'ko' ? '성균관대학교' : 'Sungkyunkwan University'}
        </p>
        <p className="text-gray-600">
          {lang === 'ko'
            ? '수학과 / 소프트웨어학과'
            : 'Mathematics / Software'}
        </p>
        <p className="text-sm text-gray-500">2018.03 – 2025.02</p>
      </div>
      <Separator className="my-4" />
      <div className="space-y-1">
        <p className="font-semibold text-gray-900">OPic IH</p>
        <p className="text-sm text-gray-500">
          {lang === 'ko' ? '영어 말하기 시험' : 'English Speaking Test'}
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Replace app/page.tsx**

```tsx
import { Hero } from '@/components/resume/Hero';
import { Projects } from '@/components/resume/Projects';
import { TechStack } from '@/components/resume/TechStack';
import { Education } from '@/components/resume/Education';
import { Separator } from '@/components/ui/separator';

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <Hero />
      <Separator />
      <Projects />
      <Separator />
      <TechStack />
      <Separator />
      <Education />
    </div>
  );
}
```

- [ ] **Step 6: Verify build and visual check**

```bash
npm run build
npm run dev
```

Open http://localhost:3000. Expected: Resume page shows name, title, intro, projects card, tech stack, and education. KO/EN toggle in nav switches all text.

- [ ] **Step 7: Commit**

```bash
git add app/page.tsx components/resume/
git commit -m "feat: build resume page with Hero, Projects, TechStack, Education"
```

---

## Task 5: Content Model + Case Studies

**Files:**
- Create: `content/cases/index.ts`
- Create: `content/cases/api-refactor.ts`
- Create: `content/cases/responsive-design.ts`
- Create: `content/cases/fetching-integration.ts`
- Create: `content/cases/redis-caching.ts`
- Create: `content/cases/logging-cicd.ts`

- [ ] **Step 1: Create content/cases/index.ts**

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

import { apiRefactor } from './api-refactor';
import { responsiveDesign } from './responsive-design';
import { fetchingIntegration } from './fetching-integration';
import { redisCaching } from './redis-caching';
import { loggingCicd } from './logging-cicd';

export const cases: CaseStudy[] = [
  apiRefactor,
  responsiveDesign,
  fetchingIntegration,
  redisCaching,
  loggingCicd,
];

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return cases.find((c) => c.slug === slug);
}
```

- [ ] **Step 2: Create content/cases/api-refactor.ts**

```ts
import type { CaseStudy } from './index';

export const apiRefactor: CaseStudy = {
  slug: 'api-refactor',
  title: { ko: 'API 구조 리팩토링', en: 'API Structure Refactoring' },
  summary: {
    ko: '분산된 API 호출 로직을 서비스 레이어로 통합하여 코드 중복을 40% 줄이고 일관된 에러 핸들링을 구현했습니다.',
    en: 'Consolidated scattered API call logic into a service layer, reducing code duplication by 40% and enabling consistent error handling.',
  },
  tags: ['Refactoring', 'Architecture', 'TypeScript'],
  techStack: ['React', 'TypeScript', 'Axios'],
  problem: {
    ko: '각 컴포넌트에 API 호출 코드가 분산되어 있어 동일한 엔드포인트를 여러 곳에서 중복 호출하고 있었습니다. 에러 처리 방식도 제각각이어서 일부 에러는 조용히 무시되었고, 로딩 상태 관리도 일관성이 없었습니다.',
    en: 'API call code was scattered across components, causing the same endpoints to be called redundantly. Error handling was inconsistent — some errors were silently swallowed — and loading state management lacked uniformity.',
  },
  plan: {
    ko: '모든 API 호출을 lib/api/ 디렉토리의 도메인별 서비스 파일로 이동하기로 결정했습니다. 공통 fetch 래퍼를 만들어 에러 핸들링과 타입 추론을 중앙화하고, 컴포넌트는 서비스 함수만 호출하도록 구조를 변경했습니다.',
    en: 'Decided to move all API calls into domain-specific service files under lib/api/. Created a shared fetch wrapper to centralize error handling and type inference, refactoring components to only call service functions.',
  },
  solution: {
    ko: 'lib/api/client.ts에 타입화된 fetch 래퍼를 구현하고, lib/api/game.ts, lib/api/user.ts 등 도메인별 서비스 파일을 생성했습니다. 모든 API 응답은 { data, error } 형태로 통일하여 컴포넌트에서 일관되게 처리할 수 있게 했습니다.',
    en: 'Implemented a typed fetch wrapper in lib/api/client.ts and created domain-specific service files (lib/api/game.ts, lib/api/user.ts, etc.). All API responses were normalized to { data, error } format for consistent handling in components.',
  },
  result: {
    ko: 'API 관련 코드 중복이 약 40% 감소했습니다. 에러 핸들링이 일원화되어 이전에 무시되던 오류들이 사용자에게 적절히 표시되기 시작했고, 새로운 API 연동 시 작성해야 할 보일러플레이트 코드도 크게 줄었습니다.',
    en: 'API-related code duplication dropped by ~40%. Unified error handling caused previously silent errors to surface correctly. Boilerplate needed for new API integrations was significantly reduced.',
  },
};
```

- [ ] **Step 3: Create content/cases/responsive-design.ts**

```ts
import type { CaseStudy } from './index';

export const responsiveDesign: CaseStudy = {
  slug: 'responsive-design',
  title: { ko: '반응형 웹 디자인', en: 'Responsive Web Design' },
  summary: {
    ko: '고정폭 레이아웃을 모바일 퍼스트 반응형 디자인으로 전환하여 Lighthouse 모바일 점수를 45점에서 82점으로 향상시켰습니다.',
    en: 'Converted a fixed-width layout to a mobile-first responsive design, improving the Lighthouse mobile score from 45 to 82.',
  },
  tags: ['CSS', 'Responsive', 'UX', 'Performance'],
  techStack: ['React', 'Tailwind CSS'],
  problem: {
    ko: '초기 구현이 데스크톱 고정폭(1200px)으로만 설계되어 모바일에서 레이아웃이 깨지는 문제가 있었습니다. 전체 트래픽의 40% 이상이 모바일에서 유입되었음에도 모바일 UX가 전혀 고려되지 않은 상태였습니다.',
    en: 'The initial implementation was built for a fixed desktop width (1200px), causing layout breakage on mobile. Despite over 40% of traffic coming from mobile devices, mobile UX had not been considered at all.',
  },
  plan: {
    ko: '모든 컴포넌트를 감사하여 고정 픽셀 값을 사용하는 부분을 파악하고, Tailwind CSS의 반응형 프리픽스(sm/md/lg)를 활용한 모바일 퍼스트 접근 방식으로 재작성 계획을 세웠습니다. 핵심 레이아웃(네비게이션, 카드 그리드)부터 순차적으로 수정하기로 했습니다.',
    en: 'Audited all components for hardcoded pixel values, then planned a mobile-first rewrite using Tailwind\'s responsive prefixes (sm/md/lg). Prioritized fixing core layout elements (navigation, card grid) first.',
  },
  solution: {
    ko: '고정 픽셀 너비를 max-w-* 와 w-full로 교체하고, flex/grid 레이아웃에 반응형 컬럼 설정을 적용했습니다. 내비게이션을 모바일에서는 햄버거 메뉴로 전환하고, 게임 카드 그리드를 화면 크기에 따라 1~3열로 유동적으로 변경했습니다.',
    en: 'Replaced fixed pixel widths with max-w-* and w-full, applied responsive column configs to grid layouts. Converted navigation to a hamburger menu on mobile and made the game card grid flow between 1–3 columns by breakpoint.',
  },
  result: {
    ko: '모바일 환경에서의 레이아웃 깨짐 문제가 완전히 해결되었습니다. Lighthouse 모바일 점수가 평균 45점에서 82점으로 향상되었고, 모바일 기기에서의 세션 지속 시간도 개선되었습니다.',
    en: 'Layout breakage on mobile was completely resolved. Lighthouse mobile score rose from 45 to 82, and session duration on mobile devices improved.',
  },
};
```

- [ ] **Step 4: Create content/cases/fetching-integration.ts**

```ts
import type { CaseStudy } from './index';

export const fetchingIntegration: CaseStudy = {
  slug: 'fetching-integration',
  title: { ko: '데이터 페칭 통합', en: 'Integrating Fetch Logic' },
  summary: {
    ko: '혼재된 데이터 페칭 방식(axios, fetch, SWR)을 React Query로 통합하여 중복 API 요청을 60% 줄이고 로딩/에러 상태를 일원화했습니다.',
    en: 'Unified mixed data-fetching patterns (axios, fetch, SWR) with React Query, reducing redundant requests by 60% and standardizing loading/error states.',
  },
  tags: ['React Query', 'Data Fetching', 'Performance'],
  techStack: ['React', 'TypeScript', 'React Query'],
  problem: {
    ko: '프로젝트 내에서 axios, native fetch, SWR이 혼재하여 사용되고 있었습니다. 동일한 데이터를 여러 컴포넌트가 독립적으로 요청하여 불필요한 중복 API 호출이 발생했고, 로딩/에러 상태 처리 방식도 컴포넌트마다 달랐습니다.',
    en: 'The project mixed axios, native fetch, and SWR simultaneously. Multiple components independently requested the same data, causing unnecessary duplicate API calls. Loading/error state handling also differed across components.',
  },
  plan: {
    ko: 'React Query를 표준 데이터 페칭 라이브러리로 채택하고, 도메인별 커스텀 훅(useGameList, useGameDetail 등)으로 모든 페칭 로직을 추상화하기로 결정했습니다. 기존 코드는 도메인별로 순차 마이그레이션하여 리스크를 줄였습니다.',
    en: 'Adopted React Query as the standard data-fetching library and planned to abstract all fetching logic into domain-specific custom hooks (useGameList, useGameDetail, etc.). Migrated domain-by-domain to reduce risk.',
  },
  solution: {
    ko: 'QueryClientProvider를 앱 루트에 설정하고 도메인별 훅을 생성했습니다. 각 훅은 useQuery/useMutation을 감싸며 타입 안전한 응답을 반환합니다. staleTime과 gcTime 설정으로 동일 데이터의 중복 요청을 방지했습니다.',
    en: 'Set up QueryClientProvider at the app root and created domain-specific hooks. Each hook wraps useQuery/useMutation and returns type-safe responses. Configured staleTime and gcTime to prevent duplicate requests for the same data.',
  },
  result: {
    ko: '캐시 히트로 인해 중복 API 요청이 약 60% 감소했습니다. isLoading, isError 플래그로 로딩/에러 상태가 일원화되어 UI 일관성이 크게 향상되었고, React Query DevTools로 요청 흐름을 한눈에 파악할 수 있게 되었습니다.',
    en: 'Cache hits reduced redundant API requests by ~60%. Loading/error states were unified via isLoading and isError flags, greatly improving UI consistency. React Query DevTools made request flows instantly visible.',
  },
};
```

- [ ] **Step 5: Create content/cases/redis-caching.ts**

```ts
import type { CaseStudy } from './index';

export const redisCaching: CaseStudy = {
  slug: 'redis-caching',
  title: {
    ko: 'Redis 캐싱으로 DB 쿼리 최적화',
    en: 'Reducing DB Queries with Redis Caching',
  },
  summary: {
    ko: '게임 목록 조회 API에 Redis 캐시 레이어를 추가하여 DB 부하를 70% 줄이고 평균 응답 시간을 400ms에서 80ms로 단축했습니다.',
    en: 'Added a Redis cache layer to the game list API, cutting DB load by 70% and reducing average response time from 400ms to 80ms.',
  },
  tags: ['Redis', 'Caching', 'Performance', 'Backend'],
  techStack: ['Node.js', 'Redis', 'PostgreSQL', 'ioredis'],
  problem: {
    ko: '게임 목록 페이지가 매 요청마다 DB에서 전체 게임 데이터를 조회했습니다. 게임 데이터는 자주 변경되지 않음에도 N+1 쿼리 문제까지 겹쳐 피크 타임에 응답 시간이 400ms를 초과하는 경우가 빈번했습니다.',
    en: 'The game list page queried the full game dataset from the DB on every request. Despite game data being mostly static, N+1 query issues compounded the problem, causing response times to frequently exceed 400ms during peak hours.',
  },
  plan: {
    ko: '읽기가 잦고 변경이 드문 게임 목록 데이터에 cache-aside 패턴을 적용하기로 했습니다. Redis에 TTL 기반 캐시를 구현하고, 게임 데이터가 업데이트될 때 해당 캐시 키를 무효화하는 전략을 설계했습니다.',
    en: 'Decided to apply the cache-aside pattern to game list data. Designed a TTL-based Redis cache and a cache invalidation strategy that deletes the relevant key when game data is updated.',
  },
  solution: {
    ko: 'ioredis 클라이언트로 게임 목록 API 미들웨어에 캐시 레이어를 추가했습니다. 캐시 미스 시 DB 조회 후 Redis에 5분 TTL로 저장하고, 관리자가 게임 데이터를 수정할 때 해당 키를 명시적으로 삭제하는 캐시 무효화 로직을 구현했습니다.',
    en: 'Added a cache layer to the game list API middleware using the ioredis client. On cache miss, DB results are stored in Redis with a 5-minute TTL. Implemented explicit cache key deletion when an admin updates game data.',
  },
  result: {
    ko: 'DB 쿼리 수가 약 70% 감소했습니다. 평균 응답 시간이 400ms에서 80ms로 단축되어 사용자 체감 속도가 크게 향상되었고, 피크 타임에도 DB 서버 CPU 사용률이 안정적으로 유지되었습니다.',
    en: 'DB query count dropped by ~70%. Average response time fell from 400ms to 80ms, noticeably improving user experience. DB server CPU utilization remained stable even during peak hours.',
  },
};
```

- [ ] **Step 6: Create content/cases/logging-cicd.ts**

```ts
import type { CaseStudy } from './index';

export const loggingCicd: CaseStudy = {
  slug: 'logging-cicd',
  title: {
    ko: '에러/로깅 구조 → CI/CD 파이프라인 적용',
    en: 'Error/Logging Structure in CI/CD Pipeline',
  },
  summary: {
    ko: '구조화된 로깅과 Sentry 에러 트래킹을 도입하고 GitHub Actions CI/CD 파이프라인을 구축하여 인시던트 감지 시간을 수 시간에서 수 분으로 줄였습니다.',
    en: 'Introduced structured logging and Sentry error tracking, and built a GitHub Actions CI/CD pipeline, reducing incident detection time from hours to minutes.',
  },
  tags: ['CI/CD', 'Logging', 'DevOps', 'Monitoring'],
  techStack: ['GitHub Actions', 'Sentry', 'Winston', 'Node.js'],
  problem: {
    ko: '프로덕션 환경에서 console.log만 사용하고 있어 에러 추적이 불가능했습니다. 배포도 수동으로 진행하여 환경별 설정 누락으로 인한 사고가 반복되었고, 인시던트 발생 시 원인 파악까지 수 시간이 소요되는 경우가 있었습니다.',
    en: 'Production relied solely on console.log, making error tracing impossible. Deployments were manual, leading to repeated incidents from missing environment-specific configs. Root-cause analysis on incidents sometimes took hours.',
  },
  plan: {
    ko: 'Winston으로 구조화된 JSON 로그를 도입하고, Sentry로 미처리 예외를 자동 포착하기로 했습니다. 또한 GitHub Actions로 테스트 → 빌드 → 배포 파이프라인을 구성하여 수동 배포를 없애고, 환경 변수 검증 단계도 추가하기로 계획했습니다.',
    en: 'Planned to introduce structured JSON logging with Winston, auto-capture unhandled exceptions with Sentry, and set up a test → build → deploy pipeline in GitHub Actions to eliminate manual deployments and add environment variable validation.',
  },
  solution: {
    ko: 'Winston 로거를 구성하여 모든 로그를 JSON 형식으로 기록하고 레벨별 파일 분리를 적용했습니다. Sentry SDK를 통합하여 미처리 프로미스 거부와 예외를 자동으로 캡처했습니다. GitHub Actions 워크플로우로 PR 시 테스트 실행, main 병합 시 자동 배포를 구현했습니다.',
    en: 'Configured Winston to write all logs in JSON format with level-based file separation. Integrated the Sentry SDK to auto-capture unhandled promise rejections and exceptions. Built GitHub Actions workflows: tests run on PRs, auto-deploy triggers on merge to main.',
  },
  result: {
    ko: '인시던트 평균 감지 시간(MTTD)이 수 시간에서 수 분 이내로 단축되었습니다. 구조화된 로그로 에러 원인 파악이 빨라졌고, 자동화된 배포로 수동 배포 실수가 완전히 제거되었습니다. PR 단계에서 테스트가 실행되어 회귀 버그 발생률도 감소했습니다.',
    en: 'MTTD dropped from hours to under minutes. Structured logs made root-cause analysis faster. Automated deployments eliminated manual errors entirely. Tests running on PRs reduced regression bug rates.',
  },
};
```

- [ ] **Step 7: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors across all content files.

- [ ] **Step 8: Commit**

```bash
git add content/
git commit -m "feat: add CaseStudy type, registry, and all 5 GameChu case studies"
```

---

## Task 6: Portfolio Index Page

**Files:**
- Create: `components/portfolio/CaseCard.tsx`
- Create: `app/portfolio/page.tsx`

- [ ] **Step 1: Create components/portfolio/CaseCard.tsx**

```tsx
'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { CaseStudy } from '@/content/cases';

interface Props {
  caseStudy: CaseStudy;
}

export function CaseCard({ caseStudy: c }: Props) {
  const { lang } = useLanguage();
  return (
    <Link href={`/portfolio/${c.slug}`} className="block h-full">
      <Card className="h-full cursor-pointer transition-colors hover:border-indigo-400">
        <CardHeader>
          <CardTitle className="text-base leading-snug">{c.title[lang]}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="line-clamp-3 text-sm text-gray-600">{c.summary[lang]}</p>
          <div className="flex flex-wrap gap-1">
            {c.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
```

- [ ] **Step 2: Create app/portfolio/page.tsx**

```tsx
'use client';

import { useLanguage } from '@/lib/i18n';
import { CaseCard } from '@/components/portfolio/CaseCard';
import { cases } from '@/content/cases';

export default function PortfolioPage() {
  const { lang } = useLanguage();
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-2 text-3xl font-bold text-gray-900">
        {lang === 'ko' ? '포트폴리오' : 'Portfolio'}
      </h1>
      <p className="mb-8 text-gray-600">
        {lang === 'ko'
          ? 'GameChu 프로젝트에서 해결한 5가지 문제'
          : '5 problems solved in the GameChu project'}
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cases.map((c) => (
          <CaseCard key={c.slug} caseStudy={c} />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify build and visual check**

```bash
npm run build
npm run dev
```

Open http://localhost:3000/portfolio. Expected: Grid of 5 cards with titles and tags. Cards are clickable (links lead to 404 until Task 7).

- [ ] **Step 4: Commit**

```bash
git add components/portfolio/CaseCard.tsx app/portfolio/page.tsx
git commit -m "feat: add portfolio index page with case study card grid"
```

---

## Task 7: Case Study Detail Page

**Files:**
- Create: `components/portfolio/CaseTimeline.tsx`
- Create: `components/portfolio/CaseDetailClient.tsx`
- Create: `app/portfolio/[slug]/page.tsx`

- [ ] **Step 1: Create components/portfolio/CaseTimeline.tsx**

```tsx
'use client';

import { useLanguage } from '@/lib/i18n';
import type { CaseStudy } from '@/content/cases';

const steps = [
  {
    key: 'problem' as const,
    label: { ko: '문제', en: 'Problem' },
    dotColor: 'bg-red-500',
    textColor: 'text-red-700',
    borderColor: 'border-red-200',
    bgColor: 'bg-red-50',
  },
  {
    key: 'plan' as const,
    label: { ko: '계획', en: 'Plan' },
    dotColor: 'bg-yellow-500',
    textColor: 'text-yellow-700',
    borderColor: 'border-yellow-200',
    bgColor: 'bg-yellow-50',
  },
  {
    key: 'solution' as const,
    label: { ko: '해결', en: 'Solution' },
    dotColor: 'bg-blue-500',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200',
    bgColor: 'bg-blue-50',
  },
  {
    key: 'result' as const,
    label: { ko: '결과', en: 'Result' },
    dotColor: 'bg-green-500',
    textColor: 'text-green-700',
    borderColor: 'border-green-200',
    bgColor: 'bg-green-50',
  },
] as const;

interface Props {
  caseStudy: CaseStudy;
}

export function CaseTimeline({ caseStudy: c }: Props) {
  const { lang } = useLanguage();
  return (
    <div className="space-y-6">
      {steps.map((step, i) => (
        <div key={step.key} className="relative pl-9">
          {/* vertical connector line */}
          {i < steps.length - 1 && (
            <div className="absolute left-3 top-7 h-[calc(100%+1.5rem)] w-0.5 bg-gray-200" />
          )}
          {/* numbered dot */}
          <div
            className={`absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full ${step.dotColor}`}
          >
            <span className="text-xs font-bold text-white">{i + 1}</span>
          </div>
          {/* content card */}
          <div
            className={`rounded-lg border ${step.borderColor} ${step.bgColor} p-5`}
          >
            <h3
              className={`mb-2 text-sm font-bold uppercase tracking-wide ${step.textColor}`}
            >
              {step.label[lang]}
            </h3>
            <p className="leading-relaxed text-gray-700">{c[step.key][lang]}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Create components/portfolio/CaseDetailClient.tsx**

```tsx
'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import { Badge } from '@/components/ui/badge';
import { CaseTimeline } from '@/components/portfolio/CaseTimeline';
import type { CaseStudy } from '@/content/cases';

interface Props {
  caseStudy: CaseStudy;
}

export function CaseDetailClient({ caseStudy: c }: Props) {
  const { lang } = useLanguage();
  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <Link
        href="/portfolio"
        className="mb-6 block text-sm font-medium text-indigo-600 hover:underline"
      >
        ← {lang === 'ko' ? '포트폴리오로 돌아가기' : 'Back to Portfolio'}
      </Link>
      <h1 className="mb-2 text-3xl font-bold text-gray-900">{c.title[lang]}</h1>
      <p className="mb-4 text-gray-600">{c.summary[lang]}</p>
      <div className="mb-8 flex flex-wrap gap-2">
        {c.techStack.map((t) => (
          <Badge key={t} variant="secondary">
            {t}
          </Badge>
        ))}
      </div>
      <CaseTimeline caseStudy={c} />
    </div>
  );
}
```

- [ ] **Step 3: Create app/portfolio/[slug]/page.tsx**

```tsx
import { notFound } from 'next/navigation';
import { cases, getCaseBySlug } from '@/content/cases';
import { CaseDetailClient } from '@/components/portfolio/CaseDetailClient';

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export default function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const caseStudy = getCaseBySlug(params.slug);
  if (!caseStudy) notFound();
  return <CaseDetailClient caseStudy={caseStudy} />;
}
```

- [ ] **Step 4: Verify all slugs pre-render**

```bash
npm run build
```

Expected: Build output includes lines like:
```
○ /portfolio/api-refactor
○ /portfolio/responsive-design
○ /portfolio/fetching-integration
○ /portfolio/redis-caching
○ /portfolio/logging-cicd
```
All 5 slugs shown as static pages (○).

- [ ] **Step 5: Visual check**

```bash
npm run dev
```

Open http://localhost:3000/portfolio, click any card. Expected: Detail page shows title, summary, tech stack badges, and 4-step color-coded timeline (red Problem → yellow Plan → blue Solution → green Result).

- [ ] **Step 6: Commit**

```bash
git add components/portfolio/ app/portfolio/
git commit -m "feat: add case study detail page with color-coded timeline"
```

---

## Task 8: GitHub Actions Deploy Workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create .github/workflows/deploy.yml**

```bash
mkdir -p .github/workflows
```

Then create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
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
        id: deployment
```

- [ ] **Step 2: Verify build one final time**

```bash
npm run build
```

Expected: Clean build, `out/` contains all pages including all 5 portfolio slugs.

- [ ] **Step 3: Configure GitHub repo (manual step)**

In GitHub repo Settings → Pages → Source: set to **GitHub Actions** (not "Deploy from a branch").

- [ ] **Step 4: Final commit and push**

```bash
git add .github/workflows/deploy.yml
git commit -m "feat: add GitHub Actions deploy workflow for GitHub Pages"
git push origin main
```

Expected: GitHub Actions runs the deploy workflow. Check the Actions tab to confirm build passes and site is live.

---

## Self-Review: Spec Coverage Check

| Spec Requirement | Covered By |
|-----------------|------------|
| Next.js App Router + `output: 'export'` | Task 1 |
| Tailwind + shadcn/ui (Card, Badge, Button, Separator) | Task 1 |
| GitHub Pages deploy via GitHub Actions | Task 8 |
| i18n: KO/EN toggle, localStorage, `{ ko, en }` type | Task 2 |
| Nav with KO/EN toggle button | Task 3 |
| `/` — Hero, Projects, TechStack, Education | Task 4 |
| `/portfolio` — grid of 5 case cards | Task 6 |
| `/portfolio/[slug]` — timeline detail, `generateStaticParams` | Task 7 |
| `CaseStudy` type with all required fields | Task 5 |
| All 5 case studies: api-refactor, responsive-design, fetching-integration, redis-caching, logging-cicd | Task 5 |
| Color-coded timeline: 🔴 Problem, 🟡 Plan, 🔵 Solution, 🟢 Result | Task 7 |
| White bg, indigo accent, gray text, system font | Tasks 3–7 (Tailwind classes) |
| `next/image` unoptimized (no images used, but config set) | Task 1 |
