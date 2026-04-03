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
