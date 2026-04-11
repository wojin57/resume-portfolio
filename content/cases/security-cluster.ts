import type { CaseStudy } from "./index";

export const securityCluster: CaseStudy = {
    slug: "security-cluster",
    title: { ko: "XSS·CSRF·입력 검증 보안 클러스터", en: "XSS, CSRF & Input Validation Security Cluster" },
    summary: {
        ko: "리치 텍스트 에디터 XSS, CSRF 무방비 뮤테이션, 44개 라우트의 임시방편 검증, ECC 리뷰에서 발견된 치명적 취약점 3건을 순차적으로 수정하며 전체 API 보안 기반을 구축했습니다.",
        en: "Systematically addressed rich-text editor XSS, CSRF-unprotected mutations, ad-hoc validation across 44 routes, and 3 critical vulnerabilities found in an external code review — building a full API security baseline.",
    },
    tags: ["Security", "XSS", "CSRF", "Zod", "Backend"],
    techStack: ["Next.js", "TypeScript", "Zod", "Lexical", "Playwright"],
    problem: {
        ko: "보안 문제가 세 가지 독립 레이어에 존재했습니다. 에디터 레이어에서는 TipTap이 HTML을 직렬화해 저장했고, 서버에서 이를 그대로 렌더링해 XSS가 가능했습니다. 네트워크 레이어에서는 /api/member/* 뮤테이션 13개가 CSRF 방어 없이 JWT 쿠키만 확인해 타 도메인의 위조 요청을 차단하지 못했습니다. 라우트 레이어에서는 pageSize가 NaN이 되는 버그, 등급 범위(1~5) 미검증, 이메일 형식 미검증 등 임시방편 검증이 44개 라우트에 산재했습니다. ECC 외부 코드 리뷰에서는 프로필 API 응답에 bcrypt 해시 포함, 아레나 PATCH 소유권 미확인(IDOR), 인증 없는 어드민 상태 전환 엔드포인트 등 치명적 취약점 3건이 추가로 발견됐습니다.",
        en: "Security issues existed across three independent layers. At the editor layer, TipTap serialized and stored HTML, which the server rendered directly — enabling stored XSS. At the network layer, 13 /api/member/* mutation routes checked only the JWT cookie with no CSRF protection, leaving them open to cross-origin forged requests. At the route layer, ad-hoc validation was scattered across 44 routes with issues like pageSize becoming NaN, unvalidated rating ranges (1–5), and unvalidated email formats. An external ECC code review additionally found 3 critical vulnerabilities: a bcrypt hash included in the profile API response, missing ownership check on arena PATCH (IDOR), and unauthenticated admin status-transition endpoints.",
    },
    plan: {
        ko: "4개의 PR로 나눠 진행했습니다. #266에서 TipTap을 Lexical로 전환해 XSS 루트를 차단했습니다(HTML 직렬화 → JSON 직렬화). #273에서 middleware.ts에 Origin 헤더 검사를 추가해 CSRF를 단일 파일에서 처리했습니다. #275에서 validate() 헬퍼와 IdSchema를 도입해 Zod 스키마를 44개 라우트에 일관 적용했습니다. ECC 리뷰 결과는 #298에서 치명적 3건 우선 수정 후 HIGH·MEDIUM 순으로 처리했습니다.",
        en: "Split across 4 PRs. #266 migrated TipTap to Lexical to cut off the XSS root (HTML serialization → JSON serialization). #273 added Origin header checking in middleware.ts to handle CSRF in a single file. #275 introduced a validate() helper and IdSchema and consistently applied Zod schemas across all 44 routes. ECC review findings were addressed in #298 — critical issues first, then HIGH and MEDIUM in order.",
    },
    solution: {
        ko: "TipTap → Lexical 마이그레이션으로 에디터가 HTML 대신 JSON을 저장하게 됐습니다. malformed/레거시 콘텐츠를 위한 plain-text fallback을 ReadOnlyReview에 추가하고 XSS 자동화 E2E 테스트를 작성했습니다. CSRF는 middleware.ts 단일 파일에서 Origin 헤더와 Host 헤더를 비교해 뮤테이션 라우트를 보호했습니다. Playwright request fixture로 브라우저 Origin 제한을 우회하는 E2E 테스트를 작성해 미들웨어 동작을 실제 파이프라인에서 검증했습니다. Zod 검증은 utils/validation.ts의 validate() 헬퍼와 IdSchema로 표준화하고, 각 DTO 파일에 스키마를 공동 배치했습니다. ECC 치명 이슈 3건은 프로필 DTO에서 password 필드 제거, 아레나 PATCH에 소유권 확인 추가, 어드민 엔드포인트를 삭제하고 자동 상태 전환을 instrumentation.ts 서버 타이머로 이전하는 방식으로 수정했습니다.",
        en: "The TipTap → Lexical migration made the editor store JSON instead of HTML. Added a plain-text fallback in ReadOnlyReview for malformed/legacy content and wrote automated E2E XSS tests. CSRF protection compares the Origin and Host headers in a single middleware.ts file covering all mutation routes. Used Playwright's request fixture (which bypasses browser Origin restrictions) to verify the middleware fires correctly in the actual Next.js pipeline. Zod validation was standardized via a validate() helper and IdSchema in utils/validation.ts with schemas co-located in each DTO file. The 3 ECC critical issues were fixed by removing the password field from the profile DTO, adding an ownership check to the arena PATCH route, and deleting the unauthenticated admin endpoints while moving auto-status transitions to server-side timers in instrumentation.ts.",
    },
    result: {
        ko: "저장형 XSS 공격 면이 제거됐습니다. 13개 뮤테이션 라우트가 CSRF로부터 보호됐으며 기존 테스트 147개가 수정 없이 통과했습니다. 44개 라우트에 일관된 Zod 검증이 적용되어 pageSize NaN 버그 등 기존 입력 버그가 함께 수정됐습니다. 어드민 엔드포인트가 인증 없이 공개돼 누구나 아레나를 삭제할 수 있던 가장 심각한 취약점이 해소됐습니다.",
        en: "The stored XSS attack surface was eliminated. All 13 mutation routes are now CSRF-protected, with all 147 existing tests passing without modification. Consistent Zod validation across 44 routes also fixed pre-existing input bugs like the pageSize NaN issue. The most severe vulnerability — unauthenticated admin endpoints that allowed anyone to delete arenas — was resolved.",
    },
};
