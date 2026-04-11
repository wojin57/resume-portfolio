import type { CaseStudy } from "./index";

export const logging: CaseStudy = {
    slug: "logging",
    title: {
        ko: "구조화 로깅 도입 및 에러 전파 개선",
        en: "Structured Logging & Error Propagation Improvement",
    },
    summary: {
        ko: "29개 파일에 산재한 console.error를 pino 구조화 로그로 교체하고, UseCase의 try-catch-rethrow 패턴을 제거해 Prisma 스택 트레이스가 소실되던 문제를 해결했습니다.",
        en: "Replaced console.error scattered across 29 files with pino structured logging and removed try-catch-rethrow patterns in UseCases that were silently discarding Prisma stack traces.",
    },
    tags: ["Logging", "Node.js", "Backend", "Refactoring"],
    techStack: ["Node.js", "pino", "TypeScript", "Next.js"],
    problem: {
        ko: "42개의 console.error 호출이 29개 API 라우트 파일에 퍼져 있었습니다. 로그 레벨도, JSON 구조도 없어 프로덕션에서 PM2가 모든 출력을 동등하게 캡처했고 심각한 에러와 일반 정보를 구별할 방법이 없었습니다. 더 큰 문제는 UseCase 7개에 존재하는 try-catch-rethrow 패턴이었습니다. 오류를 catch하고 console.error로 출력한 뒤 new Error('...')로 다시 던져 원본 Prisma 에러와 스택 트레이스가 완전히 소실됐습니다. 라우트에 도달하는 에러는 항상 메시지만 남은 빈 껍데기였습니다.",
        en: "42 console.error calls were scattered across 29 API route files. With no log levels and no structured output, PM2 in production captured everything equally — there was no way to distinguish critical errors from routine info. The deeper problem was a try-catch-rethrow pattern in 7 UseCases: errors were caught, logged with console.error, and re-thrown as new Error('...'), completely discarding the original Prisma error and stack trace. By the time an error reached the route layer, it was always a bare message with no context.",
    },
    plan: {
        ko: "로거 라이브러리는 프로젝트 규모와 PM2 환경을 고려해 pino를 선택했습니다. pino-pretty는 개발 전용 devDependency로 설치하고 NODE_ENV로 활성화를 제어해 프로덕션 번들에 포함되지 않게 했습니다. 싱글톤으로 구현하되 Next.js HMR 환경에서 중복 인스턴스가 생기는 문제를 global 저장으로 방지했습니다. UseCase의 try-catch는 전량 제거해 Prisma 에러가 원본 스택 그대로 라우트까지 전파되게 했습니다. withCache와 RateLimiter처럼 실패 후 복구하는 코드는 error가 아닌 warn 레벨로 구분했습니다.",
        en: "Chose pino as the logging library based on project size and the PM2 deployment environment. pino-pretty was installed as a devDependency and activated only via NODE_ENV, keeping it out of the production bundle. The logger was implemented as a singleton with a global HMR guard to prevent duplicate instances from Next.js hot reloads. All UseCase try-catch blocks were removed so Prisma errors propagate with their original stack trace intact. Sites that recover from failures — withCache and RateLimiter — were upgraded to warn rather than error to distinguish degraded-but-recovered from unrecoverable.",
    },
    solution: {
        ko: "lib/logger.ts를 singl pino 인스턴스로 구현했습니다. HMR에서 모듈이 재평가될 때 global 네임스페이스에 기존 인스턴스가 있으면 재사용하는 가드를 추가했습니다. 타임스탬프는 epoch ms 대신 ISO 8601 형식(pino.stdTimeFunctions.isoTime)을 사용해 로그 파서 호환성을 높였습니다. 각 라우트 핸들러에서 logger.child({ route, method })로 컨텍스트를 고정하고, userId는 getAuthUserId() 호출 후 로그에 포함했습니다. pino의 err 키를 사용해 에러 객체의 message와 stack이 자동 직렬화되도록 했습니다. UseCase 7개와 PrismaReviewRepository의 try-catch-rethrow를 제거해 Prisma 스택이 라우트까지 온전히 전달되게 했습니다. withCache와 RateLimiter의 console.error는 logger.warn으로 교체해 '복구됐지만 성능 저하' 상태를 명시했습니다.",
        en: "Implemented lib/logger.ts as a single pino instance with an HMR guard that reuses an existing instance from the global namespace when the module is re-evaluated on hot reload. Timestamps use ISO 8601 format (pino.stdTimeFunctions.isoTime) instead of epoch milliseconds for log parser compatibility. Each route handler creates a child logger with logger.child({ route, method }) to bake in context, then adds userId to log calls after getAuthUserId(). Using pino's err key causes error objects' message and stack to be serialized automatically. Removed try-catch-rethrow from 7 UseCases and PrismaReviewRepository so Prisma stacks reach the route layer intact. Replaced console.error in withCache and RateLimiter with logger.warn to explicitly signal 'degraded but recovered' vs. unrecoverable failure.",
    },
    result: {
        ko: "44개 로깅 지점이 pino 구조화 로그로 통일됐습니다. 프로덕션에서 PM2가 캡처하는 JSON 로그에 route, method, userId, err(stack 포함)가 항상 포함되어 장애 원인 파악 속도가 빨라졌습니다. UseCase에서 에러가 원본 Prisma 스택 그대로 전파되어 이전에는 빈 메시지만 남던 장애 상황에서 정확한 쿼리와 원인을 즉시 파악할 수 있게 됐습니다. warn/error 레벨 구분으로 모니터링 알람을 레벨별로 필터링하는 기반이 마련됐습니다.",
        en: "All 44 logging sites were unified under pino structured logging. Production PM2 logs now consistently include route, method, userId, and err (with stack), making root-cause analysis significantly faster. With UseCase errors propagating with their original Prisma stacks intact, failure scenarios that previously surfaced only as empty messages now expose the exact query and error cause. The warn/error level distinction laid the groundwork for level-filtered monitoring alerts.",
    },
};
