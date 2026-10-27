import type { Metadata } from "next";
import { AboutPage } from "@/components/about/AboutPage";

export const metadata: Metadata = {
  title: "Ronger Xu (Zion) — About",
  description:
    "About — Ronger Xu (Zion). Product Designer × Creative Technologist.",
};

export default function AboutRoute() {
  return <AboutPage />;
}
