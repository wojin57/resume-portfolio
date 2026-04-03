"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { CaseStudy } from "@/content/cases";

interface Props {
    caseStudy: CaseStudy;
}

export function CaseCard({ caseStudy: c }: Props) {
    const { lang } = useLanguage();
    return (
        <Link href={`/portfolio/${c.slug}`} className="block h-full">
            <Card className="h-full cursor-pointer transition-colors hover:border-indigo-400">
                <CardHeader>
                    <CardTitle className="text-base leading-snug">{c.title[lang]}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <p className="line-clamp-3 text-sm text-gray-600">{c.summary[lang]}</p>
                    <div className="flex flex-wrap gap-1">
                        {c.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
