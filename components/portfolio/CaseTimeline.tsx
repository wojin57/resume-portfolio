"use client";

import { useLanguage } from "@/lib/i18n";
import { highlightKeywords } from "@/lib/highlight";
import type { CaseStudy } from "@/content/cases";

const steps = [
    { key: "problem" as const, label: { ko: "문제", en: "Problem" }, active: true },
    { key: "plan" as const, label: { ko: "계획", en: "Plan" }, active: true },
    { key: "solution" as const, label: { ko: "해결", en: "Solution" }, active: true },
    { key: "result" as const, label: { ko: "결과", en: "Result" }, active: false },
] as const;

interface Props {
    caseStudy: CaseStudy;
}

export function CaseTimeline({ caseStudy: c }: Props) {
    const { lang } = useLanguage();
    return (
        <div className="flex flex-col">
            {steps.map((step, i) => (
                <div key={step.key} className="flex gap-4 pb-6 last:pb-0">
                    {/* left column: dot + connector line */}
                    <div className="flex w-5 shrink-0 flex-col items-center">
                        <div
                            className={`mt-1 h-2.5 w-2.5 rounded-full ${
                                step.active ? "bg-gray-900" : "bg-gray-300"
                            }`}
                        />
                        {i < steps.length - 1 && (
                            <div className="mt-1 w-px flex-1 bg-gray-200" />
                        )}
                    </div>
                    {/* right column: label + body */}
                    <div className="flex-1">
                        <p className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                            {step.label[lang]}
                        </p>
                        <p className="text-sm leading-7 text-gray-600">
                            {highlightKeywords(
                                c[step.key][lang],
                                c.keywords ?? [],
                            )}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
