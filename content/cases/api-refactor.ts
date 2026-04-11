import type { CaseStudy } from "./index";

export const apiRefactor: CaseStudy = {
    slug: "api-refactor",
    title: {
        ko: "Arena API 타입 안전성 및 캐시 리팩토링",
        en: "Arena API Type Safety & Cache Refactor",
    },
    summary: {
        ko: "Arena API에서 PostgreSQL SQL 버그, as any 남발, 캐시 부재 문제를 한 번에 해결하여 타입 안전성과 응답 속도를 모두 개선했습니다.",
        en: "Resolved PostgreSQL SQL bugs, pervasive as any casts, and missing cache in the Arena API in one PR — improving both type safety and response speed.",
    },
    tags: ["Refactoring", "TypeScript", "Redis", "Backend"],
    techStack: ["Next.js", "TypeScript", "Prisma", "Redis", "PostgreSQL"],
    problem: {
        ko: "Arena 목록 API는 세 가지 독립적인 문제를 동시에 안고 있었습니다. 첫째, MySQL 문법으로 작성된 원시 SQL이 PostgreSQL에서 런타임 오류를 일으켰습니다(CAST AS UNSIGNED → ::INTEGER, 큰따옴표 alias). 둘째, Prisma include 결과를 정의된 타입 없이 받아 UseCase 전체에 as any 단언이 산재해 있었습니다. 셋째, 매 요청마다 DB를 풀스캔하여 피크 타임에 응답 지연이 두드러졌습니다.",
        en: "The Arena list API had three independent problems. First, raw SQL written with MySQL syntax caused runtime errors on PostgreSQL (CAST AS UNSIGNED vs ::INTEGER, double-quoted aliases). Second, Prisma include results were received without a defined type, scattering as any assertions throughout the UseCase layer. Third, every request triggered a full DB scan, causing noticeable latency spikes during peak hours.",
    },
    plan: {
        ko: "세 문제를 하나의 PR로 묶어 처리하기로 했습니다. SQL 버그는 PostgreSQL 문법으로 직접 수정하고, Prisma include 결과를 담는 ArenaWithRelations 타입을 신규 정의해 as any를 전부 제거했습니다. 캐시는 ArenaCacheService 클래스를 신설해 목록(60s TTL)·상세(120s TTL)를 분리 관리하고, PATCH/DELETE 시 해당 키를 SCAN으로 무효화하는 전략을 설계했습니다.",
        en: "Decided to address all three issues in a single PR. SQL bugs were fixed with correct PostgreSQL syntax. A new ArenaWithRelations type was defined to capture Prisma include results, eliminating every as any. For caching, a new ArenaCacheService class was introduced to separately handle list (60s TTL) and detail (120s TTL) caches, with SCAN-based invalidation on PATCH/DELETE writes.",
    },
    solution: {
        ko: "ArenaWithRelations 타입으로 UseCase 내 as any를 완전히 제거했습니다. 원시 SQL의 PostgreSQL 비호환 구문(CAST AS UNSIGNED → ::INTEGER, MySQL 큰따옴표 alias)을 수정했습니다. ArenaCacheService를 추가해 Arena 목록은 60s, 상세는 120s TTL로 Redis에 캐싱하고, 쓰기 작업 후 cacheKey SCAN으로 관련 키를 무효화했습니다. Prisma 마이그레이션 히스토리를 0_init으로 리셋하고 복합 인덱스도 추가했습니다.",
        en: "ArenaWithRelations type eliminated all as any casts in the UseCase layer. Fixed PostgreSQL-incompatible raw SQL syntax (CAST AS UNSIGNED → ::INTEGER, MySQL double-quoted aliases). Added ArenaCacheService to cache Arena list responses at 60s TTL and detail at 120s TTL in Redis, with SCAN-based key invalidation on writes. Reset Prisma migration history to 0_init and added composite indexes.",
    },
    result: {
        ko: "UseCase 계층에서 as any가 전부 제거되어 컴파일 타임 타입 검사가 실질적으로 작동하기 시작했습니다. 런타임 SQL 오류가 해소되었고, 캐시 도입으로 반복 요청의 DB 부하가 크게 줄었습니다. 이 PR의 ArenaCacheService는 이후 #286에서 withCache 유틸리티로 전면 교체되어 더 범용적인 캐싱 구조의 기반이 되었습니다.",
        en: "All as any casts were removed from the UseCase layer, making compile-time type checks meaningful again. Runtime SQL errors were resolved, and the cache significantly reduced DB load on repeated requests. The ArenaCacheService introduced in this PR was later fully replaced by the withCache utility in #286, serving as the foundation for a more general caching architecture.",
    },
};
