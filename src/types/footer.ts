export interface FooterLinkItem {
  id: string;
  label: string;
  href: string;
  order: number;
  visible: boolean;
  external?: boolean;
}

export interface FooterColumn {
  id: string;
  heading: string;
  order: number;
  visible: boolean;
  links: FooterLinkItem[];
}

// export interface FooterConfig {
//   brand: {
//     name: string;
//     product: string;
//     href: string;
//     description: string;
//   };
//   columns: FooterColumn[];
//   copyright: string;
//   legalLinks: FooterLinkItem[];
// }
export interface FooterConfig {
  brand: {
    name: string;
    product: string;
    href: string;
    logoSrc: string;
    logoAlt: string;
    description: string;
  };
  columns: FooterColumn[];
  copyright: string;
  legalLinks: FooterLinkItem[];
}