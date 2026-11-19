import type { FeaturesPageContent } from "@/types/features";
import part1Data from "./capabilities-part1.json";
import part2Data from "./capabilities-part2.json";
import part3Data from "./capabilities-part3.json";
import part4Data from "./capabilities-part4.json";
import part5Data from "./capabilities-part5.json";
import heroOverviewData from "./hero-overview.json";

export const featuresContent = {
  hero: heroOverviewData.hero,
  capabilitiesHeader: heroOverviewData.capabilitiesHeader,
  securityControls: part1Data.securityControls,
  documentManagement: part1Data.documentManagement,
  preMappedTemplates: part2Data.preMappedTemplates,
  accessGovernance: part2Data.accessGovernance,
  complianceCredentials: part3Data.complianceCredentials,
  brandingCustomization: part3Data.brandingCustomization,
  previewPublishing: part4Data.previewPublishing,
  faqsDisclosures: part4Data.faqsDisclosures,
  analyticsInsights: part5Data.analyticsInsights,
  workspaceAdministration: part5Data.workspaceAdministration,
  ctaBanner: heroOverviewData.ctaBanner,
} as unknown as FeaturesPageContent;

export default featuresContent;