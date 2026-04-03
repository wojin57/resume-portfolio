'use client';

import { useLanguage } from '@/lib/i18n';
import { CaseCard } from '@/components/portfolio/CaseCard';
import { cases } from '@/content/cases';

export default function PortfolioPage() {
  const { lang } = useLanguage();
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-2 text-3xl font-bold text-gray-900">
        {lang === 'ko' ? '포트폴리오' : 'Portfolio'}
      </h1>
      <p className="mb-8 text-gray-600">
        {lang === 'ko'
          ? 'GameChu 프로젝트에서 해결한 5가지 문제'
          : '5 problems solved in the GameChu project'}
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cases.map((c) => (
          <CaseCard key={c.slug} caseStudy={c} />
        ))}
      </div>
    </div>
  );
}
