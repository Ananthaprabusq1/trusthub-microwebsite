import type { Metadata } from "next";
import { DocsBrowseSection } from "@/components/sections/documentation/docs-browse-section";
import { DocsCtaBannerSection } from "@/components/sections/documentation/docs-cta-banner-section";
import { DocsHeroSection } from "@/components/sections/documentation/docs-hero-section";
import rawDocumentation from "@/data/documentation.json";
import type { DocumentationContent } from "@/types/documentation";

const content = rawDocumentation as DocumentationContent;

export const metadata: Metadata = {
  title: "Documentation | Stakflo Trust Hub",
  description: content.hero.subtitle,
};

export default function DocumentationPage() {
  return (
    <>
      <DocsHeroSection content={content.hero} />
      <DocsBrowseSection content={content.browse} />
      <DocsCtaBannerSection content={content.ctaBanner} />
    </>
  );
}
