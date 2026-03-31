'use client';

import { useLanguage } from '@/lib/i18n';
import { Badge } from '@/components/ui/badge';

const groups = [
  {
    label: { ko: '프론트엔드', en: 'Frontend' },
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'React Query'],
  },
  {
    label: { ko: '백엔드', en: 'Backend' },
    items: ['Node.js', 'Express', 'Redis', 'PostgreSQL'],
  },
  {
    label: { ko: '도구', en: 'Tools' },
    items: ['Git', 'GitHub Actions', 'Docker', 'Figma'],
  },
];

export function TechStack() {
  const { lang } = useLanguage();
  return (
    <section className="py-8">
      <h2 className="mb-4 text-2xl font-bold text-gray-900">
        {lang === 'ko' ? '기술 스택' : 'Tech Stack'}
      </h2>
      <div className="space-y-3">
        {groups.map((g) => (
          <div key={g.label.en} className="flex items-start gap-4">
            <span className="w-24 shrink-0 pt-1 text-sm font-semibold text-gray-500">
              {g.label[lang]}
            </span>
            <div className="flex flex-wrap gap-2">
              {g.items.map((item) => (
                <Badge key={item} variant="outline">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
