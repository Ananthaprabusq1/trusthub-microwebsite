import type { DocumentationImage } from "@/types/documentation";
import { DocsIllustrationImage } from "./docs-illustration-image";

export function DocsIllustration({ image }: { image: DocumentationImage }) {
  return (
    <div className="relative flex min-h-64 items-center justify-center overflow-hidden rounded-[var(--radius-card,1.5rem)] bg-white/95 p-3 shadow-xl">
      <DocsIllustrationImage image={image} />
    </div>
  );
}
