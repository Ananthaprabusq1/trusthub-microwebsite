export type WhyHeroToastIcon = "credentials" | "sharing";

export type WhyNeedCardIcon = "scattered" | "requests" | "control";

export type WhyValueCardIcon =
  | "centralized"
  | "sharing"
  | "self-service"
  | "branding"
  | "visibility";

export type WhyValueCardSpan = "third" | "half";

export type WhyAudienceIcon =
  | "security"
  | "compliance"
  | "sales"
  | "prospects";


  export interface WhyTrustHubCtaBannerContent {
  headline: {
    lineOne: string;
    lineTwo: string;
  };
  description: string;
  primaryCta: WhyHeroCta;
  secondaryCta: WhyHeroCta;
  image: {
    src: string;
    alt: string;
  };
}
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

export interface WhyTrustHubAboutContent {
  badge: string;
  headline: {
    lineOne: string;
    lineTwo: string;
  };
  paragraphs: string[];
  image: {
    src: string;
    alt: string;
  };
}

export interface WhyNeedCardItem {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: WhyNeedCardIcon;
}

export interface WhyOrganizationsNeedContent {
  badge: string;
  headline: string;
  description: string;
  cards: WhyNeedCardItem[];
}

export interface WhyValueCardItem {
  id: string;
  title: string;
  description: string;
  icon: WhyValueCardIcon;
  span: WhyValueCardSpan;
}

export interface WhyTrustHubValueContent {
  badge: string;
  headline: string;
  description: string;
  cards: WhyValueCardItem[];
}

export interface WhyBusinessValueRow {
  id: string;
  value: string;
  meaning: string;
}

export interface WhyBusinessValueContent {
  badge: string;
  headline: string;
  description: string;
  columns: {
    valueHeader: string;
    meaningHeader: string;
  };
  rows: WhyBusinessValueRow[];
}

export interface WhyAudienceCardItem {
  id: string;
  title: string;
  description: string;
  icon: WhyAudienceIcon;
}

export interface WhyWhoBenefitsContent {
  badge: string;
  headline: string;
  cards: WhyAudienceCardItem[];
}

export interface WhyTrustHubPageContent {
  hero: WhyTrustHubHeroContent;
  about: WhyTrustHubAboutContent;
  organizationsNeed: WhyOrganizationsNeedContent;
  valuableElements: WhyTrustHubValueContent;
  businessValue: WhyBusinessValueContent;
  whoBenefits: WhyWhoBenefitsContent;
}

export interface WhyTrustHubPageContent {
  hero: WhyTrustHubHeroContent;
  about: WhyTrustHubAboutContent;
  organizationsNeed: WhyOrganizationsNeedContent;
  valuableElements: WhyTrustHubValueContent;
  businessValue: WhyBusinessValueContent;
  whoBenefits: WhyWhoBenefitsContent;
  ctaBanner: WhyTrustHubCtaBannerContent;
}