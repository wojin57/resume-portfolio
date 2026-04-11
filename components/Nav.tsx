"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export function Nav() {
    const { lang, toggle } = useLanguage();

    return (
        <header className="sticky top-0 z-10 border-b bg-white">
            <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-3">
                <nav className="flex gap-6 text-sm font-medium text-gray-700">
                    <Link
                        href="/"
                        className="transition-colors hover:text-indigo-600"
                    >
                        {lang === "ko" ? "이력서" : "Resume"}
                    </Link>
                    <Link
                        href="/portfolio"
                        className="transition-colors hover:text-indigo-600"
                    >
                        {lang === "ko" ? "포트폴리오" : "Portfolio"}
                    </Link>
                </nav>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={toggle}
                    className="text-xs font-semibold"
                >
                    {lang === "ko" ? "EN" : "KO"}
                </Button>
            </div>
        </header>
    );
}
