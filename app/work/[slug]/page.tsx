import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyPage } from "@/components/case/CaseStudyPage";
import { DRAFT_CASE_SLUGS, STANDARD_CASES } from "@/lib/cases";
import type { ProjectSlug } from "@/lib/projectMedia";

/* Standard case studies — same template as /work/parallel.
   Parallel and Prompt Direction keep their own static routes. */

export const dynamicParams = false;

export function generateStaticParams() {
  return DRAFT_CASE_SLUGS.map((slug) => ({ slug }));
}

// tab-title spelling where it differs from the listed project name
const TAB_NAMES: Partial<Record<ProjectSlug, string>> = { ecoviz: "ECOVIZ" };

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = STANDARD_CASES[slug as ProjectSlug];
  if (!data) return {};
  return { title: TAB_NAMES[slug as ProjectSlug] ?? data.name, description: data.outcome };
}

export default async function StandardCaseRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = STANDARD_CASES[slug as ProjectSlug];
  if (!data || slug === "parallel") notFound();
  return <CaseStudyPage data={data} />;
}
