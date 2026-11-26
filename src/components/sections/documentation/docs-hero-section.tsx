import { Button } from "@/components/ui/button";
import type { DocumentationContent } from "@/types/documentation";

export function DocsHeroSection({ content }: { content: DocumentationContent["hero"] }) {
  return (
    <section
      aria-labelledby="documentation-title"
      className="relative overflow-hidden bg-cover bg-center py-20 md:py-28"
      style={{ backgroundImage: `url('${content.backgroundImage.src}')` }}
    >
      <div className="absolute inset-0 bg-white/65" aria-hidden="true" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <span className="rounded-full bg-[var(--color-brand-primary)] px-4 py-1.5 text-xs font-bold text-white">
          {content.badge}
        </span>
        <h1 id="documentation-title" className="mt-5 text-4xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-5xl md:text-6xl">
          {content.title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--color-text-muted)] sm:text-lg">
          {content.subtitle}
        </p>
        <Button href={content.cta.href} variant="brand" size="lg" showArrow={content.cta.showArrow} className="mt-8">
          {content.cta.label}
        </Button>
      </div>
    </section>
  );
}
