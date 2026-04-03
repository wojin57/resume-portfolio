"use client";

import { useLanguage } from "@/lib/i18n";
import type { CaseStudy } from "@/content/cases";

const steps = [
    {
        key: "problem" as const,
        label: { ko: "문제", en: "Problem" },
        dotColor: "bg-red-500",
        textColor: "text-red-700",
        borderColor: "border-red-200",
        bgColor: "bg-red-50",
    },
    {
        key: "plan" as const,
        label: { ko: "계획", en: "Plan" },
        dotColor: "bg-yellow-500",
        textColor: "text-yellow-700",
        borderColor: "border-yellow-200",
        bgColor: "bg-yellow-50",
    },
    {
        key: "solution" as const,
        label: { ko: "해결", en: "Solution" },
        dotColor: "bg-blue-500",
        textColor: "text-blue-700",
        borderColor: "border-blue-200",
        bgColor: "bg-blue-50",
    },
    {
        key: "result" as const,
        label: { ko: "결과", en: "Result" },
        dotColor: "bg-green-500",
        textColor: "text-green-700",
        borderColor: "border-green-200",
        bgColor: "bg-green-50",
    },
] as const;

interface Props {
    caseStudy: CaseStudy;
}

export function CaseTimeline({ caseStudy: c }: Props) {
    const { lang } = useLanguage();
    return (
        <div className="space-y-6">
            {steps.map((step, i) => (
                <div key={step.key} className="relative pl-9">
                    {/* vertical connector line */}
                    {i < steps.length - 1 && (
                        <div className="absolute top-7 left-3 h-[calc(100%+1.5rem)] w-0.5 bg-gray-200" />
                    )}
                    {/* numbered dot */}
                    <div
                        className={`absolute top-1 left-0 flex h-6 w-6 items-center justify-center rounded-full ${step.dotColor}`}
                    >
                        <span className="text-xs font-bold text-white">{i + 1}</span>
                    </div>
                    {/* content card */}
                    <div className={`rounded-lg border ${step.borderColor} ${step.bgColor} p-5`}>
                        <h3
                            className={`mb-2 text-sm font-bold tracking-wide uppercase ${step.textColor}`}
                        >
                            {step.label[lang]}
                        </h3>
                        <p className="leading-relaxed text-gray-700">{c[step.key][lang]}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
