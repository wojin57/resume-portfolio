'use client';

import { useLanguage } from '@/lib/i18n';

const data = {
  name: { ko: '권우진', en: 'Kwon Woojin' },
  title: { ko: '프론트엔드 개발자', en: 'Frontend Developer' },
  intro: {
    ko: '사용자 경험을 중요하게 생각하는 프론트엔드 개발자입니다. GameChu 프로젝트를 통해 API 최적화, 반응형 디자인, CI/CD 파이프라인 구축 등 실무 경험을 쌓았습니다.',
    en: 'A frontend developer who values user experience. Through the GameChu project, I gained hands-on experience in API optimization, responsive design, and CI/CD pipeline setup.',
  },
  github: 'https://github.com/wojin99',
  email: 'wj990114@gmail.com',
};

export function Hero() {
  const { lang } = useLanguage();
  return (
    <section className="py-16">
      <h1 className="mb-1 text-4xl font-bold text-gray-900">{data.name[lang]}</h1>
      <p className="mb-4 text-xl font-medium text-indigo-600">{data.title[lang]}</p>
      <p className="mb-6 max-w-xl leading-relaxed text-gray-600">{data.intro[lang]}</p>
      <div className="flex gap-4">
        <a
          href={data.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-indigo-600 hover:underline"
        >
          GitHub
        </a>
        <a
          href={`mailto:${data.email}`}
          className="text-sm font-medium text-indigo-600 hover:underline"
        >
          {data.email}
        </a>
      </div>
    </section>
  );
}
