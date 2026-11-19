export type DashboardRowIcon = "policy" | "folder" | "certification";

export type FloatingBadgeIcon = "certification" | "access";

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
  accentBackgroundImage?: {
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

export interface HomePageContent {
  hero: HomeHeroContent;
}