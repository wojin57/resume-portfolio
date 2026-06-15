"use client";

import { Hero } from "@/components/resume/Hero";
import { Projects } from "@/components/resume/Projects";
import { TechStack } from "@/components/resume/TechStack";
import { Education } from "@/components/resume/Education";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/lib/i18n";

export default function ResumePage() {
    const { lang } = useLanguage();

    return (
        <div className="mx-auto max-w-4xl px-6 py-8 print:py-4">
            <div className="mb-4 flex justify-end print:hidden">
                <button
                    onClick={() => window.print()}
                    className="rounded border border-gray-200 px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-50"
                >
                    {lang === "ko" ? "PDF 저장" : "Save as PDF"}
                </button>
            </div>
            <Hero />
            <Separator />
            <Projects />
            <Separator />
            <TechStack />
            <Separator />
            <Education />
        </div>
    );
}
