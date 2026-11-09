import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/LandingPage";

export const metadata: Metadata = {
  title: { absolute: "Ronger" },
  description:
    "Product Designer × Creative Technologist. Product, UX/UI, and AI workflows — designed, directed, and shipped.",
};

export default function Page() {
  return <LandingPage />;
}
