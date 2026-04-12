"use client";

import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cases } from "@/content/cases";

const techCount = cases
    .flatMap((c) => c.techStack)
    .reduce<Record<string, number>>((acc, t) => {
        acc[t] = (acc[t] ?? 0) + 1;
        return acc;
    }, {});
const projectTech = Object.entries(techCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([t]) => t);

const data = {
    heading: { ko: "프로젝트", en: "Projects" },
    project: {
        name: "GameChu",
        period: "2025.05 – 진행중",
        github: "https://github.com/FRONT-END-BOOTCAMP-PLUS-4/gamechu",
        site: "https://www.gamechu.com/",
        description: {
            ko: "게임 정보 및 커뮤니티 플랫폼. 프론트엔드/백엔드 개발 전반을 담당하며 API 구조 개선, 반응형 디자인, Redis 캐싱 최적화, CI/CD 파이프라인 구축을 수행했습니다.",
            en: "A game information and community platform. Led all frontend and backend development including API restructuring, responsive design, Redis caching optimization, and CI/CD pipeline setup.",
        },
        portfolioLabel: {
            ko: "케이스 스터디 보기 →",
            en: "View Case Studies →",
        },
    },
};

export function Projects() {
    const { lang } = useLanguage();
    const p = data.project;
    return (
        <section className="py-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {data.heading[lang]}
            </h2>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{p.name}</CardTitle>
                        <span className="text-sm text-gray-500">
                            {p.period}
                        </span>
                    </div>
                    <div className="flex gap-4">
                        <a
                            href={p.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900"
                        >
                            <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/github-mark.svg`} alt="GitHub" width={16} height={16} unoptimized />
                            GitHub
                        </a>
                        <a
                            href={p.site}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900"
                        >
                            <ExternalLink className="h-4 w-4" />
                            gamechu.com
                        </a>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-gray-600">{p.description[lang]}</p>
                    <div className="flex flex-wrap gap-2">
                        {projectTech.map((t) => (
                            <Badge key={t} variant="secondary">
                                {t}
                            </Badge>
                        ))}
                    </div>
                    <Link
                        href="/portfolio"
                        className={buttonVariants({
                            variant: "outline",
                            size: "sm",
                        })}
                    >
                        {p.portfolioLabel[lang]}
                    </Link>
                </CardContent>
            </Card>
        </section>
    );
}
