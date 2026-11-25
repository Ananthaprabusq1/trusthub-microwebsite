export type DashboardRowIcon = "policy" | "folder" | "certification";

export type FloatingBadgeIcon = "certification" | "access";

export type WorkflowStepIcon = "organize" | "publish" | "share" | "track";

export type ShowcaseItemIcon =
  | "certifications"
  | "policies"
  | "audits"
  | "controls"
  | "disclosures";

export type CapabilityIconType =
  | "shield"
  | "document"
  | "lock"
  | "palette"
  | "compliance"
  | "analytics";

export type CapabilityBentoSpan = "wide" | "narrow";

export type GlanceStatusTone = "pending" | "approved" | "public" | "restricted";

export interface HomeCtaBannerContent {
  headline: {
    lineOne: string;
    lineTwo: string;
  };
  description: string;
  cta: HeroCtaLink;
  image: {
    src: string;
    alt: string;
  };
}

export interface HeroCtaLink {
  label: string;
  href: string;
  showArrow?: boolean;
}

export interface DashboardSidebarItem {
  id: string;
  label: string;
  active?: boolean;
}

export interface DashboardAccessRow {
  id: string;
  title: string;
  subtitle: string;
  icon: DashboardRowIcon;
  statusLabel?: string;
}

export interface DashboardChartBar {
  id: string;
  label: string;
  heightPercent: number;
  highlighted?: boolean;
}

export interface HeroFloatingBadge {
  id: string;
  title: string;
  subtitle: string;
  icon: FloatingBadgeIcon;
  position: "bottom-left" | "bottom-right";
}

export interface HomeHeroContent {
  badge: string;
  headline: {
    prefix: string;
    highlight: string;
    suffix: string;
  };
  description: string;
  primaryCta: HeroCtaLink;
  secondaryCta: HeroCtaLink;
  backgroundImage: {
    src: string;
    alt: string;
  };
  isometricCard: {
    src: string;
    alt: string;
  };
  dashboard: {
    windowTitle: string;
    sidebarHeading: string;
    sidebarItems: DashboardSidebarItem[];
    panelHeading: string;
    rows: DashboardAccessRow[];
    chartHeading: string;
    chartBars: DashboardChartBar[];
  };
  floatingBadges: HeroFloatingBadge[];
}

export interface WorkflowStepItem {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  icon: WorkflowStepIcon;
}

export interface HomePlatformOverviewContent {
  sectionId: string;
  badge: string;
  headline: string;
  description: string;
  steps: WorkflowStepItem[];
}

export interface ShowcaseFeatureItem {
  id: string;
  title: string;
  description: string;
  icon: ShowcaseItemIcon;
}

export interface TrustCenterPreviewRow {
  id: string;
  title: string;
  subtitle: string;
  icon: DashboardRowIcon;
  accessLabel: string;
  accessTone: "public" | "restricted";
}

export interface HomeShowcaseContent {
  badge: string;
  headline: string;
  description: string;
  items: ShowcaseFeatureItem[];
  previewWindow: {
    windowTitle: string;
    organizationName: string;
    ctaLabel: string;
    verifiedBadgeLabel: string;
    bannerHeading: string;
    bannerSubtitle: string;
    rows: TrustCenterPreviewRow[];
  };
  floatingBadge: {
    title: string;
    subtitle: string;
  };
}

export interface CapabilityCardItem {
  id: string;
  title: string;
  description: string;
  icon: CapabilityIconType;
  span: CapabilityBentoSpan;
  image: {
    src: string;
    alt: string;
  };
}

export interface HomeCapabilitiesContent {
  badge: string;
  headline: string;
  description: string;
  cards: CapabilityCardItem[];
  cta: HeroCtaLink;
}

export interface GlanceStatusRow {
  id: string;
  title: string;
  subtitle: string;
  icon: DashboardRowIcon;
  statusLabel: string;
  statusTone: GlanceStatusTone;
}

export interface HomeGlanceContent {
  badge: string;
  headline: string;
  description: string;
  managementRow: {
    badge: string;
    title: string;
    bullets: string[];
    window: {
      windowTitle: string;
      sidebarHeading: string;
      sidebarItems: DashboardSidebarItem[];
      panelHeading: string;
      actionPillLabel: string;
      rows: GlanceStatusRow[];
    };
  };
  trustCenterRow: {
    badge: string;
    title: string;
    bullets: string[];
    window: {
      windowTitle: string;
      organizationName: string;
      ctaLabel: string;
      verifiedBadgeLabel: string;
      bannerHeading: string;
      bannerSubtitle: string;
      rows: GlanceStatusRow[];
    };
  };
}

export interface HomePageContent {
  hero: HomeHeroContent;
  platformOverview: HomePlatformOverviewContent;
  showcase: HomeShowcaseContent;
  capabilities: HomeCapabilitiesContent;
  glance: HomeGlanceContent;
}

export interface HomePageContent {
  hero: HomeHeroContent;
  platformOverview: HomePlatformOverviewContent;
  showcase: HomeShowcaseContent;
  capabilities: HomeCapabilitiesContent;
  glance: HomeGlanceContent;
  ctaBanner: HomeCtaBannerContent;
}
