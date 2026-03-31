'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';

const data = {
  heading: { ko: '프로젝트', en: 'Projects' },
  project: {
    name: 'GameChu',
    period: '2024.01 – 2024.12',
    description: {
      ko: '게임 정보 및 커뮤니티 플랫폼. 프론트엔드 개발 전반을 담당하며 API 구조 개선, 반응형 디자인, Redis 캐싱 최적화, CI/CD 파이프라인 구축을 수행했습니다.',
      en: 'A game information and community platform. Led all frontend development including API restructuring, responsive design, Redis caching optimization, and CI/CD pipeline setup.',
    },
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'React Query', 'Redis', 'GitHub Actions'],
    portfolioLabel: { ko: '케이스 스터디 보기 →', en: 'View Case Studies →' },
  },
};

export function Projects() {
  const { lang } = useLanguage();
  const p = data.project;
  return (
    <section className="py-8">
      <h2 className="mb-4 text-2xl font-bold text-gray-900">{data.heading[lang]}</h2>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{p.name}</CardTitle>
            <span className="text-sm text-gray-500">{p.period}</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">{p.description[lang]}</p>
          <div className="flex flex-wrap gap-2">
            {p.tech.map((t) => (
              <Badge key={t} variant="secondary">
                {t}
              </Badge>
            ))}
          </div>
          <Link href="/portfolio" className={buttonVariants({ variant: 'outline', size: 'sm' })}>
            {p.portfolioLabel[lang]}
          </Link>
        </CardContent>
      </Card>
    </section>
  );
}
