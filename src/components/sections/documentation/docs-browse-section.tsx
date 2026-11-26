import { DocsTopicCard } from "./docs-topic-card";
import type { DocumentationContent } from "@/types/documentation";

export function DocsBrowseSection({ content }: { content: DocumentationContent["browse"] }) {
  return (
    <section id={content.id} aria-labelledby="browse-heading" className="scroll-mt-24 py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
          <h2 id="browse-heading" className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-[28px]">{content.heading}</h2>
          <p className="inline-flex items-center gap-2 rounded-full border border-[var(--color-palette-e2e8f0)] bg-[var(--color-surface-base)] px-3.5 py-1.5 text-xs font-medium tabular-nums text-[var(--color-text-muted)]">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand-primary)]" />
            8 topics · 32 guides
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {content.topics.map((topic, index) => (
            <DocsTopicCard key={topic.number} topic={topic} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
