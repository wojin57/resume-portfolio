"use client";

import { useLanguage } from "@/lib/i18n";
import { Badge } from "@/components/ui/badge";
import { cases } from "@/content/cases";

const CATEGORIES = [
    {
        label: { ko: "프론트엔드", en: "Frontend" },
        keys: [
            "React",
            "Next.js",
            "TypeScript",
            "Tailwind CSS",
            "TanStack Query",
            "Zod",
            "Lexical",
        ],
    },
    {
        label: { ko: "백엔드", en: "Backend" },
        keys: ["Node.js", "Redis", "PostgreSQL", "Prisma", "pino"],
    },
    {
        label: { ko: "테스트", en: "Testing" },
        keys: ["Vitest", "Playwright", "React Testing Library"],
    },
    {
        label: { ko: "도구", en: "Tools" },
        keys: ["Claude Code", "GitHub Actions", "Git", "Docker", "Figma"],
    },
];

const techCount = cases
    .flatMap((c) => c.techStack)
    .reduce<Record<string, number>>((acc, t) => {
        acc[t] = (acc[t] ?? 0) + 1;
        return acc;
    }, {});

const groups = CATEGORIES.map((cat) => ({
    label: cat.label,
    items: cat.keys
        .filter((k) => techCount[k] !== undefined)
        .sort((a, b) => (techCount[b] ?? 0) - (techCount[a] ?? 0))
        .slice(0, 5),
})).filter((g) => g.items.length > 0);

export function TechStack() {
    const { lang } = useLanguage();
    return (
        <section className="py-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {lang === "ko" ? "기술 스택" : "Tech Stack"}
            </h2>
            <div className="space-y-3">
                {groups.map((g) => (
                    <div key={g.label.en} className="flex items-start gap-4">
                        <span className="w-24 shrink-0 pt-1 text-sm font-semibold text-gray-500">
                            {g.label[lang]}
                        </span>
                        <div className="flex flex-wrap gap-2">
                            {g.items.map((item) => (
                                <Badge key={item} variant="outline">
                                    {item}
                                </Badge>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
