import type { CaseStudy } from "./index";

export const claudeAdopting: CaseStudy = {
    slug: "claude-adopting",
    title: { ko: "Claude 채택", en: "Adopting Claude" },
    summary: {
        ko: "Claude를 프로젝트에 통합하여 개발 효율성을 높이고, 더 나은 AI 지원을 제공했습니다.",
        en: "Integrated Claude into the project to improve development efficiency and provide better AI support.",
    },
    tags: ["Claude Code", "AI Integration", "Development Efficiency"],
    techStack: ["Claude Code"],
    problem: {
        ko: "프로젝트가 진행됨에 따라 기존 코드의 수정이 점점 어려워지고 있었습니다. 특히, 복잡한 로직이나 새로운 기능을 추가할 때마다 코드의 일관성을 유지하는 것이 큰 도전이었습니다. 또한, AI 지원이 부족하여 반복적인 작업에 많은 시간을 소비하고 있었습니다.",
        en: "As the project progressed, modifying existing code became increasingly difficult. Particularly, maintaining consistency when adding complex logic or new features was a significant challenge. Additionally, insufficient AI support meant developers were spending considerable time on repetitive tasks.",
    },
    plan: {
        ko: "Claude code의 플러그인을 활용하여 기존 코드베이스를 분석하고, 일관성 있는 코드 스타일과 구조를 유지하는 방향으로 리팩토링을 계획했습니다. 또한, 반복적인 작업에 Claude의 AI 지원을 도입하여 개발 효율성을 높이는 방안을 모색했습니다.",
        en: "Utilized Claude code's plugin to analyze the existing codebase and planned refactoring in a direction that maintains consistent code style and structure. Additionally, explored ways to introduce Claude's AI support for repetitive tasks to improve development efficiency.",
    },
    solution: {
        ko: "Superpowers, everything-claude-code 등의 플러그인을 프로젝트 규모 및 요구사항에 맞게 커스터마이징하여 도입했습니다. 기존 코드의 일관성을 유지하면서도 새로운 기능을 추가할 때마다 Claude의 AI 지원을 활용하여 코드 리뷰 및 리팩토링을 자동화했습니다.",
        en: "Customized and integrated plugins like Superpowers and everything-claude-code according to the project's scale and requirements. Leveraged Claude's AI support for code reviews and refactoring automation whenever adding new features while maintaining consistency in the existing code.",
    },
    result: {
        ko: "코드의 일관성과 유지보수성이 향상되었고, 반복적인 작업에 소요되는 시간이 줄어들었습니다.",
        en: "Consistency and maintainability of the codebase improved, and the time spent on repetitive tasks decreased.",
    },
};
