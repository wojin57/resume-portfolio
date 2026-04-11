import type { CaseStudy } from "./index";

export const redisCaching: CaseStudy = {
    slug: "redis-caching",
    title: {
        ko: "Redis 캐시 확장 및 아레나 캐시 아키텍처 개선",
        en: "Redis Cache Extension & Arena Cache Architecture Refactor",
    },
    summary: {
        ko: "withCache 유틸리티를 도입해 6개 엔드포인트에 Redis 캐시를 추가하고, 유즈케이스에 침투한 아레나 캐시 로직을 버전 기반 무효화 패턴으로 전면 교체했습니다.",
        en: "Introduced a withCache utility to add Redis caching to 6 endpoints and replaced arena cache logic that had leaked into the usecase layer with a version-based invalidation pattern.",
    },
    tags: ["Redis", "Caching", "Architecture", "Backend"],
    techStack: ["Next.js", "TypeScript", "Redis", "PostgreSQL"],
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
    problem: {
        ko: "게임 상세, 장르·플랫폼·테마 목록, 멤버 프로필 등 읽기 빈도가 높은 엔드포인트 6개에 캐시가 전혀 없었습니다. 기존 아레나 캐시는 아키텍처적으로도 문제가 있었습니다. 캐시 로직이 Application 계층인 UseCase 안에 들어 있었고, ArenaCacheService라는 사용 근거가 불분명한 클래스가 존재했으며, 목록 무효화가 SCAN 기반이어서 Redis 키가 폭발적으로 증가할 경우 성능 위험이 있었습니다. 결과적으로 두 가지 경쟁하는 캐시 패턴이 혼재하고 있었습니다.",
        en: "Six high-read endpoints — game detail, genre/platform/theme lists, and member profiles — had no caching at all. The existing arena cache also had architectural problems: cache logic lived inside UseCases (application layer), an ArenaCacheService class existed with unclear ownership, and SCAN-based list invalidation carried performance risk if Redis key space grew large. Two competing cache patterns coexisted with no clear rule for which to use.",
    },
    plan: {
        ko: "두 가지 목표를 동시에 달성하기로 했습니다. 첫째, 재사용 가능한 withCache<T>(key, ttl, fn) 유틸리티를 만들어 새 엔드포인트 캐시를 한 줄로 추가할 수 있게 합니다. 둘째, 아레나 캐시를 UseCase에서 route 계층으로 이동시키고 SCAN 대신 버전 키(incr)로 목록을 무효화해 패턴을 단순화합니다. ArenaCacheService는 완전히 삭제합니다.",
        en: "Decided to pursue two goals simultaneously. First, create a reusable withCache<T>(key, ttl, fn) utility so new endpoint caches can be added in a single line. Second, move arena cache logic from UseCases to the route layer and simplify list invalidation from SCAN-based to a version key increment (incr), eliminating ArenaCacheService entirely.",
    },
    solution: {
        ko: "lib/withCache.ts를 신설했습니다. Redis 읽기·쓰기 오류를 모두 catch해 실패 시 DB 직접 조회로 graceful degradation하며, 500 에러가 절대 캐시 장애로 발생하지 않습니다. game detail(600s), genre/platform/theme list(3600s), member profile(120s)에 withCache를 적용했습니다. 아레나 목록은 arena:list:version 키를 사용해 쓰기 발생 시 redis.incr()로 버전을 올려 모든 이전 목록 캐시를 자연 만료시키고, 상세는 redis.del()로 명시 삭제했습니다. GetArenaUsecase와 GetArenaDetailUsecase는 캐시 코드가 전혀 없는 순수 비즈니스 로직으로 복원됐습니다.",
        en: "Created lib/withCache.ts. Both read and write Redis errors are caught, falling back to direct DB queries for graceful degradation — cache failures never produce 500 errors. Applied withCache to game detail (600s), genre/platform/theme lists (3600s), and member profiles (120s). For the arena list, a version key (arena:list:version) is incremented with redis.incr() on every write, naturally expiring all prior list cache entries while explicit redis.del() handles detail invalidation. GetArenaUsecase and GetArenaDetailUsecase were restored to pure business logic with no cache code.",
    },
    result: {
        ko: "6개 엔드포인트에 캐시가 추가됐고, 새로운 캐시 추가는 withCache 한 줄로 가능해졌습니다. 아레나 캐시가 Clean Architecture 원칙을 따르게 됐습니다: UseCase는 캐시를 모르고, route 계층이 캐시 전략을 담당합니다. SCAN 기반 무효화가 제거돼 대규모 키 공간에서도 안전해졌습니다. withCache는 이후 프로젝트 전반의 캐시 표준 인터페이스로 자리잡았습니다.",
        en: "Six endpoints gained caching, and adding a new cache is now a single withCache call. The arena cache now follows Clean Architecture: UseCases are unaware of caching, and the route layer owns the cache strategy. SCAN-based invalidation was removed, making the approach safe under large key spaces. withCache became the standard caching interface adopted across the rest of the project.",
    },
};
