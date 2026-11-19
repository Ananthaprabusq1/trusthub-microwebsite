import type { Metadata } from "next";
import { AboutTrustHubSection } from "@/components/sections/why-trust-hub/about-trust-hub-section";
import { BusinessValueSection } from "@/components/sections/why-trust-hub/business-value-section";
import { TrustHubValueSection } from "@/components/sections/why-trust-hub/trust-hub-value-section";
import { WhoBenefitsSection } from "@/components/sections/why-trust-hub/who-benefits-section";
import { WhyCtaBannerSection } from "@/components/sections/why-trust-hub/why-cta-banner-section";
import { WhyNeedTrustHubSection } from "@/components/sections/why-trust-hub/why-need-trust-hub-section";
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
  return (
    <>
      <WhyTrustHubHeroSection content={whyTrustHubContent.hero} />
      <AboutTrustHubSection content={whyTrustHubContent.about} />
      <WhyNeedTrustHubSection content={whyTrustHubContent.organizationsNeed} />
      <TrustHubValueSection content={whyTrustHubContent.valuableElements} />
      <BusinessValueSection content={whyTrustHubContent.businessValue} />
      <WhoBenefitsSection content={whyTrustHubContent.whoBenefits} />
      <WhyCtaBannerSection content={whyTrustHubContent.ctaBanner} />
    </>
  );
}