'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import { Badge } from '@/components/ui/badge';
import { CaseTimeline } from '@/components/portfolio/CaseTimeline';
import type { CaseStudy } from '@/content/cases';

interface Props {
  caseStudy: CaseStudy;
}

export function CaseDetailClient({ caseStudy: c }: Props) {
  const { lang } = useLanguage();
  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <Link
        href="/portfolio"
        className="mb-6 block text-sm font-medium text-indigo-600 hover:underline"
      >
        ← {lang === 'ko' ? '포트폴리오로 돌아가기' : 'Back to Portfolio'}
      </Link>
      <h1 className="mb-2 text-3xl font-bold text-gray-900">{c.title[lang]}</h1>
      <p className="mb-4 text-gray-600">{c.summary[lang]}</p>
      <div className="mb-8 flex flex-wrap gap-2">
        {c.techStack.map((t) => (
          <Badge key={t} variant="secondary">
            {t}
          </Badge>
        ))}
      </div>
      <CaseTimeline caseStudy={c} />
    </div>
  );
}
