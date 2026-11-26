export interface DocumentationLink {
  label: string;
  href: string;
  showArrow: boolean;
}

export interface DocumentationImage {
  src: string;
  alt: string;
}

export interface DocumentationTopic {
  number: string;
  title: string;
  guideCountLabel: string;
  featured?: boolean;
  guides: string[];
}

export interface DocumentationContent {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    cta: DocumentationLink;
    backgroundImage: DocumentationImage;
  };
  browse: {
    id: string;
    heading: string;
    meta: string;
    searchPlaceholder?: string;
    topics: DocumentationTopic[];
  };
  ctaBanner: {
    heading: string;
    subtitle: string;
    primaryCta: DocumentationLink;
    secondaryCta: DocumentationLink;
    illustration: DocumentationImage;
  };
}
