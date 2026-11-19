import type {
  FeaturesAccessGovernanceSectionContent,
  FeaturesComplianceCredentialsContent,
  FeaturesDocumentManagementContent,
  FeaturesPreMappedTemplatesContent,
  FeaturesSecurityControlsContent,
} from "./capabilities-part1";
import type {
  FeaturesAnalyticsInsightsContent,
  FeaturesBrandingCustomizationContent,
  FeaturesFaqsDisclosuresContent,
  FeaturesPreviewPublishingContent,
  FeaturesWorkspaceAdministrationContent,
} from "./capabilities-part2";
import type {
  FeaturesCapabilitiesHeaderContent,
  FeaturesCtaBannerContent,
  FeaturesHeroContent,
} from "./hero-overview";

export * from "./capabilities-part1";
export * from "./capabilities-part2";
export * from "./hero-overview";

export interface FeaturesPageContent {
  hero: FeaturesHeroContent;
  capabilitiesHeader: FeaturesCapabilitiesHeaderContent;
  securityControls: FeaturesSecurityControlsContent;
  documentManagement: FeaturesDocumentManagementContent;
  preMappedTemplates: FeaturesPreMappedTemplatesContent;
  accessGovernance: FeaturesAccessGovernanceSectionContent;
  complianceCredentials: FeaturesComplianceCredentialsContent;
  brandingCustomization: FeaturesBrandingCustomizationContent;
  previewPublishing: FeaturesPreviewPublishingContent;
  faqsDisclosures: FeaturesFaqsDisclosuresContent;
  analyticsInsights: FeaturesAnalyticsInsightsContent;
  workspaceAdministration: FeaturesWorkspaceAdministrationContent;
  ctaBanner: FeaturesCtaBannerContent;
}