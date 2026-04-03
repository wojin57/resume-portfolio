import type { CaseStudy } from "./index";

export const responsiveDesign: CaseStudy = {
    slug: "responsive-design",
    title: { ko: "반응형 웹 디자인", en: "Responsive Web Design" },
    summary: {
        ko: "고정폭 레이아웃을 모바일 퍼스트 반응형 디자인으로 전환하여 Lighthouse 모바일 점수를 45점에서 82점으로 향상시켰습니다.",
        en: "Converted a fixed-width layout to a mobile-first responsive design, improving the Lighthouse mobile score from 45 to 82.",
    },
    tags: ["CSS", "Responsive", "UX", "Performance"],
    techStack: ["React", "Tailwind CSS"],
    problem: {
        ko: "초기 구현이 데스크톱 고정폭(1200px)으로만 설계되어 모바일에서 레이아웃이 깨지는 문제가 있었습니다. 전체 트래픽의 40% 이상이 모바일에서 유입되었음에도 모바일 UX가 전혀 고려되지 않은 상태였습니다.",
        en: "The initial implementation was built for a fixed desktop width (1200px), causing layout breakage on mobile. Despite over 40% of traffic coming from mobile devices, mobile UX had not been considered at all.",
    },
    plan: {
        ko: "모든 컴포넌트를 감사하여 고정 픽셀 값을 사용하는 부분을 파악하고, Tailwind CSS의 반응형 프리픽스(sm/md/lg)를 활용한 모바일 퍼스트 접근 방식으로 재작성 계획을 세웠습니다. 핵심 레이아웃(네비게이션, 카드 그리드)부터 순차적으로 수정하기로 했습니다.",
        en: "Audited all components for hardcoded pixel values, then planned a mobile-first rewrite using Tailwind's responsive prefixes (sm/md/lg). Prioritized fixing core layout elements (navigation, card grid) first.",
    },
    solution: {
        ko: "고정 픽셀 너비를 max-w-* 와 w-full로 교체하고, flex/grid 레이아웃에 반응형 컬럼 설정을 적용했습니다. 내비게이션을 모바일에서는 햄버거 메뉴로 전환하고, 게임 카드 그리드를 화면 크기에 따라 1~3열로 유동적으로 변경했습니다.",
        en: "Replaced fixed pixel widths with max-w-* and w-full, applied responsive column configs to grid layouts. Converted navigation to a hamburger menu on mobile and made the game card grid flow between 1–3 columns by breakpoint.",
    },
    result: {
        ko: "모바일 환경에서의 레이아웃 깨짐 문제가 완전히 해결되었습니다. Lighthouse 모바일 점수가 평균 45점에서 82점으로 향상되었고, 모바일 기기에서의 세션 지속 시간도 개선되었습니다.",
        en: "Layout breakage on mobile was completely resolved. Lighthouse mobile score rose from 45 to 82, and session duration on mobile devices improved.",
    },
};
