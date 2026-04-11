import type { CaseStudy } from "./index";

export const testingSetup: CaseStudy = {
    slug: "testing-setup",
    title: {
        ko: "테스트 인프라 구축 및 99개 테스트 작성",
        en: "Building Test Infrastructure & Writing 99 Tests",
    },
    summary: {
        ko: "테스트가 전혀 없던 프로젝트에 Vitest 단위 테스트 인프라를 구축하고 UseCase·Repository 계층에 99개 테스트를 작성한 뒤, Playwright E2E로 인증 흐름과 CSRF 동작을 자동화했습니다.",
        en: "Built Vitest unit test infrastructure from scratch for a project with no tests, wrote 99 tests covering the UseCase and Repository layers, then automated authentication flows and CSRF behavior with Playwright E2E.",
    },
    tags: ["Testing", "Vitest", "Playwright", "E2E"],
    techStack: ["Vitest", "Playwright", "TypeScript", "React Testing Library"],
    problem: {
        ko: "프로젝트에 테스트가 전혀 존재하지 않았습니다. 버그는 수동 테스트나 프로덕션 장애로만 발견됐고, 리팩토링할 때마다 회귀를 방지할 안전망이 없었습니다. 테스트 러너, 모킹 전략, 팩토리 패턴 등 기반 인프라 자체가 없는 상태였습니다. 컴포넌트 단위가 아닌 비즈니스 로직 계층(UseCase, Repository)부터 우선 커버해야 했지만, Prisma 의존성과 인터페이스 구조상 모킹 패턴을 먼저 설계해야 했습니다.",
        en: "The project had zero tests. Bugs were discovered only through manual testing or production incidents, and there was no safety net for refactoring. The testing infrastructure itself — test runner, mocking strategies, factory patterns — did not exist. Business logic layers (UseCase, Repository) needed coverage first, but the Prisma dependency and interface structure required mocking patterns to be designed before any tests could be written.",
    },
    plan: {
        ko: "단위 테스트(#264)와 E2E(#267)를 두 PR로 분리했습니다. 단위 테스트는 ROI가 높은 UseCase부터 시작해 Repository로 확장하는 순서를 택했습니다. 모킹은 실제 DB를 사용하지 않고 vi.fn() 기반 createMockXxx 팩토리 함수를 표준 패턴으로 정했습니다. TanStack Query 훅 테스트를 위해 createQueryWrapper 유틸도 설계했습니다. E2E는 Playwright로 브라우저 기반 인증 흐름을 커버하고, CSRF 테스트는 브라우저 Origin 제한을 우회하기 위해 request fixture를 사용하도록 설계했습니다.",
        en: "Split into two PRs: unit tests (#264) and E2E (#267). Unit tests started with high-ROI UseCases and expanded to Repositories. Mocking was standardized on vi.fn()-based createMockXxx factory functions rather than a real DB. A createQueryWrapper utility was also designed for testing TanStack Query hooks. Playwright was chosen for E2E to cover browser-based auth flows, with CSRF tests using the request fixture to bypass browser Origin header restrictions.",
    },
    solution: {
        ko: "createMockXxx 네이밍 컨벤션으로 모든 Repository 목 팩토리를 표준화했습니다. UseCase 단계부터 Phase H까지 8개 단계에 걸쳐 99개 테스트를 작성했고, 테스트 파일의 any 타입을 명시적 타입으로 전면 교체했습니다. TanStack Query 훅 테스트는 QueryClient 상태가 테스트 간 누출되지 않도록 createQueryWrapper()를 it 블록 내부에서 호출하는 패턴을 사용했습니다. Playwright E2E에서 CSRF 테스트는 브라우저 컨텍스트가 아닌 request fixture를 사용해 cross-origin Origin 헤더를 직접 설정했습니다. 작성한 테스트 패턴과 컨벤션은 docs/CODE_CONVENTIONS.md에 문서화해 이후 PR에서 일관성을 유지했습니다.",
        en: "Standardized all Repository mock factories under the createMockXxx naming convention. Wrote 99 tests across 8 phases from UseCase through Phase H, replacing all any types in test files with explicit types. TanStack Query hook tests call createQueryWrapper() inside each it block to prevent QueryClient state from leaking between tests. Playwright CSRF tests use the request fixture rather than a browser context to set a cross-origin Origin header directly. The test patterns and conventions were documented in docs/CODE_CONVENTIONS.md to maintain consistency in subsequent PRs.",
    },
    result: {
        ko: "테스트가 없던 프로젝트에 99개 단위 테스트와 Playwright E2E 인프라가 추가됐습니다. 이후 진행한 Zod 검증(#275), Redis 캐시(#286), TanStack Query 마이그레이션(#282) 등 모든 리팩토링 PR에서 기존 테스트가 회귀 안전망으로 기능했습니다. CSRF 수정(#273)과 아레나 타이머 개선(#298)의 E2E 테스트는 실제 Next.js 파이프라인에서 동작을 검증했습니다. 테스트 컨벤션 문서는 팀 전체의 이후 테스트 작성 기준이 됐습니다.",
        en: "A project with no tests gained 99 unit tests and a Playwright E2E infrastructure. Every subsequent refactoring PR — Zod validation (#275), Redis caching (#286), TanStack Query migration (#282) — used the existing tests as a regression safety net. E2E tests for CSRF (#273) and arena timer improvements (#298) verified behavior in the actual Next.js pipeline. The test convention documentation became the team's baseline for all future test writing.",
    },
};
