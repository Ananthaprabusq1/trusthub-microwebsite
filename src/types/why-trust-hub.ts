export type WhyHeroToastIcon = "credentials" | "sharing";

export interface WhyHeroCta {
  label: string;
  href: string;
  showArrow?: boolean;
}

export interface WhyHeroToastBadge {
  id: string;
  title: string;
  subtitle: string;
  icon: WhyHeroToastIcon;
  position: "bottom-left" | "bottom-right";
}

export interface WhyTrustHubHeroContent {
  badge: string;
  headline: {
    lineOne: string;
    highlightLineOne: string;
    highlightLineTwo: string;
  };
  description: string;
  primaryCta: WhyHeroCta;
  secondaryCta: WhyHeroCta;
  backgroundImage: {
    src: string;
    alt: string;
  };
  accentBackgroundImage?: {
    src: string;
    alt: string;
  };
  showcaseImage: {
    src: string;
    alt: string;
  };
  floatingBadges: WhyHeroToastBadge[];
}

export interface WhyTrustHubPageContent {
  hero: WhyTrustHubHeroContent;
}