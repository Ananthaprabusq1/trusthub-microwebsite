import { HomeHeroSection } from "@/components/sections/home/home-hero-section";
import rawHomeContent from "@/data/home.json";
import type { HomePageContent } from "@/types/home";

const homeContent = rawHomeContent as HomePageContent;

export default function HomePage() {
  return <HomeHeroSection content={homeContent.hero} />;
}