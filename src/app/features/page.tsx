import type { Metadata } from "next";
import { AccessGovernanceSection } from "@/components/sections/features/access-governance-section";
import { AnalyticsInsightsSection } from "@/components/sections/features/analytics-insights-section";
import { BrandingCustomizationSection } from "@/components/sections/features/branding-customization-section";
import { CapabilitiesExploreSection } from "@/components/sections/features/capabilities-explore-section";
import { ComplianceCredentialsSection } from "@/components/sections/features/compliance-credentials-section";
import { DocumentManagementSection } from "@/components/sections/features/document-management-section";
import { FaqsDisclosuresSection } from "@/components/sections/features/faqs-disclosures-section";
import { FeaturesCtaBannerSection } from "@/components/sections/features/features-cta-banner-section";
import { FeaturesHeroSection } from "@/components/sections/features/features-hero-section";
import { PreMappedTemplatesSection } from "@/components/sections/features/pre-mapped-templates-section";
import { PreviewPublishingSection } from "@/components/sections/features/preview-publishing-section";
import { SecurityControlsSection } from "@/components/sections/features/security-controls-section";
import { WorkspaceAdministrationSection } from "@/components/sections/features/workspace-administration-section";
import { featuresContent } from "@/data/features/index";

export const metadata: Metadata = {
  title: "Features | Stakflo Trust Hub",
  description:
    "Manage your organization's security information, compliance credentials, supporting documents, and customer access through one centralized Trust Center.",
};

export default function FeaturesPage() {
  return (
    <>
      <FeaturesHeroSection content={featuresContent.hero} />
      <CapabilitiesExploreSection content={featuresContent.capabilitiesHeader} />
      <SecurityControlsSection content={featuresContent.securityControls} />
      <DocumentManagementSection content={featuresContent.documentManagement} />
      <PreMappedTemplatesSection content={featuresContent.preMappedTemplates} />
      <AccessGovernanceSection content={featuresContent.accessGovernance} />
      <ComplianceCredentialsSection
        content={featuresContent.complianceCredentials}
      />
      <BrandingCustomizationSection
        content={featuresContent.brandingCustomization}
      />
      <PreviewPublishingSection content={featuresContent.previewPublishing} />
      <FaqsDisclosuresSection content={featuresContent.faqsDisclosures} />
      <AnalyticsInsightsSection content={featuresContent.analyticsInsights} />
      <WorkspaceAdministrationSection
        content={featuresContent.workspaceAdministration}
      />
      <FeaturesCtaBannerSection content={featuresContent.ctaBanner} />
    </>
  );
}