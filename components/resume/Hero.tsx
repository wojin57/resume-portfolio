"use client";

import { useLanguage } from "@/lib/i18n";

const data = {
    name: { ko: "권우진", en: "Kwon Woojin" },
    title: { ko: "소프트웨어 개발자", en: "Junior Software Engineer" },
    intro: {
        ko: "사용자 경험을 중요하게 생각하는 소프트웨어 개발자입니다. GameChu 프로젝트를 통해 API 최적화, 반응형 디자인, CI/CD 파이프라인 구축 등 실무 경험을 쌓았습니다. 설계, 개발, 테스트, 배포, 문서화 등 프로젝트 관련 작업 전면에 Claude Code를 활용하여 생산성을 높였습니다.",
        en: "A junior software engineer who values user experience. Through the GameChu project, I gained hands-on experience in API optimization, responsive design, and CI/CD pipeline setup. I leveraged Claude Code across all project-related tasks, including design, development, testing, deployment, and documentation, to enhance productivity.",
    },
    github: "https://github.com/wojin57",
    email: "wojin57@gmail.com",
};

export function Hero() {
    const { lang } = useLanguage();
    return (
        <section className="py-16">
            <h1 className="mb-1 text-4xl font-bold text-gray-900">{data.name[lang]}</h1>
            <p className="mb-4 text-xl font-medium text-indigo-600">{data.title[lang]}</p>
            <p className="mb-6 max-w-xl leading-relaxed text-gray-600">{data.intro[lang]}</p>
            <div className="flex gap-4">
                <a
                    href={data.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-indigo-600 hover:underline"
                >
                    GitHub
                </a>
                <a
                    href={`mailto:${data.email}`}
                    className="text-sm font-medium text-indigo-600 hover:underline"
                >
                    {data.email}
                </a>
            </div>
        </section>
    );
}
