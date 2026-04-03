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
