import type {
  FooterColumn,
  FooterConfig,
  FooterLinkItem,
} from "@/types/footer";

export function getVisibleFooterColumns(config: FooterConfig): FooterColumn[] {
  return config.columns
    .filter((column) => column.visible)
    .sort((a, b) => a.order - b.order)
    .map((column) => ({
      ...column,
      links: column.links
        .filter((link) => link.visible)
        .sort((a, b) => a.order - b.order),
    }))
    .filter((column) => column.links.length > 0);
}

export function getVisibleLegalLinks(config: FooterConfig): FooterLinkItem[] {
  return config.legalLinks
    .filter((link) => link.visible)
    .sort((a, b) => a.order - b.order);
}