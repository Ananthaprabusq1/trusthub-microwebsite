import { CapabilitiesSection } from "@/components/sections/home/capabilities-section";
import { CtaBannerSection } from "@/components/sections/home/cta-banner-section";
import { HomeHeroSection } from "@/components/sections/home/home-hero-section";
import { PlatformOverviewSection } from "@/components/sections/home/platform-overview-section";
import { ShowcaseSection } from "@/components/sections/home/showcase-section";
import { TrustHubGlanceSection } from "@/components/sections/home/trust-hub-glance-section";
import { homeContent } from "@/data/home/index";

export default function HomePage() {
  return (
    <>
      <HomeHeroSection content={homeContent.hero} />
      <PlatformOverviewSection content={homeContent.platformOverview} />
      <ShowcaseSection content={homeContent.showcase} />
      <CapabilitiesSection content={homeContent.capabilities} />
      <TrustHubGlanceSection content={homeContent.glance} />
      <CtaBannerSection content={homeContent.ctaBanner} />
    </>
  );
}