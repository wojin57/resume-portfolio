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

import { apiRefactor } from "./api-refactor";
import { claudeAdopting } from "./claude-adopting";
import { fetchingIntegration } from "./fetching-integration";
import { redisCaching } from "./redis-caching";
import { logging } from "./logging";
import { securityCluster } from "./security-cluster";
import { testingSetup } from "./testing-setup";

export const cases: CaseStudy[] = [
    apiRefactor,
    claudeAdopting,
    fetchingIntegration,
    redisCaching,
    logging,
    securityCluster,
    testingSetup,
];

export function getCaseBySlug(slug: string): CaseStudy | undefined {
    return cases.find((c) => c.slug === slug);
}
