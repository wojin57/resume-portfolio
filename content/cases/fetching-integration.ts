import type { CaseStudy } from "./index";

export const fetchingIntegration: CaseStudy = {
    slug: "fetching-integration",
    title: {
        ko: "TanStack Query 데이터 페칭 통합",
        en: "TanStack Query Data Fetching Integration",
    },
    summary: {
        ko: "훅과 컴포넌트에 산재한 useState+useEffect 패턴을 TanStack Query로 통합하여 중복 요청 제거, 캐시 일관성, 컴포넌트 인라인 fetch 분리를 한 번에 달성했습니다.",
        en: "Replaced scattered useState+useEffect patterns across hooks and components with TanStack Query, eliminating duplicate requests, unifying cache state, and extracting inline fetch logic from components in one pass.",
    },
    tags: ["TanStack Query", "Data Fetching", "Refactoring"],
    techStack: ["React", "TypeScript", "TanStack Query"],
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
    problem: {
        ko: "모든 데이터 페칭 훅이 동일한 useState + useEffect + fetch 보일러플레이트를 반복했습니다. 캐싱이 없어 같은 엔드포인트가 컴포넌트 마운트마다 재요청됐고, 동시에 여러 컴포넌트가 마운트될 때 중복 요청이 발생했습니다. NotificationModal, WishlistButtonClient, ClientContentWrapper 세 컴포넌트는 훅 계층을 우회해 컴포넌트 안에 fetch 로직을 직접 갖고 있었습니다. 뮤테이션 후 캐시 무효화는 fetchData()를 직접 재호출하는 방식으로 처리해 공유 캐시가 없었습니다.",
        en: "Every data-fetching hook repeated the same useState + useEffect + fetch boilerplate. With no caching, the same endpoints were re-fetched on every component mount, and duplicate requests fired when multiple components mounted simultaneously. Three components — NotificationModal, WishlistButtonClient, and ClientContentWrapper — bypassed the hooks layer entirely and held fetch logic inline. Mutation cache invalidation was handled by directly re-calling fetchData(), since there was no shared cache to invalidate.",
    },
    plan: {
        ko: "@tanstack/react-query를 설치하고 세 가지 인프라 파일을 먼저 구축했습니다: GET 요청용 공통 fetcher, 타입 안전 캐시 키 팩토리(queryKeys), 그리고 app/layout.tsx를 Server Component로 유지하기 위한 QueryProvider 클라이언트 래퍼. 이후 기존 훅 4개를 useQuery/useMutation으로 마이그레이션하고, 컴포넌트 인라인 fetch 3건을 각각 새 훅으로 추출했습니다.",
        en: "Installed @tanstack/react-query and first built three infrastructure files: a shared GET fetcher, a typed cache key factory (queryKeys), and a QueryProvider client wrapper to keep app/layout.tsx as a Server Component. Then migrated 4 existing hooks to useQuery/useMutation, and extracted 3 sets of inline component fetch logic into new dedicated hooks.",
    },
    solution: {
        ko: "lib/fetcher.ts에 오류 시 { message } 형태를 throw하는 GET fetcher를 구현했습니다. lib/queryKeys.ts에 타입 안전 키 팩토리를 정의해 키 오타 버그를 방지했습니다. useArenas, useArenaList, useVote, useVoteList를 useQuery로 전환했고, useVote의 submitVote 시그니처를 객체 파라미터로 변경했습니다. useNotifications, useGameReviews, useWishlist 훅을 신규 생성해 컴포넌트에서 분리했습니다. gcTime을 staleTime(60s)과 동일하게 설정해 인증 데이터가 공유 브라우저에서 세션 간 잔류하지 않도록 했습니다.",
        en: "Implemented a GET fetcher in lib/fetcher.ts that throws using the API's { message } shape on error. Defined typed key factories in lib/queryKeys.ts to prevent key typo bugs. Migrated useArenas, useArenaList, useVote, and useVoteList to useQuery, changing useVote's submitVote signature to object parameters. Created useNotifications, useGameReviews, and useWishlist hooks to decouple them from components. Set gcTime equal to staleTime (60s) to prevent auth-gated data from persisting across sessions on shared browsers.",
    },
    result: {
        ko: "훅 7개와 컴포넌트 3개에 걸친 중복 페칭이 제거됐습니다. useWishlist에서는 DELETE 시 wishlistId가 필요한 타이밍 문제를 setQueryData 낙관적 업데이트로 해결했습니다. 기존 훅 테스트 6개를 createQueryWrapper 유틸로 재작성하고 신규 훅 테스트 3개를 추가했습니다. TanStack Query의 prefix-match invalidation을 활용해 useVote의 invalidateQueries 한 번으로 집계 투표와 내 투표 캐시를 동시에 무효화했습니다.",
        en: "Eliminated duplicate fetching across 7 hooks and 3 components. In useWishlist, a timing issue where wishlistId was needed before refetch completed was resolved with setQueryData optimistic updates. Rewrote 6 existing hook tests using a createQueryWrapper utility and added 3 new hook test files. Leveraged TanStack Query's prefix-match invalidation so a single invalidateQueries call in useVote refreshes both aggregate vote counts and the user's own vote cache entry simultaneously.",
    },
};
