import type { Metadata } from "next";
import { ResumePage } from "@/components/resume/ResumePage";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume — Ronger Xu (Zion). Product Designer × Creative Technologist. Human-centered design meets intelligent technology.",
};

export default function ResumeRoute() {
  return <ResumePage />;
}
