"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export function Nav() {
    const { lang, toggle } = useLanguage();
    const pathname = usePathname();
    const showPdf = pathname === "/" || pathname === "/portfolio";

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
                <div className="flex items-center gap-2">
                    {showPdf && (
                        <button
                            onClick={() => window.print()}
                            className="rounded border border-gray-200 px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-50"
                        >
                            {lang === "ko" ? "PDF 저장" : "Save as PDF"}
                        </button>
                    )}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={toggle}
                        className="text-xs font-semibold"
                    >
                        {lang === "ko" ? "EN" : "KO"}
                    </Button>
                </div>
            </div>
        </header>
    );
}
