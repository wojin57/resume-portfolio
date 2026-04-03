import type { CaseStudy } from "./index";

export const fetchingIntegration: CaseStudy = {
    slug: "fetching-integration",
    title: { ko: "데이터 페칭 통합", en: "Integrating Fetch Logic" },
    summary: {
        ko: "혼재된 데이터 페칭 방식(axios, fetch, SWR)을 React Query로 통합하여 중복 API 요청을 60% 줄이고 로딩/에러 상태를 일원화했습니다.",
        en: "Unified mixed data-fetching patterns (axios, fetch, SWR) with React Query, reducing redundant requests by 60% and standardizing loading/error states.",
    },
    tags: ["React Query", "Data Fetching", "Performance"],
    techStack: ["React", "TypeScript", "React Query"],
    problem: {
        ko: "프로젝트 내에서 axios, native fetch, SWR이 혼재하여 사용되고 있었습니다. 동일한 데이터를 여러 컴포넌트가 독립적으로 요청하여 불필요한 중복 API 호출이 발생했고, 로딩/에러 상태 처리 방식도 컴포넌트마다 달랐습니다.",
        en: "The project mixed axios, native fetch, and SWR simultaneously. Multiple components independently requested the same data, causing unnecessary duplicate API calls. Loading/error state handling also differed across components.",
    },
    plan: {
        ko: "React Query를 표준 데이터 페칭 라이브러리로 채택하고, 도메인별 커스텀 훅(useGameList, useGameDetail 등)으로 모든 페칭 로직을 추상화하기로 결정했습니다. 기존 코드는 도메인별로 순차 마이그레이션하여 리스크를 줄였습니다.",
        en: "Adopted React Query as the standard data-fetching library and planned to abstract all fetching logic into domain-specific custom hooks (useGameList, useGameDetail, etc.). Migrated domain-by-domain to reduce risk.",
    },
    solution: {
        ko: "QueryClientProvider를 앱 루트에 설정하고 도메인별 훅을 생성했습니다. 각 훅은 useQuery/useMutation을 감싸며 타입 안전한 응답을 반환합니다. staleTime과 gcTime 설정으로 동일 데이터의 중복 요청을 방지했습니다.",
        en: "Set up QueryClientProvider at the app root and created domain-specific hooks. Each hook wraps useQuery/useMutation and returns type-safe responses. Configured staleTime and gcTime to prevent duplicate requests for the same data.",
    },
    result: {
        ko: "캐시 히트로 인해 중복 API 요청이 약 60% 감소했습니다. isLoading, isError 플래그로 로딩/에러 상태가 일원화되어 UI 일관성이 크게 향상되었고, React Query DevTools로 요청 흐름을 한눈에 파악할 수 있게 되었습니다.",
        en: "Cache hits reduced redundant API requests by ~60%. Loading/error states were unified via isLoading and isError flags, greatly improving UI consistency. React Query DevTools made request flows instantly visible.",
    },
};
