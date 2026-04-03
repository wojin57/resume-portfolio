import { notFound } from "next/navigation";
import { cases, getCaseBySlug } from "@/content/cases";
import { CaseDetailClient } from "@/components/portfolio/CaseDetailClient";

export function generateStaticParams() {
    return cases.map((c) => ({ slug: c.slug }));
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const caseStudy = getCaseBySlug(slug);
    if (!caseStudy) notFound();
    return <CaseDetailClient caseStudy={caseStudy} />;
}
