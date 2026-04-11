"use client";

import { useLanguage } from "@/lib/i18n";
import { Separator } from "@/components/ui/separator";

export function Education() {
    const { lang } = useLanguage();
    return (
        <section className="py-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {lang === "ko" ? "학력 / 자격" : "Education / Certifications"}
            </h2>
            <div className="space-y-1">
                <p className="font-semibold text-gray-900">
                    {lang === "ko" ? "성균관대학교" : "Sungkyunkwan University"}
                </p>
                <p className="text-gray-600">
                    {lang === "ko"
                        ? "수학과 / 소프트웨어학과"
                        : "Mathematics / Software"}
                </p>
                <p className="text-sm text-gray-500">2018.03 – 2025.02</p>
            </div>
            <Separator className="my-4" />
            <div className="space-y-1">
                <p className="font-semibold text-gray-900">OPic IH</p>
                <p className="text-gray-600">
                    {lang === "ko"
                        ? "영어 말하기 시험"
                        : "English Speaking Test"}
                </p>
                <p className="text-sm text-gray-500">{"2024.09"}</p>
            </div>
        </section>
    );
}
