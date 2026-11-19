import type { Metadata } from "next";
import { FeaturesHeroSection } from "@/components/sections/features/features-hero-section";
import rawFeaturesContent from "@/data/features.json";
import type { FeaturesPageContent } from "@/types/features";

const featuresContent = rawFeaturesContent as FeaturesPageContent;

export const metadata: Metadata = {
  title: "Features | Stakflo Trust Hub",
  description:
    "Manage your organization's security information, compliance credentials, supporting documents, and customer access through one centralized Trust Center.",
};

export default function FeaturesPage() {
  return <FeaturesHeroSection content={featuresContent.hero} />;
}