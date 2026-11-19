import type { HomePageContent } from "@/types/home";
import capabilitiesGlanceData from "./capabilities-glance.json";
import heroData from "./hero.json";
import overviewShowcaseData from "./overview-showcase.json";

export const homeContent = {
  hero: heroData,
  platformOverview: overviewShowcaseData.platformOverview,
  showcase: overviewShowcaseData.showcase,
  capabilities: capabilitiesGlanceData.capabilities,
  glance: capabilitiesGlanceData.glance,
  ctaBanner: capabilitiesGlanceData.ctaBanner,
} as HomePageContent;

export default homeContent;