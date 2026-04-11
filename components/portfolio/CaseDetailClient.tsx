"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { highlightKeywords } from "@/lib/highlight";
import { CaseTimeline } from "@/components/portfolio/CaseTimeline";
import type { CaseStudy } from "@/content/cases";

interface Props {
    caseStudy: CaseStudy;
}

export function CaseDetailClient({ caseStudy: c }: Props) {
    const { lang } = useLanguage();
    return (
        <div className="mx-auto max-w-2xl px-6 py-12">
            <Link
                href="/portfolio"
                className="mb-6 block text-xs font-bold uppercase tracking-widest text-blue-600 hover:underline"
            >
                ← {lang === "ko" ? "포트폴리오로 돌아가기" : "Back to Portfolio"}
            </Link>
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
                {c.title[lang]}
            </h1>
            <p className="mb-4 text-sm leading-relaxed text-gray-500">
                {highlightKeywords(c.summary[lang], c.keywords ?? [])}
            </p>
            <div className="mb-8 flex flex-wrap gap-2">
                {c.techStack.map((t) => (
                    <span
                        key={t}
                        className="rounded bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700"
                    >
                        {t}
                    </span>
                ))}
            </div>
            <CaseTimeline caseStudy={c} />
        </div>
    );
}
