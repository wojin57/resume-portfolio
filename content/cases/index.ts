export type CaseStudy = {
  slug: string;
  title: { ko: string; en: string };
  summary: { ko: string; en: string };
  tags: string[];
  techStack: string[];
  problem: { ko: string; en: string };
  plan: { ko: string; en: string };
  solution: { ko: string; en: string };
  result: { ko: string; en: string };
};

import { apiRefactor } from './api-refactor';
import { responsiveDesign } from './responsive-design';
import { fetchingIntegration } from './fetching-integration';
import { redisCaching } from './redis-caching';
import { loggingCicd } from './logging-cicd';

export const cases: CaseStudy[] = [
  apiRefactor,
  responsiveDesign,
  fetchingIntegration,
  redisCaching,
  loggingCicd,
];

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return cases.find((c) => c.slug === slug);
}
