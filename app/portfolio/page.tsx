"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { highlightKeywords } from "@/lib/highlight";
import { cases } from "@/content/cases";

export default function PortfolioPage() {
    const { lang } = useLanguage();

    return (
        <div className="mx-auto max-w-4xl px-6 py-12">
            <h1 className="mb-1 text-3xl font-bold tracking-tight text-gray-900">
                {lang === "ko" ? "포트폴리오" : "Portfolio"}
            </h1>
            <p className="mb-3 text-sm text-gray-500">
                {lang === "ko"
                    ? "GameChu 프로젝트에서 해결한 7가지 문제"
                    : "7 problems solved in the GameChu project"}
            </p>
            <div className="mb-8 h-0.5 w-8 bg-blue-600" />

            <div className="flex flex-col">
                {cases.map((c, i) => (
                    <Link
                        key={c.slug}
                        href={`/portfolio/${c.slug}`}
                        className="flex items-start gap-4 border-b border-gray-100 py-4 first:border-t hover:bg-gray-50"
                    >
                        <span className="min-w-[28px] font-black tabular-nums text-blue-600">
                            {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="flex-1">
                            <p className="mb-1 text-sm font-bold text-gray-900">
                                {c.title[lang]}
                            </p>
                            <p className="mb-2 text-xs leading-relaxed text-gray-500">
                                {highlightKeywords(
                                    c.summary[lang],
                                    c.keywords ?? [],
                                )}
                            </p>
                            <div className="flex flex-wrap gap-1">
                                {c.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 print:border print:border-blue-200 print:bg-white"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <span className="self-center text-lg text-gray-300" aria-hidden="true">
                            ›
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
