import type { Metadata } from "next";
import { CaseStudyPage } from "@/components/case/CaseStudyPage";
import { PARALLEL } from "@/lib/cases";

export const metadata: Metadata = {
  title: PARALLEL.name,
  description: PARALLEL.outcome,
};

export default function ParallelRoute() {
  return <CaseStudyPage data={PARALLEL} />;
}
