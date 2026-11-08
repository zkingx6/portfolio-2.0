import type { Metadata } from "next";
import { CaseStudyPage } from "@/components/case/CaseStudyPage";
import { PromptExamples } from "./PromptExamples";
import { PROMPT_DIRECTION } from "@/lib/cases";

export const metadata: Metadata = {
  title: "Prompt Direction — Ronger Xu (Zion)",
  description: PROMPT_DIRECTION.outcome,
};

export default function PromptDirectionRoute() {
  return (
    <CaseStudyPage
      data={PROMPT_DIRECTION}
      hideSections
      heroSlot={<PromptExamples />}
    />
  );
}
