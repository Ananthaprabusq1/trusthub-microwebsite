import type { Metadata } from "next";
import { WhyTrustHubHeroSection } from "@/components/sections/why-trust-hub/why-trust-hub-hero-section";
import rawWhyTrustHubContent from "@/data/why-trust-hub.json";
import type { WhyTrustHubPageContent } from "@/types/why-trust-hub";

const whyTrustHubContent = rawWhyTrustHubContent as WhyTrustHubPageContent;

export const metadata: Metadata = {
  title: "Why Trust Hub | Stakflo Trust Hub",
  description:
    "Trust Hub helps organizations present their security posture, share compliance information, and give customers a clear way to access the evidence they need.",
};

export default function WhyTrustHubPage() {
  return <WhyTrustHubHeroSection content={whyTrustHubContent.hero} />;
}